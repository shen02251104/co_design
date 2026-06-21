package com.yidesign.model.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * VIP套餐实体类
 */
@Data
@TableName("vip_package")
public class VipPackage {
    
    @TableId(type = IdType.AUTO)
    private Long id;
    
    /** 套餐名称: 终身版、年度版、季度版、月度版 */
    private String name;
    
    /** 套餐类型: lifetime终身, yearly年度, quarterly季度, monthly月度 */
    private String type;
    
    /** 版本类型: basic基础版, advanced高级版, pro专业版 */
    private String version;
    
    /** 使用类型: single单人用, team团队用 */
    private String usageType;
    
    /** 原价 */
    private BigDecimal originalPrice;
    
    /** 现价 */
    private BigDecimal currentPrice;
    
    /** 有效天数: -1表示终身 */
    private Integer validDays;
    
    /** 是否推荐 */
    private Boolean isRecommended;
    
    /** 活动标签: 如"端午活动减10"、"首季立减20" */
    private String activityTag;
    
    /** 套餐描述 */
    private String description;
    
    /** 送积分数量 */
    private Integer bonusPoints;
    
    /** 排序权重 */
    private Integer sortOrder;
    
    /** 状态: 0禁用, 1启用 */
    private Integer status;
    
    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime createdAt;
    
    @TableField(fill = FieldFill.INSERT_UPDATE)
    private LocalDateTime updatedAt;
}