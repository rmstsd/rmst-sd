function createAnimation(scrollStart, scrollEnd, valueStart, valueEnd, halfMode = false) {
  const third_half = (scrollEnd - scrollStart) / 3

  return function (scroll) {
    if (halfMode) {
      if (scroll <= scrollStart) {
        return valueStart
      }

      if (scroll >= scrollEnd) {
        return valueStart
      }

      if (scrollStart + third_half < scroll && scroll < scrollEnd - third_half) {
        return valueEnd
      }

      if (scroll <= scrollStart + third_half) {
        return valueStart + (valueEnd - valueStart) * ((scroll - scrollStart) / third_half)
      }

      return valueEnd - ((valueEnd - valueStart) * (scroll - (scrollEnd - third_half))) / third_half
    } else {
      if (scroll <= scrollStart) {
        return valueStart
      }

      if (scroll >= scrollEnd) {
        return valueEnd
      }

      return valueStart + (valueEnd - valueStart) * ((scroll - scrollStart) / (scrollEnd - scrollStart))
    }
  }
}
