// 监听 chrome.tabs.sendMessage 发送的消息
chrome.runtime.onMessage.addListener(message => {
  // window.localStorage.clear()
  // window.sessionStorage.clear()
  // window.location.reload()
})

// const script = document.createElement('script')
// // 绝对路径, 扩展根目录
// script.setAttribute('src', chrome.runtime.getURL('js/send-method.js'))

// document.head.appendChild(script)
//取cookies
