/*

*/

const nums = [1, 1, 2]

console.log(calculate(nums))

function calculate(nums) {
	const len = nums.length

	nums.sort((x, y) => x - y)
	const used = new Array(len).fill(false)

	const ans = []
	backtrack([])
	return ans

	function backtrack(stack) {

		if (stack.length === len) ans.push([...stack])
		else {
			for (let i = 0; i < len; i++) {
				const curr = nums[i],
					prev = nums[i - 1]

				if (used[i] || (curr === prev && used[i - 1] === false)) continue

				used[i] = true
				backtrack(stack.concat(curr))
				used[i] = false
			}
		}

	}

}





//
