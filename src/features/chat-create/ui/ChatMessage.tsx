import type { ChatMessage as ChatMessageType } from '../model/store'
import { PlanPreview } from './PlanPreview'
import { GenerationProgress } from './GenerationProgress'

interface ChatMessageProps {
  readonly message: ChatMessageType
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[80%] ${isUser ? 'order-2' : 'order-1'}`}>
        {isUser ? (
          <div className="bg-purple-600 text-white px-4 py-3 rounded-2xl rounded-tr-sm">
            {message.content}
          </div>
        ) : (
          <div className="bg-muted/50 dark:bg-muted/30 px-4 py-3 rounded-2xl rounded-tl-sm">
            <div className="text-foreground">{message.content}</div>

            {message.metadata?.type === 'plan' && message.metadata.plan && (
              <div className="mt-3">
                <PlanPreview plan={message.metadata.plan} />
              </div>
            )}

            {message.metadata?.type === 'generating' && (
              <div className="mt-3">
                <GenerationProgress progress={message.metadata.progress || 0} />
              </div>
            )}

            {message.metadata?.type === 'complete' && (
              <div className="mt-3">
                <GenerationProgress progress={100} complete />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
