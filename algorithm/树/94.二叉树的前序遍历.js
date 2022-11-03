// 1. 递归 时间复杂度: O(n) n为节点数量; 空间复杂度: O(n) 为递归过程中栈的开销
console.log(preorderRecursion(tree))
function preorderRecursion(root) {
  const ans = []
  loop(root)
  return ans

  function loop(root) {
    if (root == null) return

    ans.push(root.val)

    loop(root.left)
    loop(root.right)
  }
}

// 2. 迭代
console.log(preorderIterate(null))
function preorderIterate(root) {
  const ans = []
  const stack = []

  if (root == null) return []

  stack.push(root)
  while (stack.length !== 0) {
    const top = stack.pop()
    ans.push(top.val)

    if (top.right != null) stack.push(top.right)
    if (top.left != null) stack.push(top.left)
  }

  return ans
}

// 3. Morris 遍历 时间: O(n); 空间: O(1)
