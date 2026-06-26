<template>
  <NuxtLayout>
    <!-- 顶部设计器入口 - 更紧凑的设计 -->
    <div class="mb-4 bg-gradient-to-r from-purple-600 to-pink-500 rounded-xl p-3 flex items-center justify-between">
      <div class="text-white flex items-center gap-3">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
        <span class="font-medium">专业海报设计器</span>
        <span class="text-xs opacity-70">拖拽编辑 · 模板套用 · 图片处理</span>
      </div>
      <a href="/design/" target="_blank" class="px-4 py-1.5 bg-white/20 text-white rounded-lg text-sm hover:bg-white/30 transition flex items-center gap-1">
        打开完整设计器
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    </div>
    
    <div class="flex gap-6">
      <!-- 左侧功能菜单 -->
      <div class="w-64 bg-white rounded-xl shadow-sm p-4">
        <h3 class="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <svg class="w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2v-2H3v2zm4 4h2v-2H7v2zm0 4h2v-2H7v2zm0-8h2v-2H7v2zm4 4h2v-2h-2v2zm0 4h2v-2h-2v2zm0-8h2v-2h-2v2zm4 4h2v-2h-2v2zm0 4h2v-2h-2v2zm0-8h2v-2h-2v2z"/>
          </svg>
          设计功能
        </h3>
        <div class="space-y-2">
          <PosterMenuItem
            v-for="item in posterMenuItems"
            :key="item.id"
            :item="item"
            :active-id="activeMenuId"
            @click="handleMenuClick(item)"
          />
        </div>
        
        <!-- VIP提示 -->
        <div v-if="!isVip" class="mt-4 p-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-200">
          <div class="flex items-center gap-2 text-amber-600 text-sm font-medium">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
            </svg>
            升级VIP解锁更多功能
          </div>
          <button class="mt-2 w-full py-1.5 bg-amber-500 text-white rounded-lg text-sm hover:bg-amber-600 transition" @click="showVipDialog = true">
            查看VIP权益
          </button>
        </div>
      </div>
      
      <!-- 中间编辑区 -->
      <div class="flex-1 bg-white rounded-xl shadow-sm">
        <!-- 工具栏 - 实际功能 -->
        <div class="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <div class="flex items-center gap-2">
            <button 
              class="px-3 py-1.5 bg-gray-100 rounded-lg text-sm hover:bg-gray-200 transition flex items-center gap-1 disabled:opacity-50"
              :disabled="!canUndo"
              @click="undoAction"
              title="撤销 (Ctrl+Z)"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
              </svg>
              撤销
            </button>
            <button 
              class="px-3 py-1.5 bg-gray-100 rounded-lg text-sm hover:bg-gray-200 transition flex items-center gap-1 disabled:opacity-50"
              :disabled="!canRedo"
              @click="redoAction"
              title="重做 (Ctrl+Y)"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 10h-10a8 8 0 00-8 8v2M21 10l-6 6m6-6l-6-6" />
              </svg>
              重做
            </button>
            <span class="text-gray-300">|</span>
            <button 
              class="px-3 py-1.5 bg-gray-100 rounded-lg text-sm hover:bg-gray-200 transition flex items-center gap-1 disabled:opacity-50"
              :disabled="!selectedElement"
              @click="copyElement"
              title="复制 (Ctrl+C)"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              复制
            </button>
            <button 
              class="px-3 py-1.5 bg-gray-100 rounded-lg text-sm hover:bg-gray-200 transition flex items-center gap-1 disabled:opacity-50"
              :disabled="!hasClipboard"
              @click="pasteElement"
              title="粘贴 (Ctrl+V)"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              粘贴
            </button>
            <button 
              class="px-3 py-1.5 bg-gray-100 rounded-lg text-sm hover:bg-gray-200 transition flex items-center gap-1 disabled:opacity-50 text-red-500"
              :disabled="!selectedElement"
              @click="deleteElement"
              title="删除 (Delete)"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M1 7h22" />
              </svg>
              删除
            </button>
          </div>
          <div class="flex items-center gap-2">
            <button 
              class="px-3 py-1.5 bg-gray-100 rounded-lg text-sm hover:bg-gray-200 transition flex items-center gap-1"
              @click="saveDesign"
              :disabled="saving"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
              </svg>
              {{ saving ? '保存中...' : '保存' }}
            </button>
            <button 
              class="px-4 py-1.5 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg text-sm hover:opacity-90 transition flex items-center gap-1"
              @click="showExportDialog = true"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              导出下载
            </button>
          </div>
        </div>
        
        <!-- 编辑画布区 - 支持拖拽 -->
        <div class="flex items-center justify-center p-8 min-h-[500px] bg-gray-50 relative">
          <!-- 缩放控制 -->
          <div class="absolute top-4 left-4 flex items-center gap-2 bg-white rounded-lg shadow px-3 py-1.5">
            <button class="text-gray-500 hover:text-gray-700" @click="zoomOut">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
              </svg>
            </button>
            <span class="text-sm text-gray-600">{{ Math.round(zoomLevel * 100) }}%</span>
            <button class="text-gray-500 hover:text-gray-700" @click="zoomIn">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
              </svg>
            </button>
            <button class="text-gray-500 hover:text-gray-700 text-xs" @click="resetZoom">重置</button>
          </div>
          
          <div 
            ref="canvasRef"
            class="bg-white shadow-lg relative overflow-hidden"
            :style="{
              width: canvasWidth * zoomLevel + 'px',
              height: canvasHeight * zoomLevel + 'px',
              transform: `scale(${zoomLevel})`,
              transformOrigin: 'center center',
            }"
            @click="handleCanvasClick"
            @drop="handleDrop"
            @dragover.prevent
          >
            <!-- 空画布提示 -->
            <div v-if="elements.length === 0" class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <svg class="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p class="text-gray-400">点击左侧功能开始设计</p>
              <p class="text-gray-300 text-sm mt-2">或拖拽素材到画布</p>
            </div>
            
            <!-- 动态渲染的设计元素 -->
            <div 
              v-for="element in elements" 
              :key="element.id"
              class="absolute cursor-move select-none"
              :class="selectedElement?.id === element.id ? 'ring-2 ring-purple-400 ring-offset-2' : ''"
              :style="{
                left: element.x + 'px',
                top: element.y + 'px',
                width: element.width + 'px',
                minHeight: element.height + 'px',
                ...element.style,
                transform: `rotate(${element.rotation || 0}deg)`,
              }"
              @mousedown="startDrag(element, $event)"
              @click.stop="selectElementAction(element)"
            >
              <!-- 文字元素 -->
              <template v-if="element.type === 'text'">
                <div 
                  class="w-full h-full flex items-center justify-center"
                  :style="{ ...element.style }"
                >
                  {{ element.content }}
                </div>
              </template>
              
              <!-- 图片元素 -->
              <template v-if="element.type === 'image'">
                <img 
                  :src="element.src" 
                  class="w-full h-full object-cover"
                  :alt="element.alt || '设计元素'"
                />
              </template>
              
              <!-- 选中时显示删除按钮 -->
              <button 
                v-if="selectedElement?.id === element.id"
                class="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full text-white flex items-center justify-center shadow hover:bg-red-600 transition"
                @click.stop="deleteElement"
              >
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        <!-- 画布尺寸选择 -->
        <div class="flex items-center justify-center gap-4 px-4 py-3 border-t border-gray-200">
          <span class="text-sm text-gray-500">画布尺寸：</span>
          <button 
            v-for="size in canvasSizes"
            :key="size.id"
            class="px-3 py-1.5 rounded-lg text-sm transition"
            :class="activeSize === size.id ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
            @click="activeSize = size.id"
          >
            {{ size.name }}
          </button>
          <button class="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-sm hover:bg-gray-200 flex items-center gap-1">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            自定义
          </button>
        </div>
      </div>
      
      <!-- 右侧属性面板 -->
      <div class="w-64 bg-white rounded-xl shadow-sm p-4">
        <h3 class="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <svg class="w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 17v2h6v-2H3zM3 5v2h6V5H3zm0 8v2h6v-2H3zm10 0v2h8v-2h-8zm0-8v2h8V5h-8zm0 4v2h8v-2h-8z"/>
          </svg>
          属性设置
        </h3>
        
        <!-- 选中元素的属性编辑 -->
        <div v-if="selectedElement" class="space-y-4">
          <div>
            <label class="text-sm text-gray-600 mb-2 block">位置</label>
            <div class="grid grid-cols-2 gap-2">
              <div>
                <span class="text-xs text-gray-400">X</span>
                <input 
                  type="number" 
                  v-model="selectedElement.x"
                  class="w-full px-2 py-1 border border-gray-200 rounded text-sm"
                  @change="updateElement"
                />
              </div>
              <div>
                <span class="text-xs text-gray-400">Y</span>
                <input 
                  type="number" 
                  v-model="selectedElement.y"
                  class="w-full px-2 py-1 border border-gray-200 rounded text-sm"
                  @change="updateElement"
                />
              </div>
            </div>
          </div>
          <div>
            <label class="text-sm text-gray-600 mb-2 block">尺寸</label>
            <div class="grid grid-cols-2 gap-2">
              <div>
                <span class="text-xs text-gray-400">宽</span>
                <input 
                  type="number" 
                  v-model="selectedElement.width"
                  class="w-full px-2 py-1 border border-gray-200 rounded text-sm"
                  @change="updateElement"
                />
              </div>
              <div>
                <span class="text-xs text-gray-400">高</span>
                <input 
                  type="number" 
                  v-model="selectedElement.height"
                  class="w-full px-2 py-1 border border-gray-200 rounded text-sm"
                  @change="updateElement"
                />
              </div>
            </div>
          </div>
          <div>
            <label class="text-sm text-gray-600 mb-2 block">旋转角度</label>
            <input 
              type="range" 
              v-model="selectedElement.rotation"
              min="0"
              max="360"
              class="w-full"
              @change="updateElement"
            />
            <span class="text-xs text-gray-400">{{ selectedElement.rotation || 0 }}°</span>
          </div>
          
          <!-- 文字特有属性 -->
          <template v-if="selectedElement.type === 'text'">
            <div>
              <label class="text-sm text-gray-600 mb-2 block">文字内容</label>
              <textarea
                v-model="selectedElement.content"
                class="w-full px-2 py-1 border border-gray-200 rounded text-sm resize-none"
                rows="2"
                @change="updateElement"
              ></textarea>
            </div>
          </template>
        </div>
        
        <!-- 根据当前选中功能显示不同属性 -->
        <div v-else-if="activeMenuId === 'product-suite'" class="space-y-4">
          <div>
            <label class="text-sm text-gray-600 mb-2 block">商品图片</label>
            <button class="w-full py-2 bg-purple-50 text-purple-600 rounded-lg text-sm hover:bg-purple-100 transition flex items-center justify-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              上传商品图片
            </button>
            <p class="text-xs text-gray-400 mt-2">支持 JPG、PNG 格式</p>
          </div>
          <div>
            <label class="text-sm text-gray-600 mb-2 block">套图数量</label>
            <div class="flex items-center gap-2">
              <button class="w-8 h-8 bg-gray-100 rounded-lg text-gray-600 hover:bg-gray-200" @click="suiteCount = Math.max(3, suiteCount - 1)">-</button>
              <input 
                type="number" 
                v-model="suiteCount"
                class="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm text-center"
                min="3"
                max="20"
              />
              <button class="w-8 h-8 bg-gray-100 rounded-lg text-gray-600 hover:bg-gray-200" @click="suiteCount = Math.min(20, suiteCount + 1)">+</button>
            </div>
          </div>
          <div>
            <label class="text-sm text-gray-600 mb-2 block">风格选择</label>
            <div class="grid grid-cols-2 gap-2">
              <button class="px-3 py-2 bg-purple-50 text-purple-600 rounded-lg text-sm border border-purple-200">简约</button>
              <button class="px-3 py-2 bg-gray-100 rounded-lg text-sm hover:bg-gray-200">商务</button>
              <button class="px-3 py-2 bg-gray-100 rounded-lg text-sm hover:bg-gray-200">时尚</button>
              <button class="px-3 py-2 bg-gray-100 rounded-lg text-sm hover:bg-gray-200">科技</button>
            </div>
          </div>
          <button class="w-full py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg text-sm font-medium hover:opacity-90 transition">
            开始生成套图
          </button>
        </div>
        
        <div v-else-if="activeMenuId === 'change-bg'" class="space-y-4">
          <div>
            <label class="text-sm text-gray-600 mb-2 block">上传图片</label>
            <button class="w-full py-2 bg-purple-50 text-purple-600 rounded-lg text-sm hover:bg-purple-100 transition flex items-center justify-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              选择图片
            </button>
          </div>
          <div>
            <label class="text-sm text-gray-600 mb-2 block">背景类型</label>
            <div class="grid grid-cols-2 gap-2">
              <button class="px-3 py-2 bg-purple-50 text-purple-600 rounded-lg text-sm border border-purple-200">纯色</button>
              <button class="px-3 py-2 bg-gray-100 rounded-lg text-sm hover:bg-gray-200">渐变</button>
              <button class="px-3 py-2 bg-gray-100 rounded-lg text-sm hover:bg-gray-200">场景</button>
              <button class="px-3 py-2 bg-gray-100 rounded-lg text-sm hover:bg-gray-200">透明</button>
            </div>
          </div>
          <div>
            <label class="text-sm text-gray-600 mb-2 block">预设场景</label>
            <div class="grid grid-cols-3 gap-2">
              <div class="w-full aspect-square rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 cursor-pointer hover:ring-2 ring-purple-400 flex items-center justify-center">
                <span class="text-xs text-blue-600">室内</span>
              </div>
              <div class="w-full aspect-square rounded-lg bg-gradient-to-br from-green-100 to-green-200 cursor-pointer hover:ring-2 ring-purple-400 flex items-center justify-center">
                <span class="text-xs text-green-600">户外</span>
              </div>
              <div class="w-full aspect-square rounded-lg bg-gradient-to-br from-amber-100 to-amber-200 cursor-pointer hover:ring-2 ring-purple-400 flex items-center justify-center">
                <span class="text-xs text-amber-600">商务</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 文字设计面板 -->
        <div v-else-if="activeMenuId === 'text-design'">
          <TextDesignPanel @addText="handleAddText" />
        </div>
        
        <div v-else class="text-center py-8 text-gray-400">
          <svg class="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
          </svg>
          <p>请选择左侧功能</p>
          <p class="text-sm mt-1">或点击画布上的元素编辑</p>
        </div>
      </div>
    </div>
    
    <!-- 导出弹窗 -->
    <Teleport to="body">
      <div v-if="showExportDialog" class="fixed inset-0 bg-black/50 flex items-center justify-center z-[2147483647]" @click.self="showExportDialog = false">
        <div class="bg-white rounded-2xl w-[480px] max-h-[90vh] overflow-auto shadow-2xl">
          <div class="p-4 border-b border-gray-100 flex items-center justify-between">
            <h3 class="font-semibold text-gray-900">导出设计</h3>
            <button class="text-gray-400 hover:text-gray-600" @click="showExportDialog = false">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div class="p-4 space-y-4">
            <div>
              <label class="text-sm text-gray-600 mb-2 block">导出格式</label>
              <div class="flex gap-2">
                <button 
                  class="px-4 py-2 rounded-lg text-sm transition"
                  :class="exportFormat === 'png' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
                  @click="exportFormat = 'png'"
                >PNG</button>
                <button 
                  class="px-4 py-2 rounded-lg text-sm transition"
                  :class="exportFormat === 'jpg' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
                  @click="exportFormat = 'jpg'"
                >JPG</button>
                <button 
                  class="px-4 py-2 rounded-lg text-sm transition"
                  :class="exportFormat === 'pdf' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
                  @click="exportFormat = 'pdf'"
                >PDF</button>
              </div>
            </div>
            <div>
              <label class="text-sm text-gray-600 mb-2 block">清晰度</label>
              <div class="space-y-2">
                <div 
                  class="p-3 rounded-lg border cursor-pointer transition"
                  :class="exportQuality === 'high' ? 'border-purple-400 bg-purple-50' : 'border-gray-200 hover:border-gray-300'"
                  @click="exportQuality = 'high'"
                >
                  <div class="flex items-center justify-between">
                    <span class="font-medium">高清导出</span>
                    <span class="text-sm text-gray-500">推荐</span>
                  </div>
                  <p class="text-xs text-gray-400 mt-1">适合打印和高清展示</p>
                </div>
                <div 
                  class="p-3 rounded-lg border cursor-pointer transition"
                  :class="exportQuality === 'standard' ? 'border-purple-400 bg-purple-50' : 'border-gray-200 hover:border-gray-300'"
                  @click="exportQuality = 'standard'"
                >
                  <div class="flex items-center justify-between">
                    <span class="font-medium">标准导出</span>
                    <span class="text-sm text-gray-500">快速</span>
                  </div>
                  <p class="text-xs text-gray-400 mt-1">适合网络分享</p>
                </div>
              </div>
            </div>
            
            <!-- VIP提示 -->
            <div v-if="!isVip" class="p-3 bg-amber-50 rounded-lg border border-amber-200">
              <div class="flex items-center gap-2 text-amber-600 text-sm">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                </svg>
                开通VIP可无水印导出
              </div>
              <button class="mt-2 text-sm text-amber-600 hover:text-amber-700" @click="showVipDialog = true; showExportDialog = false">
                了解VIP权益 →
              </button>
            </div>
          </div>
          <div class="p-4 border-t border-gray-100 flex gap-2">
            <button 
              v-if="!isVip"
              class="flex-1 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm hover:bg-gray-200 transition"
              @click="exportWithWatermark"
            >
              带水印下载
            </button>
            <button 
              class="flex-1 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg text-sm font-medium hover:opacity-90 transition"
              @click="exportDesign"
            >
              {{ isVip ? '下载' : '无水印下载 (需VIP)' }}
            </button>
          </div>
        </div>
      </div>
    </Teleport>
    
    <!-- VIP弹窗 -->
    <Teleport to="body">
      <VipPurchaseDialog 
        v-if="showVipDialog" 
        @close="showVipDialog = false"
      />
    </Teleport>
    
    <!-- 保存成功提示 -->
    <Teleport to="body">
      <div v-if="showSaveSuccess" class="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-[2147483647] flex items-center gap-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        保存成功
      </div>
    </Teleport>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import TextDesignPanel from '~/components/TextDesignPanel.vue'
