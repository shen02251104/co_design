<template>
  <!-- AI智能设计对话框 -->
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
      <div class="relative w-[900px] max-w-[95vw] bg-white rounded-2xl shadow-2xl overflow-hidden">
        <!-- 顶部标题 -->
        <div class="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 px-6 py-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
              </div>
              <div>
                <h3 class="text-white font-bold text-lg">AI智能设计</h3>
                <p class="text-white/70 text-sm">描述您的需求，AI将自动为您创建专业设计</p>
              </div>
            </div>
            <button 
              class="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
              @click="handleClose"
            >
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        <!-- 主体内容 -->
        <div class="p-6">
          <!-- 输入区域 -->
          <div class="mb-6">
            <label class="block text-gray-700 font-medium mb-2">设计描述</label>
            <div class="relative">
              <textarea 
                v-model="prompt"
                class="w-full h-32 px-4 py-3 border-2 border-gray-200 rounded-xl resize-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none transition text-gray-700"
                placeholder="例如：帮我设计一张夏季促销海报，主题是清凉饮品，颜色以蓝绿色为主，需要有产品展示区和促销文字..."
              ></textarea>
              <div class="absolute bottom-3 right-3 text-xs text-gray-400">
                {{ prompt.length }} / 500字
              </div>
            </div>
          </div>
          
          <!-- 快捷模板提示 -->
          <div class="mb-6">
            <label class="block text-gray-700 font-medium mb-2">或选择快捷模板</label>
            <div class="grid grid-cols-4 gap-3">
              <button 
                v-for="preset in presets"
                :key="preset.id"
                class="p-3 rounded-xl border-2 transition-all duration-200 text-left hover:border-purple-300 hover:bg-purple-50 group"
                :class="selectedPreset === preset.id ? 'border-purple-400 bg-purple-50' : 'border-gray-100'"
                @click="applyPreset(preset)"
              >
                <div class="flex items-center gap-2 mb-1">
                  <span class="w-6 h-6 rounded-lg flex items-center justify-center" :class="preset.iconBg">
                    <component :is="preset.icon" class="w-4 h-4" :class="preset.iconColor" />
                  </span>
                  <span class="font-medium text-sm" :class="selectedPreset === preset.id ? 'text-purple-600' : 'text-gray-700'">{{ preset.name }}</span>
                </div>
                <p class="text-xs text-gray-500">{{ preset.desc }}</p>
              </button>
            </div>
          </div>
          
          <!-- 设计风格选择 -->
          <div class="mb-6">
            <label class="block text-gray-700 font-medium mb-2">设计风格</label>
            <div class="flex items-center gap-2 flex-wrap">
              <button 
                v-for="style in styles"
                :key="style.id"
                class="px-4 py-2 rounded-lg border-2 transition-all duration-200"
                :class="selectedStyle === style.id ? 'border-purple-400 bg-purple-50 text-purple-600' : 'border-gray-100 text-gray-600 hover:border-purple-200'"
                @click="selectedStyle = style.id"
              >
                {{ style.name }}
              </button>
            </div>
          </div>
          
          <!-- 预览区域 -->
          <div v-if="isGenerating" class="mb-6">
            <label class="block text-gray-700 font-medium mb-2">AI正在创作...</label>
            <div class="bg-gray-50 rounded-xl p-8 flex items-center justify-center min-h-[300px]">
              <div class="text-center">
                <div class="w-16 h-16 mx-auto mb-4 relative">
                  <div class="absolute inset-0 rounded-full border-4 border-purple-200"></div>
                  <div class="absolute inset-0 rounded-full border-4 border-purple-500 border-t-transparent animate-spin"></div>
                </div>
                <p class="text-gray-500 mb-2">正在分析您的需求...</p>
                <p class="text-gray-400 text-sm">{{ generatingStep }}</p>
              </div>
            </div>
          </div>
          
          <div v-else-if="generatedDesign" class="mb-6">
            <label class="block text-gray-700 font-medium mb-2">生成结果</label>
            <div class="bg-gray-50 rounded-xl overflow-hidden">
              <!-- 预览画布 -->
              <div class="relative min-h-[300px] flex items-center justify-center p-4" :class="generatedDesign.bgClass">
                <div class="bg-white rounded-xl shadow-lg p-6 max-w-md">
                  <div class="text-center">
                    <div v-if="generatedDesign.icon" class="w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center" :class="generatedDesign.iconBg">
                      <component :is="generatedDesign.icon" class="w-8 h-8" :class="generatedDesign.iconColor" />
                    </div>
                    <h4 class="text-2xl font-bold mb-2" :class="generatedDesign.titleColor">{{ generatedDesign.title }}</h4>
                    <p class="text-gray-600 mb-4">{{ generatedDesign.subtitle }}</p>
                    <div class="flex items-center justify-center gap-2">
                      <span class="px-4 py-2 rounded-lg font-bold" :class="generatedDesign.btnClass">{{ generatedDesign.btnText }}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- 操作按钮 -->
              <div class="flex items-center justify-between p-4 border-t border-gray-100">
                <div class="flex items-center gap-2">
                  <button 
                    class="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition flex items-center gap-2"
                    @click="regenerate"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    重新生成
                  </button>
                  <button 
                    class="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition"
                    @click="editPrompt"
                  >
                    编辑描述
                  </button>
                </div>
                <button 
                  class="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium hover:from-purple-600 hover:to-blue-600 transition shadow-md"
                  @click="useDesign"
                >
                  使用此设计
                </button>
              </div>
            </div>
          </div>
          
          <!-- 底部操作 -->
          <div v-if="!isGenerating && !generatedDesign" class="flex items-center justify-between">
            <p class="text-gray-400 text-sm">
              <svg class="w-4 h-4 inline mr-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
              </svg>
              AI生成结果仅供参考，您可以继续编辑调整
            </p>
            <button 
              class="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium hover:from-purple-600 hover:to-blue-600 transition shadow-lg flex items-center gap-2"
              :disabled="!prompt.trim()"
              @click="startGenerate"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              开始生成
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, h, computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps<{
  visible: boolean
  initialPrompt?: string
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'useDesign', design: any): void
}>()

