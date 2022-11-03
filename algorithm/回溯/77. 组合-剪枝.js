/*
输入：n = 4, k = 2
输出：
[
  [2,4],
  [3,4],
  [2,3],
  [1,2],
  [1,3],
  [1,4],
]
*/

const n = 4,
	k = 4

console.log(calculate(n, k))

function calculate(n, k) {

	const ans = []
	backTrack(1, [])
	return ans

	function backTrack(start, stack) {
	
		if (stack.length === k) ans.push([...stack])
		else {
			// k - stack.length: 总需要的个数 - 已选个数
			const count = n - (k - stack.length) + 1		// 剪枝
			for (let i = start; i <= count; i++) {
				backTrack(i + 1, stack.concat(i))
			}
		}
	}

}





//
