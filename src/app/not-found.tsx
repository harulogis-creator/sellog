import { cookies } from "next/headers";
import Link from "next/link";
import { isValidLocale } from "@/lib/i18n";
import ko from "@/messages/ko.json";
import en from "@/messages/en.json";

type CommonNotFound = { title: string; description: string; home: string };
const messages = {
  ko: (ko as { common: { notFound: CommonNotFound } }).common.notFound,
  en: (en as { common: { notFound: CommonNotFound } }).common.notFound,
};

export default function NotFound() {
  const cookieStore = cookies();
  const localeRaw = cookieStore.get("sellog_locale")?.value;
  const locale = localeRaw && isValidLocale(localeRaw) ? localeRaw : "ko";
  const m = messages[locale];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-[#fbfbfd]">
      <h1 className="text-2xl font-semibold text-neutral-900 mb-2">{m.title}</h1>
      <p className="text-neutral-600 mb-6">{m.description}</p>
      <Link
        href={`/${locale}/www`}
        className="px-6 py-3 rounded-full bg-black text-white text-sm font-medium hover:bg-black/80 transition-colors"
      >
        {m.home}
      </Link>
    </div>
  );
}
