<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <!-- Logo -->
      <div class="text-center mb-8">
        <div class="w-12 h-12 rounded-xl gradient-purple flex items-center justify-center mx-auto mb-4">
          <span class="text-white font-bold text-lg">易</span>
        </div>
        <h1 class="text-2xl font-bold text-gray-900">注册账号</h1>
        <p class="text-gray-500 mt-2">开启您的智能设计之旅</p>
      </div>
      
      <!-- 注册表单 -->
      <div class="bg-white rounded-xl shadow-lg p-6">
        <div class="space-y-4">
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
          <div>
            <label class="text-sm text-gray-600 mb-2 block">设置密码</label>
            <input 
              v-model="password"
              type="password"
              placeholder="请设置密码（6-20位）"
              class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition"
            />
          </div>
          <div>
            <label class="text-sm text-gray-600 mb-2 block">确认密码</label>
            <input 
              v-model="confirmPassword"
              type="password"
              placeholder="请再次输入密码"
              class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition"
            />
          </div>
        </div>
        
        <!-- 注册按钮 -->
        <button class="w-full py-3 mt-6 gradient-purple text-white rounded-lg font-medium hover:opacity-90 transition">
          注册
        </button>
        
        <!-- 登录链接 -->
        <div class="text-center mt-4">
          <span class="text-gray-500 text-sm">已有账号？</span>
          <NuxtLink to="/login" class="text-purple-600 text-sm hover:text-purple-700 ml-1">立即登录</NuxtLink>
        </div>
      </div>
      
      <!-- 协议 -->
      <p class="text-center text-xs text-gray-400 mt-4">
        注册即表示同意 
        <NuxtLink to="/terms" class="text-gray-600 hover:text-gray-900">用户协议</NuxtLink> 
        和 
        <NuxtLink to="/privacy" class="text-gray-600 hover:text-gray-900">隐私政策</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const phone = ref('')
const code = ref('')
const password = ref('')
const confirmPassword = ref('')

useHead({
  title: '注册 - 易设计智能设计平台',
  meta: [
    { name: 'description', content: '注册易设计平台账号，享受智能设计工具，一键生成商品套图、海报设计。' },
    { name: 'keywords', content: '易设计注册,电商设计平台注册' },
  ],
})
</script>