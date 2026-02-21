'use client'

import type { Slide, TemplateConfig } from '@/shared/types/slide'
import { getCardStyle } from '../shared/card-style'
import { AccentBar } from '../shared/AccentBar'
import { SlideFooter } from '../shared/SlideFooter'

interface ContentQuoteSlideProps {
  slide: Slide
  template: TemplateConfig
  index: number
  total: number
  account: string
}

export function ContentQuoteSlide({ slide, template, index, total, account }: ContentQuoteSlideProps) {
  const cardStyle = getCardStyle(template)

  return (
    <div style={cardStyle}>
      <AccentBar color={template.accent} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '32px' }}>
        <div
          style={{
            fontSize: '120px',
            color: template.accent,
            lineHeight: 0.5,
            fontFamily: 'Georgia, serif',
            opacity: 0.3,
          }}
        >
          "
        </div>

        {slide.body && (
          <p
            style={{
              fontSize: '24px',
              lineHeight: 1.6,
              fontStyle: 'italic',
              color: template.text,
              margin: 0,
              fontFamily: template.headFont,
            }}
          >
            {slide.body}
          </p>
        )}

        {slide.headline && (
          <p
            style={{
              fontSize: '16px',
              color: template.subtext,
              fontWeight: 600,
              margin: 0,
              textAlign: 'right',
            }}
          >
            — {slide.headline}
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
