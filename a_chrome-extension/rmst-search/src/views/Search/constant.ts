import developLogo from './image/develop-logo.png'
import googleLogo from './image/google-logo.png'

export type UMessItem = {
  id: string
  mark: string
  link: string
  home: string
  value: string
}

export const messList: UMessItem[] = [
  {
    id: 'zhihu',
    mark: '知乎',
    link: 'https://www.zhihu.com/search?type=content&q=',
    home: 'https://www.zhihu.com/',
    value: ''
  },
  {
    id: 'bilibili',
    mark: 'B站',
    link: 'https://search.bilibili.com/all?keyword=',
    home: 'https://www.bilibili.com/',
    value: ''
  },
  {
    id: 'xiaohongshu',
    mark: '小红书',
    link: 'https://www.xiaohongshu.com/search_result?keyword=',
    home: 'https://www.xiaohongshu.com',
    value: ''
  },
  {
    id: 'npm',
    mark: 'npm',
    link: 'https://www.npmjs.com/search?q=',
    home: 'https://www.npmjs.com/',
    value: ''
  },
  {
    id: 'mdn',
    mark: 'mdn',
    link: 'https://developer.mozilla.org/zh-CN/search?q=',
    home: '',
    value: ''
  },
  {
    id: 'github',
    mark: 'github',
    link: 'https://github.com/search?q=',
    home: '',
    value: ''
  },

  {
    id: 'juejin',
    mark: '掘金',
    link: 'https://juejin.cn/search?query=',
    home: 'https://juejin.cn/',
    value: ''
  }
]

export interface UEngineItem {
  id: string
  logo: string
  mark: string
  link: string
  suggest?: string
  suggestList?: { label: string; value: string }[] // { label: string, value:string }
  value: string
}

export const engineList: UEngineItem[] = [
  {
    id: 'google',
    logo: googleLogo,
    mark: '谷歌',
    link: 'https://www.google.com.hk/search?safe=strict&hl=zh-CN&q=',
    suggest:
      'https://www.google.com.hk/complete/search?q=%E6%9D%8E&cp=1&client=gws-wiz&xssi=t&hl=zh-CN&authuser=0&pq=%E6%9D%8E%E7%99%BD&psi=HbkwYf7PIYm2mAW3-YCwDg.1630583069240&dpr=1.4322917461395264',
    value: ''
  },

  {
    id: 'develop',
    logo: developLogo,
    mark: '开发者',
    link: 'https://kaifa.baidu.com/searchPage?wd=',
    value: ''
  }
]
