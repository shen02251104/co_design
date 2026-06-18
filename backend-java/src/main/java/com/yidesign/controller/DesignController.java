package com.yidesign.controller;

import com.yidesign.model.dto.ScreenshotDTO;
import com.yidesign.model.dto.TemplateDTO;
import com.yidesign.model.dto.UploadResultDTO;
import com.yidesign.service.ScreenshotService;
import com.yidesign.service.TemplateService;
import com.yidesign.service.FileService;
import com.yidesign.utils.Result;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import jakarta.servlet.http.HttpServletResponse;
import java.io.FileInputStream;
import java.io.OutputStream;

/**
 * 设计控制器 - 替代原 Node.js Express 后端
 * 
 * API 对照：
 * - /api/screenshots -> screenshots()
 * - /api/printscreen -> printscreen()
 * - /api/file/upload -> upload()
 * - /design/list -> getTemplates()
 * - /design/temp -> getTemplateDetail()
 * - /design/material -> getMaterials()
 * - /design/imgs -> getPhotos()
 * - /design/edit -> saveTemplate()
 */
@Tag(name = "设计器接口", description = "海报设计器相关API，替代迅排设计 Node.js 后端")
@RestController
@RequestMapping("/api")
public class DesignController {

    @Autowired
    private ScreenshotService screenshotService;

    @Autowired
    private TemplateService templateService;

    @Autowired
    private FileService fileService;

