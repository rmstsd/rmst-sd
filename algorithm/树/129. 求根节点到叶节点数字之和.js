const tree = new TreeNode(
  4,
  new TreeNode(9, new TreeNode(5, null, null), new TreeNode(1, null, null)),
  new TreeNode(0, new TreeNode(5, null, null), null)
)

console.log(tree)

console.log(sumNumbers(tree))

function sumNumbers(root) {
  const result = []

  const path = [root.val]
  dfs(root, path)

  console.log(result)

  return result.reduce((acc, item) => acc + Number(item), 0)

  function dfs(node, path) {
    if (!node.left && !node.right) {
      result.push(path.join(''))
      return
    }

    if (node.left) {
      path.push(node.left.val)
      dfs(node.left, path)
      path.pop()
    }

    if (node.right) {
      path.push(node.right.val)
      dfs(node.right, path)
      path.pop()
    }
  }
}
