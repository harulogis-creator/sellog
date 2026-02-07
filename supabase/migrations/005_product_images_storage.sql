-- 상품 이미지 업로드용 공개 버킷
-- Supabase 대시보드 SQL Editor에서 실행하거나, 로컬 supabase db push 시 적용
-- (버킷이 이미 있으면 대시보드 Storage에서 'product-images' 이름으로 public 버킷 생성)

insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do update set public = true;

-- 업로드: 로그인한 사용자만
create policy "product-images insert authenticated"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'product-images');

-- 읽기: 모두 (공개 버킷)
create policy "product-images select public"
  on storage.objects for select
  to public
  using (bucket_id = 'product-images');

-- 삭제: 로그인한 사용자만 (본인 업로드 삭제는 앱에서 처리)
create policy "product-images delete authenticated"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'product-images');
