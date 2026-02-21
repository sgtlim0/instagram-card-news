'use client'

import { useEditorStore } from '@/shared/lib/store'
import { TEMPLATES } from '@/shared/config/templates'
import type { TemplateStyle } from '@/shared/types/slide'
import { Button } from '@/components/ui/button'

export function TemplateSelector() {
  const style = useEditorStore((state) => state.style)
  const setStyle = useEditorStore((state) => state.setStyle)

  const templateEntries = Object.entries(TEMPLATES) as [TemplateStyle, typeof TEMPLATES[TemplateStyle]][]

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-white">스타일</h3>
      <div className="grid grid-cols-2 gap-2">
        {templateEntries.map(([key, config]) => {
          const isSelected = style === key
          const accentColor = config.accent

          return (
            <Button
              key={key}
              onClick={() => setStyle(key)}
              variant="outline"
              className={`
                flex items-center gap-2 justify-start px-3 py-2 h-auto
                border transition-all
                ${isSelected
                  ? 'border-purple-500 bg-purple-500/10 text-white'
                  : 'border-zinc-700 bg-zinc-800/50 text-zinc-300 hover:bg-zinc-800 hover:text-white'
                }
              `}
            >
              <div
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: accentColor }}
              />
              <span className="text-sm font-medium">{config.name}</span>
            </Button>
          )
        })}
      </div>
    </div>
  )
}
