-- 블로그별 커스텀 도메인 (예: myblog.com → 해당 블로그)
-- Supabase SQL Editor에서 실행

alter table public.blogs
  add column if not exists custom_domain text unique;

create index if not exists blogs_custom_domain_idx on public.blogs(custom_domain)
  where custom_domain is not null;

comment on column public.blogs.custom_domain is '커스텀 도메인 (예: myblog.com). 설정 시 해당 host로 접속해도 블로그 노출';
