<template>
  <div 
    class="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer aspect-square flex flex-col items-center justify-center group"
    @click="$emit('click')"
  >
    <div class="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center mb-2 group-hover:bg-purple-50 transition">
      <svg class="w-6 h-6 text-gray-400 group-hover:text-purple-600 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    </div>
    <p class="text-xs text-gray-500">{{ type }}</p>
    <p class="text-sm font-medium text-gray-900 mt-1">{{ title }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  type: string
}>()

defineEmits(['click'])
</script>