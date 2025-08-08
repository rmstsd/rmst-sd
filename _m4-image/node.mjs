// @ts-check

import { readdir, writeFile } from 'fs/promises'
import { join } from 'path'

const baseDir_en_mobile = './M4图集/M4_英文/M4_移动端'
const baseDir_en_pc = './M4图集/M4_英文/M4_桌面端'

const baseDir_zh_mobile = './M4图集/M4_中文/M4_移动端'
const baseDir_zh_pc = './M4图集/M4_中文/M4_桌面端'

async function getAllImageFiles(dir) {
  const files = []

  async function scan(currentDir) {
    const entries = await readdir(currentDir, { withFileTypes: true })

    for (const entry of entries) {
      const fullPath = join(currentDir, entry.name)

      if (entry.isDirectory()) {
        await scan(fullPath)
      } else if (entry.isFile() && /\.(jpg|jpeg|png|svg)$/i.test(entry.name)) {
        files.push({
          name: entry.name,
          path: fullPath.replace(/\\/g, '/')
        })
      }
    }
  }

  await scan(dir)
  return files
}

;(async () => {
  const images_zh_pc = await getAllImageFiles(baseDir_zh_pc)
  const images_zh_mobile = await getAllImageFiles(baseDir_zh_mobile)

  const images_en_pc = await getAllImageFiles(baseDir_en_pc)
  const images_en_mobile = await getAllImageFiles(baseDir_en_mobile)

  const images_list = [
    {
      title: '中文',
      lang: 'zh',
      image: { pc: images_zh_pc, mobile: images_zh_mobile }
    },
    {
      title: '英文',
      lang: 'en',
      image: { pc: images_en_pc, mobile: images_en_mobile }
    }
  ]

  const json = JSON.stringify(images_list, null, 2)
  await writeFile('./data.js', `const images_list = ${json}`)
})()
