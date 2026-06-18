package com.yidesign.service.impl;

import com.yidesign.service.FileService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

/**
 * 文件服务实现
 */
@Service
public class FileServiceImpl implements FileService {

    @Value("${file.upload.path:/tmp/uploads}")
    private String uploadPath;

    @Value("${file.upload.max-size:10485760}")
    private long maxFileSize;

    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyyMMdd");

    @Override
    public String uploadFile(MultipartFile file) throws IOException {
        if (file == null || file.isEmpty()) {
            throw new IOException("文件不能为空");
        }

        if (file.getSize() > maxFileSize) {
            throw new IOException("文件大小超过限制");
        }

        // 创建日期目录
        String dateDir = LocalDateTime.now().format(DATE_FORMATTER);
        Path dirPath = Paths.get(uploadPath, dateDir);
        if (!Files.exists(dirPath)) {
            Files.createDirectories(dirPath);
        }

        // 生成文件名
        String originalFilename = file.getOriginalFilename();
        String extension = "";
        if (originalFilename != null && originalFilename.contains(".")) {
            extension = originalFilename.substring(originalFilename.lastIndexOf("."));
        }
        String newFilename = UUID.randomUUID().toString() + extension;

        // 保存文件
        Path filePath = dirPath.resolve(newFilename);
        file.transferTo(filePath.toFile());

        return dateDir + "/" + newFilename;
    }

    @Override
    public String uploadFile(MultipartFile file, String category) throws IOException {
        Path dirPath = Paths.get(uploadPath, category);
        if (!Files.exists(dirPath)) {
            Files.createDirectories(dirPath);
        }

        String originalFilename = file.getOriginalFilename();
        String extension = "";
        if (originalFilename != null && originalFilename.contains(".")) {
            extension = originalFilename.substring(originalFilename.lastIndexOf("."));
        }
        String newFilename = UUID.randomUUID().toString() + extension;

        Path filePath = dirPath.resolve(newFilename);
        file.transferTo(filePath.toFile());

        return category + "/" + newFilename;
    }

    @Override
    public boolean deleteFile(String filePath) {
        Path path = Paths.get(uploadPath, filePath);
        try {
            return Files.deleteIfExists(path);
        } catch (IOException e) {
            return false;
        }
    }

    @Override
    public byte[] getFileBytes(String filePath) throws IOException {
        Path path = Paths.get(uploadPath, filePath);
        return Files.readAllBytes(path);
    }

    @Override
    public String getFileUrl(String filePath) {
        return "/api/design/file/" + filePath;
    }
}