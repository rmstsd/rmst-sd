chrome.runtime.onMessageExternal.addListener(message => {
  chrome.tabs.query({}, tabs => {
    const targetTab = tabs.find(item => item.title === '预览')
    if (!targetTab) return

    // 发送到 content_scripts
    chrome.tabs.sendMessage(targetTab.id, message)
  })
})

// chrome.bookmarks.getTree().then(res => {
//   console.log(res[0].children[0].children)
// })

// chrome.contextMenus.create({
//   type: 'normal',
//   title: `注释 换行 复制 '%s'`, //  %s 表示已经选中的文字
//   id: 'mdn',
//   contexts: ['selection']
// })

// 复制文本 自动添加注释 和 换行
chrome.contextMenus.onClicked.addListener(parameter => {
  const { selectionText, menuItemId } = parameter
  console.log(selectionText)

  chrome.tabs.query({}, tabs => {
    console.log(tabs)
    const targetTab = tabs.find(item => item.title === 'Swagger UI')
    if (!targetTab) return
    console.log(targetTab)
    // 发送到 content_scripts
    chrome.tabs.sendMessage(targetTab.id, selectionText)
  })
})
