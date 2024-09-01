// @ts-check
const grid = [
  ['1', '1', '0', '1', '0'],
  ['1', '1', '0', '1', '0'],
  ['1', '1', '0', '0', '0'],
  ['0', '0', '0', '0', '0']
]

console.log(numIslands(grid))
function numIslands(grid) {
  const m = grid.length,
    n = grid[0].length

  let count = 0
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === '1') {
        count++
        dfs(i, j)
      }
    }
  }
  return count

  function dfs(x, y) {
    if (x < 0 || x > m - 1) return
    if (y < 0 || y > n - 1) return
    if (grid[x][y] !== '1') return

    grid[x][y] = 0

    dfs(x - 1, y)
    dfs(x, y - 1)
    dfs(x + 1, y)
    dfs(x, y + 1)
  }
}
