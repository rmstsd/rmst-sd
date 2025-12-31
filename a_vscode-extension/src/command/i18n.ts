import * as vscode from 'vscode'
import * as ts from 'typescript'
import { readFile } from 'fs/promises'

export async function i18n() {
  const editor = vscode.window.activeTextEditor
  if (!editor) return

  let wordText = ''
  let location: vscode.Position | vscode.Range | vscode.Selection

  if (editor.selection.isEmpty) {
    location = editor.document.getWordRangeAtPosition(editor.selection.active)
    wordText = editor.document.getText(location)
  } else {
    wordText = editor.document.getText(editor.selection)
    location = editor.selection
  }

  if (!wordText.trim() || !location) {
    vscode.window.showWarningMessage('请先选中需要国际化的字符串')

    return
  }

  const prevChar = editor.document.getText(
    new vscode.Range(location.start.line, location.start.character - 1, location.start.line, location.start.character)
  )
  const nextChar = editor.document.getText(
    new vscode.Range(location.start.line, location.end.character, location.start.line, location.end.character + 1)
  )

  if (prevChar === nextChar && [`'`, `"`, '`'].includes(prevChar)) {
    location = new vscode.Range(location.start.line, location.start.character - 1, location.end.line, location.end.character + 1)
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
    execReplace(options[0].label)
    return
  }

  const res = await vscode.window.showQuickPick(options, { placeHolder: '请选择' })
  if (!res) {
    return
  }

  execReplace(res.label)
}

function execReplace(label: string) {
  const editor = vscode.window.activeTextEditor
  if (!editor) return

  const { location, nvWord } = getCursorContext(label)
  editor.edit(editBuilder => {
    editBuilder.replace(location, nvWord)
  })
}

function parseI18n(iniString): Record<string, string> {
  const result = {}
  // 按行分割字符串
  const lines = iniString.split('\n')

  for (const line of lines) {
    // 去除行首尾空格
    const trimmedLine = line.trim()

    // 跳过空行和方括号部分（如[base]、[xxx]）
    if (trimmedLine === '' || (trimmedLine.startsWith('[') && trimmedLine.endsWith(']'))) {
      continue
    }

    // 分割键值对（使用第一个=作为分隔点）
    const equalsIndex = trimmedLine.indexOf('=')
    if (equalsIndex === -1) {
      continue // 跳过没有=的行
    }

    const key = trimmedLine.substring(0, equalsIndex).trim()
    const value = trimmedLine.substring(equalsIndex + 1).trim()

    // 添加到结果对象
    result[key] = value
  }

  return result
}

export function getCursorContext(nvWord: string) {
  const editor = vscode.window.activeTextEditor
  if (!editor) return

  const document = editor.document
  const cursorOffset = document.offsetAt(editor.selection.active) // 获取光标偏移量
  const sourceCode = document.getText()

  const sourceFile = ts.createSourceFile('temp.tsx', sourceCode, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)

  let nodes: ts.Node[] = []
  function walk(node: ts.Node) {
    if (cursorOffset >= node.pos && cursorOffset <= node.end) {
      nodes.push(node)
    }
    ts.forEachChild(node, walk)
  }
  walk(sourceFile)

  const leafNode = nodes.at(-1)

  const text = leafNode.getText()
  let location = new vscode.Range(
    document.positionAt(leafNode.getStart()),
    document.positionAt(leafNode.getStart() + text.length)
  )

  switch (leafNode.kind) {
    case ts.SyntaxKind.JsxText: {
      console.log('添加 {}')
      nvWord = `{${nvWord}}`
      break
    }

    case ts.SyntaxKind.StringLiteral: {
      if (leafNode.parent.kind === ts.SyntaxKind.JsxAttribute) {
        // 处理 title="取消"
        nvWord = `{${nvWord}}`
        console.log('添加 {}')
      } else {
        console.log('直接替换')
      }
      break
    }
  }

  return { nvWord, location }
}
