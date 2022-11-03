

const m = 3, n = 7

calc(m, n)

function calc(m, n) {
    const dp = Array.from({ length: m }, () => new Array(n).fill(null))
    for (let i = 0; i < m; i++) dp[i][0] = 1
    for (let j = 0; j < n; j++) dp[0][j] = 1
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
        }
    }
    return dp[m - 1][n - 1]
}
