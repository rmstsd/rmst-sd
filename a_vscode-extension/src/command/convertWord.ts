import * as vscode from 'vscode'
import getNewWords from '../utils/getNewWords'
import { performLspRename } from '../utils/performRename'

export async function convertWord() {
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

  const { ansList } = getNewWords(wordText)
  const options: vscode.QuickPickItem[] = Array.from(new Set(ansList)).map(item => ({ label: item }))
  const res = await vscode.window.showQuickPick(options, { placeHolder: '请选择新单词' })
  if (!res) {
    return
  }

  const nvWord = res.label

  const success = await performLspRename(nvWord)
  if (!success) {
    editor.edit(editBuilder => {
      editBuilder.replace(location, nvWord)
    })
  }
}
