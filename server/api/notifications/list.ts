import { getUserNotifications, markNotificationRead } from '../../utils/db'

// Mock data for notifications when database is not available
const mockNotifications = [
  {
    id: '1',
    type: 'system',
    title: '欢迎使用易可图',
    content: '感谢您注册使用易可图，我们为您提供专业的电商设计工具。',
    is_read: false,
    created_at: '2024-01-15 10:00:00'
  },
  {
    id: '2',
    type: 'vip',
    title: 'VIP会员特权',
    content: '升级VIP会员可解锁更多高级模板和AI设计功能。',
    is_read: false,
    created_at: '2024-01-16 08:00:00'
  },
  {
    id: '3',
    type: 'activity',
    title: '新春活动开启',
    content: '新春设计模板已上线，快来创作您的春节海报吧！',
    is_read: true,
    created_at: '2024-01-10 09:00:00'
  },
  {
    id: '4',
    type: 'update',
    title: 'AI功能升级',
    content: 'AI智能设计功能已升级，生成效果更加精美。',
    is_read: true,
    created_at: '2024-01-08 14:00:00'
  }
]

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const userId = query.userId as string
  const action = query.action as string

  try {
    if (action === 'markRead') {
      const notificationId = query.notificationId as string
      try {
        await markNotificationRead(userId, notificationId)
      } catch (dbError) {
        // Mock mark read success
        console.log('Mock mark notification read:', notificationId)
      }
      return {
        code: 200,
        message: '已标记为已读'
      }
    }

    // 获取通知列表
    const page = parseInt(query.page as string) || 1
    const pageSize = parseInt(query.pageSize as string) || 20

    let notifications: any[] = []
    try {
      const result = await getUserNotifications(userId, page, pageSize)
      notifications = result || []
    } catch (dbError) {
      // Database not available, use mock data
      notifications = mockNotifications.slice((page - 1) * pageSize, page * pageSize)
    }

    return {
      code: 200,
      data: {
        notifications,
        unreadCount: notifications.filter(n => !n.is_read).length,
        total: mockNotifications.length,
        page,
        pageSize
      }
    }
  } catch (error) {
    console.error('通知API错误:', error)
    return {
      code: 500,
      message: '服务器错误'
    }
  }
})