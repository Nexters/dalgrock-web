# 프로젝트 지침

## 개요

dalgrock-web - 음악 기록 서비스 (모바일 뷰 전용)

## 기술 스택

- React 19 + Vite 7 + TypeScript
- Tailwind CSS 4.x + shadcn/ui
- TanStack Query + Axios
- React Router DOM

## 명령어

```bash
pnpm dev      # 개발 서버
pnpm build    # 프로덕션 빌드
pnpm lint     # ESLint 실행
```

## 폴더 구조

```
src/
├── apis/[feature]/          # API 함수 + queries
├── components/ui/           # shadcn/ui 컴포넌트
├── pages/[page]/
│   ├── index.tsx            # 페이지 컴포넌트
│   ├── _components/         # 페이지 전용 컴포넌트
│   └── _hooks/              # 페이지 전용 훅
├── hooks/                   # 공용 훅
├── utils/                   # 유틸리티 (cn 등)
└── types/                   # 타입 정의
```

## 네이밍 규칙

| 대상      | 규칙                 | 예시               |
| --------- | -------------------- | ------------------ |
| 컴포넌트  | PascalCase           | `UserProfile.tsx`  |
| 훅        | camelCase + use      | `useAuth.ts`       |
| 상수      | SCREAMING_SNAKE_CASE | `API_BASE_URL`     |
| shadcn/ui | kebab-case           | `alert-dialog.tsx` |

## 커밋 메시지

한글로 작성, Conventional Commits 스타일:

```
feat: 새 기능 추가
fix: 버그 수정
chore: 설정 변경
refactor: 리팩토링
```

## 코드 스타일

### 컴포넌트 구조

```tsx
// 1. 외부 import
import { useState } from 'react'

// 2. 내부 import
import { Button } from '@/components/ui/button'

// 3. 타입
interface Props { ... }

// 4. 컴포넌트
function Component() { ... }

// 5. export
export default Component
```

### Query/Mutation 사용

```tsx
// 변수명 구체적으로 리네이밍
const {
  data: records,
  isLoading: isRecordsLoading,
} = useQuery(recordsQueries.getRecords());

const {
  mutate: createRecordMutate,
  isPending: isCreatePending,
} = useMutation({ ... });
```

## 주석 규칙

- **허용**: `// TODO:`, 복잡한 비즈니스 로직의 "왜" 설명
- **금지**: JSDoc, 코드 설명 반복, 주석 처리된 코드

## 참고 문서

- PRD: `docs/PRD.md`
- 상세 규칙: `.cursor/rules/`

## 작업 완료 시

코드 작업을 완료하면 아래 명령어를 실행하여 코드 품질을 확인합니다:

```bash
pnpm lint && pnpm prettier --write .
```
