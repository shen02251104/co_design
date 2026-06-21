package com.yidesign.model.dto;

import lombok.Data;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;

/**
 * VIP订单创建DTO
 */
@Data
public class VipOrderCreateDTO {
    
    /** 套餐ID */
    @NotNull(message = "套餐ID不能为空")
    private Long packageId;
    
    /** 支付方式: alipay支付宝, wechat微信 */
    @NotNull(message = "支付方式不能为空")
    private String paymentMethod;
    
    /** 优惠券ID (可选) */
    private Long couponId;
    
    /** 订单备注 */
    private String remark;
}