const router = useRouter()

// 输入状态
const prompt = ref(props.initialPrompt || '')
const selectedPreset = ref('')
const selectedStyle = ref('modern')

// 生成状态
const isGenerating = ref(false)
const generatingStep = ref('')
const generatedDesign = ref<any>(null)

// 预设模板
const presets = [
  { 
    id: 'promo', 
    name: '促销海报', 
    desc: '限时促销活动',
    icon: () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24', class: 'w-4 h-4' }, [h('path', { d: 'M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z' })]),
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-500',
    template: '帮我设计一张促销海报，主题是{主题}，需要突出价格优惠，颜色以暖色系为主'
  },
  { 
    id: 'product', 
    name: '商品主图', 
    desc: '电商产品展示',
    icon: () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24', class: 'w-4 h-4' }, [h('path', { d: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93z' })]),
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-500',
    template: '帮我设计一张商品主图，产品是{产品名称}，背景简洁干净，突出产品特点'
  },
  { 
    id: 'detail', 
    name: '详情页', 
    desc: '产品详情介绍',
    icon: () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24', class: 'w-4 h-4' }, [h('path', { d: 'M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h2v-2H7v2zm0 4h2v-2H7v2zM7 7v2h2V7H7zm4 4h2v-2h-2v2zm0 4h2v-2h-2v2zm-2-8v2h2V7h-2zm4 0v2h2V7h-2zm0 12h2v-2h-2v2zm0-8h2v-2h-2v2z' })]),
    iconBg: 'bg-green-100',
    iconColor: 'text-green-500',
    template: '帮我设计一张商品详情页，展示{产品名称}的功能特点和使用场景'
  },
  { 
    id: 'social', 
    name: '社交分享', 
    desc: '朋友圈/小红书',
    icon: () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24', class: 'w-4 h-4' }, [h('path', { d: 'M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z' })]),
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-500',
    template: '帮我设计一张社交分享图，内容是{内容主题}，风格时尚简约'
  },
]

