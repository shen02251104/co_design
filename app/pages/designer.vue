<script setup lang="ts">
import { ref, computed } from 'vue'

// SEO 配置
useHead({
  title: '海报设计器 - 易设计',
  meta: [
    { name: 'description', content: '专业海报设计工具，支持商品套图生成、图片换背景、模板编辑等功能，电商人必备的设计平台' },
    { name: 'keywords', content: '海报设计,电商设计,商品套图,图片编辑,模板设计,易设计' },
  ],
})

// 路由参数处理
const route = useRoute()
const menuQuery = route.query.menu as string

// 当前选中的菜单
const activeMenu = ref(menuQuery || 'template')

// 菜单列表
const menuList = [
  { id: 'template', name: '模板', icon: 'grid' },
  { id: 'background', name: '换背景', icon: 'image' },
  { id: 'text', name: '文字', icon: 'text' },
  { id: 'image', name: '图片', icon: 'photo' },
  { id: 'qrcode', name: '二维码', icon: 'qrcode' },
  { id: 'element', name: '元素', icon: 'element' },
  { id: 'tool', name: '工具', icon: 'tool' },
]

// 监听路由参数变化
watch(() => route.query.menu, (newMenu) => {
  if (newMenu) {
    activeMenu.value = newMenu as string
  }
})

// 画布配置
const canvasWidth = ref(800)
const canvasHeight = ref(1200)
const canvasBg = ref('#ffffff')

// 设计元素列表
const elements = ref([
  { id: 1, type: 'text', content: '商品标题', x: 100, y: 100, width: 300, height: 40 },
  { id: 2, type: 'image', url: '/placeholder-product.png', x: 100, y: 200, width: 200, height: 200 },
])

// 生成图片功能
const generateImage = async () => {
  // 使用 html2canvas 生成图片（前端方案）
  alert('图片生成功能需要集成 html2canvas 库。Java 后端 API 已准备就绪，可调用 /api/design/screenshot 接口生成高清图片。')
}
</script>

<template>
  <div class="designer-page min-h-screen bg-gray-100 flex">
    <!-- 左侧工具栏 -->
    <aside class="left-panel w-64 bg-white shadow-lg flex flex-col">
      <!-- Logo -->
      <div class="p-4 border-b border-gray-200">
        <NuxtLink to="/" class="flex items-center gap-2">
          <div class="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg"></div>
          <span class="text-lg font-bold text-gray-800">易设计</span>
        </NuxtLink>
      </div>
      
      <!-- 菜单列表 -->
      <nav class="flex-1 p-2">
        <ul class="space-y-1">
          <li v-for="menu in menuList" :key="menu.id">
            <button
              :class="[
                'w-full px-4 py-3 rounded-lg flex items-center gap-3 transition-all duration-200',
                activeMenu === menu.id 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md' 
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              ]"
              @click="activeMenu = menu.id"
            >
              <span class="w-5 h-5 flex items-center justify-center">
                <!-- 简化图标显示 -->
                {{ menu.icon.charAt(0).toUpperCase() }}
              </span>
              <span class="font-medium">{{ menu.name }}</span>
            </button>
          </li>
        </ul>
      </nav>
      
      <!-- 底部操作 -->
      <div class="p-4 border-t border-gray-200 space-y-2">
        <button 
          class="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          @click="generateImage"
        >
          生成图片
        </button>
        <button class="w-full py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
          保存设计
        </button>
      </div>
    </aside>
    
    <!-- 中间画布区域 -->
    <main class="canvas-area flex-1 flex items-center justify-center p-8 bg-gray-200">
      <div 
        class="canvas-wrapper bg-white shadow-2xl relative"
        :style="{
          width: canvasWidth + 'px',
          height: canvasHeight + 'px',
          backgroundColor: canvasBg
        }"
      >
        <!-- 设计元素渲染 -->
        <div 
          v-for="el in elements" 
          :key="el.id"
          class="design-element absolute cursor-move border-2 border-transparent hover:border-blue-500"
          :style="{
            left: el.x + 'px',
            top: el.y + 'px',
            width: el.width + 'px',
            height: el.height + 'px'
          }"
        >
          <div v-if="el.type === 'text'" class="w-full h-full flex items-center justify-center text-2xl font-bold">
            {{ el.content }}
          </div>
          <div v-else-if="el.type === 'image'" class="w-full h-full bg-gray-300 flex items-center justify-center">
            <span class="text-gray-500">图片区域</span>
          </div>
        </div>
        
        <!-- 空画布提示 -->
        <div v-if="elements.length === 0" class="absolute inset-0 flex items-center justify-center">
          <div class="text-center text-gray-400">
            <p class="text-lg">点击左侧菜单添加元素</p>
            <p class="text-sm mt-2">或选择模板快速开始</p>
          </div>
        </div>
      </div>
    </main>
    
    <!-- 右侧属性面板 -->
    <aside class="right-panel w-72 bg-white shadow-lg p-4">
      <h3 class="text-lg font-bold mb-4 text-gray-800">属性设置</h3>
      
      <!-- 画布设置 -->
      <div class="space-y-4">
        <div>
          <label class="block text-sm text-gray-600 mb-1">画布宽度</label>
          <input 
            v-model="canvasWidth" 
            type="number" 
            class="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div>
          <label class="block text-sm text-gray-600 mb-1">画布高度</label>
          <input 
            v-model="canvasHeight" 
            type="number" 
            class="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div>
          <label class="block text-sm text-gray-600 mb-1">背景颜色</label>
          <input 
            v-model="canvasBg" 
            type="color" 
            class="w-full h-10 rounded-lg cursor-pointer"
          />
        </div>
      </div>
      
      <!-- 当前菜单内容 -->
      <div class="mt-6 border-t pt-4">
        <h4 class="font-medium text-gray-700 mb-3">
          {{ menuList.find(m => m.id === activeMenu)?.name }}工具
        </h4>
        <div class="grid grid-cols-3 gap-2">
          <div 
            v-for="i in 6" 
            :key="i"
            class="aspect-square bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 hover:bg-purple-100 cursor-pointer transition-colors"
          >
            {{ i }}
          </div>
        </div>
      </div>
      
      <!-- 提示信息 -->
      <div class="mt-6 p-4 bg-blue-50 rounded-lg text-sm text-blue-600">
        <p class="font-medium mb-1">集成迅排设计开源项目</p>
        <p>完整功能请下载 poster-design.zip 并在您的服务器上部署，配合我们的 Java 后端 API。</p>
      </div>
    </aside>
  </div>
</template>

<style scoped>
.designer-page {
  font-family: 'Inter', sans-serif;
}

.canvas-wrapper {
  transition: all 0.3s ease;
}

.design-element {
  transition: border-color 0.2s ease;
}

.design-element:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>