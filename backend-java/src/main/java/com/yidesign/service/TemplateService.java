package com.yidesign.service;

import com.yidesign.model.dto.TemplateDTO;
import java.util.Map;
import org.springframework.web.multipart.MultipartFile;

/**
 * 设计服务接口 - 模板与素材管理
 */
public interface TemplateService {
    
    /**
     * 获取模板/组件列表
     * @param type 类型：1=组件，null/0=模板
     */
    Map<String, Object> getTemplateList(String search, Integer page, Integer pageSize, Integer cate, Integer type);
    
    /**
     * 获取模板详情
     */
    Map<String, Object> getTemplateById(String id, Integer type);
    
    /**
     * 保存模板
     */
    String saveTemplate(TemplateDTO template);
    
    /**
     * 获取素材列表
     */
    Object getMaterials(String cate);
    
    /**
     * 获取图片素材
     */
    Object getPhotos(String cate, Integer page, Integer pageSize);
}