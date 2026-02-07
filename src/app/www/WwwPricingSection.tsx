"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "@/components/LocaleProvider";
import { Button } from "@/components/ui/button";

/** 가격 섹션 (i18n) */
export function WwwPricingSection() {
  const params = useParams();
  const locale = (params?.domain as string) ?? "ko";
  const t = useTranslations();

  return (
    <section id="pricing" className="border-t border-neutral-200 bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-2xl px-6 sm:px-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
          {t("www.pricing.title")}
        </h2>
        <p className="mt-4 text-neutral-600">{t("www.pricing.subtitle")}</p>
        <div className="mt-8">
          <Button size="lg" className="min-w-[200px]" asChild>
            <Link href={`/${locale}/www/join`}>{t("www.pricing.cta")}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
