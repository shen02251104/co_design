<template>
  <NuxtLayout>
    <div class="space-y-6">
      <!-- 页面标题 -->
      <div class="bg-white rounded-xl shadow-sm p-6">
        <h1 class="text-2xl font-bold text-gray-900">海报模板</h1>
        <p class="text-gray-500 mt-2">海量专业模板，一键套用快速出图</p>
      </div>
      
      <!-- 模板分类 -->
      <div class="flex gap-2">
        <button class="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium">全部</button>
        <button class="px-4 py-2 bg-white text-gray-600 rounded-lg hover:bg-gray-50">促销海报</button>
        <button class="px-4 py-2 bg-white text-gray-600 rounded-lg hover:bg-gray-50">节日海报</button>
        <button class="px-4 py-2 bg-white text-gray-600 rounded-lg hover:bg-gray-50">商品详情</button>
        <button class="px-4 py-2 bg-white text-gray-600 rounded-lg hover:bg-gray-50">品牌宣传</button>
        <button class="px-4 py-2 bg-white text-gray-600 rounded-lg hover:bg-gray-50">社交媒体</button>
      </div>
      
      <!-- 模板网格 -->
      <div class="grid grid-cols-4 gap-4">
        <TemplateCard 
          title="双十一促销"
          category="促销海报"
          @click="navigateToPoster('poster-template')"
        />
        <TemplateCard 
          title="春节特惠"
          category="节日海报"
          @click="navigateToPoster('poster-template')"
        />
        <TemplateCard 
          title="新品上市"
          category="商品详情"
          @click="navigateToPoster('poster-template')"
        />
        <TemplateCard 
          title="品牌故事"
          category="品牌宣传"
          @click="navigateToPoster('poster-template')"
        />
        <TemplateCard 
          title="618活动"
          category="促销海报"
          @click="navigateToPoster('poster-template')"
        />
        <TemplateCard 
          title="圣诞节"
          category="节日海报"
          @click="navigateToPoster('poster-template')"
        />
        <TemplateCard 
          title="热卖推荐"
          category="商品详情"
          @click="navigateToPoster('poster-template')"
        />
        <TemplateCard 
          title="产品特性"
          category="商品详情"
          @click="navigateToPoster('poster-template')"
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
  title: '模板中心 - 易设计智能设计平台',
  meta: [
    { name: 'description', content: '易设计模板中心，提供促销海报、节日海报、商品详情页等海量专业设计模板，一键套用快速出图。' },
    { name: 'keywords', content: '海报模板,促销海报模板,节日海报模板,商品详情页模板,电商设计模板' },
  ],
})
</script>