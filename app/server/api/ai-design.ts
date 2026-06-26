import { OpenAI } from 'openai'

// AI设计生成API - 使用豆包模型
// 推荐模型: doubao-seed-2-0-lite-260215 (性能与成本均衡)

const client = new OpenAI({
  baseURL: process.env.NEXT_PUBLIC_OPENAI_BASE_URL || 'https://ark.cn-beijing.volces.com/api/v3',
  apiKey: process.env.OPENAI_API_KEY || process.env.NEXT_PUBLIC_OPENAI_API_KEY || '',
  dangerouslyAllowBrowser: false
})

// 设计模板数据生成
interface DesignTemplate {
  title: string
  subtitle: string
  backgroundColor: string
  accentColor: string
  textColor: string
  layout: 'center' | 'left' | 'right'
  elements: DesignElement[]
}

interface DesignElement {
  type: 'text' | 'image' | 'shape'
  content: string
  position: { x: number; y: number }
  size: { width: number; height: number }
  style?: Record<string, string>
}

// 流式生成AI设计内容
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { prompt, scene, size } = body

  if (!prompt) {
    return { error: '请描述您的设计需求' }
  }

  // 系统提示词 - 让AI生成设计内容
  const systemPrompt = `你是一位专业的设计师助手，擅长根据用户需求生成设计方案。

当用户描述设计需求时，你需要：
1. 分析用户的使用场景（电商、社交媒体、印刷品、广告等）
2. 推荐合适的配色方案（主色、辅色、文字色）
3. 生成主要文案内容（标题、副标题、正文要点）
4. 建议布局风格（居中、左对齐、右对齐等）
5. 推荐设计元素（图标、形状、装饰线条等）

请以JSON格式返回设计方案，格式如下：
{
  "title": "主标题文字",
  "subtitle": "副标题文字",
  "backgroundColor": "背景色HEX值",
  "accentColor": "强调色HEX值",
  "textColor": "文字色HEX值",
  "layout": "center/left/right",
  "elements": [
    {
      "type": "text/image/shape",
      "content": "内容",
      "position": {"x": 数字, "y": 数字},
      "size": {"width": 数字, "height": 数字},
      "style": {"fontSize": "字号", "fontWeight": "bold/normal"}
    }
  ],
  "suggestions": "其他设计建议"
}

注意：
- 配色要符合设计主题和场景
- 文案要简洁有力，突出重点
- 布局要平衡美观
- 背景色和文字色要有足够对比度`

  const userPrompt = `用户需求: ${prompt}
使用场景: ${scene || '电商'}
设计尺寸: ${size || '800x800'}

请根据以上需求生成设计方案。`

  try {
    // 使用豆包Lite模型 - 性能与成本均衡
    const modelId = process.env.LLM_MODEL_ID || 'doubao-seed-2-0-lite-260215'

    const response = await client.chat.completions.create({
      model: modelId,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      max_tokens: 2000,
      temperature: 0.7, // 稍有创意性
      stream: false
    })

    const content = response.choices[0]?.message?.content || ''

    // 尝试解析JSON结果
    let designData
    try {
      // 提取JSON部分（可能包含其他文字）
      const jsonMatch = content.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        designData = JSON.parse(jsonMatch[0])
      } else {
        // 如果没有JSON，创建默认设计
        designData = {
          title: prompt,
          subtitle: 'AI智能生成',
          backgroundColor: '#6366f1',
          accentColor: '#f97316',
          textColor: '#ffffff',
          layout: 'center',
          elements: [],
          suggestions: content
        }
      }
    } catch {
      designData = {
        title: prompt,
        subtitle: 'AI智能生成',
        backgroundColor: '#6366f1',
        accentColor: '#f97316',
        textColor: '#ffffff',
        layout: 'center',
        elements: [],
        suggestions: content
      }
    }

    return {
      success: true,
      data: designData,
      rawContent: content,
      model: modelId
    }
  } catch (error) {
    console.error('AI生成失败:', error)
    return {
      error: 'AI生成失败，请稍后重试',
      details: error instanceof Error ? error.message : '未知错误'
    }
  }
})