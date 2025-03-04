const headers = {
  'Content-Type': 'application/json',
  Cookie: 'xzz-qyq-5173=67BBE095E1621E19CBC5D767; xzz-qyx-5173=ayPwtwHrk3Wp1PiOZBLRvEn7;',
  Host: 'localhost:5173'
}
const req = { entityName: 'Article', query: {}, pageNo: 1, pageSize: 10, sort: ['-id'] }

;(async () => {
  const r = await fetch(`http://localhost:5800/api/entity/find/page`, {
    method: 'POST',
    headers,
    body: JSON.stringify(req),
    credentials: 'include'
  })

  console.log(r.status)
})()
