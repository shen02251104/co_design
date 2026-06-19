/*
 * @Author: Jeremy Yu
 * @Date: 2024-03-28 21:00:00
 * @Description:
 * @LastEditors: ShawnPhang <https://m.palxp.cn>
 * @LastEditTime: 2024-08-12 09:29:35
 */


import { customAlphabet } from 'nanoid/non-secure'
import { TWidgetStore, TdWidgetData } from '..'
import { useCanvasStore, useWidgetStore } from '@/store'
const nanoid = customAlphabet('1234567890abcdef', 12)

// TODO: 选择模板
export function setTemplate(store: TWidgetStore, allWidgets: TdWidgetData[]) {
  // const historyStore = useHistoryStore()
  const canvasStore = useCanvasStore()
  const widgetStore = useWidgetStore()
  console.log('setTemplate - 接收到的 allWidgets:', allWidgets)
  console.log('setTemplate - allWidgets 类型:', typeof allWidgets, Array.isArray(allWidgets))
  // 文本组件默认配置
  const defaultFontClass = {
    alias: '思源黑体',
    id: 1,
    value: 'SourceHanSansSC-Regular',
    url: 'https://fonts.googleapis.cn/css2?family=Noto+Sans+SC:wght@400;700&display=swap'
  }
  
  allWidgets.forEach((item, index) => {
    console.log(`setTemplate - 处理第 ${index} 个 widget:`, item)
    // 重设 uuid（如果 uuid 是负数如 "-1"，需要生成新的唯一 uuid）
    if (Number(item.uuid) < 0 || !item.uuid) {
      item.uuid = nanoid()
      console.log(`setTemplate - widget ${index} 生成新 uuid: ${item.uuid}`)
    }
    // 修复 type 格式：将 "text"、"image"、"qrcode" 转换为 "w-text"、"w-image"、"w-qrcode"
    if (item.type === 'text') item.type = 'w-text'
    if (item.type === 'image') item.type = 'w-image'
    if (item.type === 'qrcode') item.type = 'w-qrcode'
    if (item.type === 'svg') item.type = 'w-svg'
    if (item.type === 'group') item.type = 'w-group'
    // 修复 parent 字段：如果没有 parent，设置为 "-1"（页面根节点）
    if (!item.parent) {
      item.parent = '-1'
      console.log(`setTemplate - widget ${index} 自动设置 parent: '-1'`)
    }
    // 为文本组件补充必需的默认字段
    if (item.type === 'w-text') {
      if (!item.fontClass) item.fontClass = defaultFontClass
      if (!item.lineHeight) item.lineHeight = 1.2
      if (!item.textAlign) item.textAlign = 'left'
      if (!item.fontWeight) item.fontWeight = 400
      if (!item.fontStyle) item.fontStyle = 'normal'
      if (!item.writingMode) item.writingMode = 'horizontal-tb'
      if (!item.textDecoration) item.textDecoration = 'none'
      if (!item.opacity) item.opacity = 1
      if (!item.record) item.record = { width: 0, height: 0, minWidth: item.fontSize || 24, minHeight: (item.fontSize || 24) * 1.2, dir: 'horizontal' }
      console.log(`setTemplate - widget ${index} 补充文本默认字段`)
    }
    console.log(`setTemplate - widget ${index} 处理后:`, item)
    item.text && (item.text = decodeURIComponent(item.text))
    store.dWidgets.push(item)
  })
  console.log('setTemplate - 处理后 store.dWidgets:', store.dWidgets)
  widgetStore.updateDWidgets()
  canvasStore.reChangeCanvas()
  console.log('setTemplate - 完成')
}
