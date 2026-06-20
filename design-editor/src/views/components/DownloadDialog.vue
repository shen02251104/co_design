<template>
  <Teleport to="body">
    <!-- 遮罩层 -->
    <div v-if="visible" class="download-overlay" @click="handleClose"></div>
    
    <!-- 弹窗 -->
    <div v-if="visible" class="download-dialog">
      <!-- 头部 -->
      <div class="dialog-header">
        <h3 class="dialog-title">导出作品</h3>
        <button class="close-btn" @click="handleClose">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M13 1L1 13M1 1L13 13" stroke="#666" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </button>
      </div>
      
      <!-- 内容区 -->
      <div class="dialog-content">
        <!-- 预览区 -->
        <div class="preview-section">
          <div class="preview-image">
            <img v-if="previewUrl" :src="previewUrl" alt="预览" />
            <div v-else class="preview-placeholder">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <rect x="4" y="4" width="40" height="40" rx="4" fill="#f5f5f5"/>
                <path d="M16 16L32 32M32 16L16 32" stroke="#ddd" stroke-width="2"/>
              </svg>
              <span>加载中...</span>
            </div>
          </div>
        </div>
        
        <!-- 格式选择 -->
        <div class="option-group">
          <label class="option-label">格式</label>
          <div class="format-options">
            <button 
              :class="['format-btn', { active: selectedFormat === 'png' }]"
              @click="selectedFormat = 'png'"
            >PNG</button>
            <button 
              :class="['format-btn', { active: selectedFormat === 'jpg' }]"
              @click="selectedFormat = 'jpg'"
            >JPG</button>
            <button 
              :class="['format-btn', { active: selectedFormat === 'pdf' }]"
              @click="selectedFormat = 'pdf'"
            >PDF</button>
          </div>
        </div>
        
        <!-- 清晰度选择 -->
        <div class="option-group">
          <label class="option-label">清晰度</label>
          <div class="quality-options">
            <button 
              :class="['quality-btn', { active: selectedQuality === 'original' }]"
              @click="selectedQuality = 'original'"
            >
              <span class="quality-name">原图</span>
              <span class="quality-desc">最高质量</span>
            </button>
            <button 
              :class="['quality-btn', { active: selectedQuality === 'high' }]"
              @click="selectedQuality = 'high'"
            >
              <span class="quality-name">高清</span>
              <span class="quality-desc">2倍放大</span>
            </button>
            <button 
              :class="['quality-btn', { active: selectedQuality === 'standard' }]"
              @click="selectedQuality = 'standard'"
            >
              <span class="quality-name">标准</span>
              <span class="quality-desc">适中大小</span>
            </button>
          </div>
        </div>
        
        <!-- 尺寸选择 -->
        <div class="option-group">
          <label class="option-label">尺寸</label>
          <div class="size-select-wrapper">
            <select v-model="selectedSize" class="size-select">
              <option value="original">原图 {{ canvasWidth }}×{{ canvasHeight }}</option>
              <option value="wechat_cover">微信封面 900×383</option>
              <option value="phone_poster">手机海报 1080×1920</option>
              <option value="xiaohongshu">小红书 1080×1440</option>
              <option value="custom">自定义尺寸</option>
            </select>
            <svg class="select-arrow" width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 4L6 8L10 4" stroke="#666" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </div>
        </div>
        
        <!-- 使用类型 -->
        <div class="option-group">
          <label class="option-label">使用类型</label>
          <div class="usage-options">
            <div 
              :class="['usage-card', { active: selectedUsage === 'personal' }]"
              @click="selectedUsage = 'personal'"
            >
              <div class="usage-header">
                <svg v-if="selectedUsage === 'personal'" class="check-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="7" stroke="#7c3aed" stroke-width="2" fill="#7c3aed"/>
                  <path d="M4 8L7 11L12 5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <svg v-else class="check-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="7" stroke="#ddd" stroke-width="2" fill="white"/>
                </svg>
                <span class="usage-title">个人交流学习/公益使用</span>
              </div>
              <div class="usage-desc">含水印，不可用于任何商业用途</div>
            </div>
            <div 
              :class="['usage-card', { active: selectedUsage === 'commercial' }]"
              @click="selectedUsage = 'commercial'"
            >
              <div class="usage-header">
                <svg v-if="selectedUsage === 'commercial'" class="check-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="7" stroke="#7c3aed" stroke-width="2" fill="#7c3aed"/>
                  <path d="M4 8L7 11L12 5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <svg v-else class="check-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="7" stroke="#ddd" stroke-width="2" fill="white"/>
                </svg>
                <span class="usage-title">商用授权</span>
                <span class="vip-tag">会员专享</span>
              </div>
              <div class="usage-desc">无水印，可用于商业用途</div>
            </div>
          </div>
        </div>
        
        <!-- 会员提示 -->
        <div class="vip-tip">
          <div class="vip-tip-content">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="9" fill="#f0e6ff"/>
              <path d="M10 5V10L13 13" stroke="#7c3aed" stroke-width="2" stroke-linecap="round"/>
            </svg>
            <span>开通会员，解锁全站内容无水印下载</span>
          </div>
          <button class="vip-btn">立即开通</button>
        </div>
      </div>
      
      <!-- 底部按钮 -->
      <div class="dialog-footer">
        <button class="download-btn watermarked" @click="handleDownload(true)">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 10V3M8 10L4 6M8 10L12 6M2 13H14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          带水印下载
        </button>
        <button class="download-btn no-watermark" @click="handleDownload(false)">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 10V3M8 10L4 6M8 10L12 6M2 13H14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          无水印下载
        </button>
      </div>
      
      <!-- 底部提示 -->
      <div class="dialog-bottom-tip">
        下载即视为您已阅读并同意<a href="#" class="link">《会员授权许可协议》</a>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'

