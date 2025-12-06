import { test, expect } from 'vitest'
import { code, pureFunc } from '../src/pure-func'
import getNewWords from '../src/smallFeat/getNewWords'

test('匿名函数', () => {
  const ansList = getNewWords('hello World  smallFeat')
  console.log(ansList)
})
