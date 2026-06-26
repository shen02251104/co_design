import { ref, computed, watch } from 'vue';
import type { User, Session } from '@supabase/supabase-js';
import { useSupabaseClient } from './useSupabaseClient';
import { useSupabaseConfig } from './useSupabaseConfig';
import { navigateTo } from '#imports';

// 全局状态
const user = ref<User | null>(null);
const session = ref<Session | null>(null);
const isLoading = ref(true);
const isAuthenticated = computed(() => !!session.value && !!user.value);

/**
 * 用户认证状态管理 Composable
 */
export const useAuth = () => {
  const { getClient } = useSupabaseClient();
  const { isReady } = useSupabaseConfig();
  
  /**
   * 初始化认证状态
   */
  const initAuth = async () => {
    if (typeof window === 'undefined') return;
    
    try {
      isLoading.value = true;
      const supabase = await getClient();
      
      // 获取当前会话
      const { data: { session: currentSession }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        console.error('Failed to get session:', sessionError);
      } else if (currentSession) {
        session.value = currentSession;
        user.value = currentSession.user;
      }
      
      // 监听认证状态变化
      supabase.auth.onAuthStateChange((event, newSession) => {
        console.log('Auth state changed:', event);
        
        if (event === 'SIGNED_IN' && newSession) {
          session.value = newSession;
          user.value = newSession.user;
        } else if (event === 'SIGNED_OUT') {
          session.value = null;
          user.value = null;
        } else if (event === 'TOKEN_REFRESHED' && newSession) {
          session.value = newSession;
        }
      });
    } catch (err) {
      console.error('Failed to init auth:', err);
    } finally {
      isLoading.value = false;
    }
  };
  
  /**
   * 邮箱登录
   */
  const signInWithEmail = async (email: string, password: string) => {
    const supabase = await getClient();
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) {
      throw error;
    }
    
    if (data.session) {
      session.value = data.session;
      user.value = data.user;
    }
    
    return data;
  };
  
  /**
   * 邮箱注册
   */
  const signUpWithEmail = async (email: string, password: string, fullName?: string) => {
    const supabase = await getClient();
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName || ''
        }
      }
    });
    
    if (error) {
      throw error;
    }
    
    // 如果自动确认登录，更新状态
    if (data.session) {
      session.value = data.session;
      user.value = data.user;
    }
    
    return data;
  };
  
  /**
   * 登出
   */
  const signOut = async () => {
    const supabase = await getClient();
    
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      throw error;
    }
    
    // 清除状态
    session.value = null;
    user.value = null;
    
    // 跳转到登录页
    await navigateTo('/login');
  };
  
  /**
   * 获取用户会员状态
   */
  const getMembership = async () => {
    if (!user.value) return null;
    
    const response = await $fetch('/api/user/membership', {
      headers: {
        'x-session': session.value?.access_token || ''
      }
    });
    
    return response;
  };
  
  // 监听配置就绪后初始化
  if (typeof window !== 'undefined') {
    watch(isReady, (ready) => {
      if (ready) {
        initAuth();
      }
    });
    
    // 如果已经就绪，立即初始化
    if (isReady.value) {
      initAuth();
    }
  }
  
  return {
    user,
    session,
    isLoading,
    isAuthenticated,
    initAuth,
    signInWithEmail,
    signUpWithEmail,
    signOut,
    getMembership
  };
};