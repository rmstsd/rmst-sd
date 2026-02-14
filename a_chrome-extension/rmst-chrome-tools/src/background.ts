export {}

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'copy-link-name',
    title: '复制链接文字',
    contexts: ['link']
  })
})

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'copy-link-name') {
    chrome.tabs.sendMessage(tab.id, 'copy', { frameId: info.frameId }, () => {})
  }
})

chrome.commands.onCommand.addListener(command => {
  console.log(`接收到命令: ${command}，但我不做任何事。`)
  // 这里不写任何逻辑，即可实现“屏蔽”效果
})

updateBookmarkUrl()

chrome.runtime.onStartup.addListener(() => {
  console.log('onStartup')

  updateBookmarkUrl()
})

{
  // 这是 rules.json 中定义的那个空的 Zip 文件头
  const ZIP_MARKER = 'data:application/zip;base64,UEsFBgAAAAAAAAAAAAAAAAAAAAAAAA=='
  chrome.downloads.onCreated.addListener(async downloadItem => {
    console.log('downloadItem', downloadItem)

    if (downloadItem.finalUrl.startsWith(ZIP_MARKER)) {
      // 2. 立即取消下载
      chrome.downloads.cancel(downloadItem.id, () => {
        if (chrome.runtime.lastError) {
          console.error('Cancel failed:', chrome.runtime.lastError)
        }
      })
      // 3. 从下载历史中抹除（让用户无感知）
      chrome.downloads.erase({ id: downloadItem.id })

      const targetUrl = downloadItem.url
      if (!targetUrl.startsWith('http')) {
        return
      }

      const url = new URL(targetUrl)
      url.username = ''

      // 查询当前窗口中处于活动状态的标签页
      let [tab] = await chrome.tabs.query({ active: true, currentWindow: true })

      if (tab) {
        console.log('当前标签页的索引是:', tab.index)
        chrome.tabs.create({ url: url.toString(), active: true, index: tab.index + 1 })
      }

      return

      // 4. 解析原始 URL
      // 我们在 rules.json 里构造的格式是: ...zip?originalUrl=https://example.com
      // 注意：由于 regexSubstitution 是直接拼接，所以我们取参数之后的所有字符
      const paramKey = '?originalUrl='
      const splitIndex = downloadItem.url.indexOf(paramKey)

      if (splitIndex !== -1) {
        const originalUrl = downloadItem.url.substring(splitIndex + paramKey.length)

        // 5. 在新标签页打开原始链接
        if (originalUrl) {
          chrome.tabs.create({ url: originalUrl, active: true })
        }
      }
    }
  })

  chrome.declarativeNetRequest.onRuleMatchedDebug.addListener(info => {
    // console.log('拦截成功！详细信息：', info)
    // console.log('被拦截的 URL:', info.request.url)
    // console.log('触发规则 ID:', info.rule.ruleId)
    // 在这里执行你想要的后台 JS 逻辑
    // 注意：此时请求已经被掐断了，你救不回来了，只能做记录
  })

  chrome.bookmarks.onCreated.addListener((id, bookmark) => {
    if (bookmark.url) {
      console.log('这是一个网页书签')
      let newUrl = new URL(bookmark.url)
      newUrl.username = 'rmst'

      chrome.bookmarks.update(bookmark.id, { url: newUrl.toString() }, updated => {})
    } else {
      console.log('这是一个新文件夹')
    }
  })

  chrome.webNavigation.onBeforeNavigate.addListener(details => {})
}

// 修正书签链接
function updateBookmarkUrl() {
  chrome.bookmarks.getTree(treeNodes => {
    console.log(treeNodes) // 遍历这个树来找到你需要的节点

    // dfs 深度遍历  treeNodes children， 打印书签
    dfs(treeNodes)
    function dfs(treeNodes) {
      treeNodes.forEach(node => {
        if (node.title && node.url) {
          let newUrl = new URL(node.url)
          newUrl.username = 'rmst'

          if (newUrl.hostname === 'bookmarks-evz.pages.dev') {
            const tt = newUrl.searchParams.get('url')
            console.log(decodeURIComponent(tt))
            newUrl = new URL(decodeURIComponent(tt))
          }

          chrome.bookmarks.update(node.id, { url: newUrl.toString() }, updated => {})
        }
        if (node.children) {
          dfs(node.children)
        }
      })
    }
  })
}
