'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { ThemeToggle } from '@/widgets/theme-provider/ui/ThemeToggle'

export function AppHeader() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-purple-500">
              <span className="text-sm text-white font-bold">✦</span>
            </div>
            <div className="flex flex-col">
              <h1 className="text-sm font-bold leading-tight">
                CardNews AI
              </h1>
              <p className="text-xs text-muted-foreground leading-tight">
                AI 카드뉴스 메이커
              </p>
            </div>
          </Link>
        </div>
        <ThemeToggle />
      </div>
    </header>
  )
}
