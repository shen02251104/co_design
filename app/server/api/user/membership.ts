// 用户会员状态 API
import { Pool } from 'pg';

// 数据库连接池
let pool: Pool | null = null;

function getPool(): Pool {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.COZE_DATABASE_URL || process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
    });
  }
  return pool;
}

/**
 * 验证用户 token 并获取用户ID
 * 注意：实际项目中应该使用 Supabase Auth 验证
 */
async function verifyUser(token: string): Promise<string | null> {
  // 模拟验证 - 实际项目中需要调用 Supabase Auth API
  // 这里暂时返回一个默认用户ID用于测试
  if (!token) return null;
  
  // TODO: 实际验证逻辑
  // const supabase = createClient(process.env.COZE_SUPABASE_URL!, process.env.COZE_SUPABASE_ANON_KEY!);
  // const { data: { user }, error } = await supabase.auth.getUser(token);
  // if (error || !user) return null;
  // return user.id;
  
  // 模拟返回用户ID（实际项目中需要替换为真实验证）
  return 'user_' + token.substring(0, 8);
}

export default defineEventHandler(async (event) => {
  const method = getMethod(event);
  const pool = getPool();
  
  // 获取 token from header
  const authHeader = getHeader(event, 'x-session');
  const token = authHeader?.replace('Bearer ', '') || '';
  
  // 验证用户
  const userId = await verifyUser(token);
  
  if (method === 'GET') {
    // 获取用户会员状态
    if (!userId) {
      // 未登录用户返回默认状态
      return {
        vip_level: 'free',
        ai_usage_count: 0,
        ai_usage_limit: 5,
        ai_extra_count: 0,
        vip_start_date: null,
        vip_end_date: null,
        is_vip: false
      };
    }
    
    try {
      const result = await pool.query(
        'SELECT * FROM user_membership WHERE user_id = $1',
        [userId]
      );
      
      if (result.rows.length === 0) {
        // 用户没有会员记录，创建默认记录
        await pool.query(
          `INSERT INTO user_membership (user_id, vip_level, ai_usage_count, ai_extra_count, ai_usage_reset_at)
           VALUES ($1, 'free', 0, 0, CURRENT_DATE)`,
          [userId]
        );
        
        return {
          vip_level: 'free',
          ai_usage_count: 0,
          ai_usage_limit: 5,
          ai_extra_count: 0,
          vip_start_date: null,
          vip_end_date: null,
          is_vip: false
        };
      }
      
      const membership = result.rows[0];
      
      // 根据 VIP 级别计算 AI 使用限额
      const aiLimits: Record<string, number> = {
        free: 5,
        basic: 50,
        pro: 200,
        lifetime: 999999 // 无限
      };
      
      const limit = aiLimits[membership.vip_level] || 5;
      
      // 检查是否需要重置月度使用次数
      const now = new Date();
      const resetDate = new Date(membership.ai_usage_reset_at);
      const shouldReset = now.getMonth() !== resetDate.getMonth() || now.getFullYear() !== resetDate.getFullYear();
      
      if (shouldReset) {
        await pool.query(
          `UPDATE user_membership 
           SET ai_usage_count = 0, ai_usage_reset_at = CURRENT_DATE, updated_at = CURRENT_TIMESTAMP
           WHERE user_id = $1`,
          [userId]
        );
        membership.ai_usage_count = 0;
      }
      
      return {
        vip_level: membership.vip_level,
        ai_usage_count: membership.ai_usage_count,
        ai_usage_limit: limit,
        ai_extra_count: membership.ai_extra_count,
        vip_start_date: membership.vip_start_date,
        vip_end_date: membership.vip_end_date,
        is_vip: membership.vip_level !== 'free'
      };
    } catch (error) {
      console.error('Failed to get membership:', error);
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to get membership status'
      });
    }
  }
  
  if (method === 'POST') {
    // 更新用户会员状态（用于支付成功后调用）
    if (!userId) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Unauthorized'
      });
    }
    
    const body = await readBody(event);
    const { vip_level, duration_days, ai_extra_credits } = body;
    
    try {
      // 计算会员到期时间
      let vipEndDate: Date | null = null;
      if (duration_days && vip_level !== 'lifetime') {
        vipEndDate = new Date();
        vipEndDate.setDate(vipEndDate.getDate() + duration_days);
      } else if (vip_level === 'lifetime') {
        vipEndDate = null; // 永久会员
      }
      
      // 更新会员状态
      const result = await pool.query(
        `UPDATE user_membership 
         SET vip_level = $1, 
             vip_start_date = CURRENT_TIMESTAMP,
             vip_end_date = $2,
             ai_extra_count = ai_extra_count + $3,
             updated_at = CURRENT_TIMESTAMP
         WHERE user_id = $4
         RETURNING *`,
        [vip_level, vipEndDate, ai_extra_credits || 0, userId]
      );
      
      if (result.rows.length === 0) {
        // 用户不存在，创建新记录
        await pool.query(
          `INSERT INTO user_membership (user_id, vip_level, vip_start_date, vip_end_date, ai_extra_count, ai_usage_reset_at)
           VALUES ($1, $2, CURRENT_TIMESTAMP, $3, $4, CURRENT_DATE)`,
          [userId, vip_level, vipEndDate, ai_extra_credits || 0]
        );
      }
      
      return {
        success: true,
        vip_level,
        vip_end_date: vipEndDate
      };
    } catch (error) {
      console.error('Failed to update membership:', error);
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to update membership status'
      });
    }
  }
  
  if (method === 'PUT') {
    // 消耗 AI 使用次数
    if (!userId) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Unauthorized'
      });
    }
    
    const body = await readBody(event);
    const { count = 1 } = body;
    
    try {
      const result = await pool.query(
        `UPDATE user_membership 
         SET ai_usage_count = ai_usage_count + $1, updated_at = CURRENT_TIMESTAMP
         WHERE user_id = $2
         RETURNING *`,
        [count, userId]
      );
      
      const membership = result.rows[0];
      const aiLimits: Record<string, number> = {
        free: 5,
        basic: 50,
        pro: 200,
        lifetime: 999999
      };
      
      const limit = aiLimits[membership?.vip_level] || 5;
      const totalLimit = limit + (membership?.ai_extra_count || 0);
      const remaining = totalLimit - (membership?.ai_usage_count || 0);
      
      return {
        success: true,
        used: count,
        remaining: Math.max(0, remaining),
        total_limit: totalLimit
      };
    } catch (error) {
      console.error('Failed to use AI credits:', error);
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to use AI credits'
      });
    }
  }
  
  throw createError({
    statusCode: 405,
    statusMessage: 'Method not allowed'
  });
});