-- 메타 설명 (SEO·OG용). AI 요약 생성 결과 저장 가능.
alter table public.posts
  add column if not exists meta_description text;

comment on column public.posts.meta_description is '메타 설명 (검색·OG). 없으면 본문에서 추출';
