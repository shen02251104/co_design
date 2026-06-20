<!--
 * @Author: YiDesign
 * @Date: 2024-12-20
 * @Description: 下载作品弹窗组件
-->
<template>
  <el-dialog
    v-model="visible"
    title="导出作品"
    width="400px"
    :close-on-click-modal="false"
    :z-index="9999"
    class="download-dialog"
  >
    <div class="download-content">
      <!-- 文件信息 -->
      <div class="section">
        <div class="section-title">文件信息</div>
        <div class="options-row">
          <div class="option-group">
            <label>格式</label>
            <el-select v-model="downloadOptions.format" size="small">
              <el-option label="PNG" value="png" />
              <el-option label="JPG" value="jpg" />
              <el-option label="PDF" value="pdf" />
            </el-select>
          </div>
          <div class="option-group">
            <label>清晰度</label>
            <el-select v-model="downloadOptions.quality" size="small">
              <el-option label="原图" value="original" />
              <el-option label="高清(2x)" value="high" />
              <el-option label="标准(1x)" value="standard" />
            </el-select>
          </div>
          <div class="option-group">
            <label>尺寸</label>
            <el-select v-model="downloadOptions.size" size="small">
              <el-option label="原图" value="original" />
              <el-option label="微信封面(900x383)" value="wechat" />
              <el-option label="手机海报(750x1000)" value="mobile" />
              <el-option label="小红书(1080x1080)" value="xiaohongshu" />
            </el-select>
          </div>
        </div>
      </div>

      <!-- 使用类型 -->
      <div class="section">
        <div class="section-title">使用类型</div>
        <el-radio-group v-model="downloadOptions.usageType" class="usage-radio-group">
          <el-radio value="personal">
            <div class="radio-content">
              <span class="radio-title">个人交流学习/公益使用</span>
              <span class="radio-desc" v-if="downloadOptions.usageType === 'personal'">不可用于任何商业用途，下载作品含水印</span>
            </div>
          </el-radio>
          <el-radio value="commercial">
            <div class="radio-content">
              <span class="radio-title">商用授权</span>
              <span class="radio-desc" v-if="downloadOptions.usageType === 'commercial'">可用于商业用途，无水印高清下载</span>
            </div>
          </el-radio>
        </el-radio-group>
      </div>

      <!-- 水印选项 -->
      <div class="section" v-if="downloadOptions.usageType === 'personal'">
        <div class="watermark-tip">
          <el-icon><Warning /></el-icon>
          <span>个人使用版本将添加"易设计"水印</span>
        </div>
      </div>

      <!-- 会员提示 -->
      <div class="vip-section" v-if="downloadOptions.usageType === 'personal'">
        <div class="vip-tip">
          <span class="vip-icon">💎</span>
          <span>开通会员，解锁无水印下载及更多权益</span>
        </div>
        <el-button type="warning" size="small" class="vip-btn">立即开通</el-button>
      </div>

      <!-- 下载按钮 -->
      <div class="download-actions">
        <el-button 
          type="primary" 
          :loading="loading"
          @click="handleDownload"
          class="download-btn"
        >
          {{ downloadOptions.usageType === 'commercial' ? '无水印下载' : '带水印下载' }}
        </el-button>
        <div class="agreement-tip">
          下载即视为您已阅读并同意<a href="#" @click.prevent="showAgreement">《会员授权许可协议》</a>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue'
import { ElDialog, ElSelect, ElOption, ElButton, ElSwitch, ElRadioGroup, ElRadioButton, ElRadio, ElIcon, ElDivider } from 'element-plus'
import { Warning } from '@element-plus/icons-vue'

type TDownloadOptions = {
  format: string
  quality: string
  size: string
  usageType: string
}

const props = defineProps<{
  modelValue: boolean
  title?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'download', options: TDownloadOptions): void
}>()

const visible = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const loading = ref(false)

const downloadOptions = ref<TDownloadOptions>({
  format: 'png',
  quality: 'original',
  size: 'original',
  usageType: 'personal'
})

// 商用时自动去掉水印提示
watch(() => downloadOptions.value.usageType, (val) => {
  if (val === 'commercial') {
    // 商用默认高清无水印
    downloadOptions.value.quality = 'high'
  }
})

async function handleDownload() {
  loading.value = true
  try {
    emit('download', downloadOptions.value)
    // 关闭弹窗
    visible.value = false
  } finally {
    loading.value = false
  }
}

function showAgreement() {
  // 显示协议弹窗，暂时用 alert
  alert('会员授权许可协议：\n1. 个人使用版本仅供学习交流，不可商用\n2. 商用版本需开通会员\n3. 下载作品版权归原作者所有')
}
</script>

<style lang="scss">
/* 全局样式，确保弹窗在最上层 */
.download-dialog .el-dialog {
  z-index: 9999 !important;
}
.download-dialog .el-overlay {
  z-index: 9998 !important;
}
</style>

<style lang="scss" scoped>
.download-dialog {
  .download-content {
    padding: 10px 0;
  }

  .section {
    margin-bottom: 20px;
    
    .section-title {
      font-size: 14px;
      font-weight: 600;
      color: #333;
      margin-bottom: 12px;
    }
  }

  .options-row {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;

    .option-group {
      display: flex;
      align-items: center;
      gap: 8px;

      label {
        font-size: 12px;
        color: #666;
      }

      .el-select {
        width: 100px;
      }
    }
  }

  .usage-radio-group {
    width: 100%;
    
    .el-radio {
      width: 100%;
      margin-bottom: 10px;
      height: auto;
      align-items: flex-start;

      .radio-content {
        display: flex;
        flex-direction: column;
        gap: 4px;

        .radio-title {
          font-size: 13px;
          color: #333;
        }

        .radio-desc {
          font-size: 11px;
          color: #999;
        }
      }
    }
  }

  .watermark-tip {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 10px;
    background: #fff7e6;
    border-radius: 4px;
    font-size: 12px;
    color: #fa8c16;
  }

  .vip-section {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px;
    background: linear-gradient(135deg, #fff9e6, #ffe6cc);
    border-radius: 6px;
    margin-bottom: 16px;

    .vip-tip {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 13px;
      color: #d48806;

      .vip-icon {
        font-size: 16px;
      }
    }

    .vip-btn {
      background: linear-gradient(135deg, #ff9500, #ff6b00);
      color: white;
      border: none;
    }
  }

  .download-actions {
    text-align: center;

    .download-btn {
      width: 100%;
      height: 40px;
      font-size: 14px;
    }

    .agreement-tip {
      margin-top: 10px;
      font-size: 11px;
      color: #999;

      a {
        color: #409eff;
        text-decoration: none;
      }
    }
  }
}
</style>