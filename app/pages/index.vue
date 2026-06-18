<template>
  <div class="min-h-screen">
    <NuxtLayout>
      <!-- 功能切换区 -->
      <div class="flex items-center gap-4 mb-6">
        <div class="flex bg-white rounded-lg p-1 shadow-sm">
          <button 
            class="px-4 py-2 rounded-md font-medium transition"
            :class="activeTab === 'agent' ? 'bg-purple-600 text-white' : 'text-gray-600 hover:bg-gray-50'"
            @click="activeTab = 'agent'"
          >
            Agent
          </button>
          <button 
            class="px-4 py-2 rounded-md font-medium transition"
            :class="activeTab === 'search' ? 'bg-purple-600 text-white' : 'text-gray-600 hover:bg-gray-50'"
            @click="activeTab = 'search'"
          >
            搜索
          </button>
        </div>
        
        <!-- 快捷功能入口 -->
        <div class="flex gap-3">
          <FeatureCard 
            title="套图详情页" 
            description="一键生成商品详情页"
            :image="true"
            @click="navigateToPoster('product-suite')"
          />
          <FeatureCard 
            title="商品换背景" 
            description="智能替换商品背景"
            :image="true"
            @click="navigateToPoster('change-bg')"
          />
          <FeatureCard 
            title="一句话改图" 
            description="AI智能修改图片"
            :image="true"
            @click="navigateToPoster('ai-edit')"
          />
          <FeatureCard 
            title="A+详情页" 
            description="生成亚马逊详情页"
            :image="true"
            @click="navigateToPoster('amazon-detail')"
          />
        </div>
      </div>
      
      <!-- 中央操作区 -->
      <div class="bg-white rounded-xl shadow-sm p-8 mb-6">
        <div class="flex flex-col items-center justify-center py-12">
          <!-- 上传按钮 -->
          <button class="w-20 h-20 rounded-xl border-2 border-purple-200 bg-purple-50 hover:bg-purple-100 hover:border-purple-300 transition flex items-center justify-center mb-4">
            <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
          </button>
          <p class="text-gray-500 text-lg">请上传图片，并描述您想完成的任务</p>
          <p class="text-gray-400 text-sm mt-2">支持 JPG、PNG、WebP 格式，最大 10MB</p>
        </div>
      </div>
      
      <!-- 功能推荐区 -->
      <div class="grid grid-cols-12 gap-6">
        <!-- 左侧横幅卡片 -->
        <div class="col-span-6">
          <div class="bg-gradient-to-br from-purple-600 to-pink-500 rounded-xl p-6 text-white relative overflow-hidden">
            <span class="bg-white/20 px-3 py-1 rounded-md text-sm font-medium">商品套图 全新升级</span>
            <h3 class="text-2xl font-bold mt-4">一图成组 惊艳细节</h3>
            <p class="text-white/80 mt-2">视觉营销一步到位</p>
            <NuxtLink 
              to="/poster-design?menu=product-suite" 
              class="inline-flex items-center gap-2 mt-4 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg font-medium transition"
            >
              立即体验
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </NuxtLink>
            <!-- 示例图 -->
            <div class="absolute -bottom-4 -right-4 w-32 h-32 bg-white/10 rounded-lg" />
          </div>
          
          <!-- 左下角功能入口 -->
          <div class="grid grid-cols-2 gap-4 mt-4">
            <FeatureCard 
              title="图片编辑" 
              description="导入图片，即刻编辑"
              @click="navigateToPoster('image-edit')"
            />
            <FeatureCard 
              title="创建设计" 
              description="创建空白画布，开始设计"
              @click="navigateToPoster('create')"
            />
          </div>
        </div>
        
        <!-- 右侧热门推荐 -->
        <div class="col-span-6">
          <!-- 标签栏 -->
          <div class="flex items-center gap-2 mb-4 flex-wrap">
            <span class="px-3 py-1.5 bg-purple-600 text-white rounded-lg text-sm font-medium">热门推荐</span>
            <span class="px-3 py-1.5 bg-white text-gray-600 rounded-lg text-sm hover:bg-gray-50 cursor-pointer">AI商拍</span>
            <span class="px-3 py-1.5 bg-white text-gray-600 rounded-lg text-sm hover:bg-gray-50 cursor-pointer">跨境电商</span>
            <span class="px-3 py-1.5 bg-white text-gray-600 rounded-lg text-sm hover:bg-gray-50 cursor-pointer">视频工具</span>
            <span class="px-3 py-1.5 bg-white text-gray-600 rounded-lg text-sm hover:bg-gray-50 cursor-pointer">POD设计</span>
            <span class="px-3 py-1.5 bg-white text-gray-600 rounded-lg text-sm hover:bg-gray-50 cursor-pointer">图片处理</span>
            <NuxtLink to="/poster-design" class="px-3 py-1.5 text-purple-600 text-sm hover:text-purple-700 flex items-center gap-1">
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
              @click="navigateToPoster('product-suite')"
            />
            <HotFeatureCard 
              title="爆款视频生成" 
              description="爆款带货视频生成"
              @click="navigateToPoster('video-gen')"
            />
            <HotFeatureCard 
              title="图片翻译" 
              description="图片文字一键翻译"
              @click="navigateToPoster('image-translate')"
            />
            <HotFeatureCard 
              title="合规标签" 
              description="一键生成跨境合规标签"
              @click="navigateToPoster('compliance-label')"
            />
          </div>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const activeTab = ref('agent')
const router = useRouter()

const navigateToPoster = (menuId: string) => {
  router.push({ path: '/poster-design', query: { menu: menuId } })
}

// SEO Meta
useHead({
  title: '易设计 - 电商人都在用的智能设计平台',
  meta: [
    { name: 'description', content: '易设计是专业的电商设计平台，提供海报设计、商品套图生成、AI换背景、图片翻译等智能工具，让电商设计更高效、更专业。' },
    { name: 'keywords', content: '电商设计,海报设计,商品套图,AI换背景,图片翻译,跨境电商,详情页设计' },
    { property: 'og:title', content: '易设计 - 电商人都在用的智能设计平台' },
    { property: 'og:description', content: '易设计提供AI智能设计工具，一键生成商品套图、海报设计、详情页，助力电商营销' },
    { property: 'og:type', content: 'website' },
  ],
})
</script>