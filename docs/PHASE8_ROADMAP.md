# Phase 8 — 프로모 배너 i18n · 메타·SEO 다국어 · 접근성

벤치마크(Squarespace 상단 프로모·스킵 링크)와 글로벌 SEO를 반영한 **디테일 기획** 및 실행 계획입니다.

---

## 1. 목표 요약

| 축 | 목표 | 우선순위 |
|----|------|----------|
| **배너 i18n** | 상단 AnnouncementBar 문구 메시지 키화, 한/영 전환 시 배너도 일치 | P0 |
| **메타·SEO 다국어** | www 페이지 메타(title, description, OG)를 쿠키 locale에 따라 동적 반영 | P0 |
| **접근성 고도화** | Skip to main content 링크, 메인 영역 id 부여(Squarespace·WCAG 참고) | P0 |
| **글로벌** | 검색엔진·OG 공유 시 사용자 언어에 맞는 메타 노출 기반 마련, 추후 hreflang 확장 시 대비 | P1 |

---

## 2. 작업 상세

### 2.1 상단 프로모 배너 i18n

| 항목 | 상세 |
|------|------|
| **키** | `www.banner.title`, `www.banner.description`, `www.banner.cta`, `www.banner.closeLabel` |
| **구현** | AnnouncementBar에서 useTranslations()로 위 키 사용, 기존 닫기·localStorage 유지 |

### 2.2 www 메타·SEO 다국어

| 항목 | 상세 |
|------|------|
| **방식** | www/page.tsx에서 `generateMetadata` export, cookies()로 sellog_locale 읽어 locale 결정 |
| **메타** | locale에 따라 title·description·openGraph를 messages의 www.hero.title/description 또는 전용 meta 키 사용 |
| **canonical** | 기존 alternates.canonical 유지 |

### 2.3 접근성

| 항목 | 상세 |
|------|------|
| **스킵 링크** | 본문 최상단에 "Skip to main content" 링크, 포커스 시에만 보이거나 상단 고정 스타일 |
| **메인 영역** | layout의 콘텐츠 wrapper에 `id="main-content"` 또는 `id="content"`, 스킵 링크 target과 일치 |

---

## 3. 구현 체크리스트 (Phase 8)

- [x] www.banner.* 메시지 추가(ko/en), AnnouncementBar i18n
- [x] www/page.tsx generateMetadata(cookies → locale → 메타 반환), layout 메타는 서브페이지 폴백 유지
- [x] SkipToContent 컴포넌트 + layout에 스킵 링크, main id="main-content"
- [x] BENCHMARK·TASKS·ROADMAP 갱신
