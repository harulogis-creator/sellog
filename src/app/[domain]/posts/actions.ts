"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deletePostAction(
  postId: string,
  domain: string
): Promise<{ error?: string }> {
  const supabase = await createClient();
  if (!supabase) return { error: "blog.posts.error.dbError" };

  const { error } = await supabase.from("posts").delete().eq("id", postId);

  if (error) return { error: "blog.posts.error.unknown" };

  revalidatePath("/");
  revalidatePath(`/${domain}`);
  revalidatePath(`/${domain}/posts`);
  redirect(`/${domain}/posts`);
}
