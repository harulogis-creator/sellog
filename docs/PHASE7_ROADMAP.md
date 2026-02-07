# Phase 7 — 랜딩 완전 i18n · 고도화 · 글로벌

Phase 6 완료 후 남은 **FAQ 본문 다국어** 및 **미처리 섹션(사회적 증거·올인원·기능)** i18n을 디테일 기획하고, 고도화·글로벌 관점을 반영한 실행 계획입니다.

---

## 1. 목표 요약

| 축 | 목표 | 우선순위 |
|----|------|----------|
| **완전 i18n** | FAQ 본문(q/a) 메시지 키화 + en 번역, 랜딩 모든 가시 텍스트 한/영 전환 | P0 |
| **고도화** | 섹션별 키 체계 통일(proof, allInOne, featuresSection, features 카드), 번역 일원화 | P0 |
| **글로벌** | www 단일 도메인에서 쿠키 기반 한/영 전환 시 화면 전체 일관 번역, 추후 path·hreflang 확장 시 동일 키 유지 | P1 |

---

## 2. 작업 상세

### 2.1 FAQ 본문 다국어

| 항목 | 상세 |
|------|------|
| **키 구조** | `www.faq.q1`~`q6`, `www.faq.a1`~`a6` (질문 6개·답 6개) |
| **컴포넌트** | `WwwFaqSection`: faqs prop 제거, 1~6 인덱스로 `t('www.faq.qN')`, `t('www.faq.aN')` 렌더 |
| **en 번역** | 동일 키에 영어 Q/A 6세트 반영 |

### 2.2 사회적 증거 섹션

| 항목 | 상세 |
|------|------|
| **키** | `www.proof.label1`(블로그), `www.proof.sublabel1`(오픈 가능), label2/sublabel2(SEO/자동 최적화), label3/sublabel3(한 곳/블로그·상품·결제) |
| **구현** | 클라이언트 컴포넌트 `WwwProofSection` 또는 기존 section을 클라이언트로 교체 후 t() 사용 |

### 2.3 올인원 그리드 섹션

| 항목 | 상세 |
|------|------|
| **키** | `www.allInOne.title`, `www.allInOne.subtitle`, `www.allInOne.blog`, `.product`, `.seo`, `.domain`, `.payment`, `.settings`, `.writing`, `.orders` (8개 라벨) |
| **구현** | 클라이언트 `WwwAllInOneSection`: 고정 8개 아이템에 icon + t(labelKey) 매핑 |

### 2.4 기능 섹션(제목·부제·카드)

| 항목 | 상세 |
|------|------|
| **키** | `www.featuresSection.title`, `www.featuresSection.subtitle`; 카드별 `www.features.cardTitleSeo`, `www.features.cardDescSeo`, … (greatForKey 6개×2) |
| **구현** | `WwwFeaturesSection`: 서버에서 features는 `{ icon, greatForKey }[]`만 전달, 제목·부제·카드 title/desc는 t()로 조회 |

### 2.5 고도화·일관성

- **키 네이밍**: `www.{섹션}.{항목}` 유지, 카드/리스트는 cardTitleX, cardDescX 또는 labelN 등으로 구분.
- **en 누락 방지**: ko 추가 시 en 동일 키 즉시 추가.

---

## 3. 글로벌 관점

- **Phase 7 완료 후**: www 랜딩의 모든 사용자 가시 텍스트가 메시지 키로 관리되며, 쿠키 locale만 바꿔도 한/영 전환 가능.
- **추후**: path 기반(/en/www), hreflang, FAQ 확장(7번째 질문 등) 시 동일 키 구조로 확장.

---

## 4. 구현 체크리스트 (Phase 7)

- [x] FAQ 본문: q1~q6, a1~a6 메시지 키 추가(ko/en), WwwFaqSection에서 키 기반 렌더
- [x] 사회적 증거: proof.* 키 추가, WwwProofSection
- [x] 올인원: allInOne.* 키 추가, WwwAllInOneSection
- [x] 기능: featuresSection.*, featuresCard.* 키 추가, WwwFeaturesSection
- [x] page.tsx: 위 클라이언트 컴포넌트로 교체, 서버 데이터는 features(icon·greatForKey)만 전달
- [x] BENCHMARK·TASKS·ROADMAP_DETAIL 갱신
