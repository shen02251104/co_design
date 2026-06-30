<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-6 py-8">
      <!-- 页面标题 -->
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-2xl font-semibold text-gray-900">团队协作</h1>
          <p class="text-gray-500 mt-2">高效团队设计协作，权限管理与版本控制</p>
        </div>
        <button @click="showCreateTeam = true" class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
          创建团队
        </button>
      </div>

      <!-- 团队概览 -->
      <div class="grid grid-cols-4 gap-4 mb-8">
        <div class="bg-white rounded-xl p-6 shadow-sm">
          <div class="text-3xl font-bold text-indigo-600">{{ teamStats.totalMembers }}</div>
          <div class="text-sm text-gray-500 mt-1">团队成员</div>
        </div>
        <div class="bg-white rounded-xl p-6 shadow-sm">
          <div class="text-3xl font-bold text-green-600">{{ teamStats.activeDesigns }}</div>
          <div class="text-sm text-gray-500 mt-1">协作设计</div>
        </div>
        <div class="bg-white rounded-xl p-6 shadow-sm">
          <div class="text-3xl font-bold text-blue-600">{{ teamStats.sharedAssets }}</div>
          <div class="text-sm text-gray-500 mt-1">共享素材</div>
        </div>
        <div class="bg-white rounded-xl p-6 shadow-sm">
          <div class="text-3xl font-bold text-yellow-600">{{ teamStats.pendingReviews }}</div>
          <div class="text-sm text-gray-500 mt-1">待审核</div>
        </div>
      </div>

      <!-- 功能入口 -->
      <div class="grid grid-cols-3 gap-6 mb-8">
        <div @click="activeTab = 'members'" :class="['bg-white rounded-xl p-6 shadow-sm cursor-pointer transition', activeTab === 'members' ? 'ring-2 ring-indigo-500' : 'hover:shadow-md']">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 3a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900">成员管理</h3>
          </div>
          <p class="text-sm text-gray-500">添加成员、设置角色权限、管理团队账号</p>
        </div>

        <div @click="activeTab = 'designs'" :class="['bg-white rounded-xl p-6 shadow-sm cursor-pointer transition', activeTab === 'designs' ? 'ring-2 ring-indigo-500' : 'hover:shadow-md']">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900">协作设计</h3>
          </div>
          <p class="text-sm text-gray-500">团队设计项目、实时协作编辑、版本管理</p>
        </div>

        <div @click="activeTab = 'assets'" :class="['bg-white rounded-xl p-6 shadow-sm cursor-pointer transition', activeTab === 'assets' ? 'ring-2 ring-indigo-500' : 'hover:shadow-md']">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900">素材库</h3>
          </div>
          <p class="text-sm text-gray-500">团队共享素材、品牌资产库、版权管理</p>
        </div>
      </div>

      <!-- 成员管理面板 -->
      <div v-if="activeTab === 'members'" class="bg-white rounded-xl shadow-sm">
        <div class="p-6 border-b flex items-center justify-between">
          <h2 class="text-lg font-semibold text-gray-900">团队成员</h2>
          <button @click="showInviteMember = true" class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-sm">
            邀请成员
          </button>
        </div>

        <div class="p-6">
          <table class="w-full">
            <thead>
              <tr class="text-left">
                <th class="pb-4 text-sm font-medium text-gray-500">成员</th>
                <th class="pb-4 text-sm font-medium text-gray-500">角色</th>
                <th class="pb-4 text-sm font-medium text-gray-500">设计数</th>
                <th class="pb-4 text-sm font-medium text-gray-500">加入时间</th>
                <th class="pb-4 text-sm font-medium text-gray-500 text-right">操作</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-for="member in teamMembers" :key="member.id">
                <td class="py-4">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium text-gray-600">
                      {{ member.name.charAt(0) }}
                    </div>
                    <div>
                      <div class="text-sm font-medium text-gray-900">{{ member.name }}</div>
                      <div class="text-xs text-gray-500">{{ member.email }}</div>
                    </div>
                  </div>
                </td>
                <td class="py-4">
                  <span :class="['px-2 py-1 rounded text-xs font-medium', member.role === '管理员' ? 'bg-indigo-100 text-indigo-700' : member.role === '设计师' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700']">
                    {{ member.role }}
                  </span>
                </td>
                <td class="py-4 text-sm text-gray-600">{{ member.designCount }}</td>
                <td class="py-4 text-sm text-gray-500">{{ member.joinDate }}</td>
                <td class="py-4 text-right">
                  <button class="text-sm text-indigo-600 hover:text-indigo-700 mr-2">编辑</button>
                  <button v-if="member.role !== '管理员'" class="text-sm text-red-500 hover:text-red-600">移除</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- 协作设计面板 -->
      <div v-if="activeTab === 'designs'" class="bg-white rounded-xl shadow-sm">
        <div class="p-6 border-b flex items-center justify-between">
          <h2 class="text-lg font-semibold text-gray-900">协作设计项目</h2>
          <div class="flex gap-2">
            <select v-model="designFilter" class="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option value="all">全部</option>
              <option value="active">进行中</option>
              <option value="review">待审核</option>
              <option value="completed">已完成</option>
            </select>
            <button class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-sm">
              新建项目
            </button>
          </div>
        </div>

        <div class="p-6 grid grid-cols-3 gap-4">
          <div v-for="design in teamDesigns" :key="design.id" class="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition cursor-pointer">
            <div class="aspect-video bg-gray-100 flex items-center justify-center">
              <img :src="design.cover" class="w-full h-full object-cover" />
            </div>
            <div class="p-4">
              <h3 class="text-sm font-medium text-gray-900 mb-2">{{ design.name }}</h3>
              <div class="flex items-center justify-between">
                <div class="flex -space-x-2">
                  <div v-for="i in Math.min(design.collaborators, 3)" :key="i" class="w-6 h-6 rounded-full bg-indigo-100 border-2 border-white flex items-center justify-center text-xs text-indigo-600">
                    {{ i }}
                  </div>
                </div>
                <span :class="['px-2 py-1 rounded text-xs', design.status === 'active' ? 'bg-green-100 text-green-600' : design.status === 'review' ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-600']">
                  {{ design.statusText }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 素材库面板 -->
      <div v-if="activeTab === 'assets'" class="bg-white rounded-xl shadow-sm">
        <div class="p-6 border-b flex items-center justify-between">
          <h2 class="text-lg font-semibold text-gray-900">团队素材库</h2>
          <div class="flex gap-2">
            <select v-model="assetCategory" class="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option value="all">全部素材</option>
              <option value="image">图片</option>
              <option value="logo">Logo</option>
              <option value="font">字体</option>
              <option value="template">模板</option>
            </select>
            <button class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-sm">
              上传素材
            </button>
          </div>
        </div>

        <div class="p-6 grid grid-cols-4 gap-4">
          <div v-for="asset in teamAssets" :key="asset.id" class="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition cursor-pointer">
            <div class="aspect-square bg-gray-100 flex items-center justify-center">
              <img v-if="asset.type === 'image'" :src="asset.preview" class="w-full h-full object-cover" />
              <svg v-else-if="asset.type === 'font'" class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <svg v-else class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div class="p-3">
              <div class="text-sm font-medium text-gray-900 truncate">{{ asset.name }}</div>
              <div class="flex items-center justify-between mt-1">
                <span class="text-xs text-gray-500">{{ asset.size }}</span>
                <span :class="['px-1.5 py-0.5 rounded text-xs', asset.shared ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500']">
                  {{ asset.shared ? '共享' : '私有' }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 创建团队弹窗 -->
      <div v-if="showCreateTeam" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-xl p-6 w-full max-w-md">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">创建团队</h2>
          
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">团队名称</label>
            <input v-model="newTeam.name" type="text" class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="例如：电商设计组" />
          </div>
          
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">团队描述</label>
            <textarea v-model="newTeam.description" rows="3" class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="团队用途描述"></textarea>
          </div>
          
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">团队规模</label>
            <select v-model="newTeam.size" class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option value="small">小型团队（1-10人）</option>
              <option value="medium">中型团队（10-50人）</option>
              <option value="large">大型团队（50人以上）</option>
            </select>
          </div>
          
          <div class="flex justify-end gap-3">
            <button @click="showCreateTeam = false" class="px-4 py-2 text-gray-600 hover:text-gray-900">取消</button>
            <button @click="handleCreateTeam" class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">创建</button>
          </div>
        </div>
      </div>

      <!-- 邀请成员弹窗 -->
      <div v-if="showInviteMember" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-xl p-6 w-full max-w-md">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">邀请成员</h2>
          
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">成员邮箱</label>
            <input v-model="inviteEmail" type="email" class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="输入邮箱地址" />
          </div>
          
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">角色权限</label>
            <div class="grid grid-cols-3 gap-2">
              <button v-for="role in inviteRoles" :key="role.id"
                @click="inviteRole = role.id"
                :class="['px-3 py-2 rounded-lg text-sm border transition', inviteRole === role.id ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700 border-gray-200']">
                {{ role.name }}
              </button>
            </div>
          </div>
          
          <div class="flex justify-end gap-3">
            <button @click="showInviteMember = false" class="px-4 py-2 text-gray-600 hover:text-gray-900">取消</button>
            <button @click="handleInviteMember" class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">发送邀请</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref('members')

const teamStats = ref({
  totalMembers: 8,
  activeDesigns: 24,
  sharedAssets: 156,
  pendingReviews: 3
})

const teamMembers = ref([
  { id: 1, name: '张三', email: 'zhang@example.com', role: '管理员', designCount: 32, joinDate: '2024-01-01' },
  { id: 2, name: '李四', email: 'li@example.com', role: '设计师', designCount: 28, joinDate: '2024-01-15' },
  { id: 3, name: '王五', email: 'wang@example.com', role: '设计师', designCount: 15, joinDate: '2024-02-01' },
  { id: 4, name: '赵六', email: 'zhao@example.com', role: '编辑', designCount: 8, joinDate: '2024-02-20' },
  { id: 5, name: '孙七', email: 'sun@example.com', role: '编辑', designCount: 5, joinDate: '2024-03-01' }
])

const designFilter = ref('all')
const teamDesigns = ref([
  { id: 1, name: '双十一活动主图', cover: '/images/design-cover-1.png', collaborators: 3, status: 'active', statusText: '进行中' },
  { id: 2, name: '新品详情页设计', cover: '/images/design-cover-2.png', collaborators: 2, status: 'review', statusText: '待审核' },
  { id: 3, name: '品牌Logo更新', cover: '/images/design-cover-3.png', collaborators: 4, status: 'completed', statusText: '已完成' },
  { id: 4, name: '夏季促销海报', cover: '/images/design-cover-4.png', collaborators: 2, status: 'active', statusText: '进行中' }
])

const assetCategory = ref('all')
const teamAssets = ref([
  { id: 1, name: '品牌Logo.png', type: 'logo', preview: '/images/logo-1.png', size: '2.1MB', shared: true },
  { id: 2, name: '产品图片-01.jpg', type: 'image', preview: '/images/product-1.png', size: '1.5MB', shared: true },
  { id: 3, name: '思源黑体', type: 'font', preview: null, size: '商用授权', shared: true },
  { id: 4, name: '促销模板-01', type: 'template', preview: '/images/template-1.png', size: '团队模板', shared: true },
  { id: 5, name: '背景图片.jpg', type: 'image', preview: '/images/bg-1.png', size: '3.2MB', shared: false },
  { id: 6, name: '图标素材包', type: 'image', preview: '/images/icons.png', size: '5.8MB', shared: true }
])

const showCreateTeam = ref(false)
const newTeam = ref({
  name: '',
  description: '',
  size: 'small'
})

const showInviteMember = ref(false)
const inviteEmail = ref('')
const inviteRole = ref('designer')

const inviteRoles = [
  { id: 'admin', name: '管理员' },
  { id: 'designer', name: '设计师' },
  { id: 'editor', name: '编辑' }
]

const handleCreateTeam = () => {
  showCreateTeam.value = false
}

const handleInviteMember = () => {
  showInviteMember.value = false
}
</script>