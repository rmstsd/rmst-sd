import { camelCase, deCamelize } from '../npmPackages'

const getNewWords = (wordText: string) => {
  const nvWords = [
    camelCase(wordText),
    camelCase(wordText, { pascalCase: true }),
    deCamelize(wordText, { separator: '-' }),
    deCamelize(wordText)
  ]

  return nvWords
}

export default getNewWords
