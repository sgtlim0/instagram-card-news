'use client'

import { useRef, useEffect } from 'react'
import { useEditorStore } from '@/shared/lib/store'
import { TEMPLATES } from '@/shared/config/templates'
import { SLIDE_TYPE_LABELS } from '@/shared/config/constants'
import { SlideCard } from '@/features/preview-card/ui/SlideCard'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, Smartphone } from 'lucide-react'

export function PreviewArea() {
  const slides = useEditorStore((state) => state.slides)
  const selectedIndex = useEditorStore((state) => state.selectedIndex)
  const style = useEditorStore((state) => state.style)
  const accountName = useEditorStore((state) => state.accountName)
  const setSelectedIndex = useEditorStore((state) => state.setSelectedIndex)

  const touchStartX = useRef(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const template = TEMPLATES[style]

  const handlePrevious = () => {
    if (selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1)
    }
  }

  const handleNext = () => {
    if (selectedIndex < slides.length - 1) {
      setSelectedIndex(selectedIndex + 1)
    }
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX
    const diff = touchStartX.current - touchEndX

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleNext()
      } else {
        handlePrevious()
      }
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrevious()
      } else if (e.key === 'ArrowRight') {
        handleNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedIndex, slides.length])

  if (slides.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gradient-radial from-zinc-900 via-zinc-950 to-black">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center">
              <Smartphone className="w-8 h-8 text-zinc-600" />
            </div>
          </div>
          <h2 className="text-xl font-semibold text-white">미리보기</h2>
          <p className="text-zinc-500 max-w-sm">
            주제를 입력하고 생성 버튼을 눌러주세요
          </p>
        </div>
      </div>
    )
  }

  const currentSlide = slides[selectedIndex]

  return (
    <div
      ref={containerRef}
      className="flex-1 flex flex-col items-center justify-center bg-gradient-radial from-zinc-900 via-zinc-950 to-black p-8"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="relative w-full max-w-[400px] aspect-[9/16] rounded-3xl overflow-hidden shadow-2xl">
        <SlideCard
          slide={currentSlide}
          template={template}
          index={selectedIndex}
          total={slides.length}
          account={accountName}
        />

        <Button
          size="icon"
          variant="ghost"
          onClick={handlePrevious}
          disabled={selectedIndex === 0}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full disabled:opacity-30"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        <Button
          size="icon"
          variant="ghost"
          onClick={handleNext}
          disabled={selectedIndex === slides.length - 1}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full disabled:opacity-30"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      <div className="mt-6 flex items-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setSelectedIndex(index)}
            className={`
              w-2 h-2 rounded-full transition-all
              ${selectedIndex === index
                ? 'bg-purple-500 w-6'
                : 'bg-zinc-700 hover:bg-zinc-600'
              }
            `}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <div className="mt-4 text-center">
        <p className="text-sm text-zinc-400">
          {SLIDE_TYPE_LABELS[currentSlide.type]} • {selectedIndex + 1} / {slides.length}
        </p>
      </div>
    </div>
  )
}
