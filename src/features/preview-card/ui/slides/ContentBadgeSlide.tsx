'use client'

import type { Slide, TemplateConfig } from '@/shared/types/slide'
import { ContentSlide } from './ContentSlide'

interface ContentBadgeSlideProps {
  slide: Slide
  template: TemplateConfig
  index: number
  total: number
  account: string
}

export function ContentBadgeSlide(props: ContentBadgeSlideProps) {
  return <ContentSlide {...props} />
}
