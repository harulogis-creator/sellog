"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "@/components/LocaleProvider";
import { Button } from "@/components/ui/button";

/** FAQ 직후 24/7 Support 스타일 블록 (Squarespace 벤치마크) */
export function WwwSupportBlock() {
  const params = useParams();
  const locale = (params?.domain as string) ?? "ko";
  const basePath = `/${locale}/www`;
  const t = useTranslations();

  return (
    <section className="border-t border-neutral-200 bg-white py-12 sm:py-16" aria-labelledby="support-heading">
      <div className="mx-auto max-w-3xl px-6 sm:px-8">
        <h2 id="support-heading" className="text-xl font-bold tracking-tight text-neutral-900 text-center">
          {t("www.support.blockTitle")}
        </h2>
        <p className="mt-4 text-center text-sm text-neutral-600">
          <Link href={`${basePath}#faq`} className="font-medium text-neutral-900 underline underline-offset-2 hover:no-underline">
            {t("www.footer.faq")}
          </Link>
          {" · "}
          <Link href={`${basePath}/check`} className="font-medium text-neutral-900 underline underline-offset-2 hover:no-underline">
            {t("www.footer.connectionCheck")}
          </Link>
          {" — "}
          {t("www.footer.supportBlurb")}
        </p>
        <div className="mt-6 flex justify-center">
          <Button size="sm" variant="outline" asChild>
            <Link href={`${basePath}/join`}>{t("www.support.cta")}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
