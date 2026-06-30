// 模板分类 API - 获取所有模板分类
import { getTemplateCategories } from '../../utils/db'

export default defineEventHandler(async (event) => {
  try {
    const categories = await getTemplateCategories()
    
    return {
      code: 200,
      data: {
        categories
      }
    }
  } catch (error: any) {
    console.error('获取模板分类失败:', error)
    return {
      code: 500,
      message: error.message || '获取模板分类失败'
    }
  }
})