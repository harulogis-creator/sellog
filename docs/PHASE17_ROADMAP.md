# Phase 17 — 연결 상태 확인(check) 페이지 i18n · 고도화 · 글로벌

www 연결 상태 확인 페이지(/www/check)의 **본문 문구**(DB 접속 라벨, 성공 메시지, env 안내)를 메시지 키화하고 ko/en으로 표시하도록 하는 기획 및 실행 계획입니다.

---

## 1. 목표 요약

| 축 | 목표 | 우선순위 |
|----|------|----------|
| **본문 문구 i18n** | DB 접속 라벨, 성공 문구, .env.local 안내 문구 메시지 키화 | P0 |
| **서버 컴포넌트** | check 페이지는 서버 컴포넌트이므로 params에서 locale 추출 후 messages[locale] 사용 | P0 |
| **고도화** | env 변수명(NEXT_PUBLIC_*)은 코드/운영 용어로 그대로 표시 | P1 |
| **글로벌** | ko/en 동일 구조로 확장 가능 | P0 |

---

## 2. 메시지 구조

- **www.pages.check** (기존: title, backToMain, metaTitle, metaDescription)
  - **dbCheckLabel**: "Supabase DB 접속 (blogs 조회)"
  - **successMessage**: "환경 변수와 DB 연결이 정상이에요. 블로그 만들기를 다시 시도해 보세요."
  - **envHint**: ".env.local을 저장한 뒤 터미널에서 개발 서버를 종료하고 npm run dev로 다시 실행해 주세요."

---

## 3. 구현

- **메시지**: ko.json / en.json의 www.pages.check에 dbCheckLabel, successMessage, envHint 추가.
- **Check 페이지**: generateMetadata와 동일하게 params에서 locale 추출(isValidLocale ? params.domain : "ko"), messages[loc]로 위 키 사용. 리스트 항목의 세 번째 라벨만 dbCheckLabel로 교체, 성공/안내 문단을 successMessage/envHint로 교체.

---

## 4. 체크리스트 (Phase 17)

- [x] www.pages.check.dbCheckLabel, successMessage, envHint 메시지 추가(ko/en)
- [x] check 페이지 본문에 locale 기반 메시지 적용 (params에서 locale 추출, envHint는 npm run dev만 code로 강조)
- [ ] (선택) TASKS 갱신
