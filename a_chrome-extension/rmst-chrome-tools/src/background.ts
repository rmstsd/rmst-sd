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
