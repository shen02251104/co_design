// Supabase 配置 API - 从环境变量获取 credentials
export default defineEventHandler(() => {
  const config = useRuntimeConfig();
  
  const url = config.public.cozeSupabaseUrl || process.env.COZE_SUPABASE_URL;
  const anonKey = config.public.cozeSupabaseAnonKey || process.env.COZE_SUPABASE_ANON_KEY;
  
  if (!url || !anonKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Supabase credentials not configured'
    });
  }
  
  return { url, anonKey };
});