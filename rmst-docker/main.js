const http = require('http')

console.log(6)

const port = 3700

const server = http.createServer(async (req, res) => {
  console.log(req.url)

  const data = await findEntityPage()

  console.log(data.map(item => item.title))

  res.statusCode = 200
  res.setHeader('Content-Type', 'text/json;charset=utf-8')
  res.setHeader('Access-Control-Allow-Origin', '*')

  res.end(JSON.stringify(data, null, 2))
})

server.listen(port, () => {
  console.log(`Server is running on http://127.0.0.1:${port}/`)
})

const baseURL = `http://192.168.13.16:5800/api`
const headers = {
  'Content-Type': 'application/json',
  'xyy-app-id': 'm4',
  'xyy-app-key': 'Seer1234'
}

async function findEntityPage() {
  const req = { entityName: 'Article', query: {}, pageNo: 1, pageSize: 20, sort: ['-id'] }
  console.log('findEntityPage')
  const r = await fetch(`${baseURL}/entity/find/page`, {
    method: 'POST',
    headers,
    body: JSON.stringify(req)
  }).then(res => res.json())

  return r.page
}
