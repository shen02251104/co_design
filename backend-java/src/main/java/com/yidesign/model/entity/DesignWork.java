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
    
    private Long userId;
    
    private String title;
    
    private String description;
    
    private String coverUrl;
    
    /** 画布数据JSON */
    private String canvasData;
    
    private Integer width;
    
    private Integer height;
    
    /** 是否模板: 0否, 1是 */
    private Integer isTemplate;
    
    /** 是否公开: 0否, 1是 */
    private Integer isPublic;
    
    private Integer downloadCount;
    
    private Integer viewCount;
    
    /** 状态: 0删除, 1正常 */
    private Integer status;
    
    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime createdAt;
    
    @TableField(fill = FieldFill.INSERT_UPDATE)
    private LocalDateTime updatedAt;
}