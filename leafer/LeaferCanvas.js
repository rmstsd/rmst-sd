const BoundsHelper = {
  tempBounds: {},
  set(t, x = 0, y = 0, width = 0, height = 0) {
    t.x = x
    t.y = y
    t.width = width
    t.height = height
  },
  copy(t, bounds) {
    t.x = bounds.x
    t.y = bounds.y
    t.width = bounds.width
    t.height = bounds.height
  },
  copyAndSpread(t, bounds, spreadX, spreadY) {
    if (spreadX instanceof Array) {
      const four = fourNumber(spreadX)
      B.set(
        t,
        bounds.x - four[3],
        bounds.y - four[0],
        bounds.width + four[1] + four[3],
        bounds.height + four[2] + four[0]
      )
    } else {
      if (!spreadY) spreadY = spreadX
      B.set(t, bounds.x - spreadX, bounds.y - spreadY, bounds.width + spreadX * 2, bounds.height + spreadY * 2)
    }
  },
  minX(t) {
    return t.width > 0 ? t.x : t.x + t.width
  },
  minY(t) {
    return t.height > 0 ? t.y : t.y + t.height
  },
  maxX(t) {
    return t.width > 0 ? t.x + t.width : t.x
  },
  maxY(t) {
    return t.height > 0 ? t.y + t.height : t.y
  },
  move(t, x, y) {
    t.x += x
    t.y += y
  },
  getByMove(t, x, y) {
    t = Object.assign({}, t)
    B.move(t, x, y)
    return t
  },
  toOffsetOutBounds(t, to, parent) {
    if (!to) {
      to = t
    } else {
      copy$9(to, t)
    }
    if (parent) {
      to.offsetX = -(B.maxX(parent) - t.x)
      to.offsetY = -(B.maxY(parent) - t.y)
    } else {
      to.offsetX = t.x + t.width
      to.offsetY = t.y + t.height
    }
    B.move(to, -to.offsetX, -to.offsetY)
  },
  scale(t, scaleX, scaleY = scaleX) {
    PointHelper.scale(t, scaleX, scaleY)
    t.width *= scaleX
    t.height *= scaleY
  },
  scaleOf(t, origin, scaleX, scaleY = scaleX) {
    PointHelper.scaleOf(t, origin, scaleX, scaleY)
    t.width *= scaleX
    t.height *= scaleY
  },
  tempToOuterOf(t, matrix) {
    B.copy(B.tempBounds, t)
    B.toOuterOf(B.tempBounds, matrix)
    return B.tempBounds
  },
  getOuterOf(t, matrix) {
    t = Object.assign({}, t)
    B.toOuterOf(t, matrix)
    return t
  },
  toOuterOf(t, matrix, to) {
    to || (to = t)
    if (matrix.b === 0 && matrix.c === 0) {
      const { a, d } = matrix
      if (a > 0) {
        to.width = t.width * a
        to.x = matrix.e + t.x * a
      } else {
        to.width = t.width * -a
        to.x = matrix.e + t.x * a - to.width
      }
      if (d > 0) {
        to.height = t.height * d
        to.y = matrix.f + t.y * d
      } else {
        to.height = t.height * -d
        to.y = matrix.f + t.y * d - to.height
      }
    } else {
      point.x = t.x
      point.y = t.y
      toOuterPoint$1(matrix, point, toPoint$1)
      setPoint$3(tempPointBounds$1, toPoint$1.x, toPoint$1.y)
      point.x = t.x + t.width
      toOuterPoint$1(matrix, point, toPoint$1)
      addPoint$3(tempPointBounds$1, toPoint$1.x, toPoint$1.y)
      point.y = t.y + t.height
      toOuterPoint$1(matrix, point, toPoint$1)
      addPoint$3(tempPointBounds$1, toPoint$1.x, toPoint$1.y)
      point.x = t.x
      toOuterPoint$1(matrix, point, toPoint$1)
      addPoint$3(tempPointBounds$1, toPoint$1.x, toPoint$1.y)
      toBounds$4(tempPointBounds$1, to)
    }
  },
  toInnerOf(t, matrix, to) {
    to || (to = t)
    B.move(to, -matrix.e, -matrix.f)
    B.scale(to, 1 / matrix.a, 1 / matrix.d)
  },
  getFitMatrix(t, put) {
    const scale = Math.min(1, Math.min(t.width / put.width, t.height / put.height))
    return new Matrix(scale, 0, 0, scale, -put.x * scale, -put.y * scale)
  },
  getSpread(t, spreadX, spreadY) {
    const n = {}
    B.copyAndSpread(n, t, spreadX, spreadY)
    return n
  },
  spread(t, spreadX, spreadY = spreadX) {
    B.copyAndSpread(t, t, spreadX, spreadY)
  },
  ceil(t) {
    const { x, y } = t
    t.x = floor(t.x)
    t.y = floor(t.y)
    t.width = x > t.x ? ceil$2(t.width + x - t.x) : ceil$2(t.width)
    t.height = y > t.y ? ceil$2(t.height + y - t.y) : ceil$2(t.height)
  },
  unsign(t) {
    if (t.width < 0) {
      t.x += t.width
      t.width = -t.width
    }
    if (t.height < 0) {
      t.y += t.height
      t.height = -t.height
    }
  },
  float(t, maxLength) {
    t.x = float(t.x, maxLength)
    t.y = float(t.y, maxLength)
    t.width = float(t.width, maxLength)
    t.height = float(t.height, maxLength)
  },
  add(t, bounds) {
    right$1 = t.x + t.width
    bottom$1 = t.y + t.height
    boundsRight = bounds.x + bounds.width
    boundsBottom = bounds.y + bounds.height
    right$1 = right$1 > boundsRight ? right$1 : boundsRight
    bottom$1 = bottom$1 > boundsBottom ? bottom$1 : boundsBottom
    t.x = t.x < bounds.x ? t.x : bounds.x
    t.y = t.y < bounds.y ? t.y : bounds.y
    t.width = right$1 - t.x
    t.height = bottom$1 - t.y
  },
  addList(t, list) {
    B.setListWithFn(t, list, undefined, true)
  },
  setList(t, list, addMode = false) {
    B.setListWithFn(t, list, undefined, addMode)
  },
  addListWithFn(t, list, boundsDataFn) {
    B.setListWithFn(t, list, boundsDataFn, true)
  },
  setListWithFn(t, list, boundsDataFn, addMode = false) {
    let bounds,
      first = true
    for (let i = 0, len = list.length; i < len; i++) {
      bounds = boundsDataFn ? boundsDataFn(list[i]) : list[i]
      if (bounds && (bounds.width || bounds.height)) {
        if (first) {
          first = false
          if (!addMode) copy$9(t, bounds)
        } else {
          add$1(t, bounds)
        }
      }
    }
    if (first) B.reset(t)
  },
  setPoints(t, points) {
    points.forEach((point, index) =>
      index === 0 ? setPoint$3(tempPointBounds$1, point.x, point.y) : addPoint$3(tempPointBounds$1, point.x, point.y)
    )
    toBounds$4(tempPointBounds$1, t)
  },
  getPoints(t) {
    const { x, y, width, height } = t
    return [
      { x, y },
      { x: x + width, y },
      { x: x + width, y: y + height },
      { x, y: y + height }
    ]
  },
  hitRadiusPoint(t, point, pointMatrix) {
    if (pointMatrix) point = PointHelper.tempToInnerRadiusPointOf(point, pointMatrix)
    return (
      point.x >= t.x - point.radiusX &&
      point.x <= t.x + t.width + point.radiusX &&
      point.y >= t.y - point.radiusY &&
      point.y <= t.y + t.height + point.radiusY
    )
  },
  hitPoint(t, point, pointMatrix) {
    if (pointMatrix) point = PointHelper.tempToInnerOf(point, pointMatrix)
    return point.x >= t.x && point.x <= t.x + t.width && point.y >= t.y && point.y <= t.y + t.height
  },
  hit(t, other, otherMatrix) {
    if (otherMatrix) other = B.tempToOuterOf(other, otherMatrix)
    return !(
      t.y + t.height < other.y ||
      other.y + other.height < t.y ||
      t.x + t.width < other.x ||
      other.x + other.width < t.x
    )
  },
  includes(t, other, otherMatrix) {
    if (otherMatrix) other = B.tempToOuterOf(other, otherMatrix)
    return (
      t.x <= other.x &&
      t.y <= other.y &&
      t.x + t.width >= other.x + other.width &&
      t.y + t.height >= other.y + other.height
    )
  },
  getIntersectData(t, other, otherMatrix) {
    if (otherMatrix) other = B.tempToOuterOf(other, otherMatrix)
    if (!B.hit(t, other)) return getBoundsData()
    let { x, y, width, height } = other
    right$1 = x + width
    bottom$1 = y + height
    boundsRight = t.x + t.width
    boundsBottom = t.y + t.height
    x = x > t.x ? x : t.x
    y = y > t.y ? y : t.y
    right$1 = right$1 < boundsRight ? right$1 : boundsRight
    bottom$1 = bottom$1 < boundsBottom ? bottom$1 : boundsBottom
    width = right$1 - x
    height = bottom$1 - y
    return { x, y, width, height }
  },
  intersect(t, other, otherMatrix) {
    B.copy(t, B.getIntersectData(t, other, otherMatrix))
  },
  isSame(t, bounds) {
    return t.x === bounds.x && t.y === bounds.y && t.width === bounds.width && t.height === bounds.height
  },
  isEmpty(t) {
    return t.x === 0 && t.y === 0 && t.width === 0 && t.height === 0
  },
  reset(t) {
    B.set(t)
  }
}
const B = BoundsHelper

