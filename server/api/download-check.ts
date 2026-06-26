import type { H3Event } from 'h3'

/**
 * Download API - 下载验证和权限检查
 * 
 * POST: 检查用户是否有权限下载（无水印、高清等）
 */

interface DownloadRequest {
  noWatermark?: boolean
  requestedFormat?: string
  requestedResolution?: number
  commercialUse?: boolean
}

interface VipBenefits {
  watermark: boolean
  maxResolution: number
  commercialUse: boolean
  downloadFormats: string[]
}

// 用户会员权益配置
const VIP_BENEFITS: Record<string, VipBenefits> = {
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

// 默认权益
const DEFAULT_BENEFITS: VipBenefits = {
  watermark: true,
  maxResolution: 800,
  commercialUse: false,
  downloadFormats: ['png']
}

// 模拟用户数据
const mockUserData: Record<string, { vipLevel: string }> = {
  'default': { vipLevel: 'free' }
}

export default defineEventHandler(async (event: H3Event) => {
  const userId = getHeader(event, 'x-user-id') || 'default'
  const userData = mockUserData[userId] || { vipLevel: 'free' }
  
  try {
    const body = await readBody(event) as DownloadRequest
    const { requestedFormat, requestedResolution, commercialUse } = body
    
    const benefits: VipBenefits = VIP_BENEFITS[userData.vipLevel] ?? DEFAULT_BENEFITS
    
    // 检查水印权限
    if (body.noWatermark && benefits.watermark) {
      return {
        success: false,
        error: '当前会员等级不支持无水印下载，请升级VIP',
        requiredLevel: 'basic'
      }
    }
    
    // 检查分辨率权限
    if (requestedResolution && benefits.maxResolution !== -1 && requestedResolution > benefits.maxResolution) {
      return {
        success: false,
        error: `当前会员等级最大支持${benefits.maxResolution}px分辨率`,
        maxAllowed: benefits.maxResolution,
        requiredLevel: userData.vipLevel === 'free' ? 'basic' : 'pro'
      }
    }
    
    // 检查商用权限
    if (commercialUse && !benefits.commercialUse) {
      return {
        success: false,
        error: '当前会员等级不支持商用授权，请升级VIP',
        requiredLevel: 'basic'
      }
    }
    
    // 检查格式权限
    if (requestedFormat && !benefits.downloadFormats.includes(requestedFormat)) {
      return {
        success: false,
        error: `当前会员等级不支持${requestedFormat}格式下载`,
        allowedFormats: benefits.downloadFormats,
        requiredLevel: 'pro'
      }
    }
    
    // 权限验证通过
    return {
      success: true,
      benefits: {
        ...benefits,
        vipLevel: userData.vipLevel
      },
      message: '下载权限验证通过'
    }
  } catch (error) {
    return {
      success: false,
      error: '请求处理失败'
    }
  }
})