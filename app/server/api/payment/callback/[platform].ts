import crypto from 'crypto';
import { Pool } from 'pg';

let pool: Pool | null = null;

function getPool(): Pool {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.COZE_DATABASE_URL || process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
    });
  }
  return pool;
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
async function updateUserMembership(pool: Pool, userId: string, orderData: any) {
  const extraData = orderData.extra_data || {};
  const vipLevel = extraData.vipLevel;
  const durationDays = extraData.durationDays;
  const aiCount = extraData.aiCount;
  
  // 查询用户当前会员状态
  const existingResult = await pool.query(
    'SELECT * FROM user_membership WHERE user_id = $1',
    [userId]
  );
  const existingMembership = existingResult.rows[0];

  const now = new Date();
  let vipStartDate = now;
  let vipEndDate: Date | null = null;
  
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
  } else if (durationDays === null && vipLevel === 'lifetime') {
    // 终身会员
    vipEndDate = new Date('2099-12-31');
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
    const levelOrder = { lifetime: 4, pro: 3, basic: 2, free: 1 };
    if (levelOrder[vipLevel as keyof typeof levelOrder] > levelOrder[newVipLevel as keyof typeof levelOrder]) {
      newVipLevel = vipLevel;
    }
  }

  // 更新或创建会员记录
  if (existingMembership) {
    await pool.query(
      `UPDATE user_membership 
       SET vip_level = $1, vip_start_date = $2, vip_end_date = $3, 
           ai_extra_count = $4, updated_at = $5
       WHERE user_id = $6`,
      [
        newVipLevel,
        vipStartDate.toISOString(),
        vipEndDate?.toISOString() || existingMembership.vip_end_date,
        aiExtraCount,
        now.toISOString(),
        userId
      ]
    );
  } else {
    const resetDate = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    await pool.query(
      `INSERT INTO user_membership 
       (user_id, vip_level, vip_start_date, vip_end_date, ai_extra_count, ai_usage_reset_at, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $7)`,
      [
        userId,
        newVipLevel,
        vipStartDate.toISOString(),
        vipEndDate?.toISOString(),
        aiExtraCount,
        resetDate.toISOString(),
        now.toISOString()
      ]
    );
  }
}

export default defineEventHandler(async (event) => {
  const pgPool = getPool();
  const path = event.path;
  const method = event.method;
  
  // 只处理POST请求
  if (method !== 'POST') {
    return { error: '仅支持POST请求' };
  }

  const body = await readBody(event);

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
        const orderResult = await pgPool.query(
          'SELECT * FROM payment_orders WHERE order_no = $1',
          [orderNo]
        );
        const order = orderResult.rows[0];

        if (order && order.status === 'pending') {
          // 更新订单状态
          await pgPool.query(
            `UPDATE payment_orders 
             SET status = 'paid', payment_no = $1, paid_at = $2, updated_at = $2
             WHERE order_no = $3`,
            [tradeNo, new Date().toISOString(), orderNo]
          );

          // 更新用户会员状态
          await updateUserMembership(pgPool, order.user_id, order);
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
        const orderResult = await pgPool.query(
          'SELECT * FROM payment_orders WHERE order_no = $1',
          [out_trade_no]
        );
        const order = orderResult.rows[0];

        if (order && order.status === 'pending') {
          // 更新订单状态
          await pgPool.query(
            `UPDATE payment_orders 
             SET status = 'paid', payment_no = $1, paid_at = $2, updated_at = $2
             WHERE order_no = $3`,
            [transaction_id, new Date().toISOString(), out_trade_no]
          );

          // 更新用户会员状态
          await updateUserMembership(pgPool, order.user_id, order);
        }
      }

      // 微信要求返回JSON格式
      return { code: 'SUCCESS', message: '成功' };
    }

    return { error: '未知的支付平台' };
  } catch (error) {
    console.error('支付回调处理失败:', error);
    
    if (path.includes('/alipay')) {
      return 'fail';
    }
    return { code: 'FAIL', message: '处理失败' };
  }
});