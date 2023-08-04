document.body.classList.add('u')

// 防止 QQ 浏览器 按退格键
document.addEventListener('keydown', evt => {
  if (evt.key === 'Backspace') {
    if (
      evt.target.tagName === 'INPUT' ||
      evt.target.tagName === 'TEXTAREA' ||
      evt.target.hasAttribute('contenteditable')
    ) {
      return
    }

    evt.preventDefault()
  }
})
