const { spawn } = require('cross-spawn')
const cmd = require('node-cmd')

const app = 'D:\\WindowsTerminal\\wt.exe'
const code = 'D:\\VS Code\\Code.exe'
const dir = 'E:\\rmst-sd'

// console.log(app, dir)

// spawn(code, [dir], { detached: true })

// cmd.runSync(`D:\\WindowsTerminal\\wt.exe -d E:\\rmst-sd`)
// spawn(app, ['-d', dir], { shell: 'cmd.exe' })

// const spawn = require('cross-spawn')
// spawn(app, ['-d', dir], { shell: 'cmd.exe' })
// cmd.runSync(`${code} E:\\rmst-sd`)
cmd.runSync(`code E:\\rmst-sd`)
