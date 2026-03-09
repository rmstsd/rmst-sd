import * as vscode from 'vscode'
import { getFunctionNode } from '../utils/deleteFunc'

export default async function deleteFunc() {
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
}
