<template>
  <div class="fixed inset-0 bg-black/50 z-[2147483647] flex items-center justify-center" v-if="visible">
    <div class="bg-white rounded-2xl max-w-md w-full mx-4 overflow-hidden shadow-xl">
      <!-- Header -->
      <div class="bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white">
        <h3 class="text-xl font-bold mb-2">购买AI次数包</h3>
        <p class="text-purple-100 text-sm">AI设计次数已用完，购买次数包继续使用</p>
      </div>

      <!-- Content -->
      <div class="p-6">
        <div class="grid grid-cols-3 gap-4 mb-6">
          <button 
            v-for="pack in packs" 
            :key="pack.count"
            @click="selectedPack = pack"
            :class="selectedPack.count === pack.count ? 'border-purple-500 bg-purple-50 ring-2 ring-purple-500' : 'border-slate-200'"
            class="p-4 border rounded-xl hover:border-purple-300 transition text-center"
          >
            <div class="text-2xl font-bold text-slate-900 mb-1">{{ pack.count }}次</div>
            <div class="text-purple-600 font-bold">¥{{ pack.price }}</div>
            <div v-if="pack.discount" class="text-green-500 text-xs mt-1">省¥{{ pack.discount }}</div>
          </button>
        </div>

        <!-- Benefits -->
        <div class="bg-slate-50 rounded-lg p-4 mb-6">
          <div class="flex items-center gap-2 mb-2">
            <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            <span class="text-slate-700 text-sm">次数永久有效，不限时间</span>
          </div>
          <div class="flex items-center gap-2 mb-2">
            <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            <span class="text-slate-700 text-sm">AI设计更快更精准</span>
          </div>
          <div class="flex items-center gap-2">
            <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            <span class="text-slate-700 text-sm">支持多种支付方式</span>
          </div>
        </div>

        <!-- Payment Methods -->
        <div class="mb-6">
          <div class="text-slate-600 text-sm mb-3">选择支付方式</div>
          <div class="flex gap-4">
            <button 
              @click="paymentMethod = 'alipay'"
              :class="paymentMethod === 'alipay' ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-500' : 'border-slate-200'"
              class="flex-1 p-3 border rounded-lg flex items-center justify-center gap-2 hover:border-blue-300 transition"
            >
              <svg class="w-6 h-6 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21.422 15.358c-.936-.29-2.28-.434-4.034-.434-1.754 0-3.098.144-4.034.434-.936.29-1.404.727-1.404 1.313v2.625c0 .586.468 1.023 1.404 1.313.936.29 2.28.434 4.034.434 1.754 0 3.098-.144 4.034-.434.936-.29 1.404-.727 1.404-1.313v-2.625c0-.586-.468-1.023-1.404-1.313z"/>
              </svg>
              <span class="text-slate-700">支付宝</span>
            </button>
            <button 
              @click="paymentMethod = 'wechat'"
              :class="paymentMethod === 'wechat' ? 'border-green-500 bg-green-50 ring-2 ring-green-500' : 'border-slate-200'"
              class="flex-1 p-3 border rounded-lg flex items-center justify-center gap-2 hover:border-green-300 transition"
            >
              <svg class="w-6 h-6 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.6c0 2.372 1.246 4.505 3.4 5.869-.078.324-.312 1.313-.352 1.547-.058.324.122.318.255.259.128-.059 2.055-1.189 2.886-1.689.394.058.79.092 1.186.102v.002c4.8 0 8.691-3.288 8.691-7.412s-3.891-7.4-8.691-7.4c-.04 0-.08 0-.12.002"/>
              </svg>
              <span class="text-slate-700">微信支付</span>
            </button>
          </div>
        </div>

        <!-- Total -->
        <div class="flex justify-between items-center mb-6 p-4 bg-purple-50 rounded-lg">
          <span class="text-slate-600">支付金额</span>
          <span class="text-2xl font-bold text-purple-600">¥{{ selectedPack.price }}</span>
        </div>

        <!-- Buttons -->
        <div class="flex gap-3">
          <button @click="$emit('close')" class="flex-1 py-3 rounded-lg border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition">
            取消
          </button>
          <button @click="handlePurchase" class="flex-1 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold hover:opacity-90 transition">
            立即支付
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="absolute inset-0 bg-white/80 flex items-center justify-center">
        <div class="flex flex-col items-center gap-3">
          <div class="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
          <span class="text-slate-600">正在处理支付...</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  visible: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'purchase', pack: { count: number, price: number }): void
}>()

const packs = [
  { count: 20, price: 10, discount: 0 },
  { count: 50, price: 30, discount: 5 },
  { count: 100, price: 50, discount: 20 }
]

const selectedPack = ref(packs[1])
const paymentMethod = ref<'alipay' | 'wechat'>('alipay')
const loading = ref(false)

const handlePurchase = async () => {
  loading.value = true
  try {
    // Simulate payment process
    await new Promise(resolve => setTimeout(resolve, 1500))
    emit('purchase', selectedPack.value)
    emit('close')
  } catch (error) {
    console.error('Payment failed:', error)
  } finally {
    loading.value = false
  }
}
</script>