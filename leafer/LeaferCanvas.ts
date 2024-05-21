class Canvas {
  set blendMode(value) {
    if (value === 'normal') value = 'source-over'
    this.context.globalCompositeOperation = value
  }
  get blendMode() {
    return this.context.globalCompositeOperation
  }
  set dashPattern(value) {
    this.context.setLineDash(value || emptyArray)
  }
  get dashPattern() {
    return this.context.getLineDash()
  }
  __bindContext() {
    let method
    contextMethodNameList.forEach(name => {
      method = this.context[name]
      if (method) this[name] = method.bind(this.context)
    })
    this.textBaseline = 'alphabetic'
  }
  setTransform(_a, _b, _c, _d, _e, _f) {}
  resetTransform() {}
  getTransform() {
    return void 0
  }
  save() {}
  restore() {}
  transform(a, b, c, d, e, f) {
    if (typeof a === 'object') {
      this.context.transform(a.a, a.b, a.c, a.d, a.e, a.f)
    } else {
      this.context.transform(a, b, c, d, e, f)
    }
  }
  translate(_x, _y) {}
  scale(_x, _y) {}
  rotate(_angle) {}
  fill(_path2d, _rule) {}
  stroke(_path2d) {}
  clip(_path2d, _rule) {}
  fillRect(_x, _y, _width, _height) {}
  strokeRect(_x, _y, _width, _height) {}
  clearRect(_x, _y, _width, _height) {}
  drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh) {
    switch (arguments.length) {
      case 9:
        if (sx < 0) {
          const d = (-sx / sw) * dw
          sw += sx
          sx = 0
          dx += d
          dw -= d
        }
        if (sy < 0) {
          const d = (-sy / sh) * dh
          sh += sy
          sy = 0
          dy += d
          dh -= d
        }
        this.context.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
        break
      case 5:
        this.context.drawImage(image, sx, sy, sw, sh)
        break
      case 3:
        this.context.drawImage(image, sx, sy)
    }
  }
  beginPath() {}
  moveTo(_x, _y) {}
  lineTo(_x, _y) {}
  bezierCurveTo(_cp1x, _cp1y, _cp2x, _cp2y, _x, _y) {}
  quadraticCurveTo(_cpx, _cpy, _x, _y) {}
  closePath() {}
  arc(_x, _y, _radius, _startAngle, _endAngle, _anticlockwise) {}
  arcTo(_x1, _y1, _x2, _y2, _radius) {}
  ellipse(_x, _y, _radiusX, _radiusY, _rotation, _startAngle, _endAngle, _anticlockwise) {}
  rect(_x, _y, _width, _height) {}
  roundRect(_x, _y, _width, _height, _radius) {}
  createConicGradient(_startAngle, _x, _y) {
    return void 0
  }
  createLinearGradient(_x0, _y0, _x1, _y1) {
    return void 0
  }
  createPattern(_image, _repetition) {
    return void 0
  }
  createRadialGradient(_x0, _y0, _r0, _x1, _y1, _r1) {
    return void 0
  }
  fillText(_text, _x, _y, _maxWidth) {}
  measureText(_text) {
    return void 0
  }
  strokeText(_text, _x, _y, _maxWidth) {}
  destroy() {
    this.context = null
  }
}

