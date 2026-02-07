# Phase 13 — 에러·404 i18n · 공통 에러 UX · 글로벌

에러 경계(Error Boundary)와 404(Not Found) 페이지의 **문구를 메시지 키화**하고, **locale에 따라 링크·문구**를 반영하여 글로벌 일관성을 갖추는 기획 및 실행 계획입니다.

---

## 1. 목표 요약

| 축 | 목표 | 우선순위 |
|----|------|----------|
| **에러·404 i18n** | "문제가 발생했어요", "다시 시도", "홈으로", "페이지를 찾을 수 없어요" 등 공통 메시지 키화(ko/en) | P0 |
| **locale 반영** | not-found·error에서 홈 링크를 `/{locale}/www`로, not-found는 쿠키·error는 쿠키 또는 path 기반 | P0 |
| **공통 네임스페이스** | `common.error.*`, `common.notFound.*` 도입하여 루트/www 에러·404에서 재사용 | P0 |
| **고도화** | 루트 error.tsx 다크 모드·접근성 유지, www error는 기존 스타일 + i18n | P1 |

---

## 2. 메시지 구조

| 키 | 용도 |
|----|------|
| common.error.title | 에러 제목 ("문제가 발생했어요") |
| common.error.retry | 재시도 버튼 ("다시 시도") |
| common.error.home | 홈/메인 링크 라벨 ("홈으로" / "메인으로") |
| common.notFound.title | 404 제목 ("페이지를 찾을 수 없어요") |
| common.notFound.description | 404 설명 문구 |
| common.notFound.home | 404 홈 버튼 ("홈으로") |

---

## 3. 구현 상세

### 3.1 not-found (Server)

- `cookies()`로 `sellog_locale` 읽어 locale 결정.
- `common.notFound.*` 메시지는 locale별 JSON에서 조회(서버에서 import ko/en 후 선택).
- 홈 링크: `href=/${locale}/www`.

### 3.2 루트 error.tsx (Client)

- 클라이언트에서 locale 취득: `getLocaleFromCookie()`(lib/i18n에 추가) 또는 document.cookie 파싱.
- `common.error.*` 메시지는 locale별 객체 import 후 선택.
- 홈 링크: `href=/${locale}/www`, 라벨: common.error.home.

### 3.3 [domain]/www/error.tsx (Client)

- 이미 LocaleProvider 하위이므로 `useTranslations()` 사용 가능. `common.error.*` 사용.
- 링크는 기존대로 pathname에서 추출한 locale로 `/${locale}/www`.

### 3.4 lib/i18n

- `getLocaleFromCookie(): Locale` 추가(클라이언트 전용, document.cookie 사용). 서버에서는 사용하지 않음.

---

## 4. 체크리스트 (Phase 13)

- [x] ko/en에 common.error.*, common.notFound.* 추가
- [x] lib/i18n에 getLocaleFromCookie() 추가
- [x] app/not-found.tsx 서버에서 locale·메시지 반영, 링크 /{locale}/www
- [x] app/error.tsx 클라이언트에서 locale·common.error 메시지·링크
- [x] [domain]/www/error.tsx common.error 메시지로 i18n (useTranslations)
- [ ] TASKS·ROADMAP 갱신
