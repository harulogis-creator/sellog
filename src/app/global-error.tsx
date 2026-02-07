"use client";

import { getLocaleFromCookie } from "@/lib/i18n";
import ko from "@/messages/ko.json";
import en from "@/messages/en.json";

type CommonError = { title: string; description: string; retry: string; home: string };
const messages: Record<string, CommonError> = {
  ko: (ko as { common: { error: CommonError } }).common.error,
  en: (en as { common: { error: CommonError } }).common.error,
};

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const locale = getLocaleFromCookie();
  const m = messages[locale] ?? messages.ko;

  return (
    <html lang={locale}>
      <body style={{ margin: 0, fontFamily: "system-ui, sans-serif", background: "#fafafa" }}>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
          }}
          role="alert"
        >
          <h2 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "0.5rem", color: "#171717" }}>
            {m.title}
          </h2>
          <p style={{ color: "#525252", marginBottom: "1.5rem", textAlign: "center", maxWidth: "28rem" }}>
            {m.description}
          </p>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
            <button
              type="button"
              onClick={reset}
              style={{
                padding: "0.75rem 1.5rem",
                borderRadius: "9999px",
                background: "#000",
                color: "#fff",
                border: "none",
                cursor: "pointer",
                fontSize: "0.875rem",
                fontWeight: 500,
              }}
              aria-label={m.retry}
            >
              {m.retry}
            </button>
            <a
              href={`/${locale}/www`}
              style={{
                padding: "0.75rem 1.5rem",
                borderRadius: "9999px",
                border: "2px solid #e5e5e5",
                color: "#404040",
                fontSize: "0.875rem",
                fontWeight: 500,
                textDecoration: "none",
              }}
              aria-label={m.home}
            >
              {m.home}
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
