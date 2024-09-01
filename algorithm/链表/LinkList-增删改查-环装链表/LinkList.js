class ListNode {
  constructor(val) {
    this.val = val
    this.next = null
  }
}

class LinkList {
  constructor(arr) {
    if (!arr) {
      this.head = null
      this.size = 0
    } else if (Array.isArray(arr)) {
      this.size = arr.length
      this.generateList(arr)
    }
  }

  head = null
  size = 0

  generateList(arr) {
    let prev = null
    arr.forEach((item, index) => {
      const node = new ListNode(item)
      if (index === 0) {
        this.head = node
        prev = node
      } else {
        prev.next = node
        prev = prev.next
      }
    })
  }

  getNode(index) {
    if (index < 0 || index > this.size - 1) {
      return undefined
    }

    let cur = this.head
    for (let i = 0; i < index; i++) {
      cur = cur.next
    }

    return cur
  }

  remove(index) {
    if (index < 0 || index > this.size - 1) {
      console.error('越界')
      return
    }

    switch (index) {
      case 0: {
        this.head = this.head.next
        break
      }
      case this.size - 1: {
        const lastButOne = this.getNode(index - 1)
        lastButOne.next = null
        break
      }
      default: {
        const before = this.getNode(index - 1)
        const after = this.getNode(index + 1)
        before.next = after
        break
      }
    }

    this.size--
  }

  push(val) {
    const lastNode = this.getNode(this.size - 1)
    const node = new ListNode(val)
    lastNode.next = node
    this.size++
  }

  addNode(index, val) {
    const node = new ListNode(val)
    if (index === 0) {
      node.next = this.head
      this.head = node
    } else {
      const prev = this.getNode(index - 1)
      node.next = prev.next
      prev.next = node
    }

    this.size++
  }

  replace(index, val) {
    const current = this.getNode(index)
    current.val = val
  }

  indexOf(val) {
    let cur = this.head
    for (let i = 0; i <= this.size - 1; i++) {
      if (cur.val === val) {
        return i
      }
      cur = cur.next
    }

    return -1
  }
}

const arr = [0, 1, 2, 3, 4]
const o = new LinkList(arr)

o.getNode(o.size - 1).next = o.getNode(2)

console.log(o)

console.log(hasCycle_v2(o.head))

function hasCycle_v1(head) {
  const set = new Set()

  while (head) {
    if (set.has(head)) {
      console.log('环装链表入口_v1', head)
      return true
    }

    set.add(head)
    head = head.next
  }

  return false
}

function hasCycle_v2(head) {
  if (head === null) {
    return null
  }

  let slow = head
  let fast = head

  while (fast !== null) {
    slow = slow.next
    if (fast.next !== null) {
      fast = fast.next.next
    } else {
      return null
    }

    if (fast === slow) {
      let ptr = head
      while (ptr !== slow) {
        ptr = ptr.next
        slow = slow.next
      }
      return ptr
    }
  }

  return null
}
