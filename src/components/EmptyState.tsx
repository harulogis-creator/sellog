"use client";

import Link from "next/link";
import { useLocale } from "@/components/LocaleProvider";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  /** 제목 (titleKey 없을 때 사용) */
  title?: string;
  /** 제목 메시지 키 (우선) */
  titleKey?: string;
  /** 설명 (descriptionKey 없을 때 사용) */
  description?: string;
  /** 설명 메시지 키 (우선) */
  descriptionKey?: string;
  /** 링크 버튼. labelKey 있으면 t(labelKey), 없으면 label 사용 */
  action?: { href: string; label?: string; labelKey?: string };
  className?: string;
}

/**
 * 빈 목록·빈 화면일 때 표시할 공통 UI.
 * titleKey/descriptionKey/labelKey 사용 시 locale 반영.
 */
export function EmptyState({
  title,
  titleKey,
  description,
  descriptionKey,
  action,
  className = "",
}: EmptyStateProps) {
  const { t } = useLocale();
  const titleText = titleKey ? t(titleKey) : title ?? "";
  const descriptionText = descriptionKey ? t(descriptionKey) : description;
  const actionLabel = action?.labelKey ? t(action.labelKey) : action?.label;

  return (
    <div
      className={`flex flex-col items-center justify-center py-14 px-6 text-center rounded-3xl bg-neutral-50/80 border border-neutral-200/60 ${className}`}
      role="status"
      aria-label={`${titleText}. ${descriptionText ?? ""}`}
    >
      <p className="text-[15px] font-medium text-neutral-900">{titleText}</p>
      {descriptionText && <p className="mt-1 text-sm text-neutral-500 max-w-sm">{descriptionText}</p>}
      {action && actionLabel && (
        <Button size="sm" className="mt-5" asChild>
          <Link href={action.href}>{actionLabel}</Link>
        </Button>
      )}
    </div>
  );
}
