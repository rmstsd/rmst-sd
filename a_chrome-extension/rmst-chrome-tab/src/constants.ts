import Icon_Map from './IconMap'
import { SearchEngineItem, SearchPriority } from './types'

// Merged and categorized list based on user requirements
export const Search_Engines: SearchEngineItem[] = [
  // --- Primary (Large) ---
  {
    id: 'google',
    name: 'Google',
    searchLink: 'https://www.google.com.hk/search?safe=strict&hl=zh-CN&q=',
    homeLink: 'https://www.google.com',
    logoSeed: 101,
    priority: SearchPriority.Primary,
    color: 'blue-600',
    icon: Icon_Map.get('google')
  },
  {
    id: 'baiduDevelop',
    name: 'Baidu Dev',
    searchLink: 'https://kaifa.baidu.com/searchPage?wd=',
    homeLink: 'https://kaifa.baidu.com/',
    logoSeed: 102,
    priority: SearchPriority.Primary,
    color: 'emerald-600',
    icon: Icon_Map.get('baiduDevelop')
  },

  // --- Secondary (Medium) ---
  {
    id: 'mdn',
    name: 'MDN Web Docs',
    searchLink: 'https://developer.mozilla.org/zh-CN/search?q=',
    homeLink: 'https://developer.mozilla.org/zh-CN/',
    logoSeed: 201,
    priority: SearchPriority.Secondary,
    color: 'neutral-800',
    icon: Icon_Map.get('mdn')
  },
  {
    id: 'github',
    name: 'GitHub',
    searchLink: 'https://github.com/search?q=',
    homeLink: 'https://github.com/',
    logoSeed: 202,
    priority: SearchPriority.Secondary,
    color: 'gray-900',
    icon: Icon_Map.get('github')
  },
  {
    id: 'npm',
    name: 'NPM',
    searchLink: 'https://www.npmjs.com/search?q=',
    homeLink: 'https://www.npmjs.com/',
    logoSeed: 301,
    priority: SearchPriority.Secondary,
    color: 'red-600',
    icon: Icon_Map.get('npm')
  },
  {
    id: 'juejin',
    name: 'Juejin',
    searchLink: 'https://juejin.cn/search?query=',
    homeLink: 'https://juejin.cn/',
    logoSeed: 203,
    priority: SearchPriority.Secondary,
    color: 'blue-500',
    icon: Icon_Map.get('juejin')
  },

  // --- Tertiary (Small) ---
  {
    id: 'zhihu',
    name: 'Zhihu',
    searchLink: 'https://www.zhihu.com/search?type=content&q=',
    homeLink: 'https://www.zhihu.com/',
    logoSeed: 302,
    priority: SearchPriority.Tertiary,
    color: 'blue-400',
    icon: Icon_Map.get('zhihu')
  },
  {
    id: 'bilibili',
    name: 'Bilibili',
    searchLink: 'https://search.bilibili.com/all?keyword=',
    homeLink: 'https://www.bilibili.com/',
    logoSeed: 303,
    priority: SearchPriority.Tertiary,
    color: 'pink-400',
    icon: Icon_Map.get('bilibili')
  },
  {
    id: 'xiaohongshu',
    name: 'Xiaohongshu',
    searchLink: 'https://www.xiaohongshu.com/search_result?keyword=',
    homeLink: 'https://www.xiaohongshu.com',
    logoSeed: 304,
    priority: SearchPriority.Tertiary,
    color: 'red-500',
    icon: Icon_Map.get('xiaohongshu')
  }
]

export type Sentence = typeof defaultSentence
export const defaultSentence = {
  bookId: '',
  phrases: [],
  relWords: [
    {
      Hwds: [
        {
          hwd: 'general',
          tran: '一般的，普通的；综合的；大体的'
        },
        {
          hwd: 'generic',
          tran: '类的；一般的；属的；非商标的'
        },
        {
          hwd: 'generalized',
          tran: '广义的，普遍的；无显著特点的'
        }
      ],
      Pos: 'adj'
    },
    {
      Hwds: [
        {
          hwd: 'generally',
          tran: '通常；普遍地，一般地'
        },
        {
          hwd: 'generically',
          tran: '一般地；属类地'
        }
      ],
      Pos: 'adv'
    },
    {
      Hwds: [
        {
          hwd: 'general',
          tran: '一般；将军，上将；常规'
        },
        {
          hwd: 'generalization',
          tran: '概括；普遍化；一般化'
        },
        {
          hwd: 'generality',
          tran: '概论；普遍性；大部分'
        },
        {
          hwd: 'generalisation',
          tran: '（英）一般化；归纳；普遍原理（等于generalization）'
        }
      ],
      Pos: 'n'
    },
    {
      Hwds: [
        {
          hwd: 'generalized',
          tran: '推广（generalize的过去分词）；对…进行概括；使…一般化'
        }
      ],
      Pos: 'v'
    },
    {
      Hwds: [
        {
          hwd: 'generalise',
          tran: '推广；笼统地讲；概括（等于generalize）'
        }
      ],
      Pos: 'vi'
    },
    {
      Hwds: [
        {
          hwd: 'generate',
          tran: '使形成；发生；生殖'
        },
        {
          hwd: 'generalise',
          tran: '概括；归纳；普及'
        }
      ],
      Pos: 'vt'
    }
  ],
  sentences: [
    {
      s_cn: '她总爱把自己对丈夫的看法推及所有的男人。',
      s_content: 'She has a tendency to generalize from her husband to all men.'
    }
  ],
  synonyms: [
    {
      Hwds: [
        {
          word: 'extend'
        },
        {
          word: 'summarise'
        }
      ],
      pos: 'vt',
      tran: '概括；推广；使...一般化'
    },
    {
      Hwds: [
        {
          word: 'ideate'
        }
      ],
      pos: 'vi',
      tran: '形成概念'
    }
  ],
  translations: [
    {
      pos: 'v',
      tran_cn: '概括出'
    }
  ],
  ukphone: 'ˈdʒɛnrəˌlaɪz',
  ukspeech: 'https://dict.youdao.com/dictvoice?audio=generalize&type=1',
  usphone: "'dʒɛnrəlaɪz",
  usspeech: 'https://dict.youdao.com/dictvoice?audio=generalize&type=2',
  word: 'generalize'
}
