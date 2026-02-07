# Phase 40 — Join(블로그 만들기) 액션 DB 에러 i18n · 글로벌

createBlogAction이 Supabase insert 실패 시 반환하는 **raw error.message**를 메시지 키로 통일하고, CreateBlogForm에서 항상 `t(www.join.errors.*)`로 표시하도록 하는 기획 및 실행 계획입니다.

---

## 1. 목표 요약

| 축 | 목표 | 우선순위 |
|----|------|----------|
| **DB 에러** | insert 실패 시 error.message 대신 www.join.errors.unknown 키 반환 | P0 |
| **에러 표시** | CreateBlogForm에서 알 수 없는 키도 unknown으로 fallback해 한글 노출 방지 | P0 |
| **글로벌** | www.join.errors.unknown ko/en | P0 |
| **고도화** | 추후 DB 제약별 키 확장(예: notFound) 용이 | P1 |

---

## 2. 현황

- createBlogAction: 23505 → "subdomain_taken" 반환. 그 외 DB 에러 시 `return { error: error.message }` (raw).
- CreateBlogForm: KNOWN_JOIN_ERROR_KEYS에 있는 키만 `t(www.join.errors.${error})`, 나머지는 `error` 그대로 표시 → 영문/한글 혼재 가능.

---

## 3. 메시지 구조

- **www.join.errors**: 기존 키 + **unknown** (저장 중 오류가 발생했습니다. / An error occurred while saving.)

---

## 4. 구현

- **메시지**: ko.json / en.json의 www.join.errors 하위에 unknown 추가.
- **www/join/actions.ts**: `if (error)` 블록에서 23505가 아니면 `return { error: "unknown" }`.
- **CreateBlogForm**: KNOWN_JOIN_ERROR_KEYS에 "unknown" 추가. (선택) 알 수 없는 키일 때 fallback으로 t("www.join.errors.unknown") 표시.

---

## 5. 체크리스트 (Phase 40)

- [x] www.join.errors.unknown 메시지 추가(ko/en)
- [x] createBlogAction DB 에러 시 "unknown" 반환
- [x] CreateBlogForm KNOWN_JOIN_ERROR_KEYS에 "unknown" 추가, 미인식 키 시 fallback t(www.join.errors.unknown)
- [x] TASKS 갱신
