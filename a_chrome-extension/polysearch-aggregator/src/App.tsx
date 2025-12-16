import React, { useMemo } from 'react'
import { SEARCH_ENGINES } from './constants'
import { SearchPriority } from './types'
import { SearchCard } from './components/SearchCard'
import { Search } from 'lucide-react'

const App: React.FC = () => {
  const primaryEngines = useMemo(() => SEARCH_ENGINES.filter(e => e.priority === SearchPriority.PRIMARY), [])
  const secondaryEngines = useMemo(() => SEARCH_ENGINES.filter(e => e.priority === SearchPriority.SECONDARY), [])
  const tertiaryEngines = useMemo(() => SEARCH_ENGINES.filter(e => e.priority === SearchPriority.TERTIARY), [])

  return (
    <div className="h-screen w-full bg-slate-50/50 font-sans text-slate-800 selection:bg-blue-100 selection:text-blue-900 overflow-hidden flex flex-col">
      {/* Background decoration */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-100 via-transparent to-transparent opacity-60"></div>

      {/* Header - Compact & Fixed */}
      <header className="flex-shrink-0 pt-8 pb-2 flex flex-col items-center justify-center">
        <div className="flex items-center gap-3 mb-1">
          <div className="text-blue-600">
            <Search size={28} strokeWidth={3} />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">PolySearch</h1>
        </div>
      </header>

      {/* Main Container - Flexible & Centered */}
      <main className="flex-1 w-full max-w-[1600px] mx-auto px-4 md:px-8 flex flex-col justify-center gap-6 md:gap-8 pb-6">
        {/* Primary Section */}
        <section className="flex-shrink-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {primaryEngines.map(item => (
              <SearchCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        {/* Secondary Section */}
        <section className="flex-shrink-0">
          <div className="flex items-center gap-4 mb-3 opacity-70">
            <span className="text-sm font-semibold text-slate-500 pl-1">Developer Resources</span>
            <div className="h-px bg-slate-200 flex-1"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {secondaryEngines.map(item => (
              <SearchCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        {/* Tertiary Section */}
        <section className="flex-shrink-0">
          <div className="flex items-center gap-4 mb-3 opacity-70">
            <span className="text-sm font-semibold text-slate-500 pl-1">Community & Social</span>
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
