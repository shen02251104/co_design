package com.yidesign.model.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * 用户实体类
 */
@Data
@TableName("user")
public class User {
    
    @TableId(type = IdType.AUTO)
    private Long id;
    
    private String username;
    
    private String email;
    
    private String phone;
    
    private String password;
    
    private String avatar;
    
    private String nickname;
    
    /** VIP等级: 0普通, 1月度, 2年度, 3终身 */
    private Integer vipLevel;
    
    private LocalDateTime vipExpireTime;
    
    /** 账户余额 */
    private BigDecimal balance;
    
    /** 状态: 0禁用, 1正常 */
    private Integer status;
    
    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime createdAt;
    
    @TableField(fill = FieldFill.INSERT_UPDATE)
    private LocalDateTime updatedAt;
}