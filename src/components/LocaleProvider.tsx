"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { DEFAULT_LOCALE, isValidLocale, LOCALE_COOKIE, type Locale } from "@/lib/i18n";
import ko from "@/messages/ko.json";
import en from "@/messages/en.json";

const messages: Record<Locale, Record<string, unknown>> = { ko, en };

function getNested(obj: Record<string, unknown>, path: string): string | undefined {
  const value = path.split(".").reduce<unknown>((acc, part) => {
    if (acc == null || typeof acc !== "object") return undefined;
    return (acc as Record<string, unknown>)[part];
  }, obj);
  return typeof value === "string" ? value : undefined;
}

type LocaleContextValue = {
  locale: Locale;
  setLocale: (next: Locale) => void;
  t: (key: string) => string;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

function getLocaleFromCookie(): Locale {
  if (typeof document === "undefined") return DEFAULT_LOCALE;
  const match = document.cookie.match(new RegExp(`(?:^|; )${LOCALE_COOKIE}=([^;]*)`));
  const value = match?.[1]?.trim();
  return value && isValidLocale(value) ? value : DEFAULT_LOCALE;
}

function setLocaleCookie(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale};path=/;max-age=31536000;SameSite=Lax`;
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setLocaleState(getLocaleFromCookie());
    setMounted(true);
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleCookie(next);
    setLocaleState(next);
  }, []);

  const t = useCallback(
    (key: string): string => {
      if (!mounted) {
        const fallback = getNested(messages[DEFAULT_LOCALE] as Record<string, unknown>, key);
        return fallback ?? key;
      }
      const msg = getNested(messages[locale] as Record<string, unknown>, key);
      return msg ?? getNested(messages[DEFAULT_LOCALE] as Record<string, unknown>, key) ?? key;
    },
    [locale, mounted]
  );

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    return {
      locale: DEFAULT_LOCALE as Locale,
      setLocale: () => {},
      t: (key: string) => key,
    };
  }
  return ctx;
}

export function useTranslations() {
  const { t } = useLocale();
  return t;
}
