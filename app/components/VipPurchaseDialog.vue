<template>
  <Teleport to="body">
    <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-[2147483647]" @click.self="$emit('close')">
      <div class="bg-white rounded-2xl w-[520px] max-h-[90vh] overflow-auto shadow-2xl">
        <!-- 顶部 -->
        <div class="p-4 border-b border-gray-100 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
              <svg class="w-5 h-5 text-indigo-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </div>
            <div>
              <div class="font-medium text-gray-900">易可图用户</div>
              <div class="text-xs text-gray-400 flex items-center gap-1">
                <span class="px-1.5 py-0.5 bg-gray-100 rounded text-gray-500">普通用户</span>
              </div>
            </div>
          </div>
          <button class="text-gray-400 hover:text-gray-600" @click="$emit('close')">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <!-- 会员类型 -->
        <div class="p-4">
          <div class="flex gap-2 mb-3">
            <button 
              class="px-4 py-2 rounded-lg text-sm"
              :class="memberType === 'single' ? 'bg-white shadow text-gray-900' : 'bg-gray-100 text-gray-500'"
              @click="memberType = 'single'"
            >单人用</button>
            <button 
              class="px-4 py-2 rounded-lg text-sm"
              :class="memberType === 'team' ? 'bg-white shadow text-gray-900' : 'bg-gray-100 text-gray-500'"
              @click="memberType = 'team'"
            >团队用</button>
          </div>
          <div class="flex gap-2">
            <button 
              class="px-3 py-1.5 rounded-lg text-sm border"
              :class="vipLevel === 'basic' ? 'border-indigo-400 bg-indigo-50 text-indigo-600' : 'border-gray-200 text-gray-600'"
              @click="vipLevel = 'basic'"
            >基础版</button>
            <button 
              class="px-3 py-1.5 rounded-lg text-sm border"
              :class="vipLevel === 'pro' ? 'border-indigo-400 bg-indigo-50 text-indigo-600' : 'border-gray-200 text-gray-600'"
              @click="vipLevel = 'pro'"
            >高级版</button>
            <button 
              class="px-3 py-1.5 rounded-lg text-sm border"
              :class="vipLevel === 'enterprise' ? 'border-indigo-400 bg-indigo-50 text-indigo-600' : 'border-gray-200 text-gray-600'"
              @click="vipLevel = 'enterprise'"
            >专业版</button>
          </div>
          <p class="text-xs text-gray-400 mt-2">
            {{ vipLevel === 'basic' ? '适合个人用户，体验基础功能' : vipLevel === 'pro' ? '适合电商卖家，包含商用授权' : '适合企业团队，全功能解锁' }}
          </p>
        </div>
        
        <!-- 套餐选择 -->
        <div class="p-4 border-t border-gray-100">
          <div class="grid grid-cols-4 gap-2">
            <div 
              class="p-2 rounded-xl border cursor-pointer transition"
              :class="selectedPlan === 'lifetime' ? 'border-indigo-400 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'"
              @click="selectedPlan = 'lifetime'"
            >
              <div class="text-xs text-amber-500 mb-1">限时优惠</div>
              <div class="font-bold text-lg">¥389</div>
              <div class="text-xs text-gray-400">终身版</div>
              <div class="text-xs text-gray-500 mt-1">长期性价比</div>
            </div>
            <div 
              class="p-2 rounded-xl border cursor-pointer transition"
              :class="selectedPlan === 'quarterly' ? 'border-indigo-400 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'"
              @click="selectedPlan = 'quarterly'"
            >
              <div class="text-xs text-amber-500 mb-1">首季立减</div>
              <div class="font-bold text-lg">¥59</div>
              <div class="text-xs text-gray-400">季度版</div>
              <div class="text-xs text-gray-500 mt-1">3个月会员</div>
            </div>
            <div 
              class="p-2 rounded-xl border cursor-pointer transition"
              :class="selectedPlan === 'yearly' ? 'border-indigo-400 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'"
              @click="selectedPlan = 'yearly'"
            >
              <div class="font-bold text-lg">¥139</div>
              <div class="text-xs text-gray-400">年费版</div>
              <div class="text-xs text-gray-500 mt-1">12个月会员</div>
            </div>
            <div 
              class="p-2 rounded-xl border cursor-pointer transition"
              :class="selectedPlan === 'yearly2' ? 'border-indigo-400 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'"
              @click="selectedPlan = 'yearly2'"
            >
              <div class="font-bold text-lg">¥199</div>
              <div class="text-xs text-gray-400">两年版</div>
              <div class="text-xs text-gray-500 mt-1">24个月会员</div>
            </div>
          </div>
        </div>
        
        <!-- VIP权益 -->
        <div class="p-4 border-t border-gray-100">
          <div class="text-sm font-medium text-gray-700 mb-3">会员权益</div>
          <div class="grid grid-cols-4 gap-3">
            <div class="text-center">
              <div class="w-10 h-10 mx-auto rounded-lg bg-indigo-100 flex items-center justify-center mb-1">
                <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div class="text-xs text-gray-900">商用授权</div>
              <div class="text-xs text-gray-400">正版无风险</div>
            </div>
            <div class="text-center">
              <div class="w-10 h-10 mx-auto rounded-lg bg-gray-100 flex items-center justify-center mb-1">
                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </div>
              <div class="text-xs text-gray-900">无水印下载</div>
              <div class="text-xs text-gray-400">高清导出</div>
            </div>
            <div class="text-center">
              <div class="w-10 h-10 mx-auto rounded-lg bg-indigo-100 flex items-center justify-center mb-1">
                <svg class="w-5 h-5 text-indigo-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9h-4v4h-2v-4H9V9h4V5h2v4h4v2z"/>
                </svg>
              </div>
              <div class="text-xs text-gray-900">海量模板</div>
              <div class="text-xs text-gray-400">100万+</div>
            </div>
            <div class="text-center">
              <div class="w-10 h-10 mx-auto rounded-lg bg-gray-100 flex items-center justify-center mb-1">
                <svg class="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                </svg>
              </div>
              <div class="text-xs text-gray-900">AI工具</div>
              <div class="text-xs text-gray-400">智能设计</div>
            </div>
          </div>
        </div>
        
        <!-- 支付区域 -->
        <div class="p-4 border-t border-gray-100 bg-gray-50">
          <div class="flex items-center justify-between mb-4">
            <div>
              <span class="text-2xl font-bold text-amber-500">¥{{ currentPrice }}</span>
              <span class="text-sm text-gray-400 ml-2">原价 ¥{{ originalPrice }}</span>
            </div>
            <div v-if="discount > 0" class="text-xs text-amber-500 bg-amber-50 px-2 py-1 rounded">优惠券 -¥{{ discount }}</div>
          </div>
          
          <div class="flex gap-3 mb-4">
            <button 
              class="flex-1 p-3 rounded-xl border transition flex flex-col items-center"
              :class="paymentMethod === 'alipay' ? 'border-blue-400 bg-blue-50' : 'border-gray-200 hover:border-gray-300'"
              @click="paymentMethod = 'alipay'"
            >
              <img src="/images/alipay-logo.svg" alt="支付宝" class="w-8 h-8">
              <span class="text-xs mt-1">支付宝</span>
            </button>
            <button 
              class="flex-1 p-3 rounded-xl border transition flex flex-col items-center"
              :class="paymentMethod === 'wechat' ? 'border-green-400 bg-green-50' : 'border-gray-200 hover:border-gray-300'"
              @click="paymentMethod = 'wechat'"
            >
              <img src="/images/wechat-logo.svg" alt="微信支付" class="w-8 h-8">
              <span class="text-xs mt-1">微信支付</span>
            </button>
          </div>
          
          <button 
            class="w-full py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
            :disabled="isProcessing"
            @click="handlePurchase"
          >
            {{ isProcessing ? '正在处理...' : `立即支付 ¥${currentPrice}` }}
          </button>
          <p class="text-xs text-gray-400 text-center mt-2">
            支付即视为同意《服务协议》与《授权许可》
          </p>
        </div>
      </div>
    </div>
    
    <!-- 支付弹窗 -->
    <PaymentDialog 
      :visible="showPaymentDialog"
      :productId="selectedPackage"
      :userId="userId"
      @close="closePaymentDialog"
      @success="handlePaymentSuccess"
    />
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import PaymentDialog from './PaymentDialog.vue'
import { useAuth } from '~/composables/useAuth'

