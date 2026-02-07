"use client";

import { useLocale } from "@/components/LocaleProvider";

interface BlogSectionHeaderProps {
  messageKey: string;
  className?: string;
}

export function BlogSectionHeader({ messageKey, className = "" }: BlogSectionHeaderProps) {
  const { t } = useLocale();
  return (
    <h2 className={`text-xs font-medium text-neutral-500 uppercase tracking-wider ${className}`}>
      {t(messageKey)}
    </h2>
  );
}
