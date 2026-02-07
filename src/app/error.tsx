"use client";

import Link from "next/link";
import { useEffect } from "react";
import { getLocaleFromCookie } from "@/lib/i18n";
import ko from "@/messages/ko.json";
import en from "@/messages/en.json";

type CommonError = { title: string; description: string; retry: string; home: string };
const messages = {
  ko: (ko as { common: { error: CommonError } }).common.error,
  en: (en as { common: { error: CommonError } }).common.error,
};

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const locale = getLocaleFromCookie();
  const m = messages[locale];

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-8 bg-background text-foreground"
      role="alert"
      aria-live="assertive"
    >
      <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
        {m.title}
      </h2>
      <p className="text-neutral-600 dark:text-neutral-400 mb-6 text-center max-w-md">
        {m.description}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="px-6 py-3 rounded-full bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-sm font-medium hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-900 dark:focus:ring-neutral-100"
          aria-label={m.retry}
        >
          {m.retry}
        </button>
        <Link
          href={`/${locale}/www`}
          className="px-6 py-3 rounded-full border-2 border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 text-sm font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-400"
          aria-label={m.home}
        >
          {m.home}
        </Link>
      </div>
    </div>
  );
}
