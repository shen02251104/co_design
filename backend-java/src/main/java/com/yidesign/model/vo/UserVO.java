package com.yidesign.model.vo;

import lombok.Data;
import java.time.LocalDateTime;

/**
 * 用户信息VO（返回给前端）
 */
@Data
public class UserVO {
    /**
     * 用户ID
     */
    private Long id;
    
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
     * 昵称
     */
    private String nickname;
    
    /**
     * 头像URL
     */
    private String avatar;
    
    /**
     * 会员等级：0-普通用户，1-VIP，2-SVIP
     */
    private Integer vipLevel;
    
    /**
     * 会员到期时间
     */
    private LocalDateTime vipExpireTime;
    
    /**
     * 创建时间
     */
    private LocalDateTime createTime;
    
    /**
     * 登录token
     */
    private String token;
}