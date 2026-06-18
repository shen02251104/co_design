/**
 * 健康检查路由
 * 访问: http://localhost:5000/health
 */
export default defineEventHandler(() => {
  return {
    status: 'ok',
    timestamp: new Date().toISOString(),
  };
});
