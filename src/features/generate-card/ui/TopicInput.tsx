'use client'

import { useEditorStore } from '@/shared/lib/store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Textarea } from '@/components/ui/textarea'

export function TopicInput() {
  const topic = useEditorStore((state) => state.topic)
  const slideCount = useEditorStore((state) => state.slideCount)
  const accountName = useEditorStore((state) => state.accountName)
  const loading = useEditorStore((state) => state.loading)
  const error = useEditorStore((state) => state.error)
  const generated = useEditorStore((state) => state.generated)
  const setTopic = useEditorStore((state) => state.setTopic)
  const setSlideCount = useEditorStore((state) => state.setSlideCount)
  const setAccountName = useEditorStore((state) => state.setAccountName)
  const generateSlides = useEditorStore((state) => state.generateSlides)

  const handleGenerate = () => {
    generateSlides()
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="account-name" className="text-sm font-medium text-white">
          계정명
        </Label>
        <Input
          id="account-name"
          value={accountName}
          onChange={(e) => setAccountName(e.target.value)}
          placeholder="계정명을 입력하세요"
          className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="topic" className="text-sm font-medium text-white">
          주제
        </Label>
        <Textarea
          id="topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="카드뉴스 주제를 입력하세요"
          rows={3}
          className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 resize-none"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="slide-count" className="text-sm font-medium text-white">
          슬라이드 수: {slideCount}
        </Label>
        <Slider
          id="slide-count"
          min={4}
          max={10}
          step={1}
          value={[slideCount]}
          onValueChange={(value) => setSlideCount(value[0])}
          className="py-2"
        />
      </div>

      <Button
        onClick={handleGenerate}
        disabled={loading || !topic.trim()}
        className="w-full bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? '생성 중...' : '카드뉴스 생성'}
      </Button>

      {error && (
        <p className="text-sm text-red-400 mt-2">{error}</p>
      )}

      {generated && !error && (
        <p className="text-sm text-green-400 mt-2">슬라이드가 생성되었습니다!</p>
      )}
    </div>
  )
}
