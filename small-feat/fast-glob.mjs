import fg from 'fast-glob'
import path from 'node:path'

console.log(process.cwd())

const bp = 'E:'

const source = ['../**/package.json'] //.map(item => path.join(bp, item))
console.log(source)

const entries = await fg.glob(source, {
  dot: true,
  ignore: ['../**/node_modules']
  // absolute: true,
  // onlyDirectories: true
})

console.log(entries)
