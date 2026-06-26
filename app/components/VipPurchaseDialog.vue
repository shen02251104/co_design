<template>
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-[2147483647]" @click.self="$emit('close')">
    <div class="bg-white rounded-2xl w-[520px] max-h-[90vh] overflow-auto shadow-2xl">
      <!-- 顶部 -->
      <div class="p-4 border-b border-gray-100 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
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
            :class="vipLevel === 'basic' ? 'border-purple-400 bg-purple-50 text-purple-600' : 'border-gray-200 text-gray-600'"
            @click="vipLevel = 'basic'"
          >基础版</button>
          <button 
            class="px-3 py-1.5 rounded-lg text-sm border"
            :class="vipLevel === 'pro' ? 'border-purple-400 bg-purple-50 text-purple-600' : 'border-gray-200 text-gray-600'"
            @click="vipLevel = 'pro'"
          >高级版</button>
          <button 
            class="px-3 py-1.5 rounded-lg text-sm border"
            :class="vipLevel === 'enterprise' ? 'border-purple-400 bg-purple-50 text-purple-600' : 'border-gray-200 text-gray-600'"
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
            :class="selectedPlan === 'lifetime' ? 'border-purple-400 bg-purple-50' : 'border-gray-200 hover:border-gray-300'"
            @click="selectedPlan = 'lifetime'"
          >
            <div class="text-xs text-red-500 mb-1">限时优惠</div>
            <div class="font-bold text-lg">¥389</div>
            <div class="text-xs text-gray-400">终身版</div>
            <div class="text-xs text-gray-500 mt-1">长期性价比</div>
          </div>
          <div 
            class="p-2 rounded-xl border cursor-pointer transition"
            :class="selectedPlan === 'quarterly' ? 'border-purple-400 bg-purple-50' : 'border-gray-200 hover:border-gray-300'"
            @click="selectedPlan = 'quarterly'"
          >
            <div class="text-xs text-red-500 mb-1">首季立减</div>
            <div class="font-bold text-lg">¥59</div>
            <div class="text-xs text-gray-400">连续包季</div>
            <div class="text-xs text-gray-500 mt-1">作图尝鲜</div>
          </div>
          <div 
            class="p-2 rounded-xl border cursor-pointer transition"
            :class="selectedPlan === 'yearly2' ? 'border-purple-400 bg-purple-50' : 'border-gray-200 hover:border-gray-300'"
            @click="selectedPlan = 'yearly2'"
          >
            <div class="font-bold text-lg">¥199</div>
            <div class="text-xs text-gray-400">2年</div>
            <div class="text-xs text-gray-500 mt-1">8.3元/月</div>
          </div>
          <div 
            class="p-2 rounded-xl border cursor-pointer transition"
            :class="selectedPlan === 'yearly' ? 'border-purple-400 bg-purple-50' : 'border-gray-200 hover:border-gray-300'"
            @click="selectedPlan = 'yearly'"
          >
            <div class="text-xs text-red-500 mb-1">活动减20</div>
            <div class="font-bold text-lg">¥139</div>
            <div class="text-xs text-gray-400">连续包年</div>
            <div class="text-xs text-gray-500 mt-1">每天0.38元</div>
          </div>
        </div>
      </div>
      
      <!-- 权益 -->
      <div class="p-4 border-t border-gray-100">
        <div class="flex items-center justify-between mb-3">
          <span class="font-medium text-gray-900">会员权益</span>
          <button class="text-xs text-purple-600">查看更多</button>
        </div>
        <div class="grid grid-cols-4 gap-3">
          <div class="text-center">
            <div class="w-10 h-10 mx-auto rounded-lg bg-gradient-to-r from-amber-100 to-amber-200 flex items-center justify-center mb-1">
              <svg class="w-5 h-5 text-amber-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
              </svg>
            </div>
            <div class="text-xs text-gray-900">商用授权</div>
            <div class="text-xs text-gray-400">正版无风险</div>
          </div>
          <div class="text-center">
            <div class="w-10 h-10 mx-auto rounded-lg bg-gradient-to-r from-blue-100 to-blue-200 flex items-center justify-center mb-1">
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </div>
            <div class="text-xs text-gray-900">无水印下载</div>
            <div class="text-xs text-gray-400">高清导出</div>
          </div>
          <div class="text-center">
            <div class="w-10 h-10 mx-auto rounded-lg bg-gradient-to-r from-purple-100 to-purple-200 flex items-center justify-center mb-1">
              <svg class="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9h-4v4h-2v-4H9V9h4V5h2v4h4v2z"/>
              </svg>
            </div>
            <div class="text-xs text-gray-900">海量模板</div>
            <div class="text-xs text-gray-400">100万+</div>
          </div>
          <div class="text-center">
            <div class="w-10 h-10 mx-auto rounded-lg bg-gradient-to-r from-pink-100 to-pink-200 flex items-center justify-center mb-1">
              <svg class="w-5 h-5 text-pink-600" fill="currentColor" viewBox="0 0 24 24">
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
            <span class="text-2xl font-bold text-red-500">¥{{ currentPrice }}</span>
            <span class="text-sm text-gray-400 ml-2">原价 ¥{{ originalPrice }}</span>
          </div>
          <div class="text-xs text-pink-500 bg-pink-50 px-2 py-1 rounded">优惠券 -¥{{ discount }}</div>
        </div>
        
        <div class="flex gap-3 mb-4">
          <button 
            class="flex-1 p-3 rounded-xl border transition flex flex-col items-center"
            :class="paymentMethod === 'alipay' ? 'border-blue-400 bg-blue-50' : 'border-gray-200 hover:border-gray-300'"
            @click="paymentMethod = 'alipay'"
          >
            <svg class="w-8 h-8 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21.422 15.358c-3.83-1.153-6.055-1.84-7.341-2.322.465-1.207.825-2.528 1.056-3.956h-4.092V8.227h5.209V7.091h-5.209V4.58h-2.318c0 .6-.005 1.097-.005 1.511v1.005H7.5v1.136h4.435v1.853H7.5v1.136h7.097c-.186 1.01-.466 1.96-.835 2.834-1.823-.446-4.047-.712-6.762-.712-2.918 0-5.3.343-5.3 2.318 0 1.858 2.175 2.318 5.045 2.318 2.288 0 4.39-.356 6.197-1.147.975.478 2.126 1.017 3.564 1.617L21.422 15.358zM7.5 15.547c-2.055 0-3.09-.385-3.09-1.318 0-.932 1.035-1.318 3.09-1.318 2.055 0 3.09.386 3.09 1.318 0 .933-1.035 1.318-3.09 1.318z"/>
            </svg>
            <span class="text-xs mt-1">支付宝</span>
          </button>
          <button 
            class="flex-1 p-3 rounded-xl border transition flex flex-col items-center"
            :class="paymentMethod === 'wechat' ? 'border-green-400 bg-green-50' : 'border-gray-200 hover:border-gray-300'"
            @click="paymentMethod = 'wechat'"
          >
            <svg class="w-8 h-8 text-green-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.6c0 2.052 1.078 3.949 2.865 5.271-.088.318-.538 1.829-.6 2.083-.056.232.088.228.195.168.084-.046 1.26-.768 1.775-1.086.508.1 1.034.166 1.573.166 4.8 0 8.691-3.288 8.691-7.411 0-4.124-3.891-7.412-8.691-7.412zm4.912 7.412c0 2.586-2.19 4.689-4.912 4.689-2.722 0-4.912-2.103-4.912-4.689 0-2.586 2.19-4.689 4.912-4.689 2.722 0 4.912 2.103 4.912 4.689zM24 14.4c0-3.096-3.003-5.6-6.723-5.6-.39 0-.775.028-1.153.082-.156.022-.263.168-.24.322.023.156.168.263.322.24.35-.05.705-.075 1.064-.075 3.338 0 6.045 2.025 6.045 4.525 0 2.5-2.707 4.525-6.045 4.525-.475 0-.94-.048-1.39-.141-.066-.014-.134-.003-.194.03-.48.323-1.27.746-1.32.775-.048.027-.145.08-.145.148 0 .04.024.078.066.078.05 0 .4-.072.674-.12.056-.01.116-.003.166.025.356.206.738.355 1.139.448.06.014.104.067.104.128 0 .072-.055.128-.128.128h-.005c-.453-.024-.908-.073-1.36-.148-.082-.013-.153-.062-.184-.138-.024-.06-.016-.128.022-.182.206-.29.414-.59.624-.898.036-.052.097-.078.158-.068.387.066.78.1 1.177.1 3.835 0 6.965-2.435 6.965-5.435z"/>
            </svg>
            <span class="text-xs mt-1">微信支付</span>
          </button>
        </div>
        
        <button 
          class="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl font-medium hover:opacity-90 transition"
          @click="handlePurchase"
        >
          立即支付 ¥{{ currentPrice }}
        </button>
        <p class="text-xs text-gray-400 text-center mt-2">
          支付即视为同意《服务协议》与《授权许可》
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const emit = defineEmits(['close', 'success'])

const memberType = ref('single')
const vipLevel = ref('basic')
const selectedPlan = ref('lifetime')
const paymentMethod = ref('alipay')

const priceMap = {
  lifetime: { price: 389, original: 399, discount: 10 },
  quarterly: { price: 59, original: 79, discount: 20 },
  yearly2: { price: 199, original: 199, discount: 0 },
  yearly: { price: 139, original: 159, discount: 20 },
}

const currentPrice = computed(() => priceMap[selectedPlan.value as keyof typeof priceMap]?.price || 389)
const originalPrice = computed(() => priceMap[selectedPlan.value as keyof typeof priceMap]?.original || 399)
const discount = computed(() => priceMap[selectedPlan.value as keyof typeof priceMap]?.discount || 10)

const handlePurchase = async () => {
  // TODO: 调用后端API创建订单并跳转支付
  alert(`即将跳转到${paymentMethod.value === 'alipay' ? '支付宝' : '微信支付'}支付页面，金额：¥${currentPrice.value}`)
  emit('success')
  emit('close')
}
</script>