import modal

app = modal.App("cardnews-backend")
image = modal.Image.debian_slim(python_version="3.12").pip_install("httpx", "fastapi")


@app.function(
    image=image,
    secrets=[modal.Secret.from_name("aws-bedrock")],
)
@modal.asgi_app()
def api():
    from fastapi import FastAPI, Request
    from fastapi.middleware.cors import CORSMiddleware
    from fastapi.responses import JSONResponse
    import httpx
    import os
    import json

    web_app = FastAPI()
    web_app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_methods=["POST"],
        allow_headers=["Content-Type"],
    )

    def get_bedrock_config():
        api_key = os.environ.get("AWS_BEARER_TOKEN_BEDROCK")
        if not api_key:
            raise ValueError("AWS_BEARER_TOKEN_BEDROCK not configured")
        region = os.environ.get("AWS_BEDROCK_REGION", "us-east-1")
        model_id = os.environ.get(
            "AWS_BEDROCK_MODEL_ID", "us.amazon.nova-micro-v1:0"
        )
        return api_key, region, model_id

    async def call_bedrock(
        *, system_prompt: str, user_message: str, max_tokens: int
    ) -> str:
        api_key, region, model_id = get_bedrock_config()
        url = f"https://bedrock-runtime.{region}.amazonaws.com/model/{model_id}/converse"

        body = {
            "modelId": model_id,
            "system": [{"text": system_prompt}],
            "messages": [
                {"role": "user", "content": [{"text": user_message}]},
            ],
            "inferenceConfig": {"maxTokens": max_tokens},
        }

        async with httpx.AsyncClient(timeout=120.0) as client:
            response = await client.post(
                url,
                json=body,
                headers={
                    "Content-Type": "application/json",
                    "Authorization": f"Bearer {api_key}",
                },
            )

        if response.status_code != 200:
            raise Exception(f"Bedrock API error: {response.status_code}")

        data = response.json()
        text_content = "".join(
            block.get("text", "")
            for block in (data.get("output", {}).get("message", {}).get("content", []))
        )

        if not text_content:
            raise Exception("No text response from Bedrock")

        return text_content

    def parse_json_response(text: str):
        text = text.strip()
        text = text.removeprefix("```json").removeprefix("```")
        text = text.removesuffix("```")
        return json.loads(text.strip())

    @web_app.post("/generate")
    async def generate(request: Request):
        try:
            body = await request.json()
            topic = body.get("topic", "")
            if not topic or not isinstance(topic, str) or not topic.strip():
                return JSONResponse(
                    {"error": "topic is required"}, status_code=400
                )

            slide_count = body.get("slideCount", 6)
            style = body.get("style", "professional")
            plan = body.get("plan")

            plan_context = ""
            if plan:
                slides_summary = [
                    {"index": s["index"], "type": s["type"], "purpose": s["purpose"]}
                    for s in plan.get("slides", [])
                ]
                plan_context = (
                    f"\n\nFollow this slide structure plan:\n"
                    f"{json.dumps(slides_summary, ensure_ascii=False, indent=2)}\n\n"
                    f"Use the exact slide types specified in the plan. "
                    f"Each slide's content should match its intended purpose."
                )

            system_prompt = f"""You are a professional card news content creator. Generate engaging Instagram card news slides in JSON format.

Available slide types and their fields:
- cover: {{ type: "cover", headline: string, subtext: string, headline_label: string }}
- content: {{ type: "content", headline: string, body: string, emphasis?: string }}
- content-badge: {{ type: "content-badge", badge_text: string, headline: string, body: string }}
- content-stat: {{ type: "content-stat", headline: string, emphasis: string, body: string }}
- content-quote: {{ type: "content-quote", headline: string (source/author), body: string (quote text) }}
- content-list: {{ type: "content-list", headline: string, item1: string, item2: string, item3: string, item4: string, item5: string }}
- content-steps: {{ type: "content-steps", headline: string, step1: string, step2: string, step3: string }}
- content-split: {{ type: "content-split", headline: string, left_title: string, left_body: string, right_title: string, right_body: string }}
- content-grid: {{ type: "content-grid", headline: string, item1: string, item2: string, item3: string, item4: string }}
- content-highlight: {{ type: "content-highlight", headline: string, body: string }}
- content-bigdata: {{ type: "content-bigdata", headline: string, bigdata_number: string, bigdata_unit: string, body: string }}
- content-image: {{ type: "content-image", headline: string, body: string }}
- content-fullimage: {{ type: "content-fullimage", headline: string }}
- cta: {{ type: "cta", headline: string, cta_text: string, tag1: string, tag2: string, tag3: string }}

Rules:
1. First slide MUST be "cover" type
2. Last slide MUST be "cta" type
3. Mix different slide types for variety and visual interest
4. Use <span class='highlight'>text</span> sparingly for emphasis in body text
5. Keep text concise and readable for mobile card format
6. Generate exactly {slide_count} slides
7. Style: {style}
8. Return ONLY a valid JSON array, no markdown code blocks or explanations
9. Write in Korean (한국어){plan_context}"""

            user_message = (
                f'주제: "{topic}". 슬라이드 수: {slide_count}장. '
                f"한국어로 카드뉴스를 만들어주세요. JSON 배열만 반환하세요."
            )

            text = await call_bedrock(
                system_prompt=system_prompt,
                user_message=user_message,
                max_tokens=4096,
            )
            slides = parse_json_response(text)

            if not isinstance(slides, list):
                return JSONResponse(
                    {"error": "Response is not an array"}, status_code=500
                )

            if len(slides) > 0 and slides[0].get("type") != "cover":
                return JSONResponse(
                    {"error": "First slide must be cover type"}, status_code=500
                )

            if len(slides) > 0 and slides[-1].get("type") != "cta":
                return JSONResponse(
                    {"error": "Last slide must be cta type"}, status_code=500
                )

            return {"slides": slides}

        except json.JSONDecodeError:
            return JSONResponse(
                {"error": "Failed to parse slides JSON"}, status_code=500
            )
        except Exception as e:
            return JSONResponse({"error": str(e)}, status_code=500)

    @web_app.post("/generate-plan")
    async def generate_plan(request: Request):
        try:
            body = await request.json()
            topic = body.get("topic", "")
            if not topic or not isinstance(topic, str) or not topic.strip():
                return JSONResponse(
                    {"error": "topic is required"}, status_code=400
                )

            system_prompt = """You are a professional card news content planner. Generate a slide structure plan for Instagram card news.

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

Generate in Korean (한국어)."""

            user_message = (
                f'주제: "{topic}". 이 주제로 카드뉴스 구조를 계획해주세요. JSON만 반환하세요.'
            )

            text = await call_bedrock(
                system_prompt=system_prompt,
                user_message=user_message,
                max_tokens=2048,
            )
            plan = parse_json_response(text)

            if (
                not isinstance(plan, dict)
                or not plan.get("title")
                or not plan.get("slideCount")
                or not isinstance(plan.get("slides"), list)
            ):
                return JSONResponse(
                    {"error": "Invalid plan structure"}, status_code=500
                )

            slides = plan["slides"]
            if len(slides) > 0 and slides[0].get("type") != "cover":
                return JSONResponse(
                    {"error": "First slide must be cover type"}, status_code=500
                )

            if len(slides) > 0 and slides[-1].get("type") != "cta":
                return JSONResponse(
                    {"error": "Last slide must be cta type"}, status_code=500
                )

            return {"plan": plan}

        except json.JSONDecodeError:
            return JSONResponse(
                {"error": "Failed to parse plan JSON"}, status_code=500
            )
        except Exception as e:
            return JSONResponse({"error": str(e)}, status_code=500)

    return web_app
