import { sendMsgToUI } from '../messages/sender'

let timer
mg.snippetgen.on('generate', (data, callback) => {
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
    setTimeout(() => {
      callback([
        {
          language: 'javascript',
          code: 'console.log("Hello, world!")',
          title: 'Js'
        },
        {
          language: 'css',
          code: 'body { background-color: red; }',
          title: 'CSS'
        },
        {
          language: 'javascript',
          code: `console.log('${node?.name} 哈哈哈 人美声甜')`,
          title: 'Node Name'
        }
      ])
    })
  }
})

mg.snippetgen.on('action', value => {
  mg.notify(`called action ${value}`)
  mg.showUI(__html__)
})
