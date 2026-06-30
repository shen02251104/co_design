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

// ==================== 用户设计作品 ====================

export async function getUserDesigns(userId: string, page: number = 1, pageSize: number = 20): Promise<any[]> {
  try {
    const offset = (page - 1) * pageSize
    const results = await query(
      `SELECT id, name, type, cover_url, width, height, created_at, updated_at, status 
       FROM user_designs WHERE user_id = ? ORDER BY updated_at DESC LIMIT ? OFFSET ?`,
      [userId, pageSize, offset]
    )
    return results as any[]
  } catch (error) {
    console.error('获取用户设计失败:', error)
    return []
  }
}

export async function getDesignCount(userId: string) {
  try {
    const results = await query(
      'SELECT COUNT(*) as count FROM user_designs WHERE user_id = ?',
      [userId]
    )
    return (results as any[])[0]?.count || 0
  } catch (error) {
    console.error('获取设计数量失败:', error)
    return 0
  }
}

export async function deleteDesign(userId: string, designId: string) {
  try {
    await query(
      'DELETE FROM user_designs WHERE id = ? AND user_id = ?',
      [designId, userId]
    )
    return true
  } catch (error) {
    console.error('删除设计失败:', error)
    return false
  }
}

export async function updateDesignStatus(userId: string, designId: string, status: string) {
  try {
    await query(
      'UPDATE user_designs SET status = ? WHERE id = ? AND user_id = ?',
      [status, designId, userId]
    )
    return true
  } catch (error) {
    console.error('更新设计状态失败:', error)
    return false
  }
}

// ==================== 系统通知 ====================

export async function getUserNotifications(userId: string, page: number = 1, pageSize: number = 20): Promise<any[]> {
  try {
    const offset = (page - 1) * pageSize
    const results = await query(
      `SELECT id, type, title, content, is_read, created_at 
       FROM user_notifications WHERE user_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?`,
      [userId, pageSize, offset]
    )
    return results as any[]
  } catch (error) {
    console.error('获取通知失败:', error)
    return []
  }
}

export async function getUnreadCount(userId: string) {
  try {
    const results = await query(
      'SELECT COUNT(*) as count FROM user_notifications WHERE user_id = ? AND is_read = 0',
      [userId]
    )
    return (results as any[])[0]?.count || 0
  } catch (error) {
    console.error('获取未读数量失败:', error)
    return 0
  }
}

export async function markNotificationRead(userId: string, notificationId: string) {
  try {
    await query(
      'UPDATE user_notifications SET is_read = 1 WHERE id = ? AND user_id = ?',
      [notificationId, userId]
    )
    return true
  } catch (error) {
    console.error('标记已读失败:', error)
    return false
  }
}

export async function markAllRead(userId: string) {
  try {
    await query(
      'UPDATE user_notifications SET is_read = 1 WHERE user_id = ?',
      [userId]
    )
    return true
  } catch (error) {
    console.error('全部标记已读失败:', error)
    return false
  }
}

export async function createNotification(userId: string, type: string, title: string, content: string) {
  try {
    await query(
      'INSERT INTO user_notifications (user_id, type, title, content, is_read, created_at) VALUES (?, ?, ?, ?, 0, NOW())',
      [userId, type, title, content]
    )
    return true
  } catch (error) {
    console.error('创建通知失败:', error)
    return false
  }
}

// ==================== 邀请奖励系统 ====================

export async function getReferralInfo(userId: string) {
  try {
    // 获取用户的邀请码和统计
    const results = await query(
      `SELECT referral_code, total_invites, successful_invites, total_rewards 
       FROM user_referral WHERE user_id = ?`,
      [userId]
    )
    const referralInfo = (results as any[])[0]
    
    if (!referralInfo) {
      // 如果没有记录，生成一个邀请码
      const referralCode = `REF${userId.substring(0, 8).toUpperCase()}`
      await query(
        'INSERT INTO user_referral (user_id, referral_code, total_invites, successful_invites, total_rewards) VALUES (?, ?, 0, 0, 0)',
        [userId, referralCode]
      )
      return {
        referralCode,
        totalInvites: 0,
        successfulInvites: 0,
        totalRewards: 0
      }
    }
    
    return {
      referralCode: referralInfo.referral_code,
      totalInvites: referralInfo.total_invites,
      successfulInvites: referralInfo.successful_invites,
      totalRewards: referralInfo.total_rewards
    }
  } catch (error) {
    console.error('获取邀请信息失败:', error)
    return null
  }
}

