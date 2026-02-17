import { useForm, FormProvider, useController } from 'react-hook-form'
import { useParams, useSearchParams } from 'react-router-dom'

import { Header } from '@/components/header'
import type { Music, RecordFormData } from '@/types/record'
import DeleteRecordButton from './_components/delete-record-button'
import { DetailSection } from './_components/detail-section'
import { MusicItem } from './_components/music-item'
import {
  MusicSearchStep,
  EmotionSelectStep,
  MemoStep
} from './_components/steps'
import { Tag } from './_components/tag'

type EditStep = 'music' | 'emotion' | 'memo'

// TODO: API 연동 후 제거
const DUMMY_MUSICS: Music[] = [
  { id: '1', title: 'APT.', artist: '로제 & 브루노 마스' },
  { id: '2', title: 'Whiplash', artist: 'aespa' },
  { id: '3', title: 'HAPPY', artist: 'DAY6' }
]

const DUMMY_EMOTIONS = ['감동', '슬픔', '복잡미묘']
const DUMMY_MOMENTS = ['출퇴근길', '운전 중']
const DUMMY_MEMO = '오늘 하루는 인류애를 충전한 하루였다.'

function RecordEditView({
  editStep,
  onComplete
}: {
  editStep: EditStep
  onComplete: () => void
}) {
  const methods = useForm<RecordFormData>({
    defaultValues: {
      // TODO: API에서 가져온 실제 레코드 데이터로 prefill
      musics: DUMMY_MUSICS,
      emotions: [],
      moment: null,
      memo: DUMMY_MEMO,
      place: ''
    }
  })

  const { field: musicsField } = useController({
    name: 'musics',
    control: methods.control
  })

  const handleMusicToggle = (music: Music) => {
    const isSelected = musicsField.value.some(m => m.id === music.id)

    if (isSelected) {
      musicsField.onChange(musicsField.value.filter(m => m.id !== music.id))
    } else {
      musicsField.onChange([...musicsField.value, music])
    }
  }

  const handleComplete = () => {
    // TODO: 수정 API 호출
    const recordData = methods.getValues()
    console.log('기록 수정:', recordData)
    onComplete()
  }

  return (
    <FormProvider {...methods}>
      <div className="flex min-h-dvh flex-col">
        <Header onBack={onComplete} />

        <div className="flex flex-1 flex-col">
          {editStep === 'music' && (
            <MusicSearchStep
              selectedMusics={musicsField.value}
              onMusicToggle={handleMusicToggle}
              onComplete={handleComplete}
              submitLabel="저장"
            />
          )}

          {editStep === 'emotion' && (
            <EmotionSelectStep
              onComplete={handleComplete}
              submitLabel="저장"
            />
          )}

          {editStep === 'memo' && (
            <MemoStep
              onComplete={handleComplete}
              submitLabel="저장"
            />
          )}
        </div>
      </div>
    </FormProvider>
  )
}

function RecordDetail() {
  const { id } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const editStep = searchParams.get('edit') as EditStep | null

  const handleEdit = (step: EditStep) => {
    setSearchParams({ edit: step })
  }

  const handleEditComplete = () => {
    setSearchParams({})
  }

  const handleDelete = () => {
    // TODO: 삭제 API 호출
    console.log('삭제 확인', id)
  }

  if (editStep) {
    return (
      <RecordEditView
        editStep={editStep}
        onComplete={handleEditComplete}
      />
    )
  }

  return (
    <div>
      <Header
        midChild={<p className="text-gray-0 text-lg">2월 11일(수)</p>}
        rightChild={<DeleteRecordButton onDelete={handleDelete} />}
      />

      <div className="p-5 flex flex-col gap-5">
        {/* Section 1 음악 */}
        <DetailSection
          label="기록한 음악"
          onEdit={() => handleEdit('music')}>
          <div>
            {DUMMY_MUSICS.map(music => (
              <MusicItem
                key={music.id}
                {...music}
              />
            ))}
          </div>
        </DetailSection>

        {/* Section 2 감정 */}
        <DetailSection
          label="함께 느낀 감정"
          onEdit={() => handleEdit('emotion')}>
          <div className="flex gap-2">
            {DUMMY_EMOTIONS.map(emotion => (
              <Tag
                key={emotion}
                label={emotion}
              />
            ))}
          </div>
        </DetailSection>

        {/* Section 3 내용 */}
        <DetailSection
          label="음악을 들은 순간"
          onEdit={() => handleEdit('memo')}>
          <div className="flex gap-2">
            {DUMMY_MOMENTS.map(moment => (
              <Tag
                key={moment}
                label={moment}
              />
            ))}
          </div>
        </DetailSection>

        {/* Section 4 메모 */}
        <DetailSection
          label="메모"
          onEdit={() => handleEdit('memo')}>
          <div>
            <p className="text-gray-0 text-sm">{DUMMY_MEMO}</p>
          </div>
        </DetailSection>
      </div>
    </div>
  )
}

export { RecordDetail }
