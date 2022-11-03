// @ts-check
const s = 'D'
// [abc, Abc, aBc, abC, ABc, AbC, aBC, ABC]

calc(s)

/**
 * @param {string} s 
 */
function calc(s) {
    const ans = []

    const sArray = s.split('').map(x => x.toLowerCase())
    console.log(sArray)

    let upperCount = 0
    while (upperCount <= sArray.length) {

        if (upperCount === 0) ans.push(sArray.join(''))
        else {
            const allIndexArray = pick(upperCount)
            const aas = allIndexArray.map(indexArrayItem =>
                sArray.reduce((acc, item, idx) =>
                    acc.concat(indexArrayItem.includes(idx) ? item.toUpperCase() : item), '')
            )
            ans.push(...aas)
        }
        upperCount++
    }

    console.log(ans)
    return ans

    function pick(upperCount) {
        const ans = []
        backTrack(0, [])
        return ans

        function backTrack(idx, indexArray) {
            if (indexArray.length === upperCount) {
                ans.push(indexArray)
                return
            }
            for (let i = idx; i < sArray.length; i++) {
                if (Number.isInteger(Number(sArray[i]))) continue
                backTrack(i + 1, indexArray.concat(i))
            }
        }
    }

}
