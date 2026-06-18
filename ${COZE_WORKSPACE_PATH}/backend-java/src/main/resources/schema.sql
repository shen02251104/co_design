-- 易设计数据库初始化脚本
-- MySQL 8.0+ 兼容
-- 创建时间: 2024-06-18

-- 创建数据库
CREATE DATABASE IF NOT EXISTS yidesign DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE yidesign;

-- 用户表
CREATE TABLE IF NOT EXISTS `user` (
    `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '用户ID',
    `phone` VARCHAR(20) NOT NULL COMMENT '手机号',
    `email` VARCHAR(100) NULL COMMENT '邮箱',
    `password` VARCHAR(255) NOT NULL COMMENT '密码',
    `nickname` VARCHAR(50) NULL COMMENT '昵称',
    `avatar` VARCHAR(255) NULL COMMENT '头像URL',
    `member_level` INT DEFAULT 0 COMMENT '会员等级: 0-普通 1-月度 2-年度 3-永久',
    `member_expire_time` DATETIME NULL COMMENT '会员到期时间',
    `balance` DECIMAL(10,2) DEFAULT 0.00 COMMENT '账户余额',
    `status` INT DEFAULT 1 COMMENT '状态: 0-禁用 1-正常',
    `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `update_time` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `deleted` INT DEFAULT 0 COMMENT '逻辑删除: 0-未删除 1-已删除',
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_phone` (`phone`),
    KEY `idx_member_level` (`member_level`),
    KEY `idx_create_time` (`create_time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户表';

-- 设计作品表
CREATE TABLE IF NOT EXISTS `design_work` (
    `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '作品ID',
    `user_id` BIGINT NOT NULL COMMENT '用户ID',
    `title` VARCHAR(100) NOT NULL COMMENT '作品名称',
    `type` VARCHAR(50) NOT NULL COMMENT '作品类型: poster/banner/detail/amazon',
    `content` JSON NULL COMMENT '作品数据JSON',
    `cover_url` VARCHAR(255) NULL COMMENT '封面图URL',
    `is_public` INT DEFAULT 0 COMMENT '是否公开: 0-私有 1-公开',
    `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `update_time` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `deleted` INT DEFAULT 0 COMMENT '逻辑删除',
    PRIMARY KEY (`id`),
    KEY `idx_user_id` (`user_id`),
    KEY `idx_type` (`type`),
    KEY `idx_create_time` (`create_time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='设计作品表';

-- 设计模板表
CREATE TABLE IF NOT EXISTS `design_template` (
    `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '模板ID',
    `name` VARCHAR(100) NOT NULL COMMENT '模板名称',
    `category` VARCHAR(50) NOT NULL COMMENT '分类: promotional/festival/product/brand',
    `content` JSON NULL COMMENT '模板数据JSON',
    `preview_url` VARCHAR(255) NULL COMMENT '预览图URL',
    `is_free` INT DEFAULT 0 COMMENT '是否免费: 0-付费 1-免费',
    `price` INT DEFAULT 0 COMMENT '价格(积分)',
    `use_count` INT DEFAULT 0 COMMENT '使用次数',
    `status` INT DEFAULT 1 COMMENT '状态: 0-下架 1-上架',
    `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `update_time` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `deleted` INT DEFAULT 0 COMMENT '逻辑删除',
    PRIMARY KEY (`id`),
    KEY `idx_category` (`category`),
    KEY `idx_status` (`status`),
    KEY `idx_use_count` (`use_count`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='设计模板表';

-- 充值记录表
CREATE TABLE IF NOT EXISTS `recharge_record` (
    `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '记录ID',
    `user_id` BIGINT NOT NULL COMMENT '用户ID',
    `amount` DECIMAL(10,2) NOT NULL COMMENT '充值金额',
    `type` VARCHAR(20) NOT NULL COMMENT '充值类型: balance/member',
    `member_level` INT NULL COMMENT '购买的会员等级',
    `payment_method` VARCHAR(20) NULL COMMENT '支付方式',
    `transaction_id` VARCHAR(100) NULL COMMENT '交易流水号',
    `status` INT DEFAULT 0 COMMENT '状态: 0-待支付 1-成功 2-失败',
    `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    PRIMARY KEY (`id`),
    KEY `idx_user_id` (`user_id`),
    KEY `idx_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='充值记录表';

-- 素材表
CREATE TABLE IF NOT EXISTS `material` (
    `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '素材ID',
    `name` VARCHAR(100) NOT NULL COMMENT '素材名称',
    `type` VARCHAR(50) NOT NULL COMMENT '类型: icon/illustration/background/border/decoration',
    `url` VARCHAR(255) NOT NULL COMMENT '素材URL',
    `thumbnail_url` VARCHAR(255) NULL COMMENT '缩略图URL',
    `is_free` INT DEFAULT 1 COMMENT '是否免费',
    `download_count` INT DEFAULT 0 COMMENT '下载次数',
    `status` INT DEFAULT 1 COMMENT '状态',
    `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    PRIMARY KEY (`id`),
    KEY `idx_type` (`type`),
    KEY `idx_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='素材表';

-- 插入测试数据
-- 测试用户
INSERT INTO `user` (`phone`, `password`, `nickname`, `member_level`, `balance`, `status`) VALUES
('13800138000', 'password123', '设计师小王', 0, 100.00, 1),
('13900139000', 'password123', '电商大咖', 2, 500.00, 1);

-- 测试模板
INSERT INTO `design_template` (`name`, `category`, `is_free`, `price`, `use_count`, `status`) VALUES
('双十一促销海报', 'promotional', 1, 0, 1000, 1),
('春节特惠模板', 'festival', 1, 0, 800, 1),
('新品上市模板', 'product', 0, 10, 500, 1),
('品牌宣传模板', 'brand', 0, 20, 300, 1);

-- 测试素材
INSERT INTO `material` (`name`, `type`, `url`, `is_free`, `download_count`, `status`) VALUES
('促销图标', 'icon', '/materials/icons/promotion.svg', 1, 1000, 1),
('电商插画', 'illustration', '/materials/illustrations/ecommerce.png', 1, 800, 1),
('渐变背景', 'background', '/materials/backgrounds/gradient.jpg', 1, 500, 1);