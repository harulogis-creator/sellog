# Phase 23 — 삭제 버튼·확인 다이얼로그 i18n · 글로벌

[domain] 블로그 영역의 **상품 삭제 버튼**(ProductDeleteButton)·**글 삭제 버튼**(PostDeleteButton)의 버튼 텍스트·로딩 문구·aria-label·window.confirm 메시지를 메시지 키화하고 ko/en으로 통일하는 기획 및 실행 계획입니다.

---

## 1. 목표 요약

| 축 | 목표 | 우선순위 |
|----|------|----------|
| **삭제 버튼 라벨 i18n** | "삭제", "삭제 중…" 메시지 키화 | P0 |
| **aria-label i18n** | 로딩 시·일반 시 스크린리더용 문구 키화 (이름/제목 포함은 치환) | P0 |
| **확인 메시지 i18n** | window.confirm 문구 키화, {{name}}/{{title}} 치환 | P0 |
| **글로벌** | blog.delete.* ko/en, 치환 패턴 통일 | P0 |

---

## 2. 메시지 구조

- **blog.delete**: delete (삭제), deleting (삭제 중…), productConfirm ({{name}} 상품을 삭제할까요? …), postConfirm ({{title}} 글을 삭제할까요? …), productAria ("{{name}}" 상품 삭제), postAria ("{{title}}" 글 삭제), deletingAria (삭제 중)

---

## 3. 구현

- **메시지**: confirm·aria 문구에 {{name}}·{{title}} 플레이스홀더 사용. 클라이언트에서 .replace("{{name}}", name) 등으로 치환.
- **ProductDeleteButton**: useLocale(), t("blog.delete.delete")/t("blog.delete.deleting"), confirm 시 t("blog.delete.productConfirm").replace("{{name}}", productName), aria-label 시 t("blog.delete.productAria").replace("{{name}}", productName) 및 deletingAria.
- **PostDeleteButton**: 동일 패턴으로 postConfirm, postAria, deletingAria 사용.

---

## 4. 체크리스트 (Phase 23)

- [x] blog.delete.* 메시지 추가(ko/en, {{name}}/{{title}} 플레이스홀더)
- [x] ProductDeleteButton·PostDeleteButton에 useLocale·confirm/aria 치환 로직 적용
- [ ] (선택) TASKS 갱신
