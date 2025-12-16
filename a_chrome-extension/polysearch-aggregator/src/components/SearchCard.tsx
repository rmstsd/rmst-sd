import React, { useState, useCallback } from 'react'
import { SearchEngineItem, SearchPriority } from '../types'
import { Clipboard, ArrowRight } from 'lucide-react'

interface SearchCardProps {
  item: SearchEngineItem
}

export const SearchCard: React.FC<SearchCardProps> = ({ item }) => {
  const [query, setQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  const handleSearch = useCallback(() => {
    if (!query.trim()) return
    const url = `${item.searchLink}${encodeURIComponent(query)}`
    window.open(url, '_blank')
  }, [query, item.searchLink])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const handlePasteAndSearch = async () => {
    try {
      const text = await navigator.clipboard.readText()
      if (text) {
        setQuery(text)
        const url = `${item.searchLink}${encodeURIComponent(text)}`
        window.open(url, '_blank')
      }
    } catch (err) {
      console.error('Failed to read clipboard contents: ', err)
    }
  }

  const isPrimary = item.priority === SearchPriority.PRIMARY

  const placeholderText =
    item.placeholder && item.placeholder.toLowerCase().includes(item.name.toLowerCase())
      ? item.placeholder
      : `Search ${item.name}...`

  // --- PRIMARY LAYOUT (Vertical: Logo Top, Input Bottom) ---
  if (isPrimary) {
    return (
      <div className="flex flex-col items-center justify-center gap-6 w-full p-8 bg-white rounded-3xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100 transition-all duration-300 hover:shadow-[0_10px_40px_-4px_rgba(0,0,0,0.1)]">
        {/* Top: Large Logo */}
        <div
          className="
            w-24 h-24 flex-shrink-0
            bg-slate-50 rounded-3xl 
            flex items-center justify-center p-5
            shadow-inner border border-slate-100
          "
        >
          <img
            src={`https://picsum.photos/seed/${item.logoSeed}/200/200`}
            alt={item.name}
            className="w-full h-full object-contain mix-blend-multiply opacity-90"
          />
        </div>

        {/* Bottom: Search Bar */}
        <div
          className={`
            w-full h-16 relative flex items-center
            bg-slate-50 rounded-2xl 
            border border-slate-200/60
            transition-all duration-300
            ${
              isFocused
                ? 'bg-white ring-4 ring-blue-50 border-blue-200 shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)]'
                : 'hover:bg-white hover:shadow-md hover:border-slate-300'
            }
          `}
        >
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholderText}
            className="w-full h-full bg-transparent border-none outline-none focus:ring-0 text-slate-700 placeholder:text-slate-400 font-medium text-lg px-6 rounded-2xl"
          />

          <div className="flex items-center gap-2 pr-2 absolute right-0">
            {/* Paste Button */}
            <button
              onClick={handlePasteAndSearch}
              className="w-10 h-10 flex items-center justify-center rounded-xl text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
              title="Paste & Search"
            >
              <Clipboard size={20} />
            </button>

            {/* Search Button */}
            <button
              onClick={handleSearch}
              className="h-12 w-16 bg-slate-900 text-white rounded-xl flex items-center justify-center transition-all hover:bg-slate-800 hover:shadow-lg active:scale-95"
              title={`Search ${item.name}`}
            >
              <ArrowRight size={22} />
            </button>
          </div>
        </div>
      </div>
    )
  }

  // --- SECONDARY / TERTIARY LAYOUT (Compact Pill) ---
  return (
    <div className="group relative transition-all duration-300 ease-out">
      <div
        className={`
          relative flex items-center transition-all duration-300
          bg-white rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.06)] border border-slate-100 p-1.5
          hover:shadow-[0_6px_16px_-4px_rgba(0,0,0,0.08)] hover:border-slate-300
          ${isFocused ? 'ring-2 ring-blue-50 border-blue-300' : ''}
        `}
      >
        <div className="flex-1 min-w-0 mx-2">
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholderText}
            className="w-full h-12 bg-transparent border-none outline-none focus:ring-0 text-slate-700 placeholder:text-slate-400 font-medium text-base"
          />
        </div>

        <div className="flex items-center gap-1 pr-0.5">
          <button
            onClick={handlePasteAndSearch}
            className="w-10 h-10 flex items-center justify-center rounded-lg text-slate-300 hover:text-blue-600 hover:bg-blue-50 transition-all opacity-0 group-hover:opacity-100"
            title="Paste & Search"
          >
            <Clipboard size={18} />
          </button>

          <button
            onClick={handleSearch}
            className="w-11 h-11 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center overflow-hidden relative transition-all hover:border-blue-200 hover:shadow-sm group-hover:bg-white"
            title={`Search ${item.name}`}
          >
            <div className="w-6 h-6 rounded-full overflow-hidden relative">
              <img
                src={`https://picsum.photos/seed/${item.logoSeed}/100/100`}
                alt="Go"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
