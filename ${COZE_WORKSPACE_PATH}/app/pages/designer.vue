<template>
  <div class="design-page">
    <!-- 顶部工具栏 -->
    <header class="design-header">
      <div class="header-left">
        <NuxtLink to="/" class="logo-link">
          <span class="logo">易设计</span>
        </NuxtLink>
        <div class="file-name">
          <input 
            v-model="projectName" 
            type="text" 
            class="name-input"
            placeholder="未命名设计"
          />
        </div>
      </div>
      <div class="header-center">
        <button class="tool-btn" @click="handleUndo" title="撤销">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z"/>
          </svg>
        </button>
        <button class="tool-btn" @click="handleRedo" title="重做">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.4 10.6C16.55 8.99 14.15 8 11.5 8c-4.65 0-8.58 3.03-9.96 7.22L3.9 16c1.05-3.19 4.05-5.5 7.6-5.5 1.95 0 3.73.72 5.12 1.88L13 16h9V7l-3.6 3.6z"/>
          </svg>
        </button>
      </div>
      <div class="header-right">
        <button class="save-btn" @click="handleSave">保存</button>
        <button class="download-btn primary" @click="handleDownload">下载图片</button>
      </div>
    </header>

    <!-- 左侧面板 -->
    <aside class="design-sidebar">
      <div class="sidebar-tabs">
        <button 
          :class="['tab-btn', { active: activeTab === 'elements' }]"
          @click="activeTab = 'elements'"
        >元素</button>
        <button 
          :class="['tab-btn', { active: activeTab === 'templates' }]"
          @click="activeTab = 'templates'"
        >模板</button>
        <button 
          :class="['tab-btn', { active: activeTab === 'materials' }]"
          @click="activeTab = 'materials'"
        >素材</button>
      </div>

      <!-- 元素面板 -->
      <div v-if="activeTab === 'elements'" class="panel-content">
        <div class="element-group">
          <h4 class="group-title">基础元素</h4>
          <div class="element-list">
            <div class="element-item" @click="addText">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M5 4v3h5.5v12h3V7H19V4z"/>
              </svg>
              <span>文字</span>
            </div>
            <div class="element-item" @click="addImage">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
              </svg>
              <span>图片</span>
            </div>
            <div class="element-item" @click="addQrcode">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 11h8V3H3v8zm2-6h4v4H5V5zM3 21h8v-8H3v8zm2-6h4v4H5v-4zM13 3v8h8V3h-8zm6 6h-4V5h4v4zM13 13h2v2h-2zM15 15h2v2h-2zM13 17h2v2h-2zM17 13h2v2h-2zM19 15h2v2h-2zM17 17h2v2h-2zM15 19h2v2h-2zM19 19h2v2h-2z"/>
              </svg>
              <span>二维码</span>
            </div>
            <div class="element-item" @click="addShape">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
              </svg>
              <span>形状</span>
            </div>
          </div>
        </div>
        <div class="element-group">
          <h4 class="group-title">AI智能</h4>
          <div class="element-list">
            <div class="element-item" @click="aiRemoveBg">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/>
              </svg>
              <span>AI抠图</span>
            </div>
            <div class="element-item" @click="aiGenerateBg">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3v18m-9-9h18"/>
              </svg>
              <span>换背景</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 模板面板 -->
      <div v-if="activeTab === 'templates'" class="panel-content">
        <div class="template-search">
          <input type="text" placeholder="搜索模板..." class="search-input" />
        </div>
        <div class="template-grid">
          <div 
            v-for="template in templates" 
            :key="template.id"
            class="template-item"
            @click="useTemplate(template)"
          >
            <img :src="template.thumbnail" :alt="template.name" class="template-thumb" />
            <span class="template-name">{{ template.name }}</span>
          </div>
        </div>
      </div>

      <!-- 素材面板 -->
      <div v-if="activeTab === 'materials'" class="panel-content">
        <div class="material-tabs">
          <button 
            v-for="cat in materialCategories" 
            :key="cat"
            :class="['mat-tab', { active: activeMaterial === cat }]"
            @click="activeMaterial = cat"
          >{{ cat }}</button>
        </div>
        <div class="material-grid">
          <div 
            v-for="material in filteredMaterials" 
            :key="material.id"
            class="material-item"
            @click="addMaterial(material)"
          >
            <img :src="material.url" :alt="material.name" class="material-thumb" />
          </div>
        </div>
      </div>
    </aside>

    <!-- 画布区域 -->
    <main class="design-main">
      <div class="canvas-wrapper" :style="canvasWrapperStyle">
        <div 
          ref="canvasRef"
          class="design-canvas"
          :style="canvasStyle"
          @click="handleCanvasClick"
          @drop="handleDrop"
          @dragover.prevent
        >
          <!-- 渲染所有元素 -->
          <div
            v-for="element in elements"
            :key="element.uuid"
            :class="['design-element', { selected: selectedElement?.uuid === element.uuid }]"
            :style="getElementStyle(element)"
            @mousedown="handleElementMouseDown($event, element)"
            @click.stop="selectElement(element)"
          >
            <!-- 文字元素 -->
            <div 
              v-if="element.type === 'text'"
              class="text-content"
              :style="element.textStyle"
              @dblclick="editText(element)"
            >{{ element.text }}</div>
            
            <!-- 图片元素 -->
            <img 
              v-if="element.type === 'image'"
              :src="element.url"
              :style="element.imgStyle"
              draggable="false"
            />
            
            <!-- 二维码元素 -->
            <div v-if="element.type === 'qrcode'" class="qrcode-content">
              <img :src="element.qrcodeUrl" :style="element.qrStyle" draggable="false" />
            </div>
            
            <!-- 形状元素 -->
            <div 
              v-if="element.type === 'shape'"
              class="shape-content"
              :style="element.shapeStyle"
            ></div>
          </div>
        </div>
      </div>
      
      <!-- 缩放控制 -->
      <div class="zoom-control">
        <button @click="zoomOut">-</button>
        <span>{{ Math.round(zoom * 100) }}%</span>
        <button @click="zoomIn">+</button>
        <button @click="resetZoom">重置</button>
      </div>
    </main>

    <!-- 右侧属性面板 -->
    <aside class="design-props" v-if="selectedElement">
      <h3 class="props-title">元素属性</h3>
      
      <!-- 位置与尺寸 -->
      <div class="prop-group">
        <h4>位置与尺寸</h4>
        <div class="prop-row">
          <label>X</label>
          <input type="number" v-model.number="selectedElement.left" @change="updateElement" />
        </div>
        <div class="prop-row">
          <label>Y</label>
          <input type="number" v-model.number="selectedElement.top" @change="updateElement" />
        </div>
        <div class="prop-row">
          <label>宽</label>
          <input type="number" v-model.number="selectedElement.width" @change="updateElement" />
        </div>
        <div class="prop-row">
          <label>高</label>
          <input type="number" v-model.number="selectedElement.height" @change="updateElement" />
        </div>
      </div>

      <!-- 文字属性 -->
      <div class="prop-group" v-if="selectedElement.type === 'text'">
        <h4>文字设置</h4>
        <div class="prop-row">
          <label>内容</label>
          <textarea v-model="selectedElement.text" @change="updateElement"></textarea>
        </div>
        <div class="prop-row">
          <label>字号</label>
          <input type="number" v-model.number="selectedElement.fontSize" @change="updateElement" />
        </div>
        <div class="prop-row">
          <label>颜色</label>
          <input type="color" v-model="selectedElement.color" @change="updateElement" />
        </div>
        <div class="prop-row">
          <label>字体</label>
          <select v-model="selectedElement.fontFamily" @change="updateElement">
            <option value="Inter">Inter</option>
            <option value="思源黑体">思源黑体</option>
            <option value="Microsoft YaHei">微软雅黑</option>
            <option value="SimHei">黑体</option>
            <option value="SimSun">宋体</option>
          </select>
        </div>
      </div>

      <!-- 图片属性 -->
      <div class="prop-group" v-if="selectedElement.type === 'image'">
        <h4>图片设置</h4>
        <div class="prop-row">
          <label>圆角</label>
          <input type="number" v-model.number="selectedElement.radius" @change="updateElement" />
        </div>
        <div class="prop-row">
          <label>透明度</label>
          <input type="range" min="0" max="100" v-model.number="selectedElement.opacity" @change="updateElement" />
        </div>
        <div class="prop-row">
          <label>滤镜</label>
          <select v-model="selectedElement.filter" @change="updateElement">
            <option value="none">无</option>
            <option value="grayscale">黑白</option>
            <option value="sepia">复古</option>
            <option value="blur">模糊</option>
          </select>
        </div>
      </div>

      <!-- 删除按钮 -->
      <button class="delete-btn" @click="deleteElement">删除元素</button>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import { nanoid } from 'nanoid'