    /**
     * 截图接口 - 使用 Playwright Java 替代 Puppeteer
     */
    @Operation(summary = "截图生成", description = "使用 Playwright Java 截取设计页面生成图片")
    @GetMapping("/screenshots")
    public void screenshots(
            @Parameter(description = "作品ID") @RequestParam(required = false) String id,
            @Parameter(description = "模板ID") @RequestParam(required = false) String tempid,
            @Parameter(description = "模板类型") @RequestParam(required = false, defaultValue = "0") Integer tempType,
            @Parameter(description = "视窗宽度") @RequestParam Integer width,
            @Parameter(description = "视窗高度") @RequestParam Integer height,
            @Parameter(description = "返回类型") @RequestParam(required = false, defaultValue = "file") String type,
            @Parameter(description = "缩放尺寸") @RequestParam(required = false) Integer size,
            @Parameter(description = "图片质量") @RequestParam(required = false, defaultValue = "80") Integer quality,
            @Parameter(description = "画板索引") @RequestParam(required = false, defaultValue = "0") Integer index,
            HttpServletResponse response
    ) {
        try {
            String targetId = id != null ? id : tempid;
            if (targetId == null || width == null || height == null) {
                response.setContentType("application/json");
                response.getWriter().write("{\"code\":500,\"msg\":\"缺少参数\"}");
                return;
            }

            ScreenshotDTO dto = new ScreenshotDTO();
            dto.setId(targetId);
            dto.setTempType(tempType);
            dto.setWidth(width);
            dto.setHeight(height);
            dto.setType(type);
            dto.setSize(size);
            dto.setQuality(quality);
            dto.setIndex(index);

            String imagePath = screenshotService.generateScreenshot(dto);
            
            if ("file".equals(type)) {
                response.setContentType("image/png");
                FileInputStream fis = new FileInputStream(imagePath);
                OutputStream os = response.getOutputStream();
                byte[] buffer = new byte[1024];
                int len;
                while ((len = fis.read(buffer)) != -1) {
                    os.write(buffer, 0, len);
                }
                fis.close();
                os.flush();
            } else {
                response.setContentType("application/json");
                response.getWriter().write("{\"code\":200,\"data\":{\"path\":\"" + imagePath + "\"}}");
            }
        } catch (Exception e) {
            try {
                response.setContentType("application/json");
                response.getWriter().write("{\"code\":500,\"msg\":\"图片生成错误\"}");
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }
    }

    @Operation(summary = "全屏网页截图", description = "截取任意网页生成图片")
    @GetMapping("/printscreen")
    public Result<ScreenshotDTO> printscreen(
            @Parameter(description = "目标URL") @RequestParam String url,
            @Parameter(description = "视窗宽度") @RequestParam(required = false, defaultValue = "375") Integer width,
            @Parameter(description = "视窗高度") @RequestParam(required = false, defaultValue = "0") Integer height,
            @Parameter(description = "返回类型") @RequestParam(required = false, defaultValue = "file") String type,
            @Parameter(description = "缩放尺寸") @RequestParam(required = false) Integer size,
            @Parameter(description = "图片质量") @RequestParam(required = false, defaultValue = "75") Integer quality,
            @Parameter(description = "等待时间ms") @RequestParam(required = false, defaultValue = "0") Long wait
    ) {
        try {
            ScreenshotDTO dto = new ScreenshotDTO();
            dto.setUrl(url);
            dto.setWidth(width);
            dto.setHeight(height);
            dto.setType(type);
            dto.setSize(size);
            dto.setQuality(quality);
            dto.setWait(wait);

            String imagePath = screenshotService.generatePrintscreen(dto);
            dto.setPath(imagePath);
            
            return Result.success(dto);
        } catch (Exception e) {
            return Result.error("截图失败: " + e.getMessage());
        }
    }

    @Operation(summary = "文件上传", description = "上传图片素材")
    @PostMapping("/file/upload")
    public Result<UploadResultDTO> upload(
            @Parameter(description = "上传文件") @RequestParam("file") MultipartFile file,
            @Parameter(description = "用户ID") @RequestParam(required = false) String userId
    ) {
        try {
            String filePath = fileService.uploadFile(file);
            UploadResultDTO result = new UploadResultDTO();
            result.setUrl(fileService.getFileUrl(filePath));
            result.setFilename(file.getOriginalFilename());
            result.setSize(file.getSize());
            result.setType(file.getContentType());
            result.setId(filePath);
            return Result.success(result);
        } catch (Exception e) {
            return Result.error("上传失败: " + e.getMessage());
        }
    }

    @Operation(summary = "模板列表", description = "获取设计模板列表")
    @GetMapping("/design/list")
    public Result<TemplateDTO> getTemplates(
            @Parameter(description = "分类") @RequestParam(required = false) String category,
            @Parameter(description = "页码") @RequestParam(required = false, defaultValue = "1") Integer page,
            @Parameter(description = "每页数量") @RequestParam(required = false, defaultValue = "20") Integer size
    ) {
        try {
            return Result.success(templateService.getTemplateList(category, page, size));
        } catch (Exception e) {
            return Result.error("获取模板失败: " + e.getMessage());
        }
    }

    @Operation(summary = "模板详情", description = "获取单个模板详细信息")
    @GetMapping("/design/temp")
    public Result<TemplateDTO> getTemplateDetail(
            @Parameter(description = "模板ID") @RequestParam String id,
            @Parameter(description = "模板类型") @RequestParam(required = false, defaultValue = "0") Integer type
    ) {
        try {
            return Result.success(templateService.getTemplateById(id, type));
        } catch (Exception e) {
            return Result.error("获取模板失败: " + e.getMessage());
        }
    }

    @Operation(summary = "素材列表", description = "获取设计素材")
    @GetMapping("/design/material")
    public Result<Object> getMaterials(
            @Parameter(description = "素材类型") @RequestParam(required = false) String type
    ) {
        try {
            return Result.success(templateService.getMaterials(type));
        } catch (Exception e) {
            return Result.error("获取素材失败: " + e.getMessage());
        }
    }

    @Operation(summary = "图片素材", description = "获取图片类素材")
    @GetMapping("/design/imgs")
    public Result<Object> getPhotos(
            @Parameter(description = "搜索关键词") @RequestParam(required = false) String keyword
    ) {
        try {
            return Result.success(templateService.getPhotos(keyword));
        } catch (Exception e) {
            return Result.error("获取图片失败: " + e.getMessage());
        }
    }

    @Operation(summary = "保存设计", description = "保存用户设计作品")
    @PostMapping("/design/edit")
    public Result<String> saveTemplate(
            @Parameter(description = "模板数据") @RequestBody TemplateDTO template
    ) {
        try {
            String savedId = templateService.saveTemplate(template);
            return Result.success(savedId, "保存成功");
        } catch (Exception e) {
            return Result.error("保存失败: " + e.getMessage());
        }
    }

    @Operation(summary = "用户图片", description = "获取用户上传的图片列表")
    @GetMapping("/design/user/image")
    public Result<Object> getUserImages(
            @Parameter(description = "用户ID") @RequestParam String userId
    ) {
        try {
            return Result.success(fileService.getUserImages(userId));
        } catch (Exception e) {
            return Result.error("获取图片失败: " + e.getMessage());
        }
    }
}