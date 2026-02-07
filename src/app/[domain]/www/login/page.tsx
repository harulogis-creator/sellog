import type { Metadata } from "next";
import { getBaseUrl } from "@/lib/site";
import { isValidLocale } from "@/lib/i18n";
import ko from "@/messages/ko.json";
import en from "@/messages/en.json";
import { LoginForm } from "@/app/www/login/LoginForm";
import { LoginErrorAlert } from "@/app/www/login/LoginErrorAlert";
import { WwwPageShell } from "@/app/www/WwwPageShell";

const messages = {
  ko: (ko as { www: { pages: { login: { metaTitle: string; metaDescription: string } } } }).www.pages.login,
  en: (en as { www: { pages: { login: { metaTitle: string; metaDescription: string } } } }).www.pages.login,
};

export async function generateMetadata({
  params,
}: {
  params: { domain: string };
}): Promise<Metadata> {
  const loc = isValidLocale(params.domain) ? params.domain : "ko";
  const m = messages[loc];
  const base = getBaseUrl();
  return {
    title: m.metaTitle,
    description: m.metaDescription,
    alternates: {
      canonical: `${base}/${loc}/www/login`,
      languages: { ko: `${base}/ko/www/login`, en: `${base}/en/www/login` },
    },
  };
}

export default function LoginPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  const queryError = searchParams?.error;

  return (
    <WwwPageShell pageKey="login">
      {queryError && (
        <div className="mb-4">
          <LoginErrorAlert message={queryError} />
        </div>
      )}
      <div className="rounded-3xl bg-white shadow-lg shadow-neutral-200/50 border border-neutral-200/60 p-6 sm:p-8">
        <LoginForm />
      </div>
    </WwwPageShell>
  );
}
