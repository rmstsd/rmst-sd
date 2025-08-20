import type { PlasmoCSConfig } from 'plasmo'

export const config: PlasmoCSConfig = {
  world: 'MAIN'
}

const urlMap = {
  '//www.jianshu.com/go-wild': '继续前往',
  '//leetcode.cn/link/': '继续访问',
  '//link.juejin.cn/': '继续访问',
  '//link.zhihu.com': '继续访问',
  '//link.csdn.net': '继续',
  'coding.net': '继续访问'
}

window.addEventListener('load', () => {
  const tk = Object.keys(urlMap).find(o => window.location.href.includes(o))

  if (tk) {
    const text = urlMap[tk]

    const jump = () => {
      const btn = [...document.all].find(o => o.textContent === text) as HTMLElement

      if (btn) {
        clearInterval(timer)
      }

      console.log(btn)
      btn?.click()
    }

    let timer

    timer = setInterval(() => {
      jump()
    }, 100)
  }
})
