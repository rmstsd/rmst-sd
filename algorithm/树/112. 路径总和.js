//

const arr = [5, 4, 8, 11, null, 13, 4, 7, 2, null, null, null, 1],
  targetSum = 22

const tree = arrayToBST(arr)
console.log(tree)

console.log(hasPathSum(tree, targetSum))

function hasPathSum(root, targetSum) {
  // 节点不存在 返回false
  if (!root) return false
  // 左右子树都不存在，说明是叶子节点，判断是否符合条件
  if (!root.left && !root.right) return targetSum === root.val
  // 到这里就是：节点存在，左右子树存在一个或者都存在，也就是内部节点
  // 遍历左右子树，更新总和为 总和删除当前节点的值
  return hasPathSum(root.left, targetSum - root.val) || hasPathSum(root.right, targetSum - root.val)
}
