# Phase 19 — 블로그 공통 에러/권한 블록 i18n · 글로벌

[domain] 블로그 영역에서 반복되는 **「블로그를 찾을 수 없습니다」·「권한이 없습니다」** 블록을 공통 클라이언트 컴포넌트로 추출하고, 메시지 키화(ko/en)하여 locale별 링크와 문구를 일관되게 표시하는 기획 및 실행 계획입니다.

---

## 1. 목표 요약

| 축 | 목표 | 우선순위 |
|----|------|----------|
| **notFound 블록 통합** | 제목·메인으로 링크 메시지 키화, 링크는 locale 기반 /{locale}/www | P0 |
| **forbidden 블록 통합** | 제목·페이지별 설명 키·복수 링크(블로그로/로그인/글 보기/상품 목록) 메시지 키화 | P0 |
| **공통 컴포넌트** | BlogNotFoundBlock, BlogForbiddenBlock (클라이언트, useLocale·useTranslations) | P0 |
| **고도화** | 서버 페이지는 블록만 렌더, 링크 경로는 클라이언트에서 locale 반영 | P1 |
| **글로벌** | blog.notFound.*, blog.forbidden.* ko/en 동일 구조 | P0 |

---

## 2. 메시지 구조

- **blog.notFound**: title, goMain
- **blog.forbidden**: title, description.posts, description.settings, description.products, description.write, description.postEdit, description.productEdit, goBlog, goLogin, viewPost, productList

---

## 3. 구현

- **BlogNotFoundBlock**: 클라이언트. t("blog.notFound.title"), Link to `/${locale}/www` + t("blog.notFound.goMain").
- **BlogForbiddenBlock**: 클라이언트. props: domain, descriptionKey (posts|settings|products|write|postEdit|productEdit), linkTo: 'blog' | 'login' | 'loginAndBlog' | 'viewPost' | 'productList', postSlug?: string. description은 t(`blog.forbidden.description.${descriptionKey}`). linkTo별로 링크 1~2개 렌더.
- **[domain] 내 모든 notFound/forbidden 반환부**를 위 두 컴포넌트 사용으로 교체. (posts, products, settings, write, post/[slug]/edit, products/[productId]/edit, checkout, checkout/cancel, checkout/fail, checkout/success)

---

## 4. 체크리스트 (Phase 19)

- [x] blog.notFound.*, blog.forbidden.* 메시지 추가(ko/en)
- [x] BlogNotFoundBlock, BlogForbiddenBlock 구현
- [x] posts·products·settings·write·post/edit·product/edit·checkout·checkout/cancel·fail·success 페이지에 블록 적용
- [ ] (선택) settings 액션 에러 메시지 코드화(별도 Phase 가능)
- [ ] (선택) TASKS 갱신
