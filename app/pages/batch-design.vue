<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-6 py-8">
      <!-- 页面标题 -->
      <div class="mb-8">
        <h1 class="text-2xl font-semibold text-gray-900">批量设计</h1>
        <p class="text-gray-500 mt-2">电商效率神器，一键批量生成主图、详情页</p>
      </div>

      <!-- 功能选择 -->
      <div class="grid grid-cols-2 gap-6 mb-8">
        <div @click="activeMode = 'mainImage'" :class="['bg-white rounded-xl p-6 shadow-sm cursor-pointer transition', activeMode === 'mainImage' ? 'ring-2 ring-indigo-500' : 'hover:shadow-md']">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900">批量主图生成</h3>
              <p class="text-sm text-gray-500">批量生成800x800商品主图，支持多种风格</p>
            </div>
          </div>
          <div class="mt-4 grid grid-cols-3 gap-2">
            <div class="text-center p-2 bg-gray-50 rounded-lg">
              <div class="text-xs text-gray-500">支持尺寸</div>
              <div class="text-sm font-medium text-gray-900">800x800</div>
            </div>
            <div class="text-center p-2 bg-gray-50 rounded-lg">
              <div class="text-xs text-gray-500">批量上限</div>
              <div class="text-sm font-medium text-gray-900">50张/次</div>
            </div>
            <div class="text-center p-2 bg-gray-50 rounded-lg">
              <div class="text-xs text-gray-500">VIP特权</div>
              <div class="text-sm font-medium text-indigo-600">不限数量</div>
            </div>
          </div>
        </div>

        <div @click="activeMode = 'detailPage'" :class="['bg-white rounded-xl p-6 shadow-sm cursor-pointer transition', activeMode === 'detailPage' ? 'ring-2 ring-indigo-500' : 'hover:shadow-md']">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900">批量详情页生成</h3>
              <p class="text-sm text-gray-500">批量生成详情页模块，智能排版布局</p>
            </div>
          </div>
          <div class="mt-4 grid grid-cols-3 gap-2">
            <div class="text-center p-2 bg-gray-50 rounded-lg">
              <div class="text-xs text-gray-500">模块类型</div>
              <div class="text-sm font-medium text-gray-900">12种模板</div>
            </div>
            <div class="text-center p-2 bg-gray-50 rounded-lg">
              <div class="text-xs text-gray-500">批量上限</div>
              <div class="text-sm font-medium text-gray-900">10套/次</div>
            </div>
            <div class="text-center p-2 bg-gray-50 rounded-lg">
              <div class="text-xs text-gray-500">VIP特权</div>
              <div class="text-sm font-medium text-green-600">不限数量</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 批量主图生成 -->
      <div v-if="activeMode === 'mainImage'" class="bg-white rounded-xl shadow-sm p-6">
        <h2 class="text-lg font-semibold text-gray-900 mb-6">批量主图生成</h2>

        <!-- 步骤指引 -->
        <div class="flex items-center gap-4 mb-6">
          <div v-for="(step, index) in mainImageSteps" :key="index" class="flex items-center">
            <div :class="['w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium', currentStep >= index ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500']">
              {{ index + 1 }}
            </div>
            <span :class="['ml-2 text-sm', currentStep >= index ? 'text-indigo-600 font-medium' : 'text-gray-500']">{{ step }}</span>
            <div v-if="index < mainImageSteps.length - 1" class="w-8 h-px bg-gray-300 mx-2"></div>
          </div>
        </div>

        <!-- 步骤1：导入商品 -->
        <div v-if="currentStep === 0" class="border border-gray-200 rounded-lg p-6">
          <h3 class="text-md font-medium text-gray-900 mb-4">导入商品信息</h3>
          
          <div class="grid grid-cols-2 gap-6">
            <div>
              <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-indigo-400 transition cursor-pointer" @click="triggerBatchUpload">
                <input type="file" ref="batchFileInput" @change="handleBatchUpload" accept=".csv,.xlsx" class="hidden" />
                <svg class="w-10 h-10 mx-auto text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p class="text-gray-600 mb-1">上传商品表格</p>
                <p class="text-xs text-gray-400">支持 CSV、Excel 格式</p>
              </div>
              
              <div class="mt-4 p-3 bg-gray-50 rounded-lg">
                <div class="flex items-center justify-between">
                  <span class="text-sm text-gray-600">表格模板下载</span>
                  <button class="text-sm text-indigo-600 hover:text-indigo-700">下载模板</button>
                </div>
              </div>
            </div>

            <div>
              <div class="mb-3">
                <label class="block text-sm font-medium text-gray-700 mb-2">手动添加商品</label>
                <textarea v-model="manualProducts" rows="4" class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="格式：商品名称,卖点1,卖点2...&#10;每行一个商品"></textarea>
              </div>
              <button @click="parseManualProducts" class="w-full py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
                解析添加
              </button>
            </div>
          </div>

          <!-- 已导入商品列表 -->
          <div v-if="importedProducts.length > 0" class="mt-6">
            <div class="flex items-center justify-between mb-3">
              <h4 class="text-sm font-medium text-gray-900">已导入商品（{{ importedProducts.length }}件）</h4>
              <button @click="importedProducts = []" class="text-sm text-red-500 hover:text-red-600">清空</button>
            </div>
            <div class="max-h-48 overflow-y-auto border border-gray-200 rounded-lg">
              <table class="w-full">
                <thead class="bg-gray-50 sticky top-0">
                  <tr>
                    <th class="px-4 py-2 text-left text-xs font-medium text-gray-500">商品名称</th>
                    <th class="px-4 py-2 text-left text-xs font-medium text-gray-500">卖点</th>
                    <th class="px-4 py-2 text-right text-xs font-medium text-gray-500">操作</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                  <tr v-for="(product, index) in importedProducts" :key="index">
                    <td class="px-4 py-2 text-sm text-gray-900">{{ product.name }}</td>
                    <td class="px-4 py-2 text-sm text-gray-600">{{ product.points?.join(', ') }}</td>
                    <td class="px-4 py-2 text-right">
                      <button @click="importedProducts.splice(index, 1)" class="text-xs text-red-500 hover:text-red-600">删除</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="mt-6 flex justify-end">
            <button @click="currentStep = 1" :disabled="importedProducts.length === 0" class="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:opacity-50">
              下一步：选择模板
            </button>
          </div>
        </div>

        <!-- 步骤2：选择模板 -->
        <div v-if="currentStep === 1" class="border border-gray-200 rounded-lg p-6">
          <h3 class="text-md font-medium text-gray-900 mb-4">选择主图模板</h3>
          
          <div class="grid grid-cols-4 gap-4 mb-6">
            <div v-for="template in mainImageTemplates" :key="template.id" 
              @click="selectedTemplate = template.id"
              :class="['rounded-lg border-2 overflow-hidden cursor-pointer transition', selectedTemplate === template.id ? 'border-indigo-500 ring-2 ring-indigo-200' : 'border-gray-200 hover:border-gray-300']">
              <div class="aspect-square bg-gray-100 flex items-center justify-center">
                <img :src="template.preview" class="w-full h-full object-cover" />
              </div>
              <div class="p-2 text-center">
                <span class="text-xs font-medium text-gray-900">{{ template.name }}</span>
              </div>
            </div>
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">模板风格设置</label>
            <div class="grid grid-cols-5 gap-2">
              <button v-for="style in batchStyles" :key="style.id" 
                @click="selectedStyle = style.id"
                :class="['px-3 py-2 rounded-lg text-sm border transition', selectedStyle === style.id ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700 border-gray-200']">
                {{ style.name }}
              </button>
            </div>
          </div>

          <div class="flex justify-between">
            <button @click="currentStep = 0" class="px-4 py-2 text-gray-600 hover:text-gray-900">返回上一步</button>
            <button @click="currentStep = 2" :disabled="!selectedTemplate" class="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:opacity-50">
              下一步：生成预览
            </button>
          </div>
        </div>

        <!-- 步骤3：生成预览 -->
        <div v-if="currentStep === 2" class="border border-gray-200 rounded-lg p-6">
          <h3 class="text-md font-medium text-gray-900 mb-4">批量生成预览</h3>
          
          <div class="grid grid-cols-4 gap-4 mb-6 max-h-64 overflow-y-auto">
            <div v-for="(preview, index) in generatedPreviews" :key="index" class="rounded-lg border border-gray-200 overflow-hidden">
              <div class="aspect-square bg-gray-100 flex items-center justify-center">
                <img :src="preview.url" class="w-full h-full object-cover" />
              </div>
              <div class="p-2">
                <span class="text-xs text-gray-600 truncate">{{ preview.name }}</span>
              </div>
            </div>
          </div>

          <div v-if="isBatchGenerating" class="text-center py-8">
            <div class="animate-spin w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full mx-auto mb-3"></div>
            <p class="text-gray-600">正在批量生成中...</p>
            <p class="text-sm text-gray-400 mt-1">已生成 {{ generatedPreviews.length }}/{{ importedProducts.length }} 张</p>
          </div>

          <div class="flex justify-between">
            <button @click="currentStep = 1" class="px-4 py-2 text-gray-600 hover:text-gray-900">返回上一步</button>
            <div class="flex gap-3">
              <button @click="handleBatchGenerate" :disabled="isBatchGenerating" class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition disabled:opacity-50">
                {{ isBatchGenerating ? '生成中...' : '重新生成' }}
              </button>
              <button @click="handleBatchDownload" :disabled="generatedPreviews.length === 0" class="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:opacity-50">
                批量下载
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 批量详情页生成 -->
      <div v-if="activeMode === 'detailPage'" class="bg-white rounded-xl shadow-sm p-6">
        <h2 class="text-lg font-semibold text-gray-900 mb-6">批量详情页生成</h2>

        <div class="grid grid-cols-3 gap-6 mb-6">
          <!-- 选择详情页模块 -->
          <div class="col-span-2">
            <h3 class="text-sm font-medium text-gray-900 mb-3">选择详情页模块</h3>
            <div class="grid grid-cols-3 gap-3">
              <div v-for="module in detailModules" :key="module.id"
                @click="toggleModule(module.id)"
                :class="['rounded-lg border-2 p-3 cursor-pointer transition', selectedModules.includes(module.id) ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-gray-300']">
                <div class="flex items-center gap-2 mb-2">
                  <input type="checkbox" :checked="selectedModules.includes(module.id)" class="rounded border-gray-300 text-green-600 focus:ring-green-500" />
                  <span class="text-sm font-medium text-gray-900">{{ module.name }}</span>
                </div>
                <p class="text-xs text-gray-500">{{ module.desc }}</p>
              </div>
            </div>
          </div>

          <!-- 排序预览 -->
          <div>
            <h3 class="text-sm font-medium text-gray-900 mb-3">模块排序</h3>
            <div class="space-y-2">
              <div v-for="(module, index) in orderedModules" :key="module"
                class="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                <span class="w-5 h-5 bg-gray-200 rounded text-xs flex items-center justify-center">{{ index + 1 }}</span>
                <span class="text-sm text-gray-700">{{ getModuleName(module) }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="border border-gray-200 rounded-lg p-4 mb-6">
          <h3 class="text-sm font-medium text-gray-900 mb-3">商品信息输入</h3>
          <textarea v-model="detailProductInfo" rows="6" class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="输入商品基本信息，系统将自动生成各模块内容&#10;&#10;格式示例：&#10;商品名称：夏季新款连衣裙&#10;材质：冰丝面料&#10;卖点：透气舒适、显瘦修身、冰丝面料&#10;适用场景：日常、约会、通勤"></textarea>
        </div>

        <div class="flex justify-end gap-3">
          <button @click="handlePreviewDetail" class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
            预览效果
          </button>
          <button @click="handleGenerateDetail" :disabled="selectedModules.length === 0 || !detailProductInfo" class="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50">
            批量生成
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const activeMode = ref('mainImage')
const currentStep = ref(0)

const mainImageSteps = ['导入商品', '选择模板', '生成预览']

const batchFileInput = ref(null)
const importedProducts = ref<any[]>([])
const manualProducts = ref('')

const selectedTemplate = ref('')
const selectedStyle = ref('modern')

const mainImageTemplates = [
  { id: 't1', name: '简约白底', preview: '/images/templates/main-t1.png' },
  { id: 't2', name: '渐变背景', preview: '/images/templates/main-t2.png' },
  { id: 't3', name: '场景融合', preview: '/images/templates/main-t3.png' },
  { id: 't4', name: '促销风格', preview: '/images/templates/main-t4.png' },
  { id: 't5', name: '高级质感', preview: '/images/templates/main-t5.png' },
  { id: 't6', name: '节日主题', preview: '/images/templates/main-t6.png' },
  { id: 't7', name: '清新文艺', preview: '/images/templates/main-t7.png' },
  { id: 't8', name: '商务简约', preview: '/images/templates/main-t8.png' }
]

const batchStyles = [
  { id: 'modern', name: '现代简约' },
  { id: 'minimal', name: '极简风格' },
  { id: 'luxury', name: '高端质感' },
  { id: 'fresh', name: '清新文艺' },
  { id: 'promo', name: '促销风格' }
]

const isBatchGenerating = ref(false)
const generatedPreviews = ref<any[]>([])

const triggerBatchUpload = () => {
  batchFileInput.value?.click()
}

const handleBatchUpload = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) {
    // 解析表格文件，这里用模拟数据
    importedProducts.value = [
      { name: '夏季新款连衣裙', points: ['透气舒适', '显瘦修身'] },
      { name: '冰丝短袖T恤', points: ['冰丝面料', '清凉舒适'] },
      { name: '休闲运动短裤', points: ['轻薄透气', '速干面料'] }
    ]
  }
}

