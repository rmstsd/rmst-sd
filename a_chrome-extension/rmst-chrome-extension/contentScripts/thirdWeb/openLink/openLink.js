const urlMap = {
  '//www.jianshu.com/go-wild': '继续前往',
  '//leetcode.cn/link/': '继续访问',
  '//link.juejin.cn/': '继续访问',
  '//link.zhihu.com': '继续访问',
  '//link.csdn.net': '继续'
}

const tk = Object.keys(urlMap).find(o => window.location.href.includes(o))

if (tk) {
  const text = urlMap[tk]
  ;[...document.all].find(o => o.textContent === text)?.click()
}
