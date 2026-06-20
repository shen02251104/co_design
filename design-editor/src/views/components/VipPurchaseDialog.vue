<!--
 * @Description: VIP会员购买弹窗
 * 点击"开通会员"按钮后显示的完整购买界面
-->
<template>
  <Teleport to="body">
    <Transition name="dialog-fade">
      <div v-if="visible" class="vip-dialog-overlay" @click.self="handleClose">
        <div class="vip-dialog">
          <!-- 顶部用户信息 -->
          <div class="dialog-header">
            <div class="user-info">
              <div class="user-avatar">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="24" height="24">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <div class="user-detail">
                <div class="user-name">设计用户</div>
                <div class="user-tag">普通用户</div>
                <div class="user-desc">模板在线编辑，快速出图</div>
              </div>
            </div>
            <div class="header-right">
              <button class="coupon-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                  <path d="M2 9h6v6H2zM16 9h6v6h-6zM9 3v18M9 9h6M9 15h6"/>
                </svg>
                使用优惠券/码
              </button>
              <button class="close-btn" @click="handleClose">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
          </div>
          
          <!-- 会员类型选择 -->
          <div class="membership-type">
            <!-- 单人用/团队用 -->
            <div class="type-tabs">
              <button 
                :class="['type-tab', { active: memberType === 'personal' }]"
                @click="memberType = 'personal'"
              >
                单人用
              </button>
              <button 
                :class="['type-tab', { active: memberType === 'team' }]"
                @click="memberType = 'team'"
              >
                团队用
              </button>
            </div>
            
            <!-- 版本选择 -->
            <div class="version-tabs">
              <button 
                :class="['version-tab', { active: selectedVersion === 'basic' }]"
                @click="selectedVersion = 'basic'"
              >
                基础版
              </button>
              <button 
                :class="['version-tab', { active: selectedVersion === 'pro' }]"
                @click="selectedVersion = 'pro'"
              >
                高级版
              </button>
              <button 
                :class="['version-tab', { active: selectedVersion === 'expert' }]"
                @click="selectedVersion = 'expert'"
              >
                专业版
              </button>
            </div>
            
            <div class="version-desc">
              <span>{{ versionDescriptions[selectedVersion] }}</span>
              <button class="help-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                  <line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
              </button>
            </div>
          </div>
          
          <!-- 套餐选择 -->
          <div class="packages-section">
            <div class="packages-container">
              <div 
                v-for="pkg in packages" 
                :key="pkg.id"
                :class="['package-card', { active: selectedPackage === pkg.id }]"
                @click="selectedPackage = pkg.id"
              >
                <!-- 活动标签 -->
                <div v-if="pkg.promotion" class="promotion-tag">
                  {{ pkg.promotion }}
                </div>
                
                <!-- 套餐名称 -->
                <div class="package-name">{{ pkg.name }}</div>
                
                <!-- 价格 -->
                <div class="package-price">
                  <span class="price-symbol">¥</span>
                  <span class="price-value">{{ pkg.price }}</span>
                </div>
                
                <!-- 优惠标签 -->
                <div v-if="pkg.discount" class="discount-tag">
                  {{ pkg.discount }}
                </div>
                
                <!-- 推荐标签 -->
                <div :class="['recommend-tag', pkg.recommendType]">
                  {{ pkg.recommend }}
                </div>
                
                <!-- 有效期 -->
                <div v-if="pkg.expiry" class="package-expiry">
                  开通后有效期至：{{ pkg.expiry }}
                </div>
              </div>
            </div>
          </div>
          
          <!-- 权益列表 -->
          <div class="benefits-section">
            <div class="benefits-header">
              <span class="benefits-title">会员权益</span>
              <button class="more-btn">查看更多</button>
            </div>
            
            <div class="benefits-grid">
              <div v-for="benefit in benefits" :key="benefit.id" class="benefit-card">
                <div class="benefit-icon">
                  <!-- Shield icon -->
                  <svg v-if="benefit.iconType === 'shield'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="24" height="24">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    <path d="M9 12l2 2 4-4"/>
                  </svg>
                  <!-- Canvas icon -->
                  <svg v-else-if="benefit.iconType === 'canvas'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="24" height="24">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                    <line x1="9" y1="3" x2="9" y2="21"/>
                  </svg>
                  <!-- Points icon -->
                  <svg v-else-if="benefit.iconType === 'points'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="24" height="24">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 6v6l4 2"/>
                  </svg>
                  <!-- Download icon -->
                  <svg v-else-if="benefit.iconType === 'download'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="24" height="24">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  <!-- Template icon -->
                  <svg v-else-if="benefit.iconType === 'template'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="24" height="24">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  <!-- AI icon -->
                  <svg v-else-if="benefit.iconType === 'ai'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="24" height="24">
                    <path d="M12 2a10 10 0 1 0 10 10"/>
                    <path d="M12 2a7 7 0 1 0 7 7"/>
                    <path d="M12 2a4 4 0 1 0 4 4"/>
                  </svg>
                  <!-- Cutout icon -->
                  <svg v-else-if="benefit.iconType === 'cutout'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="24" height="24">
                    <circle cx="11" cy="11" r="8"/>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  </svg>
                  <!-- Batch icon -->
                  <svg v-else-if="benefit.iconType === 'batch'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="24" height="24">
                    <rect x="3" y="3" width="7" height="7"/>
                    <rect x="14" y="3" width="7" height="7"/>
                    <rect x="14" y="14" width="7" height="7"/>
                    <rect x="3" y="14" width="7" height="7"/>
                  </svg>
                </div>
                <div class="benefit-name">{{ benefit.name }}</div>
                <div class="benefit-desc">{{ benefit.desc }}</div>
              </div>
            </div>
          </div>
          
          <!-- 支付区域 -->
          <div class="payment-section">
            <div class="payment-left">
              <!-- 价格显示 -->
              <div class="price-display">
                <div class="final-price">
                  <span class="price-symbol">¥</span>
                  <span class="price-value">{{ currentPackage?.price }}</span>
                </div>
                <div class="original-price">
                  原价¥{{ currentPackage?.originalPrice }} 省{{ currentPackage?.originalPrice - currentPackage?.price }}元
                </div>
                <div v-if="currentPackage?.discount" class="coupon-tag">
                  优惠券 -¥{{ currentPackage?.originalPrice - currentPackage?.price }}
                </div>
              </div>
              
              <!-- 支付方式 -->
              <div class="payment-methods">
                <div class="payment-tabs">
                  <button 
                    :class="['payment-tab', { active: paymentMethod === 'alipay' }]"
                    @click="paymentMethod = 'alipay'"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="24" height="24">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M8 12h8M12 8v8"/>
                    </svg>
                    支付宝
                  </button>
                  <button 
                    :class="['payment-tab', { active: paymentMethod === 'wechat' }]"
                    @click="paymentMethod = 'wechat'"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="24" height="24">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                    </svg>
                    微信支付
                  </button>
                </div>
              </div>
              
              <!-- 协议提示 -->
              <div class="agreement-tip">
                支付即视为同意《服务协议》与《授权许可》，支付后可在订单中心开具发票
              </div>
              
              <!-- 对公转账 -->
              <button class="transfer-btn">我要对公转账</button>
            </div>
            
            <div class="payment-right">
              <!-- 二维码 -->
              <div class="qr-code">
                <div class="qr-placeholder">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="40" height="40">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                    <rect x="7" y="7" width="3" height="3"/>
                    <rect x="14" y="7" width="3" height="3"/>
                    <rect x="7" y="14" width="3" height="3"/>
                    <rect x="14" y="14" width="3" height="3"/>
                  </svg>
                  <span>扫码支付</span>
                </div>
              </div>
              <div class="payment-icons">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="24" height="24">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M8 12h8M12 8v8"/>
                </svg>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="24" height="24">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                </svg>
              </div>
            </div>
          </div>
          
          <!-- 底部链接 -->
          <div class="dialog-footer">
            <button class="footer-link">常见问题</button>
            <button class="footer-link">咨询客服</button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'

