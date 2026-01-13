function runPlaygroundCode() {
  LeaferIN = {}
  PxGrow = {}
  LeaferIN.editor = LeaferUI
  LeaferIN.textEditor = LeaferUI
  LeaferIN.viewport = LeaferUI
  LeaferIN.view = LeaferUI
  LeaferIN.scroll = LeaferUI
  LeaferIN.arrow = LeaferUI
  LeaferIN.html = LeaferUI
  LeaferIN.flow = LeaferUI
  LeaferIN.animate = LeaferUI
  LeaferIN.motionPath = LeaferUI
  LeaferIN.state = LeaferUI
  LeaferIN.robot = LeaferUI
  LeaferIN.find = LeaferUI
  LeaferIN.export = LeaferUI
  LeaferIN.filter = LeaferUI
  LeaferIN.color = LeaferUI
  LeaferIN.resize = LeaferUI
  LeaferIN.bright = LeaferUI
  LeaferIN.scroller = LeaferUI
  LeaferIN.shadow = LeaferUI
  LeaferIN.bgRunner = LeaferUI
  PxGrow.license = LeaferUI
  PxGrow.clipper = LeaferUI
  PxGrow.tiler = LeaferUI
  PxGrow.viewportLighter = LeaferUI
  PxGrow.pathEditor = LeaferUI
  try {
    ;(function () {
      LeaferUI.Debug.enable = false
      LeaferUI.Debug.showRepaint = false
      LeaferUI.Leafer.list.forEach(item => item.destroy(true))
      LeaferUI.Leafer.list = new LeaferUI.LeafList()
      LeaferUI.ImageManager.destroy()
      LeaferUI.Resource.destroy()
      const App = LeaferUI.App,
        Rect = LeaferUI.Rect,
        Group = LeaferUI.Group,
        IGroup = LeaferUI.IGroup
      const ViewportLighter = PxGrow.viewportLighter.ViewportLighter
      console.log(ViewportLighter)

      const app = new App({ view: window, editor: {} })
      let vl = new ViewportLighter(app.tree, {
        sliceRender: 10000 // 每个切片1万个元素
      })
      console.log(vl)

      create(app.tree, 10) // 创建10万个矩形
      app.tree.zoom('fit')

      function create(view, num) {
        const groupSize = 10 * 100 * 1.5
        const column = num > 25 ? 10 : 5
        for (let i = 0; i < num; i++) {
          const group = new Group()
          group.x = groupSize * (i % column)
          group.y = groupSize * Math.floor(i / column)

          view.add(group)
          createRects(group, 0, 0, `hsl(${(i * 10) % 360},70%,50%)`)
        }
      }

      function createRects(group, startX, startY, color) {
        let y, rect
        for (let i = 0; i < 100; i++) {
          if (i % 10 === 0) startX += 10
          y = startY
          for (let j = 0; j < 100; j++) {
            if (j % 10 === 0) y += 10
            rect = new Rect()
            rect.x = startX
            rect.y = y
            rect.height = 10
            rect.width = 10
            rect.fill = color
            rect.editable = true
            group.add(rect)
            y += 12
          }
          startX += 12
        }
      }
    })()
  } catch (e) {
    console.log(e)
    document.body.childNodes.forEach(item => item.remove())
  }
}

function checkRunPlaygroundCode() {
  runPlaygroundCode()
}

checkRunPlaygroundCode()
