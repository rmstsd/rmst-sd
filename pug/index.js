import express from 'express'
const app = express()
const port = 5200

app.set('view engine', 'pug')

app.get('/', async (req, res) => {
  console.log(req.query)
  res.render('index', { title: 'Hey', message: 'Hello there!' })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
