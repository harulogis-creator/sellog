"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "@/components/LocaleProvider";
import { Button } from "@/components/ui/button";

/** Final CTA 섹션 (i18n) */
export function WwwFinalCtaSection() {
  const params = useParams();
  const locale = (params?.domain as string) ?? "ko";
  const t = useTranslations();

  return (
    <section className="border-t border-neutral-200 bg-neutral-900 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-6 sm:px-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {t("www.cta.title")}
        </h2>
        <p className="mt-4 text-neutral-300">{t("www.cta.subtitle")}</p>
        <div className="mt-8">
          <Button
            size="lg"
            className="min-w-[200px] bg-white text-neutral-900 hover:bg-neutral-100"
            asChild
          >
            <Link href={`/${locale}/www/join`}>{t("www.cta.cta")}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