const parseManualProducts = () => {
  const lines = manualProducts.value.split('\n').filter(line => line.trim())
  const products = lines.map(line => {
    const parts = line.split(',').map(p => p.trim())
    return {
      name: parts[0],
      points: parts.slice(1)
    }
  })
  importedProducts.value = [...importedProducts.value, ...products]
  manualProducts.value = ''
}

const handleBatchGenerate = async () => {
  if (importedProducts.value.length === 0) return
  
  isBatchGenerating.value = true
  generatedPreviews.value = []
  
  for (const product of importedProducts.value) {
    await new Promise(resolve => setTimeout(resolve, 500))
    generatedPreviews.value.push({
      name: product.name,
      url: '/images/generated-placeholder.png'
    })
  }
  
  isBatchGenerating.value = false
}

const handleBatchDownload = () => {
  // 批量下载逻辑
}

// 详情页相关
const selectedModules = ref(['intro', 'features', 'params'])
const detailProductInfo = ref('')

const detailModules = [
  { id: 'intro', name: '产品简介', desc: '商品基本介绍文案' },
  { id: 'features', name: '核心卖点', desc: '突出产品核心优势' },
  { id: 'params', name: '规格参数', desc: '详细规格参数表' },
  { id: 'scenes', name: '使用场景', desc: '展示产品使用场景' },
  { id: 'process', name: '工艺展示', desc: '生产工艺流程图' },
  { id: 'reviews', name: '用户评价', desc: '精选用户评价展示' },
  { id: 'qa', name: '常见问题', desc: '常见问题解答' },
  { id: 'service', name: '售后服务', desc: '售后服务保障说明' },
  { id: 'brand', name: '品牌介绍', desc: '品牌故事与理念' }
]

const orderedModules = computed(() => selectedModules.value)

const getModuleName = (id: string) => {
  return detailModules.find(m => m.id === id)?.name || id
}

const toggleModule = (id: string) => {
  const index = selectedModules.value.indexOf(id)
  if (index > -1) {
    selectedModules.value.splice(index, 1)
  } else {
    selectedModules.value.push(id)
  }
}

const handlePreviewDetail = () => {}
const handleGenerateDetail = () => {}
</script>