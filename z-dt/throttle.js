// 节流

const delay = 3000

{
  // 头
  const throttlePanel = document.querySelector('.throttle-panel-leading')
  let throttleCount = 0
  throttlePanel.textContent = throttleCount

  function addCount() {
    throttleCount++
    throttlePanel.textContent = throttleCount
  }

  let lastTime = 0
  throttlePanel.addEventListener('pointermove', () => {
    const currentTime = Date.now()

    if (currentTime - lastTime > delay) {
      addCount()
      lastTime = currentTime
    }
  })
}

{
  // 尾
  const throttlePanel = document.querySelector('.throttle-panel-trailing')
  let throttleCount = 0
  throttlePanel.textContent = throttleCount

  function addCount() {
    throttleCount++
    throttlePanel.textContent = throttleCount
  }

  let timer = null
  throttlePanel.addEventListener('pointermove', () => {
    if (timer) {
      return
    }

    timer = setTimeout(() => {
      timer = null

      addCount()
    }, delay)
  })
}

{
  // 头 + 尾
  const throttlePanel = document.querySelector('.throttle-panel-leading-trailing')
  let throttleCount = 0
  throttlePanel.textContent = throttleCount

  function addCount() {
    throttleCount++
    throttlePanel.textContent = throttleCount
  }

  let lastTime = 0
  let timer = null

  throttlePanel.addEventListener('pointermove', () => {
    const currentTime = Date.now()
    const remain = delay - (currentTime - lastTime)
    if (remain <= 0) {
      lastTime = currentTime
      if (timer) {
        clearTimeout(timer)
        timer = null
      }

      addCount()
    } else if (!timer) {
      timer = setTimeout(() => {
        lastTime = Date.now()
        timer = null

        addCount()
      }, remain)
    }
  })
}
