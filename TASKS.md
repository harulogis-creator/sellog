# Sellog – 작업 목록 (TASKS)

기획서(`project_spec.md`)와 현재 구현 상태를 기준으로 **완료·미비·앞으로 할 작업**을 정리한 문서입니다.  
작업 진행 시 이 문서를 갱신하며 이어서 진행합니다.

---

## ✅ 완료된 작업 (참고)

| 항목 | 상태 |
|------|------|
| Next.js 14 App Router, TypeScript, Tailwind | ✅ |
| 서브도메인 미들웨어 (user.sellog.com → /user) | ✅ |
| Supabase 연동 (lib + utils/supabase SSR) | ✅ |
| blogs / posts / products 테이블 + RLS (Auth 기반 읽기/쓰기) | ✅ |
| [domain] 블로그 메인, 글 상세, 새 글 쓰기, 상품 관리 | ✅ |
| 블로그 설정 [domain]/settings, 상품 수정·삭제 | ✅ |
| 에디터 상품 삽입 UI (글쓰기/글수정에서 [product:uuid] 삽입) | ✅ |
| Open Graph / Twitter Card (블로그 메인·글 상세 메타) | ✅ |
| 글 관리 [domain]/posts (초안·발행 목록, 발행 해제) | ✅ |
| 구조화 데이터 JSON-LD (WebSite, Article, Product) | ✅ |
| 주문·결제 테이블 (orders, order_items) + 체크아웃/주문하기 | ✅ |
| 결제 취소·실패 페이지 | ✅ |
| 블로그별 커스텀 도메인 (blogs.custom_domain + 미들웨어) | ✅ |
| 썸네일(thumbnail_url), 미리보기 탭(기본 활성화), 접근성, DEPLOY.md | ✅ |
| 블로그 만들기 (/www/join), 마크다운 렌더링, [product:uuid] 임베드 | ✅ |
| Dynamic Sitemap, robots.txt | ✅ |
| 연결 상태 확인 페이지 (/www/check) | ✅ |
| **인증** 이메일·비밀번호 로그인/회원가입 (/www/login, /www/signup), AuthNav | ✅ |
| **blogs.owner_id ↔ auth.uid()** 가입 시 블로그 생성 시 owner_id 설정 | ✅ |
| **RLS** Auth 기반 정책 (001_auth_owner_rls.sql) | ✅ |
| **블로그 소유자만** write/products/posts/settings/edit 접근 검사 | ✅ |
| **글 수정·삭제** [domain]/post/[slug]/edit, 수정 Server Action, 삭제 확인 후 삭제 | ✅ |
| **상품 이미지** Supabase Storage(product-images), 파일 업로드 | ✅ |
| **UI** DomainHeader, DomainBottomNav(모바일 탭바), 인셋 리스트·chevron, Apple HIG 스타일 | ✅ |
| **공통 UI** Button, Input, Card, Label (components/ui) | ✅ |
| **L1** Form, Select, Dialog (Shadcn 스타일 공통 컴포넌트) | ✅ |
| **M2** profiles 테이블, 블로그 소유자 프로필 표시·설정에서 편집 | ✅ |
| **M4** Shadcn/UI 공식 설정 (components.json) | ✅ |
| **M5** 반응형·접근성 (aria-current, aria-label, 터치 영역, prefers-reduced-motion) | ✅ |
| **M3** OAuth 로그인/회원가입 코드 (GitHub·Google 버튼, /auth/callback) | ✅ |
| **M8** 에러 모니터링 준비 (DEPLOY.md 6절: Vercel Analytics·Sentry 안내) | ✅ |
| **랜딩·글로벌 톤** Squarespace/Manus 벤치마크: www 헤더·푸터, 히어로·기능·시작하기·CTA·푸터(제품/지원/회사/언어·법적) | ✅ |
| **랜딩 Phase A** 사회적 증거, FAQ 6개, 올인원 8그리드, 기능 아이콘 6카드, Sellog로 만든 블로그, 상단 배너, 모바일 햄버거, 지원 메시지, 가격 섹션 (docs/LANDING_ROADMAP.md) | ✅ |
| **AI Phase 1** 글쓰기/글 수정(제목·요약), 상품 추가/수정(상품명·설명) AI 제안 버튼 (docs/AI_FEATURES.md, OPENAI_API_KEY) | ✅ |
| **AI Phase 2** 슬러그 제안 (글쓰기·글 수정 "AI 슬러그 제안") | ✅ |
| **AI Phase 2** 이미지 alt·소셜 카피·영문 요약·AI 도우미 패널 (글/상품 폼) | ✅ |
| **다음 단계** 메타 설명 저장 (posts.meta_description, 폼·OG 반영), 토스트 알림 (sonner) — docs/NEXT_PHASE.md | ✅ |
| **다음 단계(코드)** 글 목록 필터(전체/초안/발행), 다크 모드(prefers-color-scheme), 메타 설명 160자 안내 | ✅ |
| **Phase 4·글로벌 기획** docs/ROADMAP_DETAIL.md (고도화·글로벌 i18n 전략) | ✅ |
| **Phase 4 구현** SEO canonical·metadataBase, 에러 경계 재시도·메인 링크, i18n(한/영)·LocaleProvider·www 푸터·히어로 | ✅ |
| **Phase 5·벤치마크** 태그라인(히어로), 기능 카드 "이런 분께"(greatFor), 푸터 지원 문구(supportBlurb) — docs/BENCHMARK_SQUARESPACE_MANUS.md, ROADMAP_DETAIL Phase 5 | ✅ |
| **벤치마크 전수 탐색** Squarespace·Manus 자녀 구역 전수 탐색, 벤치마크 문서 보강(사이트맵·페이지별 디테일), 시작하는 방법·쇼케이스 i18n(WwwHowToStart, WwwShowcaseSection) | ✅ |
| **Phase 6** 벤치마크 기반 다음 작업: 기획(docs/PHASE6_BENCHMARK_ROADMAP.md), FAQ 하단 24/7 Support 블록(WwwSupportBlock), www 전면 i18n(FAQ·가격·Final CTA) | ✅ |
| **Phase 7** 랜딩 완전 i18n: 기획(docs/PHASE7_ROADMAP.md), FAQ 본문(q/a), 사회적 증거·올인원·기능 섹션(WwwProofSection, WwwAllInOneSection, WwwFeaturesSection) | ✅ |
| **Phase 8** 배너 i18n·메타 다국어·접근성: 기획(docs/PHASE8_ROADMAP.md), AnnouncementBar i18n, www generateMetadata(쿠키 locale), SkipToContent·main id | ✅ |
| **Phase 9** 고객 인용: 기획(docs/PHASE9_ROADMAP.md), WwwTestimonialSection 2건·i18n(www.testimonial.*) | ✅ |
| **Phase 10** www 서브페이지 i18n: 기획(docs/PHASE10_ROADMAP.md), join·login·signup·check 메타·제목·문구(www.pages.*), WwwPageShell | ✅ |
| **Phase 11** 경로 기반 locale·hreflang: 기획(docs/PHASE11_ROADMAP.md), /ko/www·/en/www(미들웨어 리다이렉트·쿠키), [domain]/www·hreflang·서버 액션 리다이렉트 | ✅ |
| **Phase 12** 메가메뉴: 기획(docs/PHASE12_ROADMAP.md), WwwHeader Product/Resources 드롭다운·접근성(aria·Esc)·i18n(www.megamenu.*) | ✅ |
| **Phase 13** 에러·404 i18n: 기획(docs/PHASE13_ROADMAP.md), common.error/notFound 메시지·not-found/error.tsx locale·링크(/{locale}/www)·getLocaleFromCookie | ✅ |
| **Phase 14** Sitemap 확장: 기획(docs/PHASE14_ROADMAP.md), locale별 www·join·login·signup·check URL sitemap 추가 | ✅ |
| **Phase 15** 로그인·회원가입 폼 i18n: 기획(docs/PHASE15_ROADMAP.md), common.form·www.auth·에러 코드·LoginForm·SignupForm·OAuthButtons·LoginErrorAlert | ✅ |
| **Phase 16** Join(블로그 만들기) 폼 i18n: 기획(docs/PHASE16_ROADMAP.md), www.join·에러 코드·CreateBlogForm·createBlogAction | ✅ |
| **Phase 17** 연결 상태 확인(check) 페이지 i18n: 기획(docs/PHASE17_ROADMAP.md), www.pages.check 본문(dbCheckLabel·successMessage·envHint) | ✅ |
| **Phase 18** www 잔여 하드코딩 i18n: 기획(docs/PHASE18_ROADMAP.md), Footer/Header aria·법적 링크·AuthNav·Logout·loading·error·루트 LocaleProvider | ✅ |
| **Phase 19** 블로그 공통 에러/권한 블록 i18n: 기획(docs/PHASE19_ROADMAP.md), blog.* 메시지·BlogNotFoundBlock·BlogForbiddenBlock·[domain] 전 페이지 적용 | ✅ |
| **Phase 20** 블로그 헤더·네비·메인 라벨 i18n: 기획(docs/PHASE20_ROADMAP.md), DomainHeader 키 지원·BlogHomeContent·posts/products/settings/write/checkout subtitle | ✅ |
| **Phase 21** 블로그 목록·빈 상태·섹션 라벨 i18n: 기획(docs/PHASE21_ROADMAP.md), PostsListWithFilter·EmptyState 키·BlogSectionHeader·PostEditHeader | ✅ |
| **Phase 22** 상품 목록 행 i18n: 기획(docs/PHASE22_ROADMAP.md), ProductList 클라이언트·가격 locale·blog.products.edit/currencySuffix | ✅ |
| **Phase 23** 삭제 버튼·확인 다이얼로그 i18n: 기획(docs/PHASE23_ROADMAP.md), ProductDeleteButton·PostDeleteButton blog.delete.*·{{name}}/{{title}} 치환 | ✅ |
| **Phase 24** 체크아웃 본문 문구 i18n: 기획(docs/PHASE24_ROADMAP.md), blog.checkout.*·CheckoutMessageBlock·CheckoutOrderHeading·CheckoutCancelBlock·CheckoutFailBlock·CheckoutSuccessBlock | ✅ |
| **Phase 25** 체크아웃 폼 i18n: 기획(docs/PHASE25_ROADMAP.md), blog.checkout.form.*·CheckoutForm 라벨·버튼·가격 locale | ✅ |
| **Phase 26** 글 본문 상품 카드·임베드 i18n: 기획(docs/PHASE26_ROADMAP.md), ProductCard·ProductEmbedFallback·blog.productCard.*·blog.productNotFoundInEmbed | ✅ |
| **Phase 27** 블로그 설정 폼 i18n: 기획(docs/PHASE27_ROADMAP.md), blog.settings.*·BlogSettingsForm | ✅ |
| **Phase 28** 에디터·폼 공통 i18n: 기획(docs/PHASE28_ROADMAP.md), blog.form.*·blog.editor.*·WriteForm·EditForm·ProductEditForm | ✅ |
| **Phase 29** 글쓰기·글수정 폼 메타·AI i18n: 기획(docs/PHASE29_ROADMAP.md), blog.editor.* 확장·blog.editPost.deleteConfirm·WriteForm·EditForm | ✅ |
| **Phase 30** 상품 폼 i18n: 기획(docs/PHASE30_ROADMAP.md), blog.products.form.*·ProductForm·ProductEditForm | ✅ |
| **Phase 31** 모바일 하단 네비 i18n: 기획(docs/PHASE31_ROADMAP.md), blog.bottomNav.*·blog.aria.bottomNav·DomainBottomNav | ✅ |
| **Phase 32** 글 수정 위험 영역 i18n: 기획(docs/PHASE32_ROADMAP.md), blog.editPost.dangerZone*·deleteButton·EditForm | ✅ |
| **Phase 33** 블로그 메인 미사용/미로드 안내 i18n: 기획(docs/PHASE33_ROADMAP.md), blog.home.*·DomainBlogUnavailableBlock·[domain]/page | ✅ |
| **Phase 34** 루트 스킵 링크 i18n: 기획(docs/PHASE34_ROADMAP.md), common.a11y.skipToContent·SkipToContentLink·app/layout | ✅ |
| **Phase 35** 설정 액션 에러·프로필 폼 i18n: 기획(docs/PHASE35_ROADMAP.md), blog.settings.error.*·profile.*·actions·BlogSettingsForm·ProfileSettingsForm | ✅ |
| **Phase 36** 상품 액션 에러 i18n: 기획(docs/PHASE36_ROADMAP.md), blog.products.error.*·create/update/delete 액션·ProductForm·ProductEditForm·ProductDeleteButton | ✅ |
| **Phase 37** 글(Post) 액션 에러 i18n: 기획(docs/PHASE37_ROADMAP.md), blog.posts.error.*·create/update/delete 액션·WriteForm·EditForm·PostDeleteButton | ✅ |
| **Phase 38** 체크아웃 액션 에러 i18n: 기획(docs/PHASE38_ROADMAP.md), blog.checkout.error.*·createOrderAction·CheckoutForm | ✅ |
| **Phase 39** AI 에러 i18n: 기획(docs/PHASE39_ROADMAP.md), common.ai.*·generateWithAi·WriteForm·EditForm·ProductForm·ProductEditForm | ✅ |
| **Phase 40** Join 액션 DB 에러 i18n: 기획(docs/PHASE40_ROADMAP.md), www.join.errors.unknown·createBlogAction·CreateBlogForm | ✅ |
| **Phase 41** 로그인·회원가입 액션 Auth 에러 i18n: 기획(docs/PHASE41_ROADMAP.md), www.auth.errors.unknown·loginAction·signupAction | ✅ |
| **Phase 42** OAuth 콜백 에러 i18n: 기획(docs/PHASE42_ROADMAP.md), auth/callback ?error=unknown·LoginErrorAlert | ✅ |
| **Phase 43** OAuth 버튼 클라이언트 에러 i18n: 기획(docs/PHASE43_ROADMAP.md), OAuthButtons ?error=unknown | ✅ |
| **Phase 44** 에러 경계 본문 i18n: 기획(docs/PHASE44_ROADMAP.md), common.error.description·error.tsx·global-error.tsx | ✅ |
| **레이아웃** DomainPageContainer, [domain] 공통 콘텐츠 영역 | ✅ |
| **로딩·빈 상태** [domain]/loading, posts/products loading 스켈레톤, EmptyState | ✅ |
| **Next.js** 14.2.35 보안 패치 반영 | ✅ |
| **결제 설계** docs/PAYMENT_DESIGN.md (PG 후보·연동 방식) | ✅ |

