package com.yidesign.model.dto;

import lombok.Data;
import java.util.List;

/**
 * 模板DTO
 */
@Data
public class TemplateDTO {
    private String id;              // 模板ID
    private String name;            // 模板名称
    private String category;        // 分类
    private String thumbnail;       // 缩略图
    private Integer width;          // 宽度
    private Integer height;         // 高度
    private String data;            // 设计数据JSON
    private String userId;          // 创建者ID
    private Integer type;           // 类型: 0模板 1组件
    private Integer downloadCount;  // 下载次数
    private Long createTime;        // 创建时间
    private Long updateTime;        // 更新时间
    
    // 列表返回时使用
    private List<TemplateDTO> list;
    private Integer total;
    private Integer page;
    private Integer size;
}