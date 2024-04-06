import { Elysia, t } from 'elysia'
import { cors } from '@elysiajs/cors'

const app = new Elysia().onError(({ code, error }) => {
  console.error('error -> ', code, error)
})
app.use(cors())

app.get('/', () => new Response('Hello Elysia', { headers: { 'content-type': 'text/html' } }))

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

app.get('/blog', () => {
  return 'blog'
})

app.post('/post-here', () => {
  return {}
})

app.listen({ port: 1400 }, () => {
  console.log(`🦊 😜 Elysia is running at ${app.server.url.origin}`)
})

function wait(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}
