import type { PlasmoCSConfig } from 'plasmo'

export const config: PlasmoCSConfig = {
  css: ['rmst.css']
}

let style = document.createElement('style')

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'user-select') {
    if (request.inject) {
      document.head.appendChild(style)
      style.textContent = `
        * {
          user-select: auto !important;
        }
      `
    } else {
      style.remove()
    }
  }
})
