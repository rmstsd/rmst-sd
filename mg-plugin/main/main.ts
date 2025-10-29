mg.snippetgen.on('generate', (data, callback) => {
  const node = mg.getNodeById(data.layerId)

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
