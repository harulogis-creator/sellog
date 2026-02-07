# Phase 22 — 상품 목록 행 i18n · 가격 포맷 · 글로벌

[domain] 상품 관리 페이지의 **등록된 상품 목록** 행(수정 버튼·가격 표시·수정 링크 aria-label)을 메시지 키화하고, 가격을 locale별 포맷(ko-KR / en-US) 및 통화 접미어(원 / KRW)로 표시하는 기획 및 실행 계획입니다.

---

## 1. 목표 요약

| 축 | 목표 | 우선순위 |
|----|------|----------|
| **상품 행 라벨 i18n** | 수정 버튼 텍스트, 수정 링크 aria-label 메시지 키화 | P0 |
| **가격 포맷** | toLocaleString(locale), 통화 접미어(원 / KRW) locale별 표시 | P0 |
| **클라이언트 목록** | ProductList 클라이언트 컴포넌트로 분리해 useLocale·t() 적용 | P0 |
| **글로벌** | blog.products.edit, editAria, currencySuffix ko/en | P0 |

---

## 2. 메시지 구조

- **blog.products**: edit, editAria, currencySuffix(ko: "원", en: " KRW")

---

## 3. 구현

- **ProductList** (클라이언트): domain, products props. useLocale()로 locale·t(). 가격은 toLocaleString(locale === "ko" ? "ko-KR" : "en-US") + t("blog.products.currencySuffix"). 수정 버튼·aria-label은 t("blog.products.edit"), t("blog.products.editAria").
- **products/page.tsx**: ProductRow 인라인 제거, products.length > 0일 때 \<ProductList domain={domain} products={products} /> 렌더.
- **ProductDeleteButton**: 기존 유지(다음 Phase에서 메시지 키화 가능).

---

## 4. 체크리스트 (Phase 22)

- [x] blog.products.edit, editAria, currencySuffix 메시지 추가(ko/en)
- [x] ProductList 클라이언트 컴포넌트 구현 (가격 locale·통화 접미어, 수정·aria t())
- [x] products 페이지에 ProductList 적용
- [ ] (선택) TASKS 갱신
