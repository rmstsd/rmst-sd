import { spawnSync, execSync } from 'child_process'
import { existsSync } from 'fs'

// const ans = execSync('git rev-parse --is-inside-git-dir', {
//   cwd: `E:\\rmst-flutter`,
//   encoding: 'utf-8'
// })

const a = existsSync(`E:\\rmst-flutter\\.git`)

console.log(a)
