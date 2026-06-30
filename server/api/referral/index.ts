import { 
  getReferralInfo, 
  createReferral, 
  getReferralRewards,
  claimReward 
} from '../../utils/db'

export default defineEventHandler(async (event) => {
  const method = event.node.req.method
  const query = getQuery(event)

  try {
    const userId = query.userId as string

    if (method === 'GET') {
      // 获取邀请信息
      const action = query.action as string
      
      if (action === 'info') {
        const result = await getReferralInfo(userId)
        return {
          code: 200,
          data: result
        }
      }
      
      if (action === 'rewards') {
        const result = await getReferralRewards(userId)
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
      
      if (body.action === 'claimReward') {
        // 领取奖励
        await claimReward(userId, body.rewardId)
        return {
          code: 200,
          message: '奖励领取成功'
        }
      }
      
      // 创建邀请记录
      const result = await createReferral(userId, body.inviteeId)
      return {
        code: 200,
        data: result,
        message: '邀请成功'
      }
    }

    return {
      code: 405,
      message: '不支持的请求方法'
    }
  } catch (error) {
    console.error('邀请API错误:', error)
    return {
      code: 500,
      message: '服务器错误'
    }
  }
})