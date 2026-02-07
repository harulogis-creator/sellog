# Sellog 배포 가이드

Vercel + Supabase로 배포할 때 참고용 체크리스트입니다.

---

## 1. Vercel 배포 (6.1)

1. [Vercel](https://vercel.com)에 로그인 후 **Add New → Project**에서 이 저장소를 연결합니다.
2. **Environment Variables**에 아래 변수를 설정합니다.
   - `NEXT_PUBLIC_SUPABASE_URL` — Supabase 프로젝트 URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Supabase anon (public) key
   - `SITE_URL` — 실제 서비스 URL (예: `https://sellog.com`)
   - `NEXT_PUBLIC_ROOT_DOMAIN` — 루트 도메인 (예: `sellog.com`)
3. **Deploy** 후 기본 도메인(`*.vercel.app`)으로 동작 확인합니다.

---

## 2. 서브도메인 DNS (6.2)

- **메인 도메인**: Vercel 프로젝트에 `sellog.com`(및 `www.sellog.com`) 도메인을 추가합니다.
- **와일드카드 서브도메인**: `*.sellog.com`을 Vercel에 추가한 뒤, DNS에서:
  - 타입: **CNAME**
  - 이름: `*` (또는 `*.sellog.com`에 해당하는 호스트)
  - 값: `cname.vercel-dns.com` (Vercel이 안내하는 값으로 설정)

로컬에서는 서브도메인 대신 **경로**로 접근합니다. 예: `https://sellog.com/myblog` → `myblog` 블로그.

---

## 3. Supabase 프로덕션 (6.3)

1. **Supabase Dashboard**에서 프로덕션 프로젝트를 사용합니다.
2. **SQL Editor**에서 다음 순서로 실행합니다.
   - `supabase/schema.sql` — 테이블 생성
   - `supabase/schema_write_policy.sql` — 기존 정책(필요 시)
   - `supabase/migrations/001_auth_owner_rls.sql` — owner_id, RLS
   - `supabase/migrations/002_orders.sql` — 주문 테이블
   - `supabase/migrations/003_custom_domain.sql` — 커스텀 도메인
   - `supabase/migrations/004_thumbnail_url.sql` — 썸네일
   - `supabase/migrations/005_product_images_storage.sql` — 상품 이미지 스토리지
   - `supabase/migrations/006_profiles.sql` — 프로필 테이블·가입 시 자동 생성
3. **Authentication → URL Configuration**에서 Site URL을 `SITE_URL`과 맞춥니다.
4. **Redirect URLs**에 `https://your-domain.com/auth/callback` (및 로컬: `http://localhost:3000/auth/callback`)을 추가합니다.
5. **OAuth 사용 시**: **Authentication → Providers**에서 GitHub·Google 등을 켜고, 각 Provider 대시보드에서 Callback URL을 Supabase가 안내하는 주소로 설정합니다.
6. **RLS**가 켜져 있는지, anon key만 노출되는지 확인합니다.

---

## 4. 환경 변수 요약

| 변수 | 설명 | 필수 |
|------|------|------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase 프로젝트 URL | ✅ |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key | ✅ |
| `SITE_URL` | 사이트 기준 URL (OG, sitemap) | 권장 |
| `NEXT_PUBLIC_ROOT_DOMAIN` | 루트 도메인 (서브도메인 판별) | 선택(sellog.com 기본) |

---

## 5. PG 결제 연동

실제 결제(PG사 연동)는 **최종 단계**에서 진행합니다.  
주문·체크아웃·성공/취소/실패 페이지는 이미 구현되어 있으므로, PG 연동 시 해당 URL로 리다이렉트만 연결하면 됩니다.

---

## 6. 에러 모니터링 (선택)

- **Vercel Analytics**: Vercel 프로젝트 → Analytics 탭에서 활성화하면 페이지뷰·Web Vitals가 수집됩니다.
- **Sentry**: [Sentry Next.js 가이드](https://docs.sentry.io/platforms/javascript/guides/nextjs/)대로 `@sentry/nextjs` 설치 후 `sentry.client.config.ts`·`sentry.server.config.ts`·`instrumentation.ts`를 설정하고, 환경 변수 `SENTRY_DSN`을 넣으면 됩니다.  
  기존 `src/app/error.tsx`·`global-error.tsx`는 그대로 두고, Sentry 초기화 시 자동으로 에러가 전송됩니다.
