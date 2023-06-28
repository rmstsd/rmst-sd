import * as vscode from 'vscode'
import { getFunctionNode } from './delete-func'

// 命令触发的时候调用
export function activate(context: vscode.ExtensionContext) {
  vscode.commands.registerCommand('rmst-vscode-extension.rmst-del-func', () => {
    const editor = vscode.window.activeTextEditor
    if (!editor) return

    const code = editor.document.getText()

    const index = editor.document.offsetAt(editor.selection.active)

    const funNode = getFunctionNode(code, index)
    if (!funNode) {
      vscode.window.showWarningMessage('未找到')

      return
    }

    // ui 逻辑
    editor.edit(editBuilder => {
      console.log(funNode)
      editBuilder.delete(
        new vscode.Range(
          new vscode.Position(funNode.start.line - 1, funNode.start.column),
          new vscode.Position(funNode.end.line - 1, funNode.end.column)
        )
      )

      vscode.window.showInformationMessage('已删除')
    })
  })

  vscode.commands.registerCommand('rmst-vscode-extension.rmst-case', () => {
    const editor = vscode.window.activeTextEditor
    if (!editor) return

    const wordRange = editor.document.getWordRangeAtPosition(editor.selection.active)

    const wordText = editor.document.getText(wordRange)

    console.log(wordText)

    editor.edit(editBuilder => {
      editBuilder.replace(wordRange, 'aaa')
    })
  })
}