import VipPurchaseDialog from '~/components/VipPurchaseDialog.vue'

const route = useRoute()
const activeMenuId = ref('')
const activeSize = ref('banner')
const suiteCount = ref(6)
const canvasRef = ref<HTMLElement | null>(null)
const saving = ref(false)
const showSaveSuccess = ref(false)
const showExportDialog = ref(false)
const showVipDialog = ref(false)
const exportFormat = ref('png')
const exportQuality = ref('high')

// VIP状态
const isVip = ref(false) // TODO: 从后端获取用户VIP状态

// 画布缩放
const zoomLevel = ref(1)

// 元素列表（替代原来的textElements）
const elements = ref<any[]>([])
const selectedElement = ref<any | null>(null)

// 剪贴板
const clipboard = ref<any | null>(null)
const hasClipboard = computed(() => clipboard.value !== null)

// 历史记录（撤销/重做）
const history = ref<any[]>([])
const historyIndex = ref(-1)
const canUndo = computed(() => historyIndex.value > 0)
const canRedo = computed(() => historyIndex.value < history.value.length - 1)

const posterMenuItems = [
  { id: 'product-suite', name: '商品套图', desc: '一键生成商品详情页套图' },
  { id: 'change-bg', name: '商品换背景', desc: '智能替换商品背景' },
  { id: 'ai-edit', name: '一句话改图', desc: 'AI智能修改图片内容' },
  { id: 'poster-template', name: '海报模板', desc: '海量专业海报模板' },
  { id: 'text-design', name: '文字设计', desc: '创意文字排版设计' },
  { id: 'image-edit', name: '图片编辑', desc: '裁剪、滤镜、调色等' },
  { id: 'material', name: '素材库', desc: '图标、插画、背景素材' },
  { id: 'amazon-detail', name: 'A+详情页', desc: '亚马逊商品详情页设计' },
]

