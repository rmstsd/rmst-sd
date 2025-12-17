import React, { PointerEvent, useEffect, useMemo, useRef, useState } from 'react'
import { SEARCH_ENGINES } from './constants'
import { SearchPriority } from './types'
import { SearchCard } from './components/SearchCard'
import { Copy, Flame } from 'lucide-react'
import clsx from 'clsx'

interface Sentence {
  cn: string
  en: string
  audio: string
  count: number
}

const defultSentence = {
  cn: '每个人都值得大家站起来为他鼓掌一次。',
  en: ' We all deserve a standing ovation at least once in our lives.',
  audio: 'http://api.kekc.cn/api/yien?act=getaudio&filename=MjAyMS0wMS0xOS5tcDM=',
  count: 2907
}

const App: React.FC = () => {
  const primaryEngines = useMemo(() => SEARCH_ENGINES.filter(e => e.priority === SearchPriority.PRIMARY), [])
  const secondaryEngines = useMemo(() => SEARCH_ENGINES.filter(e => e.priority === SearchPriority.SECONDARY), [])
  const tertiaryEngines = useMemo(() => SEARCH_ENGINES.filter(e => e.priority === SearchPriority.TERTIARY), [])

  const [hasTransition, setHasTransition] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [enSentence, setEnSentence] = useState<Sentence>(() => {
    const savedSentence = localStorage.getItem('enSentence')

    if (savedSentence) {
      const data = JSON.parse(savedSentence)

      // 缓存过期时间 4 小时
      if (Date.now() - data.outOfDate > 1000 * 60 * 60 * 4) {
        return null
      }

      return data.data
    }

    return {}
  })

  useEffect(() => {
    if (!Object.keys(enSentence).length) {
      refreshSentence()
    }
  }, [enSentence])

  useEffect(() => {
    let timer = null
    document.addEventListener('visibilitychange', () => {
      if (import.meta.env.DEV) {
        return
      }

      if (document.visibilityState === 'visible') {
        clearTimeout(timer)
      } else {
        timer = setTimeout(() => {
          window.close()
        }, 3000)
      }
    })
  }, [])

  const refreshSentence = async () => {
    setHasTransition(false)
    await nextFrame()

    setIsOpen(false)
    await nextFrame()

    setHasTransition(true)

    fetch('https://api.kekc.cn/api/yien')
      .then(response => response.json())
      .then(data => {
        console.log('请求')

        localStorage.setItem('enSentence', JSON.stringify({ outOfDate: Date.now(), data }))
        setEnSentence(data)
      })
      .catch(error => console.error('请求失败：', error))
  }

  const ref = useRef<HTMLDivElement>(null)
  const downNowRef = useRef(0)
  const onPointerDown = (evt: PointerEvent) => {
    ref.current = evt.target as HTMLDivElement
    downNowRef.current = Date.now()
  }

  const onPointerUp = (evt: PointerEvent) => {
    if (ref.current !== evt.target) {
      return
    }
    ref.current = null

    if (Date.now() - downNowRef.current < 500) {
      setIsOpen(!isOpen)
    } else {
      refreshSentence()
    }
  }

  return (
    <div className="h-screen w-full bg-slate-50/50 font-sans text-slate-800 selection:bg-blue-100 selection:text-blue-900 overflow-hidden flex flex-col">
      {/* Background decoration */}
      <div className="fixed inset-0 -z-10 from-slate-100 via-transparent to-transparent opacity-60"></div>

      {/* Header - Compact & Fixed */}
      <header className="flex-shrink-0 pt-8 pb-2 flex flex-col items-center justify-center">
        <div className="flex gap-1 mb-1">
          <div className="action flex gap-2 items-center" onPointerDown={evt => evt.preventDefault()}>
            <div
              className="text-blue-600 cursor-pointer transition hover:text-blue-500 active:text-blue-700"
              onPointerDown={onPointerDown}
              onPointerUp={onPointerUp}
            >
              <Flame size={22} strokeWidth={3} />
            </div>
          </div>

          <div className="overflow-clip " style={{ height: 25 }}>
            <div
              className={clsx('relative text-slate-900 ', hasTransition && 'transition-all duration-300 ease-out')}
              style={{ fontSize: 17, transform: isOpen ? 'translateY(0)' : 'translateY(-25px)' }}
            >
              <div className={clsx('cn-sentence flex items-center gap-2 w-max')}>
                {enSentence.cn}
                <Copy
                  size={16}
                  className="cursor-pointer text-slate-500 hover:text-slate-600"
                  onClick={() => copy(enSentence.cn)}
                />
              </div>
              <div className={clsx('en-sentence flex items-center gap-2 w-max ')}>
                {enSentence.en}
                <Copy
                  size={16}
                  className="cursor-pointer text-slate-500 hover:text-slate-600"
                  onClick={() => copy(enSentence.en)}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container - Flexible & Centered */}
      <main className="flex-1 w-full max-w-[1600px] mx-auto px-4 md:px-8 flex flex-col justify-center gap-14 pb-6">
        {/* Secondary Section */}
        <section className="flex-shrink-0">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-base font-bold text-slate-700 pl-1">Developer Resources</span>
            <div className="h-px bg-slate-200 flex-1"></div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {secondaryEngines.map(item => (
              <SearchCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        {/* Primary Section */}
        <section className="flex-shrink-0">
          <div className="grid grid-cols-2 gap-6">
            {primaryEngines.map(item => (
              <SearchCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        {/* Tertiary Section */}
        <section className="flex-shrink-0 ">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-base font-bold text-slate-700 pl-1">Community & Social</span>
            <div className="h-px bg-slate-200 flex-1"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {tertiaryEngines.map(item => (
              <SearchCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default App

const copy = (text: string) => {
  navigator.clipboard.writeText(text)
}

const nextFrame = () => {
  return new Promise(resolve => {
    requestAnimationFrame(resolve)
  })
}
