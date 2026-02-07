"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "@/components/LocaleProvider";
import { Button } from "@/components/ui/button";

interface WwwHeroProps {
  myBlog: { subdomain: string; name: string } | null;
}

export function WwwHero({ myBlog }: WwwHeroProps) {
  const params = useParams();
  const locale = (params?.domain as string) ?? "ko";
  const t = useTranslations();

  return (
    <section className="relative overflow-hidden px-6 pt-16 pb-24 sm:px-8 sm:pt-24 sm:pb-32 bg-gradient-to-b from-neutral-50/80 to-[#fafafa] dark:from-neutral-900/50 dark:to-background">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-5xl md:text-6xl md:leading-[1.1]">
          {t("www.hero.title")}
        </h1>
        <p className="mt-6 text-lg text-neutral-600 dark:text-neutral-400 sm:text-xl max-w-2xl mx-auto leading-relaxed">
          {t("www.hero.description")}
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          {myBlog ? (
            <Button size="lg" className="min-w-[200px]" asChild>
              <Link href={`/${encodeURIComponent(myBlog.subdomain)}`}>
                내 블로그 가기 → {myBlog.name}
              </Link>
            </Button>
          ) : (
            <Button size="lg" className="min-w-[200px]" asChild>
              <Link href={`/${locale}/www/join`}>{t("www.hero.cta")}</Link>
            </Button>
          )}
          <Button variant="outline" size="lg" className="min-w-[180px]" asChild>
            <Link href={`/${locale}/www#features`}>{t("www.nav.features")}</Link>
          </Button>
        </div>
        <p className="mt-6 text-sm text-neutral-500 dark:text-neutral-400">{t("www.hero.ctaSub")}</p>
        <p className="mt-4 text-sm font-medium text-neutral-600 dark:text-neutral-400 italic">
          {t("www.hero.tagline")}
        </p>
      </div>
    </section>
  );
}