type TProps = {
  visible: boolean
}

type TEmits = {
  (event: 'update:visible', value: boolean): void
  (event: 'purchase', data: { package: string; method: string }): void
}

const props = defineProps<TProps>()
const emit = defineEmits<TEmits>()

// 会员类型
const memberType = ref<'personal' | 'team'>('personal')

// 版本选择
const selectedVersion = ref<'basic' | 'pro' | 'expert'>('basic')

// 版本描述
const versionDescriptions = {
  basic: '适合非工商注册主体个人1人使用，体验创作，企业使用请选购高级版及以上版本',
  pro: '适合个人或小微企业使用，包含完整商用授权',
  expert: '适合专业设计师或团队使用，享有全部特权'
}

// 套餐选择
const selectedPackage = ref<string>('lifetime')

// 套餐列表
const packages = [
  {
    id: 'lifetime',
    name: '终身',
    price: 389,
    originalPrice: 399,
    promotion: '端午活动减10',
    discount: '已优惠10元',
    recommend: '长期性价比首选',
    recommendType: 'primary',
    expiry: '2125-5-27'
  },
  {
    id: 'quarter',
    name: '连续包季',
    price: 59,
    originalPrice: 79,
    promotion: '首季立减20',
    discount: '',
    recommend: '作图尝鲜',
    recommendType: 'normal',
    expiry: ''
  },
  {
    id: '2year',
    name: '2年',
    price: 199,
    originalPrice: 239,
    promotion: '',
    discount: '',
    recommend: '8.3元/月、送600积分',
    recommendType: 'normal',
    expiry: ''
  },
  {
    id: 'year',
    name: '连续包年',
    price: 139,
    originalPrice: 159,
    promotion: '端午活动减20',
    discount: '',
    recommend: '每天0.38元、送600积分',
    recommendType: 'normal',
    expiry: ''
  }
]

