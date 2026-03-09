import Koa from 'koa'
import clear from 'clear-console'

const app = new Koa({ asyncLocalStorage: true })

// 中间件 1 (最外层)
app.use(async (ctx, next) => {
  console.log('1. 第一层 - 开始')
  console.log(ctx.state)
  ctx.state.user = { name: '张三', age: 18 }
  console.log(ctx.state)

  await next() // 暂停当前执行，进入下一个中间件
  console.log('1. 第一层 - 结束')
})

// 中间件 2 (中间层)
app.use(async (ctx, next) => {
  console.log('2. 第二层 - 开始')
  console.log(ctx.state)

  cc()
  await next() // 暂停，进入下一个
  console.log('2. 第二层 - 结束')
})

// 中间件 3 (最内层/核心业务)
app.use(async (ctx, next) => {
  console.log('3. 第三层 - 业务逻辑处理')
  console.log(ctx.state)
  ctx.body = 'Hello Koa'
  // 这里没有 next() 了，开始回溯
})

app.listen(3333, () => {
  clear()
  console.log('监听端口 3333')
})

function cc() {
  console.log('2. app.currentContext', app.currentContext.state)
}
