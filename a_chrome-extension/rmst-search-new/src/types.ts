export enum SearchPriority {
  Primary = 'primary',
  Secondary = 'secondary',
  Tertiary = 'tertiary'
}

export interface SearchEngineItem {
  id: string
  name: string
  searchLink: string
  homeLink?: string
  logoSeed: number
  priority: SearchPriority
  color?: string
  icon?: React.ReactNode
}
