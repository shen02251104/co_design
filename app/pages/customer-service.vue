<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-6 py-8">
      <!-- 页面标题 -->
      <div class="mb-8">
        <h1 class="text-2xl font-semibold text-gray-900">客服中心</h1>
        <p class="text-gray-500 mt-2">在线客服、工单提交、问题追踪</p>
      </div>

      <!-- 快速入口 -->
      <div class="grid grid-cols-4 gap-4 mb-8">
        <div class="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition cursor-pointer text-center" @click="showLiveChat = true">
          <div class="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-3">
            <svg class="w-7 h-7 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-1">在线客服</h3>
          <p class="text-sm text-gray-500">实时在线答疑</p>
          <div class="mt-2 text-xs text-green-600">● 客服在线</div>
        </div>

        <div class="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition cursor-pointer text-center" @click="showNewTicket = true">
          <div class="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
            <svg class="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-1">提交工单</h3>
          <p class="text-sm text-gray-500">问题反馈与追踪</p>
          <div class="mt-2 text-xs text-indigo-600">点击提交 →</div>
        </div>

        <div class="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition cursor-pointer text-center" @click="activeTab = 'history'">
          <div class="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
            <svg class="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-1">工单记录</h3>
          <p class="text-sm text-gray-500">查看历史工单</p>
          <div class="mt-2 text-xs text-gray-500">{{ pendingTickets }} 条待处理</div>
        </div>

        <div class="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition cursor-pointer text-center" @click="activeTab = 'faq'">
          <div class="w-14 h-14 bg-yellow-100 rounded-xl flex items-center justify-center mx-auto mb-3">
            <svg class="w-7 h-7 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-1">常见问题</h3>
          <p class="text-sm text-gray-500">快速解答FAQ</p>
          <div class="mt-2 text-xs text-gray-500">{{ faqCount }} 个问题</div>
        </div>
      </div>

      <!-- 工单列表 -->
      <div v-if="activeTab === 'history'" class="bg-white rounded-xl shadow-sm">
        <div class="p-6 border-b flex items-center justify-between">
          <h2 class="text-lg font-semibold text-gray-900">我的工单</h2>
          <div class="flex gap-2">
            <select v-model="ticketFilter" class="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option value="all">全部状态</option>
              <option value="pending">待处理</option>
              <option value="processing">处理中</option>
              <option value="resolved">已解决</option>
              <option value="closed">已关闭</option>
            </select>
          </div>
        </div>

        <div class="p-6">
          <div v-if="tickets.length === 0" class="text-center py-12 text-gray-400">
            <svg class="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p>暂无工单记录</p>
            <button @click="showNewTicket = true" class="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition">
              提交新工单
            </button>
          </div>

          <div v-else class="space-y-4">
            <div v-for="ticket in tickets" :key="ticket.id" class="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition cursor-pointer" @click="viewTicket(ticket)">
              <div class="flex items-start justify-between">
                <div>
                  <div class="flex items-center gap-2 mb-2">
                    <span :class="['px-2 py-1 rounded text-xs font-medium', 
                      ticket.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                      ticket.status === 'processing' ? 'bg-blue-100 text-blue-600' :
                      ticket.status === 'resolved' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600']">
                      {{ ticket.statusText }}
                    </span>
                    <span class="px-2 py-1 bg-gray-100 rounded text-xs text-gray-600">{{ ticket.type }}</span>
                  </div>
                  <h3 class="text-sm font-medium text-gray-900">{{ ticket.title }}</h3>
                  <p class="text-xs text-gray-500 mt-1 line-clamp-2">{{ ticket.content }}</p>
                </div>
                <div class="text-right text-xs text-gray-500">
                  <div>{{ ticket.createTime }}</div>
                  <div v-if="ticket.replyCount" class="mt-1 text-indigo-600">{{ ticket.replyCount }} 条回复</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- FAQ列表 -->
      <div v-if="activeTab === 'faq'" class="bg-white rounded-xl shadow-sm">
        <div class="p-6 border-b">
          <h2 class="text-lg font-semibold text-gray-900">常见问题</h2>
        </div>

        <div class="p-6">
          <div class="mb-6">
            <input type="text" v-model="faqSearch" class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="搜索问题..." />
          </div>

          <div class="space-y-3">
            <div v-for="(faq, index) in filteredFaqs" :key="index" class="border border-gray-200 rounded-lg">
              <div @click="faq.expanded = !faq.expanded" class="px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition">
                <div class="flex items-center gap-3">
                  <span :class="['w-6 h-6 rounded flex items-center justify-center text-xs font-medium', 
                    faq.category === '账户' ? 'bg-indigo-100 text-indigo-600' :
                    faq.category === '设计' ? 'bg-green-100 text-green-600' :
                    faq.category === '会员' ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-600']">
                    {{ faq.category }}
                  </span>
                  <span class="text-sm font-medium text-gray-900">{{ faq.question }}</span>
                </div>
                <svg :class="['w-5 h-5 text-gray-400 transition', faq.expanded ? 'rotate-180' : '']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <div v-if="faq.expanded" class="px-4 py-3 bg-gray-50 border-t">
                <p class="text-sm text-gray-600">{{ faq.answer }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 提交工单弹窗 -->
      <div v-if="showNewTicket" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-xl p-6 w-full max-w-lg">
          <h2 class="text-lg font-semibold text-gray-900 mb-6">提交工单</h2>
          
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">问题类型</label>
            <select v-model="newTicket.type" class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option value="账户问题">账户问题</option>
              <option value="设计功能">设计功能</option>
              <option value="会员订阅">会员订阅</option>
              <option value="支付问题">支付问题</option>
              <option value="素材版权">素材版权</option>
              <option value="其他问题">其他问题</option>
            </select>
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">问题标题</label>
            <input v-model="newTicket.title" type="text" class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="简要描述您遇到的问题" />
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">详细描述</label>
            <textarea v-model="newTicket.content" rows="5" class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="请详细描述问题，包括操作步骤、截图等"></textarea>
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">上传附件（可选）</label>
            <div class="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-indigo-400 transition cursor-pointer">
              <input type="file" class="hidden" />
              <svg class="w-8 h-8 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p class="text-sm text-gray-500">点击上传截图或文件</p>
            </div>
          </div>

          <div class="flex justify-end gap-3">
            <button @click="showNewTicket = false" class="px-4 py-2 text-gray-600 hover:text-gray-900">取消</button>
            <button @click="handleSubmitTicket" class="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">提交工单</button>
          </div>
        </div>
      </div>

      <!-- 在线客服弹窗 -->
      <div v-if="showLiveChat" class="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50">
        <div class="bg-white rounded-t-xl w-full max-w-md" style="height: 500px">
          <div class="p-4 border-b flex items-center justify-between">
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                <svg class="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <div class="text-sm font-medium text-gray-900">客服小易</div>
                <div class="text-xs text-green-600">● 在线</div>
              </div>
            </div>
            <button @click="showLiveChat = false" class="text-gray-400 hover:text-gray-600">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div class="flex-1 p-4 overflow-y-auto" style="height: 320px">
            <div class="space-y-4">
              <!-- 客服消息 -->
              <div class="flex gap-2">
                <div class="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-xs text-indigo-600">易</div>
                <div class="bg-gray-100 rounded-lg px-4 py-2 max-w-xs">
                  <p class="text-sm text-gray-800">您好！我是客服小易，很高兴为您服务。请问有什么可以帮助您的？</p>
                  <div class="text-xs text-gray-400 mt-1">10:00</div>
                </div>
              </div>

              <!-- 快捷问题 -->
              <div class="flex flex-wrap gap-2">
                <button v-for="quick in quickQuestions" :key="quick" @click="sendQuickMessage(quick)" class="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm hover:bg-indigo-100 transition">
                  {{ quick }}
                </button>
              </div>

              <!-- 用户消息 -->
              <div v-for="msg in chatMessages" :key="msg.id" class="flex gap-2 justify-end">
                <div class="bg-indigo-600 rounded-lg px-4 py-2 max-w-xs">
                  <p class="text-sm text-white">{{ msg.content }}</p>
                  <div class="text-xs text-indigo-200 mt-1">{{ msg.time }}</div>
                </div>
              </div>
            </div>
          </div>

          <div class="p-4 border-t">
            <div class="flex gap-2">
              <input v-model="chatInput" type="text" class="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="输入消息..." />
              <button @click="sendMessage" class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                发送
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const activeTab = ref('history')
const pendingTickets = ref(2)
const faqCount = ref(15)

const showNewTicket = ref(false)
const showLiveChat = ref(false)

const ticketFilter = ref('all')

const newTicket = ref({
  type: '设计功能',
  title: '',
  content: ''
})

const tickets = ref([
  { id: 1, type: '设计功能', title: '导出图片时出现模糊问题', content: '导出的图片在手机端查看时有些模糊，请问如何提高导出质量？', status: 'resolved', statusText: '已解决', createTime: '2024-01-15', replyCount: 2 },
  { id: 2, type: '会员订阅', title: 'VIP会员续费咨询', content: 'VIP会员续费是否有优惠活动？', status: 'processing', statusText: '处理中', createTime: '2024-01-18', replyCount: 1 },
  { id: 3, type: '账户问题', title: '账号登录异常', content: '最近登录时总是提示密码错误，但密码是正确的。', status: 'pending', statusText: '待处理', createTime: '2024-01-20', replyCount: 0 }
])

const faqSearch = ref('')
const faqs = ref([
  { category: '账户', question: '如何修改登录密码？', answer: '进入用户中心 → 安全设置 → 修改密码，输入原密码和新密码即可完成修改。', expanded: false },
  { category: '会员', question: 'VIP会员有哪些特权？', answer: 'VIP会员享有：无限下载、高清导出、专属模板、批量设计、团队协作、优先客服等特权。', expanded: false },
  { category: '设计', question: '如何提高导出图片质量？', answer: '导出时选择高清格式（PNG），设置DPI为300，确保原始素材分辨率足够高。VIP会员可导出更高清的图片。', expanded: false },
  { category: '设计', question: '支持哪些导出格式？', answer: '支持PNG、JPG、PDF、GIF四种格式。PNG适合透明背景图片，JPG适合普通图片，PDF适合打印输出，GIF适合动态图片。', expanded: false },
  { category: '会员', question: '如何取消VIP订阅？', answer: '进入用户中心 → 会员管理 → 取消续费，取消后当前会员期仍有效，到期后不再自动续费。', expanded: false },
  { category: '账户', question: '忘记密码怎么办？', answer: '点击登录页面的"忘记密码"，输入注册邮箱，系统将发送重置密码链接到您的邮箱。', expanded: false }
])

const filteredFaqs = computed(() => {
  if (!faqSearch.value) return faqs.value
  return faqs.value.filter(f => f.question.includes(faqSearch.value) || f.answer.includes(faqSearch.value))
})

const chatInput = ref('')
const chatMessages = ref<any[]>([])

const quickQuestions = [
  '如何开通VIP？',
  '导出质量问题',
  '模板使用帮助',
  '退款政策咨询'
]

const viewTicket = (ticket: any) => {
  // 查看工单详情
}

const handleSubmitTicket = () => {
  if (!newTicket.value.title || !newTicket.value.content) return
  
  tickets.value.unshift({
    id: tickets.value.length + 1,
    type: newTicket.value.type,
    title: newTicket.value.title,
    content: newTicket.value.content,
    status: 'pending',
    statusText: '待处理',
    createTime: new Date().toLocaleDateString(),
    replyCount: 0
  })
  
  showNewTicket.value = false
  newTicket.value = { type: '设计功能', title: '', content: '' }
}

const sendQuickMessage = (msg: string) => {
  chatMessages.value.push({
    id: chatMessages.value.length,
    content: msg,
    time: new Date().toLocaleTimeString().slice(0, 5)
  })
}

const sendMessage = () => {
  if (!chatInput.value.trim()) return
  
  chatMessages.value.push({
    id: chatMessages.value.length,
    content: chatInput.value,
    time: new Date().toLocaleTimeString().slice(0, 5)
  })
  chatInput.value = ''
}
</script>