'use client'

import type { Slide, TemplateConfig } from '@/shared/types/slide'
import { ContentStatSlide } from './ContentStatSlide'

interface ContentBigdataSlideProps {
  slide: Slide
  template: TemplateConfig
  index: number
  total: number
  account: string
}

export function ContentBigdataSlide(props: ContentBigdataSlideProps) {
  return <ContentStatSlide {...props} />
}
