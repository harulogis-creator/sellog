# Project Name: Sellog (Sales + Blog)
**Mission:** "검색엔진에 최적화된 블로그 커머스 플랫폼 구축"

## 1. 핵심 목표
1.  **SEO First:** Next.js의 SSR을 활용해 모든 페이지가 크롤링되게 함.
2.  **Multi-Tenancy:** `user.sellog.com` 형태의 서브도메인 지원.
3.  **Commerce Widget:** 블로그 글 내 상품 카드 삽입 및 결제 연동.

## 2. 기술 스택
* **Framework:** Next.js 14+ (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS (Shadcn/UI)
* **Database:** Supabase
* **Deployment:** Vercel

## 3. 핵심 기능 명세
* **Dynamic Sitemap:** 글 발행 시 sitemap.xml 자동 갱신.
* **Subdomain Middleware:** 서브도메인에 따라 다른 블로그 데이터 로딩.
* **Smart Editor:** 마크다운 기반, 상품 임베드 기능 포함.
