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
 * 查询订单状态API
 * 用于前端轮询检查支付是否完成
 */

export default defineEventHandler(async (event: H3Event) => {
  const query = getQuery(event);
  const orderNo = query.orderNo as string;

  if (!orderNo) {
    return { error: '缺少订单号', success: false };
  }

  try {
    const client = getServerSupabaseClient();

    // 查询订单
    const { data: order, error } = await client
      .from('payment_orders')
      .select('*')
      .eq('order_no', orderNo)
      .single();

    if (error || !order) {
      return { error: '订单不存在', success: false };
    }

    // 返回订单状态
    return {
      success: true,
      orderNo: order.order_no,
      status: order.status,
      amount: order.amount,
      productName: order.product_name,
      paymentMethod: order.payment_method,
      paidAt: order.paid_at,
      createdAt: order.created_at,
    };
  } catch (err) {
    console.error('Query order error:', err);
    return { error: '查询失败', success: false };
  }
});