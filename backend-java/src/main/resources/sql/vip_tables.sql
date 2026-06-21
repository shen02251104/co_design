-- VIP会员系统数据库表结构

-- VIP套餐表
CREATE TABLE IF NOT EXISTS vip_package (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '套餐ID',
    name VARCHAR(50) NOT NULL COMMENT '套餐名称',
    type VARCHAR(20) NOT NULL COMMENT '套餐类型: lifetime终身, yearly年度, quarterly季度, monthly月度',
    version VARCHAR(20) NOT NULL COMMENT '版本类型: basic基础版, advanced高级版, pro专业版',
    usage_type VARCHAR(20) NOT NULL DEFAULT 'single' COMMENT '使用类型: single单人用, team团队用',
    original_price DECIMAL(10, 2) NOT NULL COMMENT '原价',
    current_price DECIMAL(10, 2) NOT NULL COMMENT '现价',
    valid_days INT NOT NULL COMMENT '有效天数: -1表示终身',
    is_recommended BOOLEAN DEFAULT FALSE COMMENT '是否推荐',
    activity_tag VARCHAR(100) COMMENT '活动标签',
    description VARCHAR(200) COMMENT '套餐描述',
    bonus_points INT DEFAULT 0 COMMENT '送积分数量',
    sort_order INT DEFAULT 0 COMMENT '排序权重',
    status INT DEFAULT 1 COMMENT '状态: 0禁用, 1启用',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='VIP套餐表';

-- VIP订单表
CREATE TABLE IF NOT EXISTS vip_order (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '订单ID',
    order_no VARCHAR(50) NOT NULL UNIQUE COMMENT '订单号',
    user_id BIGINT NOT NULL COMMENT '用户ID',
    package_id BIGINT NOT NULL COMMENT '套餐ID',
    package_name VARCHAR(50) COMMENT '套餐名称(冗余存储)',
    original_price DECIMAL(10, 2) COMMENT '原价',
    paid_amount DECIMAL(10, 2) COMMENT '实付金额',
    discount_amount DECIMAL(10, 2) COMMENT '优惠金额',
    payment_method VARCHAR(20) COMMENT '支付方式: alipay支付宝, wechat微信',
    payment_status VARCHAR(20) DEFAULT 'pending' COMMENT '支付状态: pending待支付, paid已支付, cancelled已取消, refunded已退款',
    trade_no VARCHAR(100) COMMENT '第三方支付交易号',
    coupon_id BIGINT COMMENT '优惠券ID',
    coupon_name VARCHAR(50) COMMENT '优惠券名称',
    vip_start_time DATETIME COMMENT 'VIP生效时间',
    vip_end_time DATETIME COMMENT 'VIP到期时间',
    vip_activated BOOLEAN DEFAULT FALSE COMMENT '是否已开通VIP',
    remark VARCHAR(200) COMMENT '订单备注',
    paid_at DATETIME COMMENT '支付时间',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    INDEX idx_user_id (user_id),
    INDEX idx_order_no (order_no),
    INDEX idx_payment_status (payment_status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='VIP订单表';

-- VIP权益表
CREATE TABLE IF NOT EXISTS vip_benefit (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '权益ID',
    name VARCHAR(50) NOT NULL COMMENT '权益名称',
    description VARCHAR(200) COMMENT '权益描述',
    icon VARCHAR(100) COMMENT '权益图标',
    type VARCHAR(50) NOT NULL COMMENT '权益类型: commercial商用授权, download无水印下载, template模板数量, ai AI功能, storage存储空间',
    value VARCHAR(50) COMMENT '权益值',
    applicable_version VARCHAR(20) COMMENT '适用版本: basic基础版, advanced高级版, pro专业版',
    sort_order INT DEFAULT 0 COMMENT '排序权重',
    status INT DEFAULT 1 COMMENT '状态: 0禁用, 1启用',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='VIP权益表';

-- VIP优惠券表
CREATE TABLE IF NOT EXISTS vip_coupon (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '优惠券ID',
    name VARCHAR(50) NOT NULL COMMENT '优惠券名称',
    code VARCHAR(20) NOT NULL UNIQUE COMMENT '优惠券码',
    type VARCHAR(20) NOT NULL COMMENT '类型: discount折扣券, reduction减免券',
    value DECIMAL(10, 2) NOT NULL COMMENT '优惠值: 折扣比例或减免金额',
    min_amount DECIMAL(10, 2) DEFAULT 0 COMMENT '最低使用金额',
    max_amount DECIMAL(10, 2) COMMENT '最大优惠金额',
    total_count INT NOT NULL DEFAULT 100 COMMENT '发放总数',
    used_count INT DEFAULT 0 COMMENT '已使用数量',
    start_time DATETIME COMMENT '生效时间',
    end_time DATETIME COMMENT '失效时间',
    applicable_package_ids VARCHAR(200) COMMENT '适用套餐ID列表',
    status INT DEFAULT 1 COMMENT '状态: 0禁用, 1启用',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='VIP优惠券表';

-- 用户优惠券表
CREATE TABLE IF NOT EXISTS user_coupon (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '用户优惠券ID',
    user_id BIGINT NOT NULL COMMENT '用户ID',
    coupon_id BIGINT NOT NULL COMMENT '优惠券ID',
    coupon_code VARCHAR(20) COMMENT '优惠券码',
    coupon_name VARCHAR(50) COMMENT '优惠券名称',
    status VARCHAR(20) DEFAULT 'unused' COMMENT '状态: unused未使用, used已使用, expired已过期',
    used_order_no VARCHAR(50) COMMENT '使用的订单号',
    used_at DATETIME COMMENT '使用时间',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    INDEX idx_user_id (user_id),
    INDEX idx_coupon_id (coupon_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户优惠券表';

-- 插入套餐数据
INSERT INTO vip_package (name, type, version, usage_type, original_price, current_price, valid_days, is_recommended, activity_tag, description, bonus_points, sort_order) VALUES
('终身版', 'lifetime', 'basic', 'single', 399.00, 389.00, -1, TRUE, '端午活动减10', '长期性价比首选', 600, 1),
('连续包季', 'quarterly', 'basic', 'single', 79.00, 59.00, 90, FALSE, '首季立减20', '作图尝鲜', 0, 2),
('两年版', 'yearly', 'basic', 'single', 239.00, 199.00, 730, FALSE, NULL, '8.3元/月、送600积分', 600, 3),
('连续包年', 'yearly', 'basic', 'single', 159.00, 139.00, 365, FALSE, '端午活动减20', '每天0.38元、送600积分', 600, 4),
('终身专业版', 'lifetime', 'pro', 'single', 999.00, 899.00, -1, TRUE, '限时优惠', '专业设计师首选', 2000, 5),
('年度专业版', 'yearly', 'pro', 'single', 299.00, 259.00, 365, FALSE, '专业版优惠', '解锁全部高级功能', 1000, 6);

-- 插入权益数据
INSERT INTO vip_benefit (name, description, icon, type, value, applicable_version, sort_order) VALUES
('个人商用授权', '仅支持个体商用授权', 'shield', 'commercial', '1', 'basic', 1),
('Agent设计+无限画布', 'AI设计助理，智能搞定一切', 'canvas', 'ai', 'unlimited', 'basic', 2),
('送600积分', '赋能AI创作，灵感不息', 'points', 'points', '600', 'basic', 3),
('无水印高清下载', '所有作品可无水印下载', 'download', 'download', 'unlimited', 'basic', 4),
('100万+设计模板', '每日更新，轻松完成设计', 'template', 'template', '100万+', 'basic', 5),
('AI生图&视频模型', '主流AI模型持续更新', 'ai-model', 'ai', 'all', 'basic', 6),
('团队协作', '多人实时协作编辑', 'team', 'team', '5人', 'advanced', 7),
('专属客服', '7x24小时专属客服支持', 'support', 'support', 'dedicated', 'pro', 8);

-- 插入优惠券数据
INSERT INTO vip_coupon (name, code, type, value, min_amount, total_count, start_time, end_time) VALUES
('新用户立减20', 'NEWVIP20', 'reduction', 20.00, 100.00, 1000, NOW(), DATE_ADD(NOW(), INTERVAL 6 MONTH)),
('端午活动优惠券', 'VIP10', 'reduction', 10.00, 0.00, 500, NOW(), DATE_ADD(NOW(), INTERVAL 1 MONTH)),
('会员日折扣券', 'VIPDAY85', 'discount', 0.85, 200.00, 200, NOW(), DATE_ADD(NOW(), INTERVAL 3 MONTH));