import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ref } from 'vue';

// 扩展 Window 类型
declare global {
  interface Window {
    __SUPABASE_CONFIG__?: {
      url: string;
      anonKey: string;
    };
    __SUPABASE_CLIENT__?: SupabaseClient;
  }
}

let browserClient: SupabaseClient | null = null;

/**
 * 等待配置加载完成
 */
async function waitForConfig(maxWait = 5000): Promise<boolean> {
  if (typeof window === 'undefined') {
    return false;
  }
  
  if (window.__SUPABASE_CONFIG__?.url && window.__SUPABASE_CONFIG__?.anonKey) {
    return true;
  }
  
  return new Promise((resolve) => {
    let resolved = false;
    
    const handler = () => {
      if (!resolved) {
        resolved = true;
        window.removeEventListener('supabase-config-ready', handler);
        resolve(true);
      }
    };
    
    window.addEventListener('supabase-config-ready', handler);
    
    setTimeout(() => {
      if (!resolved) {
        resolved = true;
        window.removeEventListener('supabase-config-ready', handler);
        resolve(window.__SUPABASE_CONFIG__?.url && window.__SUPABASE_CONFIG__?.anonKey ? true : false);
      }
    }, maxWait);
  });
}

/**
 * 获取 Supabase 浏览器客户端（同步版本）
 */
function getSupabaseClientSync(): SupabaseClient {
  if (browserClient) {
    return browserClient;
  }
  
  if (typeof window === 'undefined') {
    throw new Error('Supabase client can only be used in browser environment');
  }
  
  const config = window.__SUPABASE_CONFIG__;
  
  if (!config || !config.url || !config.anonKey) {
    throw new Error(
      'Supabase config not found. Make sure useSupabaseConfig() is called first.'
    );
  }
  
  browserClient = createClient(config.url, config.anonKey, {
    db: {
      timeout: 60000,
    },
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      flowType: 'pkce'
    },
  });
  
  window.__SUPABASE_CLIENT__ = browserClient;
  
  return browserClient;
}

/**
 * Supabase 客户端 Composable
 */
export const useSupabaseClient = () => {
  const client = ref<SupabaseClient | null>(null);
  const isLoading = ref(true);
  const error = ref<string | null>(null);
  
  const initClient = async () => {
    try {
      // 等待配置加载
      const ready = await waitForConfig();
      
      if (!ready) {
        throw new Error('Supabase config not available');
      }
      
      client.value = getSupabaseClientSync();
      isLoading.value = false;
    } catch (err: any) {
      error.value = err.message;
      isLoading.value = false;
      console.error('Failed to init Supabase client:', err);
    }
  };
  
  // 仅在客户端初始化
  if (typeof window !== 'undefined') {
    initClient();
  }
  
  /**
   * 获取客户端（异步版本，带重试）
   */
  const getClient = async (maxRetries = 5, retryInterval = 1000): Promise<SupabaseClient> => {
    for (let i = 0; i < maxRetries; i++) {
      try {
        if (client.value) {
          return client.value;
        }
        await initClient();
        if (client.value) {
          return client.value;
        }
      } catch {
        if (i < maxRetries - 1) {
          await new Promise(resolve => setTimeout(resolve, retryInterval));
        }
      }
    }
    
    if (client.value) {
      return client.value;
    }
    
    throw new Error('Failed to get Supabase client after retries');
  };
  
  return {
    client,
    isLoading,
    error,
    getClient
  };
};