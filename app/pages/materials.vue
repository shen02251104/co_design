<template>
  <NuxtLayout>
    <div class="space-y-6">
      <!-- 页面标题 -->
      <div class="bg-white rounded-xl shadow-sm p-6">
        <h1 class="text-2xl font-bold text-gray-900">素材库</h1>
        <p class="text-gray-500 mt-2">海量设计素材，让作品更出彩</p>
      </div>
      
      <!-- 素材分类 -->
      <div class="flex gap-2">
        <button class="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium">全部</button>
        <button class="px-4 py-2 bg-white text-gray-600 rounded-lg hover:bg-gray-50">图标</button>
        <button class="px-4 py-2 bg-white text-gray-600 rounded-lg hover:bg-gray-50">插画</button>
        <button class="px-4 py-2 bg-white text-gray-600 rounded-lg hover:bg-gray-50">背景</button>
        <button class="px-4 py-2 bg-white text-gray-600 rounded-lg hover:bg-gray-50">边框</button>
        <button class="px-4 py-2 bg-white text-gray-600 rounded-lg hover:bg-gray-50">装饰</button>
      </div>
      
      <!-- 素材网格 -->
      <div class="grid grid-cols-6 gap-4">
        <MaterialCard 
          title="促销图标"
          type="图标"
          @click="navigateToPoster('material')"
        />
        <MaterialCard 
          title="电商插画"
          type="插画"
          @click="navigateToPoster('material')"
        />
        <MaterialCard 
          title="渐变背景"
          type="背景"
          @click="navigateToPoster('material')"
        />
        <MaterialCard 
          title="精美边框"
          type="边框"
          @click="navigateToPoster('material')"
        />
        <MaterialCard 
          title="装饰元素"
          type="装饰"
          @click="navigateToPoster('material')"
        />
        <MaterialCard 
          title="节日素材"
          type="装饰"
          @click="navigateToPoster('material')"
        />
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateToPoster = (menuId: string) => {
  router.push({ path: '/poster-design', query: { menu: menuId } })
}

useHead({
  title: '素材库 - 易设计智能设计平台',
  meta: [
    { name: 'description', content: '易设计素材库，提供图标、插画、背景、边框等海量设计素材，助力电商设计创作。' },
    { name: 'keywords', content: '设计素材,图标素材,插画素材,背景素材,电商设计素材' },
  ],
})
</script>