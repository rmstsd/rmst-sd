if (window.location.hostname !== 'localhost') {
  document.body.classList.add('rmst-u')
}

document.addEventListener('keydown', evt => {
  if (evt.key === 'Backspace') {
    if (evt.target.tagName === 'INPUT' || evt.target.tagName === 'TEXTAREA' || evt.target.hasAttribute('contenteditable')) {
      return
    }

    evt.preventDefault()
  }

  if (evt.ctrlKey && evt.key === 's') {
    evt.preventDefault()
  }

  // 阻止 ctrl + d 会触发收藏书签的默认事件
  if (evt.ctrlKey && evt.key === 'd') {
    console.log('ctrl + d')
    evt.preventDefault()
  }
})
