// @ts-check

import requestHostCallback, { shouldYieldToHost } from './requestHostCallback.js'

let workIndex = 0
let taskTotal = 5000 // 任务数量
const start = Date.now()
function handleWork() {
  for (let j = 0; j < 4000; j++) {
    // DOM 操作严重影响程序执行效率
    const btn1Attr = document.getElementById('btn1').attributes
    const btn2Attr = document.getElementById('btn2').attributes
    const btn3Attr = document.getElementById('btn1').attributes
    const btn4Attr = document.getElementById('btn2').attributes
  }
  workIndex++
  if (workIndex >= taskTotal) {
    console.log(`任务调度完成，用时：`, Date.now() - start, 'ms!')
  }
}

function workLoop(hasTimeRemaining, initialTime) {
  while (!shouldYieldToHost() && workIndex < taskTotal) {
    handleWork()
  }
  if (workIndex < taskTotal) {
    console.log(`开启下一个宏任务继续执行剩余任务`)
    return true
  } else {
    return false
  }
}

requestHostCallback(workLoop)
