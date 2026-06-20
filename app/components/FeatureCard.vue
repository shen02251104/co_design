<template>
  <div 
    class="bg-white rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer overflow-hidden border border-gray-100"
    @click="$emit('click')"
  >
    <div v-if="image" class="h-24 bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
      <div class="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
        <svg class="w-6 h-6 text-purple-500" fill="currentColor" viewBox="0 0 24 24">
          <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
        </svg>
      </div>
    </div>
    <div class="p-3">
      <h4 class="font-medium text-gray-900 text-sm">{{ title }}</h4>
      <p class="text-xs text-gray-500 mt-0.5">{{ description }}</p>
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