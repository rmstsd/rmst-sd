let canvas
let ctx
let rects

onmessage = function (evt) {
  const data = evt.data

  switch (data.action) {
    case 'init': {
      init({})
      break
    }
    case 'scale': {
      draw({ scale: data.scale, tx: data.tx, ty: data.ty })
      break
    }
    case 'translate': {
      draw({ tx: data.tx, ty: data.ty, scale: data.scale })
      break
    }

    default: {
      console.error('未匹配', value)
      break
    }
  }

  function init() {
    canvas = data.canvas
    ctx = canvas.getContext('2d')

    rects = Array.from({ length: 2_0000 }).map((_, i) => ({
      x: Math.floor(Math.random() * canvas.width),
      y: Math.floor(Math.random() * canvas.height),
      w: Math.floor(Math.random() * 10),
      h: Math.floor(Math.random() * 10),
      color: randomColor()
    }))

    draw()
  }

  function draw({ scale, tx, ty } = {}) {
    scale = scale || 1
    tx = tx || 0
    ty = ty || 0

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.save()
    ctx.translate(tx, ty)

    ctx.translate(canvas.width / 2, canvas.height / 2)
    ctx.scale(scale, scale)
    ctx.translate(-canvas.width / 2, -canvas.height / 2)

    rects.forEach(({ x, y, w, h, color }) => {
      ctx.fillStyle = color
      ctx.fillRect(x, y, w, h)
    })

    ctx.restore()
  }
}

function randomColor() {
  const r = Math.floor(Math.random() * 256)
  const g = Math.floor(Math.random() * 256)
  const b = Math.floor(Math.random() * 256)
  return `rgb(${r}, ${g}, ${b})`
}
