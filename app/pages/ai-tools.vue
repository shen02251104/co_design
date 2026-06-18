<template>
  <NuxtLayout>
    <div class="space-y-6">
      <!-- 页面标题 -->
      <div class="bg-white rounded-xl shadow-sm p-6">
        <h1 class="text-2xl font-bold text-gray-900">AI 工具</h1>
        <p class="text-gray-500 mt-2">智能 AI 设计工具，让设计更高效</p>
      </div>
      
      <!-- AI 功能列表 -->
      <div class="grid grid-cols-4 gap-4">
        <AIToolCard 
          title="商品套图生成" 
          description="上传一张商品图，AI自动生成多角度详情页套图"
          @click="navigateToPoster('product-suite')"
        />
        <AIToolCard 
          title="智能换背景" 
          description="一键替换商品背景，支持场景/纯色/渐变"
          @click="navigateToPoster('change-bg')"
        />
        <AIToolCard 
          title="一句话改图" 
          description="用文字描述需求，AI智能修改图片"
          @click="navigateToPoster('ai-edit')"
        />
        <AIToolCard 
          title="AI抠图" 
          description="一键抠出商品主体，精准识别边缘"
          @click="navigateToPoster('cutout')"
        />
        <AIToolCard 
          title="图片增强" 
          description="AI优化图片质量，提升清晰度和色彩"
          @click="navigateToPoster('enhance')"
        />
        <AIToolCard 
          title="智能配文案" 
          description="根据商品图片，AI生成营销文案"
          @click="navigateToPoster('copywriting')"
        />
        <AIToolCard 
          title="风格迁移" 
          description="将商品图片迁移到指定艺术风格"
          @click="navigateToPoster('style-transfer')"
        />
        <AIToolCard 
          title="爆款视频生成" 
          description="一键生成带货短视频，快速出片"
          @click="navigateToPoster('video-gen')"
        />
      </div>
      
      <!-- 使用说明 -->
      <div class="bg-white rounded-xl shadow-sm p-6">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">使用说明</h2>
        <div class="grid grid-cols-3 gap-6 text-sm text-gray-600">
          <div>
            <h3 class="font-medium text-gray-900 mb-2">1. 上传图片</h3>
            <p>支持 JPG、PNG、WebP 格式，建议使用高清商品图</p>
          </div>
          <div>
            <h3 class="font-medium text-gray-900 mb-2">2. 选择功能</h3>
            <p>根据需求选择对应的 AI 工具，设置参数</p>
          </div>
          <div>
            <h3 class="font-medium text-gray-900 mb-2">3. 导出成品</h3>
            <p>AI 处理完成后，一键导出高清成品图</p>
          </div>
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
  title: 'AI工具 - 易设计智能设计平台',
  meta: [
    { name: 'description', content: '易设计AI工具集，提供商品套图生成、智能换背景、AI抠图、图片增强等智能设计工具，让电商设计更高效。' },
    { name: 'keywords', content: 'AI设计工具,商品套图,智能换背景,AI抠图,图片增强,智能配文案' },
  ],
})
</script>