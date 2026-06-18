package com.yidesign.controller;

import com.yidesign.model.dto.LoginDTO;
import com.yidesign.model.dto.RegisterDTO;
import com.yidesign.model.vo.UserVO;
import com.yidesign.service.UserService;
import com.yidesign.utils.JwtUtil;
import com.yidesign.utils.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * 用户控制器
 */
@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService userService;

    /**
     * 用户登录
     */
    @PostMapping("/login")
    public Result<UserVO> login(@RequestBody LoginDTO loginDTO) {
        try {
            UserVO userVO = userService.login(loginDTO);
            return Result.success(userVO);
        } catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }

    /**
     * 用户注册
     */
    @PostMapping("/register")
    public Result<UserVO> register(@RequestBody RegisterDTO registerDTO) {
        try {
            UserVO userVO = userService.register(registerDTO);
            return Result.success(userVO);
        } catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }

    /**
     * 获取用户信息
     */
    @GetMapping("/info")
    public Result<UserVO> getUserInfo(@RequestHeader(value = "Authorization", required = false) String token) {
        try {
            if (token == null || token.isEmpty()) {
                return Result.error("未登录");
            }
            
            Long userId = JwtUtil.getUserIdFromToken(token.replace("Bearer ", ""));
            if (userId == null) {
                return Result.error("token无效");
            }
            
            UserVO vo = new UserVO();
            // 可以根据userId查询用户信息返回
            return Result.success(vo);
        } catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }

    /**
     * 检查手机号是否存在
     */
    @GetMapping("/check-phone")
    public Result<Boolean> checkPhone(@RequestParam String phone) {
        boolean exists = userService.checkPhoneExists(phone);
        return Result.success(exists);
    }

    /**
     * 检查邮箱是否存在
     */
    @GetMapping("/check-email")
    public Result<Boolean> checkEmail(@RequestParam String email) {
        boolean exists = userService.checkEmailExists(email);
        return Result.success(exists);
    }
}