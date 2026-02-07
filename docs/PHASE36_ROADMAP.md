# Phase 36 — 상품 액션 에러 i18n · 글로벌

[domain]/products **서버 액션**(createProductAction·updateProductAction·deleteProductAction)이 반환하는 **에러 메시지**를 메시지 키로 통일하고, ProductForm·ProductEditForm·ProductDeleteButton에서 에러 표시 시 t(error)로 ko/en 표시하는 기획 및 실행 계획입니다.

---

## 1. 목표 요약

| 축 | 목표 | 우선순위 |
|----|------|----------|
| **액션 에러** | 상품 생성/수정/삭제 액션 반환값을 blog.products.error.* 키로 통일 | P0 |
| **에러 표시** | ProductForm·ProductEditForm에서 result.error를 t(error)로 표시 | P0 |
| **삭제 에러** | deleteProductAction 반환 에러 표시처(ProductDeleteButton 등) t(error) 적용 | P0 |
| **글로벌** | blog.products.error.* ko/en | P0 |
| **고도화** | DB/제약 오류는 error.unknown으로 반환해 확장 용이 | P1 |

---

## 2. 메시지 구조

- **blog.products.error**: dbError, createRequired(블로그 정보+상품명), nameRequired(상품명), priceInvalid, imageSizeMax, unknown

---

## 3. 구현

- **메시지**: ko.json / en.json에 blog.products.error.* 추가.
- **products/actions.ts**: createProductAction·updateProductAction·deleteProductAction에서 한글 대신 위 키 반환. Supabase error 시 unknown 반환.
- **ProductForm·ProductEditForm**: error 표시를 t(error)로 변경.
- **ProductDeleteButton**: 삭제 실패 시 에러 표시가 있다면 t(error) 적용(현재 toast/표시 방식 확인 후 반영).

---

## 4. 체크리스트 (Phase 36)

- [x] blog.products.error.* 메시지 추가(ko/en)
- [x] products/actions.ts 에러 반환을 키로 변경
- [x] ProductForm·ProductEditForm 에러 표시 t(error)
- [x] ProductDeleteButton 에러 표시 t(result.error) 토스트
- [x] TASKS 갱신
