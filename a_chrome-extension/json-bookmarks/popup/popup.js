// @ts-check
onload = async () => {
  document.querySelector('.clear-btn').onclick = () => {
    console.log(111)

    console.log(Object.keys(localStorage))
    console.log(chrome.tabs.query({ active: true }))

    chrome.runtime.sendMessage('fbpofnfkeemfpepajlkhmhlbmdkimjep', '123456', { includeTlsChannelId: true })
  }

  const getBookmarks = async () => {
    try {
      const bookmarks = await chrome.bookmarks.getTree()
      return bookmarks[0].children[0].children
    } catch (error) {
      return [{ title: 'JSON', url: 'https://dream-unicorn.github.io/react-json-preview/' }]
    }
  }

  const bms = await getBookmarks()

  const aElement_array = bms.map((item, index) => {
    const url = new URL(item.url)
    const img = document.createElement('img')
    img.src = url.origin + '/favicon.ico'
    img.classList.add('icon')

    const spanEmpty = document.createElement('span')
    spanEmpty.classList.add('icon')
    spanEmpty.textContent = 'x'

    img.onload = () => {
      spanEmpty.remove()
      a.prepend(img)
    }

    const span = document.createElement('span')
    span.innerText = item.title

    const a = document.createElement('a')
    a.href = item.url
    a.target = '_blank'

    a.append(spanEmpty, span)

    return a
  })

  document.querySelector('.bookmark').append(...aElement_array)
}

console.log(window)
