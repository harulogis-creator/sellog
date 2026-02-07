# Sellog — 사용자 직접 작업 실행 가이드

아래 작업들은 **배포·인프라·외부 서비스 설정**으로, 사용자가 직접 진행하는 항목입니다.  
하나씩 순서대로 진행하면 됩니다. (선행 관계가 있으면 표시함.)

---

## ✅ 완료한 것 (H2, H4)

| 항목 | 설명 |
|------|------|
| **H2** | Vercel 배포 (GitHub 연결, 환경 변수, Deploy) |
| **H4** | Supabase 프로덕션 (프로젝트 생성, SQL 001~007, URL Configuration, Vercel에 URL·anon key 반영) |

**동작 확인**: 프로젝트 루트에서 `npm run build` 성공 확인됨.  
**직접 테스트**: 브라우저에서 `https://프로젝트명.vercel.app` 접속 후 아래 확인 권장.  
- `/ko/www` 또는 `/en/www` 메인  
- `/ko/www/login`, `/ko/www/signup` 로그인·회원가입  
- `/ko/www/join` 블로그 만들기 (로그인 후)  
- 이메일 로그인으로 회원가입 → 블로그 생성까지 정상이면 H2·H4 완료.

---

## 🟢 지금 할 것 (구매 없이 진행)

