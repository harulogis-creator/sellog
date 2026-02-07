# Phase 34 — 루트 스킵 링크 i18n · 글로벌

**루트 레이아웃**(app/layout.tsx)의 접근성용 "본문으로 건너뛰기" 링크를 메시지 키화하고 ko/en으로 통일하는 기획 및 실행 계획입니다.

---

## 1. 목표 요약

| 축 | 목표 | 우선순위 |
|----|------|----------|
| **스킵 링크** | 본문으로 건너뛰기 텍스트를 common.a11y.skipToContent로 i18n | P0 |
| **클라이언트 컴포넌트** | 루트 레이아웃은 서버 컴포넌트이므로 SkipToContentLink(client)에서 t() 사용 | P0 |
| **글로벌** | common.a11y.skipToContent ko/en | P0 |
| **고도화** | 추후 공통 a11y 라벨 추가 시 common.a11y.* 확장 | P1 |

---

## 2. 메시지 구조

- **common.a11y**: skipToContent ("본문으로 건너뛰기" / "Skip to main content")

---

## 3. 구현

- **메시지**: ko.json / en.json의 common에 a11y.skipToContent 추가(없는 경우만).
- **SkipToContentLink** (client): useLocale(), t("common.a11y.skipToContent"), 기존 layout과 동일한 a 태그·스타일·href="#main-content".
- **app/layout.tsx**: 하드코딩된 링크를 <SkipToContentLink />로 교체.

---

## 4. 체크리스트 (Phase 34)

- [x] common.a11y.skipToContent 메시지 추가(ko/en)
- [x] SkipToContentLink 클라이언트 컴포넌트 생성
- [x] app/layout.tsx에서 SkipToContentLink 사용
- [x] TASKS 갱신
