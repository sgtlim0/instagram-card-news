import { TEMPLATES } from '@/shared/config/templates'
import type { TemplateStyle } from '@/shared/types/slide'
import { useChatCreateStore } from '../model/store'

export function StyleSelector() {
  const selectedStyle = useChatCreateStore((state) => state.selectedStyle)
  const setStyle = useChatCreateStore((state) => state.setStyle)

  const styles: TemplateStyle[] = [
    'clean',
    'minimal',
    'bold',
    'elegant',
    'premium',
    'toss',
    'magazine',
    'blueprint',
  ]

  return (
    <div className="space-y-3">
      <h4 className="text-sm font-semibold text-foreground">스타일 선택</h4>
      <div className="grid grid-cols-4 gap-3">
        {styles.map((style) => {
          const template = TEMPLATES[style]
          const isSelected = selectedStyle === style

          const accentColor =
            template.accent.startsWith('linear-gradient')
              ? '#C084FC'
              : template.accent

          return (
            <button
              key={style}
              onClick={() => setStyle(style)}
              className={`
                flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all
                ${isSelected
                  ? 'border-purple-600 bg-purple-50 dark:bg-purple-950/20'
                  : 'border-border hover:border-purple-300 dark:hover:border-purple-700'
                }
              `}
            >
              <div
                className="w-8 h-8 rounded-full"
                style={{ backgroundColor: accentColor }}
              />
              <span className="text-xs font-medium text-foreground">
                {template.name}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
