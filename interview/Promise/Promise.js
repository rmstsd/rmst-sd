function noop() {}

function bind(fn, thisArg) {
  return function () {
    fn.apply(thisArg, arguments)
  }
}

function Promise(executor) {
  if (!(this instanceof Promise)) throw new TypeError('Promises must be constructed via new')
  if (typeof executor !== 'function') throw new TypeError('not a function')

  this._state = 0
  this._handled = false
  this._value = undefined
  this._deferreds = []

  this.done = false

  try {
    executor(
      value => {
        if (this.done) return
        this.done = true
        resolve(this, value)
      },
      reason => {
        if (this.done) return
        this.done = true
        reject(this, reason)
      }
    )
  } catch (ex) {
    if (this.done) return
    this.done = true
    reject(this, ex)
  }
}

function handle(self, deferred) {
  if (self._state === 0) {
    self._deferreds.push(deferred)
    return
  }

  self._handled = true
  setTimeout(() => {
    var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected
    if (cb === null) {
      ;(self._state === 1 ? resolve : reject)(deferred.promise, self._value)
      return
    }

    var ret
    try {
      ret = cb(self._value)
    } catch (e) {
      reject(deferred.promise, e)
      return
    }
    resolve(deferred.promise, ret)
  })
}

function resolve(self, newValue) {
  try {
    self._state = 1
    self._value = newValue
    finale(self)
  } catch (e) {
    reject(self, e)
  }
}

function reject(self, newValue) {
  self._state = 2
  self._value = newValue
  finale(self)
}

function finale(self) {
  self._deferreds.forEach(fn => {
    handle(self, fn)
  })

  self._deferreds = null
}

function Handler(onFulfilled, onRejected, promise) {
  this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null
  this.onRejected = typeof onRejected === 'function' ? onRejected : null
  this.promise = promise
}

Promise.prototype.then = function (onFulfilled, onRejected) {
  var promise = new this.constructor(noop)
  handle(this, new Handler(onFulfilled, onRejected, promise))
  return promise
}

const p = new Promise(resolve => {
  setTimeout(() => {
    resolve(123)
  }, 1000)
})

p.then(res => {
  console.log(res)
  return 6
}).then(res => {
  console.log(res)
})
