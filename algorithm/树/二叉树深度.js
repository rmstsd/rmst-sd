// 最大深度
function maxDepth(tree) {
  if (tree === null) return 0
  const leftCount = maxDepth(tree.left)
  const rightCount = maxDepth(tree.right)
  return Math.max(leftCount, rightCount) + 1
}

// console.log(maxDepth(tree))

// 最大深度 层序遍历
// console.log(maxDepthIter(tree))
function maxDepthIter(node) {
  if (node === null) return 0
  let depth = 0

  const queue = []
  queue.push(node)

  const ans = []

  while (queue.length) {
    depth++

    const length = queue.length
    for (let i = 0; i < length; i++) {
      const head = queue.shift()
      if (head.left !== null) queue.push(head.left)
      if (head.right !== null) queue.push(head.right)

      ans.push(head.val)
    }
  }

  console.log(ans)

  return depth
}

// ----------------------------------------------------------------------------------------------------

// 最小深度
// console.log(minDepth(tree))
function minDepth(node) {
  if (node === null) return 0

  const leftDepth = minDepth(node.left)
  const rightDepth = minDepth(node.right)

  if (node.left === null && node.right !== null) return 1 + rightDepth
  if (node.left !== null && node.right === null) return 1 + leftDepth

  const ans = 1 + Math.min(leftDepth, rightDepth)
  return ans
}

// 最小深度 迭代法
console.log(minDepthIterate(tree))
function minDepthIterate(node) {
  if (!node) return 0

  const queue = [node]
  let ans = 0

  while (true) {
    let length = queue.length
    ans++

    while (length--) {
      const node = queue.shift()

      // 如果到达第一个叶子节点 返回
      if (node.left === null && node.right === null) return ans
      node.left !== null && queue.push(node.left)
      node.right !== null && queue.push(node.right)
    }
  }
}
