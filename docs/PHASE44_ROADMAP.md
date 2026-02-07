# Phase 44 — 에러 경계 본문 i18n · 글로벌

에러 경계(Error Boundary)에서 사용자에게 보여주는 **본문 문구**를 raw error.message 대신 메시지 키(common.error.description)로 통일하고, ko/en으로 표시하도록 하는 기획 및 실행 계획입니다. (개발 시 상세 메시지는 console.error로만 출력.)

---

## 1. 목표 요약

| 축 | 목표 | 우선순위 |
|----|------|----------|
| **본문 i18n** | error.tsx·global-error에서 error.message 대신 common.error.description 표시 | P0 |
| **글로벌** | common.error.description ko/en 추가 | P0 |
| **보안·UX** | 사용자에게 기술적 오류 메시지 노출 최소화, 재시도·홈은 기존 키 유지 | P1 |
| **고도화** | global-error는 LocaleProvider 밖이므로 쿠키 기반 locale·메시지 적용 | P1 |

---

## 2. 메시지 구조

- **common.error**: 기존 title, retry, home + **description** (일시적인 오류 안내 문구, ko/en)

---

## 3. 적용 대상

| 파일 | 변경 |
|------|------|
| app/www/error.tsx | 본문: t("common.error.description") |
| app/[domain]/www/error.tsx | 본문: t("common.error.description") |
| app/error.tsx | CommonError 타입·messages에 description 추가, 본문: m.description |
| app/global-error.tsx | 쿠키+메시지 객체로 locale 선택, 제목·본문·버튼·링크 i18n |

---

## 4. 체크리스트 (Phase 44)

- [x] common.error.description 메시지 추가(ko/en)
- [x] app/www/error.tsx 본문 common.error.description
- [x] app/[domain]/www/error.tsx 본문 common.error.description
- [x] app/error.tsx 본문 m.description
- [x] app/global-error.tsx 제목·본문·버튼·링크 i18n(쿠키 기반)
- [x] TASKS 갱신
