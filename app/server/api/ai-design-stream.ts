import { OpenAI } from 'openAI'

// AI设计流式生成API - 实时返回生成进度

const client = new OpenAI({
  baseURL: process.env.NEXT_PUBLIC_OPENAI_BASE_URL || 'https://ark.cn-beijing.volces.com/api/v3',
  apiKey: process.env.OPENAI_API_KEY || process.env.NEXT_PUBLIC_OPENAI_API_KEY || '',
  dangerouslyAllowBrowser: false
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { prompt, scene, size } = body

  if (!prompt) {
    return { error: '请描述您的设计需求' }
  }

  // 设置响应头为SSE流式
  setResponseHeaders(event, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  })

  const systemPrompt = `你是一位专业的设计师助手，擅长根据用户需求生成设计方案。

当用户描述设计需求时，你需要：
1. 分析用户的使用场景（电商、社交媒体、印刷品、广告等）
2. 推荐合适的配色方案
3. 生成主要文案内容
4. 建议布局风格
5. 推荐设计元素

请以JSON格式返回设计方案。

注意：配色要符合设计主题，文案要简洁有力，布局要平衡美观。`

  const userPrompt = `用户需求: ${prompt}
使用场景: ${scene || '电商'}
设计尺寸: ${size || '800x800'}
请生成设计方案。`

  try {
    const modelId = process.env.LLM_MODEL_ID || 'doubao-seed-2-0-lite-260215'

    const stream = await client.chat.completions.create({
      model: modelId,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      max_tokens: 2000,
      temperature: 0.7,
      stream: true
    })

    let fullContent = ''
    let progress = 0

    // 创建流式响应
    const streamResponse = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder()

        // 发送开始事件
        controller.enqueue(encoder.encode(`data: {"type":"start","message":"开始生成设计..."}\n\n`))

        for await (const chunk of stream) {
          const content = chunk.choices[0]?.delta?.content || ''
          fullContent += content

          // 计算进度（预估）
          progress = Math.min(95, progress + 2)
          
          // 发送进度更新
          const progressEvent = {
            type: 'progress',
            progress,
            content,
            fullContent
          }
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(progressEvent)}\n\n`))
        }

        // 解析最终结果
        let designData
        try {
          const jsonMatch = fullContent.match(/\{[\s\S]*\}/)
          if (jsonMatch) {
            designData = JSON.parse(jsonMatch[0])
          } else {
            designData = {
              title: prompt,
              subtitle: 'AI智能生成',
              backgroundColor: '#6366f1',
              accentColor: '#f97316',
              textColor: '#ffffff',
              layout: 'center',
              elements: [],
              suggestions: fullContent
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
            suggestions: fullContent
          }
        }

        // 发送完成事件
        const completeEvent = {
          type: 'complete',
          progress: 100,
          data: designData,
          fullContent
        }
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(completeEvent)}\n\n`))
        controller.close()
      }
    })

    return streamResponse
  } catch (error) {
    console.error('AI流式生成失败:', error)
    return {
      error: 'AI生成失败，请稍后重试',
      details: error instanceof Error ? error.message : '未知错误'
    }
  }
})