package com.yidesign.service;

import com.yidesign.model.dto.LoginDTO;
import com.yidesign.model.dto.RegisterDTO;
import com.yidesign.model.vo.UserVO;

/**
 * 用户服务接口
 */
public interface UserService {
    
    /**
     * 发送验证码
     */
    void sendCode(String phone);
    
    /**
     * 用户登录
     */
    String login(LoginDTO dto);
    
    /**
     * 用户注册
     */
    String register(RegisterDTO dto);
    
    /**
     * 获取当前用户
     */
    UserVO getCurrentUser();
    
    /**
     * 更新用户信息
     */
    void updateUserInfo(UserVO userVO);
    
    /**
     * 充值
     */
    void recharge(Double amount);
}