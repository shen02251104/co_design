package com.yidesign.service;

import com.yidesign.model.dto.TemplateDTO;
import org.springframework.web.multipart.MultipartFile;

/**
 * 设计服务接口 - 模板与素材管理
 */
public interface TemplateService {
    
    /**
     * 获取模板列表
     */
    TemplateDTO getTemplateList(String category, Integer page, Integer size);
    
    /**
     * 获取模板详情
     */
    TemplateDTO getTemplateById(String id, Integer type);
    
    /**
     * 保存模板
     */
    String saveTemplate(TemplateDTO template);
    
    /**
     * 获取素材列表
     */
    Object getMaterials(String type);
    
    /**
     * 获取图片素材
     */
    Object getPhotos(String keyword);
}