<template>
  <NuxtLayout>
    <div class="space-y-6">
      <!-- 页面标题 -->
      <div class="bg-white rounded-xl shadow-sm p-6">
        <h1 class="text-2xl font-bold text-gray-900">我的空间</h1>
        <p class="text-gray-500 mt-2">管理您的设计作品和素材资源</p>
      </div>
      
      <!-- 用户信息卡片 -->
      <div class="bg-white rounded-xl shadow-sm p-6">
        <div class="flex items-center gap-6">
          <div class="w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center">
            <svg class="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div>
            <h2 class="text-xl font-semibold text-gray-900">设计师用户</h2>
            <p class="text-gray-500 mt-1">普通会员</p>
          </div>
          <div class="ml-auto flex gap-4">
            <div class="text-center">
              <p class="text-2xl font-bold text-purple-600">12</p>
              <p class="text-sm text-gray-500">设计作品</p>
            </div>
            <div class="text-center">
              <p class="text-2xl font-bold text-orange-600">¥500</p>
              <p class="text-sm text-gray-500">消费金额</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 功能入口 -->
      <div class="grid grid-cols-3 gap-4">
        <SpaceCard 
          title="我的设计" 
          description="查看和管理您的设计作品"
          count="12"
          @click="navigateTo('/space/designs')"
        />
        <SpaceCard 
          title="收藏素材" 
          description="已收藏的素材和模板"
          count="36"
          @click="navigateTo('/space/favorites')"
        />
        <SpaceCard 
          title="历史记录" 
          description="查看操作历史记录"
          count="89"
          @click="navigateTo('/space/history')"
        />
      </div>
      
      <!-- 最近设计 -->
      <div class="bg-white rounded-xl shadow-sm p-6">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold text-gray-900">最近设计</h2>
          <NuxtLink to="/space/designs" class="text-purple-600 hover:text-purple-700">查看全部</NuxtLink>
        </div>
        <div class="grid grid-cols-4 gap-4">
          <RecentDesignCard title="促销海报" date="2024-06-18" />
          <RecentDesignCard title="商品详情页" date="2024-06-17" />
          <RecentDesignCard title="双十一活动" date="2024-06-16" />
          <RecentDesignCard title="新品上市" date="2024-06-15" />
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateTo = (path: string) => {
  router.push(path)
}

useHead({
  title: '我的空间 - 易设计智能设计平台',
  meta: [
    { name: 'description', content: '易设计个人空间，管理设计作品、收藏素材和操作历史，一站式管理您的设计资源。' },
    { name: 'keywords', content: '我的空间,设计作品管理,素材收藏,历史记录' },
  ],
})
</script>