import type { TemplateConfig } from '@/shared/types/slide'

export function getCardStyle(template: TemplateConfig): React.CSSProperties {
  return {
    width: '100%',
    aspectRatio: '4/5',
    background: template.bg.includes('gradient') ? template.bg : template.cardBg,
    borderRadius: '16px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '32px',
    position: 'relative',
    overflow: 'hidden',
    boxSizing: 'border-box',
    fontFamily: template.font,
    color: template.text,
    border: `1px solid ${template.accent}22`,
    boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
  }
}
