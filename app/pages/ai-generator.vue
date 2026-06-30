<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-6 py-8">
      <!-- 页面标题 -->
      <div class="mb-8">
        <h1 class="text-2xl font-semibold text-gray-900">AI智能设计</h1>
        <p class="text-gray-500 mt-2">一键生成专业设计，AI助力效率提升</p>
      </div>

      <!-- 功能入口卡片 -->
      <div class="grid grid-cols-3 gap-6 mb-8">
        <!-- AI一键生成 -->
        <div class="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition cursor-pointer" @click="activeFeature = 'generate'">
          <div class="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
            <svg class="w-7 h-7 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">AI一键生成</h3>
          <p class="text-sm text-gray-500">输入文案，AI自动生成主图、详情页、海报等多种设计</p>
          <div class="mt-4 text-xs text-indigo-600 font-medium">热门功能 →</div>
        </div>

        <!-- 智能抠图 -->
        <div class="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition cursor-pointer" @click="activeFeature = 'cutout'">
          <div class="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-4">
            <svg class="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">智能抠图</h3>
          <p class="text-sm text-gray-500">一键去除背景，精准识别商品、人物等复杂边缘</p>
          <div class="mt-4 text-xs text-green-600 font-medium">效率神器 →</div>
        </div>

        <!-- AI文案生成 -->
        <div class="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition cursor-pointer" @click="activeFeature = 'copywriting'">
          <div class="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
            <svg class="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">AI文案生成</h3>
          <p class="text-sm text-gray-500">智能生成促销文案、商品描述、标题优化建议</p>
          <div class="mt-4 text-xs text-blue-600 font-medium">爆款文案 →</div>
        </div>
      </div>

      <!-- AI一键生成面板 -->
      <div v-if="activeFeature === 'generate'" class="bg-white rounded-xl shadow-sm p-6">
        <h2 class="text-xl font-semibold text-gray-900 mb-6">AI一键生成设计</h2>
        
        <div class="grid grid-cols-2 gap-8">
          <!-- 输入区域 -->
          <div>
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">设计类型</label>
              <select v-model="generateForm.type" class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option value="main_image">商品主图（800x800）</option>
                <option value="detail_page">详情页模块（750x高度不限）</option>
                <option value="poster">促销海报（多种尺寸）</option>
                <option value="social">社交媒体图（1080x1080）</option>
                <option value="banner">店铺Banner（1920x500）</option>
              </select>
            </div>

            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">商品名称/主题</label>
              <input v-model="generateForm.productName" type="text" class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="例如：夏季新款连衣裙" />
            </div>

            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">核心卖点（可选）</label>
              <textarea v-model="generateForm.sellingPoints" rows="3" class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="例如：透气舒适、显瘦修身、冰丝面料"></textarea>
            </div>

            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">设计风格</label>
              <div class="grid grid-cols-4 gap-2">
                <button v-for="style in designStyles" :key="style.id" 
                  @click="generateForm.style = style.id"
                  :class="['px-3 py-2 rounded-lg text-sm border transition', generateForm.style === style.id ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700 border-gray-200 hover:border-indigo-300']">
                  {{ style.name }}
                </button>
              </div>
            </div>

            <button @click="handleGenerate" :disabled="isGenerating" class="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed">
              {{ isGenerating ? 'AI正在生成...' : '开始生成' }}
            </button>
          </div>

          <!-- 预览区域 -->
          <div>
            <div class="border border-gray-200 rounded-lg p-4 min-h-[400px] flex items-center justify-center bg-gray-50">
              <div v-if="!generatedDesign" class="text-center text-gray-400">
                <svg class="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p>AI将为您生成设计预览</p>
              </div>
              <div v-else class="w-full">
                <img :src="generatedDesign.previewUrl" class="max-w-full mx-auto rounded-lg shadow-sm" />
              </div>
            </div>

            <div v-if="generatedDesign" class="mt-4 flex gap-3">
              <button @click="handleEdit" class="flex-1 py-2 bg-white text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition">
                进入编辑
              </button>
              <button @click="handleRegenerate" class="flex-1 py-2 bg-white text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                重新生成
              </button>
              <button @click="handleDownload" class="flex-1 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                下载图片
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 智能抠图面板 -->
      <div v-if="activeFeature === 'cutout'" class="bg-white rounded-xl shadow-sm p-6">
        <h2 class="text-xl font-semibold text-gray-900 mb-6">智能抠图</h2>
        
        <div class="grid grid-cols-2 gap-8">
          <!-- 上传区域 -->
          <div>
            <div class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-indigo-400 transition cursor-pointer" @click="triggerUpload">
              <input type="file" ref="fileInput" @change="handleFileUpload" accept="image/*" class="hidden" />
              <svg class="w-12 h-12 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p class="text-gray-600 mb-2">点击或拖拽上传图片</p>
              <p class="text-sm text-gray-400">支持 JPG、PNG，最大 10MB</p>
            </div>

            <div v-if="uploadedImage" class="mt-4">
              <img :src="uploadedImage.url" class="w-full rounded-lg" />
              <div class="mt-3 flex gap-2">
                <select v-model="cutoutType" class="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option value="auto">自动识别</option>
                  <option value="product">商品抠图</option>
                  <option value="person">人物抠图</option>
                  <option value="logo">Logo抠图</option>
                </select>
                <button @click="handleCutout" :disabled="isCutouting" class="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:opacity-50">
                  {{ isCutouting ? '处理中...' : '开始抠图' }}
                </button>
              </div>
            </div>
          </div>

          <!-- 结果预览 -->
          <div>
            <div class="border border-gray-200 rounded-lg p-4 min-h-[400px] flex items-center justify-center bg-gray-50">
              <div v-if="!cutoutResult" class="text-center text-gray-400">
                <svg class="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
                </svg>
                <p>抠图结果将在此显示</p>
              </div>
              <div v-else class="w-full">
                <img :src="cutoutResult.url" class="max-w-full mx-auto" style="background: repeating-conic-gradient(#ccc 0% 25%, #fff 0% 50%) 50% / 20px 20px" />
              </div>
            </div>

            <div v-if="cutoutResult" class="mt-4 flex gap-3">
              <button @click="handleEditCutout" class="flex-1 py-2 bg-white text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition">
                细化调整
              </button>
              <button @click="handleReplaceBg" class="flex-1 py-2 bg-white text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                更换背景
              </button>
              <button @click="handleDownloadCutout" class="flex-1 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                下载PNG
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- AI文案生成面板 -->
      <div v-if="activeFeature === 'copywriting'" class="bg-white rounded-xl shadow-sm p-6">
        <h2 class="text-xl font-semibold text-gray-900 mb-6">AI文案生成</h2>
        
        <div class="grid grid-cols-2 gap-8">
          <!-- 输入区域 -->
          <div>
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">文案类型</label>
              <select v-model="copywritingForm.type" class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option value="title">商品标题优化</option>
                <option value="promo">促销活动文案</option>
                <option value="detail">详情页描述</option>
                <option value="social">社交媒体文案</option>
                <option value="ad">广告投放文案</option>
              </select>
            </div>

            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">商品/活动信息</label>
              <textarea v-model="copywritingForm.productInfo" rows="4" class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="请输入商品特点、活动详情等基本信息"></textarea>
            </div>

            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">文案风格</label>
              <div class="grid grid-cols-3 gap-2">
                <button v-for="tone in copywritingTones" :key="tone.id" 
                  @click="copywritingForm.tone = tone.id"
                  :class="['px-3 py-2 rounded-lg text-sm border transition', copywritingForm.tone === tone.id ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700 border-gray-200 hover:border-indigo-300']">
                  {{ tone.name }}
                </button>
              </div>
            </div>

            <button @click="handleCopywriting" :disabled="isGeneratingCopy" class="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:opacity-50">
              {{ isGeneratingCopy ? 'AI正在创作...' : '生成文案' }}
            </button>
          </div>

          <!-- 结果区域 -->
          <div>
            <div class="border border-gray-200 rounded-lg p-4 min-h-[400px] bg-gray-50">
              <div v-if="!generatedCopywriting" class="text-center text-gray-400 py-16">
                <svg class="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p>AI将为您生成文案</p>
              </div>
              <div v-else class="space-y-4">
                <div v-for="(item, index) in generatedCopywriting.results" :key="index" class="bg-white rounded-lg p-4 shadow-sm">
                  <div class="flex items-center justify-between mb-2">
                    <span class="text-xs font-medium text-indigo-600">方案 {{ (index as number) + 1 }}</span>
                    <button @click="copyText(item.content)" class="text-xs text-gray-500 hover:text-indigo-600 transition">复制</button>
                  </div>
                  <p class="text-gray-800">{{ item.content }}</p>
                </div>
              </div>
            </div>

            <div v-if="generatedCopywriting" class="mt-4 flex gap-3">
              <button @click="handleRegenerateCopy" class="flex-1 py-2 bg-white text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                重新生成
              </button>
              <button @click="handleApplyCopy" class="flex-1 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                应用到设计
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeFeature = ref('generate')

