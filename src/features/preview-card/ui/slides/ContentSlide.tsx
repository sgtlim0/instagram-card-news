'use client'

import type { Slide, TemplateConfig } from '@/shared/types/slide'
import { getCardStyle } from '../shared/card-style'
import { AccentBar } from '../shared/AccentBar'
import { SlideFooter } from '../shared/SlideFooter'
import { parseHighlight } from '../shared/HighlightText'

interface ContentSlideProps {
  slide: Slide
  template: TemplateConfig
  index: number
  total: number
  account: string
}

export function ContentSlide({ slide, template, index, total, account }: ContentSlideProps) {
  const cardStyle = getCardStyle(template)

  return (
    <div style={cardStyle}>
      <AccentBar color={template.accent} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px', paddingTop: '16px' }}>
        {slide.badge_text && (
          <div
            style={{
              display: 'inline-block',
              alignSelf: 'flex-start',
              padding: '6px 12px',
              backgroundColor: template.accent,
              color: '#000',
              fontSize: '12px',
              fontWeight: 700,
              borderRadius: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            {slide.badge_text}
          </div>
        )}

        {slide.headline && (
          <h2
            style={{
              fontSize: '32px',
              fontWeight: 700,
              lineHeight: 1.3,
              fontFamily: template.headFont,
              margin: 0,
            }}
          >
            {parseHighlight(slide.headline, template.accent)}
          </h2>
        )}

        {slide.emphasis && (
          <div
            style={{
              padding: '16px',
              backgroundColor: `${template.accent}22`,
              borderLeft: `4px solid ${template.accent}`,
              borderRadius: '8px',
              fontSize: '18px',
              fontWeight: 600,
              color: template.text,
            }}
          >
            {slide.emphasis}
          </div>
        )}

        {slide.body && (
          <p
            style={{
              fontSize: '16px',
              lineHeight: 1.7,
              color: template.text,
              margin: 0,
              opacity: 0.9,
            }}
          >
            {parseHighlight(slide.body, template.accent)}
          </p>
        )}
      </div>

      <SlideFooter
        account={account}
        index={index}
        total={total}
        subtextColor={template.subtext}
        font={template.font}
      />
    </div>
  )
}
