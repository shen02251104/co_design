<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <!-- 应用 Logo -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg mb-4">
          <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h1 class="text-2xl font-bold text-gray-900">易可图</h1>
        <p class="text-sm text-gray-500 mt-1">专业电商设计平台</p>
      </div>
      
      <!-- 登录卡片 -->
      <div class="bg-white rounded-2xl shadow-xl p-8">
        <h2 class="text-xl font-semibold text-gray-900 mb-6">登录账号</h2>
        
        <!-- 登录表单 -->
        <form @submit.prevent="handleLogin" class="space-y-4">
          <!-- 邮箱 -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">邮箱地址</label>
            <input
              v-model="email"
              type="email"
              placeholder="请输入邮箱地址"
              class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
              required
            />
          </div>
          
          <!-- 密码 -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">密码</label>
            <div class="relative">
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="请输入密码"
                class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none pr-12"
                required
                minlength="6"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <svg v-if="showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            </div>
          </div>
          
          <!-- 错误提示 -->
          <div v-if="errorMsg" class="text-red-500 text-sm py-2 px-3 bg-red-50 rounded-lg">
            {{ errorMsg }}
          </div>
          
          <!-- 登录按钮 -->
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center"
          >
            <svg v-if="isLoading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ isLoading ? '登录中...' : '登录' }}
          </button>
        </form>
        
        <!-- 注册入口 -->
        <div class="mt-6 text-center">
          <span class="text-gray-500 text-sm">还没有账号？</span>
          <NuxtLink to="/register" class="text-blue-600 text-sm font-medium hover:text-blue-700 ml-1">
            去注册
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuth } from '~/composables/useAuth';

definePageMeta({
  layout: false,
  middleware: []
});

const email = ref('');
const password = ref('');
const showPassword = ref(false);
const errorMsg = ref('');
const isLoading = ref(false);

const { signInWithEmail, isAuthenticated } = useAuth();
const router = useRouter();

// 如果已登录，跳转到首页
watch(isAuthenticated, (authed) => {
  if (authed) {
    router.replace('/');
  }
});

const handleLogin = async () => {
  errorMsg.value = '';
  isLoading.value = true;
  
  try {
    await signInWithEmail(email.value, password.value);
    // 登录成功，跳转到首页
    router.replace('/');
  } catch (error: any) {
    console.error('Login failed:', error);
    
    // 根据错误类型显示提示
    if (error.message?.includes('Invalid login credentials')) {
      errorMsg.value = '邮箱或密码错误';
    } else if (error.message?.includes('Email not confirmed')) {
      errorMsg.value = '邮箱未验证，请检查邮箱';
    } else {
      errorMsg.value = error.message || '登录失败，请稍后重试';
    }
  } finally {
    isLoading.value = false;
  }
};
</script>