function createAnimation(scrollStart, scrollEnd, valueStart, valueEnd) {
  return function (scroll) {
    if (scroll <= scrollStart) {
      return valueStart
    }

    if (scroll >= scrollEnd) {
      return valueEnd
    }

    return valueStart + (valueEnd - valueStart) * ((scroll - scrollStart) / (scrollEnd - scrollStart))
  }
}
