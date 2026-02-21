import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export function CTASection() {
  return (
    <section className="border-t border-border/50 bg-muted/30 py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="mb-4 text-2xl font-bold sm:text-3xl">
          지금 바로 시작하세요
        </h2>
        <p className="mb-8 text-muted-foreground">
          가입 없이 바로 카드뉴스를 만들어보세요
        </p>
        <Link href="/create">
          <Button
            size="lg"
            className="group h-12 bg-purple-600 px-8 text-base text-white hover:bg-purple-700"
          >
            카드뉴스 만들기
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Button>
        </Link>
      </div>
    </section>
  )
}
