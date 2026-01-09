import { test, expect } from 'vitest'
import getNewWords from '../src/utils/getNewWords'

test('匿名函数', () => {
  const { ansList, componentName } = getNewWords('rmst-sd')
  console.log('- componentName', componentName)
})