---

## 🔶 미비된 작업 (보완하면 좋은 것)

| # | Task | 설명 | 우선순위 |
|---|------|------|----------|
| M1 | 글 목록에서 삭제 버튼 | [domain]/posts 목록에서 각 글에 "삭제" 버튼 추가 (확인 후 삭제) | 낮음 ✅ |
| M2 | profiles 테이블/연동 | 필요 시 profiles 테이블 및 블로그 소유자 프로필 표시 | 낮음 |
| M3 | OAuth 로그인 | GitHub 등 소셜 로그인 (1.1 확장) | 중간 |
| M4 | Shadcn/UI 공식 init | `npx shadcn@latest init`으로 테마·설정 통일 (현재 수동 컴포넌트) | 낮음 |
| M5 | 반응형·접근성 재점검 | 모바일 뷰, 키보드/스크린리더 최종 점검 | 낮음 |

---

## 📋 지금 진행 (코드로 가능한 작업)

에이전트/코드만으로 진행 가능. 우선순위대로 진행.

| # | Task | 설명 |
|---|------|------|
| M7 | Next.js 보안·업데이트 | next 보안 패치, 의존성 업데이트 | ✅ |
| H1-doc | 결제(PG) 연동 설계 문서 | PG 선정·연동 방식 정리 문서 작성 (실제 연동은 나중에) | ✅ |
| L1 | 공통 컴포넌트 Shadcn 확장 | Form, Select, Dialog 등 필요 시 추가 | ✅ |
| M2 | profiles 테이블/연동 | 필요 시 profiles 및 소유자 프로필 표시 | ✅ |
| M4 | Shadcn/UI 공식 init | `npx shadcn@latest init` (선택) | ✅ |
| M5 | 반응형·접근성 재점검 | 모바일·키보드·스크린리더 점검 | ✅ |

