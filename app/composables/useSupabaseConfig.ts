import { ref, readonly } from 'vue';

interface SupabaseConfig {
  url: string;
  anonKey: string;
}

const config = ref<SupabaseConfig | null>(null);
const isLoading = ref(true);
const error = ref<string | null>(null);
const isReady = ref(false);

// 全局事件名称
export const SUPABASE_CONFIG_READY_EVENT = 'supabase-config-ready';

/**
 * 获取 Supabase 配置
 */
export const useSupabaseConfig = () => {
  // 异步加载配置
  const loadConfig = async () => {
    if (isReady.value) return;
    
    try {
      isLoading.value = true;
      const response = await $fetch<SupabaseConfig>('/api/supabase-config');
      
      if (response && response.url && response.anonKey) {
        config.value = response;
        isReady.value = true;
        
        // 触发全局事件
        if (typeof window !== 'undefined') {
          (window as any).__SUPABASE_CONFIG__ = config.value;
          window.dispatchEvent(new CustomEvent(SUPABASE_CONFIG_READY_EVENT, { detail: config.value }));
        }
      } else {
        throw new Error('Invalid config response');
      }
    } catch (err: any) {
      error.value = err.message || 'Failed to load Supabase config';
      console.error('Failed to load Supabase config:', err);
    } finally {
      isLoading.value = false;
    }
  };
  
  // 开始加载（仅客户端）
  if (typeof window !== 'undefined') {
    loadConfig();
  }
  
  return {
    config: readonly(config),
    isLoading,
    error,
    isReady,
    loadConfig
  };
};