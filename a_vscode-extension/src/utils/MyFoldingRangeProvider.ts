import * as vscode from 'vscode'

// https://aistudio.google.com/prompts/1TEszH5rUHcpRGfX9q0ecWe7IK9IML9N6

export class MyFoldingRangeProvider implements vscode.FoldingRangeProvider {
  provideFoldingRanges(
    document: vscode.TextDocument,
    context: vscode.FoldingContext,
    token: vscode.CancellationToken
  ): vscode.FoldingRange[] {
    const ranges: vscode.FoldingRange[] = []
    const lineCount = document.lineCount
    const sectionHeaderRegex = /^\[.*\]$/ // 匹配 [xxx]

    let sectionStartLine: number | undefined = undefined

    for (let i = 0; i < lineCount; i++) {
      const lineText = document.lineAt(i).text.trim()

      if (sectionHeaderRegex.test(lineText)) {
        // --- 关键逻辑：处理上一个区域的结束 ---
        if (sectionStartLine !== undefined) {
          // 折叠到当前标题行的上一行 (i - 1)
          // 只有当内容超过一行时才折叠，否则没必要
          if (i - 1 > sectionStartLine) {
            ranges.push(new vscode.FoldingRange(sectionStartLine, i - 1))
          }
        }
        // 记录新区域的起点
        sectionStartLine = i
      }
    }

    // --- 关键逻辑：处理最后一个 [x] 区域 ---
    if (sectionStartLine !== undefined) {
      const lastLine = lineCount - 1
      // 只有当最后一个 [x] 后面还有内容时，才创建折叠范围
      if (lastLine > sectionStartLine) {
        // 折叠从最后一个 [x] 开始，一直到文件末尾
        ranges.push(new vscode.FoldingRange(sectionStartLine, lastLine))
      }
    }

    return ranges
  }
}
