"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function createBlogAction(
  formData: FormData
): Promise<{ subdomain?: string; error?: string }> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    return { error: "env_missing" };
  }
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { error: "login_required" };
  }

  const subdomain = (formData.get("subdomain") as string)?.trim().toLowerCase().replace(/\s+/g, "-");
  const name = (formData.get("name") as string)?.trim();
  const description = (formData.get("description") as string)?.trim() || null;

  if (!subdomain || !name) return { error: "subdomain_name_required" };
  if (!/^[a-z0-9-]+$/.test(subdomain)) return { error: "subdomain_format" };
  if (subdomain.length < 2) return { error: "subdomain_min_length" };

  const { data, error } = await supabase
    .from("blogs")
    .insert({ subdomain, name, description, owner_id: user.id })
    .select("subdomain")
    .single();

  if (error) {
    if (error.code === "23505") return { error: "subdomain_taken" };
    return { error: "unknown" };
  }

  revalidatePath("/");
  return { subdomain: data?.subdomain };
}
