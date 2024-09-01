import { test, expect } from 'vitest'
import { code, pureFunc } from '../src/pure-func'

test('匿名函数', () => {
  pureFunc(code)
})
