# Phase 37 — 글(Post) 액션 에러 i18n · 글로벌

[domain]/write·[domain]/post/[slug]/edit·[domain]/posts의 **서버 액션**(createPostAction·updatePostAction·deletePostAction)이 반환하는 **에러 메시지**를 메시지 키로 통일하고, WriteForm·EditForm·PostDeleteButton에서 에러 표시 시 `t(error)`로 ko/en 표시하는 기획 및 실행 계획입니다.

---

## 1. 목표 요약

| 축 | 목표 | 우선순위 |
|----|------|----------|
| **액션 에러** | 글 생성/수정/삭제 액션 반환값을 blog.posts.error.* 키로 통일 | P0 |
| **에러 표시** | WriteForm·EditForm에서 result.error를 t(error)로 표시 | P0 |
| **삭제 에러** | deletePostAction 반환 에러를 EditForm·PostDeleteButton에서 t(result.error) 토스트로 표시 | P0 |
| **글로벌** | blog.posts.error.* ko/en | P0 |
| **고도화** | DB/제약 오류는 error.unknown, 슬러그 중복은 slugDuplicate로 확장 용이 | P1 |

---

## 2. 메시지 구조

- **blog.posts.error**: dbError, invalidRequest(블로그/도메인 누락), titleSlugRequired(제목·슬러그), loginRequired, requiredFields(수정 시 필수값), slugDuplicate(23505), unknown

---

## 3. 액션별 매핑

| 액션 | 반환 키 |
|------|---------|
| createPostAction | dbError(미사용 시 대비), invalidRequest, titleSlugRequired, loginRequired, slugDuplicate, unknown |
| updatePostAction | requiredFields, slugDuplicate, unknown |
| deletePostAction | dbError, unknown |

---

## 4. 구현

- **메시지**: ko.json / en.json의 blog.posts 하위에 error.* 추가.
- **write/actions.ts**: createPostAction 한글 → 키 반환, supabase null 시 dbError(선택).
- **post/[slug]/edit/actions.ts**: updatePostAction 한글 → 키 반환.
- **posts/actions.ts**: deletePostAction 반환 타입 추가, 실패 시 { error } 반환 후 redirect 제거(성공 시만 redirect).
- **WriteForm**: 에러 문구·토스트 t(error) / t(result.error).
- **EditForm**: 에러 문구·토스트 t(error) / t(result.error), handleDelete에서 result?.error 시 토스트.
- **PostDeleteButton**: deletePostAction 반환값 처리, 실패 시 toast.error(t(result.error)).

---

## 5. 체크리스트 (Phase 37)

- [x] blog.posts.error.* 메시지 추가(ko/en)
- [x] write/actions.ts createPostAction 에러 반환을 키로 변경
- [x] post/[slug]/edit/actions.ts updatePostAction 에러 반환을 키로 변경
- [x] posts/actions.ts deletePostAction 반환 타입·에러 반환·성공 시만 redirect
- [x] WriteForm·EditForm 에러 표시 t(error), 토스트 t(result.error)
- [x] EditForm handleDelete result?.error 토스트
- [x] PostDeleteButton 삭제 실패 시 t(result.error) 토스트
- [x] TASKS 갱신
