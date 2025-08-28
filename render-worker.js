// render-worker.js（Worker线程）
self.onmessage = e => {
  console.log(e)

  const canvas = e.data.canvas
  const ctx = canvas.getContext('2d')

  ctx.fillStyle = 'red'
  ctx.fillRect(0, 0, 100, 100)

  // 在Worker中执行绘制（不会阻塞主线程）
  // setInterval(() => {
  //   ctx.fillStyle = 'red'
  //   ctx.beginPath()
  //   ctx.arc(Math.random() * 300, Math.random() * 300, 20, 0, Math.PI * 2)
  //   ctx.fill()
  // }, 100)
}
