import * as vscode from 'vscode'
import { readFileSync, writeFileSync } from 'fs'
import getNewWords from '../utils/getNewWords'
import { basename } from 'node:path'
import * as path from 'path'
import * as fs from 'fs'

export function watcherAutoTsxTemplate(context: vscode.ExtensionContext) {
  const watcher = vscode.workspace.createFileSystemWatcher('**/*.{tsx,jsx}', false, true, true)

  watcher.onDidCreate(uri => {
    console.log(`tsx 文件被创建了: ${uri.fsPath}`)

    if (uri.fsPath.includes('node_modules')) {
      return
    }

    if (uri.fsPath.includes('.git')) {
      return
    }

    if (uri.fsPath.endsWith('.tsx')) {
      const fsPath = uri.fsPath
      const content = readFileSync(fsPath, 'utf8')

      if (content.trim() === '') {
        const fileName = basename(fsPath, '.tsx')
        const { componentName } = getNewWords(fileName)
        const packageJsonPath = findClosestPackageJson(fsPath)

        if (!packageJsonPath) {
          writeFileSync(fsPath, genDefault(componentName))
        } else {
          const packageJsonContent = readFileSync(packageJsonPath, 'utf8')
          const packageJson = JSON.parse(packageJsonContent)

          const keys = Object.keys(packageJson.dependencies).concat(Object.keys(packageJson.devDependencies))

          let tsxTemplate = ''

          if (keys.includes('next')) {
            if (fsPath.includes(path.join('src', 'app'))) {
              tsxTemplate = genNextjs(componentName)
            } else {
              tsxTemplate = genDefault(componentName)
            }
          } else if (keys.includes('mobx')) {
            const pkgName = keys.includes('mobx-react') ? 'mobx-react' : 'mobx-react-lite'
            tsxTemplate = genMobx(componentName, pkgName)
          }

          writeFileSync(fsPath, tsxTemplate)
        }
      }
    }
  })

  // 4. 将监听器加入订阅，以便插件停用时释放资源
  context.subscriptions.push(watcher)
}

const genDefault = (componentName: string) => {
  return `
export function ${componentName}() {
  return <div>${componentName}</div>
}
`
}

function genNextjs(componentName: string) {
  let propsType = ': '

  switch (componentName) {
    case 'Layout': {
      propsType += 'LayoutProps'
      break
    }
    case 'Page': {
      propsType += 'PageProps'
      break
    }
    default: {
      propsType = ''
      break
    }
  }

  return `
export default function ${componentName}(props${propsType}) {
  return <div>${componentName}</div>
}
`
}

function genMobx(componentName: string, reactPkgName: string) {
  return `
import { observer } from '${reactPkgName}'

export const ${componentName} = observer(function ${componentName}In() {
  return <div>${componentName}</div>
})

`
}

/**
 * 从指定文件路径向上查找最近的 package.json
 * @param filePath 新创建文件的完整 fsPath
 * @returns package.json 的路径，如果没找到则返回 null
 */
function findClosestPackageJson(filePath: string): string | null {
  // 1. 获取当前文件所在的目录
  let currentDir = path.dirname(filePath)

  // 2. 获取当前工作区的根目录（作为边界，防止查找超出项目范围）
  const workspaceFolder = vscode.workspace.getWorkspaceFolder(vscode.Uri.file(filePath))
  const workspaceRoot = workspaceFolder ? workspaceFolder.uri.fsPath : null

  // 3. 循环向上查找
  while (true) {
    const packageJsonPath = path.join(currentDir, 'package.json')

    // 检查 package.json 是否存在
    if (fs.existsSync(packageJsonPath)) {
      return packageJsonPath
    }

    // 如果已经到达了工作区根目录，依然没找到子包的 package.json，
    // 那么可能这个文件直接属于根目录，或者需要停止查找
    if (workspaceRoot && currentDir === workspaceRoot) {
      // 如果你想把根目录的 package.json 也算作结果，这里返回 packageJsonPath (如果存在)
      // 或者根据需求决定是否继续向上（通常 monorepo 到这就停了）
      return fs.existsSync(packageJsonPath) ? packageJsonPath : null
    }

    // 获取父级目录
    const parentDir = path.dirname(currentDir)

    // 如果父级目录等于当前目录，说明已经到达系统根目录（如 C:\ 或 /），停止查找
    if (parentDir === currentDir) {
      return null
    }

    // 继续向上一层
    currentDir = parentDir
  }
}
