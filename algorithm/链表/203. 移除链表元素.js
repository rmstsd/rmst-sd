const lb = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5, null)))))

// console.log(removeElements(lb, 1))

function removeElements(head, val) {
  // 添加一个虚拟头结点 为的是删除头结点的时候不用另做考虑
  const virtualNode = new ListNode(0, head)
  let cur = virtualNode
  while (cur.next !== null) {
    if (cur.next.val === val) cur.next = cur.next.next
    else cur = cur.next
  }
  return virtualNode.next
}

// 递归
// console.log(removeE(lb, 1))
function removeE(head, val) {
  if (head == null) return null

  head.next = removeE(head.next, val)
  if (head.val === val) return head.next
  else return head
}

// 正向第 n 个val
console.log(getZ(lb, 5))
function getZ(head, idx) {
  let count = 1
  let temp = head
  while (count !== idx) {
    count++
    temp = temp.next
    if (idx === count) return temp.val
  }
}

// 获取倒数第 n 个val
function getF() {}
