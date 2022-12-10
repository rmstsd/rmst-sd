import { parse } from '@babel/parser'
import traverse from '@babel/traverse'

export const code = `const func = () => {
  console.log(ui)
}`

export function pureFunc(code: string, index?: number) {
  const ast = parse(code, { plugins: ['typescript', 'jsx'], sourceType: 'unambiguous' })

  console.log(ast)

  traverse(ast, {
    enter(path) {
      console.log(path)
    }
  })
}
