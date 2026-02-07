"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateBlogAction(
  domain: string,
  formData: FormData
): Promise<{ error?: string }> {
  const supabase = await createClient();
  if (!supabase) return { error: "blog.settings.error.dbError" };

  const { data: { user } } = await supabase.auth.getUser();
  const { data: blog } = await supabase
    .from("blogs")
    .select("id, owner_id")
    .eq("subdomain", domain)
    .single();

  if (!blog) return { error: "blog.settings.error.notFound" };
  const isOwner = blog.owner_id === null || blog.owner_id === user?.id;
  if (!isOwner) return { error: "blog.settings.error.forbidden" };

  const name = (formData.get("name") as string)?.trim();
  const description = (formData.get("description") as string)?.trim() || null;
  const custom_domain = (formData.get("custom_domain") as string)?.trim().toLowerCase() || null;

  if (!name) return { error: "blog.settings.error.nameRequired" };
  if (custom_domain && !/^[a-z0-9][a-z0-9.-]*\.[a-z]{2,}$/i.test(custom_domain)) {
    return { error: "blog.settings.error.customDomainInvalid" };
  }

  const { error } = await supabase
    .from("blogs")
    .update({ name, description, custom_domain, updated_at: new Date().toISOString() })
    .eq("id", blog.id);

  if (error) return { error: "blog.settings.error.unknown" };

  revalidatePath(`/${domain}`);
  revalidatePath(`/${domain}/settings`);
  return {};
}

/** 프로필(표시 이름, 아바타 URL) 저장. 본인만 가능. */
export async function updateProfileAction(
  formData: FormData
): Promise<{ error?: string }> {
  const supabase = await createClient();
  if (!supabase) return { error: "blog.settings.error.dbError" };

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "blog.settings.error.loginRequired" };

  const display_name = (formData.get("display_name") as string)?.trim() || null;
  const avatar_url = (formData.get("avatar_url") as string)?.trim() || null;

  const { error } = await supabase
    .from("profiles")
    .upsert(
      { id: user.id, display_name, avatar_url, updated_at: new Date().toISOString() },
      { onConflict: "id" }
    );

  if (error) return { error: "blog.settings.error.unknown" };

  revalidatePath("/");
  return {};
}
