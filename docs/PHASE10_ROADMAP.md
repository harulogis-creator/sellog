# Phase 10 — www 서브페이지 i18n · 고도화 · 글로벌

join · login · signup · check 페이지의 **메타·제목·설명·링크 문구**를 메시지 키화하여 locale 전환 시 일관되게 표시하는 기획 및 실행 계획입니다.

---

## 1. 목표 요약

| 축 | 목표 | 우선순위 |
|----|------|----------|
| **서브페이지 i18n** | /www/join, /www/login, /www/signup, /www/check 제목·설명·뒤로가기·푸터 링크 문구 한/영 | P0 |
| **메타 다국어** | 각 서브페이지 generateMetadata에서 쿠키 locale 기반 title·description 반영 | P0 |
| **고도화** | 공통 페이지 쉘(뒤로가기·제목·설명·푸터) 재사용, 키 구조 통일(www.pages.*) | P0 |
| **글로벌** | www 전체(랜딩+서브페이지) 동일 locale로 노출 | P1 |

---

## 2. 작업 상세

### 2.1 메시지 키 구조

| 페이지 | 키 | 용도 |
|--------|-----|------|
| **join** | pages.join.title, description, backToMain, needLogin, loginLink, loginSuffix | h1, 부제, ← 링크, 푸터 문구 |
| **login** | pages.login.title, description, backToMain, noAccount, signupLink | h1, 부제, ← 링크, 푸터 |
| **signup** | pages.signup.title, description, backToMain, haveAccount, loginLink | h1, 부제, ← 링크, 푸터 |
| **check** | pages.check.title, backToMain | h1, ← 링크 |
| **메타** | pages.join.metaTitle, metaDescription (동일 패턴 login/signup/check) | generateMetadata |

### 2.2 구현 방식

- **공통**: 클라이언트 컴포넌트 `WwwPageShell` — pageKey(join|login|signup|check), children. 내부에서 useTranslations()로 제목·설명·backToMain·푸터(페이지별 링크) 렌더.
- **각 페이지**: WwwPageShell로 기존 제목·설명·뒤로가기·푸터를 대체하고, 기존 폼/콘텐츠는 children으로 전달.
- **메타**: 각 서브페이지에 generateMetadata 추가 — cookies()로 locale 읽어 해당 페이지 metaTitle·metaDescription 반환.

### 2.3 접근성·일관성

- 뒤로가기 링크에 aria-label 또는 유의미한 텍스트 유지.
- 제목은 기존처럼 h1 유지.

---

## 3. 구현 체크리스트 (Phase 10)

- [x] www.pages.join|login|signup|check.* 메시지 추가(ko/en)
- [x] WwwPageShell 클라이언트 컴포넌트
- [x] join/login/signup/check 각 page.tsx에서 Shell 사용 + generateMetadata 추가
- [x] check 페이지는 제목·back만 i18n(나머지 기술 문구는 유지)
- [ ] BENCHMARK·TASKS·ROADMAP 갱신
