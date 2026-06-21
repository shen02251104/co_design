package com.yidesign.model.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;
import java.time.LocalDateTime;

/**
 * VIP权益实体类
 */
@Data
@TableName("vip_benefit")
public class VipBenefit {
    
    @TableId(type = IdType.AUTO)
    private Long id;
    
    /** 权益名称 */
    private String name;
    
    /** 权益描述 */
    private String description;
    
    /** 权益图标 */
    private String icon;
    
    /** 权益类型: commercial商用授权, download无水印下载, template模板数量, ai AI功能, storage存储空间 */
    private String type;
    
    /** 权益值(如模板数量100万) */
    private String value;
    
    /** 适用版本: basic基础版, advanced高级版, pro专业版 */
    private String applicableVersion;
    
    /** 排序权重 */
    private Integer sortOrder;
    
    /** 状态: 0禁用, 1启用 */
    private Integer status;
    
    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime createdAt;
    
    @TableField(fill = FieldFill.INSERT_UPDATE)
    private LocalDateTime updatedAt;
}