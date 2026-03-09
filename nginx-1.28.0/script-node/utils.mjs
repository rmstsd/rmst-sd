import path from 'path'
import iconv from 'iconv-lite'

export const nginxPath = path.resolve(import.meta.dirname, '../nginx.exe')

export function buffer2String(buffer) {
  buffer = iconv.decode(buffer, 'gbk')

  return buffer
}
