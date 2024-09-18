document.addEventListener('copy', evt => {
  const selText = window.getSelection().toString()

  const clipboardData = evt.clipboardData || window.clipboardData

  if (selText && clipboardData) {
    evt.preventDefault()

    clipboardData.setData('text/plain', selText)
  }
})

document.addEventListener('keydown', evt => {
  if (evt.ctrlKey && evt.key === 'c') {
    const selText = window.getSelection().toString()
    navigator.clipboard.writeText(selText)
  }
})
