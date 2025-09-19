// console.log(11)

// console.log(process.env.arg)
// setTimeout(() => {}, 1000)

import { execSync } from 'node:child_process'
import path from 'node:path'

// execSync('wt -d E:\\trick-ui --title 哈哈哈 --suppressApplicationTitle')

// console.log(path.basename(`e:\\rmst-sd\\zz`))

import { ip, ipv6, mac } from 'address'
import { createReadStream, readFileSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import { createInterface } from 'node:readline'

// default interface 'eth' on linux, 'en' on osx.
// const ip2 = ip() // '192.168.0.2'

// console.log(ip2)
const rl = createInterface({
  input: createReadStream('./aa.txt'),
  crlfDelay: Infinity
})

rl.on('line', line => {
  console.log('line', line)
})

rl.on('close', () => {
  // 处理最后可能剩余的单行
  console.log('close')
})

rl.on('error', error => {
  console.error(error)
})
