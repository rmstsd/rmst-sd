import { spawnSync, execSync } from 'child_process'

const ans = spawnSync('git rev-parse --is-inside-work-tree')
console.log(ans)
