-- 易设计 - 修复表结构并初始化测试数据
-- 执行时间: 2024

USE yi_design;

-- 1. 修复 design_template 表结构（添加缺失字段）
ALTER TABLE design_template 
ADD COLUMN type VARCHAR(20) DEFAULT 'poster' COMMENT '模板类型: poster/banner/card' AFTER name,
ADD COLUMN template_data JSON COMMENT '模板数据JSON' AFTER preview_url,
ADD COLUMN is_public INT DEFAULT 1 COMMENT '是否公开: 0否, 1是' AFTER template_data,
ADD COLUMN creator_id BIGINT DEFAULT 0 COMMENT '创建者ID' AFTER is_public;

-- 2. 初始化模板分类
INSERT INTO template_category (id, name, icon, sort_order, status) VALUES
(1, '电商海报', 'icon-poster', 1, 1),
(2, '促销Banner', 'icon-banner', 2, 1),
(3, '社交分享', 'icon-social', 3, 1),
(4, '公众号封面', 'icon-wechat', 4, 1),
(5, '小红书图文', 'icon-redbook', 5, 1),
(6, '电商详情页', 'icon-detail', 6, 1)
ON DUPLICATE KEY UPDATE name=VALUES(name);

-- 3. 初始化测试模板数据（template_data格式匹配迅排设计：[{global, layers}] 或 {page, widgets}）
-- 注意：每个widget必须有parent字段，值为"-1"（画布根元素uuid）
INSERT INTO design_template (id, category_id, name, type, width, height, preview_url, template_data, is_public, creator_id, use_count, created_at) VALUES
(1, 1, '双十一促销海报', 'poster', 800, 1200, 'https://picsum.photos/800/1200?random=1', '[{"global":{"width":800,"height":1200,"backgroundColor":"#FFFFFF"},"layers":[{"type":"text","text":"双十一大促","left":100,"top":50,"fontSize":48,"color":"#FF0000","uuid":"-1","width":300,"height":60,"parent":"-1"},{"type":"image","src":"https://picsum.photos/600/400","left":100,"top":200,"width":600,"height":400,"uuid":"-2","parent":"-1"}]}]', 1, 0, 100, NOW()),
(2, 1, '618年中大促', 'poster', 750, 1000, 'https://picsum.photos/750/1000?random=2', '[{"global":{"width":750,"height":1000,"backgroundColor":"#FFE4B5"},"layers":[{"type":"text","text":"618狂欢购","left":50,"top":30,"fontSize":56,"color":"#FF6B00","uuid":"-1","width":250,"height":70,"parent":"-1"}]}]', 1, 0, 80, NOW()),
(3, 2, '新品上市Banner', 'banner', 1920, 400, 'https://picsum.photos/1920/400?random=3', '[{"global":{"width":1920,"height":400,"backgroundColor":"#E8F5E9"},"layers":[{"type":"text","text":"新品首发","left":500,"top":150,"fontSize":72,"color":"#2196F3","uuid":"-1","width":400,"height":90,"parent":"-1"}]}]', 1, 0, 50, NOW()),
(4, 2, '限时折扣Banner', 'banner', 1200, 300, 'https://picsum.photos/1200/300?random=4', '[{"global":{"width":1200,"height":300,"backgroundColor":"#FFF3E0"},"layers":[{"type":"text","text":"限时特惠","left":400,"top":100,"fontSize":48,"color":"#FF5722","uuid":"-1","width":280,"height":60,"parent":"-1"}]}]', 1, 0, 45, NOW()),
(5, 3, '朋友圈分享图', 'poster', 1080, 1080, 'https://picsum.photos/1080/1080?random=5', '[{"global":{"width":1080,"height":1080,"backgroundColor":"#F5F5F5"},"layers":[{"type":"text","text":"分享生活","left":400,"top":500,"fontSize":36,"color":"#333333","uuid":"-1","width":200,"height":45,"parent":"-1"}]}]', 1, 0, 30, NOW()),
(6, 4, '公众号封面', 'banner', 900, 383, 'https://picsum.photos/900/383?random=6', '[{"global":{"width":900,"height":383,"backgroundColor":"#E1F5FE"},"layers":[{"type":"text","text":"每周精选","left":350,"top":150,"fontSize":42,"color":"#0277BD","uuid":"-1","width":200,"height":50,"parent":"-1"}]}]', 1, 0, 25, NOW()),
(7, 5, '小红书图文', 'poster', 1080, 1440, 'https://picsum.photos/1080/1440?random=7', '[{"global":{"width":1080,"height":1440,"backgroundColor":"#FCE4EC"},"layers":[{"type":"text","text":"好物推荐","left":400,"top":100,"fontSize":48,"color":"#E91E63","uuid":"-1","width":200,"height":60,"parent":"-1"}]}]', 1, 0, 20, NOW()),
(8, 6, '电商详情页头图', 'banner', 750, 350, 'https://picsum.photos/750/350?random=8', '[{"global":{"width":750,"height":350,"backgroundColor":"#F3E5F5"},"layers":[{"type":"text","text":"商品详情","left":300,"top":100,"fontSize":36,"color":"#9C27B0","uuid":"-1","width":180,"height":45,"parent":"-1"}]}]', 1, 0, 15, NOW())
ON DUPLICATE KEY UPDATE template_data=VALUES(template_data);

