import { FileText, List, Quote, TrendingUp, Image as ImageIcon, Grid3x3, Megaphone } from 'lucide-react'
import type { SlidePlan } from '../model/store'
import type { SlideType } from '@/shared/types/slide'
import { StyleSelector } from './StyleSelector'
import { useChatCreateStore } from '../model/store'

interface PlanPreviewProps {
  readonly plan: SlidePlan
}

function getSlideIcon(type: SlideType) {
  switch (type) {
    case 'cover':
      return <FileText className="w-4 h-4" />
    case 'content-list':
      return <List className="w-4 h-4" />
    case 'content-quote':
      return <Quote className="w-4 h-4" />
    case 'content-stat':
    case 'content-bigdata':
      return <TrendingUp className="w-4 h-4" />
    case 'content-image':
    case 'content-fullimage':
      return <ImageIcon className="w-4 h-4" />
    case 'content-grid':
      return <Grid3x3 className="w-4 h-4" />
    case 'cta':
      return <Megaphone className="w-4 h-4" />
    default:
      return <FileText className="w-4 h-4" />
  }
}

function getSlideTypeLabel(type: SlideType): string {
  const labels: Record<SlideType, string> = {
    'cover': '커버',
    'content': '콘텐츠',
    'content-stat': '통계',
    'content-quote': '인용',
    'content-badge': '뱃지',
    'content-steps': '단계',
    'content-list': '리스트',
    'content-split': '분할',
    'content-grid': '그리드',
    'content-highlight': '하이라이트',
    'content-bigdata': '빅데이터',
    'content-image': '이미지',
    'content-fullimage': '풀이미지',
    'cta': '행동유도',
  }
  return labels[type] || type
}

export function PlanPreview({ plan }: PlanPreviewProps) {
  const generateSlides = useChatCreateStore((state) => state.generateSlides)
  const generatePlan = useChatCreateStore((state) => state.generatePlan)
  const isStreaming = useChatCreateStore((state) => state.isStreaming)

  const handleRegenerate = () => {
    generatePlan(plan.title)
  }

  return (
    <div className="mt-4 space-y-4 border border-border rounded-lg p-4 bg-card">
      <div className="space-y-2">
        <h3 className="font-semibold text-foreground">슬라이드 구조</h3>
        <div className="space-y-2">
          {plan.slides.map((slide) => (
            <div
              key={slide.index}
              className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 dark:bg-muted/20"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-sm font-semibold flex-shrink-0">
                {slide.index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-purple-600 dark:text-purple-400">
                    {getSlideIcon(slide.type)}
                  </span>
                  <span className="text-sm font-medium text-foreground">
                    {getSlideTypeLabel(slide.type)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{slide.purpose}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <StyleSelector />

      <div className="flex flex-col sm:flex-row gap-2">
        <button
          onClick={() => generateSlides()}
          disabled={isStreaming}
          className="flex-1 bg-purple-600 text-white px-4 py-2.5 rounded-lg font-semibold hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          생성하기
        </button>
        <button
          onClick={handleRegenerate}
          disabled={isStreaming}
          className="px-4 py-2.5 rounded-lg font-medium border border-border hover:bg-muted/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          다시 계획하기
        </button>
      </div>
    </div>
  )
}
