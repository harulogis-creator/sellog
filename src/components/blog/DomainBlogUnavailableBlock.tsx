"use client";

import { useLocale } from "@/components/LocaleProvider";

interface DomainBlogUnavailableBlockProps {
  domain: string;
}

/**
 * [domain] 메인에서 블로그가 없거나 불러오지 못했을 때 표시. 클라이언트에서 t() 사용.
 */
export function DomainBlogUnavailableBlock({ domain }: DomainBlogUnavailableBlockProps) {
  const { t } = useLocale();
  const title = t("blog.home.unavailableTitle").replace("{{domain}}", domain);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center py-20 px-8 bg-[#fbfbfd]">
      <h1 className="text-3xl font-semibold text-neutral-900 tracking-tight mb-4">
        {title}
      </h1>
      <p className="text-neutral-600 text-center max-w-sm">
        {t("blog.home.unavailableDesc")}
      </p>
    </main>
  );
}
