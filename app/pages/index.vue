<template>
  <div class="min-h-screen">
    <NuxtLayout>
      <!-- 快捷功能入口 - 横向标签样式 -->
      <div class="flex items-center gap-3 mb-6 flex-wrap">
        <button 
          v-for="tool in quickTools" 
          :key="tool.id"
          class="px-4 py-2 bg-white rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2 border border-gray-100"
          @click="navigateToPoster(tool.id)"
        >
          <span class="w-5 h-5 flex items-center justify-center" :class="tool.color">
            <component :is="tool.icon" />
          </span>
          <span class="text-sm font-medium text-gray-700">{{ tool.name }}</span>
        </button>
      </div>
      
      <!-- 中央操作区 -->
      <div class="bg-white rounded-2xl shadow-md p-8 mb-6 relative overflow-hidden">
        <!-- 限时优惠标签 -->
        <div class="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs px-3 py-1 rounded-full font-medium shadow-sm">
          限时优惠
        </div>
        
        <div class="flex items-start gap-6">
          <!-- 左侧上传按钮 -->
          <button class="w-32 h-32 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-purple-200 hover:bg-gradient-to-br hover:from-blue-100 hover:to-purple-100 hover:border-purple-300 transition flex flex-col items-center justify-center shadow-sm">
            <div class="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center mb-2 shadow-md">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <span class="text-sm text-purple-600 font-medium">上传图片</span>
          </button>
          
          <!-- 右侧提示文字 -->
          <div class="flex-1 py-4">
            <p class="text-gray-600 text-lg font-medium">请上传图片，并描述您想完成的任务</p>
            <p class="text-gray-400 text-sm mt-3">支持 JPG、PNG、WebP 格式，最大 10MB</p>
            <div class="flex gap-2 mt-4">
              <span class="px-2 py-1 bg-purple-50 text-purple-600 text-xs rounded-md">AI识别</span>
              <span class="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-md">智能处理</span>
              <span class="px-2 py-1 bg-green-50 text-green-600 text-xs rounded-md">一键生成</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 功能推荐区 -->
      <div class="grid grid-cols-12 gap-6">
        <!-- 左侧横幅卡片 -->
        <div class="col-span-5">
          <div class="bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-400 rounded-2xl p-6 text-white relative overflow-hidden shadow-lg">
            <div class="absolute top-4 left-4 bg-white/20 px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
              商品套图 全新升级
            </div>
            <h3 class="text-2xl font-bold mt-12">一图成组 惊艳细节</h3>
            <p class="text-white/80 mt-2">视觉营销一步到位</p>
            <NuxtLink 
              to="/poster-design?menu=product-suite" 
              class="inline-flex items-center gap-2 mt-4 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full font-medium transition backdrop-blur-sm"
            >
              立即体验
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </NuxtLink>
            <!-- 商品示例图 -->
            <div class="absolute -bottom-2 -right-2 flex gap-2">
              <div class="w-20 h-20 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <svg class="w-12 h-12 text-white/80" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                </svg>
              </div>
              <div class="w-20 h-20 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <svg class="w-12 h-12 text-white/80" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
            </div>
          </div>
          
          <!-- 左下角功能入口 -->
          <div class="grid grid-cols-2 gap-4 mt-4">
            <div 
              class="bg-white rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer p-4 border border-gray-100"
              @click="navigateToPoster('image-edit')"
            >
              <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center mb-3">
                <svg class="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                </svg>
              </div>
              <h4 class="font-medium text-gray-900">图片编辑</h4>
              <p class="text-sm text-gray-500 mt-1">导入图片，即刻编辑</p>
            </div>
            <div 
              class="bg-white rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer p-4 border border-gray-100"
              @click="navigateToPoster('create')"
            >
              <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center mb-3">
                <svg class="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                </svg>
              </div>
              <h4 class="font-medium text-gray-900">创建设计</h4>
              <p class="text-sm text-gray-500 mt-1">创建空白画布</p>
            </div>
          </div>
        </div>
        
        <!-- 右侧热门推荐 -->
        <div class="col-span-7">
          <!-- 标签栏 -->
          <div class="flex items-center gap-2 mb-4 flex-wrap">
            <span class="px-3 py-1.5 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg text-sm font-medium shadow-sm">热门推荐</span>
            <span class="px-3 py-1.5 bg-white text-gray-600 rounded-lg text-sm hover:bg-gray-50 cursor-pointer shadow-sm border border-gray-100">AI商拍</span>
            <span class="px-3 py-1.5 bg-white text-gray-600 rounded-lg text-sm hover:bg-gray-50 cursor-pointer shadow-sm border border-gray-100">跨境电商</span>
            <span class="px-3 py-1.5 bg-white text-gray-600 rounded-lg text-sm hover:bg-gray-50 cursor-pointer shadow-sm border border-gray-100">视频工具</span>
            <span class="px-3 py-1.5 bg-white text-gray-600 rounded-lg text-sm hover:bg-gray-50 cursor-pointer shadow-sm border border-gray-100">POD设计</span>
            <span class="px-3 py-1.5 bg-white text-gray-600 rounded-lg text-sm hover:bg-gray-50 cursor-pointer shadow-sm border border-gray-100">图片处理</span>
            <NuxtLink to="/poster-design" class="px-3 py-1.5 text-purple-600 text-sm hover:text-purple-700 flex items-center gap-1 font-medium">
              更多功能
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </NuxtLink>
          </div>
          
          <!-- 功能卡片 -->
          <div class="grid grid-cols-2 gap-4">
            <HotFeatureCard 
              title="商品套图" 
              description="一键生成套图详情页"
              iconType="product"
              @click="navigateToPoster('product-suite')"
            />
            <HotFeatureCard 
              title="爆款视频生成" 
              description="爆款带货视频生成"
              iconType="video"
              @click="navigateToPoster('video-gen')"
            />
            <HotFeatureCard 
              title="图片翻译" 
              description="图片文字一键翻译"
              iconType="translate"
              @click="navigateToPoster('image-translate')"
            />
            <HotFeatureCard 
              title="合规标签" 
              description="一键生成跨境合规标签"
              iconType="label"
              @click="navigateToPoster('compliance-label')"
            />
          </div>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { ref, h } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 快捷工具列表
