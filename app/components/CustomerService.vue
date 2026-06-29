<template>
  <div class="fixed bottom-6 right-6 z-50">
    <!-- 客服按钮 -->
    <button
      @click="isOpen = !isOpen"
      class="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center group"
      :class="{ 'scale-90': isOpen }"
    >
      <svg
        v-if="!isOpen"
        class="w-6 h-6 text-white"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
      </svg>
      <svg
        v-else
        class="w-6 h-6 text-white"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <path d="M18 6L6 18M6 6l12 12"/>
      </svg>
    </button>

    <!-- 客服面板 -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 scale-95 translate-y-2"
      enter-to-class="opacity-100 scale-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 scale-100 translate-y-0"
      leave-to-class="opacity-0 scale-95 translate-y-2"
    >
      <div
        v-if="isOpen"
        class="absolute bottom-16 right-0 w-80 bg-white rounded-xl shadow-2xl overflow-hidden"
      >
        <!-- 头部 -->
        <div class="bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-3">
          <h3 class="text-white font-bold">在线客服</h3>
          <p class="text-white/80 text-sm">工作时间：9:00-18:00</p>
        </div>

        <!-- 内容 -->
        <div class="p-4 space-y-3">
          <!-- 快捷入口 -->
          <NuxtLink
            to="/help-center"
            class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors group"
          >
            <svg class="w-5 h-5 text-gray-400 group-hover:text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            <span class="text-gray-600 group-hover:text-blue-600 font-medium">帮助中心</span>
          </NuxtLink>

          <!-- QQ客服 -->
          <a
            href="https://qm.qq.com/cgi-bin/qm/qr?k=yiketu"
            target="_blank"
            class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors group"
          >
            <svg class="w-5 h-5 text-gray-400 group-hover:text-blue-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.6.05-1.05-.4-1.64-.79-.91-.6-1.43-.97-2.33-1.56-1.03-.68-.36-1.05.23-1.66.16-.16 2.84-2.68 2.89-2.92a.22.22 0 00-.05-.19c-.07-.06-.16-.04-.24-.02-.1.02-1.63 1.05-4.61 3.07-.44.3-.83.45-1.19.44-.39-.01-1.14-.22-1.69-.41-.68-.23-1.22-.36-1.17-.77.02-.22.3-.45.83-.68 3.24-1.44 5.4-2.39 6.47-2.85 3.07-1.29 3.72-1.52 4.15-1.53.09 0 .3.02.43.13.11.09.14.21.15.3-.01.06.01.24 0 .38z"/>
            </svg>
            <span class="text-gray-600 group-hover:text-blue-600 font-medium">QQ客服</span>
          </a>

          <!-- 微信客服 -->
          <div
            @click="showWechat = true"
            class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-green-50 transition-colors cursor-pointer group"
          >
            <svg class="w-5 h-5 text-gray-400 group-hover:text-green-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.6c0 2.372 1.522 4.548 4.25 5.922-.188.688-.469 1.852-.547 2.164-.094.383.148.383.422.273.281-.109 1.891-1.109 2.664-1.539.383.055.75.094 1.102.117 4.359-.023 7.859-3.289 7.859-7.297 0-4.117-3.891-7.453-8.691-7.453zm-2.547 4.891c.711 0 1.289.578 1.289 1.289s-.578 1.289-1.289 1.289-1.289-.578-1.289-1.289.578-1.289 1.289-1.289zm5.094 0c.711 0 1.289.578 1.289 1.289s-.578 1.289-1.289 1.289-1.289-.578-1.289-1.289.578-1.289 1.289-1.289zM24 13.617c0-3.367-3.25-6.117-7.266-6.117-.398 0-.789.031-1.164.086-4.711.539-7.836 3.836-7.836 7.711 0 3.914 3.25 7.117 7.266 7.117.383 0 .75-.031 1.109-.078.625.398 2.039 1.203 2.266 1.297.227.094.445.094.352-.297-.078-.281-.359-1.398-.469-1.922C21.383 19.578 24 16.719 24 13.617zm-9.164-1.352c.555 0 1.008.453 1.008 1.008s-.453 1.008-1.008 1.008-1.008-.453-1.008-1.008.453-1.008 1.008-1.008zm4.219 0c.555 0 1.008.453 1.008 1.008s-.453 1.008-1.008 1.008-1.008-.453-1.008-1.008.453-1.008 1.008-1.008z"/>
            </svg>
            <span class="text-gray-600 group-hover:text-green-600 font-medium">微信客服</span>
          </div>

          <!-- 邮件 -->
          <a
            href="mailto:support@yiketu.com"
            class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors group"
          >
            <svg class="w-5 h-5 text-gray-400 group-hover:text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            <span class="text-gray-600 group-hover:text-blue-600 font-medium">support@yiketu.com</span>
          </a>
        </div>

        <!-- 底部 -->
        <div class="px-4 py-3 bg-gray-50 text-center text-xs text-gray-500">
          平均响应时间 &lt; 5分钟
        </div>
      </div>
    </Transition>

    <!-- 微信二维码弹窗 -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="showWechat"
        class="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]"
        @click="showWechat = false"
      >
        <div class="bg-white rounded-xl p-6 max-w-sm" @click.stop>
          <h3 class="text-lg font-bold text-gray-800 mb-4 text-center">微信客服</h3>
          <div class="w-48 h-48 bg-gray-100 mx-auto rounded-lg flex items-center justify-center">
            <p class="text-gray-500 text-sm">扫码添加客服微信</p>
          </div>
          <p class="text-gray-500 text-sm mt-4 text-center">客服微信号：yiketu_service</p>
          <button
            @click="showWechat = false"
            class="w-full mt-4 py-2 bg-gray-100 rounded-lg text-gray-600 hover:bg-gray-200 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const isOpen = ref(false)
const showWechat = ref(false)
</script>