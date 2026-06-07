# NOW MEET GO · 나믿고 — 전체 코드 레퍼런스

> 프로젝트 전체 소스 + 파일별 구조/경로/모듈화 설명
> 생성: `node scripts/generate-code-reference.mjs` · 2026-06-07T10:19:18.995Z

---

## 1. 모듈 구조 요약

```text
japan-travel-planner/
├── src/
│   ├── app/                 # Next.js App Router (페이지 + API Route)
│   │   ├── api/             # REST API
│   │   ├── */page.tsx       # URL 페이지
│   │   ├── layout.tsx       # 전역 레이아웃
│   │   └── globals.css      # 전역 스타일
│   ├── features/            # 기능 단위 (UI + server + lib)
│   │   ├── auth/ home/ attractions/ restaurants/ stays/
│   │   ├── planner/ trips/ itinerary/ checklist/ budget/
│   │   ├── chat/ notifications/ profile/
│   ├── server/              # Google·Rakuten·DeepL·AI·Email
│   ├── shared/              # ui / layout / lib / hooks
│   ├── auth.ts              # NextAuth
│   └── middleware.ts
├── prisma/schema.prisma
└── scripts/
```

### 레이어 규칙
- **페이지** (`app/*/page.tsx`) → Feature 컴포넌트 조합
- **API Route** (`app/api/*`) → Feature server 또는 `server/*` 호출
- **Feature** = 한 도메인의 UI + server + lib (응집도 높은 모듈)
- **Shared** = 여러 Feature가 공유하는 UI/유틸
- **Server** = 외부 API 어댑터 (기능 간 재사용)

---

## 2. 파일 인덱스 (195개)

- `instrumentation.ts` — **기타**: 프로젝트 설정 · 보조 파일
- `next.config.ts` — **기타**: 프로젝트 설정 · 보조 파일
- `package.json` — **기타**: 프로젝트 설정 · 보조 파일
- `prisma/schema.prisma` — **Database**: Prisma 스키마 · DB 모델
- `public/brand-icon.svg` — **Static**: 정적 에셋
- `public/file.svg` — **Static**: 정적 에셋
- `public/globe.svg` — **Static**: 정적 에셋
- `public/manifest.json` — **Static**: 정적 에셋
- `public/next.svg` — **Static**: 정적 에셋
- `public/vercel.svg` — **Static**: 정적 에셋
- `public/window.svg` — **Static**: 정적 에셋
- `scripts/check-auth-env.mjs` — **Scripts**: 개발/검증/시드 스크립트
- `scripts/fix-tags.mjs` — **Scripts**: 개발/검증/시드 스크립트
- `scripts/generate-code-reference.mjs` — **Scripts**: 개발/검증/시드 스크립트
- `scripts/kakao-cron-local.mjs` — **Scripts**: 개발/검증/시드 스크립트
- `scripts/list-users-auth.mjs` — **Scripts**: 개발/검증/시드 스크립트
- `scripts/seed-fukuoka-trip.mjs` — **Scripts**: 개발/검증/시드 스크립트
- `scripts/test-resend-send.mjs` — **Scripts**: 개발/검증/시드 스크립트
- `scripts/update-imports.mjs` — **Scripts**: 개발/검증/시드 스크립트
- `scripts/verify-deepl.mjs` — **Scripts**: 개발/검증/시드 스크립트
- `scripts/verify-google-oauth.mjs` — **Scripts**: 개발/검증/시드 스크립트
- `scripts/verify-google-places.mjs` — **Scripts**: 개발/검증/시드 스크립트
- `scripts/verify-kakao-oauth.mjs` — **Scripts**: 개발/검증/시드 스크립트
- `scripts/verify-resend.mjs` — **Scripts**: 개발/검증/시드 스크립트
- `src/app/api/ai/accommodations/route.ts` — **API Route**: HTTP API 엔드포인트 (Route Handler)
- `src/app/api/ai/attractions/route.ts` — **API Route**: HTTP API 엔드포인트 (Route Handler)
- `src/app/api/ai/chat/route.ts` — **API Route**: HTTP API 엔드포인트 (Route Handler)
- `src/app/api/ai/itinerary/route.ts` — **API Route**: HTTP API 엔드포인트 (Route Handler)
- `src/app/api/ai/restaurants/route.ts` — **API Route**: HTTP API 엔드포인트 (Route Handler)
- `src/app/api/auth/[...nextauth]/route.ts` — **API Route**: HTTP API 엔드포인트 (Route Handler)
- `src/app/api/auth/forgot-password/route.ts` — **API Route**: HTTP API 엔드포인트 (Route Handler)
- `src/app/api/auth/register/route.ts` — **API Route**: HTTP API 엔드포인트 (Route Handler)
- `src/app/api/auth/reset-password/route.ts` — **API Route**: HTTP API 엔드포인트 (Route Handler)
- `src/app/api/budget/rate/route.ts` — **API Route**: HTTP API 엔드포인트 (Route Handler)
- `src/app/api/budget/route.ts` — **API Route**: HTTP API 엔드포인트 (Route Handler)
- `src/app/api/budget/suggest/route.ts` — **API Route**: HTTP API 엔드포인트 (Route Handler)
- `src/app/api/chat/route.ts` — **API Route**: HTTP API 엔드포인트 (Route Handler)
- `src/app/api/chat/sessions/route.ts` — **API Route**: HTTP API 엔드포인트 (Route Handler)
- `src/app/api/checklist/route.ts` — **API Route**: HTTP API 엔드포인트 (Route Handler)
- `src/app/api/config/google-maps/route.ts` — **API Route**: HTTP API 엔드포인트 (Route Handler)
- `src/app/api/cron/kakao-schedule/route.ts` — **API Route**: HTTP API 엔드포인트 (Route Handler)
- `src/app/api/notifications/preview/route.ts` — **API Route**: HTTP API 엔드포인트 (Route Handler)
- `src/app/api/notifications/send-test/route.ts` — **API Route**: HTTP API 엔드포인트 (Route Handler)
- `src/app/api/notifications/settings/route.ts` — **API Route**: HTTP API 엔드포인트 (Route Handler)
- `src/app/api/trips/[id]/collaborators/route.ts` — **API Route**: HTTP API 엔드포인트 (Route Handler)
- `src/app/api/trips/[id]/invite/route.ts` — **API Route**: HTTP API 엔드포인트 (Route Handler)
- `src/app/api/trips/[id]/itinerary/route.ts` — **API Route**: HTTP API 엔드포인트 (Route Handler)
- `src/app/api/trips/[id]/share/route.ts` — **API Route**: HTTP API 엔드포인트 (Route Handler)
- `src/app/api/trips/join/route.ts` — **API Route**: HTTP API 엔드포인트 (Route Handler)
- `src/app/api/trips/route.ts` — **API Route**: HTTP API 엔드포인트 (Route Handler)
- `src/app/api/user/delete/route.ts` — **API Route**: HTTP API 엔드포인트 (Route Handler)
- `src/app/api/user/profile/route.ts` — **API Route**: HTTP API 엔드포인트 (Route Handler)
- `src/app/attractions/page.tsx` — **App Router 페이지**: URL 페이지 컴포넌트 (Server/Client)
- `src/app/budget/page.tsx` — **App Router 페이지**: URL 페이지 컴포넌트 (Server/Client)
- `src/app/chat/page.tsx` — **App Router 페이지**: URL 페이지 컴포넌트 (Server/Client)
- `src/app/checklist/page.tsx` — **App Router 페이지**: URL 페이지 컴포넌트 (Server/Client)
- `src/app/forgot-password/page.tsx` — **App Router 페이지**: URL 페이지 컴포넌트 (Server/Client)
- `src/app/globals.css` — **전역 스타일**: 디자인 토큰 · 홈 UI · 공통 CSS
- `src/app/layout.tsx` — **App Router 루트**: 전역 레이아웃 · 폰트 · 메타데이터
- `src/app/login/page.tsx` — **App Router 페이지**: URL 페이지 컴포넌트 (Server/Client)
- `src/app/page.tsx` — **기타**: 프로젝트 설정 · 보조 파일
- `src/app/planner/page.tsx` — **App Router 페이지**: URL 페이지 컴포넌트 (Server/Client)
- `src/app/profile/page.tsx` — **App Router 페이지**: URL 페이지 컴포넌트 (Server/Client)
- `src/app/register/page.tsx` — **App Router 페이지**: URL 페이지 컴포넌트 (Server/Client)
- `src/app/reset-password/page.tsx` — **App Router 페이지**: URL 페이지 컴포넌트 (Server/Client)
- `src/app/restaurants/page.tsx` — **App Router 페이지**: URL 페이지 컴포넌트 (Server/Client)
- `src/app/settings/notifications/page.tsx` — **기타**: 프로젝트 설정 · 보조 파일
- `src/app/share/[token]/page.tsx` — **기타**: 프로젝트 설정 · 보조 파일
- `src/app/stays/page.tsx` — **App Router 페이지**: URL 페이지 컴포넌트 (Server/Client)
- `src/app/trips/[id]/page.tsx` — **기타**: 프로젝트 설정 · 보조 파일
- `src/app/trips/page.tsx` — **App Router 페이지**: URL 페이지 컴포넌트 (Server/Client)
- `src/auth.config.ts` — **인증**: NextAuth 설정 분리
- `src/auth.ts` — **인증**: NextAuth v5 진입점 · 세션/프로바이더 설정
- `src/features/attractions/components/attraction-detail-modal.tsx` — **Feature UI**: 기능별 React 컴포넌트 (프레젠테이션)
- `src/features/attractions/components/attraction-list-rows.tsx` — **Feature UI**: 기능별 React 컴포넌트 (프레젠테이션)
- `src/features/attractions/components/attraction-list.tsx` — **Feature UI**: 기능별 React 컴포넌트 (프레젠테이션)
- `src/features/attractions/components/attraction-map.tsx` — **Feature UI**: 기능별 React 컴포넌트 (프레젠테이션)
- `src/features/attractions/components/attraction-rating-section.tsx` — **Feature UI**: 기능별 React 컴포넌트 (프레젠테이션)
- `src/features/attractions/components/star-rating-display.tsx` — **Feature UI**: 기능별 React 컴포넌트 (프레젠테이션)
- `src/features/attractions/data/attraction-ratings.ts` — **Feature Data**: 정적 데이터 · 목업 · 시드
- `src/features/attractions/data/famous-landmarks.ts` — **Feature Data**: 정적 데이터 · 목업 · 시드
- `src/features/attractions/index.ts` — **Feature Barrel**: 기능 모듈 public export
- `src/features/attractions/lib/region-map.ts` — **Feature Lib**: 기능별 유틸 · 필터 · 매핑
- `src/features/attractions/server/attractions.service.ts` — **Feature Server**: 기능별 서버 로직 · DB · 비즈니스 규칙
- `src/features/attractions/server/details.ts` — **Feature Server**: 기능별 서버 로직 · DB · 비즈니스 규칙
- `src/features/attractions/server/index.ts` — **Feature Server**: 기능별 서버 로직 · DB · 비즈니스 규칙
- `src/features/attractions/server/mock-data.ts` — **Feature Server**: 기능별 서버 로직 · DB · 비즈니스 규칙
- `src/features/auth/components/auth-error-banner.tsx` — **Feature UI**: 기능별 React 컴포넌트 (프레젠테이션)
- `src/features/auth/components/forgot-password-form.tsx` — **Feature UI**: 기능별 React 컴포넌트 (프레젠테이션)
- `src/features/auth/components/login-form.tsx` — **Feature UI**: 기능별 React 컴포넌트 (프레젠테이션)
- `src/features/auth/components/register-form.tsx` — **Feature UI**: 기능별 React 컴포넌트 (프레젠테이션)
- `src/features/auth/components/reset-password-form.tsx` — **Feature UI**: 기능별 React 컴포넌트 (프레젠테이션)
- `src/features/auth/components/sign-out-button.tsx` — **Feature UI**: 기능별 React 컴포넌트 (프레젠테이션)
- `src/features/auth/components/social-login-buttons.tsx` — **Feature UI**: 기능별 React 컴포넌트 (프레젠테이션)
- `src/features/auth/components/social-login-section.tsx` — **Feature UI**: 기능별 React 컴포넌트 (프레젠테이션)
- `src/features/auth/index.ts` — **Feature Barrel**: 기능 모듈 public export
- `src/features/auth/server/password-reset.ts` — **Feature Server**: 기능별 서버 로직 · DB · 비즈니스 규칙
- `src/features/auth/server/social-providers.ts` — **Feature Server**: 기능별 서버 로직 · DB · 비즈니스 규칙
- `src/features/budget/components/budget-panel.tsx` — **Feature UI**: 기능별 React 컴포넌트 (프레젠테이션)
- `src/features/budget/components/trip-budget-picker.tsx` — **Feature UI**: 기능별 React 컴포넌트 (프레젠테이션)
- `src/features/budget/index.ts` — **Feature Barrel**: 기능 모듈 public export
- `src/features/budget/server/exchange-rate.ts` — **Feature Server**: 기능별 서버 로직 · DB · 비즈니스 규칙
- `src/features/budget/server/trip-budget-suggest.ts` — **Feature Server**: 기능별 서버 로직 · DB · 비즈니스 규칙
- `src/features/chat/components/ai-chat-widget.tsx` — **Feature UI**: 기능별 React 컴포넌트 (프레젠테이션)
- `src/features/chat/components/chat-panel.tsx` — **Feature UI**: 기능별 React 컴포넌트 (프레젠테이션)
- `src/features/chat/index.ts` — **Feature Barrel**: 기능 모듈 public export
- `src/features/chat/server/chat.service.ts` — **Feature Server**: 기능별 서버 로직 · DB · 비즈니스 규칙
- `src/features/chat/server/index.ts` — **Feature Server**: 기능별 서버 로직 · DB · 비즈니스 규칙
- `src/features/checklist/components/checklist-panel.tsx` — **Feature UI**: 기능별 React 컴포넌트 (프레젠테이션)
- `src/features/checklist/index.ts` — **Feature Barrel**: 기능 모듈 public export
- `src/features/checklist/server/checklist-defaults.ts` — **Feature Server**: 기능별 서버 로직 · DB · 비즈니스 규칙
- `src/features/home/components/home-page-content.tsx` — **Feature UI**: 기능별 React 컴포넌트 (프레젠테이션)
- `src/features/home/components/nihon-hero.tsx` — **Feature UI**: 기능별 React 컴포넌트 (프레젠테이션)
- `src/features/home/components/planner-preview-section.tsx` — **Feature UI**: 기능별 React 컴포넌트 (프레젠테이션)
- `src/features/home/components/popular-destinations.tsx` — **Feature UI**: 기능별 React 컴포넌트 (프레젠테이션)
- `src/features/home/lib/home-data.ts` — **Feature Lib**: 기능별 유틸 · 필터 · 매핑
- `src/features/itinerary/components/sortable-day-items.tsx` — **Feature UI**: 기능별 React 컴포넌트 (프레젠테이션)
- `src/features/notifications/components/notification-form.tsx` — **Feature UI**: 기능별 React 컴포넌트 (프레젠테이션)
- `src/features/notifications/index.ts` — **Feature Barrel**: 기능 모듈 public export
- `src/features/notifications/server/index.ts` — **Feature Server**: 기능별 서버 로직 · DB · 비즈니스 규칙
- `src/features/notifications/server/kakao/message.ts` — **Feature Server**: 기능별 서버 로직 · DB · 비즈니스 규칙
- `src/features/notifications/server/kakao/schedule-message.ts` — **Feature Server**: 기능별 서버 로직 · DB · 비즈니스 규칙
- `src/features/notifications/server/kakao/sync-kakao-user.ts` — **Feature Server**: 기능별 서버 로직 · DB · 비즈니스 규칙
- `src/features/notifications/server/kakao/talk-api.ts` — **Feature Server**: 기능별 서버 로직 · DB · 비즈니스 규칙
- `src/features/notifications/server/time/kst.ts` — **Feature Server**: 기능별 서버 로직 · DB · 비즈니스 규칙
- `src/features/notifications/server/today-schedule.ts` — **Feature Server**: 기능별 서버 로직 · DB · 비즈니스 규칙
- `src/features/planner/components/planner-panel.tsx` — **Feature UI**: 기능별 React 컴포넌트 (프레젠테이션)
- `src/features/profile/components/delete-account-button.tsx` — **Feature UI**: 기능별 React 컴포넌트 (프레젠테이션)
- `src/features/profile/components/profile-form.tsx` — **Feature UI**: 기능별 React 컴포넌트 (프레젠테이션)
- `src/features/restaurants/components/restaurant-card.tsx` — **Feature UI**: 기능별 React 컴포넌트 (프레젠테이션)
- `src/features/restaurants/components/restaurant-detail-modal.tsx` — **Feature UI**: 기능별 React 컴포넌트 (프레젠테이션)
- `src/features/restaurants/components/restaurant-list.tsx` — **Feature UI**: 기능별 React 컴포넌트 (프레젠테이션)
- `src/features/restaurants/index.ts` — **Feature Barrel**: 기능 모듈 public export
- `src/features/restaurants/lib/menu-items.ts` — **Feature Lib**: 기능별 유틸 · 필터 · 매핑
- `src/features/restaurants/server/index.ts` — **Feature Server**: 기능별 서버 로직 · DB · 비즈니스 규칙
- `src/features/restaurants/server/restaurants.service.ts` — **Feature Server**: 기능별 서버 로직 · DB · 비즈니스 규칙
- `src/features/stays/components/stay-card.tsx` — **Feature UI**: 기능별 React 컴포넌트 (프레젠테이션)
- `src/features/stays/components/stay-search.tsx` — **Feature UI**: 기능별 React 컴포넌트 (프레젠테이션)
- `src/features/stays/index.ts` — **Feature Barrel**: 기능 모듈 public export
- `src/features/stays/lib/apply-stay-filters.ts` — **Feature Lib**: 기능별 유틸 · 필터 · 매핑
- `src/features/stays/server/index.ts` — **Feature Server**: 기능별 서버 로직 · DB · 비즈니스 규칙
- `src/features/stays/server/stays-recommend.ts` — **Feature Server**: 기능별 서버 로직 · DB · 비즈니스 규칙
- `src/features/stays/server/stays.service.ts` — **Feature Server**: 기능별 서버 로직 · DB · 비즈니스 규칙
- `src/features/trips/components/share-join-banner.tsx` — **Feature UI**: 기능별 React 컴포넌트 (프레젠테이션)
- `src/features/trips/components/trip-actions.tsx` — **Feature UI**: 기능별 React 컴포넌트 (프레젠테이션)
- `src/features/trips/components/trip-card.tsx` — **Feature UI**: 기능별 React 컴포넌트 (프레젠테이션)
- `src/features/trips/components/trip-collaborator-panel.tsx` — **Feature UI**: 기능별 React 컴포넌트 (프레젠테이션)
- `src/features/trips/components/trip-itinerary-editor.tsx` — **Feature UI**: 기능별 React 컴포넌트 (프레젠테이션)
- `src/features/trips/components/trip-itinerary-gallery.tsx` — **Feature UI**: 기능별 React 컴포넌트 (프레젠테이션)
- `src/features/trips/server/trip-access.ts` — **Feature Server**: 기능별 서버 로직 · DB · 비즈니스 규칙
- `src/features/trips/server/trip-images.ts` — **Feature Server**: 기능별 서버 로직 · DB · 비즈니스 규칙
- `src/middleware.ts` — **미들웨어**: 요청 가로채기 · 인증 · 뷰모드 처리
- `src/server/ai/adapter.ts` — **Shared Server**: 외부 API 어댑터 · 공통 서버 유틸
- `src/server/ai/types.ts` — **Shared Server**: 외부 API 어댑터 · 공통 서버 유틸
- `src/server/attractions/travel-client.ts` — **Shared Server**: 외부 API 어댑터 · 공통 서버 유틸
- `src/server/db/prisma.ts` — **Shared Server**: 외부 API 어댑터 · 공통 서버 유틸
- `src/server/email/send-email.ts` — **Shared Server**: 외부 API 어댑터 · 공통 서버 유틸
- `src/server/google-places/attractions.ts` — **Shared Server**: 외부 API 어댑터 · 공통 서버 유틸
- `src/server/google-places/client.ts` — **Shared Server**: 외부 API 어댑터 · 공통 서버 유틸
- `src/server/google-places/restaurants.ts` — **Shared Server**: 외부 API 어댑터 · 공통 서버 유틸
- `src/server/index.ts` — **Shared Server**: 외부 API 어댑터 · 공통 서버 유틸
- `src/server/preload/catalog.ts` — **Shared Server**: 외부 API 어댑터 · 공통 서버 유틸
- `src/server/rakuten/translate.ts` — **Shared Server**: 외부 API 어댑터 · 공통 서버 유틸
- `src/server/rakuten/travel-client.ts` — **Shared Server**: 외부 API 어댑터 · 공통 서버 유틸
- `src/server/translate/deepl-client.ts` — **Shared Server**: 외부 API 어댑터 · 공통 서버 유틸
- `src/server/translate/index.ts` — **Shared Server**: 외부 API 어댑터 · 공통 서버 유틸
- `src/server/translate/ko-map.ts` — **Shared Server**: 외부 API 어댑터 · 공통 서버 유틸
- `src/shared/hooks/use-view-mode.ts` — **Shared Hook**: 공통 React 훅
- `src/shared/index.ts` — **기타**: 프로젝트 설정 · 보조 파일
- `src/shared/layout/app-shell.tsx` — **Shared Layout**: 헤더 · 푸터 · 사이드바 · 셸
- `src/shared/layout/bottom-nav.tsx` — **Shared Layout**: 헤더 · 푸터 · 사이드바 · 셸
- `src/shared/layout/desktop-shell.tsx` — **Shared Layout**: 헤더 · 푸터 · 사이드바 · 셸
- `src/shared/layout/mobile-shell.tsx` — **Shared Layout**: 헤더 · 푸터 · 사이드바 · 셸
- `src/shared/layout/page-with-sidebar.tsx` — **Shared Layout**: 헤더 · 푸터 · 사이드바 · 셸
- `src/shared/layout/shortcuts-mobile-bar.tsx` — **Shared Layout**: 헤더 · 푸터 · 사이드바 · 셸
- `src/shared/layout/shortcuts-sidebar.tsx` — **Shared Layout**: 헤더 · 푸터 · 사이드바 · 셸
- `src/shared/layout/site-footer.tsx` — **Shared Layout**: 헤더 · 푸터 · 사이드바 · 셸
- `src/shared/layout/site-header.tsx` — **Shared Layout**: 헤더 · 푸터 · 사이드바 · 셸
- `src/shared/lib/constants.ts` — **Shared Lib**: 상수 · 공통 유틸
- `src/shared/lib/device.ts` — **Shared Lib**: 상수 · 공통 유틸
- `src/shared/lib/load-google-maps.ts` — **Shared Lib**: 상수 · 공통 유틸
- `src/shared/lib/resolve-view-mode.ts` — **Shared Lib**: 상수 · 공통 유틸
- `src/shared/lib/shortcut-groups.ts` — **Shared Lib**: 상수 · 공통 유틸
- `src/shared/lib/trip-dates.ts` — **Shared Lib**: 상수 · 공통 유틸
- `src/shared/lib/view-mode-server.ts` — **Shared Lib**: 상수 · 공통 유틸
- `src/shared/lib/view-mode.ts` — **Shared Lib**: 상수 · 공통 유틸
- `src/shared/providers.tsx` — **Shared Provider**: React Context/Provider 래퍼
- `src/shared/ui/badge.tsx` — **Shared UI**: 재사용 UI 컴포넌트
- `src/shared/ui/brand-hands-icon.tsx` — **Shared UI**: 재사용 UI 컴포넌트
- `src/shared/ui/brand-logo.tsx` — **Shared UI**: 재사용 UI 컴포넌트
- `src/shared/ui/button.tsx` — **Shared UI**: 재사용 UI 컴포넌트
- `src/shared/ui/card.tsx` — **Shared UI**: 재사용 UI 컴포넌트
- `src/shared/ui/trip-date-range-picker.tsx` — **Shared UI**: 재사용 UI 컴포넌트
- `src/types/next-auth.d.ts` — **Types**: 전역 TypeScript 타입 확장
- `tsconfig.json` — **기타**: 프로젝트 설정 · 보조 파일

---

## 3. 전체 소스 코드 (파일별)

### `instrumentation.ts`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `instrumentation.ts` |
| **레이어** | 기타 |
| **역할** | 프로젝트 설정 · 보조 파일 |

```typescript
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { warmupCatalog } = await import("@/server/preload/catalog");
    void warmupCatalog();
  }
}

```

---

### `next.config.ts`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `next.config.ts` |
| **레이어** | 기타 |
| **역할** | 프로젝트 설정 · 보조 파일 |

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "*.googleusercontent.com" },
      { protocol: "http", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "k.kakaocdn.net" },
      { protocol: "https", hostname: "t1.kakaocdn.net" },
      { protocol: "https", hostname: "p.kakaocdn.net" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "img.travel.rakuten.co.jp" },
      { protocol: "https", hostname: "trvimg.r10s.jp" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
    ],
  },
};

export default nextConfig;

```

---

### `package.json`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `package.json` |
| **레이어** | 기타 |
| **역할** | 프로젝트 설정 · 보조 파일 |

```json
{
  "name": "japan-travel-planner",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint",
    "db:generate": "prisma generate",
    "db:push": "prisma db push",
    "db:studio": "prisma studio",
    "check:auth": "node scripts/check-auth-env.mjs",
    "check:google": "node scripts/verify-google-oauth.mjs",
    "check:kakao": "node scripts/verify-kakao-oauth.mjs",
    "check:resend": "node scripts/verify-resend.mjs",
    "seed:fukuoka": "node scripts/seed-fukuoka-trip.mjs",
    "cron:local": "node scripts/kakao-cron-local.mjs"
  },
  "dependencies": {
    "@auth/prisma-adapter": "^2.11.2",
    "@dnd-kit/core": "^6.3.1",
    "@dnd-kit/sortable": "^10.0.0",
    "@dnd-kit/utilities": "^3.2.2",
    "@googlemaps/js-api-loader": "^2.1.0",
    "@hookform/resolvers": "^5.2.2",
    "@prisma/client": "^6.19.0",
    "bcryptjs": "^3.0.3",
    "date-fns": "^4.1.0",
    "lucide-react": "^0.511.0",
    "next": "16.2.6",
    "next-auth": "^5.0.0-beta.31",
    "react": "19.2.4",
    "react-dom": "19.2.4",
    "react-hook-form": "^7.75.0",
    "zod": "^3.25.76"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/bcryptjs": "^2.4.6",
    "@types/google.maps": "^3.65.0",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.2.6",
    "prisma": "^6.19.0",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}

```

---

### `prisma/schema.prisma`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `prisma/schema.prisma` |
| **레이어** | Database |
| **역할** | Prisma 스키마 · DB 모델 |

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum JapanRegion {
  OSAKA_KYOTO
  FUKUOKA
  TOKYO
  SAPPORO
}

enum BudgetCategory {
  ACCOMMODATION
  TRANSPORT
  FOOD
  SIGHTSEEING
  OTHER
}

enum AccommodationType {
  HOTEL
  RYOKAN
  GUESTHOUSE
}

enum CollaboratorRole {
  OWNER
  EDITOR
  VIEWER
}

model User {
  id            String    @id @default(cuid())
  email         String?   @unique
  emailVerified DateTime?
  name          String?
  image         String?
  passwordHash  String?
  phone         String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  accounts            Account[]
  sessions            Session[]
  trips               Trip[]
  checklists          Checklist[]
  budgets             Budget[]
  chatSessions        ChatSession[]
  notificationSetting NotificationSetting?
  expenseEntries      ExpenseEntry[]
  tripCollaborations  TripCollaborator[]
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}

model Trip {
  id          String      @id @default(cuid())
  userId      String
  title       String
  region      JapanRegion
  startDate   DateTime
  endDate     DateTime
  totalBudget Int?
  currency    String      @default("KRW")
  shareToken  String?     @unique
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt

  user           User               @relation(fields: [userId], references: [id], onDelete: Cascade)
  days           TripDay[]
  collaborators  TripCollaborator[]
  budgets        Budget[]
  expenseEntries ExpenseEntry[]
}

model TripCollaborator {
  id        String           @id @default(cuid())
  tripId    String
  userId    String
  role      CollaboratorRole @default(EDITOR)
  invitedAt DateTime         @default(now())

  trip Trip @relation(fields: [tripId], references: [id], onDelete: Cascade)
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([tripId, userId])
}

model TripDay {
  id        String   @id @default(cuid())
  tripId    String
  dayIndex  Int
  date      DateTime
  createdAt DateTime @default(now())

  trip  Trip       @relation(fields: [tripId], references: [id], onDelete: Cascade)
  items TripItem[]

  @@unique([tripId, dayIndex])
}

model TripItem {
  id          String  @id @default(cuid())
  tripDayId   String
  sortOrder   Int
  placeName   String
  startTime   String?
  endTime     String?
  transport   String?
  notes       String?
  placeId     String?

  tripDay TripDay @relation(fields: [tripDayId], references: [id], onDelete: Cascade)
}

model Checklist {
  id        String   @id @default(cuid())
  userId    String
  tripId    String?
  title     String   @default("출발 전 체크리스트")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  user  User            @relation(fields: [userId], references: [id], onDelete: Cascade)
  items ChecklistItem[]
}

model ChecklistItem {
  id          String  @id @default(cuid())
  checklistId String
  label       String
  isDefault   Boolean @default(false)
  isChecked   Boolean @default(false)
  sortOrder   Int

  checklist Checklist @relation(fields: [checklistId], references: [id], onDelete: Cascade)
}

model Budget {
  id         String   @id @default(cuid())
  userId     String
  tripId     String?
  totalKrw   Int
  totalJpy   Int?
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt

  user       User              @relation(fields: [userId], references: [id], onDelete: Cascade)
  trip       Trip?             @relation(fields: [tripId], references: [id], onDelete: SetNull)
  allocations BudgetAllocation[]
}

model BudgetAllocation {
  id       String         @id @default(cuid())
  budgetId String
  category BudgetCategory
  amountKrw Int
  amountJpy Int?

  budget Budget @relation(fields: [budgetId], references: [id], onDelete: Cascade)
}

model ExpenseEntry {
  id          String         @id @default(cuid())
  userId      String
  tripId      String?
  category    BudgetCategory
  amountKrw   Int
  amountJpy   Int?
  description String?
  spentAt     DateTime       @default(now())

  user User  @relation(fields: [userId], references: [id], onDelete: Cascade)
  trip Trip? @relation(fields: [tripId], references: [id], onDelete: SetNull)
}

model ChatSession {
  id        String   @id @default(cuid())
  userId    String
  provider  String?
  title     String   @default("여행 상담")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  user     User          @relation(fields: [userId], references: [id], onDelete: Cascade)
  messages ChatMessage[]
}

model ChatMessage {
  id        String   @id @default(cuid())
  sessionId String
  role      String
  content   String   @db.Text
  metadata  Json?
  createdAt DateTime @default(now())

  session ChatSession @relation(fields: [sessionId], references: [id], onDelete: Cascade)
}

model NotificationSetting {
  id              String  @id @default(cuid())
  userId          String  @unique
  enabled         Boolean @default(true)
  notifyTime      String  @default("08:00")
  kakaoUserId     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
}

```

---

### `public/brand-icon.svg`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `public/brand-icon.svg` |
| **레이어** | Static |
| **역할** | 정적 에셋 |

```xml
<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="4" y1="44" x2="44" y2="4" gradientUnits="userSpaceOnUse">
      <stop stop-color="#7BA7E8"/>
      <stop offset="1" stop-color="#9B8FE8"/>
    </linearGradient>
  </defs>
  <rect x="2" y="2" width="44" height="44" rx="14" fill="url(#g)"/>
  <g fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12.5 33 C10.8 29.5 11 24.8 14.2 21.8"/>
    <path d="M14.2 21.8 C15.5 18.5 17.8 17.2 19.6 18.8"/>
    <path d="M19.6 18.8 L19.6 14.8"/>
    <path d="M21.4 19.5 L21.4 15.2"/>
    <path d="M23.2 20.2 L23.2 16"/>
    <path d="M14.2 21.8 L12.8 25.5"/>
    <path d="M35.5 33 C37.2 29.5 37 24.8 33.8 21.8"/>
    <path d="M33.8 21.8 C32.5 18.5 30.2 17.2 28.4 18.8"/>
    <path d="M28.4 18.8 L28.4 14.8"/>
    <path d="M26.6 19.5 L26.6 15.2"/>
    <path d="M24.8 20.2 L24.8 16"/>
    <path d="M33.8 21.8 L35.2 25.5"/>
    <path d="M19.6 18.8 C21.8 16.8 26.2 16.8 28.4 18.8"/>
  </g>
  <circle cx="24" cy="18.5" r="2.2" fill="white"/>
</svg>

```

---

### `public/file.svg`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `public/file.svg` |
| **레이어** | Static |
| **역할** | 정적 에셋 |

```xml
<svg fill="none" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M14.5 13.5V5.41a1 1 0 0 0-.3-.7L9.8.29A1 1 0 0 0 9.08 0H1.5v13.5A2.5 2.5 0 0 0 4 16h8a2.5 2.5 0 0 0 2.5-2.5m-1.5 0v-7H8v-5H3v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1M9.5 5V2.12L12.38 5zM5.13 5h-.62v1.25h2.12V5zm-.62 3h7.12v1.25H4.5zm.62 3h-.62v1.25h7.12V11z" clip-rule="evenodd" fill="#666" fill-rule="evenodd"/></svg>
```

---

### `public/globe.svg`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `public/globe.svg` |
| **레이어** | Static |
| **역할** | 정적 에셋 |

```xml
<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><g clip-path="url(#a)"><path fill-rule="evenodd" clip-rule="evenodd" d="M10.27 14.1a6.5 6.5 0 0 0 3.67-3.45q-1.24.21-2.7.34-.31 1.83-.97 3.1M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.48-1.52a7 7 0 0 1-.96 0H7.5a4 4 0 0 1-.84-1.32q-.38-.89-.63-2.08a40 40 0 0 0 3.92 0q-.25 1.2-.63 2.08a4 4 0 0 1-.84 1.31zm2.94-4.76q1.66-.15 2.95-.43a7 7 0 0 0 0-2.58q-1.3-.27-2.95-.43a18 18 0 0 1 0 3.44m-1.27-3.54a17 17 0 0 1 0 3.64 39 39 0 0 1-4.3 0 17 17 0 0 1 0-3.64 39 39 0 0 1 4.3 0m1.1-1.17q1.45.13 2.69.34a6.5 6.5 0 0 0-3.67-3.44q.65 1.26.98 3.1M8.48 1.5l.01.02q.41.37.84 1.31.38.89.63 2.08a40 40 0 0 0-3.92 0q.25-1.2.63-2.08a4 4 0 0 1 .85-1.32 7 7 0 0 1 .96 0m-2.75.4a6.5 6.5 0 0 0-3.67 3.44 29 29 0 0 1 2.7-.34q.31-1.83.97-3.1M4.58 6.28q-1.66.16-2.95.43a7 7 0 0 0 0 2.58q1.3.27 2.95.43a18 18 0 0 1 0-3.44m.17 4.71q-1.45-.12-2.69-.34a6.5 6.5 0 0 0 3.67 3.44q-.65-1.27-.98-3.1" fill="#666"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h16v16H0z"/></clipPath></defs></svg>
```

---

### `public/manifest.json`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `public/manifest.json` |
| **레이어** | Static |
| **역할** | 정적 에셋 |

```json
{
  "name": "NOW MEET GO · 나믿고",
  "short_name": "나믿고",
  "description": "나믿고, 떠나는 완벽한 일본 여행",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#eef2fc",
  "theme_color": "#7ba7e8",
  "lang": "ko"
}

```

---

### `public/next.svg`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `public/next.svg` |
| **레이어** | Static |
| **역할** | 정적 에셋 |

```xml
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 394 80"><path fill="#000" d="M262 0h68.5v12.7h-27.2v66.6h-13.6V12.7H262V0ZM149 0v12.7H94v20.4h44.3v12.6H94v21h55v12.6H80.5V0h68.7zm34.3 0h-17.8l63.8 79.4h17.9l-32-39.7 32-39.6h-17.9l-23 28.6-23-28.6zm18.3 56.7-9-11-27.1 33.7h17.8l18.3-22.7z"/><path fill="#000" d="M81 79.3 17 0H0v79.3h13.6V17l50.2 62.3H81Zm252.6-.4c-1 0-1.8-.4-2.5-1s-1.1-1.6-1.1-2.6.3-1.8 1-2.5 1.6-1 2.6-1 1.8.3 2.5 1a3.4 3.4 0 0 1 .6 4.3 3.7 3.7 0 0 1-3 1.8zm23.2-33.5h6v23.3c0 2.1-.4 4-1.3 5.5a9.1 9.1 0 0 1-3.8 3.5c-1.6.8-3.5 1.3-5.7 1.3-2 0-3.7-.4-5.3-1s-2.8-1.8-3.7-3.2c-.9-1.3-1.4-3-1.4-5h6c.1.8.3 1.6.7 2.2s1 1.2 1.6 1.5c.7.4 1.5.5 2.4.5 1 0 1.8-.2 2.4-.6a4 4 0 0 0 1.6-1.8c.3-.8.5-1.8.5-3V45.5zm30.9 9.1a4.4 4.4 0 0 0-2-3.3 7.5 7.5 0 0 0-4.3-1.1c-1.3 0-2.4.2-3.3.5-.9.4-1.6 1-2 1.6a3.5 3.5 0 0 0-.3 4c.3.5.7.9 1.3 1.2l1.8 1 2 .5 3.2.8c1.3.3 2.5.7 3.7 1.2a13 13 0 0 1 3.2 1.8 8.1 8.1 0 0 1 3 6.5c0 2-.5 3.7-1.5 5.1a10 10 0 0 1-4.4 3.5c-1.8.8-4.1 1.2-6.8 1.2-2.6 0-4.9-.4-6.8-1.2-2-.8-3.4-2-4.5-3.5a10 10 0 0 1-1.7-5.6h6a5 5 0 0 0 3.5 4.6c1 .4 2.2.6 3.4.6 1.3 0 2.5-.2 3.5-.6 1-.4 1.8-1 2.4-1.7a4 4 0 0 0 .8-2.4c0-.9-.2-1.6-.7-2.2a11 11 0 0 0-2.1-1.4l-3.2-1-3.8-1c-2.8-.7-5-1.7-6.6-3.2a7.2 7.2 0 0 1-2.4-5.7 8 8 0 0 1 1.7-5 10 10 0 0 1 4.3-3.5c2-.8 4-1.2 6.4-1.2 2.3 0 4.4.4 6.2 1.2 1.8.8 3.2 2 4.3 3.4 1 1.4 1.5 3 1.5 5h-5.8z"/></svg>
```

---

### `public/vercel.svg`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `public/vercel.svg` |
| **레이어** | Static |
| **역할** | 정적 에셋 |

```xml
<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1155 1000"><path d="m577.3 0 577.4 1000H0z" fill="#fff"/></svg>
```

---

### `public/window.svg`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `public/window.svg` |
| **레이어** | Static |
| **역할** | 정적 에셋 |

```xml
<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill-rule="evenodd" clip-rule="evenodd" d="M1.5 2.5h13v10a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1zM0 1h16v11.5a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 0 12.5zm3.75 4.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5M7 4.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0m1.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5" fill="#666"/></svg>
```

---

### `scripts/check-auth-env.mjs`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `scripts/check-auth-env.mjs` |
| **레이어** | Scripts |
| **역할** | 개발/검증/시드 스크립트 |

```javascript
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { randomBytes } from "node:crypto";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const envPath = resolve(root, ".env");

function readEnvFile(path) {
  if (!existsSync(path)) return {};
  const vars = {};
  for (const line of readFileSync(path, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    vars[key] = val;
  }
  return vars;
}

const fileVars = readEnvFile(envPath);
const secret = process.env.AUTH_SECRET || fileVars.AUTH_SECRET;
const invalid =
  !secret ||
  secret.includes("openssl") ||
  secret.includes("로 생성") ||
  secret.startsWith("GOCSPX-");

let failed = false;

if (!existsSync(envPath)) {
  console.error("\n[오류] 프로젝트 루트에 .env 파일이 없습니다.");
  console.error("       .env.example 을 복사해 .env 를 만든 뒤 값을 채워주세요.\n");
  failed = true;
}

if (invalid) {
  if (!existsSync(envPath)) {
    console.error("\n[오류] AUTH_SECRET 이 비어 있거나 예시 문구입니다.");
    console.error("       .env 파일을 만든 뒤 AUTH_SECRET 을 설정해주세요.\n");
    failed = true;
  } else {
    const generated = randomBytes(32).toString("base64");
    const content = readFileSync(envPath, "utf8");
    const updated = /^AUTH_SECRET=.*$/m.test(content)
      ? content.replace(/^AUTH_SECRET=.*$/m, `AUTH_SECRET="${generated}"`)
      : `${content.trimEnd()}\nAUTH_SECRET="${generated}"\n`;
    writeFileSync(envPath, updated, "utf8");
    console.log("\n[안내] AUTH_SECRET 을 자동 생성해 .env 에 저장했습니다.");
    console.log("       (Google Client Secret 을 AUTH_SECRET 에 넣으면 안 됩니다.)");
    console.log("       배포 환경에서는 직접 안전한 값으로 교체하세요.\n");
  }
}

const googleId = process.env.AUTH_GOOGLE_ID || fileVars.AUTH_GOOGLE_ID;
const googleSecret = process.env.AUTH_GOOGLE_SECRET || fileVars.AUTH_GOOGLE_SECRET;
const exampleVars = existsSync(resolve(root, ".env.example"))
  ? readEnvFile(resolve(root, ".env.example"))
  : {};

if (googleId && googleSecret) {
  if (
    exampleVars.AUTH_GOOGLE_ID &&
    exampleVars.AUTH_GOOGLE_SECRET &&
    googleId === exampleVars.AUTH_GOOGLE_ID &&
    googleSecret === exampleVars.AUTH_GOOGLE_SECRET
  ) {
    console.warn(
      "\n[경고] AUTH_GOOGLE_ID/SECRET 이 .env.example 과 동일합니다.",
    );
    console.warn(
      "       Google Cloud Console에서 본인 OAuth 클라이언트 Secret을 복사해 .env 에 넣으세요.\n",
    );
  } else {
    console.log("[OK] Google OAuth 환경 변수 설정됨");
  }
} else {
  console.warn("\n[경고] AUTH_GOOGLE_ID 또는 AUTH_GOOGLE_SECRET 이 비어 있습니다.");
  console.warn("       구글 로그인을 쓰려면 .env 에 값을 채우세요.\n");
}

if (failed) process.exit(1);

console.log("[OK] AUTH_SECRET 설정됨");

```

---

### `scripts/fix-tags.mjs`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `scripts/fix-tags.mjs` |
| **레이어** | Scripts |
| **역할** | 개발/검증/시드 스크립트 |

```javascript
import fs from "fs";
import path from "path";

const wrongClose = "</motion>";
const wrongOpen = "<motion";
const rightClose = "</div>";
const rightOpen = "<div";

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (full.endsWith(".tsx")) {
      const content = fs.readFileSync(full, "utf8");
      const next = content
        .replaceAll(wrongClose, rightClose)
        .replaceAll(`${wrongOpen} `, `${rightOpen} `)
        .replaceAll(`${wrongOpen}>`, `${rightOpen}>`);
      if (next !== content) fs.writeFileSync(full, next);
    }
  }
}

walk("src");

```

---

### `scripts/generate-code-reference.mjs`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `scripts/generate-code-reference.mjs` |
| **레이어** | Scripts |
| **역할** | 개발/검증/시드 스크립트 |

```javascript
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "PROJECT_CODE_REFERENCE.md");

const INCLUDE_DIRS = ["src", "prisma", "scripts", "public"];
const INCLUDE_ROOT = [
  "next.config.ts",
  "instrumentation.ts",
  "package.json",
  "tsconfig.json",
].filter((f) => fs.existsSync(path.join(ROOT, f)));

const EXT = new Set([".ts", ".tsx", ".css", ".mjs", ".json", ".svg", ".prisma"]);

function describe(file) {
  const p = file.replace(/\\/g, "/");

  if (p === "src/middleware.ts") {
    return { layer: "미들웨어", role: "요청 가로채기 · 인증 · 뷰모드 처리" };
  }
  if (p === "src/auth.ts") {
    return { layer: "인증", role: "NextAuth v5 진입점 · 세션/프로바이더 설정" };
  }
  if (p === "src/auth.config.ts") {
    return { layer: "인증", role: "NextAuth 설정 분리" };
  }
  if (p.startsWith("src/app/api/")) {
    return { layer: "API Route", role: "HTTP API 엔드포인트 (Route Handler)" };
  }
  if (/src\/app\/[^/]+\/page\.tsx$/.test(p)) {
    return { layer: "App Router 페이지", role: "URL 페이지 컴포넌트 (Server/Client)" };
  }
  if (p === "src/app/layout.tsx") {
    return { layer: "App Router 루트", role: "전역 레이아웃 · 폰트 · 메타데이터" };
  }
  if (p === "src/app/globals.css") {
    return { layer: "전역 스타일", role: "디자인 토큰 · 홈 UI · 공통 CSS" };
  }
  if (p.startsWith("src/features/") && p.includes("/components/")) {
    return { layer: "Feature UI", role: "기능별 React 컴포넌트 (프레젠테이션)" };
  }
  if (p.startsWith("src/features/") && p.includes("/server/")) {
    return { layer: "Feature Server", role: "기능별 서버 로직 · DB · 비즈니스 규칙" };
  }
  if (p.startsWith("src/features/") && p.includes("/lib/")) {
    return { layer: "Feature Lib", role: "기능별 유틸 · 필터 · 매핑" };
  }
  if (p.startsWith("src/features/") && p.includes("/data/")) {
    return { layer: "Feature Data", role: "정적 데이터 · 목업 · 시드" };
  }
  if (p.endsWith("/index.ts") && p.startsWith("src/features/")) {
    return { layer: "Feature Barrel", role: "기능 모듈 public export" };
  }
  if (p.startsWith("src/server/")) {
    return { layer: "Shared Server", role: "외부 API 어댑터 · 공통 서버 유틸" };
  }
  if (p.startsWith("src/shared/ui/")) {
    return { layer: "Shared UI", role: "재사용 UI 컴포넌트" };
  }
  if (p.startsWith("src/shared/layout/")) {
    return { layer: "Shared Layout", role: "헤더 · 푸터 · 사이드바 · 셸" };
  }
  if (p.startsWith("src/shared/lib/")) {
    return { layer: "Shared Lib", role: "상수 · 공통 유틸" };
  }
  if (p.startsWith("src/shared/hooks/")) {
    return { layer: "Shared Hook", role: "공통 React 훅" };
  }
  if (p.startsWith("src/shared/providers")) {
    return { layer: "Shared Provider", role: "React Context/Provider 래퍼" };
  }
  if (p.startsWith("src/types/")) {
    return { layer: "Types", role: "전역 TypeScript 타입 확장" };
  }
  if (p.startsWith("prisma/")) {
    return { layer: "Database", role: "Prisma 스키마 · DB 모델" };
  }
  if (p.startsWith("scripts/")) {
    return { layer: "Scripts", role: "개발/검증/시드 스크립트" };
  }
  if (p.startsWith("public/")) {
    return { layer: "Static", role: "정적 에셋" };
  }
  return { layer: "기타", role: "프로젝트 설정 · 보조 파일" };
}

function walk(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const rel = path.relative(ROOT, full).replace(/\\/g, "/");
    if (name === "node_modules" || name === ".next" || name === ".git") continue;
    const st = fs.statSync(full);
    if (st.isDirectory()) walk(full, acc);
    else if (EXT.has(path.extname(name))) acc.push(rel);
  }
  return acc;
}

function langFor(file) {
  const ext = path.extname(file).slice(1);
  if (ext === "tsx") return "tsx";
  if (ext === "ts") return "typescript";
  if (ext === "css") return "css";
  if (ext === "prisma") return "prisma";
  if (ext === "json") return "json";
  if (ext === "svg") return "xml";
  return "javascript";
}

let files = [];
for (const d of INCLUDE_DIRS) walk(path.join(ROOT, d), files);
files.push(...INCLUDE_ROOT);
files = [...new Set(files)].sort((a, b) => a.localeCompare(b));

const lines = [];
lines.push("# NOW MEET GO · 나믿고 — 전체 코드 레퍼런스");
lines.push("");
lines.push("> 프로젝트 전체 소스 + 파일별 구조/경로/모듈화 설명");
lines.push(`> 생성: \`node scripts/generate-code-reference.mjs\` · ${new Date().toISOString()}`);
lines.push("");
lines.push("---");
lines.push("");
lines.push("## 1. 모듈 구조 요약");
lines.push("");
lines.push("``\`text");
lines.push("japan-travel-planner/");
lines.push("├── src/");
lines.push("│   ├── app/                 # Next.js App Router (페이지 + API Route)");
lines.push("│   │   ├── api/             # REST API");
lines.push("│   │   ├── */page.tsx       # URL 페이지");
lines.push("│   │   ├── layout.tsx       # 전역 레이아웃");
lines.push("│   │   └── globals.css      # 전역 스타일");
lines.push("│   ├── features/            # 기능 단위 (UI + server + lib)");
lines.push("│   │   ├── auth/ home/ attractions/ restaurants/ stays/");
lines.push("│   │   ├── planner/ trips/ itinerary/ checklist/ budget/");
lines.push("│   │   ├── chat/ notifications/ profile/");
lines.push("│   ├── server/              # Google·Rakuten·DeepL·AI·Email");
lines.push("│   ├── shared/              # ui / layout / lib / hooks");
lines.push("│   ├── auth.ts              # NextAuth");
lines.push("│   └── middleware.ts");
lines.push("├── prisma/schema.prisma");
lines.push("└── scripts/");
lines.push("``\`");
lines.push("");
lines.push("### 레이어 규칙");
lines.push("- **페이지** (`app/*/page.tsx`) → Feature 컴포넌트 조합");
lines.push("- **API Route** (`app/api/*`) → Feature server 또는 `server/*` 호출");
lines.push("- **Feature** = 한 도메인의 UI + server + lib (응집도 높은 모듈)");
lines.push("- **Shared** = 여러 Feature가 공유하는 UI/유틸");
lines.push("- **Server** = 외부 API 어댑터 (기능 간 재사용)");
lines.push("");
lines.push("---");
lines.push("");
lines.push(`## 2. 파일 인덱스 (${files.length}개)`);
lines.push("");

for (const f of files) {
  const d = describe(f);
  lines.push(`- \`${f}\` — **${d.layer}**: ${d.role}`);
}

lines.push("");
lines.push("---");
lines.push("");
lines.push("## 3. 전체 소스 코드 (파일별)");
lines.push("");

let totalLines = 0;
for (const f of files) {
  const full = path.join(ROOT, f);
  let content;
  try {
    content = fs.readFileSync(full, "utf8");
  } catch {
    continue;
  }

  const d = describe(f);
  const lang = langFor(f);
  totalLines += content.split("\n").length;

  lines.push(`### \`${f}\``);
  lines.push("");
  lines.push("| 항목 | 내용 |");
  lines.push("|------|------|");
  lines.push(`| **파일 경로** | \`${f}\` |`);
  lines.push(`| **레이어** | ${d.layer} |`);
  lines.push(`| **역할** | ${d.role} |`);

  if (f.startsWith("src/features/")) {
    const feat = f.split("/")[2];
    lines.push(`| **기능 모듈** | \`features/${feat}\` |`);
  }
  if (f.startsWith("src/app/api/")) {
    const route = f.replace("src/app/api/", "").replace("/route.ts", "");
    lines.push(`| **API 경로** | \`/api/${route}\` |`);
  }

  lines.push("");
  lines.push(`\`\`\`${lang}`);
  lines.push(content.replace(/``\`/g, "``\\`"));
  lines.push("``\`");
  lines.push("");
  lines.push("---");
  lines.push("");
}

fs.writeFileSync(OUT, lines.join("\n"), "utf8");
console.log(`Written: ${OUT}`);
console.log(`Files: ${files.length}, Source lines: ~${totalLines}`);
console.log(`Size: ${Math.round(fs.statSync(OUT).size / 1024)} KB`);

```

---

### `scripts/kakao-cron-local.mjs`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `scripts/kakao-cron-local.mjs` |
| **레이어** | Scripts |
| **역할** | 개발/검증/시드 스크립트 |

```javascript
/**
 * 로컬 개발용: 매 분 카카오 일정 cron API 호출
 * dev 서버(start.bat)가 켜져 있어야 합니다.
 * start.bat 이 CRON_SECRET 이 있으면 이 스크립트를 백그라운드로 함께 실행합니다.
 *
 * 수동: npm run cron:local
 */
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const envPath = resolve(root, ".env");

function readEnvFile(path) {
  if (!existsSync(path)) return {};
  const vars = {};
  for (const line of readFileSync(path, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    vars[key] = val;
  }
  return vars;
}

const fileVars = readEnvFile(envPath);
const secret = process.env.CRON_SECRET || fileVars.CRON_SECRET;
const baseUrl =
  process.env.CRON_BASE_URL ||
  process.env.AUTH_URL ||
  fileVars.AUTH_URL ||
  "http://localhost:3000";

if (!secret || secret.includes("원하는_긴_랜덤")) {
  console.error("\n[오류] .env 에 CRON_SECRET 을 실제 랜덤 문자열로 설정하세요.");
  console.error("       예: PowerShell");
  console.error('       [Convert]::ToBase64String((1..32|%{Get-Random -Max 256}))\n');
  process.exit(1);
}

async function tick() {
  const kstNow = new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });
  try {
    const res = await fetch(`${baseUrl.replace(/\/$/, "")}/api/cron/kakao-schedule`, {
      headers: { Authorization: `Bearer ${secret}` },
    });
    const body = await res.json().catch(() => ({}));
    if (res.status === 403) {
      console.error(`[${kstNow}] 403 Forbidden — CRON_SECRET 이 서버 .env 와 다릅니다. dev 서버 재시작 후 다시 시도.`);
      return;
    }
    const line = `[${kstNow}] ${res.status} time=${body.time ?? "?"} sent=${body.sent ?? 0}`;
    if (body.sent > 0) {
      console.log(`${line} ✓ 발송됨`);
    } else if (body.errors?.length) {
      console.log(`${line} errors=${JSON.stringify(body.errors)}`);
    } else {
      console.log(`${line} (대기 — 설정 시간·알림 ON 일치 시 sent=1)`);
    }
  } catch (e) {
    console.error(
      `[${kstNow}] 연결 실패 — ${baseUrl} 에 dev 서버가 켜져 있는지 확인 (start.bat)`,
    );
    if (e instanceof Error) console.error(`  ${e.message}`);
  }
}

console.log("\n========================================");
console.log("  카카오 일정 알림 — 로컬 Cron (1분마다)");
console.log("========================================");
console.log(`  대상: ${baseUrl}/api/cron/kakao-schedule`);
console.log("  종료: Ctrl+C");
console.log("  설정 시간(한국)에 맞춰 자동 발송됩니다.\n");

await tick();
setInterval(tick, 60_000);

```

---

### `scripts/list-users-auth.mjs`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `scripts/list-users-auth.mjs` |
| **레이어** | Scripts |
| **역할** | 개발/검증/시드 스크립트 |

```javascript
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const users = await prisma.user.findMany({
  select: { email: true, passwordHash: true, accounts: { select: { provider: true } } },
  take: 20,
});

console.log("\n=== 가입 계정 (비밀번호 재설정 가능 여부) ===\n");
for (const u of users) {
  const providers = u.accounts.map((a) => a.provider).join(", ") || "(없음)";
  console.log({
    email: u.email,
    passwordSignup: Boolean(u.passwordHash),
    providers,
  });
}

await prisma.$disconnect();

```

---

### `scripts/seed-fukuoka-trip.mjs`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `scripts/seed-fukuoka-trip.mjs` |
| **레이어** | Scripts |
| **역할** | 개발/검증/시드 스크립트 |

```javascript
/**
 * 후쿠오카 더미 일정을 로그인 사용자(또는 첫 번째 사용자) DB에 추가
 * 사용: npm run seed:fukuoka
 * 특정 이메일: SEED_USER_EMAIL=you@example.com npm run seed:fukuoka
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { PrismaClient } from "@prisma/client";
import { addDays, startOfDay } from "date-fns";

const prisma = new PrismaClient();

const dataPath = resolve(import.meta.dirname, "../data/dummy/fukuoka-trip.json");
const template = JSON.parse(readFileSync(dataPath, "utf8"));

async function main() {
  const email = process.env.SEED_USER_EMAIL?.trim();
  const user = email
    ? await prisma.user.findUnique({ where: { email } })
    : await prisma.user.findFirst({ orderBy: { createdAt: "desc" } });

  if (!user) {
    console.error("\n[오류] 사용자가 없습니다. 먼저 회원가입 또는 구글/카카오 로그인하세요.\n");
    process.exit(1);
  }

  const today = startOfDay(new Date());
  const endDate = addDays(today, template.days.length - 1);

  const existing = await prisma.trip.findFirst({
    where: { userId: user.id, title: template.title },
  });
  if (existing) {
    console.log(`\n[안내] 이미 같은 일정이 있습니다: /trips/${existing.id}\n`);
    process.exit(0);
  }

  const trip = await prisma.trip.create({
    data: {
      userId: user.id,
      title: template.title,
      region: template.region,
      startDate: today,
      endDate: endDate,
      totalBudget: template.totalBudgetKrw,
      days: {
        create: template.days.map((day) => ({
          dayIndex: day.dayIndex,
          date: addDays(today, day.dayIndex),
          items: {
            create: day.items.map((item, i) => ({
              sortOrder: i,
              placeName: item.placeName,
              startTime: item.startTime ?? null,
              endTime: item.endTime ?? null,
              transport: item.transport ?? null,
              notes: item.notes ?? null,
            })),
          },
        })),
      },
    },
    include: { days: { include: { items: true } } },
  });

  console.log("\n[완료] 후쿠오카 더미 일정이 추가되었습니다.");
  console.log(`       사용자: ${user.email ?? user.name ?? user.id}`);
  console.log(`       제목: ${trip.title}`);
  console.log(`       기간: ${today.toISOString().slice(0, 10)} ~ ${endDate.toISOString().slice(0, 10)}`);
  console.log(`       보기: http://localhost:3000/trips/${trip.id}`);
  console.log(`       (오늘 일정 ${trip.days.find((d) => d.dayIndex === 0)?.items.length ?? 0}개 — 카카오 알림 테스트 가능)\n`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

```

---

### `scripts/test-resend-send.mjs`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `scripts/test-resend-send.mjs` |
| **레이어** | Scripts |
| **역할** | 개발/검증/시드 스크립트 |

```javascript
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const to = process.argv[2];

function readEnvFile(path) {
  if (!existsSync(path)) return {};
  const vars = {};
  for (const line of readFileSync(path, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    vars[key] = val;
  }
  return vars;
}

const vars = readEnvFile(resolve(root, ".env"));
const apiKey = vars.RESEND_API_KEY?.trim();
const from = vars.EMAIL_FROM?.trim() ?? "MY TRIP <onboarding@resend.dev>";

if (!apiKey) {
  console.error("RESEND_API_KEY 없음");
  process.exit(1);
}
if (!to) {
  console.error("사용법: node scripts/test-resend-send.mjs <받을이메일>");
  process.exit(1);
}

console.log("발신:", from);
console.log("수신:", to);

const res = await fetch("https://api.resend.com/emails", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    from,
    to: [to],
    subject: "[MY TRIP] 발송 테스트",
    html: "<p>Resend 테스트 메일입니다.</p>",
  }),
});

const text = await res.text();
console.log("status:", res.status);
console.log(text);

```

---

### `scripts/update-imports.mjs`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `scripts/update-imports.mjs` |
| **레이어** | Scripts |
| **역할** | 개발/검증/시드 스크립트 |

```javascript
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const root = join(import.meta.dirname, "..", "src");

const replacements = [
  [/@\/components\/ui\//g, "@/shared/ui/"],
  [/@\/components\/layout\//g, "@/shared/layout/"],
  [/"@\/components\/providers"/g, '"@/shared/providers"'],
  [/@\/components\/auth\//g, "@/features/auth/components/"],
  [/@\/components\/chat\//g, "@/features/chat/components/"],
  [/@\/components\/trips\//g, "@/features/trips/components/"],
  [/@\/components\/stays\//g, "@/features/stays/components/"],
  [/@\/components\/attractions\//g, "@/features/attractions/components/"],
  [/@\/components\/restaurants\//g, "@/features/restaurants/components/"],
  [/@\/components\/budget\//g, "@/features/budget/components/"],
  [/@\/components\/checklist\//g, "@/features/checklist/components/"],
  [/@\/components\/planner\//g, "@/features/planner/components/"],
  [/@\/components\/home\//g, "@/features/home/components/"],
  [/@\/components\/profile\//g, "@/features/profile/components/"],
  [/@\/components\/settings\//g, "@/features/notifications/components/"],
  [/@\/lib\/prisma/g, "@/server/db/prisma"],
  [/@\/lib\/ai\//g, "@/server/ai/"],
  [/@\/lib\/kakao\//g, "@/features/notifications/server/kakao/"],
  [/@\/lib\/notifications\//g, "@/features/notifications/server/"],
  [/@\/lib\/time\/kst/g, "@/features/notifications/server/time/kst"],
  [/@\/lib\/attractions\//g, "@/features/attractions/server/"],
  [/@\/lib\/constants/g, "@/shared/lib/constants"],
  [/@\/lib\/trip-dates/g, "@/shared/lib/trip-dates"],
  [/@\/lib\/view-mode-server/g, "@/shared/lib/view-mode-server"],
  [/@\/lib\/view-mode/g, "@/shared/lib/view-mode"],
  [/@\/lib\/resolve-view-mode/g, "@/shared/lib/resolve-view-mode"],
  [/@\/lib\/device/g, "@/shared/lib/device"],
  [/@\/lib\/shortcut-groups/g, "@/shared/lib/shortcut-groups"],
  [/@\/lib\/checklist-defaults/g, "@/features/checklist/server/checklist-defaults"],
  [/@\/lib\/exchange-rate/g, "@/features/budget/server/exchange-rate"],
  [/@\/lib\/home-data/g, "@/features/home/lib/home-data"],
  [/@\/lib\/social-providers/g, "@/features/auth/server/social-providers"],
  [/@\/hooks\//g, "@/shared/hooks/"],
];

function walk(dir, files = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) {
      if (name === "lib" && dir.endsWith("src")) continue;
      walk(p, files);
    } else if (/\.(tsx?|mts)$/.test(name)) files.push(p);
  }
  return files;
}

let count = 0;
for (const file of walk(root)) {
  let text = readFileSync(file, "utf8");
  const orig = text;
  for (const [from, to] of replacements) text = text.replace(from, to);
  if (text !== orig) {
    writeFileSync(file, text);
    count++;
  }
}
console.log("Updated", count, "files");

```

---

### `scripts/verify-deepl.mjs`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `scripts/verify-deepl.mjs` |
| **레이어** | Scripts |
| **역할** | 개발/검증/시드 스크립트 |

```javascript
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const envPath = resolve(root, ".env");

function readEnvFile(path) {
  if (!existsSync(path)) return {};
  const vars = {};
  for (const line of readFileSync(path, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    vars[key] = val;
  }
  return vars;
}

const vars = readEnvFile(envPath);
const apiKey = vars.DEEPL_API_KEY?.trim();

console.log("\n=== DeepL API 점검 ===\n");

if (!apiKey) {
  console.error("[오류] DEEPL_API_KEY 가 비어 있습니다.");
  console.error("       .env 에 발급받은 키를 넣은 뒤 다시 실행하세요.\n");
  process.exit(1);
}

console.log("[OK] DEEPL_API_KEY 설정됨 (길이:", apiKey.length + ")");
console.log(
  "[안내] 플랜:",
  apiKey.endsWith(":fx") ? "무료 API (api-free.deepl.com)" : "Pro API (api.deepl.com)",
);

const endpoint = apiKey.endsWith(":fx")
  ? "https://api-free.deepl.com/v2/translate"
  : "https://api.deepl.com/v2/translate";

const body = new URLSearchParams();
body.append("text", "東京タワー");
body.append("text", "Tokyo Skytree observation deck");
body.set("target_lang", "KO");

try {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `DeepL-Auth-Key ${apiKey}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
  });

  const text = await res.text();
  if (!res.ok) {
    console.error("\n[오류] DeepL API 호출 실패:", res.status);
    console.error(text.slice(0, 500));
    console.error("\n403/456: 키 오류 또는 할당량 초과");
    console.error("403: Pro 키를 무료 URL에 쓰거나 그 반대인 경우도 확인\n");
    process.exit(1);
  }

  const data = JSON.parse(text);
  const lines = data.translations?.map((t) => t.text) ?? [];
  console.log("\n[OK] 번역 테스트 성공 (일본어·영어 자동 감지)");
  console.log("     JA 입력: 東京タワー →", lines[0] ?? "(없음)");
  console.log("     EN 입력: Tokyo Skytree... →", lines[1] ?? "(없음)");
  console.log("\n서버 재시작 후 숙박 검색에서 한국어 표시를 확인하세요.\n");
} catch (err) {
  console.error("\n[오류] 네트워크 또는 파싱 실패:", err.message);
  process.exit(1);
}

```

---

### `scripts/verify-google-oauth.mjs`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `scripts/verify-google-oauth.mjs` |
| **레이어** | Scripts |
| **역할** | 개발/검증/시드 스크립트 |

```javascript
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const envPath = resolve(root, ".env");

function readEnvFile(path) {
  if (!existsSync(path)) return {};
  const vars = {};
  for (const line of readFileSync(path, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    vars[key] = val;
  }
  return vars;
}

const vars = readEnvFile(envPath);
const id = process.env.AUTH_GOOGLE_ID || vars.AUTH_GOOGLE_ID || "";
const secret = process.env.AUTH_GOOGLE_SECRET || vars.AUTH_GOOGLE_SECRET || "";

let ok = true;

console.log("\n=== Google OAuth .env 점검 ===\n");

if (!existsSync(envPath)) {
  console.error("[오류] .env 파일이 없습니다.");
  process.exit(1);
}

if (!id) {
  console.error("[오류] AUTH_GOOGLE_ID 가 비어 있습니다.");
  ok = false;
} else {
  const idOk = /^\d+-[a-z0-9]+\.apps\.googleusercontent\.com$/.test(id);
  console.log(
    idOk
      ? `[OK] Client ID 형식 (${id.slice(0, 12)}...${id.slice(-20)})`
      : `[경고] Client ID 형식이 이상합니다. Google Console에서 다시 복사하세요.`,
  );
  if (!idOk) ok = false;
}

if (!secret) {
  console.error("[오류] AUTH_GOOGLE_SECRET 이 비어 있습니다.");
  ok = false;
} else {
  const hasSpace = /\s/.test(secret);
  const secretOk = /^GOCSPX-[A-Za-z0-9_-]+$/.test(secret);
  if (hasSpace) {
    console.error("[오류] Secret 앞뒤에 공백/줄바꿈이 있습니다. 따옴표 안 공백을 제거하세요.");
    ok = false;
  } else if (!secretOk) {
    console.warn(
      "[경고] Secret 형식이 GOCSPX- 로 시작하지 않습니다. '클라이언트 보안 비밀번호'를 복사했는지 확인하세요.",
    );
  } else {
    console.log(`[OK] Secret 형식 (GOCSPX-..., 길이 ${secret.length}자)`);
  }
}

if (id && secret && id === secret) {
  console.error("[오류] ID와 Secret이 같습니다. Secret을 잘못 붙여넣었습니다.");
  ok = false;
}

const example = readEnvFile(resolve(root, ".env.example"));
if (
  example.AUTH_GOOGLE_ID &&
  example.AUTH_GOOGLE_SECRET &&
  id === example.AUTH_GOOGLE_ID &&
  secret === example.AUTH_GOOGLE_SECRET
) {
  console.error("[오류] .env.example 과 동일한 키입니다. 본인 Google Cloud 키로 교체하세요.");
  ok = false;
}

console.log(`
다음 단계 (invalid_client 해결):
1. https://console.cloud.google.com/apis/credentials
2. OAuth 클라이언트 ID 목록에서 위 Client ID와 "완전히 같은" 항목 클릭
3. "클라이언트 보안 비밀번호" → 비밀번호 만들기(또는 복사)
4. .env 의 AUTH_GOOGLE_SECRET 만 새 값으로 교체 후 저장
5. 승인된 리디렉션 URI: http://localhost:3000/api/auth/callback/google
6. npm run dev 완전 재시작

참고: invalid_client = Google이 ID+Secret 조합을 거부한 것입니다. DB/Neon 문제가 아닙니다.
`);

process.exit(ok ? 0 : 1);

```

---

### `scripts/verify-google-places.mjs`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `scripts/verify-google-places.mjs` |
| **레이어** | Scripts |
| **역할** | 개발/검증/시드 스크립트 |

```javascript
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const envPath = resolve(root, ".env");
const BASE = "https://places.googleapis.com/v1";

function readEnvFile(path) {
  if (!existsSync(path)) return {};
  const vars = {};
  for (const line of readFileSync(path, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    vars[key] = val;
  }
  return vars;
}

async function placesRequest(path, { method = "GET", body, fieldMask }) {
  const apiKey = readEnvFile(envPath).GOOGLE_PLACES_API_KEY?.trim();
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": fieldMask,
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let json = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    json = { raw: text };
  }
  return { ok: res.ok, status: res.status, json };
}

const apiKey = readEnvFile(envPath).GOOGLE_PLACES_API_KEY?.trim();

console.log("\n=== Google Places API 점검 ===\n");

if (!apiKey) {
  console.error("[오류] GOOGLE_PLACES_API_KEY 가 비어 있습니다.");
  process.exit(1);
}

console.log("[OK] GOOGLE_PLACES_API_KEY 설정됨 (길이:", apiKey.length + ")");

// 1) 맛집 nearby (도쿄역)
console.log("\n[1/3] 맛집 searchNearby (도쿄역)...");
const nearby = await placesRequest("/places:searchNearby", {
  method: "POST",
  fieldMask:
    "places.id,places.displayName,places.rating,places.userRatingCount,places.formattedAddress",
  body: {
    includedTypes: ["restaurant"],
    maxResultCount: 5,
    locationRestriction: {
      circle: {
        center: { latitude: 35.6812, longitude: 139.7671 },
        radius: 3000,
      },
    },
    languageCode: "ko",
  },
});

if (!nearby.ok) {
  console.error("[실패]", nearby.status, JSON.stringify(nearby.json, null, 2));
  process.exit(1);
}

const restaurants = nearby.json?.places ?? [];
console.log("[OK] 맛집", restaurants.length, "건 수신");
for (const p of restaurants.slice(0, 3)) {
  console.log(
    "  -",
    p.displayName?.text,
    "| 평점",
    p.rating ?? "-",
    "| 리뷰",
    p.userRatingCount ?? 0,
  );
}

// 2) 관광지 text search (오사카성)
console.log("\n[2/3] 관광지 searchText (오사카성)...");
const textSearch = await placesRequest("/places:searchText", {
  method: "POST",
  fieldMask: "places.id,places.displayName,places.location,places.rating,places.userRatingCount",
  body: {
    textQuery: "오사카성",
    maxResultCount: 1,
    languageCode: "ko",
    locationBias: {
      circle: {
        center: { latitude: 34.6873, longitude: 135.5262 },
        radius: 2000,
      },
    },
  },
});

if (!textSearch.ok) {
  console.error("[실패]", textSearch.status, JSON.stringify(textSearch.json, null, 2));
  process.exit(1);
}

const attraction = textSearch.json?.places?.[0];
if (!attraction?.id) {
  console.error("[실패] 관광지 검색 결과 없음");
  process.exit(1);
}

console.log(
  "[OK]",
  attraction.displayName?.text,
  "| placeId:",
  attraction.id.slice(0, 20) + "...",
  "| 평점",
  attraction.rating ?? "-",
);

// 3) 상세 + 리뷰
console.log("\n[3/3] Place Details + 리뷰...");
const details = await placesRequest(`/places/${attraction.id}`, {
  fieldMask: "id,displayName,rating,userRatingCount,reviews",
});

if (!details.ok) {
  console.error("[실패]", details.status, JSON.stringify(details.json, null, 2));
  process.exit(1);
}

const reviews = details.json?.reviews ?? [];
console.log("[OK] 리뷰", reviews.length, "건");
for (const r of reviews.slice(0, 2)) {
  const snippet = (r.text?.text ?? "").slice(0, 60).replace(/\s+/g, " ");
  console.log(
    "  -",
    r.authorAttribution?.displayName ?? "익명",
    "|",
    r.rating,
    "점 |",
    snippet + (snippet.length >= 60 ? "…" : ""),
  );
}

console.log("\n[완료] Google Places API 정상 동작합니다.\n");

```

---

### `scripts/verify-kakao-oauth.mjs`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `scripts/verify-kakao-oauth.mjs` |
| **레이어** | Scripts |
| **역할** | 개발/검증/시드 스크립트 |

```javascript
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const envPath = resolve(root, ".env");

function readEnvFile(path) {
  if (!existsSync(path)) return {};
  const vars = {};
  for (const line of readFileSync(path, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    vars[key] = val;
  }
  return vars;
}

const vars = readEnvFile(envPath);
const id = process.env.AUTH_KAKAO_ID || vars.AUTH_KAKAO_ID || "";
const secret = process.env.AUTH_KAKAO_SECRET || vars.AUTH_KAKAO_SECRET || "";

console.log("\n=== Kakao OAuth .env 점검 ===\n");

if (!existsSync(envPath)) {
  console.error("[오류] .env 파일이 없습니다.\n");
  process.exit(1);
}

let ok = true;

if (!id) {
  console.error("[오류] AUTH_KAKAO_ID 가 비어 있습니다. (REST API 키)");
  ok = false;
} else {
  console.log(`[OK] AUTH_KAKAO_ID (${id.slice(0, 8)}...)`);
}

if (!secret) {
  console.error("[오류] AUTH_KAKAO_SECRET 이 비어 있습니다. (카카오 로그인 > 보안 > Client Secret)");
  ok = false;
} else {
  console.log(`[OK] AUTH_KAKAO_SECRET (길이 ${secret.length}자)`);
}

console.log(`
카카오 개발자 콘솔 설정:
1. https://developers.kakao.com/console/app
2. 앱 선택 → 제품 설정 → 카카오 로그인 활성화
3. [앱] > [플랫폼 키] > REST API 키 > Redirect URI 에 아래를 "그대로" 등록
   http://localhost:3000/api/auth/callback/kakao
   ※ 끝이 kaka 가 아니라 kakao (알파벳 o) 입니다!
4. 사이트 도메인: http://localhost:3000
5. 동의 항목(필수): 닉네임, 프로필 사진, 카카오톡 메시지 전송(talk_message) — 활성화
6. 로그인 후 /settings/notifications 에서 「지금 카카오톡으로 테스트 발송」
7. .env
   AUTH_KAKAO_ID="REST API 키"
   AUTH_KAKAO_SECRET="Client Secret"
   CRON_SECRET="임의 문자열" (매일 자동 발송용)
`);

process.exit(ok ? 0 : 1);

```

---

### `scripts/verify-resend.mjs`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `scripts/verify-resend.mjs` |
| **레이어** | Scripts |
| **역할** | 개발/검증/시드 스크립트 |

```javascript
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const envPath = resolve(root, ".env");

function readEnvFile(path) {
  if (!existsSync(path)) return {};
  const vars = {};
  for (const line of readFileSync(path, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    vars[key] = val;
  }
  return vars;
}

const vars = readEnvFile(envPath);
const apiKey = vars.RESEND_API_KEY?.trim();
const emailFrom = vars.EMAIL_FROM?.trim() ?? "MY TRIP <onboarding@resend.dev>";

console.log("\n=== Resend API 점검 ===\n");

if (!apiKey) {
  console.error("[오류] RESEND_API_KEY 가 비어 있습니다.");
  console.error("       .env 외부 API 블록에 키를 넣은 뒤 다시 실행하세요.\n");
  process.exit(1);
}

console.log("[OK] RESEND_API_KEY 설정됨 (길이:", apiKey.length + ")");
console.log("[안내] 발신 주소:", emailFrom);

try {
  const res = await fetch("https://api.resend.com/domains", {
    headers: { Authorization: `Bearer ${apiKey}` },
  });
  const text = await res.text();

  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch {
    parsed = null;
  }

  if (parsed?.name === "restricted_api_key") {
    console.log("\n[OK] Resend API 키 인식됨 (메일 발송 전용 키)");
  } else if (res.status === 401 || res.status === 403) {
    console.error("\n[오류] API 키가 유효하지 않습니다:", res.status);
    console.error(text.slice(0, 300));
    process.exit(1);
  } else if (!res.ok) {
    console.error("\n[오류] Resend API 호출 실패:", res.status);
    console.error(text.slice(0, 300));
    process.exit(1);
  } else {
    const domainCount = parsed?.data?.length ?? 0;
    console.log("\n[OK] Resend API 키 인증 성공");
    console.log("     등록된 도메인 수:", domainCount);
  }
  console.log("\n[안내] onboarding@resend.dev 는 Resend 가입 이메일로만 테스트 발송 가능합니다.");
  console.log("       다른 주소로내려면 Resend에서 도메인 인증 후 EMAIL_FROM 을 변경하세요.");
  console.log("\n비밀번호 찾기: /forgot-password → 서버 재시작 후 테스트\n");
} catch (err) {
  console.error("\n[오류] 네트워크 실패:", err.message);
  process.exit(1);
}

```

---

### `src/app/api/ai/accommodations/route.ts`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/app/api/ai/accommodations/route.ts` |
| **레이어** | API Route |
| **역할** | HTTP API 엔드포인트 (Route Handler) |
| **API 경로** | `/api/ai/accommodations` |

```typescript
import { NextResponse } from "next/server";
import { applyStayFilters } from "@/features/stays/lib/apply-stay-filters";
import { searchStays } from "@/features/stays/server";
import {
  ensureCatalogWarm,
  getStaysForRegion,
} from "@/server/preload/catalog";
import type { JapanRegionId } from "@/shared/lib/constants";
import type {
  AccommodationAmenity,
  AccommodationType,
} from "@/server/ai/types";

const VALID_TYPES: AccommodationType[] = ["HOTEL", "RYOKAN", "GUESTHOUSE"];
const VALID_AMENITIES: AccommodationAmenity[] = [
  "WIFI",
  "BREAKFAST",
  "ONSEN",
  "KITCHEN",
  "PARKING",
  "AIRPORT_BUS",
  "FAMILY",
  "NON_SMOKING",
];

function parseList<T extends string>(value: string | null, allowed: T[]): T[] | undefined {
  if (!value) return undefined;
  const parts = value
    .split(",")
    .map((s) => s.trim().toUpperCase())
    .filter((s): s is T => (allowed as readonly string[]).includes(s));
  return parts.length ? parts : undefined;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const region = (searchParams.get("region") ?? "TOKYO") as JapanRegionId;
  const sortParam = searchParams.get("sort") ?? "recommended";
  const sort = (
    ["recommended", "price-asc", "price-desc", "rating-desc"].includes(sortParam)
      ? sortParam
      : "recommended"
  ) as "recommended" | "price-asc" | "price-desc" | "rating-desc";

  const req = {
    region,
    checkIn: searchParams.get("checkIn") ?? "",
    checkOut: searchParams.get("checkOut") ?? "",
    guests: Number(searchParams.get("guests") ?? 2),
    budgetKrw: Number(searchParams.get("budgetKrw") ?? 200000),
    types: parseList(searchParams.get("types"), VALID_TYPES),
    amenities: parseList(searchParams.get("amenities"), VALID_AMENITIES),
    area: searchParams.get("area") ?? undefined,
    sort,
  };

  const usePreload =
    searchParams.get("preload") === "1" ||
    (!req.checkIn && !req.checkOut && searchParams.get("live") !== "1");

  if (usePreload) {
    await ensureCatalogWarm();
    const cached = getStaysForRegion(region);
    if (cached?.items.length) {
      const pool = cached.items;
      return NextResponse.json(applyStayFilters(pool, req));
    }
  }

  const result = await searchStays(req);
  return NextResponse.json(result);
}

```

---

### `src/app/api/ai/attractions/route.ts`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/app/api/ai/attractions/route.ts` |
| **레이어** | API Route |
| **역할** | HTTP API 엔드포인트 (Route Handler) |
| **API 경로** | `/api/ai/attractions` |

```typescript
import { NextResponse } from "next/server";
import { getAttractionsByRegion } from "@/features/attractions/server";
import {
  ensureCatalogWarm,
  getAttractionsForRegion,
} from "@/server/preload/catalog";
import type { JapanRegionId } from "@/shared/lib/constants";

export const revalidate = 3600;

export async function GET(req: Request) {
  const region = (new URL(req.url).searchParams.get("region") ?? "TOKYO") as JapanRegionId;
  await ensureCatalogWarm();
  const attractions =
    getAttractionsForRegion(region) ?? (await getAttractionsByRegion(region));
  return NextResponse.json({ attractions, items: attractions });
}

```

---

### `src/app/api/ai/chat/route.ts`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/app/api/ai/chat/route.ts` |
| **레이어** | API Route |
| **역할** | HTTP API 엔드포인트 (Route Handler) |
| **API 경로** | `/api/ai/chat` |

```typescript
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { aiAdapter } from "@/server/ai/adapter";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const result = await aiAdapter.chat(body);
  return NextResponse.json(result);
}

```

---

### `src/app/api/ai/itinerary/route.ts`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/app/api/ai/itinerary/route.ts` |
| **레이어** | API Route |
| **역할** | HTTP API 엔드포인트 (Route Handler) |
| **API 경로** | `/api/ai/itinerary` |

```typescript
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { aiAdapter } from "@/server/ai/adapter";
import type { ItineraryGenerateRequest } from "@/server/ai/types";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json()) as ItineraryGenerateRequest;
  const result = await aiAdapter.generateItinerary(body);
  return NextResponse.json(result);
}

```

---

### `src/app/api/ai/restaurants/route.ts`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/app/api/ai/restaurants/route.ts` |
| **레이어** | API Route |
| **역할** | HTTP API 엔드포인트 (Route Handler) |
| **API 경로** | `/api/ai/restaurants` |

```typescript
import { NextResponse } from "next/server";
import { searchRestaurants } from "@/features/restaurants/server";
import type { JapanRegionId } from "@/shared/lib/constants";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const region = (searchParams.get("region") ?? "TOKYO") as JapanRegionId;

  const items = await searchRestaurants({
    region,
    maxBudgetKrw: Number(searchParams.get("maxBudgetKrw") ?? 30000),
    maxDistanceKm: Number(searchParams.get("maxDistanceKm") ?? 2),
    minRating: Number(searchParams.get("minRating") ?? 4),
  });

  return NextResponse.json({ items });
}

```

---

### `src/app/api/auth/[...nextauth]/route.ts`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/app/api/auth/[...nextauth]/route.ts` |
| **레이어** | API Route |
| **역할** | HTTP API 엔드포인트 (Route Handler) |
| **API 경로** | `/api/auth/[...nextauth]` |

```typescript
import { handlers } from "@/auth";

export const { GET, POST } = handlers;

```

---

### `src/app/api/auth/forgot-password/route.ts`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/app/api/auth/forgot-password/route.ts` |
| **레이어** | API Route |
| **역할** | HTTP API 엔드포인트 (Route Handler) |
| **API 경로** | `/api/auth/forgot-password` |

```typescript
import { NextResponse } from "next/server";
import { z } from "zod";
import { requestPasswordReset } from "@/features/auth/server/password-reset";
import { isEmailConfigured, ResendTestModeError } from "@/server/email/send-email";

const schema = z.object({
  email: z.string().email("올바른 이메일을 입력해 주세요."),
});

const GENERIC_MESSAGE =
  "등록된 이메일이면 비밀번호 재설정 링크를 보냈습니다. 메일함과 스팸함을 확인해 주세요.";

const OAUTH_MESSAGE =
  "이 이메일은 Google·카카오 등 소셜 로그인으로 가입된 계정입니다. 비밀번호 재설정 대신 해당 방법으로 로그인해 주세요.";

const DEV_FALLBACK_MESSAGE =
  "테스트 메일 서버 제한으로 이메일은 보내지 못했습니다. 아래 재설정 링크를 사용해 주세요.";

export async function POST(req: Request) {
  try {
    if (!isEmailConfigured()) {
      return NextResponse.json(
        {
          error:
            "메일 발송이 설정되지 않았습니다. RESEND_API_KEY를 설정하거나 개발 환경에서 서버 콘솔의 링크를 확인하세요.",
        },
        { status: 503 },
      );
    }

    const body = schema.parse(await req.json());
    const result = await requestPasswordReset(body.email);

    if (result.status === "skipped_oauth") {
      return NextResponse.json({ ok: true, message: OAUTH_MESSAGE, kind: "oauth" });
    }

    if (result.status === "dev_fallback") {
      return NextResponse.json({
        ok: true,
        message: DEV_FALLBACK_MESSAGE,
        kind: "dev_fallback",
        resetUrl: result.resetUrl,
      });
    }

    return NextResponse.json({ ok: true, message: GENERIC_MESSAGE, kind: "sent" });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ error: e.errors[0]?.message }, { status: 400 });
    }
    if (e instanceof ResendTestModeError) {
      return NextResponse.json({ error: e.message }, { status: 503 });
    }
    console.error("[forgot-password]", e);
    return NextResponse.json(
      { error: "요청 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요." },
      { status: 500 },
    );
  }
}

```

---

### `src/app/api/auth/register/route.ts`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/app/api/auth/register/route.ts` |
| **레이어** | API Route |
| **역할** | HTTP API 엔드포인트 (Route Handler) |
| **API 경로** | `/api/auth/register` |

```typescript
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/server/db/prisma";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "비밀번호는 8자 이상이어야 합니다."),
  name: z.string().min(1).optional(),
});

export async function POST(req: Request) {
  try {
    const body = schema.parse(await req.json());
    const exists = await prisma.user.findUnique({ where: { email: body.email } });
    if (exists) {
      return NextResponse.json({ error: "이미 가입된 이메일입니다." }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(body.password, 12);
    await prisma.user.create({
      data: {
        email: body.email,
        name: body.name,
        passwordHash,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ error: e.errors[0]?.message }, { status: 400 });
    }
    return NextResponse.json({ error: "회원가입 처리 중 오류가 발생했습니다." }, { status: 500 });
  }
}

```

---

### `src/app/api/auth/reset-password/route.ts`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/app/api/auth/reset-password/route.ts` |
| **레이어** | API Route |
| **역할** | HTTP API 엔드포인트 (Route Handler) |
| **API 경로** | `/api/auth/reset-password` |

```typescript
import { NextResponse } from "next/server";
import { z } from "zod";
import { resetPasswordWithToken } from "@/features/auth/server/password-reset";

const schema = z.object({
  token: z.string().min(1),
  password: z.string().min(8, "비밀번호는 8자 이상이어야 합니다."),
});

export async function POST(req: Request) {
  try {
    const body = schema.parse(await req.json());
    const result = await resetPasswordWithToken(body.token, body.password);
    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ error: e.errors[0]?.message }, { status: 400 });
    }
    return NextResponse.json({ error: "비밀번호 변경에 실패했습니다." }, { status: 500 });
  }
}

```

---

### `src/app/api/budget/rate/route.ts`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/app/api/budget/rate/route.ts` |
| **레이어** | API Route |
| **역할** | HTTP API 엔드포인트 (Route Handler) |
| **API 경로** | `/api/budget/rate` |

```typescript
import { NextResponse } from "next/server";
import { fetchExchangeRate } from "@/features/budget/server/exchange-rate";

export async function GET() {
  const rate = await fetchExchangeRate();
  return NextResponse.json(rate);
}

```

---

### `src/app/api/budget/route.ts`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/app/api/budget/route.ts` |
| **레이어** | API Route |
| **역할** | HTTP API 엔드포인트 (Route Handler) |
| **API 경로** | `/api/budget` |

```typescript
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/server/db/prisma";

function tripBudgetWhere(userId: string, tripId: string | null | undefined) {
  return tripId
    ? { userId, tripId }
    : { userId, tripId: null };
}

export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const tripId = new URL(req.url).searchParams.get("tripId");

  const budget = tripId
    ? await prisma.budget.findFirst({
        where: tripBudgetWhere(session.user.id, tripId),
        include: { allocations: true },
        orderBy: { updatedAt: "desc" },
      })
    : await prisma.budget.findFirst({
        where: { userId: session.user.id },
        include: { allocations: true },
        orderBy: { updatedAt: "desc" },
      });

  const expenseWhere = tripId
    ? { userId: session.user.id, tripId }
    : { userId: session.user.id };

  const expenses = await prisma.expenseEntry.findMany({
    where: expenseWhere,
    orderBy: { spentAt: "desc" },
    take: 50,
  });

  return NextResponse.json({
    tripId: budget?.tripId ?? tripId ?? null,
    totalKrw: budget?.totalKrw ?? 0,
    allocations: budget?.allocations.map((a) => ({
      category: a.category,
      amountKrw: a.amountKrw,
    })) ?? [],
    expenses: expenses.map((e) => ({
      category: e.category,
      amountKrw: e.amountKrw,
      description: e.description,
    })),
  });
}

export async function PUT(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { totalKrw, allocations, expenses, tripId } = await req.json();

  if (!tripId) {
    return NextResponse.json({ error: "tripId가 필요합니다." }, { status: 400 });
  }

  const trip = await prisma.trip.findFirst({
    where: { id: tripId, userId: session.user.id },
  });
  if (!trip) {
    return NextResponse.json({ error: "여행을 찾을 수 없습니다." }, { status: 404 });
  }

  let budget = await prisma.budget.findFirst({
    where: tripBudgetWhere(session.user.id, tripId),
  });

  if (!budget) {
    budget = await prisma.budget.create({
      data: { userId: session.user.id, tripId, totalKrw },
    });
  } else {
    budget = await prisma.budget.update({
      where: { id: budget.id },
      data: { totalKrw, tripId },
    });
  }

  await prisma.trip.update({
    where: { id: tripId },
    data: { totalBudget: totalKrw },
  });

  await prisma.budgetAllocation.deleteMany({ where: { budgetId: budget.id } });
  if (allocations?.length) {
    await prisma.budgetAllocation.createMany({
      data: allocations.map((a: { category: string; amountKrw: number }) => ({
        budgetId: budget!.id,
        category: a.category,
        amountKrw: a.amountKrw,
      })),
    });
  }

  await prisma.expenseEntry.deleteMany({
    where: { userId: session.user.id, tripId },
  });

  if (expenses?.length) {
    await prisma.expenseEntry.createMany({
      data: expenses.map((e: { category: string; amountKrw: number; description?: string }) => ({
        userId: session.user!.id,
        tripId,
        category: e.category,
        amountKrw: e.amountKrw,
        description: e.description,
      })),
    });
  }

  return NextResponse.json({ ok: true, tripId });
}

```

---

### `src/app/api/budget/suggest/route.ts`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/app/api/budget/suggest/route.ts` |
| **레이어** | API Route |
| **역할** | HTTP API 엔드포인트 (Route Handler) |
| **API 경로** | `/api/budget/suggest` |

```typescript
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/server/db/prisma";
import { suggestAllocationsFromTrip } from "@/features/budget/server/trip-budget-suggest";

const DEFAULT_RATIOS = [
  { category: "ACCOMMODATION", ratio: 0.35 },
  { category: "TRANSPORT", ratio: 0.2 },
  { category: "FOOD", ratio: 0.25 },
  { category: "SIGHTSEEING", ratio: 0.15 },
  { category: "OTHER", ratio: 0.05 },
] as const;

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { totalKrw, tripId } = await req.json();
  const total = Number(totalKrw) || 0;

  if (tripId) {
    const trip = await prisma.trip.findFirst({
      where: { id: tripId, userId: session.user.id },
      include: {
        days: {
          orderBy: { dayIndex: "asc" },
          include: {
            items: {
              select: { placeName: true, transport: true, notes: true },
            },
          },
        },
      },
    });

    if (!trip) {
      return NextResponse.json({ error: "여행을 찾을 수 없습니다." }, { status: 404 });
    }

    const suggestedTotal = trip.totalBudget && trip.totalBudget > 0 ? trip.totalBudget : total;
    const allocations = suggestAllocationsFromTrip(
      {
        region: trip.region,
        totalBudget: trip.totalBudget,
        days: trip.days,
      },
      suggestedTotal,
    );

    return NextResponse.json({
      source: "trip",
      totalKrw: suggestedTotal,
      allocations,
      hint: `${trip.days.length}일 일정·${trip.days.reduce((n, d) => n + d.items.length, 0)}개 장소를 반영했습니다.`,
    });
  }

  const allocations = DEFAULT_RATIOS.map((r) => ({
    category: r.category,
    amountKrw: Math.round(total * r.ratio),
  }));

  return NextResponse.json({ source: "default", totalKrw: total, allocations });
}

```

---

### `src/app/api/chat/route.ts`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/app/api/chat/route.ts` |
| **레이어** | API Route |
| **역할** | HTTP API 엔드포인트 (Route Handler) |
| **API 경로** | `/api/chat` |

```typescript
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { sendChatMessage } from "@/features/chat/server";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { message, sessionId, region } = await req.json();
  const result = await sendChatMessage({
    userId: session.user.id,
    message,
    sessionId,
    region,
  });

  return NextResponse.json(result);
}

```

---

### `src/app/api/chat/sessions/route.ts`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/app/api/chat/sessions/route.ts` |
| **레이어** | API Route |
| **역할** | HTTP API 엔드포인트 (Route Handler) |
| **API 경로** | `/api/chat/sessions` |

```typescript
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getLatestChatSession } from "@/features/chat/server";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await getLatestChatSession(session.user.id);
  return NextResponse.json(data);
}

```

---

### `src/app/api/checklist/route.ts`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/app/api/checklist/route.ts` |
| **레이어** | API Route |
| **역할** | HTTP API 엔드포인트 (Route Handler) |
| **API 경로** | `/api/checklist` |

```typescript
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/server/db/prisma";
import { KOREA_TO_JAPAN_CHECKLIST } from "@/features/checklist/server/checklist-defaults";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const checklist = await prisma.checklist.findFirst({
    where: { userId: session.user.id },
    include: { items: { orderBy: { sortOrder: "asc" } } },
  });

  if (!checklist) return NextResponse.json({ items: [] });

  return NextResponse.json({
    items: checklist.items.map((it) => ({
      id: it.id,
      label: it.label,
      isChecked: it.isChecked,
      isDefault: it.isDefault,
    })),
  });
}

export async function PUT(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { items } = (await req.json()) as {
    items: { id: string; label: string; isChecked: boolean; isDefault: boolean }[];
  };

  let checklist = await prisma.checklist.findFirst({
    where: { userId: session.user.id },
  });

  if (!checklist) {
    checklist = await prisma.checklist.create({
      data: { userId: session.user.id },
    });
  }

  await prisma.checklistItem.deleteMany({ where: { checklistId: checklist.id } });
  await prisma.checklistItem.createMany({
    data: items.map((item, index) => ({
      checklistId: checklist!.id,
      label: item.label,
      isChecked: item.isChecked,
      isDefault: item.isDefault,
      sortOrder: index,
    })),
  });

  return NextResponse.json({ ok: true });
}

export async function POST() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const exists = await prisma.checklist.findFirst({ where: { userId: session.user.id } });
  if (exists) return NextResponse.json({ ok: true });

  const checklist = await prisma.checklist.create({
    data: {
      userId: session.user.id,
      items: {
        create: KOREA_TO_JAPAN_CHECKLIST.map((label, i) => ({
          label,
          isDefault: true,
          sortOrder: i,
        })),
      },
    },
  });

  return NextResponse.json({ id: checklist.id });
}

```

---

### `src/app/api/config/google-maps/route.ts`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/app/api/config/google-maps/route.ts` |
| **레이어** | API Route |
| **역할** | HTTP API 엔드포인트 (Route Handler) |
| **API 경로** | `/api/config/google-maps` |

```typescript
import { NextResponse } from "next/server";

/** 브라우저 Google Maps JS — Places 키와 동일 값 사용 가능 (Maps JavaScript API 활성화 필요) */
export async function GET() {
  const apiKey =
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY?.trim() ||
    process.env.GOOGLE_PLACES_API_KEY?.trim() ||
    process.env.GOOGLE_MAPS_API_KEY?.trim() ||
    null;

  return NextResponse.json({ apiKey });
}

```

---

### `src/app/api/cron/kakao-schedule/route.ts`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/app/api/cron/kakao-schedule/route.ts` |
| **레이어** | API Route |
| **역할** | HTTP API 엔드포인트 (Route Handler) |
| **API 경로** | `/api/cron/kakao-schedule` |

```typescript
import { NextResponse } from "next/server";
import { prisma } from "@/server/db/prisma";
import { sendKakaoScheduleMessage } from "@/features/notifications/server/kakao/message";
import { getKstDayRange, getKstTimeKey } from "@/features/notifications/server/time/kst";

function cronSecret() {
  const raw = process.env.CRON_SECRET?.trim();
  if (!raw) return "";
  if (
    (raw.startsWith('"') && raw.endsWith('"')) ||
    (raw.startsWith("'") && raw.endsWith("'"))
  ) {
    return raw.slice(1, -1);
  }
  return raw;
}

export async function GET(req: Request) {
  const secret = cronSecret();
  if (!secret) {
    return NextResponse.json({ error: "CRON_SECRET not configured" }, { status: 500 });
  }

  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const now = new Date();
  const timeKey = getKstTimeKey(now);
  const { dayStart, dayEnd, dateLabel } = getKstDayRange(now);

  const settings = await prisma.notificationSetting.findMany({
    where: { enabled: true, notifyTime: timeKey },
    include: {
      user: {
        include: {
          accounts: { where: { provider: "kakao" }, take: 1 },
          trips: {
            where: {
              startDate: { lte: dayEnd },
              endDate: { gte: dayStart },
            },
            include: {
              days: {
                where: { date: { gte: dayStart, lte: dayEnd } },
                include: { items: { orderBy: { sortOrder: "asc" } } },
                take: 1,
              },
            },
            orderBy: { startDate: "asc" },
            take: 1,
          },
        },
      },
    },
  });

  let sent = 0;
  const errors: string[] = [];

  for (const s of settings) {
    if (!s.user.accounts[0]) {
      errors.push(`${s.userId}: 카카오 계정 없음`);
      continue;
    }

    const day = s.user.trips[0]?.days[0];
    const items =
      day?.items.map((i) => ({
        placeName: i.placeName,
        startTime: i.startTime,
        transport: i.transport,
      })) ?? [];

    const result = await sendKakaoScheduleMessage({
      userId: s.userId,
      dateLabel,
      items,
    });

    if (result.ok) sent++;
    else errors.push(`${s.userId}: ${result.error ?? result.mode}`);
  }

  return NextResponse.json({ ok: true, sent, failed: errors.length, time: timeKey, errors });
}

```

---

### `src/app/api/notifications/preview/route.ts`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/app/api/notifications/preview/route.ts` |
| **레이어** | API Route |
| **역할** | HTTP API 엔드포인트 (Route Handler) |
| **API 경로** | `/api/notifications/preview` |

```typescript
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { formatScheduleMessage } from "@/features/notifications/server/kakao/schedule-message";
import { getTodayScheduleForUser } from "@/features/notifications/server/today-schedule";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const schedule = await getTodayScheduleForUser(session.user.id);
  const text = formatScheduleMessage(schedule.dateLabel, schedule.items);

  return NextResponse.json({ ...schedule, preview: text });
}

```

---

### `src/app/api/notifications/send-test/route.ts`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/app/api/notifications/send-test/route.ts` |
| **레이어** | API Route |
| **역할** | HTTP API 엔드포인트 (Route Handler) |
| **API 경로** | `/api/notifications/send-test` |

```typescript
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { sendKakaoScheduleMessage } from "@/features/notifications/server/kakao/message";
import { getTodayScheduleForUser } from "@/features/notifications/server/today-schedule";

/** 로그인 사용자에게 지금 카카오톡 테스트 발송 */
export async function POST() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const schedule = await getTodayScheduleForUser(session.user.id);
  const result = await sendKakaoScheduleMessage({
    userId: session.user.id,
    dateLabel: schedule.dateLabel,
    items: schedule.items,
  });

  if (!result.ok) {
    return NextResponse.json(
      { error: result.error ?? "발송 실패", preview: result.text },
      { status: 400 },
    );
  }

  return NextResponse.json({
    ok: true,
    message: "카카오톡으로 일정 메시지를 보냈습니다. (본인 카카오톡 나와의 채팅)",
    preview: result.text,
  });
}

```

---

### `src/app/api/notifications/settings/route.ts`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/app/api/notifications/settings/route.ts` |
| **레이어** | API Route |
| **역할** | HTTP API 엔드포인트 (Route Handler) |
| **API 경로** | `/api/notifications/settings` |

```typescript
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/server/db/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const setting = await prisma.notificationSetting.findUnique({
    where: { userId: session.user.id },
  });

  return NextResponse.json(
    setting ?? { enabled: true, notifyTime: "08:00", kakaoUserId: "" },
  );
}

export async function PUT(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { enabled, notifyTime, kakaoUserId } = await req.json();

  const setting = await prisma.notificationSetting.upsert({
    where: { userId: session.user.id },
    create: { userId: session.user.id, enabled, notifyTime, kakaoUserId },
    update: { enabled, notifyTime, kakaoUserId },
  });

  return NextResponse.json(setting);
}

```

---

### `src/app/api/trips/[id]/collaborators/route.ts`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/app/api/trips/[id]/collaborators/route.ts` |
| **레이어** | API Route |
| **역할** | HTTP API 엔드포인트 (Route Handler) |
| **API 경로** | `/api/trips/[id]/collaborators` |

```typescript
import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { assertTripOwner, getTripAccess } from "@/features/trips/server/trip-access";
import { prisma } from "@/server/db/prisma";
import type { CollaboratorRole } from "@prisma/client";

const inviteSchema = z.object({
  email: z.string().email("올바른 이메일을 입력해 주세요."),
  role: z.enum(["EDITOR", "VIEWER"]).default("EDITOR"),
});

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const access = await getTripAccess(session.user.id, id);
  if (!access) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({
    members: access.members.map((m) => ({
      ...m,
      invitedAt: m.invitedAt.toISOString(),
    })),
    role: access.role,
    canManageCollaborators: access.canManageCollaborators,
    canEdit: access.canEdit,
  });
}

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id: tripId } = await params;
  const isOwner = await assertTripOwner(session.user.id, tripId);
  if (!isOwner) return NextResponse.json({ error: "일정 소유자만 초대할 수 있습니다." }, { status: 403 });

  try {
    const body = inviteSchema.parse(await req.json());
    const normalized = body.email.trim().toLowerCase();

    const invitee = await prisma.user.findFirst({
      where: { email: { equals: normalized, mode: "insensitive" } },
      select: { id: true, email: true, name: true },
    });
    if (!invitee) {
      return NextResponse.json(
        { error: "해당 이메일로 가입한 회원이 없습니다. 회원가입 후 다시 초대해 주세요." },
        { status: 404 },
      );
    }

    const trip = await prisma.trip.findUnique({ where: { id: tripId }, select: { userId: true } });
    if (trip?.userId === invitee.id) {
      return NextResponse.json({ error: "일정 소유자는 초대할 수 없습니다." }, { status: 400 });
    }

    await prisma.tripCollaborator.upsert({
      where: { tripId_userId: { tripId, userId: invitee.id } },
      create: {
        tripId,
        userId: invitee.id,
        role: body.role as CollaboratorRole,
      },
      update: { role: body.role as CollaboratorRole },
    });

    return NextResponse.json({
      ok: true,
      message: `${invitee.name ?? invitee.email}님을 동행자로 추가했습니다.`,
    });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ error: e.errors[0]?.message }, { status: 400 });
    }
    return NextResponse.json({ error: "초대 처리 중 오류가 발생했습니다." }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id: tripId } = await params;
  const isOwner = await assertTripOwner(session.user.id, tripId);
  if (!isOwner) return NextResponse.json({ error: "일정 소유자만 내보낼 수 있습니다." }, { status: 403 });

  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  if (!userId) return NextResponse.json({ error: "userId가 필요합니다." }, { status: 400 });

  await prisma.tripCollaborator.deleteMany({ where: { tripId, userId } });
  return NextResponse.json({ ok: true });
}

```

---

### `src/app/api/trips/[id]/invite/route.ts`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/app/api/trips/[id]/invite/route.ts` |
| **레이어** | API Route |
| **역할** | HTTP API 엔드포인트 (Route Handler) |
| **API 경로** | `/api/trips/[id]/invite` |

```typescript
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { assertTripOwner } from "@/features/trips/server/trip-access";
import { prisma } from "@/server/db/prisma";

/** @deprecated /api/trips/[id]/collaborators POST 사용 */
export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { email, role = "EDITOR" } = await req.json();
  const { id: tripId } = await params;

  const isOwner = await assertTripOwner(session.user.id, tripId);
  if (!isOwner) return NextResponse.json({ error: "일정 소유자만 초대할 수 있습니다." }, { status: 403 });

  const user = await prisma.user.findFirst({
    where: { email: { equals: String(email).trim(), mode: "insensitive" } },
  });
  if (!user) return NextResponse.json({ error: "해당 이메일의 회원을 찾을 수 없습니다." }, { status: 404 });

  const trip = await prisma.trip.findUnique({ where: { id: tripId }, select: { userId: true } });
  if (trip?.userId === user.id) {
    return NextResponse.json({ error: "일정 소유자는 초대할 수 없습니다." }, { status: 400 });
  }

  await prisma.tripCollaborator.upsert({
    where: { tripId_userId: { tripId, userId: user.id } },
    create: { tripId, userId: user.id, role: role === "VIEWER" ? "VIEWER" : "EDITOR" },
    update: { role: role === "VIEWER" ? "VIEWER" : "EDITOR" },
  });

  return NextResponse.json({ ok: true });
}

```

---

### `src/app/api/trips/[id]/itinerary/route.ts`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/app/api/trips/[id]/itinerary/route.ts` |
| **레이어** | API Route |
| **역할** | HTTP API 엔드포인트 (Route Handler) |
| **API 경로** | `/api/trips/[id]/itinerary` |

```typescript
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getEditableTrip } from "@/features/trips/server/trip-access";
import { prisma } from "@/server/db/prisma";

type TripItemPatch = {
  id: string;
  sortOrder: number;
  startTime?: string | null;
  endTime?: string | null;
  transport?: string | null;
};

type PatchBody = {
  days: { dayId: string; items: TripItemPatch[] }[];
};

function normalizeTime(value: string | null | undefined): string | null {
  if (value == null || value === "") return null;
  return value.slice(0, 5);
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id: tripId } = await params;
  const trip = await getEditableTrip(session.user.id, tripId);
  if (!trip) {
    return NextResponse.json({ error: "편집 권한이 없습니다." }, { status: 403 });
  }

  const { days } = (await req.json()) as PatchBody;
  if (!Array.isArray(days)) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const dayById = new Map(trip.days.map((d) => [d.id, d]));
  const updates: ReturnType<typeof prisma.tripItem.update>[] = [];

  for (const { dayId, items } of days) {
    const day = dayById.get(dayId);
    if (!day || !Array.isArray(items)) continue;

    const validIds = new Set(day.items.map((it) => it.id));

    for (const row of items) {
      if (!validIds.has(row.id)) continue;
      updates.push(
        prisma.tripItem.update({
          where: { id: row.id },
          data: {
            sortOrder: row.sortOrder,
            startTime: normalizeTime(row.startTime),
            endTime: normalizeTime(row.endTime),
            transport: row.transport?.trim() || null,
          },
        }),
      );
    }
  }

  if (updates.length) {
    await prisma.$transaction(updates);
  }

  return NextResponse.json({ ok: true });
}

```

---

### `src/app/api/trips/[id]/share/route.ts`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/app/api/trips/[id]/share/route.ts` |
| **레이어** | API Route |
| **역할** | HTTP API 엔드포인트 (Route Handler) |
| **API 경로** | `/api/trips/[id]/share` |

```typescript
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { assertTripOwner } from "@/features/trips/server/trip-access";
import { prisma } from "@/server/db/prisma";
import { randomBytes } from "crypto";

export async function POST(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const isOwner = await assertTripOwner(session.user.id, id);
  if (!isOwner) return NextResponse.json({ error: "일정 소유자만 공유 링크를 만들 수 있습니다." }, { status: 403 });

  const existing = await prisma.trip.findUnique({
    where: { id },
    select: { shareToken: true },
  });
  const token = existing?.shareToken ?? randomBytes(16).toString("hex");

  if (!existing?.shareToken) {
    await prisma.trip.update({ where: { id }, data: { shareToken: token } });
  }

  return NextResponse.json({ shareToken: token });
}

```

---

### `src/app/api/trips/join/route.ts`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/app/api/trips/join/route.ts` |
| **레이어** | API Route |
| **역할** | HTTP API 엔드포인트 (Route Handler) |
| **API 경로** | `/api/trips/join` |

```typescript
import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/server/db/prisma";

const schema = z.object({
  shareToken: z.string().min(1),
});

/** 공유 링크로 로그인한 사용자가 동행자(편집자)로 참여 */
export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
  }

  try {
    const { shareToken } = schema.parse(await req.json());
    const trip = await prisma.trip.findUnique({
      where: { shareToken },
      select: { id: true, userId: true, title: true },
    });
    if (!trip) return NextResponse.json({ error: "유효하지 않은 공유 링크입니다." }, { status: 404 });

    if (trip.userId === session.user.id) {
      return NextResponse.json({ ok: true, tripId: trip.id, message: "내 일정입니다." });
    }

    await prisma.tripCollaborator.upsert({
      where: { tripId_userId: { tripId: trip.id, userId: session.user.id } },
      create: { tripId: trip.id, userId: session.user.id, role: "EDITOR" },
      update: {},
    });

    return NextResponse.json({
      ok: true,
      tripId: trip.id,
      message: `「${trip.title}」 일정에 동행자로 참여했습니다. 함께 편집할 수 있습니다.`,
    });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ error: e.errors[0]?.message }, { status: 400 });
    }
    return NextResponse.json({ error: "참여 처리 중 오류가 발생했습니다." }, { status: 500 });
  }
}

```

---

### `src/app/api/trips/route.ts`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/app/api/trips/route.ts` |
| **레이어** | API Route |
| **역할** | HTTP API 엔드포인트 (Route Handler) |
| **API 경로** | `/api/trips` |

```typescript
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/server/db/prisma";
import { JAPAN_REGIONS } from "@/shared/lib/constants";
import { getTripCoverImage, getTripGalleryImages } from "@/features/trips/server/trip-images";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const trips = await prisma.trip.findMany({
    where: { userId: session.user.id },
    orderBy: { updatedAt: "desc" },
    include: {
      days: {
        orderBy: { dayIndex: "asc" },
        include: { items: { select: { placeName: true } } },
      },
    },
  });

  return NextResponse.json({
    trips: trips.map((trip) => {
      const region = JAPAN_REGIONS.find((r) => r.id === trip.region);
      const tripLike = { region: trip.region, days: trip.days };
      const coverImage = getTripCoverImage(tripLike);
      const galleryImages = getTripGalleryImages(tripLike, 4);

      return {
        id: trip.id,
        title: trip.title,
        region: trip.region,
        regionLabel: region?.label ?? trip.region,
        startDate: trip.startDate.toISOString(),
        endDate: trip.endDate.toISOString(),
        totalBudget: trip.totalBudget,
        dayCount: trip.days.length,
        itemCount: trip.days.reduce((n, d) => n + d.items.length, 0),
        coverImage,
        galleryImages,
      };
    }),
  });
}

```

---

### `src/app/api/user/delete/route.ts`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/app/api/user/delete/route.ts` |
| **레이어** | API Route |
| **역할** | HTTP API 엔드포인트 (Route Handler) |
| **API 경로** | `/api/user/delete` |

```typescript
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/server/db/prisma";

const schema = z.object({
  password: z.string().optional(),
  confirm: z.literal("탈퇴"),
});

export async function DELETE(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
  }

  let body: z.infer<typeof schema>;
  try {
    body = schema.parse(await req.json());
  } catch {
    return NextResponse.json({ error: "확인 문구를 정확히 입력해 주세요." }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { passwordHash: true },
  });

  if (!user) {
    return NextResponse.json({ error: "사용자를 찾을 수 없습니다." }, { status: 404 });
  }

  if (user.passwordHash) {
    if (!body.password) {
      return NextResponse.json({ error: "비밀번호를 입력해 주세요." }, { status: 400 });
    }
    const valid = await bcrypt.compare(body.password, user.passwordHash);
    if (!valid) {
      return NextResponse.json({ error: "비밀번호가 올바르지 않습니다." }, { status: 401 });
    }
  }

  await prisma.user.delete({ where: { id: session.user.id } });
  return NextResponse.json({ ok: true });
}

```

---

### `src/app/api/user/profile/route.ts`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/app/api/user/profile/route.ts` |
| **레이어** | API Route |
| **역할** | HTTP API 엔드포인트 (Route Handler) |
| **API 경로** | `/api/user/profile` |

```typescript
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/server/db/prisma";

export async function PATCH(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { name, phone } = await req.json();
  await prisma.user.update({
    where: { id: session.user.id },
    data: { name, phone },
  });

  return NextResponse.json({ ok: true });
}

```

---

### `src/app/attractions/page.tsx`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/app/attractions/page.tsx` |
| **레이어** | App Router 페이지 |
| **역할** | URL 페이지 컴포넌트 (Server/Client) |

```tsx
import { Suspense } from "react";
import { AppShell } from "@/shared/layout/app-shell";
import { AttractionList } from "@/features/attractions/components/attraction-list";
import { ensureCatalogWarm, getAttractionsCatalog } from "@/server/preload/catalog";

export default async function AttractionsPage() {
  await ensureCatalogWarm();
  const initialByRegion = getAttractionsCatalog();

  return (
    <AppShell title="관광지 정보">
      <p className="mb-4 text-sm text-slate-600">
        지역별 대표 명소(도톤보리·USJ 등)를 우선 표시하고, 지도와 리스트로 확인할 수 있습니다.
      </p>
      <Suspense fallback={<p className="text-sm text-slate-500">불러오는 중...</p>}>
        <AttractionList initialByRegion={initialByRegion} />
      </Suspense>
    </AppShell>
  );
}

```

---

### `src/app/budget/page.tsx`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/app/budget/page.tsx` |
| **레이어** | App Router 페이지 |
| **역할** | URL 페이지 컴포넌트 (Server/Client) |

```tsx
import { AppShell } from "@/shared/layout/app-shell";
import { BudgetPanel } from "@/features/budget/components/budget-panel";

export default function BudgetPage() {
  return (
    <AppShell title="예산 관리">
      <BudgetPanel />
    </AppShell>
  );
}

```

---

### `src/app/chat/page.tsx`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/app/chat/page.tsx` |
| **레이어** | App Router 페이지 |
| **역할** | URL 페이지 컴포넌트 (Server/Client) |

```tsx
import { AppShell } from "@/shared/layout/app-shell";
import { ChatPanel } from "@/features/chat/components/chat-panel";

export default function ChatPage() {
  return (
    <AppShell title="AI 여행 상담">
      <p className="mb-3 text-sm text-slate-600">
        로그인 시 구글·카카오 계정과 연동된 대화 세션이 유지됩니다.
      </p>
      <ChatPanel />
    </AppShell>
  );
}

```

---

### `src/app/checklist/page.tsx`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/app/checklist/page.tsx` |
| **레이어** | App Router 페이지 |
| **역할** | URL 페이지 컴포넌트 (Server/Client) |

```tsx
import { AppShell } from "@/shared/layout/app-shell";
import { ChecklistPanel } from "@/features/checklist/components/checklist-panel";

export default function ChecklistPage() {
  return (
    <AppShell title="여행 체크리스트">
      <p className="mb-4 text-sm text-slate-600">
        한국→일본 출발 전 준비물을 자동 생성하고, 기본·커스텀 항목 모두 추가·삭제할 수 있습니다.
      </p>
      <ChecklistPanel />
    </AppShell>
  );
}

```

---

### `src/app/forgot-password/page.tsx`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/app/forgot-password/page.tsx` |
| **레이어** | App Router 페이지 |
| **역할** | URL 페이지 컴포넌트 (Server/Client) |

```tsx
import { AppShell } from "@/shared/layout/app-shell";
import { Card } from "@/shared/ui/card";
import { ForgotPasswordForm } from "@/features/auth/components/forgot-password-form";

export default function ForgotPasswordPage() {
  return (
    <AppShell title="비밀번호 찾기">
      <Card>
        <ForgotPasswordForm />
      </Card>
    </AppShell>
  );
}

```

---

### `src/app/globals.css`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/app/globals.css` |
| **레이어** | 전역 스타일 |
| **역할** | 디자인 토큰 · 홈 UI · 공통 CSS |

```css
@import "tailwindcss";

:root {
  --background: #eef2fc;
  --foreground: #2a3f7a;
  --primary: #7ba7e8;
  --primary-hover: #6a96d8;
  --primary-light: rgba(123, 167, 232, 0.12);
  --primary-light-text: #a0b8f0;
  --accent: #9b8fe8;
  --accent-sky: #6dc5e8;
  --logo-en: #3a5a9e;
  --logo-kr: #7a8ec0;
  --nav-text: #4a5f9a;
  --label-muted: #8a9cc8;
  --muted: #6878a8;
  --dark: #2a3f7a;
  --border: rgba(123, 167, 232, 0.25);
  --card: #ffffff;
  --brand-gradient: linear-gradient(135deg, #7ba7e8 0%, #9b8fe8 100%);
  --sky-gradient: linear-gradient(160deg, #c8d8f8 0%, #bbc8f5 30%, #c5b8f0 65%, #b8d4f7 100%);
  --footer-gradient: linear-gradient(180deg, #3a5a9e 0%, #2a3f7a 100%);
  --btn-shadow: rgba(123, 167, 232, 0.35);
  --hero-title-size: 52px;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-noto-sans);
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: var(--font-noto-sans), "Noto Sans KR", system-ui, sans-serif;
}

.font-montserrat {
  font-family: var(--font-montserrat), "Montserrat", sans-serif;
}

/* PC / 모바일 뷰 */
html[data-view-mode="mobile"] .view-desktop-only {
  display: none !important;
}

html[data-view-mode="desktop"] .view-mobile-only {
  display: none !important;
}

.ui-card {
  background: var(--card);
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.btn-primary {
  background: var(--brand-gradient);
  color: #fff;
  border-radius: 22px;
  font-weight: 700;
  box-shadow: 0 4px 14px var(--btn-shadow);
  transition: transform 0.2s, box-shadow 0.2s, filter 0.2s;
  border: none;
}

.btn-primary:hover {
  filter: brightness(1.05);
  box-shadow: 0 6px 20px var(--btn-shadow);
  transform: translateY(-1px);
}

.btn-outline {
  padding: 8px 16px;
  border: 1.5px solid var(--primary);
  color: var(--primary);
  border-radius: 9999px;
  font-weight: 600;
  transition: background 0.2s, color 0.2s, border-color 0.2s;
}

.btn-outline:hover {
  background: var(--primary-light);
  color: var(--primary-hover);
  border-color: var(--primary-hover);
}

.btn-card-dark {
  display: block;
  text-align: center;
  background: var(--dark);
  color: #fff;
  padding: 10px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  transition: background 0.3s;
}

.btn-card-dark:hover {
  background: var(--primary);
}

.section-title {
  font-size: 26px;
  font-weight: 700;
  margin-bottom: 30px;
  position: relative;
  padding-left: 15px;
}

.section-title::before {
  content: "";
  position: absolute;
  left: 0;
  top: 4px;
  width: 5px;
  height: 24px;
  background: var(--brand-gradient);
  border-radius: 2px;
}

/* 홈 스카이 배경 */
.home-sky-wrap {
  position: relative;
  overflow: hidden;
  min-height: 520px;
}

.home-sky-photo {
  position: absolute;
  inset: 0;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  filter: brightness(0.92) saturate(0.88);
}

.home-sky-overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.9) 0%,
      rgba(248, 251, 255, 0.82) 22%,
      rgba(236, 242, 252, 0.68) 48%,
      rgba(220, 230, 248, 0.5) 72%,
      rgba(200, 216, 248, 0.38) 100%
    ),
    linear-gradient(
      160deg,
      rgba(200, 216, 248, 0.28) 0%,
      rgba(197, 184, 240, 0.22) 50%,
      rgba(184, 212, 247, 0.26) 100%
    );
}

.home-sky-deco {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
}

.home-sky-noise {
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E");
}

.home-sky-blob {
  position: absolute;
  border-radius: 50%;
}

.home-sky-blob--1 {
  top: -60px;
  right: -40px;
  width: 320px;
  height: 320px;
  background: radial-gradient(circle, rgba(180, 200, 255, 0.38) 0%, transparent 70%);
}

.home-sky-blob--2 {
  bottom: -80px;
  left: -60px;
  width: 360px;
  height: 360px;
  background: radial-gradient(circle, rgba(195, 180, 250, 0.32) 0%, transparent 70%);
}

.home-sky-blob--3 {
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 300px;
  background: radial-gradient(ellipse, rgba(210, 225, 255, 0.25) 0%, transparent 70%);
}

.header-avatar {
  display: flex;
  height: 34px;
  width: 34px;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: linear-gradient(135deg, #a0b8f0, #b8a8ec);
  font-size: 13px;
  font-weight: 700;
  color: #fff;
}

.nav-active-line {
  position: absolute;
  bottom: -4px;
  left: 0;
  right: 0;
  height: 2px;
  border-radius: 2px;
  background: var(--primary);
}

.site-header--sky {
  border-bottom: 1px solid rgba(255, 255, 255, 0.82);
  background: rgba(255, 255, 255, 0.78);
  -webkit-backdrop-filter: blur(16px);
  backdrop-filter: blur(16px);
}

/* 브랜드 히어로 */
.brand-hero {
  position: relative;
  z-index: 5;
  display: flex;
  justify-content: center;
  padding: 24px 20px 16px;
  text-align: center;
}

.brand-hero-content {
  display: flex;
  width: 100%;
  max-width: 720px;
  flex-direction: column;
  align-items: center;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 24px;
  padding: 8px 18px;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.9);
  background: rgba(255, 255, 255, 0.78);
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
  font-size: 13px;
  font-weight: 600;
  color: #3d528f;
  box-shadow: 0 2px 12px rgba(123, 167, 232, 0.18);
}

.hero-badge-star {
  color: var(--primary);
  font-size: 15px;
}

.hero-app-logo {
  margin-bottom: 18px;
  filter: drop-shadow(0 8px 28px rgba(123, 167, 232, 0.38));
}

.hero-title {
  margin-bottom: 2px;
  font-size: clamp(36px, 8vw, 52px);
  font-weight: 900;
  line-height: 1;
  letter-spacing: -1px;
  color: #1e3270;
  text-shadow:
    0 1px 0 rgba(255, 255, 255, 0.85),
    0 2px 16px rgba(255, 255, 255, 0.55);
}

.hero-kr {
  margin-bottom: 8px;
  font-size: 20px;
  font-weight: 700;
  color: #5a7fd4;
  text-shadow: 0 1px 8px rgba(255, 255, 255, 0.7);
}

.hero-ja {
  margin-top: -2px;
  margin-bottom: 14px;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.2;
  color: #6b7faa;
  letter-spacing: 0.04em;
  text-shadow: 0 1px 6px rgba(255, 255, 255, 0.65);
}

.hero-sub {
  margin-bottom: 6px;
  font-size: 16px;
  font-weight: 500;
  color: #3d528f;
  text-shadow: 0 1px 6px rgba(255, 255, 255, 0.65);
}

.hero-cities {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  margin-bottom: 32px;
  font-size: 13px;
  font-weight: 600;
  color: #4a5f9a;
  text-shadow: 0 1px 6px rgba(255, 255, 255, 0.6);
}

.hero-cities svg {
  color: var(--primary);
}

/* 검색 박스 */
.search-box {
  width: 100%;
  max-width: 680px;
  display: grid;
  grid-template-columns: 1fr auto 1fr auto 1fr auto;
  align-items: center;
  gap: 0;
  padding: 20px 24px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.95);
  background: rgba(255, 255, 255, 0.9);
  -webkit-backdrop-filter: blur(20px);
  backdrop-filter: blur(20px);
  box-shadow: 0 8px 32px rgba(100, 130, 220, 0.18);
}

@media (max-width: 900px) {
  .search-box {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .sb-divider {
    display: none;
  }

  .sb-btn {
    margin-left: 0 !important;
    width: 100%;
  }
}

.sb-section {
  padding: 0 20px;
  text-align: left;
}

.sb-section:first-child {
  padding-left: 4px;
}

.sb-section--dates {
  overflow: visible;
}

.sb-label {
  margin-bottom: 4px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: #6b7faa;
}

.sb-value {
  font-size: 18px;
  font-weight: 700;
  color: #1e3270;
}

.sb-sub {
  margin-top: 1px;
  font-size: 12px;
  font-weight: 500;
  color: #6b7faa;
}

.sb-divider {
  width: 1px;
  height: 44px;
  background: rgba(123, 167, 232, 0.25);
}

.city-select {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 10px;
  border: 1px solid rgba(123, 167, 232, 0.25);
  background: rgba(123, 167, 232, 0.1);
  font-size: 18px;
  font-weight: 700;
  color: var(--foreground);
  cursor: pointer;
}

.city-select-native {
  position: absolute;
  inset: 0;
  opacity: 0;
  cursor: pointer;
}

.sb-value-input {
  width: 100%;
  border: none;
  background: transparent;
  font-size: 18px;
  font-weight: 700;
  color: var(--foreground);
  outline: none;
}

.sb-btn {
  margin-left: 20px;
  padding: 13px 28px;
  border: none;
  border-radius: 14px;
  background: var(--brand-gradient);
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  font-family: inherit;
  white-space: nowrap;
  cursor: pointer;
  box-shadow: 0 4px 18px rgba(123, 167, 232, 0.4);
  transition: filter 0.2s;
}

.sb-btn:hover {
  filter: brightness(1.05);
}

/* 신뢰 배지 */
.trust-row {
  position: relative;
  z-index: 5;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  padding: 8px 24px 24px;
}

.trust-pill {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 8px 16px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.88);
  background: rgba(255, 255, 255, 0.72);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  font-size: 12px;
  font-weight: 600;
  color: #3d528f;
}

.tp-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
}

.tp-blue {
  background: var(--primary);
}

.tp-purple {
  background: var(--accent);
}

.tp-sky {
  background: var(--accent-sky);
}

/* 푸터 */
.site-footer {
  background: var(--footer-gradient);
  color: #94a3b8;
}

.site-footer .brand-logo-en {
  color: #fff !important;
}

.site-footer .brand-logo-kr {
  color: var(--primary-light-text) !important;
}

/* 인기 여행지 그리드 */
.destinations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 25px;
  margin-bottom: 60px;
}

.dest-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s;
}

.dest-card:hover {
  transform: translateY(-5px);
}

.dest-card-img {
  height: 180px;
  background-size: cover;
  background-position: center;
}

/* 플래너 프리뷰 */
.planner-preview {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  background: #fff;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

@media (max-width: 900px) {
  .planner-preview {
    grid-template-columns: 1fr;
  }
}

.nihon-timeline {
  border-left: 2px dashed #ddd;
  padding-left: 20px;
  margin-left: 10px;
}

.nihon-timeline-item {
  position: relative;
  margin-bottom: 25px;
}

.nihon-timeline-item::before {
  content: "";
  position: absolute;
  left: -26px;
  top: 4px;
  width: 10px;
  height: 10px;
  border-radius: 50px;
  background: var(--primary);
  border: 2px solid #fff;
  box-shadow: 0 0 0 2px var(--primary);
}

.map-mockup {
  background: #e3edf7;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--primary);
  font-weight: 700;
  min-height: 300px;
  border: 2px inset rgba(0, 0, 0, 0.02);
  font-size: 15px;
  text-align: center;
  padding: 20px;
}

/* 사이드바 레이아웃 (기능 페이지) */
html[data-view-mode="desktop"] .page-with-sidebar {
  display: flex;
  align-items: flex-start;
  gap: 2rem;
}

html[data-view-mode="mobile"] .page-with-sidebar {
  display: block;
}

html[data-view-mode="desktop"] .page-main-content {
  flex: 1;
  min-width: 0;
  padding-bottom: 2rem;
}

html[data-view-mode="desktop"] .shortcuts-nav-panel {
  position: sticky;
  top: 5.5rem;
}

/* AI 채팅 플로팅 버튼 */
.ai-chat-fab {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  color: #fff;
  background: var(--brand-gradient);
  box-shadow: 0 4px 16px rgba(123, 167, 232, 0.45);
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease;
}

.ai-chat-fab:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 22px rgba(123, 167, 232, 0.55);
}

.ai-chat-fab:active {
  transform: scale(0.95);
}

.ai-chat-header {
  background: var(--brand-gradient);
  color: #fff;
}

.ai-chat-panel {
  border-color: rgba(123, 167, 232, 0.2);
  box-shadow: 0 8px 32px rgba(100, 130, 220, 0.18);
}

/* 관광지 지도 — Google Maps */
.attraction-map-root .gm-style {
  font-family: inherit;
}

```

---

### `src/app/layout.tsx`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/app/layout.tsx` |
| **레이어** | App Router 루트 |
| **역할** | 전역 레이아웃 · 폰트 · 메타데이터 |

```tsx
import type { Metadata, Viewport } from "next";
import { Montserrat, Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { Providers } from "@/shared/providers";
import { getViewMode } from "@/shared/lib/view-mode-server";
import { APP_DESCRIPTION, APP_NAME, APP_TAGLINE } from "@/shared/lib/constants";

const notoSans = Noto_Sans_KR({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["700", "900"],
});

export const metadata: Metadata = {
  title: `${APP_NAME} · ${APP_TAGLINE} — 일본 여행 플래너`,
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  icons: {
    icon: "/brand-icon.svg",
    apple: "/brand-icon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#7ba7e8",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const viewMode = await getViewMode();

  return (
    <html
      lang="ko"
      data-view-mode={viewMode}
      className={`${notoSans.variable} ${montserrat.variable} h-full`}
    >
      <body className="min-h-full antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

```

---

### `src/app/login/page.tsx`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/app/login/page.tsx` |
| **레이어** | App Router 페이지 |
| **역할** | URL 페이지 컴포넌트 (Server/Client) |

```tsx
import Link from "next/link";
import { Suspense } from "react";
import { AppShell } from "@/shared/layout/app-shell";
import { LoginForm } from "@/features/auth/components/login-form";
import { SocialLoginSection } from "@/features/auth/components/social-login-section";
import { AuthErrorBanner } from "@/features/auth/components/auth-error-banner";

export default function LoginPage() {
  return (
    <AppShell title="로그인">
      <div className="space-y-6">
        <Suspense fallback={null}>
          <AuthErrorBanner />
        </Suspense>
        <Suspense fallback={<p className="text-sm text-slate-400">로딩 중...</p>}>
          <LoginForm />
        </Suspense>
        <div className="relative text-center text-sm text-slate-400">
          <span className="bg-slate-50 px-2">또는</span>
        </div>
        <Suspense fallback={<p className="text-sm text-slate-400">로딩 중...</p>}>
          <SocialLoginSection />
        </Suspense>
        <p className="text-center text-sm text-slate-600">
          계정이 없으신가요?{" "}
          <Link href="/register" className="font-medium text-rose-600">
            회원가입
          </Link>
        </p>
        <p className="text-center text-sm">
          <Link href="/forgot-password" className="text-slate-500 underline">
            비밀번호 찾기
          </Link>
        </p>
      </div>
    </AppShell>
  );
}

```

---

### `src/app/page.tsx`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/app/page.tsx` |
| **레이어** | 기타 |
| **역할** | 프로젝트 설정 · 보조 파일 |

```tsx
import { HomePageContent } from "@/features/home/components/home-page-content";

export default function HomePage() {
  return <HomePageContent />;
}

```

---

### `src/app/planner/page.tsx`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/app/planner/page.tsx` |
| **레이어** | App Router 페이지 |
| **역할** | URL 페이지 컴포넌트 (Server/Client) |

```tsx
import { Suspense } from "react";
import { AppShell } from "@/shared/layout/app-shell";
import { PlannerPanel } from "@/features/planner/components/planner-panel";

export default function PlannerPage() {
  return (
    <AppShell title="일정 자동 생성">
      <p className="mb-4 text-sm text-slate-600">
        조건 입력 후 AI 일정을 생성하고, 드래그 앤 드롭으로 순서를 변경할 수 있습니다.
      </p>
      <Suspense fallback={<p className="text-sm text-slate-400">로딩 중...</p>}>
        <PlannerPanel />
      </Suspense>
    </AppShell>
  );
}

```

---

### `src/app/profile/page.tsx`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/app/profile/page.tsx` |
| **레이어** | App Router 페이지 |
| **역할** | URL 페이지 컴포넌트 (Server/Client) |

```tsx
import { redirect } from "next/navigation";
import { AppShell } from "@/shared/layout/app-shell";
import { Card } from "@/shared/ui/card";
import { auth } from "@/auth";
import { SignOutButton } from "@/features/auth/components/sign-out-button";
import { ProfileForm } from "@/features/profile/components/profile-form";
import { DeleteAccountSection } from "@/features/profile/components/delete-account-button";
import { prisma } from "@/server/db/prisma";

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      passwordHash: true,
      accounts: { select: { provider: true } },
    },
  });

  const hasPassword = Boolean(user?.passwordHash);
  const oauthProviders =
    user?.accounts.map((a) => a.provider).filter((p) => p !== "credentials") ?? [];

  return (
    <AppShell title="마이페이지">
      <Card className="mb-4">
        <p className="text-sm text-slate-500">로그인 계정</p>
        <p className="font-medium">{session.user.email}</p>
        <p className="text-sm">{session.user.name}</p>
      </Card>
      <ProfileForm />
      <div className="mt-4">
        <SignOutButton />
      </div>
      <DeleteAccountSection hasPassword={hasPassword} oauthProviders={oauthProviders} />
    </AppShell>
  );
}

```

---

### `src/app/register/page.tsx`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/app/register/page.tsx` |
| **레이어** | App Router 페이지 |
| **역할** | URL 페이지 컴포넌트 (Server/Client) |

```tsx
import { Suspense } from "react";
import { AppShell } from "@/shared/layout/app-shell";
import { RegisterForm } from "@/features/auth/components/register-form";
import { SocialLoginSection } from "@/features/auth/components/social-login-section";

export default function RegisterPage() {
  return (
    <AppShell title="회원가입">
      <div className="space-y-6">
        <Suspense fallback={<p className="text-sm text-slate-400">로딩 중...</p>}>
          <SocialLoginSection />
        </Suspense>
        <RegisterForm />
      </div>
    </AppShell>
  );
}

```

---

### `src/app/reset-password/page.tsx`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/app/reset-password/page.tsx` |
| **레이어** | App Router 페이지 |
| **역할** | URL 페이지 컴포넌트 (Server/Client) |

```tsx
import { Suspense } from "react";
import { AppShell } from "@/shared/layout/app-shell";
import { Card } from "@/shared/ui/card";
import { ResetPasswordForm } from "@/features/auth/components/reset-password-form";

export default function ResetPasswordPage() {
  return (
    <AppShell title="비밀번호 재설정">
      <Card>
        <Suspense fallback={<p className="text-sm text-slate-500">불러오는 중...</p>}>
          <ResetPasswordForm />
        </Suspense>
      </Card>
    </AppShell>
  );
}

```

---

### `src/app/restaurants/page.tsx`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/app/restaurants/page.tsx` |
| **레이어** | App Router 페이지 |
| **역할** | URL 페이지 컴포넌트 (Server/Client) |

```tsx
import { AppShell } from "@/shared/layout/app-shell";
import { RestaurantList } from "@/features/restaurants/components/restaurant-list";

export default function RestaurantsPage() {
  return (
    <AppShell title="맛집 추천">
      <RestaurantList />
    </AppShell>
  );
}

```

---

### `src/app/settings/notifications/page.tsx`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/app/settings/notifications/page.tsx` |
| **레이어** | 기타 |
| **역할** | 프로젝트 설정 · 보조 파일 |

```tsx
import { AppShell } from "@/shared/layout/app-shell";
import { NotificationForm } from "@/features/notifications/components/notification-form";

export default function NotificationSettingsPage() {
  return (
    <AppShell title="카카오 일정 알림">
      <ul className="mb-4 list-inside list-disc space-y-1 text-sm text-slate-600">
        <li>매일 지정 시간에 당일 여행 일정을 카카오톡으로 발송</li>
        <li>일정 항목: 장소명 · 시간 · 이동수단</li>
        <li>알림 수신 여부·발송 시간은 아래에서 설정</li>
        <li>카카오 로그인 시 수신 대상 ID 자동 저장</li>
      </ul>
      <NotificationForm />
    </AppShell>
  );
}

```

---

### `src/app/share/[token]/page.tsx`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/app/share/[token]/page.tsx` |
| **레이어** | 기타 |
| **역할** | 프로젝트 설정 · 보조 파일 |

```tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import { auth } from "@/auth";
import { prisma } from "@/server/db/prisma";
import { JAPAN_REGIONS } from "@/shared/lib/constants";
import { BrandLogo } from "@/shared/ui/brand-logo";
import { TripItineraryGallery } from "@/features/trips/components/trip-itinerary-gallery";
import { ShareJoinBanner } from "@/features/trips/components/share-join-banner";
import { getTripCoverImage } from "@/features/trips/server/trip-images";

export const dynamic = "force-dynamic";

export default async function SharePage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const session = await auth();

  const trip = await prisma.trip.findUnique({
    where: { shareToken: token },
    include: {
      days: { include: { items: true }, orderBy: { dayIndex: "asc" } },
      ...(session?.user?.id
        ? {
            collaborators: {
              where: { userId: session.user.id },
              select: { userId: true },
            },
          }
        : {}),
    },
  });

  if (!trip) notFound();

  const region = JAPAN_REGIONS.find((r) => r.id === trip.region);
  const hero = getTripCoverImage({ region: trip.region, days: trip.days });
  const isOwner = session?.user?.id === trip.userId;
  const isCollaborator = Boolean(
    session?.user?.id &&
      "collaborators" in trip &&
      Array.isArray(trip.collaborators) &&
      trip.collaborators.length > 0,
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="relative h-28 overflow-hidden sm:h-36">
        <Image src={hero} alt="" fill className="object-cover" sizes="100vw" priority />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative flex h-full flex-col justify-end gap-1 px-4 pb-4 sm:px-6">
          <BrandLogo variant="compact" href="/" className="[&_.brand-logo-en]:!text-white [&_.brand-logo-kr]:hidden" />
          <p className="text-lg font-bold text-white">공유된 여행 일정</p>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
        <ShareJoinBanner
          shareToken={token}
          tripId={trip.id}
          isLoggedIn={Boolean(session?.user)}
          isOwner={isOwner}
          isCollaborator={isCollaborator}
        />
        <TripItineraryGallery
          title={trip.title}
          region={trip.region}
          regionLabel={region?.label}
          startDate={trip.startDate}
          endDate={trip.endDate}
          days={trip.days}
        />
      </main>
    </div>
  );
}

```

---

### `src/app/stays/page.tsx`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/app/stays/page.tsx` |
| **레이어** | App Router 페이지 |
| **역할** | URL 페이지 컴포넌트 (Server/Client) |

```tsx
import { AppShell } from "@/shared/layout/app-shell";
import { StaySearch } from "@/features/stays/components/stay-search";
import {
  DEFAULT_STAY_SEARCH,
  ensureCatalogWarm,
  getStaysCatalog,
} from "@/server/preload/catalog";

export default async function StaysPage() {
  await ensureCatalogWarm();
  const initialByRegion = getStaysCatalog();

  return (
    <AppShell title="숙박 검색·추천">
      <p className="mb-4 text-sm text-slate-600">
        숙소 목록은 서버 시작 시 미리 불러옵니다. 지역 변경은 즉시 반영되며, 날짜·예산을
        바꾼 뒤에는 검색 버튼으로 다시 조회할 수 있습니다.
      </p>
      <StaySearch initialByRegion={initialByRegion} defaultSearch={DEFAULT_STAY_SEARCH} />
    </AppShell>
  );
}

```

---

### `src/app/trips/[id]/page.tsx`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/app/trips/[id]/page.tsx` |
| **레이어** | 기타 |
| **역할** | 프로젝트 설정 · 보조 파일 |

```tsx
import { notFound, redirect } from "next/navigation";
import { format } from "date-fns";
import { auth } from "@/auth";
import { AppShell } from "@/shared/layout/app-shell";
import { JAPAN_REGIONS } from "@/shared/lib/constants";
import { getTripAccess } from "@/features/trips/server/trip-access";
import { TripItineraryGallery } from "@/features/trips/components/trip-itinerary-gallery";
import { TripItineraryEditor } from "@/features/trips/components/trip-itinerary-editor";
import {
  TripCollaboratorPanel,
  type CollaboratorMember,
} from "@/features/trips/components/trip-collaborator-panel";
import { prisma } from "@/server/db/prisma";

export const dynamic = "force-dynamic";

export default async function TripDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user?.id) redirect(`/login?callbackUrl=/trips/${id}`);

  const access = await getTripAccess(session.user.id, id);
  if (!access) notFound();

  const trip = await prisma.trip.findUnique({
    where: { id },
    include: {
      days: {
        orderBy: { dayIndex: "asc" },
        include: { items: { orderBy: { sortOrder: "asc" } } },
      },
    },
  });

  if (!trip) notFound();

  const region = JAPAN_REGIONS.find((r) => r.id === trip.region);
  const initialMembers: CollaboratorMember[] = access.members.map((m) => ({
    ...m,
    invitedAt: m.invitedAt.toISOString(),
  }));

  return (
    <AppShell>
      <header className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          {region?.label ?? trip.region}
        </p>
        <h1 className="mt-1 text-2xl font-bold text-slate-900">{trip.title}</h1>
        <p className="mt-1 text-sm text-slate-600">
          {format(trip.startDate, "yyyy.MM.dd")} – {format(trip.endDate, "yyyy.MM.dd")}
        </p>
      </header>

      {access.canEdit ? (
        <TripItineraryEditor tripId={trip.id} region={trip.region} days={trip.days} />
      ) : (
        <TripItineraryGallery
          title={trip.title}
          region={trip.region}
          regionLabel={region?.label}
          startDate={trip.startDate}
          endDate={trip.endDate}
          days={trip.days}
          headerExtra={
            access.role !== "OWNER" ? (
              <span className="rounded-full bg-sky-100 px-2.5 py-1 text-xs font-medium text-sky-800">
                동행 일정 · 보기만
              </span>
            ) : null
          }
        />
      )}

      <div className="mt-8">
        <TripCollaboratorPanel
          tripId={trip.id}
          shareToken={trip.shareToken}
          canManageCollaborators={access.canManageCollaborators}
          initialMembers={initialMembers}
        />
      </div>
    </AppShell>
  );
}

```

---

### `src/app/trips/page.tsx`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/app/trips/page.tsx` |
| **레이어** | App Router 페이지 |
| **역할** | URL 페이지 컴포넌트 (Server/Client) |

```tsx
import Link from "next/link";
import { AppShell } from "@/shared/layout/app-shell";
import { Card } from "@/shared/ui/card";
import { auth } from "@/auth";
import { prisma } from "@/server/db/prisma";
import { JAPAN_REGIONS } from "@/shared/lib/constants";
import { TripCard } from "@/features/trips/components/trip-card";

export const dynamic = "force-dynamic";

export default async function TripsPage() {
  const session = await auth();
  const userId = session?.user?.id;

  const trips = userId
    ? await prisma.trip.findMany({
        where: {
          OR: [{ userId }, { collaborators: { some: { userId } } }],
        },
        orderBy: { updatedAt: "desc" },
        include: {
          days: {
            include: { items: { select: { placeName: true } } },
            orderBy: { dayIndex: "asc" },
          },
        },
      })
    : [];

  const owned = trips.filter((t) => t.userId === userId);
  const shared = trips.filter((t) => t.userId !== userId);

  return (
    <AppShell title="내 일정">
      <p className="mb-4 text-center text-sm text-slate-500">
        내가 만든 일정과 동행자로 참여한 일정을 확인할 수 있습니다
      </p>
      <Link
        href="/planner"
        className="mb-6 block rounded-xl border border-dashed border-rose-200 bg-rose-50/50 py-3 text-center text-sm font-medium text-rose-600 transition hover:bg-rose-50"
      >
        + 새 일정 만들기
      </Link>
      {trips.length === 0 ? (
        <Card>
          <p className="text-sm text-slate-500">저장된 일정이 없습니다. 플래너에서 일정을 생성해 보세요.</p>
        </Card>
      ) : (
        <div className="space-y-8">
          {owned.length > 0 ? (
            <section>
              <h2 className="mb-3 text-sm font-semibold text-slate-700">내가 만든 일정</h2>
              <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {owned.map((trip) => {
                  const region = JAPAN_REGIONS.find((r) => r.id === trip.region);
                  return (
                    <li key={trip.id}>
                      <TripCard
                        id={trip.id}
                        title={trip.title}
                        region={trip.region}
                        regionLabel={region?.label ?? trip.region}
                        startDate={trip.startDate}
                        endDate={trip.endDate}
                        days={trip.days}
                      />
                    </li>
                  );
                })}
              </ul>
            </section>
          ) : null}
          {shared.length > 0 ? (
            <section>
              <h2 className="mb-3 text-sm font-semibold text-slate-700">동행 중인 일정</h2>
              <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {shared.map((trip) => {
                  const region = JAPAN_REGIONS.find((r) => r.id === trip.region);
                  return (
                    <li key={trip.id}>
                      <TripCard
                        id={trip.id}
                        title={trip.title}
                        region={trip.region}
                        regionLabel={region?.label ?? trip.region}
                        startDate={trip.startDate}
                        endDate={trip.endDate}
                        days={trip.days}
                        badge="동행"
                      />
                    </li>
                  );
                })}
              </ul>
            </section>
          ) : null}
        </div>
      )}
    </AppShell>
  );
}

```

---

### `src/auth.config.ts`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/auth.config.ts` |
| **레이어** | 인증 |
| **역할** | NextAuth 설정 분리 |

```typescript
import type { NextAuthConfig } from "next-auth";

/** Edge 미들웨어용 — Prisma/DB import 금지 */
export const authConfig = {
  secret: process.env.AUTH_SECRET,
  trustHost: true,
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers: [],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.name = user.name;
        token.email = user.email;
        token.picture = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
        session.user.name = token.name ?? session.user.name;
        session.user.email = token.email ?? session.user.email;
        session.user.image =
          (typeof token.picture === "string" ? token.picture : null) ?? session.user.image;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;

```

---

### `src/auth.ts`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/auth.ts` |
| **레이어** | 인증 |
| **역할** | NextAuth v5 진입점 · 세션/프로바이더 설정 |

```typescript
import NextAuth from "next-auth";
import type { Provider } from "next-auth/providers";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Google from "next-auth/providers/google";
import Kakao from "next-auth/providers/kakao";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { authConfig } from "@/auth.config";
import { syncKakaoUserForNotifications } from "@/features/notifications/server/kakao/sync-kakao-user";
import { prisma } from "@/server/db/prisma";

const providers: Provider[] = [
  Credentials({
    name: "email",
    credentials: {
      email: { label: "이메일", type: "email" },
      password: { label: "비밀번호", type: "password" },
    },
    async authorize(credentials) {
      const email = credentials?.email as string | undefined;
      const password = credentials?.password as string | undefined;
      if (!email || !password) return null;

      const user = await prisma.user.findUnique({ where: { email } });
      if (!user?.passwordHash) return null;

      const valid = await bcrypt.compare(password, user.passwordHash);
      if (!valid) return null;

      return {
        id: user.id,
        email: user.email,
        name: user.name,
        image: user.image,
      };
    },
  }),
];

if (process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET) {
  providers.push(
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
  );
}

if (process.env.AUTH_KAKAO_ID && process.env.AUTH_KAKAO_SECRET) {
  providers.push(
    Kakao({
      id: "kakao",
      clientId: process.env.AUTH_KAKAO_ID,
      clientSecret: process.env.AUTH_KAKAO_SECRET,
      allowDangerousEmailAccountLinking: true,
      authorization: {
        url: "https://kauth.kakao.com/oauth/authorize",
        params: {
          // account_email 은 카카오 콘솔 동의항목에서 별도 활성화 필요 — 없으면 KOE205
          scope: "profile_nickname profile_image talk_message",
        },
      },
      profile(profile) {
        const account = profile.kakao_account;
        const kakaoProfile = account?.profile;
        return {
          id: String(profile.id),
          name: kakaoProfile?.nickname ?? `카카오${profile.id}`,
          email: account?.email ?? `kakao_${profile.id}@users.nippon.local`,
          image: kakaoProfile?.profile_image_url ?? null,
        };
      },
    }),
  );
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  providers,
  events: {
    async signIn({ user, account }) {
      if (account?.provider === "kakao" && account.providerAccountId && user.id) {
        await syncKakaoUserForNotifications(user.id, account.providerAccountId);
      }
    },
  },
});

```

---

### `src/features/attractions/components/attraction-detail-modal.tsx`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/features/attractions/components/attraction-detail-modal.tsx` |
| **레이어** | Feature UI |
| **역할** | 기능별 React 컴포넌트 (프레젠테이션) |
| **기능 모듈** | `features/attractions` |

```tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import type { AttractionResult } from "@/server/ai/types";
import { AttractionRatingSection } from "@/features/attractions/components/attraction-rating-section";
import { StarRatingDisplay } from "@/features/attractions/components/star-rating-display";
import { Clock, ExternalLink, MapPin, Ticket, Users, X } from "lucide-react";

type Props = {
  attraction: AttractionResult | null;
  onClose: () => void;
};

export function AttractionDetailModal({ attraction, onClose }: Props) {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const photos =
    attraction?.imageUrls?.length
      ? attraction.imageUrls
      : attraction?.imageUrl
        ? [attraction.imageUrl]
        : [];

  useEffect(() => {
    setPhotoIndex(0);
    setLightbox(false);
  }, [attraction?.id]);

  useEffect(() => {
    if (!attraction) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (lightbox) {
        setLightbox(false);
        return;
      }
      onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [attraction, onClose, lightbox]);

  if (!attraction) return null;

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${attraction.lat},${attraction.lng}`;
  const crowdLabel =
    attraction.crowdLevel === "HIGH"
      ? "현재 혼잡"
      : attraction.crowdLevel === "MEDIUM"
        ? "현재 보통"
        : attraction.crowdLevel === "LOW"
          ? "현재 여유"
          : null;

  return (
    <div
      className="fixed inset-0 z-[500] flex items-end justify-center p-0 sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`${attraction.name} 상세 정보`}
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
        aria-label="닫기"
        onClick={onClose}
      />

      <div
        className="relative z-10 flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl sm:max-h-[88vh] sm:rounded-2xl md:flex-row md:max-h-[min(88vh,720px)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative shrink-0 md:flex md:min-h-0 md:w-[min(46%,400px)] md:flex-col md:self-stretch">
          {photos.length > 0 ? (
            <button
              type="button"
              onClick={() => setLightbox(true)}
              className="relative block aspect-[4/3] w-full cursor-zoom-in bg-slate-100 md:aspect-auto md:min-h-[280px] md:flex-1"
              aria-label="사진 크게 보기"
            >
              <Image
                src={photos[photoIndex]}
                alt={attraction.name}
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 672px"
                priority
                unoptimized
              />
              <span className="absolute bottom-3 right-3 rounded-full bg-black/50 px-2 py-0.5 text-[10px] text-white backdrop-blur-sm">
                탭하여 확대
              </span>
              {photos.length > 1 ? (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPhotoIndex((i) => (i - 1 + photos.length) % photos.length);
                    }}
                    className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 px-2.5 py-1 text-lg text-white backdrop-blur-sm hover:bg-black/55"
                    aria-label="이전 사진"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPhotoIndex((i) => (i + 1) % photos.length);
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 px-2.5 py-1 text-lg text-white backdrop-blur-sm hover:bg-black/55"
                    aria-label="다음 사진"
                  >
                    ›
                  </button>
                  <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 gap-1.5">
                    {photos.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setPhotoIndex(i);
                        }}
                        className={`h-1.5 rounded-full transition-all ${
                          i === photoIndex ? "w-5 bg-white" : "w-1.5 bg-white/50"
                        }`}
                        aria-label={`사진 ${i + 1}`}
                      />
                    ))}
                  </div>
                </>
              ) : null}
            </button>
          ) : (
            <div className="flex aspect-[4/3] items-center justify-center bg-slate-100 text-slate-500 md:min-h-[280px] md:flex-1">
              사진 없음
            </div>
          )}

          <button
            type="button"
            onClick={onClose}
            className="absolute right-3 top-3 z-10 rounded-full bg-black/50 p-2 text-white backdrop-blur-sm hover:bg-black/65 md:right-auto md:left-3"
            aria-label="닫기"
          >
            <X size={20} />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto border-t border-slate-100 px-4 pb-6 pt-4 sm:px-6 md:border-l md:border-t-0">
          <h2 className="text-xl font-bold text-slate-900">{attraction.name}</h2>

          <AttractionRatingSection attraction={attraction} />

          {attraction.bestVisitTags?.length ? (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {attraction.bestVisitTags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
          ) : null}

          <div className="mt-4 grid gap-2 rounded-xl bg-slate-50 p-3 text-sm text-slate-700">
            {attraction.fee ? (
              <p className="flex items-center gap-2">
                <Ticket size={16} className="shrink-0 text-rose-500" />
                입장료 {attraction.fee}
              </p>
            ) : null}
            {attraction.hours ? (
              <p className="flex items-center gap-2">
                <Clock size={16} className="shrink-0 text-slate-400" />
                운영 {attraction.hours}
              </p>
            ) : null}
            {attraction.address ? (
              <p className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0 text-slate-400" />
                {attraction.address}
              </p>
            ) : null}
            {crowdLabel ? (
              <p className="flex items-center gap-2">
                <Users size={16} className="shrink-0 text-indigo-500" />
                {crowdLabel}
                {typeof attraction.estimatedWaitMinutes === "number"
                  ? ` · 예상 대기 ${attraction.estimatedWaitMinutes}분`
                  : ""}
              </p>
            ) : null}
          </div>

          {attraction.description ? (
            <p className="mt-4 text-sm leading-relaxed text-slate-700">{attraction.description}</p>
          ) : null}

          {attraction.highlights?.length ? (
            <div className="mt-4">
              <h3 className="text-sm font-semibold text-slate-900">볼거리</h3>
              <ul className="mt-2 space-y-1.5">
                {attraction.highlights.map((h) => (
                  <li key={h} className="flex gap-2 text-sm text-slate-600">
                    <span className="text-rose-400">·</span>
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {attraction.tips ? (
            <div className="mt-4 rounded-xl border border-amber-100 bg-amber-50/80 px-3 py-2.5">
              <p className="text-xs font-medium text-amber-900">여행 팁</p>
              <p className="mt-1 text-sm leading-relaxed text-amber-950/90">{attraction.tips}</p>
            </div>
          ) : null}

          {attraction.recommendedTimeSlots?.length ? (
            <div className="mt-4 rounded-xl border border-indigo-100 bg-indigo-50/70 px-3 py-2.5">
              <p className="text-xs font-medium text-indigo-900">추천 방문 시간대</p>
              <p className="mt-1 text-sm text-indigo-950">
                {attraction.recommendedTimeSlots.join(" · ")}
              </p>
              {attraction.crowdReason ? (
                <p className="mt-1 text-xs text-indigo-900/80">{attraction.crowdReason}</p>
              ) : null}
            </div>
          ) : null}

          <div className="mt-5 flex flex-col gap-2 sm:flex-row">
            <Button type="button" variant="secondary" className="flex-1" onClick={onClose}>
              닫기
            </Button>
            {attraction.wikiUrl ? (
              <a
                href={attraction.wikiUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                <ExternalLink size={16} />
                위키백과
              </a>
            ) : null}
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-rose-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-rose-600"
            >
              <ExternalLink size={16} />
              지도에서 보기
            </a>
          </div>
        </div>
      </div>

      {lightbox && photos.length > 0 ? (
        <div
          className="fixed inset-0 z-[510] flex flex-col bg-black/95 md:flex-row"
          role="dialog"
          aria-label="사진 확대 보기"
        >
          <button
            type="button"
            className="absolute inset-0 md:hidden"
            aria-label="닫기"
            onClick={() => setLightbox(false)}
          />
          <div className="relative z-10 flex min-h-0 min-w-0 flex-1 items-center justify-center p-4 pt-14 md:p-6 md:pt-6">
            <Image
              src={photos[photoIndex]}
              alt={attraction.name}
              width={1600}
              height={1200}
              className="relative z-10 max-h-[50vh] w-auto max-w-full object-contain md:max-h-[88vh]"
              unoptimized
            />
            {photos.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setPhotoIndex((i) => (i - 1 + photos.length) % photos.length);
                  }}
                  className="absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/15 px-3 py-2 text-2xl text-white hover:bg-white/25 md:left-4"
                  aria-label="이전"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setPhotoIndex((i) => (i + 1) % photos.length);
                  }}
                  className="absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/15 px-3 py-2 text-2xl text-white hover:bg-white/25 md:right-4"
                  aria-label="다음"
                >
                  ›
                </button>
                <p className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 text-sm text-white/80 md:bottom-8">
                  {photoIndex + 1} / {photos.length}
                </p>
              </>
            ) : null}
          </div>
          <aside className="relative z-10 hidden min-h-0 w-full max-w-md flex-col overflow-y-auto border-l border-white/10 bg-slate-950/90 p-5 text-white md:flex">
            <h2 className="text-lg font-bold">{attraction.name}</h2>
            {attraction.rating ? (
              <div className="mt-2">
                <StarRatingDisplay
                  value={attraction.rating}
                  size="sm"
                  reviewCount={attraction.reviewCount}
                  tone="dark"
                  className="text-white"
                />
              </div>
            ) : null}
            {attraction.description ? (
              <p className="mt-3 text-sm leading-relaxed text-white/85">{attraction.description}</p>
            ) : null}
            <div className="mt-4 space-y-2 text-sm text-white/75">
              {attraction.fee ? <p>입장료 {attraction.fee}</p> : null}
              {attraction.hours ? <p>운영 {attraction.hours}</p> : null}
              {crowdLabel ? (
                <p>
                  {crowdLabel}
                  {typeof attraction.estimatedWaitMinutes === "number"
                    ? ` · 대기 약 ${attraction.estimatedWaitMinutes}분`
                    : ""}
                </p>
              ) : null}
            </div>
          </aside>
          <button
            type="button"
            onClick={() => setLightbox(false)}
            className="absolute right-4 top-4 z-20 rounded-full bg-white/15 p-2 text-white hover:bg-white/25"
            aria-label="닫기"
          >
            <X size={24} />
          </button>
        </div>
      ) : null}
    </div>
  );
}

```

---

### `src/features/attractions/components/attraction-list-rows.tsx`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/features/attractions/components/attraction-list-rows.tsx` |
| **레이어** | Feature UI |
| **역할** | 기능별 React 컴포넌트 (프레젠테이션) |
| **기능 모듈** | `features/attractions` |

```tsx
"use client";

import { Star, MapPin } from "lucide-react";
import type { AttractionResult } from "@/server/ai/types";

const CATEGORY_LABEL: Record<string, string> = {
  attraction: "명소",
  museum: "박물관",
  viewpoint: "전망대",
  theme_park: "테마파크",
  shrine: "신사",
  temple: "사찰",
  park: "공원",
};

type Props = {
  items: AttractionResult[];
  selectedId: string | null;
  onSelect: (attraction: AttractionResult) => void;
};

export function AttractionListRows({ items, selectedId, onSelect }: Props) {
  if (items.length === 0) {
    return <p className="py-8 text-center text-sm text-slate-500">표시할 관광지가 없습니다.</p>;
  }

  return (
    <ul className="divide-y divide-slate-100">
      {items.map((a, index) => {
        const selected = a.id === selectedId;
        const thumb = a.imageUrls?.[0] ?? a.imageUrl;
        return (
          <li key={a.id}>
            <button
              type="button"
              onClick={() => onSelect(a)}
              className={`flex w-full gap-3 px-2 py-3 text-left transition hover:bg-slate-50 ${
                selected ? "bg-rose-50/80 ring-1 ring-inset ring-rose-200" : ""
              }`}
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-800 text-[11px] font-bold text-white">
                {index + 1}
              </span>
              {thumb ? (
                <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={thumb} alt="" className="h-full w-full object-cover" />
                </span>
              ) : (
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-rose-100 to-sky-100 text-[10px] text-slate-500">
                  N/A
                </span>
              )}
              <span className="min-w-0 flex-1">
                <span className="line-clamp-1 font-medium text-slate-900">{a.name}</span>
                <span className="mt-0.5 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                  {a.category ? (
                    <span>{CATEGORY_LABEL[a.category] ?? a.category}</span>
                  ) : null}
                  {a.rating ? (
                    <span className="inline-flex items-center gap-0.5">
                      <Star size={11} className="fill-amber-400 text-amber-400" />
                      {a.rating}
                    </span>
                  ) : null}
                  <span className="inline-flex items-center gap-0.5">
                    <MapPin size={11} />
                    {a.lat.toFixed(2)}, {a.lng.toFixed(2)}
                  </span>
                </span>
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

```

---

### `src/features/attractions/components/attraction-list.tsx`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/features/attractions/components/attraction-list.tsx` |
| **레이어** | Feature UI |
| **역할** | 기능별 React 컴포넌트 (프레젠테이션) |
| **기능 모듈** | `features/attractions` |

```tsx
"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Badge } from "@/shared/ui/badge";
import { JAPAN_REGIONS, type JapanRegionId } from "@/shared/lib/constants";
import type { AttractionResult } from "@/server/ai/types";
import { AttractionDetailModal } from "@/features/attractions/components/attraction-detail-modal";
import { AttractionListRows } from "@/features/attractions/components/attraction-list-rows";
import { Clock, LayoutGrid, List, Map, Star, Ticket, Users } from "lucide-react";

const AttractionMap = dynamic(
  () =>
    import("@/features/attractions/components/attraction-map").then((m) => ({
      default: m.AttractionMap,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="flex min-h-[280px] items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-sm text-slate-500 sm:min-h-[360px]">
        지도 불러오는 중…
      </div>
    ),
  },
);

type ViewMode = "split" | "map" | "list";

const CATEGORY_LABEL: Record<string, string> = {
  attraction: "명소",
  museum: "박물관",
  viewpoint: "전망대",
  theme_park: "테마파크",
  zoo: "동물원",
  aquarium: "수족관",
  gallery: "미술관",
  shrine: "신사",
  temple: "사찰",
  place_of_worship: "종교 시설",
  park: "공원",
  garden: "정원",
  historic_castle: "성·궁궐",
  historic_fort: "성·궁궐",
  historic_city_gate: "성문",
  historic_monument: "기념물",
  historic_memorial: "기념관",
  historic_ruins: "유적",
  historic_archaeological_site: "유적지",
  historic_tomb: "고분",
};

function AttractionCard({
  attraction,
  onSelect,
}: {
  attraction: AttractionResult;
  onSelect: () => void;
}) {
  const photos =
    attraction.imageUrls?.length
      ? attraction.imageUrls
      : attraction.imageUrl
        ? [attraction.imageUrl]
        : [];

  const crowdUi =
    attraction.crowdLevel === "HIGH"
      ? { label: "혼잡", cls: "bg-rose-500/90 text-white" }
      : attraction.crowdLevel === "MEDIUM"
        ? { label: "보통", cls: "bg-amber-400/90 text-slate-900" }
        : attraction.crowdLevel === "LOW"
          ? { label: "여유", cls: "bg-emerald-500/90 text-white" }
          : null;

  return (
    <button
      type="button"
      onClick={onSelect}
      className="group w-full overflow-hidden rounded-2xl border border-slate-200/80 bg-white text-left shadow-sm transition hover:scale-[1.01] hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
    >
      <div className="relative cursor-zoom-in">
        {photos.length > 0 ? (
          <div className="relative aspect-[4/3] w-full sm:aspect-[16/10]">
            <Image
              src={photos[0]}
              alt={attraction.name}
              fill
              className="object-cover object-center transition duration-300 group-hover:scale-[1.02]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority
              unoptimized
            />
          </div>
        ) : (
          <div className="flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-rose-100 to-sky-100 text-sm text-slate-500 sm:aspect-[16/10]">
            사진 준비 중
          </div>
        )}

        {photos.length > 1 ? (
          <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-black/50 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">
            +{photos.length - 1}장 · 탭하여 확대
          </span>
        ) : (
          <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-black/50 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm opacity-0 transition group-hover:opacity-100">
            탭하여 확대
          </span>
        )}

        <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-medium text-slate-700 opacity-0 shadow transition group-hover:opacity-100">
          자세히 보기
        </span>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
        {attraction.category ? (
          <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-slate-700 shadow-sm">
            {CATEGORY_LABEL[attraction.category] ?? attraction.category}
          </span>
        ) : null}
        {crowdUi ? (
          <span
            className={`pointer-events-none absolute right-3 bottom-3 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold shadow-sm ${crowdUi.cls}`}
          >
            <Users size={12} />
            {crowdUi.label}
          </span>
        ) : null}

        <div className="pointer-events-none absolute bottom-0 left-0 right-0 p-4 text-white">
          <div className="flex items-end justify-between gap-2">
            <h3 className="text-lg font-bold leading-tight drop-shadow-sm">{attraction.name}</h3>
            {attraction.rating ? (
              <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-white/20 px-2 py-1 text-sm font-semibold backdrop-blur-sm">
                <Star size={14} className="fill-amber-400 text-amber-400" />
                {attraction.rating}
              </span>
            ) : null}
          </div>
        </div>
      </div>

      <div className="space-y-2 px-3 py-2.5">
        {attraction.description ? (
          <p className="line-clamp-2 text-xs leading-relaxed text-slate-600">
            {attraction.description}
          </p>
        ) : null}
        <div className="flex flex-wrap gap-3 text-xs text-slate-600">
          {attraction.fee ? (
            <span className="inline-flex items-center gap-1">
              <Ticket size={13} className="text-rose-500" />
              {attraction.fee}
            </span>
          ) : null}
          {attraction.hours ? (
            <span className="inline-flex items-center gap-1">
              <Clock size={13} className="text-slate-400" />
              {attraction.hours}
            </span>
          ) : null}
          {typeof attraction.estimatedWaitMinutes === "number" ? (
            <span className="inline-flex items-center gap-1">
              <Users size={13} className="text-indigo-500" />
              대기 약 {attraction.estimatedWaitMinutes}분
            </span>
          ) : null}
        </div>
        {attraction.bestVisitTags?.length ? (
          <div className="flex flex-wrap gap-1">
            {attraction.bestVisitTags.map((tag) => (
              <Badge key={tag}>
                {tag}
              </Badge>
            ))}
          </div>
        ) : null}
      </div>
    </button>
  );
}

type AttractionListProps = {
  /** 서버 프리로드된 지역별 관광지 (지역 변경 시 즉시 표시) */
  initialByRegion: Record<JapanRegionId, AttractionResult[]>;
};

export function AttractionList({ initialByRegion }: AttractionListProps) {
  const searchParams = useSearchParams();
  const regionParam = searchParams.get("region") as JapanRegionId | null;
  const initialRegion =
    regionParam && JAPAN_REGIONS.some((r) => r.id === regionParam)
      ? regionParam
      : "OSAKA_KYOTO";

  const [region, setRegion] = useState<JapanRegionId>(initialRegion);
  const [selected, setSelected] = useState<AttractionResult | null>(null);
  const [view, setView] = useState<ViewMode>("split");

  useEffect(() => {
    if (regionParam && JAPAN_REGIONS.some((r) => r.id === regionParam)) {
      setRegion(regionParam);
    }
  }, [regionParam]);

  const items = initialByRegion[region] ?? [];
  const selectedId = selected?.id ?? null;

  function handleSelect(a: AttractionResult) {
    setSelected(a);
  }

  const viewButtons: { id: ViewMode; label: string; icon: typeof Map }[] = [
    { id: "split", label: "지도+리스트", icon: LayoutGrid },
    { id: "map", label: "지도", icon: Map },
    { id: "list", label: "리스트", icon: List },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <select
          value={region}
          onChange={(e) => {
            setRegion(e.target.value as JapanRegionId);
            setSelected(null);
          }}
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm shadow-sm sm:max-w-xs"
        >
          {JAPAN_REGIONS.map((r) => (
            <option key={r.id} value={r.id}>
              {r.label}
            </option>
          ))}
        </select>

        <div className="flex rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
          {viewButtons.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setView(id)}
              className={`inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition sm:flex-none sm:text-sm ${
                view === id ? "bg-rose-600 text-white" : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <Icon size={15} />
              {label}
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs text-slate-500">
        {items.length}곳 추출 · 지도 마커 또는 리스트 항목을 누르면 상세 정보를 볼 수 있습니다.
      </p>

      {items.length === 0 ? (
        <p className="py-12 text-center text-sm text-slate-500">이 지역 관광지가 없습니다.</p>
      ) : view === "list" ? (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((a) => (
            <li key={a.id}>
              <AttractionCard attraction={a} onSelect={() => handleSelect(a)} />
            </li>
          ))}
        </ul>
      ) : view === "map" ? (
        <AttractionMap
          items={items}
          region={region}
          selectedId={selectedId}
          onSelect={handleSelect}
          className="h-[min(70vh,560px)]"
        />
      ) : (
        <div className="grid gap-4 lg:grid-cols-[1fr_minmax(280px,360px)] lg:items-stretch">
          <AttractionMap
            items={items}
            region={region}
            selectedId={selectedId}
            onSelect={handleSelect}
            className="h-[min(50vh,480px)] lg:h-auto lg:min-h-[480px]"
          />
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-3 py-2.5">
              <h2 className="text-sm font-semibold text-slate-800">관광지 목록</h2>
            </div>
            <div className="max-h-[min(50vh,480px)] overflow-y-auto lg:max-h-[480px]">
              <AttractionListRows
                items={items}
                selectedId={selectedId}
                onSelect={handleSelect}
              />
            </div>
          </div>
        </div>
      )}

      <AttractionDetailModal attraction={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

```

---

### `src/features/attractions/components/attraction-map.tsx`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/features/attractions/components/attraction-map.tsx` |
| **레이어** | Feature UI |
| **역할** | 기능별 React 컴포넌트 (프레젠테이션) |
| **기능 모듈** | `features/attractions` |

```tsx
"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { AttractionResult } from "@/server/ai/types";
import type { JapanRegionId } from "@/shared/lib/constants";
import { REGION_MAP_VIEW, hasValidCoords } from "@/features/attractions/lib/region-map";
import { fetchGoogleMapsApiKey, loadGoogleMaps } from "@/shared/lib/load-google-maps";

type Props = {
  items: AttractionResult[];
  region: JapanRegionId;
  selectedId: string | null;
  onSelect: (attraction: AttractionResult) => void;
  className?: string;
};

const MARKER_SIZE = 52;
const MARKER_SIZE_SELECTED = 58;

function photoUrl(a: AttractionResult): string | null {
  return a.imageUrls?.[0] ?? a.imageUrl ?? null;
}

function fallbackIconDataUrl(): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 52 52">
    <rect width="52" height="52" rx="12" fill="#fecdd3"/>
    <text x="26" y="34" text-anchor="middle" font-size="22">📍</text>
  </svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

function markerIcon(
  googleMaps: typeof google,
  a: AttractionResult,
  selected: boolean,
): google.maps.Icon {
  const size = selected ? MARKER_SIZE_SELECTED : MARKER_SIZE;
  const url = photoUrl(a) ?? fallbackIconDataUrl();
  return {
    url,
    scaledSize: new googleMaps.maps.Size(size, size),
    anchor: new googleMaps.maps.Point(size / 2, size / 2),
  };
}

export function AttractionMap({
  items,
  region,
  selectedId,
  onSelect,
  className = "",
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const markersByIdRef = useRef<Map<string, google.maps.Marker>>(new Map());
  const onSelectRef = useRef(onSelect);
  const selectedIdRef = useRef(selectedId);
  const mappableKeyRef = useRef("");

  onSelectRef.current = onSelect;
  selectedIdRef.current = selectedId;

  const [mapReady, setMapReady] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const mappable = useMemo(
    () => items.filter((a) => hasValidCoords(a.lat, a.lng)),
    [items],
  );

  const mappableKey = useMemo(() => mappable.map((a) => a.id).join("|"), [mappable]);

  const fitToMarkers = useCallback(
    (map: google.maps.Map) => {
      if (mappable.length === 0) return;

      if (mappable.length === 1) {
        map.setCenter({ lat: mappable[0].lat, lng: mappable[0].lng });
        map.setZoom(14);
        return;
      }

      const bounds = new google.maps.LatLngBounds();
      for (const a of mappable) {
        bounds.extend({ lat: a.lat, lng: a.lng });
      }
      map.fitBounds(bounds, { top: 48, right: 48, bottom: 48, left: 48 });
      const listener = google.maps.event.addListenerOnce(map, "bounds_changed", () => {
        const zoom = map.getZoom();
        if (zoom != null && zoom > 14) map.setZoom(14);
      });
      return () => google.maps.event.removeListener(listener);
    },
    [mappable],
  );

  const syncMarkers = useCallback(
    (map: google.maps.Map) => {
      const nextIds = new Set(mappable.map((a) => a.id));
      const existing = markersByIdRef.current;

      for (const [id, marker] of existing) {
        if (!nextIds.has(id)) {
          marker.setMap(null);
          existing.delete(id);
        }
      }

      for (const a of mappable) {
        const selected = a.id === selectedIdRef.current;
        let marker = existing.get(a.id);

        if (marker) {
          marker.setPosition({ lat: a.lat, lng: a.lng });
          marker.setIcon(markerIcon(google, a, selected));
          marker.setZIndex(selected ? 1000 : 1);
        } else {
          marker = new google.maps.Marker({
            map,
            position: { lat: a.lat, lng: a.lng },
            icon: markerIcon(google, a, selected),
            zIndex: selected ? 1000 : 1,
            title: a.name,
          });

          marker.addListener("click", () => {
            onSelectRef.current(a);
          });

          existing.set(a.id, marker);
        }
      }
    },
    [mappable],
  );

  useEffect(() => {
    let cancelled = false;

    async function init() {
      if (!containerRef.current || mapRef.current) return;

      const apiKey = await fetchGoogleMapsApiKey();
      if (!apiKey) {
        if (!cancelled) {
          setLoadError("Google Maps API 키가 설정되지 않았습니다.");
        }
        return;
      }

      try {
        await loadGoogleMaps(apiKey);
      } catch {
        if (!cancelled) {
          setLoadError("Google Maps를 불러오지 못했습니다. Maps JavaScript API 활성화를 확인하세요.");
        }
        return;
      }

      if (cancelled || !containerRef.current) return;

      const view = REGION_MAP_VIEW[region];
      const map = new google.maps.Map(containerRef.current, {
        center: { lat: view.lat, lng: view.lng },
        zoom: view.zoom,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
        clickableIcons: false,
      });

      mapRef.current = map;
      setMapReady(true);
      setLoadError(null);
    }

    void init();

    return () => {
      cancelled = true;
      setMapReady(false);
      markersByIdRef.current.forEach((m) => m.setMap(null));
      markersByIdRef.current.clear();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!mapReady || !mapRef.current) return;

    const map = mapRef.current;
    const regionChanged = mappableKeyRef.current !== `${region}:${mappableKey}`;
    mappableKeyRef.current = `${region}:${mappableKey}`;

    if (regionChanged) {
      const view = REGION_MAP_VIEW[region];
      map.setCenter({ lat: view.lat, lng: view.lng });
      map.setZoom(view.zoom);
    }

    syncMarkers(map);
    if (regionChanged) {
      fitToMarkers(map);
    }
  }, [mapReady, region, mappableKey, syncMarkers, fitToMarkers]);

  useEffect(() => {
    if (!mapReady || !mapRef.current) return;
    syncMarkers(mapRef.current);
  }, [selectedId, mapReady, syncMarkers]);

  useEffect(() => {
    if (!mapReady || !mapRef.current || !selectedId) return;
    const target = mappable.find((a) => a.id === selectedId);
    if (!target) return;
    mapRef.current.panTo({ lat: target.lat, lng: target.lng });
  }, [selectedId, mappable, mapReady]);

  return (
    <div
      className={`attraction-map-root relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 ${className}`}
    >
      <div ref={containerRef} className="z-0 h-full min-h-[280px] w-full sm:min-h-[360px]" />
      {loadError ? (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/90 px-4 text-center text-sm text-slate-600">
          {loadError}
        </div>
      ) : null}
      {!loadError && mappable.length === 0 ? (
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-white/80 text-sm text-slate-500">
          지도에 표시할 좌표가 없습니다
        </div>
      ) : !loadError ? (
        <p className="pointer-events-none absolute bottom-2 left-2 z-10 rounded-md bg-white/90 px-2 py-1 text-[10px] text-slate-600 shadow-sm">
          {mappable.length}곳 · 사진을 눌러 상세 보기 · Google Maps
        </p>
      ) : null}
    </div>
  );
}

```

---

### `src/features/attractions/components/attraction-rating-section.tsx`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/features/attractions/components/attraction-rating-section.tsx` |
| **레이어** | Feature UI |
| **역할** | 기능별 React 컴포넌트 (프레젠테이션) |
| **기능 모듈** | `features/attractions` |

```tsx
"use client";

import type { AttractionResult } from "@/server/ai/types";
import { StarRatingDisplay } from "@/features/attractions/components/star-rating-display";
import { MessageSquareQuote, Star } from "lucide-react";

type Props = {
  attraction: AttractionResult;
  variant?: "default" | "compact" | "dark";
};

export function AttractionRatingSection({ attraction, variant = "default" }: Props) {
  const rating = attraction.rating;
  if (rating == null) return null;

  const distribution = attraction.ratingDistribution ?? [];
  const reviews = attraction.reviews ?? [];
  const isDark = variant === "dark";
  const isCompact = variant === "compact";

  const cardBg = isDark
    ? "border-white/10 bg-white/5"
    : "border-slate-200/80 bg-gradient-to-br from-amber-50/60 to-white";
  const barTrack = isDark ? "bg-white/15" : "bg-slate-200";
  const barFill = isDark ? "bg-amber-400" : "bg-amber-400";
  const textMuted = isDark ? "text-white/60" : "text-slate-500";
  const textMain = isDark ? "text-white" : "text-slate-900";
  const reviewCard = isDark
    ? "border-white/10 bg-white/5"
    : "border-slate-100 bg-white";

  return (
    <section className={isCompact ? "mt-3" : "mt-4"} aria-label="평점 및 리뷰">
      <div className={`rounded-xl border p-4 ${cardBg}`}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="shrink-0">
            <p className={`text-xs font-medium ${textMuted}`}>여행자 평점</p>
            <div className="mt-1 flex items-baseline gap-2">
              <span className={`text-3xl font-bold tabular-nums ${textMain}`}>
                {rating.toFixed(1)}
              </span>
              <span className={`text-sm ${textMuted}`}>/ 5</span>
            </div>
            <StarRatingDisplay
              value={rating}
              size="md"
              showValue={false}
              reviewCount={attraction.reviewCount}
              className="mt-2"
            />
          </div>

          {distribution.length > 0 && !isCompact ? (
            <div className="min-w-0 flex-1 sm:max-w-[220px]">
              <p className={`mb-2 text-xs font-medium ${textMuted}`}>별점 분포</p>
              <ul className="space-y-1.5">
                {distribution.map(({ stars, percent }) => (
                  <li key={stars} className="flex items-center gap-2 text-xs">
                    <span
                      className={`inline-flex w-8 shrink-0 items-center gap-0.5 font-medium ${textMain}`}
                    >
                      {stars}
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    </span>
                    <div className={`h-2 min-w-0 flex-1 overflow-hidden rounded-full ${barTrack}`}>
                      <div
                        className={`h-full rounded-full transition-all ${barFill}`}
                        style={{ width: `${percent}%` }}
                        role="presentation"
                      />
                    </div>
                    <span className={`w-9 shrink-0 text-right tabular-nums ${textMuted}`}>
                      {percent}%
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        <p className={`mt-3 text-[10px] leading-snug ${textMuted}`}>
          Google Places 사용자 평점·리뷰를 기반으로 표시합니다. 시기·날씨에 따라 체험은 달라질
          수 있습니다.
        </p>
      </div>

      {reviews.length > 0 && !isCompact ? (
        <div className="mt-4">
          <h3
            className={`flex items-center gap-1.5 text-sm font-semibold ${textMain}`}
          >
            <MessageSquareQuote size={16} className="text-rose-500" />
            여행자 리뷰
            <span className={`font-normal ${textMuted}`}>
              ({Math.min(reviews.length, 3)}건 미리보기)
            </span>
          </h3>
          <ul className="mt-2 space-y-2">
            {reviews.slice(0, 3).map((review) => (
              <li
                key={review.id}
                className={`rounded-xl border px-3 py-2.5 shadow-sm ${reviewCard}`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-100 text-xs font-bold text-rose-700"
                      aria-hidden
                    >
                      {review.author.charAt(0)}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-slate-900">{review.author}</p>
                      <p className="text-[10px] text-slate-500">{review.createdAt}</p>
                    </div>
                  </div>
                  <StarRatingDisplay value={review.rating} size="sm" showValue />
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">{review.text}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}

```

---

### `src/features/attractions/components/star-rating-display.tsx`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/features/attractions/components/star-rating-display.tsx` |
| **레이어** | Feature UI |
| **역할** | 기능별 React 컴포넌트 (프레젠테이션) |
| **기능 모듈** | `features/attractions` |

```tsx
"use client";

import { Star } from "lucide-react";

type Size = "sm" | "md" | "lg";

const SIZE_CLASS: Record<Size, { star: string; text: string; gap: string }> = {
  sm: { star: "h-3 w-3", text: "text-xs", gap: "gap-0.5" },
  md: { star: "h-4 w-4", text: "text-sm", gap: "gap-0.5" },
  lg: { star: "h-5 w-5", text: "text-base", gap: "gap-1" },
};

type Props = {
  value: number;
  max?: number;
  size?: Size;
  showValue?: boolean;
  reviewCount?: number;
  /** 어두운 배경(카드 오버레이·라이트박스)용 */
  tone?: "light" | "dark";
  className?: string;
};

export function StarRatingDisplay({
  value,
  max = 5,
  size = "md",
  showValue = true,
  reviewCount,
  tone = "light",
  className = "",
}: Props) {
  const clamped = Math.max(0, Math.min(max, value));
  const { star, text, gap } = SIZE_CLASS[size];
  const valueClass = tone === "dark" ? "text-amber-300" : "text-amber-800";
  const countClass = tone === "dark" ? "text-white/75" : "text-slate-500";
  const emptyStarClass = tone === "dark" ? "text-white/25" : "text-slate-200";

  return (
    <div className={`inline-flex flex-wrap items-center gap-x-2 ${className}`}>
      <span className={`inline-flex items-center ${gap}`} aria-label={`평점 ${clamped}점 만점 ${max}점`}>
        {Array.from({ length: max }, (_, i) => {
          const fill = clamped >= i + 1 ? 1 : clamped >= i + 0.5 ? 0.5 : 0;
          return (
            <span key={i} className="relative inline-block">
              <Star className={`${star} ${emptyStarClass}`} aria-hidden />
              {fill > 0 ? (
                <span
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: fill === 1 ? "100%" : "50%" }}
                >
                  <Star className={`${star} fill-amber-400 text-amber-400`} aria-hidden />
                </span>
              ) : null}
            </span>
          );
        })}
      </span>
      {showValue ? (
        <span className={`font-semibold ${valueClass} ${text}`}>{clamped.toFixed(1)}</span>
      ) : null}
      {reviewCount != null && reviewCount > 0 ? (
        <span className={`${countClass} ${text}`}>({reviewCount.toLocaleString()}개 평가)</span>
      ) : null}
    </div>
  );
}

```

---

### `src/features/attractions/data/attraction-ratings.ts`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/features/attractions/data/attraction-ratings.ts` |
| **레이어** | Feature Data |
| **역할** | 정적 데이터 · 목업 · 시드 |
| **기능 모듈** | `features/attractions` |

```typescript
import type { AttractionResult, AttractionReview } from "@/server/ai/types";

type CuratedRating = {
  rating: number;
  reviewCount: number;
  reviews?: Omit<AttractionReview, "id">[];
};

/** 대표 명소 — 공개 여행 리뷰·가이드에서 널리 알려진 대략적 평점 */
const CURATED: Record<string, CuratedRating> = {
  "curated-dotonbori": {
    rating: 4.5,
    reviewCount: 28400,
    reviews: [
      {
        author: "김*현",
        rating: 5,
        createdAt: "2025-11-12",
        text: "밤에 네온과 글리코 간판 보러 갔는데 분위기 최고예요. 타코야키·오코노미야키 거리도 바로 옆이라 저녁 코스로 딱입니다.",
      },
      {
        author: "Park**",
        rating: 4,
        createdAt: "2025-10-03",
        text: "주말 밤에는 사람이 정말 많아요. 사진 찍으려면 평일 저녁이나 이른 시간을 추천합니다.",
      },
      {
        author: "이*수",
        rating: 5,
        createdAt: "2025-09-18",
        text: "먹거리 위주로 돌아다니기 좋고 오사카 여행의 하이라이트였어요.",
      },
    ],
  },
  "curated-usj": {
    rating: 4.6,
    reviewCount: 52100,
    reviews: [
      {
        author: "최*민",
        rating: 5,
        createdAt: "2025-12-01",
        text: "닌텐도 월드·해리포터 존 줄은 길지만 체험 자체는 기대 이상이었습니다. 앱으로 대기시간 확인 필수!",
      },
      {
        author: "Tanaka**",
        rating: 4,
        createdAt: "2025-08-22",
        text: "성수기에는 하루로 다 못 봐요. 오픈런과 익스프레스 패스 여부를 미리 정하세요.",
      },
    ],
  },
  "curated-osaka-castle": { rating: 4.4, reviewCount: 31200 },
  "curated-shinsekai": { rating: 4.3, reviewCount: 18600 },
  "curated-umeda-sky": { rating: 4.5, reviewCount: 22400 },
  "curated-kiyomizu": { rating: 4.6, reviewCount: 38900 },
  "curated-fushimi-inari": { rating: 4.7, reviewCount: 45200 },
  "curated-kinkakuji": { rating: 4.6, reviewCount: 34100 },
  "curated-arashiyama": { rating: 4.5, reviewCount: 29800 },
  "curated-tokyo-skytree": { rating: 4.5, reviewCount: 41500 },
  "curated-tokyo-tower": { rating: 4.4, reviewCount: 26700 },
  "curated-sensoji": { rating: 4.6, reviewCount: 37600 },
  "curated-shibuya": { rating: 4.3, reviewCount: 24100 },
  "curated-meiji": { rating: 4.7, reviewCount: 35800 },
  "curated-disneyland": { rating: 4.5, reviewCount: 48900 },
  "curated-teamlab": { rating: 4.4, reviewCount: 19200 },
  "curated-canal-city": { rating: 4.3, reviewCount: 15800 },
  "curated-dazaifu": { rating: 4.6, reviewCount: 21300 },
  "curated-ohori": { rating: 4.4, reviewCount: 12400 },
  "curated-nakasu": { rating: 4.5, reviewCount: 17600 },
  "curated-sapporo-clock": { rating: 4.2, reviewCount: 9800 },
  "curated-odori": { rating: 4.5, reviewCount: 14200 },
  "curated-sapporo-beer": { rating: 4.4, reviewCount: 16500 },
  "curated-susukino": { rating: 4.3, reviewCount: 11200 },
};

const CATEGORY_REVIEW_BASE: Record<string, number> = {
  theme_park: 12000,
  museum: 4500,
  zoo: 6000,
  aquarium: 5500,
  shrine: 8000,
  temple: 7500,
  historic_castle: 9000,
  park: 3500,
  viewpoint: 5000,
  attraction: 4200,
};

function hashId(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function estimateRating(id: string, category?: string): number {
  const h = hashId(id);
  const catBoost =
    category === "theme_park" || category === "shrine" || category === "temple" ? 0.15 : 0;
  const base = 3.7 + (h % 11) / 10 + catBoost;
  return Math.min(4.9, Math.round(base * 10) / 10);
}

function estimateReviewCount(id: string, category?: string): number {
  const base = CATEGORY_REVIEW_BASE[category ?? "attraction"] ?? 4000;
  const spread = hashId(`${id}-reviews`) % Math.floor(base * 0.6);
  return base + spread;
}

export function ratingToDistribution(
  rating: number,
): { stars: 1 | 2 | 3 | 4 | 5; percent: number }[] {
  const levels = [5, 4, 3, 2, 1] as const;
  const weights = levels.map((s) => Math.exp(-Math.pow(s - rating, 2) / 0.85));
  const sum = weights.reduce((a, b) => a + b, 0);
  const raw = weights.map((w) => Math.round((w / sum) * 100));
  const diff = 100 - raw.reduce((a, b) => a + b, 0);
  raw[0] += diff;
  return levels.map((stars, i) => ({ stars, percent: raw[i]! }));
}

const REVIEW_SNIPPETS: { minRating: number; text: string }[] = [
  {
    minRating: 4.5,
    text: "기대 이상으로 좋았어요. 사진·실제 풍경 모두 만족스러웠습니다.",
  },
  {
    minRating: 4,
    text: "전체적으로 추천할 만한 곳입니다. 동선만 미리 잡아두면 더 편해요.",
  },
  {
    minRating: 3.5,
    text: "볼거리는 괜찮은데 피크 시간대엔 혼잡합니다. 이른 시간 방문을 권합니다.",
  },
  {
    minRating: 0,
    text: "처음 일본 여행이라면 한번쯤 들러볼 만한 스팟이에요.",
  },
];

const AUTHORS = [
  "김*영",
  "Park**",
  "이*진",
  "佐藤**",
  "Wang**",
  "최*아",
  "田中**",
  "정*우",
];

function buildSampleReviews(
  name: string,
  category: string | undefined,
  rating: number,
  id: string,
): AttractionReview[] {
  const h = hashId(id);
  const catLabel =
    category === "theme_park"
      ? "테마파크"
      : category === "museum"
        ? "박물관"
        : category === "shrine" || category === "temple"
          ? "사찰·신사"
          : "명소";

  const snippets = REVIEW_SNIPPETS.filter((s) => rating >= s.minRating).slice(0, 3);
  const count = 2 + (h % 2);

  return Array.from({ length: count }, (_, i) => {
    const snippet = snippets[i % snippets.length] ?? REVIEW_SNIPPETS[REVIEW_SNIPPETS.length - 1]!;
    const reviewRating = Math.min(5, Math.max(3, Math.round(rating) + (i === 0 ? 0 : -1)));
    const month = 8 + ((h + i) % 5);
    const day = 1 + ((h >> i) % 26);
    return {
      id: `${id}-review-${i}`,
      author: AUTHORS[(h + i) % AUTHORS.length]!,
      rating: reviewRating,
      createdAt: `2025-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
      text: `${name}(${catLabel}) — ${snippet.text}`,
    };
  });
}

function withIds(
  id: string,
  reviews: Omit<AttractionReview, "id">[] | undefined,
): AttractionReview[] | undefined {
  if (!reviews?.length) return undefined;
  return reviews.map((r, i) => ({ ...r, id: `${id}-curated-review-${i}` }));
}

/** 관광지 목록에 평점·리뷰·별점 분포를 붙입니다 */
export function enrichAttractionsWithRatings(
  items: AttractionResult[],
): AttractionResult[] {
  return items.map((item) => {
    const curated = CURATED[item.id];
    const rating = curated?.rating ?? estimateRating(item.id, item.category);
    const reviewCount = curated?.reviewCount ?? estimateReviewCount(item.id, item.category);
    const reviews =
      withIds(item.id, curated?.reviews) ??
      buildSampleReviews(item.name, item.category, rating, item.id);

    return {
      ...item,
      rating,
      reviewCount,
      ratingDistribution: ratingToDistribution(rating),
      reviews,
    };
  });
}

```

---

### `src/features/attractions/data/famous-landmarks.ts`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/features/attractions/data/famous-landmarks.ts` |
| **레이어** | Feature Data |
| **역할** | 정적 데이터 · 목업 · 시드 |
| **기능 모듈** | `features/attractions` |

```typescript
import type { JapanRegionId } from "@/shared/lib/constants";
import type { OverpassPlace } from "@/server/attractions/travel-client";

/** 여행자가 기대하는 대표 명소 — Overpass 결과보다 항상 우선 노출 */
export type FamousLandmark = {
  id: string;
  region: JapanRegionId;
  nameKo: string;
  nameJa: string;
  lat: number;
  lng: number;
  category: string;
  wikipediaTag?: string;
  /** 위키 실패 시 카드용 짧은 설명 */
  fallbackDescription: string;
};

const LANDMARKS: FamousLandmark[] = [
  // —— 오사카·교토 ——
  {
    id: "curated-dotonbori",
    region: "OSAKA_KYOTO",
    nameKo: "도톤보리",
    nameJa: "道頓堀",
    lat: 34.6687,
    lng: 135.5013,
    category: "attraction",
    wikipediaTag: "ja:道頓堀",
    fallbackDescription: "글리코 간판과 먹거리 거리로 유명한 오사카 대표 번화가입니다.",
  },
  {
    id: "curated-usj",
    region: "OSAKA_KYOTO",
    nameKo: "유니버설 스튜디오 재팬",
    nameJa: "ユニバーサル・スタジオ・ジャパン",
    lat: 34.6654,
    lng: 135.4323,
    category: "theme_park",
    wikipediaTag: "ja:ユニバーサル・スタジオ・ジャパン",
    fallbackDescription: "해리포터·닌텐도 등 테마 존으로 유명한 대형 테마파크입니다.",
  },
  {
    id: "curated-osaka-castle",
    region: "OSAKA_KYOTO",
    nameKo: "오사카성",
    nameJa: "大阪城",
    lat: 34.6873,
    lng: 135.5262,
    category: "historic_castle",
    wikipediaTag: "ja:大阪城",
    fallbackDescription: "오사카의 상징적인 성곽과 공원으로, 전망대·박물관을 함께 둘러볼 수 있습니다.",
  },
  {
    id: "curated-shinsekai",
    region: "OSAKA_KYOTO",
    nameKo: "신세카이·츠utenkaku",
    nameJa: "通天閣",
    lat: 34.6525,
    lng: 135.5063,
    category: "viewpoint",
    wikipediaTag: "ja:通天閣",
    fallbackDescription: "레트로 거리와 타워 전망이 인기 있는 오사카 남부 명소입니다.",
  },
  {
    id: "curated-umeda-sky",
    region: "OSAKA_KYOTO",
    nameKo: "우메다 스카이 빌딩",
    nameJa: "梅田スカイビル",
    lat: 34.7055,
    lng: 135.4900,
    category: "viewpoint",
    wikipediaTag: "ja:梅田スカイビル",
    fallbackDescription: "공중 정원 전망대로 오사카 시내 야경을 보기 좋습니다.",
  },
  {
    id: "curated-kiyomizu",
    region: "OSAKA_KYOTO",
    nameKo: "기요미즈데라",
    nameJa: "清水寺",
    lat: 34.9949,
    lng: 135.7850,
    category: "temple",
    wikipediaTag: "ja:清水寺",
    fallbackDescription: "교토를 대표하는 목조 사찰로, 오래된 거리와 함께 방문합니다.",
  },
  {
    id: "curated-fushimi-inari",
    region: "OSAKA_KYOTO",
    nameKo: "후시미 이나리 신사",
    nameJa: "伏見稲荷大社",
    lat: 34.9671,
    lng: 135.7727,
    category: "shrine",
    wikipediaTag: "ja:伏見稲荷大社",
    fallbackDescription: "수천 기의 붉은 도리이가 이어지는 일본에서 가장 유명한 신사 중 하나입니다.",
  },
  {
    id: "curated-kinkakuji",
    region: "OSAKA_KYOTO",
    nameKo: "금각사",
    nameJa: "金閣寺",
    lat: 35.0394,
    lng: 135.7292,
    category: "temple",
    wikipediaTag: "ja:金閣寺",
    fallbackDescription: "금박으로 덮인 삼층 탑이 호수에 비치는 교토의 대표 사찰입니다.",
  },
  {
    id: "curated-arashiyama",
    region: "OSAKA_KYOTO",
    nameKo: "아라시야마",
    nameJa: "嵐山",
    lat: 35.0094,
    lng: 135.6772,
    category: "attraction",
    wikipediaTag: "ja:嵐山",
    fallbackDescription: "대나무 숲·도게츠교·토리이 터널로 유명한 교토 서쪽 관광지입니다.",
  },
  // —— 도쿄 ——
  {
    id: "curated-tokyo-skytree",
    region: "TOKYO",
    nameKo: "도쿄 스카이트리",
    nameJa: "東京スカイツリー",
    lat: 35.7101,
    lng: 139.8107,
    category: "viewpoint",
    wikipediaTag: "ja:東京スカイツリー",
    fallbackDescription: "도쿄의 랜드마크 타워로 전망대와 쇼핑·아쿠아리움을 즐길 수 있습니다.",
  },
  {
    id: "curated-tokyo-tower",
    region: "TOKYO",
    nameKo: "도쿄 타워",
    nameJa: "東京タワー",
    lat: 35.6586,
    lng: 139.7454,
    category: "viewpoint",
    wikipediaTag: "ja:東京タワー",
    fallbackDescription: "도쿄 시내를 한눈에 보는 클래식 전망 타워입니다.",
  },
  {
    id: "curated-sensoji",
    region: "TOKYO",
    nameKo: "센소지·아사쿠사",
    nameJa: "浅草寺",
    lat: 35.7148,
    lng: 139.7967,
    category: "temple",
    wikipediaTag: "ja:浅草寺",
    fallbackDescription: "나카미세 거리와 함께 도쿄에서 가장 유명한 전통 사찰입니다.",
  },
  {
    id: "curated-shibuya",
    region: "TOKYO",
    nameKo: "시부야 스크램블 교차로",
    nameJa: "渋谷スクランブル交差点",
    lat: 35.6595,
    lng: 139.7005,
    category: "attraction",
    wikipediaTag: "ja:渋谷スクランブル交差点",
    fallbackDescription: "세계적으로 유명한 교차로와 하치코 동상이 있는 도쿄의 상징입니다.",
  },
  {
    id: "curated-meiji",
    region: "TOKYO",
    nameKo: "메이지 신궁",
    nameJa: "明治神宮",
    lat: 35.6764,
    lng: 139.6993,
    category: "shrine",
    wikipediaTag: "ja:明治神宮",
    fallbackDescription: "도심 속 숲길과 거대한 도리이가 있는 도쿄 대표 신사입니다.",
  },
  {
    id: "curated-disneyland",
    region: "TOKYO",
    nameKo: "도쿄 디즈니랜드",
    nameJa: "東京ディズニーランド",
    lat: 35.6329,
    lng: 139.8804,
    category: "theme_park",
    wikipediaTag: "ja:東京ディズニーランド",
    fallbackDescription: "일본 최초의 디즈니 테마파크로 가족·커플 여행에 인기입니다.",
  },
  {
    id: "curated-teamlab",
    region: "TOKYO",
    nameKo: "teamLab Planets",
    nameJa: "チームラボ プラネッツ TOKYO DMM",
    lat: 35.6492,
    lng: 139.7896,
    category: "museum",
    wikipediaTag: "ja:チームラボ",
    fallbackDescription: "몰입형 디지털 아트 전시로 SNS에서 인기 있는 도쿄 명소입니다.",
  },
  // —— 후쿠오카 ——
  {
    id: "curated-canal-city",
    region: "FUKUOKA",
    nameKo: "캐널 시티 하카타",
    nameJa: "キャナルシティ博多",
    lat: 33.5892,
    lng: 130.4110,
    category: "attraction",
    wikipediaTag: "ja:キャナルシティ博多",
    fallbackDescription: "운하와 쇼핑·공연을 함께 즐기는 후쿠오카 대표 복합몰입니다.",
  },
  {
    id: "curated-dazaifu",
    region: "FUKUOKA",
    nameKo: "다자이후 텐만구",
    nameJa: "太宰府天満宮",
    lat: 33.5212,
    lng: 130.5349,
    category: "shrine",
    wikipediaTag: "ja:太宰府天満宮",
    fallbackDescription: "학업·시험 기원으로 유명한 규슈 최대급 신사입니다.",
  },
  {
    id: "curated-ohori",
    region: "FUKUOKA",
    nameKo: "오호리 공원",
    nameJa: "大濠公園",
    lat: 33.5860,
    lng: 130.3758,
    category: "park",
    wikipediaTag: "ja:大濠公園",
    fallbackDescription: "호수를 둘러싼 산책로와 후쿠오카 성 인근 휴식 명소입니다.",
  },
  {
    id: "curated-nakasu",
    region: "FUKUOKA",
    nameKo: "나카스·야타이",
    nameJa: "中洲",
    lat: 33.5934,
    lng: 130.4067,
    category: "attraction",
    wikipediaTag: "ja:中洲 (福岡市)",
    fallbackDescription: "포장마차(야타이) 거리로 유명한 후쿠오카의 먹거리 중심지입니다.",
  },
  // —— 삿포로 ——
  {
    id: "curated-sapporo-clock",
    region: "SAPPORO",
    nameKo: "삿포로 시계탑",
    nameJa: "札幌市時計台",
    lat: 43.0629,
    lng: 141.3544,
    category: "historic_monument",
    wikipediaTag: "ja:札幌市時計台",
    fallbackDescription: "삿포로 시내의 상징적인 목조 시계탑입니다.",
  },
  {
    id: "curated-odori",
    region: "SAPPORO",
    nameKo: "오도리 공원",
    nameJa: "大通公園",
    lat: 43.0603,
    lng: 141.3508,
    category: "park",
    wikipediaTag: "ja:大通公園",
    fallbackDescription: "눈 축제·맥주 축제가 열리는 삿포로 중심 공원입니다.",
  },
  {
    id: "curated-sapporo-beer",
    region: "SAPPORO",
    nameKo: "삿포로 맥주 박물관",
    nameJa: "サッポロビール博物館",
    lat: 43.0714,
    lng: 141.3689,
    category: "museum",
    wikipediaTag: "ja:サッポロビール博物館",
    fallbackDescription: "맥주 시음과 홋카이도 역사를 함께 즐길 수 있는 인기 스팟입니다.",
  },
  {
    id: "curated-susukino",
    region: "SAPPORO",
    nameKo: "스스키노",
    nameJa: "すすきの",
    lat: 43.0554,
    lng: 141.3530,
    category: "attraction",
    wikipediaTag: "ja:すすきの",
    fallbackDescription: "삿포로의 번화가로 식당·야경이 유명합니다.",
  },
];

export function getFamousLandmarksForRegion(region: JapanRegionId): FamousLandmark[] {
  return LANDMARKS.filter((l) => l.region === region);
}

export function landmarkToOverpassPlace(l: FamousLandmark): OverpassPlace {
  return {
    id: l.id,
    name: l.nameJa,
    nameKo: l.nameKo,
    nameJa: l.nameJa,
    lat: l.lat,
    lng: l.lng,
    category: l.category,
    wikipediaTag: l.wikipediaTag,
  };
}

const FALLBACK_BY_ID = new Map(LANDMARKS.map((l) => [l.id, l.fallbackDescription]));

export function getLandmarkFallbackDescription(id: string): string | undefined {
  return FALLBACK_BY_ID.get(id);
}

```

---

### `src/features/attractions/index.ts`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/features/attractions/index.ts` |
| **레이어** | Feature Barrel |
| **역할** | 기능 모듈 public export |
| **기능 모듈** | `features/attractions` |

```typescript
export { AttractionList } from "./components/attraction-list";
export { AttractionDetailModal } from "./components/attraction-detail-modal";

```

---

### `src/features/attractions/lib/region-map.ts`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/features/attractions/lib/region-map.ts` |
| **레이어** | Feature Lib |
| **역할** | 기능별 유틸 · 필터 · 매핑 |
| **기능 모듈** | `features/attractions` |

```typescript
import type { JapanRegionId } from "@/shared/lib/constants";

export const REGION_MAP_VIEW: Record<
  JapanRegionId,
  { lat: number; lng: number; zoom: number }
> = {
  TOKYO: { lat: 35.6812, lng: 139.7671, zoom: 11 },
  OSAKA_KYOTO: { lat: 34.9858, lng: 135.7588, zoom: 11 },
  FUKUOKA: { lat: 33.5904, lng: 130.4017, zoom: 12 },
  SAPPORO: { lat: 43.0618, lng: 141.3545, zoom: 11 },
};

export function hasValidCoords(lat: number, lng: number) {
  return Number.isFinite(lat) && Number.isFinite(lng) && !(lat === 0 && lng === 0);
}

```

---

### `src/features/attractions/server/attractions.service.ts`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/features/attractions/server/attractions.service.ts` |
| **레이어** | Feature Server |
| **역할** | 기능별 서버 로직 · DB · 비즈니스 규칙 |
| **기능 모듈** | `features/attractions` |

```typescript
import {
  fetchAttractions,
  fetchWikiDetailsBatch,
  type OverpassPlace,
  type WikiDetail,
} from "@/server/attractions/travel-client";
import { enrichAttractionsWithRatings } from "@/features/attractions/data/attraction-ratings";
import { searchGoogleAttractions } from "@/server/google-places/attractions";
import { hasGooglePlacesKey } from "@/server/google-places/client";
import {
  getFamousLandmarksForRegion,
  getLandmarkFallbackDescription,
  landmarkToOverpassPlace,
} from "@/features/attractions/data/famous-landmarks";
import type { AttractionResult } from "@/server/ai/types";
import { applyFromMap, buildKoTranslationMap } from "@/server/translate/ko-map";
import type { JapanRegionId } from "@/shared/lib/constants";

const CACHE_VERSION = 5;

type RegionSpot = { lat: number; lon: number; radius: number };

/**
 * 지역별 검색 거점. Overpass POST 는 Next fetch 캐시가 적용되지 않아
 * 거점이 많을수록 rate-limit/timeout 위험이 커집니다.
 * 그래서 도시별로 1~2 거점에 충분히 큰 반경을 쓰고, 결과는 메모리 캐시합니다.
 */
const REGION_SPOTS: Record<JapanRegionId, RegionSpot[]> = {
  TOKYO: [{ lat: 35.6812, lon: 139.7671, radius: 8000 }],
  OSAKA_KYOTO: [
    { lat: 34.6937, lon: 135.5023, radius: 8000 }, // 오사카 중심
    { lat: 35.0116, lon: 135.7681, radius: 8000 }, // 교토 중심
  ],
  FUKUOKA: [{ lat: 33.5902, lon: 130.4017, radius: 9000 }],
  SAPPORO: [{ lat: 43.0686, lon: 141.3508, radius: 10000 }],
};

const CACHE_TTL_MS = 60 * 60 * 1000;
/** 한 지역에서 카드로 보일 최대 개수 (대표 명소 + Overpass 보충) */
const MAX_RESULTS_PER_REGION = 50;
const MAX_OVERPASS_POOL = 70;
type CacheEntry = { expires: number; data: AttractionResult[]; version: number };
const memoryCache = new Map<JapanRegionId, CacheEntry>();

function isCuratedId(id: string) {
  return id.startsWith("curated-");
}

/** 같은 장소가 Overpass와 중복되면 대표 명소 쪽을 남깁니다 */
function mergePlaces(curated: OverpassPlace[], fromOverpass: OverpassPlace[]): OverpassPlace[] {
  const out = [...curated];
  const near = (a: OverpassPlace, b: OverpassPlace) => {
    const dLat = Math.abs(a.lat - b.lat);
    const dLng = Math.abs(a.lng - b.lng);
    return dLat < 0.008 && dLng < 0.008;
  };
  const sameName = (a: OverpassPlace, b: OverpassPlace) => {
    const ak = (a.nameKo ?? a.nameJa ?? a.name).toLowerCase();
    const bk = (b.nameKo ?? b.nameJa ?? b.name).toLowerCase();
    return ak === bk || ak.includes(bk) || bk.includes(ak);
  };

  for (const p of fromOverpass) {
    if (out.some((c) => c.id === p.id)) continue;
    if (out.some((c) => near(c, p) || sameName(c, p))) continue;
    out.push(p);
  }
  return out;
}

function dedupe<T extends { id: string }>(items: T[]): T[] {
  const seen = new Set<string>();
  const out: T[] = [];
  for (const it of items) {
    if (seen.has(it.id)) continue;
    seen.add(it.id);
    out.push(it);
  }
  return out;
}

const HANGUL_RE = /[가-힣]/;

function pickDisplayName(place: OverpassPlace, detail: WikiDetail): string {
  if (detail.lang === "ko") return detail.title;
  if (place.nameKo) return place.nameKo;
  return detail.title || place.name;
}

function getTokyoNow() {
  const now = new Date();
  const hour = Number(
    new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      hour12: false,
      timeZone: "Asia/Tokyo",
    }).format(now),
  );
  const weekday = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    timeZone: "Asia/Tokyo",
  }).format(now);
  const isWeekend = weekday === "Sat" || weekday === "Sun";
  return { hour, isWeekend };
}

function estimateCrowd(
  category: string | undefined,
): Pick<
  AttractionResult,
  "crowdLevel" | "estimatedWaitMinutes" | "crowdReason" | "recommendedTimeSlots" | "bestVisitTags"
> {
  const { hour, isWeekend } = getTokyoNow();
  const c = category ?? "attraction";
  const isThemeLike = c === "theme_park" || c === "zoo" || c === "aquarium";
  const isMuseumLike = c === "museum" || c === "gallery";
  const isShrineLike = c === "shrine" || c === "temple" || c === "place_of_worship";
  const isParkLike = c === "park" || c === "garden";

  let score = 35;
  if (isThemeLike) score += 30;
  else if (isMuseumLike) score += 20;
  else if (isShrineLike) score += 10;
  else if (isParkLike) score += 5;

  if (isWeekend) score += 20;
  if (hour >= 11 && hour <= 15) score += 25;
  else if ((hour >= 9 && hour <= 10) || (hour >= 16 && hour <= 18)) score += 10;
  else if (hour >= 19 || hour <= 8) score -= 15;

  score = Math.max(5, Math.min(95, score));

  const crowdLevel = score >= 70 ? "HIGH" : score >= 45 ? "MEDIUM" : "LOW";
  const estimatedWaitMinutes =
    crowdLevel === "HIGH" ? (isThemeLike ? 55 : 35) : crowdLevel === "MEDIUM" ? 15 : 5;

  const recommendedTimeSlots = isThemeLike
    ? ["08:30-10:30", "18:00-20:00"]
    : isMuseumLike
      ? ["09:00-11:00", "16:30-18:00"]
      : isShrineLike
        ? ["07:00-09:30", "17:00-19:00"]
        : isParkLike
          ? ["07:00-10:00", "17:00-19:30"]
          : ["08:00-10:00", "17:00-19:00"];

  const baseTag = crowdLevel === "HIGH" ? "혼잡 시간대 주의" : crowdLevel === "MEDIUM" ? "보통 혼잡" : "비교적 여유";
  const timeTag = `추천 ${recommendedTimeSlots[0]}`;
  const dayTag = isWeekend ? "주말 기준" : "평일 기준";

  return {
    crowdLevel,
    estimatedWaitMinutes,
    crowdReason: `도착지 현지시간(${hour}시)·${isWeekend ? "주말" : "평일"}·카테고리(${c}) 기준 추정`,
    recommendedTimeSlots,
    bestVisitTags: [baseTag, timeTag, dayTag],
  };
}

function toResult(place: OverpassPlace, detail: WikiDetail): AttractionResult {
  const displayName = pickDisplayName(place, detail);
  const crowd = estimateCrowd(place.category);
  return {
    id: place.id,
    name: displayName,
    nameKo: HANGUL_RE.test(displayName) ? displayName : place.nameKo,
    lat: place.lat,
    lng: place.lng,
    category: place.category,
    description: detail.description,
    imageUrl: detail.imageUrl,
    wikiUrl: detail.wikiUrl,
    crowdLevel: crowd.crowdLevel,
    estimatedWaitMinutes: crowd.estimatedWaitMinutes,
    crowdReason: crowd.crowdReason,
    recommendedTimeSlots: crowd.recommendedTimeSlots,
    bestVisitTags: crowd.bestVisitTags,
  };
}

function rankKoreanFirst(a: AttractionResult, b: AttractionResult): number {
  const ak = HANGUL_RE.test(a.name) ? 0 : 1;
  const bk = HANGUL_RE.test(b.name) ? 0 : 1;
  return ak - bk;
}

/** DeepL로 이름·설명·태그 등 일·영 잔여 문구를 한국어로 통일 */
async function applyKoTranslations(
  items: AttractionResult[],
): Promise<AttractionResult[]> {
  if (items.length === 0) return items;

  const texts = items.flatMap((i) => [
    i.name,
    i.description,
    i.crowdReason,
    i.tips,
    i.address,
    ...(i.bestVisitTags ?? []),
    ...(i.highlights ?? []),
    ...(i.reviews?.map((r) => r.text) ?? []),
  ]);

  const map = await buildKoTranslationMap(texts);

  return items.map((i) => {
    const name = applyFromMap(i.name, map) ?? i.name;
    return {
      ...i,
      name,
      nameKo: HANGUL_RE.test(name) ? name : i.nameKo,
      description: applyFromMap(i.description, map),
      crowdReason: applyFromMap(i.crowdReason, map),
      tips: applyFromMap(i.tips, map),
      address: applyFromMap(i.address, map),
      bestVisitTags: i.bestVisitTags?.map((t) => applyFromMap(t, map) ?? t),
      highlights: i.highlights?.map((h) => applyFromMap(h, map) ?? h),
      reviews: i.reviews?.map((r) => ({
        ...r,
        text: applyFromMap(r.text, map) ?? r.text,
      })),
    };
  });
}

function attachCrowdEstimates(items: AttractionResult[]): AttractionResult[] {
  return items.map((item) => {
    const crowd = estimateCrowd(item.category);
    return { ...item, ...crowd };
  });
}

async function fetchFromGoogle(region: JapanRegionId): Promise<AttractionResult[] | null> {
  const fromGoogle = await searchGoogleAttractions(region);
  if (!fromGoogle?.length) return null;
  const withCrowd = attachCrowdEstimates(fromGoogle);
  return applyKoTranslations(withCrowd);
}

/**
 * 카테고리 우선순위 — 박물관·테마파크·역사 사적 같은 "확실한 관광지"를 앞에 두어
 * Wikipedia 배치 상한(50개)에 잘려도 핵심이 빠지지 않도록 정렬합니다.
 */
const CATEGORY_PRIORITY: Record<string, number> = {
  museum: 0,
  theme_park: 0,
  zoo: 0,
  aquarium: 0,
  gallery: 0,
  historic_castle: 1,
  historic_monument: 1,
  historic_memorial: 1,
  shrine: 1,
  temple: 1,
  garden: 2,
  park: 2,
  viewpoint: 3,
  attraction: 4,
};

function rankPlaceForEnrichment(a: OverpassPlace, b: OverpassPlace): number {
  const ca = isCuratedId(a.id) ? -10 : 0;
  const cb = isCuratedId(b.id) ? -10 : 0;
  if (ca !== cb) return ca - cb;
  const pa = CATEGORY_PRIORITY[a.category] ?? 5;
  const pb = CATEGORY_PRIORITY[b.category] ?? 5;
  if (pa !== pb) return pa - pb;
  const wa = a.wikipediaTag ? 0 : 1;
  const wb = b.wikipediaTag ? 0 : 1;
  return wa - wb;
}

function rankFinalResults(a: AttractionResult, b: AttractionResult): number {
  const ca = isCuratedId(a.id) ? 0 : 1;
  const cb = isCuratedId(b.id) ? 0 : 1;
  if (ca !== cb) return ca - cb;
  return rankKoreanFirst(a, b);
}

/**
 * 지정 지역의 관광지를 가져옵니다.
 * - GOOGLE_PLACES_API_KEY 있으면 Google Places nearby 검색 (맛집과 동일)
 * - 없거나 실패 시 Overpass(OSM) + Wikipedia 폴백
 */
export async function getAttractionsByRegion(
  region: JapanRegionId,
): Promise<AttractionResult[]> {
  const now = Date.now();
  const cached = memoryCache.get(region);
  if (
    cached &&
    cached.version === CACHE_VERSION &&
    cached.expires > now &&
    cached.data.length > 0
  ) {
    return cached.data;
  }

  if (hasGooglePlacesKey()) {
    const fromGoogle = await fetchFromGoogle(region);
    if (fromGoogle?.length) {
      memoryCache.set(region, {
        expires: now + CACHE_TTL_MS,
        data: fromGoogle,
        version: CACHE_VERSION,
      });
      return fromGoogle;
    }
  }

  const spots = REGION_SPOTS[region];
  if (!spots?.length) return [];

  const curatedPlaces = getFamousLandmarksForRegion(region).map(landmarkToOverpassPlace);

  const lists = await Promise.all(
    spots.map((spot) => fetchAttractions(spot.lat, spot.lon, spot.radius, MAX_OVERPASS_POOL)),
  );
  const overpassPlaces = dedupe(lists.flat());
  const mergedPlaces = mergePlaces(curatedPlaces, overpassPlaces).sort(rankPlaceForEnrichment);
  if (mergedPlaces.length === 0) return [];

  const candidates = mergedPlaces.slice(0, MAX_RESULTS_PER_REGION + curatedPlaces.length);
  const detailMap = await fetchWikiDetailsBatch(candidates);

  const items: AttractionResult[] = [];
  for (const place of candidates) {
    const detail = detailMap.get(place.id);
    const fallback = getLandmarkFallbackDescription(place.id);
    if (detail?.description) {
      items.push(toResult(place, detail));
    } else if (fallback) {
      items.push(
        toResult(place, {
          title: place.nameKo ?? place.nameJa ?? place.name,
          description: fallback,
          lang: "ko",
        }),
      );
    }
  }
  items.sort(rankFinalResults);
  const translated = await applyKoTranslations(items);
  const withRatings = enrichAttractionsWithRatings(translated);

  if (withRatings.length >= 5) {
    memoryCache.set(region, {
      expires: now + CACHE_TTL_MS,
      data: withRatings,
      version: CACHE_VERSION,
    });
  }
  return withRatings;
}

/** 기존 호출처 호환용 별칭 */
export async function listAttractions(region: JapanRegionId) {
  return getAttractionsByRegion(region);
}

```

---

### `src/features/attractions/server/details.ts`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/features/attractions/server/details.ts` |
| **레이어** | Feature Server |
| **역할** | 기능별 서버 로직 · DB · 비즈니스 규칙 |
| **기능 모듈** | `features/attractions` |

```typescript
/** 관광지 상세 설명 (mock — AI 연동 시 대체 가능) */
export const ATTRACTION_DETAILS: Record<
  string,
  { description: string; highlights: string[]; address: string; tips: string }
> = {
  "osaka-castle": {
    description:
      "오사카의 상징인 일본 3대 명성 중 하나. 16세기 도요토미 히데요시가 쌓은 성으로, 현재는 박물관과 전망대가 있습니다. 봄 벚꽃·단풍 시즌에 특히 아름답습니다.",
    highlights: ["천수각 전망", "성곽 산책", "봄·가을 야간 개장(시즌)"],
    address: "오사카부 오사카시 주오구 오사카조 1-1",
    tips: "오전 개장 직후나 평일 오후가 상대적으로 한산합니다. 지하철 조자바시역·모리노미야역 도보 10분.",
  },
  "fushimi-inari": {
    description:
      "수많은 주황색 도리이가 산길을 따라 이어지는 교토 대표 신사. 비즈니스·풍요의 신 이나리신을 모시며, 천본도리(千本鳥居)가 유명합니다.",
    highlights: ["천본도리 포토스팟", "야마데라 산책 코스", "24시간 자유 참배"],
    address: "교토부 교토시 후시미구 후쿠akusa야부노우치초 68",
    tips: "사진 촬영은 이른 아침(7시 전후) 추천. 정상까지 왕복 약 2~3시간, 편한 신발 필수.",
  },
  kiyomizu: {
    description:
      "교토 동쪽 산비탈에 있는 유네스코 세계문화유산 사찰. 「기요미즈의 무대」로 불리는 본당 전망대에서 교토 시가지를 한눈에 볼 수 있습니다.",
    highlights: ["기요미즈 무대", "오쿠노인 폭포", "산넨자카·니넨자카 거리"],
    address: "교토부 교토시 히가시야마구 기요미즈 1-294",
    tips: "가을 단풍·봄 벚꽃 시즌 혼잡. 저녁 특별 참관(시즌)은 예약·사전 확인 권장.",
  },
  arashiyama: {
    description:
      "교토 서쪽의 자연과 사찰이 어우러진 지역. 사가노 대나무숲 길은 400m가량 이어지며, 바람에 흔들리는 대나무 소리가 인상적입니다.",
    highlights: ["대나무숲 산책로", "도게츠교·호조지 연", "아라시야마 원시림"],
    address: "교토부 교토시 우쿄구 사가노이와타니초",
    tips: "오전 9시 이전 방문 시 인파를 피하기 쉽습니다. 렌터 사이클로 사가노 일대를 돌아보는 것도 인기.",
  },
  ohori: {
    description:
      "후쿠오카 시내 중심의 대형 연못 공원. 조깅·피크닉·보트를 즐기며, 인근 후쿠오카성과 함께 반나절 코스로 묶기 좋습니다.",
    highlights: ["호수 산책로", "벚꽃·단풍", "후쿠오카성 인접"],
    address: "후쿠오카현 후쿠오카시 주오구 오호리코엔",
    tips: "저녁 노을·야경이 아름답습니다. 맞은편 후쿠오카성 산책과 함께 2~3시간 일정 추천.",
  },
  dazaifu: {
    description:
      "학문의 신 텐만구의 총본궁. 매년 수험생·가족 방문객이 많으며, 참배길 양쪽의 상점가에서 우메가에모치(매화 과자)가 유명합니다.",
    highlights: ["본전 참배", "우메가에모치 거리", "규슈국립박물관(인근)"],
    address: "후쿠오카현 다자이후시 사이온 4-7-1",
    tips: "하카타역에서 Nishitetsu 특급 약 30분. 주말·연말연시 혼잡, 평일 오전이 여유롭습니다.",
  },
  "canal-city": {
    description:
      "운하를 테마로 한 복합 쇼핑·엔터테인먼트 시설. 영화관, 레스토랑, 쇼핑몰이 모여 있으며 정기 분수·라이트쇼가 열립니다.",
    highlights: ["캐널 분수쇼", "라멘 스타디움", "쇼핑·영화"],
    address: "후쿠오카현 후쿠오카시 하카타구 스미요시 1-2",
    tips: "분수쇼 시간표는 홈페이지에서 확인. 저녁 식사 후 야경·쇼핑 코스로 인기.",
  },
  sensoji: {
    description:
      "도쿄에서 가장 오래된 사원으로, 웅장한 카미나리몬과 나카미세 상점가가 유명합니다. 아사쿠사 일대 전통 분위기를 느낄 수 있습니다.",
    highlights: ["카미나리몬", "나카미세 거리", "본당·오시드시"],
    address: "도쿄도 다이토구 아사쿠사 2-3-1",
    tips: "오전 8~9시경 한산. 인력거 체험·기모노 대여는 예약·요금 사전 확인.",
  },
  "shibuya-sky": {
    description:
      "시부야 스クランブル 교차로와 도쿄 시내를 360도로 내려다보는 루프탑 전망대. 일몰·야경 시간대가 특히 인기 있습니다.",
    highlights: ["360° 전망", "일몰·야경", "시부야 스크램블"],
    address: "도쿄도 시부야구 시부야 2-24-12",
    tips: "일몰 1시간 전 예약·입장 권장. 겨울철 강풍 시 야외 구역 일부 폐쇄 가능.",
  },
  meiji: {
    description:
      "도심 속 거대한 숲으로 둘러싸인 신궁. 메이지 천황을 모시며, 신궁 정원·와인·술 봉헌 등 도쿄 한가운데서 자연을 느낄 수 있습니다.",
    highlights: ["거대 도리이", "삼림 산책", "와인·술 봉헌"],
    address: "도쿄도 시부야구 요요기카미조노초 1-1",
    tips: "하라주쿠역·메이지진구마에역 도보. 신년 참배(하죠네) 시즌은 매우 혼잡.",
  },
  "clock-tower": {
    description:
      "삿포로 시민의 상징인 서양식 시계탑. 19세기 말 건립, 붉은 벽돌 외관이 특징이며 실내 전시도 관람할 수 있습니다.",
    highlights: ["역사 건축", "시내 중심 접근성", "겨울 설경"],
    address: "홋카이도 삿포로시 주오구 키타 1조 서 2",
    tips: "오도리 공원·삿포로역과 도보권. 실내 관람은 200엔, 겨울철 주변 눈 축제와 함께 방문.",
  },
  odori: {
    description:
      "삿포로 시가지를 동서로 가르는 대공원. 2월 삿포로 눈축제의 메인 회장이 되며, 여름엔 맥주가든·라벤더 등 시즌 행사가 열립니다.",
    highlights: ["눈축제 메인", "여름 맥주가든", "TV 타워 전망"],
    address: "홋카이도 삿포로시 주오구 오도리공원",
    tips: "눈축제 기간(2월) 숙소·교통은 수개월 전 예약 권장. 야간 조명이 하이라이트.",
  },
  susukino: {
    description:
      "삿포로 최대 번화가. 라멘 요코초·스스키노 맥주 박물관 등 먹거리가 풍부하며, 겨울철 눈마을·빙설 축제와 연계하기 좋습니다.",
    highlights: ["삿포로 맥주", "라멘 요코초", "겨울 먹거리"],
    address: "홋카이도 삿포로시 미나미구 스스키노",
    tips: "맥주 박물관 투어는 한국어 오디오 가능. 저녁~야간 식사·술 코스로 일정 잡기 좋음.",
  },
};

export function enrichAttraction<T extends { id: string }>(item: T): T & {
  description?: string;
  highlights?: string[];
  address?: string;
  tips?: string;
} {
  const d = ATTRACTION_DETAILS[item.id];
  if (!d) return item;
  return { ...item, ...d };
}

```

---

### `src/features/attractions/server/index.ts`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/features/attractions/server/index.ts` |
| **레이어** | Feature Server |
| **역할** | 기능별 서버 로직 · DB · 비즈니스 규칙 |
| **기능 모듈** | `features/attractions` |

```typescript
export { listAttractions, getAttractionsByRegion } from "./attractions.service";

```

---

### `src/features/attractions/server/mock-data.ts`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/features/attractions/server/mock-data.ts` |
| **레이어** | Feature Server |
| **역할** | 기능별 서버 로직 · DB · 비즈니스 규칙 |
| **기능 모듈** | `features/attractions` |

```typescript
import type { JapanRegionId } from "@/shared/lib/constants";
import type { AttractionResult } from "@/server/ai/types";

/** Unsplash — 관광지별 실제 사진 ID (images.unsplash.com/photo-...) */
const P = {
  osakaCastle: "photo-1773467223754-b9f3eb4d2c0f",
  fushimiClassic: "photo-1493976040374-85c8e12f0c0e",
  fushimiSenbon: "photo-1758470476240-dcbd04d3f799",
  kiyomizu: "photo-1709879414740-1b4506c7af86",
  kiyomizuHill: "photo-1636089041210-247aeb5a2144",
  bambooPath: "photo-1698618988744-737573cb6a7a",
  bambooForest: "photo-1704026438453-fde2ceb923ad",
  ohoriPark: "photo-1759547808543-5c11c3d308c8",
  fukuokaCanal: "photo-1757482040351-27ac6fe0c7f6",
  fukuokaShrine: "photo-1744273556970-d5cff25b2b4a",
  sensojiGate: "photo-1580167227251-be70f01b0c51",
  sensojiNakamise: "photo-1628523197648-74f46812c7d7",
  tokyoSkyline: "photo-1503899036084-c55cdd92da26",
  meijiForest: "photo-1544279772-2fb0964562e8",
  sapporoClock: "photo-1688919754498-0d7416d39d37",
  sapporoSnowFest: "photo-1738246903414-79643a0c9b9e",
  sapporoWinter: "photo-1519105467443-4779d0fb729d",
  sapporoBeer: "photo-1513475382585-d06e58bcb0e9",
} as const;

const img = (id: string, w = 960) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`;

export const MOCK_ATTRACTIONS: Record<JapanRegionId, AttractionResult[]> = {
  OSAKA_KYOTO: [
    {
      id: "osaka-castle",
      name: "오사카성",
      lat: 34.6873,
      lng: 135.5262,
      rating: 4.5,
      fee: "600엔",
      hours: "09:00–17:00",
      bestVisitTags: ["오전", "봄"],
      imageUrl: img(P.osakaCastle),
    },
    {
      id: "fushimi-inari",
      name: "후시미 이나리 신사",
      lat: 34.9671,
      lng: 135.7727,
      rating: 4.7,
      fee: "무료",
      hours: "24시간",
      bestVisitTags: ["이른 아침", "사진"],
      imageUrl: img(P.fushimiClassic),
      imageUrls: [img(P.fushimiClassic), img(P.fushimiSenbon)],
    },
    {
      id: "kiyomizu",
      name: "기요미즈데라",
      lat: 34.9949,
      lng: 135.785,
      rating: 4.6,
      fee: "400엔",
      hours: "06:00–18:00",
      bestVisitTags: ["가을", "전망"],
      imageUrl: img(P.kiyomizu),
      imageUrls: [img(P.kiyomizu), img(P.kiyomizuHill)],
    },
    {
      id: "arashiyama",
      name: "아라시야마 대나무숲",
      lat: 35.017,
      lng: 135.672,
      rating: 4.5,
      fee: "무료",
      hours: "24시간",
      bestVisitTags: ["오전", "산책"],
      imageUrl: img(P.bambooPath),
      imageUrls: [img(P.bambooPath), img(P.bambooForest)],
    },
  ],
  FUKUOKA: [
    {
      id: "ohori",
      name: "오호리 공원",
      lat: 33.5859,
      lng: 130.375,
      rating: 4.4,
      fee: "무료",
      hours: "24시간",
      bestVisitTags: ["저녁", "산책"],
      imageUrl: img(P.ohoriPark),
    },
    {
      id: "dazaifu",
      name: "다자이후 텐만구",
      lat: 33.5193,
      lng: 130.5353,
      rating: 4.6,
      fee: "무료",
      hours: "06:30–19:00",
      bestVisitTags: ["오전", "벚꽃"],
      imageUrl: img(P.fukuokaShrine),
    },
    {
      id: "canal-city",
      name: "캐널시티 하카타",
      lat: 33.5897,
      lng: 130.4118,
      rating: 4.3,
      fee: "무료",
      hours: "10:00–21:00",
      bestVisitTags: ["쇼핑", "저녁"],
      imageUrl: img(P.fukuokaCanal),
    },
  ],
  TOKYO: [
    {
      id: "sensoji",
      name: "센소지",
      lat: 35.7148,
      lng: 139.7967,
      rating: 4.6,
      fee: "무료",
      hours: "06:00–17:00",
      bestVisitTags: ["오전", "나카미세"],
      imageUrl: img(P.sensojiGate),
      imageUrls: [img(P.sensojiGate), img(P.sensojiNakamise)],
    },
    {
      id: "shibuya-sky",
      name: "시부야·도쿄 전망",
      lat: 35.6586,
      lng: 139.7016,
      rating: 4.5,
      fee: "2,200엔~",
      hours: "10:00–22:30",
      bestVisitTags: ["일몰", "야경"],
      imageUrl: img(P.tokyoSkyline),
    },
    {
      id: "meiji",
      name: "메이지 신궁",
      lat: 35.6764,
      lng: 139.6993,
      rating: 4.7,
      fee: "무료",
      hours: "일출–일몰",
      bestVisitTags: ["숲", "주말"],
      imageUrl: img(P.meijiForest),
    },
  ],
  SAPPORO: [
    {
      id: "clock-tower",
      name: "삿포로 시계탑",
      lat: 43.0626,
      lng: 141.3534,
      rating: 4.2,
      fee: "200엔",
      hours: "08:45–17:10",
      bestVisitTags: ["겨울", "역사"],
      imageUrl: img(P.sapporoClock),
    },
    {
      id: "odori",
      name: "오도리 공원·눈축제",
      lat: 43.0603,
      lng: 141.3533,
      rating: 4.4,
      fee: "무료",
      hours: "24시간",
      bestVisitTags: ["눈축제", "야경"],
      imageUrl: img(P.sapporoSnowFest),
      imageUrls: [img(P.sapporoSnowFest), img(P.sapporoWinter)],
    },
    {
      id: "susukino",
      name: "스스키노·삿포로 맥주",
      lat: 43.055,
      lng: 141.353,
      rating: 4.3,
      fee: "투어 별도",
      hours: "11:00–22:00",
      bestVisitTags: ["맥주", "저녁"],
      imageUrl: img(P.sapporoBeer),
    },
  ],
};

```

---

### `src/features/auth/components/auth-error-banner.tsx`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/features/auth/components/auth-error-banner.tsx` |
| **레이어** | Feature UI |
| **역할** | 기능별 React 컴포넌트 (프레젠테이션) |
| **기능 모듈** | `features/auth` |

```tsx
"use client";

import { useSearchParams } from "next/navigation";

const MESSAGES: Record<string, string> = {
  Configuration:
    "구글 OAuth Client Secret이 잘못되었습니다. Google Cloud Console에서 Secret을 새로 발급해 .env 의 AUTH_GOOGLE_SECRET 에 넣으세요. (AUTH_SECRET·AUTH_URL 은 이미 설정되어 있어도 이 오류가 날 수 있습니다.)",
  AccessDenied: "로그인이 거부되었습니다.",
  OAuthSignin: "구글 로그인 시작에 실패했습니다.",
  OAuthCallback:
    "구글 로그인 콜백 실패입니다. AUTH_GOOGLE_SECRET 과 Client ID가 같은 OAuth 클라이언트의 짝인지 확인하세요.",
  CallbackRouteError:
    "구글 토큰 교환 실패입니다. AUTH_GOOGLE_SECRET 을 Google Cloud에서 다시 복사하세요.",
  Default:
    "로그인 중 오류가 발생했습니다. 잠시 후 다시 시도하거나 이메일 로그인을 이용하세요.",
};

export function AuthErrorBanner() {
  const params = useSearchParams();
  const error = params.get("error");

  if (!error) return null;

  const message = MESSAGES[error] ?? MESSAGES.Default;
  const isGoogleOAuth =
    error === "Configuration" ||
    error === "CallbackRouteError" ||
    error === "OAuthCallback" ||
    error === "OAuthSignin";

  return (
    <div
      role="alert"
      className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800"
    >
      <p className="font-medium">로그인 오류</p>
      <p className="mt-1">{message}</p>
      {isGoogleOAuth ? (
        <ol className="mt-2 list-decimal space-y-1 pl-5 text-xs text-rose-700">
          <li>
            <a
              href="https://console.cloud.google.com/apis/credentials"
              className="underline"
              target="_blank"
              rel="noreferrer"
            >
              Google Cloud → 사용자 인증 정보
            </a>
          </li>
          <li>
            Client ID가 <code className="rounded bg-rose-100 px-1">696409216798-...</code> 인 OAuth
            클라이언트 선택
          </li>
          <li>클라이언트 보안 비밀번호 → <strong>비밀번호 만들기</strong> → 새 Secret 복사</li>
          <li>
            <code className="rounded bg-rose-100 px-1">.env</code>의{" "}
            <code className="rounded bg-rose-100 px-1">AUTH_GOOGLE_SECRET</code>만 교체 후 서버 재시작
          </li>
          <li>
            리디렉션 URI:{" "}
            <code className="rounded bg-rose-100 px-1">
              http://localhost:3000/api/auth/callback/google
            </code>
          </li>
        </ol>
      ) : null}
    </div>
  );
}




```

---

### `src/features/auth/components/forgot-password-form.tsx`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/features/auth/components/forgot-password-form.tsx` |
| **레이어** | Feature UI |
| **역할** | 기능별 React 컴포넌트 (프레젠테이션) |
| **기능 모듈** | `features/auth` |

```tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/shared/ui/button";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [resetUrl, setResetUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    setResetUrl("");

    const res = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error ?? "요청에 실패했습니다.");
      return;
    }
    if (data.kind === "oauth") {
      setMessage(data.message);
      return;
    }
    if (data.kind === "dev_fallback") {
      setMessage(data.message);
      setResetUrl(data.resetUrl ?? "");
      return;
    }
    setMessage(data.message ?? "이메일을 확인해 주세요.");
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-600">
        이메일·비밀번호로 가입한 계정만 재설정할 수 있습니다. Google·카카오로만 가입했다면 해당
        방법으로 로그인해 주세요.
      </p>
      <form onSubmit={onSubmit} className="space-y-3">
        <input
          type="email"
          required
          placeholder="가입한 이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
        />
        {error ? <p className="text-sm text-rose-600">{error}</p> : null}
        {message ? (
          <p
            className={`text-sm ${
              message.includes("소셜") ? "text-amber-800" : "text-emerald-700"
            }`}
          >
            {message}
          </p>
        ) : null}
        {resetUrl ? (
          <div className="rounded-xl border border-sky-200 bg-sky-50 p-3 space-y-2">
            <p className="text-xs font-medium text-sky-900">개발용 재설정 링크</p>
            <Link
              href={resetUrl}
              className="inline-flex w-full items-center justify-center rounded-lg bg-sky-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-sky-700"
            >
              비밀번호 재설정 페이지로 이동
            </Link>
            <p className="break-all text-[11px] text-sky-800/80">{resetUrl}</p>
          </div>
        ) : null}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "발송 중..." : "재설정 링크 보내기"}
        </Button>
      </form>
      <p className="text-center text-sm">
        <Link href="/login" className="text-rose-600">
          로그인으로 돌아가기
        </Link>
      </p>
    </div>
  );
}

```

---

### `src/features/auth/components/login-form.tsx`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/features/auth/components/login-form.tsx` |
| **레이어** | Feature UI |
| **역할** | 기능별 React 컴포넌트 (프레젠테이션) |
| **기능 모듈** | `features/auth` |

```tsx
"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/shared/ui/button";

export function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl") ?? "/";
  const resetDone = params.get("reset") === "1";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);
    if (res?.error) {
      setError("이메일 또는 비밀번호가 올바르지 않습니다.");
      return;
    }
    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <input
        type="email"
        required
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
      />
      <input
        type="password"
        required
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
      />
      {resetDone ? (
        <p className="text-sm text-emerald-700">비밀번호가 변경되었습니다. 새 비밀번호로 로그인하세요.</p>
      ) : null}
      {error ? <p className="text-sm text-rose-600">{error}</p> : null}
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "로그인 중..." : "로그인"}
      </Button>
    </form>
  );
}

```

---

### `src/features/auth/components/register-form.tsx`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/features/auth/components/register-form.tsx` |
| **레이어** | Feature UI |
| **역할** | 기능별 React 컴포넌트 (프레젠테이션) |
| **기능 모듈** | `features/auth` |

```tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/shared/ui/button";

export function RegisterForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error ?? "회원가입에 실패했습니다.");
      return;
    }
    router.push("/login");
  }

  return (
    <>
      <form onSubmit={onSubmit} className="space-y-3">
        <input
          className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          required
          className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          required
          minLength={8}
          className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
          placeholder="비밀번호 (8자 이상)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error ? <p className="text-sm text-rose-600">{error}</p> : null}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "가입 중..." : "가입하기"}
        </Button>
      </form>
      <p className="text-center text-sm">
        <Link href="/login" className="text-rose-600">
          로그인으로 돌아가기
        </Link>
      </p>
    </>
  );
}

```

---

### `src/features/auth/components/reset-password-form.tsx`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/features/auth/components/reset-password-form.tsx` |
| **레이어** | Feature UI |
| **역할** | 기능별 React 컴포넌트 (프레젠테이션) |
| **기능 모듈** | `features/auth` |

```tsx
"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/shared/ui/button";

export function ResetPasswordForm() {
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get("token") ?? "";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!token) {
      setError("유효하지 않은 링크입니다. 비밀번호 찾기를 다시 시도해 주세요.");
      return;
    }
    if (password !== confirm) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    setLoading(true);
    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });
    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error ?? "비밀번호 변경에 실패했습니다.");
      return;
    }
    router.push("/login?reset=1");
  }

  if (!token) {
    return (
      <div className="space-y-3 text-sm text-slate-600">
        <p>재설정 링크가 올바르지 않습니다.</p>
        <Link href="/forgot-password" className="font-medium text-rose-600">
          비밀번호 찾기 다시 하기
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <input
        type="password"
        required
        minLength={8}
        placeholder="새 비밀번호 (8자 이상)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
      />
      <input
        type="password"
        required
        minLength={8}
        placeholder="새 비밀번호 확인"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
      />
      {error ? <p className="text-sm text-rose-600">{error}</p> : null}
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "변경 중..." : "비밀번호 변경"}
      </Button>
    </form>
  );
}

```

---

### `src/features/auth/components/sign-out-button.tsx`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/features/auth/components/sign-out-button.tsx` |
| **레이어** | Feature UI |
| **역할** | 기능별 React 컴포넌트 (프레젠테이션) |
| **기능 모듈** | `features/auth` |

```tsx
"use client";

import { signOut } from "next-auth/react";
import { useState } from "react";

type SignOutButtonProps = {
  className?: string;
  children?: React.ReactNode;
};

export function SignOutButton({
  className = "text-sm text-slate-600 underline",
  children = "로그아웃",
}: SignOutButtonProps) {
  const [loading, setLoading] = useState(false);

  async function handleSignOut() {
    setLoading(true);
    await signOut({ callbackUrl: "/" });
  }

  return (
    <button
      type="button"
      className={className}
      onClick={handleSignOut}
      disabled={loading}
    >
      {loading ? "로그아웃 중..." : children}
    </button>
  );
}

```

---

### `src/features/auth/components/social-login-buttons.tsx`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/features/auth/components/social-login-buttons.tsx` |
| **레이어** | Feature UI |
| **역할** | 기능별 React 컴포넌트 (프레젠테이션) |
| **기능 모듈** | `features/auth` |

```tsx
"use client";

import { Suspense, useState } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

type SocialLoginButtonsProps = {
  google?: boolean;
  kakao?: boolean;
  callbackUrl?: string;
};

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function KakaoIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 3C6.48 3 2 6.58 2 11c0 2.84 1.87 5.35 4.7 6.84L5.5 21.5c-.1.3.25.54.5.38l4.12-2.74c.77.11 1.56.17 2.38.17 5.52 0 10-3.58 10-8S17.52 3 12 3z" />
    </svg>
  );
}

function SocialContinueButton({
  children,
  icon,
  className,
  disabled,
  onClick,
}: {
  children: React.ReactNode;
  icon: React.ReactNode;
  className: string;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`relative flex h-12 w-full items-center justify-center rounded-lg text-[15px] font-medium transition disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
    >
      <span className="absolute left-4 flex shrink-0 items-center justify-center">{icon}</span>
      {children}
    </button>
  );
}

function SocialLoginButtonsInner({
  google = false,
  kakao = false,
  callbackUrl: callbackUrlProp,
}: SocialLoginButtonsProps) {
  const params = useSearchParams();
  const callbackUrl = callbackUrlProp ?? params.get("callbackUrl") ?? "/";
  const [pending, setPending] = useState<"google" | "kakao" | null>(null);

  async function handleSignIn(provider: "google" | "kakao") {
    setPending(provider);
    try {
      await signIn(provider, { callbackUrl });
    } finally {
      setPending(null);
    }
  }

  if (!google && !kakao) {
    return (
      <p className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
        소셜 로그인을 쓰려면 .env 에 Google 또는 Kakao OAuth 키를 설정하세요.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-2.5">
      {kakao ? (
        <SocialContinueButton
          disabled={pending !== null}
          className="bg-[#FEE500] text-[#191919] hover:bg-[#F5DC00]"
          icon={<KakaoIcon className="h-[18px] w-[18px]" />}
          onClick={() => handleSignIn("kakao")}
        >
          {pending === "kakao" ? "연결 중..." : "카카오로 계속하기"}
        </SocialContinueButton>
      ) : null}
      {google ? (
        <SocialContinueButton
          disabled={pending !== null}
          className="bg-[#F2F2F2] text-[#191919] hover:bg-[#E8E8E8]"
          icon={<GoogleIcon className="h-5 w-5" />}
          onClick={() => handleSignIn("google")}
        >
          {pending === "google" ? "연결 중..." : "구글로 계속하기"}
        </SocialContinueButton>
      ) : null}
    </div>
  );
}

export function SocialLoginButtons(props: SocialLoginButtonsProps) {
  return (
    <Suspense fallback={<p className="text-sm text-slate-400">로딩 중...</p>}>
      <SocialLoginButtonsInner {...props} />
    </Suspense>
  );
}

```

---

### `src/features/auth/components/social-login-section.tsx`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/features/auth/components/social-login-section.tsx` |
| **레이어** | Feature UI |
| **역할** | 기능별 React 컴포넌트 (프레젠테이션) |
| **기능 모듈** | `features/auth` |

```tsx
import { getSocialProviders } from "@/features/auth/server/social-providers";
import { SocialLoginButtons } from "./social-login-buttons";

export function SocialLoginSection({ callbackUrl = "/" }: { callbackUrl?: string }) {
  const providers = getSocialProviders();
  return (
    <SocialLoginButtons
      google={providers.google}
      kakao={providers.kakao}
      callbackUrl={callbackUrl}
    />
  );
}

```

---

### `src/features/auth/index.ts`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/features/auth/index.ts` |
| **레이어** | Feature Barrel |
| **역할** | 기능 모듈 public export |
| **기능 모듈** | `features/auth` |

```typescript
export { LoginForm } from "./components/login-form";
export { RegisterForm } from "./components/register-form";
export { ForgotPasswordForm } from "./components/forgot-password-form";
export { ResetPasswordForm } from "./components/reset-password-form";
export { SocialLoginSection } from "./components/social-login-section";

```

---

### `src/features/auth/server/password-reset.ts`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/features/auth/server/password-reset.ts` |
| **레이어** | Feature Server |
| **역할** | 기능별 서버 로직 · DB · 비즈니스 규칙 |
| **기능 모듈** | `features/auth` |

```typescript
import { randomBytes } from "crypto";
import bcrypt from "bcryptjs";
import { APP_NAME, APP_TAGLINE } from "@/shared/lib/constants";
import { sendEmail } from "@/server/email/send-email";
import { prisma } from "@/server/db/prisma";

const RESET_PREFIX = "password-reset:";
const TOKEN_TTL_MS = 60 * 60 * 1000; // 1시간

function resetIdentifier(email: string) {
  return `${RESET_PREFIX}${email.toLowerCase()}`;
}

function appOrigin(): string {
  return (process.env.AUTH_URL ?? process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000").replace(
    /\/$/,
    "",
  );
}

export type PasswordResetResult =
  | { status: "sent" }
  | { status: "dev_fallback"; resetUrl?: string }
  | { status: "skipped_oauth" }
  | { status: "skipped_unknown" };

export async function requestPasswordReset(email: string): Promise<PasswordResetResult> {
  const normalized = email.trim().toLowerCase();
  const user = await prisma.user.findFirst({
    where: { email: { equals: normalized, mode: "insensitive" } },
    select: { id: true, passwordHash: true, email: true },
  });

  if (!user?.email) {
    return { status: "skipped_unknown" };
  }

  if (!user.passwordHash) {
    return { status: "skipped_oauth" };
  }

  const token = randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + TOKEN_TTL_MS);
  const identifier = resetIdentifier(user.email.toLowerCase());

  await prisma.verificationToken.deleteMany({ where: { identifier } });
  await prisma.verificationToken.create({
    data: { identifier, token, expires },
  });

  const resetUrl = `${appOrigin()}/reset-password?token=${encodeURIComponent(token)}`;
  const subject = `[${APP_NAME}] 비밀번호 재설정`;
  const text = `비밀번호를 재설정하려면 아래 링크를 열어주세요 (1시간 유효):\n\n${resetUrl}`;
  const html = `
    <p>안녕하세요, ${APP_NAME}(${APP_TAGLINE})입니다.</p>
    <p>비밀번호 재설정을 요청하셨습니다. 아래 버튼을 눌러 새 비밀번호를 설정해 주세요.</p>
    <p><a href="${resetUrl}" style="display:inline-block;padding:12px 20px;background:linear-gradient(135deg,#7BA7E8,#9B8FE8);color:#fff;text-decoration:none;border-radius:999px;font-weight:700;">비밀번호 재설정</a></p>
    <p style="color:#64748b;font-size:13px;">링크는 1시간 동안만 유효합니다. 요청하지 않으셨다면 이 메일을 무시하세요.</p>
    <p style="color:#94a3b8;font-size:12px;">${resetUrl}</p>
  `.trim();

  if (process.env.NODE_ENV === "development") {
    console.info("[password-reset]", { to: user.email, resetUrl });
  }

  const { delivered } = await sendEmail({ to: user.email, subject, html, text });
  if (delivered) return { status: "sent" };
  return {
    status: "dev_fallback",
    resetUrl: process.env.NODE_ENV === "development" ? resetUrl : undefined,
  };
}

export async function resetPasswordWithToken(
  token: string,
  newPassword: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const record = await prisma.verificationToken.findUnique({
    where: { token },
  });

  if (!record || !record.identifier.startsWith(RESET_PREFIX)) {
    return { ok: false, error: "유효하지 않거나 만료된 링크입니다." };
  }

  if (record.expires < new Date()) {
    await prisma.verificationToken.delete({ where: { token } }).catch(() => undefined);
    return { ok: false, error: "링크가 만료되었습니다. 비밀번호 찾기를 다시 시도해 주세요." };
  }

  const email = record.identifier.slice(RESET_PREFIX.length);
  const user = await prisma.user.findFirst({
    where: { email: { equals: email, mode: "insensitive" } },
    select: { id: true, passwordHash: true },
  });

  if (!user?.passwordHash) {
    return { ok: false, error: "비밀번호로 가입한 계정이 아닙니다." };
  }

  const passwordHash = await bcrypt.hash(newPassword, 12);
  await prisma.$transaction([
    prisma.user.update({ where: { id: user.id }, data: { passwordHash } }),
    prisma.verificationToken.delete({ where: { token } }),
  ]);

  return { ok: true };
}

```

---

### `src/features/auth/server/social-providers.ts`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/features/auth/server/social-providers.ts` |
| **레이어** | Feature Server |
| **역할** | 기능별 서버 로직 · DB · 비즈니스 규칙 |
| **기능 모듈** | `features/auth` |

```typescript
export type SocialProviders = {
  google: boolean;
  kakao: boolean;
};

export function getSocialProviders(): SocialProviders {
  return {
    google: Boolean(process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET),
    kakao: Boolean(process.env.AUTH_KAKAO_ID && process.env.AUTH_KAKAO_SECRET),
  };
}

```

---

### `src/features/budget/components/budget-panel.tsx`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/features/budget/components/budget-panel.tsx` |
| **레이어** | Feature UI |
| **역할** | 기능별 React 컴포넌트 (프레젠테이션) |
| **기능 모듈** | `features/budget` |

```tsx
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { BUDGET_CATEGORIES } from "@/shared/lib/constants";
import { TripBudgetPicker, type TripBudgetOption } from "./trip-budget-picker";

type Allocation = { category: string; amountKrw: number };
type Rate = { krwToJpy: number; source: string };

export function BudgetPanel() {
  const [trips, setTrips] = useState<TripBudgetOption[]>([]);
  const [selectedTripId, setSelectedTripId] = useState<string | null>(null);
  const [totalKrw, setTotalKrw] = useState(0);
  const [allocations, setAllocations] = useState<Allocation[]>([]);
  const [expenses, setExpenses] = useState<{ category: string; amountKrw: number; description?: string }[]>([]);
  const [rate, setRate] = useState<Rate | null>(null);
  const [suggestHint, setSuggestHint] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [spentInput, setSpentInput] = useState({ category: "FOOD", amountKrw: 0, description: "" });

  async function suggestAllocation(tripId: string, amount?: number) {
    const res = await fetch("/api/budget/suggest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ totalKrw: amount ?? totalKrw, tripId }),
    });
    const data = await res.json();
    if (data.totalKrw) setTotalKrw(data.totalKrw);
    if (data.allocations) setAllocations(data.allocations);
    setSuggestHint(data.hint ?? (data.source === "trip" ? "선택한 일정에 맞춰 배분했습니다." : null));
  }

  async function loadBudget(tripId: string, trip?: TripBudgetOption) {
    const res = await fetch(`/api/budget?tripId=${tripId}`);
    const data = await res.json();

    const tripBudget = trip?.totalBudget ?? 0;
    const nextTotal = data.totalKrw > 0 ? data.totalKrw : tripBudget > 0 ? tripBudget : 2000000;
    setTotalKrw(nextTotal);

    if (data.allocations?.length) {
      setAllocations(data.allocations);
      setSuggestHint(null);
    } else {
      await suggestAllocation(tripId, nextTotal);
    }

    setExpenses(data.expenses ?? []);
  }

  async function selectTrip(tripId: string) {
    setSelectedTripId(tripId);
    const trip = trips.find((t) => t.id === tripId);
    await loadBudget(tripId, trip);
  }

  useEffect(() => {
    let cancelled = false;

    async function init() {
      const [rateRes, tripsRes] = await Promise.all([
        fetch("/api/budget/rate"),
        fetch("/api/trips"),
      ]);

      if (cancelled) return;

      const rateData = await rateRes.json();
      setRate(rateData);

      const tripsData = await tripsRes.json();
      const list: TripBudgetOption[] = tripsData.trips ?? [];
      setTrips(list);

      if (list.length > 0) {
        setSelectedTripId(list[0].id);
        const res = await fetch(`/api/budget?tripId=${list[0].id}`);
        if (cancelled) return;
        const data = await res.json();
        const tripBudget = list[0].totalBudget ?? 0;
        const nextTotal = data.totalKrw > 0 ? data.totalKrw : tripBudget > 0 ? tripBudget : 2000000;
        setTotalKrw(nextTotal);
        if (data.allocations?.length) {
          setAllocations(data.allocations);
        } else {
          const suggestRes = await fetch("/api/budget/suggest", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ totalKrw: nextTotal, tripId: list[0].id }),
          });
          if (cancelled) return;
          const suggestData = await suggestRes.json();
          if (suggestData.totalKrw) setTotalKrw(suggestData.totalKrw);
          if (suggestData.allocations) setAllocations(suggestData.allocations);
          setSuggestHint(
            suggestData.hint ??
              (suggestData.source === "trip" ? "선택한 일정에 맞춰 배분했습니다." : null),
          );
        }
        setExpenses(data.expenses ?? []);
      }

      if (!cancelled) setLoading(false);
    }

    init();
    return () => {
      cancelled = true;
    };
  }, []);

  async function saveBudget() {
    if (!selectedTripId) return;
    await fetch("/api/budget", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tripId: selectedTripId, totalKrw, allocations, expenses }),
    });
  }

  function updateAllocation(category: string, amountKrw: number) {
    setAllocations((prev) => {
      const exists = prev.some((a) => a.category === category);
      if (exists) {
        return prev.map((a) => (a.category === category ? { ...a, amountKrw } : a));
      }
      return [...prev, { category, amountKrw }];
    });
  }

  const allocatedSum = allocations.reduce((s, a) => s + a.amountKrw, 0);
  const spent = expenses.reduce((s, e) => s + e.amountKrw, 0);
  const remaining = totalKrw - spent;
  const selectedTrip = trips.find((t) => t.id === selectedTripId);

  if (loading) {
    return <p className="text-center text-sm text-slate-500">불러오는 중…</p>;
  }

  return (
    <div className="space-y-4">
      <TripBudgetPicker trips={trips} selectedId={selectedTripId} onSelect={selectTrip} />

      {!selectedTripId ? (
        <Card>
          <p className="text-sm text-slate-500">예산을 설정할 여행을 선택해 주세요.</p>
        </Card>
      ) : (
        <>
          {selectedTrip ? (
            <Card className="border-rose-100 bg-rose-50/40 text-sm text-slate-700">
              <span className="font-medium text-rose-700">{selectedTrip.title}</span>
              {" "}일정에 연결된 예산입니다. 항목별 금액은 직접 수정할 수 있습니다.
            </Card>
          ) : null}

          {rate ? (
            <Card className="text-sm text-slate-600">
              환율 1원 ≈ {rate.krwToJpy.toFixed(4)}엔 ({rate.source === "api" ? "실시간" : "기본값"})
            </Card>
          ) : null}

          <Card className="space-y-2">
            <label className="text-sm font-medium">총 예산 (원)</label>
            <input
              type="number"
              value={totalKrw || ""}
              onChange={(e) => setTotalKrw(Number(e.target.value))}
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
            />
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant="secondary"
                onClick={() => suggestAllocation(selectedTripId, totalKrw)}
              >
                일정 기반 자동 배분
              </Button>
              {selectedTrip?.totalBudget ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setTotalKrw(selectedTrip.totalBudget!)}
                >
                  일정 예산({selectedTrip.totalBudget.toLocaleString()}원) 적용
                </Button>
              ) : null}
            </div>
            {suggestHint ? <p className="text-xs text-rose-600">{suggestHint}</p> : null}
          </Card>

          <Card>
            <div className="mb-2 flex items-center justify-between">
              <p className="text-sm font-medium">배분 · 잔액 (개인 설정)</p>
              <span className="text-xs text-slate-500">
                배분 합계 {allocatedSum.toLocaleString()}원
                {allocatedSum !== totalKrw ? (
                  <span className="text-amber-600"> · 총액과 {Math.abs(totalKrw - allocatedSum).toLocaleString()}원 차이</span>
                ) : null}
              </span>
            </div>
            <p className="text-2xl font-bold text-rose-600">{remaining.toLocaleString()}원 남음</p>
            <p className="text-xs text-slate-500">지출 {spent.toLocaleString()}원 / 총 {totalKrw.toLocaleString()}원</p>
            <div className="mt-3 space-y-3">
              {BUDGET_CATEGORIES.map((cat) => {
                const row = allocations.find((a) => a.category === cat.id);
                const amount = row?.amountKrw ?? 0;
                const pct = totalKrw > 0 ? Math.round((amount / totalKrw) * 100) : 0;

                return (
                  <div key={cat.id} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{cat.label}</span>
                      <span className="text-xs text-slate-400">{pct}%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={amount || ""}
                        onChange={(e) => updateAllocation(cat.id, Number(e.target.value))}
                        className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                        placeholder="0"
                      />
                      {rate ? (
                        <span className="shrink-0 text-xs text-slate-500">
                          ≈{Math.round(amount * rate.krwToJpy).toLocaleString()}엔
                        </span>
                      ) : null}
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${Math.min(pct, 100)}%`, backgroundColor: cat.color }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card className="space-y-2">
            <p className="text-sm font-medium">지출 입력</p>
            <select
              value={spentInput.category}
              onChange={(e) => setSpentInput((s) => ({ ...s, category: e.target.value }))}
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
            >
              {BUDGET_CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
            <input
              type="number"
              placeholder="금액 (원)"
              value={spentInput.amountKrw || ""}
              onChange={(e) => setSpentInput((s) => ({ ...s, amountKrw: Number(e.target.value) }))}
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
            />
            <input
              placeholder="메모"
              value={spentInput.description}
              onChange={(e) => setSpentInput((s) => ({ ...s, description: e.target.value }))}
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
            />
            <Button
              type="button"
              onClick={() => {
                if (!spentInput.amountKrw) return;
                setExpenses((e) => [...e, { ...spentInput }]);
                setSpentInput((s) => ({ ...s, amountKrw: 0, description: "" }));
              }}
            >
              지출 추가
            </Button>
            {expenses.length > 0 ? (
              <ul className="mt-2 space-y-1 border-t border-slate-100 pt-2">
                {expenses.map((e, i) => {
                  const label = BUDGET_CATEGORIES.find((c) => c.id === e.category)?.label ?? e.category;
                  return (
                    <li key={`${e.category}-${i}`} className="flex justify-between text-xs text-slate-600">
                      <span>
                        {label}
                        {e.description ? ` · ${e.description}` : ""}
                      </span>
                      <span>{e.amountKrw.toLocaleString()}원</span>
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </Card>

          <Button type="button" className="w-full" onClick={saveBudget}>
            이 여행 예산 저장
          </Button>
        </>
      )}
    </div>
  );
}

```

---

### `src/features/budget/components/trip-budget-picker.tsx`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/features/budget/components/trip-budget-picker.tsx` |
| **레이어** | Feature UI |
| **역할** | 기능별 React 컴포넌트 (프레젠테이션) |
| **기능 모듈** | `features/budget` |

```tsx
"use client";

import Image from "next/image";
import { format } from "date-fns";

export type TripBudgetOption = {
  id: string;
  title: string;
  regionLabel: string;
  startDate: string;
  endDate: string;
  totalBudget: number | null;
  dayCount: number;
  itemCount: number;
  coverImage: string;
  galleryImages: string[];
};

type Props = {
  trips: TripBudgetOption[];
  selectedId: string | null;
  onSelect: (tripId: string) => void;
};

export function TripBudgetPicker({ trips, selectedId, onSelect }: Props) {
  if (trips.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/80 px-4 py-8 text-center">
        <p className="text-sm font-medium text-slate-600">저장된 일정이 없습니다</p>
        <p className="mt-1 text-xs text-slate-500">내 일정에서 여행을 저장한 뒤 예산을 연결할 수 있어요.</p>
      </div>
    );
  }

  return (
    <div>
      <p className="mb-3 text-sm font-medium text-slate-700">내 일정에서 여행 선택</p>
      <div className="flex gap-3 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {trips.map((trip) => {
          const selected = trip.id === selectedId;
          const thumbs = trip.galleryImages.filter((u) => u !== trip.coverImage).slice(0, 2);

          return (
            <button
              key={trip.id}
              type="button"
              onClick={() => onSelect(trip.id)}
              className={`group relative w-[min(100%,280px)] shrink-0 overflow-hidden rounded-2xl border-2 text-left transition ${
                selected
                  ? "border-rose-500 shadow-md ring-2 ring-rose-200"
                  : "border-slate-200/80 hover:border-rose-200 hover:shadow-sm"
              }`}
            >
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={trip.coverImage}
                  alt={trip.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  sizes="280px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                {selected ? (
                  <span className="absolute left-3 top-3 rounded-full bg-rose-500 px-2.5 py-0.5 text-xs font-semibold text-white shadow">
                    선택됨
                  </span>
                ) : null}
                {thumbs.length > 0 ? (
                  <div className="absolute right-3 top-3 flex gap-1">
                    {thumbs.map((src) => (
                      <div key={src} className="relative h-9 w-9 overflow-hidden rounded-lg ring-2 ring-white/90">
                        <Image src={src} alt="" fill className="object-cover" sizes="36px" />
                      </div>
                    ))}
                  </div>
                ) : null}
                <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                  <p className="text-[10px] font-medium uppercase tracking-wide text-white/75">{trip.regionLabel}</p>
                  <p className="mt-0.5 line-clamp-2 text-sm font-bold leading-snug">{trip.title}</p>
                  <p className="mt-1 text-[11px] text-white/85">
                    {format(new Date(trip.startDate), "MM.dd")} – {format(new Date(trip.endDate), "MM.dd")}
                    {" · "}
                    {trip.dayCount}일 · {trip.itemCount}곳
                  </p>
                  {trip.totalBudget ? (
                    <p className="mt-1 text-xs font-medium text-rose-200">
                      일정 예산 {trip.totalBudget.toLocaleString()}원
                    </p>
                  ) : null}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

```

---

### `src/features/budget/index.ts`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/features/budget/index.ts` |
| **레이어** | Feature Barrel |
| **역할** | 기능 모듈 public export |
| **기능 모듈** | `features/budget` |

```typescript
export { BudgetPanel } from "./components/budget-panel";

```

---

### `src/features/budget/server/exchange-rate.ts`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/features/budget/server/exchange-rate.ts` |
| **레이어** | Feature Server |
| **역할** | 기능별 서버 로직 · DB · 비즈니스 규칙 |
| **기능 모듈** | `features/budget` |

```typescript
const FALLBACK_RATE = 0.11;

export type ExchangeRate = {
  krwToJpy: number;
  jpyToKrw: number;
  updatedAt: string;
  source: "api" | "fallback";
};

export async function fetchExchangeRate(): Promise<ExchangeRate> {
  const apiKey = process.env.EXCHANGE_RATE_API_KEY;

  if (!apiKey) {
    return {
      krwToJpy: FALLBACK_RATE,
      jpyToKrw: 1 / FALLBACK_RATE,
      updatedAt: new Date().toISOString(),
      source: "fallback",
    };
  }

  try {
    const res = await fetch(
      `https://v6.exchangerate-api.com/v6/${apiKey}/pair/KRW/JPY`,
      { next: { revalidate: 3600 } },
    );
    if (!res.ok) throw new Error("rate fetch failed");
    const data = (await res.json()) as { conversion_rate: number };
    const krwToJpy = data.conversion_rate;
    return {
      krwToJpy,
      jpyToKrw: 1 / krwToJpy,
      updatedAt: new Date().toISOString(),
      source: "api",
    };
  } catch {
    return {
      krwToJpy: FALLBACK_RATE,
      jpyToKrw: 1 / FALLBACK_RATE,
      updatedAt: new Date().toISOString(),
      source: "fallback",
    };
  }
}

export function krwToJpy(amountKrw: number, rate: ExchangeRate) {
  return Math.round(amountKrw * rate.krwToJpy);
}

export function jpyToKrw(amountJpy: number, rate: ExchangeRate) {
  return Math.round(amountJpy * rate.jpyToKrw);
}

```

---

### `src/features/budget/server/trip-budget-suggest.ts`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/features/budget/server/trip-budget-suggest.ts` |
| **레이어** | Feature Server |
| **역할** | 기능별 서버 로직 · DB · 비즈니스 규칙 |
| **기능 모듈** | `features/budget` |

```typescript
import type { BudgetCategory } from "@prisma/client";

export type TripForBudgetSuggest = {
  region: string;
  totalBudget: number | null;
  days: {
    items: {
      placeName: string;
      transport?: string | null;
      notes?: string | null;
    }[];
  }[];
};

const CATEGORIES: BudgetCategory[] = [
  "ACCOMMODATION",
  "TRANSPORT",
  "FOOD",
  "SIGHTSEEING",
  "OTHER",
];

const BASE_RATIOS: Record<BudgetCategory, number> = {
  ACCOMMODATION: 0.32,
  TRANSPORT: 0.18,
  FOOD: 0.25,
  SIGHTSEEING: 0.15,
  OTHER: 0.1,
};

const TRANSPORT_KW = /지하철|버스|jr|신칸센|택시|열차|비행|공항|이동|도보 외/i;
const FOOD_KW = /라멘|맛집|야타이|점심|저녁|아침|식사|카페|스시|음식|먹|식당|베이커리/i;
const SIGHT_KW = /관광|사진|공원|신사|사찰|박물관|전망|야경|거리|야구|축제|참배/i;
const SHOP_KW = /쇼핑|몰|아울렛|면세|백화점|캐널/i;

function normalizeRatios(ratios: Record<BudgetCategory, number>): Record<BudgetCategory, number> {
  const sum = CATEGORIES.reduce((s, c) => s + ratios[c], 0);
  const out = { ...ratios };
  for (const c of CATEGORIES) {
    out[c] = ratios[c] / sum;
  }
  return out;
}

/** 일정 일수·장소·교통·지역을 반영한 카테고리별 배분 비율 */
export function suggestRatiosFromTrip(trip: TripForBudgetSuggest): Record<BudgetCategory, number> {
  const dayCount = Math.max(trip.days.length, 1);
  const items = trip.days.flatMap((d) => d.items);

  let transportHits = 0;
  let foodHits = 0;
  let sightHits = 0;
  let shopHits = 0;

  for (const item of items) {
    const text = `${item.placeName} ${item.notes ?? ""} ${item.transport ?? ""}`;
    if (TRANSPORT_KW.test(item.transport ?? "") || TRANSPORT_KW.test(text)) transportHits += 1;
    if (FOOD_KW.test(text)) foodHits += 1;
    if (SIGHT_KW.test(text)) sightHits += 1;
    if (SHOP_KW.test(text)) shopHits += 1;
  }

  const ratios = { ...BASE_RATIOS };

  ratios.ACCOMMODATION += (dayCount - 3) * 0.025;
  ratios.TRANSPORT += Math.min(transportHits * 0.012, 0.1);
  ratios.FOOD += Math.min(foodHits * 0.01, 0.08);
  ratios.SIGHTSEEING += Math.min(sightHits * 0.008 + shopHits * 0.006, 0.1);

  if (dayCount <= 2) {
    ratios.ACCOMMODATION -= 0.07;
    ratios.FOOD += 0.04;
    ratios.SIGHTSEEING += 0.03;
  }

  if (trip.region === "FUKUOKA") ratios.FOOD += 0.03;
  if (trip.region === "TOKYO") ratios.TRANSPORT += 0.025;
  if (trip.region === "OSAKA_KYOTO") ratios.SIGHTSEEING += 0.02;
  if (trip.region === "SAPPORO") ratios.ACCOMMODATION += 0.02;

  return normalizeRatios(ratios);
}

export function suggestAllocationsFromTrip(
  trip: TripForBudgetSuggest,
  totalKrw: number,
): { category: BudgetCategory; amountKrw: number }[] {
  const total = Math.max(Number(totalKrw) || 0, 0);
  const preferredTotal = trip.totalBudget && trip.totalBudget > 0 ? trip.totalBudget : total;
  const base = preferredTotal > 0 ? preferredTotal : total;

  const ratios = suggestRatiosFromTrip(trip);
  const raw = CATEGORIES.map((category) => ({
    category,
    amountKrw: Math.round(base * ratios[category]),
  }));

  const allocated = raw.reduce((s, a) => s + a.amountKrw, 0);
  const target = base > 0 ? base : total;
  if (target > 0 && allocated !== target) {
    const diff = target - allocated;
    const foodIdx = raw.findIndex((a) => a.category === "FOOD");
    if (foodIdx >= 0) raw[foodIdx].amountKrw += diff;
  }

  return raw;
}

```

---

### `src/features/chat/components/ai-chat-widget.tsx`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/features/chat/components/ai-chat-widget.tsx` |
| **레이어** | Feature UI |
| **역할** | 기능별 React 컴포넌트 (프레젠테이션) |
| **기능 모듈** | `features/chat` |

```tsx
"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { MessageCircle, X } from "lucide-react";
import { ChatPanel } from "@/features/chat/components/chat-panel";

const HIDE_ON = new Set(["/login", "/register", "/forgot-password", "/chat"]);

function normalizePath(pathname: string) {
  return pathname.startsWith("/m") ? pathname.replace(/^\/m/, "") || "/" : pathname;
}

export function AiChatWidget() {
  const { status } = useSession();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const path = normalizePath(pathname);

  useEffect(() => {
    if (HIDE_ON.has(path)) setOpen(false);
  }, [path]);

  if (status !== "authenticated") return null;
  if (HIDE_ON.has(path)) return null;

  return (
    <>
      {open ? (
        <button
          type="button"
          aria-label="채팅 닫기"
          className="fixed inset-0 z-[60] bg-black/20 backdrop-blur-[1px] md:bg-black/10"
          onClick={() => setOpen(false)}
        />
      ) : null}

      {open ? (
        <div
          className="ai-chat-panel fixed bottom-24 right-4 z-[70] flex h-[min(70vh,520px)] w-[min(calc(100vw-2rem),400px)] flex-col overflow-hidden rounded-2xl border bg-white md:bottom-6 md:right-6"
          role="dialog"
          aria-label="AI 여행 상담"
        >
          <header className="ai-chat-header flex shrink-0 items-center justify-between border-b border-white/20 px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                <MessageCircle size={18} />
              </span>
              <div>
                <p className="text-sm font-semibold">AI 여행 상담</p>
                <p className="text-[10px] text-white/80">임시 · 대화는 계정에 저장됩니다</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-full p-1.5 hover:bg-white/20"
              aria-label="닫기"
            >
              <X size={18} />
            </button>
          </header>
          <div className="flex min-h-0 flex-1 flex-col px-3 pb-3 pt-2">
            <ChatPanel variant="floating" />
          </div>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "AI 채팅 닫기" : "AI 채팅 열기"}
        aria-expanded={open}
        className="ai-chat-fab fixed bottom-24 right-4 z-[80] md:bottom-6 md:right-6"
      >
        {open ? <X size={24} strokeWidth={2.25} /> : <MessageCircle size={24} strokeWidth={2.25} />}
      </button>
    </>
  );
}

```

---

### `src/features/chat/components/chat-panel.tsx`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/features/chat/components/chat-panel.tsx` |
| **레이어** | Feature UI |
| **역할** | 기능별 React 컴포넌트 (프레젠테이션) |
| **기능 모듈** | `features/chat` |

```tsx
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";

type Message = { id?: string; role: "user" | "assistant"; content: string };

const DEFAULT_SUGGESTED = [
  "오사카 2박3일 코스 추천해줘",
  "교토 당일치기 이동 방법은?",
  "예산 150만원으로 식비·숙박 나눠줘",
];

type ChatPanelProps = {
  variant?: "page" | "floating";
};

export function ChatPanel({ variant = "page" }: ChatPanelProps) {
  const { data: session, status } = useSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const [suggested, setSuggested] = useState<string[]>(DEFAULT_SUGGESTED);
  const [input, setInput] = useState("");
  const [sessionId, setSessionId] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [error, setError] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  const loadHistory = useCallback(async () => {
    setHistoryLoading(true);
    setError("");
    try {
      const res = await fetch("/api/chat/sessions");
      if (res.status === 401) {
        setMessages([]);
        setSessionId(undefined);
        return;
      }
      if (!res.ok) throw new Error("대화 불러오기 실패");
      const data = await res.json();
      if (data.sessionId) setSessionId(data.sessionId);
      if (data.messages) setMessages(data.messages);
    } catch {
      setError("이전 대화를 불러오지 못했습니다.");
    } finally {
      setHistoryLoading(false);
    }
  }, []);

  useEffect(() => {
    if (status === "loading") return;
    if (status !== "authenticated" || !session?.user?.id) {
      setMessages([]);
      setSessionId(undefined);
      setHistoryLoading(false);
      return;
    }
    loadHistory();
  }, [status, session?.user?.id, loadHistory]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function send(text: string) {
    if (!text.trim() || loading || status !== "authenticated") return;
    setError("");
    setInput("");
    setMessages((m) => [...m, { role: "user", content: text }]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, sessionId }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error ?? "전송 실패");
      }
      if (data.sessionId) setSessionId(data.sessionId);
      if (data.suggestedQuestions?.length) {
        setSuggested(data.suggestedQuestions);
      }
      setMessages((m) => [...m, { role: "assistant", content: data.reply }]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "메시지 전송에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  }

  const isFloating = variant === "floating";
  const heightClass = isFloating ? "h-full min-h-0" : "h-[calc(100vh-220px)]";

  return (
    <div className={`flex flex-col ${heightClass}`}>
      <div className={`flex flex-wrap gap-2 ${isFloating ? "mb-2" : "mb-2"}`}>
        {suggested.map((q) => (
          <button
            key={q}
            type="button"
            onClick={() => send(q)}
            disabled={loading || historyLoading}
            className="rounded-full bg-rose-50 px-3 py-1 text-xs text-rose-700 transition hover:bg-rose-100 disabled:opacity-50"
          >
            {q}
          </button>
        ))}
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto pr-1">
        {historyLoading ? (
          <p className="text-sm text-slate-400">이전 대화 불러오는 중...</p>
        ) : null}
        {!historyLoading && messages.length === 0 ? (
          <p className="text-sm text-slate-500">
            일본 여행에 대해 무엇이든 물어보세요. 대화는 로그인 계정에 저장됩니다.
          </p>
        ) : null}
        {messages.map((m, i) => (
          <Card
            key={m.id ?? `${i}-${m.role}-${m.content.slice(0, 12)}`}
            className={
              m.role === "user"
                ? isFloating
                  ? "ml-6 border-rose-100 bg-rose-50 py-2.5"
                  : "ml-8 bg-rose-50"
                : isFloating
                  ? "mr-6 py-2.5"
                  : "mr-8"
            }
          >
            <p className="text-sm whitespace-pre-wrap">{m.content}</p>
          </Card>
        ))}
        {loading ? <p className="text-sm text-slate-400">답변 생성 중...</p> : null}
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <div ref={bottomRef} />
      </div>

      <form
        className={`flex gap-2 ${isFloating ? "mt-2 border-t border-slate-100 pt-2" : "mt-3"}`}
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="여행 질문을 입력하세요"
          disabled={historyLoading}
          className="flex-1 rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100"
        />
        <Button
          type="submit"
          disabled={loading || historyLoading}
          className={isFloating ? "px-3 py-2 text-xs" : undefined}
        >
          전송
        </Button>
      </form>
    </div>
  );
}

```

---

### `src/features/chat/index.ts`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/features/chat/index.ts` |
| **레이어** | Feature Barrel |
| **역할** | 기능 모듈 public export |
| **기능 모듈** | `features/chat` |

```typescript
/** 프론트엔드 (클라이언트 컴포넌트) */
export { ChatPanel } from "./components/chat-panel";
export { AiChatWidget } from "./components/ai-chat-widget";

```

---

### `src/features/chat/server/chat.service.ts`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/features/chat/server/chat.service.ts` |
| **레이어** | Feature Server |
| **역할** | 기능별 서버 로직 · DB · 비즈니스 규칙 |
| **기능 모듈** | `features/chat` |

```typescript
import { aiAdapter } from "@/server/ai/adapter";
import { prisma } from "@/server/db/prisma";
import type { JapanRegionId } from "@/shared/lib/constants";

export async function sendChatMessage(params: {
  userId: string;
  message: string;
  sessionId?: string;
  region?: JapanRegionId;
}) {
  let chatSession = params.sessionId
    ? await prisma.chatSession.findFirst({
        where: { id: params.sessionId, userId: params.userId },
      })
    : null;

  if (!chatSession) {
    chatSession = await prisma.chatSession.create({
      data: { userId: params.userId, title: "여행 상담" },
    });
  }

  await prisma.chatMessage.create({
    data: { sessionId: chatSession.id, role: "user", content: params.message },
  });

  const history = await prisma.chatMessage.findMany({
    where: { sessionId: chatSession.id },
    orderBy: { createdAt: "asc" },
    take: 30,
    select: { role: true, content: true },
  });

  const ai = await aiAdapter.chat({
    sessionId: chatSession.id,
    message: params.message,
    region: params.region,
    tripContext: { history },
  });

  await prisma.chatMessage.create({
    data: { sessionId: chatSession.id, role: "assistant", content: ai.reply },
  });

  await prisma.chatSession.update({
    where: { id: chatSession.id },
    data: { updatedAt: new Date() },
  });

  return {
    sessionId: chatSession.id,
    reply: ai.reply,
    suggestedQuestions: ai.suggestedQuestions,
  };
}

export async function getLatestChatSession(userId: string) {
  const chatSession = await prisma.chatSession.findFirst({
    where: { userId },
    orderBy: { updatedAt: "desc" },
    include: { messages: { orderBy: { createdAt: "asc" }, take: 50 } },
  });

  if (!chatSession) return { messages: [] as { role: string; content: string }[] };

  return {
    sessionId: chatSession.id,
    messages: chatSession.messages.map((m) => ({
      id: m.id,
      role: m.role as "user" | "assistant",
      content: m.content,
    })),
  };
}

```

---

### `src/features/chat/server/index.ts`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/features/chat/server/index.ts` |
| **레이어** | Feature Server |
| **역할** | 기능별 서버 로직 · DB · 비즈니스 규칙 |
| **기능 모듈** | `features/chat` |

```typescript
export { sendChatMessage, getLatestChatSession } from "./chat.service";

```

---

### `src/features/checklist/components/checklist-panel.tsx`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/features/checklist/components/checklist-panel.tsx` |
| **레이어** | Feature UI |
| **역할** | 기능별 React 컴포넌트 (프레젠테이션) |
| **기능 모듈** | `features/checklist` |

```tsx
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { KOREA_TO_JAPAN_CHECKLIST } from "@/features/checklist/server/checklist-defaults";
import { Trash2 } from "lucide-react";

type Item = { id: string; label: string; isChecked: boolean; isDefault: boolean };

export function ChecklistPanel() {
  const [items, setItems] = useState<Item[]>([]);
  const [newLabel, setNewLabel] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/checklist")
      .then((r) => r.json())
      .then((data) => {
        if (data.items?.length) setItems(data.items);
        else {
          setItems(
            KOREA_TO_JAPAN_CHECKLIST.map((label, i) => ({
              id: `default-${i}`,
              label,
              isChecked: false,
              isDefault: true,
            })),
          );
        }
      })
      .finally(() => setLoading(false));
  }, []);

  async function persist(next: Item[]) {
    setItems(next);
    await fetch("/api/checklist", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: next }),
    });
  }

  function toggle(id: string) {
    persist(items.map((it) => (it.id === id ? { ...it, isChecked: !it.isChecked } : it)));
  }

  function addItem() {
    if (!newLabel.trim()) return;
    persist([
      ...items,
      { id: crypto.randomUUID(), label: newLabel.trim(), isChecked: false, isDefault: false },
    ]);
    setNewLabel("");
  }

  function removeItem(id: string) {
    persist(items.filter((it) => it.id !== id));
  }

  const done = items.filter((i) => i.isChecked).length;

  if (loading) return <p className="text-sm text-slate-500">불러오는 중...</p>;

  return (
    <div className="space-y-4">
      <Card>
        <p className="text-sm text-slate-600">
          진행률 {done}/{items.length} ({items.length ? Math.round((done / items.length) * 100) : 0}%)
        </p>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full bg-rose-500 transition-all"
            style={{ width: `${items.length ? (done / items.length) * 100 : 0}%` }}
          />
        </div>
      </Card>

      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id}>
            <Card className="flex items-center gap-3 !py-3">
              <input type="checkbox" checked={item.isChecked} onChange={() => toggle(item.id)} />
              <span className={`flex-1 text-sm ${item.isChecked ? "line-through text-slate-400" : ""}`}>
                {item.label}
                {item.isDefault ? (
                  <span className="ml-1.5 text-[10px] font-medium text-slate-400">기본</span>
                ) : null}
              </span>
              <button
                type="button"
                className="rounded-lg p-1.5 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600"
                onClick={() => removeItem(item.id)}
                aria-label={`${item.label} 삭제`}
              >
                <Trash2 size={16} />
              </button>
            </Card>
          </li>
        ))}
      </ul>

      <div className="flex gap-2">
        <input
          value={newLabel}
          onChange={(e) => setNewLabel(e.target.value)}
          placeholder="커스텀 항목 추가"
          className="flex-1 rounded-xl border border-slate-200 px-3 py-2 text-sm"
        />
        <Button type="button" onClick={addItem}>
          추가
        </Button>
      </div>
    </div>
  );
}

```

---

### `src/features/checklist/index.ts`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/features/checklist/index.ts` |
| **레이어** | Feature Barrel |
| **역할** | 기능 모듈 public export |
| **기능 모듈** | `features/checklist` |

```typescript
export { ChecklistPanel } from "./components/checklist-panel";

```

---

### `src/features/checklist/server/checklist-defaults.ts`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/features/checklist/server/checklist-defaults.ts` |
| **레이어** | Feature Server |
| **역할** | 기능별 서버 로직 · DB · 비즈니스 규칙 |
| **기능 모듈** | `features/checklist` |

```typescript
export const KOREA_TO_JAPAN_CHECKLIST = [
  "여권 (유효기간 6개월 이상)",
  "항공권·숙소 예약 확인서",
  "일본 엔화 환전 / 트래블 월렛",
  "해외 결제 가능 신용·체크카드",
  "로밍·eSIM·포켓 와이파이",
  "여행자 보험 가입",
  "Visit Japan Web 사전 등록",
  "교통 IC카드 (Suica·ICOCA 등)",
  "멀티탭·C타입 어댑터",
  "상비약·개인 세면도구",
  "비상 연락처·여권 사본(클라우드)",
  "일본 비상번호 메모 (110/119)",
] as const;

```

---

### `src/features/home/components/home-page-content.tsx`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/features/home/components/home-page-content.tsx` |
| **레이어** | Feature UI |
| **역할** | 기능별 React 컴포넌트 (프레젠테이션) |
| **기능 모듈** | `features/home` |

```tsx
import { SiteHeader } from "@/shared/layout/site-header";
import { SiteFooter } from "@/shared/layout/site-footer";
import { HOME_HERO_BACKGROUND } from "@/features/home/lib/home-data";
import { NihonHero } from "./nihon-hero";
import { PopularDestinations } from "./popular-destinations";
import { PlannerPreviewSection } from "./planner-preview-section";

export function HomePageContent() {
  return (
    <div className="min-h-full bg-[var(--background)]">
      <div className="home-sky-wrap">
        <div
          className="home-sky-photo"
          aria-hidden
          style={{ backgroundImage: `url('${HOME_HERO_BACKGROUND}')` }}
        />
        <div className="home-sky-overlay" aria-hidden />
        <div className="home-sky-deco" aria-hidden>
          <div className="home-sky-noise" />
          <div className="home-sky-blob home-sky-blob--1" />
          <div className="home-sky-blob home-sky-blob--2" />
          <div className="home-sky-blob home-sky-blob--3" />
        </div>
        <SiteHeader tone="sky" />
        <NihonHero />
      </div>
      <main className="mx-auto max-w-[1200px] px-5 py-14 md:px-5">
        <PopularDestinations />
        <PlannerPreviewSection />
      </main>
      <SiteFooter />
    </div>
  );
}

```

---

### `src/features/home/components/nihon-hero.tsx`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/features/home/components/nihon-hero.tsx` |
| **레이어** | Feature UI |
| **역할** | 기능별 React 컴포넌트 (프레젠테이션) |
| **기능 모듈** | `features/home` |

```tsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { BrandMark } from "@/shared/ui/brand-logo";
import { TripDateRangePicker } from "@/shared/ui/trip-date-range-picker";
import {
  APP_DESCRIPTION,
  APP_NAME,
  APP_TAGLINE,
  APP_TAGLINE_JA,
  JAPAN_REGIONS,
} from "@/shared/lib/constants";
import { defaultTripRange, type TripDateRange } from "@/shared/lib/trip-dates";
import { ChevronDown, MapPin } from "lucide-react";

const TRUST_PILLS = [
  { label: "검증된 여행 코스", dot: "tp-blue" },
  { label: "실시간 날씨 연동", dot: "tp-purple" },
  { label: "AI 맞춤 일정 추천", dot: "tp-sky" },
  { label: "5만+ 여행자의 선택", dot: "tp-blue" },
] as const;

export function NihonHero() {
  const router = useRouter();
  const [region, setRegion] = useState("TOKYO");
  const [dateRange, setDateRange] = useState<TripDateRange>(() => defaultTripRange());
  const [guests, setGuests] = useState(1);

  const regionLabel = JAPAN_REGIONS.find((r) => r.id === region)?.label ?? "도쿄";

  function startPlan() {
    const params = new URLSearchParams({
      region,
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
      guests: String(guests),
    });
    router.push(`/planner?${params.toString()}`);
  }

  return (
    <>
      <section className="brand-hero">
        <div className="brand-hero-content">
          <div className="hero-badge">
            <span className="hero-badge-star">✦</span>
            일본 여행, 이제 나믿고
          </div>

          <div className="hero-app-logo">
            <BrandMark size={64} />
          </div>

          <p className="hero-kr">{APP_TAGLINE}</p>
          <h1 className="hero-title font-montserrat">{APP_NAME}</h1>
          <p className="hero-ja">{APP_TAGLINE_JA}</p>
          <p className="hero-sub">{APP_DESCRIPTION}</p>
          <p className="hero-cities">
            <MapPin size={14} />
            도쿄 · 오사카 · 교토 · 후쿠오카 · 삿포로
          </p>

          <div className="search-box">
            <div className="sb-section">
              <div className="sb-label">여행지</div>
              <label className="city-select">
                <select
                  id="hero-region"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="city-select-native"
                  aria-label="여행지"
                >
                  {JAPAN_REGIONS.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.label}
                    </option>
                  ))}
                </select>
                <span>{regionLabel}</span>
                <ChevronDown size={14} />
              </label>
            </div>

            <div className="sb-divider" />

            <div className="sb-section sb-section--dates">
              <TripDateRangePicker
                variant="hero"
                label="날짜 선택"
                value={dateRange}
                onChange={setDateRange}
              />
            </div>

            <div className="sb-divider" />

            <div className="sb-section">
              <label htmlFor="hero-guests" className="sb-label">
                인원
              </label>
              <input
                id="hero-guests"
                type="number"
                min={1}
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="sb-value-input"
              />
            </div>

            <button type="button" onClick={startPlan} className="sb-btn">
              믿음의 플랜시작
            </button>
          </div>
        </div>
      </section>

      <div className="trust-row">
        {TRUST_PILLS.map((pill) => (
          <div key={pill.label} className="trust-pill">
            <span className={`tp-dot ${pill.dot}`} />
            {pill.label}
          </div>
        ))}
      </div>
    </>
  );
}

```

---

### `src/features/home/components/planner-preview-section.tsx`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/features/home/components/planner-preview-section.tsx` |
| **레이어** | Feature UI |
| **역할** | 기능별 React 컴포넌트 (프레젠테이션) |
| **기능 모듈** | `features/home` |

```tsx
import Link from "next/link";
import { PLANNER_TIMELINE } from "@/features/home/lib/home-data";

export function PlannerPreviewSection() {
  return (
    <section>
      <h2 className="section-title">나의 여행 일정 플래너 (예시)</h2>
      <div className="planner-preview">
        <div>
          <h3 className="mb-5 text-lg font-bold">6박 7일 도쿄 &amp; 교토 여행</h3>
          <div className="nihon-timeline">
            {PLANNER_TIMELINE.map((item) => (
              <div key={item.day} className="nihon-timeline-item">
                <p className="mb-1 font-bold text-[var(--primary)]">{item.day}</p>
                <p className="mb-1 text-base font-medium">{item.spot}</p>
                <p className="text-[13px] text-[#777]">{item.memo}</p>
              </div>
            ))}
          </div>
          <Link
            href="/planner"
            className="mt-6 inline-block text-sm font-medium text-[var(--primary)] hover:underline"
          >
            나만의 일정 만들기 →
          </Link>
        </div>
        <div className="map-mockup">🗺️ 지도 연동 영역 (준비 중)</div>
      </div>
    </section>
  );
}

```

---

### `src/features/home/components/popular-destinations.tsx`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/features/home/components/popular-destinations.tsx` |
| **레이어** | Feature UI |
| **역할** | 기능별 React 컴포넌트 (프레젠테이션) |
| **기능 모듈** | `features/home` |

```tsx
import Link from "next/link";
import { POPULAR_DESTINATIONS } from "@/features/home/lib/home-data";

export function PopularDestinations() {
  return (
    <section>
      <h2 className="section-title">인기 여행지</h2>
      <div className="destinations-grid">
        {POPULAR_DESTINATIONS.map((dest) => (
          <article key={dest.id} className="dest-card">
            <div
              className="dest-card-img"
              style={{ backgroundImage: `url('${dest.image}')` }}
            />
            <div className="p-5">
              <h3 className="mb-2 text-lg font-bold">{dest.title}</h3>
              <p className="mb-5 line-clamp-2 text-sm leading-relaxed text-[var(--muted)]">
                {dest.desc}
              </p>
              <Link href={dest.href} className="btn-card-dark">
                일정 짜기
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

```

---

### `src/features/home/lib/home-data.ts`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/features/home/lib/home-data.ts` |
| **레이어** | Feature Lib |
| **역할** | 기능별 유틸 · 필터 · 매핑 |
| **기능 모듈** | `features/home` |

```typescript
/** 홈 히어로 배경 — 교토 풍경 (원본 메인과 동일 Unsplash) */
export const HOME_HERO_BACKGROUND =
  "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1920&q=80";

export const POPULAR_DESTINATIONS = [
  {
    id: "TOKYO",
    title: "도쿄",
    desc: "시부야 크로싱, 도쿄타워 등 현대와 전통이 공존하는 메가시티",
    image:
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80",
    href: "/planner?region=TOKYO",
  },
  {
    id: "KYOTO",
    title: "교토",
    desc: "아라시야마 대나무숲과 아기자기한 신사들이 가득한 전통 도시",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
    href: "/planner?region=OSAKA_KYOTO",
  },
  {
    id: "OSAKA",
    title: "오사카",
    desc: "도톤보리 글리코상과 맛있는 길거리 음식이 가득한 식도락의 천국",
    image:
      "https://images.unsplash.com/photo-1773841040192-c83fc7a95f8a?auto=format&fit=crop&w=800&q=80",
    href: "/planner?region=OSAKA_KYOTO",
  },
  {
    id: "HOKKAIDO",
    title: "홋카이도",
    desc: "라벤더 밭과 하얀 눈발, 온천을 즐길 수 있는 최고의 자연 휴양지",
    image:
      "https://images.unsplash.com/photo-1542640244-7e672d6cef4e?auto=format&fit=crop&w=800&q=80",
    href: "/planner?region=SAPPORO",
  },
] as const;

export const PLANNER_TIMELINE = [
  {
    day: "1일차 - 도쿄 도착",
    spot: "나리타 공항 ➡️ 숙소 체크인",
    memo: "공항철도 이용, 신주쿠 인근 숙소 이동",
  },
  {
    day: "2일차 - 쇼핑 & 트렌드",
    spot: "시부야 스카이 ➡️ 하라주쿠",
    memo: "오후 4시 전망대 예약 필수, 인생샷 스팟",
  },
  {
    day: "3일차 - 도쿄의 전통",
    spot: "아사쿠사 센소지 ➡️ 아키하바라",
    memo: "전통 인력거 체험 및 굿즈 투어",
  },
] as const;

export const AI_SUGGESTIONS = [
  {
    name: "후시미 이나리",
    desc: "교토 · 무료 입장 · 이른 아침 추천",
    href: "/attractions?region=OSAKA_KYOTO",
  },
  {
    name: "라멘 투어 코스",
    desc: "이치란 · 후쿠오카 스타일 · ★4.8",
    href: "/restaurants",
  },
  {
    name: "삿포로 눈축제 코스",
    desc: "2월 시즌 · 온천+맥주",
    href: "/attractions?region=SAPPORO",
  },
] as const;

```

---

### `src/features/itinerary/components/sortable-day-items.tsx`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/features/itinerary/components/sortable-day-items.tsx` |
| **레이어** | Feature UI |
| **역할** | 기능별 React 컴포넌트 (프레젠테이션) |
| **기능 모듈** | `features/itinerary` |

```tsx
"use client";

import {
  DndContext,
  DragOverlay,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Image from "next/image";
import { Card } from "@/shared/ui/card";
import type { JapanRegionId } from "@/shared/lib/constants";
import { resolvePlaceImage } from "@/features/trips/server/trip-images";
import { Clock, GripVertical, Train } from "lucide-react";
import { useState } from "react";

export type SortablePlaceItem = {
  id: string;
  placeName: string;
  startTime?: string | null;
  endTime?: string | null;
  transport?: string | null;
};

const inputClass =
  "w-full rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-800 outline-none focus:border-rose-300 focus:ring-1 focus:ring-rose-200";

function stopDragPointer(e: React.PointerEvent) {
  e.stopPropagation();
}

function ItemRowContent({
  item,
  region,
  dragHandle,
  elevated,
  editable,
  onPatch,
}: {
  item: SortablePlaceItem;
  region?: JapanRegionId;
  dragHandle?: React.ReactNode;
  elevated?: boolean;
  editable?: boolean;
  onPatch?: (patch: Partial<Pick<SortablePlaceItem, "startTime" | "endTime" | "transport">>) => void;
}) {
  const thumb = region ? resolvePlaceImage(item.placeName, region) : null;

  return (
    <Card
      className={`mb-2 flex items-start gap-2 !py-2.5 ${elevated ? "shadow-lg ring-2 ring-rose-300" : ""}`}
    >
      {dragHandle}
      {thumb ? (
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-slate-100">
          <Image src={thumb} alt="" fill className="object-cover" sizes="56px" />
        </div>
      ) : null}
      <div className="min-w-0 flex-1 space-y-2">
        <p className="text-sm font-medium text-slate-900">{item.placeName}</p>

        {editable && onPatch ? (
          <>
            <div className="flex items-center gap-2">
              <Clock size={14} className="shrink-0 text-slate-400" aria-hidden />
              <input
                type="time"
                value={item.startTime ?? ""}
                onChange={(e) => onPatch({ startTime: e.target.value || null })}
                onPointerDown={stopDragPointer}
                className={`${inputClass} flex-1`}
                aria-label={`${item.placeName} 시작 시간`}
              />
              <span className="text-xs text-slate-400">~</span>
              <input
                type="time"
                value={item.endTime ?? ""}
                onChange={(e) => onPatch({ endTime: e.target.value || null })}
                onPointerDown={stopDragPointer}
                className={`${inputClass} flex-1`}
                aria-label={`${item.placeName} 종료 시간`}
              />
            </div>
            <div className="flex items-center gap-2">
              <Train size={14} className="shrink-0 text-slate-400" aria-hidden />
              <input
                type="text"
                value={item.transport ?? ""}
                onChange={(e) => onPatch({ transport: e.target.value || null })}
                onPointerDown={stopDragPointer}
                placeholder="이동 수단 (예: 지하철, 도보, 택시)"
                className={inputClass}
                aria-label={`${item.placeName} 이동 수단`}
              />
            </div>
          </>
        ) : (
          <>
            {item.startTime || item.endTime ? (
              <p className="flex items-center gap-1 text-xs text-slate-500">
                <Clock size={12} />
                {item.startTime ?? "—"}
                {item.endTime ? ` – ${item.endTime}` : ""}
              </p>
            ) : null}
            {item.transport ? (
              <p className="flex items-center gap-1 text-xs text-slate-500">
                <Train size={12} />
                {item.transport}
              </p>
            ) : null}
          </>
        )}
      </div>
    </Card>
  );
}

function SortableRow({
  item,
  dragHandleLabel,
  region,
  editable,
  onPatch,
}: {
  item: SortablePlaceItem;
  dragHandleLabel: string;
  region?: JapanRegionId;
  editable?: boolean;
  onPatch?: (patch: Partial<Pick<SortablePlaceItem, "startTime" | "endTime" | "transport">>) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.35 : 1,
  };

  return (
    <li ref={setNodeRef} style={style} className="list-none">
      <ItemRowContent
        item={item}
        region={region}
        editable={editable}
        onPatch={onPatch}
        dragHandle={
          <button
            type="button"
            className="touch-none shrink-0 cursor-grab rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 active:cursor-grabbing active:bg-slate-200"
            aria-label={dragHandleLabel}
            {...attributes}
            {...listeners}
          >
            <GripVertical size={20} />
          </button>
        }
      />
    </li>
  );
}

type Props = {
  items: SortablePlaceItem[];
  /** 순서·시간·이동 수단 변경 시 호출 */
  onChange: (items: SortablePlaceItem[]) => void;
  emptyMessage?: string;
  region?: JapanRegionId;
  /** true면 시간·이동 수단 입력 필드 표시 */
  editable?: boolean;
};

/** 하루 일정 안의 관광지 순서·시간·이동 수단 편집 */
export function SortableDayItems({
  items,
  onChange,
  emptyMessage = "등록된 장소가 없습니다.",
  region,
  editable = false,
}: Props) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeItem = activeId ? items.find((it) => it.id === activeId) : null;

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  function patchItem(
    itemId: string,
    patch: Partial<Pick<SortablePlaceItem, "startTime" | "endTime" | "transport">>,
  ) {
    onChange(items.map((it) => (it.id === itemId ? { ...it, ...patch } : it)));
  }

  function onDragStart(event: DragStartEvent) {
    setActiveId(String(event.active.id));
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveId(null);
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = items.findIndex((it) => it.id === active.id);
    const newIndex = items.findIndex((it) => it.id === over.id);
    if (oldIndex < 0 || newIndex < 0) return;
    onChange(arrayMove(items, oldIndex, newIndex));
  }

  if (items.length === 0) {
    return <p className="text-sm text-slate-500">{emptyMessage}</p>;
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragCancel={() => setActiveId(null)}
    >
      <SortableContext items={items.map((it) => it.id)} strategy={verticalListSortingStrategy}>
        <ul className="m-0 p-0">
          {items.map((item) => (
            <SortableRow
              key={item.id}
              item={item}
              region={region}
              editable={editable}
              onPatch={(patch) => patchItem(item.id, patch)}
              dragHandleLabel={`${item.placeName} 순서 변경`}
            />
          ))}
        </ul>
      </SortableContext>
      <DragOverlay dropAnimation={{ duration: 180 }}>
        {activeItem ? (
          <div className="w-[min(100vw-2rem,420px)]">
            <ItemRowContent
              item={activeItem}
              region={region}
              elevated
              dragHandle={
                <span className="shrink-0 rounded-lg p-1.5 text-slate-400">
                  <GripVertical size={20} />
                </span>
              }
            />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

```

---

### `src/features/notifications/components/notification-form.tsx`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/features/notifications/components/notification-form.tsx` |
| **레이어** | Feature UI |
| **역할** | 기능별 React 컴포넌트 (프레젠테이션) |
| **기능 모듈** | `features/notifications` |

```tsx
"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";

export function NotificationForm() {
  const [enabled, setEnabled] = useState(true);
  const [notifyTime, setNotifyTime] = useState("08:00");
  const [kakaoUserId, setKakaoUserId] = useState("");
  const [preview, setPreview] = useState("");
  const [tripTitle, setTripTitle] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [sendStatus, setSendStatus] = useState("");
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadPreview = useCallback(async () => {
    const res = await fetch("/api/notifications/preview");
    if (!res.ok) return;
    const d = await res.json();
    setPreview(d.preview ?? "");
    setTripTitle(d.tripTitle ?? null);
  }, []);

  useEffect(() => {
    fetch("/api/notifications/settings")
      .then((r) => r.json())
      .then((d) => {
        if (d.enabled !== undefined) setEnabled(d.enabled);
        if (d.notifyTime) setNotifyTime(d.notifyTime);
        if (d.kakaoUserId) setKakaoUserId(d.kakaoUserId);
      })
      .finally(() => setLoading(false));
    loadPreview();
  }, [loadPreview]);

  async function save() {
    setSaved(false);
    await fetch("/api/notifications/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ enabled, notifyTime, kakaoUserId }),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  async function sendTest() {
    setSending(true);
    setSendStatus("");
    const res = await fetch("/api/notifications/send-test", { method: "POST" });
    const d = await res.json();
    setSending(false);
    if (!res.ok) {
      setSendStatus(d.error ?? "발송 실패 — 카카오 재로그인(메시지 동의) 후 다시 시도");
      return;
    }
    setSendStatus(d.message ?? "카카오톡으로 보냈습니다.");
  }

  if (loading) {
    return <p className="text-sm text-slate-500">설정 불러오는 중...</p>;
  }

  return (
    <div className="space-y-4">
      <Card className="space-y-4">
        <label className="flex items-center gap-2 text-sm font-medium">
          <input
            type="checkbox"
            checked={enabled}
            onChange={(e) => setEnabled(e.target.checked)}
            className="h-4 w-4 rounded border-slate-300"
          />
          알림 수신 (켜두면 매일 지정 시간에 발송)
        </label>

        <label className="block text-sm">
          <span className="font-medium">발송 시간</span>
          <input
            type="time"
            value={notifyTime}
            onChange={(e) => setNotifyTime(e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2"
          />
        </label>

        <div className="rounded-xl bg-slate-50 px-3 py-2 text-xs text-slate-600">
          {kakaoUserId ? (
            <>
              카카오 연동됨 (사용자 ID: <span className="font-mono">{kakaoUserId}</span>)
            </>
          ) : (
            <>
              카카오 로그인 후 자동으로 ID가 저장됩니다. 수동 입력:
              <input
                value={kakaoUserId}
                onChange={(e) => setKakaoUserId(e.target.value)}
                placeholder="카카오 숫자 ID"
                className="mt-1 w-full rounded-lg border border-slate-200 px-2 py-1.5 font-mono text-xs"
              />
            </>
          )}
        </div>

        <Button type="button" className="w-full" onClick={save}>
          설정 저장
        </Button>
        {saved ? <p className="text-center text-sm text-emerald-600">저장되었습니다.</p> : null}
      </Card>

      <Card className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-slate-800">오늘 일정 미리보기</p>
          {tripTitle ? <span className="text-xs text-slate-500">{tripTitle}</span> : null}
        </div>
        <pre className="whitespace-pre-wrap rounded-xl bg-[#FEE500]/20 p-3 text-xs leading-relaxed text-slate-800">
          {preview || "오늘 진행 중인 여행 일정이 없습니다."}
        </pre>
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-950">
          <p className="font-medium">지정 시간 자동 발송 — 추가로 필요한 것</p>
          <p className="mt-1 leading-relaxed">
            <code className="rounded bg-white/80 px-1">CRON_SECRET</code>만으로는
            보내지 않습니다. <strong>매 분</strong> cron API를 호출하는 프로그램이
            켜져 있어야 합니다.
          </p>
          <ul className="mt-2 list-inside list-disc space-y-0.5">
            <li>
              로컬: <code className="rounded bg-white/80 px-1">start.bat</code>만 실행하면 Cron도
              함께 돌아갑니다 (CRON_SECRET 설정 시)
            </li>
            <li>배포: Vercel Cron + 환경 변수 <code className="rounded bg-white/80 px-1">CRON_SECRET</code></li>
            <li>발송 시간은 <strong>한국 시간(KST)</strong> 기준</li>
          </ul>
        </div>
        <p className="text-xs text-slate-500">
          포함 항목: 장소명 · 시간 · 이동수단. 카카오 로그인 + 「카카오톡 메시지 전송」 동의
          필요. 메시지는 본인 카카오톡 「나와의 채팅」으로 옵니다.
        </p>
        <Button
          type="button"
          className="w-full border border-[#F5DC00] bg-[#FEE500] font-medium text-[#191919] hover:bg-[#F5DC00]"
          onClick={sendTest}
          disabled={sending}
        >
          {sending ? "발송 중..." : "지금 카카오톡으로 테스트 발송"}
        </Button>
        {sendStatus ? <p className="text-center text-sm text-slate-700">{sendStatus}</p> : null}
        <Button type="button" variant="secondary" className="w-full" onClick={loadPreview}>
          미리보기 새로고침
        </Button>
      </Card>
    </div>
  );
}

```

---

### `src/features/notifications/index.ts`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/features/notifications/index.ts` |
| **레이어** | Feature Barrel |
| **역할** | 기능 모듈 public export |
| **기능 모듈** | `features/notifications` |

```typescript
export { NotificationForm } from "./components/notification-form";

```

---

### `src/features/notifications/server/index.ts`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/features/notifications/server/index.ts` |
| **레이어** | Feature Server |
| **역할** | 기능별 서버 로직 · DB · 비즈니스 규칙 |
| **기능 모듈** | `features/notifications` |

```typescript
export { getTodayScheduleForUser } from "./today-schedule";
export { getKstDateLabel, getKstDayRange } from "./time/kst";
export * from "./kakao/schedule-message";
export * from "./kakao/message";
export * from "./kakao/talk-api";
export * from "./kakao/sync-kakao-user";

```

---

### `src/features/notifications/server/kakao/message.ts`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/features/notifications/server/kakao/message.ts` |
| **레이어** | Feature Server |
| **역할** | 기능별 서버 로직 · DB · 비즈니스 규칙 |
| **기능 모듈** | `features/notifications` |

```typescript
import { prisma } from "@/server/db/prisma";
import { formatScheduleMessage, type ScheduleItemPayload } from "./schedule-message";
import { getValidKakaoAccessToken, sendKakaoTalkMemo } from "./talk-api";

export type { ScheduleItemPayload };

export async function sendKakaoScheduleMessage(params: {
  userId: string;
  dateLabel: string;
  items: ScheduleItemPayload[];
}) {
  const text = formatScheduleMessage(params.dateLabel, params.items);

  const kakaoAccount = await prisma.account.findFirst({
    where: { userId: params.userId, provider: "kakao" },
    select: {
      id: true,
      access_token: true,
      refresh_token: true,
      expires_at: true,
    },
  });

  if (!kakaoAccount?.access_token && !kakaoAccount?.refresh_token) {
    return {
      ok: false,
      mode: "no_token" as const,
      text,
      error: "카카오 로그인(메시지 동의) 후 다시 시도하세요.",
    };
  }

  try {
    const accessToken = await getValidKakaoAccessToken(kakaoAccount);
    await sendKakaoTalkMemo(accessToken, text);
    return { ok: true, mode: "kakaotalk" as const, text };
  } catch (e) {
    const message = e instanceof Error ? e.message : "카카오톡 발송 실패";
    console.error("[kakao] send failed:", message);
    return { ok: false, mode: "error" as const, text, error: message };
  }
}

```

---

### `src/features/notifications/server/kakao/schedule-message.ts`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/features/notifications/server/kakao/schedule-message.ts` |
| **레이어** | Feature Server |
| **역할** | 기능별 서버 로직 · DB · 비즈니스 규칙 |
| **기능 모듈** | `features/notifications` |

```typescript
export type ScheduleItemPayload = {
  placeName: string;
  startTime?: string | null;
  transport?: string | null;
};

export function formatScheduleMessage(dateLabel: string, items: ScheduleItemPayload[]) {
  if (items.length === 0) {
    return `📅 ${dateLabel} 여행 일정\n\n오늘 등록된 일정이 없습니다.`;
  }

  const lines = items.map((item, i) => {
    const time = item.startTime ? ` ${item.startTime}` : "";
    const transport = item.transport ? ` · ${item.transport}` : "";
    return `${i + 1}. ${item.placeName}${time}${transport}`;
  });

  return [`📅 ${dateLabel} 당일 여행 일정`, "", ...lines].join("\n");
}

```

---

### `src/features/notifications/server/kakao/sync-kakao-user.ts`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/features/notifications/server/kakao/sync-kakao-user.ts` |
| **레이어** | Feature Server |
| **역할** | 기능별 서버 로직 · DB · 비즈니스 규칙 |
| **기능 모듈** | `features/notifications` |

```typescript
import { prisma } from "@/server/db/prisma";

/** 카카오 로그인 시 알림 설정에 카카오 사용자 ID 저장 */
export async function syncKakaoUserForNotifications(
  userId: string,
  kakaoProviderAccountId: string,
) {
  await prisma.notificationSetting.upsert({
    where: { userId },
    create: {
      userId,
      enabled: true,
      notifyTime: "08:00",
      kakaoUserId: kakaoProviderAccountId,
    },
    update: { kakaoUserId: kakaoProviderAccountId },
  });
}

```

---

### `src/features/notifications/server/kakao/talk-api.ts`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/features/notifications/server/kakao/talk-api.ts` |
| **레이어** | Feature Server |
| **역할** | 기능별 서버 로직 · DB · 비즈니스 규칙 |
| **기능 모듈** | `features/notifications` |

```typescript
import { prisma } from "@/server/db/prisma";

const KAKAO_TOKEN_URL = "https://kauth.kakao.com/oauth/token";
const KAKAO_MEMO_SEND_URL = "https://kapi.kakao.com/v2/api/talk/memo/default/send";

type KakaoAccountRow = {
  id: string;
  access_token: string | null;
  refresh_token: string | null;
  expires_at: number | null;
};

function getKakaoClientConfig() {
  const clientId = process.env.AUTH_KAKAO_ID;
  const clientSecret = process.env.AUTH_KAKAO_SECRET;
  if (!clientId || !clientSecret) {
    throw new Error("AUTH_KAKAO_ID 또는 AUTH_KAKAO_SECRET 이 없습니다.");
  }
  return { clientId, clientSecret };
}

async function refreshKakaoAccessToken(account: KakaoAccountRow): Promise<string> {
  const { clientId, clientSecret } = getKakaoClientConfig();
  if (!account.refresh_token) {
    throw new Error("카카오 refresh_token 이 없습니다. 카카오로 다시 로그인하세요.");
  }

  const body = new URLSearchParams({
    grant_type: "refresh_token",
    client_id: clientId,
    client_secret: clientSecret,
    refresh_token: account.refresh_token,
  });

  const res = await fetch(KAKAO_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  const data = (await res.json()) as {
    access_token?: string;
    refresh_token?: string;
    expires_in?: number;
    error?: string;
    error_description?: string;
  };

  if (!res.ok || !data.access_token) {
    throw new Error(data.error_description ?? data.error ?? "카카오 토큰 갱신 실패");
  }

  const expiresAt = data.expires_in
    ? Math.floor(Date.now() / 1000) + data.expires_in
    : null;

  await prisma.account.update({
    where: { id: account.id },
    data: {
      access_token: data.access_token,
      refresh_token: data.refresh_token ?? account.refresh_token,
      expires_at: expiresAt,
    },
  });

  return data.access_token;
}

/** 만료 60초 전이면 refresh */
export async function getValidKakaoAccessToken(account: KakaoAccountRow): Promise<string> {
  if (!account.access_token) {
    return refreshKakaoAccessToken(account);
  }

  const nowSec = Math.floor(Date.now() / 1000);
  if (account.expires_at && account.expires_at <= nowSec + 60) {
    return refreshKakaoAccessToken(account);
  }

  return account.access_token;
}

export async function sendKakaoTalkMemo(accessToken: string, text: string) {
  const baseUrl = process.env.AUTH_URL ?? "http://localhost:3000";
  const trimmed = text.length > 900 ? `${text.slice(0, 897)}...` : text;

  const template = {
    object_type: "text",
    text: trimmed,
    link: {
      web_url: baseUrl,
      mobile_web_url: baseUrl,
    },
    button_title: "일정 보기",
  };

  const body = new URLSearchParams({
    template_object: JSON.stringify(template),
  });

  const res = await fetch(KAKAO_MEMO_SEND_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });

  const data = (await res.json()) as { result_code?: number; msg?: string };

  if (!res.ok || data.result_code !== 0) {
    throw new Error(data.msg ?? `카카오톡 발송 실패 (${res.status})`);
  }

  return data;
}

```

---

### `src/features/notifications/server/time/kst.ts`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/features/notifications/server/time/kst.ts` |
| **레이어** | Feature Server |
| **역할** | 기능별 서버 로직 · DB · 비즈니스 규칙 |
| **기능 모듈** | `features/notifications` |

```typescript
const TZ = "Asia/Seoul";

function kstParts(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(date);

  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? "";

  return {
    year: get("year"),
    month: get("month"),
    day: get("day"),
    hour: get("hour"),
    minute: get("minute"),
  };
}

/** 알림 설정 시간과 비교용 (예: "08:00", 한국 시간) */
export function getKstTimeKey(date = new Date()) {
  const { hour, minute } = kstParts(date);
  return `${hour.padStart(2, "0")}:${minute.padStart(2, "0")}`;
}

export function getKstDateLabel(date = new Date()) {
  const { year, month, day } = kstParts(date);
  return `${year}-${month}-${day}`;
}

/** 당일 TripDay 조회용 (DB DateTime은 UTC로 저장) */
export function getKstDayRange(date = new Date()) {
  const dateLabel = getKstDateLabel(date);
  const dayStart = new Date(`${dateLabel}T00:00:00+09:00`);
  const dayEnd = new Date(`${dateLabel}T23:59:59.999+09:00`);
  return { dayStart, dayEnd, dateLabel };
}

```

---

### `src/features/notifications/server/today-schedule.ts`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/features/notifications/server/today-schedule.ts` |
| **레이어** | Feature Server |
| **역할** | 기능별 서버 로직 · DB · 비즈니스 규칙 |
| **기능 모듈** | `features/notifications` |

```typescript
import { prisma } from "@/server/db/prisma";
import type { ScheduleItemPayload } from "@/features/notifications/server/kakao/schedule-message";
import { getKstDateLabel, getKstDayRange } from "@/features/notifications/server/time/kst";

export async function getTodayScheduleForUser(userId: string) {
  const now = new Date();
  const { dayStart, dayEnd } = getKstDayRange(now);

  const trip = await prisma.trip.findFirst({
    where: {
      userId,
      startDate: { lte: dayEnd },
      endDate: { gte: dayStart },
    },
    include: {
      days: {
        where: { date: { gte: dayStart, lte: dayEnd } },
        include: { items: { orderBy: { sortOrder: "asc" } } },
        take: 1,
      },
    },
    orderBy: { startDate: "asc" },
  });

  const day = trip?.days[0];
  const items: ScheduleItemPayload[] =
    day?.items.map((i) => ({
      placeName: i.placeName,
      startTime: i.startTime,
      transport: i.transport,
    })) ?? [];

  return {
    dateLabel: getKstDateLabel(now),
    tripTitle: trip?.title,
    items,
  };
}

```

---

### `src/features/planner/components/planner-panel.tsx`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/features/planner/components/planner-panel.tsx` |
| **레이어** | Feature UI |
| **역할** | 기능별 React 컴포넌트 (프레젠테이션) |
| **기능 모듈** | `features/planner` |

```tsx
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { TripDateRangePicker } from "@/shared/ui/trip-date-range-picker";
import { SortableDayItems, type SortablePlaceItem } from "@/features/itinerary/components/sortable-day-items";
import { JAPAN_REGIONS, type JapanRegionId } from "@/shared/lib/constants";
import { defaultTripRange, type TripDateRange } from "@/shared/lib/trip-dates";
import type { ItineraryDay } from "@/server/ai/types";

type PlannerItem = SortablePlaceItem & {
  placeId?: string;
};

type PlannerDay = {
  dayIndex: number;
  date: string;
  items: PlannerItem[];
};

function withStableIds(days: ItineraryDay[]): PlannerDay[] {
  return days.map((day) => ({
    dayIndex: day.dayIndex,
    date: day.date,
    items: day.items.map((item) => ({
      id: crypto.randomUUID(),
      placeName: item.placeName,
      startTime: item.startTime,
      endTime: item.endTime,
      transport: item.transport,
      placeId: item.placeId,
    })),
  }));
}

export function PlannerPanel() {
  const searchParams = useSearchParams();
  const [region, setRegion] = useState<JapanRegionId>("OSAKA_KYOTO");
  const [origin, setOrigin] = useState("인천공항");
  const [dateRange, setDateRange] = useState<TripDateRange>(() => defaultTripRange());
  const [travelers, setTravelers] = useState(2);
  const [budgetKrw, setBudgetKrw] = useState(1500000);
  const [days, setDays] = useState<PlannerDay[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const regionParam = searchParams.get("region");
    const start = searchParams.get("startDate");
    const end = searchParams.get("endDate");
    const guests = searchParams.get("guests");

    if (regionParam && JAPAN_REGIONS.some((r) => r.id === regionParam)) {
      setRegion(regionParam as JapanRegionId);
    }
    if (start && end) {
      setDateRange({ startDate: start, endDate: end });
    }
    if (guests) {
      const n = Number(guests);
      if (n >= 1) setTravelers(n);
    }
  }, [searchParams]);

  async function generate() {
    setLoading(true);
    const res = await fetch("/api/ai/itinerary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        region,
        origin,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        budgetKrw,
        travelers,
      }),
    });
    const data = await res.json();
    setDays(withStableIds(data.days ?? []));
    setLoading(false);
  }

  function updateDayItems(dayIndex: number, items: SortablePlaceItem[]) {
    setDays((prev) =>
      prev.map((day) => (day.dayIndex === dayIndex ? { ...day, items } : day)),
    );
  }

  return (
    <div className="space-y-4">
      <Card className="space-y-3">
        <label className="block text-sm font-medium">지역</label>
        <select
          value={region}
          onChange={(e) => setRegion(e.target.value as JapanRegionId)}
          className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
        >
          {JAPAN_REGIONS.map((r) => (
            <option key={r.id} value={r.id}>
              {r.label}
            </option>
          ))}
        </select>
        <input
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          placeholder="출발지"
          className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
        />
        <TripDateRangePicker value={dateRange} onChange={setDateRange} label="여행 기간" />
        <label className="block text-sm font-medium">인원</label>
        <input
          type="number"
          min={1}
          value={travelers}
          onChange={(e) => setTravelers(Number(e.target.value))}
          className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
        />
        <input
          type="number"
          value={budgetKrw}
          onChange={(e) => setBudgetKrw(Number(e.target.value))}
          className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
          placeholder="예산 (원)"
        />
        <Button type="button" className="w-full" onClick={generate} disabled={loading}>
          {loading ? "일정 생성 중..." : "AI 일정 생성"}
        </Button>
      </Card>

      {days.length > 0 ? (
        <p className="text-sm text-slate-600">
          각 일차에서 ≡으로 순서를 바꾸고, 시간·이동 수단을 입력할 수 있습니다. (플래너 미리보기 —
          저장된 일정에 반영하려면 일정 저장 후 trips에서 확인)
        </p>
      ) : null}

      {days.map((day) => (
        <Card key={day.dayIndex}>
          <h3 className="mb-2 font-semibold">
            {day.dayIndex}일차 · {day.date}
          </h3>
          <SortableDayItems
            items={day.items}
            region={region}
            editable
            onChange={(items) => updateDayItems(day.dayIndex, items)}
            emptyMessage="이 날짜에 배정된 장소가 없습니다."
          />
        </Card>
      ))}
    </div>
  );
}

```

---

### `src/features/profile/components/delete-account-button.tsx`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/features/profile/components/delete-account-button.tsx` |
| **레이어** | Feature UI |
| **역할** | 기능별 React 컴포넌트 (프레젠테이션) |
| **기능 모듈** | `features/profile` |

```tsx
"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";

type DeleteAccountSectionProps = {
  hasPassword: boolean;
  oauthProviders: string[];
};

const PROVIDER_LABEL: Record<string, string> = {
  google: "Google",
  kakao: "카카오",
};

export function DeleteAccountSection({ hasPassword, oauthProviders }: DeleteAccountSectionProps) {
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onDelete() {
    setError("");
    if (confirm !== "탈퇴") {
      setError('확인란에 "탈퇴"를 입력해 주세요.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/user/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password: hasPassword ? password : undefined,
          confirm: "탈퇴",
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "탈퇴 처리에 실패했습니다.");
        return;
      }
      await signOut({ callbackUrl: "/" });
    } finally {
      setLoading(false);
    }
  }

  const oauthLabel = oauthProviders
    .map((p) => PROVIDER_LABEL[p] ?? p)
    .filter(Boolean)
    .join(", ");

  return (
    <Card className="mt-8 border-rose-100 bg-rose-50/40">
      <p className="text-sm font-medium text-rose-900">계정 탈퇴</p>
      <p className="mt-1 text-sm text-slate-600">
        탈퇴 시 여행·체크리스트·예산·채팅 등 모든 데이터가 삭제되며 복구할 수 없습니다.
      </p>
      {oauthLabel ? (
        <p className="mt-2 text-xs text-slate-500">연동 로그인: {oauthLabel}</p>
      ) : null}

      {!open ? (
        <Button
          type="button"
          variant="ghost"
          className="mt-4 text-rose-600 hover:bg-rose-100"
          onClick={() => setOpen(true)}
        >
          계정 탈퇴하기
        </Button>
      ) : (
        <div className="mt-4 space-y-3">
          {hasPassword ? (
            <input
              type="password"
              placeholder="현재 비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm"
            />
          ) : null}
          <input
            placeholder='확인을 위해 "탈퇴" 입력'
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm"
          />
          {error ? <p className="text-sm text-rose-600">{error}</p> : null}
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant="ghost"
              className="text-rose-600"
              disabled={loading}
              onClick={onDelete}
            >
              {loading ? "처리 중..." : "탈퇴 확정"}
            </Button>
            <Button
              type="button"
              variant="outline"
              disabled={loading}
              onClick={() => {
                setOpen(false);
                setPassword("");
                setConfirm("");
                setError("");
              }}
            >
              취소
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}

```

---

### `src/features/profile/components/profile-form.tsx`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/features/profile/components/profile-form.tsx` |
| **레이어** | Feature UI |
| **역할** | 기능별 React 컴포넌트 (프레젠테이션) |
| **기능 모듈** | `features/profile` |

```tsx
"use client";

import { useState } from "react";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";

export function ProfileForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [saved, setSaved] = useState(false);

  async function save() {
    await fetch("/api/user/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone }),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <Card className="space-y-3">
      <p className="text-sm font-medium">프로필 수정</p>
      <input
        placeholder="이름"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full rounded-xl border px-3 py-2 text-sm"
      />
      <input
        placeholder="전화번호"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full rounded-xl border px-3 py-2 text-sm"
      />
      <Button type="button" onClick={save}>
        저장
      </Button>
      {saved ? <p className="text-sm text-emerald-600">저장되었습니다.</p> : null}
    </Card>
  );
}

```

---

### `src/features/restaurants/components/restaurant-card.tsx`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/features/restaurants/components/restaurant-card.tsx` |
| **레이어** | Feature UI |
| **역할** | 기능별 React 컴포넌트 (프레젠테이션) |
| **기능 모듈** | `features/restaurants` |

```tsx
"use client";

import Image from "next/image";
import type { RestaurantResult } from "@/server/ai/types";
import { Clock, MapPin, Star, UtensilsCrossed, Wallet } from "lucide-react";

type Props = {
  restaurant: RestaurantResult;
  onSelect: () => void;
};

export function RestaurantCard({ restaurant, onSelect }: Props) {
  const photo = restaurant.imageUrl;
  const menuPreview = restaurant.menuItems?.slice(0, 3) ?? [];

  return (
    <button
      type="button"
      onClick={onSelect}
      className="group w-full overflow-hidden rounded-2xl border border-slate-200/80 bg-white text-left shadow-sm transition hover:scale-[1.01] hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
    >
      <div className="relative">
        {photo ? (
          <div className="relative aspect-[4/3] w-full sm:aspect-[16/10]">
            <Image
              src={photo}
              alt={restaurant.name}
              fill
              className="object-cover object-center transition duration-300 group-hover:scale-[1.02]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              unoptimized
            />
          </div>
        ) : (
          <div className="flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-amber-100 to-rose-100 text-sm text-slate-500 sm:aspect-[16/10]">
            사진 준비 중
          </div>
        )}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

        <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-slate-700 shadow-sm">
          {restaurant.cuisine}
        </span>

        <span
          className={`pointer-events-none absolute right-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-semibold shadow-sm ${
            restaurant.reservationRequired
              ? "bg-amber-400/90 text-slate-900"
              : "bg-emerald-500/90 text-white"
          }`}
        >
          {restaurant.reservationRequired ? "예약 권장" : "워크인"}
        </span>

        <div className="pointer-events-none absolute bottom-0 left-0 right-0 p-4 text-white">
          <div className="flex items-end justify-between gap-2">
            <h3 className="text-lg font-bold leading-tight drop-shadow-sm">{restaurant.name}</h3>
            <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-white/20 px-2 py-1 text-sm font-semibold backdrop-blur-sm">
              <Star size={14} className="fill-amber-400 text-amber-400" />
              {restaurant.rating.toFixed(1)}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-2 px-3 py-2.5">
        <div className="flex flex-wrap gap-3 text-xs text-slate-600">
          <span className="inline-flex items-center gap-1">
            <Wallet size={13} className="text-rose-500" />약 {restaurant.avgPriceKrw.toLocaleString()}원
          </span>
          <span className="inline-flex items-center gap-1">
            <MapPin size={13} className="text-slate-400" />
            {restaurant.distanceKm}km
          </span>
          {restaurant.reviewCount ? (
            <span className="inline-flex items-center gap-1">
              <Star size={13} className="text-amber-400" />
              리뷰 {restaurant.reviewCount.toLocaleString()}건
            </span>
          ) : null}
        </div>
        {menuPreview.length > 0 ? (
          <div className="flex flex-wrap items-center gap-1.5">
            <UtensilsCrossed size={12} className="shrink-0 text-rose-500" />
            {menuPreview.map((item) => (
              <span
                key={item}
                className="rounded-full bg-rose-50 px-2 py-0.5 text-[11px] font-medium text-rose-800"
              >
                {item}
              </span>
            ))}
            {(restaurant.menuItems?.length ?? 0) > menuPreview.length ? (
              <span className="text-[11px] text-slate-400">
                +{(restaurant.menuItems?.length ?? 0) - menuPreview.length}
              </span>
            ) : null}
          </div>
        ) : null}
        <p className="line-clamp-1 text-xs text-slate-500">
          <Clock size={12} className="mr-1 inline" />
          {restaurant.hours}
        </p>
      </div>
    </button>
  );
}

```

---

### `src/features/restaurants/components/restaurant-detail-modal.tsx`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/features/restaurants/components/restaurant-detail-modal.tsx` |
| **레이어** | Feature UI |
| **역할** | 기능별 React 컴포넌트 (프레젠테이션) |
| **기능 모듈** | `features/restaurants` |

```tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import type { RestaurantResult } from "@/server/ai/types";
import { Clock, MapPin, Star, UtensilsCrossed, Wallet, X } from "lucide-react";

type Props = {
  restaurant: RestaurantResult | null;
  onClose: () => void;
};

export function RestaurantDetailModal({ restaurant, onClose }: Props) {
  const [lightbox, setLightbox] = useState(false);

  useEffect(() => {
    setLightbox(false);
  }, [restaurant?.id]);

  useEffect(() => {
    if (!restaurant) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (lightbox) {
        setLightbox(false);
        return;
      }
      onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [restaurant, onClose, lightbox]);

  if (!restaurant) return null;

  const mapsUrl = restaurant.address
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurant.address)}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurant.name)}`;

  return (
    <div
      className="fixed inset-0 z-[500] flex items-end justify-center p-0 sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`${restaurant.name} 상세 정보`}
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
        aria-label="닫기"
        onClick={onClose}
      />

      <div
        className="relative z-10 flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl sm:max-h-[88vh] sm:rounded-2xl md:flex-row md:max-h-[min(88vh,720px)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative shrink-0 md:flex md:min-h-0 md:w-[min(46%,400px)] md:flex-col md:self-stretch">
          {restaurant.imageUrl ? (
            <button
              type="button"
              onClick={() => setLightbox(true)}
              className="relative block aspect-[4/3] w-full cursor-zoom-in bg-slate-100 md:aspect-auto md:min-h-[280px] md:flex-1"
              aria-label="사진 크게 보기"
            >
              <Image
                src={restaurant.imageUrl}
                alt={restaurant.name}
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 400px"
                priority
                unoptimized
              />
              <span className="absolute bottom-3 right-3 rounded-full bg-black/50 px-2 py-0.5 text-[10px] text-white backdrop-blur-sm">
                탭하여 확대
              </span>
            </button>
          ) : (
            <div className="flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-amber-100 to-rose-100 text-slate-500 md:min-h-[280px] md:flex-1">
              사진 없음
            </div>
          )}

          <button
            type="button"
            onClick={onClose}
            className="absolute right-3 top-3 z-10 rounded-full bg-black/50 p-2 text-white backdrop-blur-sm hover:bg-black/65 md:right-auto md:left-3"
            aria-label="닫기"
          >
            <X size={20} />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto border-t border-slate-100 px-4 pb-6 pt-4 sm:px-6 md:border-l md:border-t-0">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <Badge>{restaurant.cuisine}</Badge>
              <h2 className="mt-2 text-xl font-bold text-slate-900">{restaurant.name}</h2>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-sm font-semibold text-amber-800">
              <Star size={15} className="fill-amber-500 text-amber-500" />
              {restaurant.rating.toFixed(1)}
              {restaurant.reviewCount
                ? ` · ${restaurant.reviewCount.toLocaleString()}개 평가`
                : ""}
            </span>
          </div>

          <div className="mt-4 grid gap-2 rounded-xl bg-slate-50 p-3 text-sm text-slate-700">
            <p className="flex items-center gap-2">
              <Wallet size={16} className="shrink-0 text-rose-500" />
              예상 1인 {restaurant.avgPriceKrw.toLocaleString()}원
            </p>
            <p className="flex items-center gap-2">
              <MapPin size={16} className="shrink-0 text-slate-400" />
              거리 약 {restaurant.distanceKm}km
            </p>
            <p className="flex items-start gap-2">
              <Clock size={16} className="mt-0.5 shrink-0 text-slate-400" />
              {restaurant.hours}
            </p>
            {restaurant.address ? (
              <p className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0 text-indigo-500" />
                {restaurant.address}
              </p>
            ) : null}
          </div>

          {restaurant.menuItems?.length ? (
            <div className="mt-4">
              <h3 className="flex items-center gap-1.5 text-sm font-semibold text-slate-900">
                <UtensilsCrossed size={16} className="text-rose-500" />
                대표 메뉴
              </h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {restaurant.menuItems.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-rose-100 bg-rose-50 px-3 py-1 text-sm font-medium text-rose-900"
                  >
                    {item}
                  </span>
                ))}
              </div>
              {restaurant.menuSummary ? (
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {restaurant.menuSummary}
                </p>
              ) : null}
            </div>
          ) : null}

          <div className="mt-4">
            <Badge tone={restaurant.reservationRequired ? "warning" : "success"}>
              {restaurant.reservationRequired
                ? "인기 맛집 — 예약을 권장합니다"
                : "워크인 방문 가능"}
            </Badge>
          </div>

          <div className="mt-5 flex flex-col gap-2 sm:flex-row">
            <Button type="button" variant="secondary" className="flex-1" onClick={onClose}>
              닫기
            </Button>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-rose-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-rose-600"
            >
              <MapPin size={16} />
              지도에서 보기
            </a>
          </div>
        </div>
      </div>

      {lightbox && restaurant.imageUrl ? (
        <div
          className="fixed inset-0 z-[510] flex items-center justify-center bg-black/95 p-4"
          role="dialog"
          aria-label="사진 확대 보기"
        >
          <button
            type="button"
            className="absolute inset-0"
            aria-label="닫기"
            onClick={() => setLightbox(false)}
          />
          <Image
            src={restaurant.imageUrl}
            alt={restaurant.name}
            width={1600}
            height={1200}
            className="relative z-10 max-h-[85vh] w-auto max-w-full object-contain"
            unoptimized
          />
          <button
            type="button"
            onClick={() => setLightbox(false)}
            className="absolute right-4 top-4 z-20 rounded-full bg-white/15 p-2 text-white hover:bg-white/25"
            aria-label="닫기"
          >
            <X size={24} />
          </button>
        </div>
      ) : null}
    </div>
  );
}

```

---

### `src/features/restaurants/components/restaurant-list.tsx`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/features/restaurants/components/restaurant-list.tsx` |
| **레이어** | Feature UI |
| **역할** | 기능별 React 컴포넌트 (프레젠테이션) |
| **기능 모듈** | `features/restaurants` |

```tsx
"use client";

import { useEffect, useState } from "react";
import { Card } from "@/shared/ui/card";
import { JAPAN_REGIONS, type JapanRegionId } from "@/shared/lib/constants";
import type { RestaurantResult } from "@/server/ai/types";
import { RestaurantCard } from "@/features/restaurants/components/restaurant-card";
import { RestaurantDetailModal } from "@/features/restaurants/components/restaurant-detail-modal";

export function RestaurantList() {
  const [region, setRegion] = useState<JapanRegionId>("TOKYO");
  const [items, setItems] = useState<RestaurantResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<RestaurantResult | null>(null);
  const [maxBudget, setMaxBudget] = useState(50000);
  const [maxDistance, setMaxDistance] = useState(5);
  const [minRating, setMinRating] = useState(3.5);

  useEffect(() => {
    setLoading(true);
    const q = new URLSearchParams({
      region,
      maxBudgetKrw: String(maxBudget),
      maxDistanceKm: String(maxDistance),
      minRating: String(minRating),
    });
    fetch(`/api/ai/restaurants?${q}`)
      .then((r) => r.json())
      .then((d) => setItems(d.items ?? []))
      .finally(() => setLoading(false));
  }, [region, maxBudget, maxDistance, minRating]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <select
          value={region}
          onChange={(e) => {
            setRegion(e.target.value as JapanRegionId);
            setSelected(null);
          }}
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm shadow-sm sm:max-w-xs"
        >
          {JAPAN_REGIONS.map((r) => (
            <option key={r.id} value={r.id}>
              {r.label}
            </option>
          ))}
        </select>
      </div>

      <Card className="grid gap-3 p-4">
        <label className="text-xs font-medium text-slate-600">
          최대 예산 {maxBudget.toLocaleString()}원
        </label>
        <input
          type="range"
          min={10000}
          max={100000}
          step={5000}
          value={maxBudget}
          onChange={(e) => setMaxBudget(Number(e.target.value))}
          className="w-full"
        />
        <label className="text-xs font-medium text-slate-600">거리 {maxDistance}km 이내</label>
        <input
          type="range"
          min={1}
          max={15}
          step={0.5}
          value={maxDistance}
          onChange={(e) => setMaxDistance(Number(e.target.value))}
          className="w-full"
        />
        <label className="text-xs font-medium text-slate-600">최소 평점 {minRating}</label>
        <input
          type="range"
          min={3}
          max={5}
          step={0.1}
          value={minRating}
          onChange={(e) => setMinRating(Number(e.target.value))}
          className="w-full"
        />
      </Card>

      <p className="text-xs text-slate-500">
        {loading ? "맛집 불러오는 중…" : `${items.length}곳 · 카드를 누르면 상세 정보를 볼 수 있습니다.`}
      </p>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-64 animate-pulse rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200"
            />
          ))}
        </div>
      ) : items.length === 0 ? (
        <p className="py-12 text-center text-sm text-slate-500">
          조건에 맞는 맛집이 없습니다. 필터를 넓혀 보세요.
        </p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((r) => (
            <li key={r.id}>
              <RestaurantCard restaurant={r} onSelect={() => setSelected(r)} />
            </li>
          ))}
        </ul>
      )}

      <RestaurantDetailModal restaurant={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

```

---

### `src/features/restaurants/index.ts`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/features/restaurants/index.ts` |
| **레이어** | Feature Barrel |
| **역할** | 기능 모듈 public export |
| **기능 모듈** | `features/restaurants` |

```typescript
export { RestaurantList } from "./components/restaurant-list";

```

---

### `src/features/restaurants/lib/menu-items.ts`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/features/restaurants/lib/menu-items.ts` |
| **레이어** | Feature Lib |
| **역할** | 기능별 유틸 · 필터 · 매핑 |
| **기능 모듈** | `features/restaurants` |

```typescript
export type RestaurantFoodFlags = {
  servesBreakfast?: boolean;
  servesLunch?: boolean;
  servesDinner?: boolean;
  servesCoffee?: boolean;
  servesDessert?: boolean;
  servesBeer?: boolean;
  servesWine?: boolean;
  servesVegetarianFood?: boolean;
};

const SIGNATURE_BY_TYPE: Record<string, string[]> = {
  ramen_restaurant: ["돈코츠 라멘", "쇼유 라멘", "차슈멘", "교자"],
  chinese_noodle_restaurant: ["짜장면", "짬뽕", "탕수육", "볶음밥"],
  noodle_shop: ["우동", "소바", "냉면", "덮밥"],
  sushi_restaurant: ["니기리", "사시미", "오마카세", "회덮밥"],
  japanese_restaurant: ["가이세키", "덮밥", "우동", "돈부리"],
  chinese_restaurant: ["짜장면", "볶음밥", "딤섬", "마파두부"],
  italian_restaurant: ["파스타", "피자", "리조또", "티라미수"],
  french_restaurant: ["코스 요리", "스테이크", "와인 페어링"],
  korean_restaurant: ["불고기", "비빔밥", "김치찌개", "갈비"],
  indian_restaurant: ["커리", "난", "탄두리 치킨", "빠니 푸리"],
  thai_restaurant: ["팟타이", "똠얌꿍", "그린 커리", "망고 스티키 라이스"],
  mexican_restaurant: ["타코", "부리또", "과카몰레", "엔칠라다"],
  american_restaurant: ["버거", "스테이크", "BBQ 립", "치킨 윙"],
  steak_house: ["릴레이 스테이크", "티본", "와규", "감자 사이드"],
  seafood_restaurant: ["회", "게 요리", "해물 덮밥", "스시"],
  barbecue_restaurant: ["야키니쿠", "갈비", "호르몬", "비빔밥"],
  izakaya: ["야키토리", "사케", "사시미", "오뎅"],
  cafe: ["핸드드립 커피", "라떼", "케이크", "샌드위치"],
  coffee_shop: ["에스프레소", "카페라떼", "스콘", "브런치"],
  bakery: ["멜론빵", "크루아상", "식빵", "파운드케이크"],
  bar: ["하이볼", "사케", "칵테일", "안주"],
  dessert_restaurant: ["파르페", "케이크", "아이스크림", "와플"],
  meal_takeaway: ["테이크아웃", "도시락", "벤토", "간편 식사"],
  fast_food_restaurant: ["버거", "프라이", "치킨", "음료"],
  sandwich_shop: ["샌드위치", "파니니", "샐러드", "수프"],
  brunch_restaurant: ["에그 베네딕트", "팬케이크", "브런치 플레이트"],
};

const CUISINE_FALLBACK: Record<string, string[]> = {
  라멘: ["돈코츠 라멘", "쇼유 라멘", "차슈멘"],
  스시: ["니기리", "사시미", "오마카세"],
  일식: ["덮밥", "우동", "가이세키"],
  중식: ["짜장면", "볶음밥", "딤섬"],
  이탈리안: ["파스타", "피자", "리조또"],
  카페: ["커피", "라떼", "디저트"],
  베이커리: ["빵", "페이스트리", "케이크"],
  바: ["칵테일", "하이볼", "안주"],
  테이크아웃: ["도시락", "테이크아웃 메뉴"],
  맛집: ["현지 인기 메뉴", "일본식 정식", "사이드 메뉴"],
};

const SUMMARY_KEYWORDS = [
  "돈코츠 라멘",
  "돈코쓰 라멘",
  "쇼유 라멘",
  "미소 라멘",
  "츠케멘",
  "오마카세",
  "니기리",
  "사시미",
  "야키니쿠",
  "야키토리",
  "우동",
  "소바",
  "덮밥",
  "돈부리",
  "가이세키",
  "파스타",
  "피자",
  "스테이크",
  "버거",
  "커리",
  "딤섬",
  "짜장면",
  "타코",
  "브런치",
  "케이크",
  "파르페",
  "티라미수",
];

const FLAG_MENU: { flag: keyof RestaurantFoodFlags; label: string }[] = [
  { flag: "servesBreakfast", label: "아침 메뉴" },
  { flag: "servesLunch", label: "점심 메뉴" },
  { flag: "servesDinner", label: "저녁 메뉴" },
  { flag: "servesCoffee", label: "커피" },
  { flag: "servesDessert", label: "디저트" },
  { flag: "servesBeer", label: "맥주" },
  { flag: "servesWine", label: "와인" },
  { flag: "servesVegetarianFood", label: "채식 메뉴" },
];

function normalizeMenuLabel(label: string): string {
  return label.replace(/돈코쓰/g, "돈코츠");
}

function unique(items: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const item of items) {
    const key = item.trim();
    if (!key || seen.has(key)) continue;
    seen.add(key);
    out.push(key);
  }
  return out;
}

function extractFromSummary(summary?: string): string[] {
  if (!summary?.trim()) return [];
  const text = summary.trim();
  return unique(
    SUMMARY_KEYWORDS.filter((kw) => text.includes(kw)).map(normalizeMenuLabel),
  );
}

function signatureFromTypes(types: string[] | undefined, cuisine: string): string[] {
  const ordered = [...(types ?? [])];
  for (const type of ordered) {
    const items = SIGNATURE_BY_TYPE[type];
    if (items?.length) return [...items];
  }
  return CUISINE_FALLBACK[cuisine] ?? CUISINE_FALLBACK["맛집"]!;
}

function extrasFromFlags(flags?: RestaurantFoodFlags): string[] {
  if (!flags) return [];
  return FLAG_MENU.filter((f) => flags[f.flag]).map((f) => f.label);
}

export function buildMenuItems(options: {
  types?: string[];
  primaryType?: string;
  cuisine: string;
  editorialSummary?: string;
  flags?: RestaurantFoodFlags;
  maxItems?: number;
}): string[] {
  const typeList = unique([
    ...(options.primaryType ? [options.primaryType] : []),
    ...(options.types ?? []),
  ]);

  const fromSummary = extractFromSummary(options.editorialSummary);
  const fromTypes = signatureFromTypes(typeList, options.cuisine);
  const fromFlags = extrasFromFlags(options.flags);

  const merged = unique([...fromSummary, ...fromTypes, ...fromFlags]);
  const max = options.maxItems ?? 6;
  return merged.slice(0, max);
}

```

---

### `src/features/restaurants/server/index.ts`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/features/restaurants/server/index.ts` |
| **레이어** | Feature Server |
| **역할** | 기능별 서버 로직 · DB · 비즈니스 규칙 |
| **기능 모듈** | `features/restaurants` |

```typescript
export { searchRestaurants } from "./restaurants.service";

```

---

### `src/features/restaurants/server/restaurants.service.ts`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/features/restaurants/server/restaurants.service.ts` |
| **레이어** | Feature Server |
| **역할** | 기능별 서버 로직 · DB · 비즈니스 규칙 |
| **기능 모듈** | `features/restaurants` |

```typescript
import { aiAdapter } from "@/server/ai/adapter";
import type { RestaurantResult, RestaurantSearchRequest } from "@/server/ai/types";
import { searchGoogleRestaurants } from "@/server/google-places/restaurants";
import { applyFromMap, buildKoTranslationMap } from "@/server/translate/ko-map";

async function applyKoToRestaurants(
  items: RestaurantResult[],
): Promise<RestaurantResult[]> {
  if (items.length === 0) return items;

  const map = await buildKoTranslationMap(
    items.flatMap((r) => [
      r.name,
      r.cuisine,
      r.hours,
      r.menuSummary,
      ...(r.menuItems ?? []),
    ]),
  );

  return items.map((r) => ({
    ...r,
    name: applyFromMap(r.name, map) ?? r.name,
    cuisine: applyFromMap(r.cuisine, map) ?? r.cuisine,
    hours: applyFromMap(r.hours, map) ?? r.hours,
    menuSummary: r.menuSummary ? (applyFromMap(r.menuSummary, map) ?? r.menuSummary) : undefined,
    menuItems: r.menuItems?.map((item) => applyFromMap(item, map) ?? item),
  }));
}

export async function searchRestaurants(
  req: RestaurantSearchRequest,
): Promise<RestaurantResult[]> {
  const fromGoogle = await searchGoogleRestaurants(req);
  if (fromGoogle?.length) return applyKoToRestaurants(fromGoogle);

  const items = await aiAdapter.searchRestaurants(req);
  return applyKoToRestaurants(items);
}

```

---

### `src/features/stays/components/stay-card.tsx`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/features/stays/components/stay-card.tsx` |
| **레이어** | Feature UI |
| **역할** | 기능별 React 컴포넌트 (프레젠테이션) |
| **기능 모듈** | `features/stays` |

```tsx
"use client";

import Image from "next/image";
import { MapPin, Star, Train, Sparkles, ExternalLink } from "lucide-react";
import type { AccommodationAmenity, AccommodationResult } from "@/server/ai/types";

const TYPE_LABEL: Record<string, string> = {
  HOTEL: "호텔",
  RYOKAN: "료칸",
  GUESTHOUSE: "게하",
};

const AMENITY_LABEL: Record<AccommodationAmenity, string> = {
  WIFI: "Wi-Fi",
  BREAKFAST: "조식",
  ONSEN: "온천",
  KITCHEN: "주방",
  PARKING: "주차",
  AIRPORT_BUS: "공항 셔틀",
  FAMILY: "패밀리",
  NON_SMOKING: "금연",
};

type Props = {
  stay: AccommodationResult;
  nights?: number;
  recommended?: boolean;
};

export function StayCard({ stay, nights = 1, recommended = false }: Props) {
  const totalPrice = stay.priceKrw * nights;
  const photos = stay.imageUrls?.length
    ? stay.imageUrls
    : stay.imageUrl
      ? [stay.imageUrl]
      : [];

  return (
    <article
      className={`group overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-md ${
        recommended ? "border-rose-300 ring-1 ring-rose-200" : "border-slate-200/80"
      }`}
    >
      <div className="relative aspect-[16/10] w-full">
        {photos.length > 0 ? (
          <Image
            src={photos[0]}
            alt={stay.name}
            fill
            className="object-cover transition duration-500 group-hover:scale-[1.02]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-rose-100 to-sky-100 text-xs text-slate-500">
            사진 준비 중
          </div>
        )}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

        {recommended ? (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-rose-500 px-2.5 py-0.5 text-[11px] font-semibold text-white shadow">
            <Sparkles size={12} />
            AI 추천
          </span>
        ) : null}

        {stay.highlight ? (
          <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-0.5 text-[11px] font-medium text-slate-700 shadow-sm">
            {stay.highlight}
          </span>
        ) : null}

        <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-2 p-3 text-white">
          <div className="min-w-0">
            <p className="text-[10px] font-medium uppercase tracking-wide text-white/80">
              {TYPE_LABEL[stay.type] ?? stay.type}
              {stay.area ? ` · ${stay.area}` : ""}
            </p>
            <h3 className="truncate text-base font-bold drop-shadow-sm">{stay.name}</h3>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-white/20 px-2 py-1 text-xs font-semibold backdrop-blur-sm">
            <Star size={12} className="fill-amber-400 text-amber-400" />
            {stay.rating}
          </span>
        </div>
      </div>

      <div className="space-y-3 px-3 py-3">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-600">
          {stay.nearestStation ? (
            <span className="inline-flex items-center gap-1">
              <Train size={12} className="text-sky-500" />
              {stay.nearestStation}
              {stay.walkMinutes != null ? ` · 도보 ${stay.walkMinutes}분` : ""}
            </span>
          ) : null}
          {stay.reviewCount ? (
            <span className="inline-flex items-center gap-1">
              <MapPin size={12} className="text-slate-400" />
              리뷰 {stay.reviewCount.toLocaleString()}건
            </span>
          ) : null}
        </div>

        {stay.amenities?.length ? (
          <div className="flex flex-wrap gap-1">
            {stay.amenities.map((a) => (
              <span
                key={a}
                className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600"
              >
                {AMENITY_LABEL[a]}
              </span>
            ))}
          </div>
        ) : null}

        {stay.recommendReason ? (
          <p className="rounded-lg bg-rose-50 px-2.5 py-1.5 text-[11px] font-medium text-rose-700">
            {stay.recommendReason}
          </p>
        ) : null}

        <div className="flex items-end justify-between border-t border-slate-100 pt-3">
          <div>
            <p className="text-xs text-slate-500">1박 {stay.priceKrw.toLocaleString()}원</p>
            {nights > 1 ? (
              <p className="text-sm font-semibold text-slate-800">
                총 {totalPrice.toLocaleString()}원
                <span className="ml-1 text-xs font-normal text-slate-500">({nights}박)</span>
              </p>
            ) : (
              <p className="text-base font-bold text-rose-600">
                {stay.priceKrw.toLocaleString()}원
              </p>
            )}
          </div>
          <a
            href={stay.bookingUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 rounded-full bg-rose-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-rose-700"
          >
            예약
            <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </article>
  );
}

```

---

### `src/features/stays/components/stay-search.tsx`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/features/stays/components/stay-search.tsx` |
| **레이어** | Feature UI |
| **역할** | 기능별 React 컴포넌트 (프레젠테이션) |
| **기능 모듈** | `features/stays` |

```tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { applyStayFilters } from "@/features/stays/lib/apply-stay-filters";
import type { StaySearchResponse } from "@/features/stays/server/stays.service";
import { JAPAN_REGIONS, type JapanRegionId } from "@/shared/lib/constants";
import type {
  AccommodationAmenity,
  AccommodationResult,
  AccommodationSearchRequest,
  AccommodationType,
} from "@/server/ai/types";
import { Calendar, CalendarCheck, Search, Sparkles, SlidersHorizontal } from "lucide-react";
import { StayCard } from "./stay-card";

type SortOption = "recommended" | "price-asc" | "price-desc" | "rating-desc";

type TripOption = {
  id: string;
  title: string;
  region: JapanRegionId;
  regionLabel: string;
  startDate: string;
  endDate: string;
  totalBudget: number | null;
  coverImage: string;
};

const TYPE_OPTIONS: { id: AccommodationType; label: string }[] = [
  { id: "HOTEL", label: "호텔" },
  { id: "RYOKAN", label: "료칸" },
  { id: "GUESTHOUSE", label: "게스트하우스" },
];

const AMENITY_OPTIONS: { id: AccommodationAmenity; label: string }[] = [
  { id: "WIFI", label: "Wi-Fi" },
  { id: "BREAKFAST", label: "조식" },
  { id: "ONSEN", label: "온천" },
  { id: "KITCHEN", label: "주방" },
  { id: "PARKING", label: "주차" },
  { id: "AIRPORT_BUS", label: "공항 셔틀" },
  { id: "FAMILY", label: "패밀리" },
  { id: "NON_SMOKING", label: "금연" },
];

const SORT_OPTIONS: { id: SortOption; label: string }[] = [
  { id: "recommended", label: "AI 추천순" },
  { id: "price-asc", label: "가격 낮은순" },
  { id: "price-desc", label: "가격 높은순" },
  { id: "rating-desc", label: "평점 높은순" },
];

function nightsBetween(checkIn: string, checkOut: string): number {
  if (!checkIn || !checkOut) return 1;
  const a = new Date(checkIn).getTime();
  const b = new Date(checkOut).getTime();
  if (Number.isNaN(a) || Number.isNaN(b) || b <= a) return 1;
  return Math.max(1, Math.round((b - a) / (1000 * 60 * 60 * 24)));
}

type StaySearchProps = {
  initialByRegion: Record<JapanRegionId, StaySearchResponse>;
  defaultSearch: Omit<AccommodationSearchRequest, "region">;
};

export function StaySearch({ initialByRegion, defaultSearch }: StaySearchProps) {
  const [region, setRegion] = useState<JapanRegionId>("TOKYO");
  const [checkIn, setCheckIn] = useState(defaultSearch.checkIn);
  const [checkOut, setCheckOut] = useState(defaultSearch.checkOut);
  const [guests, setGuests] = useState(defaultSearch.guests);
  const [budgetKrw, setBudgetKrw] = useState(defaultSearch.budgetKrw);
  const [types, setTypes] = useState<AccommodationType[]>(
    defaultSearch.types ?? ["HOTEL", "RYOKAN", "GUESTHOUSE"],
  );
  const [amenities, setAmenities] = useState<AccommodationAmenity[]>(
    defaultSearch.amenities ?? [],
  );
  const [area, setArea] = useState<string>(defaultSearch.area ?? "");
  const [sort, setSort] = useState<SortOption>(defaultSearch.sort ?? "recommended");

  const [trips, setTrips] = useState<TripOption[]>([]);
  const [linkedTripId, setLinkedTripId] = useState<string | null>(null);

  /** 날짜 등을 바꿔 API로 다시 받은 풀 (없으면 프리로드 풀 사용) */
  const [livePool, setLivePool] = useState<AccommodationResult[] | null>(null);
  const [loading, setLoading] = useState(false);

  const poolsByRegion = useMemo(() => {
    const out = {} as Record<JapanRegionId, AccommodationResult[]>;
    for (const r of JAPAN_REGIONS) {
      out[r.id] = initialByRegion[r.id]?.items ?? [];
    }
    return out;
  }, [initialByRegion]);

  const filterReq = useMemo(
    (): Omit<AccommodationSearchRequest, "region"> => ({
      checkIn,
      checkOut,
      guests,
      budgetKrw,
      types,
      amenities,
      area: area || undefined,
      sort,
    }),
    [checkIn, checkOut, guests, budgetKrw, types, amenities, area, sort],
  );

  const display = useMemo(() => {
    const pool = livePool ?? poolsByRegion[region] ?? [];
    return applyStayFilters(pool, { region, ...filterReq });
  }, [livePool, poolsByRegion, region, filterReq]);

  const { items, recommended, areas } = display;

  useEffect(() => {
    fetch("/api/trips")
      .then((r) => r.json())
      .then((d) => setTrips(d.trips ?? []))
      .catch(() => {});
  }, []);

  function toggleType(t: AccommodationType) {
    setTypes((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));
  }

  function toggleAmenity(a: AccommodationAmenity) {
    setAmenities((prev) => (prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]));
  }

  function applyTrip(trip: TripOption) {
    setLinkedTripId(trip.id);
    setRegion(trip.region);
    if (trip.startDate) setCheckIn(trip.startDate.slice(0, 10));
    if (trip.endDate) setCheckOut(trip.endDate.slice(0, 10));
    if (trip.totalBudget && trip.totalBudget > 0) {
      const nights = nightsBetween(
        trip.startDate.slice(0, 10),
        trip.endDate.slice(0, 10),
      );
      const accommodationShare = Math.round((trip.totalBudget * 0.35) / nights);
      if (accommodationShare > 0) setBudgetKrw(accommodationShare);
    }
  }

  async function search() {
    const datesMatchDefault =
      checkIn === defaultSearch.checkIn && checkOut === defaultSearch.checkOut;

    if (datesMatchDefault) {
      setLivePool(null);
      return;
    }

    setLoading(true);
    const q = new URLSearchParams({
      region,
      checkIn,
      checkOut,
      guests: String(guests),
      budgetKrw: String(budgetKrw),
      types: types.join(","),
      sort,
      live: "1",
    });
    if (amenities.length) q.set("amenities", amenities.join(","));
    if (area) q.set("area", area);

    try {
      const res = await fetch(`/api/ai/accommodations?${q}`);
      const data = await res.json();
      setLivePool(data.items ?? []);
    } finally {
      setLoading(false);
    }
  }

  function onRegionChange(next: JapanRegionId) {
    setRegion(next);
    setLivePool(null);
    setArea("");
  }

  const nights = useMemo(() => nightsBetween(checkIn, checkOut), [checkIn, checkOut]);
  const linkedTrip = trips.find((t) => t.id === linkedTripId);

  return (
    <div className="space-y-4">
      {trips.length > 0 ? (
        <Card className="space-y-3">
          <div className="flex items-center gap-2">
            <CalendarCheck size={16} className="text-rose-500" />
            <p className="text-sm font-medium text-slate-700">내 일정에서 가져오기</p>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {trips.map((trip) => {
              const selected = trip.id === linkedTripId;
              return (
                <button
                  key={trip.id}
                  type="button"
                  onClick={() => applyTrip(trip)}
                  className={`shrink-0 rounded-xl border px-3 py-2 text-left text-xs transition ${
                    selected
                      ? "border-rose-500 bg-rose-50 text-rose-700"
                      : "border-slate-200 bg-white text-slate-600 hover:border-rose-200"
                  }`}
                >
                  <p className="font-semibold">{trip.title}</p>
                  <p className="mt-0.5 text-[10px] text-slate-500">
                    {trip.regionLabel} · {trip.startDate.slice(5, 10)} – {trip.endDate.slice(5, 10)}
                  </p>
                </button>
              );
            })}
          </div>
          {linkedTrip ? (
            <p className="text-[11px] text-slate-500">
              일정 예산의 35%를 1박 숙박 예산으로 자동 설정했습니다. 필요 시 수정하세요.
            </p>
          ) : null}
        </Card>
      ) : null}

      <Card className="space-y-3">
        <select
          value={region}
          onChange={(e) => onRegionChange(e.target.value as JapanRegionId)}
          className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
        >
          {JAPAN_REGIONS.map((r) => (
            <option key={r.id} value={r.id}>
              {r.label}
            </option>
          ))}
        </select>

        <div className="grid grid-cols-2 gap-2">
          <label className="flex items-center gap-2 rounded-xl border border-slate-200 px-2 py-2 text-xs text-slate-500">
            <Calendar size={14} />
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full bg-transparent text-sm text-slate-800 outline-none"
            />
          </label>
          <label className="flex items-center gap-2 rounded-xl border border-slate-200 px-2 py-2 text-xs text-slate-500">
            <Calendar size={14} />
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full bg-transparent text-sm text-slate-800 outline-none"
            />
          </label>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <label className="rounded-xl border border-slate-200 px-3 py-2">
            <span className="block text-[10px] text-slate-500">인원</span>
            <input
              type="number"
              min={1}
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="w-full bg-transparent text-sm font-medium outline-none"
            />
          </label>
          <label className="rounded-xl border border-slate-200 px-3 py-2">
            <span className="block text-[10px] text-slate-500">1박 예산(원)</span>
            <input
              type="number"
              min={0}
              step={10000}
              value={budgetKrw}
              onChange={(e) => setBudgetKrw(Number(e.target.value))}
              className="w-full bg-transparent text-sm font-medium outline-none"
            />
          </label>
        </div>

        <div>
          <p className="mb-1 text-[11px] font-medium text-slate-500">숙소 유형</p>
          <div className="flex flex-wrap gap-1.5">
            {TYPE_OPTIONS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => toggleType(t.id)}
                className={`rounded-full px-3 py-1 text-xs transition ${
                  types.includes(t.id)
                    ? "bg-rose-600 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-1 flex items-center gap-1 text-[11px] font-medium text-slate-500">
            <SlidersHorizontal size={11} />
            편의시설 (선택)
          </p>
          <div className="flex flex-wrap gap-1.5">
            {AMENITY_OPTIONS.map((a) => (
              <button
                key={a.id}
                type="button"
                onClick={() => toggleAmenity(a.id)}
                className={`rounded-full px-3 py-1 text-xs transition ${
                  amenities.includes(a.id)
                    ? "bg-sky-600 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {a.label}
              </button>
            ))}
          </div>
        </div>

        {areas.length > 0 ? (
          <div>
            <p className="mb-1 text-[11px] font-medium text-slate-500">지역</p>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => setArea("")}
                className={`rounded-full px-3 py-1 text-xs transition ${
                  area === "" ? "bg-slate-800 text-white" : "bg-slate-100 text-slate-600"
                }`}
              >
                전체
              </button>
              {areas.map((a) => (
                <button
                  key={a}
                  type="button"
                  onClick={() => setArea(a)}
                  className={`rounded-full px-3 py-1 text-xs transition ${
                    area === a ? "bg-slate-800 text-white" : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        <Button type="button" className="w-full" onClick={search} disabled={loading}>
          <Search size={14} className="mr-1.5" />
          {loading ? "조회 중..." : "날짜·예산 변경 후 재검색"}
        </Button>
      </Card>

      {loading ? (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <li
              key={n}
              className="animate-pulse overflow-hidden rounded-2xl border border-slate-100 bg-white"
            >
              <div className="aspect-[16/10] bg-slate-200" />
              <div className="space-y-2 p-3">
                <div className="h-3 w-2/3 rounded bg-slate-200" />
                <div className="h-3 w-1/2 rounded bg-slate-100" />
              </div>
            </li>
          ))}
        </ul>
      ) : items.length === 0 ? (
        <Card className="text-center">
          <p className="text-sm text-slate-500">조건에 맞는 숙소가 없습니다. 필터를 조정해 주세요.</p>
        </Card>
      ) : (
        <>
          {recommended.length > 0 ? (
            <section className="space-y-2">
              <div className="flex items-center gap-1.5 px-1">
                <Sparkles size={14} className="text-rose-500" />
                <h2 className="text-sm font-semibold text-slate-800">
                  AI 추천 TOP {recommended.length}
                </h2>
                {nights > 1 ? (
                  <span className="ml-auto text-[11px] text-slate-500">{nights}박 기준</span>
                ) : null}
              </div>
              <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {recommended.map((stay) => (
                  <li key={`rec-${stay.id}`}>
                    <StayCard stay={stay} nights={nights} recommended />
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <section className="space-y-2">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-sm font-semibold text-slate-800">전체 결과 {items.length}곳</h2>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((stay) => (
                <li key={stay.id}>
                  <StayCard stay={stay} nights={nights} />
                </li>
              ))}
            </ul>
          </section>
        </>
      )}
    </div>
  );
}

```

---

### `src/features/stays/index.ts`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/features/stays/index.ts` |
| **레이어** | Feature Barrel |
| **역할** | 기능 모듈 public export |
| **기능 모듈** | `features/stays` |

```typescript
export { StaySearch } from "./components/stay-search";

```

---

### `src/features/stays/lib/apply-stay-filters.ts`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/features/stays/lib/apply-stay-filters.ts` |
| **레이어** | Feature Lib |
| **역할** | 기능별 유틸 · 필터 · 매핑 |
| **기능 모듈** | `features/stays` |

```typescript
import type {
  AccommodationAmenity,
  AccommodationResult,
  AccommodationSearchRequest,
  AccommodationType,
} from "@/server/ai/types";
import { pickRecommended, rankStays } from "@/features/stays/server/stays-recommend";
import type { StaySearchResponse } from "@/features/stays/server/stays.service";

function deriveAreas(items: AccommodationResult[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const s of items) {
    if (!s.area) continue;
    const match = s.area.match(/^([가-힣]+(?:구|군|동|쵸|마치))/);
    const head = match ? match[1] : s.area.split(/\s/)[0];
    if (head && !seen.has(head)) {
      seen.add(head);
      out.push(head);
    }
  }
  return out.slice(0, 10);
}

/** 프리로드된 숙박 풀에 검색 조건(필터·정렬)만 클라이언트에서 적용 */
export function applyStayFilters(
  pool: AccommodationResult[],
  req: Pick<
    AccommodationSearchRequest,
    "types" | "amenities" | "area" | "sort" | "budgetKrw" | "checkIn" | "checkOut" | "guests"
  >,
): StaySearchResponse {
  let filtered = [...pool];

  if (req.area) {
    filtered = filtered.filter((s) => (s.area ?? "").includes(req.area!));
  }

  if (req.types?.length) {
    filtered = filtered.filter((s) => req.types!.includes(s.type as AccommodationType));
  }

  if (req.amenities?.length) {
    filtered = filtered.filter((s) =>
      req.amenities!.every((a) => s.amenities?.includes(a as AccommodationAmenity)),
    );
  }

  const ranked = rankStays(filtered, req as AccommodationSearchRequest);
  const recommended = pickRecommended(ranked);

  return {
    items: ranked,
    recommended,
    areas: deriveAreas(ranked),
    total: ranked.length,
  };
}

```

---

### `src/features/stays/server/index.ts`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/features/stays/server/index.ts` |
| **레이어** | Feature Server |
| **역할** | 기능별 서버 로직 · DB · 비즈니스 규칙 |
| **기능 모듈** | `features/stays` |

```typescript
export { searchStays } from "./stays.service";

```

---

### `src/features/stays/server/stays-recommend.ts`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/features/stays/server/stays-recommend.ts` |
| **레이어** | Feature Server |
| **역할** | 기능별 서버 로직 · DB · 비즈니스 규칙 |
| **기능 모듈** | `features/stays` |

```typescript
import type {
  AccommodationAmenity,
  AccommodationResult,
  AccommodationSearchRequest,
} from "@/server/ai/types";

type ScoreBreakdown = {
  score: number;
  reasons: string[];
};

function nightsBetween(checkIn: string, checkOut: string): number {
  if (!checkIn || !checkOut) return 1;
  const a = new Date(checkIn).getTime();
  const b = new Date(checkOut).getTime();
  if (Number.isNaN(a) || Number.isNaN(b) || b <= a) return 1;
  return Math.max(1, Math.round((b - a) / (1000 * 60 * 60 * 24)));
}

function budgetFit(price: number, budget: number): { score: number; status: "under" | "fit" | "over" } {
  if (budget <= 0) return { score: 0.5, status: "fit" };
  if (price <= budget * 0.6) return { score: 0.85, status: "under" };
  if (price <= budget) return { score: 1, status: "fit" };
  if (price <= budget * 1.2) return { score: 0.55, status: "over" };
  return { score: 0.2, status: "over" };
}

function ratingScore(rating: number): number {
  return Math.max(0, Math.min(rating / 5, 1));
}

function amenityScore(
  stayAmenities: AccommodationAmenity[] | undefined,
  requested: AccommodationAmenity[] | undefined,
): { score: number; matched: AccommodationAmenity[] } {
  if (!requested?.length) return { score: 0, matched: [] };
  if (!stayAmenities?.length) return { score: 0, matched: [] };
  const matched = requested.filter((a) => stayAmenities.includes(a));
  return { score: matched.length / requested.length, matched };
}

function typeScore(stayType: string, requested?: string[]): number {
  if (!requested?.length) return 1;
  return requested.includes(stayType) ? 1 : 0.3;
}

const AMENITY_LABEL: Record<AccommodationAmenity, string> = {
  WIFI: "Wi-Fi",
  BREAKFAST: "조식",
  ONSEN: "온천",
  KITCHEN: "주방",
  PARKING: "주차",
  AIRPORT_BUS: "공항 셔틀",
  FAMILY: "패밀리",
  NON_SMOKING: "금연",
};

export function scoreStay(stay: AccommodationResult, req: AccommodationSearchRequest): ScoreBreakdown {
  const nights = nightsBetween(req.checkIn, req.checkOut);
  const totalBudget = req.budgetKrw * nights;
  const stayTotal = stay.priceKrw * nights;

  const budget = budgetFit(stayTotal, totalBudget);
  const rating = ratingScore(stay.rating);
  const amenity = amenityScore(stay.amenities, req.amenities);
  const tScore = typeScore(stay.type, req.types);

  const score = +(
    budget.score * 0.45 +
    rating * 0.3 +
    amenity.score * 0.15 +
    tScore * 0.1
  ).toFixed(3);

  const reasons: string[] = [];
  if (budget.status === "under") reasons.push("예산 대비 저렴");
  if (budget.status === "fit") reasons.push("예산에 딱 맞음");
  if (budget.status === "over" && budget.score > 0.4) reasons.push("예산 조금 초과");
  if (stay.rating >= 4.5) reasons.push(`평점 ${stay.rating} 우수`);
  if (amenity.matched.length > 0) {
    reasons.push(`${amenity.matched.map((a) => AMENITY_LABEL[a]).join("·")} 보유`);
  }
  if (stay.walkMinutes != null && stay.walkMinutes <= 5) reasons.push("역 5분 이내");

  return { score, reasons };
}

export function rankStays(
  stays: AccommodationResult[],
  req: AccommodationSearchRequest,
): AccommodationResult[] {
  const scored = stays.map((s) => {
    const { score, reasons } = scoreStay(s, req);
    return {
      ...s,
      score,
      recommendReason: reasons.length ? reasons.slice(0, 2).join(" · ") : undefined,
    };
  });

  const sort = req.sort ?? "recommended";
  switch (sort) {
    case "price-asc":
      return scored.sort((a, b) => a.priceKrw - b.priceKrw);
    case "price-desc":
      return scored.sort((a, b) => b.priceKrw - a.priceKrw);
    case "rating-desc":
      return scored.sort((a, b) => b.rating - a.rating);
    case "recommended":
    default:
      return scored.sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
  }
}

export function pickRecommended(
  ranked: AccommodationResult[],
  limit = 3,
): AccommodationResult[] {
  return [...ranked]
    .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
    .slice(0, limit);
}

export { AMENITY_LABEL };

```

---

### `src/features/stays/server/stays.service.ts`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/features/stays/server/stays.service.ts` |
| **레이어** | Feature Server |
| **역할** | 기능별 서버 로직 · DB · 비즈니스 규칙 |
| **기능 모듈** | `features/stays` |

```typescript
import { aiAdapter } from "@/server/ai/adapter";
import type {
  AccommodationResult,
  AccommodationSearchRequest,
} from "@/server/ai/types";
import { pickRecommended, rankStays } from "./stays-recommend";

export type StaySearchResponse = {
  items: AccommodationResult[];
  recommended: AccommodationResult[];
  areas: string[];
  total: number;
};

function deriveAreas(items: AccommodationResult[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const s of items) {
    if (!s.area) continue;
    const match = s.area.match(/^([가-힣]+(?:구|군|동|쵸|마치))/);
    const head = match ? match[1] : s.area.split(/\s/)[0];
    if (head && !seen.has(head)) {
      seen.add(head);
      out.push(head);
    }
  }
  return out.slice(0, 10);
}

export async function searchStays(req: AccommodationSearchRequest): Promise<StaySearchResponse> {
  let pool: AccommodationResult[] = [];

  try {
    const fromAi = await aiAdapter.searchAccommodations(req);
    pool = Array.isArray(fromAi) ? fromAi : [];
  } catch {
    pool = [];
  }

  if (req.area) {
    pool = pool.filter((s) => (s.area ?? "").includes(req.area!));
  }

  if (req.types?.length) {
    pool = pool.filter((s) => req.types!.includes(s.type));
  }

  const ranked = rankStays(pool, req);
  const recommended = pickRecommended(ranked);
  const areas = deriveAreas(ranked);

  return {
    items: ranked,
    recommended,
    areas,
    total: ranked.length,
  };
}

```

---

### `src/features/trips/components/share-join-banner.tsx`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/features/trips/components/share-join-banner.tsx` |
| **레이어** | Feature UI |
| **역할** | 기능별 React 컴포넌트 (프레젠테이션) |
| **기능 모듈** | `features/trips` |

```tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/shared/ui/button";

type Props = {
  shareToken: string;
  tripId: string;
  isLoggedIn: boolean;
  isOwner: boolean;
  isCollaborator: boolean;
};

export function ShareJoinBanner({
  shareToken,
  tripId,
  isLoggedIn,
  isOwner,
  isCollaborator,
}: Props) {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function joinTrip() {
    setLoading(true);
    setError("");
    const res = await fetch("/api/trips/join", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ shareToken }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      setError(data.error ?? "참여에 실패했습니다.");
      return;
    }
    setMessage(data.message ?? "참여했습니다.");
    router.push(`/trips/${data.tripId ?? tripId}`);
  }

  if (isOwner) {
    return (
      <div className="mb-4 rounded-xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-900">
        내가 만든 일정입니다.{" "}
        <Link href={`/trips/${tripId}`} className="font-medium underline">
          편집 페이지로 이동
        </Link>
      </div>
    );
  }

  if (isCollaborator) {
    return (
      <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
        이미 동행자로 참여 중입니다.{" "}
        <Link href={`/trips/${tripId}`} className="font-medium underline">
          함께 편집하기
        </Link>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950">
        로그인하면 이 일정에 동행자로 참여해 함께 편집할 수 있습니다.{" "}
        <Link href={`/login?callbackUrl=/share/${shareToken}`} className="font-medium underline">
          로그인
        </Link>
      </div>
    );
  }

  return (
    <div className="mb-4 space-y-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3">
      <p className="text-sm text-rose-950">동행자로 참여하면 일정 순서를 함께 편집할 수 있습니다.</p>
      {error ? <p className="text-sm text-rose-600">{error}</p> : null}
      {message ? <p className="text-sm text-emerald-700">{message}</p> : null}
      <Button type="button" onClick={joinTrip} disabled={loading}>
        {loading ? "참여 중..." : "동행자로 참여하기"}
      </Button>
    </div>
  );
}

```

---

### `src/features/trips/components/trip-actions.tsx`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/features/trips/components/trip-actions.tsx` |
| **레이어** | Feature UI |
| **역할** | 기능별 React 컴포넌트 (프레젠테이션) |
| **기능 모듈** | `features/trips` |

```tsx
"use client";

import { useState } from "react";
import { Button } from "@/shared/ui/button";

export function TripActions({ tripId, shareToken }: { tripId: string; shareToken: string | null }) {
  const [token, setToken] = useState(shareToken);
  const [inviteEmail, setInviteEmail] = useState("");

  async function createShareLink() {
    const res = await fetch(`/api/trips/${tripId}/share`, { method: "POST" });
    const data = await res.json();
    setToken(data.shareToken);
  }

  async function invite() {
    await fetch(`/api/trips/${tripId}/invite`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: inviteEmail }),
    });
    setInviteEmail("");
    alert("초대가 전송되었습니다. (이메일 연동 후 실제 발송)");
  }

  const shareUrl = token ? `${window.location.origin}/share/${token}` : "";

  return (
    <div className="space-y-3">
      <Button type="button" variant="secondary" onClick={createShareLink}>
        공유 링크 생성
      </Button>
      {shareUrl ? (
        <p className="break-all text-xs text-slate-600">{shareUrl}</p>
      ) : null}
      <div className="flex gap-2">
        <input
          value={inviteEmail}
          onChange={(e) => setInviteEmail(e.target.value)}
          placeholder="동행자 이메일"
          className="flex-1 rounded-xl border px-3 py-2 text-sm"
        />
        <Button type="button" onClick={invite}>
          초대
        </Button>
      </div>
    </div>
  );
}

```

---

### `src/features/trips/components/trip-card.tsx`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/features/trips/components/trip-card.tsx` |
| **레이어** | Feature UI |
| **역할** | 기능별 React 컴포넌트 (프레젠테이션) |
| **기능 모듈** | `features/trips` |

```tsx
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import type { JapanRegionId } from "@/shared/lib/constants";
import { getTripCoverImage, getTripGalleryImages } from "@/features/trips/server/trip-images";

type TripCardProps = {
  id: string;
  title: string;
  region: JapanRegionId;
  regionLabel: string;
  startDate: Date;
  endDate: Date;
  days: { items: { placeName: string }[] }[];
  badge?: string;
};

export function TripCard({
  id,
  title,
  region,
  regionLabel,
  startDate,
  endDate,
  days,
  badge,
}: TripCardProps) {
  const trip = { region, days };
  const cover = getTripCoverImage(trip);
  const thumbs = getTripGalleryImages(trip, 4).filter((u) => u !== cover).slice(0, 3);

  return (
    <Link href={`/trips/${id}`} className="group block overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition hover:shadow-lg">
      <div className="relative aspect-[4/3] w-full sm:aspect-[16/10]">
        <Image
          src={cover}
          alt={title}
          fill
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 640px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
        {badge ? (
          <span className="absolute left-3 top-3 rounded-full bg-sky-500/90 px-2 py-0.5 text-[11px] font-medium text-white">
            {badge}
          </span>
        ) : null}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <p className="text-xs font-medium uppercase tracking-wide text-white/80">{regionLabel}</p>
          <h3 className="mt-0.5 text-lg font-bold leading-tight">{title}</h3>
          <p className="mt-1 text-sm text-white/90">
            {format(startDate, "yyyy.MM.dd")} – {format(endDate, "yyyy.MM.dd")}
          </p>
        </div>
        {thumbs.length > 0 ? (
          <div className="absolute right-3 top-3 flex gap-1">
            {thumbs.map((src) => (
              <div key={src} className="relative h-10 w-10 overflow-hidden rounded-lg ring-2 ring-white/90">
                <Image src={src} alt="" fill className="object-cover" sizes="40px" />
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </Link>
  );
}

```

---

### `src/features/trips/components/trip-collaborator-panel.tsx`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/features/trips/components/trip-collaborator-panel.tsx` |
| **레이어** | Feature UI |
| **역할** | 기능별 React 컴포넌트 (프레젠테이션) |
| **기능 모듈** | `features/trips` |

```tsx
"use client";

import { useCallback, useState } from "react";
import { Users, Link2, Copy, UserPlus } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";

export type CollaboratorMember = {
  userId: string;
  name: string | null;
  email: string | null;
  image: string | null;
  role: "OWNER" | "EDITOR" | "VIEWER";
  invitedAt: string;
};

const ROLE_LABEL = {
  OWNER: "소유자",
  EDITOR: "편집 가능",
  VIEWER: "보기만",
} as const;

type Props = {
  tripId: string;
  shareToken: string | null;
  canManageCollaborators: boolean;
  initialMembers: CollaboratorMember[];
};

function displayName(m: CollaboratorMember) {
  return m.name ?? m.email?.split("@")[0] ?? "회원";
}

export function TripCollaboratorPanel({
  tripId,
  shareToken: initialToken,
  canManageCollaborators,
  initialMembers,
}: Props) {
  const [token, setToken] = useState(initialToken);
  const [members, setMembers] = useState(initialMembers);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<"EDITOR" | "VIEWER">("EDITOR");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const refreshMembers = useCallback(async () => {
    const res = await fetch(`/api/trips/${tripId}/collaborators`);
    if (!res.ok) return;
    const data = await res.json();
    setMembers(data.members ?? []);
  }, [tripId]);

  async function createShareLink() {
    setError("");
    const res = await fetch(`/api/trips/${tripId}/share`, { method: "POST" });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? "링크 생성에 실패했습니다.");
      return;
    }
    setToken(data.shareToken);
    setMessage("공유 링크가 준비되었습니다. 동행자에게 보내면 로그인 후 참여·편집할 수 있습니다.");
  }

  async function copyShareLink() {
    if (!token) return;
    const url = `${window.location.origin}/share/${token}`;
    await navigator.clipboard.writeText(url);
    setMessage("링크를 복사했습니다.");
  }

  async function inviteByEmail() {
    setLoading(true);
    setError("");
    setMessage("");
    const res = await fetch(`/api/trips/${tripId}/collaborators`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: inviteEmail, role: inviteRole }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      setError(data.error ?? "초대에 실패했습니다.");
      return;
    }
    setInviteEmail("");
    setMessage(data.message ?? "동행자를 추가했습니다.");
    await refreshMembers();
  }

  async function removeMember(userId: string) {
    if (!confirm("이 동행자를 일정에서 내보낼까요?")) return;
    const res = await fetch(`/api/trips/${tripId}/collaborators?userId=${userId}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "제거에 실패했습니다.");
      return;
    }
    setMessage("동행자를 내보냈습니다.");
    await refreshMembers();
  }

  const shareUrl = token ? `${typeof window !== "undefined" ? window.location.origin : ""}/share/${token}` : "";

  return (
    <Card className="space-y-4">
      <div className="flex items-center gap-2">
        <Users size={18} className="text-rose-600" />
        <h2 className="font-semibold text-slate-900">동행자 · 공동 편집</h2>
      </div>
      <p className="text-sm text-slate-600">
        이메일로 초대하거나 공유 링크를 보내 동행자가 일정 순서를 함께 편집할 수 있습니다.
      </p>

      {canManageCollaborators ? (
        <>
          <div className="space-y-2 rounded-xl border border-slate-100 bg-slate-50/80 p-3">
            <p className="flex items-center gap-1.5 text-xs font-medium text-slate-700">
              <Link2 size={13} />
              공유 링크
            </p>
            <div className="flex flex-wrap gap-2">
              <Button type="button" variant="secondary" onClick={createShareLink}>
                {token ? "링크 다시 생성" : "공유 링크 만들기"}
              </Button>
              {token ? (
                <Button type="button" variant="outline" onClick={copyShareLink}>
                  <Copy size={13} className="mr-1" />
                  복사
                </Button>
              ) : null}
            </div>
            {shareUrl ? (
              <p className="break-all text-xs text-slate-500">{shareUrl}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <p className="flex items-center gap-1.5 text-xs font-medium text-slate-700">
              <UserPlus size={13} />
              이메일로 초대 (가입된 회원)
            </p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                type="email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                placeholder="동행자 이메일"
                className="min-w-0 flex-1 rounded-xl border border-slate-200 px-3 py-2 text-sm"
              />
              <select
                value={inviteRole}
                onChange={(e) => setInviteRole(e.target.value as "EDITOR" | "VIEWER")}
                className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
              >
                <option value="EDITOR">편집 가능</option>
                <option value="VIEWER">보기만</option>
              </select>
              <Button type="button" onClick={inviteByEmail} disabled={loading || !inviteEmail}>
                초대
              </Button>
            </div>
          </div>
        </>
      ) : (
        <p className="text-sm text-slate-500">동행자로 참여 중입니다. 순서 편집은 편집 권한이 있을 때 가능합니다.</p>
      )}

      {error ? <p className="text-sm text-rose-600">{error}</p> : null}
      {message ? <p className="text-sm text-emerald-700">{message}</p> : null}

      <ul className="divide-y divide-slate-100 rounded-xl border border-slate-100">
        {members.map((m) => (
          <li key={m.userId} className="flex items-center justify-between gap-2 px-3 py-2.5">
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-slate-900">{displayName(m)}</p>
              <p className="truncate text-xs text-slate-500">{m.email}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] text-slate-600">
                {ROLE_LABEL[m.role]}
              </span>
              {canManageCollaborators && m.role !== "OWNER" ? (
                <button
                  type="button"
                  onClick={() => removeMember(m.userId)}
                  className="text-xs text-rose-600 hover:underline"
                >
                  내보내기
                </button>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}

```

---

### `src/features/trips/components/trip-itinerary-editor.tsx`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/features/trips/components/trip-itinerary-editor.tsx` |
| **레이어** | Feature UI |
| **역할** | 기능별 React 컴포넌트 (프레젠테이션) |
| **기능 모듈** | `features/trips` |

```tsx
"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { SortableDayItems, type SortablePlaceItem } from "@/features/itinerary/components/sortable-day-items";
import type { TripDayData } from "@/features/trips/components/trip-itinerary-gallery";
import type { JapanRegionId } from "@/shared/lib/constants";
import { GripVertical } from "lucide-react";

type DayState = {
  id: string;
  dayIndex: number;
  date: Date;
  items: SortablePlaceItem[];
};

type Props = {
  tripId: string;
  region: JapanRegionId;
  days: TripDayData[];
};

function toDayState(days: TripDayData[]): DayState[] {
  return days.map((day) => ({
    id: day.id,
    dayIndex: day.dayIndex,
    date: day.date,
    items: day.items.map((item) => ({
      id: item.id,
      placeName: item.placeName,
      startTime: item.startTime,
      endTime: item.endTime,
      transport: item.transport,
    })),
  }));
}

export function TripItineraryEditor({ tripId, region, days: initialDays }: Props) {
  const [days, setDays] = useState<DayState[]>(() => toDayState(initialDays));
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  function updateDayItems(dayId: string, items: SortablePlaceItem[]) {
    setDays((prev) => prev.map((d) => (d.id === dayId ? { ...d, items } : d)));
    setSaved(false);
    setError("");
  }

  async function saveOrder() {
    setSaving(true);
    setSaved(false);
    setError("");
    try {
      const res = await fetch(`/api/trips/${tripId}/itinerary`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          days: days.map((d) => ({
            dayId: d.id,
            items: d.items.map((it, index) => ({
              id: it.id,
              sortOrder: index,
              startTime: it.startTime ?? null,
              endTime: it.endTime ?? null,
              transport: it.transport ?? null,
            })),
          })),
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "save failed");
      }
      setSaved(true);
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "순서 저장에 실패했습니다. 로그인·권한을 확인해 주세요.",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="space-y-4">
      <Card className="border-rose-100 bg-gradient-to-br from-rose-50/80 to-white">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="flex items-center gap-1.5 text-sm font-semibold text-rose-800">
              <GripVertical size={16} />
              일정 편집
            </p>
            <p className="mt-1 text-sm text-slate-600">
              <strong>≡</strong>으로 순서 변경 · <strong>시간·이동 수단</strong> 직접 입력 후{" "}
              <strong>저장</strong>하세요.
            </p>
          </div>
          <Button type="button" onClick={saveOrder} disabled={saving}>
            {saving ? "저장 중..." : saved ? "저장됨 ✓" : "일정 저장"}
          </Button>
        </div>
        {error ? <p className="mt-2 text-sm text-rose-600">{error}</p> : null}
      </Card>

      {days.map((day) => (
        <Card key={day.id}>
          <div className="mb-3 flex items-baseline justify-between gap-2">
            <h3 className="font-semibold text-slate-900">{day.dayIndex + 1}일차</h3>
            <span className="text-sm text-slate-500">{format(day.date, "M월 d일")}</span>
          </div>
          <SortableDayItems
            items={day.items}
            region={region}
            editable
            onChange={(items) => updateDayItems(day.id, items)}
            emptyMessage="이 날짜에 등록된 관광지가 없습니다."
          />
        </Card>
      ))}
    </section>
  );
}

```

---

### `src/features/trips/components/trip-itinerary-gallery.tsx`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/features/trips/components/trip-itinerary-gallery.tsx` |
| **레이어** | Feature UI |
| **역할** | 기능별 React 컴포넌트 (프레젠테이션) |
| **기능 모듈** | `features/trips` |

```tsx
import Image from "next/image";
import { format } from "date-fns";
import { Clock, MapPin } from "lucide-react";
import type { JapanRegionId } from "@/shared/lib/constants";
import { getTripCoverImage, getTripGalleryImages, resolvePlaceImage } from "@/features/trips/server/trip-images";

export type TripDayData = {
  id: string;
  dayIndex: number;
  date: Date;
  items: {
    id: string;
    placeName: string;
    startTime: string | null;
    endTime: string | null;
    transport: string | null;
  }[];
};

type TripItineraryGalleryProps = {
  title: string;
  region: JapanRegionId;
  regionLabel?: string;
  startDate: Date;
  endDate: Date;
  days: TripDayData[];
  headerExtra?: React.ReactNode;
};

export function TripItineraryGallery({
  title,
  region,
  regionLabel,
  startDate,
  endDate,
  days,
  headerExtra,
}: TripItineraryGalleryProps) {
  const trip = { region, days };
  const hero = getTripCoverImage(trip);
  const mosaic = getTripGalleryImages(trip, 5);

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
        <div className="relative aspect-[16/9] w-full sm:aspect-[21/9]">
          <Image src={hero} alt={title} fill className="object-cover" sizes="100vw" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
          <div className="absolute bottom-0 left-0 right-0 p-5 text-white sm:p-6">
            {regionLabel ? (
              <p className="text-xs font-semibold uppercase tracking-wider text-white/75">{regionLabel}</p>
            ) : null}
            <h1 className="mt-1 text-2xl font-bold sm:text-3xl">{title}</h1>
            <p className="mt-2 text-sm text-white/90">
              {format(startDate, "yyyy.MM.dd")} – {format(endDate, "yyyy.MM.dd")} · {days.length}일
            </p>
          </div>
        </div>

        {mosaic.length > 1 ? (
          <div className="grid grid-cols-4 gap-0.5 bg-slate-100 p-0.5">
            {mosaic.slice(0, 4).map((src, i) => (
              <div
                key={src}
                className={`relative overflow-hidden ${i === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-square"}`}
              >
                <Image src={src} alt="" fill className="object-cover" sizes="(max-width:768px) 25vw, 15vw" />
              </div>
            ))}
          </div>
        ) : null}

        {headerExtra ? <div className="border-t border-slate-100 p-4">{headerExtra}</div> : null}
      </section>

      {days.map((day) => (
        <section key={day.id}>
          <div className="mb-3 flex items-baseline justify-between gap-2">
            <h2 className="text-lg font-bold text-slate-900">{day.dayIndex + 1}일차</h2>
            <span className="text-sm text-slate-500">{format(day.date, "M월 d일")}</span>
          </div>

          <div className="-mx-1 flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
            {day.items.length === 0 ? (
              <p className="px-1 text-sm text-slate-500">등록된 장소가 없습니다.</p>
            ) : (
              day.items.map((item) => {
                const photo = resolvePlaceImage(item.placeName, region);
                return (
                  <article
                    key={item.id}
                    className="w-[min(72vw,220px)] shrink-0 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm"
                  >
                    <div className="relative aspect-[3/4] w-full">
                      <Image
                        src={photo}
                        alt={item.placeName}
                        fill
                        className="object-cover"
                        sizes="220px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                        <p className="line-clamp-2 text-sm font-semibold leading-snug">{item.placeName}</p>
                        {item.startTime ? (
                          <p className="mt-1 flex items-center gap-1 text-xs text-white/85">
                            <Clock size={12} />
                            {item.startTime}
                            {item.endTime ? ` – ${item.endTime}` : ""}
                          </p>
                        ) : null}
                        {item.transport ? (
                          <p className="mt-0.5 flex items-center gap-1 text-xs text-white/75">
                            <MapPin size={12} />
                            {item.transport}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </article>
                );
              })
            )}
          </div>
        </section>
      ))}
    </div>
  );
}

```

---

### `src/features/trips/server/trip-access.ts`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/features/trips/server/trip-access.ts` |
| **레이어** | Feature Server |
| **역할** | 기능별 서버 로직 · DB · 비즈니스 규칙 |
| **기능 모듈** | `features/trips` |

```typescript
import type { CollaboratorRole } from "@prisma/client";
import { prisma } from "@/server/db/prisma";

const userSelect = { id: true, name: true, email: true, image: true } as const;

export type TripMember = {
  userId: string;
  name: string | null;
  email: string | null;
  image: string | null;
  role: CollaboratorRole;
  invitedAt: Date;
};

export type TripAccess = {
  tripId: string;
  ownerId: string;
  role: CollaboratorRole;
  canEdit: boolean;
  canManageCollaborators: boolean;
  members: TripMember[];
};

export async function getTripAccess(
  userId: string | undefined,
  tripId: string,
): Promise<TripAccess | null> {
  if (!userId) return null;

  const trip = await prisma.trip.findFirst({
    where: {
      id: tripId,
      OR: [{ userId }, { collaborators: { some: { userId } } }],
    },
    select: {
      id: true,
      userId: true,
      user: { select: userSelect },
      collaborators: {
        include: { user: { select: userSelect } },
        orderBy: { invitedAt: "asc" },
      },
    },
  });

  if (!trip) return null;

  const isOwner = trip.userId === userId;
  const collab = trip.collaborators.find((c) => c.userId === userId);
  const role: CollaboratorRole = isOwner ? "OWNER" : (collab?.role ?? "VIEWER");

  const members: TripMember[] = [
    {
      userId: trip.user.id,
      name: trip.user.name,
      email: trip.user.email,
      image: trip.user.image,
      role: "OWNER",
      invitedAt: new Date(0),
    },
    ...trip.collaborators.map((c) => ({
      userId: c.user.id,
      name: c.user.name,
      email: c.user.email,
      image: c.user.image,
      role: c.role,
      invitedAt: c.invitedAt,
    })),
  ];

  return {
    tripId: trip.id,
    ownerId: trip.userId,
    role,
    canEdit: role === "OWNER" || role === "EDITOR",
    canManageCollaborators: isOwner,
    members,
  };
}

export async function getEditableTrip(userId: string, tripId: string) {
  const access = await getTripAccess(userId, tripId);
  if (!access?.canEdit) return null;

  return prisma.trip.findFirst({
    where: { id: tripId },
    include: {
      days: { include: { items: { select: { id: true } } } },
    },
  });
}

export async function assertTripOwner(userId: string, tripId: string) {
  const trip = await prisma.trip.findFirst({
    where: { id: tripId, userId },
    select: { id: true },
  });
  return Boolean(trip);
}

```

---

### `src/features/trips/server/trip-images.ts`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/features/trips/server/trip-images.ts` |
| **레이어** | Feature Server |
| **역할** | 기능별 서버 로직 · DB · 비즈니스 규칙 |
| **기능 모듈** | `features/trips` |

```typescript
import { MOCK_ATTRACTIONS } from "@/features/attractions/server/mock-data";
import type { JapanRegionId } from "@/shared/lib/constants";

const PLACE_ALIASES: { keys: string[]; region: JapanRegionId; attractionId: string }[] = [
  { keys: ["오호리"], region: "FUKUOKA", attractionId: "ohori" },
  { keys: ["다자이후", "텐만구"], region: "FUKUOKA", attractionId: "dazaifu" },
  { keys: ["캐널시티", "캐널"], region: "FUKUOKA", attractionId: "canal-city" },
  { keys: ["나카스", "야타이"], region: "FUKUOKA", attractionId: "canal-city" },
  { keys: ["오사카성", "오사카"], region: "OSAKA_KYOTO", attractionId: "osaka-castle" },
  { keys: ["후시미", "이나리"], region: "OSAKA_KYOTO", attractionId: "fushimi-inari" },
  { keys: ["기요미즈"], region: "OSAKA_KYOTO", attractionId: "kiyomizu" },
  { keys: ["아라시야마", "대나무"], region: "OSAKA_KYOTO", attractionId: "arashiyama" },
  { keys: ["센소지", "아사쿠사"], region: "TOKYO", attractionId: "sensoji" },
  { keys: ["시부야", "도쿄타워", "전망"], region: "TOKYO", attractionId: "shibuya-sky" },
  { keys: ["메이지"], region: "TOKYO", attractionId: "meiji" },
  { keys: ["시계탑"], region: "SAPPORO", attractionId: "clock-tower" },
  { keys: ["오도리", "눈축제"], region: "SAPPORO", attractionId: "odori" },
  { keys: ["스스키노", "맥주"], region: "SAPPORO", attractionId: "susukino" },
];

function allAttractions() {
  return Object.values(MOCK_ATTRACTIONS).flat();
}

function findById(id: string) {
  return allAttractions().find((a) => a.id === id);
}

export function getRegionCoverImage(region: JapanRegionId, width = 1200): string {
  const first = MOCK_ATTRACTIONS[region]?.[0];
  if (!first?.imageUrl) {
    return `https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=${width}&q=85`;
  }
  return first.imageUrl.replace(/w=\d+/, `w=${width}`);
}

export function resolvePlaceImage(placeName: string, region: JapanRegionId): string {
  const compact = placeName.replace(/\s/g, "");

  for (const alias of PLACE_ALIASES) {
    if (alias.keys.some((k) => compact.includes(k.replace(/\s/g, "")))) {
      const hit = findById(alias.attractionId);
      if (hit?.imageUrl) return hit.imageUrl;
    }
  }

  const regional = MOCK_ATTRACTIONS[region] ?? [];
  for (const a of regional) {
    const name = a.name.replace(/\s/g, "");
    if (compact.includes(name) || name.includes(compact.slice(0, Math.min(4, compact.length)))) {
      return a.imageUrl ?? getRegionCoverImage(region);
    }
  }

  for (const a of allAttractions()) {
    const name = a.name.replace(/\s/g, "");
    if (compact.includes(name) || name.includes(compact.slice(0, 3))) {
      return a.imageUrl ?? getRegionCoverImage(region);
    }
  }

  return getRegionCoverImage(region);
}

type TripItemLike = { placeName: string };
type TripDayLike = { items: TripItemLike[] };
type TripLike = { region: JapanRegionId; days?: TripDayLike[] };

export function getTripCoverImage(trip: TripLike): string {
  for (const day of trip.days ?? []) {
    for (const item of day.items) {
      const url = resolvePlaceImage(item.placeName, trip.region);
      if (url) return url;
    }
  }
  return getRegionCoverImage(trip.region);
}

export function getTripGalleryImages(trip: TripLike, limit = 6): string[] {
  const urls: string[] = [];
  const seen = new Set<string>();

  for (const day of trip.days ?? []) {
    for (const item of day.items) {
      const url = resolvePlaceImage(item.placeName, trip.region);
      if (!seen.has(url)) {
        seen.add(url);
        urls.push(url);
      }
      if (urls.length >= limit) return urls;
    }
  }

  if (urls.length === 0) urls.push(getRegionCoverImage(trip.region));
  return urls;
}

```

---

### `src/middleware.ts`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/middleware.ts` |
| **레이어** | 미들웨어 |
| **역할** | 요청 가로채기 · 인증 · 뷰모드 처리 |

```typescript
import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { authConfig } from "@/auth.config";
import { resolveViewMode } from "@/shared/lib/resolve-view-mode";
import { isMobilePath, VIEW_MODE_COOKIE, VIEW_MODE_HEADER } from "@/shared/lib/view-mode";

const { auth } = NextAuth(authConfig);

const protectedPrefixes = [
  "/checklist",
  "/chat",
  "/planner",
  "/trips",
  "/budget",
  "/profile",
  "/settings",
  "/restaurants",
  "/attractions",
  "/stays",
];

const guestOnlyPaths = new Set(["/login", "/register", "/forgot-password", "/reset-password"]);

function normalizePath(pathname: string) {
  return pathname.startsWith("/m") ? pathname.replace(/^\/m/, "") || "/" : pathname;
}

function safeCallbackUrl(raw: string | null) {
  if (raw?.startsWith("/") && !raw.startsWith("//")) return raw;
  return "/";
}

function applyViewMode(response: NextResponse, mode: "desktop" | "mobile") {
  response.headers.set(VIEW_MODE_HEADER, mode);
  response.cookies.set(VIEW_MODE_COOKIE, mode, {
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    sameSite: "lax",
  });
  return response;
}

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const viewMode = resolveViewMode(req);
  const path = normalizePath(pathname);

  if (req.auth && guestOnlyPaths.has(path)) {
    const destination = safeCallbackUrl(req.nextUrl.searchParams.get("callbackUrl"));
    const redirect = NextResponse.redirect(new URL(destination, req.nextUrl.origin));
    return applyViewMode(redirect, viewMode);
  }

  let response: NextResponse;

  if (isMobilePath(pathname)) {
    const url = req.nextUrl.clone();
    url.pathname = pathname.replace(/^\/m/, "") || "/";
    response = NextResponse.rewrite(url);
  } else {
    response = NextResponse.next();
  }

  applyViewMode(response, viewMode);

  const isProtected = protectedPrefixes.some((p) => path.startsWith(p));

  if (isProtected && !req.auth) {
    const loginUrl = new URL(viewMode === "mobile" ? "/m/login" : "/login", req.nextUrl.origin);
    const callbackPath = isMobilePath(pathname)
      ? pathname.replace(/^\/m/, "") || "/"
      : pathname;
    loginUrl.searchParams.set("callbackUrl", callbackPath);
    const redirect = NextResponse.redirect(loginUrl);
    return applyViewMode(redirect, viewMode);
  }

  return response;
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|share).*)"],
};

```

---

### `src/server/ai/adapter.ts`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/server/ai/adapter.ts` |
| **레이어** | Shared Server |
| **역할** | 외부 API 어댑터 · 공통 서버 유틸 |

```typescript
import type {
  AccommodationResult,
  AccommodationSearchRequest,
  ChatRequest,
  ChatResponse,
  ItineraryGenerateRequest,
  ItineraryGenerateResponse,
  RestaurantResult,
  RestaurantSearchRequest,
} from "./types";
import type { JapanRegionId } from "@/shared/lib/constants";
import { searchRakutenStays } from "@/server/rakuten/travel-client";

const AI_BASE = process.env.AI_SERVICE_BASE_URL ?? "";
const AI_KEY = process.env.AI_SERVICE_API_KEY ?? "";

async function callAi<T>(path: string, body: unknown): Promise<T | null> {
  if (!AI_BASE) return null;

  try {
    const res = await fetch(`${AI_BASE}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(AI_KEY ? { Authorization: `Bearer ${AI_KEY}` } : {}),
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

function mockItinerary(req: ItineraryGenerateRequest): ItineraryGenerateResponse {
  const regionLabel: Record<JapanRegionId, string> = {
    OSAKA_KYOTO: "오사카·교토",
    FUKUOKA: "후쿠오카",
    TOKYO: "도쿄",
    SAPPORO: "삿포로",
  };

  return {
    title: `${regionLabel[req.region]} ${req.travelers}인 여행`,
    days: [
      {
        dayIndex: 1,
        date: req.startDate,
        items: [
          { placeName: "공항 → 시내 이동", startTime: "10:00", transport: "전철" },
          { placeName: "지역 대표 관광지", startTime: "14:00", endTime: "18:00" },
        ],
      },
    ],
    attractions: [],
  };
}

function mockRestaurants(region: JapanRegionId): RestaurantResult[] {
  return [
    {
      id: "r1",
      name: region === "TOKYO" ? "츠키지 스시" : "현지 인기 라멘",
      cuisine: "일식",
      menuItems: region === "TOKYO" ? ["니기리", "사시미", "오마카세"] : ["돈코츠 라멘", "쇼유 라멘", "차슈멘"],
      menuSummary: region === "TOKYO" ? "신선한 회와 니기리를 즐길 수 있는 스시 전문점입니다." : "진한 돈코츠 국물 라멘이 인기인 현지 맛집입니다.",
      rating: 4.6,
      distanceKm: 0.8,
      avgPriceKrw: 25000,
      hours: "11:00-21:00",
      reservationRequired: true,
    },
    {
      id: "r2",
      name: "이자카야 거리 맛집",
      cuisine: "이자카야",
      menuItems: ["야키토리", "사케", "사시미", "맥주"],
      menuSummary: "저녁에 가볍게 안주와 사케를 즐기기 좋은 이자카야입니다.",
      rating: 4.3,
      distanceKm: 1.2,
      avgPriceKrw: 18000,
      hours: "17:00-24:00",
      reservationRequired: false,
    },
  ];
}

function mockChat(req: ChatRequest): ChatResponse {
  const history = (req.tripContext?.history as { role: string }[] | undefined) ?? [];
  const turn = history.filter((h) => h.role === "user").length;
  const prefix = turn > 1 ? "이전 대화를 참고해 " : "";
  return {
    sessionId: req.sessionId ?? "mock-session",
    reply: `${prefix}「${req.message}」에 대한 답변입니다. (임시 AI) 실제 모델 연동 후 맞춤 추천이 제공됩니다.`,
    suggestedQuestions: [
      "이 지역 2박3일 코스 추천해줘",
      "예산 100만원으로 숙소와 식비 나눠줘",
      "비 오는 날 실내 관광지 알려줘",
    ],
  };
}

export const aiAdapter = {
  async generateItinerary(req: ItineraryGenerateRequest) {
    return (
      (await callAi<ItineraryGenerateResponse>("/itinerary/generate", req)) ??
      mockItinerary(req)
    );
  },

  async searchAccommodations(req: AccommodationSearchRequest): Promise<AccommodationResult[]> {
    const fromAi = await callAi<AccommodationResult[]>("/accommodations/search", req);
    if (fromAi && fromAi.length > 0) return fromAi;

    const fromRakuten = await searchRakutenStays(req);
    if (fromRakuten && fromRakuten.length > 0) return fromRakuten;

    return [];
  },

  async chat(req: ChatRequest) {
    return (await callAi<ChatResponse>("/chat", req)) ?? mockChat(req);
  },

  async searchRestaurants(req: RestaurantSearchRequest) {
    return (
      (await callAi<RestaurantResult[]>("/restaurants/search", req)) ??
      mockRestaurants(req.region)
    );
  },
};

```

---

### `src/server/ai/types.ts`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/server/ai/types.ts` |
| **레이어** | Shared Server |
| **역할** | 외부 API 어댑터 · 공통 서버 유틸 |

```typescript
import type { JapanRegionId } from "@/shared/lib/constants";

export type ItineraryGenerateRequest = {
  region: JapanRegionId;
  origin: string;
  startDate: string;
  endDate: string;
  budgetKrw: number;
  travelers: number;
  preferences?: string[];
};

export type ItineraryDay = {
  dayIndex: number;
  date: string;
  items: {
    placeId?: string;
    placeName: string;
    startTime?: string;
    endTime?: string;
    transport?: string;
    lat?: number;
    lng?: number;
  }[];
};

export type ItineraryGenerateResponse = {
  title: string;
  days: ItineraryDay[];
  attractions: AttractionResult[];
};

export type AttractionReview = {
  id: string;
  author: string;
  rating: number;
  /** ISO 날짜 YYYY-MM-DD */
  createdAt: string;
  text: string;
};

export type AttractionResult = {
  id: string;
  name: string;
  nameKo?: string;
  lat: number;
  lng: number;
  /** 혼잡도: LOW(여유) / MEDIUM(보통) / HIGH(혼잡) */
  crowdLevel?: "LOW" | "MEDIUM" | "HIGH";
  /** 현재 추정 대기시간(분) */
  estimatedWaitMinutes?: number;
  /** 혼잡도 산정 근거 요약 */
  crowdReason?: string;
  /** 추천 방문 시간대 예: ["08:00-10:00", "17:00-19:00"] */
  recommendedTimeSlots?: string[];
  /** 여행자 평점 (5점 만점) */
  rating?: number;
  /** 리뷰·평가 건수 */
  reviewCount?: number;
  /** 별점별 비율(%) — 시각화용 */
  ratingDistribution?: { stars: 1 | 2 | 3 | 4 | 5; percent: number }[];
  /** 참고용 리뷰 요약 (공개 여행 정보·카테고리 기반) */
  reviews?: AttractionReview[];
  category?: string;
  fee?: string;
  hours?: string;
  bestVisitTags?: string[];
  imageUrl?: string;
  imageUrls?: string[];
  description?: string;
  highlights?: string[];
  address?: string;
  tips?: string;
  wikiUrl?: string;
};

export type AccommodationType = "HOTEL" | "RYOKAN" | "GUESTHOUSE";
export type AccommodationAmenity =
  | "WIFI"
  | "BREAKFAST"
  | "ONSEN"
  | "KITCHEN"
  | "PARKING"
  | "AIRPORT_BUS"
  | "FAMILY"
  | "NON_SMOKING";

export type AccommodationSearchRequest = {
  region: JapanRegionId;
  checkIn: string;
  checkOut: string;
  guests: number;
  budgetKrw: number;
  types?: AccommodationType[];
  amenities?: AccommodationAmenity[];
  area?: string;
  sort?: "recommended" | "price-asc" | "price-desc" | "rating-desc";
};

export type AccommodationResult = {
  id: string;
  name: string;
  type: AccommodationType;
  priceKrw: number;
  rating: number;
  reviewCount?: number;
  bookingUrl: string;
  imageUrl?: string;
  imageUrls?: string[];
  area?: string;
  nearestStation?: string;
  walkMinutes?: number;
  amenities?: AccommodationAmenity[];
  highlight?: string;
  score?: number;
  recommendReason?: string;
};

export type ChatRequest = {
  sessionId?: string;
  message: string;
  region?: JapanRegionId;
  tripContext?: Record<string, unknown>;
};

export type ChatResponse = {
  sessionId: string;
  reply: string;
  suggestedQuestions?: string[];
  itineraryPatch?: Partial<ItineraryGenerateResponse>;
};

export type RestaurantSearchRequest = {
  region: JapanRegionId;
  maxBudgetKrw?: number;
  maxDistanceKm?: number;
  minRating?: number;
};

export type RestaurantResult = {
  id: string;
  name: string;
  cuisine: string;
  /** 대표·추천 메뉴 (업종·Google 요약 기반) */
  menuItems?: string[];
  /** Google editorialSummary 등 메뉴 맥락 요약 */
  menuSummary?: string;
  rating: number;
  reviewCount?: number;
  distanceKm: number;
  avgPriceKrw: number;
  hours: string;
  reservationRequired: boolean;
  address?: string;
  imageUrl?: string;
};

```

---

### `src/server/attractions/travel-client.ts`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/server/attractions/travel-client.ts` |
| **레이어** | Shared Server |
| **역할** | 외부 API 어댑터 · 공통 서버 유틸 |

```typescript
/**
 * 일본 관광지 데이터 외부 API 어댑터.
 * - Overpass API (OpenStreetMap): 좌표 주변 관광 POI 메타데이터
 * - Wikipedia REST API: 한국어 우선 설명·대표 사진 (배치 호출로 최적화)
 *
 * 둘 다 무료·키 불필요. User-Agent 헤더만 식별용으로 보냅니다.
 *
 * 필터 정책(잡음 제거):
 *   1) `tourism=museum|theme_park|zoo|aquarium|gallery` 처럼 카테고리 자체가
 *      명확한 시설은 wiki 태그 없이도 통과.
 *   2) `tourism=attraction|viewpoint` 는 오용·잡음이 심해 OSM `wikipedia`
 *      또는 `wikidata` 태그가 있을 때만 통과.
 *   3) `historic=castle|monument|memorial|ruins|archaeological_site|tomb`
 *      처럼 일본 여행에서 핵심인 사적은 항상 포함.
 *   4) 신사·사찰(`amenity=place_of_worship`), 공원·정원(`leisure=park|garden`)
 *      은 위키 문서/위키데이터가 연결된 유명 장소만 포함.
 *   5) 거리·기념탑·공공 예술품(`tourism=artwork`)은 잡음이 압도적이라 완전 제외.
 *   6) `way` 도 포함하되 `out center` 로 대표 좌표를 받습니다.
 *
 * 성능 정책:
 *   - Wikipedia 호출은 `titles=A|B|...` 배치(청크 20)로 묶어 N+1 호출을 회피합니다.
 *   - 동일 청크 호출이라도 동시 호출 수는 자연스럽게 3~6회 수준으로 제한됩니다.
 */

const OVERPASS_ENDPOINT = "https://overpass-api.de/api/interpreter";

const USER_AGENT =
  "MY-TRIP-Planner/0.1 (educational; +https://github.com/dljaemoon0615-lang/SW-)";

const TOURISM_ALWAYS = "museum|theme_park|zoo|aquarium|gallery";
const TOURISM_NEEDS_WIKI = "attraction|viewpoint";
const HISTORIC_ALWAYS =
  "castle|monument|memorial|ruins|archaeological_site|tomb|fort|city_gate";
const LEISURE_NEEDS_WIKI = "park|garden";

export type OverpassPlace = {
  id: string;
  name: string;
  nameKo?: string;
  nameJa?: string;
  lat: number;
  lng: number;
  category: string;
  /** OSM wikipedia 태그값. 형식: "lang:title" (예: "ja:東京タワー") */
  wikipediaTag?: string;
  /** OSM wikidata 태그값. 형식: "Q12345" */
  wikidataId?: string;
};

type OverpassElement = {
  type: "node" | "way" | "relation";
  id: number;
  lat?: number;
  lon?: number;
  center?: { lat: number; lon: number };
  tags?: Record<string, string>;
};

type OverpassResponse = { elements?: OverpassElement[] };

export type WikiDetail = {
  description: string;
  imageUrl?: string;
  wikiUrl?: string;
  /** 결과로 채택된 위키 문서의 제목 */
  title: string;
  /** 결과로 채택된 위키 언어 */
  lang: "ko" | "ja" | "en";
};

function pickName(tags: Record<string, string> | undefined): {
  name: string;
  nameKo?: string;
  nameJa?: string;
} | null {
  if (!tags) return null;
  const nameKo = tags["name:ko"];
  const nameJa = tags["name:ja"];
  const nameEn = tags["name:en"];
  const display = nameKo || nameJa || nameEn || tags.name;
  if (!display) return null;
  return { name: display, nameKo, nameJa };
}

/**
 * OSM 태그 묶음에서 카드 노출용 카테고리 코드를 결정합니다.
 * 예: tourism=museum → "museum", historic=castle → "historic_castle",
 *     amenity=place_of_worship + religion=shinto → "shrine"
 */
function deriveCategory(tags: Record<string, string>): string {
  if (tags.tourism) return tags.tourism;
  if (tags.historic) return `historic_${tags.historic}`;
  if (tags.amenity === "place_of_worship") {
    const r = tags.religion;
    if (r === "shinto") return "shrine";
    if (r === "buddhist") return "temple";
    return "place_of_worship";
  }
  if (tags.leisure) return tags.leisure;
  return "attraction";
}

/**
 * 좌표 주변(radiusMeters 반경)의 관광지 POI를 가져옵니다.
 * Next 캐시: 1시간. (Overpass는 호출 빈도 제한이 있어 캐시 권장)
 */
export async function fetchAttractions(
  lat: number,
  lon: number,
  radiusMeters: number = 5000,
  limit: number = 80,
): Promise<OverpassPlace[]> {
  const r = radiusMeters;
  const around = `around:${r},${lat},${lon}`;

  const query = `[out:json][timeout:90];
(
  node["tourism"~"^(${TOURISM_ALWAYS})$"]["name"](${around});
  way["tourism"~"^(${TOURISM_ALWAYS})$"]["name"](${around});

  node["tourism"~"^(${TOURISM_NEEDS_WIKI})$"]["name"]["wikipedia"](${around});
  node["tourism"~"^(${TOURISM_NEEDS_WIKI})$"]["name"]["wikidata"](${around});
  way["tourism"~"^(${TOURISM_NEEDS_WIKI})$"]["name"]["wikipedia"](${around});
  way["tourism"~"^(${TOURISM_NEEDS_WIKI})$"]["name"]["wikidata"](${around});

  node["historic"~"^(${HISTORIC_ALWAYS})$"]["name"](${around});
  way["historic"~"^(${HISTORIC_ALWAYS})$"]["name"](${around});

  node["amenity"="place_of_worship"]["name"]["wikipedia"](${around});
  node["amenity"="place_of_worship"]["name"]["wikidata"](${around});
  way["amenity"="place_of_worship"]["name"]["wikipedia"](${around});
  way["amenity"="place_of_worship"]["name"]["wikidata"](${around});

  node["leisure"~"^(${LEISURE_NEEDS_WIKI})$"]["name"]["wikipedia"](${around});
  way["leisure"~"^(${LEISURE_NEEDS_WIKI})$"]["name"]["wikipedia"](${around});
);
out center ${limit};`;

  try {
    const res = await fetch(OVERPASS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": USER_AGENT,
      },
      body: `data=${encodeURIComponent(query)}`,
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];

    const json = (await res.json()) as OverpassResponse;
    const elements = json.elements ?? [];

    const seenId = new Set<string>();
    const seenName = new Set<string>();
    const out: OverpassPlace[] = [];
    for (const el of elements) {
      const named = pickName(el.tags);
      if (!named) continue;
      const elLat = el.lat ?? el.center?.lat;
      const elLng = el.lon ?? el.center?.lon;
      if (elLat === undefined || elLng === undefined) continue;

      const id = `osm-${el.type}-${el.id}`;
      if (seenId.has(id)) continue;
      if (seenName.has(named.name)) continue;
      seenId.add(id);
      seenName.add(named.name);

      const tags = el.tags ?? {};
      out.push({
        id,
        name: named.name,
        nameKo: named.nameKo,
        nameJa: named.nameJa,
        lat: elLat,
        lng: elLng,
        category: deriveCategory(tags),
        wikipediaTag: tags.wikipedia,
        wikidataId: tags.wikidata,
      });
    }
    return out;
  } catch {
    return [];
  }
}

/* --------------------------------------------------------------------------
 * Wikipedia 배치 조회
 * ----------------------------------------------------------------------- */

type WikiBundle = {
  title: string;
  extract?: string;
  thumbnail?: string;
  pageUrl?: string;
  langTitleKo?: string;
  langTitleJa?: string;
  langTitleEn?: string;
};

type WikiQueryPage = {
  pageid?: number;
  title?: string;
  missing?: boolean;
  extract?: string;
  fullurl?: string;
  thumbnail?: { source?: string };
  original?: { source?: string };
  langlinks?: Array<{ lang: string; title: string }>;
};

type WikiQueryResponse = {
  query?: {
    pages?: WikiQueryPage[];
    normalized?: Array<{ from: string; to: string }>;
    redirects?: Array<{ from: string; to: string }>;
  };
};

type WikiLang = "ko" | "ja" | "en";

/**
 * Wikipedia `action=query` 배치. 한 호출에 최대 ~20개 제목을 묶어
 * 인트로 발췌·대표 이미지·langlinks 를 동시 수신합니다.
 *
 * 응답에는 `normalized`(공백/대소문자 정규화)와 `redirects`(리다이렉트 추적)가
 * 따라오므로, 요청 시 사용한 원본 제목을 키로 결과를 매핑합니다.
 */
async function callWikiQueryBatch(
  lang: WikiLang,
  titles: string[],
): Promise<Map<string, WikiBundle>> {
  const result = new Map<string, WikiBundle>();
  if (titles.length === 0) return result;

  // 위키 user limit: exlimit=20. 그 이상은 extract 가 잘림.
  const CHUNK = 20;
  for (let i = 0; i < titles.length; i += CHUNK) {
    const chunk = titles.slice(i, i + CHUNK);
    const url = new URL(`https://${lang}.wikipedia.org/w/api.php`);
    url.search = new URLSearchParams({
      action: "query",
      format: "json",
      formatversion: "2",
      prop: "pageimages|extracts|langlinks|info",
      exintro: "1",
      explaintext: "1",
      exchars: "500",
      exlimit: "20",
      pithumbsize: "640",
      piprop: "thumbnail|original",
      pilimit: "50",
      lllang: lang === "ko" ? "ja" : "ko",
      lllimit: "50",
      inprop: "url",
      redirects: "1",
      titles: chunk.join("|"),
      origin: "*",
    }).toString();

    try {
      const res = await fetch(url.toString(), {
        headers: { "User-Agent": USER_AGENT, Accept: "application/json" },
        next: { revalidate: 86400 },
      });
      if (!res.ok) continue;
      const data = (await res.json()) as WikiQueryResponse;
      const pages = data.query?.pages ?? [];
      const normalized = data.query?.normalized ?? [];
      const redirects = data.query?.redirects ?? [];

      // 요청 제목 → 최종 페이지 제목 추적 (normalized → redirects 체인)
      const requestedToFinal = new Map<string, string>();
      for (const t of chunk) requestedToFinal.set(t, t);
      for (const n of normalized) {
        for (const [requested, current] of requestedToFinal) {
          if (current === n.from) requestedToFinal.set(requested, n.to);
        }
      }
      for (const r of redirects) {
        for (const [requested, current] of requestedToFinal) {
          if (current === r.from) requestedToFinal.set(requested, r.to);
        }
      }

      const pageByTitle = new Map<string, WikiQueryPage>();
      for (const p of pages) {
        if (p.title) pageByTitle.set(p.title, p);
      }

      for (const requested of chunk) {
        const finalTitle = requestedToFinal.get(requested) ?? requested;
        const page = pageByTitle.get(finalTitle);
        if (!page || page.missing || !page.title) continue;
        const links = page.langlinks ?? [];
        result.set(requested, {
          title: page.title,
          extract: page.extract,
          thumbnail: page.original?.source ?? page.thumbnail?.source,
          pageUrl: page.fullurl,
          langTitleKo: links.find((l) => l.lang === "ko")?.title,
          langTitleJa: links.find((l) => l.lang === "ja")?.title,
          langTitleEn: links.find((l) => l.lang === "en")?.title,
        });
      }
    } catch {
      /* chunk 실패는 건너뜀 */
    }
  }
  return result;
}

/** OSM 데이터로부터 1차 위키 조회 키를 결정. */
function derivePrimaryWikiKey(p: OverpassPlace): { lang: WikiLang; title: string } | null {
  if (p.wikipediaTag) {
    const m = /^(ko|ja|en):(.+)$/.exec(p.wikipediaTag.trim());
    if (m) return { lang: m[1] as WikiLang, title: m[2].trim() };
  }
  if (p.nameJa) return { lang: "ja", title: p.nameJa };
  if (p.nameKo) return { lang: "ko", title: p.nameKo };
  // 일본 내 POI이므로 이름이 한자/가나일 가능성이 큼 → ja 위키부터 시도
  if (p.name) return { lang: "ja", title: p.name };
  return null;
}

/**
 * 여러 장소의 위키 상세를 배치로 가져옵니다.
 *
 * 흐름:
 *   1) 각 장소의 1차 위키 키(언어·제목) 결정
 *   2) 언어별로 묶어 1차 배치 조회 (병렬)
 *   3) ja/en 결과에서 한국어 langlinks 수집
 *   4) 수집된 한국어 제목을 한 번에 추가 배치 조회
 *   5) 한국어 위키가 있으면 한국어를 우선, 없으면 1차 결과 사용
 *
 * 반환: place.id → WikiDetail 매핑. 결과가 없는 장소는 키 부재.
 */
export async function fetchWikiDetailsBatch(
  places: OverpassPlace[],
): Promise<Map<string, WikiDetail>> {
  const result = new Map<string, WikiDetail>();

  const entries: Array<{ place: OverpassPlace; lang: WikiLang; title: string }> = [];
  for (const p of places) {
    const key = derivePrimaryWikiKey(p);
    if (!key) continue;
    entries.push({ place: p, lang: key.lang, title: key.title });
  }
  if (entries.length === 0) return result;

  const titlesByLang = new Map<WikiLang, Set<string>>();
  for (const e of entries) {
    const set = titlesByLang.get(e.lang) ?? new Set<string>();
    set.add(e.title);
    titlesByLang.set(e.lang, set);
  }

  const primaryResults = await Promise.all(
    Array.from(titlesByLang.entries()).map(async ([lang, titles]) => ({
      lang,
      map: await callWikiQueryBatch(lang, Array.from(titles)),
    })),
  );
  const primaryByLang = new Map<WikiLang, Map<string, WikiBundle>>();
  for (const { lang, map } of primaryResults) primaryByLang.set(lang, map);

  // ja/en 결과에서 한국어 langlinks 수집 → 한국어 위키 배치 추가 조회
  const koTitlesToFetch = new Set<string>();
  for (const lang of ["ja", "en"] as const) {
    const map = primaryByLang.get(lang);
    if (!map) continue;
    for (const bundle of map.values()) {
      if (bundle.langTitleKo) koTitlesToFetch.add(bundle.langTitleKo);
    }
  }
  const existingKo = primaryByLang.get("ko") ?? new Map<string, WikiBundle>();
  const newKoTitles = Array.from(koTitlesToFetch).filter((t) => !existingKo.has(t));
  const koLangMap =
    newKoTitles.length > 0
      ? await callWikiQueryBatch("ko", newKoTitles)
      : new Map<string, WikiBundle>();

  for (const { place, lang, title } of entries) {
    const primary = primaryByLang.get(lang)?.get(title);
    if (!primary || !primary.extract) continue;

    if (lang !== "ko" && primary.langTitleKo) {
      const koBundle = koLangMap.get(primary.langTitleKo) ?? existingKo.get(primary.langTitleKo);
      if (koBundle && koBundle.extract) {
        result.set(place.id, {
          title: koBundle.title,
          description: koBundle.extract,
          imageUrl: koBundle.thumbnail ?? primary.thumbnail,
          wikiUrl: koBundle.pageUrl,
          lang: "ko",
        });
        continue;
      }
    }

    result.set(place.id, {
      title: primary.title,
      description: primary.extract,
      imageUrl: primary.thumbnail,
      wikiUrl: primary.pageUrl,
      lang,
    });
  }

  return result;
}

```

---

### `src/server/db/prisma.ts`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/server/db/prisma.ts` |
| **레이어** | Shared Server |
| **역할** | 외부 API 어댑터 · 공통 서버 유틸 |

```typescript
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

```

---

### `src/server/email/send-email.ts`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/server/email/send-email.ts` |
| **레이어** | Shared Server |
| **역할** | 외부 API 어댑터 · 공통 서버 유틸 |

```typescript
import { APP_NAME } from "@/shared/lib/constants";

type SendEmailInput = {
  to: string;
  subject: string;
  html: string;
  text?: string;
};

function emailFrom(): string {
  return process.env.EMAIL_FROM ?? `${APP_NAME} <onboarding@resend.dev>`;
}
async function sendViaResend(input: SendEmailInput): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY not set");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: emailFrom(),
      to: [input.to],
      subject: input.subject,
      html: input.html,
      text: input.text,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    let message = body;
    try {
      const parsed = JSON.parse(body) as { message?: string };
      if (parsed.message) message = parsed.message;
    } catch {
      /* keep raw body */
    }
    const err = new Error(`Resend error ${res.status}: ${message}`) as Error & {
      resendStatus?: number;
      resendMessage?: string;
    };
    err.resendStatus = res.status;
    err.resendMessage = message;
    throw err;
  }
}

export class ResendTestModeError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ResendTestModeError";
  }
}

function isResendTestModeError(err: unknown): boolean {
  if (!(err instanceof Error)) return false;
  const msg = err.message.toLowerCase();
  return msg.includes("only send testing emails") || msg.includes("verify a domain");
}

/** Resend API 또는 개발 환경 콘솔로 메일 발송 */
export async function sendEmail(input: SendEmailInput): Promise<{ delivered: boolean }> {
  if (process.env.RESEND_API_KEY) {
    try {
      await sendViaResend(input);
      return { delivered: true };
    } catch (err) {
      if (process.env.NODE_ENV === "development" && isResendTestModeError(err)) {
        console.info("[email:dev-fallback]", {
          to: input.to,
          subject: input.subject,
          text: input.text ?? input.html.replace(/<[^>]+>/g, " "),
          reason: "Resend 테스트 모드 — 등록 이메일 외 수신 불가. 위 링크를 사용하세요.",
        });
        return { delivered: false };
      }
      if (isResendTestModeError(err)) {
        throw new ResendTestModeError(
          "메일 서버가 테스트 모드입니다. Resend에 가입한 이메일로만 발송할 수 있습니다. 도메인 인증 후 다른 주소로도 발송 가능합니다.",
        );
      }
      throw err;
    }
  }

  if (process.env.NODE_ENV === "development") {
    console.info("[email:dev]", {
      to: input.to,
      subject: input.subject,
      text: input.text ?? input.html.replace(/<[^>]+>/g, " "),
    });
    return { delivered: false };
  }

  throw new Error(
    "메일 발송이 설정되지 않았습니다. RESEND_API_KEY와 EMAIL_FROM을 .env에 추가하세요.",
  );
}

export function isEmailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY) || process.env.NODE_ENV === "development";
}

```

---

### `src/server/google-places/attractions.ts`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/server/google-places/attractions.ts` |
| **레이어** | Shared Server |
| **역할** | 외부 API 어댑터 · 공통 서버 유틸 |

```typescript
import { ratingToDistribution } from "@/features/attractions/data/attraction-ratings";
import type { AttractionResult } from "@/server/ai/types";
import type { JapanRegionId } from "@/shared/lib/constants";
import {
  getPlaceDetails,
  hasGooglePlacesKey,
  mapInBatches,
  searchNearbyPlaces,
  type GooglePlaceDetails,
  type GooglePlaceSummary,
} from "@/server/google-places/client";

const REGION_CENTERS: Record<
  JapanRegionId,
  { lat: number; lng: number; radius: number }[]
> = {
  TOKYO: [{ lat: 35.6812, lng: 139.7671, radius: 8000 }],
  OSAKA_KYOTO: [
    { lat: 34.6937, lng: 135.5023, radius: 8000 },
    { lat: 35.0116, lng: 135.7681, radius: 8000 },
  ],
  FUKUOKA: [{ lat: 33.5902, lng: 130.4017, radius: 9000 }],
  SAPPORO: [{ lat: 43.0686, lng: 141.3508, radius: 10000 }],
};

const ATTRACTION_TYPES = [
  "tourist_attraction",
  "museum",
  "art_gallery",
  "park",
  "amusement_park",
  "aquarium",
  "zoo",
];

const TOURIST_TYPES = new Set([
  ...ATTRACTION_TYPES,
  "botanical_garden",
  "historical_landmark",
  "monument",
  "church",
  "hindu_temple",
  "buddhist_temple",
  "place_of_worship",
  "cultural_center",
  "performing_arts_theater",
  "observation_deck",
  "art_museum",
  "planetarium",
  "national_park",
  "hiking_area",
  "visitor_center",
  "wildlife_park",
  "water_park",
  "stadium",
]);

const EXCLUDE_PRIMARY = new Set([
  "restaurant",
  "cafe",
  "coffee_shop",
  "bar",
  "bakery",
  "meal_takeaway",
  "fast_food_restaurant",
  "lodging",
  "hotel",
  "store",
  "shopping_mall",
  "supermarket",
  "convenience_store",
  "department_store",
  "gas_station",
  "parking",
  "bus_station",
  "train_station",
  "subway_station",
]);

const MAX_RESULTS = 40;
const MAX_DETAILS = 25;
const HANGUL_RE = /[가-힣]/;

function categoryFromTypes(types?: string[], primaryType?: string): string {
  const candidates = [primaryType, ...(types ?? [])].filter(Boolean) as string[];
  const map: Record<string, string> = {
    museum: "museum",
    art_gallery: "gallery",
    amusement_park: "theme_park",
    aquarium: "aquarium",
    zoo: "zoo",
    park: "park",
    botanical_garden: "garden",
    tourist_attraction: "attraction",
    historical_landmark: "historic_monument",
    monument: "historic_monument",
    church: "place_of_worship",
    hindu_temple: "temple",
    buddhist_temple: "temple",
    place_of_worship: "shrine",
    cultural_center: "museum",
    performing_arts_theater: "attraction",
    observation_deck: "viewpoint",
    art_museum: "museum",
    planetarium: "museum",
    national_park: "park",
    hiking_area: "park",
    visitor_center: "attraction",
    wildlife_park: "zoo",
    water_park: "theme_park",
    stadium: "attraction",
  };
  for (const t of candidates) {
    if (map[t]) return map[t];
  }
  return "attraction";
}

function isAttractionPlace(place: GooglePlaceSummary): boolean {
  const types = new Set(
    [place.primaryType, ...(place.types ?? [])].filter(Boolean) as string[],
  );
  if (place.primaryType && EXCLUDE_PRIMARY.has(place.primaryType)) {
    if (![...types].some((t) => TOURIST_TYPES.has(t))) return false;
  }
  return [...types].some((t) => TOURIST_TYPES.has(t));
}

function mapsUrl(placeId: string): string {
  return `https://www.google.com/maps/place/?q=place_id:${placeId}`;
}

function toAttraction(place: GooglePlaceSummary): AttractionResult {
  const category = categoryFromTypes(place.types, place.primaryType);
  const rating = place.rating;
  const name = place.name;

  return {
    id: place.id,
    name,
    nameKo: HANGUL_RE.test(name) ? name : undefined,
    lat: place.lat,
    lng: place.lng,
    category,
    description: place.editorialSummary,
    imageUrl: place.imageUrl,
    imageUrls: place.imageUrl ? [place.imageUrl] : undefined,
    address: place.address,
    hours: place.hours,
    rating,
    reviewCount: place.reviewCount,
    ratingDistribution: rating ? ratingToDistribution(rating) : undefined,
    wikiUrl: mapsUrl(place.id),
  };
}

function applyDetails(
  item: AttractionResult,
  details: GooglePlaceDetails,
): AttractionResult {
  const reviews = details.reviews.slice(0, 5).map((r, i) => ({
    id: `${item.id}-g-review-${i}`,
    author: r.author,
    rating: r.rating,
    createdAt: r.createdAt,
    text: r.text,
  }));

  const rating = details.rating ?? item.rating;

  return {
    ...item,
    rating,
    reviewCount: details.reviewCount ?? item.reviewCount,
    ratingDistribution: rating ? ratingToDistribution(rating) : item.ratingDistribution,
    description: item.description ?? details.editorialSummary,
    address: item.address ?? details.address,
    hours: item.hours ?? details.hours,
    imageUrl: item.imageUrl ?? details.imageUrl,
    imageUrls: item.imageUrls?.length
      ? item.imageUrls
      : details.imageUrl
        ? [details.imageUrl]
        : item.imageUrls,
    reviews: reviews.length ? reviews : item.reviews,
  };
}

/** Google Places nearby 검색으로 지역 관광지 목록을 가져옵니다 */
export async function searchGoogleAttractions(
  region: JapanRegionId,
): Promise<AttractionResult[] | null> {
  if (!hasGooglePlacesKey()) return null;

  const centers = REGION_CENTERS[region];
  if (!centers?.length) return null;

  const lists = await Promise.all(
    centers.map((center) =>
      searchNearbyPlaces({
        center: { latitude: center.lat, longitude: center.lng },
        radiusMeters: center.radius,
        includedTypes: ATTRACTION_TYPES,
        maxResultCount: 20,
        languageCode: "ko",
      }),
    ),
  );

  const merged = new Map<string, AttractionResult>();
  for (const list of lists) {
    for (const place of list) {
      if (merged.has(place.id)) continue;
      if (!isAttractionPlace(place)) continue;
      merged.set(place.id, toAttraction(place));
    }
  }

  if (merged.size === 0) return null;

  const sorted = Array.from(merged.values()).sort(
    (a, b) => (b.rating ?? 0) - (a.rating ?? 0) || (b.reviewCount ?? 0) - (a.reviewCount ?? 0),
  );
  const results = sorted.slice(0, MAX_RESULTS);

  const detailed = await mapInBatches(results.slice(0, MAX_DETAILS), 4, async (item) => {
    const details = await getPlaceDetails(item.id);
    return details ? applyDetails(item, details) : item;
  });

  const byId = new Map(detailed.map((item) => [item.id, item]));
  const final = results.map((item) => byId.get(item.id) ?? item);

  return final.length > 0 ? final : null;
}

```

---

### `src/server/google-places/client.ts`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/server/google-places/client.ts` |
| **레이어** | Shared Server |
| **역할** | 외부 API 어댑터 · 공통 서버 유틸 |

```typescript
/**
 * Google Places API (New)
 * https://developers.google.com/maps/documentation/places/web-service
 *
 * .env: GOOGLE_PLACES_API_KEY=AIza...
 * 서버에서만 호출하세요 (클라이언트 노출 금지).
 */

const BASE = "https://places.googleapis.com/v1";

export type GoogleLatLng = { latitude: number; longitude: number };

export type GooglePlaceSummary = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  rating?: number;
  reviewCount?: number;
  address?: string;
  types?: string[];
  primaryType?: string;
  editorialSummary?: string;
  servesBreakfast?: boolean;
  servesLunch?: boolean;
  servesDinner?: boolean;
  servesCoffee?: boolean;
  servesDessert?: boolean;
  servesBeer?: boolean;
  servesWine?: boolean;
  servesVegetarianFood?: boolean;
  hours?: string;
  priceLevel?: string;
  imageUrl?: string;
};

export type GooglePlaceReview = {
  author: string;
  rating: number;
  createdAt: string;
  text: string;
};

export type GooglePlaceDetails = GooglePlaceSummary & {
  reviews: GooglePlaceReview[];
};

function apiKey(): string | null {
  const key = process.env.GOOGLE_PLACES_API_KEY?.trim();
  return key || null;
}

export function hasGooglePlacesKey(): boolean {
  return Boolean(apiKey());
}

async function request<T>(
  path: string,
  init: RequestInit & { fieldMask: string },
): Promise<T | null> {
  const key = apiKey();
  if (!key) return null;

  try {
    const res = await fetch(`${BASE}${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": key,
        "X-Goog-FieldMask": init.fieldMask,
        ...(init.headers ?? {}),
      },
      cache: "no-store",
    });

    if (!res.ok) {
      const text = await res.text();
      console.warn("[google-places]", res.status, text.slice(0, 300));
      return null;
    }

    return (await res.json()) as T;
  } catch (err) {
    console.warn("[google-places] fetch failed", err);
    return null;
  }
}

type ApiPlace = {
  id?: string;
  displayName?: { text?: string };
  formattedAddress?: string;
  location?: GoogleLatLng;
  rating?: number;
  userRatingCount?: number;
  types?: string[];
  primaryType?: string;
  editorialSummary?: { text?: string };
  servesBreakfast?: boolean;
  servesLunch?: boolean;
  servesDinner?: boolean;
  servesCoffee?: boolean;
  servesDessert?: boolean;
  servesBeer?: boolean;
  servesWine?: boolean;
  servesVegetarianFood?: boolean;
  regularOpeningHours?: { weekdayDescriptions?: string[] };
  priceLevel?: string;
  photos?: { name?: string }[];
  reviews?: {
    rating?: number;
    text?: { text?: string };
    authorAttribution?: { displayName?: string };
    publishTime?: string;
  }[];
};

function mapSummary(place: ApiPlace, imageUrl?: string): GooglePlaceSummary | null {
  if (!place.id || !place.location) return null;
  const name = place.displayName?.text?.trim();
  if (!name) return null;

  return {
    id: place.id,
    name,
    lat: place.location.latitude,
    lng: place.location.longitude,
    rating: place.rating,
    reviewCount: place.userRatingCount,
    address: place.formattedAddress,
    types: place.types,
    primaryType: place.primaryType,
    editorialSummary: place.editorialSummary?.text?.trim(),
    servesBreakfast: place.servesBreakfast,
    servesLunch: place.servesLunch,
    servesDinner: place.servesDinner,
    servesCoffee: place.servesCoffee,
    servesDessert: place.servesDessert,
    servesBeer: place.servesBeer,
    servesWine: place.servesWine,
    servesVegetarianFood: place.servesVegetarianFood,
    hours: place.regularOpeningHours?.weekdayDescriptions?.join(" · "),
    priceLevel: place.priceLevel,
    imageUrl,
  };
}

function mapReviews(place: ApiPlace): GooglePlaceReview[] {
  return (place.reviews ?? [])
    .filter((r) => r.text?.text?.trim())
    .map((r) => ({
      author: r.authorAttribution?.displayName?.trim() || "익명",
      rating: r.rating ?? 0,
      createdAt: r.publishTime?.slice(0, 10) ?? "",
      text: r.text!.text!.trim(),
    }));
}

export async function resolvePhotoUrl(photoName: string): Promise<string | undefined> {
  const key = apiKey();
  if (!key) return undefined;

  try {
    const res = await fetch(
      `${BASE}/${photoName}/media?maxHeightPx=800&maxWidthPx=800&skipHttpRedirect=true`,
      {
        headers: { "X-Goog-Api-Key": key },
        cache: "no-store",
      },
    );
    if (!res.ok) return undefined;
    const json = (await res.json()) as { photoUri?: string };
    return json.photoUri;
  } catch {
    return undefined;
  }
}

async function firstPhotoUrl(place: ApiPlace): Promise<string | undefined> {
  const photoName = place.photos?.[0]?.name;
  if (!photoName) return undefined;
  return resolvePhotoUrl(photoName);
}

export async function searchNearbyPlaces(options: {
  center: GoogleLatLng;
  radiusMeters: number;
  includedTypes: string[];
  maxResultCount?: number;
  languageCode?: string;
}): Promise<GooglePlaceSummary[]> {
  const json = await request<{ places?: ApiPlace[] }>("/places:searchNearby", {
    method: "POST",
    fieldMask:
      "places.id,places.displayName,places.formattedAddress,places.location,places.rating,places.userRatingCount,places.types,places.primaryType,places.editorialSummary,places.servesBreakfast,places.servesLunch,places.servesDinner,places.servesCoffee,places.servesDessert,places.servesBeer,places.servesWine,places.servesVegetarianFood,places.regularOpeningHours,places.priceLevel,places.photos",
    body: JSON.stringify({
      includedTypes: options.includedTypes,
      maxResultCount: options.maxResultCount ?? 20,
      locationRestriction: {
        circle: {
          center: options.center,
          radius: options.radiusMeters,
        },
      },
      languageCode: options.languageCode ?? "ko",
    }),
  });

  if (!json?.places?.length) return [];

  const out: GooglePlaceSummary[] = [];
  for (const place of json.places) {
    const imageUrl = await firstPhotoUrl(place);
    const summary = mapSummary(place, imageUrl);
    if (summary) out.push(summary);
  }
  return out;
}

export async function searchTextPlace(options: {
  textQuery: string;
  center: GoogleLatLng;
  radiusMeters?: number;
  languageCode?: string;
}): Promise<GooglePlaceSummary | null> {
  const json = await request<{ places?: ApiPlace[] }>("/places:searchText", {
    method: "POST",
    fieldMask:
      "places.id,places.displayName,places.formattedAddress,places.location,places.rating,places.userRatingCount,places.types,places.photos",
    body: JSON.stringify({
      textQuery: options.textQuery,
      maxResultCount: 1,
      languageCode: options.languageCode ?? "ko",
      locationBias: {
        circle: {
          center: options.center,
          radius: options.radiusMeters ?? 800,
        },
      },
    }),
  });

  const place = json?.places?.[0];
  if (!place) return null;
  const imageUrl = await firstPhotoUrl(place);
  return mapSummary(place, imageUrl);
}

export async function getPlaceDetails(placeId: string): Promise<GooglePlaceDetails | null> {
  const json = await request<ApiPlace>(`/places/${placeId}`, {
    method: "GET",
    fieldMask:
      "id,displayName,formattedAddress,location,rating,userRatingCount,types,primaryType,editorialSummary,regularOpeningHours,priceLevel,photos,reviews",
  });

  if (!json?.id) return null;
  const imageUrl = await firstPhotoUrl(json);
  const summary = mapSummary(json, imageUrl);
  if (!summary) return null;

  return {
    ...summary,
    reviews: mapReviews(json),
  };
}

/** API 호출 폭주 방지용 간단 배치 */
export async function mapInBatches<T, R>(
  items: T[],
  batchSize: number,
  fn: (item: T) => Promise<R>,
): Promise<R[]> {
  const out: R[] = [];
  for (let i = 0; i < items.length; i += batchSize) {
    const chunk = items.slice(i, i + batchSize);
    const results = await Promise.all(chunk.map(fn));
    out.push(...results);
  }
  return out;
}

```

---

### `src/server/google-places/restaurants.ts`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/server/google-places/restaurants.ts` |
| **레이어** | Shared Server |
| **역할** | 외부 API 어댑터 · 공통 서버 유틸 |

```typescript
import { buildMenuItems } from "@/features/restaurants/lib/menu-items";
import type { RestaurantResult, RestaurantSearchRequest } from "@/server/ai/types";
import type { JapanRegionId } from "@/shared/lib/constants";
import { hasGooglePlacesKey, searchNearbyPlaces } from "@/server/google-places/client";
import type { GooglePlaceSummary } from "@/server/google-places/client";

const REGION_CENTERS: Record<
  JapanRegionId,
  { lat: number; lng: number; radius: number }[]
> = {
  TOKYO: [{ lat: 35.6812, lng: 139.7671, radius: 6000 }],
  OSAKA_KYOTO: [
    { lat: 34.6937, lng: 135.5023, radius: 6000 },
    { lat: 35.0116, lng: 135.7681, radius: 6000 },
  ],
  FUKUOKA: [{ lat: 33.5902, lng: 130.4017, radius: 7000 }],
  SAPPORO: [{ lat: 43.0686, lng: 141.3508, radius: 7000 }],
};

const PRICE_LEVEL_KRW: Record<string, number> = {
  PRICE_LEVEL_FREE: 0,
  PRICE_LEVEL_INEXPENSIVE: 15000,
  PRICE_LEVEL_MODERATE: 30000,
  PRICE_LEVEL_EXPENSIVE: 55000,
  PRICE_LEVEL_VERY_EXPENSIVE: 90000,
};

function cuisineFromTypes(types: string[] | undefined): string {
  if (!types?.length) return "맛집";
  const map: Record<string, string> = {
    ramen_restaurant: "라멘",
    sushi_restaurant: "스시",
    japanese_restaurant: "일식",
    chinese_restaurant: "중식",
    italian_restaurant: "이탈리안",
    cafe: "카페",
    bakery: "베이커리",
    bar: "바",
    meal_takeaway: "테이크아웃",
  };
  for (const t of types) {
    if (map[t]) return map[t];
  }
  return "맛집";
}

function distanceKm(
  center: { lat: number; lng: number },
  point: { lat: number; lng: number },
): number {
  const dLat = (point.lat - center.lat) * 111;
  const dLng =
    (point.lng - center.lng) * 111 * Math.cos((center.lat * Math.PI) / 180);
  return Math.round(Math.hypot(dLat, dLng) * 10) / 10;
}

export async function searchGoogleRestaurants(
  req: RestaurantSearchRequest,
): Promise<RestaurantResult[] | null> {
  if (!hasGooglePlacesKey()) return null;

  const centers = REGION_CENTERS[req.region];
  if (!centers?.length) return null;

  const lists = await Promise.all(
    centers.map((center) =>
      searchNearbyPlaces({
        center: { latitude: center.lat, longitude: center.lng },
        radiusMeters: center.radius,
        includedTypes: ["restaurant", "cafe"],
        maxResultCount: 20,
        languageCode: "ko",
      }),
    ),
  );

  const merged = new Map<string, RestaurantResult>();
  for (const list of lists) {
    for (const place of list) {
      if (merged.has(place.id)) continue;

      const center = centers[0]!;
      const rating = place.rating ?? 0;
      if (req.minRating && rating < req.minRating) continue;

      const avgPriceKrw = PRICE_LEVEL_KRW[place.priceLevel ?? ""] ?? 25000;
      if (req.maxBudgetKrw && avgPriceKrw > req.maxBudgetKrw) continue;

      const dist = distanceKm(center, place);
      if (req.maxDistanceKm && dist > req.maxDistanceKm) continue;

      const cuisine = cuisineFromTypes(place.types);
      merged.set(place.id, mapPlaceToRestaurant(place, {
        cuisine,
        rating,
        distanceKm: dist,
        avgPriceKrw,
      }));
    }
  }

  const results = Array.from(merged.values()).sort((a, b) => b.rating - a.rating);
  return results.length > 0 ? results.slice(0, 40) : null;
}

function mapPlaceToRestaurant(
  place: GooglePlaceSummary,
  extra: { cuisine: string; rating: number; distanceKm: number; avgPriceKrw: number },
): RestaurantResult {
  const menuItems = buildMenuItems({
    types: place.types,
    primaryType: place.primaryType,
    cuisine: extra.cuisine,
    editorialSummary: place.editorialSummary,
    flags: {
      servesBreakfast: place.servesBreakfast,
      servesLunch: place.servesLunch,
      servesDinner: place.servesDinner,
      servesCoffee: place.servesCoffee,
      servesDessert: place.servesDessert,
      servesBeer: place.servesBeer,
      servesWine: place.servesWine,
      servesVegetarianFood: place.servesVegetarianFood,
    },
  });

  return {
    id: place.id,
    name: place.name,
    cuisine: extra.cuisine,
    menuItems,
    menuSummary: place.editorialSummary,
    rating: extra.rating,
    reviewCount: place.reviewCount,
    distanceKm: extra.distanceKm,
    avgPriceKrw: extra.avgPriceKrw,
    hours: place.hours ?? "영업시간 정보 없음",
    reservationRequired: extra.rating >= 4.3,
    address: place.address,
    imageUrl: place.imageUrl,
  };
}

```

---

### `src/server/index.ts`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/server/index.ts` |
| **레이어** | Shared Server |
| **역할** | 외부 API 어댑터 · 공통 서버 유틸 |

```typescript
/** 서버 전용 — API 라우트·서버 컴포넌트에서만 import */
export { prisma } from "./db/prisma";
export { aiAdapter } from "./ai/adapter";
export type * from "./ai/types";

```

---

### `src/server/preload/catalog.ts`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/server/preload/catalog.ts` |
| **레이어** | Shared Server |
| **역할** | 외부 API 어댑터 · 공통 서버 유틸 |

```typescript
import { getAttractionsByRegion } from "@/features/attractions/server/attractions.service";
import {
  searchStays,
  type StaySearchResponse,
} from "@/features/stays/server/stays.service";
import { JAPAN_REGIONS, type JapanRegionId } from "@/shared/lib/constants";
import { defaultTripRange } from "@/shared/lib/trip-dates";
import type { AccommodationSearchRequest, AttractionResult } from "@/server/ai/types";

const REGION_IDS = JAPAN_REGIONS.map((r) => r.id);

export const DEFAULT_STAY_SEARCH: Omit<AccommodationSearchRequest, "region"> = {
  ...defaultTripRange(),
  guests: 2,
  budgetKrw: 150000,
  types: ["HOTEL", "RYOKAN", "GUESTHOUSE"],
  sort: "recommended",
};

type CatalogState = {
  attractions: Partial<Record<JapanRegionId, AttractionResult[]>>;
  stays: Partial<Record<JapanRegionId, StaySearchResponse>>;
  warmedAt: number | null;
};

const state: CatalogState = {
  attractions: {},
  stays: {},
  warmedAt: null,
};

let warmupPromise: Promise<void> | null = null;

function stayRequestFor(region: JapanRegionId): AccommodationSearchRequest {
  return { region, ...DEFAULT_STAY_SEARCH };
}

/** 서버 기동 시·최초 페이지 접근 시 전 지역 관광지·숙박 데이터를 미리 로드 */
export async function warmupCatalog(): Promise<void> {
  console.info("[catalog] warming attractions & stays for all regions…");
  const started = Date.now();

  await Promise.all(
    REGION_IDS.map(async (region) => {
      const [attractions, stays] = await Promise.all([
        getAttractionsByRegion(region).catch(() => [] as AttractionResult[]),
        searchStays(stayRequestFor(region)).catch(
          (): StaySearchResponse => ({
            items: [],
            recommended: [],
            areas: [],
            total: 0,
          }),
        ),
      ]);
      state.attractions[region] = attractions;
      state.stays[region] = stays;
    }),
  );

  state.warmedAt = Date.now();
  console.info(`[catalog] warmup done in ${Date.now() - started}ms`);
}

export function ensureCatalogWarm(): Promise<void> {
  if (state.warmedAt) return Promise.resolve();
  if (!warmupPromise) {
    warmupPromise = warmupCatalog().catch((err) => {
      warmupPromise = null;
      console.error("[catalog] warmup failed", err);
      throw err;
    });
  }
  return warmupPromise;
}

export function isCatalogWarm(): boolean {
  return state.warmedAt !== null;
}

export function getAttractionsCatalog(): Record<JapanRegionId, AttractionResult[]> {
  const out = {} as Record<JapanRegionId, AttractionResult[]>;
  for (const id of REGION_IDS) {
    out[id] = state.attractions[id] ?? [];
  }
  return out;
}

export function getAttractionsForRegion(region: JapanRegionId): AttractionResult[] | undefined {
  return state.attractions[region];
}

export function getStaysCatalog(): Record<JapanRegionId, StaySearchResponse> {
  const out = {} as Record<JapanRegionId, StaySearchResponse>;
  for (const id of REGION_IDS) {
    out[id] =
      state.stays[id] ??
      ({ items: [], recommended: [], areas: [], total: 0 } satisfies StaySearchResponse);
  }
  return out;
}

export function getStaysForRegion(region: JapanRegionId): StaySearchResponse | undefined {
  return state.stays[region];
}

export { stayRequestFor };

```

---

### `src/server/rakuten/translate.ts`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/server/rakuten/translate.ts` |
| **레이어** | Shared Server |
| **역할** | 외부 API 어댑터 · 공통 서버 유틸 |

```typescript
/**
 * 라쿠텐 응답(일본어)의 호텔명·지역·특색 등을 한국어로 변환합니다.
 *
 * 1) DEEPL_API_KEY 가 있으면 DeepL API (일·영→한) 우선
 * 2) 없거나 실패 시 아래 사전(TRANSLATIONS) 치환
 * 3) 사전에도 없으면 원문 유지
 *
 * .env: DEEPL_API_KEY=...  (무료: https://www.deepl.com/pro-api → API 키 발급)
 */
import { buildKoTranslationMap } from "@/server/translate/ko-map";

const TRANSLATIONS: Record<string, string> = {
  // 호텔 체인
  "ホテルメトロポリタン": "호텔 메트로폴리탄",
  "メトロポリタン": "메트로폴리탄",
  "三井ガーデンホテル": "미츠이 가든 호텔",
  "三井ガーデン": "미츠이 가든",
  "スーパーホテルPremier": "슈퍼호텔 프리미어",
  "スーパーホテルＰｒｅｍｉｅｒ": "슈퍼호텔 프리미어",
  "スーパーホテル": "슈퍼호텔",
  "アパホテル": "APA호텔",
  "東横イン": "토요코인",
  "ルートイン": "루트인",
  "ドーミーイン": "도미인",
  "コンフォートホテル": "컴포트 호텔",
  "リッチモンドホテル": "리치먼드 호텔",
  "リッチモンド": "리치먼드",
  "京王プラザホテル": "케이오 플라자 호텔",
  "京王プラザ": "케이오 플라자",
  "帝国ホテル": "임페리얼 호텔",
  "ホテルニューオータニ": "호텔 뉴오타니",
  "ニューオータニ": "뉴오타니",
  "ホテルオークラ": "호텔 오쿠라",
  "オークラ": "오쿠라",
  "ホテル日航": "호텔 닛코",
  "日航": "닛코",
  "グランドハイアット": "그랜드 하얏트",
  "パークハイアット": "파크 하얏트",
  "アンダーズ": "안다즈",
  "ハイアット": "하얏트",
  "ヒルトン": "힐튼",
  "シェラトン": "쉐라톤",
  "ウェスティン": "웨스틴",
  "マリオット": "메리어트",
  "コートヤード": "코트야드",
  "ホリデイ・イン": "홀리데이 인",
  "ホリデイイン": "홀리데이 인",
  "メルキュール": "머큐어",
  "ANAクラウンプラザ": "ANA 크라운 플라자",
  "クラウンプラザ": "크라운 플라자",
  "ペニンシュラ": "페닌슐라",
  "マンダリンオリエンタル": "만다린 오리엔탈",
  "リッツ・カールトン": "리츠 칼튼",
  "リッツカールトン": "리츠 칼튼",
  "フォーシーズンズ": "포시즌스",
  "インターコンチネンタル": "인터컨티넨탈",
  "アマン": "아만",
  "ブルガリ": "불가리",
  "ロイヤルパーク": "로열 파크",
  "ザ・キャピトル": "더 캐피톨",
  "サピアタワー": "사피아 타워",
  "プリンスホテル": "프린스 호텔",
  "プリンス": "프린스",
  "東急ステイ": "토큐 스테이",
  "東急": "토큐",
  "ステイ": "스테이",
  "ガーデン": "가든",
  "センチュリー": "센추리",
  "サザンタワー": "서던 타워",
  "小田急ホテル": "오다큐 호텔",
  "小田急": "오다큐",
  "ＯＴＨＥＲ": "OTHER",
  "ＳＰＡＣＥ": "SPACE",
  "Ａｓａｋｕｓａ": "아사쿠사",
  "Ｓｈｉｂｕｙａ": "시부야",
  "ｓｈｉｂｕｙａ": "시부야",
  "ｓｈｉｎｊｕｋｕ": "신주쿠",
  "Ｓｈｉｎｊｕｋｕ": "신주쿠",
  "Ｔｏｋｙｏ": "도쿄",
  "ｔｏｋｙｏ": "도쿄",

  // 도쿄 지역
  "千代田区": "치요다구",
  "中央区": "츄오구",
  "港区": "미나토구",
  "新宿区": "신주쿠구",
  "渋谷区": "시부야구",
  "豊島区": "토시마구",
  "台東区": "다이토구",
  "墨田区": "스미다구",
  "江東区": "코토구",
  "品川区": "시나가와구",
  "目黒区": "메구로구",
  "大田区": "오타구",
  "世田谷区": "세타가야구",
  "中野区": "나카노구",
  "杉並区": "스기나미구",
  "練馬区": "네리마구",
  "板橋区": "이타바시구",
  "北区": "키타구",
  "荒川区": "아라카와구",
  "足立区": "아다치구",
  "葛飾区": "카츠시카구",
  "江戸川区": "에도가와구",
  "文京区": "분쿄구",

  // 도쿄 동네
  "丸の内": "마루노우치",
  "八重洲": "야에스",
  "京橋": "교바시",
  "日本橋": "니혼바시",
  "銀座": "긴자",
  "新橋": "신바시",
  "汐留": "시오도메",
  "新宿": "신주쿠",
  "西新宿": "니시신주쿠",
  "歌舞伎町": "카부키쵸",
  "渋谷": "시부야",
  "原宿": "하라주쿠",
  "表参道": "오모테산도",
  "六本木": "록폰기",
  "赤坂": "아카사카",
  "麻布": "아자부",
  "池袋": "이케부쿠로",
  "上野": "우에노",
  "浅草": "아사쿠사",
  "押上": "오시아게",
  "錦糸町": "킨시쵸",
  "両国": "료고쿠",
  "秋葉原": "아키하바라",
  "御茶ノ水": "오차노미즈",
  "神田": "칸다",
  "東京": "도쿄",
  "品川": "시나가와",
  "目黒": "메구로",
  "恵比寿": "에비스",
  "中目黒": "나카메구로",
  "代官山": "다이칸야마",
  "二子玉川": "후타코타마가와",
  "豊洲": "토요스",
  "お台場": "오다이바",
  "代々木": "요요기",
  "道玄坂": "도겐자카",
  "花川戸": "하나카와도",
  "雷門": "카미나리몬",
  "蔵前": "쿠라마에",
  "西浅草": "니시아사쿠사",
  "東浅草": "히가시아사쿠사",
  "高円寺": "고엔지",
  "下北沢": "시모키타자와",
  "吉祥寺": "키치죠지",
  "三鷹": "미타카",
  "立川": "다치카와",
  "八王子": "하치오지",
  "丸の内1": "마루노우치 1",
  "中央口": "중앙 출구",
  "丸の内南口": "마루노우치 남쪽 출구",
  "丸の内北口": "마루노우치 북쪽 출구",
  "新南口": "신난구치",
  "마ークシティ": "마크 시티",
  "マークシティ": "마크 시티",
  "寺": "절",
  "駅": "역",
  "線": "선",

  // 오사카·교토
  "大阪市": "오사카시",
  "大阪": "오사카",
  "梅田": "우메다",
  "新大阪": "신오사카",
  "難波": "난바",
  "心斎橋": "신사이바시",
  "道頓堀": "도톤보리",
  "天王寺": "텐노지",
  "京都市": "교토시",
  "京都": "교토",
  "京都駅": "교토역",
  "祇園": "기온",
  "四条": "시조",
  "河原町": "가와라마치",
  "嵐山": "아라시야마",
  "東山": "히가시야마",
  "中京区": "나카교구",
  "下京区": "시모교구",
  "東山区": "히가시야마구",
  "右京区": "우쿄구",

  // 후쿠오카
  "福岡市": "후쿠오카시",
  "福岡": "후쿠오카",
  "博多": "하카타",
  "天神": "텐진",
  "中洲": "나카스",
  "大濠": "오호리",
  "西中洲": "니시나카스",
  "博多区": "하카타구",
  "中央区福岡": "후쿠오카 츄오구",

  // 삿포로
  "札幌市": "삿포로시",
  "札幌": "삿포로",
  "大通": "오도리",
  "すすきの": "스스키노",
  "ススキノ": "스스키노",
  "中央区札幌": "삿포로 츄오구",
  "北区札幌": "삿포로 키타구",
  "定山渓": "조잔케이",

  // 일반어
  "ホテル": "호텔",
  "旅館": "료칸",
  "ゲストハウス": "게스트하우스",
  "ホステル": "호스텔",
  "カプセル": "캡슐",
  "民宿": "민박",
  "ペンション": "펜션",
  "ヴィラ": "빌라",
  "リゾート": "리조트",
  "イン": "인",
  "湯": "유(온천)",
  "温泉": "온천",
  "大浴場": "대욕장",
  "露天風呂": "노천탕",
  "朝食付き": "조식 포함",
  "朝食": "조식",
  "禁煙": "금연",
  "喫煙": "흡연",
  "駐車場": "주차장",
  "Wi-Fi": "Wi-Fi",
  "無料": "무료",
  "高速": "고속",
  "高濃度炭酸泉": "고농도 탄산천",
  "炭酸泉": "탄산천",
  "八重桜": "겹벚꽃",
  "南口": "남쪽 출구",
  "北口": "북쪽 출구",
  "東口": "동쪽 출구",
  "西口": "서쪽 출구",
  "直結": "직결",
  "徒歩": "도보",
  "分": "분",

  // 역
  "ＪＲ東京駅": "JR 도쿄역",
  "JR東京駅": "JR 도쿄역",
  "東京駅": "도쿄역",
  "新宿駅": "신주쿠역",
  "渋谷駅": "시부야역",
  "池袋駅": "이케부쿠로역",
  "上野駅": "우에노역",
  "品川駅": "시나가와역",
  "秋葉原駅": "아키하바라역",
  "東京メトロ": "도쿄 메트로",
  "都営": "도영",
  "京王": "케이오",
  "西武": "세이부",
  "東武": "토부",
  "小田急線": "오다큐선",
  "京成": "케이세이",
  "JR九州": "JR 큐슈",
  "九州": "큐슈",
  "階": "층",
  "ブラッサム": "블라썸",
  "口": "출구",
  "口直結": "출구 직결",
  "上空": "상공",
  "上質": "고급",
  "アパートメント": "아파트먼트",
  "シンジュク": "신주쿠",
};

const HOTEL_PREFIX_RE = /^(ザ・|the\s+)/i;

/** 풀와이드 영숫자를 일반 ASCII로 정규화 */
function normalizeFullWidth(text: string): string {
  return text
    .replace(/[\uFF01-\uFF5E]/g, (ch) =>
      String.fromCharCode(ch.charCodeAt(0) - 0xfee0),
    )
    .replace(/\u3000/g, " ")
    .replace(/[　]+/g, " ");
}

/** "치요다구마루노우치1-7-12" 처럼 붙은 텍스트를 보기 좋게 분리 */
function spaceOutAddress(text: string): string {
  return text
    .replace(/([가-힣]+(?:구|동|군|읍|면|리|쵸|마치))([가-힣])/g, "$1 $2")
    .replace(/([가-힣])(\d)/g, "$1 $2")
    .replace(/(\d)([가-힣])/g, "$1 $2")
    .replace(/\s+/g, " ")
    .trim();
}

/** 한자·가나 비율로 일본어가 많이 남았는지 확인 */
export function isMostlyJapanese(text: string): boolean {
  if (!text) return false;
  const japaneseChars = text.match(/[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]/g);
  if (!japaneseChars) return false;
  return japaneseChars.length / text.length > 0.25;
}

/** 한 줄 텍스트의 일본어 핵심 단어를 한국어로 치환 */
export function translateJa(text: string | undefined | null): string {
  if (!text) return "";
  let out = normalizeFullWidth(text.trim()).replace(/\s+/g, " ");

  // 긴 키워드부터 매칭되도록 정렬
  const keys = Object.keys(TRANSLATIONS).sort((a, b) => b.length - a.length);
  for (const k of keys) {
    if (out.includes(k)) {
      out = out.split(k).join(TRANSLATIONS[k]);
    }
  }

  return out.replace(HOTEL_PREFIX_RE, "더 ");
}

/** 호텔명을 한글화하되 원문이 이미 영어/한글이면 그대로 둠 */
export function translateHotelName(name: string): string {
  if (!name) return name;
  const normalized = normalizeFullWidth(name);
  if (/^[\sA-Za-z0-9.,&'!\-_:]+$/.test(normalized)) return normalized;
  return translateJa(name);
}

/** 주소(영역)에서 첫 동네 이름만 추출해 한글화 */
export function translateArea(address: string | undefined): string | undefined {
  if (!address) return undefined;
  const translated = translateJa(address);
  return spaceOutAddress(translated);
}

/** access 텍스트에서 가장 가까운 역을 추출해 한글화 */
export function translateStation(station: string | undefined): string | undefined {
  if (!station) return undefined;
  return translateJa(station);
}

function pickTranslated(
  text: string | undefined | null,
  map: Map<string, string>,
): string {
  if (!text) return "";
  const trimmed = text.trim();
  return map.get(trimmed) ?? translateJa(trimmed);
}

/**
 * 여러 문자열을 DeepL(일·영→한)로 일괄 번역한 뒤, 실패분은 사전 치환으로 보완한 Map을 만듭니다.
 * travel-client 등에서 호텔 목록 매핑 전 1회 호출하세요.
 */
export async function buildJaKoTranslationMap(
  texts: Array<string | undefined | null>,
): Promise<Map<string, string>> {
  return buildKoTranslationMap(texts, (text) => translateJa(text));
}

/** @deprecated buildJaKoTranslationMap 과 동일 */
export const buildKoTranslationMapForRakuten = buildJaKoTranslationMap;

export function translateHotelNameWithMap(
  name: string,
  map: Map<string, string>,
): string {
  if (!name) return name;
  const normalized = normalizeFullWidth(name);
  if (/^[\sA-Za-z0-9.,&'!\-_:]+$/.test(normalized)) return normalized;
  return pickTranslated(name, map) || translateHotelName(name);
}

export function translateAreaWithMap(
  address: string | undefined,
  map: Map<string, string>,
): string | undefined {
  if (!address) return undefined;
  return spaceOutAddress(pickTranslated(address, map));
}

export function translateStationWithMap(
  station: string | undefined,
  map: Map<string, string>,
): string | undefined {
  if (!station) return undefined;
  return pickTranslated(station, map);
}

```

---

### `src/server/rakuten/travel-client.ts`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/server/rakuten/travel-client.ts` |
| **레이어** | Shared Server |
| **역할** | 외부 API 어댑터 · 공통 서버 유틸 |

```typescript
import { fetchExchangeRate, jpyToKrw } from "@/features/budget/server/exchange-rate";
import type {
  AccommodationAmenity,
  AccommodationResult,
  AccommodationSearchRequest,
  AccommodationType,
} from "@/server/ai/types";
import type { JapanRegionId } from "@/shared/lib/constants";
import {
  buildJaKoTranslationMap,
  isMostlyJapanese,
  translateAreaWithMap,
  translateHotelNameWithMap,
  translateJa,
  translateStationWithMap,
} from "./translate";

const ENDPOINT =
  "https://openapi.rakuten.co.jp/engine/api/Travel/SimpleHotelSearch/20170426";

type RegionSpot = { lat: number; lng: number; radius: number };

/** 지역마다 여러 검색 지점을 두어 결과를 분산·확대합니다. */
const REGION_SPOTS: Record<JapanRegionId, RegionSpot[]> = {
  TOKYO: [
    { lat: 35.6812, lng: 139.7671, radius: 3 }, // 도쿄역
    { lat: 35.6896, lng: 139.7006, radius: 3 }, // 신주쿠
    { lat: 35.658, lng: 139.7016, radius: 3 }, // 시부야
    { lat: 35.7148, lng: 139.7967, radius: 3 }, // 아사쿠사·우에노
  ],
  OSAKA_KYOTO: [
    { lat: 34.7025, lng: 135.4959, radius: 3 }, // 우메다
    { lat: 34.6687, lng: 135.5023, radius: 3 }, // 난바·도톤보리
    { lat: 35.0116, lng: 135.7681, radius: 3 }, // 교토역
    { lat: 35.0036, lng: 135.7782, radius: 3 }, // 기온
  ],
  FUKUOKA: [
    { lat: 33.5902, lng: 130.4017, radius: 3 }, // 하카타
    { lat: 33.5904, lng: 130.3989, radius: 3 }, // 텐진
  ],
  SAPPORO: [
    { lat: 43.0686, lng: 141.3508, radius: 3 }, // 삿포로역·오도리
    { lat: 43.055, lng: 141.353, radius: 3 }, // 스스키노
  ],
};

type CacheEntry = { expires: number; data: AccommodationResult[] };
const cache = new Map<string, CacheEntry>();
const CACHE_TTL_MS = 60_000;

type RakutenHotelBasicInfo = {
  hotelNo: number;
  hotelName: string;
  hotelInformationUrl?: string;
  hotelMinCharge?: number;
  reviewAverage?: number;
  reviewCount?: number;
  hotelImageUrl?: string;
  hotelThumbnailUrl?: string;
  roomImageUrl?: string;
  roomThumbnailUrl?: string;
  hotelSpecial?: string;
  hotelClassCode?: string;
  address1?: string;
  address2?: string;
  access?: string;
  nearestStation?: string;
  latitude?: number;
  longitude?: number;
};

type RakutenHotelEntry = { hotel: { hotelBasicInfo?: RakutenHotelBasicInfo }[] };
type RakutenSearchResponse = { hotels?: RakutenHotelEntry[]; error?: string };

function inferType(info: RakutenHotelBasicInfo): AccommodationType {
  const text = `${info.hotelName} ${info.hotelSpecial ?? ""}`;
  if (/旅館|ryokan|温泉宿/i.test(text)) return "RYOKAN";
  if (/ゲストハウス|guesthouse|ホステル|hostel|カプセル|capsule|backpack/i.test(text)) {
    return "GUESTHOUSE";
  }
  return "HOTEL";
}

const AMENITY_PATTERNS: { keyword: RegExp; amenity: AccommodationAmenity }[] = [
  { keyword: /wi[-_ ]?fi|無線lan|wifi/i, amenity: "WIFI" },
  { keyword: /朝食|breakfast|モーニング/i, amenity: "BREAKFAST" },
  { keyword: /温泉|大浴場|onsen|hot spring/i, amenity: "ONSEN" },
  { keyword: /キッチン|kitchen/i, amenity: "KITCHEN" },
  { keyword: /駐車場|parking/i, amenity: "PARKING" },
  { keyword: /空港|airport|シャトル/i, amenity: "AIRPORT_BUS" },
  { keyword: /ファミリ|family|子供/i, amenity: "FAMILY" },
  { keyword: /禁煙|non[ -]?smoking/i, amenity: "NON_SMOKING" },
];

function inferAmenities(info: RakutenHotelBasicInfo): AccommodationAmenity[] {
  const text = `${info.hotelName} ${info.hotelSpecial ?? ""} ${info.access ?? ""}`;
  const result = new Set<AccommodationAmenity>();
  for (const { keyword, amenity } of AMENITY_PATTERNS) {
    if (keyword.test(text)) result.add(amenity);
  }
  if (result.size === 0) result.add("WIFI");
  return Array.from(result);
}

function walkMinutesFromAccess(access: string | undefined): number | undefined {
  if (!access) return undefined;
  const match = access.match(/徒歩\s*約?\s*(\d{1,3})\s*分/);
  if (match) return Number(match[1]);
  const directMatch = access.match(/直結|直接|connected/i);
  if (directMatch) return 0;
  return undefined;
}

function buildAutoHighlight(
  info: RakutenHotelBasicInfo,
  type: AccommodationType,
  amenities: AccommodationAmenity[],
): string | undefined {
  if (amenities.includes("ONSEN")) return "온천 보유";
  if (type === "RYOKAN") return "전통 료칸";
  if (type === "GUESTHOUSE") return "가성비 숙소";
  if ((info.reviewCount ?? 0) > 1000) return `리뷰 ${(info.reviewCount ?? 0).toLocaleString()}건`;
  if ((info.reviewAverage ?? 0) >= 4.5) return "평점 4.5+";
  return undefined;
}

function nearestStationFromAccess(access: string | undefined): string | undefined {
  if (!access) return undefined;
  const stationMatch = access.match(/「?([^「」,。 \n]+?(?:駅|station))/i);
  return stationMatch ? stationMatch[1] : undefined;
}

function buildHeaders(): HeadersInit {
  const raw = (process.env.RAKUTEN_ALLOWED_ORIGIN ?? "https://www.rakuten.co.jp").trim();
  const origin = raw.startsWith("http") ? raw : `https://${raw}`;
  const referer = origin.endsWith("/") ? origin : `${origin}/`;
  return {
    Origin: origin.replace(/\/$/, ""),
    Referer: referer,
    "User-Agent":
      "Mozilla/5.0 (compatible; MyTripBot/1.0; +https://github.com/dljaemoon0615-lang/SW-)",
    Accept: "application/json",
  };
}

async function callRakuten(params: URLSearchParams): Promise<RakutenSearchResponse | null> {
  try {
    const res = await fetch(`${ENDPOINT}?${params.toString()}`, {
      headers: buildHeaders(),
      cache: "no-store",
    });
    if (!res.ok) {
      const text = await res.text();
      console.warn("[rakuten] error", res.status, text.slice(0, 200));
      return null;
    }
    return (await res.json()) as RakutenSearchResponse;
  } catch (err) {
    console.warn("[rakuten] fetch failed", err);
    return null;
  }
}

async function fetchSpot(
  spot: RegionSpot,
  appId: string,
  accessKey: string,
  affiliateId: string | undefined,
): Promise<RakutenHotelBasicInfo[]> {
  const params = new URLSearchParams({
    applicationId: appId,
    accessKey,
    format: "json",
    latitude: String(spot.lat),
    longitude: String(spot.lng),
    searchRadius: String(spot.radius),
    datumType: "1",
    hits: "30",
    responseType: "large",
  });
  if (affiliateId) params.set("affiliateId", affiliateId);

  const json = await callRakuten(params);
  if (!json?.hotels?.length) return [];

  return json.hotels
    .map((entry) => entry.hotel.find((h) => h.hotelBasicInfo)?.hotelBasicInfo)
    .filter((info): info is RakutenHotelBasicInfo => !!info);
}

export async function searchRakutenStays(
  req: AccommodationSearchRequest,
): Promise<AccommodationResult[] | null> {
  const appId = process.env.RAKUTEN_APP_ID;
  const accessKey = process.env.RAKUTEN_ACCESS_KEY;
  if (!appId || !accessKey) return null;

  const spots = REGION_SPOTS[req.region];
  if (!spots?.length) return null;

  const cacheKey = `${req.region}|${req.types?.sort().join(",") ?? ""}`;
  const now = Date.now();
  const cached = cache.get(cacheKey);
  if (cached && cached.expires > now) return cached.data;

  const affiliateId = process.env.RAKUTEN_AFFILIATE_ID;

  const results = await Promise.all(
    spots.map((spot) => fetchSpot(spot, appId, accessKey, affiliateId)),
  );

  const merged = new Map<number, RakutenHotelBasicInfo>();
  for (const list of results) {
    for (const info of list) {
      if (!merged.has(info.hotelNo)) merged.set(info.hotelNo, info);
    }
  }

  if (merged.size === 0) return null;

  const rate = await fetchExchangeRate();

  const hotelList = Array.from(merged.values());
  const translationMap = await buildJaKoTranslationMap(
    hotelList.flatMap((info) => [
      info.hotelName,
      info.address1,
      info.address2,
      info.hotelSpecial,
      nearestStationFromAccess(info.access),
    ]),
  );

  const items: AccommodationResult[] = hotelList
    .map((info) => {
      const priceJpy = info.hotelMinCharge ?? 0;
      const priceKrw = priceJpy > 0 ? jpyToKrw(priceJpy, rate) : 0;
      const type = inferType(info);
      const amenities = inferAmenities(info);
      const photos = [info.hotelImageUrl, info.roomImageUrl, info.hotelThumbnailUrl]
        .filter((u): u is string => !!u)
        .filter((u, i, arr) => arr.indexOf(u) === i);

      const translatedSpecial = info.hotelSpecial
        ? (translationMap.get(info.hotelSpecial.trim()) ??
          translateJa(info.hotelSpecial))
        : "";
      const trimmedSpecial = translatedSpecial.slice(0, 24);
      const highlight = trimmedSpecial && !isMostlyJapanese(trimmedSpecial)
        ? trimmedSpecial
        : buildAutoHighlight(info, type, amenities);

      return {
        id: `rk-${info.hotelNo}`,
        name: translateHotelNameWithMap(info.hotelName, translationMap),
        type,
        area: translateAreaWithMap(info.address2 || info.address1, translationMap),
        nearestStation: translateStationWithMap(
          nearestStationFromAccess(info.access),
          translationMap,
        ),
        walkMinutes: walkMinutesFromAccess(info.access),
        priceKrw,
        rating: info.reviewAverage ?? 0,
        reviewCount: info.reviewCount,
        amenities,
        highlight,
        imageUrl: photos[0],
        imageUrls: photos.slice(0, 4),
        bookingUrl: info.hotelInformationUrl ?? `https://travel.rakuten.co.jp/HOTEL/${info.hotelNo}/`,
      } satisfies AccommodationResult;
    })
    .filter((s) => s.priceKrw > 0);

  cache.set(cacheKey, { expires: now + CACHE_TTL_MS, data: items });
  return items;
}

```

---

### `src/server/translate/deepl-client.ts`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/server/translate/deepl-client.ts` |
| **레이어** | Shared Server |
| **역할** | 외부 API 어댑터 · 공통 서버 유틸 |

```typescript
/**
 * DeepL API — 일본어·영어 → 한국어 번역
 * https://www.deepl.com/pro-api
 *
 * .env: DEEPL_API_KEY=xxxxxxxx:fx
 *
 * source_lang 을 생략하면 DeepL이 원문 언어를 자동 감지합니다 (JA/EN 혼합 배치 가능).
 */

const DEEPL_FREE = "https://api-free.deepl.com/v2/translate";
const DEEPL_PRO = "https://api.deepl.com/v2/translate";
const CHUNK_SIZE = 50;
const CACHE_TTL_MS = 24 * 60 * 60 * 1000;

type CacheEntry = { value: string; expires: number };
const memoryCache = new Map<string, CacheEntry>();

function deeplEndpoint(apiKey: string): string {
  if (process.env.DEEPL_API_URL) return process.env.DEEPL_API_URL;
  if (process.env.DEEPL_PLAN === "pro") return DEEPL_PRO;
  if (apiKey.endsWith(":fx")) return DEEPL_FREE;
  return DEEPL_PRO;
}

function getCached(text: string): string | undefined {
  const hit = memoryCache.get(text);
  if (!hit || hit.expires < Date.now()) return undefined;
  return hit.value;
}

function setCached(text: string, value: string) {
  memoryCache.set(text, { value, expires: Date.now() + CACHE_TTL_MS });
}

const HANGUL_RE = /[가-힣]/;
const JAPANESE_RE = /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]/;
const LATIN_WORD_RE = /[A-Za-z]{3,}/;

/**
 * 한국어로 번역이 필요한 문자열인지 판별.
 * - 이미 한글만이면 제외
 * - 일본어(가나·한자) 또는 영어 단어(3자 이상)가 있으면 포함
 */
export function needsTranslation(text: string): boolean {
  const t = text.trim();
  if (!t) return false;
  if (HANGUL_RE.test(t) && !JAPANESE_RE.test(t) && !LATIN_WORD_RE.test(t)) return false;
  if (JAPANESE_RE.test(t)) return true;
  if (LATIN_WORD_RE.test(t)) return true;
  return false;
}

/** @deprecated needsTranslation 사용 */
export const needsJaTranslation = needsTranslation;

type DeepLResponse = {
  translations?: Array<{ detected_source_language?: string; text: string }>;
};

async function callDeepLChunk(
  texts: string[],
  apiKey: string,
): Promise<string[] | null> {
  const endpoint = deeplEndpoint(apiKey);
  try {
    const body = new URLSearchParams();
    for (const t of texts) body.append("text", t);
    body.set("target_lang", "KO");
    // source_lang 생략 → JA/EN 자동 감지

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `DeepL-Auth-Key ${apiKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body.toString(),
      next: { revalidate: 86400 },
    });

    if (!res.ok) {
      console.warn("[deepl] translate failed", res.status, await res.text().catch(() => ""));
      return null;
    }

    const data = (await res.json()) as DeepLResponse;
    const out = data.translations?.map((t) => t.text) ?? [];
    if (out.length !== texts.length) return null;
    return out;
  } catch (err) {
    console.warn("[deepl] translate error", err);
    return null;
  }
}

/**
 * 여러 문자열을 일괄 번역 (일본어·영어 → 한국어).
 * 반환 Map: 원문 → 번역문 (API 성공분만)
 */
export async function translateToKoBatch(
  texts: string[],
): Promise<Map<string, string>> {
  const result = new Map<string, string>();
  const apiKey = process.env.DEEPL_API_KEY?.trim();
  if (!apiKey) return result;

  const unique = [...new Set(texts.map((t) => t.trim()).filter(Boolean))];
  const pending: string[] = [];

  for (const text of unique) {
    if (!needsTranslation(text)) continue;
    const cached = getCached(text);
    if (cached) {
      result.set(text, cached);
      continue;
    }
    pending.push(text);
  }

  for (let i = 0; i < pending.length; i += CHUNK_SIZE) {
    const chunk = pending.slice(i, i + CHUNK_SIZE);
    const translated = await callDeepLChunk(chunk, apiKey);
    if (!translated) continue;
    chunk.forEach((orig, idx) => {
      const value = translated[idx];
      if (!value) return;
      result.set(orig, value);
      setCached(orig, value);
    });
  }

  return result;
}

/** @deprecated translateToKoBatch 사용 */
export const translateJaToKoBatch = translateToKoBatch;

export async function translateToKo(text: string): Promise<string | null> {
  const map = await translateToKoBatch([text]);
  return map.get(text.trim()) ?? null;
}

/** @deprecated translateToKo 사용 */
export const translateJaToKo = translateToKo;

export function isDeepLConfigured(): boolean {
  return Boolean(process.env.DEEPL_API_KEY?.trim());
}

```

---

### `src/server/translate/index.ts`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/server/translate/index.ts` |
| **레이어** | Shared Server |
| **역할** | 외부 API 어댑터 · 공통 서버 유틸 |

```typescript
export {
  translateToKo,
  translateToKoBatch,
  translateJaToKo,
  translateJaToKoBatch,
  needsTranslation,
  needsJaTranslation,
  isDeepLConfigured,
} from "./deepl-client";
export { buildKoTranslationMap, applyFromMap } from "./ko-map";

```

---

### `src/server/translate/ko-map.ts`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/server/translate/ko-map.ts` |
| **레이어** | Shared Server |
| **역할** | 외부 API 어댑터 · 공통 서버 유틸 |

```typescript
import { translateToKoBatch } from "@/server/translate/deepl-client";

function pick(
  text: string,
  apiMap: Map<string, string>,
  fallback?: (text: string) => string,
): string {
  const trimmed = text.trim();
  return apiMap.get(trimmed) ?? fallback?.(trimmed) ?? trimmed;
}

/**
 * 여러 문자열을 DeepL(일·영→한)로 일괄 번역한 Map을 만듭니다.
 * API 미설정·실패 시 fallback 함수로 보완하고, 없으면 원문을 유지합니다.
 */
export async function buildKoTranslationMap(
  texts: Array<string | undefined | null>,
  fallback?: (text: string) => string,
): Promise<Map<string, string>> {
  const unique = [
    ...new Set(texts.map((t) => t?.trim()).filter((t): t is string => !!t)),
  ];
  const apiMap = await translateToKoBatch(unique);
  const out = new Map<string, string>();
  for (const text of unique) {
    out.set(text, pick(text, apiMap, fallback));
  }
  return out;
}

/** Map에서 번역문을 가져오거나 원문 반환 */
export function applyFromMap(
  text: string | undefined | null,
  map: Map<string, string>,
): string | undefined {
  if (!text) return undefined;
  const trimmed = text.trim();
  return map.get(trimmed) ?? trimmed;
}

```

---

### `src/shared/hooks/use-view-mode.ts`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/shared/hooks/use-view-mode.ts` |
| **레이어** | Shared Hook |
| **역할** | 공통 React 훅 |

```typescript
"use client";

import { useEffect, useState } from "react";
import type { ViewMode } from "@/shared/lib/view-mode";
import { VIEW_MODE_COOKIE } from "@/shared/lib/view-mode";

function readViewMode(): ViewMode {
  if (typeof document === "undefined") return "desktop";

  const fromHtml = document.documentElement.getAttribute("data-view-mode");
  if (fromHtml === "mobile" || fromHtml === "desktop") return fromHtml;

  const match = document.cookie.match(
    new RegExp(`(?:^|;\\s*)${VIEW_MODE_COOKIE}=(mobile|desktop)`),
  );
  if (match?.[1] === "mobile" || match?.[1] === "desktop") return match[1];

  return "desktop";
}

export function useViewMode(): ViewMode {
  const [mode, setMode] = useState<ViewMode>("desktop");

  useEffect(() => {
    setMode(readViewMode());
  }, []);

  return mode;
}

/** 추후 모바일 전용 주소용 링크 prefix */
export function mobilePath(path: string, mode: ViewMode) {
  if (mode !== "mobile") return path;
  if (path.startsWith("/m")) return path;
  return path === "/" ? "/m" : `/m${path}`;
}

```

---

### `src/shared/index.ts`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/shared/index.ts` |
| **레이어** | 기타 |
| **역할** | 프로젝트 설정 · 보조 파일 |

```typescript
/** 공통 UI·레이아웃·훅 */
export * from "./ui/button";
export { AppShell } from "./layout/app-shell";
export { Providers } from "./providers";

```

---

### `src/shared/layout/app-shell.tsx`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/shared/layout/app-shell.tsx` |
| **레이어** | Shared Layout |
| **역할** | 헤더 · 푸터 · 사이드바 · 셸 |

```tsx
"use client";

import { useViewMode } from "@/shared/hooks/use-view-mode";
import { DesktopShell } from "./desktop-shell";
import { MobileShell } from "./mobile-shell";

export function AppShell({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  const mode = useViewMode();

  if (mode === "mobile") {
    return <MobileShell title={title}>{children}</MobileShell>;
  }

  return <DesktopShell title={title}>{children}</DesktopShell>;
}

```

---

### `src/shared/layout/bottom-nav.tsx`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/shared/layout/bottom-nav.tsx` |
| **레이어** | Shared Layout |
| **역할** | 헤더 · 푸터 · 사이드바 · 셸 |

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calendar, Home, MessageCircle, Wallet } from "lucide-react";

const NAV = [
  { href: "/", label: "홈", icon: Home },
  { href: "/planner", label: "일정", icon: Calendar },
  { href: "/chat", label: "상담", icon: MessageCircle },
  { href: "/budget", label: "예산", icon: Wallet },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-1/2 z-20 w-full max-w-lg -translate-x-1/2 border-t border-[var(--border)] bg-white px-2 py-2 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
      <ul className="grid grid-cols-4 gap-1">
        {NAV.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== "/" && pathname.startsWith(href));
          return (
            <li key={href}>
              <Link
                href={href}
                className={`flex flex-col items-center gap-0.5 rounded-xl py-2 text-xs transition ${
                  active ? "font-medium text-[var(--primary)]" : "text-[var(--muted)]"
                }`}
              >
                <Icon size={20} />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

```

---

### `src/shared/layout/desktop-shell.tsx`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/shared/layout/desktop-shell.tsx` |
| **레이어** | Shared Layout |
| **역할** | 헤더 · 푸터 · 사이드바 · 셸 |

```tsx
import { SiteHeader } from "./site-header";
import { PageWithSidebar } from "./page-with-sidebar";

export function DesktopShell({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <div className="view-desktop-shell min-h-full bg-[var(--background)]">
      <SiteHeader />
      <PageWithSidebar>
        {title ? (
          <header className="page-section-header mb-8 border-b border-[var(--border)] pb-5">
            <h1 className="section-title">{title}</h1>
          </header>
        ) : null}
        {children}
      </PageWithSidebar>
    </div>
  );
}

```

---

### `src/shared/layout/mobile-shell.tsx`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/shared/layout/mobile-shell.tsx` |
| **레이어** | Shared Layout |
| **역할** | 헤더 · 푸터 · 사이드바 · 셸 |

```tsx
import { SiteHeader } from "./site-header";
import { BottomNav } from "./bottom-nav";
import { PageWithSidebar } from "./page-with-sidebar";

export function MobileShell({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <div className="view-mobile-shell mx-auto flex min-h-full w-full max-w-lg flex-col bg-[var(--background)]">
      <SiteHeader />
      {title ? (
        <div className="border-b border-[var(--border)] bg-white px-4 py-3.5">
          <h1 className="text-xl font-bold text-[var(--foreground)]">{title}</h1>
        </div>
      ) : null}
      <main className="flex-1 pb-24">
        <PageWithSidebar>{children}</PageWithSidebar>
      </main>
      <BottomNav />
    </div>
  );
}

```

---

### `src/shared/layout/page-with-sidebar.tsx`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/shared/layout/page-with-sidebar.tsx` |
| **레이어** | Shared Layout |
| **역할** | 헤더 · 푸터 · 사이드바 · 셸 |

```tsx
"use client";

import { ShortcutsMobileBar } from "./shortcuts-mobile-bar";
import { ShortcutsSidebar } from "./shortcuts-sidebar";

export function PageWithSidebar({ children }: { children: React.ReactNode }) {
  return (
    <div className="page-with-sidebar mx-auto w-full max-w-7xl px-4 py-6 md:px-8 md:py-8">
      <ShortcutsSidebar />
      <div className="page-main-content min-w-0 flex-1">
        <ShortcutsMobileBar />
        {children}
      </div>
    </div>
  );
}

```

---

### `src/shared/layout/shortcuts-mobile-bar.tsx`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/shared/layout/shortcuts-mobile-bar.tsx` |
| **레이어** | Shared Layout |
| **역할** | 헤더 · 푸터 · 사이드바 · 셸 |

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  Calendar,
  FolderOpen,
  Hotel,
  ListChecks,
  MapPin,
  MessageCircle,
  Utensils,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { FEATURES } from "@/shared/lib/constants";

const ICONS: Record<string, LucideIcon> = {
  "/checklist": ListChecks,
  "/chat": MessageCircle,
  "/planner": Calendar,
  "/trips": FolderOpen,
  "/budget": Wallet,
  "/restaurants": Utensils,
  "/attractions": MapPin,
  "/stays": Hotel,
  "/settings/notifications": Bell,
};

const MOBILE_LABELS: Record<string, string> = {
  "/checklist": "체크",
  "/chat": "상담",
  "/planner": "일정",
  "/trips": "내일정",
  "/budget": "예산",
  "/restaurants": "맛집",
  "/attractions": "관광",
  "/stays": "숙박",
  "/settings/notifications": "알림",
};

export function ShortcutsMobileBar() {
  const pathname = usePathname();

  return (
    <div className="shortcuts-mobile-bar view-mobile-only border-b border-[var(--border)] bg-white px-4 py-3">
      <p className="mb-2 text-xs font-bold text-[#555]">바로가기</p>
      <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {FEATURES.map((f) => {
          const Icon = ICONS[f.href] ?? MapPin;
          const active = pathname === f.href || pathname.startsWith(`${f.href}/`);

          return (
            <Link
              key={f.href}
              href={f.href}
              className={`flex min-w-[4.25rem] shrink-0 flex-col items-center gap-1 rounded-xl border px-2.5 py-2 ${
                active
                  ? "border-[var(--primary)] bg-[var(--primary-light)] text-[var(--primary)]"
                  : "border-[#eee] bg-[#fafafa] text-[#666]"
              }`}
            >
              <Icon size={18} />
              <span className="text-[10px] font-medium">{MOBILE_LABELS[f.href]}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

```

---

### `src/shared/layout/shortcuts-sidebar.tsx`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/shared/layout/shortcuts-sidebar.tsx` |
| **레이어** | Shared Layout |
| **역할** | 헤더 · 푸터 · 사이드바 · 셸 |

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  Calendar,
  FolderOpen,
  Hotel,
  ListChecks,
  MapPin,
  MessageCircle,
  Utensils,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { SHORTCUT_GROUPS } from "@/shared/lib/shortcut-groups";

const ICONS: Record<string, LucideIcon> = {
  "/checklist": ListChecks,
  "/chat": MessageCircle,
  "/planner": Calendar,
  "/trips": FolderOpen,
  "/budget": Wallet,
  "/restaurants": Utensils,
  "/attractions": MapPin,
  "/stays": Hotel,
  "/settings/notifications": Bell,
};

function NavLink({ href, title, desc }: { href: string; title: string; desc: string }) {
  const pathname = usePathname();
  const Icon = ICONS[href] ?? MapPin;
  const active = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      className={`group flex items-start gap-3 rounded-lg px-3 py-2.5 transition ${
        active ? "bg-[var(--primary-light)] ring-1 ring-[var(--primary)]/30" : "hover:bg-[#f1f3f5]"
      }`}
    >
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
          active ? "bg-white text-[var(--primary)]" : "bg-[#f1f3f5] text-[#888]"
        }`}
      >
        <Icon size={18} />
      </span>
      <span className="min-w-0 pt-0.5">
        <span
          className={`block text-sm font-medium ${active ? "text-[var(--primary)]" : "text-[#333]"}`}
        >
          {title}
        </span>
        <span className="mt-1 block text-[11px] leading-snug text-[var(--muted)]">{desc}</span>
      </span>
    </Link>
  );
}

export function ShortcutsSidebar({ className = "" }: { className?: string }) {
  return (
    <aside className={`shortcuts-sidebar view-desktop-only w-56 shrink-0 xl:w-60 ${className}`}>
      <nav className="shortcuts-nav-panel rounded-xl bg-white p-4 shadow-[0_4px_15px_rgba(0,0,0,0.05)]">
        <h2 className="mb-1 text-lg font-bold">바로가기</h2>
        <p className="mb-4 text-xs text-[var(--muted)]">자주 쓰는 기능</p>
        <div className="space-y-4">
          {SHORTCUT_GROUPS.map((group) => (
            <div key={group.label}>
              <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[#888]">
                {group.label}
              </p>
              <ul className="space-y-1">
                {group.items.map((f) => (
                  <li key={f.href}>
                    <NavLink href={f.href} title={f.title} desc={f.desc} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </nav>
    </aside>
  );
}

```

---

### `src/shared/layout/site-footer.tsx`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/shared/layout/site-footer.tsx` |
| **레이어** | Shared Layout |
| **역할** | 헤더 · 푸터 · 사이드바 · 셸 |

```tsx
import { BrandLogo } from "@/shared/ui/brand-logo";
import { APP_DESCRIPTION } from "@/shared/lib/constants";

export function SiteFooter() {
  return (
    <footer className="site-footer px-5 py-12 text-center md:px-10">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-4">
        <BrandLogo variant="footer" href={undefined} />
        <p className="max-w-md text-sm text-slate-400">{APP_DESCRIPTION}</p>
        <p className="text-xs text-slate-500">
          © 2026 NOW MEET GO · 나믿고. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

```

---

### `src/shared/layout/site-header.tsx`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/shared/layout/site-header.tsx` |
| **레이어** | Shared Layout |
| **역할** | 헤더 · 푸터 · 사이드바 · 셸 |

```tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { BrandLogo } from "@/shared/ui/brand-logo";
import { useViewMode } from "@/shared/hooks/use-view-mode";

const NAV = [
  { href: "/", label: "홈" },
  { href: "/attractions", label: "여행지" },
  { href: "/planner", label: "여행 코스" },
  { href: "/trips", label: "내 일정" },
];

function displayName(name?: string | null, email?: string | null) {
  if (name?.trim()) return name.trim();
  if (email) return email.split("@")[0] ?? "회원";
  return "회원";
}

function HeaderUserMenu() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="h-9 w-28 animate-pulse rounded-full bg-white/50" aria-hidden />;
  }

  if (!session?.user) {
    return (
      <Link href="/login" className="btn-outline text-sm">
        로그인
      </Link>
    );
  }

  const name = displayName(session.user.name, session.user.email);
  const image = session.user.image;

  return (
    <Link
      href="/profile"
      className="flex max-w-[200px] items-center gap-2.5 rounded-full py-1 pl-1 pr-3 transition hover:bg-white/40"
      title="내 프로필"
    >
      {image ? (
        <Image
          src={image}
          alt=""
          width={34}
          height={34}
          unoptimized
          className="h-[34px] w-[34px] shrink-0 rounded-full object-cover ring-2 ring-white/80"
        />
      ) : (
        <span className="header-avatar shrink-0" aria-hidden>
          {name.charAt(0).toUpperCase()}
        </span>
      )}
      <span className="truncate text-[13px] font-semibold text-[#3d528f]">{name}</span>
    </Link>
  );
}

export function SiteHeader({ tone = "default" }: { tone?: "default" | "sky" }) {
  const pathname = usePathname();
  const viewMode = useViewMode();
  const isMobile = viewMode === "mobile";
  const isSky = tone === "sky";

  return (
    <header
      className={`site-header sticky top-0 z-[1000] ${
        isSky ? "site-header--sky" : "border-b border-[var(--border)] bg-white/90 backdrop-blur-xl"
      } px-5 py-4 md:px-8`}
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4">
        <BrandLogo variant="header" />

        {!isMobile ? (
          <nav className="view-desktop-only">
            <ul className="flex list-none gap-7">
              {NAV.map(({ href, label }) => {
                const active =
                  pathname === href || (href !== "/" && pathname.startsWith(href));
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={`relative text-sm font-semibold transition ${
                        active
                          ? "text-[#5a7fd4]"
                          : "text-[#3d528f] hover:text-[#5a7fd4]"
                      }`}
                    >
                      {label}
                      {active ? <span className="nav-active-line" /> : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        ) : null}

        <div className="flex items-center gap-3">
          <HeaderUserMenu />
          {!isMobile ? (
            <Link href="/planner" className="btn-primary hidden px-[18px] py-2.5 text-[13px] sm:inline-flex">
              나믿고 떠나기
            </Link>
          ) : null}
        </div>
      </div>
    </header>
  );
}

```

---

### `src/shared/lib/constants.ts`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/shared/lib/constants.ts` |
| **레이어** | Shared Lib |
| **역할** | 상수 · 공통 유틸 |

```typescript
export const APP_NAME = "NOW MEET GO";
export const APP_TAGLINE = "나믿고";
export const APP_TAGLINE_JA = "ナミコ、いま会いに行きます。";
export const APP_DESCRIPTION = "나믿고, 떠나는 완벽한 일본 여행";

export const JAPAN_REGIONS = [
  { id: "OSAKA_KYOTO", label: "오사카·교토", description: "간사이 권역 통합 일정" },
  { id: "FUKUOKA", label: "후쿠오카", description: "규슈·하카타 중심" },
  { id: "TOKYO", label: "도쿄", description: "수도권·근교" },
  { id: "SAPPORO", label: "삿포로", description: "홋카이도" },
] as const;

export type JapanRegionId = (typeof JAPAN_REGIONS)[number]["id"];

export const BUDGET_CATEGORIES = [
  { id: "ACCOMMODATION", label: "숙박", color: "#ff4757" },
  { id: "TRANSPORT", label: "교통", color: "#5352ed" },
  { id: "FOOD", label: "식비", color: "#ffa502" },
  { id: "SIGHTSEEING", label: "관광", color: "#2ed573" },
  { id: "OTHER", label: "기타", color: "#94a3b8" },
] as const;

export const FEATURES = [
  { href: "/checklist", title: "여행 체크리스트", desc: "한국→일본 출발 전 준비물" },
  { href: "/chat", title: "AI 여행 상담", desc: "자연어 챗봇 · 대화 이력 유지" },
  { href: "/planner", title: "일정 자동 생성", desc: "조건별 일정 · 드래그 앤 드롭" },
  { href: "/trips", title: "일정 저장·공유", desc: "마이페이지 · 동행자 편집" },
  { href: "/budget", title: "예산 관리", desc: "배분 제안 · 환율 반영" },
  { href: "/restaurants", title: "맛집 추천", desc: "필터 · 영업시간 표시" },
  { href: "/attractions", title: "관광지 정보", desc: "지도·리스트 · 추천 방문 시간" },
  { href: "/stays", title: "숙박 검색", desc: "호텔·료칸·게하" },
  { href: "/settings/notifications", title: "카카오 알림", desc: "당일 일정 자동 발송" },
] as const;

```

---

### `src/shared/lib/device.ts`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/shared/lib/device.ts` |
| **레이어** | Shared Lib |
| **역할** | 상수 · 공통 유틸 |

```typescript
const MOBILE_UA_RE =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile/i;

export function isMobileUserAgent(userAgent: string | null | undefined) {
  if (!userAgent) return false;
  return MOBILE_UA_RE.test(userAgent);
}

```

---

### `src/shared/lib/load-google-maps.ts`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/shared/lib/load-google-maps.ts` |
| **레이어** | Shared Lib |
| **역할** | 상수 · 공통 유틸 |

```typescript
import { Loader } from "@googlemaps/js-api-loader";

let loaderPromise: Promise<typeof google> | null = null;
let cachedKey: string | null = null;

export async function fetchGoogleMapsApiKey(): Promise<string | null> {
  const fromEnv = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY?.trim();
  if (fromEnv) return fromEnv;

  try {
    const res = await fetch("/api/config/google-maps");
    if (!res.ok) return null;
    const json = (await res.json()) as { apiKey?: string | null };
    return json.apiKey?.trim() || null;
  } catch {
    return null;
  }
}

export async function loadGoogleMaps(apiKey: string): Promise<typeof google> {
  if (loaderPromise && cachedKey === apiKey) {
    return loaderPromise;
  }

  cachedKey = apiKey;
  const loader = new Loader({
    apiKey,
    version: "weekly",
  });
  loaderPromise = loader.load();
  return loaderPromise;
}

```

---

### `src/shared/lib/resolve-view-mode.ts`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/shared/lib/resolve-view-mode.ts` |
| **레이어** | Shared Lib |
| **역할** | 상수 · 공통 유틸 |

```typescript
import type { NextRequest } from "next/server";
import { isMobileUserAgent } from "./device";
import {
  isMobileHost,
  isMobilePath,
  VIEW_MODE_COOKIE,
  type ViewMode,
} from "./view-mode";

export function resolveViewMode(req: NextRequest): ViewMode {
  const host = req.headers.get("host") ?? "";
  const ua = req.headers.get("user-agent");

  if (isMobileHost(host) || isMobilePath(req.nextUrl.pathname)) {
    return "mobile";
  }

  const forced = req.nextUrl.searchParams.get("view");
  if (forced === "mobile" || forced === "desktop") return forced;

  const cookie = req.cookies.get(VIEW_MODE_COOKIE)?.value;
  if (cookie === "mobile" || cookie === "desktop") return cookie;

  return isMobileUserAgent(ua) ? "mobile" : "desktop";
}

```

---

### `src/shared/lib/shortcut-groups.ts`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/shared/lib/shortcut-groups.ts` |
| **레이어** | Shared Lib |
| **역할** | 상수 · 공통 유틸 |

```typescript
import { FEATURES } from "./constants";

export const SHORTCUT_GROUPS = [
  {
    label: "여행 준비",
    items: FEATURES.filter((f) => ["/checklist", "/budget"].includes(f.href)),
  },
  {
    label: "일정 · AI",
    items: FEATURES.filter((f) =>
      ["/planner", "/trips", "/chat"].includes(f.href),
    ),
  },
  {
    label: "탐색",
    items: FEATURES.filter((f) =>
      ["/restaurants", "/attractions", "/stays"].includes(f.href),
    ),
  },
  {
    label: "알림",
    items: FEATURES.filter((f) => f.href === "/settings/notifications"),
  },
] as const;

```

---

### `src/shared/lib/trip-dates.ts`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/shared/lib/trip-dates.ts` |
| **레이어** | Shared Lib |
| **역할** | 상수 · 공통 유틸 |

```typescript
import {
  addDays,
  differenceInCalendarDays,
  format,
  parseISO,
  startOfDay,
} from "date-fns";
import { ko } from "date-fns/locale";

export type TripDateRange = {
  startDate: string;
  endDate: string;
};

export function toDateString(date: Date): string {
  return format(date, "yyyy-MM-dd");
}

export function defaultTripRange(nights = 6): TripDateRange {
  const start = startOfDay(addDays(new Date(), 14));
  const end = addDays(start, nights);
  return { startDate: toDateString(start), endDate: toDateString(end) };
}

export function tripNightsAndDays(startDate: string, endDate: string) {
  const nights = differenceInCalendarDays(parseISO(endDate), parseISO(startDate));
  return { nights, days: nights + 1 };
}

export function formatTripDuration(startDate: string, endDate: string): string {
  const { nights, days } = tripNightsAndDays(startDate, endDate);
  return `${nights}박 ${days}일`;
}

export function formatTripRangeLabel(startDate: string, endDate: string): string {
  const start = parseISO(startDate);
  const end = parseISO(endDate);
  return `${format(start, "M.d", { locale: ko })} – ${format(end, "M.d", { locale: ko })}`;
}

export function formatTripRangeDetail(startDate: string, endDate: string): string {
  const start = parseISO(startDate);
  const end = parseISO(endDate);
  return `${format(start, "yyyy.M.d (EEE)", { locale: ko })} – ${format(end, "yyyy.M.d (EEE)", { locale: ko })}`;
}

```

---

### `src/shared/lib/view-mode-server.ts`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/shared/lib/view-mode-server.ts` |
| **레이어** | Shared Lib |
| **역할** | 상수 · 공통 유틸 |

```typescript
import { headers } from "next/headers";
import type { ViewMode } from "./view-mode";
import { VIEW_MODE_HEADER } from "./view-mode";

export async function getViewMode(): Promise<ViewMode> {
  const h = await headers();
  const mode = h.get(VIEW_MODE_HEADER);
  if (mode === "mobile" || mode === "desktop") return mode;
  return "desktop";
}

```

---

### `src/shared/lib/view-mode.ts`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/shared/lib/view-mode.ts` |
| **레이어** | Shared Lib |
| **역할** | 상수 · 공통 유틸 |

```typescript
export type ViewMode = "desktop" | "mobile";

export const VIEW_MODE_HEADER = "x-view-mode";
export const VIEW_MODE_COOKIE = "view-mode";

/** 추후 모바일 전용 주소: m.example.com 또는 /m/... */
export function isMobileHost(host: string) {
  const hostname = host.split(":")[0].toLowerCase();
  return hostname.startsWith("m.");
}

export function isMobilePath(pathname: string) {
  return pathname === "/m" || pathname.startsWith("/m/");
}

```

---

### `src/shared/providers.tsx`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/shared/providers.tsx` |
| **레이어** | Shared Provider |
| **역할** | React Context/Provider 래퍼 |

```tsx
"use client";

import { SessionProvider } from "next-auth/react";
import { AiChatWidget } from "@/features/chat/components/ai-chat-widget";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider refetchOnWindowFocus refetchWhenOffline={false}>
      {children}
      <AiChatWidget />
    </SessionProvider>
  );
}

```

---

### `src/shared/ui/badge.tsx`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/shared/ui/badge.tsx` |
| **레이어** | Shared UI |
| **역할** | 재사용 UI 컴포넌트 |

```tsx
export function Badge({
  children,
  tone = "default",
}: {
  children: React.ReactNode;
  tone?: "default" | "success" | "warning";
}) {
  const tones = {
    default: "bg-slate-100 text-slate-700",
    success: "bg-emerald-100 text-emerald-800",
    warning: "bg-amber-100 text-amber-800",
  };

  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${tones[tone]}`}>
      {children}
    </span>
  );
}

```

---

### `src/shared/ui/brand-hands-icon.tsx`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/shared/ui/brand-hands-icon.tsx` |
| **레이어** | Shared UI |
| **역할** | 재사용 UI 컴포넌트 |

```tsx
/** 손잡기 브랜드 마크 — 48×48 viewBox 공용 */
export function BrandHandsGraphic({ gradId = "nmg-grad" }: { gradId?: string }) {
  return (
    <>
      <defs>
        <linearGradient id={gradId} x1="4" y1="44" x2="44" y2="4" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--primary)" />
          <stop offset="1" stopColor="var(--accent)" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="44" height="44" rx="14" fill={`url(#${gradId})`} />
      <g fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12.5 33 C10.8 29.5 11 24.8 14.2 21.8" />
        <path d="M14.2 21.8 C15.5 18.5 17.8 17.2 19.6 18.8" />
        <path d="M19.6 18.8 L19.6 14.8" />
        <path d="M21.4 19.5 L21.4 15.2" />
        <path d="M23.2 20.2 L23.2 16" />
        <path d="M14.2 21.8 L12.8 25.5" />
        <path d="M35.5 33 C37.2 29.5 37 24.8 33.8 21.8" />
        <path d="M33.8 21.8 C32.5 18.5 30.2 17.2 28.4 18.8" />
        <path d="M28.4 18.8 L28.4 14.8" />
        <path d="M26.6 19.5 L26.6 15.2" />
        <path d="M24.8 20.2 L24.8 16" />
        <path d="M33.8 21.8 L35.2 25.5" />
        <path d="M19.6 18.8 C21.8 16.8 26.2 16.8 28.4 18.8" />
      </g>
      <circle cx="24" cy="18.5" r="2.2" fill="white" />
    </>
  );
}

```

---

### `src/shared/ui/brand-logo.tsx`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/shared/ui/brand-logo.tsx` |
| **레이어** | Shared UI |
| **역할** | 재사용 UI 컴포넌트 |

```tsx
"use client";

import Link from "next/link";
import { useId } from "react";
import { APP_NAME, APP_TAGLINE } from "@/shared/lib/constants";
import { BrandHandsGraphic } from "@/shared/ui/brand-hands-icon";

type Variant = "header" | "hero" | "compact" | "footer";

type Props = {
  variant?: Variant;
  href?: string;
  className?: string;
};

export function BrandMark({ size }: { size: number }) {
  const gradId = useId().replace(/:/g, "");

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className="shrink-0"
    >
      <BrandHandsGraphic gradId={gradId} />
    </svg>
  );
}

export function BrandLogo({ variant = "header", href = "/", className = "" }: Props) {
  const isHero = variant === "hero";
  const isCompact = variant === "compact";
  const isFooter = variant === "footer";

  const markSize = isHero ? 64 : isCompact ? 32 : isFooter ? 28 : 38;

  const content = (
    <div className={`brand-logo inline-flex items-center gap-2.5 ${className}`}>
      <BrandMark size={markSize} />
      <div className="flex flex-col leading-tight">
        <span
          className={`brand-logo-en font-montserrat font-bold tracking-wide ${
            isHero
              ? "text-[length:var(--hero-title-size)] text-[var(--foreground)]"
              : isFooter
                ? "text-base text-white"
                : "text-[13px] text-[var(--logo-en)]"
          }`}
        >
          {APP_NAME}
        </span>
        {!isCompact ? (
          <span
            className={`brand-logo-kr font-medium ${
              isHero
                ? "text-xl text-[var(--primary)]"
                : isFooter
                  ? "text-xs text-[var(--primary-light-text)]"
                  : "text-[11px] text-[var(--logo-kr)]"
            }`}
          >
            {APP_TAGLINE}
          </span>
        ) : null}
      </div>
    </div>
  );

  if (href && !isFooter) {
    return (
      <Link href={href} className="transition-opacity hover:opacity-90">
        {content}
      </Link>
    );
  }

  return content;
}

```

---

### `src/shared/ui/button.tsx`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/shared/ui/button.tsx` |
| **레이어** | Shared UI |
| **역할** | 재사용 UI 컴포넌트 |

```tsx
import { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "outline";
};

const styles = {
  primary: "btn-primary",
  secondary: "bg-[var(--dark)] text-white hover:bg-[var(--primary)]",
  ghost: "bg-transparent text-[var(--muted)] hover:bg-[#f1f3f5]",
  outline: "btn-outline",
};

export function Button({ variant = "primary", className = "", ...props }: Props) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-medium transition disabled:opacity-50 ${styles[variant]} ${className}`}
      {...props}
    />
  );
}

```

---

### `src/shared/ui/card.tsx`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/shared/ui/card.tsx` |
| **레이어** | Shared UI |
| **역할** | 재사용 UI 컴포넌트 |

```tsx
import { ReactNode } from "react";

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`ui-card p-4 ${className}`}>{children}</div>;
}

```

---

### `src/shared/ui/trip-date-range-picker.tsx`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/shared/ui/trip-date-range-picker.tsx` |
| **레이어** | Shared UI |
| **역할** | 재사용 UI 컴포넌트 |

```tsx
"use client";

import {
  addDays,
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isAfter,
  isBefore,
  isSameDay,
  isSameMonth,
  parseISO,
  startOfDay,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { ko } from "date-fns/locale";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import {
  formatTripDuration,
  formatTripRangeDetail,
  formatTripRangeLabel,
  type TripDateRange,
} from "@/shared/lib/trip-dates";

type Props = {
  value: TripDateRange;
  onChange: (range: TripDateRange) => void;
  label?: string;
  minDate?: Date;
  variant?: "hero" | "default";
};

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

export function TripDateRangePicker({
  value,
  onChange,
  label = "날짜 선택",
  minDate = startOfDay(new Date()),
  variant = "default",
}: Props) {
  const id = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [viewMonth, setViewMonth] = useState(() => startOfMonth(parseISO(value.startDate)));
  const [draftStart, setDraftStart] = useState<string | null>(null);

  const start = parseISO(value.startDate);
  const end = parseISO(value.endDate);
  const durationLabel = formatTripDuration(value.startDate, value.endDate);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [open]);

  useEffect(() => {
    if (open) {
      setViewMonth(startOfMonth(parseISO(value.startDate)));
      setDraftStart(null);
    }
  }, [open, value.startDate]);

  function isDisabled(day: Date) {
    return isBefore(day, minDate);
  }

  function isInRange(day: Date) {
    if (draftStart) return false;
    if (isBefore(end, start)) return false;
    return (
      (isSameDay(day, start) || isAfter(day, start)) &&
      (isSameDay(day, end) || isBefore(day, end))
    );
  }

  function isRangeEdge(day: Date) {
    if (draftStart) return isSameDay(day, parseISO(draftStart));
    return isSameDay(day, start) || isSameDay(day, end);
  }

  function onDayClick(day: Date) {
    if (isDisabled(day)) return;

    const clicked = format(day, "yyyy-MM-dd");

    if (!draftStart) {
      setDraftStart(clicked);
      return;
    }

    let nextStart = draftStart;
    let nextEnd = clicked;
    if (isBefore(parseISO(clicked), parseISO(draftStart))) {
      nextStart = clicked;
      nextEnd = draftStart;
    }
    if (nextStart === nextEnd) {
      nextEnd = format(addDays(parseISO(nextStart), 1), "yyyy-MM-dd");
    }

    onChange({ startDate: nextStart, endDate: nextEnd });
    setDraftStart(null);
    setOpen(false);
  }

  const monthStart = startOfMonth(viewMonth);
  const monthEnd = endOfMonth(viewMonth);
  const gridStart = startOfWeek(monthStart, { weekStartsOn: 0 });
  const gridEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });
  const days = eachDayOfInterval({ start: gridStart, end: gridEnd });

  const triggerClass =
    variant === "hero"
      ? "w-full text-left outline-none"
      : "w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-left text-sm text-slate-800";

  return (
    <div ref={rootRef} className="relative w-full">
      <label htmlFor={id} className={variant === "hero" ? undefined : "mb-1 block text-sm font-medium"}>
        {variant === "hero" ? (
          <span className="sb-label">{label}</span>
        ) : (
          label
        )}
      </label>
      <button
        id={id}
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`${triggerClass} flex items-center gap-2`}
        aria-expanded={open}
        aria-haspopup="dialog"
      >
        {variant !== "hero" ? (
          <Calendar size={16} className="shrink-0 text-[var(--primary)]" />
        ) : null}
        <span className="min-w-0 flex-1">
          <span className={variant === "hero" ? "sb-value block" : "block font-semibold"}>
            {durationLabel}
          </span>
          <span className={variant === "hero" ? "sb-sub block" : "text-xs text-slate-500"}>
            {formatTripRangeLabel(value.startDate, value.endDate)}
          </span>
        </span>
      </button>

      {open ? (
        <div
          role="dialog"
          aria-label="여행 날짜 선택"
          className={`trip-date-picker-panel z-50 ${
            variant === "hero"
              ? "left-1/2 mt-2 w-[min(100vw-2rem,340px)] -translate-x-1/2 sm:left-0 sm:translate-x-0"
              : "left-0 mt-2 w-full min-w-[300px] sm:w-[340px]"
          } absolute top-full rounded-2xl border border-slate-200 bg-white p-4 shadow-xl`}
        >
          <div className="mb-3 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => setViewMonth((m) => subMonths(m, 1))}
              className="rounded-lg p-1.5 hover:bg-slate-100"
              aria-label="이전 달"
            >
              <ChevronLeft size={20} />
            </button>
            <p className="text-sm font-bold text-slate-800">
              {format(viewMonth, "yyyy년 M월", { locale: ko })}
            </p>
            <button
              type="button"
              onClick={() => setViewMonth((m) => addMonths(m, 1))}
              className="rounded-lg p-1.5 hover:bg-slate-100"
              aria-label="다음 달"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <p className="mb-3 text-center text-xs text-slate-500">
            {draftStart
              ? "체크아웃 날짜를 선택하세요"
              : "체크인 날짜를 선택하세요"}
          </p>

          <div className="mb-2 grid grid-cols-7 gap-1 text-center text-[11px] font-medium text-slate-400">
            {WEEKDAYS.map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {days.map((day) => {
              const inMonth = isSameMonth(day, viewMonth);
              const disabled = isDisabled(day);
              const selected = isRangeEdge(day);
              const inRange = isInRange(day) && !selected;

              return (
                <button
                  key={day.toISOString()}
                  type="button"
                  disabled={disabled}
                  onClick={() => onDayClick(day)}
                  className={[
                    "h-9 rounded-lg text-sm transition",
                    !inMonth && "text-slate-300",
                    disabled && "cursor-not-allowed opacity-30",
                    inRange && "bg-[var(--primary-light)] text-[var(--primary)]",
                    selected && "bg-[var(--primary)] font-bold text-white",
                    !selected && !inRange && !disabled && inMonth && "hover:bg-slate-100",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {format(day, "d")}
                </button>
              );
            })}
          </div>

          <div className="mt-4 rounded-xl bg-slate-50 px-3 py-2.5 text-center">
            <p className="text-sm font-bold text-[var(--primary)]">{durationLabel}</p>
            <p className="mt-0.5 text-xs text-slate-600">
              {draftStart
                ? `${format(parseISO(draftStart), "M.d", { locale: ko })} – 체크아웃 선택`
                : formatTripRangeDetail(value.startDate, value.endDate)}
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}

```

---

### `src/types/next-auth.d.ts`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `src/types/next-auth.d.ts` |
| **레이어** | Types |
| **역할** | 전역 TypeScript 타입 확장 |

```typescript
import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

```

---

### `tsconfig.json`

| 항목 | 내용 |
|------|------|
| **파일 경로** | `tsconfig.json` |
| **레이어** | 기타 |
| **역할** | 프로젝트 설정 · 보조 파일 |

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"],
      "@/shared/*": ["./src/shared/*"],
      "@/server/*": ["./src/server/*"],
      "@/features/*": ["./src/features/*"]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    ".next/dev/types/**/*.ts",
    "**/*.mts"
  ],
  "exclude": ["node_modules"]
}

```

---
