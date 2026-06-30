<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-4xl mx-auto px-4 py-8">
      <!-- 标题 -->
      <div class="text-center mb-8">
        <h1 class="text-2xl font-semibold text-gray-900 mb-2">邀请好友，双方获利</h1>
        <p class="text-gray-500">邀请好友注册并付费，你和好友都能获得奖励</p>
      </div>

      <!-- 奖励规则 -->
      <div class="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h2 class="font-medium text-gray-900 mb-4">奖励规则</h2>
        <div class="grid grid-cols-3 gap-4">
          <div class="text-center p-4 bg-indigo-50 rounded-xl">
            <div class="text-3xl font-bold text-indigo-600 mb-2">7天</div>
            <div class="text-sm text-gray-600">好友获得VIP试用期</div>
          </div>
          <div class="text-center p-4 bg-green-50 rounded-xl">
            <div class="text-3xl font-bold text-green-600 mb-2">20%</div>
            <div class="text-sm text-gray-600">好友付费你获返现</div>
          </div>
          <div class="text-center p-4 bg-yellow-50 rounded-xl">
            <div class="text-3xl font-bold text-yellow-600 mb-2">50次</div>
            <div class="text-sm text-gray-600">好友获得AI次数</div>
          </div>
        </div>
      </div>

      <!-- 邀请链接 -->
      <div class="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h2 class="font-medium text-gray-900 mb-4">分享邀请链接</h2>
        <div class="flex gap-2">
          <input 
            type="text" 
            v-model="referralLink"
            class="flex-1 px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-600"
            readonly
          />
          <button 
            @click="copyLink"
            class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            复制链接
          </button>
        </div>

        <!-- 分享按钮 -->
        <div class="flex justify-center gap-4 mt-6">
          <button @click="shareToWechat" class="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.3c0 1.988.8 4.189 2.6 5.878.1.1.2.2.2.3l-1.1 4.4c-.1.3.1.5.3.3l5.3-3.1c.2-.1.3-.1.5-.1 1.1.2 2.1.3 3.1.3 4.8 0 8.691-3.188 8.691-7.011s-3.891-7.011-8.691-7.011zm0 12.022c-.9 0-1.8-.1-2.7-.3-.3-.1-.6 0-.9.1l-2.7 1.6.6-2.3c.1-.3 0-.6-.2-.8-1.5-1.4-2.2-3.1-2.2-4.7 0-3.188 3.4-5.8 7.6-5.8s7.6 2.6 7.6 5.8c0 3.188-3.4 5.8-7.6 5.8z"/>
            </svg>
            微信分享
          </button>
          <button @click="shareToQQ" class="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.003 2c-5.505 0-10.003 4.498-10.003 10.003 0 5.505 4.498 10.003 10.003 10.003 5.505 0 10.003-4.498 10.003-10.003C22.006 6.498 17.508 2 12.003 2zm4.5 12.5c-.5 1-1.5 2-3 2.5.5.5 1 1.5 1.5 2.5.5 1 0 1.5-.5 1.5s-1-.5-1.5-1.5c-.5-1-1-2-1.5-2.5-.5 0-1 0-1.5 0s-1 0-1.5 0c-.5.5-1 1.5-1.5 2.5-.5 1-1 1.5-1.5 1.5s-1-.5-.5-1.5c.5-1 1-2 1.5-2.5-1.5-.5-2.5-1.5-3-2.5-.5-1-.5-2 0-3s1-2 2-3c1-1 2-1.5 3-1.5s2 .5 3 1.5c1 1 1.5 2 2 3s.5 2 0 3z"/>
            </svg>
            QQ分享
          </button>
        </div>
      </div>

      <!-- 邀请统计 -->
      <div class="grid grid-cols-3 gap-4 mb-6">
        <div class="bg-white rounded-xl shadow-sm p-4 text-center">
          <div class="text-2xl font-bold text-gray-900 mb-1">{{ stats.invitedCount }}</div>
          <div class="text-sm text-gray-500">已邀请人数</div>
        </div>
        <div class="bg-white rounded-xl shadow-sm p-4 text-center">
          <div class="text-2xl font-bold text-gray-900 mb-1">{{ stats.paidCount }}</div>
          <div class="text-sm text-gray-500">已付费人数</div>
        </div>
        <div class="bg-white rounded-xl shadow-sm p-4 text-center">
          <div class="text-2xl font-bold text-indigo-600 mb-1">{{ stats.totalReward }}</div>
          <div class="text-sm text-gray-500">累计奖励(元)</div>
        </div>
      </div>

      <!-- 邀请记录 -->
      <div class="bg-white rounded-xl shadow-sm overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-100">
          <h2 class="font-medium text-gray-900">邀请记录</h2>
        </div>
        
        <div v-if="invitedUsers.length === 0" class="p-8 text-center text-gray-500">
          <p>暂无邀请记录，快去邀请好友吧！</p>
        </div>

        <table v-else class="w-full">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">好友</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">注册时间</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">状态</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">奖励</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-for="user in invitedUsers" :key="user.id">
              <td class="px-6 py-4 text-sm text-gray-900">{{ user.nickname }}</td>
              <td class="px-6 py-4 text-sm text-gray-500">{{ formatDate(user.createdAt) }}</td>
              <td class="px-6 py-4">
                <span :class="[
                  'text-xs px-2 py-1 rounded-full',
                  user.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                ]">
                  {{ user.status === 'paid' ? '已付费' : '已注册' }}
                </span>
              </td>
              <td class="px-6 py-4 text-sm text-indigo-600">
                {{ user.reward > 0 ? `+${user.reward}元` : '-' }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuth } from '~/composables/useAuth'

