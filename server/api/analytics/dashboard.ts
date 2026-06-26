import type { H3Event } from 'h3'

interface AnalyticsData {
  totalUsers: number
  vipUsers: number
  todayOrders: number
  monthRevenue: number
  aiUsageToday: number
  popularTemplates: Array<{
    id: string
    name: string
    usageCount: number
  }>
}

export default defineEventHandler(async (event: H3Event): Promise<AnalyticsData> => {
  // 模拟统计数据（实际应从数据库查询）
  const mockData: AnalyticsData = {
    totalUsers: 1234,
    vipUsers: 567,
    todayOrders: 23,
    monthRevenue: 8976.00,
    aiUsageToday: 456,
    popularTemplates: [
      { id: '1', name: '电商促销海报', usageCount: 128 },
      { id: '2', name: '商品详情页', usageCount: 95 },
      { id: '3', name: '朋友圈海报', usageCount: 82 },
      { id: '4', name: '直播封面', usageCount: 67 },
      { id: '5', name: '短视频封面', usageCount: 54 }
    ]
  }
  
  return mockData
})