import html2canvas from 'html2canvas'

// SEO 配置
useHead({
  title: '海报设计 - 易设计',
  meta: [
    { name: 'description', content: '易设计海报设计器，提供文字、图片、二维码等多种元素编辑，支持AI抠图、智能换背景，一键生成高质量海报图片。' },
    { name: 'keywords', content: '海报设计,图片编辑,在线设计,AI抠图,二维码生成,商品海报' },
  ],
})

// 状态
const projectName = ref('未命名设计')
const activeTab = ref('elements')
const activeMaterial = ref('图片')
const zoom = ref(1)
const canvasRef = ref<HTMLElement | null>(null)

// 画布配置
const canvasConfig = reactive({
  width: 800,
  height: 600,
  backgroundColor: '#ffffff',
})

// 元素列表
const elements = ref<any[]>([])
const selectedElement = ref<any | null>(null)

// 模板数据
const templates = ref([
  { id: 't1', name: '商品促销', thumbnail: 'https://picsum.photos/200/150?random=1' },
  { id: 't2', name: '节日海报', thumbnail: 'https://picsum.photos/200/150?random=2' },
  { id: 't3', name: '新品发布', thumbnail: 'https://picsum.photos/200/150?random=3' },
  { id: 't4', name: '品牌宣传', thumbnail: 'https://picsum.photos/200/150?random=4' },
])

