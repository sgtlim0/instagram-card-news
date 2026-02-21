'use client'

import type { Slide, TemplateConfig } from '@/shared/types/slide'
import { getCardStyle } from '../shared/card-style'
import { AccentBar } from '../shared/AccentBar'
import { SlideFooter } from '../shared/SlideFooter'

interface CtaSlideProps {
  slide: Slide
  template: TemplateConfig
  index: number
  total: number
  account: string
}

export function CtaSlide({ slide, template, index, total, account }: CtaSlideProps) {
  const cardStyle = getCardStyle(template)

  const tags = [slide.tag1, slide.tag2, slide.tag3].filter(Boolean)

  return (
    <div style={cardStyle}>
      <AccentBar color={template.accent} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '32px', textAlign: 'center' }}>
        <div style={{ fontSize: '48px' }}>✨</div>

        {slide.headline && (
          <h2
            style={{
              fontSize: '40px',
              fontWeight: 800,
              lineHeight: 1.2,
              fontFamily: template.headFont,
              margin: 0,
            }}
          >
            {slide.headline}
          </h2>
        )}

        {slide.cta_text && (
          <button
            style={{
              padding: '16px 40px',
              backgroundColor: template.accent,
              color: '#000',
              fontSize: '18px',
              fontWeight: 700,
              borderRadius: '30px',
              border: 'none',
              cursor: 'pointer',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              boxShadow: `0 8px 24px ${template.accent}44`,
            }}
          >
            {slide.cta_text}
          </button>
        )}

        {tags.length > 0 && (
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {tags.map((tag, idx) => (
              <span
                key={idx}
                style={{
                  fontSize: '14px',
                  color: template.subtext,
                  fontWeight: 500,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
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
