-- 易设计电商设计平台数据库初始化脚本
-- 创建时间: 2024
-- 数据库: yi_design

CREATE DATABASE IF NOT EXISTS yi_design CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE yi_design;

-- 用户表
CREATE TABLE IF NOT EXISTS user (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '用户ID',
    username VARCHAR(50) NOT NULL UNIQUE COMMENT '用户名',
    email VARCHAR(100) UNIQUE COMMENT '邮箱',
    phone VARCHAR(20) UNIQUE COMMENT '手机号',
    password VARCHAR(255) NOT NULL COMMENT '密码(加密)',
    avatar VARCHAR(255) COMMENT '头像URL',
    nickname VARCHAR(50) COMMENT '昵称',
    vip_level INT DEFAULT 0 COMMENT 'VIP等级: 0普通, 1月度, 2年度, 3终身',
    vip_expire_time DATETIME COMMENT 'VIP过期时间',
    balance DECIMAL(10,2) DEFAULT 0.00 COMMENT '账户余额',
    status INT DEFAULT 1 COMMENT '状态: 0禁用, 1正常',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'
) ENGINE=InnoDB COMMENT='用户表';

-- 设计作品表
CREATE TABLE IF NOT EXISTS design_work (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '作品ID',
    user_id BIGINT NOT NULL COMMENT '用户ID',
    title VARCHAR(100) NOT NULL COMMENT '作品标题',
    description VARCHAR(500) COMMENT '作品描述',
    cover_url VARCHAR(255) COMMENT '封面图URL',
    canvas_data JSON COMMENT '画布数据JSON',
    width INT DEFAULT 800 COMMENT '画布宽度',
    height INT DEFAULT 600 COMMENT '画布高度',
    is_template INT DEFAULT 0 COMMENT '是否模板: 0否, 1是',
    is_public INT DEFAULT 0 COMMENT '是否公开: 0否, 1是',
    download_count INT DEFAULT 0 COMMENT '下载次数',
    view_count INT DEFAULT 0 COMMENT '浏览次数',
    status INT DEFAULT 1 COMMENT '状态: 0删除, 1正常',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    INDEX idx_user_id (user_id),
    INDEX idx_is_template (is_template)
) ENGINE=InnoDB COMMENT='设计作品表';

-- 模板分类表
CREATE TABLE IF NOT EXISTS template_category (
    id INT PRIMARY KEY AUTO_INCREMENT COMMENT '分类ID',
    name VARCHAR(50) NOT NULL COMMENT '分类名称',
    icon VARCHAR(255) COMMENT '分类图标',
    sort_order INT DEFAULT 0 COMMENT '排序',
    status INT DEFAULT 1 COMMENT '状态',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB COMMENT='模板分类表';

-- 模板表
CREATE TABLE IF NOT EXISTS design_template (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '模板ID',
    category_id INT COMMENT '分类ID',
    name VARCHAR(100) NOT NULL COMMENT '模板名称',
    description VARCHAR(500) COMMENT '模板描述',
    cover_url VARCHAR(255) COMMENT '封面图URL',
    preview_url VARCHAR(255) COMMENT '预览图URL',
    canvas_data JSON COMMENT '画布数据JSON',
    width INT DEFAULT 800 COMMENT '宽度',
    height INT DEFAULT 600 COMMENT '高度',
    tags VARCHAR(255) COMMENT '标签',
    use_count INT DEFAULT 0 COMMENT '使用次数',
    is_free INT DEFAULT 1 COMMENT '是否免费: 0否, 1是',
    price DECIMAL(10,2) DEFAULT 0.00 COMMENT '价格',
    status INT DEFAULT 1 COMMENT '状态',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_category_id (category_id)
) ENGINE=InnoDB COMMENT='模板表';

-- 素材分类表
CREATE TABLE IF NOT EXISTS material_category (
    id INT PRIMARY KEY AUTO_INCREMENT COMMENT '分类ID',
    name VARCHAR(50) NOT NULL COMMENT '分类名称',
    type VARCHAR(20) COMMENT '类型: image, svg, background',
    icon VARCHAR(255) COMMENT '图标',
    sort_order INT DEFAULT 0 COMMENT '排序',
    status INT DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB COMMENT='素材分类表';

-- 素材表
CREATE TABLE IF NOT EXISTS material (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '素材ID',
    category_id INT COMMENT '分类ID',
    name VARCHAR(100) COMMENT '素材名称',
    url VARCHAR(255) NOT NULL COMMENT '素材URL',
    thumbnail_url VARCHAR(255) COMMENT '缩略图URL',
    type VARCHAR(20) COMMENT '类型: image, svg, background',
    width INT COMMENT '宽度',
    height INT COMMENT '高度',
    tags VARCHAR(255) COMMENT '标签',
    is_free INT DEFAULT 1 COMMENT '是否免费',
    download_count INT DEFAULT 0 COMMENT '下载次数',
    status INT DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_category_id (category_id),
    INDEX idx_type (type)
) ENGINE=InnoDB COMMENT='素材表';

-- 用户操作记录表(用于统计)
CREATE TABLE IF NOT EXISTS user_action_log (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT COMMENT '用户ID',
    action_type VARCHAR(20) COMMENT '操作类型: create, edit, download, view',
    resource_type VARCHAR(20) COMMENT '资源类型: work, template, material',
    resource_id BIGINT COMMENT '资源ID',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_user_id (user_id),
    INDEX idx_action_type (action_type)
) ENGINE=InnoDB COMMENT='用户操作记录表';

-- 插入默认模板分类
INSERT INTO template_category (name, icon, sort_order) VALUES
('电商海报', 'poster', 1),
('社交媒体', 'social', 2),
('电商详情页', 'product', 3),
('节日促销', 'festival', 4),
('品牌宣传', 'brand', 5);

-- 插入默认素材分类
INSERT INTO material_category (name, type, icon, sort_order) VALUES
('背景图', 'background', 'bg', 1),
('装饰元素', 'svg', 'decoration', 2),
('商品图片', 'image', 'product', 3),
('人物图片', 'image', 'person', 4),
('图标', 'svg', 'icon', 5);

-- 插入示例用户
INSERT INTO user (username, email, phone, password, nickname, vip_level) VALUES
('demo', 'demo@example.com', '13800138000', '$2a$10$encrypted_password_here', '演示用户', 1);