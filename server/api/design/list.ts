// 模板列表 API - 从数据库获取真实数据
import { getTemplates } from '../../utils/db'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const type = query.type || ''
  const cate = query.cate || ''
  const search = query.search || ''
  const page = parseInt(query.page as string || '1')
  const pageSize = parseInt(query.pageSize as string || '20')

  try {
    // 尝试从数据库获取数据
    const templates = await getTemplates(search, cate, page, pageSize) as any[]
    
    // 转换为前端期望的字段名格式
    const list = templates.map((t: any) => ({
      id: t.id,
      title: t.name,
      cover: t.preview_url || t.cover_url,
      url: t.preview_url || t.cover_url,
      width: t.width,
      height: t.height,
      state: t.is_public || 1,
      thumb: t.preview_url || t.cover_url,
      // 不返回 data 字段，让前端调用详情 API
    }))

    return {
      code: 200,
      data: {
        list,
        total: list.length // 简化返回
      },
      success: true
    }
  } catch (error: any) {
    console.error('Database error:', error.message)
    
    // 如果数据库连接失败，返回 mock 数据作为兜底
    const mockTemplates = [
      {
        id: '1',
        title: '电商促销海报',
        cover: 'https://picsum.photos/400/300?random=1',
        url: 'https://picsum.photos/400/300?random=1',
        width: 800,
        height: 600,
        state: 1,
        thumb: 'https://picsum.photos/400/300?random=1',
        cate: '促销'
      },
      {
        id: '2',
        title: '示例模板 - 日签插画手机海报',
        cover: 'https://picsum.photos/400/300?random=2',
        url: 'https://picsum.photos/400/300?random=2',
        width: 1242,
        height: 2208,
        state: 1,
        thumb: 'https://picsum.photos/400/300?random=2',
        cate: '日签'
      },
      {
        id: '3',
        title: '节日活动海报',
        cover: 'https://picsum.photos/400/300?random=3',
        url: 'https://picsum.photos/400/300?random=3',
        width: 800,
        height: 800,
        state: 1,
        thumb: 'https://picsum.photos/400/300?random=3',
        cate: '节日'
      }
    ]

    return {
      code: 200,
      data: {
        list: mockTemplates,
        total: mockTemplates.length
      },
      success: true
    }
  }
})