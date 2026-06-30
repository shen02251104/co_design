<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-4xl mx-auto px-6 py-12">
      <h1 class="text-3xl font-semibold text-gray-900 mb-8">联系我们</h1>
      
      <div class="grid grid-cols-2 gap-6 mb-8">
        <div class="bg-white rounded-xl p-6 shadow-sm">
          <div class="flex items-center gap-4 mb-4">
            <div class="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-medium text-gray-900">邮箱</h3>
              <p class="text-gray-600">support@yiketu.com</p>
            </div>
          </div>
          <p class="text-sm text-gray-500">工作时间内24小时回复</p>
        </div>
        
        <div class="bg-white rounded-xl p-6 shadow-sm">
          <div class="flex items-center gap-4 mb-4">
            <div class="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-medium text-gray-900">客服热线</h3>
              <p class="text-gray-600">400-888-8888</p>
            </div>
          </div>
          <p class="text-sm text-gray-500">周一至周五 9:00-18:00</p>
        </div>
        
        <div class="bg-white rounded-xl p-6 shadow-sm">
          <div class="flex items-center gap-4 mb-4">
            <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.6c0 2.656 1.609 5.027 4.073 6.469-.178.636-.718 2.388-.752 2.57-.044.244.026.286.18.194.146-.089 2.28-1.489 3.248-2.115.673.093 1.36.141 2.042.141 4.8 0 8.691-3.288 8.691-7.412s-3.891-7.412-8.691-7.412z"/>
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-medium text-gray-900">微信公众号</h3>
              <p class="text-gray-600">易设计官方</p>
            </div>
          </div>
          <p class="text-sm text-gray-500">获取最新资讯与教程</p>
        </div>
        
        <div class="bg-white rounded-xl p-6 shadow-sm">
          <div class="flex items-center gap-4 mb-4">
            <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.492c-1.53-.69-3.17-1.19-4.9-1.46-.21.38-.41.78-.61 1.18-1.78-.27-3.55-.27-5.32 0-.2-.4-.4-.8-.61-1.18-1.73.27-3.37.77-4.91 1.46C.24 9.1-.07 13.56.07 18c1.73 1.21 3.46 2.03 5.19 2.57.43-.57.82-1.17 1.17-1.8-.64-.24-1.27-.53-1.87-.87.16-.11.31-.23.46-.35 3.56 1.63 7.43 1.63 10.95 0.15.11.23.31.35.46.6.6.34 1.23.63 1.87.87.35.63.74 1.23 1.17 1.8 1.73-.54 3.46-1.36 5.19-2.57.17-4.44-.14-8.9-2.01-13.51zM8.01 15.33c-1.08 0-1.98-1.01-1.98-2.24s.87-2.24 1.98-2.24 1.98 1.01 1.98 2.24-.87 2.24-1.98 2.24zm7.97 0c-1.08 0-1.98-1.01-1.98-2.24s.87-2.24 1.98-2.24 1.98 1.01 1.98 2.24-.87 2.24-1.98 2.24z"/>
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-medium text-gray-900">官方社群</h3>
              <p class="text-gray-600">加入设计师交流群</p>
            </div>
          </div>
          <p class="text-sm text-gray-500">与同行交流设计心得</p>
        </div>
      </div>
      
      <div class="bg-white rounded-xl p-8 shadow-sm">
        <h2 class="text-xl font-semibold text-gray-900 mb-6">留言反馈</h2>
        <form class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">姓名</label>
              <input type="text" class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="请输入姓名" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">邮箱</label>
              <input type="email" class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="请输入邮箱" />
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">主题</label>
            <input type="text" class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="请输入主题" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">内容</label>
            <textarea rows="4" class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="请输入您的问题或建议"></textarea>
          </div>
          <button type="submit" class="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
            提交反馈
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>