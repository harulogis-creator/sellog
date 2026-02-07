# Phase 35 — 설정 액션 에러·프로필 폼 i18n · 글로벌

[domain]/settings **서버 액션**(updateBlogAction·updateProfileAction)이 반환하는 **에러 메시지**를 메시지 키로 통일하고, **ProfileSettingsForm** 라벨·placeholder·버튼을 메시지 키화하여 ko/en으로 표시하는 기획 및 실행 계획입니다.

---

## 1. 목표 요약

| 축 | 목표 | 우선순위 |
|----|------|----------|
| **액션 에러** | 블로그/프로필 설정 액션 반환값을 메시지 키(blog.settings.error.*)로 통일 | P0 |
| **에러 표시** | BlogSettingsForm·ProfileSettingsForm에서 result.error를 t(error)로 표시 | P0 |
| **프로필 폼** | 표시 이름·프로필 이미지 URL 라벨/placeholder·저장 버튼 i18n | P0 |
| **글로벌** | blog.settings.error.*, blog.settings.profile.* ko/en | P0 |
| **고도화** | DB/네트워크 오류는 error.unknown 등 공통 키로 반환해 확장 용이 | P1 |

---

## 2. 메시지 구조

- **blog.settings.error**: dbError, notFound, forbidden, nameRequired, customDomainInvalid, loginRequired, unknown
- **blog.settings.profile**: displayNameLabel, displayNamePlaceholder, avatarUrlLabel, avatarUrlPlaceholder, saveButton, savingButton

---

## 3. 구현

- **메시지**: ko.json / en.json에 blog.settings.error.*, blog.settings.profile.* 추가.
- **settings/actions.ts**: updateBlogAction·updateProfileAction에서 한글 대신 위 키 반환. Supabase error 시 unknown 반환.
- **BlogSettingsForm**: error 표시 시 t(error) 사용(반환값이 항상 키라고 가정).
- **ProfileSettingsForm**: useLocale(), 라벨·placeholder·버튼 t(), error 표시 t(error).

---

## 4. 체크리스트 (Phase 35)

- [x] blog.settings.error.*, blog.settings.profile.* 메시지 추가(ko/en)
- [x] settings/actions.ts 에러 반환을 키로 변경
- [x] BlogSettingsForm·ProfileSettingsForm 에러 표시 t(error)
- [x] ProfileSettingsForm 라벨·placeholder·버튼 t() 적용
- [x] TASKS 갱신
