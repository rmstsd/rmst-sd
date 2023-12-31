const Pending = 'Pending'
const Fulfilled = 'Fulfilled'
const Rejected = 'Rejected'

const onDefaultFulfilled = v => v
const onDefaultRejected = reason => {
  throw reason
}

const nextTick = queueMicrotask //: process.nextTick

function resolvePromise(x, nextPromise, resolve, reject) {
  if (x === nextPromise) {
    return reject(TypeError('Chaining cycle detected for promise #<Promise>'))
  }

  // x 可能是别人写的 Promise, 不一定非要是 RmstPromise
  // 如果是对象, 那么可能是 Promise 实例
  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    let called = false // 是否被调用过 // 防止别人的 Promise 不符合规范导致我的 Promise 出错

    try {
      const then = x.then

      // 如果是 Promise 实例
      if (typeof then === 'function') {
        then.call(
          x,
          y => {
            if (called) return
            called = true
            resolvePromise(y, nextPromise, resolve, reject)
          },
          r => {
            if (called) return
            called = true
            reject(r)
          }
        )
      } else {
        resolve(x)
      }
    } catch (error) {
      // 别人的 Promise
      if (called) return
      called = true
      reject(error)
    }
  } else {
    // 普通值
    resolve(x)
  }
}

class RmstPromise {
  constructor(executor) {
    this.status = Pending
    this.value = undefined
    this.reason = undefined

    const resolve = value => {
      if (this.status === Pending) {
        this.value = value
        this.status = Fulfilled

        this.onFulfilledCallbacks.forEach(funcItem => {
          funcItem()
        })
      }
    }

    const reject = reason => {
      if (this.status === Pending) {
        this.reason = reason
        this.status = Rejected

        this.onRejectedCallbacks.forEach(funcItem => {
          funcItem()
        })
      }
    }

    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }

  status = undefined
  value = undefined
  reason = undefined

  onFulfilledCallbacks = []
  onRejectedCallbacks = []

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : onDefaultFulfilled
    onRejected = typeof onRejected === 'function' ? onRejected : onDefaultRejected

    const nextPromise = new RmstPromise((resolve, reject) => {
      if (this.status === Fulfilled) {
        nextTick(() => {
          try {
            const x = onFulfilled(this.value)
            resolvePromise(x, nextPromise, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      }

      if (this.status === Rejected) {
        nextTick(() => {
          try {
            const x = onRejected(this.reason)
            resolvePromise(x, nextPromise, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      }

      if (this.status === Pending) {
        this.onFulfilledCallbacks.push(() => {
          nextTick(() => {
            try {
              const x = onFulfilled(this.value)
              resolvePromise(x, nextPromise, resolve, reject)
            } catch (error) {
              reject(error)
            }
          })
        })

        this.onRejectedCallbacks.push(() => {
          nextTick(() => {
            try {
              const x = onRejected(this.reason)
              resolvePromise(x, nextPromise, resolve, reject)
            } catch (error) {
              reject(error)
            }
          })
        })
      }
    })

    return nextPromise
  }
}

RmstPromise.deferred = function () {
  let dfd = {}
  dfd.promise = new RmstPromise((resolve, reject) => {
    dfd.resolve = resolve
    dfd.reject = reject
  })

  return dfd
}

// module.exports = RmstPromise
