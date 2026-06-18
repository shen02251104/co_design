package com.yidesign.service;

import org.springframework.web.multipart.MultipartFile;

/**
 * 文件服务接口
 */
public interface FileService {
    
    /**
     * 上传文件
     */
    String uploadFile(MultipartFile file) throws Exception;
    
    /**
     * 上传文件（指定分类）
     */
    String uploadFile(MultipartFile file, String category) throws Exception;
    
    /**
     * 删除文件
     */
    boolean deleteFile(String filePath);
    
    /**
     * 获取文件字节
     */
    byte[] getFileBytes(String filePath) throws Exception;
    
    /**
     * 获取文件URL
     */
    String getFileUrl(String filePath);
}