import { createClient } from '@supabase/supabase-js';
import type { H3Event } from 'h3';

/**
 * 获取服务器端 Supabase 客户端
 */
function getServerSupabaseClient() {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  
  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase configuration not found');
  }
  
  return createClient(supabaseUrl, supabaseKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
}

// 用户会员等级对应的AI次数限制
const VIP_LIMITS: Record<string, number> = {
  free: 5,        // 免费版：5次/月
  basic: 50,      // 基础版：50次/月
  pro: 200,       // 专业版：200次/月
  lifetime: 999999  // 终身版：无限次
};

interface AiUsageResponse {
  success: boolean;
  total?: number;
  used?: number;
  remaining?: number;
  extra?: number;
  vipLevel?: string;
  error?: string;
}

export default defineEventHandler(async (event: H3Event): Promise<AiUsageResponse> => {
  const method = getMethod(event);
  
  try {
    const client = getServerSupabaseClient();
    
    // 获取用户认证信息
    const authHeader = getHeader(event, 'x-session') || getHeader(event, 'authorization');
    const token = authHeader?.replace('Bearer ', '') || '';
    
    // 验证用户
    let userId: string | null = null;
    if (token) {
      const { data: { user } } = await client.auth.getUser(token);
      userId = user?.id || null;
    }
    
    if (!userId) {
      // 未登录用户返回默认限制
      if (method === 'GET') {
        return {
          success: true,
          total: VIP_LIMITS.free,
          used: 0,
          remaining: VIP_LIMITS.free,
          extra: 0,
          vipLevel: 'free'
        };
      }
      return { success: false, error: '未授权' };
    }
    
    // 获取用户会员状态
    const { data: membership, error: membershipError } = await client
      .from('user_membership')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (membershipError || !membership) {
      // 创建默认会员记录
      await client
        .from('user_membership')
        .insert({
          user_id: userId,
          vip_level: 'free',
          ai_credits_used: 0,
          ai_extra_count: 0,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });
      
      const vipLevel = 'free';
      const used = 0;
      const total = VIP_LIMITS[vipLevel] ?? VIP_LIMITS.free ?? 5;
      
      if (method === 'GET') {
        return {
          success: true,
          total,
          used,
          remaining: total - used,
          extra: 0,
          vipLevel
        };
      }
    }
    
    const vipLevel = membership?.vip_level || 'free';
    const used = membership?.ai_credits_used || 0;
    const extra = membership?.ai_extra_count || 0;
    const total = (VIP_LIMITS[vipLevel] ?? VIP_LIMITS.free ?? 5) + extra;
    
    if (method === 'GET') {
      // 获取AI使用情况
      return {
        success: true,
        total,
        used,
        remaining: Math.max(0, total - used),
        extra,
        vipLevel
      };
    } else if (method === 'POST') {
      // 消费一次AI使用次数
      if (used >= total) {
        return { success: false, error: 'AI次数已用完，请升级会员或购买额外次数' };
      }
      
      // 更新使用次数
      await client
        .from('user_membership')
        .update({
          ai_credits_used: used + 1,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', userId);
      
      return {
        success: true,
        total,
        used: used + 1,
        remaining: Math.max(0, total - used - 1),
        extra,
        vipLevel
      };
    }
    
    return { success: false, error: '不支持的请求方法' };
  } catch (error) {
    console.error('AI usage API error:', error);
    return { success: false, error: '服务器错误' };
  }
});