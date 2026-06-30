// 模板列表 API - 获取模板分类和模板列表
import { getTemplatesByCategory, getTemplateCategories } from '../../utils/db'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const category = query.category as string || 'all'
  const page = parseInt(query.page as string) || 1
  const pageSize = parseInt(query.pageSize as string) || 20

  try {
    // 尝试从数据库获取数据
    const templates = await getTemplatesByCategory(category, page, pageSize) as any[]
    const categories = await getTemplateCategories() as any[]

    if (templates && templates.length > 0) {
      return {
        code: 200,
        data: {
          templates: templates.map(t => ({
            id: t.id,
            title: t.title,
            cover: t.cover_image || '/images/template-placeholder.png',
            width: t.width,
            height: t.height,
            category: t.category,
            isVip: t.is_vip === 1,
            downloads: t.downloads || 0,
            tags: t.tags ? JSON.parse(t.tags) : []
          })),
          categories: categories.map(c => ({
            id: c.id,
            name: c.name,
            count: c.count || 0
          })),
          total: templates.length,
          page,
          pageSize
        },
        success: true
      }
    }
  } catch (error: any) {
    console.error('Database error:', error.message)
  }

  // 如果数据库连接失败，返回 mock 数据作为兜底
  const mockTemplates = [
    {
      id: '1',
      title: '电商促销海报',
      cover: '/images/templates/promo-1.png',
      width: 800,
      height: 1200,
      category: '电商海报',
      isVip: false,
      downloads: 1234,
      tags: ['促销', '电商', '活动']
    },
    {
      id: '2',
      title: '双十一主图',
      cover: '/images/templates/main-2.png',
      width: 800,
      height: 800,
      category: '电商海报',
      isVip: true,
      downloads: 2567,
      tags: ['主图', '双十一', '促销']
    },
    {
      id: '3',
      title: '微信公众号首图',
      cover: '/images/templates/wechat-3.png',
      width: 900,
      height: 500,
      category: '社交媒体',
      isVip: false,
      downloads: 890,
      tags: ['微信', '公众号', '首图']
    },
    {
      id: '4',
      title: '小红书封面',
      cover: '/images/templates/xhs-4.png',
      width: 1080,
      height: 1440,
      category: '社交媒体',
      isVip: true,
      downloads: 1567,
      tags: ['小红书', '封面', '种草']
    },
    {
      id: '5',
      title: '企业宣传海报',
      cover: '/images/templates/corp-5.png',
      width: 1080,
      height: 1920,
      category: '企业宣传',
      isVip: true,
      downloads: 456,
      tags: ['企业', '宣传', '商务']
    },
    {
      id: '6',
      title: '节日活动海报',
      cover: '/images/templates/festival-6.png',
      width: 800,
      height: 1200,
      category: '节日活动',
      isVip: false,
      downloads: 789,
      tags: ['节日', '活动', '促销']
    },
    {
      id: '7',
      title: '产品展示Banner',
      cover: '/images/templates/banner-7.png',
      width: 1920,
      height: 600,
      category: '电商海报',
      isVip: false,
      downloads: 2345,
      tags: ['Banner', '产品', '展示']
    },
    {
      id: '8',
      title: '招聘海报',
      cover: '/images/templates/recruit-8.png',
      width: 1080,
      height: 1440,
      category: '企业宣传',
      isVip: false,
      downloads: 567,
      tags: ['招聘', 'HR', '企业']
    }
  ]

  const mockCategories = [
    { id: 'all', name: '全部', count: 8 },
    { id: '电商海报', name: '电商海报', count: 3 },
    { id: '社交媒体', name: '社交媒体', count: 2 },
    { id: '企业宣传', name: '企业宣传', count: 2 },
    { id: '节日活动', name: '节日活动', count: 1 }
  ]

  // 根据分类筛选
  let filteredTemplates = mockTemplates
  if (category !== 'all') {
    filteredTemplates = mockTemplates.filter(t => t.category === category)
  }

  return {
    code: 200,
    data: {
      templates: filteredTemplates,
      categories: mockCategories,
      total: filteredTemplates.length,
      page,
      pageSize
    },
    success: true
  }
})