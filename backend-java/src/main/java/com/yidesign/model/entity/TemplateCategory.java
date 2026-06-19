package com.yidesign.model.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;
import java.time.LocalDateTime;

/**
 * 模板分类实体
 */
@Data
@TableName("template_category")
public class TemplateCategory {
    /**
     * 主键ID
     */
    @TableId(type = IdType.AUTO)
    private Long id;
    
    /**
     * 分类名称
     */
    private String name;
    
    /**
     * 分类类型：1-模板分类，2-素材分类
     */
    private Integer type;
    
    /**
     * 排序
     */
    private Integer sort;
    
    /**
     * 是否启用
     */
    private Integer status;
    
    /**
     * 创建时间
     */
    @TableField(value = "created_at", fill = FieldFill.INSERT)
    private LocalDateTime createdAt;
    
    /**
     * 更新时间
     */
    @TableField(value = "updated_at", fill = FieldFill.INSERT_UPDATE)
    private LocalDateTime updatedAt;
}