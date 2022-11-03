// @ts-check
onload = async () => {
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

  document.body.append(...aElement_array)
}
