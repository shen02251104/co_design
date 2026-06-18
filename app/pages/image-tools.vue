<template>
  <NuxtLayout>
    <div class="space-y-6">
      <!-- 页面标题 -->
      <div class="bg-white rounded-xl shadow-sm p-6">
        <h1 class="text-2xl font-bold text-gray-900">图片工具</h1>
        <p class="text-gray-500 mt-2">专业图片处理工具，满足各类设计需求</p>
      </div>
      
      <!-- 图片工具列表 -->
      <div class="grid grid-cols-4 gap-4">
        <ImageToolCard 
          title="图片裁剪" 
          description="智能裁剪，支持多种比例"
          @click="navigateToPoster('crop')"
        />
        <ImageToolCard 
          title="图片压缩" 
          description="无损压缩，减小文件体积"
          @click="navigateToPoster('compress')"
        />
        <ImageToolCard 
          title="格式转换" 
          description="PNG/JPG/WebP互转"
          @click="navigateToPoster('format-convert')"
        />
        <ImageToolCard 
          title="尺寸调整" 
          description="批量调整图片尺寸"
          @click="navigateToPoster('resize')"
        />
        <ImageToolCard 
          title="滤镜调色" 
          description="专业滤镜，一键调色"
          @click="navigateToPoster('filter')"
        />
        <ImageToolCard 
          title="添加水印" 
          description="批量添加水印保护"
          @click="navigateToPoster('watermark')"
        />
        <ImageToolCard 
          title="拼图组合" 
          description="多图拼接组合设计"
          @click="navigateToPoster('collage')"
        />
        <ImageToolCard 
          title="批量处理" 
          description="一次处理多张图片"
          @click="navigateToPoster('batch')"
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
  title: '图片工具 - 易设计智能设计平台',
  meta: [
    { name: 'description', content: '易设计图片工具，提供裁剪、压缩、格式转换、滤镜调色等专业图片处理功能。' },
    { name: 'keywords', content: '图片工具,图片裁剪,图片压缩,格式转换,滤镜调色,添加水印' },
  ],
})
</script>