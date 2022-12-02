// @ts-check
const rect_A = document.querySelector('.rect_A')
const rect_B = document.querySelector('.rect_B')

addDrag(rect_A)
addDrag(rect_B)

function addDrag(el) {
  function handleMove(evt) {
    evt.preventDefault()
    const { clientX, clientY } = evt

    el.style.left = clientX - an.left + 'px'
    el.style.top = clientY - an.top + 'px'
  }

  let an = { left: 0, top: 0 }
  el.addEventListener('mousedown', evt => {
    const { clientX, clientY } = evt

    const rectB = el?.getBoundingClientRect()
    an = { left: clientX - rectB.left, top: clientY - rectB.top }

    document.addEventListener('mousemove', handleMove)
  })

  document.addEventListener('mouseup', () => {
    document.removeEventListener('mousemove', handleMove)
  })
}
