-- [실행 방법] Supabase 대시보드 → SQL Editor → New Query → 이 파일 내용 붙여넣기 → Run
-- 1. blogs에 소유자(owner_id) 컬럼 추가
-- 기존 행은 owner_id가 null (비로그인 시 만들어진 블로그)
alter table public.blogs
  add column if not exists owner_id uuid references auth.users(id) on delete set null;

-- 2. 기존 INSERT 정책 제거 후 Auth 기반 정책으로 교체
-- (Supabase SQL Editor에서 기존 "posts insert for all" 등이 있으면 먼저 drop)

drop policy if exists "posts insert for all" on public.posts;
drop policy if exists "blogs insert for all" on public.blogs;
drop policy if exists "products insert for all" on public.products;

-- 3. blogs: 로그인한 사용자만 생성 가능, owner_id는 본인으로 설정. 수정/삭제는 소유자만
create policy "blogs insert authenticated" on public.blogs
  for insert to authenticated with check (auth.uid() = owner_id);

create policy "blogs update owner" on public.blogs
  for update using (owner_id = auth.uid());

create policy "blogs delete owner" on public.blogs
  for delete using (owner_id = auth.uid());

-- 4. posts: 소유자 블로그에만 글 작성·수정·삭제
create policy "posts insert owner blog" on public.posts
  for insert to authenticated
  with check (
    exists (select 1 from public.blogs b where b.id = blog_id and b.owner_id = auth.uid())
  );

create policy "posts update owner blog" on public.posts
  for update using (
    exists (select 1 from public.blogs b where b.id = blog_id and b.owner_id = auth.uid())
  );

create policy "posts delete owner blog" on public.posts
  for delete using (
    exists (select 1 from public.blogs b where b.id = blog_id and b.owner_id = auth.uid())
  );

-- 5. products: 소유자 블로그에만 상품 추가·수정·삭제
create policy "products insert owner blog" on public.products
  for insert to authenticated
  with check (
    exists (select 1 from public.blogs b where b.id = blog_id and b.owner_id = auth.uid())
  );

create policy "products update owner blog" on public.products
  for update using (
    exists (select 1 from public.blogs b where b.id = blog_id and b.owner_id = auth.uid())
  );

create policy "products delete owner blog" on public.products
  for delete using (
    exists (select 1 from public.blogs b where b.id = blog_id and b.owner_id = auth.uid())
  );

-- 6. 기존 블로그(owner_id null)도 수정 가능하도록: owner_id가 null이면 누구나 수정하지 못하게만 하면 됨
-- (위 정책은 owner_id = auth.uid() 이므로 null 블로그는 수정/삭제 불가. 읽기는 기존대로 모두 허용)
