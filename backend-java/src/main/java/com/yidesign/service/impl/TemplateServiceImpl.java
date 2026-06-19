package com.yidesign.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.yidesign.mapper.DesignTemplateMapper;
import com.yidesign.mapper.MaterialMapper;
import com.yidesign.model.dto.TemplateDTO;
import com.yidesign.model.dto.TemplateItemDTO;
import com.yidesign.model.entity.DesignTemplate;
import com.yidesign.model.entity.Material;
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

    @Autowired
    private MaterialMapper materialMapper;

    @Override
    public Map<String, Object> getTemplateList(String search, Integer page, Integer pageSize, Integer cate, Integer type) {
        QueryWrapper<DesignTemplate> wrapper = new QueryWrapper<>();
        
        // type=1 为组件列表，返回模拟数据（文字模板等）
        if (type != null && type == 1) {
            String cateStr = (cate != null) ? String.valueOf(cate) : "";
            return getMockComponentList(cateStr);
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
            item.setUrl(t.getPreviewUrl());  // url 与 cover 相同
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
        // 查询素材数据库
        QueryWrapper<Material> wrapper = new QueryWrapper<>();
        if (cate != null && !cate.isEmpty()) {
            wrapper.eq("type", cate);
        }
        List<Material> materials = materialMapper.selectList(wrapper);
        
        // 转换为前端期望的格式
        List<Map<String, Object>> list = materials.stream().map(m -> {
            Map<String, Object> item = new HashMap<>();
            item.put("id", m.getId());
            item.put("url", m.getUrl());
            item.put("thumb", m.getThumbnailUrl());
            item.put("width", m.getWidth());
            item.put("height", m.getHeight());
            item.put("title", m.getName());
            return item;
        }).collect(Collectors.toList());
        
        Map<String, Object> result = new HashMap<>();
        result.put("list", list);
        result.put("total", materials.size());
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
    
    /**
     * 返回模拟的组件数据（文字模板、组合模板等）
     * type=1 表示组件列表
     */
    private Object getMockComponentList(String cate) {
        List<Map<String, Object>> list = new ArrayList<>();
        
        // 根据分类返回不同的组件
        if ("text".equals(cate)) {
            // 文字组件
            for (int i = 1; i <= 5; i++) {
                Map<String, Object> item = new HashMap<>();
                item.put("id", 100 + i);
                item.put("title", "文字模板" + i);
                item.put("cover", "https://via.placeholder.com/200x100?text=Text+" + i);
                item.put("url", "https://via.placeholder.com/200x100?text=Text+" + i);
                item.put("width", 200);
                item.put("height", 100);
                item.put("state", 1);
                // 组件数据格式
                item.put("data", "[{\"global\":{\"width\":200,\"height\":100,\"backgroundColor\":\"#ffffff\"},\"layers\":[{\"type\":\"text\",\"text\":\"文字模板" + i + "\",\"left\":10,\"top\":10,\"width\":180,\"height\":80,\"fontSize\":24,\"color\":\"#333333\"}]}]");
                list.add(item);
            }
        } else if ("svg".equals(cate)) {
            // SVG组件
            for (int i = 1; i <= 3; i++) {
                Map<String, Object> item = new HashMap<>();
                item.put("id", 200 + i);
                item.put("title", "图形" + i);
                item.put("cover", "https://via.placeholder.com/100x100?text=SVG+" + i);
                item.put("url", "https://via.placeholder.com/100x100?text=SVG+" + i);
                item.put("width", 100);
                item.put("height", 100);
                item.put("state", 1);
                item.put("data", "[{\"global\":{\"width\":100,\"height\":100,\"backgroundColor\":\"#ffffff\"},\"layers\":[{\"type\":\"rect\",\"left\":0,\"top\":0,\"width\":100,\"height\":100,\"fill\":\"#" + String.format("%06x", i * 111111) + "\"}]}]");
                list.add(item);
            }
        } else {
            // 默认返回一些组合组件
            for (int i = 1; i <= 3; i++) {
                Map<String, Object> item = new HashMap<>();
                item.put("id", 300 + i);
                item.put("title", "组合模板" + i);
                item.put("cover", "https://via.placeholder.com/200x200?text=Combo+" + i);
                item.put("url", "https://via.placeholder.com/200x200?text=Combo+" + i);
                item.put("width", 200);
                item.put("height", 200);
                item.put("state", 1);
                list.add(item);
            }
        }
        
        Map<String, Object> result = new HashMap<>();
        result.put("list", list);
        result.put("total", list.size());
        return result;
    }
}