# 易设计电商设计平台 - 本地部署指南

## 项目结构

```
/workspace/projects/
├── app/                    # Nuxt 3 前端
│   ├── pages/              # 页面组件
│   ├── components/         # UI 组件
│   ├── layouts/            # 布局组件
│   └── app.vue             # 根组件
├── backend-java/           # Java Spring Boot 后端
│   ├── src/                # Java 源代码
│   └── pom.xml             # Maven 配置
├── assets/                 # 静态资源
│   └── poster-design.zip   # 迅排设计开源代码
├── public/                 # 公共静态文件
└── server/                 # Nuxt 服务端 API
```

---

## 一、前端部署（Nuxt 3）

### 1.1 环境要求
- Node.js 18.x 或 20.x
- pnpm 8.x+

### 1.2 安装依赖
```bash
cd /workspace/projects
pnpm install
```

### 1.3 开发模式运行
```bash
pnpm dev
# 访问 http://localhost:5000
```

### 1.4 生产构建
```bash
pnpm build
pnpm start
# 访问 http://localhost:5000
```

### 1.5 页面列表
| 页面 | 路径 | 功能 |
|------|------|------|
| 首页 | `/` | 功能展示、导航 |
| 海报设计 | `/poster-design` | 海报设计菜单页面 |
| 设计器 | `/designer?menu=xxx` | 简化版设计器（支持菜单定位） |
| AI工具 | `/ai-tools` | AI智能工具列表 |
| 跨境工具 | `/cross-border` | 跨境电商工具 |
| 图片工具 | `/image-tools` | 图片处理工具 |
| 模板中心 | `/templates` | 模板分类展示 |
| 素材库 | `/materials` | 素材分类展示 |
| 我的空间 | `/space` | 用户作品管理 |
| 登录 | `/login` | 用户登录（邮箱+密码/手机+验证码） |
| 注册 | `/register` | 用户注册 |

---

## 二、后端部署（Java Spring Boot）

### 2.1 环境要求
- JDK 21
- Maven 3.9+
- MySQL 8.0+

### 2.2 数据库配置
```sql
-- 创建数据库
CREATE DATABASE yi_design CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 执行初始化脚本
USE yi_design;
SOURCE backend-java/src/main/resources/schema.sql;
```

### 2.3 配置文件
编辑 `backend-java/src/main/resources/application.yml`：

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/yi_design?useSSL=false&serverTimezone=Asia/Shanghai
    username: your_username
    password: your_password
    
# Playwright 截图配置（可选）
playwright:
  browser-path: /usr/bin/chromium  # 或本地 Chrome 路径
```

### 2.4 构建运行
```bash
cd backend-java

# 安装 Playwright Chromium（截图功能需要）
mvn exec:java -e -D exec.mainClass=com.microsoft.playwright.CLI -D exec.args="install chromium"

# 构建项目
mvn clean package -DskipTests

# 运行
java -jar target/yi-design-1.0.0.jar

# 或使用 Maven
mvn spring-boot:run
```

### 2.5 API 接口
| 接口 | 方法 | 功能 |
|------|------|------|
| `/api/design/screenshot` | POST | 截图生成 |
| `/api/design/upload` | POST | 文件上传 |
| `/api/design/templates` | GET | 模板列表 |
| `/api/design/template/{id}` | GET | 模板详情 |
| `/api/design/save` | POST | 保存设计 |
| `/api/design/materials` | GET | 素材列表 |
| `/api/user/login` | POST | 用户登录 |
| `/api/user/register` | POST | 用户注册 |

---

## 三、迅排设计完整版部署

### 3.1 解压开源代码
```bash
cd /workspace/projects/assets
unzip poster-design.zip -d ~/poster-design-full
cd ~/poster-design-full/poster-design
```

### 3.2 前端部署
```bash
# 安装依赖
pnpm install

# 修改 API 地址指向 Java 后端
# 编辑 src/api/config.ts
export const API_URL = 'http://localhost:8080/api'

# 运行
pnpm dev
# 访问 http://localhost:5173
```

### 3.3 对接 Java 后端
在 `backend-java/src/main/java/com/yidesign/controller/DesignController.java` 中已实现对应接口。

---

## 四、SEO 配置

每个页面已配置完整的 SEO meta 标签：

```typescript
// 页面 SEO 配置示例
useHead({
  title: '易设计 - 专业电商海报设计平台',
  meta: [
    { name: 'description', content: '...' },
    { name: 'keywords', content: '...' },
    { property: 'og:title', content: '...' },
    { property: 'og:description', content: '...' },
    { property: 'og:image', content: '...' }
  ]
})
```

---

## 五、生产环境部署

### 5.1 前端（推荐 Vercel/云服务器）
```bash
pnpm build
# 将 .output 目录部署到服务器
```

### 5.2 后端（云服务器 + Docker）
```bash
# 构建 Docker 镜像
docker build -t yi-design-backend .

# 运行
docker run -d -p 8080:8080 \
  -e MYSQL_HOST=your_mysql_host \
  -e MYSQL_USER=your_user \
  -e MYSQL_PASSWORD=your_password \
  yi-design-backend
```

---

## 六、常见问题

### Q1: Playwright 截图功能不工作？
确保已安装 Chromium：
```bash
mvn exec:java -e -D exec.mainClass=com.microsoft.playwright.CLI -D exec.args="install chromium"
```

### Q2: MySQL 连接失败？
检查 application.yml 配置，确保 MySQL 服务已启动。

### Q3: Nuxt 构建失败？
确保 Node.js 版本 >= 18，使用 pnpm 安装依赖。

---

## 七、联系支持

如有部署问题，请查看 AGENTS.md 获取更多项目信息。