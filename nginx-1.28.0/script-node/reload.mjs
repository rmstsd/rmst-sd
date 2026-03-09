import { exec } from 'child_process'
import { buffer2String, nginxPath } from './utils.mjs'

exec(`${nginxPath} -s reload`, { encoding: 'buffer' }, (error, stdout, stderr) => {
  if (error) {
    console.log(buffer2String(stderr))

    return
  }

  console.log(buffer2String(stdout))
})
