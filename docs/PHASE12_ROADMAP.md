# Phase 12 — 메가메뉴 · 고도화 · 글로벌

Squarespace/Manus 벤치마크의 **Products · Solutions · Resources** 스타일 헤더 메가메뉴를 도입하여 네비게이션을 그룹화하고, 접근성·i18n을 갖춘 드롭다운으로 고도화하는 기획 및 실행 계획입니다.

---

## 1. 목표 요약

| 축 | 목표 | 우선순위 |
|----|------|----------|
| **메가메뉴 UX** | 데스크톱에서 기능·시작하기·가격·FAQ를 그룹 드롭다운(Product / Resources)으로 표시 | P0 |
| **접근성** | 키보드 포커스·Esc 닫기·aria-expanded·aria-haspopup·포커스 트랩(선택) | P0 |
| **i18n** | 그룹 라벨(Product, Resources) 메시지 키화(www.megamenu.*), 기존 nav 키 재사용 | P0 |
| **모바일** | 기존 햄버거 드로어 유지(메가메뉴는 데스크톱 전용), 동일 링크 목록 | P1 |
| **고도화** | 호버·포커스 시 패널 표시, 스크롤 시 헤더 배경과 조화되는 패널 스타일 | P1 |

---

## 2. 메가메뉴 구조

### 2.1 그룹 구성 (벤치마크 반영)

| 그룹 | 항목 | 링크 |
|------|------|------|
| **Product** | 기능, 시작하기, 가격 | #features, #how, #pricing |
| **Resources** | FAQ, 연결 상태 | #faq, /www/check (→ /{locale}/www/check) |

- 그룹 라벨: `www.megamenu.product`, `www.megamenu.resources` (ko: 제품, 리소스 / en: Product, Resources).

### 2.2 데스크톱 동작

- **트리거**: "Product", "Resources" 버튼/링크에 호버 또는 포커스 시 아래 방향 패널 표시.
- **패널**: 그룹별 링크 리스트, 클릭 시 해당 섹션/페이지로 이동 후 패널 닫힘.
- **닫기**: 패널 밖 클릭, Esc 키, 다른 트리거 포커스 시.

### 2.3 접근성

- `aria-haspopup="true"`, `aria-expanded={open}`.
- 트리거에 `aria-controls="megamenu-product"` 등 id 연결.
- 키보드: Tab으로 트리거·패널 링크 순차 이동, Esc로 패널 닫기.

---

## 3. 구현 상세

### 3.1 메시지 키

- `www.megamenu.product`, `www.megamenu.resources` (ko/en).
- 하위 항목은 기존 `www.nav.features`, `www.nav.how`, `www.nav.pricing`, `www.nav.faq`, `www.footer.connectionCheck` 사용.

### 3.2 컴포넌트

- **WwwHeader** 내부에 메가메뉴 트리거 2개 + 각각 드롭다운 패널.
- 상태: `openDropdown: 'product' | 'resources' | null`.
- 패널: 절대 위치(absolute), z-index, border/shadow로 헤더와 시각적 일치.

### 3.3 체크리스트 (Phase 12)

- [x] ko/en에 www.megamenu.product, www.megamenu.resources 추가
- [x] WwwHeader 데스크톱에 Product/Resources 드롭다운 구현 (호버·클릭 토글·클릭 외부·Esc 닫기)
- [x] aria-haspopup, aria-expanded, aria-controls, role="menu"/menuitem 적용
- [x] 모바일은 기존 드로어 유지(연결 상태 링크 포함)
- [ ] TASKS·ROADMAP 갱신
