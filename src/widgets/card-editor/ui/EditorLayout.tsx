'use client'

import { useState } from 'react'
import { Settings2 } from 'lucide-react'
import { Sidebar } from './Sidebar'
import { PreviewArea } from '@/features/preview-card/ui/PreviewArea'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

export function EditorLayout() {
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  return (
    <>
      {/* Desktop layout: side by side */}
      <div className="hidden md:flex h-[calc(100vh-57px)]">
        <Sidebar />
        <PreviewArea />
      </div>

      {/* Mobile layout: Preview full width + floating button */}
      <div className="md:hidden h-[calc(100dvh-57px)] relative">
        <PreviewArea />

        <Button
          size="icon"
          onClick={() => setIsSheetOpen(true)}
          className="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full bg-purple-600 hover:bg-purple-700 shadow-lg"
        >
          <Settings2 className="h-6 w-6 text-white" />
        </Button>

        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetContent side="left" className="w-[85vw] max-w-[400px] p-0">
            <SheetHeader className="px-5 pt-5 pb-2">
              <SheetTitle>편집</SheetTitle>
            </SheetHeader>
            <div className="h-[calc(100vh-80px)] overflow-hidden">
              <Sidebar />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}
