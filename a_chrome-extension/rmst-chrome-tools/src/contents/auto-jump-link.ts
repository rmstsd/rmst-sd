if (location.host === 'weixin110.qq.com') {
  const dom = document.querySelector('.weui-msg__desc')
  const url = dom.textContent
  location.href = url
}
