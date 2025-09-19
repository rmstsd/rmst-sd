import { Elysia } from 'elysia'
import { cors } from '@elysiajs/cors'
import { staticPlugin } from '@elysiajs/static'
import { sleep } from 'bun'

const app = new Elysia().onError(({ code, error }) => {
  console.error('error -> ', code, error)
})
app.use(cors())
app.use(staticPlugin({ alwaysStatic: true, indexHTML: true }))

app.get('/', () => new Response('Hello Elysia', { headers: { 'content-type': 'text/html' } }))
app.get('/ff', async () => {
  const content = await Bun.file('src/20250905-14.log').text()

  console.log('res')
  return new Response(content, {
    headers: {
      'content-type': 'text/plain'
    }
  })
})

app.post('/gpt', () => {})

app.get('/js/:fileName', async ({ query, params }) => {
  const delay = Number(query.delay || 0)

  await wait(delay)

  const filePath = `src/js/${params.fileName}`
  const content = await Bun.file(filePath).text()

  return content
})

app.get('/css/:fileName', async ({ query, params }) => {
  const delay = Number(query.delay || 0)

  await wait(delay)

  const filePath = `src/css/${params.fileName}`
  const content = await Bun.file(filePath).text()

  return new Response(content, { headers: { 'content-type': 'text/css' } })
})

app.post('/test', async ({ body }) => {
  console.log(body.delay)

  await wait(body.delay ?? 0)

  return [{ name: body.name }]
})

app.get('/blog', async () => {
  await sleep(2000)

  return 'blog'
})

app.post('/post-here', () => {
  return {}
})

app.get('/oss', () => {
  Bun.write(`${process.cwd()}/public/output.txt`, 'asd')
})

app.listen({ port: 1400 }, () => {
  console.log(`🦊 😜 Elysia is running at ${app.server.url.origin}`)
})

function wait(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}
