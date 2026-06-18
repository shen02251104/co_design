// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  // Disable devtools in CI/test environments (prevents hanging in headless mode)
  devtools: {
    enabled:
      process.env.CI !== 'true' && process.env.COZE_PROJECT_ENV !== 'PROD',
  },
  telemetry: false,

  // App head configuration
  app: {
    head: {
      title: '新应用 | 扣子编程',
      titleTemplate: '%s | 扣子编程',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            '扣子编程是一款一站式云端 Vibe Coding 开发平台。通过对话轻松构建智能体、工作流和网站，实现从创意到上线的无缝衔接。',
        },
        {
          name: 'keywords',
          content:
            '扣子编程,Coze Code,Vibe Coding,AI 编程,智能体搭建,工作流搭建,网站搭建,网站部署,全栈开发,AI 工程师',
        },
        { name: 'author', content: 'Coze Code Team' },
        { name: 'generator', content: 'Coze Code' },
        // Open Graph
        { property: 'og:title', content: '扣子编程 | 你的 AI 工程师已就位' },
        {
          property: 'og:description',
          content:
            '我正在使用扣子编程 Vibe Coding，让创意瞬间上线。告别拖拽，拥抱心流。',
        },
        { property: 'og:url', content: 'https://code.coze.cn' },
        { property: 'og:site_name', content: '扣子编程' },
        { property: 'og:locale', content: 'zh_CN' },
        { property: 'og:type', content: 'website' },
        // Robots
        { name: 'robots', content: 'index, follow' },
      ],
      link: [{ rel: 'canonical', href: 'https://code.coze.cn' }],
      htmlAttrs: {
        lang: 'zh-CN',
      },
    },
  },

  // Nuxt modules
  // Skip @nuxt/image in CI (requires sharp binaries not available in headless environments)
  modules:
    process.env.CI === 'true'
      ? ['@nuxtjs/tailwindcss']
      : ['@nuxt/image', '@nuxtjs/tailwindcss'],

  // Global CSS
  css: [resolve(__dirname, 'assets/css/main.css')],

  // Development server configuration
  devServer: {
    port: parseInt(process.env.PORT || '5000', 10),
    host: process.env.HOSTNAME || 'localhost',
  },

  // TypeScript configuration
  typescript: {
    strict: false,
    typeCheck: false,
  },

  // Vite configuration (similar to Next.js allowedDevOrigins)
  vite: {
    server: {
      cors: {
        origin: ['*.dev.coze.site'],
        credentials: true,
      },
      hmr: {
        overlay: true,
        path: '/hot/vite-hmr',
        port: parseInt(process.env.HMR_PORT || '6000', 10),
        clientPort: 443,
        timeout: 30000,
      },
      // Fix EMFILE: too many open files error
      // Exclude large directories from file watching to avoid exceeding system limits
      watch: {
        ignored: [
          '**/node_modules/**',
          '**/.nuxt/**',
          '**/.output/**',
          '**/dist/**',
          '**/.git/**',
          '**/coverage/**',
          '**/.cache/**',
        ],
      },
    },
  },

  // Image optimization (similar to Next.js images config)
  // Using @nuxt/image module for image optimization
  // https://image.nuxt.com/
  // Skip image config in CI (when @nuxt/image module is disabled)
  ...(process.env.CI !== 'true' && {
    image: {
      domains: ['lf-coze-web-cdn.coze.cn'],
      // Remote patterns configuration
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'lf-coze-web-cdn.coze.cn',
          pathname: '/**',
        },
      ],
    },
  }),

  // Security headers (Content Security Policy)
  nitro: {
    routeRules: {
      '/**': {
        headers: {
          'Content-Security-Policy':
            "img-src 'self' data: https://lf-coze-web-cdn.coze.cn;",
        },
      },
    },
  },
});
