package com.yidesign.controller;

import com.yidesign.model.entity.DesignWork;
import com.yidesign.service.DesignService;
import com.yidesign.utils.Result;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 设计作品控制器
 */
@Tag(name = "设计作品", description = "设计作品管理、保存、导出")
@RestController
@RequestMapping("/design")
@RequiredArgsConstructor
public class DesignController {
    
    private final DesignService designService;
    
    @Operation(summary = "保存设计作品")
    @PostMapping("/save")
    public Result<Long> saveDesign(@RequestBody DesignWork work) {
        Long id = designService.saveDesign(work);
        return Result.success(id);
    }
    
    @Operation(summary = "获取我的设计列表")
    @GetMapping("/list")
    public Result<List<DesignWork>> getMyDesigns() {
        List<DesignWork> list = designService.getMyDesigns();
        return Result.success(list);
    }
    
    @Operation(summary = "获取设计详情")
    @GetMapping("/{id}")
    public Result<DesignWork> getDesign(@PathVariable Long id) {
        DesignWork work = designService.getDesignById(id);
        return Result.success(work);
    }
    
    @Operation(summary = "删除设计作品")
    @DeleteMapping("/{id}")
    public Result<Void> deleteDesign(@PathVariable Long id) {
        designService.deleteDesign(id);
        return Result.success();
    }
    
    @Operation(summary = "复制设计作品")
    @PostMapping("/copy/{id}")
    public Result<Long> copyDesign(@PathVariable Long id) {
        Long newId = designService.copyDesign(id);
        return Result.success(newId);
    }
}