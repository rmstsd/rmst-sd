
const url = new URLSearchParams(location.href)
const target = url.get('url')
let a = document.createElement('a')
a.href = target
a.click()
a = null