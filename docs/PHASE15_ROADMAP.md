# Phase 15 — 로그인·회원가입 폼 i18n · 고도화 · 글로벌

www 로그인·회원가입 페이지의 **폼 라벨·버튼·OAuth 문구·에러 메시지**를 메시지 키화하고, 서버 액션은 **에러 코드**를 반환해 클라이언트에서 locale별 메시지를 표시하도록 하는 기획 및 실행 계획입니다.

---

## 1. 목표 요약

| 축 | 목표 | 우선순위 |
|----|------|----------|
| **폼 라벨·버튼 i18n** | 이메일, 비밀번호, 로그인/회원가입 버튼, 로딩 문구 메시지 키화(ko/en) | P0 |
| **OAuth i18n** | "또는 소셜 계정으로 로그인/가입", GitHub/Google 버튼 라벨 | P0 |
| **에러 메시지 i18n** | LoginErrorAlert(no_code, config), 서버 액션 검증 에러를 코드로 반환·클라이언트에서 t() | P0 |
| **고도화** | 에러 표시 시 코드면 t(code), 아니면 원문(Supabase 등) 그대로 표시 | P1 |

---

## 2. 메시지 구조

- **common.form**: email, password, passwordMin (비밀번호 6자 이상)
- **www.auth**: loggingIn, login, signingUp, signUp, orSocialLogin, orSocialSignup, continueGitHub, continueGoogle
- **www.auth.errors**: noCode, config, email_password_required, password_min_length

---

## 3. 구현

- 서버 액션(login/signup): 검증 실패 시 한글 대신 **에러 코드** 반환(email_password_required, password_min_length). Supabase error.message는 그대로 반환.
- LoginForm/SignupForm: useTranslations(), 라벨·버튼에 t(). 에러 표시 시 `t('www.auth.errors.' + code)` 존재하면 사용, 없으면 result.error 그대로.
- LoginErrorAlert: useTranslations(), message가 no_code/config 등이면 t(), 아니면 message 그대로.
- OAuthButtons: useTranslations()로 구분선 문구·버튼 라벨.

---

## 4. 체크리스트 (Phase 15)

- [x] common.form.*, www.auth.*, www.auth.errors.* 메시지 추가(ko/en)
- [x] login/signup 액션 검증 에러를 코드로 반환(email_password_required, password_min_length)
- [x] LoginForm, SignupForm, OAuthButtons, LoginErrorAlert i18n 적용
- [ ] TASKS·ROADMAP 갱신
