// 数据库连接配置
import mysql from 'mysql2/promise'

// 从环境变量获取数据库配置
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  database: process.env.DB_NAME || 'yi_design',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
}

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

export async function getTemplates(search?: string, cate?: string, page: number = 1, pageSize: number = 20) {
  let sql = 'SELECT id, name, type, cover_url, preview_url, width, height, template_data, is_public, created_at, updated_at FROM design_template WHERE is_public = 1'
  const params: any[] = []
  
  if (search) {
    sql += ' AND name LIKE ?'
    params.push(`%${search}%`)
  }
  
  if (cate) {
    sql += ' AND type = ?'
    params.push(cate)
  }
  
  sql += ' ORDER BY created_at DESC LIMIT ? OFFSET ?'
  params.push(pageSize, (page - 1) * pageSize)
  
  return await query(sql, params)
}

export async function getTemplateById(id: string) {
  const sql = 'SELECT id, name, type, cover_url, preview_url, width, height, template_data, is_public, created_at, updated_at FROM design_template WHERE id = ?'
  const results = await query(sql, [id])
  return results
}

export async function closePool() {
  if (pool) {
    await pool.end()
    pool = null
  }
}