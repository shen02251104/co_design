package com.yidesign.controller;

import com.yidesign.model.dto.VipOrderCreateDTO;
import com.yidesign.model.entity.VipBenefit;
import com.yidesign.model.entity.VipOrder;
import com.yidesign.model.entity.VipPackage;
import com.yidesign.service.VipService;
import com.yidesign.utils.JwtUtil;
import com.yidesign.utils.Result;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * VIP会员控制器
 */
@Slf4j
@RestController
@RequestMapping("/api/vip")
@RequiredArgsConstructor
@Tag(name = "VIP会员管理", description = "VIP套餐购买、订单管理、权益查询等接口")
public class VipController {
    
    private final VipService vipService;
    private final JwtUtil jwtUtil;
    
    /**
     * 获取套餐分组数据（前端展示用）
     */
    @GetMapping("/packages/groups")
    @Operation(summary = "获取套餐分组数据", description = "获取所有套餐按使用类型和版本分组的数据")
    public Result<Map<String, Object>> getPackageGroups() {
        Map<String, Object> groups = vipService.getPackageGroups();
        return Result.success(groups);
    }
    
    /**
     * 获取所有套餐列表
     */
    @GetMapping("/packages")
    @Operation(summary = "获取所有套餐列表", description = "获取所有启用的VIP套餐")
    public Result<List<VipPackage>> getAllPackages() {
        List<VipPackage> packages = vipService.getAllPackages();
        return Result.success(packages);
    }
    
    /**
     * 按使用类型获取套餐
     */
    @GetMapping("/packages/usage/{usageType}")
    @Operation(summary = "按使用类型获取套餐", description = "获取单人用或团队用的套餐")
    public Result<List<VipPackage>> getPackagesByUsageType(
            @Parameter(description = "使用类型: single单人用, team团队用") 
            @PathVariable String usageType) {
        List<VipPackage> packages = vipService.getPackagesByUsageType(usageType);
        return Result.success(packages);
    }
    
    /**
     * 按版本获取套餐
     */
    @GetMapping("/packages/version/{version}")
    @Operation(summary = "按版本获取套餐", description = "获取基础版、高级版或专业版的套餐")
    public Result<List<VipPackage>> getPackagesByVersion(
            @Parameter(description = "版本: basic基础版, advanced高级版, pro专业版") 
            @PathVariable String version) {
        List<VipPackage> packages = vipService.getPackagesByVersion(version);
        return Result.success(packages);
    }
    
    /**
     * 获取套餐详情
     */
    @GetMapping("/packages/{id}")
    @Operation(summary = "获取套餐详情", description = "获取指定套餐的详细信息")
    public Result<VipPackage> getPackageById(@PathVariable Long id) {
        VipPackage packageInfo = vipService.getPackageById(id);
        if (packageInfo == null) {
            return Result.error("套餐不存在");
        }
        return Result.success(packageInfo);
    }
    
    /**
     * 获取所有权益列表
     */
    @GetMapping("/benefits")
    @Operation(summary = "获取所有权益列表", description = "获取所有启用的VIP权益")
    public Result<List<VipBenefit>> getAllBenefits() {
        List<VipBenefit> benefits = vipService.getAllBenefits();
        return Result.success(benefits);
    }
    
    /**
     * 按版本获取权益
     */
    @GetMapping("/benefits/version/{version}")
    @Operation(summary = "按版本获取权益", description = "获取指定版本可享受的权益")
    public Result<List<VipBenefit>> getBenefitsByVersion(@PathVariable String version) {
        List<VipBenefit> benefits = vipService.getBenefitsByVersion(version);
        return Result.success(benefits);
    }
    
    /**
     * 创建VIP订单
     */
    @PostMapping("/orders")
    @Operation(summary = "创建VIP订单", description = "创建VIP购买订单，返回支付链接")
    public Result<Map<String, Object>> createOrder(
            @Valid @RequestBody VipOrderCreateDTO dto,
            HttpServletRequest request) {
        // 从JWT获取用户ID
        Long userId = getUserIdFromRequest(request);
        if (userId == null) {
            return Result.error(401, "请先登录");
        }
        
        try {
            // 创建订单
            VipOrder order = vipService.createOrder(userId, dto);
            
            // 获取支付链接
            String payUrl;
            if ("alipay".equals(dto.getPaymentMethod())) {
                payUrl = vipService.getAlipayUrl(order);
            } else {
                payUrl = vipService.getWechatPayUrl(order);
            }
            
            // 返回订单信息和支付链接
            Map<String, Object> result = new HashMap<>();
            result.put("order", order);
            result.put("payUrl", payUrl);
            
            return Result.success("订单创建成功", result);
        } catch (Exception e) {
            log.error("创建VIP订单失败", e);
            return Result.error(e.getMessage());
        }
    }
    
