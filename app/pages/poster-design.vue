<template>
  <NuxtLayout>
    <!-- 顶部设计器入口 -->
    <div class="mb-4 bg-gradient-to-r from-purple-600 to-pink-500 rounded-xl p-4 flex items-center justify-between">
      <div class="text-white">
        <h2 class="font-bold text-lg">专业海报设计器</h2>
        <p class="text-sm opacity-80">基于迅排设计开源项目，支持拖拽编辑、模板套用、图片处理等功能</p>
      </div>
      <a href="/design/" target="_blank" class="px-6 py-2 bg-white text-purple-600 rounded-lg font-medium hover:bg-gray-100 transition">
        打开设计器 →
      </a>
    </div>
    
    <div class="flex gap-6">
      <!-- 左侧功能菜单 -->
      <div class="w-64 bg-white rounded-xl shadow-sm p-4">
        <h3 class="font-semibold text-gray-900 mb-4">设计功能</h3>
        <div class="space-y-2">
          <PosterMenuItem
            v-for="item in posterMenuItems"
            :key="item.id"
            :item="item"
            :active-id="activeMenuId"
            @click="handleMenuClick(item)"
          />
        </div>
      </div>
      
      <!-- 中间编辑区 -->
      <div class="flex-1 bg-white rounded-xl shadow-sm">
        <!-- 工具栏 -->
        <div class="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <div class="flex items-center gap-2">
            <button class="px-3 py-1.5 bg-gray-100 rounded-lg text-sm hover:bg-gray-200 transition">撤销</button>
            <button class="px-3 py-1.5 bg-gray-100 rounded-lg text-sm hover:bg-gray-200 transition">重做</button>
            <span class="text-gray-300">|</span>
            <button class="px-3 py-1.5 bg-gray-100 rounded-lg text-sm hover:bg-gray-200 transition">复制</button>
            <button class="px-3 py-1.5 bg-gray-100 rounded-lg text-sm hover:bg-gray-200 transition">粘贴</button>
          </div>
          <div class="flex items-center gap-2">
            <button class="px-3 py-1.5 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700 transition">保存</button>
            <button class="px-4 py-1.5 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg text-sm hover:opacity-90 transition">导出</button>
          </div>
        </div>
        
        <!-- 编辑画布区 -->
        <div class="flex items-center justify-center p-8 min-h-[500px] bg-gray-50">
          <div 
            ref="canvasRef"
            class="bg-white shadow-lg relative"
            :style="{
              width: canvasWidth + 'px',
              height: canvasHeight + 'px',
            }"
          >
            <!-- 空画布提示 -->
            <div v-if="!hasContent" class="absolute inset-0 flex flex-col items-center justify-center">
              <svg class="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p class="text-gray-400">点击左侧功能开始设计</p>
            </div>
            
            <!-- 动态渲染的设计元素 -->
            <div v-if="hasContent">
              <!-- 文字元素 -->
              <div
                v-for="element in textElements"
                :key="element.id"
                class="absolute cursor-move select-none"
                :style="{
                  left: element.x + 'px',
                  top: element.y + 'px',
                  width: element.width + 'px',
                  minHeight: element.height + 'px',
                  ...element.style
                }"
              >
                {{ element.content }}
              </div>
            </div>
          </div>
        </div>
        
        <!-- 画布尺寸选择 -->
        <div class="flex items-center justify-center gap-4 px-4 py-3 border-t border-gray-200">
          <button 
            v-for="size in canvasSizes"
            :key="size.id"
            class="px-3 py-1.5 rounded-lg text-sm transition"
            :class="activeSize === size.id ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
            @click="activeSize = size.id"
          >
            {{ size.name }}
          </button>
        </div>
      </div>
      
      <!-- 右侧属性面板 -->
      <div class="w-64 bg-white rounded-xl shadow-sm p-4">
        <h3 class="font-semibold text-gray-900 mb-4">属性设置</h3>
        
        <!-- 根据当前选中功能显示不同属性 -->
        <div v-if="activeMenuId === 'product-suite'" class="space-y-4">
          <div>
            <label class="text-sm text-gray-600 mb-2 block">商品图片</label>
            <button class="w-full py-2 bg-purple-50 text-purple-600 rounded-lg text-sm hover:bg-purple-100 transition">
              上传商品图片
            </button>
          </div>
          <div>
            <label class="text-sm text-gray-600 mb-2 block">套图数量</label>
            <input 
              type="number" 
              v-model="suiteCount"
              class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
              min="3"
              max="20"
            />
          </div>
          <div>
            <label class="text-sm text-gray-600 mb-2 block">风格选择</label>
            <div class="grid grid-cols-2 gap-2">
              <button class="px-3 py-2 bg-gray-100 rounded-lg text-sm hover:bg-gray-200">简约</button>
              <button class="px-3 py-2 bg-gray-100 rounded-lg text-sm hover:bg-gray-200">商务</button>
              <button class="px-3 py-2 bg-gray-100 rounded-lg text-sm hover:bg-gray-200">时尚</button>
              <button class="px-3 py-2 bg-gray-100 rounded-lg text-sm hover:bg-gray-200">科技</button>
            </div>
          </div>
        </div>
        
        <div v-else-if="activeMenuId === 'change-bg'" class="space-y-4">
          <div>
            <label class="text-sm text-gray-600 mb-2 block">背景类型</label>
            <div class="grid grid-cols-2 gap-2">
              <button class="px-3 py-2 bg-gray-100 rounded-lg text-sm hover:bg-gray-200">纯色</button>
              <button class="px-3 py-2 bg-gray-100 rounded-lg text-sm hover:bg-gray-200">渐变</button>
              <button class="px-3 py-2 bg-gray-100 rounded-lg text-sm hover:bg-gray-200">场景</button>
              <button class="px-3 py-2 bg-gray-100 rounded-lg text-sm hover:bg-gray-200">自定义</button>
            </div>
          </div>
          <div>
            <label class="text-sm text-gray-600 mb-2 block">预设场景</label>
            <div class="grid grid-cols-3 gap-2">
              <div class="w-full h-16 rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 cursor-pointer hover:ring-2 ring-purple-400" />
              <div class="w-full h-16 rounded-lg bg-gradient-to-br from-green-100 to-green-200 cursor-pointer hover:ring-2 ring-purple-400" />
              <div class="w-full h-16 rounded-lg bg-gradient-to-br from-amber-100 to-amber-200 cursor-pointer hover:ring-2 ring-purple-400" />
            </div>
          </div>
        </div>
        
        <!-- 文字设计面板 -->
        <div v-else-if="activeMenuId === 'text-design'">
          <TextDesignPanel @addText="handleAddText" />
        </div>
        
        <div v-else class="text-center py-8 text-gray-400">
          <p>请选择左侧功能</p>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import TextDesignPanel from '~/components/TextDesignPanel.vue'

