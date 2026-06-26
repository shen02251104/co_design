import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

interface TrackEvent {
  eventType: string
  eventData?: Record<string, unknown>
}

export function useAnalytics() {
  const route = useRoute()
  const userId = ref<string | null>(null)
  
  // 页面访问追踪
  const trackPageView = (pageName?: string) => {
    const actualPageName = pageName || route.path
    trackEvent('page_view', {
      page: actualPageName,
      title: document.title,
      referrer: document.referrer
    })
  }
  
  // 按钮点击追踪
  const trackClick = (buttonName: string, additionalData?: Record<string, unknown>) => {
    trackEvent('click', {
      button: buttonName,
      ...additionalData
    })
  }
  
  // 模板使用追踪
  const trackTemplateUse = (templateId: string, templateName: string) => {
    trackEvent('template_use', {
      templateId,
      templateName,
      isVip: false // 实际应从会员状态获取
    })
  }
  
  // AI生成追踪
  const trackAiGenerate = (prompt: string, model: string) => {
    trackEvent('ai_generate', {
      prompt: prompt.substring(0, 100), // 只记录前100字符
      model,
      timestamp: Date.now()
    })
  }
  
  // VIP升级追踪
  const trackVipUpgrade = (plan: string, amount: number) => {
    trackEvent('vip_upgrade', {
      plan,
      amount
    })
  }
  
  // 登录追踪
  const trackLogin = (method: string) => {
    trackEvent('login', { method })
  }
  
  // 下载追踪
  const trackDownload = (type: string, format: string) => {
    trackEvent('download', {
      type,
      format
    })
  }
  
  // 通用事件追踪
  const trackEvent = async (eventType: string, eventData?: Record<string, unknown>) => {
    try {
      await $fetch('/api/analytics/track', {
        method: 'POST',
        body: {
          eventType,
          eventData,
          userId: userId.value,
          timestamp: Date.now()
        }
      })
    } catch (error) {
      // 静默失败，不影响用户体验
      console.warn('Analytics track failed:', error)
    }
  }
  
  // 自动追踪页面访问
  onMounted(() => {
    trackPageView()
  })
  
  return {
    userId,
    trackPageView,
    trackClick,
    trackTemplateUse,
    trackAiGenerate,
    trackVipUpgrade,
    trackLogin,
    trackDownload,
    trackEvent
  }
}