"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useTranslations } from "@/components/LocaleProvider";

const STORAGE_KEY = "sellog-announcement-dismissed";

/** 상단 프로모 배너 (Squarespace 벤치마크, i18n) */
export function AnnouncementBar() {
  const params = useParams();
  const locale = (params?.domain as string) ?? "ko";
  const t = useTranslations();
  const [mounted, setMounted] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      if (localStorage.getItem(STORAGE_KEY)) setDismissed(true);
    } catch {
      // ignore
    }
  }, []);

  function dismiss() {
    setDismissed(true);
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore
    }
  }

  if (!mounted || dismissed) return null;

  return (
    <div className="bg-neutral-900 text-white text-center py-2.5 px-4 relative" role="banner">
      <p className="text-sm">
        <span className="font-medium">{t("www.banner.title")}</span>
        {" "}
        {t("www.banner.description")}
        {" "}
        <Link href={`/${locale}/www/join`} className="underline underline-offset-2 hover:no-underline font-medium">
          {t("www.banner.cta")} →
        </Link>
      </p>
      <button
        type="button"
        onClick={dismiss}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-white/10 transition-colors"
        aria-label={t("www.banner.closeLabel")}
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
