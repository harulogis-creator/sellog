# Phase 42 — OAuth 콜백 에러 i18n · 글로벌

/auth/callback에서 exchangeCodeForSession 실패 시 리다이렉트하는 **error 쿼리**를 raw error.message 대신 메시지 키(unknown)로 통일하고, 로그인 페이지 LoginErrorAlert에서 `www.auth.errors.*`로 ko/en 표시하도록 하는 기획 및 실행 계획입니다.

---

## 1. 목표 요약

| 축 | 목표 | 우선순위 |
|----|------|----------|
| **콜백 에러** | OAuth code 교환 실패 시 ?error=error.message 대신 ?error=unknown 리다이렉트 | P0 |
| **에러 표시** | LoginErrorAlert가 unknown을 www.auth.errors.unknown으로 번역 표시 | P0 |
| **글로벌** | 기존 www.auth.errors.unknown 활용(Phase 41) | P0 |
| **고도화** | URL에 raw 메시지 노출 제거, 추후 oauth_* 키 확장 용이 | P1 |

---

## 2. 현황

- auth/callback/route.ts: code 없음 → ?error=no_code, env 없음 → ?error=config. exchangeCodeForSession 실패 시 ?error=encodeURIComponent(error.message) (raw).
- [domain]/www/login: searchParams.error를 LoginErrorAlert에 전달.
- LoginErrorAlert: KNOWN_ERROR_KEYS = ["no_code", "config"], 해당 시 t(www.auth.errors.${message}), 아니면 message 그대로 표시.

---

## 3. 구현

- **auth/callback/route.ts**: exchangeCodeForSession 실패 시 `/www/login?error=unknown` (또는 locale 유지 경로) 리다이렉트. next 파라미터 유지 시 동일하게.
- **LoginErrorAlert**: KNOWN_ERROR_KEYS에 "unknown" 추가 → t(www.auth.errors.unknown) 표시.
- 메시지: www.auth.errors.unknown 이미 있음(Phase 41).

---

## 4. 체크리스트 (Phase 42)

- [x] auth/callback/route.ts OAuth 실패 시 ?error=unknown 리다이렉트
- [x] LoginErrorAlert KNOWN_ERROR_KEYS에 "unknown" 추가
- [x] TASKS 갱신
