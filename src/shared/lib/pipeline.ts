import type { SlideType, TemplateStyle } from '@/shared/types/slide'

export interface PipelineStep {
  id: string
  name: string
  status: 'pending' | 'running' | 'complete' | 'error'
  result?: unknown
}

export interface GenerationPipeline {
  id: string
  topic: string
  style: TemplateStyle
  steps: PipelineStep[]
  createdAt: Date
}

export type PipelineEventType = 'step_start' | 'step_complete' | 'step_error' | 'pipeline_complete'

export interface PipelineEvent {
  type: PipelineEventType
  stepId: string
  data?: unknown
  timestamp: Date
}
