import React, { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react'
import { SearchEngineItem, SearchPriority } from '../types'
import { Clipboard, ArrowRight } from 'lucide-react'
import { Option } from './types'
import fetchJsonp from 'fetch-jsonp'

const SUGGEST_API = 'https://suggestqueries.google.com/complete/search?client=chrome&q='
const DROPDOWN_MAX_HEIGHT = 240

const isChromeExtension = () => typeof chrome !== 'undefined' && !!chrome?.runtime?.id

/** 获取联想建议：扩展环境用 chrome.runtime.sendMessage，普通网页用 fetchJsonp */
function fetchSuggestions(query: string): Promise<Option[]> {
  if (isChromeExtension() && chrome?.runtime?.sendMessage) {
    return new Promise((resolve, reject) => {
      const runtime = chrome!.runtime!
      runtime.sendMessage({ type: 'FETCH_SUGGEST', query }, (response: unknown) => {
        const err = 'lastError' in runtime ? (runtime as { lastError?: { message?: string } }).lastError : undefined
        if (err) {
          reject(new Error(err.message))
          return
        }
        const list = Array.isArray(response) ? (response as string[]) : []
        resolve(list.map(s => ({ id: s, label: s })))
      })
    })
  }
  return fetchJsonp(SUGGEST_API + encodeURIComponent(query))
    .then(res => res.json())
    .then((data: unknown[]) => ((data[1] || []) as string[]).map(s => ({ id: s, label: s })))
}

interface SearchCardProps {
  item: SearchEngineItem
}

export const SearchCard: React.FC<SearchCardProps> = ({ item }) => {
  const [query, setQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [suggestions, setSuggestions] = useState<Option[]>([])
  const [isSuggestionsLoading, setIsSuggestionsLoading] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const [dropdownPlacement, setDropdownPlacement] = useState<'above' | 'below'>('below')
  const containerRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const requestIdRef = useRef(0)

  const openSearchUrl = useCallback(
    (text: string) => {
      if (!text.trim()) {
        window.open(item.homeLink, '_blank')
        return
      }
      window.open(`${item.searchLink}${encodeURIComponent(text)}`, '_blank')
    },
    [item.homeLink, item.searchLink]
  )

  useLayoutEffect(() => {
    if (!isDropdownOpen || !containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    setDropdownPlacement(window.innerHeight - rect.bottom >= DROPDOWN_MAX_HEIGHT ? 'below' : 'above')
  }, [isDropdownOpen])

  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([])
      setIsSuggestionsLoading(false)
      return
    }
    const requestId = performance.now()
    requestIdRef.current = requestId
    setIsSuggestionsLoading(true)
    fetchSuggestions(query)
      .then(list => {
        if (requestIdRef.current !== requestId) return
        setSuggestions(list)
        setHighlightedIndex(list.length > 0 ? 0 : -1)
      })
      .catch(() => {
        if (requestIdRef.current === requestId) setSuggestions([])
      })
      .finally(() => {
        if (requestIdRef.current === requestId) setIsSuggestionsLoading(false)
      })
  }, [query])

  useEffect(() => {
    const onOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setIsDropdownOpen(false)
    }
    document.addEventListener('mousedown', onOutside)
    return () => document.removeEventListener('mousedown', onOutside)
  }, [])

  const closeDropdown = useCallback(() => {
    setIsDropdownOpen(false)
    setHighlightedIndex(-1)
  }, [])

  const searchWithQuery = useCallback(
    (queryText: string) => {
      setQuery(queryText)
      closeDropdown()
      openSearchUrl(queryText)
    },
    [closeDropdown, openSearchUrl]
  )

  const handleSearch = useCallback(() => {
    openSearchUrl(query)
    setIsDropdownOpen(false)
  }, [query, openSearchUrl])

  const selectSuggestion = useCallback((option: Option) => searchWithQuery(option.label), [searchWithQuery])

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setQuery(val)
    setIsDropdownOpen(true)
    if (!val) setSuggestions([])
  }, [])

  const scrollHighlightIntoView = useCallback((index: number) => {
    const el = listRef.current?.children[index] as HTMLElement | undefined
    if (el) requestAnimationFrame(() => el.scrollIntoView({ block: 'nearest' }))
  }, [])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (isDropdownOpen && suggestions.length > 0) {
        switch (e.key) {
          case 'ArrowDown': {
            e.preventDefault()
            const next = highlightedIndex < suggestions.length - 1 ? highlightedIndex + 1 : 0
            setHighlightedIndex(next)
            scrollHighlightIntoView(next)
            return
          }
          case 'ArrowUp': {
            e.preventDefault()
            const prev = highlightedIndex > 0 ? highlightedIndex - 1 : suggestions.length - 1
            setHighlightedIndex(prev)
            scrollHighlightIntoView(prev)
            return
          }
          case 'Enter':
            e.preventDefault()
            if (highlightedIndex >= 0 && highlightedIndex < suggestions.length) {
              searchWithQuery(suggestions[highlightedIndex].label)
            } else {
              handleSearch()
            }
            return
          case 'Escape':
            e.preventDefault()
            closeDropdown()
            return
        }
      }
      if (e.key === 'Enter') handleSearch()
    },
    [isDropdownOpen, suggestions, highlightedIndex, scrollHighlightIntoView, searchWithQuery, handleSearch, closeDropdown]
  )

  const handleFocus = useCallback(() => {
    setIsFocused(true)
    setIsDropdownOpen(true)
  }, [])

  const handleBlur = useCallback(() => setIsFocused(false), [])

  const handlePasteAndSearch = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText()
      if (text) {
        setQuery(text)
        openSearchUrl(text)
      }
    } catch (err) {
      console.error('Failed to read clipboard contents: ', err)
    }
  }, [openSearchUrl])

  const isPrimary = item.priority === SearchPriority.Primary

  const dropdownList =
    suggestions.length > 0 ? (
      <ul
        ref={listRef}
        className={`absolute z-50 left-0 right-0 max-h-60 overflow-auto rounded-xl border border-slate-200 bg-white py-1 shadow-lg ring-1 ring-black/5 text-slate-700 ${
          dropdownPlacement === 'below' ? 'top-full mt-1' : 'bottom-full mb-1'
        }`}
        role="listbox"
      >
        {suggestions.map((opt, index) => (
          <li
            key={opt.id}
            role="option"
            aria-selected={highlightedIndex === index}
            className={`cursor-pointer select-none py-2.5 px-4 text-base transition-colors ${
              highlightedIndex === index ? 'bg-blue-50 text-blue-900' : 'hover:bg-slate-50'
            }`}
            onClick={() => selectSuggestion(opt)}
            onMouseEnter={() => setHighlightedIndex(index)}
          >
            {opt.label}
          </li>
        ))}
        {isSuggestionsLoading && (
          <li className="py-1.5 px-4 text-slate-400 text-xs text-center border-t border-slate-100">更新中...</li>
        )}
      </ul>
    ) : null

  // --- PRIMARY LAYOUT (Vertical: Logo Top, Input Bottom) ---
  if (isPrimary) {
    return (
      <div className="flex flex-col items-center justify-center bg-white">
        {/* Top: Large Logo */}
        <div className="h-52 w-full flex-shrink-0 flex items-center justify-center">{item.icon}</div>

        {/* Bottom: Search Bar (with autocomplete) */}
        <div
          ref={containerRef}
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
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={item.name}
            className="w-full h-full bg-transparent border-none outline-none focus:ring-0 text-slate-700 placeholder:text-slate-400 font-medium text-lg px-6 rounded-2xl"
            role="combobox"
            aria-expanded={isDropdownOpen}
            aria-autocomplete="list"
          />
          {isDropdownOpen && dropdownList}

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

  // --- SECONDARY / TERTIARY LAYOUT (Compact Pill, with autocomplete) ---
  return (
    <div className="group relative transition-all duration-300 ease-out">
      <div
        ref={containerRef}
        className={`
          bg-white
          relative flex items-center transition-all duration-300
          rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.06)] border border-slate-300 p-1.5
          hover:shadow-[0_6px_16px_-4px_rgba(0,0,0,0.08)] hover:border-slate-400
          ${isFocused ? 'bg-white ring-2 ring-blue-100 border-slate-400' : 'hover:bg-white'}
        `}
      >
        <div className="flex-1 min-w-0 mx-2 relative">
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={item.name}
            className="w-full h-12 bg-transparent border-none focus:ring-0 text-slate-700 placeholder:text-slate-400 font-medium text-base"
            role="combobox"
            aria-expanded={isDropdownOpen}
            aria-autocomplete="list"
          />
        </div>

        {isDropdownOpen && dropdownList}

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
