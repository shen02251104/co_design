package com.yidesign.controller;

import com.yidesign.model.dto.LoginDTO;
import com.yidesign.model.dto.RegisterDTO;
import com.yidesign.model.vo.UserVO;
import com.yidesign.service.UserService;
import com.yidesign.utils.Result;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

/**
 * 用户控制器
 */
@Tag(name = "用户管理", description = "用户登录、注册、信息管理")
@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
    
    private final UserService userService;
    
    @Operation(summary = "发送验证码")
    @PostMapping("/send-code")
    public Result<Void> sendCode(@RequestParam String phone) {
        userService.sendCode(phone);
        return Result.success();
    }
    
    @Operation(summary = "用户登录")
    @PostMapping("/login")
    public Result<String> login(@Valid @RequestBody LoginDTO dto) {
        String token = userService.login(dto);
        return Result.success(token);
    }
    
    @Operation(summary = "用户注册")
    @PostMapping("/register")
    public Result<String> register(@Valid @RequestBody RegisterDTO dto) {
        String token = userService.register(dto);
        return Result.success(token);
    }
    
    @Operation(summary = "获取用户信息")
    @GetMapping("/info")
    public Result<UserVO> getUserInfo() {
        UserVO user = userService.getCurrentUser();
        return Result.success(user);
    }
    
    @Operation(summary = "更新用户信息")
    @PutMapping("/info")
    public Result<Void> updateUserInfo(@RequestBody UserVO userVO) {
        userService.updateUserInfo(userVO);
        return Result.success();
    }
    
    @Operation(summary = "会员充值")
    @PostMapping("/recharge")
    public Result<Void> recharge(@RequestParam Double amount) {
        userService.recharge(amount);
        return Result.success();
    }
}