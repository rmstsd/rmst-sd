import * as vscode from 'vscode'

import { exec } from 'child_process'
import path = require('path')
import { MyFoldingRangeProvider } from './utils/MyFoldingRangeProvider'

import { i18n } from './command/i18n'
import { convertWord } from './command/convertWord'
import deleteFunc from './command/deleteFunc'

// 命令触发的时候调用
export function activate(context: vscode.ExtensionContext) {
  vscode.commands.registerCommand('delete-func', () => {
    deleteFunc()
  })

  vscode.commands.registerCommand('convert-word', async () => {
    convertWord()
  })

  vscode.commands.registerCommand('openFolderInNewWindow', uri => {
    vscode.commands.executeCommand('vscode.openFolder', uri, { forceNewWindow: true })
  })

  vscode.commands.registerCommand('openInWindowTerminal', uri => {
    const workspaceFolders = vscode.workspace.workspaceFolders
    if (!workspaceFolders.length) {
      console.log('请先打开一个文件夹')
      return
    }

    const fsPath = workspaceFolders[0].uri.fsPath
    const basename = path.basename(fsPath)

    exec(`wt -d ${fsPath} --title ${basename} --suppressApplicationTitle`)
  })

  vscode.commands.registerCommand('i18n', async uri => {
    i18n()
  })

  // 注册针对 'plaintext' (txt文件) 的折叠提供者
  // 如果你有自定义的 language ID，请替换 'plaintext'
  const provider = vscode.languages.registerFoldingRangeProvider({ language: 'plaintext' }, new MyFoldingRangeProvider())
  context.subscriptions.push(provider)
}
