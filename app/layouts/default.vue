<template>
  <div class="flex min-h-screen bg-gray-100">
    <!-- 左侧导航栏 -->
    <aside class="w-56 bg-white border-r border-gray-200 flex flex-col fixed h-full z-40">
      <!-- Logo区域 -->
      <div class="p-4 border-b border-gray-200">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-lg gradient-purple flex items-center justify-center">
            <span class="text-white font-bold text-sm">易</span>
          </div>
          <span class="font-semibold text-gray-900">易设计</span>
        </div>
      </div>
      
      <!-- 导航菜单 -->
      <nav class="flex-1 p-3 space-y-1">
        <SidebarNavItem 
          v-for="item in navItems" 
          :key="item.id"
          :item="item"
          :active-id="activeMenu"
          @click="handleNavClick(item)"
        />
      </nav>
      
      <!-- 底部折叠按钮 -->
      <div class="p-3 border-t border-gray-200">
        <button class="w-full flex items-center justify-center gap-2 text-gray-500 hover:text-gray-700 py-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </aside>
    
    <!-- 主内容区域 -->
    <main class="flex-1 ml-56">
      <!-- 顶部横幅广告 -->
      <TopBanner />
      
      <!-- 头部功能区 -->
      <header class="bg-white border-b border-gray-200 px-6 py-3">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <span class="text-gray-500 text-sm">易设计 · 电商人都在用的智能设计平台</span>
          </div>
          <div class="flex items-center gap-4">
            <button class="px-4 py-2 bg-orange-50 text-orange-600 rounded-lg font-medium hover:bg-orange-100 transition flex items-center gap-2">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 7h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v3H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zM10 4h4v3h-4V4z"/>
              </svg>
              推广返现
            </button>
            <button class="px-3 py-2 bg-blue-50 text-blue-600 rounded-lg font-medium hover:bg-blue-100 transition flex items-center gap-2">
              <span class="bg-blue-500 text-white text-xs px-1.5 rounded">17</span>
              充值
            </button>
            <button class="px-4 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition">
              升级会员
            </button>
            <div class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-300">
              <svg class="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </div>
          </div>
        </div>
      </header>
      
      <!-- 页面内容 -->
      <div class="p-6">
        <slot />
      </div>
    </main>
    
    <!-- 右侧悬浮按钮 -->
    <FloatingButtons />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

interface NavItem {
  id: string
  name: string
  icon: string
  path?: string
  children?: NavItem[]
}

const route = useRoute()
const router = useRouter()

const navItems: NavItem[] = [
  { id: 'home', name: '首页', icon: 'home', path: '/' },
  { id: 'ai-tools', name: 'AI工具', icon: 'ai', path: '/ai-tools' },
  { id: 'cross-border', name: '跨境工具', icon: 'search', path: '/cross-border' },
  { id: 'image-tools', name: '图片工具', icon: 'image', path: '/image-tools' },
  { id: 'poster-design', name: '海报设计', icon: 'template', path: '/poster-design' },
  { id: 'templates', name: '模板', icon: 'grid', path: '/templates' },
  { id: 'materials', name: '素材', icon: 'triangle', path: '/materials' },
  { id: 'space', name: '空间', icon: 'user', path: '/space' },
]

const activeMenu = computed(() => {
  const menuParam = route.query.menu as string
  if (menuParam) return menuParam
  return route.path.replace('/', '') || 'home'
})

const handleNavClick = (item: NavItem) => {
  if (item.path) {
    router.push({ path: item.path, query: { menu: item.id } })
  }
}

onMounted(() => {
  // 如果有 menu 参数，滚动到对应位置
  const menuParam = route.query.menu as string
  if (menuParam) {
    const element = document.getElementById(menuParam)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
})
</script>