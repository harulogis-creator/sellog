"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

const BUCKET = "product-images";
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

async function getImageUrl(
  supabase: Awaited<ReturnType<typeof createClient>>,
  formData: FormData,
  blogId: string,
  existingUrl: string | null
): Promise<string | null> {
  const file = formData.get("image_file") as File | null;
  if (file && file.size > 0) {
    if (file.size > MAX_SIZE) return existingUrl;
    try {
      const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
      const safe = /^[a-z0-9]+$/i.test(ext) ? ext : "jpg";
      const path = `${blogId}/${crypto.randomUUID()}.${safe}`;
      const buf = Buffer.from(await file.arrayBuffer());
      const { error } = await supabase.storage.from(BUCKET).upload(path, buf, {
        contentType: file.type || "image/jpeg",
        upsert: true,
      });
      if (error) return existingUrl;
      const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
      return data.publicUrl;
    } catch {
      return existingUrl;
    }
  }
  const url = (formData.get("image_url") as string)?.trim() || null;
  return url || existingUrl;
}

export async function createProductAction(
  formData: FormData
): Promise<{ error?: string }> {
  const supabase = await createClient();
  if (!supabase) return { error: "blog.products.error.dbError" };

  const blogId = (formData.get("blogId") as string)?.trim();
  const domain = (formData.get("domain") as string)?.trim();
  const name = (formData.get("name") as string)?.trim();
  const price = parseInt((formData.get("price") as string) || "0", 10);
  const description = (formData.get("description") as string)?.trim() || null;

  if (!blogId || !name) return { error: "blog.products.error.createRequired" };
  if (isNaN(price) || price < 0) return { error: "blog.products.error.priceInvalid" };

  const file = formData.get("image_file") as File | null;
  if (file && file.size > MAX_SIZE) return { error: "blog.products.error.imageSizeMax" };

  const image_url = await getImageUrl(supabase, formData, blogId, null);

  const { error } = await supabase.from("products").insert({
    blog_id: blogId,
    name,
    price,
    image_url,
    description,
  });

  if (error) return { error: "blog.products.error.unknown" };

  revalidatePath(`/${domain}`);
  revalidatePath(`/${domain}/products`);
  return {};
}

export async function updateProductAction(
  productId: string,
  domain: string,
  formData: FormData
): Promise<{ error?: string }> {
  const supabase = await createClient();
  if (!supabase) return { error: "blog.products.error.dbError" };

  const name = (formData.get("name") as string)?.trim();
  const price = parseInt((formData.get("price") as string) || "0", 10);
  const description = (formData.get("description") as string)?.trim() || null;

  if (!name) return { error: "blog.products.error.nameRequired" };
  if (isNaN(price) || price < 0) return { error: "blog.products.error.priceInvalid" };

  const { data: product } = await supabase
    .from("products")
    .select("blog_id, image_url")
    .eq("id", productId)
    .single();

  if (!product) return { error: "blog.products.error.unknown" };

  const blogId = product.blog_id;
  const file = formData.get("image_file") as File | null;
  if (file && file.size > MAX_SIZE) return { error: "blog.products.error.imageSizeMax" };

  const image_url = await getImageUrl(
    supabase,
    formData,
    blogId,
    product?.image_url ?? null
  );

  const { error } = await supabase
    .from("products")
    .update({ name, price, image_url, description, updated_at: new Date().toISOString() })
    .eq("id", productId);

  if (error) return { error: "blog.products.error.unknown" };

  revalidatePath(`/${domain}`);
  revalidatePath(`/${domain}/products`);
  return {};
}

export async function deleteProductAction(
  productId: string,
  domain: string
): Promise<{ error?: string }> {
  const supabase = await createClient();
  if (!supabase) return { error: "blog.products.error.dbError" };

  const { error } = await supabase.from("products").delete().eq("id", productId);

  if (error) return { error: "blog.products.error.unknown" };

  revalidatePath(`/${domain}`);
  revalidatePath(`/${domain}/products`);
  return {};
}
