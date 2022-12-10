// @ts-check
;(() => {
  const root = new TreeNode(
    3,
    new TreeNode(
      5,
      new TreeNode(6, null, null),
      new TreeNode(2, new TreeNode(7, null, null), new TreeNode(4, null, null))
    ),
    new TreeNode(1, new TreeNode(0, null, null), new TreeNode(8, null, null))
  )
  const p = 5
  const q = 1

  console.log(root)

  console.log(lowestCommonAncestor(root, p, q))

  function lowestCommonAncestor(root, p, q) {
    let ans
    const dfs = (root, p, q) => {
      if (root === null) return false
      const lson = dfs(root.left, p, q)
      const rson = dfs(root.right, p, q)
      if ((lson && rson) || ((root.val === p.val || root.val === q.val) && (lson || rson))) {
        ans = root
      }
      return lson || rson || root.val === p.val || root.val === q.val
    }
    dfs(root, p, q)

    return ans
  }
})()
