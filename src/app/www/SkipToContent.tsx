"use client";

import { useTranslations } from "@/components/LocaleProvider";

/** 본문으로 건너뛰기 링크 (접근성, Squarespace 벤치마크) */
export function SkipToContent() {
  const t = useTranslations();

  return (
    <a
      href="#main-content"
      className="absolute left-4 -top-20 z-[100] rounded bg-neutral-900 px-4 py-2 text-sm font-medium text-white outline-none ring-2 ring-white transition-[top] focus:top-4 focus:outline-none"
    >
      {t("www.a11y.skipToContent")}
    </a>
  );
}