    /**
     * 获取用户订单列表
     */
    @GetMapping("/orders")
    @Operation(summary = "获取用户订单列表", description = "获取当前用户的VIP购买订单")
    public Result<List<VipOrder>> getUserOrders(HttpServletRequest request) {
        Long userId = getUserIdFromRequest(request);
        if (userId == null) {
            return Result.error(401, "请先登录");
        }
        
        List<VipOrder> orders = vipService.getUserOrders(userId);
        return Result.success(orders);
    }
    
    /**
     * 获取订单详情
     */
    @GetMapping("/orders/{orderNo}")
    @Operation(summary = "获取订单详情", description = "获取指定订单的详细信息")
    public Result<VipOrder> getOrderByOrderNo(@PathVariable String orderNo) {
        VipOrder order = vipService.getOrderByOrderNo(orderNo);
        if (order == null) {
            return Result.error("订单不存在");
        }
        return Result.success(order);
    }
    
    /**
     * 取消订单
     */
    @PostMapping("/orders/{orderNo}/cancel")
    @Operation(summary = "取消订单", description = "取消未支付的订单")
    public Result<Boolean> cancelOrder(@PathVariable String orderNo) {
        boolean success = vipService.cancelOrder(orderNo);
        if (success) {
            return Result.success("订单已取消", true);
        }
        return Result.error("取消订单失败，订单可能已支付或不存在");
    }
    
    /**
     * 获取用户VIP状态
     */
    @GetMapping("/status")
    @Operation(summary = "获取用户VIP状态", description = "获取当前用户的VIP会员状态")
    public Result<Map<String, Object>> getUserVipStatus(HttpServletRequest request) {
        Long userId = getUserIdFromRequest(request);
        if (userId == null) {
            return Result.error(401, "请先登录");
        }
        
        Map<String, Object> status = vipService.getUserVipStatus(userId);
        return Result.success(status);
    }
    
    /**
     * 检查VIP权限
     */
    @GetMapping("/check-permission")
    @Operation(summary = "检查VIP权限", description = "检查用户是否有特定VIP权限")
    public Result<Boolean> checkVipPermission(
            @Parameter(description = "权限类型: commercial商用, download无水印下载等") 
            @RequestParam String permissionType,
            HttpServletRequest request) {
        Long userId = getUserIdFromRequest(request);
        if (userId == null) {
            return Result.success(false);
        }
        
        boolean hasPermission = vipService.checkUserVipPermission(userId, permissionType);
        return Result.success(hasPermission);
    }
    
    /**
     * 支付宝支付回调
     */
    @PostMapping("/notify/alipay")
    @Operation(summary = "支付宝支付回调", description = "接收支付宝支付成功通知")
    public String alipayNotify(@RequestParam Map<String, String> params) {
        log.info("收到支付宝回调: {}", params);
        
        try {
            String orderNo = params.get("out_trade_no");
            String tradeNo = params.get("trade_no");
            
            if ("TRADE_SUCCESS".equals(params.get("trade_status"))) {
                boolean success = vipService.handlePaymentSuccess(orderNo, tradeNo, "alipay");
                if (success) {
                    return "success";
                }
            }
        } catch (Exception e) {
            log.error("处理支付宝回调失败", e);
        }
        
        return "fail";
    }
    
    /**
     * 微信支付回调
     */
    @PostMapping("/notify/wechat")
    @Operation(summary = "微信支付回调", description = "接收微信支付成功通知")
    public String wechatNotify(@RequestBody String xmlData) {
        log.info("收到微信回调: {}", xmlData);
        
        try {
            // 解析XML数据
            Map<String, String> params = parseXml(xmlData);
            String orderNo = params.get("out_trade_no");
            String tradeNo = params.get("transaction_id");
            
            if ("SUCCESS".equals(params.get("result_code"))) {
                boolean success = vipService.handlePaymentSuccess(orderNo, tradeNo, "wechat");
                if (success) {
                    return "<xml><return_code><![CDATA[SUCCESS]]></return_code></xml>";
                }
            }
        } catch (Exception e) {
            log.error("处理微信回调失败", e);
        }
        
        return "<xml><return_code><![CDATA[FAIL]]></return_code></xml>";
    }
    
    /**
     * 从请求中获取用户ID
     */
    private Long getUserIdFromRequest(HttpServletRequest request) {
        String token = request.getHeader("Authorization");
        if (token == null || !token.startsWith("Bearer ")) {
            return null;
        }
        
        token = token.substring(7);
        try {
            return jwtUtil.getUserIdFromToken(token);
        } catch (Exception e) {
            log.error("解析JWT失败", e);
            return null;
        }
    }
    
    /**
     * 解析XML数据
     */
    private Map<String, String> parseXml(String xml) {
        Map<String, String> params = new HashMap<>();
        // 简化处理，实际应使用XML解析库
        // 这里只是示例
        return params;
    }
}