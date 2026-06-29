<template>
  <div class="fixed bottom-6 left-6 z-50 flex gap-2">
    <!-- 分享按钮 -->
    <button
      @click="showShareMenu = !showShareMenu"
      class="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors group"
      title="分享"
    >
      <svg class="w-5 h-5 text-gray-400 group-hover:text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="18" cy="5" r="3"/>
        <circle cx="6" cy="12" r="3"/>
        <circle cx="18" cy="19" r="3"/>
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
      </svg>
    </button>

    <!-- 分享菜单 -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="showShareMenu"
        class="absolute bottom-12 left-0 bg-white rounded-xl shadow-xl p-3 flex gap-2"
      >
        <!-- 微信 -->
        <button
          @click="shareToWechat"
          class="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center hover:bg-green-600 transition-colors"
          title="分享到微信"
        >
          <svg class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.6c0 2.372 1.522 4.548 4.25 5.922-.188.688-.469 1.852-.547 2.164-.094.383.148.383.422.273.281-.109 1.891-1.109 2.664-1.539.383.055.75.094 1.102.117 4.359-.023 7.859-3.289 7.859-7.297 0-4.117-3.891-7.453-8.691-7.453z"/>
          </svg>
        </button>

        <!-- 微博 -->
        <button
          @click="shareToWeibo"
          class="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center hover:bg-red-600 transition-colors"
          title="分享到微博"
        >
          <svg class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.194 14.197c0 3.248-4.145 5.896-9.243 5.896-5.098 0-9.243-2.648-9.243-5.896 0-3.248 4.145-5.896 9.243-5.896 5.098 0 9.243 2.648 9.243 5.896z"/>
          </svg>
        </button>

        <!-- QQ -->
        <button
          @click="shareToQQ"
          class="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
          title="分享到QQ"
        >
          <svg class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
          </svg>
        </button>

        <!-- 复制链接 -->
        <button
          @click="copyLink"
          class="w-10 h-10 bg-gray-500 rounded-lg flex items-center justify-center hover:bg-gray-600 transition-colors"
          title="复制链接"
        >
          <svg class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
            <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
          </svg>
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const showShareMenu = ref(false)

const shareToWechat = () => {
  // 微信分享需要对接微信SDK
  alert('请使用微信扫描页面二维码分享')
  showShareMenu.value = false
}

const shareToWeibo = () => {
  const url = encodeURIComponent(window.location.href)
  const title = encodeURIComponent('易可图 - 电商人都在用的设计平台')
  window.open(`https://service.weibo.com/share/share.php?url=${url}&title=${title}`, '_blank')
  showShareMenu.value = false
}

const shareToQQ = () => {
  const url = encodeURIComponent(window.location.href)
  const title = encodeURIComponent('易可图 - 电商人都在用的设计平台')
  window.open(`https://connect.qq.com/widget/shareqq/index.html?url=${url}&title=${title}`, '_blank')
  showShareMenu.value = false
}

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href)
    alert('链接已复制到剪贴板')
  } catch {
    alert('复制失败，请手动复制链接')
  }
  showShareMenu.value = false
}
</script>