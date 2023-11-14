function createContextMenus() {
  const linkMap = {
    google: 'https://www.google.com.hk/search?safe=strict&hl=zh-CN&q=',
    mdn: 'https://developer.mozilla.org/zh-CN/search?q='
  }

  const menuArray = [
    {
      type: 'normal',
      title: `谷歌 > '%s'`, //  %s 表示已经选中的文字
      id: 'google',
      contexts: ['selection']
    }
    // {
    //   type: 'normal',
    //   title: `MDN > '%s'`, //  %s 表示已经选中的文字
    //   id: 'mdn',
    //   contexts: ['selection']
    // }
  ]

  menuArray.forEach(item => chrome.contextMenus.create(item))

  chrome.contextMenus.onClicked.addListener(parameter => {
    const { selectionText, menuItemId } = parameter
    const link = linkMap[menuItemId]

    chrome.tabs.create({ url: link + selectionText })
  })
}
createContextMenus()

chrome.runtime.onInstalled.addListener(() => {})
