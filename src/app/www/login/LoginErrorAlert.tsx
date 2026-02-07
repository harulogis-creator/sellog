"use client";

import { useTranslations } from "@/components/LocaleProvider";

const KNOWN_ERROR_KEYS = ["no_code", "config", "unknown"] as const;

export function LoginErrorAlert({ message }: { message: string }) {
  const t = useTranslations();
  const key = KNOWN_ERROR_KEYS.includes(message as (typeof KNOWN_ERROR_KEYS)[number])
    ? `www.auth.errors.${message}`
    : null;
  const translated = key ? t(key) : null;
  const text = key && translated !== key ? translated : message;

  return (
    <div
      className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
      role="alert"
    >
      {text}
    </div>
  );
}
