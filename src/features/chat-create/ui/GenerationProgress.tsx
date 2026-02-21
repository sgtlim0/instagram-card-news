import { CheckCircle2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface GenerationProgressProps {
  readonly progress: number
  readonly complete?: boolean
}

export function GenerationProgress({ progress, complete }: GenerationProgressProps) {
  const router = useRouter()

  const handleOpenEditor = () => {
    router.push('/editor')
  }

  return (
    <div className="mt-4 space-y-3 border border-border rounded-lg p-4 bg-card">
      {complete ? (
        <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
          <CheckCircle2 className="w-5 h-5" />
          <span className="font-semibold">생성 완료!</span>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-foreground font-medium">슬라이드 생성 중...</span>
            <span className="text-muted-foreground">{progress}%</span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-purple-600 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {complete && (
        <button
          onClick={handleOpenEditor}
          className="w-full bg-purple-600 text-white px-4 py-2.5 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
        >
          편집기에서 열기
        </button>
      )}
    </div>
  )
}
