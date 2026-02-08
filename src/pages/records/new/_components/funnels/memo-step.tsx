import { useController, useFormContext } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import type { RecordFormData } from '../../index'
import { TagSelector } from '../tag-selector'

const CATEGORISED_MOMENT_TAGS = [
  { id: 'commute', label: '출퇴근길' },
  { id: 'drive', label: '운전 중' },
  { id: 'workout', label: '운동' },
  { id: 'walk', label: '산책' },
  { id: 'reading', label: '독서' },
  { id: 'running', label: '러닝' },
  { id: 'study', label: '공부' },
  { id: 'work', label: '작업' },
  { id: 'job', label: '업무' },
  { id: 'housework', label: '집안일' },
  { id: 'shower', label: '샤워' },
  { id: 'rest', label: '휴식' },
  { id: 'date', label: '데이트' },
  { id: 'night', label: '자기 전' },
  { id: 'nap', label: '낮잠' },
  { id: 'morning', label: '아침' }
] as const

interface MemoStepProps {
  onNext: () => void
}

export function MemoStep({ onNext }: MemoStepProps) {
  const { control, getValues } = useFormContext<RecordFormData>()

  const { field: momentField } = useController({ name: 'moment', control })
  const { field: memoField } = useController({ name: 'memo', control })

  const handleSubmit = () => {
    // TODO: API 연동
    const recordData = getValues()
    console.log('기록 저장:', recordData)
    onNext()
  }

  return (
    <>
      <section className="flex flex-1 flex-col gap-6 px-5 pt-3 pb-6">
        <h1 className="text-2xl font-bold text-gray-0">
          음악을 언제 들었나요?
        </h1>

        <div className="flex flex-col gap-12">
          <TagSelector
            tags={CATEGORISED_MOMENT_TAGS}
            selectedId={momentField.value}
            onChange={momentField.onChange}
          />

          <Textarea
            placeholder="함께 기억하고 싶은 일이나 장소를 기록해 보세요."
            value={memoField.value}
            onChange={e => memoField.onChange(e.target.value)}
            className="p-4 min-h-[52px] resize-none bg-gray-500 border-none text-sm text-gray-0 scrollbar-hide [field-sizing:content]"
          />
        </div>
      </section>

      <div className="sticky bottom-0 pt-6 pb-8 px-5 bg-[linear-gradient(180deg,rgba(22,23,28,0)_0%,#16171C_100%)]">
        <Button
          variant="primary"
          className="w-full h-[52px]"
          size="lg"
          onClick={handleSubmit}>
          기록 완료
        </Button>
      </div>
    </>
  )
}
