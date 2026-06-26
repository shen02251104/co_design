<template>
  <!-- 尺寸选择弹窗 -->
  <Teleport to="body">
    <div 
      v-if="visible"
      class="fixed inset-0 z-[2147483647] flex items-center justify-center"
    >
      <!-- 背景遮罩 -->
      <div 
        class="absolute inset-0 bg-black/60 backdrop-blur-sm"
        @click="handleClose"
      ></div>
      
      <!-- 对话框内容 -->
      <div class="relative w-[600px] max-w-[95vw] bg-white rounded-2xl shadow-2xl overflow-hidden">
        <!-- 顶部标题 -->
        <div class="px-6 py-4 border-b border-gray-100">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-bold text-gray-800">创建空白设计</h3>
            <button 
              class="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition"
              @click="handleClose"
            >
              <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        <!-- 主体内容 -->
        <div class="p-6">
          <!-- 预设尺寸 -->
          <div class="mb-6">
            <label class="block text-gray-700 font-medium mb-3">常用尺寸</label>
            <div class="grid grid-cols-3 gap-3">
              <button 
                v-for="preset in presetSizes"
                :key="preset.id"
                class="p-4 rounded-xl border-2 transition-all duration-200 group hover:border-purple-300 hover:bg-purple-50"
                :class="selectedSize === preset.id ? 'border-purple-400 bg-purple-50' : 'border-gray-100'"
                @click="applyPreset(preset)"
              >
                <div class="flex items-center gap-2 mb-2">
                  <span class="w-8 h-8 rounded-lg flex items-center justify-center" :class="preset.iconBg">
                    <component :is="preset.icon" class="w-4 h-4" :class="preset.iconColor" />
                  </span>
                  <span class="font-medium text-sm" :class="selectedSize === preset.id ? 'text-purple-600' : 'text-gray-700'">{{ preset.name }}</span>
                </div>
                <p class="text-xs text-gray-500">{{ preset.size }}</p>
              </button>
            </div>
          </div>
          
          <!-- 自定义尺寸 -->
          <div class="mb-6">
            <label class="block text-gray-700 font-medium mb-3">自定义尺寸</label>
            <div class="flex items-center gap-3">
              <div class="flex items-center gap-2">
                <input 
                  v-model.number="width"
                  type="number"
                  class="w-24 px-3 py-2 border border-gray-200 rounded-lg focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none transition text-center"
                  placeholder="宽度"
                  min="1"
                  max="9999"
                />
                <span class="text-gray-400">×</span>
                <input 
                  v-model.number="height"
                  type="number"
                  class="w-24 px-3 py-2 border border-gray-200 rounded-lg focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none transition text-center"
                  placeholder="高度"
                  min="1"
                  max="9999"
                />
                <span class="text-gray-400">px</span>
              </div>
              <button 
                class="px-4 py-2 rounded-lg border border-purple-200 text-purple-600 hover:bg-purple-50 transition"
                @click="applyCustom"
              >
                应用
              </button>
            </div>
            <p class="text-xs text-gray-400 mt-2">建议尺寸范围：100-5000px</p>
          </div>
          
          <!-- 设计名称 -->
          <div class="mb-6">
            <label class="block text-gray-700 font-medium mb-3">设计名称</label>
            <input 
              v-model="designName"
              type="text"
              class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none transition"
              placeholder="我的设计作品"
            />
          </div>
          
          <!-- 预览 -->
          <div class="mb-6">
            <label class="block text-gray-700 font-medium mb-3">画布预览</label>
            <div class="bg-gray-50 rounded-xl p-4 flex items-center justify-center min-h-[160px]">
              <div 
                class="bg-white border-2 border-gray-200 rounded-lg flex items-center justify-center text-gray-400"
                :style="previewStyle"
              >
                <span class="text-sm">{{ finalWidth }} × {{ finalHeight }}</span>
              </div>
            </div>
          </div>
          
          <!-- 操作按钮 -->
          <div class="flex items-center justify-end gap-3">
            <button 
              class="px-6 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition"
              @click="handleClose"
            >
              取消
            </button>
            <button 
              class="px-8 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium hover:from-purple-600 hover:to-blue-600 transition shadow-md"
              @click="createDesign"
            >
              创建设计
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, h, computed } from 'vue'

const props = defineProps<{
  visible: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'create', config: { width: number; height: number; name: string }): void
}>()