// 直接使用 navigator.clipboard API
const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}

interface InvitedUser {
  id: string
  nickname: string
  createdAt: Date
  status: 'registered' | 'paid'
  reward: number
}

interface ReferralStats {
  invitedCount: number
  paidCount: number
  totalReward: number
}

const { user } = useAuth()
const referralLink = ref('')
const stats = ref<ReferralStats>({
  invitedCount: 0,
  paidCount: 0,
  totalReward: 0
})
const invitedUsers = ref<InvitedUser[]>([])

const copyLink = async () => {
  try {
    await copyToClipboard(referralLink.value)
    alert('邀请链接已复制到剪贴板')
  } catch {
    alert('复制失败，请手动复制')
  }
}

const shareToWechat = () => {
  alert('请将邀请链接复制到微信分享')
}

const shareToQQ = () => {
  const shareUrl = `https://connect.qq.com/widget/shareqq/index.html?url=${encodeURIComponent(referralLink.value)}&title=${encodeURIComponent('易可图 - 邀请好友得奖励')}`
  window.open(shareUrl, '_blank')
}

const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString()
}

const fetchReferralData = async () => {
  try {
    const response = await $fetch('/api/referral/index') as any
    if (response.code === 200) {
      referralLink.value = response.data.referralLink
      stats.value = response.data.stats
      invitedUsers.value = response.data.invitedUsers.map(u => ({
        ...u,
        createdAt: new Date(u.createdAt)
      }))
    }
  } catch (error) {
    console.error('获取邀请数据失败:', error)
    
    // 模拟数据
    referralLink.value = `${window.location.origin}/register?ref=demo123`
    stats.value = {
      invitedCount: 5,
      paidCount: 2,
      totalReward: 39.8
    }
    invitedUsers.value = [
      {
        id: '1',
        nickname: '用户A',
        createdAt: new Date('2024-01-15'),
        status: 'paid',
        reward: 19.9
      },
      {
        id: '2',
        nickname: '用户B',
        createdAt: new Date('2024-01-18'),
        status: 'paid',
        reward: 19.9
      },
      {
        id: '3',
        nickname: '用户C',
        createdAt: new Date('2024-02-01'),
        status: 'registered',
        reward: 0
      }
    ]
  }
}

onMounted(() => {
  fetchReferralData()
})
</script>