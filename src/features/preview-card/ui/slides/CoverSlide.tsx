'use client'

import type { Slide, TemplateConfig } from '@/shared/types/slide'
import { getCardStyle } from '../shared/card-style'
import { AccentBar } from '../shared/AccentBar'
import { parseHighlight } from '../shared/HighlightText'

interface CoverSlideProps {
  slide: Slide
  template: TemplateConfig
  index: number
  total: number
  account: string
}

export function CoverSlide({ slide, template, index, total, account }: CoverSlideProps) {
  const cardStyle = getCardStyle(template)

  return (
    <div style={cardStyle}>
      <AccentBar color={template.accent} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '24px' }}>
        {slide.headline_label && (
          <div
            style={{
              display: 'inline-block',
              alignSelf: 'flex-start',
              padding: '8px 16px',
              backgroundColor: template.accent,
              color: '#000',
              fontSize: '14px',
              fontWeight: 700,
              borderRadius: '20px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
          >
            {slide.headline_label}
          </div>
        )}

        <h1
          style={{
            fontSize: '48px',
            fontWeight: 800,
            lineHeight: 1.2,
            fontFamily: template.headFont,
            margin: 0,
          }}
        >
          {slide.headline && parseHighlight(slide.headline, template.accent)}
        </h1>

        {slide.subtext && (
          <p
            style={{
              fontSize: '18px',
              color: template.subtext,
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            {slide.subtext}
          </p>
        )}
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '14px',
          color: template.subtext,
        }}
      >
        <span style={{ fontWeight: 500 }}>{account}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill={template.accent}>
            <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
          </svg>
          <span style={{ opacity: 0.7 }}>COVER</span>
        </div>
      </div>
    </div>
  )
}
