// 防抖

const delay = 1000

{
  // 头
  const debouncePanel = document.querySelector('.debounce-panel-leading')
  let debounceCount = 0
  debouncePanel.textContent = debounceCount

  function addCount() {
    debounceCount++
    debouncePanel.textContent = debounceCount
  }

  let timer
  debouncePanel.addEventListener('pointermove', () => {
    if (!timer) {
      addCount()
    }

    clearTimeout(timer)
    timer = setTimeout(() => {
      timer = null
    }, delay)
  })
}

{
  // 尾
  const debouncePanel = document.querySelector('.debounce-panel-trailing')
  let debounceCount = 0
  debouncePanel.textContent = debounceCount

  function addCount() {
    debounceCount++
    debouncePanel.textContent = debounceCount
  }

  let timer
  debouncePanel.addEventListener('pointermove', () => {
    clearTimeout(timer)

    timer = setTimeout(() => {
      addCount()
    }, delay)
  })
}
