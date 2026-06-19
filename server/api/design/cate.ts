import type { DefineAPI } from 'nuxt'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const type = query.type || '1'

  // 分类数据
  const categories = [
    { id: 1, name: '海报', type: 'poster' },
    { id: 2, name: 'Banner', type: 'banner' },
    { id: 3, name: '朋友圈', type: 'social' },
    { id: 4, name: '公众号', type: 'wechat' },
    { id: 5, name: '小红书', type: 'xiaohongshu' },
    { id: 6, name: '电商详情页', type: 'ecommerce' },
  ]

  return {
    code: 200,
    data: {
      list: categories,
      total: categories.length,
    },
    success: true,
    message: '获取分类成功',
  }
})