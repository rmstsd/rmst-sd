const count = 72
const srcUrls = []
for (let i = 1; i <= 72; i++) {
  srcUrls.push(`./竖屏壁纸/wallpaper_${i}.png`)
}

function loadImageToMemory() {
  myWorker.postMessage({ event: 'load-to-memory', data: srcUrls })
}

function clickRenderImage() {
  // const p = Promise.all(srcUrls.map(item => loadImage(item)))

  myWorker.postMessage({
    event: 'render-to-off',
    data: { width: window.innerWidth, height: window.innerHeight }
  })
}

const canvas = document.createElement('canvas')
canvas.width = window.innerWidth - 18
canvas.height = window.innerHeight - 18
document.body.appendChild(canvas)

const ctx = canvas.getContext('2d')

function sleep(ms) {
  let t = Date.now()
  while (Date.now() - t < ms) {}
}

const myWorker = new Worker('worker.js')
myWorker.onmessage = e => {
  console.log(e.data)

  ctx.drawImage(e.data, 0, 0)
}

function test() {
  fetch('./竖屏壁纸/wallpaper_1.png')
    .then(v => v.blob())
    .then(b => {
      window.createImageBitmap(b).then(imageBitmap => {
        const width = 400
        const ratio = imageBitmap.width / width
        const height = imageBitmap.height / ratio

        const offC = new OffscreenCanvas(width, height)
        const off_ctx = offC.getContext('2d')
        off_ctx.drawImage(imageBitmap, 0, 0, width, height)

        ctx.drawImage(offC.transferToImageBitmap(), 0, 0)
      })
    })
}
