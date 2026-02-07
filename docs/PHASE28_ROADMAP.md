# Phase 28 — 에디터·폼 공통 i18n · 글로벌

글쓰기(WriteForm)·글 수정(EditForm)·상품 수정(ProductEditForm)의 **공통 폼 버튼**(저장/저장 중·취소) 및 **에디터 공통 UI**(편집/미리보기 탭·상품 삽입·본문 라벨/placeholder·발행하기)·**상품 피커 가격 locale**을 메시지 키화하고 ko/en으로 통일하는 기획 및 실행 계획입니다.

---

## 1. 목표 요약

| 축 | 목표 | 우선순위 |
|----|------|----------|
| **공통 폼** | 저장/저장 중/취소 버튼(blog.form.*) → WriteForm·EditForm·ProductEditForm | P0 |
| **에디터 탭** | 편집/미리보기(blog.editor.editTab·previewTab) | P0 |
| **상품 삽입** | 버튼·힌트 문구(insertProduct·insertProductHint) | P0 |
| **본문·발행** | 본문 라벨·placeholder·발행하기 체크 라벨(blog.editor.*) | P0 |
| **가격 locale** | WriteForm/EditForm 상품 피커 내 가격(priceLocale+currencySuffix) | P0 |
| **글로벌** | blog.form.*, blog.editor.* ko/en | P0 |
| **고도화** | 에디터 필드 추가 시 editor.* 확장 용이 | P1 |

---

## 2. 메시지 구조

- **blog.form**: save, saving, cancel
- **blog.editor**: editTab, previewTab, insertProduct, insertProductHint, bodyLabel, bodyPlaceholder, bodyPlaceholderWithInsert, publishLabel
  - bodyPlaceholder: 글 수정용 짧은 placeholder
  - bodyPlaceholderWithInsert: 글쓰기용(상품 삽입 안내 포함)

---

## 3. 구현

- **메시지**: ko.json / en.json에 blog.form.*, blog.editor.* 추가.
- **WriteForm**: useLocale(), t("blog.form.*"), t("blog.editor.*"), 상품 피커 가격은 priceLocale + t("blog.products.currencySuffix").
- **EditForm**: 동일 + 취소 링크 t("blog.form.cancel").
- **ProductEditForm**: useLocale(), t("blog.form.save"), t("blog.form.saving"), t("blog.form.cancel").

---

## 4. 체크리스트 (Phase 28)

- [x] blog.form.*, blog.editor.* 메시지 추가(ko/en)
- [x] WriteForm useLocale·t()·가격 locale 적용
- [x] EditForm useLocale·t()·가격 locale 적용
- [x] ProductEditForm useLocale·t() 적용
- [x] TASKS 갱신
