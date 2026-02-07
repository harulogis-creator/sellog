# Phase 33 — 블로그 메인 미사용/미로드 안내 i18n · 글로벌

[domain] **블로그 메인**에서 블로그가 없거나 불러오지 못했을 때(!blog) 표시하는 제목·설명 문구를 메시지 키화하고 ko/en으로 통일하는 기획 및 실행 계획입니다.

---

## 1. 목표 요약

| 축 | 목표 | 우선순위 |
|----|------|----------|
| **안내 블록** | "{domain}의 블로그"·"아직 블로그가 설정되지 않았거나..." i18n | P0 |
| **클라이언트 블록** | DomainBlogUnavailableBlock(domain) 생성, t() 사용 | P0 |
| **글로벌** | blog.home.unavailableTitle({{domain}})·unavailableDesc ko/en | P0 |
| **고도화** | 추후 메타/JSON-LD description locale 대응 시 blog.home.* 확장 | P1 |

---

## 2. 메시지 구조

- **blog.home**: unavailableTitle("{{domain}}의 블로그"), unavailableDesc("아직 블로그가 설정되지 않았거나 글을 불러올 수 없습니다.")

---

## 3. 구현

- **메시지**: ko.json / en.json에 blog.home.unavailableTitle·unavailableDesc 추가.
- **DomainBlogUnavailableBlock** (client): domain prop, useLocale(), 제목·설명을 t() 및 replace("{{domain}}", domain)으로 표시.
- **[domain]/page.tsx**: !blog 시 기존 인라인 JSX 대신 <DomainBlogUnavailableBlock domain={domain} /> 렌더.

---

## 4. 체크리스트 (Phase 33)

- [x] blog.home.unavailableTitle·unavailableDesc 메시지 추가(ko/en)
- [x] DomainBlogUnavailableBlock 클라이언트 컴포넌트 생성
- [x] [domain]/page.tsx에서 !blog 시 블록 사용
- [x] TASKS 갱신
