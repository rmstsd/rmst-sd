// 监听 chrome.tabs.sendMessage 发送的消息
chrome.runtime.onMessage.addListener(message => {
  window.localStorage.clear()
  window.sessionStorage.clear()

  chrome.runtime.sendMessage({ domain: document.domain, rootDomain: getRootDomain(document.domain) })

  function getRootDomain(domain) {
    const domainParts = domain.split('.')
    const rootDomain = domainParts[domainParts.length - 2] + '.' + domainParts[domainParts.length - 1]

    return rootDomain
  }
})

// 动态注入脚本
// const script = document.createElement('script')
// script.setAttribute('src', chrome.runtime.getURL('js/send-method.js'))

// document.head.appendChild(script)
//取cookies
