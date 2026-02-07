# Phase 29 — 글쓰기·글수정 폼 메타·AI 영역 i18n · 글로벌

WriteForm·EditForm의 **제목·슬러그·메타 설명·썸네일** 라벨/placeholder/안내 문구, **AI 버튼·도우미 섹션** 문구, **토스트·삭제 확인** 메시지를 메시지 키화하고 ko/en으로 통일하는 기획 및 실행 계획입니다.

---

## 1. 목표 요약

| 축 | 목표 | 우선순위 |
|----|------|----------|
| **제목·슬러그** | 라벨·placeholder·슬러그 힌트·AI 제목/슬러그 버튼 i18n | P0 |
| **메타·썸네일** | 메타 설명 라벨/placeholder/자수·썸네일 URL 라벨/placeholder | P0 |
| **AI 도우미** | 요약 생성·도우미 요약·alt·SNS·영문 요약·결과 라벨 | P0 |
| **토스트·확인** | 제목/요약/슬러그 채워짐 토스트·글 삭제 confirm 메시지 | P0 |
| **글로벌** | blog.editor.* 확장·blog.editPost.deleteConfirm ko/en | P0 |
| **고도화** | 메타/AI 필드 추가 시 editor.* 확장 용이 | P1 |

---

## 2. 메시지 구조

- **blog.editor** (기존 + 추가): titleLabel, titlePlaceholder, slugLabel, slugPlaceholder, slugHint, metaLabel, metaPlaceholder, metaPlaceholderWithAi, metaHintChars({{count}}/200), metaHintRecommended, metaHintAuto, thumbnailLabel, thumbnailPlaceholder, aiGenerating, aiTitle, aiSlug, aiSummary, aiHelperSummary, aiAlt, aiSocial, aiSummaryEn, metaResultLabel, toastTitleFilled, toastSummaryDone, toastSlugFilled
- **blog.editPost**: deleteConfirm (window.confirm 메시지)

---

## 3. 구현

- **메시지**: ko.json / en.json에 blog.editor.* 확장·blog.edit.deleteConfirm 추가.
- **WriteForm**: t() 적용(제목·슬러그·메타·썸네일·AI 전부), metaHintChars는 replace("{{count}}", metaDescLen), 토스트 t().
- **EditForm**: 동일 + handleDelete에서 window.confirm(t("blog.editPost.deleteConfirm")).

---

## 4. 체크리스트 (Phase 29)

- [x] blog.editor.* 확장·blog.editPost.deleteConfirm 메시지 추가(ko/en)
- [x] WriteForm 메타·AI·토스트 t() 적용
- [x] EditForm 메타·AI·토스트·삭제 확인 t() 적용
- [x] TASKS 갱신
