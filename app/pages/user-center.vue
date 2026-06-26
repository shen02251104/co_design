<script setup lang="ts">
import { useAuth } from '~/composables/useAuth'

interface MembershipData {
  vipLevel: string;
  vipStartDate: string | null;
  vipEndDate: string | null;
  aiUsageCount: number;
  aiTotalCount: number;
  aiExtraCount: number;
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

const { user, isAuthenticated, signOut } = useAuth()
const router = useRouter()
const activeTab = ref('membership')

// 会员状态数据
const membershipInfo = ref<MembershipData>({
  vipLevel: 'free',
  vipStartDate: null,
  vipEndDate: null,
  aiUsageCount: 0,
  aiTotalCount: 5,
  aiExtraCount: 0
})

// 订单记录
const orderList = ref<any[]>([])
const loadingOrders = ref(false)

// 个人资料
const profileForm = ref({
  nickname: '',
  email: '',
  phone: ''
})

// 检查登录状态
if (!isAuthenticated.value) {
  router.push('/login')
}

// 获取会员信息
const fetchMembership = async () => {
  if (!user.value?.id) return
  try {
    const res = await $fetch<ApiResponse<MembershipData>>(`/api/user/membership?userId=${user.value.id}`)
    if (res.success && res.data) {
      membershipInfo.value = res.data
    }
  } catch (error) {
    console.error('获取会员信息失败:', error)
  }
}

// 获取订单记录
const fetchOrders = async () => {
  if (!user.value?.id) return
  loadingOrders.value = true
  try {
    const res = await $fetch<ApiResponse<any[]>>(`/api/payment/orders?userId=${user.value.id}`)
    if (res.success && res.data) {
      orderList.value = res.data
    }
  } catch (error) {
    console.error('获取订单记录失败:', error)
  }
  loadingOrders.value = false
}

// 更新个人资料
const updateProfile = async () => {
  // TODO: 实现资料更新
  alert('资料更新成功')
}

// 退出登录
const handleLogout = async () => {
  await signOut()
  router.push('/')
}

// VIP等级名称映射
const vipLevelNames: Record<string, string> = {
  free: '免费版',
  basic: '基础版',
  pro: '专业版',
  lifetime: '终身版'
}

// VIP等级颜色映射
const vipLevelColors: Record<string, string> = {
  free: 'text-gray-500',
  basic: 'text-blue-500',
  pro: 'text-purple-500',
  lifetime: 'text-amber-500'
}

// 订单状态映射
const orderStatusNames: Record<string, string> = {
  pending: '待支付',
  paid: '已支付',
  failed: '支付失败',
  refunded: '已退款'
}

// 订单状态颜色映射
const orderStatusColors: Record<string, string> = {
  pending: 'text-orange-500',
  paid: 'text-green-500',
  failed: 'text-red-500',
  refunded: 'text-gray-500'
}

onMounted(() => {
  if (isAuthenticated.value) {
    fetchMembership()
    fetchOrders()
    if (user.value) {
      profileForm.value.email = user.value.email || ''
    }
  }
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 顶部导航 -->
    <div class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div class="flex items-center gap-4">
          <NuxtLink to="/" class="text-xl font-bold text-purple-600">易可图</NuxtLink>
          <span class="text-gray-400">|</span>
          <span class="text-gray-600">用户中心</span>
        </div>
        <NuxtLink to="/" class="text-gray-500 hover:text-gray-700">
          返回首页
        </NuxtLink>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 py-8">
      <div class="grid grid-cols-12 gap-6">
        <!-- 左侧侧边栏 -->
        <div class="col-span-3">
          <div class="bg-white rounded-xl shadow-sm p-6">
            <!-- 用户头像和基本信息 -->
            <div class="text-center mb-6">
              <div class="w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-3">
                <svg class="w-10 h-10 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900">{{ user?.email || '用户' }}</h3>
              <p class="text-sm" :class="vipLevelColors[membershipInfo.vipLevel]">
                {{ vipLevelNames[membershipInfo.vipLevel] }} 会员
              </p>
            </div>

            <!-- 导航菜单 -->
            <nav class="space-y-2">
              <button 
                @click="activeTab = 'membership'"
                :class="[
                  'w-full text-left px-4 py-3 rounded-lg transition-colors',
                  activeTab === 'membership' ? 'bg-purple-50 text-purple-600' : 'text-gray-600 hover:bg-gray-50'
                ]"
              >
                <div class="flex items-center gap-3">
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806a3.42 3.42 0 014.438 0l3.12-.693a3.42 3.42 0 00.806 1.946l.693 3.12a3.42 3.42 0 010 4.438l-.693 3.12a3.42 3.42 0 00-1.946.806l-3.12.693a3.42 3.42 0 00-4.438 0l-3.12.693a3.42 3.42 0 00-.806-1.946l-.693-3.12a3.42 3.42 0 010-4.438l.693-3.12a3.42 3.42 0 011.946-.806z" />
                  </svg>
                  会员状态
                </div>
              </button>
              <button 
                @click="activeTab = 'orders'"
                :class="[
                  'w-full text-left px-4 py-3 rounded-lg transition-colors',
                  activeTab === 'orders' ? 'bg-purple-50 text-purple-600' : 'text-gray-600 hover:bg-gray-50'
                ]"
              >
                <div class="flex items-center gap-3">
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  订单记录
                </div>
              </button>
              <button 
                @click="activeTab = 'profile'"
                :class="[
                  'w-full text-left px-4 py-3 rounded-lg transition-colors',
                  activeTab === 'profile' ? 'bg-purple-50 text-purple-600' : 'text-gray-600 hover:bg-gray-50'
                ]"
              >
                <div class="flex items-center gap-3">
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  个人资料
                </div>
              </button>
              <button 
                @click="activeTab = 'license'"
                :class="[
                  'w-full text-left px-4 py-3 rounded-lg transition-colors',
                  activeTab === 'license' ? 'bg-purple-50 text-purple-600' : 'text-gray-600 hover:bg-gray-50'
                ]"
              >
                <div class="flex items-center gap-3">
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  授权证书
                </div>
              </button>
            </nav>

            <!-- 退出登录 -->
            <div class="mt-6 pt-6 border-t border-gray-100">
              <button 
                @click="handleLogout"
                class="w-full text-left px-4 py-3 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
              >
                <div class="flex items-center gap-3">
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  退出登录
                </div>
              </button>
            </div>
          </div>
        </div>

        <!-- 右侧内容区 -->
        <div class="col-span-9">
          <!-- 会员状态 -->
          <div v-if="activeTab === 'membership'" class="space-y-6">
            <!-- VIP状态卡片 -->
            <div class="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl p-6 text-white">
              <div class="flex items-center justify-between">
                <div>
                  <h2 class="text-2xl font-bold mb-2">{{ vipLevelNames[membershipInfo.vipLevel] }} 会员</h2>
                  <p v-if="membershipInfo.vipEndDate" class="text-purple-100">
                    有效期至 {{ new Date(membershipInfo.vipEndDate).toLocaleDateString() }}
                  </p>
                  <p v-else class="text-purple-100">
                    您当前是免费用户，升级会员享受更多权益
                  </p>
                </div>
                <NuxtLink 
                  v-if="membershipInfo.vipLevel === 'free'"
                  to="/membership-pricing"
                  class="px-6 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
                >
                  立即升级
                </NuxtLink>
              </div>
            </div>

            <!-- AI次数统计 -->
            <div class="bg-white rounded-xl shadow-sm p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">AI智能设计次数</h3>
              <div class="grid grid-cols-3 gap-4">
                <div class="text-center p-4 bg-gray-50 rounded-lg">
                  <div class="text-3xl font-bold text-purple-600 mb-1">
                    {{ membershipInfo.aiTotalCount - membershipInfo.aiUsageCount }}
                  </div>
                  <div class="text-sm text-gray-500">剩余次数</div>
                </div>
                <div class="text-center p-4 bg-gray-50 rounded-lg">
                  <div class="text-3xl font-bold text-gray-600 mb-1">
                    {{ membershipInfo.aiUsageCount }}
                  </div>
                  <div class="text-sm text-gray-500">已使用</div>
                </div>
                <div class="text-center p-4 bg-gray-50 rounded-lg">
                  <div class="text-3xl font-bold text-blue-600 mb-1">
                    {{ membershipInfo.aiExtraCount }}
                  </div>
                  <div class="text-sm text-gray-500">额外购买</div>
                </div>
              </div>
              <div class="mt-4 flex justify-end">
                <NuxtLink 
                  to="/membership-pricing"
                  class="text-purple-600 hover:text-purple-700 text-sm font-medium"
                >
                  购买更多次数 →
                </NuxtLink>
              </div>
            </div>

            <!-- 会员权益 -->
            <div class="bg-white rounded-xl shadow-sm p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">会员权益</h3>
              <div class="grid grid-cols-2 gap-4">
                <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <svg class="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span :class="membershipInfo.vipLevel !== 'free' ? 'text-gray-900' : 'text-gray-400'">
                    无水印下载
                  </span>
                </div>
                <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <svg class="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span :class="membershipInfo.vipLevel !== 'free' ? 'text-gray-900' : 'text-gray-400'">
                    VIP模板使用
                  </span>
                </div>
                <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <svg class="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span :class="membershipInfo.vipLevel !== 'free' ? 'text-gray-900' : 'text-gray-400'">
                    商用授权
                  </span>
                </div>
                <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <svg class="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span :class="membershipInfo.vipLevel !== 'free' ? 'text-gray-900' : 'text-gray-400'">
                    高清导出
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- 订单记录 -->
          <div v-if="activeTab === 'orders'" class="bg-white rounded-xl shadow-sm p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">订单记录</h3>
            
            <div v-if="loadingOrders" class="text-center py-8">
              <div class="animate-spin w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full mx-auto"></div>
              <p class="text-gray-500 mt-2">加载中...</p>
            </div>

            <div v-else-if="orderList.length === 0" class="text-center py-8">
              <svg class="w-16 h-16 text-gray-300 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <p class="text-gray-500">暂无订单记录</p>
              <NuxtLink 
                to="/membership-pricing"
                class="inline-block mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                购买会员
              </NuxtLink>
            </div>

            <div v-else class="space-y-4">
              <div 
                v-for="order in orderList"
                :key="order.id"
                class="p-4 border border-gray-200 rounded-lg hover:border-purple-200 transition-colors"
              >
                <div class="flex items-center justify-between mb-2">
                  <span class="font-semibold text-gray-900">{{ order.productName }}</span>
                  <span :class="orderStatusColors[order.status]">
                    {{ orderStatusNames[order.status] }}
                  </span>
                </div>
                <div class="flex items-center justify-between text-sm text-gray-500">
                  <span>订单号: {{ order.orderNo }}</span>
                  <span class="text-purple-600 font-semibold">¥{{ order.amount }}</span>
                </div>
                <div class="text-xs text-gray-400 mt-2">
                  {{ new Date(order.createdAt).toLocaleString() }}
                </div>
              </div>
            </div>
          </div>

          <!-- 个人资料 -->
          <div v-if="activeTab === 'profile'" class="bg-white rounded-xl shadow-sm p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-6">个人资料</h3>
            <form @submit.prevent="updateProfile" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">昵称</label>
                <input 
                  v-model="profileForm.nickname"
                  type="text"
                  class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
                  placeholder="请输入昵称"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">邮箱</label>
                <input 
                  v-model="profileForm.email"
                  type="email"
                  class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 bg-gray-50"
                  disabled
                />
                <p class="text-xs text-gray-400 mt-1">邮箱不可修改</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">手机号</label>
                <input 
                  v-model="profileForm.phone"
                  type="tel"
                  class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
                  placeholder="请输入手机号"
                />
              </div>
              <div class="pt-4">
                <button 
                  type="submit"
                  class="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  保存修改
                </button>
              </div>
            </form>
          </div>

          <!-- 授权证书 -->
          <div v-if="activeTab === 'license'" class="bg-white rounded-xl shadow-sm p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-6">商用授权证书</h3>
            
            <div v-if="membershipInfo.vipLevel === 'free'" class="text-center py-8">
              <svg class="w-16 h-16 text-gray-300 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <p class="text-gray-500 mb-4">升级会员后可获取商用授权证书</p>
              <NuxtLink 
                to="/membership-pricing"
                class="inline-block px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                立即升级
              </NuxtLink>
            </div>

            <div v-else class="space-y-6">
              <!-- 授权证书预览 -->
              <div class="border-2 border-purple-200 rounded-xl p-8 bg-gradient-to-br from-purple-50 to-white">
                <div class="text-center">
                  <div class="inline-block px-4 py-1 bg-purple-600 text-white rounded-full text-sm mb-4">
                    易可图商用授权证书
                  </div>
                  <h2 class="text-2xl font-bold text-purple-800 mb-2">商用授权证明</h2>
                  <p class="text-gray-600 mb-6">CERTIFICATE OF COMMERCIAL LICENSE</p>
                  
                  <div class="bg-white/80 rounded-lg p-6 mb-6">
                    <div class="grid grid-cols-2 gap-4 text-left">
                      <div>
                        <p class="text-xs text-gray-500">授权用户</p>
                        <p class="text-sm font-semibold text-gray-900">{{ user?.email }}</p>
                      </div>
                      <div>
                        <p class="text-xs text-gray-500">授权等级</p>
                        <p class="text-sm font-semibold" :class="vipLevelColors[membershipInfo.vipLevel]">
                          {{ vipLevelNames[membershipInfo.vipLevel] }}
                        </p>
                      </div>
                      <div>
                        <p class="text-xs text-gray-500">授权编号</p>
                        <p class="text-sm font-semibold text-gray-900">YK{{ user?.id?.slice(0, 8).toUpperCase() }}</p>
                      </div>
                      <div>
                        <p class="text-xs text-gray-500">有效期</p>
                        <p class="text-sm font-semibold text-gray-900">
                          {{ membershipInfo.vipEndDate ? new Date(membershipInfo.vipEndDate).toLocaleDateString() : '永久有效' }}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div class="text-sm text-gray-500">
                    授权范围：个人/企业商用使用易可图平台所有设计作品
                  </div>
                </div>
              </div>

              <!-- 下载按钮 -->
              <div class="flex justify-center gap-4">
                <button 
                  class="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
                  @click="() => {}"
                >
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  下载证书
                </button>
              </div>

              <!-- 授权说明 -->
              <div class="bg-gray-50 rounded-lg p-4">
                <h4 class="font-semibold text-gray-900 mb-2">授权说明</h4>
                <ul class="text-sm text-gray-600 space-y-1">
                  <li>• 本证书证明您已获得易可图平台设计作品的商用授权</li>
                  <li>• 授权范围包括：海报、社交媒体图片、营销素材等</li>
                  <li>• 授权不包含平台VIP专属模板的二次分发</li>
                  <li>• 如有疑问请联系客服</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>