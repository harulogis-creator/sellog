/**
 * AI 텍스트 생성 (OpenAI). OPENAI_API_KEY가 있을 때만 동작.
 * 서버에서만 사용 (서버 액션·API 라우트).
 */

export type AiPromptType =
  | "post_title"
  | "post_summary"
  | "post_slug"
  | "post_summary_en"
  | "social_caption"
  | "image_alt_post"
  | "image_alt_product"
  | "product_name"
  | "product_description";

const PROMPTS: Record<
  AiPromptType,
  { system: string; user: (ctx: string) => string }
> = {
  post_title: {
    system:
      "You are a helpful assistant for a Korean blog. Respond only with a single, concise blog post title in Korean. No quotes or explanation.",
    user: (ctx) =>
      ctx.trim()
        ? `Write one short blog title (Korean) for a post with this content:\n\n${ctx.slice(0, 2000)}`
        : "Write one short, catchy blog title in Korean (generic, for a new post).",
  },
  post_summary: {
    system:
      "You are a helpful assistant for SEO. Respond only with a 1-2 sentence summary in Korean for meta description. No quotes or explanation. Under 160 characters.",
    user: (ctx) =>
      ctx.trim()
        ? `Write a short meta description in Korean for this post (under 160 chars):\n\n${ctx.slice(0, 2000)}`
        : "Write one short meta description line in Korean (generic). Under 160 characters.",
  },
  post_slug: {
    system:
      "You are a URL slug generator. Respond only with a single URL slug: lowercase letters, numbers, hyphens only. No spaces, no special characters. Use English or romanized form. One segment only (e.g. my-first-post).",
    user: (ctx) =>
      ctx.trim()
        ? `Generate a short URL slug (lowercase, hyphens) for this title or content:\n\n${ctx.slice(0, 500)}`
        : "Generate a short generic URL slug (e.g. new-post).",
  },
  post_summary_en: {
    system:
      "You are an SEO assistant. Respond only with a 1-2 sentence summary in English for the given post. No quotes or explanation. Under 160 characters.",
    user: (ctx) =>
      ctx.trim()
        ? `Write a short meta description in English for this post (under 160 chars):\n\n${ctx.slice(0, 2000)}`
        : "Write one short meta description line in English (generic). Under 160 characters.",
  },
  social_caption: {
    system:
      "You are a social media copywriter. Respond only with a short, catchy caption in Korean for SNS sharing (1-2 sentences). No quotes or hashtags unless requested. Under 100 characters preferred.",
    user: (ctx) =>
      ctx.trim()
        ? `Write a catchy SNS caption in Korean for sharing this post:\n\n${ctx.slice(0, 1500)}`
        : "Write one short catchy SNS caption in Korean (generic).",
  },
  image_alt_post: {
    system:
      "You are an accessibility assistant. Respond only with a concise image alt text in Korean describing the blog post thumbnail. No quotes. Under 125 characters.",
    user: (ctx) =>
      ctx.trim()
        ? `Write image alt text in Korean for a blog post thumbnail. Post context:\n\n${ctx.slice(0, 800)}`
        : "Write short image alt text in Korean for a blog thumbnail (generic).",
  },
  image_alt_product: {
    system:
      "You are an accessibility assistant. Respond only with a concise image alt text in Korean describing the product. No quotes. Under 125 characters.",
    user: (ctx) =>
      ctx.trim()
        ? `Write image alt text in Korean for this product image:\n\n${ctx}`
        : "Write short image alt text in Korean for a product (generic).",
  },
  product_name: {
    system:
      "You are a helpful assistant for an online store. Respond only with a single product name in Korean. No quotes or explanation.",
    user: (ctx) =>
      ctx.trim()
        ? `Suggest one short product name in Korean for:\n${ctx}`
        : "Suggest one short product name in Korean (generic).",
  },
  product_description: {
    system:
      "You are a helpful assistant for an online store. Respond only with a short product description in Korean (1-3 sentences). No quotes or explanation.",
    user: (ctx) =>
      ctx.trim()
        ? `Write a short product description in Korean for:\n${ctx}`
        : "Write one short product description in Korean (generic).",
  },
};

export async function generateWithAi(
  type: AiPromptType,
  context: string
): Promise<{ text?: string; error?: string }> {
  const key = process.env.OPENAI_API_KEY;
  if (!key?.trim()) {
    return { error: "common.ai.apiKeyRequired" };
  }

  try {
    const { OpenAI } = await import("openai");
    const openai = new OpenAI({ apiKey: key });
    const { system, user } = PROMPTS[type];
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: system },
        { role: "user", content: user(context) },
      ],
      max_tokens: 150,
    });
    const text = completion.choices[0]?.message?.content?.trim();
    if (!text) return { error: "common.ai.noResponse" };
    return { text };
  } catch {
    return { error: "common.ai.unknown" };
  }
}
