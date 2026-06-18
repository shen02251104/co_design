package com.yidesign.model.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;
import java.time.LocalDateTime;

/**
 * 用户实体类
 */
@Data
@TableName("user")
public class User {
    
    @TableId(type = IdType.AUTO)
    private Long id;
    
    private String phone;
    
    private String email;
    
    private String password;
    
    private String nickname;
    
    private String avatar;
    
    /** 会员等级: 0-普通 1-月度会员 2-年度会员 3-永久会员 */
    private Integer memberLevel;
    
    /** 会员到期时间 */
    private LocalDateTime memberExpireTime;
    
    /** 账户余额 */
    private Double balance;
    
    /** 状态: 0-禁用 1-正常 */
    private Integer status;
    
    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime createTime;
    
    @TableField(fill = FieldFill.INSERT_UPDATE)
    private LocalDateTime updateTime;
    
    @TableLogic
    private Integer deleted;
}