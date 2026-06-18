<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <!-- Logo -->
      <div class="text-center mb-8">
        <div class="w-12 h-12 rounded-xl gradient-purple flex items-center justify-center mx-auto mb-4">
          <span class="text-white font-bold text-lg">易</span>
        </div>
        <h1 class="text-2xl font-bold text-gray-900">易设计</h1>
        <p class="text-gray-500 mt-2">电商人都在用的智能设计平台</p>
      </div>
      
      <!-- 登录表单 -->
      <div class="bg-white rounded-xl shadow-lg p-6">
        <!-- 登录方式切换 -->
        <div class="flex gap-2 mb-6">
          <button 
            class="flex-1 py-2 rounded-lg font-medium transition"
            :class="loginType === 'phone' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600'"
            @click="loginType = 'phone'"
          >
            手机号登录
          </button>
          <button 
            class="flex-1 py-2 rounded-lg font-medium transition"
            :class="loginType === 'email' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600'"
            @click="loginType = 'email'"
          >
            邮箱登录
          </button>
        </div>
        
        <!-- 手机号登录 -->
        <div v-if="loginType === 'phone'" class="space-y-4">
          <div>
            <label class="text-sm text-gray-600 mb-2 block">手机号</label>
            <input 
              v-model="phone"
              type="tel"
              placeholder="请输入手机号"
              class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition"
            />
          </div>
          <div>
            <label class="text-sm text-gray-600 mb-2 block">验证码</label>
            <div class="flex gap-2">
              <input 
                v-model="code"
                type="text"
                placeholder="请输入验证码"
                class="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition"
              />
              <button class="px-4 py-3 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition">
                获取验证码
              </button>
            </div>
          </div>
        </div>
        
        <!-- 邮箱登录 -->
        <div v-if="loginType === 'email'" class="space-y-4">
          <div>
            <label class="text-sm text-gray-600 mb-2 block">邮箱</label>
            <input 
              v-model="email"
              type="email"
              placeholder="请输入邮箱地址"
              class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition"
            />
          </div>
          <div>
            <label class="text-sm text-gray-600 mb-2 block">密码</label>
            <input 
              v-model="password"
              type="password"
              placeholder="请输入密码"
              class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition"
            />
          </div>
        </div>
        
        <!-- 登录按钮 -->
        <button class="w-full py-3 mt-6 gradient-purple text-white rounded-lg font-medium hover:opacity-90 transition">
          登录
        </button>
        
        <!-- 注册链接 -->
        <div class="text-center mt-4">
          <span class="text-gray-500 text-sm">还没有账号？</span>
          <NuxtLink to="/register" class="text-purple-600 text-sm hover:text-purple-700 ml-1">立即注册</NuxtLink>
        </div>
        
        <!-- 其他登录方式 -->
        <div class="mt-6 pt-6 border-t border-gray-200">
          <p class="text-center text-sm text-gray-500 mb-4">其他登录方式</p>
          <div class="flex justify-center gap-4">
            <button class="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center hover:bg-green-100 transition">
              <svg class="w-5 h-5 text-green-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </button>
            <button class="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center hover:bg-blue-100 transition">
              <svg class="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.83-2.65a.2.2 0 00.03-.19c-.02-.06-.1-.1-.2-.09-.09 0-1.99.45-3.83.86-.2.05-.3-.04-.3-.15s.04-.23.17-.35c.7-.62 1.88-1.56 2.28-1.93.1-.1.2-.22.2-.35 0-.1-.05-.2-.14-.29-.1-.09-.2-.09-.3-.09-.1 0-2.19.55-3.2.86-.1.03-.2 0-.2-.1s.05-.2.13-.27c.1-.08.3-.2.5-.3z"/>
              </svg>
            </button>
            <button class="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center hover:bg-red-100 transition">
              <svg class="w-5 h-5 text-red-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5.28 14.46c-.67.84-1.88 1.38-3.4 1.46-.55.03-1.15-.03-1.7-.17-.6-.15-1.13-.38-1.54-.67-.13-.09-.2-.22-.2-.37 0-.26.21-.47.47-.47.1 0 .2.04.28.1.3.21.7.4 1.1.51.5.14 1.03.18 1.53.15 1.2-.07 2.1-.51 2.55-1.1.23-.3.35-.65.35-1.02 0-.37-.12-.7-.35-1-.43-.55-1.2-.9-2.1-.96-.5-.03-1.02.03-1.53.15-.4.1-.8.3-1.1.51-.08.06-.18.1-.28.1-.26 0-.47-.21-.47-.47 0-.15.07-.28.2-.37.41-.29.94-.52 1.54-.67.55-.14 1.15-.2 1.7-.17 1.52.08 2.73.62 3.4 1.46.35.44.55.95.55 1.52s-.2 1.08-.55 1.52z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <!-- 协议 -->
      <p class="text-center text-xs text-gray-400 mt-4">
        登录即表示同意 
        <NuxtLink to="/terms" class="text-gray-600 hover:text-gray-900">用户协议</NuxtLink> 
        和 
        <NuxtLink to="/privacy" class="text-gray-600 hover:text-gray-900">隐私政策</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const loginType = ref('phone')
const phone = ref('')
const code = ref('')
const email = ref('')
const password = ref('')

useHead({
  title: '登录 - 易设计智能设计平台',
  meta: [
    { name: 'description', content: '登录易设计平台，使用智能设计工具，一键生成商品套图、海报设计。' },
    { name: 'keywords', content: '易设计登录,电商设计平台登录' },
  ],
})
</script>