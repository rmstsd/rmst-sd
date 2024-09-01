import geekBang from './image/geek-bang.png'
import webpack from './image/webpack.png'
import ts from './image/ts.png'

import baiduLogo from './image/baidu-logo.png'
import bingLogo from './image/bing-logo.png'
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
    id: 'juejin',
    mark: '掘金',
    link: 'https://juejin.cn/search?query=',
    home: 'https://juejin.cn/',
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
  }
]

export const concise = [
  { logo: geekBang, link: 'https://time.geekbang.org/dashboard/course' },
  { logo: webpack, link: 'https://webpack.docschina.org/concepts/' },
  { logo: ts, link: 'https://www.typescriptlang.org/docs/handbook/intro.html' }
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
    id: 'baidu',
    logo: baiduLogo,
    mark: '百度',
    link: 'https://www.baidu.com/s?wd=',
    suggest:
      'https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web&sugsid=34534,34496,31254,34004,34092,34517,26350,34319&req=2&bs=fetch&csor=5&cb=baiduCb&wd=',
    suggestList: [], // { label: string, value:string }
    value: ''
  },
  {
    id: 'google',
    logo: googleLogo,
    mark: '谷歌',
    link: 'https://www.google.com.hk/search?safe=strict&hl=zh-CN&q=',
    suggest:
      'https://www.google.com.hk/complete/search?q=%E6%9D%8E&cp=1&client=gws-wiz&xssi=t&hl=zh-CN&authuser=0&pq=%E6%9D%8E%E7%99%BD&psi=HbkwYf7PIYm2mAW3-YCwDg.1630583069240&dpr=1.4322917461395264',
    value: ''
  },
  // {
  //     id: 'bing',
  //     logo: bingLogo,
  //     mark: '必应',
  //     link: 'https://www.bing.com/search?q=',
  //     value: ''
  // },
  {
    id: 'develop',
    logo: developLogo,
    mark: '开发者',
    link: 'https://kaifa.baidu.com/searchPage?wd=',
    value: ''
  }
]
