"use client";

import { useTranslations } from "@/components/LocaleProvider";

/** 기능 카드 하단 "이런 분께" (Squarespace "Great for" 벤치마크) */
export function FeatureGreatFor({ featureKey }: { featureKey: string }) {
  const t = useTranslations();
  const label = t("www.features.greatFor");
  const value = t(`www.features.${featureKey}`);
  if (!value || value.startsWith("www.")) return null;
  return (
    <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
      {label}: {value}
    </p>
  );
}
