<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-6 py-8">
      <!-- 页面标题 -->
      <div class="mb-8">
        <h1 class="text-2xl font-semibold text-gray-900">数据分析</h1>
        <p class="text-gray-500 mt-2">设计使用统计、下载记录、效率分析</p>
      </div>

      <!-- 核心数据概览 -->
      <div class="grid grid-cols-5 gap-4 mb-8">
        <div class="bg-white rounded-xl p-5 shadow-sm text-center">
          <div class="text-3xl font-bold text-indigo-600">{{ stats.totalDesigns }}</div>
          <div class="text-sm text-gray-500 mt-1">总设计数</div>
          <div class="text-xs text-green-500 mt-1">↑ {{ stats.newDesignsToday }} 今日</div>
        </div>
        <div class="bg-white rounded-xl p-5 shadow-sm text-center">
          <div class="text-3xl font-bold text-green-600">{{ stats.totalDownloads }}</div>
          <div class="text-sm text-gray-500 mt-1">总下载量</div>
          <div class="text-xs text-blue-500 mt-1">↑ {{ stats.downloadsToday }} 今日</div>
        </div>
        <div class="bg-white rounded-xl p-5 shadow-sm text-center">
          <div class="text-3xl font-bold text-blue-600">{{ stats.usedTemplates }}</div>
          <div class="text-sm text-gray-500 mt-1">模板使用数</div>
          <div class="text-xs text-gray-400 mt-1">{{ stats.favoriteTemplate }} 最常用</div>
        </div>
        <div class="bg-white rounded-xl p-5 shadow-sm text-center">
          <div class="text-3xl font-bold text-yellow-600">{{ stats.avgDesignTime }}分钟</div>
          <div class="text-sm text-gray-500 mt-1">平均设计时间</div>
          <div class="text-xs text-green-500 mt-1">效率提升 {{ stats.efficiency }}%</div>
        </div>
        <div class="bg-white rounded-xl p-5 shadow-sm text-center">
          <div class="text-3xl font-bold text-purple-600">{{ stats.storageUsed }}MB</div>
          <div class="text-sm text-gray-500 mt-1">存储占用</div>
          <div class="text-xs text-gray-400 mt-1">{{ stats.storageLimit }}MB 总容量</div>
        </div>
      </div>

      <!-- 功能入口 -->
      <div class="grid grid-cols-3 gap-6 mb-8">
        <div @click="activeTab = 'usage'" :class="['bg-white rounded-xl p-6 shadow-sm cursor-pointer transition', activeTab === 'usage' ? 'ring-2 ring-indigo-500' : 'hover:shadow-md']">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900">使用统计</h3>
          </div>
          <p class="text-sm text-gray-500">设计类型分布、模板使用频率</p>
        </div>

        <div @click="activeTab = 'download'" :class="['bg-white rounded-xl p-6 shadow-sm cursor-pointer transition', activeTab === 'download' ? 'ring-2 ring-indigo-500' : 'hover:shadow-md']">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900">下载记录</h3>
          </div>
          <p class="text-sm text-gray-500">导出格式分析、下载时间统计</p>
        </div>

        <div @click="activeTab = 'efficiency'" :class="['bg-white rounded-xl p-6 shadow-sm cursor-pointer transition', activeTab === 'efficiency' ? 'ring-2 ring-indigo-500' : 'hover:shadow-md']">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900">效率分析</h3>
          </div>
          <p class="text-sm text-gray-500">设计时间统计、效率提升趋势</p>
        </div>
      </div>

      <!-- 使用统计面板 -->
      <div v-if="activeTab === 'usage'" class="grid grid-cols-2 gap-6">
        <!-- 设计类型分布 -->
        <div class="bg-white rounded-xl shadow-sm p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">设计类型分布</h3>
          <div class="space-y-3">
            <div v-for="type in designTypes" :key="type.name" class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 rounded-full" :style="{ backgroundColor: type.color }"></div>
                <span class="text-sm text-gray-700">{{ type.name }}</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div class="h-full rounded-full" :style="{ width: type.percent + '%', backgroundColor: type.color }"></div>
                </div>
                <span class="text-sm font-medium text-gray-900">{{ type.count }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 热门模板 -->
        <div class="bg-white rounded-xl shadow-sm p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">热门模板使用</h3>
          <div class="space-y-3">
            <div v-for="(template, index) in topTemplates" :key="template.id" class="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition">
              <span class="w-6 h-6 bg-indigo-100 rounded text-xs text-indigo-600 flex items-center justify-center">{{ index + 1 }}</span>
              <div class="flex-1">
                <div class="text-sm font-medium text-gray-900">{{ template.name }}</div>
                <div class="text-xs text-gray-500">{{ template.category }}</div>
              </div>
              <div class="text-sm text-indigo-600 font-medium">{{ template.usageCount }}次</div>
            </div>
          </div>
        </div>

        <!-- 设计趋势 -->
        <div class="bg-white rounded-xl shadow-sm p-6 col-span-2">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">近7天设计趋势</h3>
          <div class="h-48 flex items-end gap-2">
            <div v-for="(data, index) in weeklyData" :key="index" class="flex-1 flex flex-col items-center">
              <div class="w-full bg-indigo-500 rounded-t transition-all hover:bg-indigo-600 relative" :style="{ height: `${(data.count / maxWeeklyCount) * 160}px` }">
                <div class="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-gray-600">{{ data.count }}</div>
              </div>
              <span class="text-xs text-gray-500 mt-2">{{ data.day }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 下载记录面板 -->
      <div v-if="activeTab === 'download'" class="bg-white rounded-xl shadow-sm">
        <div class="p-6 border-b flex items-center justify-between">
          <h3 class="text-lg font-semibold text-gray-900">下载记录</h3>
          <div class="flex gap-2">
            <select v-model="downloadFilter" class="px-3 py-2 border border-gray-200 rounded-lg text-sm">
              <option value="all">全部格式</option>
              <option value="png">PNG</option>
              <option value="jpg">JPG</option>
              <option value="pdf">PDF</option>
              <option value="gif">GIF</option>
            </select>
          </div>
        </div>

        <div class="p-6">
          <div class="grid grid-cols-3 gap-4 mb-6">
            <div class="text-center p-3 bg-gray-50 rounded-lg">
              <div class="text-2xl font-bold text-indigo-600">{{ formatStats.png }}</div>
              <div class="text-xs text-gray-500">PNG导出</div>
            </div>
            <div class="text-center p-3 bg-gray-50 rounded-lg">
              <div class="text-2xl font-bold text-green-600">{{ formatStats.jpg }}</div>
              <div class="text-xs text-gray-500">JPG导出</div>
            </div>
            <div class="text-center p-3 bg-gray-50 rounded-lg">
              <div class="text-2xl font-bold text-blue-600">{{ formatStats.pdf + formatStats.gif }}</div>
              <div class="text-xs text-gray-500">PDF/GIF</div>
            </div>
          </div>

          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-4 py-3 text-left text-sm font-medium text-gray-500">设计名称</th>
                <th class="px-4 py-3 text-left text-sm font-medium text-gray-500">格式</th>
                <th class="px-4 py-3 text-left text-sm font-medium text-gray-500">大小</th>
                <th class="px-4 py-3 text-left text-sm font-medium text-gray-500">下载时间</th>
                <th class="px-4 py-3 text-right text-sm font-medium text-gray-500">操作</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-for="record in downloadRecords" :key="record.id">
                <td class="px-4 py-3 text-sm text-gray-900">{{ record.name }}</td>
                <td class="px-4 py-3">
                  <span :class="['px-2 py-1 rounded text-xs font-medium', record.format === 'PNG' ? 'bg-indigo-100 text-indigo-600' : record.format === 'JPG' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600']">
                    {{ record.format }}
                  </span>
                </td>
                <td class="px-4 py-3 text-sm text-gray-500">{{ record.size }}</td>
                <td class="px-4 py-3 text-sm text-gray-500">{{ record.time }}</td>
                <td class="px-4 py-3 text-right">
                  <button class="text-sm text-indigo-600 hover:text-indigo-700">重新下载</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- 效率分析面板 -->
      <div v-if="activeTab === 'efficiency'" class="grid grid-cols-2 gap-6">
        <!-- 设计时间统计 -->
        <div class="bg-white rounded-xl shadow-sm p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">设计时间统计</h3>
          <div class="space-y-4">
            <div v-for="item in timeStats" :key="item.type">
              <div class="flex items-center justify-between mb-1">
                <span class="text-sm text-gray-700">{{ item.type }}</span>
                <span class="text-sm font-medium text-gray-900">{{ item.time }}分钟</span>
              </div>
              <div class="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div class="h-full bg-indigo-500 rounded-full" :style="{ width: (item.time / maxTime) * 100 + '%' }"></div>
              </div>
            </div>
          </div>

          <div class="mt-6 p-4 bg-indigo-50 rounded-lg">
            <div class="flex items-center gap-2 mb-2">
              <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <span class="text-sm font-medium text-indigo-600">效率提示</span>
            </div>
            <p class="text-sm text-gray-600">使用模板可节省约40%的设计时间，建议多使用热门模板提高效率。</p>
          </div>
        </div>

        <!-- 效率提升趋势 -->
        <div class="bg-white rounded-xl shadow-sm p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">效率提升趋势</h3>
          <div class="h-48 flex items-end gap-2">
            <div v-for="(data, index) in efficiencyData" :key="index" class="flex-1 flex flex-col items-center">
              <div class="w-full bg-green-500 rounded-t transition-all hover:bg-green-600 relative" :style="{ height: `${data.value * 1.6}px` }">
                <div class="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-gray-600">{{ data.value }}%</div>
              </div>
              <span class="text-xs text-gray-500 mt-2">{{ data.month }}</span>
            </div>
          </div>

          <div class="mt-4 grid grid-cols-3 gap-3">
            <div class="text-center p-2 bg-gray-50 rounded">
              <div class="text-sm font-medium text-gray-900">模板使用率</div>
              <div class="text-lg font-bold text-indigo-600">{{ efficiencyStats.templateRate }}%</div>
            </div>
            <div class="text-center p-2 bg-gray-50 rounded">
              <div class="text-sm font-medium text-gray-900">复用率</div>
              <div class="text-lg font-bold text-green-600">{{ efficiencyStats.reuseRate }}%</div>
            </div>
            <div class="text-center p-2 bg-gray-50 rounded">
              <div class="text-sm font-medium text-gray-900">AI辅助率</div>
              <div class="text-lg font-bold text-blue-600">{{ efficiencyStats.aiRate }}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const activeTab = ref('usage')
const downloadFilter = ref('all')

const stats = ref({
  totalDesigns: 156,
  newDesignsToday: 5,
  totalDownloads: 428,
  downloadsToday: 12,
  usedTemplates: 45,
  favoriteTemplate: '促销海报',
  avgDesignTime: 8.5,
  efficiency: 32,
  storageUsed: 256,
  storageLimit: 500
})

const designTypes = ref([
  { name: '商品主图', count: 58, percent: 37, color: '#4F46E5' },
  { name: '详情页', count: 32, percent: 20, color: '#22C55E' },
  { name: '促销海报', count: 28, percent: 18, color: '#F59E0B' },
  { name: '社交图', count: 22, percent: 14, color: '#3B82F6' },
  { name: 'Banner', count: 16, percent: 11, color: '#EF4444' }
])

const topTemplates = ref([
  { id: 1, name: '双十一促销海报', category: '促销', usageCount: 28 },
  { id: 2, name: '简约白底主图', category: '主图', usageCount: 24 },
  { id: 3, name: '新品上架详情页', category: '详情页', usageCount: 18 },
  { id: 4, name: '微信分享卡片', category: '社交', usageCount: 15 },
  { id: 5, name: '节日营销海报', category: '促销', usageCount: 12 }
])

const weeklyData = ref([
  { day: '周一', count: 8 },
  { day: '周二', count: 12 },
  { day: '周三', count: 15 },
  { day: '周四', count: 10 },
  { day: '周五', count: 18 },
  { day: '周六', count: 22 },
  { day: '周日', count: 5 }
])

const maxWeeklyCount = computed(() => Math.max(...weeklyData.value.map(d => d.count)))

const formatStats = ref({ png: 180, jpg: 156, pdf: 45, gif: 47 })

const downloadRecords = ref([
  { id: 1, name: '双十一主图-01', format: 'PNG', size: '2.5MB', time: '2024-01-20 15:30' },
  { id: 2, name: '新品详情页模块', format: 'JPG', size: '1.8MB', time: '2024-01-20 14:20' },
  { id: 3, name: '促销海报', format: 'PNG', size: '3.2MB', time: '2024-01-19 18:45' },
  { id: 4, name: '店铺Banner', format: 'JPG', size: '1.5MB', time: '2024-01-19 10:00' },
  { id: 5, name: '微信分享图', format: 'PNG', size: '0.8MB', time: '2024-01-18 16:30' }
])

const timeStats = ref([
  { type: '商品主图', time: 5.2 },
  { type: '详情页', time: 12.8 },
  { type: '促销海报', time: 8.5 },
  { type: '社交图', time: 6.3 },
  { type: 'Banner', time: 15.2 }
])

const maxTime = computed(() => Math.max(...timeStats.value.map(t => t.time)))

const efficiencyData = ref([
  { month: '8月', value: 15 },
  { month: '9月', value: 22 },
  { month: '10月', value: 28 },
  { month: '11月', value: 32 },
  { month: '12月', value: 35 },
  { month: '1月', value: 38 }
])

const efficiencyStats = ref({
  templateRate: 68,
  reuseRate: 42,
  aiRate: 25
})
</script>