// 素材分类和素材
const materialCategories = ['图片', '图标', '背景', '边框']
const materials = ref([
  { id: 'm1', category: '图片', name: '商品图', url: 'https://picsum.photos/100/100?random=5' },
  { id: 'm2', category: '图片', name: '人物图', url: 'https://picsum.photos/100/100?random=6' },
  { id: 'm3', category: '背景', name: '渐变背景', url: 'https://picsum.photos/100/100?random=7' },
  { id: 'm4', category: '图标', name: '促销图标', url: 'https://picsum.photos/100/100?random=8' },
])

const filteredMaterials = computed(() => 
  materials.value.filter(m => m.category === activeMaterial.value)
)

// 画布样式
const canvasStyle = computed(() => ({
  width: `${canvasConfig.width}px`,
  height: `${canvasConfig.height}px`,
  backgroundColor: canvasConfig.backgroundColor,
  transform: `scale(${zoom.value})`,
}))

const canvasWrapperStyle = computed(() => ({
  width: `${canvasConfig.width * zoom.value + 100}px`,
  height: `${canvasConfig.height * zoom.value + 100}px`,
}))

// 元素样式计算
function getElementStyle(element: any) {
  const style: any = {
    position: 'absolute',
    left: `${element.left}px`,
    top: `${element.top}px`,
    width: `${element.width}px`,
    height: `${element.height}px`,
    transform: `rotate(${element.rotate || 0}deg)`,
  }
  
  if (element.type === 'image' && element.opacity) {
    style.opacity = element.opacity / 100
  }
  
  return style
}

// 添加元素
function addText() {
  const element = {
    uuid: nanoid(),
    type: 'text',
    text: '双击编辑文字',
    left: 100,
    top: 100,
    width: 200,
    height: 40,
    fontSize: 24,
    color: '#333333',
    fontFamily: 'Inter',
    rotate: 0,
    textStyle: {
      fontSize: '24px',
      color: '#333333',
      fontFamily: 'Inter',
      lineHeight: '1.5',
    },
  }
  elements.value.push(element)
  selectElement(element)
}

function addImage() {
  const element = {
    uuid: nanoid(),
    type: 'image',
    url: 'https://picsum.photos/300/200?random=' + Date.now(),
    left: 200,
    top: 200,
    width: 300,
    height: 200,
    radius: 0,
    opacity: 100,
    filter: 'none',
    rotate: 0,
    imgStyle: {
      width: '100%',
      height: '100%',
      borderRadius: '0',
    },
  }
  elements.value.push(element)
  selectElement(element)
}

function addQrcode() {
  const element = {
    uuid: nanoid(),
    type: 'qrcode',
    qrcodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://example.com',
    left: 300,
    top: 300,
    width: 150,
    height: 150,
    rotate: 0,
    qrStyle: {
      width: '100%',
      height: '100%',
    },
  }
  elements.value.push(element)
  selectElement(element)
}