---

## 🔜 나중에 한꺼번에 할 작업 (사용자 작업)

배포·인프라·외부 서비스 설정 등 **사용자가 직접** 진행할 항목. 한꺼번에 처리해도 됨.  
(M3·M8은 **코드/문서는 완료**되었고, 대시보드·계정 설정만 하면 됨.)

| # | Task | 설명 |
|---|------|------|
| H2 | Vercel 배포 | 저장소 연결, 환경 변수, 도메인(sellog.com) 연결 |
| H3 | 서브도메인 DNS | *.sellog.com → Vercel 와일드카드 서브도메인 |
| H4 | Supabase 프로덕션 | 프로덕션 프로젝트 RLS·API 키 재확인, 마이그레이션 006 적용 |
| M3 | OAuth 활성화 | Supabase Dashboard → Auth → Providers에서 GitHub·Google 켜기, Redirect URL에 /auth/callback 추가 |
| H1 | 결제(PG) 실제 연동 | 설계 문서 참고해 토스/아임포트/스트라이프 등 연동 |
| M8 | 에러 모니터링 활성화 | Vercel Analytics 켜기 또는 Sentry DSN 설정 (DEPLOY.md §6 참고) |

---

## 📌 진행 순서 제안

1. **지금** → M7, H1-doc, L1, M2, M4, M5 (코드 작업)  
2. **나중에** → H2, H3, H4, M3, H1(실제 연동), M8 (사용자 작업)

