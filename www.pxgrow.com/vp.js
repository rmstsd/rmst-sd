var LeaferUI = (function (t) {
  'use strict'
  var e, i
  ;(t.PathNodeHandleType = void 0),
    ((e = t.PathNodeHandleType || (t.PathNodeHandleType = {}))[(e.none = 1)] = 'none'),
    (e[(e.free = 2)] = 'free'),
    (e[(e.mirrorAngle = 3)] = 'mirrorAngle'),
    (e[(e.mirror = 4)] = 'mirror'),
    (t.Answer = void 0),
    ((i = t.Answer || (t.Answer = {}))[(i.No = 0)] = 'No'),
    (i[(i.Yes = 1)] = 'Yes'),
    (i[(i.NoAndSkip = 2)] = 'NoAndSkip'),
    (i[(i.YesAndSkip = 3)] = 'YesAndSkip')
  const s = {}
  function n(t) {
    return void 0 === t
  }
  function o(t) {
    return null == t
  }
  function r(t) {
    return 'string' == typeof t
  }
  const { isFinite: a } = Number
  function h(t) {
    return 'number' == typeof t
  }
  const l = /^-?\d+(?:\.\d+)?$/
  function d(t) {
    return 'string' == typeof t && l.test(t) ? +t : t
  }
  const { isArray: c } = Array
  function u(t) {
    return t && 'object' == typeof t
  }
  function p(t) {
    return u(t) && !c(t)
  }
  function g(t) {
    return '{}' === JSON.stringify(t)
  }
  const _ = {
      default: (t, e) => (f(e, t), f(t, e), t),
      assign(t, e, i) {
        let s
        Object.keys(e).forEach(n => {
          var o, r
          if (
            ((s = e[n]),
            (null == s ? void 0 : s.constructor) === Object &&
              (null === (o = t[n]) || void 0 === o ? void 0 : o.constructor) === Object)
          )
            return f(t[n], e[n], i && i[n])
          i && n in i
            ? (null === (r = i[n]) || void 0 === r ? void 0 : r.constructor) === Object && f((t[n] = {}), e[n], i[n])
            : (t[n] = e[n])
        })
      },
      copyAttrs: (t, e, i) => (
        i.forEach(i => {
          n(e[i]) || (t[i] = e[i])
        }),
        t
      ),
      clone: t => JSON.parse(JSON.stringify(t)),
      toMap(t) {
        const e = {}
        for (let i = 0, s = t.length; i < s; i++) e[t[i]] = !0
        return e
      },
      stintSet(t, e, i) {
        i || (i = void 0), t[e] !== i && (t[e] = i)
      }
    },
    { assign: f } = _
  class m {
    get __useNaturalRatio() {
      return !0
    }
    get __isLinePath() {
      const { path: t } = this
      return t && 6 === t.length && 1 === t[0]
    }
    get __usePathBox() {
      return this.__pathInputed
    }
    get __blendMode() {
      if (this.eraser && 'path' !== this.eraser) return 'destination-out'
      const { blendMode: t } = this
      return 'pass-through' === t ? null : t
    }
    constructor(t) {
      this.__leaf = t
    }
    __get(t) {
      if (this.__input) {
        const e = this.__input[t]
        if (!n(e)) return e
      }
      return this[t]
    }
    __getData() {
      const t = { tag: this.__leaf.tag },
        { __input: e } = this
      let i
      for (let s in this) '_' !== s[0] && ((i = e ? e[s] : void 0), (t[s] = n(i) ? this[s] : i))
      return t
    }
    __setInput(t, e) {
      this.__input || (this.__input = {}), (this.__input[t] = e)
    }
    __getInput(t) {
      if (this.__input) {
        const e = this.__input[t]
        if (!n(e)) return e
      }
      if ('path' !== t || this.__pathInputed) return this['_' + t]
    }
    __removeInput(t) {
      this.__input && !n(this.__input[t]) && (this.__input[t] = void 0)
    }
    __getInputData(t, e) {
      const i = {}
      if (t)
        if (c(t)) for (let e of t) i[e] = this.__getInput(e)
        else for (let e in t) i[e] = this.__getInput(e)
      else {
        let t,
          e,
          { __input: s } = this
        i.tag = this.__leaf.tag
        for (let o in this)
          if ('_' !== o[0] && ((t = this['_' + o]), !n(t))) {
            if ('path' === o && !this.__pathInputed) continue
            ;(e = s ? s[o] : void 0), (i[o] = n(e) ? t : e)
          }
      }
      if (e && e.matrix) {
        const { a: t, b: e, c: s, d: n, e: o, f: r } = this.__leaf.__localMatrix
        i.matrix = { a: t, b: e, c: s, d: n, e: o, f: r }
      }
      return i
    }
    __setMiddle(t, e) {
      this.__middle || (this.__middle = {}), (this.__middle[t] = e)
    }
    __getMiddle(t) {
      return this.__middle && this.__middle[t]
    }
    __checkSingle() {
      const t = this
      if ('pass-through' === t.blendMode) {
        const e = this.__leaf
        ;(t.opacity < 1 && (e.isBranch || t.__hasMultiPaint)) || e.__hasEraser || t.eraser || t.filter
          ? (t.__single = !0)
          : t.__single && (t.__single = !1)
      } else t.__single = !0
    }
    __removeNaturalSize() {
      this.__naturalWidth = this.__naturalHeight = void 0
    }
    destroy() {
      this.__input = this.__middle = null
    }
  }
  const { floor: y, max: v } = Math,
    w = {
      toURL(t, e) {
        let i = encodeURIComponent(t)
        return 'text' === e ? (i = 'data:text/plain;charset=utf-8,' + i) : 'svg' === e && (i = 'data:image/svg+xml,' + i), i
      },
      image: {
        hitCanvasSize: 100,
        maxCacheSize: 4096e3,
        maxPatternSize: 8847360,
        crossOrigin: 'anonymous',
        isLarge: (t, e, i, s) => t.width * t.height * (e ? e * i : 1) > (s || x.maxCacheSize),
        isSuperLarge: (t, e, i) => x.isLarge(t, e, i, x.maxPatternSize),
        getRealURL(t) {
          const { prefix: e, suffix: i } = w.image
          return (
            !i || t.startsWith('data:') || t.startsWith('blob:') || (t += (t.includes('?') ? '&' : '?') + i),
            e && '/' === t[0] && (t = e + t),
            t
          )
        },
        resize(t, e, i, s, n, o, r, a, h) {
          const l = w.origin.createCanvas(v(y(e + (s || 0)), 1), v(y(i + (n || 0)), 1)),
            d = l.getContext('2d')
          if ((a && (d.globalAlpha = a), (d.imageSmoothingEnabled = !1 !== r), o)) {
            const s = e / o.width,
              n = i / o.height
            d.setTransform(s, 0, 0, n, -o.x * s, -o.y * n), d.drawImage(t, 0, 0, t.width, t.height)
          } else d.drawImage(t, 0, 0, e, i)
          return l
        },
        setPatternTransform(t, e, i) {
          try {
            e && t.setTransform && (t.setTransform(e), (e = void 0))
          } catch (t) {}
          i && _.stintSet(i, 'transform', e)
        }
      }
    },
    { image: x } = w,
    b = {
      RUNTIME: 'runtime',
      LEAF: 'leaf',
      TASK: 'task',
      CNAVAS: 'canvas',
      IMAGE: 'image',
      types: {},
      create(t) {
        const { types: e } = E
        return e[t] ? e[t]++ : ((e[t] = 1), 0)
      }
    },
    E = b
  let T, S, k
  const { max: B } = Math,
    P = [0, 0, 0, 0],
    L = {
      zero: [...P],
      tempFour: P,
      set: (t, e, i, s, n) => (void 0 === i && (i = s = n = e), (t[0] = e), (t[1] = i), (t[2] = s), (t[3] = n), t),
      setTemp: (t, e, i, s) => R(P, t, e, i, s),
      toTempAB(t, e, i) {
        ;(k = i ? (h(t) ? e : t) : []),
          h(t) ? ((T = O(t)), (S = e)) : h(e) ? ((T = t), (S = O(e))) : ((T = t), (S = e)),
          4 !== T.length && (T = C(T)),
          4 !== S.length && (S = C(S))
      },
      get(t, e) {
        let i
        if (!h(t))
          switch (t.length) {
            case 4:
              i = n(e) ? t : [...t]
              break
            case 2:
              i = [t[0], t[1], t[0], t[1]]
              break
            case 3:
              i = [t[0], t[1], t[2], t[1]]
              break
            case 1:
              t = t[0]
              break
            default:
              t = 0
          }
        if ((i || (i = [t, t, t, t]), !n(e))) for (let t = 0; t < 4; t++) i[t] > e && (i[t] = e)
        return i
      },
      max: (t, e, i) => (h(t) && h(e) ? B(t, e) : (A(t, e, i), R(k, B(T[0], S[0]), B(T[1], S[1]), B(T[2], S[2]), B(T[3], S[3])))),
      add: (t, e, i) => (h(t) && h(e) ? t + e : (A(t, e, i), R(k, T[0] + S[0], T[1] + S[1], T[2] + S[2], T[3] + S[3]))),
      swapAndScale(t, e, i, s) {
        if (h(t)) return e === i ? t * e : [t * i, t * e]
        const n = s ? t : [],
          [o, r, a, l] = 4 === t.length ? t : C(t)
        return R(n, a * i, l * e, o * i, r * e)
      }
    },
    { set: R, get: C, setTemp: O, toTempAB: A } = L,
    { round: D, pow: M, max: I, floor: F, PI: W } = Math,
    z = {
      within: (t, e, i) => (u(e) && ((i = e.max), (e = e.min)), !n(e) && t < e && (t = e), !n(i) && t > i && (t = i), t),
      fourNumber: L.get,
      formatRotation: (t, e) => (
        (t %= 360), e ? t < 0 && (t += 360) : (t > 180 && (t -= 360), t < -180 && (t += 360)), z.float(t)
      ),
      getGapRotation(t, e, i = 0) {
        let s = t + i
        if (e > 1) {
          const t = Math.abs(s % e)
          ;(t < 1 || t > e - 1) && (s = Math.round(s / e) * e)
        }
        return s - i
      },
      float(t, e) {
        const i = n(e) ? 1e12 : M(10, e)
        return -0 === (t = D(t * i) / i) ? 0 : t
      },
      sign: t => (t < 0 ? -1 : 1),
      getScaleData(t, e, i, s) {
        if ((s || (s = {}), e)) {
          const t = (h(e) ? e : e.width || 0) / i.width,
            n = (h(e) ? e : e.height || 0) / i.height
          ;(s.scaleX = t || n || 1), (s.scaleY = n || t || 1)
        } else t && z.assignScale(s, t)
        return s
      },
      assignScale(t, e) {
        h(e) ? (t.scaleX = t.scaleY = e) : ((t.scaleX = e.x), (t.scaleY = e.y))
      },
      getFloorScale: (t, e = 1) => I(F(t), e) / t,
      randInt: U,
      randColor: t => `rgba(${U(255)},${U(255)},${U(255)},${t || 1})`
    }
  function U(t) {
    return Math.round(Math.random() * t)
  }
  const H = W / 180,
    N = 2 * W,
    Y = W / 2
  function X() {
    return { x: 0, y: 0 }
  }
  function V() {
    return { x: 0, y: 0, width: 0, height: 0 }
  }
  function G() {
    return { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 }
  }
  const { sin: j, cos: K, acos: q, sqrt: Z } = Math,
    { float: $ } = z,
    J = {}
  function Q() {
    return Object.assign(
      Object.assign(Object.assign({}, { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 }), { x: 0, y: 0, width: 0, height: 0 }),
      { scaleX: 1, scaleY: 1, rotation: 0, skewX: 0, skewY: 0 }
    )
  }
  const tt = {
      defaultMatrix: { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 },
      defaultWorld: Q(),
      tempMatrix: {},
      set(t, e = 1, i = 0, s = 0, n = 1, o = 0, r = 0) {
        ;(t.a = e), (t.b = i), (t.c = s), (t.d = n), (t.e = o), (t.f = r)
      },
      get: G,
      getWorld: Q,
      copy(t, e) {
        ;(t.a = e.a), (t.b = e.b), (t.c = e.c), (t.d = e.d), (t.e = e.e), (t.f = e.f)
      },
      translate(t, e, i) {
        ;(t.e += e), (t.f += i)
      },
      translateInner(t, e, i, s) {
        ;(t.e += t.a * e + t.c * i), (t.f += t.b * e + t.d * i), s && ((t.e -= e), (t.f -= i))
      },
      scale(t, e, i = e) {
        ;(t.a *= e), (t.b *= e), (t.c *= i), (t.d *= i)
      },
      pixelScale(t, e, i) {
        i || (i = t), (i.a = t.a * e), (i.b = t.b * e), (i.c = t.c * e), (i.d = t.d * e), (i.e = t.e * e), (i.f = t.f * e)
      },
      scaleOfOuter(t, e, i, s) {
        et.toInnerPoint(t, e, J), et.scaleOfInner(t, J, i, s)
      },
      scaleOfInner(t, e, i, s = i) {
        et.translateInner(t, e.x, e.y), et.scale(t, i, s), et.translateInner(t, -e.x, -e.y)
      },
      rotate(t, e) {
        const { a: i, b: s, c: n, d: o } = t,
          r = K((e *= H)),
          a = j(e)
        ;(t.a = i * r - s * a), (t.b = i * a + s * r), (t.c = n * r - o * a), (t.d = n * a + o * r)
      },
      rotateOfOuter(t, e, i) {
        et.toInnerPoint(t, e, J), et.rotateOfInner(t, J, i)
      },
      rotateOfInner(t, e, i) {
        et.translateInner(t, e.x, e.y), et.rotate(t, i), et.translateInner(t, -e.x, -e.y)
      },
      skew(t, e, i) {
        const { a: s, b: n, c: o, d: r } = t
        i && ((i *= H), (t.a = s + o * i), (t.b = n + r * i)), e && ((e *= H), (t.c = o + s * e), (t.d = r + n * e))
      },
      skewOfOuter(t, e, i, s) {
        et.toInnerPoint(t, e, J), et.skewOfInner(t, J, i, s)
      },
      skewOfInner(t, e, i, s = 0) {
        et.translateInner(t, e.x, e.y), et.skew(t, i, s), et.translateInner(t, -e.x, -e.y)
      },
      multiply(t, e) {
        const { a: i, b: s, c: n, d: o, e: r, f: a } = t
        ;(t.a = e.a * i + e.b * n),
          (t.b = e.a * s + e.b * o),
          (t.c = e.c * i + e.d * n),
          (t.d = e.c * s + e.d * o),
          (t.e = e.e * i + e.f * n + r),
          (t.f = e.e * s + e.f * o + a)
      },
      multiplyParent(t, e, i, s, o) {
        const { e: r, f: a } = t
        if ((i || (i = t), n(s) && (s = 1 !== t.a || t.b || t.c || 1 !== t.d), s)) {
          const { a: s, b: n, c: r, d: a } = t
          ;(i.a = s * e.a + n * e.c),
            (i.b = s * e.b + n * e.d),
            (i.c = r * e.a + a * e.c),
            (i.d = r * e.b + a * e.d),
            o && ((i.scaleX = e.scaleX * o.scaleX), (i.scaleY = e.scaleY * o.scaleY))
        } else (i.a = e.a), (i.b = e.b), (i.c = e.c), (i.d = e.d), o && ((i.scaleX = e.scaleX), (i.scaleY = e.scaleY))
        ;(i.e = r * e.a + a * e.c + e.e), (i.f = r * e.b + a * e.d + e.f)
      },
      divide(t, e) {
        et.multiply(t, et.tempInvert(e))
      },
      divideParent(t, e) {
        et.multiplyParent(t, et.tempInvert(e))
      },
      tempInvert(t) {
        const { tempMatrix: e } = et
        return et.copy(e, t), et.invert(e), e
      },
      invert(t) {
        const { a: e, b: i, c: s, d: n, e: o, f: r } = t
        if (i || s) {
          const a = 1 / (e * n - i * s)
          ;(t.a = n * a),
            (t.b = -i * a),
            (t.c = -s * a),
            (t.d = e * a),
            (t.e = -(o * n - r * s) * a),
            (t.f = -(r * e - o * i) * a)
        } else if (1 === e && 1 === n) (t.e = -o), (t.f = -r)
        else {
          const i = 1 / (e * n)
          ;(t.a = n * i), (t.d = e * i), (t.e = -o * n * i), (t.f = -r * e * i)
        }
      },
      toOuterPoint(t, e, i, s) {
        const { x: n, y: o } = e
        i || (i = e), (i.x = n * t.a + o * t.c), (i.y = n * t.b + o * t.d), s || ((i.x += t.e), (i.y += t.f))
      },
      toInnerPoint(t, e, i, s) {
        const { a: n, b: o, c: r, d: a } = t,
          h = 1 / (n * a - o * r),
          { x: l, y: d } = e
        if ((i || (i = e), (i.x = (l * a - d * r) * h), (i.y = (d * n - l * o) * h), !s)) {
          const { e: e, f: s } = t
          ;(i.x -= (e * a - s * r) * h), (i.y -= (s * n - e * o) * h)
        }
      },
      setLayout(t, e, i, s, o) {
        const { x: r, y: a, scaleX: h, scaleY: l } = e
        if ((n(o) && (o = e.rotation || e.skewX || e.skewY), o)) {
          const { rotation: i, skewX: s, skewY: n } = e,
            o = i * H,
            r = K(o),
            a = j(o)
          if (s || n) {
            const e = s * H,
              i = n * H
            ;(t.a = (r + i * -a) * h), (t.b = (a + i * r) * h), (t.c = (e * r - a) * l), (t.d = (r + e * a) * l)
          } else (t.a = r * h), (t.b = a * h), (t.c = -a * l), (t.d = r * l)
        } else (t.a = h), (t.b = 0), (t.c = 0), (t.d = l)
        ;(t.e = r), (t.f = a), (i = i || s) && et.translateInner(t, -i.x, -i.y, !s)
      },
      getLayout(t, e, i, s) {
        const { a: n, b: o, c: r, d: a, e: h, f: l } = t
        let d,
          c,
          u,
          p,
          g,
          _ = h,
          f = l
        if (o || r) {
          const t = n * a - o * r
          if (r && !s) {
            ;(d = Z(n * n + o * o)), (c = t / d)
            const e = n / d
            u = o > 0 ? q(e) : -q(e)
          } else {
            ;(c = Z(r * r + a * a)), (d = t / c)
            const e = r / c
            u = Y - (a > 0 ? q(-e) : -q(e))
          }
          const e = $(K(u)),
            i = j(u)
          ;(d = $(d)),
            (c = $(c)),
            (p = e ? $((r / c + i) / e / H, 9) : 0),
            (g = e ? $((o / d - i) / e / H, 9) : 0),
            (u = $(u / H))
        } else (d = n), (c = a), (u = p = g = 0)
        return (
          (e = i || e) && ((_ += e.x * n + e.y * r), (f += e.x * o + e.y * a), i || ((_ -= e.x), (f -= e.y))),
          { x: _, y: f, scaleX: d, scaleY: c, rotation: u, skewX: p, skewY: g }
        )
      },
      withScale(t, e, i = e) {
        const s = t
        if (!e || !i) {
          const { a: s, b: n, c: o, d: r } = t
          n || o ? (i = (s * r - n * o) / (e = Z(s * s + n * n))) : ((e = s), (i = r))
        }
        return (s.scaleX = e), (s.scaleY = i), s
      },
      reset(t) {
        et.set(t)
      }
    },
    et = tt,
    { float: it } = z,
    { toInnerPoint: st, toOuterPoint: nt } = tt,
    { sin: ot, cos: rt, abs: at, sqrt: ht, atan2: lt, min: dt, round: ct } = Math,
    ut = {
      defaultPoint: { x: 0, y: 0 },
      tempPoint: {},
      tempRadiusPoint: {},
      set(t, e = 0, i = 0) {
        ;(t.x = e), (t.y = i)
      },
      setRadius(t, e, i) {
        ;(t.radiusX = e), (t.radiusY = n(i) ? e : i)
      },
      copy(t, e) {
        ;(t.x = e.x), (t.y = e.y)
      },
      copyFrom(t, e, i) {
        ;(t.x = e), (t.y = i)
      },
      round(t, e) {
        ;(t.x = e ? ct(t.x - 0.5) + 0.5 : ct(t.x)), (t.y = e ? ct(t.y - 0.5) + 0.5 : ct(t.y))
      },
      move(t, e, i) {
        u(e) ? ((t.x += e.x), (t.y += e.y)) : ((t.x += e), (t.y += i))
      },
      scale(t, e, i = e) {
        t.x && (t.x *= e), t.y && (t.y *= i)
      },
      scaleOf(t, e, i, s = i) {
        ;(t.x += (t.x - e.x) * (i - 1)), (t.y += (t.y - e.y) * (s - 1))
      },
      rotate(t, e, i) {
        i || (i = pt.defaultPoint)
        const s = rt((e *= H)),
          n = ot(e),
          o = t.x - i.x,
          r = t.y - i.y
        ;(t.x = i.x + o * s - r * n), (t.y = i.y + o * n + r * s)
      },
      tempToInnerOf(t, e) {
        const { tempPoint: i } = pt
        return _t(i, t), st(e, i, i), i
      },
      tempToOuterOf(t, e) {
        const { tempPoint: i } = pt
        return _t(i, t), nt(e, i, i), i
      },
      tempToInnerRadiusPointOf(t, e) {
        const { tempRadiusPoint: i } = pt
        return _t(i, t), pt.toInnerRadiusPointOf(t, e, i), i
      },
      copyRadiusPoint: (t, e, i, s) => (_t(t, e), ft(t, i, s), t),
      toInnerRadiusPointOf(t, e, i) {
        i || (i = t), st(e, t, i), (i.radiusX = Math.abs(t.radiusX / e.scaleX)), (i.radiusY = Math.abs(t.radiusY / e.scaleY))
      },
      toInnerOf(t, e, i) {
        st(e, t, i)
      },
      toOuterOf(t, e, i) {
        nt(e, t, i)
      },
      getCenter: (t, e) => ({ x: t.x + (e.x - t.x) / 2, y: t.y + (e.y - t.y) / 2 }),
      getCenterX: (t, e) => t + (e - t) / 2,
      getCenterY: (t, e) => t + (e - t) / 2,
      getDistance: (t, e) => gt(t.x, t.y, e.x, e.y),
      getDistanceFrom(t, e, i, s) {
        const n = at(i - t),
          o = at(s - e)
        return ht(n * n + o * o)
      },
      getMinDistanceFrom: (t, e, i, s, n, o) => dt(gt(t, e, i, s), gt(i, s, n, o)),
      getAngle: (t, e) => mt(t, e) / H,
      getRotation: (t, e, i, s) => (s || (s = e), pt.getRadianFrom(t.x, t.y, e.x, e.y, i.x, i.y, s.x, s.y) / H),
      getRadianFrom(t, e, i, s, o, r, a, h) {
        n(a) && ((a = i), (h = s))
        const l = t - i,
          d = e - s,
          c = o - a,
          u = r - h
        return Math.atan2(l * u - d * c, l * c + d * u)
      },
      getAtan2: (t, e) => lt(e.y - t.y, e.x - t.x),
      getDistancePoint(t, e, i, s, n) {
        const o = mt(t, e)
        return n && (t = e), s || (e = {}), (e.x = t.x + rt(o) * i), (e.y = t.y + ot(o) * i), e
      },
      toNumberPoints(t) {
        let e = t
        return u(t[0]) && ((e = []), t.forEach(t => e.push(t.x, t.y))), e
      },
      isSame: (t, e) => it(t.x) === it(e.x) && it(t.y) === it(e.y),
      reset(t) {
        pt.reset(t)
      }
    },
    pt = ut,
    { getDistanceFrom: gt, copy: _t, setRadius: ft, getAtan2: mt } = pt
  class yt {
    constructor(t, e) {
      this.set(t, e)
    }
    set(t, e) {
      return u(t) ? ut.copy(this, t) : ut.set(this, t, e), this
    }
    get() {
      const { x: t, y: e } = this
      return { x: t, y: e }
    }
    clone() {
      return new yt(this)
    }
    move(t, e) {
      return ut.move(this, t, e), this
    }
    scale(t, e) {
      return ut.scale(this, t, e), this
    }
    scaleOf(t, e, i) {
      return ut.scaleOf(this, t, e, i), this
    }
    rotate(t, e) {
      return ut.rotate(this, t, e), this
    }
    rotateOf(t, e) {
      return ut.rotate(this, e, t), this
    }
    getRotation(t, e, i) {
      return ut.getRotation(this, t, e, i)
    }
    toInnerOf(t, e) {
      return ut.toInnerOf(this, t, e), this
    }
    toOuterOf(t, e) {
      return ut.toOuterOf(this, t, e), this
    }
    getCenter(t) {
      return new yt(ut.getCenter(this, t))
    }
    getDistance(t) {
      return ut.getDistance(this, t)
    }
    getDistancePoint(t, e, i, s) {
      return new yt(ut.getDistancePoint(this, t, e, i, s))
    }
    getAngle(t) {
      return ut.getAngle(this, t)
    }
    getAtan2(t) {
      return ut.getAtan2(this, t)
    }
    isSame(t) {
      return ut.isSame(this, t)
    }
    reset() {
      return ut.reset(this), this
    }
  }
  const vt = new yt()
  class wt {
    constructor(t, e, i, s, n, o) {
      this.set(t, e, i, s, n, o)
    }
    set(t, e, i, s, n, o) {
      return u(t) ? tt.copy(this, t) : tt.set(this, t, e, i, s, n, o), this
    }
    setWith(t) {
      return tt.copy(this, t), (this.scaleX = t.scaleX), (this.scaleY = t.scaleY), this
    }
    get() {
      const { a: t, b: e, c: i, d: s, e: n, f: o } = this
      return { a: t, b: e, c: i, d: s, e: n, f: o }
    }
    clone() {
      return new wt(this)
    }
    translate(t, e) {
      return tt.translate(this, t, e), this
    }
    translateInner(t, e) {
      return tt.translateInner(this, t, e), this
    }
    scale(t, e) {
      return tt.scale(this, t, e), this
    }
    scaleWith(t, e) {
      return tt.scale(this, t, e), (this.scaleX *= t), (this.scaleY *= e || t), this
    }
    pixelScale(t) {
      return tt.pixelScale(this, t), this
    }
    scaleOfOuter(t, e, i) {
      return tt.scaleOfOuter(this, t, e, i), this
    }
    scaleOfInner(t, e, i) {
      return tt.scaleOfInner(this, t, e, i), this
    }
    rotate(t) {
      return tt.rotate(this, t), this
    }
    rotateOfOuter(t, e) {
      return tt.rotateOfOuter(this, t, e), this
    }
    rotateOfInner(t, e) {
      return tt.rotateOfInner(this, t, e), this
    }
    skew(t, e) {
      return tt.skew(this, t, e), this
    }
    skewOfOuter(t, e, i) {
      return tt.skewOfOuter(this, t, e, i), this
    }
    skewOfInner(t, e, i) {
      return tt.skewOfInner(this, t, e, i), this
    }
    multiply(t) {
      return tt.multiply(this, t), this
    }
    multiplyParent(t) {
      return tt.multiplyParent(this, t), this
    }
    divide(t) {
      return tt.divide(this, t), this
    }
    divideParent(t) {
      return tt.divideParent(this, t), this
    }
    invert() {
      return tt.invert(this), this
    }
    invertWith() {
      return tt.invert(this), (this.scaleX = 1 / this.scaleX), (this.scaleY = 1 / this.scaleY), this
    }
    toOuterPoint(t, e, i) {
      tt.toOuterPoint(this, t, e, i)
    }
    toInnerPoint(t, e, i) {
      tt.toInnerPoint(this, t, e, i)
    }
    setLayout(t, e, i) {
      return tt.setLayout(this, t, e, i), this
    }
    getLayout(t, e, i) {
      return tt.getLayout(this, t, e, i)
    }
    withScale(t, e) {
      return tt.withScale(this, t, e)
    }
    reset() {
      tt.reset(this)
    }
  }
  const xt = new wt(),
    bt = {
      tempPointBounds: {},
      setPoint(t, e, i) {
        ;(t.minX = t.maxX = e), (t.minY = t.maxY = i)
      },
      addPoint(t, e, i) {
        ;(t.minX = e < t.minX ? e : t.minX),
          (t.minY = i < t.minY ? i : t.minY),
          (t.maxX = e > t.maxX ? e : t.maxX),
          (t.maxY = i > t.maxY ? i : t.maxY)
      },
      addBounds(t, e, i, s, n) {
        Et(t, e, i), Et(t, e + s, i + n)
      },
      copy(t, e) {
        ;(t.minX = e.minX), (t.minY = e.minY), (t.maxX = e.maxX), (t.maxY = e.maxY)
      },
      addPointBounds(t, e) {
        ;(t.minX = e.minX < t.minX ? e.minX : t.minX),
          (t.minY = e.minY < t.minY ? e.minY : t.minY),
          (t.maxX = e.maxX > t.maxX ? e.maxX : t.maxX),
          (t.maxY = e.maxY > t.maxY ? e.maxY : t.maxY)
      },
      toBounds(t, e) {
        ;(e.x = t.minX), (e.y = t.minY), (e.width = t.maxX - t.minX), (e.height = t.maxY - t.minY)
      }
    },
    { addPoint: Et } = bt
  var Tt, St
  ;(t.Direction4 = void 0),
    ((Tt = t.Direction4 || (t.Direction4 = {}))[(Tt.top = 0)] = 'top'),
    (Tt[(Tt.right = 1)] = 'right'),
    (Tt[(Tt.bottom = 2)] = 'bottom'),
    (Tt[(Tt.left = 3)] = 'left'),
    (t.Direction9 = void 0),
    ((St = t.Direction9 || (t.Direction9 = {}))[(St.topLeft = 0)] = 'topLeft'),
    (St[(St.top = 1)] = 'top'),
    (St[(St.topRight = 2)] = 'topRight'),
    (St[(St.right = 3)] = 'right'),
    (St[(St.bottomRight = 4)] = 'bottomRight'),
    (St[(St.bottom = 5)] = 'bottom'),
    (St[(St.bottomLeft = 6)] = 'bottomLeft'),
    (St[(St.left = 7)] = 'left'),
    (St[(St.center = 8)] = 'center'),
    (St[(St['top-left'] = 0)] = 'top-left'),
    (St[(St['top-right'] = 2)] = 'top-right'),
    (St[(St['bottom-right'] = 4)] = 'bottom-right'),
    (St[(St['bottom-left'] = 6)] = 'bottom-left')
  const kt = [
    { x: 0, y: 0 },
    { x: 0.5, y: 0 },
    { x: 1, y: 0 },
    { x: 1, y: 0.5 },
    { x: 1, y: 1 },
    { x: 0.5, y: 1 },
    { x: 0, y: 1 },
    { x: 0, y: 0.5 },
    { x: 0.5, y: 0.5 }
  ]
  kt.forEach(t => (t.type = 'percent'))
  const Bt = {
    directionData: kt,
    tempPoint: {},
    get: Pt,
    toPoint(t, e, i, s, n, o) {
      const r = Pt(t)
      ;(i.x = r.x),
        (i.y = r.y),
        'percent' === r.type &&
          ((i.x *= e.width),
          (i.y *= e.height),
          n &&
            (o || ((i.x -= n.x), (i.y -= n.y)),
            r.x && (i.x -= 1 === r.x ? n.width : 0.5 === r.x ? r.x * n.width : 0),
            r.y && (i.y -= 1 === r.y ? n.height : 0.5 === r.y ? r.y * n.height : 0))),
        s || ((i.x += e.x), (i.y += e.y))
    },
    getPoint: (t, e, i) => (i || (i = {}), Bt.toPoint(t, e, i, !0), i)
  }
  function Pt(e) {
    return r(e) ? kt[t.Direction9[e]] : e
  }
  const { toPoint: Lt } = Bt,
    Rt = {
      toPoint(t, e, i, s, n, o) {
        Lt(t, i, s, n, e, o)
      }
    },
    { tempPointBounds: Ct, setPoint: Ot, addPoint: At, toBounds: Dt } = bt,
    { toOuterPoint: Mt } = tt,
    { float: It, fourNumber: Ft } = z,
    { floor: Wt, ceil: zt } = Math
  let Ut, Ht, Nt, Yt
  const Xt = {},
    Vt = {},
    Gt = {},
    jt = {
      tempBounds: Gt,
      set(t, e = 0, i = 0, s = 0, n = 0) {
        ;(t.x = e), (t.y = i), (t.width = s), (t.height = n)
      },
      copy(t, e) {
        ;(t.x = e.x), (t.y = e.y), (t.width = e.width), (t.height = e.height)
      },
      copyAndSpread(t, e, i, s, n) {
        const { x: o, y: r, width: a, height: h } = e
        if (c(i)) {
          const e = Ft(i)
          s
            ? Kt.set(t, o + e[3], r + e[0], a - e[1] - e[3], h - e[2] - e[0])
            : Kt.set(t, o - e[3], r - e[0], a + e[1] + e[3], h + e[2] + e[0])
        } else s && (i = -i), Kt.set(t, o - i, r - i, a + 2 * i, h + 2 * i)
        n && ('width' === n ? ((t.y = r), (t.height = h)) : ((t.x = o), (t.width = a)))
      },
      minX: t => (t.width > 0 ? t.x : t.x + t.width),
      minY: t => (t.height > 0 ? t.y : t.y + t.height),
      maxX: t => (t.width > 0 ? t.x + t.width : t.x),
      maxY: t => (t.height > 0 ? t.y + t.height : t.y),
      move(t, e, i) {
        ;(t.x += e), (t.y += i)
      },
      scroll(t, e) {
        ;(t.x += e.scrollX), (t.y += e.scrollY)
      },
      getByMove: (t, e, i) => ((t = Object.assign({}, t)), Kt.move(t, e, i), t),
      toOffsetOutBounds(t, e, i) {
        e ? Zt(e, t) : (e = t),
          i || (i = t),
          (e.offsetX = Kt.maxX(i)),
          (e.offsetY = Kt.maxY(i)),
          Kt.move(e, -e.offsetX, -e.offsetY)
      },
      scale(t, e, i = e, s) {
        s || ut.scale(t, e, i), (t.width *= e), (t.height *= i)
      },
      scaleOf(t, e, i, s = i) {
        ut.scaleOf(t, e, i, s), (t.width *= i), (t.height *= s)
      },
      tempToOuterOf: (t, e) => (Kt.copy(Gt, t), Kt.toOuterOf(Gt, e), Gt),
      getOuterOf: (t, e) => ((t = Object.assign({}, t)), Kt.toOuterOf(t, e), t),
      toOuterOf(t, e, i) {
        if ((i || (i = t), 0 === e.b && 0 === e.c)) {
          const { a: s, d: n, e: o, f: r } = e
          s > 0 ? ((i.width = t.width * s), (i.x = o + t.x * s)) : ((i.width = t.width * -s), (i.x = o + t.x * s - i.width)),
            n > 0
              ? ((i.height = t.height * n), (i.y = r + t.y * n))
              : ((i.height = t.height * -n), (i.y = r + t.y * n - i.height))
        } else
          (Xt.x = t.x),
            (Xt.y = t.y),
            Mt(e, Xt, Vt),
            Ot(Ct, Vt.x, Vt.y),
            (Xt.x = t.x + t.width),
            Mt(e, Xt, Vt),
            At(Ct, Vt.x, Vt.y),
            (Xt.y = t.y + t.height),
            Mt(e, Xt, Vt),
            At(Ct, Vt.x, Vt.y),
            (Xt.x = t.x),
            Mt(e, Xt, Vt),
            At(Ct, Vt.x, Vt.y),
            Dt(Ct, i)
      },
      toInnerOf(t, e, i) {
        i || (i = t), Kt.move(i, -e.e, -e.f), Kt.scale(i, 1 / e.a, 1 / e.d)
      },
      getFitMatrix(t, e, i = 1) {
        const s = Math.min(i, Kt.getFitScale(t, e))
        return new wt(s, 0, 0, s, -e.x * s, -e.y * s)
      },
      getFitScale(t, e, i) {
        const s = t.width / e.width,
          n = t.height / e.height
        return i ? Math.max(s, n) : Math.min(s, n)
      },
      put(t, e, i = 'center', s = 1, n = !0, o) {
        o || (o = e),
          r(s) && (s = Kt.getFitScale(t, e, 'cover' === s)),
          (Gt.width = n ? (e.width *= s) : e.width * s),
          (Gt.height = n ? (e.height *= s) : e.height * s),
          Rt.toPoint(i, Gt, t, o, !0, !0)
      },
      getSpread(t, e, i) {
        const s = {}
        return Kt.copyAndSpread(s, t, e, !1, i), s
      },
      spread(t, e, i) {
        Kt.copyAndSpread(t, t, e, !1, i)
      },
      shrink(t, e, i) {
        Kt.copyAndSpread(t, t, e, !0, i)
      },
      ceil(t) {
        const { x: e, y: i } = t
        ;(t.x = Wt(t.x)),
          (t.y = Wt(t.y)),
          (t.width = e > t.x ? zt(t.width + e - t.x) : zt(t.width)),
          (t.height = i > t.y ? zt(t.height + i - t.y) : zt(t.height))
      },
      unsign(t) {
        t.width < 0 && ((t.x += t.width), (t.width = -t.width)), t.height < 0 && ((t.y += t.height), (t.height = -t.height))
      },
      float(t, e) {
        ;(t.x = It(t.x, e)), (t.y = It(t.y, e)), (t.width = It(t.width, e)), (t.height = It(t.height, e))
      },
      add(t, e, i) {
        ;(Ut = t.x + t.width),
          (Ht = t.y + t.height),
          (Nt = e.x),
          (Yt = e.y),
          i || ((Nt += e.width), (Yt += e.height)),
          (Ut = Ut > Nt ? Ut : Nt),
          (Ht = Ht > Yt ? Ht : Yt),
          (t.x = t.x < e.x ? t.x : e.x),
          (t.y = t.y < e.y ? t.y : e.y),
          (t.width = Ut - t.x),
          (t.height = Ht - t.y)
      },
      addList(t, e) {
        Kt.setListWithFn(t, e, void 0, !0)
      },
      setList(t, e, i = !1) {
        Kt.setListWithFn(t, e, void 0, i)
      },
      addListWithFn(t, e, i) {
        Kt.setListWithFn(t, e, i, !0)
      },
      setListWithFn(t, e, i, s = !1) {
        let n,
          o = !0
        for (let r = 0, a = e.length; r < a; r++)
          (n = i ? i(e[r], r) : e[r]), n && (n.width || n.height) && (o ? ((o = !1), s || Zt(t, n)) : qt(t, n))
        o && Kt.reset(t)
      },
      setPoints(t, e) {
        e.forEach((t, e) => (0 === e ? Ot(Ct, t.x, t.y) : At(Ct, t.x, t.y))), Dt(Ct, t)
      },
      setPoint(t, e) {
        Kt.set(t, e.x, e.y)
      },
      addPoint(t, e) {
        qt(t, e, !0)
      },
      getPoints(t) {
        const { x: e, y: i, width: s, height: n } = t
        return [
          { x: e, y: i },
          { x: e + s, y: i },
          { x: e + s, y: i + n },
          { x: e, y: i + n }
        ]
      },
      hitRadiusPoint: (t, e, i) => (
        i && (e = ut.tempToInnerRadiusPointOf(e, i)),
        e.x >= t.x - e.radiusX && e.x <= t.x + t.width + e.radiusX && e.y >= t.y - e.radiusY && e.y <= t.y + t.height + e.radiusY
      ),
      hitPoint: (t, e, i) => (
        i && (e = ut.tempToInnerOf(e, i)), e.x >= t.x && e.x <= t.x + t.width && e.y >= t.y && e.y <= t.y + t.height
      ),
      hit: (t, e, i) => (
        i && (e = Kt.tempToOuterOf(e, i)),
        !(t.y + t.height < e.y || e.y + e.height < t.y || t.x + t.width < e.x || e.x + e.width < t.x)
      ),
      includes: (t, e, i) => (
        i && (e = Kt.tempToOuterOf(e, i)),
        t.x <= e.x && t.y <= e.y && t.x + t.width >= e.x + e.width && t.y + t.height >= e.y + e.height
      ),
      getIntersectData(t, e, i) {
        if ((i && (e = Kt.tempToOuterOf(e, i)), !Kt.hit(t, e))) return { x: 0, y: 0, width: 0, height: 0 }
        let { x: s, y: n, width: o, height: r } = e
        return (
          (Ut = s + o),
          (Ht = n + r),
          (Nt = t.x + t.width),
          (Yt = t.y + t.height),
          (s = s > t.x ? s : t.x),
          (n = n > t.y ? n : t.y),
          (Ut = Ut < Nt ? Ut : Nt),
          (Ht = Ht < Yt ? Ht : Yt),
          (o = Ut - s),
          (r = Ht - n),
          { x: s, y: n, width: o, height: r }
        )
      },
      intersect(t, e, i) {
        Kt.copy(t, Kt.getIntersectData(t, e, i))
      },
      isSame: (t, e) => t.x === e.x && t.y === e.y && t.width === e.width && t.height === e.height,
      isEmpty: t => 0 === t.x && 0 === t.y && 0 === t.width && 0 === t.height,
      reset(t) {
        Kt.set(t)
      }
    },
    Kt = jt,
    { add: qt, copy: Zt } = Kt
  class $t {
    get minX() {
      return jt.minX(this)
    }
    get minY() {
      return jt.minY(this)
    }
    get maxX() {
      return jt.maxX(this)
    }
    get maxY() {
      return jt.maxY(this)
    }
    constructor(t, e, i, s) {
      this.set(t, e, i, s)
    }
    set(t, e, i, s) {
      return u(t) ? jt.copy(this, t) : jt.set(this, t, e, i, s), this
    }
    get() {
      const { x: t, y: e, width: i, height: s } = this
      return { x: t, y: e, width: i, height: s }
    }
    clone() {
      return new $t(this)
    }
    move(t, e) {
      return jt.move(this, t, e), this
    }
    scale(t, e, i) {
      return jt.scale(this, t, e, i), this
    }
    scaleOf(t, e, i) {
      return jt.scaleOf(this, t, e, i), this
    }
    toOuterOf(t, e) {
      return jt.toOuterOf(this, t, e), this
    }
    toInnerOf(t, e) {
      return jt.toInnerOf(this, t, e), this
    }
    getFitMatrix(t, e) {
      return jt.getFitMatrix(this, t, e)
    }
    put(t, e, i) {
      jt.put(this, t, e, i)
    }
    spread(t, e) {
      return jt.spread(this, t, e), this
    }
    shrink(t, e) {
      return jt.shrink(this, t, e), this
    }
    ceil() {
      return jt.ceil(this), this
    }
    unsign() {
      return jt.unsign(this), this
    }
    float(t) {
      return jt.float(this, t), this
    }
    add(t) {
      return jt.add(this, t), this
    }
    addList(t) {
      return jt.setList(this, t, !0), this
    }
    setList(t) {
      return jt.setList(this, t), this
    }
    addListWithFn(t, e) {
      return jt.setListWithFn(this, t, e, !0), this
    }
    setListWithFn(t, e) {
      return jt.setListWithFn(this, t, e), this
    }
    setPoint(t) {
      return jt.setPoint(this, t), this
    }
    setPoints(t) {
      return jt.setPoints(this, t), this
    }
    addPoint(t) {
      return jt.addPoint(this, t), this
    }
    getPoints() {
      return jt.getPoints(this)
    }
    hitPoint(t, e) {
      return jt.hitPoint(this, t, e)
    }
    hitRadiusPoint(t, e) {
      return jt.hitRadiusPoint(this, t, e)
    }
    hit(t, e) {
      return jt.hit(this, t, e)
    }
    includes(t, e) {
      return jt.includes(this, t, e)
    }
    intersect(t, e) {
      return jt.intersect(this, t, e), this
    }
    getIntersect(t, e) {
      return new $t(jt.getIntersectData(this, t, e))
    }
    isSame(t) {
      return jt.isSame(this, t)
    }
    isEmpty() {
      return jt.isEmpty(this)
    }
    reset() {
      jt.reset(this)
    }
  }
  const Jt = new $t()
  class Qt {
    constructor(t, e, i, s, n, o) {
      u(t) ? this.copy(t) : this.set(t, e, i, s, n, o)
    }
    set(t = 0, e = 0, i = 0, s = 0, n = 0, o = 0) {
      ;(this.top = t), (this.right = e), (this.bottom = i), (this.left = s), (this.width = n), (this.height = o)
    }
    copy(t) {
      const { top: e, right: i, bottom: s, left: n, width: o, height: r } = t
      this.set(e, i, s, n, o, r)
    }
    getBoundsFrom(t) {
      const { top: e, right: i, bottom: s, left: n, width: o, height: r } = this
      return new $t(n, e, o || t.width - n - i, r || t.height - e - s)
    }
  }
  const te = { 0: 1, 1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1, 7: 1, 8: 1, 9: 1, '.': 1, e: 1, E: 1 },
    { randColor: ee } = z
  class ie {
    constructor(t) {
      ;(this.repeatMap = {}), (this.name = t)
    }
    static get(t) {
      return new ie(t)
    }
    static set filter(t) {
      this.filterList = se(t)
    }
    static set exclude(t) {
      this.excludeList = se(t)
    }
    static drawRepaint(t, e) {
      const i = ee()
      t.fillWorld(e, i.replace('1)', '.1)')), t.strokeWorld(e, i)
    }
    static drawBounds(t, e, i) {
      const s = 'hit' === ie.showBounds,
        n = t.__nowWorld,
        o = ee()
      s && (e.setWorld(n), t.__drawHitPath(e), (e.fillStyle = o.replace('1)', '.2)')), e.fill()),
        e.resetTransform(),
        e.setStroke(o, 2),
        s ? e.stroke() : e.strokeWorld(n, o)
    }
    log(...t) {
      if (ne.enable) {
        if (ne.filterList.length && ne.filterList.every(t => t !== this.name)) return
        if (ne.excludeList.length && ne.excludeList.some(t => t === this.name)) return
        console.log('%c' + this.name, 'color:#21ae62', ...t)
      }
    }
    tip(...t) {
      ne.enable && this.warn(...t)
    }
    warn(...t) {
      ne.showWarn && console.warn(this.name, ...t)
    }
    repeat(t, ...e) {
      this.repeatMap[t] || (this.warn('repeat:' + t, ...e), (this.repeatMap[t] = !0))
    }
    error(...t) {
      try {
        throw new Error()
      } catch (e) {
        console.error(this.name, ...t, e)
      }
    }
  }
  function se(t) {
    return t ? r(t) && (t = [t]) : (t = []), t
  }
  ;(ie.filterList = []), (ie.excludeList = []), (ie.showWarn = !0)
  const ne = ie,
    oe = ie.get('RunTime'),
    re = {
      currentId: 0,
      currentName: '',
      idMap: {},
      nameMap: {},
      nameToIdMap: {},
      start(t, e) {
        const i = b.create(b.RUNTIME)
        return (
          (ae.currentId = ae.idMap[i] = e ? performance.now() : Date.now()),
          (ae.currentName = ae.nameMap[i] = t),
          (ae.nameToIdMap[t] = i),
          i
        )
      },
      end(t, e) {
        const i = ae.idMap[t],
          s = ae.nameMap[t],
          n = e ? (performance.now() - i) / 1e3 : Date.now() - i
        ;(ae.idMap[t] = ae.nameMap[t] = ae.nameToIdMap[s] = void 0), oe.log(s, n, 'ms')
      },
      endOfName(t, e) {
        const i = ae.nameToIdMap[t]
        n(i) || ae.end(i, e)
      }
    },
    ae = re,
    he = [],
    le = {
      list: {},
      add(t, ...e) {
        ;(this.list[t] = !0), he.push(...e)
      },
      has(t, e) {
        const i = this.list[t]
        return !i && e && this.need(t), i
      },
      need(t) {
        console.error('please install and import plugin: ' + (t.includes('-x') ? '' : '@leafer-in/') + t)
      }
    }
  setTimeout(() => he.forEach(t => le.has(t, !0)))
  const de = { editor: t => le.need('editor') },
    ce = ie.get('UICreator'),
    ue = {
      list: {},
      register(t) {
        const { __tag: e } = t.prototype
        pe[e] && ce.repeat(e), (pe[e] = t)
      },
      get(t, e, i, s, o, r) {
        pe[t] || ce.error('not register ' + t)
        const a = new pe[t](e)
        return n(i) || ((a.x = i), s && (a.y = s), o && (a.width = o), r && (a.height = r)), a
      }
    },
    { list: pe } = ue,
    ge = ie.get('EventCreator'),
    _e = {
      nameList: {},
      register(t) {
        let e
        Object.keys(t).forEach(i => {
          ;(e = t[i]), r(e) && (fe[e] && ge.repeat(e), (fe[e] = t))
        })
      },
      changeName(t, e) {
        const i = fe[t]
        if (i) {
          const s = Object.keys(i).find(e => i[e] === t)
          s && ((i[s] = e), (fe[e] = i))
        }
      },
      has(t) {
        return !!this.nameList[t]
      },
      get: (t, ...e) => new fe[t](...e)
    },
    { nameList: fe } = _e
  class me {
    constructor() {
      this.list = []
    }
    add(t) {
      ;(t.manager = this), this.list.push(t)
    }
    get(t) {
      let e
      const { list: i } = this
      for (let s = 0, n = i.length; s < n; s++)
        if (((e = i[s]), e.recycled && e.isSameSize(t))) return (e.recycled = !1), e.manager || (e.manager = this), e
      const s = de.canvas(t)
      return this.add(s), s
    }
    recycle(t) {
      t.recycled = !0
    }
    clearRecycled() {
      let t
      const e = []
      for (let i = 0, s = this.list.length; i < s; i++) (t = this.list[i]), t.recycled ? t.destroy() : e.push(t)
      this.list = e
    }
    clear() {
      this.list.forEach(t => {
        t.destroy()
      }),
        (this.list.length = 0)
    }
    destroy() {
      this.clear()
    }
  }
  function ye(t, e, i, s) {
    var n,
      o = arguments.length,
      r = o < 3 ? e : null === s ? (s = Object.getOwnPropertyDescriptor(e, i)) : s
    if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate) r = Reflect.decorate(t, e, i, s)
    else for (var a = t.length - 1; a >= 0; a--) (n = t[a]) && (r = (o < 3 ? n(r) : o > 3 ? n(e, i, r) : n(e, i)) || r)
    return o > 3 && r && Object.defineProperty(e, i, r), r
  }
  function ve(t, e, i, s) {
    return new (i || (i = Promise))(function (n, o) {
      function r(t) {
        try {
          h(s.next(t))
        } catch (t) {
          o(t)
        }
      }
      function a(t) {
        try {
          h(s.throw(t))
        } catch (t) {
          o(t)
        }
      }
      function h(t) {
        t.done
          ? n(t.value)
          : (function (t) {
              return t instanceof i
                ? t
                : new i(function (e) {
                    e(t)
                  })
            })(t.value).then(r, a)
      }
      h((s = s.apply(t, e || [])).next())
    })
  }
  function we(t) {
    return (e, i) => {
      t || (t = i)
      const s = {
        get() {
          return this.context[t]
        },
        set(e) {
          this.context[t] = e
        }
      }
      'strokeCap' === i &&
        (s.set = function (e) {
          this.context[t] = 'none' === e ? 'butt' : e
        }),
        Object.defineProperty(e, i, s)
    }
  }
  'function' == typeof SuppressedError && SuppressedError
  const xe = []
  function be() {
    return (t, e) => {
      xe.push(e)
    }
  }
  const Ee = []
  class Te {
    set blendMode(t) {
      'normal' === t && (t = 'source-over'), (this.context.globalCompositeOperation = t)
    }
    get blendMode() {
      return this.context.globalCompositeOperation
    }
    set dashPattern(t) {
      this.context.setLineDash(t || Ee)
    }
    get dashPattern() {
      return this.context.getLineDash()
    }
    __bindContext() {
      let t
      xe.forEach(e => {
        ;(t = this.context[e]), t && (this[e] = t.bind(this.context))
      }),
        (this.textBaseline = 'alphabetic')
    }
    setTransform(t, e, i, s, n, o) {}
    resetTransform() {}
    getTransform() {}
    save() {}
    restore() {}
    transform(t, e, i, s, n, o) {
      u(t) ? this.context.transform(t.a, t.b, t.c, t.d, t.e, t.f) : this.context.transform(t, e, i, s, n, o)
    }
    translate(t, e) {}
    scale(t, e) {}
    rotate(t) {}
    fill(t, e) {}
    stroke(t) {}
    clip(t, e) {}
    fillRect(t, e, i, s) {}
    strokeRect(t, e, i, s) {}
    clearRect(t, e, i, s) {}
    drawImage(t, e, i, s, n, o, r, a, h) {
      switch (arguments.length) {
        case 9:
          if (e < 0) {
            const t = (-e / s) * a
            ;(s += e), (e = 0), (o += t), (a -= t)
          }
          if (i < 0) {
            const t = (-i / n) * h
            ;(n += i), (i = 0), (r += t), (h -= t)
          }
          this.context.drawImage(t, e, i, s, n, o, r, a, h)
          break
        case 5:
          this.context.drawImage(t, e, i, s, n)
          break
        case 3:
          this.context.drawImage(t, e, i)
      }
    }
    beginPath() {}
    moveTo(t, e) {}
    lineTo(t, e) {}
    bezierCurveTo(t, e, i, s, n, o) {}
    quadraticCurveTo(t, e, i, s) {}
    closePath() {}
    arc(t, e, i, s, n, o) {}
    arcTo(t, e, i, s, n) {}
    ellipse(t, e, i, s, n, o, r, a) {}
    rect(t, e, i, s) {}
    roundRect(t, e, i, s, n) {}
    createConicGradient(t, e, i) {}
    createLinearGradient(t, e, i, s) {}
    createPattern(t, e) {}
    createRadialGradient(t, e, i, s, n, o) {}
    fillText(t, e, i, s) {}
    measureText(t) {}
    strokeText(t, e, i, s) {}
    destroy() {
      this.context = null
    }
  }
  ye([we('imageSmoothingEnabled')], Te.prototype, 'smooth', void 0),
    ye([we('imageSmoothingQuality')], Te.prototype, 'smoothLevel', void 0),
    ye([we('globalAlpha')], Te.prototype, 'opacity', void 0),
    ye([we()], Te.prototype, 'fillStyle', void 0),
    ye([we()], Te.prototype, 'strokeStyle', void 0),
    ye([we('lineWidth')], Te.prototype, 'strokeWidth', void 0),
    ye([we('lineCap')], Te.prototype, 'strokeCap', void 0),
    ye([we('lineJoin')], Te.prototype, 'strokeJoin', void 0),
    ye([we('lineDashOffset')], Te.prototype, 'dashOffset', void 0),
    ye([we()], Te.prototype, 'miterLimit', void 0),
    ye([we()], Te.prototype, 'shadowBlur', void 0),
    ye([we()], Te.prototype, 'shadowColor', void 0),
    ye([we()], Te.prototype, 'shadowOffsetX', void 0),
    ye([we()], Te.prototype, 'shadowOffsetY', void 0),
    ye([we()], Te.prototype, 'filter', void 0),
    ye([we()], Te.prototype, 'font', void 0),
    ye([we()], Te.prototype, 'fontKerning', void 0),
    ye([we()], Te.prototype, 'fontStretch', void 0),
    ye([we()], Te.prototype, 'fontVariantCaps', void 0),
    ye([we()], Te.prototype, 'textAlign', void 0),
    ye([we()], Te.prototype, 'textBaseline', void 0),
    ye([we()], Te.prototype, 'textRendering', void 0),
    ye([we()], Te.prototype, 'wordSpacing', void 0),
    ye([we()], Te.prototype, 'letterSpacing', void 0),
    ye([we()], Te.prototype, 'direction', void 0),
    ye([be()], Te.prototype, 'setTransform', null),
    ye([be()], Te.prototype, 'resetTransform', null),
    ye([be()], Te.prototype, 'getTransform', null),
    ye([be()], Te.prototype, 'save', null),
    ye([be()], Te.prototype, 'restore', null),
    ye([be()], Te.prototype, 'translate', null),
    ye([be()], Te.prototype, 'scale', null),
    ye([be()], Te.prototype, 'rotate', null),
    ye([be()], Te.prototype, 'fill', null),
    ye([be()], Te.prototype, 'stroke', null),
    ye([be()], Te.prototype, 'clip', null),
    ye([be()], Te.prototype, 'fillRect', null),
    ye([be()], Te.prototype, 'strokeRect', null),
    ye([be()], Te.prototype, 'clearRect', null),
    ye([be()], Te.prototype, 'beginPath', null),
    ye([be()], Te.prototype, 'moveTo', null),
    ye([be()], Te.prototype, 'lineTo', null),
    ye([be()], Te.prototype, 'bezierCurveTo', null),
    ye([be()], Te.prototype, 'quadraticCurveTo', null),
    ye([be()], Te.prototype, 'closePath', null),
    ye([be()], Te.prototype, 'arc', null),
    ye([be()], Te.prototype, 'arcTo', null),
    ye([be()], Te.prototype, 'ellipse', null),
    ye([be()], Te.prototype, 'rect', null),
    ye([be()], Te.prototype, 'roundRect', null),
    ye([be()], Te.prototype, 'createConicGradient', null),
    ye([be()], Te.prototype, 'createLinearGradient', null),
    ye([be()], Te.prototype, 'createPattern', null),
    ye([be()], Te.prototype, 'createRadialGradient', null),
    ye([be()], Te.prototype, 'fillText', null),
    ye([be()], Te.prototype, 'measureText', null),
    ye([be()], Te.prototype, 'strokeText', null)
  const { copy: Se, multiplyParent: ke, pixelScale: Be } = tt,
    { round: Pe } = Math,
    Le = new $t(),
    Re = new $t(),
    Ce = { width: 1, height: 1, pixelRatio: 1 },
    Oe = ['width', 'height', 'pixelRatio']
  class Ae extends Te {
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
      return this.width * this.pixelRatio || 0
    }
    get pixelHeight() {
      return this.height * this.pixelRatio || 0
    }
    get pixelSnap() {
      return this.config.pixelSnap
    }
    set pixelSnap(t) {
      this.config.pixelSnap = t
    }
    get allowBackgroundColor() {
      return this.view && this.parentView
    }
    constructor(t, e) {
      super(),
        (this.size = {}),
        (this.worldTransform = {}),
        t || (t = Ce),
        (this.manager = e),
        (this.innerId = b.create(b.CNAVAS))
      const { width: i, height: s, pixelRatio: n } = t
      ;(this.autoLayout = !i || !s), (this.size.pixelRatio = n || w.devicePixelRatio), (this.config = t), this.init()
    }
    init() {}
    __createContext() {
      const { view: t } = this,
        { contextSettings: e } = this.config
      ;(this.context = e ? t.getContext('2d', e) : t.getContext('2d')), this.__bindContext()
    }
    export(t, e) {}
    toBlob(t, e) {}
    toDataURL(t, e) {}
    saveAs(t, e) {}
    resize(t, e = !0) {
      if (this.isSameSize(t)) return
      let i
      this.context && !this.unreal && e && this.width && ((i = this.getSameCanvas()), i.copyWorld(this))
      const s = this.size
      _.copyAttrs(s, t, Oe),
        Oe.forEach(t => s[t] || (s[t] = 1)),
        (this.bounds = new $t(0, 0, this.width, this.height)),
        this.updateViewSize(),
        this.updateClientBounds(),
        this.context &&
          ((this.smooth = this.config.smooth), !this.unreal && i && (this.clearWorld(i.bounds), this.copyWorld(i), i.recycle()))
    }
    updateViewSize() {}
    updateClientBounds() {}
    getClientBounds(t) {
      return t && this.updateClientBounds(), this.clientBounds || this.bounds
    }
    startAutoLayout(t, e) {}
    stopAutoLayout() {}
    setCursor(t) {}
    setWorld(t, e) {
      const { pixelRatio: i, pixelSnap: s } = this,
        n = this.worldTransform
      e && ke(t, e, n),
        Be(t, i, n),
        s &&
          !t.ignorePixelSnap &&
          (t.half && (t.half * i) % 2
            ? ((n.e = Pe(n.e - 0.5) + 0.5), (n.f = Pe(n.f - 0.5) + 0.5))
            : ((n.e = Pe(n.e)), (n.f = Pe(n.f)))),
        this.setTransform(n.a, n.b, n.c, n.d, n.e, n.f)
    }
    useWorldTransform(t) {
      t && (this.worldTransform = t)
      const e = this.worldTransform
      e && this.setTransform(e.a, e.b, e.c, e.d, e.e, e.f)
    }
    setStroke(t, e, i, s) {
      e && (this.strokeWidth = e), t && (this.strokeStyle = t), i && this.setStrokeOptions(i, s)
    }
    setStrokeOptions(t, e) {
      let { strokeCap: i, strokeJoin: s, dashPattern: o, dashOffset: r, miterLimit: a } = t
      e &&
        (e.strokeCap && (i = e.strokeCap),
        e.strokeJoin && (s = e.strokeJoin),
        n(e.dashPattern) || (o = e.dashPattern),
        n(e.dashOffset) || (r = e.dashOffset),
        e.miterLimit && (a = e.miterLimit)),
        (this.strokeCap = i),
        (this.strokeJoin = s),
        (this.dashPattern = o),
        (this.dashOffset = r),
        (this.miterLimit = a)
    }
    saveBlendMode(t) {
      ;(this.savedBlendMode = this.blendMode), (this.blendMode = t)
    }
    restoreBlendMode() {
      this.blendMode = this.savedBlendMode
    }
    hitFill(t, e) {
      return !0
    }
    hitStroke(t, e) {
      return !0
    }
    hitPixel(t, e, i = 1) {
      return !0
    }
    setWorldShadow(t, e, i, s) {
      const { pixelRatio: n } = this
      ;(this.shadowOffsetX = t * n), (this.shadowOffsetY = e * n), (this.shadowBlur = i * n), (this.shadowColor = s || 'black')
    }
    setWorldBlur(t) {
      const { pixelRatio: e } = this
      this.filter = `blur(${t * e}px)`
    }
    copyWorld(t, e, i, s, n) {
      s && (this.blendMode = s),
        e
          ? (this.setTempPixelBounds(e, n),
            i ? (this.setTempPixelBounds2(i, n), (i = Re)) : (i = Le),
            this.drawImage(t.view, Le.x, Le.y, Le.width, Le.height, i.x, i.y, i.width, i.height))
          : this.drawImage(t.view, 0, 0),
        s && (this.blendMode = 'source-over')
    }
    copyWorldToInner(t, e, i, s, n) {
      e.b || e.c
        ? (this.save(), this.resetTransform(), this.copyWorld(t, e, jt.tempToOuterOf(i, e), s, n), this.restore())
        : (s && (this.blendMode = s),
          this.setTempPixelBounds(e, n),
          this.drawImage(t.view, Le.x, Le.y, Le.width, Le.height, i.x, i.y, i.width, i.height),
          s && (this.blendMode = 'source-over'))
    }
    copyWorldByReset(t, e, i, s, n, o) {
      this.resetTransform(), this.copyWorld(t, e, i, s, o), n || this.useWorldTransform()
    }
    useGrayscaleAlpha(t) {
      let e, i
      this.setTempPixelBounds(t, !0, !0)
      const { context: s } = this,
        n = s.getImageData(Le.x, Le.y, Le.width, Le.height),
        { data: o } = n
      for (let t = 0, s = o.length; t < s; t += 4)
        (i = 0.299 * o[t] + 0.587 * o[t + 1] + 0.114 * o[t + 2]), (e = o[t + 3]) && (o[t + 3] = 255 === e ? i : e * (i / 255))
      s.putImageData(n, Le.x, Le.y)
    }
    useMask(t, e, i) {
      this.copyWorld(t, e, i, 'destination-in')
    }
    useEraser(t, e, i) {
      this.copyWorld(t, e, i, 'destination-out')
    }
    fillWorld(t, e, i, s) {
      i && (this.blendMode = i),
        (this.fillStyle = e),
        this.setTempPixelBounds(t, s),
        this.fillRect(Le.x, Le.y, Le.width, Le.height),
        i && (this.blendMode = 'source-over')
    }
    strokeWorld(t, e, i, s) {
      i && (this.blendMode = i),
        (this.strokeStyle = e),
        this.setTempPixelBounds(t, s),
        this.strokeRect(Le.x, Le.y, Le.width, Le.height),
        i && (this.blendMode = 'source-over')
    }
    clipWorld(t, e = !0) {
      this.beginPath(), this.setTempPixelBounds(t, e), this.rect(Le.x, Le.y, Le.width, Le.height), this.clip()
    }
    clipUI(t) {
      t.windingRule ? this.clip(t.windingRule) : this.clip()
    }
    clearWorld(t, e = !0) {
      this.setTempPixelBounds(t, e), this.clearRect(Le.x, Le.y, Le.width, Le.height)
    }
    clear() {
      const { pixelRatio: t } = this
      this.clearRect(0, 0, this.width * t + 2, this.height * t + 2)
    }
    setTempPixelBounds(t, e, i) {
      this.copyToPixelBounds(Le, t, e, i)
    }
    setTempPixelBounds2(t, e, i) {
      this.copyToPixelBounds(Re, t, e, i)
    }
    copyToPixelBounds(t, e, i, s) {
      t.set(e), s && t.intersect(this.bounds), t.scale(this.pixelRatio), i && t.ceil()
    }
    isSameSize(t) {
      return this.width === t.width && this.height === t.height && (!t.pixelRatio || this.pixelRatio === t.pixelRatio)
    }
    getSameCanvas(t, e) {
      const { size: i, pixelSnap: s } = this,
        n = this.manager ? this.manager.get(i) : de.canvas(Object.assign({}, i))
      return (
        n.save(),
        t && (Se(n.worldTransform, this.worldTransform), n.useWorldTransform()),
        e && (n.smooth = this.smooth),
        n.pixelSnap !== s && (n.pixelSnap = s),
        n
      )
    }
    recycle(t) {
      this.recycled ||
        (this.restore(), t ? this.clearWorld(t) : this.clear(), this.manager ? this.manager.recycle(this) : this.destroy())
    }
    updateRender(t) {}
    unrealCanvas() {}
    destroy() {
      this.manager = this.view = this.parentView = null
    }
  }
  const De = { creator: {}, parse(t, e) {}, convertToCanvasData(t, e) {} },
    Me = { N: 21, D: 22, X: 23, G: 24, F: 25, O: 26, P: 27, U: 28 },
    Ie = Object.assign(
      {
        M: 1,
        m: 10,
        L: 2,
        l: 20,
        H: 3,
        h: 30,
        V: 4,
        v: 40,
        C: 5,
        c: 50,
        S: 6,
        s: 60,
        Q: 7,
        q: 70,
        T: 8,
        t: 80,
        A: 9,
        a: 90,
        Z: 11,
        z: 11,
        R: 12
      },
      Me
    ),
    Fe = {
      M: 3,
      m: 3,
      L: 3,
      l: 3,
      H: 2,
      h: 2,
      V: 2,
      v: 2,
      C: 7,
      c: 7,
      S: 5,
      s: 5,
      Q: 5,
      q: 5,
      T: 3,
      t: 3,
      A: 8,
      a: 8,
      Z: 1,
      z: 1,
      N: 5,
      D: 9,
      X: 6,
      G: 9,
      F: 5,
      O: 7,
      P: 4,
      U: 6
    },
    We = { m: 10, l: 20, H: 3, h: 30, V: 4, v: 40, c: 50, S: 6, s: 60, q: 70, T: 8, t: 80, A: 9, a: 90 },
    ze = Object.assign(Object.assign({}, We), Me),
    Ue = Ie,
    He = {}
  for (let t in Ue) He[Ue[t]] = t
  const Ne = {}
  for (let t in Ue) Ne[Ue[t]] = Fe[t]
  const Ye = {
      drawRoundRect(t, e, i, s, n, o) {
        const r = z.fourNumber(o, Math.min(s / 2, n / 2)),
          a = e + s,
          h = i + n
        r[0] ? t.moveTo(e + r[0], i) : t.moveTo(e, i),
          r[1] ? t.arcTo(a, i, a, h, r[1]) : t.lineTo(a, i),
          r[2] ? t.arcTo(a, h, e, h, r[2]) : t.lineTo(a, h),
          r[3] ? t.arcTo(e, h, e, i, r[3]) : t.lineTo(e, h),
          r[0] ? t.arcTo(e, i, a, i, r[0]) : t.lineTo(e, i)
      }
    },
    { sin: Xe, cos: Ve, hypot: Ge, atan2: je, ceil: Ke, abs: qe, PI: Ze, sqrt: $e, pow: Je } = Math,
    { setPoint: Qe, addPoint: ti } = bt,
    { set: ei, toNumberPoints: ii } = ut,
    { M: si, L: ni, C: oi, Q: ri, Z: ai } = Ie,
    hi = {},
    li = {
      points(t, e, i, s) {
        let n = ii(e)
        if ((t.push(si, n[0], n[1]), i && n.length > 5)) {
          let e,
            o,
            r,
            a,
            h,
            l,
            d,
            c,
            u,
            p,
            g,
            _,
            f,
            m,
            y,
            v = n.length
          const w = !0 === i ? 0.5 : i
          s && ((n = [n[v - 2], n[v - 1], ...n, n[0], n[1], n[2], n[3]]), (v = n.length))
          for (let i = 2; i < v - 2; i += 2)
            (e = n[i - 2]),
              (o = n[i - 1]),
              (r = n[i]),
              (a = n[i + 1]),
              (h = n[i + 2]),
              (l = n[i + 3]),
              (g = r - e),
              (_ = a - o),
              (f = $e(Je(g, 2) + Je(_, 2))),
              (m = $e(Je(h - r, 2) + Je(l - a, 2))),
              (f || m) &&
                ((y = f + m),
                (f = (w * f) / y),
                (m = (w * m) / y),
                (h -= e),
                (l -= o),
                (d = r - f * h),
                (c = a - f * l),
                2 === i ? s || t.push(ri, d, c, r, a) : (g || _) && t.push(oi, u, p, d, c, r, a),
                (u = r + m * h),
                (p = a + m * l))
          s || t.push(ri, u, p, n[v - 2], n[v - 1])
        } else for (let e = 2, i = n.length; e < i; e += 2) t.push(ni, n[e], n[e + 1])
        s && t.push(ai)
      },
      rect(t, e, i, s, n) {
        ;(De.creator.path = t),
          De.creator
            .moveTo(e, i)
            .lineTo(e + s, i)
            .lineTo(e + s, i + n)
            .lineTo(e, i + n)
            .lineTo(e, i)
      },
      roundRect(t, e, i, s, n, o) {
        ;(De.creator.path = []),
          Ye.drawRoundRect(De.creator, e, i, s, n, o),
          t.push(...De.convertToCanvasData(De.creator.path, !0))
      },
      arcTo(t, e, i, s, n, o, r, a, h, l, d) {
        const c = s - e,
          u = n - i,
          p = o - s,
          g = r - n
        let _ = je(u, c),
          f = je(g, p)
        const m = Ge(c, u),
          y = Ge(p, g)
        let v = f - _
        if ((v < 0 && (v += N), m < 1e-12 || y < 1e-12 || v < 1e-12 || qe(v - Ze) < 1e-12))
          return t && t.push(ni, s, n), h && (Qe(h, e, i), ti(h, s, n)), d && ei(d, e, i), void (l && ei(l, s, n))
        const w = c * g - p * u < 0,
          x = w ? -1 : 1,
          b = a / Ve(v / 2),
          E = s + b * Ve(_ + v / 2 + Y * x),
          T = n + b * Xe(_ + v / 2 + Y * x)
        return (_ -= Y * x), (f -= Y * x), ui(t, E, T, a, a, 0, _ / H, f / H, w, h, l, d)
      },
      arc: (t, e, i, s, n, o, r, a, h, l) => ui(t, e, i, s, s, 0, n, o, r, a, h, l),
      ellipse(t, e, i, s, n, o, r, a, h, l, d, c) {
        const u = o * H,
          p = Xe(u),
          g = Ve(u)
        let _ = r * H,
          f = a * H
        _ > Ze && (_ -= N), f < 0 && (f += N)
        let m = f - _
        m < 0 ? (m += N) : m > N && (m -= N), h && (m -= N)
        const y = Ke(qe(m / Y)),
          v = m / y,
          w = Xe(v / 4),
          x = ((8 / 3) * w * w) / Xe(v / 2)
        f = _ + v
        let b,
          E,
          T,
          S,
          k,
          B,
          P,
          L,
          R = Ve(_),
          C = Xe(_),
          O = (T = g * s * R - p * n * C),
          A = (S = p * s * R + g * n * C),
          D = e + T,
          M = i + S
        t && t.push(t.length ? ni : si, D, M), l && Qe(l, D, M), c && ei(c, D, M)
        for (let o = 0; o < y; o++)
          (b = Ve(f)),
            (E = Xe(f)),
            (T = g * s * b - p * n * E),
            (S = p * s * b + g * n * E),
            (k = e + O - x * (g * s * C + p * n * R)),
            (B = i + A - x * (p * s * C - g * n * R)),
            (P = e + T + x * (g * s * E + p * n * b)),
            (L = i + S + x * (p * s * E - g * n * b)),
            t && t.push(oi, k, B, P, L, e + T, i + S),
            l && ci(e + O, i + A, k, B, P, L, e + T, i + S, l, !0),
            (O = T),
            (A = S),
            (R = b),
            (C = E),
            (_ = f),
            (f += v)
        d && ei(d, e + T, i + S)
      },
      quadraticCurveTo(t, e, i, s, n, o, r) {
        t.push(oi, (e + 2 * s) / 3, (i + 2 * n) / 3, (o + 2 * s) / 3, (r + 2 * n) / 3, o, r)
      },
      toTwoPointBoundsByQuadraticCurve(t, e, i, s, n, o, r, a) {
        ci(t, e, (t + 2 * i) / 3, (e + 2 * s) / 3, (n + 2 * i) / 3, (o + 2 * s) / 3, n, o, r, a)
      },
      toTwoPointBounds(t, e, i, s, n, o, r, a, h, l) {
        const d = []
        let c,
          u,
          p,
          g,
          _,
          f,
          m,
          y,
          v = t,
          w = i,
          x = n,
          b = r
        for (let t = 0; t < 2; ++t)
          if (
            (1 == t && ((v = e), (w = s), (x = o), (b = a)),
            (c = -3 * v + 9 * w - 9 * x + 3 * b),
            (u = 6 * v - 12 * w + 6 * x),
            (p = 3 * w - 3 * v),
            Math.abs(c) < 1e-12)
          ) {
            if (Math.abs(u) < 1e-12) continue
            ;(g = -p / u), 0 < g && g < 1 && d.push(g)
          } else
            (m = u * u - 4 * p * c),
              (y = Math.sqrt(m)),
              m < 0 ||
                ((_ = (-u + y) / (2 * c)), 0 < _ && _ < 1 && d.push(_), (f = (-u - y) / (2 * c)), 0 < f && f < 1 && d.push(f))
        l ? ti(h, t, e) : Qe(h, t, e), ti(h, r, a)
        for (let l = 0, c = d.length; l < c; l++) di(d[l], t, e, i, s, n, o, r, a, hi), ti(h, hi.x, hi.y)
      },
      getPointAndSet(t, e, i, s, n, o, r, a, h, l) {
        const d = 1 - t,
          c = d * d * d,
          u = 3 * d * d * t,
          p = 3 * d * t * t,
          g = t * t * t
        ;(l.x = c * e + u * s + p * o + g * a), (l.y = c * i + u * n + p * r + g * h)
      },
      getPoint(t, e, i, s, n, o, r, a, h) {
        const l = {}
        return di(t, e, i, s, n, o, r, a, h, l), l
      },
      getDerivative(t, e, i, s, n) {
        const o = 1 - t
        return 3 * o * o * (i - e) + 6 * o * t * (s - i) + 3 * t * t * (n - s)
      }
    },
    { getPointAndSet: di, toTwoPointBounds: ci, ellipse: ui } = li,
    { sin: pi, cos: gi, sqrt: _i, atan2: fi } = Math,
    { ellipse: mi } = li,
    yi = {
      ellipticalArc(t, e, i, s, n, o, r, a, h, l, d) {
        const c = (h - e) / 2,
          u = (l - i) / 2,
          p = o * H,
          g = pi(p),
          _ = gi(p),
          f = -_ * c - g * u,
          m = -_ * u + g * c,
          y = s * s,
          v = n * n,
          x = m * m,
          b = f * f,
          E = y * v - y * x - v * b
        let T = 0
        if (E < 0) {
          const t = _i(1 - E / (y * v))
          ;(s *= t), (n *= t)
        } else T = (r === a ? -1 : 1) * _i(E / (y * x + v * b))
        const S = (T * s * m) / n,
          k = (-T * n * f) / s,
          B = fi((m - k) / n, (f - S) / s),
          P = fi((-m - k) / n, (-f - S) / s)
        let L = P - B
        0 === a && L > 0 ? (L -= N) : 1 === a && L < 0 && (L += N)
        const R = e + c + _ * S - g * k,
          C = i + u + g * S + _ * k,
          O = L < 0 ? 1 : 0
        d || w.ellipseToCurve
          ? mi(t, R, C, s, n, o, B / H, P / H, O)
          : s !== n || o
          ? t.push(Ie.G, R, C, s, n, o, B / H, P / H, O)
          : t.push(Ie.O, R, C, s, B / H, P / H, O)
      }
    },
    vi = { toCommand: t => [], toNode: t => [] },
    {
      M: wi,
      m: xi,
      L: bi,
      l: Ei,
      H: Ti,
      h: Si,
      V: ki,
      v: Bi,
      C: Pi,
      c: Li,
      S: Ri,
      s: Ci,
      Q: Oi,
      q: Ai,
      T: Di,
      t: Mi,
      A: Ii,
      a: Fi,
      Z: Wi,
      z: zi,
      N: Ui,
      D: Hi,
      X: Ni,
      G: Yi,
      F: Xi,
      O: Vi,
      P: Gi,
      U: ji
    } = Ie,
    { rect: Ki, roundRect: qi, arcTo: Zi, arc: $i, ellipse: Ji, quadraticCurveTo: Qi } = li,
    { ellipticalArc: ts } = yi,
    es = ie.get('PathConvert'),
    is = {},
    ss = {
      current: { dot: 0 },
      stringify(t, e) {
        let i,
          s,
          n,
          o = 0,
          r = t.length,
          a = ''
        for (; o < r; ) {
          ;(s = t[o]), (i = Ne[s]), (a += s === n ? ' ' : He[s])
          for (let s = 1; s < i; s++) (a += z.float(t[o + s], e)), s === i - 1 || (a += ' ')
          ;(n = s), (o += i)
        }
        return a
      },
      parse(t, e) {
        let i,
          s,
          n,
          o = ''
        const r = [],
          a = e ? ze : We
        for (let e = 0, h = t.length; e < h; e++)
          (s = t[e]),
            te[s]
              ? ('.' === s && (ns.dot && (os(r, o), (o = '')), ns.dot++),
                '0' === o && '.' !== s && (os(r, o), (o = '')),
                (o += s))
              : Ie[s]
              ? (o && (os(r, o), (o = '')),
                (ns.name = Ie[s]),
                (ns.length = Fe[s]),
                (ns.index = 0),
                os(r, ns.name),
                !i && a[s] && (i = !0))
              : '-' === s || '+' === s
              ? 'e' === n || 'E' === n
                ? (o += s)
                : (o && os(r, o), (o = s))
              : o && (os(r, o), (o = '')),
            (n = s)
        return o && os(r, o), i ? ss.toCanvasData(r, e) : r
      },
      toCanvasData(t, e) {
        let i,
          s,
          n,
          o,
          r,
          a = 0,
          h = 0,
          l = 0,
          d = 0,
          c = 0,
          u = t.length
        const p = []
        for (; c < u; ) {
          switch (((n = t[c]), n)) {
            case xi:
              ;(t[c + 1] += a), (t[c + 2] += h)
            case wi:
              ;(a = t[c + 1]), (h = t[c + 2]), p.push(wi, a, h), (c += 3)
              break
            case Si:
              t[c + 1] += a
            case Ti:
              ;(a = t[c + 1]), p.push(bi, a, h), (c += 2)
              break
            case Bi:
              t[c + 1] += h
            case ki:
              ;(h = t[c + 1]), p.push(bi, a, h), (c += 2)
              break
            case Ei:
              ;(t[c + 1] += a), (t[c + 2] += h)
            case bi:
              ;(a = t[c + 1]), (h = t[c + 2]), p.push(bi, a, h), (c += 3)
              break
            case Ci:
              ;(t[c + 1] += a), (t[c + 2] += h), (t[c + 3] += a), (t[c + 4] += h), (n = Ri)
            case Ri:
              ;(r = o === Pi || o === Ri),
                (l = r ? 2 * a - i : t[c + 1]),
                (d = r ? 2 * h - s : t[c + 2]),
                (i = t[c + 1]),
                (s = t[c + 2]),
                (a = t[c + 3]),
                (h = t[c + 4]),
                p.push(Pi, l, d, i, s, a, h),
                (c += 5)
              break
            case Li:
              ;(t[c + 1] += a), (t[c + 2] += h), (t[c + 3] += a), (t[c + 4] += h), (t[c + 5] += a), (t[c + 6] += h), (n = Pi)
            case Pi:
              ;(i = t[c + 3]),
                (s = t[c + 4]),
                (a = t[c + 5]),
                (h = t[c + 6]),
                p.push(Pi, t[c + 1], t[c + 2], i, s, a, h),
                (c += 7)
              break
            case Mi:
              ;(t[c + 1] += a), (t[c + 2] += h), (n = Di)
            case Di:
              ;(r = o === Oi || o === Di),
                (i = r ? 2 * a - i : t[c + 1]),
                (s = r ? 2 * h - s : t[c + 2]),
                e ? Qi(p, a, h, i, s, t[c + 1], t[c + 2]) : p.push(Oi, i, s, t[c + 1], t[c + 2]),
                (a = t[c + 1]),
                (h = t[c + 2]),
                (c += 3)
              break
            case Ai:
              ;(t[c + 1] += a), (t[c + 2] += h), (t[c + 3] += a), (t[c + 4] += h), (n = Oi)
            case Oi:
              ;(i = t[c + 1]),
                (s = t[c + 2]),
                e ? Qi(p, a, h, i, s, t[c + 3], t[c + 4]) : p.push(Oi, i, s, t[c + 3], t[c + 4]),
                (a = t[c + 3]),
                (h = t[c + 4]),
                (c += 5)
              break
            case Fi:
              ;(t[c + 6] += a), (t[c + 7] += h)
            case Ii:
              ts(p, a, h, t[c + 1], t[c + 2], t[c + 3], t[c + 4], t[c + 5], t[c + 6], t[c + 7], e),
                (a = t[c + 6]),
                (h = t[c + 7]),
                (c += 8)
              break
            case zi:
            case Wi:
              p.push(Wi), c++
              break
            case Ui:
              ;(a = t[c + 1]), (h = t[c + 2]), e ? Ki(p, a, h, t[c + 3], t[c + 4]) : rs(p, t, c, 5), (c += 5)
              break
            case Hi:
              ;(a = t[c + 1]),
                (h = t[c + 2]),
                e ? qi(p, a, h, t[c + 3], t[c + 4], [t[c + 5], t[c + 6], t[c + 7], t[c + 8]]) : rs(p, t, c, 9),
                (c += 9)
              break
            case Ni:
              ;(a = t[c + 1]), (h = t[c + 2]), e ? qi(p, a, h, t[c + 3], t[c + 4], t[c + 5]) : rs(p, t, c, 6), (c += 6)
              break
            case Yi:
              Ji(
                e ? p : rs(p, t, c, 9),
                t[c + 1],
                t[c + 2],
                t[c + 3],
                t[c + 4],
                t[c + 5],
                t[c + 6],
                t[c + 7],
                t[c + 8],
                null,
                is
              ),
                (a = is.x),
                (h = is.y),
                (c += 9)
              break
            case Xi:
              e ? Ji(p, t[c + 1], t[c + 2], t[c + 3], t[c + 4], 0, 0, 360, !1) : rs(p, t, c, 5),
                (a = t[c + 1] + t[c + 3]),
                (h = t[c + 2]),
                (c += 5)
              break
            case Vi:
              $i(e ? p : rs(p, t, c, 7), t[c + 1], t[c + 2], t[c + 3], t[c + 4], t[c + 5], t[c + 6], null, is),
                (a = is.x),
                (h = is.y),
                (c += 7)
              break
            case Gi:
              e ? $i(p, t[c + 1], t[c + 2], t[c + 3], 0, 360, !1) : rs(p, t, c, 4),
                (a = t[c + 1] + t[c + 3]),
                (h = t[c + 2]),
                (c += 4)
              break
            case ji:
              Zi(e ? p : rs(p, t, c, 6), a, h, t[c + 1], t[c + 2], t[c + 3], t[c + 4], t[c + 5], null, is),
                (a = is.x),
                (h = is.y),
                (c += 6)
              break
            default:
              return es.error(`command: ${n} [index:${c}]`, t), p
          }
          o = n
        }
        return p
      },
      objectToCanvasData(t) {
        if (t[0].name.length > 1) return vi.toCommand(t)
        {
          const e = []
          return (
            t.forEach(t => {
              switch (t.name) {
                case 'M':
                  e.push(wi, t.x, t.y)
                  break
                case 'L':
                  e.push(bi, t.x, t.y)
                  break
                case 'C':
                  e.push(Pi, t.x1, t.y1, t.x2, t.y2, t.x, t.y)
                  break
                case 'Q':
                  e.push(Oi, t.x1, t.y1, t.x, t.y)
                  break
                case 'Z':
                  e.push(Wi)
              }
            }),
            e
          )
        }
      },
      copyData(t, e, i, s) {
        for (let n = i, o = i + s; n < o; n++) t.push(e[n])
      },
      pushData(t, e) {
        ns.index === ns.length && ((ns.index = 1), t.push(ns.name)), t.push(Number(e)), ns.index++, (ns.dot = 0)
      }
    },
    { current: ns, pushData: os, copyData: rs } = ss,
    { M: as, L: hs, C: ls, Q: ds, Z: cs, N: us, D: ps, X: gs, G: _s, F: fs, O: ms, P: ys, U: vs } = Ie,
    { getMinDistanceFrom: ws, getRadianFrom: xs } = ut,
    { tan: bs, min: Es, abs: Ts } = Math,
    Ss = {},
    ks = {
      beginPath(t) {
        t.length = 0
      },
      moveTo(t, e, i) {
        t.push(as, e, i)
      },
      lineTo(t, e, i) {
        t.push(hs, e, i)
      },
      bezierCurveTo(t, e, i, s, n, o, r) {
        t.push(ls, e, i, s, n, o, r)
      },
      quadraticCurveTo(t, e, i, s, n) {
        t.push(ds, e, i, s, n)
      },
      closePath(t) {
        t.push(cs)
      },
      rect(t, e, i, s, n) {
        t.push(us, e, i, s, n)
      },
      roundRect(t, e, i, s, n, o) {
        if (h(o)) t.push(gs, e, i, s, n, o)
        else {
          const r = z.fourNumber(o)
          r ? t.push(ps, e, i, s, n, ...r) : t.push(us, e, i, s, n)
        }
      },
      ellipse(t, e, i, s, n, r, a, h, l) {
        if (s === n) return Ps(t, e, i, s, a, h, l)
        o(r) ? t.push(fs, e, i, s, n) : (o(a) && (a = 0), o(h) && (h = 360), t.push(_s, e, i, s, n, r, a, h, l ? 1 : 0))
      },
      arc(t, e, i, s, n, r, a) {
        o(n) ? t.push(ys, e, i, s) : (o(n) && (n = 0), o(r) && (r = 360), t.push(ms, e, i, s, n, r, a ? 1 : 0))
      },
      arcTo(t, e, i, s, o, r, a, h) {
        if (!n(a)) {
          const t = ws(a, h, e, i, s, o)
          r = Es(r, Es(t / 2, (t / 2) * Ts(bs(xs(a, h, e, i, s, o) / 2))))
        }
        t.push(vs, e, i, s, o, r)
      },
      drawEllipse(t, e, i, s, n, r, a, h, l) {
        li.ellipse(null, e, i, s, n, o(r) ? 0 : r, o(a) ? 0 : a, o(h) ? 360 : h, l, null, null, Ss),
          t.push(as, Ss.x, Ss.y),
          Bs(t, e, i, s, n, r, a, h, l)
      },
      drawArc(t, e, i, s, n, r, a) {
        li.arc(null, e, i, s, o(n) ? 0 : n, o(r) ? 360 : r, a, null, null, Ss), t.push(as, Ss.x, Ss.y), Ps(t, e, i, s, n, r, a)
      },
      drawPoints(t, e, i, s) {
        li.points(t, e, i, s)
      }
    },
    { ellipse: Bs, arc: Ps } = ks,
    {
      moveTo: Ls,
      lineTo: Rs,
      quadraticCurveTo: Cs,
      bezierCurveTo: Os,
      closePath: As,
      beginPath: Ds,
      rect: Ms,
      roundRect: Is,
      ellipse: Fs,
      arc: Ws,
      arcTo: zs,
      drawEllipse: Us,
      drawArc: Hs,
      drawPoints: Ns
    } = ks
  class Ys {
    set path(t) {
      this.__path = t
    }
    get path() {
      return this.__path
    }
    constructor(t) {
      this.set(t)
    }
    set(t) {
      return (this.__path = t ? (r(t) ? De.parse(t) : t) : []), this
    }
    beginPath() {
      return Ds(this.__path), this.paint(), this
    }
    moveTo(t, e) {
      return Ls(this.__path, t, e), this.paint(), this
    }
    lineTo(t, e) {
      return Rs(this.__path, t, e), this.paint(), this
    }
    bezierCurveTo(t, e, i, s, n, o) {
      return Os(this.__path, t, e, i, s, n, o), this.paint(), this
    }
    quadraticCurveTo(t, e, i, s) {
      return Cs(this.__path, t, e, i, s), this.paint(), this
    }
    closePath() {
      return As(this.__path), this.paint(), this
    }
    rect(t, e, i, s) {
      return Ms(this.__path, t, e, i, s), this.paint(), this
    }
    roundRect(t, e, i, s, n) {
      return Is(this.__path, t, e, i, s, n), this.paint(), this
    }
    ellipse(t, e, i, s, n, o, r, a) {
      return Fs(this.__path, t, e, i, s, n, o, r, a), this.paint(), this
    }
    arc(t, e, i, s, n, o) {
      return Ws(this.__path, t, e, i, s, n, o), this.paint(), this
    }
    arcTo(t, e, i, s, n) {
      return zs(this.__path, t, e, i, s, n), this.paint(), this
    }
    drawEllipse(t, e, i, s, n, o, r, a) {
      return Us(this.__path, t, e, i, s, n, o, r, a), this.paint(), this
    }
    drawArc(t, e, i, s, n, o) {
      return Hs(this.__path, t, e, i, s, n, o), this.paint(), this
    }
    drawPoints(t, e, i) {
      return Ns(this.__path, t, e, i), this.paint(), this
    }
    clearPath() {
      return this.beginPath()
    }
    paint() {}
  }
  const { M: Xs, L: Vs, C: Gs, Q: js, Z: Ks, N: qs, D: Zs, X: $s, G: Js, F: Qs, O: tn, P: en, U: sn } = Ie,
    nn = ie.get('PathDrawer'),
    on = {
      drawPathByData(t, e) {
        if (!e) return
        let i,
          s = 0,
          n = e.length
        for (; s < n; )
          switch (((i = e[s]), i)) {
            case Xs:
              t.moveTo(e[s + 1], e[s + 2]), (s += 3)
              break
            case Vs:
              t.lineTo(e[s + 1], e[s + 2]), (s += 3)
              break
            case Gs:
              t.bezierCurveTo(e[s + 1], e[s + 2], e[s + 3], e[s + 4], e[s + 5], e[s + 6]), (s += 7)
              break
            case js:
              t.quadraticCurveTo(e[s + 1], e[s + 2], e[s + 3], e[s + 4]), (s += 5)
              break
            case Ks:
              t.closePath(), (s += 1)
              break
            case qs:
              t.rect(e[s + 1], e[s + 2], e[s + 3], e[s + 4]), (s += 5)
              break
            case Zs:
              t.roundRect(e[s + 1], e[s + 2], e[s + 3], e[s + 4], [e[s + 5], e[s + 6], e[s + 7], e[s + 8]]), (s += 9)
              break
            case $s:
              t.roundRect(e[s + 1], e[s + 2], e[s + 3], e[s + 4], e[s + 5]), (s += 6)
              break
            case Js:
              t.ellipse(e[s + 1], e[s + 2], e[s + 3], e[s + 4], e[s + 5] * H, e[s + 6] * H, e[s + 7] * H, e[s + 8]), (s += 9)
              break
            case Qs:
              t.ellipse(e[s + 1], e[s + 2], e[s + 3], e[s + 4], 0, 0, N, !1), (s += 5)
              break
            case tn:
              t.arc(e[s + 1], e[s + 2], e[s + 3], e[s + 4] * H, e[s + 5] * H, e[s + 6]), (s += 7)
              break
            case en:
              t.arc(e[s + 1], e[s + 2], e[s + 3], 0, N, !1), (s += 4)
              break
            case sn:
              t.arcTo(e[s + 1], e[s + 2], e[s + 3], e[s + 4], e[s + 5]), (s += 6)
              break
            default:
              return void nn.error(`command: ${i} [index:${s}]`, e)
          }
      }
    },
    { M: rn, L: an, C: hn, Q: ln, Z: dn, N: cn, D: un, X: pn, G: gn, F: _n, O: fn, P: mn, U: yn } = Ie,
    { toTwoPointBounds: vn, toTwoPointBoundsByQuadraticCurve: wn, arcTo: xn, arc: bn, ellipse: En } = li,
    { addPointBounds: Tn, copy: Sn, addPoint: kn, setPoint: Bn, addBounds: Pn, toBounds: Ln } = bt,
    Rn = ie.get('PathBounds')
  let Cn, On, An
  const Dn = {},
    Mn = {},
    In = {},
    Fn = {
      toBounds(t, e) {
        Fn.toTwoPointBounds(t, Mn), Ln(Mn, e)
      },
      toTwoPointBounds(t, e) {
        if (!t || !t.length) return Bn(e, 0, 0)
        let i,
          s,
          n,
          o,
          r,
          a = 0,
          h = 0,
          l = 0
        const d = t.length
        for (; a < d; )
          switch (((r = t[a]), 0 === a && (r === dn || r === hn || r === ln ? Bn(e, h, l) : Bn(e, t[a + 1], t[a + 2])), r)) {
            case rn:
            case an:
              ;(h = t[a + 1]), (l = t[a + 2]), kn(e, h, l), (a += 3)
              break
            case hn:
              ;(n = t[a + 5]),
                (o = t[a + 6]),
                vn(h, l, t[a + 1], t[a + 2], t[a + 3], t[a + 4], n, o, Dn),
                Tn(e, Dn),
                (h = n),
                (l = o),
                (a += 7)
              break
            case ln:
              ;(i = t[a + 1]),
                (s = t[a + 2]),
                (n = t[a + 3]),
                (o = t[a + 4]),
                wn(h, l, i, s, n, o, Dn),
                Tn(e, Dn),
                (h = n),
                (l = o),
                (a += 5)
              break
            case dn:
              a += 1
              break
            case cn:
              ;(h = t[a + 1]), (l = t[a + 2]), Pn(e, h, l, t[a + 3], t[a + 4]), (a += 5)
              break
            case un:
            case pn:
              ;(h = t[a + 1]), (l = t[a + 2]), Pn(e, h, l, t[a + 3], t[a + 4]), (a += r === un ? 9 : 6)
              break
            case gn:
              En(null, t[a + 1], t[a + 2], t[a + 3], t[a + 4], t[a + 5], t[a + 6], t[a + 7], t[a + 8], Dn, In),
                0 === a ? Sn(e, Dn) : Tn(e, Dn),
                (h = In.x),
                (l = In.y),
                (a += 9)
              break
            case _n:
              ;(h = t[a + 1]),
                (l = t[a + 2]),
                (On = t[a + 3]),
                (An = t[a + 4]),
                Pn(e, h - On, l - An, 2 * On, 2 * An),
                (h += On),
                (a += 5)
              break
            case fn:
              bn(null, t[a + 1], t[a + 2], t[a + 3], t[a + 4], t[a + 5], t[a + 6], Dn, In),
                0 === a ? Sn(e, Dn) : Tn(e, Dn),
                (h = In.x),
                (l = In.y),
                (a += 7)
              break
            case mn:
              ;(h = t[a + 1]), (l = t[a + 2]), (Cn = t[a + 3]), Pn(e, h - Cn, l - Cn, 2 * Cn, 2 * Cn), (h += Cn), (a += 4)
              break
            case yn:
              xn(null, h, l, t[a + 1], t[a + 2], t[a + 3], t[a + 4], t[a + 5], Dn, In),
                0 === a ? Sn(e, Dn) : Tn(e, Dn),
                (h = In.x),
                (l = In.y),
                (a += 6)
              break
            default:
              return void Rn.error(`command: ${r} [index:${a}]`, t)
          }
      }
    },
    { M: Wn, L: zn, Z: Un } = Ie,
    { getCenterX: Hn, getCenterY: Nn } = ut,
    { arcTo: Yn } = ks,
    Xn = {
      smooth(t, e, i) {
        let s,
          n,
          o,
          r = 0,
          a = 0,
          h = 0,
          l = 0,
          d = 0,
          u = 0,
          p = 0,
          g = 0,
          _ = 0
        c(e) && (e = e[0] || 0)
        const f = t.length,
          m = []
        for (; r < f; ) {
          switch (((s = t[r]), s)) {
            case Wn:
              ;(l = g = t[r + 1]),
                (d = _ = t[r + 2]),
                (r += 3),
                t[r] === zn ? ((u = t[r + 1]), (p = t[r + 2]), m.push(Wn, Hn(l, u), Nn(d, p))) : m.push(Wn, l, d)
              break
            case zn:
              switch (((a = t[r + 1]), (h = t[r + 2]), (r += 3), t[r])) {
                case zn:
                  Yn(m, a, h, t[r + 1], t[r + 2], e, g, _)
                  break
                case Un:
                  Yn(m, a, h, l, d, e, g, _)
                  break
                default:
                  m.push(zn, a, h)
              }
              ;(g = a), (_ = h)
              break
            case Un:
              n !== Un && (Yn(m, l, d, u, p, e, g, _), m.push(Un)), (r += 1)
              break
            default:
              o = Ne[s]
              for (let e = 0; e < o; e++) m.push(t[r + e])
              r += o
          }
          n = s
        }
        return s !== Un && ((m[1] = l), (m[2] = d)), m
      }
    }
  function Vn(t) {
    return new Ys(t)
  }
  const Gn = Vn()
  ;(De.creator = Vn()), (De.parse = ss.parse), (De.convertToCanvasData = ss.toCanvasData)
  const { drawRoundRect: jn } = Ye
  function Kn(t) {
    !(function (t) {
      t &&
        !t.roundRect &&
        (t.roundRect = function (t, e, i, s, n) {
          jn(this, t, e, i, s, n)
        })
    })(t)
  }
  const qn = {
      alphaPixelTypes: ['png', 'webp', 'svg'],
      upperCaseTypeMap: {},
      mineType: t => (!t || t.startsWith('image') ? t : ('jpg' === t && (t = 'jpeg'), 'image/' + t)),
      fileType(t) {
        const e = t.split('.')
        return e[e.length - 1]
      },
      isOpaqueImage(t) {
        const e = Zn.fileType(t)
        return ['jpg', 'jpeg'].some(t => t === e)
      },
      getExportOptions(t) {
        switch (typeof t) {
          case 'object':
            return t
          case 'number':
            return { quality: t }
          case 'boolean':
            return { blob: t }
          default:
            return {}
        }
      }
    },
    Zn = qn
  Zn.alphaPixelTypes.forEach(t => (Zn.upperCaseTypeMap[t] = t.toUpperCase()))
  const $n = ie.get('TaskProcessor')
  class Jn {
    constructor(t) {
      ;(this.parallel = !0), (this.time = 1), (this.id = b.create(b.TASK)), (this.task = t)
    }
    run() {
      return ve(this, void 0, void 0, function* () {
        try {
          if (this.isComplete) return
          if (this.canUse && !this.canUse()) return this.cancel()
          this.task && this.parent.running && (yield this.task())
        } catch (t) {
          $n.error(t)
        }
      })
    }
    complete() {
      ;(this.isComplete = !0), (this.parent = this.task = this.canUse = null)
    }
    cancel() {
      ;(this.isCancel = !0), this.complete()
    }
  }
  class Qn {
    get total() {
      return this.list.length + this.delayNumber
    }
    get finishedIndex() {
      return this.isComplete ? 0 : this.index + this.parallelSuccessNumber
    }
    get remain() {
      return this.isComplete ? this.total : this.total - this.finishedIndex
    }
    get percent() {
      const { total: t } = this
      let e = 0,
        i = 0
      for (let s = 0; s < t; s++)
        s <= this.finishedIndex ? ((i += this.list[s].time), s === this.finishedIndex && (e = i)) : (e += this.list[s].time)
      return this.isComplete ? 1 : i / e
    }
    constructor(t) {
      ;(this.config = { parallel: 6 }),
        (this.list = []),
        (this.running = !1),
        (this.isComplete = !0),
        (this.index = 0),
        (this.delayNumber = 0),
        t && _.assign(this.config, t),
        this.empty()
    }
    add(t, e, i) {
      let s, o, r, a
      const l = new Jn(t)
      return (
        (l.parent = this),
        h(e) ? (a = e) : e && ((o = e.parallel), (s = e.start), (r = e.time), (a = e.delay), i || (i = e.canUse)),
        r && (l.time = r),
        !1 === o && (l.parallel = !1),
        i && (l.canUse = i),
        n(a)
          ? this.push(l, s)
          : (this.delayNumber++,
            setTimeout(() => {
              this.delayNumber && (this.delayNumber--, this.push(l, s))
            }, a)),
        (this.isComplete = !1),
        l
      )
    }
    push(t, e) {
      this.list.push(t), !1 === e || this.timer || (this.timer = setTimeout(() => this.start()))
    }
    empty() {
      ;(this.index = 0), (this.parallelSuccessNumber = 0), (this.list = []), (this.parallelList = []), (this.delayNumber = 0)
    }
    start() {
      this.running || ((this.running = !0), (this.isComplete = !1), this.run())
    }
    pause() {
      clearTimeout(this.timer), (this.timer = null), (this.running = !1)
    }
    resume() {
      this.start()
    }
    skip() {
      this.index++, this.resume()
    }
    stop() {
      ;(this.isComplete = !0),
        this.list.forEach(t => {
          t.isComplete || t.cancel()
        }),
        this.pause(),
        this.empty()
    }
    run() {
      this.running &&
        (this.setParallelList(),
        this.parallelList.length > 1 ? this.runParallelTasks() : this.remain ? this.runTask() : this.onComplete())
    }
    runTask() {
      const t = this.list[this.index]
      t
        ? t
            .run()
            .then(() => {
              this.onTask(t), this.index++, t.isCancel ? this.runTask() : this.nextTask()
            })
            .catch(t => {
              this.onError(t)
            })
        : (this.timer = setTimeout(() => this.nextTask()))
    }
    runParallelTasks() {
      this.parallelList.forEach(t => this.runParallelTask(t))
    }
    runParallelTask(t) {
      t.run()
        .then(() => {
          this.onTask(t), this.fillParallelTask()
        })
        .catch(t => {
          this.onParallelError(t)
        })
    }
    nextTask() {
      this.total === this.finishedIndex ? this.onComplete() : (this.timer = setTimeout(() => this.run()))
    }
    setParallelList() {
      let t
      const { config: e, list: i, index: s } = this
      ;(this.parallelList = []), (this.parallelSuccessNumber = 0)
      let n = s + e.parallel
      if ((n > i.length && (n = i.length), e.parallel > 1))
        for (let e = s; e < n && ((t = i[e]), t.parallel); e++) this.parallelList.push(t)
    }
    fillParallelTask() {
      let t
      const e = this.parallelList
      this.parallelSuccessNumber++, e.pop()
      const i = e.length,
        s = this.finishedIndex + i
      if (e.length) {
        if (!this.running) return
        s < this.total && ((t = this.list[s]), t && t.parallel && (e.push(t), this.runParallelTask(t)))
      } else (this.index += this.parallelSuccessNumber), (this.parallelSuccessNumber = 0), this.nextTask()
    }
    onComplete() {
      this.stop(), this.config.onComplete && this.config.onComplete()
    }
    onTask(t) {
      t.complete(), this.config.onTask && this.config.onTask()
    }
    onParallelError(t) {
      this.parallelList.forEach(t => {
        t.parallel = !1
      }),
        (this.parallelList.length = 0),
        (this.parallelSuccessNumber = 0),
        this.onError(t)
    }
    onError(t) {
      this.pause(), this.config.onError && this.config.onError(t)
    }
    destroy() {
      this.stop()
    }
  }
  const to = ie.get('Resource'),
    eo = {
      tasker: new Qn(),
      map: {},
      get isComplete() {
        return io.tasker.isComplete
      },
      set(t, e) {
        io.map[t] && to.repeat(t), (io.map[t] = e)
      },
      get: t => io.map[t],
      remove(t) {
        const e = io.map[t]
        e && (e.destroy && e.destroy(), delete io.map[t])
      },
      loadImage(t, e) {
        return new Promise((i, s) => {
          const n = this.setImage(t, t, e)
          n.load(
            () => i(n),
            t => s(t)
          )
        })
      },
      setImage(t, e, i) {
        let s
        return (
          r(e) ? (s = { url: e }) : e.url || (s = { url: t, view: e }),
          s && (i && (s.format = i), (e = de.image(s))),
          io.set(t, e),
          e
        )
      },
      destroy() {
        io.map = {}
      }
    },
    io = eo,
    so = {
      maxRecycled: 10,
      recycledList: [],
      patternTasker: new Qn({ parallel: 1 }),
      get(t) {
        let e = eo.get(t.url)
        return e || eo.set(t.url, (e = de.image(t))), e.use++, e
      },
      recycle(t) {
        t.use--,
          setTimeout(() => {
            t.use || (w.image.isLarge(t) ? t.url && eo.remove(t.url) : (t.clearLevels(), no.recycledList.push(t)))
          })
      },
      recyclePaint(t) {
        no.recycle(t.image)
      },
      clearRecycled(t) {
        const e = no.recycledList
        ;(e.length > no.maxRecycled || t) && (e.forEach(e => (!e.use || t) && e.url && eo.remove(e.url)), (e.length = 0))
      },
      clearLevels() {},
      hasAlphaPixel: t => qn.alphaPixelTypes.some(e => no.isFormat(e, t)),
      isFormat(t, e) {
        if (e.format) return e.format === t
        const { url: i } = e
        if (i.startsWith('data:')) {
          if (i.startsWith('data:' + qn.mineType(t))) return !0
        } else {
          if (i.includes('.' + t) || i.includes('.' + qn.upperCaseTypeMap[t])) return !0
          if ('png' === t && !i.includes('.')) return !0
        }
        return !1
      },
      destroy() {
        this.clearRecycled(!0)
      }
    },
    no = so,
    { IMAGE: oo, create: ro } = b
  class ao {
    get url() {
      return this.config.url
    }
    get crossOrigin() {
      const { crossOrigin: t } = this.config
      return n(t) ? w.image.crossOrigin : t
    }
    get completed() {
      return this.ready || !!this.error
    }
    constructor(t) {
      if (((this.use = 0), (this.waitComplete = []), (this.innerId = ro(oo)), (this.config = t || (t = { url: '' })), t.view)) {
        const { view: e } = t
        this.setView(e.config ? e.view : e)
      }
      so.isFormat('svg', t) && (this.isSVG = !0), so.hasAlphaPixel(t) && (this.hasAlphaPixel = !0)
    }
    load(t, e, i) {
      return (
        this.loading ||
          ((this.loading = !0),
          eo.tasker.add(() =>
            ve(this, void 0, void 0, function* () {
              return yield w.origin
                .loadImage(this.getLoadUrl(i), this.crossOrigin, this)
                .then(t => {
                  i && this.setThumbView(t), this.setView(t)
                })
                .catch(t => {
                  ;(this.error = t), this.onComplete(!1)
                })
            })
          )),
        this.waitComplete.push(t, e),
        this.waitComplete.length - 2
      )
    }
    unload(t, e) {
      const i = this.waitComplete
      if (e) {
        const e = i[t + 1]
        e && e({ type: 'stop' })
      }
      i[t] = i[t + 1] = void 0
    }
    setView(t) {
      ;(this.ready = !0), this.width || ((this.width = t.width), (this.height = t.height), (this.view = t)), this.onComplete(!0)
    }
    onComplete(t) {
      let e
      this.waitComplete.forEach((i, s) => {
        ;(e = s % 2), i && (t ? e || i(this) : e && i(this.error))
      }),
        (this.waitComplete.length = 0),
        (this.loading = !1)
    }
    getFull(t) {
      return this.view
    }
    getCanvas(t, e, i, s, n, o, r) {
      if ((t || (t = this.width), e || (e = this.height), this.cache)) {
        let { params: t, data: e } = this.cache
        for (let i in t)
          if (t[i] !== arguments[i]) {
            e = null
            break
          }
        if (e) return e
      }
      const a = w.image.resize(this.view, t, e, n, o, void 0, r, i, s)
      return (this.cache = this.use > 1 ? { data: a, params: arguments } : null), a
    }
    getPattern(t, e, i, s) {
      const n = w.canvas.createPattern(t, e)
      return w.image.setPatternTransform(n, i, s), n
    }
    getLoadUrl(t) {
      return this.url
    }
    setThumbView(t) {}
    getThumbSize() {}
    getMinLevel() {}
    getLevelData(t) {}
    clearLevels(t) {}
    destroy() {
      this.clearLevels()
      const { view: t } = this
      t && t.close && t.close(), (this.config = { url: '' }), (this.cache = this.view = null), (this.waitComplete.length = 0)
    }
  }
  function ho(t, e, i, s) {
    s || (i.configurable = i.enumerable = !0), Object.defineProperty(t, e, i)
  }
  function lo(t, e) {
    return Object.getOwnPropertyDescriptor(t, e)
  }
  function co(t, e) {
    const i = '_' + t
    return {
      get() {
        const t = this[i]
        return null == t ? e : t
      },
      set(t) {
        this[i] = t
      }
    }
  }
  function uo(t, e) {
    return (i, s) => go(i, s, t, e && e(s))
  }
  function po(t) {
    return t
  }
  function go(t, e, i, s) {
    const n = {
      get() {
        return this.__getAttr(e)
      },
      set(t) {
        this.__setAttr(e, t)
      }
    }
    ho(t, e, Object.assign(n, s || {})), No(t, e, i)
  }
  function _o(t) {
    return uo(t)
  }
  function fo(t, e) {
    return uo(t, t => ({
      set(i) {
        this.__setAttr(t, i, e) && (this.__layout.matrixChanged || this.__layout.matrixChange())
      }
    }))
  }
  function mo(t, e) {
    return uo(t, t => ({
      set(i) {
        this.__setAttr(t, i, e) &&
          (this.__layout.matrixChanged || this.__layout.matrixChange(), this.__scrollWorld || (this.__scrollWorld = {}))
      }
    }))
  }
  function yo(t) {
    return uo(t, t => ({
      set(e) {
        this.__setAttr(t, e) &&
          ((this.__hasAutoLayout = !!(this.origin || this.around || this.flow)),
          this.__local || this.__layout.createLocal(),
          Eo(this))
      }
    }))
  }
  function vo(t, e) {
    return uo(t, t => ({
      set(i) {
        this.__setAttr(t, i, e) && (this.__layout.scaleChanged || this.__layout.scaleChange())
      }
    }))
  }
  function wo(t, e) {
    return uo(t, t => ({
      set(i) {
        this.__setAttr(t, i, e) && (this.__layout.rotationChanged || this.__layout.rotationChange())
      }
    }))
  }
  function xo(t, e) {
    return uo(t, t => ({
      set(i) {
        this.__setAttr(t, i, e) && Eo(this)
      }
    }))
  }
  function bo(t) {
    return uo(t, t => ({
      set(e) {
        this.__setAttr(t, e) && (Eo(this), this.__.__removeNaturalSize())
      }
    }))
  }
  function Eo(t) {
    t.__layout.boxChanged || t.__layout.boxChange(), t.__hasAutoLayout && (t.__layout.matrixChanged || t.__layout.matrixChange())
  }
  function To(t) {
    return uo(t, t => ({
      set(e) {
        const i = this.__
        2 !== i.__pathInputed && (i.__pathInputed = e ? 1 : 0), e || (i.__pathForRender = void 0), this.__setAttr(t, e), Eo(this)
      }
    }))
  }
  const So = xo
  function ko(t, e) {
    return uo(t, t => ({
      set(i) {
        this.__setAttr(t, i) && (Bo(this), e && (this.__.__useStroke = !0))
      }
    }))
  }
  function Bo(t) {
    t.__layout.strokeChanged || t.__layout.strokeChange(), t.__.__useArrow && Eo(t)
  }
  const Po = ko
  function Lo(t) {
    return uo(t, t => ({
      set(e) {
        this.__setAttr(t, e), this.__layout.renderChanged || this.__layout.renderChange()
      }
    }))
  }
  function Ro(t) {
    return uo(t, t => ({
      set(e) {
        this.__setAttr(t, e) && (this.__layout.surfaceChanged || this.__layout.surfaceChange())
      }
    }))
  }
  function Co(t) {
    return uo(t, t => ({
      set(e) {
        if (this.__setAttr(t, e)) {
          const t = this.__
          _.stintSet(t, '__useDim', t.dim || t.bright || t.dimskip), this.__layout.surfaceChange()
        }
      }
    }))
  }
  function Oo(t) {
    return uo(t, t => ({
      set(e) {
        this.__setAttr(t, e) && (this.__layout.opacityChanged || this.__layout.opacityChange()), this.mask && Do(this)
      }
    }))
  }
  function Ao(t) {
    return uo(t, t => ({
      set(e) {
        const i = this.visible
        if (!0 === i && 0 === e) {
          if (this.animationOut) return this.__runAnimation('out', () => Mo(this, t, e, i))
        } else 0 === i && !0 === e && this.animation && this.__runAnimation('in')
        Mo(this, t, e, i), this.mask && Do(this)
      }
    }))
  }
  function Do(t) {
    const { parent: e } = t
    if (e) {
      const { __hasMask: t } = e
      e.__updateMask(), t !== e.__hasMask && e.forceUpdate()
    }
  }
  function Mo(t, e, i, s) {
    t.__setAttr(e, i) && (t.__layout.opacityChanged || t.__layout.opacityChange(), (0 !== s && 0 !== i) || Eo(t))
  }
  function Io(t) {
    return uo(t, t => ({
      set(e) {
        this.__setAttr(t, e) &&
          (this.__layout.surfaceChange(),
          this.waitParent(() => {
            this.parent.__layout.childrenSortChange()
          }))
      }
    }))
  }
  function Fo(t) {
    return uo(t, t => ({
      set(e) {
        this.__setAttr(t, e) &&
          (this.__layout.boxChanged || this.__layout.boxChange(),
          this.waitParent(() => {
            this.parent.__updateMask(e)
          }))
      }
    }))
  }
  function Wo(t) {
    return uo(t, t => ({
      set(e) {
        this.__setAttr(t, e) &&
          this.waitParent(() => {
            this.parent.__updateEraser(e)
          })
      }
    }))
  }
  function zo(t) {
    return uo(t, t => ({
      set(e) {
        this.__setAttr(t, e) &&
          ((this.__layout.hitCanvasChanged = !0),
          'hit' === ie.showBounds && this.__layout.surfaceChange(),
          this.leafer && this.leafer.updateCursor())
      }
    }))
  }
  function Uo(t) {
    return uo(t, t => ({
      set(e) {
        this.__setAttr(t, e), this.leafer && this.leafer.updateCursor()
      }
    }))
  }
  function Ho(t) {
    return (e, i) => {
      ho(e, '__DataProcessor', { get: () => t })
    }
  }
  function No(t, e, i) {
    const s = t.__DataProcessor.prototype,
      o = '_' + e,
      r = (function (t) {
        return 'set' + t.charAt(0).toUpperCase() + t.slice(1)
      })(e),
      a = co(e, i)
    if (n(i))
      a.get = function () {
        return this[o]
      }
    else if ('function' == typeof i)
      a.get = function () {
        const t = this[o]
        return null == t ? i(this.__leaf) : t
      }
    else if (u(i)) {
      const t = g(i)
      a.get = function () {
        const e = this[o]
        return null == e ? (this[o] = t ? {} : _.clone(i)) : e
      }
    }
    const h = t.isBranchLeaf
    'width' === e
      ? (a.get = function () {
          const t = this[o]
          if (null == t) {
            const t = this,
              e = t.__naturalWidth,
              s = t.__leaf
            return !i || s.pathInputed
              ? s.boxBounds.width
              : e
              ? t._height && t.__useNaturalRatio
                ? (t._height * e) / t.__naturalHeight
                : e
              : h && s.children.length
              ? s.boxBounds.width
              : i
          }
          return t
        })
      : 'height' === e &&
        (a.get = function () {
          const t = this[o]
          if (null == t) {
            const t = this,
              e = t.__naturalHeight,
              s = t.__leaf
            return !i || s.pathInputed
              ? s.boxBounds.height
              : e
              ? t._width && t.__useNaturalRatio
                ? (t._width * e) / t.__naturalWidth
                : e
              : h && s.children.length
              ? s.boxBounds.height
              : i
          }
          return t
        })
    let l,
      d = s
    for (; !l && d; ) (l = lo(d, e)), (d = d.__proto__)
    l && l.set && (a.set = l.set), s[r] && ((a.set = s[r]), delete s[r]), ho(s, e, a)
  }
  const Yo = new ie('rewrite'),
    Xo = [],
    Vo = ['destroy', 'constructor']
  function Go(t) {
    return (e, i) => {
      Xo.push({
        name: e.constructor.name + '.' + i,
        run: () => {
          e[i] = t
        }
      })
    }
  }
  function jo() {
    return t => {
      Ko()
    }
  }
  function Ko(t) {
    Xo.length &&
      (Xo.forEach(e => {
        t && Yo.error(e.name, '需在Class上装饰@rewriteAble()'), e.run()
      }),
      (Xo.length = 0))
  }
  function qo(t, e) {
    return i => {
      var s
      ;(t.prototype ? ((s = t.prototype), Object.getOwnPropertyNames(s)) : Object.keys(t)).forEach(s => {
        if (!(Vo.includes(s) || (e && e.includes(s))))
          if (t.prototype) {
            lo(t.prototype, s).writable && (i.prototype[s] = t.prototype[s])
          } else i.prototype[s] = t[s]
      })
    }
  }
  function Zo() {
    return t => {
      ue.register(t)
    }
  }
  function $o() {
    return t => {
      _e.register(t)
    }
  }
  setTimeout(() => Ko(!0))
  const {
      copy: Jo,
      toInnerPoint: Qo,
      toOuterPoint: tr,
      scaleOfOuter: er,
      rotateOfOuter: ir,
      skewOfOuter: sr,
      multiplyParent: nr,
      divideParent: or,
      getLayout: rr
    } = tt,
    ar = {},
    { round: hr } = Math,
    lr = {
      updateAllMatrix(t, e, i) {
        if ((e && t.__hasAutoLayout && t.__layout.matrixChanged && (i = !0), ur(t, e, i), t.isBranch)) {
          const { children: s } = t
          for (let t = 0, n = s.length; t < n; t++) cr(s[t], e, i)
        }
      },
      updateMatrix(t, e, i) {
        const s = t.__layout
        e
          ? i && ((s.waitAutoLayout = !0), t.__hasAutoLayout && (s.matrixChanged = !1))
          : s.waitAutoLayout && (s.waitAutoLayout = !1),
          s.matrixChanged && t.__updateLocalMatrix(),
          s.waitAutoLayout || t.__updateWorldMatrix()
      },
      updateBounds(t) {
        const e = t.__layout
        e.boundsChanged && t.__updateLocalBounds(), e.waitAutoLayout || t.__updateWorldBounds()
      },
      updateAllWorldOpacity(t) {
        if ((t.__updateWorldOpacity(), t.isBranch)) {
          const { children: e } = t
          for (let t = 0, i = e.length; t < i; t++) pr(e[t])
        }
      },
      updateChange(t) {
        const e = t.__layout
        e.stateStyleChanged && t.updateState(), e.opacityChanged && pr(t), t.__updateChange()
      },
      updateAllChange(t) {
        if ((_r(t), t.isBranch)) {
          const { children: e } = t
          for (let t = 0, i = e.length; t < i; t++) gr(e[t])
        }
      },
      worldHittable(t) {
        for (; t; ) {
          if (!t.__.hittable) return !1
          t = t.parent
        }
        return !0
      },
      draggable: t => (t.draggable || t.editable) && t.hitSelf && !t.locked,
      copyCanvasByWorld(t, e, i, s, n, o) {
        s || (s = t.__nowWorld),
          t.__worldFlipped || w.fullImageShadow
            ? e.copyWorldByReset(i, s, t.__nowWorld, n, o)
            : e.copyWorldToInner(i, s, t.__layout.renderBounds, n)
      },
      moveWorld(t, e, i = 0, s, n) {
        const o = u(e) ? Object.assign({}, e) : { x: e, y: i }
        s ? tr(t.localTransform, o, o, !0) : t.parent && Qo(t.parent.scrollWorldTransform, o, o, !0), dr.moveLocal(t, o.x, o.y, n)
      },
      moveLocal(t, e, i = 0, s) {
        u(e) && ((i = e.y), (e = e.x)),
          (e += t.x),
          (i += t.y),
          t.leafer && t.leafer.config.pointSnap && ((e = hr(e)), (i = hr(i))),
          s ? t.animate({ x: e, y: i }, s) : ((t.x = e), (t.y = i))
      },
      zoomOfWorld(t, e, i, s, n, o) {
        dr.zoomOfLocal(t, fr(t, e), i, s, n, o)
      },
      zoomOfLocal(t, e, i, s = i, n, o) {
        const r = t.__localMatrix
        if ((h(s) || (s && (o = s), (s = i)), Jo(ar, r), er(ar, e, i, s), dr.hasHighPosition(t))) dr.setTransform(t, ar, n, o)
        else {
          const e = t.x + ar.e - r.e,
            a = t.y + ar.f - r.f
          o && !n
            ? t.animate({ x: e, y: a, scaleX: t.scaleX * i, scaleY: t.scaleY * s }, o)
            : ((t.x = e), (t.y = a), t.scaleResize(i, s, !0 !== n))
        }
      },
      rotateOfWorld(t, e, i, s) {
        dr.rotateOfLocal(t, fr(t, e), i, s)
      },
      rotateOfLocal(t, e, i, s) {
        const n = t.__localMatrix
        Jo(ar, n),
          ir(ar, e, i),
          dr.hasHighPosition(t)
            ? dr.setTransform(t, ar, !1, s)
            : t.set({ x: t.x + ar.e - n.e, y: t.y + ar.f - n.f, rotation: z.formatRotation(t.rotation + i) }, s)
      },
      skewOfWorld(t, e, i, s, n, o) {
        dr.skewOfLocal(t, fr(t, e), i, s, n, o)
      },
      skewOfLocal(t, e, i, s = 0, n, o) {
        Jo(ar, t.__localMatrix), sr(ar, e, i, s), dr.setTransform(t, ar, n, o)
      },
      transformWorld(t, e, i, s) {
        Jo(ar, t.worldTransform), nr(ar, e), t.parent && or(ar, t.parent.scrollWorldTransform), dr.setTransform(t, ar, i, s)
      },
      transform(t, e, i, s) {
        Jo(ar, t.localTransform), nr(ar, e), dr.setTransform(t, ar, i, s)
      },
      setTransform(t, e, i, s) {
        const n = t.__,
          o = n.origin && dr.getInnerOrigin(t, n.origin),
          r = rr(e, o, n.around && dr.getInnerOrigin(t, n.around))
        if ((dr.hasOffset(t) && ((r.x -= n.offsetX), (r.y -= n.offsetY)), i)) {
          const e = r.scaleX / t.scaleX,
            i = r.scaleY / t.scaleY
          if ((delete r.scaleX, delete r.scaleY, o)) {
            jt.scale(t.boxBounds, Math.abs(e), Math.abs(i))
            const s = dr.getInnerOrigin(t, n.origin)
            ut.move(r, o.x - s.x, o.y - s.y)
          }
          t.set(r), t.scaleResize(e, i, !1)
        } else t.set(r, s)
      },
      getFlipTransform(t, e) {
        const i = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 },
          s = 'x' === e ? 1 : -1
        return er(i, dr.getLocalOrigin(t, 'center'), -1 * s, 1 * s), i
      },
      getLocalOrigin: (t, e) => ut.tempToOuterOf(dr.getInnerOrigin(t, e), t.localTransform),
      getInnerOrigin(t, e) {
        const i = {}
        return Bt.toPoint(e, t.boxBounds, i), i
      },
      getRelativeWorld: (t, e, i) => (Jo(ar, t.worldTransform), or(ar, e.scrollWorldTransform), i ? ar : Object.assign({}, ar)),
      drop(t, e, i, s) {
        t.setTransform(dr.getRelativeWorld(t, e, !0), s), e.add(t, i)
      },
      hasHighPosition: t => t.origin || t.around || dr.hasOffset(t),
      hasOffset: t => t.offsetX || t.offsetY,
      hasParent(t, e) {
        if (!e) return !1
        for (; t; ) {
          if (e === t) return !0
          t = t.parent
        }
      },
      animateMove(t, e, i = 0.3) {
        if (e.x || e.y)
          if (Math.abs(e.x) < 1 && Math.abs(e.y) < 1) t.move(e)
          else {
            const s = e.x * i,
              n = e.y * i
            ;(e.x -= s), (e.y -= n), t.move(s, n), w.requestRender(() => dr.animateMove(t, e, i))
          }
      }
    },
    dr = lr,
    { updateAllMatrix: cr, updateMatrix: ur, updateAllWorldOpacity: pr, updateAllChange: gr, updateChange: _r } = dr
  function fr(t, e) {
    return t.updateLayout(), t.parent ? ut.tempToInnerOf(e, t.parent.scrollWorldTransform) : e
  }
  const mr = {
    worldBounds: t => t.__world,
    localBoxBounds: t => (t.__.eraser || 0 === t.__.visible ? null : t.__local || t.__layout),
    localStrokeBounds: t => (t.__.eraser || 0 === t.__.visible ? null : t.__layout.localStrokeBounds),
    localRenderBounds: t => (t.__.eraser || 0 === t.__.visible ? null : t.__layout.localRenderBounds),
    maskLocalBoxBounds: (t, e) => vr(t, e) && t.__localBoxBounds,
    maskLocalStrokeBounds: (t, e) => vr(t, e) && t.__layout.localStrokeBounds,
    maskLocalRenderBounds: (t, e) => vr(t, e) && t.__layout.localRenderBounds,
    excludeRenderBounds: (t, e) =>
      !(!e.bounds || e.bounds.hit(t.__world, e.matrix)) || !(!e.hideBounds || !e.hideBounds.includes(t.__world, e.matrix))
  }
  let yr
  function vr(t, e) {
    return e || (yr = 0), t.__.mask && (yr = 1), yr < 0 ? null : (yr && (yr = -1), !0)
  }
  const { updateBounds: wr } = lr,
    xr = {
      sort: (t, e) => (t.__.zIndex === e.__.zIndex ? t.__tempNumber - e.__tempNumber : t.__.zIndex - e.__.zIndex),
      pushAllChildBranch(t, e) {
        if (((t.__tempNumber = 1), t.__.__childBranchNumber)) {
          const { children: i } = t
          for (let s = 0, n = i.length; s < n; s++) (t = i[s]).isBranch && ((t.__tempNumber = 1), e.add(t), br(t, e))
        }
      },
      pushAllParent(t, e) {
        const { keys: i } = e
        if (i) for (; t.parent && n(i[t.parent.innerId]); ) e.add(t.parent), (t = t.parent)
        else for (; t.parent; ) e.add(t.parent), (t = t.parent)
      },
      pushAllBranchStack(t, e) {
        let i = e.length
        const { children: s } = t
        for (let t = 0, i = s.length; t < i; t++) s[t].isBranch && e.push(s[t])
        for (let t = i, s = e.length; t < s; t++) Er(e[t], e)
      },
      updateBounds(t, e) {
        const i = [t]
        Er(t, i), Tr(i, e)
      },
      updateBoundsByBranchStack(t, e) {
        let i, s
        for (let n = t.length - 1; n > -1; n--) {
          ;(i = t[n]), (s = i.children)
          for (let t = 0, e = s.length; t < e; t++) wr(s[t])
          ;(e && e === i) || wr(i)
        }
      },
      move(t, e, i) {
        let s
        const { children: n } = t
        for (let o = 0, r = n.length; o < r; o++)
          (s = (t = n[o]).__world), (s.e += e), (s.f += i), (s.x += e), (s.y += i), t.isBranch && Sr(t, e, i)
      },
      scale(t, e, i, s, n, o, r) {
        let a
        const { children: h } = t,
          l = s - 1,
          d = n - 1
        for (let c = 0, u = h.length; c < u; c++)
          (a = (t = h[c]).__world),
            (a.a *= s),
            (a.d *= n),
            (a.b || a.c) && ((a.b *= s), (a.c *= n)),
            a.e === a.x && a.f === a.y
              ? ((a.x = a.e += (a.e - o) * l + e), (a.y = a.f += (a.f - r) * d + i))
              : ((a.e += (a.e - o) * l + e), (a.f += (a.f - r) * d + i), (a.x += (a.x - o) * l + e), (a.y += (a.y - r) * d + i)),
            (a.width *= s),
            (a.height *= n),
            (a.scaleX *= s),
            (a.scaleY *= n),
            t.isBranch && kr(t, e, i, s, n, o, r)
      }
    },
    { pushAllChildBranch: br, pushAllBranchStack: Er, updateBoundsByBranchStack: Tr, move: Sr, scale: kr } = xr,
    Br = {
      run(t) {
        if (t && t.length) {
          const e = t.length
          for (let i = 0; i < e; i++) t[i]()
          t.length === e ? (t.length = 0) : t.splice(0, e)
        }
      }
    },
    { getRelativeWorld: Pr, updateBounds: Lr } = lr,
    { toOuterOf: Rr, getPoints: Cr, copy: Or } = jt,
    Ar = '_localContentBounds',
    Dr = '_worldContentBounds',
    Mr = '_worldBoxBounds',
    Ir = '_worldStrokeBounds'
  class Fr {
    get contentBounds() {
      return this._contentBounds || this.boxBounds
    }
    set contentBounds(t) {
      this._contentBounds = t
    }
    get strokeBounds() {
      return this._strokeBounds || this.boxBounds
    }
    get renderBounds() {
      return this._renderBounds || this.boxBounds
    }
    set renderBounds(t) {
      this._renderBounds = t
    }
    get localContentBounds() {
      return Rr(this.contentBounds, this.leaf.__localMatrix, this[Ar] || (this[Ar] = {})), this[Ar]
    }
    get localStrokeBounds() {
      return this._localStrokeBounds || this
    }
    get localRenderBounds() {
      return this._localRenderBounds || this
    }
    get worldContentBounds() {
      return Rr(this.contentBounds, this.leaf.__world, this[Dr] || (this[Dr] = {})), this[Dr]
    }
    get worldBoxBounds() {
      return Rr(this.boxBounds, this.leaf.__world, this[Mr] || (this[Mr] = {})), this[Mr]
    }
    get worldStrokeBounds() {
      return Rr(this.strokeBounds, this.leaf.__world, this[Ir] || (this[Ir] = {})), this[Ir]
    }
    get a() {
      return 1
    }
    get b() {
      return 0
    }
    get c() {
      return 0
    }
    get d() {
      return 1
    }
    get e() {
      return this.leaf.__.x
    }
    get f() {
      return this.leaf.__.y
    }
    get x() {
      return this.e + this.boxBounds.x
    }
    get y() {
      return this.f + this.boxBounds.y
    }
    get width() {
      return this.boxBounds.width
    }
    get height() {
      return this.boxBounds.height
    }
    constructor(t) {
      ;(this.leaf = t),
        this.leaf.__local && (this._localRenderBounds = this._localStrokeBounds = this.leaf.__local),
        t.__world && ((this.boxBounds = { x: 0, y: 0, width: 0, height: 0 }), this.boxChange(), this.matrixChange())
    }
    createLocal() {
      const t = (this.leaf.__local = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0, x: 0, y: 0, width: 0, height: 0 })
      this._localStrokeBounds || (this._localStrokeBounds = t), this._localRenderBounds || (this._localRenderBounds = t)
    }
    update() {
      const { leaf: t } = this,
        { leafer: e } = t
      if (t.isApp) return Lr(t)
      if (e) e.ready ? e.watcher.changed && e.layouter.layout() : e.start()
      else {
        let e = t
        for (; e.parent && !e.parent.leafer; ) e = e.parent
        const i = e
        if (i.__fullLayouting) return
        ;(i.__fullLayouting = !0), w.layout(i), delete i.__fullLayouting
      }
    }
    getTransform(t = 'world') {
      this.update()
      const { leaf: e } = this
      switch (t) {
        case 'world':
          return e.__world
        case 'local':
          return e.__localMatrix
        case 'inner':
          return tt.defaultMatrix
        case 'page':
          t = e.zoomLayer
        default:
          return Pr(e, t)
      }
    }
    getBounds(t, e = 'world') {
      switch ((this.update(), e)) {
        case 'world':
          return this.getWorldBounds(t)
        case 'local':
          return this.getLocalBounds(t)
        case 'inner':
          return this.getInnerBounds(t)
        case 'page':
          e = this.leaf.zoomLayer
        default:
          return new $t(this.getInnerBounds(t)).toOuterOf(this.getTransform(e))
      }
    }
    getInnerBounds(t = 'box') {
      switch (t) {
        case 'render':
          return this.renderBounds
        case 'content':
          if (this.contentBounds) return this.contentBounds
        case 'box':
          return this.boxBounds
        case 'stroke':
          return this.strokeBounds
      }
    }
    getLocalBounds(t = 'box') {
      switch (t) {
        case 'render':
          return this.localRenderBounds
        case 'stroke':
          return this.localStrokeBounds
        case 'content':
          if (this.contentBounds) return this.localContentBounds
        case 'box':
          return this.leaf.__localBoxBounds
      }
    }
    getWorldBounds(t = 'box') {
      switch (t) {
        case 'render':
          return this.leaf.__world
        case 'stroke':
          return this.worldStrokeBounds
        case 'content':
          if (this.contentBounds) return this.worldContentBounds
        case 'box':
          return this.worldBoxBounds
      }
    }
    getLayoutBounds(t, e = 'world', i) {
      const { leaf: s } = this
      let n,
        o,
        r,
        a = this.getInnerBounds(t)
      switch (e) {
        case 'world':
          ;(n = s.getWorldPoint(a)), (o = s.__world)
          break
        case 'local':
          const { scaleX: t, scaleY: i, rotation: h, skewX: l, skewY: d } = s.__
          ;(r = { scaleX: t, scaleY: i, rotation: h, skewX: l, skewY: d }), (n = s.getLocalPointByInner(a))
          break
        case 'inner':
          ;(n = a), (o = tt.defaultMatrix)
          break
        case 'page':
          e = s.zoomLayer
        default:
          ;(n = s.getWorldPoint(a, e)), (o = Pr(s, e, !0))
      }
      if ((r || (r = tt.getLayout(o)), Or(r, a), ut.copy(r, n), i)) {
        const { scaleX: t, scaleY: e } = r,
          i = Math.abs(t),
          s = Math.abs(e)
        ;(1 === i && 1 === s) || ((r.scaleX /= i), (r.scaleY /= s), (r.width *= i), (r.height *= s))
      }
      return r
    }
    getLayoutPoints(t, e = 'world') {
      const { leaf: i } = this,
        s = Cr(this.getInnerBounds(t))
      let o
      switch (e) {
        case 'world':
          o = null
          break
        case 'local':
          o = i.parent
          break
        case 'inner':
          break
        case 'page':
          e = i.zoomLayer
        default:
          o = e
      }
      return n(o) || s.forEach(t => i.innerToWorld(t, null, !1, o)), s
    }
    shrinkContent() {
      const { x: t, y: e, width: i, height: s } = this.boxBounds
      this._contentBounds = { x: t, y: e, width: i, height: s }
    }
    spreadStroke() {
      const { x: t, y: e, width: i, height: s } = this.strokeBounds
      ;(this._strokeBounds = { x: t, y: e, width: i, height: s }),
        (this._localStrokeBounds = { x: t, y: e, width: i, height: s }),
        this.renderSpread || this.spreadRenderCancel()
    }
    spreadRender() {
      const { x: t, y: e, width: i, height: s } = this.renderBounds
      ;(this._renderBounds = { x: t, y: e, width: i, height: s }), (this._localRenderBounds = { x: t, y: e, width: i, height: s })
    }
    shrinkContentCancel() {
      this._contentBounds = void 0
    }
    spreadStrokeCancel() {
      const t = this.renderBounds === this.strokeBounds
      ;(this._strokeBounds = this.boxBounds),
        (this._localStrokeBounds = this.leaf.__localBoxBounds),
        t && this.spreadRenderCancel()
    }
    spreadRenderCancel() {
      ;(this._renderBounds = this._strokeBounds), (this._localRenderBounds = this._localStrokeBounds)
    }
    boxChange() {
      ;(this.boxChanged = !0),
        this.localBoxChanged ? this.boundsChanged || (this.boundsChanged = !0) : this.localBoxChange(),
        (this.hitCanvasChanged = !0)
    }
    localBoxChange() {
      ;(this.localBoxChanged = !0), (this.boundsChanged = !0)
    }
    strokeChange() {
      ;(this.strokeChanged = !0),
        this.strokeSpread || (this.strokeSpread = 1),
        (this.boundsChanged = !0),
        (this.hitCanvasChanged = !0)
    }
    renderChange() {
      ;(this.renderChanged = !0), this.renderSpread || (this.renderSpread = 1), (this.boundsChanged = !0)
    }
    scaleChange() {
      ;(this.scaleChanged = !0), this._scaleOrRotationChange()
    }
    rotationChange() {
      ;(this.rotationChanged = !0), (this.affectRotation = !0), this._scaleOrRotationChange()
    }
    _scaleOrRotationChange() {
      ;(this.affectScaleOrRotation = !0), this.matrixChange(), this.leaf.__local || this.createLocal()
    }
    matrixChange() {
      ;(this.matrixChanged = !0), this.localBoxChanged ? this.boundsChanged || (this.boundsChanged = !0) : this.localBoxChange()
    }
    surfaceChange() {
      this.surfaceChanged = !0
    }
    opacityChange() {
      ;(this.opacityChanged = !0), this.surfaceChanged || this.surfaceChange()
    }
    childrenSortChange() {
      this.childrenSortChanged || ((this.childrenSortChanged = this.affectChildrenSort = !0), this.leaf.forceUpdate('surface'))
    }
    destroy() {}
  }
  class Wr {
    constructor(t, e) {
      ;(this.bubbles = !1), (this.type = t), e && (this.target = e)
    }
    stopDefault() {
      ;(this.isStopDefault = !0), this.origin && w.event.stopDefault(this.origin)
    }
    stopNow() {
      ;(this.isStopNow = !0), (this.isStop = !0), this.origin && w.event.stopNow(this.origin)
    }
    stop() {
      ;(this.isStop = !0), this.origin && w.event.stop(this.origin)
    }
  }
  class zr extends Wr {
    constructor(t, e, i) {
      super(t, e), (this.parent = i), (this.child = e)
    }
  }
  ;(zr.ADD = 'child.add'),
    (zr.REMOVE = 'child.remove'),
    (zr.CREATED = 'created'),
    (zr.MOUNTED = 'mounted'),
    (zr.UNMOUNTED = 'unmounted'),
    (zr.DESTROY = 'destroy')
  const Ur = 'property.scroll'
  class Hr extends Wr {
    constructor(t, e, i, s, n) {
      super(t, e), (this.attrName = i), (this.oldValue = s), (this.newValue = n)
    }
  }
  ;(Hr.CHANGE = 'property.change'), (Hr.LEAFER_CHANGE = 'property.leafer_change'), (Hr.SCROLL = Ur)
  const Nr = { scrollX: Ur, scrollY: Ur }
  class Yr extends Wr {
    constructor(t, e) {
      super(t), Object.assign(this, e)
    }
  }
  ;(Yr.LOAD = 'image.load'), (Yr.LOADED = 'image.loaded'), (Yr.ERROR = 'image.error')
  class Xr extends Wr {
    static checkHas(t, e, i) {
      'on' === i
        ? e === Kr
          ? (t.__hasWorldEvent = !0)
          : (t.__hasLocalEvent = !0)
        : ((t.__hasLocalEvent = t.hasEvent(Vr) || t.hasEvent(Gr) || t.hasEvent(jr)), (t.__hasWorldEvent = t.hasEvent(Kr)))
    }
    static emitLocal(t) {
      if (t.leaferIsReady) {
        const { resized: e } = t.__layout
        'local' !== e && (t.emit(Vr, t), 'inner' === e && t.emit(Gr, t)), t.emit(jr, t)
      }
    }
    static emitWorld(t) {
      t.leaferIsReady && t.emit(Kr, this)
    }
  }
  ;(Xr.RESIZE = 'bounds.resize'), (Xr.INNER = 'bounds.inner'), (Xr.LOCAL = 'bounds.local'), (Xr.WORLD = 'bounds.world')
  const { RESIZE: Vr, INNER: Gr, LOCAL: jr, WORLD: Kr } = Xr,
    qr = {}
  ;[Vr, Gr, jr, Kr].forEach(t => (qr[t] = 1))
  class Zr extends Wr {
    get bigger() {
      if (!this.old) return !0
      const { width: t, height: e } = this.old
      return this.width >= t && this.height >= e
    }
    get smaller() {
      return !this.bigger
    }
    get samePixelRatio() {
      return !this.old || this.pixelRatio === this.old.pixelRatio
    }
    constructor(t, e) {
      u(t) ? (super(Zr.RESIZE), Object.assign(this, t)) : super(t), (this.old = e)
    }
    static isResizing(t) {
      return this.resizingKeys && !n(this.resizingKeys[t.innerId])
    }
  }
  Zr.RESIZE = 'resize'
  class $r extends Wr {
    constructor(t, e) {
      super(t), (this.data = e)
    }
  }
  ;($r.REQUEST = 'watch.request'), ($r.DATA = 'watch.data')
  class Jr extends Wr {
    constructor(t, e, i) {
      super(t), e && ((this.data = e), (this.times = i))
    }
  }
  ;(Jr.REQUEST = 'layout.request'),
    (Jr.START = 'layout.start'),
    (Jr.BEFORE = 'layout.before'),
    (Jr.LAYOUT = 'layout'),
    (Jr.AFTER = 'layout.after'),
    (Jr.AGAIN = 'layout.again'),
    (Jr.END = 'layout.end')
  class Qr extends Wr {
    constructor(t, e, i, s) {
      super(t), e && (this.times = e), i && ((this.renderBounds = i), (this.renderOptions = s))
    }
  }
  ;(Qr.REQUEST = 'render.request'),
    (Qr.CHILD_START = 'render.child_start'),
    (Qr.CHILD_END = 'render.child_end'),
    (Qr.START = 'render.start'),
    (Qr.BEFORE = 'render.before'),
    (Qr.RENDER = 'render'),
    (Qr.AFTER = 'render.after'),
    (Qr.AGAIN = 'render.again'),
    (Qr.END = 'render.end'),
    (Qr.NEXT = 'render.next')
  class ta extends Wr {}
  ;(ta.START = 'leafer.start'),
    (ta.BEFORE_READY = 'leafer.before_ready'),
    (ta.READY = 'leafer.ready'),
    (ta.AFTER_READY = 'leafer.after_ready'),
    (ta.VIEW_READY = 'leafer.view_ready'),
    (ta.VIEW_COMPLETED = 'leafer.view_completed'),
    (ta.STOP = 'leafer.stop'),
    (ta.RESTART = 'leafer.restart'),
    (ta.END = 'leafer.end'),
    (ta.UPDATE_MODE = 'leafer.update_mode'),
    (ta.TRANSFORM = 'leafer.transform'),
    (ta.MOVE = 'leafer.move'),
    (ta.SCALE = 'leafer.scale'),
    (ta.ROTATE = 'leafer.rotate'),
    (ta.SKEW = 'leafer.skew')
  const { MOVE: ea, SCALE: ia, ROTATE: sa, SKEW: na } = ta,
    oa = { x: ea, y: ea, scaleX: ia, scaleY: ia, rotation: sa, skewX: na, skewY: na },
    ra = {}
  class aa {
    set event(t) {
      this.on(t)
    }
    on(t, e, i) {
      if (!e) {
        let e
        if (c(t)) t.forEach(t => this.on(t[0], t[1], t[2]))
        else for (let i in t) c((e = t[i])) ? this.on(i, e[0], e[1]) : this.on(i, e)
        return
      }
      let s, n, o
      i && ('once' === i ? (n = !0) : 'boolean' == typeof i ? (s = i) : ((s = i.capture), (n = i.once)))
      const a = ha(this, s, !0),
        h = r(t) ? t.split(' ') : t,
        l = n ? { listener: e, once: n } : { listener: e }
      h.forEach(t => {
        t &&
          ((o = a[t]),
          o ? -1 === o.findIndex(t => t.listener === e) && o.push(l) : (a[t] = [l]),
          qr[t] && Xr.checkHas(this, t, 'on'))
      })
    }
    off(t, e, i) {
      if (t) {
        const s = r(t) ? t.split(' ') : t
        if (e) {
          let t, n, o
          i && (t = 'boolean' == typeof i ? i : 'once' !== i && i.capture)
          const r = ha(this, t)
          s.forEach(t => {
            t &&
              ((n = r[t]),
              n &&
                ((o = n.findIndex(t => t.listener === e)),
                o > -1 && n.splice(o, 1),
                n.length || delete r[t],
                qr[t] && Xr.checkHas(this, t, 'off')))
          })
        } else {
          const { __bubbleMap: t, __captureMap: e } = this
          s.forEach(i => {
            t && delete t[i], e && delete e[i]
          })
        }
      } else this.__bubbleMap = this.__captureMap = void 0
    }
    on_(t, e, i, s) {
      return (
        e
          ? this.on(t, i ? (e = e.bind(i)) : e, s)
          : c(t) && t.forEach(t => this.on(t[0], t[2] ? (t[1] = t[1].bind(t[2])) : t[1], t[3])),
        { type: t, current: this, listener: e, options: s }
      )
    }
    off_(t) {
      if (!t) return
      const e = c(t) ? t : [t]
      e.forEach(t => {
        t &&
          (t.listener
            ? t.current.off(t.type, t.listener, t.options)
            : c(t.type) && t.type.forEach(e => t.current.off(e[0], e[1], e[3])))
      }),
        (e.length = 0)
    }
    once(t, e, i, s) {
      if (!e) return c(t) && t.forEach(t => this.once(t[0], t[1], t[2], t[3]))
      u(i) ? (e = e.bind(i)) : (s = i), this.on(t, e, { once: !0, capture: s })
    }
    emit(t, e, i) {
      !e && _e.has(t) && (e = _e.get(t, { type: t, target: this, current: this }))
      const s = ha(this, i)[t]
      if (s) {
        let n
        for (
          let o = 0, r = s.length;
          o < r && !((n = s[o]) && (n.listener(e), n.once && (this.off(t, n.listener, i), o--, r--), e && e.isStopNow));
          o++
        );
      }
      this.syncEventer && this.syncEventer.emitEvent(e, i)
    }
    emitEvent(t, e) {
      ;(t.current = this), this.emit(t.type, t, e)
    }
    hasEvent(t, e) {
      if (this.syncEventer && this.syncEventer.hasEvent(t, e)) return !0
      const { __bubbleMap: i, __captureMap: s } = this,
        o = i && i[t],
        r = s && s[t]
      return !!(n(e) ? o || r : e ? r : o)
    }
    destroy() {
      this.__captureMap = this.__bubbleMap = this.syncEventer = null
    }
  }
  function ha(t, e, i) {
    if (e) {
      const { __captureMap: e } = t
      return e || (i ? (t.__captureMap = {}) : ra)
    }
    {
      const { __bubbleMap: e } = t
      return e || (i ? (t.__bubbleMap = {}) : ra)
    }
  }
  const { on: la, on_: da, off: ca, off_: ua, once: pa, emit: ga, emitEvent: _a, hasEvent: fa, destroy: ma } = aa.prototype,
    ya = { on: la, on_: da, off: ca, off_: ua, once: pa, emit: ga, emitEvent: _a, hasEvent: fa, destroyEventer: ma },
    va = ie.get('setAttr'),
    wa = {
      __setAttr(t, e, i) {
        if (this.leaferIsCreated) {
          const s = this.__.__getInput(t)
          if ((!i || a(e) || n(e) || (va.warn(this.innerName, t, e), (e = void 0)), u(e) || s !== e)) {
            if ((this.__realSetAttr(t, e), this.isLeafer)) {
              this.emitEvent(new Hr(Hr.LEAFER_CHANGE, this, t, s, e))
              const i = oa[t]
              i && (this.emitEvent(new ta(i, this)), this.emitEvent(new ta(ta.TRANSFORM, this)))
            }
            this.emitPropertyEvent(Hr.CHANGE, t, s, e)
            const i = Nr[t]
            return i && this.emitPropertyEvent(i, t, s, e), !0
          }
          return !1
        }
        return this.__realSetAttr(t, e), !0
      },
      emitPropertyEvent(t, e, i, s) {
        const n = new Hr(t, this, e, i, s)
        this.isLeafer || (this.hasEvent(t) && this.emitEvent(n)), this.leafer.emitEvent(n)
      },
      __realSetAttr(t, e) {
        const i = this.__
        ;(i[t] = e),
          this.__proxyData && this.setProxyAttr(t, e),
          i.normalStyle && (this.lockNormalStyle || n(i.normalStyle[t]) || (i.normalStyle[t] = e))
      },
      __getAttr(t) {
        return this.__proxyData ? this.getProxyAttr(t) : this.__.__get(t)
      }
    },
    { setLayout: xa, multiplyParent: ba, translateInner: Ea, defaultWorld: Ta } = tt,
    { toPoint: Sa, tempPoint: ka } = Bt,
    Ba = {
      __updateWorldMatrix() {
        const { parent: t, __layout: e, __world: i, __scrollWorld: s, __: n } = this
        ba(this.__local || e, t ? t.__scrollWorld || t.__world : Ta, i, !!e.affectScaleOrRotation, n),
          s && Ea(Object.assign(s, i), n.scrollX, n.scrollY)
      },
      __updateLocalMatrix() {
        if (this.__local) {
          const t = this.__layout,
            e = this.__local,
            i = this.__
          t.affectScaleOrRotation &&
            ((t.scaleChanged && (t.resized || (t.resized = 'scale'))) || t.rotationChanged) &&
            (xa(e, i, null, null, t.affectRotation), (t.scaleChanged = t.rotationChanged = void 0)),
            (e.e = i.x + i.offsetX),
            (e.f = i.y + i.offsetY),
            (i.around || i.origin) && (Sa(i.around || i.origin, t.boxBounds, ka), Ea(e, -ka.x, -ka.y, !i.around))
        }
        this.__layout.matrixChanged = void 0
      }
    },
    { updateMatrix: Pa, updateAllMatrix: La } = lr,
    { updateBounds: Ra } = xr,
    { toOuterOf: Ca, copyAndSpread: Oa, copy: Aa } = jt,
    { toBounds: Da } = Fn,
    Ma = {
      __updateWorldBounds() {
        const { __layout: t, __world: e } = this
        Ca(t.renderBounds, e, e),
          t.resized &&
            ('inner' === t.resized && this.__onUpdateSize(), this.__hasLocalEvent && Xr.emitLocal(this), (t.resized = void 0)),
          this.__hasWorldEvent && Xr.emitWorld(this)
      },
      __updateLocalBounds() {
        const t = this.__layout
        t.boxChanged &&
          (this.__.__pathInputed || this.__updatePath(),
          this.__updateRenderPath(),
          this.__updateBoxBounds(),
          (t.resized = 'inner')),
          t.localBoxChanged &&
            (this.__local && this.__updateLocalBoxBounds(),
            (t.localBoxChanged = void 0),
            t.strokeSpread && (t.strokeChanged = !0),
            t.renderSpread && (t.renderChanged = !0),
            this.parent && this.parent.__layout.boxChange()),
          (t.boxChanged = void 0),
          t.strokeChanged &&
            ((t.strokeSpread = this.__updateStrokeSpread()),
            t.strokeSpread
              ? (t.strokeBounds === t.boxBounds && t.spreadStroke(),
                this.__updateStrokeBounds(),
                this.__updateLocalStrokeBounds())
              : t.spreadStrokeCancel(),
            (t.strokeChanged = void 0),
            (t.renderSpread || t.strokeSpread !== t.strokeBoxSpread) && (t.renderChanged = !0),
            this.parent && this.parent.__layout.strokeChange(),
            (t.resized = 'inner')),
          t.renderChanged &&
            ((t.renderSpread = this.__updateRenderSpread()),
            t.renderSpread
              ? ((t.renderBounds !== t.boxBounds && t.renderBounds !== t.strokeBounds) || t.spreadRender(),
                this.__updateRenderBounds(),
                this.__updateLocalRenderBounds())
              : t.spreadRenderCancel(),
            (t.renderChanged = void 0),
            this.parent && this.parent.__layout.renderChange()),
          t.resized || (t.resized = 'local'),
          (t.boundsChanged = void 0)
      },
      __updateLocalBoxBounds() {
        this.__hasMotionPath && this.__updateMotionPath(),
          this.__hasAutoLayout && this.__updateAutoLayout(),
          Ca(this.__layout.boxBounds, this.__local, this.__local)
      },
      __updateLocalStrokeBounds() {
        Ca(this.__layout.strokeBounds, this.__localMatrix, this.__layout.localStrokeBounds)
      },
      __updateLocalRenderBounds() {
        Ca(this.__layout.renderBounds, this.__localMatrix, this.__layout.localRenderBounds)
      },
      __updateBoxBounds(t, e) {
        const i = this.__layout.boxBounds,
          s = this.__
        s.__usePathBox ? Da(s.path, i) : ((i.x = 0), (i.y = 0), (i.width = s.width), (i.height = s.height))
      },
      __updateAutoLayout() {
        ;(this.__layout.matrixChanged = !0),
          this.isBranch
            ? (this.__extraUpdate(),
              this.__.flow
                ? (this.__layout.boxChanged && this.__updateFlowLayout(),
                  La(this),
                  Ra(this, this),
                  this.__.__autoSide && this.__updateBoxBounds(!0))
                : (La(this), Ra(this, this)))
            : Pa(this)
      },
      __updateNaturalSize() {
        const { __: t, __layout: e } = this
        ;(t.__naturalWidth = e.boxBounds.width), (t.__naturalHeight = e.boxBounds.height)
      },
      __updateStrokeBounds(t) {
        const e = this.__layout
        Oa(e.strokeBounds, e.boxBounds, e.strokeBoxSpread)
      },
      __updateRenderBounds(t) {
        const e = this.__layout,
          { renderSpread: i } = e
        h(i) && i <= 0 ? Aa(e.renderBounds, e.strokeBounds) : Oa(e.renderBounds, e.boxBounds, i)
      }
    },
    Ia = {
      __render(t, e) {
        if (e.shape) return this.__renderShape(t, e)
        if ((!e.cellList || e.cellList.has(this)) && this.__worldOpacity) {
          const i = this.__
          if (i.bright && !e.topRendering) return e.topList.add(this)
          if (
            (t.setWorld((this.__nowWorld = this.__getNowWorld(e))),
            (t.opacity = e.dimOpacity && !i.dimskip ? i.opacity * e.dimOpacity : i.opacity),
            this.__.__single)
          ) {
            if ('path' === i.eraser) return this.__renderEraser(t, e)
            const s = t.getSameCanvas(!0, !0)
            this.__draw(s, e, t), lr.copyCanvasByWorld(this, t, s, this.__nowWorld, i.__blendMode, !0), s.recycle(this.__nowWorld)
          } else this.__draw(t, e)
          ie.showBounds && ie.drawBounds(this, t, e)
        }
      },
      __renderShape(t, e) {
        this.__worldOpacity && (t.setWorld((this.__nowWorld = this.__getNowWorld(e))), this.__drawShape(t, e))
      },
      __clip(t, e) {
        this.__worldOpacity && (t.setWorld((this.__nowWorld = this.__getNowWorld(e))), this.__drawRenderPath(t), t.clipUI(this))
      },
      __updateWorldOpacity() {
        ;(this.__worldOpacity = this.__.visible
          ? this.parent
            ? this.parent.__worldOpacity * this.__.opacity
            : this.__.opacity
          : 0),
          this.__layout.opacityChanged && (this.__layout.opacityChanged = !1)
      }
    },
    { excludeRenderBounds: Fa } = mr,
    Wa = {
      __updateChange() {
        const { __layout: t } = this
        t.childrenSortChanged && (this.__updateSortChildren(), (t.childrenSortChanged = !1)), this.__.__checkSingle()
      },
      __render(t, e) {
        if (((this.__nowWorld = this.__getNowWorld(e)), this.__worldOpacity)) {
          const i = this.__
          if (i.__useDim)
            if (i.dim) e.dimOpacity = !0 === i.dim ? 0.2 : i.dim
            else {
              if (i.bright && !e.topRendering) return e.topList.add(this)
              i.dimskip && e.dimOpacity && (e.dimOpacity = 0)
            }
          if (i.__single && !this.isBranchLeaf) {
            if ('path' === i.eraser) return this.__renderEraser(t, e)
            const s = t.getSameCanvas(!1, !0)
            this.__renderBranch(s, e)
            const n = this.__nowWorld
            ;(t.opacity = e.dimOpacity ? i.opacity * e.dimOpacity : i.opacity),
              t.copyWorldByReset(s, n, n, i.__blendMode, !0),
              s.recycle(n)
          } else this.__renderBranch(t, e)
        }
      },
      __renderBranch(t, e) {
        if (this.__hasMask) this.__renderMask(t, e)
        else {
          const { children: i } = this
          for (let s = 0, n = i.length; s < n; s++) Fa(i[s], e) || i[s].__render(t, e)
        }
      },
      __clip(t, e) {
        if (this.__worldOpacity) {
          const { children: i } = this
          for (let s = 0, n = i.length; s < n; s++) Fa(i[s], e) || i[s].__clip(t, e)
        }
      }
    },
    za = {},
    { LEAF: Ua, create: Ha } = b,
    { stintSet: Na } = _,
    { toInnerPoint: Ya, toOuterPoint: Xa, multiplyParent: Va } = tt,
    { toOuterOf: Ga } = jt,
    { copy: ja, move: Ka } = ut,
    {
      moveLocal: qa,
      zoomOfLocal: Za,
      rotateOfLocal: $a,
      skewOfLocal: Ja,
      moveWorld: Qa,
      zoomOfWorld: th,
      rotateOfWorld: eh,
      skewOfWorld: ih,
      transform: sh,
      transformWorld: nh,
      setTransform: oh,
      getFlipTransform: rh,
      getLocalOrigin: ah,
      getRelativeWorld: hh,
      drop: lh
    } = lr
  ;(t.Leaf = class {
    get tag() {
      return this.__tag
    }
    set tag(t) {}
    get __tag() {
      return 'Leaf'
    }
    get innerName() {
      return this.__.name || this.tag + this.innerId
    }
    get __DataProcessor() {
      return m
    }
    get __LayoutProcessor() {
      return Fr
    }
    get leaferIsCreated() {
      return this.leafer && this.leafer.created
    }
    get leaferIsReady() {
      return this.leafer && this.leafer.ready
    }
    get isLeafer() {
      return !1
    }
    get isBranch() {
      return !1
    }
    get isBranchLeaf() {
      return !1
    }
    get __localMatrix() {
      return this.__local || this.__layout
    }
    get __localBoxBounds() {
      return this.__local || this.__layout
    }
    get worldTransform() {
      return this.__layout.getTransform('world')
    }
    get localTransform() {
      return this.__layout.getTransform('local')
    }
    get scrollWorldTransform() {
      return this.updateLayout(), this.__scrollWorld || this.__world
    }
    get boxBounds() {
      return this.getBounds('box', 'inner')
    }
    get renderBounds() {
      return this.getBounds('render', 'inner')
    }
    get worldBoxBounds() {
      return this.getBounds('box')
    }
    get worldStrokeBounds() {
      return this.getBounds('stroke')
    }
    get worldRenderBounds() {
      return this.getBounds('render')
    }
    get worldOpacity() {
      return this.updateLayout(), this.__worldOpacity
    }
    get __worldFlipped() {
      return this.__world.scaleX < 0 || this.__world.scaleY < 0
    }
    get __onlyHitMask() {
      return this.__hasMask && !this.__.hitChildren
    }
    get __ignoreHitWorld() {
      return (this.__hasMask || this.__hasEraser) && this.__.hitChildren
    }
    get __inLazyBounds() {
      return this.leaferIsCreated && this.leafer.lazyBounds.hit(this.__world)
    }
    get pathInputed() {
      return this.__.__pathInputed
    }
    set event(t) {
      this.on(t)
    }
    constructor(t) {
      ;(this.innerId = Ha(Ua)), this.reset(t), this.__bubbleMap && this.__emitLifeEvent(zr.CREATED)
    }
    reset(t) {
      this.leafer && this.leafer.forceRender(this.__world),
        0 !== t &&
          ((this.__world = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0, x: 0, y: 0, width: 0, height: 0, scaleX: 1, scaleY: 1 }),
          null !== t && (this.__local = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0, x: 0, y: 0, width: 0, height: 0 })),
        (this.__worldOpacity = 1),
        (this.__ = new this.__DataProcessor(this)),
        (this.__layout = new this.__LayoutProcessor(this)),
        this.__level && this.resetCustom(),
        t && (t.__ && (t = t.toJSON()), t.children ? this.set(t) : Object.assign(this, t))
    }
    resetCustom() {
      ;(this.__hasMask = this.__hasEraser = null), this.forceUpdate()
    }
    waitParent(t, e) {
      e && (t = t.bind(e)), this.parent ? t() : this.on(zr.ADD, t, 'once')
    }
    waitLeafer(t, e) {
      e && (t = t.bind(e)), this.leafer ? t() : this.on(zr.MOUNTED, t, 'once')
    }
    nextRender(t, e, i) {
      this.leafer ? this.leafer.nextRender(t, e, i) : this.waitLeafer(() => this.leafer.nextRender(t, e, i))
    }
    removeNextRender(t) {
      this.nextRender(t, null, 'off')
    }
    __bindLeafer(t) {
      if (
        (this.isLeafer && null !== t && (t = this),
        this.leafer && !t && this.leafer.leafs--,
        (this.leafer = t),
        t
          ? (t.leafs++,
            (this.__level = this.parent ? this.parent.__level + 1 : 1),
            this.animation && this.__runAnimation('in'),
            this.__bubbleMap && this.__emitLifeEvent(zr.MOUNTED))
          : this.__emitLifeEvent(zr.UNMOUNTED),
        this.isBranch)
      ) {
        const { children: e } = this
        for (let i = 0, s = e.length; i < s; i++) e[i].__bindLeafer(t)
      }
    }
    set(t, e) {}
    get(t) {}
    setAttr(t, e) {
      this[t] = e
    }
    getAttr(t) {
      return this[t]
    }
    getComputedAttr(t) {
      return this.__[t]
    }
    toJSON(t) {
      return t && this.__layout.update(), this.__.__getInputData(null, t)
    }
    toString(t) {
      return JSON.stringify(this.toJSON(t))
    }
    toSVG() {}
    __SVG(t) {}
    toHTML() {}
    __setAttr(t, e) {
      return !0
    }
    __getAttr(t) {}
    setProxyAttr(t, e) {}
    getProxyAttr(t) {}
    find(t, e) {}
    findTag(t) {}
    findOne(t, e) {}
    findId(t) {}
    focus(t) {}
    updateState() {}
    updateLayout() {
      this.__layout.update()
    }
    forceUpdate(t) {
      n(t) ? (t = 'width') : 'surface' === t && (t = 'blendMode')
      const e = this.__.__getInput(t)
      ;(this.__[t] = n(e) ? null : void 0), (this[t] = e)
    }
    forceRender(t, e) {
      this.forceUpdate('surface')
    }
    __extraUpdate() {
      this.leaferIsReady && this.leafer.layouter.addExtra(this)
    }
    __updateWorldMatrix() {}
    __updateLocalMatrix() {}
    __updateWorldBounds() {}
    __updateLocalBounds() {}
    __updateLocalBoxBounds() {}
    __updateLocalStrokeBounds() {}
    __updateLocalRenderBounds() {}
    __updateBoxBounds(t, e) {}
    __updateContentBounds() {}
    __updateStrokeBounds(t) {}
    __updateRenderBounds(t) {}
    __updateAutoLayout() {}
    __updateFlowLayout() {}
    __updateNaturalSize() {}
    __updateStrokeSpread() {
      return 0
    }
    __updateRenderSpread() {
      return 0
    }
    __onUpdateSize() {}
    __updateEraser(t) {
      this.__hasEraser = !!t || this.children.some(t => t.__.eraser)
    }
    __renderEraser(t, e) {
      t.save(), this.__clip(t, e)
      const { renderBounds: i } = this.__layout
      t.clearRect(i.x, i.y, i.width, i.height), t.restore()
    }
    __updateMask(t) {
      this.__hasMask = this.children.some(t => t.__.mask && t.__.visible && t.__.opacity)
    }
    __renderMask(t, e) {}
    __getNowWorld(t) {
      if (t.matrix) {
        this.__cameraWorld || (this.__cameraWorld = {})
        const e = this.__cameraWorld,
          i = this.__world
        return (
          Va(i, t.matrix, e, void 0, i),
          Ga(this.__layout.renderBounds, e, e),
          Na(e, 'half', i.half),
          Na(e, 'ignorePixelSnap', i.ignorePixelSnap),
          e
        )
      }
      return this.__world
    }
    getClampRenderScale() {
      let { scaleX: t } = this.__nowWorld || this.__world
      return t < 0 && (t = -t), t > 1 ? t : 1
    }
    getRenderScaleData(t, e) {
      let { scaleX: i, scaleY: s } = so.patternLocked ? this.__world : this.__nowWorld
      return (
        t && (i < 0 && (i = -i), s < 0 && (s = -s)),
        (!0 === e || ('zoom-in' === e && i > 1 && s > 1)) && (i = s = 1),
        (za.scaleX = i),
        (za.scaleY = s),
        za
      )
    }
    getTransform(t) {
      return this.__layout.getTransform(t || 'local')
    }
    getBounds(t, e) {
      return this.__layout.getBounds(t, e)
    }
    getLayoutBounds(t, e, i) {
      return this.__layout.getLayoutBounds(t, e, i)
    }
    getLayoutPoints(t, e) {
      return this.__layout.getLayoutPoints(t, e)
    }
    getWorldBounds(t, e, i) {
      const s = e ? hh(this, e) : this.worldTransform,
        n = i ? t : {}
      return Ga(t, s, n), n
    }
    worldToLocal(t, e, i, s) {
      this.parent ? this.parent.worldToInner(t, e, i, s) : e && ja(e, t)
    }
    localToWorld(t, e, i, s) {
      this.parent ? this.parent.innerToWorld(t, e, i, s) : e && ja(e, t)
    }
    worldToInner(t, e, i, s) {
      s && (s.innerToWorld(t, e, i), (t = e || t)), Ya(this.scrollWorldTransform, t, e, i)
    }
    innerToWorld(t, e, i, s) {
      Xa(this.scrollWorldTransform, t, e, i), s && s.worldToInner(e || t, null, i)
    }
    getBoxPoint(t, e, i, s) {
      return this.getBoxPointByInner(this.getInnerPoint(t, e, i, s), null, null, !0)
    }
    getBoxPointByInner(t, e, i, s) {
      const n = s ? t : Object.assign({}, t),
        { x: o, y: r } = this.boxBounds
      return Ka(n, -o, -r), n
    }
    getInnerPoint(t, e, i, s) {
      const n = s ? t : {}
      return this.worldToInner(t, n, i, e), n
    }
    getInnerPointByBox(t, e, i, s) {
      const n = s ? t : Object.assign({}, t),
        { x: o, y: r } = this.boxBounds
      return Ka(n, o, r), n
    }
    getInnerPointByLocal(t, e, i, s) {
      return this.getInnerPoint(t, this.parent, i, s)
    }
    getLocalPoint(t, e, i, s) {
      const n = s ? t : {}
      return this.worldToLocal(t, n, i, e), n
    }
    getLocalPointByInner(t, e, i, s) {
      return this.getWorldPoint(t, this.parent, i, s)
    }
    getPagePoint(t, e, i, s) {
      return (this.leafer ? this.leafer.zoomLayer : this).getInnerPoint(t, e, i, s)
    }
    getWorldPoint(t, e, i, s) {
      const n = s ? t : {}
      return this.innerToWorld(t, n, i, e), n
    }
    getWorldPointByBox(t, e, i, s) {
      return this.getWorldPoint(this.getInnerPointByBox(t, null, null, s), e, i, !0)
    }
    getWorldPointByLocal(t, e, i, s) {
      const n = s ? t : {}
      return this.localToWorld(t, n, i, e), n
    }
    getWorldPointByPage(t, e, i, s) {
      return (this.leafer ? this.leafer.zoomLayer : this).getWorldPoint(t, e, i, s)
    }
    setTransform(t, e, i) {
      oh(this, t, e, i)
    }
    transform(t, e, i) {
      sh(this, t, e, i)
    }
    move(t, e, i) {
      qa(this, t, e, i)
    }
    moveInner(t, e, i) {
      Qa(this, t, e, !0, i)
    }
    scaleOf(t, e, i, s, n) {
      Za(this, ah(this, t), e, i, s, n)
    }
    rotateOf(t, e, i) {
      $a(this, ah(this, t), e, i)
    }
    skewOf(t, e, i, s, n) {
      Ja(this, ah(this, t), e, i, s, n)
    }
    transformWorld(t, e, i) {
      nh(this, t, e, i)
    }
    moveWorld(t, e, i) {
      Qa(this, t, e, !1, i)
    }
    scaleOfWorld(t, e, i, s, n) {
      th(this, t, e, i, s, n)
    }
    rotateOfWorld(t, e) {
      eh(this, t, e)
    }
    skewOfWorld(t, e, i, s, n) {
      ih(this, t, e, i, s, n)
    }
    flip(t, e) {
      sh(this, rh(this, t), !1, e)
    }
    scaleResize(t, e = t, i) {
      ;(this.scaleX *= t), (this.scaleY *= e)
    }
    __scaleResize(t, e) {}
    resizeWidth(t) {}
    resizeHeight(t) {}
    hit(t, e) {
      return !0
    }
    __hitWorld(t, e) {
      return !0
    }
    __hit(t, e) {
      return !0
    }
    __hitFill(t) {
      return !0
    }
    __hitStroke(t, e) {
      return !0
    }
    __hitPixel(t) {
      return !0
    }
    __drawHitPath(t) {}
    __updateHitCanvas() {}
    __render(t, e) {}
    __drawFast(t, e) {}
    __draw(t, e, i) {}
    __clip(t, e) {}
    __renderShape(t, e) {}
    __drawShape(t, e) {}
    __updateWorldOpacity() {}
    __updateChange() {}
    __drawPath(t) {}
    __drawRenderPath(t) {}
    __updatePath() {}
    __updateRenderPath() {}
    getMotionPathData() {
      return le.need('path')
    }
    getMotionPoint(t) {
      return le.need('path')
    }
    getMotionTotal() {
      return 0
    }
    __updateMotionPath() {}
    __runAnimation(t, e) {}
    __updateSortChildren() {}
    add(t, e) {}
    remove(t, e) {
      this.parent && this.parent.remove(this, e)
    }
    dropTo(t, e, i) {
      lh(this, t, e, i)
    }
    on(t, e, i) {}
    off(t, e, i) {}
    on_(t, e, i, s) {}
    off_(t) {}
    once(t, e, i, s) {}
    emit(t, e, i) {}
    emitEvent(t, e) {}
    hasEvent(t, e) {
      return !1
    }
    static changeAttr(t, e, i) {
      i ? this.addAttr(t, e, i) : No(this.prototype, t, e)
    }
    static addAttr(t, e, i, s) {
      i || (i = xo), i(e, s)(this.prototype, t)
    }
    __emitLifeEvent(t) {
      this.hasEvent(t) && this.emitEvent(new zr(t, this, this.parent))
    }
    destroy() {
      this.destroyed ||
        (this.parent && this.remove(),
        this.children && this.clear(),
        this.__emitLifeEvent(zr.DESTROY),
        this.__.destroy(),
        this.__layout.destroy(),
        this.destroyEventer(),
        (this.destroyed = !0))
    }
  }),
    (t.Leaf = ye([qo(wa), qo(Ba), qo(Ma), qo(ya), qo(Ia)], t.Leaf))
  const { setListWithFn: dh } = jt,
    { sort: ch } = xr,
    {
      localBoxBounds: uh,
      localStrokeBounds: ph,
      localRenderBounds: gh,
      maskLocalBoxBounds: _h,
      maskLocalStrokeBounds: fh,
      maskLocalRenderBounds: mh
    } = mr,
    yh = new ie('Branch')
  ;(t.Branch = class extends t.Leaf {
    __updateStrokeSpread() {
      const { children: t } = this
      for (let e = 0, i = t.length; e < i; e++) if (t[e].__layout.strokeSpread) return 1
      return 0
    }
    __updateRenderSpread() {
      const { children: t } = this
      for (let e = 0, i = t.length; e < i; e++) if (t[e].__layout.renderSpread) return 1
      return 0
    }
    __updateBoxBounds(t, e) {
      dh(e || this.__layout.boxBounds, this.children, this.__hasMask ? _h : uh)
    }
    __updateStrokeBounds(t) {
      dh(t || this.__layout.strokeBounds, this.children, this.__hasMask ? fh : ph)
    }
    __updateRenderBounds(t) {
      dh(t || this.__layout.renderBounds, this.children, this.__hasMask ? mh : gh)
    }
    __updateSortChildren() {
      let t
      const { children: e } = this
      if (e.length > 1) {
        for (let i = 0, s = e.length; i < s; i++) (e[i].__tempNumber = i), e[i].__.zIndex && (t = !0)
        e.sort(ch), (this.__layout.affectChildrenSort = t)
      }
    }
    add(t, e) {
      if (t === this || t.destroyed) return yh.warn('add self or destroyed')
      const i = n(e)
      if (!t.__) {
        if (c(t))
          return t.forEach(t => {
            this.add(t, e), i || e++
          })
        t = ue.get(t.tag, t)
      }
      t.parent && t.parent.remove(t),
        (t.parent = this),
        i ? this.children.push(t) : this.children.splice(e, 0, t),
        t.isBranch && (this.__.__childBranchNumber = (this.__.__childBranchNumber || 0) + 1)
      const s = t.__layout
      s.boxChanged || s.boxChange(),
        s.matrixChanged || s.matrixChange(),
        t.__bubbleMap && t.__emitLifeEvent(zr.ADD),
        this.leafer && (t.__bindLeafer(this.leafer), this.leafer.created && this.__emitChildEvent(zr.ADD, t)),
        this.__layout.affectChildrenSort && this.__layout.childrenSortChange()
    }
    addMany(...t) {
      this.add(t)
    }
    remove(t, e) {
      t
        ? t.__
          ? t.animationOut
            ? t.__runAnimation('out', () => this.__remove(t, e))
            : this.__remove(t, e)
          : this.find(t).forEach(t => this.remove(t, e))
        : n(t) && super.remove(null, e)
    }
    removeAll(t) {
      const { children: e } = this
      e.length &&
        ((this.children = []),
        this.__preRemove(),
        (this.__.__childBranchNumber = 0),
        e.forEach(e => {
          this.__realRemoveChild(e), t && e.destroy()
        }))
    }
    clear() {
      this.removeAll(!0)
    }
    __remove(t, e) {
      const i = this.children.indexOf(t)
      i > -1 &&
        (this.children.splice(i, 1),
        t.isBranch && (this.__.__childBranchNumber = (this.__.__childBranchNumber || 1) - 1),
        this.__preRemove(),
        this.__realRemoveChild(t),
        e && t.destroy())
    }
    __preRemove() {
      this.__hasMask && this.__updateMask(),
        this.__hasEraser && this.__updateEraser(),
        this.__layout.boxChange(),
        this.__layout.affectChildrenSort && this.__layout.childrenSortChange()
    }
    __realRemoveChild(t) {
      t.__emitLifeEvent(zr.REMOVE),
        (t.parent = null),
        this.leafer &&
          (t.__bindLeafer(null),
          this.leafer.created &&
            (this.__emitChildEvent(zr.REMOVE, t), this.leafer.hitCanvasManager && this.leafer.hitCanvasManager.clear()))
    }
    __emitChildEvent(t, e) {
      const i = new zr(t, e, this)
      this.hasEvent(t) && !this.isLeafer && this.emitEvent(i), this.leafer.emitEvent(i)
    }
  }),
    (t.Branch = ye([qo(Wa)], t.Branch))
  class vh {
    get length() {
      return this.list.length
    }
    constructor(t) {
      this.reset(), t && (c(t) ? this.addList(t) : this.add(t))
    }
    has(t) {
      return t && !n(this.keys[t.innerId])
    }
    indexAt(t) {
      return this.list[t]
    }
    indexOf(t) {
      const e = this.keys[t.innerId]
      return n(e) ? -1 : e
    }
    add(t) {
      const { list: e, keys: i } = this
      n(i[t.innerId]) && (e.push(t), (i[t.innerId] = e.length - 1))
    }
    addAt(t, e = 0) {
      const { keys: i } = this
      if (n(i[t.innerId])) {
        const { list: s } = this
        for (let t = e, n = s.length; t < n; t++) i[s[t].innerId]++
        0 === e ? s.unshift(t) : (e > s.length && (e = s.length), s.splice(e, 0, t)), (i[t.innerId] = e)
      }
    }
    addList(t) {
      for (let e = 0; e < t.length; e++) this.add(t[e])
    }
    remove(t) {
      const { list: e } = this
      let i
      for (let s = 0, o = e.length; s < o; s++)
        n(i) ? e[s].innerId === t.innerId && ((i = s), delete this.keys[t.innerId]) : (this.keys[e[s].innerId] = s - 1)
      n(i) || e.splice(i, 1)
    }
    sort(t) {
      const { list: e } = this
      t ? e.sort((t, e) => e.__level - t.__level) : e.sort((t, e) => t.__level - e.__level)
    }
    forEach(t) {
      this.list.forEach(t)
    }
    clone() {
      const t = new vh()
      return (t.list = [...this.list]), (t.keys = Object.assign({}, this.keys)), t
    }
    update() {
      this.keys = {}
      const { list: t, keys: e } = this
      for (let i = 0, s = t.length; i < s; i++) e[t[i].innerId] = i
    }
    reset() {
      ;(this.list = []), (this.keys = {})
    }
    destroy() {
      this.reset()
    }
  }
  class wh {
    get length() {
      return this._length
    }
    constructor(t) {
      ;(this._length = 0), this.reset(), t && (c(t) ? this.addList(t) : this.add(t))
    }
    has(t) {
      return !n(this.keys[t.innerId])
    }
    without(t) {
      return n(this.keys[t.innerId])
    }
    sort(t) {
      const { levels: e } = this
      t ? e.sort((t, e) => e - t) : e.sort((t, e) => t - e)
    }
    addList(t) {
      t.forEach(t => {
        this.add(t)
      })
    }
    add(t) {
      const { keys: e, levelMap: i } = this
      e[t.innerId] ||
        ((e[t.innerId] = 1),
        i[t.__level] ? i[t.__level].push(t) : ((i[t.__level] = [t]), this.levels.push(t.__level)),
        this._length++)
    }
    forEach(t) {
      let e
      this.levels.forEach(i => {
        e = this.levelMap[i]
        for (let i = 0, s = e.length; i < s; i++) t(e[i])
      })
    }
    reset() {
      ;(this.levelMap = {}), (this.keys = {}), (this.levels = []), (this._length = 0)
    }
    destroy() {
      this.levelMap = null
    }
  }
  const xh = ie.get('LeaferCanvas')
  class bh extends Ae {
    set zIndex(t) {
      const { style: e } = this.view
      ;(e.zIndex = t), this.setAbsolute(this.view)
    }
    set childIndex(t) {
      const { view: e, parentView: i } = this
      if (e && i) {
        const s = i.children[t]
        s ? (this.setAbsolute(s), i.insertBefore(e, s)) : i.appendChild(s)
      }
    }
    init() {
      const { config: t } = this,
        e = t.view || t.canvas
      e ? this.__createViewFrom(e) : this.__createView()
      const { style: i } = this.view
      if ((i.display || (i.display = 'block'), (this.parentView = this.view.parentElement), this.parentView)) {
        const t = this.parentView.style
        ;(t.webkitUserSelect = t.userSelect = 'none'), this.view.classList.add('leafer-canvas-view')
      }
      w.syncDomFont && !this.parentView && ((i.display = 'none'), document.body && document.body.appendChild(this.view)),
        this.__createContext(),
        this.autoLayout || this.resize(t)
    }
    set backgroundColor(t) {
      this.view.style.backgroundColor = t
    }
    get backgroundColor() {
      return this.view.style.backgroundColor
    }
    set hittable(t) {
      this.view.style.pointerEvents = t ? 'auto' : 'none'
    }
    get hittable() {
      return 'none' !== this.view.style.pointerEvents
    }
    __createView() {
      this.view = document.createElement('canvas')
    }
    __createViewFrom(t) {
      let e = r(t) ? document.getElementById(t) : t
      if (e)
        if (e instanceof HTMLCanvasElement) this.view = e
        else {
          let t = e
          if (e === window || e === document) {
            const e = document.createElement('div'),
              { style: i } = e
            ;(i.position = 'absolute'), (i.top = i.bottom = i.left = i.right = '0px'), document.body.appendChild(e), (t = e)
          }
          this.__createView()
          const i = this.view
          t.hasChildNodes() && (this.setAbsolute(i), t.style.position || (t.style.position = 'relative')), t.appendChild(i)
        }
      else xh.error(`no id: ${t}`), this.__createView()
    }
    setAbsolute(t) {
      const { style: e } = t
      ;(e.position = 'absolute'), (e.top = e.left = '0px')
    }
    updateViewSize() {
      const { width: t, height: e, pixelRatio: i } = this,
        { style: s } = this.view
      ;(s.width = t + 'px'),
        (s.height = e + 'px'),
        this.unreal || ((this.view.width = Math.ceil(t * i)), (this.view.height = Math.ceil(e * i)))
    }
    updateClientBounds() {
      this.view.parentElement && (this.clientBounds = this.view.getBoundingClientRect())
    }
    startAutoLayout(t, e) {
      if (((this.resizeListener = e), t)) {
        if (((this.autoBounds = t), this.resizeObserver)) return
        try {
          this.resizeObserver = new ResizeObserver(t => {
            this.updateClientBounds()
            for (const e of t) this.checkAutoBounds(e.contentRect)
          })
          const t = this.parentView
          t
            ? (this.resizeObserver.observe(t), this.checkAutoBounds(t.getBoundingClientRect()))
            : (this.checkAutoBounds(this.view), xh.warn('no parent'))
        } catch (t) {
          this.imitateResizeObserver()
        }
        this.stopListenPixelRatio()
      } else this.listenPixelRatio(), this.unreal && this.updateViewSize()
    }
    imitateResizeObserver() {
      this.autoLayout &&
        (this.parentView && this.checkAutoBounds(this.parentView.getBoundingClientRect()),
        w.requestRender(this.imitateResizeObserver.bind(this)))
    }
    listenPixelRatio() {
      this.windowListener ||
        window.addEventListener(
          'resize',
          (this.windowListener = () => {
            const t = w.devicePixelRatio
            if (!this.config.pixelRatio && this.pixelRatio !== t) {
              const { width: e, height: i } = this
              this.emitResize({ width: e, height: i, pixelRatio: t })
            }
          })
        )
    }
    stopListenPixelRatio() {
      this.windowListener && (window.removeEventListener('resize', this.windowListener), (this.windowListener = null))
    }
    checkAutoBounds(t) {
      const e = this.view,
        { x: i, y: s, width: n, height: o } = this.autoBounds.getBoundsFrom(t),
        r = { width: n, height: o, pixelRatio: this.config.pixelRatio ? this.pixelRatio : w.devicePixelRatio }
      if (!this.isSameSize(r)) {
        const { style: t } = e
        ;(t.marginLeft = i + 'px'), (t.marginTop = s + 'px'), this.emitResize(r)
      }
    }
    stopAutoLayout() {
      ;(this.autoLayout = !1),
        this.resizeObserver && this.resizeObserver.disconnect(),
        (this.resizeListener = this.resizeObserver = null)
    }
    emitResize(t) {
      const e = {}
      _.copyAttrs(e, this, Oe), this.resize(t), this.resizeListener && !n(this.width) && this.resizeListener(new Zr(t, e))
    }
    unrealCanvas() {
      if (!this.unreal && this.parentView) {
        let t = this.view
        t && t.remove(),
          (t = this.view = document.createElement('div')),
          this.parentView.appendChild(this.view),
          t.classList.add('leafer-app-view'),
          (this.unreal = !0)
      }
    }
    destroy() {
      const { view: t } = this
      t && (this.stopAutoLayout(), this.stopListenPixelRatio(), t.parentElement && t.remove(), super.destroy())
    }
  }
  Kn(CanvasRenderingContext2D.prototype), Kn(Path2D.prototype)
  const { mineType: Eh, fileType: Th } = qn
  function Sh(t, e) {
    ;(w.origin = {
      createCanvas(t, e) {
        const i = document.createElement('canvas')
        return (i.width = t), (i.height = e), i
      },
      canvasToDataURL: (t, e, i) => {
        const s = Eh(e),
          n = t.toDataURL(s, i)
        return 'image/bmp' === s ? n.replace('image/png;', 'image/bmp;') : n
      },
      canvasToBolb: (t, e, i) => new Promise(s => t.toBlob(s, Eh(e), i)),
      canvasSaveAs: (t, e, i) => {
        const s = t.toDataURL(Eh(Th(e)), i)
        return w.origin.download(s, e)
      },
      download: (t, e) =>
        new Promise(i => {
          let s = document.createElement('a')
          ;(s.href = t), (s.download = e), document.body.appendChild(s), s.click(), document.body.removeChild(s), i()
        }),
      loadImage: t =>
        new Promise((e, i) => {
          const s = new w.origin.Image(),
            { crossOrigin: n } = w.image
          n && (s.setAttribute('crossOrigin', n), (s.crossOrigin = n)),
            (s.onload = () => {
              e(s)
            }),
            (s.onerror = t => {
              i(t)
            }),
            (s.src = w.image.getRealURL(t))
        }),
      Image: Image,
      PointerEvent: PointerEvent,
      DragEvent: DragEvent
    }),
      (w.event = {
        stopDefault(t) {
          t.preventDefault()
        },
        stopNow(t) {
          t.stopImmediatePropagation()
        },
        stop(t) {
          t.stopPropagation()
        }
      }),
      (w.canvas = de.canvas()),
      (w.conicGradientSupport = !!w.canvas.context.createConicGradient)
  }
  Object.assign(de, { canvas: (t, e) => new bh(t, e), image: t => new ao(t) }),
    (w.name = 'web'),
    (w.isMobile = 'ontouchstart' in window),
    (w.requestRender = function (t) {
      window.requestAnimationFrame(t)
    }),
    ho(w, 'devicePixelRatio', { get: () => devicePixelRatio })
  const { userAgent: kh } = navigator
  kh.indexOf('Firefox') > -1
    ? ((w.conicGradientRotate90 = !0), (w.intWheelDeltaY = !0), (w.syncDomFont = !0))
    : (/iPhone|iPad|iPod/.test(navigator.userAgent) ||
        (/Macintosh/.test(navigator.userAgent) && /Version\/[\d.]+.*Safari/.test(navigator.userAgent))) &&
      (w.fullImageShadow = !0),
    kh.indexOf('Windows') > -1
      ? ((w.os = 'Windows'), (w.intWheelDeltaY = !0))
      : kh.indexOf('Mac') > -1
      ? (w.os = 'Mac')
      : kh.indexOf('Linux') > -1 && (w.os = 'Linux')
  class Bh {
    get childrenChanged() {
      return this.hasAdd || this.hasRemove || this.hasVisible
    }
    get updatedList() {
      if (this.hasRemove && this.config.usePartLayout) {
        const t = new vh()
        return (
          this.__updatedList.list.forEach(e => {
            e.leafer && t.add(e)
          }),
          t
        )
      }
      return this.__updatedList
    }
    constructor(t, e) {
      ;(this.totalTimes = 0),
        (this.config = {}),
        (this.__updatedList = new vh()),
        (this.target = t),
        e && (this.config = _.default(e, this.config)),
        this.__listenEvents()
    }
    start() {
      this.disabled || (this.running = !0)
    }
    stop() {
      this.running = !1
    }
    disable() {
      this.stop(), this.__removeListenEvents(), (this.disabled = !0)
    }
    update() {
      ;(this.changed = !0), this.running && this.target.emit(Qr.REQUEST)
    }
    __onAttrChange(t) {
      this.config.usePartLayout && this.__updatedList.add(t.target), this.update()
    }
    __onChildEvent(t) {
      this.config.usePartLayout &&
        (t.type === zr.ADD
          ? ((this.hasAdd = !0), this.__pushChild(t.child))
          : ((this.hasRemove = !0), this.__updatedList.add(t.parent))),
        this.update()
    }
    __pushChild(t) {
      this.__updatedList.add(t), t.isBranch && this.__loopChildren(t)
    }
    __loopChildren(t) {
      const { children: e } = t
      for (let t = 0, i = e.length; t < i; t++) this.__pushChild(e[t])
    }
    __onRquestData() {
      this.target.emitEvent(new $r($r.DATA, { updatedList: this.updatedList })),
        (this.__updatedList = new vh()),
        this.totalTimes++,
        (this.changed = this.hasVisible = this.hasRemove = this.hasAdd = !1)
    }
    __listenEvents() {
      this.__eventIds = [
        this.target.on_([
          [Hr.CHANGE, this.__onAttrChange, this],
          [[zr.ADD, zr.REMOVE], this.__onChildEvent, this],
          [$r.REQUEST, this.__onRquestData, this]
        ])
      ]
    }
    __removeListenEvents() {
      this.target.off_(this.__eventIds)
    }
    destroy() {
      this.target && (this.stop(), this.__removeListenEvents(), (this.target = this.__updatedList = null))
    }
  }
  const { updateAllMatrix: Ph, updateBounds: Lh, updateChange: Rh } = lr,
    { pushAllChildBranch: Ch, pushAllParent: Oh } = xr
  const { worldBounds: Ah } = mr
  class Dh {
    constructor(t) {
      ;(this.updatedBounds = new $t()),
        (this.beforeBounds = new $t()),
        (this.afterBounds = new $t()),
        c(t) && (t = new vh(t)),
        (this.updatedList = t)
    }
    setBefore() {
      this.beforeBounds.setListWithFn(this.updatedList.list, Ah)
    }
    setAfter() {
      this.afterBounds.setListWithFn(this.updatedList.list, Ah), this.updatedBounds.setList([this.beforeBounds, this.afterBounds])
    }
    merge(t) {
      this.updatedList.addList(t.updatedList.list),
        this.beforeBounds.add(t.beforeBounds),
        this.afterBounds.add(t.afterBounds),
        this.updatedBounds.add(t.updatedBounds)
    }
    destroy() {
      this.updatedList = null
    }
  }
  const { updateAllMatrix: Mh, updateAllChange: Ih } = lr,
    Fh = ie.get('Layouter')
  class Wh {
    constructor(t, e) {
      ;(this.totalTimes = 0),
        (this.config = { usePartLayout: !0 }),
        (this.__levelList = new wh()),
        (this.target = t),
        e && (this.config = _.default(e, this.config)),
        this.__listenEvents()
    }
    start() {
      this.disabled || (this.running = !0)
    }
    stop() {
      this.running = !1
    }
    disable() {
      this.stop(), this.__removeListenEvents(), (this.disabled = !0)
    }
    layout() {
      if (this.layouting || !this.running) return
      const { target: t } = this
      this.times = 0
      try {
        t.emit(Jr.START), this.layoutOnce(), t.emitEvent(new Jr(Jr.END, this.layoutedBlocks, this.times))
      } catch (t) {
        Fh.error(t)
      }
      this.layoutedBlocks = null
    }
    layoutAgain() {
      this.layouting ? (this.waitAgain = !0) : this.layoutOnce()
    }
    layoutOnce() {
      return this.layouting
        ? Fh.warn('layouting')
        : this.times > 3
        ? Fh.warn('layout max times')
        : (this.times++,
          this.totalTimes++,
          (this.layouting = !0),
          this.target.emit($r.REQUEST),
          this.totalTimes > 1 && this.config.usePartLayout ? this.partLayout() : this.fullLayout(),
          (this.layouting = !1),
          void (this.waitAgain && ((this.waitAgain = !1), this.layoutOnce())))
    }
    partLayout() {
      var t
      if (!(null === (t = this.__updatedList) || void 0 === t ? void 0 : t.length)) return
      const e = re.start('PartLayout'),
        { target: i, __updatedList: s } = this,
        { BEFORE: n, LAYOUT: o, AFTER: r } = Jr,
        a = this.getBlocks(s)
      a.forEach(t => t.setBefore()),
        i.emitEvent(new Jr(n, a, this.times)),
        (this.extraBlock = null),
        s.sort(),
        (function (t, e) {
          let i
          t.list.forEach(t => {
            ;(i = t.__layout),
              e.without(t) &&
                !i.proxyZoom &&
                (i.matrixChanged
                  ? (Ph(t, !0), e.add(t), t.isBranch && Ch(t, e), Oh(t, e))
                  : i.boundsChanged && (e.add(t), t.isBranch && (t.__tempNumber = 0), Oh(t, e)))
          })
        })(s, this.__levelList),
        (function (t) {
          let e, i, s
          t.sort(!0),
            t.levels.forEach(n => {
              e = t.levelMap[n]
              for (let t = 0, n = e.length; t < n; t++) {
                if (((i = e[t]), i.isBranch && i.__tempNumber)) {
                  s = i.children
                  for (let t = 0, e = s.length; t < e; t++) s[t].isBranch || Lh(s[t])
                }
                Lh(i)
              }
            })
        })(this.__levelList),
        (function (t) {
          t.list.forEach(Rh)
        })(s),
        this.extraBlock && a.push(this.extraBlock),
        a.forEach(t => t.setAfter()),
        i.emitEvent(new Jr(o, a, this.times)),
        i.emitEvent(new Jr(r, a, this.times)),
        this.addBlocks(a),
        this.__levelList.reset(),
        (this.__updatedList = null),
        re.end(e)
    }
    fullLayout() {
      const t = re.start('FullLayout'),
        { target: e } = this,
        { BEFORE: i, LAYOUT: s, AFTER: n } = Jr,
        o = this.getBlocks(new vh(e))
      e.emitEvent(new Jr(i, o, this.times)),
        Wh.fullLayout(e),
        o.forEach(t => {
          t.setAfter()
        }),
        e.emitEvent(new Jr(s, o, this.times)),
        e.emitEvent(new Jr(n, o, this.times)),
        this.addBlocks(o),
        re.end(t)
    }
    static fullLayout(t) {
      Mh(t, !0), t.isBranch ? xr.updateBounds(t) : lr.updateBounds(t), Ih(t)
    }
    addExtra(t) {
      if (!this.__updatedList.has(t)) {
        const { updatedList: e, beforeBounds: i } = this.extraBlock || (this.extraBlock = new Dh([]))
        e.length ? i.add(t.__world) : i.set(t.__world), e.add(t)
      }
    }
    createBlock(t) {
      return new Dh(t)
    }
    getBlocks(t) {
      return [this.createBlock(t)]
    }
    addBlocks(t) {
      this.layoutedBlocks ? this.layoutedBlocks.push(...t) : (this.layoutedBlocks = t)
    }
    __onReceiveWatchData(t) {
      this.__updatedList = t.data.updatedList
    }
    __listenEvents() {
      this.__eventIds = [
        this.target.on_([
          [Jr.REQUEST, this.layout, this],
          [Jr.AGAIN, this.layoutAgain, this],
          [$r.DATA, this.__onReceiveWatchData, this]
        ])
      ]
    }
    __removeListenEvents() {
      this.target.off_(this.__eventIds)
    }
    destroy() {
      this.target && (this.stop(), this.__removeListenEvents(), (this.target = this.config = null))
    }
  }
  const zh = ie.get('Renderer')
  class Uh {
    get needFill() {
      return !(this.canvas.allowBackgroundColor || !this.config.fill)
    }
    constructor(t, e, i) {
      ;(this.FPS = 60),
        (this.totalTimes = 0),
        (this.times = 0),
        (this.config = { usePartRender: !0, maxFPS: 120 }),
        (this.frames = []),
        (this.target = t),
        (this.canvas = e),
        i && (this.config = _.default(i, this.config)),
        this.__listenEvents()
    }
    start() {
      ;(this.running = !0), this.update(!1)
    }
    stop() {
      this.running = !1
    }
    update(t = !0) {
      this.changed || (this.changed = t), this.requestTime || this.__requestRender()
    }
    requestLayout() {
      this.target.emit(Jr.REQUEST)
    }
    checkRender() {
      if (this.running) {
        const { target: t } = this
        t.isApp &&
          (t.emit(Qr.CHILD_START, t),
          t.children.forEach(t => {
            ;(t.renderer.FPS = this.FPS), t.renderer.checkRender()
          }),
          t.emit(Qr.CHILD_END, t)),
          this.changed && this.canvas.view && this.render(),
          this.target.emit(Qr.NEXT)
      }
    }
    render(t) {
      if (!this.running || !this.canvas.view) return this.update()
      const { target: e } = this
      ;(this.times = 0), (this.totalBounds = new $t()), zh.log(e.innerName, '---\x3e')
      try {
        this.emitRender(Qr.START), this.renderOnce(t), this.emitRender(Qr.END, this.totalBounds), so.clearRecycled()
      } catch (t) {
        ;(this.rendering = !1), zh.error(t)
      }
      zh.log('-------------|')
    }
    renderAgain() {
      this.rendering ? (this.waitAgain = !0) : this.renderOnce()
    }
    renderOnce(t) {
      if (this.rendering) return zh.warn('rendering')
      if (this.times > 3) return zh.warn('render max times')
      if (
        (this.times++,
        this.totalTimes++,
        (this.rendering = !0),
        (this.changed = !1),
        (this.renderBounds = new $t()),
        (this.renderOptions = {}),
        t)
      )
        this.emitRender(Qr.BEFORE), t()
      else {
        if ((this.requestLayout(), this.ignore)) return void (this.ignore = this.rendering = !1)
        this.emitRender(Qr.BEFORE), this.config.usePartRender && this.totalTimes > 1 ? this.partRender() : this.fullRender()
      }
      this.emitRender(Qr.RENDER, this.renderBounds, this.renderOptions),
        this.emitRender(Qr.AFTER, this.renderBounds, this.renderOptions),
        (this.updateBlocks = null),
        (this.rendering = !1),
        this.waitAgain && ((this.waitAgain = !1), this.renderOnce())
    }
    partRender() {
      const { canvas: t, updateBlocks: e } = this
      e &&
        (this.mergeBlocks(),
        e.forEach(e => {
          t.bounds.hit(e) && !e.isEmpty() && this.clipRender(e)
        }))
    }
    clipRender(t) {
      const e = re.start('PartRender'),
        { canvas: i } = this,
        s = t.getIntersect(i.bounds),
        n = new $t(s)
      i.save(), s.spread(Uh.clipSpread).ceil(), i.clearWorld(s), i.clipWorld(s), this.__render(s, n), i.restore(), re.end(e)
    }
    fullRender() {
      const t = re.start('FullRender'),
        { canvas: e } = this
      e.save(), e.clear(), this.__render(e.bounds), e.restore(), re.end(t)
    }
    __render(t, e) {
      const { canvas: i, target: s } = this,
        n = t.includes(s.__world),
        o = n ? { includes: n } : { bounds: t, includes: n }
      this.needFill && i.fillWorld(t, this.config.fill),
        ie.showRepaint && ie.drawRepaint(i, t),
        this.config.useCellRender && (o.cellList = this.getCellList()),
        w.render(s, i, o),
        (this.renderBounds = e = e || t),
        (this.renderOptions = o),
        this.totalBounds.isEmpty() ? (this.totalBounds = e) : this.totalBounds.add(e),
        i.updateRender(e)
    }
    getCellList() {}
    addBlock(t) {
      this.updateBlocks || (this.updateBlocks = []), this.updateBlocks.push(t)
    }
    mergeBlocks() {
      const { updateBlocks: t } = this
      if (t) {
        const e = new $t()
        e.setList(t), (t.length = 0), t.push(e)
      }
    }
    __requestRender() {
      const t = this.target
      if (this.requestTime || !t) return
      if (t.parentApp) return t.parentApp.requestRender(!1)
      this.requestTime = this.frameTime || Date.now()
      const e = () => {
        const t = 1e3 / ((this.frameTime = Date.now()) - this.requestTime),
          { maxFPS: i } = this.config
        if (i && t > i) return w.requestRender(e)
        const { frames: s } = this
        s.length > 30 && s.shift(),
          s.push(t),
          (this.FPS = Math.round(s.reduce((t, e) => t + e, 0) / s.length)),
          (this.requestTime = 0),
          this.checkRender()
      }
      w.requestRender(e)
    }
    __onResize(t) {
      if (!this.canvas.unreal) {
        if (t.bigger || !t.samePixelRatio) {
          const { width: e, height: i } = t.old
          if (!new $t(0, 0, e, i).includes(this.target.__world) || this.needFill || !t.samePixelRatio)
            return this.addBlock(this.canvas.bounds), void this.target.forceUpdate('surface')
        }
        this.addBlock(new $t(0, 0, 1, 1)), this.update()
      }
    }
    __onLayoutEnd(t) {
      t.data &&
        t.data.map(t => {
          let e
          t.updatedList &&
            t.updatedList.list.some(
              t => (
                (e = !t.__world.width || !t.__world.height),
                e && (t.isLeafer || zh.tip(t.innerName, ': empty'), (e = !t.isBranch || t.isBranchLeaf)),
                e
              )
            ),
            this.addBlock(e ? this.canvas.bounds : t.updatedBounds)
        })
    }
    emitRender(t, e, i) {
      this.target.emitEvent(new Qr(t, this.times, e, i))
    }
    __listenEvents() {
      this.__eventIds = [
        this.target.on_([
          [Qr.REQUEST, this.update, this],
          [Jr.END, this.__onLayoutEnd, this],
          [Qr.AGAIN, this.renderAgain, this],
          [Zr.RESIZE, this.__onResize, this]
        ])
      ]
    }
    __removeListenEvents() {
      this.target.off_(this.__eventIds)
    }
    destroy() {
      this.target && (this.stop(), this.__removeListenEvents(), (this.config = {}), (this.target = this.canvas = null))
    }
  }
  Uh.clipSpread = 10
  const Hh = {},
    { copyRadiusPoint: Nh } = ut,
    { hitRadiusPoint: Yh } = jt
  class Xh {
    constructor(t, e) {
      ;(this.target = t), (this.selector = e)
    }
    getByPoint(t, e, i) {
      e || (e = 0), i || (i = {})
      const s = i.through || !1,
        n = i.ignoreHittable || !1,
        o = i.target || this.target
      ;(this.exclude = i.exclude || null),
        (this.point = { x: t.x, y: t.y, radiusX: e, radiusY: e }),
        (this.findList = new vh(i.findList)),
        i.findList || this.hitBranch(o.isBranchLeaf ? { children: [o] } : o)
      const { list: r } = this.findList,
        a = this.getBestMatchLeaf(r, i.bottomList, n, !!i.findList),
        h = n ? this.getPath(a) : this.getHitablePath(a)
      return this.clear(), s ? { path: h, target: a, throughPath: r.length ? this.getThroughPath(r) : h } : { path: h, target: a }
    }
    hitPoint(t, e, i) {
      return !!this.getByPoint(t, e, i).target
    }
    getBestMatchLeaf(t, e, i, s) {
      const n = (this.findList = new vh())
      if (t.length) {
        let e
        const { x: s, y: o } = this.point,
          r = { x: s, y: o, radiusX: 0, radiusY: 0 }
        for (let s = 0, o = t.length; s < o; s++)
          if (((e = t[s]), (i || lr.worldHittable(e)) && (this.hitChild(e, r), n.length))) {
            if (e.isBranchLeaf && t.some(t => t !== e && lr.hasParent(t, e))) {
              n.reset()
              break
            }
            return n.list[0]
          }
      }
      if (e)
        for (let t = 0, i = e.length; t < i; t++)
          if ((this.hitChild(e[t].target, this.point, e[t].proxy), n.length)) return n.list[0]
      return s ? null : i ? t[0] : t.find(t => lr.worldHittable(t))
    }
    getPath(t) {
      const e = new vh(),
        i = [],
        { target: s } = this
      for (; t && (t.syncEventer && i.push(t.syncEventer), e.add(t), (t = t.parent) !== s); );
      return (
        i.length &&
          i.forEach(t => {
            for (; t && (t.__.hittable && e.add(t), (t = t.parent) !== s); );
          }),
        s && e.add(s),
        e
      )
    }
    getHitablePath(t) {
      const e = this.getPath(t && t.hittable ? t : null)
      let i,
        s = new vh()
      for (
        let t = e.list.length - 1;
        t > -1 && ((i = e.list[t]), i.__.hittable) && (s.addAt(i, 0), i.__.hitChildren && (!i.isLeafer || 'draw' !== i.mode));
        t--
      );
      return s
    }
    getThroughPath(t) {
      const e = new vh(),
        i = []
      for (let e = t.length - 1; e > -1; e--) i.push(this.getPath(t[e]))
      let s, n, o
      for (let t = 0, r = i.length; t < r; t++) {
        ;(s = i[t]), (n = i[t + 1])
        for (let t = 0, i = s.length; t < i && ((o = s.list[t]), !n || !n.has(o)); t++) e.add(o)
      }
      return e
    }
    hitBranch(t) {
      this.eachFind(t.children, t.__onlyHitMask)
    }
    eachFind(t, e) {
      let i, s, n
      const { point: o } = this
      for (let r = t.length - 1; r > -1; r--)
        if (((i = t[r]), (n = i.__), n.visible && (!e || n.mask)))
          if (((s = Yh(i.__world, n.hitRadius ? Nh(Hh, o, n.hitRadius) : o)), i.isBranch)) {
            if (s || i.__ignoreHitWorld) {
              if (i.isBranchLeaf && n.__clipAfterFill && !i.__hitWorld(o, !0)) continue
              i.topChildren && this.eachFind(i.topChildren, !1),
                this.eachFind(i.children, i.__onlyHitMask),
                i.isBranchLeaf && this.hitChild(i, o)
            }
          } else s && this.hitChild(i, o)
    }
    hitChild(t, e, i) {
      if ((!this.exclude || !this.exclude.has(t)) && t.__hitWorld(e)) {
        const { parent: s } = t
        if (s && s.__hasMask && !t.__.mask) {
          let i,
            n = []
          const { children: o } = s
          for (let s = 0, r = o.length; s < r; s++)
            if (((i = o[s]), i.__.mask && n.push(i), i === t)) {
              if (n && !n.every(t => t.__hitWorld(e))) return
              break
            }
        }
        this.findList.add(i || t)
      }
    }
    clear() {
      ;(this.point = null), (this.findList = null), (this.exclude = null)
    }
    destroy() {
      this.clear()
    }
  }
  class Vh {
    constructor(t, e) {
      ;(this.config = {}),
        e && (this.config = _.default(e, this.config)),
        (this.picker = new Xh((this.target = t), this)),
        (this.finder = de.finder && de.finder())
    }
    getByPoint(t, e, i) {
      const { target: s, picker: n } = this
      return w.backgrounder && s && s.updateLayout(), n.getByPoint(t, e, i)
    }
    hitPoint(t, e, i) {
      return this.picker.hitPoint(t, e, i)
    }
    getBy(t, e, i, s) {
      return this.finder ? this.finder.getBy(t, e, i, s) : le.need('find')
    }
    destroy() {
      this.picker.destroy(), this.finder && this.finder.destroy()
    }
  }
  function Gh(t) {
    return uo(t, t => ({
      set(e) {
        this.__setAttr(t, e), e && (this.__.__useEffect = !0), this.__layout.renderChanged || this.__layout.renderChange()
      }
    }))
  }
  function jh(t) {
    return uo(t, t => ({
      set(e) {
        this.__setAttr(t, e), this.__layout.boxChanged || this.__layout.boxChange(), this.__updateSize()
      }
    }))
  }
  function Kh() {
    return (t, e) => {
      const i = '_' + e
      ho(t, e, {
        set(t) {
          this.isLeafer && (this[i] = t)
        },
        get() {
          return this.isApp ? this.tree.zoomLayer : this.isLeafer ? this[i] || this : this.leafer && this.leafer.zoomLayer
        }
      })
    }
  }
  Object.assign(de, {
    watcher: (t, e) => new Bh(t, e),
    layouter: (t, e) => new Wh(t, e),
    renderer: (t, e, i) => new Uh(t, e, i),
    selector: (t, e) => new Vh(t, e)
  }),
    (w.layout = Wh.fullLayout),
    (w.render = function (t, e, i) {
      const s = Object.assign(Object.assign({}, i), { topRendering: !0 })
      ;(i.topList = new vh()), t.__render(e, i), i.topList.length && i.topList.forEach(t => t.__render(e, s))
    })
  const qh = {},
    Zh = {
      hasTransparent: function (t) {
        if (!t || 7 === t.length || 4 === t.length) return !1
        if ('transparent' === t) return !0
        const e = t[0]
        if ('#' === e)
          switch (t.length) {
            case 5:
              return 'f' !== t[4] && 'F' !== t[4]
            case 9:
              return ('f' !== t[7] && 'F' !== t[7]) || ('f' !== t[8] && 'F' !== t[8])
          }
        else if (('r' === e || 'h' === e) && 'a' === t[3]) {
          const e = t.lastIndexOf(',')
          if (e > -1) return parseFloat(t.slice(e + 1)) < 1
        }
        return !1
      }
    },
    $h = { number: (t, e) => (u(t) ? ('percent' === t.type ? t.value * e : t.value) : t) },
    Jh = {},
    Qh = {},
    tl = {},
    el = {},
    il = {},
    sl = {
      apply() {
        le.need('filter')
      }
    },
    nl = {},
    ol = { setStyleName: () => le.need('state'), set: () => le.need('state') },
    rl = {
      list: {},
      register(t, e) {
        rl.list[t] = e
      },
      get: t => rl.list[t]
    },
    { parse: al, objectToCanvasData: hl } = ss,
    { stintSet: ll } = _,
    { hasTransparent: dl } = Zh,
    cl = { originPaint: {} },
    ul = ie.get('UIData')
  class pl extends m {
    get scale() {
      const { scaleX: t, scaleY: e } = this
      return t !== e ? { x: t, y: e } : t
    }
    get __strokeWidth() {
      return this.__getRealStrokeWidth()
    }
    get __maxStrokeWidth() {
      const t = this
      return t.__hasMultiStrokeStyle ? Math.max(t.__hasMultiStrokeStyle, t.strokeWidth) : t.strokeWidth
    }
    get __hasMultiPaint() {
      const t = this
      return (
        (t.fill && this.__useStroke) ||
        (t.__isFills && t.fill.length > 1) ||
        (t.__isStrokes && t.stroke.length > 1) ||
        t.__useEffect
      )
    }
    get __clipAfterFill() {
      const t = this
      return t.cornerRadius || t.innerShadow || t.__pathInputed
    }
    get __hasSurface() {
      return this.fill || this.stroke
    }
    get __autoWidth() {
      return !this._width
    }
    get __autoHeight() {
      return !this._height
    }
    get __autoSide() {
      return !this._width || !this._height
    }
    get __autoSize() {
      return !this._width && !this._height
    }
    setVisible(t) {
      this._visible = t
      const { leafer: e } = this.__leaf
      e && (e.watcher.hasVisible = !0)
    }
    setWidth(t) {
      t < 0 ? ((this._width = -t), (this.__leaf.scaleX *= -1), ul.warn('width < 0, instead -scaleX ', this)) : (this._width = t)
    }
    setHeight(t) {
      t < 0 ? ((this._height = -t), (this.__leaf.scaleY *= -1), ul.warn('height < 0, instead -scaleY', this)) : (this._height = t)
    }
    setFill(t) {
      this.__naturalWidth && this.__removeNaturalSize(),
        r(t) || !t
          ? (ll(this, '__isTransparentFill', dl(t)), this.__isFills && this.__removePaint('fill', !0), (this._fill = t))
          : u(t) && this.__setPaint('fill', t)
    }
    setStroke(t) {
      r(t) || !t
        ? (ll(this, '__isTransparentStroke', dl(t)), this.__isStrokes && this.__removePaint('stroke', !0), (this._stroke = t))
        : u(t) && this.__setPaint('stroke', t)
    }
    setPath(t) {
      const e = r(t)
      e || (t && u(t[0]))
        ? (this.__setInput('path', t), (this._path = e ? al(t) : hl(t)))
        : (this.__input && this.__removeInput('path'), (this._path = t))
    }
    setShadow(t) {
      gl(this, 'shadow', t)
    }
    setInnerShadow(t) {
      gl(this, 'innerShadow', t)
    }
    setFilter(t) {
      gl(this, 'filter', t)
    }
    __computePaint() {
      const { fill: t, stroke: e } = this.__input
      t && Qh.compute('fill', this.__leaf), e && Qh.compute('stroke', this.__leaf), (this.__needComputePaint = void 0)
    }
    __getRealStrokeWidth(t) {
      let { strokeWidth: e, strokeWidthFixed: i } = this
      if ((t && (t.strokeWidth && (e = t.strokeWidth), n(t.strokeWidthFixed) || (i = t.strokeWidthFixed)), i)) {
        const t = this.__leaf.getClampRenderScale()
        return t > 1 ? e / t : e
      }
      return e
    }
    __setPaint(t, e) {
      this.__setInput(t, e)
      const i = this.__leaf.__layout
      i.boxChanged || i.boxChange(),
        c(e) && !e.length
          ? this.__removePaint(t)
          : 'fill' === t
          ? ((this.__isFills = !0), this._fill || (this._fill = cl))
          : ((this.__isStrokes = !0), this._stroke || (this._stroke = cl))
    }
    __removePaint(t, e) {
      e && this.__removeInput(t),
        tl.recycleImage(t, this),
        'fill' === t
          ? (ll(this, '__isAlphaPixelFill', void 0), (this._fill = this.__isFills = void 0))
          : (ll(this, '__isAlphaPixelStroke', void 0),
            ll(this, '__hasMultiStrokeStyle', void 0),
            (this._stroke = this.__isStrokes = void 0))
    }
  }
  function gl(t, e, i) {
    t.__setInput(e, i),
      c(i)
        ? (i.some(t => !1 === t.visible) && (i = i.filter(t => !1 !== t.visible)), i.length || (i = void 0))
        : (i = i && !1 !== i.visible ? [i] : void 0),
      (t['_' + e] = i)
  }
  class _l extends pl {}
  class fl extends _l {
    get __boxStroke() {
      return !this.__pathInputed
    }
    get __drawAfterFill() {
      return this.__single || this.__clipAfterFill
    }
    get __clipAfterFill() {
      const t = this
      return 'show' !== t.overflow && t.__leaf.children.length && (t.__leaf.isOverflow || super.__clipAfterFill)
    }
  }
  class ml extends _l {
    __getInputData(t, e) {
      const i = super.__getInputData(t, e)
      return Oe.forEach(t => delete i[t]), i
    }
  }
  class yl extends fl {}
  class vl extends pl {
    get __usePathBox() {
      return this.points || this.__pathInputed
    }
  }
  class wl extends pl {
    get __boxStroke() {
      return !this.__pathInputed
    }
  }
  class xl extends pl {
    get __boxStroke() {
      return !this.__pathInputed
    }
  }
  class bl extends vl {}
  class El extends pl {}
  class Tl extends pl {
    get __pathInputed() {
      return 2
    }
  }
  class Sl extends _l {}
  const kl = {
    thin: 100,
    'extra-light': 200,
    light: 300,
    normal: 400,
    medium: 500,
    'semi-bold': 600,
    bold: 700,
    'extra-bold': 800,
    black: 900
  }
  class Bl extends pl {
    get __useNaturalRatio() {
      return !1
    }
    setFontWeight(t) {
      r(t) ? (this.__setInput('fontWeight', t), (t = kl[t] || 400)) : this.__input && this.__removeInput('fontWeight'),
        (this._fontWeight = t)
    }
    setBoxStyle(t) {
      let e = this.__leaf,
        i = e.__box
      if (t) {
        const { boxStyle: s } = this
        if (i) for (let t in s) i[t] = void 0
        else i = e.__box = ue.get('Rect', 0)
        const n = e.__layout,
          o = i.__layout
        s || ((i.parent = e), (i.__world = e.__world), (o.boxBounds = n.boxBounds)), i.set(t), o.strokeChanged && n.strokeChange()
      } else i && ((e.__box = i.parent = null), i.destroy())
      this._boxStyle = t
    }
    __getInputData(t, e) {
      const i = super.__getInputData(t, e)
      return i.textEditing && delete i.textEditing, i
    }
  }
  class Pl extends wl {
    setUrl(t) {
      this.__setImageFill(t), (this._url = t)
    }
    __setImageFill(t) {
      this.fill = t ? { type: 'image', mode: 'stretch', url: t } : void 0
    }
    __getData() {
      const t = super.__getData()
      return t.url && delete t.fill, t
    }
    __getInputData(t, e) {
      const i = super.__getInputData(t, e)
      return i.url && delete i.fill, i
    }
  }
  class Ll extends wl {
    get __isCanvas() {
      return !0
    }
    get __drawAfterFill() {
      return !0
    }
    __getInputData(t, e) {
      const i = super.__getInputData(t, e)
      return (i.url = this.__leaf.canvas.toDataURL('image/png')), i
    }
  }
  const { max: Rl, add: Cl } = L,
    Ol = {
      __updateStrokeSpread() {
        let t = 0,
          e = 0
        const i = this.__,
          { strokeAlign: s, __maxStrokeWidth: n } = i,
          o = this.__box
        if (
          (i.stroke || 'all' === i.hitStroke) &&
          n &&
          'inside' !== s &&
          ((e = t = 'center' === s ? n / 2 : n), !i.__boxStroke)
        ) {
          const e = i.__isLinePath ? 0 : 10 * t,
            s = 'none' === i.strokeCap ? 0 : n
          t += Math.max(e, s)
        }
        return (
          i.__useArrow && (t += 5 * n),
          o && ((t = Rl(t, (o.__layout.strokeSpread = o.__updateStrokeSpread()))), (e = Math.max(e, o.__layout.strokeBoxSpread))),
          (this.__layout.strokeBoxSpread = e),
          t
        )
      },
      __updateRenderSpread() {
        let t = 0
        const { shadow: e, innerShadow: i, blur: s, backgroundBlur: n, filter: o, renderSpread: r } = this.__,
          { strokeSpread: a } = this.__layout,
          h = this.__box
        e && (t = il.getShadowRenderSpread(this, e)),
          s && (t = Rl(t, s)),
          o && (t = Cl(t, sl.getSpread(o))),
          r && (t = Cl(t, r)),
          a && (t = Cl(t, a))
        let l = t
        return (
          i && (l = Rl(l, il.getInnerShadowSpread(this, i))),
          n && (l = Rl(l, n)),
          (this.__layout.renderShapeSpread = l),
          h ? Rl(h.__updateRenderSpread(), t) : t
        )
      }
    },
    { stintSet: Al } = _,
    Dl = {
      __updateChange() {
        const t = this.__
        if (t.__useStroke) {
          const e = (t.__useStroke = !(!t.stroke || !t.strokeWidth))
          Al(this.__world, 'half', e && 'center' === t.strokeAlign && t.strokeWidth % 2),
            Al(t, '__fillAfterStroke', e && 'outside' === t.strokeAlign && t.fill && !t.__isTransparentFill)
        }
        if (t.__useEffect) {
          const { shadow: e, fill: i, stroke: s } = t,
            n = t.innerShadow || t.blur || t.backgroundBlur || t.filter
          Al(
            t,
            '__isFastShadow',
            e &&
              !n &&
              e.length < 2 &&
              !e[0].spread &&
              !il.isTransformShadow(e[0]) &&
              i &&
              !t.__isTransparentFill &&
              !(c(i) && i.length > 1) &&
              (this.useFastShadow || !s || (s && 'inside' === t.strokeAlign))
          ),
            (t.__useEffect = !(!e && !n))
        }
        t.__checkSingle(), Al(t, '__complex', t.__isFills || t.__isStrokes || t.cornerRadius || t.__useEffect)
      },
      __drawFast(t, e) {
        Ml(this, t, e)
      },
      __draw(t, e, i) {
        const s = this.__
        if (s.__complex) {
          s.__needComputePaint && s.__computePaint()
          const { fill: n, stroke: o, __drawAfterFill: r, __fillAfterStroke: a, __isFastShadow: h } = s
          if ((this.__drawRenderPath(t), s.__useEffect && !h)) {
            const h = Qh.shape(this, t, e)
            this.__nowWorld = this.__getNowWorld(e)
            const { shadow: l, innerShadow: d, filter: c } = s
            l && il.shadow(this, t, h),
              a && (s.__isStrokes ? Qh.strokes(o, this, t, e) : Qh.stroke(o, this, t, e)),
              n && (s.__isFills ? Qh.fills(n, this, t, e) : Qh.fill(n, this, t, e)),
              r && this.__drawAfterFill(t, e),
              d && il.innerShadow(this, t, h),
              o && !a && (s.__isStrokes ? Qh.strokes(o, this, t, e) : Qh.stroke(o, this, t, e)),
              c && sl.apply(c, this, this.__nowWorld, t, i, h),
              h.worldCanvas && h.worldCanvas.recycle(),
              h.canvas.recycle()
          } else {
            if ((a && (s.__isStrokes ? Qh.strokes(o, this, t, e) : Qh.stroke(o, this, t, e)), h)) {
              const e = s.shadow[0],
                { scaleX: i, scaleY: n } = this.getRenderScaleData(!0, e.scaleFixed)
              t.save(), t.setWorldShadow(e.x * i, e.y * n, e.blur * i, Zh.string(e.color))
            }
            n && (s.__isFills ? Qh.fills(n, this, t, e) : Qh.fill(n, this, t, e)),
              h && t.restore(),
              r && this.__drawAfterFill(t, e),
              o && !a && (s.__isStrokes ? Qh.strokes(o, this, t, e) : Qh.stroke(o, this, t, e))
          }
        } else s.__pathForRender ? Ml(this, t, e) : this.__drawFast(t, e)
      },
      __drawShape(t, e) {
        this.__drawRenderPath(t)
        const i = this.__,
          { fill: s, stroke: n } = i
        s && !e.ignoreFill && (i.__isAlphaPixelFill ? Qh.fills(s, this, t, e) : Qh.fill('#000000', this, t, e)),
          i.__isCanvas && this.__drawAfterFill(t, e),
          n && !e.ignoreStroke && (i.__isAlphaPixelStroke ? Qh.strokes(n, this, t, e) : Qh.stroke('#000000', this, t, e))
      },
      __drawAfterFill(t, e) {
        this.__.__clipAfterFill ? (t.save(), t.clipUI(this), this.__drawContent(t, e), t.restore()) : this.__drawContent(t, e)
      }
    }
  function Ml(t, e, i) {
    const { fill: s, stroke: n, __drawAfterFill: o, __fillAfterStroke: r } = t.__
    t.__drawRenderPath(e),
      r && Qh.stroke(n, t, e, i),
      s && Qh.fill(s, t, e, i),
      o && t.__drawAfterFill(e, i),
      n && !r && Qh.stroke(n, t, e, i)
  }
  const Il = {
    __drawFast(t, e) {
      let { x: i, y: s, width: n, height: o } = this.__layout.boxBounds
      const { fill: r, stroke: a, __drawAfterFill: h } = this.__
      if ((r && ((t.fillStyle = r), t.fillRect(i, s, n, o)), h && this.__drawAfterFill(t, e), a)) {
        const { strokeAlign: r, __strokeWidth: h } = this.__
        if (!h) return
        t.setStroke(a, h, this.__)
        const l = h / 2
        switch (r) {
          case 'center':
            t.strokeRect(0, 0, n, o)
            break
          case 'inside':
            ;(n -= h),
              (o -= h),
              n < 0 || o < 0
                ? (t.save(), this.__clip(t, e), t.strokeRect(i + l, s + l, n, o), t.restore())
                : t.strokeRect(i + l, s + l, n, o)
            break
          case 'outside':
            t.strokeRect(i - l, s - l, n + h, o + h)
        }
      }
    }
  }
  var Fl, Wl
  ;(t.UI = Fl =
    class extends t.Leaf {
      get app() {
        return this.leafer && this.leafer.app
      }
      get isFrame() {
        return !1
      }
      set scale(t) {
        z.assignScale(this, t)
      }
      get scale() {
        return this.__.scale
      }
      get isAutoWidth() {
        const t = this.__
        return t.__autoWidth || t.autoWidth
      }
      get isAutoHeight() {
        const t = this.__
        return t.__autoHeight || t.autoHeight
      }
      get pen() {
        const { path: t } = this.__
        return Gn.set((this.path = t || [])), t || this.__drawPathByBox(Gn), Gn
      }
      reset(t) {}
      set(t, e) {
        t && Object.assign(this, t)
      }
      get(t) {
        return r(t) ? this.__.__getInput(t) : this.__.__getInputData(t)
      }
      createProxyData() {}
      find(t, e) {
        return le.need('find')
      }
      findTag(t) {
        return this.find({ tag: t })
      }
      findOne(t, e) {
        return le.need('find')
      }
      findId(t) {
        return this.findOne({ id: t })
      }
      getPath(t, e) {
        this.__layout.update()
        let i = e ? this.__.__pathForRender : this.__.path
        return i || (Gn.set((i = [])), this.__drawPathByBox(Gn, !e)), t ? ss.toCanvasData(i, !0) : i
      }
      getPathString(t, e, i) {
        return ss.stringify(this.getPath(t, e), i)
      }
      load() {
        this.__.__computePaint()
      }
      __onUpdateSize() {
        if (this.__.__input) {
          const t = this.__
          !t.lazy || this.__inLazyBounds || nl.running ? t.__computePaint() : (t.__needComputePaint = !0)
        }
      }
      __updateRenderPath() {
        const t = this.__
        t.path
          ? ((t.__pathForRender = t.cornerRadius ? Xn.smooth(t.path, t.cornerRadius, t.cornerSmoothing) : t.path),
            t.__useArrow && Jh.addArrows(this))
          : t.__pathForRender && (t.__pathForRender = void 0)
      }
      __drawRenderPath(t) {
        t.beginPath(), this.__drawPathByData(t, this.__.__pathForRender)
      }
      __drawPath(t) {
        t.beginPath(), this.__drawPathByData(t, this.__.path, !0)
      }
      __drawPathByData(t, e, i) {
        e ? on.drawPathByData(t, e) : this.__drawPathByBox(t, i)
      }
      __drawPathByBox(t, e) {
        const { x: i, y: s, width: n, height: o } = this.__layout.boxBounds
        if (this.__.cornerRadius && !e) {
          const { cornerRadius: e } = this.__
          t.roundRect(i, s, n, o, h(e) ? [e] : e)
        } else t.rect(i, s, n, o)
        t.closePath()
      }
      drawImagePlaceholder(t, e, i) {
        Qh.fill(this.__.placeholderColor, this, e, i)
      }
      animate(t, e, i, s) {
        return this.set(t), le.need('animate')
      }
      killAnimate(t, e) {}
      export(t, e) {
        return le.need('export')
      }
      syncExport(t, e) {
        return le.need('export')
      }
      clone(t) {
        const e = _.clone(this.toJSON())
        return t && Object.assign(e, t), Fl.one(e)
      }
      static one(t, e, i, s, n) {
        return ue.get(t.tag || this.prototype.__tag, t, e, i, s, n)
      }
      static registerUI() {
        Zo()(this)
      }
      static registerData(t) {
        Ho(t)(this.prototype)
      }
      static setEditConfig(t) {}
      static setEditOuter(t) {}
      static setEditInner(t) {}
      destroy() {
        ;(this.fill = this.stroke = null), this.__animate && this.killAnimate(), super.destroy()
      }
    }),
    ye([Ho(pl)], t.UI.prototype, '__', void 0),
    ye([Kh()], t.UI.prototype, 'zoomLayer', void 0),
    ye([_o('')], t.UI.prototype, 'id', void 0),
    ye([_o('')], t.UI.prototype, 'name', void 0),
    ye([_o('')], t.UI.prototype, 'className', void 0),
    ye([Ro('pass-through')], t.UI.prototype, 'blendMode', void 0),
    ye([Oo(1)], t.UI.prototype, 'opacity', void 0),
    ye([Ao(!0)], t.UI.prototype, 'visible', void 0),
    ye([Ro(!1)], t.UI.prototype, 'locked', void 0),
    ye([Co(!1)], t.UI.prototype, 'dim', void 0),
    ye([Co(!1)], t.UI.prototype, 'dimskip', void 0),
    ye([Io(0)], t.UI.prototype, 'zIndex', void 0),
    ye([Fo(!1)], t.UI.prototype, 'mask', void 0),
    ye([Wo(!1)], t.UI.prototype, 'eraser', void 0),
    ye([fo(0, !0)], t.UI.prototype, 'x', void 0),
    ye([fo(0, !0)], t.UI.prototype, 'y', void 0),
    ye([xo(100, !0)], t.UI.prototype, 'width', void 0),
    ye([xo(100, !0)], t.UI.prototype, 'height', void 0),
    ye([vo(1, !0)], t.UI.prototype, 'scaleX', void 0),
    ye([vo(1, !0)], t.UI.prototype, 'scaleY', void 0),
    ye([wo(0, !0)], t.UI.prototype, 'rotation', void 0),
    ye([wo(0, !0)], t.UI.prototype, 'skewX', void 0),
    ye([wo(0, !0)], t.UI.prototype, 'skewY', void 0),
    ye([fo(0, !0)], t.UI.prototype, 'offsetX', void 0),
    ye([fo(0, !0)], t.UI.prototype, 'offsetY', void 0),
    ye([mo(0, !0)], t.UI.prototype, 'scrollX', void 0),
    ye([mo(0, !0)], t.UI.prototype, 'scrollY', void 0),
    ye([yo()], t.UI.prototype, 'origin', void 0),
    ye([yo()], t.UI.prototype, 'around', void 0),
    ye([_o(!1)], t.UI.prototype, 'lazy', void 0),
    ye([bo(1)], t.UI.prototype, 'pixelRatio', void 0),
    ye([Lo(0)], t.UI.prototype, 'renderSpread', void 0),
    ye([To()], t.UI.prototype, 'path', void 0),
    ye([So()], t.UI.prototype, 'windingRule', void 0),
    ye([So(!0)], t.UI.prototype, 'closed', void 0),
    ye([xo(0)], t.UI.prototype, 'padding', void 0),
    ye([xo(!1)], t.UI.prototype, 'lockRatio', void 0),
    ye([xo()], t.UI.prototype, 'widthRange', void 0),
    ye([xo()], t.UI.prototype, 'heightRange', void 0),
    ye([_o(!1)], t.UI.prototype, 'draggable', void 0),
    ye([_o()], t.UI.prototype, 'dragBounds', void 0),
    ye([_o('auto')], t.UI.prototype, 'dragBoundsType', void 0),
    ye([_o(!1)], t.UI.prototype, 'editable', void 0),
    ye([zo(!0)], t.UI.prototype, 'hittable', void 0),
    ye([zo('path')], t.UI.prototype, 'hitFill', void 0),
    ye([Po('path')], t.UI.prototype, 'hitStroke', void 0),
    ye([zo(!1)], t.UI.prototype, 'hitBox', void 0),
    ye([zo(!0)], t.UI.prototype, 'hitChildren', void 0),
    ye([zo(!0)], t.UI.prototype, 'hitSelf', void 0),
    ye([zo()], t.UI.prototype, 'hitRadius', void 0),
    ye([Uo('')], t.UI.prototype, 'cursor', void 0),
    ye([Ro()], t.UI.prototype, 'fill', void 0),
    ye([Po(void 0, !0)], t.UI.prototype, 'stroke', void 0),
    ye([Po('inside')], t.UI.prototype, 'strokeAlign', void 0),
    ye([Po(1, !0)], t.UI.prototype, 'strokeWidth', void 0),
    ye([Po(!1)], t.UI.prototype, 'strokeWidthFixed', void 0),
    ye([Po('none')], t.UI.prototype, 'strokeCap', void 0),
    ye([Po('miter')], t.UI.prototype, 'strokeJoin', void 0),
    ye([Po()], t.UI.prototype, 'dashPattern', void 0),
    ye([Po(0)], t.UI.prototype, 'dashOffset', void 0),
    ye([Po(10)], t.UI.prototype, 'miterLimit', void 0),
    ye([So(0)], t.UI.prototype, 'cornerRadius', void 0),
    ye([So()], t.UI.prototype, 'cornerSmoothing', void 0),
    ye([Gh()], t.UI.prototype, 'shadow', void 0),
    ye([Gh()], t.UI.prototype, 'innerShadow', void 0),
    ye([Gh()], t.UI.prototype, 'blur', void 0),
    ye([Gh()], t.UI.prototype, 'backgroundBlur', void 0),
    ye([Gh()], t.UI.prototype, 'grayscale', void 0),
    ye([Gh()], t.UI.prototype, 'filter', void 0),
    ye([Ro()], t.UI.prototype, 'placeholderColor', void 0),
    ye([_o(100)], t.UI.prototype, 'placeholderDelay', void 0),
    ye([_o({})], t.UI.prototype, 'data', void 0),
    ye([Go(t.Leaf.prototype.reset)], t.UI.prototype, 'reset', null),
    (t.UI = Fl = ye([qo(Ol), qo(Dl), jo()], t.UI)),
    (t.Group = class extends t.UI {
      get __tag() {
        return 'Group'
      }
      get isBranch() {
        return !0
      }
      reset(t) {
        this.__setBranch(), super.reset(t)
      }
      __setBranch() {
        this.children || (this.children = [])
      }
      set(t, e) {
        if (t)
          if (t.children) {
            const { children: i } = t
            delete t.children,
              this.children ? this.clear() : this.__setBranch(),
              super.set(t, e),
              i.forEach(t => this.add(t)),
              (t.children = i)
          } else super.set(t, e)
      }
      toJSON(t) {
        const e = super.toJSON(t)
        return this.childlessJSON || (e.children = this.children.map(e => e.toJSON(t))), e
      }
      pick(t, e) {}
      addAt(t, e) {
        this.add(t, e)
      }
      addAfter(t, e) {
        this.add(t, this.children.indexOf(e) + 1)
      }
      addBefore(t, e) {
        this.add(t, this.children.indexOf(e))
      }
      add(t, e) {}
      addMany(...t) {}
      remove(t, e) {}
      removeAll(t) {}
      clear() {}
    }),
    ye([Ho(_l)], t.Group.prototype, '__', void 0),
    ye([xo(0)], t.Group.prototype, 'width', void 0),
    ye([xo(0)], t.Group.prototype, 'height', void 0),
    (t.Group = ye([qo(t.Branch), Zo()], t.Group))
  const zl = ie.get('Leafer')
  ;(t.Leafer = Wl =
    class extends t.Group {
      get __tag() {
        return 'Leafer'
      }
      get isApp() {
        return !1
      }
      get app() {
        return this.parent || this
      }
      get isLeafer() {
        return !0
      }
      get imageReady() {
        return this.viewReady && eo.isComplete
      }
      get layoutLocked() {
        return !this.layouter.running
      }
      get view() {
        return this.canvas && this.canvas.view
      }
      get FPS() {
        return this.renderer ? this.renderer.FPS : 60
      }
      get cursorPoint() {
        return (this.interaction && this.interaction.hoverData) || { x: this.width / 2, y: this.height / 2 }
      }
      get clientBounds() {
        return (this.canvas && this.canvas.getClientBounds(!0)) || { x: 0, y: 0, width: 0, height: 0 }
      }
      constructor(t, e) {
        super(e),
          (this.config = { start: !0, hittable: !0, smooth: !0, lazySpeard: 100 }),
          (this.leafs = 0),
          (this.__eventIds = []),
          (this.__controllers = []),
          (this.__readyWait = []),
          (this.__viewReadyWait = []),
          (this.__viewCompletedWait = []),
          (this.__nextRenderWait = []),
          (this.userConfig = t),
          t && (t.view || t.width) && this.init(t),
          Wl.list.add(this)
      }
      init(t, e) {
        if (this.canvas) return
        let i
        const { config: s } = this
        this.__setLeafer(this),
          e && ((this.parentApp = e), this.__bindApp(e), (i = e.running)),
          t && ((this.parent = e), this.initType(t.type), (this.parent = void 0), _.assign(s, t))
        const n = (this.canvas = de.canvas(s))
        this.__controllers.push(
          (this.renderer = de.renderer(this, n, s)),
          (this.watcher = de.watcher(this, s)),
          (this.layouter = de.layouter(this, s))
        ),
          this.isApp && this.__setApp(),
          this.__checkAutoLayout(),
          e ||
            ((this.selector = de.selector(this)),
            (this.interaction = de.interaction(this, n, this.selector, s)),
            this.interaction && (this.__controllers.unshift(this.interaction), (this.hitCanvasManager = de.hitCanvasManager())),
            (this.canvasManager = new me()),
            (i = s.start)),
          (this.hittable = s.hittable),
          (this.fill = s.fill),
          this.canvasManager.add(n),
          this.__listenEvents(),
          i && (this.__startTimer = setTimeout(this.start.bind(this))),
          Br.run(this.__initWait),
          this.onInit()
      }
      onInit() {}
      initType(t) {}
      set(t, e) {
        this.waitInit(() => {
          super.set(t, e)
        })
      }
      start() {
        clearTimeout(this.__startTimer),
          !this.running &&
            this.canvas &&
            ((this.running = !0),
            this.ready ? this.emitLeafer(ta.RESTART) : this.emitLeafer(ta.START),
            this.__controllers.forEach(t => t.start()),
            this.isApp || this.renderer.render())
      }
      stop() {
        clearTimeout(this.__startTimer),
          this.running &&
            this.canvas &&
            (this.__controllers.forEach(t => t.stop()), (this.running = !1), this.emitLeafer(ta.STOP))
      }
      unlockLayout() {
        this.layouter.start(), this.updateLayout()
      }
      lockLayout() {
        this.updateLayout(), this.layouter.stop()
      }
      resize(t) {
        const e = _.copyAttrs({}, t, Oe)
        Object.keys(e).forEach(t => (this[t] = e[t]))
      }
      forceRender(t, e) {
        const { renderer: i } = this
        i && (i.addBlock(t ? new $t(t) : this.canvas.bounds), this.viewReady && (e ? i.render() : i.update()))
      }
      requestRender(t = !1) {
        this.renderer && this.renderer.update(t)
      }
      updateCursor(t) {
        const e = this.interaction
        e && (t ? e.setCursor(t) : e.updateCursor())
      }
      updateLazyBounds() {
        this.lazyBounds = this.canvas.bounds.clone().spread(this.config.lazySpeard)
      }
      __doResize(t) {
        const { canvas: e } = this
        if (!e || e.isSameSize(t)) return
        const i = _.copyAttrs({}, this.canvas, Oe)
        e.resize(t), this.updateLazyBounds(), this.__onResize(new Zr(t, i))
      }
      __onResize(t) {
        this.emitEvent(t),
          _.copyAttrs(this.__, t, Oe),
          setTimeout(() => {
            this.canvasManager && this.canvasManager.clearRecycled()
          }, 0)
      }
      __setApp() {}
      __bindApp(t) {
        ;(this.selector = t.selector),
          (this.interaction = t.interaction),
          (this.canvasManager = t.canvasManager),
          (this.hitCanvasManager = t.hitCanvasManager)
      }
      __setLeafer(t) {
        ;(this.leafer = t), (this.__level = 1)
      }
      __checkAutoLayout() {
        const { config: t, parentApp: e } = this
        e ||
          ((t.width && t.height) || (this.autoLayout = new Qt(t)),
          this.canvas.startAutoLayout(this.autoLayout, this.__onResize.bind(this)))
      }
      __setAttr(t, e) {
        return (
          this.canvas &&
            (Oe.includes(t)
              ? this.__changeCanvasSize(t, e)
              : 'fill' === t
              ? this.__changeFill(e)
              : 'hittable' === t
              ? this.parent || (this.canvas.hittable = e)
              : 'zIndex' === t
              ? ((this.canvas.zIndex = e), setTimeout(() => this.parent && this.parent.__updateSortChildren()))
              : 'mode' === t && this.emit(ta.UPDATE_MODE, { mode: e })),
          super.__setAttr(t, e)
        )
      }
      __getAttr(t) {
        return this.canvas && Oe.includes(t) ? this.canvas[t] : super.__getAttr(t)
      }
      __changeCanvasSize(t, e) {
        const { config: i, canvas: s } = this,
          n = _.copyAttrs({}, s, Oe)
        ;(n[t] = i[t] = e), i.width && i.height ? s.stopAutoLayout() : this.__checkAutoLayout(), this.__doResize(n)
      }
      __changeFill(t) {
        ;(this.config.fill = t), this.canvas.allowBackgroundColor ? (this.canvas.backgroundColor = t) : this.forceRender()
      }
      __onCreated() {
        this.created = !0
      }
      __onReady() {
        ;(this.ready = !0),
          this.emitLeafer(ta.BEFORE_READY),
          this.emitLeafer(ta.READY),
          this.emitLeafer(ta.AFTER_READY),
          Br.run(this.__readyWait)
      }
      __onViewReady() {
        this.viewReady || ((this.viewReady = !0), this.emitLeafer(ta.VIEW_READY), Br.run(this.__viewReadyWait))
      }
      __onLayoutEnd() {
        const { grow: t, width: e, height: i } = this.config
        if (t) {
          let { width: s, height: n, pixelRatio: o } = this
          const r = 'box' === t ? this.worldBoxBounds : this.__world
          e || (s = Math.max(1, r.x + r.width)),
            i || (n = Math.max(1, r.y + r.height)),
            this.__doResize({ width: s, height: n, pixelRatio: o })
        }
        this.ready || this.__onReady()
      }
      __onNextRender() {
        if (this.viewReady) {
          Br.run(this.__nextRenderWait)
          const { imageReady: t } = this
          t && !this.viewCompleted && this.__checkViewCompleted(), t || ((this.viewCompleted = !1), this.requestRender())
        } else this.requestRender()
      }
      __checkViewCompleted(t = !0) {
        this.nextRender(() => {
          this.imageReady &&
            (t && this.emitLeafer(ta.VIEW_COMPLETED), Br.run(this.__viewCompletedWait), (this.viewCompleted = !0))
        })
      }
      __onWatchData() {
        this.watcher.childrenChanged && this.interaction && this.nextRender(() => this.interaction.updateCursor())
      }
      waitInit(t, e) {
        e && (t = t.bind(e)), this.__initWait || (this.__initWait = []), this.canvas ? t() : this.__initWait.push(t)
      }
      waitReady(t, e) {
        e && (t = t.bind(e)), this.ready ? t() : this.__readyWait.push(t)
      }
      waitViewReady(t, e) {
        e && (t = t.bind(e)), this.viewReady ? t() : this.__viewReadyWait.push(t)
      }
      waitViewCompleted(t, e) {
        e && (t = t.bind(e)),
          this.__viewCompletedWait.push(t),
          this.viewCompleted ? this.__checkViewCompleted(!1) : this.running || this.start()
      }
      nextRender(t, e, i) {
        e && (t = t.bind(e))
        const s = this.__nextRenderWait
        if (i) {
          for (let e = 0; e < s.length; e++)
            if (s[e] === t) {
              s.splice(e, 1)
              break
            }
        } else s.push(t)
        this.requestRender()
      }
      zoom(t, e, i, s) {
        return le.need('view')
      }
      getValidMove(t, e, i) {
        return { x: t, y: e }
      }
      getValidScale(t) {
        return t
      }
      getWorldPointByClient(t, e) {
        return this.interaction && this.interaction.getLocal(t, e)
      }
      getPagePointByClient(t, e) {
        return this.getPagePoint(this.getWorldPointByClient(t, e))
      }
      getClientPointByWorld(t) {
        const { x: e, y: i } = this.clientBounds
        return { x: e + t.x, y: i + t.y }
      }
      updateClientBounds() {
        this.canvas && this.canvas.updateClientBounds()
      }
      receiveEvent(t) {}
      emitLeafer(t) {
        this.emitEvent(new ta(t, this))
      }
      __listenEvents() {
        const t = re.start('FirstCreate ' + this.innerName)
        this.once([
          [ta.START, () => re.end(t)],
          [Jr.START, this.updateLazyBounds, this],
          [Qr.START, this.__onCreated, this],
          [Qr.END, this.__onViewReady, this]
        ]),
          this.__eventIds.push(
            this.on_([
              [$r.DATA, this.__onWatchData, this],
              [Jr.END, this.__onLayoutEnd, this],
              [Qr.NEXT, this.__onNextRender, this]
            ])
          )
      }
      __removeListenEvents() {
        this.off_(this.__eventIds)
      }
      destroy(t) {
        const e = () => {
          if (!this.destroyed) {
            Wl.list.remove(this)
            try {
              this.stop(),
                this.emitLeafer(ta.END),
                this.__removeListenEvents(),
                this.__controllers.forEach(t => !(this.parent && t === this.interaction) && t.destroy()),
                (this.__controllers.length = 0),
                this.parent ||
                  (this.selector && this.selector.destroy(),
                  this.hitCanvasManager && this.hitCanvasManager.destroy(),
                  this.canvasManager && this.canvasManager.destroy()),
                this.canvas && this.canvas.destroy(),
                (this.config.view = this.parentApp = null),
                this.userConfig && (this.userConfig.view = null),
                super.destroy(),
                setTimeout(() => {
                  so.clearRecycled()
                }, 100)
            } catch (t) {
              zl.error(t)
            }
          }
        }
        t ? e() : setTimeout(e)
      }
    }),
    (t.Leafer.list = new vh()),
    ye([Ho(ml)], t.Leafer.prototype, '__', void 0),
    ye([xo()], t.Leafer.prototype, 'pixelRatio', void 0),
    ye([_o('normal')], t.Leafer.prototype, 'mode', void 0),
    (t.Leafer = Wl = ye([Zo()], t.Leafer)),
    (t.Rect = class extends t.UI {
      get __tag() {
        return 'Rect'
      }
    }),
    ye([Ho(wl)], t.Rect.prototype, '__', void 0),
    (t.Rect = ye([qo(Il), jo(), Zo()], t.Rect))
  const { add: Ul, includes: Hl, scroll: Nl } = jt,
    Yl = t.Rect.prototype,
    Xl = t.Group.prototype
  ;(t.Box = class extends t.Group {
    get __tag() {
      return 'Box'
    }
    get isBranchLeaf() {
      return !0
    }
    constructor(t) {
      super(t), this.__layout.renderChanged || this.__layout.renderChange()
    }
    __updateStrokeSpread() {
      return 0
    }
    __updateRectRenderSpread() {
      return 0
    }
    __updateRenderSpread() {
      return this.__updateRectRenderSpread() || -1
    }
    __updateRectBoxBounds() {}
    __updateBoxBounds(t) {
      if (this.children.length && !this.pathInputed) {
        const t = this.__
        if (t.__autoSide) {
          t.__hasSurface && this.__extraUpdate(), super.__updateBoxBounds()
          const { boxBounds: e } = this.__layout
          t.__autoSize ||
            (t.__autoWidth
              ? ((e.width += e.x), (e.x = 0), (e.height = t.height), (e.y = 0))
              : ((e.height += e.y), (e.y = 0), (e.width = t.width), (e.x = 0))),
            this.__updateNaturalSize()
        } else this.__updateRectBoxBounds()
      } else this.__updateRectBoxBounds()
    }
    __updateStrokeBounds() {}
    __updateRenderBounds() {
      let t, e
      if (this.children.length) {
        const i = this.__,
          s = this.__layout,
          { renderBounds: n, boxBounds: o } = s,
          { overflow: r } = i,
          a = s.childrenRenderBounds || (s.childrenRenderBounds = { x: 0, y: 0, width: 0, height: 0 })
        super.__updateRenderBounds(a),
          (e = r && r.includes('scroll')) && (Ul(a, o), Nl(a, i)),
          this.__updateRectRenderBounds(),
          (t = !Hl(o, a)),
          t && 'show' === r && Ul(n, a)
      } else this.__updateRectRenderBounds()
      _.stintSet(this, 'isOverflow', t), this.__checkScroll(e)
    }
    __updateRectRenderBounds() {}
    __checkScroll(t) {}
    __updateRectChange() {}
    __updateChange() {
      super.__updateChange(), this.__updateRectChange()
    }
    __renderRect(t, e) {}
    __renderGroup(t, e) {}
    __render(t, e) {
      this.__.__drawAfterFill
        ? this.__renderRect(t, e)
        : (this.__renderRect(t, e), this.children.length && this.__renderGroup(t, e)),
        this.hasScroller && this.scroller.__render(t, e)
    }
    __drawContent(t, e) {
      this.__renderGroup(t, e),
        (this.__.__useStroke || this.__.__useEffect) && (t.setWorld(this.__nowWorld), this.__drawRenderPath(t))
    }
  }),
    ye([Ho(fl)], t.Box.prototype, '__', void 0),
    ye([xo(100)], t.Box.prototype, 'width', void 0),
    ye([xo(100)], t.Box.prototype, 'height', void 0),
    ye([_o(!1)], t.Box.prototype, 'resizeChildren', void 0),
    ye([Lo('show')], t.Box.prototype, 'overflow', void 0),
    ye([Go(Yl.__updateStrokeSpread)], t.Box.prototype, '__updateStrokeSpread', null),
    ye([Go(Yl.__updateRenderSpread)], t.Box.prototype, '__updateRectRenderSpread', null),
    ye([Go(Yl.__updateBoxBounds)], t.Box.prototype, '__updateRectBoxBounds', null),
    ye([Go(Yl.__updateStrokeBounds)], t.Box.prototype, '__updateStrokeBounds', null),
    ye([Go(Yl.__updateRenderBounds)], t.Box.prototype, '__updateRectRenderBounds', null),
    ye([Go(Yl.__updateChange)], t.Box.prototype, '__updateRectChange', null),
    ye([Go(Yl.__render)], t.Box.prototype, '__renderRect', null),
    ye([Go(Xl.__render)], t.Box.prototype, '__renderGroup', null),
    (t.Box = ye([jo(), Zo()], t.Box)),
    (t.Frame = class extends t.Box {
      get __tag() {
        return 'Frame'
      }
      get isFrame() {
        return !0
      }
    }),
    ye([Ho(yl)], t.Frame.prototype, '__', void 0),
    ye([Ro('#FFFFFF')], t.Frame.prototype, 'fill', void 0),
    ye([Lo('hide')], t.Frame.prototype, 'overflow', void 0),
    (t.Frame = ye([Zo()], t.Frame))
  const { moveTo: Vl, closePath: Gl, ellipse: jl } = ks
  ;(t.Ellipse = class extends t.UI {
    get __tag() {
      return 'Ellipse'
    }
    __updatePath() {
      const { width: t, height: e, innerRadius: i, startAngle: s, endAngle: n } = this.__,
        o = t / 2,
        r = e / 2,
        a = (this.__.path = [])
      i
        ? s || n
          ? (i < 1 && jl(a, o, r, o * i, r * i, 0, s, n, !1), jl(a, o, r, o, r, 0, n, s, !0))
          : (i < 1 && (jl(a, o, r, o * i, r * i), Vl(a, t, r)), jl(a, o, r, o, r, 0, 360, 0, !0))
        : s || n
        ? (Vl(a, o, r), jl(a, o, r, o, r, 0, s, n, !1))
        : jl(a, o, r, o, r),
        Gl(a),
        w.ellipseToCurve && (this.__.path = this.getPath(!0))
    }
  }),
    ye([Ho(xl)], t.Ellipse.prototype, '__', void 0),
    ye([So(0)], t.Ellipse.prototype, 'innerRadius', void 0),
    ye([So(0)], t.Ellipse.prototype, 'startAngle', void 0),
    ye([So(0)], t.Ellipse.prototype, 'endAngle', void 0),
    (t.Ellipse = ye([Zo()], t.Ellipse))
  const { sin: Kl, cos: ql, PI: Zl } = Math,
    { moveTo: $l, lineTo: Jl, closePath: Ql, drawPoints: td } = ks
  ;(t.Polygon = class extends t.UI {
    get __tag() {
      return 'Polygon'
    }
    __updatePath() {
      const t = this.__,
        e = (t.path = [])
      if (t.points) td(e, t.points, t.curve, !0)
      else {
        const { width: i, height: s, sides: n } = t,
          o = i / 2,
          r = s / 2
        $l(e, o, 0)
        for (let t = 1; t < n; t++) Jl(e, o + o * Kl((2 * t * Zl) / n), r - r * ql((2 * t * Zl) / n))
        Ql(e)
      }
    }
  }),
    ye([Ho(bl)], t.Polygon.prototype, '__', void 0),
    ye([So(3)], t.Polygon.prototype, 'sides', void 0),
    ye([So()], t.Polygon.prototype, 'points', void 0),
    ye([So(0)], t.Polygon.prototype, 'curve', void 0),
    (t.Polygon = ye([jo(), Zo()], t.Polygon))
  const { sin: ed, cos: id, PI: sd } = Math,
    { moveTo: nd, lineTo: od, closePath: rd } = ks
  ;(t.Star = class extends t.UI {
    get __tag() {
      return 'Star'
    }
    __updatePath() {
      const { width: t, height: e, corners: i, innerRadius: s } = this.__,
        n = t / 2,
        o = e / 2,
        r = (this.__.path = [])
      nd(r, n, 0)
      for (let t = 1; t < 2 * i; t++)
        od(r, n + (t % 2 == 0 ? n : n * s) * ed((t * sd) / i), o - (t % 2 == 0 ? o : o * s) * id((t * sd) / i))
      rd(r)
    }
  }),
    ye([Ho(El)], t.Star.prototype, '__', void 0),
    ye([So(5)], t.Star.prototype, 'corners', void 0),
    ye([So(0.382)], t.Star.prototype, 'innerRadius', void 0),
    (t.Star = ye([Zo()], t.Star))
  const { moveTo: ad, lineTo: hd, drawPoints: ld } = ks,
    { rotate: dd, getAngle: cd, getDistance: ud, defaultPoint: pd } = ut
  ;(t.Line = class extends t.UI {
    get __tag() {
      return 'Line'
    }
    get toPoint() {
      const { width: t, rotation: e } = this.__,
        i = { x: 0, y: 0 }
      return t && (i.x = t), e && dd(i, e), i
    }
    set toPoint(t) {
      ;(this.width = ud(pd, t)), (this.rotation = cd(pd, t)), this.height && (this.height = 0)
    }
    __updatePath() {
      const t = this.__,
        e = (t.path = [])
      t.points ? ld(e, t.points, t.curve, t.closed) : (ad(e, 0, 0), hd(e, this.width, 0))
    }
  }),
    ye([Ho(vl)], t.Line.prototype, '__', void 0),
    ye([ko('center')], t.Line.prototype, 'strokeAlign', void 0),
    ye([xo(0)], t.Line.prototype, 'height', void 0),
    ye([So()], t.Line.prototype, 'points', void 0),
    ye([So(0)], t.Line.prototype, 'curve', void 0),
    ye([So(!1)], t.Line.prototype, 'closed', void 0),
    (t.Line = ye([Zo()], t.Line)),
    (t.Image = class extends t.Rect {
      get __tag() {
        return 'Image'
      }
      get ready() {
        const { image: t } = this
        return t && t.ready
      }
      get image() {
        const { fill: t } = this.__
        return c(t) && t[0].image
      }
    }),
    ye([Ho(Pl)], t.Image.prototype, '__', void 0),
    ye([xo('')], t.Image.prototype, 'url', void 0),
    (t.Image = ye([Zo()], t.Image))
  const gd = t.Image
  ;(t.Canvas = class extends t.Rect {
    get __tag() {
      return 'Canvas'
    }
    get context() {
      return this.canvas.context
    }
    get ready() {
      return !this.url
    }
    constructor(t) {
      super(t), (this.canvas = de.canvas(this.__)), t && t.url && this.drawImage(t.url)
    }
    drawImage(t) {
      new ao({ url: t }).load(t => {
        this.context.drawImage(t.view, 0, 0), (this.url = void 0), this.paint(), this.emitEvent(new Yr(Yr.LOADED, { image: t }))
      })
    }
    draw(t, e, i, s) {
      const n = new wt(t.worldTransform).invert(),
        o = new wt()
      e && o.translate(e.x, e.y),
        i && (h(i) ? o.scale(i) : o.scale(i.x, i.y)),
        s && o.rotate(s),
        n.multiplyParent(o),
        t.__render(this.canvas, { matrix: n.withScale() }),
        this.paint()
    }
    paint() {
      this.forceRender()
    }
    __drawContent(t, e) {
      const { width: i, height: s } = this.__,
        { view: n } = this.canvas
      t.drawImage(n, 0, 0, n.width, n.height, 0, 0, i, s)
    }
    __updateSize() {
      const { canvas: t } = this
      if (t) {
        const { smooth: e, safeResize: i } = this.__
        t.resize(this.__, i), t.smooth !== e && (t.smooth = e)
      }
    }
    destroy() {
      this.canvas && (this.canvas.destroy(), (this.canvas = null)), super.destroy()
    }
  }),
    ye([Ho(Ll)], t.Canvas.prototype, '__', void 0),
    ye([jh(100)], t.Canvas.prototype, 'width', void 0),
    ye([jh(100)], t.Canvas.prototype, 'height', void 0),
    ye([jh(1)], t.Canvas.prototype, 'pixelRatio', void 0),
    ye([jh(!0)], t.Canvas.prototype, 'smooth', void 0),
    ye([_o(!1)], t.Canvas.prototype, 'safeResize', void 0),
    ye([jh()], t.Canvas.prototype, 'contextSettings', void 0),
    (t.Canvas = ye([Zo()], t.Canvas))
  const { copyAndSpread: _d, includes: fd, spread: md, setList: yd } = jt,
    { stintSet: vd } = _
  ;(t.Text = class extends t.UI {
    get __tag() {
      return 'Text'
    }
    get textDrawData() {
      return this.updateLayout(), this.__.__textDrawData
    }
    __updateTextDrawData() {
      const t = this.__,
        {
          lineHeight: e,
          letterSpacing: i,
          fontFamily: s,
          fontSize: n,
          fontWeight: o,
          italic: r,
          textCase: a,
          textOverflow: h,
          padding: l,
          width: d,
          height: c
        } = t
      ;(t.__lineHeight = $h.number(e, n)),
        (t.__letterSpacing = $h.number(i, n)),
        (t.__baseLine = t.__lineHeight - (t.__lineHeight - 0.7 * n) / 2),
        (t.__font = `${r ? 'italic ' : ''}${'small-caps' === a ? 'small-caps ' : ''}${'normal' !== o ? o + ' ' : ''}${
          n || 12
        }px ${s || 'caption'}`),
        vd(t, '__padding', l && z.fourNumber(l)),
        vd(t, '__clipText', 'show' !== h && !t.__autoSize),
        vd(t, '__isCharMode', d || c || t.__letterSpacing || 'none' !== a),
        (t.__textDrawData = qh.getDrawData((t.__isPlacehold = t.placeholder && '' === t.text) ? t.placeholder : t.text, this.__))
    }
    __updateBoxBounds() {
      const t = this.__,
        e = this.__layout,
        { fontSize: i, italic: s, padding: n, __autoWidth: o, __autoHeight: r } = t
      this.__updateTextDrawData()
      const { bounds: a } = t.__textDrawData,
        h = e.boxBounds
      if (((e.contentBounds = a), t.__lineHeight < i && md(a, i / 2), o || r)) {
        if (
          ((h.x = o ? a.x : 0), (h.y = r ? a.y : 0), (h.width = o ? a.width : t.width), (h.height = r ? a.height : t.height), n)
        ) {
          const [e, i, s, n] = t.__padding
          o && ((h.x -= n), (h.width += i + n)), r && ((h.y -= e), (h.height += s + e))
        }
        this.__updateNaturalSize()
      } else super.__updateBoxBounds()
      s && (h.width += 0.16 * i),
        _.stintSet(this, 'isOverflow', !fd(h, a)),
        this.isOverflow ? (yd((t.__textBoxBounds = {}), [h, a]), (e.renderChanged = !0)) : (t.__textBoxBounds = h)
    }
    __updateRenderSpread() {
      let t = super.__updateRenderSpread()
      return t || (t = this.isOverflow ? 1 : 0), t
    }
    __updateRenderBounds() {
      const { renderBounds: t, renderSpread: e } = this.__layout
      _d(t, this.__.__textBoxBounds, e), this.__box && (this.__box.__layout.renderBounds = t)
    }
    __updateChange() {
      super.__updateChange()
      const t = this.__box
      t && (t.__onUpdateSize(), t.__updateChange())
    }
    __drawRenderPath(t) {
      t.font = this.__.__font
    }
    __draw(t, e, i) {
      const s = this.__box
      s && ((s.__nowWorld = this.__nowWorld), s.__draw(t, e, i)), (this.textEditing && !e.exporting) || super.__draw(t, e, i)
    }
    __drawShape(t, e) {
      e.shape && this.__box && this.__box.__drawShape(t, e), super.__drawShape(t, e)
    }
    destroy() {
      this.boxStyle && (this.boxStyle = null), super.destroy()
    }
  }),
    ye([Ho(Bl)], t.Text.prototype, '__', void 0),
    ye([xo(0)], t.Text.prototype, 'width', void 0),
    ye([xo(0)], t.Text.prototype, 'height', void 0),
    ye([Ro()], t.Text.prototype, 'boxStyle', void 0),
    ye([_o(!1)], t.Text.prototype, 'resizeFontSize', void 0),
    ye([Ro('#000000')], t.Text.prototype, 'fill', void 0),
    ye([ko('outside')], t.Text.prototype, 'strokeAlign', void 0),
    ye([zo('all')], t.Text.prototype, 'hitFill', void 0),
    ye([xo('')], t.Text.prototype, 'text', void 0),
    ye([xo('')], t.Text.prototype, 'placeholder', void 0),
    ye([xo('caption')], t.Text.prototype, 'fontFamily', void 0),
    ye([xo(12)], t.Text.prototype, 'fontSize', void 0),
    ye([xo('normal')], t.Text.prototype, 'fontWeight', void 0),
    ye([xo(!1)], t.Text.prototype, 'italic', void 0),
    ye([xo('none')], t.Text.prototype, 'textCase', void 0),
    ye([xo('none')], t.Text.prototype, 'textDecoration', void 0),
    ye([xo(0)], t.Text.prototype, 'letterSpacing', void 0),
    ye([xo({ type: 'percent', value: 1.5 })], t.Text.prototype, 'lineHeight', void 0),
    ye([xo(0)], t.Text.prototype, 'paraIndent', void 0),
    ye([xo(0)], t.Text.prototype, 'paraSpacing', void 0),
    ye([xo('x')], t.Text.prototype, 'writingMode', void 0),
    ye([xo('left')], t.Text.prototype, 'textAlign', void 0),
    ye([xo('top')], t.Text.prototype, 'verticalAlign', void 0),
    ye([xo(!0)], t.Text.prototype, 'autoSizeAlign', void 0),
    ye([xo('normal')], t.Text.prototype, 'textWrap', void 0),
    ye([xo('show')], t.Text.prototype, 'textOverflow', void 0),
    ye([Ro(!1)], t.Text.prototype, 'textEditing', void 0),
    (t.Text = ye([Zo()], t.Text)),
    (t.Path = class extends t.UI {
      get __tag() {
        return 'Path'
      }
    }),
    ye([Ho(Tl)], t.Path.prototype, '__', void 0),
    ye([ko('center')], t.Path.prototype, 'strokeAlign', void 0),
    (t.Path = ye([Zo()], t.Path)),
    (t.Pen = class extends t.Group {
      get __tag() {
        return 'Pen'
      }
      setStyle(e) {
        const i = (this.pathElement = new t.Path(e))
        return (this.pathStyle = e), (this.__path = i.path || (i.path = [])), this.add(i), this
      }
      beginPath() {
        return this
      }
      moveTo(t, e) {
        return this
      }
      lineTo(t, e) {
        return this
      }
      bezierCurveTo(t, e, i, s, n, o) {
        return this
      }
      quadraticCurveTo(t, e, i, s) {
        return this
      }
      closePath() {
        return this
      }
      rect(t, e, i, s) {
        return this
      }
      roundRect(t, e, i, s, n) {
        return this
      }
      ellipse(t, e, i, s, n, o, r, a) {
        return this
      }
      arc(t, e, i, s, n, o) {
        return this
      }
      arcTo(t, e, i, s, n) {
        return this
      }
      drawEllipse(t, e, i, s, n, o, r, a) {
        return this
      }
      drawArc(t, e, i, s, n, o) {
        return this
      }
      drawPoints(t, e, i) {
        return this
      }
      clearPath() {
        return this
      }
      paint() {
        this.pathElement.__layout.boxChanged || this.pathElement.forceUpdate('path')
      }
    }),
    ye([Ho(Sl)], t.Pen.prototype, '__', void 0),
    ye(
      [
        (t, e) => {
          ho(t, e, {
            get() {
              return this.__path
            }
          })
        }
      ],
      t.Pen.prototype,
      'path',
      void 0
    ),
    (t.Pen = ye([qo(Ys, ['set', 'path', 'paint']), Zo()], t.Pen)),
    (t.App = class extends t.Leafer {
      get __tag() {
        return 'App'
      }
      get isApp() {
        return !0
      }
      constructor(t, e) {
        super(t, e)
      }
      init(t, e) {
        if ((super.init(t, e), t)) {
          const { ground: e, tree: i, sky: s, editor: n } = t
          e && (this.ground = this.addLeafer(e)),
            (i || n) && (this.tree = this.addLeafer(i || { type: t.type || 'design' })),
            (s || n) && (this.sky = this.addLeafer(s)),
            n && de.editor(n, this)
        }
      }
      __setApp() {
        const { canvas: t } = this,
          { realCanvas: e, view: i } = this.config
        e || i === this.canvas.view || !t.parentView ? (this.realCanvas = !0) : t.unrealCanvas(),
          (this.leafer = this),
          this.watcher.disable(),
          this.layouter.disable()
      }
      __updateLocalBounds() {
        this.forEach(t => t.updateLayout()), super.__updateLocalBounds()
      }
      start() {
        super.start(), this.forEach(t => t.start())
      }
      stop() {
        this.forEach(t => t.stop()), super.stop()
      }
      unlockLayout() {
        super.unlockLayout(), this.forEach(t => t.unlockLayout())
      }
      lockLayout() {
        super.lockLayout(), this.forEach(t => t.lockLayout())
      }
      forceRender(t, e) {
        this.forEach(i => i.forceRender(t, e))
      }
      addLeafer(e) {
        const i = new t.Leafer(e)
        return this.add(i), i
      }
      add(t, e) {
        if (!t.view) {
          if (this.realCanvas && !this.canvas.bounds) return void setTimeout(() => this.add(t, e), 10)
          t.init(this.__getChildConfig(t.userConfig), this)
        }
        super.add(t, e), n(e) || (t.canvas.childIndex = e), this.__listenChildEvents(t)
      }
      forEach(t) {
        this.children.forEach(t)
      }
      __onCreated() {
        this.created = this.children.every(t => t.created)
      }
      __onReady() {
        this.children.every(t => t.ready) && super.__onReady()
      }
      __onViewReady() {
        this.children.every(t => t.viewReady) && super.__onViewReady()
      }
      __onChildRenderEnd(t) {
        this.renderer.addBlock(t.renderBounds), this.viewReady && this.renderer.update()
      }
      __render(t, e) {
        t.context && this.forEach(i => (e.matrix ? i.__render(t, e) : t.copyWorld(i.canvas, e.bounds)))
      }
      __onResize(t) {
        this.forEach(e => e.resize(t)), super.__onResize(t)
      }
      updateLayout() {
        this.forEach(t => t.updateLayout())
      }
      __getChildConfig(t) {
        const e = Object.assign({}, this.config)
        return (
          (e.hittable = e.realCanvas = void 0),
          t && _.assign(e, t),
          this.autoLayout && _.copyAttrs(e, this, Oe),
          (e.view = this.realCanvas ? void 0 : this.view),
          (e.fill = void 0),
          e
        )
      }
      __listenChildEvents(t) {
        t.once([
          [Jr.END, this.__onReady, this],
          [Qr.START, this.__onCreated, this],
          [Qr.END, this.__onViewReady, this]
        ]),
          this.realCanvas && this.__eventIds.push(t.on_(Qr.END, this.__onChildRenderEnd, this))
      }
    }),
    (t.App = ye([Zo()], t.App))
  const wd = {},
    xd = {
      isHoldSpaceKey: () => xd.isHold('Space'),
      isHold: t => wd[t],
      isHoldKeys: (t, e) => (e ? t(e) : void 0),
      setDownCode(t) {
        wd[t] || (wd[t] = !0)
      },
      setUpCode(t) {
        wd[t] = !1
      }
    },
    bd = {
      LEFT: 1,
      RIGHT: 2,
      MIDDLE: 4,
      defaultLeft(t) {
        t.buttons || (t.buttons = 1)
      },
      left: t => 1 === t.buttons,
      right: t => 2 === t.buttons,
      middle: t => 4 === t.buttons
    }
  class Ed extends Wr {
    get spaceKey() {
      return xd.isHoldSpaceKey()
    }
    get left() {
      return bd.left(this)
    }
    get right() {
      return bd.right(this)
    }
    get middle() {
      return bd.middle(this)
    }
    constructor(t) {
      super(t.type), (this.bubbles = !0), Object.assign(this, t)
    }
    isHoldKeys(t) {
      return xd.isHoldKeys(t, this)
    }
    getBoxPoint(t) {
      return (t || this.current).getBoxPoint(this)
    }
    getInnerPoint(t) {
      return (t || this.current).getInnerPoint(this)
    }
    getLocalPoint(t) {
      return (t || this.current).getLocalPoint(this)
    }
    getPagePoint() {
      return this.current.getPagePoint(this)
    }
    getInner(t) {
      return this.getInnerPoint(t)
    }
    getLocal(t) {
      return this.getLocalPoint(t)
    }
    getPage() {
      return this.getPagePoint()
    }
    static changeName(t, e) {
      _e.changeName(t, e)
    }
  }
  const { min: Td, max: Sd, abs: kd } = Math,
    { float: Bd, sign: Pd } = z,
    { minX: Ld, maxX: Rd, minY: Cd, maxY: Od } = jt,
    Ad = new $t(),
    Dd = new $t(),
    Md = {
      limitMove(t, e) {
        const { dragBounds: i, dragBoundsType: s } = t
        i && Id.getValidMove(t.__localBoxBounds, Id.getDragBounds(t), s, e, !0), Id.axisMove(t, e)
      },
      limitScaleOf(t, e, i, s) {
        const { dragBounds: n, dragBoundsType: o } = t
        n &&
          Id.getValidScaleOf(
            t.__localBoxBounds,
            Id.getDragBounds(t),
            o,
            t.getLocalPointByInner(t.getInnerPointByBox(e)),
            i,
            s,
            !0
          )
      },
      axisMove(t, e) {
        const { draggable: i } = t
        'x' === i && (e.y = 0), 'y' === i && (e.x = 0)
      },
      getDragBounds(t) {
        const { dragBounds: e } = t
        return 'parent' === e ? t.parent.boxBounds : e
      },
      isInnerMode: (t, e, i, s) => 'inner' === i || ('auto' === i && t[s] > e[s]),
      getValidMove(t, e, i, s, n) {
        const o = t.x + s.x,
          r = t.y + s.y,
          a = o + t.width,
          h = r + t.height,
          l = e.x + e.width,
          d = e.y + e.height
        return (
          n || (s = Object.assign({}, s)),
          Id.isInnerMode(t, e, i, 'width')
            ? o > e.x
              ? (s.x += e.x - o)
              : a < l && (s.x += l - a)
            : o < e.x
            ? (s.x += e.x - o)
            : a > l && (s.x += l - a),
          Id.isInnerMode(t, e, i, 'height')
            ? r > e.y
              ? (s.y += e.y - r)
              : h < d && (s.y += d - h)
            : r < e.y
            ? (s.y += e.y - r)
            : h > d && (s.y += d - h),
          (s.x = Bd(s.x)),
          (s.y = Bd(s.y)),
          s
        )
      },
      getValidScaleOf(t, e, i, s, n, o, r) {
        r || (n = Object.assign({}, n)), Dd.set(e), Ad.set(t).scaleOf(s, n.x, n.y)
        const h = (s.x - t.x) / t.width,
          l = 1 - h,
          d = (s.y - t.y) / t.height,
          c = 1 - d
        let u,
          p,
          g,
          _,
          f = 1,
          m = 1
        return (
          Id.isInnerMode(t, e, i, 'width')
            ? (n.x < 0 && Ad.scaleOf(s, (f = 1 / n.x), 1),
              (g = Bd(Ad.minX - Dd.minX)),
              (_ = Bd(Dd.maxX - Ad.maxX)),
              (u = h && g > 0 ? 1 + g / (h * Ad.width) : 1),
              (p = l && _ > 0 ? 1 + _ / (l * Ad.width) : 1),
              (f *= Sd(u, p)))
            : (n.x < 0 && ((Bd(Ld(t) - Ld(e)) <= 0 || Bd(Rd(e) - Rd(t)) <= 0) && Ad.scaleOf(s, (f = 1 / n.x), 1), Ad.unsign()),
              (g = Bd(Dd.minX - Ad.minX)),
              (_ = Bd(Ad.maxX - Dd.maxX)),
              (u = h && g > 0 ? 1 - g / (h * Ad.width) : 1),
              (p = l && _ > 0 ? 1 - _ / (l * Ad.width) : 1),
              (f *= Td(u, p))),
          Id.isInnerMode(t, e, i, 'height')
            ? (n.y < 0 && Ad.scaleOf(s, 1, (m = 1 / n.y)),
              (g = Bd(Ad.minY - Dd.minY)),
              (_ = Bd(Dd.maxY - Ad.maxY)),
              (u = d && g > 0 ? 1 + g / (d * Ad.height) : 1),
              (p = c && _ > 0 ? 1 + _ / (c * Ad.height) : 1),
              (m *= Sd(u, p)),
              o && ((u = Sd(kd(f), kd(m))), (f = Pd(f) * u), (m = Pd(m) * u)))
            : (n.y < 0 && ((Bd(Cd(t) - Cd(e)) <= 0 || Bd(Od(e) - Od(t)) <= 0) && Ad.scaleOf(s, 1, (m = 1 / n.y)), Ad.unsign()),
              (g = Bd(Dd.minY - Ad.minY)),
              (_ = Bd(Ad.maxY - Dd.maxY)),
              (u = d && g > 0 ? 1 - g / (d * Ad.height) : 1),
              (p = c && _ > 0 ? 1 - _ / (c * Ad.height) : 1),
              (m *= Td(u, p))),
          (n.x *= a(f) ? f : 1),
          (n.y *= a(m) ? m : 1),
          n
        )
      }
    },
    Id = Md
  ;(t.PointerEvent = class extends Ed {}),
    (t.PointerEvent.POINTER = 'pointer'),
    (t.PointerEvent.BEFORE_DOWN = 'pointer.before_down'),
    (t.PointerEvent.BEFORE_MOVE = 'pointer.before_move'),
    (t.PointerEvent.BEFORE_UP = 'pointer.before_up'),
    (t.PointerEvent.DOWN = 'pointer.down'),
    (t.PointerEvent.MOVE = 'pointer.move'),
    (t.PointerEvent.UP = 'pointer.up'),
    (t.PointerEvent.OVER = 'pointer.over'),
    (t.PointerEvent.OUT = 'pointer.out'),
    (t.PointerEvent.ENTER = 'pointer.enter'),
    (t.PointerEvent.LEAVE = 'pointer.leave'),
    (t.PointerEvent.TAP = 'tap'),
    (t.PointerEvent.DOUBLE_TAP = 'double_tap'),
    (t.PointerEvent.CLICK = 'click'),
    (t.PointerEvent.DOUBLE_CLICK = 'double_click'),
    (t.PointerEvent.LONG_PRESS = 'long_press'),
    (t.PointerEvent.LONG_TAP = 'long_tap'),
    (t.PointerEvent.MENU = 'pointer.menu'),
    (t.PointerEvent.MENU_TAP = 'pointer.menu_tap'),
    (t.PointerEvent = ye([$o()], t.PointerEvent))
  const Fd = t.PointerEvent,
    Wd = {}
  ;(t.DragEvent = class extends t.PointerEvent {
    static setList(t) {
      this.list = t instanceof vh ? t : new vh(t)
    }
    static setData(t) {
      this.data = t
    }
    static getValidMove(t, e, i, s = !0) {
      const n = t.getLocalPoint(i, null, !0)
      return ut.move(n, e.x - t.x, e.y - t.y), s && this.limitMove(t, n), Md.axisMove(t, n), n
    }
    static limitMove(t, e) {
      Md.limitMove(t, e)
    }
    getPageMove(t) {
      return this.assignMove(t), this.current.getPagePoint(Wd, null, !0)
    }
    getInnerMove(t, e) {
      return t || (t = this.current), this.assignMove(e), t.getInnerPoint(Wd, null, !0)
    }
    getLocalMove(t, e) {
      return t || (t = this.current), this.assignMove(e), t.getLocalPoint(Wd, null, !0)
    }
    getPageTotal() {
      return this.getPageMove(!0)
    }
    getInnerTotal(t) {
      return this.getInnerMove(t, !0)
    }
    getLocalTotal(t) {
      return this.getLocalMove(t, !0)
    }
    getPageBounds() {
      const t = this.getPageTotal(),
        e = this.getPagePoint(),
        i = {}
      return jt.set(i, e.x - t.x, e.y - t.y, t.x, t.y), jt.unsign(i), i
    }
    assignMove(t) {
      ;(Wd.x = t ? this.totalX : this.moveX), (Wd.y = t ? this.totalY : this.moveY)
    }
  }),
    (t.DragEvent.BEFORE_DRAG = 'drag.before_drag'),
    (t.DragEvent.START = 'drag.start'),
    (t.DragEvent.DRAG = 'drag'),
    (t.DragEvent.END = 'drag.end'),
    (t.DragEvent.OVER = 'drag.over'),
    (t.DragEvent.OUT = 'drag.out'),
    (t.DragEvent.ENTER = 'drag.enter'),
    (t.DragEvent.LEAVE = 'drag.leave'),
    (t.DragEvent = ye([$o()], t.DragEvent))
  const zd = t.DragEvent
  ;(t.DropEvent = class extends t.PointerEvent {
    static setList(e) {
      t.DragEvent.setList(e)
    }
    static setData(e) {
      t.DragEvent.setData(e)
    }
  }),
    (t.DropEvent.DROP = 'drop'),
    (t.DropEvent = ye([$o()], t.DropEvent)),
    (t.MoveEvent = class extends t.DragEvent {}),
    (t.MoveEvent.BEFORE_MOVE = 'move.before_move'),
    (t.MoveEvent.START = 'move.start'),
    (t.MoveEvent.MOVE = 'move'),
    (t.MoveEvent.DRAG_ANIMATE = 'move.drag_animate'),
    (t.MoveEvent.END = 'move.end'),
    (t.MoveEvent.PULL_DOWN = 'move.pull_down'),
    (t.MoveEvent.REACH_BOTTOM = 'move.reach_bottom'),
    (t.MoveEvent = ye([$o()], t.MoveEvent)),
    (t.TouchEvent = class extends Ed {}),
    (t.TouchEvent = ye([$o()], t.TouchEvent))
  const Ud = t.TouchEvent
  ;(t.RotateEvent = class extends t.PointerEvent {}),
    (t.RotateEvent.BEFORE_ROTATE = 'rotate.before_rotate'),
    (t.RotateEvent.START = 'rotate.start'),
    (t.RotateEvent.ROTATE = 'rotate'),
    (t.RotateEvent.END = 'rotate.end'),
    (t.RotateEvent = ye([$o()], t.RotateEvent)),
    (t.SwipeEvent = class extends t.DragEvent {}),
    (t.SwipeEvent.SWIPE = 'swipe'),
    (t.SwipeEvent.LEFT = 'swipe.left'),
    (t.SwipeEvent.RIGHT = 'swipe.right'),
    (t.SwipeEvent.UP = 'swipe.up'),
    (t.SwipeEvent.DOWN = 'swipe.down'),
    (t.SwipeEvent = ye([$o()], t.SwipeEvent)),
    (t.ZoomEvent = class extends t.PointerEvent {}),
    (t.ZoomEvent.BEFORE_ZOOM = 'zoom.before_zoom'),
    (t.ZoomEvent.START = 'zoom.start'),
    (t.ZoomEvent.ZOOM = 'zoom'),
    (t.ZoomEvent.END = 'zoom.end'),
    (t.ZoomEvent = ye([$o()], t.ZoomEvent)),
    (t.KeyEvent = class extends Ed {}),
    (t.KeyEvent.BEFORE_DOWN = 'key.before_down'),
    (t.KeyEvent.BEFORE_UP = 'key.before_up'),
    (t.KeyEvent.DOWN = 'key.down'),
    (t.KeyEvent.HOLD = 'key.hold'),
    (t.KeyEvent.UP = 'key.up'),
    (t.KeyEvent = ye([$o()], t.KeyEvent))
  const Hd = {
      getDragEventData: (t, e, i) =>
        Object.assign(Object.assign({}, i), {
          x: i.x,
          y: i.y,
          moveX: i.x - e.x,
          moveY: i.y - e.y,
          totalX: i.x - t.x,
          totalY: i.y - t.y
        }),
      getDropEventData: (t, e, i) => Object.assign(Object.assign({}, t), { list: e, data: i }),
      getSwipeDirection: e =>
        e < -45 && e > -135
          ? t.SwipeEvent.UP
          : e > 45 && e < 135
          ? t.SwipeEvent.DOWN
          : e <= 45 && e >= -45
          ? t.SwipeEvent.RIGHT
          : t.SwipeEvent.LEFT,
      getSwipeEventData: (t, e, i) =>
        Object.assign(Object.assign({}, i), {
          moveX: e.moveX,
          moveY: e.moveY,
          totalX: i.x - t.x,
          totalY: i.y - t.y,
          type: Nd.getSwipeDirection(ut.getAngle(t, i))
        }),
      getBase(t) {
        const e = 1 === t.button ? 4 : t.button
        return {
          altKey: t.altKey,
          ctrlKey: t.ctrlKey,
          shiftKey: t.shiftKey,
          metaKey: t.metaKey,
          time: Date.now(),
          buttons: n(t.buttons) ? 1 : 0 === t.buttons ? e : t.buttons,
          origin: t
        }
      },
      pathHasEventType(t, e) {
        const { list: i } = t
        for (let t = 0, s = i.length; t < s; t++) if (i[t].hasEvent(e)) return !0
        return !1
      },
      filterPathByEventType(t, e) {
        const i = new vh(),
          { list: s } = t
        for (let t = 0, n = s.length; t < n; t++) s[t].hasEvent(e) && i.add(s[t])
        return i
      },
      pathCanDrag: e => e && e.list.some(e => lr.draggable(e) || (!e.isLeafer && e.hasEvent(t.DragEvent.DRAG))),
      pathHasOutside: t => t && t.list.some(t => t.isOutside)
    },
    Nd = Hd,
    Yd = new vh(),
    { getDragEventData: Xd, getDropEventData: Vd, getSwipeEventData: Gd } = Hd
  class jd {
    constructor(t) {
      ;(this.dragDataList = []), (this.interaction = t)
    }
    setDragData(t) {
      this.animateWait && this.dragEndReal(),
        (this.downData = this.interaction.downData),
        (this.dragData = Xd(t, t, t)),
        (this.canAnimate = this.canDragOut = !0)
    }
    getList(e, i) {
      const { proxy: s } = this.interaction.selector,
        n = s && s.list.length,
        o = t.DragEvent.list || this.draggableList || Yd
      return this.dragging && (n ? (e ? Yd : new vh(i ? [...s.list, ...s.dragHoverExclude] : s.list)) : o)
    }
    checkDrag(e, i) {
      const { interaction: s } = this
      if (this.moving && e.buttons < 1) return (this.canAnimate = !1), void s.pointerCancel()
      !this.moving &&
        i &&
        (this.moving = s.canMove(this.downData) || s.isHoldRightKey || s.isMobileDragEmpty) &&
        ((this.dragData.moveType = 'drag'), s.emit(t.MoveEvent.START, this.dragData)),
        this.moving || this.dragStart(e, i),
        this.drag(e)
    }
    dragStart(e, i) {
      this.dragging ||
        ((this.dragging = i && bd.left(e)),
        this.dragging &&
          (this.interaction.emit(t.DragEvent.START, this.dragData),
          this.getDraggableList(this.dragData.path),
          this.setDragStartPoints((this.realDraggableList = this.getList(!0)))))
    }
    setDragStartPoints(t) {
      ;(this.dragStartPoints = {}), t.forEach(t => (this.dragStartPoints[t.innerId] = { x: t.x, y: t.y }))
    }
    getDraggableList(t) {
      let e
      for (let i = 0, s = t.length; i < s; i++)
        if (((e = t.list[i]), lr.draggable(e))) {
          this.draggableList = new vh(e)
          break
        }
    }
    drag(e) {
      const { interaction: i, dragData: s, downData: n } = this,
        { path: o, throughPath: r } = n
      ;(this.dragData = Xd(n, s, e)),
        r && (this.dragData.throughPath = r),
        (this.dragData.path = o),
        this.dragDataList.push(this.dragData),
        this.moving
          ? ((e.moving = !0),
            (this.dragData.moveType = 'drag'),
            i.emit(t.MoveEvent.BEFORE_MOVE, this.dragData),
            i.emit(t.MoveEvent.MOVE, this.dragData))
          : this.dragging &&
            ((e.dragging = !0),
            this.dragReal(),
            i.emit(t.DragEvent.BEFORE_DRAG, this.dragData),
            i.emit(t.DragEvent.DRAG, this.dragData))
    }
    dragReal(e) {
      const { interaction: i } = this,
        { running: s } = i,
        n = this.realDraggableList
      if (n.length && s) {
        const { totalX: s, totalY: o } = this.dragData,
          { dragLimitAnimate: a } = i.p,
          l = !a || !!e
        n.forEach(i => {
          if (i.draggable) {
            const n = r(i.draggable),
              d = t.DragEvent.getValidMove(i, this.dragStartPoints[i.innerId], { x: s, y: o }, l || n)
            a && !n && e ? lr.animateMove(i, d, h(a) ? a : 0.3) : i.move(d)
          }
        })
      }
    }
    dragOverOrOut(e) {
      const { interaction: i } = this,
        { dragOverPath: s } = this,
        { path: n } = e
      ;(this.dragOverPath = n),
        s
          ? n.indexAt(0) !== s.indexAt(0) && (i.emit(t.DragEvent.OUT, e, s), i.emit(t.DragEvent.OVER, e, n))
          : i.emit(t.DragEvent.OVER, e, n)
    }
    dragEnterOrLeave(e) {
      const { interaction: i } = this,
        { dragEnterPath: s } = this,
        { path: n } = e
      i.emit(t.DragEvent.LEAVE, e, s, n), i.emit(t.DragEvent.ENTER, e, n, s), (this.dragEnterPath = n)
    }
    dragEnd(t) {
      ;(this.dragging || this.moving) && (this.checkDragEndAnimate(t) || this.dragEndReal(t))
    }
    dragEndReal(e) {
      const { interaction: i, downData: s, dragData: n } = this
      e || (e = n)
      const { path: o, throughPath: r } = s,
        a = Xd(s, e, e)
      if (
        (r && (a.throughPath = r),
        (a.path = o),
        this.moving && ((this.moving = !1), (a.moveType = 'drag'), i.emit(t.MoveEvent.END, a)),
        this.dragging)
      ) {
        const o = this.getList()
        ;(this.dragging = !1),
          i.p.dragLimitAnimate && this.dragReal(!0),
          i.emit(t.DragEvent.END, a),
          this.swipe(e, s, n, a),
          this.drop(e, o, this.dragEnterPath)
      }
      this.autoMoveCancel(), this.dragReset(), this.animate(null, 'off')
    }
    swipe(t, e, i, s) {
      const { interaction: n } = this
      if (ut.getDistance(e, t) > n.config.pointer.swipeDistance) {
        const t = Gd(e, i, s)
        this.interaction.emit(t.type, t)
      }
    }
    drop(e, i, s) {
      const n = Vd(e, i, t.DragEvent.data)
      ;(n.path = s), this.interaction.emit(t.DropEvent.DROP, n), this.interaction.emit(t.DragEvent.LEAVE, e, s)
    }
    dragReset() {
      ;(t.DragEvent.list =
        t.DragEvent.data =
        this.draggableList =
        this.dragData =
        this.downData =
        this.dragOverPath =
        this.dragEnterPath =
          null),
        (this.dragDataList = [])
    }
    checkDragEndAnimate(t, e) {
      return !1
    }
    animate(t, e) {}
    stopAnimate() {}
    checkDragOut(t) {}
    autoMoveOnDragOut(t) {}
    autoMoveCancel() {}
    destroy() {
      this.dragReset()
    }
  }
  const Kd = ie.get('emit')
  const qd = ['move', 'zoom', 'rotate', 'key']
  function Zd(t, e, i, s, n) {
    if (qd.some(t => e.startsWith(t)) && t.__.hitChildren && !Jd(t, n)) {
      let o
      for (let r = 0, a = t.children.length; r < a; r++) (o = t.children[r]), !i.path.has(o) && o.__.hittable && $d(o, e, i, s, n)
    }
  }
  function $d(t, e, i, s, n) {
    if (t.destroyed) return !1
    if (t.__.hitSelf && !Jd(t, n) && (ol.updateEventStyle && !s && ol.updateEventStyle(t, e), t.hasEvent(e, s))) {
      i.phase = s ? 1 : t === i.target ? 2 : 3
      const n = _e.get(e, i)
      if ((t.emitEvent(n, s), n.isStop)) return !0
    }
    return !1
  }
  function Jd(t, e) {
    return e && e.has(t)
  }
  const Qd = {
      wheel: { zoomSpeed: 0.5, moveSpeed: 0.5, rotateSpeed: 0.5, delta: { x: 20, y: 8 } },
      pointer: {
        type: 'pointer',
        snap: !0,
        hitRadius: 5,
        tapTime: 120,
        longPressTime: 800,
        transformTime: 500,
        hover: !0,
        dragHover: !0,
        dragDistance: 2,
        swipeDistance: 20
      },
      touch: { preventDefault: 'auto' },
      multiTouch: {},
      move: { autoDistance: 2 },
      zoom: {},
      cursor: !0,
      keyEvent: !0
    },
    { pathHasEventType: tc, pathCanDrag: ec, pathHasOutside: ic } = Hd
  class sc {
    get dragging() {
      return this.dragger.dragging
    }
    get transforming() {
      return this.transformer.transforming
    }
    get moveMode() {
      return (
        !0 === this.m.drag ||
        this.isHoldSpaceKey ||
        this.isHoldMiddleKey ||
        (this.isHoldRightKey && this.dragger.moving) ||
        this.isDragEmpty
      )
    }
    get canHover() {
      return this.p.hover && !this.config.mobile
    }
    get isDragEmpty() {
      return this.m.dragEmpty && this.isRootPath(this.hoverData) && (!this.downData || this.isRootPath(this.downData))
    }
    get isMobileDragEmpty() {
      return this.m.dragEmpty && !this.canHover && this.downData && this.isTreePath(this.downData)
    }
    get isHoldMiddleKey() {
      return this.m.holdMiddleKey && this.downData && bd.middle(this.downData)
    }
    get isHoldRightKey() {
      return this.m.holdRightKey && this.downData && bd.right(this.downData)
    }
    get isHoldSpaceKey() {
      return this.m.holdSpaceKey && xd.isHoldSpaceKey()
    }
    get m() {
      return this.config.move
    }
    get p() {
      return this.config.pointer
    }
    get hitRadius() {
      return this.p.hitRadius
    }
    constructor(t, e, i, s) {
      ;(this.config = _.clone(Qd)),
        (this.tapCount = 0),
        (this.downKeyMap = {}),
        (this.target = t),
        (this.canvas = e),
        (this.selector = i),
        (this.defaultPath = new vh(t)),
        this.createTransformer(),
        (this.dragger = new jd(this)),
        s && (this.config = _.default(s, this.config)),
        this.__listenEvents()
    }
    start() {
      this.running = !0
    }
    stop() {
      this.running = !1
    }
    receive(t) {}
    pointerDown(e, i) {
      e || (e = this.hoverData),
        e &&
          (bd.defaultLeft(e),
          this.updateDownData(e),
          this.checkPath(e, i),
          (this.downTime = Date.now()),
          this.emit(t.PointerEvent.BEFORE_DOWN, e),
          this.emit(t.PointerEvent.DOWN, e),
          bd.left(e) && (this.tapWait(), this.longPressWait(e)),
          (this.waitRightTap = bd.right(e)),
          this.dragger.setDragData(e),
          this.isHoldRightKey || this.updateCursor(e))
    }
    pointerMove(t) {
      if ((t || (t = this.hoverData), !t)) return
      const { downData: e } = this
      e && bd.defaultLeft(t)
      ;(this.canvas.bounds.hitPoint(t) || e) && (this.pointerMoveReal(t), e && this.dragger.checkDragOut(t))
    }
    pointerMoveReal(e) {
      if ((this.emit(t.PointerEvent.BEFORE_MOVE, e, this.defaultPath), this.downData)) {
        const t = ut.getDistance(this.downData, e) > this.p.dragDistance
        t && (this.pointerWaitCancel(), (this.waitRightTap = !1)), this.dragger.checkDrag(e, t)
      }
      this.dragger.moving ||
        (this.updateHoverData(e),
        this.checkPath(e),
        this.emit(t.PointerEvent.MOVE, e),
        this.pointerHover(e),
        this.dragging && (this.dragger.dragOverOrOut(e), this.dragger.dragEnterOrLeave(e))),
        this.updateCursor(this.downData || e)
    }
    pointerUp(e) {
      const { downData: i } = this
      if ((e || (e = i), !i)) return
      bd.defaultLeft(e), (e.multiTouch = i.multiTouch), this.findPath(e)
      const s = Object.assign(Object.assign({}, e), { path: e.path.clone() })
      e.path.addList(i.path.list),
        this.checkPath(e),
        (this.downData = null),
        this.emit(t.PointerEvent.BEFORE_UP, e),
        this.emit(t.PointerEvent.UP, e),
        this.touchLeave(e),
        e.isCancel || (this.tap(e), this.menuTap(e)),
        this.dragger.dragEnd(e),
        this.updateCursor(s)
    }
    pointerCancel() {
      const t = Object.assign({}, this.dragger.dragData)
      ;(t.isCancel = !0), this.pointerUp(t)
    }
    menu(e) {
      this.findPath(e),
        this.emit(t.PointerEvent.MENU, e),
        (this.waitMenuTap = !0),
        !this.downData && this.waitRightTap && this.menuTap(e)
    }
    menuTap(e) {
      this.waitRightTap &&
        this.waitMenuTap &&
        (this.emit(t.PointerEvent.MENU_TAP, e), (this.waitRightTap = this.waitMenuTap = !1))
    }
    createTransformer() {}
    move(t) {}
    zoom(t) {}
    rotate(t) {}
    transformEnd() {}
    wheel(t) {}
    multiTouch(t, e) {}
    keyDown(e) {
      if (!this.config.keyEvent) return
      this.emit(t.KeyEvent.BEFORE_DOWN, e, this.defaultPath)
      const { code: i } = e
      this.downKeyMap[i] ||
        ((this.downKeyMap[i] = !0),
        xd.setDownCode(i),
        this.emit(t.KeyEvent.HOLD, e, this.defaultPath),
        this.moveMode && (this.cancelHover(), this.updateCursor())),
        this.emit(t.KeyEvent.DOWN, e, this.defaultPath)
    }
    keyUp(e) {
      if (!this.config.keyEvent) return
      this.emit(t.KeyEvent.BEFORE_UP, e, this.defaultPath)
      const { code: i } = e
      ;(this.downKeyMap[i] = !1),
        xd.setUpCode(i),
        this.emit(t.KeyEvent.UP, e, this.defaultPath),
        'grab' === this.cursor && this.updateCursor()
    }
    pointerHover(t) {
      !this.canHover ||
        (this.dragging && !this.p.dragHover) ||
        (t.path || (t.path = new vh()), this.pointerOverOrOut(t), this.pointerEnterOrLeave(t))
    }
    pointerOverOrOut(e) {
      const { path: i } = e,
        { overPath: s } = this
      ;(this.overPath = i),
        s
          ? i.indexAt(0) !== s.indexAt(0) && (this.emit(t.PointerEvent.OUT, e, s), this.emit(t.PointerEvent.OVER, e, i))
          : this.emit(t.PointerEvent.OVER, e, i)
    }
    pointerEnterOrLeave(e) {
      let { path: i } = e
      this.downData && !this.moveMode && ((i = i.clone()), this.downData.path.forEach(t => i.add(t)))
      const { enterPath: s } = this
      ;(this.enterPath = i), this.emit(t.PointerEvent.LEAVE, e, s, i), this.emit(t.PointerEvent.ENTER, e, i, s)
    }
    touchLeave(e) {
      'touch' === e.pointerType &&
        this.enterPath &&
        (this.emit(t.PointerEvent.LEAVE, e), this.dragger.dragging && this.emit(t.DropEvent.LEAVE, e))
    }
    tap(e) {
      const { pointer: i } = this.config,
        s = this.longTap(e)
      if (!i.tapMore && s) return
      if (!this.waitTap) return
      i.tapMore && this.emitTap(e)
      const n = Date.now() - this.downTime,
        o = [t.PointerEvent.DOUBLE_TAP, t.PointerEvent.DOUBLE_CLICK].some(t => tc(e.path, t))
      n < i.tapTime + 50 && o
        ? (this.tapCount++,
          2 === this.tapCount
            ? (this.tapWaitCancel(), this.emitDoubleTap(e))
            : (clearTimeout(this.tapTimer),
              (this.tapTimer = setTimeout(() => {
                i.tapMore || (this.tapWaitCancel(), this.emitTap(e))
              }, i.tapTime))))
        : i.tapMore || (this.tapWaitCancel(), this.emitTap(e))
    }
    findPath(t, e) {
      const { hitRadius: i, through: s } = this.p,
        { bottomList: n, target: o } = this
      w.backgrounder || t.origin || (o && o.updateLayout())
      const r = this.selector.getByPoint(t, i, Object.assign({ bottomList: n, name: t.type }, e || { through: s }))
      return r.throughPath && (t.throughPath = r.throughPath), (t.path = r.path), r.path
    }
    isRootPath(t) {
      return t && t.path.list[0].isLeafer
    }
    isTreePath(t) {
      const e = this.target.app
      return !(!e || !e.isApp) && e.editor && !t.path.has(e.editor) && t.path.has(e.tree) && !t.target.syncEventer
    }
    checkPath(t, e) {
      ;(e || (this.moveMode && !ic(t.path))) && (t.path = this.defaultPath)
    }
    canMove(t) {
      return t && (this.moveMode || ('auto' === this.m.drag && !ec(t.path))) && !ic(t.path)
    }
    isDrag(t) {
      return this.dragger.getList().has(t)
    }
    isPress(t) {
      return this.downData && this.downData.path.has(t)
    }
    isHover(t) {
      return this.enterPath && this.enterPath.has(t)
    }
    isFocus(t) {
      return this.focusData === t
    }
    cancelHover() {
      const { hoverData: t } = this
      t && ((t.path = this.defaultPath), this.pointerHover(t))
    }
    stopDragAnimate() {
      this.dragger.stopAnimate()
    }
    updateDownData(t, e, i) {
      const { downData: s } = this
      !t && s && (t = s), t && (this.findPath(t, e), i && s && t.path.addList(s.path.list), (this.downData = t))
    }
    updateHoverData(e) {
      e || (e = this.hoverData),
        e && (this.findPath(e, { exclude: this.dragger.getList(!1, !0), name: t.PointerEvent.MOVE }), (this.hoverData = e))
    }
    updateCursor(t) {
      if (!this.config.cursor || !this.canHover) return
      if ((t || (this.updateHoverData(), (t = this.downData || this.hoverData)), this.dragger.moving))
        return this.setCursor('grabbing')
      if (this.canMove(t)) return this.setCursor(this.downData ? 'grabbing' : 'grab')
      if (!t) return
      let e, i
      const { path: s } = t
      for (
        let t = 0, n = s.length;
        t < n && ((e = s.list[t]), (i = (e.syncEventer && e.syncEventer.cursor) || e.cursor), !i);
        t++
      );
      this.setCursor(i)
    }
    setCursor(t) {
      this.cursor = t
    }
    getLocal(t, e) {
      const i = this.canvas.getClientBounds(e),
        s = { x: t.clientX - i.x, y: t.clientY - i.y },
        { bounds: n } = this.canvas
      return (s.x *= n.width / i.width), (s.y *= n.height / i.height), this.p.snap && ut.round(s), s
    }
    emitTap(e) {
      this.emit(t.PointerEvent.TAP, e), this.emit(t.PointerEvent.CLICK, e)
    }
    emitDoubleTap(e) {
      this.emit(t.PointerEvent.DOUBLE_TAP, e), this.emit(t.PointerEvent.DOUBLE_CLICK, e)
    }
    pointerWaitCancel() {
      this.tapWaitCancel(), this.longPressWaitCancel()
    }
    tapWait() {
      clearTimeout(this.tapTimer), (this.waitTap = !0)
    }
    tapWaitCancel() {
      this.waitTap && (clearTimeout(this.tapTimer), (this.waitTap = !1), (this.tapCount = 0))
    }
    longPressWait(e) {
      clearTimeout(this.longPressTimer),
        (this.longPressTimer = setTimeout(() => {
          ;(this.longPressed = !0), this.emit(t.PointerEvent.LONG_PRESS, e)
        }, this.p.longPressTime))
    }
    longTap(e) {
      let i
      return (
        this.longPressed &&
          (this.emit(t.PointerEvent.LONG_TAP, e),
          (tc(e.path, t.PointerEvent.LONG_TAP) || tc(e.path, t.PointerEvent.LONG_PRESS)) && (i = !0)),
        this.longPressWaitCancel(),
        i
      )
    }
    longPressWaitCancel() {
      this.longPressTimer && (clearTimeout(this.longPressTimer), (this.longPressed = !1))
    }
    __onResize() {
      const { dragOut: t } = this.m
      ;(this.shrinkCanvasBounds = new $t(this.canvas.bounds)), this.shrinkCanvasBounds.spread(-(h(t) ? t : 2))
    }
    __listenEvents() {
      const { target: t } = this
      ;(this.__eventIds = [t.on_(Zr.RESIZE, this.__onResize, this)]), t.once(ta.READY, () => this.__onResize())
    }
    __removeListenEvents() {
      this.target.off_(this.__eventIds), (this.__eventIds.length = 0)
    }
    emit(t, e, i, s) {
      this.running &&
        (function (t, e, i, s) {
          if (!i && !e.path) return
          let n
          ;(e.type = t), i ? (e = Object.assign(Object.assign({}, e), { path: i })) : (i = e.path), (e.target = i.indexAt(0))
          try {
            for (let o = i.length - 1; o > -1; o--) {
              if (((n = i.list[o]), $d(n, t, e, !0, s))) return
              n.isApp && Zd(n, t, e, !0, s)
            }
            for (let o = 0, r = i.length; o < r; o++)
              if (((n = i.list[o]), n.isApp && Zd(n, t, e, !1, s), $d(n, t, e, !1, s))) return
          } catch (t) {
            Kd.error(t)
          }
        })(t, e, i, s)
    }
    destroy() {
      this.__eventIds.length &&
        (this.stop(),
        this.__removeListenEvents(),
        this.dragger.destroy(),
        this.transformer && this.transformer.destroy(),
        (this.downData = this.overPath = this.enterPath = null))
    }
  }
  class nc {
    static set(t, e) {
      this.custom[t] = e
    }
    static get(t) {
      return this.custom[t]
    }
  }
  nc.custom = {}
  class oc extends me {
    constructor() {
      super(...arguments), (this.maxTotal = 1e3), (this.pathList = new vh()), (this.pixelList = new vh())
    }
    getPixelType(t, e) {
      return this.__autoClear(), this.pixelList.add(t), de.hitCanvas(e)
    }
    getPathType(t) {
      return this.__autoClear(), this.pathList.add(t), de.hitCanvas()
    }
    clearImageType() {
      this.__clearLeafList(this.pixelList)
    }
    clearPathType() {
      this.__clearLeafList(this.pathList)
    }
    __clearLeafList(t) {
      t.length &&
        (t.forEach(t => {
          t.__hitCanvas && (t.__hitCanvas.destroy(), (t.__hitCanvas = null))
        }),
        t.reset())
    }
    __autoClear() {
      this.pathList.length + this.pixelList.length > this.maxTotal && this.clear()
    }
    clear() {
      this.clearPathType(), this.clearImageType()
    }
  }
  w.getSelector = function (t) {
    return t.leafer ? t.leafer.selector : w.selector || (w.selector = de.selector())
  }
  const { toInnerRadiusPointOf: rc, copyRadiusPoint: ac } = ut,
    { hitRadiusPoint: hc, hitPoint: lc } = jt,
    dc = {},
    cc = {},
    uc = t.Leaf.prototype
  ;(uc.hit = function (t, e = 0) {
    this.updateLayout(), ac(cc, t, e)
    const i = this.__world
    return (
      !!(e ? hc(i, cc) : lc(i, cc)) &&
      (this.isBranch ? w.getSelector(this).hitPoint(Object.assign({}, cc), e, { target: this }) : this.__hitWorld(cc))
    )
  }),
    (uc.__hitWorld = function (t, e) {
      const i = this.__
      if (!i.hitSelf) return !1
      const s = this.__world,
        n = this.__layout,
        o = s.width < 10 && s.height < 10
      if ((i.hitRadius && (ac(dc, t, i.hitRadius), (t = dc)), rc(t, s, dc), i.hitBox || o)) {
        if (jt.hitRadiusPoint(n.boxBounds, dc)) return !0
        if (o) return !1
      }
      return (
        (!n.hitCanvasChanged && this.__hitCanvas) || (this.__updateHitCanvas(), n.boundsChanged || (n.hitCanvasChanged = !1)),
        this.__hit(dc, e)
      )
    }),
    (uc.__hitFill = function (t) {
      const e = this.__hitCanvas
      return e && e.hitFill(t, this.__.windingRule)
    }),
    (uc.__hitStroke = function (t, e) {
      const i = this.__hitCanvas
      return i && i.hitStroke(t, e)
    }),
    (uc.__hitPixel = function (t) {
      const e = this.__hitCanvas
      return e && e.hitPixel(t, this.__layout.renderBounds, e.hitScale)
    }),
    (uc.__drawHitPath = function (t) {
      t && this.__drawRenderPath(t)
    })
  const pc = new wt(),
    gc = t.UI.prototype
  ;(gc.__updateHitCanvas = function () {
    this.__box && this.__box.__updateHitCanvas()
    const { hitCanvasManager: t } = this.leafer || (this.parent && this.parent.leafer) || {}
    if (!t) return
    const e = this.__,
      i = (e.__isAlphaPixelFill || e.__isCanvas) && 'pixel' === e.hitFill,
      s = e.__isAlphaPixelStroke && 'pixel' === e.hitStroke,
      n = i || s
    this.__hitCanvas ||
      (this.__hitCanvas = n ? t.getPixelType(this, { contextSettings: { willReadFrequently: !0 } }) : t.getPathType(this))
    const o = this.__hitCanvas
    if (n) {
      const { renderBounds: t } = this.__layout,
        n = w.image.hitCanvasSize,
        r = (o.hitScale = Jt.set(0, 0, n, n).getFitMatrix(t).a),
        { x: a, y: h, width: l, height: d } = Jt.set(t).scale(r)
      o.resize({ width: l, height: d, pixelRatio: 1 }),
        o.clear(),
        (so.patternLocked = !0),
        this.__renderShape(o, {
          matrix: pc
            .setWith(this.__world)
            .scaleWith(1 / r)
            .invertWith()
            .translate(-a, -h),
          ignoreFill: !i,
          ignoreStroke: !s
        }),
        (so.patternLocked = !1),
        o.resetTransform(),
        (e.__isHitPixel = !0)
    } else e.__isHitPixel && (e.__isHitPixel = !1)
    this.__drawHitPath(o), o.setStrokeOptions(e)
  }),
    (gc.__hit = function (t, e) {
      if (this.__box && this.__box.__hit(t)) return !0
      const i = this.__
      if (i.__isHitPixel && this.__hitPixel(t)) return !0
      const { hitFill: s } = i,
        n =
          ((i.fill || i.__isCanvas) && ('path' === s || ('pixel' === s && !(i.__isAlphaPixelFill || i.__isCanvas)))) ||
          'all' === s ||
          e
      if (n && this.__hitFill(t)) return !0
      const { hitStroke: o, __maxStrokeWidth: r } = i,
        a = (i.stroke && ('path' === o || ('pixel' === o && !i.__isAlphaPixelStroke))) || 'all' === o
      if (!n && !a) return !1
      const h = 2 * t.radiusX
      let l = h
      if (a)
        switch (i.strokeAlign) {
          case 'inside':
            if (((l += 2 * r), !n && this.__hitFill(t) && this.__hitStroke(t, l))) return !0
            l = h
            break
          case 'center':
            l += r
            break
          case 'outside':
            if (((l += 2 * r), !n)) {
              if (!this.__hitFill(t) && this.__hitStroke(t, l)) return !0
              l = h
            }
        }
      return !!l && this.__hitStroke(t, l)
    })
  const _c = t.UI.prototype,
    fc = t.Rect.prototype,
    mc = t.Box.prototype
  ;(fc.__updateHitCanvas = mc.__updateHitCanvas =
    function () {
      this.stroke ||
      this.cornerRadius ||
      ((this.fill || this.__.__isCanvas) && 'pixel' === this.hitFill) ||
      'all' === this.hitStroke
        ? _c.__updateHitCanvas.call(this)
        : this.__hitCanvas && (this.__hitCanvas = null)
    }),
    (fc.__hitFill = mc.__hitFill =
      function (t) {
        return this.__hitCanvas ? _c.__hitFill.call(this, t) : jt.hitRadiusPoint(this.__layout.boxBounds, t)
      }),
    (t.Text.prototype.__drawHitPath = function (t) {
      const { __lineHeight: e, fontSize: i, __baseLine: s, __letterSpacing: n, __textDrawData: o } = this.__
      t.beginPath(), n < 0 ? this.__drawPathByBox(t) : o.rows.forEach(n => t.rect(n.x, n.y - s, n.width, e < i ? i : e))
    }),
    (t.Group.prototype.pick = function (t, e) {
      return (
        e || (e = s),
        this.updateLayout(),
        w.getSelector(this).getByPoint(t, e.hitRadius || 0, Object.assign(Object.assign({}, e), { target: this }))
      )
    })
  const yc = Ae.prototype
  ;(yc.hitFill = function (t, e) {
    return e ? this.context.isPointInPath(t.x, t.y, e) : this.context.isPointInPath(t.x, t.y)
  }),
    (yc.hitStroke = function (t, e) {
      return (this.strokeWidth = e), this.context.isPointInStroke(t.x, t.y)
    }),
    (yc.hitPixel = function (t, e, i = 1) {
      let { x: s, y: n, radiusX: o, radiusY: r } = t
      e && ((s -= e.x), (n -= e.y)),
        Jt.set(s - o, n - r, 2 * o, 2 * r)
          .scale(i)
          .ceil()
      const { data: a } = this.context.getImageData(Jt.x, Jt.y, Jt.width || 1, Jt.height || 1)
      for (let t = 0, e = a.length; t < e; t += 4) if (a[t + 3] > 0) return !0
      return a[3] > 0
    })
  const vc = {
      convert(t, e) {
        const i = Hd.getBase(t),
          { x: s, y: n } = e,
          o = Object.assign(Object.assign({}, i), {
            x: s,
            y: n,
            width: t.width,
            height: t.height,
            pointerType: t.pointerType,
            pressure: t.pressure
          })
        return (
          'pen' === o.pointerType &&
            ((o.tangentialPressure = t.tangentialPressure), (o.tiltX = t.tiltX), (o.tiltY = t.tiltY), (o.twist = t.twist)),
          o
        )
      },
      convertMouse(t, e) {
        const i = Hd.getBase(t),
          { x: s, y: n } = e
        return Object.assign(Object.assign({}, i), { x: s, y: n, width: 1, height: 1, pointerType: 'mouse', pressure: 0.5 })
      },
      convertTouch(t, e) {
        const i = vc.getTouch(t),
          s = Hd.getBase(t),
          { x: n, y: o } = e
        return Object.assign(Object.assign({}, s), {
          x: n,
          y: o,
          width: 1,
          height: 1,
          pointerType: 'touch',
          multiTouch: t.touches.length > 1,
          pressure: i.force
        })
      },
      getTouch: t => t.targetTouches[0] || t.changedTouches[0]
    },
    wc = {
      convert(t) {
        const e = Hd.getBase(t)
        return Object.assign(Object.assign({}, e), { code: t.code, key: t.key })
      }
    },
    { pathCanDrag: xc } = Hd
  class bc extends sc {
    get notPointer() {
      const { p: t } = this
      return 'pointer' !== t.type || t.touch || this.useMultiTouch
    }
    get notTouch() {
      const { p: t } = this
      return 'mouse' === t.type || this.usePointer
    }
    get notMouse() {
      return this.usePointer || this.useTouch
    }
    __listenEvents() {
      super.__listenEvents()
      const t = (this.view = this.canvas.view)
      ;(this.viewEvents = {
        pointerdown: this.onPointerDown,
        mousedown: this.onMouseDown,
        touchstart: this.onTouchStart,
        pointerleave: this.onPointerLeave,
        contextmenu: this.onContextMenu,
        wheel: this.onWheel,
        gesturestart: this.onGesturestart,
        gesturechange: this.onGesturechange,
        gestureend: this.onGestureend
      }),
        (this.windowEvents = {
          pointermove: this.onPointerMove,
          pointerup: this.onPointerUp,
          pointercancel: this.onPointerCancel,
          mousemove: this.onMouseMove,
          mouseup: this.onMouseUp,
          touchmove: this.onTouchMove,
          touchend: this.onTouchEnd,
          touchcancel: this.onTouchCancel,
          keydown: this.onKeyDown,
          keyup: this.onKeyUp,
          scroll: this.onScroll
        })
      const { viewEvents: e, windowEvents: i } = this
      for (let i in e) (e[i] = e[i].bind(this)), t.addEventListener(i, e[i])
      for (let t in i) (i[t] = i[t].bind(this)), window.addEventListener(t, i[t])
    }
    __removeListenEvents() {
      super.__removeListenEvents()
      const { viewEvents: t, windowEvents: e } = this
      for (let e in t) this.view.removeEventListener(e, t[e]), (this.viewEvents = {})
      for (let t in e) window.removeEventListener(t, e[t]), (this.windowEvents = {})
    }
    getTouches(t) {
      const e = []
      for (let i = 0, s = t.length; i < s; i++) e.push(t[i])
      return e
    }
    preventDefaultPointer(t) {
      const { pointer: e } = this.config
      e.preventDefault && t.preventDefault()
    }
    preventDefaultWheel(t) {
      const { wheel: e } = this.config
      e.preventDefault && t.preventDefault()
    }
    preventWindowPointer(t) {
      return !this.downData && t.target !== this.view
    }
    onKeyDown(t) {
      this.keyDown(wc.convert(t))
    }
    onKeyUp(t) {
      this.keyUp(wc.convert(t))
    }
    onContextMenu(t) {
      this.config.pointer.preventDefaultMenu && t.preventDefault(), this.menu(vc.convert(t, this.getLocal(t)))
    }
    onScroll() {
      this.canvas.updateClientBounds()
    }
    onPointerDown(t) {
      this.preventDefaultPointer(t),
        this.notPointer || (this.usePointer || (this.usePointer = !0), this.pointerDown(vc.convert(t, this.getLocal(t))))
    }
    onPointerMove(t, e) {
      if (this.notPointer || this.preventWindowPointer(t)) return
      this.usePointer || (this.usePointer = !0)
      const i = vc.convert(t, this.getLocal(t, !0))
      e ? this.pointerHover(i) : this.pointerMove(i)
    }
    onPointerLeave(t) {
      this.onPointerMove(t, !0)
    }
    onPointerUp(t) {
      this.downData && this.preventDefaultPointer(t),
        this.notPointer || this.preventWindowPointer(t) || this.pointerUp(vc.convert(t, this.getLocal(t)))
    }
    onPointerCancel() {
      this.useMultiTouch || this.pointerCancel()
    }
    onMouseDown(t) {
      this.preventDefaultPointer(t), this.notMouse || this.pointerDown(vc.convertMouse(t, this.getLocal(t)))
    }
    onMouseMove(t) {
      this.notMouse || this.preventWindowPointer(t) || this.pointerMove(vc.convertMouse(t, this.getLocal(t, !0)))
    }
    onMouseUp(t) {
      this.downData && this.preventDefaultPointer(t),
        this.notMouse || this.preventWindowPointer(t) || this.pointerUp(vc.convertMouse(t, this.getLocal(t)))
    }
    onMouseCancel() {
      this.notMouse || this.pointerCancel()
    }
    onTouchStart(t) {
      const e = vc.getTouch(t),
        i = this.getLocal(e, !0),
        { preventDefault: s } = this.config.touch
      ;(!0 === s || ('auto' === s && xc(this.findPath(i)))) && t.preventDefault(),
        this.multiTouchStart(t),
        this.notTouch ||
          (this.touchTimer && (window.clearTimeout(this.touchTimer), (this.touchTimer = 0)),
          (this.useTouch = !0),
          this.pointerDown(vc.convertTouch(t, i)))
    }
    onTouchMove(t) {
      if ((this.multiTouchMove(t), this.notTouch || this.preventWindowPointer(t))) return
      const e = vc.getTouch(t)
      this.pointerMove(vc.convertTouch(t, this.getLocal(e)))
    }
    onTouchEnd(t) {
      if ((this.multiTouchEnd(), this.notTouch || this.preventWindowPointer(t))) return
      this.touchTimer && clearTimeout(this.touchTimer),
        (this.touchTimer = setTimeout(() => {
          this.useTouch = !1
        }, 500))
      const e = vc.getTouch(t)
      this.pointerUp(vc.convertTouch(t, this.getLocal(e)))
    }
    onTouchCancel() {
      this.notTouch || this.pointerCancel()
    }
    multiTouchStart(t) {
      ;(this.useMultiTouch = t.touches.length > 1),
        (this.touches = this.useMultiTouch ? this.getTouches(t.touches) : void 0),
        this.useMultiTouch && this.pointerCancel()
    }
    multiTouchMove(t) {
      if (this.useMultiTouch && t.touches.length > 1) {
        const e = this.getTouches(t.touches),
          i = this.getKeepTouchList(this.touches, e)
        i.length > 1 && (this.multiTouch(Hd.getBase(t), i), (this.touches = e))
      }
    }
    multiTouchEnd() {
      ;(this.touches = null), (this.useMultiTouch = !1), this.transformEnd()
    }
    getKeepTouchList(t, e) {
      let i
      const s = []
      return (
        t.forEach(t => {
          ;(i = e.find(e => e.identifier === t.identifier)), i && s.push({ from: this.getLocal(t), to: this.getLocal(i) })
        }),
        s
      )
    }
    getLocalTouchs(t) {
      return t.map(t => this.getLocal(t))
    }
    onWheel(t) {
      this.preventDefaultWheel(t),
        this.wheel(
          Object.assign(Object.assign(Object.assign({}, Hd.getBase(t)), this.getLocal(t)), { deltaX: t.deltaX, deltaY: t.deltaY })
        )
    }
    onGesturestart(t) {
      this.useMultiTouch || (this.preventDefaultWheel(t), (this.lastGestureScale = 1), (this.lastGestureRotation = 0))
    }
    onGesturechange(t) {
      if (this.useMultiTouch) return
      this.preventDefaultWheel(t)
      const e = Hd.getBase(t)
      Object.assign(e, this.getLocal(t))
      const i = t.scale / this.lastGestureScale,
        s = ((t.rotation - this.lastGestureRotation) / Math.PI) * 180 * (z.within(this.config.wheel.rotateSpeed, 0, 1) / 4 + 0.1)
      this.zoom(Object.assign(Object.assign({}, e), { scale: i * i })),
        this.rotate(Object.assign(Object.assign({}, e), { rotation: s })),
        (this.lastGestureScale = t.scale),
        (this.lastGestureRotation = t.rotation)
    }
    onGestureend(t) {
      this.useMultiTouch || (this.preventDefaultWheel(t), this.transformEnd())
    }
    setCursor(t) {
      super.setCursor(t)
      const e = []
      this.eachCursor(t, e),
        u(e[e.length - 1]) && e.push('default'),
        (this.canvas.view.style.cursor = e.map(t => (u(t) ? `url(${t.url}) ${t.x || 0} ${t.y || 0}` : t)).join(','))
    }
    eachCursor(t, e, i = 0) {
      if ((i++, c(t))) t.forEach(t => this.eachCursor(t, e, i))
      else {
        const s = r(t) && nc.get(t)
        s && i < 2 ? this.eachCursor(s, e, i) : e.push(t)
      }
    }
    destroy() {
      this.view && (super.destroy(), (this.view = null), (this.touches = null))
    }
  }
  function Ec(t, e, i) {
    t.__.__font ? Qh.fillText(t, e, i) : t.__.windingRule ? e.fill(t.__.windingRule) : e.fill()
  }
  function Tc(t, e, i, s, n) {
    const o = i.__
    u(t) ? Qh.drawStrokesStyle(t, e, !1, i, s, n) : (s.setStroke(t, o.__strokeWidth * e, o), s.stroke()),
      o.__useArrow && Qh.strokeArrow(t, i, s, n)
  }
  function Sc(t, e, i, s, n) {
    const o = i.__
    u(t) ? Qh.drawStrokesStyle(t, e, !0, i, s, n) : (s.setStroke(t, o.__strokeWidth * e, o), Qh.drawTextStroke(i, s, n))
  }
  function kc(t, e, i, s, n) {
    const o = s.getSameCanvas(!0, !0)
    ;(o.font = i.__.__font),
      Sc(t, 2, i, o, n),
      (o.blendMode = 'outside' === e ? 'destination-out' : 'destination-in'),
      Qh.fillText(i, o, n),
      (o.blendMode = 'normal'),
      lr.copyCanvasByWorld(i, s, o),
      o.recycle(i.__nowWorld)
  }
  const { getSpread: Bc, copyAndSpread: Pc, toOuterOf: Lc, getOuterOf: Rc, getByMove: Cc, move: Oc, getIntersectData: Ac } = jt,
    Dc = {}
  let Mc
  const { stintSet: Ic } = _,
    { hasTransparent: Fc } = Zh
  function Wc(t, e, i) {
    if (!u(e) || !1 === e.visible || 0 === e.opacity) return
    let s
    const { boxBounds: o } = i.__layout
    switch (e.type) {
      case 'image':
        if (!e.url) return
        s = tl.image(i, t, e, o, !Mc || !Mc[e.url])
        break
      case 'linear':
        s = el.linearGradient(e, o)
        break
      case 'radial':
        s = el.radialGradient(e, o)
        break
      case 'angular':
        s = el.conicGradient(e, o)
        break
      case 'solid':
        const { type: r, color: a, opacity: h } = e
        s = { type: r, style: Zh.string(a, h) }
        break
      default:
        n(e.r) || (s = { type: 'solid', style: Zh.string(e) })
    }
    if (s && ((s.originPaint = e), r(s.style) && Fc(s.style) && (s.isTransparent = !0), e.style)) {
      if (0 === e.style.strokeWidth) return
      s.strokeStyle = e.style
    }
    return s
  }
  const zc = {
    compute: function (t, e) {
      const i = e.__,
        s = []
      let n,
        o,
        r,
        a = i.__input[t]
      c(a) || (a = [a]), (Mc = tl.recycleImage(t, i))
      for (let i, n = 0, o = a.length; n < o; n++)
        (i = Wc(t, a[n], e)) &&
          (s.push(i), i.strokeStyle && (r || (r = 1), i.strokeStyle.strokeWidth && (r = Math.max(r, i.strokeStyle.strokeWidth))))
      ;(i['_' + t] = s.length ? s : void 0),
        s.length
          ? (s.every(t => t.isTransparent) && (s.some(t => t.image) && (n = !0), (o = !0)),
            'fill' === t
              ? (Ic(i, '__isAlphaPixelFill', n), Ic(i, '__isTransparentFill', o))
              : (Ic(i, '__isAlphaPixelStroke', n), Ic(i, '__isTransparentStroke', o), Ic(i, '__hasMultiStrokeStyle', r)))
          : i.__removePaint(t, !1)
    },
    fill: function (t, e, i, s) {
      ;(i.fillStyle = t), Ec(e, i, s)
    },
    fills: function (t, e, i, s) {
      let n, o, r
      for (let a = 0, h = t.length; a < h; a++) {
        if (((n = t[a]), (o = n.originPaint), n.image)) {
          if ((r ? r++ : (r = 1), tl.checkImage(n, !e.__.__font, e, i, s))) continue
          if (!n.style) {
            1 === r && n.image.isPlacehold && e.drawImagePlaceholder(n, i, s)
            continue
          }
        }
        if (((i.fillStyle = n.style), n.transform || o.scaleFixed)) {
          if ((i.save(), n.transform && i.transform(n.transform), o.scaleFixed)) {
            const { scaleX: t, scaleY: s } = e.getRenderScaleData(!0)
            ;(!0 === o.scaleFixed || ('zoom-in' === o.scaleFixed && t > 1 && s > 1)) && i.scale(1 / t, 1 / s)
          }
          o.blendMode && (i.blendMode = o.blendMode), Ec(e, i, s), i.restore()
        } else o.blendMode ? (i.saveBlendMode(o.blendMode), Ec(e, i, s), i.restoreBlendMode()) : Ec(e, i, s)
      }
    },
    fillPathOrText: Ec,
    fillText: function (t, e, i) {
      const s = t.__,
        { rows: n, decorationY: o } = s.__textDrawData
      let r
      s.__isPlacehold && s.placeholderColor && (e.fillStyle = s.placeholderColor)
      for (let t = 0, i = n.length; t < i; t++)
        (r = n[t]),
          r.text
            ? e.fillText(r.text, r.x, r.y)
            : r.data &&
              r.data.forEach(t => {
                e.fillText(t.char, t.x, r.y)
              })
      if (o) {
        const { decorationColor: t, decorationHeight: i } = s.__textDrawData
        t && (e.fillStyle = t), n.forEach(t => o.forEach(s => e.fillRect(t.x, t.y + s, t.width, i)))
      }
    },
    stroke: function (t, e, i, s) {
      const n = e.__
      if (n.__strokeWidth)
        if (n.__font) Qh.strokeText(t, e, i, s)
        else
          switch (n.strokeAlign) {
            case 'center':
              Tc(t, 1, e, i, s)
              break
            case 'inside':
              !(function (t, e, i, s) {
                i.save(), i.clipUI(e), Tc(t, 2, e, i, s), i.restore()
              })(t, e, i, s)
              break
            case 'outside':
              !(function (t, e, i, s) {
                const n = e.__
                if (n.__fillAfterStroke) Tc(t, 2, e, i, s)
                else {
                  const { renderBounds: o } = e.__layout,
                    r = i.getSameCanvas(!0, !0)
                  e.__drawRenderPath(r),
                    Tc(t, 2, e, r, s),
                    r.clipUI(n),
                    r.clearWorld(o),
                    lr.copyCanvasByWorld(e, i, r),
                    r.recycle(e.__nowWorld)
                }
              })(t, e, i, s)
          }
    },
    strokes: function (t, e, i, s) {
      Qh.stroke(t, e, i, s)
    },
    strokeText: function (t, e, i, s) {
      switch (e.__.strokeAlign) {
        case 'center':
          Sc(t, 1, e, i, s)
          break
        case 'inside':
          kc(t, 'inside', e, i, s)
          break
        case 'outside':
          e.__.__fillAfterStroke ? Sc(t, 2, e, i, s) : kc(t, 'outside', e, i, s)
      }
    },
    drawTextStroke: function (t, e, i) {
      let s,
        n = t.__.__textDrawData
      const { rows: o, decorationY: r } = n
      for (let t = 0, i = o.length; t < i; t++)
        (s = o[t]),
          s.text
            ? e.strokeText(s.text, s.x, s.y)
            : s.data &&
              s.data.forEach(t => {
                e.strokeText(t.char, t.x, s.y)
              })
      if (r) {
        const { decorationHeight: t } = n
        o.forEach(i => r.forEach(s => e.strokeRect(i.x, i.y + s, i.width, t)))
      }
    },
    drawStrokesStyle: function (t, e, i, s, n, o) {
      let r
      const a = s.__,
        { __hasMultiStrokeStyle: h } = a
      h || n.setStroke(void 0, a.__strokeWidth * e, a)
      for (let l = 0, d = t.length; l < d; l++)
        if (((r = t[l]), (!r.image || !tl.checkImage(r, !1, s, n, o)) && r.style)) {
          if (h) {
            const { strokeStyle: t } = r
            t ? n.setStroke(r.style, a.__getRealStrokeWidth(t) * e, a, t) : n.setStroke(r.style, a.__strokeWidth * e, a)
          } else n.strokeStyle = r.style
          r.originPaint.blendMode
            ? (n.saveBlendMode(r.originPaint.blendMode), i ? Qh.drawTextStroke(s, n, o) : n.stroke(), n.restoreBlendMode())
            : i
            ? Qh.drawTextStroke(s, n, o)
            : n.stroke()
        }
    },
    shape: function (t, e, i) {
      const s = e.getSameCanvas(),
        n = e.bounds,
        o = t.__nowWorld,
        r = t.__layout,
        a = t.__nowWorldShapeBounds || (t.__nowWorldShapeBounds = {})
      let h, l, d, c, u, p
      Lc(r.strokeSpread ? (Pc(Dc, r.boxBounds, r.strokeSpread), Dc) : r.boxBounds, o, a)
      let { scaleX: g, scaleY: _ } = t.getRenderScaleData(!0)
      if (n.includes(a)) (p = s), (h = u = a), (l = o)
      else {
        let s
        if (w.fullImageShadow) s = a
        else {
          const t = r.renderShapeSpread ? Bc(n, L.swapAndScale(r.renderShapeSpread, g, _)) : n
          s = Ac(t, a)
        }
        c = n.getFitMatrix(s)
        let { a: f, d: m } = c
        c.a < 1 && ((p = e.getSameCanvas()), t.__renderShape(p, i), (g *= f), (_ *= m)),
          (u = Rc(a, c)),
          (h = Cc(u, -c.e, -c.f)),
          (l = Rc(o, c)),
          Oc(l, -c.e, -c.f)
        const y = i.matrix
        y ? ((d = new wt(c)), d.multiply(y), (f *= y.scaleX), (m *= y.scaleY)) : (d = c),
          d.withScale(f, m),
          (i = Object.assign(Object.assign({}, i), { matrix: d }))
      }
      return (
        t.__renderShape(s, i),
        { canvas: s, matrix: d, fitMatrix: c, bounds: h, renderBounds: l, worldCanvas: p, shapeBounds: u, scaleX: g, scaleY: _ }
      )
    }
  }
  let Uc,
    Hc = new $t()
  const { isSame: Nc } = jt
  function Yc(t, e, i, s, n, o) {
    if ('fill' === e && !t.__.__naturalWidth) {
      const e = t.__
      if (((e.__naturalWidth = s.width / e.pixelRatio), (e.__naturalHeight = s.height / e.pixelRatio), e.__autoSide))
        return t.forceUpdate('width'), t.__proxyData && (t.setProxyAttr('width', e.width), t.setProxyAttr('height', e.height)), !1
    }
    return n.data || tl.createData(n, s, i, o), !0
  }
  function Xc(t, e) {
    jc(t, Yr.LOAD, e)
  }
  function Vc(t, e) {
    jc(t, Yr.LOADED, e)
  }
  function Gc(t, e, i) {
    ;(e.error = i), t.forceUpdate('surface'), jc(t, Yr.ERROR, e)
  }
  function jc(t, e, i) {
    t.hasEvent(e) && t.emitEvent(new Yr(e, i))
  }
  function Kc(t, e) {
    const { leafer: i } = t
    i && i.viewReady && (i.renderer.ignore = e)
  }
  const { get: qc, translate: Zc } = tt,
    $c = new $t(),
    Jc = {},
    Qc = {}
  function tu(t, e, i, s) {
    const n = r(t) || s ? (s ? i - s * e : i % e) / ((s || Math.floor(i / e)) - 1) : t
    return 'auto' === t && n < 0 ? 0 : n
  }
  let eu = {},
    iu = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 }
  const {
    get: su,
    set: nu,
    rotateOfOuter: ou,
    translate: ru,
    scaleOfOuter: au,
    multiplyParent: hu,
    scale: lu,
    rotate: du,
    skew: cu
  } = tt
  function uu(t, e, i, s, n, o, r, a) {
    r && du(t, r), a && cu(t, a.x, a.y), n && lu(t, n, o), ru(t, e.x + i, e.y + s)
  }
  const { get: pu, scale: gu, copy: _u } = tt,
    { getFloorScale: fu } = z,
    { abs: mu } = Math
  const yu = {
      image: function (t, e, i, s, n) {
        let o, r
        const a = so.get(i)
        return (
          Uc && i === Uc.paint && Nc(s, Uc.boxBounds)
            ? (o = Uc.leafPaint)
            : ((o = { type: i.type, image: a }),
              a.hasAlphaPixel && (o.isTransparent = !0),
              (Uc = a.use > 1 ? { leafPaint: o, paint: i, boxBounds: Hc.set(s) } : null)),
          (n || a.loading) && (r = { image: a, attrName: e, attrValue: i }),
          a.ready
            ? (Yc(t, e, i, a, o, s), n && (Xc(t, r), Vc(t, r)))
            : a.error
            ? n && Gc(t, r, a.error)
            : (n && (Kc(t, !0), Xc(t, r)),
              (o.loadId = a.load(
                () => {
                  Kc(t, !1),
                    t.destroyed ||
                      (Yc(t, e, i, a, o, s) && (a.hasAlphaPixel && (t.__layout.hitCanvasChanged = !0), t.forceUpdate('surface')),
                      Vc(t, r)),
                    (o.loadId = void 0)
                },
                e => {
                  Kc(t, !1), Gc(t, r, e), (o.loadId = void 0)
                },
                i.lod && a.getThumbSize()
              )),
              t.placeholderColor &&
                (t.placeholderDelay
                  ? setTimeout(() => {
                      a.ready || ((a.isPlacehold = !0), t.forceUpdate('surface'))
                    }, t.placeholderDelay)
                  : (a.isPlacehold = !0))),
          o
        )
      },
      checkImage: function (t, e, i, s, n) {
        const { scaleX: o, scaleY: r } = tl.getImageRenderScaleData(t, i, s, n),
          { image: a, data: h, originPaint: l } = t,
          { exporting: d } = n
        return (
          !(!h || (t.patternId === o + '-' + r && !d)) &&
          (e &&
            (h.repeat
              ? (e = !1)
              : l.changeful ||
                ('miniapp' === w.name && Zr.isResizing(i)) ||
                d ||
                (e = w.image.isLarge(a, o, r) || a.width * o > 8096 || a.height * r > 8096)),
          e
            ? (i.__.__isFastShadow && ((s.fillStyle = t.style || '#000'), s.fill()), tl.drawImage(t, o, r, i, s, n), !0)
            : (!t.style || l.sync || d ? tl.createPattern(t, i, s, n) : tl.createPatternTask(t, i, s, n), !1))
        )
      },
      drawImage: function (t, e, i, s, n, o) {
        const { data: r, image: a } = t,
          { blendMode: h } = t.originPaint,
          { opacity: l, transform: d } = r,
          c = a.getFull(r.filters),
          u = s.__
        let p,
          { width: g, height: _ } = a
        ;(p = (d && !d.onlyScale) || u.path || u.cornerRadius) || l || h
          ? (n.save(),
            p && n.clipUI(s),
            h && (n.blendMode = h),
            l && (n.opacity *= l),
            d && n.transform(d),
            n.drawImage(c, 0, 0, g, _),
            n.restore())
          : (r.scaleX && ((g *= r.scaleX), (_ *= r.scaleY)), n.drawImage(c, 0, 0, g, _))
      },
      getImageRenderScaleData: function (t, e, i, s) {
        const n = e.getRenderScaleData(!0, t.originPaint.scaleFixed),
          { data: o } = t
        if (i) {
          const { pixelRatio: t } = i
          ;(n.scaleX *= t), (n.scaleY *= t)
        }
        return o && o.scaleX && ((n.scaleX *= Math.abs(o.scaleX)), (n.scaleY *= Math.abs(o.scaleY))), n
      },
      recycleImage: function (t, e) {
        const i = e['_' + t]
        if (c(i)) {
          let s, n, o, r, a
          for (let h = 0, l = i.length; h < l; h++)
            (s = i[h]),
              (n = s.image),
              (a = n && n.url),
              a &&
                (o || (o = {}),
                (o[a] = !0),
                so.recyclePaint(s),
                n.loading &&
                  (r || ((r = (e.__input && e.__input[t]) || []), c(r) || (r = [r])),
                  n.unload(i[h].loadId, !r.some(t => t.url === a))))
          return o
        }
        return null
      },
      createPatternTask: function (t, e, i, s) {
        t.patternTask ||
          (t.patternTask = so.patternTasker.add(
            () =>
              ve(this, void 0, void 0, function* () {
                tl.createPattern(t, e, i, s), e.forceUpdate('surface')
              }),
            0,
            () => ((t.patternTask = null), i.bounds.hit(e.__nowWorld))
          ))
      },
      createPattern: function (t, e, i, s) {
        let { scaleX: n, scaleY: o } = tl.getImageRenderScaleData(t, e, i, s),
          r = n + '-' + o
        if (t.patternId !== r && !e.destroyed && (!w.image.isLarge(t.image, n, o) || t.data.repeat)) {
          const { image: i, data: s } = t,
            { transform: a, gap: h } = s,
            l = tl.getPatternFixScale(t, n, o)
          let d,
            c,
            u,
            { width: p, height: g } = i
          l && ((n *= l), (o *= l)),
            (p *= n),
            (g *= o),
            h && ((c = (h.x * n) / mu(s.scaleX || 1)), (u = (h.y * o) / mu(s.scaleY || 1))),
            (a || 1 !== n || 1 !== o) &&
              ((n *= fu(p + (c || 0))), (o *= fu(g + (u || 0))), (d = pu()), a && _u(d, a), gu(d, 1 / n, 1 / o))
          const _ = i.getCanvas(p, g, s.opacity, s.filters, c, u, e.leafer && e.leafer.config.smooth),
            f = i.getPattern(_, s.repeat || w.origin.noRepeat || 'no-repeat', d, t)
          ;(t.style = f), (t.patternId = r)
        }
      },
      getPatternFixScale: function (t, e, i) {
        const { image: s } = t
        let n,
          o = w.image.maxPatternSize,
          r = s.width * s.height
        return s.isSVG ? e > 1 && (n = Math.ceil(e) / e) : o > r && (o = r), (r *= e * i) > o && (n = Math.sqrt(o / r)), n
      },
      createData: function (t, e, i, s) {
        t.data = tl.getPatternData(i, s, e)
      },
      getPatternData: function (t, e, i) {
        t.padding && (e = $c.set(e).shrink(t.padding)), 'strench' === t.mode && (t.mode = 'stretch')
        const { width: s, height: n } = i,
          {
            opacity: o,
            mode: a,
            align: h,
            offset: l,
            scale: d,
            size: c,
            rotation: p,
            skew: g,
            clipSize: _,
            repeat: f,
            gap: m,
            filters: y
          } = t,
          v = e.width === s && e.height === n,
          w = { mode: a },
          x = 'center' !== h && (p || 0) % 180 == 90
        let b, E
        switch (
          (jt.set(Qc, 0, 0, x ? n : s, x ? s : n),
          a && 'cover' !== a && 'fit' !== a
            ? ((d || c) && (z.getScaleData(d, c, i, Jc), (b = Jc.scaleX), (E = Jc.scaleY)),
              (h || m || f) && (b && jt.scale(Qc, b, E, !0), h && Rt.toPoint(h, Qc, e, Qc, !0, !0)))
            : (v && !p) || ((b = E = jt.getFitScale(e, Qc, 'fit' !== a)), jt.put(e, i, h, b, !1, Qc), jt.scale(Qc, b, E, !0)),
          l && ut.move(Qc, l),
          a)
        ) {
          case 'stretch':
            v ? b && (b = E = void 0) : ((b = e.width / s), (E = e.height / n), tl.stretchMode(w, e, b, E))
            break
          case 'normal':
          case 'clip':
            if (Qc.x || Qc.y || b || _ || p || g) {
              let t, i
              _ && ((t = e.width / _.width), (i = e.height / _.height)),
                tl.clipMode(w, e, Qc.x, Qc.y, b, E, p, g, t, i),
                t && ((b = b ? b * t : t), (E = E ? E * i : i))
            }
            break
          case 'repeat':
            ;(!v || b || p || g) && tl.repeatMode(w, e, s, n, Qc.x, Qc.y, b, E, p, g, h, t.freeTransform),
              f || (w.repeat = 'repeat')
            const i = u(f)
            ;(m || i) &&
              (w.gap = (function (t, e, i, s, n) {
                let o, r
                u(t) ? ((o = t.x), (r = t.y)) : (o = r = t)
                return { x: tu(o, i, n.width, e && e.x), y: tu(r, s, n.height, e && e.y) }
              })(m, i && f, Qc.width, Qc.height, e))
            break
          default:
            b && tl.fillOrFitMode(w, e, Qc.x, Qc.y, b, E, p)
        }
        return (
          w.transform || ((e.x || e.y) && Zc((w.transform = qc()), e.x, e.y)),
          b && ((w.scaleX = b), (w.scaleY = E)),
          o && o < 1 && (w.opacity = o),
          y && (w.filters = y),
          f && (w.repeat = r(f) ? ('x' === f ? 'repeat-x' : 'repeat-y') : 'repeat'),
          w
        )
      },
      stretchMode: function (t, e, i, s) {
        const n = su(),
          { x: o, y: r } = e
        o || r ? ru(n, o, r) : (n.onlyScale = !0), lu(n, i, s), (t.transform = n)
      },
      fillOrFitMode: function (t, e, i, s, n, o, r) {
        const a = su()
        ru(a, e.x + i, e.y + s), lu(a, n, o), r && ou(a, { x: e.x + e.width / 2, y: e.y + e.height / 2 }, r), (t.transform = a)
      },
      clipMode: function (t, e, i, s, n, o, r, a, h, l) {
        const d = su()
        uu(d, e, i, s, n, o, r, a), h && (r || a ? (nu(iu), au(iu, e, h, l), hu(d, iu)) : au(d, e, h, l)), (t.transform = d)
      },
      repeatMode: function (t, e, i, s, n, o, r, a, h, l, d, c) {
        const u = su()
        if (c) uu(u, e, n, o, r, a, h, l)
        else {
          if (h)
            if ('center' === d) ou(u, { x: i / 2, y: s / 2 }, h)
            else
              switch ((du(u, h), h)) {
                case 90:
                  ru(u, s, 0)
                  break
                case 180:
                  ru(u, i, s)
                  break
                case 270:
                  ru(u, 0, i)
              }
          ;(eu.x = e.x + n), (eu.y = e.y + o), ru(u, eu.x, eu.y), r && au(u, eu, r, a)
        }
        t.transform = u
      }
    },
    { toPoint: vu } = Bt,
    { hasTransparent: wu } = Zh,
    xu = {},
    bu = {}
  function Eu(t, e, i, s) {
    if (i) {
      let n, o, a, h
      for (let t = 0, l = i.length; t < l; t++)
        (n = i[t]),
          r(n) ? ((a = t / (l - 1)), (o = Zh.string(n, s))) : ((a = n.offset), (o = Zh.string(n.color, s))),
          e.addColorStop(a, o),
          !h && wu(o) && (h = !0)
      h && (t.isTransparent = !0)
    }
  }
  const { getAngle: Tu, getDistance: Su } = ut,
    { get: ku, rotateOfOuter: Bu, scaleOfOuter: Pu } = tt,
    { toPoint: Lu } = Bt,
    Ru = {},
    Cu = {}
  function Ou(t, e, i, s, n) {
    let o
    const { width: r, height: a } = t
    if (r !== a || s) {
      const t = Tu(e, i)
      ;(o = ku()), n ? (Pu(o, e, (r / a) * (s || 1), 1), Bu(o, e, t + 90)) : (Pu(o, e, 1, (r / a) * (s || 1)), Bu(o, e, t))
    }
    return o
  }
  const { getDistance: Au } = ut,
    { toPoint: Du } = Bt,
    Mu = {},
    Iu = {}
  const Fu = {
      linearGradient: function (t, e) {
        let { from: i, to: s, type: n, opacity: o } = t
        vu(i || 'top', e, xu), vu(s || 'bottom', e, bu)
        const r = w.canvas.createLinearGradient(xu.x, xu.y, bu.x, bu.y),
          a = { type: n, style: r }
        return Eu(a, r, t.stops, o), a
      },
      radialGradient: function (t, e) {
        let { from: i, to: s, type: n, opacity: o, stretch: r } = t
        Lu(i || 'center', e, Ru), Lu(s || 'bottom', e, Cu)
        const a = w.canvas.createRadialGradient(Ru.x, Ru.y, 0, Ru.x, Ru.y, Su(Ru, Cu)),
          h = { type: n, style: a }
        Eu(h, a, t.stops, o)
        const l = Ou(e, Ru, Cu, r, !0)
        return l && (h.transform = l), h
      },
      conicGradient: function (t, e) {
        let { from: i, to: s, type: n, opacity: o, stretch: r } = t
        Du(i || 'center', e, Mu), Du(s || 'bottom', e, Iu)
        const a = w.conicGradientSupport
            ? w.canvas.createConicGradient(0, Mu.x, Mu.y)
            : w.canvas.createRadialGradient(Mu.x, Mu.y, 0, Mu.x, Mu.y, Au(Mu, Iu)),
          h = { type: n, style: a }
        Eu(h, a, t.stops, o)
        const l = Ou(e, Mu, Iu, r || 1, w.conicGradientRotate90)
        return l && (h.transform = l), h
      },
      getTransform: Ou
    },
    { copy: Wu, move: zu, toOffsetOutBounds: Uu } = jt,
    { max: Hu, abs: Nu } = Math,
    Yu = {},
    Xu = new wt(),
    Vu = {}
  function Gu(t, e) {
    let i,
      s,
      n,
      o,
      r = 0,
      a = 0,
      h = 0,
      l = 0
    return (
      e.forEach(t => {
        ;(i = t.x || 0),
          (s = t.y || 0),
          (o = 1.5 * (t.blur || 0)),
          (n = Nu(t.spread || 0)),
          (r = Hu(r, n + o - s)),
          (a = Hu(a, n + o + i)),
          (h = Hu(h, n + o + s)),
          (l = Hu(l, n + o - i))
      }),
      r === a && a === h && h === l ? r : [r, a, h, l]
    )
  }
  function ju(t, e, i) {
    const { shapeBounds: s } = i
    let n, o
    w.fullImageShadow ? (Wu(Yu, t.bounds), zu(Yu, e.x - s.x, e.y - s.y), (n = t.bounds), (o = Yu)) : ((n = s), (o = e)),
      t.copyWorld(i.canvas, n, o)
  }
  const { toOffsetOutBounds: Ku } = jt,
    qu = {}
  const Zu = Gu
  const $u = {
      shadow: function (t, e, i) {
        let s, n
        const { __nowWorld: o } = t,
          { shadow: r } = t.__,
          { worldCanvas: a, bounds: h, renderBounds: l, shapeBounds: d, scaleX: c, scaleY: u } = i,
          p = e.getSameCanvas(),
          g = r.length - 1
        Uu(h, Vu, l),
          r.forEach((r, _) => {
            let f = 1
            if (r.scaleFixed) {
              const t = Math.abs(o.scaleX)
              t > 1 && (f = 1 / t)
            }
            p.setWorldShadow(
              Vu.offsetX + (r.x || 0) * c * f,
              Vu.offsetY + (r.y || 0) * u * f,
              (r.blur || 0) * c * f,
              Zh.string(r.color)
            ),
              (n = il.getShadowTransform(t, p, i, r, Vu, f)),
              n && p.setTransform(n),
              ju(p, Vu, i),
              n && p.resetTransform(),
              (s = l),
              r.box &&
                (p.restore(),
                p.save(),
                a && (p.copyWorld(p, l, o, 'copy'), (s = o)),
                a ? p.copyWorld(a, o, o, 'destination-out') : p.copyWorld(i.canvas, d, h, 'destination-out')),
              lr.copyCanvasByWorld(t, e, p, s, r.blendMode),
              g && _ < g && p.clearWorld(s)
          }),
          p.recycle(s)
      },
      innerShadow: function (t, e, i) {
        let s, n
        const { __nowWorld: o } = t,
          { innerShadow: r } = t.__,
          { worldCanvas: a, bounds: h, renderBounds: l, shapeBounds: d, scaleX: c, scaleY: u } = i,
          p = e.getSameCanvas(),
          g = r.length - 1
        Ku(h, qu, l),
          r.forEach((r, _) => {
            let f = 1
            if (r.scaleFixed) {
              const t = Math.abs(o.scaleX)
              t > 1 && (f = 1 / t)
            }
            p.save(),
              p.setWorldShadow(qu.offsetX + (r.x || 0) * c * f, qu.offsetY + (r.y || 0) * u * f, (r.blur || 0) * c * f),
              (n = il.getShadowTransform(t, p, i, r, qu, f, !0)),
              n && p.setTransform(n),
              ju(p, qu, i),
              p.restore(),
              a
                ? (p.copyWorld(p, l, o, 'copy'), p.copyWorld(a, o, o, 'source-out'), (s = o))
                : (p.copyWorld(i.canvas, d, h, 'source-out'), (s = l)),
              p.fillWorld(s, Zh.string(r.color), 'source-in'),
              lr.copyCanvasByWorld(t, e, p, s, r.blendMode),
              g && _ < g && p.clearWorld(s)
          }),
          p.recycle(s)
      },
      blur: function (t, e, i) {
        const { blur: s } = t.__
        i.setWorldBlur(s * t.__nowWorld.a), i.copyWorldToInner(e, t.__nowWorld, t.__layout.renderBounds), (i.filter = 'none')
      },
      backgroundBlur: function (t, e, i) {},
      getShadowRenderSpread: Gu,
      getShadowTransform: function (t, e, i, s, n, o, r) {
        if (s.spread) {
          const i = 2 * s.spread * o * (r ? -1 : 1),
            { width: a, height: h } = t.__layout.strokeBounds
          return (
            Xu.set().scaleOfOuter(
              { x: (n.x + n.width / 2) * e.pixelRatio, y: (n.y + n.height / 2) * e.pixelRatio },
              1 + i / a,
              1 + i / h
            ),
            Xu
          )
        }
      },
      isTransformShadow(t) {},
      getInnerShadowSpread: Zu
    },
    { excludeRenderBounds: Ju } = mr
  let Qu
  function tp(t, e, i, s, n, o, r, a) {
    switch (e) {
      case 'grayscale':
        Qu || ((Qu = !0), n.useGrayscaleAlpha(t.__nowWorld))
      case 'alpha':
        !(function (t, e, i, s, n, o) {
          const r = t.__nowWorld
          i.resetTransform(), (i.opacity = 1), i.useMask(s, r), o && s.recycle(r)
          ip(t, e, i, 1, n, o)
        })(t, i, s, n, r, a)
        break
      case 'opacity-path':
        ip(t, i, s, o, r, a)
        break
      case 'path':
        a && i.restore()
    }
  }
  function ep(t) {
    return t.getSameCanvas(!1, !0)
  }
  function ip(t, e, i, s, n, o) {
    const r = t.__nowWorld
    e.resetTransform(), (e.opacity = s), e.copyWorld(i, r, void 0, n), o ? i.recycle(r) : i.clearWorld(r)
  }
  t.Group.prototype.__renderMask = function (t, e) {
    let i, s, n, o, r, a
    const { children: h } = this
    for (let l = 0, d = h.length; l < d; l++) {
      if (((i = h[l]), (a = i.__.mask), a)) {
        r && (tp(this, r, t, n, s, o, void 0, !0), (s = n = null)),
          ('clipping' !== a && 'clipping-path' !== a) || Ju(i, e) || i.__render(t, e),
          (o = i.__.opacity),
          (Qu = !1),
          'path' === a || 'clipping-path' === a
            ? (o < 1 ? ((r = 'opacity-path'), n || (n = ep(t))) : ((r = 'path'), t.save()), i.__clip(n || t, e))
            : ((r = 'grayscale' === a ? 'grayscale' : 'alpha'), s || (s = ep(t)), n || (n = ep(t)), i.__render(s, e))
        continue
      }
      const d = 1 === o && i.__.__blendMode
      d && tp(this, r, t, n, s, o, void 0, !1), Ju(i, e) || i.__render(n || t, e), d && tp(this, r, t, n, s, o, d, !1)
    }
    tp(this, r, t, n, s, o, void 0, !0)
  }
  const sp = '>)]}%!?,.:;\'"》）」〉』〗】〕｝┐＞’”！？，、。：；‰',
    np = sp + '_#~&*+\\=|≮≯≈≠＝…',
    op = new RegExp(
      [
        [19968, 40959],
        [13312, 19903],
        [131072, 173791],
        [173824, 177983],
        [177984, 178207],
        [178208, 183983],
        [183984, 191471],
        [196608, 201551],
        [201552, 205743],
        [11904, 12031],
        [12032, 12255],
        [12272, 12287],
        [12288, 12351],
        [12736, 12783],
        [12800, 13055],
        [13056, 13311],
        [63744, 64255],
        [65072, 65103],
        [127488, 127743],
        [194560, 195103]
      ]
        .map(([t, e]) => `[\\u${t.toString(16)}-\\u${e.toString(16)}]`)
        .join('|')
    )
  function rp(t) {
    const e = {}
    return t.split('').forEach(t => (e[t] = !0)), e
  }
  const ap = rp('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz'),
    hp = rp('{[(<\'"《（「〈『〖【〔｛┌＜‘“＝¥￥＄€£￡¢￠'),
    lp = rp(sp),
    dp = rp(np),
    cp = rp('- —／～｜┆·')
  var up
  !(function (t) {
    ;(t[(t.Letter = 0)] = 'Letter'),
      (t[(t.Single = 1)] = 'Single'),
      (t[(t.Before = 2)] = 'Before'),
      (t[(t.After = 3)] = 'After'),
      (t[(t.Symbol = 4)] = 'Symbol'),
      (t[(t.Break = 5)] = 'Break')
  })(up || (up = {}))
  const { Letter: pp, Single: gp, Before: _p, After: fp, Symbol: mp, Break: yp } = up
  function vp(t) {
    return ap[t] ? pp : cp[t] ? yp : hp[t] ? _p : lp[t] ? fp : dp[t] ? mp : op.test(t) ? gp : pp
  }
  const wp = {
    trimRight(t) {
      const { words: e } = t
      let i,
        s = 0,
        n = e.length
      for (let o = n - 1; o > -1 && ((i = e[o].data[0]), ' ' === i.char); o--) s++, (t.width -= i.width)
      s && e.splice(n - s, s)
    }
  }
  function xp(t, e, i) {
    switch (e) {
      case 'title':
        return i ? t.toUpperCase() : t
      case 'upper':
        return t.toUpperCase()
      case 'lower':
        return t.toLowerCase()
      default:
        return t
    }
  }
  const { trimRight: bp } = wp,
    { Letter: Ep, Single: Tp, Before: Sp, After: kp, Symbol: Bp, Break: Pp } = up
  let Lp,
    Rp,
    Cp,
    Op,
    Ap,
    Dp,
    Mp,
    Ip,
    Fp,
    Wp,
    zp,
    Up,
    Hp,
    Np,
    Yp,
    Xp,
    Vp,
    Gp = []
  function jp(t, e) {
    Fp && !Ip && (Ip = Fp), Lp.data.push({ char: t, width: e }), (Cp += e)
  }
  function Kp() {
    ;(Op += Cp), (Lp.width = Cp), Rp.words.push(Lp), (Lp = { data: [] }), (Cp = 0)
  }
  function qp() {
    Np && (Yp.paraNumber++, (Rp.paraStart = !0), (Np = !1)),
      Fp && ((Rp.startCharSize = Ip), (Rp.endCharSize = Fp), (Ip = 0)),
      (Rp.width = Op),
      Xp.width ? bp(Rp) : Vp && Zp(),
      Gp.push(Rp),
      (Rp = { words: [] }),
      (Op = 0)
  }
  function Zp() {
    Op > (Yp.maxWidth || 0) && (Yp.maxWidth = Op)
  }
  const { top: $p, right: Jp, bottom: Qp, left: tg } = t.Direction4
  function eg(t, e, i) {
    const { bounds: s, rows: n } = t
    s[e] += i
    for (let t = 0; t < n.length; t++) n[t][e] += i
  }
  const ig = {
    getDrawData: function (t, e) {
      r(t) || (t = String(t))
      let i = 0,
        s = 0,
        n = e.__getInput('width') || 0,
        o = e.__getInput('height') || 0
      const { __padding: a } = e
      a &&
        (n ? ((i = a[tg]), (n -= a[Jp] + a[tg]), !n && (n = 0.01)) : e.autoSizeAlign || (i = a[tg]),
        o ? ((s = a[$p]), (o -= a[$p] + a[Qp]), !o && (o = 0.01)) : e.autoSizeAlign || (s = a[$p]))
      const h = { bounds: { x: i, y: s, width: n, height: o }, rows: [], paraNumber: 0, font: (w.canvas.font = e.__font) }
      return (
        (function (t, e, i) {
          ;(Yp = t), (Gp = t.rows), (Xp = t.bounds), (Vp = !Xp.width && !i.autoSizeAlign)
          const { __letterSpacing: s, paraIndent: n, textCase: o } = i,
            { canvas: r } = w,
            { width: a } = Xp
          if (i.__isCharMode) {
            const t = 'none' !== i.textWrap,
              h = 'break' === i.textWrap
            ;(Np = !0), (zp = null), (Ip = Mp = Fp = Cp = Op = 0), (Lp = { data: [] }), (Rp = { words: [] }), s && (e = [...e])
            for (let i = 0, l = e.length; i < l; i++)
              (Dp = e[i]),
                '\n' === Dp
                  ? (Cp && Kp(), (Rp.paraEnd = !0), qp(), (Np = !0))
                  : ((Wp = vp(Dp)),
                    Wp === Ep && 'none' !== o && (Dp = xp(Dp, o, !Cp)),
                    (Mp = r.measureText(Dp).width),
                    s && (s < 0 && (Fp = Mp), (Mp += s)),
                    (Up = (Wp === Tp && (zp === Tp || zp === Ep)) || (zp === Tp && Wp !== kp)),
                    (Hp = !((Wp !== Sp && Wp !== Tp) || (zp !== Bp && zp !== kp))),
                    (Ap = Np && n ? a - n : a),
                    t &&
                      a &&
                      Op + Cp + Mp > Ap &&
                      (h
                        ? (Cp && Kp(), Op && qp())
                        : (Hp || (Hp = Wp === Ep && zp == kp),
                          Up || Hp || Wp === Pp || Wp === Sp || Wp === Tp || Cp + Mp > Ap
                            ? (Cp && Kp(), Op && qp())
                            : Op && qp())),
                    (' ' === Dp && !0 !== Np && Op + Cp === 0) ||
                      (Wp === Pp
                        ? (' ' === Dp && Cp && Kp(), jp(Dp, Mp), Kp())
                        : Up || Hp
                        ? (Cp && Kp(), jp(Dp, Mp))
                        : jp(Dp, Mp)),
                    (zp = Wp))
            Cp && Kp(), Op && qp(), Gp.length > 0 && (Gp[Gp.length - 1].paraEnd = !0)
          } else
            e.split('\n').forEach(t => {
              Yp.paraNumber++,
                (Op = r.measureText(t).width),
                Gp.push({ x: n || 0, text: t, width: Op, paraStart: !0 }),
                Vp && Zp()
            })
        })(h, t, e),
        a &&
          (function (t, e, i, s, n) {
            if (!s && i.autoSizeAlign)
              switch (i.textAlign) {
                case 'left':
                  eg(e, 'x', t[tg])
                  break
                case 'right':
                  eg(e, 'x', -t[Jp])
              }
            if (!n && i.autoSizeAlign)
              switch (i.verticalAlign) {
                case 'top':
                  eg(e, 'y', t[$p])
                  break
                case 'bottom':
                  eg(e, 'y', -t[Qp])
              }
          })(a, h, e, n, o),
        (function (t, e) {
          const { rows: i, bounds: s } = t,
            n = i.length,
            {
              __lineHeight: o,
              __baseLine: r,
              __letterSpacing: a,
              __clipText: h,
              textAlign: l,
              verticalAlign: d,
              paraSpacing: c,
              autoSizeAlign: u
            } = e
          let { x: p, y: g, width: _, height: f } = s,
            m = o * n + (c ? c * (t.paraNumber - 1) : 0),
            y = r
          if (h && m > f) (m = Math.max(f, o)), n > 1 && (t.overflow = n)
          else if (f || u)
            switch (d) {
              case 'middle':
                g += (f - m) / 2
                break
              case 'bottom':
                g += f - m
            }
          y += g
          let v,
            w,
            x,
            b = _ || u ? _ : t.maxWidth
          for (let r = 0, d = n; r < d; r++) {
            if (((v = i[r]), (v.x = p), v.width < _ || (v.width > _ && !h)))
              switch (l) {
                case 'center':
                  v.x += (b - v.width) / 2
                  break
                case 'right':
                  v.x += b - v.width
              }
            v.paraStart && c && r > 0 && (y += c),
              (v.y = y),
              (y += o),
              t.overflow > r && y > m && ((v.isOverflow = !0), (t.overflow = r + 1)),
              (w = v.x),
              (x = v.width),
              a < 0 && (v.width < 0 ? ((x = -v.width + e.fontSize + a), (w -= x), (x += e.fontSize)) : (x -= a)),
              w < s.x && (s.x = w),
              x > s.width && (s.width = x),
              h && _ && _ < x && ((v.isOverflow = !0), t.overflow || (t.overflow = i.length))
          }
          ;(s.y = g), (s.height = m)
        })(h, e),
        e.__isCharMode &&
          (function (t, e, i) {
            const { rows: s } = t,
              { textAlign: n, paraIndent: o, letterSpacing: r } = e,
              a = i && n.includes('both'),
              h = a || (i && n.includes('justify')),
              l = h && n.includes('letter')
            let d, c, u, p, g, _, f, m, y, v
            s.forEach(t => {
              t.words &&
                ((g = o && t.paraStart ? o : 0),
                (m = t.words.length),
                h &&
                  ((v = !t.paraEnd || a),
                  (c = i - t.width - g),
                  l ? (p = c / (t.words.reduce((t, e) => t + e.data.length, 0) - 1)) : (u = m > 1 ? c / (m - 1) : 0)),
                (_ = r || t.isOverflow || l ? 0 : u ? 1 : 2),
                t.isOverflow && !r && (t.textMode = !0),
                2 === _
                  ? ((t.x += g),
                    (function (t) {
                      ;(t.text = ''),
                        t.words.forEach(e => {
                          e.data.forEach(e => {
                            t.text += e.char
                          })
                        })
                    })(t))
                  : ((t.x += g),
                    (d = t.x),
                    (t.data = []),
                    t.words.forEach((e, i) => {
                      1 === _
                        ? ((f = { char: '', x: d }),
                          (d = (function (t, e, i) {
                            return (
                              t.forEach(t => {
                                ;(i.char += t.char), (e += t.width)
                              }),
                              e
                            )
                          })(e.data, d, f)),
                          (t.isOverflow || ' ' !== f.char) && t.data.push(f))
                        : (d = (function (t, e, i, s, n) {
                            return (
                              t.forEach(t => {
                                ;(s || ' ' !== t.char) && ((t.x = e), i.push(t)), (e += t.width), n && (e += n)
                              }),
                              e
                            )
                          })(e.data, d, t.data, t.isOverflow, v && p)),
                        v &&
                          ((y = i === m - 1),
                          u ? y || ((d += u), (t.width += u)) : p && (t.width += p * (e.data.length - (y ? 1 : 0))))
                    })),
                (t.words = null))
            })
          })(h, e, n),
        h.overflow &&
          (function (t, e, i, s) {
            if (!s) return
            const { rows: n, overflow: o } = t
            let { textOverflow: r } = e
            if ((n.splice(o), r && 'show' !== r)) {
              let t, a
              'hide' === r ? (r = '') : 'ellipsis' === r && (r = '...')
              const h = r ? w.canvas.measureText(r).width : 0,
                l = i + s - h
              ;('none' === e.textWrap ? n : [n[o - 1]]).forEach(e => {
                if (e.isOverflow && e.data) {
                  let i = e.data.length - 1
                  for (let s = i; s > -1 && ((t = e.data[s]), (a = t.x + t.width), !(s === i && a < l)); s--) {
                    if ((a < l && ' ' !== t.char) || !s) {
                      e.data.splice(s + 1), (e.width -= t.width)
                      break
                    }
                    e.width -= t.width
                  }
                  ;(e.width += h),
                    e.data.push({ char: r, x: a }),
                    e.textMode &&
                      (function (t) {
                        ;(t.text = ''),
                          t.data.forEach(e => {
                            t.text += e.char
                          }),
                          (t.data = null)
                      })(e)
                }
              })
            }
          })(h, e, i, n),
        'none' !== e.textDecoration &&
          (function (t, e) {
            let i,
              s = 0
            const { fontSize: n, textDecoration: o } = e
            switch (
              ((t.decorationHeight = n / 11),
              u(o)
                ? ((i = o.type),
                  o.color && (t.decorationColor = Zh.string(o.color)),
                  o.offset && (s = Math.min(0.3 * n, Math.max(o.offset, 0.15 * -n))))
                : (i = o),
              i)
            ) {
              case 'under':
                t.decorationY = [0.15 * n + s]
                break
              case 'delete':
                t.decorationY = [0.35 * -n]
                break
              case 'under-delete':
                t.decorationY = [0.15 * n + s, 0.35 * -n]
            }
          })(h, e),
        h
      )
    }
  }
  const sg = {
    string: function (t, e) {
      if (!t) return '#000'
      const i = h(e) && e < 1
      if (r(t)) {
        if (!i || !Zh.object) return t
        t = Zh.object(t)
      }
      let s = n(t.a) ? 1 : t.a
      i && (s *= e)
      const o = t.r + ',' + t.g + ',' + t.b
      return 1 === s ? 'rgb(' + o + ')' : 'rgba(' + o + ',' + s + ')'
    }
  }
  function ng(t) {
    return t ? (c(t) ? t : [t]) : []
  }
  Object.assign(qh, ig),
    Object.assign(Zh, sg),
    Object.assign(Qh, zc),
    Object.assign(tl, yu),
    Object.assign(el, Fu),
    Object.assign(il, $u),
    Object.assign(de, {
      interaction: (t, e, i, s) => new bc(t, e, i, s),
      hitCanvas: (t, e) => new bh(t, e),
      hitCanvasManager: () => new oc()
    }),
    Sh()
  class og extends Wr {
    get list() {
      return ng(this.value)
    }
    get oldList() {
      return ng(this.oldValue)
    }
    constructor(t, e) {
      super(t), e && Object.assign(this, e)
    }
  }
  function rg(t) {
    return (e, i) => {
      const s = '_' + i
      ho(e, i, {
        get() {
          return this[s]
        },
        set(e) {
          const n = this[s]
          if (n !== e) {
            const o = this
            if (o.config) {
              const t = 'target' === i
              if (t) {
                const { beforeSelect: t } = o.config
                if (t) {
                  const i = t({ target: e })
                  if (u(i)) e = i
                  else if (!1 === i) return
                }
                o.setDimOthers(!1),
                  o.setBright(!1),
                  c(e) && e.length > 1 && e[0].locked && e.splice(0, 1),
                  o.single && (delete o.element.syncEventer, delete o.element.__world.ignorePixelSnap)
              }
              const s = t ? og.BEFORE_SELECT : og.BEFORE_HOVER
              this.hasEvent(s) && this.emitEvent(new og(s, { editor: o, value: e, oldValue: n }))
            }
            ;(this[s] = e), t(this, n)
          }
        }
      })
    }
  }
  ;(og.BEFORE_SELECT = 'editor.before_select'),
    (og.SELECT = 'editor.select'),
    (og.AFTER_SELECT = 'editor.after_select'),
    (og.BEFORE_HOVER = 'editor.before_hover'),
    (og.HOVER = 'editor.hover')
  const { abs: ag } = Math,
    { copy: hg } = tt,
    { setListWithFn: lg } = jt,
    { worldBounds: dg } = mr,
    cg = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 },
    ug = { x: 0, y: 0, width: 0, height: 0 }
  class pg extends t.UI {
    constructor() {
      super(), (this.list = []), (this.visible = 0), (this.hittable = !1), (this.strokeAlign = 'center')
    }
    setTarget(t, e) {
      e && this.set(e), (this.target = t), this.update()
    }
    update(t) {
      const { list: e } = this
      e.length ? (lg(ug, e, dg), t && this.set(t), this.set(ug), (this.visible = !0)) : (this.visible = 0)
    }
    __draw(t, e) {
      const { list: i } = this
      if (i.length) {
        let s
        const n = this.__,
          { stroke: o, strokeWidth: a, fill: h } = n,
          { bounds: l } = e
        for (let d = 0; d < i.length; d++) {
          s = i[d]
          const { worldTransform: c, worldRenderBounds: u } = s
          if (u.width && u.height && (!l || l.hit(u, e.matrix))) {
            const i = ag(c.scaleX),
              l = ag(c.scaleY)
            hg(cg, c),
              (cg.half = a % 2),
              t.setWorld(cg, e.matrix),
              t.beginPath(),
              'path' === this.strokePathType || s.__.__useArrow
                ? s.__drawPath(t)
                : s.__.__pathForRender
                ? s.__drawRenderPath(t)
                : s.__drawPathByBox(t),
              (n.strokeWidth = a / Math.max(i, l)),
              o && (r(o) ? Qh.stroke(o, this, t, e) : Qh.strokes(o, this, t, e)),
              h && (r(h) ? Qh.fill(h, this, t, e) : Qh.fills(h, this, t, e))
          }
        }
        n.strokeWidth = a
      }
    }
    destroy() {
      ;(this.target = null), super.destroy()
    }
  }
  ye(
    [
      rg(function (t) {
        const e = t.target
        t.list = e ? (c(e) ? e : [e]) : []
      })
    ],
    pg.prototype,
    'target',
    void 0
  ),
    ye([Ro('render-path')], pg.prototype, 'strokePathType', void 0)
  class gg extends t.Group {
    constructor(e) {
      super(e),
        (this.strokeArea = new t.Rect({ strokeAlign: 'center' })),
        (this.fillArea = new t.Rect()),
        (this.visible = 0),
        (this.hittable = !1),
        this.addMany(this.fillArea, this.strokeArea)
    }
    setStyle(t, e) {
      const { visible: i, stroke: s, strokeWidth: n } = t
      ;(this.visible = i),
        this.strokeArea.reset(Object.assign({ stroke: s, strokeWidth: n }, e || {})),
        this.fillArea.reset({ visible: !e, fill: s, opacity: 0.2 })
    }
    setBounds(t) {
      this.strokeArea.set(t), this.fillArea.set(t)
    }
  }
  const _g = {
    findOne: t => t.list.find(t => t.editable),
    findByBounds(t, e) {
      const i = []
      return fg([t], i, e), i
    }
  }
  function fg(t, e, i) {
    let s, n
    for (let o = 0, r = t.length; o < r; o++)
      if (((s = t[o]), (n = s.__), n.hittable && n.visible && !n.locked && i.hit(s.__world))) {
        if (n.editable) {
          if (s.isBranch && !n.hitChildren) {
            n.hitSelf && e.push(s)
            continue
          }
          if (s.isFrame) {
            if (i.includes(s.__layout.boxBounds, s.__world)) {
              e.push(s)
              continue
            }
          } else i.hit(s.__layout.boxBounds, s.__world) && n.hitSelf && e.push(s)
        }
        s.isBranch && fg(s.children, e, i)
      }
  }
  const { findOne: mg, findByBounds: yg } = _g
  class vg extends t.Group {
    get dragging() {
      return !!this.originList
    }
    get running() {
      const { editor: t, app: e } = this
      return this.hittable && t.visible && t.hittable && t.mergeConfig.selector && e && 'normal' === e.mode
    }
    get isMoveMode() {
      const { app: t } = this
      return t && t.interaction.moveMode
    }
    constructor(t) {
      super(),
        (this.hoverStroker = new pg()),
        (this.targetStroker = new pg()),
        (this.bounds = new $t()),
        (this.selectArea = new gg()),
        (this.__eventIds = []),
        (this.editor = t),
        this.addMany(this.targetStroker, this.hoverStroker, this.selectArea),
        this.__listenEvents()
    }
    onHover() {
      const { editor: t } = this
      if (!this.running || this.dragging || t.dragging) this.hoverStroker.target = null
      else {
        const { hoverTarget: e, mergeConfig: i } = t,
          s = Object.assign({}, i)
        e && e.editConfig && Object.assign(s, e.editConfig)
        const { stroke: n, strokeWidth: o, hover: r, hoverStyle: a } = s
        this.hoverStroker.setTarget(r ? e : null, Object.assign({ stroke: n, strokeWidth: o }, a || {}))
      }
    }
    onSelect() {
      this.running && (this.targetStroker.setTarget(this.editor.list), (this.hoverStroker.target = null))
    }
    update() {
      this.hoverStroker.update()
      const { stroke: t, strokeWidth: e, selectedPathType: i, selectedStyle: s } = this.editor.mergedConfig
      this.targetStroker.update(Object.assign({ stroke: t, strokeWidth: e && Math.max(1, e / 2), strokePathType: i }, s || {}))
    }
    onPointerMove(t) {
      const { app: e, editor: i } = this
      if (this.running && !this.isMoveMode && e.interaction.canHover && !e.interaction.dragging) {
        const e = this.findUI(t)
        i.hoverTarget = i.hasItem(e) ? null : e
      }
      this.isMoveMode && (i.hoverTarget = null)
    }
    onBeforeDown(t) {
      if (t.multiTouch) return
      const { select: e } = this.editor.mergeConfig
      'press' === e && (this.app.config.mobile ? (this.waitSelect = () => this.checkAndSelect(t)) : this.checkAndSelect(t))
    }
    onTap(t) {
      if (t.multiTouch) return
      const { editor: e } = this,
        { select: i, selectKeep: s } = e.mergeConfig
      'tap' === i ? this.checkAndSelect(t) : this.waitSelect && this.waitSelect(),
        this.needRemoveItem ? e.removeItem(this.needRemoveItem) : this.isMoveMode && (s || (e.target = null))
    }
    checkAndSelect(t) {
      if (((this.needRemoveItem = null), this.allowSelect(t))) {
        const { editor: e } = this,
          i = this.findUI(t)
        i
          ? this.isMultipleSelect(t)
            ? e.hasItem(i)
              ? (this.needRemoveItem = i)
              : e.addItem(i)
            : (e.target = i)
          : this.allow(t.target) && (this.isHoldMultipleSelectKey(t) || this.editor.mergedConfig.selectKeep || (e.target = null))
      }
    }
    onDragStart(t) {
      if (!t.multiTouch && (this.waitSelect && this.waitSelect(), this.allowDrag(t))) {
        const { editor: e } = this,
          { stroke: i, area: s } = e.mergeConfig,
          { x: n, y: o } = t.getInnerPoint(this)
        this.bounds.set(n, o),
          this.selectArea.setStyle({ visible: !0, stroke: i, x: n, y: o }, s),
          this.selectArea.setBounds(this.bounds.get()),
          (this.originList = e.leafList.clone())
      }
    }
    onDrag(t) {
      if (!t.multiTouch) {
        if (this.editor.dragging) return this.onDragEnd(t)
        if (this.dragging) {
          const { editor: e } = this,
            i = t.getInnerTotal(this),
            s = this.bounds.clone().unsign(),
            n = new vh(yg(e.app, s))
          if (((this.bounds.width = i.x), (this.bounds.height = i.y), this.selectArea.setBounds(s.get()), n.length)) {
            const t = []
            this.originList.forEach(e => {
              n.has(e) || t.push(e)
            }),
              n.forEach(e => {
                this.originList.has(e) || t.push(e)
              }),
              (t.length !== e.list.length || e.list.some((e, i) => e !== t[i])) && (e.target = t)
          } else e.target = this.originList.list
        }
      }
    }
    onDragEnd(t) {
      t.multiTouch || (this.dragging && ((this.originList = null), (this.selectArea.visible = 0)))
    }
    onAutoMove(t) {
      if (this.dragging) {
        const { x: e, y: i } = t.getLocalMove(this)
        ;(this.bounds.x += e), (this.bounds.y += i)
      }
    }
    allow(t) {
      return t.leafer !== this.editor.leafer
    }
    allowDrag(t) {
      const { boxSelect: e, multipleSelect: i } = this.editor.mergeConfig
      return (
        !(!(this.running && i && e) || t.target.draggable) &&
        ((!this.editor.editing && this.allow(t.target)) || (this.isHoldMultipleSelectKey(t) && !mg(t.path)))
      )
    }
    allowSelect(t) {
      return this.running && !this.isMoveMode && !t.middle
    }
    findDeepOne(t) {
      const e = { exclude: new vh(this.editor.editBox.rect) }
      return mg(t.target.leafer.interaction.findPath(t, e))
    }
    findUI(t) {
      return this.isMultipleSelect(t) ? this.findDeepOne(t) : mg(t.path)
    }
    isMultipleSelect(t) {
      const { multipleSelect: e, continuousSelect: i } = this.editor.mergeConfig
      return e && (this.isHoldMultipleSelectKey(t) || i)
    }
    isHoldMultipleSelectKey(t) {
      const { multipleSelectKey: e } = this.editor.mergedConfig
      return e ? t.isHoldKeys(e) : t.shiftKey
    }
    __listenEvents() {
      const { editor: e } = this
      e.waitLeafer(() => {
        const { app: i } = e
        ;(i.selector.proxy = e),
          (this.__eventIds = [
            e.on_([
              [og.HOVER, this.onHover, this],
              [og.SELECT, this.onSelect, this]
            ]),
            i.on_([
              [t.PointerEvent.MOVE, this.onPointerMove, this],
              [t.PointerEvent.BEFORE_DOWN, this.onBeforeDown, this],
              [t.PointerEvent.TAP, this.onTap, this],
              [t.DragEvent.START, this.onDragStart, this, !0],
              [t.DragEvent.DRAG, this.onDrag, this],
              [t.DragEvent.END, this.onDragEnd, this],
              [t.MoveEvent.MOVE, this.onAutoMove, this],
              [
                [t.ZoomEvent.ZOOM, t.MoveEvent.MOVE],
                () => {
                  this.editor.hoverTarget = null
                }
              ]
            ])
          ])
      })
    }
    __removeListenEvents() {
      this.off_(this.__eventIds)
    }
    destroy() {
      ;(this.editor = this.originList = this.needRemoveItem = null), this.__removeListenEvents(), super.destroy()
    }
  }
  const { topLeft: wg, top: xg, topRight: bg, right: Eg, bottomRight: Tg, bottom: Sg, bottomLeft: kg, left: Bg } = t.Direction9,
    { toPoint: Pg } = Bt,
    { within: Lg, sign: Rg } = z,
    { abs: Cg } = Math,
    Og = {
      getScaleData(t, e, i, s, n, o, r, a) {
        let l,
          d,
          c = {},
          u = 1,
          p = 1
        const { boxBounds: g, widthRange: _, heightRange: f, dragBounds: m, worldBoxBounds: y } = t,
          { width: v, height: w } = e,
          x = t.scaleX / e.scaleX,
          b = t.scaleY / e.scaleY,
          E = Rg(x),
          T = Rg(b),
          S = a ? x : (E * g.width) / v,
          k = a ? b : (T * g.height) / w
        if (h(s)) u = p = Math.sqrt(s)
        else {
          o && ((s.x *= 2), (s.y *= 2)), (s.x *= a ? x : E), (s.y *= a ? b : T)
          const t = (-s.y + w) / w,
            e = (s.x + v) / v,
            r = (s.y + w) / w,
            h = (-s.x + v) / v
          switch (i) {
            case xg:
              ;(p = t), (l = 'bottom')
              break
            case Eg:
              ;(u = e), (l = 'left')
              break
            case Sg:
              ;(p = r), (l = 'top')
              break
            case Bg:
              ;(u = h), (l = 'right')
              break
            case wg:
              ;(p = t), (u = h), (l = 'bottom-right')
              break
            case bg:
              ;(p = t), (u = e), (l = 'bottom-left')
              break
            case Tg:
              ;(p = r), (u = e), (l = 'top-left')
              break
            case kg:
              ;(p = r), (u = h), (l = 'top-right')
          }
          if (n)
            if ('corner' === n && i % 2) n = !1
            else
              switch (i) {
                case xg:
                case Sg:
                  u = p
                  break
                case Bg:
                case Eg:
                  p = u
                  break
                default:
                  ;(d = Math.sqrt(Cg(u * p))), (u = Rg(u) * d), (p = Rg(p) * d)
              }
        }
        const B = 1 !== u,
          P = 1 !== p
        if ((B && (u /= S), P && (p /= k), !r)) {
          const { worldTransform: e } = t
          u < 0 && (u = 1 / g.width / e.scaleX), p < 0 && (p = 1 / g.height / e.scaleY)
        }
        if ((Pg(o || l, g, c, !0), m)) {
          const e = { x: u, y: p }
          Md.limitScaleOf(t, c, e, n), (u = e.x), (p = e.y)
        }
        if (B && _) {
          const e = g.width * t.scaleX
          u = Lg(e * u, _) / e
        }
        if (P && f) {
          const e = g.height * t.scaleY
          p = Lg(e * p, f) / e
        }
        return (
          B && Cg(u * y.width) < 1 && (u = Rg(u) / y.width),
          P && Cg(p * y.height) < 1 && (p = Rg(p) / y.height),
          n && u !== p && ((d = Math.min(Cg(u), Cg(p))), (u = Rg(u) * d), (p = Rg(p) * d)),
          isFinite(u) || (u = 1),
          isFinite(p) || (p = 1),
          { origin: c, scaleX: u, scaleY: p, direction: i, lockRatio: n, around: o }
        )
      },
      getRotateData(t, e, i, s, n) {
        let o,
          r = {}
        switch (e) {
          case wg:
            o = 'bottom-right'
            break
          case bg:
            o = 'bottom-left'
            break
          case Tg:
            o = 'top-left'
            break
          case kg:
            o = 'top-right'
            break
          default:
            o = 'center'
        }
        return Pg(n || o, t.boxBounds, r, !0), { origin: r, rotation: ut.getRotation(s, t.getWorldPointByBox(r), i) }
      },
      getSkewData(t, e, i, s) {
        let n,
          o,
          r = {},
          a = 0,
          h = 0
        switch (e) {
          case xg:
          case wg:
            ;(o = { x: 0.5, y: 0 }), (n = 'bottom'), (a = 1)
            break
          case Sg:
          case Tg:
            ;(o = { x: 0.5, y: 1 }), (n = 'top'), (a = 1)
            break
          case Bg:
          case kg:
            ;(o = { x: 0, y: 0.5 }), (n = 'right'), (h = 1)
            break
          case Eg:
          case bg:
            ;(o = { x: 1, y: 0.5 }), (n = 'left'), (h = 1)
        }
        const { width: l, height: d } = t
        ;(o.x = o.x * l), (o.y = o.y * d), Pg(s || n, t, r, !0)
        const c = ut.getRotation(o, r, { x: o.x + (a ? i.x : 0), y: o.y + (h ? i.y : 0) })
        return a ? (a = -c) : (h = c), { origin: r, skewX: a, skewY: h }
      },
      getAround: (t, e) => (e && !t ? 'center' : t),
      getRotateDirection: (t, e, i = 8) => ((t = (t + Math.round(e / (360 / i))) % i) < 0 && (t += i), t),
      getFlipDirection(t, e, i) {
        if (e)
          switch (t) {
            case Bg:
              t = Eg
              break
            case wg:
              t = bg
              break
            case kg:
              t = Tg
              break
            case Eg:
              t = Bg
              break
            case bg:
              t = wg
              break
            case Tg:
              t = kg
          }
        if (i)
          switch (t) {
            case xg:
              t = Sg
              break
            case wg:
              t = kg
              break
            case bg:
              t = Tg
              break
            case Sg:
              t = xg
              break
            case kg:
              t = wg
              break
            case Tg:
              t = bg
          }
        return t
      }
    },
    Ag = {}
  function Dg(t, e) {
    const { enterPoint: i, dragging: s, skewing: n, resizing: o, flippedX: r, flippedY: a } = t
    if (!i || !t.editor.editing || !t.canUse) return
    if ('rect' === i.name) return Mg(t)
    if ('circle' === i.name) return
    let { rotation: h } = t
    const { pointType: l } = i,
      {
        moveCursor: d,
        resizeCursor: c,
        rotateCursor: u,
        skewCursor: p,
        moveable: g,
        resizeable: _,
        rotateable: f,
        skewable: m
      } = t.mergeConfig
    if ('move' === l) return (i.cursor = d), void (g || (i.visible = !1))
    if ('button' === l) return void (i.cursor || (i.cursor = 'pointer'))
    let y = l.includes('resize')
    y && f && (t.isHoldRotateKey(e) || !_) && (y = !1)
    const v = m && !y && ('resize-line' === i.name || 'skew' === l),
      w = s ? (n ? p : o ? c : u) : v ? p : y ? c : u
    ;(h += 45 * (Og.getFlipDirection(i.direction, r, a) + 1)), (h = 2 * Math.round(z.formatRotation(h, !0) / 2))
    const { url: x, x: b, y: E } = w,
      T = x + h
    Ag[T] ? (i.cursor = Ag[T]) : (Ag[T] = i.cursor = { url: Ig(x, h), x: b, y: E })
  }
  function Mg(t) {
    const { moveCursor: e, moveable: i } = t.mergeConfig
    t.canUse && (t.rect.cursor = i ? e : void 0)
  }
  function Ig(t, e) {
    return '"data:image/svg+xml,' + encodeURIComponent(t.replace('{{rotation}}', e.toString())) + '"'
  }
  class Fg extends t.Box {
    constructor(t) {
      super(t), (this.useFastShadow = !0)
    }
  }
  const Wg = ['top', 'right', 'bottom', 'left'],
    zg = void 0
  class Ug extends t.Group {
    get mergeConfig() {
      const { config: t } = this,
        { mergeConfig: e, editBox: i } = this.editor
      return (this.mergedConfig = t && i !== this ? Object.assign(Object.assign({}, e), t) : e)
    }
    get target() {
      return this._target || this.editor.element
    }
    set target(t) {
      this._target = t
    }
    get single() {
      return !!this._target || this.editor.single
    }
    get transformTool() {
      return this._transformTool || this.editor
    }
    set transformTool(t) {
      this._transformTool = t
    }
    get flipped() {
      return this.flippedX || this.flippedY
    }
    get flippedX() {
      return this.scaleX < 0
    }
    get flippedY() {
      return this.scaleY < 0
    }
    get flippedOne() {
      return this.scaleX * this.scaleY < 0
    }
    get canUse() {
      return this.app && this.editor.editing
    }
    get canGesture() {
      if (!this.canUse) return !1
      const { moveable: t, resizeable: e, rotateable: i } = this.mergeConfig
      return r(t) || r(e) || r(i)
    }
    get canDragLimitAnimate() {
      return this.moving && this.mergeConfig.dragLimitAnimate && this.target.dragBounds
    }
    constructor(e) {
      super(),
        (this.view = new t.Group()),
        (this.rect = new Fg({ name: 'rect', hitFill: 'all', hitStroke: 'none', strokeAlign: 'center', hitRadius: 5 })),
        (this.circle = new Fg({ name: 'circle', strokeAlign: 'center', around: 'center', cursor: 'crosshair', hitRadius: 5 })),
        (this.buttons = new t.Group({ around: 'center', hitSelf: !1, visible: 0 })),
        (this.resizePoints = []),
        (this.rotatePoints = []),
        (this.resizeLines = []),
        (this.dragStartData = {}),
        (this.__eventIds = []),
        (this.editor = e),
        (this.visible = !1),
        this.create(),
        this.__listenEvents()
    }
    create() {
      let t, e, i
      const { view: s, resizePoints: n, rotatePoints: o, resizeLines: r, rect: a, circle: h, buttons: l } = this,
        d = ['bottom-right', 'bottom', 'bottom-left', 'left', 'top-left', 'top', 'top-right', 'right']
      for (let s = 0; s < 8; s++)
        (t = new Fg({ name: 'rotate-point', around: d[s], width: 15, height: 15, hitFill: 'all' })),
          o.push(t),
          this.listenPointEvents(t, 'rotate', s),
          s % 2 &&
            ((e = new Fg({ name: 'resize-line', around: 'center', width: 10, height: 10, hitFill: 'all' })),
            r.push(e),
            this.listenPointEvents(e, 'resize', s)),
          (i = new Fg({ name: 'resize-point', hitRadius: 5 })),
          n.push(i),
          this.listenPointEvents(i, 'resize', s)
      this.listenPointEvents(h, 'rotate', 2),
        this.listenPointEvents(a, 'move', 8),
        s.addMany(...o, a, h, l, ...r, ...n),
        this.add(s)
    }
    load() {
      const { target: t, mergeConfig: e, single: i, rect: s, circle: n, resizePoints: r, resizeLines: a } = this,
        { stroke: h, strokeWidth: l, ignorePixelSnap: d } = e,
        c = this.getPointsStyle(),
        u = this.getMiddlePointsStyle(),
        p = this.getResizeLinesStyle()
      let g
      this.visible = !t.locked
      for (let t = 0; t < 8; t++)
        (g = r[t]),
          g.set(this.getPointStyle(t % 2 ? u[((t - 1) / 2) % u.length] : c[(t / 2) % c.length])),
          (g.rotation = ((t - (t % 2 ? 1 : 0)) / 2) * 90),
          t % 2 &&
            a[(t - 1) / 2].set(
              Object.assign({ pointType: 'resize', rotation: ((t - 1) / 2) * 90 }, p[((t - 1) / 2) % p.length] || {})
            )
      n.set(this.getPointStyle(e.circle || e.rotatePoint || c[0])),
        s.set(Object.assign({ stroke: h, strokeWidth: l, opacity: 1, editConfig: zg }, e.rect || {}))
      const f = o(e.rectThrough) ? i : e.rectThrough
      ;(s.hittable = !f),
        f && ((t.syncEventer = s), (this.app.interaction.bottomList = [{ target: s, proxy: t }])),
        i && _.stintSet(t.__world, 'ignorePixelSnap', d),
        Mg(this)
    }
    update() {
      const { editor: t } = this,
        {
          x: e,
          y: i,
          scaleX: s,
          scaleY: n,
          rotation: o,
          skewX: r,
          skewY: a,
          width: h,
          height: l
        } = this.target.getLayoutBounds('box', t, !0)
      ;(this.visible = !this.target.locked),
        this.set({ x: e, y: i, scaleX: s, scaleY: n, rotation: o, skewX: r, skewY: a }),
        this.updateBounds({ x: 0, y: 0, width: h, height: l })
    }
    unload() {
      ;(this.visible = !1), this.app && (this.rect.syncEventer = this.app.interaction.bottomList = null)
    }
    updateBounds(t) {
      const {
          editor: e,
          mergeConfig: i,
          single: s,
          rect: n,
          circle: o,
          buttons: r,
          resizePoints: a,
          rotatePoints: l,
          resizeLines: d
        } = this,
        { editMask: c } = e,
        {
          middlePoint: u,
          resizeable: p,
          rotateable: g,
          hideOnSmall: _,
          editBox: f,
          mask: m,
          dimOthers: y,
          bright: v,
          spread: w,
          hideRotatePoints: x,
          hideResizeLines: b
        } = i
      if (((c.visible = !!m || 0), e.setDimOthers(y), e.setBright(!!y || v), w && jt.spread(t, w), this.view.worldOpacity)) {
        const { width: e, height: c } = t,
          m = h(_) ? _ : 10,
          y = f && !(_ && e < m && c < m)
        let v,
          w,
          E,
          T = {}
        for (let i = 0; i < 8; i++)
          Bt.toPoint(Bt.directionData[i], t, T),
            (w = a[i]),
            (v = l[i]),
            w.set(T),
            v.set(T),
            (w.visible = y && !(!p && !g)),
            (v.visible = y && g && p && !x),
            i % 2 &&
              ((E = d[(i - 1) / 2]),
              E.set(T),
              (E.visible = w.visible && !b),
              (w.visible = v.visible = y && !!u),
              ((i + 1) / 2) % 2
                ? ((E.width = e + E.height), _ && 2 * w.width > e && (w.visible = !1))
                : ((E.width = c + E.height), _ && 2 * w.width > c && (w.visible = !1)))
        ;(o.visible = y && g && !(!i.circle && !i.rotatePoint)),
          o.visible && this.layoutCircle(),
          n.path && (n.path = null),
          n.set(Object.assign(Object.assign({}, t), { visible: !s || f })),
          (r.visible = (y && r.children.length > 0) || 0),
          r.visible && this.layoutButtons()
      } else n.set(t)
    }
    layoutCircle() {
      const { circleDirection: t, circleMargin: e, buttonsMargin: i, buttonsDirection: s, middlePoint: n } = this.mergedConfig,
        o = Wg.indexOf(t || (this.buttons.children.length && 'bottom' === s ? 'top' : 'bottom'))
      this.setButtonPosition(this.circle, o, e || i, !!n)
    }
    layoutButtons() {
      const { buttons: t } = this,
        { buttonsDirection: e, buttonsFixed: i, buttonsMargin: s, middlePoint: n } = this.mergedConfig,
        { flippedX: o, flippedY: r } = this
      let a = Wg.indexOf(e)
      ;((a % 2 && o) || ((a + 1) % 2 && r)) && i && (a = (a + 2) % 4)
      const h = i ? Og.getRotateDirection(a, this.flippedOne ? this.rotation : -this.rotation, 4) : a
      this.setButtonPosition(t, h, s, !!n), i && (t.rotation = 90 * (h - a)), (t.scaleX = o ? -1 : 1), (t.scaleY = r ? -1 : 1)
    }
    setButtonPosition(t, e, i, s) {
      const n = this.resizePoints[2 * e + 1],
        o = e % 2,
        r = e && 3 !== e ? 1 : -1,
        a = (i + (e % 2 ? (s ? n.width : 0) + t.boxBounds.width : (s ? n.height : 0) + t.boxBounds.height) / 2) * r
      o ? ((t.x = n.x + a), (t.y = n.y)) : ((t.x = n.x), (t.y = n.y + a))
    }
    getPointStyle(t) {
      const { stroke: e, strokeWidth: i, pointFill: s, pointSize: n, pointRadius: o } = this.mergedConfig,
        r = {
          fill: s,
          stroke: e,
          strokeWidth: i,
          around: 'center',
          strokeAlign: 'center',
          opacity: 1,
          width: n,
          height: n,
          cornerRadius: o,
          offsetX: 0,
          offsetY: 0,
          editConfig: zg
        }
      return t ? Object.assign(r, t) : r
    }
    getPointsStyle() {
      const { point: t } = this.mergedConfig
      return c(t) ? t : [t]
    }
    getMiddlePointsStyle() {
      const { middlePoint: t } = this.mergedConfig
      return c(t) ? t : t ? [t] : this.getPointsStyle()
    }
    getResizeLinesStyle() {
      const { resizeLine: t } = this.mergedConfig
      return c(t) ? t : [t]
    }
    onDragStart(t) {
      this.dragging = !0
      const e = (this.dragPoint = t.current),
        { pointType: i } = e,
        { moveable: s, resizeable: n, rotateable: o, skewable: r } = this.mergeConfig
      'move' === i
        ? s && (this.moving = !0)
        : (i.includes('rotate') || this.isHoldRotateKey(t) || !n
            ? (o && (this.rotating = !0),
              'resize-rotate' === i
                ? n && (this.resizing = !0)
                : 'resize-line' === e.name && (r && (this.skewing = !0), (this.rotating = !1)))
            : 'resize' === i && n && (this.resizing = !0),
          'skew' === i && r && (this.skewing = !0)),
        this.onTransformStart(t)
    }
    onDrag(t) {
      const { transformTool: e, moving: i, resizing: s, rotating: n, skewing: o } = this
      if (i) e.onMove(t)
      else if (s || n || o) {
        const i = t.current
        i.pointType && (this.enterPoint = i), n && e.onRotate(t), s && e.onScale(t), o && e.onSkew(t)
      }
      Dg(this, t)
    }
    onDragEnd(t) {
      this.onTransformEnd(t), (this.dragPoint = null)
    }
    onTransformStart(t) {
      ;(this.moving || this.gesturing) && (this.editor.opacity = this.mergedConfig.hideOnMove ? 0 : 1),
        this.resizing && (Zr.resizingKeys = this.editor.leafList.keys)
      const { dragStartData: e, target: i } = this
      ;(e.x = t.x),
        (e.y = t.y),
        (e.totalOffset = { x: 0, y: 0 }),
        (e.point = { x: i.x, y: i.y }),
        (e.bounds = Object.assign({}, i.getLayoutBounds('box', 'local'))),
        (e.rotation = i.rotation)
    }
    onTransformEnd(e) {
      this.canDragLimitAnimate && (e instanceof t.DragEvent || e instanceof t.MoveEvent) && this.transformTool.onMove(e),
        this.resizing && (Zr.resizingKeys = null),
        (this.dragging = this.gesturing = this.moving = this.resizing = this.rotating = this.skewing = !1),
        (this.editor.opacity = 1),
        this.editor.update()
    }
    onMove(e) {
      if (this.canGesture && 'drag' !== e.moveType && (e.stop(), r(this.mergedConfig.moveable)))
        switch (((this.gesturing = this.moving = !0), e.type)) {
          case t.MoveEvent.START:
            this.onTransformStart(e)
            break
          case t.MoveEvent.END:
            this.onTransformEnd(e)
            break
          default:
            this.transformTool.onMove(e)
        }
    }
    onScale(e) {
      if (this.canGesture && (e.stop(), r(this.mergedConfig.resizeable)))
        switch (((this.gesturing = this.resizing = !0), e.type)) {
          case t.ZoomEvent.START:
            this.onTransformStart(e)
            break
          case t.ZoomEvent.END:
            this.onTransformEnd(e)
            break
          default:
            this.transformTool.onScale(e)
        }
    }
    onRotate(e) {
      if (this.canGesture && (e.stop(), r(this.mergedConfig.rotateable)))
        switch (((this.gesturing = this.rotating = !0), e.type)) {
          case t.ZoomEvent.START:
            this.onTransformStart(e)
            break
          case t.ZoomEvent.END:
            this.onTransformEnd(e)
            break
          default:
            this.transformTool.onRotate(e)
        }
    }
    isHoldRotateKey(t) {
      const { rotateKey: e } = this.mergedConfig
      return e ? t.isHoldKeys(e) : t.metaKey || t.ctrlKey
    }
    onKey(t) {
      Dg(this, t)
    }
    onArrow(t) {
      if (this.canUse && this.mergeConfig.keyEvent) {
        let e = 0,
          i = 0
        const s = t.shiftKey ? 10 : 1
        switch (t.code) {
          case 'ArrowDown':
            i = s
            break
          case 'ArrowUp':
            i = -s
            break
          case 'ArrowLeft':
            e = -s
            break
          case 'ArrowRight':
            e = s
        }
        ;(e || i) && this.transformTool.move(e, i)
      }
    }
    onDoubleTap(t) {
      const { openInner: e, preventEditInner: i } = this.mergeConfig
      'double' !== e || i || this.openInner(t)
    }
    onLongPress(t) {
      const { openInner: e, preventEditInner: i } = this.mergeConfig
      'long' === e && i && this.openInner(t)
    }
    openInner(e) {
      const { editor: i, target: s } = this
      if (this.single) {
        if (s.locked) return
        if (s.isBranch && !s.editInner) {
          if (s.textBox) {
            const { children: e } = s,
              n = e.find(e => e.editable && e instanceof t.Text) || e.find(e => e instanceof t.Text)
            if (n) return i.openInnerEditor(n)
          }
          i.openGroup(s), (i.target = i.selector.findDeepOne(e))
        } else i.openInnerEditor()
      }
    }
    listenPointEvents(e, i, s) {
      ;(e.direction = s),
        (e.pointType = i),
        this.__eventIds.push(
          e.on_([
            [t.DragEvent.START, this.onDragStart, this],
            [t.DragEvent.DRAG, this.onDrag, this],
            [t.DragEvent.END, this.onDragEnd, this],
            [
              t.PointerEvent.ENTER,
              t => {
                ;(this.enterPoint = e), Dg(this, t)
              }
            ],
            [
              t.PointerEvent.LEAVE,
              () => {
                this.enterPoint = null
              }
            ]
          ])
        )
    }
    __listenEvents() {
      const { rect: e, editor: i, __eventIds: s } = this
      s.push(
        e.on_([
          [t.PointerEvent.DOUBLE_TAP, this.onDoubleTap, this],
          [t.PointerEvent.LONG_PRESS, this.onLongPress, this]
        ])
      ),
        this.waitLeafer(() => {
          s.push(
            i.app.on_([
              [[t.KeyEvent.HOLD, t.KeyEvent.UP], this.onKey, this],
              [t.KeyEvent.DOWN, this.onArrow, this],
              [[t.MoveEvent.START, t.MoveEvent.BEFORE_MOVE, t.MoveEvent.END], this.onMove, this, !0],
              [[t.ZoomEvent.START, t.ZoomEvent.BEFORE_ZOOM, t.ZoomEvent.END], this.onScale, this, !0],
              [[t.RotateEvent.START, t.RotateEvent.BEFORE_ROTATE, t.RotateEvent.END], this.onRotate, this, !0]
            ])
          )
        })
    }
    __removeListenEvents() {
      this.off_(this.__eventIds)
    }
    destroy() {
      ;(this.editor = null), this.__removeListenEvents(), super.destroy()
    }
  }
  const Hg = { x: 0, y: 0, width: 1e5, height: 1e5 }
  class Ng extends t.UI {
    constructor(t) {
      super(), (this.editor = t), (this.hittable = !1), (this.visible = 0)
    }
    __updateWorldBounds() {
      Object.assign(this.__local, Hg), Object.assign(this.__world, Hg)
    }
    __draw(t, e) {
      const { editor: i } = this,
        { mask: s } = i.mergedConfig
      if (s && i.editing) {
        if (
          (t.fillWorld(t.bounds, !0 === s ? 'rgba(0,0,0,0.8)' : s), e.bounds && !e.bounds.hit(i.editBox.rect.__world, e.matrix))
        )
          return
        t.saveBlendMode('destination-out'),
          (e = Object.assign(Object.assign({}, e), { shape: !0 })),
          i.list.forEach(i => {
            i.__render(t, e)
            const { parent: s } = i
            s && s.textBox && s.__renderShape(t, e)
          }),
          t.restoreBlendMode()
      }
    }
    destroy() {
      ;(this.editor = null), super.destroy()
    }
  }
  const Yg =
      '\n<feOffset dy="1"/>\n<feGaussianBlur stdDeviation="1.5"/>\n<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"/>\n<feBlend mode="normal" in="SourceGraphic" result="shape"/>',
    Xg = {
      editSize: 'size',
      keyEvent: !0,
      stroke: '#836DFF',
      strokeWidth: 2,
      pointFill: '#FFFFFF',
      pointSize: 10,
      pointRadius: 16,
      rotateGap: 45,
      buttonsDirection: 'bottom',
      buttonsMargin: 12,
      hideOnSmall: !0,
      moveCursor: 'move',
      resizeCursor: {
        url: `\n<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">\n<g filter="url(#f)">\n<g transform="rotate({{rotation}},12,12)">\n<path d="M7.5 8.0H8.5V5.9L6.8 7.2L7.5 8.0ZM3 11.4L2.3 10.6L1.3 11.4L2.3 12.2L3 11.4ZM7.5 10.4H6.5V11.4H7.5V10.4ZM16.5 10.4V11.4H17.5V10.4H16.5ZM16.5 8.0L17.1 7.2L15.5 5.9V8.0H16.5ZM21 11.4L21.6 12.2L22.6 11.4L21.6 10.6L21 11.4ZM16.5 14.9H15.5V16.9L17.1 15.7L16.5 14.9ZM16.5 12.4H17.5V11.4H16.5V12.4ZM7.5 12.4V11.4H6.5V12.4H7.5ZM7.5 14.9L6.8 15.7L8.5 16.9V14.9H7.5ZM6.8 7.2L2.3 10.6L3.6 12.2L8.1 8.7L6.8 7.2ZM8.5 10.4V8.0H6.5V10.4H8.5ZM16.5 9.4H7.5V11.4H16.5V9.4ZM17.5 10.4V8.0H15.5V10.4H17.5ZM15.8 8.7L20.3 12.2L21.6 10.6L17.1 7.2L15.8 8.7ZM20.3 10.6L15.8 14.1L17.1 15.7L21.6 12.2L20.3 10.6ZM17.5 14.9V12.4H15.5V14.9H17.5ZM7.5 13.4H16.5V11.4H7.5V13.4ZM8.5 14.9V12.4H6.5V14.9H8.5ZM2.3 12.2L6.8 15.7L8.1 14.1L3.6 10.6L2.3 12.2Z" fill="white"/>\n<path fill-rule="evenodd" d="M3 11.4L7.5 8.0V10.4H16.5V8.0L21 11.4L16.5 14.9V12.4H7.5V14.9L3 11.4Z" fill="black"/>\n</g>\n</g>\n<defs>\n<filter id="f" x="-1.6" y="3.9" width="27.2" height="16.9" filterUnits="userSpaceOnUse">\n${Yg}\n</filter>\n</defs>\n</svg>\n`,
        x: 12,
        y: 12
      },
      rotateCursor: {
        url: `\n<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">\n<g filter="url(#f)">\n<g transform="rotate(135,12,12),rotate({{rotation}},12,12)">\n<path d="M20.4 8H21.4L20.8 7.1L17.3 2.6L17 2.1L16.6 2.6L13.1 7.1L12.5 8H13.5H15.4C14.9 11.8 11.8 14.9 8 15.4V13.5V12.5L7.1 13.1L2.6 16.6L2.1 17L2.6 17.3L7.1 20.8L8 21.4V20.4V18.4C13.5 17.9 17.9 13.5 18.4 8H20.4Z" stroke="white"/>\n<path fill-rule="evenodd" d="M17 3L20.4 7.5H17.9C17.7 13.1 13.1 17.7 7.5 17.9V20.4L3 17L7.5 13.5V15.9C12.0 15.7 15.7 12.0 15.9 7.5H13.5L17 3Z" fill="black"/>\n</g>\n</g>\n<defs>\n<filter id="f" x="-1.6" y="-0.6" width="27.1" height="27.1" filterUnits="userSpaceOnUse">\n${Yg}\n</filter>\n</defs>\n</svg>\n`,
        x: 12,
        y: 12
      },
      skewCursor: {
        url: `\n<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">\n<g filter="url(#f)">\n<g transform="rotate(90,12,12),rotate({{rotation}},12,12)">\n<path d="M21 10.4L21 11.4L23.8 11.4L21.6 9.6L21 10.4ZM17 10.4V11.4L17 11.4L17 10.4ZM15.5 6L16.1 5.2L14.5 3.9V6H15.5ZM15.5 8.4V9.4H16.5V8.4H15.5ZM6 8.4V7.4H5V8.4H6ZM6 10.4H5V11.4H6V10.4ZM7 14.4V13.4L7 13.4L7 14.4ZM3 14.4L3 13.4L0.1 13.4L2.3 15.2L3 14.4ZM8.5 18.9L7.8 19.7L9.5 21.0V18.9H8.5ZM8.5 16.4V15.4H7.5V16.4H8.5ZM19 16.4V17.4H20V16.4H19ZM19 14.4H20V13.4H19V14.4ZM21 9.4L17 9.4L17 11.4L21 11.4L21 9.4ZM14.8 6.7L20.3 11.2L21.6 9.6L16.1 5.2L14.8 6.7ZM16.5 8.4V6H14.5V8.4H16.5ZM6 9.4H15.5V7.4H6V9.4ZM7 10.4V8.4H5V10.4H7ZM15.5 9.4H6V11.4H15.5V9.4ZM17 9.4H15.5V11.4H17V9.4ZM7 15.4H8.5V13.4H7V15.4ZM3 15.4L7 15.4L7 13.4L3 13.4L3 15.4ZM9.1 18.1L3.6 13.6L2.3 15.2L7.8 19.7L9.1 18.1ZM7.5 16.4V18.9H9.5V16.4H7.5ZM19 15.4H8.5V17.4H19V15.4ZM18 14.4V16.4H20V14.4H18ZM8.5 15.4H19V13.4H8.5V15.4Z" fill="white"/>\n<path fill-rule="evenodd" d="M17 10.4L21 10.4L15.5 6V8.4H6V10.4H15.5H17ZM8.5 14.4H7L3 14.4L8.5 18.9V16.4H19V14.4H8.5Z" fill="black"/>\n</g>\n</g>\n<defs>\n<filter x="-2.8" y="1.9" width="29.6" height="23.1" filterUnits="userSpaceOnUse" >\n${Yg}\n</filter>\n</defs>\n</svg>\n`,
        x: 12,
        y: 12
      },
      selector: !0,
      editBox: !0,
      hover: !0,
      select: 'press',
      openInner: 'double',
      multipleSelect: !0,
      boxSelect: !0,
      moveable: !0,
      resizeable: !0,
      flipable: !0,
      rotateable: !0,
      skewable: !0
    },
    Vg = new $t()
  function Gg(t) {
    const { simulateTarget: e, list: i } = t,
      { zoomLayer: s } = i[0].leafer
    e.safeChange(() => {
      Vg.setListWithFn(i, t => t.getBounds('box', 'page')),
        0 === Vg.width && (Vg.width = 0.1),
        0 === Vg.height && (Vg.height = 0.1),
        e.reset(Vg.get())
    }),
      s.add(e)
  }
  const jg = (t, e) => t.parent.children.indexOf(t) - e.parent.children.indexOf(e),
    Kg = (t, e) => e.parent.children.indexOf(e) - t.parent.children.indexOf(t),
    qg = {
      group(e, i, s) {
        e.sort(Kg)
        const { app: n, parent: o } = e[0]
        let r
        ;(r = s && s.add ? s : new t.Group(s)), o.addAt(r, o.children.indexOf(e[0])), e.sort(jg)
        const a = new wt(i.worldTransform)
        return (
          a.divideParent(o.scrollWorldTransform),
          r.setTransform(a),
          (r.editable = !0),
          (r.hitChildren = !1),
          n.lockLayout(),
          e.forEach(t => t.dropTo(r)),
          n.unlockLayout(),
          r
        )
      },
      ungroup(t) {
        const { app: e } = t[0],
          i = []
        return (
          e.lockLayout(),
          t.forEach(t => {
            if (t.isBranch) {
              const { parent: e, children: s } = t
              for (; s.length; ) i.push(s[0]), s[0].dropTo(e, e.children.indexOf(t))
              t.isBranchLeaf ? i.push(t) : t.remove()
            } else i.push(t)
          }),
          e.unlockLayout(),
          i
        )
      },
      toTop(t) {
        t.sort(jg),
          t.forEach(t => {
            t.parent && t.parent.add(t)
          })
      },
      toBottom(t) {
        t.sort(Kg),
          t.forEach(t => {
            t.parent && t.parent.addAt(t, 0)
          })
      }
    },
    Zg = ie.get('EditToolCreator')
  function $g() {
    return t => {
      Qg.register(t)
    }
  }
  const Jg = $g,
    Qg = {
      list: {},
      register(t) {
        const { tag: e } = t.prototype
        t_[e] && Zg.repeat(e), (t_[e] = t)
      },
      get: (t, e) => new t_[t](e)
    },
    { list: t_ } = Qg
  class e_ extends og {
    constructor(t, e) {
      super(t, e)
    }
  }
  ;(e_.BEFORE_OPEN = 'innerEditor.before_open'),
    (e_.OPEN = 'innerEditor.open'),
    (e_.BEFORE_CLOSE = 'innerEditor.before_close'),
    (e_.CLOSE = 'innerEditor.close')
  class i_ extends og {
    constructor(t, e) {
      super(t, e)
    }
  }
  ;(i_.BEFORE_GROUP = 'editor.before_group'),
    (i_.GROUP = 'editor.group'),
    (i_.BEFORE_UNGROUP = 'editor.before_ungroup'),
    (i_.UNGROUP = 'editor.ungroup'),
    (i_.BEFORE_OPEN = 'editor.before_open_group'),
    (i_.OPEN = 'editor.open_group'),
    (i_.BEFORE_CLOSE = 'editor.before_close_group'),
    (i_.CLOSE = 'editor.close_group')
  const { updateMatrix: s_ } = lr,
    n_ = { x: 1, y: 1, scaleX: 1, scaleY: 1, rotation: 1, skewX: 1, skewY: 1 },
    o_ = 'top-left'
  class r_ extends t.Rect {
    get __tag() {
      return 'SimulateElement'
    }
    constructor(t) {
      super(),
        (this.checkChange = !0),
        (this.canChange = !0),
        (this.visible = this.hittable = !1),
        this.on(Hr.CHANGE, e => {
          if (this.checkChange && n_[e.attrName]) {
            const { attrName: i, newValue: s, oldValue: n } = e,
              o = 's' === i[0] ? (s || 1) / (n || 1) : (s || 0) - (n || 0)
            this.canChange = !1
            const r = this.__
            ;(r[i] = n), s_(this.parent), s_(this)
            const a = new wt(this.__world)
            switch (
              ((r[i] = s), this.__layout.rotationChange(), s_(this), (this.changedTransform = new wt(this.__world).divide(a)), i)
            ) {
              case 'x':
                t.move(o, 0)
                break
              case 'y':
                t.move(0, o)
                break
              case 'rotation':
                t.rotateOf(o_, o)
                break
              case 'scaleX':
                t.scaleOf(o_, o, 1)
                break
              case 'scaleY':
                t.scaleOf(o_, 1, o)
                break
              case 'skewX':
                t.skewOf(o_, o, 0)
                break
              case 'skewY':
                t.skewOf(o_, 0, o)
            }
            this.canChange = !0
          }
        })
    }
    safeChange(t) {
      this.canChange && ((this.checkChange = !1), t(), (this.checkChange = !0))
    }
  }
  class a_ extends og {
    constructor(t, e) {
      super(t, e)
    }
  }
  ;(a_.BEFORE_MOVE = 'editor.before_move'), (a_.MOVE = 'editor.move')
  class h_ extends og {
    constructor(t, e) {
      super(t, e)
    }
  }
  ;(h_.BEFORE_SCALE = 'editor.before_scale'), (h_.SCALE = 'editor.scale')
  class l_ extends og {
    constructor(t, e) {
      super(t, e)
    }
  }
  ;(l_.BEFORE_ROTATE = 'editor.before_rotate'), (l_.ROTATE = 'editor.rotate')
  class d_ extends og {
    constructor(t, e) {
      super(t, e)
    }
  }
  ;(d_.BEFORE_SKEW = 'editor.before_skew'), (d_.SKEW = 'editor.skew')
  class c_ {
    onMove(e) {
      const { target: i, mergeConfig: s, dragStartData: n } = this.editBox
      let o,
        { dragLimitAnimate: a } = s
      const l = e.type === t.MoveEvent.END || e.type === t.DragEvent.END,
        d = r(i.draggable),
        c = !a || l || d,
        u = { x: e.totalX, y: e.totalY }
      e instanceof t.MoveEvent && ut.move(u, i.getWorldPointByLocal(n.totalOffset, null, !0)),
        e.shiftKey && (Math.abs(u.x) > Math.abs(u.y) ? (u.y = 0) : (u.x = 0)),
        (o = t.DragEvent.getValidMove(i, n.point, u, c)),
        (o.x || o.y) && (a && !d && l ? lr.animateMove(this, o, h(a) ? a : 0.3) : this.move(o))
    }
    onScale(e) {
      const { target: i, mergeConfig: s, single: n, dragStartData: o } = this.editBox
      let r,
        { around: a, lockRatio: h, flipable: l, editSize: d } = s
      e instanceof t.ZoomEvent ? (a || (a = i.getBoxPoint(e)), (r = e.totalScale)) : (r = e.getInnerTotal(i))
      const { direction: c } = e.current
      ;(e.shiftKey || i.lockRatio) && (h = !0)
      const u = Og.getScaleData(i, o.bounds, c, r, h, Og.getAround(a, e.altKey), l, !n || 'scale' === d),
        p = i.x,
        g = i.y
      e instanceof t.DragEvent && this.editTool && this.editTool.onScaleWithDrag
        ? ((u.drag = e), this.scaleWithDrag(u))
        : this.scaleOf(u.origin, u.scaleX, u.scaleY),
        ut.move(o.totalOffset, i.x - p, i.y - g)
    }
    onRotate(e) {
      const { target: i, mergeConfig: s, dragStartData: n } = this.editBox,
        { around: o, rotateAround: r, rotateGap: a, diagonalRotateKey: h } = s,
        { direction: l } = e.current
      let d, c
      if (e instanceof t.RotateEvent) (c = e.rotation), (d = r ? Bt.getPoint(r, i.boxBounds) : i.getBoxPoint(e))
      else {
        const t = h ? e.isHoldKeys(h) : e.shiftKey,
          s = Og.getRotateData(i, l, e, n, t ? null : r || i.around || i.origin || o || 'center')
        ;(c = n.rotation + s.rotation - i.rotation), (d = s.origin)
      }
      if (((c = z.float(z.getGapRotation(c, a, i.rotation), 2)), !c)) return
      const u = i.x,
        p = i.y
      this.rotateOf(d, c), ut.move(n.totalOffset, i.x - u, i.y - p)
    }
    onSkew(t) {
      const { target: e, mergeConfig: i } = this.editBox,
        { around: s } = i,
        {
          origin: n,
          skewX: o,
          skewY: r
        } = Og.getSkewData(e.boxBounds, t.current.direction, t.getInnerMove(e), Og.getAround(s, t.altKey))
      ;(o || r) && this.skewOf(n, o, r)
    }
    move(t, e = 0) {
      if (!this.checkTransform('moveable')) return
      u(t) && ((e = t.y), (t = t.x))
      const { target: i, mergeConfig: s, single: n, editor: o } = this.editBox,
        { beforeMove: r } = s
      if (r) {
        const s = r({ target: i, x: t, y: e })
        if (u(s)) (t = s.x), (e = s.y)
        else if (!1 === s) return
      }
      const a = i.getWorldPointByLocal({ x: t, y: e }, null, !0)
      n || i.safeChange(() => i.move(t, e))
      const h = { target: i, editor: o, moveX: a.x, moveY: a.y }
      this.emitEvent(new a_(a_.BEFORE_MOVE, h))
      const l = new a_(a_.MOVE, h)
      this.doMove(l), this.emitEvent(l)
    }
    scaleWithDrag(t) {
      if (!this.checkTransform('resizeable')) return
      const { target: e, mergeConfig: i, editor: s } = this.editBox,
        { beforeScale: n } = i
      if (n) {
        const { origin: i, scaleX: s, scaleY: o, drag: r } = t
        if (!1 === n({ target: e, drag: r, origin: i, scaleX: s, scaleY: o })) return
      }
      ;(t = Object.assign(Object.assign({}, t), { target: e, editor: s, worldOrigin: e.getWorldPoint(t.origin) })),
        this.emitEvent(new h_(h_.BEFORE_SCALE, t))
      const o = new h_(h_.SCALE, t)
      this.editTool.onScaleWithDrag(o), this.emitEvent(o)
    }
    scaleOf(t, e, i = e, s) {
      if (!this.checkTransform('resizeable')) return
      const { target: n, mergeConfig: o, single: r, editor: a } = this.editBox,
        { beforeScale: h } = o
      if (h) {
        const s = h({ target: n, origin: t, scaleX: e, scaleY: i })
        if (u(s)) (e = s.scaleX), (i = s.scaleY)
        else if (!1 === s) return
      }
      const l = this.getWorldOrigin(t),
        d = !r && this.getChangedTransform(() => n.safeChange(() => n.scaleOf(t, e, i))),
        c = { target: n, editor: a, worldOrigin: l, scaleX: e, scaleY: i, transform: d }
      this.emitEvent(new h_(h_.BEFORE_SCALE, c))
      const p = new h_(h_.SCALE, c)
      this.doScale(p), this.emitEvent(p)
    }
    flip(t) {
      if (!this.checkTransform('resizeable')) return
      const { target: e, single: i, editor: s } = this.editBox,
        n = this.getWorldOrigin('center'),
        o = i ? new wt(lr.getFlipTransform(e, t)) : this.getChangedTransform(() => e.safeChange(() => e.flip(t))),
        r = { target: e, editor: s, worldOrigin: n, scaleX: 'x' === t ? -1 : 1, scaleY: 'y' === t ? -1 : 1, transform: o }
      this.emitEvent(new h_(h_.BEFORE_SCALE, r))
      const a = new h_(h_.SCALE, r)
      this.doScale(a), this.emitEvent(a)
    }
    rotateOf(t, e) {
      if (!this.checkTransform('rotateable')) return
      const { target: i, mergeConfig: s, single: n, editor: o } = this.editBox,
        { beforeRotate: r } = s
      if (r) {
        const s = r({ target: i, origin: t, rotation: e })
        if (h(s)) e = s
        else if (!1 === s) return
      }
      const a = this.getWorldOrigin(t),
        l = !n && this.getChangedTransform(() => i.safeChange(() => i.rotateOf(t, e))),
        d = { target: i, editor: o, worldOrigin: a, rotation: e, transform: l }
      this.emitEvent(new l_(l_.BEFORE_ROTATE, d))
      const c = new l_(l_.ROTATE, d)
      this.doRotate(c), this.emitEvent(c)
    }
    skewOf(t, e, i = 0, s) {
      if (!this.checkTransform('skewable')) return
      const { target: n, mergeConfig: o, single: r, editor: a } = this.editBox,
        { beforeSkew: h } = o
      if (h) {
        const s = h({ target: n, origin: t, skewX: e, skewY: i })
        if (u(s)) (e = s.skewX), (i = s.skewY)
        else if (!1 === s) return
      }
      const l = this.getWorldOrigin(t),
        d = !r && this.getChangedTransform(() => n.safeChange(() => n.skewOf(t, e, i))),
        c = { target: n, editor: a, worldOrigin: l, skewX: e, skewY: i, transform: d }
      this.emitEvent(new d_(d_.BEFORE_SKEW, c))
      const p = new d_(d_.SKEW, c)
      this.doSkew(p), this.emitEvent(p)
    }
    doMove(t) {
      this.editTool.onMove(t)
    }
    doScale(t) {
      this.editTool.onScale(t)
    }
    doRotate(t) {
      this.editTool.onRotate(t)
    }
    doSkew(t) {
      this.editTool.onSkew(t)
    }
    checkTransform(t) {
      const { target: e, mergeConfig: i } = this.editBox
      return e && !e.locked && i[t]
    }
    getWorldOrigin(t) {
      const { target: e } = this.editBox
      return e.getWorldPoint(lr.getInnerOrigin(e, t))
    }
    getChangedTransform(t) {
      const { target: e, single: i } = this.editBox
      if (!i && !e.canChange) return e.changedTransform
      const s = new wt(e.worldTransform)
      return t(), new wt(e.worldTransform).divide(s)
    }
    emitEvent(t, e) {
      this.editBox.editor.emitEvent(t, e)
    }
  }
  ;(t.Editor = class extends t.Group {
    get list() {
      return this.leafList.list
    }
    get dragHoverExclude() {
      return [this.editBox.rect]
    }
    get editing() {
      return !!this.list.length
    }
    get groupOpening() {
      return !!this.openedGroupList.length
    }
    get multiple() {
      return this.list.length > 1
    }
    get single() {
      return 1 === this.list.length
    }
    get dragPoint() {
      return this.editBox.dragPoint
    }
    get dragging() {
      return this.editBox.dragging
    }
    get gesturing() {
      return this.editBox.gesturing
    }
    get moving() {
      return this.editBox.moving
    }
    get resizing() {
      return this.editBox.resizing
    }
    get rotating() {
      return this.editBox.rotating
    }
    get skewing() {
      return this.editBox.skewing
    }
    get element() {
      return this.multiple ? this.simulateTarget : this.list[0]
    }
    get buttons() {
      return this.editBox.buttons
    }
    get targetLeafer() {
      const t = this.list[0]
      return t && t.leafer
    }
    constructor(t, e) {
      super(e),
        (this.leafList = new vh()),
        (this.openedGroupList = new vh()),
        (this.simulateTarget = new r_(this)),
        (this.editBox = new Ug(this)),
        (this.editToolList = {}),
        (this.selector = new vg(this)),
        (this.editMask = new Ng(this)),
        (this.targetEventIds = [])
      let i = _.clone(Xg)
      t && (i = _.default(t, i)),
        (this.mergedConfig = this.config = i),
        this.addMany(this.editMask, this.selector, this.editBox),
        le.has('resize') || (this.config.editSize = 'scale')
    }
    select(t) {
      this.target = t
    }
    cancel() {
      this.target = null
    }
    hasItem(t) {
      return this.leafList.has(t)
    }
    getItem(t) {
      return this.list[t || 0]
    }
    addItem(t) {
      this.hasItem(t) || t.locked || (this.leafList.add(t), (this.target = this.leafList.list))
    }
    removeItem(t) {
      this.hasItem(t) && (this.leafList.remove(t), (this.target = this.leafList.list))
    }
    shiftItem(t) {
      this.hasItem(t) ? this.removeItem(t) : this.addItem(t)
    }
    setDimOthers(t, e = 'dim', i) {
      if (!i) {
        const { dimTarget: t, targetLeafer: e } = this
        i = t ? (c(t) ? t : [t]) : [e]
      }
      i[0] && i[0][e] !== (t || !1) && i.forEach(i => _.stintSet(i, e, t))
    }
    setBright(t) {
      this.setDimOthers(t, 'bright', this.list)
    }
    update() {
      if (this.editing) {
        if (!this.element.parent) return this.cancel()
        this.innerEditing && this.innerEditor.update(), this.editTool.update(), this.selector.update()
      }
    }
    updateEditBox() {
      this.multiple && Gg(this), this.update()
    }
    getEditTool(t) {
      return (this.editToolList[t] = this.editToolList[t] || Qg.get(t, this))
    }
    updateEditTool() {
      if ((this.unloadEditTool(), this.editing)) {
        const t = this.element
        let e = t.editOuter || 'EditTool'
        const { beforeEditOuter: i } = this.mergeConfig
        if (i) {
          const s = i({ target: t, name: e })
          if (r(s)) e = s
          else if (!1 === s) return
        }
        if (Qg.list[e]) {
          const t = (this.editTool = this.getEditTool(e))
          this.editBox.load(), t.load(), this.update()
        }
      }
    }
    unloadEditTool() {
      let t = this.editTool
      t && (this.editBox.unload(), t.unload(), (this.editTool = null))
    }
    getEditSize(t) {
      return this.mergeConfig.editSize
    }
    onMove(t) {}
    onScale(t) {}
    onRotate(t) {}
    onSkew(t) {}
    move(t, e = 0) {}
    scaleWithDrag(t) {}
    scaleOf(t, e, i = e, s) {}
    flip(t) {}
    rotateOf(t, e) {}
    skewOf(t, e, i = 0, s) {}
    checkTransform(t) {}
    getWorldOrigin(t) {}
    getChangedTransform(t) {}
    group(t) {
      return (
        this.multiple &&
          (this.emitGroupEvent(i_.BEFORE_GROUP),
          (this.target = qg.group(this.list, this.element, t)),
          this.emitGroupEvent(i_.GROUP, this.target)),
        this.target
      )
    }
    ungroup() {
      const { list: t } = this
      return (
        t.length &&
          (t.forEach(t => t.isBranch && this.emitGroupEvent(i_.BEFORE_UNGROUP, t)),
          (this.target = qg.ungroup(t)),
          t.forEach(t => t.isBranch && this.emitGroupEvent(i_.UNGROUP, t))),
        this.list
      )
    }
    openGroup(t) {
      this.emitGroupEvent(i_.BEFORE_OPEN, t), this.openedGroupList.add(t), (t.hitChildren = !0), this.emitGroupEvent(i_.OPEN, t)
    }
    closeGroup(t) {
      this.emitGroupEvent(i_.BEFORE_CLOSE, t),
        this.openedGroupList.remove(t),
        (t.hitChildren = !1),
        this.emitGroupEvent(i_.CLOSE, t)
    }
    checkOpenedGroups() {
      const t = this.openedGroupList
      if (t.length) {
        let { list: e } = t
        this.editing && ((e = []), t.forEach(t => this.list.every(e => !lr.hasParent(e, t)) && e.push(t))),
          e.forEach(t => this.closeGroup(t))
      }
      this.editing && !this.selector.dragging && this.checkDeepSelect()
    }
    checkDeepSelect() {
      let t,
        { list: e } = this
      for (let i = 0; i < e.length; i++) for (t = e[i].parent; t && !t.hitChildren; ) this.openGroup(t), (t = t.parent)
    }
    emitGroupEvent(t, e) {
      const i = new i_(t, { editTarget: e })
      this.emitEvent(i), e && e.emitEvent(i)
    }
    getInnerEditor(t) {
      return (this.editToolList[t] = this.editToolList[t] || Qg.get(t, this))
    }
    openInnerEditor(t, e, i) {
      let s
      if ((r(e) ? (s = e) : i || (i = e), t && i && (this.target = t), this.single)) {
        t || (t = this.element), s || (s = t.editInner)
        const { beforeEditInner: e } = this.mergeConfig
        if (e) {
          const i = e({ target: t, name: s })
          if (r(i)) s = i
          else if (!1 === i) return
        }
        Qg.list[s] &&
          (this.editTool.unload(),
          (this.innerEditing = !0),
          (this.innerEditor = this.getInnerEditor(s)),
          (this.innerEditor.editTarget = t),
          this.emitInnerEvent(e_.BEFORE_OPEN),
          this.innerEditor.load(),
          this.emitInnerEvent(e_.OPEN))
      }
    }
    closeInnerEditor(t) {
      this.innerEditing &&
        ((this.innerEditing = !1),
        this.emitInnerEvent(e_.BEFORE_CLOSE),
        this.innerEditor.unload(),
        this.emitInnerEvent(e_.CLOSE),
        t || this.updateEditTool(),
        (this.innerEditor = null))
    }
    emitInnerEvent(t) {
      const { innerEditor: e } = this,
        { editTarget: i } = e,
        s = new e_(t, { editTarget: i, innerEditor: e })
      this.emitEvent(s), i.emitEvent(s)
    }
    lock() {
      this.list.forEach(t => (t.locked = !0)), this.update()
    }
    unlock() {
      this.list.forEach(t => (t.locked = !1)), this.update()
    }
    toTop() {
      this.list.length && (qg.toTop(this.list), this.leafList.update())
    }
    toBottom() {
      this.list.length && (qg.toBottom(this.list), this.leafList.update())
    }
    onAppRenderStart(t) {
      ;(this.targetChanged = t.children.some(t => t !== this.leafer && t.renderer.changed)) && this.editBox.forceRender()
    }
    onRenderStart() {
      this.targetChanged && this.update()
    }
    onChildScroll() {
      this.multiple && this.updateEditBox()
    }
    listenTargetEvents() {
      if (!this.targetEventIds.length) {
        const { app: t, leafer: e, targetLeafer: i, editMask: s } = this
        ;(this.targetEventIds = [
          e.on_(Qr.START, this.onRenderStart, this),
          i && i.on_(Hr.SCROLL, this.onChildScroll, this),
          t.on_(Qr.CHILD_START, this.onAppRenderStart, this),
          t.on_(ta.UPDATE_MODE, t => {
            t.mode && 'normal' !== t.mode && this.cancel()
          })
        ]),
          s.visible && s.forceRender()
      }
    }
    removeTargetEvents() {
      const { targetEventIds: t, editMask: e } = this
      t.length && (this.off_(t), e.visible && e.forceRender())
    }
    destroy() {
      this.destroyed ||
        ((this.target = this.hoverTarget = null),
        Object.values(this.editToolList).forEach(t => t.destroy()),
        this.simulateTarget.destroy(),
        (this.editToolList = {}),
        (this.simulateTarget = this.editTool = this.innerEditor = null),
        super.destroy())
    }
  }),
    ye(
      [
        (t, e) => {
          ho(t, e, {
            get() {
              const { config: t, element: e, dragPoint: i, editBox: s, app: r } = this,
                a = Object.assign({}, t)
              if (e && e.editConfig) {
                let { editConfig: t } = e
                ;(t.hover || t.hoverStyle) && ((t = Object.assign({}, t)), delete t.hover, delete t.hoverStyle),
                  Object.assign(a, t)
              }
              return (
                s.config && Object.assign(a, s.config),
                i &&
                  (i.editConfig && Object.assign(a, i.editConfig),
                  'font-size' === a.editSize && (a.lockRatio = !0),
                  'resize-rotate' === i.pointType && (a.around || (a.around = 'center'), o(a.lockRatio) && (a.lockRatio = !0))),
                n(a.dragLimitAnimate) && (a.dragLimitAnimate = r && r.config.pointer.dragLimitAnimate),
                (this.mergedConfig = a)
              )
            }
          })
        }
      ],
      t.Editor.prototype,
      'mergeConfig',
      void 0
    ),
    ye(
      [
        rg(function (t, e) {
          const { target: i } = t
          i
            ? ((t.leafList = i instanceof vh ? i : new vh(i)), t.multiple && Gg(t))
            : (t.simulateTarget.remove(), t.leafList.reset()),
            t.closeInnerEditor(!0),
            t.unloadEditTool()
          const s = { editor: t, value: i, oldValue: e }
          t.emitEvent(new og(og.SELECT, s)),
            t.checkOpenedGroups(),
            t.editing
              ? t.waitLeafer(() => {
                  t.updateEditTool(), t.listenTargetEvents()
                })
              : (t.updateEditTool(), t.removeTargetEvents()),
            t.emitEvent(new og(og.AFTER_SELECT, s))
        })
      ],
      t.Editor.prototype,
      'target',
      void 0
    ),
    ye(
      [
        rg(function (t, e) {
          t.emitEvent(new og(og.HOVER, { editor: t, value: t.hoverTarget, oldValue: e }))
        })
      ],
      t.Editor.prototype,
      'hoverTarget',
      void 0
    ),
    (t.Editor = ye([qo(c_, ['editBox', 'editTool', 'emitEvent'])], t.Editor))
  class u_ {
    static registerInnerEditor() {
      Qg.register(this)
    }
    get tag() {
      return 'InnerEditor'
    }
    get mode() {
      return 'focus'
    }
    get editBox() {
      return this.editor.editBox
    }
    constructor(t) {
      ;(this.eventIds = []), (this.editor = t), this.create()
    }
    onCreate() {}
    create() {
      ;(this.view = new t.Group()), this.onCreate()
    }
    onLoad() {}
    load() {
      const { editor: t } = this
      t && (t.app && 'focus' === this.mode && (t.selector.hittable = t.app.tree.hitChildren = !1), this.onLoad())
    }
    onUpdate() {}
    update() {
      this.onUpdate()
    }
    onUnload() {}
    unload() {
      const { editor: t } = this
      t && (t.app && 'focus' === this.mode && (t.selector.hittable = t.app.tree.hitChildren = !0), this.onUnload())
    }
    onDestroy() {}
    destroy() {
      this.onDestroy(),
        this.editor &&
          (this.view && this.view.destroy(),
          this.eventIds && this.editor.off_(this.eventIds),
          (this.editor = this.view = this.eventIds = null))
    }
  }
  ;(t.EditTool = class extends u_ {
    static registerEditTool() {
      Qg.register(this)
    }
    get tag() {
      return 'EditTool'
    }
    onMove(t) {
      const { moveX: e, moveY: i, editor: s } = t,
        { app: n, list: o } = s
      n.lockLayout(),
        o.forEach(t => {
          t.moveWorld(e, i)
        }),
        n.unlockLayout()
    }
    onScale(t) {
      const { scaleX: e, scaleY: i, transform: s, worldOrigin: n, editor: o } = t,
        { app: r, list: a } = o
      r.lockLayout(),
        a.forEach(t => {
          const r = 'scale' !== o.getEditSize(t)
          s ? t.transformWorld(s, r) : t.scaleOfWorld(n, e, i, r)
        }),
        r.unlockLayout()
    }
    onRotate(t) {
      const { rotation: e, transform: i, worldOrigin: s, editor: n } = t,
        { app: o, list: r } = n
      o.lockLayout(),
        r.forEach(t => {
          const o = 'scale' !== n.getEditSize(t)
          i ? t.transformWorld(i, o) : t.rotateOfWorld(s, e)
        }),
        o.unlockLayout()
    }
    onSkew(t) {
      const { skewX: e, skewY: i, transform: s, worldOrigin: n, editor: o } = t,
        { app: r, list: a } = o
      r.lockLayout(),
        a.forEach(t => {
          const r = 'scale' !== o.getEditSize(t)
          s ? t.transformWorld(s, r) : t.skewOfWorld(n, e, i, r)
        }),
        r.unlockLayout()
    }
    load() {
      ;(this.editBox.view.visible = !0), this.onLoad()
    }
    update() {
      this.editBox.update(), this.onUpdate()
    }
    unload() {
      ;(this.editBox.view.visible = !1), this.onUnload()
    }
  }),
    (t.EditTool = ye([$g()], t.EditTool))
  const { left: p_, right: g_ } = t.Direction9,
    { move: __, copy: f_, toNumberPoints: m_ } = ut
  ;(t.LineEditTool = class extends t.EditTool {
    constructor() {
      super(...arguments), (this.scaleOfEvent = !0)
    }
    get tag() {
      return 'LineEditTool'
    }
    onScaleWithDrag(t) {
      const { drag: e, direction: i, lockRatio: s, around: n } = t,
        o = t.target,
        r = i === p_
      if (o.pathInputed) {
        const { path: t } = o.__,
          { from: i, to: a } = this.getFromToByPath(t)
        this.dragPoint(i, a, r, n, this.getInnerMove(o, e, s)),
          (t[1] = i.x),
          (t[2] = i.y),
          (t[4] = a.x),
          (t[5] = a.y),
          (o.path = t)
      } else if (o.points) {
        const { points: t } = o,
          { from: i, to: a } = this.getFromToByPoints(t)
        this.dragPoint(i, a, r, n, this.getInnerMove(o, e, s)),
          (t[0] = i.x),
          (t[1] = i.y),
          (t[2] = a.x),
          (t[3] = a.y),
          (o.points = t)
      } else {
        const t = { x: 0, y: 0 },
          { toPoint: i } = o
        ;(o.rotation = 0),
          this.dragPoint(t, i, r, n, this.getInnerMove(o, e, s)),
          o.getLocalPointByInner(t, null, null, !0),
          o.getLocalPointByInner(i, null, null, !0),
          (o.x = t.x),
          (o.y = t.y),
          o.getInnerPointByLocal(i, null, null, !0),
          (o.toPoint = i)
      }
    }
    getInnerMove(t, e, i) {
      const s = e.getInnerMove(t)
      return i && (Math.abs(s.x) > Math.abs(s.y) ? (s.y = 0) : (s.x = 0)), s
    }
    getFromToByPath(t) {
      return { from: { x: t[1], y: t[2] }, to: { x: t[4], y: t[5] } }
    }
    getFromToByPoints(t) {
      const e = m_(t)
      return { from: { x: e[0], y: e[1] }, to: { x: e[2], y: e[3] } }
    }
    dragPoint(t, e, i, s, n) {
      const { x: o, y: r } = n
      i ? (__(t, o, r), s && __(e, -o, -r)) : (s && __(t, -o, -r), __(e, o, r))
    }
    onSkew(t) {}
    onUpdate() {
      const { editBox: t } = this,
        { rotatePoints: e, resizeLines: i, resizePoints: s, rect: n } = t,
        o = this.editor.element
      let r, a
      if ((o.pathInputed ? (r = this.getFromToByPath(o.__.path)) : o.points && (r = this.getFromToByPoints(o.__.points)), r)) {
        const { from: i, to: a } = r
        o.innerToWorld(i, i, !1, t),
          o.innerToWorld(a, a, !1, t),
          n.pen.clearPath().moveTo(i.x, i.y).lineTo(a.x, a.y),
          f_(s[7], i),
          f_(e[7], i),
          f_(s[3], a),
          f_(e[3], a)
      }
      for (let t = 0; t < 8; t++)
        t < 4 && (i[t].visible = !1), (a = t === p_ || t === g_), (s[t].visible = a), (e[t].visible = !r && a)
    }
  }),
    (t.LineEditTool = ye([$g()], t.LineEditTool))
  const { M: y_, L: v_, C: w_, Q: x_, Z: b_, N: E_, D: T_, X: S_, G: k_, F: B_, O: P_, P: L_, U: R_ } = Ie,
    C_ = {
      scale(t, e, i) {
        if (!t) return
        let s,
          n = 0,
          o = t.length
        for (; n < o; )
          switch (((s = t[n]), s)) {
            case y_:
            case v_:
              O_(t, e, i, n, 1), (n += 3)
              break
            case w_:
              O_(t, e, i, n, 3), (n += 7)
              break
            case x_:
              O_(t, e, i, n, 2), (n += 5)
              break
            case b_:
              n += 1
              break
            case E_:
              O_(t, e, i, n, 2), (n += 5)
              break
            case T_:
              O_(t, e, i, n, 2), (n += 9)
              break
            case S_:
              O_(t, e, i, n, 2), (n += 6)
              break
            case k_:
              O_(t, e, i, n, 2), (n += 9)
              break
            case B_:
              O_(t, e, i, n, 2), (n += 5)
              break
            case P_:
              ;(t[n] = k_), t.splice(n + 4, 0, t[n + 3], 0), O_(t, e, i, n, 2), (n += 9), (o += 2)
              break
            case L_:
              ;(t[n] = B_), t.splice(n + 4, 0, t[n + 3]), O_(t, e, i, n, 2), (n += 5), (o += 1)
              break
            case R_:
              O_(t, e, i, n, 2), (n += 6)
          }
      },
      scalePoints(t, e, i, s, n) {
        for (let o = n ? s + 1 : 0, r = n ? o + 2 * n : t.length; o < r; o += 2) (t[o] *= e), (t[o + 1] *= i)
      }
    },
    { scalePoints: O_ } = C_,
    A_ = tt.get(),
    { topLeft: D_, top: M_, topRight: I_, right: F_, bottom: W_, left: z_ } = t.Direction9
  function U_(t, e, i) {
    t.pathInputed ? N_(t, e, i) : (1 !== e && (t.width *= e), 1 !== i && (t.height *= i))
  }
  function H_(t, e, i, s) {
    let o = e
    if (!n(s)) {
      const n = t.__layout
      let { width: r, height: a } = n.boxBounds
      switch (((r *= i - e), (a *= e - i), s)) {
        case M_:
        case W_:
          ;(o = i), n.affectScaleOrRotation ? t.moveInner(-r / 2, 0) : (t.x -= r / 2)
          break
        case z_:
        case F_:
          n.affectScaleOrRotation ? t.moveInner(0, -a / 2) : (t.y -= a / 2)
          break
        case D_:
        case I_:
          n.affectScaleOrRotation ? t.moveInner(0, -a) : (t.y -= a)
      }
    }
    t.fontSize *= o
    const r = t.__,
      { padding: a } = r
    a && (t.padding = c(a) ? a.map(t => t * o) : a * o), r.__autoWidth || (t.width *= o), r.__autoHeight || (t.height *= o)
  }
  function N_(t, e, i) {
    C_.scale(t.__.path, e, i), (t.path = t.__.path)
  }
  function Y_(t, e, i) {
    const { points: s } = t
    u(s[0])
      ? s.forEach(t => {
          ;(t.x *= e), (t.y *= i)
        })
      : C_.scalePoints(s, e, i),
      (t.points = s)
  }
  function X_(t, e, i) {
    const { children: s } = t
    for (let t = 0; t < s.length; t++) (A_.a = e), (A_.d = i), s[t].transform(A_, !0)
  }
  const V_ = t.Leaf.prototype
  ;(V_.scaleResize = function (t, e = t, i) {
    const s = this
    i || (s.editConfig && 'scale' === s.editConfig.editSize)
      ? ((s.scaleX *= t), (s.scaleY *= e))
      : (t < 0 && ((s.scaleX *= -1), (t = -t)), e < 0 && ((s.scaleY *= -1), (e = -e)), this.__scaleResize(t, e))
  }),
    (V_.__scaleResize = function (t, e) {
      U_(this, t, e)
    }),
    (V_.resizeWidth = function (t) {
      const e = t / this.getBounds('box', 'local').width || 1
      this.scaleOf(this.__layout.boxBounds, e, this.__.lockRatio ? e : 1, !0)
    }),
    (V_.resizeHeight = function (t) {
      const e = t / this.getBounds('box', 'local').height || 1
      this.scaleOf(this.__layout.boxBounds, this.__.lockRatio ? e : 1, e, !0)
    }),
    (t.Text.prototype.__scaleResize = function (t, e) {
      const { app: i, editConfig: s } = this,
        n = i && i.editor,
        o = n && n.dragPoint
      if (this.__.resizeFontSize || (s && 'font-size' === s.editSize) || (o && 'font-size' === n.mergedConfig.editSize))
        H_(this, t, e, o && o.direction)
      else {
        const { __autoWidth: i, __autoHeight: s, textAlign: n, verticalAlign: o } = this.__,
          { boxBounds: r } = this.__layout
        i && 'left' !== n && 1 !== t && (this.x += r.x), s && 'top' !== o && 1 !== e && (this.y += r.y), U_(this, t, e)
      }
    }),
    (t.Path.prototype.__scaleResize = function (t, e) {
      N_(this, t, e)
    }),
    (t.Line.prototype.__scaleResize = function (t, e) {
      this.pathInputed ? N_(this, t, e) : this.points ? Y_(this, t, e) : (this.width *= t)
    }),
    (t.Polygon.prototype.__scaleResize = function (t, e) {
      this.pathInputed ? N_(this, t, e) : this.points ? Y_(this, t, e) : U_(this, t, e)
    }),
    (t.Group.prototype.__scaleResize = function (t, e) {
      X_(this, t, e)
    }),
    (t.Box.prototype.__scaleResize = function (t, e) {
      const { resizeChildren: i, __autoSize: s } = this.__
      ;(s && i) || U_(this, t, e), i && X_(this, t, e)
    }),
    le.add('resize'),
    le.add('editor', 'resize'),
    (de.editor = function (e, i) {
      const s = new t.Editor(e)
      return i && i.sky.add((i.editor = s)), s
    }),
    t.Box.addAttr('textBox', !1, _o),
    t.UI.addAttr('editConfig', void 0, _o),
    t.UI.addAttr('editOuter', t => (t.updateLayout(), t.__.__isLinePath ? 'LineEditTool' : 'EditTool'), _o),
    t.UI.addAttr('editInner', 'PathEditor', _o),
    t.Group.addAttr('editInner', '', _o),
    t.Text.addAttr('editInner', 'TextEditor', _o),
    (t.UI.setEditConfig = function (t) {
      this.changeAttr('editConfig', t)
    }),
    (t.UI.setEditOuter = function (t) {
      this.changeAttr('editOuter', t)
    }),
    (t.UI.setEditInner = function (t) {
      this.changeAttr('editInner', t)
    })
  const G_ = { none: 'none', title: 'capitalize', upper: 'uppercase', lower: 'lowercase', 'small-caps': 'small-caps' },
    j_ = { top: 'flex-start', middle: 'center', bottom: 'flex-end' },
    K_ = { none: 'none', under: 'underline', delete: 'line-through', 'under-delete': 'underline line-through' }
  function q_(t, e, i) {
    const { style: s } = t,
      { fill: o, padding: a, textWrap: h, textOverflow: l, textDecoration: d } = e
    let p
    ;(s.fontFamily = e.fontFamily),
      (s.fontSize = e.fontSize * i + 'px'),
      (function (t, e) {
        let i = 'black'
        c(e) && (e = e[0])
        if (u(e))
          switch (e.type) {
            case 'solid':
              i = Zh.string(e.color)
              break
            case 'image':
              break
            case 'linear':
            case 'radial':
            case 'angular':
              const t = e.stops[0]
              i = Zh.string(r(t) ? t : t.color)
              break
            default:
              n(e.r) || (i = Zh.string(e))
          }
        else i = e
        t.color = i
      })(s, o),
      (s.fontStyle = e.italic ? 'italic' : 'normal'),
      (s.fontWeight = e.fontWeight),
      u(d) ? ((p = d.type), d.color && (s.textDecorationColor = Zh.string(d.color))) : (p = d),
      (s.textDecoration = K_[p]),
      (s.textTransform = G_[e.textCase]),
      (s.textAlign = 'both' === e.textAlign ? 'justify' : e.textAlign),
      (s.display = 'flex'),
      (s.flexDirection = 'column'),
      (s.justifyContent = j_[e.verticalAlign]),
      (s.lineHeight = (e.__.__lineHeight || 0) * i + 'px'),
      (s.letterSpacing = (e.__.__letterSpacing || 0) * i + 'px'),
      (s.whiteSpace = 'none' === h || e.__.__autoWidth ? 'nowrap' : 'normal'),
      (s.wordBreak = 'break' === h ? 'break-all' : 'normal'),
      (s.textIndent = (e.paraIndent || 0) * i + 'px'),
      (s.padding = c(a) ? a.map(t => t * i + 'px').join(' ') : (a || 0) * i + 'px'),
      (s.textOverflow = 'show' === l ? '' : 'hide' === l ? 'clip' : l)
  }
  function Z_(t) {
    const { scroll: e, disabled: i } = t.app.config.move
    return !e || i ? '' : !0 === e ? 'free' : e
  }
  function $_(e, i, s) {
    J_(e.parentApp ? e.parentApp : e, i),
      e.isApp ||
        s ||
        e.__eventIds.push(
          e.on_(t.MoveEvent.BEFORE_MOVE, t => {
            const i = e.getValidMove(t.moveX, t.moveY, !1)
            if (Z_(e).includes('limit')) {
              const s = e.getValidMove(0, 0)
              if (s.x || s.y) {
                const e = 100,
                  n = 200,
                  o = 'drag' === t.moveType ? 0.3 : 0.05
                Math.abs(s.x) > e ? (i.x = 0) : (i.x *= o), Math.abs(s.y) > n ? (i.y = 0) : (i.y *= o)
              }
            }
            e.zoomLayer.move(i)
          }),
          e.on_(t.MoveEvent.DRAG_ANIMATE, () => {
            const t = e.getValidMove(0, 0)
            ;(t.x || t.y) && e.interaction.stopDragAnimate()
          }),
          e.on_(t.MoveEvent.END, t => {
            lr.animateMove(e.zoomLayer, e.getValidMove(t.moveX, t.moveY))
          }),
          e.on_(t.ZoomEvent.BEFORE_ZOOM, t => {
            const { zoomLayer: i } = e,
              s = e.getValidScale(t.scale)
            1 !== s && i.scaleOfWorld(t, s)
          })
        )
  }
  function J_(t, e) {
    const i = { wheel: { preventDefault: !0 }, touch: { preventDefault: !0 }, pointer: { preventDefaultMenu: !0 } }
    e && _.assign(i, e), _.assign(t.config, i, t.userConfig)
  }
  ;(t.TextEditor = class extends u_ {
    constructor() {
      super(...arguments), (this.config = { selectAll: !0 }), (this.eventIds = [])
    }
    get tag() {
      return 'TextEditor'
    }
    onLoad() {
      const { editor: e } = this,
        { config: i } = e.app,
        s = this.editTarget
      ;(s.textEditing = !0), (this.isHTMLText = !(s instanceof t.Text)), (this._keyEvent = i.keyEvent), (i.keyEvent = !1)
      const n = (this.editDom = document.createElement('div'))
      n.classList.add('leafer-text-editor')
      const { style: o } = n
      ;(n.contentEditable = 'true'),
        (o.position = 'fixed'),
        (o.transformOrigin = 'left top'),
        (o.boxSizing = 'border-box'),
        this.isHTMLText ? (n.innerHTML = String(s.text)) : (n.innerText = String(s.text))
      const { view: r } = e.app
      ;(this.inBody = r instanceof HTMLCanvasElement) ? document.body.appendChild(n) : r.appendChild(n),
        (this.eventIds = [
          e.app.on_(t.PointerEvent.DOWN, t => {
            let i,
              { target: s } = t.origin
            for (; s; ) s === n && (i = !0), (s = s.parentElement)
            i || e.closeInnerEditor()
          })
        ]),
        (this.onFocus = this.onFocus.bind(this)),
        (this.onInput = this.onInput.bind(this)),
        (this.onPaste = this.onPaste.bind(this)),
        (this.onUpdate = this.onUpdate.bind(this)),
        (this.onKeydown = this.onKeydown.bind(this)),
        n.addEventListener('focus', this.onFocus),
        n.addEventListener('input', this.onInput),
        n.addEventListener('paste', this.onPaste),
        window.addEventListener('keydown', this.onKeydown),
        window.addEventListener('scroll', this.onUpdate)
      const a = window.getSelection(),
        h = document.createRange()
      if (this.config.selectAll) h.selectNodeContents(n)
      else {
        const t = n.childNodes[0]
        t && (h.setStartAfter(t), h.setEndAfter(t)), h.collapse(!0)
      }
      a.removeAllRanges(), a.addRange(h)
    }
    onInput() {
      const { editDom: t } = this
      this.editTarget.text = this.isHTMLText ? t.innerHTML : t.innerText
    }
    onFocus() {
      this.editDom.style.outline = 'none'
    }
    onKeydown(t) {
      if (('Escape' === t.code && this.editor.closeInnerEditor(), 'Enter' === t.key)) {
        t.preventDefault()
        const e = document.createElement('br'),
          i = document.createTextNode('​'),
          s = window.getSelection().getRangeAt(0)
        s.deleteContents(), s.insertNode(i), s.insertNode(e), s.setStartAfter(e), s.setEndAfter(e), this.onInput()
      }
    }
    onPaste(t) {
      if (this.isHTMLText) return
      t.preventDefault()
      const e = t.clipboardData
      if (!e) return
      let i = e.getData('text/plain').replace(/\r\n?/g, '\n')
      const s = window.getSelection()
      if (!s || !s.rangeCount) return
      const n = s.getRangeAt(0)
      n.deleteContents()
      const o = i.split('\n'),
        r = document.createDocumentFragment()
      o.forEach((t, e) => {
        e > 0 && r.appendChild(document.createElement('br')), r.appendChild(document.createTextNode(t))
      }),
        n.insertNode(r),
        n.collapse(!1),
        s.removeAllRanges(),
        s.addRange(n),
        this.onInput()
    }
    onUpdate() {
      const { editTarget: t } = this
      let e = 1
      if (!this.isHTMLText) {
        const { scaleX: i, scaleY: s } = t.worldTransform
        e = Math.max(Math.abs(i), Math.abs(s))
        t.fontSize * e < 12 && (e *= 12 / t.fontSize)
      }
      this.textScale = e
      let { width: i, height: s } = t,
        n = 0,
        o = 0
      ;(i *= e), (s *= e)
      const r = t.__
      if (r.__autoWidth)
        switch (((i += 20), r.textAlign)) {
          case 'center':
            n = r.autoSizeAlign ? -i / 2 : -10
            break
          case 'right':
            n = r.autoSizeAlign ? -i : -20
        }
      if (r.__autoHeight)
        switch (((s += 20), r.verticalAlign)) {
          case 'middle':
            o = r.autoSizeAlign ? -s / 2 : -10
            break
          case 'bottom':
            o = r.autoSizeAlign ? -s : -20
        }
      const { x: a, y: h } = this.inBody ? t.app.clientBounds : t.app.tree.clientBounds,
        { a: l, b: d, c: c, d: u, e: p, f: g } = new wt(t.worldTransform).scale(1 / e).translateInner(n, o),
        { style: _ } = this.editDom
      ;(_.transform = `matrix(${l},${d},${c},${u},${p},${g})`),
        (_.left = a + 'px'),
        (_.top = h + 'px'),
        (_.width = i + 'px'),
        (_.height = s + 'px'),
        this.isHTMLText || q_(this.editDom, t, e)
    }
    onUnload() {
      const { editTarget: t, editor: e, editDom: i } = this
      t &&
        (this.onInput(),
        '\n' === t.text && (t.text = ''),
        (t.textEditing = void 0),
        e.app && (e.app.config.keyEvent = this._keyEvent),
        e.off_(this.eventIds),
        i.removeEventListener('focus', this.onFocus),
        i.removeEventListener('input', this.onInput),
        i.removeEventListener('paste', this.onPaste),
        window.removeEventListener('keydown', this.onKeydown),
        window.removeEventListener('scroll', this.onUpdate),
        i.remove(),
        (this.editDom = this.eventIds = void 0))
    }
  }),
    (t.TextEditor = ye([Jg()], t.TextEditor)),
    le.add('text-editor', 'editor')
  const Q_ = ie.get('LeaferTypeCreator'),
    tf = {
      list: {},
      register(t, e) {
        ef[t] && Q_.repeat(t), (ef[t] = e)
      },
      run(t, e) {
        const i = ef[t]
        i && i(e)
      }
    },
    { list: ef, register: sf } = tf
  sf('viewport', $_),
    sf('custom', function (t) {
      $_(t, null, !0)
    }),
    sf('design', function (t) {
      $_(t, { zoom: { min: 0.01, max: 256 }, move: { holdSpaceKey: !0, holdMiddleKey: !0 } })
    }),
    sf('document', function (t) {
      $_(t, { zoom: { min: 1 }, move: { scroll: 'limit' } })
    })
  const nf = {
      state: { type: 'none', typeCount: 0, startTime: 0, totalData: null, center: {} },
      getData(t) {
        const e = t[0],
          i = t[1],
          s = ut.getCenter(e.from, i.from),
          n = ut.getCenter(e.to, i.to),
          o = { x: n.x - s.x, y: n.y - s.y },
          r = ut.getDistance(e.from, i.from)
        return { move: o, scale: ut.getDistance(e.to, i.to) / r, rotation: ut.getRotation(e.from, i.from, e.to, i.to), center: n }
      },
      getType(t, e) {
        const i = Math.hypot(t.move.x, t.move.y) / (e.move || 5),
          s = Math.abs(t.scale - 1) / (e.scale || 0.03),
          n = Math.abs(t.rotation) / (e.rotation || 2)
        return i < 1 && s < 1 && n < 1 ? 'none' : i >= s && i >= n ? 'move' : s >= n ? 'zoom' : 'rotate'
      },
      detect(t, e) {
        const { state: i } = of,
          s = of.getType(t, e)
        if (
          (i.totalData || ((i.startTime = Date.now()), (i.center = t.center)),
          of.add(t, i.totalData),
          (i.totalData = t),
          s === i.type)
        ) {
          if ((i.typeCount++, i.typeCount >= (e.count || 3) && 'none' !== s)) return s
        } else (i.type = s), (i.typeCount = 1)
        return Date.now() - i.startTime >= (e.time || 160) ? of.getType(i.totalData, e) : 'none'
      },
      add(t, e) {
        e && (ut.move(t.move, e.move), (t.scale *= e.scale), (t.rotation += e.rotation), (t.center = e.center))
      },
      reset() {
        const { state: t } = of
        ;(t.type = 'none'), (t.typeCount = 0), (t.startTime = 0), (t.totalData = null)
      }
    },
    of = nf,
    { abs: rf, max: af } = Math,
    { sign: hf, within: lf } = z,
    df = {
      getMove(t, e) {
        let { moveSpeed: i } = e,
          { deltaX: s, deltaY: n } = t
        t.shiftKey && !s && ((s = n), (n = 0))
        const o = rf(s),
          r = rf(n)
        return o > 50 && (s = af(50, o / 3) * hf(s)), r > 50 && (n = af(50, r / 3) * hf(n)), { x: -s * i * 2, y: -n * i * 2 }
      },
      getScale(t, e) {
        let i,
          s = 1,
          { zoomMode: n, zoomSpeed: o } = e
        const r = t.deltaY || t.deltaX
        if (
          (n
            ? ((i = 'mouse' === n || (!t.deltaX && (w.intWheelDeltaY ? Math.abs(r) > 17 : Math.ceil(r) !== r))),
              (t.shiftKey || t.metaKey || t.ctrlKey) && (i = !0))
            : (i = !t.shiftKey && (t.metaKey || t.ctrlKey)),
          i)
        ) {
          o = lf(o, 0, 1)
          const i = t.deltaY ? e.delta.y : e.delta.x,
            n = lf(1 - (rf(r) / (4 * i)) * o, 0.5, 2)
          s = r > 0 ? n : 1 / n
        }
        return s
      }
    }
  let cf, uf, pf, gf
  class _f {
    get transforming() {
      return this.moving || this.zooming || this.rotating
    }
    get moving() {
      return !!this.moveData
    }
    get zooming() {
      return !!this.zoomData
    }
    get rotating() {
      return !!this.rotateData
    }
    constructor(t) {
      this.interaction = t
    }
    move(e) {
      const { interaction: i } = this
      e.moveType || (e.moveType = 'move'),
        this.moveData ||
          (this.setPath(e),
          (cf = 0),
          (uf = 0),
          (this.moveData = Object.assign(Object.assign({}, e), { moveX: 0, moveY: 0, totalX: cf, totalY: uf })),
          i.emit(t.MoveEvent.START, this.moveData)),
        (e.path = this.moveData.path),
        (e.totalX = cf += e.moveX),
        (e.totalY = uf += e.moveY),
        i.emit(t.MoveEvent.BEFORE_MOVE, e),
        i.emit(t.MoveEvent.MOVE, e),
        this.transformEndWait()
    }
    zoom(e) {
      const { interaction: i } = this
      this.zoomData ||
        (this.setPath(e),
        (pf = 1),
        (this.zoomData = Object.assign(Object.assign({}, e), { scale: 1, totalScale: pf })),
        i.emit(t.ZoomEvent.START, this.zoomData)),
        (e.path = this.zoomData.path),
        (e.totalScale = pf *= e.scale),
        i.emit(t.ZoomEvent.BEFORE_ZOOM, e),
        i.emit(t.ZoomEvent.ZOOM, e),
        this.transformEndWait()
    }
    rotate(e) {
      const { interaction: i } = this
      this.rotateData ||
        (this.setPath(e),
        (gf = 0),
        (this.rotateData = Object.assign(Object.assign({}, e), { rotation: 0, totalRotation: gf })),
        i.emit(t.RotateEvent.START, this.rotateData)),
        (e.path = this.rotateData.path),
        (e.totalRotation = gf += e.rotation),
        i.emit(t.RotateEvent.BEFORE_ROTATE, e),
        i.emit(t.RotateEvent.ROTATE, e),
        this.transformEndWait()
    }
    setPath(t) {
      const { interaction: e } = this,
        { path: i } = e.selector.getByPoint(t, e.hitRadius)
      ;(t.path = i), e.cancelHover()
    }
    transformEndWait() {
      clearTimeout(this.transformTimer),
        (this.transformTimer = setTimeout(() => {
          this.transformEnd()
        }, this.interaction.p.transformTime))
    }
    transformEnd() {
      const { interaction: e, moveData: i, zoomData: s, rotateData: n } = this
      i && e.emit(t.MoveEvent.END, Object.assign(Object.assign({}, i), { totalX: cf, totalY: uf })),
        s && e.emit(t.ZoomEvent.END, Object.assign(Object.assign({}, s), { totalScale: pf })),
        n && e.emit(t.RotateEvent.END, Object.assign(Object.assign({}, n), { totalRotation: gf })),
        this.reset()
    }
    reset() {
      this.zoomData = this.moveData = this.rotateData = null
    }
    destroy() {
      this.reset()
    }
  }
  const ff = t.Leafer.prototype,
    mf = new $t(),
    yf = new yt()
  function vf(t, e) {
    return Object.assign(Object.assign({}, e), { moveX: t.x, moveY: t.y })
  }
  function wf(t, e) {
    return Object.assign(Object.assign({}, e), { scale: t })
  }
  ;(ff.initType = function (t) {
    tf.run(t, this)
  }),
    (ff.getValidMove = function (t, e, i = !0) {
      const { disabled: s } = this.app.config.move
      yf.set(t, e)
      const n = Z_(this)
      return (
        n &&
          (n.includes('x')
            ? (yf.y = 0)
            : n.includes('y')
            ? (yf.x = 0)
            : Math.abs(yf.x) > Math.abs(yf.y)
            ? (yf.y = 0)
            : (yf.x = 0),
          i &&
            n.includes('limit') &&
            (mf.set(this.__world).addPoint(this.zoomLayer),
            Md.getValidMove(mf, this.canvas.bounds, 'auto', yf, !0),
            n.includes('x') ? (yf.y = 0) : n.includes('y') && (yf.x = 0))),
        { x: s ? 0 : yf.x, y: s ? 0 : yf.y }
      )
    }),
    (ff.getValidScale = function (t) {
      const { scaleX: e } = this.zoomLayer.__,
        { min: i, max: s, disabled: n } = this.app.config.zoom,
        o = Math.abs(e * t)
      return i && o < i ? (t = i / e) : s && o > s && (t = s / e), n ? 1 : t
    })
  const xf = sc.prototype
  ;(xf.createTransformer = function () {
    this.transformer = new _f(this)
  }),
    (xf.move = function (t) {
      this.transformer.move(t)
    }),
    (xf.zoom = function (t) {
      this.transformer.zoom(t)
    }),
    (xf.rotate = function (t) {
      this.transformer.rotate(t)
    }),
    (xf.transformEnd = function () {
      this.transformer.transformEnd()
    }),
    (xf.wheel = function (t) {
      const { wheel: e, pointer: i } = this.config,
        { posDeltaSpeed: s, negDeltaSpeed: n } = e
      if (e.disabled) return
      t.deltaX > 0 ? s && (t.deltaX *= s) : n && (t.deltaX *= n), t.deltaY > 0 ? s && (t.deltaY *= s) : n && (t.deltaY *= n)
      const o = e.getScale ? e.getScale(t, e) : df.getScale(t, e)
      if (1 !== o) this.zoom(wf(o, t))
      else {
        const s = e.getMove ? e.getMove(t, e) : df.getMove(t, e)
        i.snap && ut.round(s), this.move(vf(s, t))
      }
    }),
    (xf.multiTouch = function (t, e) {
      const { disabled: i, singleGesture: s } = this.config.multiTouch
      if (i) return
      this.pointerWaitCancel()
      let n = nf.getData(e),
        { moving: o, zooming: r, rotating: a } = this.transformer
      if (s) {
        if (!this.transformer.transforming) {
          switch (nf.detect(n, u(s) ? s : {})) {
            case 'move':
              o = !0
              break
            case 'zoom':
              r = !0
              break
            case 'rotate':
              a = !0
              break
            default:
              return
          }
          nf.reset()
        }
        o || (n.center = nf.state.center)
      } else o = r = a = !0
      var h, l
      Object.assign(t, n.center),
        (t.multiTouch = !0),
        a && this.rotate(((h = n.rotation), (l = t), Object.assign(Object.assign({}, l), { rotation: h }))),
        r && this.zoom(wf(n.scale, t)),
        o && this.move(vf(n.move, t))
    })
  const bf = jd.prototype,
    { abs: Ef, min: Tf, max: Sf, hypot: kf } = Math
  function Bf(t, e) {
    let i = 1
    const s = 'out' === e,
      n = Math.abs(t)
    if (n > 1) {
      for (; s ? i < n : i <= n; ) i *= 2
      s && (i /= 2)
    } else {
      for (; s ? i >= n : i > n; ) i /= 2
      s || (i *= 2)
    }
    return i / t
  }
  ;(bf.checkDragEndAnimate = function (e) {
    const { interaction: i } = this,
      s = this.canAnimate && this.moving && i.m.dragAnimate
    if (s) {
      const n = h(s) ? s : 0.95,
        o = 0.15,
        r = 150
      let a,
        l,
        d,
        c = 0,
        u = 0,
        p = 0,
        g = 0,
        _ = 3
      const { dragDataList: f } = this,
        m = f.length
      for (let t = m - 1; t >= Sf(m - 3, 0) && ((d = f[t]), !(d.time && Date.now() - d.time > 100)); t--)
        (a = _--), (c += d.moveX * a), (u += d.moveY * a), (g += a), (l = kf(d.moveX, d.moveY)), l > p && (p = l)
      if ((g && ((c /= g), (u /= g)), p > 8)) {
        const t = 1.15 + Tf((p - 8) / 17, 1) * (1.6 - 1.15)
        ;(c *= t), (u *= t)
      }
      const y = Sf(Ef(c), Ef(u))
      y > r && ((l = r / y), (c *= l), (u *= l))
      const v = () => {
        if (((c *= n), (u *= n), (e = Object.assign({}, e)), Ef(c) < o && Ef(u) < o)) return this.dragEndReal(e)
        ut.move(e, c, u), this.drag(e), this.animate(v), i.emit(t.MoveEvent.DRAG_ANIMATE, e)
      }
      this.animate(v)
    }
    return s
  }),
    (bf.animate = function (t, e) {
      const i = t || this.animateWait
      i && this.interaction.target.nextRender(i, null, e), (this.animateWait = t)
    }),
    (bf.stopAnimate = function () {
      this.animate(null, 'off'),
        this.interaction.target.nextRender(() => {
          this.dragData && this.dragEndReal(this.dragData)
        })
    }),
    (bf.checkDragOut = function (t) {
      const { interaction: e } = this
      this.autoMoveCancel(), this.dragging && !e.shrinkCanvasBounds.hitPoint(t) && this.autoMoveOnDragOut(t)
    }),
    (bf.autoMoveOnDragOut = function (t) {
      const { interaction: e, downData: i, canDragOut: s } = this,
        { autoDistance: n, dragOut: o } = e.m
      if (!o || !s || !n) return
      const r = e.shrinkCanvasBounds,
        { x: a, y: h } = r,
        l = jt.maxX(r),
        d = jt.maxY(r),
        c = t.x < a ? n : l < t.x ? -n : 0,
        u = t.y < h ? n : d < t.y ? -n : 0
      let p = 0,
        g = 0
      this.autoMoveTimer = setInterval(() => {
        ;(p += c),
          (g += u),
          ut.move(i, c, u),
          ut.move(this.dragData, c, u),
          e.move(Object.assign(Object.assign({}, t), { moveX: c, moveY: u, totalX: p, totalY: g, moveType: 'drag' })),
          e.pointerMoveReal(t)
      }, 10)
    }),
    (bf.autoMoveCancel = function () {
      this.autoMoveTimer && (clearInterval(this.autoMoveTimer), (this.autoMoveTimer = 0))
    }),
    le.add('viewport'),
    le.add('view'),
    (t.Leafer.prototype.zoom = function (t, e, i, s) {
      let n
      p(e) ? ((n = e.padding), (i = e.scroll), (s = e.transition)) : (n = e)
      const { zoomLayer: a } = this,
        l = this.canvas.bounds.clone().shrink(o(n) ? 30 : n),
        d = new $t(),
        g = { x: l.x + l.width / 2, y: l.y + l.height / 2 }
      let _
      a.killAnimate()
      const { x: f, y: m, scaleX: y, scaleY: v } = a.__,
        { boxBounds: w } = a
      if (r(t))
        switch (t) {
          case 'in':
            _ = Bf(y, 'in')
            break
          case 'out':
            _ = Bf(y, 'out')
            break
          case 'fit':
            t = w
            break
          case 'fit-width':
            ;(t = new $t(w)).height = 0
            break
          case 'fit-height':
            ;(t = new $t(w)).width = 0
        }
      else h(t) && (_ = t / y)
      if (_) (_ = this.getValidScale(_)), a.scaleOfWorld(g, _, _, !1, s)
      else if (u(t)) {
        const e = { x: f, y: m, scaleX: y, scaleY: v },
          n = c(t)
        if (n || t.tag) {
          const e = n ? t : [t]
          d.setListWithFn(e, mr.worldBounds)
        } else {
          const e = (function (t, e) {
            let i,
              { x: s, y: n, width: o, height: r } = t
            return (
              r || ((r = o * (e.height / e.width)), (i = !0)),
              o || ((o = r * (e.width / e.height)), (i = !0)),
              i ? { x: s, y: n, width: o, height: r } : t
            )
          })(t, l)
          d.set(a.getWorldBounds(e))
        }
        const { width: o, height: r } = d
        let h = l.x - d.x,
          u = l.y - d.y
        return (
          i
            ? ((h += Math.max((l.width - o) / 2, 0)), (u += Math.max((l.height - r) / 2, 0)))
            : ((_ = this.getValidScale(Math.min(l.width / o, l.height / r))),
              (h += (l.width - o * _) / 2),
              (u += (l.height - r * _) / 2),
              ut.scaleOf(e, d, _),
              d.scaleOf(d, _),
              (e.scaleX *= _),
              (e.scaleY *= _)),
          'x' === i ? (u = 0) : 'y' === i && (h = 0),
          ut.move(e, h, u),
          d.move(h, u),
          a.set(e, s),
          d
        )
      }
      return a.worldBoxBounds
    })
  class Pf extends t.Group {
    get isOutside() {
      return !0
    }
    constructor(t, e) {
      super(),
        (this.config = { theme: 'light', padding: 0, minSize: 10 }),
        t.isApp && (t.sky.add(this), (t = t.tree)),
        (this.target = t),
        e && _.assign(this.config, e),
        this.changeTheme(this.config.theme),
        this.waitLeafer(this.__listenEvents, this)
    }
    changeTheme(e) {
      let i
      r(e)
        ? ((i = { fill: 'black', stroke: 'rgba(255,255,255,0.8)' }),
          'dark' === e && ((i.fill = 'white'), (i.stroke = 'rgba(0,0,0,0.2)')))
        : (i = e),
        this.scrollXBar || this.addMany((this.scrollXBar = new t.Box()), (this.scrollYBar = new t.Box())),
        (i = Object.assign(
          {
            strokeAlign: 'center',
            opacity: 0.5,
            width: 6,
            cornerRadius: 3,
            hoverStyle: { opacity: 0.6 },
            pressStyle: { opacity: 0.7 }
          },
          i
        )),
        i.height || (i.height = i.width),
        this.scrollXBar.set(Object.assign(Object.assign({}, i), { visible: !1 })),
        this.scrollYBar.set(Object.assign(Object.assign({}, i), { visible: !1 })),
        this.leafer && this.update()
    }
    update(t) {
      if (this.dragScrolling) return
      const { minSize: e, padding: i } = this.config,
        { zoomLayer: s, canvas: n } = this.target.leafer,
        { worldRenderBounds: o } = s
      if (t && this.scrollBounds && this.scrollBounds.isSame(o)) return
      this.scrollBounds = new $t(o)
      const r = n.bounds.clone().shrink(i),
        a = r.clone().add(o),
        h = (this.ratioX = r.width / a.width),
        l = (this.ratioY = r.height / a.height),
        d = (r.x - a.x) / a.width,
        c = (r.y - a.y) / a.height,
        u = h < 1,
        p = l < 1,
        { scrollXBar: g, scrollYBar: _ } = this,
        { x: f, y: m, width: y, height: v } = r.shrink([2, p ? _.width + 6 : 2, u ? g.height + 6 : 2, 2])
      g.set({ x: f + y * d, y: m + v + 2, width: Math.max(y * h, e), visible: u }),
        _.set({ x: f + y + 2, y: m + v * c, height: Math.max(v * l, e), visible: p })
    }
    onDrag(t) {
      ;(this.dragScrolling = !0), (this.__dragOut = this.app.config.move.dragOut), (this.app.config.move.dragOut = !1)
      const e = t.current === this.scrollXBar,
        i = this.target.leafer.getValidMove(e ? -t.moveX / this.ratioX : 0, e ? 0 : -t.moveY / this.ratioY)
      this.target.moveWorld(i.x, i.y), t.current.moveWorld(i.x && -i.x * this.ratioX, i.y && -i.y * this.ratioY)
    }
    onDragEnd() {
      ;(this.dragScrolling = !1), (this.app.config.move.dragOut = this.__dragOut)
    }
    __listenEvents() {
      const { scrollXBar: e, scrollYBar: i } = this
      this.__eventIds = [
        e.on_(t.DragEvent.DRAG, this.onDrag, this),
        i.on_(t.DragEvent.DRAG, this.onDrag, this),
        e.on_(t.DragEvent.END, this.onDragEnd, this),
        i.on_(t.DragEvent.END, this.onDragEnd, this),
        this.target.on_(Qr.BEFORE, () => this.update(!0)),
        this.target.leafer.on_(Zr.RESIZE, () => this.update())
      ]
    }
    __removeListenEvents() {
      this.off_(this.__eventIds)
    }
    destroy() {
      this.destroyed || (this.__removeListenEvents(), (this.target = this.config = null), super.destroy())
    }
  }
  le.add('scroll')
  class Lf extends Pl {
    setText(t) {
      ;(this._text = t), (this.__htmlChanged = !0)
    }
  }
  const Rf = {
    lt: '<',
    gt: '>',
    amp: '&',
    quot: '"',
    apos: "'",
    nbsp: ' ',
    ensp: ' ',
    emsp: ' ',
    thinsp: ' ',
    ndash: '–',
    mdash: '—',
    hellip: '…',
    middot: '·',
    bull: '•',
    laquo: '«',
    raquo: '»',
    lsquo: '‘',
    rsquo: '’',
    ldquo: '“',
    rdquo: '”',
    cent: '¢',
    pound: '£',
    yen: '¥',
    euro: '€',
    times: '×',
    divide: '÷',
    plusmn: '±',
    minus: '−',
    frac12: '½',
    frac14: '¼',
    frac34: '¾',
    sup2: '²',
    sup3: '³',
    deg: '°',
    reg: '®',
    copy: '©',
    trade: '™',
    section: '§',
    para: '¶',
    dagger: '†',
    Dagger: '‡',
    larr: '←',
    uarr: '↑',
    rarr: '→',
    darr: '↓',
    harr: '↔',
    alpha: 'α',
    beta: 'β',
    gamma: 'γ',
    delta: 'δ',
    pi: 'π',
    sigma: 'σ',
    omega: 'ω',
    Omega: 'Ω',
    micro: 'µ',
    infinity: '∞',
    not: '¬',
    equiv: '≡',
    le: '≤',
    ge: '≥'
  }
  ;(t.HTMLText = class extends t.Image {
    get __tag() {
      return 'HTMLText'
    }
    constructor(t) {
      super(t)
    }
    __updateBoxBounds() {
      const t = this.__
      if (t.__htmlChanged) {
        const e = document.createElement('div'),
          { style: i } = e
        ;(i.all = 'initial'),
          (i.position = 'absolute'),
          (i.visibility = 'hidden'),
          (e.innerHTML = this.text),
          document.body.appendChild(e)
        const { width: s, height: n } = e.getBoundingClientRect(),
          o = s + 10,
          r = `<svg xmlns="http://www.w3.org/2000/svg" width="${o}" height="${n}">\n                        <foreignObject width="${o}" height="${n}">\n                            <style>\n                                * {\n                                    margin: 0;\n                                    padding: 0;\n                                    box-sizing: border-box;\n                                }\n                            </style>\n                            <body xmlns="http://www.w3.org/1999/xhtml">\n                                ${this.decodeText(
            this.text
          )}\n                            </body>\n                        </foreignObject>\n                    </svg>`
        t.__setImageFill('data:image/svg+xml,' + encodeURIComponent(r)),
          (t.__naturalWidth = o / t.pixelRatio),
          (t.__naturalHeight = n / t.pixelRatio),
          (t.__htmlChanged = !1),
          e.remove()
      }
      super.__updateBoxBounds()
    }
    __draw(t, e, i) {
      ;(this.textEditing && !e.exporting) || super.__draw(t, e, i)
    }
    decodeText(t) {
      if (!t.includes('&')) return t
      let e,
        i,
        s = '',
        n = 0
      for (; n < t.length; ) {
        if ('&' === t[n]) {
          const o = t.indexOf(';', n + 1)
          if (o > n + 1 && ((e = t.slice(n + 1, o)), (i = Rf[e]), void 0 !== i)) {
            ;(s += i), (n = o + 1)
            continue
          }
        }
        s += t[n++]
      }
      return s
    }
    static addUnicodeEntity(t, e) {
      r(t) ? (Rf[t] = e) : Object.assign(Rf, t)
    }
  }),
    ye([Ho(Lf)], t.HTMLText.prototype, '__', void 0),
    ye([xo('')], t.HTMLText.prototype, 'text', void 0),
    ye([_o('TextEditor')], t.HTMLText.prototype, 'editInner', void 0),
    ye([Ro(!1)], t.HTMLText.prototype, 'textEditing', void 0),
    (t.HTMLText = ye([Zo()], t.HTMLText)),
    le.add('html')
  class Cf extends vl {}
  function Of(t) {
    return uo(t, t => ({
      set(e) {
        if (this.__setAttr(t, e)) {
          const t = this.__,
            e = 'none' !== t.startArrow || 'none' !== t.endArrow
          t.__useArrow !== e && Eo(this), (t.__useArrow = e), Bo(this)
        }
      }
    }))
  }
  ;(t.Arrow = class extends t.Line {
    get __tag() {
      return 'Arrow'
    }
    constructor(t) {
      super(t), (this.__.__useArrow = !0)
    }
    static registerArrow(t, e) {
      Jh.register(t, e)
    }
  }),
    ye([Ho(Cf)], t.Arrow.prototype, '__', void 0),
    ye([Of('angle')], t.Arrow.prototype, 'endArrow', void 0),
    (t.Arrow = ye([Zo()], t.Arrow))
  const { M: Af, L: Df, C: Mf, Q: If, O: Ff } = Ie,
    { rotate: Wf, copyFrom: zf, scale: Uf } = ut,
    Hf = {},
    Nf = {
      layout(t, e, i, s, n, o, r) {
        let a,
          h,
          l = 0,
          d = t.length
        for (; l < d; )
          switch (((a = t[l]), a)) {
            case Af:
            case Df:
              Yf(t, l + 1, e, i, s, n, o, r), (l += 3)
              break
            case Mf:
              for (h = 1; h < 6; h += 2) Yf(t, l + h, e, i, s, n, o, r)
              l += 7
              break
            case If:
              for (h = 1; h < 4; h += 2) Yf(t, l + h, e, i, s, n, o, r)
              l += 5
              break
            case Ff:
              ;(t[l + 1] += e), (t[l + 2] += i), s && (t[l + 3] *= s), o && ((t[l + 4] += o), (t[l + 5] += o)), (l += 7)
          }
      },
      rotate(t, e, i) {
        Nf.layout(t, 0, 0, 1, 1, e, i)
      }
    }
  function Yf(t, e, i, s, n, o, r, a) {
    zf(Hf, t[e], t[e + 1]), r && Wf(Hf, r, a), n && Uf(Hf, n, o), (t[e] = i + Hf.x), (t[e + 1] = s + Hf.y)
  }
  const { layout: Xf, rotate: Vf } = Nf,
    { getAngle: Gf } = ut,
    jf = { x: -0.5 },
    Kf = { connect: jf, offset: { x: -0.71, bevelJoin: 0.36, roundJoin: 0.22 }, path: [1, -3, -3, 2, 0, 0, 2, -3, 3] },
    qf = { connect: jf, offset: { x: -1.207, bevelJoin: 0.854, roundJoin: 0.707 }, path: [1, -3, -3, 2, 0, 0, 2, -1, 0] },
    Zf = {
      connect: jf,
      offset: { x: -0.9, bevelJoin: 0.624, roundJoin: 0.4 },
      path: [1, -3, 0, 2, -3, -2, 2, 0, 0, 2, -3, 2, 2, -3, 0, 1, -2.05, 1.1, 2, -2.05, -1.1],
      dashPath: [1, -2, 0, 2, -0.5, 0]
    },
    $f = {
      connect: jf,
      offset: { x: -1.1, bevelJoin: 0.872, roundJoin: 0.6 },
      path: [1, -3, 0, 2, -3.5, -1.8, 2, 0, 0, 2, -3.5, 1.8, 2, -3, 0, 1, -2.25, 0.95, 2, -2.25, -0.95],
      dashPath: [1, -3, 0, 2, -0.5, 0]
    },
    Jf = { offset: jf, path: [...Zf.path], dashPath: [1, -2.5, 0, 2, -1, 0] }
  Vf(Jf.path, 180, { x: -1.5, y: 0 })
  const Qf = { connect: { x: -1.3 }, path: [1, 1.8, -0.1, 2, 1.8, 0, 26, 0, 0, 1.8, 0, 359, 0] },
    tm = { connect: { x: 0.5 }, path: [...Qf.path, 1, 0, 0, 26, 0, 0, 1, 0, 360, 0], dashPath: [1, -0.5, 0, 2, 0.5, 0] },
    em = { connect: { x: -1.3 }, path: [1, -1.4, 0, 2, -1.4, -1.4, 2, 1.4, -1.4, 2, 1.4, 1.4, 2, -1.4, 1.4, 2, -1.4, 0] },
    im = { path: [...em.path, 2, -1.4, -0.49, 2, 1, -0.49, 1, -1.4, 0.49, 2, 1, 0.49] },
    sm = _.clone(em),
    nm = _.clone(im)
  Vf(sm.path, 45), Vf(nm.path, 45)
  const om = {
    angle: Kf,
    'angle-side': qf,
    arrow: $f,
    triangle: Zf,
    'triangle-flip': Jf,
    circle: tm,
    'circle-line': Qf,
    square: im,
    'square-line': em,
    diamond: nm,
    'diamond-line': sm,
    mark: { offset: jf, path: [1, 0, -2, 2, 0, 2] }
  }
  function rm(t, e, i, s, n, o, r) {
    let a, h
    const { strokeCap: l, strokeJoin: d } = t.__
    u(e) ? (e.type ? ((h = e.scale), (a = om[e.type])) : (a = e)) : (a = om[e])
    const { offset: c, connect: p, path: g, dashPath: _ } = a
    let f = p ? p.x : 0,
      m = c ? c.x : 0
    const y = [...g]
    return (
      r && _ && y.push(..._),
      'none' !== l && (f -= 0.5),
      c && ('round' === d && c.roundJoin ? (m += c.roundJoin) : 'bevel' === d && c.bevelJoin && (m += c.bevelJoin)),
      h && Xf(y, 0, 0, h, h),
      m && Xf(y, m, 0),
      Xf(y, s.x, s.y, n, n, Gf(i, s)),
      (o.x = (f + m) * n),
      y
    )
  }
  const { M: am, L: hm, C: lm, Q: dm, Z: cm, N: um, D: pm, X: gm, G: _m, F: fm, O: mm, P: ym, U: vm } = Ie,
    { copy: wm, copyFrom: xm, getDistancePoint: bm } = ut,
    Em = {},
    Tm = {},
    Sm = {},
    km = {},
    Bm = {},
    Pm = {
      list: om,
      addArrows(t) {
        const { startArrow: e, endArrow: i, strokeWidth: s, dashPattern: n, __pathForRender: o, cornerRadius: r } = t.__,
          a = !r
        let h,
          l = 0,
          d = o.length,
          c = 0,
          u = e && 'none' !== e
        for (; l < d; ) {
          switch (((h = o[l]), h)) {
            case am:
            case hm:
              ;(c < 2 || l + 6 >= d) && (xm(Bm, o[l + 1], o[l + 2]), !c && u && wm(Tm, Bm)), (l += 3)
              break
            case lm:
              ;(1 === c || l + 7 >= d - 3) && Lm(o, km, Bm, l + 3), (l += 7)
              break
            case dm:
              ;(1 === c || l + 5 >= d - 3) && Lm(o, km, Bm, l + 1), (l += 5)
              break
            case cm:
              return
            case um:
              l += 5
              break
            case pm:
              l += 9
              break
            case gm:
              l += 6
              break
            case _m:
              l += 9
              break
            case fm:
              l += 5
              break
            case mm:
              l += 7
              break
            case ym:
              l += 4
              break
            case vm:
              ;(1 === c || l + 6 >= d - 3) &&
                (Lm(o, km, Bm, l + 1), l + 6 !== d && ((Bm.x -= (Bm.x - km.x) / 10), (Bm.y -= (Bm.y - km.y) / 10))),
                (l += 6)
          }
          if ((c++, 1 === c && h !== am)) return
          if ((2 === c && u && wm(Sm, h === hm ? Bm : km), l === d)) {
            const r = (t.__.__pathForRender = a ? [...o] : o),
              d = (t.__.__pathForArrow = [])
            if (u) {
              const i = rm(t, e, Sm, Tm, s, Em, !!n)
              n ? d.push(...i) : r.push(...i), Em.x && (bm(Tm, Sm, -Em.x, !0), (r[1] = Sm.x), (r[2] = Sm.y))
            }
            if (i && 'none' !== i) {
              const e = rm(t, i, km, Bm, s, Em, !!n)
              if ((n ? d.push(...e) : r.push(...e), Em.x)) {
                let t
                switch ((bm(Bm, km, -Em.x, !0), h)) {
                  case hm:
                    t = l - 3 + 1
                    break
                  case lm:
                    t = l - 7 + 5
                    break
                  case dm:
                    t = l - 5 + 3
                    break
                  case vm:
                    t = l - 6 + 3
                }
                t && Rm(r, km, t)
              }
            }
          } else wm(km, Bm)
        }
      },
      register(t, e) {
        this.list[t] = e
      },
      get(t) {
        return this.list[t]
      }
    }
  function Lm(t, e, i, s) {
    xm(e, t[s], t[s + 1]), xm(i, t[s + 2], t[s + 3])
  }
  function Rm(t, e, i) {
    ;(t[i] = e.x), (t[i + 1] = e.y)
  }
  le.add('arrow'),
    t.UI.addAttr('startArrow', 'none', Of),
    t.UI.addAttr('endArrow', 'none', Of),
    Object.assign(Jh, Pm),
    Object.assign(Qh, {
      strokeArrow(t, e, i, s) {
        e.__.dashPattern && (i.beginPath(), e.__drawPathByData(i, e.__.__pathForArrow), (i.dashPattern = null), i.stroke())
      }
    })
  ;(t.Flow = class extends t.Box {
    get __tag() {
      return 'Flow'
    }
    constructor(t) {
      super(t), (this.__hasAutoLayout = !0)
    }
  }),
    ye([Ho(class extends fl {})], t.Flow.prototype, '__', void 0),
    ye([yo('x')], t.Flow.prototype, 'flow', void 0),
    (t.Flow = ye([Zo()], t.Flow))
  const Cm = {},
    Om = {
      'top-left': 'from',
      top: 'center',
      'top-right': 'to',
      right: 'to',
      'bottom-right': 'to',
      bottom: 'center',
      'bottom-left': 'from',
      left: 'from',
      center: 'center',
      'baseline-left': 'from',
      'baseline-center': 'center',
      'baseline-right': 'to'
    },
    Am = {
      'top-left': 'from',
      top: 'from',
      'top-right': 'from',
      right: 'center',
      'bottom-right': 'to',
      bottom: 'to',
      'bottom-left': 'to',
      left: 'center',
      center: 'center',
      'baseline-left': 'to',
      'baseline-center': 'to',
      'baseline-right': 'to'
    }
  function Dm(t, e, i) {
    const s = t.__,
      { contentBounds: n } = t.__layout
    Rt.toPoint(i, e, n, Cm), (e.x = s.__autoWidth ? n.x : Cm.x), (e.y = s.__autoHeight ? n.y : Cm.y)
  }
  const { move: Mm } = ut
  function Im(t, e, i, s, n, o) {
    const { children: r } = t
    let a,
      h,
      { x: l, start: d } = e,
      c = s
    l += i
    for (let t = 0, i = e.count; t < i; t++)
      (a = r[o ? d - t : d + t]),
        a.__.inFlow && 0 !== a.__.visible
          ? ((h = a.__flowBounds),
            'from' !== n && (c = s + (e.height - h.height) / ('center' === n ? 2 : 1)),
            Mm(a, l - h.x, c - h.y),
            (l += h.width + e.gap))
          : i++
  }
  function Fm(t, e, i) {
    const s = 'width' === i ? 'height' : 'width'
    ;(t[i] = Math.max(t[i], e[i])), (t[s] += t.count ? e[s] + t.gap : e[s]), t.list.push(e), t.count++
  }
  const Wm = {}
  function zm(t, e) {
    const { gap: i, flowAlign: s, flowWrap: n, __autoWidth: o, __autoHeight: a } = t.__,
      h = n && (e ? !o : !a)
    return (
      u(i) ? ((Wm.xGap = i.x || 0), (Wm.yGap = i.y || 0)) : (Wm.xGap = Wm.yGap = d(i)),
      (Wm.isAutoXGap = r(Wm.xGap) && !o),
      (Wm.isAutoYGap = r(Wm.yGap) && !a),
      (Wm.complex = h || 'top-left' !== s || t.__hasGrow || Wm.isAutoXGap || Wm.isAutoYGap),
      (Wm.wrap = h),
      Wm.complex &&
        ((Wm.isFitXGap = 'fit' === Wm.xGap && !o),
        (Wm.isFitYGap = 'fit' === Wm.yGap && !a),
        u(s)
          ? ((Wm.contentAlign = s.content || 'top-left'), (Wm.rowXAlign = s.x || 'from'), (Wm.rowYAlign = s.y || 'from'))
          : ((Wm.contentAlign = s), (Wm.rowXAlign = Om[s]), (Wm.rowYAlign = Am[s]))),
      Wm
    )
  }
  function Um(t, e) {
    return { x: 0, y: 0, width: 0, height: 0, gap: e, start: t, count: 0, grow: 0 }
  }
  function Hm(t, e, i, s) {
    const { count: n } = t
    n > 1 && (i > t[e] || s) && ((t.gap = (i - t[e]) / (n - 1)), (t[e] = i))
  }
  function Nm(t, e) {
    return 'box' === e ? t.__local : t.__layout.localStrokeBounds
  }
  const { within: Ym } = z
  function Xm(t, e, i, s) {
    let n,
      o,
      r,
      a = 0,
      h = e.hasRangeSize && [],
      { grow: l, start: d } = e
    const c = (i - e.width) / l,
      { children: u } = t
    if (!(c <= 0)) {
      e.width = i
      for (let t = 0, i = e.count; t < i; t++)
        (n = u[s ? d - t : d + t]),
          n.__.inFlow && 0 !== n.__.visible
            ? (o = n.__widthGrow) &&
              ((r = Vm(n, n.__flowBounds, c * o)), r ? ((a += r), (l -= o)) : h && (n.__.widthRange ? h.unshift(n) : h.push(n)))
            : i++
      a &&
        (function (t, e, i) {
          let s, n, o, r
          t.forEach(t => {
            ;(s = t.__widthGrow), (n = (e / i) * s), (r = Vm(t, (o = t.__flowBounds), o.width + n)), (e -= n - r), (i -= s)
          })
        })(h, a, l)
    }
  }
  function Vm(t, e, i) {
    const { widthRange: s, lockRatio: n } = t.__,
      o = s ? Ym(i, s) : i,
      r = o / e.width
    return t.scaleResize(r, n ? r : 1), (e.width = o), i - o
  }
  const { within: Gm } = z
  function jm(t, e, i, s) {
    let n,
      o,
      r,
      a = 0,
      h = e.hasRangeSize && [],
      { grow: l, start: d } = e
    const c = (i - e.height) / l,
      { children: u } = t
    if (!(c <= 0)) {
      e.height = i
      for (let t = 0, i = e.count; t < i; t++)
        (n = u[s ? d - t : d + t]),
          n.__.inFlow && 0 !== n.__.visible
            ? (o = n.__heightGrow) &&
              ((r = Km(n, n.__flowBounds, c * o)), r ? ((a += r), (l -= o)) : h && (n.__.heightRange ? h.unshift(n) : h.push(n)))
            : i++
      a &&
        (function (t, e, i) {
          let s, n, o, r
          t.forEach(t => {
            ;(s = t.__heightGrow), (n = (e / i) * s), (r = Km(t, (o = t.__flowBounds), o.height + n)), (e -= n - r), (i -= s)
          })
        })(h, a, l)
    }
  }
  function Km(t, e, i) {
    const { heightRange: s, lockRatio: n } = t.__,
      o = s ? Gm(i, s) : i,
      r = o / e.height
    return t.scaleResize(n ? r : 1, r), (e.height = o), i - o
  }
  const { move: qm } = ut
  function Zm(t, e) {
    const i = 'width',
      { children: s, itemBox: n } = t,
      o = zm(t, !0),
      { complex: r, wrap: a, xGap: h, yGap: l, isAutoXGap: d, isFitXGap: c } = o
    if (!s.length) return
    const u = a && { x: 0, y: 0, width: 0, height: 0, gap: 0, count: 0, list: [] },
      p = d ? 0 : h
    let g,
      _,
      f,
      m,
      y,
      { x: v, y: w, width: x, height: b } = t.__layout.contentBounds
    for (let o = 0, h = s.length; o < h; o++)
      (g = s[(m = e ? h - 1 - o : o)]),
        g.__.inFlow &&
          0 !== g.__.visible &&
          ((_ = Nm(g, n)),
          r
            ? ((g.__flowBounds = _),
              y || (y = Um(m, p)),
              a &&
                y.count &&
                y.width + _.width > x &&
                (y.grow ? Xm(t, y, x, e) : d && Hm(y, i, x, c), Fm(u, y, i), (y = Um(m, p))),
              (f = _.width),
              g.__widthGrow && ((y.grow += g.__widthGrow), (f = 0), g.__.widthRange && (y.hasRangeSize = !0)),
              g.__heightGrow && Km(g, _, b),
              (y.width += y.count ? f + p : f),
              (y.height = Math.max(y.height, _.height)),
              y.count++)
            : (qm(g, v - _.x, w - _.y), (v += _.width + p)))
    if (r && y) {
      const { isAutoYGap: s, isFitYGap: n, contentAlign: r, rowXAlign: h, rowYAlign: p } = o
      y.count && (y.grow ? Xm(t, y, x, e) : d && Hm(y, i, x, c), a && Fm(u, y, i)),
        a
          ? (s ? Hm(u, 'height', b, n) : (u.height += (u.gap = l) * (u.list.length - 1)),
            (function (t, e, i, s) {
              Dm(t, e, i)
              const { list: n } = e
              if (n.length > 1 && (s || (s = Om[i]), 'from' !== s)) {
                let t
                for (let i = 0, o = n.length; i < o; i++) (t = n[i]), (t.x = e.width - t.width), 'center' === s && (t.x /= 2)
              }
            })(t, u, r, h),
            (function (t, e, i, s) {
              const { list: n } = e,
                o = 'reverse' === t.__.flowWrap
              let r,
                { x: a, y: h } = e
              for (let l = 0, d = n.length; l < d; l++) (r = n[o ? d - 1 - l : l]), Im(t, r, a, h, i, s), (h += r.height + e.gap)
            })(t, u, p, e))
          : (Dm(t, y, r), Im(t, y, 0, y.y, p, e))
    }
  }
  const { move: $m } = ut
  function Jm(t, e, i, s, n, o) {
    const { children: r } = t
    let a,
      h,
      { y: l, start: d } = e,
      c = i
    l += s
    for (let t = 0, s = e.count; t < s; t++)
      (a = r[o ? d - t : d + t]),
        a.__.inFlow && 0 !== a.__.visible
          ? ((h = a.__flowBounds),
            'from' !== n && (c = i + (e.width - h.width) / ('center' === n ? 2 : 1)),
            $m(a, c - h.x, l - h.y),
            (l += h.height + e.gap))
          : s++
  }
  const { move: Qm } = ut
  function ty(t, e) {
    const i = 'height',
      { children: s, itemBox: n } = t,
      o = zm(t, !1),
      { complex: r, wrap: a, xGap: h, yGap: l, isAutoYGap: d, isFitYGap: c } = o
    if (!s.length) return
    const u = a && { x: 0, y: 0, width: 0, height: 0, gap: 0, count: 0, list: [] },
      p = d ? 0 : l
    let g,
      _,
      f,
      m,
      y,
      { x: v, y: w, width: x, height: b } = t.__layout.contentBounds
    for (let o = 0, h = s.length; o < h; o++)
      (g = s[(m = e ? h - 1 - o : o)]),
        g.__.inFlow &&
          0 !== g.__.visible &&
          ((_ = Nm(g, n)),
          r
            ? ((g.__flowBounds = _),
              y || (y = Um(m, p)),
              a &&
                y.count &&
                y.height + _.height > b &&
                (y.grow && jm(t, y, b, e), d && Hm(y, i, b, c), Fm(u, y, i), (y = Um(m, p))),
              (f = _.height),
              g.__heightGrow && ((y.grow += g.__heightGrow), (f = 0), g.__.heightRange && (y.hasRangeSize = !0)),
              g.__widthGrow && Vm(g, _, x),
              (y.height += y.count ? f + p : f),
              (y.width = Math.max(y.width, _.width)),
              y.count++)
            : (Qm(g, v - _.x, w - _.y), (w += _.height + p)))
    if (r && y) {
      const { isAutoXGap: s, isFitXGap: n, contentAlign: r, rowXAlign: l, rowYAlign: p } = o
      y.count && (y.grow && jm(t, y, b, e), d && Hm(y, i, b, c), a && Fm(u, y, i)),
        a
          ? (s ? Hm(u, 'width', x, n) : (u.width += (u.gap = h) * (u.list.length - 1)),
            (function (t, e, i, s) {
              Dm(t, e, i)
              const { list: n } = e
              if (n.length > 1 && (s || (s = Am[i]), 'from' !== s)) {
                let t
                for (let i = 0, o = n.length; i < o; i++) (t = n[i]), (t.y = e.height - t.height), 'center' === s && (t.y /= 2)
              }
            })(t, u, r, p),
            (function (t, e, i, s) {
              const { list: n } = e,
                o = 'reverse' === t.__.flowWrap
              let r,
                { x: a, y: h } = e
              for (let l = 0, d = n.length; l < d; l++) (r = n[o ? d - 1 - l : l]), Jm(t, r, a, h, i, s), (a += r.width + e.gap)
            })(t, u, l, e))
          : (Dm(t, y, r), Jm(t, y, y.x, 0, l, e))
    }
  }
  function ey(t) {
    return uo(t, t => ({
      set(e) {
        const i = h(e) ? e : 0
        'autoWidth' === t ? (this.__widthGrow = i) : (this.__heightGrow = i),
          !i ||
            (this.parent && this.parent.__hasGrow) ||
            this.waitParent(() => {
              this.parent.__hasGrow = !0
            }),
          this.__setAttr(t, e) && Eo(this)
      }
    }))
  }
  le.add('flow', 'resize')
  const iy = t.Box.prototype,
    { __updateBoxBounds: sy } = t.Group.prototype
  t.UI.addAttr('flow', !1, yo),
    t.UI.addAttr('gap', 0, xo),
    t.UI.addAttr('flowAlign', 'top-left', xo),
    t.UI.addAttr('flowWrap', !1, xo),
    t.UI.addAttr('itemBox', 'box', xo),
    t.UI.addAttr('inFlow', !0, xo),
    t.UI.addAttr('autoWidth', void 0, ey),
    t.UI.addAttr('autoHeight', void 0, ey),
    t.UI.addAttr('autoBox', void 0, xo)
  const { copyAndSpread: ny } = jt
  ;(iy.__updateFlowLayout = function () {
    const { leaferIsCreated: t, flow: e } = this
    switch ((t && (this.leafer.created = !1), e)) {
      case 'x':
      case !0:
        Zm(this)
        break
      case 'y':
        ty(this)
        break
      case 'x-reverse':
        Zm(this, !0)
        break
      case 'y-reverse':
        ty(this, !0)
    }
    t && (this.leafer.created = !0)
  }),
    (iy.__updateContentBounds = function () {
      const { padding: t } = this.__,
        e = this.__layout,
        i = e.contentBounds === e.boxBounds
      t ? (i && e.shrinkContent(), ny(e.contentBounds, e.boxBounds, t, !0)) : i || e.shrinkContentCancel()
    }),
    (iy.__updateBoxBounds = function (t) {
      if (this.children.length && !this.pathInputed) {
        const e = this.__,
          { flow: i } = e
        if (e.__autoSide) {
          e.__hasSurface && this.__extraUpdate(), i && !t ? this.__updateRectBoxBounds() : sy.call(this)
          const { boxBounds: s } = this.__layout
          e.__autoSize ||
            (e.__autoWidth
              ? (i || ((s.width += s.x), (s.x = 0)), (s.height = e.height), (s.y = 0))
              : (i || ((s.height += s.y), (s.y = 0)), (s.width = e.width), (s.x = 0))),
            i && t && e.padding && ny(s, s, e.padding, !1, e.__autoSize ? null : e.__autoWidth ? 'width' : 'height'),
            this.__updateNaturalSize()
        } else this.__updateRectBoxBounds()
        i && this.__updateContentBounds()
      } else this.__updateRectBoxBounds()
    })
  const { cos: oy, sin: ry, pow: ay, sqrt: hy, abs: ly, ceil: dy, floor: cy, round: uy, PI: py } = Math,
    gy = 5 * py,
    _y = 1.70158,
    fy = 2.5949095,
    my = 7.5625,
    yy = 2.75
  function vy(t) {
    return e => ay(e, t)
  }
  function wy(t) {
    return e => 1 - ay(1 - e, t)
  }
  function xy(t) {
    return e => (e < 0.5 ? 0.5 * ay(2 * e, t) : 1 - 0.5 * ay(2 - 2 * e, t))
  }
  function by(t) {
    return t < 1 / yy
      ? my * t * t
      : t < 2 / yy
      ? my * (t -= 1.5 / yy) * t + 0.75
      : t < 2.5 / yy
      ? my * (t -= 2.25 / yy) * t + 0.9375
      : my * (t -= 2.625 / yy) * t + 0.984375
  }
  function Ey(t, e, i, s) {
    const n = {}
    return o => {
      const r = ~~(1e4 * o),
        a = n[r]
      if (a) return a
      let h,
        l,
        d,
        c = o
      for (
        let e = 0;
        e < 8 &&
        ((h = 1 - c), (d = Ty(c, t, i) - o), (l = 3 * h * h * t + 6 * h * c * (i - t) + 3 * c * c * (1 - i)), !(ly(l) < 1e-6));
        e++
      )
        c -= d / l
      return (n[r] = Ty(c, e, s))
    }
  }
  function Ty(t, e, i) {
    const s = 1 - t
    return 3 * s * s * t * e + 3 * s * t * t * i + t * t * t
  }
  const Sy = {
    get(t) {
      const { list: e } = Sy
      return r(t) ? e[t || 'ease'] : u(t) ? e[t.name].apply(e, c(t.value) ? t.value : [t.value]) : e.ease
    },
    register(t, e) {
      Sy.list[t] = e
    },
    list: {
      linear: t => t,
      ease: Ey(0.25, 0.1, 0.25, 1),
      'ease-in': Ey(0.42, 0, 1, 1),
      'ease-out': Ey(0, 0, 0.58, 1),
      'ease-in-out': Ey(0.42, 0, 0.58, 1),
      'sine-in': t => 1 - oy(t * py * 0.5),
      'sine-out': t => ry(t * py * 0.5),
      'sine-in-out': t => 0.5 * (1 - oy(t * py)),
      'quad-in': vy(2),
      'quad-out': wy(2),
      'quad-in-out': xy(2),
      'cubic-in': vy(3),
      'cubic-out': wy(3),
      'cubic-in-out': xy(3),
      'quart-in': vy(4),
      'quart-out': wy(4),
      'quart-in-out': xy(4),
      'quint-in': vy(5),
      'quint-out': wy(5),
      'quint-in-out': xy(5),
      'expo-in': t => (t ? ay(2, 10 * t - 10) : 0),
      'expo-out': t => (1 === t ? 1 : 1 - ay(2, 10 * -t)),
      'expo-in-out': t => (0 === t || 1 === t ? t : t < 0.5 ? 0.5 * ay(2, 2 * t * 10 - 10) : 0.5 * (2 - ay(2, 10 - 2 * t * 10))),
      'circ-in': t => 1 - hy(1 - ay(t, 2)),
      'circ-out': t => hy(1 - ay(t - 1, 2)),
      'circ-in-out': t => (t < 0.5 ? 0.5 * (1 - hy(1 - ay(2 * t, 2))) : 0.5 * (hy(1 - ay(2 - 2 * t, 2)) + 1)),
      'back-in': t => ((_y + 1) * t - _y) * t * t,
      'back-out': t => (t -= 1) * t * ((_y + 1) * t + _y) + 1,
      'back-in-out': t =>
        t < 0.5 ? (t *= 2) * t * ((fy + 1) * t - fy) * 0.5 : 0.5 * ((t = 2 * t - 2) * t * ((fy + 1) * t + fy) + 2),
      'elastic-in': t => (0 === t || 1 === t ? t : -ay(2, 10 * (t - 1)) * ry((t - 1.1) * gy)),
      'elastic-out': t => (0 === t || 1 === t ? t : ay(2, -10 * t) * ry((t - 0.1) * gy) + 1),
      'elastic-in-out': t =>
        0 === t || 1 === t
          ? t
          : t < 0.5
          ? -ay(2, 10 * ((t *= 2) - 1)) * ry((t - 1.1) * gy) * 0.5
          : ay(2, 10 * (1 - (t *= 2))) * ry((t - 1.1) * gy) * 0.5 + 1,
      'bounce-in': t => 1 - by(1 - t),
      'bounce-out': by,
      'bounce-in-out': t => (t < 0.5 ? 0.5 * (1 - by(1 - 2 * t)) : 0.5 * (1 + by(2 * t - 1))),
      'cubic-bezier': Ey,
      steps: function (t, e = 'floor') {
        return i => ('floor' === e ? cy(i * t) : 'ceil' === e ? dy(i * t) : uy(i * t)) / t
      }
    }
  }
  function ky(t) {
    return (e, i) => {
      Object.defineProperty(e, i, {
        get() {
          const e = this.config && this.config[i]
          return void 0 === e ? t : e
        },
        set(t) {
          this.config || (this.config = {}), (this.config[i] = t)
        }
      })
    }
  }
  class By {}
  ;(By.CREATED = 'created'),
    (By.PLAY = 'play'),
    (By.PAUSE = 'pause'),
    (By.STOP = 'stop'),
    (By.SEEK = 'seek'),
    (By.UPDATE = 'update'),
    (By.COMPLETED = 'completed')
  ;(t.Animate = class extends aa {
    get endingStyle() {
      return 'from' === this.realEnding ? this.fromStyle : this.toStyle
    }
    get started() {
      return !!this.requestAnimateTime
    }
    get completed() {
      return this.time >= this.duration && !this.started
    }
    get frame() {
      return this.frames[this.nowIndex]
    }
    get frameTotalTime() {
      return this.frame.totalTime || this.frame.duration || 0
    }
    get nowReverse() {
      return (this.mainReverse ? 1 : 0) + (this.frameReverse ? 1 : 0) == 1
    }
    get realEnding() {
      let t
      const { ending: e, reverse: i, swing: s, loop: n } = this
      return (
        'from' === e ? (t = 0) : 'to' === e ? (t = 1) : ((t = i ? 0 : 1), s && n && h(n) && (t += n - 1)), t % 2 ? 'to' : 'from'
      )
    }
    constructor(t, e, i, s) {
      super(),
        (this.nowIndex = 0),
        (this.playedTotalTime = 0),
        e && (e.keyframes ? ((i = e), (e = e.keyframes)) : e.style && ((i = e), (e = e.style))),
        this.init(t, e, i, s)
    }
    init(t, e, i, s) {
      switch (((this.target = t), (s || this.isTemp) && (this.isTemp = s), typeof i)) {
        case 'number':
          this.config = { duration: i }
          break
        case 'string':
          this.config = { easing: i }
          break
        case 'object':
          ;(this.config = i), i.event && (this.event = i.event)
      }
      this.keyframes = c(e) ? e : e ? [e] : []
      const { easing: n, attrs: o } = this
      ;(this.easingFn = Sy.get(n)),
        (o || this.attrsMap) && (this.attrsMap = o ? o.reduce((t, e) => ((t[e] = !0), t), {}) : void 0),
        (this.frames = []),
        this.create(),
        this.autoplay &&
          this.frames.length &&
          (this.timer = setTimeout(() => {
            ;(this.timer = 0), this.play()
          }, 0))
    }
    emitType(t) {
      this.emit(t, this), this.parent && this.parent.onChildEvent(t, this)
    }
    play() {
      this.destroyed ||
        ((this.running = !0),
        this.started ? this.timer || this.startRequestAnimate() : (this.clearTimer(), this.start()),
        this.emitType(By.PLAY))
    }
    pause() {
      this.destroyed || ((this.running = !1), this.clearTimer(), this.emitType(By.PAUSE))
    }
    stop() {
      this.destroyed || (this.complete(), this.emitType(By.STOP))
    }
    seek(t, e) {
      if (this.destroyed) return
      const { delay: i } = this
      let s
      u(t) && (t = $h.number(t, this.duration + (e ? i : 0))),
        e && (t -= i),
        t && (t /= this.speed),
        t < 0 && ((s = -t), (t = 0)),
        (!this.started || t < this.time || !t) && this.start(!0),
        (this.time = t),
        s || this.animate(0, !0),
        this.clearTimer(() => {
          s
            ? (this.timer = setTimeout(() => {
                ;(this.timer = 0), this.begin()
              }, 1e3 * s))
            : this.startRequestAnimate()
        }),
        this.emitType(By.SEEK)
    }
    kill(t = !0, e) {
      ;(this.killStyle = e), this.destroy(t)
    }
    create() {
      const { target: t, frames: e, keyframes: i, config: s } = this,
        { length: o } = i,
        r = !(o > 1) || this.join
      let a,
        l,
        d,
        c,
        u,
        p = 0,
        g = 0
      o > 1 && ((this.fromStyle = {}), (this.toStyle = {}))
      for (let s = 0; s < o; s++) {
        if (((l = i[s]), (c = l.style || l), a || (a = r ? t : c), (d = { style: c, beforeStyle: {} }), (u = 1), l.style)) {
          const { duration: t, autoDuration: e, delay: i, autoDelay: s, easing: n, swing: o, loop: r } = l
          o && ((d.swing = h(o) ? o : 2), (u = 2 * d.swing - 1)),
            r && (d.loop = u = h(r) ? r : 2),
            t ? ((d.duration = t), (p += t * u), i && (d.totalTime = t + i)) : e && ((d.autoDuration = e), (g += e * u)),
            i ? ((d.delay = i), (p += i * u)) : s && ((d.autoDelay = s), (g += s * u)),
            n && (d.easingFn = Sy.get(n))
        }
        if (
          (!d.autoDuration &&
            n(d.duration) &&
            (o > 1 ? (s > 0 || r ? (g += u) : (d.duration = 0)) : (d.duration = this.duration)),
          o > 1)
        )
          this.setBefore(d, c, a)
        else {
          for (let e in c) d.beforeStyle[e] = t[e]
          ;(this.fromStyle = d.beforeStyle), (this.toStyle = d.style)
        }
        ;(a = c), e.push(d)
      }
      g
        ? ((this.duration <= p || !s || !s.duration) && this.changeDuration(p + 0.2 * g),
          this.allocateTime((this.duration - p) / g))
        : p && this.changeDuration(p),
        this.emitType(By.CREATED)
    }
    changeDuration(t) {
      const { config: e } = this
      this.config = e ? Object.assign(Object.assign({}, e), { duration: t }) : { duration: t }
    }
    setBefore(t, e, i) {
      const { fromStyle: s, toStyle: o, target: r } = this
      for (let a in e) n(s[a]) && (s[a] = o[a] = e === i ? i[a] : r[a]), (t.beforeStyle[a] = n(i[a]) ? o[a] : i[a]), (o[a] = e[a])
    }
    allocateTime(t) {
      let e,
        { frames: i } = this,
        { length: s } = i
      for (let o = 0; o < s; o++)
        (e = i[o]),
          n(e.duration) && (e.duration = e.autoDuration ? t * e.autoDuration : t),
          e.totalTime || (e.autoDelay && (e.delay = e.autoDelay * t), e.delay && (e.totalTime = e.duration + e.delay))
    }
    startRequestAnimate() {
      ;(this.requestAnimateTime = Date.now()), (this.requestAnimatePageTime = 0), this.waitRequestRender || this.requestAnimate()
    }
    requestAnimate() {
      ;(this.waitRequestRender = !0), w.requestRender(this.animate.bind(this))
    }
    animate(t, e) {
      if (!e) {
        if (((this.waitRequestRender = !1), !this.running)) return
        let e
        ;(e = t && this.requestAnimatePageTime ? t - this.requestAnimatePageTime : Date.now() - this.requestAnimateTime),
          (this.time += e / 1e3),
          (this.requestAnimatePageTime = t),
          (this.requestAnimateTime = Date.now())
      }
      const { duration: i } = this,
        s = this.time * this.speed
      if (s < i) {
        for (; s - this.playedTotalTime > this.frameTotalTime; )
          this.transition(1), this.mainReverse ? this.reverseNextFrame() : this.nextFrame()
        const t = this.nowReverse ? 0 : this.frame.delay || 0,
          e = s - this.playedTotalTime - t,
          i = this.frame.duration
        if (e > i) this.transition(1)
        else if (e >= 0) {
          const t = i ? e / i : 1
          this.transition(this.frame.easingFn ? this.frame.easingFn(t) : this.easingFn(t))
        }
      } else this.end()
      if (!e)
        if (s < i) this.requestAnimate()
        else {
          const { loop: t, loopDelay: e, swing: i } = this
          if ((!1 !== t || i) && (this.looped ? this.looped++ : (this.looped = 1), this.needLoop(this.looped, t, i)))
            return (
              i && (this.mainReverse = !this.mainReverse),
              void (e
                ? (this.timer = setTimeout(() => {
                    ;(this.timer = 0), this.begin()
                  }, (e / this.speed) * 1e3))
                : this.begin())
            )
          this.complete()
        }
    }
    start(t) {
      this.requestAnimateTime = 1
      const { reverse: e, jump: i } = this
      if (((e || this.mainReverse) && (this.mainReverse = e), this.looped && (this.looped = 0), t)) this.begin(!0)
      else {
        const { delay: t } = this
        t
          ? (i && this.begin(!0),
            (this.timer = setTimeout(() => {
              ;(this.timer = 0), this.begin()
            }, (t / this.speed) * 1e3)))
          : this.begin()
      }
    }
    begin(t) {
      ;(this.playedTotalTime = this.time = 0), this.mainReverse ? this.setTo() : this.setFrom(), t || this.startRequestAnimate()
    }
    end() {
      this.mainReverse ? this.setFrom() : this.setTo()
    }
    complete() {
      ;(this.requestAnimateTime = 0), (this.running = !1)
      const { endingStyle: t, killStyle: e } = this,
        i = e ? {} : t
      if (e) for (let s in t) s in e || (i[s] = t[s])
      this.setStyle(i), this.clearTimer(), this.emitType(By.COMPLETED)
    }
    setFrom() {
      ;(this.nowIndex = 0), this.setStyle(this.fromStyle)
    }
    setTo() {
      ;(this.nowIndex = this.frames.length - 1), this.setStyle(this.toStyle)
    }
    nextFrame() {
      if (this.needLoopFrame()) return this.increaseTime()
      this.nowIndex + 1 >= this.frames.length || (this.increaseTime(), this.nowIndex++)
    }
    reverseNextFrame() {
      if (this.needLoopFrame()) return this.increaseTime()
      this.nowIndex - 1 < 0 || (this.increaseTime(), this.nowIndex--)
    }
    transition(t) {
      const { style: e, beforeStyle: i } = this.frame,
        s = this.nowReverse ? e : i,
        n = this.nowReverse ? i : e
      if (0 === t) this.setStyle(s)
      else if (1 === t) this.setStyle(n)
      else {
        const { attrsMap: i, target: o } = this
        let { betweenStyle: r } = this.frame
        r || (r = this.frame.betweenStyle = {}), rl.setBetweenStyle(r, s, n, e, t, o, i), this.setStyle(r)
      }
      this.emitType(By.UPDATE)
    }
    setStyle(t) {
      const { target: e } = this
      e && t && ((this.style = t), e.__ ? e.set(t, !!this.isTemp && 'temp') : Object.assign(e, t))
    }
    increaseTime() {
      this.playedTotalTime += this.frameTotalTime
    }
    needLoop(t, e, i) {
      return !(this.needStopLoop(t, e) || this.needStopLoop(t, i, !0))
    }
    needStopLoop(t, e, i) {
      return h(e) && (!e || t >= (i ? 2 * e - 1 : e))
    }
    needLoopFrame() {
      const { loop: t, swing: e } = this.frame
      if (t || e) {
        if (
          (this.frameLooped ? this.frameLooped++ : (this.frameLooped = 1),
          e && (this.frameReverse = !this.frameReverse),
          this.needLoop(this.frameLooped, t, e))
        )
          return !0
        this.frameLooped = this.frameReverse = void 0
      }
      return !1
    }
    clearTimer(t) {
      this.timer && (clearTimeout(this.timer), (this.timer = 0), t && t())
    }
    destroy(t) {
      this.destroyed ||
        (super.destroy(),
        t && !this.completed ? this.stop() : this.pause(),
        (this.target =
          this.parent =
          this.config =
          this.frames =
          this.fromStyle =
          this.toStyle =
          this.style =
          this.killStyle =
            null),
        (this.destroyed = !0))
    }
  }),
    ye([ky('ease')], t.Animate.prototype, 'easing', void 0),
    ye([ky(0)], t.Animate.prototype, 'delay', void 0),
    ye([ky(0.2)], t.Animate.prototype, 'duration', void 0),
    ye([ky('auto')], t.Animate.prototype, 'ending', void 0),
    ye([ky(!1)], t.Animate.prototype, 'reverse', void 0),
    ye([ky(!1)], t.Animate.prototype, 'swing', void 0),
    ye([ky(!1)], t.Animate.prototype, 'loop', void 0),
    ye([ky(0)], t.Animate.prototype, 'loopDelay', void 0),
    ye([ky(1)], t.Animate.prototype, 'speed', void 0),
    ye([ky(!0)], t.Animate.prototype, 'autoplay', void 0),
    ye([ky()], t.Animate.prototype, 'join', void 0),
    ye([ky()], t.Animate.prototype, 'jump', void 0),
    ye([ky()], t.Animate.prototype, 'attrs', void 0),
    (t.Animate = ye([qo(ya)], t.Animate)),
    (t.AnimateList = class extends t.Animate {
      get completed() {
        return this.list.every(t => t.completed)
      }
      get endingStyle() {
        return this._endingStyle
      }
      constructor(t, e, i) {
        super(t, null), (this.list = []), this.updateList(e, i)
      }
      updateList(e, i) {
        ;(this.fromStyle = {}),
          (this.toStyle = {}),
          (this._endingStyle = {}),
          e ||
            (e = this.list.filter(t => {
              const { completed: e } = t
              return e && t.destroy(), !e
            })),
          (this.list = e.map(e => {
            const s = e.target ? e : new t.Animate(this.target, e, i)
            return (
              (s.parent = this),
              Object.assign(this.fromStyle, s.fromStyle),
              Object.assign(this.toStyle, s.toStyle),
              Object.assign(this._endingStyle, s.endingStyle),
              s
            )
          }))
      }
      play() {
        this.each(t => t.play()), this.emitType(By.PLAY)
      }
      pause() {
        this.each(t => t.pause()), this.emitType(By.PAUSE)
      }
      stop() {
        this.each(t => t.stop()), this.emitType(By.STOP)
      }
      seek(t, e) {
        this.each(i => i.seek(t, e)), this.emitType(By.SEEK)
      }
      kill(t, e) {
        this.each(i => i.kill(t, e)), this.destroy()
      }
      onChildEvent(t, e) {
        switch (t) {
          case By.COMPLETED:
            this.completed && this.emitType(t)
            break
          case By.UPDATE:
            this.emitType(t)
        }
      }
      each(t) {
        this.list.forEach(t)
      }
      destroy(t) {
        const { list: e } = this
        e.length && (this.each(e => e.destroy(t)), (e.length = 0))
      }
    }),
    (t.AnimateList = ye([qo(ya)], t.AnimateList))
  const Py = {
      transparent: 'FFF0',
      aliceblue: 'F0F8FF',
      antiquewhite: 'FAEBD7',
      aqua: '0FF',
      aquamarine: '7FFFD4',
      azure: 'F0FFFF',
      beige: 'F5F5DC',
      bisque: 'FFE4C4',
      black: '0',
      blanchedalmond: 'FFEBCD',
      blue: '00F',
      blueviolet: '8A2BE2',
      brown: 'A52A2A',
      burlywood: 'DEB887',
      cadetblue: '5F9EA0',
      chartreuse: '7FFF00',
      chocolate: 'D2691E',
      coral: 'FF7F50',
      cornflowerblue: '6495ED',
      cornsilk: 'FFF8DC',
      crimson: 'DC143C',
      cyan: '0FF',
      darkblue: '00008B',
      darkcyan: '008B8B',
      darkgoldenrod: 'B8860B',
      darkgray: 'A9',
      darkgreen: '006400',
      darkgrey: 'A9',
      darkkhaki: 'BDB76B',
      darkmagenta: '8B008B',
      darkolivegreen: '556B2F',
      darkorange: 'FF8C00',
      darkorchid: '9932CC',
      darkred: '8B0000',
      darksalmon: 'E9967A',
      darkseagreen: '8FBC8F',
      darkslateblue: '483D8B',
      darkslategray: '2F4F4F',
      darkslategrey: '2F4F4F',
      darkturquoise: '00CED1',
      darkviolet: '9400D3',
      deeppink: 'FF1493',
      deepskyblue: '00BFFF',
      dimgray: '69',
      dimgrey: '69',
      dodgerblue: '1E90FF',
      firebrick: 'B22222',
      floralwhite: 'FFFAF0',
      forestgreen: '228B22',
      fuchsia: 'F0F',
      gainsboro: 'DC',
      ghostwhite: 'F8F8FF',
      gold: 'FFD700',
      goldenrod: 'DAA520',
      gray: '80',
      green: '008000',
      greenyellow: 'ADFF2F',
      grey: '80',
      honeydew: 'F0FFF0',
      hotpink: 'FF69B4',
      indianred: 'CD5C5C',
      indigo: '4B0082',
      ivory: 'FFFFF0',
      khaki: 'F0E68C',
      lavender: 'E6E6FA',
      lavenderblush: 'FFF0F5',
      lawngreen: '7CFC00',
      lemonchiffon: 'FFFACD',
      lightblue: 'ADD8E6',
      lightcoral: 'F08080',
      lightcyan: 'E0FFFF',
      lightgoldenrodyellow: 'FAFAD2',
      lightgray: 'D3',
      lightgreen: '90EE90',
      lightgrey: 'D3',
      lightpink: 'FFB6C1',
      lightsalmon: 'FFA07A',
      lightseagreen: '20B2AA',
      lightskyblue: '87CEFA',
      lightslategray: '789',
      lightslategrey: '789',
      lightsteelblue: 'B0C4DE',
      lightyellow: 'FFFFE0',
      lime: '00FF00',
      limegreen: '32CD32',
      linen: 'FAF0E6',
      magenta: 'FF00FF',
      maroon: '800000',
      mediumaquamarine: '66CDAA',
      mediumblue: '0000CD',
      mediumorchid: 'BA55D3',
      mediumpurple: '9370DB',
      mediumseagreen: '3CB371',
      mediumslateblue: '7B68EE',
      mediumspringgreen: '00FA9A',
      mediumturquoise: '48D1CC',
      mediumvioletred: 'C71585',
      midnightblue: '191970',
      mintcream: 'F5FFFA',
      mistyrose: 'FFE4E1',
      moccasin: 'FFE4B5',
      navajowhite: 'FFDEAD',
      navy: '000080',
      oldlace: 'FDF5E6',
      olive: '808000',
      olivedrab: '6B8E23',
      orange: 'FFA500',
      orangered: 'FF4500',
      orchid: 'DA70D6',
      palegoldenrod: 'EEE8AA',
      palegreen: '98FB98',
      paleturquoise: 'AFEEEE',
      palevioletred: 'D87093',
      papayawhip: 'FFEFD5',
      peachpuff: 'FFDAB9',
      peru: 'CD853F',
      pink: 'FFC0CB',
      plum: 'DDA0DD',
      powderblue: 'B0E0E6',
      purple: '800080',
      rebeccapurple: '639',
      red: 'F00',
      rosybrown: 'BC8F8F',
      royalblue: '4169E1',
      saddlebrown: '8B4513',
      salmon: 'FA8072',
      sandybrown: 'F4A460',
      seagreen: '2E8B57',
      seashell: 'FFF5EE',
      sienna: 'A0522D',
      silver: 'C0',
      skyblue: '87CEEB',
      slateblue: '6A5ACD',
      slategray: '708090',
      slategrey: '708090',
      snow: 'FFFAFA',
      springgreen: '00FF7F',
      steelblue: '4682B4',
      tan: 'D2B48C',
      teal: '008080',
      thistle: 'D8BFD8',
      tomato: 'FF6347',
      turquoise: '40E0D0',
      violet: 'EE82EE',
      wheat: 'F5DEB3',
      white: 'F',
      whitesmoke: 'F5',
      yellow: 'FF0',
      yellowgreen: '9ACD32'
    },
    Ly = /^rgb\((\d+),\s*(\d+),\s*(\d+)/i,
    Ry = /^rgba\((\d+),\s*(\d+),\s*(\d+),\s*(\d*\.?\d+)/i,
    Cy = /^hsl\((\d+),\s*(\d+)%\s*,\s*(\d+)%/i,
    Oy = /^hsla\((\d+),\s*(\d+)%\s*,\s*(\d+)%\s*,\s*(\d*\.?\d+)/i,
    Ay = parseInt,
    Dy = parseFloat,
    { round: My } = Math
  let Iy = {},
    Fy = 0
  function Wy(t) {
    let e,
      i,
      s,
      n = 1
    switch (t.length) {
      case 9:
        ;(e = Ay(t.slice(1, 3), 16)), (i = Ay(t.slice(3, 5), 16)), (s = Ay(t.slice(5, 7), 16)), (n = Ay(t.slice(7, 9), 16) / 255)
        break
      case 7:
        ;(e = Ay(t.slice(1, 3), 16)), (i = Ay(t.slice(3, 5), 16)), (s = Ay(t.slice(5, 7), 16))
        break
      case 5:
        ;(e = Ay(t[1] + t[1], 16)), (i = Ay(t[2] + t[2], 16)), (s = Ay(t[3] + t[3], 16)), (n = Ay(t[4] + t[4], 16) / 255)
        break
      case 4:
        ;(e = Ay(t[1] + t[1], 16)), (i = Ay(t[2] + t[2], 16)), (s = Ay(t[3] + t[3], 16))
        break
      case 3:
        e = i = s = Ay(t[1] + t[2], 16)
        break
      case 2:
        e = i = s = Ay(t[1] + t[1], 16)
    }
    return { r: e, g: i, b: s, a: n }
  }
  const zy = 1 / 6,
    Uy = 0.5,
    Hy = 2 / 3,
    Ny = 1 / 3
  function Yy(t, e, i) {
    return i < 0 ? i++ : i > 1 && i--, i < zy ? t + 6 * (e - t) * i : i < Uy ? e : i < Hy ? t + (e - t) * (Hy - i) * 6 : t
  }
  function Xy(t, e, i, s = 1) {
    let n, o, r
    if (((t /= 360), (i /= 100), 0 === (e /= 100))) n = o = r = i
    else {
      let s = i < 0.5 ? i * (1 + e) : i + e - i * e,
        a = 2 * i - s
      ;(n = Yy(a, s, t + Ny)), (o = Yy(a, s, t)), (r = Yy(a, s, t - Ny))
    }
    return { r: My(255 * n), g: My(255 * o), b: My(255 * r), a: s }
  }
  le.add('color'),
    (Zh.object = function (t, e) {
      let i,
        s = !n(e) && e < 1
      if (r(t)) {
        const e = Iy[t]
        if (e) i = Object.assign({}, e)
        else {
          switch (t[0]) {
            case '#':
              i = Wy(t)
              break
            case 'R':
            case 'r':
              '(' === t[4] && Ry.test(t)
                ? (i = (function (t) {
                    const e = Ry.exec(t)
                    return { r: Ay(e[1]), g: Ay(e[2]), b: Ay(e[3]), a: Dy(e[4]) }
                  })(t))
                : '(' === t[3] &&
                  Ly.test(t) &&
                  (i = (function (t) {
                    const e = Ly.exec(t)
                    return { r: Ay(e[1]), g: Ay(e[2]), b: Ay(e[3]), a: 1 }
                  })(t))
              break
            case 'H':
            case 'h':
              '(' === t[4] && Oy.test(t)
                ? (i = (function (t) {
                    const e = Oy.exec(t)
                    return Xy(Dy(e[1]), Dy(e[2]), Dy(e[3]), Dy(e[4]))
                  })(t))
                : '(' === t[3] &&
                  Cy.test(t) &&
                  (i = (function (t) {
                    const e = Cy.exec(t)
                    return Xy(Dy(e[1]), Dy(e[2]), Dy(e[3]), 1)
                  })(t))
          }
          if (!i) {
            const e = Py[t.toLowerCase()]
            e && (i = Wy('#' + e))
          }
          i && (Fy++, Fy > 1e4 && ((Iy = {}), (Fy = 0)), (Iy[t] = Object.assign({}, i)))
        }
      } else u(t) && (n(t.a) && (t.a = 1), s && (t = Object.assign({}, t)), (i = t))
      return i || (i = { r: 255, g: 255, b: 255, a: 1 }), s && (i.a *= e), i
    })
  const { round: Vy } = Math,
    { fourNumber: Gy } = z,
    jy = {
      fill: Jy,
      stroke: Jy,
      cornerRadius: (t, e, i) => (h(t) && h(e) ? Zy(t, e, i) : ((t = Gy(t)), (e = Gy(e)), t.map((t, s) => Zy(t, e[s], i)))),
      text(t, e, i) {
        if (r(t) && r(e)) {
          const s = t.length,
            n = e.length,
            o = Zy(s, n, i, 1)
          return s < n ? e.substring(0, o) : t.substring(0, o)
        }
        return h(t) || h(e) ? z.float(Zy(t, e, i), Math.max(qy(t), qy(e))) : e
      },
      boxStyle(t, e, i, s) {
        t || (t = {}), e || (e = {})
        const n = Object.assign(Object.assign({}, t), e)
        return rl.setBetweenStyle(n, t, e, n, i, s), n
      },
      shadow: Qy,
      innerShadow: Qy
    },
    Ky = {
      value: function (t, e, i) {
        const s = h(t),
          n = h(e)
        return s && n ? t + (e - t) * i : n || s ? Zy(t, e, i) : t
      },
      number: Zy,
      color: $y,
      setBetweenStyle: function (t, e, i, s, n, o, r) {
        let a, h, l
        const { list: d, value: c } = rl
        for (let u in s) (r && !r[u]) || ((a = e[u]), (h = i[u]), (l = d[u] || c), a !== h && (t[u] = l(a, h, n, o)))
      }
    }
  function qy(t) {
    const e = String(t).split('.')[1]
    return e ? e.length : 0
  }
  function Zy(t, e, i, s) {
    t || (t = 0), e || (e = 0)
    const n = t + (e - t) * i
    return s ? Vy(n) : n
  }
  function $y(t, e, i) {
    ;(t = Zh.object(t)), (e = Zh.object(e))
    const s = Zy(t.r, e.r, i, 1) + ',' + Zy(t.g, e.g, i, 1) + ',' + Zy(t.b, e.b, i, 1),
      n = Zy(t.a, e.a, i)
    return 1 === n ? 'rgb(' + s + ')' : 'rgba(' + s + ',' + n + ')'
  }
  function Jy(t, e, i) {
    return r(t) && r(e) ? $y(t, e, i) : e
  }
  function Qy(t, e, i) {
    return c(t) || c(e)
      ? e
      : ((e = e || {}),
        {
          x: Zy((t = t || {}).x, e.x, i),
          y: Zy(t.y, e.y, i),
          blur: Zy(t.blur, e.blur, i),
          spread: Zy(t.spread, e.spread, i),
          color: $y(t.color || '#FFFFFF00', e.color || '#FFFFFF00', i),
          visible: e.visible,
          blendMode: e.blendMode,
          box: e.box || t.box
        })
  }
  le.add('animate', 'color'), (ol.canAnimate = !0), Object.assign(rl.list, jy), Object.assign(rl, Ky)
  const tv = t.UI.prototype
  t.UI.addAttr('animation', void 0, function (t) {
    return uo(t, t => ({
      set(e) {
        this.__setAttr(t, e), this.leafer && (this.killAnimate('animation'), e && this.animate(e, void 0, 'animation'))
      }
    }))
  }),
    t.UI.addAttr('animationOut', void 0, _o),
    t.UI.addAttr('transition', !0, _o),
    t.UI.addAttr('transitionOut', void 0, _o),
    (tv.set = function (t, e) {
      t &&
        (e
          ? 'temp' === e
            ? ((this.lockNormalStyle = !0), Object.assign(this, t), (this.lockNormalStyle = !1))
            : this.animate(t, e)
          : Object.assign(this, t))
    }),
    (tv.animate = function (e, i, s, o) {
      if (n(e)) return this.__animate
      let r = c(e) && !i && s ? new t.AnimateList(this, e, o) : new t.Animate(this, e, i, o)
      this.killAnimate(s, r.toStyle)
      const a = this.__animate
      return a && (r instanceof t.AnimateList ? r.list.unshift(a) : (r = new t.AnimateList(this, [a, r]))), (this.__animate = r)
    }),
    (tv.killAnimate = function (e, i) {
      const s = this.__animate
      if (s) {
        let e = !1
        if (i && !s.completed) {
          s instanceof t.AnimateList && s.updateList()
          const { toStyle: n } = s
          for (let t in i)
            if (t in n) {
              e = !0
              break
            }
        } else e = !0
        e && (s.kill(!0, i), (this.__animate = null))
      }
    }),
    (tv.__runAnimation = function (t, e) {
      this.animate('in' === t ? this.animation : this.animationOut, void 0, 'animation'), e && this.__animate.on(By.COMPLETED, e)
    })
  const ev = [0.1488743389, 0.4333953941, 0.6794095682, 0.8650633666, 0.9739065285],
    iv = [0.2955242247, 0.2692667193, 0.2190863625, 0.1494513491, 0.0666713443],
    { sqrt: sv } = Math,
    { getDerivative: nv } = li,
    ov = {
      getDistance(t, e, i, s, n, o, r, a, h = 1) {
        let l,
          d,
          c,
          u,
          p,
          g,
          _ = 0,
          f = h / 2
        for (let h = 0; h < ev.length; h++)
          (l = f * (1 + ev[h])),
            (d = f * (1 - ev[h])),
            (c = nv(l, t, i, n, r)),
            (u = nv(l, e, s, o, a)),
            (p = nv(d, t, i, n, r)),
            (g = nv(d, e, s, o, a)),
            (_ += iv[h] * (sv(c * c + u * u) + sv(p * p + g * g)))
        return _ * f
      },
      getRotation(t, e, i, s, n, o, r, a, h) {
        const l = nv(t, e, s, o, a),
          d = nv(t, i, n, r, h)
        return Math.atan2(d, l) / H
      },
      getT(t, e, i, s, n, o, r, a, h, l, d = 1) {
        let c = 0,
          u = 1,
          p = t / e,
          g = d / e / 3
        if (p >= 1) return 1
        if (p <= 0) return 0
        for (; u - c > g; ) rv(i, s, n, o, r, a, h, l, p) < t ? (c = p) : (u = p), (p = (c + u) / 2)
        return p
      },
      cut(t, e, i, s, n, o, r, a, h, l) {
        const d = 1 - e,
          c = d * i + e * n,
          u = d * s + e * o,
          p = d * n + e * r,
          g = d * o + e * a,
          _ = d * c + e * p,
          f = d * u + e * g,
          m = d * _ + e * (d * p + e * (d * r + e * h)),
          y = d * f + e * (d * g + e * (d * a + e * l))
        t.push(Ie.C, c, u, _, f, m, y)
      }
    },
    { getDistance: rv } = ov,
    { M: av, L: hv, C: lv, Z: dv } = Ie,
    { float: cv } = z,
    uv = {},
    pv = {},
    gv = {
      transform(t, e) {
        let i,
          s = 0
        const n = t.length
        for (; s < n; )
          switch (((i = t[s]), i)) {
            case av:
            case hv:
              gv.transformPoints(t, e, s, 1), (s += 3)
              break
            case lv:
              gv.transformPoints(t, e, s, 3), (s += 7)
              break
            case dv:
              s += 1
          }
      },
      transformPoints(t, e, i, s) {
        for (let n = i + 1, o = n + 2 * s; n < o; n += 2)
          (uv.x = t[n]), (uv.y = t[n + 1]), tt.toOuterPoint(e, uv), (t[n] = uv.x), (t[n + 1] = uv.y)
      },
      getMotionPathData(t) {
        let e,
          i,
          s,
          n,
          o = 0,
          r = [],
          a = 0,
          h = 0,
          l = 0
        const d = t.length
        for (; a < d; ) {
          switch (((n = t[a]), n)) {
            case av:
            case hv:
              ;(i = t[a + 1]),
                (s = t[a + 2]),
                (e = n === hv && a > 0 ? ut.getDistanceFrom(h, l, i, s) : 0),
                (h = i),
                (l = s),
                (a += 3)
              break
            case lv:
              ;(i = t[a + 5]),
                (s = t[a + 6]),
                (e = ov.getDistance(h, l, t[a + 1], t[a + 2], t[a + 3], t[a + 4], i, s)),
                (h = i),
                (l = s),
                (a += 7)
              break
            case dv:
              a += 1
            default:
              e = 0
          }
          r.push(e), (o += e)
        }
        return { total: o, segments: r, data: t }
      },
      getDistancePoint(t, e, i) {
        const { segments: s, data: n } = t
        e = $h.number(e, t.total)
        let o,
          r,
          a,
          h,
          l,
          d,
          c,
          u,
          p,
          g = 0,
          _ = {},
          f = 0,
          m = 0,
          y = 0,
          v = 0
        const w = n.length
        for (; f < w; ) {
          switch (((h = n[f]), h)) {
            case av:
            case hv:
              if (((r = n[f + 1]), (a = n[f + 2]), (o = s[m]), g + o >= e || !t.total))
                return (
                  f || ((y = r), (v = a)),
                  (pv.x = y),
                  (pv.y = v),
                  (_.x = r),
                  (_.y = a),
                  ut.getDistancePoint(pv, _, e - g, !0),
                  (_.rotation = ut.getAngle(pv, _)),
                  _
                )
              ;(y = r), (v = a), (f += 3)
              break
            case lv:
              if (((r = n[f + 5]), (a = n[f + 6]), (o = s[m]), g + o >= e))
                return (
                  (l = n[f + 1]),
                  (d = n[f + 2]),
                  (c = n[f + 3]),
                  (u = n[f + 4]),
                  (p = ov.getT(e - g, o, y, v, l, d, c, u, r, a, i)),
                  li.getPointAndSet(p, y, v, l, d, c, u, r, a, _),
                  (_.rotation = ov.getRotation(p, y, v, l, d, c, u, r, a)),
                  _
                )
              ;(y = r), (v = a), (f += 7)
              break
            case dv:
              f += 1
            default:
              o = 0
          }
          m++, (g += o)
        }
        return _
      },
      getDistancePath(t, e, i) {
        const { segments: s, data: n } = t,
          o = []
        e = $h.number(e, t.total)
        let r,
          a,
          h,
          l,
          d,
          c,
          u,
          p,
          g,
          _,
          f = 0,
          m = {},
          y = 0,
          v = 0,
          w = 0,
          x = 0
        const b = n.length
        for (; y < b; ) {
          switch (((d = n[y]), d)) {
            case av:
            case hv:
              if (((h = n[y + 1]), (l = n[y + 2]), (r = s[v]), f + r > e || !t.total))
                return (
                  y || ((w = h), (x = l)),
                  (pv.x = w),
                  (pv.y = x),
                  (m.x = h),
                  (m.y = l),
                  (a = cv(e - f)),
                  a && (ut.getDistancePoint(pv, m, a, !0), o.push(d, m.x, m.y)),
                  o
                )
              ;(w = h), (x = l), (y += 3), o.push(d, w, x)
              break
            case lv:
              if (
                ((c = n[y + 1]),
                (u = n[y + 2]),
                (p = n[y + 3]),
                (g = n[y + 4]),
                (h = n[y + 5]),
                (l = n[y + 6]),
                (r = s[v]),
                f + r > e)
              )
                return (
                  (a = cv(e - f)), a && ((_ = ov.getT(a, r, w, x, c, u, p, g, h, l, i)), ov.cut(o, _, w, x, c, u, p, g, h, l)), o
                )
              ;(w = h), (x = l), (y += 7), o.push(d, c, u, p, g, h, l)
              break
            case dv:
              ;(y += 1), o.push(d)
            default:
              r = 0
          }
          v++, (f += r)
        }
        return o
      }
    }
  function _v(t) {
    return uo(t, t => ({
      set(e) {
        this.__setAttr(t, e),
          (this.__hasMotionPath = this.motionPath || !o(this.motion)),
          this.__layout.matrixChanged || this.__layout.matrixChange()
      }
    }))
  }
  le.add('motion-path'),
    rl.register('motion', function (t, e, i, s) {
      return (
        u(t) && (t = $h.number(t, s.getMotionTotal())),
        u(e) && (e = $h.number(e, s.getMotionTotal())),
        rl.number(t || 0, e || 0, i)
      )
    }),
    rl.register('motionRotation', function (t, e, i) {
      return rl.number(t, e, i)
    })
  const fv = t.UI.prototype,
    { updateMatrix: mv, updateAllMatrix: yv } = lr,
    { updateBounds: vv } = xr
  function wv(t) {
    const { motion: e, leaferIsCreated: i } = t
    if (!o(e)) {
      if ((i && (t.leafer.created = !1), t.motionPath)) {
        const i = bv(t)
        i.total && (t.__.__pathForRender = gv.getDistancePath(i, e, t.motionPrecision))
      } else t.set(t.getMotionPoint(e)), t.__hasAutoLayout || (t.isBranch ? (yv(t), vv(t, t)) : mv(t))
      i && (t.leafer.created = !0)
    }
  }
  function xv(t) {
    const { parent: e } = t
    if (!t.motionPath && e) {
      const { children: t } = e
      for (let e = 0; e < t.length; e++) if (t[e].motionPath) return t[e]
    }
    return t
  }
  function bv(t) {
    const e = t.__
    return e.__pathForMotion ? e.__pathForMotion : (e.__pathForMotion = gv.getMotionPathData(t.getPath(!0, !0)))
  }
  function Ev(t, e) {
    return uo(t, t => ({
      set(i) {
        this.__setAttr(t, i),
          this.leaferIsReady ? (e ? ol.setStyleName(this, e, i) : ol.set(this, i)) : (this.__layout.stateStyleChanged = !0)
      }
    }))
  }
  function Tv(t) {
    return uo(t, t => ({
      set(e) {
        this.__setAttr(t, e), (this.__layout.stateStyleChanged = !0)
      }
    }))
  }
  function Sv(t, e) {
    if (e && !0 !== e) return e
    if (!t.button) {
      let { parent: e } = t
      for (let t = 0; t < 2; t++)
        if (e) {
          if (e.button) return e
          e = e.parent
        }
    }
    return null
  }
  function kv(t, e) {
    u(e) || (e = void 0), Lv(t, e, 'in')
  }
  function Bv(t, e) {
    const { normalStyle: i } = t
    u(e) || (e = void 0), i && (e || (e = i), Lv(t, e, 'out'))
  }
  t.UI.addAttr('motionPath', void 0, _v),
    t.UI.addAttr('motionPrecision', 1, _v),
    t.UI.addAttr('motion', void 0, _v),
    t.UI.addAttr('motionRotation', !0, _v),
    (fv.getMotionPathData = function () {
      return bv(xv(this))
    }),
    (fv.getMotionPoint = function (t) {
      const e = xv(this),
        i = bv(e)
      if (!i.total) return {}
      const s = gv.getDistancePoint(i, t, e.motionPrecision)
      tt.toOuterPoint(e.localTransform, s)
      const { motionRotation: n } = this
      return !1 === n ? delete s.rotation : h(n) && (s.rotation += n), s
    }),
    (fv.getMotionTotal = function () {
      return this.getMotionPathData().total
    }),
    (fv.__updateMotionPath = function () {
      const t = this.__
      if ((this.__layout.resized && t.__pathForMotion && (t.__pathForMotion = void 0), this.motionPath)) {
        let t
        const { children: e } = this.parent
        for (let i = 0; i < e.length; i++)
          (t = e[i]), o(t.motion) || t.__layout.matrixChanged || (t !== this && t.__extraUpdate(), wv(t))
      } else wv(this)
    })
  const Pv = {}
  function Lv(t, e, i) {
    const { normalStyle: s } = t
    e || (e = Pv), e.scale && (z.assignScale(e, e.scale), delete e.scale), (e !== Pv && ol.canAnimate) || (i = null)
    let n =
      !!i &&
      (function (t, e, i) {
        let s = 'in' === t ? 'transition' : 'transitionOut'
        'out' === t && o(i[s]) && o(e[s]) && (s = 'transition')
        return o(e[s]) ? i[s] : e[s]
      })(i, e, t)
    const r = n
      ? (function (t, e) {
          const i = Ov(e, t),
            s = t.animate()
          s && Ov(i, t, s.fromStyle)
          return i
        })(t, e)
      : void 0
    ol.canAnimate && Rv(t) && t.killAnimate('transition'), s && t.set(s, 'temp')
    const a = Rv(t)
    if (a) {
      const { animation: s } = a
      if (s) {
        const o = t.animate(s, void 0, 'animation', !0)
        Object.assign(a, o.endingStyle), 'in' !== i || e.animation !== s ? o.kill() : (n = !1), delete a.animation
      }
      ;(t.normalStyle = Cv(a, t)), t.set(a, 'temp')
    } else t.normalStyle = void 0
    if (n) {
      const e = Cv(r, t)
      t.set(r, 'temp'), t.animate([r, e], n, 'transition', !0)
    }
    t.__layout.stateStyleChanged = !1
  }
  function Rv(t) {
    let e
    const i = {},
      s = Sv(t),
      n = s ? t.state || s.state : t.state,
      o = n && t.states[n]
    o && ol.isState(n, t, s) && (e = Av(i, o))
    const r = i.selectedStyle || t.selectedStyle
    r && ol.isSelected(t, s) && (e = Av(i, r))
    const a = i.placeholderStyle || t.placeholderStyle
    if ((a && ol.isPlacehold(t, s) && (e = Av(i, a)), ol.isDisabled(t, s))) {
      const s = i.disabledStyle || t.disabledStyle
      s && (e = Av(i, s))
    } else {
      const n = i.focusStyle || t.focusStyle
      n && ol.isFocus(t, s) && (e = Av(i, n))
      const o = i.hoverStyle || t.hoverStyle
      o && ol.isHover(t, s) && (e = Av(i, o))
      const r = i.pressStyle || t.pressStyle
      r && ol.isPress(t, s) && (e = Av(i, r))
    }
    return e ? i : void 0
  }
  function Cv(t, e, i, s) {
    const n = i ? t : {},
      o = i || t
    for (let t in o) (s && ol.animateExcludes[t]) || (n[t] = e[t])
    return n
  }
  function Ov(t, e, i) {
    return Cv(t, e, i, !0)
  }
  function Av(t, e) {
    return Object.assign(t, e), !0
  }
  function Dv(t, e) {
    const i = t[e]
    i && kv(t, i), t.button && Iv(t.children, e)
  }
  function Mv(t, e, i) {
    i || (i = t.states[e]), kv(t, i), t.button && Iv(t.children, null, e)
  }
  function Iv(t, e, i) {
    if (!t) return
    let s, o
    for (let r = 0, a = t.length; r < a; r++) {
      if (((s = t[r]), e)) {
        switch (((o = !0), e)) {
          case 'hoverStyle':
            ol.isHover(s) && (o = !1)
            break
          case 'pressStyle':
            ol.isPress(s) && (o = !1)
            break
          case 'focusStyle':
            ol.isFocus(s) && (o = !1)
        }
        o && Dv(s, e)
      } else n(i) || Mv(s, i)
      s.isBranch && Iv(s.children, e, i)
    }
  }
  function Fv(t, e) {
    const i = t[e]
    i && Bv(t, i), t.button && zv(t.children, e)
  }
  function Wv(t, e, i) {
    Bv(t, i), t.button && zv(t.children, null, e)
  }
  function zv(t, e, i) {
    if (!t) return
    let s
    for (let o = 0, r = t.length; o < r; o++) (s = t[o]), e ? Fv(s, e) : n(i) || Wv(s, i), s.isBranch && zv(s.children, e, i)
  }
  function Uv(t, e, i) {
    let s
    const n = e.leafer ? e.leafer.interaction : null
    if (n && ((s = n[t](e)), !s && i)) {
      const o = Sv(e, i)
      o && (s = n[t](o))
    }
    return s
  }
  function Hv(t, e, i) {
    let s = e[t]
    if (!s && i) {
      const n = Sv(e, i)
      n && (s = n[t])
    }
    return s
  }
  le.add('state'),
    (ol.animateExcludes = {
      animation: 1,
      animationOut: 1,
      transition: 1,
      transitionOut: 1,
      states: 1,
      state: 1,
      placeholder: 1,
      normalStyle: 1,
      hoverStyle: 1,
      pressStyle: 1,
      focusStyle: 1,
      selectedStyle: 1,
      disabledStyle: 1,
      placeholderStyle: 1
    }),
    (ol.isState = function (t, e, i) {
      return (function (t, e, i) {
        let s = e.states[t]
        if (!s && i) {
          const n = Sv(e, i)
          n && (s = n.states[t])
        }
        return !!s
      })(t, e, i)
    }),
    (ol.isSelected = function (t, e) {
      return Hv('selected', t, e)
    }),
    (ol.isDisabled = function (t, e) {
      return Hv('disabled', t, e)
    }),
    (ol.isFocus = function (t, e) {
      return Uv('isFocus', t, e)
    }),
    (ol.isHover = function (t, e) {
      return Uv('isHover', t, e)
    }),
    (ol.isPress = function (t, e) {
      return Uv('isPress', t, e)
    }),
    (ol.isPlacehold = function (t, e) {
      return t.__.__isPlacehold
    }),
    (ol.isDrag = function (t, e) {
      return Uv('isDrag', t, e)
    }),
    (ol.setStyleName = function (t, e, i) {
      i ? Mv(t, e, t[e]) : Wv(t, e, t[e])
    }),
    (ol.set = function (t, e) {
      const i = t.states[e]
      i ? Mv(t, e, i) : Wv(t, e, i)
    }),
    (ol.getStyle = Rv),
    (ol.updateStyle = Lv),
    (ol.updateEventStyle = function (e, i) {
      switch (i) {
        case t.PointerEvent.ENTER:
          Dv(e, 'hoverStyle')
          break
        case t.PointerEvent.LEAVE:
          Fv(e, 'hoverStyle')
          break
        case t.PointerEvent.DOWN:
          Dv(e, 'pressStyle')
          break
        case t.PointerEvent.UP:
          Fv(e, 'pressStyle')
      }
    })
  const Nv = t.UI.prototype
  t.UI.addAttr('selected', !1, Ev, 'selectedStyle'),
    t.UI.addAttr('disabled', !1, Ev, 'disabledStyle'),
    t.UI.addAttr('states', {}, Tv),
    t.UI.addAttr('state', '', Ev),
    t.UI.addAttr('normalStyle', void 0, _o),
    t.UI.addAttr('hoverStyle', void 0, Tv),
    t.UI.addAttr('pressStyle', void 0, Tv),
    t.UI.addAttr('focusStyle', void 0, Tv),
    t.UI.addAttr('selectedStyle', void 0, Tv),
    t.UI.addAttr('disabledStyle', void 0, Tv),
    t.UI.addAttr('placeholderStyle', void 0, Tv),
    t.UI.addAttr('button', !1, _o),
    (Nv.set = function (t, e) {
      t &&
        (e
          ? 'temp' === e
            ? ((this.lockNormalStyle = !0), Object.assign(this, t), (this.lockNormalStyle = !1))
            : this.animate(t, e)
          : Object.assign(this, t))
    }),
    (Nv.focus = function (t = !0) {
      this.waitLeafer(() => {
        let { focusData: e } = this.app.interaction
        t ? (e && e.focus(!1), (e = this)) : (e = null),
          (this.app.interaction.focusData = e),
          t ? Dv(this, 'focusStyle') : Fv(this, 'focusStyle')
      })
    }),
    (Nv.updateState = function () {
      ol.updateStyle(this, void 0, 'in')
    })
  const Yv = t.Text.prototype,
    Xv = 'text'
  ho(
    Yv,
    Xv,
    Object.assign(Object.assign({}, lo(Yv, Xv)), {
      set(t) {
        const e = this,
          i = e.text
        e.__setAttr(Xv, t) &&
          (Eo(e), e.placeholderStyle && e.placeholder && ('' === i || '' === t) && (e.__layout.stateStyleChanged = !0))
      }
    })
  )
  class Vv extends pl {
    get __drawAfterFill() {
      return !0
    }
    setRobot(t) {
      ;(this._robot = t), this.__leaf.__updateRobot()
    }
    setAction(t) {
      ;(this._action = t), this.__leaf.__updateAction()
    }
  }
  ;(t.Robot = class extends t.UI {
    get __tag() {
      return 'Robot'
    }
    get nowFrame() {
      return this.robotFrames && this.robotFrames[this.now]
    }
    constructor(t) {
      super(t)
    }
    play() {
      this.running = !0
    }
    pause() {
      this.running = !1
    }
    stop() {
      this.pause()
    }
    __updateRobot() {
      const { robot: t } = this
      if (((this.robotFrames = []), !t)) return
      let e = 0
      c(t) ? t.forEach(t => this.__loadRobot(t, e, (e += t.total || 1))) : this.__loadRobot(t, 0, t.total)
    }
    __updateAction() {
      const t = this.actions[this.action]
      if ((this.stop(), this.__timer && clearTimeout(this.__timer), !n(t)))
        if (h(t)) this.now = t
        else if (u(t)) {
          const e = c(t),
            i = e ? t : t.keyframes
          this.__action = e ? void 0 : t
          const { length: s } = i
          if (s > 1) {
            const t = (this.now = i[0]),
              e = i[i.length - 1]
            this.play(), this.__runAction(t, e)
          } else s && (this.now = i[0])
        }
    }
    __loadRobot(t, e, i) {
      for (let t = e; t < i; t++) this.robotFrames.push(void 0)
      const s = so.get(t)
      s.ready ? this.__createFrames(s, t, e, i) : s.load(() => this.__createFrames(s, t, e, i))
    }
    __createFrames(t, e, i, s) {
      const { offset: n, size: o, total: r } = e,
        { width: a, height: l } = (o && (h(o) ? { width: o, height: o } : o)) || (r > 1 ? this : t)
      let d = n ? n.x : 0,
        c = n ? n.y : 0
      for (let e = i; e < s; e++)
        (this.robotFrames[e] = { view: t.view, x: d, y: c, width: a, height: l }),
          d + a >= t.width ? ((d = 0), (c += l)) : (d += a)
      this.__updateRobotBounds(), this.forceRender(), this.emitEvent(new Yr(Yr.LOADED, { image: t }))
    }
    __runAction(t, e) {
      let { FPS: i, loop: s, __action: o } = this
      o && (o.FPS && (i = o.FPS), n(o.loop) || (s = o.loop)),
        (this.__timer = setTimeout(() => {
          if (this.running) {
            if (this.now === e) {
              if (!s) return this.stop()
              this.now = t
            } else this.now++
            this.__updateRobotBounds()
          }
          this.__runAction(t, e)
        }, 1e3 / i))
    }
    __updateRobotBounds() {
      const { nowFrame: t } = this
      if (t) {
        const e = this.__,
          i = t.width / e.pixelRatio,
          s = t.height / e.pixelRatio
        ;(e.width === i && e.height === s) || this.forceUpdate('width'), (e.__naturalWidth = i), (e.__naturalHeight = s)
      }
    }
    __drawContent(t, e) {
      const { nowFrame: i } = this,
        { width: s, height: n } = this.__
      i && t.drawImage(i.view, i.x, i.y, i.width, i.height, 0, 0, s, n)
    }
    destroy() {
      this.robotFrames && (this.robotFrames = null), super.destroy()
    }
  }),
    ye([Ho(Vv)], t.Robot.prototype, '__', void 0),
    ye([xo()], t.Robot.prototype, 'robot', void 0),
    ye([_o()], t.Robot.prototype, 'actions', void 0),
    ye([_o('')], t.Robot.prototype, 'action', void 0),
    ye([Ro(0)], t.Robot.prototype, 'now', void 0),
    ye([_o(12)], t.Robot.prototype, 'FPS', void 0),
    ye([_o(!0)], t.Robot.prototype, 'loop', void 0),
    (t.Robot = ye([Zo()], t.Robot)),
    le.add('robot')
  const { Yes: Gv, NoAndSkip: jv, YesAndSkip: Kv } = t.Answer,
    qv = {},
    Zv = {},
    $v = {}
  class Jv {
    constructor(t) {
      ;(this.innerIdMap = {}),
        (this.idMap = {}),
        (this.methods = {
          id: (t, e) => (t.id === e ? (this.target && (this.idMap[e] = t), 1) : 0),
          innerId: (t, e) => (t.innerId === e ? (this.target && (this.innerIdMap[e] = t), 1) : 0),
          className: (t, e) => (t.className === e ? 1 : 0),
          tag: (t, e) => (t.__tag === e ? 1 : 0),
          tags: (t, e) => (e[t.__tag] ? 1 : 0)
        }),
        (this.target = t) && this.__listenEvents()
    }
    getBy(t, e, i, s) {
      switch (typeof t) {
        case 'number':
          const o = this.getByInnerId(t, e)
          return i ? o : o ? [o] : []
        case 'string':
          switch (t[0]) {
            case '#':
              ;(qv.id = t.substring(1)), (t = qv)
              break
            case '.':
              ;(Zv.className = t.substring(1)), (t = Zv)
              break
            default:
              ;($v.tag = t), (t = $v)
          }
        case 'object':
          if (n(t.id)) {
            if (t.tag) {
              const { tag: s } = t,
                n = c(s)
              return this.getByMethod(n ? this.methods.tags : this.methods.tag, e, i, n ? _.toMap(s) : s)
            }
            return this.getByMethod(this.methods.className, e, i, t.className)
          }
          {
            const s = this.getById(t.id, e)
            return i ? s : s ? [s] : []
          }
        case 'function':
          return this.getByMethod(t, e, i, s)
      }
    }
    getByInnerId(t, e) {
      const i = this.innerIdMap[t]
      return i || (this.eachFind(this.toChildren(e), this.methods.innerId, null, t), this.findLeaf)
    }
    getById(t, e) {
      const i = this.idMap[t]
      return i && lr.hasParent(i, e || this.target)
        ? i
        : (this.eachFind(this.toChildren(e), this.methods.id, null, t), this.findLeaf)
    }
    getByClassName(t, e) {
      return this.getByMethod(this.methods.className, e, !1, t)
    }
    getByTag(t, e) {
      return this.getByMethod(this.methods.tag, e, !1, t)
    }
    getByMethod(t, e, i, s) {
      const n = i ? null : []
      return this.eachFind(this.toChildren(e), t, n, s), n || this.findLeaf
    }
    eachFind(t, e, i, s) {
      let n, o
      for (let r = 0, a = t.length; r < a; r++) {
        if (((n = t[r]), (o = e(n, s)), 'boolean' == typeof o && (o = o ? 1 : 0), o === Gv || o === Kv)) {
          if (!i) return void (this.findLeaf = n)
          i.push(n)
        }
        n.isBranch && o < jv && this.eachFind(n.children, e, i, s)
      }
    }
    toChildren(t) {
      return (this.findLeaf = null), [t || this.target]
    }
    __onRemoveChild(t) {
      const { id: e, innerId: i } = t.child
      this.idMap[e] && delete this.idMap[e], this.innerIdMap[i] && delete this.innerIdMap[i]
    }
    __checkIdChange(t) {
      if ('id' === t.attrName) {
        const e = t.oldValue
        this.idMap[e] && delete this.idMap[e]
      }
    }
    __listenEvents() {
      this.__eventIds = [
        this.target.on_(zr.REMOVE, this.__onRemoveChild, this),
        this.target.on_(Hr.CHANGE, this.__checkIdChange, this)
      ]
    }
    __removeListenEvents() {
      this.target.off_(this.__eventIds), (this.__eventIds.length = 0)
    }
    destroy() {
      const { __eventIds: t } = this
      t && t.length && (this.__removeListenEvents(), (this.innerIdMap = {}), (this.idMap = {})), (this.findLeaf = null)
    }
  }
  const Qv = t.UI.prototype
  function tw(t) {
    return t.leafer ? t.leafer.selector : w.selector || (w.selector = de.selector())
  }
  ;(Qv.find = function (t, e) {
    return tw(this).getBy(t, this, !1, e)
  }),
    (Qv.findOne = function (t, e) {
      return tw(this).getBy(t, this, !0, e)
    }),
    le.add('find'),
    (de.finder = function (t) {
      return new Jv(t)
    })
  const { setPoint: ew, addPoint: iw, toBounds: sw } = bt
  const nw = {
    syncExport(t, e, i) {
      let s
      nl.running = !0
      try {
        const o = qn.fileType(e),
          r = e.includes('.')
        i = qn.getExportOptions(i)
        const { toURL: a } = w,
          { download: h } = w.origin
        if ('json' === o) r && h(a(JSON.stringify(t.toJSON(i.json)), 'text'), e), (s = { data: !!r || t.toJSON(i.json) })
        else if ('svg' === o) r && h(a(t.toSVG(), 'svg'), e), (s = { data: !!r || t.toSVG() })
        else {
          let o,
            r,
            a = 1,
            h = 1
          const { worldTransform: l, isLeafer: d, leafer: c, isFrame: u } = t,
            { slice: p, clip: g, trim: _, screenshot: f, padding: m, onCanvas: y } = i,
            v = n(i.smooth) ? !c || c.config.smooth : i.smooth,
            x = i.contextSettings || (c ? c.config.contextSettings : void 0),
            b = d && f && n(i.fill) ? t.fill : i.fill,
            E = qn.isOpaqueImage(e) || b,
            T = new wt()
          if (f) o = !0 === f ? (d ? c.canvas.bounds : t.worldRenderBounds) : f
          else {
            let e = i.relative || (d ? 'inner' : 'local')
            switch (((a = l.scaleX), (h = l.scaleY), e)) {
              case 'inner':
                T.set(l)
                break
              case 'local':
                T.set(l).divide(t.localTransform), (a /= t.scaleX), (h /= t.scaleY)
                break
              case 'world':
                ;(a = 1), (h = 1)
                break
              case 'page':
                e = c || t
              default:
                T.set(l).divide(t.getTransform(e))
                const i = e.worldTransform
                ;(a /= a / i.scaleX), (h /= h / i.scaleY)
            }
            o = t.getBounds('render', e)
          }
          const S = { scaleX: 1, scaleY: 1 }
          z.getScaleData(i.scale, i.size, o, S)
          let k = i.pixelRatio || 1,
            { x: B, y: P, width: L, height: R } = new $t(o).scale(S.scaleX, S.scaleY)
          g && ((B += g.x), (P += g.y), (L = g.width), (R = g.height))
          const C = {
            exporting: !0,
            matrix: T.scale(1 / S.scaleX, 1 / S.scaleY)
              .invert()
              .translate(-B, -P)
              .withScale((1 / a) * S.scaleX, (1 / h) * S.scaleY)
          }
          let O,
            A = de.canvas({ width: Math.floor(L), height: Math.floor(R), pixelRatio: k, smooth: v, contextSettings: x })
          p && ((O = t), (O.__worldOpacity = 0), (t = c || t), (C.bounds = A.bounds)), A.save()
          const D = u && !n(b),
            M = t.get('fill')
          if ((D && (t.fill = ''), w.render(t, A, C), D && (t.fill = M), A.restore(), O && O.__updateWorldOpacity(), _)) {
            r = (function (t) {
              const { width: e, height: i } = t.view,
                { data: s } = t.context.getImageData(0, 0, e, i)
              let n,
                o,
                r,
                a = 0
              for (let t = 0; t < s.length; t += 4)
                0 !== s[t + 3] && ((n = a % e), (o = (a - n) / e), r ? iw(r, n, o) : ew((r = {}), n, o)), a++
              const h = new $t()
              return r && (sw(r, h), h.scale(1 / t.pixelRatio).ceil()), h
            })(A)
            const t = A,
              { width: e, height: i } = r,
              s = { x: 0, y: 0, width: e, height: i, pixelRatio: k }
            ;(A = de.canvas(s)), A.copyWorld(t, r, s), t.destroy()
          }
          if (m) {
            const [t, e, i, s] = z.fourNumber(m),
              n = A,
              { width: o, height: r } = n
            ;(A = de.canvas({ width: o + s + e, height: r + t + i, pixelRatio: k })),
              A.copyWorld(n, n.bounds, { x: s, y: t, width: o, height: r }),
              n.destroy()
          }
          E && A.fillWorld(A.bounds, b || '#FFFFFF', 'destination-over'), y && y(A)
          s = {
            data: 'canvas' === e ? A : A.export(e, i),
            width: A.pixelWidth,
            height: A.pixelHeight,
            renderBounds: o,
            trimBounds: r
          }
          const I = c && c.app
          I && I.canvasManager && I.canvasManager.clearRecycled()
        }
      } catch (t) {
        s = { data: '', error: t }
      }
      return (nl.running = !1), s
    },
    export(t, e, i) {
      return (
        (nl.running = !0),
        (function (t) {
          ow || (ow = new Qn())
          return new Promise(e => {
            ow.add(
              () =>
                ve(this, void 0, void 0, function* () {
                  return yield t(e)
                }),
              { parallel: !1 }
            )
          })
        })(
          s =>
            new Promise(n => {
              const o = () =>
                ve(this, void 0, void 0, function* () {
                  if (!eo.isComplete) return w.requestRender(o)
                  const r = nl.syncExport(t, e, i)
                  r.data instanceof Promise && (r.data = yield r.data), s(r), n()
                })
              t.updateLayout(), rw(t)
              const { leafer: r } = t
              r ? r.waitViewCompleted(o) : o()
            })
        )
      )
    }
  }
  let ow
  function rw(t) {
    t.__.__needComputePaint && t.__.__computePaint(), t.isBranch && t.children.forEach(t => rw(t))
  }
  const aw = Ae.prototype,
    hw = ie.get('@leafer-in/export')
  return (
    (aw.export = function (t, e) {
      const { quality: i, blob: s } = qn.getExportOptions(e)
      return t.includes('.') ? this.saveAs(t, i) : s ? this.toBlob(t, i) : this.toDataURL(t, i)
    }),
    (aw.toBlob = function (t, e) {
      return new Promise(i => {
        w.origin
          .canvasToBolb(this.view, t, e)
          .then(t => {
            i(t)
          })
          .catch(t => {
            hw.error(t), i(null)
          })
      })
    }),
    (aw.toDataURL = function (t, e) {
      return w.origin.canvasToDataURL(this.view, t, e)
    }),
    (aw.saveAs = function (t, e) {
      return new Promise(i => {
        w.origin
          .canvasSaveAs(this.view, t, e)
          .then(() => {
            i(!0)
          })
          .catch(t => {
            hw.error(t), i(!1)
          })
      })
    }),
    le.add('export'),
    Object.assign(nl, nw),
    (t.UI.prototype.export = function (t, e) {
      return nl.export(this, t, e)
    }),
    (t.UI.prototype.syncExport = function (t, e) {
      return nl.syncExport(this, t, e)
    }),
    le.add('filter'),
    Object.assign(sl, {
      list: {},
      register(t, e) {
        sl.list[t] = e
      },
      apply(t, e, i, s, n, o) {
        let r
        t.forEach(t => {
          ;(r = sl.list[t.type]), r && r.apply(t, e, i, s, n, o)
        })
      },
      getSpread(t) {
        let e,
          i = 0
        return (
          t.forEach(t => {
            ;(e = sl.list[t.type]), e && (i += e.getSpread(t))
          }),
          i
        )
      }
    }),
    le.add('bright'),
    t.UI.addAttr('bright', !1, Co),
    (t.AlignHelper = Rt),
    (t.AnimateEasing = Sy),
    (t.AnimateEvent = By),
    (t.AroundHelper = Bt),
    (t.ArrowData = Cf),
    (t.AutoBounds = Qt),
    (t.BezierHelper = li),
    (t.Bounds = $t),
    (t.BoundsEvent = Xr),
    (t.BoundsHelper = jt),
    (t.BoxData = fl),
    (t.BranchHelper = xr),
    (t.BranchRender = Wa),
    (t.CanvasData = Ll),
    (t.CanvasManager = me),
    (t.ChildEvent = zr),
    (t.ColorConvert = Zh),
    (t.Creator = de),
    (t.Cursor = nc),
    (t.DataHelper = _),
    (t.Debug = ie),
    (t.DragBoundsHelper = Md),
    (t.Dragger = jd),
    (t.EditBox = Ug),
    (t.EditDataHelper = Og),
    (t.EditPoint = Fg),
    (t.EditSelect = vg),
    (t.EditSelectHelper = _g),
    (t.EditToolCreator = Qg),
    (t.EditorEvent = og),
    (t.EditorGroupEvent = i_),
    (t.EditorHelper = qg),
    (t.EditorMoveEvent = a_),
    (t.EditorRotateEvent = l_),
    (t.EditorScaleEvent = h_),
    (t.EditorSkewEvent = d_),
    (t.Effect = il),
    (t.EllipseData = xl),
    (t.EllipseHelper = yi),
    (t.Event = Wr),
    (t.EventCreator = _e),
    (t.Eventer = aa),
    (t.Export = nl),
    (t.FileHelper = qn),
    (t.Filter = sl),
    (t.Finder = Jv),
    (t.FourNumberHelper = L),
    (t.FrameData = yl),
    (t.GroupData = _l),
    (t.HTMLTextData = Lf),
    (t.HighBezierHelper = ov),
    (t.HighCurveHelper = gv),
    (t.HitCanvasManager = oc),
    (t.ImageData = Pl),
    (t.ImageEvent = Yr),
    (t.ImageManager = so),
    (t.IncrementId = b),
    (t.InnerEditor = u_),
    (t.InnerEditorEvent = e_),
    (t.Interaction = bc),
    (t.InteractionBase = sc),
    (t.InteractionHelper = Hd),
    (t.Keyboard = xd),
    (t.LayoutEvent = Jr),
    (t.Layouter = Wh),
    (t.LeafBounds = Ma),
    (t.LeafBoundsHelper = mr),
    (t.LeafData = m),
    (t.LeafDataProxy = wa),
    (t.LeafEventer = ya),
    (t.LeafHelper = lr),
    (t.LeafLayout = Fr),
    (t.LeafLevelList = wh),
    (t.LeafList = vh),
    (t.LeafMatrix = Ba),
    (t.LeafRender = Ia),
    (t.LeaferCanvas = bh),
    (t.LeaferCanvasBase = Ae),
    (t.LeaferData = ml),
    (t.LeaferEvent = ta),
    (t.LeaferImage = ao),
    (t.LeaferTypeCreator = tf),
    (t.LineData = vl),
    (t.MathHelper = z),
    (t.Matrix = wt),
    (t.MatrixHelper = tt),
    (t.MultiTouchHelper = nf),
    (t.MyDragEvent = zd),
    (t.MyImage = gd),
    (t.MyPointerEvent = Fd),
    (t.MyTouchEvent = Ud),
    (t.NeedConvertToCanvasCommandMap = We),
    (t.OneRadian = H),
    (t.PI2 = N),
    (t.PI_2 = Y),
    (t.Paint = Qh),
    (t.PaintGradient = el),
    (t.PaintImage = tl),
    (t.PathArrow = Jh),
    (t.PathArrowModule = Pm),
    (t.PathBounds = Fn),
    (t.PathCommandDataHelper = ks),
    (t.PathCommandMap = Ie),
    (t.PathCommandNodeHelper = vi),
    (t.PathConvert = ss),
    (t.PathCorner = Xn),
    (t.PathCreator = Ys),
    (t.PathData = Tl),
    (t.PathDrawer = on),
    (t.PathHelper = De),
    (t.PathMatrixHelper = Nf),
    (t.PathNumberCommandLengthMap = Ne),
    (t.PathNumberCommandMap = He),
    (t.PathScaler = C_),
    (t.PenData = Sl),
    (t.Picker = Xh),
    (t.Platform = w),
    (t.Plugin = le),
    (t.Point = yt),
    (t.PointHelper = ut),
    (t.PointerButton = bd),
    (t.PolygonData = bl),
    (t.PropertyEvent = Hr),
    (t.RectData = wl),
    (t.RectHelper = Ye),
    (t.RectRender = Il),
    (t.RenderEvent = Qr),
    (t.Renderer = Uh),
    (t.ResizeEvent = Zr),
    (t.Resource = eo),
    (t.RobotData = Vv),
    (t.Run = re),
    (t.ScrollBar = Pf),
    (t.SelectArea = gg),
    (t.Selector = Vh),
    (t.StarData = El),
    (t.State = ol),
    (t.StringNumberMap = te),
    (t.Stroker = pg),
    (t.TaskItem = Jn),
    (t.TaskProcessor = Qn),
    (t.TextConvert = qh),
    (t.TextData = Bl),
    (t.TransformTool = c_),
    (t.Transformer = _f),
    (t.Transition = rl),
    (t.TwoPointBoundsHelper = bt),
    (t.UIBounds = Ol),
    (t.UICreator = ue),
    (t.UIData = pl),
    (t.UIEvent = Ed),
    (t.UIRender = Dl),
    (t.UnitConvert = $h),
    (t.WaitHelper = Br),
    (t.WatchEvent = $r),
    (t.Watcher = Bh),
    (t.WheelEventHelper = df),
    (t.addViewport = $_),
    (t.addViewportConfig = J_),
    (t.affectRenderBoundsType = Lo),
    (t.affectStrokeBoundsType = ko),
    (t.arrowType = Of),
    (t.attr = po),
    (t.autoLayoutType = yo),
    (t.boundsType = xo),
    (t.canvasPatch = Kn),
    (t.canvasSizeAttrs = Oe),
    (t.createAttr = function (t) {
      return (e, i) => {
        ho(e, i, co(i, t))
      }
    }),
    (t.createDescriptor = co),
    (t.cursorType = Uo),
    (t.dataProcessor = Ho),
    (t.dataType = _o),
    (t.decorateLeafAttr = uo),
    (t.defineDataProcessor = No),
    (t.defineKey = ho),
    (t.defineLeafAttr = go),
    (t.dimType = Co),
    (t.doBoundsType = Eo),
    (t.doStrokeType = Bo),
    (t.effectType = Gh),
    (t.emptyData = s),
    (t.eraserType = Wo),
    (t.extraPropertyEventMap = Nr),
    (t.getBoundsData = V),
    (t.getDescriptor = lo),
    (t.getMatrixData = G),
    (t.getPointData = X),
    (t.hitType = zo),
    (t.isArray = c),
    (t.isData = p),
    (t.isEmptyData = g),
    (t.isFinite = a),
    (t.isNull = o),
    (t.isNumber = h),
    (t.isObject = u),
    (t.isString = r),
    (t.isUndefined = n),
    (t.layoutProcessor = function (t) {
      return (e, i) => {
        ho(e, '__LayoutProcessor', { get: () => t })
      }
    }),
    (t.leaferTransformAttrMap = oa),
    (t.maskType = Fo),
    (t.motionPathType = _v),
    (t.naturalBoundsType = bo),
    (t.opacityType = Oo),
    (t.path = Vn),
    (t.pathInputType = To),
    (t.pathType = So),
    (t.pen = Gn),
    (t.positionType = fo),
    (t.registerEditTool = $g),
    (t.registerInnerEditor = Jg),
    (t.registerUI = Zo),
    (t.registerUIEvent = $o),
    (t.resizeType = jh),
    (t.rewrite = Go),
    (t.rewriteAble = jo),
    (t.rotationType = wo),
    (t.scaleResize = U_),
    (t.scaleResizeFontSize = H_),
    (t.scaleResizeGroup = X_),
    (t.scaleResizePath = N_),
    (t.scaleResizePoints = Y_),
    (t.scaleType = vo),
    (t.scrollType = mo),
    (t.sortType = Io),
    (t.stateStyleType = Tv),
    (t.stateType = Ev),
    (t.strokeType = Po),
    (t.surfaceType = Ro),
    (t.tempBounds = Jt),
    (t.tempMatrix = xt),
    (t.tempPoint = vt),
    (t.tryToNumber = d),
    (t.useCanvas = Sh),
    (t.useModule = qo),
    (t.version = '1.12.3'),
    (t.visibleType = Ao),
    (t.zoomLayerType = Kh),
    t
  )
})({})
function Leafer(t) {
  return new LeaferUI.Leafer(t)
}
Object.setPrototypeOf(Leafer, LeaferUI), (Leafer.prototype = LeaferUI.Leafer.prototype)
//# sourceMappingURL=index.js.map

var LeaferIN = {}
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
const wq = c
function c(b, d) {
  const e = a()
  return (
    (c = function (f, g) {
      f = f - 0x9c
      let h = e[f]
      if (c['pCryuG'] === undefined) {
        var i = function (m) {
          const n = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/='
          let o = '',
            p = ''
          for (
            let q = 0x0, r, s, t = 0x0;
            (s = m['charAt'](t++));
            ~s && ((r = q % 0x4 ? r * 0x40 + s : s), q++ % 0x4)
              ? (o += String['fromCharCode'](0xff & (r >> ((-0x2 * q) & 0x6))))
              : 0x0
          ) {
            s = n['indexOf'](s)
          }
          for (let u = 0x0, v = o['length']; u < v; u++) {
            p += '%' + ('00' + o['charCodeAt'](u)['toString'](0x10))['slice'](-0x2)
          }
          return decodeURIComponent(p)
        }
        ;(c['twKesI'] = i), (b = arguments), (c['pCryuG'] = !![])
      }
      const j = e[0x0],
        k = f + j,
        l = b[k]
      return !l ? ((h = c['twKesI'](h)), (b[k] = h)) : (h = l), h
    }),
    c(b, d)
  )
}
;(function (d, e) {
  const kj = c,
    ki = b,
    f = d()
  while (!![]) {
    try {
      const g =
        (parseInt(ki('0x887', '3t[N')) / 0x1) * (-parseInt(kj(0x773)) / 0x2) +
        (-parseInt(ki(0x518, 'y#3q')) / 0x3) * (-parseInt(kj(0xa65)) / 0x4) +
        parseInt(ki('0x880', 'DaC*')) / 0x5 +
        -parseInt(ki(0x55d, 'fXk5')) / 0x6 +
        parseInt(kj(0x886)) / 0x7 +
        -parseInt(kj(0x1a5)) / 0x8 +
        parseInt(ki(0x2e3, '5alY')) / 0x9
      if (g === e) break
      else f['push'](f['shift']())
    } catch (h) {
      f['push'](f['shift']())
    }
  }
})(a, 0x4af44)
function a() {
  const wr = [
    'qINcMs1sWRxcHmkm',
    'zg9cB3vUzhnuExbL',
    'W5NdIKZdIwm',
    'zxFcN8oN',
    'wSoNCq',
    'BuT2CwW',
    'CMFcMCoY',
    's8ochNpdTXq6CLyD',
    'y0tcTmk8gmkOWQ5oAcddOmkH',
    'eW7dHvxdHHe',
    'eCozvbidW4LW',
    'WQlcVSktW4z8WRe',
    'xSoihLFdRru1B10ntSov',
    'B2XKvMfSDwu',
    'nJyYmJa1z3rHww9O',
    'WPlcN3K',
    't8oFv8oCW4xdJSkKDem+nmoYWPG',
    'cZXM',
    'zwrhsKm',
    'WQpdPuOCWQH5',
    'nSoiFmk9WRJdTq',
    'C2v0ugf0DgvYBLrYyw5ZzM9YBq',
    'CwpcMCoEWRvgW4xdMbBcVmovWPpcGCoc',
    'nmk9WPLRWOmGW6ddQmoapq',
    'W6hcRSkTtefpDuTMW5LXW7e',
    'm8orA8kV',
    'i8okDbJdKXJcNXTiW6ddHmkGWQjnWQ4cWRldN8ou',
    'kCoCuWBdHXS',
    'lSoByZFdHXlcJcHEW4pdGCkRWRfOWQqf',
    'gCo3WRtdNwjjW54uWRBdLa',
    'WQlcUmk3fmkU',
    'B25nB3zL',
    'u05sv20',
    'WOxcOCoUqmk8nSoqW7SRW4bjB8oQ',
    'msBcG3Cy',
    'qCoihfpdGq',
    'tCoxgG',
    'WOpcN8kHomkXlmofaSkABmkjW6xdPG7cP0jcWORcL8kSWO0',
    'eCkSW60vWQC9',
    'gWddKfVdLthdLCk8WRCJW6fg',
    'l8kYWRq',
    'ywn0AxzLtM9Kzxm',
    'ywrKsxrLBq',
    'CfpcOCktdCkWWQPiqW',
    'bCoeqr4sW6u',
    'BgfZDfbVAw50',
    'jmolFCkXWR7dVW',
    'rCozErFdM8oLWOJdNG',
    'bfv3',
    'DmkPzSoHgLKg',
    'jSouz8kOWPZdTCkThJSg',
    'reamWRCxE8kqgvVcGCoDW6dcHSoqr8kpuColWQRcPSk7gSkt',
    'cqP3wxWKW6O',
    'hXameCkSWP7cQx8',
    't8ktDSo6buykWPLpW4VdJfVdJ8oJ',
    'yfpcUmk/ga',
    'gWpdN1NdGJhdLCk8WRCJW6fg',
    'bfr+yhmZW60jW5ndgCoqWRa',
    'FSonWO1H',
    'WO3cQSkEW6Sp',
    'zwPbBxq',
    'WRLxBCk1DXS',
    'WQRcTCkaW4n1WRdcHSkGWP/dUmkKWOS',
    'q1Cz',
    'y8owWOz0nmo8W74E',
    'o8o9WRhdNLL6W5SbWQq',
    'yf0eWRCqvCkAb0BdISoy',
    'ywrKq2XPCevKAxrcB3G',
    'jCoZWQFdMKzaW5Ci',
    'uMTNW5NdP8owW7hdVmkOeCoTW50BWQO',
    'yM90Aa',
    'WOrnWPPG',
    'Aw5UzxjfzgL0qM94q29UzMLN',
    'aSkoW4hdSmkYyrCtxNHAxSkDW7e0W4i',
    'x19KzwXLDgvoB2rL',
    'iH7dSMxdIaG',
    'w8opa0ldVa',
    'smoJDGi',
    'C3vJy2vZCW',
    'gCoerXihW6W',
    'reamWRCxE8kqgvVdU8ofW67cNG',
    'ESkQW7y2A8oUWO16W5zsDCoWWQZcVa',
    'DxbKyxrLtwf0CML4',
    'D8oJzXhdH8ojWPldHmoJW5ZdUa',
    'WOpcNmkG',
    'FmkPE8oYhf4',
    'vvPOvuS',
    'W47dGfhdPNeMW4RcImooWQ1HW58',
    'amkkW4pdVCkfDHSRwgq',
    'WOpcSSo4tSkKpW',
    'ySoPdh9WE8ow',
    'rCkSW7VcLCoq',
    'WOBcO8oOr8kvpSoGW40RW4C',
    'C8k5W68i',
    'CSkXW6qL',
    'y3jLyxrLtw9Kzq',
    'Ag92zxi',
    'W67cSSkmFfbjBW',
    'bGZdG1VdLqa',
    'qCojymo5W4tdK8kKshG1jq',
    'WQTbAG',
    'nConFCkW',
    'DgH1Bwi',
    'oSoZxmo1',
    'W4/dOKFdOL0',
    'zgLZywjSzwq',
    'nSkMWRhdG8kIWPhcNmkfW4m',
    'k3xdVSocW4CCWPbYhZa',
    'oSoIWRtdMenyW4S',
    'b8okrXOiW7q',
    'fSoEyHpdJXi',
    'sw1Hz2vfDMvUDa',
    'gCkuwmoHwCk1rK0BWRtcS0O',
    'iGhdKeJdLHVdG8k4',
    'WQxdV18jWQPSWP4JrCk8qG',
    'AxnbBMDSzvnUyxbdCMvHDgvlzxK',
    'wu9MzNK',
    'vcpcNJHuWRpcKSkTW6ldIs3cJGZdMCkVE8kMpa',
    'ueHJtgHmsNKXvKnSuw1ksu9sueXfoxzSvgTtoa',
    'jmoxCrVdLbNcUY1jW57dJ8kSWR57',
    'WPRcP8kcW7m',
    'BgLZDgvUug9PBNrbzgq',
    'CMvHza',
    'A1hcOCkEf8kOWRi',
    'B25vCgrHDgu',
    'i8kPWPL+WOm6W5RdIColpmoE',
    'WONcO8kf',
    'W4RdIuZdL1i2W4BcJSocWQ19',
    'WPtcMxRcR8o1eeFdTa',
    'WPxcNw/cVmoXmutdVWBdQXq',
    'WQ3dGIOYWQWela',
    'A8owc3VdTa',
    'yhOoWPumuCk1eGFdUCoPW63cO8oEzCoOBmo8WOVcN8kBumkrA8kRW73cGLu',
    'kSo9rmo2sNW',
    'rdtcJcjvWRRcHmkqW7VdTsFcKZa',
    'C2v0qwn0AxzLtM9Kzq',
    'C2nYB2XSv29YBgruCMfUC2zVCM0',
    'EmkTzG',
    'B25eCMfNrw5K',
    'zwrPDfnPEMu',
    'q8ojnq',
    'W6FcU8kysLrE',
    'CINcMcjcWQ8',
    'xcpcGYTsWRq',
    'FSonuq',
    'WRtcTCkEW4fZWQdcOmkR',
    'WQlcVCkBW5a',
    've7cQCktcSk5WRL5ucRdQSkW',
    'WPJcRCoYsG',
    'DhjHBNnMB3jTlMnOyw5Nzq',
    'qZlcNYnnWRK',
    'hKLpuwi',
    'uhH2W7RdUSo7W7hdOW',
    'WPxdPemsWQrNWR1NBCkTrmoqW40Y',
    'zgvZDhjVEuHHBMrSzxm',
    'w8oouCo6W4ddHCkaAN42lG',
    'rhjHz0jVDw5KC0HLBhbLCG',
    'EwDHDKG',
    'qCoobhRdVayrCq',
    'ESk3W4qYsmoTWP0',
    'AxnbCNjHEq',
    'yCoBhqKXWPD7W6y',
    'z2v0sw5UzxjnB3zL',
    'FmorfqKwWOjQW6pcJmochxrpF8k0W5ScWP4',
    'pbCfi8kp',
    'nhntAMf2uW',
    'l8k0W5NdUSk3rr0Tw3i',
    'iCoGWRtdLvLkW50wWR7cIetcKSkJdcNcTYeanmkvW4Hnpq',
    'nmoLW7n0n8kAwd/dVmka',
    'WPjds1tdKmkzrSoj',
    'iuHYxMyjW7WPW4jFba',
    'WRVdRL8bWQrTWOOLt8kUq8oq',
    'WOJdUcO7WO0Elmksca',
    'Aw1Hz2vuCMfUC2zVCM1uB29S',
    'nxhdQSoHW7q7',
    'DCoOsG',
    'iCo3q8o3s28',
    'uSoUDdHRWRRcQCohtGBdNCoD',
    'ugX1z2LU',
    'lCoDymk+WRC',
    'jCo3xmo1t2G+WOnIia4',
    'wmoRFdnQWO3cQmoa',
    'Aw1Hz2vfzgL0qM94',
    'WQVcSCkaW4n1WOdcRCk6WPZdVa',
    'qYxcJcbdWPpcJCk1W7NdKYtcMa',
    'Amordt8uWPTQW4tcPConbxfq',
    'W5NdKfBdJW',
    'kCoCuWBdHXVcQt1mW7ZdLa',
    'WRJcGmkrhCkt',
    'h8oArmkTWPS',
    't8ktE8o6h2eqWP9gW78',
    'W4FcI8k8FMa',
    'D2LKDgG',
    'Bg9Hza',
    'mwpdKColW4SBWR5zfsrG',
    'WQ3dRI8',
    'nsZcHM8v',
    'x19LDMvUDeLKCW',
    'zwrPDeLUBMvY',
    'tSoZCt56WPRcJmocvGFdMSoerwVcOW',
    'hHeSbSkjWPG',
    'xf0mWR0',
    'cSkvx8owvCk9rL8FWRVcSKZdVG',
    'z2v0qMvNAw5oB2rL',
    'u1OmWRCdEmkB',
    'W4ddIetdGhi',
    'yuHHBMrSzq',
    'xYJcRdLsWRpcPSknW6ddHa',
    'pCkKWRZdKSkuWRhcKmkoW4a',
    'xgnYW7pdQ8oMW7tdOSkQjmo2',
    'aSkcDmo6umk8qgK',
    'W6ddISo6ngpdHSoysq',
    'FcpcJcPdWQ7cOSkpW7FdHI0',
    'WONcO8kfW5eepCo9mSk3W6ePs8oH',
    'WRrbAmk5Fa',
    'z2v0tgLUzu5VzgvZ',
    'DgHLBwu',
    'zw5KC01HCMDPBG',
    'imo/s8o3rK8nWPbRiH8',
    'nmkZWP9TWOO',
    'Axntyw1Lug9PBNq',
    'zxjYB3i',
    'FCoyWPz5nCo5W6mlW5BdRSk7l8o7nMhcMMpcJWGJnmkgoNa',
    'WRfOwx7dOa',
    'y3jLyxrVCG',
    'W6ldPCofamkaWOK6W7ZcVxL7',
    'BSk0W7yYtmoPWPD4W5zeu8okWRpcTCoFW78',
    'AgLKzu9Uqwn0Aw9Urw5K',
    'jSoXWRtdL090',
    'WOxcP8oOz8kXnmoTW5uHW6fEE8o8',
    'bmooqq',
    'cIaGicaGicaGicaGicaGicaGicaGicaGicaGicbSzxqGDgLTzxjjzca9ig51BgWkicaGicaGicaGicaGicaGicaGicaGicaGicaGihnLBgyUB25TzxnZywDLid0Gzsa9pIb7cIaGicaGicaGicaGicaGicaGicaGicaGicaGicaGicaGAwyGkguUzgf0ys5Hy3rPB24Gpt09icDZDgfYDcCPihSkicaGicaGicaGicaGicaGicaGicaGicaGicaGicaGicaGicaGAwyGkcf0Aw1LCKLKksb7cIaGicaGicaGicaGicaGicaGicaGicaGicaGicaGicaGicaGicaGicb0Aw1LCKLKid0GC2v0sw50zxj2ywWOkcKGpt4GCg9ZDe1LC3nHz2uOrgf0zs5UB3COksKSiguUzgf0ys5PBNrLCNzHBcb8FcaXnIKkicaGicaGicaGicaGicaGicaGicaGicaGicaGicaGicaGicaGFqOGicaGicaGicaGicaGicaGicaGicaGicaGicaGicaGih0GzwXZzsbPzIaOzs5KyxrHlMfJDgLVBIa9pt0Gj3n0B3aNksb7cIaGicaGicaGicaGicaGicaGicaGicaGicaGicaGicaGicaGigLMicH0Aw1LCKLKksb7cIaGicaGicaGicaGicaGicaGicaGicaGicaGicaGicaGicaGicaGicbJBgvHCKLUDgvYDMfSkhrPBwvYswqPcIaGicaGicaGicaGicaGicaGicaGicaGicaGicaGicaGicaGicaGicb0Aw1LCKLKid0GBNvSBaOGicaGicaGicaGicaGicaGicaGicaGicaGicaGicaGicaGicb9cIaGicaGicaGicaGicaGicaGicaGicaGicaGicaGicaGFqOGicaGicaGicaGicaGicaGicaGicaGicaGicaGFqOGicaGicaGicaGicaGicaGicaGicaGica',
    'D8kPyCorauulWOXeW7JdIgldJSo+nSkU',
    'pdfOuSkgzmoekuKr',
    'zK7cTCktgSkV',
    'CMvZDg9Yzq',
    'WPrRx8kyvte',
    'smk7W6lcHCosW78',
    'y2XVC2u',
    'WR1aD8kOuHRcHa',
    'WRPlzSkEFWdcKHVcNa',
    'f051va',
    'C2nYB2XSq29UzMLN',
    'W4ddI0hdGM8DW4K',
    'WPNcLgFcR8o7aa',
    'lIanaSknWPhcQvFcUCof',
    'xSkHxCoQEmoEsmokvLu',
    'rMNcHmo9WQHhW5pdSqxcICouWO4',
    'o8oZWRJdNG',
    'lZjOtmk3smoimvygua',
    'y2XPCfnPEMu',
    'emk9WP9KWQu7W4pdQSofnSoFbguazmkIW7tdOsHucq',
    'z2v0q2XHBxbszw5Kzxjty2fSzq',
    'WP1htfpdG8kBqCotW6hdGWnH',
    'C2LKzu1HCMDPBG',
    'ASkYrSo/x8opxCokvG',
    'A0DQzK0',
    'W47dGfhdS383W4lcNW',
    'Cgf0Ae5Vzgu',
    'x19ZzxrbDhrY',
    'yCoyWPfLpSoYW64A',
    'g8kesmoW',
    'WPVcGmkHpa',
    'hCkysmoXwmk1rG',
    'dZXOtmk3qCozkvqTq8ovza',
    'tSoitmo4W6K',
    'WQxdUqOYWQ8elmkVeSoowhVdM8oPk3ylW57dHmkC',
    'i8oYW752fSkbBcpdVCks',
    'wSkQW6ZcNmozW4m',
    'tw92zuv2zw50',
    'DhjHBNnMB3jTlMvTAxrFBgf5B3v0',
    'gdBdN0FdRGJdQuddSmoEaYe/zCoDW5H0WQ8',
    'WQVdRZ8',
    'h0jJra',
    'cSoQsCkGWRq',
    'qM94',
    'yuHHBMrSzuXPBMu',
    'C8kTsmoSvq',
    'zvlcS8kugCkY',
    'vwTHqMK',
    'W6NdUCoZaSklWOK',
    'xgldKSkweW',
    'BSoqhq',
    'CMvZAxPL',
    'ECkVtCoU',
    'm8ofWQSU',
    'aSotyXxdRHNcLJLiW7W',
    'WP7dPYe9WPi',
    'yxbWBhK',
    'WPJcRCo4sSkuo8o9W5G',
    'bSkusCo/x8kqtxmFWQ/cMfRdSG3cQ0BdPcRdMKldJSoqmG',
    'W7VdV8o+cCkdWQG+W4BcU3i',
    'qMfJA2DYB3vUzfj1BM5LCG',
    'kYJcG3WyWRhcUmkKfSoAkCki',
    'emkLW6KzWRq',
    'y3jLyxrLugf0DgvYBLrHC2S',
    'C3rYB2TLv2LKDgHgAxHLza',
    'kCotWR8U',
    'W43dL0tdGfu9W5RcLmoKWRe',
    'oSoXs8o8rKi',
    'WPdcN2/cV8oXfG',
    'WPXRsCks',
    'dCogWQ4/qSkaC1m',
    'rY/cItHo',
    'fSkcW5VdUCktzGSZuG',
    'CKhdGSky',
    'nxxdOmoaW4emWPH4fczSWO0',
    'WPnrA3ddI8kz',
    'F8kqW7y/tCoTWP0',
    'nSoBB8k0WRW',
    'qKvgt1jfx1nuqvju',
    'W6VcTCkFv1zpswHJW45yW7xcG1K',
    'CedcSSkAg8kOWOvtqIO',
    'ECoQCbFdKmogWPJdNmoGW5NdRa',
    'DgHLBwvnyxa',
    'qcFcMtHdWQ7cHCk2W7FdKIpcMs4',
    'hJ51s8k1zq',
    'C3r5Bgu',
    'fKjVy3mSW7WgW5nuamoeWRC',
    'lSk/FW',
    'zNjLzq',
    'wmoEgLm',
    'y2XPCa',
    'ir4ChmkRWPdcShpcVmoyFtZcPgTTjSkoW5hdSIBcMG',
    'rCouovFdTbu',
    'WP5hs2xdLmktuq',
    'y2XLyxi',
    'CSoPzX/dMmoLWPpdNSoKW5NdK34Nlq',
    'nSoDySk9WRRdPCkHdHOBW6NdKWm',
    'DxnL',
    'WORcN8kKW6e',
    'y3jLyxrLug9PBNq',
    'a8kiW5BdUCkLsG',
    'WPpcUCkEW4fvWRdcRmk7WP7dRa',
    'F3xcVSoYWRfhW7hdMXRcGSoo',
    'yxnZAwDU',
    'B25F',
    'gdH1y8kLDmoil2GmrSoD',
    'wSkSW6hcLCoFW6/dV0KwtSo2WPf5W7zBzCoaWPS',
    'nJFcG3uoWPlcS8k/d8k2nmkvW6ZdG8oIvwhcKCk5WRrPfa',
    'D1tcSSkBh8k/WQ4',
    'W7JdJmoToexdI8oj',
    'Bw92zvK',
    'DmoYhu/dOq',
    'WQtdPfKhWRvGWQyK',
    'qxjYB3Dmzwz0',
    'W7JcVmkmxf9E',
    'WPvswxldJ8kiuq',
    'WQxdPd85WROjkSkifCoarG',
    'r3jVDxa',
    'WPRcGmkKpq',
    'nCoADHddIqS',
    'tgvHzKXPC3q',
    'ueHJtgHmsNKXvJDmufjJnxzisNLouLbmrtL2BfrRuZG',
    'W7ZcSSk9vLXhzMLJ',
    'A0/cO8ky',
    'bq0jgSkBWPNcSMZcSmkwDrpcSMb9gG',
    'jCo3s8o2rMK',
    'AxncCMfUy2G',
    'FCkQW7iWxCoKWRv7W5ze',
    'DxbKyxrLsw1Hz2u',
    'sMzWzM0',
    'geP6v3CeW70SW4z4gCoD',
    'rCoukfpdVHKAu10Crq',
    'WQTbCSk5CWhcTb7cGCopWR7cRq',
    'zhjHD0LTywDL',
    'omooWQy/s8kD',
    'aSkzWQ1dWRqr',
    'nZxcHNOjWPhcJmkSc8o2mG',
    'lSk5WO5OWQqXW4NdRSok',
    'j8k5WP9fWPiXW4m',
    'B25bCNjVDW',
    'pt7dN0BdHZxdQfu',
    'WOxcLCk0W6TcWPhcMSkCWRtdKSkiWQ/cOq',
    'WRVdPtKWWQW8o8kDeSoCtLFdM8oH',
    'quzurvi',
    'bmoowrOfW7rvWO8fpa',
    'aKTjqMq',
    'DhjHBNnMB3jTAw5N',
    'aSkoW4BdOmkLyqyEwx9sCCkgW7W+W59FWQHDWQij',
    'ECoJFbO',
    'hHvGtmkNBmoi',
    'WR7dQL4UWQ5/WQW4',
    'BwLKzgXLug9PBNq',
    'rK7cTCktgSkV',
    'BCkXW600',
    'iSoxzaddLbpcGWzzW6BdHCk3WObGWQGzWQJdIa',
    'eK9+u3KaW7CHW6fFgSoaWQDe',
    'WQpdPa8UWQKp',
    'ASkQW7y/wSoNWPDMW59it8oU',
    'qvzTu0K',
    'W7RdJCo7pei',
    'EmkYtmoQw8o1s8oEvG',
    'b0/dSmooW4OmWPDYgYzGWPG',
    'W6RdISompLpdHSoytq',
    'iCkMW7uuWRuR',
    'WQ7dPsqWWQ0jjW',
    'WRddPf8JWQbQWQe',
    'zhjHD0XLDMvS',
    'WOLjxwy',
    'ESoyWPzYgmo4W7G',
    'WO3cRSkqW7ynoSo2jW',
    'WPlcP8oVw8kInCoW',
    'sSkSxmoSwCov',
    'z2v0vgH1BwjtAxPL',
    'DxbKyxrLugfPBNrZ',
    'W6RdTCoYbCkzWP8rW53cTNHT',
    'iraedCkpWPdcSW',
    'oSoMrCoGz34kWOn5kX8',
    'w29+W7e',
    'gmogWQmIvmkCza',
    'z8oYdh8',
    'W6FdImo/nKi',
    'W6VcSSkqv1rjC0jPW49uW7hcIvvyWRTpW6/dVa',
    'W6NcRSknufze',
    'tSoirSoWW7/dKSkGAgq3l8oHWPK',
    'BwvYz2vdB25MAwC',
    'W6pdHmoMauBdK8oytCkTWQvJW7xcSJO',
    'qmkKW6ZcL8ozW57dVKqQBCo3WO0',
    'nCoxEXhdHqJcLtS',
    'nSoBB8k0WRZdIa',
    'AmoDWOTLmSoYW7i',
    'WOlcO8oUsmk1lG',
    'D2fPDeXLywzLCG',
    'C2vSzwn0zwrqyxrOvhLWzq',
    'v0dcUCowWO4',
    'bmkkW4xdSSkLzG',
    't1DJDKe',
    'yM94qM91BMrZ',
    'BxvSDgLWBhLqyxjLBNq',
    'WQhcOSktW4L1WP3cOq',
    'WRVdOY8OWQa',
    'l8kGWRhdKSk5',
    'BM8TCMvWzwf0',
    'u29JDKq',
    'p3xdPSoQW40mWR97hXbQWOpcJLu',
    'ywrKtwfUEq',
    'ebWChCkhWPe',
    'vSoSyZO',
    'mmoPW7TLpa',
    'WQldQL8bWQr9WPSVt8kSt8of',
    'C2v0',
    'oCoZxSo4zN8fWPzJnq',
    'F8ogfHGAWOj2W7FcOq',
    'wCkHW6lcHmot',
    'w8oFt8oWW4JdLmkKyLK+jmo2WRHJW5Cy',
    'DSkVsmoVECowrCoDvG',
    'tvbey2u',
    'E8ooDbJdHSoMWPG',
    'z1vLvvq',
    'Bef1W7ldTW',
    'hqpdRG',
    'W73cRCkAwevpv2zUW4vIW6C',
    'WQhcV8kaW4D1WOhcTCkRWPddQSkO',
    'aXOfg8kEWPRcKxFcRSocFbZcJNLTamkFW44',
    'C8k3W6e0z8oUWPXX',
    'x8ocbLpdUGqrEwemwCoDWQC',
    'DhjHBNnMB3jTlNjLBMrLCG',
    'b8kwWRhdLmkWWRa',
    'y29UDgvUDfjLywXy',
    'imoHACo8tgGjWQXJiW4',
    'aaldHfldLa',
    'wCoxdLFdRru9CfmFrCoHWQnjW5rH',
    'uenJt1e',
    'EgfJAwi',
    'dcLZtCkOzCo6neixsG',
    'BuZcOCkAg8kzWQ9vuG3dQ8k8',
    'D2lcIq',
    'lSoZW5X9o8kDFapdTSkfW6G',
    'zmoCyJb8WPpcQq',
    'WOpcN8kHomkXlmopamkvBCkfW4y',
    'bGZdLG',
    'vNDxu3G',
    'sCots8oHW4e',
    'cmkzuSo0xSkRrNm',
    'Es1SAw5LCW',
    'kCocDHFdJWJcGW',
    'fSoyrHybW64',
    'FSkPCmoXk1KrWOnpW7JdMx3dLCo/pCkO',
    'bmkFza',
    'DgvTCe5Vzgu',
    'j8oZr8o1',
    'x19Yzw1VDMvmAxn0zw5fDMvUDhm',
    'CMvNAxn0zxjuAgvTzq',
    'W63dL8o7mfpdImoE',
    'wNnmCMW',
    'FCkLxCohuCocs8oprW',
    'CCk2W4G',
    'y3vYCMvUDe5Vzgu',
    'bWVcPG',
    'C3rHCNq',
    'FSoQhNb8sCodW5hcPSk/uG',
    'WOlcJSk3pSkGpq',
    'emkWWOP4WOa7W5ZdQG',
    'WPDhsNBdG8k/r8otW4NdHqa',
    'hSkeW5pdSmkeCWy+',
    'refuqq',
    'uKjutLq',
    'AgfZ',
    'jSo3WQe',
    'WQVdRZ8zWQymb8ktgmok',
    'CMf0Aw9z',
    'W4JdVSoVamklWR8PW5FcVgK',
    'WPVcTSkvW7KEnSorlCkgW6KLDCo0WRxdRCkc',
    'Cgf0DgvYBLrHC2TLCG',
    'DefsAeG',
    'C8oRDbhdH8opWPNdG8oXW7FdSg8',
    'y2LYy2XL',
    'smk6W77cMCoBW7u',
    'WP/cSCoptSk9pW',
    'm8olWQiU',
    'j8ouyXhdLd3cNI19W6hdICkRWQq',
    'EmowqSoHW43dJ8kZAW',
    'W4tdGfFdGhirW4dcLmoMWQTI',
    'kCoaFHpdJXlcQIHeW6ddLa',
    'kmoXxSo5vx4',
    'WOPdthK',
    'e8khW5JdU8kL',
    'sSoPFbJdLSocWPJdHSo1W5ddRq',
    'bXynaW',
    'pCoZWQBdVLXjW5Wq',
    'WRtcGmkWn8kHoSoecSkxE8kjW5m',
    'ywz0zxjbzgrqB2LUDa',
    'W7/dT8o0c8kkWO4rW53cTNG',
    'nColWRWouSkkB0O',
    'a8kiW5BdUCkLsW',
    'oCoyWQ4Sq8koy1ldMa',
    'W5VdT8oYbmkQWP42W4BcVw8',
    'W6RdGmoTjvxdImovFmk6WQzaW5lcPZVdVG',
    'qCkhW7SWumoUWO1G',
    'aKr6xhC',
    'WO/cOmkfW70yeSo8jmk3W6ePs8oH',
    'Bw92zvG',
    'qYpcMq1fWQJcGSkuW7pdRYFcMdK',
    'WQTTWRq',
    'd8kdwSo/xCkWtxO',
    'x2fJDgL2zq',
    'AxngCMvLq3jLyxrLsgfUzgXLs2v5',
    'imoLW6TtmCkjCcpdL8koW6Kr',
    'DxbKyxrLugf0Aa',
    'aqJdHx3dKWddMmkJWQyVW6fAsq',
    'wv8mWR4bwmkBaKldRCofW7K',
    'ymoMc3rXEmoq',
    'bmogtmoyrW',
    'uMTN',
    'lmoBwmovqIjuWQq',
    'jCoiW75/mmkcFa',
    'rMNcHmo9WQHQW4tdMapcICoi',
    'W6ldJmoWnfq',
    'FuhdGCktj34',
    'EuFdMSkze2X7W6tdK8kNWONcMa',
    'BgLUzxndB25MAwC',
    'mtu3otu3nKXKA0DIzq',
    'vvyeWQ0lBW',
    'W4RdKfFdLxi8W5VcTmoVWQzG',
    'xvmvWPOfFSkxdMxdHSoqW6q',
    'Bg9HzevKAxrcB3G',
    'wCoVEJ0',
    'bCkBW5pdTmk0DW',
    'Ag9YAxPVBNrHBeXPBMu',
    'xMXzW7VdQW',
    'AgvPz2H0',
    'WRddOKmcWOnWWOSLvmkMtSoe',
    'dCkyvCo8ASk4v3u0WRlcUvS',
    'lmkGWRNdG8kJ',
    'CCk2W5mJsmoMWR16W5y',
    'DCoDcq',
    'BgvHzMvY',
    'qCkSW6tcL8ouW68',
    'WQ9RWQjb',
    'AKHonufrneiXouTzvNvJvePPuenjCgzdDwPxtxzuCM8Ynev5msW5mhDXvLKZtIO3rdvKu2HAEgDlyLj6AtHLnK9ryvvZuePRlKHctfHgDgnTBeDUqwvRn3vABwntytLZwg5bCwO4mKnIr0HkxZbSEuK1tdzlne0Zz29YzffOtZPemvLvrwLxuej4vK52vc5gzNDsChP0',
    'lmkZWOPOWQmWW4FdS8oMn8od',
    'qCoxqSoYW44',
    'WRfjF8k7DshcJH7cGCoyWRtcP0NcGxNcKCoAEq',
    'W6ZdISoM',
    'Fmoia1JdRtGrCuiDuG',
    'W77dPSoIdCkBWP8pW5pcPNu',
    'zwrPDejVEenVBMzPzW',
    's0BdK8kUgW',
    'l8kYWQ9+WOCZ',
    'gCkyW7BdP8kYCWS',
    'WRxdO0GfWQPiWQCUCSkTrSosW5OU',
    'BgLJzw5Zzq',
    'Cgf0AevKAxrVCI5ZzwXLy3q',
    'AxnczwDPBK5Vzgu',
    'WRdcSCkBW5bcWRhcQ8kRWPtdRa',
    'yxr0CK5HBwu',
    'y8oDfWKg',
    'jCo6WRRdJ0u',
    'F2hcG8o8WQ5hW7hdNqVcICowWQNcGCoxvW',
    'F2JcG8o2WQ5NW4xdNqFcRSovWOi',
    'batdLeS',
    'zgL2AwrL',
    'DxnLwMLW',
    'cZXZrCkMDa',
    'B25Jzq',
    'mmk9WPLPWOGG',
    'A8oVydHNWPe',
    'WQxdQf8jWQ1LWOOLt8kUq8oqW7OYl8o/gGD7',
    'tgLUzq',
    'WRtcTCkgW6vZWQdcRmk5WPq',
    'jmoNrSoKsMSaWOC',
    'ltldLu7dKqm',
    'omo9WQpdNMjnW5WaWR/dGW',
    'as7dJuG',
    'AgL0DgfIBgu',
    'DhjHBNnMB3jTlMXHEw91Da',
    'kmk8WQBdJG',
    'tSkZxq/dOCoSWPhcMmkRW7ddQevNzgVdJ8kXWQ8YWPmZF0mVx8kWWQqPE8otW6ClW6j5dvy7s8oujmoIF1BcSmkBW48qESkek8kVWQvjWOqAEwTKk3hcSCoQWPBcHSonx3SHrJPRW7v0yuTMWPO6xI87W7fLk3hdImkRaCo0W6dcVLiVWPNcJCkJWOldINyovJldHGiHtgHeWRpcO8ktgx1jW6PIn13cQCo1FWpcTCoZWOBdVCk5W5K7W49WWOGBkKXcW5xcPmoTgZ4MbSksyfhdRmofW6O5oJVcUSkoCCkNFrBdSmoNWPhcO39VatmYWQVdVCowWRKnumkJW6fMW4mtnNRcJmoPW6ddGSoLo8k6W63cRdNdVSkeWOVcLdRcQdCklh1LEmkDfXiQtSoxWQzBq8kTm8oWaGafogyZWQldGSojW7NdL8oxW63dM1hdSY5mo8kmkSokWQTtmLRcSCoToeKNWQRcVmorW7/cR8ksW7BcVLfzW6tdJ0b3E05eW5WVxSk4W57dNhPVsSopvMBcObVdJtZcNmkbW77cHbJcGg5Gww7cQ8kswrpcMgfOWR7cINbLWO5tW7JdPx1iWQi9imowErdcU8oxW4HewxncW4/cPHBdTg9zW6axW7X+emkwWPFdSL3cSc4KWRtcJCkIW4m8W6vnW7n5W5C+WQNcQuXRWOvZD8kWpZldUeDeeCozjsxcV0KHtSkpW7hcTmkZkc0YwN3cGSkTW6L5vCkqiIBcL3hdLSoVhmkdaCoaW6ujiSksfCotWQxcH8odpeZdH8oQWRJdU2xdLmkKW6tdO8oDhu7dTJNdKCkfluf2W4qImqVdNZZdIKJcU0xcJ8kFDmoyatldIJJcMCk8Ae8DWR3dMHpdPSopWPf7zvrzxaldSthcVCkryCoLWQuDw8oPW6JcICk0vY5arSkfW6pdMaFcGK3cJSklzaSAWO/dVSkBoCo+x0FcISkUBu3dU8kNELhdMNRdM8kvpv0gWQdcOrFcMSkuyCkZy8osW6lcU1iEb8koWRhcPmoUjgJcJvrsW7/dLItcPSoUWP/dSqZdLvPOo8kUWQi1W6hdU8oBrvWDvSkNx2rkFtldKgpcHSkfC03cU8k+W43dImkKW6yMWO4hWRTWW7Sgt8kAW4ldVtdcMstcG8oMW5/cHgyZgfqrAYOWvvWyeCk8W5yFs8oHW6C2W5XwW4GZg1xcHNzAWOddG8kIbJ/cTCoiWRhdKY7dU17cP3pdL8otWRhcOSoWwmomW51cvr4DWPutW5D7m8kNW4qhW7xdLSkYWRRcGCk/W7HmW7ddONpcMGJcUx0BW41cW7aOWPBcHXtcNmoGWO5Cz1uNjJhcUsqEW5amW4hcMKpcN37cH8oBWOHhWRquWRrHWQNcMHfHh8o8W55Zd8k/WQ94lmk8WQNdMCo6sXFcS8oOvSkjwSk+s2ZdP8k0FmkjW5ObAYJdSaf8WRjXmgOenxxdSSknW7pdQvvEW7FcNWfqW6r+WQlcK8ojW5joWQG2yfFcTaJdV8olW6pdTmoJWQ8NW7VcR8kQW7C8WQddJCk6W4PvWQ5YW5VcGmorWRzoWQfJidpcJH9MW7CIkmkDASoQW4NcMCo7WQHtWPVcGgL5x8kIWOVdMwxdLg/cISoUF8k9yNSxfWtdQWSGaSkbW5FcOsG5W4CCW4hcTdhcOwldRmkqW5RcVmk6r3Ltar7cKCk6edZcOxjqW78',
    'vMpdUmkxkG',
    't0XJwfq',
    'W7VcUmkk',
    'k8oLW7f2imkg',
    'mwpdKmocW4mbWRvzfsrG',
    'BwvYz2vjBwfNzuvKAxrcB3HdB25MAwC',
    'sCoda0ldSb4t',
    'Aw5UzxjfzgL0qM94',
    'CgfYzw50',
    'y8k4z8o8bLe',
    'AxntvKC',
    'yM91BMrZ',
    'AgLKzvrPBwvY',
    'qM96W6ddNCoxW7NdTCkUnq',
    'z2v0qw5NBgu',
    'k8kQWRtdISk0WOJcKW',
    'hmkzuSoSxW',
    'ESkQW7yMzCoKWO5XW54',
    'ACkLrCoUu8opBmoBxupcQeS',
    'sw5UzxjfzgL0B3i',
    'eG0nfCkCWPRcKhhcUCot',
    'WOPkv2xdIq',
    'j8owCZ3dKHNcLW',
    'oCo9q8o+vW',
    'yCoUgMa',
    'c8oxBmoFCv4ZWRfjcY58W74',
    'WRRdOY4R',
    'DhjHBNnMB3jTlMjLzM9Yzv9LBMq',
    'fSkeW4xdKmkHCrO',
    'y2XVC2vjBM5LCKvKAxrVCG',
    'hGJdH1NdNa',
    'ESoIdxb8xSonW43cP8kZqq',
    'z2uiWPWN',
    'ECowWRj+gCoZW74',
    'zMLUzerLzxbpBMu',
    'ugXHDgzVCM0',
    'WRFdG0WiWQvLWQWgsmkMtW',
    'DhjHBNnMB3jTlNjLBMrLCI5IzwzVCMu',
    'xCk3W6CxFq',
    'WOBcP8kcW5eEnSo1',
    'iSoDESkAWRZdT8kRgde6W6ldKHu',
    'CMvZAxPLsgvPz2H0',
    'B25ezxn0CM95',
    'WRTlCmk6Eri',
    'x19TzxjNzujLz2LUrw5KtM9Kzq',
    'vL0FWPWfFSkx',
    'mx3dS8oaW4e',
    'w8ossSoZW5/dQ8kKFW',
    've7cQCktcSkuWQ5qvIRdTG',
    'nSoGWRddML5jW78lWRFdGW',
    'xfCdWR4qDq',
    'CMv2zxjZzuXPBMvoB2rLCW',
    'C2XPy2u',
    'y2fUq2XPCeLTywDLqML0BwfW',
    'C2nYB2XSzxi',
    'nrtdQw4',
    'Ag9NAuC',
    'Aw1Hz2vdB25MAwC',
    'CeJcRCkyda',
    'h8kdWOzPWPqZW4VdHCobp8osje8kzCkKW77dQt0',
    'z2v0vgHLBwu',
    'W4RdHeVdHhi+',
    'uvyj',
    'zM7cGSoNWRnGW47dGr3cImoj',
    'F8oBeaib',
    'DgLTzxi',
    'sSkVqmoLrmoEvSo/rulcQLO',
    'y2fUDMfZ',
    'DhjHBNnMB3jTlMvUza',
    'W6xcUmkmxLrorgHPW41/W7m',
    'ECk/wSo3aLmCWPK',
    'DSoJg1L2ECohW6lcP8kUq8o+',
    'aSkVW7qFWQmzsSkocLDgWRnQ',
    'W6FdUCoNca',
    'WPBcK8kfW7DP',
    'W7JdTCo0a8kdWPynW5pcPNrXWOu',
    'pmoItSoXv34',
    'eX7dGLxdLXO',
    'FCoyWPz5nCo5W6mlW5BdRG',
    'y2HHBMDLtM9Kzu5HBwu',
    'CM90yxrL',
    'BM9Kzxm',
    'pCoRwSo1',
    'A8kMW7JcNSoyW6G',
    'WRpdR0qsWOnMWRe',
    'mx3dS8oaW4e8WRPLhsvX',
    'WP/cNgFcQ8orfKldPq/dSa',
    'pbfNsCkt',
    'WOlcNCkKn8k2l8oJhCkwjCkBW4ddOaZcQc5jWP7cJCkP',
    'uMvUzgvYrxzLBNq',
    'Dt3cVW',
    'AxniB2XKs2v5CW',
    'WOxdRKedWQj9WOG4rmkP',
    'hSkbx8o5tSk8C3WoWRu',
    'WRtcO8kqW7nz',
    'BgrSDwy',
    'WOlcP8kcW6WKpmo8jq',
    'WRldQL8n',
    'sSk7W6JcKCoiW77dL0i6sG',
    'zmoxWOX0aG',
    'y3vYC29Y',
    'CMvTB3zL',
    'CMv2zxjZzq',
    'uNOmWRCaCCkA',
    'C2vSzwn0',
    'zg9ty2fSzq',
    'DgRcMmoH',
    'n8oDFSk0WRJdSSkH',
    'zmoracKdWPnHW7m',
    'k8kJWR/dV8ka',
    'h8ooxbGoW7q',
    'zmouWOn2fCojW6SnW57dUCoH',
    'WORcR8khW7eonSoiiCkvW6SUuq',
    'nmoJW61+omkcqa',
    'a8okrXGdW7q',
    'vMLLD3bVCNrmAwDODgvY',
    'W6tcSSkz',
    'CezttwS',
    'B25qB2LUDgvYtw92zq',
    'aCkMW7G4WR4Tqmkokq',
    'zgvMAw5Ls2v5',
    'ywrKsw1Hz2vfzgL0qM94',
    'jmoVW7nKoCkaAG',
    'WRnTWQniW4RdKSotB8o1',
    'DxlcN8o/WPDhW5G',
    'vefq',
    'WRpcSCkaW4n1WQdcI8kGWPxdUW',
    'WOFcUSoBrmkr',
    'y294C3K',
    'x19Jyw5szwXVywrqyxrO',
    'bZBcGxOnWPe',
    'ACkLrCoUu8opqCoEFuJcOeVdMG',
    'p8kkW5CGqCkUWR8zW7FdQCoHkmou',
    'amooA8k2WQ0',
    'WPnrDhtdH8kAtCop',
    'ywrKqxq',
    'jYhcI28PWPxcRSkQb8oS',
    'aJpdL0BdVXFdVLG',
    'ECoyWPf6',
    'q2XPCevKAxrVCKHVCML6B250ywXmAw5L',
    'hX4feq',
    'v1DLrum',
    'quXWt3u',
    'C2vSzwn0zwroB2rLtgLZDa',
    'D8kPyCoxb0mrWOLz',
    'pmkSWQBdKSk4WQNcLmkuW53dH0dcLNLrpG',
    'FSofmGuS',
    'n37dJq',
    'cY9GtmkWzSocl0S3tCoxBq',
    'y3jLyxrLqwz0zxjqB2LUDa',
    'CSoNzJpdLmoVWPpdNG',
    'jmoOW7PYp8kVDYNdISkeW6erhMG',
    'uevzBxG',
    'WQBdUuisWQ59WRa6ra',
    'fqJdHxJdMqFdHCk0WQ0cW6TUq2RcNZS',
    'xspcNYTdWRJcQmknW7JdHYhcMW',
    'F8k+FmoYavGZWOrzW68',
    'C29Tzq',
    'kCk0FCoxAmkCFf4YWPZcK3NdNG',
    'WRxdP0qwWOrTWQa+y8kNuG',
    'n8oHW6T5eCkkCdNdTSktWQmzeMRdNq',
    'WQXfBmk7Dqe',
    'C0JcPmkjfG',
    'l8kSW6eCWPm3w8kepKTNWRHYlsRcMa',
    'E8oqWPf4eSoXW68',
    'ChjLC3m',
    'Bw92zu5Vzgu',
    'ESk9W6qLw8oUWOe',
    'mSonuXOfW7q',
    'WPvmE37dImkitCotW5S',
    'emoVWQikuG',
    'EM9VBuXHEwvY',
    'ESoehq0bWPm',
    'pmo/WRtdNe8',
    'BSkOtmoL',
    'DmoOexfWEG',
    'o8kHWRtdImk2WQ7cM8kh',
    'W5RdL8o/p1tdGCodwSkYWP9FW7pcPa',
    'rCotuCoNW4tdKSkaAha9jq',
    'y3jVC3npCMLNAw4',
    'WPRcO8kCW6GKpmo8jq',
    'kSoVW7T0',
    'W7NdS8o2amkoWPK6',
    'A8kOW7mWxCoKWRP7W4DprCo6',
    'ugP6W6ddP8oCW7i',
    'Cgf0AevKAxrVCG',
    'E8oMdxb8sCokW5BcRmk4',
    'mthcM3Cy',
    'nHDhqCk5',
    'z0dcRSkOdCk5',
    'DhjHBNnMB3jTlMXHEw91Dc5HzNrLCG',
    'ug9PBNrizwXWzxi',
    'zgf0yvr5Cgu',
    'fbibamkTWONcUhdcQq',
    'yM94q2HHBMDL',
    'nCkSWQFdGCk0WONcMSkeW5e',
    'vK5qwfy',
    'y8kPECoWc0iAWOK',
    'B3jPz2LUtgLZDa',
    'r2fMW7RdQG',
    'jmoZuG',
    'iSoKW7zLamkpAYRdVmkvW4KghhVdUSkIW7yyx24',
    'bmkoWQPl',
    'arChamkh',
    'EM9VBs1PBG',
    'WRRdRKWaWQr7',
    'WOtcISk1nCkKkSoP',
    'jCoVW6Dto8kBDYNdQG',
    'hXOnemk6WPRcShhcQ8otuaBcRMi',
    'WR1GCCkLyIpcLaVcGSotWQdcMa',
    'zwrPDfrHCMDLDa',
    'bCooqXOuW7nXWRapoCkj',
    'D8oLuCoWW4xdHmkKDa',
    'd8kMW6eEWPG1t8knpW',
    'qhpcGCk6',
    'ECoOg3jDFmowW4i',
    'hSofvHmtW6rXWO4',
    'brOfbmkMWPdcUxS',
    'nmoxzb3dNbK',
    'sgfcwgC',
    'ASoCWPzyhSoZW68nW7tdS8oJka',
    'ka0zmCkE',
    'WRdcUCkwW5b4',
    'rCkFxCoQvW',
    'W7RdP8onbCk2',
    'C2HYAw5R',
    'WRlcOmkwW4vKWRhcLCkUWOxdTG',
    'zmoFqSoZW6pdHCkTDNiJ',
    'ednrtCkQBSozofqVr8ozD3LWASoo',
    'p3xdPSo1W4SCWRPJeY9R',
    'iCk6WP9PWPqvW4RdO8o0n8osjh4',
    'DCophNL9CCohW6/cQmk0qW',
    'WRlcOmkwW4vKWRe',
    'W6/dRCo/p0pdI8oj',
    'lZfGvSkLB8oFma',
    'BwvYz2vfzgL0qM94q29UzMLN',
    'BvlcHSkpg8k5WOnDscVdQmkHWRtdI8ku',
    'CeddQW',
    'y3rYBeTLEq',
    'xfCBWRWi',
    'tSoirSoW',
    'mSoeWPa',
    'uNvU',
    'DSoPDbldQ8oU',
    'ruijWRGqEmk2bLFdImopW4dcGmoCwSoprW',
    'mmkKW4TnWPq9W4/dQW',
    'W4VcSCkxsxroBNnOW5K',
    'gZHYvSkXB8ou',
    'WOxcOSktW4PZWRZcJCkQWP3dRSkOWP4',
    'WPZdPIOOWQ4ho8kr',
    'W6tdUmohgCkBWPusW53cPhG',
    'Bg9HzfbHDgG',
    'z2v0tgf5B3v0',
    'WP3cSSkdW7CbnSozlmkoW6KU',
    'hbOAe8knWRZcSNdcU8oFFG',
    'iCoxyZ3dIX3cNsX9W6/dICkRWQq',
    'WPFcPSo4ASk+pSohW5yGW5bRySoYlqJdNq7dRbq',
    'C2nYB2XSwejHCG',
    'y3vYCMvUDa',
    'zMLSDgvYCW',
    'x19KCMf3',
    'Dmklo8oSW6ZcOCkjgtOXW5RdLa',
    'jmoSW7b/mq',
    'WQRcG8kaW68n',
    'ru1jvf9mqvLpvvq',
    'xv0BWRW9',
    'yM90Dg9T',
    'xf0k',
    'B1HRyKC',
    'mmo/WRZdJ29AW5CkWQC',
    'Cgf0AevKAxrVCI5IzwzVCMvFBw92zq',
    'DxjS',
    'AxntDxbLCKXHCMDL',
    'smoMEtPTWOVcHCopvcddNSoa',
    'nSo3WRVdJ09E',
    'sSkSsmo/vSouvSox',
    'WQxdV18jWQPS',
    'hd7dJeFdRH/dTe/dUmoeaG',
    'WRvbBmk7DrhcVXdcGConWRVcRW',
    'WPrnxhtdOSkDxmoC',
    'haZdNfK',
    'qKvgt1jfx0niqu5hrq',
    'w8oga0ldIHuyEfem',
    'WPlcN1ZcVSoKf0RdPq',
    'y2XPCfrYyw5ZzM9YBvrVB2W',
    'W4ddLMFdGNa7W4hcTmoVWQzG',
    'x19SyxLVDxq',
    'AgL0',
    'CeX5wuK',
    'bK5/rhO',
    'gCkyW7tdTmkUCrCZ',
    'W5RdHKtdI3ik',
    'i8orymk8WONdSmkWaG',
    'WPLnvN/dG8kFxmo4W4hdIcvHW7PuW6LtFdxdHa',
    'yxbWBgLJyxrPB24VAMf2yxnJCMLWDa',
    'B25mB2fK',
    'q2XPCevKAxrVCG',
    'WRRdQL4sWPfMWQaKvq',
    'D0FdKmkyawj6W6ldUCk7',
    'WOVcN3ZcT8oWjLNdSa7dSrvOWOX/',
    'AxnnB3zLtw9Kzq',
    'iWddNf/dKG',
    'WP1htf3dICkDtmoOW53dGa',
    'F8owWPD/fa',
    'n8oDFCkXWQpdTa',
    'oSo3rSo1qg8jWOzejGvBW4BcS2ZdPCoMma',
    'E2NcM8o2WOHBW5hdKq',
    'W4JdRutdIxm+W4O',
    'WOtcP8o/vSkZnSoS',
    'C2nYB2XSvhLWzq',
    'WQxdPYO7WQ0TlCkvcmoTr0a',
    'w2f3W7hdISotW6hdSq',
    'fSoiqryqW6vAWPieomkF',
    'x19JAgvJA1nJCM9SBa',
    'DSoZc2u',
    'j8oxESkW',
    'Bwf4rLbt',
    'rfmEWRi',
    'WQPQWQ1lW6hdMSoeBq',
    'f8kHW6uxWRqvt8kA',
    'BwLUtgv2zwW',
    'WO3cO8kFW6Wpiq',
    'kSowuq',
    'BxvSDgLWBgu',
    'WOBcO8kyW78cjW',
    'pSkFzbFdLbpcLIu',
    'WQVcUCkCW4fJ',
    'iCk4WO9cWOKWW4S',
    'zmoZdxHYEa',
    'zMLUza',
    'ASkLW6tcGmo5W7/dS1KXxq',
    'BSk5W6m5',
    'Bwv0yuTLEq',
    'y3BcICoYWQHhW7hdMXRcGSooWQNcM8opsZu',
    'Cg/cMCoEWR1wW5pdNqS',
    'zejyyKy',
    'hIVdN0pdOIJdOG',
    'DmkLtmoVC8ousSouvKtcSa',
    'tCk7W6ZcH8oWW77dReGY',
    'W5RdGfe',
    'C2nHBgvz',
    'o8k7WRddH8kLWQJcHW',
    'WP3cO8kDW70jj8o3mG',
    'ymoshX8qWOi',
    'mSo3WQhdVKriW7WlWRFdGW',
    'WR3dJ30VWPe',
    'A0/dHSkAjNLbW6pdUCkT',
    'tSk3W74/xCojWP14W4jeuW',
    'W4BdG0pdUa',
    'Aw5JBhvKzxm',
    'DgfYz2v0',
    'BgfYz2vuAhvTyG',
    'WOTtC3JdVW',
    'tCk7W6ZcL8oBW7ldTeO',
    'ECoMeNi',
    'EmoYWPzqhG',
    'jbFdVvtdVq',
    'WRP2WR5kW63dLG',
    'W7NdHeZdIwmBW4lcM8oNWQC',
    'rwzMzwn0',
    'imoLW6TuoSkkvYldVCke',
    'vgj6W7pdOa',
    'AgvJve8',
    'WR/dUgieWQTSWQO+',
    'bX/dNq',
    't0hdNCktn0vQW6ddRCkTWP8',
    'mHjxzW',
    'tSkSW7NcVCovW7/dVKe7F8o3WPX7W6C',
    'W43dGfBdK2u9W5y',
    'imoCz8kSWO3dSmk2dteaW4NdHbeAlq7cOCkzW4BdNCk6khv3',
    'zgvSzxrLtM9Kzq',
    'WOLbsN7dISkqF8osW53dGanqW69CW6LUDt7dK8k8',
    'hu5Ora',
    'FSkcCCoPDG',
    'v0zYW7RdQSoEW7a',
    'dd5ZtCkVBmoilW',
    'lZX1sSkgzmoekuKr',
    'Aufdzhu',
    'i8k5WOjG',
    'DMLZAwjPBgL0EwnOyw5Nzq',
    'irabgSkCWRFcUhlcRCotAW',
    'smk1rW',
    'hCk6W4FdNCk0',
    'yKJcRmkrkSk5WRni',
    'WR5qwxBdO8kktCotW5S',
    'cmkDuSoOACkWwxG',
    'nZBcH2K+WPVcSSkRc8o/',
    'EeVdGmk/jMTGW77dUmkgWOlcMqG',
    'WOHlD8kYzbdcJJRcMCooWRZcVa',
    'Bwf4',
    'WRfjF8k7Dq',
    'fbSbamkQWPdcPq',
    'DvDJsgW',
    'WQpcR2lcUSoThv7dPq',
    'WRldUuWrWO1SWR8Vtq',
    'WOxcISkXg8kQpmoIc8ki',
    'WOxcR8oZqmkKmG',
    'smkLW6hcN8olW4JdV0e7tmoS',
    'FSo0lhz0EmoUW4RcR8k/',
    'WQtdRLSdWRn6WQWhtSkStW',
    'sLjVsM0',
    'eH4gaSkjWOW',
    'z2v0',
    'm8kMW6KuWQuqs8kgkL1D',
    'yMXHy2S',
    'z8oBdWKhWQv7W77cQmog',
    'WO5lvhtdO8kyqCojW4ddNG',
    'CfvlEKS',
    'WPLouwhdSSkosCotW5ZdIGH2W7bPW6HYFW',
    'f8kHW7uxWRm',
    'Dg90ywW',
    'Cmk5W7O0',
    'D2HPDgu',
    'BMfTzq',
    'yMX1CG',
    'CxXYW7pdI8oeW7ddVSk5',
    'WPxcQSo9qCk3m8oNW54',
    'AxndBg9ZzvbHDgG',
    'zM9Yy2vvCgrHDgu',
    'AxngCMvLsgfUzgXLs2v5',
    'ygFcGCoMWRLr',
    'lh/dKCoiW4KfWRP5hG',
    'mSotzb8',
    'ox7dU8okW4uCWR4',
    'BexdKCkk',
    'reDmzuy',
    'FmoQEHNdKa',
    'n3BdTmo4',
    'lCocWQa/sW',
    'bCkGW6Ww',
    'vgLSzuvKAxrVCG',
    'h8ofqJiZ',
    'oSo8WOO',
    'x8oMzIT8WPdcTa',
    'j8oexbesW4HXWPeqomkE',
    'zgvZDhjVEq',
    'vLDjvLC',
    'W77dPSoIdCkBWP8CW53cVhT3WRO',
    'ywn0AxzL',
    'x19UB3DxB3jSza',
    'WO/cOSkvW5KEj8oQ',
    'nmkMWRtdGG',
    'emkGW7OF',
    'uSkju8oAoNmGWR5VW5FdQhhdTq',
    'AgfZu2nYB2XSzxi',
    'B25eCMfNu3rHCNq',
    'CvhcPmkCcSk5WPTttYhdSmkxWOVdL8kbW7q',
    'lSo3xSousMGyWOnIja4',
    'EMpcG8o0WQHk',
    'mItcLM8yWOBcSSkza8oRlq',
    'WRzlAq',
    'WPpcI8kSlCkhjSo0',
    'qdtcGJHjWQJcKSksW7m',
    'DxbKyxrLq29UzMLN',
    'p3xdPSoXW4ueWRjZnY9ZWO8',
    'x8oSrJrRWOG',
    'AColWOn2f8o0W6qy',
    'WPJcRCo4sSkJdmoGW5WZ',
    'zgvSzxrLtgLUzu5VzgvZ',
    's8ovc08',
    'W73dGmoYnetdK8ojtmkrWQruW7NcUW',
    'ugf0AenVBw1HBMroB2rLsgvSCgvY',
    'y2XPCevKAxrcB3G',
    'b2tdS8ovW4mnWQ9zfsrG',
    'AxniB2XKtxvSDgLWBgvtzwXLy3rlzxK',
    'W5VdILhdHMm7W4dcLa',
    'vgLSzuLTywDL',
    'zg9nB3zL',
    'qLHRBNK',
    'y3jLyxrLsgfUzgXLCW',
    'mmo2WRZdJ35nW4adWRBdKG',
    'W7BdUKBdHNKhW5/cNSoHWRzGW6RcKmoceW',
    'f8k7W6euWQi+qCkynW',
    'uKvorevs',
    'jSoxymk+WRddTG',
    'WPpcNL7cTmo9hf/dTbldJXXXWPS',
    'rgvIDwC',
    'px3dU8ot',
    'DSo0dh5+C8oXW4dcOmk2qW',
    'z2v0uMvUzgvYu2nHBgveyxrH',
    'esHSqmkMCG',
    'C2nYB2XSwa',
    'ESkmW4hcTCo/W48',
    'eqhdLf3dGG',
    'fH/dKfVdLX3dN8kY',
    'WQvNWQ1dW6pdGq',
    'EmovsSo7W5/dQmkKAMC0mG',
    'ywrKtM9KzufMDgvY',
    'wM9VBuv2zw50',
    'faldG3NdKrFdMq',
    'a0jRvxm1',
    'erJdG0/dNWy',
    'kmoUW5TJnCkjxcpdVq',
    'fqRcLxmz',
    'e8ozvaGQW6vIWPGm',
    'WQddOL4pWQnLWQW',
    'qeCEWRe',
    'WOJcKxZcVmoXbG',
    'W7/cTmkAtvK',
    'C8kZASoNx8oiqCo0xepcOq',
    'EwJcOCo2WR1uW4q',
    'W6NdGmoQeehdK8ojwSkrWQruW7K',
    'DMfSDwu',
    'DhjHBNnMB3jT',
    'DxbKyxrLsw1Hz2vqywLUDa',
    'Bgv2zwW',
    'C2XsCNy',
    'WQJcN8k6W5b+',
    'zgTcD2u',
    'nINdKvxdUW',
    'ANDAuMS',
    'WRtcS8ktW4H1WOW',
    'yM94',
    'BxvSDgLWBhK',
    'r8khuCozgq',
    'mwpdGCosW5qnWQLBgZjIWO8',
    'u2nYB2XSzxi',
    'ugfPBNq',
    'D07cJmo9WRHoW4tdUbRcGSoF',
    'AgfZrxzLBNq',
    'm8k5WODPWOuGW4VdO8oQn8oFl3K',
    'caldNLhdMrRdLG',
    'ywrK',
    'WQPbAmk5yGBcMtlcGmopWRC',
    'WPxdVuSaWQ5eW7L4BG',
    'iSoDESkAWRZdTSkTbbOBW6NdKW',
    'BeFdMSkAl2G',
    'FL3dH8kujgm',
    'e8kkW5NdLSkYDXmRuL9sCCkvW7atW5HTWRDDWR8',
    'WQTbCSk5CWhcMrVcOCoeWRBcRxFcHv7cIG',
    'q2D2W6m',
    'o2ldT8ogW5anWPz4hIu',
    'bSkcW5ldOG',
    'WPNcGCkqn8kPjSoTcW',
    'tuZcOCkAg8krWQPsrYJdOCk2',
    'yMzQsNy',
    'W5NdHfhdJW',
    'WQxdRKedWQj9WQWU',
    'm8k/WPLJWOO4W7BdHCofkG',
    'zwrPDfrHCMDLDerYywDcB3vUzhnuExbL',
    'AxnnAxjYB3jiyw5KBgvlzxK',
    'amkMW64CWRG/',
    'W77dPmoQ',
    'W6tcLSk0W6i',
    'v8oSCG',
    'fWhdLfhdLrRdHq',
    'W7VdUCoVaSkBWRi6W5VcTxvQWO7dVsGwra',
    'DmoIewn8BW',
    'BwfW',
    'l8kYWRTJWO86W5RdOSowhmoupwq',
    'zwXLBwvUDa',
    'ySkPzSo8eLmZWOreW74',
    'W5VdNSoLimkhWRyvW4VdO0TDWRhdJYqWAmobW7jazeZdQs3cVSo/W5dcSCok',
    'B09iDg4',
    'W5/dJeddKa',
    'z2v0rw5KtM9Kzq',
    'bfvIyum',
    'W57dICo/juhdImoErq',
    'Dmo1gNzTEmoQW4lcR8k+sSoPea',
    'qM91BMrZ',
    'iCoPW7n9',
    'W6NdLv3dGgu9W5JdLCoJWQ5SW4RcGCotcq',
    'WOdcQCkvW70UmSoSiq',
    'tCoEsSoHW7/dGCkZyxiLbmoHWPvTW6ydW497dhTsstZcQG',
    'Bg9NmG',
    'bHymamka',
    'vtdcIcjsWPxcJ8kr',
    'C2nHBgvy',
    'WRFdVLKjWOjLWQy5ra',
    'jbG/nSke',
    'D2f0y2HLCG',
    'Bw92zvDVCMXK',
    'w8k+W7e0sSo1',
    'z2v0qMvMB3jLtM9Kzq',
    'WPFcPSo4',
    'y2HHBMDPBMC',
    'zwvrwMS',
    'zNvUy3rPB24',
    'dtHStCk1zq',
    'nCkSWQFdGCk0WOtcMSkoW5ldGuK',
    'r8ovoZqs',
    'W6dcS8kjDgq',
    'WOhcQ8o4w8k4',
    'CMvWzwf0',
    'E8oqWODM',
    'WPRcP8kdW78pjW',
    'b8o9smkxWOVdLmkBoqa1W5/dOG',
    'x25VzgveyxrH',
    'W73cRSkB',
    'WR9RWQLs',
    'yMXLBMrnB2rL',
    'CMpcI8o6WRjhW7hdHHZcNmoFWOJcM8op',
    'Dg9dB21Tyw5K',
    'W4hdHfBdRMm3W4i',
    'WOHhvx7dKmkzzmouW5ZdMajQW5HlW6jZzYi',
    'WPbBWRztW5e',
    'rSkNW4JcNSoiW77dQa',
    'Dw5SB2fK',
    'W5VdGfpdGMuHW4RcTSoPWQXGW7tcNSoshNi',
    'zmkHW6dcJX8CW78xWR3dO3hcLq',
    'FSo0n3H1ECoVW5BcRCkUt8o8d8kYc2mRvZjXhJddQW',
    'WRJdQZK7WQ0Cb8ktgmok',
    'n8k1WO94WO4',
    'AgfZsxrLBq',
    'repcO8oxWPLW',
    'C8k5z8oNdvGlWQnfW7/dIa',
    'imoBErddSZu',
    'gmkuv8o9wCkT',
    'ugf0Ae5Vzgu',
    'WRRdOL4sWQrNWPKLsmkMxSo2W50+',
    'x0aeWR4nC8kVcL/dGCoE',
    'Bgf5B3v0',
    'gCkyW7ldU8kKxb07uG',
    'ASoqebG3WPL3',
    'C2L6zq',
    'DmoNEbm',
    'xZtcHcTpWRlcP8klW6xdLq',
    'B2zMC2v0',
    'jSoIs8oZsM8v',
    'zMLSBa',
    'DxnLtgLJzw5Zzq',
    'C3fYDa',
    'zmoKdxH1CCo7',
    'DgfN',
    'wmoXCd56WPRcJ8olxcVdGmoaE2pcR8oSW7u',
    'AxnpyMPLy3q',
    'oSopWRSytmkozvhdIIxcLKVdVLlcNGVdGCoFjJdcIW',
    'dSkSW7iDWRqrq8klpv1SWRjWoYBcJq',
    'fmkSWRtdGmkDWQ7cHSku',
    'ECoPzXJdH8o4WQ/dI8oHW5ZdQMq',
    'nSk1WO57',
    'Bwf4wa',
    'eINdM0hdVZNdLK7dUSoi',
    'mNz2ChzNstrWAeTLwKT4v2XZlNbjmxvQsuLfzKKXBuKYDNzWzMHYzKKXDuK4ztryvwjMrM1ntuW0AfPmwNzZnwLWzvHquey0vKzUwKTuB1fOwK9JudDtyNu3owzlt0Lwm3ren3r4BNPVmNfUwJLVu1mXELzUqK1knw5iBJfykMzABMfpmKzrm1fXwhbgEMTYv21sCM8UC2jmyIXAkLrXDgL4tJbMuLjnA00Zle4QkNzgm2nTswfHthrlvg9WA0iXvdzmuMLqvLvpwvy3rMrVwevIvxbVn2PWn1jXvMW0BfnQmNbfrti0mhDcrIPfrK1XruLWExb1rNvsmhfwwNiZqNv5nKz3sJy5tdnxsNDxDejgohLSDeKXu20ZBuv0u2PgDgrWvZm5tvKWnxvHn1DfnfrrBfjvDxHVALfZA1DqCdbOAKDmqNHZBvu3zMTRvKLmtg9HkKqWD1nQrKvYENDUDvC5vvjLAwj3tZqXANO2rhuUtfLmAIO5Ctv0mK1KzuPkDtf2q0KXsxa',
    'zvKmWPSn',
    'ECoayJrQ',
    'WPldRKedWRvS',
    'ywrKrw5KtM9KzuXPA2vczwDPBG',
    'AmoJEbNdLmoV',
    'BMvLzfjLBw92zuL0zw0',
    'W6NcUCkA',
    'zu3cRmkscCkyWRLDqq',
    'aLjPvNmIW7W',
    'WQpdPbq',
    'WPrnxhq',
    'Cgf0AevKAxrVCI5HzNrLCL9ZzwXLy3q',
    'WOxcM8k8nCkG',
    'q14eWROb',
    'W4ZdGuZdK0m9W4dcLG',
    'xvSFWQSlB8k+bvhdG8op',
    'WP/cT8oSECkb',
    'sCoSydfQ',
    'WRZcO8kFW7WpiCoDnSkcW6a0',
    'WObnv3ZdQSkDuCoyW50',
    'CNCRWPy2wa',
    'nmo+WQhdSe9v',
    'uwTGW6ddVmoDW6W',
    'z2v0uMvHzgvY',
    'ESoOg3i',
    'xgCxWOGd',
    'WONcGgRcUSoGfW',
    'WPpcNKVcTCoGf1K',
    'WRPbEmkZyHdcVrVcI8o7WR3cOvxcMa',
    'ESoOcxjxCSogW4y',
    'WOdcP8kCW70',
    'BSoqhsuyWPDOW6lcGCohgMrHDCkc',
    'WPFcVmktW5b2WRVcT8kI',
    'W7JcQmknuq',
    'haldLvNdTbxdHCk0',
    'W7JdVCoJg8kGWPWiW53cOhf6',
    'WQtcVmkBW5rvWRdcRmk7WRpdSCk1',
    'nCopWQyStmkB',
    'f8khW7uyWQK',
    'WRhdRLKKWQrVWQy4rmkgrCotW5W',
    'CgL4zwXty2fSzq',
    'DSoRfNb3',
    'wvjtzgu',
    'rSkNW5/cLCopW7ldOeG',
    'FSo0mN5RB8onW5hcICk7smoOd8kYe2m+',
    'WPlcO8oOtSkakmoMW5OHW4zuzmoR',
    'lZX1sSkaB8oameCnrSo2BNHuuSoBW6FcVLTh',
    'ECoDcGuxWPPQ',
    'WOhcQmk1W6OlnmoDlSkd',
    'Bw92zq',
    'gbegeCkAWRRcUxFcQCo0DGO',
    'nCorDHJdGZpcNa',
    'l8obqWBdHXlcIs9cW7ZdJCkwWRHUWQuyWQS',
    'nSoaEbpdLbNcItO',
    'ht7dKeFdVZq',
    'zSoAfWKh',
    'WP/cSCoEsSk3m8oNW7CRW5fc',
    'AuvxBNe',
    'B25uyxa',
    'mSoYW6zabq',
    'Cgf1C2u',
    'C2nYB2XSq29UzMLNq2HHBMDLza',
    'zhjHzW',
    'gmkut8omuSkStN8SWRtcUeK',
    'zCoCWOT2gmoP',
    'qmomo1TO',
    'WQtcVmkBW5rvWRdcRmk7WP7dRa',
    'AxndBg9Zzu5Vzgu',
    'zmk+Dmo7g1aqWP9hW4ZdGKddJCoZ',
    'amkSWPnRWPq7W5NcQmouoCopiICbzCkdW6xdOIO',
    'WOlcQCkqW7WJpSo5j8kc',
    'WRFcUmkDW5b/WPBcQSk6WP/dUSk+',
    'buHvx3yK',
    'WORcTmkqW68MnSoUjCkl',
    'u2fHW5hdR8orW70',
    'lmk5WP1PWOON',
    'ChjLtwfZC0nYzwf0zq',
    'nCoxyZ3dIX3cNsX9W6/dICkRWQq',
    'fWNdMeJdSHVdIq',
    'tefzt1vu',
    'itFdN1tdRtpdQuW',
    'lSoxFHpdJGG',
    'F8kIsG',
    'W5NdK8oxoCkQWQKl',
    'hmocwrmNW659WPabkCkj',
    'uxtcP8kClG',
    'tSoTEtbVWPS',
    'B8o2CrFdLSoV',
    'zCoyWPe',
    'CMvNAxn0zxjjBM5LCKvKAxrVCG',
    'W73cRCkAwevprgHPW41/W7m',
    'cfJdSCoRW4WKWPfUsXyYWQBcShm6ySk5qSoCh00wWOrYWRJcRCoNbSkbpWJdPa',
    'q2XPCevKAxrVCKLTywDL',
    'nCkVWO4',
    'WOtcISkOnSkZla',
    'z2v0uMvHBfvsta',
    'zM9UDa',
    'yM91BMrZvhLWzq',
    'kGVdLvpdLW',
    'wtxcRIbjWQ/cJSkSW7NdHs0',
    'eXtcO1yh',
    'DCoOwbNdLmoVWRJdHmoH',
    'E2HLAwDODh0',
    'qxjYB3C',
    'v2D9W7a',
    'nmozWO0Uq8kgB3pdKHpcLG',
    'ACoCWPfLaSoYW7m',
    'zMLSBfjLy3q',
    'DeamWR4HA8kAbui',
    'Ag5Stvi',
    'yKHHBMrSzq',
    'W77dPSoIdCkBWP8',
    'rwXSAxbZzq',
    'WRPNWRG',
    'fSoAWPtdTw1P',
    'wfmEWO0mEmksdG',
    'A0/dHSkAjNK',
    'yNvMzMvY',
    'z8oDhqK',
    'wwTYW7ldQ8oa',
    'Bw92Aw5N',
    'DgfZA2vY',
    'm8k0WOjQWPiFW4VdVG',
    'bSo+WOFdSh0',
    'aqJdNvNdKWddLmkX',
    'lNH+rNCVW60mW5zj',
    'AxnfBMrqB2LUDe5Vzgu',
    'WR5wWOjSW4K',
    'xmoMyq9HWPBcO8oA',
    'CMfUzg9T',
    'zNvSBeLTywDLu2HHzg93',
    'W47dLCoMnLxdImoBb8k2WQzrW7VcRxldT1xcRSo+WPhcPSo7',
    'fCkDW5ldU8k0wXyS',
    'iSo7WRhdJ0i',
    'jmouESktWRZdQa',
    'zhjHz0jVDw5KC1r5Cgu',
    'WPFcV8kEW513WRVcQW',
    'WO7dPt4YWQWB',
    'DmoPEXm',
    'uG7cJcjcWRdcJSkUW7/dJY0',
    'nx/dPmoc',
    'y8ordWKz',
    'lCo3wCoKuxqv',
    'W77cTmkBtG',
    'EgFcGmo2',
    'z2v0rgLZDgfUy2u',
    'Afn1y1a',
    'W43dICo3iwldG8ofxmkWWRK',
    'nmoDyXxdKHNcUZTcW7VdJSkH',
    'zhjHz0XPBwL0',
    'pCoZWQBdSL5jW58',
    'wNX6W7pdP8oC',
    'eSoaDHRdLrRcLtTaW5RdJ8kQWRW',
    'WRTNWQ9r',
    'mItcLNm',
    'lwddTSogW5anWPj6gYDGWQVcKK4SoCkR',
    'lSoByW',
    'Amo1k3e',
    'C2nYB2XSwejVDw5KCW',
    'WPNcR8kvW6Wc',
    'BMv4DfjLBMrLCG',
    'WR7cJSksWQ0diCo7cCkaW5WqACoqW6xdTCkAWOFdSb8K',
    'hSkbx8o5tSk8',
    'h8kdwSo2sCk/tg8xWONcSLhdTW',
    'WR7cQSkqW6WmpmoQlq',
    'j8kdDmosDq',
    't8ogbfxdVbW',
    'FfSdWRW',
    'D2fR',
    'chZdP8oaW40g',
    'lSk9WOzP',
    'ufPeq0m',
    'xspcNYTdWP/cHmkmW7ddIc8',
    'jCocwshdQa',
    'uhjVCgvYDhLfDMvUDa',
    'WR/dVJKZWQmn',
    'ACkJw8oKxmoxqCoi',
    'gdxdIKxdUs/dVKldQG',
    'y2HPBgrYzw4',
    'WRxdPemsWQrNWR0itSk9rmotW4O',
    'WQTkWQ1lW6ldN8op',
    'EwHZqwq',
    'qCkhW6u0r8oLWP1MW6fjqmo5WRK',
    'rCkQuCo0dW',
    'xCokr8o0W5/dHCkiA3y2jCoxWOzRW4mUW5vGbMX1',
    'yKHHBMrSzuXPBMu',
    'W73dJSo7jG',
    'lLBdKConW6m',
    'yKHAyvO',
    'W4ldUmoOcCkDWR87W5VcPNjS',
    'zwrPDfrHCMDLDerYywDcB3vUzhm',
    'EmkTzSobafmsWOG',
    'iCkXtsuPkmofW5FcOmkdsCoK',
    'WRbbD8k7Eae',
    'z2v0qwz0zxjoB2rL',
    'hG0be8kbWPhcKxFcRSoc',
    'FSoAWPb+hmoXW5GEW43dTCo6fa',
    'WRNdPwajWRDS',
    'o8o9xSoXv3idWOW',
    'w37cSSkyemk4WQ5o',
    'bcVdMKhdVZK',
    'WP3dMWOrWRi',
    'wvL6DLC',
    'W7JcTCkrtv4',
    'C3rVCa',
    'WPLkWQ9PW67dV8oGC8k2iKldR2LFW78cb8kYwL8RheWChLLmWRCYt0D6',
    'zMXVB3i',
    'v3nst3i',
    'fbibaa',
    'DhLWzq',
    'y2HLy2TeyxrH',
    'Cgf0Aa',
    'seDgANi',
    'WPzawCkgwG',
    'zmoKhNT8',
    'W7JcTmkgxf15zgzRW44',
    'eJtdKftdRJldR3pdU8omcrC',
    'aSkNW6CwWRqlqmklkN9oWQ0',
    'Cebx',
    'rfjbrW',
    'ebpdN07dRZddVM3dT8odaa',
    'WP/cGSkKpSkGdmoObSkpsCkdW5NdLWdcRMzeWPG',
    'W6/dUCola8kzWP8',
    'q8oxc1xdSaqn',
    'nCkMWQpdG8ki',
    'y8kVz8o6bfON',
    'lSojWQ4Nqq',
    'vCoSCtPkWP7cUCop',
    'C0FdH8kjjMnkW7RdUmkMWPNcJG',
    'AxnnDwX0AxbSzvnLBgvJDa',
    'iNnAyKy',
    'y8ovcHGLWPLMW6NcSa',
    'DKtcTSkydmkVWQ5XssVdOq',
    'AColWOnMoCoWW6SyW5W',
    'D0hdHSkuowjHW7JdVmkKWQhcLanH',
    't3fftuS',
    'mCoGWQ3dUuW',
    'WRtcU8kxW5m',
    'mCozFmk/WRZdPq',
    'W73dHSo/puldQmokz8kQWR9vW64',
    'Dhq0nuuYx3LVsePyAdjFmgLsueXfoxzSvgTtoa',
    'CMpcNSoNWQ5nW5G',
    'WQpdU0KhWRvSWOaNqmkVt8oNW5GZimoL',
    'W6ldPCovdCkcWP8',
    'iSkPWO1QWOmM',
    'j8k5WP9aWO86W4VdIColpmoEoq',
    'CMvJDa',
    'isNcJwGy',
    'lSoZW4XLjSkhDYO',
    'ywrKrxzLBNrmAxn0zw5LCG',
    'aray',
    'C2nYB2XSuMf0Aw9y',
    'WONcO8kfW44lp8oXjmkQW6e2qa',
    'B2jQzwn0',
    'pCo9WQFdKLbdW5WqWRldIMRcNSkRbG',
    'zuxcPmkZeCk4WQ5+qYNdQ8k2WPO',
    'lctcJ34',
    'Axntyw1L',
    'WRNdPxi',
    'nN/dTSocW6ajWQ92',
    'W6/dGCo6feNdG8oIr8k7WQ58W7xcOZRdMvNcRSo/WOS',
    'aJyHWQpcT8kcW6FdLmkCk8opW4e',
    'tCkSW77cHmooW7tdO2u/qCo8WPLWW6a',
    'quzurvjFu0vmrunu',
    'vwLUDdHbCNjHEq',
    'v2jduLe',
    'wmovsSo7W58',
    'vwzUAw4',
    'ChvZAa',
    'vh1GW73dQCoC',
    'er/dLf3dHbhdVmk6WQCe',
    'W4pdMSoYk8kJ',
    'gCoeurOIW6fGWPW',
    'z2v0q2vUDgvY',
    'ug9SEwDVBG',
    'WPnpwxBdG8k5tmouW5VdRGH8',
    'W6ldPCoecCkiWPmXW7ZcVxL7',
    'WOdcO8kjW6W',
    'AgfUzgXL',
    'tSoZCt56WPRcNSoAqYJdLW',
    'wsVcJcTdWOJcISkqW7hdHdW',
    'y2XPCfjLBMrLCG',
    'gaWPbSkAWP7cPa',
    'fSk5W6qBWQu9z8kho19kWPLSpcJcQfNdLtSFxa',
    'WOpcSSo4tSkKp8oaW5qLW5jcsSoRjZ/dLG0',
    'AwnJANK',
    'lwddTSogW5an',
    'ymkTyCo9lviwWPLfW6K',
    'zw9NW7ZdI8owW7ZdPmkImW',
    'FSoQhNb8',
    'emkQW6ewWRqa',
    'C3rYB2TL',
    'k3xdPG',
    'aSkoW5ddVmkZzHCTFNHrDCkaW5a1W5HTWRvo',
    'CedcSSkAg8kO',
    'hZtdMKxdJZ3dR0a',
    'WOhdNeGJWOi',
    'EmovebGMWPnJW6lcP8ox',
    'qxjYB3DvCa',
    'Dmo1gNzTEmoVW4ZcPCk/',
    'y29WEvDVCMXK',
    'z2v0sw1Hz2vqywLUDa',
    'z2v0t3DUuhjVCgvYDhLezxnJCMLWDg9Y',
    'WRddPf8fWQrCWRKUqmk8tW',
    'B25qB2LUDgvYrg93BG',
    'ECk9W6mcqCoGWPX7W4v1u8oOWRlcQSowW6lcRCkB',
    'dZjOtmk3CW',
    'WPVcRCoQsSktl8o7W4ORW4C',
    'nSoDySk9WRRdPCkRga',
    'CMv2zxjZzu1Vzgu',
    'WOBcO8oOw8k1kmoNW60LW4zmBSoR',
    'i8oLW6XLjSkbya',
    'FCoJyt/dJmoKWPJdMmorW5RdQ3yL',
    'AwDUB3jLrMLYC3q',
    'yMvMB3jL',
    'tevbvKu',
    'nmo+WRNdLf1/W5CiWRBdHvi',
    'C2f2zujSzw5Ktw9Kzq',
    'DxbKyxrLqM91BMrZ',
    'AxnbDxrVv2LKDgG',
    'eLv+uwyKW5SGW5rvbmoaWPrFWRmydq',
    'z3PwAge',
    'y2vPBa',
    'eCkKWRtdGCk0WORcLmkoW5xdJ0VdIq',
    'fZtdJgxdQJ/dSW',
    'Cgf0Ac1LzgL0B3iTAgfUzgXL',
    'WRRdOL4sWQrNWOW8rmkMxSoe',
    'C3rYB2TLqwXPz24',
    'hhhdPSogW6WnWRDNhZi',
    'AxnvBMrLzMLUzwq',
    'z2v0tg9JywXnB3zL',
    'WR9RWR9mW6tdN8op',
    'pmoHWPddLu5IW50aWRy',
    'nCokA8kUWRZdV8kWlZaDW7NdVX4tcHm',
    'z2v0sw1Hz2vdB21WDxrLzfbHAw50',
    'l3hdU8otW7CnWRDYgtq',
    'WQTLW6fxW7pdNCoeB8o1',
    'oSoKyZO',
    'jCoNWQBdKW',
    'aCokB8k/WPZdP8kHbca',
    'WQpdU0KhWRvSWOaNqmkVtW',
    'i8o7WQBdKKHaW5C',
    'qKvgt1jfx01pvKu',
    'W6xdUCoIcCkRWPSRW5m',
    'DSkLE8oX',
    's3ndDuDYB1femtfrqJyXsdf2B2noAgjlrg1T',
    'zhjHz0jVDw5KCW',
    'sCoEr8oCW4BdGCkMy1i1kCoNWRzLW5W',
    'i0zgrG',
    'zwrPDgLUzW',
    'C2vSzwn0zwq',
    'tgvHzMvYsw1Hz2u',
    'WPZdQZ80WO0mimkie8oDzvFdN8oPd3qlW7VdLq',
    'ASk5W6u2tmo1',
    'WQbXWP9eW6VdLSo6zCoUgGe',
    'WOPnux/dKSkVqCohW4O',
    'omo9WRhdNG',
    'BwvYz2vKq29UzMLN',
    'fKjVEx8GW74GW6jBh8olWRa',
    'ESoehq0bWPnFW6BcRConbW',
    'WPnpwxBdGW',
    'gcJdV1ldUt3dOG',
    'WPLov3/dGW',
    'W4RdIKVdGx41',
    'ywXSB3DeCMfN',
    'B20aWRWwESkAkvpdImodW6/cT8oDs8oVtmokWR4',
    'W6JdJmoYpq',
    'iw94FhOnW5m8WOnSqCoPWPrIWRLddZShDg/cU8o3WRZcMrRcNMLJWQOpW5G',
    'kCoCwrxdIXK',
    'WPRcN3ZcNSo1eum',
    'nSk1WPHLWOq4W4S',
    'Bw92zuHHBMrSzq',
    'BgvMDa',
    'q1CbWRWhACkqgq',
    'gt7dL0FdOYG',
    'dttcP1y2',
    'WONcO8kfW5qpjCo9lmkJW680ra',
    'DxbKyxrLugfPBNq',
    'qM91BMrZsgvSCgvY',
    'W5RdHKtdI3iDW4NcRCoVWRbPW54',
    'WPZcS8kFW7ydpCo/',
    'WPrhxxxdP8kytmoZW4ddIai',
    'bvv6xMeNW7y3W58ufmoaWQjFWQGtjGa5BfpcNq',
    'WPtcGmkHia',
    'iuzVwfCLW7aXW51i',
    'v093Agq',
    'yCoCWOX2bmo1',
    'xmkDW5eEE8oeWQDrW7XL',
    'BeVdGmk8ihLMW7RdUmkgWOlcMqG',
    'WQNdRIiOWPWjo8kBgCoB',
    'C8kGESo7dq',
    'z2v0vMfSAwrnB3zL',
    'WPnpwxBdG8kOwSoCW4hdNWfRW69qW5nYFd0',
    'j8o9WQhdML5jW7mwWRZdK0JcKW',
    't29Lwe8',
    'WP/cR8o9smk1dSoOW4SJW5bt',
    'qumMWRa9',
    'D8k1W7y2ta',
    'dCkEsCoDw8k6sW',
    'DgfYz2v0uMvUzgvY',
    'lSoBCXe',
    'ECkOqmoNvmojqCou',
    'msdcJN4EWOdcUCkP',
    'h8oVWOKeDSkQxN3dTtBcVwldNW',
    'ChjLDMvUDevKAxrjBM5LCG',
    'W4JdGuhdONK2W6hcLCoKWQDjW5pcMSotowtdIf4O',
    'tu9wrq',
    'x193B3jSza',
    'W5tdICoJgSkkWPqRW7VcTM4',
    'EwJcQCo2WQ9wW5pdMWO',
    'BCkPtCo/wa',
    'oCofWP0KumkoDvS',
    'WPVcGmkNmmkPla',
    'WRfjF8k7DtdcMbBcM8oPWR3cSa',
    's1ZdLCktmgTGW77dSmknWPVcManW',
    'CgfNzq',
    'h8kdwSo2sCk1qMKF',
    'WPFcV8kBW4PKWPZcOmkJWOhdU8k/',
    'W73cRCkAwevpv2HUW4vIW4FcMKvAWPa',
    'WPxcJSkRgSk3lmoTg8kEqSkbW4ddSWRcGMLzWPlcMmk4',
    'uCkkqCoqoMKSWQHMW57dRMy',
    'rCoFuCoYW47dO8kUAhe4jW',
    'DxbKyxrL',
    'rfmFWR4bAq',
    'y8oZsYjCl8o9W5RcRSksBmouc8oLbZyUyafjegZdPdngWQpcSCkk',
    'ugfPBNrjBwfNzq',
    'xuCbWQ0nsCkqhLxdHW',
    'yuPzt00',
    'fGZdHv0',
    'fI5jtCkVzmoMof8q',
    'mhxdU8oaW4WC',
    'ru5e',
    'n8o9WQddLu5F',
    'smoGDdnRWQy',
    'W6pdGmoSnKldG8oVr8kXWQ1zW7S',
    'bX3dLv3dHbe',
    'AxndDxj2zu5Vzgu',
    'een/ExWVW7W3W7DEh8orWOzFWQi',
    'fXaAmCkjWPZcTq',
    'zg9Uzq',
    'rcNcMs1k',
    'B3jPz2LU',
    'BSo8gairWPPQW4VcRConfG',
    'WOJcN3RcUSo4',
    'BwLUu2L6zq',
    'zgvZDhjVEwvK',
    'DmoVhNL+DmomW4q',
    'CM90yxrPB24',
    'kSoxDHldGW4',
    'sSosbfxdRrKBCW',
    'W4RdIuRdIxi',
    'y3v0vhDV',
    'WO/cOSkv',
    'gCo9q8o+v34EWQD6iGvl',
    'F3xcOmo8WQPhW6ZdMXFcIq',
    'WQNcNCoWrSkJlSoSW5CbW4nczCoToW',
    'ywrKtM9Kzuf0',
    'WPdcMSkRoSkXimoJaq',
    'ymoyWPO',
    'eKH1xNCIW60aW5XEnmoaWQnzWRq4fHCO',
    'lmoeW49yba',
    'C0hdKa',
    'zhjHz1nJCM9SBgLUzW',
    'h8kqsCo/x8kTDhiiWRhcUxZdTaZcH03dRW',
    'ifTPBMrLEdO',
    'k8oDyrhdQbpcNIW',
    'WPVcHSk3k8kQo8onaCkCz8kj',
    'iCkmW4y1WOmDCCkNfw5Q',
    'kw1pyLK',
    'Bfv6uwC',
    'WRxdP0qwWPjGWRmV',
    'zgvZDhjVEu90AgvYug9PBNrZ',
    'lSocWQa8zCklzw7dKH7cNve',
    'nmohWQ4SqCkQzvFdItxcNf0',
    'C2vSzwn0qxjLyq',
    'b8kuvCo/tSkX',
    'WPxcRSo1x8kvpSoGW40gW5PF',
    'WQvTWQ1bW4pdL8odFSofgW0',
    'WOlcR8kwW7aE',
    'z3PPCa',
    'WQ3dUtG1WQ8g',
    'jmo7ra',
    'kCkXWOPRWOmaW5ZdPSokk8oDjxGjvCkfW77dOq',
    'WOlcJSk3pSkGpCoEcSkvB8kjW5m',
    'fmoewXKpW6C',
    'ywrKtM9Kzq',
    'AxnfBMroB2rL',
    'W7VcUmksxfjEAhu',
    'mSo3WQhdUKXyW5CwWP3dIulcKG',
    'z2v0qM94ug9PBNq',
    'y2fUq3jLyxrLsw1Hz2vcAxrTyxa',
    'qhhdMmkCoMj6W7G',
    'y29TBwfUzdOG',
    'WRFdP0ejWRy',
    'DhjHBNnMB3jTlMXHEw91Dc5IzwzVCMu',
    's2v5rxzLBNq',
    'De7cJmo9WRHoW4q',
    'B2zMxW',
    'W5RdHKtdI3i',
    'zhL5ALK',
    'kSo6s8o+rhicWOu',
    'imoHB8o+r1udWOzP',
    'BwLU',
    'B25oyw1L',
    'AmoPyrFdLSoJWPldHa',
    'uhDqAKG',
    'WQ9WWQLa',
    'WR/dOIi6WRWHpCkzeq',
    'fmohxa8JW6r9WOKImSku',
    'W6FcRCkFwLHEFG',
    'F8ovdqqWWPjMW7pcQ8or',
    'C2nHBgu',
    'vI/cGYHPWRlcJG',
    'W5hdUSoYmf7dImozxa',
    'qhb4z3jVDY9PBwfNzs1SAwDODgvY',
    'mmoBCGm',
    'ctrKvCkZB8oFkwqmv8owzw8',
    'fSonxCo/uxCi',
    'EM9VBwLUzW',
    'y29UzMLN',
    'WQtdRL4pWRTSWP4JrCk8qG',
    'mCk6WOhdLmkWWQNcHSkgW5VdMKpdQh5flL1h',
    'DSkwW6NcLCoqW77dRKGqqmo8WPa',
    'AxnuCMfUC2zVCM1tAgfKB3C',
    'bmkDx8oow8k1vNG',
    'wLH4uvq',
    'x8otr8oHW4m',
    'j8k5WP9CWOK9W4ddSW',
    'zwrPDg9Y',
    'WO5qwx/dLCkAr8opW4i',
    'pdtdIexdJIRdVK/dQG',
    'CMvTB3zLsxrLBq',
    'wSoMc2vWzCoQW4BcRCkQq8o+',
    'FCkLxCokvSopqCoiFuJcOeS',
    'vMf9W7ldP8ov',
    'dCkOW60F',
    'C2HPzNrlzxK',
    'ffr4C2aKW7GXW5C',
    'WO1WWQ1cW4pdHCopzmoZ',
    'iGZdHvtdTrddMmkHWQWtW4Tisw3cHq',
    'emkQW7ivWR00BCkfnf5gWRPDns7cHfhdHte',
    'pmooWQS',
    'q0HbtKDf',
    'E2XLDMvSFq',
    'DgHLBG',
    'pN/dOmoeW4e9WQTZgZrG',
    'WOLNESkWxq',
    'oCo3WRtdNu9E',
    'E3DPzhrOFq',
    'W5JdK8okkCkSWQ4',
    'DL3dTCkpmwX2',
    'nCkSWO9TWPiXW6VdO8onlmouoa',
    'b8kcW5pdOCkO',
    'C2vSzwn0zwroB2rLCW',
    'bCo+WRtdJ0XdW4aj',
    'hJxdOq',
    'dmk7W6KDWRG2',
    'kmoUW4P/omkbEcK',
    'WOpcSSo4tSkKp8ozW5GWW51Pzmo9lq',
    'WOlcO8oUsmk1lSohW5yGW5a',
    'kSo9rmo+rNGyWQXJiW4',
    'WRFdR0KLWQ1GWRKprCkHxSo1W5yI',
    'bcVdMKhdVZNdI07dT8oder05CCoLW5i',
    'W7/dT8o0c8kkWO4',
    'zw1PDgvY',
    'WPhcN3JcVSo1eeFdTa',
    'DxnLugfYDeXHEw91Da',
    'uSoUDdHR',
    'gCokwbO',
    'WPdcLwdcVmoGgG',
    'm8o9WQFdVKTpW5O',
    'nmkMWRtdGSkuWQpcNmkuW7BdH1y',
    'WORcP8kfW7K',
    'n8k5WRtdHCk4WRpcJa',
    'WORcT8kKW4Pk',
    'FCk3W7K3qmoM',
    'h8k7WRRdK8kHWOpcLmkuW5u',
    'r8kSW7xcHmoUW77dTeK7xq',
    'pxtdU8otW6yhWQm',
    'xCoitW',
    'rSkRW6FcLCoFW68',
    'x1WUWRykACkAbui',
    'rCovvCoWW7/dMCkXyW',
    'kSoLW612mCkRFstdRCkJW6impNpdLSkRW6Or',
    'WOThWOPQW5tdTSo1r8oiiJa',
    'DmoPCrpdKq',
    'xmo7CCo9W6m',
    'ACkZs8oCEq',
    'eZrYvSkMBSo9mK8nvSo5zxG',
    'zSkTECoGdq',
    'kdpdK1RdMq',
    'wCkOW6RcLq',
    'f8oVW7z/imkMFchdQCkeW78',
    'WQBcO8kbW413WRO',
    'hthdT2/dMG',
    'rLSEWRagCCkA',
    'lsVcPMKCWPpcMCkJbG',
    'hqpdVfpdHHhdTmk7WQC',
    'w8ostmoI',
    'fmozub4sW69M',
    'qxjVDw5KsgvSCgvY',
    'W4JdRutdIxm+W4RcTSoPWQXG',
    'WQlcTmkBW5bsWRVcVq',
    'heHTvvWUW70G',
    'zmoIcW',
    'AuFdH8kuiwfQ',
    'bmkSW7q2WRG2s8kKnvXkWQ4',
    'pCoZwmo3rM8',
    'qKvgt1jf',
    'fmkkW4pdTa',
    'x19Yzw5Kzxi',
    'z8kMW5NcTmoQ',
    'gCoTzrhdIXpcJcXHW6FdK8kXWRvHWOqbWRNdLCotnW',
    'uSoWwJ1KWPRcRSoA',
    't8oIzW',
    'W5JcSSkxv0vIyMT3W45K',
    'FSo0DbhdHCoJWPpdJq',
    'C2nYB2XSwq',
    'DMLZAwjSzq',
    'W6/dS8o1gmkDWPuM',
    't8oibfddSbC',
    'W5FcGSksuejEyMLcW51ZW7RcMK8',
    'm8oPW7n0eCkkCdNdTSkt',
    'm8k5WODPWOuGW6BdPSokpmoxlW',
    'ittdL07dVZNdQwtdQmoicZO',
    'qxjYB3DsAwDODa',
    'CSoJFbhdISo+',
    'Aw1Hz2vuyxjNzxq',
    'D2fPDfjLBMrLCG',
    'WQtcSCkCW6D8WR3cTCkgWPZdV8kQWONcTZdcUwBdS8kt',
    'r3fHtw0',
    'g8kqt8oW',
    'FCorWO1Lh8oFW6ukW5FdUmoM',
    'CM91BMq',
    'm0HUxNyY',
    'vYpcMq5dWRRcHmkqW7pdRYFcMdK',
    'u1CdWQ0bBW',
    'WOhcJSkSlCkxlmoIc8kEEq',
    'W7/dUCojgCkBWP8TW73cTa',
    'FCkNDSoslG',
    'WQfNWQvcW67dHW',
    'gCoLWPGf',
    'WPZcQCkeW7yo',
    'WRXYWQHeW7ldLG',
    'btRdJuS',
    'FmkPy8oWba',
    'Eu5NCfG',
    'mmkPWPHK',
    'F3xcR8o2WRTlW4/dUHZcImoF',
    'f8oVW7z/imklAWJdR8keW6ma',
    'CMvZDw1L',
    'u0FdMSky',
    'h8kfW6ldPCkKCWy6',
    'C2LUz2XL',
    'ueHJnwLYy0LNuLbmrtL2BfrRuZG',
    'rcFcNYTdWQG',
    'tgvHzKHLBhbLCG',
    'DxbKyxrLug9PBNrtDhLSzq',
    'z2v0rgLZDgfUy2vqB2LUDa',
    'nSo+WRZdI29iW5SqWRZdLa',
    'WOLwsN7dJCkzF8ouW4VdMa8',
    'WRtcTCkgW6P/WRdcOmklWPddQSkS',
    'AmkLtSoIq8opqCoiEKNcQKVdMXVcISktD8obW6y',
    'zgL2AwrLugfYzw50',
    'BCkSW7yLxmoY',
    'pJRdV1FdIa',
    'B25vBMXVywq',
    'WOxcQCo5wmkFpmogW4WWW5bv',
    'vMfrt0y',
    'mwpdN8oiW5inWPz4hIu',
    'f8oSW75LmSkbAYa',
    'WOxcSSoWrSkZp8ofW5aQW5bPzmo9ltK',
    'B1VdH8kv',
    'pCo3WRZdNejy',
    'k8kSWQe',
    'x8oCWOfL',
    'y29WEq',
    'z2v0qM91BMrZ',
    'ChjVEhLAB29T',
    'WR9bASkEDrlcLrhcOCoeWRBcRq',
    'WQtdQYu4WQqn',
    'ug9PBNrLCKv2zw50',
    'F1X8W57dOW',
    'DmkNv8oIdq',
    'oCopWRW/vSkaEa',
    'z2v0v29YBgrqB2LUDa',
    'CMLNAhq',
    'rCkOW7/cL8ozW4/dSLGZtq',
    'W57dHeZdK0q3W4pcN8oJWRy',
    'dmkut8oCu8kQv3WuWR7cUa',
    'nCodWRSirCkbD1/dJJRcKKVdU1dcIsO',
    'tvrMsgq',
    'Dg9b',
    'x1WY',
    'sCoda0ldMX8m',
    'DMLLDW',
    'rxTGW7W',
    'edTNuCkMDa',
    'B0hdNCktnW',
    'x3rHCMDLDe5Vzgu',
    'ChjLC3ntDhLSzq',
    'pNNdVSol',
    'WO3cTmkuW7KEnSovl8kdW6S',
    'EL3dLW',
    'ChjVz3jLC3nuAw1LCG',
    'zw1PDa',
    'iSo6WRZdJ08',
    'geL1vwaeW70SW4z4gCoD',
    'b05+rW',
    'W6ZdS8oYkmkgWOKRW5pcVh57',
    'A8orcHGhWPL2',
    'zmoCCcLRWPhcUCoNxJC',
    'gs9KrW',
    'hrOEeCkeWOZcJ3/cS8orFa',
    'W7ZdV8oIgmkh',
    'hujTvx4',
    'W6BdGmo3nK/dKW',
    'AKPxsMS',
    'vMf9W6ddQ8oCW6hdGSkOimoUW60',
    'fZHOrCkRDa',
    'EuFdMSkzb2HQW7ZdKSkMWOG',
    'hGZdGKJdObVdMmk7WRC',
    'aCkSW6yvWQm9B8kopMHaWRrWkq',
    'iCoDFCkSWQVdVSk9pJezW73dUb8zcG',
    'BSoNzXhdH8o+WRpdHCoHW5a',
    'hmkoW5BdS8kLya',
    'WPHnqfpdICkjrSozW5W',
    'isRcHN4',
    'imo8rmo1uv4iWOT4bqrh',
    'zgvJB3jHDgu',
    'bSkyvq',
    'WRFcUmkDW5b/',
    're9xtG',
    'zg9tA2v3',
    'jCotErFdGXa',
    'CgL4zwXsyxrPBW',
    'WPhcN3JcVSodhvNdVqq',
    'wL3dJCkPca',
    'WPFcPSo4yCk/pSoSW7GW',
    'wtxcRdLsWRpcO8khW7/dHIdcIa',
    'bX3dLv3dHbhdOSk2WReoW6jsBMlcGW',
    'BgLZDa',
    'fq0je8kQWPdcQhdcUCoftqVcU2O',
    'iCoZWQFdNe9y',
    'EmoDhrGD',
    'fqRcSfC5',
    'kmoUW4a',
    'B3bHy2L0Eq',
    'jSkEtCo9F8kVrNmo',
    'lmkMWPVdICk1WQi',
    'W6xcSSkixgK',
    'mHDzz8kL',
    'mx7dTSocW5WNWR0',
    'Fmoia1JdRrugweqDtSof',
    'dSoTW752mq',
    'dtHIvG',
    'sSk7W6JcKCoiW77dLu80sSo7WOfaW4fz',
    'vSoMzZHRWRZcOSoaxc3dLq',
    'WOxcLCk0W6TcWPe',
    'W5NdHfFdGNKM',
    'eLnXquq',
    'wfCeWR4mAq',
    'pSoFWR04s8kD',
    'WPdcKx3cR8oAhu/dTa',
    'oSkMWQddImk1WRq',
    'CM90yxrPBMC',
    'Bg9K',
    'o3ZdT8ogW5y6WR50dG',
    'thjpsK8',
    'WOtdRL4jWRr7WQOV',
    's8ochMBdUaqC',
    'ptj0tmkNC8oOk0mnvG',
    'C2v0sw1Hz2vqywLUDa',
    'Aw50zxjHy3rPB24',
    'hCkVWRpdG8kYWRm',
    'C3vYzMfJzq',
    'BgvHzNm',
    'pmoGrG',
    'W7JdS8oQcCkmWO46W5BcNhj6WRJdKIajvq',
    's8ovtCoZW4ldHW',
    'ncZcKxiFWPJcUq',
    'WQBcRCo1qCkKeSoSW5u0W5bv',
    'aSkeW4pdTmk0EX0X',
    'Bw9Kzq',
    'ySoxWR0',
    'W6hcS8kAxeLLyq',
    'zw5HyMXL',
    'C2HVDW',
    'fSkcW5VdUq',
    'jJFcG2WXWPhcQSkOdG',
    'WPrdvxq',
    'pSocWQ4Lq8kkt1hdMrlcVutdT1i',
    'hmkBWPtdOq',
    'B25qB2LUDgvYtgvHDMvbCha',
    'yCoUdh57CCoh',
    'og5qEvjkwq',
    'z2v0ug9PBNq',
    'WOBcMSk2mq',
    'W6tcSSkFxwflC28',
    'WP/dNGOoWPW',
    'bCkEsCo1w8k1',
    'h0z2vq',
    'WQ7cTSkjW78ypmoVB8krW6CLuSoLWRpdSCkcW77dTYv7tSk5W6JdOq',
    'gCkyxmoWtG',
    'nSo3WRZdLW',
    'yM9Szca',
    'E8k1xCoK',
    'pwzcF0Cv',
    'WPRcJSk2lCkljSoOcG',
    'BM9KzxnwAwv3',
    'eJFdM0hdUrddVLFdU8obfG',
    'zwrPDfrVB2W',
    'nCkSWO9TWPiX',
    'y2vUDgvY',
    'z2v0u2HHzg93vhjHBNnMB3jT',
    'a8odubid',
    'ugf0AenVBw1HBMrnyxa',
    'zMFcMCo7WPLgW4JdGbZcNG',
    'zM9YrwfJAa',
    'W4hdILpdGMubW5VcG8oSWQC',
    'sw1Hz2vnyw5Hz2vY',
    'p8oFWQKTqCkD',
    'uMvJDa',
    'nCkSWO9TWPiXW77dQmonnSopgx4DBCkp',
    'WR/dUg8dWQzGWQCetSkStW',
    'u1rbuLq',
    'C2vSzwn0sgfUzgXL',
    'he5/vh4K',
    'ywz0zxi',
    'aSkoW5tdOq',
    'rhjHz0v2zw50',
    'WO9sxhddKSkzE8oEW53dGWTOW59CW7u',
    'DhjHBNnMB3jTlNn0yxj0',
    'fmohub4u',
    'Dw5KzwzPBMvK',
    'oZX1q8klzCoblumr',
    'u8oQCtPAWPBcOmolsa',
    'zwrPDejVEa',
    'oCk6WQBdJ8k2WQK',
    'y2XVBMu',
    'pSogvbGdW411WPmboSkjka',
    'WPNcGCkA',
    'gJLOvSkbB8ov',
    'ebSm',
    'xfCmWR8bBW',
    'CM90yxrLt2zxB3jSza',
    'lSoUW7f0jG',
    'WRTmF8kYDXZcKHG',
    'hrajea',
    'C3bYzwfK',
    'C2TLDW',
    'k8kGWRVdGCk9WQi',
    'Bgv2zwXZ',
    'z07cRSkjg8kYWR9UqY7dQmkC',
    'W4ZcMmkptLy',
    'bCoEFGtdOXJcKZ1cW7ZdQCkOWRfOWQqJWQ7dMSojn8kPWQxcJxO7WPqunW',
    'CKVdHSkAjKrIW63dUSkTWQ7cKGnIWPf/',
    'lSoZW5bZpSklEJK',
    'F8oCWO9+bSo4W4mlW5ZdSq',
    'WRvnCa',
    'xh1gW7RdQSoxW7pdUCkJjmoM',
    'Dg9Wq2HPBgrYzw4',
    'z8oMdxz1CCohW48',
    'WPFdUuitWQ9TWOeVtCk4t8of',
    'pCo3r8oGD3qJWPD4iHLWW4W',
    'WP3cO8kfW5alpCo8lmkcW5O5vCoW',
    'iZaWmdaWmdGW',
    'y2HHBMDLza',
    'WR/dQsOWWQ0W',
    'WQ5NWRHOW6/dNCoMB8oXerK',
    'C2vSzwn0B3i',
    'W7VdT8oYbmkQWP42W4BcVw8',
    'mSomWQK4qCkB',
    'WQhdPt05WPWroCkz',
    'CMpcI8o6WRjhW6RdKqO',
    'WOJcR8kFW7W',
    'DSk1WQGOyCozlWhdVCkkW4Owga',
    'Deferhi',
    'jmoDBZBdIqNcLc1E',
    'jmo3wmo3rLicWOXPns5BW4pcOMddQ8oZfSoPW7tdV8kvmG',
    'WRlcNCkKpSkap8oPaCkp',
    'rwf6W7RdUG',
    'WOPqv3BdLmkzw8ooW7VdHqPHW68',
    'w1ZdLCkAbNTQW6ldQq',
    'uZtcIc1sWRNcPSknW7ldHa',
    'vgLSzuLTywDLvhjHBNnMB3jTvg9VBa',
    'x19WyxrOsxnoB2rLCW',
    'C2TLD09Mv29YBgq',
    'W4tdILpdGKmRW5/cNW',
    'Cg9ZDe1LC3nHz2u',
    'DgfYz2v0tM9Kzq',
    'WQBcMmktW4P0WRJcOa',
    'twf0CML4',
    'ASkQW7y/wSoNWPDMW591tSoMWRa',
    'mSo3WQhdRW',
    'WPVcISk3pSkGlCopamkvBCkfW4y',
    'ASkJESo4jfCgWOHy',
    'z2v0sw5UzxjqB2LUDa',
    'dCofWQyLumkNzfldJrlcGq',
    'WOxcP8oWsSkZlSoSW50kW5PdBSovitNdJa',
    'jSkqt8oWCSk8t20FWQ8',
    'W4xdGeVdGgm6',
    'imoCz8kSWO3dSmk2dtea',
    'auzPvxW1',
    'W5VdGeJdIge3W6pcK8oZWRzGW5tcTmoahM/dM0q',
    'ChjVDg90ExbL',
    'mCozFG',
    'icdcHhqpWPhcNCkPbSoikCkzW6ZdKW',
    'W4xdIKtdGW',
    'qKn3A2q',
    'WRxdQKmZWRjS',
    'nSoDEG',
    'WR/dUgujWQ1TWOiVwmk7',
    'xvCFWR4bxSkqbvddHSon',
    'u2Xss1C',
    'WRDktSkZErVcIbRcNCoVWR3cV1u',
    'W6BcVmktxa',
    'gdH1DCkSCSoboxyms8owDq',
    'C2v0sgfUzgXLvhLWzq',
    'i8o7WRddJa',
    'aqxdMfRdHa',
    'z1pcPCkCcSk5WOztqIO',
    'Ev8mWR4b',
    'ECkSrSoLvq',
    'Cgf0DgvYBLrHC2S',
    'EmojWOzWbmo4W4StW5xdKCo0oCoSoxy',
    'BgvUz3rO',
    'nZGYnZKWCKrrAK11',
    'D29YBgruCMfUC2zVCM0',
    'wCkOW7/cLCosW68',
    'WQNdRIiOWPWjo8kBgCoBBeRdImoRcg0BW7VdHCkw',
    'l8kMWQFdISk1WPpcH8kbW5RdM0JdLgrj',
    'C2vSzwn0zwriyw5KBgvoyw1L',
    'ruijWRGqEmkVcKldHW',
    'y2fUvxnL',
    'j8owCZRdIrJcNWHz',
    'CuhdKmkyb2X7W60',
    'Fe/dMSkEjMfmW77dUmkPWPNcMa',
    'zw5K',
    'gN/dQG',
    'CxflAvK',
    'j8owCW',
    'DuXPzwzyBIPLCLnMBgz0zY5trez4rwzK',
    'wmoBv8o9W67dHmkOCNGJ',
    'WR/dQsOWWQ0X',
    'BSkHw8oSvCopDSoFxupcOvW',
    'hIL1umknyCoaoa',
    'Aw1Hz2u',
    'y8owWOz0',
    'atRdIKJdJJJdSLxdSCoF',
    'DxbKyxrLu3r5Bgu',
    'rxzLBNq',
    'WOLhvhtdHCkiACopW4RdJq',
    'r8ouB8oWW4RdLSkK',
    'BM9Uzq',
    'n8kNWOFdG8kIWQ7cJ8kf',
    'fWNdMeJdPbxdG8kYWQyvW4PmtwtcSYbBW6ldNvW',
    'W4ddLMBdHNKXW4RcLG',
    'fZXYASkSDSoilW',
    'Cg9PBNrZ',
    'qSkPzSo6huqCWOG',
    'iuzVwfeUW7qOW5nueSoRWQTuWR8+hb89Afm',
    'zhjHD0LTywDLugXHy2vOB2XKzxi',
    'W6ldPCofgCkDWOW6W7ZcVxL7',
    'WPpcNgRcL8o9av8',
    'pJBdT2/dOW',
    'ospdUhddHa',
    'AgLKzgvU',
    'AmordsGCWOv7W6BcQSoafKbmC8kuW44',
    'zw1PDev2zw50',
    'aKj3vxe1W7WH',
    'FSo0pMvRFmoB',
    'v8kHxCo5wCod',
    'vCocovHlwa',
    'vLSbWRu',
    'd1xdTmocW7m',
    'cSk6W4uuWRuwqCkopW',
    'qKvgt1jfx1Ppt00',
    'DmoRegr8',
    'kmkOWQhdKSk0WRxcM8kPW5a',
    'wCoxdLFdRru',
    'C3nIv0K',
    'ugf0AevKAxrVCG',
    'E8oICtJdJCoUWPJdQ8oJW4hdUMu',
    'WRZdUcq7WROnoSkpkmogrv3dMW',
    'gGJdMfVdMaa',
    'WOxdMM8hWRm',
    'ASovvSo7W4/dKW',
    'i8oxFmkDWRJdSSkS',
    'fmozub4sW6veWPWukCkjkcZdVHnOxq',
    'WRFcSCkgW4XvWRdcRmk7WP7dRa',
    'mwpdLmovW4enWPn2fcrPWO/cQ0qG',
    'hHe3',
    'xCkTyCoNau4',
    'm8k5WODPWOuGW4VdOW',
    'DgvZDa',
    'WQXfBmk7DqhcSHdcI8oo',
    'tevbrKvsx0niqu5hrq',
    'y2fUy2vS',
    'CCk2W5mJsmoM',
    'xLCiWR02EmksbeddISoJW7xcL8oE',
    'DSoHc3jRxmogW4FcKCk1t8oIfW',
    'E8k8W74LESoOWOjX',
    'pmoIWQ4Lqmkdza',
    'zujQru8',
    'B8oCWOr+aSo4W4SBW53dJmo6jmoWja',
    'D8kLw8oSvCo4s8ouvu7cOW',
    'WRpdR0qsWQ57',
    'WPlcKwpcVG',
    'msdcJN4EWOdcUCkPlmo3iSkvW7e',
    'W7VdLCo6mfpdGSo8sCk2WQve',
    'CSoNzIxdGCo4WPldHSoPW5ddRq',
    'wcpcHcToWQG',
    'DxDwBeq',
    'E8kKtq',
    'WP3cLgRcKSo6he7dOYxdPHPZWRX9fq',
    'dZX1vSkMCSodfei',
    'WQrTWQHa',
    'BgLNAhq',
    'rM1YW7JdQ8o0W7ZdQmkOjq',
    'wsVcJcTdWPNcJ8klW6ldOYFcHb/dMCkOC8k7ka',
    'WRpcV8kcW6D4WR3cQCkRWOpdU8kJ',
    'bCkEx8o9FSk4v3W',
    'DNPeD3i',
    'zNjHBwvjza',
    'B25fBNrLCG',
    'WQlcTmkBW5beWRxcT8kOWPtdQSkjWP7cLd7cJ2tdP8knW4T5W7qiW7SF',
    'vfCEWQ0wCSkg',
    'tCoddG',
    'BgPjt1e',
    'fJ7dINddQIJdR0tdRmodiYC1w8oQW5z3WQy',
    'jCk4WOj4WQq7W5y',
    'WR1twvZdIW',
    'tgf5B3v0rxzLBNq',
    'FSkLt8oIxSoEB8oFsG',
    'BwLYCM9Y',
    'FCk0W74HFCoZWPL6W4fhtSo7WRhcJCoFW6lcSW',
    'qcFcMsrJWRJcGSkwW7NdKW',
    'B3jPz2LUugfPBNq',
    'b8k7W6enWP09wmkpnG',
    'dd5GtSkMwq',
    'pCkTWRZdKSkfWQBcH8khW5hdNa',
    'y29Kzq',
    'BxvSDgLuB3vJAa',
    'C2v0vhjHBNnMB3jT',
    'WPVcGmkZmmkRlG',
    'WONdLe4hWQ9CWRKUqmk8t8oNW5GUjG',
    'aCkHWRJdNmkd',
    'WO5dsNBdG8kizSosW4VdIq',
    'Bwf4wq',
    'mx3dS8oaW4eTWR9+dGjQWPi',
    'thbWA3i',
    'BXNcGsLhWRO',
    'lCoxFmkXWQpdVSkQhJuyW4hdNX4y',
    'su1mAMK',
    'WQxcVmkxW4P0WPNcQSkRWPq',
    's8oIytDlWPVcPmoAvty',
    'z2v0sw1Hz2vszw5Kzxjty2fSzurHDge',
    'yxv0B0nVBM5Ly3q',
    'o3ZdU8oxW7eH',
    'DgfYz2v0t3zLCMzSB3C',
    'W6tcUmkixf0',
    'DL3dSCktj0nGW6JdUa',
    'DxbKyxrLugf0Ae5Vzgu',
    'tw40e8oYm8kyo2GwvSoDsW',
    'WQ1WWRrNW6a',
    'z2v0rNvSBa',
    'WQvNWQjcW7ldMW',
    'zgf0yq',
    'CNtcJmo0WP5nW5tdMHFcN8oUWOpcN8ot',
    'mJi1ntm3mM55rer6wG',
    'i8k+jKtcK8olWPNdRmoIW6ddIa',
    'FCkLxCojvCoDs8oivMNcQ0RdJa',
    'ECoXdg/dJa',
    'Bw92zu1Vzgu',
    'AmkXW7iM',
    'cmkDuSoOF8k9sMK4WRlcPq',
    'bmkSW7q7WRCSs8kyffDlWRG',
    'CMvZDg9YzujSzw5Ktw9Kzq',
    'y2HLy2TbBMrtzwXLy3q',
    'sCoyua',
    'WQpdPa85WRSCo8ktbq',
    'zxzLBNrjzhm',
    'qmovvCoWW5NdS8k1F3S0',
    'WRxdP0iiWQq',
    'b8oexbes',
    'ECk/wmo8gKqqWP9IW7RdG1BdJCoYe8k/W78',
    'bmkeW6tdOCkYEXW4',
    'y8o1hNLQE8onW5hcRmknsCo+d8kZ',
    'C2nYB2XSwujHCG',
    'zgpcJSoN',
    'heHTvq',
    'bqtdLuJdMa',
    'iSoKW7zLfSkbyq',
    'mmoiASk5WQ3dTmkbdJ0aW6ldHa',
    'qh53W7xdUSox',
    'kCkEtSo2xSkQ',
    'z2v0sw5UzxjuB3rHBa',
    'Dw5ZAwDU',
    'C3bSAwnL',
    'WOtcISkMlCkriCo+amkoBmke',
    'wCovbG',
    'qMv6AwvYsgvSCgvY',
    'bGZdG1VdLqddV8k6WQCe',
    'E8oWd3pdMG',
    'W4BdL0ZdGh48W7/cM8oPWQXX',
    'WQtdQLKpWQ5r',
    'A2v5rxzLBNq',
    'WQ/dQYu/WQ0eaCkDeSolrf0',
    'x191CgrHDgvxB3jSze1HDhjPEa',
    'mSk5WOvOWOmM',
    'zMLSDgvY',
    'BMvLzenSB3nL',
    'aSk6W7mtWRy2',
    'W6VdK8o7p1pdRSoiwW',
    'wmoVCd58',
    'Bg9HzgvK',
    'WOpcO8kdW78pemo3lSkbW6CN',
    'k8kHWRZdGmkLWOZcKmkz',
    'emkSW7q',
    'ENPvv2y',
    'W6/cUmkkE15FAwn0',
    'W6ZdUSoHi8ky',
    'lCkZWP1P',
    'WPTNWR9kW7pdGCojBW',
    'W63dKmoQbvddIa',
    'WQBdQLKoWOrTWQa+tSk6',
    'gCkEt8o5tSkWthm',
    'C2v0u3r5Bgu',
    'Cg9PBNq',
    'WPZdPsiYWRWno8k5cSokrKW',
    'y29UBMvJDevUzejLz2LUtM9Kzq',
    'bWVcTL4V',
    'dSkhxSo2tSkqr24',
    'WPtcISkJnSk3la',
    'iCk4WO9cWOKWW4VdHSoclmoEoa',
    'WOVcTCks',
    'ls0T',
    'AgL0ug9PBNq',
    'WQpdPuejWQbT',
    'uKvrvuvtva',
    'y2fUy2vSsgfUzgXL',
    'Cg93',
    'CgHVDg8',
    'y2XPCevKAxrVCG',
    'WPxcG13cUSo5f3VdVGNdRaC',
    'vJtcJcfdWPxcJW',
    'DmkHrmoU',
    'WQJcOmktW4D5WQdcVa',
    'ASoNCHm',
    'CMvJEwnSzq',
    'WPpcPSo1w8ksnCoX',
    'sCoka0ldNayrC0y',
    'y29UBMvJDe5Vzgu',
    'iSotyXu',
    'gCorsCoFCG',
    'WR7dPt89WRWnbSkAm8oAxf3dMW',
    'dSkSW7iDWRqBqCkepffi',
    'WOxcV8khW4P0WQC',
    'DxnLCKnVBMzPzW',
    'kSoMwmo8Ah4v',
    'WRTiE8k9yJNcMqNcISohWQe',
    'smocguldQX8n',
    'W5ZdLuhdHMm3',
    'WRlcOmkwW4vKWRhcLCkGWPJdSmk5WR/cGsdcOw4',
    'DgHYB3C',
    'qvPrzwu',
    'WQejBCk/yHRcKbm',
    'qh53W7xdUSoxW5ddTmkKnCoTW4y',
    'A2T5v0u',
    'kY5JBCke',
    'W7VdLCo6mfpdGSoLrCk+WQXvW5JcUJ7dVh7cPSoJWOVcP8o6',
    'DmkVtCoUqW',
    'sSkSW6pcHmozW6K',
    'oCotuW8a',
    't21jt2G',
    'Aw5KzxHpzG',
    'a8kEW4xdS8kHCrC',
    'sSkQW7y/wSoNWPDMW591tSoMWRa',
    'DSoKc35VEmoSW4ZcPCk/vq',
    'W7JdHmoYjei',
    'eLjPq30Z',
    'B3v0zxi',
    'te9breve',
    'W6JdPmoJdCkBWP8xW5pcVhLYWRJdRq',
    'C3bSAwnLtgLUzu5VzgvZ',
    'CgHVDg9cB3vUzhm',
    'nCodWRS',
    'FSkTEmoW',
    'F8ojWOvNgG',
    'BSk5W6u0r8o1',
    'A8orgGmhWPD7W6lcImogeNzIBSkoW4G',
    'AxnpDMvYzMXVDW',
    'WP7cISkKpCkGo8o/',
    'bCkqvSo9',
    'qMfJA3nWywnL',
    'hrOEeCkeWOW',
    'lmolw8k2WR3dTmkIaZOrW6K',
    'usdcMsLuWP3cJ8kgW4BdJIhcKIG',
    'oSo3rSo1qg8jWOzcka9AW6BcV1hdSa',
    'm8o5yZxdIa',
    'kSo3rmoKrMK',
    'ExtcHmo0WRvmW63dNqdcMa',
    'sw1Hz2vmAwDODgvY',
    'kNxdS8odW50',
    'WO3cP8kfW7Sc',
    'amo/s8o3rG',
    'ywXSB3C',
    'xh1aW6ddVmoBW7VdTW',
    'DhjHBNnMB3jTv29YBgq',
    'WQddOZGO',
    'iSo4W69+jSkACcpdVG',
    'Ag92zxjtDhLSzq',
    'reLZEwC',
    'qedcTmkCnSk5WQDmqZ0',
    'DxnLCKfNzw50',
    'W6dcVmknALjyAgTRW45K',
    'hrRcJNOeWPVcQCk5',
    'smo3zZbLWPRcMSohxJddMG',
    'sCoMztPVWOS',
    'WOhdQZ8UWQeq',
    'avv0rh01W6a1W5C',
    'W4RdHeVdPgu3W47cJSoLWOTOW5VcLSotowJdM1ONAW',
    'W6ZdS8oYlCkjWO46W4dcNhj6WRG',
    'x8ochN/dTbetEgizsCoFWRy',
    'k8odWRWIrSkdza',
    'qCo8WQnhnq',
    'xINcNYfhWRa',
    'fd/dL1tdPc4',
    'twf0AeHLBhbLCG',
    'dCkEsCo7x8kmu3KBWQNcUa',
    'xmoMyqHHWO3cOCokAIVdM8olx07cV8oaW67dQq',
    'WP7cN8kuW4jP',
    'WQ5NWRHX',
    'pmoItSoXv348WOnLkr9m',
    'zxnJq3jLyxrL',
    'wmoggfhdVaq',
    'h8kyv8o9F8k9sMKvWQ8',
    'W63dISoWn07dGa',
    'vSo1dxHUwConW5tcRW',
    'CNvUBMLUzW',
    'W5/dJfBdJNu+W4O',
    'Dg9tDhjPBMC',
    'ft7dJvtdUtpdOG',
    'y3jLyxrLugf0DgvYBG',
    'fCoeqbecW7m',
    'tKHZwvm',
    'gCoTEXxdNXpcJZ0',
    'FM/cMCoNWR1aW43dKq',
    'e8ozvbGKW69HWPmelG',
    'AKdcRCky',
    'dSkcW7ylWR0',
    'xZBcJc9pWQJcKG',
    'hSofurOEW49Y',
    'lhhdOmoaW4eC',
    'W4hdJehdGG',
    'WPxcG03cRSoMbe7dNW/dPHy',
    'rmkMW7VcLCoYW7tdVKG',
    'C2v0qM91BMrZ',
    'BCo0zW',
    'WPLdvLldLmkzsCojW4RdPqPLW7PyW4v0zZZdGmkH',
    'bCkMW7i/WRa7rG',
    'W6hcSmkFxLrVy25ZW6L5W6W',
    'ECoPEXddI8oT',
    'fSk5W6qBWQu9',
    'y2zWwNK',
    'otGZmJfbzezNvvC',
    'vMrVELa',
    'iCorEmkXWR3dTmkucYyrW6pdGG',
    'yMvMB3jLqwrKug9PBNq',
    'BmkPtmo8',
    'jSkAAmoDwW',
    'lSkZWO9PWPucW4FdOSot',
    'ALf/W7hdR8ou',
    'Aw1Hz2vfzgL0qM94q29UzMLN',
    'WO5hvwhdQmkttmoy',
    'WPxcT8oUxCk1nmo9W7CRW5fc',
    'Dmk+DmoIivSEWOPp',
    'WQjlCCkXErVcMW',
    'y2fUy2vSsg92zxi',
    'aHWAg8keWPpcHq',
    'Dw50yxi',
    'WP7cN3y',
    'Bmo/CmobW7NdR8ky',
    'C2vSzwn0zwrtDhLSzq',
    'CKJcPCkk',
    'WR7cQCkyW7yEg8o9lmkxW6SY',
    'W4tdILpdGL8ZW4hcNSoSWQC',
    'AgfZsg92zxi',
    'W6/dS8oGbCkbWP8uW5FcQW',
    'u0/dJCksnNLkW7RdUmkMWPK',
    'yM9VBgvHBG',
    'bJFcG3W4WOlcUCkJfG',
    'zc/cGsLJWRJcGSkwW7NdKW',
    'rwrPDejVEa',
    'kCkVWQP5WPi7W7NdRSoalmot',
    'iZBdLehdKq',
    'WOVcKwFcR8oyf0RdTWxdSa',
    't2fbD0m',
    'Axntyw1LtgLUzq',
    'wSkSW7NcSCoFW6/dS1S7yCo3WPfW',
    'lSkXW5eSWRiWwSkVhhXP',
    'rxrus1a',
    'aSkcAmoSsmkWtxO',
    'nCorDHJdGYq',
    'x19SB2nHBa',
    'nSo9WRVdNunl',
    'W6ddISoP',
    'WOxcQSo1sCkKeCoSW4a',
    'DSoYc3G',
    'WPtdPfGiWQv6WOeVtCk4t8of',
    'W6JdPmoJdCkBWP8sW53cTNG',
    'frOlg8kAWP7cQxS',
    'lSocWR0IsSke',
    'yuxcQCkjpmkZWRm',
    'fuj3vwyKW5CQW5zF',
    'uNHlu2i',
    'kCk4WP7dJ8ki',
    'k8kQWRtdISk0',
    'WOtcRCoOtSkKm8oMW5C',
    'rCkFrCoQsCouuCoo',
    'DhjHBNnMB3jTvg9VBa',
    'BM9Kzq',
    'F8k8Dmo2auig',
    'BM9KzurHDge',
    'gSocrW0jW7i',
    'y29SDw1UCW',
    'Bg9HzeLK',
    'WPhcN3JcSSo6fq',
    'B25mzwf2zq',
    'aSoBur4sW6vDWPaboSkjcIpdGXXV',
    'ELJdKCktn0rRW78',
    'jSkZWPLjWOC3W4y',
    'B25TzxnZywDL',
    'qw90',
    'kIdcI3WvWOa',
    'W7/dOSkYwCkQW4GaW4VcVvvuWOxdTNSLeCoNW7jazeZdQs3cVSo/W5dcSCok',
    'WOBcGmkSn8kX',
    'WPFcPSo4yCk/pSoSW7SHW5niECo8',
    'CMvXDwvZDfjLBMrLCG',
    'm8o7WRVdN39L',
    'yMLUza',
    'vNPmAe0',
    'x191CgrHDgvxB3jSzejVDw5KCW',
    'C3rYB2TLv2LKDgG',
    'z2v0ug9PBNreyxrH',
    'qKvgt1jfx0vora',
    'W7NdO8oOaSkgWPq4',
    'W7RdSwtdTum',
    'k3pdS8olW4e',
    'WRJdQKad',
    'D8kPw8o5x8oj',
    'Dg9pDxrLCK9M',
    'FvFcR8o1WRG',
    'j8obzb3dGrlcQsPmW6ldHq',
    'qmk6W57cPSo7',
    'WPzDWQ9eW6JdOCopzSoOfrhdS1H5W7q',
    'W73cRCkAwevp',
    'kSo3q8o8',
    'aZ7dMuNdUcJdVLpdISofacmO',
    'gfrAqMaGW6a',
    'hSkbx8o5tSk8yhiuWRVcTfK',
    'jmkUWOPRWOe1W4ZdQ8ob',
    'WQ9nESkOEa',
    'CMvWBgfJzq',
    'hJ9Y',
    'jSk1WODGWRuGW5FdQ8ob',
    'Bmk3W6i/tq',
    'x19Jyw5vCgrHDgvqyxrO',
    'kCkVWQP5WPi7W6BdOSonp8otpG',
    'z3jHyG',
    'vhnIt0C',
    'z8oDhqK6WPHoW6tcSmokhh5MDmkE',
    'y8kGFmo2dwqAWOnoW77dNW',
    'ECkVr8oTwCoC',
    'D8oLr8oWW4FdHCk1y1K+jmo2',
    'nCoxEXhdHqJcNY1JW6hdHmkGWQm',
    'zMLUze9Uzq',
    'rgf0yuHLBhbLCG',
    'AuFdKCkk',
    'yxjVDw5K',
    'WQThBmkZFbNcRH7cM8ocWR3cKq',
    'aaJdGvddKrFdLa',
    'p8kSWQhdPmk0WQdcNmkoW7RdH0RdNG'
  ]
  a = function () {
    return wr
  }
  return a()
}
function b(c, d) {
  const e = a()
  return (
    (b = function (f, g) {
      f = f - 0x9c
      let h = e[f]
      if (b['DlZEev'] === undefined) {
        var i = function (n) {
          const o = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/='
          let p = '',
            q = ''
          for (
            let r = 0x0, s, t, u = 0x0;
            (t = n['charAt'](u++));
            ~t && ((s = r % 0x4 ? s * 0x40 + t : t), r++ % 0x4)
              ? (p += String['fromCharCode'](0xff & (s >> ((-0x2 * r) & 0x6))))
              : 0x0
          ) {
            t = o['indexOf'](t)
          }
          for (let v = 0x0, w = p['length']; v < w; v++) {
            q += '%' + ('00' + p['charCodeAt'](v)['toString'](0x10))['slice'](-0x2)
          }
          return decodeURIComponent(q)
        }
        const m = function (n, o) {
          let p = [],
            q = 0x0,
            r,
            t = ''
          n = i(n)
          let u
          for (u = 0x0; u < 0x100; u++) {
            p[u] = u
          }
          for (u = 0x0; u < 0x100; u++) {
            ;(q = (q + p[u] + o['charCodeAt'](u % o['length'])) % 0x100), (r = p[u]), (p[u] = p[q]), (p[q] = r)
          }
          ;(u = 0x0), (q = 0x0)
          for (let v = 0x0; v < n['length']; v++) {
            ;(u = (u + 0x1) % 0x100),
              (q = (q + p[u]) % 0x100),
              (r = p[u]),
              (p[u] = p[q]),
              (p[q] = r),
              (t += String['fromCharCode'](n['charCodeAt'](v) ^ p[(p[u] + p[q]) % 0x100]))
          }
          return t
        }
        ;(b['NDrunE'] = m), (c = arguments), (b['DlZEev'] = !![])
      }
      const j = e[0x0],
        k = f + j,
        l = c[k]
      return !l ? (b['qjPwoG'] === undefined && (b['qjPwoG'] = !![]), (h = b['NDrunE'](h, g)), (c[k] = h)) : (h = l), h
    }),
    b(c, d)
  )
}
var PxGrowPlayground = (function (ap, aq, au, av) {
  'use strict'
  const kl = c,
    kk = b,
    aw = {
      qqKiY: function (jE, jF, jG) {
        return jE(jF, jG)
      },
      ssbWI: function (jE, jF) {
        return jE === jF
      },
      SocvD: function (jE, jF) {
        return jE / jF
      },
      MPDce: function (jE, jF) {
        return jE > jF
      },
      HaBXg: function (jE, jF) {
        return jE * jF
      },
      VdozP: function (jE, jF) {
        return jE !== jF
      },
      ALpOu: function (jE, jF) {
        return jE - jF
      },
      UfDag: function (jE, jF) {
        return jE - jF
      },
      YhmzR: function (jE, jF) {
        return jE === jF
      },
      sjjYQ: function (jE, jF) {
        return jE || jF
      },
      ejAmt: kk('0x385', 'KlaA'),
      OmIOh: function (jE, jF) {
        return jE && jF
      },
      TWrMk: kl(0x167),
      ljIOQ: function (jE, jF) {
        return jE < jF
      },
      aJYOM: function (jE, jF, jG) {
        return jE(jF, jG)
      },
      DEqwg: function (jE, jF) {
        return jE !== jF
      },
      dkBwe: kk(0x2f0, '#yLL'),
      iEWnq: kl(0x963),
      Qmmcb: kl(0x158),
      UgWBl: kl('0x5b2'),
      gzVha: function (jE, jF) {
        return jE !== jF
      },
      kkyWE: function (jE, jF) {
        return jE / jF
      },
      CLfkP: function (jE, jF) {
        return jE >= jF
      },
      ThgSX: function (jE, jF) {
        return jE + jF
      },
      GqaMm: function (jE, jF) {
        return jE + jF
      },
      YOffy: function (jE, jF, jG) {
        return jE(jF, jG)
      },
      JRoJm: function (jE, jF, jG) {
        return jE(jF, jG)
      },
      pLyYI: function (jE, jF) {
        return jE(jF)
      },
      ZsLrl: function (jE, jF) {
        return jE + jF
      },
      LrOJO: function (jE, jF, jG, jH, jI) {
        return jE(jF, jG, jH, jI)
      },
      mkcGF: function (jE) {
        return jE()
      },
      jwZRk: function (jE, jF) {
        return jE * jF
      },
      coxsy: kk('0x747', 'DaC*'),
      UUgaP: function (jE, jF) {
        return jE(jF)
      },
      BXkny: function (jE, jF) {
        return jE / jF
      },
      MhmWg: function (jE, jF) {
        return jE * jF
      },
      SlRKW: function (jE, jF) {
        return jE * jF
      },
      YYzvW: function (jE, jF) {
        return jE / jF
      },
      OLcXT: function (jE, jF, jG, jH, jI, jJ) {
        return jE(jF, jG, jH, jI, jJ)
      },
      UVfYU: function (jE, jF) {
        return jE - jF
      },
      uKtAn: function (jE, jF) {
        return jE(jF)
      },
      HLtGL: function (jE, jF, jG) {
        return jE(jF, jG)
      },
      RBTNT: function (jE, jF) {
        return jE !== jF
      },
      EtTKP: kl(0x57b),
      henfn: function (jE, jF) {
        return jE === jF
      },
      aihtj: function (jE, jF) {
        return jE + jF
      },
      UkaBi: function (jE, jF) {
        return jE + jF
      },
      zzUWf: function (jE, jF) {
        return jE === jF
      },
      VNPXV: kk(0x81e, 'h*]j'),
      OVBGQ: function (jE, jF) {
        return jE === jF
      },
      MEmAv: function (jE, jF, jG) {
        return jE(jF, jG)
      },
      edGJC: function (jE, jF) {
        return jE / jF
      },
      mQpHt: kl(0x482),
      oOHtn: function (jE, jF, jG) {
        return jE(jF, jG)
      },
      uWcHl: function (jE, jF) {
        return jE >= jF
      },
      OWcvA: function (jE, jF) {
        return jE <= jF
      },
      EsyTK: kk(0x319, '5alY'),
      Ufnin: kl('0x359'),
      ldluf: kk('0xdc', 'WgvK'),
      cfpZy: function (jE, jF) {
        return jE == jF
      },
      QCwSy: kl('0x41f'),
      AVmSI: function (jE, jF, jG) {
        return jE(jF, jG)
      },
      KJaoF: function (jE, jF, jG) {
        return jE(jF, jG)
      },
      Nxfpf: function (jE, jF, jG) {
        return jE(jF, jG)
      },
      vFCjG: function (jE, jF, jG) {
        return jE(jF, jG)
      },
      WWeEC: function (jE, jF, jG) {
        return jE(jF, jG)
      },
      tARhH: function (jE, jF, jG) {
        return jE(jF, jG)
      },
      RmjaZ: function (jE, jF, jG) {
        return jE(jF, jG)
      },
      PEYmx: function (jE, jF, jG) {
        return jE(jF, jG)
      },
      fGbEJ: function (jE, jF, jG, jH) {
        return jE(jF, jG, jH)
      },
      OaAwC: function (jE, jF, jG, jH, jI) {
        return jE(jF, jG, jH, jI)
      },
      iupVQ: kk('0x9c9', '%SI*'),
      IJFcz: kl(0x997),
      hecTO: kk(0x633, 'ckbf'),
      ctjqV: kk('0xb8', '1!h@')
    }
  const ax = {}
  ax[kl(0x743)] = 0.6
  const ay = {}
  ay[kk('0x159', 'WgvK')] = 0.66
  const az = {}
  ;(az[kk(0x885, 'L%$W')] = kl(0x8f6)),
    (az[kk(0x2db, 'd]K1')] = kk('0x909', 'ory)')),
    (az[kl('0xa5')] = kl('0x2aa')),
    (az[kl(0xa80)] = 0x6),
    (az[kl('0x1ae')] = 0x6),
    (az[kk('0x448', 'ory)')] = 0.5),
    (az[kk('0x453', '3t[N')] = 0x3),
    (az[kk(0x893, ']UNN')] = ax),
    (az[kl(0x714)] = ay)
  const aA = {}
  ;(aA[kk(0x787, 'Q1[s')] = kl('0x852')),
    (aA[kl(0xba)] = az),
    (aA[kk(0xfe, 'l$hi')] = 0x6),
    (aA[kl('0xa99')] = 0x2),
    (aA[kl(0xabe)] = 0x2),
    (aA[kl('0x614')] = 0xa),
    (aA[kk(0x853, 'fXk5')] = kl('0x2aa')),
    (aA[kl('0x313')] = aw[kk('0x739', 'F0QA')]),
    (aA[kl('0xaa3')] = kl(0xa20))
  const aB = aA,
    aC = new aq[kk(0x833, ']UNN')](),
    { float: aD } = aq[kl('0x925')],
    { clone: aE, assign: aF } = aq[kl('0x9ba')]
  class aG extends aq[kl('0xda')] {
    get [kl(0x7fe)]() {
      const kn = kl,
        km = kk
      return this[km('0x73f', '#yLL')][kn(0x39a)]
    }
    constructor(jE) {
      const kp = kl,
        ko = kk
      super(),
        (this[ko('0x627', 'ckbf')] = new aq[ko(0x8de, 'lyYv')]()),
        (this[ko('0x65c', 'DaC*')] = new aq[kp('0x40d')]()),
        (this[ko(0x50b, '%qqk')] = new aq[ko(0x6d2, 'b7Er')]()),
        (this[kp(0x4f6)] = new aq[kp('0x40d')]()),
        (this[ko(0x9e1, '1*m7')] = new aq[ko(0x108, 'YtNy')]()),
        (this[ko(0x5ff, '^hR%')] = jE),
        (this[kp(0x65f)] = aE(aB)),
        this[ko('0x153', '5eF6')](),
        this[ko(0x61f, '1*m7')](),
        jE[kp('0x124')](() => {
          const kr = kp,
            kq = ko
          if (kq('0x4bc', '9Dju') !== kq('0x521', 'CiU*'))
            return jE[kq(0x4cf, 'fXk5')] !== this[kr(0x297)][kr('0x668')][kq('0x618', 'WgvK')]
          else (this[kr(0x1e6)] = jE), this[kq('0x106', 'KlaA')](jE[kr('0x1b4')])
        }),
        this[ko(0x60a, 'jbuU')][kp('0xaa3')] && (this[kp(0x743)] = 0x0)
    }
    static [kl(0x160)](jE, jF) {
      const ks = kl
      aH[ks('0xb7')][jE] = jF
    }
    static [kk('0xac1', 'z3lP')](jE) {
      const kt = kk
      return jE && aH[kt(0x31d, 'YtNy')][jE]
    }
    static [kk('0x4cb', '^hR%')](jE) {
      const ku = kl
      return jE && !!aH[ku('0xb7')][jE]
    }
    [kk('0x4b2', 'PYT8')]() {
      const kw = kl,
        kv = kk,
        { scrollConfig: jE } = this[kv(0x6e7, '1!h@')],
        jF = aH[kw('0x21a')](
          (jE && aH[kv('0x517', 'Leeu')](jE[kv('0x104', 'jbuU')]) && jE[kw('0xa98')]) || this[kw('0x65f')][kw('0xa98')]
        ),
        jG = (this[kv(0x9fe, 'lyYv')] = aE(this[kw(0x65f)]))
      aw[kv(0x5e4, '^hR%')](aF, jG, jF), jE && aF(jG, jE), this[kv('0x56f', '$r)6')](jG[kw('0xba')])
    }
    [kl(0x80e)](jE) {
      const ky = kl,
        kx = kk
      this[kx(0x3f8, 'Pa%E')] ||
        this[ky(0x131)]((this[ky(0x2df)] = new aq[kx('0x803', 'KlaA')]()), (this[ky(0x899)] = new aq[ky(0xad3)]()))
      const { scrollXBar: jF, scrollYBar: jG } = this
      jF[ky(0x136)](jE), jG[kx('0x7e7', '5alY')](jE), (jF[kx('0x18b', ']RE0')] = 'x'), (jG[kx('0x9aa', 'Pa%E')] = 'y')
    }
    [kk('0x89f', 'fXk5')](jE = !0x0) {
      const kA = kk,
        kz = kl
      if (this[kz(0x626)]) return
      const { target: jF, targetOverflow: jG, targetWorldBounds: jH, viewportBounds: jI, contentBounds: jJ } = this,
        jK = jF[kz('0x2fc')],
        { overflow: jL } = jF['__'],
        { childrenRenderBounds: jM } = jK,
        { boxBounds: jN, worldBoxBounds: jO } = jK,
        jP = jE && aw[kz('0x82d')](jG, jL) && jH[kA(0xc1, 'l5Lg')](jO),
        jQ = !jK[kA('0x674', 'YtNy')] || (this[kz(0x3a3)](), (jK[kA(0x1d3, '%qqk')] = !0x1)),
        jR = aC[kz('0x136')](jI)[kz('0x3e8')](jM)
      if (jP && jQ && jJ[kz('0x559')](jR)) return
      ;(this[kz('0x87c')] = jL), jI[kz('0x136')](jN), jH[kz(0x136)](jO), jJ[kz('0x136')](jR)
      const { scrollXBar: jS, scrollYBar: jT } = this,
        { size: jU, endsMargin: jV, minSize: jW } = this[kz('0x5bd')],
        { width: jX, height: jY } = jI
      ;(this[kz(0x148)] = jJ['x'] - jF[kA(0x958, 'TdJ1')]),
        (this[kA('0x530', 'h*]j')] = jJ['y'] - jF[kA(0x44c, 'y#3q')]),
        (this[kA(0x8aa, '%qqk')] = aw[kz('0x12f')](jI[kA('0x680', 'Nuoe')], jJ[kz('0xa80')])),
        (this[kz('0x172')] = jI[kz('0x1ae')] / jJ[kA('0x724', 'jbuU')])
      const jZ = jU + 0x2 * jV + jW
      ;(jS[kA(0xd2, 'jbuU')] = aD(jJ[kA(0x12c, 'CiU*')]) > aD(jX) && kA(0x8e7, 'q&7n') !== jL && aw[kz(0x13c)](jX, jZ)),
        (jT[kA('0x6b5', 'F0QA')] = aD(jJ[kA(0x498, 'rE!x')]) > aD(jY) && kA('0x323', 'WgvK') !== jL && jY > jZ),
        this[kA(0x797, ')@c%')]()
    }
    [kk('0x73c', '%SI*')]() {
      const kC = kl,
        kB = kk,
        {
          target: jE,
          viewportBounds: jF,
          contentBounds: jG,
          ratioX: jH,
          ratioY: jI,
          scrollXBar: jJ,
          scrollYBar: jK,
          scrollXBounds: jL,
          scrollYBounds: jM
        } = this
      let {
        size: jN,
        cornerRadius: jO,
        endsMargin: jP,
        sideMargin: jQ,
        minSize: jR,
        scaleFixed: jS,
        scrollType: jT
      } = this[kB(0x279, '1!h@')]
      const jU = jS ? jE[kC(0xabc)]() : 0x1
      if (((jP /= jU), (jQ /= jU), (jN /= jU), aq[kB(0x905, '5alY')](jO) && (jO = jN / 0x2), jJ[kC(0x6c2)])) {
        jL[kC(0x136)](jF)[kC(0x2bf)]([jP, jK[kC('0x6c2')] ? jN + jQ : jP, jQ, jP])
        const jV = (this[kB(0x229, 'DG48')] = jL[kB('0x3d0', 'PYT8')] / jG[kB('0x280', 'S1^T')])
        jJ[kB('0x170', '#yLL')]({
          x: jL['x'] - jG['x'] * jV,
          y: jL[kC('0x871')] - jN,
          width: Math[kB('0x2a6', 'ory)')](aw[kC(0x2b9)](jL[kB(0x740, '5tUd')], jH), jR),
          height: jN,
          cornerRadius: jO,
          dragBounds: jL,
          hittable: aw[kC('0x94b')](kB('0x4e4', 'KlaA'), jT)
        })
      }
      if (jK[kC(0x6c2)]) {
        jM[kB(0x6b4, 'y#3q')](jF)[kB('0x979', ']RE0')]([jP, jQ, jJ[kC(0x6c2)] ? jN + jQ : jP, jP])
        const jW = (this[kB(0x51c, 'rE!x')] = jM[kB('0x322', 'd]K1')] / jG[kB(0x4a9, 'WgvK')])
        jK[kC(0x136)]({
          x: aw[kC('0x26c')](jM[kC(0x455)], jN),
          y: jM['y'] - aw[kC('0x2b9')](jG['y'], jW),
          width: jN,
          height: Math[kC('0x363')](jM[kB('0x47d', ']RE0')] * jI, jR),
          cornerRadius: jO,
          dragBounds: jM,
          hittable: kC('0x489') !== jT
        })
      }
      ;(this['x'] = -this[kC('0x33c')][kC('0x3bf')]),
        (this['y'] = -this[kC('0x33c')][kB('0x24f', '6N7B')]),
        aq[kC(0x6e8)][kB('0x7f5', 'rE!x')](this),
        aq[kB(0x2d6, 'lyYv')][kC(0x596)](this),
        aq[kC(0x6e8)][kB(0xa87, '$r)6')](this)
    }
    [kk('0x83f', 'l$hi')](jE) {
      const kE = kk,
        kD = kl
      if (kD(0x489) === this[kD('0x5bd')][kD(0x313)]) return
      this[kD('0x626')] = !0x0
      const { scrollXBar: jF, scrollYBar: jG, target: jH, scrollXBounds: jI, scrollYBounds: jJ } = this
      jE[kD(0x2e0)] === jF
        ? (jH[kD('0x3bf')] = -(aw[kE(0x50f, 'Leeu')](jF['x'], jI['x']) / this[kD(0x553)] + this[kE('0x7ad', 'S1^T')]))
        : (jH[kD(0x6c1)] = -((jG['y'] - jJ['y']) / this[kE(0x9bd, 'q&7n')] + this[kE(0x726, 'fXk5')]))
    }
    [kk('0x488', 'd]K1')]() {
      const kG = kl,
        kF = kk
      kF(0xae, 'F0QA') !== this[kG(0x5bd)][kG('0x313')] && (this[kG('0x626')] = !0x1)
    }
    [kk(0x51d, '%qqk')](jE) {
      const kI = kk,
        kH = kl
      if (!this[kH('0x7fe')]) return
      this[kH(0x859)]()
      const { scrollType: jF, stopDefault: jG } = this[kH(0x5bd)]
      if (aw[kI(0x6a6, 'h*]j')](kH('0x496'), jF)) return
      const { viewportBounds: jH, contentBounds: jI, scrollXBar: jJ, scrollYBar: jK } = this
      if (jJ[kI(0x3cd, '%qqk')] || jK[kI('0xac7', 'ckbf')]) {
        const jL = jE[kH('0xa62')](this[kI(0x5ff, '^hR%')])
        let jM
        aq[kH(0xa5c)][kI(0x554, 'd]K1')](jI, jH, kI(0x7a6, '6N7B'), jL, !0x0),
          jL['x'] && jJ[kI(0x6ab, '^hR%')] && ((this[kI('0x5ff', '^hR%')][kI(0x539, 'Leeu')] += jL['x']), (jM = !0x0)),
          jL['y'] && jK[kH(0x6c2)] && ((this[kI(0x5ff, '^hR%')][kH('0x6c1')] += jL['y']), (jM = !0x0)),
          aw[kI('0x24b', 'oqmg')](jM, jG) && jE[kH('0x524')](),
          jG && jE[kI('0x115', 'ory)')]()
      }
    }
    [kk(0x6ad, '%SI*')](jE) {
      const kK = kk,
        kJ = kl
      this[kJ('0x7fe')] && (this[kK(0x92c, 'l5Lg')][kK(0x8fb, ']RE0')](jE) || this[kK('0x3d2', 'L%$W')]())
    }
    [kk(0x473, 'LV#p')]() {
      const kM = kk,
        kL = kl
      this[kL('0x7fe')] && (clearTimeout(this[kL(0x1ea)]), this[kM('0x4ac', 'Q1[s')](), (this[kL('0x743')] = 0x1))
    }
    [kk(0x811, ']UNN')]() {
      const kO = kl,
        kN = kk
      this[kN(0x7e6, '%qqk')] &&
        (clearTimeout(this[kO(0x1ea)]),
        this[kO(0x5bd)][kN('0x9b4', '5tUd')] &&
          (this[kN('0x79c', '$r)6')] = aw[kN(0x97d, 'oqmg')](
            setTimeout,
            () => {
              const kQ = kO,
                kP = kN,
                jE = {}
              ;(jE[kP(0x93c, '1!h@')] = 0x0), this[kP(0x9ff, '^hR%')](jE, aq[kQ('0xa72')][kQ('0x16f')](aw[kQ(0x9fc)]))
            },
            0x258
          )))
    }
    [kk('0x483', 'Mi8H')]() {
      const kS = kk,
        kR = kl
      this[kR(0x7fe)] && this[kS('0x948', 'YtNy')]()
    }
    [kk(0x6c5, 'PYT8')]() {
      const kU = kl,
        kT = kk,
        { scrollXBar: jE, scrollYBar: jF, target: jG } = this
      this[kT('0x71f', '$r)6')] = [
        jE[kT(0x742, '6N7B')](aq[kU(0x796)][kU(0x533)], this[kT('0x101', 'CiU*')], this),
        jE[kT(0x15c, 'ckbf')](aq[kU(0x796)][kT('0xbc', 'ckbf')], this[kT('0x6ac', '9Dju')], this),
        jF[kT(0x271, 'KlaA')](aq[kU(0x796)][kU('0x533')], this[kT('0x9db', 'WgvK')], this),
        jF[kU('0xcd')](aq[kT('0xa6c', 'CiU*')][kU(0x607)], this[kT(0x3ca, '6N7B')], this),
        jG[kU(0xcd)](aq[kT(0x6c8, 'h*]j')][kT('0x8c4', '9Dju')], this[kT(0x432, 'Mi8H')], this),
        jG[kT(0x2cf, ']RE0')](aq[kT('0x220', 'IRAu')][kU('0x593')], this[kU(0x989)], this),
        jG[kT('0x461', 'CiU*')](aq[kT(0x744, 'ckbf')][kT(0x62b, 'YtNy')], this[kU(0x9df)], this),
        jG[kT(0x838, 'TdJ1')](aq[kT(0x66a, 'h*]j')][kU('0x607')], this[kT(0x4bd, '3t[N')], this),
        jG[kU(0xcd)](aq[kT('0x75b', 'DaC*')][kT('0x741', '9Dju')], this[kT('0x813', 'oqmg')], this),
        jG[kT('0x7a1', '5eF6')](aq[kT(0x173, 'DG48')][kT('0x95b', ']UNN')], this[kT(0x4e6, 'ory)')], this)
      ]
    }
    [kl(0x15f)]() {
      const kV = kk
      this[kV(0x389, 'KlaA')](this[kV(0x5f0, 'DG48')])
    }
    [kl(0x391)]() {
      const kX = kk,
        kW = kl
      if (!this[kW(0x615)]) {
        this[kX(0x6bc, 'WgvK')]()
        const { target: jE } = this
        ;(jE[kW('0x214')] = jE[kW(0x7b5)] = jE[kX('0x84b', '3t[N')] = void 0x0),
          (this[kW(0x33c)] = this[kX(0x697, 'l$hi')] = null),
          super[kX('0x2d5', 'DaC*')]()
      }
    }
  }
  aG[kl(0xb7)] = {}
  const aH = aG
  aq[kk('0x110', 'IRAu')][kl(0x3e8)](kl('0x214'))
  const aI = aq[kl('0xad3')][kk(0x138, '5tUd')],
    aJ = {}
  aJ[kl(0x449)] = kl(0x372)
  const aK = {}
  aK[kl('0xba')] = aJ
  const aL = {}
  aL[kk(0x715, 'KlaA')] = kl('0x37a')
  const aM = {}
  ;(aM[kk(0x464, '5eF6')] = aL),
    (aq[kk('0x500', 'fXk5')][kk(0x396, 'd]K1')](kl('0xab2'), void 0x0, function (jE) {
      const kY = kk
      return aq[kY('0x8ff', '5tUd')](jE, jF =>
        aq[kY('0x318', 'y#3q')]({
          set(jG) {
            const l0 = kY,
              kZ = c
            this[kZ(0xac3)](jF, jG) && ((this[l0(0x643, 'F0QA')][kZ(0x495)] = !0x0), aq[kZ('0x9c1')](this))
          }
        })
      )
    }),
    (aI[kl(0x317)] = function (jE) {
      const l2 = kk,
        l1 = kl
      jE && this[l1('0x900')]
        ? (this[l2('0x508', 'IRAu')] ||
            ((this[l1(0x214)] = new aG(this)),
            this[l2(0x855, 'lyYv')] || (this[l1(0x7b5)] = []),
            this[l1(0x7b5)][l2('0x5aa', '#yLL')](this[l1('0x214')])),
          (this[l1(0x39a)] = !0x0))
        : this[l2(0x918, 'PYT8')] &&
          !this[l1('0x214')][l1('0x626')] &&
          ((this[l1('0x39a')] = void 0x0), this[l2(0x355, 'DaC*')][l2('0x2c6', 'lyYv')]())
    }),
    aG[kk('0x9a7', 'h*]j')](kk(0x636, 'd]K1'), aK),
    aG[kl('0x160')](kk(0x23f, '%qqk'), aM),
    au[kk(0xa2e, 'WgvK')][kk('0x45e', 'PYT8')](kk('0x5a8', 'rp&E')))
  const aN = {}
  ;(aN[kl(0xa29)] = !0x1), (aN[kl('0x31a')] = 0x3c)
  const aO = aN
  let aP,
    aQ = [],
    aR = !0x1,
    aS = !0x1,
    aT = !0x1,
    aU = !0x1,
    aV = null
  function aW(jE) {
    const l3 = kl,
      jF = aQ[l3('0x8a3')](0x0)
    for (const jG of jF) jG(jE)
  }
  function aX() {
    const l5 = kl,
      l4 = kk,
      jE = {}
    jE[l4('0x132', 'TdJ1')] = l4('0x9fa', 'rE!x')
    const jF = {}
    ;(jF[l5('0x529')] = l5('0x304')),
      aO[l5(0xa29)] || !document[l5(0x81f)]
        ? (aR ||
            ((aR = !0x0),
            window[l4('0xf8', 'Nuoe')](jG => {
              ;(aR = !0x1), aW(jG)
            })),
          aw[l4('0x81d', 'h*]j')](aV, aU) && (aV[l5('0x7d1')](jE), (aU = !0x1)))
        : (aV ||
            l5(0x79a) == typeof Worker ||
            ((aV = new Worker(URL[l4('0x74c', 'Mi8H')](new Blob([l5(0xaa7)], jF)))),
            (aV[l5(0x98d)] = jG => {
              const l6 = l4
              ;(aS = !0x1), aW(jG[l6('0x8da', 'WgvK')])
            })),
          aV
            ? aS ||
              ((aS = !0x0), aV[l5('0x7d1')]({ action: aw[l4(0x9de, '5eF6')], interval: 0x3e8 / aO[l5('0x31a')] }), (aU = !0x0))
            : aT ||
              ((aT = !0x0),
              setTimeout(() => {
                const l7 = l4
                ;(aT = !0x1), aW(Date[l7(0x3a0, 'q&7n')]())
              }, 0x3e8 / aO[l4('0xa6e', 'KlaA')])))
  }
  document[kl('0x551')](aw[kl('0x563')], aX),
    (au[kk('0x682', '#yLL')][kl('0x993')] = function (jE) {
      const l8 = kk
      aQ[l8('0x6df', 'Pa%E')](jE), aX()
    }),
    au[kl('0xa72')][kl(0x3e8)](aw[kl(0x23d)])
  const { max: aY, abs: aZ } = Math,
    { maxX: b0, maxY: b1 } = au[kk(0x976, '%qqk')],
    b2 = new au[kl(0x7d4)](),
    b3 = new au[kl(0x7d4)](),
    b4 = {},
    b5 = new au[kl(0x40d)]()
  ;(au[kl(0x345)][kk(0x48c, 'WgvK')] = function (jE) {
    const la = kk,
      l9 = kl
    return jE[l9('0x7aa')] || jE[l9('0x657')] || jE[la('0x766', 'Nuoe')]
  }),
    (au[kk(0x286, 'Q1[s')][kk(0x450, ']RE0')] = function (jE, jF) {
      const lb = kl
      let jG,
        jH,
        jI,
        jJ,
        jK = 0x0,
        jL = 0x0,
        jM = 0x0,
        jN = 0x0
      return (
        jF[lb(0x78a)](jO => {
          const ld = lb,
            lc = b
          if (
            ((jG = jO['x'] || 0x0),
            (jH = jO['y'] || 0x0),
            (jJ = 1.5 * (jO[lc('0x248', 'L%$W')] || 0x0)),
            (jI = aZ(jO[lc('0x9d4', '5alY')] || 0x0)),
            (jK = aw[ld('0x804')](aY, jK, jI + jJ - jH)),
            (jL = aY(jL, jI + jJ + jG)),
            (jM = aY(jM, jI + jJ + jH)),
            (jN = aw[lc(0x33e, ')@c%')](aY, jN, jI + jJ - jG)),
            au[ld(0x345)][ld(0x663)](jO))
          ) {
            const { strokeBounds: jP } = jE[lc(0x937, 'WgvK')]
            b5[ld('0x136')](jP)[ld(0x7a9)]([jK, jL, jM, jN]),
              b7(jO, jP),
              b5[ld('0x9a0')](b3),
              (jK = aY(jK, jP['y'] - b5['y'])),
              (jL = aY(jL, b5[ld('0x455')] - b0(jP))),
              (jM = aY(jM, b5[lc('0xa1d', 'l$hi')] - b1(jP))),
              (jN = aY(jN, jP['x'] - b5['x']))
          }
        }),
        jK === jL && jL === jM && jM === jN ? jK : [jK, jL, jM, jN]
      )
    })
  const b6 = au[kl(0x345)][kk('0x589', 'l$hi')]
  function b7(jE, jF) {
    const lf = kl,
      le = kk,
      { origin: jG, scale: jH, skew: jI, rotation: jJ } = jE
    au[le(0x7b7, '%qqk')][le('0x1ff', 'rE!x')](jG || lf('0x2e8'), jF, b4),
      b3[lf(0x136)](),
      jJ && b3[le('0x8dc', 'CiU*')](b4, jJ),
      jI && b3[le(0x6f3, '1*m7')](b4, jI['x'], jI['y']),
      jH && b3[le('0x547', 'jbuU')](b4, jH['x'], jH['y'])
  }
  function b8(jE, jF, jG, jH) {
    const lh = kl,
      lg = kk
    var jI,
      jJ = arguments[lg(0x1e1, '6N7B')],
      jK = aw[lh('0x85d')](jJ, 0x3) ? jF : null === jH ? (jH = Object[lh(0x586)](jF, jG)) : jH
    if (lg('0x69c', 'Mi8H') == typeof Reflect && lg('0x621', '5eF6') == typeof Reflect[lh(0x731)])
      jK = Reflect[lg(0x978, 'TdJ1')](jE, jF, jG, jH)
    else {
      for (var jL = jE[lh(0x7f6)] - 0x1; jL >= 0x0; jL--)
        (jI = jE[jL]) && (jK = (jJ < 0x3 ? jI(jK) : jJ > 0x3 ? jI(jF, jG, jK) : jI(jF, jG)) || jK)
    }
    return jJ > 0x3 && jK && Object[lg('0x42d', 'L%$W')](jF, jG, jK), jK
  }
  function b9(jE, jF, jG, jH) {
    return new (jG || (jG = Promise))(function (jI, jJ) {
      const lo = b,
        ln = c
      function jK(jN) {
        const li = b
        try {
          jM(jH[li(0xad1, 'b7Er')](jN))
        } catch (jO) {
          jJ(jO)
        }
      }
      function jL(jN) {
        const lj = c
        try {
          jM(jH[lj(0x8e5)](jN))
        } catch (jO) {
          jJ(jO)
        }
      }
      function jM(jN) {
        const ll = b,
          lk = c,
          jO = {
            WEfeW: function (jQ, jR) {
              return jQ(jR)
            }
          }
        var jP
        jN[lk('0x60f')]
          ? jI(jN[lk('0x3d4')])
          : ((jP = jN[ll('0x6a5', 'Leeu')]),
            jP instanceof jG
              ? jP
              : new jG(function (jQ) {
                  const lm = ll
                  jO[lm(0x827, 'KlaA')](jQ, jP)
                }))[lk('0x678')](jK, jL)
      }
      jM((jH = jH[ln(0x9d)](jE, jF || []))[lo(0x56d, 'd]K1')]())
    })
  }
  ;(au[kl(0x345)][kl('0x786')] = function (jE, jF, jG, jH, jI, jJ, jK) {
    const lq = kl,
      lp = kk,
      { strokeBounds: jL } = jE[lp(0x919, '9Dju')],
      { spread: jM } = jH,
      jN = au[lp('0x41a', 'l$hi')][lp('0x661', 'oqmg')](jH)
    if (jM && ((aP = b6(jE, jF, jG, jH, jI, jJ, jK)), !jN)) return aP
    if (jN) {
      const { fitMatrix: jO, renderBounds: jP } = jG
      return (
        aw[lq('0x603')](b7, jH, jL),
        b2[lq(0x136)](jE[lp('0xa7e', 'Leeu')]),
        jO && b2[lq(0x12a)](jO)[lp('0x9eb', 'S1^T')](-jO['e'], -jO['f']),
        b2[lp('0x5f8', 'ckbf')](-b0(jP), -b1(jP)),
        b2[lp('0x52f', 'PYT8')](jF[lq(0x737)]),
        b3[lq(0x12a)](b2)[lq(0x1cd)](b2),
        jM ? b3[lq('0x3df')](aP) : b3
      )
    }
  }),
    aw[kl('0x949')](aw[kk(0x228, 'lyYv')], typeof SuppressedError) && SuppressedError
  const bb = (function (jE = 0x1) {
      return jE ? Array : jE
    })(),
    bc = (function (jE = 0x1) {
      const lr = kl
      return jE ? [lr(0x6e6)] : jE
    })()
  function bd(jE) {
    return (function (jF) {
      const { g: jG } = bb,
        jH = bc[0x0],
        jI = bc[0x1]
      if (jG) return jG(jH, jF) || jG(jI, jF)
    })(jE)
  }
  class bf extends av[kk('0x28f', 'jbuU')] {
    [kk('0x536', 'DG48')](jE) {
      const ls = kl,
        { moveX: jF, moveY: jG, target: jH } = jE
      jH[ls(0x419)](jF, jG), this[ls('0x5fe')]()
    }
    [kl(0x247)](jE) {
      const lu = kk,
        lt = kl
      if (lt('0x6f4') !== lt('0x375')) {
        const { scaleX: jF, scaleY: jG, transform: jH, worldOrigin: jI, target: jJ } = jE,
          jK = !0x1
        jH ? jJ[lt(0x911)](jH, jK) : jJ[lu('0x5d3', 'z3lP')](jI, jF, jG, jK), this[lu('0x4af', '3t[N')]()
      } else {
        const { nodeData: jM, pathEditor: jN } = this
        if (jM && aw[lu('0x2e5', 'd]K1')]('Z^', jM[lt(0x37b)])) {
          const jO = {}
          jO[lt('0x998')] = 0x2
          const jP = {}
          ;(jP[lt('0x998')] = 0x2), (jP[lu(0xa5b, ']UNN')] = aw[lt('0x3da')])
          const jQ = {}
          ;(jQ[lu(0x66f, 'YtNy')] = lu(0x895, 'Q1[s')),
            (jQ[lt(0xa80)] = 0xa),
            (jQ[lu('0x6f9', '#yLL')] = 0xa),
            (jQ[lu('0x38b', 'YtNy')] = lu('0xa0c', 'l5Lg')),
            (jQ[lu(0xaad, 'Mi8H')] = lu('0x31f', 'd]K1')),
            (jQ[lu('0x78b', 'z3lP')] = jO),
            (jQ[lt('0x95c')] = jP)
          const jR = (this[lt(0x8c1)] = new bq[lu(0x117, ']RE0')](jQ))
          let jS, jT
          this[lu(0x5fa, 'PYT8')](jR, !0x0),
            this[lt(0x3e8)](jR),
            jR['on'](bg[lu('0x6e1', '6N7B')][lu('0x6d9', ']RE0')], () => {
              const lv = lu
              if (jN[lv('0x240', 'Mi8H')]) return
              ;(jS = !0x1), this[lv(0x30f, 'ory)')] && jN[lv(0x8ac, 'CiU*')]()
              const { x: jU, y: jV } = this[lv(0x568, 'Q1[s')],
                jW = {}
              ;(jW['x'] = jU), (jW['y'] = jV), (jT = jW)
            }),
            jR['on'](aG[lt('0x796')][lt(0x533)], jU => {
              const lx = lt,
                lw = lu
              if (jN[lw('0x456', 'h*]j')]) return
              const jV = jU[lw('0x590', '3t[N')](jN[lx(0x2b0)]),
                jW = this[lx(0x5df)](jV, jT, this, jU[lw(0x20d, ']UNN')])
              jW &&
                (jN[lw('0x1d6', 'ory)')]
                  ? jN[lw('0x6b3', 'b7Er')](jW)
                  : jU[lw(0x8e0, 'ory)')] || jS
                  ? ((jS = !0x0),
                    'M^' !== jM[lx('0x37b')] && (jM[lx('0x37b')] = 'C^'),
                    (jM['a'] = { x: jM['x'] - jV['x'], y: jM['y'] - jV['y'] }),
                    (jM['b'] = { x: jM['x'] + jV['x'], y: jM['y'] + jV['y'] }),
                    jM['ab'] && delete jM['ab'],
                    (this[lw('0x47a', '%SI*')] = jM))
                  : jN[lx('0x284')](jW))
            })
        }
      }
    }
    [kk(0x5f3, ']RE0')](jE) {
      const lz = kk,
        ly = kl,
        { rotation: jF, transform: jG, worldOrigin: jH, target: jI } = jE
      jG ? jI[ly('0x911')](jG, !0x1) : jI[ly('0x7a5')](jH, jF), this[lz(0x22a, 'ory)')]()
    }
    [kl('0x735')](jE) {
      const lB = kl,
        lA = kk,
        { skewX: jF, skewY: jG, transform: jH, worldOrigin: jI, target: jJ } = jE,
        jK = !0x1
      jH ? jJ[lA(0x898, 'y#3q')](jH, jK) : jJ[lB(0x7cf)](jI, jF, jG, jK), this[lB('0x5fe')]()
    }
    [kl(0x821)](jE, jF) {
      const lD = kk,
        lC = kl
      this[lC(0x79d)][lD('0x29f', 'TdJ1')](jE, jF)
    }
    [kl(0x5fe)]() {
      const lE = kl
      bd() && this[lE('0x8d0')][lE('0x3d6')](), this[lE(0x79d)][lE('0x5fe')]()
    }
    [kk('0x4c2', 'rE!x')]() {
      const lF = kk
      this[lF(0x9f2, '5alY')] = null
    }
  }
  const bg = (function (jE = 0x1) {
      return jE ? Date : jE
    })(),
    bh = (function (jE = 0x1) {
      const lG = kl
      return jE ? [lG(0x6e6)] : jE
    })()
  function bj(jE) {
    return (function (jF) {
      const { q: jG } = bg,
        jH = bh[0x0],
        jI = bh[0x1]
      if (jG) return jG(jH, jF) || jG(jI, jF)
    })(jE)
  }
  class bk extends aq[kk(0x74a, '6N7B')] {
    constructor(jE) {
      const lI = kk,
        lH = kl
      super(jE), (this[lH('0x42c')] = lI(0xa0f, 'Q1[s'))
    }
    [kl('0x2e2')](jE, jF) {
      const lK = kl,
        lJ = kk
      super[lJ(0x1d7, '%SI*')](jE, jF)
      const { target: jG } = this
      bj() && (jE[lK(0x595)](lJ(0x26f, 'oqmg')), jG[lJ('0x50e', 'l$hi')](jE, jF), jE[lK('0x88e')]())
    }
    [kk(0x58f, '6N7B')]() {
      const lM = kl,
        lL = kk
      super[lL('0x4c2', 'rE!x')](), (this[lM('0x33c')] = null)
    }
  }
  class bl {
    get [kk(0xa3f, 'z3lP')]() {
      const lO = kk,
        lN = kl
      return this[lN('0x8d0')][lO(0x88c, 'ckbf')]
    }
    get [kl('0x1a4')]() {
      const lQ = kk,
        lP = kl
      return this[lP(0x8d0)][lQ('0x360', '9Dju')][lQ(0x875, '5alY')]
    }
    constructor(jE) {
      const lS = kk,
        lR = kl
      ;(this[lR(0x8d0)] = jE),
        jE[lS('0x8b2', 'jbuU')][lR('0x564')](
          jE[lR(0x3ac)][lS('0x4aa', 'Leeu')](aq[lR(0x796)][lS('0x53e', 'b7Er')], this[lR('0x76b')], this),
          jE[lS('0xa71', '$r)6')][lS(0x38e, '#yLL')](aq[lR(0x796)][lR(0x791)], this[lS(0x6ae, ']UNN')], this),
          jE[lS(0x47c, 'lyYv')][lS('0x70d', '^hR%')](aq[lS('0x7c8', '5eF6')][lR('0x607')], this[lS(0x5e8, 'WgvK')], this),
          jE[lS('0x631', ']RE0')][lR('0xcd')](aq[lS('0x7cb', 'F0QA')][lS(0x166, '9Dju')], this[lS(0x4ce, '5tUd')], this)
        )
    }
    [kl(0x3e8)]() {
      const lU = kl,
        lT = kk,
        { clipEditBox: jE, linesConfig: jF } = this
      if (jF) {
        const jG = {}
        ;(jG['x'] = 0x2), (jG['y'] = 0x2)
        const jH = {}
        jH[lT(0x93a, 'S1^T')] = lT('0x9f4', 'b7Er')
        const { lines: jI = jG, style: jJ, hideOnActionEnd: jK } = aw[lU(0x491)] == typeof jF ? {} : jF,
          jL = new aq[lU('0xda')](jH),
          jM = {}
        ;(jM[lU('0x998')] = 0.5), (jM[lU('0x57b')] = lT(0x3fd, 'lyYv')), (jM[lT('0x8bf', 'ckbf')] = 0x5a)
        for (let jQ = 0x0; jQ < jI['x']; jQ++) jL[lU(0x3e8)](new aq[lU(0x1d4)](Object[lT('0x6a9', 'lyYv')](jM, jJ || {})))
        const jN = {}
        jN[lT(0x690, 'Q1[s')] = aw[lT(0x30b, '%SI*')]
        const jO = new aq[lU('0xda')](jN),
          jP = {}
        ;(jP[lU(0x998)] = 0.5), (jP[lU(0x57b)] = lU(0x5b4))
        for (let jR = 0x0; jR < jI['y']; jR++) jO[lU(0x3e8)](new aq[lU('0x1d4')](Object[lU(0xcc)](jP, jJ || {})))
        this[lU('0x243')](),
          jE[lT(0x795, 'Nuoe')][lT(0xa83, 'CiU*')]((this[lT(0x1a1, 'jbuU')] = [jL, jO])),
          jK && (jE[lT('0x4f1', 'rp&E')][lT(0x537, 'l5Lg')] = 0x0)
      }
    }
    [kl('0x243')]() {
      const lW = kk,
        lV = kl,
        { lines: jE } = this
      jE && (jE[lV('0x78a')](jF => jF[lW(0x71e, '5tUd')]()), (this[lW(0x324, 'lyYv')] = void 0x0))
    }
    [kl(0x76b)]() {
      const lY = kk,
        lX = kl,
        { clipEditBox: jE, linesConfig: jF } = this
      if (jF) {
        const { hideOnActionEnd: jG } = lX(0x963) == typeof jF ? {} : jF,
          jH = {}
        ;(jH[lX(0x743)] = 0x1), jG && (clearTimeout(this[lX('0x21f')]), jE[lY(0x89a, 'L%$W')][lY('0x57c', 'KlaA')](jH, !0x0))
      }
    }
    [kk('0x93f', 'z3lP')]() {
      const m2 = kk,
        lZ = kl,
        { clipEditBox: jE, linesConfig: jF } = this
      if (jF) {
        const { hideOnActionEnd: jG } = lZ('0x963') == typeof jF ? {} : jF
        jG &&
          (this[lZ('0x21f')] = setTimeout(() => {
            const m1 = lZ,
              m0 = b,
              jH = {}
            ;(jH[m0(0x655, 'PYT8')] = 0x0), jE[m1('0x54e')][m1(0x136)](jH, !0x0)
          }, 0x3e8 * (m2('0x3be', 'DaC*') == typeof jG ? jG : 0x1)))
      }
    }
    [kl(0x5fe)]() {
      const m4 = kk,
        m3 = kl,
        jE = {}
      jE[m3(0x62d)] = function (jI, jJ) {
        return jI + jJ
      }
      const jF = jE,
        { clipEditBox: jG, linesConfig: jH } = this
      if (jH) {
        const { rect: jI } = jG,
          [jJ, jK] = this[m4(0x1c8, '5tUd')]
        jJ[m4('0x157', 'ckbf')][m3(0x78a)]((jL, jM) => {
          const m6 = m4,
            m5 = m3
          ;(jL[m5('0xa80')] = jI[m6('0x6d8', 'rp&E')]),
            (jL['x'] = ((jM + 0x1) / jF[m6(0x471, '^hR%')](jJ[m5('0x50a')][m5(0x7f6)], 0x1)) * jI[m6(0x666, ']UNN')]),
            (jL['y'] = 0x0)
        }),
          jK[m4(0x5e9, 'IRAu')][m4(0x20b, '^hR%')]((jL, jM) => {
            const m8 = m4,
              m7 = m3
            ;(jL[m7('0xa80')] = jI[m8('0x280', 'S1^T')]),
              (jL['x'] = 0x0),
              (jL['y'] = ((jM + 0x1) / (jK[m8(0xa75, '$r)6')][m8(0x39e, 'L%$W')] + 0x1)) * jI[m7(0x1ae)])
          })
      }
    }
    [kl('0x391')]() {
      const ma = kl,
        m9 = kk
      this[m9('0x6eb', '#yLL')] && (this[ma('0x243')](), (this[ma(0x8d0)] = null))
    }
  }
  function bm(jE, jF) {
    const mc = kl,
      mb = kk
    if (aq[mb('0x224', 'Leeu')](jE))
      return aq[mc(0xa60)](jE)
        ? jE[mb('0x5b0', 'Leeu')](
            jG => mc(0x80b) === jG[mb('0x230', 'ory)')] && mc('0x425') !== jG[mb(0xac6, '5eF6')] && (!jF || jG[mc('0x5b5')])
          )
        : (!jF || jE[mc(0x5b5)]) && jE
  }
  function bp(jE, jF) {
    const me = kl,
      md = kk
    if (jE && aq[md(0x572, 'TdJ1')](jE))
      return jE[md(0x1b6, 'rp&E')](
        jG => jG[md('0xad5', 'IRAu')] && !jG[me(0x884)][me(0x425)] && (!jF || jG[md('0x8a9', 'z3lP')][md('0x296', 'fXk5')])
      )
  }
  const bq = [kk('0x365', 'TdJ1'), kk(0x27d, '%qqk'), kk(0x11f, 'Mi8H'), kl(0x80b)],
    bu = {}
  bu[kl('0x998')] = 0x0
  const bv = {}
  ;(bv[kk(0x145, 'l5Lg')] = bu),
    (bv[kk(0x562, ']UNN')] = null),
    (bv[kl('0xfc')] = null),
    (bv[kl(0x54e)] = null),
    (bv[kl(0x178)] = null),
    (bv[kk('0x405', 'Leeu')] = null),
    (bv[kk('0x1ca', 'L%$W')] = !0x0)
  const bw = {}
  ;(bw[kk('0x91a', '$r)6')] = 0x0),
    (bw[kk('0x5a5', '5alY')] = !0x0),
    (bw[kl('0x8ab')] = !0x1),
    (bw[kk('0x842', 'l$hi')] = kl('0x444')),
    (bw[kk('0x68d', 'LV#p')] = !0x1),
    (bw[kk('0x58b', '1*m7')] = kl('0x9b2'))
  const bx = {}
  bx[kl(0x743)] = 0x0
  const by = {}
  ;(by[kk(0x712, 'F0QA')] = bx),
    (by[kk(0x6ec, ')@c%')] = 0x0),
    (by[kl(0x5ec)] = !0x0),
    (by[kl('0xa4b')] = kk('0x18f', 'b7Er')),
    (by[kk(0x8a4, '5eF6')] = !0x1)
  const bz = {}
  ;(bz[kk('0xd8', ')@c%')] = 0.5), (bz[kl('0x1da')] = !0x1), (bz[kl(0xa86)] = '')
  const bA = {}
  ;(bA[kk('0x5bb', ')@c%')] = 0xe),
    (bA[kk(0x400, 'DG48')] = 0.3),
    (bA[kl(0x7a9)] = 0x1),
    (bA[kl('0x79d')] = bv),
    (bA[kl('0x3ac')] = bw),
    (bA[kl(0xa76)] = by),
    (bA[kk('0x68f', '$r)6')] = bz)
  const bB = bA,
    bC = (function (jE = 0x1) {
      return jE ? Array : jE
    })(),
    bD = (function (jE = 0x1) {
      const mf = kk
      return jE ? [mf('0x4f9', 'd]K1')] : jE
    })()
  function bE(jE) {
    return (function (jF) {
      const { g: jG } = bC,
        jH = bD[0x0],
        jI = bD[0x1]
      if (jG) return jG(jH, jF) || jG(jI, jF)
    })(jE)
  }
  const bF = new aq[kk('0x839', 'Leeu')]()
  ;(ap[kk('0x328', 'Mi8H')] = class extends av[kk('0x515', 'DG48')] {
    get [kk(0x9d1, 'DaC*')]() {
      const mg = kk
      return mg('0x4eb', 'jbuU')
    }
    get [kk(0x5bc, '#yLL')]() {
      const mh = kl
      return mh('0xa06')
    }
    get [kl('0x8df')]() {
      const mj = kl,
        mi = kk
      return this[mi(0x232, '%qqk')][mj(0x11d)][this[mj('0x44d')]] || {}
    }
    constructor(jE) {
      const ml = kl,
        mk = kk
      super(jE),
        (this[mk(0x9b6, 'IRAu')] = aq[ml(0x9ba)][mk(0x7f3, 'IRAu')](bB)),
        (this[ml(0x3ac)] = new av[ml(0x966)](jE)),
        (this[ml(0x3ac)][mk(0x7d5, 'l$hi')] = this[mk('0x376', ')@c%')] = new av[mk(0x4f0, 'WgvK')]()),
        (this[mk(0x864, 'l$hi')][ml('0x79d')] = this[ml(0x3ac)]),
        (this[mk(0x872, 'KlaA')] = new av[ml(0x966)](jE)),
        (this[ml('0xa76')][mk(0x272, 'DaC*')] = this[ml(0xa6d)] = new bf()),
        (this[ml('0xa6d')][mk(0x69a, 'KlaA')] = this[ml('0xa76')]),
        (this[mk('0x1ba', 'q&7n')][ml(0x8d0)] = this),
        (this[mk('0x14f', 'S1^T')][mk(0x4cc, 'F0QA')] = this[ml('0x6cb')] = new bk()),
        (this[ml('0x1ac')] = new bl(this)),
        bE() &&
          this[ml('0x892')][ml(0x564)](
            this[ml(0x3ac)][mk('0xa6f', '3t[N')](aq[mk(0x5ab, '5alY')][mk('0x2a8', 'Pa%E')], this[ml(0x3d6)], this),
            this[mk('0x19a', '^hR%')][ml('0xcd')](aq[ml('0x796')][ml(0x791)], this[mk(0x574, '1*m7')], this),
            this[ml(0x6cb)][ml('0xcd')](aq[ml(0xa2f)][ml('0x8f7')], this[ml(0xe5)], this)
          )
    }
    [kl('0x305')]() {
      const mn = kl,
        mm = kk,
        { editTarget: jE } = this
      ;(this[mm(0x814, '%SI*')] = jE[mn(0x370)](aw[mm(0x417, 'TdJ1')])),
        (this[mm(0x411, ']UNN')] = jE[mn('0x370')](mn(0x4df))),
        this[mn(0x257)](),
        this[mn('0xa03')](),
        this[mn(0x1ac)][mn(0x3e8)](),
        this[mn('0x1a9')](),
        this[mm(0x28a, '5tUd')]()
    }
    [kk('0x6e4', 'Nuoe')]() {
      const mp = kk,
        mo = kl
      this[mo(0x3a3)](),
        this[mo(0xa76)][mp('0x82c', 'l5Lg')](),
        this[mo('0x3ac')][mp(0x4c7, 'DG48')](),
        this[mp('0x556', '#yLL')][mp(0xa19, '1*m7')]()
    }
    [kk(0x685, '6N7B')]() {
      const mr = kl,
        mq = kk,
        { editBox: jE, clipEditBox: jF, imageEditBox: jG, imageTarget: jH, editTarget: jI } = this
      jH[mq(0x1d1, 'Pa%E')] &&
        (this[mr(0x3d6)](),
        (jF[mr(0x33c)] = jH[mq(0x123, '1*m7')] = jH[mq('0x8a5', 'l5Lg')] = jE[mq('0x3fb', 'YtNy')] = void 0x0),
        jG[mr(0x433)](),
        jF[mr(0x433)](),
        this[mq(0xc4, '3t[N')][mr(0x243)](),
        jH[mr('0x243')](),
        jG[mr('0x243')](),
        jF[mr('0x243')](),
        (jI[mr('0x5b2')] = this[mq(0x2a7, '6N7B')]),
        (jI[mq('0xa11', 'l$hi')] = this[mq(0x34f, '5alY')]))
    }
    [kk(0x67f, 'Pa%E')]() {
      const mt = kk,
        ms = kl
      this[ms(0x433)](), this[mt('0x397', 'oqmg')]()
    }
    [kk('0x1b8', 'Pa%E')]() {
      const mv = kk,
        mu = kl,
        { clipEditBox: jE, imageEditBox: jF } = this
      this[mu('0x3a3')](), jE[mu(0xa81)](), jF[mv(0x7a8, 'TdJ1')]()
    }
    [kk('0x393', 'DG48')]() {
      const mx = kl,
        mw = kk,
        { clipEditBox: jE, imageEditBox: jF, editBox: jG, imageTarget: jH, mergeConfig: jI } = this
      ;(jG[mw(0x3b8, '5alY')] = jI[mw(0x7a2, 'DaC*')]),
        (jE[mw('0x947', '3t[N')] = jI[mw(0x654, 'Q1[s')]),
        (jF[mx('0x65f')] = jI[mw('0xe7', 'b7Er')]),
        jH[mw('0xa24', 'q&7n')](jI[mw('0x5e5', 'l$hi')])
    }
    [kk(0x689, '%qqk')]() {
      const mz = kl,
        my = kk,
        { editor: jE, editTarget: jF, clipEditBox: jG, clipTransformTool: jH } = this
      jE[my('0x61c', 'd]K1')](jG), (jG[my('0x169', '5eF6')] = jF), (jH[mz(0x783)] = jE[my(0x466, 'z3lP')])
    }
    [kk('0x5b3', ']UNN')]() {
      const mB = kk,
        mA = kl
      if (aw[mA(0x599)](mB(0x204, 'l$hi'), mA('0x357'))) {
        const { editor: jE, editTarget: jF, imageEditBox: jG, imageTarget: jH } = this,
          jI = this[mA('0x585')]()
        ;(jH[mB(0x9f0, 'b7Er')] = jI[mB(0x761, 'ory)')]),
          (jH[mA(0x33c)] = jF),
          jE[mA(0x404)][mA(0x1b4)][mA('0x289')][mB(0x45e, 'PYT8')](jH),
          jE[mA('0x3e8')](jG),
          jF[mA('0x597')] && (jF[mA(0xa80)] = jF[mA('0xa80')]),
          jF[mB(0x9b1, 'Pa%E')] && (jF[mA('0x1ae')] = jF[mB(0x1b5, 'Mi8H')])
      } else this[mB(0x84a, 'jbuU')](aI, au, bq) && (bg = !0x0)
    }
    [kl(0xe5)]() {
      const mD = kk,
        mC = kl,
        { editTarget: jE, imageTarget: jF, imageEditBox: jG } = this,
        jH = this[mC('0x5a6')](),
        { transform: jI } = jH[mD(0x694, 'd]K1')]
      bF[mD('0x1e0', 'PYT8')](jE[mC('0x7f8')]),
        jI && bF[mC('0x3df')](jI),
        bF[mD(0x94c, '5alY')](jF[mC(0x1e6)][mD(0x351, ')@c%')]),
        jF[mC(0x86c)](bF),
        jG[mC(0x5fe)]()
    }
    [kk('0x54a', '%qqk')]() {
      const mF = kl,
        mE = kk,
        jE = this[mE('0x2dd', 'WgvK')]()
      if (!jE) return
      const { editTarget: jF } = this,
        { boxBounds: jG } = jF
      jF instanceof aq[mE(0x90e, 'ory)')] && (jF[mE('0x3fc', 'DG48')] = void 0x0),
        bF[mE('0x331', 'z3lP')](this[mE('0xa9a', 'ory)')][mE('0xf3', 'CiU*')]),
        bF[mE(0x24e, 'd]K1')](jF[mE('0x309', 'LV#p')])
      const jH = {}
      jH[mE(0x851, 'rp&E')] = mF('0xbf')
      const jI = bF[mE('0x163', 'IRAu')](),
        { scaleX: jJ, scaleY: jK, rotation: jL, skewX: jM, skewY: jN } = jI,
        jO = jI['x'] - jG['x'],
        jP = jI['y'] - jG['y'],
        jQ = Object[mE('0x15a', 'Q1[s')](Object[mE('0x179', 'Mi8H')]({}, jE), jH),
        jR = {}
      ;(jR[mE('0x89c', '%SI*')] = jG[mF('0xa80')]),
        (jR[mE('0x519', 'q&7n')] = jG[mF(0x1ae)]),
        (jQ[mE(0x347, 'fXk5')] && delete jQ[mE(0x481, 'y#3q')],
        jQ[mF('0x447')] && delete jQ[mE(0xa4d, 'PYT8')],
        jQ[mF(0x657)] && delete jQ[mF('0x657')],
        jQ[mE('0x398', 'YtNy')] && delete jQ[mF('0x444')],
        jQ[mF('0x617')] && delete jQ[mE(0x650, '3t[N')],
        jQ[mE(0x386, 'F0QA')] && delete jQ[mE('0x545', 'lyYv')],
        (jO || jP) && (jQ[mE(0x711, 'DaC*')] = { x: jO, y: jP }),
        (0x1 === jJ && aw[mE('0x23c', 'lyYv')](0x1, jK)) || (jQ[mE('0x53a', ']RE0')] = jJ === jK ? jJ : { x: jJ, y: jK }),
        jL && (jQ[mE(0x51e, 'ory)')] = jL),
        (jM || jN) && (jQ[mE('0x512', 'jbuU')] = { x: jM, y: jN }),
        (jQ[mE(0x35f, 'ckbf')] = jR),
        this[mE('0x4a5', 'WgvK')](jQ, jE),
        this[mE('0x510', ']UNN')](),
        this[mE(0x2d2, '^hR%')]())
    }
    [kl('0x75c')](jE, jF) {
      const { editTarget: jG, paintAttrName: jH } = this
      jG[jH] = (function (jI, jJ, jK) {
        const mH = c,
          mG = b
        return aq[mG(0x1c1, 'Nuoe')](jI) ? (jI[jI[mH('0x8f0')](jK)] = jJ) : (jI = jJ), jI
      })(jG[jH], jE, jF)
    }
    [kl('0x585')]() {
      const mJ = kl,
        mI = kk
      let jE, jF
      const { fill: jG, stroke: jH } = this[mI(0x869, 'oqmg')]
      return (
        (jE = bm(jG, !0x0)) && (jF = mJ(0x449)),
        !jE && (jE = bm(jH, !0x0)) && (jF = mI('0xa56', '1!h@')),
        !jE && (jE = bm(jG)) && (jF = mJ('0x449')),
        !jE && (jE = bm(jH)) && (jF = mI('0x507', 'CiU*')),
        (this[mI(0xac8, 'DaC*')] = jF),
        jE
      )
    }
    [kl('0x5a6')]() {
      const mK = kl,
        { paintAttrName: jE } = this,
        jF = this[mK('0x2b0')]['__'][jE]
      return bp(jF, !0x0) || bp(jF)
    }
    [kk('0x9e5', '5eF6')]() {
      const mM = kk,
        mL = kl,
        { imageTarget: jE, editTarget: jF } = this,
        { dragLimit: jG } = this[mL('0x5bd')]
      ;(jE[mL('0x5b2')] = jG ? jF[mM('0x26e', 'Leeu')](mM('0x95a', 'LV#p'), mM(0x6a7, 'Mi8H')) : void 0x0),
        (jE[mL(0x4df)] = mM('0x241', 'rE!x')),
        (jF[mM('0xacb', '6N7B')] = jG ? jE[mL('0x6fd')](mL('0x3de'), jF[mL('0x1e6')]) : this[mL(0x516)]),
        (jF[mL('0x4df')] = jG ? mL('0x8f6') : this[mL('0x3f9')])
    }
    [kk('0x4f3', 'KlaA')]() {
      const mO = kl,
        mN = kk
      if (!bE()) return
      const { imageTarget: jE, editTarget: jF } = this,
        { imageEditBox: jG, clipEditBox: jH, aroundClipBox: jI } = this[mN('0x223', 'PYT8')]
      this[mN('0xa45', 'ory)')][mO('0xa76')][mN(0x5e1, '#yLL')] = jG[mN('0x9cc', 'l5Lg')] =
        this[mN('0x177', '3t[N')][mO('0x755')] && jI
          ? jE[mO(0x641)](
              jF[mN(0x927, '$r)6')](
                aq[mO(0x6b0)][mN('0x667', 'Pa%E')](
                  mN(0x109, 'CiU*') == typeof jI ? jH[mN('0x4ec', 'WgvK')] || mN(0x6d4, '^hR%') : jI,
                  jF[mN(0x2ad, '6N7B')]
                )
              )
            )
          : void 0x0
    }
    [kk(0x5f1, 'L%$W')]() {
      const mQ = kl,
        mP = kk
      this[mP(0x634, '1*m7')] &&
        (this[mP(0x542, 'F0QA')][mQ('0x391')](),
        this[mQ(0x6cb)][mQ(0x391)](),
        this[mQ(0xa6d)][mP('0x2d5', 'DaC*')](),
        this[mP(0x946, 'PYT8')][mP(0x4e6, 'ory)')](),
        this[mQ('0x3ac')][mQ(0x391)](),
        (this[mQ('0x1ac')] = this[mQ(0x6cb)] = this[mP(0x9e7, '%SI*')] = this[mQ(0x3ac)] = null),
        (this[mQ(0x2fa)] = this[mP('0x63a', 'Pa%E')] = this[mQ(0xa6d)] = null))
    }
  }),
    b8(
      [
        (jE, jF) => {
          const mS = kk,
            mR = kl,
            jG = {}
          jG[mR(0x543)] = function (jI, jJ) {
            return jI + jJ
          }
          const jH = jG
          aq[mS('0x961', 'DG48')](jE, jF, {
            get() {
              const mU = mS,
                mT = mR,
                { config: jI, userConfig: jJ } = this,
                jK = aq[mT('0x9ba')][mT('0x79f')](jI)
              for (let jV in jJ) bq[mU(0x2b6, 'Q1[s')](jV) || (jK[jV] = jJ[jV])
              const { pointSize: jL, pointHeightScale: jM, spread: jN, pointColor: jO, clipEditBox: jP } = jK,
                jQ = jO || this[mU('0x97a', 'S1^T')][mU(0x2f4, 'q&7n')][mT(0x57b)],
                jR = Math[mU('0x30d', 'rE!x')](jL * jM),
                jS = jL + jR,
                jT = jH[mU(0x5cf, '9Dju')](jR, jN),
                jU = {}
              return (
                (jU[mT(0x57b)] = void 0x0),
                (jU[mT(0x449)] = void 0x0),
                (jU[mT(0xa80)] = 0x2 * jL),
                (jU[mT(0x1ae)] = 0x2 * jL),
                (jU[mT('0x50a')] = [
                  {
                    tag: mT('0x56a'),
                    fill: jQ,
                    hitRadius: 0x5,
                    offsetX: -jT,
                    offsetY: -jT,
                    points: [
                      { x: jL, y: jL },
                      { x: 0x2 * jL, y: jL },
                      { x: 0x2 * jL, y: jS },
                      { x: jS, y: jS },
                      { x: jS, y: 0x2 * jL },
                      { x: jL, y: 0x2 * jL }
                    ]
                  }
                ]),
                (Object[mT('0xcc')](jP, {
                  point: jU,
                  middlePoint: {
                    stroke: void 0x0,
                    fill: void 0x0,
                    width: Math[mU('0x469', '$r)6')](1.3 * jL),
                    height: jL,
                    children: [
                      {
                        tag: mU(0x6fb, 'rE!x'),
                        fill: jQ,
                        x: 0x0,
                        hitRadius: 0x5,
                        offsetY: -jT,
                        y: jL / 0x2,
                        width: jS,
                        height: jR
                      }
                    ]
                  }
                }),
                bq[mU('0x5c9', 'LV#p')](jW => {
                  const mV = mU
                  jJ[jW] && Object[mV(0x9ee, '5alY')](jK[jW], jJ[jW])
                }),
                (this[mU(0x7d7, '5eF6')] = jK))
              )
            }
          })
        }
      ],
      ap[kl(0x306)][kl(0x7e1)],
      kl('0x11d'),
      void 0x0
    ),
    (ap[kk('0x2d4', 'PYT8')] = b8([av[kk('0x57d', 'Nuoe')]()], ap[kk('0xaa9', 'DaC*')])),
    aq[kl(0xa72)][kl(0x3e8)](kk(0x40f, 'z3lP'), kk('0xab4', 'LV#p'))
  const bG = {}
  ;(bG[kk(0x352, 'b7Er')] = []), (bG[kl(0xa0e)] = function (jE) {}), (bG[kl(0xa9d)] = function () {})
  const bH = bG,
    bI = window,
    bJ = kk('0x3ea', '%qqk'),
    bK = kk(0x19e, 'ory)'),
    bL = kk('0x96d', 'YtNy'),
    bM = (function (jE = !0x0) {
      return jE ? bI : bO
    })(),
    bN = (function (jE = !0x0) {
      const mW = kl
      return jE ? mW(0x457) : 0x0
    })(),
    bO = (function (jE = !0x0) {
      return jE ? '' : 0x1
    })(),
    bP = (function (jE = !0x0) {
      return jE ? '' : 0x5
    })(),
    bQ = (function (jE = !0x0) {
      const mX = kl,
        jF = mX(0x806)
      return jE ? bM[jF[0xa] + jF[0xe] + jF[0x9] + (jF[0x2] + jF[0x6] + jF[0xf])] : 0x5
    })(),
    bR = (function (jE = !0x0) {
      return jE ? '' : null
    })(),
    bS = (function (jE = !0x0) {
      const mY = kk
      return jE ? mY('0x2af', 'q&7n') : void 0x0
    })(),
    bT = (function (jE = !0x0) {
      return jE ? '' : void 0x0
    })(),
    bU = (function (jE = !0x0) {
      const mZ = kl
      return jE ? mZ(0x5b1) : void 0x0
    })(),
    bV = (function (jE = !0x0) {
      const n0 = kl
      return jE ? n0('0x1b7') : void 0x0
    })(),
    bW = ['d', 'x', 'C', 'F', 'a', 'H', 'C', '8', 'o', '\x200', 'f', 'B'],
    bX = bJ[0x3] + bJ[0x4] + (aw[kk('0x458', '^hR%')](bK[0x2], bK[0x3]) + bK[0x4]) + (bL[0x4] + bL[0x5]),
    bY = c2(0xd2, 0x124, 0x134, 0x70),
    bZ = c2(0x138, 0xda, 0x1a0, 0x186),
    c0 =
      bQ[
        (function () {
          let jE = '',
            jF = 0x0
          return (
            bW[bX]((jG, jH) => {
              jF++, jF < 0x2 ? (jE = jG + bS[jH] + jE) : (jF = 0x0)
            }),
            jE
          )
        })()
      ],
    c1 = function (jE) {
      let jF = '',
        jG = 0x0
      return (
        jE[bX](jH => {
          const n2 = b,
            n1 = c
          if (n1(0x9c5) === n2('0x93b', 'YtNy')) jG++, jG < 0x3 ? (jF = c0(jH - (0x1 === jG ? bY : bZ)) + jF) : (jG = 0x0)
          else {
            if (this[n2(0x6b6, 'YtNy')](jL)[n2(0xa4f, '1!h@')] < 0x2) return
            const jJ = this[n2('0x197', '6N7B')](aS),
              jK = this[n1('0x409')](bI),
              jL = this[n1(0x409)](aD, !0x0)
            if (aC[n1(0x1c5)] || jF[n2(0x64d, 'ory)')])
              jL[n2(0xaa1, 'DG48')] && (jL[n2('0x933', 'h*]j')](), aO[n1(0xa9c)](jJ, jK) || this[n2('0x55c', 'jbuU')](jJ, jK))
            else {
              const jM = bm[n2('0x916', 'S1^T')][n2('0x894', '%qqk')](b7[n1(0x984)])
              let jN
              ;(jM[n1(0x37b)] = 'M^'),
                jL[n2(0x4bb, '1!h@')] &&
                  (jL[n1(0x391)](), aY[n2('0x5ba', 'rp&E')](jK, jJ) || (jN = this[n2('0x2de', '1*m7')](jJ, jK))),
                (this[n1('0x7d2')] = this[n2('0x82f', '3t[N')](jM, b8)),
                jN && this[n1('0x8c3')](jN, jJ)
            }
          }
        }),
        jF
      )
    }
  function c2(jE, jF, jG, jH) {
    return jF ? jE + jG : jE + jH
  }
  const c3 = function (jE, jF, jG) {
      return jG
        ? '' + jF
        : (function (jH) {
            return c1(jH)
          })(jE)
    },
    c4 = [
      [0x253, 0x31b, 0x2cd, 0x24d, 0x305, 0x2c5, 0x259, 0x31d, 0x2c0, 0x247],
      [0x247],
      [0x27f, 0x339, 0x284, 0x278, 0x34a, 0x2c1, 0x247],
      [0x26b, 0x34c, 0x28f, 0x267, 0x31c, 0x2e1],
      [0x254, 0x327, 0x280, 0x259, 0x322, 0x299],
      [0x278, 0x33d, 0x2c5, 0x268, 0x345, 0x2d1, 0x27b, 0x326, 0x278],
      [0x27a, 0x33b, 0x271, 0x26b, 0x342, 0x299, 0x268, 0x327, 0x283],
      [
        0x23b, 0x337, 0x27d, 0x237, 0x34e, 0x291, 0x233, 0x309, 0x291, 0x259, 0x31b, 0x2a2, 0x251, 0x328, 0x2a9, 0x233, 0x319,
        0x294, 0x259, 0x32b, 0x2b7, 0x247, 0x32b, 0x2ba, 0x258
      ],
      [0x256, 0x31d, 0x287, 0x247, 0x327, 0x2b8, 0x233, 0x319, 0x292, 0x259, 0x32a, 0x2d0],
      [0x23c, 0x30d, 0x26d, 0x238, 0x305, 0x2bd, 0x247, 0x320, 0x292, 0x259],
      [0x26d, 0x346, 0x2c8, 0x26f, 0x34a, 0x2b8, 0x27a, 0x32b, 0x2cb],
      [0x278, 0x33d, 0x26c, 0x26a, 0x347, 0x280, 0x269, 0x33d, 0x27d, 0x24a, 0x34c, 0x2da, 0x27e, 0x33d, 0x29f, 0x25a],
      [0x278, 0x33d, 0x2bb, 0x26a, 0x347, 0x285, 0x269, 0x346, 0x270, 0x24b, 0x34c, 0x2bd, 0x27e, 0x33d, 0x278, 0x25a],
      [0x27f, 0x339, 0x274, 0x278, 0x34a, 0x28f, 0x247, 0x310, 0x275, 0x27a, 0x346, 0x2bb, 0x26f, 0x32d, 0x29a],
      [0x274, 0x33f, 0x294, 0x26f, 0x34b, 0x26c, 0x279, 0x339, 0x2ac],
      [0x268, 0x347, 0x28c, 0x27a, 0x339, 0x2c4],
      [
        0x243, 0x307, 0x2b2, 0x231, 0x311, 0x28e, 0x23e, 0x30f, 0x2e3, 0x23c, 0x30d, 0x2e6, 0x23a, 0x30b, 0x296, 0x238, 0x309,
        0x2a4, 0x236, 0x352, 0x27a, 0x27f, 0x350, 0x2dc, 0x27d, 0x34e, 0x276, 0x27b, 0x34c, 0x27b, 0x279, 0x34a, 0x2ab, 0x277,
        0x348, 0x290, 0x275, 0x346, 0x280, 0x273, 0x344, 0x2e0, 0x271, 0x342, 0x2e8, 0x26f, 0x340, 0x2cd, 0x26d, 0x33e, 0x290,
        0x26b, 0x33c, 0x285, 0x269, 0x33a, 0x27d, 0x267, 0x332, 0x2bc, 0x25f, 0x330, 0x2bf, 0x25d, 0x32e, 0x2ad, 0x25b, 0x32c,
        0x28b, 0x259, 0x32a, 0x279, 0x257, 0x328, 0x277, 0x255, 0x326, 0x27d, 0x253, 0x324, 0x2c0, 0x251, 0x322, 0x2ca, 0x24f,
        0x320, 0x2e4, 0x24d, 0x31e, 0x2e3, 0x24b, 0x31c, 0x2a7, 0x249, 0x31a, 0x29a, 0x247
      ],
      [0x26a, 0x346, 0x2b8, 0x26f, 0x33a, 0x2a6],
      [0x267, 0x347, 0x2bb, 0x27a, 0x33a, 0x2da],
      [0x26e, 0x33b, 0x2bf, 0x27a, 0x339, 0x274, 0x269],
      [0x27a, 0x319, 0x2bf, 0x26b, 0x33c, 0x2cc, 0x275, 0x31b, 0x2b2, 0x278, 0x339, 0x2e1, 0x26e, 0x33b, 0x2cc],
      [0x26a],
      [0x27f],
      [0x273],
      [0x27f, 0x33e, 0x2d9, 0x26f, 0x34a, 0x2b9, 0x26b, 0x34e, 0x2cd],
      [0x26c],
      [0x276],
      [0x27c],
      [0x26d],
      [0x27d],
      [0x277],
      [0x27f],
      [0x277],
      [0x240],
      [0x275, 0x34c, 0x2be, 0x276, 0x351, 0x28d, 0x278, 0x33b, 0x2b4],
      [0x267, 0x34c, 0x2c4, 0x267, 0x33c, 0x2a4],
      [0x26b, 0x33c, 0x2d5, 0x275, 0x33b, 0x286, 0x26b, 0x33c, 0x2bb],
      [0x27a, 0x348, 0x286, 0x27f, 0x34a, 0x2ac, 0x269, 0x33d, 0x28f, 0x26a],
      [0x234],
      [0x274, 0x347, 0x2d1, 0x26f, 0x34c, 0x2ab, 0x26f, 0x33c, 0x2da, 0x26b],
      [0x26b, 0x33c, 0x26a, 0x275, 0x33b, 0x2cc, 0x274, 0x33d, 0x28a],
      [
        0x27a, 0x346, 0x2ac, 0x26b, 0x346, 0x294, 0x275, 0x348, 0x2a5, 0x273, 0x347, 0x26d, 0x249, 0x321, 0x295, 0x258, 0x32d,
        0x2c3, 0x26b, 0x33c, 0x28a, 0x275, 0x33b, 0x276, 0x274, 0x33d, 0x2ad
      ],
      [0x26e, 0x34c, 0x2e2, 0x26f, 0x32f, 0x2d2, 0x279, 0x33c, 0x2dc, 0x274, 0x33d, 0x279],
      [0x278, 0x347, 0x2c6, 0x278, 0x34a, 0x2dd, 0x26b],
      [0x26b, 0x34a, 0x2b5, 0x26f, 0x348, 0x2b8, 0x27e, 0x33d, 0x2dc],
      [0x26e, 0x33b, 0x2ae, 0x27a, 0x33d, 0x2e8, 0x26c],
      [0x26e, 0x33b, 0x2d7, 0x267, 0x31d, 0x288, 0x278, 0x347, 0x2dc, 0x26c],
      [0x273, 0x347, 0x2d8, 0x278, 0x33e, 0x2b1],
      [0x26b, 0x34c, 0x2c0, 0x267, 0x31c, 0x280, 0x27a, 0x33d, 0x2aa, 0x26d],
      [0x273, 0x33d, 0x27e, 0x27a, 0x321, 0x2b5, 0x27a, 0x33d, 0x2dc, 0x26d],
      [0x26b, 0x345, 0x2da, 0x26f, 0x32c, 0x2d4, 0x27a, 0x33d, 0x290, 0x26d],
      [0x26e, 0x34b, 0x2cc, 0x267, 0x340, 0x2bf],
      [0x27a, 0x340, 0x291, 0x26d, 0x341, 0x2b8, 0x26b, 0x340, 0x28c],
      [0x26b, 0x345, 0x2b4, 0x267, 0x346, 0x2c1, 0x27a, 0x34b, 0x28d, 0x275, 0x340, 0x2e4],
      [0x26a, 0x341, 0x2a1],
      [0x27f, 0x33d, 0x28f, 0x251, 0x34c, 0x2ca, 0x278, 0x347, 0x27c, 0x276, 0x345, 0x280, 0x26f],
      [0x279, 0x33d, 0x26a, 0x26a, 0x34d, 0x2bf, 0x272, 0x33b, 0x2d0, 0x274, 0x341, 0x2b0],
      [0x27c, 0x341, 0x29c],
      [0x27f, 0x33d, 0x2d6, 0x271],
      [0x279, 0x351, 0x283, 0x26b, 0x343, 0x29c],
      [0x261],
      [0x26e, 0x34c, 0x2cf, 0x26d, 0x346, 0x2be, 0x26b, 0x344, 0x27c],
      [0x27a, 0x34b, 0x29d, 0x26f, 0x344, 0x2c4],
      [
        0x26b, 0x33f, 0x2da, 0x267, 0x34a, 0x289, 0x275, 0x34c, 0x2c2, 0x259, 0x344, 0x2a4, 0x267, 0x33b, 0x284, 0x275, 0x344,
        0x2b4
      ],
      [0x27a, 0x34b, 0x286, 0x275, 0x340, 0x2d3, 0x272, 0x339, 0x2ad, 0x269, 0x347, 0x280, 0x272],
      [0x274, 0x347, 0x29d, 0x26f, 0x34c, 0x2b1, 0x267, 0x33b, 0x2a0, 0x275, 0x344, 0x2a9],
      [0x26b, 0x345, 0x2ce, 0x267, 0x346, 0x29d],
      [0x278, 0x347, 0x27d, 0x27a, 0x339, 0x273, 0x26d, 0x341, 0x2e7, 0x27c, 0x339, 0x293, 0x274],
      [0x26b, 0x346, 0x2c0, 0x26f, 0x344, 0x277, 0x26c, 0x33e, 0x2a4, 0x275],
      [0x237],
      [0x26b, 0x34b, 0x26f, 0x278, 0x339, 0x2bb, 0x276],
      [0x23e, 0x34b, 0x26c, 0x269, 0x343, 0x280, 0x276],
      [0x27d, 0x339, 0x2ac, 0x278],
      [0x26b, 0x33b, 0x2e6, 0x267, 0x344, 0x2cc, 0x276, 0x33d, 0x26f, 0x278],
      [0x263],
      [0x274, 0x33d, 0x27f, 0x26b, 0x34a, 0x29b, 0x269, 0x34b, 0x29f],
      [0x273, 0x33d, 0x275, 0x27a, 0x321, 0x2e1, 0x27a, 0x33d, 0x2a0, 0x279],
      [0x27a, 0x34d, 0x281, 0x275, 0x33d, 0x2bb, 0x273, 0x341, 0x2c7, 0x25a, 0x34c, 0x2c0, 0x26b, 0x34b, 0x291],
      [0x26b, 0x34a, 0x28f, 0x27b, 0x34c, 0x28c, 0x267, 0x346, 0x2cb, 0x26d, 0x341, 0x295, 0x279],
      [0x26b, 0x33b, 0x291, 0x26f, 0x344, 0x2a4, 0x279],
      [0x26b, 0x345, 0x2ba, 0x275, 0x34b, 0x2de],
      [0x26f, 0x343, 0x2ad, 0x276, 0x34b, 0x28e],
      [0x27a, 0x341, 0x286, 0x272, 0x348, 0x2bf, 0x279],
      [0x26e, 0x34c, 0x2ce, 0x26f, 0x32f, 0x27c, 0x279, 0x34c, 0x2cd, 0x278, 0x339, 0x2a5, 0x27a, 0x34b, 0x2e4],
      [0x279, 0x34d, 0x2dc, 0x27a, 0x339, 0x2aa, 0x27a, 0x34b, 0x2d0],
      [0x27f, 0x33e, 0x299, 0x26f, 0x33f, 0x2be, 0x274, 0x341, 0x2b0, 0x278, 0x34c, 0x284, 0x279],
      [0x26d, 0x346, 0x26a, 0x26f, 0x34a, 0x2c6, 0x27a, 0x34b, 0x27a, 0x268, 0x34d, 0x2d5, 0x279],
      [0x26b, 0x344, 0x2a8, 0x27a, 0x33a, 0x26b, 0x27b, 0x34b, 0x28e],
      [0x279, 0x34b, 0x2b7, 0x26b, 0x33b, 0x2c6, 0x269, 0x34d, 0x27b, 0x279],
      [0x26e, 0x34c, 0x26a, 0x26d, 0x346, 0x2a9, 0x26b, 0x324, 0x2d7, 0x26d, 0x339, 0x2da, 0x27a],
      [0x27a, 0x350, 0x27c, 0x26b, 0x34c, 0x290],
      [0x274, 0x33d, 0x2a9, 0x26e, 0x34c, 0x2a9],
      [0x27a, 0x346, 0x2a9, 0x26b, 0x33f, 0x2d5, 0x247, 0x34a, 0x274, 0x26b, 0x34b, 0x2b0, 0x27b],
      [0x27f, 0x33e, 0x274, 0x26f, 0x34a, 0x27d, 0x26b, 0x34e, 0x2bf],
      [0x235, 0x346, 0x2c0, 0x26f, 0x339, 0x2a1, 0x273, 0x347, 0x2e7, 0x26a, 0x307, 0x2b4],
      [
        0x235, 0x351, 0x273, 0x26c, 0x341, 0x26b, 0x278, 0x33d, 0x2a2, 0x27c, 0x307, 0x28d, 0x26e, 0x34c, 0x287, 0x27b, 0x339,
        0x2c5, 0x233, 0x348, 0x2a7, 0x276, 0x339, 0x2db, 0x235, 0x345, 0x2db, 0x275, 0x33b, 0x28c, 0x234, 0x34f, 0x29c, 0x275,
        0x34a, 0x2c0, 0x26d, 0x350, 0x2b6, 0x276, 0x306, 0x283, 0x26f, 0x348, 0x2cb, 0x267, 0x307, 0x2bc, 0x235, 0x312, 0x28a,
        0x279, 0x348, 0x273, 0x27a, 0x34c, 0x2d6, 0x26e
      ],
      [0x26e, 0x34c, 0x26e, 0x26a, 0x341, 0x2d0, 0x27d],
      [0x236]
    ],
    c5 = (function (jE, jF, jG) {
      return jE + jG
    })(0x1, 0x0, 0x2)
  function c6(jE, jF, jG) {
    const n3 = kl
    return jG
      ? bO + jE
      : (function (jH = !0x0) {
          return jH ? c4 : bR
        })()[aw[n3('0x8e9')](jF, c5)]
  }
  const c7 = (function (jE = !0x0) {
      return jE ? c3 : bR
    })(),
    c8 = c7(c6(0xb, 0x0), 0x115),
    c9 = c7(c6(0x128, 0x3), 0xbf),
    cb = c7(aw[kl(0x103)](c6, 0x42, 0x6), 0xa3),
    cc = c7(c6(0x8, 0x9), 0x41),
    cd = c7(aw[kk(0x2be, 'DG48')](c6, 0x123, 0xc), 0x64),
    cf = c7(c6(0xc8, 0xf), 0x112),
    cg = c7(c6(0x43, 0x12), 0x12),
    ch = c7(c6(0x57, 0x15), 0x4c),
    cj = c7(c6(0x30, 0x18), 0x73),
    ck = c7(c6(0x76, 0x1b), 0x40),
    cl = c7(c6(0x43, 0x1e), 0x11c),
    cm = aw[kk(0xa9f, ')@c%')](c7, c6(0x1b, 0x21), 0xaf),
    cp = aw[kl('0xa34')](c7, c6(0xd, 0x24), 0x30),
    cq = c7(c6(0x6b, 0x27), 0x19),
    cu = aw[kl('0x36e')](c7, c6(0x81, 0x2a), 0xb8),
    cv = c7(c6(0x6f, 0x2d), 0x11f),
    cw = c7(c6(0x83, 0x30), 0x108),
    cx = c7(c6(0x65, 0x33), 0xf0),
    cy = c7(c6(0xc8, 0x36), 0x9e),
    cz = c7(c6(0xf7, 0x39), 0xf9),
    cA = aw[kk('0x3d9', 'lyYv')](c7, c6(0xfd, 0x3c), 0x6c),
    cB = c7(c6(0x11b, 0x3f), 0x18),
    cC = c7(c6(0xc6, 0x42), 0xaa),
    cD = c7(c6(0xbc, 0x45), 0x39),
    cE = aw[kk(0x270, '5tUd')](c7, c6(0xee, 0x48), 0xbf),
    cF = c7(c6(0x100, 0x4b), 0x18),
    cG = aw[kl(0x103)](c7, c6(0x61, 0x4e), 0xfb),
    cH = aw[kk(0x702, 'fXk5')](c7, c6(0xfa, 0x51), 0x107),
    cI = aw[kl(0x36e)](c7, c6(0x44, 0x54), 0x4f),
    cJ = c7(c6(0x50, 0x57), 0xbc),
    cK = c7(aw[kk(0x8ee, 'Q1[s')](c6, 0x12a, 0x5a), 0x78),
    cL = c7(c6(0x95, 0x5d), 0x11a),
    cM = c7(c6(0x6a, 0x60), 0xaf),
    cN = c7(c6(0x9e, 0x63), 0xfe),
    cO = c7(c6(0x1e, 0x66), 0xbd),
    cP = c7(aw[kk('0x513', 'KlaA')](c6, 0x31, 0x69), 0x128),
    cQ = c7(c6(0x3b, 0x6c), 0x8c),
    cR = c7(c6(0xf7, 0x6f), 0x81),
    cS = c7(c6(0xfd, 0x72), 0xa3)
  c7(c6(0x32, 0x75), 0x6f)
  const cT = c7(c6(0x2, 0x78), 0x2e),
    cU = c7(c6(0x40, 0x7b), 0x56),
    cV = c7(c6(0x57, 0x7e), 0x6),
    cW = c7(c6(0x7e, 0x81), 0x1f)
  c7(c6(0x3c, 0x84), 0x53)
  const cX = c7(c6(0x10b, 0x87), 0x74),
    cY = c7(c6(0xc1, 0x8a), 0x20),
    cZ = c7(c6(0xae, 0x8d), 0x30),
    d0 = c7(c6(0x3c, 0x90), 0x8),
    d1 = c7(c6(0x123, 0x93), 0x107)
  aw[kk('0x580', '%qqk')](c7, c6(0x109, 0x96), 0x11e)
  const d2 = c7(c6(0x49, 0x99), 0x3b),
    d3 = c7(c6(0xab, 0x9c), 0xd6),
    d4 = c7(c6(0x43, 0x9f), 0x24),
    d5 = c7(c6(0xe9, 0xa2), 0xbc),
    d6 = c7(c6(0xa6, 0xa5), 0xda),
    d7 = c7(c6(0x10f, 0xa8), 0x7),
    d8 = c7(aw[kk('0x6a2', ']UNN')](c6, 0x6b, 0xab), 0x18)
  c7(c6(0x107, 0xae), 0x7c), c7(c6(0xc5, 0xb1), 0x7a)
  const d9 = c7(c6(0xae, 0xb4), 0x89),
    db = c7(c6(0xdf, 0xb7), 0x10c),
    dc = c7(c6(0xa4, 0xba), 0xf2),
    dd = c7(c6(0xe4, 0xbd), 0x98),
    df = c7(c6(0xf2, 0xc0), 0x11f),
    dg = c7(c6(0xd9, 0xc3), 0x10e),
    dh = c7(c6(0xc8, 0xc6), 0x113),
    dj = c7(aw[kk('0x968', 'h*]j')](c6, 0xcc, 0xc9), 0x53),
    dk = c7(c6(0x1a, 0xcc), 0x116),
    dl = c7(aw[kk('0x1fe', '^hR%')](c6, 0xf3, 0xcf), 0xa1),
    dm = c7(c6(0xb, 0xd2), 0xf2),
    dp = c7(c6(0xe, 0xd5), 0x10d),
    dq = c7(c6(0xa9, 0xd8), 0xbd),
    du = c7(c6(0x2a, 0xdb), 0x16),
    dv = c7(c6(0xfa, 0xde), 0xf4),
    dw = c7(c6(0x6d, 0xe1), 0x66),
    dx = c7(aw[kk(0x8a8, 'l5Lg')](c6, 0x3, 0xe4), 0xee),
    dy = c7(c6(0x8e, 0xe7), 0x7b),
    dz = aw[kl('0x26b')](c7, c6(0x6f, 0xea), 0xee),
    dA = c7(aw[kk('0x13f', 'fXk5')](c6, 0x90, 0xed), 0x67),
    dB = c7(c6(0x58, 0xf0), 0x9d),
    dC = aw[kl(0x276)](c7, c6(0x34, 0xf3), 0xb5),
    dD = c7(c6(0xd6, 0xf6), 0xb9),
    dE = c7(c6(0x120, 0xf9), 0x57),
    dF = c7(c6(0xbb, 0xfc), 0x6a),
    dG = c7(c6(0x4e, 0xff), 0x6f),
    dH = c7(c6(0x10b, 0x102), 0xc0),
    dI = c7(aw[kl(0x36e)](c6, 0xd3, 0x105), 0x116),
    dJ = c7(c6(0xcf, 0x108), 0x63),
    dK = c7(c6(0x3c, 0x10b), 0xae),
    dL = c7(c6(0xe, 0x10e), 0xa5),
    dM = c7(c6(0x12a, 0x111), 0x94),
    dN = c7(aw[kl('0x176')](c6, 0x24, 0x114), 0xd7),
    dO = c7(c6(0xde, 0x117), 0x11a),
    dP = c7(c6(0x3c, 0x11a), 0xec),
    dQ = c7(c6(0xf, 0x11d), 0x2b),
    dR = c7(c6(0x60, 0x120), 0x59),
    dS = aw[kl('0x407')](c7, c6(0x50, 0x123), 0x57)
  function dT(jE) {
    const n4 = kk
    return n4('0x1e7', 'Leeu') == typeof jE
  }
  const dU = (function (jE = !0x0) {
      return jE ? bM : eY
    })(),
    dV = ck,
    dW = dC,
    dX = dU[cy],
    dY = cx,
    dZ = dU[cO],
    e0 = dU[cp],
    e1 = dp,
    e2 = dZ[dI],
    e3 = dU[cm],
    e4 = dU[cq],
    e5 = e2 && e2[d6],
    e6 = e2 && e2[dO],
    e7 = e2 && e2[cR],
    e8 = cj,
    e9 = e2 && e5[dY](e2),
    eb = e2 && e6[dY](e2),
    ec = e2 && e7[dY](e2),
    ed = dU[cd],
    ef = cA,
    eg = ch,
    eh = dU[cv],
    ej = dU[dg],
    ek = cQ,
    el = cT,
    em = cY,
    ep = df,
    eq = dU[dw],
    eu = dU[dj],
    ev = dU[dd],
    ew = dU[cX],
    ex = dU[cU],
    ey = (function (jE = !0x0) {
      const n5 = kl
      return jE ? au[n5('0xa72')] : eZ
    })(),
    ez = ed[dm],
    eA = ed[dG],
    eB = dT,
    eC = ej[d4]
  function eD(jE, jF, jG) {
    return jF
      ? (function (jH, jI) {
          return jH + jI
        })(jE, jG)
      : jE
  }
  dU[dy]
  const eE = aw[kk(0xa28, 'z3lP')](eD, 0x5c, 0xc, 0x24),
    eF = dU[cc],
    eG = eD(0x3, 0x2, 0x9),
    eH = eD(0x1, 0x2, 0x2),
    eI = eG + eH,
    eJ = dU[cf],
    eK = cV,
    eL = dD,
    eM = dU[cl],
    eN = d7,
    eO = du,
    eP = eD(0xc, -0x10, -0xc),
    eQ = dU[cb],
    eR = dE,
    eS = dB,
    eT = dU[cg],
    eU = f1(),
    eV = f2(),
    eW = eD(0x9, 0x6, -0x8),
    eX = eD(0x48, 0x1f, eE),
    eY = 0x8,
    eZ = 0x3
  function f0(jE = !0x0) {
    return jE ? new eT() : eU
  }
  function f1(jE = !0x0) {
    return jE
  }
  function f2(jE = !0x0) {
    return !jE
  }
  const f3 = f0(),
    f4 = eD(0x7, 0x2, eH),
    { isArray: f5 } = eQ,
    f6 = eD(0x9, 0xc, 0xb),
    f7 = eD(0x20, 0x24, 0x21),
    f8 = e4,
    f9 = ef,
    fb = f0(),
    fc = f0(),
    fd = bV[dH](f6)
  function ff(jE) {
    let jF
    try {
      jF = ez(jE)
    } catch (jG) {}
    return jF
  }
  cw[dD]('')[em]((jE, jF) => {
    ;(fb[cw[jF]] = jF), (fc[fd[jF]] = jF)
  })
  const fg = bV[dH](f7 + f6)
  function fh(jE, jF = 0x0, jG = 0x0) {
    let jH,
      jI = ''
    const jJ = jE[dD](''),
      jK = jG ? fg : fd
    return (
      jJ[em](jL => {
        const n6 = b
        ;(jH = fb[jL]),
          aw[n6(0x235, 'DaC*')](jH, eP) &&
            ((jH += jF), jH >= f7 && (jH -= f7), (jI = jG ? aw[n6(0x1bf, 'F0QA')](jK[jH], jI) : jI + jK[jH]))
      }),
      jI
    )
  }
  function fj(jE, jF = 0x0, jG = 0x0, jH = 0x0) {
    const n8 = kk,
      n7 = kl
    if (n7(0x4ea) !== n7('0x651')) {
      let jI,
        jJ = '',
        jK = aw[n8('0x860', ')@c%')](jG, jH)
      return (
        jE[dD]('')[em]((jL, jM) => {
          const n9 = n8
          ;(jI = fc[jL]),
            (jG && aw[n9(0xad9, 'F0QA')](jM, jG) && jM < jK) || (jI >= eP && ((jI -= jF), jI < eP && (jI += f7), (jJ += cw[jI])))
        }),
        jJ
      )
    } else {
      const jM = jG[n7(0x33d)]
      jM && (jM[n8(0x2cd, '^hR%')] > bq || bg) && ((aG = jM), (aR = !0x0))
    }
  }
  const fk = jE => jE[f9](0x0)
  function fl(jE) {
    return f8[cZ](eh(jE), fk)
  }
  const fm = ep,
    fp = eD
  function fq(jE = !0x0) {
    return jE ? fp : null
  }
  function fu(jE = !0x0) {
    return jE ? 'e' : 0x0
  }
  const fv = ['c', 'd', fu() + '8', fu() + '9', fu() + 'a', fu() + 'b'],
    fw = fq()(0x821, 0x82d, 0x42e),
    fx = fq()(0x1aa4, 0x17, 0x3),
    fy = fq()(0x8, 0x159, 0x280),
    fz = fq()(0x46, 0x22, 0x3e8),
    fA = fq()(0x294, 0x158, 0x834),
    fB = fq()(0x2a8, 0x1c, 0x19),
    fC = fq()(0x76c, 0xe6, 0x1a),
    fD = fq()(0x1, 0x8, 0x0)
  function fE(jE, jF) {
    const na = kl,
      jG = {}
    jG[na(0x725)] = function (jI, jJ) {
      return jI + jJ
    }
    const jH = jG
    if (
      jE ===
      (function (jI = !0x0) {
        const nc = na,
          nb = b
        if (nb('0x1ad', 'fXk5') === nc(0x873)) {
          const { multipleSelect: jK, continuousSelect: jL } = this[nc('0x297')][nb('0x365', 'TdJ1')][nb(0x74d, '$r)6')]
          return jK && (this[nc('0x3ae')](jI) || jL)
        } else return jI ? fm : null
      })()
    )
      return eU
    if (!jE) return eU
    if (0x4 === jE[eL](cS)[db])
      return (function (jI) {
        const jJ = jI[eL](cS),
          jK = Number(jJ[0x0]),
          jL = Number(jJ[0x1])
        return jK === fw - 0xbd0 ||
          jK === fx - 0x1a9d ||
          (jK === fy - 0x1c8 && jL === fz - 0x386) ||
          (jK === fA - 0xa1c && jL >= fB - 0x2b1 && jL <= fC - 0x767)
          ? eU
          : eV
      })(jE)
    return jE[eN](cN)
      ? (function (jI, jJ) {
          const nd = na,
            jK = jI[eO](d9, '')[eO](dv, '')
          return !(jK !== jH[nd('0x725')](cN + cN, fD) && !fv[eS](jL => jK[eR]('f' + jL))) || (jJ ? jJ[eN](jK) : eV)
        })(jE, jF)
      : eV
  }
  const fF = dh,
    fG = d8,
    fH = dq,
    fI = dK,
    fJ = cR,
    fK = eE,
    fL = eD(0x2, 0x6, 0x2),
    fM = eG + fL
  function fN(jE, jF) {
    const jG = {
      yNgpX: function (jH, jI, jJ, jK) {
        return jH(jI, jJ, jK)
      }
    }
    return b9(this, arguments, void 0x0, function* (jH, jI, jJ = c8, jK = fK) {
      const nf = b,
        ne = c
      if (ne('0x8e6') === ne(0x8e6)) {
        const jL = {}
        jL[nf('0x779', 'b7Er')] = jJ
        const jM = jH[dA](fM, jH[db] - fM),
          jN = jH[dA](jH[db] - fM, jH[db] - fL),
          jO = yield e9(fH, jI, jL, !0x1, [fJ]),
          jP = {}
        return (jP[fF] = jJ), (jP[fG] = jN), (jP[fI] = jK), jG[ne('0x6de')](ec, jP, jO, jM)
      } else return this[ne(0x79d)][nf(0x846, 'IRAu')][this[ne('0x44d')]] || {}
    })
  }
  const fO = d2,
    fP = dh,
    fQ = dO,
    fR = cR,
    fS = eg,
    fT = e8,
    fU = dV,
    fV = dW,
    fW = e1
  function fX(jE, jF) {
    return b9(this, void 0x0, void 0x0, function* () {
      const jG = {}
      ;(jG[fP] = fT), (jG[fO] = fU)
      const jH = yield e9(fW, jE, jG, !0x1, [fR])
      return yield ec(fT, jH, jF)
    })
  }
  let fY, fZ, g0
  const g1 = ey
  let g2
  const g3 = eD(0x8, 0x6, 0x5),
    g4 = eD(0x2, 0xb, 0xc)
  function g5() {
    const jE = {
      NHsYS: function (jF, jG, jH, jI, jJ) {
        return jF(jG, jH, jI, jJ)
      }
    }
    return b9(this, arguments, void 0x0, function* (jF = eU) {
      return jF
        ? (function () {
            const ng = c
            return jE[ng('0x936')](b9, this, void 0x0, void 0x0, function* () {
              const jG = bU,
                jH = jG[g3] + jG[g4]
              return fl(fj(jG, eJ(jH), eG, eH))
            })
          })()
        : yield (function () {
            return b9(this, void 0x0, void 0x0, function* () {
              const ni = b,
                nh = c,
                jG = {}
              ;(jG[nh('0x216')] = nh('0x3de')), (jG[nh(0x996)] = ni('0x48f', '5tUd'))
              const jH = jG
              if (nh(0x392) !== nh('0xac0')) {
                const jI = fl(fj(bP)),
                  jJ = fl(fj(bT))
                return yield fX(jI, jJ)
              } else {
                const { imageTarget: jL, editTarget: jM } = this,
                  { dragLimit: jN } = this[nh('0x5bd')]
                ;(jL[nh(0x5b2)] = jN ? jM[nh('0x6fd')](jH[nh(0x216)], nh(0x5f7)) : void 0x0),
                  (jL[nh(0x4df)] = jH[ni('0x342', '%SI*')]),
                  (jM[ni('0xa7', 'z3lP')] = jN ? jL[nh('0x6fd')](ni(0x1bb, 'jbuU'), jM[nh(0x1e6)]) : this[ni('0x7fa', 'CiU*')]),
                  (jM[ni(0x73e, 'TdJ1')] = jN ? nh(0x8f6) : this[ni(0x85a, 'lyYv')])
              }
            })
          })()
    })
  }
  function g6(jE, jF) {
    return b9(this, void 0x0, void 0x0, function* () {
      const nk = c,
        nj = b,
        jG = {
          HGFjr: function (jL, jM, jN, jO, jP) {
            return jL(jM, jN, jO, jP)
          }
        }
      fY && fY[nj(0xa21, 'PYT8')](jL => g7(jL, e4))
      const jH = yield g5(),
        jI = yield fN(new e4(jE), jH),
        jJ = yield g7(jI, jF),
        jK = yield jF[nk(0x1ce)]
          ? (function (jL, jM) {
              return b9(this, void 0x0, void 0x0, function* () {
                const nm = b,
                  nl = c,
                  jN = {}
                for (const jO of jL) g8(jO, jM), (jN[jO[nl('0x37b')]] = new e4(jO[nm('0x54c', 'Pa%E')]))
                return yield jM[nm('0x1b3', '5tUd')](jN)
              })
            })(jJ, jF)
          : (function (jL, jM) {
              const nn = nk
              return jG[nn('0x52c')](b9, this, void 0x0, void 0x0, function* () {
                const np = nn,
                  no = b
                for (const jO of jL) g8(jO, jM)
                const jN = yield jM[no('0x6be', '$r)6')](jL)
                return yield jM[np('0x637')](jN)
              })
            })(jJ, jF)
      fZ && fZ(jK)
    })
  }
  function g7(jE, jF) {
    return b9(this, void 0x0, void 0x0, function* () {
      const nr = c,
        nq = b
      if (dT(jE)) return
      let jG
      try {
        const jH = yield jF[nq('0x9d3', '%qqk')](new g9[nr('0x560')](jE))
        jG = yield jF[nr(0x959)](jH[nq(0x78d, ']RE0')])
      } catch (jI) {
        g0 && g0(jI)
      }
      return jG
    })
  }
  function g8(jE, jF) {
    const nt = kk,
      ns = kl
    if ((jF[ns(0x64f)] && (jE[ns('0x37b')] = jF[nt('0x5c8', 'WgvK')](jE[ns(0x37b)])), jF[nt(0x69d, '^hR%')])) {
      const jG = new e3()[ek](jE[nt('0x54c', 'Pa%E')])
      jE[ns('0x4cd')] = new e0()[el](jF[nt('0x287', ')@c%')](jG, jE[nt(0x26a, 'TdJ1')]))
    }
  }
  const g9 = window
  function gb(jE, jF, jG) {
    const nu = kk,
      jH = new eF()[d0](),
      jI = {}
    ;(jI[d5] = jF), (jI[cP] = ex(eu[dN] + cN + eq[dR] + cN + eq[d3] + cN + jH))
    const jJ = ev[d1](jE)
    if (jJ) {
      const jK = jJ[db] - 0x2,
        jL = fj(jJ[dH](jK)),
        jM = (function (jN) {
          let jO
          try {
            jO = ff(eh(jN))
          } catch (jP) {}
          return jO
        })(fj(jJ, eJ(jL[0x0] === dS ? jL[0x1] : jL), jK, 0x2))
      if (jM) {
        const jN = jM[dO]
        if (void 0x0 === jN) jG && aw[nu('0x928', 'lyYv')](jG, jE, jI)
        else {
          if (!0x1 === jN) return !0x1
          jI[dO] = jN
        }
      }
      if (jJ === gd(jI)) return !0x0
    } else jG && jG(jE, jI)
    return jI
  }
  function gc(jE, jF) {
    ev[dx](jE, gd(jF))
  }
  function gd(jE) {
    const nv = kl,
      jF = new eF()[d0](),
      jG = jF < f4 ? dS + jF : aw[nv(0x6ce)](jF, '')
    return aw[nv('0x36e')](fh, dX(aw[nv(0x2fe)](eA, jE)), jF) + fh(jG)
  }
  let gf
  !(function (jE) {
    ;(function (jF = !0x0) {
      return jF ? g1 : btoa
    })()[cE] = function (jF) {
      const nx = c,
        nw = b
      if (nw(0x3cb, '9Dju') !== nx('0x5d9')) {
        const jH = {}
        jH[nw('0x493', '6N7B')] = function (jJ, jK) {
          return jJ >= jK
        }
        const jI = jH
        return (
          bg &&
          !aG &&
          (function (jJ, jK) {
            const ny = nw
            return jI[ny('0x40a', 'b7Er')](jJ, (jK || aD) - aC)
          })(aB[aS], bI)
        )
      } else return jE ? jE[jF] : eV
    }
  })(g2)
  const gg = eC,
    gh = dX
  let gj, gk
  const gl = eD(0x1a, 0x23, 0x36),
    gm = fj(bN)
  function gp(jE = eU) {
    const nA = kl,
      nz = kk
    if (nz(0x459, '$r)6') !== nA('0x7e5')) {
      const jG = aI[nz(0x800, 'F0QA')],
        jH = this[nz(0x9d6, 'L%$W')](jG, au)
      if (((this[nz('0xa37', 'WgvK')][nz('0x764', '9Dju')] = !!jH && !bq[nA('0x321')]), jH)) {
        const jI = aG[nA('0x705')](jH)
        this[nz(0x845, 'rE!x')][nz('0xaa6', 'Q1[s')](jI)
      }
    } else
      return jE
        ? (function (jG = !0x0) {
            return jG ? fY : g8
          })()
        : eC
  }
  const gq = eD(0x12, 0x24, 0x3f),
    gu = eD(0x1a, 0x3e, 0x38)
  function gv(jE = eU) {
    return jE ? gh : gj
  }
  function gw(jE = eU) {
    return jE ? gg : gk
  }
  function gx(jE, jF, jG) {
    const jH = {
        OoeXO: function (jK) {
          return jK()
        },
        WsROr: function (jK, jL) {
          return jK === jL
        }
      },
      jI = (function (jK = eU) {
        const nD = b,
          nC = c,
          jL = {
            Jfpfm: function (jM) {
              const nB = c
              return jH[nB(0x5e2)](jM)
            }
          }
        if (jH[nC(0x527)](nC(0x97c), nD('0x696', 'lyYv')))
          (this[nD(0x93e, 'KlaA')] = bq),
            (function (jN) {
              const nE = nC
              if (!jL[nE('0xe6')](aS)) return
              jN[bI][aD][aC] = !0x0
            })(jJ)
        else {
          const jN = [cB, cF],
            jO = [cG, cH],
            jP = [cI, cJ],
            jQ = [cK, cL],
            jR = [cM, cC, cD]
          return jK ? [jN, jO, jP, jQ, jR] : gp
        }
      })(),
      jJ = (function (jK = eU) {
        return jK ? [eJ, eM, eQ, eF, ed] : gv()
      })()
    !(function (jK, jL) {
      const jM = jK[cP],
        jN = jM['e'] || eW
      f3[jM[d5]] === eA(jK)
        ? (jM[dc][em](jO => {
            eB(jO) && (jL[jO] = jN)
          }),
          (f3[jM[d5]] = gk = dS))
        : (gj = eU)
    })(jG, jF),
      jI[em]((jK, jL) => {
        const jM = f0()
        jE && eT[cu](jM, jF),
          (function (jN, jO, jP, jQ) {
            jN[em](jR => {
              jP[jO][jR] =
                jQ ||
                function (jS) {
                  return jS ? eV : eU
                }
            })
          })(
            jK,
            jL,
            jJ,
            jE &&
              function (jN, jO) {
                const nF = b,
                  jP = {}
                jP[nF('0x353', 'IRAu')] = function (jR, jS) {
                  return jR >= jS
                }
                const jQ = jP
                return (
                  jN &&
                  !gj &&
                  (function (jR, jS) {
                    const nG = c
                    return jQ[nG('0x32d')](jR, (jS || eI) - eI)
                  })(jM[jN], jO)
                )
              }
          )
      })
  }
  function gy(jE) {
    return b9(this, void 0x0, void 0x0, function* () {
      const jF = yield (function () {
          return b9(this, void 0x0, void 0x0, function* () {
            const jH = fl(fj(bO)),
              jI = fl(fj(bR))
            return yield fX(jH, jI)
          })
        })(),
        jG = yield fN(
          fl(jE),
          (function (jH = !0x0) {
            return jH ? new e4() : f0
          })()(jF)
        )
      return (function (jH = !0x0) {
        return jH ? new e3() : f2
      })()[ek](jG)
    })
  }
  function gz(jE) {
    const jF = {
      WbCRQ: function (jG, jH, jI, jJ, jK) {
        return jG(jH, jI, jJ, jK)
      }
    }
    return b9(this, void 0x0, void 0x0, function* () {
      const jG = yield (function (jQ) {
          return b9(this, void 0x0, void 0x0, function* () {
            if (jQ[gl] === c9) (jQ = fj(jQ, eP, gl, eW)), (gk = yield gy(jQ))
            else {
              const jR = jQ[gq] + jQ[gu]
              gk = eh(fj(jQ, eJ(jR), gl, eH))
            }
            return gk
          })
        })(jE),
        jH = (function (jQ, jR = eU) {
          return jR ? ff(jQ) : gl
        })(jG)
      if (!jH) return
      const jI = jH[cP],
        jJ = jH[dz]
      if (!jI || !jJ) return
      const jK = jI[d5],
        jL = jI[dk],
        jM = jI['p']
      if (
        !(function (jQ, jR, jS) {
          let jT
          return (
            jR &&
              jR[em](jU => {
                jS ? jQ === jU && (jT = !0x0) : (jQ === jU || jQ[eK](cS + jU)) && (jT = !0x0)
              }),
            jT || (!jS && fE(jQ, jR)) ? eU : eV
          )
        })(gw(), jI[cP][0x1], jM)
      )
        return
      const jN = d2 + jK,
        jO = (function (jQ, jR, jS) {
          const jT = gb(jQ, jR, jS ? void 0x0 : gB)
          return (f3[jR] = gk), jT
        })(jN, jK, jL)
      if (!0x0 === jO) return jH
      if (!jO) return
      const jP = eb
        ? yield (function (jQ, jR) {
            const nH = c
            return jF[nH('0x561')](b9, this, void 0x0, void 0x0, function* () {
              const jS = (function (jU = !0x0) {
                  return jU ? new e0() : f1
                })()[el](eA(jQ)),
                jT = fl(jR)
              return yield (function (jU, jV, jW) {
                return b9(this, void 0x0, void 0x0, function* () {
                  const jX = {}
                  ;(jX[fP] = fS), (jX[fO] = fU)
                  const jY = yield e9(fV, jU, jX, !0x1, [fQ])
                  return yield eb(fS, jY, jV, jW)
                })
              })(fl(gm), jT, jS)
            })
          })(jI, jJ)
        : eU
      return jP ? (gc(jN, jO), jH) : void 0x0
    })
  }
  function gA(jE, jF) {
    return jF
      ? gw()
      : (function (jG) {
          return jG ? d5 : gf
        })()()(jE)
  }
  function gB(jE, jF) {
    const nI = kl,
      jG = gw()
    if (fE(jG)) return
    const jH = aw[nI('0x162')](dQ, jF[d5]),
      jI = dP + ex(jG)
    ew(jH + jI)[dM](jJ => {
      ;(function (jK) {
        return jK[dF] === eX
      })(jJ) &&
        (function (jK, jL) {
          jK[dL]()[dM](jL)
        })(jJ, jK => {
          jK === dl ? ((jF[dO] = eU), gc(jE, jF)) : jK === dS && ((jF[dO] = eV), (gj = eU), gc(jE, jF))
        })
    })
  }
  function gC() {
    const nJ = kk,
      jE = {
        yhsAd: function (jF) {
          return jF()
        }
      }
    return aw[nJ('0x4fd', 'ckbf')](b9, this, void 0x0, void 0x0, function* () {
      const nK = c,
        jF = jE[nK(0x50d)](gp)
      let jG = eP,
        jH = f0(),
        jI = eW
      jF &&
        jF[em](jJ => {
          const jK = gz(jJ)
          jK[dM](jL => {
            const jM = jL && jL[cP]
            jM &&
              (jM[dc][em](jN => {
                eB(jN) && (jH[jN] = eP)
              }),
              gx(eU, jH, jL)),
              (jG += jI) === jF[db] && ((g2 = {}), fZ)(jF[db])
          }),
            jK[cz](gA)
        })
    })
  }
  const gD = bH
  let gE,
    gF,
    gG = gM()[dc]
  function gH(jE, jF, jG) {
    return b9(this, void 0x0, void 0x0, function* () {
      const nL = c,
        jH = {
          bfjJv: function (jI, jJ) {
            return jI(jJ)
          }
        }
      return (
        jE &&
          (f5(jE) ? jE : [jE])[nL('0x78a')](jI => {
            const nN = b,
              nM = nL
            jH[nM('0x3f5')](dT, jI) &&
              ((jI = jI[nN(0x2ac, '5eF6')](/----.*?----/g, '')[nM('0x9ac')](/\s+/g, '')),
              gG[nM(0x33b)](jI) || gG[nM('0x564')](jI))
          }),
        (jF && ((gE = jF), (gF = jG)),
        new Promise((jI, jJ) =>
          (function (jK, jL) {
            try {
              jK && (bH[dJ] = jK), jL && (bH[cW] = jL), gI()
            } catch (jM) {
              jL && jL()
            }
          })(jI, jJ)
        ))
      )
    })
  }
  function gI(jE) {
    return (
      (function (jF) {
        const nO = b
        fY = aw[nO('0x6d7', 'Leeu')](jF)
      })(gJ),
      (function (jF) {
        fZ = jF
      })(gK),
      (function (jF) {
        g0 = jF
      })(gL),
      gE
        ? g6(gE, gF)
        : (function (jF, jG = eU) {
            return jG && (gf = jF) ? gC() : gv(jG)
          })(gN)
    )
  }
  function gJ(jE) {
    return gM()[dc]
  }
  function gK(jE) {
    gM()[dJ](jE)
  }
  function gL(jE) {
    gM()[cW]()
  }
  function gM(jE = !0x0) {
    return jE ? gD : gE
  }
  function gN() {
    return gM()[cW]
  }
  au[kl(0xa72)][kk('0x85c', 'l5Lg')](kl(0x1c3))
  class gO extends av[kk('0x8f2', 'l$hi')] {
    [kl('0x3b1')](jE) {
      const nQ = kl,
        nP = kk,
        { moveX: jF, moveY: jG, target: jH } = jE
      jH[nP(0x738, 'LV#p')](jF, jG), this[nQ('0x5fe')]()
    }
    [kk(0xa5f, 'l$hi')](jE) {
      const nS = kk,
        nR = kl,
        { scaleX: jF, scaleY: jG, transform: jH, worldOrigin: jI, target: jJ } = jE,
        jK = !0x1
      jH ? jJ[nR(0x911)](jH, jK) : jJ[nS(0xa78, '1!h@')](jI, jF, jG, jK), this[nS(0x4c7, 'DG48')]()
    }
    [kk(0x107, 'jbuU')](jE) {
      const nT = kl,
        { rotation: jF, transform: jG, worldOrigin: jH, target: jI } = jE
      jG ? jI[nT(0x911)](jG, !0x1) : jI[nT('0x7a5')](jH, jF), this[nT(0x5fe)]()
    }
    [kk('0x3a5', '$r)6')](jE) {
      const nU = kk,
        { skewX: jF, skewY: jG, transform: jH, worldOrigin: jI, target: jJ } = jE,
        jK = !0x1
      jH ? jJ[nU('0x49c', 'Leeu')](jH, jK) : jJ[nU('0x47b', 'DG48')](jI, jF, jG, jK), this[nU('0x784', 'Pa%E')]()
    }
    [kl(0x821)](jE, jF) {
      const nW = kk,
        nV = kl
      this[nV(0x79d)][nW('0x2eb', '#yLL')](jE, jF)
    }
    [kk(0x520, 'h*]j')]() {
      const nY = kl,
        nX = kk
      this[nX('0x92d', 'ckbf')][nY(0x3d6)](), this[nX(0x4a6, '%SI*')][nY(0x5fe)]()
    }
    [kk(0xc2, ')@c%')]() {
      const nZ = kk
      this[nZ(0x6c6, '6N7B')] = null
    }
  }
  class gP extends aq[kk(0x7f2, '^hR%')] {
    constructor(jE) {
      const o1 = kk,
        o0 = kl
      super(jE), (this[o0('0x42c')] = o1('0x778', 'ckbf'))
    }
    [kl(0x2e2)](jE, jF) {
      const o3 = kl,
        o2 = kk
      super[o2(0x147, 'oqmg')](jE, jF)
      const { x: jG, y: jH, width: jI, height: jJ } = this[o2(0x367, 'LV#p')][o2(0x255, 'YtNy')]
      ;(jE[o2(0xad, 'Nuoe')] = o3('0x7ba')), jE[o3(0x4c3)](jG, jH, jI, jJ)
    }
    [kk('0x2d5', 'DaC*')]() {
      const o5 = kk,
        o4 = kl
      super[o4(0x391)](), (this[o5('0x6b7', 'ory)')] = null)
    }
  }
  function gQ(jE) {
    const o6 = kk
    return jE ? (aq[o6(0x823, 'y#3q')](jE) ? jE : [jE]) : []
  }
  ;(ap[kl(0x38c)] = class extends av[kl(0x1f1)] {
    get [kl(0x44d)]() {
      const o7 = kk
      return o7('0xca', 'lyYv')
    }
    get [kk(0x470, 'y#3q')]() {
      const o8 = kl
      return o8(0xa06)
    }
    get [kl(0x8df)]() {
      const oa = kk,
        o9 = kl
      return this[o9(0x79d)][o9('0x11d')][this[oa('0x98e', 'fXk5')]] || {}
    }
    get [kk(0x69f, '6N7B')]() {
      const oc = kk,
        ob = kl,
        { editBox: jE } = this[ob(0x8df)],
        jF = Object[oc('0x22b', '%SI*')]({}, this[ob(0x1be)])
      return jE ? Object[oc('0x638', 'CiU*')](jF, jE) : jF
    }
    get [kk('0x9f', 'ckbf')]() {
      const oe = kk,
        od = kl,
        jE = Object[od(0xcc)]({}, this[od('0xa08')]),
        { innerEditBox: jF } = this[od('0x8df')]
      return jF ? Object[oe('0x8b1', 'YtNy')](jE, jF) : jE
    }
    get [kl('0x1e3')]() {
      const og = kk,
        of = kl,
        { imageEditBox: jE, pointSize: jF = 0xe, pointColor: jG } = this[of('0x8df')],
        { stroke: jH } = this[og('0xaaf', 'q&7n')][og('0xa6b', '%qqk')],
        jI = jG || jH,
        jJ = Object[og('0x9fd', 'q&7n')](Object[of('0xcc')]({}, this[og(0x854, '1!h@')]), {
          point: {
            stroke: void 0x0,
            fill: void 0x0,
            width: 0x2 * jF,
            height: 0x2 * jF,
            children: [
              {
                tag: og('0x4e0', 'lyYv'),
                fill: jI,
                hitRadius: 0x5,
                points: [
                  { x: jF, y: jF },
                  { x: 0x2 * jF, y: jF },
                  { x: 0x2 * jF, y: Math[of('0x6d1')](aw[og('0x422', '5tUd')](1.3, jF)) },
                  { x: Math[of(0x6d1)](1.3 * jF), y: Math[of(0x6d1)](1.3 * jF) },
                  { x: Math[og(0x9af, 'l$hi')](1.3 * jF), y: 0x2 * jF },
                  { x: jF, y: aw[of(0x3dc)](0x2, jF) }
                ]
              }
            ]
          },
          middlePoint: {
            stroke: void 0x0,
            fill: void 0x0,
            width: Math[og('0x30d', 'rE!x')](1.3 * jF),
            height: jF,
            children: [
              {
                tag: of(0x78e),
                fill: jI,
                x: 0x0,
                hitRadius: 0x5,
                y: jF / 0x2,
                width: Math[of('0x6d1')](1.3 * jF),
                height: Math[og('0x469', '$r)6')](0.3 * jF)
              }
            ]
          }
        })
      return jE ? Object[of(0xcc)](jJ, jE) : jJ
    }
    get [kk(0x7b0, 'F0QA')]() {
      const oi = kk,
        oh = kl,
        jE = Object[oh('0xcc')]({}, this[oh('0x217')]),
        { image: jF } = this[oh('0x8df')]
      return jF ? Object[oi('0xad6', 'S1^T')](jE, jF) : jE
    }
    constructor(jE) {
      const ok = kk,
        oj = kl
      super(jE),
        (this[oj('0x1be')] = { selectedStyle: { strokeWidth: 0x0 } }),
        (this[oj('0xa08')] = {
          moveable: !0x1,
          preventEditInner: !0x0,
          keyEvent: !0x1,
          point: { opacity: 0x0 },
          strokeWidth: 0x1
        }),
        (this[ok(0x535, '5eF6')] = { strokeWidth: 0x0, preventEditInner: !0x0, editSize: ok('0x64a', 'z3lP') }),
        (this[ok(0xa41, 'LV#p')] = { opacity: 0.5, hittable: !0x1, editInner: '' }),
        (this[oj('0xa76')] = new av[oj('0x966')](jE)),
        (this[oj('0xa76')][ok('0xa10', '^hR%')] = this[ok(0x5e0, ')@c%')] = new gO()),
        (this[oj(0xa6d)][oj('0x79d')] = this[oj('0xa76')]),
        (this[oj('0xa6d')][ok(0x374, ')@c%')] = this),
        (this[ok(0x314, 'CiU*')][oj(0x33c)] = this[ok('0x24d', 'rE!x')] = new gP()),
        (this[oj(0x1e5)] = new av[oj(0x966)](jE)),
        (this[ok(0x71b, 'b7Er')][oj(0x981)] = this[ok(0x4fb, 'ckbf')] = new av[ok(0x8f2, 'l$hi')]()),
        (this[ok('0xa46', '1!h@')][ok('0x122', 'rE!x')] = this[oj(0x1e5)]),
        this[ok('0x4dc', 'Nuoe')][oj('0x564')](
          this[ok('0x5f5', 'q&7n')][ok('0x320', '5alY')](aq[ok(0x672, 'rp&E')][ok(0x770, 'oqmg')], this[ok(0x98a, 'Q1[s')], this),
          this[oj('0x1e5')][ok(0xa4c, 'l5Lg')](aq[ok(0x4c4, '^hR%')][ok('0x4f5', 'l5Lg')], this[oj(0xe5)], this),
          this[oj('0x6cb')][ok('0x140', '%SI*')](aq[oj('0xa2f')][ok('0xaac', 'q&7n')], this[ok(0x5ac, '%qqk')], this)
        )
    }
    [kl(0x305)]() {
      const om = kl,
        ol = kk
      this[ol('0x84f', 'LV#p')](), this[ol('0x477', '5tUd')](), this[ol('0x693', 'oqmg')](), this[om('0x5fe')]()
    }
    [kk(0x8e8, 'fXk5')]() {
      const oo = kk,
        on = kl
      this[on(0x1a9)](), this[oo(0x9a5, 'PYT8')]()
    }
    [kk(0x635, 'rp&E')]() {
      const oq = kk,
        op = kl,
        { innerEditBox: jE, imageEditBox: jF } = this
      this[op('0x3a3')](), jE[oq(0xa89, '^hR%')](), jF[op(0xa81)]()
    }
    [kl('0x3a3')]() {
      const os = kk,
        or = kl,
        { innerEditBox: jE, imageEditBox: jF, editBox: jG } = this
      ;(jG[or(0x65f)] = this[or('0x2c9')]),
        (jE[or('0x65f')] = this[os('0x7c7', 'ory)')]),
        (jF[os(0x5c3, 'z3lP')] = this[or(0x1e3)])
    }
    [kk(0x60d, 'b7Er')]() {
      const ou = kl,
        ot = kk,
        { editor: jE, editTarget: jF, innerEditBox: jG, transformTool: jH } = this
      jE[ot(0x21c, '^hR%')](jG), (jG[ot(0x1cf, 'DaC*')] = jF), (jH[ou(0x783)] = jE[ou('0x783')])
    }
    [kl('0x257')]() {
      const ow = kl,
        ov = kk,
        { editor: jE, editTarget: jF, imageEditBox: jG, imageTarget: jH } = this,
        jI = this[ov('0x5be', 'b7Er')]()
      ;(jH[ow(0x2ed)] = jI[ow(0x2ed)]),
        (jH[ov('0x6b7', 'ory)')] = jF),
        jH[ow('0x136')](this[ov('0x451', 'YtNy')]),
        jE[ov(0x3ff, '%SI*')][ov(0x3c3, 'rp&E')][ov(0x259, 'rp&E')][ow('0x3e8')](jH),
        jE[ow('0x3e8')](jG),
        jF[ov(0x967, 'Pa%E')] && (jF[ov(0x2bc, 'lyYv')] = jF[ow(0xa80)]),
        jF[ov(0x73b, '1!h@')] && (jF[ow('0x1ae')] = jF[ov(0xa70, 'ory)')])
    }
    [kl('0xe5')]() {
      const oy = kk,
        ox = kl,
        jE = {
          DGLeF: function (jF, jG) {
            return jF + jG
          },
          dyyjY: function (jF, jG, jH) {
            return jF(jG, jH)
          },
          tNubx: function (jF, jG, jH) {
            return jF(jG, jH)
          }
        }
      if (aw[ox('0x25e')] === ox(0x2ea)) {
        if (
          ((bR = by['x'] || 0x0),
          (bz = bA['y'] || 0x0),
          (dR = 1.5 * (bG[ox('0x37c')] || 0x0)),
          (gW = gX(i8[ox(0x7a9)] || 0x0)),
          (eQ = fQ(ap, aq + hR - gP)),
          (cR = au(av, aw + ax + ay)),
          (az = aA(aB, jE[ox('0x387')](aC + aD, aE))),
          (aF = aG(aH, aI + aJ - aK)),
          aL[oy('0x75e', 'oqmg')][ox(0x663)](aM))
        ) {
          const { strokeBounds: jG } = bf[oy('0x980', 'IRAu')]
          bg[oy('0xa24', 'q&7n')](jG)[ox('0x7a9')]([bh, eb, bj, bk]),
            jE[ox('0x64b')](bl, bm, jG),
            f9[oy('0x6d6', 'DG48')](g8),
            (bp = bq(ic, jG['y'] - hb['y'])),
            (db = jE[oy('0x47e', 'YtNy')](bu, bv, bw[ox('0x455')] - bx(jG))),
            (by = bz(bA, bB[ox('0x871')] - bC(jG))),
            (bD = bE(bF, jG['x'] - bG['x']))
        }
      } else {
        const jG = new aq[oy(0x91c, 'CiU*')](this[ox('0x2b0')][oy('0x7fb', 'oqmg')]),
          jH = this[ox(0x5a6)](),
          { transform: jI } = jH[ox(0x884)]
        jI && jG[ox('0x3df')](jI),
          jG[ox(0x6ef)](this[ox('0x6cb')][oy('0x8fe', 'l$hi')][ox(0xa48)]),
          this[oy(0x570, '1!h@')][ox('0x86c')](jG),
          this[ox('0xa76')][ox(0x5fe)]()
      }
    }
    [kl('0x5a6')]() {
      const oz = kk,
        { fill: jE } = this[oz('0x3b4', '#yLL')]['__']
      return jE && jE[oz(0xab1, 'b7Er')](jF => jF[oz('0x119', 'jbuU')])
    }
    [kl('0x585')]() {
      const oB = kl,
        oA = kk,
        { fill: jE } = this[oA('0x7de', '5alY')]
      return aq[oA(0x5c1, 'h*]j')](jE) ? jE[oB(0x327)](jF => oA('0x579', 'y#3q') === jF[oB('0x529')]) : jE
    }
    [kk(0x920, 'l5Lg')](jE, jF) {
      const oD = kk,
        oC = kl
      let { fill: jG } = this[oC('0x2b0')]
      aq[oC('0xa60')](jG) ? (jG[jG[oD(0x748, 'KlaA')](jF)] = jE) : (jG = jE), (this[oC(0x2b0)][oD('0x5c6', 'jbuU')] = jG)
    }
    [kk('0x14b', 'l5Lg')]() {
      const oF = kk,
        oE = kl,
        jE = this[oE('0x585')]()
      if (!jE) return
      const jF = this[oE('0x2b0')],
        jG = new aq[oF(0x824, 'IRAu')](this[oF(0xa91, 'fXk5')][oE('0x7f8')])
      jG[oE(0x6ef)](jF[oE('0x7f8')])
      const jH = {}
      ;(jH[oF(0xa6, ']RE0')] = oE(0x80b)),
        (jH[oF('0x293', '6N7B')] = oE(0x425)),
        (jH[oF('0x11c', ']UNN')] = !0x0),
        (jH[oE('0x2ed')] = jE[oE('0x2ed')])
      const { x: jI, y: jJ, scaleX: jK, scaleY: jL, rotation: jM, skewX: jN, skewY: jO } = jG[oE(0x2da)](),
        jP = jH
      ;(jI || jJ) && (jP[oE(0x447)] = { x: jI, y: jJ }),
        (0x1 === jK && 0x1 === jL) || (jP[oF(0x52e, 'y#3q')] = jK === jL ? jK : { x: jK, y: jL }),
        jM && (jP[oF(0x97f, '1*m7')] = jM),
        (jN || jO) && (jP[oF(0x10c, ')@c%')] = { x: jN, y: jO }),
        this[oE(0x75c)](jP, jE),
        this[oF(0x8eb, 'jbuU')]()
    }
    [kk('0x573', 'YtNy')]() {
      const oH = kl,
        oG = kk
      this[oG(0x233, 'KlaA')][oG('0x939', 'Q1[s')] = this[oH(0x8df)][oH(0x4ed)]
        ? this[oG(0x869, 'oqmg')][oG(0x8b9, 'PYT8')](oG('0x193', 'rp&E'), oG('0x8d5', '3t[N'))
        : void 0x0
    }
    [kl('0xa3c')]() {
      const oI = kk
      this[oI(0x393, 'DG48')](), this[oI(0xa2, '9Dju')][oI(0x6db, 'rp&E')](), this[oI(0x9f8, '%SI*')][oI('0xa19', '1*m7')]()
    }
    [kl(0x6f2)]() {
      const oK = kl,
        oJ = kk,
        { editBox: jE, innerEditBox: jF, imageEditBox: jG, imageTarget: jH } = this
      jH[oJ(0x7df, 'b7Er')] &&
        (this[oJ(0x174, 'd]K1')](),
        jH[oJ('0x9e6', 'YtNy')](),
        (jF[oK('0x33c')] = jH[oJ(0x169, '5eF6')] = jH[oK(0x449)] = jE[oJ('0x9b6', 'IRAu')] = void 0x0),
        jG[oK(0x433)](),
        jF[oK(0x433)](),
        jG[oK('0x243')](),
        jF[oK(0x243)]())
    }
    [kl(0x208)]() {
      const oM = kl,
        oL = kk
      this[oL(0x48a, 'TdJ1')] &&
        (this[oL('0x168', 'y#3q')][oM(0x391)](),
        this[oM(0xa6d)][oL('0x704', ']RE0')](),
        this[oM(0xa76)][oM('0x391')](),
        this[oL('0x730', 'ory)')][oL('0x4c2', 'rE!x')](),
        (this[oL('0x5e3', '1*m7')] = this[oL(0x56b, ')@c%')] = this[oL('0x1cb', 'L%$W')] = null),
        (this[oM('0x981')] = this[oL(0xacf, 'h*]j')] = this[oM('0xa6d')] = null))
    }
  }),
    (ap[kk(0x965, '1!h@')] = aw[kk('0x9c', 'CiU*')](b8, [av[kl('0x4b1')]()], ap[kl(0x38c)])),
    aq[kk(0x501, 'KlaA')][kl(0x3e8)](kk('0x1b1', 'oqmg'), kk(0x847, '%qqk'))
  class gR extends aq[kk('0x263', '5alY')] {
    get [kl('0x73d')]() {
      const oN = kl
      return gQ(this[oN(0x3d4)])
    }
    get [kk(0x81c, 'LV#p')]() {
      const oP = kl,
        oO = kk
      return aw[oO('0x4ad', 'S1^T')](gQ, this[oP(0x9cd)])
    }
    constructor(jE, jF) {
      const oQ = kk
      super(jE), jF && Object[oQ('0x3ed', 'F0QA')](this, jF)
    }
  }
  ;(gR[kk('0x1f7', 'ory)')] = kk('0xa9e', 'rE!x')), (gR[kk(0xa0b, 'h*]j')] = kl('0x1c4')), (gR[kl(0x55f)] = kl(0x463))
  const gS = (function (jE = 0x1) {
      return jE ? Array : jE
    })(),
    gT = (function (jE = 0x1) {
      const oR = kk
      return jE ? [oR(0x600, 'y#3q')] : jE
    })()
  function gU(jE) {
    return (function (jF) {
      const { g: jG } = gS,
        jH = gT[0x0],
        jI = gT[0x1]
      if (jG) return jG(jH, jF) || jG(jI, jF)
    })(jE)
  }
  const gV = [kk(0x6b2, 'lyYv')],
    gW = {}
  ;(gW[kl('0x8ab')] = !0x1), (gW[kl(0x125)] = kk(0x4f2, '9Dju'))
  const gX = {}
  ;(gX[kk(0x416, '%qqk')] = !0x0),
    (gX[kl('0x87a')] = !0x0),
    (gX[kl(0x8ab)] = !0x0),
    (gX[kk('0x531', 'YtNy')] = 0xf),
    (gX[kl(0x79d)] = gW)
  const gY = gX
  var gZ
  !(function (jE) {
    const oT = kl,
      oS = kk
    ;(jE[(jE[oS('0x4e2', '3t[N')] = 0x1)] = oS(0xa54, '1*m7')),
      (jE[(jE[oT(0xbd)] = 0x2)] = oT(0xbd)),
      (jE[(jE[oS(0x467, '^hR%')] = 0x3)] = oS('0x62a', '5eF6')),
      (jE[(jE[oT('0x863')] = 0x4)] = oS(0x99f, 'IRAu'))
  })(gZ || (gZ = {}))
  const h0 = [0.1488743389, 0.4333953941, 0.6794095682, 0.8650633666, 0.9739065285],
    h1 = [0.2955242247, 0.2692667193, 0.2190863625, 0.1494513491, 0.0666713443],
    { sqrt: h2 } = Math,
    { getDerivative: h3 } = aq[kl('0x8a6')],
    h4 = {
      getDistance(jE, jF, jG, jH, jI, jJ, jK, jL, jM = 0x1) {
        const oU = kk
        let jN,
          jO,
          jP,
          jQ,
          jR,
          jS,
          jT = 0x0,
          jU = jM / 0x2
        for (let jV = 0x0; jV < h0[oU('0x48e', 'h*]j')]; jV++)
          (jN = jU * (0x1 + h0[jV])),
            (jO = jU * (0x1 - h0[jV])),
            (jP = h3(jN, jE, jG, jI, jK)),
            (jQ = h3(jN, jF, jH, jJ, jL)),
            (jR = h3(jO, jE, jG, jI, jK)),
            (jS = h3(jO, jF, jH, jJ, jL)),
            (jT += h1[jV] * (h2(jP * jP + jQ * jQ) + h2(jR * jR + jS * jS)))
        return jT * jU
      },
      getT(jE, jF, jG, jH, jI, jJ, jK, jL, jM, jN, jO = 0x1) {
        const oV = kl
        let jP = 0x0,
          jQ = 0x1,
          jR = jE / jF,
          jS = jO / jF / 0x3
        if (jR >= 0x1) return 0x1
        if (jR <= 0x0) return 0x0
        for (; jQ - jP > jS; )
          h5(jG, jH, jI, jJ, jK, jL, jM, jN, jR) < jE ? (jP = jR) : (jQ = jR), (jR = aw[oV('0x3b2')](jP + jQ, 0x2))
        return jR
      },
      cutTwo(jE, jF, jG, jH, jI, jJ, jK, jL, jM) {
        const oX = kk,
          oW = kl,
          jN = {}
        ;(jN[oW(0x5cc)] = null), (jN[oW(0x706)] = [jH, jI, jJ, jK, jL, jM])
        if (jE <= 0x0) return jN
        const jO = {}
        ;(jO[oW('0x5cc')] = [jH, jI, jJ, jK, jL, jM]), (jO[oX(0x77b, 'ckbf')] = null)
        if (jE >= 0x1) return jO
        const jP = 0x1 - jE,
          jQ = aw[oX(0xa43, 'l5Lg')](jF * jP, jH * jE),
          jR = jG * jP + jI * jE,
          jS = jH * jP + jJ * jE,
          jT = jI * jP + jK * jE,
          jU = jJ * jP + jL * jE,
          jV = jK * jP + jM * jE,
          jW = jQ * jP + jS * jE,
          jX = jR * jP + jT * jE,
          jY = jS * jP + jU * jE,
          jZ = jT * jP + jV * jE
        return {
          left: [jQ, jR, jW, jX, jW * jP + aw[oX('0xa64', 'TdJ1')](jY, jE), jX * jP + aw[oX('0x4d3', '#yLL')](jZ, jE)],
          right: [jY, jZ, jU, jV, jL, jM]
        }
      }
    },
    { getDistance: h5 } = h4
  class h6 extends aq[kk('0x698', 'oqmg')] {
    [kk('0x6ed', 'lyYv')](jE) {
      const oZ = kk,
        oY = kl
      ;(this[oY(0x429)] = jE), this[oZ('0x874', '1!h@')][oY(0x87f)]()
    }
    [kk('0x1d5', 'lyYv')](jE) {
      const p1 = kk,
        p0 = kl
      ;(this[p0(0x195)] = jE), this[p1(0x951, 'fXk5')][p0('0x5fe')]()
    }
  }
  const h7 = (function (jE = 0x1) {
      return jE ? Number : jE
    })(),
    h8 = (function (jE = 0x1) {
      const p2 = kl
      return jE ? [p2('0x548')] : jE
    })()
  function h9(jE) {
    return (function (jF) {
      const { d: jG } = h7,
        jH = h8[0x0],
        jI = h8[0x1]
      if (jG) return jG(jH, jF) || jG(jI, jF)
    })(jE)
  }
  class hb extends aq[kl(0xda)] {
    get [kk('0x2bd', 'IRAu')]() {
      const p3 = kl
      return p3('0x43e')
    }
    get [kl('0x1c5')]() {
      const p5 = kk,
        p4 = kl
      return 'M^' === this[p4('0x984')][p5('0x902', 'ckbf')]
    }
    get [kk(0x149, 'ory)')]() {
      const p6 = kl
      return 'Z^' === this[p6('0x984')][p6('0x37b')]
    }
    get [kk('0x442', 'Nuoe')]() {
      const p7 = kk
      return !this[p7(0x807, ']UNN')][p7(0xce, 'DaC*')](this, !0x0, !0x0)
    }
    get [kl('0x4d6')]() {
      const p9 = kk,
        p8 = kl
      if (p8('0x575') === p9('0x25d', '1*m7')) {
        const jF = aq ? (aO[p9('0x67e', 'F0QA')](aT) ? aX : [aW]) : this[p8(0x681)],
          { editor: jG } = this,
          jH = {}
        ;(jH[p9('0x577', 'Leeu')] = this),
          (jH[p9('0x746', 'PYT8')] = aY['x']),
          (jH[p8('0xd3')] = b8['y']),
          (jH[p9('0x7c1', 'CiU*')] = p8(0x982))
        const jI = {}
        ;(jI[p9('0x865', '1!h@')] = this),
          (jI[p9('0x9e3', 'l5Lg')] = b9['x']),
          (jI[p9(0x538, 'oqmg')] = b4['y']),
          (jI[p9('0x69e', ']UNN')] = p8(0x982)),
          (jG[p9(0xa69, ')@c%')](aV[p8('0x5ae')]) && jG[p8('0x821')](new bm(b7[p8(0x5ae)], jH)),
          jF[p8('0x78a')](jJ => jJ[p8('0x284')](jF)),
          jG[p8('0x3e5')](aU[p9('0xa07', 'rp&E')]) && jG[p9('0xa90', 'oqmg')](new bh(bD[p9('0x5a9', 'Q1[s')], jI)))
      } else return !this[p9(0x22c, 'rE!x')][p9(0x9c8, 'S1^T')](this, !0x0, !0x1)
    }
    get [kk(0x81b, 'DG48')]() {
      const pa = kl,
        { a: jE, b: jF } = this[pa('0x984')]
      return jE || jF
    }
    constructor(jE) {
      super(jE)
    }
    [kl('0x792')](jE) {
      const pc = kk,
        pb = kl
      jE && (this[pb('0xa8e')] || this[pc(0x8f8, 'DG48')]()),
        this[pc(0x843, ']RE0')] &&
          ((this[pc(0xb1, 'l$hi')][pb(0x5b6)] = this[pc(0x50c, 'rp&E')][pc('0x2a3', 'Leeu')] = !0x1),
          jE && (('a' === jE ? this[pc(0x13d, '3t[N')] : this[pc(0x19f, '6N7B')])[pb('0x5b6')] = !0x0)),
        (this[pb('0x7fc')] = jE),
        jE && (this[pc('0xa51', 'lyYv')] = !0x0),
        this[pb('0x8c1')] && (this[pb(0x8c1)][pb('0x5b6')] = this[pb(0x5b6)] && !this[pb(0x7fc)])
    }
    [kk(0x7b9, 'd]K1')](jE) {
      const pe = kl,
        pd = kk,
        { nodeData: jF, pathEditor: jG } = this
      if (jG && 'Z^' !== jF[pd('0x17b', ']RE0')]) {
        const jH = jG[pe('0x41b')](this, !0x0, !0x1, !0x0),
          jI = jG[pd(0x3d3, 'jbuU')](this, !0x0, !0x0, !0x0),
          jJ = jH && jH[pd('0x568', 'Q1[s')],
          jK = jI && jI[pe(0x984)],
          jL = jJ || aq[pd('0x1a0', 'L%$W')][pe('0x6ea')](jK || jF, jF, 0x1, !0x1, !0x0),
          jM = jK || aq[pd('0x339', 'l$hi')][pd(0x820, '5tUd')](jJ || jF, jF, 0x1, !0x1, !0x0),
          jN = aq[pd(0x7da, ']RE0')][pd(0x2c3, 'KlaA')](jL, jF, jM),
          jO = jN <= 0x0 ? -0x1 : 0x1,
          jP = (0xb4 - jO * jN) / 0x2,
          jQ = {
            x: jF['x'] + ((jK || jJ || jF)['x'] - jF['x']) / 0x4,
            y: jF['y'] + aw[pd('0x431', 'rp&E')]((jK || jJ || jF)['y'] - jF['y'], 0x4)
          }
        switch (jE) {
          case gZ[pe(0x812)]:
            'M^' !== jF[pd(0x848, 'LV#p')] && (jF[pd(0x8d3, 'IRAu')] = 'L^'), delete jF['a'], delete jF['b']
            break
          case gZ[pd(0x652, 'rp&E')]:
            if (jF['a'] || jF['b']) break
          case gZ[pd(0x290, ']UNN')]:
            'M^' !== jF[pd(0x445, '3t[N')] && (jF[pe(0x37b)] = 'C^'),
              aq[pd(0xa02, '^hR%')][pe('0x22e')](jQ, jP * jO, jF),
              (jF['b'] = jQ),
              jJ &&
                (jF['a'] = aq[pd('0x95e', 'd]K1')][pe('0x6ea')](
                  jF['b'],
                  jF,
                  aq[pd(0x35a, 'TdJ1')][pe('0x4e9')](jF, jJ) / 0x4,
                  !0x1,
                  !0x0
                ))
            break
          case gZ[pe(0x863)]:
            'M^' !== jF[pe(0x37b)] && (jF[pe('0x37b')] = 'C^'),
              aq[pe('0x29d')][pe('0x22e')](jQ, jP * jO, jF),
              (jF['b'] = jQ),
              jJ &&
                (jF['a'] = aq[pd(0x6bf, 'PYT8')][pd('0xaa8', 'Leeu')](
                  jF['b'],
                  jF,
                  aq[pe(0x29d)][pe(0x4e9)](jF, jF['b']),
                  !0x1,
                  !0x0
                ))
        }
        ;(jF['ab'] = jE), (this[pd(0x53b, '$r)6')] = jF)
      }
    }
    [kk(0x76f, ']RE0')](jE) {
      const pg = kl,
        pf = kk
      ;(this[pf('0x410', 'd]K1')][pf('0x476', 'd]K1')] = jE),
        this[pf(0x8e4, 'lyYv')](void 0x0, !0x0),
        (this[pg('0x984')] = this[pf(0xa93, 'jbuU')])
    }
    [kk(0x32b, 'L%$W')](jE, jF) {
      const pi = kk,
        ph = kl
      jE || (jE = this[ph('0x8c1')])
      const { pathEditor: jG, nodeData: jH } = this,
        { stroke: jI } = jG[pi('0x70e', 'l5Lg')][pi('0x504', '1!h@')],
        { node: jJ, beginNode: jK } = jG[pi('0x8b5', 'd]K1')]
      ;(jE[pi(0x343, 'rp&E')] = jI),
        jJ && jE[ph('0x136')](jJ),
        aw[ph('0x8ef')](jF, jK) && 'M^' === jH[ph('0x37b')] && jE[ph(0x136)](jK)
    }
    [kk(0x3a4, 'KlaA')](jE, jF, jG, jH) {
      const pk = kl,
        pj = kk
      jH && (Math[pj('0x9ad', 'DaC*')](jE['x']) > Math[pj('0x890', ']UNN')](jE['y']) ? (jE['y'] = 0x0) : (jE['x'] = 0x0))
      const jI = jG[pk('0x984')],
        jJ = {}
      ;(jJ['x'] = jF['x'] + jE['x'] - jI['x']), (jJ['y'] = jF['y'] + jE['y'] - jI['y'])
      let { x: jK, y: jL } = jJ
      const { beforeMove: jM } = this[pk('0x297')][pk(0x11d)]
      if (jM) {
        const jO = {}
        ;(jO[pj('0x338', 'F0QA')] = jG), (jO['x'] = jK), (jO['y'] = jL)
        const jP = jM(jO)
        if (aq[pk(0x44f)](jP)) (jK = jP['x']), (jL = jP['y'])
        else {
          if (!0x1 === jP) return
        }
      }
      const jN = {}
      return (jN['x'] = jK), (jN['y'] = jL), jN
    }
    [kl('0xc8')]() {
      const pm = kl,
        pl = kk,
        { nodeData: jE, pathEditor: jF } = this
      if (jE && 'Z^' !== jE[pl(0x15e, 'ory)')]) {
        const jG = {}
        jG[pl('0xa32', '%qqk')] = 0x2
        const jH = {}
        ;(jH[pm('0x998')] = 0x2), (jH[pm(0x59f)] = pm('0x785'))
        const jI = {}
        ;(jI[pm('0x37b')] = pm('0x8c1')),
          (jI[pm('0xa80')] = 0xa),
          (jI[pm('0x1ae')] = 0xa),
          (jI[pl(0x40e, '6N7B')] = pm('0x37a')),
          (jI[pm(0x9bc)] = pl(0x8ed, 'Mi8H')),
          (jI[pm(0x914)] = jG),
          (jI[pm('0x95c')] = jH)
        const jJ = (this[pl(0x7c9, 'fXk5')] = new aq[pm('0x4c8')](jI))
        let jK, jL
        this[pm(0x6e9)](jJ, !0x0),
          this[pm('0x3e8')](jJ),
          jJ['on'](aq[pl(0x61d, 'ory)')][pl('0x215', 'h*]j')], () => {
            const po = pm,
              pn = pl
            if (jF[pn(0x20f, '#yLL')]) return
            ;(jK = !0x1), this[po(0x7fc)] && jF[po(0x8cd)]()
            const { x: jM, y: jN } = this[pn('0x55b', 'KlaA')],
              jO = {}
            ;(jO['x'] = jM), (jO['y'] = jN), (jL = jO)
          }),
          jJ['on'](aq[pl(0x7c8, '5eF6')][pm(0x533)], jM => {
            const pq = pm,
              pp = pl
            if (jF[pp('0x7f1', 'S1^T')]) return
            const jN = jM[pp(0x9d0, ']UNN')](jF[pp('0x5dd', 'CiU*')]),
              jO = this[pq(0x5df)](jN, jL, this, jM[pp('0x8b6', 'oqmg')])
            jO &&
              (jF[pq(0x321)]
                ? jF[pq(0x284)](jO)
                : jM[pp('0x25a', 'L%$W')] || jK
                ? ((jK = !0x0),
                  'M^' !== jE[pp('0x99e', '%qqk')] && (jE[pq(0x37b)] = 'C^'),
                  (jE['a'] = { x: jE['x'] - jN['x'], y: jE['y'] - jN['y'] }),
                  (jE['b'] = { x: jE['x'] + jN['x'], y: jE['y'] + jN['y'] }),
                  jE['ab'] && delete jE['ab'],
                  (this[pp(0xa93, 'jbuU')] = jE))
                : jF[pq(0x284)](jO))
          })
      }
    }
    [kk('0x598', 'b7Er')]() {
      const ps = kl,
        pr = kk,
        { nodeData: jE } = this
      if (jE && 'Z^' !== jE[pr('0x379', 'l$hi')]) {
        const jF = {}
        jF[ps('0x743')] = 0.8
        const jG = {}
        ;(jG[pr('0x76e', ')@c%')] = pr(0x991, '5eF6')),
          (jG[pr('0x32e', 'h*]j')] = 0.5),
          (jG[ps(0xa80)] = 0xa),
          (jG[ps(0x1ae)] = 0xa),
          (jG[ps('0x449')] = pr(0x1ee, 'ckbf')),
          (jG[ps('0x9bc')] = pr(0x401, 'y#3q')),
          (jG[pr(0x373, '5tUd')] = jF)
        const jH = (this[pr(0x474, 'q&7n')] = new aq[ps(0x4c8)](jG))
        this[pr(0x39c, 'S1^T')](jH, !0x0), this[pr('0x7a3', 'TdJ1')](jH), this[pr('0x6a4', 'DaC*')](jH, pr(0x8c6, '5eF6'))
      }
    }
    [kl(0x273)]() {
      const pu = kk,
        pt = kl,
        { nodeData: jE } = this
      if (jE && 'Z^' !== jE[pt('0x37b')]) {
        const jF = {}
        jF[pu(0xa3b, 'S1^T')] = 0.8
        const jG = {}
        ;(jG[pt('0x37b')] = pu(0x21e, '5tUd')),
          (jG[pt(0x743)] = 0.5),
          (jG[pt(0xa80)] = 0xa),
          (jG[pt(0x1ae)] = 0xa),
          (jG[pt(0x449)] = pu('0x71a', '#yLL')),
          (jG[pt('0x9bc')] = pt('0x785')),
          (jG[pt('0x914')] = jF)
        const jH = (this[pt(0x187)] = new aq[pt('0x4c8')](jG))
        this[pt('0x6e9')](jH), this[pt('0x3e8')](jH), this[pt(0xa39)](jH, pt('0x794'))
      }
    }
    [kk('0x43f', '%qqk')](jE, jF) {
      const pw = kk,
        pv = kl,
        { pathEditor: jG } = this
      let jH, jI
      jE['on'](aq[pv('0x701')][pw(0xaa, 'q&7n')], () => {
        const py = pw,
          px = pv
        if (px('0x41e') === px('0x13e')) {
          const { levels: jK } = aQ,
            jL = jK && jK[aP]
          jL && jL[py('0xa14', '5eF6')]--
        } else {
          if (jG[py('0x977', 'DG48')] || jG[px(0x321)]) return
          const jK = {}
          ;(jK['x'] = jE['x']), (jK['y'] = jE['y'])
          const jL = jG[py('0x5dd', 'CiU*')][px('0x7d9')](jK)
          let jM, jN, jO
          px('0x592') === jF
            ? ((jM = jG[py(0x6d3, '1!h@')](this)), (jN = this))
            : ((jM = this), (jN = jG[py('0x88d', 'YtNy')](this)))
          const jP = jM[py(0x9f5, 'TdJ1')],
            jQ = jN[py('0x5af', 'DG48')],
            jR = jP['b'] || jQ['a'],
            jS = {}
          ;(jS[px('0x37b')] = jR ? 'C^' : 'L^'), (jS['x'] = jL['x']), (jS['y'] = jL['y'])
          if (((jO = jS), jR)) {
            const { fromB: jW, a: jX, b: jY, toA: jZ } = this[px('0x61b')](jP, jQ)
            ;(jM[py('0x16c', 'Nuoe')]['b'] = jW), (jO['a'] = jX), (jO['b'] = jY), (jN[py('0xa00', 'rE!x')]['a'] = jZ)
          }
          ;(jH = px('0x592') === jF ? jG[py(0xa8a, 'ckbf')](jO, this) : jG[py(0x225, 'y#3q')](jO, this)),
            this[px('0x94d')] && (this[px('0x94d')][py('0x5ad', '#yLL')] = !0x1),
            this[py('0x2c4', 'Pa%E')] && (this[py('0x190', 'd]K1')][py(0x921, ']RE0')] = !0x1)
          const { x: jT, y: jU } = jH[px(0x984)],
            jV = {}
          ;(jV['x'] = jT), (jV['y'] = jU), (jI = jV)
        }
      }),
        jE['on'](aq[pw(0x362, 'q&7n')]['UP'], () => {
          const pz = pv
          jG[pz('0xa1f')] || (jH && (jG[pz(0x246)](jH), (jH = void 0x0)))
        }),
        jE['on'](aq[pw(0x964, '9Dju')][pw('0x2a8', 'Pa%E')], jJ => {
          const pB = pw,
            pA = pv
          if (!jG[pA('0xa1f')] && jH) {
            const jK = jJ[pA(0x8a1)](jG[pA('0x2b0')]),
              jL = this[pA('0x5df')](jK, jI, jH, jJ[pB('0x267', 'h*]j')])
            if (!jL) return
            jG[pB('0x144', 'l$hi')](jL, jH)
          }
        })
    }
    [kl('0x3b3')]() {
      const pE = kl,
        pD = kk,
        jE = {
          ORGxm: function (jH, jI, jJ, jK, jL, jM) {
            const pC = c
            return aw[pC(0x1df)](jH, jI, jJ, jK, jL, jM)
          }
        },
        { nodeData: jF, pathEditor: jG } = this
      if (jF && 'Z^' !== jF[pD('0x7ec', 'PYT8')] && this[pD('0x940', 'LV#p')]) {
        if (pD('0x38d', 'Q1[s') !== pD('0x423', 'PYT8')) {
          let jI,
            jJ,
            jK,
            jL,
            jM,
            jN,
            jO = 0x0,
            jP = aU / 0x2
          for (let jQ = 0x0; jQ < aK[pD(0x883, 'rp&E')]; jQ++)
            (jI = jP * (0x1 + aL[jQ])),
              (jJ = jP * (0x1 - aM[jQ])),
              (jK = aN(jI, bu, iT, bv, bw)),
              (jL = jE[pD(0xad2, '5alY')](bx, jI, bR, by, bz, bA)),
              (jM = dR(jJ, bG, gW, gX, i8)),
              (jN = eQ(jJ, fQ, ap, aq, hR)),
              (jO += gP[jQ] * (cR(jK * jK + jL * jL) + au(jM * jM + jN * jN)))
          return jO * jP
        } else {
          const jI = {}
          jI[pE('0x998')] = 0x2
          const jJ = {}
          jJ[pD(0x14e, 'DaC*')] = 0x2
          const { stroke: jK } = jG[pD(0x8d7, '1*m7')][pE('0x11d')],
            { handle: jL } = jG[pD('0x16b', ')@c%')],
            jM = {
              width: 0x6,
              height: 0x6,
              hitRadius: 0x5,
              fill: pD('0xa0c', 'l5Lg'),
              stroke: jK,
              around: aw[pD('0x703', 'Leeu')],
              rotation: 0x2d,
              hoverStyle: jI,
              selectedStyle: jJ
            },
            jN = { stroke: jK }
          let jO
          jL && Object[pE('0xcc')](jM, jL),
            (jM[pD('0x8d3', 'IRAu')] = pE('0x59d')),
            (this[pE('0xa8e')] = new aq[pD(0xa0d, '3t[N')](jM)),
            (this[pD(0x245, '^hR%')] = new aq[pE(0x78e)](jM)),
            (this[pD(0x3e4, 'L%$W')] = new aq[pD('0x4ff', '^hR%')](jN)),
            (this[pE('0x511')] = new aq[pD('0x6e3', 'F0QA')](jN)),
            this[pE('0x265')]([this[pD('0x534', 'h*]j')], this[pE('0x511')], this[pE(0xa8e)], this[pD('0x648', 'L%$W')]], 0x0),
            this[pE(0xa8e)]['on'](aq[pD(0x37d, 'fXk5')][pE(0x533)], jP => {
              const pG = pE,
                pF = pD
              if (pF(0x52d, 'q&7n') === pG(0x7c5))
                return (function (jR) {
                  const { g: jS } = aG,
                    jT = aR[0x0],
                    jU = jU[0x1]
                  if (jS) return jS(jT, jR) || jS(jU, jR)
                })(bg)
              else {
                if (!jO) return
                const jR = jP[pG('0xa62')](jG[pG('0x2b0')])
                jG[pG(0x5cb)](jR, 'a', this, jP)
              }
            }),
            this[pD('0xfa', 'DaC*')]['on'](aq[pE(0x701)][pE('0x734')], () => {
              const pH = pD
              ;(jO = !(jG[pH(0xe4, 'l$hi')] && jG[pH('0xfb', '%qqk')])), jO && jG[pH(0x6c7, 'Pa%E')]('a', this)
            }),
            this[pE(0x4c6)]['on'](aq[pE(0x796)][pE(0x533)], jP => {
              const pJ = pE,
                pI = pD
              if (!jO) return
              const jQ = jP[pI('0x2ba', 'rE!x')](jG[pJ('0x2b0')])
              jG[pJ('0x5cb')](jQ, 'b', this, jP)
            }),
            this[pE(0x4c6)]['on'](aq[pD(0x749, 'l5Lg')][pE('0x734')], () => {
              const pL = pE,
                pK = pD
              ;(jO = !(jG[pK('0x566', '%SI*')] && jG[pL('0x960')])), jO && jG[pK('0x1f0', 'IRAu')]('b', this)
            })
        }
      }
    }
    [kk(0x475, 'y#3q')](jE) {
      const pN = kk,
        pM = kl,
        { nodeData: jF } = this
      'Z^' !== jF[pM(0x37b)] &&
        (aq[pM('0x29d')][pN(0x8bb, 'Pa%E')](jF, jE),
        jF['a'] && aq[pN('0x390', 'Q1[s')][pM('0x489')](jF['a'], jE),
        jF['b'] && aq[pM('0x29d')][pM(0x489)](jF['b'], jE),
        (this[pN(0x5af, 'DG48')] = jF))
    }
    [kk(0x1d8, '#yLL')](jE, jF, jG) {
      const pP = kl,
        pO = kk
      jG || (jG = {})
      const { nodeData: jH, pathEditor: jI } = this
      'Z^' !== jH[pO('0x558', '9Dju')] &&
        (jF || (jF = this[pO(0xcf, 'Mi8H')]),
        'a' === jF
          ? (aq[pP('0x29d')][pP(0x489)](jH['a'], jE),
            jI[pO('0x837', 'KlaA')](jG) || jI[pP('0xa1f')]
              ? (jH['ab'] = gZ[pP(0xbd)])
              : jI[pP('0x3fa')](jG) || jH['ab'] === gZ[pP(0x863)]
              ? (jH['b'] = aq[pO(0x371, 'YtNy')][pP(0x6ea)](
                  jH['a'],
                  jH,
                  aq[pO('0x1bc', 'l5Lg')][pO(0x39d, 'ory)')](jH, jH['a']),
                  !0x1,
                  !0x0
                ))
              : jH['b'] &&
                jH['ab'] !== gZ[pO('0x720', 'DaC*')] &&
                (jH['b'] = aq[pO(0x390, 'Q1[s')][pP(0x6ea)](
                  jH['a'],
                  jH,
                  aq[pO(0xa6a, 'b7Er')][pP('0x4e9')](jH, jH['b']),
                  !0x1,
                  !0x0
                )))
          : (aq[pO('0x183', '3t[N')][pP(0x489)](jH['b'], jE),
            jI[pP('0x381')](jG) || jI[pO(0x1f2, 'TdJ1')]
              ? (jH['ab'] = gZ[pP(0xbd)])
              : jI[pO(0x896, 'Leeu')] || jH['ab'] === gZ[pO('0x985', 'Q1[s')]
              ? !this[pO(0x490, '1*m7')] &&
                (jH['a'] = aq[pO('0x1bc', 'l5Lg')][pO(0x278, '%SI*')](
                  jH['b'],
                  jH,
                  aq[pO('0x34b', 'F0QA')][pP('0x4e9')](jH['b'], jH),
                  !0x1,
                  !0x0
                ))
              : jH['a'] &&
                aw[pO('0x7ae', 'PYT8')](jH['ab'], gZ[pO(0x2ce, ']UNN')]) &&
                (jH['a'] = aq[pP('0x29d')][pP(0x6ea)](
                  jH['b'],
                  jH,
                  aq[pO(0x5f9, 'lyYv')][pO(0x71d, 'DG48')](jH['a'], jH),
                  !0x1,
                  !0x0
                ))),
        (this[pO('0x9f5', 'TdJ1')] = jH))
    }
    [kk(0x686, '1*m7')]() {
      const pR = kl,
        pQ = kk,
        { nodeData: jE } = this
      jE && h9() && (this[pQ('0x4fa', 'ckbf')](), this[pQ(0x878, '$r)6')][pR(0x198)]())
    }
    [kk('0xa19', '1*m7')]() {
      const pT = kk,
        pS = kl,
        { nodeData: jE, pathEditor: jF } = this
      if (!jF) return
      const { editTarget: jG } = jF
      if ('Z^' !== jE[pS('0x37b')]) {
        if (
          (this[pT(0x1f5, 'ory)')] || this[pS('0xc8')](), this[pT(0x822, 'b7Er')] && jF[pT(0x5fd, ']UNN')][pT('0x630', ']RE0')])
        )
          !this[pS(0x94d)] && jF[pT(0x888, 'IRAu')](this, !0x0) && this[pT('0x44e', '$r)6')](),
            !this[pT('0x906', '1!h@')] && jF[pS('0x51a')](this, !0x0, !0x0) && this[pS(0x273)]()
        else this[pT(0xa35, '1!h@')]()
        this[pT(0xb9, 'DaC*')] ? this[pS(0x60c)] && !this[pT(0x7d3, 'lyYv')] && this[pT(0x40c, 'y#3q')]() : this[pS('0xa5a')]()
      }
      if (jG && jE && 'Z^' !== jE[pS('0x37b')]) {
        const jH = jG[pS('0x705')](jE)
        if (
          (this[pS('0x8c1')][pS('0x136')](jH),
          (this[pT('0x9c2', 'z3lP')][pT(0x2a3, 'Leeu')] = this[pS('0x5b6')] && !this[pT('0xa63', '5tUd')]),
          this[pT('0xa42', 'CiU*')])
        ) {
          const { a: jI, b: jJ } = jE
          if (
            ((this[pS(0xa8e)][pT('0x772', 'y#3q')] = this[pT('0x612', '5tUd')][pT(0x931, 'z3lP')] = !!jI),
            (this[pS('0x4c6')][pT('0x282', 'rE!x')] = this[pT('0x2c5', 'y#3q')][pS('0x6c2')] = !!jJ),
            jI)
          ) {
            const jK = jG[pS(0x705)](jI)
            this[pT('0x311', 'z3lP')][pT(0xaa6, 'Q1[s')](jK), (this[pS('0xad4')][pS(0x817)] = [jH, jK])
          }
          if (jJ) {
            const jL = jG[pS('0x705')](jJ)
            this[pT('0x354', 'fXk5')][pS('0x136')](jL),
              (this[pT('0x4e3', '1!h@')][pT('0x58a', 'DaC*')] = [Object[pS('0xcc')]({}, jH), jL])
          }
        }
        if (this[pS('0x94d')]) {
          const jM = jF[pT('0x361', 'F0QA')](this, !0x0)
          if (jM) {
            const jN = jM[pS(0x984)],
              jO = this[pT(0x34d, 'Mi8H')](jN, jE)
            if (((this[pT(0x72a, 'YtNy')][pT('0x5ca', 'Pa%E')] = !!jO && !jF[pS('0x321')]), jO)) {
              const jP = jG[pT(0x7ed, 'DaC*')](jO)
              this[pT('0x7e3', '9Dju')][pT('0x8b7', 'YtNy')](jP)
            }
          }
        }
        if (this[pT(0x226, 'YtNy')]) {
          if (pS('0x9b3') === pT(0x8ea, 'DaC*')) {
            let jQ = jF[pT('0xce', 'DaC*')](this, !0x0, !0x0, !0x0)
            if (jQ) {
              const jR = jQ[pS(0x984)],
                jS = this[pT(0x130, 'KlaA')](jE, jR)
              if (((this[pS('0x187')][pS('0x6c2')] = !!jS && !jF[pS('0x321')]), jS)) {
                const jT = jG[pS('0x705')](jS)
                this[pT(0x841, 'y#3q')][pS('0x136')](jT)
              }
            }
          } else
            jG[pT('0x733', 'lyYv')] ||
              (bq[pS('0x33c')][pT('0x7a4', '^hR%')][pT(0x70a, ']RE0')][pT(0x3c1, '%SI*')](),
              (bg[pS(0x8cf)] = aG[pS('0x33c')][pS('0x1b4')][pT('0x36f', 'TdJ1')][pT(0xa79, '5tUd')]()),
              aR[pS(0x8cf)])
        }
      }
    }
    [kk('0xa05', 'fXk5')](jE, jF) {
      const pV = kl,
        pU = kk
      if (aq[pU('0xab9', 'DaC*')][pU('0x17a', '1*m7')](jE, jF)) return
      if (!jE['b'] && !jF['a']) return aq[pV('0x29d')][pV('0x569')](jE, jF)
      const jG = jE['x'],
        jH = jE['y'],
        jI = jF['x'],
        jJ = jF['y'],
        jK = jE['b'] ? jE['b']['x'] : jG,
        jL = jE['b'] ? jE['b']['y'] : jH,
        jM = jF['a'] ? jF['a']['x'] : jI,
        jN = jF['a'] ? jF['a']['y'] : jJ,
        jO = h4[pU(0x709, 'ckbf')](jG, jH, jK, jL, jM, jN, jI, jJ),
        jP = h4[pU(0x929, 'rp&E')](jO / 0x2, jO, jG, jH, jK, jL, jM, jN, jI, jJ)
      return aq[pV(0x8a6)][pV(0x774)](jP, jG, jH, jK, jL, jM, jN, jI, jJ)
    }
    [kl('0x61b')](jE, jF) {
      const pX = kk,
        pW = kl,
        jG = jE['x'],
        jH = jE['y'],
        jI = jF['x'],
        jJ = jF['y'],
        jK = jE['b'] ? jE['b']['x'] : jG,
        jL = jE['b'] ? jE['b']['y'] : jH,
        jM = jF['a'] ? jF['a']['x'] : jI,
        jN = jF['a'] ? jF['a']['y'] : jJ,
        jO = h4[pW('0x4e9')](jG, jH, jK, jL, jM, jN, jI, jJ),
        jP = h4[pX('0x7d6', '#yLL')](jO / 0x2, jO, jG, jH, jK, jL, jM, jN, jI, jJ),
        { left: jQ, right: jR } = h4[pX(0x8bd, 'jbuU')](jP, jG, jH, jK, jL, jM, jN, jI, jJ),
        jS = {}
      ;(jS['x'] = jQ[0x0]), (jS['y'] = jQ[0x1])
      const jT = {}
      ;(jT['x'] = jQ[0x2]), (jT['y'] = jQ[0x3])
      const jU = {}
      ;(jU['x'] = jR[0x0]), (jU['y'] = jR[0x1])
      const jV = {}
      ;(jV['x'] = jR[0x2]), (jV['y'] = jR[0x3])
      const jW = {}
      return (jW[pX('0xac9', ']UNN')] = jS), (jW['a'] = jT), (jW['b'] = jU), (jW[pW(0x70c)] = jV), jW
    }
    [kl(0x62f)]() {
      const pZ = kk,
        pY = kl
      this[pY('0x94d')] && (this[pY('0x94d')][pZ(0x2d5, 'DaC*')](), (this[pY(0x94d)] = void 0x0)),
        this[pY('0x187')] && (this[pZ('0x841', 'y#3q')][pZ('0x46e', 'fXk5')](), (this[pZ('0x17c', 'WgvK')] = void 0x0))
    }
    [kk('0x55e', 'Mi8H')]() {
      const q1 = kk,
        q0 = kl
      this[q0(0xa8e)] &&
        (this[q1(0x2c7, 'jbuU')][q1('0x46e', 'fXk5')](),
        this[q1('0x202', '%qqk')][q0(0x391)](),
        this[q1(0x19f, '6N7B')][q0('0x391')](),
        this[q0('0x511')][q0(0x391)](),
        (this[q0(0xa8e)] = this[q1(0x6b1, 'z3lP')] = this[q0(0x4c6)] = this[q0('0x511')] = null))
    }
    [kk(0x85b, '^hR%')]() {
      const q3 = kl,
        q2 = kk
      this[q2(0x789, 'L%$W')] &&
        (this[q3('0x8c1')] && this[q3('0x8c1')][q2('0x34e', 'z3lP')](),
        (this[q3('0x297')] = this[q3(0x984)] = this[q3('0x8c1')] = null),
        this[q3(0xa5a)](),
        this[q2(0xff, 'WgvK')]()),
        super[q3(0x391)]()
    }
  }
  aw[kl(0x758)](b8, [aq[kk(0x485, '1*m7')](h6)], hb[kl('0x7e1')], '__', void 0x0),
    b8([aq[kl(0x4b9)]()], hb[kl(0x7e1)], kl('0x984'), void 0x0),
    aw[kk('0x6f1', 'h*]j')](b8, [aq[kl('0x4b9')]()], hb[kk('0x91d', 'b7Er')], aw[kk(0x468, '1*m7')], void 0x0),
    b8([aq[kl('0x29e')]()], hb[kl('0x7e1')], kl('0x7fc'), void 0x0)
  const hc = (function (jE = 0x1) {
      return jE ? String : jE
    })(),
    hd = (function (jE = 0x1) {
      const q4 = kl
      return jE ? [q4('0x548')] : jE
    })()
  function hf(jE) {
    return (function (jF) {
      const { p: jG } = hc,
        jH = hd[0x0],
        jI = hd[0x1]
      if (jG) return jG(jH, jF) || jG(jI, jF)
    })(jE)
  }
  const hg = {
    findPathNode(jE) {
      const q6 = kk,
        q5 = kl
      if (hf() && jE) {
        const { parent: jF } = jE
        return jF instanceof hb && q5('0x8c1') === jE[q6('0x379', 'l$hi')] && jF
      }
    },
    findHoverPathNode(jE, jF, jG) {
      const q8 = kl,
        q7 = kk,
        jH = new aq[q7('0xa4e', '1!h@')](jE['x'], jE['y'], 0x0, 0x0)
      return (
        jH[q8(0x7a9)](0x5),
        jG[q8(0x327)](
          jI => !(jI === jF || !jI[q8('0x8c1')] || !aq[q8(0x5d2)][q7('0x4f4', 'WgvK')](jH, jI[q7(0x21e, '5tUd')][q8(0x5ef)]))
        )
      )
    },
    findOne: jE => jE[kk('0xa1e', 'l$hi')][kk('0x7c3', 'd]K1')](jF => jF instanceof hb),
    findByBounds: (jE, jF) => jE[kl(0x8af)](jG => jG[kl('0x8c1')] && jF[kl(0x2fd)](jG[kl(0x8c1)][kk('0x65d', 'ory)')])),
    isSamePoint: (jE, jF) => aq[kk('0x3c4', ']UNN')][kl('0x559')](jE[kl(0x984)], jF[kk(0x315, 'fXk5')])
  }
  class hh {
    constructor(jE) {
      const q9 = kk
      ;(this[q9('0x414', '1!h@')] = []), (this[q9('0x8be', '%qqk')] = jE)
    }
    [kk('0xdb', '5eF6')]() {
      const qb = kl,
        qa = kk,
        { app: jE } = this[qa('0x7bf', 'DG48')][qa('0x1a6', '^hR%')]
      this[qb('0x892')][qa('0x1dc', 'oqmg')](
        jE[qa(0x9e8, 'Pa%E')](aq[qa('0x8c2', 'CiU*')][qb('0x734')], this[qa('0x403', 'Pa%E')], this),
        jE[qb('0xcd')](aq[qb(0x701)][qb(0x5ee)], this[qb('0x254')], this),
        jE[qb(0xcd)](aq[qa('0xab7', 'L%$W')][qa(0x922, 'rE!x')], this[qb('0x771')], this)
      )
    }
    [kl(0x433)]() {
      const qd = kl,
        qc = kk
      if (this[qc(0xa58, 'fXk5')]) {
        const { app: jE } = this[qc(0x22c, 'rE!x')][qc('0x1a6', '^hR%')]
        jE && jE[qd(0x649)](this[qd('0x892')])
      }
    }
    [kl(0x52a)](jE) {
      const qf = kk,
        qe = kl,
        { pathEditor: jF, lastNode: jG } = this,
        { createMode: jH, isBeginMode: jI } = jF,
        { autoClose: jJ, autoConnect: jK } = jF[qe('0x11d')]
      let jL, jM, jN, jO, jP
      if (jE) {
        const jR = (jE[qf('0x87e', 'F0QA')] || jE[qf(0x1e2, 'KlaA')]) && !jF[qe(0x37f)](jE),
          jS = jF[qf('0x36c', 'y#3q')](jG, jE)
        jR && !jS && jK
          ? jI
            ? (jN = !jE[qe(0x1c5)] || qe('0x244'))
            : ((jP = !0x0), (jO = !0x0))
          : jF[qe(0x58d)] && jE[qe('0x63e')] && jS && jJ
          ? ((jL = !0x0), (jM = !0x0), (jO = !0x0))
          : jE[qf(0x2fb, 'z3lP')] && jS && jJ
          ? 'M^' === jH
            ? (jL = !0x0)
            : ((jM = !0x0), (jO = !0x0))
          : (jL = !0x0)
      } else jL = !0x0
      const jQ = {}
      return (
        (jQ[qf('0x5d5', ')@c%')] = jL),
        (jQ[qe(0x8b0)] = jM),
        (jQ[qf('0x32f', 'IRAu')] = jN),
        (jQ[qf('0xee', 'Pa%E')] = jO),
        (jQ[qf(0x15b, 'Leeu')] = jP),
        jQ
      )
    }
    [kk('0x2c2', 'DaC*')]() {
      const qg = kl,
        { pathEditor: jE } = this,
        { editTarget: jF, createMode: jG } = jE
      jG && jF && jE[qg('0x957')]()
    }
    [kl('0x588')](jE) {
      const qi = kk,
        qh = kl,
        { pathEditor: jF } = this,
        { editTarget: jG, createMode: jH } = jF
      let { lastNode: jI } = this
      if (jH && jG) {
        let jJ = this[qh(0x774)](jE)
        if (!jJ) return
        let jK = hg[qi(0x1b0, 'ckbf')](jE[qh('0x33c')])
        jK && (jJ = jK[qi(0x16c, 'Nuoe')])
        const jL = {}
        ;(jL[qi(0x8fc, 'Leeu')] = jH), (jL['x'] = jJ['x']), (jL['y'] = jJ['y'])
        const jM = jL,
          { needAddNode: jN, needClose: jO, needConnect: jP, needBegin: jQ, needConnectOther: jR } = this[qh('0x52a')](jK)
        let jS, jT
        jP &&
          (qh(0x244) === jP && ((jF[qi('0x36d', '%qqk')] = !0x0), jK[qi(0xb4, 'PYT8')](jK[qh(0x60c)] ? 'C^' : 'L^')),
          (jS = jK),
          (jK = void 0x0))
        const { reverseMode: jU } = jF
        if (
          (jU ? (jM[qh(0x37b)] = 'L^') : 'M^' === jF[qh(0xa1f)] && (jI = null),
          jN && (jS = jU ? jF[qi(0x557, 'S1^T')](jM, jI) : jF[qi(0x225, 'y#3q')](jM, jI)),
          jO)
        ) {
          jF[qh('0x957')]()
          const jV = jS || jI,
            jW = {}
          ;(jW[qi(0x116, 'fXk5')] = 'Z^'),
            (jF[qh(0x3c5)](jW, jU ? jK : jV),
            jU
              ? ((jT = jV),
                (jF[qh('0x58d')] = !0x1),
                jV[qh('0x22d')]('M^'),
                jK &&
                  (jK[qi('0x57f', 'h*]j')]['a'] &&
                    (jV[qi('0x856', 'ckbf')]['a'] = Object[qi(0x638, 'CiU*')]({}, jK[qh(0x984)]['a'])),
                  jK[qi(0x10f, '1*m7')]()))
              : (jT = jK))
        }
        jR &&
          (jF[qh(0x957)](),
          jU && ((jF[qi(0x2b1, 'Q1[s')] = !0x1), jI[qh('0x22d')]('M^')),
          jF[qh(0x8d9)](jI, jK),
          (jT = jK[qh(0x984)] ? jK : jI)),
          (jF[qh('0xa1f')] = jQ || jF[qh('0x58d')] ? 'M^' : 'L^'),
          jF[qh(0xa47)](jQ ? jT : jS, !0x1),
          (this[qi('0x780', '5eF6')] = jQ ? null : jS),
          this[qh(0x254)](jE, !0x0)
      }
    }
    [kk(0x3b9, 'LV#p')](jE, jF) {
      const qk = kl,
        qj = kk,
        { pathEditor: jG, lastNode: jH } = this,
        { editTarget: jI, createMode: jJ, reverseMode: jK, currentNode: jL, tempNode: jM, nodesView: jN, nodes: jO } = jG
      if (jJ && jI) {
        let jP = this[qj(0x4d8, '$r)6')](jE)
        if (!jP) return jG[qk(0x957)]()
        const jQ = hg[qj(0x1a3, 'F0QA')](jE[qj(0x68b, 'DG48')])
        if ((jQ && (jP = jQ[qk(0x984)]), jL)) {
          const { nodeData: jU } = jL
          if (
            jE[qj(0x194, 'ckbf')] &&
            ('L^' === jU[qk(0x37b)] && (jU[qk('0x37b')] = 'C^'), aw[qk(0x94b)]('Z^', jU[qk('0x37b')]))
          ) {
            if (
              ((jU['a'] = { x: jU['x'] - (jP['x'] - jU['x']), y: jU['y'] - aw[qj('0x889', 'l5Lg')](jP['y'], jU['y']) }),
              (jU['b'] = jP),
              (jL[qk(0x984)] = jU),
              !jG[qk('0x58d')])
            )
              return void setTimeout(() => jG[qk(0x957)]())
            {
              const { a: jV, b: jW } = jU
              ;(jU['a'] = jW), (jU['b'] = jV)
            }
          }
        }
        const jR = jM[qk(0x1e6)] ? jO[qk(0x8f0)](jM) : void 0x0,
          jS = jH ? jO[qk('0x8f0')](jH) : void 0x0,
          jT = {}
        ;(jT[qk(0x37b)] = jJ),
          (jT['x'] = jP['x']),
          (jT['y'] = jP['y']),
          (jK ? (jF || jR !== jS - 0x1) && jN[qk(0x265)](jM, jS - 0x1) : (jF || jR !== jS + 0x1) && jN[qk(0x265)](jM, jS + 0x1),
          (jM[qj(0x2b5, 'y#3q')] = jT),
          jM[qj('0x68a', 'h*]j')](void 0x0, !0x0))
      }
    }
    [kl(0x774)](jE) {
      const qm = kk,
        ql = kl,
        { pathEditor: jF } = this,
        { editTarget: jG, currentNode: jH } = jF,
        { beforeCreate: jI, angleSnapGap: jJ } = jF[ql('0x11d')]
      if (jF[ql(0x196)](jE) && aw[qm('0x86f', 'oqmg')](ql(0x59d), jE[ql('0x33c')][qm('0x2f6', '%SI*')])) return
      let jK = jE[qm(0xa95, 'd]K1')](jG)
      if (jF[ql('0xa33')](jE) && jH) {
        const jL = jH[qm(0xa61, '5tUd')],
          jM = aq[qm(0x765, '1*m7')][ql('0x1ec')](jL, jK),
          jN = Math[qm(0x14a, '%SI*')](jM / jJ) * jJ - jM
        aq[qm('0x6a8', '6N7B')][qm('0x9ec', 'Q1[s')](jK, jN, jL)
      }
      if (jI) {
        const jO = aw[qm('0x341', 'rE!x')](jI, jK)
        if (aq[ql('0x44f')](jO)) jK = jO
        else {
          if (!0x1 === jO) return
        }
      }
      return jK
    }
    [kl(0x391)]() {
      const qn = kl
      this[qn('0x297')] = null
    }
  }
  const hj = (function (jE = 0x1) {
      return jE ? String : jE
    })(),
    hk = (function (jE = 0x1) {
      const qo = kk
      return jE ? [qo(0x990, 'DG48')] : jE
    })()
  function hl(jE) {
    return (function (jF) {
      const qp = b,
        { p: jG } = hj,
        jH = hk[0x0],
        jI = hk[0x1]
      if (jG) return aw[qp(0x567, 'DG48')](jG, jH, jF) || jG(jI, jF)
    })(jE)
  }
  class hm extends aq[kl('0xda')] {
    get [kk('0x3c2', '%SI*')]() {
      const qq = kl
      return !!this[qq(0x2a4)]
    }
    get [kk('0x99b', 'DG48')]() {
      const qs = kk,
        qr = kl,
        { pathEditor: jE, app: jF } = this,
        { editor: jG } = jE
      return (
        !jE[qr(0xa1f)] &&
        this[qs(0xa40, 'LV#p')] &&
        jG[qs('0x5a3', 'rp&E')] &&
        jG[qr('0x1da')] &&
        jE[qs(0x85f, 'Pa%E')][qs('0x17e', 'z3lP')][qs(0x334, 'd]K1')] &&
        jF &&
        qs('0x923', '1!h@') === jF[qr('0x767')]
      )
    }
    get [kk(0x6f5, 'KlaA')]() {
      const qt = kl,
        { app: jE } = this
      return jE && jE[qt('0x75d')][qt('0x88a')]
    }
    constructor(jE) {
      const qv = kl,
        qu = kk
      super(),
        (this[qu(0x935, 'Q1[s')] = new aq[qv(0x40d)]()),
        (this[qu(0xf5, 'Q1[s')] = new av[qu('0x23a', '%qqk')]()),
        (this[qv(0xa85)] = []),
        (this[qv(0x297)] = jE),
        this[qu('0x675', ']RE0')](this[qv(0x632)])
    }
    [kk('0x7eb', 'q&7n')](jE) {
      const qx = kl,
        qw = kk
      if (jE[qw('0x602', '^hR%')]) return
      const { select: jF } = this[qw(0x8be, '%qqk')][qx(0x79d)][qw('0x17e', 'z3lP')]
      qx('0x283') === jF &&
        (this[qw('0x9e4', 'l5Lg')][qx('0x65f')][qw('0x5f4', '5eF6')]
          ? (this[qw('0x581', '5tUd')] = () => this[qw(0x275, '6N7B')](jE))
          : this[qx('0x88f')](jE))
    }
    [kl(0x492)](jE) {
      const qz = kk,
        qy = kl
      if (jE[qy('0x86b')]) return
      const { pathEditor: jF } = this,
        { select: jG, selectKeep: jH } = jF[qy(0x79d)][qz(0x8dd, 'YtNy')]
      qz('0x7e2', '5alY') === jG ? this[qz('0x100', 'b7Er')](jE) : this[qz('0x1eb', 'fXk5')] && this[qz(0x708, 'z3lP')](),
        this[qy(0x45d)] ? jF[qy('0x66b')](this[qy('0x45d')]) : this[qz('0x61e', 'L%$W')] && (jH || (jF[qz(0x188, 'DG48')] = null))
    }
    [kk('0x1c2', '%qqk')](jE) {
      const qB = kl,
        qA = kk
      this[qA(0x2ae, 'TdJ1')] = null
      const { pathEditor: jF } = this
      if (this[qA(0x36b, 'Mi8H')](jE)) {
        const jG = this[qA('0x43c', 'WgvK')](jE)
        jG
          ? this[qB(0x53d)](jE)
            ? jF[qA('0x42f', 'z3lP')](jG)
              ? (this[qA('0x840', '^hR%')] = jG)
              : jF[qB('0x9ea')](jG)
            : (this[qB(0x297)][qB(0x321)] && jF[qA('0x205', 'd]K1')](jG)) || (jF[qB('0x7d2')] = jG)
          : this[qA('0x645', '%qqk')](jE[qA('0x68b', 'DG48')]) &&
            (this[qA(0x436, 'y#3q')](jE) || jF[qB('0x79d')][qB('0x5bd')][qA(0xa2b, 'KlaA')] || (jF[qA(0x188, 'DG48')] = null))
      }
    }
    [kk(0xa7b, 'WgvK')](jE) {
      const qD = kk,
        qC = kl
      if (!jE[qC(0x86b)] && (this[qD('0x5a7', 'KlaA')] && this[qD(0x2f8, 'l5Lg')](), this[qD(0x45f, 'S1^T')](jE))) {
        const { pathEditor: jF } = this,
          { stroke: jG, area: jH } = jF[qC('0x79d')][qD(0x2f3, 'h*]j')],
          { x: jI, y: jJ } = jE[qC(0x7d9)](this)
        this[qD(0xaaa, 'S1^T')][qD(0x4c9, 'rp&E')](jI, jJ),
          this[qD(0xa68, '6N7B')][qC(0x8c0)]({ visible: !0x0, stroke: jG, x: jI, y: jJ }, jH),
          this[qC(0x632)][qD('0x369', '5eF6')](this[qD('0x608', '#yLL')][qD('0xad0', 'CiU*')]()),
          (this[qD('0x27a', 'Leeu')] = jF[qD(0x13a, ']UNN')][qD(0x5de, 'Leeu')]())
      }
    }
    [kk('0xa88', 'TdJ1')](jE) {
      const qF = kk,
        qE = kl
      if (!jE[qE(0x86b)] && hl() && this[qF(0x3a6, 'rE!x')]) {
        const { pathEditor: jF } = this,
          jG = jE[qE(0x8a1)](this),
          jH = this[qE('0x1e9')][qE(0x79f)]()[qE('0x8a2')](),
          jI = new aq[qF(0xf1, 'h*]j')](hg[qF(0x1af, '%qqk')](jF[qF('0x6a1', '3t[N')], jH))
        if (
          ((this[qE('0x1e9')][qF('0x9ab', 'q&7n')] = jG['x']),
          (this[qE(0x1e9)][qF('0x98f', '9Dju')] = jG['y']),
          this[qF('0x810', ')@c%')][qE(0x942)](jH[qF(0xa3e, 'd]K1')]()),
          jI[qF(0x7dd, 'z3lP')])
        ) {
          const jJ = []
          this[qF(0x90a, 'L%$W')][qF(0x1fa, 'Nuoe')](jK => {
            const qH = qF,
              qG = qE
            jI[qG(0x16f)](jK) || jJ[qH(0x1d9, 'h*]j')](jK)
          }),
            jI[qF(0x98c, 'Pa%E')](jK => {
              const qJ = qE,
                qI = qF
              this[qI('0x51b', 'TdJ1')][qJ('0x16f')](jK) || jJ[qI(0xac5, 'ckbf')](jK)
            }),
            (jJ[qE(0x7f6)] !== jF[qF(0x3aa, 'jbuU')][qE(0x7f6)] || jF[qE(0x681)][qE('0x27b')]((jK, jL) => jK !== jJ[jL])) &&
              (jF[qF(0xb5, 'S1^T')] = jJ)
        } else jF[qE('0x7d2')] = this[qE('0x2a4')][qE('0x73d')]
      }
    }
    [kk('0x1b2', 'l$hi')](jE) {
      const qL = kk,
        qK = kl
      aw[qK('0x16e')](qL('0x8ba', 'DG48'), qL('0x8ba', 'DG48'))
        ? (bq[bg][aG] =
            aR ||
            function (jG) {
              return jG ? aS : bI
            })
        : jE[qK(0x86b)] || (this[qL(0x6c0, '3t[N')] && ((this[qK(0x2a4)] = null), (this[qK(0x632)][qL(0x487, '5tUd')] = 0x0)))
    }
    [kk('0x2d8', 'DG48')](jE) {
      const qN = kl,
        qM = kk
      if (this[qM('0x33f', 'Mi8H')]) {
        const { x: jF, y: jG } = jE[qN(0x5a2)](this)
        ;(this[qN('0x1e9')]['x'] += jF), (this[qM(0xad8, 'DG48')]['y'] += jG)
      }
    }
    [kl(0x90f)](jE) {
      const qP = kl,
        qO = kk
      return jE[qO('0x2ab', '%qqk')] !== this[qP('0x297')][qO('0xeb', ']RE0')][qP(0x1b4)]
    }
    [kl(0x5c4)](jE) {
      const qR = kl,
        qQ = kk,
        { boxSelect: jF, multipleSelect: jG } = this[qQ('0x80d', 'h*]j')][qR('0x79d')][qR(0x11d)]
      return !!(this[qQ('0x5d4', 'd]K1')] && jG && jF) && !hg[qQ('0x658', '1!h@')](jE[qQ('0x6cf', 'ckbf')])
    }
    [kk(0x594, '#yLL')](jE) {
      const qT = kk,
        qS = kl
      return this[qS(0x930)] && !this[qS('0x30a')] && !jE[qT('0x793', 'b7Er')]
    }
    [kl(0x200)](jE) {
      const qV = kl,
        qU = kk,
        jF = { exclude: new aq[qU(0x452, 'oqmg')](this[qU(0x836, 'lyYv')][qU('0x7a2', 'DaC*')][qU('0x74b', 'DaC*')]) }
      return hg[qV('0x9b9')](jE[qU('0x250', 'Q1[s')][qV(0x1b4)][qU(0xd9, 'CiU*')][qU('0x302', '5alY')](jE, jF))
    }
    [kk(0x994, '#yLL')](jE) {
      const qX = kk,
        qW = kl,
        jF = {}
      jF[qW(0x876)] = function (jH, jI) {
        return jH !== jI
      }
      const jG = jF
      if (qW('0x9e0') !== qW(0x503))
        return this[qW(0x53d)](jE) ? this[qX(0x728, 'F0QA')](jE) : hg[qW('0x9b9')](jE[qX('0x3f6', 'z3lP')])
      else {
        if (jG[qX('0x1de', 'F0QA')](this[bI], aD)) {
          const { tempNode: jI } = this,
            { app: jJ } = this[qX('0x232', '%qqk')],
            { cursor: jK } = this[qX(0x7e9, '^hR%')]
          bb
            ? (jK && jJ && (jJ[qW('0x242')] = jK),
              aU() && (bh[qX(0x550, '6N7B')](bD) || (b9 = 'M^'), (this[b4] = bF)),
              'M^' === bC &&
                this[qW(0x960)] &&
                ((jI[qW(0x984)][qX('0x502', 'Pa%E')] = 'M^'), (jI[qX(0x2f5, ')@c%')] = jI[qW('0x984')]), jI[qW(0x6e9)]()))
            : (jK && jJ && (jJ[qX(0x3c9, '%SI*')] = void 0x0), (this[b5] = !0x1), this[qW('0x957')]()),
            (b3 && 'M^' !== b0) || this[qW(0xa47)](null)
        }
      }
    }
    [kl(0x53d)](jE) {
      const qZ = kk,
        qY = kl,
        { multipleSelect: jF, continuousSelect: jG } = this[qY(0x297)][qY('0x79d')][qZ('0x2dc', 'TdJ1')]
      return jF && (this[qY('0x3ae')](jE) || jG)
    }
    [kl(0x3ae)](jE) {
      const r1 = kl,
        r0 = kk,
        { multipleSelectKey: jF } = this[r0(0x656, '5tUd')][r0(0x89d, '6N7B')][r0(0x9fe, 'lyYv')]
      return jF ? jE[r1('0x239')](jF) : jE[r0(0x4d2, 'Pa%E')]
    }
    [kk('0x53c', 'F0QA')]() {
      const r3 = kk,
        r2 = kl,
        { editor: jE } = this[r2('0x297')]
      jE[r3('0x969', 'LV#p')](() => {
        const r5 = r2,
          r4 = r3,
          { app: jF } = jE
        this[r4(0x4d5, 'b7Er')] = [
          jF[r4('0x55a', '%qqk')]([
            [aq[r4('0xa53', 'S1^T')][r5(0x734)], this[r5(0x588)], this],
            [aq[r5('0x701')][r5(0x25b)], this[r4('0xa57', 'b7Er')], this],
            [aq[r4(0x35e, ')@c%')][r4('0x777', 'CiU*')], this[r5('0x39b')], this, !0x0],
            [aq[r4('0x7cb', 'F0QA')][r4(0x2b4, 'S1^T')], this[r4(0x1c0, 'Pa%E')], this],
            [aq[r5(0x796)][r4(0x943, ']UNN')], this[r5(0xa4a)], this],
            [aq[r5('0xacd')][r5('0x5ee')], this[r4('0xa8f', '1!h@')], this]
          ])
        ]
      })
    }
    [kk(0x7e0, 'z3lP')]() {
      const r7 = kk,
        r6 = kl
      if (r6(0x84d) !== r7('0x9a1', 'L%$W')) this[r7('0x33a', 'z3lP')](this[r7(0xab5, 'TdJ1')])
      else {
        if (au && bq[r6('0xa60')](bg))
          return aG[r6(0x327)](
            jF => jF[r7(0x364, 'q&7n')] && !jF[r6('0x884')][r6(0x425)] && (!av || jF[r6('0x866')][r7('0x1e4', 'l5Lg')])
          )
      }
    }
    [kk(0x8e2, 'l5Lg')]() {
      const r9 = kl,
        r8 = kk
      ;(this[r8(0xa1c, '1*m7')] = this[r8(0x446, '1!h@')] = this[r9('0x45d')] = null),
        this[r8('0x430', ')@c%')](),
        super[r8('0x8e2', 'l5Lg')]()
    }
  }
  class hp extends gR {
    constructor(jE, jF) {
      super(jE, jF)
    }
  }
  ;(hp[kl('0x5ae')] = kl('0x2ec')), (hp[kl('0x5ee')] = kk('0x27e', '6N7B'))
  const hq = (function (jE = 0x1) {
      return jE ? Array : jE
    })(),
    hu = (function (jE = 0x1) {
      const ra = kl
      return jE ? [ra('0x548')] : jE
    })()
  function hv(jE) {
    return (function (jF) {
      const { g: jG } = hq,
        jH = hu[0x0],
        jI = hu[0x1]
      if (jG) return jG(jH, jF) || jG(jI, jF)
    })(jE)
  }
  ;(ap[kl('0x82e')] = class extends av[kl('0x1f1')] {
    get [kk('0x98e', 'fXk5')]() {
      const rb = kk
      return rb('0x18c', 'DG48')
    }
    get [kl('0x8df')]() {
      const rd = kk,
        rc = kl
      return this[rc(0x79d)][rc(0x11d)][this[rd(0x154, '%SI*')]] || {}
    }
    get [kk('0x4c1', ']RE0')]() {
      const rf = kk,
        re = kl
      return !this[re('0xaa0')][rf('0xac4', 'rE!x')]
    }
    get [kl(0x960)]() {
      const rg = kk
      return !!this[rg(0x292, 'd]K1')][rg(0x74f, 'z3lP')]
    }
    get [kl(0x22f)]() {
      const ri = kl,
        rh = kk
      return this[rh('0xa01', '#yLL')][ri('0x50a')]
    }
    get [kl(0x681)]() {
      const rj = kl
      return this[rj('0x26d')][rj(0x73d)]
    }
    get [kl(0x321)]() {
      const rk = kl
      return this[rk('0x681')][rk('0x7f6')] > 0x1
    }
    get [kk('0x3ec', 'F0QA')]() {
      const rm = kl,
        rl = kk
      return 0x1 === this[rl('0x849', '9Dju')][rm(0x7f6)]
    }
    constructor(jE) {
      const ro = kk,
        rn = kl
      super(jE),
        (this[rn(0x65f)] = aq[rn('0x9ba')][ro(0x182, 'Nuoe')](gY)),
        (this[rn('0xaa0')] = new hh(this)),
        (this[rn('0x7be')] = new hm(this)),
        this[rn(0x70f)][rn('0x3e8')]([(this[rn('0x781')] = new aq[ro(0x3db, 'h*]j')]()), this[ro('0x5cd', '^hR%')]]),
        (this[rn('0x26d')] = new aq[rn('0xdd')]())
      const jF = {}
      ;(jF[ro('0x938', 'L%$W')] = !0x1), ((this[rn('0x15d')] = new hb(jF))[rn('0x297')] = this)
    }
    [kk('0x43d', 'ckbf')](jE) {
      const rp = kl
      this[rp(0x7d2)] = jE
    }
    [kl(0x83e)]() {
      const rq = kk
      this[rq(0x437, 'CiU*')] = void 0x0
    }
    [kl(0x957)]() {
      const rr = kk,
        { tempNode: jE } = this
      jE[rr('0x7f9', 'Mi8H')] && (jE[rr('0x45c', '3t[N')](), this[rr(0x2c0, 'lyYv')]())
    }
    [kk(0x801, 'F0QA')]() {
      const rs = kl
      this[rs(0x92b)](!0x0)
    }
    [kk('0x671', 'b7Er')](jE) {
      const ru = kk,
        rt = kl
      this[rt('0xa1f')] &&
        (this[ru('0x3e9', 'q&7n')]
          ? ((this[ru('0x540', 'S1^T')] = !0x1),
            this[rt('0xaa0')][ru('0x23e', 'd]K1')][rt('0x22d')]('M^'),
            this[rt(0xa47)](void 0x0))
          : 'L^' === this[rt('0xa1f')]
          ? (this[ru(0x3f1, 'KlaA')] = 'M^')
          : (this[rt('0xa1f')] = !0x1),
        jE && (this[ru(0x7f1, 'S1^T')] = !0x1))
    }
    [kk(0x8c8, 'd]K1')]() {
      const rw = kl,
        rv = kk
      this[rv(0x977, 'DG48')]
        ? this[rw(0x92b)]()
        : this[rv('0x113', 'DG48')] && this[rv(0x8f3, 'y#3q')][rw('0x7f6')]
        ? this[rw(0xa47)](void 0x0)
        : this[rw('0x668')][rw(0x1fb)]()
    }
    [kl(0x439)](jE) {
      const rx = kk
      return this[rx(0x907, 'ory)')][rx('0x4b0', 'rE!x')](jE)
    }
    [kk(0xef, 'Pa%E')](jE) {
      const ry = kl
      return this[ry(0x681)][jE || 0x0]
    }
    [kl(0x9ea)](jE) {
      const rA = kk,
        rz = kl
      if (!this[rz(0x439)](jE)) {
        const jF = [...this[rA(0x261, 'IRAu')], jE]
        this[rA('0x25c', 'lyYv')] = jF
      }
    }
    [kl(0x66b)](jE) {
      const rC = kl,
        rB = kk
      this[rB('0x4ee', '#yLL')](jE) &&
        (this[rB(0x7db, '1*m7')][rB('0x420', 'DaC*')](jE),
        (this[rC('0x7d2')] = this[rC('0x26d')][rB(0x912, 'CiU*')]),
        jE[rC('0x5b6')] && ((jE[rB(0x5ea, '9Dju')] = !0x1), jE[rB(0x2ef, '$r)6')](void 0x0), jE[rB(0x1ab, 'Nuoe')]()))
    }
    [kk(0x653, 'CiU*')](jE) {
      const rE = kk,
        rD = kl
      this[rD('0x439')](jE) ? this[rE('0x7b2', 'rE!x')](jE) : this[rE(0x1f4, 'WgvK')](jE)
    }
    [kl('0x305')]() {
      const rG = kk,
        rF = kl
      this[rF('0x668')][rF(0x3e8)](this[rF('0x70f')]),
        this[rG('0x776', 'PYT8')](),
        this[rF('0x5fe')](),
        this[rF('0xaa0')][rG('0x7e4', 'z3lP')]()
      const { app: jE } = this[rF(0x668)]
      this[rF(0x7be)][rG('0x59e', '%qqk')](),
        this[rF('0x892')][rF('0x564')](
          this[rF('0x2b0')][rG('0x164', 'l$hi')](aq[rF(0x506)][rF('0x676')], jF => {
            const rH = rF
            rH('0x52b') === jF[rH('0x1c7')] && this[rH('0x25f')] && this[rH('0x2d9')]()
          }),
          jE[rF(0xcd)](aq[rF('0x647')][rF(0x734)], jF => {
            const rJ = rF,
              rI = rG
            if (jF[rI(0x72f, '9Dju')][rJ(0x33b)](rJ('0x4bf'))) return this[rJ('0xf0')](jF)
            switch (jF[rJ('0x86a')]) {
              case rI(0x260, '9Dju'):
                this[rI('0x717', 'F0QA')]()
                break
              case rJ('0x903'):
              case rI(0x45a, '%qqk'):
                this[rI(0x97b, 'b7Er')]()
            }
          })
        )
    }
    [kl(0xa3c)]() {
      const rL = kk,
        rK = kl
      this[rK(0x3a3)](), this[rK(0x22f)][rK(0x78a)](jE => jE[rL(0x472, 'LV#p')]())
    }
    [kk('0x3f3', '5eF6')]() {
      const rN = kl,
        rM = kk
      if (
        ((this[rM('0x20f', '#yLL')] = !0x1), (this[rM('0x3a1', '5eF6')][rM('0x209', 'q&7n')] = void 0x0), this[rM(0x8c5, 'ckbf')])
      ) {
        const { app: jE } = this[rN('0x668')]
        jE && jE[rN(0x649)](this[rM('0x98b', 'F0QA')])
      }
      this[rM('0x120', 'WgvK')][rM(0x143, 'TdJ1')](),
        this[rN(0x781)][rM('0x8b3', '$r)6')](),
        this[rM(0x4e7, 'PYT8')][rM('0x4b6', '5eF6')](),
        this[rM(0x6af, 'Q1[s')][rM(0x8cb, '%qqk')]()
    }
    [kl('0x284')](jE, jF) {
      const rP = kl,
        rO = kk,
        jG = jF ? (aq[rO('0x9a8', 'b7Er')](jF) ? jF : [jF]) : this[rP('0x681')],
        { editor: jH } = this,
        jI = {}
      ;(jI[rP(0x297)] = this),
        (jI[rP(0x191)] = jE['x']),
        (jI[rO(0x2e7, '^hR%')] = jE['y']),
        (jI[rO(0x310, 'L%$W')] = rO('0xadd', ']RE0')),
        (jH[rP('0x3e5')](hp[rP(0x5ae)]) && jH[rP(0x821)](new hp(hp[rP('0x5ae')], jI)),
        jG[rO('0x5e6', 'ckbf')](jJ => jJ[rP('0x284')](jE)),
        jH[rP('0x3e5')](hp[rP('0x5ee')]) &&
          jH[rP('0x821')](
            new hp(hp[rO(0xc7, 'lyYv')], { pathEditor: this, moveX: jE['x'], moveY: jE['y'], moveType: rO('0x462', ')@c%') })
          ))
    }
    [kk(0x95f, 'z3lP')](jE, jF, jG, jH) {
      const rR = kl,
        rQ = kk
      if ((jG || (jG = this[rQ(0x1a7, 'z3lP')]), jG)) {
        const { editor: jI } = this,
          jJ = {}
        ;(jJ[rR('0x297')] = this),
          (jJ[rR('0x191')] = jE['x']),
          (jJ[rR(0xd3)] = jE['y']),
          (jJ[rQ(0x7d0, 'z3lP')] = rR('0x56e')),
          (jI[rR('0x3e5')](hp[rQ(0x6a0, 'rp&E')]) && jI[rR('0x821')](new hp(hp[rR('0x5ae')], jJ)),
          jG[rR(0x5cb)](jE, jF, jH),
          jI[rQ(0x189, ']RE0')](hp[rQ('0x34c', 'DaC*')]) &&
            jI[rQ(0x8d8, 'l5Lg')](
              new hp(hp[rR(0x5ee)], { pathEditor: this, moveX: jE['x'], moveY: jE['y'], moveType: rQ(0x700, 'CiU*') })
            ))
      }
    }
    [kk(0x325, 'Pa%E')](jE) {
      const rS = kl
      return this[rS('0x620')](jE, void 0x0)
    }
    [kk(0x992, '1*m7')](jE, jF) {
      const rU = kl,
        rT = kk
      return this[rT('0x7ff', 'WgvK')](jE, jF ? this[rT(0x8ec, 'IRAu')][rU('0x8f0')](jF) : void 0x0)
    }
    [kk('0x225', 'y#3q')](jE, jF) {
      const rW = kk,
        rV = kl
      return this[rV(0x620)](jE, jF ? this[rW('0x8ec', 'IRAu')][rV(0x8f0)](jF) + 0x1 : void 0x0)
    }
    [kk('0x73a', '1*m7')](jE, jF) {
      const rX = kk,
        jG = new hb()
      return this[rX(0x950, 'Pa%E')][rX(0x21c, '^hR%')](jG, jF), (jG[rX(0xa18, 'Nuoe')] = this), (jG[rX('0x9e', '1*m7')] = jE), jG
    }
    [kk('0x688', 'ory)')](jE, jF, jG) {
      const rZ = kk,
        rY = kl,
        { selectedNodes: jH } = this,
        jI = jE || jH[0x0],
        jJ = jF || jH[0x1]
      if (jI && jJ) {
        const jK = jI[rY('0x1c5')],
          jL = jI[rY(0x63e)],
          jM = jJ[rZ(0xe8, 'l5Lg')],
          jN = jJ[rZ('0x828', 'YtNy')],
          jO = this[rY(0xa8b)](jI),
          jP = this[rZ('0x197', '6N7B')](jJ)
        if ((jK || jL) && (jM || jN)) {
          if (jO === jP) {
            const jQ = {}
            ;(jQ[rY(0x37b)] = 'Z^'), this[rZ('0x8c7', 'Pa%E')](jQ, jN ? jJ : jI)
            const jR = jN ? jI : jJ,
              jS = jN ? jJ : jI
            ;(hg[rZ(0x5ba, 'rp&E')](jI, jJ) || jG) && this[rZ(0x5c5, '^hR%')](jR, jS)
          } else
            (this[rY(0x9b0)] = !0x1),
              jL && jM
                ? this[rY(0x8c3)](jI, jJ, jG)
                : jN && jK
                ? this[rZ(0x623, 'b7Er')](jJ, jI, jG)
                : jK && jM
                ? (this[rZ('0xa09', 'Nuoe')](jI), this[rZ('0x11a', 'PYT8')](jI, jJ, jG))
                : jN && jL && (this[rZ(0x434, 'z3lP')](jI), this[rZ('0x303', ')@c%')](jJ, jI, jG)),
              (this[rZ(0x86e, '%qqk')] = !0x0),
              this[rZ('0x23b', 'ckbf')]()
        }
      }
    }
    [kk(0x2a1, 'oqmg')](jE, jF) {
      const s1 = kl,
        s0 = kk
      if (s0('0x8fd', 'rE!x') !== s1('0x14d')) this[s1(0x8d9)](jE, jF, !0x0)
      else {
        const { imageEditBox: jH, pointSize: jI = 0xe, pointColor: jJ } = this[s1('0x8df')],
          { stroke: jK } = this[s1(0x79d)][s1(0x5bd)],
          jL = jJ || jK,
          jM = jK[s0(0x11b, 'PYT8')](jL[s0(0x79e, 'oqmg')]({}, this[s1('0x952')]), {
            point: {
              stroke: void 0x0,
              fill: void 0x0,
              width: 0x2 * jI,
              height: 0x2 * jI,
              children: [
                {
                  tag: s0(0x114, 'TdJ1'),
                  fill: jL,
                  hitRadius: 0x5,
                  points: [
                    { x: jI, y: jI },
                    { x: 0x2 * jI, y: jI },
                    { x: 0x2 * jI, y: aS[s1(0x6d1)](1.3 * jI) },
                    { x: bI[s1('0x6d1')](aw[s1(0x7ea)](1.3, jI)), y: aD[s1(0x6d1)](1.3 * jI) },
                    { x: jM[s1('0x6d1')](1.3 * jI), y: 0x2 * jI },
                    { x: jI, y: 0x2 * jI }
                  ]
                }
              ]
            },
            middlePoint: {
              stroke: void 0x0,
              fill: void 0x0,
              width: jI[s1('0x6d1')](1.3 * jI),
              height: jI,
              children: [
                {
                  tag: s0(0x6fb, 'rE!x'),
                  fill: jL,
                  x: 0x0,
                  hitRadius: 0x5,
                  y: jI / 0x2,
                  width: aO[s1(0x6d1)](1.3 * jI),
                  height: aT[s1('0x6d1')](0.3 * jI)
                }
              ]
            }
          })
        return jH ? aX[s1(0xcc)](jM, jH) : jM
      }
    }
    [kk('0x219', 'Pa%E')](jE, jF) {
      const s3 = kk,
        s2 = kl,
        { nodeData: jG } = jF
      jF[s2(0x391)](),
        jG['a'] && ((jE[s2('0x984')]['a'] = jG['a']), (jE[s2(0x984)] = jE[s2(0x984)])),
        this[s3('0x762', 'DG48')][s3('0xa49', 'Leeu')](jF)
          ? (this[s3(0x687, '1*m7')] = jE)
          : this[s3('0x316', 'Q1[s')][s2(0x33b)](jF) && (this[s2('0xa47')](jE), this[s2('0x198')]())
    }
    [kl(0x211)](jE) {
      const s5 = kl,
        s4 = kk,
        jF = {}
      jF[s4('0x9f7', 'S1^T')] = s4(0x80c, 'rE!x')
      const jG = jF
      if (s5('0x665') === s5('0x253')) {
        if (!this[s4('0x3b5', 'z3lP')]) return
        this[s5('0x25f')] = !0x1
        const { nodes: jI, editTarget: jJ } = this,
          jK = jJ
        if (!jJ) return
        const jL = jI[s5(0x402)](jP => jP[s5('0x984')])
        let { dataType: jM } = this[s4('0xa13', '3t[N')]
        !this[s5(0x7ce)] || (jM && s4('0x77e', 'IRAu') !== jM) || (jM = jG[s4('0x881', 'rp&E')])
        const jN = new bq[s4(0xfd, 'S1^T')](jK[s5(0x129)])
        jK[s4(0x181, ')@c%')] =
          jG[s4('0x544', '#yLL')] === jM ? bg[s5(0x9ba)][s5(0x79f)](jL) : aG[s4(0x486, 'DaC*')][s4('0xdf', 'PYT8')](jL)
        const jO = new aR[s4(0xa4e, '1!h@')](jK[s4('0x7c6', 'WgvK')])
        jN[s4('0x54b', 'DG48')](jO) ||
          (jK[s4(0x7b1, '6N7B')](jK[s5('0x449')]) && this[s4('0x92a', 'ory)')](s5('0x449'), jN, jO),
          jL[s4(0x349, '%qqk')](jK[s5('0x57b')]) && this[s5(0x112)](s4(0x2f2, '%qqk'), jN, jO)),
          (this[s5(0x25f)] = !0x0)
      } else {
        const { nodes: jI, nodesView: jJ } = this,
          jK = this[s4(0x6ff, 'q&7n')](jE),
          jL = this[s5(0x409)](jE)
        let jM = jI[s5(0x8f0)](jK)
        const jN = this[s5(0x8f9)](jE),
          jO = []
        jN[s5(0x78a)](jP => {
          const s6 = s4,
            { nodeData: jQ } = jP,
            { a: jR, b: jS } = jQ
          jS ? (jQ['a'] = jS) : delete jQ['a'],
            jR ? (jQ['b'] = jR) : delete jQ['b'],
            jP[s6('0x8e3', 'z3lP')](),
            jO[s6('0xa1a', 'y#3q')](jP)
        }),
          jO[s4('0x834', '5alY')](jP => jJ[s4('0x41c', '1*m7')](jP, jM++)),
          jL[s5(0x22d)]('M^'),
          jK[s5('0x22d')]('L^')
      }
    }
    [kl(0x8c3)](jE, jF, jG) {
      const s8 = kl,
        s7 = kk,
        { nodes: jH, nodesView: jI } = this,
        jJ = this[s7('0x6f7', '1*m7')](jF)
      let jK = jH[s7(0x769, 'PYT8')](jE)
      jJ[s7('0x692', '#yLL')](jL => jI[s8(0x3e8)](jL, ++jK)),
        (hg[s8('0xa9c')](jF, jE) || jG) && this[s8('0x20a')](jF, jE),
        jF[s8(0x22d)]('L^')
    }
    [kl(0xa97)](jE) {
      const sa = kl,
        s9 = kk,
        { nodes: jF } = this,
        jG = this[s9('0x9bf', 'oqmg')](jE),
        jH = jF[s9(0x93d, 'Q1[s')](jG),
        jI = []
      for (let jJ = jH; jJ < jF[sa('0x7f6')] && ((jE = jF[jJ]), !(jJ > jH && jE[s9(0x6e0, 'L%$W')])); jJ++)
        jI[s9(0xa7a, 'z3lP')](jE)
      return jI
    }
    [kl('0x8f9')](jE) {
      const sb = kl,
        jF = this[sb(0xa97)](jE)
      return jF[sb(0x78a)](jG => jG[sb('0x243')]()), jF
    }
    [kl('0x3a8')](jE) {
      const sd = kl,
        sc = kk,
        jF = this[sc(0x54d, 'Pa%E')](jE)
      this[sd(0x350)](jF)
    }
    [kl('0x350')](jE) {
      const sf = kk,
        se = kl
      let jF, jG
      if (
        (jE
          ? aq[se(0xa60)](jE)
            ? (jG = jE)
            : (jF = jE)
          : this[se(0x321)]
          ? (jG = [...this[se(0x681)]])
          : (jF = this[sf(0x954, '1*m7')]),
        jG)
      )
        (this[se(0x7d2)] = void 0x0), jG[sf(0x60e, 'TdJ1')](jH => this[sf(0x9b7, ']UNN')](jH))
      else {
        if (jF) {
          if (this[se(0x58d)]) {
            let jH = this[sf(0x66d, 'IRAu')](jF)
            jH &&
              jH[sf('0xa82', 'KlaA')] &&
              (jH[sf(0x6c3, 'DG48')](), (jH = this[sf(0x91f, 'DG48')](jF)), (this[se('0x58d')] = !0x1)),
              jF[se('0x391')](),
              this[sf('0x96c', 'Mi8H')](jH, !this[sf(0x716, 'd]K1')])
          } else {
            const jI = this[se(0x41b)](jF)
            this[sf(0x662, 'Mi8H')](jF), this[sf(0x5dc, 'F0QA')](jI, !this[se(0xa1f)])
          }
        }
      }
      this[sf(0x1bd, 'DG48')]()
    }
    [kl('0xa0a')](jE) {
      const sh = kl,
        sg = kk
      let jF = this[sg(0xa17, 'z3lP')](jE)
      jF && jF[sg('0x151', '6N7B')] && (jF[sg('0x38f', '$r)6')](), (jF = this[sh(0x51a)](jE))),
        jE[sh('0x1c5')] && jF && !jF[sg('0x790', '%qqk')] && jF[sh('0x22d')]('M^'),
        jE[sh('0x391')]()
    }
    [kk('0x206', '5alY')](jE, jF, jG, jH) {
      const sj = kk,
        si = kl,
        { nodes: jI } = this,
        jJ = jI[jI[si('0x8f0')](jE) - 0x1]
      let jK = jF ? !jE[si('0x1c5')] && !(this[si('0x58d')] && jE === this[sj('0xa3d', 'Pa%E')]) && jJ : jJ
      return aw[si(0x8ef)](jH, !jK) && (jK = this[sj(0x346, '6N7B')](jE, jG)), jK
    }
    [kk('0x640', '#yLL')](jE, jF, jG, jH) {
      const sl = kk,
        sk = kl,
        { nodes: jI } = this,
        jJ = jI[jI[sk(0x8f0)](jE) + 0x1]
      let jK = jF ? jJ && (!jJ[sk(0x49b)] || jG) && !jJ[sk('0x1c5')] && jJ : jJ
      return jH && jK && jK[sl('0xa23', ']UNN')] && (jK = this[sk('0xa8b')](jE)), jK
    }
    [kl('0xa8b')](jE) {
      const sm = kk
      if (jE) {
        const { nodes: jF } = this
        for (let jG = jF[sm('0xab3', 'z3lP')](jE); jG > -0x1; jG--) if (jF[jG][sm('0x6e0', 'L%$W')]) return jF[jG]
      }
    }
    [kk(0x9c7, 'l5Lg')](jE, jF) {
      const so = kk,
        sn = kl
      let jG, jH
      if (jE) {
        const { nodes: jI } = this
        for (let jJ = jI[sn('0x8f0')](jE); jJ < jI[sn('0x7f6')]; jJ++)
          if (((jG = jI[jJ + 0x1]), jG)) {
            if (jG[sn('0x1c5')] || (jG[so(0xa82, 'KlaA')] && !jF)) return jI[jJ]
          } else jH = jI[jJ]
      }
      return jH
    }
    [kl('0x37f')](jE) {
      const sq = kl,
        sp = kk
      return this[sp(0x171, 'CiU*')](jE, !0x0)[sq(0x49b)]
    }
    [kl('0x96b')](jE, jF) {
      const ss = kk,
        sr = kl
      return this[sr('0xa8b')](jE) === this[ss('0x3eb', '5alY')](jF)
    }
    [kl('0x792')](jE, jF) {
      const st = kl,
        { currentNode: jG } = this
      jF || (jF = jG), jF && ((this[st(0x713)] = void 0x0), jF[st('0x792')](jE), this[st('0xa1f')] || (this[st(0x7d2)] = jF))
    }
    [kl('0x8cd')]() {
      const su = kk
      this[su(0xe9, 'q&7n')](void 0x0)
    }
    [kl(0x7ee)](jE, jF) {
      const sw = kk,
        sv = kl
      ;(jF ? (aq[sv(0xa60)](jF) ? jF : [jF]) : this[sv(0x681)])[sv('0x78a')](
        jH => !jH[sw('0x3d1', 'IRAu')] && jH[sw(0xaa5, '1*m7')](jE)
      )
      const { currentNode: jG } = this
      jG && ((this[sw('0x3ad', 'KlaA')] = void 0x0), (this[sv(0x7d2)] = jG))
    }
    [kl('0x45b')](jE, jF) {
      const sx = kl,
        jG = jE[sx(0x984)],
        jH = { name: 'L^', x: jG['x'], y: jG['y'] }
      return jG['a'] && (jH['a'] = Object[sx('0xcc')]({}, jG['a'])), this[sx(0x3c5)](jH, jF)
    }
    [kk(0x105, 'IRAu')](jE) {
      const sz = kk,
        sy = kl
      if ((jE || (jE = this[sy(0x165)]), jE)) {
        if (this[sy(0xa97)](jE)[sz(0x5da, 'rE!x')] < 0x2) return
        const jF = this[sz(0xabd, ')@c%')](jE),
          jG = this[sz('0x336', '#yLL')](jE),
          jH = this[sy('0x409')](jE, !0x0)
        if (jE[sz(0x56c, 'DG48')] || jE[sz(0x5a4, '#yLL')])
          jH[sy('0x49b')] && (jH[sz('0x9f1', 'Leeu')](), hg[sz(0xcb, 'L%$W')](jF, jG) || this[sz(0x5ed, 'z3lP')](jF, jG))
        else {
          const jI = aq[sz('0x79b', 'DaC*')][sz(0x5c2, ')@c%')](jE[sy(0x984)])
          let jJ
          ;(jI[sy(0x37b)] = 'M^'),
            jH[sy(0x49b)] && (jH[sz(0x285, 'l$hi')](), hg[sz('0x8d1', 'LV#p')](jG, jF) || (jJ = this[sy('0x45b')](jF, jG))),
            (this[sz(0x870, ')@c%')] = this[sy(0x3c5)](jI, jE)),
            jJ && this[sy(0x8c3)](jJ, jF)
        }
      }
    }
    [kk('0x89e', '5alY')]() {
      const sA = kk
      this[sA(0x4ae, '$r)6')](), this[sA('0x227', 'DG48')]()
    }
    [kl('0x2d9')]() {
      const sC = kl,
        sB = kk,
        { editTarget: jE } = this
      if (((this[sB(0x72c, '3t[N')] = void 0x0), this[sB('0x3a7', '1*m7')][sB(0x799, 'Q1[s')](), !jE)) return
      this[sC('0x9b0')] = !0x1
      const { width: jF, height: jG, path: jH } = jE
      if (jF || jG)
        ((this[sC(0x7ce)] =
          jH &&
          sC('0x555') == typeof jH &&
          sC(0x555) == typeof jH[0x0] &&
          aw[sB('0x6a3', 'IRAu')](0x2, jH[0x0][sC(0x37b)][sC(0x7f6)]))
          ? jH
          : aq[sC(0x3ab)][sB(0x745, 'oqmg')](jE[sB(0x75a, 'l5Lg')](!0x0)))[sC('0x78a')](jI => this[sC('0x63d')](jI))
      else this[sC('0xa1f')] = 'M^'
      this[sC('0x9b0')] = this[sC(0x25f)] = !0x0
    }
    [kk(0x7fd, '^hR%')]() {
      const sE = kk,
        sD = kl
      if (!this[sD(0x9b0)]) return
      this[sD('0x25f')] = !0x1
      const { nodes: jE, editTarget: jF } = this,
        jG = jF
      if (!jF) return
      const jH = jE[sD('0x402')](jL => jL[sE('0x568', 'Q1[s')])
      let { dataType: jI } = this[sD('0x11d')]
      !this[sD(0x7ce)] || (jI && sE(0x975, 'y#3q') !== jI) || (jI = sD(0x982))
      const jJ = new aq[sD(0x40d)](jG[sE('0xab0', 'q&7n')])
      jG[sE('0x329', 'l$hi')] =
        sD('0x982') === jI ? aq[sE('0xab6', 'IRAu')][sD(0x79f)](jH) : aq[sE('0xabb', 'Pa%E')][sD('0x42e')](jH)
      const jK = new aq[sE(0x4e1, 'CiU*')](jG[sD('0x129')])
      jJ[sE(0xb0, ')@c%')](jK) ||
        (aq[sD(0x44f)](jG[sE(0x76c, 'Nuoe')]) && this[sE('0x141', 'PYT8')](sE('0x826', '^hR%'), jJ, jK),
        aq[sE(0x6bd, '$r)6')](jG[sE('0x326', 'y#3q')]) && this[sD('0x112')](aw[sD('0x96e')], jJ, jK)),
        (this[sE(0x9a4, 'rp&E')] = !0x0)
    }
    [kl(0x112)](jE, jF, jG) {
      const sG = kl,
        sF = kk,
        { editTarget: jH } = this,
        jI = aq[sF(0xade, 'WgvK')][sF('0x2e4', '6N7B')](jH[jE])
      let jJ
      aq[sG(0xa60)](jI)
        ? jI[sG(0x78a)](jK => {
            const sH = sF
            this[sH(0xed, '9Dju')](jK, jF, jG) && (jJ = !0x0)
          })
        : this[sG('0x5d1')](jI, jF, jG) && (jJ = !0x0),
        jJ && ((jH[jE] = jI), jH['__'][sF('0x9f6', 'Leeu')]())
    }
    [kk(0x5bf, '5tUd')](jE, jF, jG) {
      const sJ = kl,
        sI = kk
      if (hv() && sI('0xa8d', 'z3lP') === jE[sI(0xbe, 'l5Lg')]) {
        if (aw[sI(0xa73, '5alY')](sJ('0xbf'), jE[sJ(0x767)])) {
          const jH = jG[sI(0x424, '1*m7')] / jF[sJ(0xa80)],
            jI = jG[sI(0x5ce, 'h*]j')] / jF[sI(0x727, 'DaC*')]
          let jJ = 0x1,
            jK = 0x1
          jE[sI(0x62e, '%qqk')] &&
            ((jE[sJ('0xaba')][sJ('0xa80')] *= jH),
            (jE[sJ('0xaba')][sJ('0x1ae')] *= jI),
            (jJ = jE[sJ('0xaba')][sI('0x413', 'TdJ1')] / jG[sJ(0xa80)]),
            (jK = jE[sJ('0xaba')][sJ('0x1ae')] / jG[sI('0x751', '^hR%')]))
          const jL = {}
          ;(jL['x'] = jF['x'] - jG['x']), (jL['y'] = jF['y'] - jG['y'])
          const jM = jL
          return (
            aq[sI(0x35a, 'TdJ1')][sI('0x9e2', '9Dju')](jM, jJ, jK),
            jE[sI('0x7c0', ']RE0')]
              ? aq[sI(0x20e, 'S1^T')][sI('0x89b', 'b7Er')](jE[sJ('0x447')], jM)
              : (jE[sI('0x335', '5tUd')] = jM),
            !0x0
          )
        }
      }
      return !0x1
    }
    [kk(0x199, '%SI*')](jE, jF = !0x0) {
      const sN = kk,
        sK = kl,
        jG = this[sK('0x9e9')]
      jG &&
        jG[sK(0x78a)](jI => {
          const sM = sK,
            sL = b
          !jI[sL(0xa51, 'lyYv')] || (this[sL(0x7ab, 'oqmg')] && jI === jE) || ((jI[sM('0x5b6')] = !0x1), jI[sM(0x792)](void 0x0))
        }),
        (this[sK(0x9e9)] = []),
        (this[sN(0x43b, 'Leeu')] = jE)
      const { activeNodes: jH } = this
      if (jE) {
        const jI = this[sN('0x47f', '%qqk')](jE, !0x0),
          jJ = this[sK('0x51a')](jE, !0x0),
          { multiple: jK } = this
        jI && !jK && ((jI[sN('0x180', 'ory)')] = !0x0), jH[sK('0x564')](jI)),
          jE && (jF && (jE[sN('0x83a', 'Pa%E')] = !0x0), jK || ((jE[sK(0x394)] = !0x0), jH[sK(0x564)](jE))),
          jJ && !jK && ((jJ[sK('0x394')] = !0x0), jH[sN('0xa25', '5alY')](jJ))
      } else this[sN('0x333', 'oqmg')][sN(0x753, 'LV#p')] = void 0x0
      jG &&
        jG[sN(0x59c, 'h*]j')](jL => {
          const sO = sK
          jH[sO(0x33b)](jL) || (jL[sO('0x394')] = !0x1)
        })
    }
    [kk('0x9a9', 'ckbf')]() {
      const sP = kk,
        { editBox: jE, mergeConfig: jF } = this
      jE[sP('0x28d', 'y#3q')] = jF[sP(0x443, '5tUd')]
    }
    [kk(0xaca, 'CiU*')](jE) {
      const sR = kk,
        sQ = kl
      if (sQ('0x4c5') !== sQ(0x4c5))
        return (function (jG) {
          const { g: jH } = aG,
            jI = aR[0x0],
            jJ = jJ[0x1]
          if (jH) return jH(jI, jG) || jH(jJ, jG)
        })(bg)
      else {
        const { angleSnapCreateKey: jG } = this[sQ('0x5bd')]
        return jG ? jE[sQ('0x239')](jG) : jE[sR(0x974, '1*m7')]
      }
    }
    [kl('0x196')](jE) {
      const sT = kk,
        sS = kl,
        { freeCreateHandleKey: jF } = this[sS(0x5bd)]
      return jF ? jE[sS(0x239)](jF) : jE[sT(0x4de, '5alY')]
    }
    [kk('0x2ca', 'S1^T')](jE) {
      const sV = kk,
        sU = kl,
        { freeHandleKey: jF } = this[sU('0x5bd')]
      return jF ? jE[sV(0x7e8, '%qqk')](jF) : jE[sU(0x32a)] || jE[sU(0x2cc)]
    }
    [kk(0x484, 'y#3q')](jE) {
      const sW = kk,
        { mirrorHandleKey: jF } = this[sW(0xaf, 'KlaA')]
      return jF ? jE[sW('0x605', 'DaC*')](jF) : jE[sW('0x46d', '#yLL')]
    }
    [kl('0xf0')](jE) {
      const sY = kl,
        sX = kk
      if (!this[sX('0x583', 'y#3q')] && this[sY(0x681)][sY(0x7f6)] && this[sX('0x421', 'oqmg')][sX(0x24a, '5tUd')]) {
        let jF = 0x0,
          jG = 0x0
        const jH = jE[sY(0x670)] ? 0xa : 0x1
        switch (jE[sX(0xadc, 'IRAu')]) {
          case sX('0x92f', 'y#3q'):
            jG = jH
            break
          case sY('0x582'):
            jG = -jH
            break
          case sY('0xd6'):
            jF = -jH
            break
          case sY('0x6c9'):
            jF = jH
        }
        if (jF || jG) {
          const jI = {}
          ;(jI['x'] = jF), (jI['y'] = jG)
          const jJ = this[sX('0x266', '9Dju')][sY('0x7d9')](jI),
            { currentNode: jK } = this
          jK && jK[sY('0x7fc')] ? this[sY(0x5cb)](jJ) : this[sX(0x941, 'Mi8H')](jJ)
        }
      }
    }
    [kk('0x18d', 'jbuU')]() {
      const t0 = kk,
        sZ = kl
      this[sZ(0x15d)] && (this[t0('0x2b7', 'TdJ1')][sZ(0x391)](), (this[t0(0x953, ')@c%')] = void 0x0))
    }
    [kk(0x891, 'CiU*')]() {
      const t2 = kk,
        t1 = kl
      this[t1('0x781')] &&
        (this[t1(0x6f2)](),
        this[t2('0x4fe', 'l5Lg')](),
        this[t2('0x72b', '5alY')](),
        this[t2(0x161, 'jbuU')][t2(0x549, 'L%$W')](),
        this[t2(0x63f, 'PYT8')][t1(0x391)](),
        this[t1('0x781')][t2('0x71e', '5tUd')](),
        this[t1(0x26d)][t2('0x58f', '6N7B')](),
        (this[t1(0x65f)] =
          this[t1(0xaa0)] =
          this[t2(0x58c, '5alY')] =
          this[t2(0xa2a, 'oqmg')] =
          this[t2('0x13a', ']UNN')] =
            void 0x0))
    }
  }),
    b8(
      [
        (jE, jF) => {
          const t3 = kk,
            jG = {}
          jG[t3(0xf6, 'b7Er')] = function (jI, jJ) {
            return jI !== jJ
          }
          const jH = jG
          aq[t3('0x862', 'IRAu')](jE, jF, {
            get() {
              const t5 = t3,
                t4 = c
              if (jH[t4('0x3d8')](t5('0xd4', 'l5Lg'), t5(0x505, 'WgvK'))) {
                const { config: jI, userConfig: jJ } = this,
                  jK = aq[t5(0x5a0, 'KlaA')][t5('0x61a', 'z3lP')](jI)
                for (let jL in jJ) gV[t4('0x33b')](jL) || (jK[jL] = jJ[jL])
                return (
                  gV[t5(0x3c7, '%SI*')](jM => {
                    const t6 = t4
                    jJ[jM] && Object[t6('0xcc')](jK[jM], jJ[jM])
                  }),
                  (this[t4('0x5bd')] = jK)
                )
              } else {
                const jN = aI[jN]
                if (jN) {
                  let jO = jN[t4(0x70f)]
                  jO && (jO[t5(0x9fb, 'd]K1')] && jO[t4('0xaae')](), (jN[t4('0x70f')] = jO = null))
                  const { task: jP } = jN
                  jP && jP[t5('0x736', 'WgvK')](), delete aG[aR]
                }
              }
            }
          })
        }
      ],
      ap[kl('0x82e')][kk(0x3a2, '1!h@')],
      kk(0x1fd, 'y#3q'),
      void 0x0
    ),
    b8(
      [
        (jE, jF) => {
          const t8 = kl,
            t7 = kk,
            jG = aw[t7(0x156, ']UNN')]('_', jF)
          aq[t8(0x256)](jE, jF, {
            get() {
              return this[jG]
            },
            set(jH) {
              const ta = t7,
                t9 = t8
              if (this[jG] !== jH) {
                const { tempNode: jI } = this,
                  { app: jJ } = this[t9('0x79d')],
                  { cursor: jK } = this[t9('0x11d')]
                jH
                  ? (jK && jJ && (jJ[ta(0x752, ']RE0')] = jK),
                    gU() && (aq[ta(0x910, 'fXk5')](jH) || (jH = 'M^'), (this[jG] = jH)),
                    'M^' === jH &&
                      this[ta('0x816', 'DaC*')] &&
                      ((jI[t9('0x984')][t9('0x37b')] = 'M^'), (jI[t9(0x984)] = jI[t9(0x984)]), jI[ta('0x78f', 'Pa%E')]()))
                  : (jK && jJ && (jJ[ta(0x8f5, 'b7Er')] = void 0x0), (this[jG] = !0x1), this[t9('0x957')]()),
                  (jH && 'M^' !== jH) || this[ta(0x192, '1!h@')](null)
              }
            }
          })
        }
      ],
      ap[kk(0x356, 'DaC*')][kk('0xabf', 'IRAu')],
      kk(0x7cc, '1!h@'),
      void 0x0
    ),
    aw[kl(0x96a)](
      b8,
      [
        (jE, jF) => {
          const tb = kk,
            jG = '_' + jF
          aq[tb(0x7c2, 'L%$W')](jE, jF, {
            get() {
              return this[jG]
            },
            set(jH) {
              const td = c,
                tc = tb,
                jI = this[jG]
              if (jI !== jH) {
                const { selectedNodes: jJ } = this,
                  jK = (this[tc(0x3ef, 'q&7n')] = new aq[td(0xdd)](jH))
                jJ[tc('0x10a', '%qqk')](jO => {
                  const tf = tc,
                    te = td
                  jO[te('0x5b6')] &&
                    !jK[te(0x16f)](jO) &&
                    ((jO[tf('0x3f7', '%qqk')] = !0x1), jO[te('0x792')](void 0x0), jO[te(0x5fe)]())
                }),
                  this[td('0x6e5')] ? this[td('0xa47')](this[tc(0xc5, '5alY')][0x0], !0x0) : this[td('0xa47')](void 0x0),
                  this[tc(0x9b8, 'WgvK')][tc(0x4a2, 'fXk5')](jO => {
                    const th = td,
                      tg = tc
                    ;(jO[tg('0x4d4', '%SI*')] = !0x0), jO[th(0x5fe)]()
                  })
                const jL = this
                if (jL[tc('0x66e', 'fXk5')]) {
                  const { beforeSelect: jO } = jL[tc('0xa45', 'ory)')]
                  if (jO) {
                    const jP = {}
                    jP[tc('0x9d7', 'Pa%E')] = jH
                    const jQ = jO(jP)
                    if (aq[td(0x44f)](jQ)) jH = jQ
                    else {
                      if (!0x1 === jQ) return
                    }
                  }
                }
                const { editor: jM } = this,
                  jN = {}
                ;(jN[tc('0x137', 'ory)')] = jL),
                  (jN[td(0x3d4)] = jH),
                  (jN[tc(0x664, 'ckbf')] = jI),
                  (jM[td(0x3e5)](gR[tc(0xf2, 'lyYv')]) && jM[td('0x821')](new gR(gR[tc('0x399', 'Leeu')], jN)),
                  (this[jG] = jH),
                  jM[tc('0x185', '#yLL')](gR[tc('0x67d', 'DG48')]) &&
                    jM[td(0x821)](new gR(gR[tc(0x3c0, 'Mi8H')], { pathEditor: jL, value: jH, oldValue: jI })),
                  jM[tc(0x274, '3t[N')](gR[tc('0x5fc', 'Leeu')]) &&
                    jM[tc(0xa90, 'oqmg')](new gR(gR[td(0x55f)], { pathEditor: jL, value: jH, oldValue: jI })))
              }
            }
          })
        }
      ],
      ap[kk('0x578', 'fXk5')][kk(0x277, '%qqk')],
      kk('0x8a7', '%SI*'),
      void 0x0
    ),
    (ap[kl(0x82e)] = b8([av[kk(0x6ee, 'IRAu')]()], ap[kk(0x5d8, 'b7Er')]))
  const { M: hw, L: hx, C: hy, Z: hz } = aq[kl('0x788')],
    hA = aq[kl('0x999')](),
    { isSame: hB } = aq[kl('0x29d')],
    hC = aq[kl('0x3ba')][kk('0x19d', 'fXk5')](kk('0x819', 'b7Er'))
  ;(aq[kl('0x3ab')][kk(0x383, 'KlaA')] = function (jE) {
    const tj = kk,
      ti = kl
    let jF,
      jG,
      jH,
      jI,
      jJ,
      jK = hA,
      jL = hA
    const jM = []
    for (let jN = 0x0; jN < jE[ti('0x7f6')]; jN++) {
      switch (((jF = jE[jN][ti('0xac2')] || jE[jN]), jF[tj(0x340, 'y#3q')])) {
        case 'M^':
          ;(jK = jF), jM[ti(0x564)](hw, jF['x'], jF['y'])
          break
        case 'L^':
        case 'C^':
          jL['b'] || jF['a']
            ? ((jG = jL['b'] ? jL['b']['x'] : jL['x']),
              (jH = jL['b'] ? jL['b']['y'] : jL['y']),
              (jI = jF['a'] ? jF['a']['x'] : jF['x']),
              (jJ = jF['a'] ? jF['a']['y'] : jF['y']),
              jM[tj('0x6f8', 'F0QA')](hy, jG, jH, jI, jJ, jF['x'], jF['y']))
            : jM[tj('0x479', 'PYT8')](hx, jF['x'], jF['y'])
          break
        case 'Z^':
          ;(jL['b'] || jK['a']) &&
            ((jG = jL['b'] ? jL['b']['x'] : jL['x']),
            (jH = jL['b'] ? jL['b']['y'] : jL['y']),
            (jI = jK['a'] ? jK['a']['x'] : jK['x']),
            (jJ = jK['a'] ? jK['a']['y'] : jK['y']),
            jM[ti(0x564)](hy, jG, jH, jI, jJ, jK['x'], jK['y'])),
            jM[ti('0x564')](hz),
            (jK = hA)
      }
      jL = jF
    }
    return jM
  }),
    (aq[kk(0xc0, 'TdJ1')][kk('0x4a0', 'b7Er')] = function (jE) {
      const tl = kk,
        tk = kl
      if (!jE) return []
      let jF,
        jG,
        jH,
        jI = hA,
        jJ = 0x0,
        jK = jE[tk('0x7f6')]
      const jL = []
      for (; jJ < jK; ) {
        switch (((jF = jE[jJ]), jF)) {
          case hw:
            ;(jG = { name: 'M^', x: jE[jJ + 0x1], y: jE[aw[tk(0xad7)](jJ, 0x2)] }), (jI = jG), (jJ += 0x3)
            break
          case hx:
            const jM = {}
            ;(jM[tl(0x4e8, 'L%$W')] = 'L^'), (jM['x'] = jE[jJ + 0x1]), (jM['y'] = jE[jJ + 0x2]), ((jG = jM), (jJ += 0x3))
            break
          case hy:
            const jN = {}
            ;(jN['x'] = jE[jJ + 0x1]), (jN['y'] = jE[jJ + 0x2])
            const jO = {}
            ;(jO[tl(0x99e, '%qqk')] = 'C^'),
              (jO['x'] = jE[jJ + 0x5]),
              (jO['y'] = jE[jJ + 0x6]),
              (jO['a'] = {}),
              (jO['a']['x'] = jE[jJ + 0x3]),
              (jO['a']['y'] = jE[jJ + 0x4]),
              ((jH['b'] = jN), (jG = jO), (jJ += 0x7))
            break
          case hz:
            const jP = {}
            ;(jP[tl('0xab8', '#yLL')] = 'Z^'),
              (hB(jH, jI) && (jH['a'] && (jI['a'] = Object[tl(0x565, 'fXk5')]({}, jH['a'])), jL[tl('0x552', 'TdJ1')]()),
              (jG = jP),
              (jJ += 0x1),
              (jI = hA))
            break
          default:
            return hC[tk('0xa9d')](tk(0x644) + jF + tk('0x628') + jJ + ']', jE), []
        }
        jL[tl(0x118, 'y#3q')](jG), (jH = jG)
      }
      return jL
    }),
    aq[kl('0xa72')][kk('0x805', 'WgvK')](kk('0x49d', 'Pa%E'), kk(0x924, 'h*]j'))
  class hD extends aq[kl('0x80f')] {
    constructor(jE, jF) {
      const tm = kk
      super(jE), jF && Object[tm('0x9fd', 'q&7n')](this, jF)
    }
  }
  ;(hD[kl(0x791)] = kl('0x798')),
    (hD[kk(0x4ca, '#yLL')] = kl(0xa55)),
    (hD[kl(0x607)] = kl(0x222)),
    (hD[kl('0xb3')] = kk('0x5d6', 'b7Er')),
    (hD[kl('0x2f7')] = kk('0xa67', '#yLL')),
    (hD[kk(0x5db, 'l$hi')] = kl(0x1f9)),
    (hD[kl(0x2e6)] = kl(0xace))
  class hE extends hD {}
  ;(hE[kk(0x74e, 'lyYv')] = kl(0x203)), (hE[kk('0x43a', 'L%$W')] = kl('0x146')), (hE[kl('0xf4')] = kk(0xd0, '9Dju'))
  class hF extends hD {}
  ;(hF[kk('0x825', 'y#3q')] = kl(0x646)), (hF[kl(0x4a7)] = kl(0x1db)), (hF[kl(0xf4)] = kl('0x29c'))
  class hG extends hD {}
  ;(hG[kl('0x8cc')] = kk('0x9f3', '^hR%')), (hG[kl('0x16d')] = kk(0x236, '5eF6'))
  class hH {
    constructor() {
      const tn = kk,
        jE = {}
      ;(jE['x'] = 0x0),
        (jE['y'] = 0x0),
        ((this['x'] = 0x0),
        (this['y'] = 0x0),
        (this[tn('0x970', 'WgvK')] = 0x1),
        (this[tn('0x121', '5alY')] = 0x1),
        (this[tn(0x9c0, '1!h@')] = 0x0),
        (this[tn('0x729', '%SI*')] = jE))
    }
    get [kk('0x86d', '5eF6')]() {
      return !(!this['x'] && !this['y'])
    }
    get [kl('0x65e')]() {
      const tp = kk,
        to = kl
      return !(aw[to('0x8b8')](0x1, this[tp('0x301', 'z3lP')]) && 0x1 === this[to(0x332)])
    }
    get [kl(0x755)]() {
      const tq = kl
      return !!this[tq('0x617')]
    }
    get [kk(0x28e, 'oqmg')]() {
      const ts = kk,
        tr = kl
      return !!(this[tr('0x4d0')] || this[ts('0x3e7', '%SI*')] || this[tr('0x755')])
    }
    [kk(0x84e, 'IRAu')](jE) {
      const tu = kl,
        tt = kk
      ;(this['x'] += jE['x']),
        (this['y'] += jE['y']),
        (this[tt('0x57a', 'YtNy')] *= jE[tt('0xacc', 'Mi8H')]),
        (this[tu(0x332)] *= jE[tt(0x868, 'DaC*')]),
        (this[tt(0xd5, '%qqk')] += jE[tu('0x617')])
    }
  }
  class hI {
    constructor(jE) {
      const tw = kk,
        tv = kl
      if (aw[tv('0x2a2')] === tv('0x915')) {
        if (!this[tv(0x439)](aQ)) {
          const jG = [...this[tw('0x3e6', 'Pa%E')], aI]
          this[tw('0x83c', 'q&7n')] = jG
        }
      } else
        (this[tv('0x884')] = new hH()),
          (this[tw('0xa22', '%SI*')] = jE),
          (function (jG) {
            const tC = tv,
              tx = tw
            jG[tx('0x73f', '#yLL')][tx('0x38e', '#yLL')](hD[tx(0x27c, 'ckbf')], () =>
              (function (jH) {
                const tz = tx,
                  ty = c
                jH[ty('0x33c')][tz('0x528', 'TdJ1')](hG[tz('0x4ab', 'DG48')])
                const { target: jI, data: jJ } = jH
                jJ[tz(0x31c, 'rp&E')] &&
                  ((hJ = aq[ty(0x2d0)][ty(0x167)](tz('0xe1', 'TdJ1'))),
                  jI[tz(0xa52, 'lyYv')](hF[ty('0x6b8')]),
                  jH[ty('0x441')] && jH[ty('0x441')][tz(0x576, 'KlaA')](jJ),
                  jI[ty(0x1d0)](aq[ty(0x861)][ty('0xf4')], () =>
                    (function (jK) {
                      const tB = tz,
                        tA = ty,
                        { target: jL, data: jM } = jK
                      jL[tA('0x719')](hF[tB('0x77f', 'b7Er')], jM),
                        jL[tA('0x719')](hF[tA(0xf4)], jM),
                        aq[tB(0x35b, 'IRAu')][tA('0x802')](hJ),
                        (jK[tA('0x884')] = new hH())
                    })(jH)
                  ))
              })(jG)
            ),
              jG[tx('0x169', '5eF6')][tC('0xcd')](hG[tC('0x16d')], jH => (jG[tx('0x9c6', 'L%$W')] = jH))
          })(this)
    }
  }
  let hJ
  const hK = (function (jE = 0x1) {
      return jE ? String : jE
    })(),
    hL = (function (jE = 0x1) {
      const tD = kk
      return jE ? [tD('0x525', 'rp&E')] : jE
    })()
  function hM(jE) {
    return (function (jF) {
      const { p: jG } = hK,
        jH = hL[0x0],
        jI = hL[0x1]
      if (jG) return jG(jH, jF) || jG(jI, jF)
    })(jE)
  }
  let hN = 0x3e8
  class hO {
    constructor(jE, jF) {
      const tE = kk
      ;(this[tE(0x9cb, 'lyYv')] = !0x0),
        jF && (hN = jF[tE('0x9b5', 'Leeu')]),
        (this[tE('0x127', 'Nuoe')] = jE),
        (function (jG) {
          const tG = c,
            tF = tE,
            jH = {}
          jH[tF('0xa7c', '5eF6')] = function (jJ, jK) {
            return jJ > jK
          }
          const jI = jH
          jG[tF(0x6e7, '1!h@')][tF('0x683', 'h*]j')](hD[tG(0xb3)], () => hW(jG)),
            jG[tG(0x33c)][tG(0xcd)](hD[tF('0x532', 'fXk5')], () =>
              (function (jJ) {
                const tH = tF,
                  jK = hP(jJ[tH('0x57e', 'S1^T')])
                jI[tH(0x6bb, 'Mi8H')](jK, 0x1) &&
                  (function (jL, jM) {
                    const tJ = c,
                      tI = tH,
                      jN = {}
                    jN[tI('0x8db', 'ory)')] = function (jT, jU) {
                      return jT > jU
                    }
                    const jO = jN
                    let { leafer: jP } = jL[tJ(0x33c)]
                    const { cursorPoint: jQ } = jP,
                      jR = hQ(jL[tI('0x250', 'Q1[s')]),
                      jS = (function (jT, jU, jV) {
                        const tL = tI,
                          tK = tJ
                        let jW,
                          jX,
                          { x: jY, y: jZ, width: k0, height: k1 } = jT,
                          k2 = []
                        const k3 = jY + k0,
                          k4 = jZ + k1
                        if (jU < 0xc) {
                          if (k1 > k0) {
                            for (jW = Math[tK(0x59a)](k1 / jU); jZ < k4; )
                              k2[tK(0x564)]([new aq[tK('0x40d')](jY, jZ, k0, jW)]), (jZ += jW)
                          } else {
                            for (jW = Math[tL('0x358', 'Pa%E')](k0 / jU); jY < k3; )
                              k2[tK(0x564)]([new aq[tL('0x231', 'Mi8H')](jY, jZ, jW, k1)]), (jY += jW)
                          }
                        } else
                          for (jW = Math[tL(0x9a6, 'ory)')](Math[tL('0x9c3', 'L%$W')]((k0 * k1) / jU)); jZ < k4; ) {
                            for (jX = [], jY = jT['x']; jY < k3; )
                              jX[tL(0x710, 'fXk5')](new aq[tK('0x40d')](jY, jZ, jW, jW)), (jY += jW)
                            k2[tK('0x564')](jX), (jZ += jW)
                          }
                        let k5 = 0x0,
                          k6 = 0x0
                        jV &&
                          k2[tL(0x945, 'YtNy')]((k8, k9) => {
                            const tM = tK
                            k8[tM(0x78a)]((kb, kc) => {
                              const tN = tM
                              kb[tN(0x8ca)](jV) && ((k5 = kc), (k6 = k9))
                            })
                          })
                        const k7 = []
                        if (k5 || k6) {
                          const k8 = kc => {
                            const tP = tK,
                              tO = tL
                            let kd = k5,
                              kf = k5 + 0x1
                            for (let kg = 0x0, kh = kc[tO('0x691', 'LV#p')]; kg < kh; kg++)
                              jO[tP('0x14c')](kd, -0x1) && k7[tP('0x564')](kc[kd]),
                                kf < kh && k7[tO('0x3ce', '^hR%')](kc[kf]),
                                kd--,
                                kf++
                          }
                          let k9 = k6,
                            kb = k6 + 0x1
                          for (let kc = 0x0, kd = k2[tK('0x7f6')]; kc < kd; kc++)
                            k9 > -0x1 && k8(k2[k9]), kb < kd && k8(k2[kb]), k9--, kb++
                        } else
                          k2[tK('0x78a')](kf => {
                            const tQ = tK
                            kf[tQ('0x78a')](kg => {
                              const tR = tQ
                              k7[tR('0x564')](kg)
                            })
                          })
                        return k7
                      })(jR, jL[tJ(0x76a)] ? jM : 0x1, jQ)
                    ;(jL[tJ(0x858)] = Date[tI('0x973', 'jbuU')]()), jP[hR](() => hV(jL, jS, jR, jL[tJ(0x858)]))
                  })(jJ, jK)
              })(jG)
            )
        })(this)
    }
  }
  function hP(jE) {
    const tT = kl,
      tS = kk,
      { zoomLayer: jF } = jE,
      jG = hQ(jE)
    if (hM() && jG[tS(0x438, 'Pa%E')] && jG[tS('0x322', 'd]K1')]) {
      const { width: jH, height: jI } = jF[tT(0x5ef)]
      return Math[tT('0x6d1')](((jE[tT('0x1b4')][tT(0x760)] / hN) * (jG[tS(0x12d, 'oqmg')] * jG[tT(0x1ae)])) / (jH * jI))
    }
    return 0x0
  }
  function hQ(jE) {
    const tV = kk,
      tU = kl
    return new aq[tU('0x40d')](jE[tU('0x289')][tU(0x5ef)])
      [tV('0x77c', '#yLL')]()
      [tV('0x509', 'h*]j')](jE[tV(0x72d, 'Nuoe')][tU(0x221)][tU(0x1e9)])
  }
  const hR = kl('0x4f8'),
    hS = kk('0x8ae', 'Pa%E'),
    hT = kl(0x571),
    hU = kl('0x584')
  function hV(jE, jF, jG, jH) {
    const tW = kk
    let { leafer: jI } = jE[tW(0x27f, 'q&7n')]
    const { canvas: jJ, renderer: jK } = jI
    jI[hR](() => {
      const tY = c,
        tX = tW
      jE[tX('0x9ca', 'Q1[s')] === jH &&
        (jF[tX('0x210', '^hR%')]
          ? (jK[hS](() => jK[hT](jF[tX('0x7f0', '%SI*')]())), hV(jE, jF, jG, jH))
          : (jK[hS](() => jJ[hU](jJ, jG, null, tY('0x6fc'))), hW(jE)))
    })
  }
  function hW(jE) {
    const tZ = kk
    jE[tZ('0x12b', 'lyYv')] && (jE[tZ(0x8d2, '1!h@')] = null)
  }
  const hX = new aq[kl('0x7d4')](),
    hY = (function (jE = 0x1) {
      return jE ? Date : jE
    })(),
    hZ = (function (jE = 0x1) {
      const u0 = kl
      return jE ? [u0(0xde)] : jE
    })()
  function i0(jE) {
    return (function (jF) {
      const { q: jG } = hY,
        jH = hZ[0x0],
        jI = hZ[0x1]
      if (jG) return jG(jH, jF) || jG(jI, jF)
    })(jE)
  }
  class i1 {
    constructor(jE) {
      const u2 = kk,
        u1 = kl
      ;(this[u1('0x591')] = !0x1),
        (this[u1('0x378')] = 0x0),
        (this[u2('0x5b9', 'l$hi')] = jE),
        (function (jF) {
          const u4 = u1,
            u3 = u2,
            { target: jG } = jF
          jG[u3('0x768', 'rE!x')](hF[u4(0x4a7)], jH =>
            (function (jI, jJ) {
              const u6 = u3,
                u5 = u4
              jI[u5(0x8fa)] || (jI[u5(0x8fa)] = jI[u6('0x1f3', ')@c%')][u5(0x1e9)][u5(0x79f)]()),
                jJ[u5('0x65e')] &&
                  jI[u5('0x8fa')][u6('0x48b', 'WgvK')](jJ[u6('0x53f', '5tUd')], jJ[u6('0xc9', 'Nuoe')], jJ[u5(0x332)]),
                jI[u6(0x6d0, 'rE!x')][u6('0x133', '$r)6')](jJ['x'], jJ['y'])
            })(jF, jH)
          ),
            jG[u3(0x2cb, 'F0QA')](hE[u4(0x6b8)], () => {
              const u8 = u4,
                u7 = u3
              return (
                (jH = jF[u7(0x139, 'Mi8H')]),
                (jI = jF[u8(0x33c)][u8(0x1b4)][u8('0x221')]),
                jH[u8('0xc3')](),
                void jH[u8(0x584)](jI)
              )
              var jH, jI
            }),
            jG[u4('0xcd')](hD[u3(0x99c, 'z3lP')], () =>
              (function (jH) {
                const ua = u4,
                  u9 = u3
                jH[u9('0x2a9', 'TdJ1')] ||
                  (jH[ua('0x33c')][ua('0x1b4')][u9('0x9dc', 'WgvK')][ua(0xc3)](),
                  (jH[u9(0x1c9, '#yLL')] = jH[ua('0x33c')][u9(0x67b, '#yLL')][ua(0x221)][u9(0xbb, 'b7Er')]()),
                  jH[u9('0x38a', ']RE0')])
              })(jF)
            ),
            jG[u3('0x742', '6N7B')](hD[u4(0x99a)], () =>
              (function (jH) {
                const uc = u3,
                  ub = u4
                jH[ub('0x8cf')] && (jH[uc('0x1c9', '#yLL')][uc('0x312', '1*m7')](), (jH[ub(0x8cf)] = null))
              })(jF)
            )
        })(this),
        (function (jF) {
          const ue = u1,
            ud = u2,
            { target: jG } = jF
          ;(jF[ud(0x809, 'IRAu')] = jG[ud(0x2b2, ']UNN')][ud('0x4c0', 'fXk5')](jG)),
            (jG[ue(0x6ba)] = jF[ud('0x51f', 'S1^T')][ue(0x995)](jF))
        })(this)
    }
    [kl(0x6ba)](jE, jF) {
      !(function (jG, jH, jI) {
        const ug = c,
          uf = b
        let jJ
        if (jG[uf(0x523, 'PYT8')] && jG[uf('0x49f', 'lyYv')]) {
          const jK = hP(jG[ug(0x33c)])
          if ((i0() && jK && (jJ = 0x1), !(jG[ug(0x591)] && !jG[uf('0x610', '1!h@')] && jK > 0x1))) {
            if (jK < 0x2 || !jJ) jG[uf('0x63b', '5eF6')](jH, jI)
            else {
              const { overview: jL, photoBounds: jM, photo: jN } = jG,
                jO = {}
              ;(jO[uf('0x308', 'F0QA')] = jM),
                ((jI = Object[ug('0xcc')](Object[ug('0xcc')]({}, jI), jO)),
                aw[uf(0x6aa, 'h*]j')](jM[ug(0xa80)], jN[uf('0x722', 'DG48')])
                  ? jL && jL[uf(0x29b, 'S1^T')]()
                    ? jL[ug(0x6ba)](jH)
                    : jG[ug(0x5e7)](jH, jI)
                  : aw[uf(0xa7f, 'PYT8')](jM[uf('0x4dd', '#yLL')], jN[uf('0x2ff', 'b7Er')]) &&
                    (jL && jL[ug(0x7fe)](0x3 * jL[uf('0x32c', 'L%$W')]['a']) ? jL[ug('0x6ba')](jH) : jG[ug(0x5e7)](jH, jI)),
                (function (jP, jQ, jR) {
                  const ui = uf,
                    uh = ug
                  jP[uh('0x743')] = 0x1
                  const { width: jS, height: jT } = jQ
                  hX[uh('0x136')](jR[uh('0xa80')] / jS, 0x0, 0x0, jR[uh('0x1ae')] / jT, jR['x'], jR['y']),
                    hX[uh('0x480')](jP[ui('0xa0', 'DG48')]),
                    jP[uh(0x86c)](hX['a'], hX['b'], hX['c'], hX['d'], hX['e'], hX['f']),
                    jP[ui(0x757, 'KlaA')](0x0, 0x0, jS, jT),
                    jP[uh(0xea)](jQ[ui(0x1f8, 'CiU*')], 0x0, 0x0, jS, jT)
                })(jH, jN, jM))
            }
          }
          ;(jG[uf(0x21d, 'L%$W')] = null), jG[uf(0x613, 'LV#p')]++
        } else jG[uf('0x135', '%qqk')](jH, jI)
      })(this, jE, jF)
    }
  }
  const i2 = aq[kl(0x3ba)][kl('0x370')](kk(0x5f6, 'F0QA'))
  class i3 {
    constructor(jE) {
      const uj = kk
      ;(this[uj('0x19b', 'y#3q')] = jE),
        (function (jF) {
          const ul = c,
            uk = uj,
            { target: jG } = jF[uk(0x10d, 'rE!x')]
          jG[ul(0xcd)](aq[ul(0x861)][uk('0xec', 'Pa%E')], () =>
            (function (jH) {
              const un = ul,
                um = uk,
                jI = jH[um('0x616', 'y#3q')],
                { target: jJ, data: jK } = jH[um('0x19b', 'y#3q')]
              jK[un('0x41d')] && (jH[un('0x41d')] = !0x0),
                ((jJ[un('0x1b4')][un(0xf7)] = !0x0),
                clearTimeout(jH[un('0x21f')]),
                jH[um('0x28e', 'oqmg')] &&
                  !jI &&
                  (jJ[un(0x719)](hD[um('0x428', '5alY')]),
                  jJ[un('0x719')](hD[un(0x791)]),
                  i2[um('0x2e9', '^hR%')](hD[un('0x791')], un('0x8c9')))),
                jH[um(0x10e, 'd]K1')] &&
                  (jJ[un('0x821')](new hD(hD[um('0x5eb', ']RE0')], jK)),
                  jJ[un('0x821')](new hD(hD[un(0x676)], jK)),
                  i2[um(0x3fe, '$r)6')](hD[un(0x676)]),
                  (jH[um('0x6d5', '5eF6')] = !0x0))
            })(jF)
          ),
            jG[ul(0xcd)](aq[uk(0x46a, 'd]K1')][uk('0x46c', '^hR%')], () =>
              (function (jH) {
                const up = ul,
                  uo = uk
                jH[uo('0x7a7', 'q&7n')] && jH[up(0x418)][up(0x33c)][up(0x719)](hE[up(0x6b8)])
              })(jF)
            ),
            jG[uk('0x55a', '%qqk')](aq[ul('0x237')][uk('0x126', 'L%$W')], () =>
              (function (jH) {
                const ur = ul,
                  uq = uk
                if (uq('0xa7d', '5alY') !== ur('0xa16')) {
                  if (jH[uq('0x64c', 'ory)')]) {
                    const { target: jI } = jH[ur(0x418)]
                    jI[ur('0x719')](hE[ur('0x3b7')]),
                      jI[ur('0x719')](hE[ur(0xf4)]),
                      clearTimeout(jH[ur('0x21f')]),
                      (jH[uq(0x218, 'S1^T')] = setTimeout(() => {
                        const ut = uq,
                          us = ur
                        jH[us(0x6cc)] ||
                          ((jH[ut(0x37e, '1*m7')] = !0x1),
                          (jI[us('0x1b4')][ut('0x102', 'l$hi')] = !0x1),
                          jI[us('0x719')](hD[us(0x99a)]),
                          jI[ut(0x3bb, 'KlaA')](hD[ut('0xa50', '$r)6')]),
                          i2[ut('0x252', 'PYT8')](hD[ut('0xbc', 'ckbf')], ut(0x238, 'KlaA')))
                      }, 0x96)),
                      (jH[uq(0x1c6, 'lyYv')] = !0x1)
                  }
                } else {
                  const { app: jK } = this
                  return jK && jK[ur(0x75d)][ur(0x88a)]
                }
              })(jF)
            )
        })(this)
    }
  }
  const i4 = (function (jE = 0x1) {
      return jE ? Number : jE
    })(),
    i5 = (function (jE = 0x1) {
      const uu = kl
      return jE ? [uu(0xde)] : jE
    })()
  function i6(jE) {
    return (function (jF) {
      const { d: jG } = i4,
        jH = i5[0x0],
        jI = i5[0x1]
      if (jG) return jG(jH, jF) || jG(jI, jF)
    })(jE)
  }
  class i7 {
    constructor(jE) {
      const uw = kl,
        uv = kk
      ;(this[uv('0x6b9', 'Nuoe')] = new hH()),
        (this[uw('0x33c')] = jE),
        (function (jF) {
          const uy = uv,
            ux = uw,
            { target: jG } = jF
          jG[ux('0xcd')](jG[uy('0x264', ')@c%')] ? aq[ux(0x506)][ux('0x83d')] : aq[ux('0x506')][ux('0x676')], jH =>
            (function (jI, jJ) {
              const uA = ux,
                uz = uy
              if (i9[jI[uz('0x80a', 'DaC*')]]) {
                const { attrName: jK, newValue: jL, oldValue: jM } = jI
                switch (jK) {
                  case 'x':
                  case 'y':
                  case uA('0x617'):
                    jJ[uz('0x604', '%SI*')][jK] += (jL || 0x0) - (jM || 0x0)
                    break
                  case uz('0xacc', 'Mi8H'):
                  case uA(0x332):
                    jJ[uz(0x604, '%SI*')][jK] *= (jL || 0x1) / (jM || 0x1)
                }
                if (!i6()) return
                jJ[uA('0x7bb')] = !0x0
              }
            })(jH, jF)
          ),
            jG[ux(0xcd)](hG[ux(0x8cc)], () =>
              (function (jH) {
                const uC = uy,
                  uB = ux
                if (jH[uB('0x7bb')]) {
                  const { target: jI, data: jJ } = jH,
                    { x: jK, y: jL } = jI[uC('0x7d8', 'Leeu')]['__']
                  ;(jJ[uB(0x9ed)] = { x: jK - jJ['x'], y: jL - jJ['y'] }),
                    jI[uB(0x719)](hG[uB('0x16d')], jJ),
                    (jH[uB('0x884')] = new hH()),
                    (jH[uC('0xa8c', '^hR%')] = !0x1)
                }
              })(jF)
            ),
            (jF[ux('0x68c')] = new i3(jF))
        })(this)
    }
  }
  const i8 = {}
  ;(i8['x'] = 0x1), (i8['y'] = 0x1), (i8[kl(0x415)] = 0x1), (i8[kk('0x18a', 'Nuoe')] = 0x1), (i8[kk('0x3af', 'z3lP')] = 0x1)
  const i9 = i8,
    ib = (function (jE = 0x1) {
      return jE ? Date : jE
    })(),
    ic = (function (jE = 0x1) {
      const uD = kk
      return jE ? [uD(0x4b3, 'KlaA')] : jE
    })()
  function id(jE) {
    const jF = {
      wTNIO: function (jG, jH, jI) {
        const uE = b
        return aw[uE('0x288', ']RE0')](jG, jH, jI)
      }
    }
    return (function (jG) {
      const uF = b,
        { q: jH } = ib,
        jI = ic[0x0],
        jJ = ic[0x1]
      if (jH) return jH(jI, jG) || jF[uF('0x4d7', 'rp&E')](jH, jJ, jG)
    })(jE)
  }
  function ig(jE, jF, jG, jH, jI, jJ) {
    const uH = kl,
      uG = kk
    id() &&
      (aq[uG(0x2c1, ']UNN')][uH('0xa12')](jE), aq[uG(0x7b4, 'fXk5')](jH) ? ih(jE, jF, jG) : ih(jE, jF, jG, jH, jI, jJ), iq(jE))
  }
  function ih(jE, jF, jG, jH, jI, jJ) {
    const uJ = kk,
      uI = kl,
      jK = jE[uI(0x971)],
      { localStrokeBounds: jL, localRenderBounds: jM } = jE[uI(0x2fc)],
      jN = [jE[uI('0x5ef')], jK]
    jK !== jL && jN[uI('0x564')](jL),
      jL !== jM && jN[uJ('0x775', '5eF6')](jM),
      jN[uI(0x78a)](jP => {
        const uL = uJ,
          uK = uI
        aq[uK(0x5a1)](jH) || aq[uL('0x186', '5eF6')][uL('0x1ed', 'oqmg')](jP, jJ, jH, jI),
          aq[uK('0x5d2')][uK('0x489')](jP, jF, jG)
      })
    let { parent: jO } = jE
    for (; jO; ) jO[uJ('0x18e', 'l$hi')][uI(0x2a0)](), aq[uJ(0x9dd, '#yLL')][uJ('0x295', 'l$hi')](jO), (jO = jO[uJ(0xd7, 'PYT8')])
  }
  const ij = kl('0x8ad'),
    ik = aw[kk('0x29a', 'DaC*')],
    il = kl(0xe3),
    im = kk('0x157', 'ckbf'),
    ip = aw[kl('0x348')]
  function iq(jE) {
    const jF = jE[im]
    for (let jG = 0x0, jH = jF[ip]; jG < jH; jG++) (jE = jF[jG])[ij](), jE[ik](), jE[il] && iq(jE)
  }
  const iu = (function (jE = 0x1) {
      return jE ? String : jE
    })(),
    iv = (function (jE = 0x1) {
      const uM = kk
      return jE ? [uM('0x5c7', 'b7Er')] : jE
    })()
  function iw(jE) {
    return (function (jF) {
      const { p: jG } = iu,
        jH = iv[0x0],
        jI = iv[0x1]
      if (jG) return jG(jH, jF) || jG(jI, jF)
    })(jE)
  }
  class ix {
    constructor(jE) {
      const uN = kl
      ;(this[uN(0x33c)] = jE),
        (function (jF) {
          if (!iw()) return
          jF[iy][iz][iA] = !0x0
        })(jE)
    }
    [kk(0x60b, '%SI*')](jE) {
      const uP = kl,
        uO = kk,
        { zoomLayer: jF } = this[uO(0x546, '5alY')]
      jE[uO('0x988', 'LV#p')] && !jE[uO('0x956', 'q&7n')]
        ? ig(jF, jE['x'], jE['y'])
        : ig(jF, jE['x'], jE['y'], jE[uO('0x3dd', 'lyYv')], jE[uP(0x332)], jE[uO('0x307', '%qqk')])
    }
  }
  const iy = kk('0x46b', ')@c%'),
    iz = kk(0x367, 'LV#p'),
    iA = kl(0x6fe),
    iB = (function (jE = 0x1) {
      return jE ? Array : jE
    })(),
    iC = (function (jE = 0x1) {
      const uQ = kl
      return jE ? [uQ('0xde')] : jE
    })()
  function iD(jE) {
    return (function (jF) {
      const { g: jG } = iB,
        jH = iC[0x0],
        jI = iC[0x1]
      if (jG) return jG(jH, jF) || jG(jI, jF)
    })(jE)
  }
  const iE = kl('0x175'),
    iF = kl('0x7f4')
  let iG, iH
  function iI(jE, jF, jG, jH, jI) {
    return b9(this, void 0x0, void 0x0, function* () {
      const uS = b,
        uR = c
      if (jE[uR(0x1e8)] || !aq[uR(0x201)][uS(0x944, ')@c%')] || (jI && !aq[uR('0x201')][uR(0x213)])) {
        let jK,
          jL = jG ? aq[uR('0x201')][uS('0x28b', '#yLL')][uR('0xadb')](jF, jG, jH, void 0x0, void 0x0, jI, !0x0) : jF
        return (
          aq[uS(0x4a8, 'h*]j')][uR(0x642)] && ((jK = yield createImageBitmap(jL)), (jL = null)),
          yield ((jJ = (jG * jH) / 0x20000), new Promise(jM => setTimeout(jM, jJ))),
          jK || jL
        )
      }
      {
        if (!jG) return createImageBitmap(jF)
        const jM = {}
        ;(jM[uS(0x660, '%qqk')] = jG), (jM[uR('0x207')] = jH)
        const jN = jM
        return jI
          ? yield createImageBitmap(jF, jI['x'], jI['y'], jI[uS(0x2bc, 'lyYv')], jI[uR(0x1ae)], jN)
          : createImageBitmap(jF, jN)
      }
      var jJ
    })
  }
  aq[kk('0x1d2', '$r)6')][kk(0x150, 'L%$W')](kk(0x77a, 'd]K1'))
  const iJ = {}
  function iK(jE, jF, jG, jH, jI, jJ, jK, jL, jM, jN) {
    const uW = kk,
      uT = kl,
      { list: jO } = jF
    let jP = jO[jE]
    const jQ =
      (jP && jP[uT(0x1e9)]) ||
      (function (jR, jS, jT) {
        const uV = b,
          uU = uT,
          jU = jR % jS[uU('0x986')],
          jV = Math[uU('0x526')](jR / jS[uV(0x258, '6N7B')]),
          { size: jW } = jS,
          jX = new aq[uV(0x8a0, 'ckbf')]()
        jX[uU('0x136')](jU * jW, jV * jW, jW, jW), (jX[uU('0xa80')] = jX[uV(0x606, 'KlaA')] += 0x2)
        const { maxX: jY, maxY: jZ } = jX
        return (
          jT[uU('0xa80')] < jY && (jX[uV('0x4f7', 'd]K1')] -= jY - jT[uV('0x4f7', 'd]K1')]),
          jT[uU('0x1ae')] < jZ && (jX[uV('0x1b5', 'Mi8H')] -= jZ - jT[uV('0x24c', 'Q1[s')]),
          jX
        )
      })(jE, jF, jI)
    if (
      ((iJ[uW('0x152', '$r)6')] = aq[uT('0x5d2')][uW('0x7b8', 'ory)')](jQ, jH)), aq[uW(0x281, 'YtNy')][uW(0x9da, 'WgvK')](iJ, jN))
    )
      jP && iM(jE, jO)
    else {
      const { x: jR, y: jS, width: jT, height: jU } = jQ,
        jV = {}
      jV[uT(0x1e9)] = jQ
      if ((jP || (jP = jV), jP[uT('0x70f')])) jM[uW('0x541', 'rE!x')](jP[uT(0x70f)], jR, jS, jT, jU)
      else {
        const jW = {},
          jX = {}
        if ((aq[uT(0x925)][uW('0x9a2', 'WgvK')](jW, jG[uT(0x657)]), jJ)) {
          aq[uW('0x7dc', 'ckbf')][uW('0x3bc', 'y#3q')](jX, jJ[uW('0x99d', 'KlaA')])
          const jY = jW[uW('0xaa4', '#yLL')] / jX[uT(0x415)],
            jZ = jW[uT('0x332')] / jX[uW(0x808, 'CiU*')]
          jM[uT('0xea')](jJ[uT(0x70f)], jR / jY, jS / jZ, aw[uT(0x9d2)](jT, jY), jU / jZ, jR, jS, jT, jU)
        }
        jP[uW(0x6dc, 'h*]j')] ||
          ((jO[jE] = jP),
          (jP[uW(0x384, 'WgvK')] = aq[uT(0x78c)][uT('0x175')][uT(0x3e8)](
            () =>
              b9(this, void 0x0, void 0x0, function* () {
                const uY = uT,
                  uX = uW
                if (jP[uX(0xa38, 'd]K1')] && jP[uX('0x31b', '^hR%')][uX('0x300', 'Nuoe')]) return
                const k0 = {}
                ;(k0['x'] = jR / jW[uY(0x415)]),
                  (k0['y'] = jS / jW[uX('0xa8', 'ory)')]),
                  (k0[uX('0xac', '1!h@')] = jT / jW[uX(0x7bc, 'CiU*')]),
                  (k0[uX('0x831', '%SI*')] = jU / jW[uY('0x332')])
                const k1 = k0
                ;(jP[uY(0x70f)] = yield iI(jI, jI[uX(0x95d, 'S1^T')], jT, jU, k1)),
                  delete jP[uX('0x268', 'rE!x')],
                  jL[uY('0x380')](uX('0x8f1', 'Nuoe'))
              }),
            0x0,
            () => {
              const v0 = uT,
                uZ = uW,
                k0 = jK[uZ('0x76d', '9Dju')] === jG[v0('0x3d7')]
              return k0 || iM(jE, jO), k0
            }
          )))
      }
    }
  }
  function iL(jE) {
    const v1 = kl,
      { total: jF, list: jG } = jE[v1('0x212')]
    for (let jH = 0x0; jH < jF; jH++) jG[jH] && iM(jH, jG)
  }
  function iM(jE, jF) {
    const v3 = kl,
      v2 = kk,
      jG = jF[jE]
    if (jG) {
      let jH = jG[v2(0x1cc, '%SI*')]
      jH && (jH[v2(0x82a, 'y#3q')] && jH[v3('0xaae')](), (jG[v3('0x70f')] = jH = null))
      const { task: jI } = jG
      jI && jI[v3('0x83e')](), delete jF[jE]
    }
  }
  const iN = aq[kk(0xa94, '1!h@')][kl(0x7e1)]
  function iO(jE, jF, jG, jH) {
    const v5 = kl,
      v4 = kk
    let { url: jI } = jF
    return jI[v4(0x9be, '%SI*')](v5('0x677'), jE[v5(0x932)]())
      [v4(0x294, 'DG48')](v5('0x67c'), Math[v4(0x6da, 'd]K1')](jG)[v4(0x897, 'Nuoe')]())
      [v4(0x249, '5alY')](v5(0x4be), Math[v5('0x6d1')](jH)[v5('0x932')]())
  }
  function iP(jE, jF) {
    const v7 = kl,
      v6 = kk
    let jG = Math[v6('0x388', '3t[N')](Math[v7(0x412)](0x1 / jE))
    return jG && (jG = -jG), jF && jG < jF && (jG = jF), jG
  }
  function iQ(jE) {
    const v9 = kl,
      v8 = kk
    return v8('0x62c', 'b7Er') !== aw[v8(0x35c, 'Nuoe')] ? Math[v9('0x8ce')](0x2, jE) : !!this[v9(0x15d)][v8('0xa2d', 'Q1[s')]
  }
  function iR(jE, jF = 0x10) {
    const vb = kl,
      va = kk
    let jG = jF / jE[va(0x134, '6N7B')],
      jH = jF / jE[vb(0x1ae)]
    return iP(Math[vb('0x363')](jG, jH))
  }
  function iS(jE, jF, jG) {
    const vd = kk,
      vc = kl
    let jH = jE / jG[vc(0xa80)],
      jI = jF / jG[vd(0x84c, '1!h@')],
      jJ = iP(Math[vc('0x363')](jH, jI), jG[vc(0x31e)] || (jG[vd(0xa5e, 'l5Lg')] = aw[vd('0x908', 'WgvK')](iR, jG)))
    jJ > 0x0 && !jG[vc(0x1e8)] && (jJ = 0x0)
    const jK = iQ(jJ)
    return { level: jJ, scale: jK, addScaleX: aw[vc(0x522)](jK, jH), addScaleY: jK / jI }
  }
  function iT(jE, jF) {
    const { levels: jG } = jF,
      jH = jG && jG[jE]
    if (jH) return jH
  }
  function iU(jE, jF) {
    const vf = kl,
      ve = kk,
      { level: jG } = jE
    if (jF[ve(0x4a3, 'Pa%E')]) {
      const { levelsRange: jH } = jF
      ;(jH[ve(0x732, 'ckbf')] = Math[ve(0x7b3, 'q&7n')](jG, jH[ve(0x639, 'ory)')])),
        (jH[vf(0x363)] = Math[vf(0x363)](jG, jH[vf('0x363')]))
    } else (jF[ve('0x904', 'TdJ1')] = []), (jF[ve('0xa74', 'ory)')] = { min: jG, max: jG })
    jF[vf('0x7ac')][jG] = jE
  }
  function iV(jE) {
    const vh = kl,
      vg = kk
    jE[vg(0x4b5, 'Pa%E')] ? jE[vg(0x42a, 'PYT8')]++ : (jE[vh(0xc6)] = 0x1)
  }
  function iW(jE, jF) {
    const vi = kl,
      { levels: jG } = jF,
      jH = jG && jG[jE]
    jH && jH[vi(0xc6)]--
  }
  function iX(jE, jF) {
    const vk = kl,
      vj = kk,
      { levels: jG } = jF,
      jH = jG && jG[jE]
    if (jH) {
      jH[vj(0x465, '^hR%')] && iL(jH)
      let jI = jH[vj('0x184', 'TdJ1')]
      jI && (jI[vj(0x54f, '9Dju')] && jI[vk('0xaae')](), (jH[vk('0x70f')] = jI = null)), delete jG[jE]
    }
  }
  function iY(jE, jF) {
    const vm = kk,
      vl = kl,
      { levels: jG, levelsRange: jH } = jF
    if (jG) {
      let jI
      for (let jJ = jE; jJ >= jH[vl(0x64e)]; jJ--) if (((jI = jG[jJ]), jI && jI[vm(0x88b, 'l$hi')])) return jI
    }
  }
  ;(aq[kk(0x3f4, 'S1^T')][kk(0xa30, 'ckbf')] = function (jE) {
    const vo = kk,
      vn = kl
    void 0x0 !== jE[vn(0x3d7)] && iW(jE[vo('0x6dd', 'Leeu')], jE[vo('0x20c', 'KlaA')]),
      void 0x0 !== jE[vn('0x10b')] && iW(jE[vn(0x10b)], jE[vo('0x1b9', ']UNN')]),
      aq[vo('0x59b', 'oqmg')][vn('0x8d6')](jE[vn('0x80b')])
  }),
    (aq[kl('0x78c')][kk('0x8e1', 'q&7n')] = function () {
      const vq = kl,
        vp = kk,
        { map: jE } = aq[vp(0x818, 'Leeu')],
        jF = Object[vp('0x382', 'L%$W')](jE)
      for (let jG = 0x0; jG < jF[vp('0xa15', 'Leeu')]; jG++) {
        const jH = jF[jG]
        jH instanceof aq[vq(0x5b7)] && jH[vp(0x782, 'h*]j')](!0x0)
      }
    }),
    (iN[kk('0x7bd', 'rp&E')] = function () {
      return iR(this)
    }),
    (iN[kk('0x30c', ')@c%')] = function (jE) {
      const vs = kl,
        vr = kk
      if (!jE) return this[vr('0x34a', '%SI*')]
      let { width: jF, height: jG } = jE
      const { level: jH, scale: jI } = iS(jF, jG, this)
      return 0x0 === jH
        ? this[vs('0x2ed')]
        : ((this[vs('0xa26')] = { level: jH, scale: jI }),
          (jF = jI * this[vs('0xa80')]),
          (jG = jI * this[vr('0x6ca', '3t[N')]),
          iO(jH, this[vs(0x65f)][vr(0x625, 'F0QA')], jF, jG))
    }),
    (iN[kk('0x497', 'ckbf')] = function (jE) {
      const vu = kl,
        vt = kk,
        { thumb: jF } = this
      jF && ((jF[vt('0x71c', 'b7Er')] = jE), aw[vu('0x407')](iU, jF, this))
    }),
    (iN[kl(0x111)] = function () {
      const vw = kl,
        vv = kk,
        { width: jE, height: jF, thumb: jG } = this[vv(0x6c4, 'l5Lg')][vw('0x756')]
      jE && ((this[vv('0x12c', 'CiU*')] = jE), (this[vw('0x1ae')] = jF))
      const jH = iQ(jG || iR(this)),
        jI = {}
      return (jI[vw('0xa80')] = jH * jE), (jI[vw('0x1ae')] = jH * jF), jI
    }),
    (iN[kk(0x5d0, 'd]K1')] = function (jE) {
      let jF = iT(jE, this)
      return !jF && (jF = { level: jE, scale: iQ(jE) }), jF
    }),
    (iN[kk(0xb6, '3t[N')] = function (jE) {
      const vy = kk,
        vx = kl,
        jF = this,
        { levels: jG, levelsRange: jH } = jF
      if (jG) {
        let jI
        for (let jJ = jH[vx('0x363')]; jJ >= jH[vx('0x64e')]; jJ--)
          if (((jI = jG[jJ]), jI)) {
            if (jE && (jI[vx(0xc6)] || (jF[vy('0x707', 'Mi8H')] && jF[vx('0x33d')][vy('0x87d', 'PYT8')] === jJ))) continue
            iX(jJ, this)
          }
        jE || ((jF[vx('0x7ac')] = jF[vy('0x721', 'TdJ1')] = void 0x0), jF[vx(0x33d)] && (jF[vy('0x298', 'y#3q')] = void 0x0))
      }
    })
  const iZ = (function (jE = 0x1) {
      return jE ? Array : jE
    })(),
    j0 = (function (jE = 0x1) {
      const vz = kk
      return jE ? [vz(0x406, 'DG48')] : jE
    })()
  function j1(jE) {
    return (function (jF) {
      const { g: jG } = iZ,
        jH = j0[0x0],
        jI = j0[0x1]
      if (jG) return jG(jH, jF) || jG(jI, jF)
    })(jE)
  }
  const j2 = kk(0x13b, 'IRAu'),
    j3 = kk(0x684, 'YtNy'),
    j4 = kl(0x80b),
    j5 = kl(0x1e8),
    j6 = fetch
  function j7(jE, jF) {
    return b9(this, void 0x0, void 0x0, function* () {
      const vB = c,
        vA = b
      if (vA(0x3e0, 'Leeu') !== vA(0x499, 'y#3q')) return aQ + aP
      else {
        if (j1() && jF && !jF[j5] && aq[vA(0x4a8, 'h*]j')][j4][vA(0x9d8, 'PYT8')](jE)) {
          let jH = iP(Math[vB('0x44b')](aq[vA(0x2f1, 'IRAu')][j4][vA('0x1a8', '^hR%')] / (jE[vB('0xa80')] * jE[vB(0x1ae)])))
          if (jH && !iT(jH, jF)) {
            let jI = iQ(jH)
            jE[vA(0xa84, '9Dju')] * jI * jE[vB('0x1ae')] * jI > aq[vA('0x2d7', 'CiU*')][j4][vA('0x11e', 'jbuU')] &&
              ((jH -= 0x1), (jI = iQ(jH)))
            const jJ = yield iI(jF, jE, jE[vB('0xa80')] * jI, jE[vB(0x1ae)] * jI),
              jK = {}
            ;(jK[vB('0x3d7')] = jH), (jK[vB('0x657')] = jI), (jK[vB(0x70f)] = jJ), iU((jF[vA('0xa77', 'lyYv')] = jK), jF)
          }
        }
      }
    })
  }
  const j8 = (function (jE = 0x1) {
      return jE ? String : jE
    })(),
    j9 = (function (jE = 0x1) {
      const vC = kl
      return jE ? [vC('0xa36')] : jE
    })()
  function jb(jE) {
    return (function (jF) {
      const { p: jG } = j8,
        jH = j9[0x0],
        jI = j9[0x1]
      if (jG) return jG(jH, jF) || jG(jI, jF)
    })(jE)
  }
  const jc = new aq[kl('0x7d4')]()
  function jd() {
    const vD = kl
    aq[vD('0x601')][vD('0xea')] = function (jE, jF, jG, jH, jI, jJ) {
      const vF = vD,
        vE = b,
        { data: jK, image: jL } = jE
      jI[vE('0xa27', 'ory)')](),
        jI[vE('0x87b', 'KlaA')](jH),
        jE[vF(0x866)][vF(0x42c)] && (jI[vE(0x877, 'lyYv')] = jE[vE('0x17f', 'WgvK')][vF(0x42c)]),
        jK[vF('0x743')] && (jI[vE('0x8d4', 'lyYv')] *= jK[vE('0x983', 'Leeu')]),
        jK[vF(0x3d5)] && jI[vE(0x3b6, 'YtNy')](jK[vE('0x669', ')@c%')])
      const { width: jM, height: jN } = jL
      let jO =
        jL[vE(0x9a3, 'Mi8H')] ||
        !aq[vF(0x201)][vF(0x80b)][vE('0x3e1', 'KlaA')](jL) ||
        jJ[vE('0x913', '6N7B')] ||
        !jL[vE('0x94e', 'IRAu')]
      if (!jO) {
        const jP = !aq[vF('0x201')][vF(0x642)]
        if (jP && aw[vF('0x366')](jF, 0x1) && jG >= 0x1 && (aw[vF(0x128)](jM, 0x1000) || jN <= 0x1000)) jO = !0x0
        else {
          const { level: jQ, scale: jR } = iS(jM * jF, jN * jG, jL)
          let jS = iT(jQ, jL),
            jT = jS && jS[vE('0x65b', 'WgvK')]
          if (!jT) {
            const jU = jL[vF(0x33d)]
            jU && (jU[vF('0x3d7')] > jQ || jP) && ((jS = jU), (jT = !0x0))
          }
          if (jT) jI[vE('0x955', 'Leeu')](jS[vE('0x426', 'rE!x')], 0x0, 0x0, jM, jN)
          else {
            const jV = iY(0x0, jL)
            jI[vF(0x657)](0x1 / jR, 0x1 / jR),
              jS || ((jS = { level: jQ, scale: jR, slice: null }), iU(jS, jL)),
              jS[vF('0x212')] ||
                (jS[vE(0xa3, 'YtNy')] = (function (jY, jZ) {
                  const vH = vF,
                    vG = vE
                  let { width: k0, height: k1 } = jY
                  ;(k0 *= jZ), (k1 *= jZ)
                  const k2 = 0x400,
                    k3 = Math[vG('0xf9', '3t[N')](k0 / k2)
                  return { size: k2, columns: k3, total: k3 * Math[vH(0x59a)](k1 / k2), list: [] }
                })(jL, jR))
            const jW = jc[vE(0x6fa, 'oqmg')](jH[vF('0x5ef')])
            jK[vF(0x3d5)] && jW[vF(0x3df)](jK[vF('0x3d5')]), jW[vE('0x97e', 'oqmg')](0x1 / jR)
            const { slice: jX } = jS
            for (let jY = 0x0; jY < jX[vF('0x378')]; jY++) iK(jY, jX, jS, jW, jL, jV, jE, jH, jI, jJ)
          }
          jE[vE(0x368, '%qqk')] !== jS[vF('0x3d7')] &&
            (iV(jS),
            void 0x0 !== jE[vE('0x1ef', 'l$hi')] && iW(jE[vE(0x330, 'Mi8H')], jL),
            (jE[vE('0x867', 'YtNy')] = jS[vE('0x4e5', '5tUd')]))
        }
      }
      if (jb()) {
        if (jO) {
          if (jL[vE(0x7ef, '#yLL')])
            jI[vF('0xea')](jL[vF(0x882)](jK[vF(0x2e1)]), 0x0, 0x0, jM, jN), (jE[vE('0x723', 'b7Er')] = void 0x0)
          else {
            const jZ = iY(0x0, jL)
            jI[vF('0xea')](jZ[vE(0x1f6, 'y#3q')], 0x0, 0x0, jM, jN),
              jL[vF('0x987')] ||
                ((jL[vE('0x2d1', '3t[N')] = !0x0),
                aq[vE(0x7a0, 'Q1[s')][vE(0x58e, '1*m7')][vF('0x3e8')](() =>
                  b9(this, void 0x0, void 0x0, function* () {
                    const vJ = vE,
                      vI = vF
                    if (!jL[vI('0x70f')] && !0x0 === jL[vI(0x987)]) {
                      jL[vI(0x987)] = 0x1
                      const k0 = yield aq[vI('0x201')][vI(0x611)][vJ(0x49e, 'd]K1')](jL[vJ(0x69b, ']UNN')], jL[vI('0x291')], jL)
                      k0 && ((jL[vI('0x70f')] = k0), jH[vJ('0x587', '%qqk')](vJ(0x460, 'b7Er')))
                    }
                    delete jL[vI(0x987)]
                  })
                ))
          }
        }
        jI[vF(0xaab)]()
      }
    }
  }
  const jf = (function (jE = 0x1) {
      return jE ? Number : jE
    })(),
    jg = (function (jE = 0x1) {
      const vK = kk
      return jE ? [vK('0xa44', '^hR%')] : jE
    })()
  function jh(jE) {
    return (function (jF) {
      const { d: jG } = jf,
        jH = jg[0x0],
        jI = jg[0x1]
      if (jG) return jG(jH, jF) || jG(jI, jF)
    })(jE)
  }
  function jj(jE, jF, jG, jH, jI) {
    return b9(this, void 0x0, void 0x0, function* () {
      const vM = c,
        vL = b
      if (jF) return iI(jE, jF, jH, jI)
      {
        const jJ = yield aq[vL(0xab, ']RE0')][vM('0x611')][vL(0x2b3, 'YtNy')](
          jG ? iO(jG, jE[vL('0x763', ']UNN')][vM('0x756')], jH, jI) : jE[vM(0x2ed)]
        )
        return jG || (jE[vM('0x70f')] = jJ), jJ
      }
    })
  }
  const { get: jk, scale: jl, copy: jm } = aq[kk(0x66c, 'y#3q')],
    { getFloorScale: jp } = aq[kl('0x925')],
    { abs: jq } = Math,
    ju = kl(0x934),
    jv = kk(0x5c0, ')@c%'),
    jw = aw[kk('0x750', 'b7Er')],
    jx = kk(0x39f, '9Dju')
  function jy() {
    const vX = kl,
      vN = kk,
      jE = {
        bHZaZ: function (jG, jH, jI) {
          return jG(jH, jI)
        },
        VwWSx: function (jG, jH, jI, jJ, jK, jL) {
          return jG(jH, jI, jJ, jK, jL)
        },
        SQBar: function (jG) {
          return jG()
        }
      }
    let jF
    ;(aq[vN('0x344', 'z3lP')][ju] = function (jG, jH, jI, jJ, jK, jL) {
      return b9(this, void 0x0, void 0x0, function* () {
        const vP = b,
          vO = c
        let { scaleX: jM, scaleY: jN } = aq[vO(0x601)][vO('0x879')](jG, jH, jI, jJ),
          jO = jM + '-' + jN
        if (
          jG[vP('0x850', 'DaC*')] !== jO &&
          !jH[vO('0x615')] &&
          (!aq[vP(0x4fc, 'd]K1')][jv][vO(0x2ee)](jG[vO(0x80b)], jM, jN) || jG[vO(0x884)][vP('0x91b', '$r)6')])
        ) {
          if (vO('0x857') !== vP('0x94f', 'ckbf')) {
            const { image: jP, data: jQ } = jG,
              { transform: jR, gap: jS } = jQ,
              jT = aq[vO('0x601')][vP('0x85e', 'h*]j')](jG, jM, jN),
              jU = jH[vP('0xe2', 'ory)')] && jH[vO('0x1b4')][vP('0x92e', 'jbuU')][vP(0x36a, '1*m7')]
            jT && ((jM *= jT), (jN *= jT))
            const { level: jV, scale: jW, addScaleX: jX, addScaleY: jY } = iS(jP[vP(0x5f2, 'IRAu')] * jM, jP[vO(0x1ae)] * jN, jP),
              jZ = jP[vO(0xa80)] * jW,
              k0 = jP[vO('0x1ae')] * jW
            ;(jM *= jX), (jN *= jY)
            let k1 = jE[vO('0x514')](iT, jV, jP)
            const k2 = {}
            ;(k2[vP(0x1fc, '%SI*')] = jV), (k2[vP('0xb2', '5alY')] = jW), (k2[vO('0x70f')] = null)
            if (
              (k1
                ? jK &&
                  !k1[vP('0x454', 'Pa%E')] &&
                  (yield (function (k4) {
                    return b9(this, void 0x0, void 0x0, function* () {
                      return new Promise(k5 =>
                        b9(this, void 0x0, void 0x0, function* () {
                          let k6 = 0x0
                          !(function k7() {
                            const vQ = c
                            if ((k6++, k4[vQ('0x70f')] || k6 > 0x7d0)) return k5()
                            setTimeout(() => k7, 0x1)
                          })()
                        })
                      )
                    })
                  })(k1))
                : ((k1 = k2), iU(k1, jP)),
              !k1[vP(0x3f2, 'Nuoe')])
            ) {
              const k4 = (function (k6, k7) {
                  const vS = vO,
                    vR = vP,
                    { levels: k8, levelsRange: k9 } = k7
                  if (k8) {
                    let kb
                    for (let kc = k6; kc <= k9[vR(0x622, 'rE!x')]; kc++) if (((kb = k8[kc]), kb && kb[vS(0x70f)])) return kb
                  }
                })(jV, jP),
                k5 = k4 ? k4[vP(0x3f0, 'fXk5')] : jP[vP('0x42b', 'rp&E')]
              jK
                ? (k1[vO(0x70f)] = yield jE[vO('0x155')](jj, jP, k5, k1[vO('0x3d7')], jZ, k0))
                : ((k1[vO(0x70f)] = aq[vP('0x2c8', 'DaC*')][jv][vP(0x30e, '5alY')](
                    k5 || jP[vP(0x377, 'YtNy')][vO('0x70f')],
                    jZ,
                    k0
                  )),
                  k5
                    ? aq[vO('0x201')][vP('0x91e', 'z3lP')] &&
                      aq[vO('0x78c')][jw][vP('0xada', '5tUd')](() =>
                        b9(this, void 0x0, void 0x0, function* () {
                          const vT = vP
                          k1[vT(0x9d9, '5alY')] = yield iI(jP, k1[vT('0x408', 'z3lP')])
                        })
                      )
                    : aq[vO('0x78c')][jw][vP(0x9c4, '$r)6')](() =>
                        b9(this, void 0x0, void 0x0, function* () {
                          const vV = vO,
                            vU = vP
                          ;(k1[vU(0x9bb, 'F0QA')] = yield jj(jP, k5, k1[vU('0xa1b', 'Mi8H')], jZ, k0)), jH[vV(0x380)](vV('0xa80'))
                        })
                      ))
            }
            let { view: k3 } = k1
            if (k3 && (!jL || !jL[vP('0x815', 'z3lP')])) {
              let k6, k7, k8
              jS &&
                ((k7 = (jS['x'] * jM) / jq(jQ[vO(0x415)] || 0x1)), (k8 = (jS['y'] * jN) / jq(jQ[vP('0x609', '$r)6')] || 0x1))),
                (jR || 0x1 !== jM || 0x1 !== jN) &&
                  ((jM *= jp(jZ + (k7 || 0x0))),
                  (jN *= jp(k0 + (k8 || 0x0))),
                  (k6 = jE[vP('0x832', '%qqk')](jk)),
                  jR && jm(k6, jR),
                  jl(k6, 0x1 / jM, 0x1 / jN)),
                (jG[vO(0x3d7)] === jV && jG[vO(0xba)]) ||
                  ((jQ[vP('0xa2c', '#yLL')] || jQ[vO(0x2e1)] || k7 || k8) &&
                    (k3 = aq[vO(0x201)][jv][vP(0x2b8, 'WgvK')](
                      k3,
                      jZ,
                      k0,
                      k7,
                      k8,
                      void 0x0,
                      jU,
                      jQ[vP(0x695, 'oqmg')],
                      jQ[vO('0x2e1')]
                    )),
                  (jG[vP(0x299, '9Dju')] = aq[vP('0xa31', '%SI*')][vO(0x221)][ju](
                    k3,
                    jQ[vP('0x3c8', 'b7Er')] || aq[vO('0x201')][vP('0x4ef', 'fXk5')][vP('0x2f9', 'LV#p')] || vO('0x12e')
                  )),
                  jG[vP(0xa96, 'q&7n')] !== jV && (iV(k1), void 0x0 !== jG[vO(0x3d7)] && iW(jG[vO(0x3d7)], jP)),
                  void 0x0 !== jG[vP('0x4a1', 'd]K1')] &&
                    (iW(jG[vO(0x10b)], jP),
                    (function (k9) {
                      const vW = vO,
                        { levels: kb, levelsRange: kc } = k9
                      let kd
                      if (kb) {
                        for (let kf = kc[vW(0x363)]; kf >= kc[vW(0x64e)]; kf--) (kd = kb[kf]), kd && kd[vW(0x212)] && iL(kd)
                      }
                    })(jP),
                    (jG[vP('0x3cc', 'Q1[s')] = void 0x0)),
                  (jG[vO('0x3d7')] = jV)),
                aq[vO(0x201)][jv][vO(0x9d5)](jG[vO('0xba')], k6, jG),
                (jG[vP(0x82b, 'oqmg')] = jO),
                jh() && jK && jH[vP('0x926', 'ckbf')](vP(0xd1, 'S1^T'))
            }
          } else this[vP('0x49a', 'lyYv')] && (this[vO('0x243')](), (this[vP(0x234, 'LV#p')] = null))
        }
        jK && jK()
      })
    }),
      (aq[vX('0x601')][vX(0xa4)] = function (jG, jH, jI, jJ) {
        const vZ = vX,
          vY = vN
        jG[jx] && jG[jx][vY('0x21b', 'z3lP')]()
        const jK = aq[vZ(0x78c)][jw][vZ(0x3e8)](
          () =>
            b9(this, void 0x0, void 0x0, function* () {
              return new Promise(jL =>
                b9(this, void 0x0, void 0x0, function* () {
                  const w0 = c
                  try {
                    aq[w0('0x601')][ju](jG, jH, jI, jJ, jL, jK)
                  } catch (jM) {
                    jL(!0x0)
                  }
                })
              )
            }),
          0x0,
          () => (
            jh() && ((jG[jx] = null), jF || (aq[vZ('0x78c')][jw][vZ(0x65f)][vY('0x7b6', 'y#3q')] = jF = 0x1)),
            jI[vY(0x1a2, 'F0QA')][vZ(0x2fd)](jH[vZ('0x395')])
          )
        )
        jG[jx] = jK
      })
  }
  const jz = kl('0x175'),
    jA = kl(0x4d1),
    jB = kl('0x494'),
    jC = kl('0x6e2')
  class jD {
    constructor(jE) {
      const w1 = kk
      ;(this[w1('0x5b9', 'l$hi')] = jE),
        (function (jF) {
          const w3 = c,
            w2 = w1
          jF[w2('0x3cf', 'LV#p')][w3('0xcd')](
            aq[w3('0x3c6')][w3(0x829)],
            () => (aq[w3(0x78c)][jz][jB](), void aq[w2('0x759', '%qqk')][jA][jB]())
          ),
            jF[w2('0x427', 'd]K1')][w2('0x15c', 'ckbf')](
              aq[w3(0x3c6)][w3(0x607)],
              () => (aq[w3(0x78c)][jz][jC](), void aq[w2('0x8bc', 'rp&E')][jA][jC]())
            )
        })(this),
        (function () {
          const w5 = w1,
            w4 = c,
            jF = {
              ygavH: function (jH, jI) {
                return jH(jI)
              },
              Xfdog: function (jH, jI) {
                return jH(jI)
              },
              QCdlM: function (jH, jI, jJ) {
                return jH(jI, jJ)
              }
            },
            jG = aq[w4(0x201)][j3][j2]
          aq[w5(0xa31, '%SI*')][j3][j2] = function (jH, jI, jJ) {
            return new Promise((jK, jL) =>
              b9(this, void 0x0, void 0x0, function* () {
                const w7 = c,
                  w6 = b
                if (jI && aq[w6(0x6f6, '6N7B')][w6(0x3ee, 'Nuoe')] && jJ && !jJ[j5])
                  try {
                    const jM = yield jF[w7('0xa5d')](j6, aq[w6('0x17d', ']UNN')][j4][w7('0x4b7')](jH))
                    if (!jM['ok']) throw new Error('' + jM[w6(0x6f0, 'l$hi')])
                    let jN
                    const { showProgress: jO } = jJ[w6('0x3b8', '5alY')]
                    if (jO) {
                      const jQ = parseInt(jM[w6(0x901, '5eF6')][w7(0x370)](w6(0xa59, '%qqk')) || '0'),
                        jR = jM[w6('0x5d7', '5eF6')][w7(0x46f)](),
                        jS = []
                      let jT,
                        jU = 0x0,
                        jV = 0x0
                      const jW = {}
                      ;(jW[w7(0x3d4)] = 0x0), (jW[w7('0x378')] = jQ), (jW[w7('0x8b4')] = jU)
                      const jX = (jJ[w6(0x48d, 'WgvK')] = jW)
                      for (;;) {
                        const { done: jY, value: jZ } = yield jR[w7('0xa3a')]()
                        if (
                          (jZ && (jS[w7(0x564)](jZ), (jU += jZ[w7('0x7f6')])),
                          (jT = Date[w6('0x9cf', 'LV#p')]()),
                          jO &&
                            (jY || jT - jV > 0x64) &&
                            ((jX[w6(0x8f4, 'jbuU')] = jQ ? jU / jQ : 0x0),
                            (jX[w6('0xa9b', 'Pa%E')] = jQ),
                            (jX[w6(0xa9, 'LV#p')] = jU),
                            (jV = jT)),
                          jY)
                        )
                          break
                      }
                      jN = new Blob(jS)
                    } else jN = yield jM[w6(0x1aa, '$r)6')]()
                    const jP = yield createImageBitmap(jN)
                    yield j7(jP, jJ), (jN = null), jF[w6('0x4ba', '%SI*')](jK, jP)
                  } catch (k0) {
                    jL(k0)
                  }
                else
                  jF[w6('0x67a', 'q&7n')](jG, jH, jI)
                    [w6(0x28c, 'IRAu')](k1 =>
                      b9(this, void 0x0, void 0x0, function* () {
                        yield j7(k1, jJ), jK(k1)
                      })
                    )
                    [w6('0x90d', 'd]K1')](k1 => {
                      jL(k1)
                    })
              })
            )
          }
        })(),
        jd(),
        jy()
    }
  }
  return (
    (aq[kk('0x40b', 'jbuU')][kl(0x642)] =
      kl('0x41f') == typeof createImageBitmap &&
      kk('0x619', 'l5Lg') == typeof ImageBitmap &&
      !aq[kk('0x16a', 'Pa%E')][kl(0x4da)]),
    (aq[kl('0x201')][kk('0x6cd', 'lyYv')] =
      aq[kk(0x478, 'lyYv')][kk(0x5fb, '5eF6')] && !/firefox/i[kl(0x83b)](navigator[kl(0x917)])),
    (aq[kl('0xa72')][kl(0x3e8)](kk('0x4db', 'jbuU')),
    gH([kk(0x1dd, '3t[N')]),
    (ap[kl('0xa1')] = aO),
    (ap[kl('0x269')] = bl),
    (ap[kl('0x4b4')] = bk),
    (ap[kk('0x7af', 'WgvK')] = bf),
    (ap[kl(0x90b)] = class {
      constructor(jE, jF) {
        const w9 = kk,
          w8 = kl,
          jG = {}
        jG[w8('0x70b')] = function (jI, jJ) {
          return jI / jJ
        }
        const jH = jG
        new jD(jE),
          (aq['UI'][w9(0x91d, 'b7Er')][w8(0x81a)] = function (jI, jJ, jK) {
            const wb = w8,
              wa = w9,
              { image: jL } = jI,
              { showProgress: jM } = jI[wa(0x440, '^hR%')]
            if ((aq[wb(0x3e3)][wb(0x449)](this['__'][wa('0xaa2', 'l$hi')], this, jJ, jK), jM)) {
              if (wb('0x844') !== wa('0x2bb', 'TdJ1')) {
                const { x: jN, y: jO, width: jP, height: jQ } = this[wa('0x659', 'jbuU')][wa(0x72e, ')@c%')],
                  { scaleX: jR, scaleY: jS } = this[wb(0x3bd)](!0x0)
                if (jP * jR > 0x32 && jQ * jS > 0x1e) {
                  if (wa(0x337, '%qqk') !== wa('0x624', '6N7B')) {
                    const jU = aI(jJ)
                    if (bq[wa(0xa92, 'ckbf')](jU)) bg = jU
                    else {
                      if (!0x1 === jU) return
                    }
                  } else {
                    const jU = 0xc / jR
                    ;(jJ[wa(0x9ae, 'Pa%E')] = aq[wa(0x96f, 'ckbf')](jM) ? jM : wa(0x3a9, 'l5Lg')),
                      (jJ[wb(0x4b8)] = wb(0x77d) + jU + wa(0x2d3, 'Pa%E')),
                      jJ[wa('0x35d', 'S1^T')](
                        '.' +
                          (Math[wa('0x2a5', 'fXk5')](Math[wb(0x4d9)]()) ? '.' : '\x20') +
                          (Math[wb('0x6d1')](Math[wb(0x4d9)]()) ? '.' : '\x20'),
                        jN + jP / 0x2 - jU / 0x2,
                        jO + jH[wa(0x19c, 'ory)')](jQ, 0x2)
                      )
                  }
                }
                jI[wb('0x718')] && clearTimeout(jI[wa('0x830', 'CiU*')]),
                  (jI[wa('0x7ca', ')@c%')] = setTimeout(() => {
                    const wd = wb,
                      wc = wa
                    jL[wc(0x90c, 'KlaA')] || this[wc('0x142', 'lyYv')](wd(0x75f))
                  }, 0xc8))
              } else {
                if (!aR[wb('0xa1f')] && jK) {
                  const jW = aT[wb(0x8a1)](aX[wb('0x2b0')]),
                    jX = this[wb(0x5df)](jW, aW, aV, bm[wb(0x670)])
                  if (!jX) return
                  b7[wa(0x629, 'WgvK')](jX, aY)
                }
              }
            }
          })
      }
    }),
    (ap[kk('0x673', '%SI*')] = gR),
    (ap[kk('0x5b8', 'CiU*')] = hp),
    (ap[kl('0x3e2')] = aG),
    (ap[kl(0x3b0)] = gP),
    (ap[kl('0x7cd')] = gO),
    (ap[kl(0x251)] = class {
      constructor(jE, jF) {
        const wf = kk,
          we = kl
        ;(this[we(0x65f)] = jF || {}),
          (this[we(0x33c)] = jE),
          jE[wf(0x699, 'Mi8H')](() => {
            const wh = wf,
              wg = we
            !jE[wg('0x289')][wh('0x9ef', '3t[N')][wg(0x6fe)] &&
              (new i7(jE), ((new hI(jE)[wg('0x441')] = new ix(jE)), new i1(jE), new hO(jE, jF)))
          }),
          iG ||
            aq[we(0xa72)][we(0x16f)](we('0x65a')) ||
            ((iG = !0x0),
            (aq[we(0x601)][wf('0x835', 'Q1[s')] = function (jG, jH, jI, jJ) {
              const wl = wf,
                wi = we
              jG[iF] ||
                (jG[iF] = aq[wi(0x78c)][iE][wi('0x3e8')](
                  () =>
                    b9(this, void 0x0, void 0x0, function* () {
                      const wk = b,
                        wj = wi
                      aq[wj(0x601)][wj(0x934)](jG, jH, jI, jJ), jH[wk('0x679', 'KlaA')](wj(0x75f))
                    }),
                  0x0,
                  () => (
                    iD() && ((jG[iF] = null), iH || (aq[wi(0x78c)][iE][wi('0x65f')][wl(0xa04, '#yLL')] = iH = 0x1)),
                    jI[wl('0x754', 'oqmg')][wi('0x2fd')](jH[wl('0xa66', 'Nuoe')])
                  )
                ))
            }))
      }
      [kl(0x4a4)]() {
        const wn = kk,
          wm = kl,
          jE = this[wm('0x33c')],
          { usePartLayout: jF } = jE[wn('0x63c', 'Q1[s')]
        ;(jE[wn(0x5c3, 'z3lP')][wn('0x9f9', 'b7Er')] = !0x1),
          jE[wn(0xe0, 'S1^T')](aq[wn('0x962', 'F0QA')][wm('0x607')], () => {
            const wp = wm,
              wo = wn
            jE[wo('0x972', '#yLL')][wp('0x68e')] = jF
          })
      }
    }),
    (ap[kl('0x44a')] = gH),
    ap)
  )
})({}, LeaferUI, LeaferUI, LeaferIN[wq(0x668)])
;(function () {
  Object.assign(LeaferUI, PxGrowPlayground)
})()
//# sourceMappingURL=index.js.map
