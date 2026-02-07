"use server";

import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { isValidLocale } from "@/lib/i18n";

export async function logoutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  const referer = (await headers()).get("referer") ?? "";
  const match = referer.match(/\/(ko|en)\/www/);
  const locale = match?.[1] && isValidLocale(match[1]) ? match[1] : "ko";
  redirect(`/${locale}/www`);
}
