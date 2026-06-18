package com.yidesign.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.yidesign.mapper.DesignTemplateMapper;
import com.yidesign.model.dto.TemplateDTO;
import com.yidesign.model.entity.DesignTemplate;
import com.yidesign.service.TemplateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 模板服务实现
 */
@Service
public class TemplateServiceImpl implements TemplateService {

    @Autowired
    private DesignTemplateMapper templateMapper;

    @Override
    public TemplateDTO getTemplateList(String category, Integer page, Integer size) {
        QueryWrapper<DesignTemplate> wrapper = new QueryWrapper<>();
        if (category != null && !category.isEmpty()) {
            wrapper.eq("category", category);
        }
        wrapper.eq("status", 1);
        wrapper.orderByDesc("create_time");
        
        int offset = (page - 1) * size;
        wrapper.last("LIMIT " + offset + ", " + size);
        
        List<DesignTemplate> templates = templateMapper.selectList(wrapper);
        
        TemplateDTO dto = new TemplateDTO();
        dto.setList(templates);
        dto.setTotal(countTemplates(category));
        dto.setPage(page);
        dto.setSize(size);
        return dto;
    }

    @Override
    public TemplateDTO getTemplateById(String id, Integer type) {
        DesignTemplate template = templateMapper.selectById(Long.parseLong(id));
        TemplateDTO dto = new TemplateDTO();
        dto.setTemplate(template);
        return dto;
    }

    @Override
    public String saveTemplate(TemplateDTO template) {
        DesignTemplate entity = template.getTemplate();
        if (entity == null) {
            entity = new DesignTemplate();
        }
        // 从DTO中提取数据设置到entity
        if (template.getTitle() != null) {
            entity.setTitle(template.getTitle());
        }
        if (template.getCategory() != null) {
            entity.setCategory(template.getCategory());
        }
        if (template.getThumb() != null) {
            entity.setThumb(template.getThumb());
        }
        if (template.getContent() != null) {
            entity.setContent(template.getContent());
        }
        entity.setStatus(1);
        
        templateMapper.insert(entity);
        return entity.getId().toString();
    }

    @Override
    public Object getMaterials(String type) {
        // 返回素材数据，这里暂时返回空列表
        Map<String, Object> result = new HashMap<>();
        result.put("list", new ArrayList<>());
        result.put("total", 0);
        return result;
    }

    @Override
    public Object getPhotos(String keyword) {
        // 返回图片素材，这里暂时返回空列表
        Map<String, Object> result = new HashMap<>();
        result.put("list", new ArrayList<>());
        result.put("total", 0);
        return result;
    }

    private long countTemplates(String category) {
        QueryWrapper<DesignTemplate> wrapper = new QueryWrapper<>();
        if (category != null && !category.isEmpty()) {
            wrapper.eq("category", category);
        }
        wrapper.eq("status", 1);
        return templateMapper.selectCount(wrapper);
    }
}