// <script src="https://cdn.bootcdn.net/ajax/libs/axios/0.21.1/axios.js"></script>

/*
  打印带颜色的控制台
*/
const handleParameter = arr => arr.reduce((acc, item) => acc + ' ' + item)
const handleCss = color => {
  let str = JSON.stringify({ color, 'font-size': '16px' })
  str = str.replace(/"/g, '').replace(/,/g, ';').replace(/{|}/g, '')
  return str
}
console.red = (...info) => console.log('%c' + handleParameter(info), handleCss('red'))
console.purple = (...info) =>
  console.log('%c' + handleParameter(info), handleCss('#C847FF'))

// 同步代码 等待固定秒数
function syncWait(count = 1) {
  const time = Date.now()
  while (Date.now() - count * 1000 < time) {}
}
const aa = 11

const ff = function () {
  console.log(11)
}

const arro = () => 1
