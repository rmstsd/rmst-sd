var e, t
'function' == typeof (e = globalThis.define) && ((t = e), (e = null)),
  (function (t, o, n, r, u) {
    var l =
        'undefined' != typeof globalThis
          ? globalThis
          : 'undefined' != typeof self
          ? self
          : 'undefined' != typeof window
          ? window
          : 'undefined' != typeof global
          ? global
          : {},
      f = 'function' == typeof l[r] && l[r],
      i = f.cache || {},
      d = 'undefined' != typeof module && 'function' == typeof module.require && module.require.bind(module)
    function s(e, o) {
      if (!i[e]) {
        if (!t[e]) {
          var n = 'function' == typeof l[r] && l[r]
          if (!o && n) return n(e, !0)
          if (f) return f(e, !0)
          if (d && 'string' == typeof e) return d(e)
          var u = Error("Cannot find module '" + e + "'")
          throw ((u.code = 'MODULE_NOT_FOUND'), u)
        }
        ;(a.resolve = function (o) {
          var n = t[e][1][o]
          return null != n ? n : o
        }),
          (a.cache = {})
        var c = (i[e] = new s.Module(e))
        t[e][0].call(c.exports, a, c, c.exports, this)
      }
      return i[e].exports
      function a(e) {
        var t = a.resolve(e)
        return !1 === t ? {} : s(t)
      }
    }
    ;(s.isParcelRequire = !0),
      (s.Module = function (e) {
        ;(this.id = e), (this.bundle = s), (this.exports = {})
      }),
      (s.modules = t),
      (s.cache = i),
      (s.parent = f),
      (s.register = function (e, o) {
        t[e] = [
          function (e, t) {
            t.exports = o
          },
          {}
        ]
      }),
      Object.defineProperty(s, 'root', {
        get: function () {
          return l[r]
        }
      }),
      (l[r] = s)
    for (var c = 0; c < o.length; c++) s(o[c])
    if (n) {
      var a = s(n)
      'object' == typeof exports && 'undefined' != typeof module
        ? (module.exports = a)
        : 'function' == typeof e && e.amd
        ? e(function () {
            return a
          })
        : u && (this[u] = a)
    }
  })(
    {
      jbOH4: [
        function (e, t, o) {
          var n = e('@parcel/transformer-js/src/esmodule-helpers.js')
          n.defineInteropFlag(o), n.export(o, 'config', () => r)
          let r = { matches: ['<all_urls>'], world: 'MAIN' }
          ;(function () {
            let e = e => null !== e && 'object' == typeof e,
              t = { style: 'color: #dd5c15' },
              o = {
                __mobx_formatter: !0,
                header(o) {
                  let n = window.__jf
                  if (!n) return null
                  let { isObservable: r, toJS: u } = n()
                  if (!r || !u || !e(o)) return null
                  if (r(o)) {
                    let e = u(o)
                    return ['div', {}, ['span', t, 'Mobx'], '<', ['object', { object: e }], '>']
                  }
                  return null
                },
                hasBody: function (e) {
                  return !1
                }
              }
            window.devtoolsFormatters ? window.devtoolsFormatters.push(o) : (window.devtoolsFormatters = [o])
          })()
        },
        { '@parcel/transformer-js/src/esmodule-helpers.js': 'hbR2Q' }
      ],
      hbR2Q: [
        function (e, t, o) {
          ;(o.interopDefault = function (e) {
            return e && e.__esModule ? e : { default: e }
          }),
            (o.defineInteropFlag = function (e) {
              Object.defineProperty(e, '__esModule', { value: !0 })
            }),
            (o.exportAll = function (e, t) {
              return (
                Object.keys(e).forEach(function (o) {
                  'default' === o ||
                    '__esModule' === o ||
                    t.hasOwnProperty(o) ||
                    Object.defineProperty(t, o, {
                      enumerable: !0,
                      get: function () {
                        return e[o]
                      }
                    })
                }),
                t
              )
            }),
            (o.export = function (e, t, o) {
              Object.defineProperty(e, t, { enumerable: !0, get: o })
            })
        },
        {}
      ]
    },
    ['jbOH4'],
    'jbOH4',
    'parcelRequirefef0'
  ),
  (globalThis.define = t)
