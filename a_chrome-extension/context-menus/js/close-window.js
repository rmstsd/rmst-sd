let isBackquoteDown = false

document.addEventListener('click', () => {
  if (isBackquoteDown) {
    setTimeout(() => {
      window.close()
    }, 500)
  }
})

document.addEventListener('keydown', evt => {
  if (evt.code === 'Backquote' && !isBackquoteDown) isBackquoteDown = true
})
document.addEventListener('keyup', evt => {
  isBackquoteDown = false
})
