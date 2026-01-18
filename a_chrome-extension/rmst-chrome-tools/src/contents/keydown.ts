import type { PlasmoCSConfig } from 'plasmo'

import { replaceNbspToSpace } from '@/util.ts'

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
})
