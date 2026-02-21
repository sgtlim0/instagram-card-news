'use client'

import { Suspense, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { ChatInterface } from '@/features/chat-create/ui/ChatInterface'
import { useChatCreateStore } from '@/features/chat-create/model/store'
import { Navbar } from '@/widgets/navigation/ui/Navbar'
import type { TemplateStyle } from '@/shared/types/slide'

function CreatePageContent() {
  const searchParams = useSearchParams()
  const setStyle = useChatCreateStore((state) => state.setStyle)

  useEffect(() => {
    const styleParam = searchParams.get('style')
    if (styleParam) {
      const validStyles: TemplateStyle[] = [
        'clean',
        'minimal',
        'bold',
        'elegant',
        'premium',
        'toss',
        'magazine',
        'blueprint',
      ]
      if (validStyles.includes(styleParam as TemplateStyle)) {
        setStyle(styleParam as TemplateStyle)
      }
    }
  }, [searchParams, setStyle])

  return <ChatInterface />
}

export default function CreatePage() {
  return (
    <div className="flex h-screen flex-col bg-background text-foreground">
      <Navbar />
      <div className="flex-1 overflow-hidden">
        <Suspense fallback={<div className="flex items-center justify-center h-full">로딩 중...</div>}>
          <CreatePageContent />
        </Suspense>
      </div>
    </div>
  )
}
