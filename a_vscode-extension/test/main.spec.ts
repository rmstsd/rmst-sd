import { test, expect } from 'vitest'

import { getFunctionNode } from '../src/main'

test('匿名函数', () => {
  const code = `
const a = func => {}
a(() => {
  console.log(1)
})
  `

  const index = 30 // 光标

  const functionNode = getFunctionNode(code, index)

  // expect(functionNode).toEqual({
  //   name: 'getName',
  //   start: { line: 2, column: 2 },
  //   end: { line: 4, column: 3 }
  // })
})
