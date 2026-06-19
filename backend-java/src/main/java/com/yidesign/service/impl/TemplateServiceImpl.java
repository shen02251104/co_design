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
    public TemplateDTO getTemplateList(String search, Integer page, Integer pageSize, Integer cate) {
        QueryWrapper<DesignTemplate> wrapper = new QueryWrapper<>();
        if (cate != null && cate > 0) {
            wrapper.eq("category_id", cate);
        }
        if (search != null && !search.isEmpty()) {
            wrapper.like("name", search);
        }
        wrapper.eq("is_public", 1);
        wrapper.orderByDesc("created_at");
        
        int offset = (page - 1) * pageSize;
        wrapper.last("LIMIT " + offset + ", " + pageSize);
        
        List<DesignTemplate> templates = templateMapper.selectList(wrapper);
        
        TemplateDTO dto = new TemplateDTO();
        dto.setList(templates);
        dto.setTotal(countTemplates(search, cate));
        dto.setPage(page);
        dto.setSize(pageSize);
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
            entity.setName(template.getTitle());
        }
        if (template.getCategory() != null) {
            entity.setCategoryId(Long.parseLong(template.getCategory()));
        }
        if (template.getThumb() != null) {
            entity.setPreviewUrl(template.getThumb());
        }
        if (template.getContent() != null) {
            entity.setTemplateData(template.getContent());
        }
        entity.setIsPublic(1);
        
        templateMapper.insert(entity);
        return entity.getId().toString();
    }

    @Override
    public Object getMaterials(String cate) {
        // 返回素材数据，这里暂时返回空列表
        Map<String, Object> result = new HashMap<>();
        result.put("list", new ArrayList<>());
        result.put("total", 0);
        return result;
    }

    @Override
    public Object getPhotos(String cate, Integer page, Integer pageSize) {
        // 返回图片素材，这里暂时返回空列表
        Map<String, Object> result = new HashMap<>();
        result.put("list", new ArrayList<>());
        result.put("total", 0);
        return result;
    }

    private long countTemplates(String search, Integer cate) {
        QueryWrapper<DesignTemplate> wrapper = new QueryWrapper<>();
        if (cate != null && cate > 0) {
            wrapper.eq("category_id", cate);
        }
        if (search != null && !search.isEmpty()) {
            wrapper.like("name", search);
        }
        wrapper.eq("is_public", 1);
        return templateMapper.selectCount(wrapper);
    }
}