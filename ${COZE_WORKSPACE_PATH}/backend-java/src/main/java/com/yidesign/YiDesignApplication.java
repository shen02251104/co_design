package com.yidesign;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * 易设计后端启动类
 * 
 * @author 易设计团队
 * @version 1.0.0
 */
@SpringBootApplication
@MapperScan("com.yidesign.mapper")
public class YiDesignApplication {
    
    public static void main(String[] args) {
        SpringApplication.run(YiDesignApplication.class, args);
        System.out.println("==========================================");
        System.out.println("易设计后端服务启动成功！");
        System.out.println("API文档地址: http://localhost:8080/api/doc.html");
        System.out.println("==========================================");
    }
}