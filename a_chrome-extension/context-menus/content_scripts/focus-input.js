document.onkeyup = evt => {
  console.log(window.location.origin)

  const map = {
    'www.google.com.hk': '#tsf > div:nth-child(1) > div.A8SBwf > div.RNNXgb > div > div.a4bIc > input',
    'www.baidu.com': '#kw',

    'www.bilibili.com': '#nav-searchform > div.nav-search-content > input',
    'search.bilibili.com':
      '#i_cecream > div > div:nth-child(2) > div.search-header > div.search-input > div > div > div > input',
    'live.bilibili.com':
      '#nav-searchform > div.p-relative.search-bar.over-hidden.border-box.t-nowrap > input',

    'www.zhihu.com': '#Popover1-toggle',
    'www.npmjs.com': '#search > div > div > input',
    'juejin.cn':
      '#juejin > div.view-container.container > div > header > div > nav > ul > ul > li.search-add > ul > li.nav-item.search > form > input',
    'developer.mozilla.org': '#top-nav-search-input'
  }

  const selector = map[window.location.host]
  const inputDom = document.querySelector(selector)

  if (evt.code === 'F2') {
    inputDom.focus()

    const length = inputDom.value.length
    if (length) {
      inputDom.setSelectionRange(inputDom.value.length, inputDom.value.length)
    }
  }
}