const canvasSizes = [
  { id: 'banner', name: 'Banner (750x400)', width: 750, height: 400 },
  { id: 'poster', name: '海报 (800x1200)', width: 800, height: 1200 },
  { id: 'detail', name: '详情页 (750x2000)', width: 750, height: 2000 },
  { id: 'square', name: '方形 (800x800)', width: 800, height: 800 },
]

const canvasWidth = computed(() => {
  const size = canvasSizes.find(s => s.id === activeSize.value)
  return size?.width || 750
})

const canvasHeight = computed(() => {
  const size = canvasSizes.find(s => s.id === activeSize.value)
  return size?.height || 400
})

// 保存历史状态
const saveHistory = () => {
  history.value = history.value.slice(0, historyIndex.value + 1)
  history.value.push(JSON.stringify(elements.value))
  historyIndex.value = history.value.length - 1
}

// 撤销
const undoAction = () => {
  if (canUndo.value) {
    historyIndex.value--
    elements.value = JSON.parse(history.value[historyIndex.value])
    selectedElement.value = null
  }
}

// 重做
const redoAction = () => {
  if (canRedo.value) {
    historyIndex.value++
    elements.value = JSON.parse(history.value[historyIndex.value])
    selectedElement.value = null
  }
}

// 复制元素
const copyElement = () => {
  if (selectedElement.value) {
    clipboard.value = JSON.parse(JSON.stringify(selectedElement.value))
  }
}

