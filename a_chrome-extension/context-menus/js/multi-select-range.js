;(() => {
  return
  const selectTexts = []

  let altKey = false

  let rects = []

  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  const style = {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    zIndex: 999,
    pointerEvents: 'none'
  }

  Object.keys(style).forEach(key => {
    canvas.style[key] = style[key]
  })
  canvas.width = document.body.clientWidth
  canvas.height = document.body.clientHeight

  document.body.append(canvas)

  function ctxClearRect() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }

  window.addEventListener('resize', () => {
    canvas.width = document.body.clientWidth
    canvas.height = document.body.clientHeight

    drawRects(rects)
  })

  function drawRects(rects) {
    ctxClearRect()

    rects.forEach(rect => {
      ctx.fillStyle = 'rgba(255, 0, 0, 0.5)'
      ctx.fillRect(rect.left + window.pageXOffset, rect.top + window.pageYOffset, rect.width, rect.height)
    })
  }

  // ----------------------------------------------------------------
  document.addEventListener('keydown', evt => {
    if (evt.altKey) altKey = true
  })

  document.addEventListener('keyup', evt => {
    if (altKey && selectTexts.length) {
      altKey = false

      const text = selectTexts.map(item => item.replace('\n', '')).join(' ')

      copyExecCommand(text)

      selectTexts.length = 0
      rects = []
      ctxClearRect()
    }
  })

  document.addEventListener('mouseup', () => {
    if (altKey) {
      const sel = window.getSelection()
      if (sel.isCollapsed) return

      const range = sel.getRangeAt(0)
      if (range.collapsed) return

      const selectText = sel.toString()
      selectTexts.push(selectText)

      rects.push(...Array.from(range.getClientRects()))
      drawRects(rects)

      sel.removeAllRanges()
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
})()
