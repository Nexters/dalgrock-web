import { useState } from 'react'
import { useController, useFormContext } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
  ConfirmDialog,
  ConfirmDialogCancel,
  ConfirmDialogConfirm,
  ConfirmDialogContent,
  ConfirmDialogDescription,
  ConfirmDialogFooter,
  ConfirmDialogTitle
} from '@/components/confirm-dialog'
import type { RecordFormData } from '@/types/record'
import { SelectedMusicItem } from '../selected-music-item'
import { TagSelector } from '../tag-selector'

const CATEGORISED_EMOTION_TAGS = [
  {
    '🟡 들뜬': ['행복', '설렘', '신남', '뿌듯함', '감동']
  },
  {
    '🔵 가라앉은': ['우울', '그리움', '외로움', '권태', '허무', '피곤', '후회']
  },
  {
    '🔴 날카로운': ['분노', '불안', '긴장', '질투']
  },
  {
    '🟢 복합적인': ['사랑', '복잡미묘']
  },
  { '🟣 따뜻한': ['감사'] }
] as const

interface EmotionSelectStepProps {
  onComplete: () => void
  onBack?: () => void
  submitLabel?: string
}

export function EmotionSelectStep({
  onComplete,
  onBack,
  submitLabel = '다음'
}: EmotionSelectStepProps) {
  const { control } = useFormContext<RecordFormData>()
  const [isWarningOpen, setIsWarningOpen] = useState(false)

  const { field: musicsField } = useController({ name: 'musics', control })
  const { field: emotionsField } = useController({ name: 'emotions', control })

  const isNextEnabled = emotionsField.value.length > 0
  const isLastMusic = musicsField.value.length === 1

  const handleMusicRemove = (musicId: string) => {
    if (isLastMusic) {
      setIsWarningOpen(true)
      return
    }

    musicsField.onChange(musicsField.value.filter(m => m.id !== musicId))
  }

  const handleReselectMusic = () => {
    setIsWarningOpen(false)
    onBack?.()
  }

  return (
    <>
      <section className="flex flex-1 flex-col gap-6 px-5 pt-3 pb-6">
        <h1 className="text-2xl font-bold text-gray-0">
          음악을 들을 때<br />
          어떤 감정이었나요?
        </h1>

        <div className="-mx-5 flex gap-2 overflow-x-auto px-5 scrollbar-hide">
          {musicsField.value.map(music => (
            <SelectedMusicItem
              key={music.id}
              border
              {...music}
              onRemove={() => handleMusicRemove(music.id)}
            />
          ))}
        </div>

        <TagSelector
          multiple
          tags={CATEGORISED_EMOTION_TAGS}
          selectedIds={emotionsField.value}
          onChange={emotionsField.onChange}
        />
      </section>

      <div className="sticky bottom-0 pt-6 pb-8 px-5 bg-[linear-gradient(180deg,rgba(22,23,28,0)_0%,#16171C_100%)]">
        <Button
          variant="primary"
          className="w-full h-[52px]"
          size="lg"
          disabled={!isNextEnabled}
          onClick={onComplete}>
          {submitLabel}
        </Button>
      </div>

      <ConfirmDialog
        open={isWarningOpen}
        onOpenChange={setIsWarningOpen}>
        <ConfirmDialogContent className="max-w-[320px]">
          <ConfirmDialogTitle>
            음악은 1개 이상 선택이 필요해요
          </ConfirmDialogTitle>
          <ConfirmDialogDescription>
            이 음악을 삭제하고 다시 음악을 선택하시겠어요?
          </ConfirmDialogDescription>
          <ConfirmDialogFooter className="mt-4">
            <ConfirmDialogCancel className="w-[120px]">
              닫기
            </ConfirmDialogCancel>
            <ConfirmDialogConfirm onClick={handleReselectMusic}>
              음악 다시 선택하기
            </ConfirmDialogConfirm>
          </ConfirmDialogFooter>
        </ConfirmDialogContent>
      </ConfirmDialog>
    </>
  )
}
