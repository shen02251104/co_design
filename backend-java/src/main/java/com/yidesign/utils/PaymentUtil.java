package com.yidesign.utils;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

/**
 * 支付工具类
 * 支持支付宝和微信支付
 */
@Slf4j
@Component
public class PaymentUtil {
    
    @Value("${payment.alipay.app-id:}")
    private String alipayAppId;
    
    @Value("${payment.alipay.private-key:}")
    private String alipayPrivateKey;
    
    @Value("${payment.alipay.public-key:}")
    private String alipayPublicKey;
    
    @Value("${payment.alipay.gateway-url:https://openapi.alipay.com/gateway.do}")
    private String alipayGatewayUrl;
    
    @Value("${payment.alipay.notify-url:}")
    private String alipayNotifyUrl;
    
    @Value("${payment.alipay.return-url:}")
    private String alipayReturnUrl;
    
    @Value("${payment.wechat.app-id:}")
    private String wechatAppId;
    
    @Value("${payment.wechat.mch-id:}")
    private String wechatMchId;
    
    @Value("${payment.wechat.api-key:}")
    private String wechatApiKey;
    
    @Value("${payment.wechat.notify-url:}")
    private String wechatNotifyUrl;
    
    /**
     * 生成支付宝支付链接
     */
    public String generateAlipayUrl(String orderNo, String subject, BigDecimal amount, String body) {
        // 构建支付宝支付请求参数
        Map<String, String> params = new HashMap<>();
        params.put("app_id", alipayAppId);
        params.put("method", "alipay.trade.page.pay");
        params.put("format", "JSON");
        params.put("charset", "utf-8");
        params.put("sign_type", "RSA2");
        params.put("timestamp", LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
        params.put("version", "1.0");
        params.put("notify_url", alipayNotifyUrl);
        params.put("return_url", alipayReturnUrl);
        
        // 业务参数
        Map<String, Object> bizContent = new HashMap<>();
        bizContent.put("out_trade_no", orderNo);
        bizContent.put("total_amount", amount.toString());
        bizContent.put("subject", subject);
        bizContent.put("product_code", "FAST_INSTANT_TRADE_PAY");
        bizContent.put("body", body);
        
        params.put("biz_content", toJson(bizContent));
        
        // 生成签名
        String sign = generateAlipaySign(params);
        params.put("sign", sign);
        
        // 构建请求URL
        StringBuilder url = new StringBuilder(alipayGatewayUrl);
        url.append("?");
        for (Map.Entry<String, String> entry : params.entrySet()) {
            url.append(entry.getKey()).append("=")
               .append(urlEncode(entry.getValue())).append("&");
        }
        
        // 移除最后一个&
        String payUrl = url.substring(0, url.length() - 1);
        log.info("生成支付宝支付链接: {}", payUrl);
        
        return payUrl;
    }
    
    /**
     * 生成微信支付二维码链接
     */
    public String generateWechatPayUrl(String orderNo, String subject, BigDecimal amount) {
        // 构建微信支付请求参数
        Map<String, String> params = new HashMap<>();
        params.put("appid", wechatAppId);
        params.put("mch_id", wechatMchId);
        params.put("nonce_str", generateNonceStr());
        params.put("body", subject);
        params.put("out_trade_no", orderNo);
        params.put("total_fee", String.valueOf(amount.multiply(new BigDecimal("100")).intValue()));
        params.put("spbill_create_ip", "127.0.0.1");
        params.put("notify_url", wechatNotifyUrl);
        params.put("trade_type", "NATIVE");
        
        // 生成签名
        String sign = generateWechatSign(params);
        params.put("sign", sign);
        
        // 构建XML请求
        String xmlRequest = buildWechatXmlRequest(params);
        log.info("生成微信支付请求: {}", xmlRequest);
        
        // 实际项目中需要调用微信API获取code_url
        // 这里返回模拟的二维码链接
        String qrUrl = "weixin://wxpay/bizpayurl?pr=" + orderNo;
        log.info("生成微信支付二维码: {}", qrUrl);
        
        return qrUrl;
    }
    
    /**
     * 验证支付宝支付回调
     */
    public boolean verifyAlipayNotify(Map<String, String> params) {
        // 移除sign和sign_type
        String sign = params.get("sign");
        params.remove("sign");
        params.remove("sign_type");
        
        // 验证签名
        String calculatedSign = generateAlipaySign(params);
        
        return sign != null && sign.equals(calculatedSign);
    }
    
    /**
     * 验证微信支付回调
     */
    public boolean verifyWechatNotify(Map<String, String> params) {
        String sign = params.get("sign");
        params.remove("sign");
        
        String calculatedSign = generateWechatSign(params);
        
        return sign != null && sign.equals(calculatedSign);
    }
    
    /**
     * 生成支付宝签名
     */
    private String generateAlipaySign(Map<String, String> params) {
        // 按key排序
        List<String> keys = new ArrayList<>(params.keySet());
        Collections.sort(keys);
        
        StringBuilder sb = new StringBuilder();
        for (String key : keys) {
            String value = params.get(key);
            if (value != null && !value.isEmpty()) {
                sb.append(key).append("=").append(value).append("&");
            }
        }
        
        // 移除最后一个&
        String signStr = sb.substring(0, sb.length() - 1);
        
        // RSA2签名 (实际项目中需要使用真正的RSA签名)
        // 这里简化处理，实际需要使用支付宝SDK
        return md5(signStr + alipayPrivateKey);
    }
    
    /**
     * 生成微信签名
     */
    private String generateWechatSign(Map<String, String> params) {
        // 按key排序
        List<String> keys = new ArrayList<>(params.keySet());
        Collections.sort(keys);
        
        StringBuilder sb = new StringBuilder();
        for (String key : keys) {
            String value = params.get(key);
            if (value != null && !value.isEmpty()) {
                sb.append(key).append("=").append(value).append("&");
            }
        }
        
        sb.append("key=").append(wechatApiKey);
        
        return md5(sb.toString()).toUpperCase();
    }
    
    /**
     * MD5加密
     */
    private String md5(String str) {
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            byte[] bytes = md.digest(str.getBytes(StandardCharsets.UTF_8));
            StringBuilder sb = new StringBuilder();
            for (byte b : bytes) {
                sb.append(String.format("%02x", b));
            }
            return sb.toString();
        } catch (Exception e) {
            log.error("MD5加密失败", e);
            return "";
        }
    }
    
