# Phase 38 — 체크아웃(Checkout) 액션 에러 i18n · 글로벌

[domain]/checkout의 **서버 액션** createOrderAction이 반환하는 **에러 메시지**를 메시지 키로 통일하고, CheckoutForm에서 에러 표시 시 `t(error)`로 ko/en 표시하는 기획 및 실행 계획입니다.

---

## 1. 목표 요약

| 축 | 목표 | 우선순위 |
|----|------|----------|
| **액션 에러** | createOrderAction 반환값을 blog.checkout.error.* 키로 통일 | P0 |
| **에러 표시** | CheckoutForm에서 result.error를 t(error)로 표시, 토스트 일관 시 t(result.error) 적용 | P0 |
| **글로벌** | blog.checkout.error.* ko/en | P0 |
| **고도화** | DB/주문 오류는 error.unknown으로 반환해 확장 용이 | P1 |

---

## 2. 메시지 구조

- **blog.checkout.error**: dbError, quantityInvalid(수량), productNotFound(상품 없음), unknown(insert 실패 등)

---

## 3. 액션 매핑

| 조건 | 반환 키 |
|------|---------|
| !supabase | blog.checkout.error.dbError |
| quantity < 1 | blog.checkout.error.quantityInvalid |
| productError \|\| !product | blog.checkout.error.productNotFound |
| orderError / itemError | blog.checkout.error.unknown |

---

## 4. 구현

- **메시지**: ko.json / en.json의 blog.checkout 하위에 error.* 추가.
- **checkout/actions.ts**: 한글/orderError.message/itemError.message → 위 키 반환.
- **CheckoutForm**: 에러 문구 t(error), 실패 시 toast.error(t(result.error)) 추가(선택·일관성).

---

## 5. 체크리스트 (Phase 38)

- [x] blog.checkout.error.* 메시지 추가(ko/en)
- [x] checkout/actions.ts createOrderAction 에러 반환을 키로 변경
- [x] CheckoutForm 에러 표시 t(error), 토스트 t(result.error)
- [x] TASKS 갱신