function addShape() {
  const element = {
    uuid: nanoid(),
    type: 'shape',
    shapeType: 'circle',
    left: 400,
    top: 100,
    width: 100,
    height: 100,
    color: '#6366f1',
    rotate: 0,
    shapeStyle: {
      backgroundColor: '#6366f1',
      borderRadius: '50%',
    },
  }
  elements.value.push(element)
  selectElement(element)
}

// AI 功能
function aiRemoveBg() {
  // TODO: 调用后端 AI 抠图接口
  alert('AI抠图功能需要后端支持，请在Java后端实现')
}

function aiGenerateBg() {
  // TODO: 调用后端 AI 换背景接口
  alert('智能换背景功能需要后端支持，请在Java后端实现')
}

// 选择元素
function selectElement(element: any) {
  selectedElement.value = element
}

// 更新元素
function updateElement() {
  if (!selectedElement.value) return
  
  // 更新样式
  if (selectedElement.value.type === 'text') {
    selectedElement.value.textStyle = {
      fontSize: `${selectedElement.value.fontSize}px`,
      color: selectedElement.value.color,
      fontFamily: selectedElement.value.fontFamily,
      lineHeight: '1.5',
    }
  }
  
  if (selectedElement.value.type === 'image') {
    selectedElement.value.imgStyle = {
      width: '100%',
      height: '100%',
      borderRadius: `${selectedElement.value.radius}px`,
      filter: selectedElement.value.filter !== 'none' ? `${selectedElement.value.filter}(100%)` : 'none',
    }
  }
}

// 删除元素
function deleteElement() {
  if (!selectedElement.value) return
  elements.value = elements.value.filter(e => e.uuid !== selectedElement.value.uuid)
  selectedElement.value = null
}

// 编辑文字
function editText(element: any) {
  // TODO: 实现文字编辑模式
}

// 拖拽移动
let isDragging = false
let dragStartX = 0
let dragStartY = 0
let dragElement: any = null

function handleElementMouseDown(event: MouseEvent, element: any) {
  isDragging = true
  dragElement = element
  dragStartX = event.clientX - element.left
  dragStartY = event.clientY - element.top
  selectElement(element)
}

function handleMouseMove(event: MouseEvent) {
  if (!isDragging || !dragElement) return
  dragElement.left = event.clientX - dragStartX
  dragElement.top = event.clientY - dragStartY
}

function handleMouseUp() {
  isDragging = false
  dragElement = null
}

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove)
  window.addEventListener('mouseup', handleMouseUp)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
  window.removeEventListener('mouseup', handleMouseUp)
})

// 缩放控制
function zoomIn() {
  zoom.value = Math.min(zoom.value + 0.1, 2)
}

function zoomOut() {
  zoom.value = Math.max(zoom.value - 0.1, 0.25)
}

function resetZoom() {
  zoom.value = 1
}

// 撤销/重做
function handleUndo() {
  // TODO: 实现撤销功能
}

function handleRedo() {
  // TODO: 实现重做功能
}

// 保存
function handleSave() {
  // TODO: 调用后端保存接口
  alert('保存功能需要后端支持')
}