---

## 🚀 체크리스트

**완료**
- [x] M1: 글 목록 삭제 버튼
- [x] M6: 레이아웃 정리 (DomainPageContainer, 로딩/빈 상태)
- [x] L2: 로딩 스켈레톤·EmptyState

**다음 (코드로 진행)**
- [x] M7: Next.js 14.2.35 유지·보안 패치
- [x] H1-doc: 결제(PG) 연동 설계 문서 (`docs/PAYMENT_DESIGN.md`)
- [x] L1: Form, Select, Dialog 추가
- [x] M2: profiles 테이블·연동·소유자 프로필 표시
- [x] M4: Shadcn components.json 설정
- [x] M5: 반응형·접근성 재점검

**나중에 한꺼번에 (사용자)**
- [ ] H2: Vercel 배포
- [ ] H3: DNS
- [ ] H4: Supabase 프로덕션 (마이그레이션 006 포함)
- [ ] M3: OAuth 활성화 (Supabase에서 Provider·Redirect URL 설정)
- [ ] H1: PG 실제 연동
- [ ] M8: 에러 모니터링 (Vercel Analytics 또는 Sentry, DEPLOY.md §6)

필요에 따라 우선순위를 바꿔가며 진행하고, 완료 시 위 체크리스트와 본문 상태를 갱신합니다.

---

## 🧪 프리뷰·수동 테스트

- **개발 서버**: 터미널에서 `npm run dev` (이미 켜져 있으면 포트 3000 사용 중. 재시작 시 기존 터미널에서 Ctrl+C 후 다시 실행).
- **브라우저에서 열기**: Cursor에서 `Ctrl+Shift+P` → "Simple Browser: Show" 입력 후 선택 → URL에 `http://localhost:3000/www` 입력. 또는 시스템 브라우저에서 동일 URL 접속.
- **확인할 경로**  
  - `/www` 메인  
  - `/www/login` 로그인 (이메일 폼 + GitHub/Google 버튼)  
  - `/www/signup` 회원가입  
  - `/www/join` 블로그 만들기  
  - `/favicon.ico` → 204 응답 (에러 없음). 이전에 500 나던 경우 미들웨어에서 204로 처리하도록 수정됨.
- **캐시 오류(948.js 등) 시**: `.next` 폴더 삭제 후 `npm run dev` 다시 실행.
