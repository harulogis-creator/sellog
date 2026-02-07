"use client";

import { useLocale } from "@/components/LocaleProvider";

/**
 * 루트 레이아웃용 본문으로 건너뛰기 링크. locale에 따라 텍스트 i18n.
 */
export function SkipToContentLink() {
  const { t } = useLocale();

  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-neutral-900 focus:text-white focus:rounded-full focus:outline-none"
    >
      {t("common.a11y.skipToContent")}
    </a>
  );
}