// 设计风格
const styles = [
  { id: 'modern', name: '现代简约' },
  { id: 'colorful', name: '色彩缤纷' },
  { id: 'minimal', name: '极简风格' },
  { id: 'business', name: '商务专业' },
  { id: 'creative', name: '创意活泼' },
  { id: 'luxury', name: '高端质感' },
]

// 应用预设模板
const applyPreset = (preset: any) => {
  selectedPreset.value = preset.id
  if (!prompt.value.trim()) {
    prompt.value = preset.template.replace('{主题}', '您的主题').replace('{产品名称}', '您的产品').replace('{内容主题}', '您的主题')
  }
}

// 开始生成
const startGenerate = async () => {
  if (!prompt.value.trim()) return
  
  isGenerating.value = true
  generatedDesign.value = null
  
  // 模拟AI生成过程
  const steps = [
    '正在分析设计需求...',
    '正在确定设计风格...',
    '正在布局元素位置...',
    '正在生成设计预览...',
    '正在优化细节效果...',
  ]
  
  for (let i = 0; i < steps.length; i++) {
    generatingStep.value = steps[i]
    await new Promise(resolve => setTimeout(resolve, 800))
  }
  
  // 根据用户输入生成设计
  const styleColors: Record<string, any> = {
    modern: { bg: 'bg-gradient-to-br from-gray-100 to-gray-50', title: 'text-gray-800', btn: 'bg-gray-800 text-white' },
    colorful: { bg: 'bg-gradient-to-br from-orange-200 via-pink-200 to-purple-200', title: 'text-purple-800', btn: 'bg-gradient-to-r from-orange-500 to-pink-500 text-white' },
    minimal: { bg: 'bg-white', title: 'text-gray-900', btn: 'bg-black text-white' },
    business: { bg: 'bg-gradient-to-br from-blue-100 to-indigo-100', title: 'text-blue-800', btn: 'bg-blue-600 text-white' },
    creative: { bg: 'bg-gradient-to-br from-yellow-200 via-green-200 to-cyan-200', title: 'text-green-800', btn: 'bg-gradient-to-r from-yellow-500 to-green-500 text-white' },
    luxury: { bg: 'bg-gradient-to-br from-amber-100 to-yellow-50', title: 'text-amber-900', btn: 'bg-gradient-to-r from-amber-600 to-yellow-500 text-white' },
  }
  
  const colorConfig = styleColors[selectedStyle.value] || styleColors.modern
  
  // 提取关键词作为标题
  const words = prompt.value.split(/[，。,\.\s]+/).filter(w => w.length > 2)
  const title = words[0] || '精彩设计'
  
  generatedDesign.value = {
    title: title.slice(0, 10),
    subtitle: '专业设计 · 一键生成',
    btnText: '立即行动',
    bgClass: colorConfig.bg,
    titleColor: colorConfig.title,
    btnClass: colorConfig.btn,
    prompt: prompt.value,
    style: selectedStyle.value,
  }
  
  isGenerating.value = false
}

// 重新生成
const regenerate = () => {
  generatedDesign.value = null
  startGenerate()
}

// 编辑描述
const editPrompt = () => {
  generatedDesign.value = null
}

// 使用设计
const useDesign = () => {
  emit('useDesign', generatedDesign.value)
  handleClose()
}

// 关闭对话框
const handleClose = () => {
  emit('close')
}

// 监听初始提示词变化
watch(() => props.initialPrompt, (newVal) => {
  if (newVal) {
    prompt.value = newVal
  }
})
</script>

<script lang="ts">
import { watch } from 'vue'
export default {
  name: 'AIDesignDialog'
}
</script>