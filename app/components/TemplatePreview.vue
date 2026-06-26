<template>
  <!-- 模板预览弹窗 -->
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
      <div class="relative w-[800px] max-w-[95vw] bg-white rounded-2xl shadow-2xl overflow-hidden">
        <!-- 顶部区域 -->
        <div class="relative">
          <!-- 模板预览图 -->
          <div class="aspect-[4/3] bg-gradient-to-br relative overflow-hidden" :class="template?.bgColor || 'from-purple-400 to-blue-400'">
            <!-- 模板内容预览 -->
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="bg-white/90 rounded-xl p-8 shadow-lg">
                <div class="text-center">
                  <h3 class="text-2xl font-bold text-gray-800 mb-2">{{ template?.name || '模板预览' }}</h3>
                  <p class="text-gray-500">{{ template?.size || '800×1200' }}</p>
                </div>
              </div>
            </div>
            
            <!-- VIP标识 -->
            <div v-if="template?.isVip" class="absolute top-4 right-4">
              <div class="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-lg text-sm font-medium flex items-center gap-1 shadow-md">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
                </svg>
                VIP
              </div>
            </div>
            
            <!-- 关闭按钮 -->
            <button 
              class="absolute top-4 left-4 w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 flex items-center justify-center transition"
              @click="handleClose"
            >
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        <!-- 信息区域 -->
        <div class="p-6">
          <!-- 模板信息 -->
          <div class="flex items-center justify-between mb-6">
            <div>
              <h3 class="text-xl font-bold text-gray-800 mb-1">{{ template?.name || '模板名称' }}</h3>
              <p class="text-gray-500 text-sm">尺寸：{{ template?.size || '800×1200' }} | 使用人数：{{ formatCount(template?.useCount || 0) }}</p>
            </div>
            <div v-if="template?.isVip" class="flex items-center gap-2">
              <span class="text-gray-400 text-sm">VIP会员免费使用</span>
              <button 
                class="px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-medium hover:from-amber-600 hover:to-orange-600 transition"
                @click="openVip"
              >
                开通会员
              </button>
            </div>
          </div>
          
          <!-- 尺寸调整 -->
          <div class="mb-6">
            <label class="block text-gray-700 font-medium mb-3">选择尺寸</label>
            <div class="grid grid-cols-4 gap-3">
              <button 
                v-for="size in sizeOptions"
                :key="size.id"
                class="p-3 rounded-xl border-2 transition-all duration-200 text-center hover:border-purple-300 hover:bg-purple-50 group"
                :class="selectedSize === size.id ? 'border-purple-400 bg-purple-50' : 'border-gray-100'"
                @click="selectedSize = size.id"
              >
                <div class="font-medium text-sm" :class="selectedSize === size.id ? 'text-purple-600' : 'text-gray-700'">{{ size.name }}</div>
                <div class="text-xs text-gray-500 mt-1">{{ size.size }}</div>
              </button>
            </div>
          </div>
          
          <!-- 使用场景 -->
          <div class="mb-6">
            <label class="block text-gray-700 font-medium mb-3">推荐场景</label>
            <div class="flex items-center gap-2 flex-wrap">
              <span 
                v-for="scene in scenes"
                :key="scene"
                class="px-3 py-1 rounded-lg bg-gray-100 text-gray-600 text-sm"
              >
                {{ scene }}
              </span>
            </div>
          </div>
          
          <!-- 操作按钮 -->
          <div class="flex items-center justify-between">
            <button 
              class="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition flex items-center gap-2"
              @click="previewMore"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              查看更多模板
            </button>
            <button 
              class="px-8 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium hover:from-purple-600 hover:to-blue-600 transition shadow-lg flex items-center gap-2"
              @click="useTemplate"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              使用此模板
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  visible: boolean
  template?: {
    id: number
    name: string
    size: string
    useCount: number
    bgColor?: string
    isVip?: boolean
    previewText?: string
  }
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'use', template: any, size: string): void
  (e: 'openVip'): void
}>()

// 尺寸选项
const sizeOptions = [
  { id: 'original', name: '原始尺寸', size: props.template?.size || '800×1200' },
  { id: 'instagram', name: 'Instagram', size: '1080×1080' },
  { id: 'wechat', name: '微信封面', size: '900×500' },
  { id: 'poster', name: '宣传海报', size: '1200×1600' },
]

// 推荐场景
const scenes = ['电商促销', '新品发布', '节日营销', '品牌宣传', '活动推广']

// 选中尺寸
const selectedSize = ref('original')

// 格式化使用人数
const formatCount = (count: number): string => {
  if (count >= 10000) {
    return (count / 10000).toFixed(1) + '万'
  }
  return count.toString()
}

// 使用模板
const useTemplate = () => {
  const size = sizeOptions.find(s => s.id === selectedSize.value)
  emit('use', props.template, size?.size || props.template?.size)
  handleClose()
}

// 查看更多
const previewMore = () => {
  handleClose()
}

// 开通VIP
const openVip = () => {
  emit('openVip')
}

// 关闭
const handleClose = () => {
  emit('close')
}
</script>

<script lang="ts">
export default {
  name: 'TemplatePreview'
}
</script>