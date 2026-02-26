import { useForm, FormProvider, useController } from 'react-hook-form'
import {
  useParams,
  useSearchParams,
  useLocation,
  useNavigate
} from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { Header } from '@/components/header'
import { getRecord } from '@/apis/generated/record/record'
import { recordsQueries } from '@/apis/records/queries'
import type { UpdateRecordRequest } from '@/apis/generated/models'
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
  recordId,
  editStep,
  onComplete,
  defaultValues
}: {
  recordId: number
  editStep: EditStep
  onComplete: () => void
  defaultValues: RecordFormData
}) {
  const queryClient = useQueryClient()

  const methods = useForm<RecordFormData>({
    defaultValues
  })

  const { field: musicsField } = useController({
    name: 'musics',
    control: methods.control
  })

  const handleMusicToggle = (music: Music) => {
    const isSelected = musicsField.value.some(
      m => m.title === music.title && m.artist === music.artist
    )

    if (isSelected) {
      musicsField.onChange(
        musicsField.value.filter(
          m => !(m.title === music.title && m.artist === music.artist)
        )
      )
    } else {
      musicsField.onChange([...musicsField.value, music])
    }
  }

  const { mutate: updateRecordMutate, isPending: isUpdatePending } =
    useMutation({
      mutationFn: (request: UpdateRecordRequest) =>
        recordv1UpdateRecord(recordId, request),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: recordsQueries.all })
        toast.success('기록이 수정되었어요')
        onComplete()
      },
      onError: () => {
        toast.error('기록 수정에 실패했습니다')
      }
    })

  const handleComplete = () => {
    const formData = methods.getValues()

    if (editStep === 'music') {
      updateRecordMutate({
        type: 'musics',
        data: formData.musics.map(({ title, artist, albumArt, genre }) => ({
          title,
          artist,
          thumbnail: albumArt,
          genre
        })) as unknown as UpdateRecordRequest['data']
      })
    } else if (editStep === 'emotion') {
      updateRecordMutate({
        type: 'emotions',
        data: formData.emotions as unknown as UpdateRecordRequest['data']
      })
    } else if (editStep === 'memo') {
      updateRecordMutate({
        type: 'content',
        data: (formData.memo || '') as unknown as UpdateRecordRequest['data']
      })
    }
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
              isPending={isUpdatePending}
              submitLabel="저장"
            />
          )}
        </div>
      </div>
    </FormProvider>
  )
}

const { recordv1DeleteRecord, recordv1UpdateRecord } = getRecord()

function RecordDetail() {
  const { id } = useParams()
  const location = useLocation()
  const routerNavigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const editStep = searchParams.get('edit') as EditStep | null

  const recordId = Number(id)
  const createdAt = (location.state as { createdAt?: string })?.createdAt

  const queryClient = useQueryClient()

  const { data: record, isLoading: isRecordLoading } = useQuery(
    recordsQueries.getRecordDetail(recordId)
  )

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

  const { mutate: deleteRecordMutate } = useMutation({
    mutationFn: () => recordv1DeleteRecord(recordId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: recordsQueries.all })
      routerNavigate('/')
      toast.success('기록이 삭제되었어요')
    },
    onError: () => {
      toast.error('기록 삭제에 실패했습니다')
    }
  })

  const handleDelete = () => {
    deleteRecordMutate()
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
        recordId={recordId}
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
