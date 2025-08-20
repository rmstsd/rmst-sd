import type { PlasmoCSConfig } from 'plasmo'

export const config: PlasmoCSConfig = {
  matches: ['<all_urls>'],
  world: 'MAIN'
}

// import { isObservable, toJS } from 'mobx'

declare global {
  interface Window {
    __jf: any
    devtoolsFormatters
  }
}

initCustomFormatter()

// https://www.mattzeunert.com/2016/02/19/custom-chrome-devtools-object-formatters.html
function initCustomFormatter(): void {
  const isObject = (val: unknown): val is Record<any, any> => val !== null && typeof val === 'object'

  const MobxStyle = { style: 'color: #dd5c15' }

  const formatter = {
    __mobx_formatter: true,
    header(obj: unknown) {
      const __jf = (window as any).__jf
      if (!__jf) {
        return null
      }

      const { isObservable, toJS } = __jf()

      if (!isObservable || !toJS) {
        return null
      }

      if (!isObject(obj)) {
        return null
      }

      if (isObservable(obj)) {
        const data = toJS(obj)

        return [
          'div',
          {},
          ['span', MobxStyle, 'Mobx'],
          '<',
          // '电饭锅',
          formatValue(data),
          '>'
        ]
      }

      return null
    },
    hasBody: function (obj) {
      return false
    }
  }

  function formatValue(v: unknown) {
    return ['object', { object: v }]
  }

  if (window.devtoolsFormatters) {
    window.devtoolsFormatters.push(formatter)
  } else {
    window.devtoolsFormatters = [formatter]
  }
}
