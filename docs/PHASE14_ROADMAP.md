# Phase 14 — Sitemap 확장 · 다국어 URL · 글로벌 SEO

경로 기반 locale(Phase 11)과 hreflang에 맞춰 **sitemap에 locale별 www 메인·서브경로**를 추가하여 검색엔진이 한/영 랜딩·가입·로그인·연결확인 페이지를 수집할 수 있도록 하는 기획 및 실행 계획입니다.

---

## 1. 목표 요약

| 축 | 목표 | 우선순위 |
|----|------|----------|
| **Sitemap 확장** | /ko/www, /en/www뿐 아니라 join·login·signup·check를 locale별로 sitemap에 포함 | P0 |
| **글로벌 SEO** | 검색엔진이 다국어 www URL을 발견·크롤링하기 쉽게 함 | P0 |
| **일관성** | generateMetadata의 alternates.languages와 sitemap URL 세트 일치 | P1 |

---

## 2. 추가할 URL 목록

| 경로 | priority | changeFrequency |
|------|----------|-----------------|
| /ko/www, /en/www | 0.95 | daily |
| /ko/www/join, /en/www/join | 0.9 | weekly |
| /ko/www/login, /en/www/login | 0.85 | weekly |
| /ko/www/signup, /en/www/signup | 0.85 | weekly |
| /ko/www/check, /en/www/check | 0.7 | monthly |

---

## 3. 구현

- **app/sitemap.ts**: LOCALES(ko, en)와 www 서브경로 목록(join, login, signup, check)을 순회하여 `baseUrl/${locale}/www`, `baseUrl/${locale}/www/${sub}` 항목 추가.
- **next-sitemap.config.js**: exclude에 `/www`만 있음. 현재 실제 라우트는 /ko/www, /en/www이므로 기존 exclude 유지 또는 제거(선택).

---

## 4. 체크리스트 (Phase 14)

- [x] app/sitemap.ts에 locale별 www·join·login·signup·check URL 추가 (LOCALES·WWW_SUBPATHS)
- [ ] TASKS·ROADMAP 갱신
