import { parse } from '@babel/parser'
import traverse from '@babel/traverse'

interface FunctionNode {
  name?: string
  start?: { line: number; column: number }
  end?: { line: number; column: number }
}

// 算法逻辑 业务逻辑
export function getFunctionNode(code, index) {
  const ast = parse(code, { plugins: ['typescript', 'jsx'], sourceType: 'unambiguous' })

  let funNode: FunctionNode

  traverse(ast, {
    FunctionDeclaration(path) {
      // console.log('FunctionDeclaration path >:', path.node)

      if (index >= path.node.start && index <= path.node.end) {
        funNode = {
          name: path.node.id.name,
          start: path.node.loc.start,
          end: path.node.loc.end
        }
      }
    },
    FunctionExpression(path) {
      const [name] = Object.keys(path.parentPath.getBindingIdentifiers())

      const VariableDeclarationPath = path.parentPath.parentPath
      if (VariableDeclarationPath?.isVariableDeclaration()) {
        if (
          index >= VariableDeclarationPath.node.start &&
          index <= VariableDeclarationPath.node.end
        ) {
          funNode = {
            name: name,
            start: VariableDeclarationPath.node.loc.start,
            end: VariableDeclarationPath.node.loc.end
          }
        }
      }
    },
    ArrowFunctionExpression(path) {
      console.log('ArrowFunctionExpression path >:', path)

      const [name] = Object.keys(path.parentPath.getBindingIdentifiers())

      const VariableDeclarationPath = path.parentPath.parentPath
      if (VariableDeclarationPath?.isVariableDeclaration()) {
        /**
         * const func = () => {
         *  console.log(111)
         * }
         */
        if (
          index >= VariableDeclarationPath.node.start &&
          index <= VariableDeclarationPath.node.end
        ) {
          funNode = {
            name: name,
            start: VariableDeclarationPath.node.loc.start,
            end: VariableDeclarationPath.node.loc.end
          }
        }
      } else {
        // 匿名函数 将只删除此匿名函数
        /**
         *  func(() => {
              console.log(1)
            })
         */
        if (index >= path.node.start && index <= path.node.end) {
          funNode = {
            name: name,
            start: path.node.loc.start,
            end: path.node.loc.end
          }
        }
      }
    }
  })

  return funNode
}
