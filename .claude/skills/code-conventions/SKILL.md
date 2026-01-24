---
name: code-conventions
description: 프로젝트 코딩 컨벤션 (네이밍 규칙, 폴더 구조, 컴포넌트 패턴). 새 파일/컴포넌트 생성, 프로젝트 구조 질문 시 사용.
---

# 코드 컨벤션

## 네이밍 규칙

| 대상              | 규칙                   | 예시                       |
| ----------------- | ---------------------- | -------------------------- |
| 컴포넌트          | PascalCase             | `UserProfile.tsx`          |
| 훅                | camelCase + use 접두사 | `useAuth.ts`               |
| 유틸 함수         | camelCase              | `formatDate.ts`            |
| 상수              | SCREAMING_SNAKE_CASE   | `API_BASE_URL`             |
| 타입/인터페이스   | PascalCase             | `UserData`, `RecordItem`   |
| 파일 (컴포넌트)   | PascalCase             | `RecordCard.tsx`           |
| 파일 (비컴포넌트) | camelCase              | `utils.ts`, `constants.ts` |
| 파일 (shadcn/ui)  | kebab-case             | `alert-dialog.tsx`         |

> shadcn/ui 컴포넌트는 kebab-case로 파일명이 자동 생성되므로 그대로 사용.

## 폴더 구조

```
src/
├── apis/                # API 함수 및 React Query 훅
│   └── [feature]/
│       ├── index.ts
│       ├── interface.ts
│       └── queries.ts
├── components/
│   └── ui/              # shadcn/ui 컴포넌트 (자동 생성)
├── pages/
│   ├── home/
│   │   ├── index.tsx           # 페이지 컴포넌트
│   │   └── _components/        # 페이지 전용 컴포넌트
│   │       ├── HeroSection.tsx
│   │       └── StatsCard.tsx
│   ├── record/
│   │   ├── index.tsx
│   │   ├── _components/
│   │   │   ├── RecordForm.tsx
│   │   │   └── EmotionSelector.tsx
│   │   └── _hooks/             # 페이지 전용 커스텀 훅
│   │       └── useRecordForm.ts
│   └── report/
│       ├── index.tsx
│       └── _components/
├── hooks/               # 공용 커스텀 훅
├── utils/               # 유틸리티 (cn, 포맷터 등)
├── styles/              # 글로벌 스타일
├── types/               # 타입 정의
└── constants/           # 앱 전역 상수
```

## Private 컴포넌트 (`_components, _hooks`)

- 각 페이지 폴더 안에 `_components/` 폴더 사용
- 페이지 간 공유되지 않는 컴포넌트
- 언더스코어 접두사는 "private/internal" 의미
- 관련 코드를 한 곳에 모아 응집도 향상

**`_components/` 사용 시:**

- 해당 페이지에서만 사용하는 컴포넌트
- 페이지 로직과 강하게 결합된 컴포넌트

**`components/` 사용 시:**

- 여러 페이지에서 재사용하는 컴포넌트
- 범용 UI 요소

## 컴포넌트 구조 패턴

```tsx
// 1. 외부 import (React, 라이브러리)
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

// 2. 내부 import (컴포넌트, 훅, 유틸)
import { Button } from '@/components/ui/button'
import { cn } from '@/utils/cn'

// 3. 타입/인터페이스
interface RecordCardProps {
  record: RecordItem
  onEdit?: () => void
}

// 4. 컴포넌트
function RecordCard({ record, onEdit }: RecordCardProps) {
  // 훅 먼저
  const [isOpen, setIsOpen] = useState(false)

  // 핸들러
  const handleClick = () => {
    setIsOpen(true)
  }

  // 렌더
  return <div>...</div>
}

// 5. Export
export default RecordCard
```

## Import 순서

1. React 및 외부 라이브러리
2. 내부 절대 경로 import (`@/...`)
3. 상대 경로 import (`./`, `../`)
4. 타입 (별도 파일인 경우)
5. 스타일 (있는 경우)

## 주석 규칙

자명한 코드를 우선하고 주석은 최소화한다.

**허용:**

- `// TODO:` 주석
- 복잡한 비즈니스 로직에 대한 "왜" 설명

**금지:**

- JSDoc 주석 (함수/컴포넌트 설명)
- 코드가 하는 일을 그대로 설명하는 주석
- JSX 내 당연한 설명 주석
- 중복 설명
- 주석 처리된 코드

```tsx
// Bad
/** 사용자 이름을 반환합니다 */
function getUserName() { ... }

// Bad - 코드 설명 반복
const total = price + tax; // 가격과 세금을 더함

// Bad - JSX 설명 주석
{/* 버튼 컴포넌트 */}
<Button>저장</Button>

// Good - 비즈니스 로직 설명
// 카카오 API 제한으로 30초 딜레이 필요
await delay(30000);

// Good
// TODO: 에러 바운더리 추가 필요
```
