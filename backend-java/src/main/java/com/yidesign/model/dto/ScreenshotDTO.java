package com.yidesign.model.dto;

import lombok.Data;

/**
 * 截图请求DTO
 */
@Data
public class ScreenshotDTO {
    private String id;          // 作品ID
    private String tempid;      // 模板ID
    private Integer tempType;   // 模板类型
    private String url;         // 目标URL
    private Integer width;      // 视窗宽度
    private Integer height;     // 视窗高度
    private String type;        // 返回类型: file/cover
    private Integer size;       // 缩放尺寸
    private Integer quality;    // 图片质量
    private Integer index;      // 画板索引
    private Long wait;          // 等待时间ms
    private String path;        // 生成的图片路径
    private String thumbPath;   // 封面路径
}