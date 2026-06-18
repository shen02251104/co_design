# 易设计电商设计平台 - 本地部署指南

## 项目结构（已修正）

```
/workspace/
├── projects/                    # 前端项目（Nuxt 3）
│   ├── app/                     # 页面和组件
│   │   ├── pages/               # 11个页面
│   │   ├── components/          # 13个UI组件
│   │   └── layouts/             # 布局组件
│   ├── public/                  # 静态资源
│   ├── server/                  # Nuxt 服务端 API
│   ├── nuxt.config.ts           # Nuxt 配置
│   ├── package.json             # 前端依赖
│   └── DEPLOY.md                # 本部署文档
│
├── backend-java/                # 后端项目（Java Spring Boot）- 独立目录
│   ├── src/
│   │   └── main/
│   │       ├── java/com/yidesign/
│   │       │   ├── controller/  # API 控制器
│   │       │   ├── service/     # 业务逻辑
│   │       │   ├── mapper/      # MyBatis Mapper
│   │       │   ├── model/       # 数据模型
│   │       │   │   ├── entity/  # 实体类
│   │       │   │   ├── dto/     # 数据传输对象
│   │       │   │   └── vo/      # 视图对象
│   │       │   ├── config/      # 配置类
│   │       │   └── utils/       # 工具类
│   │       └── resources/
│   │           ├── application.yml  # 配置文件
│   │           └── schema.sql       # 数据库初始化脚本
│   ├── pom.xml                  # Maven 配置
│   └── README.md                # 后端说明文档
│
└── poster-design.zip            # 迅排设计开源代码（完整版）
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
| 首页 | `/` | 功能展示、热门推荐 |
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
SOURCE /workspace/backend-java/src/main/resources/schema.sql;
```

### 2.3 修改配置
编辑 `/workspace/backend-java/src/main/resources/application.yml`：

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/yi_design?useSSL=false&serverTimezone=Asia/Shanghai&allowPublicKeyRetrieval=true
    username: your_username    # 改成你的 MySQL 用户名
    password: your_password    # 改成你的 MySQL 密码
```

### 2.4 安装 Playwright（截图功能）
```bash
cd /workspace/backend-java

# 安装 Chromium 浏览器
mvn exec:java -e -Dexec.mainClass=com.microsoft.playwright.CLI -Dexec.args="install chromium"
```

### 2.5 构建运行
```bash
cd /workspace/backend-java

# 编译构建
mvn clean package -DskipTests

# 运行
java -jar target/yi-design-1.0.0.jar

# 或使用 Maven 直接运行
mvn spring-boot:run
```

### 2.6 API 接口列表
| 接口 | 方法 | 功能 |
|------|------|------|
| `/api/design/screenshot` | POST | 截图生成（HTML转图片） |
| `/api/design/upload` | POST | 文件上传 |
| `/api/design/templates` | GET | 模板列表 |
| `/api/design/template/{id}` | GET | 模板详情 |
| `/api/design/save` | POST | 保存设计作品 |
| `/api/design/materials` | GET | 素材列表 |
| `/api/user/login` | POST | 用户登录 |
| `/api/user/register` | POST | 用户注册 |

---

## 三、迅排设计完整版部署

### 3.1 解压开源代码
```bash
cd /workspace
unzip poster-design.zip -d poster-design-full
cd poster-design-full/poster-design
```

### 3.2 安装依赖
```bash
pnpm install
```

### 3.3 配置后端地址
编辑 `src/api/config.ts` 或对应配置文件，将 API 地址指向 Java 后端：

```typescript
export const API_BASE_URL = 'http://localhost:8080/api'
```

### 3.4 运行完整版
```bash
pnpm dev
# 访问 http://localhost:5173
```

---

## 四、前后端联调

### 4.1 启动顺序
```bash
# 1. 先启动后端（端口 8080）
cd /workspace/backend-java
mvn spring-boot:run

# 2. 再启动前端（端口 5000）
cd /workspace/projects
pnpm dev
```

### 4.2 前端配置后端地址
在 Nuxt 页面中配置 API 地址：

```typescript
// app/pages/designer.vue 或其他需要调用后端的页面
const API_BASE_URL = 'http://localhost:8080/api'

// 示例：调用截图接口
const response = await fetch(`${API_BASE_URL}/design/screenshot`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ html: canvasHtml, width: 800, height: 600 })
})
```

---

## 五、生产环境部署

### 5.1 前端部署（推荐 Vercel/云服务器）
```bash
cd /workspace/projects
pnpm build

# 将 .output 目录部署到服务器
# 或使用 Vercel 自动部署
```

### 5.2 后端部署（云服务器 + Docker）
创建 Dockerfile：

```dockerfile
FROM maven:3.9-eclipse-temurin-21 AS builder
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=builder /app/target/yi-design-1.0.0.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

构建并运行：
```bash
docker build -t yi-design-backend /workspace/backend-java
docker run -d -p 8080:8080 \
  -e MYSQL_HOST=your_mysql_host \
  -e MYSQL_USER=your_user \
  -e MYSQL_PASSWORD=your_password \
  yi-design-backend
```

---

## 六、常见问题

### Q1: Playwright 截图不工作？
```bash
# 确保安装了 Chromium
cd /workspace/backend-java
mvn exec:java -e -Dexec.mainClass=com.microsoft.playwright.CLI -Dexec.args="install chromium"
```

### Q2: MySQL 连接失败？
- 检查 MySQL 服务是否启动
- 确认 application.yml 中的用户名密码正确
- 检查防火墙是否允许 3306 端口

### Q3: Nuxt 构建失败？
- 确保 Node.js 版本 >= 18
- 使用 pnpm 而不是 npm/yarn
- 删除 node_modules 和 .nuxt 后重新安装

---

## 七、技术栈总结

| 层级 | 前端 | 后端 |
|------|------|------|
| 框架 | Nuxt 3 (Vue 3) | Spring Boot 3.2 |
| 语言 | TypeScript | Java 21 |
| 构建 | Vite | Maven |
| 样式 | Tailwind CSS | - |
| 数据库 | - | MySQL 8.0 + MyBatis-Plus |
| 截图 | html2canvas（前端备用） | Playwright（后端主要） |

---

如需更多帮助，请查看：
- `AGENTS.md` - 项目开发规范
- `DESIGN.md` - 设计规范
- `backend-java/README.md` - 后端详细说明