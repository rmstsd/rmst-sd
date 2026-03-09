import { exec } from 'child_process'
import { buffer2String } from './utils.mjs'

exec('taskkill /f /t /im nginx.exe', { encoding: 'buffer' }, (error, stdout, stderr) => {
  if (stderr) {
    console.error(`命令错误输出: ${buffer2String(stderr)}`)
    return
  }

  console.log(`成功终止 nginx 进程`)
})