class LeaferCanvasBase extends Canvas {
  get width() {
    return this.size.width
  }
  get height() {
    return this.size.height
  }
  get pixelRatio() {
    return this.size.pixelRatio
  }
  get pixelWidth() {
    return this.width * this.pixelRatio
  }
  get pixelHeight() {
    return this.height * this.pixelRatio
  }
  get allowBackgroundColor() {
    return this.view && this.parentView
  }
  constructor(config, manager) {
    super()
    this.size = {}
    this.worldTransform = {}
    if (!config) config = minSize
    if (!config.pixelRatio) config.pixelRatio = Platform.devicePixelRatio
    this.manager = manager
    this.innerId = IncrementId.create(IncrementId.CNAVAS)
    const { width, height, pixelRatio } = config
    this.autoLayout = !width || !height
    this.size.pixelRatio = pixelRatio
    this.config = config
    this.init()
  }
  init() {}
  __createContext() {
    this.context = this.view.getContext('2d')
    this.__bindContext()
  }
  export(filename, options) {
    const { quality, blob } = FileHelper.getExportOptions(options)
    if (filename.includes('.')) {
      return this.saveAs(filename, quality)
    } else if (blob) {
      return this.toBlob(filename, quality)
    } else {
      return this.toDataURL(filename, quality)
    }
  }
  toBlob(type, quality) {
    return new Promise(resolve => {
      Platform.origin
        .canvasToBolb(this.view, type, quality)
        .then(blob => {
          resolve(blob)
        })
        .catch(e => {
          debug$c.error(e)
          resolve(null)
        })
    })
  }
  toDataURL(type, quality) {
    return Platform.origin.canvasToDataURL(this.view, type, quality)
  }
  saveAs(filename, quality) {
    return new Promise(resolve => {
      Platform.origin
        .canvasSaveAs(this.view, filename, quality)
        .then(() => {
          resolve(true)
        })
        .catch(e => {
          debug$c.error(e)
          resolve(false)
        })
    })
  }
  resize(size) {
    if (this.isSameSize(size)) return
    let takeCanvas
    if (this.context && !this.unreal && this.width) {
      takeCanvas = this.getSameCanvas()
      takeCanvas.copyWorld(this)
    }
    DataHelper.copyAttrs(this.size, size, canvasSizeAttrs)
    this.size.pixelRatio || (this.size.pixelRatio = 1)
    this.bounds = new Bounds(0, 0, this.width, this.height)
    if (!this.unreal) {
      this.updateViewSize()
      this.smooth = this.config.smooth
    }
    this.updateClientBounds()
    if (this.context && !this.unreal && takeCanvas) {
      this.clearWorld(takeCanvas.bounds)
      this.copyWorld(takeCanvas)
      takeCanvas.recycle()
    }
  }
  updateViewSize() {}
  updateClientBounds() {}
  startAutoLayout(_autoBounds, _listener) {}
  stopAutoLayout() {}
  setCursor(_cursor) {}
  setWorld(matrix, parentMatrix) {
    const { pixelRatio } = this
    const w = this.worldTransform
    if (parentMatrix) {
      const { a, b, c, d, e, f } = parentMatrix
      this.setTransform(
        (w.a = (matrix.a * a + matrix.b * c) * pixelRatio),
        (w.b = (matrix.a * b + matrix.b * d) * pixelRatio),
        (w.c = (matrix.c * a + matrix.d * c) * pixelRatio),
        (w.d = (matrix.c * b + matrix.d * d) * pixelRatio),
        (w.e = (matrix.e * a + matrix.f * c + e) * pixelRatio),
        (w.f = (matrix.e * b + matrix.f * d + f) * pixelRatio)
      )
    } else {
      this.setTransform(
        (w.a = matrix.a * pixelRatio),
        (w.b = matrix.b * pixelRatio),
        (w.c = matrix.c * pixelRatio),
        (w.d = matrix.d * pixelRatio),
        (w.e = matrix.e * pixelRatio),
        (w.f = matrix.f * pixelRatio)
      )
    }
  }
  useWorldTransform(worldTransform) {
    if (worldTransform) this.worldTransform = worldTransform
    const w = this.worldTransform
    if (w) this.setTransform(w.a, w.b, w.c, w.d, w.e, w.f)
  }
  setStroke(color, strokeWidth, options) {
    if (strokeWidth) this.strokeWidth = strokeWidth
    if (color) this.strokeStyle = color
    if (options) this.setStrokeOptions(options)
  }
  setStrokeOptions(options) {
    this.strokeCap = options.strokeCap === 'none' ? 'butt' : options.strokeCap
    this.strokeJoin = options.strokeJoin
    this.dashPattern = options.dashPattern
    this.dashOffset = options.dashOffset
    this.miterLimit = options.miterLimit
  }
  saveBlendMode(blendMode) {
    this.savedBlendMode = this.blendMode
    this.blendMode = blendMode
  }
  restoreBlendMode() {
    this.blendMode = this.savedBlendMode
  }
  hitFill(point, fillRule) {
    return fillRule
      ? this.context.isPointInPath(point.x, point.y, fillRule)
      : this.context.isPointInPath(point.x, point.y)
  }
  hitStroke(point, strokeWidth) {
    this.strokeWidth = strokeWidth
    return this.context.isPointInStroke(point.x, point.y)
  }
  setWorldShadow(x, y, blur, color) {
    const { pixelRatio } = this
    this.shadowOffsetX = x * pixelRatio
    this.shadowOffsetY = y * pixelRatio
    this.shadowBlur = blur * pixelRatio
    this.shadowColor = color || 'black'
  }
  setWorldBlur(blur) {
    const { pixelRatio } = this
    this.filter = `blur(${blur * pixelRatio}px)`
  }
  copyWorld(canvas, from, to, blendMode) {
    if (blendMode) this.blendMode = blendMode
    if (from) {
      const { pixelRatio } = this
      if (!to) to = from
      this.drawImage(
        canvas.view,
        from.x * pixelRatio,
        from.y * pixelRatio,
        from.width * pixelRatio,
        from.height * pixelRatio,
        to.x * pixelRatio,
        to.y * pixelRatio,
        to.width * pixelRatio,
        to.height * pixelRatio
      )
    } else {
      this.drawImage(canvas.view, 0, 0)
    }
    if (blendMode) this.blendMode = 'source-over'
  }
  copyWorldToInner(canvas, fromWorld, toInnerBounds, blendMode) {
    if (blendMode) this.blendMode = blendMode
    if (fromWorld.b || fromWorld.c) {
      this.save()
      this.resetTransform()
      this.copyWorld(canvas, fromWorld, BoundsHelper.tempToOuterOf(toInnerBounds, fromWorld))
      this.restore()
    } else {
      const { pixelRatio } = this
      this.drawImage(
        canvas.view,
        fromWorld.x * pixelRatio,
        fromWorld.y * pixelRatio,
        fromWorld.width * pixelRatio,
        fromWorld.height * pixelRatio,
        toInnerBounds.x,
        toInnerBounds.y,
        toInnerBounds.width,
        toInnerBounds.height
      )
    }
    if (blendMode) this.blendMode = 'source-over'
  }
  copyWorldByReset(canvas, from, to, blendMode, onlyResetTransform) {
    this.resetTransform()
    this.copyWorld(canvas, from, to, blendMode)
    if (!onlyResetTransform) this.useWorldTransform()
  }
  useMask(maskCanvas, fromBounds, toBounds) {
    this.copyWorld(maskCanvas, fromBounds, toBounds, 'destination-in')
  }
  useEraser(eraserCanvas, fromBounds, toBounds) {
    this.copyWorld(eraserCanvas, fromBounds, toBounds, 'destination-out')
  }
  fillWorld(bounds, color, blendMode) {
    if (blendMode) this.blendMode = blendMode
    this.fillStyle = color
    temp.set(bounds).scale(this.pixelRatio)
    this.fillRect(temp.x, temp.y, temp.width, temp.height)
    if (blendMode) this.blendMode = 'source-over'
  }
  strokeWorld(bounds, color, blendMode) {
    if (blendMode) this.blendMode = blendMode
    this.strokeStyle = color
    temp.set(bounds).scale(this.pixelRatio)
    this.strokeRect(temp.x, temp.y, temp.width, temp.height)
    if (blendMode) this.blendMode = 'source-over'
  }
  clearWorld(bounds, ceilPixel) {
    temp.set(bounds).scale(this.pixelRatio)
    if (ceilPixel) temp.ceil()
    this.clearRect(temp.x, temp.y, temp.width, temp.height)
  }
  clipWorld(bounds, ceilPixel) {
    this.beginPath()
    temp.set(bounds).scale(this.pixelRatio)
    if (ceilPixel) temp.ceil()
    this.rect(temp.x, temp.y, temp.width, temp.height)
    this.clip()
  }
  clear() {
    const { pixelRatio } = this
    this.clearRect(0, 0, this.width * pixelRatio, this.height * pixelRatio)
  }
  isSameSize(size) {
    return this.width === size.width && this.height === size.height && this.pixelRatio === size.pixelRatio
  }
  getSameCanvas(useSameWorldTransform, useSameSmooth) {
    const canvas = this.manager ? this.manager.get(this.size) : Creator.canvas(Object.assign({}, this.size))
    canvas.save()
    if (useSameWorldTransform) copy$8(canvas.worldTransform, this.worldTransform), canvas.useWorldTransform()
    if (useSameSmooth) canvas.smooth = this.smooth
    return canvas
  }
  recycle(clearBounds) {
    if (!this.recycled) {
      this.restore()
      clearBounds ? this.clearWorld(clearBounds, true) : this.clear()
      this.manager ? this.manager.recycle(this) : this.destroy()
    }
  }
  updateRender() {}
  unrealCanvas() {}
  destroy() {
    this.manager = this.view = this.parentView = null
  }
}

