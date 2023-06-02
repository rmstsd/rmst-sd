const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/js')
  // 跨域
  res.setHeader('Access-Control-Allow-Origin', '*')

  const buffer = fs.readFileSync('./esm.js')

  setTimeout(() => {
    res.end(buffer)
  }, 2000)
})

const port = 10055
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`)
})
