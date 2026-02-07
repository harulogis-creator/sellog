-- profiles: 블로그 소유자 프로필 (auth.users 1:1)
-- 블로그 메인 등에서 소유자 이름·아바타 표시용

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.profiles is '사용자 프로필 (블로그 소유자 표시용)';
comment on column public.profiles.display_name is '표시 이름 (미설정 시 이메일 등 사용 가능)';
comment on column public.profiles.avatar_url is '프로필 이미지 URL';

-- RLS: 읽기는 모두 허용(블로그 방문자에게 소유자 정보 노출), 쓰기는 본인만
alter table public.profiles enable row level security;

create policy "profiles read" on public.profiles
  for select using (true);

create policy "profiles insert own" on public.profiles
  for insert to authenticated with check (auth.uid() = id);

create policy "profiles update own" on public.profiles
  for update using (auth.uid() = id);

create policy "profiles delete own" on public.profiles
  for delete using (auth.uid() = id);

-- 가입 시 프로필 행 자동 생성 (선택)
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)));
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
