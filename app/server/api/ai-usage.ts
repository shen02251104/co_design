import type { Handler } from '@netlify/functions'

/**
 * AI Usage API - 获取用户AI设计次数使用情况
 * 
 * GET: 获取用户当月AI次数使用情况
 * POST: 消耗一次AI设计次数
 */

// 用户会员等级对应的AI次数限制
const VIP_LIMITS = {
  free: 5,        // 免费版：5次/月
  basic: 50,      // 基础版：50次/月
  pro: 200,       // 专业版：200次/月
  lifetime: -1    // 终身版：无限次
}

// 模拟用户数据（实际应从数据库获取）
const mockUserData: Record<string, { vipLevel: string, usedCount: number, extraCount: number }> = {
  'default': { vipLevel: 'free', usedCount: 0, extraCount: 0 }
}

export const handler: Handler = async (event) => {
  const method = event.httpMethod
  const userId = event.headers['x-user-id'] || 'default'
  
  // 获取用户数据
  const userData = mockUserData[userId] || mockUserData['default']
  
  if (method === 'GET') {
    // 获取使用情况
    const vipLimit = VIP_LIMITS[userData.vipLevel as keyof typeof VIP_LIMITS] || VIP_LIMITS.free
    const remaining = vipLimit === -1 ? -1 : vipLimit - userData.usedCount + userData.extraCount
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        data: {
          vipLevel: userData.vipLevel,
          vipLimit,
          usedCount: userData.usedCount,
          extraCount: userData.extraCount,
          remaining,
          isVip: userData.vipLevel !== 'free',
          isUnlimited: vipLimit === -1
        }
      })
    }
  }
  
  if (method === 'POST') {
    // 消耗一次AI设计次数
    const vipLimit = VIP_LIMITS[userData.vipLevel as keyof typeof VIP_LIMITS] || VIP_LIMITS.free
    
    if (vipLimit === -1) {
      // 终身版，无限次
      return {
        statusCode: 200,
        body: JSON.stringify({
          success: true,
          message: '终身会员，无次数限制',
          remaining: -1
        })
      }
    }
    
    const totalAvailable = vipLimit - userData.usedCount + userData.extraCount
    
    if (totalAvailable <= 0) {
      // 次数已用完
      return {
        statusCode: 403,
        body: JSON.stringify({
          success: false,
          error: 'AI次数已用完',
          code: 'USAGE_LIMIT_EXCEEDED',
          data: {
            vipLevel: userData.vipLevel,
            usedCount: userData.usedCount,
            vipLimit,
            extraCount: userData.extraCount,
            remaining: 0
          },
          suggestions: [
            '升级会员获得更多次数',
            '购买次数包继续使用',
            '免费用户每月5次，下月刷新'
          ]
        })
      }
    }
    
    // 消耗次数
    if (userData.extraCount > 0) {
      userData.extraCount--
    } else {
      userData.usedCount++
    }
    
    const remaining = vipLimit - userData.usedCount + userData.extraCount
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'AI次数已消耗',
        remaining,
        warning: remaining <= 5 && remaining > 0 ? '次数即将用完，请及时购买' : undefined
      })
    }
  }
  
  return {
    statusCode: 405,
    body: JSON.stringify({ error: 'Method not allowed' })
  }
}