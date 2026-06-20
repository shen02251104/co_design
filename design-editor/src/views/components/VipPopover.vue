<!--
 * @Description: VIP权益悬浮提示组件
 * 鼠标悬浮在"开通会员"按钮上时显示的权益介绍面板
-->
<template>
  <Teleport to="body">
    <Transition name="fade">
      <div 
        v-if="visible" 
        class="vip-popover-container"
        :style="{ top: position.top + 'px', left: position.left + 'px' }"
      >
        <div class="vip-popover">
          <!-- 顶部标题 -->
          <div class="popover-header">
            <div class="header-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="vip-icon">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
              </svg>
              <span>成为VIP会员，即可享受</span>
            </div>
          </div>
          
          <!-- 权益列表 -->
          <div class="benefits-list">
            <div class="benefit-item">
              <div class="benefit-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <path d="M9 12l2 2 4-4"/>
                </svg>
              </div>
              <div class="benefit-content">
                <div class="benefit-title">正版商业授权</div>
                <div class="benefit-desc">正版商用0风险，线上+线下全渠道商用</div>
              </div>
            </div>
            
            <div class="benefit-item">
              <div class="benefit-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
              </div>
              <div class="benefit-content">
                <div class="benefit-title">高清无水印下载</div>
                <div class="benefit-desc">高清原图无水印下载，作品质量保障</div>
              </div>
            </div>
            
            <div class="benefit-item">
              <div class="benefit-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  <line x1="9" y1="3" x2="9" y2="21"/>
                </svg>
              </div>
              <div class="benefit-content">
                <div class="benefit-title">解锁更多功能特权</div>
                <div class="benefit-desc">智能尺寸调整、批量设计等特权</div>
              </div>
            </div>
            
            <div class="benefit-item">
              <div class="benefit-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
              </div>
              <div class="benefit-content">
                <div class="benefit-title">海量模板素材</div>
                <div class="benefit-desc">100万+设计模板，每日更新</div>
              </div>
            </div>
          </div>
          
          <!-- 底部按钮 -->
          <div class="popover-footer">
            <button class="vip-btn" @click="handleClick">
              <span>开通会员</span>
              <span class="discount-tag">立减20</span>
            </button>
          </div>
          
          <!-- 小箭头 -->
          <div class="popover-arrow"></div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script lang="ts" setup>
import { reactive, watch, onMounted, onUnmounted } from 'vue'

type TProps = {
  visible: boolean
  targetEl?: HTMLElement | null
}

type TEmits = {
  (event: 'update:visible', value: boolean): void
  (event: 'click'): void
}

const props = defineProps<TProps>()
const emit = defineEmits<TEmits>()

const position = reactive({
  top: 0,
  left: 0
})

// 计算位置
const updatePosition = () => {
  if (!props.targetEl) return
  
  const rect = props.targetEl.getBoundingClientRect()
  const popoverWidth = 320
  const popoverHeight = 380
  
  // 计算水平位置：优先在按钮下方居中
  let left = rect.left + rect.width / 2 - popoverWidth / 2
  
  // 确保不超出屏幕左侧
  if (left < 10) left = 10
  
  // 确保不超出屏幕右侧
  if (left + popoverWidth > window.innerWidth - 10) {
    left = window.innerWidth - popoverWidth - 10
  }
  
  // 计算垂直位置：在按钮下方
  const top = rect.bottom + 10
  
  position.top = top
  position.left = left
}

// 点击开通会员按钮
const handleClick = () => {
  emit('click')
  emit('update:visible', false)
}

// 监听可见状态变化，更新位置
watch(() => props.visible, (newVal) => {
  if (newVal) {
    updatePosition()
  }
})

// 监听窗口变化
const handleResize = () => {
  if (props.visible) {
    updatePosition()
  }
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style lang="less" scoped>
.vip-popover-container {
  position: fixed;
  z-index: 2147483647;
  pointer-events: auto;
}

.vip-popover {
  width: 320px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 10px 40px rgba(102, 126, 234, 0.3);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.95);
    border-radius: 12px;
  }
}

.popover-header {
  position: relative;
  z-index: 1;
  margin-bottom: 16px;
  
  .header-title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 16px;
    font-weight: 600;
    color: #7c3aed;
    
    .vip-icon {
      width: 24px;
      height: 24px;
      color: #f59e0b;
    }
  }
}

.benefits-list {
  position: relative;
  z-index: 1;
  
  .benefit-item {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 12px 0;
    border-bottom: 1px solid #f0f0f0;
    
    &:last-child {
      border-bottom: none;
    }
    
    .benefit-icon {
      width: 36px;
      height: 36px;
      background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      
      svg {
        width: 20px;
        height: 20px;
        color: #7c3aed;
      }
    }
    
    .benefit-content {
      flex: 1;
      
      .benefit-title {
        font-size: 14px;
        font-weight: 500;
        color: #333;
        margin-bottom: 4px;
      }
      
      .benefit-desc {
        font-size: 12px;
        color: #666;
        line-height: 1.4;
      }
    }
  }
}

.popover-footer {
  position: relative;
  z-index: 1;
  margin-top: 16px;
  
  .vip-btn {
    width: 100%;
    height: 44px;
    background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
    border: none;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(246, 211, 97, 0.4);
    }
    
    span {
      font-size: 15px;
      font-weight: 600;
      color: #7c3aed;
    }
    
    .discount-tag {
      background: #ef4444;
      color: #fff;
      font-size: 11px;
      padding: 2px 6px;
      border-radius: 4px;
    }
  }
}

.popover-arrow {
  position: absolute;
  top: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 16px;
  height: 8px;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 16px;
    height: 8px;
    background: rgba(255, 255, 255, 0.95);
    clip-path: polygon(50% 100%, 0 0, 100% 0);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>