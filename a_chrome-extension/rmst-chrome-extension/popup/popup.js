onload = async () => {
  document.querySelector('.clear-btn').onclick = clearCookieBtn

  document.querySelector('.toLowercase-btn').onclick = toLowercaseBtn

  initBookMarkUi()
}

// 监听 clearStorage.js 发过来的消息
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const { domain } = message

  deleteDomainCookies(domain)
})

async function clearCookieBtn() {
  const [currTab] = await chrome.tabs.query({ active: true, currentWindow: true })

  // 发送到 clearStorage.js
  await chrome.tabs.sendMessage(currTab.id, '自定义消息')

  setTimeout(() => {
    chrome.tabs.reload(currTab.id)
  }, 100)
}

async function deleteDomainCookies(domain) {
  let cookiesDeleted = 0
  try {
    const cookies = await chrome.cookies.getAll({ domain })
    if (cookies.length === 0) {
      return 'No cookies found'
    }
    let pending = cookies.map(deleteCookie)
    await Promise.all(pending)

    cookiesDeleted = pending.length
  } catch (error) {
    return `Unexpected error: ${error.message}`
  }

  return `Deleted ${cookiesDeleted} cookie(s).`

  function deleteCookie(cookie) {
    const protocol = cookie.secure ? 'https:' : 'http:'
    const cookieUrl = `${protocol}//${cookie.domain}${cookie.path}`

    return chrome.cookies.remove({ url: cookieUrl, name: cookie.name, storeId: cookie.storeId })
  }
}

async function initBookMarkUi() {
  const getBookmarks = async () => {
    try {
      const bookmarks = await chrome.bookmarks.getTree()
      return bookmarks[0].children[0].children
    } catch (error) {
      return [{ title: 'JSON', url: 'https://dream-unicorn.github.io/react-json-preview/' }]
    }
  }

  const bms = await getBookmarks()

  const aElement_array = bms.map((item, index) => {
    const url = new URL(item.url)
    const img = document.createElement('img')
    img.src = url.origin + '/favicon.ico'
    img.classList.add('icon')

    const spanEmpty = document.createElement('span')
    spanEmpty.classList.add('icon')
    spanEmpty.textContent = 'x'

    img.onload = () => {
      spanEmpty.remove()
      a.prepend(img)
    }

    const span = document.createElement('span')
    span.innerText = item.title

    const a = document.createElement('a')
    a.href = item.url
    a.target = '_blank'

    a.append(spanEmpty, span)

    return a
  })

  document.querySelector('.bookmark').append(...aElement_array)
}

async function toLowercaseBtn() {
  const [currTab] = await chrome.tabs.query({ active: true })

  chrome.tabs.sendMessage(currTab.id, { evt: 'evt_to-lowercase' })
}
