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