// 当前选中的套餐
const currentPackage = computed(() => {
  return packages.find(pkg => pkg.id === selectedPackage.value)
})

// 权益列表 - 使用字符串标识，在模板中渲染SVG
const benefits = [
  {
    id: 1,
    name: '个人商用授权*1',
    desc: '仅支持个体商用授权',
    iconType: 'shield'
  },
  {
    id: 2,
    name: '无限画布',
    desc: 'AI设计助理，智能搞定一切',
    iconType: 'canvas'
  },
  {
    id: 3,
    name: '送600积分',
    desc: '赋能AI创作，灵感不息',
    iconType: 'points'
  },
  {
    id: 4,
    name: '无水印高清下载',
    desc: '所有作品可无水印下载',
    iconType: 'download'
  },
  {
    id: 5,
    name: '100万+设计模板',
    desc: '每日更新，轻松完成设计',
    iconType: 'template'
  },
  {
    id: 6,
    name: 'AI生图&视频模型',
    desc: '主流AI模型持续更新',
    iconType: 'ai'
  },
  {
    id: 7,
    name: '智能抠图',
    desc: '一键抠图，精准高效',
    iconType: 'cutout'
  },
  {
    id: 8,
    name: '批量设计',
    desc: '一键生成多尺寸设计',
    iconType: 'batch'
  }
]

// 支付方式
const paymentMethod = ref<'alipay' | 'wechat'>('alipay')

// 关闭弹窗
const handleClose = () => {
  emit('update:visible', false)
}

// 确认购买
const handlePurchase = () => {
  emit('purchase', {
    package: selectedPackage.value,
    method: paymentMethod.value
  })
}
</script>

<style lang="less" scoped>
.vip-dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 2147483647;
  display: flex;
  align-items: center;
  justify-content: center;
}

