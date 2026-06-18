package com.yidesign.service;

import com.yidesign.model.dto.ScreenshotDTO;

/**
 * 截图服务接口 - 使用 Playwright Java 替代 Puppeteer
 */
public interface ScreenshotService {
    
    /**
     * 生成截图 - 对应迅排的 screenshots 接口
     */
    String generateScreenshot(ScreenshotDTO dto) throws Exception;
    
    /**
     * 生成全屏截图 - 对应迅排的 printscreen 接口
     */
    String generatePrintscreen(ScreenshotDTO dto) throws Exception;
}