<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-6 py-8">
      <!-- 页面标题 -->
      <div class="mb-8">
        <h1 class="text-2xl font-semibold text-gray-900">积分中心</h1>
        <p class="text-gray-500 mt-2">签到领积分，兑换会员特权</p>
      </div>

      <!-- 积分概览 -->
      <div class="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div class="flex items-center justify-between mb-6">
          <div>
            <div class="text-4xl font-bold text-indigo-600">{{ userPoints }}</div>
            <div class="text-sm text-gray-500 mt-1">可用积分</div>
          </div>
          <div class="text-right">
            <div class="text-lg font-medium text-gray-900">累计获得 {{ totalEarned }} 积分</div>
            <div class="text-sm text-gray-500 mt-1">累计消耗 {{ totalSpent }} 积分</div>
          </div>
        </div>

        <!-- 签到区域 -->
        <div class="border border-gray-200 rounded-xl p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-900">每日签到</h3>
            <button @click="handleSignIn" :disabled="hasSignedIn" :class="['px-6 py-2 rounded-lg text-sm font-medium transition', hasSignedIn ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700']">
              {{ hasSignedIn ? '已签到' : '立即签到' }}
            </button>
          </div>

          <!-- 连续签到天数 -->
          <div class="grid grid-cols-7 gap-2 mb-4">
            <div v-for="(day, index) in signInDays" :key="index" :class="['text-center p-2 rounded-lg', index < consecutiveDays ? 'bg-indigo-100' : 'bg-gray-100']">
              <div class="text-xs text-gray-500 mb-1">第{{ index + 1 }}天</div>
              <div :class="['w-8 h-8 rounded-full mx-auto flex items-center justify-center text-sm font-medium', index < consecutiveDays ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-400']">
                {{ index < consecutiveDays ? '✓' : index + 1 }}
              </div>
              <div class="text-xs mt-1" :class="index < consecutiveDays ? 'text-indigo-600' : 'text-gray-500'">+{{ day.points }}积分</div>
            </div>
          </div>

          <div class="flex items-center justify-between text-sm">
            <span class="text-gray-500">连续签到可获得额外奖励，连续7天获得 {{ bonusPoints }} 积分奖励</span>
            <span v-if="consecutiveDays > 0" class="text-indigo-600 font-medium">已连续签到 {{ consecutiveDays }} 天</span>
          </div>
        </div>
      </div>

      <!-- 功能入口 -->
      <div class="grid grid-cols-3 gap-6 mb-8">
        <div @click="activeTab = 'earn'" :class="['bg-white rounded-xl p-6 shadow-sm cursor-pointer transition', activeTab === 'earn' ? 'ring-2 ring-indigo-500' : 'hover:shadow-md']">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900">赚取积分</h3>
          </div>
          <p class="text-sm text-gray-500">多种方式获取积分</p>
        </div>

        <div @click="activeTab = 'exchange'" :class="['bg-white rounded-xl p-6 shadow-sm cursor-pointer transition', activeTab === 'exchange' ? 'ring-2 ring-indigo-500' : 'hover:shadow-md']">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.297.707 1.297H15m1-4h4" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900">积分商城</h3>
          </div>
          <p class="text-sm text-gray-500">兑换会员特权与礼品</p>
        </div>

        <div @click="activeTab = 'history'" :class="['bg-white rounded-xl p-6 shadow-sm cursor-pointer transition', activeTab === 'history' ? 'ring-2 ring-indigo-500' : 'hover:shadow-md']">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900">积分记录</h3>
          </div>
          <p class="text-sm text-gray-500">查看获取与消耗记录</p>
        </div>
      </div>

      <!-- 赚取积分 -->
      <div v-if="activeTab === 'earn'" class="bg-white rounded-xl shadow-sm p-6">
        <h2 class="text-lg font-semibold text-gray-900 mb-6">赚取积分</h2>
        
        <div class="grid grid-cols-2 gap-4">
          <div v-for="task in earnTasks" :key="task.id" class="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div :class="['w-10 h-10 rounded-lg flex items-center justify-center', task.colorClass]">
                  <component :is="task.icon" />
                </div>
                <div>
                  <h4 class="text-sm font-medium text-gray-900">{{ task.name }}</h4>
                  <p class="text-xs text-gray-500">{{ task.description }}</p>
                </div>
              </div>
              <div class="text-right">
                <div class="text-sm font-medium text-indigo-600">+{{ task.points }}</div>
                <button v-if="!task.completed" @click="handleTask(task)" class="mt-1 text-xs text-indigo-600 hover:text-indigo-700">去完成</button>
                <span v-else class="text-xs text-gray-400">已完成</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 积分商城 -->
      <div v-if="activeTab === 'exchange'" class="bg-white rounded-xl shadow-sm p-6">
        <h2 class="text-lg font-semibold text-gray-900 mb-6">积分商城</h2>
        
        <div class="grid grid-cols-3 gap-4">
          <div v-for="item in shopItems" :key="item.id" class="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition">
            <div class="aspect-square bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
              <div :class="['w-16 h-16 rounded-xl flex items-center justify-center', item.bgClass]">
                <span :class="['text-2xl font-bold', item.textClass]">{{ item.icon }}</span>
              </div>
            </div>
            <div class="p-4">
              <h4 class="text-sm font-medium text-gray-900 mb-2">{{ item.name }}</h4>
              <p class="text-xs text-gray-500 mb-3">{{ item.description }}</p>
              <div class="flex items-center justify-between">
                <div class="text-sm font-medium text-indigo-600">{{ item.price }}积分</div>
                <button @click="handleExchange(item)" :disabled="userPoints < item.price" :class="['px-3 py-1 rounded text-xs font-medium transition', userPoints >= item.price ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-gray-100 text-gray-400 cursor-not-allowed']">
                  {{ userPoints >= item.price ? '兑换' : '积分不足' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 积分记录 -->
      <div v-if="activeTab === 'history'" class="bg-white rounded-xl shadow-sm p-6">
        <h2 class="text-lg font-semibold text-gray-900 mb-6">积分记录</h2>
        
        <div class="flex gap-2 mb-4">
          <button @click="historyFilter = 'all'" :class="['px-3 py-1 rounded text-sm', historyFilter === 'all' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700']">全部</button>
          <button @click="historyFilter = 'earn'" :class="['px-3 py-1 rounded text-sm', historyFilter === 'earn' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700']">获取</button>
          <button @click="historyFilter = 'spend'" :class="['px-3 py-1 rounded text-sm', historyFilter === 'spend' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700']">消耗</button>
        </div>

        <div class="space-y-3">
          <div v-for="record in filteredRecords" :key="record.id" class="flex items-center justify-between py-3 border-b border-gray-100">
            <div>
              <div class="text-sm font-medium text-gray-900">{{ record.action }}</div>
              <div class="text-xs text-gray-500">{{ record.time }}</div>
            </div>
            <div :class="['text-sm font-medium', record.type === 'earn' ? 'text-green-600' : 'text-red-500']">
              {{ record.type === 'earn' ? '+' : '-' }}{{ record.amount }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, h } from 'vue'

const userPoints = ref(1250)
const totalEarned = ref(3200)
const totalSpent = ref(1950)

const hasSignedIn = ref(false)
const consecutiveDays = ref(3)

const signInDays = [
  { points: 10 },
  { points: 15 },
  { points: 20 },
  { points: 25 },
  { points: 30 },
  { points: 40 },
  { points: 50 }
]

const bonusPoints = 50

const activeTab = ref('earn')
const historyFilter = ref('all')

const earnTasks = ref([
  { id: 1, name: '每日签到', description: '每天签到获得积分', points: 10, completed: false, colorClass: 'bg-indigo-100', icon: h('svg', { class: 'w-5 h-5 text-indigo-600', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' })]) },
  { id: 2, name: '邀请好友', description: '每邀请一位好友注册', points: 100, completed: false, colorClass: 'bg-green-100', icon: h('svg', { class: 'w-5 h-5 text-green-600', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 3a2 2 0 11-4 0 2 2 0 014 0z' })]) },
  { id: 3, name: '完成设计', description: '每完成一个设计作品', points: 5, completed: true, colorClass: 'bg-blue-100', icon: h('svg', { class: 'w-5 h-5 text-blue-600', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' })]) },
  { id: 4, name: '分享作品', description: '分享作品到社交媒体', points: 20, completed: false, colorClass: 'bg-yellow-100', icon: h('svg', { class: 'w-5 h-5 text-yellow-600', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.634c-.412-.632-1.054-1.166-1.813-1.384m1.813 1.384l.007.007m0 2.634l-.007.007m0-2.634c.412.632 1.054 1.166 1.813 1.384m-1.813-1.384l-.007-.007m0-2.634l.007-.007m2.634 2.634l-.007.007m2.634-2.634l-.007-.007' })]) },
  { id: 5, name: '评价模板', description: '对使用过的模板进行评价', points: 5, completed: false, colorClass: 'bg-purple-100', icon: h('svg', { class: 'w-5 h-5 text-purple-600', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z' })]) },
  { id: 6, name: '完善资料', description: '首次完善个人资料', points: 50, completed: true, colorClass: 'bg-pink-100', icon: h('svg', { class: 'w-5 h-5 text-pink-600', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' })]) }
])

const shopItems = ref([
  { id: 1, name: 'VIP体验卡', description: '3天VIP会员体验', price: 500, icon: 'VIP', bgClass: 'bg-yellow-400', textClass: 'text-white' },
  { id: 2, name: '高清导出券', description: '10次高清导出特权', price: 200, icon: 'HD', bgClass: 'bg-indigo-500', textClass: 'text-white' },
  { id: 3, name: '批量设计券', description: '5次批量设计特权', price: 300, icon: '批量', bgClass: 'bg-green-500', textClass: 'text-white' },
  { id: 4, name: '模板解锁券', description: '解锁1套VIP模板', price: 150, icon: '模板', bgClass: 'bg-purple-500', textClass: 'text-white' },
  { id: 5, name: '素材下载券', description: '10次VIP素材下载', price: 100, icon: '素材', bgClass: 'bg-blue-500', textClass: 'text-white' },
  { id: 6, name: 'AI生成券', description: '5次AI一键生成', price: 400, icon: 'AI', bgClass: 'bg-gradient-to-r from-indigo-500 to-purple-500', textClass: 'text-white' }
])

const pointsRecords = ref([
  { id: 1, action: '每日签到', time: '2024-01-20 09:00', amount: 10, type: 'earn' },
  { id: 2, action: '完成设计作品', time: '2024-01-19 15:30', amount: 5, type: 'earn' },
  { id: 3, action: '兑换高清导出券', time: '2024-01-18 10:00', amount: 200, type: 'spend' },
  { id: 4, action: '邀请好友注册', time: '2024-01-17 14:20', amount: 100, type: 'earn' },
  { id: 5, action: '每日签到', time: '2024-01-17 09:00', amount: 20, type: 'earn' },
  { id: 6, action: '兑换VIP体验卡', time: '2024-01-15 16:00', amount: 500, type: 'spend' },
  { id: 7, action: '分享作品到微博', time: '2024-01-15 11:30', amount: 20, type: 'earn' }
])

const filteredRecords = computed(() => {
  if (historyFilter.value === 'all') return pointsRecords.value
  return pointsRecords.value.filter(r => r.type === historyFilter.value)
})

const handleSignIn = () => {
  if (hasSignedIn.value) return
  hasSignedIn.value = true
  consecutiveDays.value++
  userPoints.value += signInDays[consecutiveDays.value - 1]?.points || 10
  pointsRecords.value.unshift({
    id: pointsRecords.value.length + 1,
    action: '每日签到',
    time: new Date().toLocaleString(),
    amount: signInDays[consecutiveDays.value - 1]?.points || 10,
    type: 'earn'
  })
}

const handleTask = (task: any) => {
  // 执行任务
}

const handleExchange = (item: any) => {
  if (userPoints.value < item.price) return
  userPoints.value -= item.price
  pointsRecords.value.unshift({
    id: pointsRecords.value.length + 1,
    action: '兑换' + item.name,
    time: new Date().toLocaleString(),
    amount: item.price,
    type: 'spend'
  })
}
</script>