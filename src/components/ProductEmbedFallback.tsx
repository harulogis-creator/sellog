"use client";

import { useLocale } from "@/components/LocaleProvider";

interface ProductEmbedFallbackProps {
  productId: string;
}

/**
 * 글 본문 [product:uuid]에서 상품을 찾지 못했을 때 표시. 클라이언트에서 t() 사용.
 */
export function ProductEmbedFallback({ productId }: ProductEmbedFallbackProps) {
  const { t } = useLocale();
  const message = t("blog.productNotFoundInEmbed").replace("{{id}}", productId);
  return (
    <div className="rounded-lg bg-slate-100 p-3 text-sm text-slate-500">
      {message}
    </div>
  );
}
