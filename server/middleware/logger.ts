/**
 * 请求日志中间件（仅开发环境）
 */
export default defineEventHandler((event) => {
  const isDev = process.env.COZE_PROJECT_ENV !== 'PROD';

  if (isDev) {
    console.log(`${event.method} ${event.path}`);
  }
});
