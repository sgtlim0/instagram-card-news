'use client'

import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { TopicInput } from '@/features/generate-card/ui/TopicInput'
import { TemplateSelector } from '@/features/generate-card/ui/TemplateSelector'
import { SlideListPanel } from '@/features/slide-editor/ui/SlideListPanel'
import { SlideEditor } from '@/features/slide-editor/ui/SlideEditor'

export function Sidebar() {
  return (
    <aside className="w-[320px] min-w-[280px] bg-zinc-900 border-r border-zinc-800 flex flex-col overflow-hidden">
      <ScrollArea className="flex-1">
        <div className="p-5 space-y-5">
          <TopicInput />
          <Separator className="bg-zinc-800" />
          <TemplateSelector />
          <Separator className="bg-zinc-800" />
          <SlideListPanel />
          <Separator className="bg-zinc-800" />
          <SlideEditor />
        </div>
      </ScrollArea>
    </aside>
  )
}
