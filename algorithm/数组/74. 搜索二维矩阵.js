// @ts-check

const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

// console.log(calc(arr, 11))

/**
 * @param {number[]} nums
 * @param {number} target
 * @returns {number}
 */
function calc(nums, target) {
  let start = 0
  let end = nums.length - 1

  while (start <= end) {
    const mid = Math.floor((end - start) / 2) + start
    const num = nums[mid]

    if (target === num) return mid
    else if (target > num) start = mid + 1
    else end = mid - 1
  }

  return -1
}

const matrix = [
  [1, 3, 5, 7],
  [10, 11, 16, 20],
  [23, 30, 34, 60]
]
const target = 11

console.log(calcMatrix(matrix, target))

/**
 * @param {number[][]} matrix
 * @param {number} target
 * @returns {boolean}
 */
function calcMatrix(matrix, target) {
  const rowIndex = findRow(matrix, target)
  if (rowIndex === -1) return false
  console.log(rowIndex)
  return findIndex(matrix[rowIndex], target)

  // 找 target 在哪一行
  function findRow(matrix, target) {
    let start = 0
    let end = matrix.length - 1
    while (start <= end) {
      const mid = Math.floor((end - start) / 2) + start
      const rowArray = matrix[mid]
      if (target <= rowArray[0]) start = mid - 1
      else end = mid - 1
    }
    console.log(start)
    return -1
  }

  function findIndex(rowArray, target) {
    let start = 0
    let end = rowArray.length - 1
    while (start <= end) {
      const mid = Math.floor((end - start) / 2) + start
      if (target === rowArray[mid]) return true
      else if (target > rowArray[mid]) start = mid + 1
      else end = mid - 1
    }

    return false
  }
}
