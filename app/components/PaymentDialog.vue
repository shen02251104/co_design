<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="visible"
        class="fixed inset-0 z-[2147483647] flex items-center justify-center bg-black/50 backdrop-blur-sm"
        @click.self="closeDialog"
      >
        <div class="bg-white rounded-2xl shadow-2xl w-[480px] max-w-[90vw] overflow-hidden">
          <!-- Header -->
          <div class="bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-4">
            <div class="flex items-center justify-between">
              <h3 class="text-xl font-bold text-white">{{ paymentMethod === 'alipay' ? '支付宝支付' : '微信支付' }}</h3>
              <button
                class="text-white/80 hover:text-white transition-colors"
                @click="closeDialog"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>

          <!-- Content -->
          <div class="p-6">
            <!-- Loading State -->
            <div v-if="loading" class="flex flex-col items-center py-8">
              <div class="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
              <p class="mt-4 text-gray-500">正在生成支付订单...</p>
            </div>

            <!-- QR Code Display -->
            <div v-else-if="orderInfo && paymentStatus !== 'paid'" class="space-y-6">
              <!-- Product Info -->
              <div class="bg-gray-50 rounded-xl p-4">
                <div class="flex justify-between items-center">
                  <span class="text-gray-600">商品名称</span>
                  <span class="font-medium">{{ orderInfo.productName }}</span>
                </div>
                <div class="flex justify-between items-center mt-2">
                  <span class="text-gray-600">订单金额</span>
                  <span class="text-2xl font-bold text-red-500">¥{{ orderInfo.amount }}</span>
                </div>
              </div>

              <!-- QR Code -->
              <div class="flex flex-col items-center">
                <div class="bg-white p-4 rounded-xl shadow-inner border border-gray-200">
                  <img
                    :src="orderInfo.qrCodeUrl"
                    alt="支付二维码"
                    class="w-[200px] h-[200px]"
                  />
                </div>
                <p class="mt-4 text-sm text-gray-500">
                  请使用{{ paymentMethod === 'alipay' ? '支付宝' : '微信' }}扫码支付
                </p>
                
                <!-- Payment Status -->
                <div class="mt-4 flex items-center gap-2 text-blue-500">
                  <div class="animate-pulse">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                  </div>
                  <span class="text-sm">等待支付中，请尽快完成支付...</span>
                </div>
              </div>

              <!-- Payment Method Switch -->
              <div class="flex justify-center gap-4">
                <button
                  :class="paymentMethod === 'alipay' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'"
                  class="px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                  @click="switchPaymentMethod('alipay')"
                >
                  <img src="/images/alipay-logo.svg" alt="支付宝" class="w-5 h-5" onerror="this.style.display='none'" />
                  支付宝
                </button>
                <button
                  :class="paymentMethod === 'wechat' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600'"
                  class="px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                  @click="switchPaymentMethod('wechat')"
                >
                  <img src="/images/wechat-logo.svg" alt="微信" class="w-5 h-5" onerror="this.style.display='none'" />
                  微信支付
                </button>
              </div>

              <!-- Tips -->
              <div class="text-xs text-gray-400 text-center">
                <p>支付完成后将自动跳转，如有问题请联系客服</p>
                <p class="mt-1">订单号：{{ orderInfo.orderNo }}</p>
              </div>
            </div>

            <!-- Payment Success -->
            <div v-else-if="paymentStatus === 'paid'" class="flex flex-col items-center py-8">
              <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-500">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <h4 class="mt-4 text-xl font-bold text-green-500">支付成功！</h4>
              <p class="mt-2 text-gray-500 text-center">
                {{ orderInfo?.productName }}已开通<br/>
                感谢您对易可图的支持！
              </p>
              <button
                class="mt-6 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
                @click="handleSuccess"
              >
                开始使用
              </button>
            </div>

            <!-- Error State -->
            <div v-else-if="error" class="flex flex-col items-center py-8">
              <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-red-500">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="15" y1="9" x2="9" y2="15"></line>
                  <line x1="9" y1="9" x2="15" y2="15"></line>
                </svg>
              </div>
              <p class="mt-4 text-red-500">{{ error }}</p>
              <button
                class="mt-4 px-6 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                @click="retryPayment"
              >
                重试
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch, onUnmounted } from 'vue';

