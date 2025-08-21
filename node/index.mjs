// console.log(11)

// console.log(process.env.arg)
// setTimeout(() => {}, 1000)

import { execSync } from 'node:child_process'
import path from 'node:path'

// execSync('wt -d E:\\trick-ui --title 哈哈哈 --suppressApplicationTitle')

// console.log(path.basename(`e:\\rmst-sd\\zz`))

import { ip, ipv6, mac } from 'address'
import { readFileSync } from 'node:fs'
import { readFile } from 'node:fs/promises'

// default interface 'eth' on linux, 'en' on osx.
// const ip2 = ip() // '192.168.0.2'

// console.log(ip2)
const ans = await readFile('./package.json').catch(() => {
  return 'err'
})

console.log(ans)