interface Props {
  templateId?: string
}

const props = defineProps<Props>()
const emit = defineEmits(['close', 'success'])

const { user } = useAuth()

const memberType = ref('single')
const vipLevel = ref('basic')
const selectedPlan = ref('lifetime')
const paymentMethod = ref<'alipay' | 'wechat'>('alipay')

const isProcessing = ref(false)
const showPaymentDialog = ref(false)

const priceMap = {
  lifetime: { price: 389, original: 399, discount: 10 },
  quarterly: { price: 59, original: 79, discount: 20 },
  yearly2: { price: 199, original: 199, discount: 0 },
  yearly: { price: 139, original: 159, discount: 20 },
}

const currentPrice = computed(() => priceMap[selectedPlan.value as keyof typeof priceMap]?.price || 389)
const originalPrice = computed(() => priceMap[selectedPlan.value as keyof typeof priceMap]?.original || 399)
const discount = computed(() => priceMap[selectedPlan.value as keyof typeof priceMap]?.discount || 10)

// 获取套餐ID（用于支付）
const selectedPackage = computed(() => {
  const typeMap = {
    lifetime: 'vip_lifetime',
    quarterly: 'vip_quarterly',
    yearly: 'vip_yearly',
    yearly2: 'vip_yearly2',
  }
  return typeMap[selectedPlan.value as keyof typeof typeMap] || 'vip_lifetime'
})

// 用户ID
const userId = computed(() => user.value?.id || '')

// 点击购买按钮
const handlePurchase = () => {
  if (!userId.value) {
    alert('请先登录后再购买VIP会员')
    return
  }
  showPaymentDialog.value = true
}

const closePaymentDialog = () => {
  showPaymentDialog.value = false
}

const handlePaymentSuccess = () => {
  showPaymentDialog.value = false
  emit('success')
  emit('close')
}
</script>