<template>
  <div 
    v-if="visible" 
    class="gradient-banner text-white px-6 py-3 flex items-center justify-between relative"
  >
    <div class="flex items-center gap-4">
      <span class="bg-purple-600 text-white text-xs px-2 py-1 rounded font-medium">新品</span>
      <span class="font-medium">商品套图PRO 重磅来袭！生成效果全面升级</span>
      <span class="text-sm text-white/80">限时免费体验中</span>
    </div>
    <div class="flex items-center gap-4">
      <NuxtLink 
        to="/poster-design?menu=product-suite" 
        class="px-4 py-1.5 bg-white/20 rounded-lg font-medium hover:bg-white/30 transition flex items-center gap-2"
      >
        立即体验
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </NuxtLink>
      <button 
        @click="visible = false" 
        class="text-white/60 hover:text-white transition p-1"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(true)
</script>