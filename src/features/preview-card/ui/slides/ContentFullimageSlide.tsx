'use client'

import type { Slide, TemplateConfig } from '@/shared/types/slide'
import { getCardStyle } from '../shared/card-style'
import { AccentBar } from '../shared/AccentBar'
import { SlideFooter } from '../shared/SlideFooter'

interface ContentFullimageSlideProps {
  slide: Slide
  template: TemplateConfig
  index: number
  total: number
  account: string
}

export function ContentFullimageSlide({ slide, template, index, total, account }: ContentFullimageSlideProps) {
  const cardStyle = {
    ...getCardStyle(template),
    padding: 0,
  }

  return (
    <div style={cardStyle}>
      <AccentBar color={template.accent} />

      <div
        style={{
          flex: 1,
          background: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7)), ${template.accent}22`,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '32px',
        }}
      >
        {slide.headline && (
          <h1
            style={{
              fontSize: '48px',
              fontWeight: 800,
              lineHeight: 1.2,
              fontFamily: template.headFont,
              color: '#FFFFFF',
              margin: 0,
              textShadow: '0 2px 20px rgba(0,0,0,0.5)',
            }}
          >
            {slide.headline}
          </h1>
        )}
      </div>

      <div style={{ padding: '32px', paddingTop: '16px' }}>
        <SlideFooter
          account={account}
          index={index}
          total={total}
          subtextColor={template.subtext}
          font={template.font}
        />
      </div>
    </div>
  )
}
