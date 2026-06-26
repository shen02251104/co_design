/**
 * 查询订单状态API
 * 用于前端轮询检查支付是否完成
 */

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const { orderNo } = query;

  if (!orderNo) {
    return { error: '缺少订单号', success: false };
  }

  const client = useSupabaseClient(event);

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
});