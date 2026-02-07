# Phase 39 — AI 에러 i18n · 글로벌

suggestWithAi( generateWithAi )가 반환하는 **에러 메시지**를 메시지 키로 통일하고, WriteForm·EditForm·ProductForm·ProductEditForm에서 AI 에러 표시 시 `t(error)`로 ko/en 표시하는 기획 및 실행 계획입니다.

---

## 1. 목표 요약

| 축 | 목표 | 우선순위 |
|----|------|----------|
| **AI 에러** | generateWithAi 반환값을 common.ai.* 키로 통일 | P0 |
| **에러 표시** | 글/상품 폼에서 aiError·토스트를 t(aiError) / t(res.error)로 표시 | P0 |
| **글로벌** | common.ai.* ko/en | P0 |
| **고도화** | API 키 누락·빈 응답·예외를 각각 키로 구분해 확장 용이 | P1 |

---

## 2. 메시지 구조

- **common.ai**: apiKeyRequired(OPENAI_API_KEY 미설정), noResponse(응답 없음), unknown(생성 중 오류/예외)

---

## 3. 에러 매핑

| 조건 | 반환 키 |
|------|---------|
| !OPENAI_API_KEY | common.ai.apiKeyRequired |
| completion 응답 텍스트 없음 | common.ai.noResponse |
| catch 예외 | common.ai.unknown |

---

## 4. 구현

- **메시지**: ko.json / en.json의 common 하위에 ai.* 추가.
- **lib/ai.ts**: generateWithAi에서 한글 문구 제거 후 위 키 반환.
- **WriteForm·EditForm·ProductForm·ProductEditForm**: res.error 시 setAiError(res.error) 유지, toast.error(t(res.error)), 인라인 aiError 표시 t(aiError).

---

## 5. 체크리스트 (Phase 39)

- [x] common.ai.* 메시지 추가(ko/en)
- [x] lib/ai.ts generateWithAi 에러 반환을 키로 변경
- [x] WriteForm·EditForm AI 에러 표시/토스트 t(aiError)·t(res.error)
- [x] ProductForm·ProductEditForm AI 에러 표시/토스트 t(aiError)·t(res.error)
- [x] TASKS 갱신
