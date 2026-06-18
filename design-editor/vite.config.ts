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
  base: '/design/',  // 集成到主站的路径
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
    proxy: {
      '/api': {
        target: 'http://localhost:5000',  // 代理到主站后端
        changeOrigin: true,
      },
    },
  },
})
