'use client'

import { useEditorStore } from '@/shared/lib/store'
import { SLIDE_SCHEMAS, SLIDE_TYPE_LABELS, ALL_SLIDE_TYPES, SLIDE_ICONS } from '@/shared/config/constants'
import type { SlideType } from '@/shared/types/slide'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function SlideEditor() {
  const slides = useEditorStore((state) => state.slides)
  const selectedIndex = useEditorStore((state) => state.selectedIndex)
  const updateSlideField = useEditorStore((state) => state.updateSlideField)
  const updateSlideType = useEditorStore((state) => state.updateSlideType)

  if (slides.length === 0) {
    return null
  }

  const currentSlide = slides[selectedIndex]
  if (!currentSlide) {
    return null
  }

  const schema = SLIDE_SCHEMAS[currentSlide.type]

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-white">슬라이드 편집</h3>

      <div className="space-y-2">
        <Label htmlFor="slide-type" className="text-sm font-medium text-white">
          슬라이드 타입
        </Label>
        <Select
          value={currentSlide.type}
          onValueChange={(value) => updateSlideType(selectedIndex, value as SlideType)}
        >
          <SelectTrigger
            id="slide-type"
            className="w-full bg-zinc-800 border-zinc-700 text-white"
          >
            <SelectValue>
              <div className="flex items-center gap-2">
                <span>{SLIDE_ICONS[currentSlide.type]}</span>
                <span>{SLIDE_TYPE_LABELS[currentSlide.type]}</span>
              </div>
            </SelectValue>
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

      <div className="space-y-3 pt-2">
        {schema.map((field) => {
          const value = currentSlide[field.key] || ''

          return (
            <div key={field.key} className="space-y-2">
              <Label htmlFor={field.key} className="text-sm font-medium text-white">
                {field.label}
              </Label>

              {field.type === 'textarea' ? (
                <Textarea
                  id={field.key}
                  value={value}
                  onChange={(e) => updateSlideField(selectedIndex, field.key, e.target.value)}
                  placeholder={field.placeholder}
                  rows={3}
                  className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 resize-none"
                />
              ) : (
                <Input
                  id={field.key}
                  type={field.type === 'color' ? 'color' : 'text'}
                  value={value}
                  onChange={(e) => updateSlideField(selectedIndex, field.key, e.target.value)}
                  placeholder={field.placeholder}
                  className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
