<template>
  <button
    class="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg transition-all duration-200"
    :class="[
      item.id === activeId 
        ? 'bg-gray-100 text-gray-900 font-medium' 
        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
    ]"
    @click="$emit('click')"
  >
    <span 
      class="w-6 h-6 flex items-center justify-center"
      :class="item.id === activeId ? 'text-gray-900' : 'text-gray-400'"
    >
      <!-- 使用面性图标 -->
      <component :is="getIcon(item.icon)" />
    </span>
    <span class="text-sm">{{ item.name }}</span>
  </button>
</template>

<script setup lang="ts">
import { h } from 'vue'

interface NavItem {
  id: string
  name: string
  icon: string
  path?: string
}

const props = defineProps<{
  item: NavItem
  activeId: string
}>()

defineEmits(['click'])

// 面性图标（filled icons）
const getIcon = (iconType: string) => {
  const icons: Record<string, any> = {
    home: () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24', class: 'w-6 h-6' }, [
      h('path', { d: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z' })
    ]),
    ai: () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24', class: 'w-6 h-6' }, [
      h('path', { d: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.1c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.3z' })
    ]),
    search: () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24', class: 'w-6 h-6' }, [
      h('path', { d: 'M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z' })
    ]),
    image: () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24', class: 'w-6 h-6' }, [
      h('path', { d: 'M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z' })
    ]),
    template: () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24', class: 'w-6 h-6' }, [
      h('path', { d: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z' })
    ]),
    grid: () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24', class: 'w-6 h-6' }, [
      h('path', { d: 'M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z' })
    ]),
    triangle: () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24', class: 'w-6 h-6' }, [
      h('path', { d: 'M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z' })
    ]),
    user: () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24', class: 'w-6 h-6' }, [
      h('path', { d: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z' })
    ]),
  }
  return icons[iconType] || icons.home
}
</script>