import { create } from 'zustand'
import type { SlideType, TemplateStyle } from '@/shared/types/slide'
import { useEditorStore } from '@/shared/lib/store'

export interface SlidePlan {
  readonly title: string
  readonly slideCount: number
  readonly slides: readonly {
    readonly index: number
    readonly type: SlideType
    readonly purpose: string
  }[]
}

export interface ChatMessage {
  readonly id: string
  readonly role: 'user' | 'assistant'
  readonly content: string
  readonly metadata?: {
    readonly type?: 'plan' | 'generating' | 'complete'
    readonly plan?: SlidePlan
    readonly progress?: number
  }
}

interface ChatCreateState {
  readonly messages: readonly ChatMessage[]
  readonly currentStep: 'input' | 'planning' | 'generating' | 'complete'
  readonly plan: SlidePlan | null
  readonly selectedStyle: TemplateStyle
  readonly isStreaming: boolean
  readonly error: string
}

interface ChatCreateActions {
  readonly addMessage: (message: Omit<ChatMessage, 'id'>) => void
  readonly setStep: (step: ChatCreateState['currentStep']) => void
  readonly setPlan: (plan: SlidePlan | null) => void
  readonly setStyle: (style: TemplateStyle) => void
  readonly setStreaming: (streaming: boolean) => void
  readonly setError: (error: string) => void
  readonly reset: () => void
  readonly generatePlan: (topic: string) => Promise<void>
  readonly generateSlides: () => Promise<void>
}

type ChatCreateStore = ChatCreateState & ChatCreateActions

const initialState: ChatCreateState = {
  messages: [],
  currentStep: 'input',
  plan: null,
  selectedStyle: 'clean',
  isStreaming: false,
  error: '',
}

export const useChatCreateStore = create<ChatCreateStore>((set, get) => ({
  ...initialState,

  addMessage: (message) => {
    const newMessage: ChatMessage = {
      ...message,
      id: crypto.randomUUID(),
    }
    set((state) => ({
      messages: [...state.messages, newMessage],
    }))
  },

  setStep: (currentStep) => set({ currentStep }),
  setPlan: (plan) => set({ plan }),
  setStyle: (selectedStyle) => set({ selectedStyle }),
  setStreaming: (isStreaming) => set({ isStreaming }),
  setError: (error) => set({ error }),
  reset: () => set(initialState),

  generatePlan: async (topic) => {
    const { addMessage, setStep, setPlan, setStreaming, setError } = get()

    addMessage({
      role: 'user',
      content: topic,
    })

    setStep('planning')
    setStreaming(true)
    setError('')

    try {
      const response = await fetch('/api/generate-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to generate plan')
      }

      const data = await response.json()
      const plan: SlidePlan = data.plan

      setPlan(plan)
      addMessage({
        role: 'assistant',
        content: `"${plan.title}" 카드뉴스 구조를 생성했습니다. 총 ${plan.slideCount}장의 슬라이드로 구성됩니다.`,
        metadata: {
          type: 'plan',
          plan,
        },
      })
      setStep('input')
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to generate plan'
      setError(errorMessage)
      addMessage({
        role: 'assistant',
        content: `계획 생성에 실패했습니다: ${errorMessage}`,
      })
      setStep('input')
    } finally {
      setStreaming(false)
    }
  },

  generateSlides: async () => {
    const { plan, selectedStyle, addMessage, setStep, setStreaming, setError } = get()

    if (!plan) {
      setError('No plan available')
      return
    }

    setStep('generating')
    setStreaming(true)
    setError('')

    addMessage({
      role: 'assistant',
      content: '슬라이드를 생성하고 있습니다...',
      metadata: {
        type: 'generating',
        progress: 0,
      },
    })

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: plan.title,
          slideCount: plan.slideCount,
          style: selectedStyle,
          plan: plan,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to generate slides')
      }

      const data = await response.json()
      const slides = data.slides

      const slidesWithIds = slides.map((slide: Record<string, string>) => ({
        ...slide,
        id: crypto.randomUUID(),
      }))

      useEditorStore.getState().setSlides(slidesWithIds)
      useEditorStore.getState().setStyle(selectedStyle)
      useEditorStore.getState().setGenerated(true)

      addMessage({
        role: 'assistant',
        content: `카드뉴스 생성이 완료되었습니다! ${slides.length}장의 슬라이드가 준비되었습니다.`,
        metadata: {
          type: 'complete',
          progress: 100,
        },
      })
      setStep('complete')
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to generate slides'
      setError(errorMessage)
      addMessage({
        role: 'assistant',
        content: `슬라이드 생성에 실패했습니다: ${errorMessage}`,
      })
      setStep('input')
    } finally {
      setStreaming(false)
    }
  },
}))
