import { ref, computed, watch } from 'vue';
import type { User, Session } from '@supabase/supabase-js';
import { useSupabaseClient } from './useSupabaseClient';
import { useSupabaseConfig } from './useSupabaseConfig';
import { navigateTo } from '#imports';

// 会员信息类型
interface MembershipInfo {
  isVip: boolean;
  vipLevel: string;
  vipExpireTime: string | null;
  aiCredits: number;
  aiCreditsUsed: number;
}

// 全局状态
const user = ref<User | null>(null);
const session = ref<Session | null>(null);
const isLoading = ref(true);
const membership = ref<MembershipInfo | null>(null);
const isAuthenticated = computed(() => !!session.value && !!user.value);

// 别名，方便其他组件使用
const isLoggedIn = computed(() => isAuthenticated.value);
const isVip = computed(() => membership.value?.isVip ?? false);
const aiCredits = computed(() => membership.value?.aiCredits ?? 0);

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
        // 获取会员信息
        await refreshMembership();
      }
      
      // 监听认证状态变化
      supabase.auth.onAuthStateChange((event, newSession) => {
        console.log('Auth state changed:', event);
        
        if (event === 'SIGNED_IN' && newSession) {
          session.value = newSession;
          user.value = newSession.user;
          refreshMembership();
        } else if (event === 'SIGNED_OUT') {
          session.value = null;
          user.value = null;
          membership.value = null;
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
   * 刷新会员信息
   */
  const refreshMembership = async () => {
    if (!user.value || !session.value) {
      membership.value = null;
      return;
    }
    
    try {
      const response = await $fetch<{ success: boolean; data?: MembershipInfo }>('/api/user/membership', {
        headers: {
          'x-session': session.value.access_token
        }
      });
      
      if (response.success && response.data) {
        membership.value = response.data;
      }
    } catch (err) {
      console.error('Failed to get membership:', err);
      membership.value = null;
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
      await refreshMembership();
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
   * 登出 (别名 signOut)
   */
  const logout = async () => {
    return signOut();
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
    membership.value = null;
    
    // 跳转到登录页
    await navigateTo('/login');
  };
  
  /**
   * 获取用户会员状态
   */
  const getMembership = async () => {
    await refreshMembership();
    return membership.value;
  };
  
  /**
   * 获取用户信息
   */
  const fetchUser = async () => {
    if (!session.value) return null;
    
    await refreshMembership();
    return {
      user: user.value,
      membership: membership.value
    };
  };
  
  // 用户头像首字母
  const userInitial = computed(() => {
    if (!user.value) return '';
    const name = user.value.user_metadata?.full_name || user.value.email || '';
    return name.charAt(0).toUpperCase();
  });
  
  // 监听配置就绪后初始化
  if (typeof window !== 'undefined') {
    watch(() => isReady.value, (ready) => {
      if (ready) {
        initAuth();
      }
    }, { immediate: true });
  }
  
  return {
    user,
    session,
    isLoading,
    isAuthenticated,
    isLoggedIn,
    isVip,
    membership,
    aiCredits,
    userInitial,
    initAuth,
    signInWithEmail,
    signUpWithEmail,
    signOut,
    logout,
    getMembership,
    fetchUser,
    refreshMembership
  };
};