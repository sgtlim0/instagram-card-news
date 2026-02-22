'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, LogOut } from 'lucide-react'
import { useSession, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/widgets/theme-provider/ui/ThemeToggle'
import { MobileMenu } from './MobileMenu'

const NAV_LINKS = [
  { href: '/', label: '홈' },
  { href: '/templates', label: '템플릿' },
  { href: '/create', label: '만들기' },
] as const

export function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const { data: session } = useSession()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-purple-500">
            <span className="text-sm text-white font-bold">✦</span>
          </div>
          <span className="text-lg font-bold">CardNews AI</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent ${
                pathname === href
                  ? 'text-foreground'
                  : 'text-muted-foreground'
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {session?.user ? (
            <>
              <span className="hidden text-sm text-muted-foreground md:inline">
                {session.user.name}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => signOut({ callbackUrl: '/' })}
                title="로그아웃"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login">로그인</Link>
            </Button>
          )}
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <MobileMenu
        open={mobileOpen}
        onOpenChange={setMobileOpen}
        links={NAV_LINKS}
        currentPath={pathname}
      />
    </header>
  )
}
