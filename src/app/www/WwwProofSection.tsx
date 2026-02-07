"use client";

import { useTranslations } from "@/components/LocaleProvider";

/** 사회적 증거 3칸 (i18n) */
export function WwwProofSection() {
  const t = useTranslations();

  return (
    <section className="border-t border-neutral-200 bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <div className="grid grid-cols-3 gap-8 text-center">
          <div>
            <p className="text-3xl sm:text-4xl font-bold text-neutral-900">{t("www.proof.label1")}</p>
            <p className="mt-1 text-sm text-neutral-500">{t("www.proof.sublabel1")}</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-bold text-neutral-900">{t("www.proof.label2")}</p>
            <p className="mt-1 text-sm text-neutral-500">{t("www.proof.sublabel2")}</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-bold text-neutral-900">{t("www.proof.label3")}</p>
            <p className="mt-1 text-sm text-neutral-500">{t("www.proof.sublabel3")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
