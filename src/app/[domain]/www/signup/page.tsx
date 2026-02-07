import type { Metadata } from "next";
import { getBaseUrl } from "@/lib/site";
import { isValidLocale } from "@/lib/i18n";
import ko from "@/messages/ko.json";
import en from "@/messages/en.json";
import { SignupForm } from "@/app/www/signup/SignupForm";
import { WwwPageShell } from "@/app/www/WwwPageShell";

const messages = {
  ko: (ko as { www: { pages: { signup: { metaTitle: string; metaDescription: string } } } }).www.pages.signup,
  en: (en as { www: { pages: { signup: { metaTitle: string; metaDescription: string } } } }).www.pages.signup,
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
      canonical: `${base}/${loc}/www/signup`,
      languages: { ko: `${base}/ko/www/signup`, en: `${base}/en/www/signup` },
    },
  };
}

export default function SignupPage() {
  return (
    <WwwPageShell pageKey="signup">
      <div className="rounded-3xl bg-white shadow-lg shadow-neutral-200/50 border border-neutral-200/60 p-6 sm:p-8">
        <SignupForm />
      </div>
    </WwwPageShell>
  );
}
