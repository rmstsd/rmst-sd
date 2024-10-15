// 节流

const delay = 2000

{
  // 头
  const throttlePanel = document.querySelector('.throttle-panel-leading')
  let throttleCount = 0
  throttlePanel.textContent = throttleCount
  function addCount() {
    throttleCount++
    throttlePanel.textContent = throttleCount
  }

  {
    let lastTime = 0
    throttlePanel.addEventListener('pointermove', () => {
      const currentTime = Date.now()

      if (currentTime - lastTime >= delay) {
        lastTime = currentTime

        addCount()
      }
    })
  }
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

  {
    let isHasTask = false
    throttlePanel.addEventListener('pointermove', () => {
      if (isHasTask) {
        return
      }

      isHasTask = true
      setTimeout(() => {
        isHasTask = false

        addCount()
      }, delay)
    })
  }
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

  {
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
          lastTime = 0
          timer = null

          addCount()
        }, remain)
      }
    })
  }
}
