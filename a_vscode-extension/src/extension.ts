import * as vscode from 'vscode'

import { getFunctionNode } from './smallFeat/deleteFunc'
import getNewWords from './smallFeat/getNewWords'

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
}
