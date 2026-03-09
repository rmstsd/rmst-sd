import { useEffect, useState } from 'react'

import { clearCookieBtn, getBookMarkUi, toLowercaseBtn } from './utils'

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
      setSelCopy(result.selCopy ?? false)
    })
  }

  async function injectCSS(bool: boolean) {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })

    chrome.tabs.sendMessage(tab.id, { action: 'user-select', inject: bool })
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

        <div className="user-select-inject">
          <span>可选中</span>

          <button onClick={() => injectCSS(true)}>注入</button>
          <button onClick={() => injectCSS(false)}>移除</button>
        </div>

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
