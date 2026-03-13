import type { PlasmoCSConfig } from 'plasmo'

import { replaceNbspToSpace } from '@/utils'

export const config: PlasmoCSConfig = {
  world: 'MAIN'
}

document.addEventListener('keydown', evt => {
  if (evt.altKey && evt.altKey && evt.key === 'c') {
    evt.preventDefault()

    const selText = window.getSelection().toString()
    if (selText) {
      navigator.clipboard.writeText(replaceNbspToSpace(selText))
    }
  }

  // alt + F
  if (evt.altKey && evt.keyCode === 70) {
    evt.preventDefault()
  }
})

document.addEventListener('keyup', function (event) {
  if (event.altKey) {
    event.preventDefault()
  }
})
