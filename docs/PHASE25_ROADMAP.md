# Phase 25 — 체크아웃 폼 i18n · 글로벌

[domain] 체크아웃 **주문 폼(CheckoutForm)** 내 라벨·버튼·안내 문구·가격 표시를 메시지 키화하고 ko/en 및 locale별 숫자 포맷에 맞추는 기획 및 실행 계획입니다.

---

## 1. 목표 요약

| 축 | 목표 | 우선순위 |
|----|------|----------|
| **폼 라벨** | 수량·이메일 라벨·placeholder 메시지 키화 | P0 |
| **버튼·안내** | 주문하기·처리 중·취소·하단 안내 문구 키화 | P0 |
| **가격 표시** | locale 기반 toLocaleString + blog.products.currencySuffix | P0 |
| **글로벌** | blog.checkout.form.* ko/en | P0 |
| **고도화** | 결제 단계 추가 시 동일 form.* 네임스페이스 확장 용이 | P1 |

---

## 2. 메시지 구조

- **blog.checkout.form**: quantity, emailLabel, emailPlaceholder, notice, submit, submitting, cancel

---

## 3. 구현

- **메시지**: ko.json / en.json 에 blog.checkout.form.* 추가.
- **CheckoutForm** (client): useLocale() 도입, t("blog.checkout.form.*"), priceLocale = locale === "ko" ? "ko-KR" : "en-US", currencySuffix = t("blog.products.currencySuffix"). 상품 가격 표시·수량 라벨·이메일 라벨·placeholder·안내 문구·제출/취소 버튼 모두 t() 및 locale 기반 포맷 적용.
- **에러 메시지**: createOrderAction 반환 error 문자열은 본 Phase 범위 외(서버 메시지 i18n은 별도 Phase에서 처리 가능).

---

## 4. 체크리스트 (Phase 25)

- [x] blog.checkout.form.* 메시지 추가(ko/en)
- [x] CheckoutForm에 useLocale·t()·priceLocale·currencySuffix 적용
- [x] TASKS 갱신
