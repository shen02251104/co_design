<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 py-8">
      <!-- 页面标题 -->
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="text-2xl font-semibold text-gray-900">我的设计</h1>
          <p class="text-sm text-gray-500 mt-1">管理您的所有设计作品</p>
        </div>
        <NuxtLink 
          to="/?action=create" 
          class="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          新建设计
        </NuxtLink>
      </div>

      <!-- 统计卡片 -->
      <div class="grid grid-cols-4 gap-4 mb-6">
        <div class="bg-white rounded-xl p-4 shadow-sm">
          <div class="text-3xl font-bold text-indigo-600">{{ designCount }}</div>
          <div class="text-sm text-gray-500 mt-1">全部作品</div>
        </div>
        <div class="bg-white rounded-xl p-4 shadow-sm">
          <div class="text-3xl font-bold text-green-600">{{ publishedCount }}</div>
          <div class="text-sm text-gray-500 mt-1">已发布</div>
        </div>
        <div class="bg-white rounded-xl p-4 shadow-sm">
          <div class="text-3xl font-bold text-gray-600">{{ draftCount }}</div>
          <div class="text-sm text-gray-500 mt-1">草稿</div>
        </div>
        <div class="bg-white rounded-xl p-4 shadow-sm">
          <div class="text-3xl font-bold text-blue-600">{{ totalViews }}</div>
          <div class="text-sm text-gray-500 mt-1">总浏览</div>
        </div>
      </div>

      <!-- 筛选栏 -->
      <div class="bg-white rounded-xl p-4 shadow-sm mb-6">
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-2">
            <span class="text-sm text-gray-500">类型:</span>
            <select v-model="filterType" class="px-3 py-1.5 border rounded-lg text-sm">
              <option value="all">全部</option>
              <option value="poster">海报</option>
              <option value="banner">Banner</option>
              <option value="social">社交媒体</option>
            </select>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-sm text-gray-500">状态:</span>
            <select v-model="filterStatus" class="px-3 py-1.5 border rounded-lg text-sm">
              <option value="all">全部</option>
              <option value="published">已发布</option>
              <option value="draft">草稿</option>
            </select>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-sm text-gray-500">排序:</span>
            <select v-model="sortBy" class="px-3 py-1.5 border rounded-lg text-sm">
              <option value="recent">最近修改</option>
              <option value="created">创建时间</option>
              <option value="name">名称</option>
            </select>
          </div>
        </div>
      </div>

      <!-- 作品列表 -->
      <div v-if="loading" class="flex justify-center py-12">
        <div class="text-gray-500">加载中...</div>
      </div>

      <div v-else-if="designs.length === 0" class="bg-white rounded-xl p-12 text-center">
        <svg class="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p class="text-gray-500 mb-4">还没有设计作品</p>
        <NuxtLink to="/?action=create" class="text-indigo-600 hover:text-indigo-700">
          创建第一个设计
        </NuxtLink>
      </div>

      <div v-else class="grid grid-cols-4 gap-4">
        <div 
          v-for="design in designs" 
          :key="design.id"
          class="bg-white rounded-xl shadow-sm overflow-hidden group hover:shadow-md transition-shadow"
        >
          <!-- 封面图 -->
          <div class="relative aspect-[3/4] bg-gray-100">
            <img 
              v-if="design.cover_url" 
              :src="design.cover_url" 
              :alt="design.name"
              class="w-full h-full object-cover"
            />
            <div v-else class="w-full h-full flex items-center justify-center">
              <svg class="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            
            <!-- 状态标签 -->
            <div 
              v-if="design.status === 'draft'" 
              class="absolute top-2 left-2 px-2 py-1 bg-gray-600 text-white text-xs rounded"
            >
              草稿
            </div>
            
            <!-- 操作按钮 -->
            <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center">
              <div class="hidden group-hover:flex gap-2">
                <button 
                  @click="editDesign(design)"
                  class="p-2 bg-white rounded-full hover:bg-indigo-100 transition-colors"
                  title="编辑"
                >
                  <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button 
                  @click="deleteDesign(design.id)"
                  class="p-2 bg-white rounded-full hover:bg-red-100 transition-colors"
                  title="删除"
                >
                  <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M1 7h22" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          <!-- 信息区 -->
          <div class="p-3">
            <h3 class="font-medium text-gray-900 truncate">{{ design.name }}</h3>
            <div class="flex items-center justify-between mt-2 text-sm text-gray-500">
              <span>{{ design.width }}×{{ design.height }}</span>
              <span>{{ formatDate(design.updated_at) }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 分页 -->
      <div v-if="designs.length > 0" class="flex justify-center mt-8">
        <div class="flex items-center gap-2">
          <button 
            v-if="page > 1"
            @click="page--; fetchDesigns()"
            class="px-3 py-1.5 border rounded hover:bg-gray-50"
          >
            上一页
          </button>
          <span class="px-3 py-1.5 text-gray-500">第 {{ page }} 页</span>
          <button 
            v-if="designs.length === pageSize"
            @click="page++; fetchDesigns()"
            class="px-3 py-1.5 border rounded hover:bg-gray-50"
          >
            下一页
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from '~/composables/useAuth'
import { ref, onMounted, computed } from 'vue'

const { user, isLoggedIn } = useAuth()

interface Design {
  id: string
  name: string
  type: string
  cover_url: string | null
  width: number
  height: number
  status: string
  created_at: string
  updated_at: string
}

const designs = ref<Design[]>([])
const loading = ref(true)
const page = ref(1)
const pageSize = 16

const filterType = ref('all')
const filterStatus = ref('all')
const sortBy = ref('recent')

const designCount = ref(0)
const publishedCount = ref(0)
const draftCount = ref(0)
const totalViews = ref(0)

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  
  if (diff < 60000) return '刚刚'
  if (diff < 3600000) return `${Math.floor(diff / 60000)}分钟前`
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}小时前`
  if (diff < 604800000) return `${Math.floor(diff / 86400000)}天前`
  
  return date.toLocaleDateString('zh-CN')
}

const fetchDesigns = async () => {
  if (!isLoggedIn.value || !user.value?.id) {
    loading.value = false
    return
  }

  try {
    loading.value = true
    const response = await $fetch('/api/designs/list', {
      params: {
        userId: user.value.id,
        type: filterType.value,
        status: filterStatus.value,
        sort: sortBy.value,
        page: page.value,
        pageSize: pageSize
      }
    }) as any

    if (response.code === 200) {
      designs.value = response.data.designs || []
      designCount.value = response.data.total || 0
      publishedCount.value = response.data.published || 0
      draftCount.value = response.data.draft || 0
      totalViews.value = response.data.views || 0
    }
  } catch (error) {
    console.error('获取设计列表失败:', error)
  } finally {
    loading.value = false
  }
}

const editDesign = (design: Design) => {
  navigateTo(`/poster-design?designId=${design.id}`)
}

const deleteDesign = async (designId: string) => {
  if (!confirm('确定要删除这个设计吗？')) return
  
  try {
    const response = await $fetch('/api/designs/delete', {
      method: 'POST',
      body: {
        userId: user.value?.id,
        designId: designId
      }
    }) as any

    if (response.code === 200) {
      designs.value = designs.value.filter(d => d.id !== designId)
      designCount.value--
      if (designs.value.find(d => d.id === designId)?.status === 'draft') {
        draftCount.value--
      } else {
        publishedCount.value--
      }
    }
  } catch (error) {
    console.error('删除失败:', error)
    alert('删除失败')
  }
}

onMounted(() => {
  fetchDesigns()
})

// 监听筛选变化
watch([filterType, filterStatus, sortBy], () => {
  page.value = 1
  fetchDesigns()
})
</script>