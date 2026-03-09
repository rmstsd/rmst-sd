var LeaferUI = (function (t) {
  'use strict'
  var e, i
  ;((t.PathNodeHandleType = void 0),
    ((e = t.PathNodeHandleType || (t.PathNodeHandleType = {}))[(e.none = 1)] = 'none'),
    (e[(e.free = 2)] = 'free'),
    (e[(e.mirrorAngle = 3)] = 'mirrorAngle'),
    (e[(e.mirror = 4)] = 'mirror'),
    (t.Answer = void 0),
    ((i = t.Answer || (t.Answer = {}))[(i.No = 0)] = 'No'),
    (i[(i.Yes = 1)] = 'Yes'),
    (i[(i.NoAndSkip = 2)] = 'NoAndSkip'),
    (i[(i.YesAndSkip = 3)] = 'YesAndSkip'))
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
        ;(i || (i = void 0), t[e] !== i && (t[e] = i))
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
      ;(this.__input || (this.__input = {}), (this.__input[t] = e))
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
            ;((e = s ? s[o] : void 0), (i[o] = n(e) ? t : e))
          }
      }
      if (e && e.matrix) {
        const { a: t, b: e, c: s, d: n, e: o, f: r } = this.__leaf.__localMatrix
        i.matrix = { a: t, b: e, c: s, d: n, e: o, f: r }
      }
      return i
    }
    __setMiddle(t, e) {
      ;(this.__middle || (this.__middle = {}), (this.__middle[t] = e))
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
        return ('text' === e ? (i = 'data:text/plain;charset=utf-8,' + i) : 'svg' === e && (i = 'data:image/svg+xml,' + i), i)
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
          if ((a && (d.globalAlpha = a), (d.imageSmoothingEnabled = !1 !== r), t))
            if (o) {
              const s = e / o.width,
                n = i / o.height
              ;(d.setTransform(s, 0, 0, n, -o.x * s, -o.y * n), d.drawImage(t, 0, 0, t.width, t.height))
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
        ;((k = i ? (h(t) ? e : t) : []),
          h(t) ? ((T = O(t)), (S = e)) : h(e) ? ((T = t), (S = O(e))) : ((T = t), (S = e)),
          4 !== T.length && (T = C(T)),
          4 !== S.length && (S = C(S)))
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
        (t %= 360),
        e ? t < 0 && (t += 360) : (t > 180 && (t -= 360), t < -180 && (t += 360)),
        z.float(t)
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
          ;((s.scaleX = t || n || 1), (s.scaleY = n || t || 1))
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
        ;((t.a = e), (t.b = i), (t.c = s), (t.d = n), (t.e = o), (t.f = r))
      },
      get: G,
      getWorld: Q,
      copy(t, e) {
        ;((t.a = e.a), (t.b = e.b), (t.c = e.c), (t.d = e.d), (t.e = e.e), (t.f = e.f))
      },
      translate(t, e, i) {
        ;((t.e += e), (t.f += i))
      },
      translateInner(t, e, i, s) {
        ;((t.e += t.a * e + t.c * i), (t.f += t.b * e + t.d * i), s && ((t.e -= e), (t.f -= i)))
      },
      scale(t, e, i = e) {
        ;((t.a *= e), (t.b *= e), (t.c *= i), (t.d *= i))
      },
      pixelScale(t, e, i) {
        ;(i || (i = t), (i.a = t.a * e), (i.b = t.b * e), (i.c = t.c * e), (i.d = t.d * e), (i.e = t.e * e), (i.f = t.f * e))
      },
      scaleOfOuter(t, e, i, s) {
        ;(et.toInnerPoint(t, e, J), et.scaleOfInner(t, J, i, s))
      },
      scaleOfInner(t, e, i, s = i) {
        ;(et.translateInner(t, e.x, e.y), et.scale(t, i, s), et.translateInner(t, -e.x, -e.y))
      },
      rotate(t, e) {
        const { a: i, b: s, c: n, d: o } = t,
          r = K((e *= H)),
          a = j(e)
        ;((t.a = i * r - s * a), (t.b = i * a + s * r), (t.c = n * r - o * a), (t.d = n * a + o * r))
      },
      rotateOfOuter(t, e, i) {
        ;(et.toInnerPoint(t, e, J), et.rotateOfInner(t, J, i))
      },
      rotateOfInner(t, e, i) {
        ;(et.translateInner(t, e.x, e.y), et.rotate(t, i), et.translateInner(t, -e.x, -e.y))
      },
      skew(t, e, i) {
        const { a: s, b: n, c: o, d: r } = t
        ;(i && ((i *= H), (t.a = s + o * i), (t.b = n + r * i)), e && ((e *= H), (t.c = o + s * e), (t.d = r + n * e)))
      },
      skewOfOuter(t, e, i, s) {
        ;(et.toInnerPoint(t, e, J), et.skewOfInner(t, J, i, s))
      },
      skewOfInner(t, e, i, s = 0) {
        ;(et.translateInner(t, e.x, e.y), et.skew(t, i, s), et.translateInner(t, -e.x, -e.y))
      },
      multiply(t, e) {
        const { a: i, b: s, c: n, d: o, e: r, f: a } = t
        ;((t.a = e.a * i + e.b * n),
          (t.b = e.a * s + e.b * o),
          (t.c = e.c * i + e.d * n),
          (t.d = e.c * s + e.d * o),
          (t.e = e.e * i + e.f * n + r),
          (t.f = e.e * s + e.f * o + a))
      },
      multiplyParent(t, e, i, s, o) {
        const { e: r, f: a } = t
        if ((i || (i = t), n(s) && (s = 1 !== t.a || t.b || t.c || 1 !== t.d), s)) {
          const { a: s, b: n, c: r, d: a } = t
          ;((i.a = s * e.a + n * e.c),
            (i.b = s * e.b + n * e.d),
            (i.c = r * e.a + a * e.c),
            (i.d = r * e.b + a * e.d),
            o && ((i.scaleX = e.scaleX * o.scaleX), (i.scaleY = e.scaleY * o.scaleY)))
        } else ((i.a = e.a), (i.b = e.b), (i.c = e.c), (i.d = e.d), o && ((i.scaleX = e.scaleX), (i.scaleY = e.scaleY)))
        ;((i.e = r * e.a + a * e.c + e.e), (i.f = r * e.b + a * e.d + e.f))
      },
      divide(t, e) {
        et.multiply(t, et.tempInvert(e))
      },
      divideParent(t, e) {
        et.multiplyParent(t, et.tempInvert(e))
      },
      tempInvert(t) {
        const { tempMatrix: e } = et
        return (et.copy(e, t), et.invert(e), e)
      },
      invert(t) {
        const { a: e, b: i, c: s, d: n, e: o, f: r } = t
        if (i || s) {
          const a = 1 / (e * n - i * s)
          ;((t.a = n * a),
            (t.b = -i * a),
            (t.c = -s * a),
            (t.d = e * a),
            (t.e = -(o * n - r * s) * a),
            (t.f = -(r * e - o * i) * a))
        } else if (1 === e && 1 === n) ((t.e = -o), (t.f = -r))
        else {
          const i = 1 / (e * n)
          ;((t.a = n * i), (t.d = e * i), (t.e = -o * n * i), (t.f = -r * e * i))
        }
      },
      toOuterPoint(t, e, i, s) {
        const { x: n, y: o } = e
        ;(i || (i = e), (i.x = n * t.a + o * t.c), (i.y = n * t.b + o * t.d), s || ((i.x += t.e), (i.y += t.f)))
      },
      toInnerPoint(t, e, i, s) {
        const { a: n, b: o, c: r, d: a } = t,
          h = 1 / (n * a - o * r),
          { x: l, y: d } = e
        if ((i || (i = e), (i.x = (l * a - d * r) * h), (i.y = (d * n - l * o) * h), !s)) {
          const { e: e, f: s } = t
          ;((i.x -= (e * a - s * r) * h), (i.y -= (s * n - e * o) * h))
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
            ;((t.a = (r + i * -a) * h), (t.b = (a + i * r) * h), (t.c = (e * r - a) * l), (t.d = (r + e * a) * l))
          } else ((t.a = r * h), (t.b = a * h), (t.c = -a * l), (t.d = r * l))
        } else ((t.a = h), (t.b = 0), (t.c = 0), (t.d = l))
        ;((t.e = r), (t.f = a), (i = i || s) && et.translateInner(t, -i.x, -i.y, !s))
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
            ;((d = Z(n * n + o * o)), (c = t / d))
            const e = n / d
            u = o > 0 ? q(e) : -q(e)
          } else {
            ;((c = Z(r * r + a * a)), (d = t / c))
            const e = r / c
            u = Y - (a > 0 ? q(-e) : -q(e))
          }
          const e = $(K(u)),
            i = j(u)
          ;((d = $(d)),
            (c = $(c)),
            (p = e ? $((r / c + i) / e / H, 9) : 0),
            (g = e ? $((o / d - i) / e / H, 9) : 0),
            (u = $(u / H)))
        } else ((d = n), (c = a), (u = p = g = 0))
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
        return ((s.scaleX = e), (s.scaleY = i), s)
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
        ;((t.x = e), (t.y = i))
      },
      setRadius(t, e, i) {
        ;((t.radiusX = e), (t.radiusY = n(i) ? e : i))
      },
      copy(t, e) {
        ;((t.x = e.x), (t.y = e.y))
      },
      copyFrom(t, e, i) {
        ;((t.x = e), (t.y = i))
      },
      round(t, e) {
        ;((t.x = e ? ct(t.x - 0.5) + 0.5 : ct(t.x)), (t.y = e ? ct(t.y - 0.5) + 0.5 : ct(t.y)))
      },
      move(t, e, i) {
        u(e) ? ((t.x += e.x), (t.y += e.y)) : ((t.x += e), (t.y += i))
      },
      scale(t, e, i = e) {
        ;(t.x && (t.x *= e), t.y && (t.y *= i))
      },
      scaleOf(t, e, i, s = i) {
        ;((t.x += (t.x - e.x) * (i - 1)), (t.y += (t.y - e.y) * (s - 1)))
      },
      rotate(t, e, i) {
        i || (i = pt.defaultPoint)
        const s = rt((e *= H)),
          n = ot(e),
          o = t.x - i.x,
          r = t.y - i.y
        ;((t.x = i.x + o * s - r * n), (t.y = i.y + o * n + r * s))
      },
      tempToInnerOf(t, e) {
        const { tempPoint: i } = pt
        return (_t(i, t), st(e, i, i), i)
      },
      tempToOuterOf(t, e) {
        const { tempPoint: i } = pt
        return (_t(i, t), nt(e, i, i), i)
      },
      tempToInnerRadiusPointOf(t, e) {
        const { tempRadiusPoint: i } = pt
        return (_t(i, t), pt.toInnerRadiusPointOf(t, e, i), i)
      },
      copyRadiusPoint: (t, e, i, s) => (_t(t, e), ft(t, i, s), t),
      toInnerRadiusPointOf(t, e, i) {
        ;(i || (i = t), st(e, t, i), (i.radiusX = Math.abs(t.radiusX / e.scaleX)), (i.radiusY = Math.abs(t.radiusY / e.scaleY)))
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
        return (n && (t = e), s || (e = {}), (e.x = t.x + rt(o) * i), (e.y = t.y + ot(o) * i), e)
      },
      toNumberPoints(t) {
        let e = t
        return (u(t[0]) && ((e = []), t.forEach(t => e.push(t.x, t.y))), e)
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
      return (u(t) ? ut.copy(this, t) : ut.set(this, t, e), this)
    }
    get() {
      const { x: t, y: e } = this
      return { x: t, y: e }
    }
    clone() {
      return new yt(this)
    }
    move(t, e) {
      return (ut.move(this, t, e), this)
    }
    scale(t, e) {
      return (ut.scale(this, t, e), this)
    }
    scaleOf(t, e, i) {
      return (ut.scaleOf(this, t, e, i), this)
    }
    rotate(t, e) {
      return (ut.rotate(this, t, e), this)
    }
    rotateOf(t, e) {
      return (ut.rotate(this, e, t), this)
    }
    getRotation(t, e, i) {
      return ut.getRotation(this, t, e, i)
    }
    toInnerOf(t, e) {
      return (ut.toInnerOf(this, t, e), this)
    }
    toOuterOf(t, e) {
      return (ut.toOuterOf(this, t, e), this)
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
      return (ut.reset(this), this)
    }
  }
  const vt = new yt()
  class wt {
    constructor(t, e, i, s, n, o) {
      this.set(t, e, i, s, n, o)
    }
    set(t, e, i, s, n, o) {
      return (u(t) ? tt.copy(this, t) : tt.set(this, t, e, i, s, n, o), this)
    }
    setWith(t) {
      return (tt.copy(this, t), (this.scaleX = t.scaleX), (this.scaleY = t.scaleY), this)
    }
    get() {
      const { a: t, b: e, c: i, d: s, e: n, f: o } = this
      return { a: t, b: e, c: i, d: s, e: n, f: o }
    }
    clone() {
      return new wt(this)
    }
    translate(t, e) {
      return (tt.translate(this, t, e), this)
    }
    translateInner(t, e) {
      return (tt.translateInner(this, t, e), this)
    }
    scale(t, e) {
      return (tt.scale(this, t, e), this)
    }
    scaleWith(t, e) {
      return (tt.scale(this, t, e), (this.scaleX *= t), (this.scaleY *= e || t), this)
    }
    pixelScale(t) {
      return (tt.pixelScale(this, t), this)
    }
    scaleOfOuter(t, e, i) {
      return (tt.scaleOfOuter(this, t, e, i), this)
    }
    scaleOfInner(t, e, i) {
      return (tt.scaleOfInner(this, t, e, i), this)
    }
    rotate(t) {
      return (tt.rotate(this, t), this)
    }
    rotateOfOuter(t, e) {
      return (tt.rotateOfOuter(this, t, e), this)
    }
    rotateOfInner(t, e) {
      return (tt.rotateOfInner(this, t, e), this)
    }
    skew(t, e) {
      return (tt.skew(this, t, e), this)
    }
    skewOfOuter(t, e, i) {
      return (tt.skewOfOuter(this, t, e, i), this)
    }
    skewOfInner(t, e, i) {
      return (tt.skewOfInner(this, t, e, i), this)
    }
    multiply(t) {
      return (tt.multiply(this, t), this)
    }
    multiplyParent(t) {
      return (tt.multiplyParent(this, t), this)
    }
    divide(t) {
      return (tt.divide(this, t), this)
    }
    divideParent(t) {
      return (tt.divideParent(this, t), this)
    }
    invert() {
      return (tt.invert(this), this)
    }
    invertWith() {
      return (tt.invert(this), (this.scaleX = 1 / this.scaleX), (this.scaleY = 1 / this.scaleY), this)
    }
    toOuterPoint(t, e, i) {
      tt.toOuterPoint(this, t, e, i)
    }
    toInnerPoint(t, e, i) {
      tt.toInnerPoint(this, t, e, i)
    }
    setLayout(t, e, i) {
      return (tt.setLayout(this, t, e, i), this)
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
        ;((t.minX = t.maxX = e), (t.minY = t.maxY = i))
      },
      addPoint(t, e, i) {
        ;((t.minX = e < t.minX ? e : t.minX),
          (t.minY = i < t.minY ? i : t.minY),
          (t.maxX = e > t.maxX ? e : t.maxX),
          (t.maxY = i > t.maxY ? i : t.maxY))
      },
      addBounds(t, e, i, s, n) {
        ;(Et(t, e, i), Et(t, e + s, i + n))
      },
      copy(t, e) {
        ;((t.minX = e.minX), (t.minY = e.minY), (t.maxX = e.maxX), (t.maxY = e.maxY))
      },
      addPointBounds(t, e) {
        ;((t.minX = e.minX < t.minX ? e.minX : t.minX),
          (t.minY = e.minY < t.minY ? e.minY : t.minY),
          (t.maxX = e.maxX > t.maxX ? e.maxX : t.maxX),
          (t.maxY = e.maxY > t.maxY ? e.maxY : t.maxY))
      },
      toBounds(t, e) {
        ;((e.x = t.minX), (e.y = t.minY), (e.width = t.maxX - t.minX), (e.height = t.maxY - t.minY))
      }
    },
    { addPoint: Et } = bt
  var Tt, St
  ;((t.Direction4 = void 0),
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
    (St[(St['bottom-left'] = 6)] = 'bottom-left'))
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
      ;((i.x = r.x),
        (i.y = r.y),
        'percent' === r.type &&
          ((i.x *= e.width),
          (i.y *= e.height),
          n &&
            (o || ((i.x -= n.x), (i.y -= n.y)),
            r.x && (i.x -= 1 === r.x ? n.width : 0.5 === r.x ? r.x * n.width : 0),
            r.y && (i.y -= 1 === r.y ? n.height : 0.5 === r.y ? r.y * n.height : 0))),
        s || ((i.x += e.x), (i.y += e.y)))
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
        ;((t.x = e), (t.y = i), (t.width = s), (t.height = n))
      },
      copy(t, e) {
        ;((t.x = e.x), (t.y = e.y), (t.width = e.width), (t.height = e.height))
      },
      copyAndSpread(t, e, i, s, n) {
        const { x: o, y: r, width: a, height: h } = e
        if (c(i)) {
          const e = Ft(i)
          s
            ? Kt.set(t, o + e[3], r + e[0], a - e[1] - e[3], h - e[2] - e[0])
            : Kt.set(t, o - e[3], r - e[0], a + e[1] + e[3], h + e[2] + e[0])
        } else (s && (i = -i), Kt.set(t, o - i, r - i, a + 2 * i, h + 2 * i))
        n && ('width' === n ? ((t.y = r), (t.height = h)) : ((t.x = o), (t.width = a)))
      },
      minX: t => (t.width > 0 ? t.x : t.x + t.width),
      minY: t => (t.height > 0 ? t.y : t.y + t.height),
      maxX: t => (t.width > 0 ? t.x + t.width : t.x),
      maxY: t => (t.height > 0 ? t.y + t.height : t.y),
      move(t, e, i) {
        ;((t.x += e), (t.y += i))
      },
      scroll(t, e) {
        ;((t.x += e.scrollX), (t.y += e.scrollY))
      },
      getByMove: (t, e, i) => ((t = Object.assign({}, t)), Kt.move(t, e, i), t),
      toOffsetOutBounds(t, e, i) {
        ;(e ? Zt(e, t) : (e = t),
          i || (i = t),
          (e.offsetX = Kt.maxX(i)),
          (e.offsetY = Kt.maxY(i)),
          Kt.move(e, -e.offsetX, -e.offsetY))
      },
      scale(t, e, i = e, s) {
        ;(s || ut.scale(t, e, i), (t.width *= e), (t.height *= i))
      },
      scaleOf(t, e, i, s = i) {
        ;(ut.scaleOf(t, e, i, s), (t.width *= i), (t.height *= s))
      },
      tempToOuterOf: (t, e) => (Kt.copy(Gt, t), Kt.toOuterOf(Gt, e), Gt),
      getOuterOf: (t, e) => ((t = Object.assign({}, t)), Kt.toOuterOf(t, e), t),
      toOuterOf(t, e, i) {
        if ((i || (i = t), 0 === e.b && 0 === e.c)) {
          const { a: s, d: n, e: o, f: r } = e
          ;(s > 0 ? ((i.width = t.width * s), (i.x = o + t.x * s)) : ((i.width = t.width * -s), (i.x = o + t.x * s - i.width)),
            n > 0
              ? ((i.height = t.height * n), (i.y = r + t.y * n))
              : ((i.height = t.height * -n), (i.y = r + t.y * n - i.height)))
        } else
          ((Xt.x = t.x),
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
            Dt(Ct, i))
      },
      toInnerOf(t, e, i) {
        ;(i || (i = t), Kt.move(i, -e.e, -e.f), Kt.scale(i, 1 / e.a, 1 / e.d))
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
        ;(o || (o = e),
          r(s) && (s = Kt.getFitScale(t, e, 'cover' === s)),
          (Gt.width = n ? (e.width *= s) : e.width * s),
          (Gt.height = n ? (e.height *= s) : e.height * s),
          Rt.toPoint(i, Gt, t, o, !0, !0))
      },
      getSpread(t, e, i) {
        const s = {}
        return (Kt.copyAndSpread(s, t, e, !1, i), s)
      },
      spread(t, e, i) {
        Kt.copyAndSpread(t, t, e, !1, i)
      },
      shrink(t, e, i) {
        Kt.copyAndSpread(t, t, e, !0, i)
      },
      ceil(t) {
        const { x: e, y: i } = t
        ;((t.x = Wt(t.x)),
          (t.y = Wt(t.y)),
          (t.width = e > t.x ? zt(t.width + e - t.x) : zt(t.width)),
          (t.height = i > t.y ? zt(t.height + i - t.y) : zt(t.height)))
      },
      unsign(t) {
        ;(t.width < 0 && ((t.x += t.width), (t.width = -t.width)), t.height < 0 && ((t.y += t.height), (t.height = -t.height)))
      },
      float(t, e) {
        ;((t.x = It(t.x, e)), (t.y = It(t.y, e)), (t.width = It(t.width, e)), (t.height = It(t.height, e)))
      },
      add(t, e, i) {
        ;((Ut = t.x + t.width),
          (Ht = t.y + t.height),
          (Nt = e.x),
          (Yt = e.y),
          i || ((Nt += e.width), (Yt += e.height)),
          (Ut = Ut > Nt ? Ut : Nt),
          (Ht = Ht > Yt ? Ht : Yt),
          (t.x = t.x < e.x ? t.x : e.x),
          (t.y = t.y < e.y ? t.y : e.y),
          (t.width = Ut - t.x),
          (t.height = Ht - t.y))
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
          ((n = i ? i(e[r], r) : e[r]), n && (n.width || n.height) && (o ? ((o = !1), s || Zt(t, n)) : qt(t, n)))
        o && Kt.reset(t)
      },
      setPoints(t, e) {
        ;(e.forEach((t, e) => (0 === e ? Ot(Ct, t.x, t.y) : At(Ct, t.x, t.y))), Dt(Ct, t))
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
        i && (e = ut.tempToInnerOf(e, i)),
        e.x >= t.x && e.x <= t.x + t.width && e.y >= t.y && e.y <= t.y + t.height
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
      return (u(t) ? jt.copy(this, t) : jt.set(this, t, e, i, s), this)
    }
    get() {
      const { x: t, y: e, width: i, height: s } = this
      return { x: t, y: e, width: i, height: s }
    }
    clone() {
      return new $t(this)
    }
    move(t, e) {
      return (jt.move(this, t, e), this)
    }
    scale(t, e, i) {
      return (jt.scale(this, t, e, i), this)
    }
    scaleOf(t, e, i) {
      return (jt.scaleOf(this, t, e, i), this)
    }
    toOuterOf(t, e) {
      return (jt.toOuterOf(this, t, e), this)
    }
    toInnerOf(t, e) {
      return (jt.toInnerOf(this, t, e), this)
    }
    getFitMatrix(t, e) {
      return jt.getFitMatrix(this, t, e)
    }
    put(t, e, i) {
      jt.put(this, t, e, i)
    }
    spread(t, e) {
      return (jt.spread(this, t, e), this)
    }
    shrink(t, e) {
      return (jt.shrink(this, t, e), this)
    }
    ceil() {
      return (jt.ceil(this), this)
    }
    unsign() {
      return (jt.unsign(this), this)
    }
    float(t) {
      return (jt.float(this, t), this)
    }
    add(t) {
      return (jt.add(this, t), this)
    }
    addList(t) {
      return (jt.setList(this, t, !0), this)
    }
    setList(t) {
      return (jt.setList(this, t), this)
    }
    addListWithFn(t, e) {
      return (jt.setListWithFn(this, t, e, !0), this)
    }
    setListWithFn(t, e) {
      return (jt.setListWithFn(this, t, e), this)
    }
    setPoint(t) {
      return (jt.setPoint(this, t), this)
    }
    setPoints(t) {
      return (jt.setPoints(this, t), this)
    }
    addPoint(t) {
      return (jt.addPoint(this, t), this)
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
      return (jt.intersect(this, t, e), this)
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
      ;((this.top = t), (this.right = e), (this.bottom = i), (this.left = s), (this.width = n), (this.height = o))
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
      ;((this.repeatMap = {}), (this.name = t))
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
      ;(t.fillWorld(e, i.replace('1)', '.1)')), t.strokeWorld(e, i))
    }
    static drawBounds(t, e, i) {
      const s = 'hit' === ie.showBounds,
        n = t.__nowWorld,
        o = ee()
      ;(s && (e.setWorld(n), t.__drawHitPath(e), (e.fillStyle = o.replace('1)', '.2)')), e.fill()),
        e.resetTransform(),
        e.setStroke(o, 2),
        s ? e.stroke() : e.strokeWorld(n, o))
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
    return (t ? r(t) && (t = [t]) : (t = []), t)
  }
  ;((ie.filterList = []), (ie.excludeList = []), (ie.showWarn = !0))
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
        ;((ae.idMap[t] = ae.nameMap[t] = ae.nameToIdMap[s] = void 0), oe.log(s, n, 'ms'))
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
        ;((this.list[t] = !0), he.push(...e))
      },
      has(t, e) {
        const i = this.list[t]
        return (!i && e && this.need(t), i)
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
        ;(pe[e] && ce.repeat(e), (pe[e] = t))
      },
      get(t, e, i, s, o, r) {
        pe[t] || ce.error('not register ' + t)
        const a = new pe[t](e)
        return (n(i) || ((a.x = i), s && (a.y = s), o && (a.width = o), r && (a.height = r)), a)
      }
    },
    { list: pe } = ue,
    ge = ie.get('EventCreator'),
    _e = {
      nameList: {},
      register(t) {
        let e
        Object.keys(t).forEach(i => {
          ;((e = t[i]), r(e) && (fe[e] && ge.repeat(e), (fe[e] = t)))
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
      ;((t.manager = this), this.list.push(t))
    }
    get(t) {
      let e
      const { list: i } = this
      for (let s = 0, n = i.length; s < n; s++)
        if (((e = i[s]), e.recycled && e.isSameSize(t))) return ((e.recycled = !1), e.manager || (e.manager = this), e)
      const s = de.canvas(t)
      return (this.add(s), s)
    }
    recycle(t) {
      t.recycled = !0
    }
    clearRecycled() {
      let t
      const e = []
      for (let i = 0, s = this.list.length; i < s; i++) ((t = this.list[i]), t.recycled ? t.destroy() : e.push(t))
      this.list = e
    }
    clear() {
      ;(this.list.forEach(t => {
        t.destroy()
      }),
        (this.list.length = 0))
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
    return (o > 3 && r && Object.defineProperty(e, i, r), r)
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
      ;('strokeCap' === i &&
        (s.set = function (e) {
          this.context[t] = 'none' === e ? 'butt' : e
        }),
        Object.defineProperty(e, i, s))
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
      ;('normal' === t && (t = 'source-over'), (this.context.globalCompositeOperation = t))
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
      ;(xe.forEach(e => {
        ;((t = this.context[e]), t && (this[e] = t.bind(this.context)))
      }),
        (this.textBaseline = 'alphabetic'))
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
            ;((s += e), (e = 0), (o += t), (a -= t))
          }
          if (i < 0) {
            const t = (-i / n) * h
            ;((n += i), (i = 0), (r += t), (h -= t))
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
  ;(ye([we('imageSmoothingEnabled')], Te.prototype, 'smooth', void 0),
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
    ye([be()], Te.prototype, 'strokeText', null))
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
      ;(super(),
        (this.size = {}),
        (this.worldTransform = {}),
        t || (t = Ce),
        (this.manager = e),
        (this.innerId = b.create(b.CNAVAS)))
      const { width: i, height: s, pixelRatio: n } = t
      ;((this.autoLayout = !i || !s), (this.size.pixelRatio = n || w.devicePixelRatio), (this.config = t), this.init())
    }
    init() {}
    __createContext() {
      const { view: t } = this,
        { contextSettings: e } = this.config
      ;((this.context = e ? t.getContext('2d', e) : t.getContext('2d')), this.__bindContext())
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
      ;(_.copyAttrs(s, t, Oe),
        Oe.forEach(t => s[t] || (s[t] = 1)),
        (this.bounds = new $t(0, 0, this.width, this.height)),
        this.updateViewSize(),
        this.updateClientBounds(),
        this.context &&
          ((this.smooth = this.config.smooth), !this.unreal && i && (this.clearWorld(i.bounds), this.copyWorld(i), i.recycle())))
    }
    updateViewSize() {}
    updateClientBounds() {}
    getClientBounds(t) {
      return (t && this.updateClientBounds(), this.clientBounds || this.bounds)
    }
    startAutoLayout(t, e) {}
    stopAutoLayout() {}
    setCursor(t) {}
    setWorld(t, e) {
      const { pixelRatio: i, pixelSnap: s } = this,
        n = this.worldTransform
      ;(e && ke(t, e, n),
        Be(t, i, n),
        s &&
          !t.ignorePixelSnap &&
          (t.half && (t.half * i) % 2
            ? ((n.e = Pe(n.e - 0.5) + 0.5), (n.f = Pe(n.f - 0.5) + 0.5))
            : ((n.e = Pe(n.e)), (n.f = Pe(n.f)))),
        this.setTransform(n.a, n.b, n.c, n.d, n.e, n.f))
    }
    useWorldTransform(t) {
      t && (this.worldTransform = t)
      const e = this.worldTransform
      e && this.setTransform(e.a, e.b, e.c, e.d, e.e, e.f)
    }
    setStroke(t, e, i, s) {
      ;(e && (this.strokeWidth = e), t && (this.strokeStyle = t), i && this.setStrokeOptions(i, s))
    }
    setStrokeOptions(t, e) {
      let { strokeCap: i, strokeJoin: s, dashPattern: o, dashOffset: r, miterLimit: a } = t
      ;(e &&
        (e.strokeCap && (i = e.strokeCap),
        e.strokeJoin && (s = e.strokeJoin),
        n(e.dashPattern) || (o = e.dashPattern),
        n(e.dashOffset) || (r = e.dashOffset),
        e.miterLimit && (a = e.miterLimit)),
        (this.strokeCap = i),
        (this.strokeJoin = s),
        (this.dashPattern = o),
        (this.dashOffset = r),
        (this.miterLimit = a))
    }
    saveBlendMode(t) {
      ;((this.savedBlendMode = this.blendMode), (this.blendMode = t))
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
      ;((this.shadowOffsetX = t * n), (this.shadowOffsetY = e * n), (this.shadowBlur = i * n), (this.shadowColor = s || 'black'))
    }
    setWorldBlur(t) {
      const { pixelRatio: e } = this
      this.filter = `blur(${t * e}px)`
    }
    copyWorld(t, e, i, s, n) {
      ;(s && (this.blendMode = s),
        e
          ? (this.setTempPixelBounds(e, n),
            i ? (this.setTempPixelBounds2(i, n), (i = Re)) : (i = Le),
            this.drawImage(t.view, Le.x, Le.y, Le.width, Le.height, i.x, i.y, i.width, i.height))
          : this.drawImage(t.view, 0, 0),
        s && (this.blendMode = 'source-over'))
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
      ;(this.resetTransform(), this.copyWorld(t, e, i, s, o), n || this.useWorldTransform())
    }
    useGrayscaleAlpha(t) {
      let e, i
      this.setTempPixelBounds(t, !0, !0)
      const { context: s } = this,
        n = s.getImageData(Le.x, Le.y, Le.width, Le.height),
        { data: o } = n
      for (let t = 0, s = o.length; t < s; t += 4)
        ((i = 0.299 * o[t] + 0.587 * o[t + 1] + 0.114 * o[t + 2]), (e = o[t + 3]) && (o[t + 3] = 255 === e ? i : e * (i / 255)))
      s.putImageData(n, Le.x, Le.y)
    }
    useMask(t, e, i) {
      this.copyWorld(t, e, i, 'destination-in')
    }
    useEraser(t, e, i) {
      this.copyWorld(t, e, i, 'destination-out')
    }
    fillWorld(t, e, i, s) {
      ;(i && (this.blendMode = i),
        (this.fillStyle = e),
        this.setTempPixelBounds(t, s),
        this.fillRect(Le.x, Le.y, Le.width, Le.height),
        i && (this.blendMode = 'source-over'))
    }
    strokeWorld(t, e, i, s) {
      ;(i && (this.blendMode = i),
        (this.strokeStyle = e),
        this.setTempPixelBounds(t, s),
        this.strokeRect(Le.x, Le.y, Le.width, Le.height),
        i && (this.blendMode = 'source-over'))
    }
    clipWorld(t, e = !0) {
      ;(this.beginPath(), this.setTempPixelBounds(t, e), this.rect(Le.x, Le.y, Le.width, Le.height), this.clip())
    }
    clipUI(t) {
      t.windingRule ? this.clip(t.windingRule) : this.clip()
    }
    clearWorld(t, e = !0) {
      ;(this.setTempPixelBounds(t, e), this.clearRect(Le.x, Le.y, Le.width, Le.height))
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
      ;(t.set(e), s && t.intersect(this.bounds), t.scale(this.pixelRatio), i && t.ceil())
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
        ;(r[0] ? t.moveTo(e + r[0], i) : t.moveTo(e, i),
          r[1] ? t.arcTo(a, i, a, h, r[1]) : t.lineTo(a, i),
          r[2] ? t.arcTo(a, h, e, h, r[2]) : t.lineTo(a, h),
          r[3] ? t.arcTo(e, h, e, i, r[3]) : t.lineTo(e, h),
          r[0] ? t.arcTo(e, i, a, i, r[0]) : t.lineTo(e, i))
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
            ((e = n[i - 2]),
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
                (p = a + m * l)))
          s || t.push(ri, u, p, n[v - 2], n[v - 1])
        } else for (let e = 2, i = n.length; e < i; e += 2) t.push(ni, n[e], n[e + 1])
        s && t.push(ai)
      },
      rect(t, e, i, s, n) {
        ;((De.creator.path = t),
          De.creator
            .moveTo(e, i)
            .lineTo(e + s, i)
            .lineTo(e + s, i + n)
            .lineTo(e, i + n)
            .lineTo(e, i))
      },
      roundRect(t, e, i, s, n, o) {
        ;((De.creator.path = []),
          Ye.drawRoundRect(De.creator, e, i, s, n, o),
          t.push(...De.convertToCanvasData(De.creator.path, !0)))
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
          return (t && t.push(ni, s, n), h && (Qe(h, e, i), ti(h, s, n)), d && ei(d, e, i), void (l && ei(l, s, n)))
        const w = c * g - p * u < 0,
          x = w ? -1 : 1,
          b = a / Ve(v / 2),
          E = s + b * Ve(_ + v / 2 + Y * x),
          T = n + b * Xe(_ + v / 2 + Y * x)
        return ((_ -= Y * x), (f -= Y * x), ui(t, E, T, a, a, 0, _ / H, f / H, w, h, l, d))
      },
      arc: (t, e, i, s, n, o, r, a, h, l) => ui(t, e, i, s, s, 0, n, o, r, a, h, l),
      ellipse(t, e, i, s, n, o, r, a, h, l, d, c) {
        const u = o * H,
          p = Xe(u),
          g = Ve(u)
        let _ = r * H,
          f = a * H
        ;(_ > Ze && (_ -= N), f < 0 && (f += N))
        let m = f - _
        ;(m < 0 ? (m += N) : m > N && (m -= N), h && (m -= N))
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
        ;(t && t.push(t.length ? ni : si, D, M), l && Qe(l, D, M), c && ei(c, D, M))
        for (let o = 0; o < y; o++)
          ((b = Ve(f)),
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
            (f += v))
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
            ;((g = -p / u), 0 < g && g < 1 && d.push(g))
          } else
            ((m = u * u - 4 * p * c),
              (y = Math.sqrt(m)),
              m < 0 ||
                ((_ = (-u + y) / (2 * c)), 0 < _ && _ < 1 && d.push(_), (f = (-u - y) / (2 * c)), 0 < f && f < 1 && d.push(f)))
        ;(l ? ti(h, t, e) : Qe(h, t, e), ti(h, r, a))
        for (let l = 0, c = d.length; l < c; l++) (di(d[l], t, e, i, s, n, o, r, a, hi), ti(h, hi.x, hi.y))
      },
      getPointAndSet(t, e, i, s, n, o, r, a, h, l) {
        const d = 1 - t,
          c = d * d * d,
          u = 3 * d * d * t,
          p = 3 * d * t * t,
          g = t * t * t
        ;((l.x = c * e + u * s + p * o + g * a), (l.y = c * i + u * n + p * r + g * h))
      },
      getPoint(t, e, i, s, n, o, r, a, h) {
        const l = {}
        return (di(t, e, i, s, n, o, r, a, h, l), l)
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
          ;((s *= t), (n *= t))
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
          ;((s = t[o]), (i = Ne[s]), (a += s === n ? ' ' : He[s]))
          for (let s = 1; s < i; s++) ((a += z.float(t[o + s], e)), s === i - 1 || (a += ' '))
          ;((n = s), (o += i))
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
          ((s = t[e]),
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
            (n = s))
        return (o && os(r, o), i ? ss.toCanvasData(r, e) : r)
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
              ;((t[c + 1] += a), (t[c + 2] += h))
            case wi:
              ;((a = t[c + 1]), (h = t[c + 2]), p.push(wi, a, h), (c += 3))
              break
            case Si:
              t[c + 1] += a
            case Ti:
              ;((a = t[c + 1]), p.push(bi, a, h), (c += 2))
              break
            case Bi:
              t[c + 1] += h
            case ki:
              ;((h = t[c + 1]), p.push(bi, a, h), (c += 2))
              break
            case Ei:
              ;((t[c + 1] += a), (t[c + 2] += h))
            case bi:
              ;((a = t[c + 1]), (h = t[c + 2]), p.push(bi, a, h), (c += 3))
              break
            case Ci:
              ;((t[c + 1] += a), (t[c + 2] += h), (t[c + 3] += a), (t[c + 4] += h), (n = Ri))
            case Ri:
              ;((r = o === Pi || o === Ri),
                (l = r ? 2 * a - i : t[c + 1]),
                (d = r ? 2 * h - s : t[c + 2]),
                (i = t[c + 1]),
                (s = t[c + 2]),
                (a = t[c + 3]),
                (h = t[c + 4]),
                p.push(Pi, l, d, i, s, a, h),
                (c += 5))
              break
            case Li:
              ;((t[c + 1] += a), (t[c + 2] += h), (t[c + 3] += a), (t[c + 4] += h), (t[c + 5] += a), (t[c + 6] += h), (n = Pi))
            case Pi:
              ;((i = t[c + 3]),
                (s = t[c + 4]),
                (a = t[c + 5]),
                (h = t[c + 6]),
                p.push(Pi, t[c + 1], t[c + 2], i, s, a, h),
                (c += 7))
              break
            case Mi:
              ;((t[c + 1] += a), (t[c + 2] += h), (n = Di))
            case Di:
              ;((r = o === Oi || o === Di),
                (i = r ? 2 * a - i : t[c + 1]),
                (s = r ? 2 * h - s : t[c + 2]),
                e ? Qi(p, a, h, i, s, t[c + 1], t[c + 2]) : p.push(Oi, i, s, t[c + 1], t[c + 2]),
                (a = t[c + 1]),
                (h = t[c + 2]),
                (c += 3))
              break
            case Ai:
              ;((t[c + 1] += a), (t[c + 2] += h), (t[c + 3] += a), (t[c + 4] += h), (n = Oi))
            case Oi:
              ;((i = t[c + 1]),
                (s = t[c + 2]),
                e ? Qi(p, a, h, i, s, t[c + 3], t[c + 4]) : p.push(Oi, i, s, t[c + 3], t[c + 4]),
                (a = t[c + 3]),
                (h = t[c + 4]),
                (c += 5))
              break
            case Fi:
              ;((t[c + 6] += a), (t[c + 7] += h))
            case Ii:
              ;(ts(p, a, h, t[c + 1], t[c + 2], t[c + 3], t[c + 4], t[c + 5], t[c + 6], t[c + 7], e),
                (a = t[c + 6]),
                (h = t[c + 7]),
                (c += 8))
              break
            case zi:
            case Wi:
              ;(p.push(Wi), c++)
              break
            case Ui:
              ;((a = t[c + 1]), (h = t[c + 2]), e ? Ki(p, a, h, t[c + 3], t[c + 4]) : rs(p, t, c, 5), (c += 5))
              break
            case Hi:
              ;((a = t[c + 1]),
                (h = t[c + 2]),
                e ? qi(p, a, h, t[c + 3], t[c + 4], [t[c + 5], t[c + 6], t[c + 7], t[c + 8]]) : rs(p, t, c, 9),
                (c += 9))
              break
            case Ni:
              ;((a = t[c + 1]), (h = t[c + 2]), e ? qi(p, a, h, t[c + 3], t[c + 4], t[c + 5]) : rs(p, t, c, 6), (c += 6))
              break
            case Yi:
              ;(Ji(
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
                (c += 9))
              break
            case Xi:
              ;(e ? Ji(p, t[c + 1], t[c + 2], t[c + 3], t[c + 4], 0, 0, 360, !1) : rs(p, t, c, 5),
                (a = t[c + 1] + t[c + 3]),
                (h = t[c + 2]),
                (c += 5))
              break
            case Vi:
              ;($i(e ? p : rs(p, t, c, 7), t[c + 1], t[c + 2], t[c + 3], t[c + 4], t[c + 5], t[c + 6], null, is),
                (a = is.x),
                (h = is.y),
                (c += 7))
              break
            case Gi:
              ;(e ? $i(p, t[c + 1], t[c + 2], t[c + 3], 0, 360, !1) : rs(p, t, c, 4),
                (a = t[c + 1] + t[c + 3]),
                (h = t[c + 2]),
                (c += 4))
              break
            case ji:
              ;(Zi(e ? p : rs(p, t, c, 6), a, h, t[c + 1], t[c + 2], t[c + 3], t[c + 4], t[c + 5], null, is),
                (a = is.x),
                (h = is.y),
                (c += 6))
              break
            default:
              return (es.error(`command: ${n} [index:${c}]`, t), p)
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
        ;(ns.index === ns.length && ((ns.index = 1), t.push(ns.name)), t.push(Number(e)), ns.index++, (ns.dot = 0))
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
        ;(li.ellipse(null, e, i, s, n, o(r) ? 0 : r, o(a) ? 0 : a, o(h) ? 360 : h, l, null, null, Ss),
          t.push(as, Ss.x, Ss.y),
          Bs(t, e, i, s, n, r, a, h, l))
      },
      drawArc(t, e, i, s, n, r, a) {
        ;(li.arc(null, e, i, s, o(n) ? 0 : n, o(r) ? 360 : r, a, null, null, Ss), t.push(as, Ss.x, Ss.y), Ps(t, e, i, s, n, r, a))
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
      return ((this.__path = t ? (r(t) ? De.parse(t) : t) : []), this)
    }
    beginPath() {
      return (Ds(this.__path), this.paint(), this)
    }
    moveTo(t, e) {
      return (Ls(this.__path, t, e), this.paint(), this)
    }
    lineTo(t, e) {
      return (Rs(this.__path, t, e), this.paint(), this)
    }
    bezierCurveTo(t, e, i, s, n, o) {
      return (Os(this.__path, t, e, i, s, n, o), this.paint(), this)
    }
    quadraticCurveTo(t, e, i, s) {
      return (Cs(this.__path, t, e, i, s), this.paint(), this)
    }
    closePath() {
      return (As(this.__path), this.paint(), this)
    }
    rect(t, e, i, s) {
      return (Ms(this.__path, t, e, i, s), this.paint(), this)
    }
    roundRect(t, e, i, s, n) {
      return (Is(this.__path, t, e, i, s, n), this.paint(), this)
    }
    ellipse(t, e, i, s, n, o, r, a) {
      return (Fs(this.__path, t, e, i, s, n, o, r, a), this.paint(), this)
    }
    arc(t, e, i, s, n, o) {
      return (Ws(this.__path, t, e, i, s, n, o), this.paint(), this)
    }
    arcTo(t, e, i, s, n) {
      return (zs(this.__path, t, e, i, s, n), this.paint(), this)
    }
    drawEllipse(t, e, i, s, n, o, r, a) {
      return (Us(this.__path, t, e, i, s, n, o, r, a), this.paint(), this)
    }
    drawArc(t, e, i, s, n, o) {
      return (Hs(this.__path, t, e, i, s, n, o), this.paint(), this)
    }
    drawPoints(t, e, i) {
      return (Ns(this.__path, t, e, i), this.paint(), this)
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
              ;(t.moveTo(e[s + 1], e[s + 2]), (s += 3))
              break
            case Vs:
              ;(t.lineTo(e[s + 1], e[s + 2]), (s += 3))
              break
            case Gs:
              ;(t.bezierCurveTo(e[s + 1], e[s + 2], e[s + 3], e[s + 4], e[s + 5], e[s + 6]), (s += 7))
              break
            case js:
              ;(t.quadraticCurveTo(e[s + 1], e[s + 2], e[s + 3], e[s + 4]), (s += 5))
              break
            case Ks:
              ;(t.closePath(), (s += 1))
              break
            case qs:
              ;(t.rect(e[s + 1], e[s + 2], e[s + 3], e[s + 4]), (s += 5))
              break
            case Zs:
              ;(t.roundRect(e[s + 1], e[s + 2], e[s + 3], e[s + 4], [e[s + 5], e[s + 6], e[s + 7], e[s + 8]]), (s += 9))
              break
            case $s:
              ;(t.roundRect(e[s + 1], e[s + 2], e[s + 3], e[s + 4], e[s + 5]), (s += 6))
              break
            case Js:
              ;(t.ellipse(e[s + 1], e[s + 2], e[s + 3], e[s + 4], e[s + 5] * H, e[s + 6] * H, e[s + 7] * H, e[s + 8]), (s += 9))
              break
            case Qs:
              ;(t.ellipse(e[s + 1], e[s + 2], e[s + 3], e[s + 4], 0, 0, N, !1), (s += 5))
              break
            case tn:
              ;(t.arc(e[s + 1], e[s + 2], e[s + 3], e[s + 4] * H, e[s + 5] * H, e[s + 6]), (s += 7))
              break
            case en:
              ;(t.arc(e[s + 1], e[s + 2], e[s + 3], 0, N, !1), (s += 4))
              break
            case sn:
              ;(t.arcTo(e[s + 1], e[s + 2], e[s + 3], e[s + 4], e[s + 5]), (s += 6))
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
        ;(Fn.toTwoPointBounds(t, Mn), Ln(Mn, e))
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
              ;((h = t[a + 1]), (l = t[a + 2]), kn(e, h, l), (a += 3))
              break
            case hn:
              ;((n = t[a + 5]),
                (o = t[a + 6]),
                vn(h, l, t[a + 1], t[a + 2], t[a + 3], t[a + 4], n, o, Dn),
                Tn(e, Dn),
                (h = n),
                (l = o),
                (a += 7))
              break
            case ln:
              ;((i = t[a + 1]),
                (s = t[a + 2]),
                (n = t[a + 3]),
                (o = t[a + 4]),
                wn(h, l, i, s, n, o, Dn),
                Tn(e, Dn),
                (h = n),
                (l = o),
                (a += 5))
              break
            case dn:
              a += 1
              break
            case cn:
              ;((h = t[a + 1]), (l = t[a + 2]), Pn(e, h, l, t[a + 3], t[a + 4]), (a += 5))
              break
            case un:
            case pn:
              ;((h = t[a + 1]), (l = t[a + 2]), Pn(e, h, l, t[a + 3], t[a + 4]), (a += r === un ? 9 : 6))
              break
            case gn:
              ;(En(null, t[a + 1], t[a + 2], t[a + 3], t[a + 4], t[a + 5], t[a + 6], t[a + 7], t[a + 8], Dn, In),
                0 === a ? Sn(e, Dn) : Tn(e, Dn),
                (h = In.x),
                (l = In.y),
                (a += 9))
              break
            case _n:
              ;((h = t[a + 1]),
                (l = t[a + 2]),
                (On = t[a + 3]),
                (An = t[a + 4]),
                Pn(e, h - On, l - An, 2 * On, 2 * An),
                (h += On),
                (a += 5))
              break
            case fn:
              ;(bn(null, t[a + 1], t[a + 2], t[a + 3], t[a + 4], t[a + 5], t[a + 6], Dn, In),
                0 === a ? Sn(e, Dn) : Tn(e, Dn),
                (h = In.x),
                (l = In.y),
                (a += 7))
              break
            case mn:
              ;((h = t[a + 1]), (l = t[a + 2]), (Cn = t[a + 3]), Pn(e, h - Cn, l - Cn, 2 * Cn, 2 * Cn), (h += Cn), (a += 4))
              break
            case yn:
              ;(xn(null, h, l, t[a + 1], t[a + 2], t[a + 3], t[a + 4], t[a + 5], Dn, In),
                0 === a ? Sn(e, Dn) : Tn(e, Dn),
                (h = In.x),
                (l = In.y),
                (a += 6))
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
              ;((l = g = t[r + 1]),
                (d = _ = t[r + 2]),
                (r += 3),
                t[r] === zn ? ((u = t[r + 1]), (p = t[r + 2]), m.push(Wn, Hn(l, u), Nn(d, p))) : m.push(Wn, l, d))
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
              ;((g = a), (_ = h))
              break
            case Un:
              ;(n !== Un && (Yn(m, l, d, u, p, e, g, _), m.push(Un)), (r += 1))
              break
            default:
              o = Ne[s]
              for (let e = 0; e < o; e++) m.push(t[r + e])
              r += o
          }
          n = s
        }
        return (s !== Un && ((m[1] = l), (m[2] = d)), m)
      }
    }
  function Vn(t) {
    return new Ys(t)
  }
  const Gn = Vn()
  ;((De.creator = Vn()), (De.parse = ss.parse), (De.convertToCanvasData = ss.toCanvasData))
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
      ;((this.parallel = !0), (this.time = 1), (this.id = b.create(b.TASK)), (this.task = t))
    }
    run() {
      return ve(this, void 0, void 0, function* () {
        try {
          if (this.isComplete || this.runing) return
          if (((this.runing = !0), this.canUse && !this.canUse())) return this.cancel()
          this.task && (yield this.task())
        } catch (t) {
          $n.error(t)
        }
      })
    }
    complete() {
      ;((this.isComplete = !0), (this.parent = this.task = this.canUse = null))
    }
    cancel() {
      ;((this.isCancel = !0), this.complete())
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
      ;((this.config = { parallel: 6 }),
        (this.list = []),
        (this.running = !1),
        (this.isComplete = !0),
        (this.index = 0),
        (this.delayNumber = 0),
        t && _.assign(this.config, t),
        this.empty())
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
      ;(this.list.push(t), !1 === e || this.timer || (this.timer = setTimeout(() => this.start())))
    }
    empty() {
      ;((this.index = 0), (this.parallelSuccessNumber = 0), (this.list = []), (this.parallelList = []), (this.delayNumber = 0))
    }
    start() {
      this.running || ((this.running = !0), (this.isComplete = !1), this.run())
    }
    pause() {
      ;(clearTimeout(this.timer), (this.timer = null), (this.running = !1))
    }
    resume() {
      this.start()
    }
    skip() {
      ;(this.index++, this.resume())
    }
    stop() {
      ;((this.isComplete = !0),
        this.list.forEach(t => {
          t.isComplete || t.run()
        }),
        this.pause(),
        this.empty())
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
              ;(this.onTask(t), this.index++, t.isCancel ? this.runTask() : this.nextTask())
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
          ;(this.onTask(t), this.fillParallelTask())
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
      ;((this.parallelList = []), (this.parallelSuccessNumber = 0))
      let n = s + e.parallel
      if ((n > i.length && (n = i.length), e.parallel > 1))
        for (let e = s; e < n && ((t = i[e]), t.parallel); e++) this.parallelList.push(t)
    }
    fillParallelTask() {
      let t
      const e = this.parallelList
      ;(this.parallelSuccessNumber++, e.pop())
      const i = e.length,
        s = this.finishedIndex + i
      if (e.length) {
        if (!this.running) return
        s < this.total && ((t = this.list[s]), t && t.parallel && (e.push(t), this.runParallelTask(t)))
      } else ((this.index += this.parallelSuccessNumber), (this.parallelSuccessNumber = 0), this.nextTask())
    }
    onComplete() {
      ;(this.stop(), this.config.onComplete && this.config.onComplete())
    }
    onTask(t) {
      ;(t.complete(), this.config.onTask && this.config.onTask())
    }
    onParallelError(t) {
      ;(this.parallelList.forEach(t => {
        t.parallel = !1
      }),
        (this.parallelList.length = 0),
        (this.parallelSuccessNumber = 0),
        this.onError(t))
    }
    onError(t) {
      ;(this.pause(), this.config.onError && this.config.onError(t))
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
        ;(io.map[t] && to.repeat(t), (io.map[t] = e))
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
        return (e || eo.set(t.url, (e = de.image(t))), e.use++, e)
      },
      recycle(t) {
        ;(t.use--,
          setTimeout(() => {
            t.use || (w.image.isLarge(t) ? t.url && eo.remove(t.url) : (t.clearLevels(), no.recycledList.push(t)))
          }))
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
      ;(so.isFormat('svg', t) && (this.isSVG = !0), so.hasAlphaPixel(t) && (this.hasAlphaPixel = !0))
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
                  ;(i && this.setThumbView(t), this.setView(t))
                })
                .catch(t => {
                  ;((this.error = t), this.onComplete(!1))
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
      ;((this.ready = !0), this.width || ((this.width = t.width), (this.height = t.height), (this.view = t)), this.onComplete(!0))
    }
    onComplete(t) {
      let e
      ;(this.waitComplete.forEach((i, s) => {
        ;((e = s % 2), i && (t ? e || i(this) : e && i(this.error)))
      }),
        (this.waitComplete.length = 0),
        (this.loading = !1))
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
      return ((this.cache = this.use > 1 ? { data: a, params: arguments } : null), a)
    }
    getPattern(t, e, i, s) {
      const n = w.canvas.createPattern(t, e)
      return (w.image.setPatternTransform(n, i, s), n)
    }
    getLoadUrl(t) {
      return this.url
    }
    setThumbView(t) {}
    getThumbSize(t) {}
    getMinLevel() {}
    getLevelData(t, e, i) {}
    clearLevels(t) {}
    destroy() {
      this.clearLevels()
      const { view: t } = this
      ;(t && t.close && t.close(), (this.config = { url: '' }), (this.cache = this.view = null), (this.waitComplete.length = 0))
    }
  }
  function ho(t, e, i, s) {
    ;(s || (i.configurable = i.enumerable = !0), Object.defineProperty(t, e, i))
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
    ;(ho(t, e, Object.assign(n, s || {})), No(t, e, i))
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
    ;(t.__layout.boxChanged || t.__layout.boxChange(),
      t.__hasAutoLayout && (t.__layout.matrixChanged || t.__layout.matrixChange()))
  }
  function To(t) {
    return uo(t, t => ({
      set(e) {
        const i = this.__
        ;(2 !== i.__pathInputed && (i.__pathInputed = e ? 1 : 0),
          e || (i.__pathForRender = void 0),
          this.__setAttr(t, e),
          Eo(this))
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
    ;(t.__layout.strokeChanged || t.__layout.strokeChange(), t.__.__useArrow && Eo(t))
  }
  const Po = ko
  function Lo(t) {
    return uo(t, t => ({
      set(e) {
        ;(this.__setAttr(t, e), this.__layout.renderChanged || this.__layout.renderChange())
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
          ;(_.stintSet(t, '__useDim', t.dim || t.bright || t.dimskip), this.__layout.surfaceChange())
        }
      }
    }))
  }
  function Oo(t) {
    return uo(t, t => ({
      set(e) {
        ;(this.__setAttr(t, e) && (this.__layout.opacityChanged || this.__layout.opacityChange()), this.mask && Do(this))
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
        ;(Mo(this, t, e, i), this.mask && Do(this))
      }
    }))
  }
  function Do(t) {
    const { parent: e } = t
    if (e) {
      const { __hasMask: t } = e
      ;(e.__updateMask(), t !== e.__hasMask && e.forceUpdate())
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
        ;(this.__setAttr(t, e), this.leafer && this.leafer.updateCursor())
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
    for (; !l && d; ) ((l = lo(d, e)), (d = d.__proto__))
    ;(l && l.set && (a.set = l.set), s[r] && ((a.set = s[r]), delete s[r]), ho(s, e, a))
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
        ;(t && Yo.error(e.name, '需在Class上装饰@rewriteAble()'), e.run())
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
        ;(e
          ? i && ((s.waitAutoLayout = !0), t.__hasAutoLayout && (s.matrixChanged = !1))
          : s.waitAutoLayout && (s.waitAutoLayout = !1),
          s.matrixChanged && t.__updateLocalMatrix(),
          s.waitAutoLayout || t.__updateWorldMatrix())
      },
      updateBounds(t) {
        const e = t.__layout
        ;(e.boundsChanged && t.__updateLocalBounds(), e.waitAutoLayout || t.__updateWorldBounds())
      },
      updateAllWorldOpacity(t) {
        if ((t.__updateWorldOpacity(), t.isBranch)) {
          const { children: e } = t
          for (let t = 0, i = e.length; t < i; t++) pr(e[t])
        }
      },
      updateChange(t) {
        const e = t.__layout
        ;(e.stateStyleChanged && t.updateState(), e.opacityChanged && pr(t), t.__updateChange())
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
        ;(s || (s = t.__nowWorld),
          t.__worldFlipped || w.fullImageShadow
            ? e.copyWorldByReset(i, s, t.__nowWorld, n, o)
            : e.copyWorldToInner(i, s, t.__layout.renderBounds, n))
      },
      moveWorld(t, e, i = 0, s, n) {
        const o = u(e) ? Object.assign({}, e) : { x: e, y: i }
        ;(s ? tr(t.localTransform, o, o, !0) : t.parent && Qo(t.parent.scrollWorldTransform, o, o, !0),
          dr.moveLocal(t, o.x, o.y, n))
      },
      moveLocal(t, e, i = 0, s) {
        ;(u(e) && ((i = e.y), (e = e.x)),
          (e += t.x),
          (i += t.y),
          t.leafer && t.leafer.config.pointSnap && ((e = hr(e)), (i = hr(i))),
          s ? t.animate({ x: e, y: i }, s) : ((t.x = e), (t.y = i)))
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
        ;(Jo(ar, n),
          ir(ar, e, i),
          dr.hasHighPosition(t)
            ? dr.setTransform(t, ar, !1, s)
            : t.set({ x: t.x + ar.e - n.e, y: t.y + ar.f - n.f, rotation: z.formatRotation(t.rotation + i) }, s))
      },
      skewOfWorld(t, e, i, s, n, o) {
        dr.skewOfLocal(t, fr(t, e), i, s, n, o)
      },
      skewOfLocal(t, e, i, s = 0, n, o) {
        ;(Jo(ar, t.__localMatrix), sr(ar, e, i, s), dr.setTransform(t, ar, n, o))
      },
      transformWorld(t, e, i, s) {
        ;(Jo(ar, t.worldTransform), nr(ar, e), t.parent && or(ar, t.parent.scrollWorldTransform), dr.setTransform(t, ar, i, s))
      },
      transform(t, e, i, s) {
        ;(Jo(ar, t.localTransform), nr(ar, e), dr.setTransform(t, ar, i, s))
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
          ;(t.set(r), t.scaleResize(e, i, !1))
        } else t.set(r, s)
      },
      getFlipTransform(t, e) {
        const i = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 },
          s = 'x' === e ? 1 : -1
        return (er(i, dr.getLocalOrigin(t, 'center'), -1 * s, 1 * s), i)
      },
      getLocalOrigin: (t, e) => ut.tempToOuterOf(dr.getInnerOrigin(t, e), t.localTransform),
      getInnerOrigin(t, e) {
        const i = {}
        return (Bt.toPoint(e, t.boxBounds, i), i)
      },
      getRelativeWorld: (t, e, i) => (Jo(ar, t.worldTransform), or(ar, e.scrollWorldTransform), i ? ar : Object.assign({}, ar)),
      drop(t, e, i, s) {
        ;(t.setTransform(dr.getRelativeWorld(t, e, !0), s), e.add(t, i))
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
            ;((e.x -= s), (e.y -= n), t.move(s, n), w.requestRender(() => dr.animateMove(t, e, i)))
          }
      }
    },
    dr = lr,
    { updateAllMatrix: cr, updateMatrix: ur, updateAllWorldOpacity: pr, updateAllChange: gr, updateChange: _r } = dr
  function fr(t, e) {
    return (t.updateLayout(), t.parent ? ut.tempToInnerOf(e, t.parent.scrollWorldTransform) : e)
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
    return (e || (yr = 0), t.__.mask && (yr = 1), yr < 0 ? null : (yr && (yr = -1), !0))
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
        if (i) for (; t.parent && n(i[t.parent.innerId]); ) (e.add(t.parent), (t = t.parent))
        else for (; t.parent; ) (e.add(t.parent), (t = t.parent))
      },
      pushAllBranchStack(t, e) {
        let i = e.length
        const { children: s } = t
        for (let t = 0, i = s.length; t < i; t++) s[t].isBranch && e.push(s[t])
        for (let t = i, s = e.length; t < s; t++) Er(e[t], e)
      },
      updateBounds(t, e) {
        const i = [t]
        ;(Er(t, i), Tr(i, e))
      },
      updateBoundsByBranchStack(t, e) {
        let i, s
        for (let n = t.length - 1; n > -1; n--) {
          ;((i = t[n]), (s = i.children))
          for (let t = 0, e = s.length; t < e; t++) wr(s[t])
          ;(e && e === i) || wr(i)
        }
      },
      move(t, e, i) {
        let s
        const { children: n } = t
        for (let o = 0, r = n.length; o < r; o++)
          ((s = (t = n[o]).__world), (s.e += e), (s.f += i), (s.x += e), (s.y += i), t.isBranch && Sr(t, e, i))
      },
      scale(t, e, i, s, n, o, r) {
        let a
        const { children: h } = t,
          l = s - 1,
          d = n - 1
        for (let c = 0, u = h.length; c < u; c++)
          ((a = (t = h[c]).__world),
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
            t.isBranch && kr(t, e, i, s, n, o, r))
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
      return (Rr(this.contentBounds, this.leaf.__localMatrix, this[Ar] || (this[Ar] = {})), this[Ar])
    }
    get localStrokeBounds() {
      return this._localStrokeBounds || this
    }
    get localRenderBounds() {
      return this._localRenderBounds || this
    }
    get worldContentBounds() {
      return (Rr(this.contentBounds, this.leaf.__world, this[Dr] || (this[Dr] = {})), this[Dr])
    }
    get worldBoxBounds() {
      return (Rr(this.boxBounds, this.leaf.__world, this[Mr] || (this[Mr] = {})), this[Mr])
    }
    get worldStrokeBounds() {
      return (Rr(this.strokeBounds, this.leaf.__world, this[Ir] || (this[Ir] = {})), this[Ir])
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
      ;((this.leaf = t),
        this.leaf.__local && (this._localRenderBounds = this._localStrokeBounds = this.leaf.__local),
        t.__world && ((this.boxBounds = { x: 0, y: 0, width: 0, height: 0 }), this.boxChange(), this.matrixChange()))
    }
    createLocal() {
      const t = (this.leaf.__local = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0, x: 0, y: 0, width: 0, height: 0 })
      ;(this._localStrokeBounds || (this._localStrokeBounds = t), this._localRenderBounds || (this._localRenderBounds = t))
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
        ;((i.__fullLayouting = !0), w.layout(i), delete i.__fullLayouting)
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
          ;((n = s.getWorldPoint(a)), (o = s.__world))
          break
        case 'local':
          const { scaleX: t, scaleY: i, rotation: h, skewX: l, skewY: d } = s.__
          ;((r = { scaleX: t, scaleY: i, rotation: h, skewX: l, skewY: d }), (n = s.getLocalPointByInner(a)))
          break
        case 'inner':
          ;((n = a), (o = tt.defaultMatrix))
          break
        case 'page':
          e = s.zoomLayer
        default:
          ;((n = s.getWorldPoint(a, e)), (o = Pr(s, e, !0)))
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
      return (n(o) || s.forEach(t => i.innerToWorld(t, null, !1, o)), s)
    }
    shrinkContent() {
      const { x: t, y: e, width: i, height: s } = this.boxBounds
      this._contentBounds = { x: t, y: e, width: i, height: s }
    }
    spreadStroke() {
      const { x: t, y: e, width: i, height: s } = this.strokeBounds
      ;((this._strokeBounds = { x: t, y: e, width: i, height: s }),
        (this._localStrokeBounds = { x: t, y: e, width: i, height: s }),
        this.renderSpread || this.spreadRenderCancel())
    }
    spreadRender() {
      const { x: t, y: e, width: i, height: s } = this.renderBounds
      ;((this._renderBounds = { x: t, y: e, width: i, height: s }),
        (this._localRenderBounds = { x: t, y: e, width: i, height: s }))
    }
    shrinkContentCancel() {
      this._contentBounds = void 0
    }
    spreadStrokeCancel() {
      const t = this.renderBounds === this.strokeBounds
      ;((this._strokeBounds = this.boxBounds),
        (this._localStrokeBounds = this.leaf.__localBoxBounds),
        t && this.spreadRenderCancel())
    }
    spreadRenderCancel() {
      ;((this._renderBounds = this._strokeBounds), (this._localRenderBounds = this._localStrokeBounds))
    }
    boxChange() {
      ;((this.boxChanged = !0),
        this.localBoxChanged ? this.boundsChanged || (this.boundsChanged = !0) : this.localBoxChange(),
        (this.hitCanvasChanged = !0))
    }
    localBoxChange() {
      ;((this.localBoxChanged = !0), (this.boundsChanged = !0))
    }
    strokeChange() {
      ;((this.strokeChanged = !0),
        this.strokeSpread || (this.strokeSpread = 1),
        (this.boundsChanged = !0),
        (this.hitCanvasChanged = !0))
    }
    renderChange() {
      ;((this.renderChanged = !0), this.renderSpread || (this.renderSpread = 1), (this.boundsChanged = !0))
    }
    scaleChange() {
      ;((this.scaleChanged = !0), this._scaleOrRotationChange())
    }
    rotationChange() {
      ;((this.rotationChanged = !0), (this.affectRotation = !0), this._scaleOrRotationChange())
    }
    _scaleOrRotationChange() {
      ;((this.affectScaleOrRotation = !0), this.matrixChange(), this.leaf.__local || this.createLocal())
    }
    matrixChange() {
      ;((this.matrixChanged = !0), this.localBoxChanged ? this.boundsChanged || (this.boundsChanged = !0) : this.localBoxChange())
    }
    surfaceChange() {
      this.surfaceChanged = !0
    }
    opacityChange() {
      ;((this.opacityChanged = !0), this.surfaceChanged || this.surfaceChange())
    }
    childrenSortChange() {
      this.childrenSortChanged || ((this.childrenSortChanged = this.affectChildrenSort = !0), this.leaf.forceUpdate('surface'))
    }
    destroy() {}
  }
  class Wr {
    constructor(t, e) {
      ;((this.bubbles = !1), (this.type = t), e && (this.target = e))
    }
    stopDefault() {
      ;((this.isStopDefault = !0), this.origin && w.event.stopDefault(this.origin))
    }
    stopNow() {
      ;((this.isStopNow = !0), (this.isStop = !0), this.origin && w.event.stopNow(this.origin))
    }
    stop() {
      ;((this.isStop = !0), this.origin && w.event.stop(this.origin))
    }
  }
  class zr extends Wr {
    constructor(t, e, i) {
      ;(super(t, e), (this.parent = i), (this.child = e))
    }
  }
  ;((zr.ADD = 'child.add'),
    (zr.REMOVE = 'child.remove'),
    (zr.CREATED = 'created'),
    (zr.MOUNTED = 'mounted'),
    (zr.UNMOUNTED = 'unmounted'),
    (zr.DESTROY = 'destroy'))
  const Ur = 'property.scroll'
  class Hr extends Wr {
    constructor(t, e, i, s, n) {
      ;(super(t, e), (this.attrName = i), (this.oldValue = s), (this.newValue = n))
    }
  }
  ;((Hr.CHANGE = 'property.change'), (Hr.LEAFER_CHANGE = 'property.leafer_change'), (Hr.SCROLL = Ur))
  const Nr = { scrollX: Ur, scrollY: Ur }
  class Yr extends Wr {
    constructor(t, e) {
      ;(super(t), Object.assign(this, e))
    }
  }
  ;((Yr.LOAD = 'image.load'), (Yr.LOADED = 'image.loaded'), (Yr.ERROR = 'image.error'))
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
        ;('local' !== e && (t.emit(Vr, t), 'inner' === e && t.emit(Gr, t)), t.emit(jr, t))
      }
    }
    static emitWorld(t) {
      t.leaferIsReady && t.emit(Kr, this)
    }
  }
  ;((Xr.RESIZE = 'bounds.resize'), (Xr.INNER = 'bounds.inner'), (Xr.LOCAL = 'bounds.local'), (Xr.WORLD = 'bounds.world'))
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
      ;(u(t) ? (super(Zr.RESIZE), Object.assign(this, t)) : super(t), (this.old = e))
    }
    static isResizing(t) {
      return this.resizingKeys && !n(this.resizingKeys[t.innerId])
    }
  }
  Zr.RESIZE = 'resize'
  class $r extends Wr {
    constructor(t, e) {
      ;(super(t), (this.data = e))
    }
  }
  ;(($r.REQUEST = 'watch.request'), ($r.DATA = 'watch.data'))
  class Jr extends Wr {
    constructor(t, e, i) {
      ;(super(t), e && ((this.data = e), (this.times = i)))
    }
  }
  ;((Jr.REQUEST = 'layout.request'),
    (Jr.START = 'layout.start'),
    (Jr.BEFORE = 'layout.before'),
    (Jr.LAYOUT = 'layout'),
    (Jr.AFTER = 'layout.after'),
    (Jr.AGAIN = 'layout.again'),
    (Jr.END = 'layout.end'))
  class Qr extends Wr {
    constructor(t, e, i, s) {
      ;(super(t), e && (this.times = e), i && ((this.renderBounds = i), (this.renderOptions = s)))
    }
  }
  ;((Qr.REQUEST = 'render.request'),
    (Qr.CHILD_START = 'render.child_start'),
    (Qr.CHILD_END = 'render.child_end'),
    (Qr.START = 'render.start'),
    (Qr.BEFORE = 'render.before'),
    (Qr.RENDER = 'render'),
    (Qr.AFTER = 'render.after'),
    (Qr.AGAIN = 'render.again'),
    (Qr.END = 'render.end'),
    (Qr.NEXT = 'render.next'))
  class ta extends Wr {}
  ;((ta.START = 'leafer.start'),
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
    (ta.SKEW = 'leafer.skew'))
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
            ;(t && delete t[i], e && delete e[i])
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
      ;(e.forEach(t => {
        t &&
          (t.listener
            ? t.current.off(t.type, t.listener, t.options)
            : c(t.type) && t.type.forEach(e => t.current.off(e[0], e[1], e[3])))
      }),
        (e.length = 0))
    }
    once(t, e, i, s) {
      if (!e) return c(t) && t.forEach(t => this.once(t[0], t[1], t[2], t[3]))
      ;(u(i) ? (e = e.bind(i)) : (s = i), this.on(t, e, { once: !0, capture: s }))
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
      ;((t.current = this), this.emit(t.type, t, e))
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
            return (i && this.emitPropertyEvent(i, t, s, e), !0)
          }
          return !1
        }
        return (this.__realSetAttr(t, e), !0)
      },
      emitPropertyEvent(t, e, i, s) {
        const n = new Hr(t, this, e, i, s)
        ;(this.isLeafer || (this.hasEvent(t) && this.emitEvent(n)), this.leafer.emitEvent(n))
      },
      __realSetAttr(t, e) {
        const i = this.__
        ;((i[t] = e),
          this.__proxyData && this.setProxyAttr(t, e),
          i.normalStyle && (this.lockNormalStyle || n(i.normalStyle[t]) || (i.normalStyle[t] = e)))
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
        ;(ba(this.__local || e, t ? t.__scrollWorld || t.__world : Ta, i, !!e.affectScaleOrRotation, n),
          s && Ea(Object.assign(s, i), n.scrollX, n.scrollY))
      },
      __updateLocalMatrix() {
        if (this.__local) {
          const t = this.__layout,
            e = this.__local,
            i = this.__
          ;(t.affectScaleOrRotation &&
            ((t.scaleChanged && (t.resized || (t.resized = 'scale'))) || t.rotationChanged) &&
            (xa(e, i, null, null, t.affectRotation), (t.scaleChanged = t.rotationChanged = void 0)),
            (e.e = i.x + i.offsetX),
            (e.f = i.y + i.offsetY),
            (i.around || i.origin) && (Sa(i.around || i.origin, t.boxBounds, ka), Ea(e, -ka.x, -ka.y, !i.around)))
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
        ;(Ca(t.renderBounds, e, e),
          t.resized &&
            ('inner' === t.resized && this.__onUpdateSize(), this.__hasLocalEvent && Xr.emitLocal(this), (t.resized = void 0)),
          this.__hasWorldEvent && Xr.emitWorld(this))
      },
      __updateLocalBounds() {
        const t = this.__layout
        ;(t.boxChanged &&
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
          (t.boundsChanged = void 0))
      },
      __updateLocalBoxBounds() {
        ;(this.__hasMotionPath && this.__updateMotionPath(),
          this.__hasAutoLayout && this.__updateAutoLayout(),
          Ca(this.__layout.boxBounds, this.__local, this.__local))
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
        ;((this.__layout.matrixChanged = !0),
          this.isBranch
            ? (this.__extraUpdate(),
              this.__.flow
                ? (this.__layout.boxChanged && this.__updateFlowLayout(),
                  La(this),
                  Ra(this, this),
                  this.__.__autoSide && this.__updateBoxBounds(!0))
                : (La(this), Ra(this, this)))
            : Pa(this))
      },
      __updateNaturalSize() {
        const { __: t, __layout: e } = this
        ;((t.__naturalWidth = e.boxBounds.width), (t.__naturalHeight = e.boxBounds.height))
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
            ;(this.__draw(s, e, t),
              lr.copyCanvasByWorld(this, t, s, this.__nowWorld, i.__blendMode, !0),
              s.recycle(this.__nowWorld))
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
        ;((this.__worldOpacity = this.__.visible
          ? this.parent
            ? this.parent.__worldOpacity * this.__.opacity
            : this.__.opacity
          : 0),
          this.__layout.opacityChanged && (this.__layout.opacityChanged = !1))
      }
    },
    { excludeRenderBounds: Fa } = mr,
    Wa = {
      __updateChange() {
        const { __layout: t } = this
        ;(t.childrenSortChanged && (this.__updateSortChildren(), (t.childrenSortChanged = !1)), this.__.__checkSingle())
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
            ;((t.opacity = e.dimOpacity ? i.opacity * e.dimOpacity : i.opacity),
              t.copyWorldByReset(s, n, n, i.__blendMode, !0),
              s.recycle(n))
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
  ;((t.Leaf = class {
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
      return (this.updateLayout(), this.__scrollWorld || this.__world)
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
      return (this.updateLayout(), this.__worldOpacity)
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
      ;((this.innerId = Ha(Ua)), this.reset(t), this.__bubbleMap && this.__emitLifeEvent(zr.CREATED))
    }
    reset(t) {
      ;(this.leafer && this.leafer.forceRender(this.__world),
        0 !== t &&
          ((this.__world = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0, x: 0, y: 0, width: 0, height: 0, scaleX: 1, scaleY: 1 }),
          null !== t && (this.__local = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0, x: 0, y: 0, width: 0, height: 0 })),
        (this.__worldOpacity = 1),
        (this.__ = new this.__DataProcessor(this)),
        (this.__layout = new this.__LayoutProcessor(this)),
        this.__level && this.resetCustom(),
        t && (t.__ && (t = t.toJSON()), t.children ? this.set(t) : Object.assign(this, t)))
    }
    resetCustom() {
      ;((this.__hasMask = this.__hasEraser = null), this.forceUpdate())
    }
    waitParent(t, e) {
      ;(e && (t = t.bind(e)), this.parent ? t() : this.on(zr.ADD, t, 'once'))
    }
    waitLeafer(t, e) {
      ;(e && (t = t.bind(e)), this.leafer ? t() : this.on(zr.MOUNTED, t, 'once'))
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
      return (t && this.__layout.update(), this.__.__getInputData(null, t))
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
      ;((this.__[t] = n(e) ? null : void 0), (this[t] = e))
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
      ;(t.save(), this.__clip(t, e))
      const { renderBounds: i } = this.__layout
      ;(t.clearRect(i.x, i.y, i.width, i.height), t.restore())
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
      return (t < 0 && (t = -t), t > 1 ? t : 1)
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
      return (Ga(t, s, n), n)
    }
    worldToLocal(t, e, i, s) {
      this.parent ? this.parent.worldToInner(t, e, i, s) : e && ja(e, t)
    }
    localToWorld(t, e, i, s) {
      this.parent ? this.parent.innerToWorld(t, e, i, s) : e && ja(e, t)
    }
    worldToInner(t, e, i, s) {
      ;(s && (s.innerToWorld(t, e, i), (t = e || t)), Ya(this.scrollWorldTransform, t, e, i))
    }
    innerToWorld(t, e, i, s) {
      ;(Xa(this.scrollWorldTransform, t, e, i), s && s.worldToInner(e || t, null, i))
    }
    getBoxPoint(t, e, i, s) {
      return this.getBoxPointByInner(this.getInnerPoint(t, e, i, s), null, null, !0)
    }
    getBoxPointByInner(t, e, i, s) {
      const n = s ? t : Object.assign({}, t),
        { x: o, y: r } = this.boxBounds
      return (Ka(n, -o, -r), n)
    }
    getInnerPoint(t, e, i, s) {
      const n = s ? t : {}
      return (this.worldToInner(t, n, i, e), n)
    }
    getInnerPointByBox(t, e, i, s) {
      const n = s ? t : Object.assign({}, t),
        { x: o, y: r } = this.boxBounds
      return (Ka(n, o, r), n)
    }
    getInnerPointByLocal(t, e, i, s) {
      return this.getInnerPoint(t, this.parent, i, s)
    }
    getLocalPoint(t, e, i, s) {
      const n = s ? t : {}
      return (this.worldToLocal(t, n, i, e), n)
    }
    getLocalPointByInner(t, e, i, s) {
      return this.getWorldPoint(t, this.parent, i, s)
    }
    getPagePoint(t, e, i, s) {
      return (this.leafer ? this.leafer.zoomLayer : this).getInnerPoint(t, e, i, s)
    }
    getWorldPoint(t, e, i, s) {
      const n = s ? t : {}
      return (this.innerToWorld(t, n, i, e), n)
    }
    getWorldPointByBox(t, e, i, s) {
      return this.getWorldPoint(this.getInnerPointByBox(t, null, null, s), e, i, !0)
    }
    getWorldPointByLocal(t, e, i, s) {
      const n = s ? t : {}
      return (this.localToWorld(t, n, i, e), n)
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
      ;((this.scaleX *= t), (this.scaleY *= e))
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
      ;(i || (i = xo), i(e, s)(this.prototype, t))
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
    (t.Leaf = ye([qo(wa), qo(Ba), qo(Ma), qo(ya), qo(Ia)], t.Leaf)))
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
  ;((t.Branch = class extends t.Leaf {
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
        for (let i = 0, s = e.length; i < s; i++) ((e[i].__tempNumber = i), e[i].__.zIndex && (t = !0))
        ;(e.sort(ch), (this.__layout.affectChildrenSort = t))
      }
    }
    add(t, e) {
      if (t === this || t.destroyed) return yh.warn('add self or destroyed')
      const i = n(e)
      if (!t.__) {
        if (c(t))
          return t.forEach(t => {
            ;(this.add(t, e), i || e++)
          })
        t = ue.get(t.tag, t)
      }
      ;(t.parent && t.parent.remove(t),
        (t.parent = this),
        i ? this.children.push(t) : this.children.splice(e, 0, t),
        t.isBranch && (this.__.__childBranchNumber = (this.__.__childBranchNumber || 0) + 1))
      const s = t.__layout
      ;(s.boxChanged || s.boxChange(),
        s.matrixChanged || s.matrixChange(),
        t.__bubbleMap && t.__emitLifeEvent(zr.ADD),
        this.leafer && (t.__bindLeafer(this.leafer), this.leafer.created && this.__emitChildEvent(zr.ADD, t)),
        this.__layout.affectChildrenSort && this.__layout.childrenSortChange())
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
          ;(this.__realRemoveChild(e), t && e.destroy())
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
      ;(this.__hasMask && this.__updateMask(),
        this.__hasEraser && this.__updateEraser(),
        this.__layout.boxChange(),
        this.__layout.affectChildrenSort && this.__layout.childrenSortChange())
    }
    __realRemoveChild(t) {
      ;(t.__emitLifeEvent(zr.REMOVE),
        (t.parent = null),
        this.leafer &&
          (t.__bindLeafer(null),
          this.leafer.created &&
            (this.__emitChildEvent(zr.REMOVE, t), this.leafer.hitCanvasManager && this.leafer.hitCanvasManager.clear())))
    }
    __emitChildEvent(t, e) {
      const i = new zr(t, e, this)
      ;(this.hasEvent(t) && !this.isLeafer && this.emitEvent(i), this.leafer.emitEvent(i))
    }
  }),
    (t.Branch = ye([qo(Wa)], t.Branch)))
  class vh {
    get length() {
      return this.list.length
    }
    constructor(t) {
      ;(this.reset(), t && (c(t) ? this.addList(t) : this.add(t)))
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
        ;(0 === e ? s.unshift(t) : (e > s.length && (e = s.length), s.splice(e, 0, t)), (i[t.innerId] = e))
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
      return ((t.list = [...this.list]), (t.keys = Object.assign({}, this.keys)), t)
    }
    update() {
      this.keys = {}
      const { list: t, keys: e } = this
      for (let i = 0, s = t.length; i < s; i++) e[t[i].innerId] = i
    }
    reset() {
      ;((this.list = []), (this.keys = {}))
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
      ;((this._length = 0), this.reset(), t && (c(t) ? this.addList(t) : this.add(t)))
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
      ;((this.levelMap = {}), (this.keys = {}), (this.levels = []), (this._length = 0))
    }
    destroy() {
      this.levelMap = null
    }
  }
  const xh = ie.get('LeaferCanvas')
  class bh extends Ae {
    set zIndex(t) {
      const { style: e } = this.view
      ;((e.zIndex = t), this.setAbsolute(this.view))
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
        ;((t.webkitUserSelect = t.userSelect = 'none'), this.view.classList.add('leafer-canvas-view'))
      }
      ;(w.syncDomFont && !this.parentView && ((i.display = 'none'), document.body && document.body.appendChild(this.view)),
        this.__createContext(),
        this.autoLayout || this.resize(t))
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
            ;((i.position = 'absolute'), (i.top = i.bottom = i.left = i.right = '0px'), document.body.appendChild(e), (t = e))
          }
          this.__createView()
          const i = this.view
          ;(t.hasChildNodes() && (this.setAbsolute(i), t.style.position || (t.style.position = 'relative')), t.appendChild(i))
        }
      else (xh.error(`no id: ${t}`), this.__createView())
    }
    setAbsolute(t) {
      const { style: e } = t
      ;((e.position = 'absolute'), (e.top = e.left = '0px'))
    }
    updateViewSize() {
      const { width: t, height: e, pixelRatio: i } = this,
        { style: s } = this.view
      ;((s.width = t + 'px'),
        (s.height = e + 'px'),
        this.unreal || ((this.view.width = Math.ceil(t * i)), (this.view.height = Math.ceil(e * i))))
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
      } else (this.listenPixelRatio(), this.unreal && this.updateViewSize())
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
        ;((t.marginLeft = i + 'px'), (t.marginTop = s + 'px'), this.emitResize(r))
      }
    }
    stopAutoLayout() {
      ;((this.autoLayout = !1),
        this.resizeObserver && this.resizeObserver.disconnect(),
        (this.resizeListener = this.resizeObserver = null))
    }
    emitResize(t) {
      const e = {}
      ;(_.copyAttrs(e, this, Oe), this.resize(t), this.resizeListener && !n(this.width) && this.resizeListener(new Zr(t, e)))
    }
    unrealCanvas() {
      if (!this.unreal && this.parentView) {
        let t = this.view
        ;(t && t.remove(),
          (t = this.view = document.createElement('div')),
          this.parentView.appendChild(this.view),
          t.classList.add('leafer-app-view'),
          (this.unreal = !0))
      }
    }
    destroy() {
      const { view: t } = this
      t && (this.stopAutoLayout(), this.stopListenPixelRatio(), t.parentElement && t.remove(), super.destroy())
    }
  }
  ;(Kn(CanvasRenderingContext2D.prototype), Kn(Path2D.prototype))
  const { mineType: Eh, fileType: Th } = qn
  function Sh(t, e) {
    ;((w.origin = {
      createCanvas(t, e) {
        const i = document.createElement('canvas')
        return ((i.width = t), (i.height = e), i)
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
          ;((s.href = t), (s.download = e), document.body.appendChild(s), s.click(), document.body.removeChild(s), i())
        }),
      loadImage: t =>
        new Promise((e, i) => {
          const s = new w.origin.Image(),
            { crossOrigin: n } = w.image
          ;(n && (s.setAttribute('crossOrigin', n), (s.crossOrigin = n)),
            (s.onload = () => {
              e(s)
            }),
            (s.onerror = t => {
              i(t)
            }),
            (s.src = w.image.getRealURL(t)))
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
      (w.conicGradientSupport = !!w.canvas.context.createConicGradient))
  }
  ;(Object.assign(de, { canvas: (t, e) => new bh(t, e), image: t => new ao(t) }),
    (w.name = 'web'),
    (w.isMobile = 'ontouchstart' in window),
    (w.requestRender = function (t) {
      window.requestAnimationFrame(t)
    }),
    ho(w, 'devicePixelRatio', { get: () => devicePixelRatio }))
  const { userAgent: kh } = navigator
  ;(kh.indexOf('Firefox') > -1
    ? ((w.conicGradientRotate90 = !0), (w.intWheelDeltaY = !0), (w.syncDomFont = !0))
    : (/iPhone|iPad|iPod/.test(navigator.userAgent) ||
        (/Macintosh/.test(navigator.userAgent) && /Version\/[\d.]+.*Safari/.test(navigator.userAgent))) &&
      (w.fullImageShadow = !0),
    kh.indexOf('Windows') > -1
      ? ((w.os = 'Windows'), (w.intWheelDeltaY = !0))
      : kh.indexOf('Mac') > -1
        ? (w.os = 'Mac')
        : kh.indexOf('Linux') > -1 && (w.os = 'Linux'))
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
      ;((this.totalTimes = 0),
        (this.config = {}),
        (this.__updatedList = new vh()),
        (this.target = t),
        e && (this.config = _.default(e, this.config)),
        this.__listenEvents())
    }
    start() {
      this.disabled || (this.running = !0)
    }
    stop() {
      this.running = !1
    }
    disable() {
      ;(this.stop(), this.__removeListenEvents(), (this.disabled = !0))
    }
    update() {
      ;((this.changed = !0), this.running && this.target.emit(Qr.REQUEST))
    }
    __onAttrChange(t) {
      ;(this.config.usePartLayout && this.__updatedList.add(t.target), this.update())
    }
    __onChildEvent(t) {
      ;(this.config.usePartLayout &&
        (t.type === zr.ADD
          ? ((this.hasAdd = !0), this.__pushChild(t.child))
          : ((this.hasRemove = !0), this.__updatedList.add(t.parent))),
        this.update())
    }
    __pushChild(t) {
      ;(this.__updatedList.add(t), t.isBranch && this.__loopChildren(t))
    }
    __loopChildren(t) {
      const { children: e } = t
      for (let t = 0, i = e.length; t < i; t++) this.__pushChild(e[t])
    }
    __onRquestData() {
      ;(this.target.emitEvent(new $r($r.DATA, { updatedList: this.updatedList })),
        (this.__updatedList = new vh()),
        this.totalTimes++,
        (this.changed = this.hasVisible = this.hasRemove = this.hasAdd = !1))
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
      ;((this.updatedBounds = new $t()),
        (this.beforeBounds = new $t()),
        (this.afterBounds = new $t()),
        c(t) && (t = new vh(t)),
        (this.updatedList = t))
    }
    setBefore() {
      this.beforeBounds.setListWithFn(this.updatedList.list, Ah)
    }
    setAfter() {
      ;(this.afterBounds.setListWithFn(this.updatedList.list, Ah),
        this.updatedBounds.setList([this.beforeBounds, this.afterBounds]))
    }
    merge(t) {
      ;(this.updatedList.addList(t.updatedList.list),
        this.beforeBounds.add(t.beforeBounds),
        this.afterBounds.add(t.afterBounds),
        this.updatedBounds.add(t.updatedBounds))
    }
    destroy() {
      this.updatedList = null
    }
  }
  const { updateAllMatrix: Mh, updateAllChange: Ih } = lr,
    Fh = ie.get('Layouter')
  class Wh {
    constructor(t, e) {
      ;((this.totalTimes = 0),
        (this.config = { usePartLayout: !0 }),
        (this.__levelList = new wh()),
        (this.target = t),
        e && (this.config = _.default(e, this.config)),
        this.__listenEvents())
    }
    start() {
      this.disabled || (this.running = !0)
    }
    stop() {
      this.running = !1
    }
    disable() {
      ;(this.stop(), this.__removeListenEvents(), (this.disabled = !0))
    }
    layout() {
      if (this.layouting || !this.running) return
      const { target: t } = this
      this.times = 0
      try {
        ;(t.emit(Jr.START), this.layoutOnce(), t.emitEvent(new Jr(Jr.END, this.layoutedBlocks, this.times)))
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
      ;(a.forEach(t => t.setBefore()),
        i.emitEvent(new Jr(n, a, this.times)),
        (this.extraBlock = null),
        s.sort(),
        (function (t, e) {
          let i
          t.list.forEach(t => {
            ;((i = t.__layout),
              e.without(t) &&
                !i.proxyZoom &&
                (i.matrixChanged
                  ? (Ph(t, !0), e.add(t), t.isBranch && Ch(t, e), Oh(t, e))
                  : i.boundsChanged && (e.add(t), t.isBranch && (t.__tempNumber = 0), Oh(t, e))))
          })
        })(s, this.__levelList),
        (function (t) {
          let e, i, s
          ;(t.sort(!0),
            t.levels.forEach(n => {
              e = t.levelMap[n]
              for (let t = 0, n = e.length; t < n; t++) {
                if (((i = e[t]), i.isBranch && i.__tempNumber)) {
                  s = i.children
                  for (let t = 0, e = s.length; t < e; t++) s[t].isBranch || Lh(s[t])
                }
                Lh(i)
              }
            }))
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
        re.end(e))
    }
    fullLayout() {
      const t = re.start('FullLayout'),
        { target: e } = this,
        { BEFORE: i, LAYOUT: s, AFTER: n } = Jr,
        o = this.getBlocks(new vh(e))
      ;(e.emitEvent(new Jr(i, o, this.times)),
        Wh.fullLayout(e),
        o.forEach(t => {
          t.setAfter()
        }),
        e.emitEvent(new Jr(s, o, this.times)),
        e.emitEvent(new Jr(n, o, this.times)),
        this.addBlocks(o),
        re.end(t))
    }
    static fullLayout(t) {
      ;(Mh(t, !0), t.isBranch ? xr.updateBounds(t) : lr.updateBounds(t), Ih(t))
    }
    addExtra(t) {
      if (!this.__updatedList.has(t)) {
        const { updatedList: e, beforeBounds: i } = this.extraBlock || (this.extraBlock = new Dh([]))
        ;(e.length ? i.add(t.__world) : i.set(t.__world), e.add(t))
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
      ;((this.FPS = 60),
        (this.totalTimes = 0),
        (this.times = 0),
        (this.config = { usePartRender: !0, maxFPS: 120 }),
        (this.frames = []),
        (this.target = t),
        (this.canvas = e),
        i && (this.config = _.default(i, this.config)),
        this.__listenEvents())
    }
    start() {
      ;((this.running = !0), this.update(!1))
    }
    stop() {
      this.running = !1
    }
    update(t = !0) {
      ;(this.changed || (this.changed = t), this.requestTime || this.__requestRender())
    }
    requestLayout() {
      this.target.emit(Jr.REQUEST)
    }
    checkRender() {
      if (this.running) {
        const { target: t } = this
        ;(t.isApp &&
          (t.emit(Qr.CHILD_START, t),
          t.children.forEach(t => {
            ;((t.renderer.FPS = this.FPS), t.renderer.checkRender())
          }),
          t.emit(Qr.CHILD_END, t)),
          this.changed && this.canvas.view && this.render(),
          this.target.emit(Qr.NEXT))
      }
    }
    render(t) {
      if (!this.running || !this.canvas.view) return this.update()
      const { target: e } = this
      ;((this.times = 0), (this.totalBounds = new $t()), zh.log(e.innerName, '---\x3e'))
      try {
        ;(this.emitRender(Qr.START), this.renderOnce(t), this.emitRender(Qr.END, this.totalBounds), so.clearRecycled())
      } catch (t) {
        ;((this.rendering = !1), zh.error(t))
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
        (this.emitRender(Qr.BEFORE), t())
      else {
        if ((this.requestLayout(), this.ignore)) return void (this.ignore = this.rendering = !1)
        ;(this.emitRender(Qr.BEFORE), this.config.usePartRender && this.totalTimes > 1 ? this.partRender() : this.fullRender())
      }
      ;(this.emitRender(Qr.RENDER, this.renderBounds, this.renderOptions),
        this.emitRender(Qr.AFTER, this.renderBounds, this.renderOptions),
        (this.updateBlocks = null),
        (this.rendering = !1),
        this.waitAgain && ((this.waitAgain = !1), this.renderOnce()))
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
      ;(i.save(), s.spread(Uh.clipSpread).ceil(), i.clearWorld(s), i.clipWorld(s), this.__render(s, n), i.restore(), re.end(e))
    }
    fullRender() {
      const t = re.start('FullRender'),
        { canvas: e } = this
      ;(e.save(), e.clear(), this.__render(e.bounds), e.restore(), re.end(t))
    }
    __render(t, e) {
      const { canvas: i, target: s } = this,
        n = t.includes(s.__world),
        o = n ? { includes: n } : { bounds: t, includes: n }
      ;(this.needFill && i.fillWorld(t, this.config.fill),
        ie.showRepaint && ie.drawRepaint(i, t),
        this.config.useCellRender && (o.cellList = this.getCellList()),
        w.render(s, i, o),
        (this.renderBounds = e = e || t),
        (this.renderOptions = o),
        this.totalBounds.isEmpty() ? (this.totalBounds = e) : this.totalBounds.add(e),
        i.updateRender(e))
    }
    getCellList() {}
    addBlock(t) {
      ;(this.updateBlocks || (this.updateBlocks = []), this.updateBlocks.push(t))
    }
    mergeBlocks() {
      const { updateBlocks: t } = this
      if (t) {
        const e = new $t()
        ;(e.setList(t), (t.length = 0), t.push(e))
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
        ;(s.length > 30 && s.shift(),
          s.push(t),
          (this.FPS = Math.round(s.reduce((t, e) => t + e, 0) / s.length)),
          (this.requestTime = 0),
          this.checkRender())
      }
      w.requestRender(e)
    }
    __onResize(t) {
      if (!this.canvas.unreal) {
        if (t.bigger || !t.samePixelRatio) {
          const { width: e, height: i } = t.old
          if (!new $t(0, 0, e, i).includes(this.target.__world) || this.needFill || !t.samePixelRatio)
            return (this.addBlock(this.canvas.bounds), void this.target.forceUpdate('surface'))
        }
        ;(this.addBlock(new $t(0, 0, 1, 1)), this.update())
      }
    }
    __onLayoutEnd(t) {
      t.data &&
        t.data.map(t => {
          let e
          ;(t.updatedList &&
            t.updatedList.list.some(
              t => (
                (e = !t.__world.width || !t.__world.height),
                e && (t.isLeafer || zh.tip(t.innerName, ': empty'), (e = !t.isBranch || t.isBranchLeaf)),
                e
              )
            ),
            this.addBlock(e ? this.canvas.bounds : t.updatedBounds))
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
      ;((this.target = t), (this.selector = e))
    }
    getByPoint(t, e, i) {
      ;(e || (e = 0), i || (i = {}))
      const s = i.through || !1,
        n = i.ignoreHittable || !1,
        o = i.target || this.target
      ;((this.exclude = i.exclude || null),
        (this.point = { x: t.x, y: t.y, radiusX: e, radiusY: e }),
        (this.findList = new vh(i.findList)),
        i.findList || this.hitBranch(o.isBranchLeaf ? { children: [o] } : o))
      const { list: r } = this.findList,
        a = this.getBestMatchLeaf(r, i.bottomList, n, !!i.findList),
        h = n ? this.getPath(a) : this.getHitablePath(a)
      return (
        this.clear(),
        s ? { path: h, target: a, throughPath: r.length ? this.getThroughPath(r) : h } : { path: h, target: a }
      )
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
        ;((s = i[t]), (n = i[t + 1]))
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
              ;(i.topChildren && this.eachFind(i.topChildren, !1),
                this.eachFind(i.children, i.__onlyHitMask),
                i.isBranchLeaf && this.hitChild(i, o))
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
      ;((this.point = null), (this.findList = null), (this.exclude = null))
    }
    destroy() {
      this.clear()
    }
  }
  class Vh {
    constructor(t, e) {
      ;((this.config = {}),
        e && (this.config = _.default(e, this.config)),
        (this.picker = new Xh((this.target = t), this)),
        (this.finder = de.finder && de.finder()))
    }
    getByPoint(t, e, i) {
      const { target: s, picker: n } = this
      return (w.backgrounder && s && s.updateLayout(), n.getByPoint(t, e, i))
    }
    hitPoint(t, e, i) {
      return this.picker.hitPoint(t, e, i)
    }
    getBy(t, e, i, s) {
      return this.finder ? this.finder.getBy(t, e, i, s) : le.need('find')
    }
    destroy() {
      ;(this.picker.destroy(), this.finder && this.finder.destroy())
    }
  }
  function Gh(t) {
    return uo(t, t => ({
      set(e) {
        ;(this.__setAttr(t, e), e && (this.__.__useEffect = !0), this.__layout.renderChanged || this.__layout.renderChange())
      }
    }))
  }
  function jh(t) {
    return uo(t, t => ({
      set(e) {
        ;(this.__setAttr(t, e), this.__layout.boxChanged || this.__layout.boxChange(), this.__updateSize())
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
  ;(Object.assign(de, {
    watcher: (t, e) => new Bh(t, e),
    layouter: (t, e) => new Wh(t, e),
    renderer: (t, e, i) => new Uh(t, e, i),
    selector: (t, e) => new Vh(t, e)
  }),
    (w.layout = Wh.fullLayout),
    (w.render = function (t, e, i) {
      const s = Object.assign(Object.assign({}, i), { topRendering: !0 })
      ;((i.topList = new vh()), t.__render(e, i), i.topList.length && i.topList.forEach(t => t.__render(e, s)))
    }))
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
      ;(this.__naturalWidth && this.__removeNaturalSize(),
        r(t) || !t
          ? (ll(this, '__isTransparentFill', dl(t)), this.__isFills && this.__removePaint('fill', !0), (this._fill = t))
          : u(t) && this.__setPaint('fill', t))
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
      ;(t && Qh.compute('fill', this.__leaf), e && Qh.compute('stroke', this.__leaf), (this.__needComputePaint = void 0))
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
      ;(i.boxChanged || i.boxChange(),
        c(e) && !e.length
          ? this.__removePaint(t)
          : 'fill' === t
            ? ((this.__isFills = !0), this._fill || (this._fill = cl))
            : ((this.__isStrokes = !0), this._stroke || (this._stroke = cl)))
    }
    __removePaint(t, e) {
      ;(e && this.__removeInput(t),
        tl.recycleImage(t, this),
        'fill' === t
          ? (ll(this, '__isAlphaPixelFill', void 0), (this._fill = this.__isFills = void 0))
          : (ll(this, '__isAlphaPixelStroke', void 0),
            ll(this, '__hasMultiStrokeStyle', void 0),
            (this._stroke = this.__isStrokes = void 0)))
    }
  }
  function gl(t, e, i) {
    ;(t.__setInput(e, i),
      c(i)
        ? (i.some(t => !1 === t.visible) && (i = i.filter(t => !1 !== t.visible)), i.length || (i = void 0))
        : (i = i && !1 !== i.visible ? [i] : void 0),
      (t['_' + e] = i))
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
      return (Oe.forEach(t => delete i[t]), i)
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
      ;(r(t) ? (this.__setInput('fontWeight', t), (t = kl[t] || 400)) : this.__input && this.__removeInput('fontWeight'),
        (this._fontWeight = t))
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
        ;(s || ((i.parent = e), (i.__world = e.__world), (o.boxBounds = n.boxBounds)),
          i.set(t),
          o.strokeChanged && n.strokeChange())
      } else i && ((e.__box = i.parent = null), i.destroy())
      this._boxStyle = t
    }
    __getInputData(t, e) {
      const i = super.__getInputData(t, e)
      return (i.textEditing && delete i.textEditing, i)
    }
  }
  class Pl extends wl {
    setUrl(t) {
      ;(this.__setImageFill(t), (this._url = t))
    }
    __setImageFill(t) {
      this.fill = t ? { type: 'image', mode: 'stretch', url: t } : void 0
    }
    __getData() {
      const t = super.__getData()
      return (t.url && delete t.fill, t)
    }
    __getInputData(t, e) {
      const i = super.__getInputData(t, e)
      return (i.url && delete i.fill, i)
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
      return ((i.url = this.__leaf.canvas.toDataURL('image/png')), i)
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
        ;(e && (t = il.getShadowRenderSpread(this, e)),
          s && (t = Rl(t, s)),
          o && (t = Cl(t, sl.getSpread(o))),
          r && (t = Cl(t, r)),
          a && (t = Cl(t, a)))
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
          ;(Al(this.__world, 'half', e && 'center' === t.strokeAlign && t.strokeWidth % 2),
            Al(t, '__fillAfterStroke', e && 'outside' === t.strokeAlign && t.fill && !t.__isTransparentFill))
        }
        if (t.__useEffect) {
          const { shadow: e, fill: i, stroke: s } = t,
            n = t.innerShadow || t.blur || t.backgroundBlur || t.filter
          ;(Al(
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
            (t.__useEffect = !(!e && !n)))
        }
        ;(t.__checkSingle(), Al(t, '__complex', t.__isFills || t.__isStrokes || t.cornerRadius || t.__useEffect))
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
            ;(l && il.shadow(this, t, h),
              a && (s.__isStrokes ? Qh.strokes(o, this, t, e) : Qh.stroke(o, this, t, e)),
              n && (s.__isFills ? Qh.fills(n, this, t, e) : Qh.fill(n, this, t, e)),
              r && this.__drawAfterFill(t, e),
              d && il.innerShadow(this, t, h),
              o && !a && (s.__isStrokes ? Qh.strokes(o, this, t, e) : Qh.stroke(o, this, t, e)),
              c && sl.apply(c, this, this.__nowWorld, t, i, h),
              h.worldCanvas && h.worldCanvas.recycle(),
              h.canvas.recycle())
          } else {
            if ((a && (s.__isStrokes ? Qh.strokes(o, this, t, e) : Qh.stroke(o, this, t, e)), h)) {
              const e = s.shadow[0],
                { scaleX: i, scaleY: n } = this.getRenderScaleData(!0, e.scaleFixed)
              ;(t.save(), t.setWorldShadow(e.x * i, e.y * n, e.blur * i, Zh.string(e.color)))
            }
            ;(n && (s.__isFills ? Qh.fills(n, this, t, e) : Qh.fill(n, this, t, e)),
              h && t.restore(),
              r && this.__drawAfterFill(t, e),
              o && !a && (s.__isStrokes ? Qh.strokes(o, this, t, e) : Qh.stroke(o, this, t, e)))
          }
        } else s.__pathForRender ? Ml(this, t, e) : this.__drawFast(t, e)
      },
      __drawShape(t, e) {
        this.__drawRenderPath(t)
        const i = this.__,
          { fill: s, stroke: n } = i
        ;(s && !e.ignoreFill && (i.__isAlphaPixelFill ? Qh.fills(s, this, t, e) : Qh.fill('#000000', this, t, e)),
          i.__isCanvas && this.__drawAfterFill(t, e),
          n && !e.ignoreStroke && (i.__isAlphaPixelStroke ? Qh.strokes(n, this, t, e) : Qh.stroke('#000000', this, t, e)))
      },
      __drawAfterFill(t, e) {
        this.__.__clipAfterFill ? (t.save(), t.clipUI(this), this.__drawContent(t, e), t.restore()) : this.__drawContent(t, e)
      }
    }
  function Ml(t, e, i) {
    const { fill: s, stroke: n, __drawAfterFill: o, __fillAfterStroke: r } = t.__
    ;(t.__drawRenderPath(e),
      r && Qh.stroke(n, t, e, i),
      s && Qh.fill(s, t, e, i),
      o && t.__drawAfterFill(e, i),
      n && !r && Qh.stroke(n, t, e, i))
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
            ;((n -= h),
              (o -= h),
              n < 0 || o < 0
                ? (t.save(), this.__clip(t, e), t.strokeRect(i + l, s + l, n, o), t.restore())
                : t.strokeRect(i + l, s + l, n, o))
            break
          case 'outside':
            t.strokeRect(i - l, s - l, n + h, o + h)
        }
      }
    }
  }
  var Fl, Wl
  ;((t.UI = Fl =
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
        return (Gn.set((this.path = t || [])), t || this.__drawPathByBox(Gn), Gn)
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
        return (i || (Gn.set((i = [])), this.__drawPathByBox(Gn, !e)), t ? ss.toCanvasData(i, !0) : i)
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
        ;(t.beginPath(), this.__drawPathByData(t, this.__.__pathForRender))
      }
      __drawPath(t) {
        ;(t.beginPath(), this.__drawPathByData(t, this.__.path, !0))
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
        return (this.set(t), le.need('animate'))
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
        return (t && Object.assign(e, t), Fl.one(e))
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
        ;((this.fill = this.stroke = null), this.__animate && this.killAnimate(), super.destroy())
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
        ;(this.__setBranch(), super.reset(t))
      }
      __setBranch() {
        this.children || (this.children = [])
      }
      set(t, e) {
        if (t)
          if (t.children) {
            const { children: i } = t
            ;(delete t.children,
              this.children ? this.clear() : this.__setBranch(),
              super.set(t, e),
              i.forEach(t => this.add(t)),
              (t.children = i))
          } else super.set(t, e)
      }
      toJSON(t) {
        const e = super.toJSON(t)
        return (this.childlessJSON || (e.children = this.children.map(e => e.toJSON(t))), e)
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
    (t.Group = ye([qo(t.Branch), Zo()], t.Group)))
  const zl = ie.get('Leafer')
  ;((t.Leafer = Wl =
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
        ;(super(e),
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
          Wl.list.add(this))
      }
      init(t, e) {
        if (this.canvas) return
        let i
        const { config: s } = this
        ;(this.__setLeafer(this),
          e && ((this.parentApp = e), this.__bindApp(e), (i = e.running)),
          t && ((this.parent = e), this.initType(t.type), (this.parent = void 0), _.assign(s, t)))
        const n = (this.canvas = de.canvas(s))
        ;(this.__controllers.push(
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
          this.onInit())
      }
      onInit() {}
      initType(t) {}
      set(t, e) {
        this.waitInit(() => {
          super.set(t, e)
        })
      }
      start() {
        ;(clearTimeout(this.__startTimer),
          !this.running &&
            this.canvas &&
            ((this.running = !0),
            this.ready ? this.emitLeafer(ta.RESTART) : this.emitLeafer(ta.START),
            this.__controllers.forEach(t => t.start()),
            this.isApp || this.renderer.render()))
      }
      stop() {
        ;(clearTimeout(this.__startTimer),
          this.running &&
            this.canvas &&
            (this.__controllers.forEach(t => t.stop()), (this.running = !1), this.emitLeafer(ta.STOP)))
      }
      unlockLayout() {
        ;(this.layouter.start(), this.updateLayout())
      }
      lockLayout() {
        ;(this.updateLayout(), this.layouter.stop())
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
        ;(e.resize(t), this.updateLazyBounds(), this.__onResize(new Zr(t, i)))
      }
      __onResize(t) {
        ;(this.emitEvent(t),
          _.copyAttrs(this.__, t, Oe),
          setTimeout(() => {
            this.canvasManager && this.canvasManager.clearRecycled()
          }, 0))
      }
      __setApp() {}
      __bindApp(t) {
        ;((this.selector = t.selector),
          (this.interaction = t.interaction),
          (this.canvasManager = t.canvasManager),
          (this.hitCanvasManager = t.hitCanvasManager))
      }
      __setLeafer(t) {
        ;((this.leafer = t), (this.__level = 1))
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
        ;((n[t] = i[t] = e), i.width && i.height ? s.stopAutoLayout() : this.__checkAutoLayout(), this.__doResize(n))
      }
      __changeFill(t) {
        ;((this.config.fill = t), this.canvas.allowBackgroundColor ? (this.canvas.backgroundColor = t) : this.forceRender())
      }
      __onCreated() {
        this.created = !0
      }
      __onReady() {
        ;((this.ready = !0),
          this.emitLeafer(ta.BEFORE_READY),
          this.emitLeafer(ta.READY),
          this.emitLeafer(ta.AFTER_READY),
          Br.run(this.__readyWait))
      }
      __onViewReady() {
        this.viewReady || ((this.viewReady = !0), this.emitLeafer(ta.VIEW_READY), Br.run(this.__viewReadyWait))
      }
      __onLayoutEnd() {
        const { grow: t, width: e, height: i } = this.config
        if (t) {
          let { width: s, height: n, pixelRatio: o } = this
          const r = 'box' === t ? this.worldBoxBounds : this.__world
          ;(e || (s = Math.max(1, r.x + r.width)),
            i || (n = Math.max(1, r.y + r.height)),
            this.__doResize({ width: s, height: n, pixelRatio: o }))
        }
        this.ready || this.__onReady()
      }
      __onNextRender() {
        if (this.viewReady) {
          Br.run(this.__nextRenderWait)
          const { imageReady: t } = this
          ;(t && !this.viewCompleted && this.__checkViewCompleted(), t || ((this.viewCompleted = !1), this.requestRender()))
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
        ;(e && (t = t.bind(e)), this.__initWait || (this.__initWait = []), this.canvas ? t() : this.__initWait.push(t))
      }
      waitReady(t, e) {
        ;(e && (t = t.bind(e)), this.ready ? t() : this.__readyWait.push(t))
      }
      waitViewReady(t, e) {
        ;(e && (t = t.bind(e)), this.viewReady ? t() : this.__viewReadyWait.push(t))
      }
      waitViewCompleted(t, e) {
        ;(e && (t = t.bind(e)),
          this.__viewCompletedWait.push(t),
          this.viewCompleted ? this.__checkViewCompleted(!1) : this.running || this.start())
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
        ;(this.once([
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
          ))
      }
      __removeListenEvents() {
        this.off_(this.__eventIds)
      }
      destroy(t) {
        const e = () => {
          if (!this.destroyed) {
            Wl.list.remove(this)
            try {
              ;(this.stop(),
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
                }, 100))
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
    (t.Rect = ye([qo(Il), jo(), Zo()], t.Rect)))
  const { add: Ul, includes: Hl, scroll: Nl } = jt,
    Yl = t.Rect.prototype,
    Xl = t.Group.prototype
  ;((t.Box = class extends t.Group {
    get __tag() {
      return 'Box'
    }
    get isBranchLeaf() {
      return !0
    }
    constructor(t) {
      ;(super(t), this.__layout.renderChanged || this.__layout.renderChange())
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
          ;(t.__hasSurface && this.__extraUpdate(), super.__updateBoxBounds())
          const { boxBounds: e } = this.__layout
          ;(t.__autoSize ||
            (t.__autoWidth
              ? ((e.width += e.x), (e.x = 0), (e.height = t.height), (e.y = 0))
              : ((e.height += e.y), (e.y = 0), (e.width = t.width), (e.x = 0))),
            this.__updateNaturalSize())
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
        ;(super.__updateRenderBounds(a),
          (e = r && r.includes('scroll')) && (Ul(a, o), Nl(a, i)),
          this.__updateRectRenderBounds(),
          (t = !Hl(o, a)),
          t && 'show' === r && Ul(n, a))
      } else this.__updateRectRenderBounds()
      ;(_.stintSet(this, 'isOverflow', t), this.__checkScroll(e))
    }
    __updateRectRenderBounds() {}
    __checkScroll(t) {}
    __updateRectChange() {}
    __updateChange() {
      ;(super.__updateChange(), this.__updateRectChange())
    }
    __renderRect(t, e) {}
    __renderGroup(t, e) {}
    __render(t, e) {
      ;(this.__.__drawAfterFill
        ? this.__renderRect(t, e)
        : (this.__renderRect(t, e), this.children.length && this.__renderGroup(t, e)),
        this.hasScroller && this.scroller.__render(t, e))
    }
    __drawContent(t, e) {
      ;(this.__renderGroup(t, e),
        (this.__.__useStroke || this.__.__useEffect) && (t.setWorld(this.__nowWorld), this.__drawRenderPath(t)))
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
    (t.Frame = ye([Zo()], t.Frame)))
  const { moveTo: Vl, closePath: Gl, ellipse: jl } = ks
  ;((t.Ellipse = class extends t.UI {
    get __tag() {
      return 'Ellipse'
    }
    __updatePath() {
      const { width: t, height: e, innerRadius: i, startAngle: s, endAngle: n } = this.__,
        o = t / 2,
        r = e / 2,
        a = (this.__.path = [])
      let h
      ;(i
        ? s || n
          ? (i < 1 ? jl(a, o, r, o * i, r * i, 0, s, n, !1) : (h = !0), jl(a, o, r, o, r, 0, n, s, !0))
          : (i < 1 && (jl(a, o, r, o * i, r * i), Vl(a, t, r)), jl(a, o, r, o, r, 0, 360, 0, !0))
        : s || n
          ? (Vl(a, o, r), jl(a, o, r, o, r, 0, s, n, !1))
          : jl(a, o, r, o, r),
        h || Gl(a),
        w.ellipseToCurve && (this.__.path = this.getPath(!0)))
    }
  }),
    ye([Ho(xl)], t.Ellipse.prototype, '__', void 0),
    ye([So(0)], t.Ellipse.prototype, 'innerRadius', void 0),
    ye([So(0)], t.Ellipse.prototype, 'startAngle', void 0),
    ye([So(0)], t.Ellipse.prototype, 'endAngle', void 0),
    (t.Ellipse = ye([Zo()], t.Ellipse)))
  const { sin: Kl, cos: ql, PI: Zl } = Math,
    { moveTo: $l, lineTo: Jl, closePath: Ql, drawPoints: td } = ks
  ;((t.Polygon = class extends t.UI {
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
    (t.Polygon = ye([jo(), Zo()], t.Polygon)))
  const { sin: ed, cos: id, PI: sd } = Math,
    { moveTo: nd, lineTo: od, closePath: rd } = ks
  ;((t.Star = class extends t.UI {
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
    (t.Star = ye([Zo()], t.Star)))
  const { moveTo: ad, lineTo: hd, drawPoints: ld } = ks,
    { rotate: dd, getAngle: cd, getDistance: ud, defaultPoint: pd } = ut
  ;((t.Line = class extends t.UI {
    get __tag() {
      return 'Line'
    }
    get toPoint() {
      const { width: t, rotation: e } = this.__,
        i = { x: 0, y: 0 }
      return (t && (i.x = t), e && dd(i, e), i)
    }
    set toPoint(t) {
      ;((this.width = ud(pd, t)), (this.rotation = cd(pd, t)), this.height && (this.height = 0))
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
    (t.Image = ye([Zo()], t.Image)))
  const gd = t.Image
  ;((t.Canvas = class extends t.Rect {
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
      ;(super(t), (this.canvas = de.canvas(this.__)), t && t.url && this.drawImage(t.url))
    }
    drawImage(t) {
      new ao({ url: t }).load(t => {
        ;(this.context.drawImage(t.view, 0, 0),
          (this.url = void 0),
          this.paint(),
          this.emitEvent(new Yr(Yr.LOADED, { image: t })))
      })
    }
    draw(t, e, i, s) {
      const n = new wt(t.worldTransform).invert(),
        o = new wt()
      ;(e && o.translate(e.x, e.y),
        i && (h(i) ? o.scale(i) : o.scale(i.x, i.y)),
        s && o.rotate(s),
        n.multiplyParent(o),
        t.__render(this.canvas, { matrix: n.withScale() }),
        this.paint())
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
        ;(t.resize(this.__, i), t.smooth !== e && (t.smooth = e))
      }
    }
    destroy() {
      ;(this.canvas && (this.canvas.destroy(), (this.canvas = null)), super.destroy())
    }
  }),
    ye([Ho(Ll)], t.Canvas.prototype, '__', void 0),
    ye([jh(100)], t.Canvas.prototype, 'width', void 0),
    ye([jh(100)], t.Canvas.prototype, 'height', void 0),
    ye([jh(1)], t.Canvas.prototype, 'pixelRatio', void 0),
    ye([jh(!0)], t.Canvas.prototype, 'smooth', void 0),
    ye([_o(!1)], t.Canvas.prototype, 'safeResize', void 0),
    ye([jh()], t.Canvas.prototype, 'contextSettings', void 0),
    (t.Canvas = ye([Zo()], t.Canvas)))
  const { copyAndSpread: _d, includes: fd, spread: md, setList: yd } = jt,
    { stintSet: vd } = _
  ;((t.Text = class extends t.UI {
    get __tag() {
      return 'Text'
    }
    get textDrawData() {
      return (this.updateLayout(), this.__.__textDrawData)
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
      ;((t.__lineHeight = $h.number(e, n)),
        (t.__letterSpacing = $h.number(i, n)),
        (t.__baseLine = t.__lineHeight - (t.__lineHeight - 0.7 * n) / 2),
        (t.__font = `${r ? 'italic ' : ''}${'small-caps' === a ? 'small-caps ' : ''}${'normal' !== o ? o + ' ' : ''}${n || 12}px ${s || 'caption'}`),
        vd(t, '__padding', l && z.fourNumber(l)),
        vd(t, '__clipText', 'show' !== h && !t.__autoSize),
        vd(t, '__isCharMode', d || c || t.__letterSpacing || 'none' !== a),
        (t.__textDrawData = qh.getDrawData((t.__isPlacehold = t.placeholder && '' === t.text) ? t.placeholder : t.text, this.__)))
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
          ;(o && ((h.x -= n), (h.width += i + n)), r && ((h.y -= e), (h.height += s + e)))
        }
        this.__updateNaturalSize()
      } else super.__updateBoxBounds()
      ;(s && (h.width += 0.16 * i),
        _.stintSet(this, 'isOverflow', !fd(h, a)),
        this.isOverflow ? (yd((t.__textBoxBounds = {}), [h, a]), (e.renderChanged = !0)) : (t.__textBoxBounds = h))
    }
    __updateRenderSpread() {
      let t = super.__updateRenderSpread()
      return (t || (t = this.isOverflow ? 1 : 0), t)
    }
    __updateRenderBounds() {
      const { renderBounds: t, renderSpread: e } = this.__layout
      ;(_d(t, this.__.__textBoxBounds, e), this.__box && (this.__box.__layout.renderBounds = t))
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
      ;(s && ((s.__nowWorld = this.__nowWorld), s.__draw(t, e, i)), (this.textEditing && !e.exporting) || super.__draw(t, e, i))
    }
    __drawShape(t, e) {
      ;(e.shape && this.__box && this.__box.__drawShape(t, e), super.__drawShape(t, e))
    }
    destroy() {
      ;(this.boxStyle && (this.boxStyle = null), super.destroy())
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
        return ((this.pathStyle = e), (this.__path = i.path || (i.path = [])), this.add(i), this)
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
          ;(e && (this.ground = this.addLeafer(e)),
            (i || n) && (this.tree = this.addLeafer(i || { type: t.type || 'design' })),
            (s || n) && (this.sky = this.addLeafer(s)),
            n && de.editor(n, this))
        }
      }
      __setApp() {
        const { canvas: t } = this,
          { realCanvas: e, view: i } = this.config
        ;(e || i === this.canvas.view || !t.parentView ? (this.realCanvas = !0) : t.unrealCanvas(),
          (this.leafer = this),
          this.watcher.disable(),
          this.layouter.disable())
      }
      __updateLocalBounds() {
        ;(this.forEach(t => t.updateLayout()), super.__updateLocalBounds())
      }
      start() {
        ;(super.start(), this.forEach(t => t.start()))
      }
      stop() {
        ;(this.forEach(t => t.stop()), super.stop())
      }
      unlockLayout() {
        ;(super.unlockLayout(), this.forEach(t => t.unlockLayout()))
      }
      lockLayout() {
        ;(super.lockLayout(), this.forEach(t => t.lockLayout()))
      }
      forceRender(t, e) {
        this.forEach(i => i.forceRender(t, e))
      }
      addLeafer(e) {
        const i = new t.Leafer(e)
        return (this.add(i), i)
      }
      add(t, e) {
        if (!t.view) {
          if (this.realCanvas && !this.canvas.bounds) return void setTimeout(() => this.add(t, e), 10)
          t.init(this.__getChildConfig(t.userConfig), this)
        }
        ;(super.add(t, e), n(e) || (t.canvas.childIndex = e), this.__listenChildEvents(t))
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
        ;(this.renderer.addBlock(t.renderBounds), this.viewReady && this.renderer.update())
      }
      __render(t, e) {
        t.context && this.forEach(i => (e.matrix ? i.__render(t, e) : t.copyWorld(i.canvas, e.bounds)))
      }
      __onResize(t) {
        ;(this.forEach(e => e.resize(t)), super.__onResize(t))
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
        ;(t.once([
          [Jr.END, this.__onReady, this],
          [Qr.START, this.__onCreated, this],
          [Qr.END, this.__onViewReady, this]
        ]),
          this.realCanvas && this.__eventIds.push(t.on_(Qr.END, this.__onChildRenderEnd, this)))
      }
    }),
    (t.App = ye([Zo()], t.App)))
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
      ;(super(t.type), (this.bubbles = !0), Object.assign(this, t))
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
        ;(i && Id.getValidMove(t.__localBoxBounds, Id.getDragBounds(t), s, e, !0), Id.axisMove(t, e))
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
        ;('x' === i && (e.y = 0), 'y' === i && (e.x = 0))
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
        ;(r || (n = Object.assign({}, n)), Dd.set(e), Ad.set(t).scaleOf(s, n.x, n.y))
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
  ;((t.PointerEvent = class extends Ed {}),
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
    (t.PointerEvent = ye([$o()], t.PointerEvent)))
  const Fd = t.PointerEvent,
    Wd = {}
  ;((t.DragEvent = class extends t.PointerEvent {
    static setList(t) {
      this.list = t instanceof vh ? t : new vh(t)
    }
    static setData(t) {
      this.data = t
    }
    static getValidMove(t, e, i, s = !0) {
      const n = t.getLocalPoint(i, null, !0)
      return (ut.move(n, e.x - t.x, e.y - t.y), s && this.limitMove(t, n), Md.axisMove(t, n), n)
    }
    static limitMove(t, e) {
      Md.limitMove(t, e)
    }
    getPageMove(t) {
      return (this.assignMove(t), this.current.getPagePoint(Wd, null, !0))
    }
    getInnerMove(t, e) {
      return (t || (t = this.current), this.assignMove(e), t.getInnerPoint(Wd, null, !0))
    }
    getLocalMove(t, e) {
      return (t || (t = this.current), this.assignMove(e), t.getLocalPoint(Wd, null, !0))
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
      return (jt.set(i, e.x - t.x, e.y - t.y, t.x, t.y), jt.unsign(i), i)
    }
    assignMove(t) {
      ;((Wd.x = t ? this.totalX : this.moveX), (Wd.y = t ? this.totalY : this.moveY))
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
    (t.DragEvent = ye([$o()], t.DragEvent)))
  const zd = t.DragEvent
  ;((t.DropEvent = class extends t.PointerEvent {
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
    (t.TouchEvent = ye([$o()], t.TouchEvent)))
  const Ud = t.TouchEvent
  ;((t.RotateEvent = class extends t.PointerEvent {}),
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
    (t.KeyEvent = ye([$o()], t.KeyEvent)))
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
      ;((this.dragDataList = []), (this.interaction = t))
    }
    setDragData(t) {
      ;(this.animateWait && this.dragEndReal(),
        (this.downData = this.interaction.downData),
        (this.dragData = Xd(t, t, t)),
        (this.canAnimate = this.canDragOut = !0))
    }
    getList(e, i) {
      const { proxy: s } = this.interaction.selector,
        n = s && s.list.length,
        o = t.DragEvent.list || this.draggableList || Yd
      return this.dragging && (n ? (e ? Yd : new vh(i ? [...s.list, ...s.dragHoverExclude] : s.list)) : o)
    }
    checkDrag(e, i) {
      const { interaction: s } = this
      if (this.moving && e.buttons < 1) return ((this.canAnimate = !1), void s.pointerCancel())
      ;(!this.moving &&
        i &&
        (this.moving = s.canMove(this.downData) || s.isHoldRightKey || s.isMobileDragEmpty) &&
        ((this.dragData.moveType = 'drag'), s.emit(t.MoveEvent.START, this.dragData)),
        this.moving || this.dragStart(e, i),
        this.drag(e))
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
      ;((this.dragStartPoints = {}), t.forEach(t => (this.dragStartPoints[t.innerId] = { x: t.x, y: t.y })))
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
      ;((this.dragData = Xd(n, s, e)),
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
            i.emit(t.DragEvent.DRAG, this.dragData)))
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
      ;((this.dragOverPath = n),
        s
          ? n.indexAt(0) !== s.indexAt(0) && (i.emit(t.DragEvent.OUT, e, s), i.emit(t.DragEvent.OVER, e, n))
          : i.emit(t.DragEvent.OVER, e, n))
    }
    dragEnterOrLeave(e) {
      const { interaction: i } = this,
        { dragEnterPath: s } = this,
        { path: n } = e
      ;(i.emit(t.DragEvent.LEAVE, e, s, n), i.emit(t.DragEvent.ENTER, e, n, s), (this.dragEnterPath = n))
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
        ;((this.dragging = !1),
          i.p.dragLimitAnimate && this.dragReal(!0),
          i.emit(t.DragEvent.END, a),
          this.swipe(e, s, n, a),
          this.drop(e, o, this.dragEnterPath))
      }
      ;(this.autoMoveCancel(), this.dragReset(), this.animate(null, 'off'))
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
      ;((n.path = s), this.interaction.emit(t.DropEvent.DROP, n), this.interaction.emit(t.DragEvent.LEAVE, e, s))
    }
    dragReset() {
      ;((t.DragEvent.list =
        t.DragEvent.data =
        this.draggableList =
        this.dragData =
        this.downData =
        this.dragOverPath =
        this.dragEnterPath =
          null),
        (this.dragDataList = []))
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
      for (let r = 0, a = t.children.length; r < a; r++)
        ((o = t.children[r]), !i.path.has(o) && o.__.hittable && $d(o, e, i, s, n))
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
      ;((this.config = _.clone(Qd)),
        (this.tapCount = 0),
        (this.downKeyMap = {}),
        (this.target = t),
        (this.canvas = e),
        (this.selector = i),
        (this.defaultPath = new vh(t)),
        this.createTransformer(),
        (this.dragger = new jd(this)),
        s && (this.config = _.default(s, this.config)),
        this.__listenEvents())
    }
    start() {
      this.running = !0
    }
    stop() {
      this.running = !1
    }
    receive(t) {}
    pointerDown(e, i) {
      ;(e || (e = this.hoverData),
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
          this.isHoldRightKey || this.updateCursor(e)))
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
        ;(t && (this.pointerWaitCancel(), (this.waitRightTap = !1)), this.dragger.checkDrag(e, t))
      }
      ;(this.dragger.moving ||
        (this.updateHoverData(e),
        this.checkPath(e),
        this.emit(t.PointerEvent.MOVE, e),
        this.pointerHover(e),
        this.dragging && (this.dragger.dragOverOrOut(e), this.dragger.dragEnterOrLeave(e))),
        this.updateCursor(this.downData || e))
    }
    pointerUp(e) {
      const { downData: i } = this
      if ((e || (e = i), !i)) return
      ;(bd.defaultLeft(e), (e.multiTouch = i.multiTouch), this.findPath(e))
      const s = Object.assign(Object.assign({}, e), { path: e.path.clone() })
      ;(e.path.addList(i.path.list),
        this.checkPath(e),
        (this.downData = null),
        this.emit(t.PointerEvent.BEFORE_UP, e),
        this.emit(t.PointerEvent.UP, e),
        this.touchLeave(e),
        e.isCancel || (this.tap(e), this.menuTap(e)),
        this.dragger.dragEnd(e),
        this.updateCursor(s))
    }
    pointerCancel() {
      const t = Object.assign({}, this.dragger.dragData)
      ;((t.isCancel = !0), this.pointerUp(t))
    }
    menu(e) {
      ;(this.findPath(e),
        this.emit(t.PointerEvent.MENU, e),
        (this.waitMenuTap = !0),
        !this.downData && this.waitRightTap && this.menuTap(e))
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
      ;(this.downKeyMap[i] ||
        ((this.downKeyMap[i] = !0),
        xd.setDownCode(i),
        this.emit(t.KeyEvent.HOLD, e, this.defaultPath),
        this.moveMode && (this.cancelHover(), this.updateCursor())),
        this.emit(t.KeyEvent.DOWN, e, this.defaultPath))
    }
    keyUp(e) {
      if (!this.config.keyEvent) return
      this.emit(t.KeyEvent.BEFORE_UP, e, this.defaultPath)
      const { code: i } = e
      ;((this.downKeyMap[i] = !1),
        xd.setUpCode(i),
        this.emit(t.KeyEvent.UP, e, this.defaultPath),
        'grab' === this.cursor && this.updateCursor())
    }
    pointerHover(t) {
      !this.canHover ||
        (this.dragging && !this.p.dragHover) ||
        (t.path || (t.path = new vh()), this.pointerOverOrOut(t), this.pointerEnterOrLeave(t))
    }
    pointerOverOrOut(e) {
      const { path: i } = e,
        { overPath: s } = this
      ;((this.overPath = i),
        s
          ? i.indexAt(0) !== s.indexAt(0) && (this.emit(t.PointerEvent.OUT, e, s), this.emit(t.PointerEvent.OVER, e, i))
          : this.emit(t.PointerEvent.OVER, e, i))
    }
    pointerEnterOrLeave(e) {
      let { path: i } = e
      this.downData && !this.moveMode && ((i = i.clone()), this.downData.path.forEach(t => i.add(t)))
      const { enterPath: s } = this
      ;((this.enterPath = i), this.emit(t.PointerEvent.LEAVE, e, s, i), this.emit(t.PointerEvent.ENTER, e, i, s))
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
      return (r.throughPath && (t.throughPath = r.throughPath), (t.path = r.path), r.path)
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
      ;(!t && s && (t = s), t && (this.findPath(t, e), i && s && t.path.addList(s.path.list), (this.downData = t)))
    }
    updateHoverData(e) {
      ;(e || (e = this.hoverData),
        e && (this.findPath(e, { exclude: this.dragger.getList(!1, !0), name: t.PointerEvent.MOVE }), (this.hoverData = e)))
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
      return ((s.x *= n.width / i.width), (s.y *= n.height / i.height), this.p.snap && ut.round(s), s)
    }
    emitTap(e) {
      ;(this.emit(t.PointerEvent.TAP, e), this.emit(t.PointerEvent.CLICK, e))
    }
    emitDoubleTap(e) {
      ;(this.emit(t.PointerEvent.DOUBLE_TAP, e), this.emit(t.PointerEvent.DOUBLE_CLICK, e))
    }
    pointerWaitCancel() {
      ;(this.tapWaitCancel(), this.longPressWaitCancel())
    }
    tapWait() {
      ;(clearTimeout(this.tapTimer), (this.waitTap = !0))
    }
    tapWaitCancel() {
      this.waitTap && (clearTimeout(this.tapTimer), (this.waitTap = !1), (this.tapCount = 0))
    }
    longPressWait(e) {
      ;(clearTimeout(this.longPressTimer),
        (this.longPressTimer = setTimeout(() => {
          ;((this.longPressed = !0), this.emit(t.PointerEvent.LONG_PRESS, e))
        }, this.p.longPressTime)))
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
      ;((this.shrinkCanvasBounds = new $t(this.canvas.bounds)), this.shrinkCanvasBounds.spread(-(h(t) ? t : 2)))
    }
    __listenEvents() {
      const { target: t } = this
      ;((this.__eventIds = [t.on_(Zr.RESIZE, this.__onResize, this)]), t.once(ta.READY, () => this.__onResize()))
    }
    __removeListenEvents() {
      ;(this.target.off_(this.__eventIds), (this.__eventIds.length = 0))
    }
    emit(t, e, i, s) {
      this.running &&
        (function (t, e, i, s) {
          if (!i && !e.path) return
          let n
          ;((e.type = t), i ? (e = Object.assign(Object.assign({}, e), { path: i })) : (i = e.path), (e.target = i.indexAt(0)))
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
      ;(super(...arguments), (this.maxTotal = 1e3), (this.pathList = new vh()), (this.pixelList = new vh()))
    }
    getPixelType(t, e) {
      return (this.__autoClear(), this.pixelList.add(t), de.hitCanvas(e))
    }
    getPathType(t) {
      return (this.__autoClear(), this.pathList.add(t), de.hitCanvas())
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
      ;(this.clearPathType(), this.clearImageType())
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
  ;((uc.hit = function (t, e = 0) {
    ;(this.updateLayout(), ac(cc, t, e))
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
    }))
  const pc = new wt(),
    gc = t.UI.prototype
  ;((gc.__updateHitCanvas = function () {
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
      ;(o.resize({ width: l, height: d, pixelRatio: 1 }),
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
        (e.__isHitPixel = !0))
    } else e.__isHitPixel && (e.__isHitPixel = !1)
    ;(this.__drawHitPath(o), o.setStrokeOptions(e))
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
    }))
  const _c = t.UI.prototype,
    fc = t.Rect.prototype,
    mc = t.Box.prototype
  ;((fc.__updateHitCanvas = mc.__updateHitCanvas =
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
      ;(t.beginPath(), n < 0 ? this.__drawPathByBox(t) : o.rows.forEach(n => t.rect(n.x, n.y - s, n.width, e < i ? i : e)))
    }),
    (t.Group.prototype.pick = function (t, e) {
      return (
        e || (e = s),
        this.updateLayout(),
        w.getSelector(this).getByPoint(t, e.hitRadius || 0, Object.assign(Object.assign({}, e), { target: this }))
      )
    }))
  const yc = Ae.prototype
  ;((yc.hitFill = function (t, e) {
    return e ? this.context.isPointInPath(t.x, t.y, e) : this.context.isPointInPath(t.x, t.y)
  }),
    (yc.hitStroke = function (t, e) {
      return ((this.strokeWidth = e), this.context.isPointInStroke(t.x, t.y))
    }),
    (yc.hitPixel = function (t, e, i = 1) {
      let { x: s, y: n, radiusX: o, radiusY: r } = t
      ;(e && ((s -= e.x), (n -= e.y)),
        Jt.set(s - o, n - r, 2 * o, 2 * r)
          .scale(i)
          .ceil())
      const { data: a } = this.context.getImageData(Jt.x, Jt.y, Jt.width || 1, Jt.height || 1)
      for (let t = 0, e = a.length; t < e; t += 4) if (a[t + 3] > 0) return !0
      return a[3] > 0
    }))
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
      ;((this.viewEvents = {
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
        }))
      const { viewEvents: e, windowEvents: i } = this
      for (let i in e) ((e[i] = e[i].bind(this)), t.addEventListener(i, e[i]))
      for (let t in i) ((i[t] = i[t].bind(this)), window.addEventListener(t, i[t]))
    }
    __removeListenEvents() {
      super.__removeListenEvents()
      const { viewEvents: t, windowEvents: e } = this
      for (let e in t) (this.view.removeEventListener(e, t[e]), (this.viewEvents = {}))
      for (let t in e) (window.removeEventListener(t, e[t]), (this.windowEvents = {}))
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
      ;(this.config.pointer.preventDefaultMenu && t.preventDefault(), this.menu(vc.convert(t, this.getLocal(t))))
    }
    onScroll() {
      this.canvas.updateClientBounds()
    }
    onPointerDown(t) {
      ;(this.preventDefaultPointer(t),
        this.notPointer || (this.usePointer || (this.usePointer = !0), this.pointerDown(vc.convert(t, this.getLocal(t)))))
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
      ;(this.downData && this.preventDefaultPointer(t),
        this.notPointer || this.preventWindowPointer(t) || this.pointerUp(vc.convert(t, this.getLocal(t))))
    }
    onPointerCancel() {
      this.useMultiTouch || this.pointerCancel()
    }
    onMouseDown(t) {
      ;(this.preventDefaultPointer(t), this.notMouse || this.pointerDown(vc.convertMouse(t, this.getLocal(t))))
    }
    onMouseMove(t) {
      this.notMouse || this.preventWindowPointer(t) || this.pointerMove(vc.convertMouse(t, this.getLocal(t, !0)))
    }
    onMouseUp(t) {
      ;(this.downData && this.preventDefaultPointer(t),
        this.notMouse || this.preventWindowPointer(t) || this.pointerUp(vc.convertMouse(t, this.getLocal(t))))
    }
    onMouseCancel() {
      this.notMouse || this.pointerCancel()
    }
    onTouchStart(t) {
      const e = vc.getTouch(t),
        i = this.getLocal(e, !0),
        { preventDefault: s } = this.config.touch
      ;((!0 === s || ('auto' === s && xc(this.findPath(i)))) && t.preventDefault(),
        this.multiTouchStart(t),
        this.notTouch ||
          (this.touchTimer && (window.clearTimeout(this.touchTimer), (this.touchTimer = 0)),
          (this.useTouch = !0),
          this.pointerDown(vc.convertTouch(t, i))))
    }
    onTouchMove(t) {
      if ((this.multiTouchMove(t), this.notTouch || this.preventWindowPointer(t))) return
      const e = vc.getTouch(t)
      this.pointerMove(vc.convertTouch(t, this.getLocal(e)))
    }
    onTouchEnd(t) {
      if ((this.multiTouchEnd(), this.notTouch || this.preventWindowPointer(t))) return
      ;(this.touchTimer && clearTimeout(this.touchTimer),
        (this.touchTimer = setTimeout(() => {
          this.useTouch = !1
        }, 500)))
      const e = vc.getTouch(t)
      this.pointerUp(vc.convertTouch(t, this.getLocal(e)))
    }
    onTouchCancel() {
      this.notTouch || this.pointerCancel()
    }
    multiTouchStart(t) {
      ;((this.useMultiTouch = t.touches.length > 1),
        (this.touches = this.useMultiTouch ? this.getTouches(t.touches) : void 0),
        this.useMultiTouch && this.pointerCancel())
    }
    multiTouchMove(t) {
      if (this.useMultiTouch && t.touches.length > 1) {
        const e = this.getTouches(t.touches),
          i = this.getKeepTouchList(this.touches, e)
        i.length > 1 && (this.multiTouch(Hd.getBase(t), i), (this.touches = e))
      }
    }
    multiTouchEnd() {
      ;((this.touches = null), (this.useMultiTouch = !1), this.transformEnd())
    }
    getKeepTouchList(t, e) {
      let i
      const s = []
      return (
        t.forEach(t => {
          ;((i = e.find(e => e.identifier === t.identifier)), i && s.push({ from: this.getLocal(t), to: this.getLocal(i) }))
        }),
        s
      )
    }
    getLocalTouchs(t) {
      return t.map(t => this.getLocal(t))
    }
    onWheel(t) {
      ;(this.preventDefaultWheel(t),
        this.wheel(
          Object.assign(Object.assign(Object.assign({}, Hd.getBase(t)), this.getLocal(t)), { deltaX: t.deltaX, deltaY: t.deltaY })
        ))
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
      ;(this.zoom(Object.assign(Object.assign({}, e), { scale: i * i })),
        this.rotate(Object.assign(Object.assign({}, e), { rotation: s })),
        (this.lastGestureScale = t.scale),
        (this.lastGestureRotation = t.rotation))
    }
    onGestureend(t) {
      this.useMultiTouch || (this.preventDefaultWheel(t), this.transformEnd())
    }
    setCursor(t) {
      super.setCursor(t)
      const e = []
      ;(this.eachCursor(t, e),
        u(e[e.length - 1]) && e.push('default'),
        (this.canvas.view.style.cursor = e.map(t => (u(t) ? `url(${t.url}) ${t.x || 0} ${t.y || 0}` : t)).join(',')))
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
    ;(u(t) ? Qh.drawStrokesStyle(t, e, !1, i, s, n) : (s.setStroke(t, o.__strokeWidth * e, o), s.stroke()),
      o.__useArrow && Qh.strokeArrow(t, i, s, n))
  }
  function Sc(t, e, i, s, n) {
    const o = i.__
    u(t) ? Qh.drawStrokesStyle(t, e, !0, i, s, n) : (s.setStroke(t, o.__strokeWidth * e, o), Qh.drawTextStroke(i, s, n))
  }
  function kc(t, e, i, s, n) {
    const o = s.getSameCanvas(!0, !0)
    ;((o.font = i.__.__font),
      Sc(t, 2, i, o, n),
      (o.blendMode = 'outside' === e ? 'destination-out' : 'destination-in'),
      Qh.fillText(i, o, n),
      (o.blendMode = 'normal'),
      lr.copyCanvasByWorld(i, s, o),
      o.recycle(i.__nowWorld))
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
      ;(c(a) || (a = [a]), (Mc = tl.recycleImage(t, i)))
      for (let i, n = 0, o = a.length; n < o; n++)
        (i = Wc(t, a[n], e)) &&
          (s.push(i), i.strokeStyle && (r || (r = 1), i.strokeStyle.strokeWidth && (r = Math.max(r, i.strokeStyle.strokeWidth))))
      ;((i['_' + t] = s.length ? s : void 0),
        s.length
          ? (s.every(t => t.isTransparent) && (s.some(t => t.image) && (n = !0), (o = !0)),
            'fill' === t
              ? (Ic(i, '__isAlphaPixelFill', n), Ic(i, '__isTransparentFill', o))
              : (Ic(i, '__isAlphaPixelStroke', n), Ic(i, '__isTransparentStroke', o), Ic(i, '__hasMultiStrokeStyle', r)))
          : i.__removePaint(t, !1))
    },
    fill: function (t, e, i, s) {
      ;((i.fillStyle = t), Ec(e, i, s))
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
          ;(o.blendMode && (i.blendMode = o.blendMode), Ec(e, i, s), i.restore())
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
        ((r = n[t]),
          r.text
            ? e.fillText(r.text, r.x, r.y)
            : r.data &&
              r.data.forEach(t => {
                e.fillText(t.char, t.x, r.y)
              }))
      if (o) {
        const { decorationColor: t, decorationHeight: i } = s.__textDrawData
        ;(t && (e.fillStyle = t), n.forEach(t => o.forEach(s => e.fillRect(t.x, t.y + s, t.width, i))))
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
                ;(i.save(), i.clipUI(e), Tc(t, 2, e, i, s), i.restore())
              })(t, e, i, s)
              break
            case 'outside':
              !(function (t, e, i, s) {
                const n = e.__
                if (n.__fillAfterStroke) Tc(t, 2, e, i, s)
                else {
                  const { renderBounds: o } = e.__layout,
                    r = i.getSameCanvas(!0, !0)
                  ;(e.__drawRenderPath(r),
                    Tc(t, 2, e, r, s),
                    r.clipUI(n),
                    r.clearWorld(o),
                    lr.copyCanvasByWorld(e, i, r),
                    r.recycle(e.__nowWorld))
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
        ((s = o[t]),
          s.text
            ? e.strokeText(s.text, s.x, s.y)
            : s.data &&
              s.data.forEach(t => {
                e.strokeText(t.char, t.x, s.y)
              }))
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
      if (n.includes(a)) ((p = s), (h = u = a), (l = o))
      else {
        let s
        if (w.fullImageShadow) s = a
        else {
          const t = r.renderShapeSpread ? Bc(n, L.swapAndScale(r.renderShapeSpread, g, _)) : n
          s = Ac(t, a)
        }
        c = n.getFitMatrix(s)
        let { a: f, d: m } = c
        ;(c.a < 1 && ((p = e.getSameCanvas()), t.__renderShape(p, i), (g *= f), (_ *= m)),
          (u = Rc(a, c)),
          (h = Cc(u, -c.e, -c.f)),
          (l = Rc(o, c)),
          Oc(l, -c.e, -c.f))
        const y = i.matrix
        ;(y ? ((d = new wt(c)), d.multiply(y), (f *= y.scaleX), (m *= y.scaleY)) : (d = c),
          d.withScale(f, m),
          (i = Object.assign(Object.assign({}, i), { matrix: d })))
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
        return (
          t.forceUpdate('width'),
          t.__proxyData && (t.setProxyAttr('width', e.width), t.setProxyAttr('height', e.height)),
          !1
        )
    }
    return (n.data || tl.createData(n, s, i, o), !0)
  }
  function Xc(t, e) {
    jc(t, Yr.LOAD, e)
  }
  function Vc(t, e) {
    jc(t, Yr.LOADED, e)
  }
  function Gc(t, e, i) {
    ;((e.error = i), t.forceUpdate('surface'), jc(t, Yr.ERROR, e))
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
    ;(r && du(t, r), a && cu(t, a.x, a.y), n && lu(t, n, o), ru(t, e.x + i, e.y + s))
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
                    ;(Kc(t, !1),
                      t.destroyed ||
                        (Yc(t, e, i, a, o, s) &&
                          (a.hasAlphaPixel && (t.__layout.hitCanvasChanged = !0), t.forceUpdate('surface')),
                        Vc(t, r)),
                      (o.loadId = void 0))
                  },
                  e => {
                    ;(Kc(t, !1), Gc(t, r, e), (o.loadId = void 0))
                  },
                  i.lod && a.getThumbSize(i.lod)
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
          ;((n.scaleX *= t), (n.scaleY *= t))
        }
        return (o && o.scaleX && ((n.scaleX *= Math.abs(o.scaleX)), (n.scaleY *= Math.abs(o.scaleY))), n)
      },
      recycleImage: function (t, e) {
        const i = e['_' + t]
        if (c(i)) {
          let s, n, o, r, a
          for (let h = 0, l = i.length; h < l; h++)
            ((s = i[h]),
              (n = s.image),
              (a = n && n.url),
              a &&
                (o || (o = {}),
                (o[a] = !0),
                so.recyclePaint(s),
                n.loading &&
                  (r || ((r = (e.__input && e.__input[t]) || []), c(r) || (r = [r])),
                  n.unload(i[h].loadId, !r.some(t => t.url === a)))))
          return o
        }
        return null
      },
      createPatternTask: function (t, e, i, s) {
        t.patternTask ||
          (t.patternTask = so.patternTasker.add(
            () =>
              ve(this, void 0, void 0, function* () {
                ;(tl.createPattern(t, e, i, s), e.forceUpdate('surface'))
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
          ;(l && ((n *= l), (o *= l)),
            (p *= n),
            (g *= o),
            h && ((c = (h.x * n) / mu(s.scaleX || 1)), (u = (h.y * o) / mu(s.scaleY || 1))),
            (a || 1 !== n || 1 !== o) &&
              ((n *= fu(p + (c || 0))), (o *= fu(g + (u || 0))), (d = pu()), a && _u(d, a), gu(d, 1 / n, 1 / o)))
          const _ = i.getCanvas(p, g, s.opacity, s.filters, c, u, e.leafer && e.leafer.config.smooth),
            f = i.getPattern(_, s.repeat || w.origin.noRepeat || 'no-repeat', d, t)
          ;((t.style = f), (t.patternId = r))
        }
      },
      getPatternFixScale: function (t, e, i) {
        const { image: s } = t
        let n,
          o = w.image.maxPatternSize,
          r = s.width * s.height
        return (s.isSVG ? e > 1 && (n = Math.ceil(e) / e) : o > r && (o = r), (r *= e * i) > o && (n = Math.sqrt(o / r)), n)
      },
      createData: function (t, e, i, s) {
        t.data = tl.getPatternData(i, s, e)
      },
      getPatternData: function (t, e, i) {
        ;(t.padding && (e = $c.set(e).shrink(t.padding)), 'strench' === t.mode && (t.mode = 'stretch'))
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
              ;(_ && ((t = e.width / _.width), (i = e.height / _.height)),
                tl.clipMode(w, e, Qc.x, Qc.y, b, E, p, g, t, i),
                t && ((b = b ? b * t : t), (E = E ? E * i : i)))
            }
            break
          case 'repeat':
            ;((!v || b || p || g) && tl.repeatMode(w, e, s, n, Qc.x, Qc.y, b, E, p, g, h, t.freeTransform),
              f || (w.repeat = 'repeat'))
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
        ;(o || r ? ru(n, o, r) : (n.onlyScale = !0), lu(n, i, s), (t.transform = n))
      },
      fillOrFitMode: function (t, e, i, s, n, o, r) {
        const a = su()
        ;(ru(a, e.x + i, e.y + s), lu(a, n, o), r && ou(a, { x: e.x + e.width / 2, y: e.y + e.height / 2 }, r), (t.transform = a))
      },
      clipMode: function (t, e, i, s, n, o, r, a, h, l) {
        const d = su()
        ;(uu(d, e, i, s, n, o, r, a), h && (r || a ? (nu(iu), au(iu, e, h, l), hu(d, iu)) : au(d, e, h, l)), (t.transform = d))
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
          ;((eu.x = e.x + n), (eu.y = e.y + o), ru(u, eu.x, eu.y), r && au(u, eu, r, a))
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
        ((n = i[t]),
          r(n) ? ((a = t / (l - 1)), (o = Zh.string(n, s))) : ((a = n.offset), (o = Zh.string(n.color, s))),
          e.addColorStop(a, o),
          !h && wu(o) && (h = !0))
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
      ;((o = ku()), n ? (Pu(o, e, (r / a) * (s || 1), 1), Bu(o, e, t + 90)) : (Pu(o, e, 1, (r / a) * (s || 1)), Bu(o, e, t)))
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
        ;(vu(i || 'top', e, xu), vu(s || 'bottom', e, bu))
        const r = w.canvas.createLinearGradient(xu.x, xu.y, bu.x, bu.y),
          a = { type: n, style: r }
        return (Eu(a, r, t.stops, o), a)
      },
      radialGradient: function (t, e) {
        let { from: i, to: s, type: n, opacity: o, stretch: r } = t
        ;(Lu(i || 'center', e, Ru), Lu(s || 'bottom', e, Cu))
        const a = w.canvas.createRadialGradient(Ru.x, Ru.y, 0, Ru.x, Ru.y, Su(Ru, Cu)),
          h = { type: n, style: a }
        Eu(h, a, t.stops, o)
        const l = Ou(e, Ru, Cu, r, !0)
        return (l && (h.transform = l), h)
      },
      conicGradient: function (t, e) {
        let { from: i, to: s, type: n, opacity: o, stretch: r } = t
        ;(Du(i || 'center', e, Mu), Du(s || 'bottom', e, Iu))
        const a = w.conicGradientSupport
            ? w.canvas.createConicGradient(0, Mu.x, Mu.y)
            : w.canvas.createRadialGradient(Mu.x, Mu.y, 0, Mu.x, Mu.y, Au(Mu, Iu)),
          h = { type: n, style: a }
        Eu(h, a, t.stops, o)
        const l = Ou(e, Mu, Iu, r || 1, w.conicGradientRotate90)
        return (l && (h.transform = l), h)
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
        ;((i = t.x || 0),
          (s = t.y || 0),
          (o = 1.5 * (t.blur || 0)),
          (n = Nu(t.spread || 0)),
          (r = Hu(r, n + o - s)),
          (a = Hu(a, n + o + i)),
          (h = Hu(h, n + o + s)),
          (l = Hu(l, n + o - i)))
      }),
      r === a && a === h && h === l ? r : [r, a, h, l]
    )
  }
  function ju(t, e, i) {
    const { shapeBounds: s } = i
    let n, o
    ;(w.fullImageShadow ? (Wu(Yu, t.bounds), zu(Yu, e.x - s.x, e.y - s.y), (n = t.bounds), (o = Yu)) : ((n = s), (o = e)),
      t.copyWorld(i.canvas, n, o))
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
        ;(Uu(h, Vu, l),
          r.forEach((r, _) => {
            let f = 1
            if (r.scaleFixed) {
              const t = Math.abs(o.scaleX)
              t > 1 && (f = 1 / t)
            }
            ;(p.setWorldShadow(
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
              g && _ < g && p.clearWorld(s))
          }),
          p.recycle(s))
      },
      innerShadow: function (t, e, i) {
        let s, n
        const { __nowWorld: o } = t,
          { innerShadow: r } = t.__,
          { worldCanvas: a, bounds: h, renderBounds: l, shapeBounds: d, scaleX: c, scaleY: u } = i,
          p = e.getSameCanvas(),
          g = r.length - 1
        ;(Ku(h, qu, l),
          r.forEach((r, _) => {
            let f = 1
            if (r.scaleFixed) {
              const t = Math.abs(o.scaleX)
              t > 1 && (f = 1 / t)
            }
            ;(p.save(),
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
              g && _ < g && p.clearWorld(s))
          }),
          p.recycle(s))
      },
      blur: function (t, e, i) {
        const { blur: s } = t.__
        ;(i.setWorldBlur(s * t.__nowWorld.a), i.copyWorldToInner(e, t.__nowWorld, t.__layout.renderBounds), (i.filter = 'none'))
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
          ;(i.resetTransform(), (i.opacity = 1), i.useMask(s, r), o && s.recycle(r))
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
    ;(e.resetTransform(), (e.opacity = s), e.copyWorld(i, r, void 0, n), o ? i.recycle(r) : i.clearWorld(r))
  }
  t.Group.prototype.__renderMask = function (t, e) {
    let i, s, n, o, r, a
    const { children: h } = this
    for (let l = 0, d = h.length; l < d; l++) {
      if (((i = h[l]), (a = i.__.mask), a)) {
        ;(r && (tp(this, r, t, n, s, o, void 0, !0), (s = n = null)),
          ('clipping' !== a && 'clipping-path' !== a) || Ju(i, e) || i.__render(t, e),
          (o = i.__.opacity),
          (Qu = !1),
          'path' === a || 'clipping-path' === a
            ? (o < 1 ? ((r = 'opacity-path'), n || (n = ep(t))) : ((r = 'path'), t.save()), i.__clip(n || t, e))
            : ((r = 'grayscale' === a ? 'grayscale' : 'alpha'), s || (s = ep(t)), n || (n = ep(t)), i.__render(s, e)))
        continue
      }
      const d = 1 === o && i.__.__blendMode
      ;(d && tp(this, r, t, n, s, o, void 0, !1), Ju(i, e) || i.__render(n || t, e), d && tp(this, r, t, n, s, o, d, !1))
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
    return (t.split('').forEach(t => (e[t] = !0)), e)
  }
  const ap = rp('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz'),
    hp = rp('{[(<\'"《（「〈『〖【〔｛┌＜‘“＝¥￥＄€£￡¢￠'),
    lp = rp(sp),
    dp = rp(np),
    cp = rp('- —／～｜┆·')
  var up
  !(function (t) {
    ;((t[(t.Letter = 0)] = 'Letter'),
      (t[(t.Single = 1)] = 'Single'),
      (t[(t.Before = 2)] = 'Before'),
      (t[(t.After = 3)] = 'After'),
      (t[(t.Symbol = 4)] = 'Symbol'),
      (t[(t.Break = 5)] = 'Break'))
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
      for (let o = n - 1; o > -1 && ((i = e[o].data[0]), ' ' === i.char); o--) (s++, (t.width -= i.width))
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
    ;(Fp && !Ip && (Ip = Fp), Lp.data.push({ char: t, width: e }), (Cp += e))
  }
  function Kp() {
    ;((Op += Cp), (Lp.width = Cp), Rp.words.push(Lp), (Lp = { data: [] }), (Cp = 0))
  }
  function qp() {
    ;(Np && (Yp.paraNumber++, (Rp.paraStart = !0), (Np = !1)),
      Fp && ((Rp.startCharSize = Ip), (Rp.endCharSize = Fp), (Ip = 0)),
      (Rp.width = Op),
      Xp.width ? bp(Rp) : Vp && Zp(),
      Gp.push(Rp),
      (Rp = { words: [] }),
      (Op = 0))
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
          ;((Yp = t), (Gp = t.rows), (Xp = t.bounds), (Vp = !Xp.width && !i.autoSizeAlign))
          const { __letterSpacing: s, paraIndent: n, textCase: o } = i,
            { canvas: r } = w,
            { width: a } = Xp
          if (i.__isCharMode) {
            const t = 'none' !== i.textWrap,
              h = 'break' === i.textWrap
            ;((Np = !0), (zp = null), (Ip = Mp = Fp = Cp = Op = 0), (Lp = { data: [] }), (Rp = { words: [] }), s && (e = [...e]))
            for (let i = 0, l = e.length; i < l; i++)
              ((Dp = e[i]),
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
                    (zp = Wp)))
            ;(Cp && Kp(), Op && qp(), Gp.length > 0 && (Gp[Gp.length - 1].paraEnd = !0))
          } else
            e.split('\n').forEach(t => {
              ;(Yp.paraNumber++,
                (Op = r.measureText(t).width),
                Gp.push({ x: n || 0, text: t, width: Op, paraStart: !0 }),
                Vp && Zp())
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
          if (h && m > f) ((m = Math.max(f, o)), n > 1 && (t.overflow = n))
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
            ;(v.paraStart && c && r > 0 && (y += c),
              (v.y = y),
              (y += o),
              t.overflow > r && y > m && ((v.isOverflow = !0), (t.overflow = r + 1)),
              (w = v.x),
              (x = v.width),
              a < 0 && (v.width < 0 ? ((x = -v.width + e.fontSize + a), (w -= x), (x += e.fontSize)) : (x -= a)),
              w < s.x && (s.x = w),
              x > s.width && (s.width = x),
              h && _ && _ < x && ((v.isOverflow = !0), t.overflow || (t.overflow = i.length)))
          }
          ;((s.y = g), (s.height = m))
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
                      ;((t.text = ''),
                        t.words.forEach(e => {
                          e.data.forEach(e => {
                            t.text += e.char
                          })
                        }))
                    })(t))
                  : ((t.x += g),
                    (d = t.x),
                    (t.data = []),
                    t.words.forEach((e, i) => {
                      ;(1 === _
                        ? ((f = { char: '', x: d }),
                          (d = (function (t, e, i) {
                            return (
                              t.forEach(t => {
                                ;((i.char += t.char), (e += t.width))
                              }),
                              e
                            )
                          })(e.data, d, f)),
                          (t.isOverflow || ' ' !== f.char) && t.data.push(f))
                        : (d = (function (t, e, i, s, n) {
                            return (
                              t.forEach(t => {
                                ;((s || ' ' !== t.char) && ((t.x = e), i.push(t)), (e += t.width), n && (e += n))
                              }),
                              e
                            )
                          })(e.data, d, t.data, t.isOverflow, v && p)),
                        v &&
                          ((y = i === m - 1),
                          u ? y || ((d += u), (t.width += u)) : p && (t.width += p * (e.data.length - (y ? 1 : 0)))))
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
                      ;(e.data.splice(s + 1), (e.width -= t.width))
                      break
                    }
                    e.width -= t.width
                  }
                  ;((e.width += h),
                    e.data.push({ char: r, x: a }),
                    e.textMode &&
                      (function (t) {
                        ;((t.text = ''),
                          t.data.forEach(e => {
                            t.text += e.char
                          }),
                          (t.data = null))
                      })(e))
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
  ;(Object.assign(qh, ig),
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
    Sh())
  class og extends Wr {
    get list() {
      return ng(this.value)
    }
    get oldList() {
      return ng(this.oldValue)
    }
    constructor(t, e) {
      ;(super(t), e && Object.assign(this, e))
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
                ;(o.setDimOthers(!1),
                  o.setBright(!1),
                  c(e) && e.length > 1 && e[0].locked && e.splice(0, 1),
                  o.single && (delete o.element.syncEventer, delete o.element.__world.ignorePixelSnap))
              }
              const s = t ? og.BEFORE_SELECT : og.BEFORE_HOVER
              this.hasEvent(s) && this.emitEvent(new og(s, { editor: o, value: e, oldValue: n }))
            }
            ;((this[s] = e), t(this, n))
          }
        }
      })
    }
  }
  ;((og.BEFORE_SELECT = 'editor.before_select'),
    (og.SELECT = 'editor.select'),
    (og.AFTER_SELECT = 'editor.after_select'),
    (og.BEFORE_HOVER = 'editor.before_hover'),
    (og.HOVER = 'editor.hover'))
  const { abs: ag } = Math,
    { copy: hg } = tt,
    { setListWithFn: lg } = jt,
    { worldBounds: dg } = mr,
    cg = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 },
    ug = { x: 0, y: 0, width: 0, height: 0 }
  class pg extends t.UI {
    constructor() {
      ;(super(), (this.list = []), (this.visible = 0), (this.hittable = !1), (this.strokeAlign = 'center'))
    }
    setTarget(t, e) {
      ;(e && this.set(e), (this.target = t), this.update())
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
            ;(hg(cg, c),
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
              h && (r(h) ? Qh.fill(h, this, t, e) : Qh.fills(h, this, t, e)))
          }
        }
        n.strokeWidth = a
      }
    }
    destroy() {
      ;((this.target = null), super.destroy())
    }
  }
  ;(ye(
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
    ye([Ro('render-path')], pg.prototype, 'strokePathType', void 0))
  class gg extends t.Group {
    constructor(e) {
      ;(super(e),
        (this.strokeArea = new t.Rect({ strokeAlign: 'center' })),
        (this.fillArea = new t.Rect()),
        (this.visible = 0),
        (this.hittable = !1),
        this.addMany(this.fillArea, this.strokeArea))
    }
    setStyle(t, e) {
      const { visible: i, stroke: s, strokeWidth: n } = t
      ;((this.visible = i),
        this.strokeArea.reset(Object.assign({ stroke: s, strokeWidth: n }, e || {})),
        this.fillArea.reset({ visible: !e, fill: s, opacity: 0.2 }))
    }
    setBounds(t) {
      ;(this.strokeArea.set(t), this.fillArea.set(t))
    }
  }
  const _g = {
    findOne: t => t.list.find(t => t.editable),
    findByBounds(t, e) {
      const i = []
      return (fg([t], i, e), i)
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
      ;(super(),
        (this.hoverStroker = new pg()),
        (this.targetStroker = new pg()),
        (this.bounds = new $t()),
        (this.selectArea = new gg()),
        (this.__eventIds = []),
        (this.editor = t),
        this.addMany(this.targetStroker, this.hoverStroker, this.selectArea),
        this.__listenEvents())
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
      ;('tap' === i ? this.checkAndSelect(t) : this.waitSelect && this.waitSelect(),
        this.needRemoveItem ? e.removeItem(this.needRemoveItem) : this.isMoveMode && (s || (e.target = null)))
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
        ;(this.bounds.set(n, o),
          this.selectArea.setStyle({ visible: !0, stroke: i, x: n, y: o }, s),
          this.selectArea.setBounds(this.bounds.get()),
          (this.originList = e.leafList.clone()))
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
            ;(this.originList.forEach(e => {
              n.has(e) || t.push(e)
            }),
              n.forEach(e => {
                this.originList.has(e) || t.push(e)
              }),
              (t.length !== e.list.length || e.list.some((e, i) => e !== t[i])) && (e.target = t))
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
        ;((this.bounds.x += e), (this.bounds.y += i))
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
        ;((i.selector.proxy = e),
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
          ]))
      })
    }
    __removeListenEvents() {
      this.off_(this.__eventIds)
    }
    destroy() {
      ;((this.editor = this.originList = this.needRemoveItem = null), this.__removeListenEvents(), super.destroy())
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
          ;(o && ((s.x *= 2), (s.y *= 2)), (s.x *= a ? x : E), (s.y *= a ? b : T))
          const t = (-s.y + w) / w,
            e = (s.x + v) / v,
            r = (s.y + w) / w,
            h = (-s.x + v) / v
          switch (i) {
            case xg:
              ;((p = t), (l = 'bottom'))
              break
            case Eg:
              ;((u = e), (l = 'left'))
              break
            case Sg:
              ;((p = r), (l = 'top'))
              break
            case Bg:
              ;((u = h), (l = 'right'))
              break
            case wg:
              ;((p = t), (u = h), (l = 'bottom-right'))
              break
            case bg:
              ;((p = t), (u = e), (l = 'bottom-left'))
              break
            case Tg:
              ;((p = r), (u = e), (l = 'top-left'))
              break
            case kg:
              ;((p = r), (u = h), (l = 'top-right'))
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
                  ;((d = Math.sqrt(Cg(u * p))), (u = Rg(u) * d), (p = Rg(p) * d))
              }
        }
        const B = 1 !== u,
          P = 1 !== p
        if ((B && (u /= S), P && (p /= k), !r)) {
          const { worldTransform: e } = t
          ;(u < 0 && (u = 1 / g.width / e.scaleX), p < 0 && (p = 1 / g.height / e.scaleY))
        }
        if ((Pg(o || l, g, c, !0), m)) {
          const e = { x: u, y: p }
          ;(Md.limitScaleOf(t, c, e, n), (u = e.x), (p = e.y))
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
        return (Pg(n || o, t.boxBounds, r, !0), { origin: r, rotation: ut.getRotation(s, t.getWorldPointByBox(r), i) })
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
            ;((o = { x: 0.5, y: 0 }), (n = 'bottom'), (a = 1))
            break
          case Sg:
          case Tg:
            ;((o = { x: 0.5, y: 1 }), (n = 'top'), (a = 1))
            break
          case Bg:
          case kg:
            ;((o = { x: 0, y: 0.5 }), (n = 'right'), (h = 1))
            break
          case Eg:
          case bg:
            ;((o = { x: 1, y: 0.5 }), (n = 'left'), (h = 1))
        }
        const { width: l, height: d } = t
        ;((o.x = o.x * l), (o.y = o.y * d), Pg(s || n, t, r, !0))
        const c = ut.getRotation(o, r, { x: o.x + (a ? i.x : 0), y: o.y + (h ? i.y : 0) })
        return (a ? (a = -c) : (h = c), { origin: r, skewX: a, skewY: h })
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
    if ('move' === l) return ((i.cursor = d), void (g || (i.visible = !1)))
    if ('button' === l) return void (i.cursor || (i.cursor = 'pointer'))
    let y = l.includes('resize')
    y && f && (t.isHoldRotateKey(e) || !_) && (y = !1)
    const v = m && !y && ('resize-line' === i.name || 'skew' === l),
      w = s ? (n ? p : o ? c : u) : v ? p : y ? c : u
    ;((h += 45 * (Og.getFlipDirection(i.direction, r, a) + 1)), (h = 2 * Math.round(z.formatRotation(h, !0) / 2)))
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
      ;(super(t), (this.useFastShadow = !0))
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
      ;(super(),
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
        this.__listenEvents())
    }
    create() {
      let t, e, i
      const { view: s, resizePoints: n, rotatePoints: o, resizeLines: r, rect: a, circle: h, buttons: l } = this,
        d = ['bottom-right', 'bottom', 'bottom-left', 'left', 'top-left', 'top', 'top-right', 'right']
      for (let s = 0; s < 8; s++)
        ((t = new Fg({ name: 'rotate-point', around: d[s], width: 15, height: 15, hitFill: 'all' })),
          o.push(t),
          this.listenPointEvents(t, 'rotate', s),
          s % 2 &&
            ((e = new Fg({ name: 'resize-line', around: 'center', width: 10, height: 10, hitFill: 'all' })),
            r.push(e),
            this.listenPointEvents(e, 'resize', s)),
          (i = new Fg({ name: 'resize-point', hitRadius: 5 })),
          n.push(i),
          this.listenPointEvents(i, 'resize', s))
      ;(this.listenPointEvents(h, 'rotate', 2),
        this.listenPointEvents(a, 'move', 8),
        s.addMany(...o, a, h, l, ...r, ...n),
        this.add(s))
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
        ((g = r[t]),
          g.set(this.getPointStyle(t % 2 ? u[((t - 1) / 2) % u.length] : c[(t / 2) % c.length])),
          (g.rotation = ((t - (t % 2 ? 1 : 0)) / 2) * 90),
          t % 2 &&
            a[(t - 1) / 2].set(
              Object.assign({ pointType: 'resize', rotation: ((t - 1) / 2) * 90 }, p[((t - 1) / 2) % p.length] || {})
            ))
      ;(n.set(this.getPointStyle(e.circle || e.rotatePoint || c[0])),
        s.set(Object.assign({ stroke: h, strokeWidth: l, opacity: 1, editConfig: zg }, e.rect || {})))
      const f = o(e.rectThrough) ? i : e.rectThrough
      ;((s.hittable = !f),
        f && ((t.syncEventer = s), (this.app.interaction.bottomList = [{ target: s, proxy: t }])),
        i && _.stintSet(t.__world, 'ignorePixelSnap', d),
        Mg(this))
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
      ;((this.visible = !this.target.locked),
        this.set({ x: e, y: i, scaleX: s, scaleY: n, rotation: o, skewX: r, skewY: a }),
        this.updateBounds({ x: 0, y: 0, width: h, height: l }))
    }
    unload() {
      ;((this.visible = !1), this.app && (this.rect.syncEventer = this.app.interaction.bottomList = null))
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
          (Bt.toPoint(Bt.directionData[i], t, T),
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
                : ((E.width = c + E.height), _ && 2 * w.width > c && (w.visible = !1))))
        ;((o.visible = y && g && !(!i.circle && !i.rotatePoint)),
          o.visible && this.layoutCircle(),
          n.path && (n.path = null),
          n.set(Object.assign(Object.assign({}, t), { visible: !s || f })),
          (r.visible = (y && r.children.length > 0) || 0),
          r.visible && this.layoutButtons())
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
      ;(this.setButtonPosition(t, h, s, !!n), i && (t.rotation = 90 * (h - a)), (t.scaleX = o ? -1 : 1), (t.scaleY = r ? -1 : 1))
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
      ;('move' === i
        ? s && (this.moving = !0)
        : (i.includes('rotate') || this.isHoldRotateKey(t) || !n
            ? (o && (this.rotating = !0),
              'resize-rotate' === i
                ? n && (this.resizing = !0)
                : 'resize-line' === e.name && (r && (this.skewing = !0), (this.rotating = !1)))
            : 'resize' === i && n && (this.resizing = !0),
          'skew' === i && r && (this.skewing = !0)),
        this.onTransformStart(t))
    }
    onDrag(t) {
      const { transformTool: e, moving: i, resizing: s, rotating: n, skewing: o } = this
      if (i) e.onMove(t)
      else if (s || n || o) {
        const i = t.current
        ;(i.pointType && (this.enterPoint = i), n && e.onRotate(t), s && e.onScale(t), o && e.onSkew(t))
      }
      Dg(this, t)
    }
    onDragEnd(t) {
      ;(this.onTransformEnd(t), (this.dragPoint = null))
    }
    onTransformStart(t) {
      ;((this.moving || this.gesturing) && (this.editor.opacity = this.mergedConfig.hideOnMove ? 0 : 1),
        this.resizing && (Zr.resizingKeys = this.editor.leafList.keys))
      const { dragStartData: e, target: i } = this
      ;((e.x = t.x),
        (e.y = t.y),
        (e.totalOffset = { x: 0, y: 0 }),
        (e.point = { x: i.x, y: i.y }),
        (e.bounds = Object.assign({}, i.getLayoutBounds('box', 'local'))),
        (e.rotation = i.rotation))
    }
    onTransformEnd(e) {
      ;(this.canDragLimitAnimate && (e instanceof t.DragEvent || e instanceof t.MoveEvent) && this.transformTool.onMove(e),
        this.resizing && (Zr.resizingKeys = null),
        (this.dragging = this.gesturing = this.moving = this.resizing = this.rotating = this.skewing = !1),
        (this.editor.opacity = 1),
        this.editor.update())
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
          ;(i.openGroup(s), (i.target = i.selector.findDeepOne(e)))
        } else i.openInnerEditor()
      }
    }
    listenPointEvents(e, i, s) {
      ;((e.direction = s),
        (e.pointType = i),
        this.__eventIds.push(
          e.on_([
            [t.DragEvent.START, this.onDragStart, this],
            [t.DragEvent.DRAG, this.onDrag, this],
            [t.DragEvent.END, this.onDragEnd, this],
            [
              t.PointerEvent.ENTER,
              t => {
                ;((this.enterPoint = e), Dg(this, t))
              }
            ],
            [
              t.PointerEvent.LEAVE,
              () => {
                this.enterPoint = null
              }
            ]
          ])
        ))
    }
    __listenEvents() {
      const { rect: e, editor: i, __eventIds: s } = this
      ;(s.push(
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
        }))
    }
    __removeListenEvents() {
      this.off_(this.__eventIds)
    }
    destroy() {
      ;((this.editor = null), this.__removeListenEvents(), super.destroy())
    }
  }
  const Hg = { x: 0, y: 0, width: 1e5, height: 1e5 }
  class Ng extends t.UI {
    constructor(t) {
      ;(super(), (this.editor = t), (this.hittable = !1), (this.visible = 0))
    }
    __updateWorldBounds() {
      ;(Object.assign(this.__local, Hg), Object.assign(this.__world, Hg))
    }
    __draw(t, e) {
      const { editor: i } = this,
        { mask: s } = i.mergedConfig
      if (s && i.editing) {
        if (
          (t.fillWorld(t.bounds, !0 === s ? 'rgba(0,0,0,0.8)' : s), e.bounds && !e.bounds.hit(i.editBox.rect.__world, e.matrix))
        )
          return
        ;(t.saveBlendMode('destination-out'),
          (e = Object.assign(Object.assign({}, e), { shape: !0 })),
          i.list.forEach(i => {
            i.__render(t, e)
            const { parent: s } = i
            s && s.textBox && s.__renderShape(t, e)
          }),
          t.restoreBlendMode())
      }
    }
    destroy() {
      ;((this.editor = null), super.destroy())
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
    ;(e.safeChange(() => {
      ;(Vg.setListWithFn(i, t => t.getBounds('box', 'page')),
        0 === Vg.width && (Vg.width = 0.1),
        0 === Vg.height && (Vg.height = 0.1),
        e.reset(Vg.get()))
    }),
      s.add(e))
  }
  const jg = (t, e) => t.parent.children.indexOf(t) - e.parent.children.indexOf(e),
    Kg = (t, e) => e.parent.children.indexOf(e) - t.parent.children.indexOf(t),
    qg = {
      group(e, i, s) {
        e.sort(Kg)
        const { app: n, parent: o } = e[0]
        let r
        ;((r = s && s.add ? s : new t.Group(s)), o.addAt(r, o.children.indexOf(e[0])), e.sort(jg))
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
              for (; s.length; ) (i.push(s[0]), s[0].dropTo(e, e.children.indexOf(t)))
              t.isBranchLeaf ? i.push(t) : t.remove()
            } else i.push(t)
          }),
          e.unlockLayout(),
          i
        )
      },
      toTop(t) {
        ;(t.sort(jg),
          t.forEach(t => {
            t.parent && t.parent.add(t)
          }))
      },
      toBottom(t) {
        ;(t.sort(Kg),
          t.forEach(t => {
            t.parent && t.parent.addAt(t, 0)
          }))
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
        ;(t_[e] && Zg.repeat(e), (t_[e] = t))
      },
      get: (t, e) => new t_[t](e)
    },
    { list: t_ } = Qg
  class e_ extends og {
    constructor(t, e) {
      super(t, e)
    }
  }
  ;((e_.BEFORE_OPEN = 'innerEditor.before_open'),
    (e_.OPEN = 'innerEditor.open'),
    (e_.BEFORE_CLOSE = 'innerEditor.before_close'),
    (e_.CLOSE = 'innerEditor.close'))
  class i_ extends og {
    constructor(t, e) {
      super(t, e)
    }
  }
  ;((i_.BEFORE_GROUP = 'editor.before_group'),
    (i_.GROUP = 'editor.group'),
    (i_.BEFORE_UNGROUP = 'editor.before_ungroup'),
    (i_.UNGROUP = 'editor.ungroup'),
    (i_.BEFORE_OPEN = 'editor.before_open_group'),
    (i_.OPEN = 'editor.open_group'),
    (i_.BEFORE_CLOSE = 'editor.before_close_group'),
    (i_.CLOSE = 'editor.close_group'))
  const { updateMatrix: s_ } = lr,
    n_ = { x: 1, y: 1, scaleX: 1, scaleY: 1, rotation: 1, skewX: 1, skewY: 1 },
    o_ = 'top-left'
  class r_ extends t.Rect {
    get __tag() {
      return 'SimulateElement'
    }
    constructor(t) {
      ;(super(),
        (this.checkChange = !0),
        (this.canChange = !0),
        (this.visible = this.hittable = !1),
        this.on(Hr.CHANGE, e => {
          if (this.checkChange && n_[e.attrName]) {
            const { attrName: i, newValue: s, oldValue: n } = e,
              o = 's' === i[0] ? (s || 1) / (n || 1) : (s || 0) - (n || 0)
            this.canChange = !1
            const r = this.__
            ;((r[i] = n), s_(this.parent), s_(this))
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
        }))
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
  ;((a_.BEFORE_MOVE = 'editor.before_move'), (a_.MOVE = 'editor.move'))
  class h_ extends og {
    constructor(t, e) {
      super(t, e)
    }
  }
  ;((h_.BEFORE_SCALE = 'editor.before_scale'), (h_.SCALE = 'editor.scale'))
  class l_ extends og {
    constructor(t, e) {
      super(t, e)
    }
  }
  ;((l_.BEFORE_ROTATE = 'editor.before_rotate'), (l_.ROTATE = 'editor.rotate'))
  class d_ extends og {
    constructor(t, e) {
      super(t, e)
    }
  }
  ;((d_.BEFORE_SKEW = 'editor.before_skew'), (d_.SKEW = 'editor.skew'))
  class c_ {
    onMove(e) {
      const { target: i, mergeConfig: s, dragStartData: n } = this.editBox
      let o,
        { dragLimitAnimate: a } = s
      const l = e.type === t.MoveEvent.END || e.type === t.DragEvent.END,
        d = r(i.draggable),
        c = !a || l || d,
        u = { x: e.totalX, y: e.totalY }
      ;(e instanceof t.MoveEvent && ut.move(u, i.getWorldPointByLocal(n.totalOffset, null, !0)),
        e.shiftKey && (Math.abs(u.x) > Math.abs(u.y) ? (u.y = 0) : (u.x = 0)),
        (o = t.DragEvent.getValidMove(i, n.point, u, c)),
        (o.x || o.y) && (a && !d && l ? lr.animateMove(this, o, h(a) ? a : 0.3) : this.move(o)))
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
      ;(e instanceof t.DragEvent && this.editTool && this.editTool.onScaleWithDrag
        ? ((u.drag = e), this.scaleWithDrag(u))
        : this.scaleOf(u.origin, u.scaleX, u.scaleY),
        ut.move(o.totalOffset, i.x - p, i.y - g))
    }
    onRotate(e) {
      const { target: i, mergeConfig: s, dragStartData: n } = this.editBox,
        { around: o, rotateAround: r, rotateGap: a, diagonalRotateKey: h } = s,
        { direction: l } = e.current
      let d, c
      if (e instanceof t.RotateEvent) ((c = e.rotation), (d = r ? Bt.getPoint(r, i.boxBounds) : i.getBoxPoint(e)))
      else {
        const t = h ? e.isHoldKeys(h) : e.shiftKey,
          s = Og.getRotateData(i, l, e, n, t ? null : r || i.around || i.origin || o || 'center')
        ;((c = n.rotation + s.rotation - i.rotation), (d = s.origin))
      }
      if (((c = z.float(z.getGapRotation(c, a, i.rotation), 2)), !c)) return
      const u = i.x,
        p = i.y
      ;(this.rotateOf(d, c), ut.move(n.totalOffset, i.x - u, i.y - p))
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
        if (u(s)) ((t = s.x), (e = s.y))
        else if (!1 === s) return
      }
      const a = i.getWorldPointByLocal({ x: t, y: e }, null, !0)
      n || i.safeChange(() => i.move(t, e))
      const h = { target: i, editor: o, moveX: a.x, moveY: a.y }
      this.emitEvent(new a_(a_.BEFORE_MOVE, h))
      const l = new a_(a_.MOVE, h)
      ;(this.doMove(l), this.emitEvent(l))
    }
    scaleWithDrag(t) {
      if (!this.checkTransform('resizeable')) return
      const { target: e, mergeConfig: i, editor: s } = this.editBox,
        { beforeScale: n } = i
      if (n) {
        const { origin: i, scaleX: s, scaleY: o, drag: r } = t
        if (!1 === n({ target: e, drag: r, origin: i, scaleX: s, scaleY: o })) return
      }
      ;((t = Object.assign(Object.assign({}, t), { target: e, editor: s, worldOrigin: e.getWorldPoint(t.origin) })),
        this.emitEvent(new h_(h_.BEFORE_SCALE, t)))
      const o = new h_(h_.SCALE, t)
      ;(this.editTool.onScaleWithDrag(o), this.emitEvent(o))
    }
    scaleOf(t, e, i = e, s) {
      if (!this.checkTransform('resizeable')) return
      const { target: n, mergeConfig: o, single: r, editor: a } = this.editBox,
        { beforeScale: h } = o
      if (h) {
        const s = h({ target: n, origin: t, scaleX: e, scaleY: i })
        if (u(s)) ((e = s.scaleX), (i = s.scaleY))
        else if (!1 === s) return
      }
      const l = this.getWorldOrigin(t),
        d = !r && this.getChangedTransform(() => n.safeChange(() => n.scaleOf(t, e, i))),
        c = { target: n, editor: a, worldOrigin: l, scaleX: e, scaleY: i, transform: d }
      this.emitEvent(new h_(h_.BEFORE_SCALE, c))
      const p = new h_(h_.SCALE, c)
      ;(this.doScale(p), this.emitEvent(p))
    }
    flip(t) {
      if (!this.checkTransform('resizeable')) return
      const { target: e, single: i, editor: s } = this.editBox,
        n = this.getWorldOrigin('center'),
        o = i ? new wt(lr.getFlipTransform(e, t)) : this.getChangedTransform(() => e.safeChange(() => e.flip(t))),
        r = { target: e, editor: s, worldOrigin: n, scaleX: 'x' === t ? -1 : 1, scaleY: 'y' === t ? -1 : 1, transform: o }
      this.emitEvent(new h_(h_.BEFORE_SCALE, r))
      const a = new h_(h_.SCALE, r)
      ;(this.doScale(a), this.emitEvent(a))
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
      ;(this.doRotate(c), this.emitEvent(c))
    }
    skewOf(t, e, i = 0, s) {
      if (!this.checkTransform('skewable')) return
      const { target: n, mergeConfig: o, single: r, editor: a } = this.editBox,
        { beforeSkew: h } = o
      if (h) {
        const s = h({ target: n, origin: t, skewX: e, skewY: i })
        if (u(s)) ((e = s.skewX), (i = s.skewY))
        else if (!1 === s) return
      }
      const l = this.getWorldOrigin(t),
        d = !r && this.getChangedTransform(() => n.safeChange(() => n.skewOf(t, e, i))),
        c = { target: n, editor: a, worldOrigin: l, skewX: e, skewY: i, transform: d }
      this.emitEvent(new d_(d_.BEFORE_SKEW, c))
      const p = new d_(d_.SKEW, c)
      ;(this.doSkew(p), this.emitEvent(p))
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
      return (t(), new wt(e.worldTransform).divide(s))
    }
    emitEvent(t, e) {
      this.editBox.editor.emitEvent(t, e)
    }
  }
  ;((t.Editor = class extends t.Group {
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
      ;(super(e),
        (this.leafList = new vh()),
        (this.openedGroupList = new vh()),
        (this.simulateTarget = new r_(this)),
        (this.editBox = new Ug(this)),
        (this.editToolList = {}),
        (this.selector = new vg(this)),
        (this.editMask = new Ng(this)),
        (this.targetEventIds = []))
      let i = _.clone(Xg)
      ;(t && (i = _.default(t, i)),
        (this.mergedConfig = this.config = i),
        this.addMany(this.editMask, this.selector, this.editBox),
        le.has('resize') || (this.config.editSize = 'scale'))
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
        ;(this.innerEditing && this.innerEditor.update(), this.editTool.update(), this.selector.update())
      }
    }
    updateEditBox() {
      ;(this.multiple && Gg(this), this.update())
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
          ;(this.editBox.load(), t.load(), this.update())
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
      ;(this.emitGroupEvent(i_.BEFORE_OPEN, t),
        this.openedGroupList.add(t),
        (t.hitChildren = !0),
        this.emitGroupEvent(i_.OPEN, t))
    }
    closeGroup(t) {
      ;(this.emitGroupEvent(i_.BEFORE_CLOSE, t),
        this.openedGroupList.remove(t),
        (t.hitChildren = !1),
        this.emitGroupEvent(i_.CLOSE, t))
    }
    checkOpenedGroups() {
      const t = this.openedGroupList
      if (t.length) {
        let { list: e } = t
        ;(this.editing && ((e = []), t.forEach(t => this.list.every(e => !lr.hasParent(e, t)) && e.push(t))),
          e.forEach(t => this.closeGroup(t)))
      }
      this.editing && !this.selector.dragging && this.checkDeepSelect()
    }
    checkDeepSelect() {
      let t,
        { list: e } = this
      for (let i = 0; i < e.length; i++) for (t = e[i].parent; t && !t.hitChildren; ) (this.openGroup(t), (t = t.parent))
    }
    emitGroupEvent(t, e) {
      const i = new i_(t, { editTarget: e })
      ;(this.emitEvent(i), e && e.emitEvent(i))
    }
    getInnerEditor(t) {
      return (this.editToolList[t] = this.editToolList[t] || Qg.get(t, this))
    }
    openInnerEditor(t, e, i) {
      let s
      if ((r(e) ? (s = e) : i || (i = e), t && i && (this.target = t), this.single)) {
        ;(t || (t = this.element), s || (s = t.editInner))
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
      ;(this.emitEvent(s), i.emitEvent(s))
    }
    lock() {
      ;(this.list.forEach(t => (t.locked = !0)), this.update())
    }
    unlock() {
      ;(this.list.forEach(t => (t.locked = !1)), this.update())
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
        ;((this.targetEventIds = [
          e.on_(Qr.START, this.onRenderStart, this),
          i && i.on_(Hr.SCROLL, this.onChildScroll, this),
          t.on_(Qr.CHILD_START, this.onAppRenderStart, this),
          t.on_(ta.UPDATE_MODE, t => {
            t.mode && 'normal' !== t.mode && this.cancel()
          })
        ]),
          s.visible && s.forceRender())
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
                ;((t.hover || t.hoverStyle) && ((t = Object.assign({}, t)), delete t.hover, delete t.hoverStyle),
                  Object.assign(a, t))
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
          ;(i
            ? ((t.leafList = i instanceof vh ? i : new vh(i)), t.multiple && Gg(t))
            : (t.simulateTarget.remove(), t.leafList.reset()),
            t.closeInnerEditor(!0),
            t.unloadEditTool())
          const s = { editor: t, value: i, oldValue: e }
          ;(t.emitEvent(new og(og.SELECT, s)),
            t.checkOpenedGroups(),
            t.editing
              ? t.waitLeafer(() => {
                  ;(t.updateEditTool(), t.listenTargetEvents())
                })
              : (t.updateEditTool(), t.removeTargetEvents()),
            t.emitEvent(new og(og.AFTER_SELECT, s)))
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
    (t.Editor = ye([qo(c_, ['editBox', 'editTool', 'emitEvent'])], t.Editor)))
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
      ;((this.eventIds = []), (this.editor = t), this.create())
    }
    onCreate() {}
    create() {
      ;((this.view = new t.Group()), this.onCreate())
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
      ;(this.onDestroy(),
        this.editor &&
          (this.view && this.view.destroy(),
          this.eventIds && this.editor.off_(this.eventIds),
          (this.editor = this.view = this.eventIds = null)))
    }
  }
  ;((t.EditTool = class extends u_ {
    static registerEditTool() {
      Qg.register(this)
    }
    get tag() {
      return 'EditTool'
    }
    onMove(t) {
      const { moveX: e, moveY: i, editor: s } = t,
        { app: n, list: o } = s
      ;(n.lockLayout(),
        o.forEach(t => {
          t.moveWorld(e, i)
        }),
        n.unlockLayout())
    }
    onScale(t) {
      const { scaleX: e, scaleY: i, transform: s, worldOrigin: n, editor: o } = t,
        { app: r, list: a } = o
      ;(r.lockLayout(),
        a.forEach(t => {
          const r = 'scale' !== o.getEditSize(t)
          s ? t.transformWorld(s, r) : t.scaleOfWorld(n, e, i, r)
        }),
        r.unlockLayout())
    }
    onRotate(t) {
      const { rotation: e, transform: i, worldOrigin: s, editor: n } = t,
        { app: o, list: r } = n
      ;(o.lockLayout(),
        r.forEach(t => {
          const o = 'scale' !== n.getEditSize(t)
          i ? t.transformWorld(i, o) : t.rotateOfWorld(s, e)
        }),
        o.unlockLayout())
    }
    onSkew(t) {
      const { skewX: e, skewY: i, transform: s, worldOrigin: n, editor: o } = t,
        { app: r, list: a } = o
      ;(r.lockLayout(),
        a.forEach(t => {
          const r = 'scale' !== o.getEditSize(t)
          s ? t.transformWorld(s, r) : t.skewOfWorld(n, e, i, r)
        }),
        r.unlockLayout())
    }
    load() {
      ;((this.editBox.view.visible = !0), this.onLoad())
    }
    update() {
      ;(this.editBox.update(), this.onUpdate())
    }
    unload() {
      ;((this.editBox.view.visible = !1), this.onUnload())
    }
  }),
    (t.EditTool = ye([$g()], t.EditTool)))
  const { left: p_, right: g_ } = t.Direction9,
    { move: __, copy: f_, toNumberPoints: m_ } = ut
  ;((t.LineEditTool = class extends t.EditTool {
    constructor() {
      ;(super(...arguments), (this.scaleOfEvent = !0))
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
        ;(this.dragPoint(i, a, r, n, this.getInnerMove(o, e, s)),
          (t[1] = i.x),
          (t[2] = i.y),
          (t[4] = a.x),
          (t[5] = a.y),
          (o.path = t))
      } else if (o.points) {
        const { points: t } = o,
          { from: i, to: a } = this.getFromToByPoints(t)
        ;(this.dragPoint(i, a, r, n, this.getInnerMove(o, e, s)),
          (t[0] = i.x),
          (t[1] = i.y),
          (t[2] = a.x),
          (t[3] = a.y),
          (o.points = t))
      } else {
        const t = { x: 0, y: 0 },
          { toPoint: i } = o
        ;((o.rotation = 0),
          this.dragPoint(t, i, r, n, this.getInnerMove(o, e, s)),
          o.getLocalPointByInner(t, null, null, !0),
          o.getLocalPointByInner(i, null, null, !0),
          (o.x = t.x),
          (o.y = t.y),
          o.getInnerPointByLocal(i, null, null, !0),
          (o.toPoint = i))
      }
    }
    getInnerMove(t, e, i) {
      const s = e.getInnerMove(t)
      return (i && (Math.abs(s.x) > Math.abs(s.y) ? (s.y = 0) : (s.x = 0)), s)
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
        ;(o.innerToWorld(i, i, !1, t),
          o.innerToWorld(a, a, !1, t),
          n.pen.clearPath().moveTo(i.x, i.y).lineTo(a.x, a.y),
          f_(s[7], i),
          f_(e[7], i),
          f_(s[3], a),
          f_(e[3], a))
      }
      for (let t = 0; t < 8; t++)
        (t < 4 && (i[t].visible = !1), (a = t === p_ || t === g_), (s[t].visible = a), (e[t].visible = !r && a))
    }
  }),
    (t.LineEditTool = ye([$g()], t.LineEditTool)))
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
              ;(O_(t, e, i, n, 1), (n += 3))
              break
            case w_:
              ;(O_(t, e, i, n, 3), (n += 7))
              break
            case x_:
              ;(O_(t, e, i, n, 2), (n += 5))
              break
            case b_:
              n += 1
              break
            case E_:
              ;(O_(t, e, i, n, 2), (n += 5))
              break
            case T_:
              ;(O_(t, e, i, n, 2), (n += 9))
              break
            case S_:
              ;(O_(t, e, i, n, 2), (n += 6))
              break
            case k_:
              ;(O_(t, e, i, n, 2), (n += 9))
              break
            case B_:
              ;(O_(t, e, i, n, 2), (n += 5))
              break
            case P_:
              ;((t[n] = k_), t.splice(n + 4, 0, t[n + 3], 0), O_(t, e, i, n, 2), (n += 9), (o += 2))
              break
            case L_:
              ;((t[n] = B_), t.splice(n + 4, 0, t[n + 3]), O_(t, e, i, n, 2), (n += 5), (o += 1))
              break
            case R_:
              ;(O_(t, e, i, n, 2), (n += 6))
          }
      },
      scalePoints(t, e, i, s, n) {
        for (let o = n ? s + 1 : 0, r = n ? o + 2 * n : t.length; o < r; o += 2) ((t[o] *= e), (t[o + 1] *= i))
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
          ;((o = i), n.affectScaleOrRotation ? t.moveInner(-r / 2, 0) : (t.x -= r / 2))
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
    ;(a && (t.padding = c(a) ? a.map(t => t * o) : a * o), r.__autoWidth || (t.width *= o), r.__autoHeight || (t.height *= o))
  }
  function N_(t, e, i) {
    ;(C_.scale(t.__.path, e, i), (t.path = t.__.path))
  }
  function Y_(t, e, i) {
    const { points: s } = t
    ;(u(s[0])
      ? s.forEach(t => {
          ;((t.x *= e), (t.y *= i))
        })
      : C_.scalePoints(s, e, i),
      (t.points = s))
  }
  function X_(t, e, i) {
    const { children: s } = t
    for (let t = 0; t < s.length; t++) ((A_.a = e), (A_.d = i), s[t].transform(A_, !0))
  }
  const V_ = t.Leaf.prototype
  ;((V_.scaleResize = function (t, e = t, i) {
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
        ;(i && 'left' !== n && 1 !== t && (this.x += r.x), s && 'top' !== o && 1 !== e && (this.y += r.y), U_(this, t, e))
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
      ;((s && i) || U_(this, t, e), i && X_(this, t, e))
    }),
    le.add('resize'),
    le.add('editor', 'resize'),
    (de.editor = function (e, i) {
      const s = new t.Editor(e)
      return (i && i.sky.add((i.editor = s)), s)
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
    }))
  const G_ = { none: 'none', title: 'capitalize', upper: 'uppercase', lower: 'lowercase', 'small-caps': 'small-caps' },
    j_ = { top: 'flex-start', middle: 'center', bottom: 'flex-end' },
    K_ = { none: 'none', under: 'underline', delete: 'line-through', 'under-delete': 'underline line-through' }
  function q_(t, e, i) {
    const { style: s } = t,
      { fill: o, padding: a, textWrap: h, textOverflow: l, textDecoration: d } = e
    let p
    ;((s.fontFamily = e.fontFamily),
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
      (s.textOverflow = 'show' === l ? '' : 'hide' === l ? 'clip' : l))
  }
  function Z_(t) {
    const { scroll: e, disabled: i } = t.app.config.move
    return !e || i ? '' : !0 === e ? 'free' : e
  }
  function $_(e, i, s) {
    ;(J_(e.parentApp ? e.parentApp : e, i),
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
                ;(Math.abs(s.x) > e ? (i.x = 0) : (i.x *= o), Math.abs(s.y) > n ? (i.y = 0) : (i.y *= o))
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
        ))
  }
  function J_(t, e) {
    const i = { wheel: { preventDefault: !0 }, touch: { preventDefault: !0 }, pointer: { preventDefaultMenu: !0 } }
    ;(e && _.assign(i, e), _.assign(t.config, i, t.userConfig))
  }
  ;((t.TextEditor = class extends u_ {
    constructor() {
      ;(super(...arguments), (this.config = { selectAll: !0 }), (this.eventIds = []))
    }
    get tag() {
      return 'TextEditor'
    }
    onLoad() {
      const { editor: e } = this,
        { config: i } = e.app,
        s = this.editTarget
      ;((s.textEditing = !0), (this.isHTMLText = !(s instanceof t.Text)), (this._keyEvent = i.keyEvent), (i.keyEvent = !1))
      const n = (this.editDom = document.createElement('div'))
      n.classList.add('leafer-text-editor')
      const { style: o } = n
      ;((n.contentEditable = 'true'),
        (o.position = 'fixed'),
        (o.transformOrigin = 'left top'),
        (o.boxSizing = 'border-box'),
        this.isHTMLText ? (n.innerHTML = String(s.text)) : (n.innerText = String(s.text)))
      const { view: r } = e.app
      ;((this.inBody = r instanceof HTMLCanvasElement) ? document.body.appendChild(n) : r.appendChild(n),
        (this.eventIds = [
          e.app.on_(t.PointerEvent.DOWN, t => {
            let i,
              { target: s } = t.origin
            for (; s; ) (s === n && (i = !0), (s = s.parentElement))
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
        window.addEventListener('scroll', this.onUpdate))
      const a = window.getSelection(),
        h = document.createRange()
      if (this.config.selectAll) h.selectNodeContents(n)
      else {
        const t = n.childNodes[0]
        ;(t && (h.setStartAfter(t), h.setEndAfter(t)), h.collapse(!0))
      }
      ;(a.removeAllRanges(), a.addRange(h))
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
        ;(s.deleteContents(), s.insertNode(i), s.insertNode(e), s.setStartAfter(e), s.setEndAfter(e), this.onInput())
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
      ;(o.forEach((t, e) => {
        ;(e > 0 && r.appendChild(document.createElement('br')), r.appendChild(document.createTextNode(t)))
      }),
        n.insertNode(r),
        n.collapse(!1),
        s.removeAllRanges(),
        s.addRange(n),
        this.onInput())
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
      ;((i *= e), (s *= e))
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
      ;((_.transform = `matrix(${l},${d},${c},${u},${p},${g})`),
        (_.left = a + 'px'),
        (_.top = h + 'px'),
        (_.width = i + 'px'),
        (_.height = s + 'px'),
        this.isHTMLText || q_(this.editDom, t, e))
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
    le.add('text-editor', 'editor'))
  const Q_ = ie.get('LeaferTypeCreator'),
    tf = {
      list: {},
      register(t, e) {
        ;(ef[t] && Q_.repeat(t), (ef[t] = e))
      },
      run(t, e) {
        const i = ef[t]
        i && i(e)
      }
    },
    { list: ef, register: sf } = tf
  ;(sf('viewport', $_),
    sf('custom', function (t) {
      $_(t, null, !0)
    }),
    sf('design', function (t) {
      $_(t, { zoom: { min: 0.01, max: 256 }, move: { holdSpaceKey: !0, holdMiddleKey: !0 } })
    }),
    sf('document', function (t) {
      $_(t, { zoom: { min: 1 }, move: { scroll: 'limit' } })
    }))
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
        } else ((i.type = s), (i.typeCount = 1))
        return Date.now() - i.startTime >= (e.time || 160) ? of.getType(i.totalData, e) : 'none'
      },
      add(t, e) {
        e && (ut.move(t.move, e.move), (t.scale *= e.scale), (t.rotation += e.rotation), (t.center = e.center))
      },
      reset() {
        const { state: t } = of
        ;((t.type = 'none'), (t.typeCount = 0), (t.startTime = 0), (t.totalData = null))
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
        return (o > 50 && (s = af(50, o / 3) * hf(s)), r > 50 && (n = af(50, r / 3) * hf(n)), { x: -s * i * 2, y: -n * i * 2 })
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
      ;(e.moveType || (e.moveType = 'move'),
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
        this.transformEndWait())
    }
    zoom(e) {
      const { interaction: i } = this
      ;(this.zoomData ||
        (this.setPath(e),
        (pf = 1),
        (this.zoomData = Object.assign(Object.assign({}, e), { scale: 1, totalScale: pf })),
        i.emit(t.ZoomEvent.START, this.zoomData)),
        (e.path = this.zoomData.path),
        (e.totalScale = pf *= e.scale),
        i.emit(t.ZoomEvent.BEFORE_ZOOM, e),
        i.emit(t.ZoomEvent.ZOOM, e),
        this.transformEndWait())
    }
    rotate(e) {
      const { interaction: i } = this
      ;(this.rotateData ||
        (this.setPath(e),
        (gf = 0),
        (this.rotateData = Object.assign(Object.assign({}, e), { rotation: 0, totalRotation: gf })),
        i.emit(t.RotateEvent.START, this.rotateData)),
        (e.path = this.rotateData.path),
        (e.totalRotation = gf += e.rotation),
        i.emit(t.RotateEvent.BEFORE_ROTATE, e),
        i.emit(t.RotateEvent.ROTATE, e),
        this.transformEndWait())
    }
    setPath(t) {
      const { interaction: e } = this,
        { path: i } = e.selector.getByPoint(t, e.hitRadius)
      ;((t.path = i), e.cancelHover())
    }
    transformEndWait() {
      ;(clearTimeout(this.transformTimer),
        (this.transformTimer = setTimeout(() => {
          this.transformEnd()
        }, this.interaction.p.transformTime)))
    }
    transformEnd() {
      const { interaction: e, moveData: i, zoomData: s, rotateData: n } = this
      ;(i && e.emit(t.MoveEvent.END, Object.assign(Object.assign({}, i), { totalX: cf, totalY: uf })),
        s && e.emit(t.ZoomEvent.END, Object.assign(Object.assign({}, s), { totalScale: pf })),
        n && e.emit(t.RotateEvent.END, Object.assign(Object.assign({}, n), { totalRotation: gf })),
        this.reset())
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
  ;((ff.initType = function (t) {
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
      return (i && o < i ? (t = i / e) : s && o > s && (t = s / e), n ? 1 : t)
    }))
  const xf = sc.prototype
  ;((xf.createTransformer = function () {
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
      ;(t.deltaX > 0 ? s && (t.deltaX *= s) : n && (t.deltaX *= n), t.deltaY > 0 ? s && (t.deltaY *= s) : n && (t.deltaY *= n))
      const o = e.getScale ? e.getScale(t, e) : df.getScale(t, e)
      if (1 !== o) this.zoom(wf(o, t))
      else {
        const s = e.getMove ? e.getMove(t, e) : df.getMove(t, e)
        ;(i.snap && ut.round(s), this.move(vf(s, t)))
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
      ;(Object.assign(t, n.center),
        (t.multiTouch = !0),
        a && this.rotate(((h = n.rotation), (l = t), Object.assign(Object.assign({}, l), { rotation: h }))),
        r && this.zoom(wf(n.scale, t)),
        o && this.move(vf(n.move, t)))
    }))
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
  ;((bf.checkDragEndAnimate = function (e) {
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
        ((a = _--), (c += d.moveX * a), (u += d.moveY * a), (g += a), (l = kf(d.moveX, d.moveY)), l > p && (p = l))
      if ((g && ((c /= g), (u /= g)), p > 8)) {
        const t = 1.15 + Tf((p - 8) / 17, 1) * (1.6 - 1.15)
        ;((c *= t), (u *= t))
      }
      const y = Sf(Ef(c), Ef(u))
      y > r && ((l = r / y), (c *= l), (u *= l))
      const v = () => {
        if (((c *= n), (u *= n), (e = Object.assign({}, e)), Ef(c) < o && Ef(u) < o)) return this.dragEndReal(e)
        ;(ut.move(e, c, u), this.drag(e), this.animate(v), i.emit(t.MoveEvent.DRAG_ANIMATE, e))
      }
      this.animate(v)
    }
    return s
  }),
    (bf.animate = function (t, e) {
      const i = t || this.animateWait
      ;(i && this.interaction.target.nextRender(i, null, e), (this.animateWait = t))
    }),
    (bf.stopAnimate = function () {
      ;(this.animate(null, 'off'),
        this.interaction.target.nextRender(() => {
          this.dragData && this.dragEndReal(this.dragData)
        }))
    }),
    (bf.checkDragOut = function (t) {
      const { interaction: e } = this
      ;(this.autoMoveCancel(), this.dragging && !e.shrinkCanvasBounds.hitPoint(t) && this.autoMoveOnDragOut(t))
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
        ;((p += c),
          (g += u),
          ut.move(i, c, u),
          ut.move(this.dragData, c, u),
          e.move(Object.assign(Object.assign({}, t), { moveX: c, moveY: u, totalX: p, totalY: g, moveType: 'drag' })),
          e.pointerMoveReal(t))
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
      if (_) ((_ = this.getValidScale(_)), a.scaleOfWorld(g, _, _, !1, s))
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
    }))
  class Pf extends t.Group {
    get isOutside() {
      return !0
    }
    constructor(t, e) {
      ;(super(),
        (this.config = { theme: 'light', padding: 0, minSize: 10 }),
        t.isApp && (t.sky.add(this), (t = t.tree)),
        (this.target = t),
        e && _.assign(this.config, e),
        this.changeTheme(this.config.theme),
        this.waitLeafer(this.__listenEvents, this))
    }
    changeTheme(e) {
      let i
      ;(r(e)
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
        this.leafer && this.update())
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
      ;(g.set({ x: f + y * d, y: m + v + 2, width: Math.max(y * h, e), visible: u }),
        _.set({ x: f + y + 2, y: m + v * c, height: Math.max(v * l, e), visible: p }))
    }
    onDrag(t) {
      ;((this.dragScrolling = !0), (this.__dragOut = this.app.config.move.dragOut), (this.app.config.move.dragOut = !1))
      const e = t.current === this.scrollXBar,
        i = this.target.leafer.getValidMove(e ? -t.moveX / this.ratioX : 0, e ? 0 : -t.moveY / this.ratioY)
      ;(this.target.moveWorld(i.x, i.y), t.current.moveWorld(i.x && -i.x * this.ratioX, i.y && -i.y * this.ratioY))
    }
    onDragEnd() {
      ;((this.dragScrolling = !1), (this.app.config.move.dragOut = this.__dragOut))
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
      ;((this._text = t), (this.__htmlChanged = !0))
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
  ;((t.HTMLText = class extends t.Image {
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
        ;((i.all = 'initial'),
          (i.position = 'absolute'),
          (i.visibility = 'hidden'),
          (e.innerHTML = this.text),
          document.body.appendChild(e))
        const { width: s, height: n } = e.getBoundingClientRect(),
          o = s + 10,
          r = `<svg xmlns="http://www.w3.org/2000/svg" width="${o}" height="${n}">\n                        <foreignObject width="${o}" height="${n}">\n                            <style>\n                                * {\n                                    margin: 0;\n                                    padding: 0;\n                                    box-sizing: border-box;\n                                }\n                            </style>\n                            <body xmlns="http://www.w3.org/1999/xhtml">\n                                ${this.decodeText(this.text)}\n                            </body>\n                        </foreignObject>\n                    </svg>`
        ;(t.__setImageFill('data:image/svg+xml,' + encodeURIComponent(r)),
          (t.__naturalWidth = o / t.pixelRatio),
          (t.__naturalHeight = n / t.pixelRatio),
          (t.__htmlChanged = !1),
          e.remove())
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
            ;((s += i), (n = o + 1))
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
    le.add('html'))
  class Cf extends vl {}
  function Of(t) {
    return uo(t, t => ({
      set(e) {
        if (this.__setAttr(t, e)) {
          const t = this.__,
            e = 'none' !== t.startArrow || 'none' !== t.endArrow
          ;(t.__useArrow !== e && Eo(this), (t.__useArrow = e), Bo(this))
        }
      }
    }))
  }
  ;((t.Arrow = class extends t.Line {
    get __tag() {
      return 'Arrow'
    }
    constructor(t) {
      ;(super(t), (this.__.__useArrow = !0))
    }
    static registerArrow(t, e) {
      Jh.register(t, e)
    }
  }),
    ye([Ho(Cf)], t.Arrow.prototype, '__', void 0),
    ye([Of('angle')], t.Arrow.prototype, 'endArrow', void 0),
    (t.Arrow = ye([Zo()], t.Arrow)))
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
              ;(Yf(t, l + 1, e, i, s, n, o, r), (l += 3))
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
              ;((t[l + 1] += e), (t[l + 2] += i), s && (t[l + 3] *= s), o && ((t[l + 4] += o), (t[l + 5] += o)), (l += 7))
          }
      },
      rotate(t, e, i) {
        Nf.layout(t, 0, 0, 1, 1, e, i)
      }
    }
  function Yf(t, e, i, s, n, o, r, a) {
    ;(zf(Hf, t[e], t[e + 1]), r && Wf(Hf, r, a), n && Uf(Hf, n, o), (t[e] = i + Hf.x), (t[e + 1] = s + Hf.y))
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
  ;(Vf(sm.path, 45), Vf(nm.path, 45))
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
              ;((c < 2 || l + 6 >= d) && (xm(Bm, o[l + 1], o[l + 2]), !c && u && wm(Tm, Bm)), (l += 3))
              break
            case lm:
              ;((1 === c || l + 7 >= d - 3) && Lm(o, km, Bm, l + 3), (l += 7))
              break
            case dm:
              ;((1 === c || l + 5 >= d - 3) && Lm(o, km, Bm, l + 1), (l += 5))
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
              ;((1 === c || l + 6 >= d - 3) &&
                (Lm(o, km, Bm, l + 1), l + 6 !== d && ((Bm.x -= (Bm.x - km.x) / 10), (Bm.y -= (Bm.y - km.y) / 10))),
                (l += 6))
          }
          if ((c++, 1 === c && h !== am)) return
          if ((2 === c && u && wm(Sm, h === hm ? Bm : km), l === d)) {
            const r = (t.__.__pathForRender = a ? [...o] : o),
              d = (t.__.__pathForArrow = [])
            if (u) {
              const i = rm(t, e, Sm, Tm, s, Em, !!n)
              ;(n ? d.push(...i) : r.push(...i), Em.x && (bm(Tm, Sm, -Em.x, !0), (r[1] = Sm.x), (r[2] = Sm.y)))
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
    ;(xm(e, t[s], t[s + 1]), xm(i, t[s + 2], t[s + 3]))
  }
  function Rm(t, e, i) {
    ;((t[i] = e.x), (t[i + 1] = e.y))
  }
  ;(le.add('arrow'),
    t.UI.addAttr('startArrow', 'none', Of),
    t.UI.addAttr('endArrow', 'none', Of),
    Object.assign(Jh, Pm),
    Object.assign(Qh, {
      strokeArrow(t, e, i, s) {
        e.__.dashPattern && (i.beginPath(), e.__drawPathByData(i, e.__.__pathForArrow), (i.dashPattern = null), i.stroke())
      }
    }))
  ;((t.Flow = class extends t.Box {
    get __tag() {
      return 'Flow'
    }
    constructor(t) {
      ;(super(t), (this.__hasAutoLayout = !0))
    }
  }),
    ye([Ho(class extends fl {})], t.Flow.prototype, '__', void 0),
    ye([yo('x')], t.Flow.prototype, 'flow', void 0),
    (t.Flow = ye([Zo()], t.Flow)))
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
    ;(Rt.toPoint(i, e, n, Cm), (e.x = s.__autoWidth ? n.x : Cm.x), (e.y = s.__autoHeight ? n.y : Cm.y))
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
      ((a = r[o ? d - t : d + t]),
        a.__.inFlow && 0 !== a.__.visible
          ? ((h = a.__flowBounds),
            'from' !== n && (c = s + (e.height - h.height) / ('center' === n ? 2 : 1)),
            Mm(a, l - h.x, c - h.y),
            (l += h.width + e.gap))
          : i++)
  }
  function Fm(t, e, i) {
    const s = 'width' === i ? 'height' : 'width'
    ;((t[i] = Math.max(t[i], e[i])), (t[s] += t.count ? e[s] + t.gap : e[s]), t.list.push(e), t.count++)
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
        ((n = u[s ? d - t : d + t]),
          n.__.inFlow && 0 !== n.__.visible
            ? (o = n.__widthGrow) &&
              ((r = Vm(n, n.__flowBounds, c * o)), r ? ((a += r), (l -= o)) : h && (n.__.widthRange ? h.unshift(n) : h.push(n)))
            : i++)
      a &&
        (function (t, e, i) {
          let s, n, o, r
          t.forEach(t => {
            ;((s = t.__widthGrow), (n = (e / i) * s), (r = Vm(t, (o = t.__flowBounds), o.width + n)), (e -= n - r), (i -= s))
          })
        })(h, a, l)
    }
  }
  function Vm(t, e, i) {
    const { widthRange: s, lockRatio: n } = t.__,
      o = s ? Ym(i, s) : i,
      r = o / e.width
    return (t.scaleResize(r, n ? r : 1), (e.width = o), i - o)
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
        ((n = u[s ? d - t : d + t]),
          n.__.inFlow && 0 !== n.__.visible
            ? (o = n.__heightGrow) &&
              ((r = Km(n, n.__flowBounds, c * o)), r ? ((a += r), (l -= o)) : h && (n.__.heightRange ? h.unshift(n) : h.push(n)))
            : i++)
      a &&
        (function (t, e, i) {
          let s, n, o, r
          t.forEach(t => {
            ;((s = t.__heightGrow), (n = (e / i) * s), (r = Km(t, (o = t.__flowBounds), o.height + n)), (e -= n - r), (i -= s))
          })
        })(h, a, l)
    }
  }
  function Km(t, e, i) {
    const { heightRange: s, lockRatio: n } = t.__,
      o = s ? Gm(i, s) : i,
      r = o / e.height
    return (t.scaleResize(n ? r : 1, r), (e.height = o), i - o)
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
      ((g = s[(m = e ? h - 1 - o : o)]),
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
            : (qm(g, v - _.x, w - _.y), (v += _.width + p))))
    if (r && y) {
      const { isAutoYGap: s, isFitYGap: n, contentAlign: r, rowXAlign: h, rowYAlign: p } = o
      ;(y.count && (y.grow ? Xm(t, y, x, e) : d && Hm(y, i, x, c), a && Fm(u, y, i)),
        a
          ? (s ? Hm(u, 'height', b, n) : (u.height += (u.gap = l) * (u.list.length - 1)),
            (function (t, e, i, s) {
              Dm(t, e, i)
              const { list: n } = e
              if (n.length > 1 && (s || (s = Om[i]), 'from' !== s)) {
                let t
                for (let i = 0, o = n.length; i < o; i++) ((t = n[i]), (t.x = e.width - t.width), 'center' === s && (t.x /= 2))
              }
            })(t, u, r, h),
            (function (t, e, i, s) {
              const { list: n } = e,
                o = 'reverse' === t.__.flowWrap
              let r,
                { x: a, y: h } = e
              for (let l = 0, d = n.length; l < d; l++)
                ((r = n[o ? d - 1 - l : l]), Im(t, r, a, h, i, s), (h += r.height + e.gap))
            })(t, u, p, e))
          : (Dm(t, y, r), Im(t, y, 0, y.y, p, e)))
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
      ((a = r[o ? d - t : d + t]),
        a.__.inFlow && 0 !== a.__.visible
          ? ((h = a.__flowBounds),
            'from' !== n && (c = i + (e.width - h.width) / ('center' === n ? 2 : 1)),
            $m(a, c - h.x, l - h.y),
            (l += h.height + e.gap))
          : s++)
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
      ((g = s[(m = e ? h - 1 - o : o)]),
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
            : (Qm(g, v - _.x, w - _.y), (w += _.height + p))))
    if (r && y) {
      const { isAutoXGap: s, isFitXGap: n, contentAlign: r, rowXAlign: l, rowYAlign: p } = o
      ;(y.count && (y.grow && jm(t, y, b, e), d && Hm(y, i, b, c), a && Fm(u, y, i)),
        a
          ? (s ? Hm(u, 'width', x, n) : (u.width += (u.gap = h) * (u.list.length - 1)),
            (function (t, e, i, s) {
              Dm(t, e, i)
              const { list: n } = e
              if (n.length > 1 && (s || (s = Am[i]), 'from' !== s)) {
                let t
                for (let i = 0, o = n.length; i < o; i++) ((t = n[i]), (t.y = e.height - t.height), 'center' === s && (t.y /= 2))
              }
            })(t, u, r, p),
            (function (t, e, i, s) {
              const { list: n } = e,
                o = 'reverse' === t.__.flowWrap
              let r,
                { x: a, y: h } = e
              for (let l = 0, d = n.length; l < d; l++) ((r = n[o ? d - 1 - l : l]), Jm(t, r, a, h, i, s), (a += r.width + e.gap))
            })(t, u, l, e))
          : (Dm(t, y, r), Jm(t, y, y.x, 0, l, e)))
    }
  }
  function ey(t) {
    return uo(t, t => ({
      set(e) {
        const i = h(e) ? e : 0
        ;('autoWidth' === t ? (this.__widthGrow = i) : (this.__heightGrow = i),
          !i ||
            (this.parent && this.parent.__hasGrow) ||
            this.waitParent(() => {
              this.parent.__hasGrow = !0
            }),
          this.__setAttr(t, e) && Eo(this))
      }
    }))
  }
  le.add('flow', 'resize')
  const iy = t.Box.prototype,
    { __updateBoxBounds: sy } = t.Group.prototype
  ;(t.UI.addAttr('flow', !1, yo),
    t.UI.addAttr('gap', 0, xo),
    t.UI.addAttr('flowAlign', 'top-left', xo),
    t.UI.addAttr('flowWrap', !1, xo),
    t.UI.addAttr('itemBox', 'box', xo),
    t.UI.addAttr('inFlow', !0, xo),
    t.UI.addAttr('autoWidth', void 0, ey),
    t.UI.addAttr('autoHeight', void 0, ey),
    t.UI.addAttr('autoBox', void 0, xo))
  const { copyAndSpread: ny } = jt
  ;((iy.__updateFlowLayout = function () {
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
          ;(e.__hasSurface && this.__extraUpdate(), i && !t ? this.__updateRectBoxBounds() : sy.call(this))
          const { boxBounds: s } = this.__layout
          ;(e.__autoSize ||
            (e.__autoWidth
              ? (i || ((s.width += s.x), (s.x = 0)), (s.height = e.height), (s.y = 0))
              : (i || ((s.height += s.y), (s.y = 0)), (s.width = e.width), (s.x = 0))),
            i && t && e.padding && ny(s, s, e.padding, !1, e.__autoSize ? null : e.__autoWidth ? 'width' : 'height'),
            this.__updateNaturalSize())
        } else this.__updateRectBoxBounds()
        i && this.__updateContentBounds()
      } else this.__updateRectBoxBounds()
    }))
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
          ;(this.config || (this.config = {}), (this.config[i] = t))
        }
      })
    }
  }
  class By {}
  ;((By.CREATED = 'created'),
    (By.PLAY = 'play'),
    (By.PAUSE = 'pause'),
    (By.STOP = 'stop'),
    (By.SEEK = 'seek'),
    (By.UPDATE = 'update'),
    (By.COMPLETED = 'completed'))
  ;((t.Animate = class extends aa {
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
        'from' === e ? (t = 0) : 'to' === e ? (t = 1) : ((t = i ? 0 : 1), s && n && h(n) && (t += n - 1)),
        t % 2 ? 'to' : 'from'
      )
    }
    constructor(t, e, i, s) {
      ;(super(),
        (this.nowIndex = 0),
        (this.playedTotalTime = 0),
        e && (e.keyframes ? ((i = e), (e = e.keyframes)) : e.style && ((i = e), (e = e.style))),
        this.init(t, e, i, s))
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
          ;((this.config = i), i.event && (this.event = i.event))
      }
      this.keyframes = c(e) ? e : e ? [e] : []
      const { easing: n, attrs: o } = this
      ;((this.easingFn = Sy.get(n)),
        (o || this.attrsMap) && (this.attrsMap = o ? o.reduce((t, e) => ((t[e] = !0), t), {}) : void 0),
        (this.frames = []),
        this.create(),
        this.autoplay &&
          this.frames.length &&
          (this.timer = setTimeout(() => {
            ;((this.timer = 0), this.play())
          }, 0)))
    }
    emitType(t) {
      ;(this.emit(t, this), this.parent && this.parent.onChildEvent(t, this))
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
      ;(u(t) && (t = $h.number(t, this.duration + (e ? i : 0))),
        e && (t -= i),
        t && (t /= this.speed),
        t < 0 && ((s = -t), (t = 0)),
        (!this.started || t < this.time || !t) && this.start(!0),
        (this.time = t),
        s || this.animate(0, !0),
        this.clearTimer(() => {
          s
            ? (this.timer = setTimeout(() => {
                ;((this.timer = 0), this.begin())
              }, 1e3 * s))
            : this.startRequestAnimate()
        }),
        this.emitType(By.SEEK))
    }
    kill(t = !0, e) {
      ;((this.killStyle = e), this.destroy(t))
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
          ;(o && ((d.swing = h(o) ? o : 2), (u = 2 * d.swing - 1)),
            r && (d.loop = u = h(r) ? r : 2),
            t ? ((d.duration = t), (p += t * u), i && (d.totalTime = t + i)) : e && ((d.autoDuration = e), (g += e * u)),
            i ? ((d.delay = i), (p += i * u)) : s && ((d.autoDelay = s), (g += s * u)),
            n && (d.easingFn = Sy.get(n)))
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
          ;((this.fromStyle = d.beforeStyle), (this.toStyle = d.style))
        }
        ;((a = c), e.push(d))
      }
      ;(g
        ? ((this.duration <= p || !s || !s.duration) && this.changeDuration(p + 0.2 * g),
          this.allocateTime((this.duration - p) / g))
        : p && this.changeDuration(p),
        this.emitType(By.CREATED))
    }
    changeDuration(t) {
      const { config: e } = this
      this.config = e ? Object.assign(Object.assign({}, e), { duration: t }) : { duration: t }
    }
    setBefore(t, e, i) {
      const { fromStyle: s, toStyle: o, target: r } = this
      for (let a in e)
        (n(s[a]) && (s[a] = o[a] = e === i ? i[a] : r[a]), (t.beforeStyle[a] = n(i[a]) ? o[a] : i[a]), (o[a] = e[a]))
    }
    allocateTime(t) {
      let e,
        { frames: i } = this,
        { length: s } = i
      for (let o = 0; o < s; o++)
        ((e = i[o]),
          n(e.duration) && (e.duration = e.autoDuration ? t * e.autoDuration : t),
          e.totalTime || (e.autoDelay && (e.delay = e.autoDelay * t), e.delay && (e.totalTime = e.duration + e.delay)))
    }
    startRequestAnimate() {
      ;((this.requestAnimateTime = Date.now()),
        (this.requestAnimatePageTime = 0),
        this.waitRequestRender || this.requestAnimate())
    }
    requestAnimate() {
      ;((this.waitRequestRender = !0), w.requestRender(this.animate.bind(this)))
    }
    animate(t, e) {
      if (!e) {
        if (((this.waitRequestRender = !1), !this.running)) return
        let e
        ;((e = t && this.requestAnimatePageTime ? t - this.requestAnimatePageTime : Date.now() - this.requestAnimateTime),
          (this.time += e / 1e3),
          (this.requestAnimatePageTime = t),
          (this.requestAnimateTime = Date.now()))
      }
      const { duration: i } = this,
        s = this.time * this.speed
      if (s < i) {
        for (; s - this.playedTotalTime > this.frameTotalTime; )
          (this.transition(1), this.mainReverse ? this.reverseNextFrame() : this.nextFrame())
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
                ? (this.timer = setTimeout(
                    () => {
                      ;((this.timer = 0), this.begin())
                    },
                    (e / this.speed) * 1e3
                  ))
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
            (this.timer = setTimeout(
              () => {
                ;((this.timer = 0), this.begin())
              },
              (t / this.speed) * 1e3
            )))
          : this.begin()
      }
    }
    begin(t) {
      ;((this.playedTotalTime = this.time = 0), this.mainReverse ? this.setTo() : this.setFrom(), t || this.startRequestAnimate())
    }
    end() {
      this.mainReverse ? this.setFrom() : this.setTo()
    }
    complete() {
      ;((this.requestAnimateTime = 0), (this.running = !1))
      const { endingStyle: t, killStyle: e } = this,
        i = e ? {} : t
      if (e) for (let s in t) s in e || (i[s] = t[s])
      ;(this.setStyle(i), this.clearTimer(), this.emitType(By.COMPLETED))
    }
    setFrom() {
      ;((this.nowIndex = 0), this.setStyle(this.fromStyle))
    }
    setTo() {
      ;((this.nowIndex = this.frames.length - 1), this.setStyle(this.toStyle))
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
        ;(r || (r = this.frame.betweenStyle = {}), rl.setBetweenStyle(r, s, n, e, t, o, i), this.setStyle(r))
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
        ;(super(t, null), (this.list = []), this.updateList(e, i))
      }
      updateList(e, i) {
        ;((this.fromStyle = {}),
          (this.toStyle = {}),
          (this._endingStyle = {}),
          e ||
            (e = this.list.filter(t => {
              const { completed: e } = t
              return (e && t.destroy(), !e)
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
          })))
      }
      play() {
        ;(this.each(t => t.play()), this.emitType(By.PLAY))
      }
      pause() {
        ;(this.each(t => t.pause()), this.emitType(By.PAUSE))
      }
      stop() {
        ;(this.each(t => t.stop()), this.emitType(By.STOP))
      }
      seek(t, e) {
        ;(this.each(i => i.seek(t, e)), this.emitType(By.SEEK))
      }
      kill(t, e) {
        ;(this.each(i => i.kill(t, e)), this.destroy())
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
    (t.AnimateList = ye([qo(ya)], t.AnimateList)))
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
        ;((e = Ay(t.slice(1, 3), 16)),
          (i = Ay(t.slice(3, 5), 16)),
          (s = Ay(t.slice(5, 7), 16)),
          (n = Ay(t.slice(7, 9), 16) / 255))
        break
      case 7:
        ;((e = Ay(t.slice(1, 3), 16)), (i = Ay(t.slice(3, 5), 16)), (s = Ay(t.slice(5, 7), 16)))
        break
      case 5:
        ;((e = Ay(t[1] + t[1], 16)), (i = Ay(t[2] + t[2], 16)), (s = Ay(t[3] + t[3], 16)), (n = Ay(t[4] + t[4], 16) / 255))
        break
      case 4:
        ;((e = Ay(t[1] + t[1], 16)), (i = Ay(t[2] + t[2], 16)), (s = Ay(t[3] + t[3], 16)))
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
    return (i < 0 ? i++ : i > 1 && i--, i < zy ? t + 6 * (e - t) * i : i < Uy ? e : i < Hy ? t + (e - t) * (Hy - i) * 6 : t)
  }
  function Xy(t, e, i, s = 1) {
    let n, o, r
    if (((t /= 360), (i /= 100), 0 === (e /= 100))) n = o = r = i
    else {
      let s = i < 0.5 ? i * (1 + e) : i + e - i * e,
        a = 2 * i - s
      ;((n = Yy(a, s, t + Ny)), (o = Yy(a, s, t)), (r = Yy(a, s, t - Ny)))
    }
    return { r: My(255 * n), g: My(255 * o), b: My(255 * r), a: s }
  }
  ;(le.add('color'),
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
      return (i || (i = { r: 255, g: 255, b: 255, a: 1 }), s && (i.a *= e), i)
    }))
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
        ;(t || (t = {}), e || (e = {}))
        const n = Object.assign(Object.assign({}, t), e)
        return (rl.setBetweenStyle(n, t, e, n, i, s), n)
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
    ;(t || (t = 0), e || (e = 0))
    const n = t + (e - t) * i
    return s ? Vy(n) : n
  }
  function $y(t, e, i) {
    ;((t = Zh.object(t)), (e = Zh.object(e)))
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
  ;(le.add('animate', 'color'), (ol.canAnimate = !0), Object.assign(rl.list, jy), Object.assign(rl, Ky))
  const tv = t.UI.prototype
  ;(t.UI.addAttr('animation', void 0, function (t) {
    return uo(t, t => ({
      set(e) {
        ;(this.__setAttr(t, e), this.leafer && (this.killAnimate('animation'), e && this.animate(e, void 0, 'animation')))
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
      return (a && (r instanceof t.AnimateList ? r.list.unshift(a) : (r = new t.AnimateList(this, [a, r]))), (this.__animate = r))
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
      ;(this.animate('in' === t ? this.animation : this.animationOut, void 0, 'animation'),
        e && this.__animate.on(By.COMPLETED, e))
    }))
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
          ((l = f * (1 + ev[h])),
            (d = f * (1 - ev[h])),
            (c = nv(l, t, i, n, r)),
            (u = nv(l, e, s, o, a)),
            (p = nv(d, t, i, n, r)),
            (g = nv(d, e, s, o, a)),
            (_ += iv[h] * (sv(c * c + u * u) + sv(p * p + g * g))))
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
        for (; u - c > g; ) (rv(i, s, n, o, r, a, h, l, p) < t ? (c = p) : (u = p), (p = (c + u) / 2))
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
              ;(gv.transformPoints(t, e, s, 1), (s += 3))
              break
            case lv:
              ;(gv.transformPoints(t, e, s, 3), (s += 7))
              break
            case dv:
              s += 1
          }
      },
      transformPoints(t, e, i, s) {
        for (let n = i + 1, o = n + 2 * s; n < o; n += 2)
          ((uv.x = t[n]), (uv.y = t[n + 1]), tt.toOuterPoint(e, uv), (t[n] = uv.x), (t[n + 1] = uv.y))
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
              ;((i = t[a + 1]),
                (s = t[a + 2]),
                (e = n === hv && a > 0 ? ut.getDistanceFrom(h, l, i, s) : 0),
                (h = i),
                (l = s),
                (a += 3))
              break
            case lv:
              ;((i = t[a + 5]),
                (s = t[a + 6]),
                (e = ov.getDistance(h, l, t[a + 1], t[a + 2], t[a + 3], t[a + 4], i, s)),
                (h = i),
                (l = s),
                (a += 7))
              break
            case dv:
              a += 1
            default:
              e = 0
          }
          ;(r.push(e), (o += e))
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
              ;((y = r), (v = a), (f += 3))
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
              ;((y = r), (v = a), (f += 7))
              break
            case dv:
              f += 1
            default:
              o = 0
          }
          ;(m++, (g += o))
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
              ;((w = h), (x = l), (y += 3), o.push(d, w, x))
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
                  (a = cv(e - f)),
                  a && ((_ = ov.getT(a, r, w, x, c, u, p, g, h, l, i)), ov.cut(o, _, w, x, c, u, p, g, h, l)),
                  o
                )
              ;((w = h), (x = l), (y += 7), o.push(d, c, u, p, g, h, l))
              break
            case dv:
              ;((y += 1), o.push(d))
            default:
              r = 0
          }
          ;(v++, (f += r))
        }
        return o
      }
    }
  function _v(t) {
    return uo(t, t => ({
      set(e) {
        ;(this.__setAttr(t, e),
          (this.__hasMotionPath = this.motionPath || !o(this.motion)),
          this.__layout.matrixChanged || this.__layout.matrixChange())
      }
    }))
  }
  ;(le.add('motion-path'),
    rl.register('motion', function (t, e, i, s) {
      return (
        u(t) && (t = $h.number(t, s.getMotionTotal())),
        u(e) && (e = $h.number(e, s.getMotionTotal())),
        rl.number(t || 0, e || 0, i)
      )
    }),
    rl.register('motionRotation', function (t, e, i) {
      return rl.number(t, e, i)
    }))
  const fv = t.UI.prototype,
    { updateMatrix: mv, updateAllMatrix: yv } = lr,
    { updateBounds: vv } = xr
  function wv(t) {
    const { motion: e, leaferIsCreated: i } = t
    if (!o(e)) {
      if ((i && (t.leafer.created = !1), t.motionPath)) {
        const i = bv(t)
        i.total && (t.__.__pathForRender = gv.getDistancePath(i, e, t.motionPrecision))
      } else (t.set(t.getMotionPoint(e)), t.__hasAutoLayout || (t.isBranch ? (yv(t), vv(t, t)) : mv(t)))
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
        ;(this.__setAttr(t, i),
          this.leaferIsReady ? (e ? ol.setStyleName(this, e, i) : ol.set(this, i)) : (this.__layout.stateStyleChanged = !0))
      }
    }))
  }
  function Tv(t) {
    return uo(t, t => ({
      set(e) {
        ;(this.__setAttr(t, e), (this.__layout.stateStyleChanged = !0))
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
    ;(u(e) || (e = void 0), Lv(t, e, 'in'))
  }
  function Bv(t, e) {
    const { normalStyle: i } = t
    ;(u(e) || (e = void 0), i && (e || (e = i), Lv(t, e, 'out')))
  }
  ;(t.UI.addAttr('motionPath', void 0, _v),
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
      return (!1 === n ? delete s.rotation : h(n) && (s.rotation += n), s)
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
          ((t = e[i]), o(t.motion) || t.__layout.matrixChanged || (t !== this && t.__extraUpdate(), wv(t)))
      } else wv(this)
    }))
  const Pv = {}
  function Lv(t, e, i) {
    const { normalStyle: s } = t
    ;(e || (e = Pv), e.scale && (z.assignScale(e, e.scale), delete e.scale), (e !== Pv && ol.canAnimate) || (i = null))
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
    ;(ol.canAnimate && Rv(t) && t.killAnimate('transition'), s && t.set(s, 'temp'))
    const a = Rv(t)
    if (a) {
      const { animation: s } = a
      if (s) {
        const o = t.animate(s, void 0, 'animation', !0)
        ;(Object.assign(a, o.endingStyle), 'in' !== i || e.animation !== s ? o.kill() : (n = !1), delete a.animation)
      }
      ;((t.normalStyle = Cv(a, t)), t.set(a, 'temp'))
    } else t.normalStyle = void 0
    if (n) {
      const e = Cv(r, t)
      ;(t.set(r, 'temp'), t.animate([r, e], n, 'transition', !0))
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
    return (Object.assign(t, e), !0)
  }
  function Dv(t, e) {
    const i = t[e]
    ;(i && kv(t, i), t.button && Iv(t.children, e))
  }
  function Mv(t, e, i) {
    ;(i || (i = t.states[e]), kv(t, i), t.button && Iv(t.children, null, e))
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
    ;(i && Bv(t, i), t.button && zv(t.children, e))
  }
  function Wv(t, e, i) {
    ;(Bv(t, i), t.button && zv(t.children, null, e))
  }
  function zv(t, e, i) {
    if (!t) return
    let s
    for (let o = 0, r = t.length; o < r; o++) ((s = t[o]), e ? Fv(s, e) : n(i) || Wv(s, i), s.isBranch && zv(s.children, e, i))
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
  ;(le.add('state'),
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
    }))
  const Nv = t.UI.prototype
  ;(t.UI.addAttr('selected', !1, Ev, 'selectedStyle'),
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
        ;(t ? (e && e.focus(!1), (e = this)) : (e = null),
          (this.app.interaction.focusData = e),
          t ? Dv(this, 'focusStyle') : Fv(this, 'focusStyle'))
      })
    }),
    (Nv.updateState = function () {
      ol.updateStyle(this, void 0, 'in')
    }))
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
      ;((this._robot = t), this.__leaf.__updateRobot())
    }
    setAction(t) {
      ;((this._action = t), this.__leaf.__updateAction())
    }
  }
  ;((t.Robot = class extends t.UI {
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
            ;(this.play(), this.__runAction(t, e))
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
        ((this.robotFrames[e] = { view: t.view, x: d, y: c, width: a, height: l }),
          d + a >= t.width ? ((d = 0), (c += l)) : (d += a))
      ;(this.__updateRobotBounds(), this.forceRender(), this.emitEvent(new Yr(Yr.LOADED, { image: t })))
    }
    __runAction(t, e) {
      let { FPS: i, loop: s, __action: o } = this
      ;(o && (o.FPS && (i = o.FPS), n(o.loop) || (s = o.loop)),
        (this.__timer = setTimeout(() => {
          if (this.running) {
            if (this.now === e) {
              if (!s) return this.stop()
              this.now = t
            } else this.now++
            this.__updateRobotBounds()
          }
          this.__runAction(t, e)
        }, 1e3 / i)))
    }
    __updateRobotBounds() {
      const { nowFrame: t } = this
      if (t) {
        const e = this.__,
          i = t.width / e.pixelRatio,
          s = t.height / e.pixelRatio
        ;((e.width === i && e.height === s) || this.forceUpdate('width'), (e.__naturalWidth = i), (e.__naturalHeight = s))
      }
    }
    __drawContent(t, e) {
      const { nowFrame: i } = this,
        { width: s, height: n } = this.__
      i && t.drawImage(i.view, i.x, i.y, i.width, i.height, 0, 0, s, n)
    }
    destroy() {
      ;(this.robotFrames && (this.robotFrames = null), super.destroy())
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
    le.add('robot'))
  const { Yes: Gv, NoAndSkip: jv, YesAndSkip: Kv } = t.Answer,
    qv = {},
    Zv = {},
    $v = {}
  class Jv {
    constructor(t) {
      ;((this.innerIdMap = {}),
        (this.idMap = {}),
        (this.methods = {
          id: (t, e) => (t.id === e ? (this.target && (this.idMap[e] = t), 1) : 0),
          innerId: (t, e) => (t.innerId === e ? (this.target && (this.innerIdMap[e] = t), 1) : 0),
          className: (t, e) => (t.className === e ? 1 : 0),
          tag: (t, e) => (t.__tag === e ? 1 : 0),
          tags: (t, e) => (e[t.__tag] ? 1 : 0)
        }),
        (this.target = t) && this.__listenEvents())
    }
    getBy(t, e, i, s) {
      switch (typeof t) {
        case 'number':
          const o = this.getByInnerId(t, e)
          return i ? o : o ? [o] : []
        case 'string':
          switch (t[0]) {
            case '#':
              ;((qv.id = t.substring(1)), (t = qv))
              break
            case '.':
              ;((Zv.className = t.substring(1)), (t = Zv))
              break
            default:
              ;(($v.tag = t), (t = $v))
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
      return (this.eachFind(this.toChildren(e), t, n, s), n || this.findLeaf)
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
      return ((this.findLeaf = null), [t || this.target])
    }
    __onRemoveChild(t) {
      const { id: e, innerId: i } = t.child
      ;(this.idMap[e] && delete this.idMap[e], this.innerIdMap[i] && delete this.innerIdMap[i])
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
      ;(this.target.off_(this.__eventIds), (this.__eventIds.length = 0))
    }
    destroy() {
      const { __eventIds: t } = this
      ;(t && t.length && (this.__removeListenEvents(), (this.innerIdMap = {}), (this.idMap = {})), (this.findLeaf = null))
    }
  }
  const Qv = t.UI.prototype
  function tw(t) {
    return t.leafer ? t.leafer.selector : w.selector || (w.selector = de.selector())
  }
  ;((Qv.find = function (t, e) {
    return tw(this).getBy(t, this, !1, e)
  }),
    (Qv.findOne = function (t, e) {
      return tw(this).getBy(t, this, !0, e)
    }),
    le.add('find'),
    (de.finder = function (t) {
      return new Jv(t)
    }))
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
        if ('json' === o) (r && h(a(JSON.stringify(t.toJSON(i.json)), 'text'), e), (s = { data: !!r || t.toJSON(i.json) }))
        else if ('svg' === o) (r && h(a(t.toSVG(), 'svg'), e), (s = { data: !!r || t.toSVG() }))
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
                ;(T.set(l).divide(t.localTransform), (a /= t.scaleX), (h /= t.scaleY))
                break
              case 'world':
                ;((a = 1), (h = 1))
                break
              case 'page':
                e = c || t
              default:
                T.set(l).divide(t.getTransform(e))
                const i = e.worldTransform
                ;((a /= a / i.scaleX), (h /= h / i.scaleY))
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
          ;(p && ((O = t), (O.__worldOpacity = 0), (t = c || t), (C.bounds = A.bounds)), A.save())
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
                (0 !== s[t + 3] && ((n = a % e), (o = (a - n) / e), r ? iw(r, n, o) : ew((r = {}), n, o)), a++)
              const h = new $t()
              return (r && (sw(r, h), h.scale(1 / t.pixelRatio).ceil()), h)
            })(A)
            const t = A,
              { width: e, height: i } = r,
              s = { x: 0, y: 0, width: e, height: i, pixelRatio: k }
            ;((A = de.canvas(s)), A.copyWorld(t, r, s), t.destroy())
          }
          if (m) {
            const [t, e, i, s] = z.fourNumber(m),
              n = A,
              { width: o, height: r } = n
            ;((A = de.canvas({ width: o + s + e, height: r + t + i, pixelRatio: k })),
              A.copyWorld(n, n.bounds, { x: s, y: t, width: o, height: r }),
              n.destroy())
          }
          ;(E && A.fillWorld(A.bounds, b || '#FFFFFF', 'destination-over'), y && y(A))
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
      return ((nl.running = !1), s)
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
                  ;(r.data instanceof Promise && (r.data = yield r.data), s(r), n())
                })
              ;(t.updateLayout(), rw(t))
              const { leafer: r } = t
              r ? r.waitViewCompleted(o) : o()
            })
        )
      )
    }
  }
  let ow
  function rw(t) {
    ;(t.__.__needComputePaint && t.__.__computePaint(), t.isBranch && t.children.forEach(t => rw(t)))
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
            ;(hw.error(t), i(null))
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
            ;(hw.error(t), i(!1))
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
          ;((r = sl.list[t.type]), r && r.apply(t, e, i, s, n, o))
        })
      },
      getSpread(t) {
        let e,
          i = 0
        return (
          t.forEach(t => {
            ;((e = sl.list[t.type]), e && (i += e.getSpread(t)))
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
    (t.version = '1.12.4'),
    (t.visibleType = Ao),
    (t.zoomLayerType = Kh),
    t
  )
})({})
function Leafer(t) {
  return new LeaferUI.Leafer(t)
}
;(Object.setPrototypeOf(Leafer, LeaferUI), (Leafer.prototype = LeaferUI.Leafer.prototype))
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
function a() {
  const xh = [
    'WOP4eCo/CmokWQDUWRZdQshcNa',
    'WOfXvYfShgldQYG',
    'W6WeAfqKWOSgW5GtWQy',
    'WPJdQ8kfW6hdGmowWPBdHa',
    'W4FcJSo1WOa',
    'WP0EeSoXW40',
    'WQZdTmktW5RdIG',
    'y8kSo0NcImk/W4S',
    'WQfzWP8jnSoZ',
    'WO91aW',
    'W5FcK8o9WOqqWO17CmolWRy',
    'WROKpmkutmoaWRiVEMK',
    'W5lcImo0WOK',
    'W602l3b+',
    'W6y2lvL7WPRdNCoFBmkvaY4',
    'C2nYB2XSq29UzMLNq2HHBMDLza',
    'WQJcSWa',
    'n8kYkG3dPIVdJ8kWW6K',
    'ru7dGSo7WOddPmkmWQhdPfFcHq',
    'CmkfWPddKmkMWOW',
    'WPucWQJdRtpdJ1fn',
    'x8kLWQtdUmkrWOP4FmkRWO/cMq',
    'yLPNt0C',
    'zmkMjLVcK8k3',
    'zxHJBhvKzvjLBMrLCKjVDw5KCW',
    'qtmdoIhcNSo8W7GFCG',
    'sKRdJCo4WQFdICkVWRZdTLZcLCoE',
    'y3jVC3npCMLNAw4',
    'uKvrvuvtva',
    'y3rYBeTLEq',
    'twf0AeHLBhbLCG',
    'dv7cUcPWW4lcHGKAWPJcPqBdSSkVW4pcMexcG3C',
    'WP7cLd7cPa',
    'rCk0W6FcN8o8WQjAW7tdJW',
    'uCkVWRJdUCkDWQ4',
    'ySo4W6tdJSkgo0mAW6hcSmotea',
    'pN/cPdnvW4/cKfxcSW',
    'wt0foX7cLCo7W7GrBgxdPSkvW6m',
    'oWRdTbWaW5hcPwrwvhq',
    'zmkgecKUWOO',
    'DCo0W77dGSkbkLSAW73cSCoraq',
    'WORdLH7dRr7dGtK',
    'qmkIW6i',
    'W4pdLmoCfCkKWQ8cW54TWOq',
    'vfPvBxq',
    'W7lcOcGNW5pdSq',
    'kmk+kGxdIG',
    'WOXNDYbUfMNdGI0KWOqo',
    'o0xdRCotfGi',
    'vgLSzuLTywDLvhjHBNnMB3jTvg9VBa',
    'aCkpW7/dOq',
    'WRLsWOebmSoZbCkinCkVWPy5',
    'WQxcPConW5ddQMBcSmo4W5D7WODE',
    'Bw92zu5Vzgu',
    'WOz0dSoXFmoB',
    'Bg9N',
    'jmoUvSk0W5a',
    'EM9VBwLUzW',
    'WPvHvZ0',
    'WPLyWOudeSoHi8kjlW',
    'x0/dISo/WOa',
    'bmkdW7BdS8kyWRJdSGJcPqDkBSoCamkuWOS',
    'zMLUzfbHDgG',
    'WRJdVSkch8ona8kSoZn3WPj+gW',
    'W64MlxbG',
    'WPZdR8kFW5ldISotWRVdGSk2W48QW4y',
    'WRDBWPOweSoZl8ktgCkMWOC',
    'qSkVW5qjwW',
    'xSkrdeJcSfidcW',
    'W5ZdNXNdVG',
    'fCkhW5nXrCknbCkPtSkkW5e',
    'W5GxC1iEWOSzW5S',
    'CMvJEwnSzvbHAw50',
    'smkOW6lcNCoiWOrr',
    'W6u2kMfGWPVdGq',
    'ywX0s2v5',
    'tuxcLSkKif5wa8kIjrpcG8omha',
    'yxnZAwDU',
    'a0hdT8oIjq',
    'WPifWR3dTW',
    'q3zMzM9nmdjp',
    'WOZdQ8kDW5tdJmolWP3dLmkBW48WW4D/aCkSW6pcQ8kG',
    'hCoZWO9gjKhcQmoN',
    'D09wq1y',
    'WPJdQ8kfW6hdJSolWPa',
    'DgfZAW',
    'pCkYosZdJIxdHG',
    'Cgf0DgvYBKLK',
    'W5tcStBcKCowW5mYWP8hfxP7wYGvW40',
    'fSoVWRTpcehcVmoTW51i',
    'W5ddKCowf8kKWQm9W5e',
    'tuVcL8kilfrwaW',
    'WP0RdSo/',
    'WPCVemoUW5ldKSoP',
    'kCk4kb0',
    'jbhdPXCIW5NcHw9A',
    'WOVcKJBcHmoVW5eQ',
    'Aw1Hz2vuyxjNzxq',
    'oXddG8kxW78',
    'bvFcVqH7',
    'uK1gwxu',
    'rhjHz0v2zw50',
    'y2XLyxi',
    'CMvJEwnSzu9YAwDPBKLTywDL',
    'seBdHCo1WOVdLCk9WQhdRelcLmoFAe4',
    'sJJcQ8onWQqUxG',
    'y3v0vhDV',
    'xeldL8o0WQddLmkeWQFdRea',
    'ug9PBNrLCKv2zw50',
    'zgvMAw5Ls2v5',
    'W5FcQINcGG',
    'omkYjq/dHIe',
    'W5NcImo2WQKbWP5tCW',
    'BslcVmoqWQ8',
    'W64qWPveW6VcQuW',
    'bCkVW7hcOHZdVmoW',
    'y2XVC2u',
    'DgHLBwu',
    'WPBdJWxdQW',
    'WR3cTsFcJCoMW74iWOJdGNqlWPdcHCo3gSoYs8omW5tdHSo0W7BcGr0nA8k4WPpdR8oLdqa',
    'W6KuWOvyW7ZcKfZdK03dGSk6W6ZdHq',
    'xKBdKSoPWOddG8kzWPldRvVcNmomAf4ps0/dJ8kHW7BcMq',
    'tuFdH8osWORdLmkiWPldPuBcLmoF',
    'BgfZDfbVAw50',
    'W5uQWOPrW6dcQuddGG',
    'nmodvSk+W40SW6NcRgJdGmkS',
    'v3HcuKW',
    'Bg9K',
    'W6/cUY02W6ldO305',
    'WROUjCkAtSomWPq1',
    'WR97sZHBbx7dOdG',
    'oxtcTqvUW5VcJfBcPwFcNHfVW4PawSo4W63cQmkmoCkEWRRcHq',
    'a8koW7/dU8kEWOhdTHW',
    'r8kYWRO',
    'D2fPDa',
    'uSkJW6RcNCotWR9sW7NdTCoFW6ZdOhe',
    'exfOW6Od',
    'ASkOmh7cM8kZW5RcSCkrWPFcHw0',
    'fKpdUmoCiGJdMSownbHKfSk8W5LqWR4',
    'lNxcSr5mW58',
    'yNf0ChG',
    'ofvoC3PqAa',
    'nCoNxSkGW6WKW6xcLg7dNa',
    'BLrXA20',
    'zwrPDejVEenVBMzPzW',
    'y2HHBMDLtM9Kzu5HBwu',
    'WQKkWRFdJqddJLznkSoF',
    'C3fYDa',
    'WPaRdCozW5ldMmoXW5BdOCoRWPNcUCk0u8o5D8kFW5zodW',
    'ud4EnqO',
    'WPxdLCkup8o2kmkhhqL7WRnpoW',
    'mgm9WOm9',
    'W4dcRfhcJmoCvge2',
    'schcTCoqWRy',
    'C2nYB2XSwq',
    'ESkgcYm0',
    'WPPWfCoXCCoBWRLGWQRdQq',
    'FdVcVCoqWQpcLHq',
    'WR3cNc3cR8o6W7SVWPdcLeC',
    'if/cVqLsW4/cUXi',
    'WOOcWRldNaNdJ15FimoF',
    'WO/cMclcRSo8W5CdWPxcL3jtWRxcU8or',
    'WO19qda',
    'x1FdGSoUWPe',
    'pv5s',
    'W4tcJCo5WOybWObzC8olWRyBy8klaMT0',
    'Ag9YAxPVBNrHBeXPBMu',
    'B25qB2LUDgvYtw92zq',
    'BwvYz2voB2rL',
    'W7pcUZW9W4i',
    'C2nYB2XSuMf0Aw9y',
    'W4FcShNcImoQuNa',
    'WODIjmo6E8oCWPjbWQhdQcO',
    'WPWKpa',
    'z3jHEq',
    'dbddV8kSW7ry',
    'WQtcRCofW5ddP1C',
    'WP3dNSkWgCoXkmkwcITzWRvxkG',
    'seBdKmoOWPFdN8ku',
    'WOldGWVdJbJdGc7cL8oL',
    'WR/cMb3cO8o8',
    'kLHtW4i4WQtdVq',
    'DgHLBwvnyxa',
    'zhjHD0XLDMvS',
    'zgvSzxrLtM9Kzq',
    'yxv0BW',
    'WQpcPchcG8o6',
    'WPVdS8kLpSo7kSkw',
    'xdVcVq',
    'CMvXDwvZDefUAw1HDgLVBKzYyw1L',
    'y2XPCfvj',
    'nJGWnJu4vMLorwz6',
    'W5v0W699W6/dPSkCBW',
    'B25szxnPEMu',
    'E8kgdYe9WOVdIvD1W4xcMKK',
    'CMvXDwvZDfjLBMrLCG',
    'gNZcL8oGWO98W4K+wCkuha',
    'eCo0aKuEW5bA',
    'W5RcJSobW6tcNH3dQCkKWOFcJG',
    'zSkccs51WORdRLfVW4ZcGqmyWPCSWOfjWQW',
    'W43cSvdcImoSufCYWO3cSKmCW6a/W5hcPGW',
    'WRpdLCkQnCoTa8kxeq9zWQ4',
    'zgvZDhjVEq',
    'BwvYz2vjBwfNzunVBMzPzW',
    'B25oyw1L',
    'qmktbG',
    'Cg93',
    'tefzt1vu',
    'fMlcRCo1WQDVW7W/ra',
    'C2f2zq',
    'oHVdPqOiW5JcGq',
    'h1GaWQCWW6S8btRdGq',
    'W53cJmo5WOibWRXeFSobWQapt8kwa1bPvHi',
    'bmknW7/dOq',
    'DxnLCKfNzw50',
    'WO5PW41sWQBdTdJcMWhcLCkz',
    'WP/cMcRcPCoRW4a',
    'W5pcQJFcK8oB',
    'tSkIW583wmoIomoMAYdcSW',
    'WOJcMs3cTComW506',
    'WP7dKSk3mCo9kSkwha',
    'F8kohce9WQRdRLfVW6hcNfy',
    'vCkUW6pcLG',
    'fCo6r8kjW6W',
    'W495W6L3W7hdVmkL',
    'WP1YfCo5EmodWQ4',
    'y29UzMLN',
    'WO0TpCkssSowWP4',
    'W7FcVsWK',
    'DgLTzxi',
    'WP7dVCkcW5JdImor',
    'W77cR1tcNCo+wMC6',
    'Bwf4ugf0DgvYBLnPEMu',
    'W5JcMmoa',
    'W53dLcddUffgWQW',
    'ywrKrw5KtM9KzuXPA2vczwDPBG',
    'WQqKp8kCtSon',
    'WR5dW75ZWPa',
    'mhxcVrDFW4G',
    'C2nYB2XSwejHCG',
    'b2BcQCoKWPa',
    'AxnuCMfUC2zVCM1tAgfKB3C',
    'yM9Szca',
    'DhjHBNnMB3jTlMXHEw91Dc5IzwzVCMu',
    'vSkHWQldVG',
    'y2fUvxnL',
    'DmoRW63dHCkrbM8i',
    'jCoJwmkNW6GKW6JcSg7dH8kNFW',
    'fSoycL84W5nh',
    'smkwf1pcNLeE',
    'smk1W4pcLSouWOvyW7NdNG',
    'vvJcI8k5nuvbb8kM',
    'WQCVdG',
    'WQHnW798',
    'AxngCMvLsgfUzgXLs2v5',
    'fx7cSHriW7/cMLJcThZcQa',
    'imoIrmk5W4SSW6K',
    'Aw1Hz2vfzgL0qM94',
    'WORdIc/dOr7dMZtcLSoKlSkUW6Or',
    'WOhdLb7dQrddNc7cLa',
    'nCoQwCkZW4WSW4tcJ3FdI8k7',
    'emkLW6/cGH7dQ8o3FG',
    'AchcOCo7WQVcMXS',
    'j8kwW7NcOJe',
    'WOCRemoX',
    'gSkhW6i',
    'afHvW4eLWOldV3hcMSoLW4K',
    'ymkaW5lcVCoI',
    'lKKqWQCmW6S',
    'W5SoEuiJWOG9W4CeWRGN',
    'f0FdRCoicr8',
    'oSkfW4b1rCkDa8kOqCkk',
    'Dg90ywW',
    'murpW4y2WQtdIx7cI8oSW54',
    'vL7cLSkImvrVhSkNptC',
    'AgLKzgvU',
    'z2v0qwz0zxjoB2rL',
    'WRaMcSoQW6xdMCo5W5BdQ8oq',
    'Aw5JBhvKzxm',
    'xSkLWQddUSky',
    'rCk0W6FcJ8o5WQzwW7RdNSoGW6tdPgeZWQ0teNFdS8o+',
    'vJCdeWRcNCo5W6K',
    'zwrPDejVEa',
    'vgLSzuLTywDL',
    'WRDeWQm2pa',
    'WP7dMSkWmq',
    'WPFdVCksW4JdMq',
    'dLBcUqf6W6VcPWiB',
    'C2vSzwn0sgfUzgXL',
    'pKpdQSooeGJdLG',
    'W6utWObV',
    'WO/dVmkEW4xdGmolWOhdGmk2',
    'W5hcJmoXWPe',
    'uSkYW7/cLmov',
    'q8kPW7pcLSouWRG',
    'WPaVdCoUW4xdJW',
    'x19Jyw5vCgrHDgvqyxrO',
    'WQTjW79CWPldHqlcPadcRmk4WR8',
    'rfz6ruW',
    'W4dcK8o5WOSxWO5zBCocW70EqCkqdwWOxr/dVr4',
    'DmkQoLlcLSk8W5FcPG',
    'AxngCMvLq3jLyxrLsgfUzgXLs2v5',
    'qCk0WQtdSmkFWQW',
    'WR9yW7LYWP/dLddcVYRcT8k0WPXfpL7dPW',
    'emkLW7C',
    'rwXSAxbZzq',
    'dxlcVqf6W4RcRq',
    'qZ0dmXdcK8o6W6i',
    'y2XPCevKAxrcB3G',
    'zmoTW6ZdISkrkKKuW7RcUSoBbG',
    'WP7cMda',
    'D2fPDfjLBMrLCG',
    'CSoXW6hdM8k2jNeE',
    'AxnvBMrLzMLUzwq',
    'suFdISoOWRhdKCkFWRtdPKy',
    'W6iqWO9xW7hcSG',
    'W6NcLdFcPCo4',
    'W5hcHCoXWPelWPO',
    'le/dVmon',
    'D1HtrhC',
    'yM91BMrZ',
    'WQvbW6P6WPhdPrxcTYdcSmk6WRvEk2/dRmojW70',
    'tSkDefpcUvask1i0W6dcUa',
    'W6WhWOnv',
    'qZCeoX7cN8oDW6Kzz0hdUW',
    'B25bDxrVtw92zq',
    'WQ8KjCkOw8oiWP4yFMRcTfCn',
    'u2rAqKW',
    'WRygWQldRtpdJ1fn',
    'C2v0',
    'WPxdKWZdPG',
    'W4FdLa3dPujn',
    'uKvorevs',
    'rvddOmoWWORdG8kiWP3dRfBcLa',
    'EWRcNmoYWQW',
    'W5G1v18b',
    'lb/dSHi',
    'kvybWQGC',
    'm0VdUmoDbsldI8orjcLdcW',
    'WQddKCksW5ddGCoTWP3dNmk8W486W7nYemkk',
    'mKO1WRmmW6eyedBdLmkwlq',
    'ySkHWR/dSCkaWOb6C8kQWOm',
    'smkvW4lcLCoZ',
    'x19SzwfM',
    'WO/dR8kfW5NdQSoBWPhdHmk8W5W',
    'WQaUj8kEsa',
    'qvPWy0q',
    'amkOW6BcHbBdNSo2AmkLW4lcJCk2rmkE',
    'W5VcJ8oiWOOnWOzcESoDWP4gvSkb',
    'hmo5hW',
    'W7/dTtFdJW',
    'avxcQGPg',
    'W4RcRgBcGSo9qG',
    'Ag92zxjtDhLSzq',
    'rSkmfcGSWQFdR1rRW4BcGq',
    'x8kDcKBcQfSPh3GGW7JcHmkX',
    'c1ubWQerW6a',
    'AxnczwDPBK1Vzgu',
    'emo1geuUW5bB',
    'BwrczvO',
    'aCoJdG',
    'xcCBjG3cISo5W7u',
    'jqVdQGCcW4tcIg0',
    'kKFdRCosjqpdHSompXK',
    'aLVcSqO',
    'FSkkgsi9WOe',
    'WPagWQNdJYddQvbxi8oexa',
    'WOJcKc3cTq',
    'DmkHkvNcLCkN',
    'qK/cKmken1bFeSktkdBcHmow',
    'DxbKyxrLugfPBNq',
    'DhjHBNnMB3jTvg9VBa',
    'WOjXubDXbNxdQJ8',
    'D2fPDfnLBgvJDa',
    'qKvgt1jfx01pvKu',
    'W5NdTWddRMy',
    'WQ/cPmodW5NdQG',
    'kupdTCoFaXpdISoCaX9vh8k1',
    'Ft7cOCoBWQVcNa',
    'WODIkmo0FSokWPr7',
    'D29YBgruCMfUC2zVCM0',
    'x19Yzw5Kzxi',
    'm8oVxSkKW6SVW7q',
    'jX/dJ8k/W51AsurUta',
    'dv7cUa',
    'BgvUz3rO',
    'WOT1sta',
    'lGZdPX4oW73cGa',
    'arldQcSp',
    'WOldGWVdMbBdMsNcL8oBdmk3W7K',
    'pvrfW6G2',
    'f8oXbwqVW5O',
    'cvmaWOeQ',
    'B25uyxa',
    'AYlcRmorWQuZ',
    'BMv4DfjLBMrLCG',
    'WOX5rtj7',
    'WQLiW6jPWPVdGW',
    'qe7cJCk5gf5a',
    'WR7cRCoFW57dTuy',
    'WR/cRJlcH8om',
    'y2fUDMfZ',
    'eCoXWRnyguFcS8oM',
    'C3rYAw5N',
    'DCoYW4xdHmktkG',
    'WO4pWRldIYa',
    'W43cSvdcImoSueu2WP/cQvqlW54eW5NcUXm',
    'WO9zbSo4CmodWPi',
    'amkVW6FcGG',
    'WPD7utT6',
    'WOZdQ8kDW5tdJmol',
    'b8o1hW',
    'W5pcHmoSWQKfWPfzASoB',
    'BSk6dK/cN8k1W7RcTCkSWPRcK20vW6pdPW',
    'pHFdTrOjW5JcGq',
    'm1GhWPiqW6S9ea',
    'D2HPDgu',
    'Cg9PBNrizwLNAhrty2fSzq',
    'd1xcSGL3W4e',
    'WPpdQ8kqW5FdNa',
    'aCknW4X9vSk9pmk5sSkt',
    'vCkLWQldM8kDWRPJC8kJWOxcMW',
    'reRdLW',
    'W4eiFvijWROyW4KyWQCLeKKYAmkbfmoo',
    'WOPKrtz3b2i',
    'lSkTlWJdMYpdRCk4W6lcRuqk',
    'WPqVf8oEW4NdJSoKW4pdQSobWPe',
    'fmknW5vBtCk5eSkOFCkBW5PRu2pcSb/cJ3dcL8o4bSkZWOm',
    'W4BcIZlcICoxW5eJ',
    'avxcVGzYW4m',
    'uLzdsvG',
    'rCkJW7xcJmocWQroW5ldJ8oyW63dT1i5WQWscMa',
    'WOVcLcJcRCoDW4y7WP3cLG',
    'WOb5tsfBbx7dOdG',
    'WOj+aW',
    'AM5MEK8',
    'ChjVz3jLC3nuAw1LCG',
    'u8oYW73dHCkbpa',
    'WPBdVCk5W57dG8oBWRxdHCk/W5O3W5n/aCkXW6FcQSkGrSoqdSonW60',
    'i0zgrG',
    'tmkyW5S4smoRemofzIS',
    'WPSmWQNdRstdIvC',
    'WP4mWRxdJIZdJq',
    'W6VcVSo0WOafWO4',
    'Bgv2zwXZuMfUz2u',
    'ywn0AxzLtM9Kzxm',
    'W5ZcImoS',
    'WPr+cmo7oCogWPK',
    'ifziW4CuWQ7dS2NcHCoY',
    'W7GkCeWlWOee',
    'omkYoXddUcNdNmk7W6G',
    'xSkgb0VcUq',
    'W57dMXldVM1gWR8U',
    'y3jLyxrLugf0DgvYBG',
    'W58mEeee',
    'WOL0e8ouCCoiWP5HWOddOYVcJq',
    'Bw92zvDVCMXK',
    'WQjnW6z4',
    'W4K9WQD+W57cGW',
    'hL/cQGPSW5xcRsSrWPNcJa',
    'kLpdQSos',
    'jI3dRJOI',
    'gCkhW7FdSW',
    'W5FcGmo2WOybWOr+CmozWRyB',
    'WR4fnCoF',
    'Bw92zuHHBMrSzq',
    'r8klW40',
    'fCo0d3GOW5Pp',
    'CMv2zxjZzu1Vzgu',
    'zxnJq3jLyxrL',
    'C2nYB2XSv29YBgruCMfUC2zVCM0',
    'WPT/fmo+FCojWOm',
    'z2v0vMfSAwrnB3zL',
    'BgLJzw5Zzq',
    'yuHHBMrSzq',
    'rSkHWQtdUmkrWR0',
    'WPSrWRRdHsddO1S',
    'oX3dPX8oW60',
    'W4uaBLijWOOPW4CyWRiQgG',
    'CMLTBgG',
    'WORdG8kOeSoD',
    'WRv7ttTQo37dOJWZWPe',
    'pfWaWOmwW6OEgJVdLG',
    'qvnmAgK',
    'AYpcUSokWO/cJHy8eG',
    'W5uQWOjvW7xcO0hdK3tdNCkXW7S',
    'eNZcT8oOWOv3',
    'AgfZrxzLBNq',
    'DmkQkvhcN8ki',
    'xmkpW4OquCoVoSopuI/cVWVdIW',
    'agZcPCoTWOC',
    'WPukWQ/dNctdIfnC',
    'ywXPz24',
    'Aw1Hz2vuCMfUC2zVCM1uB29S',
    'WPJcJYG',
    'WPRdQSkyW4xdRCoqWOa',
    'WP7cNJBcRSoIW54BWRpcKLa',
    'zwrPDfrHCMDLDerYywDcB3vUzhm',
    'WP/cMdtcRCoVW5eN',
    'sw1Hz2vfDMvUDa',
    'uIxcVmowWQyOxHu',
    'FsVcPW',
    'Dmo5W6hdN8kXlNKCW6RcOa',
    'W53cT0ZcHCo9',
    'qM91BMrZsgvSCgvY',
    'wfhdGSoYWPBdLSkcWQhdRG',
    'WOOkWR/dNc0',
    'BNvTyMvY',
    'WPDXuJbSah7dGYmYWOy',
    'qSkugftcUuO',
    'DuVcKmkLgv5vgSkIjZVcPmonhCk9txlcRCoPD8oy',
    'W63dPrBdPvffWR8',
    'W51+W79wW7ldTmkyqKNcTc1/',
    'fSoLdvC5W40',
    'WO7dPZtdVdu',
    'qeFcLmk5iW',
    'W49/W69zW77dPmkuDuRcJIDPwa',
    'pmo4lf47',
    'r8kUWRRdSmkvWQ0',
    'W5VdLaxdR1TMWR0',
    'Axntyw1L',
    'DxnLugfYDeXHEw91Da',
    'uMvUzgvYrxzLBNq',
    'W6i/mgvxWPddKCoLqCkEhG',
    'fLGaWRqrW7y',
    'b8oTWR5jpKVcMCoIW41t',
    'C2v0vgH1BwjwAwv3',
    'Dg9qB2LUDa',
    'hmo5d1qtW5fJzSkrW5NdOwibrmk3',
    'ew1mW4Wv',
    'x8kteepcS1m',
    'W5tcStBcLmoaW64YWQmpgq',
    'DhjHBNnMB3jT',
    'DxnL',
    'xmkVWRldUSkWWQHJCW',
    'jfjrW58FWQxdVNG',
    'j8kjW7pdUmkpWQNdPsNcNq1aFW',
    'r8kVW6JcNa',
    'WP4cWRxdIYddHNDwm8oisq',
    'axRcQG',
    'eh3cQ8oYWPfwW6S4v8ktbG',
    'DSkwWQZdMSk4',
    'W5OhWOLaW7ZcTehdJ3/dHmkWW7ddHq',
    'vL7cLSkImvq',
    'i8o7u8kXW50L',
    'W5NcGmoG',
    'WR7dICkLn8oAmmkwfG8',
    'W7hcLmoJW6RcJq',
    'AmkNfW',
    'WPldKSkGnColl8kEhqK',
    'emo4WRXhoeVcImoNW51RW4JdPgpcGq',
    'W7uYk3j3WOddTSo+z8ku',
    'ActdQufPW7VcT2VcQ3S',
    'bmoXgvqYW4S',
    'WQuOWRRdGGS',
    'BgLUzxm',
    'WO9Ye8o/ySokWRLGWQRdQtW',
    'omoQwSk1',
    'WOVdR8kdW5BdISolWRBdN8k3W4S',
    'WPpdLSkLn8o6a8kxeq90WRnb',
    'vmkmccG8WPZdGL13W5pcLLW',
    'ysdcKSomWRJcLWq',
    'brFdL8kYW4fAxua',
    'W5Wkt0eEWOCeW48',
    'quxcT8kUo11D',
    'gCkjW6JdU8kAWQa',
    'BchcQ8o8WQxcJr02fq',
    'ASkSoLRcN8k0W7hcU8kSWPJcLM8',
    'W5FcJSoQWOSbWPPKFSolWROCuW',
    'vtCBnXdcN8oBW6muzq',
    'W5e/lhj7WPO',
    'bSo/h1aOW5PTy8kYW5/dVgaG',
    'z2v0',
    'gfxcJXTSW4/cPGe',
    'C3rVCa',
    'mLCxWQOnW6O1bG',
    'WOGtWR/dIthdJW',
    'zgvZDhjVEvrLBxboB2rL',
    'ugXHDgzVCM0',
    'WP4VeCo9W4xdVSo/W4ZdOSolWPm',
    'W6xcStONW5tdRxa',
    'f8kjW5vZ',
    'W4JcQLNcNCo9r2y',
    'uCkZW7xcKa',
    'qNbdzhy',
    'W4hdNW3dR0bDWR4VugO0WP0DhLOs',
    'Bwf4wa',
    'W77cR0dcJSoXwW',
    'W4NcTJ/cK8oAW6KPWQ8afa',
    'W7VdTIFdKfa',
    'WRSKjCkOtSoCWPC+',
    'rcJcQ8oyWQqKAqC9WOHGW5O',
    'kXVdRX8',
    'mLqvWQeD',
    'WRLyWOudgCo4iSkc',
    'WONdP8kcW5JdJCowWPtdMCkNW5C9W4TYcSkfW6C',
    'k8opdKC5W5fwtmkbW4m',
    'r3jVDxbeyxrH',
    'ovtdVmoBfaJdNq',
    'eLqvWQeDW4mXgZ7dLmkBkW',
    'DxnLwMLW',
    'E2XLDMvSFq',
    'wSkyW5i',
    'W495W7P0W7JdIa',
    'lXVdSJinW4dcGxPXxh5h',
    'ugfPBNrjBwfNzq',
    'WQSZnmkAtSoaWRm6CwdcRLmn',
    'W77cI1BdNmoXr3yEWOZcJ2e1W7vPW47cPcWQW4KO',
    'DgHLs2W',
    'dmkoW7/dV8kCWQtdOXe',
    'W4hdNXu',
    'DgHYB3C',
    'WP8mkmkdDG',
    'Dw5NEMLW',
    'WOHJaSoZ',
    'f33cPCoMWRf6W6S+xmkwaCkmWOy',
    'daZdKSk5W7XrAv14sG',
    'e8o5WR5MjuRcRmocW59pW4ldVW',
    'vgLSzuvKAxrVCG',
    'WPRcKJBcRCoQW6yWWPdcNvfAWRpcP8oi',
    'DxbKyxrLqwXSq2HHBMDL',
    'zhjHz1nJCM9SBgLUzW',
    'WONdMmk2p8oZkSkHgq9FWRnH',
    'amkVW63cIrJdVmoSsCkyW4pcO8k2qmkdcYhcP23cPa',
    'CgfYzw50',
    'tw92zuv2zw50',
    'imoIuSkN',
    'WOBdLbRdRWpdKa3cNmoYbG',
    'rKlcHCkJpvr2gmkNlbhcI8opha',
    'W5ZcPKpcJmoQrNaAWOtcUvq',
    'ufrKEwO',
    'W7lcTmoSWPeD',
    'zw5K',
    'f8o8bf85',
    'B3v0zxi',
    'W5ZcMmonW7hcVHNdLSkSWOBcN8k4AIXcW7xcImoLoSo1m8omW5LWfa',
    'xmkpW5i8x8o6fColBcRcUGa',
    'W5RcOKC',
    'ob/dTbyfW4a',
    'BwLYCM9Yqw5NBgu',
    'sKfJz0G',
    'z2v0qMvMB3jLtM9Kzq',
    'WPWKlSo1W5BdMmovW4ZdOa',
    'WQDsWP8dnmoJi8kd',
    'bbVdJ8kAW7XmuvvLxCk9WRLdimoCqq',
    'WRiOiq',
    'W7ldLSoze8kvWRW3W5eT',
    'yXCMbYhcQCob',
    'eSkBW5j7r8k2',
    'WOH7uJbjhgNdOIG',
    'm0joW500WQtdRLpcHCoKW54',
    'WOrKvdLN',
    'DZJcUmo4WPO',
    'W6tcJSoXWOSqWQbtC8oFWRyB',
    'uKvRu0q',
    'qM94',
    'qSkVWR/dSCka',
    'kmk+kGxdIH8',
    'pL0DWRiSW68IeJRdHW',
    'yvrfC20',
    'WOdcKmknrCoGW7XIW7umWPudeIK',
    'mCoUq8krW480W6NcKK/dGCkTBG',
    'qSkeawNcPCkCW7pcJCknWQVcQW',
    'W6uDtwmpWOyEW60WWPaf',
    'D8kOpfu',
    'DgfYz2v0tM9Kzq',
    'BslcTSoFWRG',
    'W5VdIsNdPu9nWPaUz3y',
    'ugf0AevKAxrVCG',
    'qcpcRCoAWRmZtWSN',
    'DxbKyxrLrwrPDg9Y',
    'AgLKzq',
    'suLzr2S',
    'W5/dL8oRfCk9WQ8cW5aWWOip',
    'WRTfWPObpSo5',
    'qKvgt1jfx1nftevdva',
    'hNSKWR4t',
    'DhjHBNnMB3jTlMjLzM9Yzv9JAgfUz2u',
    'WR8JdCo/',
    'mJiZnKzHs0XlDa',
    'awRcQCoUWPr8',
    'brFdLCk6W5Prqa',
    'DgfYz2v0',
    'Bg9Hza',
    'krldRXqf',
    'b2FcOCoSWODuW7GH',
    'WQDsWOCNnmoJl8krpSkhWPa6zW',
    'W63dPrpdR01nWR45',
    'W5xcLrK',
    'W5dcOIhcGmowW4K',
    'W6SgWPvzW77cQa',
    'bmkfW7VdUSkEWOpdSq',
    'g8oUWPHnluFcP8onW5zFW4i',
    'FslcUSoDWQ8',
    'W5dcHmoRWPewWODp',
    'pSk5iH3dUYFdNmkWW6NcVW',
    're9xtG',
    'DHlcUSoEWQ8stWq8WO9TW61uW7ddTG',
    'emkhW4v3',
    'yCo8W7RdJSkloW',
    'WQnEWPCspW',
    'wK9grK4',
    'WQyUnCkEFSoeWO86',
    'y29WEvDVCMXK',
    'WOH4e8oBDCoBWOvMWRy',
    'q0HbtKDf',
    'v0xcKCkJpG',
    'Bgf5B3v0',
    'WPr/vXfr',
    'C8kOlW',
    'wtmegXdcN8o4',
    'W6lcTsCqW4RdQ3KrWPDQW5qzWPHzld4lWQ0',
    'DhjHBNnMB3jTlMXHEw91Dc5HzNrLCG',
    'amoXgvy5W4TSASkbW5u',
    'y2HLy2TeyxrH',
    'WP8LbW',
    'WRepjCovW7ldUmopW7hdGCoUWRhcM8kh',
    'vmk2W6lcMCoeWQ4',
    'DhjHBNnMB3jTlMvUza',
    'WRftWPOsfCo4pG',
    'ywrK',
    'dCkxW6pdMmki',
    'W5hcOG8MW6a',
    'WQDuWOejo8o7i8kv',
    'gmkiW5VdO8kpWQpdMGpcNq0',
    'WOhcQCoQW7BcKcJdJa',
    'imkTW61xy8km',
    'WRGTWP8',
    'W5tcOIFcJ8o2W5KVWQ4mdG',
    'gmkiW4u',
    'W4ldHCoke8k1WR4',
    'ywrKtwfUEq',
    'r8kZWRpdRCk3WQz5DmkKWOe',
    'AxnmzwfMzxi',
    'Amk7ivRcK8k+W77cVCkXWOO',
    'ySkTiuNcRSkXW4dcS8kNWOO',
    'jSoQq8k4W6WKW6xcLg7dNa',
    'AxnpyMPLy3q',
    'x8kPWRG',
    'su/cISkQlLK',
    'q8kpW58/wCo8',
    'pCk0jq0',
    'p1fAW5W0WR4',
    'W6NcNCoqW63cRXZdJCk/WOZcMCkXDZTaW7lcKCo1oSoL',
    'z2v0uMvUzgvYu2nHBgveyxrH',
    'ugX1z2LU',
    'rxzLBNq',
    'rfjbrW',
    'W61sW7XvW4u',
    'WQtcQCoFW7ldUuBcUSoL',
    'C2HVDW',
    'zYpcSSozWQ/cVrC7eNFdHePlhCo+tKqu',
    'eb3dICkXW7LtCu17wW',
    'gCkjW77dS8kiWPRdVGNcNa',
    'WQDdWOOkmG',
    'F8oYW6ZdJSkHlN8A',
    'WQqUmmkFF8obWPiVxwVcUG',
    'xSkHWQ/dSmkbWR0',
    'W5dcKCofW6lcJZ3dGmkIWPFcQCktya',
    'C2TLDW',
    'W55tW6VcMhxcMG8bDq',
    'pfWaWOSrW6O0gtRdO8krmmkZfq',
    'A2LSBefUAw1HDgu',
    'x19LDMvUDeLKCW',
    'lHhdJCk7W5bjqfP/',
    'WOn6WOOEgW',
    'WOHXvJj7oNBdRYSZWQypWOjDW6/dSvtcMq84k03dMq',
    'yM9KEq',
    't1LhqLK',
    'AwDUB3jLrMLYC3q',
    'DhjHBNnMB3jTv29YBgq',
    'zxrTBxe',
    'q8kHWQVcISofWQvzW7JdIq',
    'BgLZDa',
    'W4FdIGxdQ1Dm',
    'AgfZsg92zxi',
    'WObfWPiijmoXkCkvnSkDWPaXBG',
    'eMNcSmoKWPbyW701ymkvaCkmWPu',
    'ofurWQCkW5W1fIS',
    'hfVcQbT7W5tcPI8A',
    'hvBcIdrO',
    'ACkGp2a',
    'tcNcSmolWOGUra0H',
    'BMvLzefKze5Vzgu',
    'y29WEq',
    'rgvIDwC',
    'yCkkgtiW',
    'vwLUDdHbCNjHEq',
    'WPP+kCo5Cmok',
    'AxntvKC',
    'W5hcSZFcHSohW5GwWRukeNPHqt8CW5O',
    'W5WxFvSFWOGfW5OBW7OWcvOTsa',
    'zefvtei',
    'dfJcVZ1sW7BcTeJdSuxcMq9FW4biFmocW5hcNmkZkmoEWRZcJmkIe8osW5y',
    'W6X2W7PSW7VdV8kpBG',
    'W6i/mgvgWOBdMCo/Cmkxcs/dJbnwmd4',
    'w8kZWOpdSCkqWQXXE8kJWOpcMG',
    'ChjLDMvUDevKAxrjBM5LCG',
    'tmkgW5CPECoQnmoEqchcRG',
    'amkCW5H+rq',
    'ywrKrxzLBNrmAxn0zw5LCG',
    'W7tcTrxcKSo1',
    'C3rHCNq',
    'ysJcTConWQ/cJa',
    'ECknotq5WOJdJ1z/',
    'WOj4fmoICCobWRj5WQVdOJVcMW',
    'W5FcPIFcPSoqW4KVWQWgmMfwua',
    'WQ/dR8kfW5NdQSoBWPhdHmk8W5W',
    'EIBcTSoq',
    'E3D9',
    'iSoVWRvyl1ZcVCo6W7XnW4ldO3K',
    'W5xcHCo8',
    'smkbhwtcRLShdvi',
    'ywrKqxr0CG',
    'WOH4c8o6rSokWPr7',
    'W5dcOIdcJa',
    'CgHVDg9cB3vUzhm',
    'cuZcUqfQW6/cRbu',
    'lmk8pWRdHYpdNa',
    'zmkApH4/',
    'CMv2zxjZzuXPBMvoB2rLCW',
    'v0/cICkIlfq',
    'vhjHBNnMB3jTvg9VBa',
    'C3bYzwfK',
    'CM90yxrPB24',
    'vSkLWQxdQ8kgWQzU',
    'a1tcMb1/W4e',
    'iq3dHrifW5FcGwq',
    'qCk1WRxdVmkrWRPK',
    'WRKXWPRdRW',
    'WQeYeSkxvCowWP4lFNdcQG',
    'rSkeW5O8rmoboW',
    'rwPHEu0',
    'aSo1WRvCjwZcPSo2W5DFW5q',
    'qxjYB3C',
    'WOFdRH7dObpdMsxcV8o/dCkK',
    'BxvSDgLWBhK',
    'fx3cVrzF',
    'W5eYmhTMWR3dLCoWzmku',
    'z2v0sw1Hz2vdB21WDxrLzfbHAw50',
    'W6qAWOjvW6O',
    'eSo5vSk3W6W2W6NcJNu',
    'WRZcUSodW4pdOfFcRCoHW4y',
    'tePHAhG',
    'WRVdNmkWW7y',
    'BgLNAhq',
    'sJZcSSozWO/cJHy8eG',
    'x191CgrHDgvxB3jSze1HDhjPEa',
    'fmoKtW',
    'Cmk1W5i4rCoHkmoE',
    'xLBdJCoYWOZdNSkk',
    'gLpcUrG',
    'g27cT8oeWPr8W7CL',
    'pSk5iH3dRsNdLG',
    'W4dcOLJcJa',
    'WORcMddcImoJW5mLWPtcO0nvWRlcOq',
    'jxBcMJvT',
    'WP0Lb8o/W6tdNmoKW4m',
    'pLtdUmoDiGJdMSownbG',
    'dNlcVqf6W4RcRq',
    'jSoKxSk+W50',
    'h2RcSSoKWO5Q',
    'h8kVkG7dQJddI8k5W7G',
    'DgfYz2v0t3zLCMzSB3C',
    'W4aaDvieWPO',
    'CmoPW7ZdMCkRlMyE',
    'fCkPW6BcKa',
    'grhdLmkZW5LExff5',
    'bmo/geurW5PrDSkeW5FdQW',
    'W5NcJSoUWOaSWOLyE8odWRy',
    'W5FcPIC',
    'qmkeW7ORxCoPdSoEyZZcOG',
    'xtmejJtcLCo8W6ie',
    'WRlcOJhcSCoQW5m2WPtcPe1oWRdcSCoNfSkYu8oGW60',
    'W4hcSvZcJSoXwW',
    'W4VcStRcGmoAW5mkWRmqca',
    'rmkIW6/cJmoFWRK',
    'W57cIYq2W5tdPwWAWP9SW5OsWP9Epb0fWRLn',
    'C2vSzwn0B3i',
    'oaVdTrS',
    'WRSKpCkEwCorWRm6CwdcRLm',
    'pfBcVrT4W4NcUGS',
    'm1xdLmovfGldOSoxna4',
    'EmkmlYmOWORdQ0W',
    'bmoIbeuZW4TBDCka',
    'D2f0y2HLCG',
    'BwvYz2vdB25MAwC',
    'W5dcJ8oMW6dcJrhdISkfWOZcJ8kz',
    'EmkggciBWOddPfz+W4dcH2eeWP4NWPC',
    'y8ktgsCSWORdJ1XYW5FcNfW',
    'W78fWOjrW63cO3BdMvtdLmk8W7K',
    'xfBdKmo0',
    'DxbKyxrLu3r5Bgu',
    'vwzjq0y',
    'W5xdI8owgSk1WQKMW7O3WOG5iIVcOSkvtSk9WQDF',
    'kmk4pYJdJdldH8kHW6NcHuijDa',
    'emkXW7hcKW',
    'WOVdHXldQW',
    'WPqnWR/dJt3dPvK',
    'o3xcQdbCW47cM0pcJNZcVGy',
    'WP/dJCkHpSoRd8kxcW',
    'zfnbqLG',
    'W4NcRcxcGSo7W5WOWR4pgq',
    'WPtdLmkGnq',
    'W6BcSt0wW4JdPKC3WP5U',
    'W60qWPjYW7ZcOvZdMhtdNCkXW7S',
    'eSkcW7pdOSkVWQ3dPqVcJHW',
    'WOrWqbTXf37dJcKWWOWzWO4',
    'W5tdGCoEg8kIWQ8tW5S9WRWulIlcVW',
    'W6y2lunZWPJdKCo1tSkEedG',
    'ywrKsxrLBq',
    'kmk+kGxdIH4',
    'hfVcQaDBW4lcOrirWO/dHXZdVmkMW6tcNLy',
    'aCkSW7BcLq',
    'yw5PBwf0zq',
    'ufJcIa',
    'bSoVWRTgouJcPSoXW5qvW4tdPwZcM1Ct',
    'qKL3A2i',
    'W7bFW5PoW5G',
    'gCo1gvy5W7XnA8kdW5NdQq',
    'xZmAnW',
    'WQhcQCou',
    'W4/cLCobW7i',
    'r8kdW4Oju8oNm8oE',
    'b8kLW7dcKW/dSmoH',
    'quzurvi',
    'Cgf0AevKAxrVCG',
    'WRjyWOefmSofi8kjp8kSWO0',
    'rmkPWRpdQa',
    'WQRdLmkTpSoRdSkwfaTtWQ4',
    'WPBdVCk0W5/dI8oXWPFdLmk2',
    'W4ClweCnWOK',
    'ox3cTqvFW4G',
    'W6FcRLtcJSo9Ehq5WORcULql',
    'jSo+rmk4',
    'jmo/aL8OW7DhACkvW5xdVa',
    'WQrnW7G',
    'x8kVWQddUG',
    'p1xdUG',
    'r8kWWRldVSkaWQXhC8kKWOJcIG',
    'uMvJDa',
    'lmk3W417u8kSemkJASkiW5fHqMi',
    'W7b4zSoda8ktWPKtAv7cRvi',
    'mZy3ndyWofrZwKnVvW',
    'uCk0W6NcJmoFWR9oW63dNG',
    'FmoOW6tdN8kmg2qoW6ZcVa',
    'k8opd1qWW5PwymkRW5/dQMK',
    'hwdcOmoKWQz4W60W',
    'yMvMB3jL',
    'zwrPDfrVB2W',
    'W5FcGmo2WOybWOr+FSobWRCfrq',
    'EZ7cT8oFWR7cNsmZd1VdN0e',
    'uMP0r1i',
    'eCkpW7BdUG',
    'e8kVW6RcIqK',
    'WRWLWO/dRrFdTwX8cCoOEmo7',
    'DhLWzq',
    'yCkcfdi',
    'te9breve',
    'BCkkeYi9WPFdTW',
    'kmkPoqBdHcpdUCk+W6JcV0u',
    'fSo4WQLCoehcSa',
    'u1rbuLq',
    'r8kfW4G8tSoDkCotBIS',
    'W53cPKe',
    'xYtcQSowWQmStW',
    'WQfMrtjBbx7dOdG',
    'eCknW4D9uSk9',
    'Aw5KzxHpzG',
    'WP4pWRtdHIa',
    'W5SvBLanWOO',
    'Cgryzg0',
    'B3jPz2LUugfPBNq',
    'WO3dGXBdQr/dGq',
    'qSk1WQxdTW',
    'b8kYW6lcGd/dSmoTySksW5tcTCkQv8kp',
    'Ec1Zy3jVBgW',
    'C2nYB2XSwejVDw5KCW',
    'WPddLHVdRWpdKbdcKSoIcW',
    'uulcGCkgnG',
    'WRldHXBdUJ/dKcZcG8oZeq',
    'jCoUw8k1W4O0W6NcHe/dGCkTBSkddtlcOq',
    'q1/cISkUlLHxgq',
    'zCkxdYKZWORdNvf/W5FcMW',
    'uXOwpadcLSoWW4azBKW',
    'WPW4cSo9W4NdKW',
    'W4ldIatdH0jAWQGiBgaXWOW0',
    'WRXEWPCda8o+k8kckq',
    'tYlcQ8o6WQaJqG',
    'B25vBMXVywq',
    'vmk2W6lcMCoeWQ5NW7ldKSoEW7ZdLNyVWQKz',
    'lKKqWQCmW6StgJhdLCkxpG',
    'WO1JaSo3ymokWQDUWRRdUcRcMJm',
    't0ldJCoFWONdMCkDWPRdRLpcLSoixL4usgJdJq',
    'WQCZomkCu8olWQS6DMRcTG',
    'nh3cQ8o0WPi',
    'WROKiCkxw8ogWP4',
    'WPyMbSo3W4xdK8oK',
    'WPzyWOyim8oK',
    'W5VcJ8ovWOOsWO1ZCCol',
    'DxbKyxrL',
    'nwpcIr9EW5/cMfJcRNBcVG',
    'W53dLdtdUKDiWQ8U',
    'W4FcHmoSWQqhWPXFACok',
    'tWJcH8o7WPG',
    'x19JBg9Zzwq',
    'W57cRfZcH8oS',
    'zMLSDgvY',
    'AxnnB3zLtw9Kzq',
    'ywrKu2nHBgvy',
    'qMPYvwe',
    'fCoNxSkGW6WKW6xcLg7dNmkazSkUaYtcGwldRNldRSkbiCowWQCYdW8N',
    'W4ldMXxdOMznWRi/CxD+WPK3a0WuW5LwnL43W4vZ',
    'kuxdUmowbt4',
    'Bw1UDKy',
    'WOlcKsdcL8oVW543WPq',
    'WPldR8kjW6G',
    'W60qWPj5W7FcQfddHhFdNCkJW7S',
    'zSkVpfJcImkrW5BcSmksWPhcLMyQ',
    'BgLZDgvUrxzLBNrZ',
    'smkpW4OkvmoVoCofDrRcPatdKCk0WQfEWRWG',
    'W4RcNCosW6dcQbtdGCkLWOFcPSktFcG',
    'iCoyWPzTcxO',
    'xZ0tnYdcM8oHW60',
    'z2v0twLKzgXLug9PBNq',
    'WOT/bSo0Emok',
    'z3PPCa',
    'AxntDhjPBMC',
    'Bw9Kzq',
    'EmkWfq8r',
    'WO7cLsxcR8oPW5SSWPy',
    'WPOKf8o/W5ldNmoZW5BdRConWPO',
    'bmo/aL8OW6XlF8ka',
    'bf/cTqH2W5i',
    'bmksW6pdUSkE',
    'e8khW67dT8kRWR7dUa/cJHTDzmoI',
    'WQ0pWRRdNcpdHu1u',
    'WOOKk8ksx8oxWRm+C3tcP0q',
    'ugf0AenVBw1HBMroB2rLsgvSCgvY',
    'sfhdGSoRWQZdNCkmWRtdPG',
    'W64hWODxW77cP1FdML8',
    'WO3dHWZdHHJdGYxcGq',
    'WQzFWPS/nq',
    'W5FcSZ/cJSoqW5GkWRmngubDusmd',
    'y8oYW7ZdISkrjMqv',
    'm1xdISoBdqldO8orpG4',
    'y3jLyxrLqwz0zxjqB2LUDa',
    'fCkjW7xdUSkEWQ3dUq',
    'z2v0qM91BMrZ',
    'CMf0Aw9z',
    'WO7cKIRcP8oNW5u',
    'WO4gWQ/dOsJdI1HCfComuSobWR0',
    'W7pcSt82W5tdSwWvWPvVW5y',
    'dh/cTr9oW5/cJhtcTNBcTbC',
    'ywrKtM9KzujLzM9Yzq',
    'BM9Kzxm',
    'yM91BMrZvhLWzq',
    'W57cMCoqW5FcHqZdHCk/WORcHmks',
    'ug9PBNrizwXWzxi',
    'WOaVf8oBW4pdICo5W5tdOCoSWPVcVmk2',
    'W4BdKW3dRW',
    'WONcJYxcPSomW503WP/cL1fOWQxcPCoa',
    'ofjvW4G5WR4',
    'WRDwWP0qnSoK',
    'l8kPW63cGG',
    'WO11vWz9axtdOIaZWPe',
    'ytZcUSozWQpcLJ87fue',
    'W5RcNCokW6BcJXq',
    'W49/W68',
    'x19KCMf3',
    'W7e7nMf9',
    'BSk6g0JcISk1W4dcMmkJWOZcMg0',
    'wmkwoLJcLmk0W5FcPG',
    'u8kJW6xcJa',
    'p1WhWRikW6eP',
    'WRSUnmksEa',
    'buNcNW5WW4xcRqO',
    'DLPit2i',
    'amkHW63cSG7dUG',
    'Bwn5r2C',
    'jXddMq',
    'WOtdIHpdOqddStlcKSoX',
    'bmo4beuZW71nCmklW5tdVq',
    'zCkgesm7WPVdR1XvW4ZcL0Sd',
    'BgvHzMvY',
    'W6SrWOi',
    'lbFdRryU',
    'rSkzW7W8w8oNm8oKBsRcSW',
    'WOP6EW',
    'ywn0AxzL',
    'zM9Yy2vszw5Kzxi',
    'WR1AWPibmG',
    'W6GAWPnEW73cTq',
    'x19KzwXLDgvoB2rL',
    'tuxdL8o5WPFdSCkjWRFdK13cMmodAa',
    'kgtdQer/WOJcOuJcR1VcKdTMWP9DbCoKW5hcNmkZkmoEWRZcJmkIe8osW5y',
    'kvyaWQCmW6C/gW',
    'z29ryxm',
    'qZ0cpaa',
    'AgL0DgfIBgu',
    'x19SyxLVDxq',
    'hSoYWRTmd0RcOmo3W7TuW58',
    'hmoCWPrzpa',
    'W7VcUYy+W4/dRg4',
    'jSoLbq',
    'W7GAWPjrW63cR1RdMa',
    'WOhcMdlcPmoI',
    'emkhW490sCk/',
    'Aw1Hz2u',
    'ru3dL8o5WPFdKCkoWQFdQL3cNW',
    'lN/cQbboW5/cV0pcR2BcTaC',
    'y2XPCfrYyw5ZzM9YBvrVB2W',
    'BHJcQ8oxWRq',
    'W7KbWOLa',
    'W7tcPc0YW5ldP0a1WPTSW5y4WQHrpXefWQHgWPiV',
    'yM90Aa',
    'yKHHBMrSzq',
    'xd7cVmonWOiVra46WOK',
    'kXldRWmUW5dcJxX9xgi',
    'wYJcR8oAWRmZtYu8WOPS',
    'DhjHBNnSyxrL',
    'hCoZWRDnov3cQmoKW5W',
    'W6BcO8ohW6NcHqVdGCkV',
    'WROKpmkutmoaWRCYBhdcP1G7wSkSW6Dgpa',
    'CMvZAxPLtgLUzq',
    'oHhdSX0p',
    'hMdcSSoKWQP4W7C1xmkF',
    'y3jLyxrLqMvMB3jLug9PBNq',
    'DuxcJCkJlNLDg8kZlc0',
    'x19UB3DxB3jSza',
    'rclcR8owWQ8N',
    'Cgf0AevKAxrVCI5TB3zL',
    'mKO1WRqkW68P',
    'WQpcPSoZ',
    'WRjyWOeJnSo0lG',
    'W6K2mhj6WOa',
    'bSoVWRTgouJcPSoXW5rVW4JdOMe',
    'kwlcSa',
    'WOZdRCkqW53dIG',
    'fSoVWRTFa0pcQmoKW5W',
    'A8kSpLJcLG',
    'l3xcSbrzW47cTLdcRNFcTGy',
    'rCkmdNlcQmkvW63cL8kkWR/cSu8B',
    'm2dcVrjtW47cHW',
    'qMjnEhi',
    'Fs3cSSosWQ/cOq',
    'xIlcQ8otWQuuwaK9WP1VW5jhW6K',
    'amoIcL8VW5LnD8ki',
    'z3jHyG',
    'weZdOG',
    'WOZcIddcRSonW50SWP/cLKfi',
    'W5WeBLijWPO',
    'FIBcVmokWQu',
    'W51+W79BW7hdUCknrKVcQtXpuGm',
    'W7m2kxbZWOa',
    'W5tcOJtcGG',
    'yM9VBgvHBG',
    'W4iBgfTvWRe',
    'zhjHzW',
    'sexcGmkO',
    'i2dcRCoVWPz8W6SurSkFbSkw',
    'WPzXsdb9b37dQGi5WOCoWPG',
    'C2vSzwn0zwriyw5KBgvoyw1L',
    'lN/cQr9E',
    'AgfZ',
    'WPldOCkvW5q',
    'oL0qWOCm',
    'cNaXWOmB',
    'hghcMW',
    'wmoiW7NdH8kn',
    'zsJcUmozWOKLrHG2WPW',
    'o3xcQd1BW4pcKutcTa',
    'W6NdISoxemk1WO4ZW4S4',
    'DgLSzvnPEMu',
    'DgH1Bwi',
    'W6RcSvtcJSoDq3a5WP8',
    'ACkOjvG',
    'udytgWRcLmoWW741zeddU8k5W6NdHW',
    'EmkmgsmCWO7dVLK',
    'WPpcL8oFW5ldU2lcOmoLW5e',
    'WPldNSkTn8o3mG',
    'WP/dLSkTja',
    'D2LKDgG',
    'egdcQSoNWOT+',
    'W43cJSofW6VcMr7dI8k5WO7dHCkoFsnbW5lcLCk+nSo0jSo3W5jL',
    'ywrKsw1Hz2vfzgL0qM94',
    'WOtdRH7dObpdMsxcV8o/dCkK',
    'W7KqWOPvW7RcSLddKG',
    'W4tcGmoTWPyb',
    'WPVdN8kGgCoYj8kuht5sWRvnhmkVqG',
    'WRHdW5HPWOBdMaNcSq',
    'W5JdI8oCeq',
    'C2HPzNq',
    'WRVcQCofW4m',
    's8kDdglcVv0o',
    'WP3cIdFcQq',
    'ifTPBMrLEdO',
    'ifHvW4eL',
    'W4xdGCoueCkZWR43W5SxWOmFiJ8',
    'Dg9oB2rL',
    'WQhcQCouW7hdN3a',
    'C2nHBgvpzG',
    'cG3dUmkYW7PmqhPKwSk9',
    'W5ZcKConW7hcRW7dGCkLWPC',
    'xd8zjci',
    'W5pdGmoramksWQuQ',
    'nvyqWQm8W68Kfa',
    'qxjVDw5KsgvSCgvY',
    'p1ddVmoufc7dI8ol',
    'mw7cP8oQWPfPW7GYvq',
    'tt/cUmoiWO0Lxa0/',
    'uJOwpapcN8oBW6muzwFdRSkwW6m',
    'g2ZdQCoxiq',
    'W641p2z3WOa',
    'oSkXjWBdMaldNmk2W6S',
    'W4BdMXpdRuzD',
    'rCk0W6FcJ8o8WQ5bW7JdLW',
    'eX/dJ8kQW7bns2bQtCkZWOXE',
    'uvpcLmkO',
    'yCkuWPFdJCkG',
    'm8kVW6RcIqNdL8o9ymkgW4lcKW',
    'WQzwWP0como6',
    'WOVdP8kCW5tdNq',
    'WPacWQS',
    'DxbKyxrLsw1Hz2vqywLUDa',
    'W5hcSdBcLCoWW5iOWRWkgW',
    'WORcMddcImoGW5WNWOpcO01vWRlcOq',
    'x19WyxrOsxnoB2rLCW',
    'smk1W4FcISocWQPo',
    'DMLLD3bVCNrcB3vUzhm',
    'DCkpfdyDWOVdO0XzW4ZcIW',
    'ugf0AevKAxrVCKv2zw50',
    'WQbdW6W',
    'iqNdQmk9W7a',
    'B25Jzq',
    'W5FcJSo2WOmnWO8',
    'omk8jtZdNcm',
    'wIBcVmoiWO4Mzr0NWOT7',
    'Fmo4W7RdJmkak0GuW6hcSSoweG',
    'sgnoCuy',
    'mmkuW4lcTsK',
    'CMvJDa',
    'WP3dHSkqW5/dI8otWP0',
    'zmkIW6/cJmoYWQrp',
    'rwzMzwn0',
    'ngpcVWHm',
    'eCkjW6JdK8kAWQ/dVW',
    'WR9jW6D4WPFdHqlcSG',
    'mhxcSHzoW5i',
    'p8oMvSk3W4W',
    'WP/dV8kRkCoTemkBdbzoWQ5P',
    'W57cMCoqW4ZcHbBdGCk5WRpcHmkvDJK',
    'tmkwgM7cSv8bhhiXW6xcLCkbACo3',
    'BKzeveO',
    'vgfZA1bYB2nLC3nVCG',
    'l3xcSbrzW47cM1xcJNZcVGzcW4rXqq',
    'WP/cMcFcTq',
    'm8oVxSkKW70HW77cH2tdMG',
    'W4tdI8omfCkKWQm9W5e',
    'cIaGicaGicaGicaGicaGicaGicaGicaGicaGicbSzxqGDgLTzxjjzca9ig51BgWkicaGicaGicaGicaGicaGicaGicaGicaGicaGihnLBgyUB25TzxnZywDLid0Gzsa9pIb7cIaGicaGicaGicaGicaGicaGicaGicaGicaGicaGicaGAwyGkguUzgf0ys5Hy3rPB24Gpt09icDZDgfYDcCPihSkicaGicaGicaGicaGicaGicaGicaGicaGicaGicaGicaGicaGAwyGkcf0Aw1LCKLKksb7cIaGicaGicaGicaGicaGicaGicaGicaGicaGicaGicaGicaGicaGicb0Aw1LCKLKid0GC2v0sw50zxj2ywWOkcKGpt4GCg9ZDe1LC3nHz2uOrgf0zs5UB3COksKSiguUzgf0ys5PBNrLCNzHBcb8FcaXnIKkicaGicaGicaGicaGicaGicaGicaGicaGicaGicaGicaGicaGFqOGicaGicaGicaGicaGicaGicaGicaGicaGicaGicaGih0GzwXZzsbPzIaOzs5KyxrHlMfJDgLVBIa9pt0Gj3n0B3aNksb7cIaGicaGicaGicaGicaGicaGicaGicaGicaGicaGicaGicaGigLMicH0Aw1LCKLKksb7cIaGicaGicaGicaGicaGicaGicaGicaGicaGicaGicaGicaGicaGicbJBgvHCKLUDgvYDMfSkhrPBwvYswqPcIaGicaGicaGicaGicaGicaGicaGicaGicaGicaGicaGicaGicaGicb0Aw1LCKLKid0GBNvSBaOGicaGicaGicaGicaGicaGicaGicaGicaGicaGicaGicaGicb9cIaGicaGicaGicaGicaGicaGicaGicaGicaGicaGicaGFqOGicaGicaGicaGicaGicaGicaGicaGicaGicaGFqOGicaGicaGicaGicaGicaGicaGicaGica',
    'mSoBW47dRq',
    'W77cRfZcH8oSFxa7WPVcUem',
    'weZdSmoOWPFdMCkdWRq',
    'WOhcKIxcPCoEW5m2WPK',
    'WPqVf8oFW47dMCoEW43dOmoh',
    'ueHJtgHmsNKXvKnSuw1ksu9sueXfoxzSvgTtoa',
    'WP94W4PpWQa',
    'x19Yzw1VDMvmAxn0zw5fDMvUDhm',
    'B25fBNrLCG',
    'x8kxh0pcPq',
    'lHhdTdykW5FcJa',
    'yMLUza',
    'ueHJnwLYy0LNuLbmrtL2BfrRuZG',
    'm1zsW4W0WQy',
    'WR9eW6j7WOddUGlcRW',
    'umkVWQ7dNmkCWQH5DCkO',
    'y2fUy2vS',
    'BwLKzgXL',
    'v8k7ohhcMW',
    'rLJcGCkSlL5k',
    'WQddQdS',
    'Axntyw1Lug9PBNq',
    'WRHnW7L6WPhdHq',
    'WRZcQColW5i',
    'W4KbEhSdWOOpW6KqWQaMdW',
    'p0SvWReXW6mXeJO',
    'W4WYlwD7WOW',
    'xmkVWRldUSkhWP9+D8k6',
    's0BdL8oEWOddLSkcWQhdPNZcNSojEq',
    'sCkah0dcU1CihG',
    'WONdGX7dQbldHW',
    'WOz7sJn3fa',
    'mCoUq8kvW4CKW4lcJ2xdIW',
    'WQ8KjCk5vCoDWQS0DMRcTG',
    'lSkHW7FcLrtdPW',
    'jH/dQXy',
    'W5xdJmozgSk3WQ8CW5a9WOK1jIhcRG',
    'yM94qM91BMrZ',
    'Bgv2zwXZ',
    'C2vSzwn0qxjLyq',
    'Fs3cOCorWQBcLcq9ffNdJ2z6e8o+w0SCWObK',
    'CSo4W6hdHW',
    'mCkTW6DDCSkDkSkaymkOW7e',
    'fSkZW6BcQXtdVmo9ySkfW4i',
    'WQT9lSo/vW',
    'q8o4W6BdJ8kapu4nW6RcUSol',
    'p8oMvSk3W4WfW6JcIxxdRmkMCW',
    'WP/cMdFcQmo0W5C',
    'zxHWB3j0Aw5N',
    'r3jVDxa',
    'WQHEW6PQWR3dNaBcSsS',
    'DuBcHCk5pf5kgG',
    'q2XPCevKAxrVCKHVCML6B250ywXmAw5L',
    'zhjHz2DPBMC',
    'wYJcUSol',
    'WPCnWR3dKGO',
    'qCkJWRFdS8krWPe',
    'C2nYB2XSzxi',
    'yIFcTmowWR4',
    'mNhcSrq',
    'dCkVW6FcGG7dICoXACkb',
    'u8keWOxdSmkX',
    'WONdMmk2p8oZkSkQ',
    't8k6h0NcUfid',
    'ywjZ',
    'pfHDW4S',
    'W5dcJ8oRW7pcJWRdGSkNWOZcNa',
    'nSovlx4oW7P9x8kQW7/dGW',
    'W4hcKCo8WOqqWO1/CSooWRqmzmkwd2nevGVdPXVdHW',
    'cbVdGSkBW6nAs0a',
    'W4/cGHJcLCoX',
    'C2v0qwn0AxzLtM9Kzq',
    'WPa/eCoOW4xdK8oKW6ZdQ8ogWPe',
    'xCkpW589',
    'hmoYWR5ndK/cVCoI',
    'C2nYB2XSwa',
    'WPqqWOJdVGi',
    'WPJcJsdcOmo6W5C',
    'W4FcHmo0WOahWPXtEW',
    'BxvSDgLWBgu',
    'fCkAW4b/rCkreq',
    'W5JdI8oCeCkJ',
    'W5xcMCofW6pcJWO',
    'WODIkSo/zSoDWPH9WOBdRshcJde4WONcUfy',
    'qNjHBMnOsgvSCgvY',
    'W43cMCojW7xcPbFdGmkU',
    'WOSTomklF8obWPiVChy',
    'gmo/cLuvW5S',
    'WPqqWPBdHZpdJ3jwiCoi',
    'AgL0q2fUDMfZtwfUywDLCG',
    'qxjYB3DvCa',
    'sCkNW7xcSCoeWQ5A',
    'WQyUnCkE',
    'tfNcRmkInLvZeSk6oG',
    'WOJdP8kvW4xdHW',
    'WONdJ8k2p8o0i8kYfbjrWRi',
    'W512W7D3W6RdG8kyB0RcOZW',
    'Dg9dB21Tyw5K',
    'WQ/dR8kyW5/dM8o2WPxdKCk0W4S',
    'zgvZDhjVEuHHBMrSzxm',
    'mNz2ChzNstrWAeTLwKT4v2XZlNbjmxvQsuLfzKKXBuKYDNzWzMHYzKKXDuK4ztryvwjMrM1ntuW0AfPmwNzZnwLWzvHquey0vKzUwKTuB1fOwK9JudDtyNu3owzlt0Lwm3ren3r4BNPVmNfUwJLVu1mXELzUqK1knw5iBJfykMzABMfpmKzrm1fXwhbgEMTYv21sCM8UC2jmyIXAkLrXDgL4tJbMuLjnA00Zle4QkNzgm2nTswfHthrlvg9WA0iXvdzmuMLqvLvpwvy3rMrVwevIvxbVn2PWn1jXvMW0BfnQmNbfrti0mhDcrIPfrK1XruLWExb1rNvsmhfwwNiZqNv5nKz3sJy5tdnxsNDxDejgohLSDeKXu20ZBuv0u2PgDgrWvZm5tvKWnxvHn1DfnfrrBfjvDxHVALfZA1DqCdbOAKDmqNHZBvu3zMTRvKLmtg9HkKqWD1nQrKvYENDUDvC5vvjLAwj3tZqXANO2rhuUtfLmAIO5Ctv0mK1KzuPkDtf2q0KXsxa',
    'juDyW44LWQ/dINlcG8oUW48ne8oNuHS',
    'WR1zWP0djCosiSkol8klWPaM',
    'g8oWWRTpl3RcU8oIW5DiW4hdON/cMgqzWRTz',
    'BYRcT8oWWQxcNby',
    'wfzqrhm',
    'W6CuWP4',
    'tSk0W6/cN8ozWQv7W7tdImoe',
    'z2v0t3DUuhjVCgvYDhLezxnJCMLWDg9Y',
    'uYlcTSosWO0HuW0H',
    'pb/dTrG',
    'WRTfW69PWPW',
    'BMfTzq',
    'yKHHBMrSzuXPBMu',
    'W5FcPJ/cGSoqW4KJWR4Te2PxrG',
    'j8kUW6zvra',
    'd8kVkGFdNcddGCkLW6hcJLSiFYO',
    'cSkUW63cGG/dMSo8zCkcW6xcJSkR',
    'qmkxdedcUxClgfaWW4NcHCkQCSoniCo4yr0JymkEpa',
    'twf0CML4sgvSCgvY',
    'hghcGmoKWPfTW6S+sq',
    'C8kOoLRcN8kK',
    'W78fWOjrW63cOW',
    'mLqvWQeDW5OXbZJdLSkk',
    'W5RcJSo2WOa',
    'W5xcHCo8WQqq',
    't2DgBMW',
    'C2vSzwn0zwq',
    'u8oYW73dHCkbpemEW6pcPmoAbW',
    'q03dVa',
    'tSkag0BcQfSRfLmW',
    'WQrwWOCogCo4iSkc',
    'CMvWBgfJzq',
    'o1xdQSotbWK',
    'WRGYWRRdQZW',
    'z2v0rgLZDgfUy2vqB2LUDa',
    'lK/dTmoFeG',
    'qSkNW6JcRCodWQ4',
    'WPiPf8oZW4/dKW',
    'jSoBWP1VlG',
    'Bw92zu1Vzgu',
    'CMvJEwnSzq',
    'g1tdTSopdGpdP8oDpbTjaq',
    'x19SAxn0zw5fDMvUDhm',
    'zMLSBa',
    'WRGGjCktF8obWPiVChy',
    'WRTzWR8jnSoZ',
    'WRVcOCoiW4pdPW',
    'WPXaW6PPWPldNHxcUW',
    'DgLSzxi',
    'a8kaW45MtW',
    'W7eMkN0',
    'ywrKtM9Kzuf0',
    'n07cKmoa',
    'C2XPy2u',
    'CNvUBMLUzW',
    'WR5jW6zYWOldLa',
    'gMlcPCoMWODnW7GJv8kFha',
    'Dhvnz0G',
    'w8kZWPxdQSkgWR9YxmkIWOlcMW',
    'u2nYB2XSzxi',
    'rCkOk1BcNCkIW53cOCkSWPRcRx0WW6JdU8oh',
    'emo3WRhdI8kiW7iaW43dLCoxW6ddK1G',
    'rCkVWQtdS8kqWP1LC8kJWPxcMmkUrCou',
    'WQhdLb7dQtldGYxcNCoI',
    'W6KuWOHtW7ZcQN3dMuZdL8kN',
    'v8kLkqmk',
    'W5e/ogf0WPVdISo8',
    'Aw5UzxjfzgL0qM94q29UzMLN',
    'y3vYC29Y',
    'AxnbBMDSzvnUyxbdCMvHDgvlzxK',
    'CM90yxrPBMC',
    'WRW1zCooF8kxWQqICeZcIg4whSkwWRLBhCktW4VdKSoCFCkmlCk/k8ol',
    'BG0BmX3cLCoGW7G',
    'l8kVkGFdNcddGCkLW6hcN0icFq',
    'WO5yWPWleSoHi8kjlW',
    'WPDXvdb/bW',
    'zg9cB3vUzhnuExbL',
    'W5n4W7f9W77dPa',
    'WQVcRCoyW7BdQvFcSCoJW61wWOXd',
    'DmkmccG8WPW',
    'bgBcOmo1WOO',
    'C3rYB2TL',
    'W5FcJCo3WPybWQfyCCokWQeSrmkngMT0',
    'WQ4Op8kFFSoaWP4RugRcPW',
    'CM90yxrLt2zxB3jSza',
    'nufzW4eLWOpdVM4',
    'pxtcUd9vW57cM3pcPxxcTrfR',
    'yxbWBgLJyxrPB24VAMf2yxnJCMLWDa',
    'WPZcGmopW7VdP2/cNSoOWPjVW59Qsq0enmkNC8ozaGNdG8kpW4xcVSkRW5NdImogqcRcTG',
    'W5fZW7u',
    'eCkVW7BcIrK',
    'qK9nugG',
    'bxNdVmombqNdM8oXnbG',
    'CMvTB3zL',
    'WOqMWRNdJqm',
    'W6i/phrG',
    'fSkfW67dV8knWQK',
    'W5RcSvtcH8oRu3OLWOBcIL4lW5W0',
    'W4RcImowW6RcGr0',
    'wmkbgW',
    'W6BcSt0AW4VdO249WQPQW5OsWQ4',
    'z2v0ug9PBNq',
    'WO7dMSk2n8o6mG',
    'WOVdVmkqW5/dNmozWPFdGSk+W7OXW4X/',
    'WPemWRW',
    'tevbvKu',
    'wSkBgLpcTa',
    'qMv6AwvYsgvSCgvY',
    'y29Kzq',
    'W4hdKGJdRfDIWR4Y',
    'WPxdLCkrpSoZkCksha',
    'W7y6pwf6',
    'W4H7W6L/W7JdPa',
    'C1D3uhO',
    'i8khW4H8vmkqemkHx8kBW4y',
    's3ndDuDYB1femtfrqJyXsdf2B2noAgjlrg1T',
    'r8kWWRldVSkaWQXhC8k5WO7cSmkUu8oC',
    'lHldQrWz',
    'D0rfweO',
    'C3bHy2vlzxK',
    'W6G+ohj3WRhdNmo4D8kZcsu',
    'W4ddJCoDaW',
    'y2XVBMu',
    'WR59bSoICSoaWOvI',
    'WPyUcSoUW6ldKSoO',
    'W5uQWOjcW7JcSq',
    'aCo1WRvF',
    'ywrKtM9KzufMDgvY',
    'WQeYfmkvxSoRWPq/EG',
    'WPpdOCkqW5xdV8oEWOZdMa',
    'oXpdQrWFW5W',
    'p0ldSmooiGJdLW',
    'EmoUW4VdH8kkpg41W6dcSmoA',
    'WORdVmkD',
    'DgLSzufKzfnPEMu',
    'W5f/W6L/W7JdK8ksBuNcQs8',
    'WPldR8kj',
    'W5SaAa',
    'Bw92zvK',
    'WO1JaSo3ymokWR9UWQddQcpcJs4',
    'b8kjW7pdUmkp',
    'nwpcNHrDW5pcKh/cR3FcVW',
    'DgfYz2v0uMvUzgvY',
    'W7NdUsu6W4JdP3O',
    'jrFdTaeeW4BcPwzyx38',
    'khhcRHzFW47cSf7cPhy',
    'qCoAWPiKzSk5pSkbzmkk',
    'fNyIWOm',
    'WQ/dOCkyW5/dM8oAWORdTCkLW4SWW5C',
    'W51+W78',
    'eg7cQSoIWOD1W5e+rSkFgG',
    'DgvTCfrVt3v0zxjpzG',
    'f8o/bv85W5Xws8kkW5tdQW',
    'B25eCMfN',
    't1zsD2u',
    'CNvU',
    'WOL0e8ouCCojWPH9WQVdGIdcJdG',
    'WOj4fmoI',
    'WONdNSkOnCo8mSkwhcTxWQHrcSk5sM0',
    'lKOr',
    'DgvTCe5Vzgu',
    'W51PW6HXW7RdVG',
    'o0ldVq',
    'C2nHBgvz',
    'zgL2AwrLugfYzw50',
    'W7NcGmoSWPCnWPa',
    'WOy5bSoOW6pdKSo+W4tdRCof',
    'WONdIr7dQG',
    'WOT1dSoIE8oD',
    'CfvSy2m',
    'B1vJBhm',
    'DCkmeYG9WOZdVN11W4FcSuSxWP8SWQTkWQ3dVa',
    'tuL6ELG',
    'qSorWPKLeCoPlmkhsCk9W553',
    'h8oYWQXncvVcU8oWW5zj',
    'emkJW7hcIbhdS8omDCkgW4i',
    'vCkLWQldLSkAWQDYymkaWONcImkK',
    'emoYWQ9glL0',
    'x193B3jSza',
    'C3r5Bgu',
    'WPuLeCoFW4hdNSo4',
    'WQWRamoUW4NdI8o1',
    'i2pcPCo1WOr2W6S8',
    'ofWAWRiDW7W',
    'kNNcUqy',
    'quPWBue',
    'WPBdJHBdQapdVdtcLSo7',
    'murpW4y2WQq',
    'hrlcLmkVW53cICoAWOpdRvxcMCo7rG',
    'WQ8KjCk6vmocWPC+',
    'suxcGa',
    'W4BcJSoSWOqqWOfzCq',
    'hmkoW4DHrCkS',
    'W6u8fhPKWPe',
    'WPldR8kjW7FdV8oS',
    'W4FdStFdJfi',
    'y2fUy2vSsg92zxi',
    'ychcT8oBWO7cMqCZ',
    'AxndBg9Zzu5Vzgu',
    'n2pdS8oQbW',
    'zwrPDfnPEMu',
    'refuqq',
    'BSkKkvRcN8kvW5BcVCk2WRZcKha',
    'WQddKCkCW5tdNCoyWP3dSSk2W4K3W41wcSkgW4ZcQCkHqa',
    'WPDXqZXTb37dVbG+WOygWO4',
    'FsVcV8oBWQNcJby2nuhdKL5T',
    'CfjIrwC',
    'WP4rWR7dIthdJ3jwiCoi',
    'W4dcGmoQWOibWPW',
    'C3rYB2TLv2LKDgG',
    'AWJcN8oWWPmf',
    'zw1WDhLeyxrH',
    'our/W5OJWRZdV1pcHCoKW54',
    'E3H9',
    'WPBdNSkYnCoZ',
    'WQbjW6P7WPhdGW',
    'W5/dNXpdRuzSWR8IAKC/WOasgeCaW69c',
    'qKvgt1jf',
    'iGZdICkXW6j7sKnL',
    'zgvZDhjVEu90AgvYug9PBNrZ',
    'dh/cTr9oW7lcM13cShBcQa',
    'Cgf0Aa',
    'DCk8jLpcK8k+W5u',
    'Axndyw5JzwW',
    'WR/cRCoy',
    'qSkqo37cPG',
    'zgvZDhjVEwvK',
    'WQOUkCk5vCoqWPu/Ba',
    'W6VcVSo7WO0bWOTDtmomWQegtmki',
    'W6NdU8oDaSk1WQqMW7y9WP8',
    'jCoUqW',
    'W4umCG',
    'y8k7kvRcQCkZW4dcU8kUWPlcLMy5',
    'BmkBW44aEq',
    'AxnnDwX0AxbSzvnLBgvJDa',
    'y3jLyxrLsgfUzgXLCW',
    'WRLyWOud',
    'jHVdVGC5W5hcIMXAqq',
    'kvldOmowbq',
    'WQeYgCkuvSobWRyUC3dcQ0yssCkAW6XEkSkGW7pdNmkaCG',
    'WOpcKIdcPmokW5m2WPa',
    'WQHUW4PkWP8',
    'Bgv2zwW',
    'zNjHBwvjza',
    'BtZcTSoFWR7cNt49aLa',
    'W5VdLWddRuz9WRO5EwaK',
    'WOddGHBdUIpdLdlcLmoZfW',
    'zxzLBNrjzhm',
    'C2v0sgfUzgXLvhLWzq',
    'WPpdImkciSo6i8kWcH5xWQHCfSkHvgW5WQ/cU8oozq',
    'gHVdPqC',
    'fgRcSmotWOD4W7ueySk2',
    'W50vEfqyWOSJW4uxWRmMouK+w8kSfmoxwJ3dRa',
    'y2fUq3jLyxrLsw1Hz2vcAxrTyxa',
    'WOdcICo1W7JdMNC',
    'zgf0yvr5Cgu',
    'zhjHz0jVDw5KC1r5Cgu',
    'suFdISoOWQFdN8kvWPddRfZcL8oeEW',
    'WOldGWVdIH7dHJtcKSo4amkKW4WBW7bIwq',
    'z2v0rgLZDgfUy2u',
    'qmkLWQBdS8kvWQPY',
    'W4CdEKyjWPO',
    'Cgf0DgvYBLrHC2TLCG',
    'EeDnvKi',
    'qSkQW6/cImo1WQ9EW6NdUCoFW7a',
    'W5RcOKFcJSo9qq',
    'WRDyWP0apSoW',
    'WPacWQm',
    'WO/dI8kGmCoRiW',
    'hgdcPbziW5xcIr7cShlcRGSJW4HMxmo5W6ZcVG',
    'WO93e8oZzSoUWPnRWP7dOYBcHIK',
    'WOH7uJbqhh/dQW',
    'nvPvW5SuWRZdV3pcNG',
    'fmkoW7/dTCkqWO3dUqJcUa1cBSoZhq',
    'fMhcPCoJWO58',
    'FCo4W6NdJCkapq',
    'kg11W648',
    'WOrwWOCofmo4k8kkoSkNWPSty0u',
    'b8oZgv4WW5nHASklW5BdP2ShqSkYh8kmg3W',
    'mCkhW5r8rmkR',
    'smkpW4OlwCoVoCopCa',
    'zgLZywjSzwq',
    'D2jvwey',
    'WO91a8ofD8ooWPTQWPC',
    'bgydWQKkW6i0',
    'iSoYWRngpKVcU8ogW49EW4NdUq',
    'W6urgej5',
    'W5NdISoN',
    'qeBdLCo5WOK',
    'WPKgWQJdNdFdHuy',
    'C29LAui',
    'zgf0yq',
    'uNvU',
    'WOZdLsVdVbBdMZpcLCo5eCkSW48CW7HOqMm',
    'y2XLyxjmzxzLBhm',
    'qCkLWRRdUSkxWR1YDSkfWOFcKmkLw8oCaSoKoSk+',
    'xSkxcG',
    'DgLSzq',
    'W5pdMrxdO1vmWPuKEMaJ',
    'y29SDw1UCW',
    'DxbKyxrLugfPBNrZ',
    'xItcVColWQK',
    'wtmeaqFcImo6W6aCzvS',
    'WO/dOCkyW5/dMW',
    'bSo1hvqUW4Xh',
    'z2v0tgf5B3v0',
    'qSklW4y',
    'zwrPDgLUzW',
    'z2v0sw5UzxjuB3rHBa',
    'W59VW6LRW7ldOG',
    'BMvLzfjLBw92zuL0zw0',
    'C3vYzMfJzq',
    'w8kZWPxdVSkAWQPYFG',
    'C2vSzwn0s2vLCa',
    'W4/cSeBcGmo/wW',
    'saxcUmorWQuStW',
    'Cmk1W444smoMfmoztchcSGddJa',
    'Bg9HzeLK',
    'EZ7cT8oFWR7cNsmZeL0',
    'yeZcGSkOouu',
    'W5NcLmo0WPenWPHAzSo/WRiBrCkkgG',
    'W7hcTtS2W4JdTG',
    'DxbKyxrLsw1Hz2veCMfNqM91BMrZ',
    'WPfTvda',
    'ChvZAa',
    'x1FdMSoWWOa',
    'WO7cJYhcOmo6W5CpWP7cL0C',
    'qSkTiuNcUmk/W4O',
    'ASk8jeNcK8kGW57cRq',
    'E2H9',
    'gMlcPCoMWOC',
    'WP0CeCoFW4u',
    'tsZcQ8ou',
    'BMv4Da',
    'rJ3cUmoCWQG0uW',
    'mvnyW6e+WQ7dVW',
    'ysdcHSoqWQBcLXi2',
    'B3bHy2L0Eq',
    'CMf0Aw9y',
    'qSkLavtcUq',
    'vdviEunMBdiUrxDslIWXEs5fmdrgzdfbBwyWu3zKBtrmyuGQDsX1wwPWsZeUrxDtttLjmuXHsdeUrtbecKXHshLdzMWYlKv3uI5fCZr0mvK0qJq0twSYou0SAxHmleyQv0CUws4SrdfdChuXtsX3zeWSrIPxr0H2CGPhnZrxsJfKDMeUyNa1sg1hsLHOAMziruDWDKDbC0rqDgz1wuLkm250ys5zlJLSu0zvstvju3DlvfbiBw4kC0flDIXeqwPOwgCUndC0qxmYrw5kmLHhoxLesuv2wefqsevgzNuUrZKXDeeXuvHSBJfAv1bSvKfKBZrmcMfiBuDkrLHQC0rcvg5qCg1ArgXxqxDiBMHiBw5ZquT2lerbAMHyzY40nZr2sLbYv2SYrM4Srgnju3DdCaPbmM5UueKZr3LezKeXuvHSBJfAv1bSvKfKBZrmyuHtDLvTAgXUshjuCgKUrZeYmfGXEJDQsuHTBNnbs3yklerbAMHyzY4XAgLmyuHKANb2tKnMBgHnlee0DdriuuXKDxHWAZeWBdLgowXfrI5jwLHwBMSXmhzbAvzbcJfbu1DkueLnmwXRtfP6nw55rMjQuez4BwHTwM5ZttDulhCQwfbSmu1RmuDdqxzzBNn2lgXqrKX1wKzjBaPfrM52wMXTDtrPsefUugPxmxKQANnOmefUsg5nwKqUBLvZEhzts3nbotjqBdLjsM1OlKrjExu3qLOXvxyklezcqMr1Bg1ABc5bCeLcALnOqvHtuenQzLe3CcX3z01ADxfQEuSQqxbSwNzUDKDSEtjKAKvVkMXMmwTxcKfOsfDKDI5Qqu0Qwdfjng1ODufbruLIBLvTkKnfBeTnvwW1vYXgBxvhm1nbA3DNqJuZD0e5swDjlgLODaPjuujxCfLwBgzSDfDvuuv1C0TjDgzguw5ADwPhu2GZDhbeowXfsw5yowXUqNHpEeLtDwTxue81rIXzu24krvbjDwHglNbbtwHuCgKWrMrqywXZrfHjwJnHwef2yKzWtwrbzKH0vhbekKnWmtfSrwXfveL2BMXKDunncKPeuu1WAgrSC28QDMSYlKzZDujguZnorJLrD1HUueX1qwHKtxngrM1WDLPSotfoDuvqr0nAm2T2ovbZBaPtDLnWExnPy0DiAq',
    'W4RcRdFcGSo3W5WYWRS',
    'CmkOiuK',
    'x19IAw5KtgvHzMvY',
    'nSk4oq7dIGxdGCk5W6RcOKO',
    'tsJcQSolWRmVuW',
    'v09steq',
    'B3jPz2LUtgLZDa',
    'vSkVWOxdVmkvWQvY',
    'zgvJB3jHDgu',
    'y2HPBgrYzw4',
    'W6WYiuW',
    'WRv1ttTQoNBdRYSZ',
    'CeXirey',
    'CMvZDw1L',
    'W6m8lhT2WOC',
    'WRDBWPOweSoZl8ktnmk7',
    'W77dH8o2bCkw',
    'y2f0y2G',
    'W6q3mgfqWPVdGa',
    'WOXZsJPSfKVdPZqZWO84WOviW50',
    'zMLUzfbHDgHoB2rL',
    'W6CAWPbvW43cV0xdKW',
    'y2fUy2vSsgfUzgXL',
    'z2v0twLUtgv2zwW',
    'WQyGpmkE',
    'WQFdOZNdGsxdSb/cVSoznCke',
    'W4ZcPJRcGmoBW4K',
    'WQSUp8kvx8ogWO8vCgdcPW',
    'WR4GpCkoxW',
    'CMvTB3zLtgLZDgvUrxzLBNrZ',
    'qmkDcei',
    'sCkJW6/cN8oyWR8',
    'yuHHBMrSzuXPBMu',
    'x19Jyw5szwXVywrqyxrO',
    'nCkYlWZdQYFdMSk2',
    'aCkhW7BdO8kE',
    'WOT1dSoIFCobWPa',
    'puSrWQm',
    'r8kVW6JcNmo/WQvs',
    'd0nDW502WQ/dRLpcHCoKW54',
    'wYlcRmorWQu',
    'qmkxWP7dS8kF',
    'WPFdR8kcW7NdGmojWP3dGG',
    'lKxcQd1p',
    'yM94',
    'AMz1tLC',
    'n1pdTCoocrFdG8oD',
    'WPO5mmo7W43dMa',
    'WOZcMsa',
    'hLddLSo9cW',
    'W5pcIYlcHSob',
    'xIxcSmolWQq',
    'W40bDuedWPW',
    'C3bSAwnLtgLUzu5VzgvZ',
    'DMLLDW',
    'C2v0vhjHBNnMB3jT',
    'WPL4a8oIFa',
    'C2HYAw5R',
    'WORdVCkuW4pdRmoqWPBdLSk6W4K',
    'wtJcQSox',
    'bSodvmoLW4aYW6/cQwBdVmkzr8kkxtFcUutdPe/cPq',
    'EuHkExO',
    'WQu0pCkpu8ovWPC+',
    'BM93',
    'cM7dUSo2ccVdPCobyt1Vh8kbW4r/WOxdImk6sCkOWOpcPSoeW7b+kSkXW7G',
    'y29TBwfUzdOG',
    'b8oZcL05',
    'ywrKq2XPCevKAxrcB3G',
    'W43cSbhcGSouW5qOWPqmggS',
    'WOVdR8kdW5BdISol',
    'WP4gWRxdNcddMa',
    'yMXLBMrnB2rL',
    'pfjkW4O9WRK',
    'BYRcT8o7WQtcNd09aLddP1TJf8ostuOAWPW',
    'WOSkWQJdGsFdHLO',
    'W5RdMXldG1DmWRy',
    'DxbKyxrLugf0Aa',
    'WPn9qsi',
    'W4BcHmo1WOOsWO0',
    'BgfZDe5Vzgu',
    'WOPzW55AW6xdKCkk',
    'sYlcRmorWQuZFHeJWOS',
    'vCkLWQldK8krWR9YFSkjWOFcISkG',
    'WOhcKIpdSW',
    'W4SMeKff',
    'geJcVqfTW4RcQriB',
    'zYpcSSozWQ/cRbiGavddNW',
    'mKNdQ8otgGJdGCommqDGgSk+W4W',
    'z2v0sw1Hz2vqywLUDa',
    'rwrPDejVEa',
    'WRTnW6jPWRJdLaBcScVcSq',
    'pfWaWO8vW683ea/dKSkxn8kP',
    'E8kgdYe9WQZdPvz9W4RcLa',
    'W73cJmo5WOibWQvxCCooWRqmuG',
    'BM9KzurHDge',
    'W7/cSutcUSo8',
    'W4hcRwdcMCo8vgeY',
    'qhb4z3jVDY9PBwfNzs1SAwDODgvY',
    'ChjLC3m',
    'W4hcRtC',
    'z2v0tgLUzu5VzgvZ',
    'W5RdKXu',
    'WOqKmmkDx8oxWRi2FMpcPW',
    'y29UBMvJDe5Vzgu',
    'W4tcLmoRWO0',
    'AxncCMfUy2G',
    'Cgf0Ac1LzgL0B3iTAgfUzgXL',
    'amklW4b+rCka',
    'DCo4W6tdJSkrkKCsW6hcSCoXgSo0W71t',
    'u8kYWRNdQSkAWQ0',
    'wIJcTCoAWQi0tWWDWOfTW5Hg',
    'nSkmW4HMySk3dq',
    'brFdL8kY',
    'nCoJxSk8W40YW6NcJG',
    'WP4LfCo/W67dKSo0W4C',
    'W5tcLCowW7FcHqO',
    'tsZcRCoE',
    'WPhdJHRdOXi',
    'CM91BMq',
    'qcdcUmoyWQqusXO0WOT9',
    'y3jLyxrVCG',
    'o3xcQdHxW5VcMvtcG3ZcTXn7W5LNuCoDW6lcPCkrgq',
    'nx3cVrzF',
    'e8o1h3a6W4ThD8kRW5/dQMK',
    'uCkNW7tcNCoEWR8',
    'ASk8jeNcK8kGW57cSq',
    'W5P1W6LDW7ZdS8kv',
    'x3rHCMDLDe5Vzgu',
    'W43cSbZcHCozW5GLWQ4',
    'yMvMB3jLqwrKug9PBNq',
    'W4H7W6HZW7JdOG',
    'bvFcVqH7W7lcQrqzWPJcNq',
    'WQzsWP4jiCoY',
    'B25ezxn0CM95',
    'nKNdUmoE',
    'W74uWPrxW7ZcSNVdMv7dLW',
    'rmkRW6/cJmo1WR1sW7pdJW',
    'oL0qWO8mW6S9',
    'd1BcTr9BW4lcOri8WPlcKq',
    'urhcVCorWR3cRXWGcLe',
    'omoKu8k1W60HW7JcGq',
    'i8kjW4H8vmkrgmkSsmkB',
    'q8kDdeRcVvi',
    'oXVdSG',
    'CNLdwgC',
    'kmk4jWZdJdldPSk2W6lcR0ei',
    'WP/cMcpcQmo9W4yNWOpcUKXsWRNcP8oGhCkUsCoRW6W',
    'y2HHBMDPBMC',
    'ohxcRWviW5xcHW',
    'x190ywC',
    'WQ0mWRldHJhdJ018m8oivCoB',
    'WRjLBIeKW4tcGmofCmkRjtldTG',
    'q03dP8o5WPBdHmkFWRZdUG',
    'qKvgt1jfx0niqu5hrq',
    'ENf5tNm',
    'b8khW67dVSk+WQJdVHJcHbOaACo1d8kiWO1QmJPLdW0',
    'p0vvW4G4WQq',
    'hCo9cLy5W6TqzmklW4pdQgm2r8khhSkeeG',
    'AxnnAxjYB3jiyw5KBgvlzxK',
    'fmknW5vBtCk5eSkOBmkrW5L/q2xcHHJcVN3cM8oseW',
    'WQCNn8kK',
    'vuxcJCkJlG',
    'rCkmdNlcQmkv',
    'B2jQzwn0',
    'BaBcSSoqWQ7cLby',
    'AxnczwDPBK5Vzgu',
    'BLnOsuK',
    'W6BcSt0xW4/dSx05WPrOW5ySWRvznIC',
    'dmoRWQS',
    'qmkLWQddUSkgWRPYx8kIWOlcMW',
    'lCocWRzjm0hcVmo3',
    'W74hWODEW6RcOfRdHfFcNmk3W7VdL8kFedtdLCkuWQVcOW',
    'iLjrW4aNWQ8',
    'WOX6rZLRf37dVq',
    'tSkOW4lcISorWQXYW7pdNW',
    'rclcR8oA',
    'x19SB2nHBa',
    'WQrjW6j6WPZdHq',
    'W688pxbwWPxdJmoW',
    'h2RcPCoNWODR',
    'aNjTW7OuWPNdJG',
    'WO11vXXQfNy',
    'fCo4WQ5Si13cVCoIW5DyW4i',
    'CMvNAxn0zxjuAgvTzq',
    'bwzcyJFcU8oCW5yBAa',
    'kGVdObuoW4y',
    'WPKcWQ/dIq',
    'WPGUomkvtSoTWP43B2hcSa',
    'W4LQW795W6NdTCkWyLVcSIf1',
    'W5VdHCoa',
    'WO7dLmk0e8o3l8kFhaLtWRi',
    'q3fWwuu',
    'vCk/W7BcNq',
    'WPGqWRG',
    'ChjVDg90ExbL',
    'W7GqWPvzW6pcO2ldN17dHSk9',
    'qNDty2u',
    'W4hcPZRcK8oXW5i+',
    'r8kVW6RcLa',
    'sw1Hz2u',
    'WQHjW6HYWOBdKbpcSWlcPSk9WRXTmK/dSq',
    'W7aZtheF',
    'W6dcJatcQq',
    'WOlcOSoDWQCCWQLb',
    'd1BcTr9mW4pcPGiBWO8',
    'k0tcPCoRWQW',
    'W7iNihL3',
    'W5BdLq/dRW',
    'W4xdH8ozgmk1WOu0W6G2WP4xiW',
    'wIJcTCoAWQi0tWWBWO9NW5LzW6hdKmktWPRcHG',
    'qKvgt1jfx0vora',
    'W6dcPIyMW4JdPG',
    'zwrPDg9Y',
    'CM90yxrLqxjVDw5K',
    'vdyEjJFcK8oVW6K',
    'uhjWtge',
    'twf0CML4',
    'E3DPzhrOFq',
    'BM9YBwfS',
    'wvpdH8o9WPhdLCkOWRFdQKBcNSoF',
    'WQLJcmoJza',
    'EePetvy',
    'CgfYywXSzwW',
    'BxvSDgLuB3vJAa',
    'z2v0rw5KtM9Kzq',
    'WO/cGmoTW7NdIgy',
    'W5f1W61XW7pdTW',
    'W5hdGComnSk1WQ07W5exWOmFiG',
    'W5BcKSoOW6dcIW7dGq',
    'yMXVyG',
    'Bs/cVCoiWQVcIW',
    'cCouqmk/W5SSW6G',
    'lSkTlWJdMYpdVCkJW7xcP0G',
    'WRPfW65Q',
    'W4pdOmo3omk2',
    'ufRcGmkSlLr7gmkTlZBcJq',
    'W6VcVSo2WOOtWR9zBCodWRC',
    'Bwf4',
    'n1jiW7G+WRJdTNNcUSoVW5iWeW',
    'BwvYz2vfzgL0qM94q29UzMLN',
    'Aw5Uzxi',
    'vCkPW7lcMCoC',
    'nLyqWQm',
    'C2nYB2XSwujVDw5KCW',
    'EmoWW6NdJmkacM8sW7VcLSoqdq',
    'fSkcW74',
    'WPz3vJPYh0m',
    'jCkdW6NdUCkoWR7dTaK',
    'AgLKzujVDw5KCW',
    'W4BdHComhmkvWQ47W4S2WP4',
    'j8kbW413zCk8hmk5qmkm',
    'y2vUDgvY',
    'wfhdGSoYWPBdLSkcWQhdRHZcLmoaDum/swJdHmkVW67cIa',
    'W5ZcJ8ohW4BcMb3dHCk/WOy',
    'pmkFW6dcHHpdISoOAmkxW5pcHmkdrSkEdq',
    'ueHJtgHmsNKXvJDmufjJnxzisNLouLbmrtL2BfrRuZG',
    'WPVdOCkJW57dM8oEWOZdLq',
    'uMPSsNK',
    'q8kfW589DCoQ',
    'CgfPBNrbDhrYtMfTzq',
    'xCoFW7JdV8kN',
    'tSkOW4pcLSoeWQ5f',
    'C2nHBgvy',
    'fMlcRCo1',
    'bSoQxSk+W50jW6hcGwBdIW',
    'W5NcJSo8WOa',
    'ASoKW7u',
    'W7VcK8oC',
    'a8kjW5v6zCk8hmk5qmkmWPPTu3FcJa7cI0pcGCozc8kIWOen',
    'WQ3cRmoi',
    'Dhq0nuuYx3LVsePyAdjFmgLsueXfoxzSvgTtoa',
    'WOBdIHBdVJldKsNcH8o5eq',
    'WQzsWPqpjmoJi8kveSkNWPe7ChddQCokDCoaW4q',
    'WPFdGW/dOHBdLIu',
    'ru5e',
    'WOVdIrVdQZpdLdtcKG',
    'WRJcQCoEW5ddQLC',
    'WR8OnCkpuG',
    'W6GGfhPKWPhdTCo+z8ku',
    'W7ldHComfCkyWQ8+W488WP4',
    'Cg9W',
    'WOtcJGFcTmo8W4qNWR/cNezz',
    'x19JB21WDxrLugfPBNq',
    'a1tcVWO',
    'WONcNddcOa',
    'WR4OiSkswmojWP4',
    'ChjVEhLAB29T',
    'AgfZvgHLBwu',
    'hmkgW74',
    'ru3dH8o5WP3dV8kl',
    'kvBdQ8oFaqm',
    'imkRW6pdRSk3',
    'WP4VeCo9W4xdTmo+W4ZdOCoqWRhcVmk6qSo5CCktW7HaeCkmW6Kt',
    'WQbwWOebmSoJ',
    'mx/cUbq',
    'yxv0B0nSB3nL',
    'swXUwgq',
    'l3xcQcviW5VcKelcPNZcQa4',
    'cSkZW4dcIXldRmo9qSkzW4pcHa',
    'AgL0',
    'ACkMlfJcVSkXW4BcTq',
    'pv5sW6m0WRZdV3e',
    'hCoZWOPhi0dcVCoMW4T/W4JdUMm',
    'Dw5SB2fK',
    'pfjkW4O9',
    'mKv/W7Kb',
    'A8kMkvNcV8k0W5VcOmkaWPhcHW',
    'WOTXqtfCfNZdPYi',
    'WOJcMs3cTCoHW4a',
    'W4pcKq8CW7tdH1yvWRvDW7y',
    'W64qWPveW6VcQuZdUu7dMSkWW6ZdOCkFcZ/dVSkc',
    'nx3cVrzFW67cJfdcRMdcVaX8W4bwwSoIW68',
    'yMXHy2S',
    'zgvZDgLUyxrPB24TB3v0',
    'qCkLWRRdUSkxWR1YDG',
    'mKpdSmoDcbm',
    'tgvHzKHLBhbLCG',
    'y2HLy2TbBMrtzwXLy3q',
    'EcFcTSoj',
    'aCkhW5vZvmkXgSkJ',
    'WR3cKI3cR8o6W7ONWP3cG0Do',
    'tYtcTCot',
    'Bg9HzgvK',
    'C2HPzNrlzxK',
    'WORcMddcG8oRW5qTWOpcLMXtWRJcSa',
    'W4tdGColhCkQWQ8',
    'WQ/cPmojW5BdVw/cSCoNW4zvWPS',
    'W5H/W6HSW6/dV8ke',
    'a8kuW7VdUmkiWQRdUb7cHG',
    'WQ0RWRJdPc3dPNvaDmo7dmoJWPLyW7DwwX4DBCkpzSkNtmkgg8koW6qNW7ajWPa',
    'D2fYBG',
    'uSkYW7tcL8oBWQ4',
    'cv7cTrTkW4FcUGeBWOK',
    'W5GLuSkNjmkzW4DfWPVdTtFcVtG',
    'ENxcLSkOnfvDbq',
    'BwLUu2L6zq',
    'kq3dTrOmW5O',
    'BYxcPmoTWOW',
    'h8knW491vmkW',
    'pSk5iH3dGdq',
    'W7H7W695W5xdTCkrC0RcSG',
    'WQ/cUSojW5BdU0BcMCo+W4DC',
    'CCkgcqiXWPZdVLL1W4dcLG',
    'jL5zW5G',
    'DMfSDwu',
    'CmkrgcmmWP3dQ1zOW4xcNfWD',
    'mmoIcLyzW4LhA8kr',
    'AxnfBMrqB2LUDe5Vzgu',
    'vCk0W6FcLSodWQ1yW6/dLG',
    'W4RcMCoiW6dcIqZdGCkVWQ3cHmkyFqfmW4tcKW',
    'W4G+ohj3WRNdMCo/ySkwaY8',
    'AxnbCNjHEq',
    'WOP0fmoIzSoaWO4',
    'DgfYz2v0v29YBgrcB3vUzhm',
    'BwLU',
    'kmk0lWZdOIFdNmkWW6xcPq',
    'WQ1iW68',
    'hCoJkKmUW55B',
    'zNjLzq',
    'aSkiW6lcIrNdS8o9qmkFW4NcHa',
    'C2v0ugf0DgvYBLrYyw5ZzM9YBq',
    'uMrLuuK',
    'C8kofdi',
    'gCkjW77dS8k/WQ3dOW0',
    'FSkgfceWWPS',
    'W7GkDvSyWQypW4qgWReX',
    'm1jvW4m',
    'W5lcQIdcJSorW5eJ',
    'W4FcLmoQWOmfWOTt',
    'W5T/W69zW7VdPmkyCwhcRYXO',
    'm8k4iG7dHZi',
    'bmoXh1KzW5TlCCkkW4i',
    'yxr0CK5HBwu',
    'gSo0WR5nbudcImoGW41sW4JdO0JcM1q',
    'uCkOWRFdSCktWQXzFCkPWOpcSmkGwSoC',
    'sCkxeKlcQfSOfLmW',
    'W4xcPZC',
    'bSo8WQHpl1RcM8oMW5DFW4ldVW',
    'l1yNWRikW6C+eG',
    'W6JcPWyXW4ZdP2OS',
    'WPFdKSkGnmoZi8kJfXjyWQG',
    'W4ZcJmoaW6tcNH3dTmkQWPFcG8kYDYLa',
    'WO3dK8kTjmo6',
    'vCkNW7tcN8ovWR8',
    'tcdcSmol',
    'CSoYW6BdJCkmka',
    'WO/dICkO',
    'WPZdKSkQnmoqkmkw',
    'WO7cKIRcTCoRW5W2WRpcNfDsWRJcPG',
    'ru3dJCo5WPFdTCkjWRRdT3dcNSov',
    'W57dGCozemk1WRGH',
    'lKFdQ8oDbrm',
    'WOL9sJbTmhtdOcO/WOq',
    'wSkPWRldUSk7WQDwCCk5WO/cKCkVCSoxka',
    'W5hcSZFcHSohW5GwWRSkeNPb',
    'sLhdJmoXWQC',
    'W4ZcMX8w',
    'W7qJpxrMWPe',
    'Be1rzLq',
    'W6uBWRzFW7dcQehdK0JdTSk6W6NdNW',
    'a8kAW451uSk9bSk+E8kxW5LQra',
    'CgHVDg8',
    'jfzm',
    'r8klW40qsmoRma',
    'CgL4zwXty2fSzq',
    'l0SvWQGlW6G/bZldMSkqpG',
    'WQ0cWRldHJhdO1jyiSoi',
    'z2v0sxrLBq',
    'gSo/d1qyW55wza',
    'zZ3cKSomWRJcMqO',
    'z2v0vgHLBwu',
    'WO19dSoMr8ogWO1Q',
    'rhjHz0jVDw5KC0HLBhbLCG',
    'lNxcVWu',
    'WR/cQ8oEW5JdO0/cL8o+W41FWOfbwJCgB8k2xSo3',
    'ENxcICkOkfzDnCkMlJBcHmoNf8k8s3JcPCo8',
    'gSkdW6JdSCkEWOxdUqlcJHPRB8o5hCkLWPb3lJHKhWfs',
    'Dw5KzwzPBMvK',
    'revtvfjpwq',
    'Cmo5W6ZdPCkkk246W6NcOmoAbW',
    'hLxcQa5QW4m',
    'z2v0ugf0DgvYBKzPEfnJywXL',
    'nuJdHG',
    'WP3cNdBcPmoGW4y',
    'WQeSmmkCx8oGWP8YA0BcRu4',
    'eCo0aKuiW55qySkaW4q',
    'DxjS',
    'WP4mWRFdNsJdHeW',
    'a8kjW5vMrCkQg8kesW',
    'W7ycogj7',
    'WRNcUmoiW5BdU0y',
    'Bw92zq',
    'muvtW5O/WQ4',
    'B25qB2LUDgvYrg93BG',
    'uMvZB3vYy2u',
    'WPxdNCkIi8o6mG',
    'W79kW6PsW7K',
    'qtmdoG',
    'B3jPz2LU',
    'e8ovWRTglKlcRa',
    'B25eCMfNu3rHCNq',
    'kupdTCoFaXpdP8ozpG9afG',
    'WO4gWRFdJsBdNLPDc8ocx8okWRO',
    'xNBdL8oqWPa',
    'FCkEh1pcULeufa',
    'W7hcR8oC',
    'WP3dNSkWa8o3j8kxfWXKWRLxoSkLsfSLWRJcLCokEa',
    'WRjEWP8k',
    'emkeW458rq',
    'ACkSmeK',
    'W74AWPzZW7hcR1NdKKJdL8k7',
    'WPjfrsj3',
    'W5FcNCojW6a',
    'WPP5aSo7Cq',
    'W6CAWPbvW5FcQvhdKW',
    'Dw50yxi',
    'vmkPWRRdSW',
    'tfNcQ8kVmfrBaW',
    'W7tcOIFcJ8o2W5KVWQ4mdG',
    'x8kHWQ7dHW',
    'W4xdGCoueCkZWR4AW543WOGxiG',
    'CMvWzwf0',
    'eh3cOCoGWPz8W5q+vmkF',
    'amoYWQ5jpKS',
    'dCkLW6BcGZ7dSmo2ySktW4tcLq',
    'Aw1Hz2vfzgL0qM94q29UzMLN',
    'W5j1W6W',
    'tgf5B3v0rxzLBNq',
    'tCkJW6JcN8oeWQm',
    'y2XPCa',
    'fGZdLW',
    'WP5WfCoZESoB',
    'WP3cLdZcPmoIW6aJWOxcMK0',
    'vmoRW63dHCkr',
    'W5yRg0DE',
    'x8kHWQ7dMCkKWPO',
    'W4X7W6L9W7pdPa',
    'W4hcKCo8WOqqWO0',
    'WQPfW6DX',
    'p1LJ',
    'y8k7kvRcUmk/W4FcUSkMWO0',
    'tuFdH8ovWOJdKCkkWRBdHLBcMmozxLGy',
    'W6FcKXKwW6C',
    'WRRdOSkDW5JdN8omWP0',
    'z2v0qMvNAw5oB2rL',
    'z2v0q2vUDgvY',
    'Cg9ZDe1LC3nHz2u',
    'W6OGwNO+WQS1W7SZWPGgpM8',
    'xCkUWPRdSmkvWQ0',
    'weVdHSoY',
    'h8o4WQHpl0RcISoSW5DDW47dQG',
    'AeVcKmk/m0K',
    'pSoUxSk3W4e0',
    'zvRcNmkQkf5pwmkGjtBcMSoshmkQ',
    'bHRdKSkQW5Dqxq',
    'tevbrKvsx0niqu5hrq',
    'x2fJDgL2zq',
    'wSkVWQddUSkgWPPJA8kHWOm',
    'WRGZpSkpvCorWOiREG',
    'WRldISkmf8oQ',
    'W7OAWO9EW60',
    'BwLYCM9Y',
    'W6y2lvX/WPxdN8o0u8kqdZpdLq',
    'B25qB2LUDgvYtgvHDMvbCha',
    'W43cSbdcKSobW4SJWPqmggS',
    'ySo1W6hdJCkrbg4c',
    'm8k8oa',
    'hwdcQSoK',
    'W5xcK8ofW6hcOXW',
    'zgjUDLq',
    'WOJdNSkJoCoSmSkwcJjyWRjClmkfxMeHWQxcGG',
    'WP10c8oZD8oBWPjRWOddOYVcJs4',
    'WOpcNcNcPa',
    'Bwv0yuTLEq',
    'AgvPz2H0',
    'dmkSW6FcQXtdRmoS',
    'z2v0va',
    'AxniB2XKs2v5CW',
    'a27cSmoPWQD9W7aLx8ki',
    'WOddIXBdUG',
    'z2v0ug9PBNreyxrH',
    'W6JcUsG0W4pdLNS5WPr4W5utWQHDddWfWRe',
    'DxnLCKnVBMzPzW',
    'ywXSB3DtzwXLy3q',
    'sCkxge7cSLSThe4',
    'bSo/hL84',
    'W7ZcMSocW6dcIqW',
    'W4JcR1RcHSoQ',
    'W50vEfqyWOSJW4uxWRmM',
    'CSkTcuJcRLic',
    'WQKLnq',
    'hSo8WQLCbehcRCoM',
    'zNvUy3rPB24',
    'WQ/cQCopW5/dQNxcVCo0W5rjWODuBq',
    'yCkmdYO8WRVdUfL1W5dcLuecWPS',
    'y29UBMvJDevUzejLz2LUtM9Kzq',
    'k0WhWQ4',
    'W6NcSsa0W47dTG',
    'W6GGexP+WPddS8o0ESkc',
    'sKtcQmkOo0DD',
    'WPNdK8kLpSo4l8kDhW',
    'q2XPCevKAxrVCKLTywDL',
    'Es1SAw5LCW',
    'bSo8WQHpl1O',
    'W4ueza',
    'WQxcPConW5ddQNFcPSoWW41kWO5jAZiZBSk+vW',
    'mSoQq8kX',
    'r8k5mfRcImk/W4xdU8kRWPpcNM87WQVdSSoCgmk5aSo3nW',
    'BM8TCMvWzwf0',
    'WP5We8o+uColWP57WQhdVG',
    'W57dGCore8k4WR4',
    'WQbnW7jYWOhdHq',
    'WPVdN8kG',
    'ku3dVmon',
    'W4BdKW3dR2znWRi/CxC',
    'BgvMDa',
    'W7lcTYG/W4pdMG',
    'W4VcRqBcL8oxW5WYWR8',
    'C2v0tM9KzurHDge',
    'wIJcRCo3WQaUtGq2WRPWW41q',
    'iLHjW4e1',
    'y2XPCfnPEMu',
    'irpdPXqoW6dcLMLrqhXnWO7cKqegaIS',
    'x19Yzw5KzxjtAgfWzq',
    'W6/cTsq2',
    'D8kngIO9WRZdPfLRW6tcKL4',
    'W7KbWODcW60',
    'l0SvWQGlW6G/bZlcNCkmpmkZbCo1juXiWQbiW6pcRa',
    'n1WAWQemW6y',
    'W6xdNSoAh8k1',
    'rgf0yuHLBhbLCG',
    'xSkrdeJcSfi+',
    'WOCLf8o7W4W',
    'e0JdT8oFeIldI8orjarE',
    'WQZdMSkWW6pdUW',
    'DgfN',
    'W5fiB1yEWOegW4q',
    'WQmRf8oYW67dKSo0W4C',
    'W5JdHCoveq',
    'W4pdLmoCfCkKWQ8',
    'Bg9HzeLTywDL',
    'W6y2lvH7WPddNmo9zSkHcttdJZm',
    'WP10e8oFECooWPbQWP7dRsBcHIK',
    'W5hdIatdQ1DmWOSKD2SK',
    'W4pcPIFcPmoFW5WRWQOXgwbwudqJW5WWWQaT',
    'zYpcSSozWQ/cVrC7eNFdHeO',
    'zg9Uzq',
    'tgvHzKXPC3q',
    'W5hcUYa9W5ldIMW0WOPUW4e',
    'bb/dVXWEW4dcOx5Axw4',
    'WQ5jW61YWOBdLa',
    'zhjnteS',
    'f3mIWPy/',
    'q29UDgvUDc1mzw5NDgG',
    'ug9SEwDVBG',
    'yNjLywToB2rL',
    'WOpdKXpdOJ7dMchcLmoZmmkPW70qW7z7',
    'a1tcGW',
    'eb3dMSkYW7bWq3T+sSk9WPS',
    'W7WCWOnh',
    'W7KwWODCW7W',
    'W44mCLe5WQC',
    'caFdIq',
    'Dgzku1O',
    'fmkuW7/dT8kpWQNdHW3cNXXlECo+pCkgWOXK',
    'W6ldLGddVKvgWQKM',
    'BLzYrwu',
    'buNcIb1/W4JcUWarWO/cHdZdSCkRW6xcKLu',
    'tgvHzMvYsw1Hz2u',
    'CmkGleNcKG',
    'oSoUqCk1W4uZW57cGw/dICkS',
    'W5VcK8oqW60',
    'W6eiFvijWQidW48EWQaMdW',
    'rtmfnqhcJSoBW6muzq',
    'CMvZDg9YzujSzw5Ktw9Kzq',
    'zwrPDfrHCMDLDerYywDcB3vUzhnuExbL',
    'zMLSDgvYCW',
    'Cg9PBNq',
    'g8o+o141W5fwymkxW73dOxOH',
    'W5WxFvSFWOGfW5OBW7OXgfu7wCkC',
    'hCkjW4X3',
    'm1WDWQeqW7O',
    'FSkcdHu7WP3dPvr3W4BcGq',
    'WPOgWQ/dQspdNLPlc8ocx8ok',
    'g2RcRCoMWOPT',
    'EJZcSSoqWRNcNHWGcXxdH1nXhCoLxa',
    'yxr0CG',
    'C8kOoLRcN8kKW7ZcU8kMWPS',
    'wceYpadcTmo6W6Gv',
    'gSkBW6bGuSk5da',
    'm1xdMSowdXtdISo2pW9j',
    'WQ3cRmoiW7NdOeFcSCotW4zFWODuFa',
    'WQPdW7L+WPhdPbFcSI/cT8k5',
    'W5RdGCowe8kKWQi',
    'qSkpW4W+wConmSoezcFcSq',
    'f8o/buu5W5fwv8kaW5hdOLq',
    'uhjVCgvYDhLfDMvUDa',
    'ou7dVmozcYBdGCoCaW5afSkZW50',
    'W4tdMW3dV0y',
    'oSoKvSk0W6WKW6xcLepdGCkX',
    'WOH4cCoYqCoM',
    'tSktegtcRLShdviCW6hcGmkKy8onj8o0tXm9',
    'e8kuW7VdOCk3WQNdOqNcHW',
    'xIhcUSoqWR7cNqexefddHuy',
    'DgLSzuvKAxrVCG',
    'z2v0vgH1BwjtAxPL',
    'cLxcRGX7W7pcUaiFWONcJa',
    'C29Tzq',
    'WQ3cRSoyW5ldVwlcSmo1W7nwWOfiBq',
    'BSk6cLJcNCk5W5ZcMSkTWPRcMG',
    'B25mB2fK',
    'WOmPnCoGW4y',
    'dmkUW5pcIbtdSCoSACkeW6VcHmkYuCkpjb/cUa',
    'b8o7dKytW5L1ASkxW5ZdQG',
    'W7qGpgDrWPVdLSo3ASkw',
    'WOeVamoJW4pdKCo1W67dOCouWPhcTmkG',
    'WPBdGXpdQXtdGqhcGCoZaG',
    'AKrtA1O',
    'DxbKyxrLug9PBNrtDhLSzq',
    'DxbKyxrLu2nYB2XSqMfY',
    'qCkfW5O8EmoVkCol',
    'ywz0zxjbzgrqB2LUDa',
    'y2HHBMDLza',
    'W4GAWPnEW73cTq',
    'FmoYW77dJG',
    'BwnbrKG',
    'y29UDgvUDfjLywXz',
    'WPitWRRdIYZdNKy',
    'kmk5W77dPmkAWRS',
    'jrVdTbqoW7FcI2zzwN0',
    'iq3dHX0mW5JcGvTruMPHWO7cMtqDcaZdH3q',
    'we1oC0O',
    'CgL4zwXsyxrPBW',
    'z2v0v29YBgrqB2LUDa',
    'y2vPBa',
    'vCkIW7hcJSo0',
    'zCkbkvpcNSk8W5FcMmkRWPdcMG',
    'mXhdL8kNW7jqsW',
    'WOhcKIa',
    'twvfqKm',
    'W7qJpxrMWPhdUCo9B8k8bYNdKY5b',
    'W4JcPJ3cGmohW5u',
    'W4NcRcxcJSoDW5O',
    'zwXLBwvUDa',
    'ENLor2G',
    'peNdQ8o/aqtdHW',
    'W69FW5DDW57dHa',
    'hmkgW7f9sCk2aCkOxCkZW5T5uW',
    'zCk8lLVcN8kI',
    'tLLLqNq',
    'amo4WQXnof3cRmopW5bvW4ldG2lcKvuf',
    'W5BcImo2WOe',
    'WPFdKXhdOb7dMYC',
    'WP1YbSo6Cq',
    'irpdPXqo',
    'erVdJCk7W6DmqhLKwSk9',
    'zM9UDa',
    'zhjHD0LTywDL',
    'eMVcOa',
    'W4BcPLZcJSoWqq',
    'vmkmccG8WPW',
    'zM9Yy2vvCgrHDgu',
    'rSkzW78RtSoVja',
    'r8kpW5C+vmo6',
    'WQDsWOCKomoIkmkdka',
    'z2v0sw5UzxjqB2LUDa',
    'W5dcK8o5WOiMWODdCColWQa',
    'oXVdQHyiW4a',
    'zSo0W6ZdN8kn',
    'W4umBKCdWPW',
    'BM9Uzq',
    'DhjHBNnMB3jTlMXHEw91Da',
    'xSkLWRFdUCkrWRS',
    'sJ/cVmoEWRuLEGC6WOb9',
    'WPvSbbrSgNRdOG',
    'WQmMfSo9W4NdKW',
    'hgNcOSoE',
    'y2XPCevKAxrVCG',
    'aCoGd1aOW5PRAmkeW5FdQW',
    'w8klW4W+wCo6',
    'WOj+bSoYxCol',
    'WOm/emoY',
    'W6BcSt0AW4JdRgWQWRDKW4uz',
    'jrFdQa',
    'W4tcK8o3WPelWPXpB8ok',
    'hCo9cLy5',
    'pe/dT8oEjaldISoihWvj',
    'ovPDW4G0WP7dQhZcHmoZW50XfCoZAHemW7m',
    'gb/dRX0F',
    'zYdcSmosWR/cNbyH',
    'lbVdTqCzW5VcNq',
    'W4RcMCoiW6dcIqZdGCkVWQVcISksFcfaW7NcHSo9mq',
    'W6tcScaNW7ldO3S/WP9/W7CoWRTxgJWFWRnmWOu',
    'C2nHBgu',
    'B2zMC2v0',
    'ob/dSGCoW4BcILXEqhe',
    'WO1WcCodz8ok',
    'W5f1W619',
    'ubOwpadcLSoW',
    'B25dB250zw50',
    'rSkVWPxdSmkzWQr2FmkP',
    'C2LUz2XL',
    'WPldIq3dOHpdOtlcKSo4emkNW7mgW7q',
    'kfOvWQODW4G5dtRdLW',
    'CCkGo1tcMmk8W5C',
    'Axntyw1LtgLUzq',
    'mXhdKSkWW6fAv3f9w8k2WP0',
    'i8oLu8k1W48PW6lcHwu',
    'DCkSofhcM8kZW5C',
    'BMvLzenSB3nL',
    'B25TzxnZywDL',
    'D8kVW6pcJ8oaWQrfW6NdT8ozW6/dRxyZWRC',
    'a8kjW5v6zCk8hmk5qmkm',
    'AgLKzvrPBwvY',
    'rgTtC1q',
    'e8o1h2yZW41oyCk1W5/dP2iW',
    'DxbKyxrLsw1Hz2u',
    'DxbKyxrLsw1Hz2vbCM91BMq',
    'ySkrhcGRWONdPuP2W4RcNuK',
    'Aw1Hz2vdB25MAwC',
    'nvGzWQm',
    'yxbW',
    'scNcVCo+WRu',
    'WO0wWQJdGa',
    'f8kHW7hcGbJdQW',
    'Dg9Wq2HPBgrYzw4',
    'zhjHz0jVDw5KCW',
    'q2XPCevKAxrVCG',
    'DNvdrLq',
    'C3bSAwnL',
    'W6K8l3bGWQFdJmoOB8ku',
    'BCkVW7GwBSolaSoNtrJcKW',
    'yM90Dg9T',
    'DSkRWOxdRmkG',
    'W4NcICoxW60',
    'vmkYWRpdUSkGWRT2Fmk+WOdcKCkZwG',
    'bSoVWRTgouJcPSoXW5rSW4JdV2hcKq',
    'FJZcVmokWQxcJaOIaW',
    'WONdJ8k2p8o0iW',
    'W6tdGCoBaa',
    'r0rLq20',
    'nmo6q8kGW5e',
    'vmkMoWKkWQRdLwTpW6lcOxO',
    'WQ/cP8ocW5NdQKdcOmoFW4XDWO0',
    'Aw5UzxjfzgL0qM94',
    'tgLUzq',
    'hehcTmoVWOu',
    'WRNcUSoa',
    'DhjHBNnMB3jTlMjLzM9Yzv9ZDgfYDa',
    'emkdW67dKSksWR/dOW3cHqTlw8o/amkjWOS',
    'DMfSDwvZ',
    'WRHdW798WPG',
    'WO4lWQNdGsVdGq',
    'BSkUjLlcImk1W7tcVCkWWO3cIW',
    'agRcSmoiWO94W740ymkBaCkmWPu',
    'W6ZcOsuNW4/dSMuHWQPQW4ezWRre',
    'xI/cJmoNWOC',
    'WOD7utT6aa',
    'cSkZW4dcKG/dQCo9qSkzW4pcHa',
    'B8k3ogJcJNS',
    'Cgf1C2u',
    'x8klW4OXECoQnmoEBtW',
    'W53cMCoxW7hcMbFdNq',
    'WQqbd8owW7y',
    'WP1+aSo/vG',
    'W4VcMCosW6dcMaVdGCkhWORcHCkzvIjbW5lcLa',
    'WQD7utT6af7dUcK4WPC',
    'W7xcUWyMW5ldP3SxWPW',
    'iSofuSkrW40',
    'W5SgBLOaWOi4W4KcWR0Sja',
    'kfWaWPikW68+bJNdNmkmna',
    'awRcO8oOWPfTW7WJzmksdCkpWOq',
    'WPaIaSo0W4FdLmo+W4u',
    'WP3dLmkwW77dQa',
    'WQ7cP8oyW58',
    'u8kJW7xcJmoFWRLs',
    'tSocW6VdISklgNSFW67cOmoAjCoXW6Xi',
    'n8odvSk+W40SW6K',
    'afxcVqTxW4VcQqeB',
    'qKldJSo5',
    'bCkdW7NdOSkVWQtdPqpcNG9g',
    'CMLNAhq',
    'C3LgyNy',
    'nCk8jGW',
    'ySkcdYe9WPVdHfD/W4y',
    'tCkPW6FcNa',
    'W5VdGCoke8k1WQ4rW5a3WOOsia',
    'DxbKyxrLq29UzMLN',
    'fCo4WQ5+k0lcOmoNW7ruW5hdQa',
    'zw1PDev2zw50',
    'zg9sB3rHDgu',
    'W4hdKqtdVq',
    'W4hcRCoXWOacWRbynCokWQe6rSkichbHfY3dJtNdJmk3W67dOW',
    'scNcVCo2WQ8UtXOwWOPGW4L3W6VdPG',
    'WOVcIcJcRCohW58JWPBcLNfuWR3cSCokdG',
    'WPagWQNdJYddJNXwk8oluSoi',
    'W6CqWPrxW7ZcHvRdMfZdM8kY',
    'vgfZA0L0zw0',
    'W5BcPIxcGSobW44JWPCmggS',
    'wSkAW5O4smoRfmohyYNcSZxdNSkUWQLf',
    'z2v0u2HHzg93vhjHBNnMB3jT',
    'keNdRmouba',
    'wJNcOmotWQq',
    'BM9KzxnwAwv3',
    'WRTzWQW',
    'WR3dOCkeW5/dI8omWRddLCk/W547W5e',
    'AxnfBMroB2rL',
    'Dw5ZAwDU',
    'c1/cQc17W4hcOqGWWPlcJqO',
    'rSkJW7lcTmoFWQHwW7hdTSoFW77dOa',
    'ECo4W6hdJmknoW',
    'vhvnDKO',
    'CMv2zxjZzq',
    'C2nYB2XSvhLWzq',
    'C2nHBgvpzLDVCMXK',
    'EM9VBs1PBG',
    'CNvUAw5N',
    'jCoOrCk/W4uSW57cGxxdH8kMuG',
    'mxxcRHzFW57cVv7cRNxcSWq',
    'iLjmW4mWWQNdVW',
    'A2v5rxzLBNq',
    'W4ddHCouaCk1',
    'W7qHnq',
    'AxnbDxrVv2LKDgG',
    'W5ObEK8R',
    'a8oygLaU',
    'W4dcImo1WOaw',
    'sw1Hz2vnyw5Hz2vY',
    'Avn6y28',
    'W4ddLrxdQ1DaWRuS',
    'zw5KC01HCMDPBG',
    'pq7dOHiFW5e',
    'AxndBg9ZzvbHDgG',
    'WP4lWRRdHIldG1fE',
    'dbVdQHyFW5e',
    'C2L6zq',
    'umkiWRFdSCkqWQvY',
    'y3jLyxrLtw9Kzq',
    'WRXdW6jZWOa',
    'BgLZDgvUug9PBNrbzgq',
    'W6SzWPj7W7ZcVW',
    'C2LkB3C',
    'W4pcPKFcJSo9DNO5WO3cTfy',
    'AxniB2XKtxvSDgLWBgvtzwXLy3rlzxK',
    'W6JcUsG0W4pdH20XWO5jW5We',
    'eSo5b10pW4TBACka',
    'tCkJW7dcNCoCWRG',
    'Cg9PBNrZ',
    'WPiUbW',
    'C2vSzwn0zwroB2rLtgLZDa',
    'W5pdNGu',
    'y29UDgvUDfjLywXy',
    'DhjHBNnMB3jTlNDHDgnOlNjLCxvLC3q',
    'cSktW7NcHbi',
    'WQf1udrwfNFdVIKK',
    'W5hcUcGNW4ddRxS1',
    'W6lcUcaJW6pdPMaSWPv5',
    'AgfUzgXL',
    'n8kwW6ldSCkjWQpdOepcNqflFmoGbSkvWOSIat5TerXqWPG',
    'W48aAgidWPWgW4WMWRSQe08',
    'W4xcScdcJSouW5m',
    'zMLUza',
    'WOJdKXpdUH7dOs/cHSo1cW',
    'm1TzW44J',
    'WOZdLt7dVaxdLdK',
    'W7hcOtO7',
    'qu/cL8k5kf5b',
    'W7xcPIG9W5xdPgyQWPDFW5WtWRy',
    'jrhdSby',
    'B0VdISoWWOhdTCkBWRBdRuy',
    'yslcT8oOWQVcLay3',
    'fCo4WQ5/jvZcPCoNW6LuW47dO3K',
    'W4ZcJmoaW6tcNH3dRCkMWOlcJmkzscXmW5NcKW',
    'Ed8wnqhcT8o0W6irz0ZdVq',
    'aH3dJ8k3W6nA',
    'W4VcK8oqW6tcNH0',
    'WRlcOIJcOmo3W503WOu',
    'mN3cTSoUWPvvW7W3ra',
    'BsBcSSoqWQ3cNt09aLddPvnLfW',
    'WObnW7jYWOhdHslcOcVcRCkO',
    'B1L6y3m',
    'amkpW77dOSkt',
    'aH3dJ8k3W7Pr',
    'DMfRufi',
    'rvddOSoPWPhdN8kLWRBdQLxcMCoz',
    'paRcSKyUWOBcU3fqE1b6WPtdJGPzbbxdSKhcUCoqvCk9WQu8bxm',
    'W7pcTtOrW4e',
    'DMLZAwjSzq',
    'nwpcNX1vW4NcM3/cR3FcVW',
    'Dg9tDhjPBMC',
    'tu9wrq',
    'WPFdKSkQ',
    'CSkgdJiQWOddSW',
    'mtK4nZeXwuPMq2P4',
    'WPhdHW3dQrldGq',
    'C2vSzwn0zwroB2rLCW',
    'D8kOpfxcV8k0W5VcOmkTWOW',
    'z2v0tg9HzfvYBa',
    'WQlcP8oiW5i',
    'W6hcSddcHSodW5G',
    'WOZcJJFcQmoPW5W',
    'C2nYB2XSq29UzMLN',
    'n1WvWQaDW7W',
    'h8oYWQXnk0ZcPCoM',
    'l8k8la',
    'jmo8hLy1W5e',
    'W43cR1RcMSo9',
    'W5FcPJ/cGSoqW4KJWR4Te2PxEs8dW4S',
    'B25eCMfNrw5K',
    'zxjYB3i',
    'W7dcK8o5WOiHWP5tCCoB',
    'C2XPy2vszw5Kzxi',
    'W5xdHhpdUCk3WOqGWRNcHxHtWRG',
    'W57dJComamkXWQG+W5O',
    'W4BcRcBcICoxW44',
    'sxrqC2S',
    'quzurvjFu0vmrunu',
    'y3jLyxrLt2jQzwn0vvjm',
    'WP4VeCo9W4xdMCotW43dQSoeWP3cVW',
    'W5r/W7j/W7xdPa',
    'oSoUqCk1W4u',
    'fmoYWQHTk03cOq',
    'g8knW4H1smkS',
    'C3rVCerLzMf1Bhq',
    'W4FcTIFcS8oeW5i',
    'W7GAWPjrW63cOW',
    'WQ9eW6PZWPpdMaNcSq',
    'y3vYCMvUDe5Vzgu',
    'zw1PDa',
    'WO11vW',
    'fvfAW4OYWR4',
    'Cg5wEgi',
    'C2v0sw1Hz2vqywLUDa',
    'Bwf4rLbt',
    'WQfhWPChi8oYd8kkoSkUWPOACftdQSoHBSoAW5JdLh0',
    'vtSboWdcNW',
    'zI/cOmo2WQxcJHyG',
    'AgfZu2nYB2XSzxi',
    'WQbfrrzN',
    'u8kpW67cRCoP',
    'WPxdLCkinCo+mmkw',
    'W5tcK8osW6dcVGhdLmkU',
    'W5GxC1iEWOSzW5SIWR0UgeK',
    'zwrPDfrHCMDLDa',
    'axRcQSoVWOT3W74',
    'f2RcT8o1WPb2W6azuCkudmkoWOtcQW',
    'ovNcRJrBWOpdHNC',
    'AxndB21WBgv0zq',
    'WRSKpCkEwCorWP4/',
    'uCkUW6NcJmoF',
    'uxjXu2q',
    'qKZdH8o5WQhdKCkzWRi',
    'qKvgt1jfx1nuqvju',
    'q2TVv1K',
    'pLzrW4O',
    'W6GaWObwW7ZcTa',
    'geNdRmoubbq',
    'kwdcUbboW58',
    'x0BdL8oEWORdHCkdWRFdSa',
    'EM9VBuXHEwvY',
    'W4RcPKBcNCoQwMW',
    'hMdcSSoK',
    'qM91BMrZ',
    'FCktcK/cMvOpdvGN',
    'WOJdNSkPp8oPiW',
    'f8knW4D7tSk9pSkOvG',
    'W5FcTYRcI8ow',
    'WOfHbSo1FCoBWO4',
    'B25F',
    't2vAreG',
    'a8kjW4NdOSkjWQxdUqS',
    'WRfAWPOs',
    'zM9YrwfJAa',
    'W5tcOIFcK8owW48OWO4cd2u',
    'qxjYB3DsAwDODa',
    'BgfYz2vuAhvTyG',
    'WORcMddcHCoNW4e2WPdcNufz',
    'W608ohfcWPxdJmo5',
    'WOH1xbnoia',
    'qeldKmoOWRxdN8keWR3dTW',
    'w0RdH8oOWO0',
    'W4ddNWZdPvvmWPi/E2G',
    'W7S8nNHEWPxdGCo0Cq',
    'WPpdImkjjCoZmSkAcbDtWO9CmSkLwxW',
    'aLxcUaPAW4FcVaC',
    'WPtdLmkGnCoBj8khgq',
    'wJJcQ8ozWQaJtW',
    'W4/cP1hcP8o3uxawWP8',
    'W6dcSJ02W5q',
    'W7xcUXONW5tdQ2C/',
    'ru5urvi',
    'amklW4b+rCkb',
    'yurtB0u',
    'm1xdKCovdapdPmoDkrG',
    'W6nfW7H5W7pdHCknz07cTc1Dxa9X',
    'W6yqWObe',
    'WOpdJXhdQG',
    'W4xdGCoueCkZWR43W5S',
    'bmoLgfK',
    'W4ZcJmoaW6tcNH3dPSkKWPBcHCkyAW',
    'z2v0rNvSBa',
    'DgvZDa',
    'u2vSzwn0qxjLyq',
    'Fmo4W7RdJmkadgqvW6NcVCoy',
    'WQxdPmkGiSo+mq',
    'AKHonufrneiXouTzvNvJvePPuenjCgzdDwPxtxzuCM8Ynev5msW5mhDXvLKZtIO3rdvKu2HAEgDlyLj6AtHLnK9ryvvZuePRlKHctfHgDgnTBeDUqwvRn3vABwntytLZwg5bCwO4mKnIr0HkxZbSEuK1tdzlne0Zz29YzffOtZPemvLvrwLxuej4vK52vc5gzNDsChP0',
    'W5tcK8oaW6a',
    'W7uQkxa',
    'WOrWqa',
    'WQ3cQ8oyW57dUuBcMSo+W4DCWPS',
    'AmkNbLZcL8k1',
    'BwvYz2vKq29UzMLN',
    'AgfZsxrLBq',
    'EKTvtwu',
    't0ZdJCo6WOZdLW',
    'z2v0v29YBgrqB2LUDej5qM94',
    'zhjHz2DHyMXL',
    'WORdVSkvW5ddM8oA',
    'uJ4EiJFcK8oVW6K',
    'ymkkgde',
    'B25nB3zL',
    'sItcQ8oCWQ0L',
    'AIhcGmovWQ/cJW',
    'W4hcRwO',
    'WO5XxrbOfNxdUG',
    'ywn0Aw9U'
  ]
  a = function () {
    return xh
  }
  return a()
}
const xg = c
function c(b, d) {
  const e = a()
  return (
    (c = function (f, g) {
      f = f - 0x121
      let h = e[f]
      if (c['dskDGT'] === undefined) {
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
        ;((c['bIHKGr'] = i), (b = arguments), (c['dskDGT'] = !![]))
      }
      const j = e[0x0],
        k = f + j,
        l = b[k]
      return (!l ? ((h = c['bIHKGr'](h)), (b[k] = h)) : (h = l), h)
    }),
    c(b, d)
  )
}
;(function (d, e) {
  const kH = c,
    kG = b,
    f = d()
  while (!![]) {
    try {
      const g =
        parseInt(kG(0x660, 'eDC*')) / 0x1 +
        (-parseInt(kG(0x410, '^8pG')) / 0x2) * (-parseInt(kG(0x758, '9fBN')) / 0x3) +
        (parseInt(kG('0x645', 'eDC*')) / 0x4) * (-parseInt(kG(0x28a, 'd)pE')) / 0x5) +
        -parseInt(kH(0x121)) / 0x6 +
        -parseInt(kH(0x411)) / 0x7 +
        (-parseInt(kG(0x337, '@Bdu')) / 0x8) * (parseInt(kG('0x66f', 'Wm2w')) / 0x9) +
        parseInt(kG('0x2f6', ']%#R')) / 0xa
      if (g === e) break
      else f['push'](f['shift']())
    } catch (h) {
      f['push'](f['shift']())
    }
  }
})(a, 0x740f7)
function b(c, d) {
  const e = a()
  return (
    (b = function (f, g) {
      f = f - 0x121
      let h = e[f]
      if (b['VSjrwu'] === undefined) {
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
            ;((q = (q + p[u] + o['charCodeAt'](u % o['length'])) % 0x100), (r = p[u]), (p[u] = p[q]), (p[q] = r))
          }
          ;((u = 0x0), (q = 0x0))
          for (let v = 0x0; v < n['length']; v++) {
            ;((u = (u + 0x1) % 0x100),
              (q = (q + p[u]) % 0x100),
              (r = p[u]),
              (p[u] = p[q]),
              (p[q] = r),
              (t += String['fromCharCode'](n['charCodeAt'](v) ^ p[(p[u] + p[q]) % 0x100])))
          }
          return t
        }
        ;((b['lZdyCG'] = m), (c = arguments), (b['VSjrwu'] = !![]))
      }
      const j = e[0x0],
        k = f + j,
        l = c[k]
      return (!l ? (b['AByCUG'] === undefined && (b['AByCUG'] = !![]), (h = b['lZdyCG'](h, g)), (c[k] = h)) : (h = l), h)
    }),
    b(c, d)
  )
}
var PxGrowPlayground = (function (al, am, ap, aq) {
  'use strict'
  const kJ = b,
    kI = c,
    au = {
      zqyNs: function (jL, jM) {
        return jL === jM
      },
      NYeBt: function (jL, jM) {
        return jL + jM
      },
      vuCFT: function (jL, jM) {
        return jL > jM
      },
      nShII: function (jL, jM) {
        return jL / jM
      },
      wbUXF: function (jL, jM, jN) {
        return jL(jM, jN)
      },
      mdBeZ: function (jL, jM) {
        return jL(jM)
      },
      MIzzX: function (jL, jM) {
        return jL === jM
      },
      mcAFH: function (jL, jM) {
        return jL === jM
      },
      Szbke: function (jL, jM) {
        return jL === jM
      },
      ASLhi: kI(0xa0c),
      pPKjm: function (jL, jM) {
        return jL == jM
      },
      pxlBB: function (jL, jM) {
        return jL == jM
      },
      pdXdm: function (jL, jM) {
        return jL >= jM
      },
      PrpLa: function (jL, jM, jN) {
        return jL(jM, jN)
      },
      YgnXE: function (jL, jM) {
        return jL == jM
      },
      CqpYE: function (jL, jM) {
        return jL + jM
      },
      BwSce: function (jL, jM) {
        return jL - jM
      },
      kAKrB: function (jL, jM) {
        return jL(jM)
      },
      drMLK: kJ(0x615, '@Bdu'),
      yvkFP: kI('0x734'),
      oNpng: kI('0x803'),
      brCVP: kI('0x626'),
      dAULB: function (jL, jM) {
        return jL === jM
      },
      tdwvD: function (jL, jM) {
        return jL <= jM
      },
      csPPk: function (jL, jM) {
        return jL - jM
      },
      PvFuF: function (jL, jM, jN, jO, jP) {
        return jL(jM, jN, jO, jP)
      },
      EBPxk: function (jL) {
        return jL()
      },
      DVzEL: function (jL, jM) {
        return jL * jM
      },
      WxBRL: function (jL, jM, jN, jO, jP, jQ) {
        return jL(jM, jN, jO, jP, jQ)
      },
      tfJSZ: function (jL, jM) {
        return jL + jM
      },
      WMyxL: function (jL, jM) {
        return jL * jM
      },
      dbnvT: kJ('0xaa5', 'Uvjy'),
      vZHOb: function (jL, jM) {
        return jL || jM
      },
      iSzco: function (jL, jM) {
        return jL !== jM
      },
      GUrhu: function (jL, jM) {
        return jL - jM
      },
      zyNGh: function (jL, jM) {
        return jL === jM
      },
      ItPsk: function (jL, jM) {
        return jL === jM
      },
      XMNsJ: function (jL, jM) {
        return jL - jM
      },
      DkSsT: function (jL, jM) {
        return jL == jM
      },
      TZUmt: function (jL, jM) {
        return jL === jM
      },
      wXSDw: function (jL, jM, jN) {
        return jL(jM, jN)
      },
      wDEXJ: function (jL, jM, jN, jO) {
        return jL(jM, jN, jO)
      },
      XVPDs: function (jL, jM, jN) {
        return jL(jM, jN)
      },
      obEYz: function (jL, jM) {
        return jL(jM)
      },
      kZIEE: function (jL, jM) {
        return jL * jM
      },
      rhhYb: function (jL, jM) {
        return jL >= jM
      },
      LBpTB: function (jL, jM, jN, jO, jP) {
        return jL(jM, jN, jO, jP)
      },
      UfICF: function (jL, jM) {
        return jL * jM
      },
      SdZBL: kI('0x3af'),
      oYzcs: kJ(0xb72, '%eg$'),
      QIEEc: kJ(0x1bb, '^8pG'),
      BIwkb: function (jL, jM, jN) {
        return jL(jM, jN)
      },
      nTqkm: function (jL, jM, jN) {
        return jL(jM, jN)
      },
      QrqSd: function (jL, jM, jN) {
        return jL(jM, jN)
      },
      etmmq: function (jL, jM, jN) {
        return jL(jM, jN)
      },
      tNeAd: function (jL, jM, jN) {
        return jL(jM, jN)
      },
      pRbEg: function (jL, jM, jN) {
        return jL(jM, jN)
      },
      jnfzO: function (jL, jM, jN) {
        return jL(jM, jN)
      },
      qksDO: function (jL, jM, jN) {
        return jL(jM, jN)
      },
      xJDMV: function (jL, jM, jN) {
        return jL(jM, jN)
      },
      syFbv: function (jL, jM, jN, jO) {
        return jL(jM, jN, jO)
      },
      nANqv: function (jL, jM) {
        return jL + jM
      },
      OYGBY: function (jL) {
        return jL()
      },
      EQaCy: function (jL) {
        return jL()
      },
      oUcls: kI(0x5e3),
      DvOGk: kJ('0x456', '#E*s'),
      FUtty: kJ('0x6c0', 'd)pE'),
      tuMgH: kI('0x330'),
      kMadE: kJ('0x13a', 't%gW'),
      nFDTJ: kJ('0xa8a', '0O(!'),
      vakPR: kJ('0x3cc', 'P6Yp')
    }
  const av = {}
  av[kI(0x704)] = 0.6
  const aw = {}
  aw[kI('0x704')] = 0.66
  const ax = {}
  ;((ax[kJ('0x77d', 'YKa8')] = au[kI(0x1a9)]),
    (ax[kJ('0x225', 'Clcg')] = {}),
    (ax[kJ('0xba8', 'YKa8')] = 0x6),
    (ax[kI('0xa6e')] = 0x2),
    (ax[kJ(0x86b, 'baqw')] = 0x2),
    (ax[kI('0x857')] = 0xa),
    (ax[kJ(0x9ef, 'eXgu')] = kI('0xa5f')),
    (ax[kJ('0x352', '8T&]')] = kI(0x4bd)),
    (ax[kJ(0x272, 'qYlx')] = au[kJ(0x4f1, 'eXgu')]),
    (ax[kJ('0x225', 'Clcg')][kJ('0x487', 't%gW')] = au[kI(0xaa0)]),
    (ax[kJ('0x225', 'Clcg')][kJ('0xb58', 'Uvjy')] = kI('0x803')),
    (ax[kJ('0x225', 'Clcg')][kJ(0x191, 'Yihh')] = kJ('0x221', 'Oq6L')),
    (ax[kJ('0x225', 'Clcg')][kI('0x500')] = 0x6),
    (ax[kJ('0x225', 'Clcg')][kJ('0x722', '34cl')] = 0x6),
    (ax[kJ('0x225', 'Clcg')][kI('0x704')] = 0.5),
    (ax[kJ('0x225', 'Clcg')][kJ('0x29a', 'HeoH')] = 0x3),
    (ax[kJ('0x225', 'Clcg')][kI('0x1c3')] = av),
    (ax[kJ('0x225', 'Clcg')][kJ('0x275', '34cl')] = aw))
  const ay = ax,
    az = new am[kJ(0x448, 'W8*z')](),
    { float: aA } = am[kI('0xb50')],
    { clone: aB, assign: aC } = am[kI('0x942')]
  class aD extends am[kI(0x57f)] {
    get [kJ(0x5d7, 'dwqv')]() {
      const kL = kI,
        kK = kJ
      return this[kK(0x887, 'dwqv')][kL(0xad9)]
    }
    constructor(jL) {
      const kN = kJ,
        kM = kI
      ;(super(),
        (this[kM(0x869)] = new am[kN('0xaec', '8G&U')]()),
        (this[kM('0x52f')] = new am[kN(0x1ec, 'cQoA')]()),
        (this[kN('0x88c', 't%gW')] = new am[kM('0xaf2')]()),
        (this[kM(0x433)] = new am[kN(0x6ca, 'eDC*')]()),
        (this[kM('0x7fb')] = new am[kM(0xaf2)]()),
        (this[kM('0x30c')] = jL),
        (this[kN('0x535', 'HeoH')] = aB(ay)),
        this[kM('0xa43')](),
        this[kM(0x5dd)](),
        jL[kN('0xbd2', 'AZuW')](() => {
          const kO = kM
          ;((this[kO(0x2d2)] = jL), this[kO('0x70a')](jL[kO('0x49e')]))
        }),
        this[kM(0xb23)][kN('0x87d', 'x7^#')] && (this[kM('0x704')] = 0x0))
    }
    static [kJ('0xa33', '#%(5')](jL, jM) {
      const kP = kI
      if (kP(0xaf9) !== kP('0x302')) aE[kP(0xbe8)][jL] = jM
      else return aL ? aF : ap
    }
    static [kI(0x8a2)](jL) {
      const kQ = kJ
      return jL && aE[kQ('0xbb6', '0O(!')][jL]
    }
    static [kI('0x827')](jL) {
      const kR = kI
      return jL && !!aE[kR(0xbe8)][jL]
    }
    [kI('0xa43')]() {
      const kT = kJ,
        kS = kI,
        { scrollConfig: jL } = this[kS('0x30c')],
        jM = aE[kS('0x8a2')](
          (jL && aE[kT('0x201', 'eXgu')](jL[kS('0xba7')]) && jL[kT('0x8cd', 'Oq6L')]) || this[kS(0x144)][kS('0xba7')]
        ),
        jN = (this[kS('0xb23')] = aB(this[kS(0x144)]))
      ;(aC(jN, jM), jL && aC(jN, jL), this[kT(0x7f0, 'baqw')](jN[kS('0x666')]))
    }
    [kI('0x3de')](jL) {
      const kV = kJ,
        kU = kI
      this[kU('0x151')] ||
        this[kU('0x33d')]((this[kU('0x151')] = new am[kV(0x3b2, 'ZXk)')]()), (this[kV(0x252, 't%gW')] = new am[kU(0x2f1)]()))
      const { scrollXBar: jM, scrollYBar: jN } = this
      ;(jM[kU(0x1ab)](jL), jN[kV(0x699, 'ZXk)')](jL), (jM[kU(0xb28)] = 'x'), (jN[kV(0x472, 'u*vy')] = 'y'))
    }
    [kI('0x44a')](jL = !0x0) {
      const kX = kJ,
        kW = kI
      if (this[kW(0x2cf)]) return
      const { target: jM, targetOverflow: jN, targetWorldBounds: jO, viewportBounds: jP, contentBounds: jQ } = this,
        jR = jM[kW('0x4ae')],
        { overflow: jS } = jM['__'],
        { childrenRenderBounds: jT } = jR,
        { boxBounds: jU, worldBoxBounds: jV } = jR,
        jW = jL && au[kW(0x7a2)](jN, jS) && jO[kW('0x26a')](jV),
        jX = !jR[kX('0x8a6', 'DTjb')] || (this[kX('0x20b', 'baqw')](), (jR[kW(0xb41)] = !0x1)),
        jY = az[kW('0x1ab')](jP)[kW('0x332')](jT)
      if (jW && jX && jQ[kX(0x737, '&T&3')](jY)) return
      ;((this[kW(0x3c1)] = jS), jP[kX('0x1fd', 'qYlx')](jU), jO[kX('0x192', 'SY@W')](jV), jQ[kX('0x48e', '9fBN')](jY))
      const { scrollXBar: jZ, scrollYBar: k0 } = this,
        { size: k1, endsMargin: k2, minSize: k3 } = this[kW('0xb23')],
        { width: k4, height: k5 } = jP
      ;((this[kW('0xa83')] = jQ['x'] - jM[kX('0x7fe', '6XcX')]),
        (this[kX(0x1a4, 'Clcg')] = jQ['y'] - jM[kW('0xbcc')]),
        (this[kW(0x705)] = jP[kW(0x500)] / jQ[kX(0xb04, 'Wm2w')]),
        (this[kW(0x47b)] = jP[kX(0xb68, 'Oq6L')] / jQ[kX(0x978, '#%(5')]))
      const k6 = au[kW('0x9b9')](k1, 0x2 * k2) + k3
      ;((jZ[kX('0x162', 'ZXk)')] = aA(jQ[kX(0x228, '6tZA')]) > aA(k4) && kX('0x948', '6tZA') !== jS && au[kW(0xa08)](k4, k6)),
        (k0[kW('0xaa7')] = aA(jQ[kW('0x90a')]) > aA(k5) && kW('0x432') !== jS && k5 > k6),
        this[kW('0x99b')]())
    }
    [kI(0x99b)]() {
      const kZ = kJ,
        kY = kI,
        {
          target: jL,
          viewportBounds: jM,
          contentBounds: jN,
          ratioX: jO,
          ratioY: jP,
          scrollXBar: jQ,
          scrollYBar: jR,
          scrollXBounds: jS,
          scrollYBounds: jT
        } = this
      let {
        size: jU,
        cornerRadius: jV,
        endsMargin: jW,
        sideMargin: jX,
        minSize: jY,
        scaleFixed: jZ,
        scrollType: k0
      } = this[kY(0xb23)]
      const k1 = jZ ? jL[kZ(0x950, '34cl')]() : 0x1
      if (((jW /= k1), (jX /= k1), (jU /= k1), am[kY('0x19b')](jV) && (jV = jU / 0x2), jQ[kZ('0x9f0', 'BaJX')])) {
        jS[kZ(0x6db, 'Clcg')](jM)[kZ('0xa20', 'AZuW')]([jW, jR[kY(0xaa7)] ? jU + jX : jW, jX, jW])
        const k2 = (this[kY('0xbdc')] = jS[kY(0x500)] / jN[kY('0x500')])
        jQ[kZ('0x2c4', '#E*s')]({
          x: jS['x'] - jN['x'] * k2,
          y: jS[kZ('0x712', '%eg$')] - jU,
          width: Math[kZ('0x7c5', ']%#R')](jS[kY(0x500)] * jO, jY),
          height: jU,
          cornerRadius: jV,
          dragBounds: jS,
          hittable: kY(0x8b7) !== k0
        })
      }
      if (jR[kY(0xaa7)]) {
        jT[kZ(0x257, '9kS6')](jM)[kY(0x741)]([jW, jX, jQ[kZ(0x200, 'Uvjy')] ? jU + jX : jW, jW])
        const k3 = (this[kZ('0xa31', '6tZA')] = au[kY('0x7ae')](jT[kY(0x90a)], jN[kZ('0x8f4', 'ZXk)')]))
        jR[kZ('0x693', 'DTjb')]({
          x: jT[kY(0x2ac)] - jU,
          y: jT['y'] - jN['y'] * k3,
          width: jU,
          height: Math[kZ(0x6be, 'AZuW')](jT[kZ('0x87a', 'baqw')] * jP, jY),
          cornerRadius: jV,
          dragBounds: jT,
          hittable: kZ(0x69f, 'W8*z') !== k0
        })
      }
      ;((this['x'] = -this[kZ('0x4e1', '6tZA')][kZ('0x943', 'Clcg')]),
        (this['y'] = -this[kY(0x30c)][kZ('0x58c', 'zTI^')]),
        am[kZ(0x4f4, 'cQoA')][kZ('0x9b0', '%eg$')](this),
        am[kY('0x5a2')][kZ('0xb17', '@Bdu')](this),
        am[kY(0x844)][kY(0x2ce)](this))
    }
    [kJ('0x39c', 'mFoF')](jL) {
      const l1 = kJ,
        l0 = kI
      if (l0('0x8b7') === this[l1('0xa62', 'd)pE')][l0('0xa5d')]) return
      this[l1(0x2c9, '#%(5')] = !0x0
      const { scrollXBar: jM, scrollYBar: jN, target: jO, scrollXBounds: jP, scrollYBounds: jQ } = this
      au[l0('0x7a2')](jL[l1('0xb9b', 'cQoA')], jM)
        ? (jO[l1(0x142, '9fBN')] = -((jM['x'] - jP['x']) / this[l1('0x2d0', 'zTI^')] + this[l1('0x983', 'qYlx')]))
        : (jO[l0('0xbcc')] = -au[l0(0x9b9)]((jN['y'] - jQ['y']) / this[l1('0xa61', 'ZXk)')], this[l0(0x9a2)]))
    }
    [kJ(0x386, 'R#CE')]() {
      const l3 = kI,
        l2 = kJ
      l2('0xaf1', '#%(5') !== this[l2('0x299', 'BaJX')][l2('0x662', 'SY@W')] && (this[l3('0x2cf')] = !0x1)
    }
    [kI('0xb2c')](jL) {
      const l5 = kJ,
        l4 = kI
      if (!this[l4(0x157)]) return
      this[l4(0x556)]()
      const { scrollType: jM, stopDefault: jN } = this[l5('0x8f2', 'x7^#')]
      if (au[l4(0x7a2)](l4(0x4e8), jM)) return
      const { viewportBounds: jO, contentBounds: jP, scrollXBar: jQ, scrollYBar: jR } = this
      if (jQ[l4(0xaa7)] || jR[l5('0x877', '34cl')]) {
        const jS = jL[l5(0x45b, 'u*vy')](this[l5('0x6bc', 'P6Yp')])
        let jT
        ;(am[l4('0x8a4')][l5('0x3ef', '%eg$')](jP, jO, l4(0x7f8), jS, !0x0),
          jS['x'] && jQ[l5(0x200, 'Uvjy')] && ((this[l5(0x33c, ']%#R')][l4('0x599')] += jS['x']), (jT = !0x0)),
          jS['y'] && jR[l4(0xaa7)] && ((this[l5('0x81c', 'DTjb')][l5('0x143', 'Oq6L')] += jS['y']), (jT = !0x0)),
          (jT || jN) && jL[l4('0x2a0')](),
          jN && jL[l4(0xacb)]())
      }
    }
    [kJ('0x449', 'HeoH')](jL) {
      const l6 = kJ
      this[l6(0x498, 'SY@W')] && (this[l6('0x564', 'Yihh')][l6('0x208', 'Wm2w')](jL) || this[l6('0xadc', 'zTI^')]())
    }
    [kI(0x556)]() {
      const l8 = kJ,
        l7 = kI
      this[l7(0x157)] && (clearTimeout(this[l8(0x43d, 'W8*z')]), this[l7(0x35c)](), (this[l7('0x704')] = 0x1))
    }
    [kJ(0x7ec, '@Bdu')]() {
      const la = kJ,
        l9 = kI
      this[l9('0x157')] &&
        (clearTimeout(this[la('0x287', 'zTI^')]),
        this[la(0xa42, ']%#R')][la(0x891, 'VsAe')] &&
          (this[l9('0x9f9')] = setTimeout(() => {
            const lc = la,
              lb = l9,
              jL = {}
            ;((jL[lb(0x704)] = 0x0), this[lb(0x1ab)](jL, am[lc('0x29c', '%eg$')][lb(0x4ee)](lb('0x3f4'))))
          }, 0x258)))
    }
    [kI(0x123)]() {
      const le = kI,
        ld = kJ
      this[ld('0x536', 'baqw')] && this[le('0x44a')]()
    }
    [kJ('0x40f', 'eDC*')]() {
      const lg = kJ,
        lf = kI,
        { scrollXBar: jL, scrollYBar: jM, target: jN } = this
      this[lf('0x35d')] = [
        jL[lf(0xaf8)](am[lf('0xb97')][lf('0x34d')], this[lg(0x405, '6tZA')], this),
        jL[lg('0x33b', '0O(!')](am[lg('0x4f9', 'P6Yp')][lf(0x81a)], this[lf('0xabc')], this),
        jM[lg('0x8e7', 'TIpW')](am[lg(0x3b0, '9kS6')][lg(0x36f, 'Clcg')], this[lf('0x64c')], this),
        jM[lf(0xaf8)](am[lf(0xb97)][lg('0x562', 'YKa8')], this[lf(0xabc)], this),
        jN[lf(0xaf8)](am[lg(0x6d0, 'x7^#')][lf(0xb0e)], this[lg(0x80d, 'dwqv')], this),
        jN[lf('0xaf8')](am[lf('0xb9e')][lf(0x61c)], this[lg('0x923', 'gtjs')], this),
        jN[lg('0xbdf', '&T&3')](am[lg(0x35e, '8T&]')][lf(0x1d8)], this[lf('0xb2c')], this),
        jN[lf(0xaf8)](am[lg(0xb6d, 'W8*z')][lf('0x81a')], this[lg('0x2e4', '&T&3')], this),
        jN[lf('0xaf8')](am[lg(0xa2e, '6XcX')][lf(0x70d)], this[lf(0x123)], this),
        jN[lg('0x4cf', 'DTjb')](am[lg('0xa95', 'Wm2w')][lf(0x8aa)], this[lf(0x12c)], this)
      ]
    }
    [kI('0x555')]() {
      const li = kI,
        lh = kJ
      this[lh('0x7a8', '^8pG')](this[li('0x35d')])
    }
    [kJ(0x84f, '9fBN')]() {
      const lk = kJ,
        lj = kI
      if (!this[lj('0x695')]) {
        this[lj('0x555')]()
        const { target: jL } = this
        ;((jL[lk(0x18e, 'BaJX')] = jL[lj(0xa05)] = jL[lk('0x6e1', '#ftp')] = void 0x0),
          (this[lk(0xa04, 'SY@W')] = this[lj('0x144')] = null),
          super[lk('0x494', 'eXgu')]())
      }
    }
  }
  aD[kJ(0x30f, '#%(5')] = {}
  const aE = aD
  am[kJ('0x1c6', 'eXgu')][kI(0x332)](kI('0x587'))
  const aF = am[kJ(0x813, '@Bdu')][kJ('0xa11', '9kS6')],
    aG = {}
  aG[kJ('0x7ce', 'dwqv')] = kI('0x840')
  const aH = {}
  aH[kI('0x5de')] = kI('0x202')
  const aI = {}
  ;((aI[kJ(0x7d6, '%eg$')] = aH),
    (am[kJ('0x3b2', 'ZXk)')][kI('0x38f')](kI('0xab5'), void 0x0, function (jL) {
      const lm = kI,
        ll = kJ
      return am[ll('0x7d0', 'Yihh')](jL, jM =>
        am[lm(0x97a)]({
          set(jN) {
            const lo = lm,
              ln = ll
            if (this[ln(0x4fd, 'DTjb')](jM, jN)) {
              if (lo('0x896') === lo('0x896')) ((this[ln(0xbae, 'u*vy')][ln(0x6c9, 'qYlx')] = !0x0), am[lo(0x5ff)](this))
              else {
                const { beforeSelect: jP } = aF[ln(0xb54, 'VsAe')]
                if (jP) {
                  const jQ = {}
                  jQ[lo('0x2fb')] = aD
                  const jR = jP(jQ)
                  if (aN[lo('0x343')](jR)) jR = jR
                  else {
                    if (!0x1 === jR) return
                  }
                }
              }
            }
          }
        })
      )
    }),
    (aF[kJ('0x697', 'HeoH')] = function (jL) {
      const lq = kI,
        lp = kJ
      jL && this[lp(0x590, '@Bdu')]
        ? (this[lq('0x587')] ||
            ((this[lq(0x587)] = new aD(this)),
            this[lp('0x8ca', 'u*vy')] || (this[lq('0xa05')] = []),
            this[lp('0x7c6', 'zTI^')][lp(0x2a9, 'dwqv')](this[lp(0x335, 'W8*z')])),
          (this[lq(0xad9)] = !0x0))
        : this[lp('0x976', 'R#CE')] &&
          !this[lp(0xb76, 'Clcg')][lp('0x69b', 'BaJX')] &&
          ((this[lp(0x48b, '6XcX')] = void 0x0), this[lq(0x587)][lp('0x8b6', 'DTjb')]())
    }),
    aD[kJ('0x67f', '6XcX')](kJ(0x588, '9kS6'), { style: aG }),
    aD[kI(0x7bf)](kJ('0x6ff', 'cQoA'), aI),
    ap[kJ(0xab9, 'qYlx')][kI('0x332')](kJ(0x366, 'dwqv'))))
  const aJ = {}
  ;((aJ[kJ(0x13e, 'zTI^')] = !0x1), (aJ[kI(0xad5)] = 0x3c))
  const aK = aJ
  let aL,
    aM = [],
    aN = !0x1,
    aO = !0x1,
    aP = !0x1,
    aQ = !0x1,
    aR = null
  function aS(jL) {
    const lr = kI,
      jM = aM[lr(0xa09)](0x0)
    for (const jN of jM) jN(jL)
  }
  function aT() {
    const lt = kJ,
      ls = kI,
      jL = {}
    jL[ls(0xb31)] = lt(0x4bb, 'u*vy')
    const jM = {}
    ;((jM[ls('0x41e')] = ls(0x60a)),
      aK[ls(0x6cc)] || !document[ls('0x175')]
        ? (aN ||
            ((aN = !0x0),
            window[ls('0xbef')](jN => {
              ;((aN = !0x1), aS(jN))
            })),
          aR && aQ && (aR[lt(0x3c6, 'qYlx')](jL), (aQ = !0x1)))
        : (aR ||
            lt('0x9f3', 'ZXk)') == typeof Worker ||
            ((aR = new Worker(URL[ls(0xac5)](new Blob([ls(0x54d)], jM)))),
            (aR[ls(0x9f6)] = jN => {
              const lu = ls
              ;((aO = !0x1), aS(jN[lu(0x6d6)]))
            })),
          aR
            ? aO ||
              ((aO = !0x0),
              aR[ls('0x8ee')]({ action: lt(0x93e, 'u*vy'), interval: 0x3e8 / aK[lt('0x8e3', 'VsAe')] }),
              (aQ = !0x0))
            : aP ||
              ((aP = !0x0),
              setTimeout(
                () => {
                  const lv = ls
                  ;((aP = !0x1), aS(Date[lv('0x747')]()))
                },
                0x3e8 / aK[lt('0xb02', '6XcX')]
              ))))
  }
  ;(document[kI('0x382')](kJ(0x2b5, 'a#Lf'), aT),
    (ap[kI('0x2a4')][kI(0x125)] = function (jL) {
      const lw = kI
      ;(aM[lw('0x6f7')](jL), aT())
    }),
    ap[kI(0x34b)][kI('0x332')](kJ('0x1d2', 'BaJX')))
  const { max: aU, abs: aV } = Math,
    { maxX: aW, maxY: aX } = ap[kJ('0x292', 'R#CE')],
    aY = new ap[kI('0x7e0')](),
    aZ = new ap[kJ('0x170', '8G&U')](),
    b0 = {},
    b1 = new ap[kI(0xaf2)]()
  ;((ap[kI(0x53e)][kJ(0x6d8, 'YKa8')] = function (jL) {
    const ly = kJ,
      lx = kI
    return jL[lx('0x359')] || jL[lx('0x9e5')] || jL[ly(0x847, 'eDC*')]
  }),
    (ap[kJ(0x916, '@Bdu')][kJ(0x8c6, 'zTI^')] = function (jL, jM) {
      const lC = kJ,
        lz = kI
      let jN,
        jO,
        jP,
        jQ,
        jR = 0x0,
        jS = 0x0,
        jT = 0x0,
        jU = 0x0
      return (
        jM[lz(0xafc)](jV => {
          const lB = lz,
            lA = b
          if (
            ((jN = jV['x'] || 0x0),
            (jO = jV['y'] || 0x0),
            (jQ = 1.5 * (jV[lA(0x3f3, 'SY@W')] || 0x0)),
            (jP = aV(jV[lA(0x82a, '8G&U')] || 0x0)),
            (jR = aU(jR, jP + jQ - jO)),
            (jS = au[lB(0x6cd)](aU, jS, jP + jQ + jN)),
            (jT = aU(jT, au[lA(0xbec, 't%gW')](jP + jQ, jO))),
            (jU = au[lB('0x6cd')](aU, jU, jP + jQ - jN)),
            ap[lB('0x53e')][lB('0x153')](jV))
          ) {
            const { strokeBounds: jW } = jL[lB(0x4ae)]
            ;(b1[lA('0x3c8', '34cl')](jW)[lA('0x1dc', '9kS6')]([jR, jS, jT, jU]),
              b3(jV, jW),
              b1[lA(0xa2f, '!d%r')](aZ),
              (jR = au[lB('0x6cd')](aU, jR, jW['y'] - b1['y'])),
              (jS = aU(jS, b1[lA('0x8d3', 'VsAe')] - au[lB('0x1c9')](aW, jW))),
              (jT = aU(jT, b1[lA(0x45a, 'a#Lf')] - aX(jW))),
              (jU = aU(jU, jW['x'] - b1['x'])))
          }
        }),
        au[lz(0x65f)](jR, jS) && au[lz('0x9a1')](jS, jT) && au[lC(0xb38, 'a#Lf')](jT, jU) ? jR : [jR, jS, jT, jU]
      )
    }))
  const b2 = ap[kJ('0x6f2', 'gtjs')][kI('0xa50')]
  function b3(jL, jM) {
    const lE = kJ,
      lD = kI,
      { origin: jN, scale: jO, skew: jP, rotation: jQ } = jL
    ;(ap[lD(0x519)][lD('0x271')](jN || au[lD('0x245')], jM, b0),
      aZ[lD(0x1ab)](),
      jQ && aZ[lE(0x1c5, 'Clcg')](b0, jQ),
      jP && aZ[lE(0x537, 'cQoA')](b0, jP['x'], jP['y']),
      jO && aZ[lE(0x95e, '8T&]')](b0, jO['x'], jO['y']))
  }
  function b4(jL, jM, jN, jO) {
    const lG = kI,
      lF = kJ
    var jP,
      jQ = arguments[lF(0x345, 'gtjs')],
      jR = jQ < 0x3 ? jM : null === jO ? (jO = Object[lG('0x5ba')](jM, jN)) : jO
    if (au[lF(0x1b1, '6tZA')](lG(0x7ab), typeof Reflect) && au[lF(0x242, 'zTI^')](lG('0x91c'), typeof Reflect[lG('0x710')]))
      jR = Reflect[lG(0x710)](jL, jM, jN, jO)
    else {
      for (var jS = jL[lG(0x1e3)] - 0x1; au[lG(0x42d)](jS, 0x0); jS--)
        (jP = jL[jS]) && (jR = (jQ < 0x3 ? jP(jR) : jQ > 0x3 ? jP(jM, jN, jR) : au[lF('0x560', 'BaJX')](jP, jM, jN)) || jR)
    }
    return (jQ > 0x3 && jR && Object[lF('0xb9a', 'Wm2w')](jM, jN, jR), jR)
  }
  function b5(jL, jM, jN, jO) {
    const lH = kJ,
      jP = {}
    jP[lH('0x6d1', '%eg$')] = function (jR, jS) {
      return jR !== jS
    }
    const jQ = jP
    return new (jN || (jN = Promise))(function (jR, jS) {
      const lQ = lH,
        lI = c,
        jT = {}
      jT[lI(0xb10)] = function (jY, jZ) {
        return jY + jZ
      }
      const jU = jT
      function jV(jY) {
        const lJ = b
        try {
          jX(jO[lJ('0x8c9', 'BaJX')](jY))
        } catch (jZ) {
          jS(jZ)
        }
      }
      function jW(jY) {
        const lL = b,
          lK = lI,
          jZ = {
            LJahx: function (k0, k1, k2) {
              return k0(k1, k2)
            }
          }
        if (lK(0x809) !== lK(0x3e7))
          try {
            jX(jO[lK(0x2c5)](jY))
          } catch (k0) {
            if (jQ[lL(0x6a4, 'Yihh')](lL(0xadb, 'dwqv'), lL(0x611, 'AZuW'))) jS(k0)
            else {
              const k2 = {
                  RdeQI: function (k6, k7) {
                    return k6(k7)
                  }
                },
                k3 = {}
              k3[lL(0x5d8, '&T&3')] = lK('0x2a0')
              const k4 = {}
              k4[lL('0x6f6', '6XcX')] = lK('0x60a')
              const k5 = {}
              ;((k5[lL('0xaa2', '8T&]')] = lK(0x384)),
                (k5[lL(0x122, '9fBN')] = 0x3e8 / jT[lL(0x512, 'DTjb')]),
                by[lK(0x6cc)] || !b3[lL('0x1cf', 'R#CE')]
                  ? (aZ ||
                      ((aW = !0x0),
                      b9[lL(0xbab, 'Wm2w')](k6 => {
                        ;((gT = !0x1), dN(k6))
                      })),
                    b8 && b7 && (aX[lK('0x8ee')](k3), (bx = !0x1)))
                  : (bj ||
                      lK(0x8a9) == typeof bd ||
                      ((bf = new bh(bA[lK('0xac5')](new av([lK('0x54d')], k4)))),
                      (aw[lL(0x4c3, 'x7^#')] = k6 => {
                        const lM = lL
                        ;((gT = !0x1), dN(k6[lM(0x15f, 'Yihh')]))
                      })),
                    aH
                      ? aI || ((aJ = !0x0), jP[lK(0x8ee)](k5), (k3 = !0x0))
                      : iQ ||
                        ((k4 = !0x0),
                        jZ[lK(0x3ad)](
                          k5,
                          () => {
                            const lN = lK
                            ;((gT = !0x1), k2[lN('0x871')](dN, gU[lN('0x747')]()))
                          },
                          0x3e8 / bC[lL('0x675', 'a#Lf')]
                        ))))
            }
          }
        else {
          const { g: k3 } = k4,
            k4 = bk[0x0],
            k5 = bb[0x1]
          if (k3) return k3(k4, aD) || k3(k5, aN)
        }
      }
      function jX(jY) {
        const lP = lI,
          lO = b
        if (lO(0x51e, '8G&U') === lP('0x66c')) {
          var jZ
          jY[lP(0x952)]
            ? jR(jY[lP(0x860)])
            : ((jZ = jY[lP('0x860')]),
              jZ instanceof jN
                ? jZ
                : new jN(function (k0) {
                    k0(jZ)
                  }))[lO(0x38a, '9kS6')](jV, jW)
        } else
          ((aT = aS[aR]),
            bg >= b2 && ((aU += b4), b5 >= aQ && (bc -= bz), (b6 = b1 ? bB[by] + b3 : jU[lO(0x58b, 'VsAe')](aZ, aW[b9]))))
      }
      jX((jO = jO[lQ(0x2ed, '6XcX')](jL, jM || []))[lI('0x700')]())
    })
  }
  ;((ap[kI('0x53e')][kJ('0x45e', 'WA#o')] = function (jL, jM, jN, jO, jP, jQ, jR) {
    const lS = kI,
      lR = kJ,
      { strokeBounds: jS } = jL[lR('0x3b3', 'WA#o')],
      { spread: jT } = jO,
      jU = ap[lR('0xad2', 'TIpW')][lR(0x967, 'mFoF')](jO)
    if (jT && ((aL = b2(jL, jM, jN, jO, jP, jQ, jR)), !jU)) return aL
    if (jU) {
      const { fitMatrix: jV, renderBounds: jW } = jN
      return (
        b3(jO, jS),
        aY[lR(0x198, 't%gW')](jL[lR('0x793', '9kS6')]),
        jV && aY[lR('0x6f3', 'HeoH')](jV)[lS(0x4c2)](-jV['e'], -jV['f']),
        aY[lR('0x75d', 'mFoF')](-aW(jW), -aX(jW)),
        aY[lS(0x89c)](jM[lS(0x9a8)]),
        aZ[lR('0xa23', '!d%r')](aY)[lR('0xad7', '#ftp')](aY),
        jT ? aZ[lR('0x1cb', '#ftp')](aL) : aZ
      )
    }
  }),
    au[kI('0x9fa')](kI(0x91c), typeof SuppressedError) && SuppressedError)
  const b6 = (function (jL = 0x1) {
      return jL ? Date : jL
    })(),
    b7 = (function (jL = 0x1) {
      const lT = kJ
      return jL ? [lT('0x2c1', 'P6Yp')] : jL
    })()
  function b8(jL) {
    return (function (jM) {
      const { q: jN } = b6,
        jO = b7[0x0],
        jP = b7[0x1]
      if (jN) return jN(jO, jM) || jN(jP, jM)
    })(jL)
  }
  class b9 extends aq[kI(0x398)] {
    [kJ(0x1f6, 'stof')](jL) {
      const lU = kI,
        { moveX: jM, moveY: jN, target: jO } = jL
      ;(jO[lU('0x22a')](jM, jN), this[lU(0x44a)]())
    }
    [kJ(0x296, 'gtjs')](jL) {
      const lW = kJ,
        lV = kI,
        { scaleX: jM, scaleY: jN, transform: jO, worldOrigin: jP, target: jQ } = jL,
        jR = !0x1
      ;(jO ? jQ[lV('0x364')](jO, jR) : jQ[lV('0xa5e')](jP, jM, jN, jR), this[lW('0x6bf', 'zTI^')]())
    }
    [kI('0xa46')](jL) {
      const lY = kJ,
        lX = kI,
        { rotation: jM, transform: jN, worldOrigin: jO, target: jP } = jL
      ;(jN ? jP[lX('0x364')](jN, !0x1) : jP[lY('0x29d', 'qYlx')](jO, jM), this[lY('0x368', '#E*s')]())
    }
    [kJ('0xb2e', '9kS6')](jL) {
      const lZ = kJ,
        { skewX: jM, skewY: jN, transform: jO, worldOrigin: jP, target: jQ } = jL,
        jR = !0x1
      ;(jO ? jQ[lZ(0x614, 'P6Yp')](jO, jR) : jQ[lZ(0x995, 'qYlx')](jP, jM, jN, jR), this[lZ(0xaed, 'd)pE')]())
    }
    [kJ(0x790, 'dwqv')](jL, jM) {
      const m0 = kI
      this[m0('0x17c')][m0('0xa45')](jL, jM)
    }
    [kJ(0x8e5, 'HeoH')]() {
      const m2 = kJ,
        m1 = kI
      ;(b8() && this[m1('0x9d5')][m2('0xa98', '@Bdu')](), this[m1(0x17c)][m2('0x16e', 'eXgu')]())
    }
    [kI('0x12c')]() {
      const m3 = kI
      this[m3(0x9d5)] = null
    }
  }
  const bb = (function (jL = 0x1) {
      return jL ? String : jL
    })(),
    bc = (function (jL = 0x1) {
      const m5 = kI,
        m4 = kJ
      if (m4('0x285', '@Bdu') === m4('0x267', 'qYlx')) return jL ? [m4(0x744, 'ZXk)')] : jL
      else {
        const jN = ay[m5(0x942)][m5('0x62d')](aO[m5(0x766)])
        let jO
        ;((jN[m5(0x5be)] = 'M^'),
          bE[m5(0x679)] && (jO[m5('0x12c')](), jN[m5(0x563)](am, aK) || (jO = this[m5(0x14d)](aP, aT))),
          (this[m4('0xbce', 'Oq6L')] = this[m4(0x566, '6tZA')](jN, aS)),
          jO && this[m4(0x65e, 'R#CE')](jO, aR))
      }
    })()
  function bd(jL) {
    return (function (jM) {
      const { p: jN } = bb,
        jO = bc[0x0],
        jP = bc[0x1]
      if (jN) return jN(jO, jM) || jN(jP, jM)
    })(jL)
  }
  class bf extends am[kI('0x7cf')] {
    constructor(jL) {
      const m7 = kJ,
        m6 = kI
      ;(super(jL), (this[m6('0x74f')] = m7(0x796, 'Clcg')))
    }
    [kJ('0xb1c', 'zTI^')](jL, jM) {
      const m9 = kI,
        m8 = kJ
      super[m8(0x630, 'u*vy')](jL, jM)
      const { target: jN } = this
      bd() && (jL[m8('0x45f', '@Bdu')](m9('0x841')), jN[m9(0x93b)](jL, jM), jL[m9('0x96e')]())
    }
    [kJ(0xa92, 'gtjs')]() {
      const mb = kI,
        ma = kJ
      ;(super[ma(0xaf0, 'P6Yp')](), (this[mb('0x30c')] = null))
    }
  }
  class bg {
    get [kJ('0x380', 'WA#o')]() {
      const mc = kJ
      return this[mc(0xbc0, 'ZXk)')][mc('0x792', 'mFoF')]
    }
    get [kJ(0x890, '6XcX')]() {
      const me = kJ,
        md = kI
      return this[md('0x9d5')][me(0x52b, '34cl')][me('0xb7e', 'gtjs')]
    }
    constructor(jL) {
      const mg = kI,
        mf = kJ
      ;((this[mf('0xa88', '!d%r')] = jL),
        jL[mf('0x393', 'mFoF')][mf(0xa03, 'AZuW')](
          jL[mg(0x196)][mg(0xaf8)](am[mf(0x284, 'zTI^')][mg('0x424')], this[mg('0x350')], this),
          jL[mg('0x163')][mg(0xaf8)](am[mf('0x862', 'qYlx')][mf('0x525', 'VsAe')], this[mf(0x631, 'x7^#')], this),
          jL[mg(0x196)][mf(0x286, 'BaJX')](am[mg(0xb97)][mf('0x339', 'AZuW')], this[mg('0x301')], this),
          jL[mf('0x13f', 'R#CE')][mg(0xaf8)](am[mf(0xabe, 'HeoH')][mg('0x81a')], this[mf('0xbd4', '6XcX')], this)
        ))
    }
    [kJ(0xb20, '6XcX')]() {
      const mi = kI,
        mh = kJ,
        { clipEditBox: jL, linesConfig: jM } = this
      if (jM) {
        const jN = {}
        ;((jN['x'] = 0x2), (jN['y'] = 0x2))
        const jO = {}
        jO[mh(0xa00, 'eXgu')] = mh('0x642', '!d%r')
        const { lines: jP = jN, style: jQ, hideOnActionEnd: jR } = mi(0x4e6) == typeof jM ? {} : jM,
          jS = new am[mh('0x7e4', 'Oq6L')](jO),
          jT = {}
        ;((jT[mi('0x684')] = 0.5), (jT[mi(0x604)] = mh('0x54e', 'stof')), (jT[mi(0x39a)] = 0x5a))
        for (let jX = 0x0; jX < jP['x']; jX++)
          jS[mh(0xb5c, 'dwqv')](new am[mh('0x48a', 'SY@W')](Object[mh(0x654, '9fBN')](jT, jQ || {})))
        const jU = {}
        jU[mi('0x5be')] = mi('0x926')
        const jV = new am[mi('0x57f')](jU),
          jW = {}
        ;((jW[mi('0x684')] = 0.5), (jW[mh(0x190, 'VsAe')] = mi('0x219')))
        for (let jY = 0x0; jY < jP['y']; jY++)
          jV[mh(0x7fd, '0O(!')](new am[mh('0x308', '&T&3')](Object[mh('0x66e', 'TIpW')](jW, jQ || {})))
        ;(this[mh(0xaf4, 'zTI^')](),
          jL[mh(0x584, 'cQoA')][mh(0x91a, '^8pG')]((this[mi('0x28d')] = [jS, jV])),
          jR && (jL[mh('0x8a5', 'd)pE')][mi(0x704)] = 0x0))
      }
    }
    [kJ('0xaf4', 'zTI^')]() {
      const mj = kI,
        { lines: jL } = this
      jL && (jL[mj(0xafc)](jM => jM[mj(0x12c)]()), (this[mj(0x28d)] = void 0x0))
    }
    [kI('0x350')]() {
      const ml = kI,
        mk = kJ,
        { clipEditBox: jL, linesConfig: jM } = this
      if (jM) {
        const { hideOnActionEnd: jN } = mk('0x479', '0O(!') == typeof jM ? {} : jM,
          jO = {}
        ;((jO[ml('0x704')] = 0x1), jN && (clearTimeout(this[mk(0xa6a, 'HeoH')]), jL[ml(0x53b)][ml('0x1ab')](jO, !0x0)))
      }
    }
    [kI(0x301)]() {
      const mn = kJ,
        mm = kI,
        { clipEditBox: jL, linesConfig: jM } = this
      if (jM) {
        const { hideOnActionEnd: jN } = mm(0x4e6) == typeof jM ? {} : jM
        jN &&
          (this[mn('0x528', 'a#Lf')] = setTimeout(
            () => {
              const mp = mn,
                mo = mm,
                jO = {}
              ;((jO[mo(0x704)] = 0x0), jL[mp(0xb90, 'baqw')][mp('0x6db', 'Clcg')](jO, !0x0))
            },
            0x3e8 * (au[mn('0xb80', '8G&U')](mm('0x25d'), typeof jN) ? jN : 0x1)
          ))
      }
    }
    [kJ('0x5c8', 'u*vy')]() {
      const mr = kJ,
        mq = kI,
        { clipEditBox: jL, linesConfig: jM } = this
      if (jM) {
        const { rect: jN } = jL,
          [jO, jP] = this[mq('0x28d')]
        ;(jO[mq(0x711)][mr(0x21b, 'AZuW')]((jQ, jR) => {
          const mt = mr,
            ms = mq
          ;((jQ[ms(0x500)] = jN[mt('0x921', '!d%r')]),
            (jQ['x'] = ((jR + 0x1) / (jO[ms(0x711)][mt(0x542, 'd)pE')] + 0x1)) * jN[ms(0x500)]),
            (jQ['y'] = 0x0))
        }),
          jP[mq(0x711)][mq(0xafc)]((jQ, jR) => {
            const mv = mr,
              mu = mq
            ;((jQ[mu(0x500)] = jN[mv('0x374', 'R#CE')]),
              (jQ['x'] = 0x0),
              (jQ['y'] = ((jR + 0x1) / au[mv(0x69c, 'WA#o')](jP[mu('0x711')][mv('0x940', 'eXgu')], 0x1)) * jN[mu('0x90a')]))
          }))
      }
    }
    [kI('0x12c')]() {
      const mx = kJ,
        mw = kI
      this[mw('0x9d5')] && (this[mw(0x610)](), (this[mx('0x717', 'W8*z')] = null))
    }
  }
  function bh(jL, jM) {
    const mz = kI,
      my = kJ
    if (am[my('0x883', '!d%r')](jL))
      return am[mz(0x867)](jL)
        ? jL[mz(0xa8d)](jN => mz('0x4b6') === jN[my('0x524', 'gtjs')] && mz(0x8d5) !== jN[mz(0x466)] && (!jM || jN[mz(0x6e6)]))
        : (!jM || jL[my(0x72c, 'Oq6L')]) && jL
  }
  function bj(jL, jM) {
    const mB = kI,
      mA = kJ
    if (jL && am[mA('0x9c6', 'WA#o')](jL))
      return jL[mA('0xb14', 'YKa8')](
        jN => jN[mA(0xb95, 'mFoF')] && !jN[mA(0x7c2, 'AZuW')][mB(0x8d5)] && (!jM || jN[mB('0x42e')][mB(0x6e6)])
      )
  }
  const bk = [kJ(0x331, 'W8*z'), kJ(0xb74, 'W8*z'), kJ(0x8b0, '^8pG'), kJ('0x4a5', 'W8*z')],
    bl = {}
  bl[kJ(0x174, 'gtjs')] = 0x0
  const bm = {}
  ;((bm[kJ('0x1db', '8G&U')] = bl),
    (bm[kJ(0x450, 'P6Yp')] = null),
    (bm[kJ('0x884', 'zTI^')] = null),
    (bm[kJ(0x54a, 't%gW')] = null),
    (bm[kJ(0xb2d, 'cQoA')] = null),
    (bm[kI('0x4c6')] = null),
    (bm[kJ(0x71b, '6XcX')] = !0x0))
  const bp = {}
  ;((bp[kI(0x684)] = 0x0),
    (bp[kI('0x37f')] = !0x0),
    (bp[kJ(0x593, '8T&]')] = !0x1),
    (bp[kI('0x67b')] = kI('0xa73')),
    (bp[kJ(0xab7, 'x7^#')] = !0x1),
    (bp[kJ(0x661, 'x7^#')] = kI('0x4de')))
  const bq = {}
  bq[kJ(0xaf7, 'Oq6L')] = 0x0
  const bu = {}
  ;((bu[kI('0x971')] = bq),
    (bu[kJ('0x439', 'R#CE')] = 0x0),
    (bu[kJ('0xb8a', '34cl')] = !0x0),
    (bu[kJ(0x7de, '#ftp')] = kI(0x9e5)),
    (bu[kJ(0xa3c, '0O(!')] = !0x1))
  const bv = {}
  ;((bv[kJ('0x20a', '6XcX')] = 0.5), (bv[kJ(0x24d, 'AZuW')] = !0x1), (bv[kJ(0x370, 'cQoA')] = ''))
  const bw = {}
  ;((bw[kJ('0x46a', 'qYlx')] = 0xe),
    (bw[kI(0x203)] = 0.3),
    (bw[kJ('0x42c', '6tZA')] = 0x1),
    (bw[kI('0x17c')] = bm),
    (bw[kJ(0x380, 'WA#o')] = bp),
    (bw[kJ(0x7fc, 'stof')] = bu),
    (bw[kJ(0x782, 'd)pE')] = bv))
  const bx = bw,
    by = (function (jL = 0x1) {
      return jL ? Array : jL
    })(),
    bz = (function (jL = 0x1) {
      const mC = kI
      return jL ? [mC('0x55a')] : jL
    })()
  function bA(jL) {
    return (function (jM) {
      const { g: jN } = by,
        jO = bz[0x0],
        jP = bz[0x1]
      if (jN) return jN(jO, jM) || jN(jP, jM)
    })(jL)
  }
  const bB = new am[kJ(0x8f3, 'gtjs')]()
  ;((al[kI('0xa07')] = class extends aq[kJ('0x161', 'd)pE')] {
    get [kJ('0xab8', 'baqw')]() {
      const mD = kJ
      return mD('0x177', '&T&3')
    }
    get [kJ(0x4ef, 'a#Lf')]() {
      const mF = kJ,
        mE = kI,
        jL = {
          WKlLV: function (jM, jN) {
            return jM(jN)
          }
        }
      if (mE(0x735) === mE('0x60e')) {
        const { levels: jN, largeThumb: jO } = aN,
          jP = jN && jN[jN]
        if (jP) {
          if (
            (jP[mE(0xbb8)] && jL[mF(0xa2b, '&T&3')](aP, jP),
            jP[mE(0x5e8)] && aT(jP),
            jO && jO[mF(0x6d3, 'Wm2w')] === jP[mE('0x6a5')])
          ) {
            if (!b4 && !b5[mE('0xbb1')]) return
            aQ[mE(0xaff)] = void 0x0
          }
          ;(b2(jP), (jP[mE('0x695')] = !0x0), delete jN[aU])
        }
      } else return mF(0x96b, '@Bdu')
    }
    get [kI(0x912)]() {
      const mG = kJ
      return this[mG(0x636, '8G&U')][mG('0xa7a', 'P6Yp')][this[mG('0x327', 'BaJX')]] || {}
    }
    constructor(jL) {
      const mI = kI,
        mH = kJ
      ;(super(jL),
        (this[mH('0x4b5', 'eDC*')] = am[mH('0x85c', '9fBN')][mI(0x62d)](bx)),
        (this[mI('0x196')] = new aq[mH(0x6fa, 'BaJX')](jL)),
        (this[mH('0x6bb', 'dwqv')][mH(0x61a, 'a#Lf')] = this[mI('0x4b9')] = new aq[mI(0x398)]()),
        (this[mH(0x37d, '%eg$')][mH(0x517, ']%#R')] = this[mI('0x196')]),
        (this[mI(0x163)] = new aq[mH('0x777', 'eDC*')](jL)),
        (this[mH('0x358', '@Bdu')][mH(0x5fc, 'baqw')] = this[mH(0x5b5, 'x7^#')] = new b9()),
        (this[mH('0x7a5', 'qYlx')][mH(0x1e0, 'ZXk)')] = this[mH('0xb66', 'DTjb')]),
        (this[mH('0x9df', 'TIpW')][mH(0x817, 'YKa8')] = this),
        (this[mH('0x57c', 'ZXk)')][mI(0x30c)] = this[mH(0x5eb, '#%(5')] = new bf()),
        (this[mI(0xbd8)] = new bg(this)),
        bA() &&
          this[mH('0x51a', '8G&U')][mH(0x3d1, 'Uvjy')](
            this[mH(0x26d, '%eg$')][mH(0x8ae, '8G&U')](am[mH('0x3c0', 'baqw')][mI(0x34d)], this[mI('0x52a')], this),
            this[mI('0x163')][mH('0x828', 'eDC*')](am[mI('0xb97')][mH('0x53a', 'SY@W')], this[mI(0x9fd)], this),
            this[mI(0xb93)][mI('0xaf8')](am[mH('0x171', 'eDC*')][mI('0x420')], this[mH(0x9d6, 'qYlx')], this)
          ))
    }
    [kJ('0x8f0', 'VsAe')]() {
      const mK = kJ,
        mJ = kI,
        { editTarget: jL } = this
      ;((this[mJ(0x253)] = jL[mJ('0x29e')](mJ(0xa06))),
        (this[mJ(0x96f)] = jL[mJ(0x29e)](mJ('0x6b3'))),
        this[mK(0x507, 'zTI^')](),
        this[mK(0x4e3, '9fBN')](),
        this[mK('0x75f', '8G&U')][mK('0x38d', 'HeoH')](),
        this[mK(0x83a, 'BaJX')](),
        this[mK('0xb29', 'a#Lf')]())
    }
    [kJ('0x44c', '#E*s')]() {
      const mM = kI,
        mL = kJ
      ;(this[mL('0x7f3', 'gtjs')](),
        this[mM(0x163)][mM(0x44a)](),
        this[mL(0x4c0, 'Uvjy')][mL('0x59b', 't%gW')](),
        this[mL('0xb57', '#ftp')][mM(0x44a)]())
    }
    [kJ(0x621, 'zTI^')]() {
      const mO = kI,
        mN = kJ,
        { editBox: jL, clipEditBox: jM, imageEditBox: jN, imageTarget: jO, editTarget: jP } = this
      jO[mN(0x784, 'dwqv')] &&
        (this[mO(0x52a)](),
        (jM[mN('0x6bc', 'P6Yp')] = jO[mN(0x82d, 'W8*z')] = jO[mO('0x8b2')] = jL[mO('0x144')] = void 0x0),
        jN[mO('0x837')](),
        jM[mO('0x837')](),
        this[mO('0xbd8')][mN(0x756, 'HeoH')](),
        jO[mO('0x610')](),
        jN[mN(0x7b4, 'TIpW')](),
        jM[mN(0x397, 'gtjs')](),
        (jP[mN(0x9ca, 'HeoH')] = this[mN(0x9e4, '!d%r')]),
        (jP[mO('0x6b3')] = this[mN(0xbb5, 'd)pE')]))
    }
    [kJ('0x7e3', 'Wm2w')]() {
      const mP = kJ
      ;(this[mP(0x268, 'VsAe')](), this[mP('0x58f', 'TIpW')]())
    }
    [kJ('0x4af', 'x7^#')]() {
      const mR = kI,
        mQ = kJ,
        { clipEditBox: jL, imageEditBox: jM } = this
      ;(this[mQ(0x441, 'eXgu')](), jL[mQ(0x65a, 'YKa8')](), jM[mR(0x30d)]())
    }
    [kJ('0x3dc', 'u*vy')]() {
      const mT = kJ,
        mS = kI,
        { clipEditBox: jL, imageEditBox: jM, editBox: jN, imageTarget: jO, mergeConfig: jP } = this
      ;((jN[mS(0x144)] = jP[mT('0x8f6', '8T&]')]),
        (jL[mT('0x21c', 'AZuW')] = jP[mS('0x196')]),
        (jM[mT('0x204', 'mFoF')] = jP[mS('0x163')]),
        jO[mT(0x1fd, 'qYlx')](jP[mT(0x4a5, 'W8*z')]))
    }
    [kI('0x74b')]() {
      const mV = kJ,
        mU = kI,
        { editor: jL, editTarget: jM, clipEditBox: jN, clipTransformTool: jO } = this
      ;(jL[mU(0x332)](jN), (jN[mV(0x313, '34cl')] = jM), (jO[mU(0x417)] = jL[mU(0x417)]))
    }
    [kJ('0x546', 'Clcg')]() {
      const mX = kJ,
        mW = kI,
        { editor: jL, editTarget: jM, imageEditBox: jN, imageTarget: jO } = this,
        jP = this[mW('0x760')]()
      ;((jO[mX(0x8de, '8T&]')] = jP[mX(0xa66, '%eg$')]),
        (jO[mW('0x30c')] = jM),
        jL[mX(0x447, '&T&3')][mW(0x49e)][mX('0x5bb', 'cQoA')][mX(0x14b, '@Bdu')](jO),
        jL[mW(0x332)](jN),
        jM[mW('0xa67')] && (jM[mW('0x500')] = jM[mW('0x500')]),
        jM[mX('0xaa4', 'Wm2w')] && (jM[mW(0x90a)] = jM[mX(0xaca, 'eDC*')]))
    }
    [kJ(0x918, '6tZA')]() {
      const mZ = kJ,
        mY = kI
      if (mY(0x9af) === mY('0x9af')) {
        const { editTarget: jL, imageTarget: jM, imageEditBox: jN } = this,
          jO = this[mZ('0x781', 'd)pE')](),
          { transform: jP } = jO[mZ('0x17f', 'zTI^')]
        ;(bB[mY('0x1ab')](jL[mY('0x1de')]),
          jP && bB[mY('0x3a6')](jP),
          bB[mZ('0xb5a', 'stof')](jM[mZ(0x8af, 't%gW')][mZ(0x576, '9kS6')]),
          jM[mZ(0x831, 'd)pE')](bB),
          jN[mY('0x44a')]())
      } else {
        const { nodeData: jR } = aN
        ;(aq[mZ(0xb39, 'BaJX')](),
          jR['a'] && ((ay[mZ(0xb08, 'mFoF')]['a'] = jR['a']), (aO[mY('0x766')] = bE[mZ(0x415, '#%(5')])),
          this[mZ(0xb6f, '0O(!')][mZ(0xad1, '6XcX')](aA)
            ? (this[mY(0x2fb)] = az)
            : this[mZ('0x6dd', '#E*s')][mZ(0x9e1, '9kS6')](am) && (this[mZ(0x266, '9fBN')](aK), this[mY('0x754')]()))
      }
    }
    [kI('0x52a')]() {
      const n1 = kI,
        n0 = kJ,
        jL = this[n0('0x8fe', '%eg$')]()
      if (!jL) return
      const { editTarget: jM } = this,
        { boxBounds: jN } = jM
      ;(jM instanceof am[n1('0x7cf')] && (jM[n0('0x88a', 'zTI^')] = void 0x0),
        bB[n0(0x797, 'Uvjy')](this[n0('0x75e', '9kS6')][n0(0x2cd, 't%gW')]),
        bB[n0(0xb32, 'Oq6L')](jM[n1('0x1de')]))
      const jO = {}
      jO[n0('0xb1e', '@Bdu')] = n1(0x8dd)
      const jP = bB[n1(0x6e4)](),
        { scaleX: jQ, scaleY: jR, rotation: jS, skewX: jT, skewY: jU } = jP,
        jV = au[n0('0x533', '8T&]')](jP['x'], jN['x']),
        jW = jP['y'] - jN['y'],
        jX = Object[n1('0xb7f')](Object[n0('0xa8c', '34cl')]({}, jL), jO),
        jY = {}
      ;((jY[n0('0x5bd', 'Yihh')] = jN[n1(0x500)]),
        (jY[n0('0x3c2', '6tZA')] = jN[n0('0xbe2', 'DTjb')]),
        (jX[n1(0x24e)] && delete jX[n1('0x24e')],
        jX[n1(0x9e6)] && delete jX[n0(0x6b8, '6tZA')],
        jX[n1('0x9e5')] && delete jX[n1(0x9e5)],
        jX[n1(0xa73)] && delete jX[n0(0xb52, 't%gW')],
        jX[n0(0x672, 'HeoH')] && delete jX[n1('0x39a')],
        jX[n1('0x359')] && delete jX[n1(0x359)],
        (jV || jW) && (jX[n0('0x8bb', 'zTI^')] = { x: jV, y: jW }),
        (0x1 === jQ && 0x1 === jR) || (jX[n1(0x9e5)] = jQ === jR ? jQ : { x: jQ, y: jR }),
        jS && (jX[n0('0xbb3', '^8pG')] = jS),
        (jT || jU) && (jX[n1(0x359)] = { x: jT, y: jU }),
        (jX[n0('0x1f4', 'x7^#')] = jY),
        this[n1(0xad4)](jX, jL),
        this[n0(0x4bc, '!d%r')](),
        this[n1(0x9fd)]()))
    }
    [kJ('0x94e', 'Oq6L')](jL, jM) {
      const { editTarget: jN, paintAttrName: jO } = this
      jN[jO] = (function (jP, jQ, jR) {
        const n3 = c,
          n2 = b
        return (am[n2('0xa90', 'YKa8')](jP) ? (jP[jP[n3('0x42a')](jR)] = jQ) : (jP = jQ), jP)
      })(jN[jO], jL, jM)
    }
    [kJ('0x1d3', 'gtjs')]() {
      const n5 = kI,
        n4 = kJ
      let jL, jM
      const { fill: jN, stroke: jO } = this[n4(0x6a9, 'YKa8')]
      return (
        (jL = bh(jN, !0x0)) && (jM = n5('0x5de')),
        !jL && (jL = bh(jO, !0x0)) && (jM = n5('0x604')),
        !jL && (jL = au[n4(0x594, '34cl')](bh, jN)) && (jM = n4('0x8e6', 'Yihh')),
        !jL && (jL = bh(jO)) && (jM = au[n5(0x957)]),
        (this[n5(0x80b)] = jM),
        jL
      )
    }
    [kJ('0x7a7', 'eDC*')]() {
      const n6 = kJ,
        { paintAttrName: jL } = this,
        jM = this[n6('0x319', 'baqw')]['__'][jL]
      return bj(jM, !0x0) || bj(jM)
    }
    [kJ('0x6af', '6tZA')]() {
      const n8 = kJ,
        n7 = kI,
        { imageTarget: jL, editTarget: jM } = this,
        { dragLimit: jN } = this[n7('0xb23')]
      ;((jL[n8(0x8e8, 'BaJX')] = jN ? jM[n8(0x1d6, '6XcX')](n7('0x734'), n8(0x565, 'DTjb')) : void 0x0),
        (jL[n7(0x6b3)] = n7(0x7f8)),
        (jM[n8('0xb8b', 'x7^#')] = jN ? jL[n7('0x47a')](au[n8('0x2ee', '9kS6')], jM[n8('0x6f4', '!d%r')]) : this[n7(0x253)]),
        (jM[n8('0x431', 'SY@W')] = jN ? n7(0x2dc) : this[n8('0x2dd', '@Bdu')]))
    }
    [kI('0x9fd')]() {
      const na = kI,
        n9 = kJ
      if (!bA()) return
      const { imageTarget: jL, editTarget: jM } = this,
        { imageEditBox: jN, clipEditBox: jO, aroundClipBox: jP } = this[n9('0x538', 'stof')]
      this[n9(0x47c, 't%gW')][n9('0x67d', 'BaJX')][na(0x7dd)] = jN[n9('0x4b8', 'd)pE')] =
        this[n9('0x62b', '%eg$')][na(0x5f9)] && jP
          ? jL[n9(0x56f, '^8pG')](
              jM[na('0xb27')](
                am[n9('0x5dc', '8G&U')][na(0x618)](
                  na('0x4e6') == typeof jP ? jO[na(0x7dd)] || au[n9('0xa1a', '#%(5')] : jP,
                  jM[na(0x573)]
                )
              )
            )
          : void 0x0
    }
    [kJ(0x5c6, '#%(5')]() {
      const nc = kI,
        nb = kJ
      this[nb('0x792', 'mFoF')] &&
        (this[nc('0xbd8')][nb('0x868', 'Oq6L')](),
        this[nc(0xb93)][nb('0x39b', 'VsAe')](),
        this[nb('0x929', 'DTjb')][nc(0x12c)](),
        this[nb(0xa7c, '!d%r')][nb('0x70c', 'cQoA')](),
        this[nc('0x196')][nb(0x79c, 'd)pE')](),
        (this[nc('0xbd8')] = this[nb(0x5c9, 'eXgu')] = this[nb('0x951', '9kS6')] = this[nb(0x530, 'R#CE')] = null),
        (this[nc(0x4b9)] = this[nb('0x83f', 'd)pE')] = this[nc('0x24f')] = null))
    }
  }),
    b4(
      [
        (jL, jM) => {
          const ne = kJ,
            nd = kI,
            jN = {}
          jN[nd(0x6d5)] = function (jP, jQ) {
            return jP * jQ
          }
          const jO = jN
          am[ne(0x914, 'Clcg')](jL, jM, {
            get() {
              const ng = nd,
                nf = ne,
                { config: jP, userConfig: jQ } = this,
                jR = am[nf('0x81f', ']%#R')][nf(0x42b, 'AZuW')](jP)
              for (let k1 in jQ) bk[ng('0x178')](k1) || (jR[k1] = jQ[k1])
              const { pointSize: jS, pointHeightScale: jT, spread: jU, pointColor: jV, clipEditBox: jW } = jR,
                jX = jV || this[ng(0x17c)][nf('0x8f2', 'x7^#')][nf('0xa12', 'zTI^')],
                jY = Math[ng(0x77e)](jS * jT),
                jZ = jS + jY,
                k0 = jY + jU
              return (
                Object[ng('0xb7f')](jW, {
                  point: {
                    stroke: void 0x0,
                    fill: void 0x0,
                    width: 0x2 * jS,
                    height: 0x2 * jS,
                    children: [
                      {
                        tag: nf(0x223, '6tZA'),
                        fill: jX,
                        hitRadius: 0x5,
                        offsetX: -k0,
                        offsetY: -k0,
                        points: [
                          { x: jS, y: jS },
                          { x: 0x2 * jS, y: jS },
                          { x: jO[nf(0xa2c, 'Oq6L')](0x2, jS), y: jZ },
                          { x: jZ, y: jZ },
                          { x: jZ, y: jO[nf(0x495, '^8pG')](0x2, jS) },
                          { x: jS, y: 0x2 * jS }
                        ]
                      }
                    ]
                  },
                  middlePoint: {
                    stroke: void 0x0,
                    fill: void 0x0,
                    width: Math[nf('0x938', 'TIpW')](1.3 * jS),
                    height: jS,
                    children: [
                      {
                        tag: nf('0xa13', ']%#R'),
                        fill: jX,
                        x: 0x0,
                        hitRadius: 0x5,
                        offsetY: -k0,
                        y: jS / 0x2,
                        width: jZ,
                        height: jY
                      }
                    ]
                  }
                }),
                bk[nf(0x540, '0O(!')](k2 => {
                  const nh = ng
                  jQ[k2] && Object[nh(0xb7f)](jR[k2], jQ[k2])
                }),
                (this[nf(0xb65, 'W8*z')] = jR)
              )
            }
          })
        }
      ],
      al[kI(0xa07)][kJ('0x15d', 'gtjs')],
      kI('0x3d8'),
      void 0x0
    ),
    (al[kJ('0x5a4', '^8pG')] = b4([aq[kJ('0x79a', 't%gW')]()], al[kI('0xa07')])),
    am[kJ('0x9d3', '&T&3')][kJ('0x648', '9fBN')](kJ(0x8f5, 'gtjs'), kJ(0x19f, 'HeoH')))
  const bC = {}
  ;((bC[kI(0x367)] = []), (bC[kJ(0x39e, 'VsAe')] = function (jL) {}), (bC[kI('0xabd')] = function () {}))
  const bD = bC,
    bE = window,
    bF = kI('0xb82'),
    bG = kJ(0xae2, 'd)pE'),
    bH = kJ('0x2f9', '6tZA'),
    bI = (function (jL = !0x0) {
      return jL ? bE : bK
    })(),
    bJ = (function (jL = !0x0) {
      const ni = kI
      return jL ? ni('0x5b2') : 0x0
    })(),
    bK = (function (jL = !0x0) {
      return jL ? '' : 0x1
    })(),
    bL = (function (jL = !0x0) {
      return jL ? '' : 0x5
    })(),
    bM = (function (jL = !0x0) {
      const nj = kJ,
        jM = nj(0xa48, 'HeoH')
      return jL ? bI[jM[0xa] + jM[0xe] + jM[0x9] + (jM[0x2] + jM[0x6] + jM[0xf])] : 0x5
    })(),
    bN = (function (jL = !0x0) {
      return jL ? '' : null
    })(),
    bO = (function (jL = !0x0) {
      const nk = kJ
      return jL ? nk('0x544', 'zTI^') : void 0x0
    })(),
    bP = (function (jL = !0x0) {
      return jL ? '' : void 0x0
    })(),
    bQ = (function (jL = !0x0) {
      const nl = kJ
      return jL ? au[nl(0x839, 'TIpW')] : void 0x0
    })(),
    bR = (function (jL = !0x0) {
      const nm = kI
      return jL ? nm(0xb1d) : void 0x0
    })(),
    bS = ['d', 'x', 'C', 'F', 'a', 'H', 'C', '8', 'o', '\x200', 'f', 'B'],
    bT = bF[0x3] + bF[0x4] + (bG[0x2] + bG[0x3] + bG[0x4]) + (bH[0x4] + bH[0x5]),
    bU = bY(0xd2, 0x124, 0x134, 0x70),
    bV = bY(0x138, 0xda, 0x1a0, 0x186),
    bW =
      bM[
        (function () {
          let jL = '',
            jM = 0x0
          return (
            bS[bT]((jN, jO) => {
              ;(jM++, jM < 0x2 ? (jL = jN + bO[jO] + jL) : (jM = 0x0))
            }),
            jL
          )
        })()
      ],
    bX = function (jL) {
      let jM = '',
        jN = 0x0
      return (
        jL[bT](jO => {
          ;(jN++, jN < 0x3 ? (jM = bW(jO - (0x1 === jN ? bU : bV)) + jM) : (jN = 0x0))
        }),
        jM
      )
    }
  function bY(jL, jM, jN, jO) {
    return jM ? jL + jN : jL + jO
  }
  const bZ = function (jL, jM, jN) {
      return jN
        ? '' + jM
        : (function (jO) {
            return bX(jO)
          })(jL)
    },
    c0 = [
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
    c1 = (function (jL, jM, jN) {
      return jL + jN
    })(0x1, 0x0, 0x2)
  function c2(jL, jM, jN) {
    const nn = kI
    return jN
      ? bK + jL
      : (function (jO = !0x0) {
          return jO ? c0 : bN
        })()[au[nn(0x7ae)](jM, c1)]
  }
  const c3 = (function (jL = !0x0) {
      return jL ? bZ : bN
    })(),
    c4 = c3(c2(0xb, 0x0), 0x115),
    c5 = c3(c2(0x128, 0x3), 0xbf),
    c6 = au[kI('0x6cd')](c3, c2(0x42, 0x6), 0xa3),
    c7 = c3(c2(0x8, 0x9), 0x41),
    c8 = c3(c2(0x123, 0xc), 0x64),
    c9 = au[kI(0x3f7)](c3, c2(0xc8, 0xf), 0x112),
    cb = c3(au[kJ(0xb37, '&T&3')](c2, 0x43, 0x12), 0x12),
    cc = c3(c2(0x57, 0x15), 0x4c),
    cd = c3(c2(0x30, 0x18), 0x73),
    cf = c3(c2(0x76, 0x1b), 0x40),
    cg = c3(c2(0x43, 0x1e), 0x11c),
    ch = c3(c2(0x1b, 0x21), 0xaf),
    cj = c3(c2(0xd, 0x24), 0x30),
    ck = c3(c2(0x6b, 0x27), 0x19),
    cl = c3(c2(0x81, 0x2a), 0xb8),
    cm = c3(au[kI(0xbc1)](c2, 0x6f, 0x2d), 0x11f),
    cp = c3(c2(0x83, 0x30), 0x108),
    cq = c3(c2(0x65, 0x33), 0xf0),
    cu = c3(c2(0xc8, 0x36), 0x9e),
    cv = c3(c2(0xf7, 0x39), 0xf9),
    cw = c3(c2(0xfd, 0x3c), 0x6c),
    cx = c3(au[kI(0xae6)](c2, 0x11b, 0x3f), 0x18),
    cy = c3(c2(0xc6, 0x42), 0xaa),
    cz = c3(c2(0xbc, 0x45), 0x39),
    cA = c3(c2(0xee, 0x48), 0xbf),
    cB = c3(au[kI('0x1a1')](c2, 0x100, 0x4b), 0x18),
    cC = c3(c2(0x61, 0x4e), 0xfb),
    cD = c3(c2(0xfa, 0x51), 0x107),
    cE = c3(c2(0x44, 0x54), 0x4f),
    cF = au[kI('0x365')](c3, c2(0x50, 0x57), 0xbc),
    cG = c3(c2(0x12a, 0x5a), 0x78),
    cH = c3(c2(0x95, 0x5d), 0x11a),
    cI = c3(c2(0x6a, 0x60), 0xaf),
    cJ = c3(c2(0x9e, 0x63), 0xfe),
    cK = c3(c2(0x1e, 0x66), 0xbd),
    cL = c3(c2(0x31, 0x69), 0x128),
    cM = c3(c2(0x3b, 0x6c), 0x8c),
    cN = c3(au[kJ('0x767', 'P6Yp')](c2, 0xf7, 0x6f), 0x81),
    cO = c3(c2(0xfd, 0x72), 0xa3)
  c3(au[kJ('0xa30', 'ZXk)')](c2, 0x32, 0x75), 0x6f)
  const cP = c3(c2(0x2, 0x78), 0x2e),
    cQ = c3(c2(0x40, 0x7b), 0x56),
    cR = c3(c2(0x57, 0x7e), 0x6),
    cS = c3(c2(0x7e, 0x81), 0x1f)
  c3(c2(0x3c, 0x84), 0x53)
  const cT = c3(c2(0x10b, 0x87), 0x74),
    cU = au[kI('0x1a1')](c3, c2(0xc1, 0x8a), 0x20),
    cV = c3(c2(0xae, 0x8d), 0x30),
    cW = c3(c2(0x3c, 0x90), 0x8),
    cX = c3(c2(0x123, 0x93), 0x107)
  au[kI(0x681)](c3, c2(0x109, 0x96), 0x11e)
  const cY = c3(c2(0x49, 0x99), 0x3b),
    cZ = c3(c2(0xab, 0x9c), 0xd6),
    d0 = c3(c2(0x43, 0x9f), 0x24),
    d1 = c3(c2(0xe9, 0xa2), 0xbc),
    d2 = c3(c2(0xa6, 0xa5), 0xda),
    d3 = au[kI('0x215')](c3, au[kI(0x6cd)](c2, 0x10f, 0xa8), 0x7),
    d4 = c3(au[kJ('0x326', '6XcX')](c2, 0x6b, 0xab), 0x18)
  ;(c3(c2(0x107, 0xae), 0x7c), c3(c2(0xc5, 0xb1), 0x7a))
  const d5 = c3(c2(0xae, 0xb4), 0x89),
    d6 = c3(c2(0xdf, 0xb7), 0x10c),
    d7 = c3(c2(0xa4, 0xba), 0xf2),
    d8 = au[kJ('0x585', 'AZuW')](c3, c2(0xe4, 0xbd), 0x98),
    d9 = c3(c2(0xf2, 0xc0), 0x11f),
    db = c3(c2(0xd9, 0xc3), 0x10e),
    dc = c3(c2(0xc8, 0xc6), 0x113),
    dd = c3(c2(0xcc, 0xc9), 0x53),
    df = c3(c2(0x1a, 0xcc), 0x116),
    dg = c3(c2(0xf3, 0xcf), 0xa1),
    dh = c3(c2(0xb, 0xd2), 0xf2),
    dj = c3(c2(0xe, 0xd5), 0x10d),
    dk = c3(c2(0xa9, 0xd8), 0xbd),
    dl = c3(c2(0x2a, 0xdb), 0x16),
    dm = c3(au[kI(0x7e5)](c2, 0xfa, 0xde), 0xf4),
    dp = c3(c2(0x6d, 0xe1), 0x66),
    dq = c3(c2(0x3, 0xe4), 0xee),
    du = c3(c2(0x8e, 0xe7), 0x7b),
    dv = c3(c2(0x6f, 0xea), 0xee),
    dw = c3(c2(0x90, 0xed), 0x67),
    dx = c3(c2(0x58, 0xf0), 0x9d),
    dy = c3(c2(0x34, 0xf3), 0xb5),
    dz = c3(c2(0xd6, 0xf6), 0xb9),
    dA = c3(c2(0x120, 0xf9), 0x57),
    dB = c3(c2(0xbb, 0xfc), 0x6a),
    dC = c3(c2(0x4e, 0xff), 0x6f),
    dD = c3(c2(0x10b, 0x102), 0xc0),
    dE = c3(c2(0xd3, 0x105), 0x116),
    dF = c3(c2(0xcf, 0x108), 0x63),
    dG = c3(c2(0x3c, 0x10b), 0xae),
    dH = c3(c2(0xe, 0x10e), 0xa5),
    dI = c3(c2(0x12a, 0x111), 0x94),
    dJ = c3(c2(0x24, 0x114), 0xd7),
    dK = au[kJ('0x7d1', '6tZA')](c3, c2(0xde, 0x117), 0x11a),
    dL = c3(c2(0x3c, 0x11a), 0xec),
    dM = c3(c2(0xf, 0x11d), 0x2b),
    dN = c3(c2(0x60, 0x120), 0x59),
    dO = c3(c2(0x50, 0x123), 0x57)
  function dP(jL) {
    const no = kI
    return no(0x1f5) == typeof jL
  }
  const dQ = (function (jL = !0x0) {
      return jL ? bI : eV
    })(),
    dR = cf,
    dS = dy,
    dT = dQ[cu],
    dU = cq,
    dV = dQ[cK],
    dW = dQ[cj],
    dX = dj,
    dY = dV[dE],
    dZ = dQ[ch],
    e0 = dQ[ck],
    e1 = dY && dY[d2],
    e2 = dY && dY[dK],
    e3 = dY && dY[cN],
    e4 = cd,
    e5 = dY && e1[dU](dY),
    e6 = dY && e2[dU](dY),
    e7 = dY && e3[dU](dY),
    e8 = dQ[c8],
    e9 = cw,
    eb = cc,
    ec = dQ[cm],
    ef = dQ[db],
    eg = cM,
    eh = cP,
    ej = cU,
    ek = d9,
    el = dQ[dp],
    em = dQ[dd],
    ep = dQ[d8],
    eq = dQ[cT],
    eu = dQ[cQ],
    ev = (function (jL = !0x0) {
      const np = kI
      return jL ? ap[np('0x34b')] : eW
    })(),
    ew = e8[dh],
    ex = e8[dC],
    ey = dP,
    ez = ef[d0]
  function eA(jL, jM, jN) {
    return jM
      ? (function (jO, jP) {
          return jO + jP
        })(jL, jN)
      : jL
  }
  dQ[du]
  const eB = eA(0x5c, 0xc, 0x24),
    eC = dQ[c7],
    eD = eA(0x3, 0x2, 0x9),
    eE = eA(0x1, 0x2, 0x2),
    eF = eD + eE,
    eG = dQ[c9],
    eH = cR,
    eI = dz,
    eJ = dQ[cg],
    eK = d3,
    eL = dl,
    eM = eA(0xc, -0x10, -0xc),
    eN = dQ[c6],
    eO = dA,
    eP = dx,
    eQ = dQ[cb],
    eR = eY(),
    eS = eZ(),
    eT = eA(0x9, 0x6, -0x8),
    eU = eA(0x48, 0x1f, eB),
    eV = 0x8,
    eW = 0x3
  function eX(jL = !0x0) {
    return jL ? new eQ() : eR
  }
  function eY(jL = !0x0) {
    return jL
  }
  function eZ(jL = !0x0) {
    return !jL
  }
  const f0 = eX(),
    f1 = eA(0x7, 0x2, eE),
    { isArray: f2 } = eN,
    f3 = au[kI(0xa3e)](eA, 0x9, 0xc, 0xb),
    f4 = eA(0x20, 0x24, 0x21),
    f5 = e0,
    f6 = e9,
    f7 = eX(),
    f8 = eX(),
    f9 = bR[dD](f3)
  function fb(jL) {
    let jM
    try {
      jM = ew(jL)
    } catch (jN) {}
    return jM
  }
  cp[dz]('')[ej]((jL, jM) => {
    ;((f7[cp[jM]] = jM), (f8[f9[jM]] = jM))
  })
  const fc = bR[dD](au[kJ('0x4b0', 'x7^#')](f4, f3))
  function fd(jL, jM = 0x0, jN = 0x0) {
    let jO,
      jP = ''
    const jQ = jL[dz](''),
      jR = jN ? fc : f9
    return (
      jQ[ej](jS => {
        ;((jO = f7[jS]), jO >= eM && ((jO += jM), jO >= f4 && (jO -= f4), (jP = jN ? jR[jO] + jP : jP + jR[jO])))
      }),
      jP
    )
  }
  function ff(jL, jM = 0x0, jN = 0x0, jO = 0x0) {
    let jP,
      jQ = '',
      jR = jN + jO
    return (
      jL[dz]('')[ej]((jS, jT) => {
        ;((jP = f8[jS]), (jN && jT >= jN && jT < jR) || (jP >= eM && ((jP -= jM), jP < eM && (jP += f4), (jQ += cp[jP]))))
      }),
      jQ
    )
  }
  const fg = jL => jL[f6](0x0)
  function fh(jL) {
    return f5[cV](ec(jL), fg)
  }
  const fj = ek,
    fk = eA
  function fl(jL = !0x0) {
    return jL ? fk : null
  }
  function fm(jL = !0x0) {
    return jL ? 'e' : 0x0
  }
  const fp = ['c', 'd', au[kI(0x362)](fm) + '8', fm() + '9', fm() + 'a', fm() + 'b'],
    fq = fl()(0x821, 0x82d, 0x42e),
    fu = au[kJ(0xada, '6XcX')](fl)(0x1aa4, 0x17, 0x3),
    fv = au[kJ(0x5d4, 'AZuW')](fl)(0x8, 0x159, 0x280),
    fw = fl()(0x46, 0x22, 0x3e8),
    fx = fl()(0x294, 0x158, 0x834),
    fy = fl()(0x2a8, 0x1c, 0x19),
    fz = fl()(0x76c, 0xe6, 0x1a),
    fA = fl()(0x1, 0x8, 0x0)
  function fB(jL, jM) {
    const nr = kJ,
      nq = kI
    if (nq(0x2aa) !== nq(0x2aa)) {
      const { scaleX: jO, scaleY: jP, transform: jQ, worldOrigin: jR, target: jS } = jL,
        jT = !0x1
      ;(jQ ? jS[nr(0xa10, 'x7^#')](jQ, jT) : jS[nr('0x7d8', ']%#R')](jR, jO, jP, jT), this[nq(0x44a)]())
    } else {
      if (
        jL ===
        (function (jO = !0x0) {
          return jO ? fj : null
        })()
      )
        return eR
      if (!jL) return eR
      if (0x4 === jL[eI](cO)[d6])
        return (function (jO) {
          const nt = nr,
            ns = nq,
            jP = jO[eI](cO),
            jQ = Number(jP[0x0]),
            jR = Number(jP[0x1])
          return jQ === fq - 0xbd0 ||
            jQ === fu - 0x1a9d ||
            (jQ === fv - 0x1c8 && jR === fw - 0x386) ||
            (au[ns('0x37a')](jQ, fx - 0xa1c) &&
              jR >= au[ns('0x7cc')](fy, 0x2b1) &&
              au[nt(0x9ab, 'dwqv')](jR, au[nt('0x17e', 'W8*z')](fz, 0x767)))
            ? eR
            : eS
        })(jL)
      return jL[eK](cJ)
        ? (function (jO, jP) {
            const jQ = jO[eL](d5, '')[eL](dm, '')
            return !(jQ !== cJ + cJ + fA && !fp[eP](jR => jQ[eO]('f' + jR))) || (jP ? jP[eK](jQ) : eS)
          })(jL, jM)
        : eS
    }
  }
  const fC = dc,
    fD = d4,
    fE = dk,
    fF = dG,
    fG = cN,
    fH = eB,
    fI = eA(0x2, 0x6, 0x2),
    fJ = eD + fI
  function fK(jL, jM) {
    const jN = {
      REkSD: function (jO, jP, jQ, jR) {
        return jO(jP, jQ, jR)
      }
    }
    return b5(this, arguments, void 0x0, function* (jO, jP, jQ = c4, jR = fH) {
      const nv = c,
        nu = b,
        jS = {}
      jS[nu(0x1ce, 'mFoF')] = jQ
      const jT = jO[dw](fJ, jO[d6] - fJ),
        jU = jO[dw](jO[d6] - fJ, jO[d6] - fI),
        jV = yield e5(fE, jP, jS, !0x1, [fG]),
        jW = {}
      return ((jW[fC] = jQ), (jW[fD] = jU), (jW[fF] = jR), jN[nv('0x2f0')](e7, jW, jV, jT))
    })
  }
  const fL = cY,
    fM = dc,
    fN = dK,
    fO = cN,
    fP = eb,
    fQ = e4,
    fR = dR,
    fS = dS,
    fT = dX
  function fU(jL, jM) {
    return b5(this, void 0x0, void 0x0, function* () {
      const jN = {}
      ;((jN[fM] = fQ), (jN[fL] = fR))
      const jO = yield e5(fT, jL, jN, !0x1, [fO])
      return yield e7(fQ, jO, jM)
    })
  }
  let fV, fW, fX
  const fY = ev
  let fZ
  const g0 = eA(0x8, 0x6, 0x5),
    g1 = eA(0x2, 0xb, 0xc)
  function g2() {
    return b5(this, arguments, void 0x0, function* (jL = eR) {
      const jM = {
        QHgMX: function (jN, jO, jP, jQ, jR) {
          return jN(jO, jP, jQ, jR)
        }
      }
      return jL
        ? (function () {
            return b5(this, void 0x0, void 0x0, function* () {
              const jN = bQ,
                jO = jN[g0] + jN[g1]
              return fh(ff(jN, eG(jO), eD, eE))
            })
          })()
        : yield (function () {
            const nw = b
            return jM[nw(0x34e, '9fBN')](b5, this, void 0x0, void 0x0, function* () {
              const jN = fh(ff(bL)),
                jO = fh(ff(bP))
              return yield fU(jN, jO)
            })
          })()
    })
  }
  function g3(jL, jM) {
    return b5(this, void 0x0, void 0x0, function* () {
      const nx = c
      fV && fV[nx('0xafc')](jR => g4(jR, e0))
      const jN = yield g2(),
        jO = yield fK(new e0(jL), jN),
        jP = yield g4(jO, jM),
        jQ = yield jM[nx(0x2ba)]
          ? (function (jR, jS) {
              return b5(this, void 0x0, void 0x0, function* () {
                const nz = c,
                  ny = b
                if (ny('0x5d9', 'x7^#') === ny(0x5c1, 'eDC*')) {
                  const jT = {}
                  for (const jU of jR) (g5(jU, jS), (jT[jU[nz('0x5be')]] = new e0(jU[ny(0x7c1, 'Uvjy')])))
                  return yield jS[ny(0x2e7, '^8pG')](jT)
                } else {
                  const jW = aD[aN]
                  if (void 0x0 === jW) jO && jP(aO, bE)
                  else {
                    if (!0x1 === jW) return !0x1
                    jW[aK] = jW
                  }
                }
              })
            })(jP, jM)
          : (function (jR, jS) {
              const nB = nx,
                nA = b
              if (nA('0x731', 'VsAe') === nA(0x993, '&T&3')) {
                const jU = aF(jN)
                if (bk[nB(0x343)](jU)) bb = jU
                else {
                  if (!0x1 === jU) return
                }
              } else
                return b5(this, void 0x0, void 0x0, function* () {
                  const nD = nB,
                    nC = nA
                  for (const jV of jR) g5(jV, jS)
                  const jU = yield jS[nC(0x2df, 'P6Yp')](jR)
                  return yield jS[nD(0x464)](jU)
                })
            })(jP, jM)
      fW && fW(jQ)
    })
  }
  function g4(jL, jM) {
    const nE = kJ
    return au[nE('0x383', '34cl')](b5, this, void 0x0, void 0x0, function* () {
      const nG = nE,
        nF = c
      if (dP(jL)) return
      let jN
      try {
        const jO = yield jM[nF(0x2c7)](new g6[nF('0x375')](jL))
        jN = yield jM[nF('0x8cf')](jO[nG('0xaeb', 'u*vy')])
      } catch (jP) {
        fX && fX(jP)
      }
      return jN
    })
  }
  function g5(jL, jM) {
    const nI = kI,
      nH = kJ
    if ((jM[nH('0xb22', 'BaJX')] && (jL[nH(0x28f, 'ZXk)')] = jM[nI(0x12e)](jL[nI(0x5be)])), jM[nI(0x9eb)])) {
      const jN = new dZ()[eg](jL[nH(0x263, 'qYlx')])
      jL[nH(0x9b8, 'BaJX')] = new dW()[eh](jM[nI(0x9eb)](jN, jL[nI(0x5be)]))
    }
  }
  const g6 = window
  function g7(jL, jM, jN) {
    const jO = new eC()[cW](),
      jP = {}
    ;((jP[d1] = jM), (jP[cL] = eu(em[dJ] + cJ + el[dN] + cJ + el[cZ] + cJ + jO)))
    const jQ = ep[cX](jL)
    if (jQ) {
      const jR = jQ[d6] - 0x2,
        jS = ff(jQ[dD](jR)),
        jT = (function (jU) {
          let jV
          try {
            jV = fb(ec(jU))
          } catch (jW) {}
          return jV
        })(ff(jQ, eG(jS[0x0] === dO ? jS[0x1] : jS), jR, 0x2))
      if (jT) {
        const jU = jT[dK]
        if (void 0x0 === jU) jN && jN(jL, jP)
        else {
          if (!0x1 === jU) return !0x1
          jP[dK] = jU
        }
      }
      if (jQ === g9(jP)) return !0x0
    } else jN && jN(jL, jP)
    return jP
  }
  function g8(jL, jM) {
    const nJ = kJ
    nJ('0x8b5', '%eg$') !== nJ(0x8cb, '6XcX')
      ? jL[nJ('0x557', 'Clcg')] || this[nJ(0x980, 'Yihh')](nJ(0x878, 'HeoH'))
      : ep[dq](jL, g9(jM))
  }
  function g9(jL) {
    const jM = new eC()[cW](),
      jN = jM < f1 ? dO + jM : jM + ''
    return fd(dT(ex(jL)), jM) + fd(jN)
  }
  let gb
  !(function (jL) {
    ;(function (jM = !0x0) {
      return jM ? fY : btoa
    })()[cA] = function (jM) {
      return jL ? jL[jM] : eS
    }
  })(fZ)
  const gc = ez,
    gd = dT
  let gf, gg
  const gh = eA(0x1a, 0x23, 0x36),
    gj = ff(bJ)
  function gk(jL = eR) {
    return jL
      ? (function (jM = !0x0) {
          return jM ? fV : g5
        })()
      : ez
  }
  const gl = eA(0x12, 0x24, 0x3f),
    gm = eA(0x1a, 0x3e, 0x38)
  function gp(jL = eR) {
    return jL ? gd : gf
  }
  function gq(jL = eR) {
    return jL ? gc : gg
  }
  function gu(jL, jM, jN) {
    const jO = (function (jQ = eR) {
        const jR = [cx, cB],
          jS = [cC, cD],
          jT = [cE, cF],
          jU = [cG, cH],
          jV = [cI, cy, cz]
        return jQ ? [jR, jS, jT, jU, jV] : gk
      })(),
      jP = (function (jQ = eR) {
        const nK = b
        return jQ ? [eG, eJ, eN, eC, e8] : au[nK('0x306', 'eXgu')](gp)
      })()
    ;(!(function (jQ, jR) {
      const jS = {
          IUqlh: function (jV, jW) {
            return jV(jW)
          }
        },
        jT = jQ[cL],
        jU = jT['e'] || eT
      f0[jT[d1]] === ex(jQ)
        ? (jT[d7][ej](jV => {
            const nL = b
            jS[nL('0x4f3', 'stof')](ey, jV) && (jR[jV] = jU)
          }),
          (f0[jT[d1]] = gg = dO))
        : (gf = eR)
    })(jN, jM),
      jO[ej]((jQ, jR) => {
        const jS = eX()
        ;(jL && eQ[cl](jS, jM),
          (function (jT, jU, jV, jW) {
            jT[ej](jX => {
              jV[jU][jX] =
                jW ||
                function (jY) {
                  return jY ? eS : eR
                }
            })
          })(
            jQ,
            jR,
            jP,
            jL &&
              function (jT, jU) {
                return (
                  jT &&
                  !gf &&
                  (function (jV, jW) {
                    return jV >= (jW || eF) - eF
                  })(jS[jT], jU)
                )
              }
          ))
      }))
  }
  function gv(jL) {
    return b5(this, void 0x0, void 0x0, function* () {
      const jM = yield (function () {
          return b5(this, void 0x0, void 0x0, function* () {
            const jO = fh(ff(bK)),
              jP = fh(ff(bN))
            return yield fU(jO, jP)
          })
        })(),
        jN = yield fK(
          fh(jL),
          (function (jO = !0x0) {
            return jO ? new e0() : eX
          })()(jM)
        )
      return (function (jO = !0x0) {
        return jO ? new dZ() : eZ
      })()[eg](jN)
    })
  }
  function gw(jL) {
    return b5(this, void 0x0, void 0x0, function* () {
      const jM = {
          akwSF: function (jX, jY) {
            return jX(jY)
          }
        },
        jN = yield (function (jX) {
          return b5(this, void 0x0, void 0x0, function* () {
            const nM = b
            if (jX[gh] === c5) ((jX = ff(jX, eM, gh, eT)), (gg = yield gv(jX)))
            else {
              const jY = jX[gl] + jX[gm]
              gg = jM[nM('0x859', '9kS6')](ec, ff(jX, eG(jY), gh, eE))
            }
            return gg
          })
        })(jL),
        jO = (function (jX, jY = eR) {
          return jY ? fb(jX) : gh
        })(jN)
      if (!jO) return
      const jP = jO[cL],
        jQ = jO[dv]
      if (!jP || !jQ) return
      const jR = jP[d1],
        jS = jP[df],
        jT = jP['p']
      if (
        !(function (jX, jY, jZ) {
          let k0
          return (
            jY &&
              jY[ej](k1 => {
                jZ ? jX === k1 && (k0 = !0x0) : (jX === k1 || jX[eH](cO + k1)) && (k0 = !0x0)
              }),
            k0 || (!jZ && fB(jX, jY)) ? eR : eS
          )
        })(gq(), jP[cL][0x1], jT)
      )
        return
      const jU = cY + jR,
        jV = (function (jX, jY, jZ) {
          const k0 = g7(jX, jY, jZ ? void 0x0 : gy)
          return ((f0[jY] = gg), k0)
        })(jU, jR, jS)
      if (!0x0 === jV) return jO
      if (!jV) return
      const jW = e6
        ? yield (function (jX, jY) {
            return b5(this, void 0x0, void 0x0, function* () {
              const jZ = {
                  pnVxb: function (k2, k3, k4, k5, k6) {
                    return k2(k3, k4, k5, k6)
                  }
                },
                k0 = (function (k2 = !0x0) {
                  return k2 ? new dW() : eY
                })()[eh](ex(jX)),
                k1 = fh(jY)
              return yield (function (k2, k3, k4) {
                const nN = c
                return jZ[nN(0xad3)](b5, this, void 0x0, void 0x0, function* () {
                  const k5 = {}
                  ;((k5[fM] = fP), (k5[fL] = fR))
                  const k6 = yield e5(fS, k2, k5, !0x1, [fN])
                  return yield e6(fP, k6, k3, k4)
                })
              })(fh(gj), k1, k0)
            })
          })(jP, jQ)
        : eR
      return jW ? (g8(jU, jV), jO) : void 0x0
    })
  }
  function gx(jL, jM) {
    return jM
      ? gq()
      : (function (jN) {
          return jN ? d1 : gb
        })()()(jL)
  }
  function gy(jL, jM) {
    const nO = kI,
      jN = gq()
    if (fB(jN)) return
    const jO = au[nO('0x7c7')](dM, jM[d1]),
      jP = dL + eu(jN)
    eq(jO + jP)[dI](jQ => {
      ;(function (jR) {
        return jR[dB] === eU
      })(jQ) &&
        (function (jR, jS) {
          jR[dH]()[dI](jS)
        })(jQ, jR => {
          jR === dg ? ((jM[dK] = eR), g8(jL, jM)) : jR === dO && ((jM[dK] = eS), (gf = eR), g8(jL, jM))
        })
    })
  }
  function gz() {
    return b5(this, void 0x0, void 0x0, function* () {
      const nQ = c,
        nP = b,
        jL = {}
      jL[nP(0x6fe, '&T&3')] = nQ('0x210')
      const jM = jL,
        jN = gk()
      let jO = eM,
        jP = eX(),
        jQ = eT
      jN &&
        jN[ej](jR => {
          const jS = gw(jR)
          ;(jS[dI](jT => {
            const nS = b,
              nR = c,
              jU = {
                JuKTW: function (jV, jW) {
                  return jV(jW)
                },
                PTdyj: function (jV, jW) {
                  return jV instanceof jW
                }
              }
            if (jM[nR(0x966)] === nR('0x714')) {
              var jW
              aD[nS('0x7d7', '#E*s')]
                ? jU[nS(0x75c, '%eg$')](aN, jQ[nS(0x724, '^8pG')])
                : ((jW = jT[nS(0x72b, '0O(!')]),
                  jU[nR('0x2d8')](jW, aO)
                    ? jW
                    : new bE(function (jX) {
                        jX(jW)
                      }))[nS(0x8f1, 'Wm2w')](aA, jS)
            } else {
              const jW = jT && jT[cL]
              ;(jW &&
                (jW[d7][ej](jX => {
                  ey(jX) && (jP[jX] = eM)
                }),
                gu(eR, jP, jT)),
                (jO += jQ) === jN[d6] && ((fZ = {}), fW)(jN[d6]))
            }
          }),
            jS[cv](gx))
        })
    })
  }
  const gA = bD
  let gB,
    gC,
    gD = gJ()[d7]
  function gE(jL, jM, jN) {
    return b5(this, void 0x0, void 0x0, function* () {
      const nT = b
      return (
        jL &&
          (f2(jL) ? jL : [jL])[nT(0x50c, 'Clcg')](jO => {
            const nV = nT,
              nU = c
            dP(jO) &&
              ((jO = jO[nU('0x5d2')](/----.*?----/g, '')[nV(0x446, '^8pG')](/\s+/g, '')),
              gD[nU('0x178')](jO) || gD[nU('0x6f7')](jO))
          }),
        (jM && ((gB = jM), (gC = jN)),
        new Promise((jO, jP) =>
          (function (jQ, jR) {
            try {
              ;(jQ && (bD[dF] = jQ), jR && (bD[cS] = jR), gF())
            } catch (jS) {
              jR && jR()
            }
          })(jO, jP)
        ))
      )
    })
  }
  function gF(jL) {
    return (
      (function (jM) {
        fV = jM()
      })(gG),
      (function (jM) {
        fW = jM
      })(gH),
      (function (jM) {
        fX = jM
      })(gI),
      gB
        ? g3(gB, gC)
        : (function (jM, jN = eR) {
            return jN && (gb = jM) ? gz() : gp(jN)
          })(gK)
    )
  }
  function gG(jL) {
    return gJ()[d7]
  }
  function gH(jL) {
    gJ()[dF](jL)
  }
  function gI(jL) {
    gJ()[cS]()
  }
  function gJ(jL = !0x0) {
    return jL ? gA : gB
  }
  function gK() {
    return gJ()[cS]
  }
  ap[kJ(0x2ad, 'P6Yp')][kI(0x332)](kI('0x23b'))
  class gL extends aq[kI('0x398')] {
    [kJ(0x674, '%eg$')](jL) {
      const nX = kI,
        nW = kJ,
        { moveX: jM, moveY: jN, target: jO } = jL
      ;(jO[nW('0x2eb', '6XcX')](jM, jN), this[nX('0x44a')]())
    }
    [kJ(0x70f, 'VsAe')](jL) {
      const nZ = kJ,
        nY = kI,
        { scaleX: jM, scaleY: jN, transform: jO, worldOrigin: jP, target: jQ } = jL,
        jR = !0x1
      ;(jO ? jQ[nY(0x364)](jO, jR) : jQ[nY('0xa5e')](jP, jM, jN, jR), this[nZ('0xa6f', 'Uvjy')]())
    }
    [kJ(0x808, 'a#Lf')](jL) {
      const o1 = kJ,
        o0 = kI,
        { rotation: jM, transform: jN, worldOrigin: jO, target: jP } = jL
      ;(jN ? jP[o0(0x364)](jN, !0x1) : jP[o0(0x607)](jO, jM), this[o1('0x32f', 'dwqv')]())
    }
    [kJ('0x1c2', 'P6Yp')](jL) {
      const o3 = kJ,
        o2 = kI,
        { skewX: jM, skewY: jN, transform: jO, worldOrigin: jP, target: jQ } = jL,
        jR = !0x1
      ;(jO ? jQ[o2(0x364)](jO, jR) : jQ[o3('0x16f', '6tZA')](jP, jM, jN, jR), this[o2(0x44a)]())
    }
    [kI(0xa45)](jL, jM) {
      const o5 = kI,
        o4 = kJ
      this[o4('0x7cd', '34cl')][o5('0xa45')](jL, jM)
    }
    [kJ('0x16e', 'eXgu')]() {
      const o6 = kI
      ;(this[o6(0x98c)][o6('0x52a')](), this[o6('0x17c')][o6('0x44a')]())
    }
    [kJ('0xb39', 'BaJX')]() {
      const o8 = kI,
        o7 = kJ
      if (o7(0x7d5, '#%(5') !== o7(0x28c, 'AZuW'))
        try {
          aP[o7('0x795', 'eDC*')][aT](aS, aR, bg, b2, aU, b4)
        } catch (jM) {
          aQ(!0x0)
        }
      else this[o8(0x98c)] = null
    }
  }
  class gM extends am[kI(0x7cf)] {
    constructor(jL) {
      const oa = kJ,
        o9 = kI
      ;(super(jL), (this[o9(0x74f)] = oa(0x297, '0O(!')))
    }
    [kJ('0x9a4', '0O(!')](jL, jM) {
      const oc = kJ,
        ob = kI
      super[ob('0x48f')](jL, jM)
      const { x: jN, y: jO, width: jP, height: jQ } = this[oc(0xa9c, 't%gW')][ob(0x573)]
      ;((jL[oc('0x212', 't%gW')] = oc(0x35a, 'AZuW')), jL[oc(0x390, 'Oq6L')](jN, jO, jP, jQ))
    }
    [kI('0x12c')]() {
      const oe = kJ,
        od = kI
      ;(super[od(0x12c)](), (this[oe('0x623', '9fBN')] = null))
    }
  }
  function gN(jL) {
    const of = kJ
    return jL ? (am[of('0x52e', 'dwqv')](jL) ? jL : [jL]) : []
  }
  ;((al[kJ(0x802, 'eDC*')] = class extends aq[kJ(0x12b, 'zTI^')] {
    get [kI('0x947')]() {
      const og = kJ
      return og('0xbc4', 'AZuW')
    }
    get [kJ('0x7fa', 'eXgu')]() {
      const oh = kJ
      return oh(0xa36, 'DTjb')
    }
    get [kI(0x912)]() {
      const oj = kI,
        oi = kJ
      return this[oi(0x636, '8G&U')][oi('0x70b', 'baqw')][this[oj(0x947)]] || {}
    }
    get [kJ(0x68b, '#E*s')]() {
      const ok = kJ,
        { editBox: jL } = this[ok(0x659, '&T&3')],
        jM = Object[ok('0x248', '#%(5')]({}, this[ok('0x6b4', 'Wm2w')])
      return jL ? Object[ok('0xab4', 't%gW')](jM, jL) : jM
    }
    get [kJ('0x8a8', '0O(!')]() {
      const ol = kI,
        jL = Object[ol(0xb7f)]({}, this[ol(0x5f6)]),
        { innerEditBox: jM } = this[ol('0x912')]
      return jM ? Object[ol('0xb7f')](jL, jM) : jL
    }
    get [kJ('0x5c4', 'Clcg')]() {
      const on = kJ,
        om = kI,
        { imageEditBox: jL, pointSize: jM = 0xe, pointColor: jN } = this[om(0x912)],
        { stroke: jO } = this[om('0x17c')][om(0xb23)],
        jP = jN || jO,
        jQ = Object[om('0xb7f')](Object[om('0xb7f')]({}, this[om('0x8d9')]), {
          point: {
            stroke: void 0x0,
            fill: void 0x0,
            width: 0x2 * jM,
            height: 0x2 * jM,
            children: [
              {
                tag: on('0x9ad', '8T&]'),
                fill: jP,
                hitRadius: 0x5,
                points: [
                  { x: jM, y: jM },
                  { x: 0x2 * jM, y: jM },
                  { x: 0x2 * jM, y: Math[om('0x77e')](1.3 * jM) },
                  { x: Math[on(0xbdb, '!d%r')](1.3 * jM), y: Math[on(0x915, 'qYlx')](1.3 * jM) },
                  { x: Math[om('0x77e')](1.3 * jM), y: 0x2 * jM },
                  { x: jM, y: 0x2 * jM }
                ]
              }
            ]
          },
          middlePoint: {
            stroke: void 0x0,
            fill: void 0x0,
            width: Math[on('0x1b3', 'eXgu')](au[on('0x169', 'SY@W')](1.3, jM)),
            height: jM,
            children: [
              {
                tag: om(0x40e),
                fill: jP,
                x: 0x0,
                hitRadius: 0x5,
                y: jM / 0x2,
                width: Math[on('0x4ed', 'd)pE')](1.3 * jM),
                height: Math[on(0x324, 'gtjs')](0.3 * jM)
              }
            ]
          }
        })
      return jL ? Object[om(0xb7f)](jQ, jL) : jQ
    }
    get [kI('0x12d')]() {
      const op = kJ,
        oo = kI
      if (oo(0x2c2) !== op(0x435, 'gtjs')) return oo('0x4bd')
      else {
        const jM = Object[oo('0xb7f')]({}, this[oo('0x9ff')]),
          { image: jN } = this[op('0x996', '%eg$')]
        return jN ? Object[oo(0xb7f)](jM, jN) : jM
      }
    }
    constructor(jL) {
      const or = kJ,
        oq = kI
      ;(super(jL),
        (this[oq('0xbc2')] = { selectedStyle: { strokeWidth: 0x0 } }),
        (this[oq('0x5f6')] = {
          moveable: !0x1,
          preventEditInner: !0x0,
          keyEvent: !0x1,
          point: { opacity: 0x0 },
          strokeWidth: 0x1
        }),
        (this[oq(0x8d9)] = { strokeWidth: 0x0, preventEditInner: !0x0, editSize: or('0x24c', '#%(5') }),
        (this[oq(0x9ff)] = { opacity: 0.5, hittable: !0x1, editInner: '' }),
        (this[or(0x291, 'zTI^')] = new aq[oq(0x761)](jL)),
        (this[oq('0x163')][oq(0x1d5)] = this[or('0x911', '!d%r')] = new gL()),
        (this[or(0x9df, 'TIpW')][or(0x1f0, 'gtjs')] = this[or('0x951', '9kS6')]),
        (this[or(0x1a3, 'Yihh')][or(0x932, '#E*s')] = this),
        (this[oq(0x163)][or('0x927', 'x7^#')] = this[oq('0xb93')] = new gM()),
        (this[or(0x88d, 'Wm2w')] = new aq[or(0x53d, 'dwqv')](jL)),
        (this[or(0x5c3, 'SY@W')][oq('0x1d5')] = this[or(0xa93, '!d%r')] = new aq[or('0x36a', 'W8*z')]()),
        (this[or(0x61a, 'a#Lf')][or(0x251, 'a#Lf')] = this[oq(0xa18)]),
        this[or('0x158', 'stof')][or(0x743, 'cQoA')](
          this[or(0x1b4, '8G&U')][or('0x8ae', '8G&U')](am[oq(0xb97)][oq('0x34d')], this[or(0xa4f, 'WA#o')], this),
          this[oq(0xa18)][oq('0xaf8')](am[or(0x428, '6XcX')][oq('0x34d')], this[oq(0x9fc)], this),
          this[oq(0xb93)][oq(0xaf8)](am[oq(0x255)][oq(0x420)], this[oq('0x9fc')], this)
        ))
    }
    [kI(0x992)]() {
      const ot = kI,
        os = kJ
      ;(this[os('0xa49', 'cQoA')](), this[os(0x8e9, 'Wm2w')](), this[os(0x356, '^8pG')](), this[ot(0x44a)]())
    }
    [kJ('0x3db', 'R#CE')]() {
      const ov = kI,
        ou = kJ
      ;(this[ou(0x987, 'ZXk)')](), this[ov('0x44a')]())
    }
    [kJ(0x83a, 'BaJX')]() {
      const ox = kJ,
        ow = kI,
        { innerEditBox: jL, imageEditBox: jM } = this
      ;(this[ow('0xa43')](), jL[ox('0x58f', 'TIpW')](), jM[ox('0x78e', '8G&U')]())
    }
    [kI(0xa43)]() {
      const oz = kJ,
        oy = kI,
        { innerEditBox: jL, imageEditBox: jM, editBox: jN } = this
      ;((jN[oy('0x144')] = this[oy(0x7f7)]), (jL[oy(0x144)] = this[oz(0x82c, '&T&3')]), (jM[oy(0x144)] = this[oz(0x360, '6XcX')]))
    }
    [kJ('0x4fb', '#ftp')]() {
      const oB = kJ,
        oA = kI,
        { editor: jL, editTarget: jM, innerEditBox: jN, transformTool: jO } = this
      ;(jL[oA(0x332)](jN), (jN[oB('0x564', 'Yihh')] = jM), (jO[oA('0x417')] = jL[oA('0x417')]))
    }
    [kI(0x503)]() {
      const oD = kJ,
        oC = kI,
        { editor: jL, editTarget: jM, imageEditBox: jN, imageTarget: jO } = this,
        jP = this[oC('0x760')]()
      ;((jO[oD('0x638', 'a#Lf')] = jP[oD('0x250', 't%gW')]),
        (jO[oC(0x30c)] = jM),
        jO[oC('0x1ab')](this[oC(0x12d)]),
        jL[oC('0x9b3')][oD(0x7bb, '#%(5')][oD('0xb06', '%eg$')][oD('0x9c2', '#%(5')](jO),
        jL[oC('0x332')](jN),
        jM[oC('0xa67')] && (jM[oD(0x25c, 'AZuW')] = jM[oC(0x500)]),
        jM[oD('0x1b6', 'eXgu')] && (jM[oD(0x19d, 'u*vy')] = jM[oD(0x975, 'eXgu')]))
    }
    [kI('0x9fc')]() {
      const oF = kI,
        oE = kJ,
        jL = new am[oE('0x568', '%eg$')](this[oE(0x54b, 'ZXk)')][oE(0x91e, 'R#CE')]),
        jM = this[oF('0x3a9')](),
        { transform: jN } = jM[oE('0x156', 'VsAe')]
      ;(jN && jL[oF('0x3a6')](jN),
        jL[oF(0x657)](this[oE('0x78b', 'mFoF')][oE('0x31d', 'stof')][oF('0x238')]),
        this[oE('0x77f', 'cQoA')][oE(0xa32, 'eXgu')](jL),
        this[oF(0x163)][oE('0x32f', 'dwqv')]())
    }
    [kI(0x3a9)]() {
      const oH = kI,
        oG = kJ,
        { fill: jL } = this[oG(0x3ec, '0O(!')]['__']
      return jL && jL[oH(0xa8d)](jM => jM[oH('0x4b6')])
    }
    [kJ(0x617, '!d%r')]() {
      const oJ = kI,
        oI = kJ,
        { fill: jL } = this[oI(0x341, 'BaJX')]
      return am[oI('0x8a1', '9kS6')](jL) ? jL[oI(0x347, 'baqw')](jM => oJ(0x4b6) === jM[oJ('0x41e')]) : jL
    }
    [kJ(0x24b, 'WA#o')](jL, jM) {
      const oL = kJ,
        oK = kI
      if (oK(0xa79) === oL('0x1f2', 't%gW')) return jL(this[oK('0x860')])
      else {
        let { fill: jO } = this[oL(0x341, 'BaJX')]
        ;(am[oL('0x86d', 'qYlx')](jO) ? (jO[jO[oK('0x42a')](jM)] = jL) : (jO = jL), (this[oK('0xadf')][oL(0x849, 'cQoA')] = jO))
      }
    }
    [kI('0x52a')]() {
      const oN = kI,
        oM = kJ,
        jL = this[oM(0x763, 'eXgu')]()
      if (!jL) return
      const jM = this[oN('0xadf')],
        jN = new am[oM(0x658, 'HeoH')](this[oN(0xb93)][oM(0x4dc, 'cQoA')])
      jN[oN(0x657)](jM[oM(0x5f1, 'VsAe')])
      const jO = {}
      ;((jO[oM(0xb1f, '%eg$')] = oM(0x9dd, 'qYlx')),
        (jO[oM('0x811', 'HeoH')] = oN('0x8d5')),
        (jO[oM('0x861', 'R#CE')] = !0x0),
        (jO[oN(0x8b2)] = jL[oM(0xa1b, 'DTjb')]))
      const { x: jP, y: jQ, scaleX: jR, scaleY: jS, rotation: jT, skewX: jU, skewY: jV } = jN[oM(0x4f5, 'd)pE')](),
        jW = jO
      ;((jP || jQ) && (jW[oM('0x348', 'TIpW')] = { x: jP, y: jQ }),
        (0x1 === jR && 0x1 === jS) || (jW[oN(0x9e5)] = jR === jS ? jR : { x: jR, y: jS }),
        jT && (jW[oM(0x195, '#ftp')] = jT),
        (jU || jV) && (jW[oN(0x359)] = { x: jU, y: jV }),
        this[oN('0xad4')](jW, jL),
        this[oM(0x592, 'HeoH')]())
    }
    [kI(0x6f5)]() {
      const oP = kI,
        oO = kJ
      this[oO('0xb44', 'Wm2w')][oO(0x3bc, '8G&U')] = this[oO('0x33e', 'VsAe')][oO('0xb53', 'dwqv')]
        ? this[oO('0x258', 'stof')][oO('0xbe5', 'YKa8')](oP(0x734), oO('0x4e5', '34cl'))
        : void 0x0
    }
    [kJ(0x768, 'P6Yp')]() {
      const oR = kJ,
        oQ = kI
      ;(this[oQ('0xa43')](), this[oR('0xa7c', '!d%r')][oQ('0x44a')](), this[oQ(0xa18)][oQ('0x44a')]())
    }
    [kI('0x43f')]() {
      const oT = kI,
        oS = kJ,
        { editBox: jL, innerEditBox: jM, imageEditBox: jN, imageTarget: jO } = this
      jO[oS(0x784, 'dwqv')] &&
        (this[oT(0x52a)](),
        jO[oS(0x30a, '#%(5')](),
        (jM[oT('0x30c')] = jO[oT(0x30c)] = jO[oS('0x8d0', 'VsAe')] = jL[oT(0x144)] = void 0x0),
        jN[oT(0x837)](),
        jM[oT('0x837')](),
        jN[oT('0x610')](),
        jM[oT(0x610)]())
    }
    [kI('0x78d')]() {
      const oV = kJ,
        oU = kI
      this[oU('0xa18')] &&
        (this[oU('0xb93')][oV('0x183', '8G&U')](),
        this[oV(0x93a, 'Uvjy')][oU('0x12c')](),
        this[oU(0x163)][oV(0x183, '8G&U')](),
        this[oV('0x5b4', 'W8*z')][oV(0xb8f, '&T&3')](),
        (this[oV(0x6a8, '#E*s')] = this[oV('0x62b', '%eg$')] = this[oU('0xa18')] = null),
        (this[oV('0x4d2', 'x7^#')] = this[oV('0x209', '6tZA')] = this[oV('0x136', 'HeoH')] = null))
    }
  }),
    (al[kI(0x2cc)] = b4([aq[kJ('0x818', 'W8*z')]()], al[kI(0x2cc)])),
    am[kI(0x34b)][kI(0x332)](au[kI(0x65d)], kJ(0x85b, 'baqw')))
  class gO extends am[kJ('0x8e1', 'stof')] {
    get [kI('0x367')]() {
      const oW = kJ
      return gN(this[oW('0x986', '#E*s')])
    }
    get [kJ('0x90b', 'SY@W')]() {
      const oX = kJ
      return gN(this[oX('0xa96', '9kS6')])
    }
    constructor(jL, jM) {
      const oY = kJ
      ;(super(jL), jM && Object[oY(0x314, 'u*vy')](this, jM))
    }
  }
  ;((gO[kJ(0x8ef, '6tZA')] = kJ(0x814, 'eDC*')),
    (gO[kJ('0x338', 'eDC*')] = kJ(0x3f2, 'mFoF')),
    (gO[kI('0xac4')] = au[kJ(0x739, '8G&U')]))
  const gP = (function (jL = 0x1) {
      return jL ? Array : jL
    })(),
    gQ = (function (jL = 0x1) {
      const oZ = kJ
      return jL ? [oZ('0x4a9', 'd)pE')] : jL
    })()
  function gR(jL) {
    return (function (jM) {
      const { g: jN } = gP,
        jO = gQ[0x0],
        jP = gQ[0x1]
      if (jN) return jN(jO, jM) || jN(jP, jM)
    })(jL)
  }
  const gS = [kI('0x17c')],
    gT = {}
  ;((gT[kJ(0xb30, '6XcX')] = !0x1), (gT[kJ('0x651', 'zTI^')] = kJ(0x8bd, '#ftp')))
  const gU = {}
  ;((gU[kI('0x82f')] = !0x0),
    (gU[kJ(0x4e0, 't%gW')] = !0x0),
    (gU[kI(0xa64)] = !0x0),
    (gU[kJ('0x93d', 'R#CE')] = 0xf),
    (gU[kJ(0x3b7, 'baqw')] = gT))
  const gV = gU
  var gW
  !(function (jL) {
    const p1 = kI,
      p0 = kJ
    ;((jL[(jL[p0('0x903', '#%(5')] = 0x1)] = p0(0x5ca, 'HeoH')),
      (jL[(jL[p0(0x2c8, 'Oq6L')] = 0x2)] = p0('0x72d', 'eXgu')),
      (jL[(jL[p1(0x2e1)] = 0x3)] = p0('0x643', 'Uvjy')),
      (jL[(jL[p0('0x77b', '@Bdu')] = 0x4)] = p0('0x9cd', '6tZA')))
  })(gW || (gW = {}))
  const gX = [0.1488743389, 0.4333953941, 0.6794095682, 0.8650633666, 0.9739065285],
    gY = [0.2955242247, 0.2692667193, 0.2190863625, 0.1494513491, 0.0666713443],
    { sqrt: gZ } = Math,
    { getDerivative: h0 } = am[kJ(0x46f, '^8pG')],
    h1 = {
      getDistance(jL, jM, jN, jO, jP, jQ, jR, jS, jT = 0x1) {
        const p3 = kJ,
          p2 = kI
        let jU,
          jV,
          jW,
          jX,
          jY,
          jZ,
          k0 = 0x0,
          k1 = jT / 0x2
        for (let k2 = 0x0; k2 < gX[p2(0x1e3)]; k2++)
          ((jU = k1 * (0x1 + gX[k2])),
            (jV = au[p2('0x18c')](k1, 0x1 - gX[k2])),
            (jW = au[p2(0xbb0)](h0, jU, jL, jN, jP, jR)),
            (jX = au[p3(0x8e2, '%eg$')](h0, jU, jM, jO, jQ, jS)),
            (jY = h0(jV, jL, jN, jP, jR)),
            (jZ = h0(jV, jM, jO, jQ, jS)),
            (k0 += gY[k2] * (gZ(jW * jW + jX * jX) + au[p3('0x264', 'YKa8')](gZ, jY * jY + jZ * jZ))))
        return k0 * k1
      },
      getT(jL, jM, jN, jO, jP, jQ, jR, jS, jT, jU, jV = 0x1) {
        const p4 = kJ
        let jW = 0x0,
          jX = 0x1,
          jY = jL / jM,
          jZ = jV / jM / 0x3
        if (jY >= 0x1) return 0x1
        if (jY <= 0x0) return 0x0
        for (; jX - jW > jZ; )
          (h2(jN, jO, jP, jQ, jR, jS, jT, jU, jY) < jL ? (jW = jY) : (jX = jY), (jY = au[p4(0x22f, 'Uvjy')](jW + jX, 0x2)))
        return jY
      },
      cutTwo(jL, jM, jN, jO, jP, jQ, jR, jS, jT) {
        const p6 = kJ,
          p5 = kI,
          jU = {}
        ;((jU[p5('0x933')] = null), (jU[p5(0xa3d)] = [jO, jP, jQ, jR, jS, jT]))
        if (jL <= 0x0) return jU
        const jV = {}
        ;((jV[p5(0x933)] = [jO, jP, jQ, jR, jS, jT]), (jV[p5(0xa3d)] = null))
        if (jL >= 0x1) return jV
        const jW = 0x1 - jL,
          jX = jM * jW + jO * jL,
          jY = jN * jW + jP * jL,
          jZ = jO * jW + jQ * jL,
          k0 = au[p6('0x141', 'ZXk)')](jP * jW, jR * jL),
          k1 = jQ * jW + jS * jL,
          k2 = au[p5('0x963')](jR * jW, jT * jL),
          k3 = au[p6('0x27f', 'VsAe')](jX, jW) + jZ * jL,
          k4 = jY * jW + k0 * jL,
          k5 = jZ * jW + au[p6('0x35f', 'W8*z')](k1, jL),
          k6 = k0 * jW + k2 * jL
        return {
          left: [jX, jY, k3, k4, k3 * jW + au[p6('0x2c6', '^8pG')](k5, jL), k4 * jW + k6 * jL],
          right: [k5, k6, k1, k2, jS, jT]
        }
      }
    },
    { getDistance: h2 } = h1
  class h3 extends am[kI(0x2b7)] {
    [kI('0x936')](jL) {
      const p7 = kJ
      ;((this[p7('0x4f6', ']%#R')] = jL), this[p7('0x21d', 'HeoH')][p7('0x885', '@Bdu')]())
    }
    [kJ('0x44d', 'HeoH')](jL) {
      const p8 = kI
      ;((this[p8('0x8f8')] = jL), this[p8(0x1b9)][p8('0x44a')]())
    }
  }
  const h4 = (function (jL = 0x1) {
      return jL ? Array : jL
    })(),
    h5 = (function (jL = 0x1) {
      const p9 = kI
      return jL ? [au[p9('0x905')]] : jL
    })()
  function h6(jL) {
    return (function (jM) {
      const { g: jN } = h4,
        jO = h5[0x0],
        jP = h5[0x1]
      if (jN) return jN(jO, jM) || jN(jP, jM)
    })(jL)
  }
  class h7 extends am[kJ('0x445', '#%(5')] {
    get [kI('0x79d')]() {
      const pa = kJ
      return pa('0x949', '&T&3')
    }
    get [kJ(0x4a1, 'WA#o')]() {
      const pc = kI,
        pb = kJ
      return 'M^' === this[pb('0x598', 'x7^#')][pc(0x5be)]
    }
    get [kJ(0xaa8, 'd)pE')]() {
      const pd = kJ
      return 'Z^' === this[pd('0x6a3', 't%gW')][pd('0x22b', 'Yihh')]
    }
    get [kJ('0x404', 'a#Lf')]() {
      const pe = kJ
      return !this[pe('0xb9d', 'Wm2w')][pe('0x977', 'AZuW')](this, !0x0, !0x0)
    }
    get [kI(0x863)]() {
      const pf = kJ
      return !this[pf('0x222', 'TIpW')][pf('0x601', 'DTjb')](this, !0x0, !0x1)
    }
    get [kJ('0x687', 'TIpW')]() {
      const pg = kJ,
        { a: jL, b: jM } = this[pg('0x4fc', 'R#CE')]
      return jL || jM
    }
    constructor(jL) {
      super(jL)
    }
    [kJ('0xb55', 'stof')](jL) {
      const pi = kJ,
        ph = kI
      ;(jL && (this[ph('0x23c')] || this[ph(0x69e)]()),
        this[ph('0x23c')] &&
          ((this[ph(0x23c)][pi(0x541, 'Yihh')] = this[pi(0x7ac, '9kS6')][ph('0x5cd')] = !0x1),
          jL && (('a' === jL ? this[ph('0x23c')] : this[ph('0x4be')])[ph('0x5cd')] = !0x0)),
        (this[pi('0xb83', 'a#Lf')] = jL),
        jL && (this[ph(0x5cd)] = !0x0),
        this[ph('0x971')] && (this[ph('0x971')][ph('0x5cd')] = this[pi(0x541, 'Yihh')] && !this[ph('0x4ec')]))
    }
    [kJ('0x937', 'cQoA')](jL) {
      const pk = kI,
        pj = kJ,
        { nodeData: jM, pathEditor: jN } = this
      if (jN && 'Z^' !== jM[pj(0x4fa, 'BaJX')]) {
        const jO = jN[pk(0x2e3)](this, !0x0, !0x1, !0x0),
          jP = jN[pk('0x176')](this, !0x0, !0x0, !0x0),
          jQ = jO && jO[pk('0x766')],
          jR = jP && jP[pk('0x766')],
          jS = jQ || am[pj('0x1c4', 'R#CE')][pk('0x5d5')](jR || jM, jM, 0x1, !0x1, !0x0),
          jT = jR || am[pk('0x484')][pk('0x5d5')](au[pk(0x497)](jQ, jM), jM, 0x1, !0x1, !0x0),
          jU = am[pk('0x484')][pj(0x483, '@Bdu')](jS, jM, jT),
          jV = jU <= 0x0 ? -0x1 : 0x1,
          jW = (0xb4 - jV * jU) / 0x2,
          jX = { x: jM['x'] + ((jR || jQ || jM)['x'] - jM['x']) / 0x4, y: jM['y'] + ((jR || jQ || jM)['y'] - jM['y']) / 0x4 }
        switch (jL) {
          case gW[pk(0x9ce)]:
            ;('M^' !== jM[pj(0x571, 'Uvjy')] && (jM[pk(0x5be)] = 'L^'), delete jM['a'], delete jM['b'])
            break
          case gW[pk(0x86e)]:
            if (jM['a'] || jM['b']) break
          case gW[pk('0x2e1')]:
            ;('M^' !== jM[pk('0x5be')] && (jM[pj('0x589', 'd)pE')] = 'C^'),
              am[pk(0x484)][pj('0xa9b', '@Bdu')](jX, jW * jV, jM),
              (jM['b'] = jX),
              jQ &&
                (jM['a'] = am[pj('0x54f', 'P6Yp')][pj(0x6b5, 'YKa8')](
                  jM['b'],
                  jM,
                  am[pj(0x848, 't%gW')][pk('0x6b6')](jM, jQ) / 0x4,
                  !0x1,
                  !0x0
                )))
            break
          case gW[pk(0x8fd)]:
            ;(au[pj('0xa85', 'SY@W')]('M^', jM[pj('0x720', '^8pG')]) && (jM[pk(0x5be)] = 'C^'),
              am[pj('0x409', 'qYlx')][pj(0x8ac, 'mFoF')](jX, jW * jV, jM),
              (jM['b'] = jX),
              jQ &&
                (jM['a'] = am[pk(0x484)][pj('0xa1d', '0O(!')](
                  jM['b'],
                  jM,
                  am[pj('0x875', '6tZA')][pj('0x7be', 'x7^#')](jM, jM['b']),
                  !0x1,
                  !0x0
                )))
        }
        ;((jM['ab'] = jL), (this[pk('0x766')] = jM))
      }
    }
    [kI('0xbc3')](jL) {
      const pm = kJ,
        pl = kI
      ;((this[pl(0x766)][pm('0x908', 't%gW')] = jL),
        this[pm(0x378, '34cl')](void 0x0, !0x0),
        (this[pl(0x766)] = this[pm('0x355', 'stof')]))
    }
    [kJ(0x440, 'dwqv')](jL, jM) {
      const po = kJ,
        pn = kI
      jL || (jL = this[pn('0x971')])
      const { pathEditor: jN, nodeData: jO } = this,
        { stroke: jP } = jN[pn('0x17c')][po('0xb47', 'VsAe')],
        { node: jQ, beginNode: jR } = jN[pn('0x3d8')]
      ;((jL[po(0x281, 'gtjs')] = jP),
        jQ && jL[pn('0x1ab')](jQ),
        jM && jR && 'M^' === jO[po('0x3e3', 'YKa8')] && jL[po(0x63c, '6tZA')](jR))
    }
    [kJ(0x1e7, 'YKa8')](jL, jM, jN, jO) {
      const pq = kJ,
        pp = kI
      jO && (Math[pp(0x58e)](jL['x']) > Math[pp('0x58e')](jL['y']) ? (jL['y'] = 0x0) : (jL['x'] = 0x0))
      const jP = jN[pp('0x766')]
      let { x: jQ, y: jR } = { x: au[pq('0x4ba', 'cQoA')](jM['x'] + jL['x'], jP['x']), y: jM['y'] + jL['y'] - jP['y'] }
      const { beforeMove: jS } = this[pp(0x400)][pq(0xa4c, 'u*vy')]
      if (jS) {
        const jU = {}
        ;((jU[pq(0x97b, 'BaJX')] = jN), (jU['x'] = jQ), (jU['y'] = jR))
        const jV = jS(jU)
        if (am[pp('0x343')](jV)) ((jQ = jV['x']), (jR = jV['y']))
        else {
          if (!0x1 === jV) return
        }
      }
      const jT = {}
      return ((jT['x'] = jQ), (jT['y'] = jR), jT)
    }
    [kJ(0x94f, '#E*s')]() {
      const ps = kI,
        pr = kJ,
        { nodeData: jL, pathEditor: jM } = this
      if (jL && 'Z^' !== jL[pr('0x589', 'd)pE')]) {
        const jN = {}
        jN[pr(0x422, 'baqw')] = 0x2
        const jO = {}
        ;((jO[ps('0x684')] = 0x2), (jO[pr('0x5ad', 'zTI^')] = pr('0x66a', 'eXgu')))
        const jP = {}
        ;((jP[pr(0x3fa, '#ftp')] = pr(0x6e2, 'a#Lf')),
          (jP[ps('0x500')] = 0xa),
          (jP[pr('0x42f', 'YKa8')] = 0xa),
          (jP[ps(0x5de)] = pr(0x73b, 'cQoA')),
          (jP[pr('0x775', 'VsAe')] = pr('0x74e', 'AZuW')),
          (jP[pr('0xa0a', '%eg$')] = jN),
          (jP[pr('0x680', '9kS6')] = jO))
        const jQ = (this[pr('0x50f', 'TIpW')] = new am[pr('0x145', '^8pG')](jP))
        let jR, jS
        ;(this[ps(0x99a)](jQ, !0x0),
          this[pr(0x49f, 'u*vy')](jQ),
          jQ['on'](am[pr('0x79e', 'AZuW')][ps('0x31a')], () => {
            const pt = pr
            if (jM[pt(0x85d, 'DTjb')]) return
            ;((jR = !0x1), this[pt('0x7d9', 'cQoA')] && jM[pt('0x418', 'HeoH')]())
            const { x: jT, y: jU } = this[pt('0x3bb', '&T&3')],
              jV = {}
            ;((jV['x'] = jT), (jV['y'] = jU), (jS = jV))
          }),
          jQ['on'](am[pr(0x2e8, ']%#R')][ps(0x34d)], jT => {
            const pv = pr,
              pu = ps
            if (jM[pu(0xa75)]) return
            const jU = jT[pu('0x6e7')](jM[pv('0x19c', 'Wm2w')]),
              jV = this[pv(0xa44, 'x7^#')](jU, jS, this, jT[pu('0x84b')])
            jV &&
              (jM[pv('0x746', '^8pG')]
                ? jM[pv(0x2b4, 'W8*z')](jV)
                : jT[pu('0xb4f')] || jR
                  ? ((jR = !0x0),
                    'M^' !== jL[pu(0x5be)] && (jL[pv(0x8cc, '@Bdu')] = 'C^'),
                    (jL['a'] = { x: jL['x'] - jU['x'], y: jL['y'] - jU['y'] }),
                    (jL['b'] = { x: jL['x'] + jU['x'], y: jL['y'] + jU['y'] }),
                    jL['ab'] && delete jL['ab'],
                    (this[pu(0x766)] = jL))
                  : jM[pv('0x8ce', 'u*vy')](jV))
          }))
      }
    }
    [kI(0x4c9)]() {
      const px = kJ,
        pw = kI,
        { nodeData: jL } = this
      if (jL && 'Z^' !== jL[pw('0x5be')]) {
        const jM = {}
        jM[pw(0x704)] = 0.8
        const jN = {}
        ;((jN[pw('0x5be')] = pw('0x971')),
          (jN[pw('0x704')] = 0.5),
          (jN[px('0x740', 'Oq6L')] = 0xa),
          (jN[pw('0x90a')] = 0xa),
          (jN[px(0x41b, '0O(!')] = px(0x886, 'zTI^')),
          (jN[px(0x7db, '!d%r')] = pw('0x803')),
          (jN[px(0x425, 'WA#o')] = jM))
        const jO = (this[pw('0x789')] = new am[pw(0x193)](jN))
        ;(this[px('0x5b3', 'TIpW')](jO, !0x0), this[px(0xa80, '&T&3')](jO), this[pw('0xa77')](jO, px('0x429', 'eDC*')))
      }
    }
    [kI(0x478)]() {
      const pz = kJ,
        py = kI,
        { nodeData: jL } = this
      if (jL && 'Z^' !== jL[py('0x5be')]) {
        const jM = {}
        jM[py('0x704')] = 0.8
        const jN = {}
        ;((jN[py(0x5be)] = pz('0x2f2', 'VsAe')),
          (jN[pz(0xb5b, 'YKa8')] = 0.5),
          (jN[py(0x500)] = 0xa),
          (jN[py('0x90a')] = 0xa),
          (jN[pz(0xb3e, 'HeoH')] = py('0x202')),
          (jN[pz(0x8b8, 'TIpW')] = py('0x803')),
          (jN[pz('0x8f9', 'VsAe')] = jM))
        const jO = (this[pz(0x4a8, 'Wm2w')] = new am[pz('0x8eb', 'a#Lf')](jN))
        ;(this[py(0x99a)](jO), this[pz(0x1e2, 'mFoF')](jO), this[py(0xa77)](jO, pz(0xb0c, '!d%r')))
      }
    }
    [kI('0xa77')](jL, jM) {
      const pB = kI,
        pA = kJ,
        { pathEditor: jN } = this
      let jO, jP
      ;(jL['on'](am[pA('0x9f2', '8T&]')][pB('0x31a')], () => {
        const pD = pB,
          pC = pA
        if (jN[pC(0x5d0, 'Clcg')] || jN[pC(0x1cc, 'Uvjy')]) return
        const jQ = {}
        ;((jQ['x'] = jL['x']), (jQ['y'] = jL['y']))
        const jR = jN[pD(0xadf)][pD('0x9c9')](jQ)
        let jS, jT, jU
        pC(0x956, 'Yihh') === jM ? ((jS = jN[pC(0x84c, 't%gW')](this)), (jT = this)) : ((jS = this), (jT = jN[pD(0x176)](this)))
        const jV = jS[pD(0x766)],
          jW = jT[pD('0x766')],
          jX = jV['b'] || jW['a'],
          jY = {}
        ;((jY[pD('0x5be')] = jX ? 'C^' : 'L^'), (jY['x'] = jR['x']), (jY['y'] = jR['y']))
        if (((jU = jY), jX)) {
          const { fromB: k2, a: k3, b: k4, toA: k5 } = this[pD('0xb9c')](jV, jW)
          ;((jS[pC(0xbb2, '!d%r')]['b'] = k2), (jU['a'] = k3), (jU['b'] = k4), (jT[pD(0x766)]['a'] = k5))
        }
        ;((jO = pD(0x416) === jM ? jN[pD(0x480)](jU, this) : jN[pC(0xbac, 'Wm2w')](jU, this)),
          this[pD(0x789)] && (this[pD('0x789')][pD('0xaa7')] = !0x1),
          this[pD(0x99d)] && (this[pC('0x45c', 'BaJX')][pD(0xaa7)] = !0x1))
        const { x: jZ, y: k0 } = jO[pD('0x766')],
          k1 = {}
        ;((k1['x'] = jZ), (k1['y'] = k0), (jP = k1))
      }),
        jL['on'](am[pA(0x47f, 'd)pE')]['UP'], () => {
          const pF = pA,
            pE = pB
          if (pE(0x4ab) === pE(0x4ab)) jN[pF('0x2d5', 'YKa8')] || (jO && (jN[pF(0x1fc, 'a#Lf')](jO), (jO = void 0x0)))
          else {
            const jR = []
            ;(this[pF(0x3cd, '34cl')][pE(0xafc)](jS => {
              const pH = pF,
                pG = pE
              jR[pG('0x4ee')](jS) || jR[pH('0xa0e', '@Bdu')](jS)
            }),
              bk[pE('0xafc')](jS => {
                const pJ = pE,
                  pI = pF
                this[pI(0x2ca, '8T&]')][pJ(0x4ee)](jS) || jR[pI(0xa0e, '@Bdu')](jS)
              }),
              (jR[pF('0x9b1', '34cl')] !== bb[pF('0x776', 'cQoA')][pE(0x1e3)] ||
                aD[pF('0x5c0', '34cl')][pF(0xb36, 'HeoH')]((jS, jT) => jS !== jR[jT])) &&
                (aN[pF(0x32b, 'qYlx')] = jR))
          }
        }),
        jL['on'](am[pB('0xb97')][pA(0x3ae, 'a#Lf')], jQ => {
          const pL = pA,
            pK = pB
          if (!jN[pK('0xa75')] && jO) {
            const jR = jQ[pK(0x6e7)](jN[pL('0x6a9', 'YKa8')]),
              jS = this[pK(0x23a)](jR, jP, jO, jQ[pL('0x901', 'stof')])
            if (!jS) return
            jN[pK('0xb67')](jS, jO)
          }
        }))
    }
    [kJ(0x2c0, '^8pG')]() {
      const pN = kI,
        pM = kJ,
        { nodeData: jL, pathEditor: jM } = this
      if (jL && 'Z^' !== jL[pM(0x720, '^8pG')] && this[pM(0x5ed, 'VsAe')]) {
        const jN = {}
        jN[pN(0x684)] = 0x2
        const jO = {}
        jO[pN('0x684')] = 0x2
        const { stroke: jP } = jM[pN(0x17c)][pM(0x1d0, 'AZuW')],
          { handle: jQ } = jM[pN('0x3d8')],
          jR = {
            width: 0x6,
            height: 0x6,
            hitRadius: 0x5,
            fill: pN(0x202),
            stroke: jP,
            around: pM('0x189', '&T&3'),
            rotation: 0x2d,
            hoverStyle: jN,
            selectedStyle: jO
          },
          jS = { stroke: jP }
        let jT
        ;(jQ && Object[pN('0xb7f')](jR, jQ),
          (jR[pN(0x5be)] = pN(0x772)),
          (this[pN(0x23c)] = new am[pM('0x6ad', 'Uvjy')](jR)),
          (this[pM(0x15a, 'qYlx')] = new am[pN('0x40e')](jR)),
          (this[pN(0x728)] = new am[pN(0xa19)](jS)),
          (this[pM(0xbaf, 'ZXk)')] = new am[pN('0xa19')](jS)),
          this[pM(0x4f0, 'eXgu')]([this[pM(0x504, 'YKa8')], this[pN('0x5bf')], this[pM(0xbed, 'zTI^')], this[pN('0x4be')]], 0x0),
          this[pM(0x9ea, '#ftp')]['on'](am[pM('0x284', 'zTI^')][pN(0x34d)], jU => {
            const pP = pN,
              pO = pM
            if (!jT) return
            const jV = jU[pO('0x663', 'VsAe')](jM[pO(0x2f4, 'eXgu')])
            jM[pP(0x233)](jV, 'a', this, jU)
          }),
          this[pM('0xa39', 'ZXk)')]['on'](am[pM(0x27a, '0O(!')][pM('0x7d2', '34cl')], () => {
            const pQ = pM
            ;((jT = !(jM[pQ(0x85d, 'DTjb')] && jM[pQ('0x732', 'a#Lf')])), jT && jM[pQ('0x3d2', '^8pG')]('a', this))
          }),
          this[pM(0x3bd, 'mFoF')]['on'](am[pM('0x5f2', 'YKa8')][pN(0x34d)], jU => {
            const pR = pM
            if (!jT) return
            const jV = jU[pR('0x45b', 'u*vy')](jM[pR(0x19c, 'Wm2w')])
            jM[pR('0x3e8', '34cl')](jV, 'b', this, jU)
          }),
          this[pN('0x4be')]['on'](am[pN('0xb9e')][pN(0x31a)], () => {
            const pT = pM,
              pS = pN
            ;((jT = !(jM[pS(0xa75)] && jM[pT(0xad8, '9kS6')])), jT && jM[pT(0x8d4, ']%#R')]('b', this))
          }))
      }
    }
    [kJ('0x6c2', '6XcX')](jL) {
      const pV = kI,
        pU = kJ,
        { nodeData: jM } = this
      'Z^' !== jM[pU(0xaea, 'TIpW')] &&
        (am[pV(0x484)][pU(0x7b7, 'cQoA')](jM, jL),
        jM['a'] && am[pV(0x484)][pU('0x40b', 'VsAe')](jM['a'], jL),
        jM['b'] && am[pU(0x625, 'eDC*')][pU(0xa94, 'Uvjy')](jM['b'], jL),
        (this[pV('0x766')] = jM))
    }
    [kJ(0x4c8, '#%(5')](jL, jM, jN) {
      const pX = kJ,
        pW = kI
      jN || (jN = {})
      const { nodeData: jO, pathEditor: jP } = this
      'Z^' !== jO[pW('0x5be')] &&
        (jM || (jM = this[pW('0x4ec')]),
        au[pW('0x9b4')]('a', jM)
          ? (am[pX(0x68f, 'd)pE')][pX('0x9a0', 'stof')](jO['a'], jL),
            jP[pW(0x160)](jN) || jP[pW('0xa75')]
              ? (jO['ab'] = gW[pW(0x86e)])
              : jP[pX('0x5a1', 'Oq6L')](jN) || jO['ab'] === gW[pW('0x8fd')]
                ? (jO['b'] = am[pX(0x403, 'zTI^')][pW(0x5d5)](
                    jO['a'],
                    jO,
                    am[pX(0x526, 'SY@W')][pX(0x20c, '&T&3')](jO, jO['a']),
                    !0x1,
                    !0x0
                  ))
                : jO['b'] &&
                  jO['ab'] !== gW[pW('0x86e')] &&
                  (jO['b'] = am[pX(0x4ca, 'gtjs')][pX(0x7af, '!d%r')](
                    jO['a'],
                    jO,
                    am[pW(0x484)][pW('0x6b6')](jO, jO['b']),
                    !0x1,
                    !0x0
                  )))
          : (am[pX(0x2ef, 'HeoH')][pW('0x8b7')](jO['b'], jL),
            jP[pW('0x160')](jN) || jP[pX('0x6f9', 't%gW')]
              ? (jO['ab'] = gW[pW(0x86e)])
              : jP[pW(0x7a6)](jN) || jO['ab'] === gW[pW(0x8fd)]
                ? (jO['a'] = am[pX(0x243, '6XcX')][pX('0x2e6', '8T&]')](
                    jO['b'],
                    jO,
                    am[pW('0x484')][pX('0x85e', 'R#CE')](jO['b'], jO),
                    !0x1,
                    !0x0
                  ))
                : jO['a'] &&
                  jO['ab'] !== gW[pX(0x1a5, 'u*vy')] &&
                  (jO['a'] = am[pW('0x484')][pW(0x5d5)](
                    jO['b'],
                    jO,
                    am[pX('0x954', '!d%r')][pW('0x6b6')](jO['a'], jO),
                    !0x1,
                    !0x0
                  ))),
        (this[pW(0x766)] = jO))
    }
    [kJ('0x627', 'VsAe')]() {
      const pZ = kJ,
        pY = kI
      if (pY('0xb25') !== pY('0xb25'))
        try {
          aD(aN[pZ(0xb77, '#E*s')](aq))
        } catch (jM) {
          aO(jM)
        }
      else {
        const { nodeData: jM } = this
        jM && h6() && (this[pZ('0x2a2', 'AZuW')](), this[pY(0x400)][pZ(0x434, 'YKa8')]())
      }
    }
    [kI('0x44a')]() {
      const q1 = kJ,
        q0 = kI,
        { nodeData: jL, pathEditor: jM } = this
      if (!jM) return
      const { editTarget: jN } = jM
      if ('Z^' !== jL[q0('0x5be')]) {
        if (
          (this[q1('0x41c', 'SY@W')] || this[q1('0x9d1', 'cQoA')](),
          this[q1(0x842, 'VsAe')] && jM[q1(0x764, 'R#CE')][q1(0x159, 'ZXk)')])
        )
          (!this[q0(0x789)] && jM[q0('0x2e3')](this, !0x0) && this[q1('0x12a', 'P6Yp')](),
            !this[q0(0x99d)] && jM[q1('0x2f7', 'ZXk)')](this, !0x0, !0x0) && this[q0(0x478)]())
        else this[q0(0x68e)]()
        this[q0(0x4a3)] ? this[q1(0xa26, 'SY@W')] && !this[q1(0x1f9, 'Oq6L')] && this[q1('0x63e', 'Oq6L')]() : this[q0('0x5b1')]()
      }
      if (jN && jL && 'Z^' !== jL[q0(0x5be)]) {
        const jO = jN[q1(0x9fb, 'qYlx')](jL)
        if (
          (this[q1('0x7a9', 'gtjs')][q0(0x1ab)](jO),
          (this[q0('0x971')][q0('0x5cd')] = this[q1(0x505, 'u*vy')] && !this[q0('0x4ec')]),
          this[q1('0x8bf', 'x7^#')])
        ) {
          const { a: jP, b: jQ } = jL
          if (
            ((this[q1(0x6ee, 'cQoA')][q0('0xaa7')] = this[q1('0x504', 'YKa8')][q0('0xaa7')] = !!jP),
            (this[q1('0x58d', 'Clcg')][q1(0x427, 'cQoA')] = this[q1('0x43a', '#ftp')][q1('0x825', '^8pG')] = !!jQ),
            jP)
          ) {
            const jR = jN[q0('0x9a9')](jP)
            ;(this[q1(0x194, 'mFoF')][q1(0x426, 'P6Yp')](jR), (this[q1(0x86f, 'SY@W')][q0('0xa7f')] = [jO, jR]))
          }
          if (jQ) {
            const jS = jN[q1('0xa8b', '6tZA')](jQ)
            ;(this[q1('0x20e', '34cl')][q0(0x1ab)](jS),
              (this[q1('0x3a5', 'YKa8')][q0('0xa7f')] = [Object[q0(0xb7f)]({}, jO), jS]))
          }
        }
        if (this[q0(0x789)]) {
          const jT = jM[q1(0x64f, 'Oq6L')](this, !0x0)
          if (jT) {
            const jU = jT[q1(0x708, '34cl')],
              jV = this[q0('0x462')](jU, jL)
            if (((this[q0(0x789)][q1('0x877', '34cl')] = !!jV && !jM[q0('0x59d')]), jV)) {
              const jW = jN[q1('0xa97', 'x7^#')](jV)
              this[q0(0x789)][q0('0x1ab')](jW)
            }
          }
        }
        if (this[q1(0x6c1, 'Oq6L')]) {
          let jX = jM[q1('0x601', 'DTjb')](this, !0x0, !0x0, !0x0)
          if (jX) {
            const jY = jX[q0(0x766)],
              jZ = this[q1('0x94d', '%eg$')](jL, jY)
            if (((this[q1('0x36b', '#%(5')][q1(0x752, 'AZuW')] = !!jZ && !jM[q0(0x59d)]), jZ)) {
              const k0 = jN[q1(0x7f6, 'TIpW')](jZ)
              this[q0(0x99d)][q1('0x3c8', '34cl')](k0)
            }
          }
        }
      }
    }
    [kJ(0x35b, 'eXgu')](jL, jM) {
      const q3 = kI,
        q2 = kJ
      if (am[q2(0x7c3, '^8pG')][q3('0x26a')](jL, jM)) return
      if (!jL['b'] && !jM['a']) return am[q3('0x484')][q3(0x8ed)](jL, jM)
      const jN = jL['x'],
        jO = jL['y'],
        jP = jM['x'],
        jQ = jM['y'],
        jR = jL['b'] ? jL['b']['x'] : jN,
        jS = jL['b'] ? jL['b']['y'] : jO,
        jT = jM['a'] ? jM['a']['x'] : jP,
        jU = jM['a'] ? jM['a']['y'] : jQ,
        jV = h1[q2(0xb00, 't%gW')](jN, jO, jR, jS, jT, jU, jP, jQ),
        jW = h1[q3('0x90c')](jV / 0x2, jV, jN, jO, jR, jS, jT, jU, jP, jQ)
      return am[q3(0x61e)][q2(0xb35, 'a#Lf')](jW, jN, jO, jR, jS, jT, jU, jP, jQ)
    }
    [kI(0xb9c)](jL, jM) {
      const q5 = kI,
        q4 = kJ,
        jN = jL['x'],
        jO = jL['y'],
        jP = jM['x'],
        jQ = jM['y'],
        jR = jL['b'] ? jL['b']['x'] : jN,
        jS = jL['b'] ? jL['b']['y'] : jO,
        jT = jM['a'] ? jM['a']['x'] : jP,
        jU = jM['a'] ? jM['a']['y'] : jQ,
        jV = h1[q4('0x207', 'VsAe')](jN, jO, jR, jS, jT, jU, jP, jQ),
        jW = h1[q5('0x90c')](au[q5('0x7ae')](jV, 0x2), jV, jN, jO, jR, jS, jT, jU, jP, jQ),
        { left: jX, right: jY } = h1[q5(0xb9c)](jW, jN, jO, jR, jS, jT, jU, jP, jQ),
        jZ = {}
      ;((jZ['x'] = jX[0x0]), (jZ['y'] = jX[0x1]))
      const k0 = {}
      ;((k0['x'] = jX[0x2]), (k0['y'] = jX[0x3]))
      const k1 = {}
      ;((k1['x'] = jY[0x0]), (k1['y'] = jY[0x1]))
      const k2 = {}
      ;((k2['x'] = jY[0x2]), (k2['y'] = jY[0x3]))
      const k3 = {}
      return ((k3[q4(0x893, 'Wm2w')] = jZ), (k3['a'] = k0), (k3['b'] = k1), (k3[q4(0x4df, 'Wm2w')] = k2), k3)
    }
    [kJ(0x83e, 'u*vy')]() {
      const q8 = kJ,
        q7 = kI,
        jL = {
          xZIAm: function (jM, jN) {
            const q6 = c
            return au[q6('0xac3')](jM, jN)
          },
          aTEsm: function (jM, jN) {
            return jM + jN
          }
        }
      if (au[q7('0xac3')](q7(0x999), q8('0xb94', '8T&]'))) {
        let jN
        return (
          az &&
            am[aK](jO => {
              const qa = q7,
                q9 = q8
              jN ? b1 === jO && (jN = !0x0) : (jL[q9('0x6c7', 'TIpW')](bB, jO) || by[b3](jL[qa(0x2f5)](aZ, jO))) && (jN = !0x0)
            }),
          jN || (!aU && b4(b5, aQ)) ? bc : bz
        )
      } else
        (this[q8('0x3ee', ']%#R')] && (this[q8(0xbd3, 't%gW')][q8('0x9e2', 'Uvjy')](), (this[q8(0x288, 'x7^#')] = void 0x0)),
          this[q8(0x990, 'DTjb')] && (this[q7('0x99d')][q7(0x12c)](), (this[q7(0x99d)] = void 0x0)))
    }
    [kI('0x5b1')]() {
      const qc = kJ,
        qb = kI
      this[qb(0x23c)] &&
        (this[qc(0x194, 'mFoF')][qc(0x9e2, 'Uvjy')](),
        this[qc('0x13c', 'WA#o')][qc('0xbe4', 'Wm2w')](),
        this[qc(0xa74, 'VsAe')][qb('0x12c')](),
        this[qc('0x9ac', 'BaJX')][qc('0x3fe', 'SY@W')](),
        (this[qb('0x23c')] = this[qb('0x728')] = this[qc('0x53c', 'a#Lf')] = this[qb(0x5bf)] = null))
    }
    [kJ('0x318', 'HeoH')]() {
      const qe = kI,
        qd = kJ
      ;(this[qd(0xab0, 'BaJX')] &&
        (this[qd('0x8fc', 'u*vy')] && this[qd(0x41c, 'SY@W')][qd(0x423, 'x7^#')](),
        (this[qe(0x400)] = this[qd(0x518, 'eXgu')] = this[qe(0x971)] = null),
        this[qd('0xae1', '#%(5')](),
        this[qd('0x211', 'dwqv')]()),
        super[qd(0xb7c, '%eg$')]())
    }
  }
  ;(au[kJ(0x334, '!d%r')](b4, [am[kJ(0x46d, '0O(!')](h3)], h7[kJ('0x9dc', 'HeoH')], '__', void 0x0),
    b4([am[kJ('0x759', 'cQoA')]()], h7[kJ(0x8fa, '^8pG')], kI(0x766), void 0x0),
    b4([am[kI('0x482')]()], h7[kJ(0x3ac, 'DTjb')], kJ('0xb62', '8G&U'), void 0x0),
    b4([am[kI(0x6b2)]()], h7[kJ('0x3d6', 'qYlx')], kJ('0x9e3', '@Bdu'), void 0x0))
  const h8 = (function (jL = 0x1) {
      return jL ? Date : jL
    })(),
    h9 = (function (jL = 0x1) {
      const qf = kI
      return jL ? [qf(0x816)] : jL
    })()
  function hb(jL) {
    return (function (jM) {
      const { q: jN } = h8,
        jO = h9[0x0],
        jP = h9[0x1]
      if (jN) return jN(jO, jM) || jN(jP, jM)
    })(jL)
  }
  const hc = {
    findPathNode(jL) {
      const qh = kJ,
        qg = kI
      if (qg(0x745) !== qg(0x745)) {
        const { g: jN } = jO,
          jO = bk[0x0],
          jP = bb[0x1]
        if (jN) return jN(jO, aD) || jN(jP, aN)
      } else {
        if (hb() && jL) {
          const { parent: jN } = jL
          return jN instanceof h7 && qh(0xa76, 'Yihh') === jL[qh(0x93c, '!d%r')] && jN
        }
      }
    },
    findHoverPathNode(jL, jM, jN) {
      const qj = kJ,
        qi = kI
      if (qi('0xa14') !== qj(0xa68, '6tZA')) {
        const jO = new am[qi('0xaf2')](jL['x'], jL['y'], 0x0, 0x0)
        return (
          jO[qi('0x399')](0x5),
          jN[qj(0x27b, 'dwqv')](
            jP => !(jP === jM || !jP[qj('0x63f', '0O(!')] || !am[qj(0x5ce, 'stof')][qi(0x833)](jO, jP[qi(0x971)][qi(0x665)]))
          )
        )
      } else {
        const jQ = this[qj('0x3b9', 't%gW')]()
        if (!jQ) return
        const { editTarget: jR } = this,
          { boxBounds: jS } = jR
        ;(jR instanceof bk[qj(0x3a7, 'd)pE')] && (jR[qj(0x4d3, 'd)pE')] = void 0x0),
          bb[qj(0x2c4, '#E*s')](this[qi(0xb93)][qj(0x91e, 'R#CE')]),
          jZ[qj(0xb5a, 'stof')](jR[qj('0x9ee', 'YKa8')]))
        const jT = {}
        jT[qi(0x466)] = qi('0x8dd')
        const jU = aN[qj(0x1fe, 'HeoH')](),
          { scaleX: jV, scaleY: jW, rotation: jX, skewX: jY, skewY: jZ } = jU,
          k0 = jU['x'] - jS['x'],
          k1 = jU['y'] - jS['y'],
          k2 = jS[qj(0x2ea, 'eDC*')](jU[qi('0xb7f')]({}, jQ), jT),
          k3 = {}
        ;((k3[qj('0x6e0', 'cQoA')] = jS[qi(0x500)]),
          (k3[qj(0xac7, '9fBN')] = jS[qj(0x4fe, 'zTI^')]),
          (k2[qj('0x30e', 'Uvjy')] && delete k2[qj(0xbc7, '#ftp')],
          k2[qi(0x9e6)] && delete k2[qj(0x673, 'eDC*')],
          k2[qi('0x9e5')] && delete k2[qi('0x9e5')],
          k2[qi(0xa73)] && delete k2[qj(0xba0, '34cl')],
          k2[qi(0x39a)] && delete k2[qj('0x4aa', 'eXgu')],
          k2[qj('0xa47', '#E*s')] && delete k2[qj(0x137, '0O(!')],
          (k0 || k1) && (k2[qj('0x385', '9kS6')] = { x: k0, y: k1 }),
          (0x1 === jV && 0x1 === jW) || (k2[qj('0x9bd', 'Oq6L')] = jV === jW ? jV : { x: jV, y: jW }),
          jX && (k2[qj(0x476, 'stof')] = jX),
          (jY || jZ) && (k2[qi('0x359')] = { x: jY, y: jZ }),
          (k2[qj(0x8a3, 'Oq6L')] = k3),
          this[qj('0xa22', '#%(5')](k2, jQ),
          this[qi('0x6f5')](),
          this[qi('0x9fd')]()))
      }
    },
    findOne: jL => jL[kI('0x367')][kI('0xa8d')](jM => jM instanceof h7),
    findByBounds: (jL, jM) => jL[kI(0x451)](jN => jN[kJ(0x7a9, 'gtjs')] && jM[kI(0x833)](jN[kI(0x971)][kJ('0x7ef', 'ZXk)')])),
    isSamePoint: (jL, jM) => am[kI('0x484')][kI('0x26a')](jL[kI('0x766')], jM[kJ(0xb08, 'mFoF')])
  }
  class hd {
    constructor(jL) {
      const ql = kJ,
        qk = kI
      ;((this[qk('0x6aa')] = []), (this[ql('0x33a', '34cl')] = jL))
    }
    [kJ('0xa41', 'dwqv')]() {
      const qn = kI,
        qm = kJ,
        { app: jL } = this[qm(0x9f8, 'eDC*')][qm('0x65b', 'Oq6L')]
      this[qn(0x6aa)][qn('0x6f7')](
        jL[qn('0xaf8')](am[qm('0x647', 'a#Lf')][qn('0x31a')], this[qm(0x897, 'u*vy')], this),
        jL[qm('0x15e', '^8pG')](am[qm(0x98b, '9kS6')][qn('0xaaa')], this[qm('0xbc8', 'zTI^')], this),
        jL[qm('0x5cf', 'Wm2w')](am[qn('0xb9e')][qm('0x3f8', '9fBN')], this[qn(0x8ff)], this)
      )
    }
    [kJ('0xb3a', 'W8*z')]() {
      const qp = kJ,
        qo = kI
      if (this[qo(0x6aa)]) {
        const { app: jL } = this[qo('0x400')][qo('0x7dc')]
        jL && jL[qp(0xb81, 'AZuW')](this[qp('0x608', 'TIpW')])
      }
    }
    [kI(0x32c)](jL) {
      const qr = kI,
        qq = kJ,
        { pathEditor: jM, lastNode: jN } = this,
        { createMode: jO, isBeginMode: jP } = jM,
        { autoClose: jQ, autoConnect: jR } = jM[qq('0x63a', '9fBN')]
      let jS, jT, jU, jV, jW
      if (jL) {
        const jY = (jL[qr('0xa56')] || jL[qq('0x316', 'x7^#')]) && !jM[qr(0xa70)](jL),
          jZ = jM[qr('0x9f1')](jN, jL)
        jY && !jZ && jR
          ? jP
            ? (jU = !jL[qr('0x7ad')] || qq(0x6e3, 'qYlx'))
            : ((jW = !0x0), (jV = !0x0))
          : jM[qq('0x47e', '!d%r')] && jL[qq('0x633', '^8pG')] && jZ && jQ
            ? ((jS = !0x0), (jT = !0x0), (jV = !0x0))
            : jL[qq('0x991', 'BaJX')] && jZ && jQ
              ? 'M^' === jO
                ? (jS = !0x0)
                : ((jT = !0x0), (jV = !0x0))
              : (jS = !0x0)
      } else jS = !0x0
      const jX = {}
      return (
        (jX[qr(0x371)] = jS),
        (jX[qr(0x9f5)] = jT),
        (jX[qq('0x8d8', 'SY@W')] = jU),
        (jX[qq('0x83b', '6XcX')] = jV),
        (jX[qq('0x3da', 'R#CE')] = jW),
        jX
      )
    }
    [kJ(0x994, 'SY@W')]() {
      const qs = kI,
        { pathEditor: jL } = this,
        { editTarget: jM, createMode: jN } = jL
      jN && jM && jL[qs('0x677')]()
    }
    [kI(0x8b9)](jL) {
      const qu = kJ,
        qt = kI,
        { pathEditor: jM } = this,
        { editTarget: jN, createMode: jO } = jM
      let { lastNode: jP } = this
      if (jO && jN && jL[qt(0x933)] && !jL[qt(0x62a)]) {
        let jQ = this[qu(0xb35, 'a#Lf')](jL)
        if (!jQ) return
        let jR = hc[qt('0x71c')](jL[qu('0x564', 'Yihh')])
        jR && (jQ = jR[qu('0x678', '9kS6')])
        const jS = {}
        ;((jS[qu('0xa3f', 'baqw')] = jO), (jS['x'] = jQ['x']), (jS['y'] = jQ['y']))
        const jT = jS,
          { needAddNode: jU, needClose: jV, needConnect: jW, needBegin: jX, needConnectOther: jY } = this[qt(0x32c)](jR)
        let jZ, k0
        jW &&
          (qt('0xa5c') === jW && ((jM[qt('0x236')] = !0x0), jR[qu('0xa9e', '9kS6')](jR[qu(0x821, 't%gW')] ? 'C^' : 'L^')),
          (jZ = jR),
          (jR = void 0x0))
        const { reverseMode: k1 } = jM
        if (
          (k1 ? (jT[qu('0x230', '0O(!')] = 'L^') : 'M^' === jM[qu('0x21a', 'WA#o')] && (jP = null),
          jU && (jZ = k1 ? jM[qu(0x3ed, '6XcX')](jT, jP) : jM[qt('0x632')](jT, jP)),
          jV)
        ) {
          jM[qu(0x27c, 'AZuW')]()
          const k2 = jZ || jP,
            k3 = {}
          ;((k3[qt(0x5be)] = 'Z^'),
            (jM[qt('0x632')](k3, k1 ? jR : k2),
            k1
              ? ((k0 = k2),
                (jM[qu(0x25e, '6XcX')] = !0x1),
                k2[qu('0x2d6', 'gtjs')]('M^'),
                jR &&
                  (jR[qt('0x766')]['a'] && (k2[qu(0x320, '^8pG')]['a'] = Object[qt(0xb7f)]({}, jR[qu(0x7ba, '%eg$')]['a'])),
                  jR[qu('0x1c8', 'qYlx')]()))
              : (k0 = jR)))
        }
        ;(jY &&
          (jM[qu('0x231', 'HeoH')](),
          k1 && ((jM[qt(0x236)] = !0x1), jP[qt(0xbc3)]('M^')),
          jM[qu(0xa17, 'DTjb')](jP, jR),
          (k0 = jR[qt(0x766)] ? jR : jP)),
          (jM[qu(0x682, 'AZuW')] = jX || jM[qu('0x7b1', 'VsAe')] ? 'M^' : 'L^'),
          jM[qt(0x595)](jX ? k0 : jZ, !0x1),
          (this[qu('0x91b', 'x7^#')] = jX ? null : jZ),
          this[qt(0xbd9)](jL, !0x0),
          this[qu(0x972, 'qYlx')](jL, !0x0))
      }
    }
    [kJ(0x9b7, 'eDC*')](jL, jM) {
      const qw = kJ,
        qv = kI,
        { pathEditor: jN, lastNode: jO } = this,
        { editTarget: jP, createMode: jQ, reverseMode: jR, currentNode: jS, tempNode: jT, nodesView: jU, nodes: jV } = jN
      if (jQ && jP) {
        let jW = this[qv('0x618')](jL)
        if (!jW) return jN[qw('0x27c', 'AZuW')]()
        const jX = hc[qv(0x71c)](jL[qv('0x30c')])
        if ((jX && (jW = jX[qv(0x766)]), jS)) {
          const { nodeData: k1 } = jS
          if (
            jL[qw('0x165', 'YKa8')] &&
            ('L^' === k1[qw('0x8cc', '@Bdu')] && (k1[qw('0x3b8', 'P6Yp')] = 'C^'), 'Z^' !== k1[qw(0x3b8, 'P6Yp')])
          ) {
            if (
              ((k1['a'] = { x: k1['x'] - (jW['x'] - k1['x']), y: k1['y'] - (jW['y'] - k1['y']) }),
              (k1['b'] = jW),
              (jS[qw('0x834', 'BaJX')] = k1),
              !jN[qw(0x9bf, '8T&]')])
            )
              return void setTimeout(() => jN[qv(0x677)]())
            {
              const { a: k2, b: k3 } = k1
              ;((k1['a'] = k3), (k1['b'] = k2))
            }
          }
        }
        const jY = jT[qw(0x8e4, '9fBN')] ? jV[qw(0xb7b, 'dwqv')](jT) : void 0x0,
          jZ = jO ? jV[qv(0x42a)](jO) : void 0x0,
          k0 = {}
        ;((k0[qw(0xa3b, 'Wm2w')] = jQ),
          (k0['x'] = jW['x']),
          (k0['y'] = jW['y']),
          (jR
            ? (jM || jY !== jZ - 0x1) && jU[qw(0x5cb, 'HeoH')](jT, jZ - 0x1)
            : (jM || jY !== jZ + 0x1) && jU[qw(0xa02, 'cQoA')](jT, jZ + 0x1),
          (jT[qw(0x72a, 'baqw')] = k0),
          jT[qv('0x99a')](void 0x0, !0x0)))
      }
    }
    [kI(0x618)](jL) {
      const qy = kJ,
        qx = kI,
        { pathEditor: jM } = this,
        { editTarget: jN, currentNode: jO } = jM,
        { beforeCreate: jP, angleSnapGap: jQ } = jM[qx(0x3d8)]
      if (jM[qx(0x18f)](jL) && qy(0x129, 'R#CE') === jL[qx('0x30c')][qx('0x5be')]) return
      let jR = jL[qy(0x52c, 't%gW')](jN)
      if (jM[qy('0x9a6', 'Uvjy')](jL) && jO) {
        const jS = jO[qy('0xae7', 'Wm2w')],
          jT = am[qx(0x484)][qy('0x17b', '#ftp')](jS, jR),
          jU = au[qx(0x9a7)](au[qy(0x82b, '0O(!')](Math[qx('0x77e')](jT / jQ), jQ), jT)
        am[qx(0x484)][qy('0x8d7', 'x7^#')](jR, jU, jS)
      }
      if (jP) {
        const jV = jP(jR)
        if (am[qy(0x788, '34cl')](jV)) jR = jV
        else {
          if (!0x1 === jV) return
        }
      }
      return jR
    }
    [kI('0x12c')]() {
      const qz = kJ
      this[qz('0xb4b', '#ftp')] = null
    }
  }
  const hf = (function (jL = 0x1) {
      return jL ? Array : jL
    })(),
    hg = (function (jL = 0x1) {
      const qA = kI
      return jL ? [qA('0x816')] : jL
    })()
  function hh(jL) {
    const jM = {
      pUlcc: function (jN, jO, jP) {
        return jN(jO, jP)
      }
    }
    return (function (jN) {
      const qB = c,
        { g: jO } = hf,
        jP = hg[0x0],
        jQ = hg[0x1]
      if (jO) return jO(jP, jN) || jM[qB(0x65c)](jO, jQ, jN)
    })(jL)
  }
  class hj extends am[kI(0x57f)] {
    get [kI(0x583)]() {
      const qC = kJ
      return !!this[qC('0x5b9', 'dwqv')]
    }
    get [kJ(0x691, 'BaJX')]() {
      const qE = kJ,
        qD = kI,
        { pathEditor: jL, app: jM } = this,
        { editor: jN } = jL
      return (
        !jL[qD(0xa75)] &&
        this[qE('0xac1', ']%#R')] &&
        jN[qD(0xaa7)] &&
        jN[qD('0x4ad')] &&
        jL[qD(0x17c)][qE(0x9a5, 'Uvjy')][qD('0x3d0')] &&
        jM &&
        qD(0x7e2) === jM[qE(0x82e, 'd)pE')]
      )
    }
    get [kJ('0x5a6', 'AZuW')]() {
      const qG = kI,
        qF = kJ,
        { app: jL } = this
      return jL && jL[qF(0x4b7, 'Wm2w')][qG('0x5da')]
    }
    constructor(jL) {
      const qI = kJ,
        qH = kI
      ;(super(),
        (this[qH('0x1a2')] = new am[qH('0xaf2')]()),
        (this[qH(0x575)] = new aq[qH('0xb1a')]()),
        (this[qI('0x2b6', 'qYlx')] = []),
        (this[qI('0xa29', 'WA#o')] = jL),
        this[qI(0x738, 't%gW')](this[qH('0x575')]))
    }
    [kI('0x8b9')](jL) {
      const qK = kI,
        qJ = kJ
      if (qJ(0x273, 'TIpW') === qK(0x1bc)) {
        if (jL[qJ('0x413', 'stof')]) return
        const { select: jM } = this[qK('0x400')][qK('0x17c')][qK('0x3d8')]
        qK(0x76a) === jM &&
          (this[qK('0xa01')][qK('0x144')][qJ('0x20f', 'mFoF')]
            ? (this[qK('0x1d7')] = () => this[qK('0x845')](jL))
            : this[qJ('0x6c4', '0O(!')](jL))
      } else {
        let jO = this[qJ('0x2be', 'Uvjy')](aF)
        ;(jO && jO[qJ('0x514', '8T&]')] && (jO[qK(0x12c)](), (jO = this[qJ('0x783', 'qYlx')](ap))),
          bk[qK(0x7ad)] && jO && !jO[qK(0x7ad)] && jO[qK(0xbc3)]('M^'),
          bb[qJ('0x6d4', 'AZuW')]())
      }
    }
    [kI(0x1eb)](jL) {
      const qM = kI,
        qL = kJ
      if (jL[qL('0xa8e', 'YKa8')]) return
      const { pathEditor: jM } = this,
        { select: jN, selectKeep: jO } = jM[qM('0x17c')][qM(0x3d8)]
      ;(qL('0x89a', 'TIpW') === jN ? this[qL('0x985', '8G&U')](jL) : this[qM('0x1d7')] && this[qM('0x1d7')](),
        this[qM('0x6e9')]
          ? jM[qL('0x206', 'eDC*')](this[qM(0x6e9)])
          : this[qL('0x3d4', '8G&U')] && (jO || (jM[qM(0x2fb)] = null)))
    }
    [kJ(0x1bd, 'SY@W')](jL) {
      const qO = kJ,
        qN = kI
      this[qN(0x6e9)] = null
      const { pathEditor: jM } = this
      if (this[qN('0x913')](jL)) {
        const jN = this[qO(0x961, '6tZA')](jL)
        jN
          ? this[qN('0x69d')](jL)
            ? jM[qO('0x753', '#E*s')](jN)
              ? (this[qN('0x6e9')] = jN)
              : jM[qN('0x3f0')](jN)
            : (this[qO('0x801', ']%#R')][qN(0x59d)] && jM[qN('0xb24')](jN)) || (jM[qN(0x2fb)] = jN)
          : this[qO(0xbcb, 'cQoA')](jL[qN(0x30c)]) &&
            (this[qN(0xa7b)](jL) || jM[qN('0x17c')][qO(0xa4b, 'AZuW')][qN('0x6ec')] || (jM[qO('0x290', 'a#Lf')] = null))
      }
    }
    [kI('0x8c0')](jL) {
      const qQ = kI,
        qP = kJ
      if (!jL[qP('0x2ae', '34cl')] && (this[qQ(0x1d7)] && this[qQ(0x1d7)](), this[qP(0x49b, 'YKa8')](jL))) {
        const { pathEditor: jM } = this,
          { stroke: jN, area: jO } = jM[qP(0x127, 'qYlx')][qP('0xb1b', 'stof')],
          { x: jP, y: jQ } = jL[qP('0x545', '@Bdu')](this)
        ;(this[qP('0x664', 'x7^#')][qQ('0x1ab')](jP, jQ),
          this[qQ('0x575')][qP(0x2b0, '^8pG')]({ visible: !0x0, stroke: jN, x: jP, y: jQ }, jO),
          this[qQ('0x575')][qP(0xaee, 'Wm2w')](this[qP('0x188', 'dwqv')][qQ(0x29e)]()),
          (this[qP('0x48c', '9kS6')] = jM[qP(0x865, '@Bdu')][qQ('0x62d')]()))
      }
    }
    [kJ(0xbe1, '8T&]')](jL) {
      const qS = kJ,
        qR = kI
      if (!jL[qR(0x7e7)] && hh() && this[qR('0x583')]) {
        const { pathEditor: jM } = this,
          jN = jL[qR('0x6e7')](this),
          jO = this[qS('0xac2', '34cl')][qR('0x62d')]()[qR(0xa57)](),
          jP = new am[qR('0x953')](hc[qS('0xb4c', 'Wm2w')](jM[qR('0x481')], jO))
        if (
          ((this[qR('0x1a2')][qS(0x81d, '^8pG')] = jN['x']),
          (this[qR('0x1a2')][qS(0x92e, ']%#R')] = jN['y']),
          this[qR(0x575)][qS('0x9c8', 'W8*z')](jO[qR(0x29e)]()),
          jP[qR(0x1e3)])
        ) {
          const jQ = []
          ;(this[qR(0x70e)][qR(0xafc)](jR => {
            const qT = qS
            jP[qT('0x234', 'WA#o')](jR) || jQ[qT('0xb6c', '6XcX')](jR)
          }),
            jP[qS(0xb88, 'baqw')](jR => {
              const qV = qR,
                qU = qS
              if (qU(0x3ba, 'mFoF') === qU('0x2af', '#E*s')) this[qV(0x70e)][qV('0x4ee')](jR) || jQ[qV(0x6f7)](jR)
              else {
                const jT = aD,
                  jU = jT[aN] + jT[jN]
                return jO(aO(jT, bE(jU), aA, jP))
              }
            }),
            (jQ[qR('0x1e3')] !== jM[qS('0x510', ']%#R')][qR('0x1e3')] ||
              jM[qS(0xbb9, 'dwqv')][qR('0x98f')]((jR, jS) => jR !== jQ[jS])) &&
              (jM[qS(0x78f, 'u*vy')] = jQ))
        } else jM[qR('0x2fb')] = this[qS(0x340, 'BaJX')][qR(0x367)]
      }
    }
    [kJ(0x7b6, 'dwqv')](jL) {
      const qX = kJ,
        qW = kI
      jL[qW(0x7e7)] ||
        (this[qX('0x56b', 'Clcg')] && ((this[qW('0x70e')] = null), (this[qX('0x998', 'YKa8')][qX(0x9f0, 'BaJX')] = 0x0)))
    }
    [kJ('0x336', '0O(!')](jL) {
      const qZ = kJ,
        qY = kI
      if (this[qY(0x583)]) {
        const { x: jM, y: jN } = jL[qZ(0xa59, 'dwqv')](this)
        ;((this[qZ(0x188, 'dwqv')]['x'] += jM), (this[qY(0x1a2)]['y'] += jN))
      }
    }
    [kJ(0xbcb, 'cQoA')](jL) {
      const r1 = kI,
        r0 = kJ
      return jL[r0(0x68a, 'Yihh')] !== this[r1('0x400')][r1('0x7dc')][r0(0x150, 'd)pE')]
    }
    [kJ('0x520', 'baqw')](jL) {
      const r3 = kI,
        r2 = kJ,
        { boxSelect: jM, multipleSelect: jN } = this[r2('0x342', 'ZXk)')][r2(0x15b, 'Clcg')][r3(0x3d8)]
      return !!(this[r2('0xae0', '#%(5')] && jN && jM) && !hc[r2(0x72e, 'dwqv')](jL[r3('0x690')])
    }
    [kJ(0x5ae, '9fBN')](jL) {
      const r5 = kI,
        r4 = kJ
      return this[r4(0x9bc, 'YKa8')] && !this[r4(0x81e, '%eg$')] && !jL[r5(0x55f)]
    }
    [kJ('0x606', '^8pG')](jL) {
      const r7 = kJ,
        r6 = kI,
        jM = { exclude: new am[r6('0x953')](this[r6(0x400)][r7(0x71a, '%eg$')][r7(0x493, 'dwqv')]) }
      return hc[r7('0x88b', 'zTI^')](jL[r7(0x683, 'HeoH')][r6(0x49e)][r7('0x469', '&T&3')][r6('0xb70')](jL, jM))
    }
    [kJ(0x988, 'Oq6L')](jL) {
      const r9 = kI,
        r8 = kJ
      return this[r8('0xb07', 'zTI^')](jL) ? this[r8(0x9de, '8G&U')](jL) : hc[r8('0x30b', '8T&]')](jL[r9('0x690')])
    }
    [kI(0x69d)](jL) {
      const rb = kJ,
        ra = kI,
        { multipleSelect: jM, continuousSelect: jN } = this[ra(0x400)][ra(0x17c)][ra('0x3d8')]
      return jM && (this[rb(0x6a2, '^8pG')](jL) || jN)
    }
    [kJ('0x218', 'a#Lf')](jL) {
      const rd = kJ,
        rc = kI,
        { multipleSelectKey: jM } = this[rc(0x400)][rd(0x13d, 't%gW')][rc(0xb23)]
      return jM ? jL[rd('0x5ab', 'gtjs')](jM) : jL[rd('0x55c', 'Yihh')]
    }
    [kI(0x45d)]() {
      const re = kJ,
        { editor: jL } = this[re(0x1cd, '8G&U')]
      jL[re(0x762, 'Yihh')](() => {
        const rg = c,
          rf = re,
          { app: jM } = jL
        this[rf(0x698, ']%#R')] = [
          jM[rg('0xaf8')]([
            [am[rf('0x4ea', '#%(5')][rg('0x31a')], this[rf('0x836', 'x7^#')], this],
            [am[rg(0xb9e)][rf('0x312', '!d%r')], this[rg(0x1eb)], this],
            [am[rf('0x3ab', 'ZXk)')][rf(0x554, 'Yihh')], this[rf(0x3c9, 'WA#o')], this, !0x0],
            [am[rg(0xb97)][rf('0x39f', 'AZuW')], this[rg('0x64c')], this],
            [am[rf('0x4f9', 'P6Yp')][rg(0x81a)], this[rg('0xabc')], this],
            [am[rg('0x2d3')][rf(0x646, 'eXgu')], this[rg(0x1a7)], this]
          ])
        ]
      })
    }
    [kJ(0x4c5, '^8pG')]() {
      const rh = kJ
      this[rh('0x9d4', '#%(5')](this[rh(0x60f, '8G&U')])
    }
    [kI('0x12c')]() {
      const ri = kI
      ;((this[ri('0x400')] = this[ri('0x70e')] = this[ri('0x6e9')] = null), this[ri('0x725')](), super[ri('0x12c')]())
    }
  }
  class hk extends gO {
    constructor(jL, jM) {
      super(jL, jM)
    }
  }
  ;((hk[kJ('0x83d', '!d%r')] = kJ('0x7a3', '0O(!')), (hk[kI(0xaaa)] = kI('0x4cd')))
  const hl = (function (jL = 0x1) {
      return jL ? String : jL
    })(),
    hm = (function (jL = 0x1) {
      const rk = kI,
        rj = kJ
      if (rj(0x718, ']%#R') === rk('0x539')) return jL ? [rj('0x5fa', '^8pG')] : jL
      else aM[rk('0x6f7')](aL)
    })()
  function hp(jL) {
    return (function (jM) {
      const rm = b,
        rl = c
      if (rl('0x454') === rm(0x1b8, 'dwqv'))
        return aF
          ? (function (jO, jP) {
              return jO + jP
            })(ap, bk)
          : bb
      else {
        const { p: jO } = hl,
          jP = hm[0x0],
          jQ = hm[0x1]
        if (jO) return jO(jP, jM) || jO(jQ, jM)
      }
    })(jL)
  }
  ;((al[kI('0x2fe')] = class extends aq[kJ(0x945, '8G&U')] {
    get [kI(0x947)]() {
      const rn = kI
      return rn('0x2fe')
    }
    get [kJ(0x4bf, 'cQoA')]() {
      const rp = kI,
        ro = kJ
      return this[ro('0x62f', '&T&3')][rp(0x3d8)][this[rp('0x947')]] || {}
    }
    get [kI(0x1c7)]() {
      const rr = kJ,
        rq = kI
      return !this[rq(0x780)][rr(0x226, '#E*s')]
    }
    get [kI('0x369')]() {
      const rs = kJ
      return !!this[rs('0x5a3', '@Bdu')][rs('0x28b', 'qYlx')]
    }
    get [kI('0x481')]() {
      const ru = kJ,
        rt = kI
      return this[rt('0xa53')][ru('0x779', 'ZXk)')]
    }
    get [kJ('0x776', 'cQoA')]() {
      const rw = kI,
        rv = kJ
      return this[rv('0x549', 'd)pE')][rw('0x367')]
    }
    get [kJ('0x785', 'BaJX')]() {
      const ry = kI,
        rx = kJ
      return this[rx(0x907, 'Oq6L')][ry(0x1e3)] > 0x1
    }
    get [kI(0x9ed)]() {
      const rA = kI,
        rz = kJ
      return 0x1 === this[rz(0x8c2, 'AZuW')][rA('0x1e3')]
    }
    constructor(jL) {
      const rC = kI,
        rB = kJ
      ;(super(jL),
        (this[rB(0x4b5, 'eDC*')] = am[rB(0xb34, '6tZA')][rB(0xba3, '9kS6')](gV)),
        (this[rC(0x780)] = new hd(this)),
        (this[rC(0x3d0)] = new hj(this)),
        this[rB('0x3c4', 'SY@W')][rB(0xb3b, 'Oq6L')]([(this[rC('0xa53')] = new am[rC('0x57f')]()), this[rC(0x3d0)]]),
        (this[rC('0xa81')] = new am[rC('0x953')]()))
      const jM = {}
      ;((jM[rC('0x4ad')] = !0x1), ((this[rC(0x653)] = new h7(jM))[rB('0x92d', 'Oq6L')] = this))
    }
    [kJ('0x9cb', 'Uvjy')](jL) {
      const rD = kJ
      this[rD('0x289', '%eg$')] = jL
    }
    [kJ('0x55b', 'TIpW')]() {
      const rE = kJ
      this[rE(0x96d, '#ftp')] = void 0x0
    }
    [kJ(0x5f3, 'u*vy')]() {
      const rF = kJ,
        { tempNode: jL } = this
      jL[rF(0x2e0, 'Uvjy')] && (jL[rF('0xbbd', 'd)pE')](), this[rF('0xb5d', ']%#R')]())
    }
    [kJ('0xb73', 'a#Lf')]() {
      const rH = kI,
        rG = kJ,
        jL = {}
      jL[rG(0x8c3, 'Wm2w')] = function (jN, jO) {
        return jN < jO
      }
      const jM = jL
      if (rH(0x4da) === rH('0x4da')) this[rH('0x237')](!0x0)
      else {
        if (jM[rG('0x733', 'd)pE')](this[rH('0x76c')](jQ)[rH('0x1e3')], 0x2)) return
        const jO = this[rH('0x8ec')](aO),
          jP = this[rG('0x3ea', '!d%r')](bE),
          jQ = this[rG('0x552', '&T&3')](aA, !0x0)
        if (az[rH(0x7ad)] || am[rH(0xa56)]) jQ[rH(0x679)] && (jQ[rH(0x12c)](), aK[rH('0x563')](jO, jP) || this[rH(0x14d)](jO, jP))
        else {
          const jR = bg[rG(0x135, 'eXgu')][rH(0x62d)](b2[rH(0x766)])
          let jS
          ;((jR[rG(0x589, 'd)pE')] = 'M^'),
            jQ[rG(0x1af, 'Wm2w')] && (jQ[rG('0xaac', 'R#CE')](), aU[rG(0x303, ']%#R')](jP, jO) || (jS = this[rH(0x14d)](jO, jP))),
            (this[rH(0x2fb)] = this[rG('0x8ab', 'stof')](jR, b4)),
            jS && this[rH(0x91f)](jS, jO))
        }
      }
    }
    [kJ('0x38e', 'Clcg')](jL) {
      const rJ = kI,
        rI = kJ
      this[rI(0x6a7, '9kS6')] &&
        (this[rJ('0x236')]
          ? ((this[rI('0x22d', 'mFoF')] = !0x1),
            this[rI(0x561, 'gtjs')][rJ(0x757)][rI(0x87e, 'VsAe')]('M^'),
            this[rJ(0x595)](void 0x0))
          : 'L^' === this[rJ(0xa75)]
            ? (this[rI(0xb3c, 'HeoH')] = 'M^')
            : (this[rJ('0xa75')] = !0x1),
        jL && (this[rI('0x85d', 'DTjb')] = !0x1))
    }
    [kJ(0x7c9, 'AZuW')]() {
      const rL = kJ,
        rK = kI
      this[rK('0xa75')]
        ? this[rL(0x805, '@Bdu')]()
        : this[rK(0x21f)] && this[rK(0x21f)][rK(0x1e3)]
          ? this[rL('0x388', '34cl')](void 0x0)
          : this[rL('0x73c', '6tZA')][rL('0x605', 'HeoH')]()
    }
    [kJ('0x5a9', 'dwqv')](jL) {
      const rN = kJ,
        rM = kI
      return this[rM('0xa81')][rN(0x40a, 'Yihh')](jL)
    }
    [kI(0x89f)](jL) {
      const rO = kJ
      return this[rO('0x49d', 'R#CE')][jL || 0x0]
    }
    [kJ(0x791, 'eXgu')](jL) {
      const rQ = kI,
        rP = kJ
      if (!this[rP('0x328', '#ftp')](jL)) {
        const jM = [...this[rQ('0xaaf')], jL]
        this[rQ(0x2fb)] = jM
      }
    }
    [kJ('0xb3d', '^8pG')](jL) {
      const rS = kI,
        rR = kJ
      this[rR('0x7bd', '6XcX')](jL) &&
        (this[rS('0xa81')][rR('0xb59', 'R#CE')](jL),
        (this[rS(0x2fb)] = this[rR('0x2ab', '#E*s')][rS(0x367)]),
        jL[rR('0x2e5', 'W8*z')] && ((jL[rR('0xae4', '^8pG')] = !0x1), jL[rR(0x799, 'baqw')](void 0x0), jL[rS('0x44a')]()))
    }
    [kJ('0x66d', 'YKa8')](jL) {
      const rT = kJ
      this[rT('0x89b', 'WA#o')](jL) ? this[rT('0xb05', '#E*s')](jL) : this[rT(0x235, 'qYlx')](jL)
    }
    [kJ(0x5e0, 'W8*z')]() {
      const rV = kJ,
        rU = kI
      ;(this[rU('0x7dc')][rV(0x880, '34cl')](this[rU('0x73e')]),
        this[rV('0x551', 't%gW')](),
        this[rU('0x44a')](),
        this[rU(0x780)][rU(0x30d)]())
      const { app: jL } = this[rV('0x83c', 't%gW')]
      ;(this[rU('0x3d0')][rV('0x387', 'Oq6L')](),
        this[rV(0x3e6, 'zTI^')][rV(0x1ac, 'YKa8')](
          this[rU('0xadf')][rV(0x95d, 'mFoF')](am[rV('0x280', 'u*vy')][rU('0x323')], jM => {
            const rX = rU,
              rW = rV
            rW('0x2fa', 'BaJX') === jM[rX(0x87c)] && this[rW('0x31b', 'cQoA')] && this[rW(0x634, 'a#Lf')]()
          }),
          jL[rV(0x6d2, ']%#R')](am[rV(0x1aa, 'AZuW')][rU(0x31a)], jM => {
            const rZ = rV,
              rY = rU
            if (jM[rY('0x61f')][rZ(0x2a1, 'eXgu')](rY('0x3a4'))) return this[rZ('0x293', '9kS6')](jM)
            switch (jM[rZ(0x1fa, 'SY@W')]) {
              case rZ(0xab3, '34cl'):
                this[rZ(0x40c, '8G&U')]()
                break
              case rZ('0x51b', '#%(5'):
              case rZ(0xa72, 'Uvjy'):
                this[rY(0xbea)]()
            }
          })
        ))
    }
    [kJ(0x935, '34cl')]() {
      const s1 = kJ,
        s0 = kI
      ;(this[s0(0xa43)](), this[s1('0x3aa', 'u*vy')][s1('0x168', '9kS6')](jL => jL[s0(0x44a)]()))
    }
    [kJ(0x703, '9kS6')]() {
      const s3 = kJ,
        s2 = kI
      if (((this[s2(0xa75)] = !0x1), (this[s3('0x3b7', 'baqw')][s2(0x144)] = void 0x0), this[s2('0x6aa')])) {
        const { app: jL } = this[s3('0x1ef', 'Yihh')]
        jL && jL[s3(0x184, 'u*vy')](this[s2('0x6aa')])
      }
      ;(this[s3('0x167', 'SY@W')][s2('0x725')](),
        this[s2('0xa53')][s2('0xb98')](),
        this[s2(0x73e)][s3('0x78c', 'W8*z')](),
        this[s2('0x780')][s3('0x1ad', '#E*s')]())
    }
    [kJ('0x77a', '&T&3')](jL, jM) {
      const s5 = kJ,
        s4 = kI,
        jN = jM ? (am[s4(0x867)](jM) ? jM : [jM]) : this[s5('0x510', ']%#R')],
        { editor: jO } = this,
        jP = {}
      ;((jP[s5(0x87b, 'qYlx')] = this),
        (jP[s5('0x1c1', 'mFoF')] = jL['x']),
        (jP[s4('0x63d')] = jL['y']),
        (jP[s5(0x71d, 'u*vy')] = s5(0xab2, 'DTjb')),
        (jO[s4('0x249')](hk[s5(0xa0b, 'WA#o')]) && jO[s5(0x515, '@Bdu')](new hk(hk[s5(0x721, 'YKa8')], jP)),
        jN[s5('0xb92', 't%gW')](jQ => jQ[s4(0xb67)](jL)),
        jO[s5(0x34f, 'DTjb')](hk[s4('0xaaa')]) &&
          jO[s4('0xa45')](
            new hk(hk[s5(0x894, '!d%r')], { pathEditor: this, moveX: jL['x'], moveY: jL['y'], moveType: s5('0x3e9', 'zTI^') })
          )))
    }
    [kJ(0x3c7, 'HeoH')](jL, jM, jN, jO) {
      const s7 = kJ,
        s6 = kI
      if ((jN || (jN = this[s6('0xacf')]), jN)) {
        const { editor: jP } = this,
          jQ = {}
        ;((jQ[s7(0x90e, '#%(5')] = this),
          (jQ[s7(0x1c1, 'mFoF')] = jL['x']),
          (jQ[s6(0x63d)] = jL['y']),
          (jQ[s7(0xadd, '@Bdu')] = s6('0xa89')),
          (jP[s7(0xb8d, 'gtjs')](hk[s7('0x578', 'eDC*')]) && jP[s7('0x6c3', 'TIpW')](new hk(hk[s7(0x139, 'Yihh')], jQ)),
          jN[s6('0x233')](jL, jM, jO),
          jP[s6(0x249)](hk[s7('0x1c0', '#E*s')]) &&
            jP[s7('0x246', '9kS6')](
              new hk(hk[s7(0x232, '&T&3')], { pathEditor: this, moveX: jL['x'], moveY: jL['y'], moveType: s6(0xa89) })
            )))
      }
    }
    [kJ('0x5b6', '9kS6')](jL) {
      const s8 = kI
      return this[s8(0x5e6)](jL, void 0x0)
    }
    [kJ(0x97f, 'DTjb')](jL, jM) {
      const sa = kI,
        s9 = kJ
      return this[s9('0xb0b', 'P6Yp')](jL, jM ? this[sa('0x481')][sa(0x42a)](jM) : void 0x0)
    }
    [kJ('0x2cb', 'x7^#')](jL, jM) {
      const sc = kJ,
        sb = kI
      return this[sb('0x5e6')](jL, jM ? this[sc(0x59f, ']%#R')][sc(0x829, 'Wm2w')](jM) + 0x1 : void 0x0)
    }
    [kI(0x5e6)](jL, jM) {
      const se = kJ,
        sd = kI,
        jN = new h7()
      return (this[sd(0xa53)][se(0x38d, 'HeoH')](jN, jM), (jN[se(0x5df, '^8pG')] = this), (jN[sd('0x766')] = jL), jN)
    }
    [kJ(0x723, '^8pG')](jL, jM, jN) {
      const sg = kJ,
        sf = kI,
        { selectedNodes: jO } = this,
        jP = jL || jO[0x0],
        jQ = jM || jO[0x1]
      if (jP && jQ) {
        const jR = jP[sf('0x7ad')],
          jS = jP[sf(0xa56)],
          jT = jQ[sg(0x3d9, '@Bdu')],
          jU = jQ[sg('0x97c', '#ftp')],
          jV = this[sg('0x229', 'Oq6L')](jP),
          jW = this[sf('0x8ec')](jQ)
        if (au[sf('0x497')](jR, jS) && (jT || jU)) {
          if (jV === jW) {
            const jX = {}
            ;((jX[sg('0x94a', ']%#R')] = 'Z^'), this[sg(0xbac, 'Wm2w')](jX, jU ? jQ : jP))
            const jY = jU ? jP : jQ,
              jZ = jU ? jQ : jP
            ;(hc[sf(0x563)](jP, jQ) || jN) && this[sg(0x3cf, '!d%r')](jY, jZ)
          } else
            ((this[sf(0x18a)] = !0x1),
              jS && jT
                ? this[sf(0x91f)](jP, jQ, jN)
                : jU && jR
                  ? this[sf(0x91f)](jQ, jP, jN)
                  : jR && jT
                    ? (this[sf(0x396)](jP), this[sg('0x3e0', ']%#R')](jP, jQ, jN))
                    : jU && jS && (this[sg(0x9ba, 'x7^#')](jP), this[sf('0x91f')](jQ, jP, jN)),
              (this[sg(0x806, 'SY@W')] = !0x0),
              this[sg(0x26f, 'x7^#')]())
        }
      }
    }
    [kI(0xbda)](jL, jM) {
      const sh = kI
      this[sh(0x76f)](jL, jM, !0x0)
    }
    [kJ(0x67e, 'a#Lf')](jL, jM) {
      const sj = kJ,
        si = kI,
        { nodeData: jN } = jM
      ;(jM[si(0x12c)](),
        jN['a'] && ((jL[sj(0x873, '0O(!')]['a'] = jN['a']), (jL[sj('0xbca', 'P6Yp')] = jL[si('0x766')])),
        this[sj(0x437, 'ZXk)')][si(0x4ee)](jM)
          ? (this[si('0x2fb')] = jL)
          : this[sj('0xb21', 'DTjb')][si('0x178')](jM) && (this[si('0x595')](jL), this[si('0x754')]()))
    }
    [kJ(0xa2d, '@Bdu')](jL) {
      const sl = kI,
        sk = kJ,
        { nodes: jM, nodesView: jN } = this,
        jO = this[sk('0x3eb', 'u*vy')](jL),
        jP = this[sl(0x7e8)](jL)
      let jQ = jM[sk(0x3e4, 'AZuW')](jO)
      const jR = this[sk(0x475, '34cl')](jL),
        jS = []
      ;(jR[sl('0xafc')](jT => {
        const sn = sl,
          sm = sk
        if (sm(0xaa6, '!d%r') !== sm('0x4a0', 'Uvjy')) {
          const { nodeData: jU } = jT,
            { a: jV, b: jW } = jU
          ;(jW ? (jU['a'] = jW) : delete jU['a'],
            jV ? (jU['b'] = jV) : delete jU['b'],
            jT[sm('0x94b', ']%#R')](),
            jS[sm(0x239, 'Oq6L')](jT))
        } else {
          const { target: jY, data: jZ } = bb
          ;(jY[sm(0x4ff, 'zTI^')](aD[sn('0x131')], jZ),
            jY[sn('0xad0')](aN[sn('0x3ff')], jZ),
            jZ[sm('0xbee', '9kS6')][sn(0x2da)](jP),
            (aO[sm(0x2a7, 'eDC*')] = new bE()))
        }
      }),
        jS[sk(0xba5, 'SY@W')](jT => jN[sl('0x332')](jT, jQ++)),
        jP[sl('0xbc3')]('M^'),
        jO[sl('0xbc3')]('L^'))
    }
    [kI(0x91f)](jL, jM, jN) {
      const sp = kI,
        so = kJ,
        { nodes: jO, nodesView: jP } = this,
        jQ = this[so('0x475', '34cl')](jM)
      let jR = jO[sp(0x42a)](jL)
      ;(jQ[sp(0xafc)](jS => jP[sp('0x332')](jS, ++jR)),
        (hc[so(0x126, '#%(5')](jM, jL) || jN) && this[so(0x8a7, 'gtjs')](jM, jL),
        jM[sp('0xbc3')]('L^'))
    }
    [kI('0x76c')](jL) {
      const sr = kI,
        sq = kJ,
        { nodes: jM } = this,
        jN = this[sq('0xa58', 'mFoF')](jL),
        jO = jM[sq('0xb7b', 'dwqv')](jN),
        jP = []
      for (let jQ = jO; jQ < jM[sq('0x85a', 'eDC*')] && ((jL = jM[jQ]), !(jQ > jO && jL[sq(0x640, 'd)pE')])); jQ++)
        jP[sr(0x6f7)](jL)
      return jP
    }
    [kI(0x73d)](jL) {
      const st = kJ,
        ss = kI,
        jM = this[ss(0x76c)](jL)
      return (jM[ss('0xafc')](jN => jN[st('0x5ea', 'Yihh')]()), jM)
    }
    [kJ('0x774', 'stof')](jL) {
      const su = kJ,
        jM = this[su(0xb40, '%eg$')](jL)
      this[su('0x87f', 'Clcg')](jM)
    }
    [kJ('0x29b', '#ftp')](jL) {
      const sw = kI,
        sv = kJ
      let jM, jN
      if (
        (jL
          ? am[sv(0x97d, 'eDC*')](jL)
            ? (jN = jL)
            : (jM = jL)
          : this[sv('0x736', '8G&U')]
            ? (jN = [...this[sw('0xaaf')]])
            : (jM = this[sv(0x2ec, 'TIpW')]),
        jN)
      )
        ((this[sw(0x2fb)] = void 0x0), jN[sv(0x786, '9fBN')](jO => this[sv(0x414, 'qYlx')](jO)))
      else {
        if (jM) {
          if (this[sv(0x4c1, 'cQoA')]) {
            let jO = this[sv(0x783, 'qYlx')](jM)
            ;(jO &&
              jO[sv(0xbde, 'Oq6L')] &&
              (jO[sv('0xb7c', '%eg$')](), (jO = this[sv(0x879, '9fBN')](jM)), (this[sw(0x236)] = !0x1)),
              jM[sv('0xa2a', '@Bdu')](),
              this[sv('0x485', '&T&3')](jO, !this[sv('0x682', 'AZuW')]))
          } else {
            const jP = this[sw(0x2e3)](jM)
            ;(this[sw(0x4a7)](jM), this[sw('0x595')](jP, !this[sw('0xa75')]))
          }
        }
      }
      this[sw('0x754')]()
    }
    [kJ('0x247', 'u*vy')](jL) {
      const sy = kJ,
        sx = kI
      let jM = this[sx(0x176)](jL)
      ;(jM && jM[sy('0x832', 'SY@W')] && (jM[sx(0x12c)](), (jM = this[sy(0x3e5, 'd)pE')](jL))),
        jL[sy('0x74c', '34cl')] && jM && !jM[sx(0x7ad)] && jM[sy('0x51d', '#ftp')]('M^'),
        jL[sx('0x12c')]())
    }
    [kJ(0x56a, 'Wm2w')](jL, jM, jN, jO) {
      const sA = kJ,
        sz = kI,
        { nodes: jP } = this,
        jQ = jP[jP[sz(0x42a)](jL) - 0x1]
      let jR = jM ? !jL[sz(0x7ad)] && !(this[sz(0x236)] && jL === this[sA('0x596', '&T&3')]) && jQ : jQ
      return (jO && !jR && (jR = this[sA('0x56e', 'ZXk)')](jL, jN)), jR)
    }
    [kJ('0x18b', 'Yihh')](jL, jM, jN, jO) {
      const sC = kI,
        sB = kJ,
        { nodes: jP } = this,
        jQ = jP[jP[sB('0x3a1', 'WA#o')](jL) + 0x1]
      let jR = jM ? jQ && (!jQ[sB(0x637, 'stof')] || jN) && !jQ[sC(0x7ad)] && jQ : jQ
      return (jO && jR && jR[sC('0x679')] && (jR = this[sC(0x8ec)](jL)), jR)
    }
    [kI(0x8ec)](jL) {
      const sD = kI
      if (jL) {
        const { nodes: jM } = this
        for (let jN = jM[sD(0x42a)](jL); jN > -0x1; jN--) if (jM[jN][sD('0x7ad')]) return jM[jN]
      }
    }
    [kI(0x7e8)](jL, jM) {
      const sF = kI,
        sE = kJ
      let jN, jO
      if (jL) {
        const { nodes: jP } = this
        for (let jQ = jP[sE(0x269, '#E*s')](jL); jQ < jP[sF(0x1e3)]; jQ++)
          if (((jN = jP[jQ + 0x1]), jN)) {
            if (jN[sF(0x7ad)] || (jN[sE('0x97e', '8G&U')] && !jM)) return jP[jQ]
          } else jO = jP[jQ]
      }
      return jO
    }
    [kJ(0x3a0, '^8pG')](jL) {
      const sG = kI
      return this[sG('0x7e8')](jL, !0x0)[sG('0x679')]
    }
    [kJ(0x477, '8G&U')](jL, jM) {
      const sI = kI,
        sH = kJ
      return this[sH('0x7eb', ']%#R')](jL) === this[sI('0x8ec')](jM)
    }
    [kJ(0x2de, 'WA#o')](jL, jM) {
      const sK = kI,
        sJ = kJ,
        { currentNode: jN } = this
      ;(jM || (jM = jN),
        jM && ((this[sJ('0x72f', 'TIpW')] = void 0x0), jM[sK('0x182')](jL), this[sK(0xa75)] || (this[sK('0x2fb')] = jM)))
    }
    [kI(0x71e)]() {
      const sL = kJ
      this[sL('0x4d7', 'd)pE')](void 0x0)
    }
    [kI(0x6ab)](jL, jM) {
      const sN = kI,
        sM = kJ
      ;(jM ? (am[sM(0x4ce, 'eXgu')](jM) ? jM : [jM]) : this[sN(0xaaf)])[sN(0xafc)](jO => !jO[sN(0x679)] && jO[sN('0x6ab')](jL))
      const { currentNode: jN } = this
      jN && ((this[sN('0x787')] = void 0x0), (this[sN('0x2fb')] = jN))
    }
    [kJ('0xb51', 'mFoF')](jL, jM) {
      const sP = kJ,
        sO = kI,
        jN = jL[sO('0x766')],
        jO = { name: 'L^', x: jN['x'], y: jN['y'] }
      return (jN['a'] && (jO['a'] = Object[sP(0x858, 'Uvjy')]({}, jN['a'])), this[sO(0x632)](jO, jM))
    }
    [kI(0x95b)](jL) {
      const sR = kJ,
        sQ = kI
      if ((jL || (jL = this[sQ(0xacf)]), jL)) {
        if (this[sQ('0x76c')](jL)[sQ('0x1e3')] < 0x2) return
        const jM = this[sQ('0x8ec')](jL),
          jN = this[sR('0x244', 'eXgu')](jL),
          jO = this[sQ('0x7e8')](jL, !0x0)
        if (jL[sQ('0x7ad')] || jL[sR('0x15c', 'dwqv')])
          jO[sQ('0x679')] && (jO[sQ(0x12c)](), hc[sQ(0x563)](jM, jN) || this[sQ('0x14d')](jM, jN))
        else {
          const jP = am[sR(0xa86, '6XcX')][sQ(0x62d)](jL[sR('0x461', '#ftp')])
          let jQ
          ;((jP[sQ('0x5be')] = 'M^'),
            jO[sQ(0x679)] && (jO[sR(0x2a6, '!d%r')](), hc[sQ('0x563')](jN, jM) || (jQ = this[sR(0x751, '9kS6')](jM, jN))),
            (this[sR(0x644, 'd)pE')] = this[sQ(0x632)](jP, jL)),
            jQ && this[sR(0x2d1, 'SY@W')](jQ, jM))
        }
      }
    }
    [kI('0x300')]() {
      const sS = kI
      ;(this[sS(0x837)](), this[sS(0x30d)]())
    }
    [kJ(0xb01, '%eg$')]() {
      const sU = kJ,
        sT = kI,
        { editTarget: jL } = this
      if (((this[sT(0x2fb)] = void 0x0), this[sU('0x353', '0O(!')][sU(0x612, '%eg$')](), !jL)) return
      this[sU(0xb12, '9fBN')] = !0x1
      const { width: jM, height: jN, path: jO } = jL
      if (jM || jN)
        ((this[sU('0x6ef', 'WA#o')] =
          jO &&
          sU('0x600', '9fBN') == typeof jO &&
          au[sU('0xa0d', 'VsAe')](sT('0x7ab'), typeof jO[0x0]) &&
          0x2 === jO[0x0][sT(0x5be)][sT('0x1e3')])
          ? jO
          : am[sT(0x470)][sT(0x511)](jL[sU(0xb86, 'a#Lf')](!0x0)))[sT(0xafc)](jP => this[sU(0x702, 'TIpW')](jP))
      else this[sT('0xa75')] = 'M^'
      this[sU(0xa38, 'stof')] = this[sU(0x1b5, 'a#Lf')] = !0x0
    }
    [kJ('0x6f1', '9kS6')]() {
      const sW = kJ,
        sV = kI
      if (!this[sV('0x18a')]) return
      this[sV(0x729)] = !0x1
      const { nodes: jL, editTarget: jM } = this,
        jN = jM
      if (!jM) return
      const jO = jL[sW(0x529, 'AZuW')](jS => jS[sV(0x766)])
      let { dataType: jP } = this[sV('0x3d8')]
      !this[sV(0x52d)] || (jP && sV('0xbeb') !== jP) || (jP = sW('0x509', ']%#R'))
      const jQ = new am[sW(0x448, 'W8*z')](jN[sW(0x298, '9kS6')])
      jN[sV(0x690)] = au[sW(0x941, ']%#R')](sW(0x5aa, '^8pG'), jP)
        ? am[sW('0x1e1', '8T&]')][sW('0x1da', 'DTjb')](jO)
        : am[sV('0x470')][sW('0x9ec', 'VsAe')](jO)
      const jR = new am[sV('0xaf2')](jN[sW(0x696, '^8pG')])
      ;(jQ[sV(0x26a)](jR) ||
        (am[sW('0x8d1', 'gtjs')](jN[sW('0x778', '8T&]')]) && this[sW(0x892, '34cl')](sW(0x8c7, 'W8*z'), jQ, jR),
        am[sV(0x343)](jN[sV('0x604')]) && this[sV('0x6df')](sW(0x853, 'dwqv'), jQ, jR)),
        (this[sV(0x729)] = !0x0))
    }
    [kJ(0x419, '9kS6')](jL, jM, jN) {
      const sY = kI,
        sX = kJ,
        { editTarget: jO } = this,
        jP = am[sX(0x85c, '9fBN')][sX(0x8c8, 'eDC*')](jO[jL])
      let jQ
      ;(am[sY('0x867')](jP)
        ? jP[sY(0xafc)](jR => {
            const sZ = sY
            this[sZ(0x1d4)](jR, jM, jN) && (jQ = !0x0)
          })
        : this[sY('0x1d4')](jP, jM, jN) && (jQ = !0x0),
        jQ && ((jO[jL] = jP), jO['__'][sY(0x822)]()))
    }
    [kJ(0x40d, 'VsAe')](jL, jM, jN) {
      const t1 = kJ,
        t0 = kI
      if (hp() && t0(0x4b6) === jL[t0('0x41e')]) {
        if (t0(0x8dd) === jL[t1(0x4e9, 'gtjs')]) {
          const jO = jN[t0(0x500)] / jM[t1('0x9cc', 'stof')],
            jP = jN[t1('0x843', '8G&U')] / jM[t1(0x874, 'R#CE')]
          let jQ = 0x1,
            jR = 0x1
          jL[t1('0x19a', 'stof')] &&
            ((jL[t0(0x939)][t0('0x500')] *= jO),
            (jL[t1('0xb2a', '#ftp')][t0(0x90a)] *= jP),
            (jQ = jL[t1(0x1f4, 'x7^#')][t0('0x500')] / jN[t1('0x9cc', 'stof')]),
            (jR = jL[t0(0x939)][t0(0x90a)] / jN[t1('0x488', 'TIpW')]))
          const jS = {}
          ;((jS['x'] = jM['x'] - jN['x']), (jS['y'] = jM['y'] - jN['y']))
          const jT = jS
          return (
            am[t0('0x484')][t1('0x4d4', 'a#Lf')](jT, jQ, jR),
            jL[t0('0x9e6')] ? am[t1(0x409, 'qYlx')][t0('0x8b7')](jL[t0(0x9e6)], jT) : (jL[t1(0x25f, 'Clcg')] = jT),
            !0x0
          )
        }
      }
      return !0x1
    }
    [kI(0x595)](jL, jM = !0x0) {
      const t5 = kI,
        t2 = kJ,
        jN = this[t2('0x28e', 'Oq6L')]
      ;(jN &&
        jN[t2(0x558, 'Uvjy')](jP => {
          const t4 = t2,
            t3 = c
          !jP[t3('0x5cd')] || (this[t3(0x9ed)] && jP === jL) || ((jP[t4(0x842, 'VsAe')] = !0x1), jP[t3(0x182)](void 0x0))
        }),
        (this[t5(0x21f)] = []),
        (this[t5(0xacf)] = jL))
      const { activeNodes: jO } = this
      if (jL) {
        const jP = this[t5('0x2e3')](jL, !0x0),
          jQ = this[t5('0x176')](jL, !0x0),
          { multiple: jR } = this
        ;(jP && !jR && ((jP[t2('0x613', '0O(!')] = !0x0), jO[t5(0x6f7)](jP)),
          jL && (jM && (jL[t5('0x5cd')] = !0x0), jR || ((jL[t2('0xa9a', '8T&]')] = !0x0), jO[t2(0x50d, 't%gW')](jL))),
          jQ && !jR && ((jQ[t2('0xa9a', '8T&]')] = !0x0), jO[t5(0x6f7)](jQ)))
      } else this[t5(0x780)][t5('0x757')] = void 0x0
      jN &&
        jN[t5(0xafc)](jS => {
          const t6 = t5
          jO[t6('0x178')](jS) || (jS[t6(0x4a3)] = !0x1)
        })
    }
    [kI(0xa43)]() {
      const t8 = kJ,
        t7 = kI,
        { editBox: jL, mergeConfig: jM } = this
      jL[t7(0x144)] = jM[t8(0x636, '8G&U')]
    }
    [kI(0x5f8)](jL) {
      const ta = kJ,
        t9 = kI,
        { angleSnapCreateKey: jM } = this[t9(0xb23)]
      return jM ? jL[ta('0x922', '%eg$')](jM) : jL[ta('0x620', '#E*s')]
    }
    [kJ(0x6ac, 'zTI^')](jL) {
      const tc = kI,
        tb = kJ,
        { freeCreateHandleKey: jM } = this[tb(0x2b1, 'cQoA')]
      return jM ? jL[tb('0x2fd', '#E*s')](jM) : jL[tc('0xb7d')]
    }
    [kJ('0x1ff', 'BaJX')](jL) {
      const te = kI,
        td = kJ,
        { freeHandleKey: jM } = this[td('0x124', 'R#CE')]
      return jM ? jL[td('0xb11', '8G&U')](jM) : jL[te(0x909)] || jL[te('0xb4f')]
    }
    [kI('0x7a6')](jL) {
      const tg = kJ,
        tf = kI,
        { mirrorHandleKey: jM } = this[tf('0xb23')]
      return jM ? jL[tf(0x90d)](jM) : jL[tg(0xa78, 'u*vy')]
    }
    [kJ('0x14c', '#E*s')](jL) {
      const ti = kJ,
        th = kI
      if (!this[th('0xa75')] && this[ti('0x4eb', '6XcX')][th(0x1e3)] && this[ti('0x2a5', '&T&3')][th(0xa64)]) {
        let jM = 0x0,
          jN = 0x0
        const jO = jL[th(0x84b)] ? 0xa : 0x1
        switch (jL[ti(0x31c, 'eDC*')]) {
          case ti(0x68d, '8T&]'):
            jN = jO
            break
          case th(0x5a8):
            jN = -jO
            break
          case ti(0xa9d, '#%(5'):
            jM = -jO
            break
          case th(0xafe):
            jM = jO
        }
        if (jM || jN) {
          const jP = {}
          ;((jP['x'] = jM), (jP['y'] = jN))
          const jQ = this[ti(0x8b1, 'qYlx')][ti(0xbe3, 'zTI^')](jP),
            { currentNode: jR } = this
          jR && jR[ti(0x6da, 'VsAe')] ? this[th(0x233)](jQ) : this[th('0xb67')](jQ)
        }
      }
    }
    [kI(0x2a3)]() {
      const tk = kJ,
        tj = kI
      this[tj(0x653)] && (this[tk(0x279, 'TIpW')][tj(0x12c)](), (this[tj(0x653)] = void 0x0))
    }
    [kJ(0x7a0, 'Wm2w')]() {
      const tm = kI,
        tl = kJ
      this[tl('0x58a', 'SY@W')] &&
        (this[tl('0xb84', 'x7^#')](),
        this[tm('0x55e')](),
        this[tm('0x2a3')](),
        this[tl(0x2b8, '8G&U')][tl('0x70c', 'cQoA')](),
        this[tm(0x3d0)][tl('0x84f', '9fBN')](),
        this[tl('0x569', 'VsAe')][tl(0xaf0, 'P6Yp')](),
        this[tm('0xa81')][tl('0x423', 'x7^#')](),
        (this[tl(0xba1, 'baqw')] = this[tm(0x780)] = this[tm(0x3d0)] = this[tm('0xa53')] = this[tm('0xa81')] = void 0x0))
    }
  }),
    b4(
      [
        (jL, jM) => {
          const tn = kJ
          am[tn(0xaf5, 'eDC*')](jL, jM, {
            get() {
              const tp = tn,
                to = c,
                { config: jN, userConfig: jO } = this,
                jP = am[to(0x942)][tp(0x2db, 'qYlx')](jN)
              for (let jQ in jO) gS[tp(0x7b5, '6XcX')](jQ) || (jP[jQ] = jO[jQ])
              return (
                gS[tp(0x43e, 'cQoA')](jR => {
                  const tq = to
                  jO[jR] && Object[tq(0xb7f)](jP[jR], jO[jR])
                }),
                (this[tp('0x240', '6tZA')] = jP)
              )
            }
          })
        }
      ],
      al[kJ('0x8d2', '34cl')][kJ('0x412', 'dwqv')],
      kJ('0x3f9', 'qYlx'),
      void 0x0
    ),
    b4(
      [
        (jL, jM) => {
          const tr = kI,
            jN = {}
          jN[tr('0x6ba')] = function (jQ, jR) {
            return jQ !== jR
          }
          const jO = jN,
            jP = '_' + jM
          am[tr('0xb9f')](jL, jM, {
            get() {
              return this[jP]
            },
            set(jQ) {
              const tt = b,
                ts = tr
              if (jO[ts('0x6ba')](this[jP], jQ)) {
                const { tempNode: jR } = this,
                  { app: jS } = this[ts('0x17c')],
                  { cursor: jT } = this[tt(0x982, 'WA#o')]
                ;(jQ
                  ? (jT && jS && (jS[tt('0x6e8', '9fBN')] = jT),
                    gR() && (am[ts('0x465')](jQ) || (jQ = 'M^'), (this[jP] = jQ)),
                    'M^' === jQ &&
                      this[tt('0x473', 'YKa8')] &&
                      ((jR[tt('0x8a0', 'qYlx')][tt(0x8cc, '@Bdu')] = 'M^'),
                      (jR[tt(0x99c, 'WA#o')] = jR[ts(0x766)]),
                      jR[ts('0x99a')]()))
                  : (jT && jS && (jS[ts(0x5f7)] = void 0x0), (this[jP] = !0x1), this[tt('0x166', 'ZXk)')]()),
                  (jQ && 'M^' !== jQ) || this[tt(0x310, 'W8*z')](null))
              }
            }
          })
        }
      ],
      al[kJ(0x389, 'a#Lf')][kI('0x7ca')],
      kJ('0x8d6', '#%(5'),
      void 0x0
    ),
    b4(
      [
        (jL, jM) => {
          const tu = kI,
            jN = '_' + jM
          am[tu(0xb9f)](jL, jM, {
            get() {
              return this[jN]
            },
            set(jO) {
              const tw = tu,
                tv = b,
                jP = this[jN]
              if (jP !== jO) {
                const { selectedNodes: jQ } = this,
                  jR = (this[tv(0xabb, '34cl')] = new am[tv(0xbd1, 'mFoF')](jO))
                ;(jQ[tw(0xafc)](jV => {
                  const ty = tw,
                    tx = tv
                  jV[tx('0x59c', 'HeoH')] &&
                    !jR[tx('0x902', 'baqw')](jV) &&
                    ((jV[tx('0xb15', ']%#R')] = !0x1), jV[tx('0x8c1', '8G&U')](void 0x0), jV[ty(0x44a)]())
                }),
                  this[tw(0x9ed)] ? this[tw('0x595')](this[tw('0xaaf')][0x0], !0x0) : this[tv(0x3e1, 'baqw')](void 0x0),
                  this[tw('0xaaf')][tv('0x667', '&T&3')](jV => {
                    const tz = tw
                    ;((jV[tz('0x5cd')] = !0x0), jV[tz('0x44a')]())
                  }))
                const jS = this
                if (jS[tw('0x144')]) {
                  if (tw(0x41a) === tv(0x1ea, 'eXgu')) {
                    const { beforeSelect: jV } = jS[tw(0x144)]
                    if (jV) {
                      const jW = {}
                      jW[tw(0x2fb)] = jO
                      const jX = jV(jW)
                      if (am[tv(0x1dd, 'Oq6L')](jX)) jO = jX
                      else {
                        if (!0x1 === jX) return
                      }
                    }
                  } else return this[tw(0x5e9)] && !this[tw(0x452)] && !jO[tw(0x55f)]
                }
                const { editor: jT } = this,
                  jU = {}
                ;((jU[tv(0x1ba, 'a#Lf')] = jS),
                  (jU[tw(0x860)] = jO),
                  (jU[tv('0x459', 't%gW')] = jP),
                  (jT[tv(0xb46, 'AZuW')](gO[tv(0x32e, '&T&3')]) && jT[tw(0xa45)](new gO(gO[tw(0x305)], jU)),
                  (this[jN] = jO),
                  jT[tw('0x249')](gO[tv(0x460, 'x7^#')]) &&
                    jT[tv('0x6c3', 'TIpW')](new gO(gO[tv('0x9b6', '9fBN')], { pathEditor: jS, value: jO, oldValue: jP })),
                  jT[tv(0x3b6, '#%(5')](gO[tw(0xac4)]) &&
                    jT[tw('0xa45')](new gO(gO[tv(0x41d, 'AZuW')], { pathEditor: jS, value: jO, oldValue: jP }))))
              }
            }
          })
        }
      ],
      al[kJ('0xaf3', 'Clcg')][kI('0x7ca')],
      kJ('0xa40', 'R#CE'),
      void 0x0
    ),
    (al[kI('0x2fe')] = b4([aq[kJ('0x906', 'zTI^')]()], al[kI('0x2fe')])))
  const { M: hq, L: hu, C: hv, Z: hw } = am[kJ(0x6c8, 'W8*z')],
    hx = am[kI('0x910')](),
    { isSame: hy } = am[kJ('0x16c', 'TIpW')],
    hz = am[kI('0x373')][kI(0x29e)](kJ(0x260, 'gtjs'))
  ;((am[kI(0x470)][kI('0x5af')] = function (jL) {
    const tB = kI,
      tA = kJ
    let jM,
      jN,
      jO,
      jP,
      jQ,
      jR = hx,
      jS = hx
    const jT = []
    for (let jU = 0x0; jU < jL[tA('0x981', ']%#R')]; jU++) {
      switch (((jM = jL[jU][tA('0x5d1', 'W8*z')] || jL[jU]), jM[tB(0x5be)])) {
        case 'M^':
          ;((jR = jM), jT[tB(0x6f7)](hq, jM['x'], jM['y']))
          break
        case 'L^':
        case 'C^':
          jS['b'] || jM['a']
            ? ((jN = jS['b'] ? jS['b']['x'] : jS['x']),
              (jO = jS['b'] ? jS['b']['y'] : jS['y']),
              (jP = jM['a'] ? jM['a']['x'] : jM['x']),
              (jQ = jM['a'] ? jM['a']['y'] : jM['y']),
              jT[tA(0xa91, '!d%r')](hv, jN, jO, jP, jQ, jM['x'], jM['y']))
            : jT[tA('0x5e5', '%eg$')](hu, jM['x'], jM['y'])
          break
        case 'Z^':
          ;((jS['b'] || jR['a']) &&
            ((jN = jS['b'] ? jS['b']['x'] : jS['x']),
            (jO = jS['b'] ? jS['b']['y'] : jS['y']),
            (jP = jR['a'] ? jR['a']['x'] : jR['x']),
            (jQ = jR['a'] ? jR['a']['y'] : jR['y']),
            jT[tA('0x22e', '8G&U')](hv, jN, jO, jP, jQ, jR['x'], jR['y'])),
            jT[tA('0x920', 'eXgu')](hw),
            (jR = hx))
      }
      jS = jM
    }
    return jT
  }),
    (am[kI(0x470)][kJ(0x376, 'Oq6L')] = function (jL) {
      const tD = kI,
        tC = kJ
      if (tC('0x676', '#E*s') !== tC(0x8fb, 'zTI^')) {
        if (!jL) return []
        let jM,
          jN,
          jO,
          jP = hx,
          jQ = 0x0,
          jR = jL[tD('0x1e3')]
        const jS = []
        for (; jQ < jR; ) {
          switch (((jM = jL[jQ]), jM)) {
            case hq:
              const jT = {}
              ;((jT[tC(0x974, 'eDC*')] = 'M^'),
                (jT['x'] = jL[jQ + 0x1]),
                (jT['y'] = jL[jQ + 0x2]),
                ((jN = jT), (jP = jN), (jQ += 0x3)))
              break
            case hu:
              const jU = {}
              ;((jU[tD('0x5be')] = 'L^'), (jU['x'] = jL[jQ + 0x1]), (jU['y'] = jL[jQ + 0x2]), ((jN = jU), (jQ += 0x3)))
              break
            case hv:
              const jV = {}
              ;((jV['x'] = jL[jQ + 0x1]), (jV['y'] = jL[jQ + 0x2]))
              const jW = {}
              ;((jW[tC(0x4fa, 'BaJX')] = 'C^'),
                (jW['x'] = jL[jQ + 0x5]),
                (jW['y'] = jL[jQ + 0x6]),
                (jW['a'] = {}),
                (jW['a']['x'] = jL[jQ + 0x3]),
                (jW['a']['y'] = jL[jQ + 0x4]),
                ((jO['b'] = jV), (jN = jW), (jQ += 0x7)))
              break
            case hw:
              const jX = {}
              ;((jX[tC(0xb8e, '&T&3')] = 'Z^'),
                (hy(jO, jP) && (jO['a'] && (jP['a'] = Object[tC('0x6ed', 'P6Yp')]({}, jO['a'])), jS[tD('0x820')]()),
                (jN = jX),
                (jQ += 0x1),
                (jP = hx)))
              break
            default:
              return (hz[tD('0xabd')](tD('0x749') + jM + tD('0x50e') + jQ + ']', jL), [])
          }
          ;(jS[tC(0x3dd, 'Wm2w')](jN), (jO = jN))
        }
        return jS
      } else ((this[tC('0x668', '&T&3')] = jL), this[tD('0x1b9')][tD(0x44a)]())
    }),
    am[kI('0x34b')][kJ('0x880', '34cl')](au[kJ('0x2d9', 'HeoH')], kJ('0x3ce', 'dwqv')))
  class hA extends am[kI('0x34c')] {
    constructor(jL, jM) {
      const tE = kJ
      ;(super(jL), jM && Object[tE('0x5d3', '8G&U')](this, jM))
    }
  }
  ;((hA[kI(0x424)] = kJ('0x379', '6tZA')),
    (hA[kJ(0x4e7, '%eg$')] = kJ('0x3f6', 'x7^#')),
    (hA[kI(0x81a)] = au[kI('0x5ec')]),
    (hA[kI('0xae8')] = kI(0xa1c)),
    (hA[kJ(0xb71, 'zTI^')] = kI('0x307')),
    (hA[kI('0x7da')] = kJ('0x7b3', 'u*vy')),
    (hA[kJ('0x2f8', 'BaJX')] = kJ(0x804, 'Wm2w')))
  class hB extends hA {}
  ;((hB[kI(0x68c)] = kJ(0x502, '@Bdu')), (hB[kI(0x1ae)] = kJ('0x973', '6tZA')), (hB[kJ(0x44e, '9kS6')] = kJ('0x93f', 'eXgu')))
  class hC extends hA {}
  ;((hC[kJ(0x7aa, 'BaJX')] = kI('0x155')), (hC[kI(0x131)] = kI('0x9cf')), (hC[kJ(0x16d, 'dwqv')] = kI(0x32a)))
  class hD extends hA {}
  ;((hD[kI('0xb4e')] = kI('0xa84')), (hD[kI('0x67c')] = kJ('0x18d', 'HeoH')))
  class hE {
    constructor() {
      const tG = kI,
        tF = kJ,
        jL = {}
      ;((jL['x'] = 0x0),
        (jL['y'] = 0x0),
        ((this['x'] = 0x0),
        (this['y'] = 0x0),
        (this[tF(0x773, 'eDC*')] = 0x1),
        (this[tG(0x656)] = 0x1),
        (this[tF('0x4b3', 'u*vy')] = 0x0),
        (this[tF('0xb03', 'Wm2w')] = jL)))
    }
    get [kJ(0x9b2, '34cl')]() {
      return !(!this['x'] && !this['y'])
    }
    get [kI('0xb6b')]() {
      const tI = kJ,
        tH = kI
      return !(au[tH('0xb5e')](0x1, this[tI('0x24a', 'BaJX')]) && au[tI(0x333, '0O(!')](0x1, this[tI('0x457', '8G&U')]))
    }
    get [kI('0x5f9')]() {
      const tJ = kI
      return !!this[tJ('0x39a')]
    }
    get [kJ(0x924, 'zTI^')]() {
      const tK = kJ
      return !!(this[tK(0x7ea, '9fBN')] || this[tK('0xbe7', 'TIpW')] || this[tK('0xa6d', '#E*s')])
    }
    [kJ('0x86c', 'Yihh')](jL) {
      const tM = kJ,
        tL = kI
      ;((this['x'] += jL['x']),
        (this['y'] += jL['y']),
        (this[tL('0x80e')] *= jL[tM('0x586', 'VsAe')]),
        (this[tL('0x656')] *= jL[tL('0x656')]),
        (this[tL('0x39a')] += jL[tM(0x54c, ']%#R')]))
    }
  }
  class hF {
    constructor(jL) {
      const tO = kJ,
        tN = kI
      ;((this[tN('0x6d6')] = new hE()),
        (this[tO(0xaae, 'YKa8')] = jL),
        (function (jM) {
          const tU = tO,
            tP = tN
          ;(jM[tP(0x30c)][tP(0xaf8)](hA[tP('0x7a1')], () =>
            (function (jN) {
              const tR = tP,
                tQ = b
              jN[tQ('0x74d', 'a#Lf')][tQ(0xafb, 'W8*z')](hD[tQ(0x2e9, '#ftp')])
              const { target: jO, data: jP } = jN
              jP[tQ('0xa34', '&T&3')] &&
                ((hG = am[tQ('0x4b2', 'qYlx')][tQ(0xbd5, 'Wm2w')](tQ('0x979', '9kS6'))),
                jO[tQ(0xafb, 'W8*z')](hC[tQ(0xb45, 'VsAe')]),
                jN[tQ(0x92f, 'Yihh')] && jN[tR('0x325')][tQ(0x895, '%eg$')](jP),
                jO[tQ(0x823, 'mFoF')](am[tQ('0x955', 'Uvjy')][tQ(0x5f4, 'R#CE')], () =>
                  (function (jQ) {
                    const tT = tQ,
                      tS = tR,
                      { target: jR, data: jS } = jQ
                    ;(jR[tS('0xad0')](hC[tS(0x131)], jS),
                      jR[tT('0x1d1', 't%gW')](hC[tT(0x36e, 'd)pE')], jS),
                      am[tS('0x6d7')][tT(0x76b, '34cl')](hG),
                      (jQ[tT('0x824', 't%gW')] = new hE()))
                  })(jN)
                ))
            })(jM)
          ),
            jM[tP('0x30c')][tP(0xaf8)](hD[tU(0x5e7, '#%(5')], jN => (jM[tP(0x6d6)] = jN)))
        })(this))
    }
  }
  let hG
  const hH = (function (jL = 0x1) {
      return jL ? String : jL
    })(),
    hI = (function (jL = 0x1) {
      const tV = kJ
      return jL ? [tV('0xba9', 't%gW')] : jL
    })()
  function hJ(jL) {
    return (function (jM) {
      const { p: jN } = hH,
        jO = hI[0x0],
        jP = hI[0x1]
      if (jN) return jN(jO, jM) || jN(jP, jM)
    })(jL)
  }
  const hK = kJ('0x889', 'stof'),
    hL = kJ(0xbaa, 'u*vy'),
    hM = kI(0xabf)
  class hN {
    constructor(jL, jM) {
      const tX = kI,
        tW = kJ
      ;((this[tW('0x463', 'Oq6L')] = !0x0),
        (this[tX('0x144')] = {}),
        jM && (this[tW(0x6bd, 'W8*z')] = jM),
        (this[tX('0x30c')] = jL),
        (function (jN) {
          const tZ = tX,
            tY = tW,
            jO = {}
          jO[tY(0x180, 'a#Lf')] = function (jQ, jR) {
            return jQ > jR
          }
          const jP = jO
          ;(jN[tY('0x5c7', 'BaJX')][tY('0x4f2', '#%(5')](hA[tY('0xa16', 'R#CE')], () => hV(jN)),
            jN[tY('0x521', '#E*s')][tZ(0xaf8)](hA[tZ(0x81a)], () =>
              (function (jQ) {
                const u1 = tY,
                  u0 = tZ,
                  jR = hO(jQ[u0('0x30c')], jQ[hK][hM])
                jP[u1('0x53f', 'd)pE')](jR, 0x1)
                  ? (function (jS, jT) {
                      const ub = u1,
                        u2 = u0,
                        jU = {}
                      jU[u2('0x499')] = function (k0, k1) {
                        return k0 + k1
                      }
                      const jV = jU
                      let { leafer: jW } = jS[u2(0x30c)]
                      const { cursorPoint: jX } = jW,
                        jY = hP(jS[u2('0x30c')]),
                        jZ = (function (k0, k1, k2) {
                          const u4 = u2,
                            u3 = b
                          let k3,
                            k4,
                            { x: k5, y: k6, width: k7, height: k8 } = k0,
                            k9 = []
                          const kb = jV[u3('0x1e8', 'TIpW')](k5, k7),
                            kc = k6 + k8
                          if (k1 < 0xc) {
                            if (k8 > k7) {
                              for (k3 = Math[u4(0x9aa)](k8 / k1); k6 < kc; )
                                (k9[u3(0x9d9, '&T&3')]([new am[u4(0xaf2)](k5, k6, k7, k3)]), (k6 += k3))
                            } else {
                              for (k3 = Math[u4('0x9aa')](k7 / k1); k5 < kb; )
                                (k9[u3(0x770, 'HeoH')]([new am[u3(0x99f, 'u*vy')](k5, k6, k3, k8)]), (k5 += k3))
                            }
                          } else
                            for (k3 = Math[u3(0x876, 'TIpW')](Math[u3(0x3e2, 'SY@W')]((k7 * k8) / k1)); k6 < kc; ) {
                              for (k4 = [], k5 = k0['x']; k5 < kb; )
                                (k4[u4(0x6f7)](new am[u4('0xaf2')](k5, k6, k3, k3)), (k5 += k3))
                              ;(k9[u3('0x430', 'VsAe')](k4), (k6 += k3))
                            }
                          let kd = 0x0,
                            kf = 0x0
                          k2 &&
                            k9[u4('0xafc')]((kh, kj) => {
                              const u5 = u3
                              kh[u5(0x9b5, '8G&U')]((kk, kl) => {
                                const u6 = u5
                                kk[u6(0x3fd, 'WA#o')](k2) && ((kd = kl), (kf = kj))
                              })
                            })
                          const kg = []
                          if (kd || kf) {
                            if (u3('0x706', 'BaJX') !== u3(0x57a, 'Oq6L'))
                              return (function (kj) {
                                const { p: kk } = k8,
                                  kl = kg[0x0],
                                  km = km[0x1]
                                if (kk) return kk(kl, kj) || kk(km, kj)
                              })(bb)
                            else {
                              const kj = km => {
                                const u8 = u3,
                                  u7 = u4
                                let kp = kd,
                                  kq = kd + 0x1
                                for (let ku = 0x0, kv = km[u7('0x1e3')]; ku < kv; ku++)
                                  (kp > -0x1 && kg[u7(0x6f7)](km[kp]), kq < kv && kg[u8('0x743', 'cQoA')](km[kq]), kp--, kq++)
                              }
                              let kk = kf,
                                kl = kf + 0x1
                              for (let km = 0x0, kp = k9[u3(0x8dc, 'dwqv')]; km < kp; km++)
                                (kk > -0x1 && kj(k9[kk]), kl < kp && kj(k9[kl]), kk--, kl++)
                            }
                          } else
                            k9[u4(0xafc)](kq => {
                              const u9 = u3
                              kq[u9('0x4d0', 'W8*z')](ku => {
                                const ua = c
                                kg[ua('0x6f7')](ku)
                              })
                            })
                          return kg
                        })(jY, jS[ub(0x6c5, '#%(5')] ? jT : 0x1, jX)
                      ;((jS[u2(0x6a6)] = Date[ub(0x8da, '9fBN')]()), jW[hQ](() => hU(jS, jZ, jY, jS[ub('0x59e', 'eDC*')])))
                    })(jQ, jR)
                  : !0x0 === jQ[hK][hL] && jQ[u0(0x30c)][u1('0x401', 'W8*z')]()
              })(jN)
            ))
        })(this))
    }
  }
  function hO(jL, jM = 0x3e8) {
    const ud = kJ,
      uc = kI,
      { zoomLayer: jN } = jL,
      jO = hP(jL)
    if (hJ() && jO[uc('0x500')] && jO[ud(0x921, '!d%r')]) {
      const { width: jP, height: jQ } = jN[ud('0x261', '#E*s')]
      return Math[uc('0x77e')](
        ((jL[ud('0x5a0', '@Bdu')][ud('0x205', 'a#Lf')] / jM) * (jO[ud(0x31e, 'W8*z')] * jO[ud('0x9c3', 'P6Yp')])) / (jP * jQ)
      )
    }
    return 0x0
  }
  function hP(jL) {
    const uf = kI,
      ue = kJ
    return new am[ue('0x217', 'stof')](jL[ue(0x5bb, 'cQoA')][uf('0x665')])
      [ue('0x577', 'stof')]()
      [ue(0x2ff, 'cQoA')](jL[uf('0x49e')][ue(0x489, 'W8*z')][uf('0x1a2')])
  }
  const hQ = kI(0x1ed),
    hR = au[kJ(0x1d9, '#E*s')],
    hS = kJ('0x7d4', 'mFoF'),
    hT = kJ(0x224, 'baqw')
  function hU(jL, jM, jN, jO) {
    const ug = kJ
    let { leafer: jP } = jL[ug('0x33c', ']%#R')]
    const { canvas: jQ, renderer: jR } = jP
    jP[hQ](() => {
      const ui = c,
        uh = ug
      jL[uh(0x1e5, 'Uvjy')] === jO &&
        (jM[uh('0x14e', '^8pG')]
          ? (jR[hR](() => jR[hS](jM[ui('0x50a')]())), hU(jL, jM, jN, jO))
          : (jR[hR](() => jQ[hT](jQ, jN, null, ui(0x372))), hV(jL)))
    })
  }
  function hV(jL) {
    const uk = kI,
      uj = kJ
    jL[uj(0x23e, 'AZuW')] && (jL[uk('0x6a6')] = null)
  }
  const hW = new am[kI(0x7e0)](),
    hX = (function (jL = 0x1) {
      return jL ? Array : jL
    })(),
    hY = (function (jL = 0x1) {
      const ul = kI
      return jL ? [ul('0x807')] : jL
    })()
  function hZ(jL) {
    return (function (jM) {
      const un = b,
        um = c
      if (um(0x830) === un('0x1e6', 'Uvjy')) {
        const { g: jN } = hX,
          jO = hY[0x0],
          jP = hY[0x1]
        if (jN) return au[um(0x7df)](jN, jO, jM) || jN(jP, jM)
      } else
        return (function (jR) {
          const { g: jS } = aD,
            jT = aN[0x0],
            jU = jU[0x1]
          if (jS) return jS(jT, jR) || jS(jU, jR)
        })(bb)
    })(jL)
  }
  const i0 = kJ(0xb49, 'BaJX'),
    i1 = kJ(0x91d, 'DTjb'),
    i2 = kI('0xabf')
  class i3 {
    constructor(jL, jM) {
      const up = kJ,
        uo = kI
      ;((this[uo('0x363')] = !0x1),
        (this[uo(0x172)] = 0x0),
        (this[up('0x623', '9fBN')] = jL),
        (this[up(0x56d, '6XcX')] = jM),
        (function (jN) {
          const ur = up,
            uq = uo,
            { target: jO } = jN
          ;(jO[uq(0xaf8)](hC[ur('0x6b1', 'DTjb')], jP =>
            (function (jQ, jR) {
              const ut = ur,
                us = uq
              ;(jQ[us(0x392)] || (jQ[us(0x392)] = jQ[us('0x899')][ut('0xa25', '6XcX')][us(0x62d)]()),
                jR[ut('0xbe7', 'TIpW')] && jQ[us('0x392')][ut('0x315', '0O(!')](jR[us('0xbad')], jR[us('0x80e')], jR[us(0x656)]),
                jQ[ut(0x49c, 'qYlx')][ut(0x726, 'Clcg')](jR['x'], jR['y']))
            })(jN, jP)
          ),
            jO[ur('0x4a2', '6XcX')](hB[ur('0xa27', 'Clcg')], () => {
              const uv = uq,
                uu = ur
              return (
                (jP = jN[uu(0xae5, 'dwqv')]),
                (jQ = jN[uv(0x30c)][uv('0x49e')][uv(0x1f3)]),
                jP[uu('0xa8f', 'TIpW')](),
                void jP[uv('0x321')](jQ)
              )
              var jP, jQ
            }),
            jO[uq(0xaf8)](hA[ur(0x946, 'a#Lf')], () =>
              (function (jP) {
                const ux = uq,
                  uw = ur
                jP[uw('0x4e2', '9kS6')] ||
                  (jP[ux(0x30c)][uw(0x9d0, 'VsAe')][ux(0x5a7)][uw(0x2fc, '9kS6')](),
                  (jP[uw('0x490', '%eg$')] =
                    jP[uw(0x23d, 'VsAe')][uw('0xab6', 'eXgu')][uw(0x7ee, '9kS6')][uw('0x1a8', '^8pG')]()),
                  jP[uw('0x5e4', 'eDC*')])
              })(jN)
            ),
            jO[ur('0xb2f', 'P6Yp')](hA[uq(0x7da)], () =>
              (function (jP) {
                const uz = ur,
                  uy = uq
                jP[uy(0x899)] && (jP[uy(0x899)][uz('0x134', 'Uvjy')](), (jP[uy('0x899')] = null))
              })(jN)
            ))
        })(this),
        (function (jN) {
          const uB = up,
            uA = uo,
            { target: jO } = jN
          ;((jN[uA('0x641')] = jO[uB('0x856', 'gtjs')][uB(0x9bb, 'HeoH')](jO)),
            (jO[uA('0x1df')] = jN[uA('0x1df')][uA(0x559)](jN)))
        })(this))
    }
    [kJ(0x311, '#E*s')](jL, jM) {
      !(function (jN, jO, jP) {
        const uD = b,
          uC = c
        let jQ
        const jR = jN[i0][i1]
        if (au[uC('0xa6c')](!0x1, jR) && jN[uC(0x899)] && jN[uD('0x3a3', 'x7^#')]) {
          const jS = jR ? 0xa : au[uD(0xa24, 'cQoA')](hO, jN[uD('0x9d7', 'WA#o')], jN[i0][i2])
          if ((hZ() && jS && (jQ = 0x1), !(jN[uD('0xa21', 'BaJX')] && !jN[uC('0x172')] && jS > 0x1))) {
            if (jS < 0x2 || !jQ) jN[uD(0x881, 'x7^#')](jO, jP)
            else {
              const { overview: jT, photoBounds: jU, photo: jV } = jN,
                jW = {}
              ;((jW[uC(0x800)] = jU),
                ((jP = Object[uC('0xb7f')](Object[uC(0xb7f)]({}, jP), jW)),
                jU[uC('0x500')] < jV[uC('0x500')]
                  ? jT && jT[uC('0x157')]()
                    ? jT[uC(0x1df)](jO)
                    : jN[uC('0x641')](jO, jP)
                  : jU[uC(0x500)] === jV[uC(0x500)] &&
                    (jT && jT[uC(0x157)](0x3 * jT[uD(0x322, 'Oq6L')]['a']) ? jT[uD('0x492', 'BaJX')](jO) : jN[uC(0x641)](jO, jP)),
                (function (jX, jY, jZ) {
                  const uF = uC,
                    uE = uD
                  jX[uE(0x701, 'cQoA')] = 0x1
                  const { width: k0, height: k1 } = jY
                  ;(hW[uE('0x699', 'ZXk)')](
                    jZ[uE('0x61d', 'Clcg')] / k0,
                    0x0,
                    0x0,
                    jZ[uE('0x46b', 'mFoF')] / k1,
                    jZ['x'],
                    jZ['y']
                  ),
                    hW[uF('0x89c')](jX[uE(0x8e0, 't%gW')]),
                    jX[uF(0x73f)](hW['a'], hW['b'], hW['c'], hW['d'], hW['e'], hW['f']),
                    jX[uE(0x36c, 'eXgu')](0x1, 0x1, k0 - 0x2, k1 - 0x2),
                    jX[uE('0x4d5', 'x7^#')](jY[uF(0x73e)], 0x0, 0x0, k0, k1))
                })(jO, jV, jU)))
            }
          }
          ;((jN[uC(0x392)] = null), jN[uD(0x7f9, 'dwqv')]++)
        } else jN[uC('0x641')](jO, jP)
      })(this, jL, jM)
    }
  }
  const i4 = am[kI(0x373)][kI('0x29e')](kJ('0x5c2', 'baqw'))
  class i5 {
    constructor(jL) {
      const uG = kI
      ;((this[uG(0x3d7)] = jL),
        (function (jM) {
          const uI = uG,
            uH = b
          if (uH(0xa15, 'ZXk)') !== uI('0xbbe')) {
            const { pathEditor: jO } = this,
              { editTarget: jP, createMode: jQ } = jO
            let { lastNode: jR } = this
            if (jQ && jP && aD[uH('0xb13', 'u*vy')] && !aN[uI('0x62a')]) {
              let jS = this[uI('0x618')](jO)
              if (!jS) return
              let jT = k1[uI('0x71c')](aP[uH(0x619, 'zTI^')])
              jT && (jS = jT[uI(0x766)])
              const jU = {}
              ;((jU[uH('0x93c', '!d%r')] = jQ), (jU['x'] = jS['x']), (jU['y'] = jS['y']))
              const jV = jU,
                { needAddNode: jW, needClose: jX, needConnect: jY, needBegin: jZ, needConnectOther: k0 } = this[uI('0x32c')](jT)
              let k1, k2
              jY &&
                (uI(0xa5c) === jY && ((jO[uI(0x236)] = !0x0), jT[uH(0x572, ']%#R')](jT[uH('0x900', '34cl')] ? 'C^' : 'L^')),
                (k1 = jT),
                (jT = void 0x0))
              const { reverseMode: k3 } = jO
              if (
                (k3 ? (jV[uH('0xb8e', '&T&3')] = 'L^') : 'M^' === jO[uH('0x128', '@Bdu')] && (jR = null),
                jW && (k1 = k3 ? jO[uH('0x609', 'd)pE')](jV, jR) : jO[uH('0x262', '9fBN')](jV, jR)),
                jX)
              ) {
                jO[uI('0x677')]()
                const k4 = k1 || jR,
                  k5 = {}
                ;((k5[uH('0x1e4', '6XcX')] = 'Z^'),
                  (jO[uI('0x632')](k5, k3 ? jT : k4),
                  k3
                    ? ((k2 = k4),
                      (jO[uH('0x2d7', 'P6Yp')] = !0x1),
                      k4[uI(0xbc3)]('M^'),
                      jT &&
                        (jT[uI('0x766')]['a'] && (k4[uI('0x766')]['a'] = bg[uI(0xb7f)]({}, jT[uH(0x81b, 'YKa8')]['a'])),
                        jT[uH(0xba4, 'u*vy')]()))
                    : (k2 = jT)))
              }
              ;(k0 &&
                (jO[uH('0x649', '#%(5')](),
                k3 && ((jO[uI(0x236)] = !0x1), jR[uI('0xbc3')]('M^')),
                jO[uH(0x64b, 'qYlx')](jR, jT),
                (k2 = jT[uH(0x794, 'ZXk)')] ? jT : jR)),
                (jO[uI('0xa75')] = jZ || jO[uH(0xa4e, '34cl')] ? 'M^' : 'L^'),
                jO[uI('0x595')](jZ ? k2 : k1, !0x1),
                (this[uI('0x757')] = jZ ? null : k1),
                this[uH('0x1be', 'HeoH')](aS, !0x0),
                this[uH('0x164', 'YKa8')](aR, !0x0))
            }
          } else {
            const { target: jO } = jM[uI(0x3d7)]
            ;(jO[uI('0xaf8')](am[uH(0xa9f, 'Yihh')][uI(0x68c)], () =>
              (function (jP) {
                const uK = uH,
                  uJ = uI,
                  jQ = jP[uJ(0x79b)],
                  { target: jR, data: jS } = jP[uJ(0x3d7)]
                ;(jS[uJ('0x79b')] && (jP[uK(0xace, 'Yihh')] = !0x0),
                  jR[uJ(0x49e)] && (jR[uK(0x346, 'WA#o')][uK('0x89d', 'eXgu')] = !0x0),
                  (clearTimeout(jP[uK(0x152, '#%(5')]),
                  jP[uK(0x468, 't%gW')] &&
                    !jQ &&
                    (jR[uJ(0xad0)](hA[uJ(0xae8)]),
                    jR[uK(0x872, 'R#CE')](hA[uK(0x946, 'a#Lf')]),
                    i4[uK('0x61b', 'AZuW')](hA[uJ(0x424)], uK(0x7b0, 'dwqv')))),
                  jP[uJ('0x79b')] &&
                    (jR[uK('0x132', '#%(5')](new hA(hA[uK(0x4d8, 'BaJX')], jS)),
                    jR[uK(0x213, '6XcX')](new hA(hA[uK('0x7e9', 'DTjb')], jS)),
                    i4[uK('0x532', 'Yihh')](hA[uK(0x22c, 'u*vy')]),
                    (jP[uJ('0x199')] = !0x0)))
              })(jM)
            ),
              jO[uH('0x49a', 'Uvjy')](am[uI(0x26c)][uH(0x685, 'cQoA')], () =>
                (function (jP) {
                  const uM = uH,
                    uL = uI
                  jP[uL(0x79b)] && jP[uL('0x3d7')][uL(0x30c)][uM(0x90f, 'YKa8')](hB[uL(0x68c)])
                })(jM)
              ),
              jO[uI('0xaf8')](am[uH(0x57b, 'stof')][uI('0x3ff')], () =>
                (function (jP) {
                  const uO = uI,
                    uN = uH
                  if (jP[uN(0xa71, 'AZuW')]) {
                    const { target: jQ } = jP[uN(0x394, 'baqw')]
                    ;(jQ[uN('0x888', 'cQoA')](hB[uO(0x1ae)]),
                      jQ[uO('0xad0')](hB[uN(0xbba, 'TIpW')]),
                      clearTimeout(jP[uN(0x5d6, '8G&U')]),
                      (jP[uO('0x147')] = setTimeout(() => {
                        const uQ = uN,
                          uP = uO
                        jP[uP('0x199')] ||
                          ((jP[uQ(0xa34, '&T&3')] = !0x1),
                          jQ[uP(0x49e)] && (jQ[uQ('0x56c', 'YKa8')][uQ(0x9fe, 'R#CE')] = !0x1),
                          jQ[uQ('0xafb', 'W8*z')](hA[uP(0x7da)]),
                          jQ[uQ('0x80f', '#%(5')](hA[uQ('0xb42', 't%gW')]),
                          i4[uP(0xb69)](hA[uQ('0x8c5', 'HeoH')], uQ(0x962, 'gtjs')))
                      }, 0x96)),
                      (jP[uO(0x199)] = !0x1))
                  }
                })(jM)
              ))
          }
        })(this))
    }
  }
  const i6 = (function (jL = 0x1) {
      return jL ? Array : jL
    })(),
    i7 = (function (jL = 0x1) {
      const uR = kI
      return jL ? [uR(0x807)] : jL
    })()
  function i8(jL) {
    return (function (jM) {
      const uS = c,
        { g: jN } = i6,
        jO = i7[0x0],
        jP = i7[0x1]
      if (jN) return jN(jO, jM) || au[uS(0x1a1)](jN, jP, jM)
    })(jL)
  }
  class i9 {
    constructor(jL) {
      const uU = kJ,
        uT = kI
      ;((this[uT('0x6d6')] = new hE()),
        (this[uU('0x88f', '8G&U')] = jL),
        (function (jM) {
          const uW = uU,
            uV = uT,
            { target: jN } = jM
          ;(jN[uV(0xaf8)](jN[uV('0x33f')] ? am[uW('0x38c', 'x7^#')][uV(0x8f7)] : am[uV(0x984)][uV(0x323)], jO =>
            (function (jP, jQ) {
              const uY = uV,
                uX = uW
              if (ic[jP[uX('0x3c3', 'stof')]]) {
                const { attrName: jR, newValue: jS, oldValue: jT } = jP
                switch (jR) {
                  case 'x':
                  case 'y':
                  case uX(0x847, 'eDC*'):
                    jQ[uX(0x92a, 'ZXk)')][jR] += (jS || 0x0) - (jT || 0x0)
                    break
                  case uY(0x80e):
                  case uY('0x656'):
                    jQ[uY('0x6d6')][jR] *= (jS || 0x1) / (jT || 0x1)
                }
                if (!i8()) return
                jQ[uY(0x99e)] = !0x0
              }
            })(jO, jM)
          ),
            jN[uW('0xa54', 'W8*z')](hD[uW('0x7bc', 'TIpW')], () =>
              (function (jO) {
                const v0 = uW,
                  uZ = uV
                if (jO[uZ('0x99e')]) {
                  const { target: jP, data: jQ } = jO,
                    { x: jR, y: jS } = jP[v0('0x3c5', '8T&]')]['__']
                  ;((jQ[v0(0x3ca, '#ftp')] = { x: jR - jQ['x'], y: jS - jQ['y'] }),
                    jP[v0(0x186, 'HeoH')](hD[uZ('0x67c')], jQ),
                    (jO[v0(0x77c, 'cQoA')] = new hE()),
                    (jO[uZ(0x99e)] = !0x1))
                }
              })(jM)
            ),
            (jM[uW('0x406', 'd)pE')] = new i5(jM)))
        })(this))
    }
  }
  const ib = {}
  ;((ib['x'] = 0x1), (ib['y'] = 0x1), (ib[kI(0x80e)] = 0x1), (ib[kJ('0xb0f', 'eDC*')] = 0x1), (ib[kI('0x39a')] = 0x1))
  const ic = ib,
    id = (function (jL = 0x1) {
      return jL ? Number : jL
    })(),
    ig = (function (jL = 0x1) {
      const v1 = kI
      return jL ? [v1(0x807)] : jL
    })()
  function ih(jL) {
    return (function (jM) {
      const { d: jN } = id,
        jO = ig[0x0],
        jP = ig[0x1]
      if (jN) return jN(jO, jM) || jN(jP, jM)
    })(jL)
  }
  function ij(jL, jM, jN, jO, jP, jQ) {
    const v3 = kJ,
      v2 = kI
    ih() &&
      (am[v2('0x844')][v3(0x7c4, '9fBN')](jL),
      am[v3(0x37e, 'VsAe')](jO) ? au[v2('0x629')](ik, jL, jM, jN) : ik(jL, jM, jN, jO, jP, jQ),
      iv(jL))
  }
  function ik(jL, jM, jN, jO, jP, jQ) {
    const v5 = kJ,
      v4 = kI,
      jR = jL[v4('0x7b8')],
      { localStrokeBounds: jS, localRenderBounds: jT } = jL[v4(0x4ae)],
      jU = [jL[v4(0x665)], jR]
    ;(jR !== jS && jU[v5(0x1ac, 'YKa8')](jS),
      jS !== jT && jU[v5(0xb16, 'qYlx')](jT),
      jU[v5(0xac9, 'x7^#')](jW => {
        const v7 = v4,
          v6 = v5
        ;(am[v6('0x44b', 'd)pE')](jO) || am[v7('0x25a')][v7('0x513')](jW, jQ, jO, jP),
          am[v6(0xa55, 'a#Lf')][v6(0x9e9, '9fBN')](jW, jM, jN))
      }))
    let { parent: jV } = jL
    for (; jV; )
      (jV[v5('0x7b2', 'x7^#')][v5('0x55d', 'VsAe')](), am[v4('0x844')][v5(0x197, 'stof')](jV), (jV = jV[v5(0x8af, 't%gW')]))
  }
  const il = kI(0x3b1),
    im = kJ('0x3cb', 't%gW'),
    ip = kI(0x771),
    iq = kI('0x711'),
    iu = kI(0x1e3)
  function iv(jL) {
    const jM = jL[iq]
    for (let jN = 0x0, jO = jM[iu]; jN < jO; jN++) ((jL = jM[jN])[il](), jL[im](), jL[ip] && iv(jL))
  }
  const iw = (function (jL = 0x1) {
      return jL ? Array : jL
    })(),
    ix = (function (jL = 0x1) {
      const v8 = kJ
      return jL ? [v8('0x60b', 'DTjb')] : jL
    })()
  function iy(jL) {
    const jM = {
      MWdBK: function (jN, jO, jP) {
        const v9 = c
        return au[v9('0x5b7')](jN, jO, jP)
      }
    }
    return (function (jN) {
      const va = b,
        { g: jO } = iw,
        jP = ix[0x0],
        jQ = ix[0x1]
      if (jO) return jM[va(0x19e, '34cl')](jO, jP, jN) || jO(jQ, jN)
    })(jL)
  }
  class iz {
    constructor(jL) {
      const vb = kJ
      ;((this[vb('0x623', '9fBN')] = jL),
        (function (jM) {
          if (!iy()) return
          jM[iA][iB][iC] = !0x0
        })(jL))
    }
    [kJ('0x282', 'ZXk)')](jL) {
      const vd = kI,
        vc = kJ,
        { zoomLayer: jM } = this[vc('0x521', '#E*s')]
      jL[vc(0x4cc, 'cQoA')] && !jL[vc(0x4b1, '!d%r')]
        ? ij(jM, jL['x'], jL['y'])
        : ij(jM, jL['x'], jL['y'], jL[vc(0x2bd, '9fBN')], jL[vd('0x656')], jL[vd('0xbad')])
    }
  }
  const iA = kI('0xaef'),
    iB = kI('0x4ae'),
    iC = kI(0x826),
    iD = (function (jL = 0x1) {
      return jL ? Date : jL
    })(),
    iE = (function (jL = 0x1) {
      const ve = kJ
      return jL ? [ve(0x851, 'AZuW')] : jL
    })()
  function iF(jL) {
    return (function (jM) {
      const { q: jN } = iD,
        jO = iE[0x0],
        jP = iE[0x1]
      if (jN) return jN(jO, jM) || jN(jP, jM)
    })(jL)
  }
  const iG = kI(0x6b9),
    iH = kJ('0xafd', '34cl')
  let iI, iJ
  function iK(jL, jM, jN, jO, jP) {
    const jQ = {
      ZOFFN: function (jR, jS) {
        return jR(jS)
      }
    }
    return b5(this, void 0x0, void 0x0, function* () {
      const vg = c,
        vf = b
      if (iL(jM)) {
        if (
          jL[vf('0x59a', 'AZuW')] ||
          !am[vf('0x62e', 'Oq6L')][vf('0x989', 'Clcg')] ||
          (jP && !am[vf(0x5f5, '%eg$')][vf(0x443, 'Wm2w')])
        ) {
          let jS,
            jT = jN ? am[vf(0x8c4, 'Clcg')][vf(0x6fd, '#%(5')][vf('0x1f1', 'DTjb')](jM, jN, jO, void 0x0, void 0x0, jP, !0x0) : jM
          return (
            am[vf(0x149, 'P6Yp')][vg(0x6b0)] && ((jS = yield createImageBitmap(jT)), (jT = null)),
            yield ((jR = (jN * jO) / 0x20000), new Promise(jU => setTimeout(jU, jR))),
            jS || jT
          )
        }
        {
          if (!jN) return jQ[vg('0x31f')](createImageBitmap, jM)
          const jU = {}
          ;((jU[vf(0x7cb, 'u*vy')] = jN), (jU[vf(0x1a6, '#ftp')] = jO))
          const jV = jU
          return jP
            ? yield createImageBitmap(jM, jP['x'], jP['y'], jP[vg(0x500)], jP[vg('0x90a')], jV)
            : createImageBitmap(jM, jV)
        }
      }
      var jR
    })
  }
  function iL(jL) {
    const vi = kI,
      vh = kJ
    return jL && jL[vh('0x603', '#%(5')] && !jL[vi('0x44f')]
  }
  am[kI('0x34b')][kJ('0x815', 'DTjb')](au[kI('0x547')])
  const iM = {}
  function iN(jL, jM, jN, jO, jP, jQ, jR, jS, jT, jU) {
    const vn = kJ,
      vk = kI,
      jV = {
        JAcgH: function (jZ, k0) {
          return jZ < k0
        },
        rimlh: function (jZ, k0) {
          const vj = b
          return au[vj('0x694', 'Clcg')](jZ, k0)
        }
      },
      { list: jW } = jM
    let jX = jW[jL]
    const jY =
      (jX && jX[vk(0x1a2)]) ||
      (function (jZ, k0) {
        const vm = b,
          vl = vk,
          k1 = jZ % k0[vl('0x6de')],
          k2 = Math[vm('0x917', 'P6Yp')](jZ / k0[vm('0x8b3', 'AZuW')]),
          { size: k3, addSize: k4, width: k5, height: k6 } = k0,
          k7 = new am[vm(0x9c4, 'R#CE')]()
        ;(k7[vl(0x1ab)](k1 * k3, k2 * k3, k3, k3), (k7[vm(0x5ac, 'a#Lf')] = k7[vm(0x7b9, 'Yihh')] += k4))
        const { maxX: k8, maxY: k9 } = k7
        return (jV[vl('0x2e2')](k5, k8) && (k7[vl(0x500)] -= k8 - k5), k6 < k9 && (k7[vm(0x722, '34cl')] -= k9 - k6), k7)
      })(jL, jM)
    if (((iM[vn('0x919', 'Clcg')] = am[vk(0x25a)][vk('0x64a')](jY, jO)), am[vn(0xbbc, '8G&U')][vk(0xb4a)](iM, jU)))
      jX && iP(jL, jW)
    else {
      const { x: jZ, y: k0, width: k1, height: k2 } = jY,
        k3 = {}
      k3[vn(0x4a6, 'u*vy')] = jY
      if ((jX || (jX = k3), iL(jX[vk(0x73e)]))) jT[vn(0x471, 'Wm2w')](jX[vk(0x73e)], jZ, k0, k1, k2)
      else {
        const k4 = {}
        ;(am[vk(0xb50)][vn('0x173', 'TIpW')](k4, jN[vk(0x9e5)]),
          (!jX[vk(0xb87)] || jX[vk(0xb87)][vk('0x692')] || jX[vn(0x5bc, 'Uvjy')][vk(0xae3)]) &&
            ((jW[jL] = jX),
            (jX[vk('0xb87')] = am[vn(0x765, 'HeoH')][vk('0x6b9')][vk('0x332')](
              () =>
                b5(this, void 0x0, void 0x0, function* () {
                  const vp = vn,
                    vo = vk
                  if (jX[vo('0xb87')] && jX[vp('0x16a', '&T&3')][vp(0x39d, 'Uvjy')]) return
                  const { lod: k5 } = jP
                  if (jV[vo('0x241')](iL, jP[vo('0x73e')])) {
                    const k6 = {}
                    ;((k6['x'] = jZ / k4[vp(0x3f1, 'baqw')]),
                      (k6['y'] = k0 / k4[vp('0x23f', 'Uvjy')]),
                      (k6[vp(0x13b, '34cl')] = k1 / k4[vp('0x934', '!d%r')]),
                      (k6[vo(0x90a)] = k2 / k4[vp('0x4db', '9kS6')]))
                    const k7 = k6
                    jX[vo(0x73e)] = yield iK(jP, jP[vo(0x73e)], k1, k2, k7)
                  } else
                    k5 &&
                      k5[vp(0x486, '#E*s')] &&
                      (jX[vp(0x755, '6XcX')] = yield yield am[vp(0x5e2, 'Yihh')][vp(0x304, 'W8*z')][vp(0xb91, 'Uvjy')](
                        (function (k8, k9, kb, kc, kd, kf, kg, kh, kj) {
                          const vr = vp,
                            vq = vo
                          return (k8 ? k8[vq(0x8b2)] : '')
                            [vq(0x5d2)](vq('0x2bb'), kb[vq(0xaa9)]())
                            [vq(0x5d2)](vr('0x421', 'R#CE'), k9[vr('0x508', 'Yihh')]())
                            [vr('0x6b7', 'VsAe')](vq('0x7e1'), Math[vq(0x77e)](kc)[vq('0xaa9')]())
                            [vq('0x5d2')](vr('0x256', 'cQoA'), Math[vq('0x77e')](kd)[vr(0x550, 'Wm2w')]())
                            [vr(0xa63, 'TIpW')](vq(0x688), Math[vr('0x730', 'cQoA')](kf)[vr('0xb0d', '!d%r')]())
                            [vq(0x5d2)](vr(0x812, 'stof'), Math[vq('0x77e')](kg)[vr(0x295, '6tZA')]())
                            [vr('0x819', 'YKa8')](vq(0x38b), Math[vq('0x77e')](kh)[vq(0xaa9)]())
                            [vq(0x5d2)](vq('0x6fc'), Math[vr('0x4c7', 'Uvjy')](kj)[vr(0xafa, '0O(!')]())
                        })(
                          k5[vo('0x6dc')],
                          jL,
                          jN[vp('0x4d6', 'BaJX')],
                          jM[vp('0x969', 'BaJX')],
                          jM[vp(0xa5a, 'stof')],
                          jZ,
                          k0,
                          k1,
                          k2
                        ),
                        jP[vo('0xb4d')],
                        jP
                      ))
                  ;(delete jX[vp('0x16a', '&T&3')], jS[vo('0x9c5')](vo(0x6ea)))
                }),
              0x0,
              () => {
                const vt = vn,
                  vs = vk,
                  k5 = jR[vs('0xbe9')] === jN[vs('0x6a5')] && jT[vt(0x602, 'R#CE')][vs('0x833')](jS[vs('0x4cb')])
                return (k5 || iP(jL, jW), k5)
              }
            ))))
      }
    }
  }
  function iO(jL) {
    const vu = kI,
      { total: jM, list: jN } = jL[vu('0x5e8')]
    for (let jO = 0x0; jO < jM; jO++) jN[jO] && iP(jO, jN)
  }
  function iP(jL, jM) {
    const vv = kI,
      jN = jM[jL]
    if (jN) {
      iQ(jN)
      const { task: jO } = jN
      ;(jO && jO[vv(0x55e)](), delete jM[jL])
    }
  }
  function iQ(jL) {
    const vx = kI,
      vw = kJ
    let jM = jL[vw(0x3b5, 'mFoF')]
    jM && (jM[vx(0xba6)] && (jM[vw(0xaba, 'P6Yp')](), (jM[vw(0x4c4, '@Bdu')] = !0x0)), (jL[vw('0x1a0', '8G&U')] = jM = null))
  }
  const iR = am[kJ(0x76e, '^8pG')][kI(0x7ca)]
  function iS(jL, jM, jN, jO) {
    const vz = kJ,
      vy = kI
    return (jM ? jM[vy('0x8b2')] : '')
      [vy(0x5d2)](vy('0x2bb'), jL[vy(0xaa9)]())
      [vz(0x9f4, 'BaJX')](vy(0x7e1), Math[vy('0x77e')](jN)[vz('0x882', 'eXgu')]())
      [vz('0x254', 't%gW')](vz('0x2c3', '0O(!'), Math[vz('0xa51', '8G&U')](jO)[vz(0x29f, 'mFoF')]())
  }
  function iT(jL, jM) {
    const vA = kJ
    let jN = Math[vA('0x628', 'Uvjy')](Math[vA('0x75b', 't%gW')](0x1 / jL))
    return (jN && (jN = -jN), jM && jN < jM && (jN = jM), jN)
  }
  function iU(jL) {
    const vB = kI
    return Math[vB(0x130)](0x2, jL)
  }
  function iV(jL, jM = 0x10) {
    const vD = kI,
      vC = kJ
    let jN = jM / jL[vC('0xaa1', '0O(!')],
      jO = jM / jL[vD(0x90a)]
    return iT(Math[vC(0x12f, 'Clcg')](jN, jO))
  }
  function iW(jL, jM, jN) {
    const vF = kJ,
      vE = kI
    let jO = jL / jN[vE(0x500)],
      jP = jM / jN[vF('0x9c7', 'WA#o')],
      jQ = iT(Math[vF('0x928', '6tZA')](jO, jP), jN[vF(0x835, 'TIpW')] || (jN[vF('0xba2', 'HeoH')] = iV(jN)))
    jQ > 0x0 && !jN[vE('0x377')] && (jQ = 0x0)
    const jR = iU(jQ),
      jS = {}
    return (
      (jS[vF('0xb3f', '%eg$')] = jQ),
      (jS[vF('0x4d4', 'a#Lf')] = jR),
      (jS[vE(0x453)] = jR / jO),
      (jS[vF('0x6ce', 'Oq6L')] = jR / jP),
      jS
    )
  }
  function iX(jL, jM) {
    const { levels: jN } = jM,
      jO = jN && jN[jL]
    if (jO) return jO
  }
  function iY(jL, jM) {
    const vH = kI,
      vG = kJ,
      { level: jN } = jL
    if (jM[vG('0x750', 'TIpW')]) {
      if (vH('0x458') !== vG('0x516', '#ftp')) {
        const { imageEditBox: jP, pointSize: jQ = 0xe, pointColor: jR } = this[vG('0x742', 'a#Lf')],
          { stroke: jS } = this[vH('0x17c')][vG(0xac6, '&T&3')],
          jT = jR || jS,
          jU = jS[vG(0x148, 'a#Lf')](jT[vH(0xb7f)]({}, this[vG('0x351', '9kS6')]), {
            point: {
              stroke: void 0x0,
              fill: void 0x0,
              width: 0x2 * jQ,
              height: 0x2 * jQ,
              children: [
                {
                  tag: vH(0x95a),
                  fill: jT,
                  hitRadius: 0x5,
                  points: [
                    { x: jQ, y: jQ },
                    { x: 0x2 * jQ, y: jQ },
                    { x: 0x2 * jQ, y: aO[vH(0x77e)](1.3 * jQ) },
                    { x: bE[vG(0xa51, '8G&U')](1.3 * jQ), y: aA[vH('0x77e')](1.3 * jQ) },
                    { x: jU[vG(0x60d, 'SY@W')](1.3 * jQ), y: 0x2 * jQ },
                    { x: jQ, y: au[vG(0xbc9, 'eXgu')](0x2, jQ) }
                  ]
                }
              ]
            },
            middlePoint: {
              stroke: void 0x0,
              fill: void 0x0,
              width: jQ[vH(0x77e)](1.3 * jQ),
              height: jQ,
              children: [
                {
                  tag: vH(0x40e),
                  fill: jT,
                  x: 0x0,
                  hitRadius: 0x5,
                  y: jQ / 0x2,
                  width: aK[vH('0x77e')](1.3 * jQ),
                  height: aP[vG(0x4ac, '#ftp')](0.3 * jQ)
                }
              ]
            }
          })
        return jP ? aT[vH(0xb7f)](jU, jP) : jU
      } else {
        const { levelsRange: jP } = jM
        ;((jP[vG('0x9db', 'Uvjy')] = Math[vH(0x86a)](jN, jP[vG('0x344', 'VsAe')])),
          (jP[vG('0x63b', 'a#Lf')] = Math[vG(0x3fb, 'DTjb')](jN, jP[vH(0x7f5)])))
      }
    } else ((jM[vG('0xa7e', 'dwqv')] = []), (jM[vG(0x96a, 'ZXk)')] = { min: jN, max: jN }))
    jM[vH('0x574')][jN] = jL
  }
  function iZ(jL) {
    const vJ = kI,
      vI = kJ
    jL[vI('0x652', 'eXgu')] ? jL[vI('0x616', 'Clcg')]++ : (jL[vJ('0x277')] = 0x1)
  }
  function j0(jL, jM) {
    const vK = kI,
      { levels: jN } = jM,
      jO = jN && jN[jL]
    jO && jO[vK(0x277)] && jO[vK('0x277')]--
  }
  function j1(jL, jM, jN) {
    const vM = kJ,
      vL = kI,
      { levels: jO, largeThumb: jP } = jM,
      jQ = jO && jO[jL]
    if (jQ) {
      if (vL('0xa5b') === vM('0xbe6', 't%gW')) {
        const jS = aD[vM(0x278, 'VsAe')],
          jT = aN[vL('0x484')][vM(0x670, '^8pG')](jS, jU),
          jU = jP[vM(0x14f, 'Yihh')](jT / aO) * bE - jT
        aA[vM('0x954', '!d%r')][vM('0xacd', 'u*vy')](jQ, jU, jS)
      } else {
        if ((jQ[vL(0xbb8)] && j3(jQ), jQ[vL('0x5e8')] && iO(jQ), jP && jP[vL('0x6a5')] === jQ[vM(0x838, 'TIpW')])) {
          if (!jN && !jM[vM(0x214, 'Oq6L')]) return
          jM[vL(0xaff)] = void 0x0
        }
        ;(iQ(jQ), (jQ[vM('0xb33', '6XcX')] = !0x0), delete jO[jL])
      }
    }
  }
  function j2(jL, jM) {
    const vO = kJ,
      vN = kI
    ;(jL[vN(0xbb8)] || (jL[vN(0xbb8)] = []), jL[vN('0xbb8')][vO(0x408, 'ZXk)')](jM))
  }
  function j3(jL) {
    const vP = kJ
    jL[vP('0x50b', 'DTjb')] &&
      (am[vP('0x436', 'YKa8')][vP(0x27d, '#%(5')](jL[vP('0x709', 'BaJX')]), delete jL[vP('0x41f', 'R#CE')])
  }
  function j4(jL, jM) {
    const vQ = kJ,
      { levels: jN, levelsRange: jO } = jM
    if (jN) {
      let jP
      for (let jQ = jL; jQ >= jO[vQ(0xbd6, 'TIpW')]; jQ--) if (((jP = jN[jQ]), jP && jP[vQ(0x95f, 'u*vy')])) return jP
    }
  }
  ;((am[kI(0xa6b)][kI(0xb7a)] = function (jL) {
    const vS = kJ,
      vR = kI
    ;(void 0x0 !== jL[vR('0x6a5')] && j0(jL[vR(0x6a5)], jL[vS('0x2b3', 'eXgu')]),
      void 0x0 !== jL[vR('0xbe9')] && j0(jL[vS(0x51c, 'cQoA')], jL[vR(0x4b6)]),
      am[vR(0xa6b)][vR('0x5db')](jL[vR('0x4b6')]))
  }),
    (am[kI('0xa6b')][kJ('0x84e', 'DTjb')] = function () {
      const vU = kI,
        vT = kJ,
        { map: jL } = am[vT('0x7ff', '0O(!')],
        jM = Object[vU(0xa1e)](jL)
      for (let jN = 0x0; jN < jM[vU(0x1e3)]; jN++) {
        const jO = jM[jN]
        jO instanceof am[vU(0x968)] && jO[vU('0x6d9')](!0x0)
      }
    }),
    (iR[kI(0x71f)] = function () {
      const vW = kI,
        vV = kJ
      if (vV(0x67a, '8G&U') !== vV('0xb75', 'WA#o')) {
        if (!ap) return
        const jM = bk[vV(0x9da, '!d%r')](bb[vV(0x8b1, 'qYlx')])
        aD[vW(0x233)](jM, 'a', this, aN)
      } else return iV(this)
    }),
    (iR[kI('0xab1')] = function (jL) {
      const vY = kI,
        vX = kJ
      if (!jL) return this[vX('0x3f5', 'gtjs')]
      let { width: jM, height: jN } = jL
      const { level: jO, scale: jP } = iW(jM, jN, this)
      return 0x0 === jO
        ? this[vY(0x8b2)]
        : ((this[vY('0x4f8')] = { level: jO, scale: jP }),
          (jM = jP * this[vX(0x622, '%eg$')]),
          (jN = jP * this[vX(0x727, 'dwqv')]),
          iS(jO, this[vY('0xbb1')], jM, jN))
    }),
    (iR[kI('0x270')] = function (jL) {
      const vZ = kI,
        { thumb: jM } = this
      jM && ((jM[vZ('0x73e')] = jL), iY(jM, this))
    }),
    (iR[kI(0x98d)] = function (jL) {
      const w1 = kJ,
        w0 = kI
      if (w0('0x798') !== w1('0x395', 'R#CE')) {
        const jN = aL[w0('0x1a2')][w0('0x833')](aF[w0(0x4cb)])
        return (jN || delete ap[w1(0x904, '@Bdu')], jN)
      } else {
        jL && (this[w1(0x32d, '&T&3')] = jL)
        const { width: jN, height: jO, thumb: jP } = this[w1('0x671', 'gtjs')]
        jN && ((this[w0('0x500')] = jN), (this[w0(0x90a)] = jO))
        const jQ = iU(jP || iV(this)),
          jR = {}
        return ((jR[w0('0x500')] = jQ * jN), (jR[w0(0x90a)] = jQ * jO), jR)
      }
    }),
    (iR[kJ(0x75a, 'VsAe')] = function (jL, jM, jN) {
      if (void 0x0 !== jM) return iW(jM, jN, this)
      let jO = iX(jL, this)
      return (!jO && (jO = { level: jL, scale: iU(jL) }), jO)
    }),
    (iR[kI(0x6d9)] = function (jL) {
      const w3 = kI,
        w2 = kJ,
        jM = this,
        { levels: jN, levelsRange: jO } = jM
      if (jN) {
        let jP
        for (let jQ = jO[w2('0x5b8', 'u*vy')]; au[w2(0x474, 'W8*z')](jQ, jO[w3(0x86a)]); jQ--)
          if (((jP = jN[jQ]), jP)) {
            if (jL && jP[w3(0x277)]) continue
            j1(jQ, this, !jL)
          }
        jL || (jM[w2('0x3bf', '#%(5')] = jM[w3('0x21e')] = void 0x0)
      }
    }))
  const j5 = (function (jL = 0x1) {
      return jL ? String : jL
    })(),
    j6 = (function (jL = 0x1) {
      const w4 = kJ
      return jL ? [w4(0x37b, 'd)pE')] : jL
    })()
  function j7(jL) {
    return (function (jM) {
      const { p: jN } = j5,
        jO = j6[0x0],
        jP = j6[0x1]
      if (jN) return jN(jO, jM) || jN(jP, jM)
    })(jL)
  }
  const j8 = kJ(0xa3a, 'mFoF'),
    j9 = au[kI('0xaa3')],
    jb = kI(0x4b6),
    jc = kI(0x377),
    jd = fetch
  function jf(jL, jM) {
    return b5(this, void 0x0, void 0x0, function* () {
      const w6 = b,
        w5 = c
      if (j7() && iL(jL) && jM && !jM[w5(0xbb1)] && !jM[jc] && am[w6(0x581, 'gtjs')][jb][w6(0x491, 'BaJX')](jL)) {
        let jN = iT(Math[w5(0xbc5)](am[w5('0x2a4')][jb][w6(0xbbb, 'BaJX')] / (jL[w6(0xaa1, '0O(!')] * jL[w5('0x90a')])))
        if (jN && !iX(jN, jM)) {
          let jO = iU(jN)
          jL[w6('0x5e1', 'DTjb')] * jO * jL[w6(0xb68, 'Oq6L')] * jO > am[w5('0x2a4')][jb][w5('0x14a')] &&
            ((jN -= 0x1), (jO = iU(jN)))
          const jP = yield iK(jM, jL, jL[w5('0x500')] * jO, jL[w5(0x90a)] * jO)
          if (jP) {
            const jQ = {}
            ;((jQ[w6('0x838', 'TIpW')] = jN),
              (jQ[w6(0x74a, 'qYlx')] = jO),
              (jQ[w6('0x7f1', 'Yihh')] = jP),
              iY((jM[w5('0xaff')] = jQ), jM))
          }
        }
      }
    })
  }
  const jg = (function (jL = 0x1) {
      return jL ? Array : jL
    })(),
    jh = (function (jL = 0x1) {
      const w7 = kI
      return jL ? [w7(0x553)] : jL
    })()
  function jj(jL) {
    return (function (jM) {
      const { g: jN } = jg,
        jO = jh[0x0],
        jP = jh[0x1]
      if (jN) return jN(jO, jM) || jN(jP, jM)
    })(jL)
  }
  const jk = new am[kJ('0x26e', 'eXgu')]()
  function jl(jL) {
    const w8 = kI
    am[w8('0x2bf')][w8('0x9c1')] = function (jM, jN, jO, jP, jQ, jR) {
      const wa = b,
        w9 = w8,
        { data: jS, image: jT } = jM
      ;(jQ[w9('0x133')](),
        jQ[w9(0xbf0)](jP),
        jM[wa('0x444', '^8pG')][wa(0x181, 'mFoF')] && (jQ[w9('0x74f')] = jM[w9(0x42e)][w9(0x74f)]),
        jS[wa('0x9a3', 'AZuW')] && (jQ[w9('0x704')] *= jS[wa(0x4d9, 'd)pE')]),
        jS[wa('0x850', '0O(!')] && jQ[wa('0x864', 'dwqv')](jS[wa('0x25b', 'Wm2w')]))
      const { width: jU, height: jV, lod: jW } = jT
      let jX =
        jT[w9(0x377)] ||
        !am[w9(0x2a4)][wa('0x1ee', '6XcX')][wa(0xb61, '6XcX')](jT) ||
        jR[w9(0x57e)] ||
        (!jT[w9(0x73e)] && !(jW && jW[w9(0x6dc)]))
      if (!jX) {
        if (
          am[wa(0xa87, '!d%r')][wa(0x95c, 'YKa8')] &&
          (!jW || !jW[w9('0x6dc')]) &&
          jN >= 0x1 &&
          jO >= 0x1 &&
          (jU <= 0x1000 || jV <= 0x1000)
        )
          jX = !0x0
        else {
          const { level: jY, scale: jZ } = iW(jU * jN, jV * jO, jT)
          let k0 = iX(jY, jT),
            k1 = k0 && k0[w9(0x73e)]
          if (!k1) {
            const k2 = jT[w9('0xaff')]
            k2 && (k2[wa(0x4b4, 't%gW')] > jY || (am[wa('0x37c', '9fBN')][wa(0xa4a, 't%gW')] && !jW)) && ((k0 = k2), (k1 = !0x0))
          }
          if (k1 && au[w9(0x1c9)](iL, k0[wa('0x146', '!d%r')])) jQ[wa('0x567', 'eXgu')](k0[w9(0x73e)], 0x0, 0x0, jU, jV)
          else {
            const k3 = j4(0x0, jT),
              k4 = {}
            ;((k4[wa(0xbcd, 'R#CE')] = jY),
              (k4[wa('0x24c', '#%(5')] = jZ),
              (k4[w9(0x5e8)] = null),
              (k0 || ((k0 = k4), iY(k0, jT)),
              k0[wa('0xb6e', 'Wm2w')] ||
                (k0[wa(0x317, '9kS6')] = (function (k7, k8, k9 = 0x800, kb = 0x2) {
                  const wc = wa,
                    wb = w9
                  let { width: kc, height: kd } = k7
                  ;((kc = Math[wb('0x77e')](kc * k8)), (kd = Math[wb(0x77e)](kd * k8)))
                  const kf = Math[wc('0x2b2', 'Uvjy')](kc / k9)
                  return {
                    width: kc,
                    height: kd,
                    size: k9,
                    addSize: kb,
                    columns: kf,
                    total: kf * Math[wb(0x9aa)](kd / k9),
                    list: []
                  }
                })(jT, jZ, jL[w9('0x4f7')], jL[w9('0x639')]))))
            const { slice: k5 } = k0
            ;(k3 && iL(k3[wa('0xb2b', 'R#CE')]) && jQ[w9(0x9c1)](k3[w9('0x73e')], 0x0, 0x0, jU, jV),
              jQ[w9(0x9e5)](0x1 / jZ, 0x1 / jZ))
            const k6 = jk[w9(0x1ab)](jP[wa('0x6cf', 'eXgu')])
            ;(jS[wa(0x4dd, 'qYlx')] && k6[wa('0x6fb', 'BaJX')](jS[w9(0x276)]),
              k6[wa('0xb60', 'baqw')](au[wa('0x467', 'R#CE')](0x1, jZ)))
            for (let k7 = 0x0; k7 < k5[wa(0x944, '&T&3')]; k7++) iN(k7, k5, k0, k6, jT, 0x0, jM, jP, jQ, jR)
          }
          jM[wa('0x98a', '0O(!')] !== k0[w9(0x6a5)] &&
            (iZ(k0), void 0x0 !== jM[w9('0xbe9')] && j0(jM[w9('0xbe9')], jT), (jM[w9('0xbe9')] = k0[w9(0x6a5)]))
        }
      }
      if (jj()) {
        if (jX) {
          if (iL(jT[w9(0x73e)])) jQ[wa('0x580', 'Yihh')](jT[w9(0xb18)](jS[w9('0x970')]), 0x0, 0x0, jU, jV)
          else {
            const { view: k8, level: k9 } = j4(0x0, jT) || am[w9('0x686')]
            ;(iL(k8) && jQ[w9(0x9c1)](k8, 0x0, 0x0, jU, jV),
              0x0 === k9 ||
                (jT[wa('0x9d8', 'Oq6L')] && !jT[wa(0x5a5, 'qYlx')][wa(0x6eb, 'VsAe')]) ||
                (jT[wa(0x80a, 'WA#o')] = am[w9('0xa6b')][w9(0x6b9)][wa('0xa82', '#E*s')](
                  () =>
                    b5(this, void 0x0, void 0x0, function* () {
                      const we = w9,
                        wd = wa,
                        { url: kb } = jT
                      if (!jT[wd('0x66b', 'd)pE')] && kb) {
                        const kc = yield am[we('0x2a4')][we(0x8be)][we(0x94c)](kb, jT[wd(0x27e, '#%(5')], jT)
                        kc && ((jT[wd('0x3fc', '@Bdu')] = kc), jP[wd(0x6c6, 'stof')] && jP[wd(0x68a, 'Yihh')][we(0x4a4)]())
                      }
                      delete jT[we(0x6f0)]
                    }),
                  0x0,
                  () => {
                    const wg = wa,
                      wf = w9,
                      kb = jQ[wf('0x1a2')][wg(0x76d, '#E*s')](jP[wf(0x4cb)])
                    return (kb || delete jT[wf(0x6f0)], kb)
                  }
                )))
          }
          jM[w9('0xb89')] = void 0x0
        }
        jQ[wa('0xa37', 'dwqv')]()
      }
    }
  }
  const jm = (function (jL = 0x1) {
      return jL ? String : jL
    })(),
    jp = (function (jL = 0x1) {
      const wh = kJ
      return jL ? [wh('0x748', '8G&U')] : jL
    })()
  function jq(jL) {
    return (function (jM) {
      const { p: jN } = jm,
        jO = jp[0x0],
        jP = jp[0x1]
      if (jN) return jN(jO, jM) || jN(jP, jM)
    })(jL)
  }
  function ju(jL, jM, jN, jO, jP) {
    return b5(this, void 0x0, void 0x0, function* () {
      const wj = b,
        wi = c,
        { url: jQ } = jL
      if (jQ)
        return iL(jM)
          ? iK(jL, jM, jO, jP)
          : yield am[wi('0x2a4')][wj(0x43b, '&T&3')][wj(0xb43, 'baqw')](
              jN ? iS(jN, jL[wj(0x9ae, 't%gW')], jO, jP) : jQ,
              jL[wi(0xb4d)],
              jL
            )
    })
  }
  const { get: jv, scale: jw, copy: jx } = am[kI('0x5c5')],
    { getFloorScale: jy } = am[kI(0xb50)],
    { abs: jz } = Math,
    jA = kJ(0x442, 'Oq6L'),
    jB = kJ(0x543, 'ZXk)'),
    jC = kI(0x6b9),
    jD = kJ(0x9e7, 'Uvjy')
  function jE(jL, jM) {
    const wn = kI,
      wm = kJ,
      { image: jN, drawLevel: jO } = jL
    jN &&
      (void 0x0 !== jO &&
        (j0(jO, jN),
        (function (jP) {
          const wl = b,
            wk = c,
            { levels: jQ, levelsRange: jR } = jP
          let jS
          if (jQ) {
            for (let jT = jR[wk('0x7f5')]; jT >= jR[wl('0xaab', 'zTI^')]; jT--)
              ((jS = jQ[jT]), jS && jS[wl(0x1f7, 'AZuW')] && iO(jS))
          }
        })(jN),
        (jL[wm(0x522, 'dwqv')] = void 0x0)),
      jN[wn(0xbb1)] && jM[wn('0xb99')] && jN[wn('0x73e')] && (delete jN[wn(0x6f0)], iQ(jN)))
  }
  function jF(jL) {
    const wp = kJ,
      jM = {
        fGPEA: function (jN, jO) {
          const wo = c
          return au[wo(0x3df)](jN, jO)
        },
        OgFnl: function (jN, jO, jP, jQ) {
          return jN(jO, jP, jQ)
        }
      }
    ;((am[wp('0x713', '6XcX')][jA] = function (jN, jO, jP, jQ, jR, jS) {
      const wq = wp
      return au[wq(0x80c, 'stof')](b5, this, void 0x0, void 0x0, function* () {
        const ws = wq,
          wr = c,
          jT = {}
        ;((jT[wr('0x624')] = function (jY, jZ) {
          return jY === jZ
        }),
          (jT[wr(0x64d)] = wr('0xb48')))
        const jU = jT
        let { scaleX: jV, scaleY: jW } = am[ws('0x810', 'ZXk)')][ws('0x20d', 'eDC*')](jN, jO, jP, jQ),
          jX = jV + '-' + jW
        if (
          jN[ws(0x8b4, 'eDC*')] !== jX &&
          !jO[wr(0x695)] &&
          (!am[wr('0x2a4')][jB][ws(0xbdd, 'P6Yp')](jN[wr('0x4b6')], jV, jW) || jN[ws(0x1b2, 'Uvjy')][wr('0x8d5')])
        ) {
          const { image: jY, data: jZ } = jN,
            { transform: k0, gap: k1 } = jZ,
            k2 = am[ws(0x89e, 'AZuW')][wr(0x8ad)](jN, jV, jW),
            k3 = jO[ws('0x5a0', '@Bdu')] && jO[wr('0x49e')][ws('0xb26', 'Wm2w')][ws(0x635, 'Uvjy')]
          k2 && ((jV *= k2), (jW *= k2))
          const k4 = iW(jY[wr(0x500)] * jV, jY[ws('0x921', '!d%r')] * jW, jY),
            { level: k5, scale: k6, addScaleX: k7, addScaleY: k8 } = k4,
            k9 = jY[ws(0x5bd, 'Yihh')] * k6,
            kb = jM[ws(0x8ea, '!d%r')](jY[ws('0x4d1', '%eg$')], k6)
          ;((jV *= k7), (jW *= k8))
          let kc = iX(k5, jY)
          const kd = {}
          ;((kd[ws(0xac8, 'ZXk)')] = k5), (kd[ws(0x960, 'u*vy')] = k6), (kd[wr('0x73e')] = null))
          if (
            (kc
              ? jR &&
                !kc[wr('0x73e')] &&
                (yield (function (kf) {
                  const wu = ws,
                    wt = wr,
                    kg = {
                      CkoWY: function (kh, kj, kk) {
                        return kh(kj, kk)
                      }
                    }
                  if (jU[wt(0x624)](jU[wt(0x64d)], wu(0xa35, 'a#Lf')))
                    return b5(this, void 0x0, void 0x0, function* () {
                      const ww = wt,
                        wv = wu
                      if (wv('0x7f2', ']%#R') !== wv('0x1b0', '9kS6')) {
                        const kj = this[ww(0x760)]()
                        if (!kj) return
                        const kk = this[wv(0x854, 'mFoF')],
                          kl = new kj[wv(0x570, 'SY@W')](this[wv(0x5eb, '#%(5')][ww('0x1de')])
                        kl[ww(0x657)](kk[ww(0x1de)])
                        const km = {}
                        ;((km[wv('0x7c8', 'dwqv')] = wv(0x9be, 'Uvjy')),
                          (km[ww(0x466)] = wv(0x4e4, '%eg$')),
                          (km[wv(0xa0f, 'VsAe')] = !0x0),
                          (km[wv(0xbb7, 'VsAe')] = kj[wv('0x250', 't%gW')]))
                        const { x: kp, y: kq, scaleX: ku, scaleY: kv, rotation: kw, skewX: kx, skewY: ky } = kl[ww(0x6e4)](),
                          kz = km
                        ;((kp || kq) && (kz[wv('0x51f', '%eg$')] = { x: kp, y: kq }),
                          (0x1 === ku && 0x1 === kv) || (kz[ww('0x9e5')] = ku === kv ? ku : { x: ku, y: kv }),
                          kw && (kz[ww(0x39a)] = kw),
                          (kx || ky) && (kz[wv('0x931', '8G&U')] = { x: kx, y: ky }),
                          this[wv('0x47d', 'AZuW')](kz, kj),
                          this[wv(0xad6, 'W8*z')]())
                      } else
                        return new Promise(kj => {
                          const wx = ww
                          kg[wx(0xae9)](j2, kf, kj)
                        })
                    })
                  else {
                    const { levelsRange: kj } = jN
                    ;((kj[wu(0x60c, '9fBN')] = bk[wt('0x86a')](bb, kj[wt(0x86a)])),
                      (kj[wu('0x6e5', 'WA#o')] = jW[wu(0x283, 'HeoH')](k3, kj[wt(0x7f5)])))
                  }
                })(kc))
              : ((kc = kd), iY(kc, jY)),
            !kc[wr(0x73e)] && !kc[wr('0x695')])
          ) {
            const kf = (function (kh, kj) {
                const wy = ws,
                  { levels: kk, levelsRange: kl } = kj
                if (kk) {
                  let km
                  for (let kp = kh; kp <= kl[wy(0x16b, '0O(!')]; kp++)
                    if (((km = kk[kp]), km && km[wy('0x402', 'VsAe')])) return km
                }
              })(k5, jY),
              kg = kf ? kf[wr('0x73e')] : jY[ws('0x2d4', 'ZXk)')]
            if (jR) {
              const kh = yield ju(jY, kg, k5, k9, kb)
              ;(kh ? (kc[ws(0x85f, 'TIpW')] = kh) : ((jN[ws(0x36d, 'mFoF')] = void 0x0), j1(k5, jY)), j3(kc))
            } else {
              if (iL(kg)) kc[wr('0x73e')] = am[ws('0x965', '#E*s')][jB][ws('0x84d', ']%#R')](kg, k9, kb)
              else {
                const kj = kc
                ;(j2(kj, () => {
                  const wA = ws,
                    wz = wr
                  ;((jN[wz('0xb89')] = void 0x0), jO[wA(0x98e, 'mFoF')](wA(0xb0a, 'cQoA')))
                }),
                  kj[wr('0xb87')] ||
                    (kj[wr(0xb87)] = am[ws(0x2b9, 'eXgu')][jC][wr(0x332)](
                      () =>
                        b5(this, void 0x0, void 0x0, function* () {
                          const wC = ws,
                            wB = wr,
                            kl = yield ju(jY, void 0x0, kj[wB('0x6a5')], k9, kb)
                          ;(kl ? (kj[wC(0x95f, 'u*vy')] = kl) : j1(kj[wB('0x6a5')], jY), j3(kj))
                        }),
                      0x0,
                      () => {
                        const wE = ws,
                          wD = wr
                        delete kj[wD(0xb87)]
                        const kl = jP[wE(0x716, '%eg$')][wE(0x1bf, 'qYlx')](jO[wE(0x7f4, 'HeoH')])
                        return (kl || j1(kj[wE(0x689, 'zTI^')], jY), kl)
                      }
                    )),
                  (kc = j4(k5, jY) || am[wr('0x686')]))
                const kk = kc[wr(0x9e5)] / kj[wr(0x9e5)]
                ;((jV *= kk), (jW *= kk))
              }
            }
          }
          if (iL(kc[ws('0x846', '9kS6')]) && (!jS || !jS[ws('0x496', 'mFoF')])) {
            let kl,
              km,
              kp,
              { view: kq, level: ku } = kc
            if (
              (k1 &&
                ((km = (k1['x'] * jV) / jz(jZ[wr(0x80e)] || 0x1)), (kp = (k1['y'] * jW) / jz(jZ[ws('0x2f3', 'baqw')] || 0x1))),
              (k0 || 0x1 !== jV || 0x1 !== jW) &&
                ((jV *= jy(k9 + (km || 0x0))),
                (jW *= jy(kb + (kp || 0x0))),
                (kl = jv()),
                k0 && jx(kl, k0),
                jM[wr('0x5cc')](jw, kl, 0x1 / jV, 0x1 / jW)),
              jN[wr(0x6a5)] !== ku || !jN[ws('0x6f8', 'Wm2w')])
            ) {
              ;((jZ[wr('0x704')] || jZ[ws(0x2a8, 'P6Yp')] || km || kp) &&
                (kq = am[wr(0x2a4)][jB][ws('0x57d', 't%gW')](kq, k9, kb, km, kp, void 0x0, k3, jZ[wr(0x704)], jZ[wr('0x970')])),
                (jN[wr(0x666)] = am[wr(0x2a4)][wr('0x1f3')][jA](
                  kq,
                  jZ[ws('0x5fe', '6XcX')] || am[ws('0x669', '#%(5')][ws(0x7a4, 'TIpW')][ws(0x3d5, 'R#CE')] || wr('0x92c')
                )),
                jN[ws(0x4d6, 'BaJX')] !== ku && (iZ(kc), void 0x0 !== jN[ws(0x179, 'VsAe')] && j0(jN[ws('0xbcd', 'R#CE')], jY)),
                (jN[wr(0x6a5)] = ku))
              const kv = jL[ws(0x997, '&T&3')]
              kv &&
                (function (kw, kx) {
                  const wG = ws,
                    wF = wr,
                    { levels: ky, levelsRange: kz } = kw
                  if (ky) {
                    if (0x1 === kx) {
                      let kA
                      for (let kB = kz[wF('0x7f5')]; kB >= kz[wF(0x86a)]; kB--)
                        ((kA = ky[kB]),
                          kA && kA[wG('0xb64', '0O(!')] && !kA[wG('0x391', '34cl')] && (kA[wF(0x277)] || j1(kA[wF(0x6a5)], kw)))
                    } else {
                      let kC, kD, kE
                      for (let kF = kz[wF(0x7f5)]; kF >= kz[wG(0x69a, '6tZA')]; kF--)
                        ((kD = ky[kF]),
                          kD &&
                            kD[wG('0x62c', ']%#R')] &&
                            !kD[wF(0xb87)] &&
                            (kC && kD && (kC[wF(0x277)] || kD[wF('0x277')] || (j1(kC[wF('0x6a5')], kw), (kC = void 0x0))),
                            kE && !kD[wF(0x277)] ? j1(kD[wF('0x6a5')], kw) : (kC = kD),
                            kE || (kE = !!kD[wG(0x1ca, 'qYlx')])))
                    }
                  }
                })(jY, kv)
            }
            ;(am[wr(0x2a4)][jB][wr(0x870)](jN[ws('0x381', 'eDC*')], kl, jN), (jN[wr(0xb89)] = jX))
          }
          jq() && jR && jO[wr('0x9c5')](wr('0x6ea'))
        }
        jR && jR()
      })
    }),
      (am[wp(0x3a8, '%eg$')][wp('0x1f8', 'P6Yp')] = function (jN, jO, jP, jQ) {
        const wI = wp,
          wH = c
        jN[jD] && jN[jD][wH(0x55e)]()
        const jR = am[wH(0xa6b)][jC][wI(0x655, '8G&U')](
          () =>
            b5(this, void 0x0, void 0x0, function* () {
              return new Promise(jS =>
                b5(this, void 0x0, void 0x0, function* () {
                  const wJ = b
                  try {
                    am[wJ('0x1b7', 'VsAe')][jA](jN, jO, jP, jQ, jS, jR)
                  } catch (jT) {
                    jS(!0x0)
                  }
                })
              )
            }),
          0x0,
          () => (jq() && (jN[jD] = null), jP[wH(0x1a2)][wI('0x220', 'HeoH')](jO[wH(0x4cb)]))
        )
        ;((jN[jD] = jR), jE(jN, jL))
      }))
  }
  const jG = kJ('0x523', '8T&]'),
    jH = kJ(0x78a, '9fBN'),
    jI = kJ(0x506, 'HeoH'),
    jJ = kI(0x715)
  class jK {
    constructor(jL, jM) {
      const wK = kI
      ;((this[wK('0x30c')] = jL),
        (function (jN) {
          const wM = b,
            wL = wK
          ;(jN[wL('0x30c')][wL(0xaf8)](
            am[wM('0xbb4', '6XcX')][wM('0x591', 'qYlx')],
            () => (am[wM(0x407, 'P6Yp')][jG][jI](), void am[wL('0x8ba')][jH][jI]())
          ),
            jN[wL('0x30c')][wL(0xaf8)](
              am[wM('0x5fd', 'W8*z')][wL('0x81a')],
              () => (am[wM(0xa99, '#ftp')][jG][jJ](), void am[wL('0x8ba')][jH][jJ]())
            ))
        })(this),
        (function (jN) {
          const wN = b,
            jO = {}
          jO[wN(0xa69, 'qYlx')] = function (jQ, jR) {
            return jQ === jR
          }
          const jP = jO
          ;((function () {
            const wO = c,
              jQ = am[wO(0x2a4)][j9][j8]
            am[wO(0x2a4)][j9][j8] = function (jR, jS, jT) {
              const jU = {
                wOVCV: function (jV, jW) {
                  const wP = b
                  return jP[wP('0x73a', '34cl')](jV, jW)
                }
              }
              return new Promise((jV, jW) =>
                b5(this, void 0x0, void 0x0, function* () {
                  const wR = c,
                    wQ = b
                  if (jT && jT[wQ('0x3b5', 'mFoF')] && jR === jT[wQ('0x2bc', 'WA#o')]) return jV(jT[wQ('0x846', '9kS6')])
                  if (jS && am[wR(0x2a4)][wR('0x6b0')] && jT && !jT[jc])
                    try {
                      if (wR('0xb96') !== wQ(0x958, 'eXgu')) {
                        const jX = yield jd(am[wQ(0x3d3, 'mFoF')][jb][wQ('0x6ae', '#%(5')](jR))
                        if (!jX['ok']) throw new Error('' + jX[wQ(0xb5f, '!d%r')])
                        let jY
                        const { showProgress: jZ } = jT[wR(0x144)]
                        if (jZ) {
                          const k1 = parseInt(jX[wQ('0x88e', ']%#R')][wR(0x29e)](wR(0x959)) || '0'),
                            k2 = jX[wR(0x361)][wQ('0x6cb', 'WA#o')](),
                            k3 = []
                          let k4,
                            k5 = 0x0,
                            k6 = 0x0
                          const k7 = {}
                          ;((k7[wQ(0xa65, ']%#R')] = 0x0), (k7[wR(0x172)] = k1), (k7[wR(0x84a)] = k5))
                          const k8 = (jT[wQ('0xb79', '6tZA')] = k7)
                          for (;;) {
                            const { done: k9, value: kb } = yield k2[wQ(0x597, 'WA#o')]()
                            if (
                              (kb && (k3[wR('0x6f7')](kb), (k5 += kb[wR(0x1e3)])),
                              (k4 = Date[wR('0x747')]()),
                              jZ &&
                                (k9 || k4 - k6 > 0x64) &&
                                ((k8[wR(0x860)] = k1 ? k5 / k1 : 0x0),
                                (k8[wQ('0xa1f', 'Yihh')] = k1),
                                (k8[wR(0x84a)] = k5),
                                (k6 = k4)),
                              k9)
                            )
                              break
                          }
                          jY = new Blob(k3)
                        } else jY = yield jX[wR(0x7ed)]()
                        const k0 = yield createImageBitmap(jY)
                        ;(yield jf(k0, jT), (jY = null), jV(k0))
                      } else {
                        const { parent: kd } = aL
                        return kd instanceof aF && wQ(0x3be, 'ZXk)') === jR[wQ(0xa3f, 'baqw')] && kd
                      }
                    } catch (kd) {
                      jW(kd)
                    }
                  else
                    jQ(jR, jS)
                      [wQ('0x140', 'dwqv')](kf =>
                        b5(this, void 0x0, void 0x0, function* () {
                          ;(yield jf(kf, jT), jV(kf))
                        })
                      )
                      [wR('0x719')](kf => {
                        const wT = wQ,
                          wS = wR
                        if (jU[wS(0xb85)](wT(0x8bc, '9fBN'), wS(0x3a2))) {
                          const { fromB: kh, a: kj, b: kk, toA: kl } = this[wT(0xacc, '34cl')](bk, bb)
                          ;((aD[wT(0xb09, 'zTI^')]['b'] = kh),
                            (aN['a'] = kj),
                            (kl['b'] = kk),
                            (jT[wT('0x518', 'eXgu')]['a'] = kl))
                        } else jW(kf)
                      })
                })
              )
            }
          })(),
            jl(jN),
            jF(jN))
        })(jM))
    }
  }
  return (
    (am[kI('0x2a4')][kI(0x6b0)] = kJ('0x438', 'gtjs') == typeof createImageBitmap && kJ('0xb8c', ']%#R') == typeof ImageBitmap),
    (am[kJ(0x46e, 'AZuW')][kJ(0x329, '!d%r')] =
      am[kI(0x2a4)][kJ('0xbc6', '&T&3')] && !/firefox/i[kI(0xb19)](navigator[kI(0x138)])),
    (am[kI('0xa4d')][kJ(0x185, 'a#Lf')][kI(0x64e)] = function () {
      return b5(this, void 0x0, void 0x0, function* () {
        const wV = b,
          wU = c
        try {
          if (this[wU('0xae3')] || this[wU(0xa60)]) return
          if (((this[wU(0xa60)] = !0x0), this[wV(0x1e9, 'qYlx')] && !this[wV(0x9e8, 'Oq6L')]())) return this[wV(0x48d, '@Bdu')]()
          this[wU(0xb87)] && this[wV('0x8df', 'Oq6L')][wV('0xbcf', '9kS6')] && (yield this[wU('0xb87')]())
        } catch (jL) {
          console[wU('0x852')](jL)
        }
      })
    }),
    (am[kI(0x548)][kI(0x7ca)][kI('0x2a0')] = function () {
      const wX = kJ,
        wW = kI
      ;((this[wW('0xae3')] = this[wX(0x3b4, 'Wm2w')] = !0x0),
        this[wX('0x650', 'Oq6L')][wW(0xafc)](jL => {
          const wY = wW
          jL[wY(0xae3)] || jL[wY('0x64e')]()
        }),
        this[wW('0xa28')](),
        this[wX('0x265', 'gtjs')]())
    }),
    (am[kJ(0xab9, 'qYlx')][kI(0x332)](kJ(0x92b, 'BaJX')),
    gE([kI('0x707')]),
    (al[kJ('0x5ef', 'BaJX')] = aK),
    (al[kI('0x582')] = bg),
    (al[kI(0x925)] = bf),
    (al[kJ(0x455, 'ZXk)')] = b9),
    (al[kJ('0x96c', '6tZA')] = class {
      constructor(jL, jM = {}) {
        const x0 = kJ,
          wZ = kI
        ;(new jK(jL, jM),
          (am['UI'][wZ(0x7ca)][x0('0x17a', 'dwqv')] = function (jN, jO, jP) {
            const x2 = x0,
              x1 = wZ,
              { image: jQ } = jN,
              { showProgress: jR } = jN[x1('0x42e')]
            if ((am[x2(0x9e0, 'Uvjy')][x1('0x5de')](this['__'][x2(0xbd7, 'HeoH')], this, jO, jP), jR)) {
              const { x: jS, y: jT, width: jU, height: jV } = this[x1('0x4ae')][x2('0xb56', 'd)pE')],
                { scaleX: jW, scaleY: jX } = this[x1(0x34a)](!0x0)
              if (jU * jW > 0x32 && au[x1(0xa08)](jV * jX, 0x1e)) {
                const jY = 0xc / jW
                ;((jO[x2('0xa7d', 'qYlx')] = am[x1(0x465)](jR) ? jR : x1(0xbe0)),
                  (jO[x1('0x9c0')] = x1('0x154') + jY + x2('0x9d2', '6XcX')),
                  jO[x2(0x294, '8T&]')](
                    '.' +
                      (Math[x2('0x1fb', '6XcX')](Math[x2(0x527, 'W8*z')]()) ? '.' : '\x20') +
                      (Math[x1('0x77e')](Math[x2('0x274', 'Clcg')]()) ? '.' : '\x20'),
                    jS + jU / 0x2 - jY / 0x2,
                    jT + jV / 0x2
                  ))
              }
              ;(jN[x1('0x216')] && clearTimeout(jN[x2('0x898', 'eDC*')]),
                (jN[x2('0xade', '6tZA')] = setTimeout(() => {
                  const x4 = x1,
                    x3 = x2
                  jQ[x3(0xb6a, 'ZXk)')] || this[x4(0x9c5)](x3(0xb0a, 'cQoA'))
                }, 0xc8)))
            }
          }))
      }
    }),
    (al[kI(0x531)] = gO),
    (al[kJ('0x349', '@Bdu')] = hk),
    (al[kI(0x5ee)] = aD),
    (al[kI(0x17d)] = gM),
    (al[kI('0xb63')] = gL),
    (al[kJ('0x9f7', 'dwqv')] = class {
      constructor(jL, jM) {
        const x6 = kJ,
          x5 = kI
        ;((this[x5('0x144')] = jM || {}),
          (this[x5(0x30c)] = jL),
          jL[x6(0x6a0, 'Uvjy')](() => {
            const x8 = x6,
              x7 = x5
            !jL[x7(0xaef)][x8('0x5fb', '#ftp')][x7('0x826')] &&
              (new i9(jL), ((new hF(jL)[x8(0x357, 'VsAe')] = new iz(jL)), new i3(jL, jM), new hN(jL, jM)))
          }),
          iI ||
            am[x5(0x34b)][x5(0x4ee)](x5(0x769)) ||
            ((iI = !0x0),
            (am[x6(0xbd0, 't%gW')][x6('0x964', '0O(!')] = function (jN, jO, jP, jQ) {
              const xa = x6,
                x9 = x5
              jN[iH] ||
                (jN[iH] = am[x9(0xa6b)][iG][xa(0x930, 'zTI^')](
                  () =>
                    b5(this, void 0x0, void 0x0, function* () {
                      const xc = x9,
                        xb = xa
                      ;(am[xb(0x5b0, 'a#Lf')][xc(0x227)](jN, jO, jP, jQ), jO[xb(0xb78, 'eDC*')](xb('0x878', 'HeoH')))
                    }),
                  0x0,
                  () => (
                    iF() && ((jN[iH] = null), iJ || (am[xa(0x866, '%eg$')][iG][xa('0x501', '#%(5')][x9(0x7e6)] = iJ = 0x1)),
                    jP[xa(0xa25, '6XcX')][x9('0x833')](jO[x9('0x4cb')])
                  )
                ))
            })))
      }
      [kJ('0x43c', '#E*s')]() {
        const xe = kI,
          xd = kJ,
          jL = this[xd('0x6bc', 'P6Yp')],
          { usePartLayout: jM } = jL[xe('0x144')]
        ;((jL[xd(0x535, 'HeoH')][xe('0x26b')] = !0x1),
          jL[xe('0x534')](am[xe(0x8db)][xe(0x81a)], () => {
            const xf = xe
            jL[xf(0x144)][xf(0x26b)] = jM
          }))
      }
    }),
    (al[kJ(0x579, 'SY@W')] = gE),
    al)
  )
})({}, LeaferUI, LeaferUI, LeaferIN[xg('0x7dc')])
;(function () {
  Object.assign(LeaferUI, PxGrowPlayground)
})()
//# sourceMappingURL=index.js.map