const quickTools = [
  { id: 'product-suite', name: '商品换背景', icon: () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24', class: 'w-5 h-5 text-purple-500' }, [h('path', { d: 'M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z' })]), color: 'text-purple-500' },
  { id: 'ai-edit', name: '一句话改图', icon: () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24', class: 'w-5 h-5 text-blue-500' }, [h('path', { d: 'M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z' })]), color: 'text-blue-500' },
  { id: 'change-bg', name: '智能抠图', icon: () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24', class: 'w-5 h-5 text-green-500' }, [h('path', { d: 'M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16z' })]), color: 'text-green-500' },
  { id: 'amazon-detail', name: 'A+详情页', icon: () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24', class: 'w-5 h-5 text-orange-500' }, [h('path', { d: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z' })]), color: 'text-orange-500' },
]

const navigateToPoster = (menuId: string) => {
  router.push({ path: '/poster-design', query: { menu: menuId } })
}

// SEO Meta
useHead({
  title: '易可图 - 电商人都在用的设计平台',
  meta: [
    { name: 'description', content: '易可图是专业的电商设计平台，提供海报设计、商品套图生成、AI换背景、图片翻译等智能工具，让电商设计更高效、更专业。' },
    { name: 'keywords', content: '电商设计,海报设计,商品套图,AI换背景,图片翻译,跨境电商,详情页设计' },
    { property: 'og:title', content: '易可图 - 电商人都在用的设计平台' },
    { property: 'og:description', content: '易可图提供AI智能设计工具，一键生成商品套图、海报设计、详情页，助力电商营销' },
    { property: 'og:type', content: 'website' },
  ],
})
</script>