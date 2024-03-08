// 打乱数组, 与原位置不一样

const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
const ans = sss(arr)

console.log(arr)
console.log(ans)

console.log(ans.toString() === arr.toString())

function sss(nums) {
  nums = nums.slice()

  const ans = []

  while (nums.length) {
    const randomIndex = Math.floor(Math.random() * nums.length - 1)
    if (ans.length - 1 !== randomIndex) {
      const [pickItem] = nums.splice(randomIndex, 1)

      ans.push(pickItem)
    }
  }

  return ans
}
