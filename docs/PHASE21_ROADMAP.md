# Phase 21 — 블로그 목록·빈 상태·섹션 라벨 i18n · 글로벌

[domain] 블로그 영역의 **글 목록(PostsListWithFilter)** 필터·빈 상태·버튼 라벨, **상품/설정 페이지** 섹션 제목·EmptyState, **글 수정 페이지** 상단 헤더 링크를 메시지 키화하고 ko/en으로 통일하는 기획 및 실행 계획입니다.

---

## 1. 목표 요약

| 축 | 목표 | 우선순위 |
|----|------|----------|
| **PostsListWithFilter i18n** | 필터(전체/초안/발행됨), 빈 상태 문구·액션, 수정/보기, 날짜 locale | P0 |
| **EmptyState 키 지원** | titleKey, descriptionKey, actionLabelKey 옵션 추가(기존 title/description/action 호환) | P0 |
| **섹션 제목 i18n** | 상품 추가·등록된 상품, 블로그 정보·내 프로필(설정), 빈 상품 EmptyState | P0 |
| **글 수정 헤더** | ← 글 보기, 목록, 홈 링크 텍스트 i18n | P0 |
| **글로벌** | blog.posts.*, blog.section.*, blog.empty.* ko/en | P0 |

---

## 2. 메시지 구조

- **blog.posts**: filterAll, filterDrafts, filterPublished, filterAria, countSuffix(개), emptyTitle, emptyDesc, emptyAction, noDrafts, noPublished, editedAt, publishedAt, badgeDraft, badgePublished, edit, view
- **blog.section**: addProduct, registeredProducts, blogInfo, myProfile, myProfileDesc
- **blog.empty**: noProducts, noProductsDesc
- **blog.editPost**: backToView (← 글 보기)

---

## 3. 구현

- **EmptyState**: "use client", useLocale(). titleKey/descriptionKey/action.labelKey 옵션 추가 시 t() 사용, 없으면 기존 props 사용.
- **PostsListWithFilter**: useLocale(), 필터 라벨·빈 상태·버튼·뱃지·날짜 포맷 t() 및 locale 반영.
- **products 페이지**: 섹션 h2를 BlogSectionHeader(클라이언트, messageKey) 또는 직접 키 전달용 클라이언트 래퍼로 교체, EmptyState에 titleKey/descriptionKey 전달.
- **settings 페이지**: 섹션 제목·설명을 메시지 키로 표시(클라이언트 래퍼 또는 BlogSectionHeader + t()).
- **post/[slug]/edit**: 상단 헤더(← 글 보기, 목록, 홈)를 클라이언트 컴포넌트로 분리해 t() 적용.

---

## 4. 체크리스트 (Phase 21)

- [x] blog.posts.*, blog.section.*, blog.empty.*, blog.editPost.* 메시지 추가(ko/en)
- [x] EmptyState 클라이언트화·titleKey/descriptionKey/action.labelKey 옵션
- [x] PostsListWithFilter 전면 i18n (필터·빈 상태·뱃지·날짜 locale)
- [x] products·settings 섹션(BlogSectionHeader)·EmptyState 키 적용, SettingsProfileDesc
- [x] post edit 헤더 PostEditHeader 클라이언트·i18n
- [ ] (선택) TASKS 갱신
