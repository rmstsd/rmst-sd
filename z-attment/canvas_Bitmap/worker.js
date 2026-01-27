onmessage = evt => {
  const { event, data } = evt.data

  switch (event) {
    case 'load-to-memory': {
      const srcUrls = data
      loadImageToMemory(srcUrls)
      break
    }

    case 'render-to-off': {
      console.log('worker render')

      const { width, height } = data

      const offC = new OffscreenCanvas(width, height)
      const off_ctx = offC.getContext('2d')

      ;(async () => {
        for (let i = 0; i < imgBlobs.length; i++) {
          const imgBlobItem = imgBlobs[i]
          const index = i

          const imageBitmap = await self.createImageBitmap(imgBlobItem)
          off_ctx.drawImage(imageBitmap, index * 32, 0, 30, 30)
        }

        self.postMessage(offC.transferToImageBitmap())
      })()

      break
    }

    default: {
      break
    }
  }
}

const imgBlobs = []

function loadImageToMemory(srcUrls) {
  srcUrls.forEach(item => {
    fetch(item)
      .then(res => res.blob())
      .then(b => {
        imgBlobs.push(b)
      })
  })
}
