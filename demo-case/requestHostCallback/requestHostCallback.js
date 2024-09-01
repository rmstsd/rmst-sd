// @ts-check

// https://juejin.cn/post/7146004454653820935#heading-5

const getCurrentTime = () => performance.now() // 页面加载后开始计算

let isMessageLoopRunning = false // 标记 MessageChannel 正在运行
let scheduledHostCallback = null // 要执行的处理函数

// 定义每一帧工作时间，默认时间为 5ms，React 会根据浏览器主机环境进行重新计算。
let yieldInterval = 5
let deadline = 0 // 过期时间，让出主线程

// 让出主线程 // 是否让出主线程（currentTime >= deadline）
export const shouldYieldToHost = function () {
  const t = getCurrentTime() >= deadline

  return t
}

// 开启高频短间隔 5ms 执行工作
const performWorkUntilDeadline = () => {
  if (scheduledHostCallback !== null) {
    const currentTime = getCurrentTime() // 拿到当前时间
    // 根据 yieldInterval（5ms）计算剩余时间（任务执行截止时间）。这种方式意味着 port.postMessage 开始后总有剩余时间
    deadline = currentTime + yieldInterval
    // 标识还有时间，类似 requestIdleCallback deadline.didTimeout
    const hasTimeRemaining = true
    try {
      const hasMoreWork = scheduledHostCallback(hasTimeRemaining, currentTime)

      // 执行完成，没有新任务，初始化工作环境
      if (!hasMoreWork) {
        isMessageLoopRunning = false
        scheduledHostCallback = null
      } else {
        // 如果任务截止时间过期（根据 shouldYieldToHost()），还有需要处理的工作，再发起一个异步宏任务
        port.postMessage(null)
      }
    } catch (error) {
      port.postMessage(null)
      throw error
    }
  } else {
    isMessageLoopRunning = false
  }
}

const requestHostCallback = function (callback) {
  scheduledHostCallback = callback // 保存任务

  if (!isMessageLoopRunning) {
    isMessageLoopRunning = true
    port.postMessage(null) // 发起宏任务
  }
}

// 定义宏任务，建立通信
const channel = new MessageChannel()
const port = channel.port2 // 用于发布任务
channel.port1.onmessage = performWorkUntilDeadline // 处理任务

const cancelHostCallback = function () {
  scheduledHostCallback = null
}

export default requestHostCallback