export async function createReferral(referrerId: string, inviteeId: string) {
  try {
    // 记录邀请关系
    await query(
      'INSERT INTO referral_records (referrer_id, invitee_id, status, created_at) VALUES (?, ?, "pending", NOW())',
      [referrerId, inviteeId]
    )
    
    // 更新邀请统计
    await query(
      'UPDATE user_referral SET total_invites = total_invites + 1 WHERE user_id = ?',
      [referrerId]
    )
    
    return { success: true }
  } catch (error) {
    console.error('创建邀请失败:', error)
    return null
  }
}

export async function getReferralRewards(userId: string) {
  try {
    const results = await query(
      `SELECT id, type, amount, status, created_at 
       FROM referral_rewards WHERE user_id = ? ORDER BY created_at DESC`,
      [userId]
    )
    return results
  } catch (error) {
    console.error('获取奖励列表失败:', error)
    return []
  }
}

export async function claimReward(userId: string, rewardId: string) {
  try {
    await query(
      'UPDATE referral_rewards SET status = "claimed", claimed_at = NOW() WHERE id = ? AND user_id = ?',
      [rewardId, userId]
    )
    return true
  } catch (error) {
    console.error('领取奖励失败:', error)
    return false
  }
}

// ==================== 优惠券系统 ====================

export async function getAvailableCoupons(userId: string) {
  try {
    // 获取可领取的优惠券（排除已领取的）
    const results = await query(
      `SELECT c.id, c.name, c.type, c.discount_value, c.min_amount, c.max_discount, 
              c.valid_from, c.valid_until, c.total_count, c.used_count
       FROM coupons c
       WHERE c.status = 'active' 
         AND c.valid_from <= NOW() 
         AND c.valid_until >= NOW()
         AND c.used_count < c.total_count
         AND c.id NOT IN (SELECT coupon_id FROM user_coupons WHERE user_id = ?)
       ORDER BY c.discount_value DESC`,
      [userId]
    )
    return results
  } catch (error) {
    console.error('获取可领取优惠券失败:', error)
    return []
  }
}

export async function getUserCoupons(userId: string) {
  try {
    const results = await query(
      `SELECT uc.id, uc.coupon_id, c.name, c.type, c.discount_value, c.min_amount, 
              c.max_discount, uc.status, uc.claimed_at, uc.used_at, c.valid_until
       FROM user_coupons uc
       JOIN coupons c ON uc.coupon_id = c.id
       WHERE uc.user_id = ? 
       ORDER BY uc.claimed_at DESC`,
      [userId]
    )
    return results
  } catch (error) {
    console.error('获取用户优惠券失败:', error)
    return []
  }
}

export async function claimCoupon(userId: string, couponId: string) {
  try {
    // 检查是否已领取
    const existing = await query(
      'SELECT id FROM user_coupons WHERE user_id = ? AND coupon_id = ?',
      [userId, couponId]
    )
    if ((existing as any[]).length > 0) {
      throw new Error('已领取该优惠券')
    }
    
    // 领取优惠券
    await query(
      'INSERT INTO user_coupons (user_id, coupon_id, status, claimed_at) VALUES (?, ?, "available", NOW())',
      [userId, couponId]
    )
    
    // 更新优惠券使用计数
    await query(
      'UPDATE coupons SET used_count = used_count + 1 WHERE id = ?',
      [couponId]
    )
    
    return true
  } catch (error) {
    console.error('领取优惠券失败:', error)
    throw error
  }
}

export async function useCoupon(userId: string, couponId: string, orderId: string) {
  try {
    await query(
      'UPDATE user_coupons SET status = "used", used_at = NOW(), order_id = ? WHERE coupon_id = ? AND user_id = ?',
      [orderId, couponId, userId]
    )
    return true
  } catch (error) {
    console.error('使用优惠券失败:', error)
    return false
  }
}

export async function createCoupon(couponData: any) {
  try {
    await query(
      `INSERT INTO coupons (name, type, discount_value, min_amount, max_discount, valid_from, valid_until, total_count, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'active')`,
      [couponData.name, couponData.type, couponData.discountValue, couponData.minAmount, 
       couponData.maxDiscount, couponData.validFrom, couponData.validUntil, couponData.totalCount]
    )
    return true
  } catch (error) {
    console.error('创建优惠券失败:', error)
    return false
  }
}