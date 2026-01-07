import type { PlasmoCSConfig } from 'plasmo'

import { replaceNbspToSpace } from '@/util.ts'

export const config: PlasmoCSConfig = {
  world: 'MAIN'
}

document.addEventListener('keydown', evt => {
  if (evt.ctrlKey && evt.key === 's') {
    evt.preventDefault()
  }

  // 阻止 ctrl + d // 会触发收藏书签的默认事件
  if (evt.ctrlKey && evt.key === 'd') {
    evt.preventDefault()
  }

  if (evt.altKey && evt.altKey && evt.key === 'c') {
    evt.preventDefault()

    const selText = window.getSelection().toString()
    if (selText) {
      navigator.clipboard.writeText(replaceNbspToSpace(selText))
    }
  }
})