const route = useRoute()
const activeMenuId = ref('')
const activeSize = ref('banner')
const suiteCount = ref(6)
const canvasRef = ref<HTMLElement | null>(null)
const hasContent = ref(false)

const posterMenuItems = [
  { id: 'product-suite', name: '商品套图', desc: '一键生成商品详情页套图' },
  { id: 'change-bg', name: '商品换背景', desc: '智能替换商品背景' },
  { id: 'ai-edit', name: '一句话改图', desc: 'AI智能修改图片内容' },
  { id: 'poster-template', name: '海报模板', desc: '海量专业海报模板' },
  { id: 'text-design', name: '文字设计', desc: '创意文字排版设计' },
  { id: 'image-edit', name: '图片编辑', desc: '裁剪、滤镜、调色等' },
  { id: 'material', name: '素材库', desc: '图标、插画、背景素材' },
  { id: 'amazon-detail', name: 'A+详情页', desc: '亚马逊商品详情页设计' },
]

const canvasSizes = [
  { id: 'banner', name: 'Banner (750x400)', width: 750, height: 400 },
  { id: 'poster', name: '海报 (800x1200)', width: 800, height: 1200 },
  { id: 'detail', name: '详情页 (750x2000)', width: 750, height: 2000 },
  { id: 'square', name: '方形 (800x800)', width: 800, height: 800 },
]

const canvasWidth = computed(() => {
  const size = canvasSizes.find(s => s.id === activeSize.value)
  return size?.width || 750
})

const canvasHeight = computed(() => {
  const size = canvasSizes.find(s => s.id === activeSize.value)
  return size?.height || 400
})

const handleMenuClick = (item: any) => {
  activeMenuId.value = item.id
  hasContent.value = true
}

// 文字元素列表
const textElements = ref<any[]>([])

// 添加文字到画布
const handleAddText = (textData: any) => {
  const newElement = {
    id: Date.now(),
    content: textData.content,
    style: textData.style,
    x: (canvasWidth.value - 200) / 2,
    y: (canvasHeight.value - 50) / 2,
    width: 200,
    height: 50,
  }
  textElements.value.push(newElement)
  hasContent.value = true
}

onMounted(() => {
  // 从 URL 参数获取菜单定位
  const menuParam = route.query.menu as string
  if (menuParam && posterMenuItems.find(item => item.id === menuParam)) {
    activeMenuId.value = menuParam
    hasContent.value = true
  }
})

// SEO Meta
useHead({
  title: '海报设计 - 易设计智能设计平台',
  meta: [
    { name: 'description', content: '易设计海报设计功能，提供商品套图生成、智能换背景、海报模板、文字设计等专业工具，让电商海报设计更简单高效。' },
    { name: 'keywords', content: '海报设计,商品套图,换背景,海报模板,文字设计,详情页设计,电商设计工具' },
    { property: 'og:title', content: '海报设计 - 易设计智能设计平台' },
    { property: 'og:description', content: '易设计海报设计功能，一键生成商品套图、智能换背景，助力电商营销' },
  ],
})
</script>