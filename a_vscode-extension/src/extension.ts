import * as vscode from 'vscode'

import { getFunctionNode } from './smallFeat/deleteFunc'
import getNewWords from './smallFeat/getNewWords'
import { exec } from 'child_process'
import path = require('path')
import { readFile } from 'fs/promises'
import { parseI18n } from './smallFeat/parseI18n'

// 命令触发的时候调用
export function activate(context: vscode.ExtensionContext) {
  vscode.commands.registerCommand('delete-func', () => {
    const editor = vscode.window.activeTextEditor
    if (!editor) return

    const code = editor.document.getText()

    const index = editor.document.offsetAt(editor.selection.active)

    const funNode = getFunctionNode(code, index)
    if (!funNode) {
      vscode.window.showWarningMessage('未找到')

      return
    }

    editor.edit(editBuilder => {
      editBuilder.delete(
        new vscode.Range(
          new vscode.Position(funNode.start.line - 1, funNode.start.column),
          new vscode.Position(funNode.end.line - 1, funNode.end.column)
        )
      )

      vscode.window.showInformationMessage('已删除')
    })
  })

  vscode.commands.registerCommand('convert-word', () => {
    const editor = vscode.window.activeTextEditor
    if (!editor) return

    let wordText = ''
    let location: vscode.Position | vscode.Range | vscode.Selection

    if (editor.selection.isEmpty) {
      location = editor.document.getWordRangeAtPosition(editor.selection.active)
      wordText = editor.document.getText(location)

      console.log('location', location)
    } else {
      wordText = editor.document.getText(editor.selection)
      location = editor.selection
    }

    if (!wordText.trim() || !location) {
      vscode.window.showWarningMessage('请先选中字符串')

      return
    }

    const options: vscode.QuickPickItem[] = getNewWords(wordText).map(item => ({ label: item }))
    vscode.window.showQuickPick(options, { placeHolder: '请选择新单词' }).then(res => {
      if (!res) {
        return
      }
      const nvWord = res.label

      editor.edit(editBuilder => {
        editBuilder.replace(location, nvWord)
      })
    })
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
    const editor = vscode.window.activeTextEditor
    if (!editor) return

    let wordText = ''
    let location: vscode.Position | vscode.Range | vscode.Selection

    if (editor.selection.isEmpty) {
      location = editor.document.getWordRangeAtPosition(editor.selection.active)
      wordText = editor.document.getText(location)

      console.log('location', location)
    } else {
      wordText = editor.document.getText(editor.selection)
      location = editor.selection
    }

    if (!wordText.trim() || !location) {
      vscode.window.showWarningMessage('请先选中需要国际化的字符串')

      return
    }

    const config = vscode.workspace.getConfiguration()

    // 获取具体配置项
    const i18nFilePath = config.get<string>('i18nFilePath')
    if (!i18nFilePath) {
      vscode.window.showWarningMessage('请先配置i18n文件路径')

      return
    }

    // const filePath = String.raw`E:\m4frontend\project\m4-ui-lib\i18n\ui-base-zh.txt`

    const str = await readFile(i18nFilePath, 'utf-8').catch(err => null)
    if (!str) {
      vscode.window.showWarningMessage(`读取i18n文件失败 ${i18nFilePath}`)
      return
    }

    const i18nDict = parseI18n(str)
    const dictKeys = Object.entries(i18nDict)
      .filter(([k, v]) => v === wordText)
      .map(([k]) => k)

    const options: vscode.QuickPickItem[] = dictKeys.map(item => ({ label: `lo('${item}')` }))

    if (options.length === 0) {
      vscode.window.showWarningMessage('未找到国际化字符串')
      return
    }

    if (options.length === 1) {
      editor.edit(editBuilder => {
        editBuilder.replace(location, options[0].label)
      })

      return
    }

    vscode.window.showQuickPick(options, { placeHolder: '请选择' }).then(res => {
      if (!res) {
        return
      }
      const nvWord = res.label

      editor.edit(editBuilder => {
        editBuilder.replace(location, nvWord)
      })
    })
  })
}
