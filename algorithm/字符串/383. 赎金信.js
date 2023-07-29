const ransomNote = 'aa',
  magazine = 'ab'

console.log(canConstruct(ransomNote, magazine))

function canConstruct(ransomNote, magazine) {
  const chCount = {}
  for (const s of magazine) {
    if (!chCount[s]) chCount[s] = 1
    else chCount[s]++
  }
  console.log(chCount)
  for (const s of ransomNote) {
    if (s in chCount && chCount[s] !== 0) chCount[s]--
    else return false
  }

  return true
}
