package com.yidesign.model.dto;

import lombok.Data;

/**
 * 登录请求DTO
 */
@Data
public class LoginDTO {
    /**
     * 用户名/邮箱/手机号
     */
    private String username;
    
    /**
     * 密码
     */
    private String password;
    
    /**
     * 登录类型：password/code
     */
    private String type;
    
    /**
     * 验证码（短信/邮箱验证码登录时使用）
     */
    private String code;
    
    /**
     * 手机号登录
     */
    private String phone;
    
    /**
     * 邮箱登录
     */
    private String email;
}