"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPostAction(formData: FormData): Promise<{ error?: string }> {
  const supabase = await createClient();

  const blogId = (formData.get("blogId") as string)?.trim();
  const domain = (formData.get("domain") as string)?.trim();
  const title = (formData.get("title") as string)?.trim();
  const slug = (formData.get("slug") as string)?.trim().replace(/\s+/g, "-");
  const body_md = (formData.get("body_md") as string)?.trim() || null;
  const meta_description = (formData.get("meta_description") as string)?.trim() || null;
  const thumbnail_url = (formData.get("thumbnail_url") as string)?.trim() || null;
  const publish = formData.get("publish") === "on";

  if (!blogId || !domain) return { error: "blog.posts.error.invalidRequest" };
  if (!title || !slug) return { error: "blog.posts.error.titleSlugRequired" };

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "blog.posts.error.loginRequired" };

  const { data, error } = await supabase
    .from("posts")
    .insert({
      blog_id: blogId,
      title,
      slug,
      body_md,
      meta_description,
      thumbnail_url,
      published_at: publish ? new Date().toISOString() : null,
    })
    .select("slug")
    .single();

  if (error) {
    if (error.code === "23505") return { error: "blog.posts.error.slugDuplicate" };
    return { error: "blog.posts.error.unknown" };
  }

  revalidatePath("/");
  revalidatePath(`/${domain}`);
  revalidatePath(`/${domain}/posts`);
  redirect(`/${domain}/post/${data?.slug ?? slug}`);
}
