import React from 'react'

export interface Option {
  id: string | number
  label: string
  [key: string]: any // Allow other properties
}

export interface AutocompleteProps<T extends Option> {
  options: T[]
  value?: T | null
  onChange: (value: T | null) => void
  label?: string
  placeholder?: string
  isLoading?: boolean
  disabled?: boolean
  className?: string
  /** Custom render function for the dropdown item */
  renderOption?: (option: T, isSelected: boolean) => React.ReactNode
  /** Function to filter options locally. If not provided, basic label matching is used. Pass null to disable local filtering (server-side search). */
  filterOptions?: ((options: T[], inputValue: string) => T[]) | null
  /** Callback when input text changes (useful for server-side search) */
  onInputChange?: (value: string) => void
  error?: string
}
