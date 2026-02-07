"use server";

import { generateWithAi, type AiPromptType } from "@/lib/ai";

/**
 * 클라이언트에서 호출하는 AI 제안 서버 액션.
 * type: 제목/요약/상품명/상품설명, context: 본문 또는 상품 정보 등.
 */
export async function suggestWithAi(
  type: AiPromptType,
  context: string
): Promise<{ text?: string; error?: string }> {
  return generateWithAi(type, context);
}
