# Phase 6 — 벤치마크 기반 다음 작업 · 고도화 · 글로벌

벤치마크(Squarespace·Manus) 전수 탐색 결과와 ROADMAP_DETAIL·BENCHMARK 체크리스트를 기준으로 한 **디테일·전문 기획** 및 실행 목록입니다.

---

## 1. 목표 요약

| 축 | 목표 | 우선순위 |
|----|------|----------|
| **벤치마크 반영** | FAQ 하단 24/7 Support 스타일 블록, 나머지 랜딩 문자열 전면 i18n | P0 |
| **고도화** | 랜딩 섹션별 메시지 키 통일, 지원 채널 명시(FAQ·연결 상태·문서) | P0 |
| **글로벌** | www 전면 한/영 전환 가능, 추후 path·hreflang 확장 시 키 구조 유지 | P1 |

---

## 2. 벤치마크에서 가져올 다음 작업 (상세)

### 2.1 Squarespace 패턴

- **모든 서브페이지 하단**: FAQ 또는 본문 → **24/7 Support** 블록(Help Center, Webinars 링크) → "Start your free trial today. No credit card required." + Get started.
- **지원 채널**: 24/7 support, Help Center, Forum, Webinars를 한 블록으로 노출.

### 2.2 Sellog 적용 (Phase 6 범위)

| # | 작업 | 상세 | 상태 |
|---|------|------|------|
| 1 | **FAQ 하단 Support 블록** | FAQ 섹션 직후, 가격 섹션 직전에 "도움이 필요하신가요?" 블록: FAQ 링크 · 연결 상태 링크 · supportBlurb · (선택) "무료로 시작하기" CTA. 푸터와 동일 톤, 랜딩 본문에서 한 번 더 노출. | 구현 |
| 2 | **www 전면 i18n** | FAQ 제목, 가격 섹션(제목·부제·CTA), Final CTA(제목·부제·CTA) 메시지 키화 → ko/en 전환 시 일괄 반영. | 구현 |
| 3 | **(선택) 섹션 제목 i18n** | 기능 섹션 "블로그와 판매를 하나로", 올인원 "하나의 플랫폼에서…", 사회적 증거 라벨 — 메시지 키 추가 시 글로벌 확장 일관성 확보. | 구현 |

### 2.3 고도화·일관성

- **지원 문구 통일**: 푸터 needHelp + supportBlurb, 랜딩 Support 블록에서 동일 키(www.footer.needHelp, supportBlurb) 재사용.
- **CTA 문구 통일**: "무료로 시작하기" → www.hero.cta 또는 www.pricing.cta 등 단일 키로 통일해 번역 일원화.

---

## 3. 글로벌 기획 (Phase 6 관점)

### 3.1 현재(Phase 6 완료 후)

- **www 랜딩**: 모든 사용자 가시 텍스트(히어로, 네비, 기능, 시작하는 방법, 쇼케이스, FAQ, Support 블록, 가격, Final CTA, 푸터)가 `www.*` 메시지 키로 관리.
- **locale**: cookie `sellog_locale` (ko/en), LocaleProvider·useTranslations.
- **확장**: 새 언어(예: ja) 추가 시 ko/en과 동일 키에 값만 추가하면 됨.

### 3.2 추후(Phase 7+)

- **path 기반 locale**: `/en/www` 등 prefix 도입 시 middleware에서 cookie 설정, hreflang·alternate 링크 반영.
- **FAQ 본문 다국어**: www.faq.q1~q6, a1~a6 키로 전환 시 FAQ도 완전 i18n.
- **블로그·콘텐츠 다국어**: posts/products locale 필드, 메타·OG 다국어(ROADMAP_DETAIL 4.5 참고).

---

## 4. 구현 체크리스트 (Phase 6)

- [x] FAQ 하단 24/7 Support 스타일 블록 (WwwSupportBlock, FAQ 직후 삽입)
- [x] www 전면 i18n: FAQ 제목, 가격(제목·부제·CTA), Final CTA(제목·부제·CTA)
- [ ] (선택) 기능·올인원·사회적 증거 섹션 제목/부제 i18n
- [x] ROADMAP_DETAIL·BENCHMARK Phase 6 참조, TASKS.md 갱신

완료 시 BENCHMARK 문서의 "추후" 항목 중 Support 블록·www 전면 메시지 키화를 완료로 표시합니다.
