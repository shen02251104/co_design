package com.yidesign.model.vo;

import lombok.Data;
import java.time.LocalDateTime;

/**
 * 用户信息响应VO
 */
@Data
public class UserVO {
    
    private Long id;
    
    private String phone;
    
    private String email;
    
    private String nickname;
    
    private String avatar;
    
    private Integer memberLevel;
    
    private String memberLevelName;
    
    private LocalDateTime memberExpireTime;
    
    private Double balance;
    
    private Integer designCount;
    
    private LocalDateTime createTime;
}