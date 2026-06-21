package com.yidesign.service;

import com.yidesign.model.dto.VipOrderCreateDTO;
import com.yidesign.model.entity.VipBenefit;
import com.yidesign.model.entity.VipOrder;
import com.yidesign.model.entity.VipPackage;
import com.yidesign.model.vo.VipOrderVO;
import com.yidesign.model.vo.VipPackageVO;

import java.util.List;
import java.util.Map;

/**
 * VIP会员服务接口
 */
public interface VipService {
    
    /**
     * 获取所有套餐列表
     */
    List<VipPackage> getAllPackages();
    
    /**
     * 按使用类型获取套餐列表
     */
    List<VipPackage> getPackagesByUsageType(String usageType);
    
    /**
     * 按版本获取套餐列表
     */
    List<VipPackage> getPackagesByVersion(String version);
    
    /**
     * 获取套餐详情
     */
    VipPackage getPackageById(Long id);
    
    /**
     * 获取所有权益列表
     */
    List<VipBenefit> getAllBenefits();
    
    /**
     * 获取指定版本的权益列表
     */
    List<VipBenefit> getBenefitsByVersion(String version);
    
    /**
     * 创建VIP订单
     */
    VipOrder createOrder(Long userId, VipOrderCreateDTO dto);
    
    /**
     * 获取用户订单列表
     */
    List<VipOrder> getUserOrders(Long userId);
    
    /**
     * 获取订单详情
     */
    VipOrder getOrderByOrderNo(String orderNo);
    
    /**
     * 处理支付成功回调
     */
    boolean handlePaymentSuccess(String orderNo, String tradeNo, String paymentMethod);
    
    /**
     * 取消订单
     */
    boolean cancelOrder(String orderNo);
    
    /**
     * 获取用户VIP状态
     */
    Map<String, Object> getUserVipStatus(Long userId);
    
    /**
     * 检查用户是否有VIP权限
     */
    boolean checkUserVipPermission(Long userId, String permissionType);
    
    /**
     * 获取支付宝支付链接
     */
    String getAlipayUrl(VipOrder order);
    
    /**
     * 获取微信支付二维码链接
     */
    String getWechatPayUrl(VipOrder order);
    
    /**
     * 获取套餐分组数据（前端展示用）
     */
    Map<String, Object> getPackageGroups();
}