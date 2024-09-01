const s = 'PPALLL'

console.log(checkRecord(s))
function checkRecord(s) {
  let aCount = 0
  let lCount = 0
  for (const v of s) {
    if (v === 'A') {
      aCount++
      if (aCount >= 2) return false
    }
    if (v === 'L') {
      lCount++
      if (lCount >= 3) return false
    } else lCount = 0
  }

  return true
}
