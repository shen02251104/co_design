# 项目上下文

## 技术栈

- **核心**: Nuxt 4, Vue 3, TypeScript
- **UI**: Tailwind CSS

## 目录结构

```
├── app/                # 页面路由与布局
│   ├── pages/          # 页面组件
│   └── app.vue         # 根组件
├── assets/             # 静态资源
│   └── css/            # 全局样式
├── public/             # 公共静态资源
├── scripts/            # 构建与启动脚本
│   ├── build.sh        # 构建脚本
│   ├── dev.sh          # 开发环境启动脚本
│   ├── prepare.sh      # 预处理脚本
│   └── start.sh        # 生产环境启动脚本
├── server/             # 服务端逻辑
│   ├── api/            # API 路由
│   ├── middleware/     # 中间件
│   └── routes/         # 服务端路由
├── nuxt.config.ts      # Nuxt 配置
├── package.json        # 项目依赖管理
└── tsconfig.json       # TypeScript 配置
```

## 包管理规范

**仅允许使用 pnpm** 作为包管理器，**严禁使用 npm 或 yarn**。
**常用命令**：
- 安装依赖：`pnpm add <package>`
- 安装开发依赖：`pnpm add -D <package>`
- 安装所有依赖：`pnpm install`
- 移除依赖：`pnpm remove <package>`

## 开发规范

- 使用 Tailwind CSS 进行样式开发
