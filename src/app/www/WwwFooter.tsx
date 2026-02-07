"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useLocale } from "@/components/LocaleProvider";
import type { Locale } from "@/lib/i18n";

const productLinkKeys = [
  { path: "#features", key: "www.nav.features" },
  { path: "#how", key: "www.nav.how" },
  { path: "#pricing", key: "www.nav.pricing" },
  { path: "/check", key: "www.footer.connectionCheck" },
] as const;

const supportLinkKeys = [
  { path: "/check", key: "www.footer.connectionCheck" },
  { path: "#faq", key: "www.footer.faq" },
  { path: "#", key: "www.footer.docs" },
  { path: "#", key: "www.footer.contact" },
] as const;

const companyLinkKeys = [
  { path: "#features", key: "www.footer.about" },
  { path: "#", key: "www.footer.contact" },
] as const;

export function WwwFooter() {
  const params = useParams();
  const router = useRouter();
  const pathLocale = (params?.domain as string) ?? "ko";
  const basePath = `/${pathLocale}/www`;
  const { locale, setLocale, t } = useLocale();

  const handleLocaleChange = (next: Locale) => {
    setLocale(next);
    router.push(`/${next}/www`);
  };

  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50/80 dark:bg-neutral-900/50" role="contentinfo">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 py-12 sm:py-16">
        <div className="mb-12 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 p-6 sm:p-8">
          <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
            {t("www.footer.needHelp")}
          </p>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            <Link href={`${basePath}#faq`} className="text-neutral-900 dark:text-neutral-100 font-medium underline underline-offset-2 hover:no-underline">
              {t("www.footer.faq")}
            </Link>
            {" · "}
            <Link href={`${basePath}/check`} className="text-neutral-900 dark:text-neutral-100 font-medium underline underline-offset-2 hover:no-underline">
              {t("www.footer.connectionCheck")}
            </Link>
            {" — "}
            {t("www.footer.supportBlurb")}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-5 sm:gap-12">
          <div>
            <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-4">{t("www.footer.product")}</p>
            <ul className="space-y-3">
              {productLinkKeys.map(({ path, key }) => (
                <li key={path + key}>
                  <Link href={`${basePath}${path}`} className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
                    {t(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-4">{t("www.footer.support")}</p>
            <ul className="space-y-3">
              {supportLinkKeys.map(({ path, key }) => (
                <li key={key}>
                  <Link href={path === "#" ? "#" : `${basePath}${path}`} className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
                    {t(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-4">{t("www.footer.company")}</p>
            <ul className="space-y-3">
              {companyLinkKeys.map(({ path, key }) => (
                <li key={key}>
                  <Link href={path === "#" ? "#" : `${basePath}${path}`} className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
                    {t(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-4">{t("www.footer.follow")}</p>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">{t("www.footer.comingSoon")}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-4">{t("www.footer.language")}</p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => handleLocaleChange("ko")}
                className={`text-sm px-2 py-1 rounded transition-colors ${locale === "ko" ? "bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 font-medium" : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"}`}
                aria-pressed={locale === "ko"}
                aria-label={t("www.footer.ariaLabelKorean")}
              >
                {t("www.footer.korean")}
              </button>
              <button
                type="button"
                onClick={() => handleLocaleChange("en")}
                className={`text-sm px-2 py-1 rounded transition-colors ${locale === "en" ? "bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 font-medium" : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"}`}
                aria-pressed={locale === "en"}
                aria-label={t("www.footer.ariaLabelEnglish")}
              >
                {t("www.footer.english")}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-700 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            © {new Date().getFullYear()} Sellog. {t("www.footer.copyright")}
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-xs text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200">
              {t("www.footer.termsOfService")}
            </Link>
            <Link href="#" className="text-xs text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200">
              {t("www.footer.privacyPolicy")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
