'use client'

import { useState, useRef, useEffect } from 'react'
import { Send } from 'lucide-react'
import { useChatCreateStore } from '../model/store'
import { ChatMessage } from './ChatMessage'

const SUGGESTED_PROMPTS = [
  '2025 AI 트렌드',
  '건강한 식습관 가이드',
  '효과적인 시간 관리법',
  '스타트업 성공 전략',
]

export function ChatInterface() {
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const messages = useChatCreateStore((state) => state.messages)
  const isStreaming = useChatCreateStore((state) => state.isStreaming)
  const generatePlan = useChatCreateStore((state) => state.generatePlan)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (topic: string) => {
    if (!topic.trim() || isStreaming) return

    setInput('')
    await generatePlan(topic)

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(input)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)

    const textarea = e.target
    textarea.style.height = 'auto'
    textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`
  }

  const handleChipClick = (prompt: string) => {
    handleSubmit(prompt)
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] max-w-4xl mx-auto">
      <div className="flex-1 overflow-y-auto px-4 py-6">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-foreground">
                어떤 카드뉴스를 만들까요?
              </h2>
              <p className="text-muted-foreground">
                주제를 입력하거나 아래 제안 중 하나를 선택해주세요
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 max-w-md w-full">
              {SUGGESTED_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handleChipClick(prompt)}
                  className="px-4 py-3 rounded-lg border border-border hover:bg-muted/50 text-sm font-medium transition-colors"
                  disabled={isStreaming}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div>
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-border bg-background p-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-end gap-2">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="카드뉴스 주제를 입력하세요..."
              disabled={isStreaming}
              className="flex-1 resize-none rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-600 disabled:opacity-50 disabled:cursor-not-allowed"
              rows={1}
              style={{ maxHeight: '200px' }}
            />
            <button
              onClick={() => handleSubmit(input)}
              disabled={!input.trim() || isStreaming}
              className="flex items-center justify-center w-10 h-10 rounded-lg bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex-shrink-0"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
