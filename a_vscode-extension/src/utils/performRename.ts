import * as vscode from 'vscode'

export async function performLspRename(newName: string): Promise<boolean> {
  const editor = vscode.window.activeTextEditor
  if (!editor) {
    return false
  }

  const document = editor.document
  const position = editor.selection

  try {
    await vscode.commands.executeCommand<{ range: vscode.Range; placeholder: string } | vscode.Range>(
      'vscode.prepareRename',
      document.uri,
      position
    )
  } catch (error) {
    return false
  }

  // 1. 调用底层的重命名引擎
  // 这相当于执行了 F2 的逻辑，但它不会弹出 UI，而是直接返回要修改的内容
  const workspaceEdit = await vscode.commands.executeCommand<vscode.WorkspaceEdit>(
    'vscode.executeDocumentRenameProvider',
    document.uri,
    position,
    newName
  )

  if (workspaceEdit) {
    // 2. 应用这些修改到工作区（会自动处理跨文件修改）
    const success = await vscode.workspace.applyEdit(workspaceEdit)
    if (success) {
      console.log('lsp 重命名成功')
      return true
    } else {
      vscode.window.showErrorMessage('重命名应用失败')
      return false
    }
  } else {
    vscode.window.showWarningMessage('当前位置无法进行重命名')
    return false
  }
}
