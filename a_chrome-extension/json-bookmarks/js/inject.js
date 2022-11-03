// console.log('content_scripts-inject')

const script = document.createElement('script')
// 绝对路径, 扩展根目录
script.setAttribute('src', chrome.runtime.getURL('js/send-method.js'))

document.head.appendChild(script)
