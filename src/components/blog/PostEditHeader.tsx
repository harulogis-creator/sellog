"use client";

import Link from "next/link";
import { useLocale } from "@/components/LocaleProvider";
import { Button } from "@/components/ui/button";

interface PostEditHeaderProps {
  domain: string;
  slug: string;
}

export function PostEditHeader({ domain, slug }: PostEditHeaderProps) {
  const { t } = useLocale();

  return (
    <header className="border-b border-neutral-200/60 bg-white/80 backdrop-blur-2xl px-6 py-5 sm:px-8 flex items-center justify-between flex-wrap gap-4">
      <Link
        href={`/${domain}/post/${slug}`}
        className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
      >
        ← {t("blog.editPost.backToView")}
      </Link>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" asChild>
          <Link href={`/${domain}/posts`}>{t("blog.listLabel.default")}</Link>
        </Button>
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/${domain}`}>{t("blog.nav.home")}</Link>
        </Button>
      </div>
    </header>
  );
}