// 尺寸状态
const selectedSize = ref('poster-vertical')
const width = ref(800)
const height = ref(1200)
const designName = ref('我的设计作品')

// 预设尺寸
const presetSizes = [
  { 
    id: 'poster-vertical', 
    name: '竖版海报', 
    size: '800×1200px',
    width: 800,
    height: 1200,
    icon: () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24', class: 'w-4 h-4' }, [h('path', { d: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z' })]),
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-500',
  },
  { 
    id: 'poster-horizontal', 
    name: '横版海报', 
    size: '1200×800px',
    width: 1200,
    height: 800,
    icon: () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24', class: 'w-4 h-4' }, [h('path', { d: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z' })]),
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-500',
  },
  { 
    id: 'instagram', 
    name: 'Instagram', 
    size: '1080×1080px',
    width: 1080,
    height: 1080,
    icon: () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24', class: 'w-4 h-4' }, [h('path', { d: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 8c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-7-2c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm1.98 7.74c2.16 0 4.28-1.14 5.48-3.02l-1.46-.9c-.9 1.34-2.48 2.12-4.02 2.12s-3.12-.78-4.02-2.12l-1.46.9c1.2 1.88 3.32 3.02 5.48 3.02z' })]),
    iconBg: 'bg-pink-100',
    iconColor: 'text-pink-500',
  },
  { 
    id: 'wechat-cover', 
    name: '微信封面', 
    size: '900×500px',
    width: 900,
    height: 500,
    icon: () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24', class: 'w-4 h-4' }, [h('path', { d: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93z' })]),
    iconBg: 'bg-green-100',
    iconColor: 'text-green-500',
  },
  { 
    id: 'ecommerce', 
    name: '电商主图', 
    size: '800×800px',
    width: 800,
    height: 800,
    icon: () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24', class: 'w-4 h-4' }, [h('path', { d: 'M18 6h-2c0-2.21-1.79-4-4-4S8 3.79 8 6H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6-2c1.1 0 2 .9 2 2h-4c0-1.1.9-2 2-2zm6 16H6V8h2v2c0 .55.45 1 1 1s1-.45 1-1V8h4v2c0 .55.45 1 1 1s1-.45 1-1V8h2v12z' })]),
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-500',
  },
  { 
    id: 'detail-page', 
    name: '详情页', 
    size: '790×10000px',
    width: 790,
    height: 10000,
    icon: () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24', class: 'w-4 h-4' }, [h('path', { d: 'M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h2v-2H7v2zm0 4h2v-2H7v2zM7 7v2h2V7H7zm4 4h2v-2h-2v2zm0 4h2v-2h-2v2zm-2-8v2h2V7h-2zm4 0v2h2V7h-2zm0 12h2v-2h-2v2zm0-8h2v-2h-2v2z' })]),
    iconBg: 'bg-teal-100',
    iconColor: 'text-teal-500',
  },
]

// 最终尺寸
const finalWidth = computed(() => {
  const preset = presetSizes.find(p => p.id === selectedSize.value)
  if (preset) {
    return preset.width
  }
  return width.value || 800
})

const finalHeight = computed(() => {
  const preset = presetSizes.find(p => p.id === selectedSize.value)
  if (preset) {
    return preset.height
  }
  return height.value || 1200
})

// 预览样式
const previewStyle = computed(() => {
  const maxPreviewWidth = 200
  const maxPreviewHeight = 120
  
  const ratio = Math.min(maxPreviewWidth / finalWidth.value, maxPreviewHeight / finalHeight.value)
  const previewWidth = finalWidth.value * ratio
  const previewHeight = finalHeight.value * ratio
  
  return {
    width: `${previewWidth}px`,
    height: `${previewHeight}px`,
    minWidth: '60px',
    minHeight: '40px',
  }
})

// 应用预设尺寸
const applyPreset = (preset: any) => {
  selectedSize.value = preset.id
  width.value = preset.width
  height.value = preset.height
  designName.value = preset.name + '设计'
}

// 应用自定义尺寸
const applyCustom = () => {
  selectedSize.value = ''
}

// 创建设计
const createDesign = () => {
  emit('create', {
    width: finalWidth.value,
    height: finalHeight.value,
    name: designName.value,
  })
  handleClose()
}

// 关闭
const handleClose = () => {
  emit('close')
}
</script>

<script lang="ts">
export default {
  name: 'SizeSelector'
}
</script>