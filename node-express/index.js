import express from 'express'
import cors from 'cors'

import { readFileSync } from 'fs'

const app = express()

app.use(cors())

app.get('/', async (req, res) => {
  await wait(1000)

  res.send('hello world')
})

app.get('/js', async (req, res) => {
  const name = req.query.name
  const delay = Number(req.query.delay)

  await wait(delay)

  const content = readFileSync(`./js-sort/${name}`)

  res.send(content)
})

// app.post('/', (req, res) => {
//   res.send('hello world')
// })

app.listen(1250, () => {
  console.log(`Example app listening on port ${1250}`)
})

function wait(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}