// 粘贴元素
const pasteElement = () => {
  if (clipboard.value) {
    const newElement = {
      ...clipboard.value,
      id: Date.now(),
      x: clipboard.value.x + 20,
      y: clipboard.value.y + 20,
    }
    elements.value.push(newElement)
    selectedElement.value = newElement
    saveHistory()
  }
}

// 删除元素
const deleteElement = () => {
  if (selectedElement.value) {
    elements.value = elements.value.filter(el => el.id !== selectedElement.value.id)
    selectedElement.value = null
    saveHistory()
  }
}

// 选择元素
const selectElementAction = (element: any) => {
  selectedElement.value = element
}

// 更新元素
const updateElement = () => {
  saveHistory()
}

// 画布点击（取消选中）
const handleCanvasClick = () => {
  selectedElement.value = null
}

// 拖拽相关
let isDragging = false
let dragElement: any = null
let dragStartX = 0
let dragStartY = 0
let elementStartX = 0
let elementStartY = 0

const startDrag = (element: any, event: MouseEvent) => {
  isDragging = true
  dragElement = element
  selectedElement.value = element
  
  dragStartX = event.clientX
  dragStartY = event.clientY
  elementStartX = element.x
  elementStartY = element.y
  
  document.addEventListener('mousemove', handleDrag)
  document.addEventListener('mouseup', stopDrag)
}

