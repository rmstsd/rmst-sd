// 这是 rules.json 中定义的那个空的 Zip 文件头
const ZIP_MARKER = 'data:application/zip;base64,UEsFBgAAAAAAAAAAAAAAAAAAAAAAAA=='

chrome.declarativeNetRequest.onRuleMatchedDebug.addListener(info => {
  console.log('拦截成功！详细信息：', info)
  console.log('被拦截的 URL:', info.request.url)
  console.log('触发规则 ID:', info.rule.ruleId)

  // 在这里执行你想要的后台 JS 逻辑
  // 注意：此时请求已经被掐断了，你救不回来了，只能做记录
})

chrome.downloads.onCreated.addListener(downloadItem => {
  // 1. 检查是否是我们触发的重定向下载

  console.log(downloadItem)

  if (downloadItem.finalUrl.startsWith(ZIP_MARKER)) {
    // 2. 立即取消下载

    chrome.downloads.cancel(downloadItem.id, () => {
      if (chrome.runtime.lastError) {
        console.error('Cancel failed:', chrome.runtime.lastError)
      }
    })

    // 3. 从下载历史中抹除（让用户无感知）
    chrome.downloads.erase({ id: downloadItem.id })

    const url = new URL(downloadItem.url)
    url.username = ''

    chrome.tabs.create({ url: url.toString(), active: true })
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
