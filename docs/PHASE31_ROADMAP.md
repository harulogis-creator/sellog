# Phase 31 — 모바일 하단 네비 i18n · 글로벌

[domain] 모바일 전용 **DomainBottomNav**(하단 탭바)의 탭 라벨(홈·글·상품·설정) 및 네비게이션 aria-label을 메시지 키화하고 ko/en으로 통일하는 기획 및 실행 계획입니다.

---

## 1. 목표 요약

| 축 | 목표 | 우선순위 |
|----|------|----------|
| **탭 라벨** | 홈·글·상품·설정 → blog.bottomNav.* | P0 |
| **접근성** | role="navigation" aria-label i18n | P0 |
| **글로벌** | blog.bottomNav.*, blog.aria.bottomNav ko/en | P0 |
| **고도화** | 탭 추가 시 bottomNav.* 확장 용이 | P1 |

---

## 2. 메시지 구조

- **blog.bottomNav**: home, posts, products, settings
- **blog.aria**: bottomNav (하단 메뉴 / Bottom navigation)

---

## 3. 구현

- **메시지**: ko.json / en.json에 blog.bottomNav.*, blog.aria.bottomNav 추가(aria는 기존 blog.aria에 bottomNav 키 추가).
- **DomainBottomNav**: "use client" 유지, useLocale(), tabs를 t("blog.bottomNav.*")로 렌더링. aria-label={t("blog.aria.bottomNav")}. 탭 배열은 키 기반으로 순회하거나 탭 정의에서 label을 키로 두고 t(label)로 표시.

---

## 4. 체크리스트 (Phase 31)

- [x] blog.bottomNav.*, blog.aria.bottomNav 메시지 추가(ko/en)
- [x] DomainBottomNav useLocale·t() 적용
- [x] TASKS 갱신