const canvasSizeAttrs = ['width', 'height', 'pixelRatio']
class Bounds {
  get minX() {
    return BoundsHelper.minX(this)
  }
  get minY() {
    return BoundsHelper.minY(this)
  }
  get maxX() {
    return BoundsHelper.maxX(this)
  }
  get maxY() {
    return BoundsHelper.maxY(this)
  }
  constructor(x, y, width, height) {
    this.set(x, y, width, height)
  }
  set(x, y, width, height) {
    typeof x === 'object' ? BoundsHelper.copy(this, x) : BoundsHelper.set(this, x, y, width, height)
    return this
  }
  get() {
    const { x, y, width, height } = this
    return { x, y, width, height }
  }
  clone() {
    return new Bounds(this)
  }
  move(x, y) {
    BoundsHelper.move(this, x, y)
    return this
  }
  scale(scaleX, scaleY) {
    BoundsHelper.scale(this, scaleX, scaleY)
    return this
  }
  scaleOf(origin, scaleX, scaleY) {
    BoundsHelper.scaleOf(this, origin, scaleX, scaleY)
    return this
  }
  toOuterOf(matrix, to) {
    BoundsHelper.toOuterOf(this, matrix, to)
    return this
  }
  toInnerOf(matrix, to) {
    BoundsHelper.toInnerOf(this, matrix, to)
    return this
  }
  getFitMatrix(put) {
    return BoundsHelper.getFitMatrix(this, put)
  }
  spread(fourNumber, spreadY) {
    BoundsHelper.spread(this, fourNumber, spreadY)
    return this
  }
  shrink(fourNumber) {
    BoundsHelper.spread(this, MathHelper.minus(fourNumber, true))
    return this
  }
  ceil() {
    BoundsHelper.ceil(this)
    return this
  }
  unsign() {
    BoundsHelper.unsign(this)
    return this
  }
  float(maxLength) {
    BoundsHelper.float(this, maxLength)
    return this
  }
  add(bounds) {
    BoundsHelper.add(this, bounds)
    return this
  }
  addList(boundsList) {
    BoundsHelper.setList(this, boundsList, true)
    return this
  }
  setList(boundsList) {
    BoundsHelper.setList(this, boundsList)
    return this
  }
  addListWithFn(list, boundsDataFn) {
    BoundsHelper.setListWithFn(this, list, boundsDataFn, true)
    return this
  }
  setListWithFn(list, boundsDataFn) {
    BoundsHelper.setListWithFn(this, list, boundsDataFn)
    return this
  }
  setPoints(points) {
    BoundsHelper.setPoints(this, points)
    return this
  }
  getPoints() {
    return BoundsHelper.getPoints(this)
  }
  hitPoint(point, pointMatrix) {
    return BoundsHelper.hitPoint(this, point, pointMatrix)
  }
  hitRadiusPoint(point, pointMatrix) {
    return BoundsHelper.hitRadiusPoint(this, point, pointMatrix)
  }
  hit(bounds, boundsMatrix) {
    return BoundsHelper.hit(this, bounds, boundsMatrix)
  }
  includes(bounds, boundsMatrix) {
    return BoundsHelper.includes(this, bounds, boundsMatrix)
  }
  intersect(bounds, boundsMatrix) {
    BoundsHelper.intersect(this, bounds, boundsMatrix)
    return this
  }
  getIntersect(bounds, boundsMatrix) {
    return new Bounds(BoundsHelper.getIntersectData(this, bounds, boundsMatrix))
  }
  isSame(bounds) {
    return BoundsHelper.isSame(this, bounds)
  }
  isEmpty() {
    return BoundsHelper.isEmpty(this)
  }
  reset() {
    BoundsHelper.reset(this)
  }
}
const DataHelper = {
  default(t, defaultData) {
    assign(defaultData, t)
    assign(t, defaultData)
    return t
  },
  assign(t, merge) {
    let value
    Object.keys(merge).forEach(key => {
      var _a
      value = merge[key]
      if ((value === null || value === void 0 ? void 0 : value.constructor) === Object) {
        ;((_a = t[key]) === null || _a === void 0 ? void 0 : _a.constructor) === Object
          ? assign(t[key], merge[key])
          : (t[key] = merge[key])
      } else {
        t[key] = merge[key]
      }
    })
  },
  copyAttrs(t, from, include) {
    include.forEach(key => {
      if (from[key] !== undefined) t[key] = from[key]
    })
    return t
  },
  clone(data) {
    return JSON.parse(JSON.stringify(data))
  }
}
const { assign } = DataHelper

const contextMethodNameList = []

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

const minSize = { width: 1, height: 1, pixelRatio: 1 }

const IncrementId = {
  RUNTIME: 'runtime',
  LEAF: 'leaf',
  TASK: 'task',
  CNAVAS: 'canvas',
  IMAGE: 'image',
  types: {},
  create(typeName) {
    const { types } = I$2
    if (types[typeName]) {
      return types[typeName]++
    } else {
      types[typeName] = 1
      return 0
    }
  }
}

const I$2 = IncrementId

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

function __decorate(decorators, target, key, desc) {
  var c = arguments.length,
    r = c < 3 ? target : desc === null ? (desc = Object.getOwnPropertyDescriptor(target, key)) : desc,
    d
  if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
    r = Reflect.decorate(decorators, target, key, desc)
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if ((d = decorators[i])) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r
  return c > 3 && r && Object.defineProperty(target, key, r), r
}

function contextMethod() {
  return (_target, key) => {
    contextMethodNameList.push(key)
  }
}

__decorate([contextMethod()], Canvas.prototype, 'measureText', null)

const Platform = {}
const Creator = {}

Object.assign(Creator, {
  canvas: (options, manager) => new LeaferCanvas(options, manager)
})

Platform.canvas = Creator.canvas()
