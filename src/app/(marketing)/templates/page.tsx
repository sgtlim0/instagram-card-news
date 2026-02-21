import { GalleryGrid } from '@/features/template-gallery/ui/GalleryGrid'

export default function TemplatesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">템플릿 갤러리</h1>
          <p className="text-muted-foreground text-lg">
            다양한 스타일과 레이아웃의 카드뉴스 템플릿을 둘러보고 마음에 드는 템플릿으로 바로 시작하세요
          </p>
        </div>

        <GalleryGrid />
      </div>
    </div>
  )
}
