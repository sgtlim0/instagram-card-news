'use client'

import type { Slide, TemplateConfig } from '@/shared/types/slide'
import { getCardStyle } from '../shared/card-style'
import { AccentBar } from '../shared/AccentBar'
import { SlideFooter } from '../shared/SlideFooter'

interface ContentStatSlideProps {
  slide: Slide
  template: TemplateConfig
  index: number
  total: number
  account: string
}

export function ContentStatSlide({ slide, template, index, total, account }: ContentStatSlideProps) {
  const cardStyle = getCardStyle(template)

  return (
    <div style={cardStyle}>
      <AccentBar color={template.accent} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '24px', textAlign: 'center' }}>
        {slide.headline && (
          <p
            style={{
              fontSize: '18px',
              color: template.subtext,
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '2px',
              margin: 0,
            }}
          >
            {slide.headline}
          </p>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              fontSize: '80px',
              fontWeight: 900,
              color: template.accent,
              fontFamily: template.headFont,
              lineHeight: 1,
            }}
          >
            {slide.emphasis || slide.bigdata_number}
          </div>

          {slide.bigdata_unit && (
            <span
              style={{
                fontSize: '24px',
                color: template.subtext,
                fontWeight: 600,
              }}
            >
              {slide.bigdata_unit}
            </span>
          )}
        </div>

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
            {slide.body}
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
