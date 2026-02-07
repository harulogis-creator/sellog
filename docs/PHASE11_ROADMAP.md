# Phase 11 — 경로 기반 locale · hreflang · 글로벌

www 영역에 **URL 경로 기반 locale** (`/ko/www`, `/en/www`)을 도입하고, **hreflang·alternate**로 다국어 SEO를 완성하는 기획 및 실행 계획입니다.

---

## 1. 목표 요약

| 축 | 목표 | 우선순위 |
|----|------|----------|
| **경로 기반 locale** | `/ko/www`, `/en/www` 등 URL에 언어 반영, 공유·북마크 시 언어 유지 | P0 |
| **쿠키 동기화** | `/[locale]/www` 진입 시 쿠키 `sellog_locale` 설정, 클라이언트와 일치 | P0 |
| **hreflang·alternate** | 메타에 `alternates.languages` (ko, en) 반영, 검색엔진 다국어 인덱싱 | P0 |
| **리다이렉트** | `/www` → `/ko/www`(또는 쿠키/Accept-Language 기반), `/` → `/ko/www` 또는 `/en/www` | P0 |
| **고도화** | 서버 액션·폼 리다이렉트 시 locale prefix 유지, 링크 일괄 prefix | P0 |

---

## 2. 라우팅·미들웨어 설계

### 2.1 URL 구조

| 현재 | 변경 후 |
|------|---------|
| `/www`, `/www/login`, … | `/ko/www`, `/en/www`, `/ko/www/login`, `/en/www/login`, … |
| `/` (rewrite → /www) | `/` → 302 리다이렉트 `/ko/www` 또는 `/en/www` |

- **유효 locale**: `ko`, `en` (기존 `[domain]`과 구분: 1차 세그먼트가 `ko`/`en`이면 locale, 그 외는 도메인).
- **canonical**: 페이지별로 `https://도메인/ko/www` 또는 `/en/www` 형태로 고정.

### 2.2 미들웨어 동작

1. **`/`**  
   - 쿠키 `sellog_locale` 또는 `Accept-Language`로 locale 결정 → **302** `/[locale]/www`.
2. **`/www` 또는 `/www/*`**  
   - 동일하게 locale 결정 → **302** `/[locale]/www` 또는 `/[locale]/www/...`.
3. **`/ko/*`, `/en/*`**  
   - 요청 처리 전에 **Set-Cookie** `sellog_locale=ko|en` 설정 후 next 처리 (동일 응답).

### 2.3 파일 구조

- **추가**: `app/[locale]/layout.tsx` (locale 검증), `app/[locale]/www/` 하위에 layout, page, join, login, signup, check.
- **유지**: `app/www/` — 컴포넌트·폼·액션만 유지 (WwwHeader, WwwFooter, join/CreateBlogForm, login/LoginForm 등). **삭제**: `app/www/layout.tsx`, `app/www/page.tsx`, `app/www/join/page.tsx`, `app/www/login/page.tsx`, `app/www/signup/page.tsx`, `app/www/check/page.tsx` (라우트는 `[locale]/www`로만 제공).

---

## 3. 구현 상세

### 3.1 메타·hreflang

- `generateMetadata`에서 `params.locale` 사용.
- `alternates`: `canonical: base/${locale}/www`, `languages: { ko: base/ko/www, en: base/en/www }` (동일 패턴을 서브경로에도 적용).

### 3.2 링크·클라이언트

- **WwwHeader, WwwFooter, WwwPageShell, AnnouncementBar, WwwSupportBlock, WwwFinalCtaSection, WwwPricingSection, WwwHero**: `useParams()`로 `locale` 취득 후 `href={/${locale}/www...}`.
- **WwwFooter 언어 전환**: 클릭 시 `router.push(/en/www)` 등으로 이동 + `setLocale` 호출 (쿠키 동기화).

### 3.3 서버 액션·리다이렉트

- **login, signup**: 폼에 `locale` hidden 전달 또는 Referer에서 locale 추출 후 `redirect(/${locale}/www)`.
- **logout**: Referer 또는 쿠키에서 locale 추출 후 `redirect(/${locale}/www)`.
- **createBlog**: 클라이언트에서 성공 시 `router.push(/${locale}/www)` 또는 블로그 URL로 이동 (이미 locale 인지 가능).

### 3.4 LocaleProvider

- 서버에서 `params.locale`을 **initialLocale**로 전달 가능하도록 옵션 지원 (선택). 현재는 쿠키만으로도 동작; 미들웨어가 `/[locale]` 진입 시 쿠키 설정하므로 클라이언트와 일치.

---

## 4. 체크리스트 (Phase 11)

- [x] 미들웨어: `/`·`/www`·`/www/*` → `/ko/www`·`/en/www` 리다이렉트, `/ko/*`·`/en/*` 진입 시 쿠키 설정
- [x] www 라우트를 `app/[domain]/www/`로 통합 (동일 1차 세그먼트 충돌 회피), `[domain]/layout`에서 ko/en일 때 DomainBottomNav 미노출
- [x] `app/[domain]/www/` layout·page·join·login·signup·check·error
- [x] 기존 app/www 라우트 파일 제거 (layout, page, join/login/signup/check page)
- [x] 헤더·푸터·쉘·AnnouncementBar·Support·FinalCta·Pricing·Hero 링크 locale prefix (useParams().domain)
- [x] generateMetadata에서 params.domain·hreflang(alternates.languages)
- [x] login/signup/logout 액션 리다이렉트 locale 반영 (폼 hidden locale, referer)
- [x] LoginForm·SignupForm·CreateBlogForm·OAuthButtons redirect/경로 locale 반영
- [ ] TASKS·ROADMAP 갱신
