<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-4xl mx-auto px-4 py-8">
      <!-- 标题 -->
      <div class="text-center mb-8">
        <h1 class="text-2xl font-semibold text-gray-900 mb-2">优惠券中心</h1>
        <p class="text-gray-500">领取优惠券，享受更多优惠</p>
      </div>

      <!-- 可领取优惠券 -->
      <div class="mb-8">
        <h2 class="font-medium text-gray-900 mb-4">可领取优惠券</h2>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div v-for="coupon in availableCoupons" :key="coupon.id"
               class="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:border-indigo-200 transition-colors">
            <div class="bg-indigo-500 px-4 py-2 text-white text-center">
              <span class="text-lg font-bold">{{ coupon.discount }}</span>
              <span class="text-xs">元</span>
            </div>
            <div class="p-4">
              <div class="font-medium text-gray-900 mb-1">{{ coupon.name }}</div>
              <div class="text-sm text-gray-500 mb-2">
                {{ coupon.minAmount > 0 ? `满${coupon.minAmount}元可用` : '无门槛' }}
              </div>
              <div class="text-xs text-gray-400 mb-3">
                有效期至 {{ formatDate(coupon.expireAt) }}
              </div>
              <button 
                @click="claimCoupon(coupon.id)"
                :disabled="coupon.claimed"
                :class="[
                  'w-full py-2 rounded-lg text-sm font-medium transition-colors',
                  coupon.claimed 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                ]"
              >
                {{ coupon.claimed ? '已领取' : '立即领取' }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 我的优惠券 -->
      <div>
        <h2 class="font-medium text-gray-900 mb-4">我的优惠券</h2>
        
        <!-- 状态筛选 -->
        <div class="flex gap-2 mb-4">
          <button 
            v-for="status in couponStatuses" 
            :key="status.value"
            @click="currentStatus = status.value"
            :class="[
              'px-4 py-2 rounded-lg text-sm transition-colors',
              currentStatus === status.value 
                ? 'bg-indigo-600 text-white' 
                : 'bg-white text-gray-600 hover:bg-gray-50'
            ]"
          >
            {{ status.label }} ({{ getCouponCount(status.value) }})
          </button>
        </div>

        <!-- 优惠券列表 -->
        <div v-if="myCoupons.length === 0" class="bg-white rounded-xl shadow-sm p-8 text-center text-gray-500">
          <p>暂无优惠券</p>
        </div>

        <div v-else class="space-y-3">
          <div v-for="coupon in filteredCoupons" :key="coupon.id"
               :class="[
                'bg-white rounded-xl shadow-sm p-4 flex items-center justify-between border',
                coupon.status === 'expired' ? 'border-gray-200 opacity-60' : 'border-gray-100'
              ]">
            <div class="flex items-center gap-4">
              <!-- 折扣金额 -->
              <div :class="[
                'w-16 h-16 rounded-xl flex flex-col items-center justify-center',
                coupon.status === 'valid' ? 'bg-indigo-50 text-indigo-600' : 'bg-gray-50 text-gray-400'
              ]">
                <span class="text-xl font-bold">{{ coupon.discount }}</span>
                <span class="text-xs">元</span>
              </div>
              <!-- 信息 -->
              <div>
                <div :class="[
                  'font-medium',
                  coupon.status === 'valid' ? 'text-gray-900' : 'text-gray-400'
                ]">
                  {{ coupon.name }}
                </div>
                <div class="text-sm text-gray-500">
                  {{ coupon.minAmount > 0 ? `满${coupon.minAmount}元可用` : '无门槛' }}
                </div>
                <div class="text-xs text-gray-400">
                  有效期至 {{ formatDate(coupon.expireAt) }}
                </div>
              </div>
            </div>
            <!-- 使用按钮 -->
            <div>
              <button 
                v-if="coupon.status === 'valid'"
                @click="useCoupon(coupon)"
                class="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700"
              >
                使用
              </button>
              <span v-else :class="[
                'text-sm',
                coupon.status === 'used' ? 'text-green-600' : 'text-gray-400'
              ]">
                {{ coupon.status === 'used' ? '已使用' : '已过期' }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- 优惠活动 -->
      <div class="mt-8 bg-white rounded-xl shadow-sm p-6">
        <h2 class="font-medium text-gray-900 mb-4">优惠活动</h2>
        <div class="space-y-3">
          <div v-for="activity in activities" :key="activity.id"
               class="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
            <div class="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div class="flex-1">
              <div class="font-medium text-gray-900">{{ activity.name }}</div>
              <div class="text-sm text-gray-500">{{ activity.description }}</div>
            </div>
            <div class="text-xs text-indigo-600">
              {{ activity.endTime }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '~/composables/useAuth'

interface Coupon {
  id: string
  name: string
  discount: number
  minAmount: number
  expireAt: Date
  status: 'valid' | 'used' | 'expired'
  claimed?: boolean
}

interface Activity {
  id: string
  name: string
  description: string
  endTime: string
}

const router = useRouter()
const { isLoggedIn } = useAuth()

const currentStatus = ref<'valid' | 'used' | 'expired'>('valid')

const couponStatuses: Array<{ label: string; value: 'valid' | 'used' | 'expired' }> = [
  { label: '可用', value: 'valid' },
  { label: '已使用', value: 'used' },
  { label: '已过期', value: 'expired' }
]

const availableCoupons = ref<Coupon[]>([])
const myCoupons = ref<Coupon[]>([])
const activities = ref<Activity[]>([])

const filteredCoupons = computed(() => {
  return myCoupons.value.filter(c => c.status === currentStatus.value)
})

const getCouponCount = (status: string) => {
  return myCoupons.value.filter(c => c.status === status).length
}

const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString()
}

const claimCoupon = async (couponId: string) => {
  if (!isLoggedIn.value) {
    router.push('/login')
    return
  }
  
  try {
    const response = await $fetch('/api/coupons/index', {
      method: 'POST',
      body: { action: 'claim', couponId }
    }) as any
    
    if (response.code === 200) {
      alert('优惠券领取成功')
      fetchCouponData()
    } else {
      alert(response.message || '领取失败')
    }
  } catch (error) {
    console.error('领取优惠券失败:', error)
    alert('领取失败，请稍后重试')
  }
}

const useCoupon = (coupon: Coupon) => {
  router.push('/membership-pricing?coupon=' + coupon.id)
}

const fetchCouponData = async () => {
  try {
    const response = await $fetch('/api/coupons/index') as any
    if (response.code === 200) {
      availableCoupons.value = response.data.available.map(c => ({
        ...c,
        expireAt: new Date(c.expireAt)
      }))
      myCoupons.value = response.data.myCoupons.map(c => ({
        ...c,
        expireAt: new Date(c.expireAt)
      }))
      activities.value = response.data.activities
    }
  } catch (error) {
    console.error('获取优惠券数据失败:', error)
    
    // 模拟数据
    availableCoupons.value = [
      {
        id: '1',
        name: '新用户专享',
        discount: 10,
        minAmount: 50,
        expireAt: new Date('2024-12-31'),
        status: 'valid',
        claimed: false
      },
      {
        id: '2',
        name: '限时优惠',
        discount: 5,
        minAmount: 0,
        expireAt: new Date('2024-12-31'),
        status: 'valid',
        claimed: false
      }
    ]
    
    myCoupons.value = [
      {
        id: '3',
        name: 'VIP专属优惠',
        discount: 20,
        minAmount: 100,
        expireAt: new Date('2024-12-31'),
        status: 'valid'
      },
      {
        id: '4',
        name: '首月优惠',
        discount: 10,
        minAmount: 50,
        expireAt: new Date('2024-01-01'),
        status: 'used'
      }
    ]
    
    activities.value = [
      {
        id: '1',
        name: '限时特惠活动',
        description: 'VIP会员限时特价，立减20元',
        endTime: '2024-12-31'
      },
      {
        id: '2',
        name: '邀请好友活动',
        description: '邀请好友付费，双方各得7天VIP',
        endTime: '长期有效'
      }
    ]
  }
}

onMounted(() => {
  fetchCouponData()
})
</script>