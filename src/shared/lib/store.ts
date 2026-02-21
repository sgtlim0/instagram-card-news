import { create } from 'zustand'
import type { Slide, SlideType, TemplateStyle } from '@/shared/types/slide'

interface EditorState {
  readonly slides: readonly Slide[]
  readonly selectedIndex: number
  readonly style: TemplateStyle
  readonly accountName: string
  readonly topic: string
  readonly slideCount: number
  readonly loading: boolean
  readonly error: string
  readonly generated: boolean
}

interface EditorActions {
  readonly setSlides: (slides: readonly Slide[]) => void
  readonly setSelectedIndex: (index: number) => void
  readonly setStyle: (style: TemplateStyle) => void
  readonly setAccountName: (name: string) => void
  readonly setTopic: (topic: string) => void
  readonly setSlideCount: (count: number) => void
  readonly setLoading: (loading: boolean) => void
  readonly setError: (error: string) => void
  readonly setGenerated: (generated: boolean) => void
  readonly updateSlideField: (index: number, key: string, value: string) => void
  readonly updateSlideType: (index: number, type: SlideType) => void
  readonly addSlide: (type: SlideType) => void
  readonly removeSlide: (index: number) => void
  readonly moveSlide: (from: number, to: number) => void
  readonly generateSlides: () => Promise<void>
}

type EditorStore = EditorState & EditorActions

function createSlideId(): string {
  return crypto.randomUUID()
}

function createEmptySlide(type: SlideType): Slide {
  return { id: createSlideId(), type }
}

export const useEditorStore = create<EditorStore>((set, get) => ({
  slides: [],
  selectedIndex: 0,
  style: 'clean',
  accountName: 'my_account',
  topic: '',
  slideCount: 6,
  loading: false,
  error: '',
  generated: false,

  setSlides: (slides) => set({ slides }),
  setSelectedIndex: (selectedIndex) => set({ selectedIndex }),
  setStyle: (style) => set({ style }),
  setAccountName: (accountName) => set({ accountName }),
  setTopic: (topic) => set({ topic }),
  setSlideCount: (slideCount) => set({ slideCount }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setGenerated: (generated) => set({ generated }),

  updateSlideField: (index, key, value) => {
    const { slides } = get()
    const updated = slides.map((slide, i) =>
      i === index ? { ...slide, [key]: value } : slide
    )
    set({ slides: updated })
  },

  updateSlideType: (index, type) => {
    const { slides } = get()
    const updated = slides.map((slide, i) =>
      i === index ? { ...slide, type } : slide
    )
    set({ slides: updated })
  },

  addSlide: (type) => {
    const { slides, selectedIndex } = get()
    const newSlide = createEmptySlide(type)
    const updated = [
      ...slides.slice(0, selectedIndex + 1),
      newSlide,
      ...slides.slice(selectedIndex + 1),
    ]
    set({ slides: updated, selectedIndex: selectedIndex + 1 })
  },

  removeSlide: (index) => {
    const { slides, selectedIndex } = get()
    if (slides.length <= 1) return
    const updated = slides.filter((_, i) => i !== index)
    const newIndex = selectedIndex >= updated.length
      ? updated.length - 1
      : selectedIndex > index
        ? selectedIndex - 1
        : selectedIndex
    set({ slides: updated, selectedIndex: newIndex })
  },

  moveSlide: (from, to) => {
    const { slides } = get()
    if (to < 0 || to >= slides.length) return
    const updated = [...slides]
    const [moved] = updated.splice(from, 1)
    updated.splice(to, 0, moved)
    set({ slides: updated, selectedIndex: to })
  },

  generateSlides: async () => {
    const { topic, slideCount, style } = get()
    if (!topic.trim()) return

    set({ loading: true, error: '', generated: false })

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, slideCount, style }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Generation failed')
      }

      const data = await response.json()
      const slidesWithIds = data.slides.map((slide: Omit<Slide, 'id'>) => ({
        ...slide,
        id: createSlideId(),
      }))

      set({
        slides: slidesWithIds,
        selectedIndex: 0,
        generated: true,
        loading: false,
      })
    } catch (error) {
      set({
        error: error instanceof Error
          ? error.message
          : 'Failed to generate slides',
        loading: false,
      })
    }
  },
}))
