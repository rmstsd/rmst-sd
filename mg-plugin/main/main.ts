import { sendMsgToUI } from '../messages/sender'

let timer
mg.snippetgen.on('generate', async (data, callback) => {
  const node = mg.getNodeById(data.layerId)

  console.log(mg.getLocalPaintStyles())

  const LocalPaintStyles = mg.getLocalPaintStyles()
  const LocalEffectStyles = mg.getLocalEffectStyles()
  const LocalTextStyles = mg.getLocalTextStyles()
  const LocalGridStyles = mg.getLocalGridStyles()

  clearInterval(timer)
  timer = setInterval(() => {
    sendMsgToUI({ LocalPaintStyles, LocalEffectStyles, LocalTextStyles, LocalGridStyles })
  }, 1000)

  if (data.language === 'javascript') {
    const code = await mg.codegen.getDSL(node.id, 'REACT')
    setTimeout(() => {
      callback([
        {
          language: 'css',
          code: JSON.stringify(code, null, 2),
          title: 'CSS'
        }
      ])
    })
  }
})

mg.snippetgen.on('action', value => {
  mg.notify(`called action ${value}`)
  mg.showUI(__html__)
})

setTimeout(() => {
  mg.showUI(__html__)
}, 2000)

let cb
// 监听mg的dsl数据生成
mg.codegen.on('generateDSL', ({ data, callback }) => {
  cb = callback

  mg.ui.postMessage(
    {
      type: 'dsl',
      data: data
    },
    '*'
  )
})
