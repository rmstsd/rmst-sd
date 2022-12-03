const canvas = document.querySelector('.canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

const ctx = canvas.getContext('2d')

document.addEventListener('mouseup', handleMouseup)

function handleMouseup() {
  const sel = window.getSelection()

  const range = sel.getRangeAt(0)

  const { startContainer, startOffset, endContainer, endOffset } = range

  if (range.collapsed) return

  // console.log(range)

  // console.log(getStartAndEndRangeText(startContainer, startOffset, endContainer, endOffset))

  const mrects = Array.from(range.getClientRects())

  console.log(mrects)
  drawRects(mrects)

  return

  const cusRange = createRange(window.getSelection())

  console.log(cusRange)

  if (cusRange) {
    const rects = createRects(cusRange)
    console.log(rects)

    drawRects(rects)
  }
}

// 核心
function createRange(selection) {
  const range = selection.getRangeAt(0)
  if (range.collapsed) return

  const { startContainer: start, startOffset, endContainer: end, endOffset } = range

  if (!isValidTextNode(start) || !isValidTextNode(end)) return null
  debugger
  const sPath = getPath(start) // sPath = [1, 0, 0]
  const ePath = start === end ? sPath : getPath(end)

  if (!sPath || !ePath) return null

  const text = getStartAndEndRangeText(start, startOffset, end, endOffset)

  return {
    id: Math.random(),
    text: selection.toString(),
    start: { path: sPath, offset: startOffset, text: text.start },
    end: { path: ePath, offset: endOffset, text: text.end }
  }
}

// 核心
function createRects(range) {
  const rects = []
  const { start, end } = range
  const startNode = getNodeByPath(start.path) // 文本节点
  const endNode = getNodeByPath(end.path) // 文本节点

  if (!startNode || !endNode || !isValidTextNode(startNode) || !isValidTextNode(endNode)) return []

  if (startNode === endNode) {
    rects.push(...getTextNodeRects(startNode, start.offset, end.offset))
  } else {
    const textNodes = getTextNodesByDfs(startNode, endNode)
    rects.push(...getTextNodeRects(startNode, start.offset))
    textNodes.forEach(i => {
      const nodeRects = getTextNodeRects(i)
      if (nodeRects.length === 1 && (nodeRects[0].width === 0 || nodeRects[0].height === 0)) {
        // 过滤空 Text
      } else {
        rects.push(...nodeRects)
      }
    })
    rects.push(...getTextNodeRects(endNode, 0, end.offset))
  }

  return rects
}

function drawRects(rects) {
  rects.forEach(rect => {
    ctx.fillStyle = 'rgba(255, 0, 0, 0.5)'
    ctx.fillRect(rect.left, rect.top, rect.width, rect.height)
  })
}

root = document.body

// [5, 0]
function getNodeByPath(path) {
  let node = root
  for (let i = 0; i < path.length; i++) {
    if (node?.childNodes?.[path[i]]) {
      node = node.childNodes[path[i]]
    } else {
      return null
    }
  }
  return node
}

function isValidTextNode(node) {
  return root.contains(node) && node.nodeType === 3
}

function getPath(startContainer) {
  // range.startContainer
  const path = [0]
  let parentNode = startContainer.parentNode
  let cur = startContainer

  while (parentNode) {
    if (cur === parentNode.firstChild) {
      if (parentNode === root) {
        break
      } else {
        cur = parentNode
        parentNode = cur.parentNode
        path.unshift(0)
      }
    } else {
      cur = cur.previousSibling
      path[0]++
    }
  }

  return parentNode ? path : null
}

//----------------------------------------------------------------  -------------------------------

// 获取头尾文本节点划词选中内容
function getStartAndEndRangeText(start, startOffset, end, endOffset) {
  let startText = ''
  let endText = ''

  if (start === end) {
    startText = start.textContent ? start.textContent.slice(startOffset, endOffset) : ''
    endText = startText
  } else {
    startText = start.textContent ? start.textContent.slice(startOffset) : ''
    endText = end.textContent ? end.textContent.slice(0, endOffset) : ''
  }

  return {
    start: startText,
    end: endText
  }
}

// 获取文本节点 DOMRect 对象，支持跨行场景
function getTextNodeRects(node, startOffset, endOffset) {
  if (startOffset === undefined) startOffset = 0
  if (endOffset === undefined) endOffset = node.textContent.length

  const range = document.createRange()
  range.setStart(node, startOffset)
  range.setEnd(node, endOffset)
  return Array.from(range.getClientRects())
}

// 获取 range 某个字符位置的 DOMRect
function getCharRect(node, offset) {
  const range = document.createRange()
  range.setStart(node, offset)
  range.setEnd(node, offset + 1 > node.textContent.length ? offset : offset + 1)
  return range.getBoundingClientRect()
}

// 获取 start 到 end 深度优先遍历之间的所有 Text Node 节点
function getTextNodesByDfs(start, end) {
  if (start === end) return []

  const iterator = nodeDfsGenerator(start, false)
  const textNodes = []
  iterator.next()
  let value = iterator.next().value
  while (value && value !== end) {
    if (isTextNode(value)) {
      textNodes.push(value)
    }
    value = iterator.next().value
  }
  if (!value) {
    return []
  }
  return textNodes
}

// 对于有子节点的 Node 会遍历到两次，不过 Text Node 肯定没有子节点，所以不会重复统计到
function* nodeDfsGenerator(node, isGoBack = false) {
  yield node
  // isGoBack 用于判断是否属于子节点遍历结束回退到父节点，如果是那么该节点不再遍历其子节点
  if (!isGoBack && node.childNodes.length > 0) {
    yield* nodeDfsGenerator(node.childNodes[0], false)
  } else if (node.nextSibling) {
    yield* nodeDfsGenerator(node.nextSibling, false)
  } else if (node.parentNode) {
    yield* nodeDfsGenerator(node.parentNode, true)
  }
}

function isTextNode(node) {
  return node.nodeType === 3
}
