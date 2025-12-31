// render-worker.js（Worker线程）

const A = {
  ui: ''
}

self.onmessage = e => {
  console.log(e)

  const canvas = e.data.canvas
  const hhh = canvas.getContext('2d')

  A.ui

  hhh.fillStyle = 'red'
  hhh.fillRect(0, 0, 100, 100)

  // 在Worker中执行绘制（不会阻塞主线程）
  // setInterval(() => {
  //   ctx.fillStyle = 'red'
  //   ctx.beginPath()
  //   ctx.arc(Math.random() * 300, Math.random() * 300, 20, 0, Math.PI * 2)
  //   ctx.fill()
  // }, 100)
}
