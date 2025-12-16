import { SearchEngineItem, SearchPriority } from './types'

// Merged and categorized list based on user requirements
export const SEARCH_ENGINES: SearchEngineItem[] = [
  // --- Primary (Large) ---
  {
    id: 'google',
    name: 'Google',
    searchLink: 'https://www.google.com.hk/search?safe=strict&hl=zh-CN&q=',
    homeLink: 'https://www.google.com',
    logoSeed: 101,
    priority: SearchPriority.PRIMARY,
    color: 'blue-600',
    placeholder: 'Search Google...'
  },
  {
    id: 'develop',
    name: 'Baidu Dev',
    searchLink: 'https://kaifa.baidu.com/searchPage?wd=',
    logoSeed: 102,
    priority: SearchPriority.PRIMARY,
    color: 'emerald-600',
    placeholder: 'Search Developer Docs...'
  },

  // --- Secondary (Medium) ---
  {
    id: 'mdn',
    name: 'MDN Web Docs',
    searchLink: 'https://developer.mozilla.org/zh-CN/search?q=',
    logoSeed: 201,
    priority: SearchPriority.SECONDARY,
    color: 'neutral-800',
    placeholder: 'Search MDN...'
  },
  {
    id: 'github',
    name: 'GitHub',
    searchLink: 'https://github.com/search?q=',
    logoSeed: 202,
    priority: SearchPriority.SECONDARY,
    color: 'gray-900',
    placeholder: 'Find repos...'
  },
  {
    id: 'juejin',
    name: 'Juejin',
    searchLink: 'https://juejin.cn/search?query=',
    homeLink: 'https://juejin.cn/',
    logoSeed: 203,
    priority: SearchPriority.SECONDARY,
    color: 'blue-500',
    placeholder: 'Search Articles...'
  },

  // --- Tertiary (Small) ---
  {
    id: 'npm',
    name: 'NPM',
    searchLink: 'https://www.npmjs.com/search?q=',
    homeLink: 'https://www.npmjs.com/',
    logoSeed: 301,
    priority: SearchPriority.TERTIARY,
    color: 'red-600',
    placeholder: 'Packages...'
  },
  {
    id: 'zhihu',
    name: 'Zhihu',
    searchLink: 'https://www.zhihu.com/search?type=content&q=',
    homeLink: 'https://www.zhihu.com/',
    logoSeed: 302,
    priority: SearchPriority.TERTIARY,
    color: 'blue-400',
    placeholder: 'Topics...'
  },
  {
    id: 'bilibili',
    name: 'Bilibili',
    searchLink: 'https://search.bilibili.com/all?keyword=',
    homeLink: 'https://www.bilibili.com/',
    logoSeed: 303,
    priority: SearchPriority.TERTIARY,
    color: 'pink-400',
    placeholder: 'Videos...'
  },
  {
    id: 'xiaohongshu',
    name: 'Xiaohongshu',
    searchLink: 'https://www.xiaohongshu.com/search_result?keyword=',
    homeLink: 'https://www.xiaohongshu.com',
    logoSeed: 304,
    priority: SearchPriority.TERTIARY,
    color: 'red-500',
    placeholder: 'Trends...'
  }
]
