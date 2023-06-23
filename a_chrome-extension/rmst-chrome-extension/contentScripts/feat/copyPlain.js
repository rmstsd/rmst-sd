document.addEventListener('copy', evt => {
  const selText = window.getSelection().toString()

  const clipboardData = evt.clipboardData || window.clipboardData

  if (selText && clipboardData) {
    evt.preventDefault()

    clipboardData.setData('text/plain', selText)
  }
})
