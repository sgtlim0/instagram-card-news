'use client'

import { useState } from 'react'
import { Download, Package } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { exportSingleSlide, exportAllSlides } from '@/shared/lib/export'

interface ExportPanelProps {
  currentSlideIndex: number
  totalSlides: number
  getSlideElement: (index: number) => HTMLElement | null
  getAllSlideElements: () => HTMLElement[]
}

export function ExportPanel({
  currentSlideIndex,
  totalSlides,
  getSlideElement,
  getAllSlideElements,
}: ExportPanelProps) {
  const [isExportingSingle, setIsExportingSingle] = useState(false)
  const [isExportingAll, setIsExportingAll] = useState(false)

  const handleExportCurrent = async () => {
    const element = getSlideElement(currentSlideIndex)
    if (!element) {
      alert('No slide element found')
      return
    }

    setIsExportingSingle(true)
    try {
      const filename = `card_slide_${String(currentSlideIndex + 1).padStart(2, '0')}.png`
      await exportSingleSlide(element, filename)
    } catch (error) {
      console.error('Export failed:', error)
      alert('Failed to export slide')
    } finally {
      setIsExportingSingle(false)
    }
  }

  const handleExportAll = async () => {
    const elements = getAllSlideElements()
    if (elements.length === 0) {
      alert('No slides found')
      return
    }

    setIsExportingAll(true)
    try {
      const timestamp = new Date().toISOString().split('T')[0].replace(/-/g, '')
      await exportAllSlides(elements, `card_news_${timestamp}`)
    } catch (error) {
      console.error('Export all failed:', error)
      alert('Failed to export slides')
    } finally {
      setIsExportingAll(false)
    }
  }

  return (
    <div className="flex flex-col gap-3 p-4 bg-zinc-900 border border-zinc-800 rounded-lg">
      <h3 className="text-sm font-semibold text-zinc-300">내보내기</h3>

      <div className="flex flex-col gap-2">
        <Button
          onClick={handleExportCurrent}
          disabled={isExportingSingle || totalSlides === 0}
          className="w-full bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700"
          size="sm"
        >
          {isExportingSingle ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              내보내는 중...
            </>
          ) : (
            <>
              <Download className="w-4 h-4 mr-2" />
              현재 슬라이드 내보내기 ({currentSlideIndex + 1}/{totalSlides})
            </>
          )}
        </Button>

        <Button
          onClick={handleExportAll}
          disabled={isExportingAll || totalSlides === 0}
          className="w-full bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700"
          size="sm"
        >
          {isExportingAll ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              내보내는 중...
            </>
          ) : (
            <>
              <Package className="w-4 h-4 mr-2" />
              전체 슬라이드 내보내기 (ZIP)
            </>
          )}
        </Button>
      </div>

      {totalSlides === 0 && (
        <p className="text-xs text-zinc-500 text-center">
          먼저 슬라이드를 생성하세요
        </p>
      )}
    </div>
  )
}
