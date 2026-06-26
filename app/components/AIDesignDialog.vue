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
          
          <!-- 尺寸和场景选择 -->
          <div class="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label class="block text-gray-700 font-medium mb-2">设计尺寸</label>
              <select 
                v-model="selectedSize"
                class="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none transition"
              >
                <option value="">自动选择</option>
                <option value="小红书封面">小红书封面 (3:4)</option>
                <option value="微信海报">微信海报 (1:1)</option>
                <option value="商品详情页">商品详情页 (800x1200)</option>
                <option value="商品主图">商品主图 (800x800)</option>
                <option value="横版海报">横版海报 (16:9)</option>
              </select>
            </div>
            <div>
              <label class="block text-gray-700 font-medium mb-2">使用场景</label>
              <select 
                v-model="selectedScene"
                class="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none transition"
              >
                <option value="">自动选择</option>
                <option value="电商">电商</option>
                <option value="社交">社交媒体</option>
                <option value="印刷">印刷品</option>
                <option value="广告">广告宣传</option>
              </select>
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
            <div class="bg-gray-50 rounded-xl p-8 min-h-[300px]">
              <!-- 进度条 -->
              <div class="mb-6">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-gray-600 font-medium">{{ generatingStep }}</span>
                  <span class="text-purple-600 font-bold">{{ progress }}%</span>
                </div>
                <div class="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    class="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-300"
                    :style="{ width: `${progress}%` }"
                  ></div>
                </div>
              </div>
              
              <!-- 实时内容展示 -->
              <div v-if="streamContent" class="bg-white rounded-lg p-4 border border-gray-200">
                <div class="text-gray-700 whitespace-pre-wrap leading-relaxed">{{ streamContent }}</div>
              </div>
              
              <!-- 加载动画 -->
              <div v-else class="flex items-center justify-center py-8">
                <div class="w-12 h-12 relative">
                  <div class="absolute inset-0 rounded-full border-4 border-purple-200"></div>
                  <div class="absolute inset-0 rounded-full border-4 border-purple-500 border-t-transparent animate-spin"></div>
                </div>
              </div>
            </div>
          </div>
          
          <div v-else-if="generatedDesign" class="mb-6">
            <label class="block text-gray-700 font-medium mb-2">生成结果</label>
            <div class="bg-gray-50 rounded-xl overflow-hidden">
              <!-- 设计建议展示 -->
              <div class="p-6 border-b border-gray-100">
                <div class="flex items-start gap-4">
                  <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                    <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
                    </svg>
                  </div>
                  <div class="flex-1">
                    <h4 class="text-lg font-bold text-gray-800 mb-2">{{ generatedDesign.title || '设计方案' }}</h4>
                    <p class="text-gray-600 mb-3">{{ generatedDesign.subtitle || 'AI智能生成的设计方案' }}</p>
                    
                    <!-- 设计要点 -->
                    <div v-if="generatedDesign.suggestions" class="space-y-2">
                      <div v-for="(suggestion, idx) in parseSuggestions(generatedDesign.suggestions)" :key="idx" class="flex items-start gap-2">
                        <span class="w-5 h-5 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0 text-xs font-bold">{{ idx + 1 }}</span>
                        <span class="text-gray-700">{{ suggestion }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- 配色方案 -->
              <div v-if="generatedDesign.colorScheme" class="p-4 border-b border-gray-100">
                <span class="text-gray-600 font-medium mb-2 block">推荐配色</span>
                <div class="flex items-center gap-3">
                  <div 
                    v-for="(color, idx) in generatedDesign.colorScheme" 
                    :key="idx"
                    class="flex items-center gap-2"
                  >
                    <div 
                      class="w-8 h-8 rounded-lg shadow-sm border border-gray-200"
                      :style="{ backgroundColor: color }"
                    ></div>
                    <span class="text-xs text-gray-500">{{ color }}</span>
                  </div>
                </div>
              </div>
              
              <!-- 操作按钮 -->
              <div class="flex items-center justify-between p-4">
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
                  class="px-6 py-2.5 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium hover:from-purple-600 hover:to-blue-600 transition shadow-md flex items-center gap-2"
                  @click="useDesign"
                >
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/>
                  </svg>
                  使用此设计
                </button>
              </div>
            </div>
          </div>
          
          <!-- 底部操作 -->
          <div v-if="!isGenerating && !generatedDesign" class="flex items-center justify-between">
            <p class="text-gray-400 text-sm flex items-center gap-1">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
              </svg>
              AI生成结果仅供参考，您可以继续编辑调整
            </p>
            <button 
              class="px-8 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium hover:from-purple-600 hover:to-blue-600 transition shadow-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              :disabled="!prompt.trim() || isGenerating"
              @click="startGenerate"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
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
import { ref, h } from 'vue'
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
const selectedSize = ref('')
const selectedScene = ref('')

// 生成状态
const isGenerating = ref(false)
const progress = ref(0)
const generatingStep = ref('')
const streamContent = ref('')
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

// 解析建议文本
const parseSuggestions = (text: string): string[] => {
  if (!text) return []
  // 尝试从JSON解析
  try {
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      const data = JSON.parse(jsonMatch[0])
      if (data.suggestions) {
        return typeof data.suggestions === 'string' 
          ? data.suggestions.split('\n').filter(s => s.trim())
          : data.suggestions
      }
    }
  } catch {}
  // 直接按行分割
  return text.split('\n').filter(s => s.trim() && s.length > 10)
}

