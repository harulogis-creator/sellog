# Phase 16 — Join(블로그 만들기) 폼 i18n · 고도화 · 글로벌

www Join 페이지의 **CreateBlogForm** 라벨·플레이스홀더·힌트·버튼·에러 메시지**를 메시지 키화하고, 서버 액션(createBlogAction)은 **에러 코드**를 반환해 클라이언트에서 locale별 메시지를 표시하도록 하는 기획 및 실행 계획입니다.

---

## 1. 목표 요약

| 축 | 목표 | 우선순위 |
|----|------|----------|
| **폼 라벨·힌트 i18n** | 서브도메인, 블로그 이름, 한 줄 소개, 주소 안내 문구, 입력 규칙 힌트 | P0 |
| **버튼 i18n** | "블로그 만들기", "만드는 중…" | P0 |
| **에러 메시지 i18n** | createBlogAction 검증·DB 에러를 코드로 반환, 클라이언트에서 t() | P0 |
| **고도화** | 알려진 코드만 번역, Supabase 등 원문은 그대로 표시 | P1 |
| **글로벌** | ko/en 메시지 동일 구조로 확장 가능 | P0 |

---

## 2. 메시지 구조

- **www.join**
  - subdomain, name, description (라벨)
  - subdomainPlaceholder, namePlaceholder, descriptionPlaceholder
  - subdomainTitle: input title(패턴 설명)
  - addressHint: "블로그 주소: …"
  - create, creating (버튼)
- **www.join.errors**
  - env_missing, login_required, subdomain_name_required, subdomain_format, subdomain_min_length, subdomain_taken

---

## 3. 서버 액션 변경

- **createBlogAction**: 검증/DB 실패 시 한글 문장 대신 **에러 코드** 반환.
  - env 없음 → `env_missing`
  - 비로그인 → `login_required`
  - subdomain/name 빈값 → `subdomain_name_required`
  - 패턴 불일치 → `subdomain_format`
  - 길이 2자 미만 → `subdomain_min_length`
  - 23505(중복) → `subdomain_taken`
  - 그 외 DB 에러 → error.message 그대로 (번역 불가)

---

## 4. 클라이언트 변경

- **CreateBlogForm**
  - useTranslations("www.join")
  - Label, placeholder, title, addressHint, 버튼 텍스트 모두 t() 사용
  - result.error 수신 시: `t('www.join.errors.' + result.error)` 키 존재하면 번역문 표시, 없으면 result.error 그대로 (JoinErrorAlert 패턴 또는 인라인 동일 로직)

---

## 5. 체크리스트 (Phase 16)

- [x] www.join, www.join.errors 메시지 추가(ko/en)
- [x] createBlogAction 에러 코드 반환으로 변경
- [x] CreateBlogForm 라벨·플레이스홀더·힌트·버튼·에러 i18n 적용
- [ ] (선택) TASKS·ROADMAP 갱신
