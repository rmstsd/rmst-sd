// console.log('content_scripts-json')

// 监听 chrome.tabs.sendMessage 发送的消息
chrome.runtime.onMessage.addListener(message => {
  window.postMessage({ type: 'json-preview', value: message })

  copyToClipboard(message)
})

const copyToClipboard = str => {
  const el = document.createElement('textarea')
  el.value = str
  document.body.appendChild(el)
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
}
