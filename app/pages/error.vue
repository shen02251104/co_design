<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
    <div class="text-center px-6 py-12 max-w-lg">
      <!-- 404 图标 -->
      <div class="mb-8">
        <div class="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
          404
        </div>
        <div class="mt-4 w-24 h-24 mx-auto relative">
          <svg class="w-full h-full text-gray-300" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="45" stroke="currentColor" stroke-width="3" />
            <path d="M35 35L65 65M65 35L35 65" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
          </svg>
        </div>
      </div>

      <!-- 文字说明 -->
      <h1 class="text-2xl font-bold text-gray-800 mb-4">页面未找到</h1>
      <p class="text-gray-500 mb-8">
        您访问的页面不存在或已被移除，请检查链接是否正确。
      </p>

      <!-- 操作按钮 -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <NuxtLink
          to="/"
          class="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
        >
          返回首页
        </NuxtLink>
        <button
          @click="goBack"
          class="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
        >
          返回上一页
        </button>
      </div>

      <!-- 搜索建议 -->
      <div class="mt-12 p-6 bg-white rounded-xl shadow-sm">
        <h3 class="text-lg font-medium text-gray-800 mb-4">您可能在寻找：</h3>
        <div class="grid grid-cols-2 gap-3 text-sm">
          <NuxtLink to="/templates" class="p-3 bg-gray-50 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors">
            模板中心
          </NuxtLink>
          <NuxtLink to="/ai-tools" class="p-3 bg-gray-50 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors">
            AI工具
          </NuxtLink>
          <NuxtLink to="/membership-pricing" class="p-3 bg-gray-50 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors">
            会员套餐
          </NuxtLink>
          <NuxtLink to="/user-center" class="p-3 bg-gray-50 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors">
            个人中心
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const goBack = () => {
  if (window.history.length > 1) {
    window.history.back()
  } else {
    navigateTo('/')
  }
}
</script>