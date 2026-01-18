---
name: ui-publishing
description: shadcn/ui와 Tailwind CSS를 사용한 UI 컴포넌트 생성 가이드. UI 컴포넌트 생성, 스타일링, PRD 화면 구현 시 사용.
---

# UI 퍼블리싱 가이드

## 기술 스택

- **UI 라이브러리**: shadcn/ui (Radix primitives)
- **스타일링**: Tailwind CSS 4.x
- **유틸리티**: `cn()` - 조건부 클래스 병합

## 사용 가능한 컴포넌트

위치: `src/components/ui/`

| 컴포넌트 | Import | 용도 |
|----------|--------|------|
| Button | `@/components/ui/button` | 액션, CTA |
| Card | `@/components/ui/card` | 콘텐츠 컨테이너 |
| Input | `@/components/ui/input` | 텍스트 입력 |
| Textarea | `@/components/ui/textarea` | 여러 줄 텍스트 |
| Label | `@/components/ui/label` | 폼 라벨 |
| Badge | `@/components/ui/badge` | 태그, 상태 |
| Dialog | `@/components/ui/dialog` | 모달 다이얼로그 |
| AlertDialog | `@/components/ui/alert-dialog` | 확인 다이얼로그 |
| Command | `@/components/ui/command` | 검색/콤보박스 |
| Skeleton | `@/components/ui/skeleton` | 로딩 상태 |
| Sonner | `@/components/ui/sonner` | 토스트 알림 |

## PRD 화면-컴포넌트 매핑

참고: `docs/PRD.md`

| 화면 | 컴포넌트 |
|------|----------|
| 로그인 (S-01) | Button |
| 홈 (S-02) | Card |
| 기록 목록 (S-03) | Card, Badge, Skeleton |
| 기록 작성 (S-04) | Input, Textarea, Badge, Command, Button |
| 기록 상세 (S-05) | Card, Badge, Button, AlertDialog |
| 리포트 (S-06, S-07) | Card |

## cn() 유틸리티 사용

```tsx
import { cn } from '@/utils/cn'

// 조건부 클래스
<div className={cn(
  "base-class",
  isActive && "active-class",
  variant === "primary" && "primary-class"
)} />
```

## 컴포넌트 생성 패턴

```tsx
import { cn } from '@/utils/cn'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface RecordCardProps {
  title: string
  emotions: string[]
  className?: string
}

function RecordCard({ title, emotions, className }: RecordCardProps) {
  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {emotions.map((emotion) => (
            <Badge key={emotion} variant="secondary">
              {emotion}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default RecordCard
```

## 뷰포트

**모바일 뷰 전용 프로젝트**

- 모든 화면은 모바일 뷰 컨테이너 안에서 렌더링

## 간격 및 레이아웃

- Tailwind spacing scale 사용: `p-4`, `m-2`, `gap-4`
- 레이아웃은 `flex`와 `grid` 선호
- 세로 정렬은 `space-y-*` 사용

## 색상

`src/styles/index.css`에 정의된 CSS 변수 사용:

- `bg-background`, `text-foreground` - 기본 색상
- `bg-primary`, `text-primary-foreground` - 주요 액션
- `bg-muted`, `text-muted-foreground` - 보조 콘텐츠
- `bg-destructive` - 에러/삭제 액션
