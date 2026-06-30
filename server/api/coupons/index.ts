import { 
  getAvailableCoupons,
  getUserCoupons,
  claimCoupon,
  useCoupon,
  createCoupon
} from '../../utils/db'

export default defineEventHandler(async (event) => {
  const method = event.node.req.method
  const query = getQuery(event)

  try {
    const userId = query.userId as string

    if (method === 'GET') {
      const action = query.action as string
      
      if (action === 'available') {
        // 获取可领取的优惠券
        const result = await getAvailableCoupons(userId)
        return {
          code: 200,
          data: result
        }
      }
      
      if (action === 'my') {
        // 获取用户已领取的优惠券
        const result = await getUserCoupons(userId)
        return {
          code: 200,
          data: result
        }
      }
      
      return {
        code: 400,
        message: '缺少action参数'
      }
    }

    if (method === 'POST') {
      const body = await readBody(event)
      
      if (body.action === 'claim') {
        // 领取优惠券
        await claimCoupon(userId, body.couponId)
        return {
          code: 200,
          message: '优惠券领取成功'
        }
      }
      
      if (body.action === 'use') {
        // 使用优惠券
        const result = await useCoupon(userId, body.couponId, body.orderId)
        return {
          code: 200,
          data: result,
          message: '优惠券使用成功'
        }
      }
      
      if (body.action === 'create') {
        // 创建优惠券（管理员）
        const result = await createCoupon(body)
        return {
          code: 200,
          data: result,
          message: '优惠券创建成功'
        }
      }
      
      return {
        code: 400,
        message: '缺少action参数'
      }
    }

    return {
      code: 405,
      message: '不支持的请求方法'
    }
  } catch (error) {
    console.error('优惠券API错误:', error)
    return {
      code: 500,
      message: '服务器错误',
      error: String(error)
    }
  }
})