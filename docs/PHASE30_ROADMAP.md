# Phase 30 — 상품 폼 i18n · 글로벌

상품 추가(ProductForm)·상품 수정(ProductEditForm)의 라벨·placeholder·AI 버튼·이미지 안내·토스트 메시지를 메시지 키화하고 ko/en으로 통일하는 기획 및 실행 계획입니다.

---

## 1. 목표 요약

| 축 | 목표 | 우선순위 |
|----|------|----------|
| **상품 폼** | 상품명·가격·이미지·설명 라벨/placeholder/힌트 i18n | P0 |
| **AI·토스트** | AI 상품명/설명/이미지 alt 버튼·생성 중·토스트 4종 | P0 |
| **추가/저장** | 상품 추가·추가 중·상품이 추가/저장됐어요 | P0 |
| **AI 컨텍스트** | getProductContext() fallback "상품" 메시지 키화 | P0 |
| **글로벌** | blog.products.form.* ko/en | P0 |
| **고도화** | 상품 필드 추가 시 products.form.* 확장 용이 | P1 |

---

## 2. 메시지 구조

- **blog.products.form**: nameLabel, namePlaceholder, priceLabel, pricePlaceholder, imageLabel, imageHint, imageHintEdit, currentImage, currentImageAlt, descriptionLabel, descriptionPlaceholder, aiGenerating, aiName, aiDescription, aiImageAlt, addButton, addingButton, toastNameFilled, toastDescriptionFilled, toastAdded, toastSaved, defaultContext

---

## 3. 구현

- **메시지**: ko.json / en.json에 blog.products.form.* 추가.
- **ProductForm**: useLocale(), t("blog.products.form.*"), AI fallback getProductContext() || t("blog.products.form.defaultContext"), 토스트 t().
- **ProductEditForm**: 동일 + imageHintEdit, currentImage, currentImageAlt, toastSaved.

---

## 4. 체크리스트 (Phase 30)

- [x] blog.products.form.* 메시지 추가(ko/en)
- [x] ProductForm useLocale·t() 적용
- [x] ProductEditForm t() 적용(라벨·토스트·AI fallback)
- [x] TASKS 갱신
