import { NextResponse } from "next/server"
import { callBedrock, parseJsonResponse } from "@/shared/lib/bedrock"

interface PlanSlide {
  index: number
  type: string
  purpose: string
}

interface Plan {
  title: string
  slideCount: number
  slides: PlanSlide[]
}

const SYSTEM_PROMPT = `You are a professional card news content planner. Generate a slide structure plan for Instagram card news.

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
    { "index": 1, "type": "content-stat", "purpose": "통계 데이터로 문제 제기" }
  ]
}

Generate in Korean (한국어).`

export async function POST(request: Request) {
  try {
    const { topic } = await request.json()

    if (!topic || typeof topic !== "string" || topic.trim().length === 0) {
      return NextResponse.json(
        { error: "topic is required" },
        { status: 400 }
      )
    }

    const userMessage = `주제: "${topic}". 이 주제로 카드뉴스 구조를 계획해주세요. JSON만 반환하세요.`

    const text = await callBedrock({
      systemPrompt: SYSTEM_PROMPT,
      userMessage,
      maxTokens: 2048,
    })

    const plan = parseJsonResponse<Plan>(text)

    if (!plan.title || !plan.slideCount || !Array.isArray(plan.slides)) {
      return NextResponse.json(
        { error: "Invalid plan structure" },
        { status: 500 }
      )
    }

    const { slides } = plan
    if (slides.length > 0 && slides[0].type !== "cover") {
      return NextResponse.json(
        { error: "First slide must be cover type" },
        { status: 500 }
      )
    }

    if (slides.length > 0 && slides[slides.length - 1].type !== "cta") {
      return NextResponse.json(
        { error: "Last slide must be cta type" },
        { status: 500 }
      )
    }

    return NextResponse.json({ plan })
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    )
  }
}
