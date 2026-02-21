'use client'

import type { Slide, TemplateConfig } from '@/shared/types/slide'
import { getCardStyle } from '../shared/card-style'
import { AccentBar } from '../shared/AccentBar'
import { SlideFooter } from '../shared/SlideFooter'

interface ContentHighlightSlideProps {
  slide: Slide
  template: TemplateConfig
  index: number
  total: number
  account: string
}

export function ContentHighlightSlide({ slide, template, index, total, account }: ContentHighlightSlideProps) {
  const cardStyle = getCardStyle(template)

  return (
    <div style={cardStyle}>
      <AccentBar color={template.accent} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '32px', textAlign: 'center' }}>
        {slide.headline && (
          <div style={{ position: 'relative', display: 'inline-block', alignSelf: 'center' }}>
            <div
              style={{
                position: 'absolute',
                bottom: '8px',
                left: '-16px',
                right: '-16px',
                height: '24px',
                backgroundColor: template.accent,
                opacity: 0.3,
                zIndex: 0,
              }}
            />
            <h1
              style={{
                fontSize: '48px',
                fontWeight: 800,
                lineHeight: 1.2,
                fontFamily: template.headFont,
                margin: 0,
                position: 'relative',
                zIndex: 1,
              }}
            >
              {slide.headline}
            </h1>
          </div>
        )}

        {slide.body && (
          <p
            style={{
              fontSize: '18px',
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
