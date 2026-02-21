'use client'

import type { Slide, TemplateConfig, SlideType } from '@/shared/types/slide'
import { CoverSlide } from './slides/CoverSlide'
import { ContentSlide } from './slides/ContentSlide'
import { ContentStatSlide } from './slides/ContentStatSlide'
import { ContentQuoteSlide } from './slides/ContentQuoteSlide'
import { ContentListSlide } from './slides/ContentListSlide'
import { ContentStepsSlide } from './slides/ContentStepsSlide'
import { ContentSplitSlide } from './slides/ContentSplitSlide'
import { ContentGridSlide } from './slides/ContentGridSlide'
import { ContentHighlightSlide } from './slides/ContentHighlightSlide'
import { ContentBigdataSlide } from './slides/ContentBigdataSlide'
import { ContentBadgeSlide } from './slides/ContentBadgeSlide'
import { ContentImageSlide } from './slides/ContentImageSlide'
import { ContentFullimageSlide } from './slides/ContentFullimageSlide'
import { CtaSlide } from './slides/CtaSlide'

interface SlideCardProps {
  slide: Slide
  template: TemplateConfig
  index: number
  total: number
  account: string
}

const SLIDE_COMPONENTS: Record<SlideType, React.ComponentType<SlideCardProps>> = {
  cover: CoverSlide,
  content: ContentSlide,
  'content-stat': ContentStatSlide,
  'content-quote': ContentQuoteSlide,
  'content-badge': ContentBadgeSlide,
  'content-steps': ContentStepsSlide,
  'content-list': ContentListSlide,
  'content-split': ContentSplitSlide,
  'content-highlight': ContentHighlightSlide,
  'content-image': ContentImageSlide,
  'content-grid': ContentGridSlide,
  'content-bigdata': ContentBigdataSlide,
  'content-fullimage': ContentFullimageSlide,
  cta: CtaSlide,
}

export function SlideCard({ slide, template, index, total, account }: SlideCardProps) {
  const SlideComponent = SLIDE_COMPONENTS[slide.type]

  if (!SlideComponent) {
    return (
      <div
        style={{
          width: '100%',
          aspectRatio: '4/5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f0f0f0',
          borderRadius: '16px',
          color: '#666',
        }}
      >
        Unknown slide type: {slide.type}
      </div>
    )
  }

  return <SlideComponent slide={slide} template={template} index={index} total={total} account={account} />
}
