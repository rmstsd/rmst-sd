// 根据磁盘上的文件夹 获取文件夹下的文件

import * as fs from 'fs'
import { basename, extname } from 'path'

const path = '\\rmst-sd\\node\\rmstsd\\afff.html'

const name = basename(path, extname(path))

console.log(name)