const handleDrag = (event: MouseEvent) => {
  if (!isDragging || !dragElement) return
  
  const deltaX = event.clientX - dragStartX
  const deltaY = event.clientY - dragStartY
  
  dragElement.x = elementStartX + deltaX / zoomLevel.value
  dragElement.y = elementStartY + deltaY / zoomLevel.value
}

const stopDrag = () => {
  if (isDragging) {
    saveHistory()
  }
  isDragging = false
  dragElement = null
  document.removeEventListener('mousemove', handleDrag)
  document.removeEventListener('mouseup', stopDrag)
}

// 处理拖拽放置
const handleDrop = (event: DragEvent) => {
  // TODO: 处理从素材库拖拽图片到画布
}

const handleMenuClick = (item: any) => {
  activeMenuId.value = item.id
}

// 添加文字到画布
const handleAddText = (textData: any) => {
  const newElement = {
    id: Date.now(),
    type: 'text',
    content: textData.content,
    style: textData.style,
    x: (canvasWidth.value - textData.fontSize * textData.content.length * 0.5) / 2,
    y: (canvasHeight.value - textData.fontSize) / 2,
    width: textData.fontSize * textData.content.length * 0.8,
    height: textData.fontSize * 1.5,
    rotation: 0,
  }
  elements.value.push(newElement)
  selectedElement.value = newElement
  saveHistory()
}

