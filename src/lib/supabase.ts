import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

function createSupabaseClient(): SupabaseClient | null {
  if (!supabaseUrl || !supabaseAnonKey) return null;
  return createClient(supabaseUrl, supabaseAnonKey);
}

const client = createSupabaseClient();

/** Supabase 클라이언트. env 미설정 시 null (페이지에서 null 체크 후 사용) */
export const supabase: SupabaseClient | null = client;

export type Blog = {
  id: string;
  subdomain: string;
  name: string;
  description: string | null;
  created_at: string;
  updated_at: string;
};

export type Post = {
  id: string;
  blog_id: string;
  slug: string;
  title: string;
  body_md: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export type Product = {
  id: string;
  blog_id: string;
  name: string;
  price: number;
  image_url: string | null;
  description: string | null;
  created_at: string;
  updated_at: string;
};
