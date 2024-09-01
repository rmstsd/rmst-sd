const tree = new TreeNode(
  4,
  new TreeNode(9, new TreeNode(5, null, null), new TreeNode(1, null, null)),
  new TreeNode(0, new TreeNode(5, null, null), null)
)

// 1. 递归
console.log(postorderRecursion(tree))
function postorderRecursion(root) {
  const ans = []
  loop(root)
  return ans

  function loop(root) {
    if (root == null) return

    loop(root.left)
    loop(root.right)
    ans.push(root.val)
  }
}
