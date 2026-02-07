-- 글 쓰기·블로그 만들기·상품 추가를 위한 INSERT 정책
-- (개발용: 누구나 삽입 가능. 추후 auth.uid()로 제한 가능)
-- Supabase SQL Editor에서 실행하세요.

create policy "posts insert for all" on public.posts for insert with check (true);
create policy "blogs insert for all" on public.blogs for insert with check (true);
create policy "products insert for all" on public.products for insert with check (true);
