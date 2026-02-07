# Sellog 결제(PG) 연동 설계

실제 PG 연동 시 참고할 설계 문서입니다. **현재는 주문만 DB에 저장하고 결제는 미연동** 상태입니다.

---

## 1. 현재 구조

- **체크아웃 흐름**: `[domain]/checkout?product=:id` → `CheckoutForm` 제출 → `createOrderAction` → `orders` + `order_items` INSERT (status: `pending`) → `/[domain]/checkout/success?order=:id`
- **관련 파일**
  - `src/app/[domain]/checkout/actions.ts` — `createOrderAction` (주문·주문항목 생성)
  - `src/app/[domain]/checkout/CheckoutForm.tsx` — 수량·이메일 입력 후 주문 생성
  - `src/app/[domain]/checkout/success/page.tsx`, `fail/page.tsx`, `cancel/page.tsx`
- **orders 테이블**: `id`, `blog_id`, `status`, `customer_email`, `updated_at` 등 (마이그레이션 `002_orders.sql` 참고)

---

## 2. PG 후보 및 특징

| PG | 특징 | 적합한 경우 |
|----|------|-------------|
| **토스페이먼츠** | 국내 점유율 높음, 문서·SDK 양호, 정산 간편 | 한국 결제 위주, 간단 연동 |
| **PortOne(아임포트)** | 통합 결제창, 여러 PG 한 번에 연동 | 여러 PG/간편결제 동시 지원 |
| **Stripe** | 해외 결제·구독에 강함, API 일관적 | 해외 결제·구독·다중 통화 |

**권장**: 국내 단일 PG면 **토스페이먼츠**, 여러 PG/간편결제 필요하면 **PortOne**.

---

## 3. 연동 방식 (공통 개념)

1. **주문 생성**  
   - 지금처럼 `createOrderAction`에서 `orders` + `order_items` INSERT, `status: 'pending'` 유지.
2. **결제 요청**  
   - **방식 A**: 서버에서 PG API로 결제 요청 → 결제 URL 또는 결제키 클라이언트에 전달 → 리다이렉트 또는 SDK 결제창.
   - **방식 B**: 클라이언트에서 PG SDK 로드 → 주문금액·orderId 등 전달 → SDK로 결제 진행.
3. **콜백 처리**  
   - PG가 호출하는 **success/cancel/fail** URL 또는 **웹훅**에서:
     - 결제 검증(서버에서 PG API로 확인),
     - `orders.status` 업데이트 (`paid` / `failed` / `cancelled`),
     - 필요 시 `orders.pg_payment_id`, `orders.paid_at` 등 저장.
4. **성공/실패 화면**  
   - 기존 `/[domain]/checkout/success`, `fail`, `cancel` 페이지에 orderId/결과 메시지 표시.

---

## 4. 토스페이먼츠 연동 시 추가할 것

- **환경 변수**
  - `TOSS_CLIENT_KEY` (클라이언트, 공개 가능)
  - `TOSS_SECRET_KEY` (서버, 비공개)
- **설치**
  - `@tosspayments/payment-sdk` 또는 서버용 SDK (문서 확인).
- **코드 변경**
  - `createOrderAction`: 주문 생성 후 **결제 요청** 생성(토스 API 또는 SDK) → **결제 URL 또는 paymentKey** 반환.
  - `CheckoutForm`: 반환값으로 토스 결제창 오픈(리다이렉트 또는 SDK) → 완료 시 `success?order=:id` 등으로 이동.
  - **콜백 라우트** (예: `/[domain]/checkout/callback` 또는 토스가 지정한 URL): 토스 응답 수신 → 검증 → `orders` 업데이트.
- **DB**
  - `orders`에 `pg_provider`(예: `toss`), `pg_payment_id`, `paid_at` 등 컬럼 추가 권장 (마이그레이션 별도).

---

## 5. PortOne(아임포트) 연동 시 추가할 것

- **환경 변수**
  - `PORTONE_IMP_KEY` (가맹점 식별자)
  - `PORTONE_API_SECRET` (서버 검증용)
- **설치**
  - `portone` (또는 아임포트 React 패키지) 문서 기준 설치.
- **코드 변경**
  - 결제 요청 시 `orderId`(우리 orders.id), `amount`, `customerEmail` 등 전달.
  - 결제 완료 콜백/웹훅에서 검증 후 `orders.status` 업데이트.

---

## 6. Stripe 연동 시 추가할 것

- **환경 변수**
  - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
  - `STRIPE_SECRET_KEY`
- **설치**
  - `stripe`, `@stripe/stripe-js` 등.
- **코드 변경**
  - Checkout Session 또는 PaymentIntent 생성(서버) → 클라이언트에서 Stripe.js로 결제 → `success_url`/`cancel_url`을 기존 success/cancel 페이지로 설정.
  - 웹훅으로 `payment_intent.succeeded` 등 처리 후 `orders` 업데이트.

---

## 7. 진행 순서 (실제 연동 시)

1. PG 사 선택 후 개발자 계정·키 발급.
2. `orders` 테이블에 PG 관련 컬럼 추가(마이그레이션).
3. `createOrderAction` (또는 새 Server Action)에서 주문 생성 + PG 결제 요청 생성.
4. 클라이언트에서 PG 결제창/리다이렉트 연동.
5. PG 콜백/웹훅 라우트 추가 → 검증 후 `orders` 업데이트.
6. success/fail/cancel 페이지에서 orderId 기반 결과 표시 및 재결제 등 UX 정리.

---

이 문서는 설계 참고용이며, 실제 연동 시 각 PG 최신 문서를 반드시 확인하세요.
