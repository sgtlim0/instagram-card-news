'use client'

import { useState } from 'react'
import { useEditorStore } from '@/shared/lib/store'
import { SLIDE_ICONS, SLIDE_TYPE_LABELS, ALL_SLIDE_TYPES } from '@/shared/config/constants'
import type { SlideType } from '@/shared/types/slide'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ChevronUp, ChevronDown, Trash2, Plus } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function SlideListPanel() {
  const slides = useEditorStore((state) => state.slides)
  const selectedIndex = useEditorStore((state) => state.selectedIndex)
  const setSelectedIndex = useEditorStore((state) => state.setSelectedIndex)
  const moveSlide = useEditorStore((state) => state.moveSlide)
  const removeSlide = useEditorStore((state) => state.removeSlide)
  const addSlide = useEditorStore((state) => state.addSlide)

  const [showAddDropdown, setShowAddDropdown] = useState(false)

  const handleAddSlide = (type: SlideType) => {
    addSlide(type)
    setShowAddDropdown(false)
  }

  if (slides.length === 0) {
    return (
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-white">슬라이드 목록</h3>
        <p className="text-sm text-zinc-500">생성하려면 주제를 입력하고 생성 버튼을 눌러주세요</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-white">슬라이드 목록</h3>

      <ScrollArea className="h-[300px] rounded-md border border-zinc-800">
        <div className="space-y-1 p-2">
          {slides.map((slide, index) => {
            const isSelected = selectedIndex === index
            const icon = SLIDE_ICONS[slide.type]
            const label = SLIDE_TYPE_LABELS[slide.type]

            return (
              <div
                key={slide.id}
                className={`
                  flex items-center gap-2 p-2 rounded-md transition-colors cursor-pointer
                  ${isSelected
                    ? 'bg-purple-500/20 border border-purple-500'
                    : 'bg-zinc-800/50 border border-transparent hover:bg-zinc-800'
                  }
                `}
                onClick={() => setSelectedIndex(index)}
              >
                <span className="text-lg">{icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{label}</p>
                  <p className="text-xs text-zinc-500">Slide {index + 1}</p>
                </div>

                <div className="flex gap-1">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-6 w-6 text-zinc-400 hover:text-white hover:bg-zinc-700"
                    onClick={(e) => {
                      e.stopPropagation()
                      moveSlide(index, index - 1)
                    }}
                    disabled={index === 0}
                  >
                    <ChevronUp className="h-3 w-3" />
                  </Button>

                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-6 w-6 text-zinc-400 hover:text-white hover:bg-zinc-700"
                    onClick={(e) => {
                      e.stopPropagation()
                      moveSlide(index, index + 1)
                    }}
                    disabled={index === slides.length - 1}
                  >
                    <ChevronDown className="h-3 w-3" />
                  </Button>

                  {slides.length > 1 && (
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-6 w-6 text-zinc-400 hover:text-red-400 hover:bg-zinc-700"
                      onClick={(e) => {
                        e.stopPropagation()
                        removeSlide(index)
                      }}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </ScrollArea>

      <div className="space-y-2">
        <Select onValueChange={handleAddSlide}>
          <SelectTrigger className="w-full bg-zinc-800 border-zinc-700 text-white">
            <div className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              <span>슬라이드 추가</span>
            </div>
          </SelectTrigger>
          <SelectContent className="bg-zinc-800 border-zinc-700">
            {ALL_SLIDE_TYPES.map((type) => (
              <SelectItem
                key={type}
                value={type}
                className="text-white hover:bg-zinc-700 focus:bg-zinc-700"
              >
                <div className="flex items-center gap-2">
                  <span>{SLIDE_ICONS[type]}</span>
                  <span>{SLIDE_TYPE_LABELS[type]}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