-- 4. 初始化素材分类
INSERT INTO material_category (id, name, type, icon, sort_order, status) VALUES
(1, '贴纸素材', 'image', 'icon-sticker', 1, 1),
(2, 'SVG矢量', 'svg', 'icon-svg', 2, 1),
(3, '背景图片', 'background', 'icon-bg', 3, 1),
(4, '边框装饰', 'svg', 'icon-border', 4, 1),
(5, '图标元素', 'svg', 'icon-icon', 5, 1)
ON DUPLICATE KEY UPDATE name=VALUES(name);

-- 5. 初始化测试素材数据
INSERT INTO material (id, category_id, name, url, thumbnail_url, type, width, height, is_free, created_at) VALUES
(1, 1, '爱心贴纸', 'https://cdn-icons-png.flaticon.com/512/833/833472.png', 'https://cdn-icons-png.flaticon.com/128/833/833472.png', 'image', 512, 512, 1, NOW()),
(2, 1, '星星贴纸', 'https://cdn-icons-png.flaticon.com/512/1829/1829306.png', 'https://cdn-icons-png.flaticon.com/128/1829/1829306.png', 'image', 512, 512, 1, NOW()),
(3, 1, '笑脸贴纸', 'https://cdn-icons-png.flaticon.com/512/1791/1791330.png', 'https://cdn-icons-png.flaticon.com/128/1791/1791330.png', 'image', 512, 512, 1, NOW()),
(4, 2, '箭头SVG', 'https://cdn-icons-png.flaticon.com/512/32/32129.png', 'https://cdn-icons-png.flaticon.com/128/32/32129.png', 'svg', 512, 512, 1, NOW()),
(5, 2, '圆形SVG', 'https://cdn-icons-png.flaticon.com/512/1057/1057126.png', 'https://cdn-icons-png.flaticon.com/128/1057/1057126.png', 'svg', 512, 512, 1, NOW()),
(6, 3, '渐变背景1', 'https://picsum.photos/1920/1080?random=10', 'https://picsum.photos/400/200?random=10', 'background', 1920, 1080, 1, NOW()),
(7, 3, '渐变背景2', 'https://picsum.photos/1920/1080?random=11', 'https://picsum.photos/400/200?random=11', 'background', 1920, 1080, 1, NOW()),
(8, 3, '渐变背景3', 'https://picsum.photos/1920/1080?random=12', 'https://picsum.photos/400/200?random=12', 'background', 1920, 1080, 1, NOW()),
(9, 4, '装饰边框', 'https://cdn-icons-png.flaticon.com/512/2313/2313048.png', 'https://cdn-icons-png.flaticon.com/128/2313/2313048.png', 'svg', 512, 512, 1, NOW()),
(10, 5, '购物图标', 'https://cdn-icons-png.flaticon.com/512/2331/2331941.png', 'https://cdn-icons-png.flaticon.com/128/2331/2331941.png', 'svg', 512, 512, 1, NOW())
ON DUPLICATE KEY UPDATE name=VALUES(name);

-- 6. 初始化测试用户
INSERT INTO user (id, username, email, phone, password, nickname, vip_level, status, created_at) VALUES
(1, 'testuser', 'test@example.com', '13800138000', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iAt6Z5EH', '测试用户', 0, 1, NOW()),
(2, 'vipuser', 'vip@example.com', '13900139000', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iAt6Z5EH', 'VIP用户', 1, 1, NOW())
ON DUPLICATE KEY UPDATE username=VALUES(username);

SELECT '初始化完成！' AS message;