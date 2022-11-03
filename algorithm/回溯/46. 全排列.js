/*

*/

const nums = [1, 2, 3]
// [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]


// 正儿八经的 回溯
console.log(calculate(nums))

function calculate(nums) {
	const ans = []
	const stack = []
	backTrack()
	return ans

	function backTrack() {
		debugger
		if (stack.length === nums.length) ans.push([...stack])
		else {
			for (const v of nums) {
				if (stack.includes(v)) continue
				stack.push(v)
				backTrack()
				stack.pop(v)
			}
		}
	}
}


// 代码量更少的 回溯
// console.log(calculate1(nums))

function calculate1(nums) {
	const ans = []
	backTrack(0, [])
	return ans

	function backTrack(idx, stack) {
		if (idx === nums.length) ans.push([...stack])
		else {
			for (const v of nums) {
				if (stack.includes(v)) continue		// 这怎么就称为剪枝呢 ???
				backTrack(idx + 1, stack.concat(v))
			}
		}
	}
}





//
