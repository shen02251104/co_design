/**
 * Hello API 示例
 * 访问: http://localhost:5000/api/hello
 */
export default defineEventHandler(() => {
  return {
    message: 'Hello from Nuxt API',
    timestamp: new Date().toISOString(),
  };
});
