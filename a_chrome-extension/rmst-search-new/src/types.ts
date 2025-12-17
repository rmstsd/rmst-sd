export enum SearchPriority {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  TERTIARY = 'tertiary'
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
