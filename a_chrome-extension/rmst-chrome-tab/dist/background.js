/**
 * Chrome 扩展 background：代为请求联想 API，避免 newtab 页 CORS。
 * 在 manifest 中配置: "background": { "service_worker": "background.js" }
 * 并添加 host_permissions: ["https://suggestqueries.google.com/*"]
 */
const SUGGEST_API = 'https://suggestqueries.google.com/complete/search?client=chrome&q='

function parseSuggestResponse(text) {
  try {
    const parsed = JSON.parse(text)
    if (Array.isArray(parsed) && parsed[1]) return parsed[1]
    return []
  } catch (_) {}
  const match = text.match(/\((\[[\s\S]*\])\)\s*;?\s*$/)
  if (match) {
    try {
      const arr = JSON.parse(match[1])
      return Array.isArray(arr) && arr[1] ? arr[1] : []
    } catch (_) {}
  }
  return []
}

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.type !== 'FETCH_SUGGEST' || typeof message.query !== 'string') {
    sendResponse([])
    return true
  }
  const url = SUGGEST_API + encodeURIComponent(message.query)
  fetch(url)
    .then(r => r.text())
    .then(text => sendResponse(parseSuggestResponse(text)))
    .catch(() => sendResponse([]))
  return true
})
