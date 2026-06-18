package com.yidesign.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.yidesign.mapper.UserMapper;
import com.yidesign.model.dto.LoginDTO;
import com.yidesign.model.dto.RegisterDTO;
import com.yidesign.model.entity.User;
import com.yidesign.model.vo.UserVO;
import com.yidesign.service.UserService;
import com.yidesign.utils.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Random;

/**
 * 用户服务实现
 */
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    
    private final UserMapper userMapper;
    private final JwtUtil jwtUtil;
    
    @Override
    public void sendCode(String phone) {
        // 生成6位随机验证码
        String code = String.format("%06d", new Random().nextInt(1000000));
        // 实际项目中应调用短信服务发送
        // 这里仅打印到日志，便于测试
        System.out.println("验证码已发送到手机 " + phone + ": " + code);
        // TODO: 存储验证码到Redis，设置5分钟过期
    }
    
    @Override
    public String login(LoginDTO dto) {
        // 验证码校验（TODO: 从Redis获取验证码比对）
        
        // 查询用户
        LambdaQueryWrapper<User> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(User::getPhone, dto.getPhone());
        User user = userMapper.selectOne(wrapper);
        
        if (user == null) {
            throw new RuntimeException("用户不存在，请先注册");
        }
        
        if (user.getStatus() == 0) {
            throw new RuntimeException("账号已被禁用");
        }
        
        // 生成JWT token
        return jwtUtil.generateToken(user.getId(), user.getPhone());
    }
    
    @Override
    @Transactional
    public String register(RegisterDTO dto) {
        // 验证码校验
        
        // 检查手机号是否已注册
        LambdaQueryWrapper<User> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(User::getPhone, dto.getPhone());
        if (userMapper.selectCount(wrapper) > 0) {
            throw new RuntimeException("该手机号已注册");
        }
        
        // 创建用户
        User user = new User();
        user.setPhone(dto.getPhone());
        user.setPassword(dto.getPassword()); // 实际应加密存储
        user.setNickname("用户" + dto.getPhone().substring(7));
        user.setMemberLevel(0);
        user.setBalance(0.0);
        user.setStatus(1);
        user.setCreateTime(LocalDateTime.now());
        user.setUpdateTime(LocalDateTime.now());
        
        userMapper.insert(user);
        
        return jwtUtil.generateToken(user.getId(), user.getPhone());
    }
    
    @Override
    public UserVO getCurrentUser() {
        // TODO: 从JWT中获取用户ID，查询用户信息
        User user = new User(); // 示例
        user.setId(1L);
        user.setPhone("13800138000");
        user.setNickname("设计师用户");
        user.setMemberLevel(0);
        
        UserVO vo = new UserVO();
        vo.setId(user.getId());
        vo.setPhone(user.getPhone());
        vo.setNickname(user.getNickname());
        vo.setMemberLevel(user.getMemberLevel());
        vo.setMemberLevelName(getMemberLevelName(user.getMemberLevel()));
        
        return vo;
    }
    
    @Override
    public void updateUserInfo(UserVO userVO) {
        // TODO: 实现用户信息更新
    }
    
    @Override
    public void recharge(Double amount) {
        // TODO: 实现充值逻辑，对接支付平台
    }
    
    private String getMemberLevelName(Integer level) {
        switch (level) {
            case 1: return "月度会员";
            case 2: return "年度会员";
            case 3: return "永久会员";
            default: return "普通用户";
        }
    }
}