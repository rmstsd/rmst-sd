let copyLinkNameLastTarget = null
document.addEventListener(
  'contextmenu',
  event => {
    const eventPath = event.composedPath()
    for (const node of eventPath) {
      if (node.nodeName != null && node.nodeName.toLowerCase() === 'a') {
        copyLinkNameLastTarget = node
        return
      }
    }
    copyLinkNameLastTarget = null
  },
  /* capture= */ true
)

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message === 'copy' && copyLinkNameLastTarget != null) {
    console.log('copyLinkNameLastTarget.innerText', copyLinkNameLastTarget.innerText)

    navigator.clipboard.writeText(replaceNbspToSpace(copyLinkNameLastTarget.innerText))
  }
  sendResponse()
})
