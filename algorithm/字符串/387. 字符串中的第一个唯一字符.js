

const s = "dddccdbba"

console.log(firstUniqChar(s))
function firstUniqChar(s) {

    for (const v of s) {
        const idx = s.indexOf(v)
        if (idx === s.lastIndexOf(v)) {
            return idx
        }
    }

    return -1
}