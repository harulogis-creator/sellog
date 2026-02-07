# Phase 43 — OAuth 버튼 클라이언트 에러 i18n · 글로벌

OAuthButtons에서 signInWithOAuth 실패 시 로그인 페이지로 리다이렉트할 때 **error 쿼리**를 raw error.message 대신 키(unknown)로 통일하여, 로그인 페이지에서 항상 www.auth.errors.unknown 번역으로 표시되도록 하는 기획 및 실행 계획입니다.

---

## 1. 목표 요약

| 축 | 목표 | 우선순위 |
|----|------|----------|
| **클라이언트 OAuth 에러** | signInWithOAuth 실패 시 ?error=error.message 대신 ?error=unknown 리다이렉트 | P0 |
| **에러 표시** | LoginErrorAlert가 unknown으로 번역 표시(Phase 42와 동일) | P0 |
| **글로벌** | www.auth.errors.unknown 활용 | P0 |
| **일관성** | 서버 콜백(Phase 42)과 클라이언트 버튼 에러 처리 통일 | P1 |

---

## 2. 현황

- OAuthButtons: signInWithOAuth 반환 error 시 `window.location.href = .../login?error=${encodeURIComponent(error.message)}` (raw).
- 로그인 페이지·LoginErrorAlert: Phase 42에서 unknown 처리 완료.

---

## 3. 구현

- **OAuthButtons.tsx**: error 시 리다이렉트 URL을 `?error=unknown`으로 변경.
- 메시지·LoginErrorAlert: 변경 없음.

---

## 4. 체크리스트 (Phase 43)

- [x] OAuthButtons signInWithOAuth 실패 시 ?error=unknown 리다이렉트
- [x] TASKS 갱신
