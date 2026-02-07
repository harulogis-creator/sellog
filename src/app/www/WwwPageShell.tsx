"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "@/components/LocaleProvider";

type PageKey = "join" | "login" | "signup" | "check";

const layoutMap = {
  join: {
    main: "min-h-screen bg-[#fafafa] py-8 sm:py-12 px-4 sm:px-6",
    inner: "max-w-md mx-auto",
  },
  login: {
    main: "min-h-screen bg-[#fafafa] flex flex-col items-center justify-center py-12 px-4",
    inner: "w-full max-w-sm",
  },
  signup: {
    main: "min-h-screen bg-[#fafafa] flex flex-col items-center justify-center py-12 px-4",
    inner: "w-full max-w-sm",
  },
  check: {
    main: "min-h-screen bg-slate-50 py-12 px-4",
    inner: "max-w-md mx-auto space-y-6",
  },
} as const;

export function WwwPageShell({
  pageKey,
  children,
}: {
  pageKey: PageKey;
  children: React.ReactNode;
}) {
  const params = useParams();
  const locale = (params?.domain as string) ?? "ko";
  const t = useTranslations();
  const base = `www.pages.${pageKey}` as const;
  const layout = layoutMap[pageKey];
  const basePath = `/${locale}/www`;

  return (
    <main className={layout.main}>
      <div className={layout.inner}>
        <nav className={pageKey === "check" ? undefined : "mb-8"}>
          <Link
            href={basePath}
            className="inline-flex items-center gap-1.5 text-[15px] text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            <span className="text-lg leading-none">←</span>
            {t(`${base}.backToMain`)}
          </Link>
        </nav>
        <h1
          className={
            pageKey === "check"
              ? "text-xl font-bold text-slate-900"
              : "text-4xl sm:text-[2.75rem] font-semibold text-neutral-900 tracking-tight mb-2"
          }
        >
          {t(`${base}.title`)}
        </h1>
        {pageKey !== "check" && (
          <p className="text-[15px] text-neutral-500 mb-8 leading-relaxed">
            {t(`${base}.description`)}
          </p>
        )}
        {children}
        {pageKey === "join" && (
          <p className="mt-6 text-center text-[13px] text-neutral-500">
            {t(`${base}.needLogin`)}{" "}
            <Link
              href={`${basePath}/login`}
              className="text-neutral-900 font-medium underline underline-offset-2"
            >
              {t(`${base}.loginLink`)}
            </Link>{" "}
            {t(`${base}.loginSuffix`)}
          </p>
        )}
        {pageKey === "login" && (
          <p className="text-center text-[13px] text-neutral-500 mt-6">
            {t(`${base}.noAccount`)}{" "}
            <Link
              href={`${basePath}/signup`}
              className="text-neutral-900 font-medium underline underline-offset-2 hover:no-underline"
            >
              {t(`${base}.signupLink`)}
            </Link>
          </p>
        )}
        {pageKey === "signup" && (
          <p className="text-center text-[13px] text-neutral-500 mt-6">
            {t(`${base}.haveAccount`)}{" "}
            <Link
              href={`${basePath}/login`}
              className="text-neutral-900 font-medium underline underline-offset-2"
            >
              {t(`${base}.loginLink`)}
            </Link>
          </p>
        )}
      </div>
    </main>
  );
}
