

const nums = [3, 2, 2, 3, 4, 5], val = 3

console.log(removeElement(nums, val))

function removeElement(nums, val) {

    let k = 0
    debugger
    for (let i = 0; i < nums.length; i++) {
        const curr = nums[i]
        if (curr !== val) {
            nums[k] = curr
            k++
        }
    }

    console.log(nums)

    return k
}


