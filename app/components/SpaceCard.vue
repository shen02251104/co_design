<template>
  <div 
    class="bg-white rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-pointer p-4 group"
    @click="$emit('click')"
  >
    <div class="flex items-start gap-4">
      <div 
        class="w-12 h-12 rounded-lg flex items-center justify-center shrink-0"
        :class="countColorClass"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
      <div class="flex-1">
        <h4 class="font-medium text-gray-900">{{ title }}</h4>
        <p class="text-sm text-gray-500 mt-1">{{ description }}</p>
        <p class="text-sm font-medium mt-2" :class="countColorClass">{{ count }} 个项目</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  title: string
  description: string
  count: string
}>()

defineEmits(['click'])

const countColorClass = computed(() => {
  if (props.title === '我的设计') return 'text-purple-600 bg-purple-50 group-hover:bg-purple-100'
  if (props.title === '收藏素材') return 'text-orange-600 bg-orange-50 group-hover:bg-orange-100'
  return 'text-blue-600 bg-blue-50 group-hover:bg-blue-100'
})
</script>