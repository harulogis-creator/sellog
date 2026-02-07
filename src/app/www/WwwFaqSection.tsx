"use client";

import { useTranslations } from "@/components/LocaleProvider";

const FAQ_IDS = [1, 2, 3, 4, 5, 6] as const;

/** FAQ 섹션 (제목·본문 전부 i18n) */
export function WwwFaqSection() {
  const t = useTranslations();

  return (
    <section id="faq" className="border-t border-neutral-200 bg-neutral-50/30 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-6 sm:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl text-center">
          {t("www.faq.title")}
        </h2>
        <div className="mt-12 space-y-8">
          {FAQ_IDS.map((n) => (
            <div key={n}>
              <h3 className="text-base font-semibold text-neutral-900">{t(`www.faq.q${n}`)}</h3>
              <p className="mt-2 text-sm text-neutral-600 leading-relaxed">{t(`www.faq.a${n}`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
