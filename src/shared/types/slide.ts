export type TemplateStyle =
  | 'clean'
  | 'minimal'
  | 'bold'
  | 'elegant'
  | 'premium'
  | 'toss'
  | 'magazine'
  | 'blueprint'

export type SlideType =
  | 'cover'
  | 'content'
  | 'content-stat'
  | 'content-quote'
  | 'content-badge'
  | 'content-steps'
  | 'content-list'
  | 'content-split'
  | 'content-highlight'
  | 'content-image'
  | 'content-grid'
  | 'content-bigdata'
  | 'content-fullimage'
  | 'cta'

export interface TemplateConfig {
  readonly name: string
  readonly bg: string
  readonly text: string
  readonly accent: string
  readonly subtext: string
  readonly cardBg: string
  readonly font: string
  readonly headFont: string
}

export interface Slide {
  readonly id: string
  readonly type: SlideType
  readonly [key: string]: string | undefined
}

export interface SlideFieldSchema {
  readonly key: string
  readonly label: string
  readonly type: 'text' | 'textarea' | 'color'
  readonly placeholder?: string
}

export interface GenerateRequest {
  readonly topic: string
  readonly slideCount: number
  readonly style: TemplateStyle
}

export interface GenerateResponse {
  readonly slides: Slide[]
  readonly error?: string
}
