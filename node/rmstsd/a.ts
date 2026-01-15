// 根据磁盘上的文件夹 获取文件夹下的文件

import * as fs from 'fs'

const folderPath = '\\'

fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error('读取文件夹失败:', err)
    return
  }

  console.log('文件夹下的文件:', files)
})
