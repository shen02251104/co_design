<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 顶部导航 -->
    <div class="bg-white border-b">
      <div class="max-w-7xl mx-auto px-6 py-4">
        <NuxtLink to="/" class="flex items-center gap-2 text-gray-600 hover:text-gray-800">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          返回首页
        </NuxtLink>
      </div>
    </div>

    <div class="max-w-4xl mx-auto px-6 py-12">
      <!-- 页面标题 -->
      <div class="text-center mb-12">
        <h1 class="text-3xl font-bold text-gray-800 mb-4">帮助中心</h1>
        <p class="text-gray-500">常见问题解答与使用指南</p>
      </div>

      <!-- 搜索框 -->
      <div class="mb-8">
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="搜索问题..."
            class="w-full px-4 py-3 pl-12 bg-white border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
          />
          <svg class="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="M21 21l-4.35-4.35"/>
          </svg>
        </div>
      </div>

      <!-- FAQ分类 -->
      <div class="space-y-6">
        <!-- 新手入门 -->
        <div class="bg-white rounded-xl p-6 shadow-sm">
          <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <svg class="w-6 h-6 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
            </svg>
            新手入门
          </h2>
          <div class="space-y-3">
            <FAQItem question="如何开始使用易可图？" answer="注册账号后，您可以选择模板中心的海报模板，或使用AI工具快速生成设计。选择模板后进入编辑器，可以修改文字、图片、颜色等元素，完成后导出即可。" />
            <FAQItem question="免费用户有哪些功能限制？" answer="免费用户可以使用基础模板、基础AI工具（每日3次）、基础图片工具。VIP会员可解锁更多高级模板、无限AI次数、高清导出等权益。" />
            <FAQItem question="如何注册账号？" answer="点击页面右上角「登录」按钮，选择「注册」，输入邮箱和密码即可完成注册。注册后可获得免费会员资格。" />
          </div>
        </div>

        <!-- VIP会员 -->
        <div class="bg-white rounded-xl p-6 shadow-sm">
          <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <svg class="w-6 h-6 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            VIP会员
          </h2>
          <div class="space-y-3">
            <FAQItem question="VIP会员有哪些权益？" answer="VIP会员享有：无限AI设计次数、高清无水印导出、专属VIP模板库、批量下载功能、优先客服支持、商用授权证书等权益。" />
            <FAQItem question="如何购买VIP会员？" answer="点击页面右上角「升级会员」或访问会员套餐页面，选择合适的套餐后完成支付即可立即生效。" />
            <FAQItem question="VIP会员可以退款吗？" answer="VIP会员服务一经开通即生效，不支持退款。如有特殊情况，请联系客服处理。" />
            <FAQItem question="如何查看我的会员状态？" answer="登录后访问个人中心页面，可查看当前会员等级、到期时间、AI使用次数等信息。" />
          </div>
        </div>

        <!-- 设计导出 -->
        <div class="bg-white rounded-xl p-6 shadow-sm">
          <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <svg class="w-6 h-6 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
            </svg>
            设计导出
          </h2>
          <div class="space-y-3">
            <FAQItem question="导出的图片有水印吗？" answer="免费用户导出的图片会带有水印，VIP会员导出的图片无水印且支持高清分辨率。" />
            <FAQItem question="支持哪些导出格式？" answer="支持PNG、JPG、PDF格式导出。VIP会员还支持SVG矢量格式和高分辨率PDF。" />
            <FAQItem question="导出的图片可以商用吗？" answer="VIP会员导出的图片可用于商业用途，并附带商用授权证书。免费用户仅限个人非商用用途。" />
          </div>
        </div>

        <!-- AI工具 -->
        <div class="bg-white rounded-xl p-6 shadow-sm">
          <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <svg class="w-6 h-6 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2a2 2 0 012 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 017 7h1a1 1 0 011 1v3a1 1 0 01-1 1h-1v1a2 2 0 01-2 2H5a2 2 0 01-2-2v-1H2a1 1 0 01-1-1v-3a1 1 0 011-1h1a7 7 0 017-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 012-2z"/>
              <circle cx="7.5" cy="14.5" r="1.5"/>
              <circle cx="16.5" cy="14.5" r="1.5"/>
            </svg>
            AI工具
          </h2>
          <div class="space-y-3">
            <FAQItem question="AI设计如何使用？" answer="进入AI工具页面，选择设计类型（如海报、Banner、电商图），输入文字描述或上传参考图，AI会在数秒内生成多个设计方案供您选择。" />
            <FAQItem question="AI次数用完了怎么办？" answer="您可以购买AI次数包，或升级VIP会员获得无限AI次数。" />
            <FAQItem question="AI生成的图片质量如何？" answer="AI生成的图片支持高清分辨率，适合电商、社交媒体、广告等多种场景使用。" />
          </div>
        </div>

        <!-- 账号相关 -->
        <div class="bg-white rounded-xl p-6 shadow-sm">
          <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <svg class="w-6 h-6 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            账号相关
          </h2>
          <div class="space-y-3">
            <FAQItem question="如何修改密码？" answer="登录后访问个人中心，点击「账号设置」即可修改密码。" />
            <FAQItem question="忘记密码怎么办？" answer="在登录页面点击「忘记密码」，输入注册邮箱，系统会发送重置密码链接。" />
            <FAQItem question="如何注销账号？" answer="请联系客服申请账号注销，注销后账号数据将无法恢复。" />
          </div>
        </div>

        <!-- 支付问题 -->
        <div class="bg-white rounded-xl p-6 shadow-sm">
          <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <svg class="w-6 h-6 text-pink-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
              <line x1="1" y1="10" x2="23" y2="10"/>
            </svg>
            支付问题
          </h2>
          <div class="space-y-3">
            <FAQItem question="支持哪些支付方式？" answer="支持支付宝、微信支付两种主流支付方式。" />
            <FAQItem question="支付失败怎么办？" answer="请检查支付账户余额或网络连接。如仍有问题，请联系客服处理。" />
            <FAQItem question="如何查看订单记录？" answer="登录后访问个人中心，在「我的订单」中可查看所有订单记录。" />
          </div>
        </div>
      </div>

      <!-- 联系客服 -->
      <div class="mt-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl p-8 text-center text-white">
        <h3 class="text-xl font-bold mb-2">还有问题？</h3>
        <p class="mb-6">我们的客服团队随时为您解答</p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            @click="openCustomerService"
            class="px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
            在线客服
          </button>
          <a
            href="mailto:support@yiketu.com"
            class="px-6 py-3 bg-white/20 text-white rounded-lg font-medium hover:bg-white/30 transition-colors"
          >
            邮件咨询
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import FAQItem from '~/components/FAQItem.vue'

const searchQuery = ref('')

const openCustomerService = () => {
  alert('客服功能即将上线，请通过邮件 support@yiketu.com 联系我们')
}
</script>