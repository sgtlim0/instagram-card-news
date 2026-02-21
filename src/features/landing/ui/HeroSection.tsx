import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-50 via-white to-white dark:from-purple-950/40 dark:via-background dark:to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.15),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.1),transparent_60%)]" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-4 py-1.5 text-sm text-purple-700 dark:border-purple-800 dark:bg-purple-950/50 dark:text-purple-300">
          <Sparkles className="h-3.5 w-3.5" />
          AI 기반 카드뉴스 메이커
        </div>

        <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          AI로 카드뉴스를
          <br />
          <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent dark:from-purple-400 dark:to-indigo-400">
            쉽고 빠르게
          </span>
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground sm:text-xl">
          주제만 입력하면 AI가 전문적인 카드뉴스를 자동으로 생성합니다.
          <br className="hidden sm:block" />
          8가지 스타일, 14가지 레이아웃으로 나만의 콘텐츠를 만들어보세요.
        </p>

        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link href="/create">
            <Button
              size="lg"
              className="group h-12 bg-purple-600 px-8 text-base text-white hover:bg-purple-700"
            >
              카드뉴스 만들기
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </Link>
          <Link href="/templates">
            <Button variant="outline" size="lg" className="h-12 px-8 text-base">
              템플릿 둘러보기
            </Button>
          </Link>
        </div>

        {/* Sample cards preview */}
        <div className="mt-16 flex justify-center gap-3 sm:gap-4">
          {['#8BC34A', '#2D63E2', '#C084FC', '#D4AF37', '#E8B4B8'].map((color, i) => (
            <div
              key={color}
              className="aspect-[4/5] w-20 rounded-xl border border-border/50 bg-card shadow-sm transition-transform hover:-translate-y-1 sm:w-28 sm:rounded-2xl"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="flex h-full flex-col items-center justify-center gap-2 p-3">
                <div
                  className="h-1 w-8 rounded-full sm:w-12"
                  style={{ backgroundColor: color }}
                />
                <div className="h-1.5 w-12 rounded-full bg-muted sm:w-16" />
                <div className="h-1 w-10 rounded-full bg-muted sm:w-14" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
