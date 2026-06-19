// 模板列表 API
import { getTemplates } from '../../utils/db'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const type = query.type || ''
  const cate = query.cate || ''
  const search = query.search || ''
  const page = parseInt(query.page as string || '1')
  const pageSize = parseInt(query.pageSize as string || '20')

  // 尝试从数据库获取数据
  let templates: any[] = []
  try {
    templates = await getTemplates(page, pageSize) as any[]
  } catch (dbError: any) {
    console.error('Database error:', dbError.message)
    templates = []
  }
  
  // 如果数据库返回空，使用 mock 数据
  if (templates.length === 0) {
    const mockTemplates = [
      {
        id: '1',
        title: '双十一促销海报',
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
        title: '618年中大促',
        cover: 'https://picsum.photos/400/300?random=2',
        url: 'https://picsum.photos/400/300?random=2',
        width: 750,
        height: 1000,
        state: 1,
        thumb: 'https://picsum.photos/400/300?random=2',
        cate: '促销'
      },
      {
        id: '3',
        title: '新品上市Banner',
        cover: 'https://picsum.photos/400/300?random=3',
        url: 'https://picsum.photos/400/300?random=3',
        width: 1920,
        height: 400,
        state: 1,
        thumb: 'https://picsum.photos/400/300?random=3',
        cate: 'Banner'
      },
      {
        id: '4',
        title: '朋友圈分享图',
        cover: 'https://picsum.photos/400/300?random=4',
        url: 'https://picsum.photos/400/300?random=4',
        width: 1080,
        height: 1080,
        state: 1,
        thumb: 'https://picsum.photos/400/300?random=4',
        cate: '社交'
      },
      {
        id: '5',
        title: '公众号封面',
        cover: 'https://picsum.photos/400/300?random=5',
        url: 'https://picsum.photos/400/300?random=5',
        width: 900,
        height: 383,
        state: 1,
        thumb: 'https://picsum.photos/400/300?random=5',
        cate: '公众号'
      },
      {
        id: '6',
        title: '小红书图文',
        cover: 'https://picsum.photos/400/300?random=6',
        url: 'https://picsum.photos/400/300?random=6',
        width: 1080,
        height: 1440,
        state: 1,
        thumb: 'https://picsum.photos/400/300?random=6',
        cate: '小红书'
      }
    ]
    templates = mockTemplates
  }
  
  // 转换为前端期望的字段名格式
  const list = templates.map((t: any) => ({
    id: t.id,
    title: t.name || t.title,
    cover: t.preview_url || t.cover_url || t.cover,
    url: t.preview_url || t.cover_url || t.url,
    width: t.width,
    height: t.height,
    state: t.is_public || t.state || 1,
    thumb: t.preview_url || t.cover_url || t.thumb || t.cover,
    // 不返回 data 字段，让前端调用详情 API
  }))

  return {
    code: 200,
    data: {
      list,
      total: list.length
    },
    success: true
  }
})