# Sellog 상세 로드맵 · 고도화 · 글로벌 기획

디테일한 다음 단계, 고도화 계획, 글로벌(i18n·다국어) 전략을 한 문서에 정리한 기획서입니다.

---

## 1. 전략 요약

| 축 | 목표 | 우선순위 |
|----|------|----------|
| **UX 고도화** | 폼·에러·로딩·피드백 일관성, 접근성·키보드·스크린리더 | P0 |
| **SEO·메타** | canonical, hreflang(다국어), 구조화 데이터 보강 | P0 |
| **글로벌** | www 다국어(한/영), locale 기반 라우팅·메시지, 추후 블로그/콘텐츠 다국어 | P1 |
| **성능** | LCP·CLS 개선, 이미지 최적화, 번들 크기 | P1 |
| **운영** | 에러 모니터링·로깅, 배포·CI 문서 | P2 |

---

## 2. Phase 4 — 디테일 작업 (즉시·코드)

### 2.1 UX·일관성

| 항목 | 상세 | 상태 |
|------|------|------|
| **에러 경계** | `error.tsx` 공통 재시도 버튼, 문구·스타일 통일, `global-error.tsx` 최소 복구 UI | ✅ |
| **로딩** | 스켈레톤·스피너 톤 통일, `loading.tsx` 중복 제거 | 진행 |
| **폼 검증** | 클라이언트 실시간 검증(zod)·에러 메시지 키 통일, 서버 검증과 1:1 매칭 | 추후 |
| **빈 상태** | EmptyState 아이콘·문구 톤 가이드, CTA 일관성 | 추후 |

### 2.2 SEO·메타

| 항목 | 상세 | 상태 |
|------|------|------|
| **Canonical** | 블로그 메인·글 상세·www 메인에 `metadata.alternates.canonical` 명시 | ✅ |
| **metadataBase** | `getBaseUrl()` 또는 env `NEXT_PUBLIC_SITE_URL`로 절대 URL 기반 구성 | ✅ |
| **구조화 데이터** | Article/Product 필드 보강(이미지, dateModified), BreadcrumbList(선택) | 추후 |
| **hreflang** | locale 도입 후 `/www` vs `/en/www` 등 alternate 링크·메타 반영 | i18n 후 |

### 2.3 접근성

| 항목 | 상세 |
|------|------|
| **포커스** | 모달·드로어 열림 시 포커스 트랩, 닫기 시 이전 포커스 복귀 |
| **라벨** | 모든 폼 컨트롤 `label`·`aria-label` 점검, 에러 `aria-describedby` |
| **대비** | 다크 모드·라이트 모드 모두 WCAG AA 대비 확보 |
| **스크린리더** | 지역 랜드마크(role, aria-label), 목록·탭 시맨틱 유지 |

---

## 3. 고도화 단계별 계획

### 3.1 단기 (1–2주, 코드 중심)

1. **i18n 기반**  
   - www 전용 메시지 키 구조(ko/en), cookie 기반 locale, LocaleProvider·`useTranslations`  
   - 푸터 언어 전환(한국어/English), 히어로·CTA 등 핵심 문구 메시지 키 적용  
2. **에러·재시도**  
   - `error.tsx` / `global-error.tsx` 재시도 버튼·일관된 문구  
3. **SEO**  
   - canonical·metadataBase 적용, 필요 시 sitemap에 alternate(추후).

### 3.2 중기 (1–2개월)

1. **www 전면 i18n**  
   - FAQ·기능·가격 등 모든 www 문자열 메시지 키화, en 번역 반영.  
2. **경로 기반 locale(선택)**  
   - `/en/www` 등 prefix 도입 시 middleware에서 locale 설정, hreflang·alternate 반영.  
3. **블로그·콘텐츠 다국어(선택)**  
   - posts/products에 `locale` 또는 `lang` 필드, 조회 시 locale 필터, 메타·OG 다국어.

### 3.3 장기 (3개월+)

1. **다국어 SEO**  
   - 언어별 sitemap, hreflang 그룹, 지역별 메타·OG.  
2. **성능**  
   - 이미지 CDN·최적 포맷(WebP/AVIF), LCP 컴포넌트 우선 로드, 번들 분석·코드 스플리팅.  
3. **분석·모니터링**  
   - Vercel Analytics·Sentry 연동(이미 문서화), 전환·에러 대시보드.

---

## 4. 글로벌(i18n)·다국어 기획

### 4.1 목표

- **www(랜딩)**  
  - 한국어(기본)·영어 전환 가능.  
  - 언어 전환 시 재방문까지 유지(cookie 또는 path).  
- **블로그·상품 콘텐츠**  
  - 1차: 단일 언어(한국어).  
  - 2차: 글/상품별 다국어 필드 또는 locale별 스냅샷(선택).

### 4.2 기술 방안

