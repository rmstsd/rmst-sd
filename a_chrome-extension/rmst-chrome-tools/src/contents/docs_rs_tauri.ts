import type { PlasmoCSConfig } from 'plasmo'

export const config: PlasmoCSConfig = {
  matches: ['https://docs.rs/tauri/*']
}

window.addEventListener('load', () => {
  update()
})

window.addEventListener('hashchange', () => {
  update()
})

const update = () => {
  const aList = document.querySelectorAll('a')
  aList.forEach(a => {
    a.style.backgroundColor = ''
  })

  const a = document.querySelector(`a[href="${window.location.hash}"]`) as HTMLElement
  if (a) {
    a.style.backgroundColor = '#eae97c'
    ;(a as any).scrollIntoViewIfNeeded?.()
  }
}
