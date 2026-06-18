<template>
  <button
    class="w-full flex items-start gap-3 px-3 py-3 rounded-lg transition-all duration-200"
    :class="[
      item.id === activeId 
        ? 'bg-purple-50 border border-purple-200' 
        : 'hover:bg-gray-50'
    ]"
    @click="$emit('click')"
  >
    <div 
      class="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
      :class="item.id === activeId ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-500'"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    </div>
    <div class="flex-1 text-left">
      <p 
        class="font-medium text-sm"
        :class="item.id === activeId ? 'text-purple-700' : 'text-gray-900'"
      >
        {{ item.name }}
      </p>
      <p class="text-xs text-gray-500 mt-0.5">{{ item.desc }}</p>
    </div>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  item: { id: string; name: string; desc: string }
  activeId: string
}>()

defineEmits(['click'])
</script>