| 구분 | 선택안 | 비고 |
|------|--------|------|
| **locale 저장** | Cookie `sellog_locale` (ko/en) | 구현 단순, www 전역 적용. path 기반은 추후. |
| **메시지 구조** | `src/messages/ko.json`, `en.json` | 키: 네임스페이스.예: `www.hero.title`, `www.footer.product`. |
| **런타임** | React Context `LocaleProvider` + `useTranslations()` | 클라이언트에서 locale 읽기·t(key) 반환. |
| **서버** | layout에서 cookie 읽어 초기 locale 전달(선택) | SSR 시 깜빡임 방지. |

### 4.3 메시지 키 규칙

- **네임스페이스**: `www.*` (랜딩), 추후 `common.*`, `domain.*`  
- **키**: 소문자·점 구분. 예: `www.hero.title`, `www.footer.needHelp`  
- **값**: 한국어(ko) 기본, en은 동일 키에 영어 값.

### 4.4 URL·SEO(추후)

- **현재**: `/www` 단일, 언어는 cookie.  
- **도입 시**: `/www`(ko), `/en/www`(en) 등 path prefix + middleware에서 locale 설정.  
- **hreflang**:  
  - `<link rel="alternate" hreflang="ko" href="https://.../www" />`  
  - `<link rel="alternate" hreflang="en" href="https://.../en/www" />`  
  - `x-default`: ko 또는 en 중 기본.

### 4.5 블로그·콘텐츠 다국어(추후)

- **옵션 A**: `posts.lang`, `products.lang` 등 컬럼 추가, 목록/상세 필터.  
- **옵션 B**: 동일 slug에 locale별 행(post_ko, post_en) 또는 JSONB 필드.  
- **메타·OG**: 선택한 locale에 맞는 title/description 노출.

---

## 5. Phase 5 — 랜딩 벤치마크 반영 (Squarespace · Manus)

벤치마크 상세: **docs/BENCHMARK_SQUARESPACE_MANUS.md**

| 항목 | 적용 내용 | 상태 |
|------|-----------|------|
| **태그라인** | 히어로 CTA 아래 한 줄 (ko: "덜 구조화, 더 스마트하게.", en: "Less structure, more intelligence.") | ✅ |
| **기능 카드 "이런 분께"** | 각 기능 카드에 greatFor 라벨 + 대상(크리에이터·블로거·소상공인 등), i18n | ✅ |
| **지원 메시지 강화** | 푸터 "도움이 필요하신가요?" 블록에 supportBlurb("FAQ와 연결 상태에서 언제든 도움받을 수 있어요") | ✅ |

고도화·글로벌: 태그라인·기능 greatFor·지원 문구는 모두 `www.hero.*`, `www.features.*`, `www.footer.*` 메시지 키로 관리되어 다국어 확장 가능.

---

## 5-2. Phase 6 — 벤치마크 다음 작업 · 고도화 · 글로벌

상세 기획: **docs/PHASE6_BENCHMARK_ROADMAP.md**

| 항목 | 적용 내용 | 상태 |
|------|-----------|------|
| **24/7 Support 블록** | FAQ 직후 "도움이 필요하신가요?" 블록(FAQ·연결 상태 링크, supportBlurb, CTA) | ✅ |
| **www 전면 i18n** | FAQ 제목, 가격(제목·부제·CTA), Final CTA(제목·부제·CTA), Support 블록 — `www.faq.*`, `www.pricing.*`, `www.cta.*`, `www.support.*` | ✅ |

**Phase 7** (docs/PHASE7_ROADMAP.md): FAQ 본문(q1~a6) 메시지 키화·en 번역, 사회적 증거(proof.*)·올인원(allInOne.*)·기능(featuresSection.*, featuresCard.*) i18n — 랜딩 완전 한/영 전환 가능.

**Phase 8** (docs/PHASE8_ROADMAP.md): 상단 배너 i18n(www.banner.*), www 메타·SEO 다국어(generateMetadata·쿠키 locale), 접근성(스킵 링크·main id).

**Phase 9** (docs/PHASE9_ROADMAP.md): 고객 인용(테스티모니얼) 섹션 2건, i18n(www.testimonial.*), 쇼케이스 직후 배치.

---

## 6. 구현 체크리스트 (Phase 4 · 코드)

- [x] 기획서 (본 문서)
- [x] 에러 경계: error.tsx / global-error.tsx 재시도 버튼·메인으로 링크·다크·aria 개선
- [x] SEO: metadataBase(루트 layout), alternates.canonical(블로그 메인·글 상세·www)
- [x] i18n: messages/ko.json·en.json, LocaleProvider(cookie sellog_locale), useLocale/useTranslations, WwwFooter 언어 전환(한/영), WwwHero t() 적용
- [x] Phase 5: 태그라인, 기능 카드 greatFor, 푸터 supportBlurb (벤치마크 반영)
- [x] **Phase 6** www 전면 메시지 키화(FAQ·가격·Final CTA·Support 블록), en 번역 — docs/PHASE6_BENCHMARK_ROADMAP.md
- [ ] (추후) path 기반 locale·hreflang

완료 항목은 TASKS.md에 반영 완료.