// 缩放控制
const zoomIn = () => {
  zoomLevel.value = Math.min(2, zoomLevel.value + 0.1)
}

const zoomOut = () => {
  zoomLevel.value = Math.max(0.5, zoomLevel.value - 0.1)
}

const resetZoom = () => {
  zoomLevel.value = 1
}

// 保存设计
const saveDesign = async () => {
  saving.value = true
  try {
    // TODO: 调用后端API保存设计
    await new Promise(resolve => setTimeout(resolve, 1000))
    showSaveSuccess.value = true
    setTimeout(() => showSaveSuccess.value = false, 2000)
  } catch (error) {
    console.error('保存失败:', error)
  } finally {
    saving.value = false
  }
}

// 导出设计
const exportDesign = () => {
  if (!isVip.value) {
    showVipDialog.value = true
    return
  }
  // TODO: 实现导出功能
  alert(`导出 ${exportFormat.value} 格式，${exportQuality.value} 清晰度`)
}

const exportWithWatermark = () => {
  // TODO: 实现带水印导出
  alert(`带水印导出 ${exportFormat.value} 格式`)
}

// 键盘快捷键
const handleKeydown = (event: KeyboardEvent) => {
  if (event.ctrlKey || event.metaKey) {
    switch (event.key) {
      case 'z':
        event.preventDefault()
        undoAction()
        break
      case 'y':
        event.preventDefault()
        redoAction()
        break
      case 'c':
        event.preventDefault()
        copyElement()
        break
      case 'v':
        event.preventDefault()
        pasteElement()
        break
    }
  }
  if (event.key === 'Delete' && selectedElement.value) {
    event.preventDefault()
    deleteElement()
  }
}

onMounted(() => {
  // 从 URL 参数获取菜单定位
  const menuParam = route.query.menu as string
  if (menuParam && posterMenuItems.find(item => item.id === menuParam)) {
    activeMenuId.value = menuParam
  }
  
  // 初始化历史记录
  saveHistory()
  
  // 监听键盘事件
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})

// SEO Meta
useHead({
  title: '海报设计 - 易可图智能设计平台',
  meta: [
    { name: 'description', content: '易可图海报设计功能，提供商品套图生成、智能换背景、海报模板、文字设计等专业工具，让电商海报设计更简单高效。' },
    { name: 'keywords', content: '海报设计,商品套图,换背景,海报模板,文字设计,详情页设计,电商设计工具' },
  ],
})
</script>