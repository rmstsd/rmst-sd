import { readFileSync } from 'node:fs'

let cc = readFileSync('aa.txt', 'utf8')
console.log(showSpecialChars(cc))

// 函数：将特殊字符转换为可见形式
function showSpecialChars(str) {
  return str
    .replace(/\n/g, '\\n\n') // 替换换行符为 \n 并实际换行
    .replace(/\t/g, '\\t') // 替换制表符为 \t
}
