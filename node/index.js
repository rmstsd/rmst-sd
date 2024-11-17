// const { spawn, exec } = require('node:child_process')
// var kill = require('tree-kill')

const { exec, spawn, execSync } = require('child_process')
const path = require('path')

// const cc = `java -jar .\\trick-m4-4.20.10.jar .\\M4Demo2\\`
// const pc = exec(cc, { cwd: `E:\\trick-m4-4.20.10` })

// pc.on('exit', (code, signal) => {
//   console.log('exit', code, signal)
// })

// setTimeout(() => {
//   kill(pc.pid)
// }, 5000)

// const pp = 'E:\\trick-m4-4.20.10\\M4Demo9\\'
// console.log(path.basename(pp))

// spawn('C:\\Program Files\\Microsoft Office\\root\\Office16\\WINWORD.EXE', ['/t', "D:\\Desktop\\李春雷-个人总结报告.docx"])

const { get_apps, find_app, open_app } = require('windowsapps')
// get_apps().then(apps => {
//   console.log(apps)

//   // 将数据写入一个json 文件
//   const fs = require('fs')
//   const data = JSON.stringify(apps)
//   fs.writeFile('apps.json', data, err => {
//     if (err) throw err
//     console.log('数据写入成功！')
//   })
// })

const cmd0 = `powershell -ExecutionPolicy Bypass "Get-StartApps|convertto-json"`
const cmd1 = `powershell Get-WmiObject -class Win32_Product`

const ans = execSync(cmd1, { encoding: 'utf8' })
const fs = require('fs')
fs.writeFile('apps.json', ans, err => {
  if (err) throw err
  console.log('数据写入成功！')
})

// open_app('Excel' )

// execSync(`start shell:AppsFolder\\Microsoft.VisualStudioCode "E:\\rmst-formily-attempt"`)

// E:\rmst-formily-attempt

// const regedit = require('regedit').promisified

// async function main() {
//   const listResult = await regedit.list('HKCU\\SOFTWARE')
//   console.log(listResult)

//   await regedit.createKey(['HKLM\\SOFTWARE\\MyApp2', 'HKCU\\SOFTWARE\\MyApp'])
//   await regedit.putValue({
//     'HKCU\\SOFTWARE\\MyApp': {
//       Company: {
//         value: 'Moo corp',
//         type: 'REG_SZ'
//       }
//     },
//     'HKLM\\SOFTWARE\\MyApp2': {
//       test: {
//         value: '123',
//         type: 'REG_SZ'
//       }
//     }
//   })
// }

// main()
