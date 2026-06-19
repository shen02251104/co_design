// 模板详情 API - 返回完整的模板组件数据
export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const id = query.id || '1'
  const type = query.type || null

  // 模拟组件数据 - 按迅排设计格式返回
  const templateData = [
    {
      global: {
        uuid: '-1',
        type: 'page',
        name: '页面背景',
        width: 800,
        height: 600,
        tag: 0,
        color: '#FFFFFF',
        opacity: 1,
        backgroundColor: '#FFFFFF',
        parent: '-1'
      },
      layers: [
        {
          uuid: 'widget-1',
          type: 'text',
          name: '标题文字',
          text: '限时特惠',
          fontSize: 48,
          fontFamily: 'Arial',
          fontWeight: 'bold',
          color: '#FF0000',
          left: 200,
          top: 50,
          width: 400,
          height: 60,
          rotate: 0,
          opacity: 1,
          textAlign: 'center',
          parent: '-1',
          tag: 0
        },
        {
          uuid: 'widget-2',
          type: 'text',
          name: '副标题',
          text: '全场商品5折起',
          fontSize: 24,
          fontFamily: 'Arial',
          fontWeight: 'normal',
          color: '#333333',
          left: 250,
          top: 120,
          width: 300,
          height: 40,
          rotate: 0,
          opacity: 1,
          textAlign: 'center',
          parent: '-1',
          tag: 0
        },
        {
          uuid: 'widget-3',
          type: 'image',
          name: '主图',
          url: 'https://picsum.photos/200/200?random=' + id,
          left: 300,
          top: 200,
          width: 200,
          height: 200,
          rotate: 0,
          opacity: 1,
          parent: '-1',
          tag: 0
        },
        {
          uuid: 'widget-4',
          type: 'text',
          name: '价格文字',
          text: '¥99.00',
          fontSize: 36,
          fontFamily: 'Arial',
          fontWeight: 'bold',
          color: '#FF6600',
          left: 300,
          top: 420,
          width: 200,
          height: 50,
          rotate: 0,
          opacity: 1,
          textAlign: 'center',
          parent: '-1',
          tag: 0
        },
        {
          uuid: 'widget-5',
          type: 'rect',
          name: '装饰矩形',
          left: 50,
          top: 500,
          width: 700,
          height: 80,
          color: '#FF0000',
          opacity: 0.8,
          rotate: 0,
          parent: '-1',
          tag: 0
        }
      ]
    }
  ]

  // 如果是组件模板（type=1），返回组件列表
  if (type === '1') {
    const componentData = [
      {
        uuid: 'comp-1',
        type: 'text',
        name: '可编辑文字',
        text: '点击编辑文字',
        fontSize: 32,
        fontFamily: 'Arial',
        fontWeight: 'normal',
        color: '#000000',
        left: 0,
        top: 0,
        width: 300,
        height: 50,
        rotate: 0,
        opacity: 1,
        textAlign: 'left',
        parent: '-1',
        tag: 0,
        editable: true
      },
      {
        uuid: 'comp-2',
        type: 'image',
        name: '可替换图片',
        url: 'https://picsum.photos/150/150',
        left: 0,
        top: 60,
        width: 150,
        height: 150,
        rotate: 0,
        opacity: 1,
        parent: '-1',
        tag: 0,
        editable: true
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
    data: {
      data: JSON.stringify(templateData),
      width: templateData[0].global.width,
      height: templateData[0].global.height
    },
    success: true
  }
})