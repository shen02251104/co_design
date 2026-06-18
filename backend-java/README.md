# 易设计 - Java Spring Boot 后端

## 技术栈
- Spring Boot 3.2
- JDK 21
- MyBatis-Plus
- Playwright Java (截图生成)
- MySQL 8.0+

## 快速开始

### 1. 配置 MySQL
修改 `src/main/resources/application.yml`:
```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/yi_design
    username: root
    password: your_password
```

### 2. 初始化数据库
```bash
mysql -u root -p
CREATE DATABASE yi_design CHARACTER SET utf8mb4;
USE yi_design;
SOURCE src/main/resources/schema.sql;
```

### 3. 安装 Playwright
```bash
mvn exec:java -e -Dexec.mainClass=com.microsoft.playwright.CLI -Dexec.args="install chromium"
```

### 4. 运行项目
```bash
mvn spring-boot:run
# 或
mvn clean package -DskipTests
java -jar target/yi-design-1.0.0.jar
```

## API 接口
| 接口 | 方法 | 说明 |
|------|------|------|
| /api/design/screenshot | POST | 截图生成 |
| /api/design/upload | POST | 文件上传 |
| /api/design/templates | GET | 模板列表 |
| /api/design/template/{id} | GET | 模板详情 |
| /api/design/save | POST | 保存设计 |
