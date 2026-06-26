import crypto from 'crypto';
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
 * 支付回调处理API
 * 处理支付宝和微信支付的成功通知
 */

const PAYMENT_CONFIG = {
  alipay: {
    publicKey: process.env.ALIPAY_PUBLIC_KEY || 'YOUR_ALIPAY_PUBLIC_KEY',
  },
  wechat: {
    apiKey: process.env.WECHAT_API_KEY || 'YOUR_WECHAT_API_KEY',
  }
};

/**
 * 验证支付宝签名
 */
function verifyAlipaySign(params: Record<string, string>, publicKey: string): boolean {
  const sign = params.sign;
  const signType = params.sign_type || 'RSA2';
  
  if (!sign) return false;
  
  const sortedParams = Object.keys(params)
    .filter(key => key !== 'sign' && key !== 'sign_type' && params[key] !== '')
    .sort()
    .map(key => `${key}=${params[key]}`)
    .join('&');
  
  const verifier = crypto.createVerify('RSA-SHA256');
  verifier.update(sortedParams);
  return verifier.verify(publicKey, sign, 'base64');
}

/**
 * 验证微信支付签名
 */
function verifyWechatSign(params: Record<string, string>, apiKey: string): boolean {
  const sign = params.sign;
  if (!sign) return false;
  
  const sortedParams = Object.keys(params)
    .filter(key => key !== 'sign' && params[key] !== '')
    .sort()
    .map(key => `${key}=${params[key]}`)
    .join('&');
  
  const calculatedSign = crypto.createHmac('sha256', apiKey)
    .update(sortedParams + `&key=${apiKey}`)
    .digest('hex')
    .toUpperCase();
  
  return sign === calculatedSign;
}

/**
 * 更新用户会员状态
 */
async function updateUserMembership(client: ReturnType<typeof getServerSupabaseClient>, userId: string, orderData: any) {
  const extraData = orderData.extra_data || {};
  const vipLevel = extraData.vipLevel;
  const durationDays = extraData.durationDays;
  const aiCount = extraData.aiCount;
  
  // 查询用户当前会员状态
  const { data: existingMembership } = await client
    .from('user_membership')
    .select('*')
    .eq('user_id', userId)
    .single();

  const now = new Date();
  let vipStartDate = now.toISOString();
  let vipEndDate: string | null = null;
  
  if (durationDays && durationDays > 0) {
    // 如果已有会员，从当前结束日期延长
    if (existingMembership && existingMembership.vip_end_date && new Date(existingMembership.vip_end_date) > now) {
      vipStartDate = existingMembership.vip_start_date;
      const endDate = new Date(existingMembership.vip_end_date);
      endDate.setDate(endDate.getDate() + durationDays);
      vipEndDate = endDate.toISOString();
    } else {
      const endDate = new Date(now);
      endDate.setDate(endDate.getDate() + durationDays);
      vipEndDate = endDate.toISOString();
    }
  } else if (durationDays === null && vipLevel === 'lifetime') {
    // 终身会员
    vipEndDate = new Date('2099-12-31').toISOString();
  }

  // 如果是购买AI次数，增加额外次数
  let aiExtraCount = existingMembership?.ai_extra_count || 0;
  if (aiCount && aiCount > 0 && !vipLevel) {
    aiExtraCount += aiCount;
  }

  // 确定VIP等级（如果是购买VIP则升级，否则保持原等级）
  let newVipLevel = existingMembership?.vip_level || 'free';
  if (vipLevel) {
    // 升级逻辑：终身 > 专业 > 基础 > 免费
    const levelOrder: Record<string, number> = { lifetime: 4, pro: 3, basic: 2, free: 1 };
    const currentLevel = levelOrder[newVipLevel] ?? 1;
    const newLevel = levelOrder[vipLevel] ?? 1;
    if (newLevel > currentLevel) {
      newVipLevel = vipLevel;
    }
  }

  // 更新或创建会员记录
  if (existingMembership) {
    await client
      .from('user_membership')
      .update({
        vip_level: newVipLevel,
        vip_start_date: vipStartDate,
        vip_end_date: vipEndDate,
        ai_extra_count: aiExtraCount,
        updated_at: now.toISOString()
      })
      .eq('user_id', userId);
  } else {
    await client
      .from('user_membership')
      .insert({
        user_id: userId,
        vip_level: newVipLevel,
        vip_start_date: vipStartDate,
        vip_end_date: vipEndDate,
        ai_credits_used: 0,
        ai_extra_count: aiExtraCount,
        created_at: now.toISOString(),
        updated_at: now.toISOString()
      });
  }
}

export default defineEventHandler(async (event: H3Event) => {
  const platform = getRouterParam(event, 'platform') as string;
  
  if (!platform || (platform !== 'alipay' && platform !== 'wechat')) {
    return { error: '无效的支付平台' };
  }

  try {
    const client = getServerSupabaseClient();
    
    if (platform === 'alipay') {
      // 支付宝回调处理
      const body = await readBody(event);
      const params = body as Record<string, string>;
      
      // 验证签名
      if (!verifyAlipaySign(params, PAYMENT_CONFIG.alipay.publicKey)) {
        return 'failure';
      }
      
      // 获取订单号和交易状态
      const orderNo = params.out_trade_no;
      const tradeStatus = params.trade_status;
      
      if (tradeStatus === 'TRADE_SUCCESS' || tradeStatus === 'TRADE_FINISHED') {
        // 更新订单状态
        const { data: order } = await client
          .from('payment_orders')
          .select('*')
          .eq('order_no', orderNo)
          .single();
        
        if (order) {
          await client
            .from('payment_orders')
            .update({
              status: 'paid',
              paid_at: new Date().toISOString(),
              transaction_id: params.trade_no,
              updated_at: new Date().toISOString()
            })
            .eq('order_no', orderNo);
          
          // 更新用户会员状态
          await updateUserMembership(client, order.user_id, order);
        }
      }
      
      return 'success';
    } else if (platform === 'wechat') {
      // 微信支付回调处理
      const body = await readBody(event);
      const params = body as Record<string, string>;
      
      // 验证签名
      if (!verifyWechatSign(params, PAYMENT_CONFIG.wechat.apiKey)) {
        return { code: 'FAIL', message: '签名验证失败' };
      }
      
      // 获取订单号和交易状态
      const orderNo = params.out_trade_no;
      const tradeState = params.trade_state;
      
      if (tradeState === 'SUCCESS') {
        // 更新订单状态
        const { data: order } = await client
          .from('payment_orders')
          .select('*')
          .eq('order_no', orderNo)
          .single();
        
        if (order) {
          await client
            .from('payment_orders')
            .update({
              status: 'paid',
              paid_at: new Date().toISOString(),
              transaction_id: params.transaction_id,
              updated_at: new Date().toISOString()
            })
            .eq('order_no', orderNo);
          
          // 更新用户会员状态
          await updateUserMembership(client, order.user_id, order);
        }
      }
      
      return { code: 'SUCCESS', message: '成功' };
    }
  } catch (error) {
    console.error('Payment callback error:', error);
    return platform === 'alipay' ? 'failure' : { code: 'FAIL', message: '处理失败' };
  }
});