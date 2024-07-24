console.log('index start')

console.log(require.resolve('clsx'))

const { spawn, spawnSync } = require('child_process')

const pc = spawn('node', ['c.js'], { stdio: 'inherit' })

pc.on('spawn', () => {
  console.log('子进程 创建成功')
})

console.log(pc.pid)
pc.kill()

pc.on('close', () => {
  console.log('c close')
})

console.log('index end')
