// 数据库连接配置
import mysql from 'mysql2/promise'

// 从环境变量获取数据库配置（Nuxt 服务端可以直接访问 process.env）
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  database: process.env.DB_NAME || 'yi_design',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '123456',
}

console.log('数据库配置:', dbConfig)

// 创建连接池
let pool: mysql.Pool | null = null

export function getPool() {
  if (!pool) {
    pool = mysql.createPool(dbConfig)
  }
  return pool
}

export async function query(sql: string, params?: any[]) {
  const pool = getPool()
  try {
    const [results] = await pool.execute(sql, params)
    return results
  } catch (error) {
    console.error('Database query error:', error)
    throw error
  }
}

// 获取模板列表
export async function getTemplates(page: number = 1, pageSize: number = 20) {
  try {
    const offset = (page - 1) * pageSize
    const results = await query(
      'SELECT id, name, type, description, cover_url, preview_url, width, height FROM design_template LIMIT ? OFFSET ?',
      [pageSize, offset]
    )
    return results
  } catch (error) {
    console.error('获取模板列表失败:', error)
    return []
  }
}

// 获取模板详情（包含 template_data）
export async function getTemplateById(id: string | number) {
  try {
    const results = await query(
      'SELECT id, name, type, template_data, width, height FROM design_template WHERE id = ?',
      [id]
    )
    return (results as any[])[0] || null
  } catch (error) {
    console.error('获取模板详情失败:', error)
    return null
  }
}

// 获取模板列表（支持分类筛选）
export async function getTemplatesByCategory(category: string = 'all', page: number = 1, pageSize: number = 20) {
  try {
    const offset = (page - 1) * pageSize
    if (category === 'all') {
      const results = await query(
        'SELECT id, title, cover_image, width, height, category, is_vip, downloads, tags FROM design_templates LIMIT ? OFFSET ?',
        [pageSize, offset]
      )
      return results
    } else {
      const results = await query(
        'SELECT id, title, cover_image, width, height, category, is_vip, downloads, tags FROM design_templates WHERE category = ? LIMIT ? OFFSET ?',
        [category, pageSize, offset]
      )
      return results
    }
  } catch (error) {
    console.error('获取模板列表失败:', error)
    return []
  }
}

// 获取模板分类列表
export async function getTemplateCategories() {
  try {
    const results = await query(
      'SELECT category, COUNT(*) as count FROM design_templates GROUP BY category ORDER BY count DESC'
    )
    return results
  } catch (error) {
    console.error('获取模板分类失败:', error)
    return []
  }
}