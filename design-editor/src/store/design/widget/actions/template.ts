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
  allWidgets.forEach((item, index) => {
    console.log(`setTemplate - 处理第 ${index} 个 widget:`, item)
    Number(item.uuid) < 0 && (item.uuid = nanoid()) // 重设id
    item.text && (item.text = decodeURIComponent(item.text))
    store.dWidgets.push(item)
  })
  console.log('setTemplate - 处理后 store.dWidgets:', store.dWidgets)
  widgetStore.updateDWidgets()
  canvasStore.reChangeCanvas()
  console.log('setTemplate - 完成')
}
