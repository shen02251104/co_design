package com.yidesign.model.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * VIP订单实体类
 */
@Data
@TableName("vip_order")
public class VipOrder {
    
    @TableId(type = IdType.AUTO)
    private Long id;
    
    /** 订单号 */
    private String orderNo;
    
    /** 用户ID */
    private Long userId;
    
    /** 套餐ID */
    private Long packageId;
    
    /** 套餐名称(冗余存储) */
    private String packageName;
    
    /** 原价 */
    private BigDecimal originalPrice;
    
    /** 实付金额 */
    private BigDecimal paidAmount;
    
    /** 优惠金额 */
    private BigDecimal discountAmount;
    
    /** 支付方式: alipay支付宝, wechat微信 */
    private String paymentMethod;
    
    /** 支付状态: pending待支付, paid已支付, cancelled已取消, refunded已退款 */
    private String paymentStatus;
    
    /** 第三方支付交易号 */
    private String tradeNo;
    
    /** 优惠券ID */
    private Long couponId;
    
    /** 优惠券名称 */
    private String couponName;
    
    /** VIP生效时间 */
    private LocalDateTime vipStartTime;
    
    /** VIP到期时间 */
    private LocalDateTime vipEndTime;
    
    /** 是否已开通VIP */
    private Boolean vipActivated;
    
    /** 订单备注 */
    private String remark;
    
    /** 支付时间 */
    private LocalDateTime paidAt;
    
    /** 创建时间 */
    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime createdAt;
    
    /** 更新时间 */
    @TableField(fill = FieldFill.INSERT_UPDATE)
    private LocalDateTime updatedAt;
}