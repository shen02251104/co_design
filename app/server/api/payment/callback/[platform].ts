import crypto from 'crypto';

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
async function updateUserMembership(client: any, userId: string, orderData: any) {
  const { vipLevel, durationDays, aiCount } = orderData.extra_data || {};
  
  // 查询用户当前会员状态
  const { data: existingMembership } = await client
    .from('user_membership')
    .select('*')
    .eq('user_id', userId)
    .single();

  const now = new Date();
  let vipStartDate = now;
  let vipEndDate = null;
  
  if (durationDays && durationDays > 0) {
    // 如果已有会员，从当前结束日期延长
    if (existingMembership && existingMembership.vip_end_date && new Date(existingMembership.vip_end_date) > now) {
      vipStartDate = new Date(existingMembership.vip_start_date);
      vipEndDate = new Date(existingMembership.vip_end_date);
      vipEndDate.setDate(vipEndDate.getDate() + durationDays);
    } else {
      vipEndDate = new Date(now);
      vipEndDate.setDate(vipEndDate.getDate() + durationDays);
    }
  } else if (durationDays === -1) {
    // 终身会员
    vipEndDate = new Date('2099-12-31');
  }

  // 构建更新数据
  const membershipData = {
    user_id: userId,
    vip_level: vipLevel || (existingMembership?.vip_level || 'free'),
    vip_start_date: vipStartDate.toISOString(),
    vip_end_date: vipEndDate?.toISOString(),
    updated_at: now.toISOString(),
  };

  // 如果是购买AI次数，增加额外次数
  if (aiCount && aiCount > 0 && !vipLevel) {
    membershipData.ai_extra_count = (existingMembership?.ai_extra_count || 0) + aiCount;
  }

  // 更新或创建会员记录
  if (existingMembership) {
    await client
      .from('user_membership')
      .update(membershipData)
      .eq('user_id', userId);
  } else {
    membershipData.ai_usage_reset_at = new Date(now.getFullYear(), now.getMonth() + 1, 1).toISOString();
    await client
      .from('user_membership')
      .insert(membershipData);
  }
}

export default defineEventHandler(async (event) => {
  const path = event.path;
  const method = event.method;
  
  // 只处理POST请求
  if (method !== 'POST') {
    return { error: '仅支持POST请求' };
  }

  const body = await readBody(event);
  const client = useSupabaseClient(event);

  try {
    // 判断是支付宝还是微信回调
    const isAlipay = path.includes('/alipay');
    const isWechat = path.includes('/wechat');

    if (isAlipay) {
      // 支付宝回调处理
      // 验证签名（实际使用时需要启用）
      // if (!verifyAlipaySign(body, PAYMENT_CONFIG.alipay.publicKey)) {
      //   return 'fail';
      // }

      const orderNo = body.out_trade_no;
      const tradeStatus = body.trade_status;
      const tradeNo = body.trade_no; // 支付宝交易号

      if (tradeStatus === 'TRADE_SUCCESS' || tradeStatus === 'TRADE_FINISHED') {
        // 查询订单
        const { data: order } = await client
          .from('payment_orders')
          .select('*')
          .eq('order_no', orderNo)
          .single();

        if (order && order.status === 'pending') {
          // 更新订单状态
          await client
            .from('payment_orders')
            .update({
              status: 'paid',
              payment_no: tradeNo,
              paid_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            })
            .eq('order_no', orderNo);

          // 更新用户会员状态
          await updateUserMembership(client, order.user_id, order);
        }
      }

      // 支付宝要求返回success
      return 'success';
    }

    if (isWechat) {
      // 微信支付回调处理
      // 验证签名（实际使用时需要启用）
      // if (!verifyWechatSign(body, PAYMENT_CONFIG.wechat.apiKey)) {
      //   return { code: 'FAIL', message: '签名验证失败' };
      // }

      const { out_trade_no, transaction_id, result_code } = body;

      if (result_code === 'SUCCESS') {
        // 查询订单
        const { data: order } = await client
          .from('payment_orders')
          .select('*')
          .eq('order_no', out_trade_no)
          .single();

        if (order && order.status === 'pending') {
          // 更新订单状态
          await client
            .from('payment_orders')
            .update({
              status: 'paid',
              payment_no: transaction_id,
              paid_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            })
            .eq('order_no', out_trade_no);

          // 更新用户会员状态
          await updateUserMembership(client, order.user_id, order);
        }
      }

      // 微信要求返回JSON格式
      return { code: 'SUCCESS', message: '成功' };
    }

    return { error: '未知支付渠道' };
  } catch (err) {
    console.error('支付回调处理失败:', err);
    
    if (path.includes('/alipay')) {
      return 'fail';
    }
    return { code: 'FAIL', message: '处理失败' };
  }
});