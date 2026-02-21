'use client'

import type { Slide, TemplateConfig } from '@/shared/types/slide'
import { getCardStyle } from '../shared/card-style'
import { AccentBar } from '../shared/AccentBar'
import { SlideFooter } from '../shared/SlideFooter'

interface ContentSplitSlideProps {
  slide: Slide
  template: TemplateConfig
  index: number
  total: number
  account: string
}

export function ContentSplitSlide({ slide, template, index, total, account }: ContentSplitSlideProps) {
  const cardStyle = getCardStyle(template)

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
            gap: '20px',
            flex: 1,
          }}
        >
          <div
            style={{
              padding: '20px',
              backgroundColor: `${template.accent}11`,
              borderRadius: '12px',
              border: `2px solid ${template.accent}33`,
            }}
          >
            {slide.left_title && (
              <h3
                style={{
                  fontSize: '18px',
                  fontWeight: 700,
                  color: template.accent,
                  marginBottom: '12px',
                }}
              >
                {slide.left_title}
              </h3>
            )}
            {slide.left_body && (
              <p
                style={{
                  fontSize: '14px',
                  lineHeight: 1.6,
                  color: template.text,
                  margin: 0,
                }}
              >
                {slide.left_body}
              </p>
            )}
          </div>

          <div
            style={{
              padding: '20px',
              backgroundColor: `${template.accent}11`,
              borderRadius: '12px',
              border: `2px solid ${template.accent}33`,
            }}
          >
            {slide.right_title && (
              <h3
                style={{
                  fontSize: '18px',
                  fontWeight: 700,
                  color: template.accent,
                  marginBottom: '12px',
                }}
              >
                {slide.right_title}
              </h3>
            )}
            {slide.right_body && (
              <p
                style={{
                  fontSize: '14px',
                  lineHeight: 1.6,
                  color: template.text,
                  margin: 0,
                }}
              >
                {slide.right_body}
              </p>
            )}
          </div>
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
