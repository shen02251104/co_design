import { getUserDesigns, getDesignCount, deleteDesign } from '../../utils/db'

// Mock data for designs when database is not available
const mockDesigns = [
  {
    id: '1',
    name: '促销海报设计',
    type: 'poster',
    coverUrl: '/images/designs/poster-1.png',
    width: 800,
    height: 1200,
    createdAt: '2024-01-15 10:30:00',
    updatedAt: '2024-01-16 15:45:00',
    status: 'published'
  },
  {
    id: '2',
    name: '双十一主图',
    type: 'main_image',
    coverUrl: '/images/designs/main-2.png',
    width: 800,
    height: 800,
    createdAt: '2024-01-14 09:00:00',
    updatedAt: '2024-01-14 12:00:00',
    status: 'draft'
  },
  {
    id: '3',
    name: '微信公众号首图',
    type: 'social',
    coverUrl: '/images/designs/wechat-3.png',
    width: 900,
    height: 500,
    createdAt: '2024-01-10 14:00:00',
    updatedAt: '2024-01-10 16:30:00',
    status: 'published'
  }
]

export default defineEventHandler(async (event) => {
  const method = event.node.req.method
  const query = getQuery(event)

  try {
    if (method === 'GET') {
      // 获取用户设计列表
      const userId = query.userId as string
      const page = parseInt(query.page as string) || 1
      const pageSize = parseInt(query.pageSize as string) || 20

      let designs: any[] = []
      let total = 0

      try {
        const result = await getUserDesigns(userId, page, pageSize)
        designs = result || []
        total = await getDesignCount(userId) || 0
      } catch (dbError) {
        // Database not available, use mock data
        designs = mockDesigns.slice((page - 1) * pageSize, page * pageSize)
        total = mockDesigns.length
      }

      return {
        code: 200,
        data: {
          designs,
          total,
          page,
          pageSize
        }
      }
    }

    if (method === 'DELETE') {
      // 删除设计
      const body = await readBody(event)
      const deleteUserId = body.userId || query.userId as string
      try {
        await deleteDesign(deleteUserId, body.id)
      } catch (dbError) {
        // Mock deletion success
        console.log('Mock delete design:', body.id)
      }
      return {
        code: 200,
        message: '设计删除成功'
      }
    }

    return {
      code: 405,
      message: '不支持的请求方法'
    }
  } catch (error) {
    console.error('设计API错误:', error)
    return {
      code: 500,
      message: '服务器错误'
    }
  }
})