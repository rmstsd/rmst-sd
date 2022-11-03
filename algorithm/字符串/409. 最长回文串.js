

const s = "bb"

console.log(longestPalindrome(s))
function longestPalindrome(s) {

    const map = new Map()
    for (const v of s) {
        map.set(v, map.has(v) ? map.get(v) + 1 : 1)
    }

    console.log(map)

    let ans = 0
    for (const [ch, count] of map) {
        if (count > 1) {
            ans += count % 2 === 0 ? count : count - 1
        }
    }
    return ans === s.length ? ans : ans + 1
}