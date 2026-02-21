import { MessageSquare, Brain, Wand2, Download } from 'lucide-react'

const steps = [
  {
    icon: MessageSquare,
    title: '주제 입력',
    description: '만들고 싶은 카드뉴스의 주제를 입력하세요',
  },
  {
    icon: Brain,
    title: 'AI 구조 계획',
    description: 'AI가 최적의 슬라이드 구조를 설계합니다',
  },
  {
    icon: Wand2,
    title: '콘텐츠 생성',
    description: '각 슬라이드의 내용을 자동으로 채워넣습니다',
  },
  {
    icon: Download,
    title: '내보내기',
    description: 'PNG 또는 ZIP 파일로 바로 다운로드하세요',
  },
]

export function HowItWorks() {
  return (
    <section className="border-t border-border/50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-2xl font-bold sm:text-3xl">
            4단계로 완성
          </h2>
          <p className="text-muted-foreground">
            복잡한 과정 없이 빠르고 간단하게
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={step.title} className="relative text-center">
                {/* Connector line (desktop) */}
                {index < steps.length - 1 && (
                  <div className="absolute left-[calc(50%+28px)] top-6 hidden h-px w-[calc(100%-56px)] bg-border lg:block" />
                )}

                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-purple-600 text-sm font-bold text-white">
                  {index + 1}
                </div>
                <div className="mb-3 flex justify-center">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
                <h3 className="mb-1 text-base font-semibold">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
