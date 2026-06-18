package com.yidesign.model.dto;

import lombok.Data;

/**
 * 注册请求DTO
 */
@Data
public class RegisterDTO {
    /**
     * 用户名
     */
    private String username;
    
    /**
     * 邮箱
     */
    private String email;
    
    /**
     * 手机号
     */
    private String phone;
    
    /**
     * 密码
     */
    private String password;
    
    /**
     * 验证码
     */
    private String code;
    
    /**
     * 验证码类型：email/phone
     */
    private String codeType;
}