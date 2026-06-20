<template>
  <div 
    class="bg-white rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer p-4 border border-gray-100 overflow-hidden relative"
    @click="$emit('click')"
  >
    <div class="flex items-start gap-4">
      <!-- 左侧图标/示例图区域 -->
      <div class="w-24 h-24 rounded-xl bg-gradient-to-br overflow-hidden flex items-center justify-center shadow-inner" :class="gradientClass">
        <component :is="getIcon()" />
      </div>
      
      <!-- 右侧文字 -->
      <div class="flex-1">
        <h4 class="font-medium text-gray-900 text-lg">{{ title }}</h4>
        <p class="text-sm text-gray-500 mt-1">{{ description }}</p>
        <!-- 热门标签 -->
        <div class="mt-3 flex items-center gap-2">
          <span class="px-2 py-0.5 bg-gradient-to-r from-red-50 to-orange-50 text-red-500 text-xs rounded-full font-medium">热门</span>
          <span class="text-xs text-gray-400">{{ useCount }}人使用</span>
        </div>
      </div>
    </div>
    
    <!-- 右下角箭头提示 -->
    <div class="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
      <svg class="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import { h, computed } from 'vue'

const props = defineProps<{
  title: string
  description: string
  iconType?: string
}>()

defineEmits(['click'])

// 使用人数（模拟数据）
const useCount = computed(() => {
  const counts: Record<string, number> = {
    product: 12580,
    video: 8960,
    translate: 6720,
    label: 5340,
  }
  return counts[props.iconType || 'product'] || 1000
})

// 渐变背景色
const gradientClass = computed(() => {
  const gradients: Record<string, string> = {
    product: 'from-purple-100 to-blue-100',
    video: 'from-pink-100 to-red-100',
    translate: 'from-blue-100 to-cyan-100',
    label: 'from-green-100 to-emerald-100',
  }
  return gradients[props.iconType || 'product'] || 'from-gray-100 to-gray-50'
})

// 获取图标
const getIcon = () => {
  const icons: Record<string, any> = {
    product: () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24', class: 'w-12 h-12 text-purple-500' }, [
      h('path', { d: 'M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z' })
    ]),
    video: () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24', class: 'w-12 h-12 text-pink-500' }, [
      h('path', { d: 'M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4zm-7 11l-4-2.5V10l4 2.5V15zm3 0l4-2.5V10l-4 2.5V15z' })
    ]),
    translate: () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24', class: 'w-12 h-12 text-blue-500' }, [
      h('path', { d: 'M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.96 4.54l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z' })
    ]),
    label: () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24', class: 'w-12 h-12 text-green-500' }, [
      h('path', { d: 'M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16zM16 17H5V7h11l3.55 5L16 17z' })
    ]),
  }
  return icons[props.iconType || 'product'] || icons.product
}
</script>