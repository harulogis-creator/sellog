-- Sellog: blogs, posts, products
-- Run this in Supabase SQL Editor to create tables.

-- 블로그 (서브도메인 1:1)
create table if not exists public.blogs (
  id uuid primary key default gen_random_uuid(),
  subdomain text not null unique,
  name text not null,
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 글
create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  blog_id uuid not null references public.blogs(id) on delete cascade,
  slug text not null,
  title text not null,
  body_md text,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(blog_id, slug)
);

-- 상품
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  blog_id uuid not null references public.blogs(id) on delete cascade,
  name text not null,
  price integer not null,
  image_url text,
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- RLS
alter table public.blogs enable row level security;
alter table public.posts enable row level security;
alter table public.products enable row level security;

-- 읽기는 모두 허용 (SEO/공개 블로그)
create policy "blogs read" on public.blogs for select using (true);
create policy "posts read" on public.posts for select using (true);
create policy "products read" on public.products for select using (true);

-- 인덱스
create index if not exists posts_blog_id_idx on public.posts(blog_id);
create index if not exists posts_published_at_idx on public.posts(published_at desc);
create index if not exists products_blog_id_idx on public.products(blog_id);
