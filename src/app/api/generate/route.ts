import { NextResponse } from "next/server"
import { callBedrock, parseJsonResponse } from "@/shared/lib/bedrock"

interface Slide {
  type: string
  [key: string]: unknown
}

interface PlanSlide {
  index: number
  type: string
  purpose: string
}

interface Plan {
  slides: PlanSlide[]
}

function buildSystemPrompt(
  slideCount: number,
  style: string,
  plan?: Plan
): string {
  let planContext = ""
  if (plan) {
    const slidesSummary = plan.slides.map(({ index, type, purpose }) => ({
      index,
      type,
      purpose,
    }))
    planContext =
      `\n\nFollow this slide structure plan:\n` +
      `${JSON.stringify(slidesSummary, null, 2)}\n\n` +
      `Use the exact slide types specified in the plan. ` +
      `Each slide's content should match its intended purpose.`
  }

  return `You are a professional card news content creator. Generate engaging Instagram card news slides in JSON format.

Available slide types and their fields:
- cover: { type: "cover", headline: string, subtext: string, headline_label: string }
- content: { type: "content", headline: string, body: string, emphasis?: string }
- content-badge: { type: "content-badge", badge_text: string, headline: string, body: string }
- content-stat: { type: "content-stat", headline: string, emphasis: string, body: string }
- content-quote: { type: "content-quote", headline: string (source/author), body: string (quote text) }
- content-list: { type: "content-list", headline: string, item1: string, item2: string, item3: string, item4: string, item5: string }
- content-steps: { type: "content-steps", headline: string, step1: string, step2: string, step3: string }
- content-split: { type: "content-split", headline: string, left_title: string, left_body: string, right_title: string, right_body: string }
- content-grid: { type: "content-grid", headline: string, item1: string, item2: string, item3: string, item4: string }
- content-highlight: { type: "content-highlight", headline: string, body: string }
- content-bigdata: { type: "content-bigdata", headline: string, bigdata_number: string, bigdata_unit: string, body: string }
- content-image: { type: "content-image", headline: string, body: string }
- content-fullimage: { type: "content-fullimage", headline: string }
- cta: { type: "cta", headline: string, cta_text: string, tag1: string, tag2: string, tag3: string }

Rules:
1. First slide MUST be "cover" type
2. Last slide MUST be "cta" type
3. Mix different slide types for variety and visual interest
4. Use <span class='highlight'>text</span> sparingly for emphasis in body text
5. Keep text concise and readable for mobile card format
6. Generate exactly ${slideCount} slides
7. Style: ${style}
8. Return ONLY a valid JSON array, no markdown code blocks or explanations
9. Write in Korean (한국어)${planContext}`
}

export async function POST(request: Request) {
  try {
    const { topic, slideCount, style, plan } = await request.json()

    if (!slideCount || slideCount < 4 || slideCount > 10) {
      return NextResponse.json(
        { error: "slideCount must be between 4 and 10" },
        { status: 400 }
      )
    }

    if (!topic || typeof topic !== "string" || topic.trim().length === 0) {
      return NextResponse.json(
        { error: "topic is required" },
        { status: 400 }
      )
    }

    const systemPrompt = buildSystemPrompt(
      slideCount,
      style ?? "professional",
      plan
    )

    const userMessage = `주제: "${topic}". 슬라이드 수: ${slideCount}장. 한국어로 카드뉴스를 만들어주세요. JSON 배열만 반환하세요.`

    const text = await callBedrock({
      systemPrompt,
      userMessage,
      maxTokens: 4096,
    })

    const slides = parseJsonResponse<Slide[]>(text)

    if (!Array.isArray(slides)) {
      return NextResponse.json(
        { error: "Response is not an array" },
        { status: 500 }
      )
    }

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

    return NextResponse.json({ slides })
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
