<!--
 * @Author: YiDesign
 * @Date: 2024-12-20
 * @Description: 下载作品弹窗组件 - 使用固定定位悬浮方式
-->
<template>
  <!-- 使用固定定位的悬浮弹窗 -->
  <div v-if="visible" class="download-overlay" @click.self="closeDialog">
    <div class="download-dialog-fixed">
      <div class="dialog-header">
        <span class="dialog-title">导出作品</span>
        <span class="dialog-close" @click="closeDialog">×</span>
      </div>
      
      <div class="dialog-body">
        <!-- 文件信息 -->
        <div class="section">
          <div class="section-title">文件信息</div>
          <div class="options-row">
            <div class="option-group">
              <label>格式</label>
              <select v-model="downloadOptions.format" class="custom-select">
                <option value="png">PNG</option>
                <option value="jpg">JPG</option>
                <option value="pdf">PDF</option>
              </select>
            </div>
            <div class="option-group">
              <label>清晰度</label>
              <select v-model="downloadOptions.quality" class="custom-select">
                <option value="original">原图</option>
                <option value="high">高清(2x)</option>
                <option value="standard">标准(1x)</option>
              </select>
            </div>
          </div>
          <div class="options-row">
            <div class="option-group">
              <label>尺寸</label>
              <select v-model="downloadOptions.size" class="custom-select">
                <option value="original">原图 ({{ dPage?.width || 750 }}×{{ dPage?.height || 1000 }})</option>
                <option value="wechat">微信封面 (900×383)</option>
                <option value="phone">手机海报 (750×1000)</option>
                <option value="xiaohongshu">小红书 (1080×1440)</option>
              </select>
            </div>
          </div>
        </div>

        <!-- 使用类型 -->
        <div class="section">
          <div class="section-title">使用类型</div>
          <div class="use-type-options">
            <div 
              class="use-type-option" 
              :class="{ active: downloadOptions.useType === 'personal' }"
              @click="downloadOptions.useType = 'personal'"
            >
              <div class="option-header">
                <span class="radio-dot"></span>
                <span class="option-label">个人交流学习/公益使用</span>
              </div>
              <div class="option-desc">含水印，不可用于任何商业用途</div>
            </div>
            <div 
              class="use-type-option" 
              :class="{ active: downloadOptions.useType === 'commercial' }"
              @click="downloadOptions.useType = 'commercial'"
            >
              <div class="option-header">
                <span class="radio-dot"></span>
                <span class="option-label">商用授权</span>
              </div>
              <div class="option-desc">无水印，可用于商业用途</div>
            </div>
          </div>
        </div>

        <!-- 会员提示 -->
        <div class="vip-tip">
          <div class="vip-text">
            <svg class="vip-icon" viewBox="0 0 24 24" width="16" height="16">
              <path fill="currentColor" d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
            </svg>
            <span>开通会员解锁无水印下载</span>
          </div>
          <button class="vip-btn">开通会员</button>
        </div>

        <!-- 下载按钮 -->
        <div class="download-buttons">
          <button class="download-btn primary" @click="handleDownload">
            {{ downloadOptions.useType === 'personal' ? '带水印下载' : '无水印下载' }}
          </button>
        </div>

        <!-- 协议提示 -->
        <div class="agreement-tip">
          下载即视为您已阅读并同意《会员授权许可协议》
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useCanvasStore } from '@/store'

const props = defineProps<{
  modelValue: boolean
  title?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'download', options: any): void
}>()

const canvasStore = useCanvasStore()
const dPage = computed(() => canvasStore.dPage)

const visible = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const downloadOptions = ref({
  format: 'png',
  quality: 'original',
  size: 'original',
  useType: 'personal'
})

const closeDialog = () => {
  emit('update:modelValue', false)
}

const handleDownload = () => {
  emit('download', {
    ...downloadOptions.value,
    scale: downloadOptions.value.quality === 'high' ? 2 : downloadOptions.value.quality === 'standard' ? 1 : 1,
    watermark: downloadOptions.value.useType === 'personal'
  })
  closeDialog()
}
</script>

<style lang="scss" scoped>
/* 遮罩层 - 固定定位在最上层 */
.download-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 99998;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 弹窗 - 固定定位在遮罩层之上 */
.download-dialog-fixed {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99999;
  width: 400px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  overflow: hidden;
}

.dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #eee;
  background: #f5f7fa;
}

.dialog-title {
  font-size: 16px;
  font-weight: 500;
  color: #333;
}

.dialog-close {
  font-size: 20px;
  color: #999;
  cursor: pointer;
  transition: color 0.2s;
  
  &:hover {
    color: #333;
  }
}

.dialog-body {
  padding: 20px;
}

.section {
  margin-bottom: 20px;
}

.section-title {
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 12px;
}

.options-row {
  display: flex;
  gap: 16px;
  margin-bottom: 12px;
}

.option-group {
  flex: 1;
  
  label {
    display: block;
    font-size: 12px;
    color: #666;
    margin-bottom: 6px;
  }
}

.custom-select {
  width: 100%;
  height: 32px;
  padding: 0 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  color: #333;
  background: #fff;
  cursor: pointer;
  transition: border-color 0.2s;
  
  &:focus {
    outline: none;
    border-color: #409eff;
  }
}

.use-type-options {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.use-type-option {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    border-color: #409eff;
  }
  
  &.active {
    border-color: #409eff;
    background: #f0f7ff;
    
    .radio-dot {
      background: #409eff;
      border-color: #409eff;
    }
  }
}

.option-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}

.radio-dot {
  width: 14px;
  height: 14px;
  border: 1px solid #ddd;
  border-radius: 50%;
  transition: all 0.2s;
}

.option-label {
  font-size: 14px;
  color: #333;
}

.option-desc {
  font-size: 12px;
  color: #999;
  padding-left: 22px;
}

.vip-tip {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: linear-gradient(135deg, #fff6e6 0%, #ffe4c4 100%);
  border-radius: 6px;
  margin-bottom: 20px;
}

.vip-text {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #e6a23c;
}

.vip-icon {
  color: #e6a23c;
}

.vip-btn {
  padding: 6px 12px;
  background: #e6a23c;
  color: #fff;
  font-size: 12px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  
  &:hover {
    background: #d4942b;
  }
}

.download-buttons {
  display: flex;
  justify-content: center;
  margin-bottom: 12px;
}

.download-btn {
  padding: 12px 48px;
  font-size: 14px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  
  &.primary {
    background: #409eff;
    color: #fff;
    
    &:hover {
      background: #66b1ff;
    }
  }
}

.agreement-tip {
  text-align: center;
  font-size: 12px;
  color: #999;
}
</style>