export function parseI18n(iniString): Record<string, string> {
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
