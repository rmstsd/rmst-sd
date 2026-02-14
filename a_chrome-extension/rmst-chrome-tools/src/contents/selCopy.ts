import { copyText } from '@/utils'

document.addEventListener('pointerup', () => {
  chrome.storage.local.get('selCopy', result => {
    if (result.selCopy) {
      const selText = window.getSelection().toString()

      if (selText) {
        copyText(selText)
      }
    }
  })
})
