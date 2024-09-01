const s = 'abcd',
  t = 'wwer'

console.log(isIsomorphic(s, t))
function isIsomorphic(s, t) {
  const sMap = new Map()
  const tMap = new Map()

  for (const [idx, sVal] of Array.from(s).entries()) {
    const tVal = t[idx]

    if ((sMap.has(sVal) && sMap.get(sVal) !== tVal) || (tMap.has(tVal) && tMap.get(tVal) !== sVal))
      return false

    sMap.set(sVal, tVal)
    tMap.set(tVal, sVal)
  }

  console.log(sMap, tMap)

  return true
}
