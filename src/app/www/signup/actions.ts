"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { isValidLocale } from "@/lib/i18n";

export async function signupAction(formData: FormData): Promise<{ error?: string }> {
  const email = (formData.get("email") as string)?.trim();
  const password = formData.get("password") as string;
  if (!email || !password) return { error: "email_password_required" };
  if (password.length < 6) return { error: "password_min_length" };

  const localeRaw = (formData.get("locale") as string)?.trim();
  const locale = localeRaw && isValidLocale(localeRaw) ? localeRaw : "ko";

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({ email, password });
  if (error) return { error: "unknown" };

  redirect(`/${locale}/www`);
}
