const { spawn, exec } = require('node:child_process')
var kill = require('tree-kill')

const cc = `java -jar .\\trick-m4-4.20.10.jar .\\M4Demo2\\`
const pc = exec(cc, { cwd: `E:\\trick-m4-4.20.10` })

pc.on('exit', (code, signal) => {
  console.log('exit', code, signal)
})

setTimeout(() => {
  kill(pc.pid)
}, 5000)
