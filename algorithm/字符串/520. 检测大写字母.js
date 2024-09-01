console.log(detectCapitalUse('Lo'))

function detectCapitalUse(word) {
  const wArr = Array.from(word)

  function isChDd(ch) {
    return ch.charCodeAt() >= 65 && ch.charCodeAt() <= 90
  }

  const isDD = wArr.every(x => isChDd(x))
  const isXd = wArr.every(x => !isChDd(x))

  return isDD || isXd || (isChDd(wArr.shift()) && wArr.every(x => !isChDd(x)))
}
