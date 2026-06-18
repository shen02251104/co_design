# 项目上下文

## 项目概述

**易设计** - 电商人都在用的智能设计平台，提供海报设计、商品套图生成、AI换背景、图片翻译等智能工具。

## 技术栈

### 前端
- **核心**: Nuxt 4, Vue 3, TypeScript
- **UI**: Tailwind CSS
- **路由**: 文件系统路由（app/pages/）
- **SEO**: SSR 服务端渲染，每个页面独立 meta 配置

### 后端（参考）
- **框架**: Spring Boot 3.2 + JDK 21
- **ORM**: MyBatis-Plus 3.5.5
- **数据库**: MySQL 8.0+
- **API文档**: Knife4j 4.4.0

## 目录结构

```
├── app/                    # 前端应用
│   ├── components/         # 组件目录
│   │   ├── FeatureCard.vue       # 功能卡片
│   │   ├── HotFeatureCard.vue    # 热门功能卡片
│   │   ├── AIToolCard.vue        # AI工具卡片
│   │   ├── CrossBorderCard.vue   # 跨境工具卡片
│   │   ├── ImageToolCard.vue     # 图片工具卡片
│   │   ├── TemplateCard.vue      # 模板卡片
│   │   ├── MaterialCard.vue      # 素材卡片
│   │   ├── SpaceCard.vue         # 空间卡片
│   │   ├── RecentDesignCard.vue  # 最近设计卡片
│   │   ├── SidebarNavItem.vue    # 侧边栏导航项
│   │   ├── PosterMenuItem.vue    # 海报设计菜单项
│   │   ├── TopBanner.vue         # 顶部横幅广告
│   │   └── FloatingButtons.vue   # 悬浮按钮
│   ├── layouts/
│   │   └── default.vue          # 默认布局（左侧导航）
│   ├── pages/                   # 页面路由
│   │   ├── index.vue            # 首页
│   │   ├── ai-tools.vue         # AI工具页
│   │   ├── cross-border.vue     # 跨境工具页
│   │   ├── image-tools.vue      # 图片工具页
│   │   ├── poster-design.vue    # 海报设计编辑器（核心）
│   │   ├── templates.vue        # 模板中心
│   │   ├── materials.vue        # 素材库
│   │   ├── space.vue            # 我的空间
│   │   ├── login.vue            # 登录页
│   │   └── register.vue         # 注册页
│   └── app.vue                  # 根组件
├── assets/
│   └── css/
│       └── main.css             # 全局样式（Inter字体+Tailwind）
├── backend-java/                 # Java后端（独立部署）
│   ├── src/main/java/com/yidesign/
│   │   ├── controller/          # API控制器
│   │   ├── service/             # 业务服务
│   │   ├── mapper/              # MyBatis Mapper
│   │   ├── model/               # 数据模型
│   │   └── utils/               # 工具类
│   ├── src/main/resources/
│   │   ├── application.yml      # 配置文件
│   │   └── schema.sql           # 数据库初始化
│   └── README.md                # 后端部署说明
├── DESIGN.md                    # 设计规范文档
├── nuxt.config.ts               # Nuxt配置（SEO已配置）
├── package.json                 # 项目依赖
└── tsconfig.json                # TypeScript配置
```

## 功能模块

### 1. 海报设计编辑器（核心功能）
- 位置：`/poster-design`
- 功能：商品套图生成、智能换背景、海报模板、文字设计、图片编辑
- 菜单定位：URL 参数 `?menu=xxx` 定位左侧菜单

### 2. AI 工具
- 商品套图生成、智能换背景、一句话改图、AI抠图、图片增强等

### 3. 跨境工具
- 图片翻译、合规标签生成、亚马逊A+页面、多语言商品图等

### 4. 图片工具
- 图片裁剪、压缩、格式转换、尺寸调整、滤镜调色等

### 5. 用户系统
- 登录/注册（手机号+验证码、邮箱+密码）
- 会员等级管理
- 充值功能

### 6. 模板与素材
- 海报模板中心
- 设计素材库

## SEO 配置

每个页面都配置了独立的 SEO meta：
- `useHead()` 设置 title、description、keywords
- Open Graph 社交分享标签
- nuxt.config.ts 全局 SEO 配置

## 包管理规范

**仅允许使用 pnpm** 作为包管理器。

常用命令：
- 安装依赖：`pnpm install`
- 开发运行：`pnpm dev` 或 `coze dev`
- 代码检查：`pnpm lint`
- 类型检查：`pnpm ts-check`
- 构建：`pnpm build`

## 开发规范

- 使用 Tailwind CSS 进行样式开发
- 组件采用 Vue 3 Composition API
- 所有页面必须配置 SEO meta
- 功能跳转到海报设计页使用 `?menu=xxx` 参数定位菜单