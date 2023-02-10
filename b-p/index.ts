import { parse } from '@babel/parser'
import traverse from '@babel/traverse'
import generate from '@babel/generator'
import * as types from '@babel/types'
import fse from 'fs-extra'
import clearConsole from 'clear-console'

import commandResultArray from './commandResultArray'
;(() => {
  clearConsole()

  // commandResultArray

  // const code = fse.readFileSync('./originSchema.ts', { encoding: 'utf8' })
  const code = fse.readFileSync('./xiao.ts', { encoding: 'utf8' })

  const ast = parse(code)

  traverse(ast, {
    // enter(path) {
    //   if (types.isIdentifier(path.node, { name: 'uu' })) {
    //     console.log('ui')
    //   }
    // },
    ArrowFunctionExpression() {},
    ObjectProperty(path) {
      console.log(path.getStatementParent())

      // path.addComment('uu', 'ii')
      // console.log(path.node.decorators)
      types.addComment(path.node, 'inner', '哈哈哈')
    }
  })

  const nvCode = generate(ast, {}).code

  console.log(nvCode)
})()
