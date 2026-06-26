package com.yidesign.model.vo;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * VIP订单VO - 返回给前端的数据对象
 */
@Data
public class VipOrderVO {
    
    /** 订单ID */
    private Long id;
    
    /** 订单号 */
    private String orderNo;
    
    /** 用户ID */
    private Long userId;
    
    /** 套餐ID */
    private Long packageId;
    
    /** 套餐名称 */
    private String packageName;
    
    /** 原价 */
    private BigDecimal originalPrice;
    
    /** 实付金额 */
    private BigDecimal paidAmount;
    
    /** 优惠金额 */
    private BigDecimal discountAmount;
    
    /** 支付方式: alipay支付宝, wechat微信 */
    private String paymentMethod;
    
    /** 支付方式名称 */
    private String paymentMethodName;
    
    /** 支付状态: pending待支付, paid已支付, cancelled已取消, refunded已退款 */
    private String paymentStatus;
    
    /** 支付状态名称 */
    private String paymentStatusName;
    
    /** 第三方支付交易号 */
    private String tradeNo;
    
    /** 创建时间 */
    private LocalDateTime createTime;
    
    /** 支付时间 */
    private LocalDateTime paidTime;
    
    /** VIP开始时间 */
    private LocalDateTime vipStartTime;
    
    /** VIP结束时间 */
    private LocalDateTime vipEndTime;
    
    /** 订单备注 */
    private String remark;
}