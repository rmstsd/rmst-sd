export {}

import { replaceNbspToSpace } from '@/util.ts'

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
    if (selText) {
      navigator.clipboard.writeText(replaceNbspToSpace(selText))
    }
  }
})
