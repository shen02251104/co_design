// 模板列表 API
export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const type = query.type || '1'
  const cate = query.cate || ''
  const search = query.search || ''

  // Mock 模板数据
  const allTemplates = [
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
      title: '新品上市海报',
      cover: 'https://picsum.photos/400/300?random=2',
      url: 'https://picsum.photos/400/300?random=2',
      width: 750,
      height: 500,
      state: 1,
      thumb: 'https://picsum.photos/400/300?random=2',
      cate: '新品'
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
    },
    {
      id: '4',
      title: '品牌宣传海报',
      cover: 'https://picsum.photos/400/300?random=4',
      url: 'https://picsum.photos/400/300?random=4',
      width: 1080,
      height: 1920,
      state: 1,
      thumb: 'https://picsum.photos/400/300?random=4',
      cate: '品牌'
    },
    {
      id: '5',
      title: '简约促销海报',
      cover: 'https://picsum.photos/400/300?random=5',
      url: 'https://picsum.photos/400/300?random=5',
      width: 800,
      height: 600,
      state: 1,
      thumb: 'https://picsum.photos/400/300?random=5',
      cate: '促销'
    },
    {
      id: '6',
      title: '618大促海报',
      cover: 'https://picsum.photos/400/300?random=6',
      url: 'https://picsum.photos/400/300?random=6',
      width: 800,
      height: 600,
      state: 1,
      thumb: 'https://picsum.photos/400/300?random=6',
      cate: '促销'
    }
  ]

  // 过滤
  let filtered = allTemplates
  if (cate) {
    filtered = filtered.filter(t => t.cate === cate)
  }

  return {
    code: 200,
    data: {
      list: filtered,
      total: filtered.length
    },
    success: true
  }
})