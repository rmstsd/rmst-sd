import { execFile } from 'child_process'
import { buffer2String, nginxPath } from './utils.mjs'

execFile(nginxPath, ['-s', 'quit'], { encoding: 'buffer' }, (error, stdout, stderr) => {
  if (error) {
    console.error(buffer2String(stderr))

    return
  }

  console.log(buffer2String(stdout))
})
