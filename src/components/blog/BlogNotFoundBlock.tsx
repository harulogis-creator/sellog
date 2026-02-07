"use client";

import Link from "next/link";
import { useLocale } from "@/components/LocaleProvider";

export function BlogNotFoundBlock() {
  const { locale, t } = useLocale();
  const mainHref = `/${locale}/www`;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-[#fbfbfd]">
      <h1 className="text-xl font-semibold text-neutral-900 mb-2">
        {t("blog.notFound.title")}
      </h1>
      <Link
        href={mainHref}
        className="text-neutral-600 underline hover:text-neutral-900 transition-colors"
      >
        {t("blog.notFound.goMain")}
      </Link>
    </main>
  );
}
