# Phase 41 — 로그인·회원가입 액션 Auth 에러 i18n · 글로벌

loginAction·signupAction이 Supabase Auth 실패 시 반환하는 **raw error.message**를 메시지 키로 통일하고, LoginForm·SignupForm에서 `www.auth.errors.*`로 ko/en 표시하도록 하는 기획 및 실행 계획입니다.

---

## 1. 목표 요약

| 축 | 목표 | 우선순위 |
|----|------|----------|
| **Auth 에러** | signInWithPassword/signUp 실패 시 error.message 대신 www.auth.errors.unknown 반환 | P0 |
| **에러 표시** | 기존 폼 로직(www.auth.errors.${result.error})으로 번역 문구 표시 | P0 |
| **글로벌** | www.auth.errors.unknown ko/en | P0 |
| **고도화** | 추후 이메일 중복·비밀번호 정책 등 키 확장 용이 | P1 |

---

## 2. 현황

- loginAction: 이메일/비밀번호 없음 → email_password_required. Supabase signIn 실패 시 `return { error: error.message }` (raw).
- signupAction: 동일 검증 + password_min_length. signUp 실패 시 `return { error: error.message }`.
- LoginForm·SignupForm: `t(www.auth.errors.${result.error})` 사용, 키 없으면 result.error 그대로 표시.

---

## 3. 메시지 구조

- **www.auth.errors**: 기존 no_code, config, email_password_required, password_min_length + **unknown** (로그인/회원가입 처리 중 오류.)

---

## 4. 구현

- **메시지**: ko.json / en.json의 www.auth.errors 하위에 unknown 추가.
- **www/login/actions.ts**: signIn 실패 시 `return { error: "unknown" }`.
- **www/signup/actions.ts**: signUp 실패 시 `return { error: "unknown" }`.
- 폼은 기존 로직 유지(키 반환 시 t(www.auth.errors.unknown) 표시).

---

## 5. 체크리스트 (Phase 41)

- [x] www.auth.errors.unknown 메시지 추가(ko/en)
- [x] loginAction Auth 에러 시 "unknown" 반환
- [x] signupAction Auth 에러 시 "unknown" 반환
- [x] TASKS 갱신
