import { AppHeader } from '@/widgets/app-header/ui/AppHeader'
import { EditorLayout } from '@/widgets/card-editor/ui/EditorLayout'

export default function EditorPage() {
  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      <AppHeader />
      <EditorLayout />
    </div>
  )
}
