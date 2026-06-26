import type { Handler } from '@netlify/functions'

/**
 * Download API - 下载验证和权限检查
 * 
 * POST: 检查用户是否有权限下载（无水印、高清等）
 */

// 用户会员权益配置
const VIP_BENEFITS = {
  free: {
    watermark: true,      // 有水印
    maxResolution: 800,   // 最大分辨率800px
    commercialUse: false, // 不支持商用
    downloadFormats: ['png'] // 仅支持PNG
  },
  basic: {
    watermark: false,
    maxResolution: 1500,
    commercialUse: true, // 基础商用授权
    downloadFormats: ['png', 'jpg']
  },
  pro: {
    watermark: false,
    maxResolution: 3000, // 高清
    commercialUse: true, // 专业商用授权
    downloadFormats: ['png', 'jpg', 'pdf']
  },
  lifetime: {
    watermark: false,
    maxResolution: -1, // 无限制
    commercialUse: true, // VIP商用授权
    downloadFormats: ['png', 'jpg', 'pdf', 'svg', 'psd']
  }
}

// 模拟用户数据
const mockUserData: Record<string, { vipLevel: string }> = {
  'default': { vipLevel: 'free' }
}

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    }
  }

  const userId = event.headers['x-user-id'] || 'default'
  const userData = mockUserData[userId] || mockUserData['default']
  
  try {
    const body = JSON.parse(event.body || '{}')
    const { requestedFormat, requestedResolution, commercialUse } = body
    
    const benefits = VIP_BENEFITS[userData.vipLevel as keyof typeof VIP_BENEFITS] || VIP_BENEFITS.free
    
    // 检查水印权限
    if (body.noWatermark && benefits.watermark) {
      return {
        statusCode: 403,
        body: JSON.stringify({
          success: false,
          error: '无水印下载需要会员权限',
          code: 'WATERMARK_REQUIRED',
          data: {
            vipLevel: userData.vipLevel,
            currentBenefit: '带水印',
            requiredBenefit: '无水印'
          },
          suggestions: [
            '升级会员解锁无水印下载',
            '基础版会员即可解锁无水印',
            '单次购买商用授权 ¥5'
          ],
          upgradeLink: '/membership-pricing'
        })
      }
    }
    
    // 检查分辨率权限
    if (requestedResolution && benefits.maxResolution !== -1 && requestedResolution > benefits.maxResolution) {
      return {
        statusCode: 403,
        body: JSON.stringify({
          success: false,
          error: `高清下载需要更高会员权限（当前最大${benefits.maxResolution}px）`,
          code: 'RESOLUTION_LIMITED',
          data: {
            vipLevel: userData.vipLevel,
            maxResolution: benefits.maxResolution,
            requestedResolution
          },
          suggestions: [
            '专业版会员支持3000px高清下载',
            '终身版会员支持无限分辨率'
          ],
          upgradeLink: '/membership-pricing'
        })
      }
    }
    
    // 检查格式权限
    if (requestedFormat && !benefits.downloadFormats.includes(requestedFormat)) {
      return {
        statusCode: 403,
        body: JSON.stringify({
          success: false,
          error: `${requestedFormat}格式导出需要会员权限`,
          code: 'FORMAT_RESTRICTED',
          data: {
            vipLevel: userData.vipLevel,
            availableFormats: benefits.downloadFormats,
            requestedFormat
          },
          suggestions: [
            '升级会员解锁更多导出格式',
            '终身版会员支持PSD/SVG导出'
          ],
          upgradeLink: '/membership-pricing'
        })
      }
    }
    
    // 检查商用权限
    if (commercialUse && !benefits.commercialUse) {
      return {
        statusCode: 403,
        body: JSON.stringify({
          success: false,
          error: '商用需要授权，请购买会员或单次授权',
          code: 'COMMERCIAL_USE_RESTRICTED',
          data: {
            vipLevel: userData.vipLevel,
            commercialUseAvailable: false
          },
          suggestions: [
            '升级基础版会员获得商用授权',
            '单次购买商用授权 ¥5',
            '终身版会员含VIP商用授权证书'
          ],
          upgradeLink: '/membership-pricing'
        })
      }
    }
    
    // 权限验证通过
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: '下载权限验证通过',
        data: {
          vipLevel: userData.vipLevel,
          benefits,
          canDownload: true,
          watermark: benefits.watermark,
          maxResolution: benefits.maxResolution,
          formats: benefits.downloadFormats,
          commercialUse: benefits.commercialUse
        }
      })
    }
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        success: false,
        error: '请求参数错误'
      })
    }
  }
}