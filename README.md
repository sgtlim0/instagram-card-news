# Instagram Card News Generator

AI 기반 인스타그램 카드뉴스 자동 생성기. 주제를 입력하면 AI가 전문적인 멀티 슬라이드 카드뉴스 콘텐츠를 자동으로 생성합니다.

## Tech Stack

| Category | Stack |
|----------|-------|
| Framework | Next.js 16.1.6 (App Router) |
| Language | TypeScript 5, React 19.2 |
| Styling | Tailwind CSS 4, Radix UI, shadcn/ui |
| State | Zustand 5 |
| AI | AWS Bedrock (Nova Micro / Claude Sonnet 4) |
| Export | html-to-image, JSZip, FileSaver |
| Testing | Playwright (E2E) |

## Features

### AI 콘텐츠 생성
- 주제 입력 -> AI가 슬라이드 구조 기획 -> 전체 콘텐츠 자동 생성
- 2단계 파이프라인: Plan(구조 설계) -> Generate(콘텐츠 생성)
- AWS Bedrock API를 통한 LLM 호출

### 14가지 슬라이드 타입

| Type | Description |
|------|-------------|
| Cover | 타이틀 슬라이드 (라벨, 헤드라인, 설명) |
| Content | 기본 텍스트 콘텐츠 |
| Content-Stat | 통계/수치 강조 |
| Content-Quote | 인용구/증언 |
| Content-Badge | 뱃지 강조 콘텐츠 |
| Content-Steps | 3단계 프로세스 |
| Content-List | 5항목 리스트 |
| Content-Split | 좌우 비교 |
| Content-Highlight | 핵심 메시지 강조 |
| Content-Image | 이미지 + 캡션 |
| Content-Grid | 4항목 그리드 |
| Content-Bigdata | 대형 숫자 시각화 |
| Content-Fullimage | 풀스크린 이미지 오버레이 |
| CTA | Call-to-Action 마무리 |

### 8가지 디자인 템플릿

| Template | Style | Font |
|----------|-------|------|
| Clean | 그린 액센트, 밝은 배경 | Georgia, Playfair Display |
| Minimal | 블루 액센트, 화이트 배경 | DM Sans |
| Bold | 퍼플 그라데이션, 다크 배경 | Bebas Neue |
| Elegant | 골드 액센트, 다크 배경 | Cormorant Garamond |
| Premium | 핑크 액센트, 블랙 배경 | Inter |
| Toss | 블루 액센트, 다크 네이비 | Apple System |
| Magazine | 레드 액센트, 크림 배경 | Merriweather |
| Blueprint | 시안 액센트, 네이비 배경 | JetBrains Mono |

### 에디터
- 슬라이드별 필드 편집 (타입에 따른 동적 폼)
- 슬라이드 추가/삭제/순서 변경
- 실시간 미리보기 (1080x1350 인스타그램 비율)
- 키보드/마우스/터치 네비게이션

### 내보내기
- 개별 슬라이드 PNG 다운로드 (1080x1350, 2x 해상도)
- 전체 슬라이드 ZIP 일괄 다운로드
- 클라이언트 사이드 처리 (서버 업로드 불필요)

### UI/UX
- 반응형 디자인 (데스크톱 사이드바 / 모바일 시트 드로어)
- 다크/라이트 테마
- DVH(Dynamic Viewport Height) 모바일 최적화
- Safe Area 지원 (노치 디바이스)

## Project Structure

```
src/
├── app/                        # Next.js App Router
│   ├── (app)/                  # 앱 라우트 그룹
│   │   ├── create/             # /create - 채팅 기반 생성 플로우
│   │   └── editor/             # /editor - 에디터 페이지
│   ├── (marketing)/            # 마케팅 라우트 그룹
│   │   ├── page.tsx            # 랜딩 페이지 (/)
│   │   └── templates/          # /templates - 템플릿 갤러리
│   └── api/
│       ├── generate/           # POST /api/generate
│       └── generate-plan/      # POST /api/generate-plan
├── features/                   # 기능별 모듈 (도메인 주도)
│   ├── chat-create/            # 채팅 기반 생성 UI
│   ├── export-card/            # 내보내기 기능
│   ├── generate-card/          # 직접 생성 UI
│   ├── landing/                # 랜딩 페이지 섹션
│   ├── preview-card/           # 슬라이드 미리보기 & 렌더링
│   │   └── ui/slides/          # 14개 슬라이드 타입 컴포넌트
│   ├── slide-editor/           # 슬라이드 편집 인터페이스
│   └── template-gallery/       # 템플릿 갤러리
├── shared/                     # 공유 비즈니스 로직
│   ├── config/                 # 상수, i18n, 템플릿 설정
│   ├── lib/                    # bedrock API, export, store
│   └── types/                  # TypeScript 타입 정의
├── widgets/                    # 레이아웃 & 컨테이너 컴포넌트
│   ├── app-header/
│   ├── card-editor/            # 에디터 레이아웃
│   ├── navigation/             # Navbar, MobileMenu
│   └── theme-provider/         # 다크/라이트 테마
└── components/ui/              # shadcn UI 컴포넌트
```

## Getting Started

### Prerequisites

- Node.js 20+
- AWS Bedrock 접근 권한 (Bearer Token)

### Installation

```bash
npm install
```

### Environment Variables

`.env.local.example`을 `.env.local`로 복사하고 값을 설정합니다:

```bash
cp .env.local.example .env.local
```

```env
AWS_BEARER_TOKEN_BEDROCK=<your-bearer-token>
AWS_BEDROCK_REGION=us-east-1
AWS_BEDROCK_MODEL_ID=us.anthropic.claude-sonnet-4-20250514-v1:0
```

### Development

```bash
npm run dev          # http://localhost:3000
```

### Build

```bash
npm run build
npm run start
```

### E2E Tests

```bash
npx playwright install   # 브라우저 설치 (최초 1회)
npm run test:e2e         # Playwright 테스트 실행
npm run test:e2e:ui      # 인터랙티브 UI 모드
```

테스트 시나리오: 랜딩 페이지, 네비게이션, 생성 플로우, 템플릿 갤러리

## Data Flow

```
사용자 주제 입력
    |
    v
/api/generate-plan  -->  슬라이드 구조 계획 (AI)
    |
    v
스타일 선택 & 계획 확인
    |
    v
/api/generate  -->  전체 슬라이드 콘텐츠 생성 (AI)
    |
    v
Zustand Store에 슬라이드 저장
    |
    v
에디터에서 편집 & 미리보기
    |
    v
PNG / ZIP 내보내기 (클라이언트 사이드)
```

## Architecture Decisions

- **Feature-based 디렉토리 구조**: 타입별이 아닌 기능/도메인별 구성으로 높은 응집도 유지
- **Zustand**: 경량 상태 관리, 불변 업데이트 패턴 적용
- **클라이언트 사이드 내보내기**: html-to-image로 서버 부하 없이 고해상도 PNG 생성
- **2단계 AI 파이프라인**: Plan/Generate 분리로 사용자가 구조를 확인 후 생성 진행
- **Radix UI + shadcn**: 접근성 보장된 UI 프리미티브 기반 컴포넌트
