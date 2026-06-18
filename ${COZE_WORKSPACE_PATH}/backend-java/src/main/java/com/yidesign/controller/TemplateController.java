package com.yidesign.controller;

import com.yidesign.model.entity.DesignTemplate;
import com.yidesign.service.TemplateService;
import com.yidesign.utils.Result;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 模板控制器
 */
@Tag(name = "设计模板", description = "模板列表、分类、使用")
@RestController
@RequestMapping("/template")
@RequiredArgsConstructor
public class TemplateController {
    
    private final TemplateService templateService;
    
    @Operation(summary = "获取模板列表")
    @GetMapping("/list")
    public Result<List<DesignTemplate>> getTemplates(
            @RequestParam(required = false) String category,
            @RequestParam(defaultValue = "1") Integer page,
            @RequestParam(defaultValue = "20") Integer size) {
        List<DesignTemplate> list = templateService.getTemplates(category, page, size);
        return Result.success(list);
    }
    
    @Operation(summary = "获取模板详情")
    @GetMapping("/{id}")
    public Result<DesignTemplate> getTemplate(@PathVariable Long id) {
        DesignTemplate template = templateService.getTemplateById(id);
        return Result.success(template);
    }
    
    @Operation(summary = "使用模板创建设计")
    @PostMapping("/use/{id}")
    public Result<Long> useTemplate(@PathVariable Long id) {
        Long designId = templateService.useTemplate(id);
        return Result.success(designId);
    }
    
    @Operation(summary = "获取热门模板")
    @GetMapping("/hot")
    public Result<List<DesignTemplate>> getHotTemplates() {
        List<DesignTemplate> list = templateService.getHotTemplates();
        return Result.success(list);
    }
}