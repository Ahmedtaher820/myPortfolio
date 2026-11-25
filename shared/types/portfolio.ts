export type EmploymentType = 'full-time' | 'part-time'

export interface ExperienceItem {
  id: string
  company: string
  title: string
  period: string
  location: string
  arrangement: string
  type: EmploymentType
  product?: string
  bullets: string[]
  tech: string[]
}

export interface ProjectItem {
  id: string
  slug: string
  number: string
  name: string
  company: string
  industry: string
  description: string
  role: string
  contributions: string[]
  tech: string[]
  cover: string
  images: string[]
  liveUrl?: string
  featured?: boolean
  moreWork?: boolean
}

export interface SkillGroup {
  title: string
  items: string[]
}

export interface HighlightItem {
  label: string
  value: string
}
