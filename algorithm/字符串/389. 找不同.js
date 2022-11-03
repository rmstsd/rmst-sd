
const s = "abcd", t = "abcde"

console.log(findTheDifference(s, t))
function findTheDifference(s, t) {

    function sum(str) {
        return Array.from(str).reduce((acc, item) => acc + item.charCodeAt(), 0)
    }
    return String.fromCharCode(sum(t) - sum(s))
}