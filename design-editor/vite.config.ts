/*
 * @Author: ShawnPhang
 * @Date: 2021-08-19 18:30:38
 * @Description: Vite配置文件
 * @LastEditors: ShawnPhang <site: book.palxp.com>
 * @LastEditTime: 2023-08-01 10:46:59
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import viteCompression from 'vite-plugin-compression'
import ElementPlus from 'unplugin-element-plus/vite'

const resolve = (...data: string[]) => path.resolve(__dirname, ...data)

// https://vitejs.dev/config/
export default defineConfig({
  // base: '/design/',  // 生产环境部署路径，开发环境注释掉
  plugins: [
    vue(),
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz',
    }),
    ElementPlus({
      // options
    }),
  ],
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    outDir: 'dist',
    base: '/design/',  // 生产构建时使用
  },
  resolve: {
    alias: {
      '@': resolve('src'),
      '~data': resolve('src/assets/data'),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          color: `true; @import "./src/assets/styles/color.less";`,
        },
      },
    },
  },
  define: {
    'process.env': process.env,
  },
  server: {
    hmr: { overlay: false },
    port: 5173,  // 独立端口
    // 强制禁用缓存，确保每次都重新编译
    force: true,
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate',
    },
    proxy: {
      // 代理到 Nuxt 服务器（端口 5000）- 将 /design 转为 /api/design
      '/design': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/design/, '/api/design'),
      },
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
})
