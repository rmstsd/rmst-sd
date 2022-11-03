// 生成icon文件
function generateFile(svg, background) {
  const svgSize = 48 // 参照 `body -> svg -> symbol` 标签的 `viewBox="0 0 48 48"`
  const expectedSize = 24 // 设计期望的尺寸

  const ratio = svgSize / expectedSize

  const padding = 2 * ratio
  const radius = 6 * ratio

  const iconColor = '#fff'

  const { canvas, ctx } = createCanvas(svgSize)
  const drawParameter = getCanvasDrawParameter(svg)
  ctx.fillStyle = iconColor
  ctx.strokeStyle = iconColor
  drawParameter.forEach(item => {
    ctx.beginPath()
    if (item.type === 'path') {
      ctx.lineCap = item.strokeLinecap
      ctx.lineWidth = item.strokeWidth
      ctx.stroke(new Path2D(item.path))
    } else if (item.type === 'circle') {
      ctx.arc(item.x, item.y, item.r, 0, Math.PI * 2)
      ctx.fill()
    }
  })

  const wrapperSize = svgSize + padding * 2
  const { canvas: wrapperCanvas, ctx: wrapperCtx } = createCanvas(wrapperSize)
  wrapperCtx.fillStyle = background
  fillRoundRect(wrapperCtx, 0, 0, wrapperSize, wrapperSize, radius)
  wrapperCtx.drawImage(canvas, padding, padding, svgSize, svgSize)

  return new Promise(resolve => {
    wrapperCanvas.toBlob(blob => {
      const file = new File([blob], 'icon.png')
      resolve({ file, canvas: wrapperCanvas })
    })
  })
}

// 绘制圆角矩形
function fillRoundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath()
  ctx.moveTo(x + radius, y)
  ctx.lineTo(x + width - radius, y)
  ctx.arc(x + width - radius, y + radius, radius, (Math.PI / 2) * 3, 0)
  ctx.lineTo(x + width, y + height - radius)
  ctx.arc(x + width - radius, y + height - radius, radius, 0, Math.PI / 2)
  ctx.lineTo(x + radius, y + height)
  ctx.arc(x + radius, y + height - radius, radius, Math.PI / 2, Math.PI)
  ctx.lineTo(x, y + radius)
  ctx.arc(x + radius, y + radius, radius, Math.PI, (Math.PI / 2) * 3)
  ctx.fill()
}

function createCanvas(size) {
  const canvas = document.createElement('canvas')
  const dpr = window.devicePixelRatio
  const ctx = canvas.getContext('2d')
  canvas.style.width = `${size}px`
  canvas.style.height = `${size}px`
  canvas.width = size * dpr
  canvas.height = size * dpr
  ctx.scale(dpr, dpr)

  return { canvas, ctx }
}

// 获取 canvas 的绘制参数
const getCanvasDrawParameter = svg => {
  return Array.from(svg.children).map(handleItem)

  function handleItem(elementItem) {
    if (elementItem instanceof SVGPathElement) {
      return {
        type: 'path',
        path: elementItem.getAttribute('d'),
        strokeWidth: Number(elementItem.getAttribute('stroke-width')),
        strokeLinecap: elementItem.getAttribute('stroke-linecap')
        // strokeLinejoin: elementItem.getAttribute('stroke-linejoin')
      }
    }
    if (elementItem instanceof SVGCircleElement) {
      return {
        type: 'circle',
        x: Number(elementItem.getAttribute('cx')),
        y: Number(elementItem.getAttribute('cy')),
        r: Number(elementItem.getAttribute('r'))
      }
    }
  }
}
