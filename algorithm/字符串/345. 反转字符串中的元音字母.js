const s = 'aA'
console.log(reverseVowels(s))

function reverseVowels(s) {
  const yy = 'aeiou'

  const sArr = s.split('')

  let left = 0,
    right = sArr.length - 1

  while (left <= right) {
    const leftCh = sArr[left]
    const rightCh = sArr[right]
    const isLeftYy = yy.includes(leftCh.toLowerCase())
    const isRightYy = yy.includes(rightCh.toLowerCase())

    if (isLeftYy && isRightYy) {
      ;[sArr[left], sArr[right]] = [sArr[right], sArr[left]]
      left++
      right--
    } else if (!isLeftYy && !isRightYy) {
      left++
      right--
    } else if (isLeftYy && !isRightYy) {
      right--
    } else if (!isLeftYy && isRightYy) {
      left++
    }
  }

  return sArr.join('')
}
