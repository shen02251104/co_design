package com.yidesign.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.yidesign.model.entity.VipOrder;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * VIP订单Mapper
 */
@Mapper
public interface VipOrderMapper extends BaseMapper<VipOrder> {
    
    /**
     * 按用户ID查询订单列表
     */
    @Select("SELECT * FROM vip_order WHERE user_id = #{userId} ORDER BY created_at DESC")
    List<VipOrder> selectByUserId(Long userId);
    
    /**
     * 按订单号查询订单
     */
    @Select("SELECT * FROM vip_order WHERE order_no = #{orderNo}")
    VipOrder selectByOrderNo(String orderNo);
    
    /**
     * 按支付状态查询订单
     */
    @Select("SELECT * FROM vip_order WHERE payment_status = #{status} ORDER BY created_at DESC")
    List<VipOrder> selectByPaymentStatus(String status);
    
    /**
     * 按交易号查询订单
     */
    @Select("SELECT * FROM vip_order WHERE trade_no = #{tradeNo}")
    VipOrder selectByTradeNo(String tradeNo);
}