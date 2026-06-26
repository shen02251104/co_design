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

/**
 * 验证用户 token 并获取用户ID
 */
async function verifyUser(token: string): Promise<string | null> {
  if (!token) return null;
  
  try {
    const client = getServerSupabaseClient();
    const { data: { user }, error } = await client.auth.getUser(token);
    
    if (error || !user) return null;
    return user.id;
  } catch {
    return null;
  }
}

interface MembershipResponse {
  success: boolean;
  data?: {
    vipLevel: string;
    aiUsageCount: number;
    aiTotalCount: number;
    aiExtraCount: number;
    vipStartDate: string | null;
    vipEndDate: string | null;
    isVip: boolean;
  };
  error?: string;
}

export default defineEventHandler(async (event: H3Event): Promise<MembershipResponse> => {
  const method = getMethod(event);
  
  try {
    const client = getServerSupabaseClient();
    
    // 获取 token from header
    const authHeader = getHeader(event, 'x-session');
    const token = authHeader?.replace('Bearer ', '') || '';
    
    // 验证用户
    const userId = await verifyUser(token);
    
    if (method === 'GET') {
      // 获取用户会员状态
      if (!userId) {
        // 未登录用户返回默认状态
        return {
          success: true,
          data: {
            vipLevel: 'free',
            aiUsageCount: 0,
            aiTotalCount: 5,
            aiExtraCount: 0,
            vipStartDate: null,
            vipEndDate: null,
            isVip: false
          }
        };
      }
      
      // 查询用户会员状态
      const { data: membership, error } = await client
        .from('user_membership')
        .select('*')
        .eq('user_id', userId)
        .single();
      
      if (error || !membership) {
        // 没有会员记录，返回默认状态
        return {
          success: true,
          data: {
            vipLevel: 'free',
            aiUsageCount: 0,
            aiTotalCount: 5,
            aiExtraCount: 0,
            vipStartDate: null,
            vipEndDate: null,
            isVip: false
          }
        };
      }
      
      // 检查VIP是否有效
      const now = new Date();
      const vipEndDate = membership.vip_end_date ? new Date(membership.vip_end_date) : null;
      const isVip = membership.vip_level !== 'free' && (!vipEndDate || vipEndDate > now);
      
      // 确定AI总次数
      let aiTotalCount = 5; // 免费用户默认5次
      if (membership.vip_level === 'basic') {
        aiTotalCount = 100;
      } else if (membership.vip_level === 'pro') {
        aiTotalCount = 500;
      } else if (membership.vip_level === 'lifetime') {
        aiTotalCount = -1; // 无限制
      }
      
      return {
        success: true,
        data: {
          vipLevel: membership.vip_level,
          aiUsageCount: membership.ai_credits_used || 0,
          aiTotalCount: aiTotalCount,
          aiExtraCount: membership.ai_extra_count || 0,
          vipStartDate: membership.vip_start_date,
          vipEndDate: membership.vip_end_date,
          isVip: isVip
        }
      };
    } else if (method === 'POST') {
      // 更新用户会员状态（通常由支付回调调用）
      if (!userId) {
        return { success: false, error: '未授权' };
      }
      
      const body = await readBody(event);
      const { aiCreditsUsed } = body;
      
      if (aiCreditsUsed !== undefined) {
        await client
          .from('user_membership')
          .update({
            ai_credits_used: aiCreditsUsed,
            updated_at: new Date().toISOString()
          })
          .eq('user_id', userId);
      }
      
      return { success: true };
    }
    
    return { success: false, error: '不支持的请求方法' };
  } catch (error) {
    console.error('Membership API error:', error);
    return { success: false, error: '服务器错误' };
  }
});