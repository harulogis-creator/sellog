# Phase 32 — 글 수정 위험 영역(삭제) i18n · 글로벌

글 수정 페이지(EditForm) 하단 **위험 영역** 섹션의 제목·설명·삭제 버튼 라벨을 메시지 키화하고 ko/en으로 통일하는 기획 및 실행 계획입니다.

---

## 1. 목표 요약

| 축 | 목표 | 우선순위 |
|----|------|----------|
| **위험 영역** | "위험 영역" 제목·"글을 삭제하면 복구할 수 없어요" 설명 i18n | P0 |
| **삭제 버튼** | "글 삭제" 버튼 라벨 메시지 키화 | P0 |
| **글로벌** | blog.editPost.dangerZoneTitle·dangerZoneDesc·deleteButton ko/en | P0 |
| **고도화** | 삭제 확인(deleteConfirm)은 Phase 29에서 적용 완료, 동일 네임스페이스 유지 | P1 |

---

## 2. 메시지 구조

- **blog.editPost** (기존 + 추가): dangerZoneTitle, dangerZoneDesc, deleteButton

---

## 3. 구현

- **메시지**: ko.json / en.json에 blog.editPost.dangerZoneTitle, dangerZoneDesc, deleteButton 추가.
- **EditForm**: 위험 영역 h3·p·Button 텍스트를 t("blog.editPost.*")로 교체.

---

## 4. 체크리스트 (Phase 32)

- [x] blog.editPost.dangerZoneTitle·dangerZoneDesc·deleteButton 메시지 추가(ko/en)
- [x] EditForm 위험 영역 t() 적용
- [x] TASKS 갱신
