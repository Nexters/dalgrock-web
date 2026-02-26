import { useForm, FormProvider, useController } from 'react-hook-form'
import { useParams, useSearchParams, useLocation } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import { Header } from '@/components/header'
import { recordsQueries } from '@/apis/records/queries'
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

function formatRecordDate(dateStr: string): string {
  const date = new Date(dateStr)
  const month = date.getMonth() + 1
  const day = date.getDate()
  const dayNames = ['일', '월', '화', '수', '목', '금', '토']
  const dayName = dayNames[date.getDay()]
  return `${month}월 ${day}일(${dayName})`
}

function RecordEditView({
  editStep,
  onComplete,
  defaultValues
}: {
  editStep: EditStep
  onComplete: () => void
  defaultValues: RecordFormData
}) {
  const methods = useForm<RecordFormData>({
    defaultValues
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
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()
  const editStep = searchParams.get('edit') as EditStep | null

  const recordId = Number(id)
  const createdAt = (location.state as { createdAt?: string })?.createdAt

  const { data: record, isLoading: isRecordLoading } = useQuery(
    recordsQueries.getRecordDetail(recordId)
  )
  console.log(record)

  const musics: Music[] =
    record?.music?.map((m, i) => ({
      id: String(i),
      title: m.title ?? '',
      artist: m.artist ?? '',
      albumArt: m.thumbnail
    })) ?? []

  const emotions = record?.emotions ?? []
  const situations = record?.situations ?? []
  const memo = record?.content ?? ''

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

  if (isRecordLoading) {
    return (
      <div>
        <Header />
        <div className="flex flex-1 items-center justify-center p-10">
          <p className="text-gray-400 text-sm">불러오는 중...</p>
        </div>
      </div>
    )
  }

  if (editStep) {
    return (
      <RecordEditView
        editStep={editStep}
        onComplete={handleEditComplete}
        defaultValues={{
          musics,
          emotions,
          moment: situations[0] ?? null,
          memo,
          place: record?.location ?? ''
        }}
      />
    )
  }

  return (
    <div>
      <Header
        midChild={
          createdAt ? (
            <p className="text-gray-0 text-lg">{formatRecordDate(createdAt)}</p>
          ) : undefined
        }
        rightChild={<DeleteRecordButton onDelete={handleDelete} />}
      />

      <div className="flex flex-col gap-5 p-5">
        {/* Section 1 음악 */}
        <DetailSection
          label="기록한 음악"
          onEdit={() => handleEdit('music')}>
          <div>
            {musics.map(music => (
              <MusicItem
                key={music.id}
                albumArt={music.albumArt}
                title={music.title}
                artist={music.artist}
              />
            ))}
          </div>
        </DetailSection>

        {/* Section 2 감정 */}
        {emotions.length > 0 && (
          <DetailSection
            label="함께 느낀 감정"
            onEdit={() => handleEdit('emotion')}>
            <div className="flex gap-2">
              {emotions.map(emotion => (
                <Tag
                  key={emotion}
                  label={emotion}
                />
              ))}
            </div>
          </DetailSection>
        )}

        {/* Section 3 순간 */}
        {situations.length > 0 && (
          <DetailSection
            label="음악을 들은 순간"
            onEdit={() => handleEdit('memo')}>
            <div className="flex gap-2">
              {situations.map(situation => (
                <Tag
                  key={situation}
                  label={situation}
                />
              ))}
            </div>
          </DetailSection>
        )}

        {/* Section 4 메모 */}
        {memo && (
          <DetailSection
            label="메모"
            onEdit={() => handleEdit('memo')}>
            <div>
              <p className="text-gray-0 text-sm">{memo}</p>
            </div>
          </DetailSection>
        )}
      </div>
    </div>
  )
}

export { RecordDetail }
