<template>
  <footer class="bg-gray-800 text-white py-8 mt-auto">
    <div class="max-w-7xl mx-auto px-6">
      <!-- 上部分：链接区域 -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <!-- 关于我们 -->
        <div>
          <h4 class="font-bold mb-4 text-gray-300">关于我们</h4>
          <ul class="space-y-2 text-sm text-gray-400">
            <li>
              <NuxtLink to="/about-us" class="hover:text-white transition-colors">
                公司介绍
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/help-center" class="hover:text-white transition-colors">
                帮助中心
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/contact-us" class="hover:text-white transition-colors">
                联系我们
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- 产品服务 -->
        <div>
          <h4 class="font-bold mb-4 text-gray-300">产品服务</h4>
          <ul class="space-y-2 text-sm text-gray-400">
            <li>
              <NuxtLink to="/templates" class="hover:text-white transition-colors">
                模板中心
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/ai-tools" class="hover:text-white transition-colors">
                AI工具
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/membership-pricing" class="hover:text-white transition-colors">
                VIP会员
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- 法律条款 -->
        <div>
          <h4 class="font-bold mb-4 text-gray-300">法律条款</h4>
          <ul class="space-y-2 text-sm text-gray-400">
            <li>
              <NuxtLink to="/user-agreement" class="hover:text-white transition-colors">
                用户协议
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/privacy-policy" class="hover:text-white transition-colors">
                隐私政策
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/copyright" class="hover:text-white transition-colors">
                版权声明
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- 联系方式 -->
        <div>
          <h4 class="font-bold mb-4 text-gray-300">联系我们</h4>
          <ul class="space-y-2 text-sm text-gray-400">
            <li class="flex items-center gap-2">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              support@yiketu.com
            </li>
            <li class="flex items-center gap-2">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
              </svg>
              400-888-8888
            </li>
          </ul>
          
          <!-- 社交媒体 -->
          <div class="flex gap-3 mt-4">
            <a href="#" class="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.427 8.588 8.572 11.412h-7.013l-5.327-6.85-5.947 6.85H1.75l7.914-9.168L1.25 2.25h7.118l4.736 6.188 5.14-6.188z"/>
              </svg>
            </a>
            <a href="#" class="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center hover:bg-green-500 transition-colors">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.6c0 2.372 1.522 4.548 4.25 5.922-.188.688-.469 1.852-.547 2.164-.094.383.148.383.422.273.281-.109 1.891-1.109 2.664-1.539.383.055.75.094 1.102.117 4.359-.023 7.859-3.289 7.859-7.297 0-4.117-3.891-7.453-8.691-7.453z"/>
              </svg>
            </a>
            <a href="#" class="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center hover:bg-red-500 transition-colors">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.6.05-1.05-.4-1.64-.79-.91-.6-1.43-.97-2.33-1.56-1.03-.68-.36-1.05.23-1.66.16-.16 2.84-2.68 2.89-2.92a.22.22 0 00-.05-.19c-.07-.06-.16-.04-.24-.02-.1.02-1.63 1.05-4.61 3.07-.44.3-.83.45-1.19.44-.39-.01-1.14-.22-1.69-.41-.68-.23-1.22-.36-1.17-.77.02-.22.3-.45.83-.68 3.24-1.44 5.4-2.39 6.47-2.85 3.07-1.29 3.72-1.52 4.15-1.53.09 0 .3.02.43.13.11.09.14.21.15.3-.01.06.01.24 0 .38z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <!-- 分隔线 -->
      <div class="border-t border-gray-700 pt-6">
        <!-- 版权信息 -->
        <div class="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <div class="flex items-center gap-4">
            <span>© 2024 易可图 Yiketu.com</span>
            <span class="text-gray-600">|</span>
            <span>版权所有</span>
          </div>
          <div class="flex items-center gap-4">
            <span>ICP备案号：京ICP备XXXXXXXX号</span>
            <span class="text-gray-600">|</span>
            <span>增值电信业务经营许可证：京B2-XXXXXXXX</span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
</script>