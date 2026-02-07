"use client";

import { useTranslations } from "@/components/LocaleProvider";

/** 고객 인용 2건 (Squarespace 벤치마크, i18n) */
export function WwwTestimonialSection() {
  const t = useTranslations();

  return (
    <section
      className="border-t border-neutral-200 bg-neutral-50/50 py-16 sm:py-20"
      aria-labelledby="testimonial-heading"
    >
      <div className="mx-auto max-w-4xl px-6 sm:px-8">
        <h2 id="testimonial-heading" className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl text-center">
          {t("www.testimonial.title")}
        </h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          <blockquote className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
            <p className="text-neutral-700 text-sm leading-relaxed">
              &ldquo;{t("www.testimonial.quote1")}&rdquo;
            </p>
            <footer className="mt-4 text-sm font-medium text-neutral-900">
              — {t("www.testimonial.author1")}
            </footer>
          </blockquote>
          <blockquote className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
            <p className="text-neutral-700 text-sm leading-relaxed">
              &ldquo;{t("www.testimonial.quote2")}&rdquo;
            </p>
            <footer className="mt-4 text-sm font-medium text-neutral-900">
              — {t("www.testimonial.author2")}
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
