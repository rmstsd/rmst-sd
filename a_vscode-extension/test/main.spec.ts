import { test, expect } from 'vitest'

import { getFunctionNode } from '../src/main'

test('init', () => {
  const code = `
const handleCss = color => {
  console.log(33)
}

  `

  const index = 10 // 光标

  const functionNode = getFunctionNode(code, index)

  expect(functionNode).toEqual({
    name: 'getName',
    start: { line: 2, column: 2 },
    end: { line: 4, column: 3 }
  })
})
