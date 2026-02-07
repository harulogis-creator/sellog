"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function createOrderAction(
  domain: string,
  productId: string,
  quantity: number,
  customerEmail?: string | null
): Promise<{ error?: string; orderId?: string }> {
  if (!supabase) return { error: "blog.checkout.error.dbError" };
  if (quantity < 1) return { error: "blog.checkout.error.quantityInvalid" };

  const { data: product, error: productError } = await supabase
    .from("products")
    .select("id, blog_id, name, price")
    .eq("id", productId)
    .single();

  if (productError || !product) return { error: "blog.checkout.error.productNotFound" };

  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      blog_id: product.blog_id,
      status: "pending",
      customer_email: customerEmail?.trim() || null,
      updated_at: new Date().toISOString(),
    })
    .select("id")
    .single();

  if (orderError) return { error: "blog.checkout.error.unknown" };

  const { error: itemError } = await supabase.from("order_items").insert({
    order_id: order.id,
    product_id: product.id,
    quantity,
    unit_price: product.price,
  });

  if (itemError) return { error: "blog.checkout.error.unknown" };

  revalidatePath(`/${domain}`);
  return { orderId: order.id };
}
