<template>
  <div class="text-design-panel">
    <!-- 文字输入区 -->
    <div class="mb-4">
      <label class="text-sm text-gray-600 mb-2 block">输入文字</label>
      <textarea
        v-model="textContent"
        class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm resize-none focus:ring-2 ring-purple-400 focus:border-transparent"
        rows="3"
        placeholder="请输入要设计的文字..."
        @input="updatePreview"
      ></textarea>
    </div>

    <!-- 字体选择 -->
    <div class="mb-4">
      <label class="text-sm text-gray-600 mb-2 block">选择字体</label>
      <div class="relative">
        <button
          class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm flex items-center justify-between hover:bg-gray-50"
          @click="showFontPicker = !showFontPicker"
        >
          <span :style="{ fontFamily: selectedFont.value }">{{ selectedFont.name }}</span>
          <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        <!-- 字体下拉列表 -->
        <div v-if="showFontPicker" class="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
          <div v-for="category in fontCategories" :key="category.name" class="p-2">
            <div class="text-xs text-gray-400 mb-1 px-2">{{ category.name }}</div>
            <button
              v-for="font in category.fonts"
              :key="font.value"
              class="w-full px-2 py-1.5 text-sm rounded hover:bg-purple-50 text-left"
              :class="selectedFont.value === font.value ? 'bg-purple-50 text-purple-600' : ''"
              :style="{ fontFamily: font.value }"
              @click="selectFont(font)"
            >
              {{ font.name }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 字体大小 -->
    <div class="mb-4">
      <label class="text-sm text-gray-600 mb-2 block">字体大小</label>
      <div class="flex items-center gap-2">
        <input
          type="range"
          v-model="fontSize"
          min="12"
          max="120"
          class="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
          @input="updatePreview"
        />
        <input
          type="number"
          v-model="fontSize"
          class="w-16 px-2 py-1 border border-gray-200 rounded text-sm text-center"
          min="12"
          max="120"
          @input="updatePreview"
        />
      </div>
    </div>

    <!-- 文字样式预设 -->
    <div class="mb-4">
      <label class="text-sm text-gray-600 mb-2 block">样式预设</label>
      <div class="grid grid-cols-2 gap-2">
        <button
          v-for="preset in stylePresets"
          :key="preset.id"
          class="p-3 rounded-lg border transition hover:border-purple-400"
          :class="activePreset === preset.id ? 'border-purple-400 bg-purple-50' : 'border-gray-200'"
          @click="applyPreset(preset)"
        >
          <div
            class="text-center mb-1"
            :style="getPresetStyle(preset)"
          >
            {{ preset.name }}
          </div>
          <div class="text-xs text-gray-400">{{ preset.label }}</div>
        </button>
      </div>
    </div>

    <!-- 文字颜色 -->
    <div class="mb-4">
      <label class="text-sm text-gray-600 mb-2 block">文字颜色</label>
      <div class="flex gap-2">
        <button
          v-for="color in presetColors"
          :key="color"
          class="w-8 h-8 rounded-lg border-2 transition"
          :class="textColor === color ? 'border-purple-400' : 'border-gray-200'"
          :style="{ backgroundColor: color }"
          @click="textColor = color; updatePreview()"
        ></button>
        <input
          type="color"
          v-model="textColor"
          class="w-8 h-8 rounded-lg cursor-pointer"
          @input="updatePreview"
        />
      </div>
    </div>

    <!-- 文字特效 -->
    <div class="mb-4">
      <label class="text-sm text-gray-600 mb-2 block">文字特效</label>
      <div class="space-y-3">
        <!-- 描边 -->
        <div class="flex items-center justify-between">
          <span class="text-sm text-gray-600">描边</span>
          <div class="flex items-center gap-2">
            <input
              type="color"
              v-model="strokeColor"
              class="w-6 h-6 rounded cursor-pointer"
              @input="updatePreview"
            />
            <input
              type="number"
              v-model="strokeWidth"
              class="w-12 px-1 py-0.5 border border-gray-200 rounded text-xs text-center"
              min="0"
              max="10"
              @input="updatePreview"
            />
            <span class="text-xs text-gray-400">px</span>
          </div>
        </div>
        
        <!-- 阴影 -->
        <div class="flex items-center justify-between">
          <span class="text-sm text-gray-600">阴影</span>
          <div class="flex items-center gap-2">
            <input
              type="color"
              v-model="shadowColor"
              class="w-6 h-6 rounded cursor-pointer"
              @input="updatePreview"
            />
            <input
              type="number"
              v-model="shadowBlur"
              class="w-12 px-1 py-0.5 border border-gray-200 rounded text-xs text-center"
              min="0"
              max="30"
              @input="updatePreview"
            />
            <span class="text-xs text-gray-400">px</span>
          </div>
        </div>
        
        <!-- 渐变 -->
        <div class="flex items-center justify-between">
          <span class="text-sm text-gray-600">渐变</span>
          <button
            class="px-3 py-1 rounded text-xs transition"
            :class="enableGradient ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-600'"
            @click="enableGradient = !enableGradient; updatePreview"
          >
            {{ enableGradient ? '已开启' : '未开启' }}
          </button>
        </div>
        
        <div v-if="enableGradient" class="flex gap-2 mt-1">
          <input
            type="color"
            v-model="gradientStart"
            class="w-8 h-8 rounded cursor-pointer"
            @input="updatePreview"
          />
          <input
            type="color"
            v-model="gradientEnd"
            class="w-8 h-8 rounded cursor-pointer"
            @input="updatePreview"
          />
          <select
            v-model="gradientDirection"
            class="px-2 py-1 border border-gray-200 rounded text-xs"
            @change="updatePreview"
          >
            <option value="to right">水平</option>
            <option value="to bottom">垂直</option>
            <option value="to bottom right">对角</option>
          </select>
        </div>
      </div>
    </div>

    <!-- 文字排版 -->
    <div class="mb-4">
      <label class="text-sm text-gray-600 mb-2 block">文字排版</label>
      <div class="space-y-3">
        <!-- 字距 -->
        <div class="flex items-center justify-between">
          <span class="text-sm text-gray-600">字距</span>
          <div class="flex items-center gap-2">
            <input
              type="range"
              v-model="letterSpacing"
              min="-5"
              max="50"
              class="w-20 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
              @input="updatePreview"
            />
            <span class="text-xs text-gray-400 w-8">{{ letterSpacing }}px</span>
          </div>
        </div>
        
        <!-- 行距 -->
        <div class="flex items-center justify-between">
          <span class="text-sm text-gray-600">行距</span>
          <div class="flex items-center gap-2">
            <input
              type="range"
              v-model="lineHeight"
              min="1"
              max="3"
              step="0.1"
              class="w-20 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
              @input="updatePreview"
            />
            <span class="text-xs text-gray-400 w-8">{{ lineHeight }}</span>
          </div>
        </div>
        
        <!-- 对齐方式 -->
        <div class="flex items-center justify-between">
          <span class="text-sm text-gray-600">对齐</span>
          <div class="flex gap-1">
            <button
              v-for="align in alignOptions"
              :key="align.value"
              class="p-1.5 rounded transition"
              :class="textAlign === align.value ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-600'"
              @click="textAlign = align.value; updatePreview"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path :d="align.icon" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 添加到画布按钮 -->
    <button
      class="w-full py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg font-medium hover:opacity-90 transition"
      @click="addTextToCanvas"
    >
      添加到画布
    </button>

    <!-- 文字预览 -->
    <div class="mt-4 p-4 bg-gray-50 rounded-lg">
      <label class="text-xs text-gray-400 mb-2 block">效果预览</label>
      <div
        class="text-center overflow-hidden"
        :style="getPreviewStyle()"
      >
        {{ textContent || '预览文字' }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

const emit = defineEmits(['addText'])

// 文字内容
const textContent = ref('创意文字')
const fontSize = ref(48)
const textColor = ref('#333333')
const letterSpacing = ref(0)
const lineHeight = ref(1.5)
const textAlign = ref('center')

// 字体选择
const showFontPicker = ref(false)
const selectedFont = ref({ name: '默认字体', value: 'system-ui, sans-serif' })

const fontCategories = [
  {
    name: '系统字体',
    fonts: [
      { name: '默认', value: 'system-ui, sans-serif' },
      { name: '宋体', value: 'SimSun, serif' },
      { name: '黑体', value: 'SimHei, sans-serif' },
      { name: '楷体', value: 'KaiTi, serif' },
      { name: '微软雅黑', value: 'Microsoft YaHei, sans-serif' },
    ]
  },
  {
    name: '创意字体',
    fonts: [
      { name: '站酷快乐体', value: '"ZCOOL KuaiLe"' },
      { name: '站酷高端黑', value: '"ZCOOL QingKe HuangYou"' },
      { name: '站酷小薇LOGO体', value: '"ZCOOL XiaoWei"' },
      { name: '思源黑体', value: '"Source Han Sans CN"' },
      { name: '思源宋体', value: '"Source Han Serif CN"' },
    ]
  },
  {
    name: '英文字体',
    fonts: [
      { name: 'Arial', value: 'Arial, sans-serif' },
      { name: 'Times', value: 'Times New Roman, serif' },
      { name: 'Georgia', value: 'Georgia, serif' },
      { name: 'Impact', value: 'Impact, sans-serif' },
      { name: 'Courier', value: 'Courier New, monospace' },
    ]
  }
]

// 样式预设
const activePreset = ref('normal')
const stylePresets = [
  { id: 'normal', name: '普通', label: '标准样式', color: '#333', style: {} },
  { id: '3d', name: '3D立体', label: '立体效果', color: '#ff6b6b', style: { 
    textShadow: '2px 2px 0 #c44, 4px 4px 0 #a33, 6px 6px 0 #822'
  }},
  { id: 'neon', name: '霓虹灯', label: '发光效果', color: '#fff', style: { 
    textShadow: '0 0 10px #0ff, 0 0 20px #0ff, 0 0 40px #0ff',
    backgroundColor: '#111'
  }},
  { id: 'metallic', name: '金属质感', label: '金属光泽', color: '#linear-gradient(to bottom, #f9d423 0%, #ff4e50 100%)', style: {
    background: 'linear-gradient(to bottom, #f9d423 0%, #ff4e50 100%)',
    webkitBackgroundClip: 'text',
    webkitTextFillColor: 'transparent'
  }},
  { id: 'outline', name: '描边文字', label: '轮廓效果', color: '#fff', style: {
    webkitTextStroke: '2px #333'
  }},
  { id: 'retro', name: '复古风格', label: '怀旧效果', color: '#8b4513', style: {
    fontFamily: 'Georgia, serif',
    textShadow: '2px 2px 0 #deb887'
  }},
  { id: 'gradient', name: '渐变文字', label: '彩虹效果', color: '#linear-gradient(90deg, #f36, #f93, #fc3, #ff3, #c3f, #93f, #63f)', style: {
    background: 'linear-gradient(90deg, #f36, #f93, #fc3, #ff3, #c3f, #93f, #63f)',
    webkitBackgroundClip: 'text',
    webkitTextFillColor: 'transparent'
  }},
  { id: 'glow', name: '发光文字', label: '柔和发光', color: '#fff', style: {
    textShadow: '0 0 20px currentColor, 0 0 40px currentColor'
  }},
]

// 颜色预设
const presetColors = ['#333333', '#ffffff', '#ff6b6b', '#4ecdc4', '#ffe66d', '#95e1d3', '#f38181', '#aa96da', '#fcbad3']

// 文字特效
const strokeColor = ref('#333333')
const strokeWidth = ref(0)
const shadowColor = ref('#333333')
const shadowBlur = ref(0)
const enableGradient = ref(false)
const gradientStart = ref('#ff6b6b')
const gradientEnd = ref('#4ecdc4')
const gradientDirection = ref('to right')

// 对齐选项
const alignOptions = [
  { value: 'left', icon: 'M4 6h16M4 12h10M4 18h14' },
  { value: 'center', icon: 'M4 6h16M7 12h10M4 18h16' },
  { value: 'right', icon: 'M4 6h16M10 12h10M4 18h16' },
]

// 选择字体
const selectFont = (font: any) => {
  selectedFont.value = font
  showFontPicker.value = false
  updatePreview()
}

// 应用预设样式
const applyPreset = (preset: any) => {
  activePreset.value = preset.id
  // 重置特效
  strokeWidth.value = 0
  shadowBlur.value = 0
  enableGradient.value = false
  
  // 应用预设的颜色和样式
  if (preset.style.webkitTextStroke) {
    const strokeMatch = preset.style.webkitTextStroke.match(/(\d+)px\s+(#[a-f0-9]+)/i)
    if (strokeMatch) {
      strokeWidth.value = parseInt(strokeMatch[1])
      strokeColor.value = strokeMatch[2]
    }
  }
  if (preset.style.textShadow) {
    const shadowMatch = preset.style.textShadow.match(/(\d+)px\s+(\d+)px\s+(\d+)px\s+(#[a-f0-9]+)/i)
    if (shadowMatch) {
      shadowBlur.value = parseInt(shadowMatch[3])
      shadowColor.value = shadowMatch[4]
    }
  }
  
  updatePreview()
}

// 获取预设样式
const getPresetStyle = (preset: any) => {
  const baseStyle: any = {
    fontSize: '18px',
    fontFamily: selectedFont.value.value,
    padding: '4px',
    borderRadius: '4px',
  }
  
  // 合合预设样式
  Object.assign(baseStyle, preset.style)
  
  return baseStyle
}

// 获取预览样式
const getPreviewStyle = () => {
  const style: any = {
    fontSize: `${fontSize.value}px`,
    fontFamily: selectedFont.value.value,
    letterSpacing: `${letterSpacing.value}px`,
    lineHeight: lineHeight.value,
    textAlign: textAlign.value,
    color: textColor.value,
    padding: '10px',
    wordBreak: 'break-word',
  }
  
  // 描边效果
  if (strokeWidth.value > 0) {
    style.webkitTextStroke = `${strokeWidth.value}px ${strokeColor.value}`
  }
  
  // 阴影效果
  if (shadowBlur.value > 0) {
    style.textShadow = `2px 2px ${shadowBlur.value}px ${shadowColor.value}`
  }
  
  // 渐变效果
  if (enableGradient.value) {
    style.background = `linear-gradient(${gradientDirection.value}, ${gradientStart.value}, ${gradientEnd.value})`
    style.webkitBackgroundClip = 'text'
    style.webkitTextFillColor = 'transparent'
  }
  
  // 应用预设样式（如果有特殊效果）
  const preset = stylePresets.find(p => p.id === activePreset.value)
  if (preset && preset.id !== 'normal') {
    // 3D效果特殊处理
    if (preset.id === '3d') {
      style.textShadow = `${fontSize.value * 0.04}px ${fontSize.value * 0.04}px 0 #c44, ${fontSize.value * 0.08}px ${fontSize.value * 0.08}px 0 #a33, ${fontSize.value * 0.12}px ${fontSize.value * 0.12}px 0 #822`
    }
    // 霓虹灯效果
    if (preset.id === 'neon') {
      style.textShadow = `0 0 ${fontSize.value * 0.2}px #0ff, 0 0 ${fontSize.value * 0.4}px #0ff, 0 0 ${fontSize.value * 0.6}px #0ff`
      style.backgroundColor = '#111'
      style.color = '#fff'
    }
    // 发光文字
    if (preset.id === 'glow') {
      style.textShadow = `0 0 ${fontSize.value * 0.4}px ${textColor.value}, 0 0 ${fontSize.value * 0.8}px ${textColor.value}`
    }
  }
  
  return style
}

// 更新预览
const updatePreview = () => {
  // 触发响应式更新
}

// 添加文字到画布
const addTextToCanvas = () => {
  emit('addText', {
    content: textContent.value,
    style: getPreviewStyle(),
    fontSize: fontSize.value,
    fontFamily: selectedFont.value.value,
  })
}

// 点击外部关闭字体选择器
watch(showFontPicker, (val) => {
  if (val) {
    setTimeout(() => {
      document.addEventListener('click', closeFontPicker)
    }, 0)
  } else {
    document.removeEventListener('click', closeFontPicker)
  }
})

const closeFontPicker = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  if (!target.closest('.relative')) {
    showFontPicker.value = false
  }
}
</script>

<style scoped>
.text-design-panel {
  height: 100%;
  overflow-y: auto;
}

/* 自定义range滑块样式 */
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #9333ea;
  cursor: pointer;
}

input[type="range"]::-moz-range-thumb {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #9333ea;
  cursor: pointer;
  border: none;
}

/* 预览区域渐变文字效果支持 */
</style>