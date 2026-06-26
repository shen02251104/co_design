package com.yidesign.service.impl;

import com.yidesign.mapper.*;
import com.yidesign.model.dto.VipOrderCreateDTO;
import com.yidesign.model.entity.*;
import com.yidesign.service.VipService;
import com.yidesign.utils.PaymentUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

/**
 * VIP会员服务实现类
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class VipServiceImpl implements VipService {
    
    private final VipPackageMapper vipPackageMapper;
    private final VipOrderMapper vipOrderMapper;
    private final VipBenefitMapper vipBenefitMapper;
    private final UserMapper userMapper;
    private final PaymentUtil paymentUtil;
    
    @Override
    public List<VipPackage> getAllPackages() {
        return vipPackageMapper.selectAllEnabled();
    }
    
    @Override
    public List<VipPackage> getPackagesByUsageType(String usageType) {
        return vipPackageMapper.selectByUsageType(usageType);
    }
    
    @Override
    public List<VipPackage> getPackagesByVersion(String version) {
        return vipPackageMapper.selectByVersion(version);
    }
    
    @Override
    public VipPackage getPackageById(Long id) {
        return vipPackageMapper.selectById(id);
    }
    
    @Override
    public List<VipBenefit> getAllBenefits() {
        return vipBenefitMapper.selectAllEnabled();
    }
    
    @Override
    public List<VipBenefit> getBenefitsByVersion(String version) {
        return vipBenefitMapper.selectByVersion(version);
    }
    
    @Override
    @Transactional
    public VipOrder createOrder(Long userId, VipOrderCreateDTO dto) {
        // 查询套餐信息
        VipPackage packageInfo = vipPackageMapper.selectById(dto.getPackageId());
        if (packageInfo == null || packageInfo.getStatus() != 1) {
            throw new RuntimeException("套餐不存在或已禁用");
        }
        
        // 查询用户信息
        User user = userMapper.selectById(userId);
        if (user == null) {
            throw new RuntimeException("用户不存在");
        }
        
        // 创建订单
        VipOrder order = new VipOrder();
        order.setOrderNo(generateOrderNo());
        order.setUserId(userId);
        order.setPackageId(dto.getPackageId());
        order.setPackageName(packageInfo.getName());
        order.setOriginalPrice(packageInfo.getOriginalPrice());
        order.setPaidAmount(packageInfo.getCurrentPrice());
        order.setDiscountAmount(packageInfo.getOriginalPrice().subtract(packageInfo.getCurrentPrice()));
        order.setPaymentMethod(dto.getPaymentMethod());
        order.setPaymentStatus("pending");
        order.setVipActivated(false);
        order.setCouponId(dto.getCouponId());
        order.setRemark(dto.getRemark());
        
        vipOrderMapper.insert(order);
        
        log.info("创建VIP订单成功, 订单号: {}, 用户: {}, 套餐: {}", 
            order.getOrderNo(), userId, packageInfo.getName());
        
        return order;
    }
    
    @Override
    public List<VipOrder> getUserOrders(Long userId) {
        return vipOrderMapper.selectByUserId(userId);
    }
    
    @Override
    public VipOrder getOrderByOrderNo(String orderNo) {
        return vipOrderMapper.selectByOrderNo(orderNo);
    }
    
    @Override
    @Transactional
    public boolean handlePaymentSuccess(String orderNo, String tradeNo, String paymentMethod) {
        VipOrder order = vipOrderMapper.selectByOrderNo(orderNo);
        if (order == null) {
            log.error("订单不存在: {}", orderNo);
            return false;
        }
        
        if ("paid".equals(order.getPaymentStatus())) {
            log.warn("订单已支付: {}", orderNo);
            return true;
        }
        
        // 更新订单支付状态
        order.setPaymentStatus("paid");
        order.setTradeNo(tradeNo);
        order.setPaidAt(LocalDateTime.now());
        vipOrderMapper.updateById(order);
        
        // 激活VIP
        activateVip(order);
        
        log.info("VIP订单支付成功, 订单号: {}, 交易号: {}", orderNo, tradeNo);
        return true;
    }
    
    /**
     * 激活VIP权益
     */
    private void activateVip(VipOrder order) {
        VipPackage packageInfo = vipPackageMapper.selectById(order.getPackageId());
        User user = userMapper.selectById(order.getUserId());
        
        if (packageInfo == null || user == null) {
            return;
        }
        
        LocalDateTime startTime = LocalDateTime.now();
        LocalDateTime endTime;
        
        // 计算VIP到期时间
        if (packageInfo.getValidDays() == -1) {
            // 终身会员，设置100年后
            endTime = startTime.plusYears(100);
        } else {
            endTime = startTime.plusDays(packageInfo.getValidDays());
        }
        
        // 更新用户VIP信息
        user.setVipLevel(getVipLevel(packageInfo.getVersion()));
        user.setVipExpireTime(endTime);
        userMapper.updateById(user);
        
        // 更新订单VIP激活信息
        order.setVipStartTime(startTime);
        order.setVipEndTime(endTime);
        order.setVipActivated(true);
        vipOrderMapper.updateById(order);
        
        log.info("VIP权益激活成功, 用户: {}, 套餐: {}, 到期时间: {}", 
            order.getUserId(), packageInfo.getName(), endTime);
    }
    
    /**
     * 获取VIP等级
     */
    private Integer getVipLevel(String version) {
        switch (version) {
            case "basic":
                return 1;
            case "advanced":
                return 2;
            case "pro":
                return 3;
            default:
                return 1;
        }
    }
    
    @Override
    @Transactional
    public boolean cancelOrder(String orderNo) {
        VipOrder order = vipOrderMapper.selectByOrderNo(orderNo);
        if (order == null) {
            return false;
        }
        
        if (!"pending".equals(order.getPaymentStatus())) {
            return false;
        }
        
        order.setPaymentStatus("cancelled");
        vipOrderMapper.updateById(order);
        
        log.info("订单已取消: {}", orderNo);
        return true;
    }
    
    @Override
    public Map<String, Object> getUserVipStatus(Long userId) {
        User user = userMapper.selectById(userId);
        if (user == null) {
            return null;
        }
        
        Map<String, Object> result = new HashMap<>();
        result.put("vipLevel", user.getVipLevel());
        result.put("vipExpireTime", user.getVipExpireTime());
        result.put("isVip", isUserVip(user));
        result.put("vipDaysLeft", getVipDaysLeft(user));
        result.put("vipVersion", getVipVersionName(user.getVipLevel()));
        
        return result;
    }
    
    /**
     * 判断用户是否是VIP
     */
    private boolean isUserVip(User user) {
        if (user.getVipLevel() == null || user.getVipLevel() == 0) {
            return false;
        }
        
        if (user.getVipExpireTime() == null) {
            return false;
        }
        
        return LocalDateTime.now().isBefore(user.getVipExpireTime());
    }
    
    /**
     * 计算VIP剩余天数
     */
    private long getVipDaysLeft(User user) {
        if (user.getVipExpireTime() == null) {
            return 0;
        }
        
        long days = java.time.temporal.ChronoUnit.DAYS.between(LocalDateTime.now(), user.getVipExpireTime());
        return Math.max(0, days);
    }
    
    /**
     * 获取VIP版本名称
     */
    private String getVipVersionName(Integer vipLevel) {
        if (vipLevel == null || vipLevel == 0) {
            return "普通用户";
        }
        
        switch (vipLevel) {
            case 1:
                return "基础版会员";
            case 2:
                return "高级版会员";
            case 3:
                return "专业版会员";
            default:
                return "普通用户";
        }
    }
    
    @Override
    public boolean checkUserVipPermission(Long userId, String permissionType) {
        User user = userMapper.selectById(userId);
        if (user == null) {
            return false;
        }
        
        // 非VIP用户无权限
        if (!isUserVip(user)) {
            return false;
        }
        
        // 根据权限类型检查
        // 这里可以根据业务需求扩展权限检查逻辑
        return true;
    }
    
    @Override
    public String getAlipayUrl(VipOrder order) {
        VipPackage packageInfo = vipPackageMapper.selectById(order.getPackageId());
        return paymentUtil.generateAlipayUrl(
            order.getOrderNo(),
            packageInfo.getName(),
            order.getPaidAmount(),
            "VIP会员购买"
        );
    }
    
    @Override
    public String getWechatPayUrl(VipOrder order) {
        VipPackage packageInfo = vipPackageMapper.selectById(order.getPackageId());
        return paymentUtil.generateWechatPayUrl(
            order.getOrderNo(),
            packageInfo.getName(),
            order.getPaidAmount()
        );
    }
    
    @Override
    public Map<String, Object> getPackageGroups() {
        List<VipPackage> packages = getAllPackages();
        List<VipBenefit> benefits = getAllBenefits();
        
        // 按使用类型分组
        Map<String, List<VipPackage>> byUsageType = packages.stream()
            .collect(Collectors.groupingBy(VipPackage::getUsageType));
        
        // 按版本分组
        Map<String, List<VipPackage>> byVersion = packages.stream()
            .collect(Collectors.groupingBy(VipPackage::getVersion));
        
        Map<String, Object> result = new HashMap<>();
        result.put("packages", packages);
        result.put("byUsageType", byUsageType);
        result.put("byVersion", byVersion);
        result.put("benefits", benefits);
        
        return result;
    }
    
    /**
     * 生成订单号
     */
    private String generateOrderNo() {
        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
        String random = String.format("%06d", new Random().nextInt(1000000));
        return "VIP" + timestamp + random;
    }
}