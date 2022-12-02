let isBackquoteDown = false

document.addEventListener('click', () => {
  if (isBackquoteDown) {
    setTimeout(() => {
      window.close()
    }, 500)
  }
})

document.addEventListener('keydown', evt => {
  if (evt.code === 'Backquote' && !isBackquoteDown) isBackquoteDown = true
})
document.addEventListener('keyup', evt => {
  isBackquoteDown = false
})

const selectTexts = []

let ctrlKey = false

document.addEventListener('keydown', evt => {
  if (evt.ctrlKey) ctrlKey = true
})

document.addEventListener('keyup', evt => {
  if (!evt.ctrlKey) {
    ctrlKey = false

    const text = selectTexts.map(item => item.replace('\n', '')).join(' ')

    copyExecCommand(text)

    selectTexts.length = 0
  }
})

document.addEventListener('mouseup', () => {
  const sel = window.getSelection()
  const selectText = sel.toString()

  if (!selectText) return

  if (ctrlKey) {
    selectTexts.push(selectText)
  }
})

async function copyExecCommand(text) {
  function makeError() {
    return new DOMException('The request is not allowed', 'NotAllowedError')
  }

  // Put the text to copy into a <span>
  const span = document.createElement('span')
  span.textContent = text

  // Preserve consecutive spaces and newlines
  span.style.whiteSpace = 'pre'
  span.style.webkitUserSelect = 'auto'
  span.style.userSelect = 'all'

  // Add the <span> to the page
  document.body.appendChild(span)

  // Make a selection object representing the range of text selected by the user
  const selection = window.getSelection()
  const range = window.document.createRange()
  selection.removeAllRanges()
  range.selectNode(span)
  selection.addRange(range)

  // Copy text to the clipboard
  let success = false
  try {
    success = window.document.execCommand('copy')
  } finally {
    // Cleanup
    selection.removeAllRanges()
    window.document.body.removeChild(span)
  }

  if (!success) throw makeError()
}