interface Props {
  visible: boolean;
  productId: string;
  userId?: string;
}

interface Emits {
  (e: 'close'): void;
  (e: 'success'): void;
}

// API Response Types
interface CreateOrderResponse {
  success: boolean;
  orderNo?: string;
  productName?: string;
  amount?: number;
  qrCodeUrl?: string;
  error?: string;
}

interface QueryOrderResponse {
  success: boolean;
  status?: 'pending' | 'paid' | 'failed';
  error?: string;
}

interface OrderInfo {
  orderNo: string;
  productName: string;
  amount: number;
  qrCodeUrl: string;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const paymentMethod = ref<'alipay' | 'wechat'>('alipay');
const loading = ref(false);
const error = ref('');
const orderInfo = ref<OrderInfo | null>(null);
const paymentStatus = ref<'pending' | 'paid' | 'failed'>('pending');
const pollTimer = ref<number | null>(null);

// 监听visible变化，创建订单
watch(() => props.visible, async (newVisible) => {
  if (newVisible && props.productId) {
    await createOrder();
  } else if (!newVisible) {
    // 停止轮询
    stopPolling();
  }
});

// 创建订单
async function createOrder() {
  loading.value = true;
  error.value = '';
  orderInfo.value = null;
  paymentStatus.value = 'pending';

  try {
    const userId = props.userId || 'guest_' + Date.now();
    
    const response = await $fetch<CreateOrderResponse>('/api/payment/create-order', {
      method: 'POST',
      body: {
        userId,
        productId: props.productId,
        paymentMethod: paymentMethod.value,
      },
    });

    if (response.success && response.orderNo && response.productName && response.amount && response.qrCodeUrl) {
      orderInfo.value = {
        orderNo: response.orderNo,
        productName: response.productName,
        amount: response.amount,
        qrCodeUrl: response.qrCodeUrl,
      };
      // 开始轮询订单状态
      startPolling(response.orderNo);
    } else {
      error.value = response.error || '创建订单失败';
    }
  } catch (err: any) {
    error.value = err.message || '网络错误，请重试';
  } finally {
    loading.value = false;
  }
}

// 切换支付方式
async function switchPaymentMethod(method: 'alipay' | 'wechat') {
  paymentMethod.value = method;
  // 重新创建订单
  stopPolling();
  await createOrder();
}

// 开始轮询订单状态
function startPolling(orderNo: string) {
  pollTimer.value = window.setInterval(async () => {
    try {
      const response = await $fetch<QueryOrderResponse>(`/api/payment/query-order?orderNo=${orderNo}`);
      
      if (response.success && response.status === 'paid') {
        paymentStatus.value = 'paid';
        stopPolling();
        
        // 3秒后自动关闭并触发成功回调
        setTimeout(() => {
          handleSuccess();
        }, 3000);
      } else if (response.status === 'failed') {
        paymentStatus.value = 'failed';
        error.value = '支付失败，请重试';
        stopPolling();
      }
    } catch (err) {
      console.error('轮询订单状态失败:', err);
    }
  }, 2000); // 每2秒轮询一次
}

// 停止轮询
function stopPolling() {
  if (pollTimer.value) {
    clearInterval(pollTimer.value);
    pollTimer.value = null;
  }
}

// 关闭弹窗
function closeDialog() {
  stopPolling();
  emit('close');
}

// 重试支付
async function retryPayment() {
  await createOrder();
}

// 处理支付成功
function handleSuccess() {
  stopPolling();
  emit('success');
  emit('close');
}

// 清理
onUnmounted(() => {
  stopPolling();
});
</script>

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