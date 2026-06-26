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
 * 支付配置
 * 实际使用时需要替换为真实的商户配置
 */
const PAYMENT_CONFIG = {
  alipay: {
    appId: process.env.ALIPAY_APP_ID || 'YOUR_ALIPAY_APP_ID',
    privateKey: process.env.ALIPAY_PRIVATE_KEY || 'YOUR_ALIPAY_PRIVATE_KEY',
    publicKey: process.env.ALIPAY_PUBLIC_KEY || 'YOUR_ALIPAY_PUBLIC_KEY',
    gateway: 'https://openapi.alipay.com/gateway.do',
    notifyUrl: `${process.env.COZE_PROJECT_DOMAIN_DEFAULT || 'http://localhost:5000'}/api/payment/callback/alipay`,
  },
  wechat: {
    appId: process.env.WECHAT_APP_ID || 'YOUR_WECHAT_APP_ID',
    mchId: process.env.WECHAT_MCH_ID || 'YOUR_WECHAT_MCH_ID',
    apiKey: process.env.WECHAT_API_KEY || 'YOUR_WECHAT_API_KEY',
    notifyUrl: `${process.env.COZE_PROJECT_DOMAIN_DEFAULT || 'http://localhost:5000'}/api/payment/callback/wechat`,
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
 * 产品定价配置
 */
const PRODUCT_PRICES: Record<string, { name: string; price: number; vipLevel?: string; durationDays?: number | null; aiCount?: number }> = {
  'vip_basic_monthly': { name: '基础版月卡', price: 29.9, vipLevel: 'basic', durationDays: 30 },
  'vip_basic_yearly': { name: '基础版年卡', price: 199, vipLevel: 'basic', durationDays: 365 },
  'vip_pro_monthly': { name: '专业版月卡', price: 59.9, vipLevel: 'pro', durationDays: 30 },
  'vip_pro_yearly': { name: '专业版年卡', price: 399, vipLevel: 'pro', durationDays: 365 },
  'vip_lifetime': { name: '终身版', price: 999, vipLevel: 'lifetime', durationDays: null },
  'ai_credits_100': { name: 'AI次数100次', price: 19.9, aiCount: 100 },
  'ai_credits_500': { name: 'AI次数500次', price: 69.9, aiCount: 500 },
};

interface CreateOrderRequest {
  userId: string;
  productId: string;
  paymentMethod: 'alipay' | 'wechat';
}

export default defineEventHandler(async (event: H3Event) => {
  try {
    const client = getServerSupabaseClient();
    const body = await readBody(event) as CreateOrderRequest;
    const { userId, productId, paymentMethod } = body;

    // 获取产品信息
    const product = PRODUCT_PRICES[productId];
    if (!product) {
      return { success: false, error: '无效的产品ID' };
    }

    // 生成订单号
    const orderNo = generateOrderNo();
    const now = new Date();

    // 创建订单记录
    const orderData = {
      order_no: orderNo,
      user_id: userId,
      product_id: productId,
      product_name: product.name,
      amount: product.price,
      payment_method: paymentMethod,
      status: 'pending',
      extra_data: {
        vipLevel: product.vipLevel,
        durationDays: product.durationDays,
        aiCount: product.aiCount,
      },
      created_at: now.toISOString(),
      updated_at: now.toISOString(),
    };

    await client
      .from('payment_orders')
      .insert(orderData);

    // 生成支付二维码URL（模拟）
    let qrCodeUrl: string;
    
    if (paymentMethod === 'alipay') {
      // 支付宝支付参数
      const alipayParams: Record<string, string> = {
        app_id: PAYMENT_CONFIG.alipay.appId,
        method: 'alipay.trade.page.pay',
        format: 'JSON',
        return_url: `${process.env.COZE_PROJECT_DOMAIN_DEFAULT || 'http://localhost:5000'}/payment-result`,
        charset: 'utf-8',
        sign_type: 'RSA2',
        timestamp: now.toISOString().replace('T', ' ').substring(0, 19),
        version: '1.0',
        notify_url: PAYMENT_CONFIG.alipay.notifyUrl,
        biz_content: JSON.stringify({
          out_trade_no: orderNo,
          product_code: 'FAST_INSTANT_TRADE_PAY',
          total_amount: product.price.toFixed(2),
          subject: product.name,
        }),
      };
      
      alipayParams.sign = alipaySign(alipayParams, PAYMENT_CONFIG.alipay.privateKey);
      
      // 模拟二维码URL（实际应调用支付宝API生成）
      qrCodeUrl = `https://qr.alipay.com/${orderNo}`;
    } else {
      // 微信支付参数
      // 模拟二维码URL（实际应调用微信API生成）
      qrCodeUrl = `weixin://wxpay/bizpayurl?pr=${orderNo}`;
    }

    return {
      success: true,
      orderNo,
      productName: product.name,
      amount: product.price,
      qrCodeUrl,
    };
  } catch (error) {
    console.error('Create order error:', error);
    return { success: false, error: '创建订单失败' };
  }
});