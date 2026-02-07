# Phase 27 — 블로그 설정 폼 i18n · 글로벌

[domain]/settings **BlogSettingsForm**의 라벨·placeholder·안내 문구·제출 버튼을 메시지 키화하고 ko/en으로 통일하는 기획 및 실행 계획입니다.

---

## 1. 목표 요약

| 축 | 목표 | 우선순위 |
|----|------|----------|
| **설정 폼** | 블로그 이름·한 줄 소개·커스텀 도메인 라벨/placeholder/안내 i18n | P0 |
| **서브도메인 안내** | "서브도메인(domain)은 변경할 수 없습니다" {{domain}} 치환 | P0 |
| **버튼** | 저장/저장 중… 메시지 키화 | P0 |
| **글로벌** | blog.settings.* ko/en | P0 |
| **고도화** | 설정 항목 추가 시 settings.* 확장 용이 | P1 |

---

## 2. 메시지 구조

- **blog.settings**: nameLabel, namePlaceholder, descriptionLabel, descriptionPlaceholder, customDomainLabel, customDomainPlaceholder, customDomainHelp, subdomainNotice({{domain}}), save, saving

---

## 3. 구현

- **메시지**: ko.json / en.json에 blog.settings.* 추가.
- **BlogSettingsForm** (client): useLocale(), t("blog.settings.*"), subdomainNotice는 t().replace("{{domain}}", domain).

---

## 4. 체크리스트 (Phase 27)

- [x] blog.settings.* 메시지 추가(ko/en)
- [x] BlogSettingsForm에 useLocale·t() 적용
- [x] TASKS 갱신
