import { parse } from '@babel/parser'
import traverse from '@babel/traverse'
import generate from '@babel/generator'
import * as types from '@babel/types'
import fse from 'fs-extra'
import clearConsole from 'clear-console'
import ncp from 'copy-paste'

import commandResultArray from './commandResultArray'
;(() => {
  clearConsole()

  const code = fse.readFileSync('./originSchema.ts', { encoding: 'utf8' })

  // const code = `
  // const uu = {
  //   type: 'bgetopen',
  //   disabled: false,
  //   inputs: {
  //     type: 'chrome',
  //     mode: 'dd'
  //   },
  //   outputs: {

  //   }
  // }
  // `

  const ast = parse(code)

  traverse(ast, {
    ObjectExpression(path) {
      // console.log('-- > ', path.node.properties)

      const keys = path.node.properties.map(nodeItem => nodeItem.key.name)

      if (keys.includes('type') && keys.includes('inputs') && keys.includes('outputs')) {
        const commandType = path.node.properties.find(nodeItem => nodeItem.key.name === 'type').value.value

        // console.log('单个指令', commandType)

        path.node.properties.forEach(nodeItem => {
          // 如果拿到的是指令对象
          if (nodeItem.key.name === 'inputs' || nodeItem.key.name === 'outputs') {
            const inputsProperties = nodeItem.value.properties
            // inputsProperties.find(nodeItem => nodeItem.key.name === 'type')

            // console.log('--> ', inputsProperties)

            inputsProperties.forEach(propertyItem => {
              // console.log(propertyItem)

              const comment = getComment(commandType, propertyItem.key.name)
              if (comment) types.addComment(propertyItem, 'trailing', comment)
            })
          }
        })
      }
    }
  })

  const nvCode = generate(ast, {}).code

  console.log(nvCode)

  ncp.copy(nvCode, function () {
    console.log('复制完了')
  })
})()

function getComment(commandType, key) {
  const fop = getFieldOption(commandResultArray, commandType, key)

  if (!fop) return null

  if (fop.dataSource) {
    return `${fop.title}: 可选值: ${fop.dataSource.map(item => item.value).join(' | ')}`
  }

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
