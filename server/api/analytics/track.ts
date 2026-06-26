import type { H3Event } from 'h3'

interface TrackEventBody {
  eventType: string // 'page_view', 'click', 'download', 'purchase', 'ai_generate', etc.
  eventData: Record<string, unknown>
  userId?: string
  timestamp?: number
}

// 事件类型定义
const VALID_EVENT_TYPES = [
  'page_view',
  'click',
  'download',
  'purchase',
  'ai_generate',
  'template_use',
  'vip_upgrade',
  'login',
  'register',
  'feedback'
]

export default defineEventHandler(async (event: H3Event) => {
  const body = await readBody(event) as TrackEventBody
  
  if (!body.eventType || !VALID_EVENT_TYPES.includes(body.eventType)) {
    return {
      success: false,
      error: 'Invalid event type'
    }
  }
  
  // 记录事件（实际应写入数据库或发送到分析平台）
  const eventRecord = {
    eventType: body.eventType,
    eventData: body.eventData || {},
    userId: body.userId || 'anonymous',
    timestamp: body.timestamp || Date.now(),
    createdAt: new Date().toISOString()
  }
  
  // 模拟存储（实际应使用真实数据库）
  console.log('[Analytics Event]', JSON.stringify(eventRecord))
  
  return {
    success: true,
    eventId: `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    message: 'Event tracked successfully'
  }
})