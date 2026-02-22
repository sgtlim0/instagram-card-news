interface BedrockConfig {
  apiKey: string
  region: string
  modelId: string
}

function getBedrockConfig(): BedrockConfig {
  const apiKey = process.env.AWS_BEARER_TOKEN_BEDROCK
  if (!apiKey) {
    throw new Error("AWS_BEARER_TOKEN_BEDROCK not configured")
  }

  return {
    apiKey,
    region: process.env.AWS_BEDROCK_REGION ?? "us-east-1",
    modelId:
      process.env.AWS_BEDROCK_MODEL_ID ??
      "us.amazon.nova-micro-v1:0",
  }
}

export async function callBedrock({
  systemPrompt,
  userMessage,
  maxTokens,
}: {
  systemPrompt: string
  userMessage: string
  maxTokens: number
}): Promise<string> {
  const { apiKey, region, modelId } = getBedrockConfig()
  const url = `https://bedrock-runtime.${region}.amazonaws.com/model/${modelId}/converse`

  const body = {
    modelId,
    system: [{ text: systemPrompt }],
    messages: [{ role: "user", content: [{ text: userMessage }] }],
    inferenceConfig: { maxTokens },
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    throw new Error(`Bedrock API error: ${response.status}`)
  }

  const data = await response.json()

  const textContent = (
    data?.output?.message?.content as Array<{ text?: string }>
  )
    ?.map((block) => block.text ?? "")
    .join("")

  if (!textContent) {
    throw new Error("No text response from Bedrock")
  }

  return textContent
}

export function parseJsonResponse<T>(text: string): T {
  let cleaned = text.trim()
  if (cleaned.startsWith("```json")) {
    cleaned = cleaned.slice(7)
  } else if (cleaned.startsWith("```")) {
    cleaned = cleaned.slice(3)
  }
  if (cleaned.endsWith("```")) {
    cleaned = cleaned.slice(0, -3)
  }
  return JSON.parse(cleaned.trim()) as T
}
