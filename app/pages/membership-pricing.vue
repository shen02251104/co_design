<template>
  <div class="min-h-screen bg-gradient-to-b from-slate-50 to-white">
    <!-- Header -->
    <div class="bg-white border-b border-slate-100 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <NuxtLink to="/" class="flex items-center gap-2">
          <div class="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
            <span class="text-white text-sm font-bold">易</span>
          </div>
          <span class="font-bold text-lg bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">易可图</span>
        </NuxtLink>
        <div class="flex items-center gap-4">
          <NuxtLink to="/" class="text-slate-600 hover:text-purple-600 transition">首页</NuxtLink>
          <NuxtLink to="/poster-design" class="text-slate-600 hover:text-purple-600 transition">海报设计</NuxtLink>
          <span class="text-purple-600 font-medium">会员价格</span>
        </div>
      </div>
    </div>

    <!-- Hero Section -->
    <div class="max-w-7xl mx-auto px-4 pt-12 pb-8">
      <div class="text-center">
        <h1 class="text-4xl font-bold text-slate-900 mb-4">选择适合你的会员方案</h1>
        <p class="text-xl text-slate-600 mb-6">AI智能设计 + 海量模板 + 正版商用授权，一站式解决设计需求</p>
        <div class="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <span>限时优惠：年付立省40%，终身版限时389元</span>
        </div>
      </div>
    </div>

    <!-- Pricing Cards -->
    <div class="max-w-7xl mx-auto px-4 pb-16">
      <!-- Toggle: Monthly / Yearly -->
      <div class="flex justify-center mb-8">
        <div class="inline-flex bg-slate-100 rounded-lg p-1">
          <button 
            @click="billingCycle = 'monthly'"
            :class="billingCycle === 'monthly' ? 'bg-white shadow-sm text-purple-600' : 'text-slate-600'"
            class="px-6 py-2 rounded-lg font-medium transition-all"
          >
            月付
          </button>
          <button 
            @click="billingCycle = 'yearly'"
            :class="billingCycle === 'yearly' ? 'bg-white shadow-sm text-purple-600' : 'text-slate-600'"
            class="px-6 py-2 rounded-lg font-medium transition-all"
          >
            年付 <span class="text-green-500 text-sm">省40%</span>
          </button>
        </div>
      </div>

      <!-- Pricing Plans -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <!-- Free Plan -->
        <div class="bg-white rounded-2xl border border-slate-200 p-6 hover:border-slate-300 transition-all">
          <div class="mb-6">
            <h3 class="text-lg font-bold text-slate-900 mb-2">免费版</h3>
            <p class="text-slate-500 text-sm">适合个人体验、偶尔作图</p>
          </div>
          <div class="mb-6">
            <span class="text-4xl font-bold text-slate-900">¥0</span>
            <span class="text-slate-500">/永久</span>
          </div>
          <ul class="space-y-3 mb-6">
            <li class="flex items-center gap-2 text-slate-600">
              <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span>AI设计 <span class="text-purple-600 font-medium">5次/月</span></span>
            </li>
            <li class="flex items-center gap-2 text-slate-600">
              <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span>普通模板库</span>
            </li>
            <li class="flex items-center gap-2 text-slate-600">
              <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span>基础编辑器</span>
            </li>
            <li class="flex items-center gap-2 text-slate-400">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
              <span>导出带水印</span>
            </li>
            <li class="flex items-center gap-2 text-slate-400">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
              <span>仅限个人非商用</span>
            </li>
          </ul>
          <button class="w-full py-3 rounded-lg border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition">
            免费使用
          </button>
        </div>

        <!-- Basic Plan -->
        <div class="bg-white rounded-2xl border border-purple-200 p-6 hover:border-purple-300 transition-all relative">
          <div class="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-xs px-3 py-1 rounded-full">
            推荐
          </div>
          <div class="mb-6">
            <h3 class="text-lg font-bold text-slate-900 mb-2">基础版</h3>
            <p class="text-slate-500 text-sm">适合个人日常作图、小商户</p>
          </div>
          <div class="mb-6">
            <span class="text-4xl font-bold text-purple-600">¥{{ billingCycle === 'yearly' ? '159' : '19' }}</span>
            <span class="text-slate-500">/{{ billingCycle === 'yearly' ? '年' : '月' }}</span>
            <div v-if="billingCycle === 'yearly'" class="text-green-500 text-sm mt-1">
              相当于 ¥13.25/月，省 ¥69
            </div>
          </div>
          <ul class="space-y-3 mb-6">
            <li class="flex items-center gap-2 text-slate-600">
              <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span>AI设计 <span class="text-purple-600 font-medium">50次/月</span></span>
            </li>
            <li class="flex items-center gap-2 text-slate-600">
              <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span>高级模板库</span>
            </li>
            <li class="flex items-center gap-2 text-slate-600">
              <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span>无水印下载</span>
            </li>
            <li class="flex items-center gap-2 text-slate-600">
              <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span>基础商用授权</span>
            </li>
            <li class="flex items-center gap-2 text-slate-400">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
              <span>VIP模板素材</span>
            </li>
          </ul>
          <button 
            @click="handlePurchase('basic')"
            class="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:opacity-90 transition"
          >
            立即开通
          </button>
        </div>

        <!-- Pro Plan -->
        <div class="bg-white rounded-2xl border border-slate-200 p-6 hover:border-slate-300 transition-all">
          <div class="mb-6">
            <h3 class="text-lg font-bold text-slate-900 mb-2">专业版</h3>
            <p class="text-slate-500 text-sm">适合高频设计、专业创作者</p>
          </div>
          <div class="mb-6">
            <span class="text-4xl font-bold text-slate-900">¥{{ billingCycle === 'yearly' ? '299' : '39' }}</span>
            <span class="text-slate-500">/{{ billingCycle === 'yearly' ? '年' : '月' }}</span>
            <div v-if="billingCycle === 'yearly'" class="text-green-500 text-sm mt-1">
              相当于 ¥24.92/月，省 ¥169
            </div>
          </div>
          <ul class="space-y-3 mb-6">
            <li class="flex items-center gap-2 text-slate-600">
              <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span>AI设计 <span class="text-purple-600 font-medium">200次/月</span></span>
            </li>
            <li class="flex items-center gap-2 text-slate-600">
              <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span>VIP模板库 + 素材库</span>
            </li>
            <li class="flex items-center gap-2 text-slate-600">
              <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span>高清无水印下载</span>
            </li>
            <li class="flex items-center gap-2 text-slate-600">
              <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span>专业商用授权</span>
            </li>
            <li class="flex items-center gap-2 text-slate-600">
              <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span>批量导出功能</span>
            </li>
          </ul>
          <button 
            @click="handlePurchase('pro')"
            class="w-full py-3 rounded-lg bg-slate-900 text-white font-medium hover:bg-slate-800 transition"
          >
            立即开通
          </button>
        </div>

        <!-- Lifetime Plan -->
        <div class="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-6 text-white relative overflow-hidden">
          <div class="absolute top-0 right-0 bg-red-500 text-white text-xs px-3 py-1 rounded-bl-lg">
            限时优惠
          </div>
          <div class="mb-6">
            <h3 class="text-lg font-bold mb-2">终身版</h3>
            <p class="text-purple-100 text-sm">一次付费，永久使用，最划算</p>
          </div>
          <div class="mb-6">
            <span class="text-4xl font-bold">¥389</span>
            <span class="text-purple-100">/终身</span>
            <div class="text-green-300 text-sm mt-1">
              原价 ¥599，限时立省 ¥210
            </div>
          </div>
          <ul class="space-y-3 mb-6">
            <li class="flex items-center gap-2">
              <svg class="w-5 h-5 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span>AI设计 <span class="font-bold">无限次</span></span>
            </li>
            <li class="flex items-center gap-2">
              <svg class="w-5 h-5 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span>全部模板 + 素材库</span>
            </li>
            <li class="flex items-center gap-2">
              <svg class="w-5 h-5 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span>高清无水印下载</span>
            </li>
            <li class="flex items-center gap-2">
              <svg class="w-5 h-5 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span>VIP商用授权证书</span>
            </li>
            <li class="flex items-center gap-2">
              <svg class="w-5 h-5 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span>所有新功能免费升级</span>
            </li>
            <li class="flex items-center gap-2">
              <svg class="w-5 h-5 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span>优先客服支持</span>
            </li>
          </ul>
          <button 
            @click="handlePurchase('lifetime')"
            class="w-full py-3 rounded-lg bg-white text-purple-600 font-bold hover:bg-purple-50 transition"
          >
            立即抢购
          </button>
        </div>
      </div>

      <!-- Feature Comparison Table -->
      <div class="bg-white rounded-2xl border border-slate-200 overflow-hidden mb-12">
        <div class="p-6 bg-slate-50 border-b border-slate-200">
          <h2 class="text-xl font-bold text-slate-900">功能权益对比</h2>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="bg-slate-50">
                <th class="px-6 py-4 text-left text-slate-600 font-medium">功能权益</th>
                <th class="px-6 py-4 text-center text-slate-600 font-medium">免费版</th>
                <th class="px-6 py-4 text-center text-purple-600 font-medium">基础版</th>
                <th class="px-6 py-4 text-center text-slate-600 font-medium">专业版</th>
                <th class="px-6 py-4 text-center text-purple-600 font-medium">终身版</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b border-slate-100">
                <td class="px-6 py-4 text-slate-900 font-medium">AI智能设计次数</td>
                <td class="px-6 py-4 text-center text-slate-600">5次/月</td>
                <td class="px-6 py-4 text-center text-purple-600 font-medium">50次/月</td>
                <td class="px-6 py-4 text-center text-slate-600">200次/月</td>
                <td class="px-6 py-4 text-center text-purple-600 font-bold">无限次</td>
              </tr>
              <tr class="border-b border-slate-100">
                <td class="px-6 py-4 text-slate-900 font-medium">模板库</td>
                <td class="px-6 py-4 text-center text-slate-600">普通模板</td>
                <td class="px-6 py-4 text-center text-purple-600">高级模板</td>
                <td class="px-6 py-4 text-center text-purple-600">VIP模板</td>
                <td class="px-6 py-4 text-center text-purple-600 font-bold">全部模板</td>
              </tr>
              <tr class="border-b border-slate-100">
                <td class="px-6 py-4 text-slate-900 font-medium">素材库</td>
                <td class="px-6 py-4 text-center text-slate-600">基础素材</td>
                <td class="px-6 py-4 text-center text-slate-600">基础素材</td>
                <td class="px-6 py-4 text-center text-purple-600">VIP素材</td>
                <td class="px-6 py-4 text-center text-purple-600 font-bold">全部素材</td>
              </tr>
              <tr class="border-b border-slate-100">
                <td class="px-6 py-4 text-slate-900 font-medium">导出质量</td>
                <td class="px-6 py-4 text-center text-slate-400">带水印</td>
                <td class="px-6 py-4 text-center text-green-500">无水印</td>
                <td class="px-6 py-4 text-center text-green-500">高清无水印</td>
                <td class="px-6 py-4 text-center text-green-500 font-bold">超高清无水印</td>
              </tr>
              <tr class="border-b border-slate-100">
                <td class="px-6 py-4 text-slate-900 font-medium">商用授权</td>
                <td class="px-6 py-4 text-center text-slate-400">❌ 仅个人</td>
                <td class="px-6 py-4 text-center text-green-500">基础授权</td>
                <td class="px-6 py-4 text-center text-green-500">专业授权</td>
                <td class="px-6 py-4 text-center text-green-500 font-bold">VIP授权证书</td>
              </tr>
              <tr class="border-b border-slate-100">
                <td class="px-6 py-4 text-slate-900 font-medium">批量导出</td>
                <td class="px-6 py-4 text-center text-slate-400">❌</td>
                <td class="px-6 py-4 text-center text-slate-400">❌</td>
                <td class="px-6 py-4 text-center text-green-500">✓</td>
                <td class="px-6 py-4 text-center text-green-500">✓</td>
              </tr>
              <tr class="border-b border-slate-100">
                <td class="px-6 py-4 text-slate-900 font-medium">AI抠图</td>
                <td class="px-6 py-4 text-center text-slate-600">3次/月</td>
                <td class="px-6 py-4 text-center text-purple-600">30次/月</td>
                <td class="px-6 py-4 text-center text-purple-600">100次/月</td>
                <td class="px-6 py-4 text-center text-purple-600 font-bold">无限次</td>
              </tr>
              <tr class="border-b border-slate-100">
                <td class="px-6 py-4 text-slate-900 font-medium">商品套图生成</td>
                <td class="px-6 py-4 text-center text-slate-400">❌</td>
                <td class="px-6 py-4 text-center text-green-500">✓</td>
                <td class="px-6 py-4 text-center text-green-500">✓</td>
                <td class="px-6 py-4 text-center text-green-500">✓</td>
              </tr>
              <tr>
                <td class="px-6 py-4 text-slate-900 font-medium">客服支持</td>
                <td class="px-6 py-4 text-center text-slate-600">在线客服</td>
                <td class="px-6 py-4 text-center text-slate-600">在线客服</td>
                <td class="px-6 py-4 text-center text-purple-600">优先客服</td>
                <td class="px-6 py-4 text-center text-purple-600 font-bold">专属客服</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Pay Per Use Section -->
      <div class="bg-white rounded-2xl border border-slate-200 p-8 mb-12">
        <div class="text-center mb-8">
          <h2 class="text-2xl font-bold text-slate-900 mb-2">按次付费</h2>
          <p class="text-slate-600">不想订阅会员？可以按次购买，灵活使用</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- AI次数包 -->
          <div class="border border-purple-200 rounded-xl p-6 hover:border-purple-400 transition">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <div>
                <h3 class="font-bold text-slate-900">AI设计次数包</h3>
                <p class="text-slate-500 text-sm">灵活购买，随时使用</p>
              </div>
            </div>
            <div class="space-y-2 mb-4">
              <button @click="handlePurchaseCredits('ai_20')" class="w-full flex justify-between items-center p-2 bg-slate-50 rounded hover:bg-slate-100 transition">
                <span class="text-slate-600">20次</span>
                <span class="font-bold text-purple-600">¥10</span>
              </button>
              <button @click="handlePurchaseCredits('ai_50')" class="w-full flex justify-between items-center p-2 bg-purple-50 rounded border border-purple-200 hover:bg-purple-100 transition">
                <span class="text-slate-600">50次 <span class="text-xs text-purple-500">推荐</span></span>
                <span class="font-bold text-purple-600">¥30</span>
              </button>
              <button @click="handlePurchaseCredits('ai_100')" class="w-full flex justify-between items-center p-2 bg-slate-50 rounded hover:bg-slate-100 transition">
                <span class="text-slate-600">100次 <span class="text-xs text-green-500">最划算</span></span>
                <span class="font-bold text-purple-600">¥50</span>
              </button>
            </div>
          </div>

          <!-- 单模板购买 -->
          <div class="border border-slate-200 rounded-xl p-6 hover:border-slate-400 transition">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-12 h-12 bg-gradient-to-br from-orange-500 to-pink-500 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
              </div>
              <div>
                <h3 class="font-bold text-slate-900">单模板购买</h3>
                <p class="text-slate-500 text-sm">仅需一个模板？单买更划算</p>
              </div>
            </div>
            <div class="text-center py-6">
              <span class="text-3xl font-bold text-slate-900">¥10</span>
              <span class="text-slate-500">/个模板</span>
            </div>
            <ul class="space-y-2 mb-4 text-slate-600 text-sm">
              <li class="flex items-center gap-2">
                <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                包含商用授权
              </li>
              <li class="flex items-center gap-2">
                <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                无水印下载
              </li>
              <li class="flex items-center gap-2">
                <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                永久使用
              </li>
            </ul>
            <button @click="handlePurchaseCredits('template')" class="w-full py-2 rounded-lg border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition">
              浏览模板库
            </button>
          </div>

          <!-- 商用授权购买 -->
          <div class="border border-slate-200 rounded-xl p-6 hover:border-slate-400 transition">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                </svg>
              </div>
              <div>
                <h3 class="font-bold text-slate-900">商用授权购买</h3>
                <p class="text-slate-500 text-sm">为单个作品购买商用授权</p>
              </div>
            </div>
            <div class="text-center py-6">
              <span class="text-3xl font-bold text-slate-900">¥5</span>
              <span class="text-slate-500">/单作品</span>
            </div>
            <ul class="space-y-2 mb-4 text-slate-600 text-sm">
              <li class="flex items-center gap-2">
                <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                正版商用授权
              </li>
              <li class="flex items-center gap-2">
                <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                授权证书下载
              </li>
              <li class="flex items-center gap-2">
                <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                版权无忧
              </li>
            </ul>
            <button @click="handlePurchaseCredits('license')" class="w-full py-2 rounded-lg border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition">
              了解详情
            </button>
          </div>
        </div>
      </div>

      <!-- FAQ Section -->
      <div class="bg-white rounded-2xl border border-slate-200 p-8">
        <h2 class="text-2xl font-bold text-slate-900 mb-6 text-center">常见问题</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="p-4 bg-slate-50 rounded-lg">
            <h3 class="font-bold text-slate-900 mb-2">会员支持退款吗？</h3>
            <p class="text-slate-600 text-sm">支持7天无理由退款，购买后7天内可申请全额退款。</p>
          </div>
          <div class="p-4 bg-slate-50 rounded-lg">
            <h3 class="font-bold text-slate-900 mb-2">商用授权包含什么？</h3>
            <p class="text-slate-600 text-sm">包含模板、素材、字体的正版商用授权，可用于线上线下全渠道商业宣传。</p>
          </div>
          <div class="p-4 bg-slate-50 rounded-lg">
            <h3 class="font-bold text-slate-900 mb-2">终身版真的永久有效吗？</h3>
            <p class="text-slate-600 text-sm">是的，一次购买永久有效，包含所有现有功能和后续新功能升级。</p>
          </div>
          <div class="p-4 bg-slate-50 rounded-lg">
            <h3 class="font-bold text-slate-900 mb-2">团队版和企业版有什么区别？</h3>
            <p class="text-slate-600 text-sm">团队版支持3-5人协作，企业版支持10人以上协作，可联系客服定制方案。</p>
          </div>
          <div class="p-4 bg-slate-50 rounded-lg">
            <h3 class="font-bold text-slate-900 mb-2">AI设计次数用完了怎么办？</h3>
            <p class="text-slate-600 text-sm">可以购买次数包，或者升级到更高版本的会员获得更多次数。</p>
          </div>
          <div class="p-4 bg-slate-50 rounded-lg">
            <h3 class="font-bold text-slate-900 mb-2">如何开具发票？</h3>
            <p class="text-slate-600 text-sm">购买后可在订单中心申请开具电子发票，支持增值税普通发票和专用发票。</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Payment Dialog -->
    <PaymentDialog 
      :visible="showPaymentDialog"
      :product-id="selectedProductId"
      :user-id="currentUserId"
      @close="showPaymentDialog = false"
      @success="handlePaymentSuccess"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import PaymentDialog from '~/components/PaymentDialog.vue'

