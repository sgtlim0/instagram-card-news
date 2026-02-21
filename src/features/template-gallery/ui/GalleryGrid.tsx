'use client'

import { useState, useMemo } from 'react'
import type { TemplateStyle, SlideType } from '@/shared/types/slide'
import { TEMPLATES } from '@/shared/config/templates'
import { SLIDE_TYPE_LABELS, ALL_SLIDE_TYPES } from '@/shared/config/constants'
import { SAMPLE_SLIDES, SAMPLE_CONTENT_SLIDES } from '../config/sample-data'
import { TemplateCard } from './TemplateCard'

const ALL_STYLES: TemplateStyle[] = [
  'clean',
  'minimal',
  'bold',
  'elegant',
  'premium',
  'toss',
  'magazine',
  'blueprint',
]

export function GalleryGrid() {
  const [selectedStyle, setSelectedStyle] = useState<TemplateStyle | 'all'>('all')
  const [selectedType, setSelectedType] = useState<SlideType | 'all'>('all')

  const galleryItems = useMemo(() => {
    const items: Array<{
      id: string
      style: TemplateStyle
      type: SlideType
    }> = []

    const styles = selectedStyle === 'all' ? ALL_STYLES : [selectedStyle]
    const types = selectedType === 'all' ? ALL_SLIDE_TYPES : [selectedType]

    for (const style of styles) {
      for (const type of types) {
        items.push({
          id: `${style}-${type}`,
          style,
          type,
        })
      }
    }

    return items
  }, [selectedStyle, selectedType])

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium mb-2">스타일</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedStyle('all')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                selectedStyle === 'all'
                  ? 'bg-accent text-white'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              전체
            </button>
            {ALL_STYLES.map((style) => (
              <button
                key={style}
                onClick={() => setSelectedStyle(style)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  selectedStyle === style
                    ? 'bg-accent text-white'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {TEMPLATES[style].name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">슬라이드 타입</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedType('all')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                selectedType === 'all'
                  ? 'bg-accent text-white'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              전체
            </button>
            {ALL_SLIDE_TYPES.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  selectedType === type
                    ? 'bg-accent text-white'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {SLIDE_TYPE_LABELS[type]}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryItems.map((item) => {
          const template = TEMPLATES[item.style]
          const slide =
            item.type === 'cover'
              ? SAMPLE_SLIDES[item.style]
              : SAMPLE_CONTENT_SLIDES[item.type] || SAMPLE_SLIDES[item.style]

          return (
            <TemplateCard
              key={item.id}
              style={item.style}
              template={template}
              slide={{ ...slide, type: item.type }}
            />
          )
        })}
      </div>

      {galleryItems.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          선택한 필터에 맞는 템플릿이 없습니다
        </div>
      )}
    </div>
  )
}
