-- 글 썸네일/대표 이미지 (목록·카드·OG 등)
-- Supabase SQL Editor에서 실행

alter table public.posts
  add column if not exists thumbnail_url text;

comment on column public.posts.thumbnail_url is '대표 이미지 URL (목록·카드·OG 이미지용)';
