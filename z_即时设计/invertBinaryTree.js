/**
 * 实现翻转二叉树
 * 例如
 *  a
 * / \
 * b c
 * 转为
 *  a
 * / |
 * c b
 */
const invertTree = function (node) {
  if (node === null) {
    return null
  }

  const temp = node.left

  node.left = node.right
  node.right = temp

  invertTree(node.left)
  invertTree(node.right)

  return node
}

const ensure = function (output, expect, message) {
  if (JSON.stringify(output) === JSON.stringify(expect)) {
    console.log(`${message} ok`)
  } else {
    console.log(`${message} fail`)
  }
}

const test = function () {
  const input = {
    val: 1,
    left: {
      val: 2,
      left: {
        val: 3,
        left: null,
        right: null
      },
      right: {
        val: 4,
        left: null,
        right: null
      }
    },
    right: {
      val: 5,
      left: {
        val: 6,
        left: null,
        right: null
      },
      right: {
        val: 7,
        left: null,
        right: null
      }
    }
  }

  const expect = {
    val: 1,
    left: {
      val: 5,
      left: {
        val: 7,
        left: null,
        right: null
      },
      right: {
        val: 6,
        left: null,
        right: null
      }
    },
    right: {
      val: 2,
      left: {
        val: 4,
        left: null,
        right: null
      },
      right: {
        val: 3,
        left: null,
        right: null
      }
    }
  }

  const output = invertTree(input)
  ensure(output, expect, 'test')
}

// 输出 test ok表示测试成功
test()
