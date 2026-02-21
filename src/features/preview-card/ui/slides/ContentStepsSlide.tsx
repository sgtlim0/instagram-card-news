'use client'

import type { Slide, TemplateConfig } from '@/shared/types/slide'
import { getCardStyle } from '../shared/card-style'
import { AccentBar } from '../shared/AccentBar'
import { SlideFooter } from '../shared/SlideFooter'

interface ContentStepsSlideProps {
  slide: Slide
  template: TemplateConfig
  index: number
  total: number
  account: string
}

export function ContentStepsSlide({ slide, template, index, total, account }: ContentStepsSlideProps) {
  const cardStyle = getCardStyle(template)

  const steps = [slide.step1, slide.step2, slide.step3].filter(Boolean)

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

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative' }}>
          {steps.map((step, idx) => (
            <div key={idx} style={{ position: 'relative', display: 'flex', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    backgroundColor: template.accent,
                    color: '#000',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {idx + 1}
                </div>
                {idx < steps.length - 1 && (
                  <div
                    style={{
                      width: '2px',
                      height: '40px',
                      backgroundColor: template.accent,
                      opacity: 0.3,
                    }}
                  />
                )}
              </div>

              <div style={{ flex: 1, paddingTop: '8px' }}>
                <p
                  style={{
                    fontSize: '16px',
                    lineHeight: 1.6,
                    color: template.text,
                    margin: 0,
                  }}
                >
                  {step}
                </p>
              </div>
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
