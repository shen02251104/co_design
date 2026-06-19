package com.yidesign.model.dto;

import lombok.Data;

/**
 * 模板列表项DTO - 字段名匹配迅排设计前端期望
 */
@Data
public class TemplateItemDTO {
    private Long id;            // 模板ID
    private String title;       // 模板名称（前端期望title）
    private String cover;       // 封面URL（前端期望cover）
    private String url;         // 图片URL（前端期望url，与cover相同）
    private Integer width;      // 宽度
    private Integer height;     // 高度
    private Integer state;      // 状态（前端期望state）
    private String thumb;       // 缩略图URL
    private String data;        // 设计数据JSON（模板详情）
}