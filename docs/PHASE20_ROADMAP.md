# Phase 20 — 블로그 영역 헤더·네비·메인 라벨 i18n · 글로벌

[domain] 블로그 영역의 **DomainHeader**(subtitle, listLabel, 홈 버튼, aria-label)·**블로그 메인** 오너 네비·최근 글 섹션·**posts/products/settings/write** 페이지 헤더 라벨을 메시지 키화하고 ko/en으로 통일하는 기획 및 실행 계획입니다.

---

## 1. 목표 요약

| 축 | 목표 | 우선순위 |
|----|------|----------|
| **DomainHeader i18n** | subtitle/listLabel을 키 기반으로 표시, "홈"·aria-label(돌아가기) 번역 | P0 |
| **헤더 액션** | "새 글 쓰기" 등 액션 버튼을 labelKey+href로 DomainHeader에서 렌더 | P0 |
| **블로그 메인** | 설정·글 관리·상품 관리·새 글 쓰기, 최근 글·빈 상태 문구 i18n | P0 |
| **posts/products/settings/write** | subtitle·listLabel·action을 키로 전달 | P0 |
| **글로벌** | blog.nav.*, blog.subtitle.*, blog.listLabel.*, blog.action.* ko/en | P0 |

---

## 2. 메시지 구조

- **blog.nav**: settings, posts, products, write, home
- **blog.subtitle**: posts, products, settings, write, editProduct
- **blog.listLabel**: posts, products, default(목록)
- **blog.action**: newPost
- **blog.recentPosts**, **blog.noPublishedPosts**
- **blog.aria.backToBlog** (aria-label 접미어: "블로그로 돌아가기" / "Back to blog")

---

## 3. 구현

- **DomainHeader**: "use client", useLocale(). subtitleKey/listLabelKey optional; 있으면 t()로 표시. listHref 있을 때 listLabelKey·t("blog.nav.home") 사용. actionConfig?: { labelKey; href } 추가 시 버튼 렌더. aria-label `${blogName} ${t("blog.aria.backToBlog")}`.
- **블로그 메인**: BlogHomeContent 클라이언트 컴포넌트로 오너 네비·최근 글 제목·빈 상태 문구 t() 사용. [domain]/page.tsx는 데이터 페치 후 BlogHomeContent에 props 전달.
- **posts/products/settings/write 페이지**: DomainHeader에 subtitleKey, listLabelKey, actionConfig 전달.

---

## 4. 체크리스트 (Phase 20)

- [x] blog.nav.*, blog.subtitle.*, blog.listLabel.*, blog.action.*, blog.recentPosts, blog.noPublishedPosts, blog.aria.backToBlog 추가(ko/en), checkout subtitle 키 포함
- [x] DomainHeader 클라이언트화·subtitleKey/listLabelKey/actionConfig·aria
- [x] BlogHomeContent 구현·[domain]/page 적용
- [x] posts·products·settings·write·product/edit·checkout* 페이지 subtitleKey/listLabelKey/actionConfig 적용
- [ ] (선택) TASKS 갱신
