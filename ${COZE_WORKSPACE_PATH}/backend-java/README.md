# 易设计 Java 后端

## 技术栈

- **Java**: JDK 21
- **Spring Boot**: 3.2.1 (兼容 JDK 21)
- **MyBatis-Plus**: 3.5.5
- **MySQL**: 8.0+
- **JWT**: jjwt 0.12.3
- **API文档**: Knife4j 4.4.0

## 项目结构

```
backend-java/
├── pom.xml                          # Maven依赖配置
├── src/
│   ├── main/
│   │   ├── java/com/yidesign/
│   │   │   ├── YiDesignApplication.java    # 启动类
│   │   │   ├── controller/                 # 控制器层
│   │   │   ├── service/                    # 服务层
│   │   │   ├── mapper/                     # Mapper层
│   │   │   ├── model/
│   │   │   │   ├── entity/                 # 实体类
│   │   │   │   ├── dto/                    # 请求DTO
│   │   │   │   └ vo/                       # 响应VO
│   │   │   ├── config/                     # 配置类
│   │   │   └── utils/                      # 工具类
│   │   └── resources/
│   │       ├── application.yml             # 应用配置
│   │       └── schema.sql                  # 数据库初始化
│   └ test/                                 # 测试
└── README.md                              # 本文档
```

## 快速开始

### 1. 环境准备

确保已安装:
- JDK 21+
- Maven 3.8+
- MySQL 8.0+

### 2. 数据库配置

```bash
# 执行数据库初始化脚本
mysql -u root -p < src/main/resources/schema.sql
```

### 3. 修改配置

编辑 `application.yml`:
```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/yidesign
    username: your_username
    password: your_password
```

### 4. 启动服务

```bash
# 编译打包
mvn clean package -DskipTests

# 启动服务
java -jar target/yidesign-backend-1.0.0.jar
```

### 5. 访问API文档

启动成功后访问: http://localhost:8080/api/doc.html

## API接口说明

### 用户模块 `/api/user`

| 接口 | 方法 | 说明 |
|------|------|------|
| `/send-code` | POST | 发送验证码 |
| `/login` | POST | 用户登录 |
| `/register` | POST | 用户注册 |
| `/info` | GET | 获取用户信息 |
| `/info` | PUT | 更新用户信息 |
| `/recharge` | POST | 会员充值 |

### 设计模块 `/api/design`

| 接口 | 方法 | 说明 |
|------|------|------|
| `/save` | POST | 保存设计作品 |
| `/list` | GET | 获取我的设计列表 |
| `//{id}` | GET | 获取设计详情 |
| `/copy/{id}` | POST | 复制设计作品 |

### 模板模块 `/api/template`

| 接口 | 方法 | 说明 |
|------|------|------|
| `/list` | GET | 获取模板列表 |
| `/hot` | GET | 获取热门模板 |
| `/use/{id}` | POST | 使用模板 |

## 注意事项

1. **JWT密钥**: 生产环境请修改 `jwt.secret` 为安全的密钥
2. **密码加密**: 实际部署应使用 BCrypt 等加密算法存储密码
3. **验证码**: 需对接短信服务（阿里云/腾讯云短信）
4. **支付**: 需对接支付宝/微信支付

## 部署建议

- 使用 Docker 容器化部署
- 配置 Nginx 反向代理
- 启用 HTTPS 安全传输
- 使用 Redis 缓存验证码和会话