    /**
     * URL编码
     */
    private String urlEncode(String str) {
        try {
            return java.net.URLEncoder.encode(str, StandardCharsets.UTF_8.name());
        } catch (Exception e) {
            return str;
        }
    }
    
    /**
     * 生成随机字符串
     */
    private String generateNonceStr() {
        return UUID.randomUUID().toString().replace("-", "").substring(0, 32);
    }
    
    /**
     * 构建微信XML请求
     */
    private String buildWechatXmlRequest(Map<String, String> params) {
        StringBuilder xml = new StringBuilder("<xml>");
        for (Map.Entry<String, String> entry : params.entrySet()) {
            xml.append("<").append(entry.getKey()).append(">")
               .append(entry.getValue())
               .append("</").append(entry.getKey()).append(">");
        }
        xml.append("</xml>");
        return xml.toString();
    }
    
    /**
     * 对象转JSON字符串
     */
    private String toJson(Object obj) {
        // 简化处理，实际应使用Jackson或Gson
        if (obj instanceof Map) {
            Map<?, ?> map = (Map<?, ?>) obj;
            StringBuilder sb = new StringBuilder("{");
            for (Map.Entry<?, ?> entry : map.entrySet()) {
                sb.append("\"").append(entry.getKey()).append("\":");
                if (entry.getValue() instanceof String) {
                    sb.append("\"").append(entry.getValue()).append("\"");
                } else {
                    sb.append(entry.getValue());
                }
                sb.append(",");
            }
            if (sb.length() > 1) {
                sb.setLength(sb.length() - 1);
            }
            sb.append("}");
            return sb.toString();
        }
        return obj.toString();
    }
}