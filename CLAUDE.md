# dalgrock-web

음악 기록 서비스 - 일상의 순간을 음악과 함께 기록하는 웹 애플리케이션

## 기술 스택

- **프레임워크**: React 19 + Vite 7
- **언어**: TypeScript
- **스타일링**: Tailwind CSS 4.x
- **UI 컴포넌트**: shadcn/ui (Radix primitives)
- **데이터 페칭**: TanStack Query (React Query)
- **라우팅**: React Router DOM

## 문서

- **PRD (제품 요구사항)**: `docs/PRD.md`
- **Skills**: `.claude/skills/`

## 명령어

```bash
pnpm dev      # 개발 서버 시작
pnpm build    # 프로덕션 빌드
pnpm lint     # ESLint 실행
pnpm preview  # 프로덕션 빌드 미리보기
```

## 프로젝트 구조

```
src/
├── apis/                # API 함수 및 React Query 훅
├── components/
│   └── ui/              # shadcn/ui 컴포넌트
├── pages/
│   └── [page]/
│       ├── index.tsx    # 페이지 컴포넌트
│       └── _components/ # 페이지 전용 컴포넌트
├── hooks/               # 공용 커스텀 훅
├── utils/               # 유틸리티 (cn 등)
├── styles/              # 글로벌 스타일
└── types/               # 타입 정의
```

## 주요 컨벤션

- **커밋**: Conventional Commits (`feat:`, `fix:`, `chore:` 등), 한글로 작성
- **컴포넌트**: PascalCase, default export
- **훅**: camelCase + `use` 접두사
- **Private 컴포넌트**: 페이지 폴더 내 `_components/` 사용