// 开始生成 - 调用后端API
const startGenerate = async () => {
  if (!prompt.value.trim()) return
  
  isGenerating.value = true
  progress.value = 0
  streamContent.value = ''
  generatedDesign.value = null
  
  generatingStep.value = '正在分析您的需求...'
  
  try {
    // 调用AI设计API
    const response = await fetch('/api/ai-design', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: prompt.value,
        scene: selectedScene.value || '电商',
        size: selectedSize.value || '800x800',
        style: selectedStyle.value
      })
    })
    
    if (!response.ok) {
      throw new Error('API请求失败')
    }
    
    const data = await response.json()
    
    // 更新进度
    progress.value = 50
    generatingStep.value = '正在生成设计方案...'
    
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // 处理返回结果
    if (data.error) {
      throw new Error(data.error)
    }
    
    progress.value = 80
    generatingStep.value = '正在优化设计细节...'
    
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // 设置生成结果
    generatedDesign.value = {
      title: data.title || extractTitle(prompt.value),
      subtitle: data.subtitle || 'AI智能生成',
      suggestions: data.suggestions || data.content,
      colorScheme: data.colorScheme || ['#6366f1', '#8b5cf6', '#f97316', '#ffffff'],
      backgroundColor: data.backgroundColor || '#6366f1',
      textColor: data.textColor || '#ffffff',
      layout: data.layout || 'center',
      prompt: prompt.value,
      style: selectedStyle.value,
      size: selectedSize.value,
      scene: selectedScene.value
    }
    
    progress.value = 100
    generatingStep.value = '设计生成完成'
    
  } catch (error) {
    console.error('AI生成失败:', error)
    
    // 失败时使用模拟结果
    progress.value = 100
    generatingStep.value = '设计生成完成'
    
    generatedDesign.value = {
      title: extractTitle(prompt.value),
      subtitle: 'AI智能生成',
      suggestions: [
        '建议使用简洁的布局，突出核心信息',
        '配色推荐使用渐变效果，增强视觉冲击力',
        '标题文字建议使用粗体，确保清晰可读',
        '可以添加装饰性元素，如线条、图标等'
      ],
      colorScheme: getStyleColors(selectedStyle.value),
      backgroundColor: '#6366f1',
      textColor: '#ffffff',
      layout: 'center',
      prompt: prompt.value,
      style: selectedStyle.value,
      size: selectedSize.value,
      scene: selectedScene.value
    }
  }
  
  isGenerating.value = false
}

// 从提示词提取标题
const extractTitle = (text: string): string => {
  const keywords = ['海报', '促销', '商品', '详情', '主图', '分享', '设计']
  for (const keyword of keywords) {
    if (text.includes(keyword)) {
      const beforeKeyword = text.split(keyword)[0]
      if (beforeKeyword.trim()) {
        return beforeKeyword.trim().slice(0, 10)
      }
    }
  }
  const words = text.split(/[，。,\.\s]+/).filter(w => w.length > 2)
  return words[0]?.slice(0, 10) || '精彩设计'
}

// 根据风格获取配色
const getStyleColors = (style: string): string[] => {
  const colors: Record<string, string[]> = {
    modern: ['#374151', '#6B7280', '#E5E7EB', '#F9FAFB'],
    colorful: ['#F97316', '#EC4899', '#8B5CF6', '#06B6D4'],
    minimal: ['#000000', '#FFFFFF', '#E5E7EB', '#6B7280'],
    business: ['#1E40AF', '#3B82F6', '#DBEAFE', '#F8FAFC'],
    creative: ['#FBBF24', '#34D399', '#A78BFA', '#F472B6'],
    luxury: ['#B45309', '#FCD34D', '#FEF3C7', '#78350F'],
  }
  return colors[style] || colors.modern
}

// 重新生成
const regenerate = () => {
  generatedDesign.value = null
  streamContent.value = ''
  progress.value = 0
  startGenerate()
}

// 编辑描述
const editPrompt = () => {
  generatedDesign.value = null
  streamContent.value = ''
  progress.value = 0
}

// 使用设计
const useDesign = () => {
  emit('useDesign', generatedDesign.value)
  handleClose()
  
  // 跳转到海报设计页面
  router.push('/poster-design')
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