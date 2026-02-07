"use client";

import { useLocale } from "@/components/LocaleProvider";

export function SettingsProfileDesc() {
  const { t } = useLocale();
  return (
    <p className="text-sm text-neutral-500">
      {t("blog.section.myProfileDesc")}
    </p>
  );
}
