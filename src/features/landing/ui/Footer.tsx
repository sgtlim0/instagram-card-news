import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-gradient-to-br from-purple-600 to-purple-500">
              <span className="text-xs text-white font-bold">✦</span>
            </div>
            <span className="text-sm font-semibold">CardNews AI</span>
          </div>
          <nav className="flex gap-6 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
              홈
            </Link>
            <Link href="/templates" className="hover:text-foreground transition-colors">
              템플릿
            </Link>
            <Link href="/create" className="hover:text-foreground transition-colors">
              만들기
            </Link>
          </nav>
          <p className="text-xs text-muted-foreground">
            © 2025 CardNews AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
