package com.yidesign.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.yidesign.mapper.DesignTemplateMapper;
import com.yidesign.model.dto.TemplateDTO;
import com.yidesign.model.dto.TemplateItemDTO;
import com.yidesign.model.entity.DesignTemplate;
import com.yidesign.service.TemplateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * 模板服务实现
 */
@Service
public class TemplateServiceImpl implements TemplateService {

    @Autowired
    private DesignTemplateMapper templateMapper;

    @Override
    public Map<String, Object> getTemplateList(String search, Integer page, Integer pageSize, Integer cate, Integer type) {
        QueryWrapper<DesignTemplate> wrapper = new QueryWrapper<>();
        
        // type=1 为组件列表
        if (type != null && type == 1) {
            wrapper.eq("type", 1); // 组件类型
        } else {
            // 模板列表（type=0 或 null）
            if (cate != null && cate > 0) {
                wrapper.eq("category_id", cate);
            }
            if (search != null && !search.isEmpty()) {
                wrapper.like("name", search);
            }
        }
        
        wrapper.eq("is_public", 1);
        wrapper.orderByDesc("created_at");
        
        int offset = (page - 1) * pageSize;
        wrapper.last("LIMIT " + offset + ", " + pageSize);
        
        List<DesignTemplate> templates = templateMapper.selectList(wrapper);
        
        // 转换为前端期望的字段名格式
        List<TemplateItemDTO> items = templates.stream().map(t -> {
            TemplateItemDTO item = new TemplateItemDTO();
            item.setId(t.getId());
            item.setTitle(t.getName());
            item.setCover(t.getPreviewUrl());
            item.setWidth(t.getWidth());
            item.setHeight(t.getHeight());
            item.setState(t.getIsPublic() != null ? t.getIsPublic() : 1);
            item.setThumb(t.getPreviewUrl());
            item.setData(t.getTemplateData());
            return item;
        }).collect(Collectors.toList());
        
        Map<String, Object> result = new HashMap<>();
        result.put("list", items);
        result.put("total", countTemplates(search, cate));
        return result;
    }

    @Override
    public Map<String, Object> getTemplateById(String id, Integer type) {
        DesignTemplate template = templateMapper.selectById(Long.parseLong(id));
        if (template == null) {
            return null;
        }
        
        // 转换为前端期望的字段名格式
        Map<String, Object> result = new HashMap<>();
        result.put("id", template.getId());
        result.put("title", template.getName());
        result.put("cover", template.getPreviewUrl());
        result.put("width", template.getWidth());
        result.put("height", template.getHeight());
        
        // 返回原始 JSON 字符串，前端会用 JSON.parse 解析
        result.put("data", template.getTemplateData() != null ? template.getTemplateData() : "[]");
        
        result.put("category", template.getCategoryId());
        result.put("state", template.getIsPublic());
        result.put("created_time", template.getCreatedAt());
        result.put("updated_time", template.getUpdatedAt());
        
        return result;
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