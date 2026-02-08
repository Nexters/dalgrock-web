import { useState } from 'react'
import { useFormContext, useController } from 'react-hook-form'

import { ChevronDownIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FormSection } from '../form-section'
import { TagSelector } from '../tag-selector'
import type { Music, RecordFormData } from '../../index'
import { SelectedMusicItem } from '../selected-music-item'
import { TextareaWithCount } from '@/components/textarea-with-count'
import { formatTodayDate } from '@/utils/format'

const CATEGORISED_EMOTION_TAGS = [
  {
    '🥰 긍정': [
      { id: 'proud', label: '뿌듯함' },
      { id: 'moved', label: '감동' },
      { id: 'happy', label: '기쁨' },
      { id: 'calm', label: '평온함' },
      { id: 'excited', label: '설렘' },
      { id: 'joyful', label: '행복' },
      { id: 'exciting', label: '신남' }
    ]
  },
  {
    '😔 부정': [
      { id: 'sad', label: '슬픔' },
      { id: 'melancholy', label: '우울함' },
      { id: 'nostalgic', label: '그리움' }
    ]
  },
  { '😐 그 외': [{ id: 'ambivalent', label: '복잡미묘' }] }
] as const

const CATEGORISED_MOMENT_TAGS = [
  {
    이동: [
      { id: 'commute', label: '출퇴근길' },
      { id: 'drive', label: '운전 중' }
    ]
  },
  {
    취미: [
      { id: 'workout', label: '운동' },
      { id: 'walk', label: '산책' },
      { id: 'reading', label: '독서' },
      { id: 'running', label: '러닝' }
    ]
  },
  {
    할일: [
      { id: 'study', label: '공부' },
      { id: 'work', label: '작업' },
      { id: 'job', label: '업무' },
      { id: 'housework', label: '집안일' },
      { id: 'shower', label: '샤워' }
    ]
  },
  {
    '그 외': [
      { id: 'rest', label: '휴식' },
      { id: 'date', label: '데이트' },
      { id: 'night', label: '자기 전' },
      { id: 'nap', label: '낮잠' },
      { id: 'morning', label: '아침' }
    ]
  }
] as const

interface RecordDetailStepProps {
  musics: Music[]
  onNext: () => void
}

const INITIAL_VISIBLE_COUNT = 2

export function RecordDetailStep({ musics, onNext }: RecordDetailStepProps) {
  const { control, getValues } = useFormContext<RecordFormData>()

  const [isPlaylistExpanded, setIsPlaylistExpanded] = useState(false)

  const { field: emotionsField } = useController({ name: 'emotions', control })
  const { field: momentField } = useController({ name: 'moment', control })
  const { field: memoField } = useController({ name: 'memo', control })
  const { field: placeField } = useController({ name: 'place', control })

  const hasMoreThanTwo = musics.length > INITIAL_VISIBLE_COUNT
  const visibleMusics = isPlaylistExpanded
    ? musics
    : musics.slice(0, INITIAL_VISIBLE_COUNT)
  const hiddenCount = musics.length - INITIAL_VISIBLE_COUNT

  const isSubmitEnabled = musics.length > 0 && emotionsField.value.length > 0

  const handleSubmit = () => {
    // TODO: API 연동
    const recordData = getValues()
    console.log('기록 저장:', recordData)
    onNext()
  }

  return (
    <>
      <section className="flex flex-1 flex-col gap-6 px-5 pt-3 pb-6">
        {/* 오늘 날짜 */}
        <h1 className="text-xl font-bold text-white">{formatTodayDate()}</h1>

        {/* 오늘의 플레이리스트 */}
        <FormSection
          label="오늘의 플레이리스트"
          required>
          <div className="flex flex-col gap-2">
            {visibleMusics.map(music => (
              <SelectedMusicItem
                key={music.id}
                transparent
                {...music}
              />
            ))}

            {hasMoreThanTwo && (
              <button
                type="button"
                onClick={() => setIsPlaylistExpanded(prev => !prev)}
                className="flex items-center justify-center gap-1 py-2 text-sm text-gray-400 transition-colors hover:text-gray-300">
                {isPlaylistExpanded ? (
                  <>
                    접기
                    <ChevronDownIcon className="size-4 rotate-180" />
                  </>
                ) : (
                  <>
                    {hiddenCount}곡 더보기
                    <ChevronDownIcon className="size-4" />
                  </>
                )}
              </button>
            )}
          </div>
        </FormSection>

        {/* 오늘의 감정 */}
        <FormSection
          label="오늘의 감정"
          description="감정은 여러 개 선택이 가능해요"
          required>
          <TagSelector
            multiple
            tags={CATEGORISED_EMOTION_TAGS}
            selectedIds={emotionsField.value}
            onChange={emotionsField.onChange}
          />
        </FormSection>

        {/* 음악을 들은 순간 */}
        <FormSection label="음악을 들은 순간">
          <TagSelector
            tags={CATEGORISED_MOMENT_TAGS}
            selectedId={momentField.value}
            onChange={momentField.onChange}
          />
        </FormSection>

        {/* 메모 */}
        <FormSection label="메모">
          <TextareaWithCount
            placeholder="오늘은 어떤 일이 있었나요?"
            maxLength={200}
            value={memoField.value}
            onChange={e => memoField.onChange(e.target.value)}
            className="min-h-[120px] resize-none bg-[#262930] border-none text-sm text-gray-0"
          />
        </FormSection>

        {/* 장소 */}
        <FormSection label="장소">
          <Input
            placeholder="기억하고 싶은 장소를 기록해 보세요"
            value={placeField.value}
            onChange={e => placeField.onChange(e.target.value)}
            className="bg-[#262930] border-none text-sm text-gray-0"
          />
        </FormSection>
      </section>

      {/* 하단 버튼 */}

      <div className="sticky bottom-0 pt-6 pb-8 px-5 bg-[linear-gradient(180deg,rgba(22,23,28,0)_0%,#16171C_100%)]">
        <Button
          variant="primary"
          className="w-full h-[52px]"
          size="lg"
          disabled={!isSubmitEnabled}
          onClick={handleSubmit}>
          기록 완료
        </Button>
      </div>
    </>
  )
}
