"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "@/components/LocaleProvider";

export default function WwwError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const pathname = usePathname();
  const locale = pathname?.split("/")[1] ?? "ko";
  const t = useTranslations();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-[#fbfbfd]">
      <h2 className="text-xl font-semibold text-neutral-900 mb-2">{t("common.error.title")}</h2>
      <p className="text-neutral-600 mb-6 text-center max-w-md">{t("common.error.description")}</p>
      <div className="flex gap-3">
        <button
          onClick={reset}
          className="px-6 py-3 rounded-full bg-black text-white text-sm font-medium hover:bg-black/80 transition-colors"
          aria-label={t("common.error.retry")}
        >
          {t("common.error.retry")}
        </button>
        <Link
          href={`/${locale}/www`}
          className="px-6 py-3 rounded-full border border-neutral-300 text-neutral-700 text-sm font-medium hover:bg-neutral-50 transition-colors"
        >
          {t("common.error.home")}
        </Link>
      </div>
    </div>
  );
}
