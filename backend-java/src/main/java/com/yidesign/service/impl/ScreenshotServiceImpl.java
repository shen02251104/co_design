package com.yidesign.service.impl;

import com.microsoft.playwright.*;
import com.microsoft.playwright.options.LoadState;
import com.yidesign.model.dto.ScreenshotDTO;
import com.yidesign.service.ScreenshotService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.nio.file.Paths;
import java.util.UUID;

/**
 * 截图服务实现 - 使用 Playwright Java 替代 Puppeteer
 * 
 * Playwright 是 Microsoft 开发的跨浏览器自动化工具，
 * Java 版本提供了与 Puppeteer 类似的功能，支持 Chromium、Firefox、WebKit
 */
@Service
public class ScreenshotServiceImpl implements ScreenshotService {

    @Value("${screenshot.storage-path:/tmp/screenshots}")
    private String storagePath;

    @Value("${screenshot.draw-link:http://localhost:5000/designer}")
    private String drawLink;

    private Playwright playwright;
    private Browser browser;

    /**
     * 初始化 Playwright 浏览器
     */
    private void initBrowser() {
        if (playwright == null) {
            playwright = Playwright.create();
            browser = playwright.chromium().launch(
                new BrowserType.LaunchOptions()
                    .setHeadless(true)
            );
        }
    }

    /**
     * 生成截图 - 对应迅排的 screenshots 接口
     */
    @Override
    public String generateScreenshot(ScreenshotDTO dto) throws Exception {
        initBrowser();
        
        // 构建目标URL
        String targetUrl = drawLink + "?id=" + dto.getId();
        if (dto.getTempType() != null && dto.getTempType() == 1) {
            targetUrl = drawLink + "?tempid=" + dto.getId() + "&tempType=1";
        }
        if (dto.getIndex() != null) {
            targetUrl += "&index=" + dto.getIndex();
        }

        // 创建浏览器上下文
        BrowserContext context = browser.newContext(
            new Browser.NewContextOptions()
                .setViewportSize(dto.getWidth(), dto.getHeight())
        );
        Page page = context.newPage();

        try {
            // 打开页面并等待加载
            page.navigate(targetUrl);
            page.waitForLoadState(LoadState.NETWORKIDLE);
            
            // 等待额外时间确保内容渲染
            Thread.sleep(500);

            // 生成文件名
            String filename = UUID.randomUUID().toString() + ".png";
            String outputPath = storagePath + "/" + filename;
            
            // 确保目录存在
            new File(storagePath).mkdirs();

            // 截图
            page.screenshot(new Page.ScreenshotOptions()
                .setPath(Paths.get(outputPath))
                .setFullPage(false)
            );

            // 如果需要生成封面（缩略图）
            if ("cover".equals(dto.getType()) && dto.getSize() != null) {
                String thumbFilename = UUID.randomUUID().toString() + ".jpg";
                String thumbPath = storagePath + "/" + thumbFilename;
                generateThumbnail(outputPath, thumbPath, dto.getSize(), dto.getQuality());
                return thumbPath;
            }

            return outputPath;
        } finally {
            page.close();
            context.close();
        }
    }

    /**
     * 生成全屏截图 - 对应迅排的 printscreen 接口
     */
    @Override
    public String generatePrintscreen(ScreenshotDTO dto) throws Exception {
        initBrowser();

        BrowserContext context = browser.newContext(
            new Browser.NewContextOptions()
                .setViewportSize(dto.getWidth(), dto.getHeight() > 0 ? dto.getHeight() : 800)
        );
        Page page = context.newPage();

        try {
            page.navigate(dto.getUrl());
            page.waitForLoadState(LoadState.NETWORKIDLE);
            
            // 等待指定时间
            if (dto.getWait() != null && dto.getWait() > 0) {
                Thread.sleep(dto.getWait());
            }

            String filename = UUID.randomUUID().toString() + ".png";
            String outputPath = storagePath + "/" + filename;
            
            new File(storagePath).mkdirs();

            // 全页截图
            page.screenshot(new Page.ScreenshotOptions()
                .setPath(Paths.get(outputPath))
                .setFullPage(true)
            );

            return outputPath;
        } finally {
            page.close();
            context.close();
        }
    }

    /**
     * 生成缩略图
     */
    private void generateThumbnail(String sourcePath, String targetPath, int width, int quality) throws Exception {
        BufferedImage sourceImage = ImageIO.read(new File(sourcePath));
        
        // 按宽度等比缩放
        int targetWidth = width;
        int targetHeight = (int) (sourceImage.getHeight() * (width / (double) sourceImage.getWidth()));
        
        BufferedImage targetImage = new BufferedImage(targetWidth, targetHeight, BufferedImage.TYPE_INT_RGB);
        targetImage.getGraphics().drawImage(sourceImage, 0, 0, targetWidth, targetHeight, null);
        
        ImageIO.write(targetImage, "jpg", new File(targetPath));
    }

    /**
     * 关闭浏览器资源
     */
    public void close() {
        if (browser != null) {
            browser.close();
        }
        if (playwright != null) {
            playwright.close();
        }
    }
}