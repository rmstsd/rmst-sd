function faviconURL(u) {
  const url = new URL(chrome.runtime.getURL('/_favicon/'))
  url.searchParams.set('pageUrl', u)
  url.searchParams.set('size', '32')
  return url.toString()
}

export async function getBookMarkUi() {
  const getBookmarks = async () => {
    const bookmarks = await chrome.bookmarks.getTree()
    return bookmarks[0].children[0].children
  }
  const bms = await getBookmarks()

  return bms.map(item => ({ item, icon: faviconURL(item.url) }))
}

// 监听 clearStorage.js 发过来的消息
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const { domain, rootDomain } = message

  deleteDomainCookies(domain, rootDomain)
})

export async function clearCookieBtn() {
  const [currTab] = await chrome.tabs.query({
    active: true,
    currentWindow: true
  })

  // 发送到 clearStorage.js
  await chrome.tabs.sendMessage(currTab.id, '自定义消息')

  setTimeout(() => {
    chrome.tabs.reload(currTab.id)
  }, 100)
}

async function deleteDomainCookies(domain, rootDomain) {
  let cookiesDeleted = 0

  console.log(domain, rootDomain)
  try {
    const promises = [chrome.cookies.getAll({ domain })]
    if (rootDomain && rootDomain !== domain && rootDomain.includes('.')) {
      promises.push(chrome.cookies.getAll({ domain: rootDomain }))
    }

    const cookies = await Promise.all(promises).then(([cookies1, cookies2]) => {
      return [...(cookies1 ?? []), ...(cookies2 ?? [])]
    })

    if (cookies.length === 0) {
      return 'No cookies found'
    }
    let pending = cookies.map(deleteCookie)
    await Promise.all(pending)

    cookiesDeleted = pending.length
  } catch (error) {
    console.error(`Unexpected error: ${error.message}`)
  }

  return `Deleted ${cookiesDeleted} cookie(s).`

  function deleteCookie(cookie) {
    const protocol = cookie.secure ? 'https:' : 'http:'
    const cookieUrl = `${protocol}//${cookie.domain}${cookie.path}`

    return chrome.cookies.remove({
      url: cookieUrl,
      name: cookie.name,
      storeId: cookie.storeId
    })
  }
}

export async function toLowercaseBtn() {
  const [currTab] = await chrome.tabs.query({ active: true })

  chrome.tabs.sendMessage(currTab.id, { evt: 'evt_to-lowercase' })
}
