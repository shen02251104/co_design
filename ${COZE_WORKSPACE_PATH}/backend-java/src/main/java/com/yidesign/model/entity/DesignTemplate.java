package com.yidesign.model.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;
import java.time.LocalDateTime;

/**
 * 设计模板实体类
 */
@Data
@TableName("design_template")
public class DesignTemplate {
    
    @TableId(type = IdType.AUTO)
    private Long id;
    
    /** 模板名称 */
    private String name;
    
    /** 分类: promotional/festival/product/brand 等 */
    private String category;
    
    /** 模板数据JSON */
    private String content;
    
    /** 预览图URL */
    private String previewUrl;
    
    /** 是否免费: 0-付费 1-免费 */
    private Integer isFree;
    
    /** 价格（积分） */
    private Integer price;
    
    /** 使用次数 */
    private Integer useCount;
    
    /** 状态: 0-下架 1-上架 */
    private Integer status;
    
    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime createTime;
    
    @TableField(fill = FieldFill.INSERT_UPDATE)
    private LocalDateTime updateTime;
    
    @TableLogic
    private Integer deleted;
}