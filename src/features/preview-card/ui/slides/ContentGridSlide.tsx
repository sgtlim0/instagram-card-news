'use client'

import type { Slide, TemplateConfig } from '@/shared/types/slide'
import { getCardStyle } from '../shared/card-style'
import { AccentBar } from '../shared/AccentBar'
import { SlideFooter } from '../shared/SlideFooter'

interface ContentGridSlideProps {
  slide: Slide
  template: TemplateConfig
  index: number
  total: number
  account: string
}

export function ContentGridSlide({ slide, template, index, total, account }: ContentGridSlideProps) {
  const cardStyle = getCardStyle(template)

  const items = [slide.item1, slide.item2, slide.item3, slide.item4].filter(Boolean)

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

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
            flex: 1,
          }}
        >
          {items.map((item, idx) => (
            <div
              key={idx}
              style={{
                padding: '20px',
                backgroundColor: `${template.accent}11`,
                borderRadius: '12px',
                border: `2px solid ${template.accent}33`,
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  backgroundColor: template.accent,
                  color: '#000',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px',
                  fontWeight: 700,
                }}
              >
                {idx + 1}
              </div>
              <p
                style={{
                  fontSize: '14px',
                  lineHeight: 1.5,
                  color: template.text,
                  margin: 0,
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
