<template>
  <div class="flex min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
    <!-- 左侧导航栏 -->
    <aside class="w-56 bg-white border-r border-gray-200 flex flex-col fixed h-full z-40 shadow-sm">
      <!-- Logo区域 -->
      <div class="p-4 border-b border-gray-200">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-md">
            <span class="text-white font-bold text-sm">易</span>
          </div>
          <!-- 渐变品牌名 -->
          <span class="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">易可图</span>
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
      <!-- 头部功能区 -->
      <header class="bg-white/80 backdrop-blur-sm border-b border-gray-200 px-6 py-3 shadow-sm">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <!-- Slogan -->
            <span class="text-gray-900 text-sm font-medium">
              <span class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold">易可图</span>
              <span class="text-gray-600 ml-1">电商人都在用的设计平台</span>
            </span>
          </div>
          <div class="flex items-center gap-3">
            <!-- 推广返现 - 金色 -->
            <button class="px-4 py-2 bg-gradient-to-r from-amber-100 to-yellow-50 text-amber-700 rounded-lg font-medium hover:from-amber-200 hover:to-yellow-100 transition flex items-center gap-2 border border-amber-200">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 00-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c1.1 0 2 .9 2 2s-.9 2-2 2h-2V4c0-1.1.9-2 2-2zM9 4c1.1 0 2 .9 2 2v2H9c-1.1 0-2-.9-2-2s.9-2 2-2zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z"/>
              </svg>
              推广返现
            </button>
            <!-- AI次数 - 仅登录用户显示 -->
            <NuxtLink v-if="isLoggedIn" to="/user-center" class="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition flex items-center gap-2">
              <span class="bg-blue-500 text-white text-xs px-1.5 rounded font-bold">{{ aiCredits }}</span>
              AI次数
            </NuxtLink>
            <!-- 升级会员 - 带钻石图标 -->
            <NuxtLink to="/membership-pricing" class="px-4 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition flex items-center gap-2">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3H5L2 9l10 12L22 9l-3-6zM9.62 8l1.5-3h1.76l1.5 3H9.62zM11 10v6.68L5.44 10H11zm2 0h5.56L13 16.68V10zm6.26-2h-2.65l-1.5-3h2.65l1.5 3zM6.24 5h2.65l-1.5 3H4.74l1.5-3z"/>
              </svg>
              升级会员
            </NuxtLink>
            <!-- 未登录状态 - 显示登录按钮 -->
            <NuxtLink v-if="!isLoggedIn" to="/login" class="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
              登录
            </NuxtLink>
            <!-- 登录状态 - 显示用户头像 -->
            <NuxtLink v-else to="/user-center" class="flex items-center gap-2 hover:bg-gray-100 rounded-lg px-2 py-1 transition">
              <!-- VIP标识 -->
              <span v-if="isVip" class="bg-gradient-to-r from-amber-500 to-yellow-400 text-white text-xs px-1.5 py-0.5 rounded font-bold">VIP</span>
              <!-- 用户头像 -->
              <div class="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                <span class="text-white text-sm font-medium">{{ displayUserInitial }}</span>
              </div>
            </NuxtLink>
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
    
    <!-- 反馈按钮 -->
    <FeedbackButton />
    
    <!-- 客服组件 -->
    <CustomerService />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuth } from '~/composables/useAuth'

const { user, isLoggedIn, isVip, aiCredits, userInitial } = useAuth()

// Local userInitial fallback (in case useAuth doesn't provide it)
const localUserInitial = computed(() => {
  if (user.value?.email) {
    return user.value.email.charAt(0).toUpperCase()
  }
  return 'U'
})

// Use either from useAuth or local
const displayUserInitial = computed(() => userInitial?.value || localUserInitial.value)

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
  { id: 'space', name: '我的设计', icon: 'user', path: '/space' },
  { id: 'notifications', name: '通知中心', icon: 'bell', path: '/notification-center' },
  { id: 'coupons', name: '优惠券', icon: 'ticket', path: '/my-coupons' },
  { id: 'referral', name: '邀请奖励', icon: 'gift', path: '/referral-rewards' },
  { id: 'pricing', name: '会员价格', icon: 'vip', path: '/membership-pricing' },
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