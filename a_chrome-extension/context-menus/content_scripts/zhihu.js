const timer = setInterval(() => {
  const dom = document.querySelector('.Modal-wrapper')

  if (dom) {
    dom?.remove()
    clearInterval(timer)
  }
}, 10)
