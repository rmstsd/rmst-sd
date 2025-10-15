import { useEffect, useState } from 'react'

import './style.less'

function IndexPopup() {
  const [data, setData] = useState<{ item: chrome.bookmarks.BookmarkTreeNode; icon: string }[]>([])
  const [selCopy, setSelCopy] = useState(false)

  useEffect(() => {
    getBookMarkUi().then(data => {
      setData(data)
    })

    updateSelCopy()
  }, [])

  function updateSelCopy() {
    chrome.storage.local.get('selCopy', result => {
      setSelCopy(result.selCopy)
    })
  }

  return (
    <div>
      <div className="bookmark">
        {data.map(item => (
          <a key={item.item.id} href={item.item.url} target="_blank">
            <img className="icon" src={item.icon} />
            <span className="bk-title">{item.item.title}</span>
          </a>
        ))}
      </div>

      <hr />

      <div className="clear-local-data">
        <button className="clear-btn" onClick={clearCookieBtn}>
          清除 Storage
        </button>
        <button className="toLowercase-btn" onClick={toLowercaseBtn}>
          小写
        </button>

        <label className="sel-copy-label">
          <input
            type="checkbox"
            checked={selCopy}
            onChange={e => {
              chrome.storage.local.set({ selCopy: e.target.checked }, () => {
                updateSelCopy()
              })
            }}
          />
          <span>选中即复制</span>
        </label>
      </div>
    </div>
  )
}

export default IndexPopup

function faviconURL(u) {
  const url = new URL(chrome.runtime.getURL('/_favicon/'))
  url.searchParams.set('pageUrl', u)
  url.searchParams.set('size', '32')
  return url.toString()
}

async function getBookMarkUi() {
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

async function clearCookieBtn() {
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

    const cookies = await Promise.all(promises).then(([cookies1, cookies2]) => [...cookies1, ...cookies2])

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

async function toLowercaseBtn() {
  const [currTab] = await chrome.tabs.query({ active: true })

  chrome.tabs.sendMessage(currTab.id, { evt: 'evt_to-lowercase' })
}
