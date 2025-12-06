import { camelCase as camelcase, deCamelize } from '../npmPackages'

const separator = /-| |_|\/|\\/
const replacement = `$1_$2`

const getNewWords = (wordText: string) => {
  const decamelized = wordText.replace(/([\p{Lowercase_Letter}\d])(\p{Uppercase_Letter})/gu, replacement)
  const list = decamelized
    .split(separator)
    .map(item => item.toLowerCase().trim())
    .filter(Boolean)

  const ss = list.join('-')

  const ans1 = camelcase(ss)
  const ans2 = camelcase(ss, { pascalCase: true })
  const ans3 = ss
  const ans4 = list.join('_')
  const ans5 = list.map(item => camelcase(item, { pascalCase: true })).join('_')

  const ansList = [ans1, ans2, ans3, ans4, ans5].filter(item => item !== wordText)

  return ansList
}

export default getNewWords
