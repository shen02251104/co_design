<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 py-8">
      <h1 class="text-2xl font-semibold text-gray-900 mb-6">运营数据统计</h1>

      <!-- 核心数据卡片 -->
      <div class="grid grid-cols-4 gap-4 mb-6">
        <div class="bg-white rounded-xl p-6 shadow-sm">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-3xl font-bold text-indigo-600">{{ dashboardData.totalUsers }}</div>
              <div class="text-sm text-gray-500 mt-1">注册用户</div>
            </div>
            <div class="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 3a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
          <div class="text-xs text-green-500 mt-2">↑ {{ dashboardData.newUsersToday }} 今日新增</div>
        </div>

        <div class="bg-white rounded-xl p-6 shadow-sm">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-3xl font-bold text-green-600">{{ dashboardData.vipUsers }}</div>
              <div class="text-sm text-gray-500 mt-1">VIP会员</div>
            </div>
            <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
          </div>
          <div class="text-xs text-gray-500 mt-2">{{ dashboardData.vipRate }}% 转化率</div>
        </div>

        <div class="bg-white rounded-xl p-6 shadow-sm">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-3xl font-bold text-blue-600">{{ dashboardData.totalDesigns }}</div>
              <div class="text-sm text-gray-500 mt-1">设计作品</div>
            </div>
            <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <div class="text-xs text-blue-500 mt-2">↑ {{ dashboardData.designsToday }} 今日创建</div>
        </div>

        <div class="bg-white rounded-xl p-6 shadow-sm">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-3xl font-bold text-yellow-600">¥{{ dashboardData.totalRevenue }}</div>
              <div class="text-sm text-gray-500 mt-1">总收入</div>
            </div>
            <div class="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div class="text-xs text-green-500 mt-2">↑ {{ dashboardData.revenueToday }} 今日</div>
        </div>
      </div>

      <!-- 趋势图表区 -->
      <div class="grid grid-cols-2 gap-6 mb-6">
        <div class="bg-white rounded-xl p-6 shadow-sm">
          <h2 class="text-lg font-semibold mb-4">用户增长趋势</h2>
          <div class="h-48 flex items-end gap-2">
            <div v-for="(item, index) in userGrowthData" :key="index" class="flex-1 flex flex-col items-center">
              <div 
                class="w-full bg-indigo-500 rounded-t transition-all hover:bg-indigo-600"
                :style="{ height: `${(item.value / maxValue(userGrowthData)) * 150}px` }"
              ></div>
              <span class="text-xs text-gray-500 mt-2">{{ item.label }}</span>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl p-6 shadow-sm">
          <h2 class="text-lg font-semibold mb-4">收入趋势</h2>
          <div class="h-48 flex items-end gap-2">
            <div v-for="(item, index) in revenueGrowthData" :key="index" class="flex-1 flex flex-col items-center">
              <div 
                class="w-full bg-green-500 rounded-t transition-all hover:bg-green-600"
                :style="{ height: `${(item.value / maxValue(revenueGrowthData)) * 150}px` }"
              ></div>
              <span class="text-xs text-gray-500 mt-2">{{ item.label }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 详细数据表格 -->
      <div class="bg-white rounded-xl shadow-sm overflow-hidden">
        <div class="p-4 border-b flex items-center justify-between">
          <h2 class="text-lg font-semibold">功能使用统计</h2>
          <select v-model="dateRange" class="px-3 py-1.5 border rounded-lg text-sm">
            <option value="7">最近7天</option>
            <option value="30">最近30天</option>
            <option value="90">最近90天</option>
          </select>
        </div>
        <table class="w-full">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-4 py-3 text-left text-sm font-medium text-gray-500">功能模块</th>
              <th class="px-4 py-3 text-left text-sm font-medium text-gray-500">使用次数</th>
              <th class="px-4 py-3 text-left text-sm font-medium text-gray-500">活跃用户</th>
              <th class="px-4 py-3 text-left text-sm font-medium text-gray-500">占比</th>
              <th class="px-4 py-3 text-left text-sm font-medium text-gray-500">趋势</th>
            </tr>
          </thead>
          <tbody class="divide-y">
            <tr v-for="(stat, index) in featureStats" :key="index" class="hover:bg-gray-50">
              <td class="px-4 py-3 text-sm font-medium text-gray-900">{{ stat.name }}</td>
              <td class="px-4 py-3 text-sm text-gray-500">{{ stat.count }}</td>
              <td class="px-4 py-3 text-sm text-gray-500">{{ stat.users }}</td>
              <td class="px-4 py-3 text-sm text-gray-500">{{ stat.rate }}%</td>
              <td class="px-4 py-3 text-sm">
                <span v-if="stat.trend > 0" class="text-green-500">↑ {{ stat.trend }}%</span>
                <span v-else class="text-red-500">↓ {{ Math.abs(stat.trend) }}%</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const dateRange = ref('7')

const dashboardData = ref({
  totalUsers: 0,
  newUsersToday: 0,
  vipUsers: 0,
  vipRate: 0,
  totalDesigns: 0,
  designsToday: 0,
  totalRevenue: 0,
  revenueToday: 0
})

const userGrowthData = ref<{ label: string; value: number }[]>([])
const revenueGrowthData = ref<{ label: string; value: number }[]>([])
const featureStats = ref<{ name: string; count: number; users: number; rate: number; trend: number }[]>([])

const maxValue = (data: { label: string; value: number }[]) => {
  return Math.max(...data.map(d => d.value), 1)
}

const fetchDashboardData = async () => {
  try {
    const response = await $fetch('/api/analytics/dashboard', {
      params: { days: dateRange.value }
    }) as any

    if (response.code === 200) {
      const data = response.data
      
      dashboardData.value = {
        totalUsers: data.summary.totalUsers || 0,
        newUsersToday: data.summary.newUsersToday || 0,
        vipUsers: data.summary.vipUsers || 0,
        vipRate: data.summary.vipRate || 0,
        totalDesigns: data.summary.totalDesigns || 0,
        designsToday: data.summary.designsToday || 0,
        totalRevenue: data.summary.totalRevenue || 0,
        revenueToday: data.summary.revenueToday || 0
      }
      
      userGrowthData.value = data.userGrowth || []
      revenueGrowthData.value = data.revenueGrowth || []
      featureStats.value = data.featureStats || []
    }
  } catch (error) {
    console.error('获取统计数据失败:', error)
    
    // 模拟数据展示
    dashboardData.value = {
      totalUsers: 1234,
      newUsersToday: 56,
      vipUsers: 234,
      vipRate: 18.9,
      totalDesigns: 5678,
      designsToday: 123,
      totalRevenue: 45678,
      revenueToday: 1234
    }
    
    userGrowthData.value = [
      { label: '周一', value: 45 },
      { label: '周二', value: 52 },
      { label: '周三', value: 38 },
      { label: '周四', value: 65 },
      { label: '周五', value: 78 },
      { label: '周六', value: 89 },
      { label: '周日', value: 67 }
    ]
    
    revenueGrowthData.value = [
      { label: '周一', value: 1200 },
      { label: '周二', value: 1500 },
      { label: '周三', value: 800 },
      { label: '周四', value: 2100 },
      { label: '周五', value: 3200 },
      { label: '周六', value: 4500 },
      { label: '周日', value: 2800 }
    ]
    
    featureStats.value = [
      { name: 'AI智能设计', count: 5678, users: 234, rate: 45.2, trend: 12 },
      { name: '模板使用', count: 3456, users: 189, rate: 32.1, trend: 8 },
      { name: '海报设计', count: 2890, users: 156, rate: 24.5, trend: -3 },
      { name: '文字设计', count: 1234, users: 78, rate: 10.2, trend: 15 },
      { name: '图片抠图', count: 987, users: 45, rate: 8.1, trend: 6 }
    ]
  }
}

watch(dateRange, () => {
  fetchDashboardData()
})

onMounted(() => {
  fetchDashboardData()
})
</script>