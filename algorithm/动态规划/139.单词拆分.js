
const s = "catsandog"
const wordDict = ["cats", "dog", "sand", "and", "cat"]

console.log(wordBreak(s, wordDict))

function wordBreak(s, wordDict) {
    const n = s.length
    const dp = new Array(n + 1).fill(false)
    dp[0] = true

    let start = 0
    while (start < s.length) {
        for (let end = start + 1; end <= s.length; end++) {
            const sub = s.slice(start, end)
            console.log(1)
            if (dp[start] && wordDict.includes(sub)) {
                // console.log(start, end, sub)
                dp[end] = true
            }
        }
        start++
    }

    // for (let i = 1; i <= n; i++) {
    //     for (let j = 0; j < i; j++) {
    //         const sub = s.substr(j, i - j)
    //         if (dp[j] && wordDict.includes(sub)) {
    //             console.log(1)
    //             dp[i] = true;
    //             break;
    //         }
    //     }
    // }

    console.log(dp)


    return dp[n]
}