// 下载图片
async function handleDownload() {
  if (!canvasRef.value) return
  
  try {
    const canvas = await html2canvas(canvasRef.value, {
      scale: 2,
      useCORS: true,
      backgroundColor: canvasConfig.backgroundColor,
    })
    
    const link = document.createElement('a')
    link.download = `${projectName.value}.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
  } catch (error) {
    console.error('下载失败:', error)
    alert('下载失败，请重试')
  }
}

// 使用模板
function useTemplate(template: any) {
  // TODO: 加载模板数据
  alert(`使用模板: ${template.name}`)
}

// 添加素材
function addMaterial(material: any) {
  const element = {
    uuid: nanoid(),
    type: 'image',
    url: material.url,
    left: 100,
    top: 100,
    width: 100,
    height: 100,
    radius: 0,
    opacity: 100,
    filter: 'none',
    rotate: 0,
    imgStyle: {
      width: '100%',
      height: '100%',
    },
  }
  elements.value.push(element)
  selectElement(element)
}

// 画布点击
function handleCanvasClick() {
  selectedElement.value = null
}

// 拖放处理
function handleDrop(event: DragEvent) {
  // TODO: 处理拖放上传图片
}
</script>

<style scoped>
.design-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #1a1a2e;
  color: #fff;
}

/* 顶部工具栏 */
.design-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 48px;
  background: #16213e;
  padding: 0 16px;
  border-bottom: 1px solid #0f3460;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.logo {
  font-size: 18px;
  font-weight: 600;
  color: #00dc82;
}

.name-input {
  background: transparent;
  border: 1px solid #0f3460;
  padding: 4px 8px;
  color: #fff;
  font-size: 14px;
  width: 200px;
}

.header-center {
  display: flex;
  gap: 8px;
}

.tool-btn {
  background: #0f3460;
  border: none;
  padding: 8px;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
}

.header-right {
  display: flex;
  gap: 12px;
}

.save-btn, .download-btn {
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
}

.save-btn {
  background: #0f3460;
  color: #fff;
}

.download-btn.primary {
  background: #00dc82;
  color: #000;
  font-weight: 600;
}

/* 左侧面板 */
.design-sidebar {
  width: 260px;
  background: #16213e;
  border-right: 1px solid #0f3460;
  overflow-y: auto;
}

.sidebar-tabs {
  display: flex;
  padding: 8px;
  gap: 8px;
}

.tab-btn {
  flex: 1;
  padding: 8px;
  background: #0f3460;
  border: none;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
}

.tab-btn.active {
  background: #00dc82;
  color: #000;
}

.panel-content {
  padding: 16px;
}

.element-group {
  margin-bottom: 16px;
}

.group-title {
  font-size: 14px;
  color: #888;
  margin-bottom: 8px;
}

.element-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}

.element-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px;
  background: #0f3460;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.element-item:hover {
  background: #1a4a7a;
  transform: scale(1.05);
}

.element-item span {
  font-size: 12px;
  margin-top: 4px;
}

/* 模板网格 */
.template-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.template-item {
  cursor: pointer;
  border-radius: 8px;
  overflow: hidden;
  background: #0f3460;
  transition: transform 0.2s;
}

.template-item:hover {
  transform: scale(1.05);
}

.template-thumb {
  width: 100%;
  height: 100px;
  object-fit: cover;
}

.template-name {
  padding: 8px;
  font-size: 12px;
  text-align: center;
}

/* 素材网格 */
.material-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.mat-tab {
  padding: 4px 12px;
  background: #0f3460;
  border: none;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
}

.mat-tab.active {
  background: #00dc82;
  color: #000;
}

.material-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

.material-item {
  cursor: pointer;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s;
}

.material-item:hover {
  transform: scale(1.1);
}

.material-thumb {
  width: 100%;
  height: 60px;
  object-fit: cover;
}

/* 画布区域 */
.design-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #1a1a2e;
  overflow: hidden;
}

.canvas-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.design-canvas {
  position: relative;
  box-shadow: 0 10px 40px rgba(0,0,0,0.5);
  overflow: hidden;
  transition: transform 0.1s;
}

.design-element {
  cursor: move;
  user-select: none;
}

.design-element.selected {
  outline: 2px solid #00dc82;
  outline-offset: 2px;
}

.text-content {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: text;
}

/* 缩放控制 */
.zoom-control {
  position: absolute;
  bottom: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  background: #16213e;
  padding: 8px 16px;
  border-radius: 8px;
}

.zoom-control button {
  background: #0f3460;
  border: none;
  color: #fff;
  padding: 4px 12px;
  border-radius: 4px;
  cursor: pointer;
}

/* 右侧属性面板 */
.design-props {
  width: 280px;
  background: #16213e;
  border-left: 1px solid #0f3460;
  padding: 16px;
  overflow-y: auto;
}

.props-title {
  font-size: 16px;
  margin-bottom: 16px;
}

.prop-group {
  margin-bottom: 16px;
}

.prop-group h4 {
  font-size: 14px;
  color: #888;
  margin-bottom: 8px;
}

.prop-row {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.prop-row label {
  width: 60px;
  font-size: 12px;
  color: #aaa;
}

.prop-row input, .prop-row select, .prop-row textarea {
  flex: 1;
  background: #0f3460;
  border: none;
  padding: 6px 8px;
  color: #fff;
  border-radius: 4px;
}

.prop-row textarea {
  height: 60px;
  resize: none;
}

.delete-btn {
  width: 100%;
  padding: 12px;
  background: #ef4444;
  border: none;
  color: #fff;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
}
</style>