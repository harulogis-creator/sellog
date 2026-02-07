"use client";

import Link from "next/link";
import { useLocale } from "@/components/LocaleProvider";
import { Button } from "@/components/ui/button";

export interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image_url: string | null;
  description: string | null;
  /** 있으면 구매하기 링크 활성화 */
  domain?: string;
}

/**
 * 블로그 글 내 상품 임베드용 카드. domain이 있으면 구매하기 → 체크아웃 페이지로 이동
 */
export function ProductCard({ id, name, price, image_url, description, domain }: ProductCardProps) {
  const { t, locale } = useLocale();
  const priceLocale = locale === "ko" ? "ko-KR" : "en-US";
  const currencySuffix = t("blog.products.currencySuffix");
  const buyLabel = t("blog.productCard.buy");

  return (
    <div className="my-8 rounded-2xl border border-neutral-100 bg-white p-5 shadow-sm overflow-hidden transition-shadow hover:shadow-md">
      <div className="flex gap-5">
        {image_url ? (
          <div className="relative h-28 w-28 shrink-0 rounded-xl bg-neutral-100 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image_url}
              alt={name}
              className="h-full w-full object-cover"
            />
          </div>
        ) : (
          <div className="h-28 w-28 shrink-0 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-400 text-xs">
            {t("blog.productCard.noImage")}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-neutral-900 text-lg">{name}</h3>
          <p className="mt-2 text-xl font-semibold text-neutral-900">
            {price.toLocaleString(priceLocale)}{currencySuffix}
          </p>
          {description && (
            <p className="mt-2 text-sm text-neutral-600 line-clamp-2 leading-relaxed">{description}</p>
          )}
          {domain ? (
            <Button size="sm" className="mt-4" asChild>
              <Link href={`/${domain}/checkout?product=${id}`}>{buyLabel}</Link>
            </Button>
          ) : (
            <Button type="button" size="sm" className="mt-4" disabled>
              {buyLabel}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
