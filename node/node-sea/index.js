import { readFileSync } from 'fs'
import Koa from 'koa'
import koaStatic from 'koa-static'
import path from 'path'

console.log('node version', process.version)

console.log('-- start')

setTimeout(() => {
  console.log('set-timeout')
}, 3000)

const app = new Koa()

app.use(koaStatic('./ui'))

app.listen(3456, () => {
  console.log('Server is running on port 3456')
})

// NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2
