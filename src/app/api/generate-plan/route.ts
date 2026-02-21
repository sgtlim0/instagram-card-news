import { NextResponse } from 'next/server'
import type { SlideType } from '@/shared/types/slide'

interface BedrockMessage {
  readonly role: 'user' | 'assistant'
  readonly content: readonly { text: string }[]
}

interface BedrockConverseRequest {
  readonly modelId: string
  readonly system: readonly { text: string }[]
  readonly messages: readonly BedrockMessage[]
  readonly inferenceConfig: {
    readonly maxTokens: number
  }
}

interface BedrockConverseResponse {
  readonly output: {
    readonly message: {
      readonly role: string
      readonly content: readonly { text: string }[]
    }
  }
}

interface SlidePlanItem {
  readonly index: number
  readonly type: SlideType
  readonly purpose: string
}

interface SlidePlan {
  readonly title: string
  readonly slideCount: number
  readonly slides: readonly SlidePlanItem[]
}

export async function POST(request: Request) {
  try {
    const { topic } = await request.json()

    if (!topic || typeof topic !== 'string' || topic.trim().length === 0) {
      return NextResponse.json(
        { error: 'topic is required' },
        { status: 400 }
      )
    }

    const apiKey = process.env.AWS_BEARER_TOKEN_BEDROCK
    if (!apiKey) {
      return NextResponse.json(
        { error: 'AWS_BEARER_TOKEN_BEDROCK not configured' },
        { status: 500 }
      )
    }

    const region = process.env.AWS_BEDROCK_REGION || 'us-east-1'
    const modelId = process.env.AWS_BEDROCK_MODEL_ID || 'us.anthropic.claude-sonnet-4-20250514-v1:0'

    const systemPrompt = `You are a professional card news content planner. Generate a slide structure plan for Instagram card news.

Available slide types:
- cover: Opening slide with main title
- content: Standard content slide with headline and body
- content-badge: Content with a badge/label
- content-stat: Content with statistics/numbers
- content-quote: Quote or testimonial
- content-list: Bulleted list of items (5 items)
- content-steps: Step-by-step guide (3 steps)
- content-split: Side-by-side comparison
- content-grid: 4-item grid layout
- content-highlight: Highlighted key message
- content-bigdata: Large number/data visualization
- content-image: Content with image placeholder
- content-fullimage: Full-screen image with headline
- cta: Call-to-action closing slide

Rules:
1. First slide MUST be "cover" type
2. Last slide MUST be "cta" type
3. Choose appropriate slide types based on content structure
4. Vary slide types for visual interest
5. Recommended slide count: 5-8 slides
6. Each slide should have a clear purpose

Return ONLY a valid JSON object in this exact format (no markdown code blocks):
{
  "title": "카드뉴스 제목",
  "slideCount": 6,
  "slides": [
    { "index": 0, "type": "cover", "purpose": "메인 타이틀과 주제 소개" },
    { "index": 1, "type": "content-stat", "purpose": "통계 데이터로 문제 제기" },
    ...
  ]
}

Generate in Korean (한국어).`

    const bedrockUrl = `https://bedrock-runtime.${region}.amazonaws.com/model/${encodeURIComponent(modelId)}/converse`

    const body: BedrockConverseRequest = {
      modelId,
      system: [{ text: systemPrompt }],
      messages: [
        {
          role: 'user',
          content: [{ text: `주제: "${topic}". 이 주제로 카드뉴스 구조를 계획해주세요. JSON만 반환하세요.` }],
        },
      ],
      inferenceConfig: {
        maxTokens: 2048,
      },
    }

    const response = await fetch(bedrockUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Bedrock API error:', response.status, errorText)
      return NextResponse.json(
        { error: `Bedrock API error: ${response.status}` },
        { status: response.status }
      )
    }

    const data: BedrockConverseResponse = await response.json()

    const textContent = data.output?.message?.content
      ?.map((block) => block.text || '')
      .join('') || ''

    if (!textContent) {
      return NextResponse.json(
        { error: 'No text response from Bedrock' },
        { status: 500 }
      )
    }

    let responseText = textContent.trim()
    responseText = responseText.replace(/^```json\s*\n?/i, '').replace(/\n?```\s*$/i, '')
    responseText = responseText.trim()

    let plan: SlidePlan
    try {
      plan = JSON.parse(responseText)
    } catch {
      console.error('JSON parse error, response text:', responseText)
      return NextResponse.json(
        { error: 'Failed to parse plan JSON' },
        { status: 500 }
      )
    }

    if (!plan.title || !plan.slideCount || !Array.isArray(plan.slides)) {
      return NextResponse.json(
        { error: 'Invalid plan structure' },
        { status: 500 }
      )
    }

    if (plan.slides.length > 0 && plan.slides[0].type !== 'cover') {
      return NextResponse.json(
        { error: 'First slide must be cover type' },
        { status: 500 }
      )
    }

    if (plan.slides.length > 0 && plan.slides[plan.slides.length - 1].type !== 'cta') {
      return NextResponse.json(
        { error: 'Last slide must be cta type' },
        { status: 500 }
      )
    }

    return NextResponse.json({ plan })

  } catch (error) {
    console.error('Error generating plan:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}
