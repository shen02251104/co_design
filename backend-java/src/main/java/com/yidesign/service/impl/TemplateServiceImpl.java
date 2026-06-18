package com.yidesign.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.yidesign.mapper.DesignTemplateMapper;
import com.yidesign.model.entity.DesignTemplate;
import com.yidesign.service.TemplateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 模板服务实现
 */
@Service
public class TemplateServiceImpl implements TemplateService {

    @Autowired
    private DesignTemplateMapper templateMapper;

    @Override
    public List<DesignTemplate> getTemplateList(String category, Integer page, Integer size) {
        QueryWrapper<DesignTemplate> wrapper = new QueryWrapper<>();
        if (category != null && !category.isEmpty()) {
            wrapper.eq("category", category);
        }
        wrapper.eq("status", 1);
        wrapper.orderByDesc("create_time");
        
        int offset = (page - 1) * size;
        wrapper.last("LIMIT " + offset + ", " + size);
        
        return templateMapper.selectList(wrapper);
    }

    @Override
    public DesignTemplate getTemplateById(Long id) {
        return templateMapper.selectById(id);
    }

    @Override
    public boolean saveTemplate(DesignTemplate template) {
        return templateMapper.insert(template) > 0;
    }

    @Override
    public boolean updateTemplate(DesignTemplate template) {
        return templateMapper.updateById(template) > 0;
    }

    @Override
    public int countTemplates(String category) {
        QueryWrapper<DesignTemplate> wrapper = new QueryWrapper<>();
        if (category != null && !category.isEmpty()) {
            wrapper.eq("category", category);
        }
        wrapper.eq("status", 1);
        return Math.toIntExact(templateMapper.selectCount(wrapper));
    }
}