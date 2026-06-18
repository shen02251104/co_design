package com.yidesign;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * 易设计电商设计平台后端服务启动类
 * 
 * 技术栈: Spring Boot 3.2 + JDK 21 + MyBatis-Plus + MySQL + Playwright
 * 
 * API功能:
 * - 截图生成 (Playwright替代Puppeteer)
 * - 文件上传
 * - 模板管理
 * - 素材管理
 * - 用户认证 (JWT)
 */
@SpringBootApplication
@MapperScan("com.yidesign.mapper")
public class YiDesignApplication {

    public static void main(String[] args) {
        SpringApplication.run(YiDesignApplication.class, args);
        System.out.println("====================================");
        System.out.println("   易设计后端服务启动成功!");
        System.out.println("   API文档: http://localhost:8080/doc.html");
        System.out.println("====================================");
    }
}