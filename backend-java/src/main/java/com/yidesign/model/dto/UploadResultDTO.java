package com.yidesign.model.dto;

import lombok.Data;

/**
 * 上传结果DTO
 */
@Data
public class UploadResultDTO {
    private String url;         // 文件访问URL
    private String filename;    // 文件名
    private Long size;          // 文件大小
    private String type;        // 文件类型
    private String id;          // 文件ID
}