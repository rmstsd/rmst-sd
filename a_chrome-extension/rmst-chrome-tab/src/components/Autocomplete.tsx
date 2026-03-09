import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { Option, AutocompleteProps } from './types'
import { ChevronDownIcon, XMarkIcon, LoaderIcon, CheckIcon, SearchIcon } from './Icons'

/**
 * A highly reusable, accessible Autocomplete component.
 */
const Autocomplete = <T extends Option>({
  options,
  value,
  onChange,
  label,
  placeholder = 'Select an option...',
  isLoading = false,
  disabled = false,
  className = '',
  renderOption,
  filterOptions,
  onInputChange,
  error
}: AutocompleteProps<T>) => {
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  // Sync internal input value with external value prop
  useEffect(() => {
    if (value) {
      setInputValue(value.label)
    } else {
      setInputValue('')
    }
  }, [value])

  // Handle outside click to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        // Reset input to matched value if closed without selection
        if (value) {
          setInputValue(value.label)
        } else {
          setInputValue('')
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [value])

  // Filter logic
  const filteredOptions = useMemo(() => {
    if (filterOptions === null) return options // Server-side filtering or no filtering

    if (filterOptions) {
      return filterOptions(options, inputValue)
    }

    // Default filtering: Case insensitive label match
    if (!inputValue) return options
    // If the input value exactly matches the selected value, show all (simulating a "focused but valid" state)
    if (value && inputValue === value.label) return options

    return options.filter(option => option.label.toLowerCase().includes(inputValue.toLowerCase()))
  }, [options, inputValue, filterOptions, value])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value
    setInputValue(newVal)
    setIsOpen(true)
    setHighlightedIndex(0) // Reset highlight on search change

    if (onInputChange) {
      onInputChange(newVal)
    }

    // If user clears input, clear selection
    if (newVal === '') {
      onChange(null)
    }
  }

  const handleSelect = useCallback(
    (option: T) => {
      onChange(option)
      setInputValue(option.label)
      setIsOpen(false)
      setHighlightedIndex(-1)
    },
    [onChange]
  )

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()
    onChange(null)
    setInputValue('')
    setIsOpen(false)
    inputRef.current?.focus()
    if (onInputChange) onInputChange('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setIsOpen(true)
        setHighlightedIndex(prev => (prev < filteredOptions.length - 1 ? prev + 1 : 0))
        scrollIntoView(highlightedIndex + 1)
        break
      case 'ArrowUp':
        e.preventDefault()
        setIsOpen(true)
        setHighlightedIndex(prev => (prev > 0 ? prev - 1 : filteredOptions.length - 1))
        scrollIntoView(highlightedIndex - 1)
        break
      case 'Enter':
        e.preventDefault()
        if (isOpen && highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
          handleSelect(filteredOptions[highlightedIndex])
        }
        break
      case 'Escape':
        setIsOpen(false)
        if (value) setInputValue(value.label)
        else setInputValue('')
        inputRef.current?.blur()
        break
      case 'Tab':
        setIsOpen(false)
        break
    }
  }

  // Helper to scroll the list to the highlighted item
  const scrollIntoView = (index: number) => {
    if (listRef.current) {
      const item = listRef.current.children[index] as HTMLElement
      if (item) {
        requestAnimationFrame(() => {
          item.scrollIntoView({ block: 'nearest' })
        })
      }
    }
  }

  // Default option renderer with simple highlighting
  const defaultRenderOption = (option: T, isSelected: boolean) => {
    // Simple substring highlighting
    if (!inputValue || (value && inputValue === value.label)) {
      return <span className={`block truncate ${isSelected ? 'font-semibold' : 'font-normal'}`}>{option.label}</span>
    }

    // Escape regex characters in inputValue to prevent crashes
    const escapedInput = inputValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const parts = option.label.split(new RegExp(`(${escapedInput})`, 'gi'))

    return (
      <span className={`block truncate ${isSelected ? 'font-semibold' : 'font-normal'}`}>
        {parts.map((part, i) =>
          part.toLowerCase() === inputValue.toLowerCase() ? (
            <span key={i} className="bg-indigo-100 text-indigo-700 rounded-sm px-0.5">
              {part}
            </span>
          ) : (
            part
          )
        )}
      </span>
    )
  }

  return (
    <div className={`w-full ${className}`} ref={containerRef}>
      {label && <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>}
      <div className="relative mt-1">
        {/* Input Wrapper */}
        <div
          className={`
                relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left 
                border shadow-sm transition-all duration-200
                focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500
                ${error ? 'border-red-500 focus-within:ring-red-500 focus-within:border-red-500' : 'border-gray-300'}
                ${disabled ? 'bg-gray-100 cursor-not-allowed opacity-75' : ''}
            `}
        >
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
            <SearchIcon className="h-5 w-5" />
          </div>
          <input
            ref={inputRef}
            type="text"
            className={`
                w-full border-none py-2.5 pl-10 pr-10 text-sm leading-5 text-gray-900 
                focus:ring-0 outline-none placeholder:text-gray-400
                ${disabled ? 'cursor-not-allowed bg-transparent' : 'bg-white'}
            `}
            placeholder={placeholder}
            onChange={handleInputChange}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            value={inputValue}
            disabled={disabled}
            role="combobox"
            aria-expanded={isOpen}
            aria-controls="options"
            aria-activedescendant={highlightedIndex >= 0 ? `option-${highlightedIndex}` : undefined}
          />

          {/* Right Side Icons (Loading, Clear, Chevron) */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 gap-1">
            {isLoading ? (
              <LoaderIcon className="h-4 w-4 text-indigo-500" />
            ) : (
              <>
                {value && !disabled && (
                  <button
                    onClick={handleClear}
                    className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                    tabIndex={-1}
                    aria-label="Clear selection"
                  >
                    <XMarkIcon className="h-4 w-4" />
                  </button>
                )}
                <button
                  onClick={() => {
                    if (!disabled) {
                      inputRef.current?.focus()
                      setIsOpen(!isOpen)
                    }
                  }}
                  tabIndex={-1}
                  className={`p-1 text-gray-400 hover:text-gray-600 transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                >
                  <ChevronDownIcon className="h-5 w-5" />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Error Message */}
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}

        {/* Dropdown Options */}
        {isOpen && !disabled && (
          <ul
            ref={listRef}
            className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm custom-scrollbar"
            role="listbox"
            id="options"
          >
            {filteredOptions.length === 0 ? (
              <li className="relative cursor-default select-none py-2 pl-3 pr-9 text-gray-500 italic text-center">
                {isLoading ? 'Searching...' : 'No options found.'}
              </li>
            ) : (
              filteredOptions.map((option, index) => {
                const isSelected = value?.id === option.id
                const isHighlighted = highlightedIndex === index

                return (
                  <li
                    key={option.id}
                    id={`option-${index}`}
                    className={`
                        relative cursor-pointer select-none py-2 pl-3 pr-9 transition-colors duration-150
                        ${isHighlighted ? 'bg-indigo-50 text-indigo-900' : 'text-gray-900'}
                    `}
                    onClick={() => handleSelect(option)}
                    onMouseEnter={() => setHighlightedIndex(index)}
                    role="option"
                    aria-selected={isSelected}
                  >
                    {renderOption ? renderOption(option, isSelected) : defaultRenderOption(option, isSelected)}

                    {isSelected && (
                      <span
                        className={`absolute inset-y-0 right-0 flex items-center pr-4 ${
                          isHighlighted ? 'text-indigo-600' : 'text-indigo-600'
                        }`}
                      >
                        <CheckIcon className="h-5 w-5" />
                      </span>
                    )}
                  </li>
                )
              })
            )}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Autocomplete