.vip-dialog {
  width: 900px;
  max-width: 95vw;
  max-height: 90vh;
  background: #fff;
  border-radius: 16px;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #f0f0f0;
  
  .user-info {
    display: flex;
    align-items: center;
    gap: 12px;
    
    .user-avatar {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      
      svg {
        color: #fff;
      }
    }
    
    .user-detail {
      .user-name {
        font-size: 16px;
        font-weight: 600;
        color: #333;
      }
      
      .user-tag {
        display: inline-block;
        background: #f5f5f5;
        color: #666;
        font-size: 12px;
        padding: 2px 8px;
        border-radius: 4px;
        margin-top: 4px;
      }
      
      .user-desc {
        font-size: 12px;
        color: #999;
        margin-top: 4px;
      }
    }
  }
  
  .header-right {
    display: flex;
    align-items: center;
    gap: 12px;
    
    .coupon-btn {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 8px 16px;
      background: #f5f5f5;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      font-size: 13px;
      color: #666;
      cursor: pointer;
      transition: all 0.2s;
      
      &:hover {
        background: #eee;
      }
      
      svg {
        color: #f59e0b;
      }
    }
    
    .close-btn {
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: transparent;
      border: none;
      cursor: pointer;
      color: #999;
      transition: all 0.2s;
      
      &:hover {
        color: #333;
        background: #f5f5f5;
        border-radius: 50%;
      }
    }
  }
}

.membership-type {
  padding: 16px 24px;
  border-bottom: 1px solid #f0f0f0;
  
  .type-tabs {
    display: flex;
    gap: 0;
    margin-bottom: 12px;
    
    .type-tab {
      padding: 10px 20px;
      background: #f5f5f5;
      border: none;
      border-radius: 0;
      font-size: 14px;
      color: #666;
      cursor: pointer;
      transition: all 0.2s;
      
      &:first-child {
        border-radius: 8px 0 0 8px;
      }
      
      &:last-child {
        border-radius: 0 8px 8px 0;
      }
      
      &.active {
        background: #fff;
        color: #7c3aed;
        font-weight: 500;
        box-shadow: 0 0 0 1px #7c3aed;
      }
    }
  }
  
  .version-tabs {
    display: flex;
    gap: 12px;
    margin-bottom: 8px;
    
    .version-tab {
      padding: 8px 16px;
      background: #f5f5f5;
      border: 2px solid transparent;
      border-radius: 8px;
      font-size: 13px;
      color: #666;
      cursor: pointer;
      transition: all 0.2s;
      
      &.active {
        background: #fff;
        border-color: #7c3aed;
        color: #7c3aed;
        font-weight: 500;
        box-shadow: 0 2px 8px rgba(124, 58, 237, 0.2);
      }
    }
  }
  
  .version-desc {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    color: #999;
    
    .help-btn {
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: transparent;
      border: none;
      cursor: pointer;
      color: #999;
      
      &:hover {
        color: #7c3aed;
      }
    }
  }
}

.packages-section {
  padding: 20px 24px;
  border-bottom: 1px solid #f0f0f0;
  
  .packages-container {
    display: flex;
    gap: 12px;
    overflow-x: auto;
    
    .package-card {
      position: relative;
      width: 140px;
      padding: 16px 12px;
      background: #fff;
      border: 2px solid #e0e0e0;
      border-radius: 12px;
      cursor: pointer;
      transition: all 0.2s;
      flex-shrink: 0;
      
      &:hover {
        border-color: #c4b5fd;
      }
      
      &.active {
        border-color: #7c3aed;
        background: linear-gradient(135deg, #f8f7ff 0%, #fff 100%);
        box-shadow: 0 4px 12px rgba(124, 58, 237, 0.15);
      }
      
      .promotion-tag {
        position: absolute;
        top: -8px;
        left: 8px;
        background: #ef4444;
        color: #fff;
        font-size: 11px;
        padding: 2px 8px;
        border-radius: 4px;
        white-space: nowrap;
      }
      
      .package-name {
        font-size: 16px;
        font-weight: 600;
        color: #333;
        text-align: center;
      }
      
      .package-price {
        text-align: center;
        margin: 8px 0;
        
        .price-symbol {
          font-size: 14px;
          color: #ef4444;
        }
        
        .price-value {
          font-size: 28px;
          font-weight: 700;
          color: #ef4444;
        }
      }
      
      .discount-tag {
        text-align: center;
        font-size: 11px;
        color: #f59e0b;
        margin-bottom: 8px;
      }
      
      .recommend-tag {
        text-align: center;
        font-size: 11px;
        padding: 4px 0;
        border-radius: 4px;
        margin-top: 8px;
        
        &.primary {
          background: #7c3aed;
          color: #fff;
        }
        
        &.normal {
          background: #f5f5f5;
          color: #666;
        }
      }
      
      .package-expiry {
        text-align: center;
        font-size: 11px;
        color: #999;
        margin-top: 8px;
      }
    }
  }
}

.benefits-section {
  padding: 16px 24px;
  border-bottom: 1px solid #f0f0f0;
  
  .benefits-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
    
    .benefits-title {
      font-size: 14px;
      font-weight: 600;
      color: #333;
    }
    
    .more-btn {
      font-size: 12px;
      color: #7c3aed;
      background: transparent;
      border: none;
      cursor: pointer;
      
      &:hover {
        color: #6d28d9;
      }
    }
  }
  
  .benefits-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
    
    .benefit-card {
      text-align: center;
      padding: 12px 8px;
      
      .benefit-icon {
        width: 40px;
        height: 40px;
        margin: 0 auto 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
        border-radius: 10px;
        
        svg {
          width: 24px;
          height: 24px;
          color: #7c3aed;
        }
      }
      
      .benefit-name {
        font-size: 12px;
        font-weight: 500;
        color: #333;
        margin-bottom: 4px;
      }
      
      .benefit-desc {
        font-size: 11px;
        color: #999;
      }
    }
  }
}