// AI生成表单
const generateForm = ref({
  type: 'main_image',
  productName: '',
  sellingPoints: '',
  style: 'modern'
})

const designStyles = [
  { id: 'modern', name: '现代简约' },
  { id: 'minimal', name: '极简风格' },
  { id: 'luxury', name: '高端奢华' },
  { id: 'fresh', name: '清新文艺' },
  { id: 'cute', name: '可爱活泼' },
  { id: 'business', name: '商务专业' },
  { id: 'vintage', name: '复古怀旧' },
  { id: 'creative', name: '创意个性' }
]

const isGenerating = ref(false)
const generatedDesign = ref(null)

// 抠图相关
const fileInput = ref(null)
const uploadedImage = ref(null)
const cutoutType = ref('auto')
const isCutouting = ref(false)
const cutoutResult = ref(null)

// 文案生成
const copywritingForm = ref({
  type: 'title',
  productInfo: '',
  tone: 'professional'
})

const copywritingTones = [
  { id: 'professional', name: '专业严谨' },
  { id: 'friendly', name: '亲切自然' },
  { id: 'promotional', name: '促销激昂' },
  { id: 'emotional', name: '情感共鸣' },
  { id: 'humorous', name: '幽默有趣' },
  { id: 'minimalist', name: '简洁有力' }
]

