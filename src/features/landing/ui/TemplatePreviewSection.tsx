import Link from 'next/link'
import { TEMPLATES } from '@/shared/config/templates'
import type { TemplateStyle } from '@/shared/types/slide'

export function TemplatePreviewSection() {
  const templateEntries = Object.entries(TEMPLATES) as [TemplateStyle, typeof TEMPLATES[TemplateStyle]][]

  return (
    <section className="border-t border-border/50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-2xl font-bold sm:text-3xl">
            8가지 스타일
          </h2>
          <p className="text-muted-foreground">
            프로젝트에 맞는 스타일을 선택하세요
          </p>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {templateEntries.map(([key, template]) => (
            <Link
              key={key}
              href={`/create?style=${key}`}
              className="flex-shrink-0 snap-start group"
            >
              <div className="w-44 sm:w-52">
                <div
                  className="aspect-[4/5] rounded-2xl border border-border/50 shadow-sm transition-all duration-200 group-hover:-translate-y-1 group-hover:shadow-md"
                  style={{ background: template.bg }}
                >
                  <div className="flex h-full flex-col items-center justify-center p-6 text-center">
                    <div
                      className="mb-3 text-3xl font-bold"
                      style={{ color: template.text }}
                    >
                      Aa
                    </div>
                    <div
                      className="mb-3 h-0.5 w-12 rounded-full"
                      style={{ backgroundColor: template.accent }}
                    />
                    <div
                      className="text-xs"
                      style={{ color: template.subtext }}
                    >
                      {template.name}
                    </div>
                  </div>
                </div>
                <p className="mt-2.5 text-center text-sm font-medium">
                  {template.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
