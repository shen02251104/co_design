package com.yidesign.model.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

/**
 * 素材实体类
 */
@Data
@TableName("material")
public class Material {
    @TableId(type = IdType.AUTO)
    private Long id;
    
    @TableField("category_id")
    private Long categoryId;
    
    private String name;
    
    private String url;
    
    @TableField("thumbnail_url")
    private String thumbnailUrl;
    
    private String type;  // image, svg, mask
    
    private Integer width;
    
    private Integer height;
    
    @TableField("is_free")
    private Integer isFree;
    
    @TableField("created_at")
    private java.time.LocalDateTime createdAt;
}