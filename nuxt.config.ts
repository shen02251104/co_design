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

  // App head configuration - SEO optimized
  app: {
    head: {
      title: '易设计 - 电商人都在用的智能设计平台',
      titleTemplate: '%s | 易设计',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            '易设计是专业的电商设计平台，提供海报设计、商品套图生成、AI换背景、图片翻译等智能工具，让电商设计更高效、更专业。',
        },
        {
          name: 'keywords',
          content:
            '易设计,电商设计,海报设计,商品套图,AI换背景,图片翻译,跨境电商,详情页设计,智能设计工具',
        },
        { name: 'author', content: '易设计团队' },
        { name: 'generator', content: 'Nuxt 3' },
        // Open Graph for social sharing
        { property: 'og:title', content: '易设计 - 电商人都在用的智能设计平台' },
        {
          property: 'og:description',
          content:
            '易设计提供AI智能设计工具，一键生成商品套图、海报设计、详情页，助力电商营销。',
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'zh_CN' },
        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: '易设计 - 电商人都在用的智能设计平台' },
        { name: 'twitter:description', content: '易设计提供AI智能设计工具，一键生成商品套图、海报设计' },
        // Robots for SEO
        { name: 'robots', content: 'index, follow' },
        // Canonical URL hint (update with actual domain)
        { name: 'googlebot', content: 'index, follow' },
      ],
      htmlAttrs: {
        lang: 'zh-CN',
      },
    },
  },

  // Nuxt modules
  // Skip @nuxt/image and @pinia/nuxt in CI (requires sharp binaries not available in headless environments)
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

  // Database configuration via runtimeConfig
  runtimeConfig: {
    dbHost: process.env.DB_HOST || 'localhost',
    dbPort: process.env.DB_PORT || '3306',
    dbName: process.env.DB_NAME || 'yi_design',
    dbUser: process.env.DB_USER || 'root',
    dbPassword: process.env.DB_PASSWORD || '',
  },

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
