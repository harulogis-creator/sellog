import type { Metadata } from "next";
import { createClient } from "@/utils/supabase/server";
import { getBaseUrl } from "@/lib/site";
import { isValidLocale } from "@/lib/i18n";
import ko from "@/messages/ko.json";
import en from "@/messages/en.json";
import { WwwPageShell } from "@/app/www/WwwPageShell";

type CheckMessages = {
  metaTitle: string;
  metaDescription: string;
  dbCheckLabel: string;
  successMessage: string;
  envHint: string;
};
const messages: { ko: CheckMessages; en: CheckMessages } = {
  ko: (ko as { www: { pages: { check: CheckMessages } } }).www.pages.check,
  en: (en as { www: { pages: { check: CheckMessages } } }).www.pages.check,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ domain: string }>;
}): Promise<Metadata> {
  const { domain } = await params;
  const loc = isValidLocale(domain) ? domain : "ko";
  const m = messages[loc];
  const base = getBaseUrl();
  return {
    title: m.metaTitle,
    description: m.metaDescription,
    alternates: {
      canonical: `${base}/${loc}/www/check`,
      languages: { ko: `${base}/ko/www/check`, en: `${base}/en/www/check` },
    },
  };
}

export default async function CheckPage({
  params,
}: {
  params: Promise<{ domain: string }>;
}) {
  const { domain } = await params;
  const loc = isValidLocale(domain) ? domain : "ko";
  const m = messages[loc];

  const hasUrl = !!process.env.NEXT_PUBLIC_SUPABASE_URL;
  const hasKey = !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  let dbOk = false;
  let dbError = "";

  if (hasUrl && hasKey) {
    try {
      const supabase = await createClient();
      const { error } = await supabase.from("blogs").select("id").limit(1);
      dbOk = !error;
      if (error) dbError = error.message;
    } catch (e) {
      dbError = e instanceof Error ? e.message : String(e);
    }
  }

  return (
    <WwwPageShell pageKey="check">
      <ul className="space-y-2 text-sm">
        <li className="flex items-center gap-2">
          {hasUrl ? (
            <span className="text-green-600">✓</span>
          ) : (
            <span className="text-red-600">✗</span>
          )}
          <span>NEXT_PUBLIC_SUPABASE_URL</span>
        </li>
        <li className="flex items-center gap-2">
          {hasKey ? (
            <span className="text-green-600">✓</span>
          ) : (
            <span className="text-red-600">✗</span>
          )}
          <span>NEXT_PUBLIC_SUPABASE_ANON_KEY</span>
        </li>
        <li className="flex items-center gap-2">
          {!hasUrl || !hasKey ? (
            <span className="text-slate-400">-</span>
          ) : dbOk ? (
            <span className="text-green-600">✓</span>
          ) : (
            <span className="text-red-600">✗</span>
          )}
          <span>{m.dbCheckLabel}</span>
        </li>
      </ul>

      {dbError && (
        <p className="p-3 rounded-lg bg-red-50 text-red-800 text-sm">{dbError}</p>
      )}

      {hasUrl && hasKey && dbOk && (
        <p className="text-green-700 text-sm">{m.successMessage}</p>
      )}

      {(!hasUrl || !hasKey) && (
        <p className="text-slate-600 text-sm">
          {m.envHint.split("npm run dev").map((part, i, arr) => (
            <span key={i}>
              {part}
              {i < arr.length - 1 && (
                <code className="bg-slate-200 px-1">npm run dev</code>
              )}
            </span>
          ))}
        </p>
      )}
    </WwwPageShell>
  );
}
