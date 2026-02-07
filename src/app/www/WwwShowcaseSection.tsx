"use client";

import Link from "next/link";
import { useTranslations } from "@/components/LocaleProvider";

type Blog = { subdomain: string; name: string };

/** Sellog로 만든 블로그 쇼케이스 (벤치마크 서브타이틀 반영, i18n) */
export function WwwShowcaseSection({ publicBlogs }: { publicBlogs: Blog[] }) {
  const t = useTranslations();

  if (publicBlogs.length === 0) return null;

  return (
    <section className="border-t border-neutral-200 bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl text-center">
          {t("www.showcase.title")}
        </h2>
        <p className="mt-4 text-center text-neutral-600 max-w-xl mx-auto">
          {t("www.showcase.subtitle")}
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {publicBlogs.map((b) => (
            <Link
              key={b.subdomain}
              href={`/${encodeURIComponent(b.subdomain)}`}
              className="block rounded-xl border border-neutral-200 bg-neutral-50/50 p-5 hover:shadow-md hover:border-neutral-300 transition-all"
            >
              <p className="font-semibold text-neutral-900">{b.name}</p>
              <p className="text-sm text-neutral-500 mt-0.5">/{b.subdomain}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
