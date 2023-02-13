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
  // const code = fse.readFileSync('./xiao.ts', { encoding: 'utf8' })

  const code = `
  const uu = {
    type: 'bgetopen',
    disabled: false,
    inputs: {
      type: 'chrome'
    },
    outputs: {
      
    }
  }
  `

  const ast = parse(code)

  traverse(ast, {
    ObjectExpression(path) {
      // console.log('-- > ', path.node.properties)

      const keys = path.node.properties.map(nodeItem => nodeItem.key.name)

      if (keys.includes('type') && keys.includes('inputs') && keys.includes('outputs')) {
        const commandType = path.node.properties.find(nodeItem => nodeItem.key.name === 'type').value.value

        console.log('单个指令', commandType)

        path.node.properties.forEach(nodeItem => {
          if (nodeItem.key.name === 'inputs' || nodeItem.key.name === 'outputs') {
            const inputsProperties = nodeItem.value.properties

            console.log('--> ', inputsProperties)

            // const comment = getComment(commandType, nodeItem.key.name)
            // if (comment) {
            //   types.addComment(path.node, 'trailing', comment, true)
            // }
          }
        })
      }
    },
    Identifier(path) {
      // console.log(path.getStatementParent())
      // if (types.isIdentifier(path.node, { name: 'aa' })) {
      //   console.log(1)
      // }
      // path.addComment('uu', 'ii')
      // console.log(path.node.decorators)
      // types.addComment(path.node, 'inner', '哈哈哈')
    }
  })

  const nvCode = generate(ast, {}).code

  console.log(nvCode)
})()

function getComment(commandType, key) {
  console.log(commandType, key)
  const fop = getFieldOption(commandResultArray, commandType, key)

  if (!fop) return null

  return fop.title
}

function getFieldOption(commandResultArray, nodeType, key) {
  function getBackEndJsonByCommandType(): any[] {
    return JSON.parse(commandResultArray.find(item => item.commandType === nodeType).jsonPropertiesPane)
  }

  const backEndJson = getBackEndJsonByCommandType()

  const flatJsonArray = backEndJson.reduce((acc, groupItem) => {
    return acc.concat(groupItem.items)
  }, [])

  return flatJsonArray.find(item => item.name === key)
}
