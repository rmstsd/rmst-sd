chrome.runtime.onMessage.addListener(data => {
  if (data.evt === 'evt_to-lowercase') {
    logTextNodes(document.body)
  }
})

function isRenderedElement(element) {
  const computedStyle = getComputedStyle(element)
  return computedStyle.display !== 'none'
}

function logTextNodes(node) {
  if (node.nodeType === Node.TEXT_NODE && isRenderedElement(node.parentNode)) {
    if (getComputedStyle(node.parentNode).getPropertyValue('text-transform') === 'uppercase') {
      node.parentNode.style.textTransform = 'initial'
    }

    if (/^[A-Z _-]+$/.test(node.textContent)) {
      node.textContent = node.textContent.toLowerCase()
    }
  } else if (node.nodeType === Node.ELEMENT_NODE && isRenderedElement(node)) {
    for (let i = 0; i < node.childNodes.length; i++) {
      logTextNodes(node.childNodes[i])
    }
  }
}
