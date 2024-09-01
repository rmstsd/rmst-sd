const w = ['zZxcvbnm']

console.log(findWords(w))
function findWords(words) {
  const map = {
    one: 'qwertyuiop',
    two: 'asdfghjkl',
    three: 'zxcvbnm'
  }

  return words.filter(x => {
    let flag
    for (const v of x) {
      const low = v.toLowerCase()

      if (!flag) {
        if (map.one.includes(low)) {
          flag = 'one'
        } else if (map.two.includes(low)) {
          flag = 'two'
        } else if (map.three.includes(low)) {
          flag = 'three'
        }
      } else {
        if (!map[flag].includes(low)) return false
      }
    }

    return true
  })
}
