package com.yidesign.service;

import com.yidesign.model.dto.LoginDTO;
import com.yidesign.model.dto.RegisterDTO;
import com.yidesign.model.entity.User;
import com.yidesign.model.vo.UserVO;

/**
 * 用户服务接口
 */
public interface UserService {
    
    /**
     * 用户登录
     */
    UserVO login(LoginDTO loginDTO);
    
    /**
     * 用户注册
     */
    UserVO register(RegisterDTO registerDTO);
    
    /**
     * 根据ID获取用户
     */
    User getUserById(Long id);
    
    /**
     * 根据手机号获取用户
     */
    User getUserByPhone(String phone);
    
    /**
     * 根据邮箱获取用户
     */
    User getUserByEmail(String email);
    
    /**
     * 更新用户信息
     */
    boolean updateUser(User user);
    
    /**
     * 检查手机号是否存在
     */
    boolean checkPhoneExists(String phone);
    
    /**
     * 检查邮箱是否存在
     */
    boolean checkEmailExists(String email);
}