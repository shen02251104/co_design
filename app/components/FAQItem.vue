<template>
  <div class="border-b border-gray-100 last:border-0 pb-3 last:pb-0">
    <button
      @click="expanded = !expanded"
      class="w-full flex items-center justify-between text-left py-2 hover:text-blue-600 transition-colors"
    >
      <span class="font-medium text-gray-700">{{ question }}</span>
      <svg
        class="w-5 h-5 text-gray-400 transition-transform"
        :class="expanded ? 'rotate-180' : ''"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <path d="M6 9l6 6 6-6"/>
      </svg>
    </button>
    <p v-if="expanded" class="text-gray-500 text-sm mt-2 leading-relaxed">{{ answer }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  question: string
  answer: string
}

defineProps<Props>()

const expanded = ref(false)
</script>