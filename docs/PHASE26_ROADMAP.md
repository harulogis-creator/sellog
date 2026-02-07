# Phase 26 — 글 본문 상품 카드·임베드 i18n · 글로벌

블로그 **글 본문** 내 상품 임베드([product:uuid]) 영역의 **ProductCard** 문구 및 상품 미존재 안내 메시지를 메시지 키화하고 ko/en, locale별 가격 포맷에 맞추는 기획 및 실행 계획입니다.

---

## 1. 목표 요약

| 축 | 목표 | 우선순위 |
|----|------|----------|
| **ProductCard** | "이미지 없음"·"구매하기"·가격 표시(currencySuffix + priceLocale) i18n | P0 |
| **PostBody** | 상품 ID 미존재 시 "[상품을 찾을 수 없음: id]" 메시지 키화 | P0 |
| **글로벌** | blog.productCard.*, blog.post.productNotFoundInEmbed ko/en | P0 |
| **고도화** | 이후 카드에 할인가·재고 등 추가 시 productCard.* 확장 용이 | P1 |

---

## 2. 메시지 구조

- **blog.productCard**: noImage, buy (구매하기)
- **blog**: productNotFoundInEmbed ("상품을 찾을 수 없음: {{id}}" / "Product not found: {{id}}")
- 가격: 기존 **blog.products.currencySuffix** + locale 기반 priceLocale(ko-KR / en-US) 재사용

---

## 3. 구현

- **메시지**: ko.json / en.json에 blog.productCard.*, blog.post.productNotFoundInEmbed 추가.
- **ProductCard**: "use client" 추가, useLocale(), t("blog.productCard.*"), 가격은 toLocaleString(priceLocale) + t("blog.products.currencySuffix"). 비활성 버튼 텍스트도 동일 키 사용.
- **PostBody** 상품 미존재: 서버 컴포넌트이므로 클라이언트 컴포넌트 **ProductEmbedFallback** 생성(id prop), t("blog.productNotFoundInEmbed").replace("{{id}}", id). PostBody에서 해당 블록을 ProductEmbedFallback으로 교체.

---

## 4. 체크리스트 (Phase 26)

- [x] blog.productCard.*, blog.productNotFoundInEmbed 메시지 추가(ko/en)
- [x] ProductCard 클라이언트화·useLocale·t()·가격 locale 적용
- [x] ProductEmbedFallback 클라이언트 컴포넌트 생성 및 PostBody 적용
- [x] TASKS 갱신
