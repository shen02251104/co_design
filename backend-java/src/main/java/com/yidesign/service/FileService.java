package com.yidesign.service;

import com.yidesign.model.dto.UploadResultDTO;
import org.springframework.web.multipart.MultipartFile;

/**
 * 文件服务接口
 */
public interface FileService {
    
    /**
     * 上传图片
     */
    UploadResultDTO uploadImage(MultipartFile file, String userId) throws Exception;
    
    /**
     * 获取用户上传的图片列表
     */
    Object getUserImages(String userId);
}