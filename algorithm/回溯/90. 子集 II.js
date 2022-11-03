/*

*/

const nums = [1, 2, 2]
// [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]

console.log(calculate(nums))

function calculate(nums) {

    const ans = []
    backTrack([], 0)
    return ans

    function backTrack(stack, startIdx) {
        ans.push(stack)
        for (let i = startIdx; i < nums.length; i++) {
            backTrack(stack.concat(nums[i]), i + 1)
        }
    }
}





//
