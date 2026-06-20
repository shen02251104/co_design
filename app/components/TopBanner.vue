<template>
  <div 
    v-if="visible" 
    class="relative overflow-hidden"
  >
    <!-- 粉紫渐变背景 -->
    <div class="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 text-white px-6 py-4 flex items-center justify-between">
      <!-- 左侧内容 -->
      <div class="flex items-center gap-4">
        <div class="flex items-center gap-3">
          <!-- 商品示例图 -->
          <div class="flex gap-2">
            <div class="w-12 h-12 rounded-lg bg-white/20 overflow-hidden flex items-center justify-center">
              <svg class="w-8 h-8 text-white/80" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
              </svg>
            </div>
            <div class="w-12 h-12 rounded-lg bg-white/20 overflow-hidden flex items-center justify-center">
              <svg class="w-8 h-8 text-white/80" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
          </div>
          <!-- 文字内容 -->
          <div>
            <span class="font-bold text-lg">做图难？点我,3秒出全套</span>
          </div>
        </div>
      </div>
      
      <!-- 右侧按钮 -->
      <div class="flex items-center gap-4">
        <!-- 紫蓝渐变按钮 -->
        <NuxtLink 
          to="/poster-design?menu=product-suite" 
          class="px-5 py-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full font-medium hover:from-purple-600 hover:to-blue-600 transition-all shadow-lg flex items-center gap-2"
        >
          点击试试
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
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(true)
</script>