const props = defineProps<{
  modelValue: boolean
  title: string
  canvasWidth?: number
  canvasHeight?: number
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'download', options: DownloadOptions): void
}>()

interface DownloadOptions {
  format: string
  quality: string
  size: string
  usage: string
  watermark: boolean
  scale: number
}

const visible = computed(() => props.modelValue)
const previewUrl = ref('')
const selectedFormat = ref('png')
const selectedQuality = ref('original')
const selectedSize = ref('original')
const selectedUsage = ref('personal')

const canvasWidth = computed(() => props.canvasWidth || 750)
const canvasHeight = computed(() => props.canvasHeight || 1000)

const handleClose = () => {
  emit('update:modelValue', false)
}

const getScale = () => {
  switch (selectedQuality.value) {
    case 'high': return 2
    case 'standard': return 1
    case 'original': return 1
    default: return 1
  }
}

const handleDownload = (watermark: boolean) => {
  emit('download', {
    format: selectedFormat.value,
    quality: selectedQuality.value,
    size: selectedSize.value,
    usage: selectedUsage.value,
    watermark,
    scale: getScale()
  })
  handleClose()
}

// 生成预览
onMounted(async () => {
  // 这里可以生成预览图
})
</script>

<style>
.download-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2147483646 !important;
}

.download-dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  max-height: 90vh;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  z-index: 2147483647 !important;
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

.dialog-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f0;
}

.dialog-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.close-btn {
  width: 28px;
  height: 28px;
  border: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  transition: background 0.2s;
}

.close-btn:hover {
  background: #f5f5f5;
}

.dialog-content {
  padding: 20px;
  overflow-y: auto;
  max-height: calc(90vh - 140px);
}

.preview-section {
  margin-bottom: 20px;
}

.preview-image {
  width: 100%;
  height: 160px;
  background: #f5f5f5;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.preview-image img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.preview-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: #999;
  font-size: 12px;
}

.option-group {
  margin-bottom: 16px;
}

.option-label {
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #333;
  margin-bottom: 8px;
}

.format-options {
  display: flex;
  gap: 8px;
}

.format-btn {
  padding: 8px 20px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  background: #fff;
  font-size: 13px;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;
}

.format-btn:hover {
  border-color: #7c3aed;
}

.format-btn.active {
  border-color: #7c3aed;
  background: #f5f0ff;
  color: #7c3aed;
}

.quality-options {
  display: flex;
  gap: 8px;
}

.quality-btn {
  flex: 1;
  padding: 10px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: #fff;
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;
}

.quality-btn:hover {
  border-color: #7c3aed;
}

.quality-btn.active {
  border-color: #7c3aed;
  background: #f5f0ff;
}

.quality-name {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.quality-btn.active .quality-name {
  color: #7c3aed;
}

.quality-desc {
  display: block;
  font-size: 12px;
  color: #999;
  margin-top: 2px;
}

.size-select-wrapper {
  position: relative;
}

.size-select {
  width: 100%;
  padding: 10px 14px;
  padding-right: 36px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: #fff;
  font-size: 13px;
  color: #333;
  cursor: pointer;
  appearance: none;
}

.size-select:focus {
  border-color: #7c3aed;
  outline: none;
}

.select-arrow {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}

.usage-options {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.usage-card {
  padding: 12px 14px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: #fff;
  cursor: pointer;
  transition: all 0.2s;
}

.usage-card:hover {
  border-color: #7c3aed;
}

.usage-card.active {
  border-color: #7c3aed;
  background: #f5f0ff;
}

.usage-header {
  display: flex;
  align-items: center;
  gap: 10px;
}

.check-icon {
  flex-shrink: 0;
}

.usage-title {
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.vip-tag {
  margin-left: auto;
  padding: 2px 8px;
  background: linear-gradient(135deg, #7c3aed, #a855f7);
  color: #fff;
  font-size: 11px;
  border-radius: 4px;
}

.usage-desc {
  font-size: 12px;
  color: #999;
  margin-top: 6px;
  padding-left: 26px;
}

.vip-tip {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 14px;
  background: #f5f0ff;
  border-radius: 8px;
  margin-bottom: 16px;
}

.vip-tip-content {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #7c3aed;
}

.vip-btn {
  padding: 6px 14px;
  background: linear-gradient(135deg, #7c3aed, #a855f7);
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
  transition: transform 0.2s;
}

.vip-btn:hover {
  transform: scale(1.02);
}

.dialog-footer {
  display: flex;
  gap: 12px;
  padding: 16px 20px;
  border-top: 1px solid #f0f0f0;
}

.download-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 12px 16px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.download-btn.watermarked {
  background: #f5f5f5;
  color: #666;
}

.download-btn.watermarked:hover {
  background: #e8e8e8;
}

.download-btn.no-watermark {
  background: linear-gradient(135deg, #7c3aed, #a855f7);
  color: #fff;
}

.download-btn.no-watermark:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(124, 58, 237, 0.3);
}

.dialog-bottom-tip {
  padding: 12px 20px;
  text-align: center;
  font-size: 12px;
  color: #999;
  background: #fafafa;
}

.link {
  color: #7c3aed;
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}
</style>