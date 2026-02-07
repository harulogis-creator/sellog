"use client";

import Link from "next/link";
import { useLocale } from "@/components/LocaleProvider";
import { Button } from "@/components/ui/button";

interface DomainHeaderProps {
  domain: string;
  blogName: string;
  /** 헤더 오른쪽에 표시할 내용 (예: 새 글 쓰기, 상품 관리 버튼) */
  actions?: React.ReactNode;
  /** 현재 페이지 제목 (선택, 작은 글씨로 표시) - subtitleKey가 있으면 무시 */
  subtitle?: string;
  /** 제목 메시지 키 (우선) */
  subtitleKey?: string;
  /** true면 "← 블로그명" 돌아가기 링크 표시 (메인에서는 false) */
  showBackLink?: boolean;
  /** 목록 버튼 링크 (넣으면 목록·홈 네비 표시) */
  listHref?: string;
  /** 목록 버튼 텍스트 (기본: 목록) - listLabelKey가 있으면 무시 */
  listLabel?: string;
  /** 목록 버튼 메시지 키 (우선) */
  listLabelKey?: string;
  /** 액션 버튼 1개 (키 + href) - 있으면 actions 대신 이걸로 렌더 */
  actionConfig?: { labelKey: string; href: string };
}

/**
 * [domain] 블로그·에디터·상품 페이지 공통 헤더
 * 반응형: 제목 + 액션 버튼 그룹. subtitleKey/listLabelKey 사용 시 locale 반영.
 */
export function DomainHeader({
  domain,
  blogName,
  actions,
  subtitle,
  subtitleKey,
  showBackLink = true,
  listHref,
  listLabel,
  listLabelKey,
  actionConfig,
}: DomainHeaderProps) {
  const { t } = useLocale();

  const subtitleText = subtitleKey ? t(subtitleKey) : subtitle;
  const listLabelText = listLabelKey ? t(listLabelKey) : listLabel ?? t("blog.listLabel.default");

  const navLinks =
    listHref != null ? (
      <>
        <Button variant="outline" size="sm" asChild>
          <Link href={listHref}>{listLabelText}</Link>
        </Button>
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/${domain}`}>{t("blog.nav.home")}</Link>
        </Button>
      </>
    ) : null;

  const renderedActions = actionConfig ? (
    <Button size="sm" asChild>
      <Link href={actionConfig.href}>{t(actionConfig.labelKey)}</Link>
    </Button>
  ) : (
    actions
  );

  return (
    <header className="border-b border-neutral-200/60 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/90 backdrop-blur-2xl px-6 py-5 sm:px-8 flex items-center justify-between flex-wrap gap-4" role="banner">
      <div className="min-w-0">
        {showBackLink && (
          <Link
            href={`/${domain}`}
            className="text-[13px] text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors duration-200"
            aria-label={`${blogName} ${t("blog.aria.backToBlog")}`}
          >
            ← {blogName}
          </Link>
        )}
        {subtitleText ? (
          <p className={`text-sm font-medium text-neutral-700 dark:text-neutral-300 tracking-tight ${showBackLink ? "mt-1" : ""}`}>{subtitleText}</p>
        ) : (
          <h1 className={`text-xl sm:text-2xl font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight truncate ${showBackLink ? "mt-1" : ""}`}>
            {blogName}
          </h1>
        )}
      </div>
      <div className="flex items-center gap-3 shrink-0">
        {navLinks}
        {renderedActions}
      </div>
    </header>
  );
}
