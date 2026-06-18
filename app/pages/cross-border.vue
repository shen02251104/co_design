<template>
  <NuxtLayout>
    <div class="space-y-6">
      <!-- 页面标题 -->
      <div class="bg-white rounded-xl shadow-sm p-6">
        <h1 class="text-2xl font-bold text-gray-900">跨境工具</h1>
        <p class="text-gray-500 mt-2">专为跨境电商卖家打造的专业工具</p>
      </div>
      
      <!-- 跨境功能列表 -->
      <div class="grid grid-cols-4 gap-4">
        <CrossBorderCard 
          title="图片翻译" 
          description="一键翻译图片文字，支持多语言"
          @click="navigateToPoster('image-translate')"
        />
        <CrossBorderCard 
          title="合规标签生成" 
          description="生成各国合规标签，一键达标"
          @click="navigateToPoster('compliance-label')"
        />
        <CrossBorderCard 
          title="亚马逊A+页面" 
          description="快速生成亚马逊A+详情页"
          @click="navigateToPoster('amazon-detail')"
        />
        <CrossBorderCard 
          title="多语言商品图" 
          description="同一商品生成多语言版本图片"
          @click="navigateToPoster('multi-language')"
        />
        <CrossBorderCard 
          title="尺寸单位转换" 
          description="商品尺寸标注自动转换单位"
          @click="navigateToPoster('size-convert')"
        />
        <CrossBorderCard 
          title="物流信息标注" 
          description="自动生成物流时效信息标签"
          @click="navigateToPoster('shipping-info')"
        />
        <CrossBorderCard 
          title="合规检测" 
          description="检测图片是否符合平台规则"
          @click="navigateToPoster('compliance-check')"
        />
        <CrossBorderCard 
          title="品牌备案图" 
          description="生成品牌备案所需规格图片"
          @click="navigateToPoster('brand-file')"
        />
      </div>
      
      <!-- 支持平台 -->
      <div class="bg-white rounded-xl shadow-sm p-6">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">支持平台</h2>
        <div class="flex gap-4">
          <span class="px-4 py-2 bg-orange-50 text-orange-600 rounded-lg">亚马逊</span>
          <span class="px-4 py-2 bg-red-50 text-red-600 rounded-lg">速卖通</span>
          <span class="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg">eBay</span>
          <span class="px-4 py-2 bg-green-50 text-green-600 rounded-lg">Shopee</span>
          <span class="px-4 py-2 bg-purple-50 text-purple-600 rounded-lg">Lazada</span>
        </div>
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
  title: '跨境工具 - 易设计智能设计平台',
  meta: [
    { name: 'description', content: '易设计跨境工具，提供图片翻译、合规标签生成、亚马逊A+页面等功能，助力跨境电商卖家提升效率。' },
    { name: 'keywords', content: '跨境电商工具,图片翻译,合规标签,亚马逊A+页面,多语言商品图' },
  ],
})
</script>