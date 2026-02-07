"use client";

import Link from "next/link";
import { useLocale } from "@/components/LocaleProvider";
import { Button } from "@/components/ui/button";
import { ProductDeleteButton } from "./ProductDeleteButton";

type Product = {
  id: string;
  name: string;
  price: number;
  image_url: string | null;
};

interface ProductListProps {
  domain: string;
  products: Product[];
}

export function ProductList({ domain, products }: ProductListProps) {
  const { t, locale } = useLocale();
  const priceLocale = locale === "ko" ? "ko-KR" : "en-US";
  const currencySuffix = t("blog.products.currencySuffix");

  return (
    <div className="rounded-3xl bg-white border border-neutral-200/60 shadow-lg shadow-neutral-200/30 overflow-hidden">
      <ul>
        {products.map((product) => (
          <li
            key={product.id}
            className="flex items-center gap-4 px-5 py-4 min-h-[72px] border-b border-neutral-100 last:border-b-0"
          >
            <div className="flex items-center gap-4 min-w-0 flex-1">
              {product.image_url ? (
                <img
                  src={product.image_url}
                  alt=""
                  className="h-12 w-12 rounded-xl object-cover shrink-0"
                />
              ) : (
                <div className="h-12 w-12 rounded-xl bg-neutral-100 shrink-0" />
              )}
              <div className="min-w-0">
                <span className="font-medium text-neutral-900 block truncate">{product.name}</span>
                <span className="text-sm text-neutral-500">
                  {product.price.toLocaleString(priceLocale)}{currencySuffix}
                </span>
              </div>
            </div>
            <code className="text-[11px] text-neutral-400 shrink-0 font-mono hidden sm:inline">[product:…]</code>
            <div className="flex items-center gap-2 shrink-0">
              <Button variant="outline" size="sm" asChild>
                <Link href={`/${domain}/products/${product.id}/edit`}>{t("blog.products.edit")}</Link>
              </Button>
              <ProductDeleteButton
                productId={product.id}
                productName={product.name}
                domain={domain}
              />
              <Link
                href={`/${domain}/products/${product.id}/edit`}
                className="flex items-center justify-center w-8 h-8 text-neutral-400"
                aria-label={t("blog.products.editAria")}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
