// 反馈提交 API
import { query } from '../../utils/db'

interface FeedbackRequest {
  type: 'bug' | 'suggestion' | 'complaint' | 'other'
  content: string
  contact?: string
  userId?: string
}

export default defineEventHandler(async (event) => {
  // 只接受 POST 请求
  const method = getMethod(event)
  if (method !== 'POST') {
    return {
      success: false,
      error: '仅支持POST请求'
    }
  }

  try {
    const body = await readBody(event) as FeedbackRequest
    
    // 验证必填字段
    if (!body.content || body.content.trim().length === 0) {
      return {
        success: false,
        error: '请填写反馈内容'
      }
    }

    // 插入数据库
    const result = await query(
      `INSERT INTO user_feedback (type, content, contact_info, user_id, created_at, status) 
       VALUES (?, ?, ?, ?, NOW(), 'pending')`,
      [body.type, body.content, body.contact || '', body.userId || null]
    )

    return {
      success: true,
      message: '反馈提交成功，我们会尽快处理',
      data: {
        id: (result as any).insertId
      }
    }
  } catch (error: any) {
    console.error('反馈提交失败:', error)
    
    // 如果数据库连接失败，保存到日志作为备份
    const body = await readBody(event)
    console.log('反馈备份:', JSON.stringify(body))
    
    return {
      success: true,
      message: '反馈已记录，我们会尽快处理',
      note: '已保存到系统日志'
    }
  }
})