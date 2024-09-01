function over() {
  class OvWebSocket extends EventTarget {
    constructor() {
      super()
      console.log('OvWebSocket')
    }
    my = 'my'
    CLOSED = 3
    CLOSING = 2
    CONNECTING = 0
    OPEN = 1
    binaryType = 'blob'
    bufferedAmount = 0
    close() {}
    extensions = ''
    onclose = null
    onerror = null
    onmessage = null
    onopen = null
    protocol = ''
    readyState = 0
    send() {}
    url = 'ws=//8.142.164.165=5052/'
  }

  window.WebSocket = OvWebSocket
}

console.log('contentScripts')

// over()
// const onmessagegetter = Object.getOwnPropertyDescriptor(WebSocket.prototype, 'onmessage').get
// const onmessagesetter = Object.getOwnPropertyDescriptor(WebSocket.prototype, 'onmessage').set
// Object.defineProperty(WebSocket.prototype, 'onmessage', {
//   get() {
//     console.log('getCalled')
//     // return onmessagegetter.apply(this)
//   },
//   set() {
//     console.log('setCalled')
//     // return onmessagesetter.apply(this, arguments)
//   }
// })
