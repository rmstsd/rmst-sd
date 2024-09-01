import React from 'react'
import ReactDom from 'react-dom'

import ContextMenu from './ContextMenu'
import './contextMenu.less'

type UShowContextMenu = (
  evt: MouseEvent,
  list: { key: string; title: string }[],
  onClick: (key: string) => void
) => void

export const showContextMenu: UShowContextMenu = (evt, list, onClick) => {
  let el: HTMLDivElement | null = document.querySelector('.context-menu-container')

  if (!el) {
    el = document.createElement('div')
    el.className = 'context-menu-container'
    document.body.append(el)

    document.body.onclick = () => {
      remove()
    }
  }

  const remove = () => {
    ReactDom.unmountComponentAtNode(el as Element)
  }

  const { clientX, clientY } = evt
  el.style.left = clientX + 'px'
  el.style.top = clientY + 'px'
  ReactDom.render(React.createElement(ContextMenu, { evt, list, onClick, remove }), el)
}
