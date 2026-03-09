import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors())

app.get('/', async (req, res) => {
  console.log(req.query)
  await new Promise(resolve => {
    setTimeout(resolve, Number(req.query.time) * 1000)
  })
  res.send('hello world')
})

// app.post('/', (req, res) => {
//   res.send('hello world')
// })

app.listen(1250, () => {
  console.log(`Example app listening on port ${1250}`)
})
