"use client";

import { useTranslations } from "@/components/LocaleProvider";

const STEPS = [
  { key: "1", titleKey: "www.how.step1Title", textKey: "www.how.step1Text" },
  { key: "2", titleKey: "www.how.step2Title", textKey: "www.how.step2Text" },
  { key: "3", titleKey: "www.how.step3Title", textKey: "www.how.step3Text" },
] as const;

/** 시작하는 방법 3단계 (Squarespace/Manus How-to 벤치마크 반영, i18n) */
export function WwwHowToStart() {
  const t = useTranslations();

  return (
    <section id="how" className="border-t border-neutral-200 py-16 sm:py-24 bg-neutral-50/30">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl text-center">
          {t("www.how.title")}
        </h2>
        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {STEPS.map(({ key, titleKey, textKey }) => (
            <div key={key} className="relative text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-neutral-900 text-white font-semibold text-lg">
                {key}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-neutral-900">{t(titleKey)}</h3>
              <p className="mt-2 text-sm text-neutral-600">{t(textKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
