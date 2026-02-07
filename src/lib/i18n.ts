/**
 * i18n: locale 타입·쿠키 키. 메시지는 messages/{locale}.json 에서 로드.
 */
export const LOCALE_COOKIE = "sellog_locale";
export type Locale = "ko" | "en";
export const DEFAULT_LOCALE: Locale = "ko";
export const LOCALES: Locale[] = ["ko", "en"];

export function isValidLocale(value: string): value is Locale {
  return LOCALES.includes(value as Locale);
}

/** 클라이언트 전용: 쿠키에서 locale 읽기 (document.cookie 사용) */
export function getLocaleFromCookie(): Locale {
  if (typeof document === "undefined") return DEFAULT_LOCALE;
  const match = document.cookie.match(new RegExp(`(?:^|; )${LOCALE_COOKIE}=([^;]*)`));
  const value = match?.[1]?.trim();
  return value && isValidLocale(value) ? value : DEFAULT_LOCALE;
}
