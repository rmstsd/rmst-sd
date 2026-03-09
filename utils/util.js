let disableClick = false
document.addEventListener(
  'click',
  evt => {
    if (disableClick) {
      evt.stopPropagation()
    }
  },
  { capture: true }
)

const startDrag = (downEvt, options) => {
  const { onDragStart, onDragMove, onDragEnd, onPointerUp, isDocumentMove } = options

  const abCt = new AbortController()

  const target = isDocumentMove ? document : downEvt.target
  if (!isDocumentMove) {
    target.setPointerCapture(downEvt.pointerId)
  }

  let isMoved = false

  target.addEventListener(
    'pointermove',
    moveEvt => {
      const dis = Math.hypot(moveEvt.clientX - downEvt.clientX, moveEvt.clientY - downEvt.clientY)

      if (!isMoved) {
        if (dis < 10) {
          return
        }
        disableClick = true
        clearWebSelection()

        onDragStart?.(downEvt)
        isMoved = true
      }

      onDragMove?.(moveEvt)
    },
    { signal: abCt.signal }
  )

  const cancel = evt => {
    setTimeout(() => {
      disableClick = false
    })

    abCt.abort()

    if (isMoved) {
      onDragEnd?.(evt)
    } else {
      onPointerUp?.(evt)
    }
  }

  target.addEventListener('pointerup', cancel, { signal: abCt.signal })
  target.addEventListener('pointercancel', cancel, { signal: abCt.signal })
}

function clearWebSelection() {
  const sel = window.getSelection()
  if (sel.rangeCount > 0) sel.removeAllRanges()
}
