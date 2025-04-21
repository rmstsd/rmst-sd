document.addEventListener('copy', evt => {
  evt.preventDefault()

  const selText = window.getSelection().toString()

  const clipboardData = evt.clipboardData || window.clipboardData

  if (selText && clipboardData) {
    clipboardData.setData('text/plain', replaceNbspToSpace(selText))
  }
})

document.addEventListener('keydown', evt => {
  if ((evt.ctrlKey || evt.altKey) && evt.key === 'c') {
    const selText = window.getSelection().toString()
    navigator.clipboard.writeText(replaceNbspToSpace(selText))
  }
})

const replaceNbspToSpace = text => {
  data = encodeURI(text).replace(/%C2%A0/g, '%20')
  data = decodeURI(data)

  return data
}
