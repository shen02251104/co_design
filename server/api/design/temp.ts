// 模板详情 API - 从数据库获取真实数据
import { getTemplateById } from '../../utils/db'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const id = query.id || '1'
  const type = query.type || null

  try {
    // 尝试从数据库获取数据
    const templates = await getTemplateById(id) as any[]
    
    if (templates && templates.length > 0) {
      const template = templates[0]
      
      // 返回数据库中的真实数据
      return {
        code: 200,
        data: {
          data: template.template_data || '[]',
          width: template.width,
          height: template.height
        },
        success: true
      }
    }
  } catch (error: any) {
    console.error('Database error:', error.message)
  }

  // 如果数据库连接失败或找不到数据，返回 mock 数据作为兜底
  // 使用用户提供的真实 PSD 数据格式
  const mockTemplates = {
    '1': {
      data: JSON.stringify([{
        global: {
          uuid: '-1',
          type: 'page',
          name: '页面背景',
          width: 800,
          height: 600,
          backgroundColor: '#FFFFFF',
          backgroundImage: '',
          opacity: 1,
          tag: 0,
          setting: [],
          record: {}
        },
        layers: [
          {
            name: '标题文字',
            type: 'w-text',
            uuid: 'widget-1',
            left: 200,
            top: 50,
            width: 400,
            height: 60,
            fontSize: 48,
            fontFamily: 'Arial',
            fontWeight: 'bold',
            fontStyle: 'normal',
            color: '#FF0000ff',
            textAlign: 'center',
            text: '限时特惠',
            lineHeight: 1.2,
            letterSpacing: 0,
            opacity: 1,
            backgroundColor: '',
            parent: '-1',
            rotate: 0,
            record: {},
            filter: {}
          },
          {
            name: '副标题',
            type: 'w-text',
            uuid: 'widget-2',
            left: 250,
            top: 120,
            width: 300,
            height: 40,
            fontSize: 24,
            fontFamily: 'Arial',
            fontWeight: 'normal',
            fontStyle: 'normal',
            color: '#333333ff',
            textAlign: 'center',
            text: '全场商品5折起',
            lineHeight: 1.2,
            letterSpacing: 0,
            opacity: 1,
            backgroundColor: '',
            parent: '-1',
            rotate: 0,
            record: {},
            filter: {}
          },
          {
            name: '主图',
            type: 'w-image',
            uuid: 'widget-3',
            left: 300,
            top: 200,
            width: 200,
            height: 200,
            imgUrl: 'https://picsum.photos/200/200?random=1',
            opacity: 1,
            parent: '-1',
            rotate: 0,
            record: {},
            filter: {}
          },
          {
            name: '价格文字',
            type: 'w-text',
            uuid: 'widget-4',
            left: 300,
            top: 420,
            width: 200,
            height: 50,
            fontSize: 36,
            fontFamily: 'Arial',
            fontWeight: 'bold',
            fontStyle: 'normal',
            color: '#FF6600ff',
            textAlign: 'center',
            text: '¥99.00',
            lineHeight: 1.2,
            letterSpacing: 0,
            opacity: 1,
            backgroundColor: '',
            parent: '-1',
            rotate: 0,
            record: {},
            filter: {}
          }
        ]
      }]),
      width: 800,
      height: 600
    },
    '2': {
      // 用户提供的真实 PSD 数据格式
      data: `[{"global":{"name":"作品名","type":"page","uuid":"-1","left":0,"top":0,"width":1242,"height":2208,"backgroundColor":"#ffffffff","backgroundImage":"","opacity":1,"tag":0,"setting":[],"record":{}},"layers":[{"name":"二维码","type":"w-qrcode","uuid":"9052488e8103","width":207,"height":207,"left":874,"top":1849,"zoom":1,"transform":"","radius":0,"opacity":1,"parent":"-1","url":"","dotType":"classy","dotColorType":"single","dotRotation":270,"dotColor":"#35495E","dotColor2":"#35495E","value":"https://xp.palxp.cn","setting":[],"record":{"width":0,"height":0,"minWidth":10,"minHeight":10,"dir":"all"},"rotate":0,"filter":{"contrast":0,"sharpness":0,"hueRotate":0,"saturate":0,"brightness":0,"gaussianBlur":0}},{"name":"图片","type":"w-image","uuid":"1424e3f1501d","width":973,"height":838,"left":134,"top":625,"zoom":1,"transform":"scale(1)translate(0px,0px)","radius":0,"opacity":1,"parent":"-1","imgUrl":"https://picsum.photos/973/838?random=2","setting":[],"record":{"width":0,"height":0,"minWidth":10,"minHeight":10,"dir":"all"},"rotate":0,"filter":{"contrast":0,"sharpness":0,"hueRotate":0,"saturate":0,"brightness":0,"gaussianBlur":0}},{"name":"文本","type":"w-text","uuid":"764a25774e74","editable":false,"left":160,"top":1924,"lineHeight":1.46,"letterSpacing":10,"fontSize":45,"fontWeight":400,"fontStyle":"normal","writingMode":"horizontal-tb","textDecoration":"none","color":"#000000ff","textAlign":"left","text":"电话：8888-8888888<br/>地址：广州市高林路888号","opacity":1,"backgroundColor":"","parent":"-1","width":600,"height":131,"rotate":0,"filter":{"contrast":0,"sharpness":0,"hueRotate":0,"saturate":0,"brightness":0,"gaussianBlur":0}},{"name":"文本","type":"w-text","uuid":"b12ffac161d3","editable":false,"left":219,"top":1646,"lineHeight":1.63,"letterSpacing":10,"fontSize":45,"fontWeight":400,"fontStyle":"normal","writingMode":"horizontal-tb","textDecoration":"none","color":"#000000ff","textAlign":"center","text":"生活就像海洋，只有意志坚强的人，<br/>才能到达彼岸。——马克思","opacity":1,"backgroundColor":"","parent":"-1","width":806,"height":147,"rotate":0,"filter":{"contrast":0,"sharpness":0,"hueRotate":0,"saturate":0,"brightness":0,"gaussianBlur":0}},{"name":"文本","type":"w-text","uuid":"c887aa0bb7e2","editable":false,"left":432,"top":1522,"lineHeight":1.2,"letterSpacing":10,"fontSize":66,"fontWeight":400,"fontStyle":"normal","writingMode":"horizontal-tb","textDecoration":"none","color":"#000000ff","textAlign":"center","text":"#每日一签#","opacity":1,"backgroundColor":"","parent":"-1","width":398,"height":80,"rotate":0,"filter":{"contrast":0,"sharpness":0,"hueRotate":0,"saturate":0,"brightness":0,"gaussianBlur":0}},{"name":"文本","type":"w-text","uuid":"98fd9b16db8a","editable":false,"left":84,"top":289,"lineHeight":1.2,"letterSpacing":10,"fontSize":176,"fontWeight":400,"fontStyle":"normal","writingMode":"horizontal-tb","textDecoration":"none","color":"#000000ff","textAlign":"center","text":"你好,十二月","opacity":1,"backgroundColor":"","parent":"-1","width":1092,"height":211,"rotate":0,"filter":{"contrast":0,"sharpness":0,"hueRotate":0,"saturate":0,"brightness":0,"gaussianBlur":0}},{"name":"文本","type":"w-text","uuid":"438bf33d6f9e","editable":false,"left":335,"top":512,"lineHeight":1.2,"letterSpacing":38,"fontSize":41,"fontWeight":400,"fontStyle":"normal","writingMode":"horizontal-tb","textDecoration":"none","color":"#000000ff","textAlign":"center","text":"HELLONOVEMBER","opacity":1,"backgroundColor":"","parent":"-1","width":614,"height":50,"rotate":0,"filter":{"contrast":0,"sharpness":0,"hueRotate":0,"saturate":0,"brightness":0,"gaussianBlur":0}},{"name":"文本","type":"w-text","uuid":"1e149f7637e5","editable":false,"left":394,"top":171,"lineHeight":1.5,"letterSpacing":0,"fontSize":60,"fontWeight":"bold","fontStyle":"normal","writingMode":"horizontal-tb","textDecoration":"none","color":"#000000ff","textAlign":"center","text":"YOURLOGO","opacity":1,"backgroundColor":"","parent":"-1","width":454,"height":90,"rotate":0,"filter":{"contrast":0,"sharpness":0,"hueRotate":0,"saturate":0,"brightness":0,"gaussianBlur":0}}]}]`,
      width: 1242,
      height: 2208
    }
  }

  const template = mockTemplates[id as keyof typeof mockTemplates] || mockTemplates['1']

  // 如果是组件模板（type=1），返回组件列表
  if (type === '1') {
    const componentData = [
      {
        uuid: 'comp-1',
        type: 'w-text',
        name: '可编辑文字',
        text: '点击编辑文字',
        fontSize: 32,
        fontFamily: 'Arial',
        fontWeight: 'normal',
        fontStyle: 'normal',
        color: '#000000ff',
        left: 0,
        top: 0,
        width: 300,
        height: 50,
        lineHeight: 1.2,
        letterSpacing: 0,
        textAlign: 'left',
        opacity: 1,
        backgroundColor: '',
        parent: '-1',
        rotate: 0,
        editable: true,
        record: {},
        filter: {}
      }
    ]
    return {
      code: 200,
      data: {
        data: JSON.stringify(componentData),
        width: 300,
        height: 210
      },
      success: true
    }
  }

  return {
    code: 200,
    data: template,
    success: true
  }
})