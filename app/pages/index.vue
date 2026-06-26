<template>
  <div class="min-h-screen">
    <NuxtLayout>
      <!-- AI智能设计入口 - 突出展示 -->
      <div class="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 rounded-2xl p-6 mb-6 relative overflow-hidden shadow-lg">
        <div class="absolute inset-0 bg-grid-white/5"></div>
        <div class="flex items-center gap-6">
          <!-- 左侧AI对话入口 -->
          <div class="flex-1">
            <div class="flex items-center gap-2 mb-3">
              <span class="bg-white/20 text-white text-xs px-3 py-1 rounded-full font-medium backdrop-blur-sm">
                AI智能设计
              </span>
              <span class="bg-yellow-400/90 text-yellow-900 text-xs px-2 py-1 rounded-full font-medium">
                NEW
              </span>
            </div>
            <h2 class="text-2xl font-bold text-white mb-2">输入文字，AI自动生成设计</h2>
            <p class="text-white/80 text-sm mb-4">描述您想要的设计，AI将为您自动创建专业作品</p>
            <div class="flex items-center gap-3">
              <div class="flex-1 max-w-xl">
                <div class="bg-white/10 backdrop-blur-sm rounded-xl p-3 flex items-center gap-3 border border-white/20">
                  <svg class="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                  <input 
                    v-model="aiPrompt"
                    type="text" 
                    placeholder="例如：帮我设计一张促销海报，主题是夏季清凉..."
                    class="flex-1 bg-transparent text-white placeholder-white/50 outline-none text-sm"
                  />
                  <button 
                    class="bg-white text-purple-600 px-4 py-2 rounded-lg font-medium hover:bg-white/90 transition flex items-center gap-2 shadow-md"
                    @click="handleAIDesign"
                  >
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    生成
                  </button>
                </div>
              </div>
            </div>
          </div>
          <!-- 右侧示例展示 -->
          <div class="flex gap-3">
            <div class="w-20 h-28 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center overflow-hidden border border-white/20">
              <div class="text-center p-2">
                <div class="w-8 h-8 mx-auto mb-1 rounded-full bg-gradient-to-br from-orange-400 to-pink-400"></div>
                <div class="text-white/60 text-xs">促销海报</div>
              </div>
            </div>
            <div class="w-20 h-28 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center overflow-hidden border border-white/20">
              <div class="text-center p-2">
                <div class="w-8 h-8 mx-auto mb-1 rounded-lg bg-gradient-to-br from-blue-400 to-purple-400"></div>
                <div class="text-white/60 text-xs">商品主图</div>
              </div>
            </div>
            <div class="w-20 h-28 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center overflow-hidden border border-white/20">
              <div class="text-center p-2">
                <div class="w-8 h-8 mx-auto mb-1 rounded bg-gradient-to-br from-green-400 to-teal-400"></div>
                <div class="text-white/60 text-xs">详情页</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 快捷场景入口 -->
      <div class="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
        <span class="text-gray-500 text-sm font-medium shrink-0">场景：</span>
        <button 
          v-for="scene in scenes" 
          :key="scene.id"
          class="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 shrink-0 flex items-center gap-2"
          :class="activeScene === scene.id 
            ? 'bg-gradient-to-r ' + scene.activeColor + ' text-white shadow-md' 
            : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-100'"
          @click="activeScene = scene.id"
        >
          <span class="w-4 h-4" :class="activeScene === scene.id ? 'text-white' : scene.iconColor">
            <component :is="scene.icon" />
          </span>
          {{ scene.name }}
        </button>
      </div>
      
      <!-- 主内容区：上传 + 模板 -->
      <div class="grid grid-cols-12 gap-6 mb-6">
        <!-- 左侧上传和创建 -->
        <div class="col-span-4">
          <!-- 上传区域 -->
          <div 
            class="bg-white rounded-2xl shadow-md border-2 border-dashed transition-all duration-200 overflow-hidden relative group"
            :class="isDragging ? 'border-purple-400 bg-purple-50' : 'border-gray-200 hover:border-purple-300 hover:shadow-lg'"
            @dragover.prevent="isDragging = true"
            @dragleave.prevent="isDragging = false"
            @drop.prevent="handleDrop"
          >
            <!-- 上传提示 -->
            <div class="p-6 flex flex-col items-center justify-center min-h-[200px]">
              <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform shadow-sm">
                <svg class="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 01 9 9h-1" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <p class="text-gray-700 font-medium mb-2">拖拽或点击上传图片</p>
              <p class="text-gray-400 text-xs mb-4">支持 JPG、PNG、WebP，最大 20MB</p>
              <input 
                ref="fileInput"
                type="file" 
                accept="image/*"
                class="hidden"
                @change="handleFileSelect"
              />
              <button 
                class="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2.5 rounded-xl font-medium hover:from-purple-600 hover:to-blue-600 transition shadow-md"
                @click="$refs.fileInput?.click()"
              >
                选择图片
              </button>
            </div>
            
            <!-- 上传后预览 -->
            <div v-if="uploadedFile" class="p-4 bg-gray-50 border-t border-gray-100">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-lg overflow-hidden bg-gray-200">
                  <img :src="uploadedFile.preview" class="w-full h-full object-cover" />
                </div>
                <div class="flex-1">
                  <p class="text-sm font-medium text-gray-700 truncate">{{ uploadedFile.name }}</p>
                  <p class="text-xs text-gray-400">{{ uploadedFile.size }}</p>
                </div>
                <button 
                  class="bg-purple-500 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-purple-600 transition"
                  @click="startDesign"
                >
                  开始设计
                </button>
              </div>
            </div>
          </div>
          
          <!-- 创建空白设计 -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mt-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer" @click="createBlankDesign">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center border border-gray-200">
                <svg class="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div class="flex-1">
                <h4 class="font-medium text-gray-900">创建空白设计</h4>
                <p class="text-sm text-gray-500">自定义尺寸开始创作</p>
              </div>
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
          
          <!-- 最近作品 -->
          <div class="mt-4">
            <div class="flex items-center justify-between mb-3">
              <h3 class="text-sm font-medium text-gray-700">最近作品</h3>
              <NuxtLink to="/space" class="text-purple-600 text-xs hover:text-purple-700">查看全部</NuxtLink>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div v-for="work in recentWorks" :key="work.id" 
                class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                @click="openWork(work)"
              >
                <div class="h-24 bg-gradient-to-br flex items-center justify-center" :class="work.bgColor">
                  <span class="text-white text-xs">{{ work.title }}</span>
                </div>
                <div class="p-2">
                  <p class="text-xs text-gray-500 truncate">{{ work.name }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 右侧模板推荐 -->
        <div class="col-span-8">
          <!-- 模板分类标签 -->
          <div class="flex items-center gap-2 mb-4 flex-wrap">
            <span 
              class="px-3 py-1.5 text-white rounded-lg text-sm font-medium shadow-sm cursor-pointer transition-colors"
              :class="templateFilter === 'all' ? 'bg-gradient-to-r from-purple-500 to-blue-500' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-100'"
              @click="templateFilter = 'all'"
            >全部模板</span>
            <span 
              class="px-3 py-1.5 rounded-lg text-sm cursor-pointer shadow-sm border border-gray-100 transition-colors"
              :class="templateFilter === 'vip' ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'"
              @click="templateFilter = 'vip'"
            >
              <svg class="w-3.5 h-3.5 inline mr-1 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5z"/>
              </svg>
              VIP专属
            </span>
            <span 
              class="px-3 py-1.5 rounded-lg text-sm cursor-pointer shadow-sm border border-gray-100 transition-colors"
              :class="templateFilter === 'free' ? 'bg-gradient-to-r from-green-400 to-teal-400 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'"
              @click="templateFilter = 'free'"
            >免费模板</span>
            <span class="px-3 py-1.5 bg-white text-gray-600 rounded-lg text-sm hover:bg-gray-50 cursor-pointer shadow-sm border border-gray-100">电商海报</span>
            <span class="px-3 py-1.5 bg-white text-gray-600 rounded-lg text-sm hover:bg-gray-50 cursor-pointer shadow-sm border border-gray-100">商品主图</span>
            <span class="px-3 py-1.5 bg-white text-gray-600 rounded-lg text-sm hover:bg-gray-50 cursor-pointer shadow-sm border border-gray-100">详情页</span>
            <span class="px-3 py-1.5 bg-white text-gray-600 rounded-lg text-sm hover:bg-gray-50 cursor-pointer shadow-sm border border-gray-100">促销活动</span>
            <span class="px-3 py-1.5 bg-white text-gray-600 rounded-lg text-sm hover:bg-gray-50 cursor-pointer shadow-sm border border-gray-100">社交分享</span>
            <NuxtLink to="/templates" class="px-3 py-1.5 text-purple-600 text-sm hover:text-purple-700 flex items-center gap-1 font-medium">
              更多模板
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </NuxtLink>
          </div>
          
          <!-- 模板卡片网格 -->
          <div class="grid grid-cols-4 gap-4">
            <div 
              v-for="template in filteredTemplates" 
              :key="template.id"
              class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer group"
              @click="useTemplate(template)"
            >
              <!-- 模板预览 -->
              <div class="h-32 relative overflow-hidden" :class="template.bgColor">
                <div class="absolute inset-0 flex items-center justify-center">
                  <div class="text-center">
                    <div class="w-10 h-10 mx-auto mb-2 rounded-lg bg-white/20 backdrop-blur-sm"></div>
                    <span class="text-white/80 text-xs">{{ template.previewText }}</span>
                  </div>
                </div>
                <!-- VIP标识 -->
                <div v-if="template.isVip" class="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1 shadow-lg">
                  <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5z"/>
                  </svg>
                  VIP
                </div>
                <!-- 悬浮操作 -->
                <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button class="bg-white text-purple-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition shadow-md">
                    立即使用
                  </button>
                </div>
              </div>
              <!-- 模板信息 -->
              <div class="p-3">
                <h4 class="font-medium text-gray-900 text-sm truncate">{{ template.name }}</h4>
                <div class="flex items-center justify-between mt-1">
                  <span class="text-xs text-gray-400">{{ template.size }}</span>
                  <span class="text-xs text-gray-400">{{ template.useCount }}人使用</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 快捷工具入口 -->
          <div class="mt-6">
            <h3 class="text-sm font-medium text-gray-700 mb-3">快捷工具</h3>
            <div class="grid grid-cols-4 gap-3">
              <div 
                v-for="tool in quickTools" 
                :key="tool.id"
                class="bg-white rounded-xl shadow-sm p-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer border border-gray-100 group"
                @click="navigateToPoster(tool.id)"
              >
                <div class="w-10 h-10 rounded-xl mb-3 flex items-center justify-center transition-transform group-hover:scale-105" :class="tool.bgColor">
                  <component :is="tool.icon" class="w-5 h-5" :class="tool.iconColor" />
                </div>
                <h4 class="font-medium text-gray-900 text-sm">{{ tool.name }}</h4>
                <p class="text-xs text-gray-500 mt-1">{{ tool.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 功能推荐横幅 -->
      <div class="grid grid-cols-3 gap-4 mb-6">
        <div class="bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl p-5 text-white relative overflow-hidden shadow-lg group hover:shadow-xl transition-shadow cursor-pointer" @click="navigateToPoster('product-suite')">
          <div class="absolute top-3 left-3 bg-white/20 px-2 py-1 rounded text-xs font-medium backdrop-blur-sm">限时免费</div>
          <div class="flex items-end justify-between">
            <div>
              <h3 class="text-lg font-bold">商品套图PRO</h3>
              <p class="text-white/80 text-sm mt-1">一键生成详情页套图</p>
              <div class="flex items-center gap-1 mt-3 text-white/60 text-xs">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                </svg>
                <span>3.2万人已使用</span>
              </div>
            </div>
            <svg class="w-8 h-8 text-white/40 group-hover:text-white/60 transition-colors" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
            </svg>
          </div>
        </div>
        
        <div class="bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl p-5 text-white relative overflow-hidden shadow-lg group hover:shadow-xl transition-shadow cursor-pointer" @click="navigateToPoster('video-gen')">
          <div class="absolute top-3 left-3 bg-white/20 px-2 py-1 rounded text-xs font-medium backdrop-blur-sm">爆款工具</div>
          <div class="flex items-end justify-between">
            <div>
              <h3 class="text-lg font-bold">爆款视频生成</h3>
              <p class="text-white/80 text-sm mt-1">AI自动生成带货视频</p>
              <div class="flex items-center gap-1 mt-3 text-white/60 text-xs">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
                </svg>
                <span>视频制作神器</span>
              </div>
            </div>
            <svg class="w-8 h-8 text-white/40 group-hover:text-white/60 transition-colors" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
            </svg>
          </div>
        </div>
        
        <div class="bg-gradient-to-br from-purple-500 to-violet-500 rounded-2xl p-5 text-white relative overflow-hidden shadow-lg group hover:shadow-xl transition-shadow cursor-pointer" @click="navigateToPoster('text-design')">
          <div class="absolute top-3 left-3 bg-yellow-400/90 px-2 py-1 rounded text-xs font-medium text-yellow-900">新功能</div>
          <div class="flex items-end justify-between">
            <div>
              <h3 class="text-lg font-bold">创意文字设计</h3>
              <p class="text-white/80 text-sm mt-1">3D立体、霓虹灯特效</p>
              <div class="flex items-center gap-1 mt-3 text-white/60 text-xs">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 4v3h5v12h3V7h5V4H9zm-6 8h3v7h3v-7h3V9H3v3z"/>
                </svg>
                <span>8种创意样式</span>
              </div>
            </div>
            <svg class="w-8 h-8 text-white/40 group-hover:text-white/60 transition-colors" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 4v3h5v12h3V7h5V4H9zm-6 8h3v7h3v-7h3V9H3v3z"/>
            </svg>
          </div>
        </div>
      </div>
      
      <!-- 会员权益展示 -->
      <div class="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-6 mb-6 relative overflow-hidden">
        <div class="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full blur-3xl"></div>
        <div class="flex items-center justify-between relative">
          <div class="flex items-center gap-6">
            <div>
              <h3 class="text-xl font-bold text-white flex items-center gap-2">
                <svg class="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5z"/>
                </svg>
                开通VIP会员
              </h3>
              <p class="text-gray-400 text-sm mt-1">解锁全部功能，商业使用无风险</p>
            </div>
            <div class="flex items-center gap-4">
              <div class="flex items-center gap-2">
                <svg class="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                <span class="text-white/80 text-sm">正版商用授权</span>
              </div>
              <div class="flex items-center gap-2">
                <svg class="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                <span class="text-white/80 text-sm">高清无水印下载</span>
              </div>
              <div class="flex items-center gap-2">
                <svg class="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                <span class="text-white/80 text-sm">海量模板素材</span>
              </div>
              <div class="flex items-center gap-2">
                <svg class="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                <span class="text-white/80 text-sm">AI工具无限使用</span>
              </div>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <div class="text-right">
              <p class="text-yellow-400 text-2xl font-bold">¥389<span class="text-sm text-gray-400">/终身</span></p>
              <p class="text-gray-500 text-xs">原价¥399，立省10元</p>
            </div>
            <button class="bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 px-6 py-3 rounded-xl font-bold hover:from-yellow-500 hover:to-orange-500 transition shadow-lg">
              立即开通
            </button>
          </div>
        </div>
      </div>
      
      <!-- 客户案例展示 -->
      <div class="mb-6">
        <h3 class="text-lg font-bold text-gray-900 mb-4">客户案例</h3>
        <div class="grid grid-cols-4 gap-4">
          <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
            <div class="flex items-center gap-3 mb-3">
              <div class="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-pink-400"></div>
              <div>
                <p class="font-medium text-gray-900 text-sm">某电商品牌</p>
                <p class="text-xs text-gray-400">月销10万+</p>
              </div>
            </div>
            <p class="text-sm text-gray-600 mb-2">"使用易可图后，详情页制作效率提升了80%，转化率也明显提高"</p>
            <div class="flex items-center gap-1 text-xs text-gray-400">
              <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
              </svg>
              <span>5.0</span>
            </div>
          </div>
          <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
            <div class="flex items-center gap-3 mb-3">
              <div class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-400"></div>
              <div>
                <p class="font-medium text-gray-900 text-sm">跨境电商卖家</p>
                <p class="text-xs text-gray-400">亚马逊店铺</p>
              </div>
            </div>
            <p class="text-sm text-gray-600 mb-2">"A+详情页功能太强大了，一键生成符合亚马逊规范的详情页"</p>
            <div class="flex items-center gap-1 text-xs text-gray-400">
              <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
              </svg>
              <span>4.9</span>
            </div>
          </div>
          <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
            <div class="flex items-center gap-3 mb-3">
              <div class="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-teal-400"></div>
              <div>
                <p class="font-medium text-gray-900 text-sm">独立站运营</p>
                <p class="text-xs text-gray-400">DTC品牌</p>
              </div>
            </div>
            <p class="text-sm text-gray-600 mb-2">"商品套图功能帮我节省了大量设计成本，每月省下5000元"</p>
            <div class="flex items-center gap-1 text-xs text-gray-400">
              <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
              </svg>
              <span>4.8</span>
            </div>
          </div>
          <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
            <div class="flex items-center gap-3 mb-3">
              <div class="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-indigo-400"></div>
              <div>
                <p class="font-medium text-gray-900 text-sm">社媒运营团队</p>
                <p class="text-xs text-gray-400">小红书/抖音</p>
              </div>
            </div>
            <p class="text-sm text-gray-600 mb-2">"批量生成社交分享图，再也不用加班做图了"</p>
            <div class="flex items-center gap-1 text-xs text-gray-400">
              <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
              </svg>
              <span>5.0</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 底部Footer -->
      <footer class="bg-gray-100 rounded-2xl p-6 mt-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-6">
            <div class="flex items-center gap-2">
              <div class="w-6 h-6 rounded bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                <span class="text-white font-bold text-xs">易</span>
              </div>
              <span class="text-gray-600 text-sm font-medium">易可图</span>
            </div>
            <div class="flex items-center gap-4 text-sm text-gray-500">
              <NuxtLink to="/about" class="hover:text-gray-700 transition">关于我们</NuxtLink>
              <NuxtLink to="/membership-pricing" class="hover:text-gray-700 transition">价格方案</NuxtLink>
              <NuxtLink to="/help" class="hover:text-gray-700 transition">帮助中心</NuxtLink>
              <NuxtLink to="/contact" class="hover:text-gray-700 transition">联系我们</NuxtLink>
            </div>
          </div>
          <div class="flex items-center gap-4">
            <div class="flex items-center gap-2 text-sm text-gray-500">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
              </svg>
              <span>客服工作时间：9:00-21:00</span>
            </div>
            <div class="flex items-center gap-2">
              <a href="#" class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition">
                <svg class="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.77-2.52a.3.3 0 00-.07-.42c-.09-.07-.21-.04-.29.02-.12.08-1.97 1.26-5.58 3.54-.53.36-1.01.54-1.44.54-.47 0-1.38-.26-2.03-.49-.82-.28-1.47-.44-1.4-.93.03-.25.35-.51.96-.78 3.72-1.64 6.2-2.73 7.44-3.27 3.56-1.52 4.32-1.8 4.8-1.8.11 0 .35.03.51.14.13.09.17.21.19.32-.01.05.01.2-.01.31z"/>
                </svg>
              </a>
              <a href="#" class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition">
                <svg class="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.71.88-.53 1.56-1.37 1.88-2.38-.83.52-1.75.88-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 01-1.93.07 4.28 4.28 0 004 2.98 8.521 8.521 0 01-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 16.78 6.08 18 8.93 18c7.07 0 10.93-5.85 10.93-10.93 0-.17 0-.33-.01-.49.75-.54 1.4-1.21 1.92-1.98z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div class="border-t border-gray-200 mt-4 pt-4 flex items-center justify-between text-xs text-gray-400">
          <span>© 2024 易可图 版权所有</span>
          <div class="flex items-center gap-4">
            <NuxtLink to="/privacy" class="hover:text-gray-600 transition">隐私政策</NuxtLink>
            <NuxtLink to="/terms" class="hover:text-gray-600 transition">服务条款</NuxtLink>
            <span>ICP备案号：待完善</span>
          </div>
        </div>
      </footer>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { ref, h, computed } from 'vue'
import { useRouter } from 'vue-router'
import AIDesignDialog from '~/components/AIDesignDialog.vue'
import TemplatePreview from '~/components/TemplatePreview.vue'
import SizeSelector from '~/components/SizeSelector.vue'
import VipPurchaseDialog from '~/components/VipPurchaseDialog.vue'

const router = useRouter()

// 用户认证状态
const { user, membership, isLoggedIn, isVip, refreshMembership } = useAuth()

// 弹窗状态
const showAIDialog = ref(false)
const showTemplatePreview = ref(false)
const showSizeSelector = ref(false)
const showVipDialog = ref(false)
const selectedTemplate = ref<any>(null)

// AI提示词
const aiPrompt = ref('')

// 场景列表
const scenes = [
  { id: 'all', name: '全部', icon: () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24', class: 'w-4 h-4' }, [h('path', { d: 'M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-12v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z' })]), activeColor: 'from-purple-500 to-blue-500' },
  { id: 'ecommerce', name: '电商', icon: () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24', class: 'w-4 h-4' }, [h('path', { d: 'M18 6h-2c0-2.21-1.79-4-4-4S8 3.79 8 6H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6-2c1.1 0 2 .9 2 2h-4c0-1.1.9-2 2-2zm6 16H6V8h2v2c0 .55.45 1 1 1s1-.45 1-1V8h4v2c0 .55.45 1 1 1s1-.45 1-1V8h2v12z' })]), activeColor: 'from-orange-500 to-red-500', iconColor: 'text-orange-500' },
  { id: 'social', name: '社交', icon: () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24', class: 'w-4 h-4' }, [h('path', { d: 'M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z' })]), activeColor: 'from-blue-500 to-cyan-500', iconColor: 'text-blue-500' },
  { id: 'print', name: '印刷', icon: () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24', class: 'w-4 h-4' }, [h('path', { d: 'M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z' })]), activeColor: 'from-green-500 to-teal-500', iconColor: 'text-green-500' },
  { id: 'ads', name: '广告', icon: () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24', class: 'w-4 h-4' }, [h('path', { d: 'M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zM9 8h2v8H9V8zm4 0h2v8h-2V8z' })]), activeColor: 'from-purple-500 to-pink-500', iconColor: 'text-purple-500' },
]

const activeScene = ref('all')

// 上传状态
const isDragging = ref(false)
const uploadedFile = ref<{ name: string; size: string; preview: string } | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)

// 最近作品
const recentWorks = [
  { id: 1, name: '夏季促销海报', title: '促销', bgColor: 'from-orange-400 to-pink-400' },
  { id: 2, name: '商品详情页', title: '详情', bgColor: 'from-blue-400 to-purple-400' },
]

// 模板列表
const templates = [
  { id: 1, name: '电商促销海报', size: '800×1200', useCount: 3256, previewText: '促销', bgColor: 'bg-gradient-to-br from-orange-400 to-pink-400', isVip: false },
  { id: 2, name: '商品主图模板', size: '800×800', useCount: 1892, previewText: '主图', bgColor: 'bg-gradient-to-br from-blue-400 to-purple-400', isVip: true },
  { id: 3, name: '详情页模板', size: '750×2000', useCount: 2156, previewText: '详情', bgColor: 'bg-gradient-to-br from-green-400 to-teal-400', isVip: true },
  { id: 4, name: '新品发布海报', size: '1080×1920', useCount: 1256, previewText: '新品', bgColor: 'bg-gradient-to-br from-purple-400 to-indigo-400', isVip: false },
  { id: 5, name: '社交分享图', size: '1080×1080', useCount: 1562, previewText: '分享', bgColor: 'bg-gradient-to-br from-cyan-400 to-blue-400', isVip: false },
  { id: 6, name: '节日促销海报', size: '800×1200', useCount: 2891, previewText: '节日', bgColor: 'bg-gradient-to-br from-red-400 to-orange-400', isVip: true },
  { id: 7, name: '直播预告海报', size: '1080×1920', useCount: 1125, previewText: '直播', bgColor: 'bg-gradient-to-br from-yellow-400 to-orange-400', isVip: false },
  { id: 8, name: '品牌宣传海报', size: '1200×628', useCount: 892, previewText: '品牌', bgColor: 'bg-gradient-to-br from-gray-700 to-gray-900', isVip: true },
]

// 模板筛选状态
const templateFilter = ref<'all' | 'vip' | 'free'>('all')

// 筛选后的模板列表
const filteredTemplates = computed(() => {
  if (templateFilter.value === 'vip') {
    return templates.filter(t => t.isVip)
  } else if (templateFilter.value === 'free') {
    return templates.filter(t => !t.isVip)
  }
  return templates
})

// 快捷工具列表
const quickTools = [
  { id: 'product-suite', name: '商品换背景', desc: '智能替换商品背景', icon: () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24', class: 'w-5 h-5' }, [h('path', { d: 'M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z' })]), bgColor: 'bg-gradient-to-br from-purple-100 to-blue-100', iconColor: 'text-purple-500' },
  { id: 'ai-edit', name: '一句话改图', desc: 'AI智能修改图片', icon: () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24', class: 'w-5 h-5' }, [h('path', { d: 'M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z' })]), bgColor: 'bg-gradient-to-br from-blue-100 to-cyan-100', iconColor: 'text-blue-500' },
  { id: 'change-bg', name: '智能抠图', desc: '一键去除背景', icon: () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24', class: 'w-5 h-5' }, [h('path', { d: 'M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16z' })]), bgColor: 'bg-gradient-to-br from-green-100 to-teal-100', iconColor: 'text-green-500' },
  { id: 'text-design', name: '文字设计', desc: '创意文字排版', icon: () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24', class: 'w-5 h-5' }, [h('path', { d: 'M9 4v3h5v12h3V7h5V4H9zm-6 8h3v7h3v-7h3V9H3v3z' })]), bgColor: 'bg-gradient-to-br from-orange-100 to-red-100', iconColor: 'text-orange-500' },
]

// 处理AI设计
const handleAIDesign = () => {
  showAIDialog.value = true
}

// AI设计完成回调
const onAIDesignComplete = (result: any) => {
  showAIDialog.value = false
  router.push({ path: '/poster-design', query: { mode: 'ai', prompt: result.prompt } })
}

// 处理文件拖拽
const handleDrop = (e: DragEvent) => {
  isDragging.value = false
  const files = e.dataTransfer?.files
  if (files && files.length > 0) {
    processFile(files[0])
  }
}

// 处理文件选择
const handleFileSelect = (e: Event) => {
  const target = e.target as HTMLInputElement
  const files = target.files
  if (files && files.length > 0) {
    processFile(files[0])
  }
}

// 处理文件
const processFile = (file: File) => {
  if (!file.type.startsWith('image/')) {
    alert('请上传图片文件')
    return
  }
  if (file.size > 20 * 1024 * 1024) {
    alert('文件大小不能超过20MB')
    return
  }
  
  uploadedFile.value = {
    name: file.name,
    size: formatFileSize(file.size),
    preview: URL.createObjectURL(file)
  }
}

// 格式化文件大小
const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return bytes + 'B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + 'KB'
  return (bytes / (1024 * 1024)).toFixed(1) + 'MB'
}

// 开始设计
const startDesign = () => {
  if (uploadedFile.value) {
    router.push({ path: '/poster-design', query: { mode: 'edit', image: uploadedFile.value.preview } })
  }
}

// 创建空白设计
const createBlankDesign = () => {
  router.push('/poster-design?mode=create')
}

// 打开作品
const openWork = (work: { id: number }) => {
  router.push(`/poster-design?work=${work.id}`)
}

// 使用模板 - 显示预览（VIP模板需要验证会员状态）
const useTemplate = (template: any) => {
  // VIP模板需要验证会员状态
  if (template.isVip && !isVip.value) {
    selectedTemplate.value = template
    showVipDialog.value = true
    return
  }
  selectedTemplate.value = template
  showTemplatePreview.value = true
}

// 确认使用模板
const onTemplateConfirm = (templateId: number) => {
  showTemplatePreview.value = false
  router.push(`/poster-design?template=${templateId}`)
}

// 导航到海报设计
const navigateToPoster = (menuId: string) => {
  router.push({ path: '/poster-design', query: { menu: menuId } })
}

// SEO Meta
useHead({
  title: '易可图 - 电商人都在用的设计平台',
  meta: [
    { name: 'description', content: '易可图是专业的电商设计平台，提供海报设计、商品套图生成、AI换背景、图片翻译等智能工具，让电商设计更高效、更专业。' },
    { name: 'keywords', content: '电商设计,海报设计,商品套图,AI换背景,图片翻译,跨境电商,详情页设计,AI设计,智能抠图' },
    { property: 'og:title', content: '易可图 - 电商人都在用的设计平台' },
    { property: 'og:description', content: '易可图提供AI智能设计工具，一键生成商品套图、海报设计、详情页，助力电商营销' },
    { property: 'og:type', content: 'website' },
  ],
})
</script>

<style scoped>
.bg-grid-white\/5 {
  background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.05' fill-rule='evenodd'%3E%3Ccircle cx='20' cy='20' r='3'/%3E%3C/g%3E%3C/svg%3E");
}
</style>