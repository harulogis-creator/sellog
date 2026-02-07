import type { Metadata } from "next";
import { getBaseUrl } from "@/lib/site";
import { isValidLocale } from "@/lib/i18n";
import ko from "@/messages/ko.json";
import en from "@/messages/en.json";
import { CreateBlogForm } from "@/app/www/join/CreateBlogForm";
import { WwwPageShell } from "@/app/www/WwwPageShell";

const messages = {
  ko: (ko as { www: { pages: { join: { metaTitle: string; metaDescription: string } } } }).www.pages.join,
  en: (en as { www: { pages: { join: { metaTitle: string; metaDescription: string } } } }).www.pages.join,
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
      canonical: `${base}/${loc}/www/join`,
      languages: { ko: `${base}/ko/www/join`, en: `${base}/en/www/join` },
    },
  };
}

export default function JoinPage() {
  return (
    <WwwPageShell pageKey="join">
      <div className="rounded-3xl bg-white shadow-lg shadow-neutral-200/50 border border-neutral-200/60 p-6 sm:p-8">
        <CreateBlogForm />
      </div>
    </WwwPageShell>
  );
}
