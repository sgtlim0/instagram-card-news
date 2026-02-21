'use client'

import type { Slide, TemplateConfig } from '@/shared/types/slide'
import { getCardStyle } from '../shared/card-style'
import { AccentBar } from '../shared/AccentBar'
import { SlideFooter } from '../shared/SlideFooter'

interface ContentListSlideProps {
  slide: Slide
  template: TemplateConfig
  index: number
  total: number
  account: string
}

export function ContentListSlide({ slide, template, index, total, account }: ContentListSlideProps) {
  const cardStyle = getCardStyle(template)

  const items = [slide.item1, slide.item2, slide.item3, slide.item4, slide.item5].filter(Boolean)

  return (
    <div style={cardStyle}>
      <AccentBar color={template.accent} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px', paddingTop: '16px' }}>
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

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {items.map((item, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                gap: '16px',
                alignItems: 'flex-start',
              }}
            >
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: template.accent,
                  color: '#000',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px',
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                {idx + 1}
              </div>
              <p
                style={{
                  fontSize: '16px',
                  lineHeight: 1.6,
                  color: template.text,
                  margin: 0,
                  flex: 1,
                }}
              >
                {item}
              </p>
            </div>
          ))}
        </div>
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
