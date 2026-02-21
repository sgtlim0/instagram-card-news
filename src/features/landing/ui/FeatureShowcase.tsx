import { Sparkles, Palette, LayoutGrid, Download } from 'lucide-react'

const features = [
  {
    icon: Sparkles,
    title: 'AI 자동 생성',
    description: '주제만 입력하면 AI가 구조를 계획하고 콘텐츠를 자동으로 생성합니다.',
  },
  {
    icon: Palette,
    title: '8가지 스타일',
    description: 'Clean부터 Blueprint까지, 다양한 분위기의 디자인 템플릿을 제공합니다.',
  },
  {
    icon: LayoutGrid,
    title: '14가지 레이아웃',
    description: '커버, 통계, 인용, 리스트, CTA 등 풍부한 슬라이드 타입을 지원합니다.',
  },
  {
    icon: Download,
    title: '즉시 내보내기',
    description: '완성된 카드뉴스를 PNG 또는 ZIP 파일로 바로 다운로드할 수 있습니다.',
  },
]

export function FeatureShowcase() {
  return (
    <section className="border-t border-border/50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-2xl font-bold sm:text-3xl">
            카드뉴스 제작, 이제 AI로
          </h2>
          <p className="text-muted-foreground">
            복잡한 디자인 도구 없이도 전문적인 결과물을 만들 수 있습니다.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="group rounded-2xl border border-border bg-card p-6 transition-colors hover:border-purple-300 dark:hover:border-purple-700"
              >
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-400">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mb-1.5 text-base font-semibold">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
