package com.yidesign.model.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;
import java.time.LocalDateTime;

/**
 * 设计模板实体
 */
@Data
@TableName("design_template")
public class DesignTemplate {
    /**
     * 主键ID
     */
    @TableId(type = IdType.AUTO)
    private Long id;
    
    /**
     * 模板名称
     */
    private String name;
    
    /**
     * 模板分类ID
     */
    private Long categoryId;
    
    /**
     * 模板类型：poster/banner/card等
     */
    private String type;
    
    /**
     * 模板宽度（像素）
     */
    private Integer width;
    
    /**
     * 模板高度（像素）
     */
    private Integer height;
    
    /**
     * 模板预览图URL
     */
    private String previewUrl;
    
    /**
     * 模板数据（JSON格式）
     */
    private String templateData;
    
    /**
     * 是否公开：0-私有，1-公开
     */
    private Integer isPublic;
    
    /**
     * 创建者ID
     */
    private Long creatorId;
    
    /**
     * 使用次数
     */
    private Integer useCount;
    
    /**
     * 创建时间
     */
    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime createTime;
    
    /**
     * 更新时间
     */
    @TableField(fill = FieldFill.INSERT_UPDATE)
    private LocalDateTime updateTime;
}