const isGeneratingCopy = ref(false)
const generatedCopywriting = ref(null)

const triggerUpload = () => {
  fileInput.value?.click()
}

const handleFileUpload = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) {
    uploadedImage.value = {
      url: URL.createObjectURL(file),
      file: file
    }
  }
}

const handleGenerate = async () => {
  if (!generateForm.value.productName) return
  
  isGenerating.value = true
  // 模拟AI生成过程
  await new Promise(resolve => setTimeout(resolve, 2000))
  generatedDesign.value = {
    previewUrl: '/images/ai-generated-placeholder.png'
  }
  isGenerating.value = false
}

const handleEdit = () => {
  // 跳转到编辑器
}

const handleRegenerate = () => {
  generatedDesign.value = null
  handleGenerate()
}

const handleDownload = () => {
  // 下载逻辑
}

const handleCutout = async () => {
  if (!uploadedImage.value) return
  
  isCutouting.value = true
  await new Promise(resolve => setTimeout(resolve, 2000))
  cutoutResult.value = {
    url: '/images/cutout-result-placeholder.png'
  }
  isCutouting.value = false
}

const handleEditCutout = () => {}
const handleReplaceBg = () => {}
const handleDownloadCutout = () => {}

const handleCopywriting = async () => {
  if (!copywritingForm.value.productInfo) return
  
  isGeneratingCopy.value = true
  await new Promise(resolve => setTimeout(resolve, 2000))
  generatedCopywriting.value = {
    results: [
      { content: '【爆款推荐】夏季新款连衣裙，冰丝面料透气舒适，显瘦修身设计，穿出优雅气质' },
      { content: '限时特惠！夏季连衣裙新品上市，轻盈冰丝面料，清凉透气，修身显瘦，品质首选' },
      { content: '夏日穿搭必备！新款冰丝连衣裙，舒适透气不闷热，显瘦版型，优雅百搭' }
    ]
  }
  isGeneratingCopy.value = false
}

const handleRegenerateCopy = () => {
  generatedCopywriting.value = null
  handleCopywriting()
}

const handleApplyCopy = () => {
  // 应用到设计
}

const copyText = (text: string) => {
  navigator.clipboard.writeText(text)
}
</script>