const billingCycle = ref<'monthly' | 'yearly'>('yearly')
const showPaymentDialog = ref(false)
const selectedProductId = ref('')
const currentUserId = ref('guest_' + Date.now()) // 实际使用时从登录状态获取

// 根据套餐类型和周期生成产品ID
const getProductId = (plan: string) => {
  if (plan === 'lifetime') {
    return 'vip_lifetime'
  }
  const prefix = `vip_${plan}`
  const suffix = billingCycle.value === 'yearly' ? '_yearly' : '_monthly'
  return `${prefix}${suffix}`
}

const handlePurchase = (plan: string) => {
  selectedProductId.value = getProductId(plan)
  showPaymentDialog.value = true
}

const handlePurchaseCredits = (type: string) => {
  if (type === 'template') {
    navigateTo('/poster-design?menu=templates')
  } else if (type === 'ai_20') {
    selectedProductId.value = 'ai_credits_20'
    showPaymentDialog.value = true
  } else if (type === 'ai_50') {
    selectedProductId.value = 'ai_credits_50'
    showPaymentDialog.value = true
  } else if (type === 'ai_100') {
    selectedProductId.value = 'ai_credits_100'
    showPaymentDialog.value = true
  } else {
    // License购买暂时跳转说明页面
    alert('商用授权购买功能开发中，请联系客服')
  }
}

const handlePaymentSuccess = () => {
  // 支付成功后刷新会员状态或跳转
  alert('支付成功！会员权益已开通')
  // 可以刷新用户会员状态或跳转到设计页面
  navigateTo('/poster-design')
}

// SEO
useHead({
  title: '会员价格 - 易可图 AI智能设计平台',
  meta: [
    { name: 'description', content: '易可图会员价格方案，包含免费版、基础版、专业版、终身版，AI智能设计次数从5次到无限次，正版商用授权，高清无水印下载' },
    { name: 'keywords', content: '易可图会员价格,AI设计会员,设计工具会员,商用授权,终身会员' }
  ]
})
</script>