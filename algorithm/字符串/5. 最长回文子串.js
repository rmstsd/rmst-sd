const s = 'babad'
// 输出："bab"

console.log(longestPalindrome(s))

function longestPalindrome(s) {
  const len = s.length

  let start = 0
  let end = 0

  for (let i = 0; i < len; i++) {
    const [left_1, right_1] = diffuse(i, i)
    const [left_2, right_2] = diffuse(i, i + 1)

    if (right_1 - left_1 > end - start) {
      start = left_1
      end = right_1
    }

    if (right_2 - left_2 > end - start) {
      start = left_2
      end = right_2
    }
  }

  return s.slice(start, end + 1)

  function diffuse(left, right) {
    while (left >= 0 && right <= len - 1 && s.charAt(left) == s.charAt(right)) {
      --left
      ++right
    }
    return [left + 1, right - 1]
  }
}
