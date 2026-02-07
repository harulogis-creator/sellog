# Phase 18 — www 잔여 하드코딩 i18n · 접근성 · 글로벌

www 구역에서 **접근성(aria-label)·법적 링크·AuthNav·Logout·loading·error** 등 남은 하드코딩 문구를 메시지 키화하고 ko/en으로 통일하는 기획 및 실행 계획입니다.

---

## 1. 목표 요약

| 축 | 목표 | 우선순위 |
|----|------|----------|
| **접근성 i18n** | 푸터 언어 버튼 aria-label, 헤더 메뉴/열기·닫기/모바일 메뉴 aria-label | P0 |
| **법적 링크 i18n** | 이용 약관, 개인정보 처리방침 링크 텍스트 | P0 |
| **AuthNav·Logout** | 로딩 중 문구, 로그인/회원가입 링크 텍스트, 로그아웃 버튼 (locale 경로 반영) | P0 |
| **loading·error** | www 로딩 문구, app/www error 경계 문구(common.error 사용·locale 링크) | P0 |
| **글로벌** | ko/en 동일 키 구조, 추후 법적 페이지 경로 확장 가능 | P0 |

---

## 2. 메시지 구조

- **common.loading**: "로딩 중..." (AuthNav, www loading 공용)
- **www.footer**: ariaLabelKorean, ariaLabelEnglish, termsOfService, privacyPolicy 추가
- **www.nav**: ariaMainMenu, ariaOpenMenu, ariaCloseMenu, ariaMobileMenu, logout 추가 (login/signup 기존 사용)
- **common.error**: 기존 title, retry, home 사용

---

## 3. 구현

- **WwwFooter**: aria-label을 t("www.footer.ariaLabelKorean") / t("www.footer.ariaLabelEnglish"), 링크 텍스트 t("www.footer.termsOfService"), t("www.footer.privacyPolicy").
- **WwwHeader**: nav·버튼 aria-label을 t("www.nav.ariaMainMenu"), t("www.nav.ariaOpenMenu"), t("www.nav.ariaCloseMenu"), t("www.nav.ariaMobileMenu").
- **LogoutButton**: useTranslations, 버튼 텍스트 t("www.nav.logout").
- **AuthNav**: 로딩 문구 t("common.loading"), 로그인/회원가입 링크 텍스트 t("www.nav.login")/t("www.nav.signup"), href는 locale 기반(basePath)으로 변경.
- **app/www/loading.tsx**: common.loading 사용을 위해 클라이언트 래퍼 또는 정적 메시지 적용.
- **app/www/error.tsx**: LocaleProvider 미제공 구간 대비, common.error + cookie 기반 locale 또는 기본 ko 메시지 사용, 홈 링크는 /www → locale 기반으로 보정.

---

## 4. 체크리스트 (Phase 18)

- [x] common.loading, www.footer(aria·법적), www.nav(aria·logout) 메시지 추가(ko/en)
- [x] WwwFooter·WwwHeader·LogoutButton·AuthNav·loading·error 반영
- [x] 루트 layout에 LocaleProvider 추가 (app/www/error에서 t() 사용 가능하도록)
- [ ] (선택) TASKS 갱신
