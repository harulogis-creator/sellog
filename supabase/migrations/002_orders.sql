-- 주문·결제용 테이블 (결제 PG 연동 전 스켈레톤)
-- Supabase SQL Editor에서 실행

-- 주문
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  blog_id uuid not null references public.blogs(id) on delete cascade,
  status text not null default 'pending' check (status in ('pending', 'paid', 'cancelled', 'refunded')),
  customer_email text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 주문 항목 (상품 스냅샷)
create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete restrict,
  quantity integer not null default 1 check (quantity > 0),
  unit_price integer not null check (unit_price >= 0),
  created_at timestamptz not null default now()
);

-- RLS
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

-- 주문: 누구나 생성(체크아웃), 블로그 소유자만 조회
create policy "orders insert all" on public.orders
  for insert with check (true);

create policy "orders select owner" on public.orders
  for select using (
    exists (select 1 from public.blogs b where b.id = blog_id and b.owner_id = auth.uid())
  );

-- 주문 항목: 주문 생성 시 함께 insert, 소유자만 조회
create policy "order_items insert all" on public.order_items
  for insert with check (true);

create policy "order_items select owner" on public.order_items
  for select using (
    exists (
      select 1 from public.orders o
      join public.blogs b on b.id = o.blog_id
      where o.id = order_id and b.owner_id = auth.uid()
    )
  );

-- 인덱스
create index if not exists orders_blog_id_idx on public.orders(blog_id);
create index if not exists orders_created_at_idx on public.orders(created_at desc);
create index if not exists order_items_order_id_idx on public.order_items(order_id);
