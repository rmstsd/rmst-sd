// @ts-ignore
onload = async () => {
  document.querySelector('.clear-btn').onclick = clearBtn

  document.querySelector('.toLowercase-btn').onclick = toLowercaseBtn

  initBookMarkUi()
}

async function toLowercaseBtn() {
  const [currTab] = await chrome.tabs.query({ active: true })

  chrome.tabs.sendMessage(currTab.id, { evt: 'evt_to-lowercase' })
}

async function clearBtn() {
  const [currTab] = await chrome.tabs.query({ active: true })
  console.log('currTab', currTab)

  deleteDomainCookies(new URL(currTab.url).hostname)

  await chrome.tabs.sendMessage(currTab.id, '自定义消息')

  setTimeout(() => {
    chrome.tabs.reload(currTab.id)
  }, 100)
}

function stringToUrl(input) {
  // Start with treating the provided value as a URL
  try {
    return new URL(input)
  } catch {
    // ignore
  }
  // If that fails, try assuming the provided input is an HTTP host
  try {
    return new URL('http://' + input)
  } catch {
    // ignore
  }
  // If that fails ¯\_(ツ)_/¯
  return null
}

async function deleteDomainCookies(domain) {
  console.log(domain)
  let cookiesDeleted = 0
  try {
    const cookies = await chrome.cookies.getAll({ domain })

    if (cookies.length === 0) {
      return 'No cookies found'
    }

    let pending = cookies.map(deleteCookie)
    await Promise.all(pending)

    cookiesDeleted = pending.length
  } catch (error) {
    return `Unexpected error: ${error.message}`
  }

  return `Deleted ${cookiesDeleted} cookie(s).`
}

function deleteCookie(cookie) {
  // Cookie deletion is largely modeled off of how deleting cookies works when using HTTP headers.
  // Specific flags on the cookie object like `secure` or `hostOnly` are not exposed for deletion
  // purposes. Instead, cookies are deleted by URL, name, and storeId. Unlike HTTP headers, though,
  // we don't have to delete cookies by setting Max-Age=0; we have a method for that ;)
  //
  // To remove cookies set with a Secure attribute, we must provide the correct protocol in the
  // details object's `url` property.
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie#Secure
  const protocol = cookie.secure ? 'https:' : 'http:'

  // Note that the final URL may not be valid. The domain value for a standard cookie is prefixed
  // with a period (invalid) while cookies that are set to `cookie.hostOnly == true` do not have
  // this prefix (valid).
  // https://developer.chrome.com/docs/extensions/reference/cookies/#type-Cookie
  const cookieUrl = `${protocol}//${cookie.domain}${cookie.path}`

  return chrome.cookies.remove({
    url: cookieUrl,
    name: cookie.name,
    storeId: cookie.storeId
  })
}

async function initBookMarkUi() {
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
