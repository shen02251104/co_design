package com.yidesign.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.yidesign.mapper.UserMapper;
import com.yidesign.model.dto.LoginDTO;
import com.yidesign.model.dto.RegisterDTO;
import com.yidesign.model.entity.User;
import com.yidesign.model.vo.UserVO;
import com.yidesign.service.UserService;
import com.yidesign.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;

import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;

/**
 * 用户服务实现
 */
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;
    
    @Autowired
    private JwtUtil jwtUtil;

    @Override
    public UserVO login(LoginDTO loginDTO) {
        User user = null;
        
        // 根据登录方式判断
        if (loginDTO.getPhone() != null && !loginDTO.getPhone().isEmpty()) {
            user = getUserByPhone(loginDTO.getPhone());
        } else if (loginDTO.getEmail() != null && !loginDTO.getEmail().isEmpty()) {
            user = getUserByEmail(loginDTO.getEmail());
        }
        
        if (user == null) {
            throw new RuntimeException("用户不存在");
        }
        
        // 验证密码
        if (loginDTO.getPassword() != null && !loginDTO.getPassword().isEmpty()) {
            String md5Password = DigestUtils.md5DigestAsHex(loginDTO.getPassword().getBytes(StandardCharsets.UTF_8));
            if (!user.getPassword().equals(md5Password)) {
                throw new RuntimeException("密码错误");
            }
        }
        
        // 生成token
        String token = jwtUtil.generateToken(user.getId(), user.getUsername());
        
        UserVO vo = new UserVO();
        vo.setId(user.getId());
        vo.setNickname(user.getNickname());
        vo.setPhone(user.getPhone());
        vo.setEmail(user.getEmail());
        vo.setAvatar(user.getAvatar());
        vo.setVipLevel(user.getVipLevel());
        vo.setToken(token);
        
        return vo;
    }

    @Override
    public UserVO register(RegisterDTO registerDTO) {
        // 检查是否已存在
        if (registerDTO.getPhone() != null && checkPhoneExists(registerDTO.getPhone())) {
            throw new RuntimeException("手机号已注册");
        }
        if (registerDTO.getEmail() != null && checkEmailExists(registerDTO.getEmail())) {
            throw new RuntimeException("邮箱已注册");
        }
        
        User user = new User();
        user.setNickname(registerDTO.getNickname());
        user.setPhone(registerDTO.getPhone());
        user.setEmail(registerDTO.getEmail());
        
        // MD5加密密码
        if (registerDTO.getPassword() != null) {
            String md5Password = DigestUtils.md5DigestAsHex(registerDTO.getPassword().getBytes(StandardCharsets.UTF_8));
            user.setPassword(md5Password);
        }
        
        user.setVipLevel(0);
        user.setStatus(1);
        user.setCreateTime(LocalDateTime.now());
        user.setUpdateTime(LocalDateTime.now());
        
        userMapper.insert(user);
        
        // 生成token
        String token = jwtUtil.generateToken(user.getId(), user.getUsername());
        
        UserVO vo = new UserVO();
        vo.setId(user.getId());
        vo.setNickname(user.getNickname());
        vo.setPhone(user.getPhone());
        vo.setEmail(user.getEmail());
        vo.setVipLevel(user.getVipLevel());
        vo.setToken(token);
        
        return vo;
    }

    @Override
    public User getUserById(Long id) {
        return userMapper.selectById(id);
    }

    @Override
    public User getUserByPhone(String phone) {
        QueryWrapper<User> wrapper = new QueryWrapper<>();
        wrapper.eq("phone", phone);
        return userMapper.selectOne(wrapper);
    }

    @Override
    public User getUserByEmail(String email) {
        QueryWrapper<User> wrapper = new QueryWrapper<>();
        wrapper.eq("email", email);
        return userMapper.selectOne(wrapper);
    }

    @Override
    public boolean updateUser(User user) {
        user.setUpdateTime(LocalDateTime.now());
        return userMapper.updateById(user) > 0;
    }

    @Override
    public boolean checkPhoneExists(String phone) {
        QueryWrapper<User> wrapper = new QueryWrapper<>();
        wrapper.eq("phone", phone);
        return userMapper.selectCount(wrapper) > 0;
    }

    @Override
    public boolean checkEmailExists(String email) {
        QueryWrapper<User> wrapper = new QueryWrapper<>();
        wrapper.eq("email", email);
        return userMapper.selectCount(wrapper) > 0;
    }
}