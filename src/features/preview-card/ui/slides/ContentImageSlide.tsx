'use client'

import type { Slide, TemplateConfig } from '@/shared/types/slide'
import { getCardStyle } from '../shared/card-style'
import { AccentBar } from '../shared/AccentBar'
import { SlideFooter } from '../shared/SlideFooter'

interface ContentImageSlideProps {
  slide: Slide
  template: TemplateConfig
  index: number
  total: number
  account: string
}

export function ContentImageSlide({ slide, template, index, total, account }: ContentImageSlideProps) {
  const cardStyle = getCardStyle(template)

  return (
    <div style={cardStyle}>
      <AccentBar color={template.accent} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px', paddingTop: '16px' }}>
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
            {slide.headline}
          </h2>
        )}

        <div
          style={{
            flex: 1,
            backgroundColor: `${template.accent}11`,
            borderRadius: '12px',
            border: `2px dashed ${template.accent}33`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: template.subtext,
            fontSize: '14px',
            fontWeight: 500,
          }}
        >
          Image Placeholder
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
