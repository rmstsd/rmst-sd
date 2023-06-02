const http = require('http')

const server = http.createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/html')
  const html = '<html><body><h1>Hello, World!</h1></body></html>'
  res.end(html)
})

const port = 3008
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`)
})
