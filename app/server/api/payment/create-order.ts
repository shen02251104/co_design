import crypto from 'crypto';

/**
 * 支付配置
 * 实际使用时需要替换为真实的商户配置
 */
const PAYMENT_CONFIG = {
  alipay: {
    appId: process.env.ALIPAY_APP_ID || 'YOUR_ALIPAY_APP_ID',
    privateKey: process.env.ALIPAY_PRIVATE_KEY || 'YOUR_ALIPAY_PRIVATE_KEY',
    publicKey: process.env.ALIPAY_PUBLIC_KEY || 'YOUR_ALIPAY_PUBLIC_KEY',
    gateway: 'https://openapi.alipay.com/gateway.do',
    notifyUrl: `${process.env.COZE_PROJECT_DOMAIN_DEFAULT}/api/payment/callback/alipay`,
  },
  wechat: {
    appId: process.env.WECHAT_APP_ID || 'YOUR_WECHAT_APP_ID',
    mchId: process.env.WECHAT_MCH_ID || 'YOUR_WECHAT_MCH_ID',
    apiKey: process.env.WECHAT_API_KEY || 'YOUR_WECHAT_API_KEY',
    notifyUrl: `${process.env.COZE_PROJECT_DOMAIN_DEFAULT}/api/payment/callback/wechat`,
    gateway: 'https://api.mch.weixin.qq.com/v3/pay/transactions/native',
  }
};

/**
 * 生成订单号
 */
function generateOrderNo() {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `YK${timestamp}${random}`.toUpperCase();
}

/**
 * 支付宝签名
 */
function alipaySign(params: Record<string, string>, privateKey: string): string {
  const sortedParams = Object.keys(params)
    .filter(key => params[key] !== '' && params[key] !== undefined)
    .sort()
    .map(key => `${key}=${params[key]}`)
    .join('&');
  
  const signer = crypto.createSign('RSA-SHA256');
  signer.update(sortedParams);
  return signer.sign(privateKey, 'base64');
}

/**
 * 微信支付签名
 */
function wechatSign(params: Record<string, string | number>, apiKey: string): string {
  const sortedParams = Object.keys(params)
    .filter(key => params[key] !== '' && params[key] !== undefined)
    .sort()
    .map(key => `${key}=${params[key]}`)
    .join('&');
  return crypto.createHmac('sha256', apiKey).update(sortedParams + `&key=${apiKey}`).digest('hex').toUpperCase();
}

/**
 * 产品价格配置
 */
const PRODUCT_PRICES = {
  vip_basic_monthly: { name: '易可图基础版月卡', price: 19, aiCount: 50, vipLevel: 'basic', durationDays: 30 },
  vip_basic_yearly: { name: '易可图基础版年卡', price: 159, aiCount: 50, vipLevel: 'basic', durationDays: 365 },
  vip_pro_monthly: { name: '易可图专业版月卡', price: 39, aiCount: 200, vipLevel: 'pro', durationDays: 30 },
  vip_pro_yearly: { name: '易可图专业版年卡', price: 299, aiCount: 200, vipLevel: 'pro', durationDays: 365 },
  vip_lifetime: { name: '易可图终身版', price: 389, aiCount: -1, vipLevel: 'lifetime', durationDays: -1 },
  ai_credits_20: { name: 'AI设计次数20次', price: 10, aiCount: 20, vipLevel: null, durationDays: null },
  ai_credits_50: { name: 'AI设计次数50次', price: 30, aiCount: 50, vipLevel: null, durationDays: null },
  ai_credits_100: { name: 'AI设计次数100次', price: 50, aiCount: 100, vipLevel: null, durationDays: null },
};

interface CreateOrderRequest {
  userId: string;
  productId: string;
  paymentMethod: 'alipay' | 'wechat';
}

export default defineEventHandler(async (event) => {
  const body = await readBody<CreateOrderRequest>(event);
  const { userId, productId, paymentMethod } = body;

  // 验证产品ID
  const product = PRODUCT_PRICES[productId as keyof typeof PRODUCT_PRICES];
  if (!product) {
    return { error: '无效的产品ID', success: false };
  }

  // 验证支付方式
  if (!['alipay', 'wechat'].includes(paymentMethod)) {
    return { error: '无效的支付方式', success: false };
  }

  // 生成订单号
  const orderNo = generateOrderNo();

  // 创建订单记录
  const client = useSupabaseClient(event);
  const { data: order, error: dbError } = await client
    .from('payment_orders')
    .insert({
      order_no: orderNo,
      user_id: userId,
      product_type: productId,
      product_name: product.name,
      amount: product.price,
      payment_method: paymentMethod,
      status: 'pending',
      extra_data: {
        aiCount: product.aiCount,
        vipLevel: product.vipLevel,
        durationDays: product.durationDays,
      }
    })
    .select()
    .single();

  if (dbError) {
    return { error: '创建订单失败', success: false };
  }

  // 根据支付方式生成支付链接/二维码
  let paymentUrl = '';
  let qrCodeUrl = '';

  try {
    if (paymentMethod === 'alipay') {
      // 支付宝扫码支付
      const alipayParams = {
        app_id: PAYMENT_CONFIG.alipay.appId,
        method: 'alipay.trade.precreate',
        format: 'JSON',
        charset: 'utf-8',
        sign_type: 'RSA2',
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
        version: '1.0',
        notify_url: PAYMENT_CONFIG.alipay.notifyUrl,
        biz_content: JSON.stringify({
          out_trade_no: orderNo,
          total_amount: product.price.toFixed(2),
          subject: product.name,
          body: `易可图会员服务 - ${product.name}`,
        }),
      };
      
      const sign = alipaySign(alipayParams, PAYMENT_CONFIG.alipay.privateKey);
      alipayParams.sign = sign;

      // 实际项目中需要调用支付宝API获取二维码链接
      // 这里返回模拟数据，实际使用时替换为真实API调用
      qrCodeUrl = `https://qr.alipay.com/${orderNo}`;
      paymentUrl = `${PAYMENT_CONFIG.alipay.gateway}?${Object.entries(alipayParams).map(([k, v]) => `${k}=${encodeURIComponent(v)}`).join('&')}`;

    } else if (paymentMethod === 'wechat') {
      // 微信扫码支付（Native模式）
      const wechatParams = {
        appid: PAYMENT_CONFIG.wechat.appId,
        mch_id: PAYMENT_CONFIG.wechat.mchId,
        nonce_str: crypto.randomBytes(16).toString('hex'),
        body: product.name,
        out_trade_no: orderNo,
        total_fee: Math.round(product.price * 100), // 微信支付金额单位为分
        spbill_create_ip: '127.0.0.1',
        notify_url: PAYMENT_CONFIG.wechat.notifyUrl,
        trade_type: 'NATIVE',
      };
      
      const sign = wechatSign(wechatParams, PAYMENT_CONFIG.wechat.apiKey);
      wechatParams.sign = sign;

      // 实际项目中需要调用微信API获取二维码链接
      // 这里返回模拟数据
      qrCodeUrl = `weixin://wxpay/bizpayurl?pr=${orderNo}`;
      paymentUrl = JSON.stringify(wechatParams);
    }
  } catch (err) {
    console.error('生成支付链接失败:', err);
    // 即使支付链接生成失败，订单已创建，可以返回订单信息让前端轮询
  }

  return {
    success: true,
    orderNo,
    amount: product.price,
    productName: product.name,
    paymentMethod,
    qrCodeUrl: qrCodeUrl || `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(orderNo)}`,
    paymentUrl,
    createdAt: order.created_at,
  };
});