export const openUrl = (url: string) => {
  let a: null | HTMLElement = document.createElement('a')
  a.setAttribute('target', '_blank')
  a.setAttribute('href', url)
  a.click()
  a = null
}

export const ajaxJSONP = (url: string) => {
  let script: HTMLScriptElement | null = document.createElement('script')
  script.setAttribute('src', url)
  document.body.appendChild(script)
  script.remove()
  script = null
}

/*
  代码来自 clipboard.js
  text 传入想复制的字符串
  successCallBack 和 errorCallBack 可选 分别是复制成功与失败的回调
*/
export function copy(text: string = '', successCallBack?: Function, errorCallBack?: Function) {
  const isRTL = document.documentElement.getAttribute('dir') === 'rtl'

  // 创建元素
  let fakeElem: null | HTMLTextAreaElement = document.createElement('textarea')
  fakeElem.style.fontSize = '12pt'
  fakeElem.style.border = '0'
  fakeElem.style.padding = '0'
  fakeElem.style.margin = '0'

  fakeElem.style.position = 'absolute'
  fakeElem.style[isRTL ? 'right' : 'left'] = '-9999px'

  const yPosition = window.pageYOffset || document.documentElement.scrollTop
  fakeElem.style.top = yPosition + 'px'
  fakeElem.setAttribute('readonly', '')
  fakeElem.value = text

  document.body.appendChild(fakeElem)

  // 选中
  const isReadOnly = fakeElem.hasAttribute('readonly')
  if (!isReadOnly) fakeElem.setAttribute('readonly', '')
  fakeElem.select()
  fakeElem.setSelectionRange(0, fakeElem.value.length)
  if (!isReadOnly) fakeElem.removeAttribute('readonly')

  // 复制操作
  let succeeded
  try {
    succeeded = document.execCommand('copy')
    successCallBack && successCallBack()
  } catch (err) {
    succeeded = false
    errorCallBack && errorCallBack()
  } finally {
    fakeElem.remove()
    fakeElem = null
  }
}
