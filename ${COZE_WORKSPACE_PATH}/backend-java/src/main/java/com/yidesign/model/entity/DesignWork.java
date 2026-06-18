package com.yidesign.model.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;
import java.time.LocalDateTime;

/**
 * 设计作品实体类
 */
@Data
@TableName("design_work")
public class DesignWork {
    
    @TableId(type = IdType.AUTO)
    private Long id;
    
    /** 用户ID */
    private Long userId;
    
    /** 作品名称 */
    private String title;
    
    /** 作品类型: poster/banner/detail/amazon 等 */
    private String type;
    
    /** 作品数据JSON */
    private String content;
    
    /** 封面图URL */
    private String coverUrl;
    
    /** 是否公开: 0-私有 1-公开 */
    private Integer isPublic;
    
    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime createTime;
    
    @TableField(fill = FieldFill.INSERT_UPDATE)
    private LocalDateTime updateTime;
    
    @TableLogic
    private Integer deleted;
}