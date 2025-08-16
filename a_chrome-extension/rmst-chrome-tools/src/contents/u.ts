export {}

import './u.css'

document.addEventListener('keydown', evt => {
  const target = evt.target as HTMLElement

  if (evt.key === 'Backspace') {
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.hasAttribute('contenteditable')) {
      return
    }

    evt.preventDefault()
  }

  if (evt.ctrlKey && evt.key === 's') {
    evt.preventDefault()
  }

  // 阻止 ctrl + d 会触发收藏书签的默认事件
  if (evt.ctrlKey && evt.key === 'd') {
    evt.preventDefault()
  }
})
