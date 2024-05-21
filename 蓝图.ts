export interface Node {
  id: string
  title: string

  acceptType?: null | string | string[] // 接受的类型

  fieldList: Field[]
}

interface Field {
  key: string
  label: string
  value: string | Field[]
  renderType: 'text' | 'input' | 'radio' | 'select'

  slot?: Field[] // 描述 key 的额外信息

  contactNodeIds?: null | string | string[]
  emitType: null | string | string[] // 可以连接的类型

  interaction?: { click?: boolean }

  ext?: any

  style?: {
    keyStyle?: {}
    valueStyle?: {}
  }
  // 样式怎么弄?
  // 基本通用样式 - 可点击的地方使用内置样式
  // 高度自定义样式 - 通过插件机制 达到
}

const data: Node[] = [
  {
    id: 'asd',
    title: '',
    fieldList: [
      {
        key: 'range',
        label: '施法范围',
        value: '1200',
        renderType: 'input',
        contactNodeIds: 'zxc',
        emitType: 'effect'
      }
    ]
  },
  {
    id: 'zxc',
    title: '',
    acceptType: 'effect',
    fieldList: [
      {
        key: 'range',
        label: '施法范围',
        value: [
          {
            key: 'time',
            label: '施放时间',
            value: '0.1',
            renderType: 'input',
            contactNodeIds: null,
            emitType: 'effect'
          }
        ],
        renderType: 'input',
        contactNodeIds: null,
        emitType: 'effect'
      }
    ]
  }
]
