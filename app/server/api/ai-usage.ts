// AI Usage API - 获取用户AI设计次数使用情况
import { Pool } from 'pg';

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

// 用户会员等级对应的AI次数限制
const VIP_LIMITS: Record<string, number> = {
  free: 5,        // 免费版：5次/月
  basic: 50,      // 基础版：50次/月
  pro: 200,       // 专业版：200次/月
  lifetime: 999999  // 终身版：无限次
};

export default defineEventHandler(async (event) => {
  const method = getMethod(event);
  const pool = getPool();
  
  // 获取用户认证信息（实际项目应从 Supabase Auth 获取）
  const authHeader = getHeader(event, 'x-session') || getHeader(event, 'authorization');
  const userId = authHeader ? 'user_' + authHeader.substring(0, 8) : 'anonymous';
  
  // 获取用户会员状态
  async function getUserMembership() {
    try {
      const result = await pool.query(
        'SELECT * FROM user_membership WHERE user_id = $1',
        [userId]
      );
      
      if (result.rows.length === 0) {
        // 创建默认会员记录
        await pool.query(
          `INSERT INTO user_membership (user_id, vip_level, ai_usage_count, ai_extra_count, ai_usage_reset_at)
           VALUES ($1, 'free', 0, 0, CURRENT_DATE)`,
          [userId]
        );
        
        return {
          vip_level: 'free',
          ai_usage_count: 0,
          ai_extra_count: 0,
          ai_usage_reset_at: new Date()
        };
      }
      
      return result.rows[0];
    } catch (error) {
      console.error('Failed to get user membership:', error);
      return {
        vip_level: 'free',
        ai_usage_count: 0,
        ai_extra_count: 0,
        ai_usage_reset_at: new Date()
      };
    }
  }
  
  // 检查并重置月度使用次数
  async function checkAndResetMonthlyUsage(membership: any) {
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
    
    return membership;
  }
  
  if (method === 'GET') {
    // 获取使用情况
    let membership = await getUserMembership();
    membership = await checkAndResetMonthlyUsage(membership);
    
    const vipLimit = VIP_LIMITS[membership.vip_level] || VIP_LIMITS.free;
    const totalLimit = vipLimit + membership.ai_extra_count;
    const remaining = totalLimit - membership.ai_usage_count;
    const isUnlimited = membership.vip_level === 'lifetime';
    
    return {
      success: true,
      data: {
        vipLevel: membership.vip_level,
        vipLimit,
        usedCount: membership.ai_usage_count,
        extraCount: membership.ai_extra_count,
        remaining: isUnlimited ? -1 : Math.max(0, remaining),
        isVip: membership.vip_level !== 'free',
        isUnlimited
      }
    };
  }
  
  if (method === 'POST') {
    // 消耗一次AI设计次数
    let membership = await getUserMembership();
    membership = await checkAndResetMonthlyUsage(membership);
    
    const vipLimit = VIP_LIMITS[membership.vip_level] || VIP_LIMITS.free;
    const totalLimit = vipLimit + membership.ai_extra_count;
    
    if (membership.vip_level === 'lifetime') {
      // 终身版，无限次
      return {
        success: true,
        message: '终身会员，无次数限制',
        remaining: -1
      };
    }
    
    const remaining = totalLimit - membership.ai_usage_count;
    
    if (remaining <= 0) {
      // 次数已用完
      return {
        statusCode: 403,
        body: {
          success: false,
          error: 'AI次数已用完',
          code: 'USAGE_LIMIT_EXCEEDED',
          data: {
            vipLevel: membership.vip_level,
            usedCount: membership.ai_usage_count,
            vipLimit,
            extraCount: membership.ai_extra_count,
            remaining: 0
          },
          suggestions: [
            '升级会员获得更多次数',
            '购买次数包继续使用',
            '免费用户每月5次，下月刷新'
          ]
        }
      };
    }
    
    // 消耗次数
    await pool.query(
      `UPDATE user_membership 
       SET ai_usage_count = ai_usage_count + 1, updated_at = CURRENT_TIMESTAMP
       WHERE user_id = $1`,
      [userId]
    );
    
    const newRemaining = remaining - 1;
    
    return {
      success: true,
      message: '消耗成功',
      used: 1,
      remaining: newRemaining,
      canContinue: newRemaining > 0
    };
  }
  
  throw createError({
    statusCode: 405,
    statusMessage: 'Method not allowed'
  });
});