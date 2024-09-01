const script = document.createElement('script')
script.src = chrome.runtime.getURL('/contentScripts/feat/disabledWs/scriptSrc.js')

// document.head.insertAdjacentElement('beforebegin', script)

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

// WebSocket = null
;(function (xhr) {
  var xhr = XMLHttpRequest.prototype

  var send = xhr.send

  xhr.send = function (postData) {
    console.log(1123)
    this.addEventListener('load', function () {
      var myUrl = this._url ? this._url.toLowerCase() : this._url
      if (myUrl) {
        if (this.responseType != 'blob' && this.responseText) {
          try {
            var text = this.responseText
            // 发送消息到content.js
            window.postMessage({ type: 'inject_message_type', message: json.parse(text) })
            console.log('注入脚本发送获取list: ', json.parse(text))
          } catch (err) {}
        }
      }
    })
    // return send.apply(this, arguments)
  }
})(XMLHttpRequest)
