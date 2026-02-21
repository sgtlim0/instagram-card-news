'use client'

import Link from 'next/link'
import type { Slide, TemplateConfig, TemplateStyle, SlideType } from '@/shared/types/slide'
import { SLIDE_TYPE_LABELS } from '@/shared/config/constants'
import { SlideCard } from '@/features/preview-card/ui/SlideCard'

interface TemplateCardProps {
  readonly style: TemplateStyle
  readonly template: TemplateConfig
  readonly slide: Slide
}

export function TemplateCard({ style, template, slide }: TemplateCardProps) {
  const slideTypeLabel = SLIDE_TYPE_LABELS[slide.type as SlideType]

  return (
    <div className="group flex flex-col gap-3">
      <Link
        href={`/create?style=${style}`}
        className="block relative overflow-hidden rounded-lg border border-border hover:border-accent transition-colors"
      >
        <div className="aspect-[4/5] relative">
          <div className="absolute inset-0 scale-[0.85] origin-center">
            <SlideCard
              slide={slide}
              template={template}
              index={1}
              total={1}
              account="@sample"
            />
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform">
          <button className="w-full px-4 py-2 bg-accent text-white rounded-md font-medium hover:bg-accent/90 transition-colors">
            사용하기
          </button>
        </div>
      </Link>

      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-sm">{template.name}</h3>
          <span className="text-xs px-2 py-1 rounded-md bg-muted text-muted-foreground">
            {slideTypeLabel}
          </span>
        </div>
      </div>
    </div>
  )
}