| 순서 | 작업 | 문서 위치 |
|------|------|-----------|
| 1 | **M3: OAuth 활성화** — GitHub·Google 로그인 켜기 | [§4 M3 OAuth 활성화](#4-m3-oauth-활성화) |
| 2 | **M8: 에러 모니터링 활성화** — Vercel Analytics 또는 Sentry | [§6 M8 에러 모니터링](#6-m8-에러-모니터링-활성화) |

---

## 🔜 최종 단계 (도메인·결제 등, 나중에 한꺼번에)

| 작업 | 시점 |
|------|------|
| **H3: 서브도메인 DNS** | 도메인(sellog.com 등) **구매 후** — Vercel Domains + DNS CNAME 설정 |
| **H1: 결제(PG) 실제 연동** | 실제 결제가 필요할 때 — PG사 가입·키·코드 연동 |

---

## 목차

1. [H2: Vercel 배포](#1-h2-vercel-배포)
2. [H3: 서브도메인 DNS](#2-h3-서브도메인-dns) — **H2 이후**
3. [H4: Supabase 프로덕션](#3-h4-supabase-프로덕션)
4. [M3: OAuth 활성화](#4-m3-oauth-활성화) — **H4 이후**
5. [H1: 결제(PG) 실제 연동](#5-h1-결제pg-실제-연동)
6. [M8: 에러 모니터링 활성화](#6-m8-에러-모니터링-활성화) — **H2 이후**

---

## 1. H2: Vercel 배포

**목표**: GitHub 저장소를 Vercel에 연결하고, 환경 변수를 넣은 뒤 첫 배포를 완료한다.

### 실행 순서

1. **Vercel 로그인**  
   - https://vercel.com 접속 후 로그인(또는 GitHub 연동 로그인).

2. **프로젝트 연결**  
   - **Add New** → **Project** 선택.  
   - Sellog 코드가 있는 **GitHub 저장소**를 선택하고 **Import** 진행.  
   - (저장소가 없다면 먼저 GitHub에 push한 뒤 연결.)

3. **환경 변수 설정**  
   - 프로젝트 설정 화면에서 **Settings** → **Environment Variables**로 이동.  
   - 아래 변수를 **Production / Preview / Development**에 맞게 추가.

   | 이름 | 값 예시 | 비고 |
   |------|--------|------|
   | `NEXT_PUBLIC_SUPABASE_URL` | `https://xxxxx.supabase.co` | Supabase 프로젝트 URL |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGc...` | Supabase anon key |
   | `SITE_URL` | `https://sellog.com` | 실제 서비스 URL (배포 후 도메인에 맞게 수정) |
   | `NEXT_PUBLIC_ROOT_DOMAIN` | `sellog.com` | 루트 도메인 (선택) |

   - Supabase URL·Anon Key는 **Supabase Dashboard** → 프로젝트 선택 → **Settings** → **API**에서 확인.

4. **배포 실행**  
   - **Deploy** 버튼으로 배포.  
   - 완료 후 `https://프로젝트명.vercel.app` 으로 접속해 동작 확인.

5. **(선택) 커스텀 도메인**  
   - **Settings** → **Domains**에서 `sellog.com`, `www.sellog.com` 추가 후, DNS 설정은 H3에서 진행.

**완료 기준**: `https://프로젝트명.vercel.app` 에서 앱이 열리고, 로그인/회원가입·블로그 만들기가 동작하면 됨.

---

## 2. H3: 서브도메인 DNS

**목표**: `*.sellog.com`(예: myblog.sellog.com)이 Vercel로 연결되도록 DNS를 설정한다.  
**선행**: H2(Vercel 배포) 완료. 도메인(sellog.com)을 소유하고 있어야 함.

### 실행 순서

1. **Vercel에 도메인 추가**  
   - Vercel 프로젝트 → **Settings** → **Domains**.  
   - `sellog.com`, `www.sellog.com` 추가.  
   - **와일드카드** `*.sellog.com` 추가(가능한 경우).

2. **도메인 등록처(DNS)에서 설정**  
   - 도메인을 관리하는 곳(가비아, Cloudflare, Route 53 등)의 DNS 설정으로 이동.  
   - Vercel이 안내하는 대로 아래와 같이 설정.

   - **메인 도메인(sellog.com)**  
     - 타입: **A** 또는 **CNAME**  
     - 호스트: `@` 또는 `sellog.com`  
     - 값: Vercel이 표시한 주소(예: `76.76.21.21` 또는 `cname.vercel-dns.com`).

   - **www**  
     - 타입: **CNAME**  
     - 호스트: `www`  
     - 값: `cname.vercel-dns.com`.

   - **와일드카드 서브도메인(*.sellog.com)**  
     - 타입: **CNAME**  
     - 호스트: `*` (또는 `*.sellog.com`에 해당하는 호스트명)  
     - 값: `cname.vercel-dns.com`.

3. **전파 대기**  
   - DNS 전파에 수 분~최대 48시간 걸릴 수 있음.  
   - Vercel Domains 화면에서 상태가 **Valid**로 바뀌면 완료.

**완료 기준**: `https://임의이름.sellog.com`(예: test.sellog.com)으로 접속 시 Vercel에 배포된 앱이 열리면 됨.

---

## 3. H4: Supabase 프로덕션

**목표**: 프로덕션용 Supabase 프로젝트를 만들고, 마이그레이션·RLS·URL 설정을 적용한다.

### 실행 순서

1. **프로덕션 프로젝트 생성**  
   - https://supabase.com/dashboard 로그인.  
   - **New Project**로 새 프로젝트 생성(리전·비밀번호 등 설정).  
   - 생성 후 **Settings** → **API**에서 **Project URL**, **anon public** key 복사 → Vercel 환경 변수에 반영(H2).

2. **SQL 마이그레이션 실행**  
   - Supabase Dashboard → **SQL Editor**에서 아래 순서대로 실행.  
   - 프로젝트 루트의 해당 파일 내용을 복사해 실행하면 됨.

   | 순서 | 파일 |
   |------|------|
   | 1 | `supabase/schema.sql` |
   | 2 | `supabase/schema_write_policy.sql` (필요 시) |
   | 3 | `supabase/migrations/001_auth_owner_rls.sql` |
   | 4 | `supabase/migrations/002_orders.sql` |
   | 5 | `supabase/migrations/003_custom_domain.sql` |
   | 6 | `supabase/migrations/004_thumbnail_url.sql` |
   | 7 | `supabase/migrations/005_product_images_storage.sql` |
   | 8 | `supabase/migrations/006_profiles.sql` |
   | 9 | `supabase/migrations/007_meta_description.sql` |

3. **Authentication URL 설정**  
   - **Authentication** → **URL Configuration**.  
   - **Site URL**: 실제 서비스 URL(예: `https://sellog.com`).  
   - **Redirect URLs**에 다음 추가:
     - `https://sellog.com/auth/callback` (실제 도메인에 맞게)
     - `http://localhost:3000/auth/callback` (로컬 개발용)

4. **RLS·키 확인**  
   - **Table Editor**에서 각 테이블에 RLS가 켜져 있는지 확인.  
   - 외부에 노출하는 키는 **anon key**만 사용하고, service role key는 서버 등 안전한 곳에만 사용.

**완료 기준**: Vercel 앱에서 프로덕션 Supabase로 로그인/회원가입·블로그 생성이 되고, RLS로 권한이 제한되면 됨.

---

## 4. M3: OAuth 활성화

**목표**: GitHub·Google 로그인/회원가입을 사용할 수 있도록 Supabase와 Provider를 설정한다.  
**선행**: H4(Supabase 프로덕션·Redirect URL) 완료.

### 실행 순서

1. **Supabase에서 Provider 켜기**  
   - Supabase Dashboard → **Authentication** → **Providers**.  
   - **GitHub**, **Google** 등을 **Enabled**로 켬.

2. **GitHub OAuth 앱 설정**  
   - GitHub → **Settings** → **Developer settings** → **OAuth Apps** → **New OAuth App**.  
   - **Authorization callback URL**에 Supabase가 안내하는 콜백 URL 입력.  
     - 형식 예: `https://<프로젝트-ref>.supabase.co/auth/v1/callback`  
     - Supabase **Providers** → GitHub 항목에 표시된 URL을 그대로 사용.  
   - **Client ID**, **Client Secret**을 복사해 Supabase **Providers** → GitHub에 붙여넣기.

3. **Google OAuth 설정**  
   - [Google Cloud Console](https://console.cloud.google.com/) → 프로젝트 선택 → **APIs & Services** → **Credentials** → **Create Credentials** → **OAuth client ID**.  
   - Application type: **Web application**.  
   - **Authorized redirect URIs**에 Supabase가 안내하는 콜백 URL 추가(Providers → Google에 표시된 URL).  
   - **Client ID**, **Client Secret**을 Supabase **Providers** → Google에 입력.

4. **Redirect URL 확인**  
   - Supabase **Authentication** → **URL Configuration** → **Redirect URLs**에  
     `https://sellog.com/auth/callback`(또는 실제 도메인)이 포함되어 있는지 확인.

**완료 기준**: 로그인/회원가입 페이지에서 GitHub·Google 버튼으로 로그인·회원가입이 되면 됨.

---

## 5. H1: 결제(PG) 실제 연동

**목표**: 토스/아임포트/스트라이프 등 PG사를 연동해 실제 결제를 처리한다.

### 실행 순서

1. **설계 문서 확인**  
   - `docs/PAYMENT_DESIGN.md`에서 PG 후보·연동 방식·환경 변수를 확인.

2. **PG사 가입·키 발급**  
   - 선택한 PG(토스페이먼츠, 아임포트, Stripe 등)에 가입 후, 테스트/라이브 **API 키·시크릿** 발급.

3. **환경 변수 설정**  
   - Vercel(및 로컬 `.env.local`)에 해당 PG 문서에서 요구하는 변수 추가(예: `STRIPE_SECRET_KEY`, `STRIPE_PUBLISHABLE_KEY` 등).

4. **코드 연동**  
   - 결제 세션/결제창 호출·웹훅 처리 등은 `PAYMENT_DESIGN.md`와 PG사 문서를 따라 구현.  
   - 기존 체크아웃 성공/취소/실패 페이지 URL을 PG의 success/cancel URL로 연결.

**완료 기준**: 상품 주문 후 실제(또는 테스트) 결제까지 진행되고, 성공/취소/실패 페이지로 이동하면 됨.

---

## 6. M8: 에러 모니터링 활성화

**목표**: Vercel Analytics 또는 Sentry를 켜서 에러·성능을 수집한다.  
**선행**: H2(Vercel 배포) 완료.

### 방법 A: Vercel Analytics

1. Vercel 프로젝트 → **Analytics** 탭.  
2. **Enable** 후 요금 플랜에 따라 페이지뷰·Web Vitals 수집.

### 방법 B: Sentry

1. [Sentry](https://sentry.io) 가입 후 Next.js 프로젝트 생성.  
2. 안내에 따라 `@sentry/nextjs` 설치 및 `sentry.client.config.ts`, `sentry.server.config.ts`, `instrumentation.ts` 설정.  
3. Vercel 환경 변수에 `SENTRY_DSN` 추가.  
4. 배포 후 에러 발생 시 Sentry 대시보드에 수집되는지 확인.

자세한 내용은 `DEPLOY.md` §6 참고.

**완료 기준**: 배포 환경에서 에러가 나면 Vercel Analytics 또는 Sentry에 기록이 보이면 됨.

---

## 진행 순서 요약

| 순서 | 작업 | 비고 |
|------|------|------|
| 1 | H2 Vercel 배포 | 먼저 진행 |
| 2 | H4 Supabase 프로덕션 | H2와 병렬 가능 |
| 3 | H3 서브도메인 DNS | H2 후, 도메인 소유 시 |
| 4 | M3 OAuth 활성화 | H4 후 |
| 5 | H1 결제 연동 | 필요 시 |
| 6 | M8 에러 모니터링 | H2 후 |

완료한 항목은 `TASKS.md`의 "나중에 한꺼번에 (사용자)" 체크리스트에서 `[x]`로 표시해 두면 됩니다.