.payment-section {
  padding: 20px 24px;
  display: flex;
  gap: 24px;
  
  .payment-left {
    flex: 1;
    
    .price-display {
      margin-bottom: 16px;
      
      .final-price {
        display: flex;
        align-items: baseline;
        
        .price-symbol {
          font-size: 18px;
          color: #ef4444;
        }
        
        .price-value {
          font-size: 36px;
          font-weight: 700;
          color: #ef4444;
        }
      }
      
      .original-price {
        font-size: 12px;
        color: #999;
        margin-top: 4px;
      }
      
      .coupon-tag {
        display: inline-block;
        background: #fef3c7;
        color: #f59e0b;
        font-size: 12px;
        padding: 2px 8px;
        border-radius: 4px;
        margin-top: 4px;
      }
    }
    
    .payment-methods {
      .payment-tabs {
        display: flex;
        gap: 12px;
        
        .payment-tab {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          background: #fff;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          font-size: 14px;
          color: #666;
          cursor: pointer;
          transition: all 0.2s;
          
          img {
            width: 24px;
            height: 24px;
          }
          
          &.active {
            border-color: #7c3aed;
            color: #7c3aed;
            box-shadow: 0 2px 8px rgba(124, 58, 237, 0.15);
          }
          
          svg {
            width: 24px;
            height: 24px;
            color: currentColor;
          }
        }
      }
    }
    
    .agreement-tip {
      font-size: 11px;
      color: #999;
      margin-top: 12px;
    }
    
    .transfer-btn {
      margin-top: 12px;
      padding: 10px 20px;
      background: transparent;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      font-size: 13px;
      color: #666;
      cursor: pointer;
      transition: all 0.2s;
      
      &:hover {
        border-color: #7c3aed;
        color: #7c3aed;
      }
    }
  }
  
  .payment-right {
    width: 180px;
    
    .qr-code {
      width: 160px;
      height: 160px;
      background: #f5f5f5;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      
      .qr-placeholder {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        
        svg {
          color: #999;
        }
        
        span {
          font-size: 12px;
          color: #999;
        }
      }
    }
    
    .payment-icons {
      display: flex;
      justify-content: center;
      gap: 16px;
      margin-top: 12px;
      
      svg {
        width: 24px;
        height: 24px;
        color: #666;
      }
    }
  }
}

.dialog-footer {
  display: flex;
  justify-content: center;
  gap: 24px;
  padding: 16px 24px;
  border-top: 1px solid #f0f0f0;
  
  .footer-link {
    font-size: 13px;
    color: #7c3aed;
    background: transparent;
    border: none;
    cursor: pointer;
    
    &:hover {
      color: #6d28d9;
    }
  }
}

.dialog-fade-enter-active,
.dialog-fade-leave-active {
  transition: opacity 0.3s ease;
}

.dialog-fade-enter-from,
.dialog-fade-leave-to {
  opacity: 0;
}
</style>