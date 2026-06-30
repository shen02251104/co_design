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

  <!-- 微信二维码弹窗 -->
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="showWechatQR" class="fixed inset-0 z-[2147483647] flex items-center justify-center">
        <div class="absolute inset-0 bg-black/50" @click="showWechatQR = false"></div>
        <div class="relative bg-white rounded-xl shadow-xl p-6 w-72">
          <h4 class="text-center text-gray-900 font-medium mb-4">微信扫码分享</h4>
          <div class="bg-white p-4 rounded-lg border border-gray-100">
            <img :src="qrCodeUrl" alt="二维码" class="w-48 h-48 mx-auto" />
          </div>
          <p class="text-center text-gray-500 text-sm mt-4">打开微信，扫描二维码即可分享</p>
          <button
            class="absolute top-2 right-2 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
            @click="showWechatQR = false"
          >
            <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>

  <!-- 复制成功提示 -->
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-2"
    >
      <div v-if="showCopySuccess" class="fixed bottom-20 left-1/2 -translate-x-1/2 z-[2147483647] bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
        </svg>
        <span>链接已复制</span>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showShareMenu = ref(false)
const showWechatQR = ref(false)
const showCopySuccess = ref(false)
const shareUrl = ref('')
const pageTitle = ref('')

// 初始化分享信息
const initShareInfo = () => {
  shareUrl.value = window.location.href
  pageTitle.value = document.title || '易可图 - 电商人都在用的设计平台'
}

// 微信分享 - 显示二维码弹窗
const shareToWechat = () => {
  initShareInfo()
  showWechatQR.value = true
  showShareMenu.value = false
}

// 生成二维码URL（使用第三方二维码服务）
const qrCodeUrl = computed(() => {
  const url = encodeURIComponent(shareUrl.value)
  return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${url}`
})

// 微博分享 - 打开微博分享页面
const shareToWeibo = () => {
  initShareInfo()
  const url = encodeURIComponent(shareUrl.value)
  const title = encodeURIComponent(pageTitle.value)
  const pic = encodeURIComponent('') // 可以添加分享图片
  window.open(`https://service.weibo.com/share/share.php?url=${url}&title=${title}&pic=${pic}`, '_blank', 'width=600,height=400')
  showShareMenu.value = false
}

// QQ分享 - 打开QQ分享页面
const shareToQQ = () => {
  initShareInfo()
  const url = encodeURIComponent(shareUrl.value)
  const title = encodeURIComponent(pageTitle.value)
  const desc = encodeURIComponent('电商人都在用的智能设计平台，3秒生成专业海报')
  window.open(`https://connect.qq.com/widget/shareqq/index.html?url=${url}&title=${title}&desc=${desc}`, '_blank', 'width=600,height=400')
  showShareMenu.value = false
}

// 复制链接 - 使用剪贴板API
const copyLink = async () => {
  initShareInfo()
  try {
    await navigator.clipboard.writeText(shareUrl.value)
    showCopySuccess.value = true
    setTimeout(() => {
      showCopySuccess.value = false
    }, 2000)
  } catch {
    // 降级方案：使用传统复制方法
    const textArea = document.createElement('textarea')
    textArea.value = shareUrl.value
    textArea.style.position = 'fixed'
    textArea.style.left = '-9999px'
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()
    try {
      document.execCommand('copy')
      showCopySuccess.value = true
      setTimeout(() => {
        showCopySuccess.value = false
      }, 2000)
    } catch {
      alert('复制失败，请手动复制链接：' + shareUrl.value)
    }
    document.body.removeChild(textArea)
  }
  showShareMenu.value = false
}
</script>