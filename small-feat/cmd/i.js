const { spawn } = require('cross-spawn')
const cmd = require('node-cmd')

const app = 'D:\\WindowsTerminal\\wt.exe'
const code = 'D:\\VS Code\\Code.exe'
const dir = 'E:\\rmst-sd'

// console.log(app, dir)

// spawn(code, [dir], { detached: true })

cmd.runSync(`D:\\WindowsTerminal\\wt.exe -d E:\\rmst-sd`)
