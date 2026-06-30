<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-3xl mx-auto px-4 py-8">
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-2xl font-semibold text-gray-900">消息通知</h1>
        <button 
          v-if="unreadCount > 0"
          @click="markAllRead"
          class="text-sm text-indigo-600 hover:text-indigo-700"
        >
          全部标记已读
        </button>
      </div>

      <!-- 通知分类 -->
      <div class="flex gap-2 mb-4">
        <button 
          @click="activeType = 'all'"
          :class="[
            'px-3 py-1.5 rounded-lg text-sm transition-colors',
            activeType === 'all' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
          ]"
        >
          全部
        </button>
        <button 
          @click="activeType = 'system'"
          :class="[
            'px-3 py-1.5 rounded-lg text-sm transition-colors',
            activeType === 'system' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
          ]"
        >
          系统通知
        </button>
        <button 
          @click="activeType = 'vip'"
          :class="[
            'px-3 py-1.5 rounded-lg text-sm transition-colors',
            activeType === 'vip' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
          ]"
        >
          VIP相关
        </button>
        <button 
          @click="activeType = 'order'"
          :class="[
            'px-3 py-1.5 rounded-lg text-sm transition-colors',
            activeType === 'order' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
          ]"
        >
          订单消息
        </button>
      </div>

      <!-- 通知列表 -->
      <div class="bg-white rounded-xl shadow-sm overflow-hidden">
        <div v-if="notifications.length === 0" class="p-8 text-center text-gray-500">
          <svg class="w-12 h-12 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <p>暂无通知消息</p>
        </div>

        <div v-else class="divide-y">
          <div 
            v-for="notification in filteredNotifications" 
            :key="notification.id"
            :class="[
              'p-4 flex gap-4 hover:bg-gray-50 cursor-pointer transition-colors',
              !notification.isRead && 'bg-indigo-50'
            ]"
            @click="handleNotificationClick(notification)"
          >
            <!-- 图标 -->
            <div :class="[
              'w-10 h-10 rounded-xl flex items-center justify-center',
              getTypeColor(notification.type)
            ]">
              <svg v-if="notification.type === 'system'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <svg v-else-if="notification.type === 'vip'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <svg v-else-if="notification.type === 'order'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>

            <!-- 内容 -->
            <div class="flex-1">
              <div class="flex items-center justify-between">
                <h3 class="font-medium text-gray-900">{{ notification.title }}</h3>
                <span class="text-xs text-gray-500">{{ formatTime(notification.createdAt) }}</span>
              </div>
              <p class="text-sm text-gray-500 mt-1 line-clamp-2">{{ notification.content }}</p>
            </div>

            <!-- 未读标记 -->
            <div v-if="!notification.isRead" class="w-2 h-2 bg-indigo-600 rounded-full self-center"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

interface Notification {
  id: string
  type: 'system' | 'vip' | 'order' | 'activity'
  title: string
  content: string
  isRead: boolean
  createdAt: Date
  link?: string
}

const router = useRouter()
const activeType = ref('all')
const notifications = ref<Notification[]>([])
const unreadCount = ref(0)

const filteredNotifications = computed(() => {
  if (activeType.value === 'all') return notifications.value
  return notifications.value.filter(n => n.type === activeType.value)
})

const getTypeColor = (type: string) => {
  switch (type) {
    case 'system': return 'bg-blue-100 text-blue-600'
    case 'vip': return 'bg-yellow-100 text-yellow-600'
    case 'order': return 'bg-green-100 text-green-600'
    default: return 'bg-gray-100 text-gray-600'
  }
}

const formatTime = (date: Date) => {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 1) return '刚刚'
  if (minutes < 60) return `${minutes}分钟前`
  if (hours < 24) return `${hours}小时前`
  if (days < 7) return `${days}天前`
  return date.toLocaleDateString()
}

const fetchNotifications = async () => {
  try {
    const response = await $fetch('/api/notifications/list') as any
    if (response.code === 200) {
      notifications.value = response.data.notifications.map(n => ({
        ...n,
        createdAt: new Date(n.createdAt)
      }))
      unreadCount.value = response.data.unreadCount
    }
  } catch (error) {
    console.error('获取通知失败:', error)
    
    // 模拟数据
    notifications.value = [
      {
        id: '1',
        type: 'system',
        title: '平台升级公告',
        content: '易可图平台已完成功能升级，新增AI智能设计、批量导出等功能，快来体验吧！',
        isRead: false,
        createdAt: new Date(Date.now() - 3600000),
        link: '/help-center'
      },
      {
        id: '2',
        type: 'vip',
        title: 'VIP会员特权更新',
        content: 'VIP会员新增1000次AI使用额度，并开放高级模板库，立即升级享更多权益！',
        isRead: false,
        createdAt: new Date(Date.now() - 7200000),
        link: '/membership-pricing'
      },
      {
        id: '3',
        type: 'order',
        title: '支付成功',
        content: '您的VIP会员订阅已成功，有效期至2026年12月31日。',
        isRead: true,
        createdAt: new Date(Date.now() - 86400000),
        link: '/user-center'
      }
    ]
    unreadCount.value = 2
  }
}

const handleNotificationClick = async (notification: Notification) => {
  if (!notification.isRead) {
    await markAsRead(notification.id)
  }
  if (notification.link) {
    router.push(notification.link)
  }
}

const markAsRead = async (id: string) => {
  const notification = notifications.value.find(n => n.id === id)
  if (notification) {
    notification.isRead = true
    unreadCount.value = Math.max(0, unreadCount.value - 1)
  }
}

const markAllRead = async () => {
  notifications.value.forEach(n => n.isRead = true)
  unreadCount.value = 0
}

onMounted(() => {
  fetchNotifications()
})
</script>