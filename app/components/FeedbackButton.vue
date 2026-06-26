<script setup lang="ts">
import { ref } from 'vue'

const showModal = ref(false)
const feedbackType = ref('bug')
const feedbackContent = ref('')
const contactInfo = ref('')
const submitting = ref(false)
const submitted = ref(false)

const feedbackTypes = [
  { value: 'bug', label: '问题反馈', icon: '🐛' },
  { value: 'suggestion', label: '功能建议', icon: '💡' },
  { value: 'complaint', label: '投诉', icon: '📢' },
  { value: 'other', label: '其他', icon: '📝' }
]

async function submitFeedback() {
  if (!feedbackContent.value.trim()) {
    alert('请填写反馈内容')
    return
  }
  
  submitting.value = true
  
  try {
    // 模拟提交（实际应调用API）
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    submitted.value = true
    feedbackContent.value = ''
    contactInfo.value = ''
    
    // 3秒后关闭弹窗
    setTimeout(() => {
      showModal.value = false
      submitted.value = false
    }, 3000)
  } catch (error) {
    alert('提交失败，请稍后重试')
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <!-- 悬浮反馈按钮 -->
  <button
    class="fixed bottom-6 right-6 z-50 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-600 transition-all flex items-center gap-2"
    @click="showModal = true"
  >
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
    </svg>
    <span>反馈</span>
  </button>

  <!-- 反馈弹窗 -->
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="showModal" class="fixed inset-0 z-[2147483647] flex items-center justify-center">
        <!-- 遮罩 -->
        <div class="absolute inset-0 bg-black/50" @click="showModal = false"></div>
        
        <!-- 弹窗内容 -->
        <div class="relative bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 overflow-hidden">
          <!-- 头部 -->
          <div class="bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-4">
            <h3 class="text-white text-lg font-medium">问题反馈</h3>
            <p class="text-white/80 text-sm mt-1">您的反馈对我们很重要</p>
          </div>
          
          <!-- 内容区 -->
          <div class="p-6">
            <!-- 成功提示 -->
            <div v-if="submitted" class="text-center py-8">
              <div class="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg class="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
              </div>
              <h4 class="text-gray-900 font-medium mb-2">感谢您的反馈！</h4>
              <p class="text-gray-500 text-sm">我们会尽快处理并回复您</p>
            </div>
            
            <!-- 反馈表单 -->
            <div v-else>
              <!-- 反馈类型 -->
              <div class="mb-4">
                <label class="text-gray-700 text-sm font-medium mb-2 block">反馈类型</label>
                <div class="grid grid-cols-2 gap-2">
                  <button
                    v-for="type in feedbackTypes"
                    :key="type.value"
                    class="px-4 py-2 rounded-lg border transition-all flex items-center gap-2"
                    :class="feedbackType === type.value 
                      ? 'border-blue-500 bg-blue-50 text-blue-600' 
                      : 'border-gray-200 hover:border-gray-300'"
                    @click="feedbackType = type.value"
                  >
                    <span>{{ type.icon }}</span>
                    <span class="text-sm">{{ type.label }}</span>
                  </button>
                </div>
              </div>
              
              <!-- 反馈内容 -->
              <div class="mb-4">
                <label class="text-gray-700 text-sm font-medium mb-2 block">详细描述</label>
                <textarea
                  v-model="feedbackContent"
                  class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
                  rows="4"
                  placeholder="请详细描述您遇到的问题或建议..."
                ></textarea>
              </div>
              
              <!-- 联系方式 -->
              <div class="mb-4">
                <label class="text-gray-700 text-sm font-medium mb-2 block">联系方式（可选）</label>
                <input
                  v-model="contactInfo"
                  type="text"
                  class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="邮箱或手机号，方便我们回复您"
                />
              </div>
              
              <!-- 提交按钮 -->
              <button
                class="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                :disabled="submitting"
                @click="submitFeedback"
              >
                <svg v-if="submitting" class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>{{ submitting ? '提交中...' : '提交反馈' }}</span>
              </button>
            </div>
          </div>
          
          <!-- 关闭按钮 -->
          <button
            class="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 transition flex items-center justify-center"
            @click="showModal = false"
          >
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>