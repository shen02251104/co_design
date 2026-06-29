<template>
  <Teleport to="body">
    <div v-if="visible" class="fixed inset-0 z-[2147483647] flex items-center justify-center">
      <!-- 背景遮罩 -->
      <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="handleClose"></div>
      
      <!-- 弹窗主体 -->
      <div class="relative bg-white rounded-2xl shadow-xl w-[560px] max-w-[90vw] overflow-hidden">
        <!-- 头部 -->
        <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 class="text-lg font-semibold text-gray-900">创建空白设计</h3>
          <button 
            class="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition"
            @click="handleClose"
          >
            <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <!-- 内容区 -->
        <div class="px-6 py-5">
          <!-- 预设尺寸分类 -->
          <div class="mb-6">
            <h4 class="text-sm font-medium text-gray-700 mb-3">常用尺寸</h4>
            <div class="grid grid-cols-3 gap-3">
              <button 
                v-for="preset in presetSizes" 
                :key="preset.id"
                class="p-3 rounded-xl border-2 transition-all hover:border-indigo-300 hover:bg-indigo-50/50"
                :class="selectedPreset === preset.id ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200'"
                @click="selectPreset(preset)"
              >
                <div class="flex items-center gap-2 mb-2">
                  <span class="text-xs font-medium text-gray-900">{{ preset.name }}</span>
                  <span v-if="preset.isPopular" class="px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-600 text-xs">热门</span>
                </div>
                <div class="text-xs text-gray-500">{{ preset.width }} × {{ preset.height }} px</div>
              </button>
            </div>
          </div>
          
          <!-- 自定义尺寸 -->
          <div class="mb-6">
            <h4 class="text-sm font-medium text-gray-700 mb-3">自定义尺寸</h4>
            <div class="flex items-center gap-4">
              <div class="flex-1">
                <label class="text-xs text-gray-500 mb-1 block">宽度 (px)</label>
                <input 
                  v-model="customWidth"
                  type="number"
                  min="50"
                  max="4000"
                  class="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-sm"
                  placeholder="800"
                />
              </div>
              <div class="flex items-center justify-center">
                <button 
                  class="w-8 h-8 rounded-lg border border-gray-200 hover:bg-gray-50 flex items-center justify-center transition"
                  @click="swapDimensions"
                >
                  <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </button>
              </div>
              <div class="flex-1">
                <label class="text-xs text-gray-500 mb-1 block">高度 (px)</label>
                <input 
                  v-model="customHeight"
                  type="number"
                  min="50"
                  max="4000"
                  class="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-sm"
                  placeholder="600"
                />
              </div>
            </div>
            <p class="text-xs text-gray-400 mt-2">支持范围：50 - 4000 px</p>
          </div>
          
          <!-- 设计名称 -->
          <div class="mb-6">
            <h4 class="text-sm font-medium text-gray-700 mb-3">设计名称</h4>
            <input 
              v-model="designName"
              type="text"
              class="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-sm"
              placeholder="我的设计"
            />
          </div>
          
          <!-- 预览画布比例 -->
          <div class="mb-4 p-3 bg-gray-50 rounded-lg">
            <div class="flex items-center justify-between text-xs text-gray-500 mb-2">
              <span>画布比例预览</span>
              <span>{{ finalWidth }} × {{ finalHeight }} px</span>
            </div>
            <div class="flex items-center justify-center h-32 bg-white rounded border border-gray-200">
              <div 
                class="bg-indigo-100 border-2 border-indigo-300 rounded"
                :style="canvasPreviewStyle"
              ></div>
            </div>
          </div>
        </div>
        
        <!-- 底部按钮 -->
        <div class="px-6 py-4 border-t border-gray-100 flex items-center justify-end gap-3">
          <button 
            class="px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition text-sm"
            @click="handleClose"
          >
            取消
          </button>
          <button 
            class="px-6 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="!isValidSize"
            @click="handleCreate"
          >
            开始创作
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

interface PresetSize {
  id: string
  name: string
  width: number
  height: number
  isPopular?: boolean
  category?: string
}

const props = defineProps<{
  visible: boolean
}>()

const emit = defineEmits<{
  close: []
  create: [config: { width: number; height: number; name: string }]
}>()

// 预设尺寸列表
const presetSizes: PresetSize[] = [
  { id: 'poster-1', name: '电商海报', width: 800, height: 1200, isPopular: true },
  { id: 'poster-2', name: '主图海报', width: 800, height: 800, isPopular: true },
  { id: 'poster-3', name: '详情页头图', width: 790, height: 400 },
  { id: 'social-1', name: '微信公众号', width: 900, height: 500, isPopular: true },
  { id: 'social-2', name: '小红书', width: 1080, height: 1440 },
  { id: 'social-3', name: '朋友圈', width: 1242, height: 1242 },
  { id: 'banner-1', name: '横版Banner', width: 1920, height: 500 },
  { id: 'banner-2', name: '店招横幅', width: 1920, height: 150 },
  { id: 'card-1', name: '名片', width: 350, height: 200 },
  { id: 'print-1', name: 'A4打印', width: 2480, height: 3508 },
  { id: 'print-2', name: 'A5打印', width: 1748, height: 2480 },
  { id: 'custom', name: '自定义', width: 0, height: 0 },
]

// 状态
const selectedPreset = ref<string>('poster-1')
const customWidth = ref<number>(800)
const customHeight = ref<number>(600)
const designName = ref<string>('我的设计')

// 监听预设选择，自动填充尺寸
watch(selectedPreset, (newVal) => {
  const preset = presetSizes.find(p => p.id === newVal)
  if (preset && preset.id !== 'custom') {
    customWidth.value = preset.width
    customHeight.value = preset.height
  }
})

// 选择预设
const selectPreset = (preset: PresetSize) => {
  selectedPreset.value = preset.id
  if (preset.id !== 'custom') {
    customWidth.value = preset.width
    customHeight.value = preset.height
  }
}

// 交换宽高
const swapDimensions = () => {
  const temp = customWidth.value
  customWidth.value = customHeight.value
  customHeight.value = temp
}

// 最终尺寸
const finalWidth = computed(() => {
  const w = Number(customWidth.value)
  return Math.max(50, Math.min(4000, w || 800))
})

const finalHeight = computed(() => {
  const h = Number(customHeight.value)
  return Math.max(50, Math.min(4000, h || 600))
})

// 是否有效尺寸
const isValidSize = computed(() => {
  return finalWidth.value >= 50 && finalWidth.value <= 4000 && 
         finalHeight.value >= 50 && finalHeight.value <= 4000
})

// 画布预览样式
const canvasPreviewStyle = computed(() => {
  const maxPreviewWidth = 200
  const maxPreviewHeight = 120
  
  const scale = Math.min(
    maxPreviewWidth / finalWidth.value,
    maxPreviewHeight / finalHeight.value
  )
  
  const previewWidth = Math.round(finalWidth.value * scale)
  const previewHeight = Math.round(finalHeight.value * scale)
  
  return {
    width: `${previewWidth}px`,
    height: `${previewHeight}px`,
  }
})

// 关闭弹窗
const handleClose = () => {
  emit('close')
}

// 创建空白设计
const handleCreate = () => {
  emit('create', {
    width: finalWidth.value,
    height: finalHeight.value,
    name: designName.value || '我的设计'
  })
}
</script>