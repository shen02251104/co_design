package com.yidesign.model.vo;

import lombok.Data;
import java.math.BigDecimal;
import java.util.List;

/**
 * VIP套餐VO - 返回给前端的数据对象
 */
@Data
public class VipPackageVO {
    
    /** 套餐ID */
    private Long id;
    
    /** 套餐名称 */
    private String name;
    
    /** 套餐描述 */
    private String description;
    
    /** 套餐类型: monthly月卡, yearly年卡, lifetime终身 */
    private String type;
    
    /** 原价 */
    private BigDecimal originalPrice;
    
    /** 现价 */
    private BigDecimal currentPrice;
    
    /** 折扣比例 */
    private Integer discountPercent;
    
    /** 是否为推荐套餐 */
    private Boolean recommended;
    
    /** 是否为热门套餐 */
    private Boolean hot;
    
    /** AI次数限制 */
    private Integer aiLimit;
    
    /** VIP等级: basic基础, pro专业, lifetime终身 */
    private String vipLevel;
    
    /** 排序权重 */
    private Integer sortOrder;
    
    /** 是否有效 */
    private Boolean active;
    
    /** 套餐权益列表 */
    private List<VipBenefitVO> benefits;
    
    /**
     * VIP权益简要VO
     */
    @Data
    public static class VipBenefitVO {
        /** 权益ID */
        private Long id;
        
        /** 权益名称 */
        private String name;
        
        /** 权益图标 */
        private String icon;
        
        /** 权益描述 */
        private String description;
        
        /** 是否包含该权益 */
        private Boolean included;
    }
}