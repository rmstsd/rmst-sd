import React, { useState, useCallback } from 'react'
import { SearchEngineItem, SearchPriority } from '../types'
import { Clipboard, ArrowRight } from 'lucide-react'

interface SearchCardProps {
  item: SearchEngineItem
}

export const SearchCard: React.FC<SearchCardProps> = ({ item }) => {
  const [query, setQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  const handleSearch = () => {
    if (!query.trim()) {
      window.open(item.homeLink, '_blank')
      return
    }

    const url = `${item.searchLink}${encodeURIComponent(query)}`
    window.open(url, '_blank')
  }

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

  // --- PRIMARY LAYOUT (Vertical: Logo Top, Input Bottom) ---
  if (isPrimary) {
    return (
      <div className="flex flex-col items-center justify-center bg-white">
        {/* Top: Large Logo */}
        <div className="h-52 w-full flex-shrink-0 flex items-center justify-center">{item.icon}</div>

        {/* Bottom: Search Bar */}
        <div
          className={`
            w-full h-16 relative flex items-center
            rounded-xl 
            border border-slate-300
            transition-all duration-300
            ${
              isFocused
                ? 'border-slate-400 bg-white ring-4 ring-blue-100'
                : 'hover:bg-white hover:shadow-md hover:border-slate-400'
            }
          `}
        >
          <input
            autoFocus={item.id === 'google'}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={item.name}
            className="w-full h-full bg-transparent border-none outline-none focus:ring-0 text-slate-700 placeholder:text-slate-400 font-medium text-lg px-6 rounded-2xl"
          />

          <div className="flex items-center gap-2 pr-2 absolute right-0">
            {/* Paste Button */}
            <button
              tabIndex={-1}
              onClick={handlePasteAndSearch}
              className="w-10 h-10 flex items-center justify-center rounded-xl text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
              title="Paste & Search"
            >
              <Clipboard size={20} />
            </button>

            {/* Search Button */}
            <button
              tabIndex={-1}
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
          bg-white
          relative flex items-center transition-all duration-300
          rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.06)] border border-slate-300 p-1.5
          hover:shadow-[0_6px_16px_-4px_rgba(0,0,0,0.08)] hover:border-slate-400
          ${isFocused ? 'bg-white ring-2 ring-blue-100 border-slate-400' : 'hover:bg-white'}
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
            placeholder={item.name}
            className="w-full h-12 bg-transparent border-none focus:ring-0 text-slate-700 placeholder:text-slate-400 font-medium text-base"
          />
        </div>

        <div className="flex items-center gap-1 pr-0.5">
          <button
            tabIndex={-1}
            onClick={handlePasteAndSearch}
            className="w-10 h-10 flex items-center justify-center rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all"
            title="Paste & Search"
          >
            <Clipboard size={18} />
          </button>

          <button
            tabIndex={-1}
            onClick={handleSearch}
            className="w-11 h-11 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center overflow-hidden relative transition-all hover:border-blue-200 hover:shadow-sm group-hover:bg-white"
            title={`Search ${item.name}`}
          >
            <div className="w-8 h-8 overflow-hidden relative flex items-center justify-center">{item.icon}</div>
          </button>
        </div>
      </div>
    </div>
  )
}
