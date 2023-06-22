import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors())

app.get('/', (req, res) => {
  res.send('hello world')
})

// app.post('/', (req, res) => {
//   res.send('hello world')
// })

app.listen(1250, () => {
  console.log(`Example app listening on port ${1250}`)
})
