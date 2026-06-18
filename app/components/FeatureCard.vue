<template>
  <div 
    class="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden"
    @click="$emit('click')"
  >
    <div v-if="image" class="h-24 bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center">
      <div class="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
        <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    </div>
    <div class="p-3">
      <h4 class="font-medium text-gray-900">{{ title }}</h4>
      <p class="text-sm text-gray-500 mt-1">{{ description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  description: string
  image?: boolean
}>()

defineEmits(['click'])
</script>