class LeaferCanvas extends LeaferCanvasBase {
  init() {
    const { view } = this.config
    view ? this.__createViewFrom(view) : this.__createView()
    const { style } = this.view
    style.display || (style.display = 'block')
    this.parentView = this.view.parentElement
    if (this.parentView) this.parentView.style.userSelect = 'none'
    if (Platform.syncDomFont && !this.parentView) {
      this.view.style.display = 'none'
      document.body.appendChild(this.view)
    }
    this.__createContext()
    if (!this.autoLayout) this.resize(this.config)
  }
  set backgroundColor(color) {
    this.view.style.backgroundColor = color
  }
  get backgroundColor() {
    return this.view.style.backgroundColor
  }
  set hittable(hittable) {
    this.view.style.pointerEvents = hittable ? 'auto' : 'none'
  }
  get hittable() {
    return this.view.style.pointerEvents !== 'none'
  }
  __createView() {
    this.view = document.createElement('canvas')
  }
  __createViewFrom(inputView) {
    let find = typeof inputView === 'string' ? document.getElementById(inputView) : inputView
    if (find) {
      if (find instanceof HTMLCanvasElement) {
        this.view = find
      } else {
        let parent = find
        if (find === window || find === document) {
          const div = document.createElement('div')
          const { style } = div
          style.position = 'absolute'
          style.top = style.bottom = style.left = style.right = '0px'
          document.body.appendChild(div)
          parent = div
        }
        this.__createView()
        const view = this.view
        if (parent.hasChildNodes()) {
          const { style } = view
          style.position = 'absolute'
          style.top = style.left = '0px'
          parent.style.position || (parent.style.position = 'relative')
        }
        parent.appendChild(view)
      }
    } else {
      debug$6.error(`no id: ${inputView}`)
      this.__createView()
    }
  }
  updateViewSize() {
    const { width, height, pixelRatio } = this
    const { style } = this.view
    style.width = width + 'px'
    style.height = height + 'px'
    this.view.width = Math.ceil(width * pixelRatio)
    this.view.height = Math.ceil(height * pixelRatio)
  }
  updateClientBounds() {
    this.clientBounds = this.view.getBoundingClientRect()
  }
  startAutoLayout(autoBounds, listener) {
    this.autoBounds = autoBounds
    this.resizeListener = listener
    try {
      this.resizeObserver = new ResizeObserver(entries => {
        this.updateClientBounds()
        for (const entry of entries) this.checkAutoBounds(entry.contentRect)
      })
      const parent = this.parentView
      if (parent) {
        this.resizeObserver.observe(parent)
        this.checkAutoBounds(parent.getBoundingClientRect())
      }
    } catch (_a) {
      this.imitateResizeObserver()
    }
  }
  imitateResizeObserver() {
    if (this.autoLayout) {
      if (this.parentView) this.checkAutoBounds(this.parentView.getBoundingClientRect())
      Platform.requestRender(this.imitateResizeObserver.bind(this))
    }
  }
  checkAutoBounds(parentSize) {
    const view = this.view
    const { x, y, width, height } = this.autoBounds.getBoundsFrom(parentSize)
    if (width !== this.width || height !== this.height) {
      const { style } = view
      const { pixelRatio } = this
      style.marginLeft = x + 'px'
      style.marginTop = y + 'px'
      const size = { width, height, pixelRatio }
      const oldSize = {}
      DataHelper.copyAttrs(oldSize, this, canvasSizeAttrs)
      this.resize(size)
      if (this.width !== undefined) this.resizeListener(new ResizeEvent(size, oldSize))
    }
  }
  stopAutoLayout() {
    this.autoLayout = false
    this.resizeListener = null
    if (this.resizeObserver) {
      this.resizeObserver.disconnect()
      this.resizeObserver = null
    }
  }
  unrealCanvas() {
    if (!this.unreal && this.parentView) {
      const view = this.view
      if (view) view.remove()
      this.view = this.parentView
      this.unreal = true
    }
  }
  destroy() {
    if (this.view) {
      this.stopAutoLayout()
      if (!this.unreal) {
        const view = this.view
        if (view.parentElement) view.remove()
      }
      super.destroy()
    }
  }
}
