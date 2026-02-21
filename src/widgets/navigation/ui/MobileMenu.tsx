'use client'

import Link from 'next/link'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

interface MobileMenuProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  links: ReadonlyArray<{ href: string; label: string }>
  currentPath: string
}

export function MobileMenu({ open, onOpenChange, links, currentPath }: MobileMenuProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-72">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-purple-500">
              <span className="text-sm text-white font-bold">✦</span>
            </div>
            CardNews AI
          </SheetTitle>
        </SheetHeader>
        <nav className="mt-6 flex flex-col gap-1">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => onOpenChange(false)}
              className={`rounded-md px-3 py-2.5 text-sm font-medium transition-colors hover:bg-accent ${
                currentPath === href
                  ? 'bg-accent text-foreground'
                  : 'text-muted-foreground'
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
