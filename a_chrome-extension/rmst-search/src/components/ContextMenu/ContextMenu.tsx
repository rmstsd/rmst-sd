import { FC } from 'react'
import { Menu } from 'antd'

import { MenuClickEventHandler } from 'rc-menu/lib/interface'

export interface UProps {
  evt: MouseEvent
  list: { key: string; title: string }[]
  onClick: (key: string) => void
  remove: Function
}
const ContextMenu: FC<UProps> = ({ evt: { clientX, clientY }, list, onClick, remove }) => {
  const menuClick: MenuClickEventHandler = ({ key }) => {
    onClick(key)
    remove()
  }

  return (
    <Menu selectable={false} onClick={menuClick} style={{ left: clientX, top: clientY }}>
      {list.map(item => (
        <Menu.Item key={item.key}>{item.title}</Menu.Item>
      ))}
    </Menu>
  )
}

export default ContextMenu
