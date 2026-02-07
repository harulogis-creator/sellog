# Phase 24 — 체크아웃 본문 문구 i18n · 글로벌

[domain] 체크아웃 페이지(주문·취소·실패·완료)의 **본문 문구**(상품 선택 안내·상품 없음·주문 제목·취소/실패/완료 제목·설명·버튼)를 메시지 키화하고 ko/en으로 통일하는 기획 및 실행 계획입니다.

---

## 1. 목표 요약

| 축 | 목표 | 우선순위 |
|----|------|----------|
| **주문 페이지** | 상품 미선택/상품 없음 블록·주문 h2 메시지 키화 | P0 |
| **취소/실패/완료** | 제목·설명·블로그로 돌아가기·다시 주문하기 키화 | P0 |
| **클라이언트 블록** | CheckoutMessageBlock, CheckoutOrderHeading, CheckoutCancelBlock, CheckoutFailBlock, CheckoutSuccessBlock | P0 |
| **실패 사유** | reason별 설명(cancelled/기타/일시오류) 메시지 키 | P0 |
| **글로벌** | blog.checkout.* ko/en | P0 |

---

## 2. 메시지 구조

- **blog.checkout**: selectProduct, backToBlog, productNotFound, orderTitle, cancelTitle, cancelDesc, failTitle, failReasonCancelled, failReasonError, failRetry, successTitle, successOrderId({{id}}), successNoPayment

---

## 3. 구현

- **CheckoutMessageBlock** (client): variant 'selectProduct'|'productNotFound', domain. p + Link with t().
- **CheckoutOrderHeading** (client): h2 with t("blog.checkout.orderTitle").
- **CheckoutCancelBlock** (client): domain. title, desc, Link(backToBlog).
- **CheckoutFailBlock** (client): domain, productId?, reason?. title, desc from reason, retry + back links.
- **CheckoutSuccessBlock** (client): domain, orderId?. title, desc (orderId ? successOrderId.replace : successNoPayment), back link.
- **checkout/page.tsx**: !productId → CheckoutMessageBlock selectProduct; !product → CheckoutMessageBlock productNotFound; else CheckoutOrderHeading + CheckoutForm.
- **checkout/cancel|fail|success**: 해당 Block 컴포넌트로 교체.

---

## 4. 체크리스트 (Phase 24)

- [x] blog.checkout.* 메시지 추가(ko/en)
- [x] CheckoutMessageBlock, CheckoutOrderHeading, CheckoutCancelBlock, CheckoutFailBlock, CheckoutSuccessBlock 구현
- [x] checkout 4개 페이지에 블록 적용
- [x] TASKS 갱신
