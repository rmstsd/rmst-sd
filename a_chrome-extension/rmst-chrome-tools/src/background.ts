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

chrome.commands.onCommand.addListener(command => {
  console.log(`接收到命令: ${command}，但我不做任何事。`)
  // 这里不写任何逻辑，即可实现“屏蔽”效果
})
